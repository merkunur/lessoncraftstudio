/**
 * logic-balance.js — balances with two or three unknown shapes (task 6 of the ten, 2026-11-01; NEW-TEMPLATES §22 T6,
 * the two-unknown sibling of G3-350's one-unknown balance).
 *
 * Shapes carry DISTINCT weights ≥ 1. A puzzle is a short chain of balances, each with shapes (and at most one
 * number) on its pans:
 *   ratio    ▲ ▲ = ■             the square weighs two triangles (B = 2·A; or three)
 *   pair     ▲ ■ = 12            a triangle and a square together weigh 12 (A + B = n)
 *   double   ■ ■ = 12            two squares weigh 12 (2·B = n)
 *   mixed    ▲ ▲ ■ = 14          (2·A + B = n)
 *   third    ● = ▲ ■  /  ● ● = ▲ ■ ■    the third shape from the first two (level 3)
 * Unique by construction — the balances form a triangular system: after the first two balances both A and B are
 * fixed (a ratio + a value, or two sums with different coefficients), the third fixes C. `countSolutions` proves it
 * independently: an exhaustive count over every distinct weight tuple in 1..max.
 *
 * GRADED BY TECHNIQUE (the steps a child does):
 *   level 1   max 20 · ratio + double: substitute the ratio, halve → 2 steps
 *   level 2   max 50 · ratio + pair / mixed: substitute the ratio, divide by 3 (or 4) → 2 steps with a larger number
 *   level 3   max 50 · three unknowns: the level-2 pair, then a third balance read with both values known → 3 steps
 * generate({ level, rng }) → { k, max, weights, balances: [{ left: {shapes, num}, right: {shapes, num} }], grade }
 *
 * Pure JS, no Node module, no DOM.
 */
'use strict';

const LEVELS = {
  1: { k: 2, max: 20, ratios: [2, 3], second: ['double'] },
  2: { k: 2, max: 50, ratios: [2, 3, 4], second: ['pair', 'mixed'] },
  3: { k: 3, max: 50, ratios: [2, 3, 4], second: ['pair', 'mixed'], third: ['sum', 'double-sum'] },
};
const ATTEMPTS = 200;

/** a pan's weight under an assignment */
const panWeight = (pan, w) => pan.shapes.reduce((a, s) => a + w[s], 0) + (pan.num || 0);

/** exhaustive count of distinct weight tuples in 1..max meeting every balance (early exit at limit) */
function countSolutions({ k, max, balances }, limit = 2) {
  const w = new Array(k).fill(0);
  // a balance is checked the moment its last shape gets a weight (shapes are assigned 0..k-1 in order)
  const checkAt = Array.from({ length: k }, () => []);
  balances.forEach((b, i) => {
    const shapes = [...b.left.shapes, ...b.right.shapes];
    checkAt[shapes.length ? Math.max(...shapes) : 0].push(i);
  });
  const used = new Array(max + 1).fill(false);
  let total = 0;
  const rec = (i) => {
    if (i === k) { total++; return total >= limit; }
    for (let v = 1; v <= max; v++) {
      if (used[v]) continue;
      w[i] = v; used[v] = true;
      let ok = true;
      for (const bi of checkAt[i]) { const b = balances[bi]; if (panWeight(b.left, w) !== panWeight(b.right, w)) { ok = false; break; } }
      const stop = ok && rec(i + 1);
      used[v] = false; w[i] = 0;
      if (stop) return true;
    }
    return false;
  };
  rec(0);
  return total;
}

