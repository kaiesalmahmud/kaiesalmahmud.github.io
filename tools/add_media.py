#!/usr/bin/env python3
"""Add photos or short video clips to the site gallery.

Photos are resized (a 2000 px version and an 800 px thumbnail), location and
camera data are removed, and an entry for each file is added to
_data/gallery.yml. Edit the titles and captions there afterwards.

Examples
    python3 tools/add_media.py ~/Pictures/aerpaw/*.jpg \
        --category "Field campaigns" --project aerpaw-campaigns --date "Oct 2026"
    python3 tools/add_media.py ln2_calibration.jpg --category Lab --title "Liquid nitrogen calibration"

Needs Pillow:  pip install pillow      (for iPhone .heic photos also: pip install pillow-heif)
"""
import argparse, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FULL, THUMB, VIDEO = (ROOT / "assets/media" / d for d in ("full", "thumb", "video"))
DATA = ROOT / "_data/gallery.yml"
CATEGORIES = ["Field campaigns", "Lab", "Training and conferences", "Earlier work"]
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".tif", ".tiff"}
VIDEO_EXT = {".mp4", ".webm"}
MAX_VIDEO_MB = 25


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "item"


def unique(folder, stem, ext):
    name, n = f"{stem}{ext}", 2
    while (folder / name).exists():
        name, n = f"{stem}-{n}{ext}", n + 1
    return name


def q(text):
    return '"' + str(text).replace('"', "'") + '"'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+", type=Path)
    ap.add_argument("--category", required=True, choices=CATEGORIES)
    ap.add_argument("--project", help="key of a project page that should also show these items")
    ap.add_argument("--date", help='free text, for example "Oct 2026"')
    ap.add_argument("--title", help="title to use (default: made from the file name)")
    args = ap.parse_args()

    entries = []
    for src in args.files:
        ext = src.suffix.lower()
        if not src.is_file():
            print(f"skipped (not a file): {src}"); continue
        title = args.title or src.stem.replace("_", " ").replace("-", " ").strip().capitalize()
        lines = [f"- title: {q(title)}", '  caption: ""']
        if args.date:
            lines.append(f"  date: {q(args.date)}")
        lines.append(f"  category: {args.category}")
        if args.project:
            lines.append(f"  project: {args.project}")

        if ext in PHOTO_EXT:
            try:
                from PIL import Image, ImageOps
                if ext == ".heic":
                    import pillow_heif; pillow_heif.register_heif_opener()
            except ImportError as e:
                sys.exit(f"Missing package ({e.name}). Run: pip install pillow pillow-heif")
            name = unique(FULL, slug(src.stem), ".jpg")
            img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
            for folder, size, quality in ((FULL, 2000, 85), (THUMB, 800, 80)):
                folder.mkdir(parents=True, exist_ok=True)
                copy = img.copy(); copy.thumbnail((size, size))
                copy.save(folder / name, "JPEG", quality=quality, optimize=True, progressive=True)  # saved without EXIF
            lines += [f"  photo: {name}", '  alt: ""']
        elif ext in VIDEO_EXT:
            mb = src.stat().st_size / 1e6
            if mb > MAX_VIDEO_MB:
                print(f"skipped {src.name}: {mb:.0f} MB is too large for the repository. "
                      "Upload it to YouTube and add a 'youtube:' entry instead."); continue
            VIDEO.mkdir(parents=True, exist_ok=True)
            name = unique(VIDEO, slug(src.stem), ext)
            shutil.copy2(src, VIDEO / name)
            lines.append(f"  video: {name}")
        else:
            print(f"skipped (unsupported type): {src}"); continue
        entries.append("\n".join(lines))
        print(f"added {name}")

    if entries:
        text = DATA.read_text(encoding="utf-8").rstrip("\n")
        DATA.write_text(text + "\n\n" + "\n\n".join(entries) + "\n", encoding="utf-8")
        print(f"\n{len(entries)} item(s) added to {DATA.relative_to(ROOT)}. Now edit the titles and captions there.")


if __name__ == "__main__":
    main()
