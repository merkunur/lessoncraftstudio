/**
 * logic-sudoku.js — the technique-graded sudoku engine of the Logic & Math Puzzles maker (task 6 of the ten, 2026-11-01).
 *
 * Pure JS, no Node module, no DOM: it runs unchanged in the catalogue pipeline and in a maker bundle. Two sizes:
 *   4 × 4 with 2 × 2 boxes  (values 0..3)      6 × 6 with 2-row × 3-column boxes (values 0..5)
 * The same grid serves numerals (value + 1) and pictures (value = the legend index).
 *
 * ONE PROVEN SOLUTION. `countSolutions(grid, limit)` is an exhaustive backtracking counter (the order of the empty cells
 * is fixed, every value tried, early exit at `limit`); the generator never keeps a clue removal the counter does not
 * prove unique, and `grade()` re-derives the full solution by forced deductions only — a puzzle a forced-step solver
 * completes has exactly one solution by construction, and the counter is the independent proof of the same fact.
 *
 * GRADED BY TECHNIQUE, never "remove more clues and hope". The solver `grade()` plays the puzzle the way a child is
 * taught, easiest step first, and records which techniques it needed:
 *   1  last-in-unit    a row, column or box has one empty cell left → the missing value goes there (counting)
 *   2  hidden-single   a value is missing from a unit and only one empty cell of that unit can take it
 *                      ("where can the cat go in this row?")
 *   3  naked-single    a cell has exactly one value left when its row, column AND box are all checked
 * A puzzle that needs anything beyond 3 (pairs, guessing) is REFUSED: grade() reports `stuck` and the generator keeps the
 * clue. The level is the hardest technique the puzzle NEEDS (the greedy easiest-first solver had no easier step at
 * that moment) plus a step budget:
 *   level 1   needs at most hidden singles, at most LEVELS[n][1].hidden of them (short, mostly counting)
 *   level 2   needs hidden singles, at least LEVELS[n][2].hidden of them, never a naked single
 *   level 3   needs at least one naked single (the three-unit check), never more than that
 *
 * generate({ n, level, rng }) → { grid, solution, clues, grade: { max, steps, counts } }  or throws after ATTEMPTS
 * full solutions (deterministic: the same rng stream gives the same puzzle).
 */
'use strict';

const SIZES = {
  4: { n: 4, br: 2, bc: 2 },
  6: { n: 6, br: 2, bc: 3 },
};

/** the step budgets per size and level (measured over 400 seeds per cell in logic-puzzles.test.js / .bench.js) */
// Measured 2026-11-01 (150 seeds per cell): with hidden singles tried before naked singles a naked single is NEVER
// needed on a 4 × 4 and needed on 3 % of 6 × 6 puzzles at minimum clues — so the ladder is built on the two techniques
// a child actually meets: counting (last in unit) and the hidden single; level 3 of the 6 × 6 may also need one naked
// single. Counting-only puzzles have 8 clues (4 × 4) / 23 clues (6 × 6); the hidden-single count is the real difficulty.
const LEVELS = {
  4: { 1: { max: 1 }, 2: { max: 2, hiddenMin: 1, hiddenMax: 3 }, 3: { max: 2, hiddenMin: 4 } },
  6: { 1: { max: 1 }, 2: { max: 2, hiddenMin: 1, hiddenMax: 6 }, 3: { max: 3, hiddenMin: 10 } },
};
const ATTEMPTS = 40;

/** the units (rows, columns, boxes) of a size as cell index lists, and each cell's three units */
const _units = {};
function units(n) {
  if (_units[n]) return _units[n];
  const { br, bc } = SIZES[n];
  const list = [];
  for (let r = 0; r < n; r++) list.push(Array.from({ length: n }, (_, c) => r * n + c));
  for (let c = 0; c < n; c++) list.push(Array.from({ length: n }, (_, r) => r * n + c));
  for (let r0 = 0; r0 < n; r0 += br) for (let c0 = 0; c0 < n; c0 += bc) {
    const box = [];
    for (let r = r0; r < r0 + br; r++) for (let c = c0; c < c0 + bc; c++) box.push(r * n + c);
    list.push(box);
  }
  const ofCell = Array.from({ length: n * n }, () => []);
  list.forEach((u, i) => u.forEach((cell) => ofCell[cell].push(i)));
  // the peers of a cell: every other cell sharing a unit with it
  const peers = Array.from({ length: n * n }, (_, cell) => {
    const s = new Set();
    for (const ui of ofCell[cell]) for (const c of list[ui]) if (c !== cell) s.add(c);
    return [...s];
  });
  return (_units[n] = { list, ofCell, peers });
}

/** exhaustive solution counter with early exit at `limit` (default 2: "is it unique?"); never mutates `grid` */
function countSolutions(grid, limit = 2) {
  const n = Math.sqrt(grid.length);
  if (!SIZES[n]) throw new Error('logic-sudoku: not a 4x4 or 6x6 grid');
  const { peers } = units(n);
  const g = grid.slice();
  const empties = [];
  for (let i = 0; i < g.length; i++) if (g[i] < 0) empties.push(i);
  let total = 0;
  const rec = (k) => {
    if (k === empties.length) { total++; return total >= limit; }
    const cell = empties[k];
    for (let v = 0; v < n; v++) {
      let ok = true;
      for (const p of peers[cell]) if (g[p] === v) { ok = false; break; }
      if (!ok) continue;
      g[cell] = v;
      const stop = rec(k + 1);
      g[cell] = -1;
      if (stop) return true;
    }
    return false;
  };
  rec(0);
  return total;
}

