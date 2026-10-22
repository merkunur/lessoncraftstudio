/**
 * data/ptx/scenes-K424.js — K-424 "Curls and spirals" Level Set copies (ptl): a GALLERY OF FRAMES, one picture per frame,
 * every picture's dominant line a spiral or a loop. Concepts: _work/ptl-scenes-A.json (Designer A); the library has few
 * clean spirals (ptl-levels.md §K-424 supply risk), so most pictures are DRAWN (data/ptx/cl.js) in the library's line style.
 * Levels (ptl-levels.md §K-424): L1 K-1 — 3 big frames, spirals ≤ 2 turns ≥ 30 px apart, a start dot at each spiral's OUTER
 * end · L2 K — the published 5 frames, turns ≥ 18 apart · L3 K-3 — 6 frames, ≥ 3 turns ≥ 12 apart, loops and coils.
 */
'use strict';
const C = require('./cl.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const LV = { 1: { gap: 34, turns: [1.5, 2] }, 2: { gap: 20, turns: [2, 3.5] }, 3: { gap: 13, turns: [3, 4.5] } };
/** the frame layouts [x, y, w, h] on the 675 × 716 body */
const FRAMES = {
  1: [[14, 8, 647, 350], [14, 372, 316, 336], [345, 372, 316, 336]],
  2: [[14, 8, 406, 396], [434, 8, 227, 396], [14, 418, 196, 290], [224, 418, 196, 290], [434, 418, 227, 290]],
  3: [[14, 8, 207, 344], [234, 8, 207, 344], [454, 8, 207, 344], [14, 364, 207, 344], [234, 364, 207, 344], [454, 364, 207, 344]],
};
/** one frame's content: a drawn picture name, { src } a library picture fitted to the frame, or { src, trail } a small
 *  library picture at the end of a looping trail (a rocket, a leaf) */
function fill(level, [x, y, w, h], c) {
  const cx = x + w / 2, cy = y + h / 2, s = Math.min(w, h) - 36, { gap, turns } = LV[level], box = { cx, cy, w: w - 28, h: h - 28 };
  if (typeof c === 'string') {
    const r = C.pic(c, box, gap, turns);
    const motifs = level === 1 ? r.motifs.map((m) => (m.a[1] ? m : { ...m, start: 'lines' })) : r.motifs;
    return { motifs, decor: r.decor, items: [] };
  }
  if (c.trail) {   // the picture at the top, its looping trail running down to the frame's foot (a rocket's exhaust, a falling leaf)
    const ph = (h - 30) * (level === 1 ? 0.67 : 0.56), top = y + 16, foot = y + h - 22, by = top + ph;
    const trail = { m: 'line', a: [C.loopsAlong([[cx, by + 6], [cx, foot]], c.loops || 3, gap * 0.6, 1, Math.max(gap * 0.9, (w - 30) * 0.12))], ...(level === 1 ? { start: 'lines' } : {}) };
    return { motifs: [trail], decor: [], items: [{ src: c.src, x: cx, y: top + ph / 2, fitBox: [(w - 30) * 0.7, ph], anchor: 'centre', ...(c.opt || {}) }] };
  }
  return { motifs: [], decor: [], items: [{ src: c.src, x: cx, y: cy, fitBox: [(w - 30) * (c.k || 0.9), (h - 30) * (c.k || 0.9)], anchor: 'centre', ...(c.opt || {}) }] };
}
function gallery(level, list) {
  const F = FRAMES[level];
  if (list.length !== F.length) throw new Error(`K-424 L${level}: ${list.length} pictures for ${F.length} frames`);
  const out = { motifs: [], items: [], decor: F.map(([x, y, w, h]) => ({ m: 'roundRect', a: [x, y, w, h, 18] })) };
  list.forEach((c, i) => { const r = fill(level, F[i], c); out.motifs.push(...r.motifs); out.items.push(...r.items); out.decor.push(...r.decor); });
  return out;
}
const copy = (id, level, name, list) => ({ id: 'ptx-K-424-' + id, face: 'K-424', level, name: { en: name }, skin: () => ({ ...BAND[level], ...gallery(level, list) }) });
const SCENES = [
  // L1 — three big frames, one smooth spiral or loop each
  copy('bakery', 1, 'Bakery Swirls', ['cinnamonRoll', 'steamCup', 'frostingCupcake']),
  copy('windy-day', 1, 'The Windy Day', ['kiteLoops', 'windSwirl', 'balloonCurl']),
  copy('ribbon-dance', 1, 'Ribbon Dance', ['ribbonStick', 'spring', { src: 'sports bw 2/jump_rope' }]),
  copy('galaxy', 1, 'Space Spirals', ['galaxy', 'ufo', 'shootingStar']),
  copy('ocean-wave', 1, 'The Curling Wave', ['wave', 'whirlpool', 'kelp']),
  // L2 — the published five frames (one big, one tall, three small)
  copy('reef', 2, 'The Reef', [{ src: 'sea life bw 2/seahorse' }, 'kelp', 'ammonite', 'bubbleLoops', { src: 'sea life bw/octopus' }]),
  copy('rainforest', 2, 'The Rainforest', [{ src: 'animals bw 5/chameleon' }, 'vine', { src: 'animals bw/monkey_2' }, 'fiddlehead', 'coiledSnake']),
  copy('park', 2, 'In the Park', [{ src: 'animals bw 5/squirrel' }, 'yoyo', 'rose', { src: 'sea life bw 2/snail' }, 'balloonCurl']),
  copy('sweet-shop', 2, 'The Sweet Shop', [{ src: 'dessert bw/cupcake' }, 'curlyStraw', 'candy', 'creamMug', 'swissRoll']),
  copy('sitting-room', 2, 'Grandma’s Sitting Room', [{ src: 'household bw/telephone' }, 'teapot', 'yarnBall', 'slinky', 'spiralRug']),
  // L3 — six frames, more turns, finer lines
  copy('deep-sea', 3, 'The Deep Sea', [{ src: 'sea life bw 2/octopus' }, 'nautilus', { src: 'animals bw/seahorse' }, 'kelp', 'jellyCurls', 'whirlpool']),
  copy('reptile-house', 3, 'The Reptile House', [{ src: 'zoo animals bw/snake' }, 'coiledSnake', { src: 'animals bw/chameleon' }, 'ropeCoil', { src: 'animals bw 5/snake' }, 'ammonite']),
  copy('garden', 3, 'The Vegetable Garden', ['hoseReel', 'vine', 'sunflower', 'cabbage', 'worm', { src: 'sea life bw 2/snail' }]),
  copy('woodland', 3, 'In the Woods', [{ src: 'animals bw/squirrel' }, 'spiderWeb', 'fiddlehead', 'smokeHouse', { src: 'animals bw 2/squirrel' }, 'vine']),
  copy('funfair', 3, 'The Funfair', ['helterSkelter', 'coaster', 'candyFloss', 'balloonCurl', 'yoyo', 'streamer']),
];
module.exports = { SCENES };
