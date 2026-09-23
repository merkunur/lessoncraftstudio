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
      throw new Error(`${ID}: mode "${d.mode}" is a face (Phase E) — the base composer refuses a face config rather than read it`);
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
