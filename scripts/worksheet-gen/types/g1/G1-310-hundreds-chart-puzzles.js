/**
 * G1-310 — Hundreds Chart Puzzle Pieces: Fill In the Numbers (nt20-C;
 * `hundreds-chart-puzzles`, G1, 1.NBT.C.5 + 1.NBT.B.2). Design:
 * docs/worksheet-gen/b3-designs/G1-310-hundreds-chart-puzzles.md §2/§5.
 *
 * Six pieces cut out of the hundreds chart, ONE number each, on six numbered
 * cards (2 × 3). Each piece is a teal-outlined polyomino (sq3 / plus / L3 /
 * T3 …) lifted off the chart on a creamDeep shadow; one cell is the tealSoft
 * ANCHOR and prints its number, every other cell is a white grey-dashed blank.
 * The child reasons from the anchor (right = +1, down = +10) and writes the
 * rest. Loose pieces, never fragments drawn on a board: drawn in place the page
 * collapses into G1-129 and the child counts along the board; loose pieces
 * force the 2-D place-value step (row = tens, column = ones).
 *
 * THEMELESS (§1): numerals only, not even G1-129's corner flourish (a picture
 * on a puzzle page reads as a clue). The chart RANGE is the unit (`unitAxis`,
 * the README's ONE fan mechanism): '1-100' (exemplar) · '0-99' · '1-120' ·
 * '101-200' · 'tens' (G2-face-only: the base REFUSES it). build() reads ONLY
 * data/b3/hundreds-chart-puzzles.js (`exemplar` + strings) — the shapes and
 * units are code in primitives/chart-fragment.js.
 *
 * Generation: per piece the anchor is drawn UNIFORMLY from the computed LEGAL
 * origin set (column rule + range + disjoint bounding boxes on the chart +
 * the d1 inner-ring rule), never by trial-and-error with a guard; a page is
 * rejected only for the ≥ 4-anchor-rows rule. Values are distinct on the page
 * by construction (disjoint cells) and verify() re-derives that anyway.
 *
 * Answer hiding: only the anchor prints. Ground truth rides on data-lcs-*
 * (piece root: shape/rot/w/h/origin/anchor/anchor-idx/cellpx/start/end/step;
 * every cell `data-lcs-rc`; blanks `data-lcs-answer`); verify(page) re-derives
 * every value by position arithmetic `v(r,c) = origin + step*(10r + c)`, the
 * column rule (no row-edge wrap), the range, 4-connectivity, one anchor per
 * piece, no `<text>` on a blank, page-wide distinct values, disjoint bounding
 * boxes, anchors on ≥ 4 chart rows, and the d1 one-move / no-tens rules.
 *
 * Chrome budget (README ruling): body 722 with a 3-line title + 3-line
 * instruction. `cardGrid({cols:2, rows:3})` rows `minmax(0,1fr)`, gap 14 →
 * card 231 → inner 302 × 203 (padding 12 + border 2); every `.ws-card-stage`
 * carries inline `padding:0` (the default `6px 4px` leaves 191 < 188).
 * d2 piece = 3 × 60 + 8 = 188 (slack 15); d1 = compass 46 + 14 + cards 207
 * → inner 179 vs 3 × 56 + 8 = 176; d3 rect4x3 = 232 × 176 at cell 56.
 * Guards key on the RESOLVED config (`d.shapes / d.anchorAt / d.cell /
 * d.compass / d.innerRows / d.noTens`), never on the level index.
 *
 * Phase-2 faces (2026-09-14; design §3): the additive `mode` knob — 'place'
 * (G1-347) · 'jumps' (G2-321) · 'riddle' (G2-322) · 'error' (G1-348) ·
 * 'distance' (G2-323) — dispatched by _buildWith BEFORE the base path and by
 * verify() on the `data-lcs-mode` stamp a face alone writes; see the block
 * "Phase-2 faces" below. Rows: tools/b3var-rows/hundreds-chart-puzzles.js.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { chartFragment, chartOutline, guideValues, UNITS, shapeInfo, valueAt } = require('../../primitives/chart-fragment.js');
const C3 = require('../../templates/components-b3.js');
const { chartCompass } = C3;
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const BANK = 'hundreds-chart-puzzles';
const COLS = 10;
const GRID_COLS = 2;
const MIN_ANCHOR_ROWS = 4;
const PAGE_ATTEMPTS = 300;

/** The rows of a unit (every UNITS entry is a whole number of rows — asserted at primitive load). */
function unitRows(U) { return ((U.end - U.start) / U.step + 1) / COLS; }

/**
 * Place the page's pieces on the chart: for each piece the LEGAL origin set is
 * computed (column rule, range, inner-ring, free bounding box, no-tens on the
 * piece's cells) and one origin is drawn uniformly. Returns null when a piece
 * has no legal origin (the caller retries the page with a fresh order).
 */
function placePieces(rng, d, U, shapesInOrder) {
  const rows = unitRows(U);
  const occupied = new Set();   // "r,c" of every placed bounding-box cell
  const placed = [];
  for (const shape of shapesInOrder) {
    const info = shapeInfo(shape, 0);
    const rot = rng.int(0, info.rotations - 1);
    const { cells, w, h, hub, extremities } = shapeInfo(shape, rot);
    const legal = [];
    const rMin = d.innerRows ? 1 : 0;
    const rMax = d.innerRows ? rows - 2 : rows - 1;
    for (let r = rMin; r + h - 1 <= rMax; r++) {
      for (let c = 0; c + w - 1 <= COLS - 1; c++) {
        let ok = true;
        for (let dr = 0; dr < h && ok; dr++) for (let dc = 0; dc < w; dc++) if (occupied.has((r + dr) + ',' + (c + dc))) { ok = false; break; }
        if (!ok) continue;
        const origin = U.start + U.step * (COLS * r + c);
        if (d.noTens && cells.some(([cr, cc]) => valueAt({ origin, step: U.step }, cr, cc) % 10 === 0)) continue;
        if (origin < U.start || valueAt({ origin, step: U.step }, h - 1, w - 1) > U.end) continue;   // the range rule, stated even though the loops imply it
        legal.push({ r, c, origin });
      }
    }
    if (!legal.length) return null;
    const at = rng.pick(legal);
    let anchorIdx;
    if (d.anchorAt === 'any') anchorIdx = rng.int(0, cells.length - 1);
    else if (d.anchorAt === 'centre') { if (hub == null) throw new Error(`G1-310: anchorAt:centre but shape ${shape} rot ${rot} has no hub cell`); anchorIdx = hub; }
    else if (d.anchorAt === 'corner') anchorIdx = rng.pick(extremities);
    else throw new Error('G1-310: unknown anchorAt ' + d.anchorAt);
    for (let dr = 0; dr < h; dr++) for (let dc = 0; dc < w; dc++) occupied.add((at.r + dr) + ',' + (at.c + dc));
    const [ar, ac] = cells[anchorIdx];
    placed.push({ shape, rot, origin: at.origin, anchorIdx, anchorRow: at.r + ar, anchor: valueAt({ origin: at.origin, step: U.step }, ar, ac) });
  }
  return placed;
}

/* ================================================================== Phase-2 faces (the `mode` knob, 2026-09-14)
 * Five CODE faces (design §3), each an additive `mode` on the resolved config, dispatched by
 * _buildWith BEFORE the base path (a config without `mode` is byte-identical — tools/b3-baseline.js):
 *   'place'    G1-347  the F1 board: four fully printed pieces under an almost empty chart; the child
 *                      finds each piece's place and writes its numbers into the board's target cells
 *   'jumps'    G2-321  eight [start][3 arrow chips][pointer][box] chains; write the landing
 *   'riddle'   G2-322  eight riddles: two one-move clues converge on ONE box (language-free)
 *   'error'    G1-348  six fully printed pieces, exactly ONE wrong number each; circle it, write the right one
 *   'distance' G2-323  eight [A][>][B] pairs; count the jumps down and right (two counters)
 * Every face composes from the ONE position formula (row = tens, column = ones) and verify() re-derives
 * from the stamps. `opts.items` (gate seam) injects pre-composed items that are DRAWN as asked — the
 * composer's rules are enforced by verify, so a gate can inject an illegal item as a poison.
 */
const FACE_G2 = new Set(['jumps', 'riddle', 'distance']);   // the tens unit is legal here only
const FACE_BODY_WORST = 710;                                 // measured worst legal chrome (record deviation 7)
const FACE_ATTEMPTS = 300;
const MOVE = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
const REVERSE = { U: 'D', D: 'U', L: 'R', R: 'L' };
const ERROR_KINDS = ['pm1', 'pm10', 'pm9', 'pm11', 'swap'];
const G2_COMPASS_CHIP = 36;   // the G2 element floor; the base's d1 legend keeps its own 32 (byte-identical)

