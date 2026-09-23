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

module.exports = { lens, hostPlant, lifePlate, loopRow };
