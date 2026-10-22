/**
 * data/ptx/scenes-G1431.js — G1-431 "Trace, then draw" Level Set copies (ptl): a traced scene with ONE empty space that has
 * a reason (a basket, a tank, a nest, a toy chest…); nothing in it, no model, no right answer; each copy's instruction
 * names what goes in (INSTR) and its printed heading asks the question (NAME). Concepts: _work/ptl-scenes-B.json
 * (Designer B); the containers are drawn (data/ptx/td.js). Levels (ptl-levels.md §G1-431): L1 G1-1 — 3-4 pictures + a
 * ground, 130-280 px, the space ≥ 260 × 200 · L2 G1 — 4-6 pictures + ground + sky, 110-280, ≥ 240 × 160 (the published
 * trailer is 295 × 170) · L3 G1-3 — 7-9 pictures + ground + sky, 70-240, ≥ 160 × 140.
 * A load-time check MEASURES every space: its size against the level, and that no picture's ink box and no traced point
 * of any line enters it — an empty space with something in it cannot ship.
 */
'use strict';
const T = require('./td.js');
const C = require('./dc.js');
const X = require('./xm.js');
const { boxOfItem } = require('./lay.js');
const BAND = { 1: { band: 'G1-1', style: 'P2' }, 2: { band: 'G1', style: 'P3' }, 3: { band: 'G1-3', style: 'P3' } };
const MIN = { 1: [260, 200], 2: [240, 160], 3: [160, 140] };
const floor = (y = 690) => ({ m: 'line', a: [[[14, y], [661, y]]] });
const ERR = [];
/** the space must be the level's size and EMPTY: no picture box, no traced point inside it */
function checkHole(id, level, hole, items, motifs) {
  const [mw, mh] = MIN[level], w = hole.x1 - hole.x0, h = hole.y1 - hole.y0;
  if (w < mw || h < mh) ERR.push(`G1-431 ${id}: the empty space is ${Math.round(w)} × ${Math.round(h)} (L${level} wants ≥ ${mw} × ${mh})`);
  for (const it of items) {
    if (it.container) continue;   // the library container itself (an empty frame, a wheelbarrow): the hole is INSIDE its box
    const b = boxOfItem(it), x0 = b.x - b.w / 2, x1 = b.x + b.w / 2, y0 = b.y - b.h, y1 = b.y;
    if (x0 < hole.x1 && x1 > hole.x0 && y0 < hole.y1 && y1 > hole.y0) ERR.push(`G1-431 ${id}: ${it.src} enters the empty space`);
  }
  for (const m of motifs) if (m.m === 'line') for (const [x, y] of m.a[0]) if (x > hole.x0 + 1 && x < hole.x1 - 1 && y > hole.y0 + 1 && y < hole.y1 - 1) { ERR.push(`G1-431 ${id}: a line enters the empty space at ${Math.round(x)},${Math.round(y)}`); break; }
}
const copy = (id, level, name, instr, build) => {
  const s = build(); checkHole(id, level, s.hole, s.items, s.motifs);
  return { id: 'ptx-G1-431-' + id, face: 'G1-431', level, name: { en: name }, instr: { en: instr },
    skin: () => { const b = build(); return { ...BAND[level], decor: process.env.PTL_SHOW_HOLE ? [{ m: 'roundRect', a: [b.hole.x0, b.hole.y0, b.hole.x1 - b.hole.x0, b.hole.y1 - b.hole.y0, 2], w: 1 }] : [],
      motifs: b.motifs, items: b.items.map(({ container, ...it }) => it), ...(b.budget ? { budget: b.budget } : {}) }; } };
};
const D = (what) => `Trace the whole picture. Then draw ${what}.`;
const SCENES = [
  // ── L1 — three or four big pictures, one big space ───────────────────────────────────────────────────────────────────
  copy('fruit-bowl', 1, 'What Is in the Bowl?', D('what is in the bowl'), () => {
    // the library's EMPTY bowl (kitchen bw) on a drawn table; the hole = the space above the bowl, a little wider than it
    // (a wheelbarrow was refused: the library's empty one carries a spade in its tray)
    return { hole: { x0: 202, y0: 66, x1: 472, y1: 272 }, motifs: [...C.table(110, 500, 455, 172), floor(), ...C.windowPanes(24, 60, 140, 120)],
      items: [{ src: 'kitchen bw/bowl', x: 337, y: 500, w: 300, container: true }, { src: 'home bw/cup', x: 540, y: 500, h: 136 }, { src: 'animals bw 4/cat', x: 337, y: 690, h: 150 }] };
  }),
  copy('fish-tank', 1, 'Who Lives in the Tank?', D('who lives in the tank'), () => {
    const t = T.tank(330, 690, 300, 280, 100);
    return { hole: t.hole, motifs: [...t.motifs, floor(), ...C.wallClock(150, 140, 60)],
      items: [{ src: 'animals bw 4/cat', x: 145, y: 690, h: 220 }] };
  }),
  copy('nest', 1, 'What Is in the Nest?', D('what is in the nest'), () => {
    const n = T.nest(330, 330, 300, 220);
    return { hole: n.hole, motifs: [...n.motifs, floor(), { m: 'sun', a: [600, 80, 34, 8] }],
      items: [{ src: 'nature bw/bird', x: 580, y: 318, h: 150 }, { src: 'animals bw 4/rabbit_2', x: 200, y: 690, h: 200 }, { src: 'home bw 2/flower', x: 470, y: 690, h: 180 }] };
  }),
  copy('toy-chest', 1, 'What Is in the Toy Box?', D('what is in the toy box'), () => {
    const c = T.chest(200, 690, 290, 150, 230);
    return { hole: c.hole, motifs: [...c.motifs, floor(), ...C.plank(24, 286, 168, 16), ...C.windowPanes(500, 70, 110, 96)],
      items: [{ src: 'toys bw/rocket', x: 108, y: 286, h: 160 }, { src: 'animals bw/teddy_bear_2', x: 90, y: 690, h: 170 }, { src: 'sports bw/beach_ball', x: 580, y: 690, w: 132 }] };
  }),
  copy('pond', 1, 'Who Swims in the Pond?', D('who swims in the pond'), () => {
    const p = T.pond(350, 535, 230, 150);
    return { hole: p.hole, motifs: [...p.motifs, floor(330), ...X.bench(470, 330, 170)],
      items: [{ src: 'home and nature bw/tree_3', x: 120, y: 330, h: 290 }, { src: 'home bw 2/flower', x: 370, y: 330, h: 170 }] };
  }),
  // ── L2 — four to six pictures, a ground and a sky (the published shape) ────────────────────────────────────────────────
  copy('fish-crate', 2, 'What Did the Boat Catch?', D('what the boat caught'), () => {
    const c = T.openCrate(190, 520, 300, 120, 190), P = require('./dr.js').pier(14, 661, 520, 5, 70);
    return { hole: c.hole, motifs: [...c.motifs, ...P, { m: 'waves', a: [14, 661, 630, 60, 8] }, { m: 'sun', a: [80, 80, 32, 8] }, { m: 'cloud', a: [330, 90, 170] }],
      items: [{ src: 'birds bw/pelican', x: 95, y: 520, h: 170 }, { src: 'travel and holiday bw/lighthouse', x: 574, y: 520, h: 240 }, { src: 'vehicles bw 3/boat', x: 470, y: 708, h: 150, halo: 8 }, { src: 'birds bw 2/bird', x: 110, y: 280, h: 110 }] };
  }),
  copy('market-stall', 2, 'What Is the Stall Selling?', D('what the stall is selling'), () => {
    const st = T.stall(330, 690, 380, 600), cr = require('./dr.js').crate(270, 690, 120);
    return { hole: st.hole, motifs: [...st.motifs, ...cr, floor(), { m: 'sun', a: [605, 80, 30, 8] }, { m: 'cloud', a: [70, 70, 110] }],
      items: [{ src: 'animals bw 5/dog_3', x: 598, y: 690, h: 130 }, { src: 'beach bw 2/tote_bag', x: 70, y: 690, h: 150 }, { src: 'kitchen bw/kitchen_scale', x: 330, y: 570, h: 112 }, { src: 'birds bw 2/bird', x: 598, y: 320, h: 110 }] };
  }),
  copy('shop-window', 2, 'What Is in the Shop Window?', D('what is in the shop window'), () => {
    const sh = T.shopWindow(40, 560, 520, 420, 300, 220);
    return { hole: sh.hole, motifs: [...sh.motifs, floor(560), floor(704), { m: 'sun', a: [620, 64, 26, 8] }],
      items: [{ src: 'vehicles bw 3/baby_carriage', x: 160, y: 700, h: 120 }, { src: 'animals bw 4/dog', x: 420, y: 700, h: 120 }, { src: 'animals bw 5/squirrel', x: 610, y: 560, h: 112 }, { src: 'birds bw 2/bird', x: 470, y: 114, h: 110 }] };
  }),
  copy('birthday-table', 2, 'What Is on the Birthday Table?', D('what is on the birthday table'), () => {
    const t = T.partyTable(140, 420, 395, 224, 200);
    const flags = []; for (let i = 0; i < 7; i++) { const x = 70 + i * 89, y = 40 + 40 * (1 - ((x - 337) / 323) ** 2); flags.push({ m: 'line', a: [[[x - 16, y], [x + 16, y], [x, y + 30], [x - 16, y]], true] }); }
    return { hole: t.hole, motifs: [...t.motifs, ...X.garland(14, 661, 40, 40), ...flags, floor()],
      items: [{ src: 'furniture bw/chair', x: 76, y: 690, h: 210 }, { src: 'furniture bw/chair', x: 598, y: 690, h: 210, flip: true }, { src: 'valentine bw/balloon', x: 76, y: 470, h: 160 },
        { src: 'valentine bw/gift_box', x: 337, y: 690, h: 130 }, { src: 'toys bw/party_hat', x: 598, y: 480, h: 110 }] };
  }),
  copy('gallery', 2, 'What Is in the Painting?', D('the painting in the empty frame'), () => {
    const f = T.frame(150, 50, 380, 300);
    return { hole: f.hole, motifs: [...f.motifs, ...X.bench(190, 690, 300), floor()],
      items: [{ src: 'household bw/plant', x: 80, y: 690, h: 220 }, { src: 'furniture bw/stool', x: 592, y: 690, h: 160 }, { src: 'classroom bw 2/palette', x: 592, y: 530, w: 120 }, { src: 'animals bw 4/cat', x: 300, y: 620, h: 140 }] };
  }),
  // ── L3 — seven to nine smaller pictures, a ground and a sky, one smaller space ─────────────────────────────────────────
  copy('tent', 3, 'Who Sleeps in the Tent?', D('who sleeps in the tent'), () => {
    const t = T.openTent(330, 600, 420, 400, 336);
    const fir = (cx, top, base, hw) => [{ m: 'line', a: [X.firPoly(cx, top, base, hw), true] }, T.rectOf(cx - 9, base, 18, 600 - base)];
    return { hole: t.hole, motifs: [...t.motifs, floor(600), ...fir(608, 300, 540, 50), { m: 'moon', a: [70, 80, 30] }, { m: 'star', a: [190, 70, 14] }, { m: 'star', a: [470, 110, 12] }, { m: 'star', a: [600, 60, 14] },
      { m: 'waves', a: [330, 661, 664, 40, 6] }],
      items: [{ src: 'birds bw 2/owl', x: 608, y: 300, h: 92 }, { src: 'nature bw/campfire', x: 90, y: 600, h: 100 }, { src: 'nature bw/mushroom', x: 60, y: 704, h: 76 },
        { src: 'travel and holiday bw/kayak', x: 540, y: 668, w: 170 }, { src: 'animals bw/fox', x: 160, y: 704, h: 90 }, { src: 'animals bw/snail', x: 270, y: 704, h: 62 }, { src: 'nature bw/butterfly', x: 140, y: 300, w: 90 }] };
  }),
  copy('zoo-pen', 3, 'Who Lives in the Empty Pen?', D('who lives in the empty pen'), () => {
    const e = T.enclosure(224, 470, 228, 230), pen = (x, w) => T.enclosure(x, 470, w, 230).motifs;
    return { hole: e.hole, motifs: [...e.motifs, ...pen(16, 196), ...pen(464, 196), floor(470), ...X.bench(250, 640, 180), floor(704), { m: 'sun', a: [600, 60, 28, 8] }, { m: 'cloud', a: [120, 70, 140] }],
      items: [{ src: 'zoo animals bw/zebra', x: 114, y: 470, h: 150 }, { src: 'animals bw 5/giraffe', x: 560, y: 470, h: 210 }, { src: 'toys bw 2/pinwheel', x: 80, y: 704, h: 120 },
        { src: 'valentine bw/balloon', x: 470, y: 640, h: 120 }, { src: 'food bw/ice_cream', x: 610, y: 704, h: 110 }, { src: 'animals bw 5/monkey', x: 340, y: 570, h: 86 }, { src: 'birds bw 2/bird', x: 400, y: 150, h: 70 }] };
  }),
  copy('castle', 3, 'Who Looks out of the Tower?', D('who looks out of the tower window'), () => {
    const t = T.towerWindow(337, 600, 280, 420, 200, 230);
    return { hole: t.hole, motifs: [...t.motifs, floor(600), floor(704), { m: 'cloud', a: [100, 80, 140] }, { m: 'sun', a: [600, 70, 28, 8] }],
      items: [{ src: 'animals bw/dragon', x: 100, y: 600, h: 160 }, { src: 'animals bw 3/horse', x: 565, y: 600, h: 140 }, { src: 'farm bw/duck', x: 150, y: 704, h: 76 }, { src: 'farm bw/hay', x: 560, y: 704, h: 80 },
        { src: 'birds bw 2/bird', x: 590, y: 300, h: 70 }, { src: 'home and nature bw/tree', x: 80, y: 380, h: 150 }, { src: 'animals bw/snail', x: 340, y: 704, h: 60 }] };
  }),
  copy('cooking-pot', 3, 'What Is in the Pot?', D('what is cooking in the pot'), () => {
    const p = T.pot(337, 390, 240, 120, 166);
    return { hole: p.hole, motifs: [...p.motifs, ...X.cooker(197, 690, 280, 300), ...X.counter(24, 690, 150, 300), ...X.counter(506, 690, 145, 300), floor(), ...X.coatRack(510, 650, 190, 2), ...C.windowPanes(30, 70, 150, 130)],
      items: [{ src: 'home bw/toaster', x: 132, y: 390, h: 88 }, { src: 'kitchen bw/coffee_carafe', x: 50, y: 390, h: 96 }, { src: 'food bw/cheese', x: 548, y: 390, w: 88 }, { src: 'vegetables bw/carrot', x: 632, y: 390, h: 86 },
        { src: 'kitchen bw/whisk', x: 545, y: 330, h: 120 }, { src: 'kitchen bw/spoon', x: 615, y: 330, h: 120 }, { src: 'animals bw 4/cat', x: 100, y: 690, h: 110 }] };
  }),
  copy('garden-bed', 3, 'What Grows in the Garden Bed?', D('what grows in the garden bed'), () => {
    const g = T.gardenBed(170, 640, 330, 70, 172);
    return { hole: g.hole, motifs: [...g.motifs, floor(640), { m: 'sun', a: [80, 80, 30, 8] }, { m: 'cloud', a: [380, 90, 150] },
      T.rectOf(66, 380, 12, 260), { m: 'line', a: [[[40, 380], [72, 340], [104, 380], [40, 380]], true] }, T.rectOf(46, 380, 52, 46)],
      items: [{ src: 'farm bw/scarecrow', x: 580, y: 640, h: 200 }, { src: 'home bw 2/watering_can', x: 90, y: 704, w: 110 }, { src: 'tools bw/wheelbarrow', x: 300, y: 712, w: 130 },
        { src: 'animals bw/snail', x: 500, y: 704, h: 60 }, { src: 'animals bw 3/bee', x: 260, y: 300, h: 70 }, { src: 'nature bw/butterfly', x: 560, y: 260, w: 90 }, { src: 'birds bw 2/bird', x: 72, y: 330, h: 80 }] };
  }),
];
if (ERR.length) throw new Error(ERR.join(' | '));
module.exports = { SCENES };
