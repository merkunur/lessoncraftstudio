/**
 * components-b5/animal-life-cycles.js — the G1-377 `animal-life-cycles` components (design
 * docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §2 "NEW templates/components-b5/…").
 * BASE build: lens, hostPlant, lifePlate, loopRow. The face components (pondRing, cutStrip,
 * labelLoop, youngStrip, adultBin, compareTable, nextRow) land with the faces (Phase E).
 *
 *   lens({animal, stage, d, letter, attrs, spawnForm})
 *       <span data-lcs-lens data-lcs-stage="<animal>.<stage>"> wrapping lifeStage({size: d});
 *       `letter` adds a coral r 14 disc at the lens's 10:30 position (white Baloo 2 700 18
 *       letter, data-lcs-card="<A..>") — the F3 badge; the base passes none.
 *   hostPlant({w = 639, h = 528}) -> {svg, leaves:{UL,UR,LL,LR:{base, tip, spotAt, underAt, dir}}, flower:{x,y}}
 *       SCENERY only (teal 2 px, never 3; no roots, no soil, no part mark): ground line + 4 grass
 *       blades, the stem, four almond leaves (leafPath: control points at 30 % and 75 % of the
 *       base-tip axis, half-widths 26 and 23.4) with midribs, a six-petal flower.
 *   lifePlate({arrangement, anchors, lensD, boxPx, givenPx = 32})
 *       the 639 x 528 field-guide plate: the host plant; four real-scale marks ringed coral r 11
 *       (egg speck / small caterpillar / chrysalis under a leaf / butterfly on the flower), each on
 *       the leaf of its lens's own side and row (the adult always on the flower); four lenses in
 *       the corners; a teal 1.5 tether from each lens ring to its mark's ring; a 56 px box centred
 *       8 px under each lens (GIVEN = solid teal, the rank printed; OPEN = blankNumeralBox).
 *   loopRow({animal, lensD, boxPx, answer})
 *       the "after the butterfly" row: the adult lens, a curling coral arrow 84 x 64, an open box.
 *
 * Stamps: plate [data-lcs-plate][data-lcs-arrangement]; lens wrapper [data-lcs-lens]
 * [data-lcs-stage="butterfly.<id>"][data-lcs-pos]; box [data-lcs-box][data-lcs-pos]
 * [data-lcs-answer] (+ [data-lcs-given] when printed); loop box [data-lcs-loop]; spot ring
 * circle[data-lcs-spot]; tether line[data-lcs-tether]; stem path[data-lcs-stem].
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { el, esc } = require('../../primitives/_svg.js');
const { lifeStage } = require('../../primitives/life-stage.js');
const { blankNumeralBox } = require('../components-b3.js');

const T = tokens.color;
const F = tokens.font;
const r2 = (v) => Math.round(v * 100) / 100;

const PLATE_W = 639, PLATE_H = 528;
const RING_R = 11;
const LEAVES = {
  UL: { base: [315, 238], tip: [200, 196] },
  UR: { base: [325, 216], tip: [440, 174] },
  LL: { base: [315, 398], tip: [200, 356] },
  LR: { base: [325, 376], tip: [440, 334] },
};
const LEAF_OF = { TL: 'UL', TR: 'UR', BL: 'LL', BR: 'LR' };
const FLOWER = { x: 320, y: 78 };

/* ------------------------------------------------------------------ lens */
function lens({ animal, stage, d, letter, attrs = '', spawnForm = 'clump', id }) {
  const fig = lifeStage({ animal, stage, size: d, spawnForm, id });
  const badge = letter
    ? `<span data-lcs-card="${esc(letter)}" style="position:absolute;left:${r2(d / 2 - 0.35 * d - 14)}px;top:${r2(d / 2 - 0.35 * d - 14)}px;width:28px;height:28px;border-radius:50%;background:${T.coral};color:${T.white};` +
      `font-family:${F.display},cursive;font-weight:700;font-size:18px;line-height:28px;text-align:center">${esc(letter)}</span>`
    : '';
  return `<span data-lcs-lens data-lcs-stage="${esc(animal)}.${esc(stage)}" ${attrs} style="display:inline-block;position:relative;width:${d}px;height:${d}px;line-height:0;flex:0 0 ${d}px">${fig.svg}${badge}</span>`;
}

