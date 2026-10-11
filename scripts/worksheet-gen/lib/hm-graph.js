/**
 * hm-graph.js — the TOPOLOGY of the Handmade Mazes family (b8, K-405 `maze-puzzles`).
 *
 * Ported from the studio's measured prototypes (docs/worksheet-gen/b8-designs/_work/K-405-design-B-topology.md,
 * out-of-tree scripts b_lib / b_tree2 / b_braid). The ruling that shapes everything here (B1): random-then-reject
 * never passes the quality gates (0 of 300 seeds), so the maze is built ROUTE FIRST:
 *   1. candidate graph = Poisson-disk stations inside the frame minus keep-out discs, Gabriel edges (planar: no
 *      two corridors can cross), edges meeting at < minAngle pruned (a sharp fork would merge two corridors);
 *   2. route = a biased random self-avoiding path start → goal with a target node count, scored for turn variety
 *      and no long straight run;
 *   3. branches = side-balanced subtrees rooted on route nodes, roots reserved first, then grown round-robin; the
 *      first two nodes of a branch step TOWARD the goal (a tempting dead end, never a stub you can see the end of);
 *   4. leftovers attach to branch nodes only, never to the route (fill), or stay unused (bigger islands for art);
 *   5. LOOPED faces only: `loops` extra candidate edges after the tree, never between two route nodes (the rule
 *      route stays an induced path: no chord can skip a label) and never above 4 exits per station.
 *
 * Everything is in page px of the scene frame (origin = the frame's top-left). Deterministic for a given rnd.
 * `rnd` is a () => [0,1) function (ctx.rng.next). No Math.random anywhere: shuffles are seeded Fisher–Yates.
 */
'use strict';

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const ek = (a, b) => (a < b ? a + '-' + b : b + '-' + a);
function shuffle(arr, rnd) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/** sort by key with a seeded random tie-break, stable and engine-independent */
function sortBy(arr, key, rnd) { return shuffle(arr, rnd).map((v, i) => [key(v), i, v]).sort((x, y) => x[0] - y[0] || x[1] - y[1]).map((t) => t[2]); }

// ---------------------------------------------------------------------------------------------------------------
// 1. candidate graph
// ---------------------------------------------------------------------------------------------------------------
/** Poisson-disk sample (Bridson) in [x0,x1]×[y0,y1] avoiding keep-out discs [x, y, radius]. */
function poisson(rnd, { x0, y0, x1, y1, r, keep = [] }) {
  const pts = []; const tries = 30; const cell = r / Math.SQRT2;
  const gw = Math.ceil((x1 - x0) / cell) + 1, gh = Math.ceil((y1 - y0) / cell) + 1; const grid = new Int32Array(gw * gh).fill(-1);
  const gi = (p) => (((p[1] - y0) / cell) | 0) * gw + (((p[0] - x0) / cell) | 0);
  const ok = (p) => {
    if (p[0] < x0 || p[0] > x1 || p[1] < y0 || p[1] > y1) return false;
    for (const k of keep) if (Math.hypot(p[0] - k[0], p[1] - k[1]) < k[2]) return false;
    const gx = ((p[0] - x0) / cell) | 0, gy = ((p[1] - y0) / cell) | 0;
    for (let y = Math.max(0, gy - 2); y <= Math.min(gh - 1, gy + 2); y++) for (let x = Math.max(0, gx - 2); x <= Math.min(gw - 1, gx + 2); x++) {
      const j = grid[y * gw + x]; if (j >= 0 && dist(pts[j], p) < r) return false;
    }
    return true;
  };
  const act = [];
  const add = (p) => { pts.push(p); grid[gi(p)] = pts.length - 1; act.push(pts.length - 1); };
  let s, guard = 0;
  do { s = [x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0)]; } while (!ok(s) && ++guard < 10000);
  if (guard >= 10000) return pts;
  add(s);
  while (act.length) {
    const ai = Math.floor(rnd() * act.length); const a = pts[act[ai]]; let found = false;
    for (let t = 0; t < tries; t++) {
      const ang = rnd() * Math.PI * 2, d = r * (1 + rnd()); const p = [a[0] + Math.cos(ang) * d, a[1] + Math.sin(ang) * d];
      if (ok(p)) { add(p); found = true; break; }
    }
    if (!found) act.splice(ai, 1);
  }
  return pts;
}

