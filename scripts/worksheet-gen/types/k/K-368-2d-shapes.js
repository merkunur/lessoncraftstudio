/**
 * K-368 — 2D Shapes (nt10-E; family key `2d-shapes`, K, math, CCSS K.G.A.2
 * "correctly name shapes regardless of their orientations or overall size").
 * Design: docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §2 + §5; rulings
 * _work/K-368-critic.md; build record _work/K-368-build.md.
 *
 * Six round white LENSES in a 2 x 3 card grid, each holding ONE exact outline
 * shape (primitives/flat-shape.js, teal 3 px, no fill), each with three name
 * TAGS beside it; the child circles one tag per lens. The disc gives the eye no
 * horizontal or vertical axis, so a turned square cannot read as a "diamond"
 * the way it would inside a square card edge (the K.G.A.2 "regardless of
 * orientation" move is carried by the apparatus). No picture, no answer key:
 * the exactness of the drawings is the key.
 *
 * THEME AXIS OFF (`coordinate.theme:''`); no unitAxis. build() reads ONLY its
 * bank (lib/b5-common.js bank('2d-shapes', loc) — a missing locale block
 * THROWS, never an en fallback); every word on the page is a whole literal of
 * that bank (`names[kind]`), nothing inflects, image-vocabulary.js is never
 * read at render. A missing / empty / slot-bearing name REFUSES.
 *
 * The composer is LOCALE-NEUTRAL: the seed carries no locale, so the six
 * figures, their order and the tag order are identical in all 11 locales; only
 * the tag literals change.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys, never on the
 * level index (design §2 ladder):
 *   d1  cards 4 (2x2) · lens 188 · R [52, 82] · 2 tags at 20 px · turnedMin 1 ·
 *       sizeSpread 1.3 — lens OVER a tag row (layout 'column': 188 + 14 + 48;
 *       the design's lens-left row is 188 + 14 + 140 = 342 > the 302.5 card)
 *   d2  cards 6 (2x3) · lens 156 · R [44, 69] · 3 tags at 18 px · turnedMin 3 ·
 *       turnedSquare 1 · skinnyMin 1 · sizeSpread 1.375            (ships)
 *   d3  as d2 + `hexagon` iff inventory.hexagon · turnedMin 4 · skinnyMin 2
 *
 * COMPOSER (d2): A circle · B square at 45° · C skinny triangle turned
 * (rot 36..74, mirrored 16..43; see the deviation below) · D rectangle aspect 2.3..2.6 turned
 * 15..40 (or its mirror) · E F = two DIFFERENT kinds of {triangle right /
 * obtuse, square 0..12°, rectangle 1.5..2.0 at 0 / 90°} (so every core name is
 * an answer and exactly two repeat); rng.shuffle into the grid; then one
 * NON-skinny figure gets R <= 48 and another R >= 66 (every R also >= its
 * kind's minR, primitives/flat-shape.js). "Turned" is measured, not stamped:
 * NO side of the drawn figure lies within 15° of level. A skinny triangle
 * turned 15..34° has its third side within 15° of level (at 20° it is 0.8°
 * off: it sits on that side), so C draws 36..74 — the design's [15, 75] would
 * ship prototypical skinny triangles. Every turned draw keeps >= 1° off the
 * 15° line (16..74) so 0.01 px coordinate rounding cannot drop a figure out.
 *
 * TAGS: the answer + (tags - 1) distractors from the page kinds; a SQUARE
 * card's tags are exactly {square, circle, triangle} (never rectangle, at d1
 * {square, circle|triangle}); a rectangle card may carry `square` (wrong,
 * correctly). Per-card order rng.shuffle'd, the whole page redrawn until the
 * answers use >= 2 slots and no slot holds more than 60 % of the cards.
 *
 * STAMPS: root data-lcs-type="K-368" data-lcs-cfg (resolved config) +
 * data-lcs-names (kind → printed literal); figure svg[data-lcs-prim=
 * "flat-shape"] with data-lcs-verts / -rot / -R and the DEBUG-only
 * data-lcs-kind (verify never reads it); tag [data-lcs-tag="<kind>"]; the card
 * stage data-ws-content. verify(page) re-derives every answer from the drawn
 * path with its OWN classify(): per card exactly one tag names it; no square
 * card carries a rectangle tag; turned / turned-square / skinny / size-spread
 * and the K floors (min caliper >= 30, extent >= 72) from the geometry; lens
 * clearance >= 7.5 px; no text in any svg; no <img>; tags >= 48 high, >= the
 * configured px, unclipped, text === the stamped literal; slot spread.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const C5 = require('../../templates/components-b5.js');
const { minR } = require('../../primitives/flat-shape.js');
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');

const ID = 'K-368';
const KEY = '2d-shapes';
const CORE = ['circle', 'square', 'triangle', 'rectangle'];
const K_FLOOR_W = 30, K_FLOOR_E = 72;      // min caliper / max extent of a true figure at K (design §5)
const TAG_H_K = 48;                         // the K ring target (pillChoice precedent)
const LENS_CLEAR = 7.5;                     // px between the stroked figure and the lens edge
const ORDER_TRIES = 400;
const FACE_MODES = ['real-or-not', 'around-us', 'write-name', 'riddles', 'dot-draw'];

/** A whole literal of the bank; missing / empty / slot-bearing REFUSES. */
function shapeName(block, kind, loc) {
  const w = block && block.names && block.names[kind];
  if (typeof w !== 'string' || !w.trim()) throw new Error(`${ID}: the ${loc} bank has no name for "${kind}" — refuse (never a vocab / en fallback)`);
  if (/[{}]/.test(w) || /\d/.test(w)) throw new Error(`${ID}: the ${loc} name for "${kind}" ("${w}") carries a slot or a digit — refuse`);
  return w;
}
function stringsFor(block, mode, loc) {
  const s = block && block.strings && block.strings[mode];
  if (!s || typeof s.title !== 'string' || !s.title.trim() || typeof s.instruction !== 'string' || !s.instruction.trim()) throw new Error(`${ID}: the ${loc} bank has no strings.${mode} — refuse`);
  return s;
}
function riddle(block, kind, i, loc) {
  const r = block && block.riddles && block.riddles[kind] && block.riddles[kind][i];
  if (!r || typeof r.text !== 'string' || !r.text.trim()) throw new Error(`${ID}: the ${loc} bank has no riddle ${kind}[${i}] — refuse`);
  return r;
}

/** The composer's own geometry (node side): the sides of the unit polygon after rot, none within 15° of level? */
const isSkinnyDraw = (s) => (s.kind === 'triangle' && s.sub === 'skinny') || (s.kind === 'rectangle' && s.aspect >= 2.2);
const aspectDraw = (rng, lo, hi) => Math.round((lo + (hi - lo) * rng.next()) * 10) / 10;

/** The skinny triangle turned so that NO side lies within 15° of level: its sides run at 0 / 160.8 / 59.0° (unit), so
 *  unflipped it needs rot 34.2..75 and mirrored (sides 0 / 19.2 / 121.0°) rot 15..44 — each kept 1° inside. */
function skinnyTurned(rng) { const flip = rng.next() < 0.5; return { kind: 'triangle', sub: 'skinny', flip, rot: flip ? rng.int(16, 43) : rng.int(36, 74) }; }

function composeSlots(cfg, rng) {
  const turnedRect = () => { const r = rng.int(16, 40); return rng.next() < 0.5 ? r : 180 - r; };
  const rightRot = () => rng.pick([0, 90, 180, 270]) + rng.int(-8, 8);
  const plain = {
    triangle: () => (rng.next() < 0.5 ? { kind: 'triangle', sub: 'right', rot: rightRot() } : { kind: 'triangle', sub: 'obtuse', rot: rng.pick([0, 180]) + rng.int(-8, 8), flip: rng.next() < 0.5 }),
    square: () => ({ kind: 'square', rot: rng.int(0, 12) }),
    rectangle: () => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.5, 2.0), rot: rng.pick([0, 90]) }),
  };
  const turned = {
    triangle: () => ({ kind: 'triangle', sub: 'right', rot: rng.int(16, 74) }),
    square: () => ({ kind: 'square', rot: rng.pick([rng.int(20, 35), rng.int(55, 70)]) }),
    rectangle: () => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.5, 2.0), rot: rng.int(16, 74) }),
  };
  let slots;
  if (cfg.cards === 4) {
    // d1: one of each core kind, `turnedMin` of the three polygons turned
    const polys = ['square', 'triangle', 'rectangle'];
    const turn = new Set(rng.sample(polys, cfg.turnedMin));
    slots = [{ kind: 'circle' }, ...polys.map((k) => (turn.has(k) ? turned[k]() : plain[k]()))];
  } else {
    slots = [
      { kind: 'circle' },
      { kind: 'square', rot: 45 },
      skinnyTurned(rng),
      { kind: 'rectangle', aspect: aspectDraw(rng, 2.3, 2.6), rot: turnedRect() },   // 2.2 exactly measures 2.199 after 0.01 px rounding (sweep d3 seeds 11 / 19): keep off the skinny line
    ];
    const extraTurned = Math.max(0, cfg.turnedMin - 3);
    if (cfg.hexagon) {
      slots.push({ kind: 'hexagon', rot: rng.int(0, 59) });
      const k = rng.pick(['triangle', 'square', 'rectangle']);
      slots.push(extraTurned > 0 ? turned[k]() : plain[k]());
    } else {
      const [k1, k2] = rng.sample(['triangle', 'square', 'rectangle'], 2);
      slots.push(extraTurned > 0 ? turned[k1]() : plain[k1]());
      slots.push(extraTurned > 1 ? turned[k2]() : plain[k2]());
    }
  }
  // sizes: every R within [max(Rmin, minR), Rmax]; one non-skinny small, one big
  const need = (s) => Math.ceil(minR(s.kind, s.sub, s.aspect || 1, { minWidth: cfg.floorW, maxWidth: cfg.floorE }) * 10) / 10;
  for (const s of slots) {
    const lo = Math.max(cfg.R[0], Math.ceil(need(s)));
    if (lo > cfg.R[1]) throw new Error(`${ID}: ${s.kind}${s.sub ? '/' + s.sub : ''} needs R >= ${need(s)} > the lens maximum ${cfg.R[1]}`);
    s.R = rng.int(lo, cfg.R[1]);
  }
  const smallCands = slots.map((s, i) => i).filter((i) => !isSkinnyDraw(slots[i]) && need(slots[i]) <= cfg.small[1]);
  if (!smallCands.length) throw new Error(`${ID}: no non-skinny figure can be drawn at R <= ${cfg.small[1]}`);
  const si = rng.pick(smallCands);
  slots[si].R = rng.int(Math.max(cfg.small[0], Math.ceil(need(slots[si]))), cfg.small[1]);
  const bi = rng.pick(slots.map((s, i) => i).filter((i) => i !== si));
  slots[bi].R = rng.int(cfg.big[0], cfg.big[1]);
  return slots;
}

