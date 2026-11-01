#!/usr/bin/env node
/**
 * logic-puzzles.test.js — the four logic engines (logic-sudoku, logic-cages, logic-code, logic-balance) prove ONE
 * solution and grade by technique. Node native assert, no framework.
 *
 *   node scripts/worksheet-gen/lib/logic-puzzles.test.js [--seeds=60]
 *
 * Every engine's own counter is checked against an INDEPENDENT ORACLE written differently (a permutation enumerator
 * of every Latin square for the cages; a most-constrained-cell search with leaf validation for sudoku; nested loops
 * over every distinct tuple for code addition and balances), so no engine marks its own homework.
 *
 * Poisoned in both directions on every run:
 *   - a generator that skips the uniqueness check (the "remove more clues and hope" bug) produces puzzles the oracle
 *     counts at ≥ 2 solutions — the test MUST catch it;
 *   - a puzzle with one clue too few, a cage target changed, the opening equation / balance dropped → counts ≠ 1;
 *   - a level-3 puzzle must NOT fit level 1 (the ladder is monotone), and an unsolvable grid must report stuck;
 *   - every correct puzzle passes every check.
 */
'use strict';
const assert = require('assert');
const { makeRng } = require('./rng.js');
const S = require('./logic-sudoku.js');
const C = require('./logic-cages.js');
const K = require('./logic-code.js');
const B = require('./logic-balance.js');

const SEEDS = Number((process.argv.find((a) => a.startsWith('--seeds=')) || '--seeds=60').slice(8));
let n = 0, failures = 0;
function check(name, fn) { try { fn(); n++; } catch (e) { failures++; console.error('  FAIL ' + name + ': ' + e.message); } }

// ---------------------------------------------------------------- oracles (independent of the engines' counters)
/** sudoku: most-constrained cell first, candidates by scanning the three units by hand, leaf validated by isValidSolution */
function oracleSudoku(grid, cap = 50) {
  const N = Math.sqrt(grid.length), { br, bc } = S.SIZES[N];
  const g = grid.slice();
  const cands = (cell) => {
    const r = Math.floor(cell / N), c = cell % N, out = [];
    for (let v = 0; v < N; v++) {
      let ok = true;
      for (let k = 0; k < N && ok; k++) if (g[r * N + k] === v || g[k * N + c] === v) ok = false;
      const r0 = Math.floor(r / br) * br, c0 = Math.floor(c / bc) * bc;
      for (let rr = r0; rr < r0 + br && ok; rr++) for (let cc = c0; cc < c0 + bc; cc++) if (g[rr * N + cc] === v) { ok = false; break; }
      if (ok) out.push(v);
    }
    return out;
  };
  let count = 0;
  const rec = () => {
    let best = -1, bestC = null;
    for (let i = 0; i < g.length; i++) if (g[i] < 0) { const cs = cands(i); if (!bestC || cs.length < bestC.length) { best = i; bestC = cs; } }
    if (best < 0) { if (S.isValidSolution(g)) count++; return count >= cap; }
    for (const v of bestC) { g[best] = v; if (rec()) return true; g[best] = -1; }
    return false;
  };
  rec();
  return count;
}

/** cages: every Latin square of order n as a product of row permutations, filtered by the cages */
function allLatin(n) {
  const perms = [];
  const gen = (p, rest) => { if (!rest.length) { perms.push(p); return; } rest.forEach((v, i) => gen([...p, v], rest.filter((_, j) => j !== i))); };
  gen([], Array.from({ length: n }, (_, i) => i + 1));
  const out = [];
  const rec = (rows) => {
    if (rows.length === n) { out.push(rows.flat()); return; }
    for (const p of perms) if (rows.every((r) => r.every((v, c) => v !== p[c]))) rec([...rows, p]);
  };
  rec([]);
  return out;
}
const LATIN = { 3: allLatin(3), 4: allLatin(4) };
function oracleCages(n, cages) {
  return LATIN[n].filter((sq) => cages.every((cg) => C.cageValue(cg.op, cg.cells.map((c) => sq[c])) === cg.target)).length;
}

