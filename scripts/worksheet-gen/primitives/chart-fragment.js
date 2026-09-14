/**
 * chart-fragment.js — pieces cut out of a hundreds chart (G1-310
 * `hundreds-chart-puzzles`; design docs/worksheet-gen/b3-designs/
 * G1-310-hundreds-chart-puzzles.md §2). Pure SVG on the token palette.
 *
 * Exports
 *   SHAPES   explicit (r,c) lists per rotation, NEVER computed: sq3 9 ·
 *            plus 5 · L3 ×4 · T3 ×4 · bar-h3 / bar-v3 3 · sq2 4 · S / Z 4 (×2) ·
 *            sq3-holes 7 (×2) · rect4x3 12. A module-load assertion proves every
 *            list 4-connected, <= 4x4, normalised to (0,0), distinct cells, the
 *            declared cell count, and rotations distinct within a shape.
 *   UNITS    the chart ranges the unitAxis fans: '1-100' (exemplar) · '0-99' ·
 *            '1-120' · '101-200' · 'tens' ({start:10, end:1000, step:10,
 *            g2Only:true} — the sole 2.NBT.B.8-honest unit; refused by the base).
 *   shapeInfo(shape, rot) → { cells, w, h, hub, extremities } — hub = the cell
 *            adjacent to every other cell (plus centre / bar middle; null where
 *            none), extremities = the cells with the fewest in-shape neighbours.
 *   valueAt({origin, step}, r, c) = origin + step * (10*r + c) — the ONE position
 *            formula (row = tens, column = ones); verify() repeats it in-page.
 *   chartFragment({shape, rot, origin, anchorIdx, printed:'anchor'|'all',
 *            wrongIdx?, wrongValue?, cell, start, end, step, fontSize, shadow})
 *            → { svg, width, height, meta }. One cell is the tealSoft ANCHOR and
 *            prints its number (`<text data-lcs-anchor>`); every other cell is a
 *            white grey-dashed blank carrying `data-lcs-rc` + `data-lcs-answer`
 *            (the SVG twin of `.ws-answerbox`; the ground truth is never text).
 *            `printed:'all'` prints every cell (`data-lcs-cell` on the label, the
 *            F1/F4 faces; `anchorTint` defaults to false there so no cell reads
 *            as "surely right" — pass true to keep the highlight); `wrongIdx`
 *            prints `wrongValue` on that cell and stamps
 *            `data-lcs-wrong="<printed>"` — the right value prints nowhere.
 *            The primitive draws what the composer asks: the column rule, the
 *            range and page-level distinctness are the SPEC's job (so a gate can
 *            build an ILLEGAL piece as a poison).
 *   chartOutline({start, end, step, cell, guides:'edges'|'rich'|'corners',
 *            targets:[{k, values:[]}], fontSize}) → the F1 board: a 10-column
 *            chart with a teal 3 px frame r 10, inkSoft 1.5 px interior lines,
 *            printed guides, and every target cell stamped
 *            `data-lcs-target="k" data-lcs-answer="<v>"`. A target rect IS the cell
 *            (white on white: the write-in space the child has is the cell between
 *            the grid lines, so the floor is measured on the cell; Phase 2, F1).
 *   guideValues({start, end, step, guides}) → the values chartOutline PRINTS for
 *            that guide mode (the F1 composer keeps every piece off them; the
 *            gate re-derives the same set in its own code).
 *
 * Stamps: piece root `data-lcs-prim="chart-fragment" data-lcs-shape data-lcs-rot
 * data-lcs-w data-lcs-h data-lcs-origin data-lcs-anchor data-lcs-anchor-idx
 * data-lcs-cellpx data-lcs-start data-lcs-end data-lcs-step data-lcs-printed`
 * (the design wrote `data-lcs-cell` for the px size; renamed `-cellpx` because
 * `printed:'all'` labels carry `data-lcs-cell` = a VALUE — two things under one
 * name is a recorded trap). Every cell rect `data-lcs-rc="r,c"`; the anchor rect
 * also `data-lcs-given`; blanks `data-lcs-answer`.
 */
'use strict';
const tokens = require('./_tokens.js');
const { el, svgRoot, roundedRect, line, label } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;