/** replay the chain: a balance is readable when at most one DISTINCT shape on it is unknown */
function grade({ k, balances }) {
  const known = new Array(k).fill(null);
  const kinds = [];
  let left = balances.map((_, i) => i);
  for (;;) {
    if (known.every((v) => v !== null)) return { solved: true, steps: kinds.length, kinds, weights: known };
    let found = -1, ratio = -1;
    for (const i of left) {
      const b = balances[i];
      const shapes = [...new Set([...b.left.shapes, ...b.right.shapes])];
      const unknown = shapes.filter((s) => known[s] === null);
      if (unknown.length === 1) { found = i; break; }
      // a ratio balance (two unknowns, no number, one shape per side repeated) is usable once ONE of them is known —
      // or first, when the other balance gives the value: handled by trying the value balance first
      if (unknown.length === 2 && !b.left.num && !b.right.num && ratio < 0) ratio = i;
    }
    if (found < 0) {
      // nothing readable alone: a ratio balance + a value balance over the same two shapes (level 1-2 opening)
      const r = balances[ratio], valueIdx = left.find((i) => i !== ratio && !known.some((v) => v !== null) && (balances[i].left.num || balances[i].right.num));
      if (ratio < 0 || valueIdx == null) return { solved: false, steps: kinds.length, kinds, weights: known };
      // substitute: express both pans of the value balance in the ratio's small shape
      const small = r.left.shapes.length > r.right.shapes.length ? r.left.shapes[0] : r.right.shapes[0];
      const big = small === r.left.shapes[0] ? r.right.shapes[0] : r.left.shapes[0];
      const mult = Math.max(r.left.shapes.length, r.right.shapes.length);
      const v = balances[valueIdx];
      const coef = (pan) => pan.shapes.reduce((a, s) => a + (s === small ? 1 : s === big ? mult : NaN), 0);
      const cl = coef(v.left), cr = coef(v.right);
      const num = (v.right.num || 0) - (v.left.num || 0);
      const c = cl - cr;   // c · small = num
      if (!(c > 0) || !Number.isInteger(num / c) || num / c < 1) return { solved: false, steps: kinds.length, kinds, weights: known };
      known[small] = num / c; known[big] = known[small] * mult;
      kinds.push('substitute', 'divide');
      left = left.filter((i) => i !== ratio && i !== valueIdx);
      continue;
    }
    const b = balances[found];
    const u = [...b.left.shapes, ...b.right.shapes].find((s) => known[s] === null);
    const cl = b.left.shapes.filter((s) => s === u).length, cr = b.right.shapes.filter((s) => s === u).length;
    const rest = (pan) => pan.shapes.filter((s) => s !== u).reduce((a, s) => a + known[s], 0) + (pan.num || 0);
    const c = cl - cr, num = rest(b.right) - rest(b.left);
    if (c === 0 || !Number.isInteger(num / c) || num / c < 1) return { solved: false, steps: kinds.length, kinds, weights: known };
    known[u] = num / c;
    kinds.push(Math.abs(c) > 1 ? 'divide' : 'read');
    left = left.filter((i) => i !== found);
  }
}

function generate({ level, rng }) {
  const L = LEVELS[level];
  if (!L) throw new Error('logic-balance: level must be 1, 2 or 3');
  const A = 0, B = 1, C = 2;
  for (let a = 0; a < ATTEMPTS; a++) {
    const ratio = rng.pick(L.ratios);
    const second = rng.pick(L.second);
    // the biggest number on the value balance must stay ≤ max: double 2·ratio·A, pair (ratio + 1)·A, mixed (ratio + 2)·A
    const coef = second === 'double' ? 2 * ratio : second === 'pair' ? ratio + 1 : ratio + 2;
    const top = Math.floor(L.max / coef);
    if (top < 2) continue;
    const wA = rng.int(2, top);
    const wB = wA * ratio;
    const weights = [wA, wB];
    const balances = [];
    // the ratio balance, sides drawn at random
    const r = { left: { shapes: new Array(ratio).fill(A) }, right: { shapes: [B] } };
    balances.push(rng.next() < 0.5 ? r : { left: r.right, right: r.left });
    let s;
    if (second === 'double') s = { left: { shapes: [B, B] }, right: { shapes: [], num: 2 * wB } };
    else if (second === 'pair') s = { left: { shapes: rng.shuffle([A, B]) }, right: { shapes: [], num: wA + wB } };
    else s = { left: { shapes: rng.shuffle([A, A, B]) }, right: { shapes: [], num: 2 * wA + wB } };
    if (s.right.num > L.max) continue;
    balances.push(rng.next() < 0.5 ? s : { left: s.right, right: s.left });
    if (L.k === 3) {
      const third = rng.pick(L.third);
      const wC = third === 'sum' ? wA + wB : wA + 2 * wB;
      if (wC > L.max || wC === wA || wC === wB) continue;
      weights.push(wC);
      const t = third === 'sum' ? { left: { shapes: [C] }, right: { shapes: rng.shuffle([A, B]) } } : { left: { shapes: [C] }, right: { shapes: rng.shuffle([A, B, B]) } };
      balances.push(rng.next() < 0.5 ? t : { left: t.right, right: t.left });
    }
    if (new Set(weights).size !== weights.length) continue;
    if (countSolutions({ k: L.k, max: L.max, balances }, 2) !== 1) continue;
    const gr = grade({ k: L.k, balances });
    if (!gr.solved || gr.weights.some((v, i) => v !== weights[i])) continue;
    return { k: L.k, max: L.max, weights, balances, grade: { steps: gr.steps, kinds: gr.kinds } };
  }
  throw new Error('logic-balance: no puzzle at level ' + level);
}

module.exports = { LEVELS, countSolutions, grade, generate, panWeight };