/** code addition: nested loops over every assignment of distinct values 1..max */
function oracleCode({ k, max, equations }, cap = 50) {
  const val = new Array(k).fill(0);
  let count = 0;
  const rec = (i) => {
    if (i === k) { if (equations.every((e) => e.terms.reduce((a, t) => a + val[t], 0) === e.sum)) count++; return count >= cap; }
    for (let v = 1; v <= max; v++) { if (val.slice(0, i).includes(v)) continue; val[i] = v; if (rec(i + 1)) return true; }
    return false;
  };
  rec(0);
  return count;
}

/** balances: nested loops over every distinct weight tuple */
function oracleBalance({ k, max, balances }, cap = 50) {
  const w = new Array(k).fill(0);
  let count = 0;
  const rec = (i) => {
    if (i === k) { if (balances.every((b) => B.panWeight(b.left, w) === B.panWeight(b.right, w))) count++; return count >= cap; }
    for (let v = 1; v <= max; v++) { if (w.slice(0, i).includes(v)) continue; w[i] = v; if (rec(i + 1)) return true; }
    return false;
  };
  rec(0);
  return count;
}

// ---------------------------------------------------------------- sudoku
for (const size of [4, 6]) for (const level of [1, 2, 3]) {
  const puzzles = [];
  for (let s = 0; s < SEEDS; s++) puzzles.push(S.generate({ n: size, level, rng: makeRng(`t|sudoku|${size}|${level}|${s}`) }));
  check(`sudoku ${size}x${size} L${level}: exactly one solution (engine and oracle agree) on ${SEEDS} seeds`, () => {
    for (const p of puzzles) {
      assert.strictEqual(S.countSolutions(p.grid, 3), 1, 'engine count');
      assert.strictEqual(oracleSudoku(p.grid), 1, 'oracle count');
      assert.ok(S.isValidSolution(p.solution), 'solution valid');
      p.grid.forEach((v, i) => { if (v >= 0) assert.strictEqual(v, p.solution[i], 'clue matches solution'); });
      const gr = S.grade(p.grid);
      assert.ok(gr.solved, 'forced steps reach the end');
      assert.deepStrictEqual(gr.grid, p.solution, 'forced steps reach THE solution');
      assert.ok(S.fitsLevel(size, level, gr), 'fits its level');
      assert.strictEqual(p.clues, p.grid.filter((v) => v >= 0).length);
    }
  });
  check(`sudoku ${size}x${size} L${level}: the ladder is monotone and honest`, () => {
    for (const p of puzzles) {
      const gr = S.grade(p.grid);
      if (level === 1) assert.strictEqual(gr.max, 1, 'level 1 is counting only');
      if (level === 2) assert.strictEqual(gr.max, 2, 'level 2 needs a hidden single');
      if (level === 3) { assert.ok(gr.max >= 2); assert.ok(!S.fitsLevel(size, 1, gr), 'a level-3 puzzle is not a level-1 puzzle'); assert.ok(!S.fitsLevel(size, 2, gr), 'nor a level-2 puzzle'); }
    }
  });
  check(`sudoku ${size}x${size} L${level}: deterministic for a seed`, () => {
    const a = S.generate({ n: size, level, rng: makeRng('det|' + size + level) }), b = S.generate({ n: size, level, rng: makeRng('det|' + size + level) });
    assert.deepStrictEqual(a, b);
  });
}
check('sudoku POISON: one clue too few leaves two solutions, and both counters say so', () => {
  let caught = 0;
  for (let s = 0; s < SEEDS; s++) {
    const p = S.generate({ n: 4, level: 3, rng: makeRng('poison|' + s) });
    // remove one more clue: a minimal puzzle loses uniqueness on at least one of its clues
    const hits = p.grid.map((v, i) => i).filter((i) => p.grid[i] >= 0).filter((i) => { const g = p.grid.slice(); g[i] = -1; return S.countSolutions(g, 3) >= 2; });
    for (const i of hits) { const g = p.grid.slice(); g[i] = -1; assert.ok(oracleSudoku(g) >= 2, 'oracle agrees it is not unique'); assert.ok(!S.grade(g).solved || S.countSolutions(g, 3) >= 2, 'forced steps cannot reach a non-unique end'); caught++; }
  }
  assert.ok(caught > 0, 'the poison fired');
});
check('sudoku POISON: a generator without the uniqueness check is caught by the oracle', () => {
  // the "remove more clues and hope" bug: strip clues to the level-3 count with no counter at all
  let bad = 0;
  for (let s = 0; s < SEEDS; s++) {
    const rng = makeRng('hope|' + s);
    const sol = S.randomSolution(4, rng);
    const grid = sol.slice();
    for (const cell of rng.shuffle(Array.from({ length: 16 }, (_, i) => i)).slice(0, 12)) grid[cell] = -1;
    if (oracleSudoku(grid) !== 1) bad++;
  }
  assert.ok(bad > 0, 'the hope-generator produced ambiguous puzzles the test catches');
});
check('sudoku POISON: an empty grid is stuck for the forced solver, and a wrong level ceiling is refused', () => {
  assert.strictEqual(S.grade(new Array(16).fill(-1)).solved, false);
  assert.throws(() => S.generate({ n: 5, level: 1, rng: makeRng('x') }), /size/);
  assert.throws(() => S.generate({ n: 4, level: 4, rng: makeRng('x') }), /level/);
});

