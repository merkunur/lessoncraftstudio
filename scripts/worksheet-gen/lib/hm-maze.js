/**
 * hm-maze.js — build ONE gated maze for a face config (b8 Handmade Mazes). The build loop of design B §0 B1:
 * up to K route-first builds per call; the first build that passes every gate of the config wins; null when none
 * passes (the caller moves to the next seed / variant — the seed is locale-neutral, so every locale gets the same maze).
 *
 *   generateTree(cfg, rnd)    → { P, adj, mid, chains, S, route, s, g, m (metrics), W } | null
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
    const lab = cfg.label(t.adj, t.route, rnd);
    if (!lab) { lastFail = ['labels']; continue; }
    const lg = cfg.lgates || {};
    if (lg.decoys != null && lab.decoys < lg.decoys) { lastFail = ['decoys ' + lab.decoys]; continue; }
    if (lg.nearShare != null && lab.nearShare < lg.nearShare) { lastFail = ['nearShare ' + lab.nearShare.toFixed(2)]; continue; }
    if (lg.reversals != null && (lab.reversals || 0) < lg.reversals) { lastFail = ['reversals ' + (lab.reversals || 0)]; continue; }
    const R = require('./hm-rules.js');
    const vp = R.validPaths(t.adj, s, g, lab.label, cfg.rule.valid);
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
    const mouths = mouthChains(cfg, P, s, g, S);
    if (mouths.fail) { lastFail = [mouths.fail]; continue; }
    return { P, adj: t.adj, mid, chains: chains.concat(mouths.chains), S, mouthS: mouths.S, route: t.route, s, g, loops: t.loops, labels: lab.label,
      m: { route: t.route.length, paths: all.length, shortest: minLen, live: wrong ? live / wrong : 1, decoys: lab.decoys, nearShare: lab.nearShare, clear }, W: cfg.W, attempts: k + 1 };
  }
  return { fail: lastFail };
}

module.exports = { generateTree, generateLooped, gateTree };