/* ------------------------------------------------------------------ shapes */
const SHAPES = {
  sq3: [[[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]],
  plus: [[[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]]],
  L3: [
    [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
    [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]],
    [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
    [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]],
  ],
  T3: [
    [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]],
    [[0, 2], [1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [1, 1], [1, 2], [2, 0]],
  ],
  'bar-h3': [[[0, 0], [0, 1], [0, 2]]],
  'bar-v3': [[[0, 0], [1, 0], [2, 0]]],
  sq2: [[[0, 0], [0, 1], [1, 0], [1, 1]]],
  S: [
    [[0, 1], [0, 2], [1, 0], [1, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
  ],
  Z: [
    [[0, 0], [0, 1], [1, 1], [1, 2]],
    [[0, 1], [1, 0], [1, 1], [2, 0]],
  ],
  'sq3-holes': [
    [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 2]],
    [[0, 0], [0, 1], [0, 2], [1, 1], [2, 0], [2, 1], [2, 2]],
  ],
  rect4x3: [[[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]]],
};
const CELL_COUNT = { sq3: 9, plus: 5, L3: 5, T3: 5, 'bar-h3': 3, 'bar-v3': 3, sq2: 4, S: 4, Z: 4, 'sq3-holes': 7, rect4x3: 12 };

const UNITS = {
  '1-100': { start: 1, end: 100, step: 1 },
  '0-99': { start: 0, end: 99, step: 1 },
  '1-120': { start: 1, end: 120, step: 1 },
  '101-200': { start: 101, end: 200, step: 1 },
  tens: { start: 10, end: 1000, step: 10, g2Only: true },
};

const key = (r, c) => r + ',' + c;

function connected(cells) {
  const set = new Set(cells.map(([r, c]) => key(r, c)));
  const seen = new Set([key(cells[0][0], cells[0][1])]);
  const st = [cells[0]];
  while (st.length) {
    const [r, c] = st.pop();
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = key(r + dr, c + dc);
      if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([r + dr, c + dc]); }
    }
  }
  return seen.size === cells.length;
}

function neighbourCount(cells, r, c) {
  const set = new Set(cells.map(([a, b]) => key(a, b)));
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dr, dc]) => set.has(key(r + dr, c + dc))).length;
}

/** The measured facts of one rotation; every caller (spec, gate) reads these, never recomputes. */
function shapeInfo(shape, rot = 0) {
  const rots = SHAPES[shape];
  if (!rots) throw new Error('chart-fragment: unknown shape ' + shape);
  const cells = rots[rot];
  if (!cells) throw new Error('chart-fragment: shape ' + shape + ' has no rotation ' + rot);
  const w = Math.max(...cells.map((x) => x[1])) + 1;
  const h = Math.max(...cells.map((x) => x[0])) + 1;
  const counts = cells.map(([r, c]) => neighbourCount(cells, r, c));
  const hubIdx = cells.findIndex((_, i) => counts[i] === cells.length - 1);
  const min = Math.min(...counts);
  const extremities = cells.map((_, i) => i).filter((i) => counts[i] === min);
  return { cells, w, h, hub: hubIdx >= 0 ? hubIdx : null, extremities, rotations: rots.length };
}

// module-load assertion: the lists are the contract, so a typo must fail the require
for (const [name, rots] of Object.entries(SHAPES)) {
  const seen = new Set();
  rots.forEach((cells, ri) => {
    if (cells.length !== CELL_COUNT[name]) throw new Error(`chart-fragment SHAPES.${name}[${ri}]: ${cells.length} cells, declared ${CELL_COUNT[name]}`);
    const ks = cells.map(([r, c]) => key(r, c));
    if (new Set(ks).size !== ks.length) throw new Error(`chart-fragment SHAPES.${name}[${ri}]: a cell repeats`);
    if (Math.min(...cells.map((x) => x[0])) !== 0 || Math.min(...cells.map((x) => x[1])) !== 0) throw new Error(`chart-fragment SHAPES.${name}[${ri}]: not normalised to (0,0)`);
    const { w, h } = shapeInfo(name, ri);
    if (w > 4 || h > 4) throw new Error(`chart-fragment SHAPES.${name}[${ri}]: ${w}x${h} exceeds 4x4`);
    if (!connected(cells)) throw new Error(`chart-fragment SHAPES.${name}[${ri}]: not 4-connected`);
    const sig = ks.slice().sort().join('|');
    if (seen.has(sig)) throw new Error(`chart-fragment SHAPES.${name}[${ri}]: rotation repeats another`);
    seen.add(sig);
  });
}
for (const [name, u] of Object.entries(UNITS)) {
  const n = (u.end - u.start) / u.step + 1;
  if (!Number.isInteger(n) || n % 10 !== 0) throw new Error(`chart-fragment UNITS.${name}: ${n} values is not a whole number of rows`);
}

