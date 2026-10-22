/**
 * data/ptx/scenes-K429.js — K-429 "Christmas" Level Set copies (ptl): a room (or a neutral winter porch) with a decorated
 * tree whose round baubles are traced all the way round, a star on top, gifts, and the room's own furniture; no figures,
 * no Santa as hero, nothing religious. Concepts: _work/ptl-scenes-B.json (Designer B); the tree + furniture data/ptx/xm.js
 * (baubles placed INSIDE the crown by measurement). Levels (ptl-levels.md §K-429): L1 K-1 — 5-6 baubles r ≥ 32 on a tree
 * 280-360 px, 4,500-6,500 · L2 K — 10-12 baubles r 22-28, 8,000-11,000 · L3 K-3 — 14-18 baubles r 15-20 ≥ 12 apart,
 * 11,000-13,000.
 */
'use strict';
const X = require('./xm.js');
const C = require('./dc.js');
const { row } = require('./lay.js');
const { helpers: { gift } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const floor = (y = 690) => ({ m: 'line', a: [[[14, y], [661, y]]] });
// the tree stands on the floor in the LEFT zone (x 14-360); the room lives in the right zone (x ≥ 380)
const TREE = {
  1: (seed, over = {}) => X.tree({ cx: 185, top: 140, floorY: 690, hw: 160, n: 5, r: 32, gap: 15, seed, ...over }),
  2: (seed, over = {}) => X.tree({ cx: 185, top: 84, floorY: 690, hw: 170, n: 11, r: 22, stars: 2, starR: 20, gap: 13, seed, ...over }),
  3: (seed, over = {}) => X.tree({ cx: 180, top: 80, floorY: 690, hw: 168, n: 16, r: 16, stars: 2, starR: 15, gap: 12, seed, ...over }),
};
// a K-1 room with a tree, gifts and furniture weighs 6,600-6,900 px: inside the ladder's "a quarter under the published
// 9,722" (≤ 7,291), over the band's general 6,500 cap — the face carries its own L1 cap
const CAP = { 1: 7200 };
const copy = (id, level, name, build) => ({ id: 'ptx-K-429-' + id, face: 'K-429', level, name: { en: name }, skin: () => ({ ...BAND[level], ...(CAP[level] ? { budget: CAP[level] } : {}), decor: [], ...build() }) });
const SCENES = [
  // ── L1 — five or six big baubles ────────────────────────────────────────────────────────────────────────────────────
  copy('log-cabin', 1, 'The Log Cabin', () => ({
    motifs: [...TREE[1](3, { pot: 'bucket' }), ...C.table(400, 500, 250, 172), floor()],
    items: [{ src: 'Christmas bw/gingerbread_man', x: 525, y: 498, h: 230 }],
  })),
  copy('baking-day', 1, 'Baking Day', () => ({
    motifs: [...TREE[1](5, { n: 6, r: 31 }), ...X.cooker(420, 690, 220, 260), floor()],
    items: [{ src: 'Christmas bw 2/mug', x: 530, y: 428, h: 200 }],
  })),
  copy('school-party', 1, 'The School Party', () => ({
    motifs: [...X.garland(380, 661, 40, 30), { m: 'line', a: [[[520, 56], [520, 150]]] }, ...TREE[1](7, { n: 6, r: 31 }), ...gift(520, 690, 165, 2), floor()],
    items: [{ src: 'Christmas bw/bell', x: 520, y: 360, h: 210 }],
  })),
  copy('bedtime', 1, 'Before Bedtime', () => ({
    motifs: [...C.windowPanes(430, 70, 200, 170), { m: 'moon', a: [482, 118, 24] }, ...TREE[1](9, { pot: 'stool' }), floor()],
    items: [{ src: 'animals bw/teddy_bear_2', x: 520, y: 690, h: 230 }],
  })),
  copy('shop-window', 1, 'The Shop Window', () => ({
    motifs: [...C.windowPanes(410, 90, 220, 170), ...TREE[1](11, { n: 6, r: 31 }), floor()],
    items: [{ src: 'Christmas bw/shopping_bag', x: 520, y: 690, h: 260 }],
  })),
  // ── L2 — ten to twelve baubles ───────────────────────────────────────────────────────────────────────────────────────
  copy('fireplace', 2, 'By the Fireplace', () => ({
    motifs: [...TREE[2](13), ...X.fireplace(410, 690, 220, 270), floor(), ...gift(345, 690, 90, 2)],
    items: [{ src: 'Christmas bw 2/christmas_stocking', x: 460, y: 398, h: 150 }, { src: 'Christmas bw 2/snow_globe', x: 580, y: 398, h: 140 }],
  })),
  copy('hallway', 2, 'Grandma’s Hallway', () => ({
    motifs: [...TREE[2](17), ...X.door(480, 690, 160, 380), ...X.coatRack(390, 640, 150, 3), floor(), ...gift(345, 690, 80, 2)],
    items: [{ src: 'apparel bw/hat_2', x: 418, y: 300, h: 132 }, { src: 'apparel bw/mittens', x: 420, y: 470, w: 132 }],
  })),
  copy('porch', 2, 'On the Porch', () => ({
    motifs: [{ m: 'line', a: [[[14, 40], [661, 40]]] }, ...TREE[2](19, { pot: 'bucket' }), ...X.rail(380, 661, 520, 100, 4), floor(), { m: 'snowflake', a: [450, 120, 26] }],
    items: [{ src: 'Christmas bw 2/sleigh', x: 520, y: 690, w: 205 }, { src: 'Christmas bw 2/snowman', x: 530, y: 400, h: 220 }],
  })),
  copy('toy-corner', 2, 'The Toy Corner', () => ({
    motifs: [...TREE[2](23, { n: 12, r: 21 }), ...C.plank(390, 400, 260, 16), floor()],
    items: [{ src: 'toys bw/rocking_horse', x: 520, y: 690, h: 190 }, { src: 'toys bw/drum', x: 520, y: 400, h: 160 }],
  })),
  copy('reading-nook', 2, 'The Reading Nook', () => ({
    motifs: [...TREE[2](29, { n: 10, r: 25 }), ...X.floorLamp(610, 690, 330), floor()],
    items: [{ src: 'classroom bw 2/bookshelf', x: 470, y: 690, h: 330 }],
  })),
  // ── L3 — fourteen to eighteen small baubles ───────────────────────────────────────────────────────────────────────────
  copy('gingerbread', 3, 'The Gingerbread Kitchen', () => ({
    motifs: [...TREE[3](31, { n: 16 }), ...C.table(380, 500, 270, 172), ...C.plank(400, 260, 240, 14), floor()],
    items: [{ src: 'Christmas bw 2/gingerbread_house', x: 470, y: 498, w: 170 }, { src: 'food bw/cookie', x: 600, y: 498, w: 96 }, { src: 'Christmas bw 2/gingerbread_man', x: 450, y: 690, h: 150 }, { src: 'Christmas bw/candy_cane', x: 590, y: 690, h: 150 }, { src: 'Christmas bw 2/mug', x: 520, y: 260, h: 110 }],
  })),
  copy('concert', 3, 'The Winter Concert', () => ({
    // (a drawn music stand read as a lamp: the drum stands on the floor instead)
    motifs: [...X.garland(390, 661, 40, 34), ...TREE[3](37, { n: 18 }), ...C.plank(390, 250, 260, 14), ...C.plank(390, 420, 260, 14), ...gift(600, 690, 80, 2), floor()],
    items: [{ src: 'toys bw 2/trumpet', x: 520, y: 250, w: 190 }, { src: 'Easter bw 2/bell', x: 460, y: 420, h: 120 }, { src: 'Christmas bw/bell', x: 585, y: 420, h: 110 }, { src: 'toys bw/drum', x: 460, y: 690, h: 150 }],
  })),
  copy('skating-hut', 3, 'The Skating Hut', () => ({
    motifs: [...C.windowPanes(390, 60, 250, 170), ...X.coatRack(390, 640, 290, 3), ...TREE[3](41, { n: 17, r: 15 }), ...X.bench(380, 690, 270), floor()],
    items: [{ src: 'Christmas bw 2/ice_skates', x: 450, y: 620, w: 130 }, { src: 'home bw/cup', x: 590, y: 620, h: 96 }, { src: 'apparel bw/hat_2', x: 432, y: 460, h: 120 }, { src: 'apparel bw/mittens', x: 600, y: 440, w: 100 }, { src: 'Christmas bw/stocking', x: 520, y: 460, h: 130 }],
  })),
  copy('post-office', 3, 'The Post Office', () => ({
    motifs: [...X.pigeonHoles(390, 60, 4, 3, 64), ...TREE[3](43, { n: 16, r: 18 }), ...X.counter(390, 690, 250, 200), floor()],
    items: [{ src: 'Christmas bw/envelope', x: 450, y: 490, w: 110 }, { src: 'Christmas bw 2/gift_box', x: 580, y: 490, h: 110 }, { src: 'Christmas bw 2/sack', x: 318, y: 690, h: 125 }],
  })),
  copy('window-seat', 3, 'The Window Seat', () => ({
    motifs: [...C.curtainWindow(410, 60, 210, 220), { m: 'moon', a: [462, 115, 22] }, { m: 'star', a: [568, 110, 14] }, { m: 'star', a: [470, 220, 12] }, { m: 'star', a: [570, 230, 12] },
      ...TREE[3](47, { n: 14, r: 17, pot: 'stool' }), X.rect(380, 520, 270, 26), X.rect(392, 546, 246, 144), floor()],
    items: [{ src: 'animals bw 4/cat', x: 460, y: 520, h: 120 }, { src: 'Christmas bw 2/candle', x: 600, y: 520, h: 140 }, { src: 'animals bw/teddy_bear_2', x: 515, y: 680, h: 110 }],
  })),
];
module.exports = { SCENES };
