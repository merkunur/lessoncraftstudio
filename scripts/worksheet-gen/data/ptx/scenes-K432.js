/**
 * data/ptx/scenes-K432.js — K-432 "Big, middle, small" Level Set copies (ptl): rows of the SAME drawing three times,
 * biggest on the LEFT, each row on its own ground; the dash gets finer as the copy gets smaller (big / middle / small:
 * L1 P1 P1 P2 · L2 P1 P2 P3 · L3 P2 P3 P3). Concepts: _work/ptl-scenes-B.json (Designer B; the L3 casts were replaced by
 * MEASURED wide drawings — four rows of 175 px only hold drawings at least twice as wide as tall).
 * Levels (ptl-levels.md §K-432): L1 K-1 — 2 rows, 320 / 220 / 150 · L2 K — 3 rows, 290 / 197 / 130 · L3 K-3 — 4 rows,
 * 300 / 190 / 110 (wide side); the small copy never under 130 px (L1-L2) / 110 px (L3).
 */
'use strict';
const { wOf } = require('./lay.js');
const { helpers: { GREY } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const LV = {
  1: { grounds: [355, 692], sizes: [320, 220, 150], styles: ['P1', 'P1', 'P2'], floor: 130, budget: 7000 },
  2: { grounds: [238, 468, 698], sizes: [290, 197, 130], styles: ['P1', 'P2', 'P3'], floor: 130 },
  3: { grounds: [176, 352, 528, 704], sizes: [300, 190, 110], styles: ['P2', 'P3', 'P3'], floor: 110 },
};
function rows(level, srcs, sky = []) {
  const { grounds, sizes, styles, floor, budget } = LV[level];
  if (srcs.length !== grounds.length) throw new Error(`K-432 L${level}: ${srcs.length} rows for ${grounds.length}`);
  const items = [], decor = [...sky];
  srcs.forEach((src, r) => {
    const g = grounds[r], rowH = g - (r ? grounds[r - 1] : 20) - 24;
    // the wide side is the size; a tall drawing is held by the row's height instead (same ratio for all three)
    const asp = wOf(src, 1), cap = asp >= 1 ? sizes[0] : Math.min(sizes[0], rowH);           // the big copy's longest side
    const big = Math.min(cap, asp >= 1 ? rowH * asp : rowH), small = Math.max(floor + 2, big * sizes[2] / sizes[0]), mid = (big + small) / 2;
    // three copies must FIT the row with a real gap between them (the ladder's L1 sizes add up wider than the page)
    const X0 = 10, X1 = 665, minGap = level === 3 ? 18 : 28;
    let L = [big, mid, small], ws = L.map((l) => (asp >= 1 ? l : l * asp));
    const room = X1 - X0 - 2 * minGap, sum0 = ws.reduce((a, b) => a + b, 0);
    if (sum0 > room) { const f = room / sum0; L = L.map((l, i) => (i === 2 ? Math.max(floor + 2, l * f) : l * f)); ws = L.map((l) => (asp >= 1 ? l : l * asp)); const over = ws.reduce((a, b) => a + b, 0) - room; if (over > 0) { ws[0] -= over * 0.6; ws[1] -= over * 0.4; } }
    const total = ws.reduce((a, b) => a + b, 0), gap = (X1 - X0 - total) / 2;
    let x = X0; ws.forEach((w, i) => { items.push({ src, x: Math.round(x + w / 2), y: g - 2, w: Math.round(w), style: styles[i], noBlobs: true }); x += w + gap; });
    decor.push({ d: `M4 ${g} L671 ${g}`, w: 2.5 });
  });
  return { ...BAND[level], occlusion: false, minPicFloor: floor, ...(budget ? { budget } : {}), decor, items, motifs: [] };
}
const cloud = (x, y, w) => ({ m: 'cloud', a: [x, y, w], colour: GREY, w: 2 });
const copy = (id, level, name, srcs, sky) => ({ id: 'ptx-K-432-' + id, face: 'K-432', level, name: { en: name }, skin: () => rows(level, srcs, sky) });
// casts chosen by MEASURED traced length (out/ptl/_len.js): three copies of a drawing weigh ≈ 2.1 × its big copy, so the
// K-1 pages take simple outlines and every L3 set sums to 5,600-6,500 px at 300 px (inside the 13,000 cap, ≥ 15 % over)
const SCENES = [
  // L1 — two rows, big pictures
  copy('pond', 1, 'At the Pond', ['birds bw/duck', 'nature bw/fish'], [cloud(560, 74, 110)]),
  copy('toy-box', 1, 'The Toy Box', ['valentine bw 2/balloon', 'toys bw 2/kite']),
  copy('fruit', 1, 'Fruit on the Table', ['fruits bw/apple', 'fruits bw/banana']),
  copy('tea-time', 1, 'Tea Time', ['home bw/cup', 'kitchen bw/teapot']),
  copy('deep-sea', 1, 'In the Deep Sea', ['sea life bw/dolphin', 'sea life bw 2/whale']),
  // L2 — three rows (the published shape)
  copy('farmyard', 2, 'On the Farm', ['farm bw/duck', 'animals bw 4/cat', 'farm bw/watering_can']),
  copy('birthday', 2, 'Birthday Party', ['valentine bw/balloon', 'food bw 2/cake', 'toys bw/party_hat']),
  copy('rainy', 2, 'A Rainy Walk', ['home and nature bw/cloud', 'nature bw/umbrella', 'tools bw/rubber_boot']),
  copy('space', 2, 'A Trip to Space', ['space bw/ufo', 'nature bw/star', 'space bw/rocket']),
  copy('lake', 2, 'By the Lake', ['birds bw 2/duck', 'animals bw/swan', 'nature bw/leaf']),   // the small kayak printed as a tangle
  // L3 — four rows of WIDE drawings (measured aspect ≥ 2)
  copy('ocean-parade', 3, 'The Ocean Parade', ['animals bw/whale_2', 'sea life bw/shark', 'sea life bw/lobster', 'sea life bw 2/seal']),   // the dense boat printed as a tangle at its small size; a round picture (turtle, stingray) shows three near-equal sizes
  copy('toy-parade', 3, 'The Toy Parade', ['toys bw/train', 'sports bw 2/skateboard', 'Christmas bw/candy', 'objects bw/bone']),
  copy('picnic', 3, 'A Sunny Picnic', ['food bw 2/hot_dog', 'dessert bw/candy', 'beach bw/sunglasses', 'vegetables bw/cucumber']),
  copy('kitchen', 3, 'In the Kitchen', ['kitchen bw/saucepan', 'home bw/frying_pan', 'kitchen bw/plate', 'food bw/hot_dog']),
  copy('holiday-trip', 3, 'The Holiday Trip', ['vehicles bw 2/car', 'beach bw 2/boat_2', 'sports bw/skateboard', 'travel and holiday bw/mountain']),
];
module.exports = { SCENES };
