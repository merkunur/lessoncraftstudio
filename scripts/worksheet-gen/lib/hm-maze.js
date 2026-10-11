/**
 * hm-maze.js — build ONE gated maze for a face config (b8 Handmade Mazes). The build loop of design B §0 B1:
 * up to K route-first builds per call; the first build that passes every gate of the config wins; null when none
 * passes (the caller moves to the next seed / variant — the seed is locale-neutral, so every locale gets the same maze).
 *
 *   generateTree(cfg, rnd)    → { P, adj, mid, chains, S, route, s, g, m (metrics), W } | null
 *   generateLayers(cfg, rnd)  → the same, on a soil-level lattice (F5 burrow; see its docblock)
 *   generateStreets(cfg, rnd) → a street lattice with loops and ONE shortest route (F6; see its docblock)
 *
 * cfg (page px inside the scene frame):
 *   frame {x0,y0,x1,y1}  r  minAngle  rmaxK (edge ≤ r·rmaxK, default 2.05)  keep [[x,y,rad]]  start [x,y]  goal [x,y]
 *   route [lo,hi]  branches  size [min,max]  bNewest  fill  noNearGoal  wobble  W  K
 *   gates { dead:[lo,hi], junctions, stubs, tempting, deep3, side, sameRun, wf, tort, maxRun, clear, chainLen }
 */
'use strict';
const H = require('./hm-graph.js');

function gateTree(m, G, extra) {
  const f = [];
  if (G.dead && (m.dead < G.dead[0] || m.dead > G.dead[1])) f.push('dead ' + m.dead);
  if (G.junctions != null && m.junctions < G.junctions) f.push('junctions ' + m.junctions);
  if (G.stubs != null && m.stubs > G.stubs) f.push('stubs ' + m.stubs);
  if (G.tempting != null && m.tempting < G.tempting) f.push('tempting ' + m.tempting);
  if (G.deep3 != null && m.deep3Share < G.deep3) f.push('deep3 ' + m.deep3Share.toFixed(2));
  if (G.side != null && m.junctions >= 3 && m.sideShareMax > G.side) f.push('side ' + m.sideShareMax.toFixed(2));
  if (G.sameRun != null && m.maxSame > G.sameRun) f.push('sameRun ' + m.maxSame);
  if (G.wf != null && Math.max(m.wfL, m.wfR) > G.wf) f.push('wf ' + Math.max(m.wfL, m.wfR).toFixed(2));
  if (G.tort != null && m.tort < G.tort) f.push('tort ' + m.tort.toFixed(2));
  if (G.maxRun != null && m.maxRun > G.maxRun) f.push('maxRun ' + m.maxRun.toFixed(0));
  if (m.sameChain) f.push('start and goal on one chain');
  if (G.clear != null && extra.clear < G.clear) f.push('clear ' + extra.clear.toFixed(1));
  if (G.chainLen != null && extra.chainLen < G.chainLen) f.push('chainLen ' + extra.chainLen.toFixed(2));
  return f;
}

/**
 * The two MOUTHS: a short corridor from the start station out to where the hero stands (cfg.startMouth) and from
 * the goal station into the goal (cfg.goalMouth). A mouth is part of the route; it must keep the full clearance
 * (W + 17) from every corridor not incident to its station, or it would draw a shortcut. Absent mouth point = none.
 */
