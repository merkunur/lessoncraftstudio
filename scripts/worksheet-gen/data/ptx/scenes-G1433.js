/**
 * data/ptx/scenes-G1433.js — G1-433 "Find the hidden animals" Level Set copies (ptl): a SOLID scene and EXACTLY five dashed
 * animals in it (the instruction prints 5); every dashed thing is an animal, each fully visible, no solid line inside its
 * halo, and NO solid animal anywhere on the page (the count has one answer). Concepts: _work/ptl-scenes-B.json (Designer B;
 * the pig left the busy farm, a cultural risk for some families — the published page made the same call).
 * Levels (ptl-levels.md §G1-433): L1 G1-1 — five animals 130-160 px mostly in open ground, a sparse solid scene (3-5
 * objects), halo 16 · L2 G1 — 85-115 px, as published (trees + small things), halo 10 · L3 G1-3 — 70-90 px, a dense scene
 * (≥ 10 solid objects), ≥ 2 animals inside a busy object, halo 10.
 * G1-433 is a narrow face like K-427: the level is FIGURE-GROUND difficulty, never N; five big L1 animals weigh MORE than
 * the published five (4,053 px) and five small L3 animals weigh less (3,100-4,500): L1 carries its own cap, neither end
 * is held to the quarter-under / 15 %-over length rule (the ladder's own budgets: L1 ≤ 7,000, L3 3,500-6,500).
 * A load-time check counts the animals (5), keeps each inside the page and apart from the others by its halo.
 */
'use strict';
const D = require('./dr.js');
const C = require('./dc.js');
const X = require('./xm.js');
const M = require('../../lib/pt-motifs.js');
const { boxOfItem, rng } = require('./lay.js');
const BAND = { 1: { band: 'G1-1', style: 'P2' }, 2: { band: 'G1', style: 'P3' }, 3: { band: 'G1-3', style: 'P3' } };
const HALO = { 1: 16, 2: 10, 3: 10 }, SIZE = { 1: [130, 160], 2: [85, 115], 3: [70, 90] }, CAP = { 1: 7000 };
/** solid scenery: motif lists drawn solid; library props solid (big) or as models (small things) */
const S = (list) => list.map((m) => ({ ...m, render: 'solid' }));
const P = (src, x, y, size, small = false) => ({ src, x, y, ...size, render: small ? 'model' : 'solid' });
const ERR = [];
function check(id, level, items) {
  const hid = items.filter((it) => it.hidden), [lo, hi] = SIZE[level];
  if (hid.length !== 5) ERR.push(`G1-433 ${id}: ${hid.length} hidden animals (want 5)`);
  const B = hid.map((it) => ({ it, b: boxOfItem(it) }));
  for (const { it, b } of B) {
    const side = Math.max(b.w, b.h);
    if (side < lo - 0.5 || side > hi + 0.5) ERR.push(`G1-433 ${id}: ${it.src} is ${Math.round(side)} px (L${level} wants ${lo}-${hi})`);
    if (b.x - b.w / 2 < 14 || b.x + b.w / 2 > 661 || b.y - b.h < 8 || b.y > 712) ERR.push(`G1-433 ${id}: ${it.src} leaves the page`);
  }
  const g = HALO[level];
  for (let i = 0; i < B.length; i++) for (let j = i + 1; j < B.length; j++) {
    const a = B[i].b, c = B[j].b;
    if (!(a.x + a.w / 2 + g <= c.x - c.w / 2 || c.x + c.w / 2 + g <= a.x - a.w / 2 || a.y + g <= c.y - c.h || c.y + g <= a.y - a.h)) ERR.push(`G1-433 ${id}: ${B[i].it.src} and ${B[j].it.src} touch`);
  }
}
/** small solid things scattered over a region (leaves, mushrooms, flowers…) — seeded, never within an animal's halo, never
 *  on another clutter piece; they make the figure-ground harder without ever touching a dashed line */
