/**
 * data/ptx/scenes-G1432.js — G1-432 "The other half" Level Set copies (ptl): an open book with a hero picture across its
 * fold and a row of arched mirrors below, each with one picture; every picture is a FRONT-VIEW, MEASURED-symmetric drawing
 * (data/pt/symmetry.json) split at its MEASURED axis — the left half drawn solid, the right half its own lines dashed.
 * Concepts: _work/ptl-scenes-B.json (Designer B); every cast re-measured at its placed size (out/ptl/_sym.js).
 * Levels (ptl-levels.md §G1-432): L1 G1-1 — book + 2 arches, 220-330 px, outline-led drawings, halves ≤ 5 px apart ·
 * L2 G1 — book + 3 arches (the published shape), 160-300 px, ≤ 10 px · L3 G1-3 — book + 3 arches, 150-290 px, inner details
 * on the dashed half (eyes, stripes, petals), ≤ 8 px. A load-time check refuses a picture whose halves differ by more than
 * its level allows at the size it is placed.
 */
'use strict';
const SYM = require('../pt/symmetry.json');
const { wOf } = require('./lay.js');
const { helpers: { SOLID } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'G1-1', style: 'P2' }, 2: { band: 'G1', style: 'P3' }, 3: { band: 'G1-3', style: 'P3' } };
const MAXD = { 1: 5, 2: 10, 3: 8 };
const MIRROR = { w: 1, colour: '#777', dash: '8 3 2 3' };
/** the page: the open book (y 22..bookB) with its ribbon and fold line, n arches across the bottom */
function page(level, hero, arches) {
  const n = arches.length, bookB = n === 2 ? 380 : 392, W = n === 2 ? 270 : 200, gap = (675 - 2 * 18 - n * W) / (n - 1);
  const decor = [
    { d: `M337 22 Q180 18 24 34 L24 ${bookB + 12} Q180 ${bookB - 4} 337 ${bookB} Z`, w: 2.5 },
    { d: `M338 22 Q495 18 651 34 L651 ${bookB + 12} Q495 ${bookB - 4} 338 ${bookB} Z`, w: 2.5 },
    { d: 'M596 22 L596 70 L604 60 L612 70 L612 22', w: 2, fill: SOLID },
    { d: `M337.5 30 L337.5 ${bookB - 4}`, ...MIRROR },
  ];
  const items = [{ ...hero, axisX: 337.5, render: 'half' }];
  arches.forEach((a, i) => {
    const x = 18 + i * (W + gap), cx = x + W / 2, top = bookB + 36, r = W / 2;
    decor.push({ d: `M${x} 706 L${x} ${top + r} A${r} ${r} 0 0 1 ${x + W} ${top + r} L${x + W} 706 Z`, w: 2.5 });
    const ph = a.h != null ? a.h : a.w / (wOf(a.src, 1) || 1);
    // the mirror line stops ABOVE the picture (through a face it read as a line to trace)
    decor.push({ d: `M${cx} ${top + 12} L${cx} ${Math.max(top + 24, 690 - ph - 10)}`, ...MIRROR });
    items.push({ ...a, axisX: cx, y: 690, render: 'half' });
  });
  return { ...BAND[level], occlusion: false, decor, items, motifs: [] };
}
const ERR = [];
/** each picture fills its box (the book's page area, an arch) by its measured aspect: wide by width, tall by height */
const BOX = { 1: { hero: [430, 300], arch: [230, 236] }, 2: { hero: [420, 290], arch: [176, 200] }, 3: { hero: [420, 280], arch: [172, 190] } };
const fit = (src, [W, H]) => (wOf(src, 1) >= W / H ? { src, w: W } : { src, h: H });
const copy = (id, level, name, heroSrc, archSrcs) => {
  const hero = { ...fit(heroSrc, BOX[level].hero), y: (archSrcs.length === 2 ? 380 : 392) - 30 }, arches = archSrcs.map((s) => fit(s, BOX[level].arch));
  for (const it of [hero, ...arches]) if (!SYM[it.src]) ERR.push(`G1-432 ${id}: ${it.src} has no measured axis`);
  return { id: 'ptx-G1-432-' + id, face: 'G1-432', level, name: { en: name }, skin: () => page(level, hero, arches) };
};
// casts MEASURED (out/ptl/_sym.js: the halves' difference at the placed size) — none of the published four (butterfly
// Easter bw, owl, trophy, teddy); nothing used twice; no letter-shaped drawing (bowling pin = 8, round glasses = oo, the taxi's roof sign)
const SCENES = [
  // ── L1 — book + 2 arches, big outline-led drawings, halves ≤ 5 px apart ─────────────────────────────────────────────
  copy('kitchen', 1, 'The Kitchen Book', 'kitchen bw/pot', ['kitchen bw/spoon', 'kitchen bw/glass']),
  copy('bedroom', 1, 'The Bedroom Book', 'furniture bw/wardrobe_2', ['furniture bw/floor_lamp', 'valentine bw 2/handbag']),
  copy('space', 1, 'The Space Book', 'toys bw/ufo', ['nature bw/star', 'space bw/rocket']),
  copy('beach', 1, 'The Beach Book', 'beach bw/sunglasses', ['beach bw 2/surfboard', 'tools bw/shovel']),
  copy('puppy', 1, 'The Puppy’s Book', 'objects bw/bone', ['kitchen bw/jar', 'Easter bw/bell']),
  // ── L2 — book + 3 arches (the published shape), halves ≤ 10 px ──────────────────────────────────────────────────────
  copy('living-room', 2, 'The Living Room Book', 'furniture bw/sofa', ['furniture bw/table_lamp', 'furniture bw/table', 'home and nature bw/plate']),
  copy('sports-day', 2, 'The Sports Day Book', 'sports bw/skateboard', ['sports bw/kettlebell', 'sports bw/goggles', 'sports bw/helmet']),
  copy('rainy-day', 2, 'The Rainy Day Book', 'apparel bw/coat_2', ['animals bw 5/frog', 'valentine bw/padlock', 'household bw/cabinet']),
  copy('road-trip', 2, 'The Road Trip Book', 'travel and holiday bw/bus', ['vehicles bw/car_3', 'tools bw/traffic_cone', 'travel and holiday bw/sunglasses']),
  copy('koala', 2, 'The Koala’s Book', 'faces bw/koala', ['food bw 3/egg', 'kitchen bw/spatula_2', 'household bw/bottle']),
  // ── L3 — book + 3 arches, inner details on the dashed half, halves ≤ 8 px ────────────────────────────────────────────
  copy('garden-party', 3, 'The Garden Party Book', 'nature bw/butterfly', ['nature bw/ladybug', 'sports bw/rosette', 'toys bw/drum']),
  copy('old-town', 3, 'The Old Town Book', 'travel and holiday bw/museum', ['classroom bw/bell', 'furniture bw/stool', 'furniture bw/cabinet']),
  copy('dressing-room', 3, 'The Dressing Room Book', 'furniture bw/vanity_table', ['home bw/chandelier', 'objects bw/jacket', 'beach bw/sunglasses']),
  copy('grandma', 3, 'Grandma’s Book', 'furniture bw/dresser_2', ['apparel bw/babys_onesie', 'home bw 2/fan', 'apparel bw/scarf_2']),
  copy('little-theatre', 3, 'The Little Theatre Book', 'travel and holiday bw/stage', ['toys bw/teddy_bear', 'household bw/lamp', 'toys bw 2/kite']),
];
if (ERR.length) throw new Error(ERR.join(' | '));
module.exports = { SCENES, MAXD };
