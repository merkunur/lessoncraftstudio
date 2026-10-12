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
    // a mouth station ON its mouth point leaves no mouth to draw the start disc / flag along: refuse the maze (it used to
    // crash the composer; 2026-10-12, Level Set slots)
    const a = P[node]; const L = Math.hypot(pt[0] - a[0], pt[1] - a[1]); if (L < 4) return { fail: key + ' mouth degenerate' };
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

/** a polyline through `b` with each interior corner rounded by a quadratic of radius `r` (`n` samples per corner);
 *  straight runs are sampled every ~10 px so the measuring gates see the drawn shape */
function roundedPts(b, r, n) {
  const out = [b[0]]; const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const run = (p, q) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]); const m = Math.max(1, Math.ceil(L / 10)); for (let j = 1; j <= m; j++) out.push(lerp(p, q, j / m)); };
  let from = b[0];
  for (let i = 1; i < b.length - 1; i++) {
    const p = b[i], a = b[i - 1], c = b[i + 1]; const la = Math.hypot(p[0] - a[0], p[1] - a[1]), lc = Math.hypot(c[0] - p[0], c[1] - p[1]);
    const ra = Math.min(r, la / 2), rc = Math.min(r, lc / 2); const in0 = lerp(p, a, ra / la), out0 = lerp(p, c, rc / lc);
    run(from, in0);
    for (let j = 1; j <= n; j++) { const t = j / n; out.push([(1 - t) * (1 - t) * in0[0] + 2 * (1 - t) * t * p[0] + t * t * out0[0], (1 - t) * (1 - t) * in0[1] + 2 * (1 - t) * t * p[1] + t * t * out0[1]]); }
    from = out0;
  }
  run(from, b[b.length - 1]); return out;
}
/** a uniform Catmull-Rom curve through `b` (end points repeated), `n` samples per span */
function catmullPts(b, n) {
  const P = [b[0]].concat(b, [b[b.length - 1]]); const out = [];
  for (let i = 1; i < P.length - 2; i++) for (let j = 0; j < n; j++) {
    const t = j / n, t2 = t * t, t3 = t2 * t; const p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2];
    out.push([0, 1].map((c) => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
  }
  out.push(b[b.length - 1]); return out;
}

/**
 * STRANDS (F8 tangled lines, design B 3.8): k strings from k holders at the bottom to k goals at the top, no junctions,
 * no choices — each string crosses others and the child follows it to its end. A swap SCHEDULE over M levels decides
 * the crossings (each swap of two neighbouring strings within a level = one crossing); the strings are drawn as smooth
 * curves through their slot positions at the level boundaries.
 * cfg: k  M  slotX [x…] (k slot centres)  levelY [yBottom, yTop]  wobble (± x at boundaries)  crossings [lo,hi]  K
 *      gates.strands { angle (min crossing angle, deg), apart (min px between crossing points), near [px, run]
 *                      (no two strings within px for more than run px outside 20 px of a crossing), ratio (length) }
 * Schedule gates (FINAL §3 F8): crossings in band; the end permutation is a DERANGEMENT (no string ends straight above
 * where it starts); every string crosses ≥ 2 others; never the same partner twice in a row; every level ≥ 1 crossing.
 * The DRAWN curves are then measured: exactly the scheduled crossings (smoothing may never add one), their angles,
 * their spacing, near-runs, the length ratio.
 * Returns { strands: [{ pts, start, end, from (slot), to (slot) }], crossings: [{ x, y, a, b, over }], perm, m }.
 */
function generateStrands(cfg, rnd) {
  const k = cfg.k, M = cfg.M; const [yB, yT] = cfg.levelY; const SG = (cfg.gates && cfg.gates.strands) || {};
  const K = cfg.K || 400; let lastFail = null;
  const fail = (r) => { lastFail = r; if (cfg.tally) for (const x of r) { const kk = String(x).replace(/[0-9.]+/g, '#'); cfg.tally[kk] = (cfg.tally[kk] || 0) + 1; } };
  const segX = (a, b, c, d) => { // intersection of segments ab and cd → [x, y, ta] or null
    const r1 = [b[0] - a[0], b[1] - a[1]], r2 = [d[0] - c[0], d[1] - c[1]]; const den = r1[0] * r2[1] - r1[1] * r2[0]; if (Math.abs(den) < 1e-9) return null;
    const t = ((c[0] - a[0]) * r2[1] - (c[1] - a[1]) * r2[0]) / den, u = ((c[0] - a[0]) * r1[1] - (c[1] - a[1]) * r1[0]) / den;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [a[0] + t * r1[0], a[1] + t * r1[1], t] : null; };
  for (let t = 0; t < K; t++) {
    // 1. the schedule: per level a non-empty set of disjoint neighbouring swaps
    const at = [...Array(k).keys()];   // at[pos] = strand
    const levels = []; const partners = [...Array(k)].map(() => []);
    for (let l = 0; l < M; l++) {
      const sw = [];
      const order = H.shuffle([...Array(k - 1).keys()], rnd);
      // a swap is allowed only if neither string's previous crossing was with the other (never the same partner twice
      // in a row — drawn at random a pair that just crossed swaps straight back, 2026-10-12: 0 of 20 schedules passed)
      const fresh = (q) => { const x = at[q], y = at[q + 1]; const lx = partners[x][partners[x].length - 1], ly = partners[y][partners[y].length - 1]; return lx !== y && ly !== x; };
      for (const q of order) if (fresh(q) && !sw.some((x) => Math.abs(x - q) < 2) && rnd() < (cfg.swapP || 0.62)) sw.push(q);
      if (!sw.length) { const q = order.find(fresh); if (q === undefined) break; sw.push(q); }
      for (const q of sw) { const a = at[q], b = at[q + 1]; partners[a].push(b); partners[b].push(a); at[q] = b; at[q + 1] = a; }
      levels.push(sw);
    }
    if (levels.length < M) { fail(['a level with no fresh crossing']); continue; }
    const nX = levels.reduce((n, sw) => n + sw.length, 0);
    const endPos = []; at.forEach((s, pos) => { endPos[s] = pos; });
    const f = [];
    if (cfg.crossings && (nX < cfg.crossings[0] || nX > cfg.crossings[1])) f.push('crossings ' + nX);
    if (endPos.some((pos, s) => pos === s)) f.push('not a derangement');
    for (let s = 0; s < k; s++) {
      if (new Set(partners[s]).size < 2) f.push('string ' + (s + 1) + ' crosses one other');
      for (let i = 1; i < partners[s].length; i++) if (partners[s][i] === partners[s][i - 1]) { f.push('string ' + (s + 1) + ' meets the same string twice in a row'); break; }
    }
    if (f.length) { fail(f); continue; }
    // 2. the geometry: each strand's slot at every level boundary, wobbled, then a smooth curve
    const ys = [...Array(M + 1).keys()].map((l) => yB + (yT - yB) * l / M);
    const pos = [...Array(k).keys()]; const bnd = [...Array(k)].map(() => []);
    for (let l = 0; l <= M; l++) {
      for (let s = 0; s < k; s++) bnd[s].push([cfg.slotX[pos[s]] + (l === 0 || l === M ? 0 : (rnd() - 0.5) * 2 * (cfg.wobble || 0)), ys[l]]);
      if (l < M) for (const q of levels[l]) { const a = pos.indexOf(q), b = pos.indexOf(q + 1); pos[a] = q + 1; pos[b] = q; }
    }
    // straight runs between level boundaries (so every crossing keeps its exact geometric angle — a Catmull-Rom curve
    // bends a diagonal into an S and flattens it right where the crossing is) with only the corners rounded
    const pts = bnd.map((b) => roundedPts(b, cfg.cornerR || 16, 8));
    // 3. measure the DRAWN curves
    const xs = [];
    for (let a = 0; a < k; a++) for (let b = a + 1; b < k; b++) {
      const A = pts[a], B = pts[b];
      for (let i = 1; i < A.length; i++) for (let j = 1; j < B.length; j++) {
        const x = segX(A[i - 1], A[i], B[j - 1], B[j]); if (!x) continue;
        const da = [A[i][0] - A[i - 1][0], A[i][1] - A[i - 1][1]], db = [B[j][0] - B[j - 1][0], B[j][1] - B[j - 1][1]];
        let ang = Math.abs(Math.atan2(da[0] * db[1] - da[1] * db[0], da[0] * db[0] + da[1] * db[1])) * 180 / Math.PI; if (ang > 90) ang = 180 - ang;
        xs.push({ x: x[0], y: x[1], a, b, ang });
      }
    }
    if (xs.length !== nX) { fail(['drawn crossings ' + xs.length + ' ≠ scheduled ' + nX]); continue; }
    if (SG.angle != null && xs.some((c) => c.ang < SG.angle)) { fail(['crossing angle ' + Math.min(...xs.map((c) => c.ang)).toFixed(0)]); continue; }
    let apartOk = true; for (let i = 0; i < xs.length && apartOk; i++) for (let j = i + 1; j < xs.length; j++) if (Math.hypot(xs[i].x - xs[j].x, xs[i].y - xs[j].y) < (SG.apart || 0)) { apartOk = false; break; }
    if (!apartOk) { fail(['crossings too close']); continue; }
    if (SG.near) {
      const [np, run] = SG.near; let bad = null;
      for (let a = 0; a < k && !bad; a++) for (let b = a + 1; b < k && !bad; b++) {
        let len = 0;
        for (let i = 1; i < pts[a].length; i++) {
          const p = pts[a][i]; const nearX = xs.some((c) => Math.hypot(c.x - p[0], c.y - p[1]) < 20);
          const d = Math.min(...pts[b].map((q) => Math.hypot(q[0] - p[0], q[1] - p[1])));
          if (d < np && !nearX) { len += Math.hypot(p[0] - pts[a][i - 1][0], p[1] - pts[a][i - 1][1]); if (len > run) { bad = 'strings ' + (a + 1) + '/' + (b + 1) + ' run close'; break; } } else len = 0;
        }
      }
      if (bad) { fail([bad]); continue; }
    }
    const lens = pts.map((p) => p.reduce((n, q, i) => (i ? n + Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]) : 0), 0));
    if (SG.ratio != null && Math.min(...lens) < SG.ratio * Math.max(...lens)) { fail(['length ratio ' + (Math.min(...lens) / Math.max(...lens)).toFixed(2)]); continue; }
    // which string passes OVER at each crossing: alternate along each string where possible (over, under, over …)
    const seen = [...Array(k)].map(() => 0);
    for (const c of xs.sort((p, q) => q.y - p.y)) { const aOver = seen[c.a] % 2 === 0; c.over = aOver ? c.a : c.b; seen[c.a]++; seen[c.b]++; }
    return { strands: pts.map((p, s) => ({ pts: p, start: p[0], end: p[p.length - 1], from: s, to: endPos[s] })), crossings: xs, perm: endPos, attempts: t + 1,
      m: { crossings: nX, minAngle: Math.min(...xs.map((c) => c.ang)), ratio: Math.min(...lens) / Math.max(...lens) } };
  }
  return { fail: lastFail };
}