/* ------------------------------------------------------------------ host plant (scenery) */
function cubicAt(p0, p1, p2, p3, t) {
  const v = 1 - t;
  return [v ** 3 * p0[0] + 3 * v * v * t * p1[0] + 3 * v * t * t * p2[0] + t ** 3 * p3[0], v ** 3 * p0[1] + 3 * v * v * t * p1[1] + 3 * v * t * t * p2[1] + t ** 3 * p3[1]];
}
/** The almond leaf of a base-tip axis: both edge cubics + geometry helpers. */
function leafGeom(base, tip) {
  const ax = [tip[0] - base[0], tip[1] - base[1]];
  const L = Math.hypot(ax[0], ax[1]);
  const u = [ax[0] / L, ax[1] / L];
  let n = [-u[1], u[0]];
  if (n[1] < 0) n = [-n[0], -n[1]];                       // n points DOWN the page: the leaf's lower edge
  const at = (f, off) => [base[0] + ax[0] * f + n[0] * off, base[1] + ax[1] * f + n[1] * off];
  const lower = [base, at(0.30, 26), at(0.75, 23.4), tip];
  const upper = [base, at(0.30, -26), at(0.75, -23.4), tip];
  const d = `M ${base[0]} ${base[1]} C ${r2(lower[1][0])} ${r2(lower[1][1])} ${r2(lower[2][0])} ${r2(lower[2][1])} ${tip[0]} ${tip[1]} ` +
    `C ${r2(upper[2][0])} ${r2(upper[2][1])} ${r2(upper[1][0])} ${r2(upper[1][1])} ${base[0]} ${base[1]} Z`;
  /** the lower-edge point whose projection on the axis is fraction f */
  const edgeAt = (f) => {
    let lo = 0, hi = 1;
    for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2, p = cubicAt(...lower, m); const proj = ((p[0] - base[0]) * u[0] + (p[1] - base[1]) * u[1]) / L; if (proj < f) lo = m; else hi = m; }
    return cubicAt(...lower, (lo + hi) / 2);
  };
  return { base, tip, d, u, n, spotAt: at(0.55, 0), underAt: edgeAt(0.55) };
}
function hostPlant({ w = PLATE_W, h = PLATE_H } = {}) {
  void w; void h;
  const S2 = 2, S15 = 1.5;
  const out = [];
  out.push(el('line', { x1: 252, y1: 506, x2: 388, y2: 506, stroke: T.teal, 'stroke-width': S2, 'stroke-linecap': 'round' }));
  for (const [x, bh] of [[268, 12], [284, 18], [352, 16], [368, 11]]) out.push(el('path', { d: `M ${x} 506 q -3 ${-bh / 2} 2 ${-bh}`, fill: 'none', stroke: T.teal, 'stroke-width': S15, 'stroke-linecap': 'round' }));
  out.push(el('path', { d: 'M 315 506 C 311 390 319 250 315 104 L 325 104 C 329 250 321 390 325 506 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': S2, 'stroke-linejoin': 'round', 'data-lcs-stem': '1' }));
  const leaves = {};
  for (const [k, { base, tip }] of Object.entries(LEAVES)) {
    const g = leafGeom(base, tip);
    leaves[k] = g;
    out.push(el('path', { d: g.d, fill: T.tealSoft, stroke: T.teal, 'stroke-width': S2, 'stroke-linejoin': 'round', 'data-lcs-leaf': k }));
    out.push(el('line', { x1: base[0], y1: base[1], x2: tip[0], y2: tip[1], stroke: T.teal, 'stroke-width': S15, 'stroke-linecap': 'round' }));
  }
  for (let k = 0; k < 6; k++) {
    const a = k * 60, rad = a * Math.PI / 180;
    const cx = FLOWER.x + 22 * Math.cos(rad), cy = FLOWER.y + 22 * Math.sin(rad);
    out.push(el('ellipse', { cx: r2(cx), cy: r2(cy), rx: 20, ry: 11, transform: `rotate(${a} ${r2(cx)} ${r2(cy)})`, fill: T.coralSoft, stroke: T.teal, 'stroke-width': S2 }));
  }
  out.push(el('circle', { cx: FLOWER.x, cy: FLOWER.y, r: 13, fill: T.creamDeep, stroke: T.teal, 'stroke-width': S2 }));
  return { svg: el('g', { 'data-lcs-host-plant': '1' }, out.join('')), leaves, flower: { ...FLOWER } };
}

