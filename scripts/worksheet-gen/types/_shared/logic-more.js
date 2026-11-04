/**
 * logic-more.js — the new templates of the Logic & Math Puzzles maker (NEW-TEMPLATES §22 T1 / T2 / T4 / T6; task 6 of
 * the ten, 2026-11-01). Every puzzle on these pages has EXACTLY ONE solution, proven by an exhaustive counter at build
 * time and re-counted inside the rendered page by verify(); every level is graded by the TECHNIQUE the puzzle needs,
 * never by a clue count (lib/logic-sudoku.js, logic-cages.js, logic-code.js, logic-balance.js — pure JS, bundled into
 * the maker). Print-only; the generic key layer shows the answers; the screen engine derives a screen from the marks.
 *
 *   sudoku   T2 · number sudoku 4 × 4 (G1-470, two per page) and 6 × 6 (G3-470); picture sudoku graded by technique
 *            4 × 4 (G1-471) and 6 × 6 (G3-471). L1 counting (the last empty cell of a row, column or box) · L2 hidden
 *            singles · L3 many hidden singles (6 × 6: a naked single may be needed). Numerals: write the number
 *            (type screen); pictures: draw the picture (place screen from the legend).
 *   cages    T4 · KenKen-style cages 3 × 3 (G2-470) and 4 × 4 (G3-472), two per page. L1 givens + counting + forced
 *            cages · L2 a hidden single · L3 two hidden singles, the 4 × 4 with one product cage.
 *   code     T1 · code addition (G1-472): pictures stand for numbers, a chain of sums; decode every picture.
 *            L1 three pictures, to 10 · L2 four, to 20 · L3 five, three-addend rows, rows shuffled.
 *   balance  T6 · balances with two unknown shapes (G3-473): L1 to 20 · L2 to 50 · L3 three shapes.
 *
 * Marks: an empty numeral cell is an answerBox (data-lcs-answer → key text + type screen); an empty picture cell gets
 * the solution picture faint on the KEY build (data-lcs-key-sample) and data-lcs-drop + data-lcs-answer on the SCREEN
 * build with the legend tiles as data-lcs-bin palette. The puzzle itself rides on the page as data-lcs-puzzle (clues
 * only — never the solution) so verify() and gates/unique-solution.js re-count it.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { distinctPick, GRAPH_THEMES } = require('../../lib/picture-distinct.js');
const { esc } = require('../../primitives/_svg.js');
const { mulGlyph } = require('./notation.js');
const SUDOKU = require('../../lib/logic-sudoku.js');
const CAGES = require('../../lib/logic-cages.js');
const CODE = require('../../lib/logic-code.js');
const BALANCE = require('../../lib/logic-balance.js');
// the maker strings of these templates (title + instruction ×11 live there until the main session merges them into
// i18n/strings.<loc>.json); the type itself reads only `_rule`, the product-cage sentence appended through {RULE}
const STRINGS = require('../../i18n/logic-puzzles-makers.json');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', CREAM = '#FBF3E4', SOFT = '#DDEBE8', WHITE = '#FFFFFF', INK_SOFT = '#8A8276';
const NUM = (s, size, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;line-height:1;color:${color}">${s}</span>`;
const stamp = (o) => ` data-lcs-puzzle="${esc(JSON.stringify(o))}"`;

/** the puzzles per page and the cell sizes (measured against the 703 × ~700 px body; the collision + fill lints gate them) */
const LAYOUT = {
  sudoku: { 4: { numbers: { per: 2, cell: 84 }, pictures: { per: 1, cell: 128, legend: 74 } }, 6: { numbers: { per: 1, cell: 100 }, pictures: { per: 1, cell: 90, legend: 64 } } },
  cages: { 3: { per: 2, cell: 108 }, 4: { per: 2, cell: 84 } },
};