function faceUnit(d, bankLoc, unit) {
  const u = unit || bankLoc.exemplar;
  const U = UNITS[u];
  if (!U) throw new Error(`G1-310 ${d.mode}: unknown unit "${u}" (a key of UNITS: ${Object.keys(UNITS).join(', ')})`);
  if (U.g2Only && !FACE_G2.has(d.mode)) throw new Error(`G1-310 ${d.mode}: unit "${u}" is G2-face-only (a G1 face refuses it)`);
  return { u, U };
}
/** Position of a chart value: index, row, column (the ONE formula, inverted). */
function posOf(U, v) { const i = (v - U.start) / U.step; return { i, r: Math.floor(i / COLS), c: ((i % COLS) + COLS) % COLS }; }
function valAt(U, r, c) { return U.start + U.step * (COLS * r + c); }
/** One move under the column rule + range; null when illegal. */
function moveFrom(U, rows, v, m) {
  const p = posOf(U, v);
  if (!Number.isInteger(p.i) || p.i < 0 || p.r >= rows) return null;
  const nr = p.r + MOVE[m][0], nc = p.c + MOVE[m][1];
  if (nc < 0 || nc > COLS - 1 || nr < 0 || nr > rows - 1) return null;
  return valAt(U, nr, nc);
}
/** The tens-and-ones digit swap (147 → 174); null when it does not change the value. */
function digitSwap(v) {
  const s = String(v);
  if (s.length < 2) return null;
  const t = s.slice(0, -2) + s[s.length - 1] + s[s.length - 2];
  const n = +t;
  return n !== v && !/^0/.test(t) ? n : null;
}
function stage(inner, extra = '') { return `<div class="ws-card-stage" style="padding:0${extra}">${inner}</div>`; }
function gridWrap(html) { return `<div style="flex:1 1 auto;display:flex;flex-direction:column;width:100%;min-height:0">${html}</div>`; }

/* ---------------- F1 place ---------------- */
function generatePlacePieces(G, guides) {
  const { d, U, rows, rng } = G;
  for (let attempt = 0; attempt < FACE_ATTEMPTS; attempt++) {
    const shapes = rng.sample(d.piecePool, d.pieces);
    const occupied = new Set();
    const placed = [];
    let ok = true;
    for (const shape of shapes) {
      const rot = rng.int(0, shapeInfo(shape, 0).rotations - 1);
      const { cells, w, h } = shapeInfo(shape, rot);
      const legal = [];
      for (let r = 0; r + h - 1 <= rows - 1; r++) for (let c = 0; c + w - 1 <= COLS - 1; c++) {
        let free = true;
        for (let dr = 0; dr < h && free; dr++) for (let dc = 0; dc < w; dc++) if (occupied.has((r + dr) + ',' + (c + dc))) { free = false; break; }
        if (!free) continue;
        if (cells.some(([cr, cc]) => guides.has(valAt(U, r + cr, c + cc)))) continue;   // a piece never covers a printed guide
        legal.push({ r, c });
      }
      if (!legal.length) { ok = false; break; }
      const at = rng.pick(legal);
      for (let dr = 0; dr < h; dr++) for (let dc = 0; dc < w; dc++) occupied.add((at.r + dr) + ',' + (at.c + dc));
      placed.push({ shape, rot, origin: valAt(U, at.r, at.c), anchorIdx: rng.int(0, cells.length - 1) });
    }
    if (ok) return placed;
  }
  throw new Error(`G1-310 place: no legal page for ${d.pieces} pieces on ${G.u}`);
}
function buildPlace(G, items) {
  const { d, U, rows } = G;
  const pieceH = 3 * d.pieceCell + 8;
  let cell = d.boardCell;
  const boardH = (c) => rows * c + 8;
  if (boardH(cell) + 14 + pieceH > FACE_BODY_WORST) cell = 44;   // a 12-row chart (1-120) drops to the G1 floor cell
  if (cell < 44 || boardH(cell) + 14 + pieceH > FACE_BODY_WORST) throw new Error(`G1-310 place: a ${rows}-row board does not fit the ${FACE_BODY_WORST} body at the 44 px floor (refused)`);
  const guides = new Set(guideValues({ start: U.start, end: U.end, step: U.step, guides: d.guides }));
  const placed = items || generatePlacePieces(G, guides);
  const frags = placed.map((p) => chartFragment({ shape: p.shape, rot: p.rot, origin: p.origin, anchorIdx: p.anchorIdx, printed: 'all', anchorTint: false, cell: d.pieceCell, fontSize: d.pieceFont, start: U.start, end: U.end, step: U.step }));
  for (const f of frags) if (f.meta.w > 3 || f.meta.h > 3) throw new Error(`G1-310 place: piece ${f.meta.shape} is ${f.meta.w}x${f.meta.h}; the row of ${placed.length} holds 3x3 pieces only`);
  const rowW = frags.reduce((n, f) => n + f.width, 0) + (frags.length - 1) * d.pieceGap;
  if (rowW > 675) throw new Error(`G1-310 place: the piece row is ${rowW} > 675`);
  const targets = frags.map((f, k) => ({ k: k + 1, values: f.meta.values }));
  const board = chartOutline({ start: U.start, end: U.end, step: U.step, cell, guides: d.guides, targets, fontSize: d.boardFont });
  const inner = `<div style="display:flex;justify-content:center">${board.svg}</div>` +
    `<div style="display:flex;justify-content:center;gap:${d.pieceGap}px">` +
    frags.map((f, k) => `<span data-lcs-piece="${k + 1}" style="display:inline-flex">${f.svg}</span>`).join('') + `</div>`;
  const stamps = `data-lcs-pieces-n="${placed.length}" data-lcs-guides="${d.guides}" data-lcs-cellpx="${d.pieceCell}" data-lcs-boardpx="${cell}"`;
  return { inner, stamps, meta: { pieces: frags.map((f) => f.meta), boardCell: cell } };
}

/* ---------------- F2 jumps ---------------- */
function walkChain(G, start) {
  const { d, U, rows, rng } = G;
  const moves = [];
  let v = start;
  for (let i = 0; i < d.arrows; i++) {
    const legal = ['U', 'D', 'L', 'R'].filter((m) => moveFrom(U, rows, v, m) != null && !(d.noReverse && moves.length && m === REVERSE[moves[moves.length - 1]]));
    if (!legal.length) return null;
    const m = rng.pick(legal);
    moves.push(m);
    v = moveFrom(U, rows, v, m);
  }
  return { start, moves, answer: v };
}
function generateChains(G) {
  const { d, U, rows, rng } = G;
  const count = rows * COLS;
  for (let attempt = 0; attempt < FACE_ATTEMPTS; attempt++) {
    const used = new Set();
    const chains = [];
    let ok = true;
    for (let i = 0; i < d.items; i++) {
      let ch = null;
      for (let t = 0; t < 60 && !ch; t++) {
        const c = walkChain(G, U.start + U.step * rng.int(0, count - 1));
        if (c && !used.has(c.start) && !used.has(c.answer) && c.start !== c.answer) ch = c;
      }
      if (!ch) { ok = false; break; }
      used.add(ch.start); used.add(ch.answer);
      chains.push(ch);
    }
    if (!ok) continue;
    if (chains.every((c) => c.answer > c.start) || chains.every((c) => c.answer < c.start)) continue;   // landings on both sides of their starts
    return chains;
  }
  throw new Error(`G1-310 jumps: no legal page of ${d.items} chains on ${G.u}`);
}
function buildJumps(G, items) {
  const { d, U } = G;
  const chains = items || generateChains(G);
  const cards = chains.map((ch) => stage(C3.jumpChain({ start: ch.start, moves: ch.moves, step: U.step, answer: ch.answer == null ? null : ch.answer, showSteps: !!d.showSteps, pointer: d.pointer !== false, chip: d.chip, gap: d.gap })));
  const inner = chartCompass({ step: U.step, chip: G2_COMPASS_CHIP }) + gridWrap(cardGrid({ cards, cols: GRID_COLS, rows: cards.length / GRID_COLS, numbered: true }));
  const stamps = `data-lcs-items-n="${chains.length}" data-lcs-arrows="${d.arrows}" data-lcs-noreverse="${d.noReverse ? 1 : 0}"`;
  return { inner, stamps, meta: { chains } };
}

