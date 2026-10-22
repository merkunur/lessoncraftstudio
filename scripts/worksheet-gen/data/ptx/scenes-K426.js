/**
 * data/ptx/scenes-K426.js — K-426 "Where do I start?" Level Set copies (ptl): a STAIRCASE going down left to right, one
 * picture standing on each tread, every picture drawn as DESIGNED STROKES (data/ptx/st.js) with a start dot + arrow on
 * every stroke (top or left end; round strokes at 2 o'clock, anticlockwise), the legend chip top right, no numbers.
 * Concepts: _work/ptl-scenes-A.json (Designer A; its library picks fragment into many start dots, so every picture is
 * designed). Levels (ptl-levels.md §K-426): L1 K-1 — 3 steps, pictures 190-230 px of 1-2 strokes, 1,000-1,500 ·
 * L2 K — 4 steps (the published staircase), 150 px, ≤ 4 strokes, 1,500-3,000 · L3 K-3 — 5 steps, 110-130 px, 3-4 strokes,
 * one picture whose second stroke starts mid-picture, 2,300-3,500.
 */
'use strict';
const ST = require('./st.js');
const { helpers: { SOLID } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const STAIRS = { 1: { n: 3, rise: 222, size: 205, cap: 1500 }, 2: { n: 4, rise: 175, size: 150 }, 3: { n: 5, rise: 140, size: 132 } };
/** a picture's traced length at height 100 */
const len100 = (name) => ST.D[name](0, 100, 100).reduce((a, l) => { let L = 0; for (let i = 1; i < l.pts.length; i++) L += Math.hypot(l.pts[i][0] - l.pts[i - 1][0], l.pts[i][1] - l.pts[i - 1][1]); return a + L; }, 0);
/** the picture's box at height 100 (its strokes do not all start at v = 0: a ruler floats at mid-height) */
function boxOf(name) { let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const l of ST.D[name](0, 100, 100)) for (const [x, y] of l.pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } return { w: (x1 - x0) / 100, h: (y1 - y0) / 100, bottom: (100 - y1) / 100, cx: (x0 + x1) / 200 }; }
function stairs(level, names) {
  const { n, rise, size } = STAIRS[level], W = (661 - 13) / n, y0 = 708 - rise * (n - 1);
  if (names.length !== n) throw new Error(`K-426 L${level}: ${names.length} pictures for ${n} steps`);
  let d = `M13 ${y0}`; for (let k = 0; k < n; k++) { const y = y0 + k * rise, xr = 13 + (k + 1) * W; d += ` L${xr.toFixed(1)} ${y}`; if (k < n - 1) d += ` L${xr.toFixed(1)} ${y + rise}`; }
  const motifs = [], hs = names.map((name) => { const b = boxOf(name); return Math.min(size / Math.max(b.w, b.h), (W - 24) / b.w, (rise - 26) / b.h); });
  // the K-1 page stays inside the ladder's 1,500 px (K-426 is the recorded narrow-face exception to the 25 % rule: its
  // task is the ORDER, and a K-1 child needs the 190-230 px pictures more than a lighter page)
  const total = names.reduce((a, name, k) => a + len100(name) * hs[k] / 100, 0), k1 = STAIRS[level].cap && total > STAIRS[level].cap ? STAIRS[level].cap / total : 1;
  names.forEach((name, k) => {
    const b = boxOf(name), h = hs[k] * k1;
    const cx = 13 + (k + 0.5) * W - b.cx * h, tread = y0 + k * rise - 3;
    motifs.push(...ST.picture(name, cx, tread + b.bottom * h, h));
  });
  return { motifs, decor: [{ d, w: 3 }, { m: 'roundRect', a: [520, 20, 128, 60, 30] }, { m: 'circle', a: [556, 50, 8], fill: SOLID, stroke: false }, { m: 'glyph.arrow', a: [598, 50, 26], w: 3 }] };
}
const copy = (id, level, name, names) => ({ id: 'ptx-K-426-' + id, face: 'K-426', level, name: { en: name }, skin: () => ({ ...BAND[level], occlusion: false, items: [], ...stairs(level, names) }) });
const SCENES = [
  // L1 — three big steps, one or two strokes each: simple shapes that can only be the object (an egg reads as an O,
  // a lollipop as a P, a bowling pin as an 8 — visual read 2026-10-22), a quarter lighter than the published page
  copy('sky', 1, 'Sky Steps', ['cloud', 'plane', 'kite']),
  copy('party', 1, 'Party Steps', ['partyHat', 'candle', 'icecream2']),
  copy('campsite', 1, 'Campsite Steps', ['tent', 'tree', 'kite']),
  copy('sea', 1, 'Sea Steps', ['sail2', 'fish', 'cloud']),
  copy('rainy-day', 1, 'Rainy Day Steps', ['cloud', 'drop', 'umbrella']),
  // L2 — the published four steps, up to four strokes
  copy('beach', 2, 'Beach Steps', ['anchor', 'surfboard', 'sailboat', 'bucket']),
  copy('kitchen', 2, 'Kitchen Steps', ['saucepan', 'jar', 'board', 'cup']),
  copy('garden-shed', 2, 'Garden Shed Steps', ['spade', 'vase', 'flower', 'wateringCan']),
  copy('classroom', 2, 'Classroom Steps', ['pencil', 'plane', 'book', 'ruler']),
  copy('market', 2, 'Market Steps', ['bread', 'banana', 'carrot', 'pear']),
  // L3 — five smaller steps, three or four strokes (the sock's and the mitten's body start mid-picture)
  copy('treasure', 3, 'Treasure Steps', ['crown', 'gem', 'chest', 'anchor', 'key']),
  copy('wardrobe', 3, 'Getting Dressed Steps', ['shirt', 'mitten', 'hat', 'boot3', 'sock']),
  copy('gym', 3, 'Gym Steps', ['dumbbell', 'bottle', 'kettlebell', 'ball3', 'trophy']),
  copy('picnic', 3, 'Picnic Steps', ['apple3', 'cup3', 'basket', 'icecream', 'mushroom']),
  copy('workshop', 3, 'Workshop Steps', ['toolbox', 'hammer', 'paintCan', 'screwdriver', 'paintBrush']),
];
module.exports = { SCENES };