function tagSets(slots, cfg, rng) {
  const pool = cfg.hexagon ? [...CORE, 'hexagon'] : CORE.slice();
  return slots.map((s) => {
    let d;
    if (s.kind === 'square') d = cfg.tags === 3 ? ['circle', 'triangle'] : [rng.pick(['circle', 'triangle'])];
    else d = rng.sample(pool.filter((k) => k !== s.kind), cfg.tags - 1);
    return [s.kind, ...d];
  });
}

function orderTags(sets, cfg, rng) {
  const cap = Math.floor(cfg.slotMaxShare * sets.length + 1e-9);
  for (let t = 0; t < ORDER_TRIES; t++) {
    const orders = sets.map((set) => rng.shuffle(set));
    const slotsUsed = orders.map((o, i) => o.indexOf(sets[i][0]));
    const counts = {};
    for (const x of slotsUsed) counts[x] = (counts[x] || 0) + 1;
    // every slot must hold at least one answer ON THE PAGE (a pooled-uniform sampler still ships pages that never use slot 1: 8.8% at d2, the nt10-D shipped-instance lesson)
    if (Object.keys(counts).length >= Math.min(cfg.tags, sets.length) && Math.max(...Object.values(counts)) <= cap) return orders;
  }
  throw new Error(`${ID}: no tag order puts an answer in every slot with <= ${cap} per slot in ${ORDER_TRIES} tries`);
}

/* =====================================================================================================
 * THE FIVE FACES (Phase E, 2026-09-23; design §3). ONE additive knob `mode` — `d.mode` undefined is the
 * base path above, untouched and byte-identical (tools/b3-baseline.js --check is the proof). A face
 * stamps data-lcs-mode on the root; every guard keys on the RESOLVED face config, never the level.
 * Each face is locale-neutral like the base (the seed carries no locale): only the literals change.
 * ===================================================================================================== */
const { flatShape, unitPolygon } = require('../../primitives/flat-shape.js');
const { fileUri } = require('../../lib/b2-common.js');
const { rulingBlock, wordBank } = require('../../templates/components-b2.js');
const OBJECTS = require('../../data/b5/2d-shapes.js').OBJECTS;
const G1_FLOOR_W = 30, G1_FLOOR_E = 45, TAG_H_G1 = 44, PAGE_TRIES = 400;

/** a rotation that is EXACTLY level or clearly turned (15..75°): a 1-8° tilt reads as a drawing slip, not as a turn (read 2026-09-23) */
const levelOrTurned = (rng, base = [0]) => (rng.next() < 0.5 ? rng.pick(base) : rng.pick(base) + rng.int(16, 74));
/** measured, never stamped: no side of the drawn polygon within 15° of level */
const levelOff = (a, b) => { let t = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; t = ((t % 180) + 180) % 180; return Math.min(t, 180 - t); };
const turnedOf = (P) => P.length >= 3 && P.length < 20 && P.every((a, i) => levelOff(a, P[(i + 1) % P.length]) >= 15 + 1e-6);
const sidesOf = (P) => P.map((p, i) => Math.hypot(P[(i + 1) % P.length][0] - p[0], P[(i + 1) % P.length][1] - p[1]));
const skinnyOf = (kind, P) => { if (!(P.length === 3 || P.length === 4)) return false; const s = sidesOf(P); return kind === 'triangle' ? Math.min(...s) / Math.max(...s) <= 0.35 + 1e-6 : kind === 'rectangle' ? Math.max(...s) / Math.min(...s) >= 2.2 - 1e-6 : false; };
const faceStrings = (block, mode, loc) => stringsFor(block, mode, loc);
const needR = (s, floorW, floorE) => Math.ceil(minR(s.kind, s.sub, s.aspect || 1, { minWidth: floorW, maxWidth: floorE }) * 10) / 10;
/** the index of a LONGEST side of the drawn unit (a gap / curve goes there: design §2 deviation 5) */
function longSideIdx(s, rng) {
  const U = unitPolygon(s.kind, s.sub, s.aspect || 1, !!s.flip);
  const L = sidesOf(U), m = Math.max(...L);
  return rng.pick(L.map((x, i) => (x >= m * 0.999 ? i : -1)).filter((i) => i >= 0));
}
function root(mode, stamp, names, inner, extra) {
  return `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-mode="${mode}" data-lcs-cfg="${esc(JSON.stringify(stamp))}" ` +
    `data-lcs-names="${esc(JSON.stringify(names))}"${extra || ''} style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;
}
/** the card number rides ABOVE a full-width riddle bubble (cardGrid paints the badge first; the bubble is positioned for its "?" disc) */
const badgeOnTop = (html) => html.split('<span class="ws-card-badge">').join('<span class="ws-card-badge" style="z-index:2">');
const namesFor = (block, kinds, loc) => Object.fromEntries(kinds.map((k) => [k, shapeName(block, k, loc)]));

/* ---------------------------------------------------------------- F1 real-or-not (G1) */
const F1_TRUE = {
  triangle: [
    (rng) => ({ kind: 'triangle', sub: 'equilateral', rot: rng.int(16, 44) }),
    (rng) => ({ kind: 'triangle', sub: 'right', rot: rng.pick([0, 90, 180, 270]) }),   // exactly level: a 1-6° tilt reads as a drawing slip
    (rng) => ({ kind: 'triangle', sub: 'obtuse', rot: levelOrTurned(rng, [0, 90, 180, 270]), flip: rng.next() < 0.5 }),
    (rng) => skinnyTurned(rng),
  ],
  rectangle: [
    (rng) => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.5, 2.0), rot: rng.int(20, 70) }),
    (rng) => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.6, 2.1), rot: rng.pick([0, 90]) }),
    (rng) => ({ kind: 'rectangle', aspect: aspectDraw(rng, 2.3, 3.0), rot: levelOrTurned(rng, [0, 90]) }),
  ],
  square: [
    () => ({ kind: 'square', rot: 0 }),
    () => ({ kind: 'square', rot: 45 }),
    (rng) => ({ kind: 'square', rot: rng.int(18, 24) }),
    (rng) => ({ kind: 'square', rot: levelOrTurned(rng), small: true }),
  ],
  circle: [() => ({ kind: 'circle', small: true }), () => ({ kind: 'circle', large: true })],
};
const F1_NEAR = {
  triangle: [
    (rng) => { const s = { kind: 'triangle', sub: rng.pick(['equilateral', 'right']), rot: rng.int(0, 359), variant: 'gap' }; s.vside = longSideIdx(s, rng); return s; },
    (rng) => ({ kind: 'triangle', sub: 'equilateral', rot: rng.int(0, 359), variant: 'curved', vside: rng.int(0, 2) }),
    // the design's `round` triangle is REPLACED: the primitive's fillet (r = 0.25 × the shortest side) trims 43 % of
    // every side of an equilateral triangle and draws a pebble (read 2026-09-23: ~10 px of straight side at R 44),
    // which a child reads as "a blob", not "a triangle with round corners". A curved HYPOTENUSE on a right triangle
    // keeps two straight sides and one right corner and fails on exactly one attribute.
    (rng) => { const s = { kind: 'triangle', sub: 'right', rot: rng.pick([0, 90, 180, 270]), variant: 'curved' }; s.vside = longSideIdx(s, rng); return s; },
    (rng) => ({ kind: 'kite', rot: rng.int(0, 359) }),
  ],
  rectangle: [                                   // never a square (design §3 F1)
    (rng) => ({ kind: 'parallelogram', rot: levelOrTurned(rng, [0, 180]), flip: rng.next() < 0.5 }),
    (rng) => ({ kind: 'trapezoid', rot: levelOrTurned(rng, [0, 180]) }),
    (rng) => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.6, 2.2), rot: levelOrTurned(rng, [0, 90]), variant: 'round' }),
    (rng) => { const s = { kind: 'rectangle', aspect: aspectDraw(rng, 1.6, 2.2), rot: levelOrTurned(rng, [0, 90]), variant: 'gap' }; s.vside = longSideIdx(s, rng); return s; },
  ],
  square: [
    (rng) => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.5, 2.0), rot: levelOrTurned(rng, [0, 90]) }),
    (rng) => ({ kind: 'rhombus', rot: rng.int(0, 179), flip: rng.next() < 0.5 }),
    (rng) => ({ kind: 'square', rot: levelOrTurned(rng), variant: 'gap', vside: rng.int(0, 3) }),
    (rng) => ({ kind: 'square', rot: levelOrTurned(rng), variant: 'round' }),
  ],
  circle: [
    (rng) => ({ kind: 'ellipse', aspect: aspectDraw(rng, 1.4, 1.8), rot: rng.int(0, 179) }),
    (rng) => ({ kind: 'circle', rot: rng.int(0, 359), variant: 'gap' }),
    (rng) => ({ kind: 'chord', rot: rng.int(0, 359), flip: rng.next() < 0.5 }),
  ],
};
/** the most true figures one lens column may carry on a page */
const colCap = (total, nRows, share) => Math.min(Math.ceil(total * share), nRows >= 3 ? nRows - 1 : nRows);
function f1Cfg(d) {
  const c = { perRow: 4, trueMin: 1, trueMax: 3, lens: 132, R: [33, 60], nearR: [44, 60], turnedMin: 2, skinnyMin: 1, floorW: G1_FLOOR_W, floorE: G1_FLOOR_E, pillPx: 20, colMaxShare: 0.5, ...d };
  if (!Array.isArray(c.rows) || !c.rows.length || c.rows.length > 4 || !c.rows.every((k) => CORE.includes(k)) || new Set(c.rows).size !== c.rows.length) throw new Error(`${ID} real-or-not: rows must be a list of 1-4 distinct core kinds (got ${JSON.stringify(c.rows)})`);
  if (![3, 4].includes(c.perRow) || c.perRow * c.lens > 639) throw new Error(`${ID} real-or-not: ${c.perRow} lenses of ${c.lens} do not fit the 639 px lane`);
  if (!(c.trueMin >= 1 && c.trueMax < c.perRow && c.trueMin <= c.trueMax)) throw new Error(`${ID} real-or-not: trueCount ${c.trueMin}..${c.trueMax} must leave >= 1 near-miss in a row of ${c.perRow}`);
  if (!(c.R[1] + 1.5 <= c.lens / 2 - 3 + 1e-9 && c.nearR[1] <= c.R[1] && c.nearR[0] >= 44)) throw new Error(`${ID} real-or-not: R ${c.R} / near-miss R ${c.nearR} do not fit a ${c.lens} lens (near-misses >= 44)`);
  return c;
}
function buildRealOrNot(block, d, loc, rng) {
  const cfg = f1Cfg(d);
  const names = namesFor(block, CORE, loc);
  const strings = faceStrings(block, 'real-or-not', loc);
  for (let t = 0; t < PAGE_TRIES; t++) {
    let counts;
    do { counts = cfg.rows.map(() => rng.int(cfg.trueMin, cfg.trueMax)); } while (counts.length > 1 && counts.every((x) => x === counts[0]));
    const rows = cfg.rows.map((target, ri) => {
      const truePool = rng.shuffle(F1_TRUE[target]), nearPool = rng.shuffle(F1_NEAR[target]);
      const nt = counts[ri], nn = cfg.perRow - nt;
      if (nn > nearPool.length) throw new Error(`${ID} real-or-not: the ${target} row needs ${nn} near-misses, the pool has ${nearPool.length}`);
      const figs = [];
      for (let i = 0; i < nt; i++) figs.push({ ...truePool[i % truePool.length](rng), truth: true });
      for (let i = 0; i < nn; i++) figs.push({ ...nearPool[i](rng), truth: false });
      for (const s of figs) {
        if (s.truth) {
          const lo = Math.max(cfg.R[0], Math.ceil(needR(s, cfg.floorW, cfg.floorE)));
          if (lo > cfg.R[1]) throw new Error(`${ID} real-or-not: ${s.kind} needs R >= ${lo} > ${cfg.R[1]}`);
          s.R = s.small ? rng.int(lo, Math.min(lo + 4, cfg.R[1])) : s.large ? rng.int(cfg.R[1] - 4, cfg.R[1]) : rng.int(Math.max(lo, 40), cfg.R[1]);
        } else s.R = rng.int(cfg.nearR[0], cfg.nearR[1]);
        delete s.small; delete s.large;
      }
      return { target, figs: rng.shuffle(figs) };
    });
    // measured page constraints (the drawn polygon, not the descriptor)
    let turned = 0, skinny = 0;
    const colTrue = Array(cfg.perRow).fill(0);
    let total = 0;
    for (const r of rows) r.figs.forEach((s, i) => {
      if (!s.truth) return;
      total++; colTrue[i]++;
      if (s.kind === 'circle') return;
      const P = flatShape({ ...s, lens: 0 }).verts;
      if (turnedOf(P)) turned++;
      if (skinnyOf(s.kind, P)) skinny++;
    });
    const colsUsed = colTrue.filter((x) => x > 0).length;
    if (turned < cfg.turnedMin || skinny < cfg.skinnyMin) continue;
    // per-page position tell: >= 3 columns carry a true figure, no column carries more than colMaxShare of them,
    // and (3+ rows) no column carries a true figure in EVERY row ("the first one is always right")
    if (colsUsed < Math.min(3, total) || Math.max(...colTrue) > colCap(total, cfg.rows.length, cfg.colMaxShare)) continue;
    const lanes = rows.map((r) => C5.realRow({ target: r.target, label: names[r.target], lensD: cfg.lens, pillPx: cfg.pillPx,
      figures: r.figs.map((s) => ({ kind: s.kind, sub: s.sub, aspect: s.aspect, rot: s.rot || 0, flip: !!s.flip, R: s.R, variant: s.variant || 'none', vside: s.vside || 0 })) }));
    const stamp = { mode: 'real-or-not', rows: cfg.rows, perRow: cfg.perRow, trueMin: cfg.trueMin, trueMax: cfg.trueMax, lens: cfg.lens, turnedMin: cfg.turnedMin, skinnyMin: cfg.skinnyMin,
      floorW: cfg.floorW, floorE: cfg.floorE, colMaxShare: cfg.colMaxShare };
    const inner = `<div data-lcs-stage style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:12px">${lanes.join('')}</div>`;
    return { bodyHtml: root('real-or-not', stamp, names, inner), meta: { cfg: stamp, strings, rows: rows.map((r) => ({ target: r.target, truth: r.figs.map((s) => s.truth), figs: r.figs })) } };
  }
  throw new Error(`${ID} real-or-not: no page met turned >= ${cfg.turnedMin} / skinny >= ${cfg.skinnyMin} / column spread in ${PAGE_TRIES} tries`);
}

