/**
 * data/ptx/scenes-K425.js — K-425 "Trace and color" Level Set copies (ptl): ONE scene, every traced outline CLOSED so the
 * child can colour what was traced; no colour words, numbers or codes. Concepts: _work/ptl-scenes-A.json (Designer A);
 * closed drawn pieces data/ptx/dc.js; rows spaced by measured widths (data/ptx/lay.js). Levels (ptl-levels.md §K-425):
 * L1 K-1 — 3-4 pictures 220-330 px, cells ≥ 60, ≤ 6,400 · L2 K — 5-7 pictures 140-330, cells ≥ 40, 7,000-11,000 ·
 * L3 K-3 — 8-10 pictures 100-220, cells ≥ 25, 11,000-13,000. L1 casts are library band 1 only (a band-2 balloon bunch was
 * swapped for drawn balloons; the beetle-like ladybug was dropped — a child must name every picture the same way).
 */
'use strict';
const C = require('./dc.js');
const { row } = require('./lay.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const sun = (x, y, r, rays = 8) => ({ m: 'sun', a: [x, y, r, rays, false] });
const cloud = (x, y, w) => ({ m: 'cloud', a: [x, y, w] });
const star = (x, y, r) => ({ m: 'star', a: [x, y, r] });
const moon = (x, y, r) => ({ m: 'moon', a: [x, y, r] });
const circle = (x, y, r) => ({ m: 'circle', a: [x, y, r] });
const flat = (y, x0 = 14, x1 = 661) => ({ m: 'line', a: [[[x0, y], [x1, y]]] });
const fence = (x0, x1, y, h, posts) => ({ m: 'fence', a: [x0, x1, y, h, posts] });
const copy = (id, level, name, build) => ({ id: 'ptx-K-425-' + id, face: 'K-425', level, name: { en: name }, skin: () => ({ ...BAND[level], decor: [], ...build() }) });
const SCENES = [
  // ── L1 — three or four big pictures, big cells ──────────────────────────────────────────────────────────────────────
  copy('bath-time', 1, 'Bath Time', () => ({
    motifs: [...C.bathtub(70, 440, 500, 190), circle(110, 320, 46), circle(150, 180, 36), circle(520, 290, 54), circle(610, 150, 34), circle(440, 110, 28), flat(690)],
    items: [{ src: 'toys bw/duck', x: 300, y: 440, h: 230 }],
  })),
  copy('sky-toys', 1, 'Toys in the Sky', () => ({
    motifs: [moon(420, 100, 40), star(80, 90, 26), star(610, 110, 28), star(300, 70, 22), cloud(170, 600, 230), cloud(490, 560, 250), cloud(330, 700, 200)],
    items: [{ src: 'toys bw/rocket', x: 150, y: 480, h: 300 }, { src: 'toys bw/helicopter', x: 480, y: 420, w: 290 }],
  })),
  copy('pond', 1, 'At the Pond', () => ({
    motifs: [sun(585, 105, 40), cloud(210, 130, 200), C.ell(338, 570, 305, 120), ...C.lilyPad(548, 590, 92), ...C.reed(44, 560, 200), ...C.reed(74, 575, 170)],
    items: [{ src: 'animals bw/swan', x: 300, y: 605, w: 270 }, { src: 'animals bw/frog', x: 548, y: 585, w: 220 }],
  })),
  copy('flowerpot', 1, 'The Flowerpot', () => ({
    motifs: [...C.windowPanes(90, 30, 280, 250), ...C.plank(90, 626, 500, 16)],
    items: [{ src: 'home bw 2/flower', x: 220, y: 626, h: 310 }, { src: 'home bw/cup', x: 480, y: 626, h: 210 }, { src: 'Easter bw/butterfly', x: 555, y: 260, w: 200 }],
  })),
  copy('birthday-cake', 1, 'The Birthday Cake', () => ({
    motifs: [...C.table(40, 560, 595, 130), ...C.balloon(100, 120, 44, 170), ...C.balloon(190, 92, 42, 200), ...C.balloon(270, 150, 38, 140), ...C.present(560, 560, 140)],
    items: [{ src: 'food bw 2/cake_2', x: 370, y: 560, w: 290 }],
  })),
  // ── L2 — five to seven pictures ─────────────────────────────────────────────────────────────────────────────────────
  copy('bedroom', 2, 'Bedtime', () => ({
    motifs: [...C.windowPanes(70, 50, 250, 200), moon(132, 104, 26), star(255, 110, 18), star(140, 200, 14), star(260, 205, 16), ...C.rug(338, 668, 210, 32), flat(620)],
    items: [...row(620, [{ src: 'household bw/bed', w: 300 }, { src: 'toys bw/drum', h: 135 }, { src: 'household bw/plant', h: 190 }]), { src: 'toys bw/teddy_bear', x: 200, y: 520, h: 140 }],
  })),
  copy('classroom', 2, 'In the Classroom', () => ({
    motifs: [...C.board(240, 40, 300, 180), ...C.wallClock(610, 100, 40), ...C.bookshelf(20, 640, 200, 320, 1), flat(640)],
    items: [{ src: 'classroom bw/globe', x: 120, y: 320, h: 150 }, { src: 'classroom bw/book', x: 120, y: 630, w: 140 }, ...row(640, [{ src: 'classroom bw 2/chair', h: 220 }, { src: 'classroom bw 2/backpack', h: 170 }], 260, 655)],
  })),
  copy('bakery', 2, 'The Bakery', () => ({
    motifs: [...C.awning(20, 655, 20, 60, 5), C.rect(20, 470, 635, 20), C.rect(30, 490, 615, 210), ...C.plank(360, 300, 240, 16), ...C.cakeStand(120, 470, 150)],
    items: [{ src: 'dessert bw/cupcake', x: 120, y: 424, h: 170 }, { src: 'kitchen bw/teapot', x: 480, y: 300, w: 160 }, ...row(470, [{ src: 'food bw/bread', w: 131 }, { src: 'food bw 2/croissant', w: 131 }, { src: 'food bw 2/sandwich', w: 131 }], 230, 655, 16)],
  })),
  copy('pet-corner', 2, 'The Pet Corner', () => ({
    motifs: [...C.hutch(30, 640, 260, 300), ...C.plank(440, 250, 215, 16), ...C.fishbowl(548, 250, 78), ...C.rug(528, 690, 132, 22), ...C.foodBowl(350, 704, 90), flat(640, 14, 395)],
    items: [{ src: 'animals bw 4/rabbit', x: 350, y: 640, h: 190 }, ...row(690, [{ src: 'animals bw 5/hedgehog', h: 130 }, { src: 'animals bw 3/mouse', h: 135 }], 398, 655, 16)],
  })),
  copy('veg-garden', 2, 'The Vegetable Garden', () => ({
    motifs: [sun(590, 80, 36), cloud(220, 100, 170), fence(14, 661, 330, 90, 9), ...C.soil(20, 330, 470, 34), ...C.soil(350, 655, 470, 34), ...C.soil(20, 655, 700, 30)],
    items: [{ src: 'vegetables bw/pumpkin', x: 175, y: 470, w: 175 }, ...row(470, [{ src: 'vegetables bw/carrot', h: 165 }, { src: 'vegetables bw/carrot', h: 150, flip: true }], 400, 610, 16), { src: 'animals bw 3/ladybug', x: 230, y: 690, w: 135 }, { src: 'farm bw/watering_can', x: 520, y: 690, w: 170 }],
  })),
  // ── L3 — eight to ten pictures ──────────────────────────────────────────────────────────────────────────────────────
  copy('toy-shop', 3, 'The Toy Shop', () => ({
    motifs: [...C.plank(20, 226, 460, 16), ...C.plank(20, 448, 460, 16), ...C.plank(20, 672, 460, 16), ...C.shopDoor(515, 690, 120, 250)],
    items: [...row(226, [{ src: 'toys bw 2/teddy_bear', h: 140 }, { src: 'toys bw/rocking_horse', h: 130 }], 30, 460, 12),
      ...row(450, [{ src: 'toys bw 2/robot', h: 140 }, { src: 'toys bw 2/truck', w: 130 }], 30, 460, 12),
      ...row(672, [{ src: 'toys bw/train', w: 210 }, { src: 'toys bw/drum', h: 105 }, { src: 'toys bw/duck', h: 100 }], 30, 470, 12), { src: 'toys bw 2/kite', x: 575, y: 390, h: 140 }],
  })),
  copy('under-sea', 3, 'Under the Sea', () => ({
    motifs: [{ m: 'ground', a: [14, 661, 662, 6, 3] }, ...C.seaweed(44, 660, 240, 30, 1), ...C.seaweed(636, 660, 260, 30, -1), circle(300, 120, 18), circle(332, 66, 12), circle(366, 150, 14)],
    items: [{ src: 'sea life bw/clown_fish', x: 210, y: 330, w: 150 }, { src: 'sea life bw 2/clown_fish', x: 440, y: 450, w: 140 }, { src: 'animals bw 5/jellyfish', x: 545, y: 260, h: 150 }, { src: 'sea life bw/seahorse', x: 110, y: 520, h: 150 },
      ...row(662, [{ src: 'sea life bw 2/hermit_crab', w: 125 }, { src: 'sea life bw 2/starfish', w: 115 }, { src: 'sea life bw 2/shrimp', h: 125 }, { src: 'sea life bw/octopus', w: 150 }], 74, 600, 12)],
  })),
  copy('kitchen', 3, 'The Kitchen', () => ({
    motifs: [...C.curtainWindow(80, 60, 200, 170), ...C.plank(40, 250, 270, 16), ...C.plank(360, 250, 295, 16), ...C.plank(20, 560, 635, 22), C.rect(30, 582, 300, 118), C.rect(345, 582, 300, 118)],
    items: [{ src: 'home bw/cactus', x: 180, y: 250, h: 120 }, { src: 'kitchen bw/teapot', x: 440, y: 250, w: 150 }, { src: 'home bw/cup', x: 590, y: 250, h: 95 },
      ...row(560, [{ src: 'home bw/pot', w: 150 }, { src: 'kitchen bw/rolling_pin', w: 150 }, { src: 'fruits bw/strawberry', h: 105 }, { src: 'fruits bw/lemon', h: 100 }, { src: 'fruits bw/pear', h: 112 }], 30, 645, 12)],
  })),
  copy('safari', 3, 'On Safari', () => ({
    motifs: [sun(600, 80, 36), { m: 'hill', a: [14, 380, 440, 70] }, { m: 'hill', a: [300, 661, 440, 55] }, flat(440), ...C.acacia(150, 440, 260, 210), flat(690)],
    items: [{ src: 'animals bw 2/giraffe', x: 350, y: 440, h: 230 }, { src: 'zoo animals bw/elephant', x: 540, y: 440, h: 135 },
      ...row(690, [{ src: 'animals bw 3/lion', h: 140 }, { src: 'zoo animals bw/zebra', h: 160 }, { src: 'animals bw/ostrich', h: 170 }, { src: 'animals bw 5/camel', h: 135 }, { src: 'animals bw/meerkat', h: 115 }], 20, 655, 12)],
  })),
  copy('flower-garden', 3, 'The Flower Garden', () => ({
    motifs: [sun(600, 80, 36), cloud(200, 100, 160), fence(14, 661, 560, 110, 10), ...C.stepStone(260, 682, 100), ...C.stepStone(410, 694, 100)],
    items: [...row(560, [{ src: 'nature bw/flower', h: 210 }, { src: 'home and nature bw/flower', h: 200 }, { src: 'valentine bw 2/tulip', h: 180 }], 40, 480, 12),
      { src: 'birds bw 2/hummingbird', x: 575, y: 330, w: 125 }, { src: 'animals bw 3/bee', x: 360, y: 250, h: 100 }, { src: 'Easter bw/butterfly', x: 500, y: 200, w: 120 },
      { src: 'nature bw/mushroom', x: 100, y: 706, h: 100 }, { src: 'animals bw/snail', x: 565, y: 706, w: 140 }],
  })),
];
module.exports = { SCENES };
