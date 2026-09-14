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
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { chartFragment, UNITS, shapeInfo, valueAt } = require('../../primitives/chart-fragment.js');
const { chartCompass } = require('../../templates/components-b3.js');
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

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { locale, unit }, ctx) {
    if (!d) throw new Error('G1-310: no difficulty config');
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