function valueAt({ origin, step = 1 }, r, c) { return origin + step * (10 * r + c); }

/* ------------------------------------------------------------------ piece */
function chartFragment({ shape, rot = 0, origin, anchorIdx, printed = 'anchor', wrongIdx = null, wrongValue = null, cell = 60, start = 1, end = 100, step = 1, fontSize = 26, shadow = true, anchorTint = null }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const info = shapeInfo(shape, rot);
  const { cells, w, h } = info;
  if (!(anchorIdx >= 0 && anchorIdx < cells.length)) throw new Error('chartFragment: anchorIdx ' + anchorIdx + ' outside the shape');
  if (!Number.isInteger(origin)) throw new Error('chartFragment: origin must be an integer');
  if (printed !== 'anchor' && printed !== 'all') throw new Error('chartFragment: printed must be anchor|all');
  if (wrongIdx != null && (printed !== 'all' || !(wrongIdx >= 0 && wrongIdx < cells.length) || !Number.isInteger(wrongValue))) throw new Error('chartFragment: wrongIdx needs printed:all, a cell index and an integer wrongValue');
  const pad = 4;
  const W = w * cell + pad * 2;
  const H = h * cell + pad * 2;
  const set = new Set(cells.map(([r, c]) => key(r, c)));
  const inShape = (r, c) => set.has(key(r, c));
  const x0 = (c) => pad + c * cell;
  const y0 = (r) => pad + r * cell;
  const v = (r, c) => valueAt({ origin, step }, r, c);
  const [ar, ac] = cells[anchorIdx];
  const anchor = v(ar, ac);
  // the tealSoft anchor tint: always on a write-in piece; on a printed:'all' piece only when asked
  // (F4 hunts ONE wrong cell — a tinted 'surely right' cell would shrink the search; F1 identifies a
  // piece by its printed values, not by a highlight)
  const tint = anchorTint == null ? printed === 'anchor' : !!anchorTint;
  const parts = [];

  // 1. shadow: the shape's boundary as one path, offset (+3,+3), creamDeep, softened corners
  if (shadow) {
    const loops = boundaryLoops(cells, cell, pad);
    parts.push(el('path', { d: loops.map((lp) => 'M' + lp.map(([x, y]) => (x + 3) + ' ' + (y + 3)).join('L') + 'Z').join(''), fill: t.color.creamDeep, stroke: t.color.creamDeep, 'stroke-width': 4, 'stroke-linejoin': 'round' }));
  }
  // 2. cell grounds: white, the anchor's tealSoft to the square edge (so no white sliver shows
  //    between its rounded teal rim and the piece outline — measured on the first d3 render)
  cells.forEach(([r, c], i) => parts.push(roundedRect({ x: x0(c), y: y0(r), w: cell, h: cell, r: 0, fill: tint && i === anchorIdx ? t.color.tealSoft : t.color.white })));
  // 3. shared interior edges, 1 px grid, each drawn once
  for (const [r, c] of cells) {
    if (inShape(r, c + 1)) parts.push(line({ x1: x0(c + 1), y1: y0(r) + 3, x2: x0(c + 1), y2: y0(r) + cell - 3, strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
    if (inShape(r + 1, c)) parts.push(line({ x1: x0(c) + 3, y1: y0(r + 1), x2: x0(c) + cell - 3, y2: y0(r + 1), strokeColor: t.color.grid, strokeWidth: 1, cap: 'butt' }));
  }
  // 4. cell contents
  const values = [];
  cells.forEach(([r, c], i) => {
    const val = v(r, c);
    values.push(val);
    const rc = r + ',' + c;
    if (i === anchorIdx) {
      parts.push(roundedRect({ x: x0(c) + 2, y: y0(r) + 2, w: cell - 4, h: cell - 4, r: 5, fill: tint ? t.color.tealSoft : t.color.white, strokeColor: tint ? t.color.teal : undefined, strokeWidth: tint ? 2 : undefined, data: { 'data-lcs-rc': rc, 'data-lcs-given': val } }));
      parts.push(label({ x: x0(c) + cell / 2, y: y0(r) + cell / 2 + 1, text: val, size: fontSize, color: t.color.ink, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-anchor': val } }));
    } else if (printed === 'all') {
      const isWrong = wrongIdx === i;
      const shown = isWrong ? wrongValue : val;
      parts.push(roundedRect({ x: x0(c) + 2, y: y0(r) + 2, w: cell - 4, h: cell - 4, r: 5, fill: t.color.white, data: { 'data-lcs-rc': rc } }));
      parts.push(label({ x: x0(c) + cell / 2, y: y0(r) + cell / 2 + 1, text: shown, size: fontSize, color: t.color.ink, fontFamily: t.font.display, weight: 700, data: isWrong ? { 'data-lcs-wrong': shown } : { 'data-lcs-cell': val } }));
    } else {
      parts.push(roundedRect({ x: x0(c) + 4, y: y0(r) + 4, w: cell - 8, h: cell - 8, r: 6, fill: t.color.white, strokeColor: t.color.grid, strokeWidth: 2, dash: '5 4', data: { 'data-lcs-rc': rc, 'data-lcs-answer': val } }));
    }
  });
  // 5. outline: every cell edge whose neighbour is outside the shape, teal 3 px, round caps
  for (const [r, c] of cells) {
    if (!inShape(r - 1, c)) parts.push(line({ x1: x0(c), y1: y0(r), x2: x0(c + 1), y2: y0(r), strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }));
    if (!inShape(r + 1, c)) parts.push(line({ x1: x0(c), y1: y0(r + 1), x2: x0(c + 1), y2: y0(r + 1), strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }));
    if (!inShape(r, c - 1)) parts.push(line({ x1: x0(c), y1: y0(r), x2: x0(c), y2: y0(r + 1), strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }));
    if (!inShape(r, c + 1)) parts.push(line({ x1: x0(c + 1), y1: y0(r), x2: x0(c + 1), y2: y0(r + 1), strokeColor: t.color.teal, strokeWidth: t.stroke.primitive }));
  }

  const data = {
    'data-lcs-prim': 'chart-fragment', 'data-lcs-shape': shape, 'data-lcs-rot': rot, 'data-lcs-w': w, 'data-lcs-h': h,
    'data-lcs-origin': origin, 'data-lcs-anchor': anchor, 'data-lcs-anchor-idx': anchorIdx, 'data-lcs-cellpx': cell,
    'data-lcs-start': start, 'data-lcs-end': end, 'data-lcs-step': step, 'data-lcs-printed': printed,
  };
  if (wrongIdx != null) data['data-lcs-wrong-idx'] = wrongIdx;
  return {
    svg: svgRoot({ width: W, height: H, label: 'chart piece' }, parts.join(''), data),
    width: W, height: H,
    meta: { shape, rot, w, h, origin, anchor, anchorIdx, values, cell, start, end, step, printed, wrongIdx, wrongValue },
  };
}

/** Boundary of a polyomino as closed loops of (x,y) px points (clockwise per loop). */
function boundaryLoops(cells, cell, pad) {
  const set = new Set(cells.map(([r, c]) => key(r, c)));
  const inShape = (r, c) => set.has(key(r, c));
  // directed boundary edges, shape kept on the right-hand side when walking clockwise on screen
  const edges = new Map();   // from "x,y" -> [[x,y] to, ...] (a pinch vertex may start two edges)
  const add = (a, b) => { const k = key(a[0], a[1]); if (!edges.has(k)) edges.set(k, []); edges.get(k).push(b); };
  for (const [r, c] of cells) {
    const x = pad + c * cell, y = pad + r * cell;
    if (!inShape(r - 1, c)) add([x, y], [x + cell, y]);                 // top edge, left → right
    if (!inShape(r, c + 1)) add([x + cell, y], [x + cell, y + cell]);   // right edge, top → bottom
    if (!inShape(r + 1, c)) add([x + cell, y + cell], [x, y + cell]);   // bottom edge, right → left
    if (!inShape(r, c - 1)) add([x, y + cell], [x, y]);                 // left edge, bottom → top
  }
  const loops = [];
  while (edges.size) {
    const startKey = edges.keys().next().value;
    const loop = [];
    let k = startKey;
    let guard = 0;
    while (edges.has(k) && guard++ < 1000) {
      const [x, y] = k.split(',').map(Number);
      loop.push([x, y]);
      const outs = edges.get(k);
      const next = outs.shift();
      if (!outs.length) edges.delete(k);
      k = key(next[0], next[1]);
    }
    loops.push(loop);
  }
  return loops;
}

/* ------------------------------------------------------------------ board (F1) */
/** The values a chartOutline prints as guides: 'edges' = row 1 + column 1; 'rich' adds every multiple of 10 + column 10; 'corners' = start + end. */
function guideValues({ start = 1, end = 100, step = 1, guides = 'edges' }) {
  const cols = 10;
  const count = (end - start) / step + 1;
  const out = [];
  for (let i = 0; i < count; i++) {
    const v = start + i * step;
    const r = Math.floor(i / cols), c = i % cols;
    const isGuide = guides === 'corners' ? (i === 0 || i === count - 1)
      : (r === 0 || c === 0 || (guides === 'rich' && (v % 10 === 0 || c === cols - 1)));
    if (isGuide) out.push(v);
  }
  return out;
}

function chartOutline({ start = 1, end = 100, step = 1, cell = 46, guides = 'edges', targets = [], fontSize = 16 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const cols = 10;
  const count = (end - start) / step + 1;
  const rows = count / cols;
  if (!Number.isInteger(rows)) throw new Error('chartOutline: ' + count + ' values is not a whole number of rows');
  if (!['edges', 'rich', 'corners'].includes(guides)) throw new Error('chartOutline: guides must be edges|rich|corners');
  const pad = 4;
  const W = cols * cell + pad * 2;
  const H = rows * cell + pad * 2;
  const targetOf = new Map();
  for (const tg of targets) for (const v of tg.values || []) {
    if (targetOf.has(v)) throw new Error('chartOutline: value ' + v + ' targeted twice');
    targetOf.set(v, tg.k);
  }
  const parts = [roundedRect({ x: pad / 2, y: pad / 2, w: W - pad, h: H - pad, r: 10, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: t.stroke.primitive })];
  const guideCells = new Set(guideValues({ start, end, step, guides }));
  for (let i = 0; i < count; i++) {
    const v = start + i * step;
    const r = Math.floor(i / cols), c = i % cols;
    const cx = pad + c * cell, cy = pad + r * cell;
    if (guideCells.has(v)) {
      if (targetOf.has(v)) throw new Error('chartOutline: target ' + v + ' sits on a printed guide');
      parts.push(label({ x: cx + cell / 2, y: cy + cell / 2 + 1, text: v, size: fontSize, color: t.color.inkSoft, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-guide': v } }));
    } else if (targetOf.has(v)) {
      parts.push(roundedRect({ x: cx, y: cy, w: cell, h: cell, r: 0, fill: t.color.white, data: { 'data-lcs-target': targetOf.get(v), 'data-lcs-answer': v } }));
    }
    if (c !== cols - 1) parts.push(line({ x1: cx + cell, y1: cy + 3, x2: cx + cell, y2: cy + cell - 3, strokeColor: t.color.inkSoft, strokeWidth: t.stroke.grid, cap: 'butt' }));
    if (r !== rows - 1) parts.push(line({ x1: cx + 3, y1: cy + cell, x2: cx + cell - 3, y2: cy + cell, strokeColor: t.color.inkSoft, strokeWidth: t.stroke.grid, cap: 'butt' }));
  }
  return {
    svg: svgRoot({ width: W, height: H, label: 'number chart' }, parts.join(''), { 'data-lcs-board': 1, 'data-lcs-start': start, 'data-lcs-end': end, 'data-lcs-step': step, 'data-lcs-cellpx': cell, 'data-lcs-guides': guides }),
    width: W, height: H,
    meta: { start, end, step, rows, cols, guides: [...guideCells], targets: [...targetOf.entries()] },
  };
}

module.exports = { chartFragment, chartOutline, guideValues, SHAPES, UNITS, CELL_COUNT, shapeInfo, valueAt, boundaryLoops };
