/**
 * logic-cages.js — KenKen-style cage puzzles for the Logic & Math Puzzles maker (task 6 of the ten, 2026-11-01).
 *
 * A 3 × 3 or 4 × 4 Latin square (every row and column holds 1..n once) cut into CAGES; a cage of one cell shows its
 * value (a given), a cage of two or three cells shows the SUM of its cells (level 3 of the 4 × 4 also one PRODUCT cage).
 * Pure JS, no Node module, no DOM.
 *
 * ONE PROVEN SOLUTION: a cage cut is NOT unique by construction (two symmetric fillings of a cage are common), so every
 * cut is proven by `countSolutions` — an exhaustive backtracking counter over the cells with Latin + cage pruning,
 * early exit at `limit` — and `grade()` re-derives the whole solution by forced steps (a second, independent proof).
 *
 * GRADED BY TECHNIQUE (easiest step first; the level is the hardest step the puzzle NEEDS):
 *   1  given          a one-cell cage: write its number
 *   2  last-in-line   a row or column with one empty cell: the missing number (counting)
 *   3  cage-forced    every filling of a cage that still fits (its target, the numbers already placed, no repeat in a
 *                     row or column inside the cage) puts the same number in one of its cells ("3+ in two cells of a
 *                     1-2-3 row: the cell next to the 2 must be 1")
 *   4  hidden-single  a number has exactly one place left in a row or column (the cage fillings decide which cells
 *                     can still take it)
 *   5  naked-single   a cell has exactly one number left when its row, column and cage are all checked
 * Nothing beyond 5 (no pairs, no guessing): grade() reports stuck and the cut is rejected.
 *
 * generate({ n, level, rng }) → { n, solution, cages: [{ cells, op: '' | '+' | 'x', target }], grade }
 */
'use strict';

// Measured 2026-11-01 (200 cuts per cell): the cage-aware naked single (5) is never NEEDED on a 3 × 3 or 4 × 4 when
// the easier steps are tried first, so the ladder stands on givens + counting (1-2), the cage-forced cell (3) and the
// hidden single (4). `need` = the technique the level must need at least `needMin` times; `singles` = the allowed
// count of one-cell cages; `product` = level 3 of the 4 × 4 turns one sum cage into a product cage.
const LEVELS = {
  3: {
    1: { max: 2, sizes: [1, 1, 2, 2, 2], singles: [2, 9] },
    2: { max: 3, sizes: [1, 2, 2, 2, 3], singles: [1, 3], need: 3, needMin: 1 },
    3: { max: 4, sizes: [2, 2, 2, 3, 3], singles: [0, 1], need: 4, needMin: 1 },
  },
  4: {
    1: { max: 3, sizes: [1, 1, 2, 2, 2], singles: [2, 9] },
    2: { max: 4, sizes: [1, 2, 2, 2, 3], singles: [1, 3], need: 4, needMin: 1 },
    3: { max: 4, sizes: [2, 2, 2, 3, 3], singles: [0, 1], need: 4, needMin: 2, product: 1 },
  },
};
const ATTEMPTS = 60;      // cuts tried per solution
const SOLUTIONS = 12;     // solutions tried

const rowOf = (n, c) => Math.floor(c / n), colOf = (n, c) => c % n;

/** a random Latin square of order n (values 1..n), backtracking with rng-shuffled values */
function randomLatin(n, rng) {
  const g = new Array(n * n).fill(0);
  const vals = Array.from({ length: n }, (_, v) => v + 1);
  const ok = (cell, v) => {
    const r = rowOf(n, cell), c = colOf(n, cell);
    for (let k = 0; k < n; k++) if (g[r * n + k] === v || g[k * n + c] === v) return false;
    return true;
  };
  const fill = (cell) => {
    if (cell === n * n) return true;
    for (const v of rng.shuffle(vals)) {
      if (!ok(cell, v)) continue;
      g[cell] = v;
      if (fill(cell + 1)) return true;
      g[cell] = 0;
    }
    return false;
  };
  fill(0);
  return g;
}

/** cut the grid into cages by random growth over orthogonal neighbours; sizes drawn from the level's list */
function randomCut(n, L, rng) {
  const owner = new Array(n * n).fill(-1);
  const cages = [];
  const nb = (c) => {
    const r = rowOf(n, c), k = colOf(n, c), out = [];
    if (r > 0) out.push(c - n); if (r < n - 1) out.push(c + n); if (k > 0) out.push(c - 1); if (k < n - 1) out.push(c + 1);
    return out;
  };
  for (const start of rng.shuffle(Array.from({ length: n * n }, (_, i) => i))) {
    if (owner[start] >= 0) continue;
    const want = rng.pick(L.sizes);
    const cells = [start];
    owner[start] = cages.length;
    while (cells.length < want) {
      const free = rng.shuffle(cells.flatMap(nb).filter((c) => owner[c] < 0));
      if (!free.length) break;
      owner[free[0]] = cages.length;
      cells.push(free[0]);
    }
    cages.push({ cells: cells.sort((a, b) => a - b) });
  }
  return cages;
}

