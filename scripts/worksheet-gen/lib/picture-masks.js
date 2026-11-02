/**
 * picture-masks.js — the pictures' SHAPES, synchronously (data/picture-masks.json, tools/build-picture-masks.js; 2026-11-02,
 * Same & Different maker). No sharp: the same answer in Node and in a maker in the browser.
 *   maskA(theme, noun)   24 × 24 alpha mask of the whole image box — bit for bit image-cache/silhouette.js maskSignature
 *   maskI(theme, noun)   24 × 24 mask of the DRAWING alone (trimmed to its ink box, stretched)
 *   iou(a, b)            intersection over union of two masks
 *   topPart(mask, f)     the top f of a drawing's mask, re-trimmed and stretched to 24 × 24 — what a "what is it?" crop
 *                        shows, as a shape
 *   partInk(theme, noun, f) how much of the window over the drawing's top f is ink
 *   partLooksLike(theme, target, other, f)
 *                        true when the visible top f of `target` could be read as `other`: the part has the shape of the
 *                        other WHOLE picture (the top of a diamond is a triangle) or of the other's own top part
 */
'use strict';
const path = require('path');
const platform = require('./platform/index.js');   // file reads go through the platform (the makers bundle this module)

const N = 24;
let _file = null;
const file = () => (_file || (_file = platform.readJson(path.join(__dirname, '..', 'data', 'picture-masks.json'))));
const _cache = new Map();
function bits(hex) {
  const out = new Uint8Array(N * N);
  for (let k = 0; k < hex.length; k++) { const v = parseInt(hex[k], 16); for (let b = 0; b < 4; b++) out[k * 4 + b] = (v >> (3 - b)) & 1; }
  return out;
}
function entry(theme, noun) {
  const e = (file()[theme] || {})[noun];
  if (!e) throw new Error('picture-masks: no masks for ' + theme + '/' + noun + ' (node tools/build-picture-masks.js)');
  return e;
}
function maskA(theme, noun) { const k = 'a|' + theme + '|' + noun; if (!_cache.has(k)) _cache.set(k, bits(entry(theme, noun).a)); return _cache.get(k); }
function maskI(theme, noun) { const k = 'i|' + theme + '|' + noun; if (!_cache.has(k)) _cache.set(k, bits(entry(theme, noun).i)); return _cache.get(k); }
function has(theme, noun) { return !!(file()[theme] || {})[noun]; }

function iou(a, b) {
  let inter = 0, union = 0;
  for (let i = 0; i < a.length; i++) { if (a[i] & b[i]) inter++; if (a[i] | b[i]) union++; }
  return union === 0 ? 0 : inter / union;
}

/** the top f of a drawing mask (rows), trimmed to what it holds and stretched back to 24 × 24 (nearest) */
function topPart(m, f) {
  const rows = Math.max(1, Math.round(N * f));
  let x0 = N, x1 = -1, y0 = N, y1 = -1;
  for (let y = 0; y < rows; y++) for (let x = 0; x < N; x++) if (m[y * N + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const out = new Uint8Array(N * N);
  if (x1 < 0) return out;
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) out[y * N + x] = m[(y0 + Math.floor((y * h) / N)) * N + x0 + Math.floor((x * w) / N)];
  return out;
}

/** how much of the window over the drawing's top f is ink (0-1): a ship's top 40 % is a thin mast (0.15) */
function partInk(theme, noun, f) {
  const m = maskI(theme, noun), rows = Math.max(1, Math.round(N * f));
  let c = 0;
  for (let i = 0; i < rows * N; i++) c += m[i];
  return c / (rows * N);
}

const WHOLE_LIMIT = 0.62, PART_LIMIT = 0.8, MIN_PART_INK = 0.2;
function partLooksLike(theme, target, other, f) {
  const p = topPart(maskI(theme, target), f);
  return iou(p, maskI(theme, other)) >= WHOLE_LIMIT || iou(p, topPart(maskI(theme, other), f)) >= PART_LIMIT;
}

module.exports = { maskA, maskI, has, iou, topPart, partInk, partLooksLike, WHOLE_LIMIT, PART_LIMIT, MIN_PART_INK };
