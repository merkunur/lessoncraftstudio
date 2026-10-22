/**
 * data/ptx/scenes-K423.js — K-423 "Zigzags" Level Set copies (ptl): a whole scene whose pictures have ZIGZAG edges (crowns,
 * peaks, rooftops, stalactites, reeds, ferns, bunting, castle walls, a circus tent, kite tails, cliffs) — "stop at every tip".
 * Concepts: _work/ptl-scenes-A.json (Designer A); drawn zigzags data/ptx/zz.js; levels ptl-levels.md §K-423: L1 K-1 —
 * 6-10 big tips · L2 K — 15-25 tips · L3 K-3 — 30-45 smaller tips. Every page stands on a ground line.
 */
'use strict';
const Z = require('./zz.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const ground = (y = 690) => ({ m: 'ground', a: [4, 671, y, 0, 1] });
const grass = (x, y, h) => ({ m: 'grass', a: [x, y, h, 3], colour: '#8a8a8a', w: 2 });
const sun = (x, y, r) => ({ m: 'sun', a: [x, y, r, 8] });
const star = (x, y, r) => ({ m: 'star', a: [x, y, r] });
const cloud = (x, y, w) => ({ m: 'cloud', a: [x, y, w] });
const moon = (x, y, r) => ({ m: 'moon', a: [x, y, r] });
const copy = (id, level, name, motifs, items = [], decor = []) => ({ id: 'ptx-K-423-' + id, face: 'K-423', level, name: { en: name }, skin: () => ({ ...BAND[level], motifs, items, decor }) });
const SCENES = [
  // L1 — a few BIG tips
  copy('crown-room', 1, 'The King’s Crown', [...Z.crown(338, 500, 340, 270, 5), ...Z.zz(30, 645, 700, 40, 6), star(338, 128, 50)]),
  copy('autumn-park', 1, 'Autumn Leaves', [...Z.zz(30, 645, 690, 60, 6), ...Z.zz(400, 600, 470, 26, 3), sun(560, 120, 48), cloud(170, 130, 170)], [{ src: 'nature bw/leaf', x: 240, y: 520, fit: 300 }]),
  copy('pyramids', 1, 'The Pyramids', [...Z.pyramid(160, 640, 250, 230), ...Z.pyramid(470, 640, 300, 300), ground(640), ...Z.zz(80, 600, 690, 22, 4), sun(570, 120, 50), cloud(170, 150, 150)]),
  copy('rooftops', 1, 'The Pointed Rooftops', [...Z.houses(90, 585, 690, 3, 220, 165), star(140, 120, 28), star(520, 104, 30)]),
  copy('snowy-peak', 1, 'The Snowy Peak', [...Z.zz(70, 330, 660, 30, 4), ground(700), cloud(150, 120, 150), cloud(480, 150, 170)], [{ src: 'travel and holiday bw/mountain', x: 338, y: 540, fit: 470 }], []),
  // L2 — 15-25 tips
  copy('bat-cave', 2, 'The Bat Cave', [...Z.zz(14, 661, 70, -70, 7), ...Z.rock(130, 690, 160, 150), ...Z.rock(560, 690, 140, 120), ...Z.zz(14, 661, 700, 18, 9)],
    [{ src: 'animals bw 5/bat', x: 338, y: 330, fit: 240 }, { src: 'animals bw/bat', x: 160, y: 470, fit: 160 }, { src: 'animals bw 3/bat', x: 520, y: 470, fit: 160 }]),
  copy('crocodile-river', 2, 'Crocodile River', [...Z.reeds(80, 560, 150, 4), ...Z.reeds(600, 560, 130, 4), ...Z.zz(20, 655, 600, 12, 12), ...Z.zz(20, 655, 650, 12, 12), sun(560, 110, 38), ground(700)],
    [{ src: 'zoo animals bw/alligator', x: 338, y: 540, fit: 330 }]),
  copy('dino-valley', 2, 'Dinosaur Valley', [...Z.volcano(560, 690, 200, 300), ...Z.fern(70, 690, 220, 5), ...Z.fern(185, 690, 130, 4), ...Z.zz(14, 661, 700, 14, 12), cloud(150, 130, 160), cloud(420, 110, 150)],
    [{ src: 'zoo animals bw/dinosaur', x: 330, y: 680, fit: 245 }]),
  copy('rosette', 2, 'The Prize Rosette', [{ m: 'bunting', a: [20, 655, 60, 30, 8] }, ...Z.crissFence(40, 635, 690, 70, 8), ...Z.pennant(70, 600, 160), ...Z.pennant(520, 600, 160)],
    [{ src: 'sports bw/rosette', x: 338, y: 330, fit: 300 }]),
  copy('birthday', 2, 'Party Hats', [{ m: 'bunting', a: [20, 655, 60, 30, 8] }, ...Z.cake(338, 560, 220, 150), ...Z.zz(14, 661, 690, 20, 12), { m: 'line', a: [[[14, 600], [661, 600]]] }],
    [{ src: 'toys bw/party_hat', x: 120, y: 560, fit: 200 }, { src: 'toys bw/party_hat', x: 560, y: 560, fit: 200, flip: true }]),
  // L3 — 30-45 smaller tips
  copy('dragon-castle', 3, 'The Dragon’s Castle', [{ m: 'mountains', a: [14, 661, 272, 100, 5] }, ...Z.castle(420, 690, 380, 330, 3), ...Z.pennant(230, 360, 70), ...Z.zz(14, 661, 700, 10, 16), moon(570, 110, 34), star(420, 110, 18), star(300, 80, 14), star(110, 120, 16)],
    [{ src: 'animals bw/dragon', x: 100, y: 690, fit: 180 }]),
  copy('jungle', 3, 'The Jungle', [...Z.zz(14, 661, 700, 16, 22), ...Z.fern(240, 690, 200, 6), ...Z.fern(345, 690, 180, 6), { m: 'mountains', a: [14, 661, 420, 130, 5] }, sun(560, 120, 44)],
    [{ src: 'beach bw/palm_tree', x: 120, y: 690, fit: 300 }, { src: 'animals bw 5/crocodile', x: 530, y: 640, fit: 220 }]),
  copy('big-top', 3, 'Under the Big Top', [...Z.circusTent(338, 640, 380, 440), { m: 'bunting', a: [20, 655, 70, 26, 10] }, ...Z.zz(30, 645, 700, 16, 16), ...Z.pennant(60, 640, 120), ...Z.pennant(600, 640, 120), ...Z.zz(30, 645, 660, 12, 20), star(120, 350, 20), star(560, 350, 20), star(70, 180, 16), star(80, 260, 18), star(600, 260, 18), star(560, 210, 14)]),
  copy('kite-festival', 3, 'The Kite Festival', [...Z.kite(140, 170, 150, 6), ...Z.kite(340, 120, 120, 5, -1), ...Z.kite(530, 200, 150, 6), ...Z.kite(250, 380, 110, 5), { m: 'mountains', a: [14, 661, 630, 120, 4] }, ...Z.crissFence(40, 640, 690, 40, 10)]),
  copy('rocky-shore', 3, 'The Rocky Shore', [{ m: 'line', a: [[[14, 700], [14, 400], ...Z.zzPts(14, 200, 400, 40, 4).slice(1), [230, 700], [14, 700]], true] }, sun(560, 110, 44), cloud(330, 140, 150), ...Z.zz(250, 661, 500, 14, 20), ...Z.zz(250, 661, 560, 14, 20), ...Z.zz(250, 661, 620, 14, 20), ...Z.rock(320, 700, 90, 52), ...Z.rock(480, 700, 80, 46), ...Z.rock(610, 700, 70, 44)],
    [{ src: 'animals bw 5/shark', x: 400, y: 470, fit: 190 }, { src: 'beach bw/sailboat', x: 590, y: 494, fit: 130 }]),
];
module.exports = { SCENES };