function mouthChains(cfg, P, s, g, S) {
  const out = { chains: [], S: {} };
  const clearNeed = (cfg.W || 0) + 17;
  for (const [key, node, pt] of [['start', s, cfg.startMouth], ['goal', g, cfg.goalMouth]]) {
    if (!pt) continue;
    const a = P[node]; const L = Math.hypot(pt[0] - a[0], pt[1] - a[1]); if (L < 4) continue;
    const pts = []; for (let k = 0; k <= 16; k++) pts.push([a[0] + (pt[0] - a[0]) * k / 16, a[1] + (pt[1] - a[1]) * k / 16]);
    for (const [e, ss] of Object.entries(S)) {
      const [x, y] = e.split('-').map(Number); if (x === node || y === node) continue;
      for (const p of pts.slice(2)) for (const q of ss) if (Math.hypot(p[0] - q[0], p[1] - q[1]) < clearNeed) return { fail: key + ' mouth too close to ' + e };
    }
    out.S[key] = pts;
    out.chains.push({ nodes: [node], mouth: key, d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${pt[0].toFixed(1)} ${pt[1].toFixed(1)}` });
  }
  return out;
}

function generateTree(cfg, rnd) {
  const fr = cfg.frame;
  const P = H.poisson(rnd, { x0: fr.x0, y0: fr.y0, x1: fr.x1, y1: fr.y1, r: cfg.r, keep: cfg.keep || [] });
  const Gc = H.gabriel(P, cfg.r * (cfg.rmaxK || 2.05), cfg.minAngle || 55);
  const s = H.nearest(P, cfg.start), g = H.nearest(P, cfg.goal);
  if (s < 0 || g < 0 || s === g) return null;
  const K = cfg.K || 150; let lastFail = null;
  for (let k = 0; k < K; k++) {
    const t = H.buildTree(P, Gc, s, g, { lo: cfg.route[0], hi: cfg.route[1], branches: cfg.branches, size: cfg.size, bNewest: cfg.bNewest, fill: cfg.fill, noNearGoal: cfg.noNearGoal == null ? 1 : cfg.noNearGoal, tries: cfg.tries || 40 }, rnd);
    if (!t) { lastFail = ['no route']; continue; }
    // the curve first (it overwrites `mid` with each edge's drawn midpoint), then the gates measure that curve
    const mid = H.mids(P, t.adj, rnd, 0);
    const { chains, S } = H.chainsOf(P, t.adj, mid);
    // every corridor, at its full painted width, stays inside the maze box (measured 2026-10-11: a curve overshoots
    // its stations, and a road cut by the frame is a dead end the child cannot see)
    if (cfg.box) {
      const half = cfg.W / 2 + 3.5 + 6; let out = null;
      for (const [k, ss] of Object.entries(S)) for (const p of ss) if (p[0] < half || p[1] < half || p[0] > cfg.box.w - half || p[1] > cfg.box.h - half) { out = k; break; }
      if (out) { lastFail = ['corridor ' + out + ' leaves the box']; continue; }
    }
    const m = H.treeMetrics(P, t.adj, mid, s, g, cfg.r);
    const pre = gateTree(m, cfg.gates || {}, { clear: 1e9, chainLen: 1e9 });
    if (pre.length) { lastFail = pre; continue; }
    const clear = H.minClear(S);
    const chainLen = chains.reduce((a, c) => a + c.nodes.length - 1, 0) / chains.length;
    const post = gateTree(m, cfg.gates || {}, { clear, chainLen });
    if (post.length) { lastFail = post; continue; }
    const mouths = mouthChains(cfg, P, s, g, S);
    if (mouths.fail) { lastFail = [mouths.fail]; continue; }
    return { P, adj: t.adj, mid, chains: chains.concat(mouths.chains), S, mouthS: mouths.S, route: t.route, s, g, m: { ...m, clear, chainLen }, W: cfg.W, attempts: k + 1 };
  }
  return { fail: lastFail };
}

/**
 * LOOPED label maze (faces F9-F19, pedagogy P1). cfg as generateTree plus:
 *   seqLen   interior route stations (the rule's answer length); route = seqLen + 2 mouths
 *   loops    extra candidate edges (never route–route, degree ≤ 4)
 *   stoneR   the stone's radius (a stone sits on its station; clearance stoneR + W/2 + 8 from every other corridor)
 *   label(adj, route, rnd) → { label: Map, ...stats } | null   (the face's assigner, lib/hm-rules.js)
 *   rule     { valid(labels, path) }                            (the face's rule)
 *   lgates   { decoys, nearShare }                              (assigner stats gates)
 * Gates (P1): exactly ONE valid simple path, and it is the route; ≥ 4 simple paths; every shortest path is wrong;
 * rule route ≥ shortest + 3 stations; ≥ 50 % of wrong exits along the route still reach the goal.
 */
function generateLooped(cfg, rnd) {
  const fr = cfg.frame;
  const P = H.poisson(rnd, { x0: fr.x0, y0: fr.y0, x1: fr.x1, y1: fr.y1, r: cfg.r, keep: cfg.keep || [] });
  const Gc = H.gabriel(P, cfg.r * (cfg.rmaxK || 2.05), cfg.minAngle || 55);
  const s = H.nearest(P, cfg.start), g = H.nearest(P, cfg.goal);
  if (s < 0 || g < 0 || s === g) return { fail: ['no mouth stations'] };
  const K = cfg.K || 150; let lastFail = null;
  const n = cfg.seqLen + 2;
  for (let k = 0; k < K; k++) {
    const t = H.buildLooped(P, Gc, s, g, { routeLen: [n, n], branches: cfg.branches, size: cfg.size, bNewest: cfg.bNewest, fill: cfg.fill, loops: cfg.loops, tries: cfg.tries || 30 }, rnd);
    if (!t) { lastFail = ['no route of ' + n]; continue; }
    const mid = H.mids(P, t.adj, rnd, 0);
    const { chains, S } = H.chainsOf(P, t.adj, mid);
    if (cfg.box) {
      const half = cfg.W / 2 + 3.5 + 6; let out = null;
      for (const [kk, ss] of Object.entries(S)) for (const p of ss) if (p[0] < half || p[1] < half || p[0] > cfg.box.w - half || p[1] > cfg.box.h - half) { out = kk; break; }
      if (out) { lastFail = ['corridor ' + out + ' leaves the box']; continue; }
    }
    const clear = H.minClear(S);
    if (cfg.gates && cfg.gates.clear != null && clear < cfg.gates.clear) { lastFail = ['clear ' + clear.toFixed(1)]; continue; }
    // stones keep clear of every corridor not incident to their station
    if (cfg.stoneR) {
      let bad = null; const need = cfg.stoneR + cfg.W / 2 + 8;
      for (let v = 0; v < P.length && !bad; v++) { if (!t.adj[v].length || v === s || v === g) continue;
        for (const [kk, ss] of Object.entries(S)) { const [a, b] = kk.split('-').map(Number); if (a === v || b === v) continue; for (const q of ss) if (H.dist(q, P[v]) < need) { bad = 'stone ' + v + ' on corridor ' + kk; break; } if (bad) break; } }
      if (bad) { lastFail = [bad]; continue; }
    }
    // signs never overlap one another, and stay inside the box (cfg.stoneSize [w, h]: pills are far wider than the
    // stoneR disc assumes — 2026-10-11, two '+1' signs printed on top of each other and a sign ran off the frame)
    if (cfg.stoneSize) {
      const [sw, sh] = cfg.stoneSize; const live = []; for (let v = 0; v < P.length; v++) if (t.adj[v].length && v !== s && v !== g) live.push(v);
      let bad = null;
      for (const v of live) { const [x, y] = P[v]; if (cfg.box && (x < sw / 2 + 6 || x > cfg.box.w - sw / 2 - 6 || y < sh / 2 + 6 || y > cfg.box.h - sh / 2 - 6)) { bad = 'sign ' + v + ' off the box'; break; } }
      for (let i = 0; i < live.length && !bad; i++) for (let j = i + 1; j < live.length; j++) { const A = P[live[i]], B = P[live[j]]; if (Math.abs(A[0] - B[0]) < sw + 6 && Math.abs(A[1] - B[1]) < sh + 6) { bad = 'signs ' + live[i] + '/' + live[j] + ' overlap'; break; } }
      if (bad) { lastFail = [bad]; continue; }
    }
    const lab = cfg.label(t.adj, t.route, rnd);
    if (!lab) { lastFail = ['labels']; continue; }
    // a rule that depends on the assignment (running total: start + target are drawn by the assigner)
    const rule = cfg.ruleFor ? cfg.ruleFor(lab) : cfg.rule;
    const lg = cfg.lgates || {};
    if (lg.decoys != null && lab.decoys < lg.decoys) { lastFail = ['decoys ' + lab.decoys]; continue; }
    if (lg.nearShare != null && lab.nearShare < lg.nearShare) { lastFail = ['nearShare ' + lab.nearShare.toFixed(2)]; continue; }
    if (lg.reversals != null && (lab.reversals || 0) < lg.reversals) { lastFail = ['reversals ' + (lab.reversals || 0)]; continue; }
    const R = require('./hm-rules.js');
    const vp = R.validPaths(t.adj, s, g, lab.label, rule.valid);
    if (!vp.exhausted) { lastFail = ['search not exhausted']; continue; }
    if (vp.paths.length !== 1 || vp.paths[0].join('-') !== t.route.join('-')) { lastFail = ['valid paths ' + vp.paths.length]; continue; }
    const all = H.simplePaths(t.adj, s, g, 300000);
    if (all.length < 4) { lastFail = ['paths ' + all.length]; continue; }
    let minLen = 1e9; for (const p of all) minLen = Math.min(minLen, p.length);
    if (all.some((p) => p.length === minLen && p.join('-') === t.route.join('-'))) { lastFail = ['the shortest path is the rule route']; continue; }
    if (t.route.length - minLen < 3) { lastFail = ['extra ' + (t.route.length - minLen)]; continue; }
    let wrong = 0, live = 0;
    for (let i = 1; i < t.route.length - 1; i++) for (const w of t.adj[t.route[i]]) { if (w === t.route[i - 1] || w === t.route[i + 1]) continue; wrong++; if (H.reaches(t.adj, w, g, t.route[i])) live++; }
    if (wrong && live / wrong < 0.5) { lastFail = ['live ' + (live / wrong).toFixed(2)]; continue; }
    // the shortest physical path ends NEAR the goal number (a plausible shortcut), design F19
    if (cfg.nearMissShortest) { const shortest = all.filter((p) => p.length === minLen)[0]; const tot = shortest.slice(1, -1).reduce((x, v) => x + require('./hm-rules.js').opValue(lab.label.get(v)), lab.start); if (!cfg.nearMissShortest.includes(Math.abs(tot - lab.target))) { lastFail = ['shortest total ' + tot + ' vs ' + lab.target]; continue; } }
    const mouths = mouthChains(cfg, P, s, g, S);
    if (mouths.fail) { lastFail = [mouths.fail]; continue; }
    return { P, adj: t.adj, mid, chains: chains.concat(mouths.chains), S, mouthS: mouths.S, route: t.route, s, g, loops: t.loops, labels: lab.label, assigned: lab,
      m: { route: t.route.length, paths: all.length, shortest: minLen, live: wrong ? live / wrong : 1, decoys: lab.decoys, nearShare: lab.nearShare, clear }, W: cfg.W, attempts: k + 1 };
  }
  return { fail: lastFail };
}

/**
 * LAYERED maze (F5 burrow, design B 3.5): a cross-section of tunnels. Stations sit on a C × L lattice (columns across,
 * soil levels down), joined only to their horizontal neighbours on a level and to the station straight above / below
 * (a SHAFT). The rest is the tree pipeline: route-first build, branches, the corridor curve, the gates.
 * cfg as generateTree, minus r / minAngle / keep, plus:
 *   C  columns   colX [x0, x1]   levelsY [y…] (one per level, box px)   jitter [jx, jy]
 *   start / goal = lattice cells [col, level]   startMouth / goalMouth [x, y]
 *   gates.layers { changes, ups, shafts:[lo,hi], deadShafts, levelRun }
 * The route must CHANGE LEVEL ≥ changes times with ≥ ups of them UPWARD (the child goes down, finds the way blocked,
 * and comes back up), the tree carries shafts in [lo,hi] of which ≥ deadShafts end blind (a shaft that leads nowhere:
 * the tempting short descent), and the route never runs more than levelRun edges along one level.
 */
function generateLayers(cfg, rnd) {
  const C = cfg.C, L = cfg.levelsY.length; const [x0, x1] = cfg.colX; const [jx, jy] = cfg.jitter || [6, 5];
  const P = []; const id = (c, l) => l * C + c;
  for (let l = 0; l < L; l++) for (let c = 0; c < C; c++) P.push([x0 + (x1 - x0) * c / (C - 1) + (rnd() - 0.5) * 2 * jx, cfg.levelsY[l] + (rnd() - 0.5) * 2 * jy]);
  const G = P.map(() => []); const link = (a, b) => { G[a].push(b); G[b].push(a); };
  for (let l = 0; l < L; l++) for (let c = 0; c < C; c++) { if (c < C - 1) link(id(c, l), id(c + 1, l)); if (l < L - 1) link(id(c, l), id(c, l + 1)); }
  const levelOf = (v) => Math.floor(v / C);
  const s = id(cfg.start[0], cfg.start[1]), g = id(cfg.goal[0], cfg.goal[1]);
  const K = cfg.K || 300; let lastFail = null; const LG = (cfg.gates && cfg.gates.layers) || {};
  for (let k = 0; k < K; k++) {
    const t = H.buildTree(P, G, s, g, { lo: cfg.route[0], hi: cfg.route[1], branches: cfg.branches, size: cfg.size, bNewest: cfg.bNewest, fill: cfg.fill, noNearGoal: cfg.noNearGoal == null ? 1 : cfg.noNearGoal, tries: cfg.tries || 40 }, rnd);
    if (!t) { lastFail = ['no route']; continue; }
    // the layer gates first (cheap, on the graph): level changes along the route, shafts in the tree, blind shafts
    const r = t.route; let changes = 0, ups = 0, run = 0, maxRun = 0;
    for (let i = 0; i < r.length - 1; i++) {
      const la = levelOf(r[i]), lb = levelOf(r[i + 1]);
      if (la !== lb) { changes++; if (lb < la) ups++; run = 0; } else { run++; maxRun = Math.max(maxRun, run); }
    }
    let shafts = 0, deadShafts = 0;
    for (let v = 0; v < P.length; v++) for (const w of t.adj[v]) if (w > v && levelOf(w) !== levelOf(v)) {
      shafts++; const leaf = [v, w].find((x) => t.adj[x].length === 1 && x !== s && x !== g);
      if (leaf !== undefined && levelOf(leaf) > levelOf(leaf === v ? w : v)) deadShafts++;   // a shaft that goes DOWN to nothing
    }
    const lf = [];
    if (LG.changes != null && changes < LG.changes) lf.push('level changes ' + changes);
    if (LG.ups != null && ups < LG.ups) lf.push('ups ' + ups);
    if (LG.shafts && (shafts < LG.shafts[0] || shafts > LG.shafts[1])) lf.push('shafts ' + shafts);
    if (LG.deadShafts != null && deadShafts < LG.deadShafts) lf.push('dead shafts ' + deadShafts);
    if (LG.levelRun != null && maxRun > LG.levelRun) lf.push('level run ' + maxRun);
    if (lf.length) { lastFail = lf; continue; }
    const mid = H.mids(P, t.adj, rnd, 0);
    const { chains, S } = H.chainsOf(P, t.adj, mid);
    if (cfg.box) {
      const half = cfg.W / 2 + 3.5 + 6; let out = null;
      for (const [kk, ss] of Object.entries(S)) for (const p of ss) if (p[0] < half || p[1] < half || p[0] > cfg.box.w - half || p[1] > cfg.box.h - half) { out = kk; break; }
      if (out) { lastFail = ['corridor ' + out + ' leaves the box']; continue; }
    }
    const m = H.treeMetrics(P, t.adj, mid, s, g, 60);
    const clear = H.minClear(S);
    const chainLen = chains.reduce((a, c) => a + c.nodes.length - 1, 0) / chains.length;
    const post = gateTree(m, cfg.gates || {}, { clear, chainLen });
    if (post.length) { lastFail = post; continue; }
    const mouths = mouthChains(cfg, P, s, g, S);
    if (mouths.fail) { lastFail = [mouths.fail]; continue; }
    return { P, adj: t.adj, mid, chains: chains.concat(mouths.chains), S, mouthS: mouths.S, route: t.route, s, g, m: { ...m, clear, chainLen, changes, ups, shafts, deadShafts, levelRun: maxRun }, W: cfg.W, attempts: k + 1, levelOf: P.map((_, v) => levelOf(v)) };
  }
  return { fail: lastFail };
}

/**
 * STREET maze (F6 shortest way, design B 3.6): a street lattice with loops. Intersections on a C × R grid joined to
 * their four neighbours; `remove` segments are taken out (an intersection left with one street gets a barrier). The
 * child finds the SHORTEST way and counts its street pieces.
 * cfg: C R  colX [x0,x1]  rowY [y0,y1]  remove [lo,hi]  W  K
 *      startRows / goalRows  the rows the start (column 0) and goal (column C-1) may take — drawn per attempt, so the
 *                            distance varies; mouthX [xl, xr] the mouth ends; park [dx, dy] where a vehicle parks
 *                            beside its mouth road (feet point = mouth row y − dy, x = the margin's middle)
 *      gates.streets { shortest:[lo,hi], next (= shortest + next), fewerTurns (≥ 1 longer route with fewer turns),
 *                     routes (≥ simple routes), detour (shortest − grid distance ≥ detour) }
 * Gates (FINAL §3 F6): exactly ONE shortest route (BFS count); the next-shortest route is shortest + 2 (a lattice is
 * bipartite: + 1 is impossible); shortest in band; ≥ 1 longer route that turns FEWER times (the misconception "fewer
 * turns = shorter" is designed in); ≥ 3 simple routes; every intersection still reachable.
 * Returns the tree-shaped result the composer reads, with loops: true and route = the one shortest route.
 */
function generateStreets(cfg, rnd) {
  const C = cfg.C, Rr = cfg.R; const id = (c, r) => r * C + c;
  const P = []; for (let r = 0; r < Rr; r++) for (let c = 0; c < C; c++) P.push([cfg.colX[0] + (cfg.colX[1] - cfg.colX[0]) * c / (C - 1), cfg.rowY[0] + (cfg.rowY[1] - cfg.rowY[0]) * r / (Rr - 1)]);
  const all = []; for (let r = 0; r < Rr; r++) for (let c = 0; c < C; c++) { if (c < C - 1) all.push([id(c, r), id(c + 1, r)]); if (r < Rr - 1) all.push([id(c, r), id(c, r + 1)]); }
  const SG = cfg.gates && cfg.gates.streets || {}; const K = cfg.K || 400; let lastFail = null;
  const turnsOf = (p) => { let t = 0; for (let i = 1; i < p.length - 1; i++) { const a = P[p[i - 1]], b = P[p[i]], c2 = P[p[i + 1]]; if ((b[0] - a[0]) * (c2[1] - b[1]) - (b[1] - a[1]) * (c2[0] - b[0]) !== 0) t++; } return t; };
  for (let k = 0; k < K; k++) {
    const rs = cfg.startRows[Math.floor(rnd() * cfg.startRows.length)], rg = cfg.goalRows[Math.floor(rnd() * cfg.goalRows.length)];
    const s = id(0, rs), g = id(C - 1, rg);
    const mcfg = { W: cfg.W, startMouth: [cfg.mouthX[0], P[s][1]], goalMouth: [cfg.mouthX[1], P[g][1]] };
    const nRem = cfg.remove[0] + Math.floor(rnd() * (cfg.remove[1] - cfg.remove[0] + 1));
    const edges = H.shuffle(all.slice(), rnd).slice(nRem);
    const adj = P.map(() => []); for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }
    // every intersection reachable from the start (a cut-off block of streets is a road to nowhere the child cannot reach)
    const seen = new Set([s]); const st = [s]; while (st.length) { const v = st.pop(); for (const w of adj[v]) if (!seen.has(w)) { seen.add(w); st.push(w); } }
    if (seen.size !== P.length) { lastFail = ['streets cut in two']; continue; }
    if (adj[s].length < 1 || adj[g].length < 1) { lastFail = ['mouth station isolated']; continue; }
    // BFS: shortest length + the NUMBER of shortest routes
    const dist = P.map(() => -1), cnt = P.map(() => 0); dist[s] = 0; cnt[s] = 1; const q = [s];
    while (q.length) { const v = q.shift(); for (const w of adj[v]) { if (dist[w] < 0) { dist[w] = dist[v] + 1; cnt[w] = cnt[v]; q.push(w); } else if (dist[w] === dist[v] + 1) cnt[w] += cnt[v]; } }
    const sl = dist[g];
    if (SG.shortest && (sl < SG.shortest[0] || sl > SG.shortest[1])) { lastFail = ['shortest ' + sl]; continue; }
    if (cnt[g] !== 1) { lastFail = ['shortest routes ' + cnt[g]]; continue; }
    // detour: the straight staircase toward the car is blocked — the shortest way is at least `detour` pieces longer
    // than the grid distance, so "head straight for it" is not the answer (the page needs planning, not a beeline)
    const man = (C - 1) + Math.abs(rg - rs);
    if (SG.detour != null && sl - man < SG.detour) { lastFail = ['no detour (' + (sl - man) + ')']; continue; }
    const paths = H.simplePaths(adj, s, g, 20000).filter((p) => p.length - 1 <= sl + 6);
    const lens = paths.map((p) => p.length - 1).sort((a, b) => a - b);
    const next = lens.find((L) => L > sl);
    if (SG.next != null && next !== sl + SG.next) { lastFail = ['next shortest ' + next]; continue; }
    if (SG.routes != null && paths.length < SG.routes) { lastFail = ['routes ' + paths.length]; continue; }
    // walk the one shortest route back from g (each step to a neighbour one nearer the start)
    const route = [g]; while (route[route.length - 1] !== s) { const v = route[route.length - 1]; route.push(adj[v].find((w) => dist[w] === dist[v] - 1)); }
    route.reverse();
    const tShort = turnsOf(route);
    if (SG.fewerTurns && !paths.some((p) => p.length - 1 > sl && turnsOf(p) < tShort)) { lastFail = ['no longer route with fewer turns']; continue; }
    // straight streets: one sampled segment per street piece (the corridor's round joins make the corners)
    const S = {}; const mid = {}; const chains = [];
    for (const [a, b] of edges) {
      const lo = Math.min(a, b), hi = Math.max(a, b); const A = P[lo], B = P[hi]; const pts = [];
      for (let j = 0; j <= 12; j++) pts.push([A[0] + (B[0] - A[0]) * j / 12, A[1] + (B[1] - A[1]) * j / 12]);
      S[H.ek(lo, hi)] = pts; mid[H.ek(lo, hi)] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      chains.push({ nodes: [lo, hi], d: `M${A[0].toFixed(1)} ${A[1].toFixed(1)} L${B[0].toFixed(1)} ${B[1].toFixed(1)}` });
    }
    const mouths = mouthChains(mcfg, P, s, g, S);
    if (mouths.fail) { lastFail = [mouths.fail]; continue; }
    const deadEnds = adj.map((a, v) => (a.length === 1 && v !== s && v !== g ? v : -1)).filter((v) => v >= 0);
    return { P, adj, mid, chains: chains.concat(mouths.chains), S, mouthS: mouths.S, route, s, g, W: cfg.W, loops: edges.length - (P.length - 1), attempts: k + 1,
      ruleStamp: { kind: 'shortest', n: sl }, streets: { deadEnds },
      // the hero / goal vehicles park in the side margins beside their mouth rows (the composer reads these over spec.at)
      heroAt: [cfg.park[0], P[s][1] - cfg.park[1]], goalAt: [cfg.park[2], P[g][1] - cfg.park[1]],
      m: { route: route.length, shortest: sl, next, routes: paths.length, turns: tShort, removed: nRem, dead: deadEnds.length } };
  }
  return { fail: lastFail };
}

/**
 * FOREST maze (F7 babies and mothers, design B 3.7): k vertex-disjoint trees in one field. Baby i stands at the top at
 * column i, the mothers in paddocks at the bottom; baby i's road leads to mother π(i), π a DERANGEMENT (no baby stands
 * straight above its own mother — the child must follow the road, not look down). Each tree is a route with its own
 * dead ends; trees never share a station or a corridor (clearance between them = the corridor clearance gate).
 * cfg as generateTree (frame r minAngle rmaxK keep W K box) plus:
 *   k  babyAt [[x,y]…] (mouth ends at the top)  paddocks [[x,y,r]…] (a mother's road may arrive from ANY side: each
 *      attempt picks one of the stations ringing her paddock, and the mouth runs to the rim facing it)  route [lo,hi]
 *   branches  size   startDrop / goalRise (how far into the field the first / last station is sought)
 *   gates.forest { dead:[lo,hi] per tree, junctions (per route ≥), overlap (pairwise bbox share ≥), ratio (shortest
 *                  route ≥ ratio × longest), clear }
 * Returns the usual maze object plus routes: [{route, s, g, mouthS:{start, goal}, baby, mother}] (route / s / g /
 * mouthS = routes[0] for the single-route readers) and pi.
 */
/**
 * randPath: a shortest path under RANDOMIZED edge weights (Dijkstra, weight = length × U(0.6, 1.4)). Unlike the
 * greedy depth-first routeSearch it always finds a way when one exists — including the long way round that a
 * derangement needs (one road must first go AWAY from its mother to pass beneath the paddocks) — and the random weights
 * keep the roads from all hugging the straight line. null when the stations are cut apart.
 */
function randPath(P, G, s, g, rnd) {
  const n = P.length; const dist = new Float64Array(n).fill(Infinity), prev = new Int32Array(n).fill(-1), done = new Uint8Array(n);
  const w = new Map(); const wt = (a, b) => { const k = a < b ? a + '-' + b : b + '-' + a; if (!w.has(k)) w.set(k, H.dist(P[a], P[b]) * (0.6 + 0.8 * rnd())); return w.get(k); };
  dist[s] = 0;
  for (;;) {
    let v = -1, best = Infinity; for (let i = 0; i < n; i++) if (!done[i] && dist[i] < best) { best = dist[i]; v = i; }
    if (v < 0 || v === g) break; done[v] = 1;
    for (const u of G[v]) { const d = dist[v] + wt(v, u); if (d < dist[u]) { dist[u] = d; prev[u] = v; } }
  }
  if (!isFinite(dist[g])) return null;
  const path = []; for (let c = g; c !== -1; c = prev[c]) path.unshift(c); return path;
}

function generateForest(cfg, rnd) {
  const fr = cfg.frame;
  const P = H.poisson(rnd, { x0: fr.x0, y0: fr.y0, x1: fr.x1, y1: fr.y1, r: cfg.r, keep: cfg.keep || [] });
  const Gc0 = H.gabriel(P, cfg.r * (cfg.rmaxK || 2.05), cfg.minAngle || 55);
  // no road may chord across a keep disc (a paddock is an empty disc, so the Gabriel rule alone would let an edge pass
  // straight over it): drop every edge whose segment comes within the disc's radius of its centre
  const segD = (a, b, c) => { const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1; const u = Math.max(0, Math.min(1, ((c[0] - a[0]) * dx + (c[1] - a[1]) * dy) / L2)); return Math.hypot(a[0] + u * dx - c[0], a[1] + u * dy - c[1]); };
  const Gc = Gc0.map((nb, v) => nb.filter((w) => (cfg.keep || []).every((kd) => segD(P[v], P[w], kd) >= kd[2] * (cfg.chordK || 1))));   // chordK < 1: a road may brush a paddock rim (never the mother inside it)
  const k = cfg.k; const FG = (cfg.gates && cfg.gates.forest) || {};
  const sIdx = cfg.babyAt.map((p) => H.nearest(P, [p[0], p[1] + (cfg.startDrop || 60)]));
  // the stations ringing each paddock (within its radius + 1.35 r of the centre): a mother's road may end at any of them
  const ring = cfg.paddocks.map((pd) => P.map((p, v) => v).filter((v) => H.dist(P[v], pd) < pd[2] + cfg.r * 1.35 && !sIdx.includes(v)));
  if (ring.some((rg) => !rg.length)) return { fail: ['a paddock has no station beside it'] };
  const derangements = [];
  const perm = (a, i) => {
    if (i === a.length) { if (a.every((v, j) => v !== j)) derangements.push(a.slice()); return; }
    for (let j = i; j < a.length; j++) { [a[i], a[j]] = [a[j], a[i]]; perm(a, i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  };
  perm([...Array(k).keys()], 0);
  const PERMS = []; const all = (a, i) => { if (i === a.length) { PERMS.push(a.slice()); return; } for (let j = i; j < a.length; j++) { [a[i], a[j]] = [a[j], a[i]]; all(a, i + 1); [a[i], a[j]] = [a[j], a[i]]; } };
  all([...Array(k).keys()], 0);
  const K = cfg.K || 300; let lastFail = null;
  // cfg.tally (QA): every rejection reason counted, not just the last one
  const fail = (r) => { lastFail = r; if (cfg.tally) for (const x of r) { const key = String(x).replace(/[0-9.]+/g, '#'); cfg.tally[key] = (cfg.tally[key] || 0) + 1; } };
  for (let t = 0; t < K; t++) {
    const pi = derangements[Math.floor(rnd() * derangements.length)];
    const gIdx = []; for (let j = 0; j < k; j++) { const free = ring[j].filter((v) => !gIdx.includes(v)); gIdx[j] = free[Math.floor(rnd() * free.length)]; }
    if (gIdx.some((v) => v === undefined)) { fail(['paddock stations collide']); continue; }
    const ends = new Set(sIdx.concat(gIdx));
    // route the pairs on stations nobody has claimed (never through another pair's ends), trying EVERY routing order:
    // the first road is a wall from the top to a paddock, and in a derangement one pair must go round beneath the
    // paddocks — routed in the wrong order it is walled off (measured 2026-10-11: one random order per attempt routed
    // 0 of 200; all orders route 9 of 10 point sets)
    let claimed, adj, routes, bad = null;
    for (const order of PERMS) {
      claimed = new Set(); adj = P.map(() => []); routes = []; bad = null;
      const link = (a, b) => { adj[a].push(b); adj[b].push(a); };
      for (const i of order) {
        const s = sIdx[i], g = gIdx[pi[i]];
        const Gf = Gc.map((nb, v) => (claimed.has(v) || (ends.has(v) && v !== s && v !== g) ? [] : nb.filter((w) => !claimed.has(w) && (!ends.has(w) || w === s || w === g))));
        const r = randPath(P, Gf, s, g, rnd);
        if (!r || r.length < cfg.route[0] || r.length > cfg.route[1]) { bad = 'no route for baby ' + (i + 1); break; }
        for (const v of r) claimed.add(v);
        for (let j = 0; j < r.length - 1; j++) link(r[j], r[j + 1]);
        routes[i] = { route: r, s, g };
      }
      if (!bad) break;
    }
    if (bad) { fail([bad]); continue; }
    const link = (a, b) => { adj[a].push(b); adj[b].push(a); };
    // dead ends: each tree grows `branches` side roads off its own route interior, over unclaimed stations only
    const treeOf = new Map(); routes.forEach((rt, i) => rt.route.forEach((v) => treeOf.set(v, i)));
    for (let i = 0; i < k; i++) {
      const rt = routes[i].route; let made = 0;
      for (const ci of H.shuffle(rt.slice(1, -1), rnd)) {
        if (made >= cfg.branches) break;
        if (!Gc[ci].some((w) => !claimed.has(w))) continue;
        const want = cfg.size[0] + Math.floor(rnd() * (cfg.size[1] - cfg.size[0] + 1)); let tip = ci, grown = 0;
        while (grown < want) {
          const nx = Gc[tip].filter((w) => !claimed.has(w)); if (!nx.length) break;
          const w = nx[Math.floor(rnd() * nx.length)]; claimed.add(w); treeOf.set(w, i); link(tip, w); tip = w; grown++;
        }
        if (grown) made++;
      }
    }
    // per-tree gates
    const deadOf = (i) => adj.filter((a, v) => a.length === 1 && treeOf.get(v) === i && v !== routes[i].s && v !== routes[i].g).length;
    const lens = routes.map((rt) => rt.route.length);
    const f = [];
    for (let i = 0; i < k; i++) {
      const d = deadOf(i); if (FG.dead && (d < FG.dead[0] || d > FG.dead[1])) f.push('tree ' + (i + 1) + ' dead ' + d);
      const j = routes[i].route.slice(1, -1).filter((v) => adj[v].length >= 3).length;
      if (FG.junctions != null && j < FG.junctions) f.push('route ' + (i + 1) + ' junctions ' + j);
    }
    if (FG.ratio != null && Math.min(...lens) < FG.ratio * Math.max(...lens)) f.push('route lengths ' + lens.join('/'));
    if (FG.overlap != null) {
      const bb = routes.map((_, i) => { const xs = [], ys = []; for (const [v, ti] of treeOf) if (ti === i) { xs.push(P[v][0]); ys.push(P[v][1]); } return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; });
      const ar = (q) => Math.max(1, (q[2] - q[0]) * (q[3] - q[1]));
      for (let a = 0; a < k; a++) for (let b = a + 1; b < k; b++) {
        const ix = Math.max(0, Math.min(bb[a][2], bb[b][2]) - Math.max(bb[a][0], bb[b][0])), iy = Math.max(0, Math.min(bb[a][3], bb[b][3]) - Math.max(bb[a][1], bb[b][1]));
        if (ix * iy / Math.min(ar(bb[a]), ar(bb[b])) < FG.overlap) f.push('trees ' + (a + 1) + '/' + (b + 1) + ' barely interleave');
      }
    }
    if (f.length) { fail(f); continue; }
    const mid = H.mids(P, adj, rnd, 0);
    const { chains, S } = H.chainsOf(P, adj, mid);
    if (cfg.box) {
      const half = cfg.W / 2 + 3.5 + 6; let out = null;
      for (const [kk, ss] of Object.entries(S)) for (const p of ss) if (p[0] < half || p[1] < half || p[0] > cfg.box.w - half || p[1] > cfg.box.h - half) { out = kk; break; }
      if (out) { fail(['corridor ' + out + ' leaves the box']); continue; }
    }
    const clear = H.minClear(S);
    if (FG.clear != null && clear < FG.clear) { fail(['clear ' + clear.toFixed(1)]); continue; }
    // the mouths: each baby's road starts at the baby, each mother's road ends at her paddock
    let mf = null; const mchains = [];
    for (let i = 0; i < k; i++) {
      const pd = cfg.paddocks[pi[i]], gs = P[routes[i].g]; const dd = H.dist(gs, pd) || 1;
      const rim = [pd[0] + (gs[0] - pd[0]) / dd * (pd[2] - 4), pd[1] + (gs[1] - pd[1]) / dd * (pd[2] - 4)];
      const m = mouthChains({ W: cfg.W, startMouth: cfg.babyAt[i], goalMouth: rim }, P, routes[i].s, routes[i].g, S);
      if (m.fail) { mf = m.fail; break; }
      routes[i].mouthS = m.S; routes[i].baby = i; routes[i].mother = pi[i];
      mchains.push(...m.chains);
    }
    if (mf) { fail([mf]); continue; }
    const r0 = routes[0];
    return { P, adj, mid, chains: chains.concat(mchains), S, mouthS: r0.mouthS, route: r0.route, s: r0.s, g: r0.g, W: cfg.W, routes, pi, attempts: t + 1,
      m: { routes: lens, dead: routes.map((_, i) => deadOf(i)), clear } };
  }
  return { fail: lastFail };
}

module.exports = { generateTree, generateLooped, generateLayers, generateStreets, generateForest, gateTree };