/** pictures of the theme that a child tells apart (the themes read for look-alikes; the others as the manifest lists them) */
function pickPictures(theme, n, rng, ctx) {
  const pool = labelSafeNouns(theme);
  if (pool.length < n) throw new Error('logic-more: theme ' + theme + ' has ' + pool.length + ' pictures, needs ' + n);
  let picked = rng.sample(pool, n);
  if (GRAPH_THEMES.includes(theme)) picked = distinctPick(theme, picked, pool, rng);
  return slot.pictures(ctx, picked, pool, theme);
}

// ---------------------------------------------------------------- sudoku
function sudokuHtml({ n, puzzle, cell, symbols, pics, theme, ctx }) {
  const { br, bc } = SUDOKU.SIZES[n];
  const key = !!ctx.answerKey, screen = !!ctx.screen;
  const cells = puzzle.grid.map((v, i) => {
    const r = Math.floor(i / n), c = i % n;
    const borders = [
      r % br === 0 ? `border-top:3px solid ${TEAL}` : `border-top:1.5px solid ${GRID}`,
      c % bc === 0 ? `border-left:3px solid ${TEAL}` : `border-left:1.5px solid ${GRID}`,
      r === n - 1 ? `border-bottom:3px solid ${TEAL}` : '',
      c === n - 1 ? `border-right:3px solid ${TEAL}` : '',
    ].filter(Boolean).join(';');
    const box = `width:${cell}px;height:${cell}px;${borders};box-sizing:border-box;display:flex;align-items:center;justify-content:center`;
    if (v >= 0) {
      const inner = symbols === 'numbers' ? NUM(v + 1, Math.round(cell * 0.5)) : `<img class="ws-icon" src="${fileUri(theme, pics[v].noun)}" alt="" style="width:${cell - 22}px;height:${cell - 22}px">`;
      return `<span style="${box};background:${CREAM}" data-lcs-given="1">${inner}</span>`;
    }
    const sol = puzzle.solution[i];
    if (symbols === 'numbers') return `<span style="${box};background:${WHITE}">${answerBox({ w: cell - 18, h: cell - 18, answer: sol + 1 })}</span>`;
    const marks = screen ? ` data-lcs-drop="1" data-lcs-answer="${sol}"` : '';
    const sample = key ? `<img class="ws-icon" src="${fileUri(theme, pics[sol].noun)}" alt="" data-lcs-key-sample="1" style="width:${cell - 22}px;height:${cell - 22}px;opacity:.6">` : '';
    return `<span style="${box};background:${WHITE}"${marks}>${sample}</span>`;
  }).join('');
  // a <span> grid: the page-fill and card-fill lints count a stage's direct span / a [data-lcs-table] as content (an
  // empty puzzle cell is content a child works in — a grid of empties must never read as an empty band)
  const grid = `<span data-lcs-table="1" style="display:grid;grid-template-columns:repeat(${n},${cell}px)"${stamp({ kind: 'sudoku', n, grid: puzzle.grid })}>${cells}</span>`;
  if (symbols === 'numbers') return grid;
  const L = LAYOUT.sudoku[n].pictures.legend;
  const legend = pics.map((p, v) => `<span class="ws-pattern-slot" style="width:${L}px;height:${L}px"${screen ? ` data-lcs-bin="${v}"` : ''}${slot.attr(ctx, 'pic', v)}><img class="ws-icon" src="${fileUri(theme, p.noun)}" alt="" style="width:${L - 16}px;height:${L - 16}px"></span>`).join('');
  return grid + `<div style="display:flex;gap:14px;justify-content:center">${legend}</div>`;
}