/* ---------------------------------------------------------------- F2 around-us (K) */
function f2Cfg(d) {
  const c = { items: 8, split: { circle: 4, rectangle: 4 }, pic: 110, tile: [176, 56], tilePx: 16, cols: 2, rows: 4, runMax: 3, ...d };
  if (c.cols * c.rows !== c.items) throw new Error(`${ID} around-us: ${c.items} items in a ${c.cols}x${c.rows} grid`);
  if (Object.keys(c.split).sort().join() !== 'circle,rectangle' || c.split.circle + c.split.rectangle !== c.items) throw new Error(`${ID} around-us: split ${JSON.stringify(c.split)} must be circle + rectangle = items (no library object is a clean square or triangle)`);
  if (!(c.pic >= 110 && c.tile[1] >= 56 && c.tilePx >= 16)) throw new Error(`${ID} around-us: picture ${c.pic} / tile ${c.tile[1]} / ${c.tilePx} px below the K floors 110 / 56 / 16`);
  return c;
}
function buildAroundUs(block, d, loc, rng) {
  const cfg = f2Cfg(d);
  const objects = block.objects || OBJECTS;
  const names = namesFor(block, ['circle', 'rectangle'], loc);
  const strings = faceStrings(block, 'around-us', loc);
  const byShape = (s) => objects.filter((o) => o.shape === s && o.picOpened === true);
  for (const s of ['circle', 'rectangle']) if (byShape(s).length < cfg.split[s]) throw new Error(`${ID} around-us: ${byShape(s).length} opened ${s} objects < ${cfg.split[s]}`);
  const chosen = [...rng.sample(byShape('circle'), cfg.split.circle), ...rng.sample(byShape('rectangle'), cfg.split.rectangle)];
  for (let t = 0; t < PAGE_TRIES; t++) {
    const order = rng.shuffle(chosen);
    const ans = order.map((o) => o.shape);
    // per-page position tell: every grid column holds both shapes, no run of > runMax in reading order
    let okCols = true;
    for (let c = 0; c < cfg.cols; c++) { const col = ans.filter((_, i) => i % cfg.cols === c); if (!col.includes('circle') || !col.includes('rectangle')) okCols = false; }
    let run = 1, maxRun = 1;
    for (let i = 1; i < ans.length; i++) { run = ans[i] === ans[i - 1] ? run + 1 : 1; maxRun = Math.max(maxRun, run); }
    if (!okCols || maxRun > cfg.runMax) continue;
    const cards = order.map((o) => C5.objectCard({ src: fileUri(o.theme, o.noun), obj: `${o.theme}/${o.noun}`, answer: o.shape, labels: names, pic: cfg.pic, tileW: cfg.tile[0], tileH: cfg.tile[1], tilePx: cfg.tilePx }));
    const stamp = { mode: 'around-us', items: cfg.items, split: cfg.split, pic: cfg.pic, tile: cfg.tile, tilePx: cfg.tilePx, cols: cfg.cols, runMax: cfg.runMax };
    return { bodyHtml: root('around-us', stamp, names, cardGrid({ cards, cols: cfg.cols, rows: cfg.rows, numbered: true })), meta: { cfg: stamp, strings, objects: order.map((o) => `${o.theme}/${o.noun}`), answers: ans } };
  }
  throw new Error(`${ID} around-us: no card order spreads the shapes over both columns in ${PAGE_TRIES} tries`);
}

/* ---------------------------------------------------------------- F3 write-name (G1) */
const F3_DRAW = {
  circle: () => ({ kind: 'circle' }),
  square: (rng) => ({ kind: 'square', rot: rng.next() < 0.5 ? 0 : rng.int(20, 70) }),   // exactly level or clearly turned: a 2-8° tilt reads as a slip
  triangle: (rng) => ({ kind: 'triangle', sub: rng.pick(['equilateral', 'right', 'scalene']), rot: levelOrTurned(rng, [0, 90, 180, 270]), flip: rng.next() < 0.5 }),
  rectangle: (rng) => ({ kind: 'rectangle', aspect: aspectDraw(rng, 1.5, 1.9), rot: rng.pick([0, 90, rng.int(20, 70)]) }),
};
function f3Cfg(d) {
  const c = { lanes: 6, bank: true, turnedMin: 2, elongated: 1, lens: 84, R: [33, 36], rowW: 541, rowH: 70, glyphH: 32, bankPx: 18, floorW: G1_FLOOR_W, floorE: G1_FLOOR_E, ...d };
  if (!(c.lanes >= 4 && c.lanes <= 7)) throw new Error(`${ID} write-name: ${c.lanes} lanes (4-6)`);
  if (c.bank !== true) throw new Error(`${ID} write-name: the shipped face carries its word bank`);
  if (!(c.R[1] + 3 < c.lens / 2)) throw new Error(`${ID} write-name: R ${c.R[1]} + pad 3 does not fit a ${c.lens} lens`);
  if (!(c.lens + 22 + c.rowW <= 647)) throw new Error(`${ID} write-name: lens ${c.lens} + 22 + row ${c.rowW} > the 647 px lane`);
  if (!(c.rowH >= 60 && c.glyphH >= 28)) throw new Error(`${ID} write-name: writing row ${c.rowH} / glyph ${c.glyphH} too small for G1`);
  return c;
}
function buildWriteName(block, d, loc, rng) {
  const cfg = f3Cfg(d);
  const names = namesFor(block, CORE, loc);
  const strings = faceStrings(block, 'write-name', loc);
  for (let t = 0; t < PAGE_TRIES; t++) {
    const extras = rng.sample(['square', 'triangle', 'rectangle'], cfg.lanes - 4);   // never a second circle: it can only differ by 1-2 px of R
    const slots = CORE.map((k) => F3_DRAW[k](rng)).concat(extras.map((k) => F3_DRAW[k](rng)));
    // the elongated rectangle (aspect 2.0, short side still >= 30 at R >= 33.5)
    const ri = slots.findIndex((s) => s.kind === 'rectangle');
    for (let e = 0; e < cfg.elongated; e++) slots[ri].aspect = 2.0;
    for (const s of slots) {
      const lo = Math.max(cfg.R[0], Math.ceil(needR(s, cfg.floorW, cfg.floorE)));
      if (lo > cfg.R[1]) { s.redraw = true; continue; }
      s.R = rng.int(lo, cfg.R[1]);
    }
    if (slots.some((s) => s.redraw)) continue;
    const placed = rng.shuffle(slots);
    if (placed.some((s, i) => i && s.kind === placed[i - 1].kind)) continue;   // a repeated name never sits in two lanes in a row
    let turned = 0;
    for (const s of placed) if (s.kind !== 'circle' && turnedOf(flatShape({ ...s, lens: 0 }).verts)) turned++;
    if (turned < cfg.turnedMin) continue;
    const first = [];
    for (const s of placed) if (!first.includes(s.kind)) first.push(s.kind);
    let bank = rng.shuffle(CORE);
    for (let b = 0; b < 50 && bank.join() === first.join(); b++) bank = rng.shuffle(CORE);
    if (bank.join() === first.join()) continue;
    const bankHtml = wordBank({ words: bank.map((k) => ({ word: names[k] })), wordPx: cfg.bankPx });
    const lanes = placed.map((s) => C5.writeLane({ shape: { kind: s.kind, sub: s.sub, aspect: s.aspect, rot: s.rot || 0, flip: !!s.flip, R: s.R }, lensD: cfg.lens, rowW: cfg.rowW, rowH: cfg.rowH, glyphH: cfg.glyphH, rulingBlock }));
    const stamp = { mode: 'write-name', lanes: cfg.lanes, turnedMin: cfg.turnedMin, elongated: cfg.elongated, lens: cfg.lens, floorW: cfg.floorW, floorE: cfg.floorE, bankKinds: bank };
    const inner = `<div data-lcs-stage style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column">${bankHtml}` +
      `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${lanes.join('')}</div></div>`;
    return { bodyHtml: root('write-name', stamp, names, inner), meta: { cfg: stamp, strings, answers: placed.map((s) => s.kind), bank } };
  }
  throw new Error(`${ID} write-name: no page met turned >= ${cfg.turnedMin} and a bank order off the answer order in ${PAGE_TRIES} tries`);
}