/** the arithmetic of a cage over values */
function cageValue(op, vals) { return op === 'x' ? vals.reduce((a, b) => a * b, 1) : vals.reduce((a, b) => a + b, 0); }

/**
 * Every filling of a cage that fits: values in each cell's candidate set, no repeat inside one row or column of the
 * cage, the target met. Candidates = a bitmask per cell (bit v-1 = value v may still go there).
 */
function cageFillings(n, cage, cand) {
  const cells = cage.cells, out = [];
  const vals = new Array(cells.length);
  const rec = (i, acc) => {
    if (i === cells.length) { if (acc === cage.target) out.push(vals.slice()); return; }
    for (let v = 1; v <= n; v++) {
      if (!(cand[cells[i]] & (1 << (v - 1)))) continue;
      let clash = false;
      for (let j = 0; j < i; j++) {
        if (vals[j] === v && (rowOf(n, cells[j]) === rowOf(n, cells[i]) || colOf(n, cells[j]) === colOf(n, cells[i]))) { clash = true; break; }
      }
      if (clash) continue;
      const next = cage.op === 'x' ? acc * v : acc + v;
      if (cage.op === 'x' ? (cage.target % next !== 0) : next > cage.target) continue;
      vals[i] = v;
      rec(i + 1, next);
    }
  };
  rec(0, cage.op === 'x' ? 1 : 0);
  return out;
}

/** exhaustive solution counter (early exit at limit); grid values 1..n, 0 = empty; never mutates its input */
function countSolutions(n, cages, limit = 2) {
  const owner = new Array(n * n).fill(-1);
  cages.forEach((cg, i) => cg.cells.forEach((c) => { owner[c] = i; }));
  if (owner.some((o) => o < 0)) throw new Error('logic-cages: a cell belongs to no cage');
  const g = new Array(n * n).fill(0);
  let total = 0;
  const fits = (cell) => {
    const cg = cages[owner[cell]];
    let acc = cg.op === 'x' ? 1 : 0, left = 0;
    for (const c of cg.cells) { if (g[c]) acc = cg.op === 'x' ? acc * g[c] : acc + g[c]; else left++; }
    if (left === 0) return acc === cg.target;
    // bounds on what the empty cells can still add (values 1..n each)
    if (cg.op === 'x') return cg.target % acc === 0 && acc * 1 <= cg.target && acc * Math.pow(n, left) >= cg.target;
    return acc + left <= cg.target && acc + left * n >= cg.target;
  };
  const rec = (cell) => {
    if (cell === n * n) { total++; return total >= limit; }
    const r = rowOf(n, cell), c = colOf(n, cell);
    for (let v = 1; v <= n; v++) {
      let ok = true;
      for (let k = 0; k < n; k++) if (g[r * n + k] === v || g[k * n + c] === v) { ok = false; break; }
      if (!ok) continue;
      g[cell] = v;
      if (fits(cell) && rec(cell + 1)) return true;
      g[cell] = 0;
    }
    g[cell] = 0;
    return false;
  };
  rec(0);
  return total;
}