// ---------------------------------------------------------------- cages
function cagesHtml({ n, puzzle, cell, locale, ctx }) {
  const owner = new Array(n * n).fill(-1);
  puzzle.cages.forEach((cg, i) => cg.cells.forEach((c) => { owner[c] = i; }));
  const MUL = mulGlyph(locale);
  const cells = puzzle.solution.map((v, i) => {
    const r = Math.floor(i / n), c = i % n;
    const thick = `3px solid ${TEAL}`, thin = `1.5px solid ${GRID}`;
    const borders = [
      `border-top:${r === 0 || owner[i - n] !== owner[i] ? thick : thin}`,
      `border-left:${c === 0 || owner[i - 1] !== owner[i] ? thick : thin}`,
      r === n - 1 ? `border-bottom:${thick}` : '',
      c === n - 1 ? `border-right:${thick}` : '',
    ].filter(Boolean).join(';');
    const cg = puzzle.cages[owner[i]];
    const first = cg.cells[0] === i && cg.cells.length > 1;
    const label = first ? `<span style="position:absolute;top:2px;left:5px;font-family:'Baloo 2';font-weight:700;font-size:${n === 3 ? 15 : 13}px;line-height:1;color:${TEAL}" data-lcs-cage-label="${cg.target}${cg.op}">${cg.target}${cg.op === 'x' ? MUL : '+'}</span>` : '';
    const box = `position:relative;width:${cell}px;height:${cell}px;${borders};box-sizing:border-box;display:flex;align-items:flex-end;justify-content:flex-end;padding:${first ? 4 : 4}px`;
    if (cg.cells.length === 1) return `<span style="${box};background:${CREAM};align-items:center;justify-content:center" data-lcs-given="1">${NUM(v, Math.round(cell * 0.46))}</span>`;
    const inner = cell - 24;
    return `<span style="${box};background:${WHITE}">${label}${answerBox({ w: inner, h: inner, answer: v })}</span>`;
  }).join('');
  return `<span data-lcs-table="1" style="display:grid;grid-template-columns:repeat(${n},${cell}px)"${stamp({ kind: 'cages', n, cages: puzzle.cages.map((cg) => ({ cells: cg.cells, op: cg.op, target: cg.target })) })}>${cells}</span>`;
}

// ---------------------------------------------------------------- code addition
function codeHtml({ puzzle, pics, theme, ctx }) {
  const k = puzzle.k;
  // the rows fill the body (page-fill ≥ 55 %): three rows at 130 px, five at 92 px, plus the value row
  const tile = Math.min(130, Math.floor(700 / (k + 1)) - 24);
  const img = (s, px) => `<img class="ws-icon" src="${fileUri(theme, pics[s].noun)}" alt="" style="width:${px - 14}px;height:${px - 14}px">`;
  const tileOf = (s, px, extra = '') => `<span class="ws-pattern-slot" style="width:${px}px;height:${px}px"${extra}>${img(s, px)}</span>`;
  const op = (ch) => NUM(ch, Math.round(tile * 0.42), TEAL);
  const rows = puzzle.order.map((ei) => {
    const e = puzzle.equations[ei];
    const parts = [];
    e.terms.forEach((s, i) => { if (i) parts.push(op('+')); parts.push(tileOf(s, tile)); });
    parts.push(op('='), NUM(e.sum, Math.round(tile * 0.5)));
    return `<div style="display:flex;align-items:center;gap:${Math.round(tile * 0.14)}px" data-lcs-code-row="${ei}">${parts.join('')}</div>`;
  });
  const vt = 86, vb = 72;
  const values = puzzle.values.map((v, s) => `<span style="display:inline-flex;align-items:center;gap:8px">${tileOf(s, vt, slot.attr(ctx, 'pic', s))}${NUM('=', 24, TEAL)}${answerBox({ w: vb, h: vb - 8, answer: v })}</span>`);
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;flex:1 1 auto;min-height:0"${stamp({ kind: 'code', k, max: puzzle.max, equations: puzzle.equations })}>` +
    rows.join('') +
    `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px 26px;max-width:640px;padding-top:6px;border-top:2px solid ${GRID}">${values.join('')}</div>` +
    `</div>`;
}