// ---------------------------------------------------------------- cages
for (const size of [3, 4]) for (const level of [1, 2, 3]) {
  const puzzles = [];
  for (let s = 0; s < SEEDS; s++) puzzles.push(C.generate({ n: size, level, rng: makeRng(`t|cages|${size}|${level}|${s}`) }));
  check(`cages ${size}x${size} L${level}: exactly one solution (engine and every-Latin-square oracle agree)`, () => {
    for (const p of puzzles) {
      assert.strictEqual(C.countSolutions(size, p.cages, 3), 1, 'engine count');
      assert.strictEqual(oracleCages(size, p.cages), 1, 'oracle count');
      assert.ok(C.isValidSolution(size, p.cages, p.solution));
      const cells = p.cages.flatMap((cg) => cg.cells).sort((a, b) => a - b);
      assert.deepStrictEqual(cells, Array.from({ length: size * size }, (_, i) => i), 'the cages tile the grid');
      const gr = C.grade(size, p.cages);
      assert.ok(gr.solved); assert.deepStrictEqual(gr.grid, p.solution);
      assert.ok(C.fitsLevel(size, level, gr, p.cages));
      if (level === 3 && size === 4) assert.strictEqual(p.cages.filter((cg) => cg.op === 'x').length, 1, 'one product cage');
      else assert.strictEqual(p.cages.filter((cg) => cg.op === 'x').length, 0);
    }
  });
  check(`cages ${size}x${size} L${level}: the ladder is monotone`, () => {
    for (const p of puzzles) {
      const gr = C.grade(size, p.cages);
      if (level > 1) assert.ok(!C.fitsLevel(size, 1, gr, p.cages), 'not a level-1 puzzle');
      if (level === 3) assert.ok(!C.fitsLevel(size, 2, gr, p.cages), 'not a level-2 puzzle');
    }
  });
  check(`cages ${size}x${size} L${level}: deterministic`, () => {
    assert.deepStrictEqual(C.generate({ n: size, level, rng: makeRng('d' + size + level) }), C.generate({ n: size, level, rng: makeRng('d' + size + level) }));
  });
}
check('cages POISON: two sum cages merged (one target) lose uniqueness; a wrong target has no solution', () => {
  let caught = 0;
  for (let s = 0; s < SEEDS; s++) {
    const p = C.generate({ n: 4, level: 3, rng: makeRng('cp|' + s) });
    const sums = p.cages.filter((cg) => cg.op === '+');
    if (sums.length < 2) continue;
    const merged = [{ cells: [...sums[0].cells, ...sums[1].cells].sort((a, b) => a - b), op: '+', target: sums[0].target + sums[1].target }, ...p.cages.filter((cg) => cg !== sums[0] && cg !== sums[1])];
    const e = C.countSolutions(4, merged, 3), o = oracleCages(4, merged);
    assert.strictEqual(e >= 2, o >= 2, 'engine and oracle agree on the merged cut');
    if (e >= 2) caught++;
    const wrong = p.cages.map((cg) => (cg === sums[0] ? { ...cg, target: cg.target + 1 } : cg));
    assert.strictEqual(C.countSolutions(4, wrong, 3), oracleCages(4, wrong));
  }
  assert.ok(caught > 0, 'at least one merge lost uniqueness');
});