/* ---------------------------------------------------------------- F4 riddles (G1) */
/**
 * Landing-panel round 1 (2026-09-23, en/de/es/pt/fr panels): the six-card page repeated two kinds, and every
 * bank's two riddles of one kind state ONE fact (the clue is fixed per kind: round / equal / three / longShort /
 * six), so a repeated kind printed the same fact twice; and a square card never offered `rectangle`, so every
 * riddle was solvable by counting corners. Now: ONE card per kind — the four core kinds + the hexagon (all 11
 * inventories carry it) = FIVE distinct facts, five distinct answers — and the confusable neighbour is ALWAYS an
 * option: a square card offers `rectangle`, a rectangle card offers `square` (the riddles state equal sides vs
 * long / short sides AND the right corners — validator rule 11 — so the neighbour is honestly wrong). The page
 * cannot carry six distinct facts (5 kinds × 1 clue each), so it prints five cards: 2 + 2 + one full-width card.
 */
const RIDDLE_NEIGHBOUR = { square: 'rectangle', rectangle: 'square' };
function f4Cfg(d) {
  const c = { cards: 5, tags: 3, tagW: 132, tagH: 44, tagPx: 18, px: 16, lh: 20, slotMaxShare: 0.6, cols: 2, rows: 3, ...d };
  if (!(c.cards >= 4 && c.cards <= 5) || c.cols * c.rows < c.cards || c.cols * (c.rows - 1) >= c.cards) throw new Error(`${ID} riddles: ${c.cards} cards in a ${c.cols}x${c.rows} grid (4-5 cards: one per kind, never a fact twice)`);
  if (c.tags !== 3) throw new Error(`${ID} riddles: ${c.tags} tags (the shipped face offers 3)`);
  if (!(c.tagH >= TAG_H_G1 && c.px >= 16)) throw new Error(`${ID} riddles: tag ${c.tagH} / text ${c.px} px below the G1 floors ${TAG_H_G1} / 16`);
  return c;
}
/** a card spanning the whole last row (5 cards in a 2-column grid) */
const spanLast = (html, n) => html.split(`<section class="ws-card" data-lcs-card="${n}">`).join(`<section class="ws-card" data-lcs-card="${n}" style="grid-column:1 / -1">`);
function buildRiddles(block, d, loc, rng) {
  const cfg = f4Cfg(d);
  const kindsAll = cfg.cards === 5 ? [...CORE, 'hexagon'] : CORE.slice();
  if (cfg.cards === 5 && !(block.inventory && block.inventory.hexagon)) throw new Error(`${ID} riddles: the ${loc} inventory has no hexagon — five distinct facts need it (refuse)`);
  const names = namesFor(block, kindsAll, loc);
  const strings = faceStrings(block, 'riddles', loc);
  const leak = [...Object.values(names), ...kindsAll.flatMap((k) => (block.inflections && block.inflections[k]) || [])];
  const kinds = rng.shuffle(kindsAll);
  const items = kinds.map((k) => { const i = rng.pick([0, 1]); return { kind: k, i, r: riddle(block, k, i, loc) }; });
  const sets = items.map((it) => {
    const nb = RIDDLE_NEIGHBOUR[it.kind];
    const rest = kindsAll.filter((k) => k !== it.kind && k !== nb);
    return nb ? [it.kind, nb, ...rng.sample(rest, cfg.tags - 2)] : [it.kind, ...rng.sample(rest, cfg.tags - 1)];
  });
  const orders = orderTags(sets, { tags: cfg.tags, slotMaxShare: cfg.slotMaxShare }, rng);
  const allNames = namesFor(block, [...new Set(orders.flat())], loc);
  const cards = items.map((it, ci) => C5.riddleCard({ key: `${it.kind}:${it.i}`, text: it.r.text, tags: orders[ci].map((k) => ({ kind: k, label: allNames[k] })), tagW: cfg.tagW, tagH: cfg.tagH, tagPx: cfg.tagPx, px: cfg.px, lh: cfg.lh }));
  const stamp = { mode: 'riddles', cards: cfg.cards, tags: cfg.tags, tagH: cfg.tagH, tagPx: cfg.tagPx, px: cfg.px, lh: cfg.lh, slotMaxShare: cfg.slotMaxShare, kinds: kindsAll };
  let grid = badgeOnTop(cardGrid({ cards, cols: cfg.cols, rows: cfg.rows, numbered: true }));
  if (cfg.cards < cfg.cols * cfg.rows) grid = spanLast(grid, cfg.cards);
  return { bodyHtml: root('riddles', stamp, names, grid, ` data-lcs-leak="${esc(JSON.stringify(leak))}"`),
    meta: { cfg: stamp, strings, riddles: items.map((it) => `${it.kind}:${it.i}`), slots: orders.map((o, i) => o.indexOf(items[i].kind)) } };
}

/* ---------------------------------------------------------------- F5 dot-draw (K) */
/** completions of a given side v = (dx, dy) on an n-lattice from p: the perpendicular q with |q| = |v| * ratio, both signs. */
function completions(p, v, ratio, n) {
  const qx = -v[1] * ratio, qy = v[0] * ratio;
  if (!Number.isInteger(qx) || !Number.isInteger(qy)) return [];
  const inside = (x, y) => x >= 0 && y >= 0 && x < n && y < n;
  return [[qx, qy], [-qx, -qy]].filter(([a, b]) => inside(p[0] + a, p[1] + b) && inside(p[0] + v[0] + a, p[1] + v[1] + b));
}
function f5Cfg(d) {
  // landing round 1 (2026-09-23, en/de/es/fr/pt panels): the design's SLANTED givens [1,2] / [2,4] asked a K child to
  // build a TILTED square / rectangle (a perpendicular on a lattice: late Klasse 2 Geobrett work). At K every given
  // side is AXIS-ALIGNED (one component 0); a tilted given needs an explicit `tilted: true` face (never K).
  const c = { cards: 4, kinds: ['triangle', 'square', 'square', 'rectangle'], given: [null, null, [3, 0], [0, 4]], pitch: 46, n: 6, pillPx: 22, cols: 2, rows: 2, tilted: false, ...d };
  if (c.cols * c.rows !== c.cards || c.kinds.length !== c.cards || c.given.length !== c.cards) throw new Error(`${ID} dot-draw: ${c.cards} cards / ${c.kinds.length} kinds / ${c.given.length} givens`);
  if (!c.kinds.every((k) => ['triangle', 'square', 'rectangle'].includes(k))) throw new Error(`${ID} dot-draw: kinds ${c.kinds} (a circle is not drawable on dots)`);
  if (!(c.pitch >= 46 && c.n === 6)) throw new Error(`${ID} dot-draw: a ${c.n}-lattice at pitch ${c.pitch} (6 at >= 46)`);
  c.given.forEach((g, i) => {
    if (g && c.kinds[i] === 'triangle') throw new Error(`${ID} dot-draw: card ${i + 1} gives a triangle side (only square / rectangle cards carry one)`);
    if (g && !c.tilted && g[0] !== 0 && g[1] !== 0) throw new Error(`${ID} dot-draw: card ${i + 1} gives a TILTED side ${JSON.stringify(g)} (a K face gives only axis-aligned sides)`);
  });
  return c;
}
function buildDotDraw(block, d, loc, rng) {
  const cfg = f5Cfg(d);
  const names = namesFor(block, [...new Set(cfg.kinds)], loc);
  const strings = faceStrings(block, 'dot-draw', loc);
  const placed = cfg.kinds.map((k, i) => {
    const v = cfg.given[i];
    if (!v) return { kind: k, given: null };
    const starts = [];
    for (let x = 0; x < cfg.n; x++) for (let y = 0; y < cfg.n; y++) {
      const e = [x + v[0], y + v[1]];
      if (e[0] < 0 || e[1] < 0 || e[0] >= cfg.n || e[1] >= cfg.n) continue;
      // a square card must close as a square; a rectangle card must close as a 2 : 1 rectangle and NEVER as a square
      const ok = k === 'square' ? completions([x, y], v, 1, cfg.n).length > 0
        : (completions([x, y], v, 0.5, cfg.n).length + completions([x, y], v, 2, cfg.n).length > 0) && completions([x, y], v, 1, cfg.n).length === 0;
      if (ok) starts.push([x, y]);
    }
    if (!starts.length) throw new Error(`${ID} dot-draw: card ${i + 1}: no start on the ${cfg.n}-lattice lets a ${k} with side ${JSON.stringify(v)} be finished inside it`);
    const p = rng.pick(starts);
    return { kind: k, given: [p[0], p[1], p[0] + v[0], p[1] + v[1]] };
  });
  const cards = placed.map((c) => C5.dotCard({ kind: c.kind, label: names[c.kind], given: c.given, n: cfg.n, pitch: cfg.pitch, pillPx: cfg.pillPx }));
  const stamp = { mode: 'dot-draw', cards: cfg.cards, kinds: cfg.kinds, pitch: cfg.pitch, n: cfg.n, tilted: !!cfg.tilted };
  return { bodyHtml: root('dot-draw', stamp, names, cardGrid({ cards, cols: cfg.cols, rows: cfg.rows, numbered: true })), meta: { cfg: stamp, strings, cards: placed } };
}