/** forced-step solver; returns { solved, max, steps, counts, grid } */
function grade(n, cages) {
  const FULL = (1 << n) - 1;
  const owner = new Array(n * n).fill(-1);
  cages.forEach((cg, i) => cg.cells.forEach((c) => { owner[c] = i; }));
  const g = new Array(n * n).fill(0);
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let max = 0, steps = 0;
  const place = (cell, v, t) => { g[cell] = v; counts[t]++; steps++; if (t > max) max = t; };
  // Latin candidates of a cell from the placed numbers in its row and column
  const latin = (cell) => {
    if (g[cell]) return 1 << (g[cell] - 1);
    const r = rowOf(n, cell), c = colOf(n, cell);
    let m = FULL;
    for (let k = 0; k < n; k++) { if (g[r * n + k]) m &= ~(1 << (g[r * n + k] - 1)); if (g[k * n + c]) m &= ~(1 << (g[k * n + c] - 1)); }
    return m;
  };
  for (;;) {
    if (!g.includes(0)) return { solved: true, max, steps, counts, grid: g };
    let done = false;
    // 1. givens
    for (const cg of cages) if (cg.cells.length === 1 && !g[cg.cells[0]]) { place(cg.cells[0], cg.target, 1); done = true; break; }
    if (done) continue;
    // 2. last in a row / column
    for (let i = 0; i < 2 * n && !done; i++) {
      const line = i < n ? Array.from({ length: n }, (_, k) => i * n + k) : Array.from({ length: n }, (_, k) => k * n + (i - n));
      let empty = -1, k = 0, seen = 0;
      for (const c of line) { if (!g[c]) { empty = c; k++; } else seen |= 1 << (g[c] - 1); }
      if (k === 1) { let v = 1; while (seen & (1 << (v - 1))) v++; place(empty, v, 2); done = true; }
    }
    if (done) continue;
    // candidates per cell: Latin ∩ what some fitting cage filling allows
    const cand = g.map((_, c) => latin(c));
    const cageCand = cand.slice();
    for (const cg of cages) {
      if (cg.cells.every((c) => g[c])) continue;
      const fills = cageFillings(n, cg, cand);
      const allow = cg.cells.map(() => 0);
      for (const f of fills) f.forEach((v, i) => { allow[i] |= 1 << (v - 1); });
      cg.cells.forEach((c, i) => { cageCand[c] &= allow[i]; });
    }
    // 3. cage-forced: a cell whose cage fillings all agree (only the cage was needed, not another line's number)
    for (const cg of cages) {
      if (done) break;
      for (const c of cg.cells) {
        if (g[c]) continue;
        const m = cageCand[c];
        if (m && !(m & (m - 1)) && cand[c] !== m) { place(c, Math.log2(m) + 1, 3); done = true; break; }
      }
    }
    if (done) continue;
    // 4. hidden single in a row / column, over the cage-aware candidates
    for (let i = 0; i < 2 * n && !done; i++) {
      const line = i < n ? Array.from({ length: n }, (_, k) => i * n + k) : Array.from({ length: n }, (_, k) => k * n + (i - n));
      for (let v = 1; v <= n && !done; v++) {
        if (line.some((c) => g[c] === v)) continue;
        const places = line.filter((c) => !g[c] && (cageCand[c] & (1 << (v - 1))));
        if (places.length === 1) { place(places[0], v, 4); done = true; }
      }
    }
    if (done) continue;
    // 5. naked single: one candidate left (row, column and cage together)
    for (let c = 0; c < g.length && !done; c++) {
      if (g[c]) continue;
      const m = cageCand[c];
      if (m && !(m & (m - 1))) { place(c, Math.log2(m) + 1, 5); done = true; }
    }
    if (!done) return { solved: false, max, steps, counts, grid: g };
  }
}

/** a grade + cut fit a level: the technique ceiling, the needed technique, and exactly the level's product cages */
function fitsLevel(n, level, gr, cages) {
  const L = LEVELS[n][level];
  if (!gr.solved || gr.max > L.max) return false;
  if (L.need != null && gr.counts[L.need] < (L.needMin || 1)) return false;
  if (cages && cages.filter((cg) => cg.op === 'x').length !== (L.product || 0)) return false;
  return true;
}

/** build one puzzle: a random Latin square, random cuts until one is unique and graded at the level */
function generate({ n, level, rng }) {
  if (!LEVELS[n]) throw new Error('logic-cages: size must be 3 or 4');
  const L = LEVELS[n][level];
  if (!L) throw new Error('logic-cages: level must be 1, 2 or 3');
  for (let s = 0; s < SOLUTIONS; s++) {
    const solution = randomLatin(n, rng);
    for (let a = 0; a < ATTEMPTS; a++) {
      const cages = randomCut(n, L, rng);
      const singles = cages.filter((cg) => cg.cells.length === 1).length;
      if (singles < L.singles[0] || singles > L.singles[1]) continue;
      // every cage of ≥ 2 cells is a sum; level 3 of the 4 × 4 turns one of them (never 1 × …) into a product
      for (const cg of cages) { cg.op = cg.cells.length === 1 ? '' : '+'; cg.target = cageValue(cg.op, cg.cells.map((c) => solution[c])); }
      if (L.product) {
        const big = rng.shuffle(cages.filter((cg) => cg.cells.length >= 2 && cg.cells.every((c) => solution[c] > 1)));
        if (!big.length) continue;
        big[0].op = 'x'; big[0].target = cageValue('x', big[0].cells.map((c) => solution[c]));
      }
      if (countSolutions(n, cages, 2) !== 1) continue;
      const gr = grade(n, cages);
      if (!fitsLevel(n, level, gr, cages)) continue;
      return { n, solution, cages, grade: { max: gr.max, steps: gr.steps, counts: gr.counts } };
    }
  }
  throw new Error('logic-cages: no ' + n + 'x' + n + ' cage puzzle at level ' + level);
}

/** a full grid is a Latin square and meets every cage */
function isValidSolution(n, cages, grid) {
  for (let i = 0; i < n; i++) {
    let row = 0, col = 0;
    for (let k = 0; k < n; k++) { row |= 1 << (grid[i * n + k] - 1); col |= 1 << (grid[k * n + i] - 1); }
    if (row !== (1 << n) - 1 || col !== (1 << n) - 1) return false;
  }
  return cages.every((cg) => cageValue(cg.op, cg.cells.map((c) => grid[c])) === cg.target);
}

module.exports = { LEVELS, randomLatin, countSolutions, grade, generate, fitsLevel, isValidSolution, cageValue, cageFillings };