// ---------------------------------------------------------------- balances
const SHAPE_FILL = [TEAL, CORAL, INK_SOFT];
function shapeSvg(s, x, y, px) {
  const h = px / 2, f = SHAPE_FILL[s];
  if (s === 0) return `<path d="M${x} ${y - h} L${x + h} ${y + h} L${x - h} ${y + h} Z" fill="${f}" data-lcs-shape="0"/>`;
  if (s === 1) return `<rect x="${x - h}" y="${y - h}" width="${px}" height="${px}" rx="3" fill="${f}" data-lcs-shape="1"/>`;
  return `<circle cx="${x}" cy="${y}" r="${h}" fill="${f}" data-lcs-shape="2"/>`;
}
function panSvg(pan, cx, panY, px, gap = 4) {
  const items = pan.shapes.length ? pan.shapes.map((s, i) => shapeSvg(s, cx + (i - (pan.shapes.length - 1) / 2) * (px + gap), panY - px / 2 - 4, px)).join('')
    : `<text x="${cx}" y="${panY - 8}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="24" fill="${INK}">${pan.num}</text>`;
  return `<rect x="${cx - 44}" y="${panY}" width="88" height="7" rx="3" fill="${TEAL}"/>` +
    `<line x1="${cx - 40}" y1="${panY}" x2="${cx}" y2="30" stroke="${GRID}" stroke-width="2"/><line x1="${cx + 40}" y1="${panY}" x2="${cx}" y2="30" stroke="${GRID}" stroke-width="2"/>` + items;
}
// px / gap (2026-11-03, final-phase review): four 24 px shapes are 108 px on an 88 px pan — they ran over the post and off
// the pan, so a child could miss one and count 3; a card whose pans hold four draws ALL its shapes at 18 px (one size
// on a card: a smaller triangle never looks lighter)
function balanceSvg(b, px = 24, gap = 4) {
  const W = 220, H = 118, cx = W / 2;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-balance="1">` +
    `<line x1="${cx}" y1="30" x2="${cx}" y2="${H - 12}" stroke="${TEAL}" stroke-width="5" stroke-linecap="round"/>` +
    `<line x1="${cx - 26}" y1="${H - 10}" x2="${cx + 26}" y2="${H - 10}" stroke="${TEAL}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="20" y1="30" x2="${W - 20}" y2="30" stroke="${TEAL}" stroke-width="5" stroke-linecap="round"/>` +
    `<circle cx="${cx}" cy="30" r="6" fill="${CORAL}"/>` +
    panSvg(b.left, 58, 84, px, gap) + panSvg(b.right, W - 58, 84, px, gap) + `</svg>`;
}
function balanceCard(puzzle) {
  const most = Math.max(...puzzle.balances.flatMap((b) => [b.left.shapes.length, b.right.shapes.length]));
  const svgs = puzzle.balances.map((b) => (most > 3 ? balanceSvg(b, 18, 3) : balanceSvg(b))).join('');
  const answers = puzzle.weights.map((w, s) => `<span style="display:inline-flex;align-items:center;gap:8px"><svg width="34" height="34" viewBox="0 0 34 34">${shapeSvg(s, 17, 17, 26)}</svg>${NUM('=', 22, TEAL)}${answerBox({ w: 64, h: 48, answer: w })}</span>`).join('');
  return `<div class="ws-card-stage" style="flex-direction:column;gap:10px"${stamp({ kind: 'balance', k: puzzle.k, max: puzzle.max, balances: puzzle.balances })}>` +
    `<div style="display:flex;gap:14px;justify-content:center">${svgs}</div>` +
    `<div style="display:flex;gap:30px;justify-content:center">${answers}</div></div>`;
}