/** Gabriel graph (planar) with edges ≤ rmax, then prune pairs meeting at < minAngle (drop the longer). Adjacency lists. */
function gabriel(P, rmax, minAngle) {
  const n = P.length, E = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
    const d = dist(P[a], P[b]); if (d > rmax) continue;
    const mx = (P[a][0] + P[b][0]) / 2, my = (P[a][1] + P[b][1]) / 2; let ok = true;
    for (let c = 0; c < n && ok; c++) if (c !== a && c !== b && Math.hypot(P[c][0] - mx, P[c][1] - my) < d / 2) ok = false;
    if (ok) E.push([a, b, d]);
  }
  const ang = (a, b) => Math.atan2(P[b][1] - P[a][1], P[b][0] - P[a][0]);
  const alive = E.map(() => true);
  const incident = P.map(() => []); E.forEach((e, i) => { incident[e[0]].push(i); incident[e[1]].push(i); });
  for (let v = 0; v < n; v++) {
    const inc = incident[v];
    for (let i = 0; i < inc.length; i++) for (let j = i + 1; j < inc.length; j++) {
      if (!alive[inc[i]] || !alive[inc[j]]) continue; const ei = E[inc[i]], ej = E[inc[j]];
      const oi = ei[0] === v ? ei[1] : ei[0], oj = ej[0] === v ? ej[1] : ej[0];
      let da = Math.abs(ang(v, oi) - ang(v, oj)) * 180 / Math.PI; if (da > 180) da = 360 - da;
      if (da < minAngle) alive[ei[2] > ej[2] ? inc[i] : inc[j]] = false;
    }
  }
  const G = P.map(() => []); E.forEach((e, i) => { if (alive[i]) { G[e[0]].push(e[1]); G[e[1]].push(e[0]); } });
  return G;
}
function nearest(P, p, excl) { let bi = -1, bd = 1e9; P.forEach((q, i) => { if (excl && excl.has(i)) return; const d = dist(q, p); if (d < bd) { bd = d; bi = i; } }); return bi; }

// ---------------------------------------------------------------------------------------------------------------
// 2-4. route-first tree
// ---------------------------------------------------------------------------------------------------------------
/** signed turn (deg) from direction din to dout; > 0 = right turn on screen (y down) */
function turn(din, dout) { return Math.atan2(din[0] * dout[1] - din[1] * dout[0], din[0] * dout[0] + din[1] * dout[1]) * 180 / Math.PI; }

/** is branch w left of the route's continuation c at route node b (arriving from a)? */
function sideOf(P, a, b, c, w) {
  const din = [P[b][0] - P[a][0], P[b][1] - P[a][1]]; const n = Math.hypot(din[0], din[1]); din[0] /= n; din[1] /= n;
  const dv = (x) => { const v = [P[x][0] - P[b][0], P[x][1] - P[b][1]]; const m = Math.hypot(v[0], v[1]); return [v[0] / m, v[1] / m]; };
  return turn(din, dv(w)) < turn(din, dv(c)) ? 'L' : 'R';
}

/** random self-avoiding path s → g in G with lo ≤ nodes ≤ hi; best of `tries` by turn variety and straight runs */
function routeSearch(P, G, s, g, lo, hi, rnd, tries = 200) {
  let best = null, bestScore = -1e9;
  for (let t = 0; t < tries; t++) {
    const path = [s], on = new Set([s]); let steps = 0;
    const rec = () => {
      if (++steps > 4000) return false; const c = path[path.length - 1];
      if (c === g) return path.length >= lo && path.length <= hi;
      if (path.length >= hi) return false;
      const prog = path.length / hi; const dg = dist(P[c], P[g]);
      const nb = sortBy(G[c].filter((w) => !on.has(w) && (w !== g || path.length + 1 >= lo)),
        (x) => (dist(P[x], P[g]) - dg) * (prog > 0.6 ? 1 : -0.3) + (rnd() - 0.5) * 120, rnd);
      for (const w of nb) { path.push(w); on.add(w); if (rec()) return true; path.pop(); on.delete(w); }
      return false;
    };
    if (!rec()) continue;
    let lt = 0, rt = 0, run = 0, maxRun = 0;
    for (let i = 1; i < path.length - 1; i++) {
      const a = P[path[i - 1]], b = P[path[i]], c = P[path[i + 1]]; const t2 = turn([b[0] - a[0], b[1] - a[1]], [c[0] - b[0], c[1] - b[1]]);
      if (t2 > 25) rt++; else if (t2 < -25) lt++;
      run = Math.abs(t2) < 25 ? run + dist(b, c) : dist(b, c); maxRun = Math.max(maxRun, run);
    }
    const sc = Math.min(lt, rt) * 10 - maxRun / 10 + rnd();
    if (sc > bestScore) { bestScore = sc; best = path.slice(); }
  }
  return best;
}