const FACES = { 'real-or-not': buildRealOrNot, 'around-us': buildAroundUs, 'write-name': buildWriteName, riddles: buildRiddles, 'dot-draw': buildDotDraw };

/* ---------------------------------------------------------------- the faces' verify() — runs IN the page (no require) */
function faceVerifyInPage({ ID, TEAL, CORAL }) {
  const f = [];
  const root = document.querySelector(`[data-lcs-type="${ID}"]`);
  if (!root) return ['no root'];
  let cfg, names;
  try { cfg = JSON.parse(root.dataset.lcsCfg); names = JSON.parse(root.dataset.lcsNames); } catch (e) { return ['unreadable cfg / names stamp']; }
  const mode = root.getAttribute('data-lcs-mode');
  const R = (e) => e.getBoundingClientRect();
  /* this verify's OWN geometry (never data-lcs-kind / -variant / -sub) */
  const figureOf = (svg) => [...svg.children].find((e) => (e.getAttribute('stroke') || '').toUpperCase() === TEAL);
  const nums = (d) => (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  const shapeOf = (el) => {
    if (!el) return { kind: 'none' };
    if (el.tagName === 'circle') return { kind: 'circle', r: +el.getAttribute('r'), cx: +el.getAttribute('cx'), cy: +el.getAttribute('cy') };
    if (el.tagName === 'ellipse') return { kind: 'ellipse', aspect: +el.getAttribute('rx') / +el.getAttribute('ry') };
    if (el.tagName !== 'path') return { kind: el.tagName };
    const d = el.getAttribute('d') || '';
    const closed = /Z\s*$/.test(d);
    if (!closed) { const n = nums(d); return { kind: 'open', gap: Math.hypot(n[0] - n[n.length - 2], n[1] - n[n.length - 1]) - (+el.getAttribute('stroke-width') || 3) }; }
    if (/Q/.test(d)) { const m = /M([-\d.]+) ([-\d.]+) Q([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)/.exec(d); const a = [+m[1], +m[2]], c = [+m[3], +m[4]], b = [+m[5], +m[6]]; const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], top = [0.25 * a[0] + 0.5 * c[0] + 0.25 * b[0], 0.25 * a[1] + 0.5 * c[1] + 0.25 * b[1]]; return { kind: 'curved', sag: Math.hypot(top[0] - mid[0], top[1] - mid[1]), L: Math.hypot(b[0] - a[0], b[1] - a[1]) }; }
    if (/A/.test(d)) { const arcs = [...d.matchAll(/A([-\d.]+) ([-\d.]+) 0 ([01]) ([01]) ([-\d.]+) ([-\d.]+)/g)]; if (arcs.length === 1) { const n = nums(d); const c = Math.hypot(n[0] - +arcs[0][5], n[1] - +arcs[0][6]); const r = +arcs[0][1]; return { kind: 'chord', cap: r - Math.sqrt(Math.max(0, r * r - c * c / 4)), r, large: +arcs[0][3] }; } return { kind: 'rounded', arcs: arcs.length, rMin: Math.min(...arcs.map((a) => +a[1])) }; }
    const n = nums(d); const P = [];
    for (let i = 0; i + 1 < n.length; i += 2) P.push([n[i], n[i + 1]]);
    const Q = P.filter((v, i) => { const a = P[(i - 1 + P.length) % P.length], b = P[(i + 1) % P.length]; return Math.abs((v[0] - a[0]) * (b[1] - v[1]) - (v[1] - a[1]) * (b[0] - v[0])) > 1e-3 * Math.hypot(v[0] - a[0], v[1] - a[1]) * Math.hypot(b[0] - v[0], b[1] - v[1]); });
    const s = Q.map((p, i) => Math.hypot(Q[(i + 1) % Q.length][0] - p[0], Q[(i + 1) % Q.length][1] - p[1]));
    const ang = Q.map((v, i) => { const a = Q[(i - 1 + Q.length) % Q.length], b = Q[(i + 1) % Q.length]; const u = [a[0] - v[0], a[1] - v[1]], w = [b[0] - v[0], b[1] - v[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))))) * 180 / Math.PI; });
    let kind = 'polygon-' + Q.length;
    if (Q.length === 3) kind = 'triangle';
    else if (Q.length === 4) kind = ang.every((a) => Math.abs(a - 90) <= 1) ? (Math.max(...s) / Math.min(...s) <= 1.01 ? 'square' : 'rectangle') : 'quadrilateral';
    else if (Q.length === 6 && Math.max(...s) / Math.min(...s) <= 1.01) kind = 'hexagon';
    return { kind, P: Q, s, ang };
  };
  const lev = (a, b) => { let t = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; t = ((t % 180) + 180) % 180; return Math.min(t, 180 - t); };
  const turned = (g) => g.P && g.P.every((a, i) => lev(a, g.P[(i + 1) % g.P.length]) >= 15 - 1e-6);
  const skinny = (g) => g.P && ((g.kind === 'triangle' && Math.min(...g.s) / Math.max(...g.s) <= 0.35 + 1e-6) || (g.kind === 'rectangle' && Math.max(...g.s) / Math.min(...g.s) >= 2.2 - 1e-6));
  const caliper = (P) => { let w = Infinity, e = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); let m = 0; for (const p of P) m = Math.max(m, Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / L); w = Math.min(w, m); } for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) e = Math.max(e, Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1])); return { w, e }; };
  const floors = (g, tag) => { const { w, e } = g.kind === 'circle' ? { w: 2 * g.r, e: 2 * g.r } : caliper(g.P); if (w < cfg.floorW - 0.3 || e < cfg.floorE - 0.3) f.push(`${tag}: ${g.kind} min caliper ${w.toFixed(1)} / extent ${e.toFixed(1)} below ${cfg.floorW} / ${cfg.floorE}`); };
  const lensCheck = (svg, lensD, tag) => {
    if (svg.querySelector('text') || svg.textContent.trim()) f.push(`${tag}: text inside the shape svg`);
    const lens = svg.querySelector('circle[data-lcs-lens]');
    if (!lens || (lens.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF' || Math.abs(2 * +lens.getAttribute('r') - lensD) > 0.1) f.push(`${tag}: lens missing / not white / d ≠ ${lensD}`);
    const el = figureOf(svg);
    if (!el) { f.push(`${tag}: no teal figure`); return null; }
    if ((el.getAttribute('fill') || '') !== 'none') f.push(`${tag}: the figure is filled`);
    return shapeOf(el);
  };
  const tagChecks = (tags, h, px, tag) => { for (const t of tags) { const r = R(t); if (r.height < h - 0.5) f.push(`${tag}: tag "${t.textContent}" ${r.height.toFixed(1)} px high < ${h}`); if (parseFloat(getComputedStyle(t).fontSize) < px - 0.01) f.push(`${tag}: tag text < ${px} px`); if (t.scrollWidth > t.clientWidth + 0.5) f.push(`${tag}: tag "${t.textContent}" overflows its pill`); if (t.textContent !== names[t.dataset.lcsTag]) f.push(`${tag}: tag ${t.dataset.lcsTag} prints "${t.textContent}" ≠ the stamped literal "${names[t.dataset.lcsTag]}"`); } };

  if (mode === 'real-or-not') {
    const lanes = [...root.querySelectorAll('[data-lcs-row]')];
    if (lanes.length !== cfg.rows.length) f.push(`${lanes.length} rows ≠ ${cfg.rows.length}`);
    let nTurned = 0, nSkinny = 0, total = 0;
    const col = Array(cfg.perRow).fill(0);
    lanes.forEach((lane, li) => {
      const target = lane.getAttribute('data-lcs-target');
      const pill = lane.querySelector('[data-lcs-given]');
      if (!pill || pill.textContent !== names[target]) f.push(`row ${li + 1}: the name pill reads "${pill && pill.textContent}" ≠ "${names[target]}"`);
      if (lane.querySelector('[data-lcs-tag]')) f.push(`row ${li + 1}: a circle-able tag in a real-or-not row`);
      const svgs = [...lane.querySelectorAll('svg')];
      if (svgs.length !== cfg.perRow) f.push(`row ${li + 1}: ${svgs.length} figures ≠ ${cfg.perRow}`);
      let hits = 0;
      svgs.forEach((svg, i) => {
        const tag = `row ${li + 1} figure ${i + 1}`;
        const g = lensCheck(svg, cfg.lens, tag);
        if (!g) return;
        if (target === 'rectangle' && g.kind === 'square') f.push(`${tag}: a square in the rectangle row`);
        if (g.kind === target) {
          hits++; total++; col[i]++;
          floors(g, tag);
          if (g.P && turned(g)) nTurned++;
          if (skinny(g)) nSkinny++;
        } else {
          // every near-miss must be MEASURABLY not the shape
          if (g.kind === 'open' && !(g.gap >= 10)) f.push(`${tag}: visible gap ${g.gap.toFixed(1)} px < 10`);
          if (g.kind === 'curved' && !(g.sag >= 0.15 * g.L)) f.push(`${tag}: sagitta ${g.sag.toFixed(1)} < 15 % of ${g.L.toFixed(1)}`);
          if (g.kind === 'ellipse' && !(g.aspect >= 1.4 - 1e-3)) f.push(`${tag}: ellipse aspect ${g.aspect.toFixed(2)} < 1.4`);
          if (g.kind === 'chord' && !(g.large === 1 && g.cap >= 0.2 * g.r)) f.push(`${tag}: the chord cap ${g.cap.toFixed(1)} < 0.2 r`);
          if (g.kind === 'rounded' && !(g.rMin >= 6)) f.push(`${tag}: fillet radius ${g.rMin} px is not visible`);
          if (g.kind === 'quadrilateral' && !(Math.max(...g.ang.map((a) => Math.abs(a - 90))) >= 10)) f.push(`${tag}: a quadrilateral within 10° of right corners`);
          if (!['open', 'curved', 'ellipse', 'chord', 'rounded', 'quadrilateral', 'rectangle', 'triangle', 'square', 'circle'].includes(g.kind)) f.push(`${tag}: the drawn figure classifies as "${g.kind}"`);
        }
      });
      if (hits < cfg.trueMin || hits > cfg.trueMax) f.push(`row ${li + 1} (${target}): ${hits} true figures outside ${cfg.trueMin}..${cfg.trueMax}`);
    });
    if (nTurned < cfg.turnedMin) f.push(`${nTurned} turned true figures < ${cfg.turnedMin}`);
    if (nSkinny < cfg.skinnyMin) f.push(`${nSkinny} skinny true figures < ${cfg.skinnyMin}`);
    const cap = Math.min(Math.ceil(total * cfg.colMaxShare), lanes.length >= 3 ? lanes.length - 1 : lanes.length);
    if (col.filter((x) => x > 0).length < Math.min(3, total) || Math.max(...col) > cap) f.push(`column spread: the true figures sit in columns ${JSON.stringify(col)} (a column over ${cap}, or < 3 columns used)`);
  } else if (mode === 'around-us') {
    const cards = [...root.querySelectorAll('[data-lcs-card]')];
    if (cards.length !== cfg.items) f.push(`${cards.length} cards ≠ ${cfg.items}`);
    const ans = [], objs = [];
    cards.forEach((card, ci) => {
      const tag = `card ${ci + 1}`;
      const st = card.querySelector('[data-lcs-obj]');
      if (!st) { f.push(`${tag}: no object`); return; }
      const obj = st.getAttribute('data-lcs-obj'), a = st.getAttribute('data-lcs-answer');
      ans.push(a); objs.push(obj);
      const img = st.querySelector('img');
      if (!img || !img.complete || !img.naturalWidth) f.push(`${tag}: the picture did not load`);
      else if (!decodeURIComponent(img.src).endsWith('/' + obj + '@3x.webp')) f.push(`${tag}: src !== fileUri(bank entry ${obj}) (${decodeURIComponent(img.src).split('/').slice(-2).join('/')})`);
      if (img && (R(img).width < cfg.pic - 0.5 || R(img).height < cfg.pic - 0.5)) f.push(`${tag}: picture ${R(img).width.toFixed(0)} px < ${cfg.pic}`);
      const tiles = [...st.querySelectorAll('[data-lcs-tile]')];
      if (tiles.map((t) => t.dataset.lcsTile).join() !== 'circle,rectangle') f.push(`${tag}: tiles ${tiles.map((t) => t.dataset.lcsTile)} ≠ circle, rectangle (fixed order)`);
      for (const t of tiles) {
        const txt = t.querySelector('[data-lcs-tile-text]');
        if (R(t).height < cfg.tile[1] - 0.5) f.push(`${tag}: tile ${R(t).height.toFixed(1)} px < ${cfg.tile[1]}`);
        if (!txt || txt.textContent !== names[t.dataset.lcsTile]) f.push(`${tag}: tile ${t.dataset.lcsTile} prints "${txt && txt.textContent}" ≠ "${names[t.dataset.lcsTile]}"`);
        if (txt && R(txt).right > R(t).right - 8 + 0.5) f.push(`${tag}: tile text "${txt.textContent}" overflows its tile`);
        const g = t.querySelector('svg');
        if (!g || (figureOf(g) && figureOf(g).getAttribute('fill') !== 'none')) f.push(`${tag}: tile glyph missing / filled`);
      }
    });
    if (new Set(objs).size !== objs.length) f.push('an object appears twice');
    for (const s of ['circle', 'rectangle']) if (ans.filter((x) => x === s).length !== cfg.split[s]) f.push(`${ans.filter((x) => x === s).length} ${s} objects ≠ split ${cfg.split[s]}`);
    for (let c = 0; c < cfg.cols; c++) { const colA = ans.filter((_, i) => i % cfg.cols === c); if (!colA.includes('circle') || !colA.includes('rectangle')) f.push(`column spread: grid column ${c + 1} holds only ${colA[0]}`); }
    let run = 1, maxRun = 1; for (let i = 1; i < ans.length; i++) { run = ans[i] === ans[i - 1] ? run + 1 : 1; maxRun = Math.max(maxRun, run); }
    if (maxRun > cfg.runMax) f.push(`column spread: ${maxRun} same answers in a row (> ${cfg.runMax})`);
  } else if (mode === 'write-name') {
    const bankWords = [...root.querySelectorAll('[data-lcs-bank-word]')].map((b) => b.getAttribute('data-lcs-bank-word'));
    const coreNames = ['circle', 'square', 'triangle', 'rectangle'].map((k) => names[k]);
    if (bankWords.length !== 4 || coreNames.some((w) => !bankWords.includes(w))) f.push(`the word bank ${JSON.stringify(bankWords)} is not the 4 core names`);
    if (names.hexagon && bankWords.includes(names.hexagon)) f.push('a hexagon in the bank');
    const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
    if (lanes.length !== cfg.lanes) f.push(`${lanes.length} lanes ≠ ${cfg.lanes}`);
    const ans = []; let nTurned = 0;
    lanes.forEach((lane, li) => {
      const tag = `lane ${li + 1}`;
      const svg = lane.querySelector('svg[data-lcs-prim="flat-shape"]');
      if (!svg) { f.push(`${tag}: no figure`); return; }
      const g = lensCheck(svg, cfg.lens, tag);
      if (!g) return;
      if (!['circle', 'square', 'triangle', 'rectangle'].includes(g.kind)) { f.push(`${tag}: the drawn figure classifies as "${g.kind}"`); return; }
      ans.push(g.kind);
      floors(g, tag);
      if (g.P && turned(g)) nTurned++;
      if (!bankWords.includes(names[g.kind])) f.push(`${tag}: the answer "${names[g.kind]}" is not in the bank`);
      if (lane.textContent.trim()) f.push(`${tag}: text printed in the lane ("${lane.textContent.trim().slice(0, 20)}")`);
      const rows = lane.querySelectorAll('[data-lcs-ruling-row]');
      if (rows.length !== 1) f.push(`${tag}: ${rows.length} ruling rows ≠ 1`);
      for (const r of rows) if (r.querySelector('text, [data-lcs-starter]') || r.textContent.trim()) f.push(`${tag}: ruling row not empty (a starter)`);
      const rr = rows[0] && R(rows[0]);
      if (rr && rr.height < 60) f.push(`${tag}: writing row ${rr.height.toFixed(0)} px < 60`);
    });
    if (nTurned < cfg.turnedMin) f.push(`${nTurned} turned figures < ${cfg.turnedMin}`);
    for (const k of ['circle', 'square', 'triangle', 'rectangle']) { const n = ans.filter((x) => x === k).length; if (!n) f.push(`no ${k} drawn`); if (n > 2) f.push(`${k} drawn ${n} times`); }
    const first = []; for (const k of ans) if (!first.includes(k)) first.push(k);
    const bankKinds = bankWords.map((w) => Object.keys(names).find((k) => names[k] === w));
    if (bankKinds.join() === first.join()) f.push('answer tell: the bank lists the names in the order the shapes first appear');
  } else if (mode === 'riddles') {
    let leak = [];
    try { leak = JSON.parse(root.dataset.lcsLeak || '[]'); } catch (e) { f.push('unreadable leak stamp'); }
    const cards = [...root.querySelectorAll('[data-lcs-card]')];
    if (cards.length !== cfg.cards) f.push(`${cards.length} cards ≠ ${cfg.cards}`);
    const slots = [], kinds = [];
    const fold = (s) => String(s).normalize('NFC').toLowerCase();
    cards.forEach((card, ci) => {
      const tag = `card ${ci + 1}`;
      const st = card.querySelector('[data-lcs-riddle]');
      if (!st) { f.push(`${tag}: no riddle`); return; }
      const k = st.getAttribute('data-lcs-riddle').split(':')[0];
      kinds.push(k);
      const p = st.querySelector('[data-lcs-riddle-text]');
      const text = p ? p.textContent : '';
      for (const w of leak) if (new RegExp('(?<!\\p{L})' + fold(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u').test(fold(text))) f.push(`${tag}: the riddle contains the name / inflection "${w}"`);
      if (p) { const lines = Math.round(R(p).height / cfg.lh); if (lines > 3) f.push(`${tag}: bubble ${lines} lines > 3`); if (parseFloat(getComputedStyle(p).fontSize) < cfg.px - 0.01) f.push(`${tag}: riddle text < ${cfg.px} px`); }
      const b = st.querySelector('[data-lcs-bubble]');
      if (b && b.scrollHeight > b.clientHeight + 0.5) f.push(`${tag}: the bubble text overflows`);
      const tags = [...st.querySelectorAll('[data-lcs-tag]')];
      if (tags.length !== cfg.tags) f.push(`${tag}: ${tags.length} tags ≠ ${cfg.tags}`);
      const tk = tags.map((t) => t.dataset.lcsTag);
      const hits = tk.filter((x) => x === k).length;
      if (hits !== 1) f.push(`${tag}: ${hits} tags name the answer ${k}`);
      // the confusable neighbour is ALWAYS an option (landing round 1): square <-> rectangle
      if (k === 'square' && !tk.includes('rectangle')) f.push(`${tag}: neighbour — a square riddle does not offer rectangle`);
      if (k === 'rectangle' && !tk.includes('square')) f.push(`${tag}: neighbour — a rectangle riddle does not offer square`);
      if (new Set(tk).size !== tk.length) f.push(`${tag}: a tag repeats`);
      slots.push(tk.indexOf(k));
      tagChecks(tags, cfg.tagH, cfg.tagPx, tag);
      const cr = R(card);
      for (const t of tags) { const r = R(t); if (r.left < cr.left - 0.5 || r.right > cr.right + 0.5 || r.bottom > cr.bottom + 0.5) f.push(`${tag}: tag "${t.textContent}" leaves its card`); }
    });
    for (const k of ['circle', 'square', 'triangle', 'rectangle']) if (!kinds.includes(k)) f.push(`no ${k} riddle`);
    // one fact per page: a kind's two riddles state ONE fact, so no kind twice; >= 4 distinct answers
    for (const k of new Set(kinds)) if (kinds.filter((x) => x === k).length > 1) f.push(`fact twice — ${kinds.filter((x) => x === k).length} ${k} riddles on one page`);
    if (new Set(kinds).size < Math.min(4, kinds.length)) f.push(`balance — ${new Set(kinds).size} distinct answers on ${kinds.length} cards (< 4)`);
    const counts = {}; for (const s of slots) counts[s] = (counts[s] || 0) + 1;
    if (Object.keys(counts).length < Math.min(cfg.tags, slots.length)) f.push(`slot spread: answers use only slots ${Object.keys(counts).map((x) => +x + 1).join(',')} of ${cfg.tags}`);
    if (Math.max(...Object.values(counts)) > Math.floor(cfg.slotMaxShare * slots.length + 1e-9)) f.push(`slot spread: ${JSON.stringify(counts)} — one slot holds > ${cfg.slotMaxShare * 100} %`);
  } else if (mode === 'dot-draw') {
    const cards = [...root.querySelectorAll('[data-lcs-card]')];
    if (cards.length !== cfg.cards) f.push(`${cards.length} cards ≠ ${cfg.cards}`);
    cards.forEach((card, ci) => {
      const tag = `card ${ci + 1}`;
      const st = card.querySelector('[data-lcs-dotcard]');
      if (!st) { f.push(`${tag}: no dot card`); return; }
      const k = st.getAttribute('data-lcs-dotcard');
      const pill = st.querySelector('[data-lcs-given]');
      if (!pill || pill.textContent !== names[k]) f.push(`${tag}: the name pill reads "${pill && pill.textContent}" ≠ "${names[k]}"`);
      if (k === 'circle') f.push(`${tag}: a circle to draw on dots`);
      const svg = st.querySelector('svg');
      if (!svg) { f.push(`${tag}: no lattice`); return; }
      if (svg.querySelector('text') || svg.textContent.trim()) f.push(`${tag}: text inside the lattice`);
      const dots = [...svg.querySelectorAll('circle')].filter((c) => (c.getAttribute('fill') || '').toUpperCase() === TEAL);
      const xs = [...new Set(dots.map((c) => +c.getAttribute('cx')))].sort((a, b) => a - b), ys = [...new Set(dots.map((c) => +c.getAttribute('cy')))].sort((a, b) => a - b);
      const n = xs.length;
      if (n !== ys.length || dots.length !== n * n || n < 5) { f.push(`${tag}: the lattice is not a square grid of dots (${xs.length} × ${ys.length}, ${dots.length} dots)`); return; }
      const pitch = xs[1] - xs[0];
      if (xs.some((x, i) => i && Math.abs(x - xs[i - 1] - pitch) > 0.05) || ys.some((y, i) => i && Math.abs(y - ys[i - 1] - pitch) > 0.05)) f.push(`${tag}: uneven lattice pitch`);
      const ctm = svg.getScreenCTM();
      if (ctm && pitch * ctm.a < cfg.pitch - 0.5) f.push(`${tag}: drawn pitch ${(pitch * ctm.a).toFixed(1)} px < ${cfg.pitch}`);
      const line = [...svg.querySelectorAll('line')].find((l) => (l.getAttribute('stroke') || '').toUpperCase() === CORAL);
      const idx = (v, arr) => { const i = arr.findIndex((a) => Math.abs(a - v) < 0.05); return i; };
      if (!line) { if (k === 'rectangle') f.push(`${tag}: the rectangle card has no given side`); return; }
      const p0 = [idx(+line.getAttribute('x1'), xs), idx(+line.getAttribute('y1'), ys)], p1 = [idx(+line.getAttribute('x2'), xs), idx(+line.getAttribute('y2'), ys)];
      if ([...p0, ...p1].some((i) => i < 0)) { f.push(`${tag}: the given side does not join two lattice points`); return; }
      if (k === 'triangle') f.push(`${tag}: a triangle card carries a given side`);
      const v = [p1[0] - p0[0], p1[1] - p0[1]];
      if (!cfg.tilted && v[0] !== 0 && v[1] !== 0) f.push(`${tag}: tilted given — the given side ${JSON.stringify(v)} is not axis-aligned (K)`);
      const inside = (x, y) => x >= 0 && y >= 0 && x < n && y < n;
      const fits = (ratio) => { const qx = -v[1] * ratio, qy = v[0] * ratio; if (!Number.isInteger(qx) || !Number.isInteger(qy)) return false; return [[qx, qy], [-qx, -qy]].some(([a, b]) => inside(p0[0] + a, p0[1] + b) && inside(p1[0] + a, p1[1] + b)); };
      if (k === 'square' && !fits(1)) f.push(`${tag}: no square completion of the given side fits the lattice`);
      if (k === 'rectangle') { if (fits(1)) f.push(`${tag}: square completion exists on the rectangle card`); if (!fits(0.5) && !fits(2)) f.push(`${tag}: no rectangle completion of the given side fits the lattice`); }
    });
  } else f.push(`unknown mode ${mode}`);
  return f;
}
const FACE_VERIFY = Object.fromEntries(FACE_MODES.map((m) => [m, (page) => page.evaluate(faceVerifyInPage, { ID, TEAL: tokens.color.teal.toUpperCase(), CORAL: tokens.color.coral.toUpperCase() })]));

module.exports = {
  id: ID,
  slug: KEY,
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, lens: 188, R: [52, 82], small: [52, 56], big: [74, 82], tags: 2, tagPx: 20, tagW: 140, tagH: 48, layout: 'column',
      turnedMin: 1, turnedSquare: 0, skinnyMin: 0, sizeSpread: 1.3, hexagon: false, floorW: K_FLOOR_W, floorE: K_FLOOR_E, slotMaxShare: 0.6 },
    2: { cards: 6, cols: 2, rows: 3, lens: 156, R: [44, 69], small: [44, 48], big: [66, 69], tags: 3, tagPx: 18, tagW: 132, tagH: 48, layout: 'row',
      turnedMin: 3, turnedSquare: 1, skinnyMin: 1, sizeSpread: 1.375, hexagon: false, floorW: K_FLOOR_W, floorE: K_FLOOR_E, slotMaxShare: 0.6 },
    3: { cards: 6, cols: 2, rows: 3, lens: 156, R: [44, 69], small: [44, 48], big: [66, 69], tags: 3, tagPx: 18, tagW: 132, tagH: 48, layout: 'row',
      turnedMin: 4, turnedSquare: 1, skinnyMin: 2, sizeSpread: 1.375, hexagon: 'inventory', floorW: K_FLOOR_W, floorE: K_FLOOR_E, slotMaxShare: 0.6 },
  },
  i18n: {
    en: {
      title: '2D Shapes',
      instruction: 'Look at each shape, even the turned and skinny ones, and circle its name.',
    },
  },
  FACE_MODES,
  CORE,
  shapeName, stringsFor, riddle,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.mode !== undefined) {
      if (!FACE_MODES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}"`);
      return FACES[d.mode](block, d, loc, ctx.rng);
    }
    stringsFor(block, 'base', loc);   // a block without its base strings is not shippable
    // resolve the config (guards key on these keys, never on the level index)
    const cfg = { ...d, hexagon: d.hexagon === 'inventory' ? !!(block.inventory && block.inventory.hexagon) : !!d.hexagon };
    if (![4, 6].includes(cfg.cards) || cfg.cols * cfg.rows !== cfg.cards) throw new Error(`${ID}: cards ${cfg.cards} in a ${cfg.cols}x${cfg.rows} grid`);
    if (![2, 3].includes(cfg.tags)) throw new Error(`${ID}: tags ${cfg.tags} (2 or 3)`);
    if (!(cfg.tagH >= TAG_H_K)) throw new Error(`${ID}: tag height ${cfg.tagH} < the K ring target ${TAG_H_K}`);
    if (!(cfg.tagPx >= 18)) throw new Error(`${ID}: tag text ${cfg.tagPx} px < 18`);
    if (!(cfg.R[1] + 1.5 <= cfg.lens / 2 - LENS_CLEAR + 1e-9)) throw new Error(`${ID}: R max ${cfg.R[1]} leaves < ${LENS_CLEAR} px inside a ${cfg.lens} px lens`);
    if (!(cfg.small[1] / 1 >= cfg.R[0] && cfg.big[0] <= cfg.R[1] && cfg.big[0] / cfg.small[1] >= cfg.sizeSpread - 1e-9)) throw new Error(`${ID}: small ${cfg.small} / big ${cfg.big} cannot meet sizeSpread ${cfg.sizeSpread}`);
    if (cfg.cards === 6 && cfg.turnedMin < 3) throw new Error(`${ID}: the 6-card recipe always turns 3 (B, C, D) — turnedMin ${cfg.turnedMin} lies about the page`);
    if (cfg.cards === 6 && cfg.turnedMin > (cfg.hexagon ? 4 : 5)) throw new Error(`${ID}: turnedMin ${cfg.turnedMin} unreachable`);
    if (cfg.cards === 4 && !(cfg.turnedMin >= 1 && cfg.turnedMin <= 3)) throw new Error(`${ID}: d1 turnedMin ${cfg.turnedMin} outside 1..3`);
    if (cfg.cards === 6 && cfg.skinnyMin > 2) throw new Error(`${ID}: the recipe yields 2 skinny figures (C, D) — skinnyMin ${cfg.skinnyMin} unreachable`);
    if (cfg.hexagon && !(block.inventory && block.inventory.hexagon)) throw new Error(`${ID}: hexagon asked for but the ${loc} inventory has none — refuse`);
    const rng = ctx.rng;
    const slots = composeSlots(cfg, rng);
    const order = rng.shuffle(slots.map((s, i) => i));
    const placed = order.map((i) => slots[i]);
    const sets = tagSets(placed, cfg, rng);
    const orders = orderTags(sets, cfg, rng);
    const kindsOnPage = [...new Set(orders.flat())];
    const names = {};
    for (const k of kindsOnPage) names[k] = shapeName(block, k, loc);
    const cards = [];
    const meta = [];
    placed.forEach((s, i) => {
      const card = C5.nameCard({
        shape: { kind: s.kind, sub: s.sub, aspect: s.aspect, rot: s.rot || 0, flip: !!s.flip, R: s.R },
        tags: orders[i].map((k) => ({ kind: k, label: names[k] })),
        lensD: cfg.lens, layout: cfg.layout, tagW: cfg.tagW, tagH: cfg.tagH, tagPx: cfg.tagPx,
      });
      cards.push(card.html);
      meta.push({ kind: s.kind, sub: s.sub || null, aspect: s.aspect || null, rot: s.rot || 0, R: s.R, tags: orders[i], slot: orders[i].indexOf(s.kind) });
    });
    const stamp = { cards: cfg.cards, tags: cfg.tags, lens: cfg.lens, tagH: cfg.tagH, tagPx: cfg.tagPx, turnedMin: cfg.turnedMin, turnedSquare: cfg.turnedSquare,
      skinnyMin: cfg.skinnyMin, sizeSpread: cfg.sizeSpread, hexagon: cfg.hexagon, floorW: cfg.floorW, floorE: cfg.floorE, slotMaxShare: cfg.slotMaxShare, lensClear: LENS_CLEAR };
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-cfg="${esc(JSON.stringify(stamp))}" data-lcs-names="${esc(JSON.stringify(names))}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${cardGrid({ cards, cols: cfg.cols, rows: cfg.rows, numbered: true })}</div>`;
    return { bodyHtml, meta: { cards: meta, cfg: stamp } };
  },

  async verify(page) {
    const mode = await page.evaluate((ID) => { const r = document.querySelector(`[data-lcs-type="${ID}"]`); return r ? r.getAttribute('data-lcs-mode') || '' : ''; }, ID);
    if (mode) return FACE_VERIFY[mode] ? FACE_VERIFY[mode](page) : [`unknown face mode "${mode}"`];
    return page.evaluate(({ ID, TEAL }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg, names;
      try { cfg = JSON.parse(root.dataset.lcsCfg); names = JSON.parse(root.dataset.lcsNames); } catch (e) { return ['unreadable cfg / names stamp']; }
      if (document.querySelector('.ws-page img')) f.push('an <img> on the base page');
      /* ---- this verify's OWN geometry: parse the drawn path, never a stamp */
      const figureOf = (svg) => [...svg.children].find((e) => (e.getAttribute('stroke') || '').toUpperCase() === TEAL);
      const polygonOf = (el) => {
        if (el.tagName === 'circle') return { circle: true, r: +el.getAttribute('r'), cx: +el.getAttribute('cx'), cy: +el.getAttribute('cy') };
        if (el.tagName !== 'path') return null;
        const d = el.getAttribute('d') || '';
        if (/[^MLZ\d\s.,-]/.test(d) || !/Z\s*$/.test(d)) return { open: true };
        const nums = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
        const P = [];
        for (let i = 0; i + 1 < nums.length; i += 2) P.push([nums[i], nums[i + 1]]);
        // drop a closing duplicate + merge collinear runs
        if (P.length > 1 && Math.hypot(P[0][0] - P[P.length - 1][0], P[0][1] - P[P.length - 1][1]) < 1e-6) P.pop();
        const Q = P.filter((v, i) => { const a = P[(i - 1 + P.length) % P.length], b = P[(i + 1) % P.length]; return Math.abs((v[0] - a[0]) * (b[1] - v[1]) - (v[1] - a[1]) * (b[0] - v[0])) > 1e-3 * Math.hypot(v[0] - a[0], v[1] - a[1]) * Math.hypot(b[0] - v[0], b[1] - v[1]); });
        return { P: Q };
      };
      const sidesOf = (P) => P.map((p, i) => Math.hypot(P[(i + 1) % P.length][0] - p[0], P[(i + 1) % P.length][1] - p[1]));
      const angleAt = (p, v, q) => { const a = [p[0] - v[0], p[1] - v[1]], b = [q[0] - v[0], q[1] - v[1]]; return Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180 / Math.PI; };
      const classify = (g) => {
        if (!g) return 'unknown';
        if (g.circle) return 'circle';
        if (g.open) return 'open';
        const P = g.P, n = P.length, s = sidesOf(P);
        if (n === 3) return 'triangle';
        if (n === 4) {
          const ang = P.map((v, i) => angleAt(P[(i - 1 + n) % n], v, P[(i + 1) % n]));
          if (!ang.every((a) => Math.abs(a - 90) <= 1)) return 'quadrilateral';
          return Math.max(...s) / Math.min(...s) <= 1.01 ? 'square' : 'rectangle';
        }
        if (n === 6) return Math.max(...s) / Math.min(...s) <= 1.01 ? 'hexagon' : 'hexagon-irregular';
        return 'polygon-' + n;
      };
      const levelOff = (a, b) => { let t = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; t = ((t % 180) + 180) % 180; return Math.min(t, 180 - t); };
      const caliper = (P) => { let w = Infinity, e = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); let m = 0; for (const p of P) m = Math.max(m, Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / L); w = Math.min(w, m); } for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) e = Math.max(e, Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1])); return { w, e }; };
      const cards = [...root.querySelectorAll('[data-lcs-card]')];
      if (cards.length !== cfg.cards) f.push(`${cards.length} cards ≠ ${cfg.cards}`);
      let turned = 0, turnedSq = 0, skinny = 0;
      const Rs = [], answers = [], slots = [];
      cards.forEach((card, ci) => {
        const tag = `card ${ci + 1}`;
        const svgs = card.querySelectorAll('svg');
        const svg = card.querySelector('svg[data-lcs-prim="flat-shape"]');
        if (!svg || svgs.length !== 1) { f.push(`${tag}: ${svgs.length} svgs (want exactly one flat-shape)`); return; }
        if (svg.querySelector('text') || svg.textContent.trim()) f.push(`${tag}: text inside the shape svg`);
        const el = figureOf(svg);
        if (!el) { f.push(`${tag}: no teal figure`); return; }
        if ((el.getAttribute('fill') || '') !== 'none') f.push(`${tag}: the figure is filled`);
        const g = polygonOf(el);
        const kind = classify(g);
        if (!['circle', 'square', 'rectangle', 'triangle', 'hexagon'].includes(kind)) { f.push(`${tag}: the drawn figure classifies as "${kind}"`); return; }
        answers.push(kind);
        const box = +svg.getAttribute('width');
        const c = [box / 2, box / 2];
        const lensEl = svg.querySelector('circle[data-lcs-lens]');
        const lensR = lensEl ? +lensEl.getAttribute('r') : 0;
        if (!lensEl || (lensEl.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF' || Math.abs(2 * lensR - cfg.lens) > 0.1) f.push(`${tag}: lens missing / not white / d ≠ ${cfg.lens}`);
        let R, w, e;
        if (kind === 'circle') { R = g.r; w = e = 2 * g.r; if (Math.hypot(g.cx - c[0], g.cy - c[1]) > 0.1) f.push(`${tag}: the circle is off the lens centre`); }
        else {
          R = Math.max(...g.P.map((p) => Math.hypot(p[0] - c[0], p[1] - c[1])));
          ({ w, e } = caliper(g.P));
          const s = sidesOf(g.P);
          if (g.P.every((a, i) => levelOff(a, g.P[(i + 1) % g.P.length]) >= 15 - 1e-6)) turned++;
          if (kind === 'square' && Math.abs(levelOff(g.P[0], g.P[1]) - 45) <= 1) turnedSq++;
          if ((kind === 'triangle' && Math.min(...s) / Math.max(...s) <= 0.35 + 1e-6) || (kind === 'rectangle' && Math.max(...s) / Math.min(...s) >= 2.2 - 1e-6)) skinny++;
        }
        Rs.push(R);
        if (w < cfg.floorW - 0.3 || e < cfg.floorE - 0.3) f.push(`${tag}: ${kind} min caliper ${w.toFixed(1)} / extent ${e.toFixed(1)} below the K floor ${cfg.floorW} / ${cfg.floorE}`);
        if (R + 1.5 > lensR - cfg.lensClear + 0.05) f.push(`${tag}: the ${kind} (R ${R.toFixed(1)}) leaves < ${cfg.lensClear} px inside the lens`);
        // tags
        const tags = [...card.querySelectorAll('[data-lcs-tag]')];
        if (tags.length !== cfg.tags) f.push(`${tag}: ${tags.length} tags ≠ ${cfg.tags}`);
        const kinds = tags.map((t) => t.dataset.lcsTag);
        if (new Set(kinds).size !== kinds.length) f.push(`${tag}: a tag repeats`);
        const hits = kinds.filter((k) => k === kind).length;
        if (hits !== 1) f.push(`${tag}: ${hits} tags name the drawn ${kind} (want exactly 1)`);
        slots.push(kinds.indexOf(kind));
        if (kind === 'square' && kinds.includes('rectangle')) f.push(`${tag}: a square card carries a rectangle tag`);
        for (const t of tags) {
          const r = t.getBoundingClientRect(), txt = t.querySelector('[data-lcs-tag-text]');
          const cs = getComputedStyle(t);
          if (r.height < cfg.tagH - 0.5 || r.height < 48 - 0.5) f.push(`${tag}: tag "${t.textContent}" ${r.height.toFixed(1)} px high < ${cfg.tagH}`);
          if (parseFloat(cs.fontSize) < cfg.tagPx - 0.01) f.push(`${tag}: tag text ${cs.fontSize} < ${cfg.tagPx} px`);
          if (t.scrollWidth > t.clientWidth + 0.5 || (txt && txt.getBoundingClientRect().width > t.clientWidth - 16 + 0.5)) f.push(`${tag}: tag "${t.textContent}" overflows its ${t.clientWidth} px pill`);
          if (t.textContent !== names[t.dataset.lcsTag]) f.push(`${tag}: tag ${t.dataset.lcsTag} prints "${t.textContent}" ≠ the stamped literal "${names[t.dataset.lcsTag]}"`);
          const cr = card.getBoundingClientRect();
          if (r.left < cr.left - 0.5 || r.right > cr.right + 0.5 || r.top < cr.top - 0.5 || r.bottom > cr.bottom + 0.5) f.push(`${tag}: tag "${t.textContent}" leaves its card`);
        }
        const sr = svg.getBoundingClientRect(), cr = card.getBoundingClientRect();
        if (sr.left < cr.left - 0.5 || sr.right > cr.right + 0.5 || sr.top < cr.top - 0.5 || sr.bottom > cr.bottom + 0.5) f.push(`${tag}: the lens leaves its card`);
      });
      if (!answers.length) return f.concat('no measurable card');
      if (turned < cfg.turnedMin) f.push(`${turned} turned figures (no side within 15° of level) < turnedMin ${cfg.turnedMin}`);
      if (turnedSq < cfg.turnedSquare) f.push(`${turnedSq} squares at 45° < turnedSquare ${cfg.turnedSquare}`);
      if (skinny < cfg.skinnyMin) f.push(`${skinny} skinny figures < skinnyMin ${cfg.skinnyMin}`);
      if (Math.max(...Rs) / Math.min(...Rs) < cfg.sizeSpread - 1e-3) f.push(`size spread ${(Math.max(...Rs) / Math.min(...Rs)).toFixed(3)} < ${cfg.sizeSpread}`);
      for (const k of ['circle', 'square', 'triangle', 'rectangle']) if (!answers.includes(k)) f.push(`no ${k} drawn — every core name must be an answer`);
      if (cfg.hexagon && !answers.includes('hexagon')) f.push('hexagon configured but not drawn');
      if (!cfg.hexagon && answers.includes('hexagon')) f.push('a hexagon drawn without the hexagon config');
      for (const k of new Set(answers)) if (answers.filter((x) => x === k).length > 2) f.push(`${k} drawn ${answers.filter((x) => x === k).length} times (max 2)`);
      const counts = {}; for (const s of slots) counts[s] = (counts[s] || 0) + 1;
      if (Object.keys(counts).length < Math.min(cfg.tags, slots.length)) f.push(`slot spread: answers use only slots ${Object.keys(counts).map((x) => +x + 1).join(',')} of ${cfg.tags}`);
      if (Math.max(...Object.values(counts)) > Math.floor(cfg.slotMaxShare * slots.length + 1e-9)) f.push(`slot spread: ${JSON.stringify(counts)} — one slot holds > ${cfg.slotMaxShare * 100} % of the answers`);
      return f;
    }, { ID, TEAL: tokens.color.teal.toUpperCase() });
  },
};