/**
 * Play the puzzle with forced deductions only, easiest first. Returns { solved, max, steps, counts:{1,2,3}, grid } —
 * `max` = the hardest technique needed (0 when nothing was needed), `solved` false when the solver is stuck.
 */
function grade(grid) {
  const n = Math.sqrt(grid.length);
  const U = units(n);
  const g = grid.slice();
  const counts = { 1: 0, 2: 0, 3: 0 };
  let max = 0, steps = 0;
  const canTake = (cell, v) => { for (const p of U.peers[cell]) if (g[p] === v) return false; return true; };
  const place = (cell, v, t) => { g[cell] = v; counts[t]++; steps++; if (t > max) max = t; };
  for (;;) {
    if (g.indexOf(-1) < 0) return { solved: true, max, steps, counts, grid: g };
    // 1. last in unit
    let done = false;
    for (const u of U.list) {
      let empty = -1, k = 0, seen = 0;
      for (const c of u) { if (g[c] < 0) { empty = c; k++; } else seen |= 1 << g[c]; }
      if (k === 1) { let v = 0; while (seen & (1 << v)) v++; place(empty, v, 1); done = true; break; }
    }
    if (done) continue;
    // 2. hidden single
    for (const u of U.list) {
      let seen = 0;
      for (const c of u) if (g[c] >= 0) seen |= 1 << g[c];
      for (let v = 0; v < n && !done; v++) {
        if (seen & (1 << v)) continue;
        let where = -1, k = 0;
        for (const c of u) if (g[c] < 0 && canTake(c, v)) { where = c; k++; if (k > 1) break; }
        if (k === 1) { place(where, v, 2); done = true; }
      }
      if (done) break;
    }
    if (done) continue;
    // 3. naked single
    for (let cell = 0; cell < g.length && !done; cell++) {
      if (g[cell] >= 0) continue;
      let only = -1, k = 0;
      for (let v = 0; v < n; v++) if (canTake(cell, v)) { only = v; k++; if (k > 1) break; }
      if (k === 1) { place(cell, only, 3); done = true; }
    }
    if (!done) return { solved: false, max, steps, counts, grid: g };
  }
}

/** a random full solution: backtracking fill with rng-shuffled values (deterministic for a given rng stream) */
function randomSolution(n, rng) {
  const { peers } = units(n);
  const g = new Array(n * n).fill(-1);
  const vals = Array.from({ length: n }, (_, v) => v);
  const fill = (cell) => {
    if (cell === g.length) return true;
    for (const v of rng.shuffle(vals)) {
      let ok = true;
      for (const p of peers[cell]) if (g[p] === v) { ok = false; break; }
      if (!ok) continue;
      g[cell] = v;
      if (fill(cell + 1)) return true;
      g[cell] = -1;
    }
    return false;
  };
  fill(0);
  return g;
}

/** does a grade result satisfy a level's budget? */
function fitsLevel(n, level, gr) {
  const L = LEVELS[n][level];
  if (!gr.solved || gr.max > L.max) return false;
  if (L.hiddenMax != null && gr.counts[2] > L.hiddenMax) return false;
  if (L.hiddenMin != null && gr.counts[2] < L.hiddenMin) return false;
  if (L.nakedMin != null && gr.counts[3] < L.nakedMin) return false;
  return true;
}

/**
 * Build one puzzle of size n at a level. Clues are removed in a random order; a removal is kept only while the puzzle
 * stays uniquely solvable (the counter) AND within the level's technique ceiling (the grade); at level 1 also while
 * the hidden-single budget holds. The result must then meet the level's minimums, else the next solution is tried.
 */
function generate({ n, level, rng }) {
  if (!SIZES[n]) throw new Error('logic-sudoku: size must be 4 or 6');
  const L = LEVELS[n][level];
  if (!L) throw new Error('logic-sudoku: level must be 1, 2 or 3');
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const solution = randomSolution(n, rng);
    const grid = solution.slice();
    const order = rng.shuffle(Array.from({ length: n * n }, (_, i) => i));
    let last = grade(grid);
    for (const cell of order) {
      const keep = grid[cell];
      grid[cell] = -1;
      const gr = grade(grid);
      const within = gr.solved && gr.max <= L.max && (L.hiddenMax == null || gr.counts[2] <= L.hiddenMax);
      if (!within || countSolutions(grid, 2) !== 1) { grid[cell] = keep; continue; }
      last = gr;
    }
    if (!fitsLevel(n, level, last)) continue;
    const clues = grid.filter((v) => v >= 0).length;
    return { n, grid, solution, clues, grade: { max: last.max, steps: last.steps, counts: last.counts } };
  }
  throw new Error('logic-sudoku: no ' + n + 'x' + n + ' puzzle at level ' + level + ' in ' + ATTEMPTS + ' attempts');
}

/** every row, column and box of a full grid holds each value once */
function isValidSolution(grid) {
  const n = Math.sqrt(grid.length);
  if (!SIZES[n]) return false;
  for (const u of units(n).list) {
    let seen = 0;
    for (const c of u) { const v = grid[c]; if (!(v >= 0 && v < n) || (seen & (1 << v))) return false; seen |= 1 << v; }
  }
  return true;
}

module.exports = { SIZES, LEVELS, units, countSolutions, grade, randomSolution, generate, fitsLevel, isValidSolution };
