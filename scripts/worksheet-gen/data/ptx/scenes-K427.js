/**
 * data/ptx/scenes-K427.js — K-427 "Trace and count" (K.CC.B.5) Level Set copies (ptl): ONE counted kind (one drawing key,
 * flips allowed), SCATTERED (never in a row, never touching, never partly hidden), traced; distractors drawn solid as
 * models, never of the counted kind's category; one answer box; N never 0, never equal to the number of distractors.
 * Concepts: _work/ptl-scenes-A.json (Designer A); scatter + rows data/ptx/lay.js (seeded, deterministic).
 * Levels (ptl-levels.md §K-427): L1 K-1 — N 3/4/5, 150-200 px, 1 distractor kind · L2 K — N 5/6/7, 120-140 px, 2 kinds ·
 * L3 K-3 — N 8/9/10, 95-115 px, 2-3 kinds, one the same SIZE as the counted kind. Within a level no two neighbouring
 * copies share N (the core rung starts after the published N = 5): L1 3 5 4 3 5 · L2 6 7 5 7 6 · L3 8 10 9 8 10.
 * Each copy's instruction names its counted animal (INSTR, data/ptx/names-i18n.js).
 */
'use strict';
const { scatter, row, boxOfItem } = require('./lay.js');
const { helpers: { GREY } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const BOX = [{ m: 'roundRect', a: [16, 16, 120, 120, 16], w: 3 }, { d: 'M34 112 L118 112', w: 2 }];
const G = (m, a, extra = {}) => ({ m, a, colour: GREY, w: 2, ...extra });
// the face's own size floors (ptl-levels §K-427: 150-200 / 120-140 / 95-115 px, not the band's general floor) and caps
const FLOOR = { 1: 150, 2: 120, 3: 95 }, CAP = { 1: 4200, 2: 7500, 3: 9500 };
/** one copy: the counted spec, N, the scatter region, the distractor models (a row at the top right), setting decor */
function build({ level, key, size, n, region, seed, models = [], decor = [], modelY = 236, modelX0 = 170 }) {
  const top = row(modelY, models.map((m) => ({ ...m, render: 'model' })), modelX0, 655, 16);
  const counted = scatter(n, { src: key, ...(size.w ? { w: size.w } : { h: size.h }) }, region, seed, BAND[level].band === 'K-3' ? 12 : 16, top.map(boxOfItem));
  return { ...BAND[level], count: { key, n }, minPicFloor: FLOOR[level], budget: CAP[level], decor: [...BOX, ...decor], items: [...top, ...counted], motifs: [] };
}
const copy = (id, level, name, instr, spec) => ({ id: 'ptx-K-427-' + id, face: 'K-427', level, name: { en: name }, instr: { en: instr }, skin: () => build({ level, ...spec }) });
const T = (plural) => `Trace the ${plural}. Count them. Write how many in the box.`;
const SCENES = [
  // ── L1 — 3, 5, 4, 3, 5 big pictures with few strokes (the simplest band-1 outlines: measured traced length); one
  // distractor kind. K-427 is a narrow face like K-426: its difficulty is the COUNT, so L1 is lighter per picture, not
  // a quarter lighter per page (five K-1 pictures cannot weigh less than the published five ducks)
  copy('rock-pool', 1, 'Starfish in the Rock Pool', T('starfish'), { level: 1, key: 'sea life bw/starfish', size: { h: 175 }, n: 3, seed: 2,
    region: { x0: 44, y0: 292, x1: 631, y1: 694 }, models: [{ src: 'beach bw/seashell', h: 110 }],
    decor: [{ m: 'roundRect', a: [24, 276, 627, 434, 110], w: 2.5 }, G('waves', [160, 380, 236, 46, 5])], modelX0: 420 }),
  copy('whale-sea', 1, 'Whales in the Sea', T('whales'), { level: 1, key: 'sea life bw 2/whale', size: { w: 175 }, n: 5, seed: 4,
    region: { x0: 30, y0: 268, x1: 645, y1: 700 }, models: [{ src: 'vehicles bw/boat', w: 170 }],
    decor: [G('waves', [14, 661, 256, 50, 5]), G('sun', [600, 66, 32, 8, false])], modelX0: 300 }),
  copy('farmyard', 1, 'Chicks in the Farmyard', T('chicks'), { level: 1, key: 'animals bw 4/chick', size: { h: 165 }, n: 4, seed: 23,
    region: { x0: 30, y0: 280, x1: 645, y1: 700 }, models: [{ src: 'farm bw/watering_can', w: 160 }],
    decor: [G('fence', [150, 661, 250, 70, 9]), { m: 'line', a: [[[14, 704], [661, 704]]], w: 2.5 }, G('sun', [600, 60, 30, 8, false])], modelX0: 300 }),
  copy('fish-pond', 1, 'Fish in the Pond', T('fish'), { level: 1, key: 'nature bw/fish', size: { w: 185 }, n: 3, seed: 7,
    region: { cx: 337, cy: 500, rx: 312, ry: 200 }, models: [{ src: 'animals bw/swan', h: 150 }],
    decor: [{ m: 'ellipse', a: [337, 500, 325, 210], w: 2.5 }, G('grass', [40, 300, 40, 4]), G('grass', [636, 300, 40, 4])], modelX0: 400 }),
  copy('raindrops', 1, 'Raindrops in the Garden', T('raindrops'), { level: 1, key: 'nature bw/droplet', size: { h: 165 }, n: 5, seed: 31,
    region: { x0: 34, y0: 270, x1: 641, y1: 696 }, models: [{ src: 'nature bw/umbrella', h: 170 }],
    decor: [{ m: 'line', a: [[[14, 704], [661, 704]]], w: 2.5 }, G('cloud', [250, 90, 160])], modelX0: 420 }),
  // ── L2 — 6, 7, 5, 7, 6 pictures; two distractor kinds ───────────────────────────────────────────────────────────────
  // (frogs, not swans: swans on a pond was the published ducks-on-a-pond page again)
  copy('lily-pond', 2, 'Frogs on the Lily Pond', T('frogs'), { level: 2, key: 'animals bw 5/frog', size: { h: 132 }, n: 6, seed: 5,
    region: { cx: 337, cy: 490, rx: 318, ry: 215 }, models: [{ src: 'animals bw/snail', h: 110 }, { src: 'home and nature bw/tree_3', h: 200 }],
    decor: [{ m: 'ellipse', a: [337, 490, 328, 222], w: 2.5 }] }),
  copy('coral-sea', 2, 'Stingrays in the Sea', T('stingrays'), { level: 2, key: 'sea life bw/stingray', size: { w: 135 }, n: 7, seed: 9,
    region: { x0: 26, y0: 262, x1: 650, y1: 702 }, models: [{ src: 'sea life bw/octopus', w: 150 }, { src: 'sea life bw 2/turtle', w: 160 }],
    decor: [G('waves', [14, 661, 250, 54, 6]), { m: 'circle', a: [200, 70, 10], colour: GREY, w: 2 }, { m: 'circle', a: [230, 40, 7], colour: GREY, w: 2 }] }),
  copy('garden-leaf', 2, 'Ladybugs on the Leaf', T('ladybugs'), { level: 2, key: 'animals bw 3/ladybug', size: { w: 128 }, n: 5, seed: 17,
    region: { cx: 337, cy: 488, rx: 300, ry: 200 }, models: [{ src: 'animals bw 5/hedgehog', h: 120 }, { src: 'nature bw/mushroom', h: 130 }],
    decor: [{ d: 'M14 488 C120 250 520 250 661 488 C520 726 120 726 14 488 Z', w: 2.5 }, { d: 'M14 488 L661 488', w: 2, colour: GREY }, G('sun', [600, 70, 30, 8, false])], modelX0: 330 }),
  copy('night-garden', 2, 'Bats at Night', T('bats'), { level: 2, key: 'animals bw 5/bat', size: { w: 138 }, n: 7, seed: 21,
    region: { x0: 26, y0: 262, x1: 650, y1: 702 }, models: [{ src: 'animals bw 5/owl', h: 150 }, { src: 'nature bw/mushroom', h: 110 }],
    decor: [G('moon', [230, 70, 34]), G('star', [300, 40, 14]), G('star', [170, 170, 12])] }),
  copy('rabbit-field', 2, 'Rabbits in the Field', T('rabbits'), { level: 2, key: 'animals bw 4/rabbit', size: { h: 135 }, n: 6, seed: 13,
    region: { x0: 26, y0: 268, x1: 650, y1: 700 }, models: [{ src: 'vegetables bw/carrot', h: 140 }, { src: 'animals bw/squirrel', h: 130 }],
    decor: [{ m: 'line', a: [[[14, 704], [661, 704]]], w: 2.5 }, G('cloud', [250, 90, 140]), G('sun', [600, 66, 30, 8, false])], modelX0: 330 }),
  // ── L3 — 8, 10, 9, 8, 10 pictures; two or three kinds, one the counted kind's size ──────────────────────────────────
  copy('fishing-lake', 3, 'Fish in the Lake', T('fish'), { level: 3, key: 'animals bw 5/fish', size: { w: 110 }, n: 8, seed: 3,
    region: { cx: 337, cy: 488, rx: 322, ry: 220 }, models: [{ src: 'travel and holiday bw/kayak', w: 190 }, { src: 'animals bw 5/turtle', w: 110 }],
    decor: [{ m: 'ellipse', a: [337, 488, 330, 226], w: 2.5 }] }),
  copy('butterfly-garden', 3, 'Butterflies in the Garden', T('butterflies'), { level: 3, key: 'Easter bw/butterfly', size: { w: 112 }, n: 10, seed: 8,
    region: { x0: 22, y0: 260, x1: 653, y1: 704 }, models: [{ src: 'animals bw/snail', w: 112 }, { src: 'home bw 2/flower', h: 180 }, { src: 'farm bw/watering_can', w: 140 }],
    decor: [G('fence', [14, 661, 248, 60, 12]), G('sun', [600, 50, 26, 8, false])], modelY: 236, modelX0: 200 }),
  copy('jellyfish-bay', 3, 'Jellyfish in the Bay', T('jellyfish'), { level: 3, key: 'animals bw 5/jellyfish', size: { h: 110 }, n: 9, seed: 19,
    region: { x0: 22, y0: 262, x1: 653, y1: 704 }, models: [{ src: 'sea life bw 2/seahorse', h: 110 }, { src: 'sea life bw/starfish', h: 105 }],
    decor: [G('waves', [14, 661, 250, 54, 6])], modelX0: 330 }),
  copy('mouse-barn', 3, 'Mice in the Barn', T('mice'), { level: 3, key: 'animals bw 5/mouse', size: { h: 105 }, n: 8, seed: 27,
    region: { x0: 22, y0: 264, x1: 653, y1: 702 }, models: [{ src: 'animals bw 4/cat', h: 150 }, { src: 'food bw 3/cheese', h: 105 }],
    decor: [{ m: 'line', a: [[[14, 706], [661, 706]]], w: 2.5 }, { m: 'line', a: [[[14, 250], [661, 250]]], w: 2, colour: GREY }], modelX0: 300 }),
  copy('sheep-meadow', 3, 'Sheep in the Meadow', T('sheep'), { level: 3, key: 'animals bw 4/sheep', size: { h: 104 }, n: 10, seed: 6,
    region: { x0: 22, y0: 262, x1: 653, y1: 704 }, models: [{ src: 'animals bw/dog', h: 104 }, { src: 'home and nature bw/tree_3', h: 200 }],
    decor: [G('fence', [14, 661, 248, 50, 12]), G('sun', [600, 50, 26, 8, false])], modelX0: 330 }),
];
module.exports = { SCENES };
