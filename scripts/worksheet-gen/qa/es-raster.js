/**
 * es-raster.js — the G1-378 `earth-and-space` pixel instrument (type-scoped).
 * Rasterises an EMITTED svg string with sharp (librsvg) at a chosen pixel size
 * and answers questions about the pixels: which token colour each pixel is
 * nearest to, how many of each, where their centroid is. The primitive gates
 * (verify-moon-phase.js, verify-sky-bodies.js, verify-planets.js) and the
 * family gate measure the DRAWING through this, never the primitive's meta.
 */
'use strict';
const sharp = require('sharp');
const T = require('../primitives/_tokens.js');

const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const PAL = Object.fromEntries(Object.entries(T.color).map(([k, v]) => [k, hex2rgb(v)]));

/** Rasterise `svg` so that its root width becomes `px` (height scaled). -> {w, h, px: Uint8Array RGBA, k: px per svg px} */
async function rasterize(svg, px) {
  const w0 = +(/<svg\b[^>]*?\swidth="([\d.]+)"/.exec(svg) || [])[1];
  const h0 = +(/<svg\b[^>]*?\sheight="([\d.]+)"/.exec(svg) || [])[1];
  if (!w0 || !h0) throw new Error('es-raster: svg without width / height');
  const k = px / w0;
  const H = Math.round(h0 * k);
  const s = svg.replace(/(<svg\b[^>]*?\s)width="[\d.]+"/, `$1width="${px}"`).replace(/(<svg\b[^>]*?\s)height="[\d.]+"/, `$1height="${H}"`);
  const { data, info } = await sharp(Buffer.from(s)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { w: info.width, h: info.height, px: data, k };
}

/** Nearest token name of an opaque pixel among `names` (null if alpha < 128). */
function nearest(img, x, y, names) {
  const i = (y * img.w + x) * 4;
  if (img.px[i + 3] < 128) return null;
  let best = null, bd = Infinity;
  for (const n of names) {
    const c = PAL[n];
    const d = (img.px[i] - c[0]) ** 2 + (img.px[i + 1] - c[1]) ** 2 + (img.px[i + 2] - c[2]) ** 2;
    if (d < bd) { bd = d; best = n; }
  }
  return best;
}
/** Luminance 0..255 of a pixel (Rec. 709), alpha-composited on white. */
function lum(img, x, y) {
  const i = (y * img.w + x) * 4;
  const a = img.px[i + 3] / 255;
  const c = [0, 1, 2].map((j) => img.px[i + j] * a + 255 * (1 - a));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function alpha(img, x, y) { return img.px[(y * img.w + x) * 4 + 3]; }

module.exports = { rasterize, nearest, lum, alpha, PAL };