/**
 * HEX HOP (F13 letter hop, design B 3.13): no corridors. A pointy-top honeycomb (cols × rows, odd rows shifted half a
 * cell); a RUN of `run` letters taken from the alphabet at a seeded start (so the child begins mid-alphabet, not at A)
 * is laid as a self-avoiding walk of touching cells from a bottom-row cell; every other cell carries a decoy letter.
 * cfg: cols rows cellW rowPitch x0 y0 run startIdx [lo, hi] K  gates.hex { turns, near:[every, share], up }
 * Gates (FINAL §3 F13): EXACTLY ONE valid run on the page (searched from every cell that holds the run's first letter);
 * ≥ turns direction changes; beside EVERY step ≥ 1 near-miss decoy (the next-but-one letter, the previous letter, a
 * look-alike, the letters just outside the run) and beside ≥ share of steps ≥ 2; the letter after the run's end
 * never touches the last cell (the child must stop there); up-moves ≤ up of the steps.
 * Returns { P (cell centres), adj (all touching cells), labels: Map, route (the run's cells), s, g, run (letters), m }.
 */
function generateHexHop(cfg, seq, rnd, lookalike) {
  const C = cfg.cols, R = cfg.rows, N = C * R; const HG = (cfg.gates && cfg.gates.hex) || {};
  const id = (c, r) => r * C + c; const col = (v) => v % C, row = (v) => Math.floor(v / C);
  const P = []; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) P.push([cfg.x0 + c * cfg.cellW + (r % 2) * cfg.cellW / 2, cfg.y0 + r * cfg.rowPitch]);
  const adj = P.map(() => []);
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const v = id(c, r); const nb = [[c - 1, r], [c + 1, r]];
    const dc = r % 2 ? [0, 1] : [-1, 0];   // odd rows sit half a cell to the right
    for (const rr of [r - 1, r + 1]) for (const d of dc) nb.push([c + d, rr]);
    for (const [cc, rr] of nb) if (cc >= 0 && cc < C && rr >= 0 && rr < R) adj[v].push(id(cc, rr));
  }
  const K = cfg.K || 600; let lastFail = null;
  const fail = (r) => { lastFail = r; if (cfg.tally) for (const x of r) { const kk = String(x).replace(/[0-9.]+/g, '#'); cfg.tally[kk] = (cfg.tally[kk] || 0) + 1; } };
  const dirOf = (a, b) => Math.round(Math.atan2(P[b][1] - P[a][1], P[b][0] - P[a][0]) * 3 / Math.PI);
  for (let t = 0; t < K; t++) {
    const si = cfg.startIdx[0] + Math.floor(rnd() * (cfg.startIdx[1] - cfg.startIdx[0] + 1));
    const run = seq.slice(si, si + cfg.run); if (run.length < cfg.run) { fail(['alphabet too short']); continue; }
    // 1. the walk: self-avoiding from a bottom-row cell, leaning upward, never into a dead pocket
    const walk = [id(Math.floor(rnd() * C), R - 1)]; const on = new Set(walk);
    while (walk.length < cfg.run) {
      const v = walk[walk.length - 1]; const nx = adj[v].filter((w) => !on.has(w));
      if (!nx.length) break;
      const w = nx.map((x) => [x, (row(x) < row(v) ? 1.0 : row(x) === row(v) ? 0.9 : 0.45) * rnd()]).sort((a, b) => b[1] - a[1])[0][0];
      walk.push(w); on.add(w);
    }
    if (walk.length < cfg.run) { fail(['walk stuck']); continue; }
    let turns = 0, ups = 0;
    for (let i = 1; i < walk.length; i++) { if (row(walk[i]) < row(walk[i - 1])) ups++; if (i > 1 && dirOf(walk[i - 2], walk[i - 1]) !== dirOf(walk[i - 1], walk[i])) turns++; }
    if (HG.turns != null && turns < HG.turns) { fail(['turns ' + turns]); continue; }
    if (HG.up != null && ups > HG.up * (walk.length - 1)) { fail(['up moves ' + ups]); continue; }
    // 2. the letters: the run on the walk, near-miss decoys beside it, any other letters elsewhere
    const labels = new Map(); walk.forEach((v, i) => labels.set(v, run[i]));
    const after = seq[si + cfg.run], before = seq[si - 1];
    // look-alikes are lists ({ M: ['N', 'W'] }): spread them in as single letters (2026-10-12: a whole list became one
    // cell's 'letter'), and keep only letters of this alphabet
    const nearOf = (i) => [run[i + 1], run[i - 1], ...((lookalike && lookalike[run[i]]) || []), before, after].filter((x) => typeof x === 'string' && x !== run[i] && seq.includes(x));
    const others = seq.filter((x) => !run.includes(x));
    for (let v = 0; v < N; v++) {
      if (labels.has(v)) continue;
      const besideStep = walk.map((u, i) => (adj[u].includes(v) ? i : -1)).filter((i) => i >= 0);
      if (besideStep.length && rnd() < 0.8) { const i = besideStep[Math.floor(rnd() * besideStep.length)]; const pool = nearOf(i); labels.set(v, pool[Math.floor(rnd() * pool.length)]); }
      else labels.set(v, (rnd() < 0.5 ? run : others.length ? others : run)[Math.floor(rnd() * (rnd() < 0.5 ? run.length : (others.length || run.length)))] || run[0]);
    }
    // repair: a step with no near-miss neighbour gets one (a free cell beside the choice point takes a near letter; never
    // the letter after the run beside its last cell) — left to chance, most rejected pages failed only this
    for (let i = 1; i < walk.length; i++) {
      const near = nearOf(i); const free = adj[walk[i - 1]].filter((w) => !on.has(w));
      if (!free.length || free.some((w) => near.includes(labels.get(w)))) continue;
      const w = free[Math.floor(rnd() * free.length)]; const pick = near.filter((x) => !(x === after && adj[walk[walk.length - 1]].includes(w)));
      if (pick.length) labels.set(w, pick[Math.floor(rnd() * pick.length)]);
    }
    // the letter after the run never touches its last cell
    if (after && adj[walk[walk.length - 1]].some((w) => labels.get(w) === after)) { fail(['the next letter touches the end']); continue; }
    // near misses beside every step (the choice made from walk[i-1] to walk[i])
    let every = true, two = 0;
    for (let i = 1; i < walk.length; i++) {
      const near = new Set(nearOf(i)); const n = adj[walk[i - 1]].filter((w) => !on.has(w) && near.has(labels.get(w))).length;
      if (n < 1) every = false; if (n >= 2) two++;
    }
    if (HG.near && (!every || two < HG.near[1] * (walk.length - 1))) { fail(['near misses' + (every ? ' ' + two : ' (a step with none)')]); continue; }
    // every cell holds exactly one letter of this alphabet
    if ([...labels.values()].some((x) => typeof x !== 'string' || !seq.includes(x))) { fail(['a cell without a letter']); continue; }
    // EXACTLY ONE valid run on the whole page
    let count = 0;
    const dfs = (v, i, seen) => { if (count > 1) return; if (i === run.length - 1) { count++; return; } for (const w of adj[v]) if (!seen.has(w) && labels.get(w) === run[i + 1]) { seen.add(w); dfs(w, i + 1, seen); seen.delete(w); } };
    for (let v = 0; v < N; v++) if (labels.get(v) === run[0]) dfs(v, 0, new Set([v]));
    if (count !== 1) { fail(['valid runs ' + count]); continue; }
    return { P, adj, labels, route: walk, s: walk[0], g: walk[walk.length - 1], run, attempts: t + 1, m: { start: si, turns, ups, nearTwo: two } };
  }
  return { fail: lastFail };
}

module.exports = { generateTree, generateLooped, generateLayers, generateStreets, generateForest, generateStrands, generateHexHop, gateTree };