/* ---------------- F3 riddle ---------------- */
function generateRiddles(G) {
  const { d, U, rows, rng } = G;
  for (let attempt = 0; attempt < FACE_ATTEMPTS; attempt++) {
    const used = new Set();
    const riddles = [];
    let ok = true;
    for (let i = 0; i < d.items; i++) {
      let rd = null;
      for (let t = 0; t < 80 && !rd; t++) {
        const r = rng.int(1, rows - 2), c = rng.int(0, COLS - 1);   // rows 1..rows-2: both tens clues legal
        const target = valAt(U, r, c);
        const tens = rng.pick([{ start: valAt(U, r - 1, c), move: 'D' }, { start: valAt(U, r + 1, c), move: 'U' }]);
        const onesOpts = [];
        if (c >= 1) onesOpts.push({ start: valAt(U, r, c - 1), move: 'R' });
        if (c <= COLS - 2) onesOpts.push({ start: valAt(U, r, c + 1), move: 'L' });
        const ones = rng.pick(onesOpts);
        const clues = rng.int(0, 1) ? [tens, ones] : [ones, tens];
        const vals = [target, tens.start, ones.start];
        if (new Set(vals).size === 3 && vals.every((v) => !used.has(v))) rd = { clues, answer: target };
      }
      if (!rd) { ok = false; break; }
      used.add(rd.answer); rd.clues.forEach((c) => used.add(c.start));
      riddles.push(rd);
    }
    if (ok) return riddles;
  }
  throw new Error(`G1-310 riddle: no legal page of ${d.items} riddles on ${G.u}`);
}
function buildRiddle(G, items) {
  const { d, U } = G;
  const riddles = items || generateRiddles(G);
  const cards = riddles.map((r) => stage(C3.chartRiddle({ clues: r.clues, answer: r.answer, step: U.step, chip: d.chip, box: d.box, gap: d.gap })));
  const inner = chartCompass({ step: U.step, chip: G2_COMPASS_CHIP }) + gridWrap(cardGrid({ cards, cols: GRID_COLS, rows: cards.length / GRID_COLS, numbered: true }));
  const stamps = `data-lcs-items-n="${riddles.length}" data-lcs-kinds="${d.kinds.join(',')}"`;
  return { inner, stamps, meta: { riddles } };
}

/* ---------------- F4 error ---------------- */
function wrongCandidates(U, trueVal, forbidden) {
  const out = [];
  const push = (v) => { if (Number.isInteger(v) && v >= U.start && v <= U.end && v !== trueVal && !forbidden.has(v) && !out.includes(v)) out.push(v); };
  for (const k of [1, 10, 9, 11]) { push(trueVal + k * U.step); push(trueVal - k * U.step); }
  push(digitSwap(trueVal));
  return out;
}
function generateErrorPieces(G) {
  const { d, U, rng } = G;
  const placeCfg = { innerRows: false, noTens: false, anchorAt: 'any' };
  for (let attempt = 0; attempt < FACE_ATTEMPTS; attempt++) {
    const placed = placePieces(rng, placeCfg, U, rng.shuffle(d.shapes));
    if (!placed) continue;
    const allTrue = new Set();
    for (const p of placed) for (const [r, c] of shapeInfo(p.shape, p.rot).cells) allTrue.add(valAt(U, posOf(U, p.origin).r + r, posOf(U, p.origin).c + c));
    const cleanIdx = new Set(rng.sample(placed.map((_, i) => i), d.cleanPieces || 0));
    const forbidden = new Set(allTrue);
    let ok = true;
    const pieces = placed.map((p, i) => {
      const { cells } = shapeInfo(p.shape, p.rot);
      if (cleanIdx.has(i)) return { ...p, wrongIdx: null, wrongValue: null };
      const wrongIdx = rng.int(0, cells.length - 1);
      const anchorIdx = wrongIdx === p.anchorIdx ? rng.pick(cells.map((_, k) => k).filter((k) => k !== wrongIdx)) : p.anchorIdx;
      const o = posOf(U, p.origin);
      const trueVal = valAt(U, o.r + cells[wrongIdx][0], o.c + cells[wrongIdx][1]);
      const cands = wrongCandidates(U, trueVal, forbidden);
      if (!cands.length) { ok = false; return null; }
      const wrongValue = rng.pick(cands);
      forbidden.add(wrongValue);
      return { ...p, anchorIdx, wrongIdx, wrongValue };
    });
    if (ok) return pieces;
  }
  throw new Error(`G1-310 error: no legal page for ${JSON.stringify(d.shapes)} on ${G.u}`);
}
function buildError(G, items) {
  const { d, U } = G;
  if (d.cell < 52) throw new Error(`G1-310 error: cell ${d.cell} leaves a label cell below the G1 floor 44`);
  const pieces = items || generateErrorPieces(G);
  const cards = pieces.map((p) => {
    const frag = chartFragment({ shape: p.shape, rot: p.rot, origin: p.origin, anchorIdx: p.anchorIdx, printed: 'all', anchorTint: false, wrongIdx: p.wrongIdx == null ? null : p.wrongIdx, wrongValue: p.wrongIdx == null ? null : p.wrongValue, cell: d.cell, fontSize: d.fontSize, start: U.start, end: U.end, step: U.step });
    const trueVal = p.wrongIdx == null ? '' : frag.meta.values[p.wrongIdx];
    const box = C3.blankNumeralBox({ w: d.box.w, h: d.box.h, answer: trueVal, attrs: 'data-lcs-errbox' + (p.wrongIdx == null ? ' data-lcs-clean' : '') });
    return stage(frag.svg + box, `;gap:${d.gap}px;justify-content:flex-start;padding-left:${d.padLeft}px`);   // padLeft keeps the piece clear of the 30 px badge under 3-line chrome (measured: centred = 27 px)
  });
  const inner = gridWrap(cardGrid({ cards, cols: GRID_COLS, rows: cards.length / GRID_COLS, numbered: true }));
  const stamps = `data-lcs-pieces-n="${pieces.length}" data-lcs-clean-n="${d.cleanPieces || 0}" data-lcs-cellpx="${d.cell}" data-lcs-kinds="${ERROR_KINDS.join(',')}"`;
  return { inner, stamps, meta: { pieces } };
}

/* ---------------- F5 distance ---------------- */
function generatePairs(G) {
  const { d, U, rows, rng } = G;
  for (let attempt = 0; attempt < FACE_ATTEMPTS; attempt++) {
    const used = new Set();
    const pairs = [];
    let ok = true;
    for (let i = 0; i < d.items; i++) {
      let pr = null;
      for (let t = 0; t < 80 && !pr; t++) {
        const r = rng.int(0, rows - 1), c = rng.int(0, COLS - 1);
        const down = rng.int(d.counterMin, d.counterMax), right = rng.int(d.counterMin, d.counterMax);
        if (r + down > rows - 1 || c + right > COLS - 1) continue;
        const a = valAt(U, r, c), b = valAt(U, r + down, c + right);
        if (a !== b && !used.has(a) && !used.has(b)) pr = { a, b, down, right };
      }
      if (!pr) { ok = false; break; }
      used.add(pr.a); used.add(pr.b);
      pairs.push(pr);
    }
    if (!ok) continue;
    if (pairs.length > 1 && (pairs.every((p) => p.down === pairs[0].down) || pairs.every((p) => p.right === pairs[0].right))) continue;   // counters never constant
    return pairs;
  }
  throw new Error(`G1-310 distance: no legal page of ${d.items} pairs on ${G.u}`);
}
function buildDistance(G, items) {
  const { d } = G;
  const pairs = items || generatePairs(G);
  const cards = pairs.map((p) => stage(C3.chartDistance({ a: p.a, b: p.b, down: p.down, right: p.right, chip: d.chip, box: d.box, gap: d.gap })));
  const inner = chartCompass({ step: G.U.step, chip: G2_COMPASS_CHIP }) + gridWrap(cardGrid({ cards, cols: GRID_COLS, rows: cards.length / GRID_COLS, numbered: true }));
  const stamps = `data-lcs-items-n="${pairs.length}" data-lcs-cmin="${d.counterMin}" data-lcs-cmax="${d.counterMax}"`;
  return { inner, stamps, meta: { pairs } };
}