/**
 * Route-first tree. o: { lo, hi, branches, size:[min,max], bNewest, fill, noNearGoal, tries }
 * Returns { adj, route } or null. Roots are RESERVED first (side-balanced, toward-goal preferred), then grown round-robin.
 */
function buildTree(P, G, s, g, o, rnd) {
  const route = routeSearch(P, G, s, g, o.lo, o.hi, rnd, o.tries || 200); if (!route) return null;
  const adj = P.map(() => []); const claimed = new Set(route);
  const link = (a, b) => { adj[a].push(b); adj[b].push(a); };
  for (let i = 0; i < route.length - 1; i++) link(route[i], route[i + 1]);
  let juncs = [];
  for (let i = 1; i < route.length - 1; i++) {
    if (o.noNearGoal && i >= route.length - 1 - o.noNearGoal) continue;
    for (const w of G[route[i]]) if (!claimed.has(w)) juncs.push({ i, w, side: sideOf(P, route[i - 1], route[i], route[i + 1], w), tow: dist(P[w], P[g]) < dist(P[route[i]], P[g]) });
  }
  juncs = sortBy(juncs, (j) => -(j.tow ? 1 : 0) * 0.5 + (rnd() - 0.5), rnd);
  const bNewest = o.bNewest == null ? 0.7 : o.bNewest;
  const used = new Set(); let nL = 0, nR = 0; const R = [];
  for (const j of juncs) {
    if (R.length >= o.branches) break; if (used.has(j.i) || claimed.has(j.w)) continue;
    if (R.some((r) => Math.abs(r.i - j.i) < 2) && rnd() < 0.7) continue;
    const want = nL - nR >= 2 ? 'R' : nR - nL >= 2 ? 'L' : null; if (want && j.side !== want) continue;
    used.add(j.i); claimed.add(j.w); link(route[j.i], j.w);
    R.push({ ...j, st: [j.w], nodes: [j.w], tgt: o.size[0] + Math.floor(rnd() * (o.size[1] - o.size[0] + 1)) });
    if (j.side === 'L') nL++; else nR++;
  }
  let grew = true;
  while (grew) {
    grew = false;
    for (const b of R) {
      if (b.nodes.length >= b.tgt || !b.st.length) continue;
      const ci = b.nodes.length < 3 ? b.st.length - 1 : (rnd() < bNewest ? b.st.length - 1 : Math.floor(rnd() * b.st.length)); const tip = b.st[ci];
      const nb = G[tip].filter((w) => !claimed.has(w)); if (!nb.length) { b.st.splice(ci, 1); grew = true; continue; }
      const w = b.nodes.length < 3 ? sortBy(nb, (x) => dist(P[x], P[g]), rnd)[0] : nb[Math.floor(rnd() * nb.length)];
      claimed.add(w); link(tip, w); b.nodes.push(w); b.st.push(w); grew = true;
    }
  }
  // a root that never grew is a one-edge stub: remove it
  // label faces keep one-station branches: a single stone with a near-miss label IS the wrong choice the child rejects
  if (!o.keepStubs) for (const b of R) if (b.nodes.length === 1) { const v = b.w, c = route[b.i]; adj[c] = adj[c].filter((x) => x !== v); adj[v] = []; claimed.delete(v); }
  if (o.fill) {
    const br = new Set([...claimed].filter((v) => !route.includes(v)));
    grew = true;
    while (grew) {
      grew = false;
      for (const v of [...br]) { const nb = G[v].filter((w) => !claimed.has(w)); if (!nb.length || rnd() < 0.5) continue;
        const w = nb[Math.floor(rnd() * nb.length)]; claimed.add(w); br.add(w); link(v, w); grew = true; }
    }
  }
  return { adj, route };
}

