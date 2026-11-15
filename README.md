# kaiesalmahmud.github.io

My personal site. It is a plain Jekyll site that GitHub Pages builds by
itself: push to `master` and the live site updates in about a minute. There
is nothing to install.

## Where things are

| To change | Edit |
|---|---|
| Name, email, profile links, CV PDF, portrait | `_config.yml` |
| Home page text | `index.html` |
| News on the home page | `_data/news.yml` |
| Publications | `_data/publications.yml` |
| Photos and video | `_data/gallery.yml` and `assets/media/` |
| Research page | `research.md` |
| CV page | `cv.md` |
| A project page | one file per project in `_projects/` |
| Colors and fonts | the top of `assets/css/main.css` |

## Add photos

```
pip install pillow
python3 tools/add_media.py ~/Pictures/aerpaw/*.jpg \
    --category "Field campaigns" --project aerpaw-campaigns --date "Oct 2026"
```

The script resizes each photo, makes a thumbnail, removes location and camera
data, and adds an entry to `_data/gallery.yml`. Open that file and write the
titles and captions. Then commit and push.

Categories: `Field campaigns`, `Lab`, `Training and conferences`,
`Earlier work`.

`--project` is optional. It takes the `key` of a project page
(`sband-radiometer`, `aerpaw-campaigns`, `hexacopter`, `forest-vital-signs`,
`data-mule-challenge`, `smart-parking`, `federated-learning`,
`cropping-intensity`, `text-to-sql`) and makes the photo also appear at the
bottom of that page.

## Add video

Long videos belong on YouTube. Add an entry to `_data/gallery.yml` with
`youtube: VIDEO_ID` (the part after `watch?v=`) or `playlist: PLAYLIST_ID`.

Short clips (under about 25 MB, `.mp4`) can live in the repository:

```
python3 tools/add_media.py clip.mp4 --category Lab
```

GitHub rejects files over 100 MB and asks that a site stay under 1 GB.

## Give a project a cover image

Put an image in `assets/img/` and add this to the top of the project file:

```
image: /assets/img/radiometer.jpg
image_alt: The radiometer stack on the bench
image_caption: The three-layer stack before it goes into the box.
```

## Add a project

Copy a file in `_projects/`, rename it, and edit the fields at the top.
`group` is `phd` or `earlier`, `order` sets the position in the list, and
`featured: true` shows it on the home page.

## Home page extras

- Set `portrait:` in `_config.yml` to show a photo next to the headline.
- Set `cv_pdf:` to show a download button on the CV page.
- When the gallery has four or more items, the newest four appear on the
  home page.
- The spectrogram on the home page is an illustration drawn by
  `assets/js/spectrogram.js`. To use a real one, replace the `<canvas>` in
  `index.html` with an `<img>` and update the caption.

## Preview on your own computer (optional)

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

Fonts: IBM Plex Sans, SIL Open Font License (`assets/fonts/OFL-LICENSE.txt`).