function buildFace(bankLoc, d, { locale, unit, items }, ctx) {
  const { u, U } = faceUnit(d, bankLoc, unit);
  const G = { d, u, U, rows: unitRows(U), rng: ctx.rng, locale };
  const B = { place: buildPlace, jumps: buildJumps, riddle: buildRiddle, error: buildError, distance: buildDistance }[d.mode];
  if (!B) throw new Error('G1-310: unknown mode ' + d.mode);
  const { inner, stamps, meta } = B(G, items || null);
  const bodyHtml = `<div data-ws-content data-lcs-hcp data-lcs-mode="${d.mode}" data-lcs-unit="${u}" data-lcs-start="${U.start}" data-lcs-end="${U.end}" data-lcs-step="${U.step}" ${stamps} ` +
    `style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;gap:14px;min-height:0">${inner}</div>`;
  return { bodyHtml, meta: { mode: d.mode, unit: u, start: U.start, end: U.end, step: U.step, ...meta } };
}

/** In-page verify for every face (values from stamps, never from text; the ONE position formula re-implemented). */
function verifyFaceInPage() {
  const fails = [];
  const root = document.querySelector('[data-lcs-hcp]');
  const mode = root.dataset.lcsMode;
  const start = +root.dataset.lcsStart, end = +root.dataset.lcsEnd, step = +root.dataset.lcsStep;
  const COLS = 10;
  const count = (end - start) / step + 1;
  const rows = count / COLS;
  if (!Number.isInteger(rows) || rows < 1) fails.push(`unit ${start}-${end} step ${step} is not a whole number of rows`);
  const idx = (v) => (v - start) / step;
  const onChart = (v) => Number.isInteger(idx(v)) && idx(v) >= 0 && idx(v) < count;
  const row = (v) => Math.floor(idx(v) / COLS), col = (v) => idx(v) % COLS;
  const move = (v, m) => {
    if (!onChart(v)) return { err: `${v} is off the chart` };
    if (m === 'R') return col(v) === COLS - 1 ? { err: `+1 from ${v} in column 9 crosses the row edge (row-edge wrap)` } : { v: v + step };
    if (m === 'L') return col(v) === 0 ? { err: `-1 from ${v} in column 0 crosses the row edge (row-edge wrap)` } : { v: v - step };
    if (m === 'U') return row(v) === 0 ? { err: `-10 from ${v} on the first row leaves the chart (out of range)` } : { v: v - 10 * step };
    if (m === 'D') return row(v) === rows - 1 ? { err: `+10 from ${v} on the last row leaves the chart (out of range)` } : { v: v + 10 * step };
    return { err: 'unknown move ' + m };
  };
  const inside = (a, b) => { const cx = (a.left + a.right) / 2, cy = (a.top + a.bottom) / 2; return cx > b.left && cx < b.right && cy > b.top && cy < b.bottom; };
  const givenText = (el, P) => {
    const want = +el.dataset.lcsGiven;
    if (el.textContent.trim() !== String(want)) fails.push(`${P}: given prints "${el.textContent.trim()}", stamp ${want}`);
    if (!onChart(want)) fails.push(`${P}: given ${want} is off the ${start}-${end} chart`);
    return want;
  };
  const boxEmpty = (el, P) => { if (el.textContent.trim()) fails.push(`${P}: the open box carries text (answer printed)`); };

  /** A fully printed piece: origin/rc geometry, column rule, range, connectivity, every label === derived (or the ONE wrong). */
  function auditPrintedPiece(svg, P) {
    const ds = svg.dataset;
    const w = +ds.lcsW, h = +ds.lcsH, origin = +ds.lcsOrigin;
    if (+ds.lcsStart !== start || +ds.lcsEnd !== end || +ds.lcsStep !== step) fails.push(`${P}: unit stamps differ from the page`);
    if (ds.lcsPrinted !== 'all') fails.push(`${P}: printed="${ds.lcsPrinted}", this face prints every cell`);
    const v = (r, c) => origin + step * (COLS * r + c);
    const cells = [...svg.querySelectorAll('[data-lcs-rc]')].map((el) => { const m = /^(\d+),(\d+)$/.exec(el.dataset.lcsRc || ''); if (!m) { fails.push(`${P}: unparsable rc`); return null; } return { r: +m[1], c: +m[2], el, val: v(+m[1], +m[2]) }; }).filter(Boolean);
    const set = new Set(cells.map((x) => x.r + ',' + x.c));
    if (set.size !== cells.length) fails.push(`${P}: a cell repeats`);
    cells.forEach((x) => { if (x.r >= h || x.c >= w) fails.push(`${P}: cell ${x.r},${x.c} outside the ${w}x${h} box`); });
    if (cells.length) {
      const seen = new Set([cells[0].r + ',' + cells[0].c]); const st = [[cells[0].r, cells[0].c]];
      while (st.length) { const [r, c] = st.pop(); for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (r + dr) + ',' + (c + dc); if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([r + dr, c + dc]); } } }
      if (seen.size !== cells.length) fails.push(`${P}: shape is not 4-connected`);
      const maxR = Math.max(...cells.map((x) => x.r)), maxC = Math.max(...cells.map((x) => x.c));
      if (Math.min(...cells.map((x) => x.r)) !== 0 || Math.min(...cells.map((x) => x.c)) !== 0 || maxR !== h - 1 || maxC !== w - 1) fails.push(`${P}: cells do not span the stamped ${w}x${h} box`);
    }
    const oi = idx(origin);
    if (!Number.isInteger(oi) || oi < 0) fails.push(`${P}: origin ${origin} is not on the chart`);
    else if ((oi % COLS) + (w - 1) > COLS - 1) fails.push(`${P}: origin ${origin} in column ${oi % COLS} with width ${w} wraps the row edge (row-edge wrap)`);
    if (origin < start) fails.push(`${P}: origin ${origin} below start (out of range)`);
    if (v(h - 1, w - 1) > end) fails.push(`${P}: bottom-right ${v(h - 1, w - 1)} above end ${end} (out of range)`);
    // labels: every cell prints exactly one <text>; it is the derived value, or the ONE stamped wrong value
    const texts = [...svg.querySelectorAll('text')];
    const wrongs = texts.filter((t) => t.hasAttribute('data-lcs-wrong'));
    const labelOf = new Map();
    texts.forEach((t) => {
      const tb = t.getBoundingClientRect();
      const host = cells.find((x) => inside(tb, x.el.getBoundingClientRect()));
      if (!host) { fails.push(`${P}: a label "${t.textContent.trim()}" sits on no cell`); return; }
      if (labelOf.has(host)) fails.push(`${P}: cell ${host.r},${host.c} carries two labels`);
      labelOf.set(host, t);
      const shown = t.textContent.trim();
      if (t.hasAttribute('data-lcs-wrong')) {
        if (shown !== t.dataset.lcsWrong) fails.push(`${P}: wrong label prints "${shown}", stamp ${t.dataset.lcsWrong}`);
        if (+shown === host.val) fails.push(`${P}: the "wrong" cell ${host.r},${host.c} prints its true value ${host.val}`);
      } else if (shown !== String(host.val)) fails.push(`${P}: cell ${host.r},${host.c} prints "${shown}", derived ${host.val} (position-inconsistent)`);
      if (t.hasAttribute('data-lcs-cell') && +t.dataset.lcsCell !== host.val) fails.push(`${P}: label stamp ${t.dataset.lcsCell} != derived ${host.val}`);
      if (t.hasAttribute('data-lcs-anchor') && +t.dataset.lcsAnchor !== host.val) fails.push(`${P}: anchor stamp ${t.dataset.lcsAnchor} != derived ${host.val}`);
    });
    cells.forEach((x) => { if (!labelOf.has(x)) fails.push(`${P}: cell ${x.r},${x.c} prints nothing on a printed piece`); });
    if (svg.querySelector('[data-lcs-answer]')) fails.push(`${P}: a printed piece carries an open cell`);
    return { cells, wrongs, w, h, origin, labelOf };
  }

  if (mode === 'place') {
    const piecesN = +root.dataset.lcsPiecesN;
    const board = root.querySelector('[data-lcs-board]');
    if (!board) return ['place: no board'];
    if (+board.dataset.lcsStart !== start || +board.dataset.lcsEnd !== end || +board.dataset.lcsStep !== step) fails.push('place: board unit stamps differ from the page');
    const guides = board.dataset.lcsGuides;
    const guideSet = new Set();
    for (let i = 0; i < count; i++) { const v = start + i * step; const r = Math.floor(i / COLS), c = i % COLS; if (guides === 'corners' ? (i === 0 || i === count - 1) : (r === 0 || c === 0 || (guides === 'rich' && (v % 10 === 0 || c === COLS - 1)))) guideSet.add(v); }
    board.querySelectorAll('[data-lcs-guide]').forEach((g) => { const v = +g.dataset.lcsGuide; if (!guideSet.has(v)) fails.push(`place: printed guide ${v} is not a ${guides} guide`); if (g.textContent.trim() !== String(v)) fails.push(`place: guide prints "${g.textContent.trim()}", stamp ${v}`); });
    const bcell = +board.dataset.lcsCellpx, bb = board.getBoundingClientRect();
    const scale = bb.width / (COLS * bcell + 8);
    const targets = [...board.querySelectorAll('[data-lcs-target]')];
    const targetOf = new Map();
    targets.forEach((t) => {
      const v = +t.dataset.lcsAnswer, k = t.dataset.lcsTarget;
      if (!onChart(v)) { fails.push(`place: target ${v} is off the chart`); return; }
      if (guideSet.has(v)) fails.push(`place: target ${v} sits on a printed guide (P6)`);
      if (targetOf.has(v)) fails.push(`place: value ${v} targeted twice (targets not disjoint, P6)`);
      targetOf.set(v, k);
      const tr = t.getBoundingClientRect();
      const ex = bb.left + (4 + col(v) * bcell) * scale, ey = bb.top + (4 + row(v) * bcell) * scale;
      if (Math.abs(tr.left - ex) > 1.5 || Math.abs(tr.top - ey) > 1.5) fails.push(`place: target ${v} drawn at row/col (${Math.round((tr.top - bb.top) / scale / bcell)},${Math.round((tr.left - bb.left) / scale / bcell)}), derived (${row(v)},${col(v)})`);
      if (t.textContent.trim()) fails.push(`place: target ${v} carries text (answer printed)`);
    });
    [...board.querySelectorAll('text')].forEach((t) => { const tb = t.getBoundingClientRect(); targets.forEach((tg) => { if (inside(tb, tg.getBoundingClientRect())) fails.push(`place: "${t.textContent.trim()}" printed inside a target (answer printed)`); }); });
    const pieces = [...root.querySelectorAll('[data-lcs-piece]')];
    if (pieces.length !== piecesN) fails.push(`place: ${pieces.length} pieces, want ${piecesN}`);
    const valueOwner = new Map();
    let cellsTotal = 0;
    pieces.forEach((wrap, pi) => {
      const k = wrap.dataset.lcsPiece;
      const svg = wrap.querySelector('[data-lcs-prim="chart-fragment"]');
      const P = `piece ${k}`;
      if (!svg) { fails.push(`${P}: no chart-fragment`); return; }
      const a = auditPrintedPiece(svg, P);
      if (a.wrongs.length) fails.push(`${P}: a wrong cell on the place face`);
      a.cells.forEach((x) => {
        cellsTotal++;
        if (valueOwner.has(x.val)) fails.push(`value ${x.val} on ${P} and piece ${valueOwner.get(x.val)} (duplicate value)`); else valueOwner.set(x.val, k);
        if (guideSet.has(x.val)) fails.push(`${P}: value ${x.val} is a printed guide (P6)`);
        const tk = targetOf.get(x.val);
        if (tk == null) fails.push(`${P}: value ${x.val} has no board target`);
        else if (tk !== k) fails.push(`${P}: value ${x.val} is targeted for piece ${tk}`);
      });
    });
    if (targets.length !== cellsTotal) fails.push(`place: ${targets.length} board targets for ${cellsTotal} piece cells`);
    root.querySelectorAll('[data-lcs-answer]').forEach((el) => { if (!el.closest('[data-lcs-board]')) fails.push('place: an open cell outside the board'); });
  } else if (mode === 'jumps') {
    const itemsN = +root.dataset.lcsItemsN, arrows = +root.dataset.lcsArrows, noReverse = root.dataset.lcsNoreverse === '1';
    const chains = [...root.querySelectorAll('[data-lcs-chain]')];
    if (chains.length !== itemsN) fails.push(`jumps: ${chains.length} chains, want ${itemsN}`);
    const starts = new Set(), landings = new Set(), all = new Set();
    let above = 0, below = 0;
    chains.forEach((ch, i) => {
      const P = `chain ${i + 1}`;
      const s = +ch.dataset.lcsStart, moves = ch.dataset.lcsMoves, answer = +ch.dataset.lcsAnswer;
      if (+ch.dataset.lcsStep !== step) fails.push(`${P}: step stamp differs`);
      if (moves.length !== arrows) fails.push(`${P}: ${moves.length} moves, want ${arrows}`);
      const chips = [...ch.querySelectorAll('[data-lcs-move]')].map((c) => c.dataset.lcsMove).join('');
      if (chips !== moves) fails.push(`${P}: chips ${chips} != stamped moves ${moves}`);
      const g = ch.querySelector('[data-lcs-given]');
      if (!g) fails.push(`${P}: no given`); else if (givenText(g, P) !== s) fails.push(`${P}: given ${g.dataset.lcsGiven} != start ${s}`);
      let v = s, err = null;
      for (let k = 0; k < moves.length && !err; k++) {
        if (noReverse && k > 0 && moves[k] === { U: 'D', D: 'U', L: 'R', R: 'L' }[moves[k - 1]]) fails.push(`${P}: ${moves[k - 1]} then ${moves[k]} reverses immediately`);
        const m = move(v, moves[k]); if (m.err) err = m.err; else v = m.v;
      }
      if (err) fails.push(`${P}: ${err} (P5)`);
      else if (v !== answer) fails.push(`${P}: folded landing ${v} != stamped ${answer}`);
      const boxes = [...ch.querySelectorAll('[data-lcs-answer]')];
      if (!boxes.length) fails.push(`${P}: no open box`);
      boxes.forEach((b) => boxEmpty(b, P));
      if (+boxes[boxes.length - 1].dataset.lcsAnswer !== answer) fails.push(`${P}: the last box stamps ${boxes[boxes.length - 1].dataset.lcsAnswer}, chain ${answer}`);
      if (starts.has(s)) fails.push(`${P}: start ${s} repeats`); starts.add(s);
      if (landings.has(answer)) fails.push(`${P}: landing ${answer} repeats`); landings.add(answer);
      for (const x of [s, answer]) { if (all.has(x)) fails.push(`${P}: ${x} is on the page twice (duplicate value)`); all.add(x); }
      if (answer > s) above++; else if (answer < s) below++; else fails.push(`${P}: lands on its own start`);
    });
    if (chains.length > 1 && (above === 0 || below === 0)) fails.push('jumps: every landing is on the same side of its start');
  } else if (mode === 'riddle') {
    const itemsN = +root.dataset.lcsItemsN;
    const kinds = root.dataset.lcsKinds.split(',').map(Number).sort((a, b) => a - b).join(',');
    const riddles = [...root.querySelectorAll('[data-lcs-riddle]')];
    if (riddles.length !== itemsN) fails.push(`riddle: ${riddles.length} riddles, want ${itemsN}`);
    const all = new Set();
    riddles.forEach((rd, i) => {
      const P = `riddle ${i + 1}`;
      const answer = +rd.dataset.lcsAnswer;
      const clues = [...rd.querySelectorAll('[data-lcs-clue]')];
      if (clues.length !== 2) fails.push(`${P}: ${clues.length} clues, want 2`);
      const resolved = [], ks = [];
      clues.forEach((cl, j) => {
        const s = +cl.dataset.lcsStart;
        const g = cl.querySelector('[data-lcs-given]');
        if (!g) fails.push(`${P} clue ${j + 1}: no given`); else if (givenText(g, P) !== s) fails.push(`${P} clue ${j + 1}: given != start`);
        const chips = [...cl.querySelectorAll('[data-lcs-move]')];
        if (chips.length !== 1) fails.push(`${P} clue ${j + 1}: ${chips.length} arrows`);
        let v = s, err = null;
        for (const c of chips) { const m = move(v, c.dataset.lcsMove); if (m.err) { err = m.err; break; } v = m.v; }
        if (err) fails.push(`${P} clue ${j + 1}: ${err} (P5)`); else resolved.push(v);
        ks.push(Math.abs(v - s) / step);
        if (s === answer) fails.push(`${P} clue ${j + 1}: start ${s} equals the answer`);
        if (all.has(s)) fails.push(`${P}: start ${s} is on the page twice (duplicate value)`); all.add(s);
      });
      if (resolved.length === 2 && resolved[0] !== resolved[1]) fails.push(`${P}: clues point at ${resolved[0]} and ${resolved[1]} (clues disagree, P7)`);
      resolved.forEach((v) => { if (v !== answer) fails.push(`${P}: a clue resolves to ${v}, stamped answer ${answer}`); });
      if (ks.length === 2 && ks.sort((a, b) => a - b).join(',') !== kinds) fails.push(`${P}: clue kinds ${ks.join(',')} != ${kinds}`);
      const boxes = [...rd.querySelectorAll('[data-lcs-answer]')];
      if (boxes.length !== 1) fails.push(`${P}: ${boxes.length} open boxes, want 1`);
      boxes.forEach((b) => { boxEmpty(b, P); if (+b.dataset.lcsAnswer !== answer) fails.push(`${P}: box stamps ${b.dataset.lcsAnswer}, riddle ${answer}`); });
      if (all.has(answer)) fails.push(`${P}: answer ${answer} is printed on the page (duplicate value)`); all.add(answer);
    });
    root.querySelectorAll('[data-lcs-given]').forEach((g) => { riddles.forEach((rd, i) => { if (+g.dataset.lcsGiven === +rd.dataset.lcsAnswer) fails.push(`riddle ${i + 1}: its answer ${rd.dataset.lcsAnswer} is printed as a given (answer printed)`); }); });
  } else if (mode === 'error') {
    const piecesN = +root.dataset.lcsPiecesN, cleanN = +root.dataset.lcsCleanN, cellpx = +root.dataset.lcsCellpx;
    const kinds = root.dataset.lcsKinds.split(',');
    const pieces = [...root.querySelectorAll('[data-lcs-prim="chart-fragment"]')];
    if (pieces.length !== piecesN) fails.push(`error: ${pieces.length} pieces, want ${piecesN}`);
    const trueVals = new Map(), wrongVals = new Map();
    const boxes = [];
    let clean = 0;
    const swap = (v) => { const s = String(v); if (s.length < 2) return null; const t = s.slice(0, -2) + s[s.length - 1] + s[s.length - 2]; return +t !== v && !/^0/.test(t) ? +t : null; };
    pieces.forEach((svg, pi) => {
      const P = `piece ${pi + 1}`;
      if (+svg.dataset.lcsCellpx !== cellpx) fails.push(`${P}: cell ${svg.dataset.lcsCellpx} != page ${cellpx}`);
      const a = auditPrintedPiece(svg, P);
      if (a.cells.length < 5) fails.push(`${P}: ${a.cells.length} cells; an error hunt needs >= 5 (ambiguous error, P10)`);
      a.cells.forEach((x) => { if (trueVals.has(x.val)) fails.push(`value ${x.val} on ${P} and piece ${trueVals.get(x.val)} (duplicate value)`); else trueVals.set(x.val, pi + 1); });
      const card = svg.closest('.ws-card');
      const box = card && card.querySelector('[data-lcs-errbox]');
      if (!box) fails.push(`${P}: no answer box`); else { boxEmpty(box, P); boxes.push(box); }
      const isClean = box && box.hasAttribute('data-lcs-clean');
      if (isClean) {
        clean++;
        if (a.wrongs.length) fails.push(`${P}: a clean piece carries a wrong cell`);
        if (box.dataset.lcsAnswer !== '') fails.push(`${P}: a clean piece's box stamps ${box.dataset.lcsAnswer}`);
        return;
      }
      if (a.wrongs.length !== 1) { fails.push(`${P}: ${a.wrongs.length} wrong cells, want exactly one (error not unique, P4)`); return; }
      const wt = a.wrongs[0];
      const host = [...a.labelOf.entries()].find(([, t]) => t === wt);
      if (!host) return;
      const trueVal = host[0].val, shown = +wt.dataset.lcsWrong;
      if (svg.dataset.lcsWrongIdx == null) fails.push(`${P}: no data-lcs-wrong-idx stamp`);
      const d = (shown - trueVal) / step;
      const kindOk = (kinds.includes('pm1') && Math.abs(d) === 1) || (kinds.includes('pm10') && Math.abs(d) === 10) || (kinds.includes('pm9') && Math.abs(d) === 9) || (kinds.includes('pm11') && Math.abs(d) === 11) || (kinds.includes('swap') && swap(trueVal) === shown);
      if (!kindOk) fails.push(`${P}: wrong value ${shown} for ${trueVal} is not an errorKind (${kinds.join(' ')})`);
      if (shown < start || shown > end) fails.push(`${P}: wrong value ${shown} outside ${start}..${end}`);
      if (box && +box.dataset.lcsAnswer !== trueVal) fails.push(`${P}: box stamps ${box.dataset.lcsAnswer}, the right number is ${trueVal}`);
      if (wrongVals.has(shown)) fails.push(`${P}: wrong value ${shown} also printed on piece ${wrongVals.get(shown)}`); else wrongVals.set(shown, pi + 1);
    });
    wrongVals.forEach((pi, v) => { if (trueVals.has(v)) fails.push(`piece ${pi}: wrong value ${v} equals a true value on piece ${trueVals.get(v)} (duplicate value)`); });
    if (clean !== cleanN) fails.push(`error: ${clean} clean pieces, want ${cleanN}`);
    root.querySelectorAll('[data-lcs-answer]').forEach((el) => { if (!el.hasAttribute('data-lcs-errbox')) fails.push('error: an open cell that is not an answer box'); });
  } else if (mode === 'distance') {
    const itemsN = +root.dataset.lcsItemsN, cmin = +root.dataset.lcsCmin, cmax = +root.dataset.lcsCmax;
    const items = [...root.querySelectorAll('[data-lcs-dist]')];
    if (items.length !== itemsN) fails.push(`distance: ${items.length} items, want ${itemsN}`);
    const all = new Set(), pairs = new Set(), downs = new Set(), rights = new Set();
    items.forEach((it, i) => {
      const P = `pair ${i + 1}`;
      const a = +it.dataset.lcsA, b = +it.dataset.lcsB;
      const givens = [...it.querySelectorAll('[data-lcs-given]')];
      if (givens.length !== 2) fails.push(`${P}: ${givens.length} givens, want 2`);
      else { if (givenText(givens[0], P) !== a) fails.push(`${P}: first given != A ${a}`); if (givenText(givens[1], P) !== b) fails.push(`${P}: second given != B ${b}`); }
      if (a === b) fails.push(`${P}: A equals B`);
      if (!onChart(a) || !onChart(b)) { fails.push(`${P}: A or B off the chart`); return; }
      const down = row(b) - row(a), right = col(b) - col(a);
      const bd = it.querySelector('[data-lcs-counter="down"]'), br = it.querySelector('[data-lcs-counter="right"]');
      if (!bd || !br) { fails.push(`${P}: missing a counter box`); return; }
      boxEmpty(bd, P); boxEmpty(br, P);
      if (+bd.dataset.lcsAnswer !== down) fails.push(`${P}: down box stamps ${bd.dataset.lcsAnswer}, derived ${down} (P9)`);
      if (+br.dataset.lcsAnswer !== right) fails.push(`${P}: right box stamps ${br.dataset.lcsAnswer}, derived ${right} (P9)`);
      if (down < cmin || down > cmax) fails.push(`${P}: down ${down} outside ${cmin}..${cmax} (P9)`);
      if (right < cmin || right > cmax) fails.push(`${P}: right ${right} outside ${cmin}..${cmax} (P9)`);
      const glyphs = [...it.querySelectorAll('[data-lcs-move]')].map((g) => g.dataset.lcsMove).join('');
      if (glyphs !== 'DR') fails.push(`${P}: counter glyphs ${glyphs}, want DR`);
      for (const x of [a, b]) { if (all.has(x)) fails.push(`${P}: ${x} is printed twice on the page (duplicate value)`); all.add(x); }
      const key = a + '>' + b; if (pairs.has(key)) fails.push(`${P}: pair repeats`); pairs.add(key);
      downs.add(down); rights.add(right);
    });
    if (items.length > 1 && (downs.size === 1 || rights.size === 1)) fails.push('distance: a counter is constant across the page');
  } else fails.push('unknown mode ' + mode);
  root.querySelectorAll('.ws-chart-compass').forEach((s) => { if (s.querySelector('[data-lcs-answer],[data-lcs-given],[data-lcs-anchor]')) fails.push('the compass carries ground truth'); });
  const strips = root.querySelectorAll('.ws-chart-compass').length;
  if (mode === 'place' || mode === 'error') { if (strips) fails.push(`${mode}: a compass on a face that declares none`); } else if (strips !== 1) fails.push(`${mode}: ${strips} compass strips, want 1`);
  return fails;
}