/** LOOPED graph: a route-first tree + `loops` extra candidate edges (never route–route, degree ≤ 4, never at a mouth). */
function buildLooped(P, G, s, g, o, rnd) {
  const b = buildTree(P, G, s, g, { lo: o.routeLen[0], hi: o.routeLen[1], branches: o.branches, size: o.size, bNewest: o.bNewest == null ? 0.6 : o.bNewest, fill: o.fill, noNearGoal: 0, keepStubs: o.keepStubs !== false, tries: o.tries || 30 }, rnd);
  if (!b) return null;
  const { adj, route } = b; const onR = new Set(route); const live = (v) => adj[v].length > 0;
  let cand = [];
  for (let a = 0; a < P.length; a++) for (const c of G[a]) if (a < c && live(a) && live(c) && !adj[a].includes(c) && !(onR.has(a) && onR.has(c))) cand.push([a, c]);
  cand = shuffle(cand, rnd);
  const loops = [];
  for (const [a, c] of cand) {
    if (loops.length >= o.loops) break;
    if (adj[a].length >= 4 || adj[c].length >= 4 || a === s || c === s || a === g || c === g) continue;
    adj[a].push(c); adj[c].push(a); loops.push([a, c]);
  }
  return { adj, route, loops };
}

// ---------------------------------------------------------------------------------------------------------------
// geometry: wobbled midpoints, chains, per-edge curve samples
// ---------------------------------------------------------------------------------------------------------------
function mids(P, adj, rnd, wobble) {
  const m = {};
  for (let a = 0; a < P.length; a++) for (const b of adj[a]) if (a < b) {
    const p = P[a], q = P[b]; const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy); const w = (rnd() - 0.5) * L * wobble;
    m[ek(a, b)] = [(p[0] + q[0]) / 2 - dy / L * w, (p[1] + q[1]) / 2 + dx / L * w];
  }
  return m;
}
/**
 * Split the graph into CHAINS (maximal paths through degree-2 nodes) and smooth each with centripetal-ish
 * Catmull-Rom through node, midpoint, node … Returns { chains:[{nodes, d}], S: {edgeKey: [[x,y]…]} } where
 * S holds 17 samples per edge along the SAME curve the page draws (the screen's ink and every clearance gate use it).
 * A pure cycle of degree-2 nodes never occurs (every graph here has a mouth of degree 1).
 */
