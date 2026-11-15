// Gallery: category filters and a simple viewer for photos and video.
(function () {
  var dialog = document.getElementById("lightbox");
  if (!dialog) return;
  var stage = document.getElementById("lb-stage");
  var caption = document.getElementById("lb-caption");
  var prev = dialog.querySelector('[data-lb="prev"]');
  var next = dialog.querySelector('[data-lb="next"]');
  var items = [], index = 0;

  function visibleLinks() {
    return Array.prototype.filter.call(document.querySelectorAll(".tile-open"), function (a) {
      return !a.closest(".tile").hidden;
    });
  }
  function show(i) {
    index = (i + items.length) % items.length;
    var a = items[index], kind = a.dataset.kind, src = a.dataset.src, el;
    stage.textContent = "";
    if (kind === "photo") {
      el = document.createElement("img");
      el.src = src; el.alt = a.querySelector("img") ? a.querySelector("img").alt : "";
    } else if (kind === "video") {
      el = document.createElement("video");
      el.src = src; el.controls = true; el.autoplay = true; el.playsInline = true;
    } else {
      el = document.createElement("iframe");
      el.src = src; el.title = a.dataset.caption || "Video";
      el.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      el.allowFullscreen = true;
    }
    stage.appendChild(el);
    caption.textContent = a.dataset.caption || "";
    prev.hidden = next.hidden = items.length < 2;
  }
  function close() { stage.textContent = ""; if (dialog.open) dialog.close(); }

  document.addEventListener("click", function (e) {
    var a = e.target.closest(".tile-open");
    if (a && typeof dialog.showModal === "function") {
      e.preventDefault();
      items = visibleLinks();
      dialog.showModal();
      show(items.indexOf(a));
      return;
    }
    var f = e.target.closest(".filter");
    if (f) {
      var want = f.dataset.filter;
      document.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", b === f ? "true" : "false"); });
      document.querySelectorAll("#gallery .tile").forEach(function (t) {
        t.hidden = !(want === "all" || t.dataset.category === want);
      });
    }
  });
  dialog.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lb]");
    if (b) {
      if (b.dataset.lb === "close") close();
      if (b.dataset.lb === "prev") show(index - 1);
      if (b.dataset.lb === "next") show(index + 1);
    } else if (e.target === dialog) close();
  });
  dialog.addEventListener("close", function () { stage.textContent = ""; });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