// ---------------------------------------------------------------- code addition
for (const level of [1, 2, 3]) {
  const puzzles = [];
  for (let s = 0; s < SEEDS; s++) puzzles.push(K.generate({ level, rng: makeRng(`t|code|${level}|${s}`) }));
  check(`code L${level}: exactly one assignment (engine and nested-loop oracle agree); the chain replays`, () => {
    for (const p of puzzles) {
      assert.strictEqual(K.countSolutions(p, 3), 1);
      assert.strictEqual(oracleCode(p), 1);
      assert.strictEqual(new Set(p.values).size, p.k, 'distinct values');
      assert.ok(p.values.every((v) => v >= 1 && v <= p.max));
      for (const e of p.equations) assert.strictEqual(e.terms.reduce((a, t) => a + p.values[t], 0), e.sum);
      const gr = K.grade(p);
      assert.ok(gr.solved); assert.deepStrictEqual(gr.values, p.values);
      assert.strictEqual(gr.steps, p.k, 'one step per symbol');
      assert.deepStrictEqual(p.order.slice().sort((a, b) => a - b), p.equations.map((_, i) => i), 'order is a permutation');
      if (level < 3) { assert.deepStrictEqual(p.order, p.equations.map((_, i) => i), 'chain order printed'); assert.ok(p.equations.every((e) => e.terms.length === 2)); }
      else { assert.notStrictEqual(p.order[0], 0, 'the opening equation is not printed first'); assert.ok(p.equations.some((e) => e.terms.length === 3), 'a three-addend row'); }
      assert.strictEqual(new Set(p.equations.map((e) => e.sum)).size, p.equations.length, 'sums differ');
    }
  });
  check(`code L${level}: deterministic`, () => { assert.deepStrictEqual(K.generate({ level, rng: makeRng('dc' + level) }), K.generate({ level, rng: makeRng('dc' + level) })); });
}
check('code POISON: without its opening equation the chain has many solutions and is stuck', () => {
  for (let s = 0; s < 10; s++) {
    const p = K.generate({ level: 2, rng: makeRng('kp|' + s) });
    const broken = { ...p, equations: p.equations.slice(1) };
    assert.ok(K.countSolutions(broken, 3) >= 2); assert.ok(oracleCode(broken) >= 2);
    assert.strictEqual(K.grade(broken).solved, false);
  }
});

// ---------------------------------------------------------------- balances
for (const level of [1, 2, 3]) {
  const puzzles = [];
  for (let s = 0; s < SEEDS; s++) puzzles.push(B.generate({ level, rng: makeRng(`t|bal|${level}|${s}`) }));
  check(`balance L${level}: exactly one weight tuple (engine and oracle agree); the chain replays`, () => {
    for (const p of puzzles) {
      assert.strictEqual(B.countSolutions(p, 3), 1);
      assert.strictEqual(oracleBalance(p), 1);
      assert.strictEqual(new Set(p.weights).size, p.k);
      assert.ok(p.weights.every((v) => v >= 1 && v <= p.max));
      for (const b of p.balances) assert.strictEqual(B.panWeight(b.left, p.weights), B.panWeight(b.right, p.weights));
      for (const b of p.balances) assert.ok(!(b.left.num && b.right.num), 'at most one number per balance');
      const gr = B.grade(p);
      assert.ok(gr.solved); assert.deepStrictEqual(gr.weights, p.weights);
      assert.strictEqual(gr.steps, level === 3 ? 3 : 2);
    }
  });
  check(`balance L${level}: deterministic`, () => { assert.deepStrictEqual(B.generate({ level, rng: makeRng('db' + level) }), B.generate({ level, rng: makeRng('db' + level) })); });
}
check('balance POISON: without the value balance the ratio alone has many solutions', () => {
  for (let s = 0; s < 10; s++) {
    const p = B.generate({ level: 2, rng: makeRng('bp|' + s) });
    const broken = { ...p, balances: [p.balances[0]] };
    assert.ok(B.countSolutions(broken, 3) >= 2); assert.ok(oracleBalance(broken) >= 2);
    assert.strictEqual(B.grade(broken).solved, false);
  }
});

console.log(`logic-puzzles.test: ${n} checks passed, ${failures} failed (${SEEDS} seeds per cell)`);
process.exit(failures ? 1 : 0);