function clutter(specs, items, halo) {
  if (!specs) return [];
  const out = [];
  for (const spec of [].concat(specs)) out.push(...clutterZone(spec, items, halo, out));
  return out;
}
function clutterZone(spec, items, halo, prev) {
  const R = rng(spec.seed), out = [], hid = items.filter((it) => it.hidden).map(boxOfItem);
  const box = (it) => { const b = boxOfItem(it); return [b.x - b.w / 2, b.y - b.h, b.x + b.w / 2, b.y]; };
  const hit = (a, b, g) => !(a[2] + g <= b[0] || b[2] + g <= a[0] || a[3] + g <= b[1] || b[3] + g <= a[1]);
  for (let t = 0; out.length < spec.n && t < 3000; t++) {
    const src = spec.srcs[Math.floor(R() * spec.srcs.length)], h = spec.h[0] + R() * (spec.h[1] - spec.h[0]);
    const it = { src, x: Math.round(spec.region.x0 + R() * (spec.region.x1 - spec.region.x0)), y: Math.round(spec.region.y0 + R() * (spec.region.y1 - spec.region.y0)), h: Math.round(h), render: 'model', flip: R() < 0.5 };
    const b = box(it); if (b[0] < 16 || b[2] > 659 || b[1] < 10 || b[3] > 712) continue;
    if (hid.some((hb) => hit(b, [hb.x - hb.w / 2, hb.y - hb.h, hb.x + hb.w / 2, hb.y], halo + 6))) continue;
    if ([...prev, ...out].some((o) => hit(b, box(o), 8))) continue;
    out.push(it);
  }
  if (out.length < spec.n) ERR.push(`clutter: placed ${out.length} of ${spec.n}`);
  return out;
}
const LEAVES = ['nature bw/leaf', 'home and nature bw/leaf'], GROUND = ['nature bw/mushroom', 'Easter bw/mushroom', 'vegetables bw 2/mushroom', 'nature bw/flower', 'home and nature bw/flower', 'Easter bw/tulip'];
const copy = (id, level, name, build0) => {
  const A = (src, x, y, size) => ({ src, x, y, ...size, halo: HALO[level], hidden: true });
  const build = (AA) => { const s = build0(AA); return { ...s, items: [...s.items, ...clutter(s.clutter, s.items, HALO[level])] }; };
  const sc = build(A); check(id, level, sc.items);
  return { id: 'ptx-G1-433-' + id, face: 'G1-433', level, name: { en: name },
    skin: () => { const s = build(A); return { ...BAND[level], count: { n: 5 }, ...(CAP[level] ? { budget: CAP[level] } : {}), decor: s.decor || [], motifs: s.motifs, items: s.items }; } };
};
const fir = (cx, top, base, hw) => [{ m: 'line', a: [X.firPoly(cx, top, base, hw), true] }, D.rect(cx - 8, base, 16, 24)];
const SCENES = [
  // ── L1 — five big animals in the open, a sparse scene ───────────────────────────────────────────────────────────────
  copy('farmyard', 1, 'Who Hides on the Farm?', (A) => ({
    motifs: S([{ m: 'line', a: [[[14, 560], [661, 560]]] }, ...D.barn(380, 560, 260, 300), { m: 'fence', a: [14, 240, 560, 56, 4] }, { m: 'sun', a: [70, 70, 30, 8] }, { m: 'cloud', a: [250, 90, 140] }]),
    items: [P('home and nature bw/tree', 120, 560, { h: 280 }),
      A('animals bw 4/cat', 105, 706, { h: 140 }), A('farm bw/duck', 290, 712, { h: 132 }), A('animals bw 4/chick', 450, 704, { h: 132 }),
      A('animals bw 5/goat', 585, 706, { h: 140 }), A('animals bw 5/dog_2', 318, 560, { h: 140 })],
  })),
  copy('pond', 1, 'Who Hides by the Pond?', (A) => ({
    motifs: S([{ m: 'line', a: [[[14, 330], [661, 330]]] }, { m: 'ellipse', a: [337, 500, 300, 150] }, ...C.reed(40, 470, 120), ...C.reed(636, 520, 110), ...C.lilyPad(500, 470, 70), { m: 'sun', a: [600, 70, 30, 8] }]),
    items: [P('home and nature bw/tree_3', 110, 330, { h: 250 }),
      A('birds bw 2/swan', 220, 560, { h: 140 }), A('nature bw/fish', 380, 600, { w: 150 }), A('animals bw/frog', 505, 450, { w: 130 }),
      A('animals bw 4/turtle', 560, 706, { w: 150 }), A('animals bw/snail', 110, 706, { w: 140 })],
  })),
  copy('seaside-rocks', 1, 'Who Hides on the Rocks?', (A) => ({
    motifs: S([{ m: 'waves', a: [14, 661, 300, 70, 8] }, { m: 'line', a: [[[14, 520], [661, 520]]] }, ...D.stone(140, 520, 220), ...D.stone(350, 520, 180), { m: 'sun', a: [70, 70, 30, 8] }, { m: 'cloud', a: [330, 90, 150] }]),
    items: [P('beach bw/lighthouse', 548, 520, { h: 300 }),
      A('animals bw 5/crab', 140, 480, { w: 140 }), A('sea life bw 2/seal', 350, 410, { w: 160 }), A('sea life bw/starfish', 120, 706, { w: 130 }),
      A('birds bw/pelican', 360, 706, { h: 150 }), A('sea life bw 2/hermit_crab', 580, 706, { w: 140 })],
  })),
  copy('desert', 1, 'Who Hides in the Desert?', (A) => ({
    motifs: S([{ m: 'ground', a: [14, 661, 360, 10, 2] }, { m: 'ground', a: [14, 661, 560, 12, 2, 1] }, { m: 'sun', a: [590, 80, 36, 10] }]),
    items: [P('nature bw/pyramid', 470, 360, { w: 240 }), P('home bw/cactus', 80, 560, { h: 210 }),
      A('animals bw 5/camel', 300, 545, { h: 160 }), A('animals bw 5/lizard', 560, 556, { w: 150 }), A('animals bw 5/snake', 110, 706, { h: 140 }),
      A('animals bw/meerkat', 350, 712, { h: 150 }), A('animals bw/fox', 575, 706, { h: 130 })],
  })),
  copy('snowy-hill', 1, 'Who Hides in the Snow?', (A) => ({
    motifs: S([{ m: 'ground', a: [14, 661, 560, 14, 2] }, ...fir(80, 300, 536, 60), ...fir(600, 320, 540, 56), { m: 'snowflake', a: [200, 100, 20] }, { m: 'snowflake', a: [470, 80, 18] }, { m: 'moon', a: [600, 80, 26] }]),
    items: [P('Christmas bw 2/snowman', 337, 560, { h: 220 }),
      A('animals bw 5/penguin', 110, 706, { h: 140 }), A('Christmas bw 2/reindeer', 470, 556, { h: 160 }), A('animals bw 5/fox_2', 590, 706, { h: 140 }),
      A('animals bw/owl', 337, 706, { h: 130 }), A('animals bw 5/rabbit', 240, 556, { h: 135 })],
  })),
  // ── L2 — five animals 85-115 px, trees and small things (the published shape) ──────────────────────────────────────
  copy('jungle-river', 2, 'Who Hides in the Jungle?', (A) => ({
    clutter: [{ seed: 11, n: 7, srcs: LEAVES, h: [30, 44], region: { x0: 20, y0: 120, x1: 655, y1: 540 } }, { seed: 31, n: 4, srcs: GROUND, h: [34, 48], region: { x0: 20, y0: 690, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'ground', a: [14, 661, 560, 8, 3] }, { m: 'ground', a: [14, 661, 630, 8, 3, 1] }, { m: 'line', a: [M.catmull([[250, 14], [262, 90], [244, 170], [256, 230]], false, 3)] },
      { m: 'line', a: [M.catmull([[420, 14], [410, 70], [428, 130], [418, 190]], false, 3)] }, { m: 'line', a: [M.catmull([[214, 262], [262, 300], [300, 308], [340, 300], [390, 250]], false, 3)] }, ...D.leaf(30, 700, 90, -1.1), ...D.leaf(640, 700, 90, -2.1), ...D.leaf(240, 712, 70, -1.7)]),
    items: [P('beach bw/palm_tree', 130, 560, { h: 340 }), P('beach bw/palm_tree', 548, 560, { h: 340 }), P('nature bw/flower', 120, 712, { h: 80 }, true), P('Easter bw/mushroom', 600, 712, { h: 60 }, true),
      A('animals bw 5/monkey', 150, 300, { h: 105 }), A('birds bw 2/parrot', 562, 268, { w: 110 }), A('birds bw 2/toucan', 300, 306, { h: 100 }),
      A('animals bw/sloth', 420, 222, { h: 110 }), A('animals bw 3/frog_2', 470, 702, { w: 100 })],
  })),
  copy('veg-garden', 2, 'Who Hides in the Garden?', (A) => ({
    clutter: [{ seed: 12, n: 5, srcs: ['Easter bw/tulip', 'nature bw/flower'], h: [36, 50], region: { x0: 20, y0: 590, x1: 655, y1: 600 } }, { seed: 32, n: 4, srcs: LEAVES, h: [28, 38], region: { x0: 20, y0: 620, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'fence', a: [14, 661, 330, 70, 7] }, { m: 'line', a: [[[14, 470], [661, 470]]] }, { m: 'line', a: [[[14, 600], [661, 600]]] }, { m: 'sun', a: [600, 80, 30, 8] }, { m: 'cloud', a: [330, 90, 150] }]),
    items: [P('vegetables bw/pumpkin', 120, 470, { h: 80 }, true), P('vegetables bw/carrot', 260, 470, { h: 90 }, true), P('vegetables bw/carrot', 400, 470, { h: 90 }, true), P('vegetables bw/pumpkin', 545, 470, { h: 80 }, true),
      P('vegetables bw/carrot', 160, 600, { h: 90 }, true), P('vegetables bw/pumpkin', 330, 600, { h: 80 }, true), P('home bw 2/watering_can', 595, 704, { w: 110 }),
      A('birds bw 2/bird', 420, 258, { w: 100 }), A('animals bw 5/hedgehog', 200, 704, { w: 110 }), A('nature bw/ladybug', 545, 452, { w: 86 }),
      A('animals bw 3/bee', 160, 200, { h: 95 }), A('animals bw 5/mouse', 430, 704, { w: 100 })],
  })),
  copy('city-park', 2, 'Who Hides in the Park?', (A) => ({
    clutter: [{ seed: 13, n: 5, srcs: LEAVES, h: [28, 40], region: { x0: 20, y0: 150, x1: 655, y1: 540 } }, { seed: 33, n: 7, srcs: GROUND, h: [30, 46], region: { x0: 20, y0: 556, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'line', a: [[[14, 560], [661, 560]]] }, { m: 'pathBand', a: [[[338, 716], [350, 650], [320, 600], [338, 562]], 100] }, ...X.bench(200, 560, 250),
      { m: 'line', a: [[[630, 560], [630, 330]]] }, { m: 'line', a: [[[612, 330], [648, 330], [640, 300], [620, 300], [612, 330]], true] }, { m: 'ellipse', a: [520, 680, 70, 16] }, { m: 'line', a: [[[470, 680], [480, 712], [560, 712], [570, 680]]] }, { m: 'sun', a: [70, 70, 30, 8] }]),
    items: [P('home and nature bw/tree_3', 122, 560, { h: 280 }), P('home and nature bw/tree_2', 470, 560, { h: 300 }),
      A('animals bw 5/squirrel', 128, 450, { h: 95 }), A('birds bw/pigeon', 260, 490, { h: 90 }), A('animals bw 3/dog', 337, 704, { h: 110 }),
      A('birds bw 2/duck', 612, 712, { w: 96 }), A('animals bw 3/cat_2', 400, 560, { h: 86 })],
  })),
  copy('savanna', 2, 'Who Hides on the Savanna?', (A) => ({
    clutter: [{ seed: 14, n: 7, srcs: ['nature bw/flower', 'Easter bw/tulip'], h: [30, 46], region: { x0: 20, y0: 470, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'line', a: [[[14, 420], [661, 420]]] }, ...C.acacia(130, 470, 220, 200), ...C.acacia(560, 420, 190, 170), { m: 'ellipse', a: [337, 640, 170, 40] }, ...D.stone(600, 712, 90), { m: 'sun', a: [600, 80, 34, 10] }]),
    decor: [{ m: 'grass', a: [60, 600, 26, 4], w: 2 }, { m: 'grass', a: [330, 520, 22, 4], w: 2 }, { m: 'grass', a: [620, 560, 22, 4], w: 2 }],
    items: [A('animals bw 5/giraffe', 400, 470, { h: 115 }), A('animals bw 5/zebra', 200, 610, { h: 108 }), A('animals bw 3/lion', 520, 600, { h: 106 }),
      A('animals bw 5/elephant', 300, 380, { h: 108 }), A('animals bw 5/ostrich_2', 90, 706, { h: 110 })],
  })),
  copy('under-sea', 2, 'Who Hides under the Sea?', (A) => ({
    clutter: [{ seed: 15, n: 6, srcs: ['beach bw/seashell', 'beach bw 2/seashell_2'], h: [26, 40], region: { x0: 20, y0: 690, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'waves', a: [14, 661, 40, 60, 6] }, ...C.seaweed(50, 712, 200), ...C.seaweed(300, 712, 150, 22, -1), ...C.seaweed(640, 712, 190), ...D.stone(160, 712, 160), ...D.stone(470, 712, 140),
      D.rect(340, 652, 90, 60), { m: 'line', a: [[[340, 652], ...M.arc(385, 652, 45, 26, Math.PI, 2 * Math.PI, 3).slice(1)]] }, { m: 'circle', a: [380, 150, 10] }, { m: 'circle', a: [250, 120, 8] }]),
    items: [P('beach bw/anchor', 560, 600, { h: 160 }),
      A('sea life bw 2/fish', 150, 260, { w: 110 }), A('sea life bw/octopus', 470, 300, { w: 115 }), A('sea life bw/turtle', 300, 470, { w: 110 }),
      A('sea life bw/seahorse', 90, 520, { h: 110 }), A('sea life bw/jellyfish', 610, 200, { h: 110 })],
  })),
  // ── L3 — five small animals in a dense scene, two inside busy things ─────────────────────────────────────────────────
  copy('busy-farm', 3, 'Who Hides on the Busy Farm?', (A) => ({
    clutter: [{ seed: 16, n: 5, srcs: LEAVES, h: [24, 36], region: { x0: 20, y0: 150, x1: 655, y1: 470 } }, { seed: 36, n: 7, srcs: GROUND, h: [26, 40], region: { x0: 20, y0: 500, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'line', a: [[[14, 480], [661, 480]]] }, { m: 'fence', a: [14, 661, 480, 46, 9] }, { m: 'pathBand', a: [[[400, 716], [420, 640], [380, 560], [420, 482]], 70] }, { m: 'sun', a: [600, 70, 28, 8] }, { m: 'cloud', a: [330, 70, 130] }]),
    items: [P('farm bw/barn', 470, 480, { w: 290 }), P('farm bw/windmill', 132, 480, { h: 280 }), P('farm bw/tractor', 200, 706, { w: 220 }), P('farm bw/hay', 540, 706, { w: 150 }),
      P('farm bw/scarecrow', 290, 480, { h: 170 }), P('farm bw/vegetables', 400, 712, { w: 100 }, true), P('farm bw/watering_can', 630, 590, { w: 56 }, true), P('home and nature bw/tree', 596, 300, { h: 130 }),
      A('farm bw/rooster', 470, 470, { h: 86 }), A('farm bw/sheep', 540, 690, { w: 88 }), A('farm bw/cow', 610, 560, { h: 86 }),
      A('farm bw/donkey', 50, 712, { h: 88 }), A('farm bw/horse', 300, 612, { h: 86 })],
  })),
  copy('deep-jungle', 3, 'Who Hides in the Deep Jungle?', (A) => ({
    clutter: [{ seed: 17, n: 10, srcs: LEAVES, h: [26, 42], region: { x0: 20, y0: 60, x1: 655, y1: 590 } }, { seed: 37, n: 7, srcs: GROUND, h: [28, 42], region: { x0: 20, y0: 620, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'ground', a: [14, 661, 600, 6, 3] }, ...D.leaf(40, 640, 80, -1.0), ...D.leaf(300, 660, 70, -2.0), ...D.leaf(420, 700, 80, -1.2), ...D.leaf(620, 650, 70, -2.2), ...D.leaf(20, 380, 70, -0.6),
      ...D.leaf(650, 420, 70, -2.6), ...D.leaf(260, 120, 60, 0.6), ...D.leaf(430, 110, 60, 2.4), ...D.stone(560, 712, 120), ...D.stone(120, 712, 110),
      { m: 'line', a: [M.catmull([[470, 14], [462, 80], [478, 150], [466, 210]], false, 3)] }, { m: 'line', a: [M.catmull([[230, 14], [238, 70], [224, 130]], false, 3)] }]),
    items: [P('nature bw/tree_2', 337, 600, { h: 420 }), P('beach bw/palm_tree', 118, 600, { h: 300 }), P('beach bw/palm_tree', 556, 600, { h: 300 }),
      A('animals bw 5/leopard', 337, 300, { h: 86 }), A('animals bw 5/chameleon', 112, 352, { w: 88 }), A('zoo animals bw/snake', 556, 356, { h: 88 }),
      A('animals bw 5/gorilla', 220, 706, { h: 88 }), A('animals bw 5/peacock', 470, 640, { h: 88 })],
  })),
  copy('attic', 3, 'Who Hides in the Attic?', (A) => ({
    clutter: [{ seed: 18, n: 4, srcs: ['classroom bw/book', 'education bw/book'], h: [24, 34], region: { x0: 180, y0: 686, x1: 655, y1: 690 } }],
    motifs: S([{ m: 'line', a: [[[14, 260], [337, 30], [661, 260]]] }, { m: 'line', a: [[[14, 690], [661, 690]]] }, { m: 'circle', a: [337, 150, 52] }, { m: 'line', a: [[[285, 150], [389, 150]]] }, { m: 'line', a: [[[337, 98], [337, 202]]] },
      D.rect(200, 600, 120, 90), D.rect(220, 530, 90, 70), D.rect(330, 620, 80, 70)]),
    items: [P('household bw/bookshelf', 92, 690, { h: 240 }), P('furniture bw/armchair', 560, 690, { w: 180 }), P('toys bw 2/robot', 370, 620, { h: 100 }), P('toys bw/train', 265, 530, { w: 110 }),
      P('toys bw/drum', 470, 690, { h: 80 }), P('toys bw/guitar', 440, 560, { h: 110 }), P('objects bw/ladder', 610, 480, { h: 210 }),
      A('animals bw 3/mouse_2', 260, 690, { h: 80 }), A('animals bw 4/cat_3', 560, 610, { w: 90 }), A('animals bw 5/bat', 180, 210, { w: 88 }),
      A('birds bw 2/owl', 92, 440, { h: 84 }), A('animals bw 5/hamster', 92, 600, { w: 78 })],
  })),
  copy('mountain', 3, 'Who Hides in the Mountains?', (A) => ({
    clutter: [{ seed: 19, n: 6, srcs: GROUND, h: [26, 40], region: { x0: 20, y0: 520, x1: 655, y1: 560 } }, { seed: 39, n: 7, srcs: GROUND, h: [26, 40], region: { x0: 20, y0: 600, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'line', a: [[[14, 330], [140, 150], [250, 290], [380, 110], [520, 280], [600, 190], [661, 260]]] }, { m: 'line', a: [[[14, 560], [661, 560]]] },
      ...fir(40, 400, 520, 30), ...fir(250, 380, 520, 32), ...fir(330, 400, 520, 28), ...fir(640, 410, 520, 26), { m: 'pathBand', a: [[[200, 716], [240, 650], [190, 600], [230, 562]], 50] },
      ...D.stone(560, 420, 120), ...D.stone(420, 712, 100)]),
    items: [P('travel and holiday bw/log_cabin', 470, 560, { w: 210 }), P('nature bw/campfire', 320, 706, { h: 70 }, true), P('nature bw/tree', 120, 560, { h: 200 }),
      A('animals bw 4/goat_2', 560, 390, { h: 84 }), A('animals bw 5/eagle', 380, 132, { h: 84 }), A('animals bw 5/bear', 90, 706, { h: 88 }),
      A('animals bw 3/deer', 610, 706, { h: 88 }), A('zoo animals bw/yak', 300, 556, { h: 82 })],
  })),
  copy('orchard', 3, 'Who Hides in the Orchard?', (A) => ({
    clutter: [{ seed: 20, n: 6, srcs: LEAVES, h: [24, 36], region: { x0: 20, y0: 160, x1: 655, y1: 540 } }, { seed: 40, n: 8, srcs: ['fruits bw/apple', 'fruits bw/apple_2', 'nature bw/flower', 'Easter bw/tulip'], h: [26, 40], region: { x0: 20, y0: 590, x1: 655, y1: 712 } }],
    motifs: S([{ m: 'line', a: [[[14, 560], [661, 560]]] }, ...D.leaf(260, 700, 50, -1.0), ...D.leaf(480, 690, 50, -2.2), ...D.leaf(60, 650, 50, -1.4), { m: 'sun', a: [337, 70, 28, 8] }]),
    decor: [{ m: 'grass', a: [100, 640, 22, 4], w: 2 }, { m: 'grass', a: [400, 600, 20, 4], w: 2 }, { m: 'grass', a: [630, 660, 20, 4], w: 2 }],
    items: [P('home and nature bw/tree_2', 150, 560, { h: 290 }), P('home and nature bw/tree_2', 520, 560, { h: 290 }), P('tools bw/ladder', 337, 560, { h: 230 }),
      P('tools bw/wheelbarrow', 560, 712, { w: 140 }), P('fruits bw/apple', 110, 708, { h: 40 }, true), P('fruits bw/apple', 420, 708, { h: 36 }, true),
      A('birds bw/woodpecker', 150, 470, { h: 84 }), A('birds bw 2/crow', 520, 330, { h: 80 }), A('zoo animals bw/porcupine', 200, 706, { w: 88 }),
      A('animals bw 2/fox', 440, 650, { h: 84 }), A('animals bw/raccoon_2', 620, 640, { h: 80 })],
  })),
];
if (ERR.length) throw new Error(ERR.join(' | '));
module.exports = { SCENES };
