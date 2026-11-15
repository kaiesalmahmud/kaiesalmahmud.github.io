// Draws the illustrative spectrogram on the home page.
// It is a fixed drawing (same picture on every visit), not measured data.
(function () {
  var canvas = document.getElementById("spectrogram");
  if (!canvas || !canvas.getContext) return;

  // Small seeded random generator so the picture never changes.
  var seed = 2332661;
  function rand() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function gauss() { return (rand() + rand() + rand() + rand() - 2) / 0.58; }

  // Color scale from cold (navy) to hot (amber).
  var stops = [[20, 33, 61], [22, 70, 105], [27, 122, 140], [96, 176, 150], [227, 160, 8], [250, 226, 150]];
  function color(v) {
    v = Math.max(0, Math.min(0.9999, v)) * (stops.length - 1);
    var i = Math.floor(v), f = v - i, a = stops[i], b = stops[i + 1];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }

  var cols = 300, rows = 55;            // time steps, frequency bins
  var off = document.createElement("canvas");
  off.width = cols; off.height = rows;
  var octx = off.getContext("2d");
  var img = octx.createImageData(cols, rows);

  // A transmitter that is on in bursts, in one part of the band.
  var bandLo = 14, bandHi = 30;
  var on = [], state = false, left = 0;
  for (var x = 0; x < cols; x++) {
    if (left <= 0) { state = !state; left = state ? 6 + Math.floor(rand() * 16) : 8 + Math.floor(rand() * 26); }
    left--;
    on.push(x > 20 && x < cols - 12 ? state : false);
  }
  // A weaker, narrower signal that comes on later.
  var band2Lo = 39, band2Hi = 44;

  for (var y = 0; y < rows; y++) {
    var ripple = 0.03 * Math.sin(y / rows * Math.PI * 2.2);
    for (var x2 = 0; x2 < cols; x2++) {
      var v = 0.2 + ripple + 0.055 * gauss();
      if (on[x2] && y >= bandLo && y <= bandHi) {
        var edge = Math.min(y - bandLo, bandHi - y);
        v += (edge < 1 ? 0.3 : 0.52) + 0.05 * gauss();
      }
      if (x2 > 170 && x2 < 262 && y >= band2Lo && y <= band2Hi) v += 0.2 + 0.04 * gauss();
      var c = color(v), k = (y * cols + x2) * 4;
      img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
    }
  }
  octx.putImageData(img, 0, 0);

  function draw() {
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  }
  draw();
  var timer;
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(draw, 150); });
})();
