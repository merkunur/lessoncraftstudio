/**
 * logic-code.js — code addition: pictures stand for numbers (task 6 of the ten, 2026-11-01; the old code-addition
 * app's puzzle, rebuilt as a CHAIN per ENGINES [logic-puzzles-Q1]).
 *
 * k symbols (pictures) carry k DISTINCT values ≥ 1. The equations form a chain: the first equation uses ONE symbol
 * only (a double, A + A = 6, or at level 3 also a triple), and every later equation adds exactly ONE new symbol to
 * symbols already decodable from the equations before it. Each equation therefore pins one value, so the solution is
 * unique by construction — and `countSolutions` proves it anyway: an exhaustive backtracking count over all distinct
 * value assignments in 1..max (the symbols are assigned in chain order, an equation is checked the moment its last
 * symbol has a value, so the search is linear for a correct chain and complete for a broken one).
 *
 * GRADED BY TECHNIQUE: the steps a child does, in order —
 *   double   A + A = n              → A = n / 2 (a half)                     level 1
 *   known    A + B = n, A known     → B = n − A (a difference)               every level
 *   triple   A + A + A = n          → A = n / 3 (a third)                    level 3 may start with one
 *   three    A + B + C = n, A, B known → C = n − A − B (two differences)      level 3
 *   order    the equations are printed SHUFFLED, so the child must first FIND the equation she can solve   level 3
 * generate({ level, rng }) → { k, max, values, equations: [{ terms: [symbol…], sum }], order: [printed index → chain
 * index], grade: { steps, kinds } }
 *
 * Pure JS, no Node module, no DOM.
 */
'use strict';

const LEVELS = {
  1: { k: 3, max: 10, addends: 2, shuffle: false, starts: ['double'] },
  2: { k: 4, max: 20, addends: 2, shuffle: false, starts: ['double'] },
  3: { k: 5, max: 20, addends: 3, shuffle: true, starts: ['double', 'triple'] },
};
const ATTEMPTS = 200;

/**
 * Exhaustive count of distinct assignments in 1..max satisfying every equation (early exit at `limit`). Independent of
 * how the equations were built: symbols are assigned in the order of their first appearance, each equation is checked
 * as soon as every symbol in it has a value.
 */
function countSolutions({ k, max, equations }, limit = 2) {
  const order = [];
  for (const e of equations) for (const s of e.terms) if (!order.includes(s)) order.push(s);
  for (let s = 0; s < k; s++) if (!order.includes(s)) order.push(s);   // a symbol in no equation: free (counts many)
  const checkAt = order.map(() => []);
  equations.forEach((e, i) => { const last = Math.max(...e.terms.map((s) => order.indexOf(s))); checkAt[last].push(i); });
  const val = new Array(k).fill(0);
  const used = new Array(max + 1).fill(false);
  let total = 0;
  const rec = (i) => {
    if (i === order.length) { total++; return total >= limit; }
    const s = order[i];
    for (let v = 1; v <= max; v++) {
      if (used[v]) continue;
      val[s] = v; used[v] = true;
      let ok = true;
      for (const ei of checkAt[i]) { const e = equations[ei]; if (e.terms.reduce((a, t) => a + val[t], 0) !== e.sum) { ok = false; break; } }
      const stop = ok && rec(i + 1);
      used[v] = false; val[s] = 0;
      if (stop) return true;
    }
    return false;
  };
  rec(0);
  return total;
}

/** replay the chain as a child would: returns { solved, steps, kinds, values } or solved:false when an equation has ≥ 2 unknowns */
function grade({ k, equations }) {
  const known = new Array(k).fill(null);
  const kinds = [];
  let left = equations.map((e, i) => i);
  for (;;) {
    if (known.every((v) => v !== null)) return { solved: true, steps: kinds.length, kinds, values: known };
    let found = -1;
    for (const i of left) {
      const e = equations[i];
      const unknown = [...new Set(e.terms.filter((s) => known[s] === null))];
      if (unknown.length === 1) { found = i; break; }
    }
    if (found < 0) return { solved: false, steps: kinds.length, kinds, values: known };
    const e = equations[found];
    const u = e.terms.find((s) => known[s] === null);
    const times = e.terms.filter((s) => s === u).length;
    const rest = e.terms.filter((s) => s !== u).reduce((a, s) => a + known[s], 0);
    const v = (e.sum - rest) / times;
    if (!Number.isInteger(v) || v < 1) return { solved: false, steps: kinds.length, kinds, values: known };
    known[u] = v;
    kinds.push(times === 3 ? 'triple' : times === 2 ? (rest === 0 ? 'double' : 'double+') : e.terms.length === 3 ? 'three' : 'known');
    left = left.filter((i) => i !== found);
  }
}

function generate({ level, rng }) {
  const L = LEVELS[level];
  if (!L) throw new Error('logic-code: level must be 1, 2 or 3');
  for (let a = 0; a < ATTEMPTS; a++) {
    const start = rng.pick(L.starts);
    const mult = start === 'triple' ? 3 : 2;
    // values: distinct, the first one small enough for its double / triple to stay in range
    const first = rng.int(1, Math.floor(L.max / mult));
    const pool = [];
    for (let v = 1; v <= L.max; v++) if (v !== first) pool.push(v);
    const values = [first, ...rng.shuffle(pool).slice(0, L.k - 1)];
    const equations = [{ terms: new Array(mult).fill(0), sum: first * mult }];
    let ok = true;
    for (let s = 1; s < L.k && ok; s++) {
      // the new symbol s with one (or two, at 3 addends) already-known symbols; the sum must stay in range
      const knownSyms = Array.from({ length: s }, (_, i) => i);
      const options = [];
      for (const p of knownSyms) {
        if (values[p] + values[s] <= L.max) options.push([p, s]);
        if (L.addends === 3) for (const q of knownSyms) if (q >= p && values[p] + values[q] + values[s] <= L.max) options.push([p, q, s]);
      }
      if (!options.length) { ok = false; break; }
      // level 3 mixes two- and three-addend rows; the others stay at two
      const pick = rng.pick(L.addends === 3 ? options : options.filter((o) => o.length === 2));
      equations.push({ terms: rng.shuffle(pick), sum: pick.reduce((acc, t) => acc + values[t], 0) });
    }
    if (!ok) continue;
    // level 3 promises a three-addend row (two differences in one step): a chain of two-addend rows only is re-rolled
    if (L.addends === 3 && !equations.some((e) => e.terms.length === 3)) continue;
    // no two equations with the same sum (a child copies a sum, never a value — still, two equal sums read as a trick)
    if (new Set(equations.map((e) => e.sum)).size !== equations.length) continue;
    if (countSolutions({ k: L.k, max: L.max, equations }, 2) !== 1) continue;
    const gr = grade({ k: L.k, equations });
    if (!gr.solved) continue;
    const order = L.shuffle ? rng.shuffle(equations.map((_, i) => i)) : equations.map((_, i) => i);
    // shuffled: the solvable-first equation must not sit first (the child has to look for it)
    if (L.shuffle && order[0] === 0) continue;
    return { k: L.k, max: L.max, values, equations, order, grade: { steps: gr.steps, kinds: gr.kinds, shuffled: L.shuffle } };
  }
  throw new Error('logic-code: no chain at level ' + level);
}

module.exports = { LEVELS, countSolutions, grade, generate };