module.exports = {
  id: 'G1-310',
  slug: 'hundreds-chart-puzzles',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'hundreds-chart-puzzles',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: () => ['1-100', '0-99', '1-120', '101-200', 'tens'],
    exemplar: (loc) => loadBank(BANK, loc).exemplar,
  },
  difficulty: {
    // d1: one move from a hub anchor (the compass explains U/D/L/R); pieces avoid the chart's
    // outer rows and every multiple of 10 (design: "values 11-89, no %10 === 0" on 1-100).
    // sq2 is NOT on d1 (design listed it): its diagonal cell is TWO moves from any anchor,
    // which breaks the design's own d1 verify rule — recorded in _work/G1-310-build.md.
    1: { shapes: ['plus', 'bar-h3', 'bar-v3', 'plus', 'bar-h3', 'bar-v3'], anchorAt: 'centre', cell: 56, fontSize: 26, compass: true, innerRows: true, noTens: true },
    2: { shapes: ['sq3', 'sq3', 'L3', 'T3', 'plus', 'T3'], anchorAt: 'any', cell: 60, fontSize: 26, compass: false, innerRows: false, noTens: false },
    3: { shapes: ['sq3-holes', 'S', 'rect4x3', 'L3', 'T3', 'plus'], anchorAt: 'corner', cell: 56, fontSize: 26, compass: false, innerRows: false, noTens: false },
  },
  i18n: {
    en: {
      title: 'Hundreds Chart Puzzle Pieces: Fill In the Numbers',
      instruction: 'One number is printed on each piece. Write every missing number: 1 more to the right, 1 less to the left, 10 more below, 10 less above.',
    },
  },

  build({ difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones.
   *  `items` (faces only) injects pre-composed items the face DRAWS as asked — verify enforces the rules. */
  _buildWith(bankLoc, d, { locale, unit, items }, ctx) {
    if (!d) throw new Error('G1-310: no difficulty config');
    if (d.mode != null) return buildFace(bankLoc, d, { locale, unit, items }, ctx);   // Phase-2 faces; the base path below is untouched
    const rng = ctx.rng;
    const u = unit || bankLoc.exemplar;
    const U = UNITS[u];
    if (!U) throw new Error(`G1-310: unknown unit "${u}" (a key of UNITS: ${Object.keys(UNITS).join(', ')})`);
    if (U.g2Only) throw new Error(`G1-310: unit "${u}" is G2-face-only (the base refuses it)`);
    if (!Array.isArray(d.shapes) || d.shapes.length < 1) throw new Error('G1-310: no shapes');
    if (d.shapes.length % GRID_COLS !== 0) throw new Error('G1-310: shapes must fill the 2-column grid');
    if (d.noTens && U.step !== 1) throw new Error('G1-310: noTens needs a step-1 unit');
    if (d.cell < 52) throw new Error(`G1-310: cell ${d.cell} leaves a blank below the G1 floor 44 (cell - 8)`);
    const rows = unitRows(U);
    if (d.innerRows && rows < 3) throw new Error('G1-310: innerRows needs >= 3 chart rows');

    let placed = null;
    for (let attempt = 0; attempt < PAGE_ATTEMPTS && !placed; attempt++) {
      const order = rng.shuffle(d.shapes);
      const p = placePieces(rng, d, U, order);
      if (!p) continue;
      const anchorRows = new Set(p.map((x) => x.anchorRow));
      if (anchorRows.size < Math.min(MIN_ANCHOR_ROWS, p.length)) continue;
      placed = p;
    }
    if (!placed) throw new Error(`G1-310: no legal page for ${JSON.stringify(d.shapes)} on ${u} (anchorAt ${d.anchorAt})`);

    const cards = [];
    const meta = { unit: u, start: U.start, end: U.end, step: U.step, pieces: [] };
    const seen = new Set();
    for (const p of placed) {
      const frag = chartFragment({ shape: p.shape, rot: p.rot, origin: p.origin, anchorIdx: p.anchorIdx, cell: d.cell, start: U.start, end: U.end, step: U.step, fontSize: d.fontSize, printed: 'anchor' });
      for (const v of frag.meta.values) { if (seen.has(v)) throw new Error('G1-310: value ' + v + ' twice on the page'); seen.add(v); }
      cards.push(`<div class="ws-card-stage" style="padding:0">${frag.svg}</div>`);
      meta.pieces.push({ shape: p.shape, rot: p.rot, origin: p.origin, anchor: p.anchor, values: frag.meta.values });
    }
    const gridRows = d.shapes.length / GRID_COLS;
    const bodyHtml = `<div data-ws-content data-lcs-hcp data-lcs-unit="${u}" data-lcs-start="${U.start}" data-lcs-end="${U.end}" data-lcs-step="${U.step}" ` +
      `data-lcs-pieces-n="${d.shapes.length}" data-lcs-anchor-at="${d.anchorAt}" data-lcs-compass="${d.compass ? 1 : 0}" data-lcs-cellpx="${d.cell}" ` +
      `data-lcs-innerrows="${d.innerRows ? 1 : 0}" data-lcs-notens="${d.noTens ? 1 : 0}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;gap:14px;min-height:0">` +
      (d.compass ? chartCompass() : '') +
      `<div style="flex:1 1 auto;display:flex;flex-direction:column;width:100%;min-height:0">` +
      cardGrid({ cards, cols: GRID_COLS, rows: gridRows, numbered: true }) +
      `</div></div>`;
    return { bodyHtml, meta };
  },

  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-hcp]'); return r ? (r.dataset.lcsMode || null) : null; });
    if (mode) return page.evaluate(verifyFaceInPage);   // Phase-2 faces (stamped only by a face)
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-hcp]');
      if (!root) return ['no hundreds-chart-puzzles root'];
      const start = +root.dataset.lcsStart, end = +root.dataset.lcsEnd, step = +root.dataset.lcsStep;
      const piecesN = +root.dataset.lcsPiecesN, anchorAt = root.dataset.lcsAnchorAt, cellpx = +root.dataset.lcsCellpx;
      const compass = root.dataset.lcsCompass === '1', innerRows = root.dataset.lcsInnerrows === '1', noTens = root.dataset.lcsNotens === '1';
      const COLS = 10;
      const rows = ((end - start) / step + 1) / COLS;
      if (!Number.isInteger(rows) || rows < 1) fails.push(`unit ${start}-${end} step ${step} is not a whole number of rows`);
      if (!['any', 'centre', 'corner'].includes(anchorAt)) fails.push('anchorAt stamp ' + anchorAt);
      const strips = root.querySelectorAll('.ws-chart-compass');
      if (compass && strips.length !== 1) fails.push(`compass stamped but ${strips.length} strips rendered`);
      if (!compass && strips.length) fails.push('compass rendered but not stamped');
      strips.forEach((s) => { if (s.querySelector('[data-lcs-answer],[data-lcs-given],[data-lcs-anchor]')) fails.push('the compass carries ground truth'); });

      const pieces = [...root.querySelectorAll('[data-lcs-prim="chart-fragment"]')];
      if (pieces.length !== piecesN) fails.push(`pieces: ${pieces.length}, want ${piecesN}`);
      const allValues = new Map();   // value -> piece index
      const boxes = [];
      const anchorRows = new Set();
      pieces.forEach((svg, pi) => {
        const P = `piece ${pi + 1}`;
        const ds = svg.dataset;
        const w = +ds.lcsW, h = +ds.lcsH, origin = +ds.lcsOrigin, anchor = +ds.lcsAnchor, anchorIdx = +ds.lcsAnchorIdx;
        const pStart = +ds.lcsStart, pEnd = +ds.lcsEnd, pStep = +ds.lcsStep, pCell = +ds.lcsCellpx;
        if (pStart !== start || pEnd !== end || pStep !== step) fails.push(`${P}: unit stamps ${pStart}-${pEnd}/${pStep} differ from the page ${start}-${end}/${step}`);
        if (pCell !== cellpx) fails.push(`${P}: cell ${pCell} differs from the page cell ${cellpx}`);
        if (ds.lcsPrinted !== 'anchor') fails.push(`${P}: printed="${ds.lcsPrinted}" on the base (only the anchor prints)`);
        if (!(w >= 1 && w <= 4 && h >= 1 && h <= 4)) fails.push(`${P}: box ${w}x${h} outside 1..4`);
        const v = (r, c) => origin + pStep * (COLS * r + c);
        // cells
        const cellEls = [...svg.querySelectorAll('[data-lcs-rc]')];
        const rcs = [];
        const rcSet = new Set();
        cellEls.forEach((el) => {
          const m = /^(\d+),(\d+)$/.exec(el.dataset.lcsRc || '');
          if (!m) { fails.push(`${P}: unparsable rc "${el.dataset.lcsRc}"`); return; }
          const r = +m[1], c = +m[2];
          if (r >= h || c >= w) fails.push(`${P}: cell ${r},${c} outside the ${w}x${h} piece box`);
          if (rcSet.has(r + ',' + c)) fails.push(`${P}: cell ${r},${c} twice`);
          rcSet.add(r + ',' + c);
          rcs.push([r, c, el]);
        });
        if (rcs.length < 2) fails.push(`${P}: ${rcs.length} cells`);
        // 4-connected
        if (rcs.length) {
          const seen = new Set([rcs[0][0] + ',' + rcs[0][1]]);
          const st = [[rcs[0][0], rcs[0][1]]];
          while (st.length) {
            const [r, c] = st.pop();
            for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (r + dr) + ',' + (c + dc); if (rcSet.has(k) && !seen.has(k)) { seen.add(k); st.push([r + dr, c + dc]); } }
          }
          if (seen.size !== rcs.length) fails.push(`${P}: shape is not 4-connected`);
          // the bounding box is really w x h
          const maxR = Math.max(...rcs.map((x) => x[0])), maxC = Math.max(...rcs.map((x) => x[1]));
          const minR = Math.min(...rcs.map((x) => x[0])), minC = Math.min(...rcs.map((x) => x[1]));
          if (minR !== 0 || minC !== 0 || maxR !== h - 1 || maxC !== w - 1) fails.push(`${P}: cells span ${minR}..${maxR} x ${minC}..${maxC}, stamped ${w}x${h}`);
        }
        // column rule + range (by position arithmetic, never text)
        const oi = (origin - pStart) / pStep;
        if (!Number.isInteger(oi) || oi < 0) fails.push(`${P}: origin ${origin} is not on the ${pStart}-step-${pStep} chart`);
        else if ((oi % COLS) + (w - 1) > COLS - 1) fails.push(`${P}: origin ${origin} in column ${oi % COLS} with width ${w} wraps the row edge (row-edge wrap)`);
        if (origin < pStart) fails.push(`${P}: origin ${origin} below start ${pStart} (out of range)`);
        if (v(h - 1, w - 1) > pEnd) fails.push(`${P}: bottom-right ${v(h - 1, w - 1)} above end ${pEnd} (out of range)`);
        if (innerRows) {
          const r0 = Math.floor(oi / COLS);
          if (r0 < 1 || r0 + h - 1 > rows - 2) fails.push(`${P}: rows ${r0}..${r0 + h - 1} touch the chart's first or last row (innerRows)`);
        }
        // anchor: exactly one given rect, at anchorIdx's cell, value === derived === stamp; one <text>, which prints it
        const givens = [...svg.querySelectorAll('[data-lcs-given]')];
        if (givens.length !== 1) fails.push(`${P}: ${givens.length} given cells, want exactly one anchor`);
        const texts = [...svg.querySelectorAll('text')];
        const anchorTexts = texts.filter((t) => t.hasAttribute('data-lcs-anchor'));
        if (anchorTexts.length !== 1) fails.push(`${P}: ${anchorTexts.length} anchor labels, want exactly one anchor`);
        if (texts.length !== anchorTexts.length) fails.push(`${P}: ${texts.length - anchorTexts.length} extra <text> on a piece (answer printed)`);
        let ar = null, ac = null;
        givens.forEach((g) => {
          const m = /^(\d+),(\d+)$/.exec(g.dataset.lcsRc || '');
          if (!m) { fails.push(`${P}: anchor cell has no rc`); return; }
          ar = +m[1]; ac = +m[2];
          const want = v(ar, ac);
          if (+g.dataset.lcsGiven !== want) fails.push(`${P}: given stamp ${g.dataset.lcsGiven} != derived ${want}`);
          if (want !== anchor) fails.push(`${P}: root anchor ${anchor} != derived ${want} at ${ar},${ac}`);
          if (want < pStart || want > pEnd) fails.push(`${P}: anchor ${want} outside ${pStart}..${pEnd}`);
        });
        anchorTexts.forEach((t) => {
          if (t.textContent.trim() !== String(anchor)) fails.push(`${P}: anchor text "${t.textContent.trim()}" != ${anchor}`);
          if (+t.dataset.lcsAnchor !== anchor) fails.push(`${P}: anchor label stamp ${t.dataset.lcsAnchor} != ${anchor}`);
          // the label sits on the given cell, not on a blank
          const tb = t.getBoundingClientRect();
          const cx = (tb.left + tb.right) / 2, cy = (tb.top + tb.bottom) / 2;
          svg.querySelectorAll('[data-lcs-answer]').forEach((b) => {
            const bb = b.getBoundingClientRect();
            if (cx > bb.left && cx < bb.right && cy > bb.top && cy < bb.bottom) fails.push(`${P}: a printed numeral sits on a blank cell (answer printed)`);
          });
        });
        // every <text> must sit on the anchor cell
        texts.forEach((t) => {
          const tb = t.getBoundingClientRect();
          const cx = (tb.left + tb.right) / 2, cy = (tb.top + tb.bottom) / 2;
          svg.querySelectorAll('[data-lcs-answer]').forEach((b) => {
            const bb = b.getBoundingClientRect();
            if (cx > bb.left && cx < bb.right && cy > bb.top && cy < bb.bottom) fails.push(`${P}: <text> "${t.textContent.trim()}" printed on a blank (answer printed)`);
          });
        });
        // anchorIdx points at the given cell (cells in the primitive's list order are unknown here, so compare by rc uniqueness: the given rc must be one of the cells)
        if (ar != null && !rcSet.has(ar + ',' + ac)) fails.push(`${P}: anchor rc ${ar},${ac} is not a cell`);
        if (!(anchorIdx >= 0 && anchorIdx < rcs.length)) fails.push(`${P}: anchor-idx ${anchorIdx} outside 0..${rcs.length - 1}`);
        // blanks: every non-anchor cell, answer === derived, no text
        const blanks = [...svg.querySelectorAll('[data-lcs-answer]')];
        if (blanks.length !== rcs.length - 1) fails.push(`${P}: ${blanks.length} blanks for ${rcs.length} cells (want cells - 1)`);
        blanks.forEach((b) => {
          const m = /^(\d+),(\d+)$/.exec(b.dataset.lcsRc || '');
          if (!m) { fails.push(`${P}: blank without rc`); return; }
          const want = v(+m[1], +m[2]);
          if (+b.dataset.lcsAnswer !== want) fails.push(`${P}: blank ${m[1]},${m[2]} stamps ${b.dataset.lcsAnswer}, derived ${want}`);
          if (b.hasAttribute('data-lcs-given')) fails.push(`${P}: a cell is both given and blank`);
          if (b.textContent.trim()) fails.push(`${P}: blank carries text (answer printed)`);
          if (anchorAt === 'centre' && ar != null && Math.abs(+m[1] - ar) + Math.abs(+m[2] - ac) !== 1) fails.push(`${P}: blank ${m[1]},${m[2]} is not one move from the anchor ${ar},${ac} (d1 rule)`);
        });
        if (anchorAt === 'corner' && ar != null && rcs.length) {
          const nb = (r, c) => [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dr, dc]) => rcSet.has((r + dr) + ',' + (c + dc))).length;
          const min = Math.min(...rcs.map((x) => nb(x[0], x[1])));
          if (nb(ar, ac) !== min) fails.push(`${P}: anchor ${ar},${ac} has ${nb(ar, ac)} neighbours, an extremity has ${min} (corner rule)`);
        }
        // page-wide: values distinct, boxes disjoint, anchor rows
        rcs.forEach(([r, c]) => {
          const val = v(r, c);
          if (noTens && val % 10 === 0) fails.push(`${P}: value ${val} is a multiple of 10 (d1 rule)`);
          if (allValues.has(val)) fails.push(`value ${val} on ${P} and piece ${allValues.get(val) + 1} (duplicate value)`);
          else allValues.set(val, pi);
        });
        if (Number.isInteger(oi)) {
          const r0 = Math.floor(oi / COLS), c0 = oi % COLS;
          const box = { r0, r1: r0 + h - 1, c0, c1: c0 + w - 1, pi };
          boxes.forEach((o) => {
            if (!(box.r1 < o.r0 || o.r1 < box.r0 || box.c1 < o.c0 || o.c1 < box.c0)) fails.push(`${P} and piece ${o.pi + 1}: bounding boxes overlap on the chart`);
          });
          boxes.push(box);
          if (ar != null) anchorRows.add(r0 + ar);
        }
      });
      if (pieces.length && anchorRows.size < Math.min(4, pieces.length)) fails.push(`anchors on ${anchorRows.size} chart rows, want >= ${Math.min(4, pieces.length)}`);
      // no ground truth outside the pieces
      root.querySelectorAll('[data-lcs-answer],[data-lcs-given]').forEach((el) => { if (!el.closest('[data-lcs-prim="chart-fragment"]')) fails.push('ground truth outside a piece'); });
      return fails;
    });
  },
};
