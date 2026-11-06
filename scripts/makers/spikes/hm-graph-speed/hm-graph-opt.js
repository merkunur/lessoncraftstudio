// The exact-output speed-ups for lib/hm-graph.js (G1-427 make-10 mazes: up to 15 s a page), as text edits on the source.
// apply(src) → the optimised source; every edit must find its needle exactly once.
'use strict';
const EDITS = [
  // 1. sortBy: the same shuffle and the same key calls in the same order (rnd is consumed identically), sorted as an index
  //    array by the same comparator (key, then position) — no [key, i, v] triple per element
  ["function sortBy(arr, key, rnd) { return shuffle(arr, rnd).map((v, i) => [key(v), i, v]).sort((x, y) => x[0] - y[0] || x[1] - y[1]).map((t) => t[2]); }",
   "function sortBy(arr, key, rnd) {\n  const a = shuffle(arr, rnd), k = a.map(key), idx = a.map((_, i) => i);\n  idx.sort((x, y) => k[x] - k[y] || x - y);\n  return idx.map((i) => a[i]);\n}"],
  // 2. routeSearch: every station's distance to the goal, computed ONCE per search with the same Math.hypot (the depth-first
  //    search asked for it again at every step of every try)
  ["  let best = null, bestScore = -1e9;\n  for (let t = 0; t < tries; t++) {",
   "  let best = null, bestScore = -1e9;\n  const DG = P.map((p) => dist(p, P[g]));\n  for (let t = 0; t < tries; t++) {"],
  ["const prog = path.length / hi; const dg = dist(P[c], P[g]);", "const prog = path.length / hi; const dg = DG[c];"],
  ["(x) => (dist(P[x], P[g]) - dg) * (prog > 0.6 ? 1 : -0.3) + (rnd() - 0.5) * 120, rnd);", "(x) => (DG[x] - dg) * (prog > 0.6 ? 1 : -0.3) + (rnd() - 0.5) * 120, rnd);"],
  // 3. minClear: a pair of corridors whose bounding boxes are already farther apart than the closest pair found so far
  //    cannot hold a closer pair of points — skipped (the minimum is the same number)
  ["function minClear(S) {\n  const keys = Object.keys(S); let best = 1e9;\n  for (let i = 0; i < keys.length; i++) {\n    const [a1, b1] = keys[i].split('-'); const A = S[keys[i]];\n    for (let j = i + 1; j < keys.length; j++) {\n      const [a2, b2] = keys[j].split('-'); if (a1 === a2 || a1 === b2 || b1 === a2 || b1 === b2) continue; const B = S[keys[j]];\n      for (const p of A) for (const q of B) { const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; if (d < best) best = d; }",
   "function minClear(S) {\n  const keys = Object.keys(S); let best = 1e9;\n  const box = keys.map((k) => { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; for (const p of S[k]) { if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0]; if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1]; } return [x0, y0, x1, y1]; });\n  for (let i = 0; i < keys.length; i++) {\n    const [a1, b1] = keys[i].split('-'); const A = S[keys[i]], bi = box[i];\n    for (let j = i + 1; j < keys.length; j++) {\n      const [a2, b2] = keys[j].split('-'); if (a1 === a2 || a1 === b2 || b1 === a2 || b1 === b2) continue; const B = S[keys[j]], bj = box[j];\n      const gx = Math.max(0, bi[0] - bj[2], bj[0] - bi[2]), gy = Math.max(0, bi[1] - bj[3], bj[1] - bi[3]);\n      if (gx * gx + gy * gy >= best) continue;\n      for (const p of A) for (const q of B) { const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; if (d < best) best = d; }"],
];
function apply(src) {
  const crlf = src.includes('\r\n'); let s = src.replace(/\r\n/g, '\n');
  for (const [a, b] of EDITS) { const n = s.split(a).length - 1; if (n !== 1) throw new Error(`hm-graph-opt: needle found ${n} times: ${a.slice(0, 70)}`); s = s.replace(a, () => b); }
  return crlf ? s.replace(/\n/g, '\r\n') : s;
}
module.exports = { apply, EDITS };