// ---------------------------------------------------------------- the type factory
function makeLogicType(cfg) {
  const { id, slug, mode, gradeBand, i18n, size, symbols } = cfg;
  const themed = mode === 'code' || (mode === 'sudoku' && symbols === 'pictures');
  const minNouns = mode === 'code' ? 8 : size === 6 ? 9 : 6;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'visual-logic',
    exerciseType: 'visual-logic',
    themeAxis: themed ? { applicable: true, minNouns } : { applicable: false },
    puzzle: true,
    difficulty: { 1: { level: 1 }, 2: { level: 2 }, 3: { level: 3 } },
    i18n,

    build({ theme, difficulty, locale }, ctx) {
      const level = this.difficulty[difficulty].level;
      const rng = ctx.rng;
      const content = (inner, extra = '') => `<div data-ws-content data-lcs-logic-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;min-height:0${extra}">${inner}</div>`;
      const sig = (p) => JSON.stringify(p);
      /** `per` puzzles that differ from each other on the page (no-repeat), each from the engine */
      const distinct = (per, gen) => {
        const out = [];
        for (let guard = 0; out.length < per && guard < per + 6; guard++) { const p = gen(); if (!out.some((q) => sig(q) === sig(p))) out.push(p); }
        if (out.length < per) throw new Error(id + ': could not draw ' + per + ' different puzzles');
        return out;
      };

      if (mode === 'sudoku') {
        const lay = LAYOUT.sudoku[size][symbols];
        const pics = symbols === 'pictures' ? pickPictures(theme, size, rng, ctx) : null;
        const puzzles = distinct(lay.per, () => SUDOKU.generate({ n: size, level, rng }));
        const html = puzzles.map((p) => sudokuHtml({ n: size, puzzle: p, cell: lay.cell, symbols, pics, theme, ctx }));
        const meta = { items: puzzles.map((p) => p.grid.join('')), grade: puzzles.map((p) => p.grade.max), clues: puzzles.map((p) => p.clues) };
        if (lay.per === 1) return { bodyHtml: content(html[0]), meta };
        return { bodyHtml: cardGrid({ cards: html.map((h) => `<div class="ws-card-stage">${h}</div>`), cols: 1, rows: lay.per }), meta };
      }
      if (mode === 'cages') {
        const lay = LAYOUT.cages[size];
        const puzzles = distinct(lay.per, () => CAGES.generate({ n: size, level, rng }));
        const cards = puzzles.map((p) => `<div class="ws-card-stage">${cagesHtml({ n: size, puzzle: p, cell: lay.cell, locale, ctx })}</div>`);
        // the 4 × 4 instruction carries {RULE}: the product-cage sentence only on the level that prints a product cage
        // (an instruction never names apparatus that is not on the page); the sentence per locale from the maker strings
        const hasProduct = puzzles.some((p) => p.cages.some((cg) => cg.op === 'x'));
        const tokens = { RULE: hasProduct ? ' ' + (STRINGS._rule[locale] || STRINGS._rule.en) : '' };
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: lay.per }), tokens, meta: { items: puzzles.map((p) => p.cages.map((cg) => cg.cells.join('.') + cg.op + cg.target).join('|')), grade: puzzles.map((p) => p.grade.max) } };
      }
      if (mode === 'code') {
        const puzzle = CODE.generate({ level, rng });
        const pics = pickPictures(theme, puzzle.k, rng, ctx);
        return { bodyHtml: content(codeHtml({ puzzle, pics, theme, ctx })), meta: { items: puzzle.equations.map((e) => e.terms.join('+') + '=' + e.sum), values: puzzle.values } };
      }
      if (mode === 'balance') {
        const puzzles = distinct(3, () => BALANCE.generate({ level, rng }));
        return { bodyHtml: cardGrid({ cards: puzzles.map(balanceCard), cols: 1, rows: 3 }), meta: { items: puzzles.map((p) => p.weights.join(',') + ':' + JSON.stringify(p.balances)) } };
      }
      throw new Error('logic-more: unknown mode ' + mode);
    },

    /**
     * Inside the rendered page: every stamped puzzle is re-counted by its own compact exhaustive counter (a second
     * implementation, independent of the engine), the count must be exactly 1, and the answers the page carries
     * (answer boxes) must be that unique solution. Picture cells carry no answer on the page (the key draws it).
     */
    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const roots = [...document.querySelectorAll('[data-lcs-puzzle]')];
        if (!roots.length) return ['no puzzle stamped on the page'];
        const SIZES = { 4: [2, 2], 6: [2, 3] };
        const sudokuCount = (n, g, limit) => {
          const [br, bc] = SIZES[n]; let total = 0;
          const ok = (cell, v) => { const r = Math.floor(cell / n), c = cell % n; for (let k = 0; k < n; k++) if (g[r * n + k] === v || g[k * n + c] === v) return false; const r0 = Math.floor(r / br) * br, c0 = Math.floor(c / bc) * bc; for (let rr = r0; rr < r0 + br; rr++) for (let cc = c0; cc < c0 + bc; cc++) if (g[rr * n + cc] === v) return false; return true; };
          let sol = null;
          const rec = () => { const i = g.indexOf(-1); if (i < 0) { total++; sol = g.slice(); return total >= limit; } for (let v = 0; v < n; v++) { if (!ok(i, v)) continue; g[i] = v; const s = rec(); g[i] = -1; if (s) return true; } return false; };
          rec(); return { total, grid: sol };
        };
        const latinOk = (n, g, cell, v) => { const r = Math.floor(cell / n), c = cell % n; for (let k = 0; k < n; k++) if (g[r * n + k] === v || g[k * n + c] === v) return false; return true; };
        const cagesCount = (n, cages, limit) => {
          const g = new Array(n * n).fill(0); let total = 0; let sol = null;
          const val = (cg) => cg.op === 'x' ? cg.cells.reduce((a, c) => a * g[c], 1) : cg.cells.reduce((a, c) => a + g[c], 0);
          const rec = (i) => { if (i === n * n) { if (cages.every((cg) => val(cg) === cg.target)) { total++; sol = g.slice(); } return total >= limit; } for (let v = 1; v <= n; v++) { if (!latinOk(n, g, i, v)) continue; g[i] = v; const s = rec(i + 1); g[i] = 0; if (s) return true; } return false; };
          rec(0); return { total, grid: sol };
        };
        const codeCount = (k, max, eqs, limit) => {
          const val = new Array(k).fill(0); let total = 0, sol = null;
          const rec = (i) => { if (i === k) { if (eqs.every((e) => e.terms.reduce((a, t) => a + val[t], 0) === e.sum)) { total++; sol = val.slice(); } return total >= limit; } for (let v = 1; v <= max; v++) { if (val.slice(0, i).includes(v)) continue; val[i] = v; let fine = true; for (const e of eqs) { if (e.terms.every((t) => t <= i) && e.terms.reduce((a, t) => a + val[t], 0) !== e.sum) { fine = false; break; } } if (fine && rec(i + 1)) return true; } val[i] = 0; return false; };
          rec(0); return { total, values: sol };
        };
        const balCount = (k, max, bals, limit) => {
          const w = new Array(k).fill(0); let total = 0, sol = null;
          const pan = (p) => p.shapes.reduce((a, s) => a + w[s], 0) + (p.num || 0);
          const rec = (i) => { if (i === k) { if (bals.every((b) => pan(b.left) === pan(b.right))) { total++; sol = w.slice(); } return total >= limit; } for (let v = 1; v <= max; v++) { if (w.slice(0, i).includes(v)) continue; w[i] = v; if (rec(i + 1)) return true; } w[i] = 0; return false; };
          rec(0); return { total, weights: sol };
        };
        const boxes = (root) => [...root.querySelectorAll('.ws-answerbox[data-lcs-answer]')].map((b) => Number(b.getAttribute('data-lcs-answer')));
        roots.forEach((root, pi) => {
          let p;
          try { p = JSON.parse(root.getAttribute('data-lcs-puzzle')); } catch (e) { fails.push('puzzle ' + (pi + 1) + ': unreadable stamp'); return; }
          if (p.kind === 'sudoku') {
            const r = sudokuCount(p.n, p.grid.slice(), 2);
            if (r.total !== 1) { fails.push('puzzle ' + (pi + 1) + ': ' + r.total + ' solutions'); return; }
            const empties = p.grid.map((v, i) => i).filter((i) => p.grid[i] < 0);
            const cells = [...root.children];
            if (cells.length !== p.n * p.n) fails.push('puzzle ' + (pi + 1) + ': grid has ' + cells.length + ' cells');
            const bx = boxes(root);
            if (bx.length) {
              if (bx.length !== empties.length) fails.push('puzzle ' + (pi + 1) + ': ' + bx.length + ' boxes for ' + empties.length + ' empty cells');
              empties.forEach((cell, j) => { if (bx[j] !== r.grid[cell] + 1) fails.push('puzzle ' + (pi + 1) + ': box ' + (j + 1) + ' is not the unique solution'); });
            } else {
              empties.forEach((cell) => { if (cells[cell].querySelector('img:not([data-lcs-key-sample])')) fails.push('puzzle ' + (pi + 1) + ': an empty picture cell shows a picture'); });
            }
            cells.forEach((c, i) => { if ((p.grid[i] >= 0) !== c.hasAttribute('data-lcs-given')) fails.push('puzzle ' + (pi + 1) + ': cell ' + (i + 1) + ' given/empty mismatch'); });
          } else if (p.kind === 'cages') {
            const r = cagesCount(p.n, p.cages, 2);
            if (r.total !== 1) { fails.push('puzzle ' + (pi + 1) + ': ' + r.total + ' solutions'); return; }
            const cells = [...root.children];
            const bx = [];
            cells.forEach((c, i) => { const b = c.querySelector('.ws-answerbox[data-lcs-answer]'); if (b) bx.push([i, Number(b.getAttribute('data-lcs-answer'))]); else if (Number(c.textContent.trim()) !== r.grid[i]) fails.push('puzzle ' + (pi + 1) + ': given ' + (i + 1) + ' is wrong'); });
            for (const [i, v] of bx) if (v !== r.grid[i]) fails.push('puzzle ' + (pi + 1) + ': box at cell ' + (i + 1) + ' is not the unique solution');
            const labels = [...root.querySelectorAll('[data-lcs-cage-label]')];
            if (labels.length !== p.cages.filter((cg) => cg.cells.length > 1).length) fails.push('puzzle ' + (pi + 1) + ': a cage without its label');
          } else if (p.kind === 'code') {
            const r = codeCount(p.k, p.max, p.equations, 2);
            if (r.total !== 1) { fails.push('code: ' + r.total + ' solutions'); return; }
            const bx = boxes(root);
            if (bx.length !== p.k) fails.push('code: ' + bx.length + ' value boxes for ' + p.k + ' pictures');
            bx.forEach((v, i) => { if (v !== r.values[i]) fails.push('code: value box ' + (i + 1) + ' is not the unique solution'); });
            if (root.querySelectorAll('[data-lcs-code-row]').length !== p.equations.length) fails.push('code: rows and equations differ');
          } else if (p.kind === 'balance') {
            const r = balCount(p.k, p.max, p.balances, 2);
            if (r.total !== 1) { fails.push('balance ' + (pi + 1) + ': ' + r.total + ' solutions'); return; }
            const bx = boxes(root);
            if (bx.length !== p.k) fails.push('balance ' + (pi + 1) + ': ' + bx.length + ' boxes for ' + p.k + ' shapes');
            bx.forEach((v, i) => { if (v !== r.weights[i]) fails.push('balance ' + (pi + 1) + ': box ' + (i + 1) + ' is not the unique solution'); });
            if (root.querySelectorAll('svg[data-lcs-balance]').length !== p.balances.length) fails.push('balance ' + (pi + 1) + ': drawn balances and stamped balances differ');
            // every shape lies on ITS pan, clear of the post (a shape over the post or off the pan is one a child misses)
            root.querySelectorAll('svg[data-lcs-balance]').forEach((sv, bi) => {
              const pans = [...sv.querySelectorAll('rect[height="7"]')].map((r) => r.getBoundingClientRect());
              const post = sv.querySelector('line').getBoundingClientRect();
              sv.querySelectorAll('[data-lcs-shape]').forEach((sh) => {
                const r = sh.getBoundingClientRect();
                if (!pans.some((q) => r.left >= q.left - 0.5 && r.right <= q.right + 0.5)) fails.push('balance ' + (pi + 1) + '.' + (bi + 1) + ': a shape runs off its pan');
                if (r.left < post.right + 1 && r.right > post.left - 1) fails.push('balance ' + (pi + 1) + '.' + (bi + 1) + ': a shape sits on the post');
              });
            });
          } else fails.push('unknown puzzle kind ' + p.kind);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeLogicType, LAYOUT };
