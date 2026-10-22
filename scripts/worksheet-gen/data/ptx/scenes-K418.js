/**
 * data/ptx/scenes-K418.js — K-418 "Picture tracing" (the base face) Level Set copies (ptl): ONE place in ONE moment, every
 * picture standing on something, a horizon, no frame; every line traced (sub-floor details solid).
 * Concepts: _work/ptl-scenes-A.json (Designer A); drawn structures data/ptx/dr.js; rows spaced by MEASURED widths
 * (data/ptx/lay.js). Levels (ptl-levels.md §K-418): L1 K-1 — 3-4 band-1 pictures 200-330 px + ground + one sky motif,
 * 4,500-6,500 px · L2 K — 5-7 pictures 130-320 px, 8,000-11,000 · L3 K-3 — 8-10 pictures 95-260 px + a path / rails / river,
 * 12,000-13,000 (one band-3 hero at most). Body 675 × 716.
 */
'use strict';
const D = require('./dr.js');
const { row } = require('./lay.js');
const { helpers: { grassSolid } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const ground = (y, amp = 5, rolls = 3, x0 = 14, x1 = 661) => ({ m: 'ground', a: [x0, x1, y, amp, rolls] });
const flat = (y, x0 = 14, x1 = 661) => ({ m: 'line', a: [[[x0, y], [x1, y]]] });
const sun = (x, y, r, rays = 8) => ({ m: 'sun', a: [x, y, r, rays] });
const cloud = (x, y, w) => ({ m: 'cloud', a: [x, y, w] });
const star = (x, y, r) => ({ m: 'star', a: [x, y, r] });
const drop = (x, y, h) => ({ m: 'drop', a: [x, y, h] });
const waves = (x0, x1, y, wl = 46, a = 7) => ({ m: 'waves', a: [x0, x1, y, wl, a] });
const fence = (x0, x1, y, h, posts) => ({ m: 'fence', a: [x0, x1, y, h, posts] });
const copy = (id, level, name, build) => ({ id: 'ptx-K-418-' + id, face: 'K-418', level, name: { en: name }, skin: () => ({ ...BAND[level], decor: [], ...build() }) });
const SCENES = [
  // ── L1 — three or four big band-1 pictures ──────────────────────────────────────────────────────────────────────────
  copy('rainy-day', 1, 'A Rainy Day', () => {
    const it = row(652, [{ src: 'nature bw/umbrella', h: 270 }, { src: 'animals bw 5/duck', h: 205 }, { src: 'tools bw/rubber_boot', h: 210 }]);
    return { items: it, motifs: [cloud(200, 150, 250), drop(120, 230, 42), drop(185, 262, 42), drop(250, 232, 42), drop(315, 262, 42), ground(652), ...D.puddle(it[1].x, 674, 200)] };
  }),
  copy('rocket-moon', 1, 'Rocket to the Stars', () => ({
    motifs: [{ m: 'line', a: [[[14, 668], [120, 664], [200, 668], [330, 664], [470, 668], [661, 664]]] }, { m: 'line', a: [[[70, 690], [100, 678], [140, 678], [170, 690]]] }, { m: 'line', a: [[[480, 692], [510, 680], [560, 680], [590, 692]]] }, star(330, 90, 30), star(560, 330, 26), star(90, 380, 24)],
    items: [{ src: 'space bw/rocket', x: 338, y: 660, h: 400 }, { src: 'space bw/ufo', x: 540, y: 220, w: 230 }, { src: 'space bw/planet_2', x: 135, y: 250, w: 220 }],
  })),
  copy('lighthouse-bay', 1, 'The Lighthouse Bay', () => ({
    motifs: [cloud(430, 120, 120), flat(455, 380, 640), flat(690, 24, 651)],
    items: [{ src: 'beach bw/lighthouse', x: 172, y: 690, h: 305 }, { src: 'vehicles bw/boat', x: 505, y: 455, w: 212 }, { src: 'animals bw 5/crab', x: 510, y: 690, w: 200 }],
  })),
  copy('hen-house', 1, 'The Hen and Her Chick', () => {
    const it = row(690, [{ src: 'animals bw 4/chicken', h: 270 }, { src: 'animals bw 4/chick', h: 205 }], 262, 655);
    return { items: it, motifs: [sun(590, 95, 40), cloud(390, 120, 170), ...D.henHouse(30, 690, 200, 300), ground(690, 0, 1)] };
  }),
  copy('penguin-ice', 1, 'Penguins on the Ice', () => {
    const it = row(560, [{ src: 'sea life bw 2/seal', w: 200 }, { src: 'birds bw/penguin_2', h: 225 }, { src: 'birds bw/penguin', h: 200 }]);
    return { items: it, motifs: [sun(570, 100, 40), ...D.igloo(150, 330, 90), flat(560), waves(14, 661, 650, 110, 10)] };
  }),
  // ── L2 — five to seven pictures ─────────────────────────────────────────────────────────────────────────────────────
  copy('farm-morning', 2, 'Morning on the Farm', () => ({
    motifs: [sun(600, 86, 36), cloud(400, 110, 150), ...D.barn(30, 420, 250, 260), fence(300, 661, 470, 70, 7), ground(690, 4, 3)],
    decor: [grassSolid(300, 700, 22), grassSolid(470, 702, 20)],
    items: [{ src: 'animals bw 4/cow', x: 470, y: 520, h: 190 }, ...row(690, [{ src: 'farm bw/watering_can', w: 150 }, { src: 'animals bw 4/sheep', h: 160 }, { src: 'animals bw 4/pig_2', h: 140 }])],
  })),
  copy('playground', 2, 'Fun at the Playground', () => ({
    motifs: [sun(600, 80, 34), ...D.slide(30, 672, 250, 110), ...D.swing(528, 672, 170, 240), ground(672, 3, 3)],
    items: [{ src: 'home and nature bw/cloud', x: 150, y: 150, w: 160 }, { src: 'animals bw/dog', x: 305, y: 680, h: 170 }, { src: 'toys bw 2/kite', x: 330, y: 330, h: 200 }, { src: 'nature bw/bird', x: 528, y: 432, h: 130 }],
  })),
  copy('lake-camp', 2, 'Camping by the Lake', () => ({
    motifs: [sun(590, 90, 36), ...D.tent(360, 560, 200, 170), flat(560), waves(500, 661, 612, 50, 7), waves(500, 661, 668, 50, 7)],
    items: [{ src: 'home and nature bw/cloud', x: 360, y: 150, w: 160 }, { src: 'home and nature bw/tree_3', x: 140, y: 560, h: 300 }, { src: 'travel and holiday bw/kayak', x: 580, y: 600, w: 160 }, ...row(705, [{ src: 'animals bw 5/fox', h: 150 }, { src: 'nature bw/campfire', w: 125 }], 200, 475)],
  })),
  copy('zoo-day', 2, 'A Day at the Zoo', () => ({
    motifs: [sun(100, 86, 36), cloud(420, 100, 160), flat(490), fence(14, 661, 700, 50, 12)],
    items: [{ src: 'animals bw 5/flamingo', x: 240, y: 490, h: 200 }, ...row(690, [{ src: 'zoo animals bw/elephant', h: 180 }, { src: 'zoo animals bw/kangaroo', h: 180 }, { src: 'beach bw/palm_tree', h: 300 }])],
  })),
  copy('harbour', 2, 'Boats in the Harbour', () => ({
    motifs: [cloud(560, 80, 150), ...D.houses(14, 400, 270, 3, 200), flat(270, 400, 661), ...D.pier(14, 250, 440, 4, 80), waves(14, 661, 580, 50, 7), waves(14, 661, 660, 50, 7)],
    items: [{ src: 'vehicles bw 3/boat', x: 500, y: 540, w: 260 }, { src: 'beach bw 2/boat', x: 430, y: 700, w: 190 }, { src: 'beach bw/anchor', x: 70, y: 440, h: 135 }, { src: 'sea life bw 2/seal', x: 180, y: 440, w: 140 }],
  })),
  // ── L3 — eight to ten pictures, a path / rails / river ──────────────────────────────────────────────────────────────
  copy('train-station', 3, 'At the Train Station', () => ({
    motifs: [sun(610, 66, 30), ...D.station(24, 470, 250, 300), flat(470), ...D.rails(14, 661, 678, 20)],
    items: [{ src: 'toys bw/train', x: 338, y: 676, w: 470 }, ...row(470, [{ src: 'travel and holiday bw/signpost', h: 134 }, { src: 'travel and holiday bw/suitcase', h: 95 }, { src: 'Easter bw/tulip', h: 100 }, { src: 'animals bw/cat_2', h: 120 }], 300, 655, 12), { src: 'nature bw/bird', x: 149, y: 164, h: 100 }, { src: 'home and nature bw/cloud', x: 450, y: 150, w: 170 }, { src: 'animals bw 5/rabbit', x: 622, y: 700, h: 100 }],
  })),
  copy('jungle-river', 3, 'Down the Jungle River', () => ({
    motifs: [sun(600, 70, 30), ground(420, 9, 4), ground(600, 9, 4), waves(30, 640, 515, 44, 6), ...D.leaf(24, 414, 150, -1.15), ...D.leaf(651, 414, 140, Math.PI + 1.15), { m: 'line', a: [[[14, 150], [150, 175], [260, 160]]] }],
    items: [{ src: 'animals bw 5/crocodile_2', x: 400, y: 575, w: 240 }, { src: 'birds bw/parrot', x: 175, y: 172, h: 120 }, ...row(418, [{ src: 'zoo animals bw/monkey', h: 130 }, { src: 'birds bw 2/toucan', h: 120 }], 260, 560, 12), ...row(700, [{ src: 'animals bw/hippopotamus', h: 150 }, { src: 'vegetables bw/pumpkin', h: 100 }, { src: 'nature bw/mushroom', h: 105 }, { src: 'animals bw/turtle', w: 140 }], 30, 645, 12)],
  })),
  copy('market-day', 3, 'Market Day', () => ({
    motifs: [sun(600, 70, 30), { m: 'bunting', a: [30, 530, 30, 20, 5] }, ...D.stall(300, 520, 400, 420), ...D.crate(20, 690, 100), ...D.crate(20, 590, 100), ground(690, 0, 1)],
    items: [...row(343, [{ src: 'vegetables bw/pumpkin', h: 100 }, { src: 'vegetables bw/carrot', h: 125 }, { src: 'fruits bw/pear', h: 110 }, { src: 'fruits bw/strawberry', h: 110 }], 112, 488, 12),
      { src: 'food bw/bread', x: 70, y: 490, w: 110 }, ...row(690, [{ src: 'nature bw/bird', h: 100 }, { src: 'farm bw/watering_can', w: 130 }, { src: 'travel and holiday bw/shopping_cart', h: 170 }], 160, 655, 12)],
  })),
  copy('castle-meadow', 3, 'The Castle Meadow', () => ({
    motifs: [cloud(110, 90, 130), { m: 'hill', a: [140, 540, 400, 110] }, ...D.castle(340, 292, 250, 230), ground(560, 3, 2), ground(700, 3, 3)],
    items: [{ src: 'home and nature bw/cloud', x: 575, y: 140, w: 130 }, { src: 'nature bw/bird', x: 430, y: 560, h: 95 }, { src: 'nature bw/tree_2', x: 560, y: 560, h: 250 }, ...row(560, [{ src: 'animals bw/unicorn', h: 160 }], 20, 240), ...row(700, [{ src: 'nature bw/mushroom', h: 100 }, { src: 'valentine bw 2/tulip', h: 115 }, { src: 'animals bw/horse', h: 140 }, { src: 'birds bw 2/goose', h: 120 }, { src: 'animals bw 5/rabbit', h: 110 }], 20, 655, 12)],
  })),
  copy('mountain-hike', 3, 'Up the Mountain', () => ({
    motifs: [sun(600, 60, 26), { m: 'mountains', a: [14, 661, 420, 150, 4] }, ...D.cable(14, 70, 661, 210), ground(520, 6, 3), ...D.path([[320, 716], [340, 640], [300, 560], [330, 470], [360, 400]], 64), ...D.stone(560, 705, 150), ground(705, 0, 1)],
    items: [{ src: 'travel and holiday bw/cable_car', x: 330, y: 262, h: 125 }, { src: 'nature bw/bird', x: 214, y: 113, h: 96 }, ...row(520, [{ src: 'animals bw 3/deer', h: 160 }], 20, 260), { src: 'home and nature bw/tree_3', x: 550, y: 520, h: 200 }, { src: 'animals bw/squirrel', x: 430, y: 520, h: 100 }, { src: 'animals bw/bear', x: 130, y: 705, h: 150 }, { src: 'valentine bw 2/tulip', x: 232, y: 705, h: 100 }, { src: 'animals bw 4/goat', x: 560, y: 655, h: 120 }],
  })),
];
module.exports = { SCENES };