function chainsOf(P, adj, mid) {
  const deg = adj.map((a) => a.length); const used = new Set(); const chains = [];
  for (let s = 0; s < P.length; s++) {
    if (deg[s] === 2 || deg[s] === 0) continue;
    for (const m of adj[s]) {
      if (used.has(ek(s, m))) continue; const c = [s, m]; used.add(ek(s, m)); let pv = s, cu = m;
      while (deg[cu] === 2) { const nx = adj[cu].find((q) => q !== pv); if (used.has(ek(cu, nx))) break; used.add(ek(cu, nx)); c.push(nx); pv = cu; cu = nx; }
      chains.push(c);
    }
  }
  // The curve passes through the STATIONS only (measured 2026-10-11: a curve through the wobbled midpoints kinks at
  // every station, worst bend 146-153 deg per 10 px vs 94 through the stations alone, and clears less). The cubic of
  // each segment is the Catmull-Rom of its four neighbouring stations; `mid` is overwritten with the curve's own
  // midpoint so every direction gate measures the corridor the child sees.
  const S = {}; const out = [];
  const f = (v) => v.toFixed(1);
  for (const c of chains) {
    const pts = c.map((v) => P[v]);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2; const t = 1;
      const c1 = [p1[0] + (p2[0] - p0[0]) * t / 6, p1[1] + (p2[1] - p0[1]) * t / 6], c2 = [p2[0] - (p3[0] - p1[0]) * t / 6, p2[1] - (p3[1] - p1[1]) * t / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
      const e = ek(c[i], c[i + 1]); const s = [];
      for (let k = 0; k <= 16; k++) {
        const u = k / 16, v = 1 - u;
        s.push([v * v * v * p1[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u * u * u * p2[0], v * v * v * p1[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u * u * u * p2[1]]);
      }
      S[e] = s;
      if (mid) mid[e] = s[8];
    }
    out.push({ nodes: c, d });
  }
  // orient every edge's samples from its lower node id to its higher (ek order)
  for (const k of Object.keys(S)) { const [a] = k.split('-').map(Number); if (dist(S[k][0], P[a]) > dist(S[k][S[k].length - 1], P[a])) S[k].reverse(); }
  return { chains: out, S };
}

// ---------------------------------------------------------------------------------------------------------------
// metrics + gates
// ---------------------------------------------------------------------------------------------------------------
const polyLen = (pts) => { let L = 0; for (let i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]); return L; };
/** min distance between centrelines of edges that share no node */
function minClear(S) {
  const keys = Object.keys(S); let best = 1e9;
  for (let i = 0; i < keys.length; i++) {
    const [a1, b1] = keys[i].split('-'); const A = S[keys[i]];
    for (let j = i + 1; j < keys.length; j++) {
      const [a2, b2] = keys[j].split('-'); if (a1 === a2 || a1 === b2 || b1 === a2 || b1 === b2) continue; const B = S[keys[j]];
      for (const p of A) for (const q of B) { const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; if (d < best) best = d; }
    }
  }
  return Math.sqrt(best);
}
const dirOut = (P, mid, v, w) => { const m = mid[ek(v, w)]; const dx = m[0] - P[v][0], dy = m[1] - P[v][1], L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
const dirIn = (P, mid, u, v) => { const m = mid[ek(u, v)]; const dx = P[v][0] - m[0], dy = P[v][1] - m[1], L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
function bfsPath(adj, s, g) {
  const prev = new Map([[s, -1]]); const q = [s];
  while (q.length) { const c = q.shift(); if (c === g) break; for (const m of adj[c]) if (!prev.has(m)) { prev.set(m, c); q.push(m); } }
  if (!prev.has(g)) return null; const p = []; for (let c = g; c !== -1; c = prev.get(c)) p.unshift(c); return p;
}
/** left / right hand-on-the-wall walk on a planar tree: edges walked until the goal */
function handWalk(P, mid, adj, s, g, hand) {
  let prev = -1, cur = s, steps = 0, din = null; const lim = 4 * P.length + 10;
  while (cur !== g && steps < lim) {
    let pick;
    if (din === null) pick = adj[cur][0];
    else {
      const cand = adj[cur].map((w) => ({ w, t: w === prev ? (hand === 'L' ? 180 : -180) : turn(din, dirOut(P, mid, cur, w)) })).sort((a, b) => a.t - b.t);
      pick = hand === 'L' ? cand[0].w : cand[cand.length - 1].w;
    }
    din = dirIn(P, mid, cur, pick); prev = cur; cur = pick; steps++;
  }
  return steps;
}
/** the tree quality metrics (design B §2) */
function treeMetrics(P, adj, mid, s, g, r) {
  const sol = bfsPath(adj, s, g); const onR = new Set(sol); const goalP = P[g];
  const leaves = adj.map((a, i) => (a.length === 1 && i !== s && i !== g ? i : -1)).filter((i) => i >= 0);
  const branches = []; let choice = 0; const sides = [];
  for (let i = 1; i < sol.length - 1; i++) {
    const c = sol[i]; const offs = adj[c].filter((w) => !onR.has(w)); if (!offs.length) continue; choice++;
    const din = dirIn(P, mid, sol[i - 1], c);
    const ex = adj[c].filter((w) => w !== sol[i - 1]).map((w) => ({ w, t: turn(din, dirOut(P, mid, c, w)) })).sort((a, b) => a.t - b.t);
    const rank = ex.findIndex((e) => e.w === sol[i + 1]);
    sides.push(rank === 0 ? 'L' : rank === ex.length - 1 ? 'R' : 'M');
    for (const o of offs) {
      let depth = 0; const st = [[o, c, 1]];
      while (st.length) { const [v, p, d] = st.pop(); depth = Math.max(depth, d); for (const w of adj[v]) if (w !== p) st.push([w, v, d + 1]); }
      const d0 = dist(P[c], goalP), d1 = dist(P[o], goalP); const kids = adj[o].filter((w) => w !== c);
      const d2 = kids.length ? Math.min(...kids.map((k) => dist(P[k], goalP))) : d1;
      branches.push({ depth, tempting: d1 < d0 && (kids.length ? d2 < d1 : false), stub: depth === 1 });
    }
  }
  const deDepth = leaves.map((l) => { let p = -1, c = l, d = 0; while (adj[c].length <= 2 && !onR.has(c)) { const nx = adj[c].find((w) => w !== p); if (nx === undefined) break; p = c; c = nx; d++; } return d; });
  let routePx = 0, run = 0, maxRun = 0;
  for (let i = 0; i < sol.length - 1; i++) {
    const a = sol[i], b = sol[i + 1]; const m = mid[ek(a, b)]; const L = dist(P[a], m) + dist(m, P[b]); routePx += L;
    if (i > 0) { const t = Math.abs(turn(dirIn(P, mid, sol[i - 1], a), dirOut(P, mid, a, b))); run = t < 25 ? run + L : L; } else run = L;
    maxRun = Math.max(maxRun, run);
  }
  const lw = handWalk(P, mid, adj, s, g, 'L'), rw = handWalk(P, mid, adj, s, g, 'R');
  const cnt = (x) => sides.filter((y) => y === x).length;
  let maxSame = 0, cur = 0; for (let i = 0; i < sides.length; i++) { cur = i && sides[i] === sides[i - 1] ? cur + 1 : 1; maxSame = Math.max(maxSame, cur); }
  // start and goal on one chain = the goal is visible along a corridor with no choice
  const sameChain = sol.slice(1, -1).every((v) => adj[v].length === 2);
  return {
    route: sol.length, routePx, tort: routePx / dist(P[s], P[g]), dead: leaves.length,
    deep3Share: leaves.length ? deDepth.filter((d) => d >= 3).length / leaves.length : 0,
    junctions: choice, stubs: branches.filter((b) => b.stub).length, tempting: branches.filter((b) => b.tempting).length,
    sideShareMax: sides.length ? Math.max(cnt('L'), cnt('R'), cnt('M')) / sides.length : 0, maxSame,
    wfL: (sol.length - 1) / lw, wfR: (sol.length - 1) / rw, maxRun, sameChain, sol, sides,
  };
}

/** every simple path s → g (capped) */
function simplePaths(adj, s, g, cap = 200000) {
  const out = []; const on = new Uint8Array(adj.length); const path = [s]; on[s] = 1;
  const rec = (c) => { if (out.length >= cap) return; if (c === g) { out.push(path.slice()); return; }
    for (const w of adj[c]) { if (on[w]) continue; on[w] = 1; path.push(w); rec(w); path.pop(); on[w] = 0; } };
  rec(s); return out;
}
function reaches(adj, w, g, avoid) { const seen = new Set([avoid, w]); const st = [w]; while (st.length) { const c = st.pop(); if (c === g) return true; for (const x of adj[c]) if (!seen.has(x)) { seen.add(x); st.push(x); } } return false; }
/** the looped-face checks (pedagogy P1): valid(path) decides rule obedience */
function loopChecks(adj, route, s, g, valid, cap = 200000) {
  const paths = simplePaths(adj, s, g, cap);
  const nValid = paths.filter(valid).length;
  let minLen = 1e9; for (const p of paths) minLen = Math.min(minLen, p.length);
  const shortestIsWrong = paths.filter((p) => p.length === minLen).every((p) => !valid(p));
  let wrong = 0, live = 0;
  for (let i = 1; i < route.length - 1; i++) for (const w of adj[route[i]]) { if (w === route[i - 1] || w === route[i + 1]) continue; wrong++; if (reaches(adj, w, g, route[i])) live++; }
  return { paths: paths.length, capped: paths.length >= cap, nValid, minLen, extra: route.length - minLen, shortestIsWrong, liveShare: wrong ? live / wrong : 0 };
}

/** largest free discs for art (greedy) given the corridor envelope W/2 + outline + air, the frame and keep-outs */
function islands(S, W, keep, frame, opts = {}) {
  const step = opts.step || 8, air = opts.air == null ? 8 : opts.air, outline = opts.outline == null ? 3.5 : opts.outline, minR = opts.minR || 22;
  const pts = []; for (const k in S) for (const p of S[k]) pts.push(p);
  const env = W / 2 + outline + air; const cells = [];
  for (let y = frame.y0 + 6; y < frame.y1 - 6; y += step) for (let x = frame.x0 + 6; x < frame.x1 - 6; x += step) {
    let d = Math.min(x - frame.x0, frame.x1 - x, y - frame.y0, frame.y1 - y) - 6;
    for (const p of pts) { const q = Math.hypot(p[0] - x, p[1] - y) - env; if (q < d) d = q; }
    for (const k of keep || []) { const q = Math.hypot(k[0] - x, k[1] - y) - k[2]; if (q < d) d = q; }
    cells.push([x, y, d]);
  }
  const discs = [];
  for (;;) {
    let b = null; for (const c of cells) if (c[2] > 0 && (!b || c[2] > b[2])) b = c; if (!b || b[2] < minR) break;
    const bb = b.slice(); discs.push(bb);
    for (const c of cells) { const q = Math.hypot(c[0] - bb[0], c[1] - bb[1]) - bb[2] - 4; if (q < c[2]) c[2] = q; }
  }
  return discs; // [x, y, radius]
}

module.exports = {
  dist, ek, shuffle, sortBy, poisson, gabriel, nearest, turn, sideOf, routeSearch, buildTree, buildLooped,
  mids, chainsOf, polyLen, minClear, dirIn, dirOut, bfsPath, handWalk, treeMetrics, simplePaths, reaches, loopChecks, islands,
};