/* ------------------------------------------------------------------ real-scale marks on the plant */
function markAt(stage, leaf, side) {
  // returns { svg, c: ring centre }
  if (stage === 'adult') {
    const x = FLOWER.x + (side === 'L' ? -12 : 12), y = 56;
    const svg = el('polygon', { points: `${x - 8},${y - 6} ${x - 8},${y + 6} ${x},${y}`, fill: T.coral, stroke: T.teal, 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
      el('polygon', { points: `${x + 8},${y - 6} ${x + 8},${y + 6} ${x},${y}`, fill: T.coral, stroke: T.teal, 'stroke-width': 1, 'stroke-linejoin': 'round' }) +
      el('line', { x1: x, y1: y - 6, x2: x, y2: y + 6, stroke: T.ink, 'stroke-width': 2, 'stroke-linecap': 'round' });
    return { svg, c: [x, y] };
  }
  const [px, py] = leaf.spotAt;
  if (stage === 'egg') return { svg: el('ellipse', { cx: r2(px), cy: r2(py), rx: 2.2, ry: 3, fill: T.white, stroke: T.ink, 'stroke-width': 1 }), c: [px, py] };
  if (stage === 'larva') {
    const [ux, uy] = leaf.u;
    const parts = [];
    for (let i = 0; i < 5; i++) { const t = (i - 2.5) * 3.5; parts.push(el('circle', { cx: r2(px + ux * t), cy: r2(py + uy * t), r: 2.6, fill: T.creamDeep, stroke: T.teal, 'stroke-width': 1 })); }
    parts.push(el('circle', { cx: r2(px + ux * 8.2), cy: r2(py + uy * 8.2), r: 2.8, fill: T.teal }));   // head toward the leaf tip
    return { svg: parts.join(''), c: [px, py] };
  }
  if (stage === 'pupa') {
    const [ex, ey] = leaf.underAt;
    const svg = el('line', { x1: r2(ex), y1: r2(ey), x2: r2(ex), y2: r2(ey + 5), stroke: T.teal, 'stroke-width': 1.2, 'stroke-linecap': 'round' }) +
      el('path', { d: `M ${r2(ex)} ${r2(ey + 5)} C ${r2(ex + 5)} ${r2(ey + 6)} ${r2(ex + 4.5)} ${r2(ey + 15)} ${r2(ex)} ${r2(ey + 17)} C ${r2(ex - 4.5)} ${r2(ey + 15)} ${r2(ex - 5)} ${r2(ey + 6)} ${r2(ex)} ${r2(ey + 5)} Z`, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 1.2 });
    return { svg, c: [ex, ey + 11] };
  }
  throw new Error('lifePlate: no plate mark for stage ' + stage);
}

/** Lens centre in plate px for a corner at diameter d. */
function lensCentre(pos, d) {
  const x = pos[1] === 'L' ? 6 + d / 2 : PLATE_W - 6 - d / 2;
  const y = pos[0] === 'T' ? 10 + d / 2 : 252 + d / 2;
  return [x, y];
}
const RING_FRAC = 97 / 200;   // the lens ring radius as a fraction of the diameter (life-stage.js)

function givenBox({ w, h, n, px, attrs }) {
  return `<span class="ws-blankbox" ${attrs} data-lcs-given="${esc(n)}" data-lcs-answer="${esc(n)}" style="width:${w}px;height:${h}px;flex:0 0 ${w}px;border:2.5px solid ${T.teal};background:${T.white};` +
    `display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:1;color:${T.ink}">${esc(n)}</span>`;
}

function lifePlate({ arrangement, anchors = [], lensD, boxPx, givenPx = 32, animal = 'butterfly', stages }) {
  if (!arrangement) throw new Error('lifePlate: no arrangement');
  const order = stages;
  if (!Array.isArray(order) || order.length !== 4) throw new Error('lifePlate: the plate draws a 4-stage cycle');
  const plant = hostPlant();
  const marks = [], tethers = [], html = [];
  for (const pos of ['TL', 'TR', 'BL', 'BR']) {
    const stage = arrangement[pos];
    if (!order.includes(stage)) throw new Error(`lifePlate: ${pos} holds "${stage}" — not a ${animal} stage`);
    const leaf = plant.leaves[LEAF_OF[pos]];
    const mk = markAt(stage, leaf, pos[1]);
    const c = lensCentre(pos, lensD);
    const dx = mk.c[0] - c[0], dy = mk.c[1] - c[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const start = [c[0] + ux * RING_FRAC * lensD, c[1] + uy * RING_FRAC * lensD];
    const end = [mk.c[0] - ux * RING_R, mk.c[1] - uy * RING_R];
    marks.push(el('g', { 'data-lcs-mark': stage }, mk.svg) +
      el('circle', { cx: r2(mk.c[0]), cy: r2(mk.c[1]), r: RING_R, fill: 'none', stroke: T.coral, 'stroke-width': 2.5, 'data-lcs-spot': stage }));
    tethers.push(el('line', { x1: r2(start[0]), y1: r2(start[1]), x2: r2(end[0]), y2: r2(end[1]), stroke: T.teal, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'data-lcs-tether': stage }));
    const rank = order.indexOf(stage) + 1;
    html.push(lens({ animal, stage, d: lensD, attrs: `data-lcs-pos="${pos}" data-lcs-cx="${r2(c[0])}" data-lcs-cy="${r2(c[1])}"` })
      .replace('style="display:inline-block;position:relative;', `style="position:absolute;left:${r2(c[0] - lensD / 2)}px;top:${r2(c[1] - lensD / 2)}px;display:inline-block;`));
    const bx = r2(c[0] - boxPx / 2), by = r2(c[1] + lensD / 2 + 8);
    const pos2 = `position:absolute;left:${bx}px;top:${by}px;`;
    const box = anchors.includes(stage)
      ? givenBox({ w: boxPx, h: boxPx, n: String(rank), px: givenPx, attrs: `data-lcs-box data-lcs-pos="${pos}"` })
      : blankNumeralBox({ w: boxPx, h: boxPx, answer: String(rank), attrs: `data-lcs-box data-lcs-pos="${pos}"` });
    html.push(box.replace('style="', `style="${pos2}box-sizing:border-box;`));
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PLATE_W}" height="${PLATE_H}" viewBox="0 0 ${PLATE_W} ${PLATE_H}" aria-hidden="true" data-lcs-scenery style="position:absolute;left:0;top:0;display:block">` +
    plant.svg + tethers.join('') + marks.join('') + '</svg>';
  return `<div data-lcs-plate data-lcs-arrangement="${esc(arrangement.id || 'X')}" style="position:relative;width:${PLATE_W}px;height:${PLATE_H}px;flex:0 0 auto">${svg}${html.join('')}</div>`;
}

/* ------------------------------------------------------------------ the loop row */
function loopArrow() {
  // a prolate cycloid: up from the lower left, one loop that crosses itself at the top, down and on to the right; + the 12 x 12 head
  const P = [];
  for (let k = 0; k <= 48; k++) { const th = -Math.PI + 2 * Math.PI * k / 48; P.push([40 + 9.87 * th - 18 * Math.sin(th), 34 - 18 * Math.cos(th)]); }
  const d = 'M ' + P.map(([x, y]) => `${r2(x)} ${r2(y)}`).join(' L ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="84" height="64" viewBox="0 0 84 64" aria-hidden="true" data-lcs-loop-arrow style="display:block;flex:0 0 84px">` +
    el('path', { d, fill: 'none', stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) +
    el('line', { x1: 70, y1: 52, x2: 72, y2: 52, stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round' }) +
    el('polygon', { points: '82,52 70,46 70,58', fill: T.coral }) + '</svg>';
}
function loopRow({ animal = 'butterfly', stage = 'adult', lensD, boxPx, answer }) {
  return `<div data-lcs-loop-row style="display:flex;align-items:center;justify-content:center;gap:18px;width:${PLATE_W}px;height:116px;flex:0 0 auto">` +
    lens({ animal, stage, d: lensD, attrs: 'data-lcs-loop-lens', id: `ls-loop-${animal}-${stage}-${lensD}` }) + loopArrow() +
    blankNumeralBox({ w: boxPx, h: boxPx, answer: String(answer), attrs: 'data-lcs-box data-lcs-loop' }) + '</div>';
}

/* ================================================================== Phase E faces (design §3) */
/*
 * Face components. Names are prefixed `life` so the merged components-b5 namespace can never
 * collide with a sibling family's generic `cutStrip` / `nextRow` / `compareTable`; the design's
 * pondRing, cutStrip, labelLoop, youngStrip, adultBin, compareTable, nextRow map 1:1:
 *   lifePondRing     F1  the pond; n lily pads on an ellipse; an anchor pad holds a lens, every
 *                        other pad an EMPTY dashed ghost; clockwise arcs, the last data-lcs-arrow="return"
 *   lifeCutStrip     F1  scissors + a 1 x n cut grid of SQUARE cells, one lens each
 *   lifeWordBank     F2  the bank banner, one stamped pill per word (the decoy stamped data-lcs-decoy)
 *   lifeLabelLoop    F2  the 2 x 2 loop (TL -> TR -> BR -> BL -> TL): a lens + an empty writing lane per cell
 *   lifeYoungStrip   F3  2 rows of 4 lettered young-stage lenses
 *   lifeAdultBins    F3  three bins, each crowned by its drawn adult, `cap` empty boxes each
 *   lifeCompareTable F4  two adult lenses heading two tick columns, n statement rows
 *   lifeNextRows     F5  rows: a prompt lens on a plinth, an arrow, three choice lenses
 */
const { writingRow } = require('../../primitives/trace-path.js');
const C3 = require('../components-b3.js');

const POND = { W: 639, H: 500, cx: 319.5, cy: 266.9, rx: 236, ry: 176.9 };
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function pondPadCentres(n) {
  return Array.from({ length: n }, (_, k) => { const a = (-90 + k * 360 / n) * Math.PI / 180; return [POND.cx + POND.rx * Math.cos(a), POND.cy + POND.ry * Math.sin(a)]; });
}
function arrowHead(tip, dir, len = 12, half = 6) {
  const b = [tip[0] - dir[0] * len, tip[1] - dir[1] * len], p = [-dir[1], dir[0]];
  return { base: b, pts: `${r2(tip[0])},${r2(tip[1])} ${r2(b[0] + p[0] * half)},${r2(b[1] + p[1] * half)} ${r2(b[0] - p[0] * half)},${r2(b[1] - p[1] * half)}` };
}
/** A coral 4 px arc along the pond ellipse from pad k to pad k+1, clear of both pads, + the 12 x 12 head. */
function pondArc(ca, cb, a0, a1, clear, attrs) {
  const P = [];
  for (let t = a0; t <= a1 + 1e-9; t += 0.25) { const r = t * Math.PI / 180; const p = [POND.cx + POND.rx * Math.cos(r), POND.cy + POND.ry * Math.sin(r)]; if (dist(p, ca) >= clear && dist(p, cb) >= clear) P.push(p); }
  if (P.length < 8) throw new Error('lifePondRing: no room for an arrow between two pads');
  const tip = P[P.length - 1];
  let k = P.length - 1; while (k > 0 && dist(P[k], tip) < 10) k--;
  const dx = tip[0] - P[k][0], dy = tip[1] - P[k][1], L = Math.hypot(dx, dy), dir = [dx / L, dy / L];
  const head = arrowHead(tip, dir);
  const line = P.filter((p) => dist(p, tip) >= 12).concat([head.base]);
  return el('g', attrs, el('polyline', { points: line.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' '), fill: 'none', stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) +
    el('polygon', { points: head.pts, fill: T.coral, 'data-lcs-arrow-tip': `${r2(tip[0])},${r2(tip[1])}` }));
}
/** A lily pad: a circle with a 30 deg notch facing the pond centre (arc `0 1 1`, the primitive's measured form). */
function lilyPad(c, r) {
  const phi = Math.atan2(POND.cy - c[1], POND.cx - c[0]), h = 15 * Math.PI / 180;
  const p1 = [c[0] + r * Math.cos(phi + h), c[1] + r * Math.sin(phi + h)], p2 = [c[0] + r * Math.cos(phi - h), c[1] + r * Math.sin(phi - h)];
  return el('path', { d: `M ${r2(c[0])} ${r2(c[1])} L ${r2(p1[0])} ${r2(p1[1])} A ${r} ${r} 0 1 1 ${r2(p2[0])} ${r2(p2[1])} Z`, fill: T.white, stroke: T.teal, 'stroke-width': 3, 'stroke-linejoin': 'round', 'data-lcs-lily': '1' });
}
/**
 * F1 pond ring. FILL (nt10-E lead ruling): the ring is the page's elastic hero — it takes the free
 * height between POND.H (500) and `maxH` (flex-grow), and the whole ring stretches VERTICALLY with it
 * (the body width, 639, is already spent). The pond ellipse + ripples + arcs live in one SVG with
 * preserveAspectRatio="none" and non-scaling strokes; every pad is its OWN square SVG placed at
 * top: (cy / 500) of the ring height, so the pads stay round and the arcs keep (or widen) their
 * clearance. Stamps keep the 639 x 500 design coordinates (data-lcs-cx / -cy) + data-lcs-fy = cy / 500.
 */
function lifePondRing({ animal = 'frog', stages, anchors = [], padR = 86, ghost = 116, padLens = 132, spawnForm = 'clump', maxH = 600 }) {
  const n = stages.length;
  const C = pondPadCentres(n);
  for (const c of C) if (c[1] - padR < 0 || c[1] + padR > POND.H || c[0] - padR < 0 || c[0] + padR > POND.W) throw new Error(`lifePondRing: a pad leaves the ${POND.W} x ${POND.H} frame at n = ${n}`);
  if (ghost * Math.SQRT2 / 2 > padR) throw new Error(`lifePondRing: ghost ${ghost} half-diagonal > pad r ${padR}`);
  if (!(maxH >= POND.H)) throw new Error(`lifePondRing: maxH ${maxH} < ${POND.H}`);
  const NS = { 'vector-effect': 'non-scaling-stroke' };
  const svg = [];
  svg.push(el('ellipse', { cx: POND.cx, cy: POND.cy, rx: POND.rx, ry: POND.ry, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 1.5, 'data-lcs-pond': '1', ...NS }));
  for (const [x, y, w] of [[262, 214, 34], [262, 214, 20], [384, 256, 40], [384, 256, 24], [300, 322, 30], [300, 322, 16]]) svg.push(el('path', { d: `M ${x - w} ${y} Q ${x} ${r2(y - w * 0.45)} ${x + w} ${y}`, fill: 'none', stroke: T.grid, 'stroke-width': 1.5, 'stroke-linecap': 'round', ...NS }));
  for (let k = 0; k < n; k++) {
    const a0 = -90 + k * 360 / n, a1 = a0 + 360 / n;
    svg.push(pondArc(C[k], C[(k + 1) % n], a0, a1, padR + 7, { 'data-lcs-arrow': k === n - 1 ? 'return' : String(k + 1), 'data-lcs-from': String(k + 1), 'data-lcs-to': String((k + 1) % n + 1) }).replace('<polyline ', '<polyline vector-effect="non-scaling-stroke" '));
  }
  const html = C.map((c, k) => {
    const stage = stages[k], box = 2 * padR, fy = c[1] / POND.H;
    const pad = `<svg xmlns="http://www.w3.org/2000/svg" width="${box + 4}" height="${box + 4}" viewBox="${r2(c[0] - padR - 2)} ${r2(c[1] - padR - 2)} ${box + 4} ${box + 4}" aria-hidden="true" style="position:absolute;left:-2px;top:-2px;display:block">${lilyPad(c, padR)}</svg>`;
    const inner = anchors.includes(stage)
      ? lens({ animal, stage, d: padLens, spawnForm, id: `ls-pond-${animal}-${stage}` })
      : `<span data-lcs-ghost style="width:${ghost}px;height:${ghost}px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:6px;background:${T.white};display:block;position:relative"></span>`;
    return `<div data-lcs-pad data-lcs-slot="${k + 1}" data-lcs-expect="${esc(stage)}"${anchors.includes(stage) ? ' data-lcs-anchor' : ''} data-lcs-cx="${r2(c[0])}" data-lcs-cy="${r2(c[1])}" data-lcs-fy="${fy.toFixed(5)}" data-lcs-r="${padR}" ` +
      `style="position:absolute;left:${r2(c[0] - padR)}px;top:calc(${(fy * 100).toFixed(4)}% - ${padR}px);width:${box}px;height:${box}px;display:flex;align-items:center;justify-content:center">${pad}${inner.replace('style="', 'style="z-index:1;')}</div>`;
  }).join('');
  return `<div data-lcs-pond-ring style="position:relative;width:${POND.W}px;flex:1 1 ${POND.H}px;min-height:${POND.H}px;max-height:${maxH}px">` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${POND.W} ${POND.H}" preserveAspectRatio="none" aria-hidden="true" data-lcs-scenery style="position:absolute;left:0;top:0;display:block">${svg.join('')}</svg>${html}</div>`;
}
/** A lens whose size is a CSS length (the FILL-elastic faces); the drawing's strokes were set for `d`. */
function fluidLens(html, sizeCss, posCss) {
  const out = html.replace(/style="display:inline-block;position:relative;width:[\d.]+px;height:[\d.]+px;line-height:0;flex:0 0 [\d.]+px"/, `style="position:absolute;${posCss}display:inline-block;width:${sizeCss};height:${sizeCss};line-height:0"`)
    .replace(/(<svg [^>]*?)width="[\d.]+" height="[\d.]+"/, '$1width="100%" height="100%"');
  if (out === html) throw new Error('fluidLens: the lens markup changed shape');
  return out;
}
/** An HTML arrow (a 4 px coral bar + a 12 x 12 head) that stretches with its box; dir right | left | down | up. */
function barArrow(dir, css, attrs) {
  const horiz = dir === 'right' || dir === 'left';
  const head = { right: '12,6 0,0 0,12', left: '0,6 12,0 12,12', down: '6,12 0,0 12,0', up: '6,0 0,12 12,12' }[dir];
  const bar = `<span style="flex:1 1 auto;${horiz ? 'height:4px' : 'width:4px'};background:${T.coral};border-radius:2px"></span>`;
  const tri = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style="display:block;flex:0 0 12px">${el('polygon', { points: head, fill: T.coral })}</svg>`;
  return `<span ${attrs} style="position:absolute;${css}display:flex;flex-direction:${horiz ? (dir === 'right' ? 'row' : 'row-reverse') : (dir === 'down' ? 'column' : 'column-reverse')};align-items:center">${bar}${tri}</span>`;
}
function lifeCutStrip({ animal = 'frog', tiles, cell = 104, tileLens = 92, spawnForm = 'clump' }) {
  const w = cell * tiles.length;
  const cells = tiles.map((s, i) => `<span data-lcs-tile="${esc(s)}" style="width:${cell}px;height:${cell}px;flex:0 0 ${cell}px;display:flex;align-items:center;justify-content:center">` +
    lens({ animal, stage: s, d: tileLens, spawnForm, id: `ls-tile-${animal}-${s}-${i}` }) + '</span>').join('');
  return `<div data-lcs-strip style="display:flex;align-items:center;justify-content:center;gap:12px;height:${cell + 4}px;flex:0 0 auto">` + C3.scissorsGlyph(26) +
    `<div data-lcs-cut style="position:relative;width:${w}px;height:${cell}px;display:flex;flex:0 0 auto">${cells}` + C3.cutLines({ w, h: cell, cols: tiles.length, rows: 1 }) + '</div></div>';
}

/* ------------------------------------------------------------------ F2 */
const LOOP_POS = ['TL', 'TR', 'BR', 'BL'];   // the clockwise loop: stage i sits at LOOP_POS[i]
function lifeWordBank({ words, wordPx = 18 }) {
  return `<div class="ws-scene-banner ws-bank" data-lcs-bank-banner style="margin-bottom:10px;flex:0 0 auto;max-width:639px;box-sizing:border-box">` +
    words.map((w) => `<span class="ws-bankword" style="font-size:${wordPx}px" data-lcs-bank-word="${esc(w.key)}"${w.decoy ? ' data-lcs-decoy' : ''}>${esc(w.text)}</span>`).join('') + '</div>';
}
/**
 * F2 loop. FILL: the loop is a size container that takes the free height between its minimum
 * (2 x lensD + 2 x (8 + lane) + 52) and `maxH`; the lens size --lcs-l grows with it (clamped to
 * [lensD, lensMax]) and the row gutter takes the rest, so the vertical arrows lengthen with it.
 */
function lifeLabelLoop({ animal = 'butterfly', stages, lensD = 130, lensMax = 200, lane = [260, 56], glyphH = 26, maxH = 650 }) {
  if (stages.length !== 4) throw new Error('lifeLabelLoop: the 2 x 2 loop holds 4 stages');
  const [lw, lh] = lane, colW = 300, gut = 39, rowGap = 52, W = 2 * colW + gut, fixed = 2 * (8 + lh) + rowGap, minH = 2 * lensD + fixed;
  if (lensMax > colW - 20 || lensMax < lensD) throw new Error(`lifeLabelLoop: lensMax ${lensMax} outside [${lensD}, ${colW - 20}]`);
  const Lv = 'var(--lcs-l)';
  const cx = { L: colW / 2, R: colW + gut + colW / 2 };
  const top = { T: '0px', B: `(100% - ${Lv} - ${8 + lh}px)` };
  const html = stages.map((s, i) => {
    const p = LOOP_POS[i], x = p[1] === 'L' ? 0 : colW + gut;
    const wr = writingRow({ w: lw, h: lh, glyphH, xHeight: true });
    return fluidLens(lens({ animal, stage: s, d: lensD, id: `ls-label-${animal}-${s}`, attrs: `data-lcs-pos="${p}"` }), Lv, `left:calc(${cx[p[1]]}px - ${Lv} / 2);top:calc(${top[p[0]]});`) +
      `<span data-lcs-label="${esc(s)}" data-lcs-pos="${p}" style="position:absolute;left:${x + (colW - lw) / 2}px;top:calc(${top[p[0]]} + ${Lv} + 8px);width:${lw}px;height:${lh}px;display:block;line-height:0">${wr.svg}</span>`;
  }).join('');
  const hW = `width:calc(${cx.R - cx.L}px - ${Lv} - 20px);left:calc(${cx.L}px + ${Lv} / 2 + 10px);height:12px;`;
  const vH = `height:calc(100% - 2 * ${Lv} - ${2 * (8 + lh) + 12}px);top:calc(${Lv} + ${8 + lh + 6}px);width:12px;`;
  const arrows = [
    barArrow('right', `${hW}top:calc(${Lv} / 2 - 6px);`, 'data-lcs-arrow="1" data-lcs-from="TL" data-lcs-to="TR"'),
    barArrow('down', `${vH}left:${cx.R - 6}px;`, 'data-lcs-arrow="2" data-lcs-from="TR" data-lcs-to="BR"'),
    barArrow('left', `${hW}top:calc(100% - ${8 + lh}px - ${Lv} / 2 - 6px);`, 'data-lcs-arrow="3" data-lcs-from="BR" data-lcs-to="BL"'),
    barArrow('up', `${vH}left:${cx.L - 6}px;`, 'data-lcs-arrow="return" data-lcs-from="BL" data-lcs-to="TL"'),
  ];
  return `<div data-lcs-label-loop style="position:relative;width:${W}px;flex:1 1 ${minH}px;min-height:${minH}px;max-height:${maxH}px;container-type:size">` +
    `<div style="position:absolute;inset:0;--lcs-l:clamp(${lensD}px, calc((100cqh - ${fixed}px) / 2), ${lensMax}px)">${arrows.join('')}${html}</div></div>`;
}

/* ------------------------------------------------------------------ F3 */
/**
 * F3 strip. FILL: the face root is a size container (the body height); the young lens size
 * --lcs-y grows from lensD to lensMax as the body grows past `growFrom` (0.3 px per px).
 */
function lifeYoungStrip({ cards, lensD = 100, lensMax = 128, growFrom = 580, cols = 4, gap = 40, rowGap = 14, spawnForm = 'clump' }) {
  const rows = Math.ceil(cards.length / cols);
  if (cols * lensMax + (cols - 1) * gap > 639) throw new Error(`lifeYoungStrip: ${cols} x ${lensMax} + gaps > 639`);
  const Y = 'var(--lcs-y)';
  const html = cards.map((c, i) => {
    const x = i % cols, y = Math.floor(i / cols);
    return fluidLens(lens({ animal: c.animal, stage: c.stage, d: lensD, letter: c.letter, spawnForm, id: `ls-young-${c.animal}-${c.stage}`, attrs: `data-lcs-young="${esc(c.letter)}"` }), Y,
      `left:calc((${Y} + ${gap}px) * ${x});top:calc((${Y} + ${rowGap}px) * ${y});`);
  }).join('');
  return `<div data-lcs-young-strip style="--lcs-y:clamp(${lensD}px, calc((100cqh - ${growFrom}px) * 0.3 + ${lensD}px), ${lensMax}px);position:relative;width:calc(${Y} * ${cols} + ${gap * (cols - 1)}px);height:calc(${Y} * ${rows} + ${rowGap * (rows - 1)}px);flex:0 0 auto">${html}</div>`;
}
/**
 * F3 bins. FILL: the bin row is a size container taking the free height between its minimum
 * (adultD / 2 + adultD / 2 + 16 + 2 box + 12 + 16) and `maxH`; the adult lens (--lcs-a) and the boxes
 * (--lcs-b) grow with it, the bin bodies run to its bottom.
 */
function lifeAdultBins({ bins, adultD = 132, adultMax = 164, box = 52, boxMax = 64, binW = 196, gap = 25, maxH = 420 }) {
  const minH = adultD + 16 + 2 * box + 12 + 16;
  if (adultMax > binW) throw new Error(`lifeAdultBins: adult lens ${adultMax} wider than the bin ${binW}`);
  const A = 'var(--lcs-a)', B = 'var(--lcs-b)';
  const html = bins.map((b) => {
    const cols = b.cap > 2 ? 2 : b.cap, rows = Math.ceil(b.cap / cols);
    const boxes = Array.from({ length: b.cap }, () => C3.blankNumeralBox({ w: box, h: box, attrs: 'data-lcs-bin-box' }).replace(/width:[\d.]+px;height:[\d.]+px;flex:0 0 [\d.]+px/, `width:${B};height:${B}`)).join('');
    return `<div data-lcs-bin="${esc(b.animal)}" data-lcs-cap="${b.cap}" data-lcs-expect="${esc(b.expect.join(','))}" style="position:relative;width:${binW}px;height:100%;flex:0 0 ${binW}px">` +
      `<div data-lcs-bin-body style="position:absolute;left:0;top:calc(${A} / 2);bottom:0;width:${binW}px;box-sizing:border-box;background:${T.white};border:3px solid ${T.teal};border-radius:16px"></div>` +
      fluidLens(lens({ animal: b.animal, stage: 'adult', d: adultD, id: `ls-bin-${b.animal}`, attrs: 'data-lcs-bin-adult' }), A, `left:calc((${binW}px - ${A}) / 2);top:0;`) +
      `<div data-lcs-bin-boxes style="position:absolute;left:0;top:calc(${A} + 16px);bottom:16px;width:${binW}px;display:grid;grid-template-columns:repeat(${cols},${B});grid-template-rows:repeat(${rows},${B});gap:12px;justify-content:center;align-content:center">${boxes}</div></div>`;
  }).join('');
  return `<div data-lcs-bins style="flex:1 1 ${minH}px;min-height:${minH}px;max-height:${maxH}px;container-type:size;width:639px">` +
    `<div style="display:flex;gap:${gap}px;justify-content:center;width:100%;height:100%;--lcs-a:clamp(${adultD}px, calc(100cqh * 0.36), ${adultMax}px);--lcs-b:clamp(${box}px, calc(100cqh * 0.15), ${boxMax}px)">${html}</div></div>`;
}

/* ------------------------------------------------------------------ F4 */
function lifeCompareTable({ rows, headD = 110, tick = 40, rowMinH = 58, rowMaxH = 72, textPx = 17, stmtW = 383, colW = 128 }) {
  const head = `<div data-lcs-compare-head style="display:grid;grid-template-columns:${stmtW}px ${colW}px ${colW}px;width:${stmtW + 2 * colW}px;height:${headD + 8}px;align-items:start;flex:0 0 auto"><span></span>` +
    ['butterfly', 'frog'].map((a) => `<span style="display:flex;justify-content:center">${lens({ animal: a, stage: 'adult', d: headD, id: `ls-head-${a}`, attrs: `data-lcs-head="${a}"` })}</span>`).join('') + '</div>';
  const tk = (a) => `<span style="display:flex;align-items:center;justify-content:center"><span data-lcs-tick="${a}" style="width:${tick}px;height:${tick}px;box-sizing:border-box;border:2.5px solid ${T.teal};border-radius:8px;background:${T.white};display:block"></span></span>`;
  const body = rows.map((r, i) => `<div data-lcs-stmt="${esc(r.id)}" data-lcs-expect="${esc(r.truth.join(','))}" data-lcs-class="${esc(r.cls)}" style="display:grid;grid-template-columns:${stmtW}px ${colW}px ${colW}px;align-items:center;background:${i % 2 ? T.creamDeep : T.white};border-radius:10px;min-height:0">` +
    `<span data-lcs-stmt-text style="padding:0 12px;font-family:${F.body},sans-serif;font-weight:700;font-size:${textPx}px;line-height:22px;color:${T.ink}">${esc(r.text)}</span>${tk('butterfly')}${tk('frog')}</div>`).join('');
  return head + `<div data-lcs-fill data-lcs-compare-rows style="display:grid;grid-template-rows:repeat(${rows.length},minmax(${rowMinH}px,${rowMaxH}px));row-gap:6px;width:${stmtW + 2 * colW}px;flex:1 1 auto;min-height:0;align-content:start">${body}</div>`;
}

/* ------------------------------------------------------------------ F5 */
function nextArrow() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24" aria-hidden="true" data-lcs-next-arrow style="display:block;flex:0 0 44px">` +
    el('line', { x1: 3, y1: 12, x2: 30, y2: 12, stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round' }) + el('polygon', { points: '42,12 30,6 30,18', fill: T.coral }) + '</svg>';
}
function lifeNextRows({ rows, promptD = 100, chipD = 92, rowMaxH = 116, spawnForm = 'clump' }) {
  const sp = (w) => `<span style="width:${w}px;flex:0 0 ${w}px"></span>`;
  const body = rows.map((r, i) => `<div data-lcs-next-row="${i + 1}" data-lcs-prompt="${esc(r.animal)}.${esc(r.prompt)}" data-lcs-answer="${esc(r.animal)}.${esc(r.answer)}" style="display:flex;align-items:center;justify-content:center;min-height:0">` +
    `<span data-lcs-plinth style="width:${promptD}px;height:${promptD}px;flex:0 0 ${promptD}px;background:${T.creamDeep};border-radius:16px;display:flex;align-items:center;justify-content:center">` +
    lens({ animal: r.animal, stage: r.prompt, d: promptD, spawnForm, id: `ls-next-${i}-p`, attrs: 'data-lcs-prompt-lens' }) + '</span>' +
    sp(16) + nextArrow() + sp(16) + `<span style="width:2px;height:${promptD - 20}px;flex:0 0 2px;background:${T.grid}"></span>` + sp(20) +
    r.chips.map((s, j) => (j ? sp(20) : '') + lens({ animal: r.animal, stage: s, d: chipD, spawnForm, id: `ls-next-${i}-${j}`, attrs: `data-lcs-chip="${esc(r.animal)}.${esc(s)}" data-lcs-slot="${j}"` })).join('') + '</div>').join('');
  return `<div data-lcs-fill data-lcs-next-rows style="display:grid;grid-template-rows:repeat(${rows.length},minmax(${promptD}px,${rowMaxH}px));row-gap:8px;width:639px;flex:1 1 auto;min-height:0;align-content:start">${body}</div>`;
}

module.exports = { lens, hostPlant, lifePlate, loopRow, lifePondRing, lifeCutStrip, lifeWordBank, lifeLabelLoop, lifeYoungStrip, lifeAdultBins, lifeCompareTable, lifeNextRows, LIFE_LOOP_POS: LOOP_POS, LIFE_POND: POND };
