#!/usr/bin/env node
/* =====================================================================
   verify-rain-table-core.js — the gate of ACTIVITY #172 "Make Thirds" →
   THE RAIN TABLE (rain-table-core.js + rain-table-activity.js).
   Ground truth is the DESIGN (docs/activities-rebuild/designs/172-fractions.md)
   and this file's OWN geometry, never the core's:
     · its own shapes (analytic circle / ellipse / polygons) and its own
       pegs and notches, built from the design's table;
     · its own areas: a grid flood-fill where a wall blocks the flow
       between two neighbouring grid points (no polygon clipping at all);
     · the design's measured facts: base-parallel triangle thirds 1:3:5,
       the circle "peace sign" 2:1:1, the square-hub thirds three
       pairwise NON-congruent equal pieces, oval parametric pegs equal
       and polar 120° spokes not.
   Then, per round, EVERY buildable set of ≤ 4 walls: the accepted sets are
   exactly the equal ones, every ghost is accepted, every rejected n-part
   set misses by ≥ 10 % (largest ÷ smallest ≥ 1.10).
   Usage: node scripts/verify-rain-table-core.js [--quick]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.RT_CORE || path.join(MINI, 'rain-table-core.js');
const ACT = process.env.RT_ACT || path.join(MINI, 'rain-table-activity.js');
const MAN = process.env.RT_MAN || path.join(MINI, 'fractions-activities.json');
const C = require(CORE);
const QUICK = process.argv.includes('--quick');
let pass = 0, fail = 0; const fails = [];
const is = (c, m) => { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } };
const near = (a, b, e) => Math.abs(a - b) <= e;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the design's shapes, my own ---------- */
const S3 = Math.sqrt(3);
const TRI = [[50, 10], [50 + 20 * S3, 70], [50 - 20 * S3, 70]];
const HEX = [[70, 50 - 20 * S3], [90, 50], [70, 50 + 20 * S3], [30, 50 + 20 * S3], [10, 50], [30, 50 - 20 * S3]];
const TSQ = [[50, 10], [90, 50], [50, 90], [10, 50]];
function inPoly(P, x, y) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
const MINE = {
  circle: { inside: (x, y) => (x - 50) ** 2 + (y - 50) ** 2 <= 1600, area: Math.PI * 1600, box: [10, 10, 90, 90], pin: [50, 50] },
  oval: { inside: (x, y) => ((x - 50) / 44) ** 2 + ((y - 50) / 30) ** 2 <= 1, area: Math.PI * 44 * 30, box: [6, 20, 94, 80], pin: [50, 50] },
  square: { inside: (x, y) => x >= 20 && x <= 80 && y >= 20 && y <= 80, area: 3600, box: [20, 20, 80, 80], pin: [50, 50] },
  rectL: { inside: (x, y) => x >= 8 && x <= 92 && y >= 26 && y <= 74, area: 84 * 48, box: [8, 26, 92, 74], pin: null },
  rectT: { inside: (x, y) => x >= 26 && x <= 74 && y >= 8 && y <= 92, area: 84 * 48, box: [26, 8, 74, 92], pin: null },
  triangle: { inside: (x, y) => inPoly(TRI, x, y), area: 0.5 * 40 * S3 * 60, box: [50 - 20 * S3, 10, 50 + 20 * S3, 70], pin: [50, 50] },
  hexagon: { inside: (x, y) => inPoly(HEX, x, y), area: 6 * (S3 / 4) * 1600, box: [10, 50 - 20 * S3, 90, 50 + 20 * S3], pin: [50, 50] },
  tsquare: { inside: (x, y) => Math.abs(x - 50) + Math.abs(y - 50) <= 40, area: 3200, box: [10, 10, 90, 90], pin: null }
};
/* a point at perimeter distance d along a polygon path (closed) */
function along(P, d) { const L = []; let T = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], l = Math.hypot(b[0] - a[0], b[1] - a[1]); L.push(l); T += l; } d = ((d % T) + T) % T; for (let i = 0; i < P.length; i++) { if (d <= L[i] + 1e-9) { const a = P[i], b = P[(i + 1) % P.length]; return [a[0] + (b[0] - a[0]) * d / L[i], a[1] + (b[1] - a[1]) * d / L[i]]; } d -= L[i]; } return P[0]; }
function myPegs(shape) {
  const o = [];
  if (shape === 'circle') for (let i = 0; i < 24; i++) { const a = (-90 + 15 * i) * Math.PI / 180; o.push([50 + 40 * Math.cos(a), 50 + 40 * Math.sin(a)]); }
  if (shape === 'square') { const path = [[50, 20], [80, 20], [80, 80], [20, 80], [20, 20]]; for (let i = 0; i < 24; i++) o.push(along(path, 5 + 10 * i)); }
  if (shape === 'triangle') for (let i = 0; i < 12; i++) o.push(along(TRI, i * 40 * S3 / 4));
  if (shape === 'hexagon') for (let i = 0; i < 12; i++) o.push(along([[50, HEX[0][1]], HEX[0], HEX[1], HEX[2], HEX[3], HEX[4], HEX[5]], i * 20));
  if (shape === 'oval') for (let i = 0; i < 12; i++) { const a = (-90 + 30 * i) * Math.PI / 180; o.push([50 + 44 * Math.cos(a), 50 + 30 * Math.sin(a)]); }
  return o;
}
/* my walls for a round: { id, a, b } segments (a notch = the whole chord; a peg = pin → peg) */
function chordOf(shape, p, d) {
  /* scan the whole line for the stretch inside the shape (the reference point may itself lie outside) */
  const M = MINE[shape]; let t0 = Infinity, t1 = -Infinity;
  for (let t = -150; t <= 150; t += 0.01) if (M.inside(p[0] + d[0] * t, p[1] + d[1] * t)) { if (t < t0) t0 = t; t1 = t; }
  if (t0 === Infinity) throw new Error('a wall line misses the shape');
  /* run well past the rim: nothing lies outside the shape, so a grid step can never slip round a wall's end */
  return [[p[0] + d[0] * (t0 - 3), p[1] + d[1] * (t0 - 3)], [p[0] + d[0] * (t1 + 3), p[1] + d[1] * (t1 + 3)]];
}
function myWalls(round) {
  const M = MINE[round.shape], b = M.box, o = {};
  round.fams.forEach((f) => {
    /* a peg wall: pin → peg, run 3 units on past the rim */
    if (f === 'pegs') myPegs(round.shape).forEach((pg, i) => { const dx = pg[0] - M.pin[0], dy = pg[1] - M.pin[1], L = Math.hypot(dx, dy); o['p:' + i] = [M.pin, [pg[0] + dx / L * 3, pg[1] + dy / L * 3]]; });
    const nd = (p, d, i) => { o[f + ':' + i] = chordOf(round.shape, p, [d[0] / Math.hypot(...d), d[1] / Math.hypot(...d)]); };
    if (f === 'top') for (let i = 1; i < 12; i++) nd([b[0] + (b[2] - b[0]) * i / 12, 50], [0, 1], i);
    if (f === 'left') for (let i = 1; i < 12; i++) nd([50, b[1] + (b[3] - b[1]) * i / 12], [1, 0], i);
    if (f === 'base') for (let i = 1; i < 12; i++) nd([TRI[2][0] + 40 * S3 * i / 12, 50], [0, 1], i);
    if (f === 'side') for (let i = 1; i < 6; i++) nd([50, 10 + 10 * i], [1, 0], i);
    if (f === 'll') for (let i = 1; i < 6; i++) nd([10 + 40 * i / 6, 50 + 40 * i / 6], [1, -1], i);
    if (f === 'lr') for (let i = 1; i < 6; i++) nd([50 + 40 * i / 6, 90 - 40 * i / 6], [1, 1], i);
  });
  return o;
}
/* ---------- my areas: a grid flood fill; a wall blocks the step between two grid points it crosses ---------- */
function crosses(p, q, a, b) {
  const d = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
  const d1 = d(a, b, p), d2 = d(a, b, q), d3 = d(p, q, a), d4 = d(p, q, b);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
}
function rasterParts(shape, segs0, N) {
  const M = MINE[shape], b = M.box;
  /* an end on the rim runs on 3 units past it (a grid step must never slip round a wall's end); an end inside stays */
  const segs = segs0.map((s) => { const out = s.map((p) => p.slice()); [[0, 1], [1, 0]].forEach(([e, o]) => { const dx = s[e][0] - s[o][0], dy = s[e][1] - s[o][1], L = Math.hypot(dx, dy) || 1; if (!M.inside(s[e][0] + dx / L * 0.5, s[e][1] + dy / L * 0.5)) out[e] = [s[e][0] + dx / L * 3, s[e][1] + dy / L * 3]; }); return out; });
  const h = Math.max(b[2] - b[0], b[3] - b[1]) / N, nx = Math.ceil((b[2] - b[0]) / h) + 1, ny = Math.ceil((b[3] - b[1]) / h) + 1;
  const X = (i) => b[0] + (i + 0.5) * h - h / 2 + h / 2 * 0.37, Y = (j) => b[1] + (j + 0.5) * h - h / 2 + h / 2 * 0.61;
  const lab = new Int32Array(nx * ny).fill(-1), ins = new Uint8Array(nx * ny);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) ins[j * nx + i] = M.inside(X(i), Y(j)) ? 1 : 0;
  const blocked = (i, j, k, l) => { const p = [X(i), Y(j)], q = [X(k), Y(l)]; for (const s of segs) if (crosses(p, q, s[0], s[1])) return true; return false; };
  const sizes = []; let n = 0;
  for (let s = 0; s < nx * ny; s++) {
    if (!ins[s] || lab[s] >= 0) continue;
    let cnt = 0; const st = [s]; lab[s] = n;
    while (st.length) {
      const c = st.pop(), i = c % nx, j = (c - i) / nx; cnt++;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = i + di, l = j + dj; if (k < 0 || l < 0 || k >= nx || l >= ny) continue; const t = l * nx + k; if (!ins[t] || lab[t] >= 0 || blocked(i, j, k, l)) continue; lab[t] = n; st.push(t); }
    }
    sizes.push(cnt * h * h); n++;
  }
  return sizes.filter((a) => a > M.area * 0.004).sort((x, y) => x - y);
}
const sorted = (a) => a.slice().sort((x, y) => x - y);

/* ---------- 1. the shapes, pegs and notches against the design ---------- */
Object.keys(MINE).forEach((sh) => {
  is(near(C.whole(sh), MINE[sh].area, MINE[sh].area * 0.001), `${sh}: the outline's area is the shape's (${C.whole(sh).toFixed(1)} vs ${MINE[sh].area.toFixed(1)})`);
  const pin = C.SHAPES[sh].pin;
  is(MINE[sh].pin ? pin && near(pin[0], 50, 1e-9) && near(pin[1], 50, 1e-9) : !pin, `${sh}: a centre pin only where the design has one`);
  const mine = myPegs(sh), core = C.pegs(sh);
  is(mine.length === core.length && mine.every((p, i) => near(p[0], core[i][0], 1e-6) && near(p[1], core[i][1], 1e-6)), `${sh}: the rim pegs are the design's (${core.length})`);
});
['rectL', 'rectT', 'tsquare'].forEach((sh) => is(C.pegs(sh).length === 0, `${sh}: no rim pegs (walls from a rectangle's centre to equal perimeter steps are not equal)`));
/* the square's pegs: none on a corner or an edge middle */
C.pegs('square').forEach((p, i) => { const onCorner = [20, 80].includes(Math.round(p[0])) && [20, 80].includes(Math.round(p[1])), mid = (near(p[0], 50, 1e-6) && (near(p[1], 20, 1e-6) || near(p[1], 80, 1e-6))) || (near(p[1], 50, 1e-6) && (near(p[0], 20, 1e-6) || near(p[0], 80, 1e-6))); is(!onCorner && !mid, `square peg ${i} is on no corner and no edge middle`); });
/* the oval: parametric pegs 4 apart give equal thirds; polar 120° spokes would not */
{
  const segs = [0, 4, 8].map((i) => [[50, 50], myPegs('oval')[i]]), A = rasterParts('oval', segs, 400);
  is(A.length === 3 && A[2] / A[0] < 1.01, `oval: parametric pegs 0, 4, 8 cut three equal parts (${A.map((x) => (x / MINE.oval.area).toFixed(3))})`);
  const polar = [90, 210, 330].map((d) => { const a = d * Math.PI / 180, r = 1 / Math.sqrt((Math.cos(a) / 44) ** 2 + (Math.sin(a) / 30) ** 2); return [[50, 50], [50 + r * Math.cos(a), 50 - r * Math.sin(a)]]; }), B = rasterParts('oval', polar, 400);
  is(B.length === 3 && B[2] / B[0] > 1.1, `oval: polar 120° spokes are NOT equal (${B.map((x) => (x / MINE.oval.area).toFixed(3))}) — the pegs must be parametric`);
}
/* the design's measured facts, on my own areas */
{
  const tri = rasterParts('triangle', [[[0, 30], [100, 30]], [[0, 50], [100, 50]]], 500), u = MINE.triangle.area / 9;
  is(tri.length === 3 && near(tri[0] / u, 1, 0.03) && near(tri[1] / u, 3, 0.04) && near(tri[2] / u, 5, 0.05), `triangle: strips parallel to the base at equal heights fill 1 : 3 : 5 (${tri.map((x) => (x / u).toFixed(2))})`);
  const pg = myPegs('circle'), ps = rasterParts('circle', [[[50, 50], pg[0]], [[50, 50], pg[12]], [[50, 50], pg[6]]], 500), c = MINE.circle.area;
  is(ps.length === 3 && near(ps[0] / c, 0.25, 0.006) && near(ps[1] / c, 0.25, 0.006) && near(ps[2] / c, 0.5, 0.006), `circle: the "peace sign" (a diameter + a radius) is 1/2, 1/4, 1/4 (${ps.map((x) => (x / c).toFixed(3))})`);
  /* the core agrees on both */
  let st = C.newState(3, 1); ['side:2', 'side:4'].forEach((id) => C.toggle(st, id)); const ct = C.partsNow(st).map((p) => p.area / u);
  is(sorted(ct).map((x) => Math.round(x * 1000) / 1000).join() === '1,3,5', `core: the triangle strips are 1 : 3 : 5 (${sorted(ct).map((x) => x.toFixed(3))})`);
  st = C.newState(3, 0); ['p:0', 'p:12', 'p:6'].forEach((id) => C.toggle(st, id));
  is(sorted(C.partsNow(st).map((p) => p.area / c)).map((x) => x.toFixed(3)).join() === '0.250,0.250,0.500', 'core: the peace sign is 1/4, 1/4, 1/2');
}
/* the square-hub surprise (T8): pegs 0, 8, 16 → three pieces, each 1200, pairwise not congruent (mirror images included) */
{
  const pg = myPegs('square'), corners = { 80020: [80, 20], 80080: [80, 80], 20080: [20, 80], 20020: [20, 20] };
  const posOf = (p) => { /* perimeter position from top-middle, clockwise */ const [x, y] = p; if (y === 20 && x >= 50) return x - 50; if (x === 80) return 30 + (y - 20); if (y === 80) return 90 + (80 - x); if (x === 20) return 150 + (80 - y); return 210 + (x - 20); };
  const cornerPos = [[30, [80, 20]], [90, [80, 80]], [150, [20, 80]], [210, [20, 20]]];
  const piece = (a, b) => { const pa = posOf(pg[a].map((v) => Math.round(v * 1e6) / 1e6)), pb = posOf(pg[b].map((v) => Math.round(v * 1e6) / 1e6)), P = [[50, 50], pg[a]]; cornerPos.forEach(([d, c]) => { if (d > pa && d < pb) P.push(c); }); P.push(pg[b]); return P; };
  const P = [piece(0, 8), piece(8, 16)], last = [[50, 50], pg[16], [20, 20], pg[0]]; P.push(last);
  const shoe = (Q) => Math.abs(Q.reduce((s, p, i) => { const q = Q[(i + 1) % Q.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
  P.forEach((Q, i) => is(near(shoe(Q), 1200, 1e-6), `square hub piece ${i}: area 1200 = one third (${shoe(Q)})`));
  const sig = (Q) => Q.map((p, i) => Math.round(Math.hypot(Q[(i + 1) % Q.length][0] - p[0], Q[(i + 1) % Q.length][1] - p[1]) * 1000) / 1000).sort((x, y) => x - y).join('/') + '#' + Q.length;
  is(new Set(P.map(sig)).size === 3, `square hub: the three thirds are pairwise NOT congruent (side lengths ${P.map(sig).join(' | ')})`);
  is(C.rounds(3).some((r) => r.shape === 'square' && r.fams.join() === 'pegs' && r.surprise && r.ghost.join() === 'p:0,p:8,p:16'), 'the surprise round is the square with pegs only, ghost pegs 0, 8, 16');
}

/* ---------- 2. the rounds ---------- */
const DESIGN = { 3: 'circle triangle hexagon square rectL tsquare oval square rectT', 2: 'circle square rectL triangle hexagon oval tsquare rectT', 4: 'circle square rectL oval tsquare hexagon triangle rectT' };
const COLOUR = { 3: [1, 2, 1, 2, 1, 2, 1, 2, 1], 2: [1, 1, 1, 1, 1, 1, 1, 1], 4: [1, 3, 2, 1, 3, 2, 1, 3] };
for (const n of [2, 3, 4]) {
  const R = C.rounds(n);
  is(R.map((r) => r.shape).join(' ') === DESIGN[n], `${n} parts: the design's ${R.length} shapes in order`);
  is(R.map((r) => r.colour).join() === COLOUR[n].join(), `${n} parts: the color targets are the design's`);
  is(R.length >= 7, `${n} parts: at least 7 rounds (${R.length})`);
}
/* one wall family on a square or turned square (the 4 % near-miss of mixing); triangle thirds = pegs + base-parallel notches */
C.rounds(2).concat(C.rounds(3), C.rounds(4)).forEach((r) => {
  if (r.shape === 'square') is(r.fams.join() === 'pegs' || !r.fams.includes('pegs'), `${r.n}/${r.k} square: one wall family (${r.fams})`);
  if (r.shape === 'tsquare') is(!r.fams.includes('pegs'), `${r.n}/${r.k} turned square: notches only`);
  if (r.shape.startsWith('rect')) is(!r.fams.includes('pegs'), `${r.n}/${r.k} rectangle: no pegs`);
});
is(C.rounds(3)[1].fams.slice().sort().join() === 'pegs,side', 'thirds triangle: pegs + base-parallel notches only');

/* every buildable set of ≤ 4 walls, per round */
let totalSets = 0, crossChecked = 0;
for (const n of [3, 2, 4]) for (const r of C.rounds(n)) {
  const ws = C.wallsOf(r), out = C.SHAPES[r.shape].outline, W = MINE[r.shape].area, mine = myWalls(r);
  is(ws.map((w) => w.id).sort().join() === Object.keys(mine).sort().join(), `${n}/${r.k} ${r.shape}: the offered walls are the design's (${ws.length})`);
  let acc = 0, worst = Infinity, worstSet = '', ghostOk = false, i = 0, sample = 0;
  const step = QUICK ? 97 : 23;
  const rec = (start, set) => {
    if (set.length) {
      totalSets++; i++;
      const p = C.cut(out, set), A = p.map((q) => q.area), eq = p.length === n && A.every((a) => Math.abs(a - W / n) <= 0.005 * W);
      const accepted = C.isEqual(p, n, C.whole(r.shape));
      if (accepted !== eq) is(false, `${n}/${r.k} ${set.map((w) => w.id)}: accepted=${accepted} but my equal rule says ${eq}`);
      if (eq) acc++;
      else if (p.length === n) { const s = Math.max(...A) / Math.min(...A); if (s < worst) { worst = s; worstSet = set.map((w) => w.id).join(' '); } }
      /* a sample cross-checked against my own areas */
      if (i % step === 0 && Math.min(...A) > W * 0.012) {
        const mineA = rasterParts(r.shape, set.map((w) => mine[w.id]), 220), coreA = sorted(A);
        const ok = mineA.length === coreA.length && mineA.every((a, j) => Math.abs(a - coreA[j]) <= W * 0.012);
        if (!ok) is(false, `${n}/${r.k} ${set.map((w) => w.id)}: core parts ${coreA.map((a) => (a / W).toFixed(3))} vs mine ${mineA.map((a) => (a / W).toFixed(3))}`);
        else pass++;
        crossChecked++; sample++;
      }
    }
    if (set.length === C.MAXWALLS) return;
    for (let j = start; j < ws.length; j++) { set.push(ws[j]); rec(j + 1, set); set.pop(); }
  };
  rec(0, []);
  /* the ghost, on my own areas */
  const g = rasterParts(r.shape, r.ghost.map((id) => mine[id]), 400);
  ghostOk = g.length === n && g.every((a) => Math.abs(a - W / n) <= 0.01 * W);
  is(ghostOk, `${n}/${r.k} ${r.shape}: the ghost ${r.ghost} cuts ${n} equal parts on my areas (${g.map((a) => (a / W).toFixed(3))})`);
  is(C.accepts(r, r.ghost), `${n}/${r.k}: the core accepts the ghost`);
  is(acc >= 1, `${n}/${r.k} ${r.shape}: at least one buildable equal set (${acc})`);
  is(worst >= 1.10, `${n}/${r.k} ${r.shape}: every rejected ${n}-part set misses by ≥ 10 % (nearest ${worst.toFixed(3)}: ${worstSet})`);
  is(sample > 0, `${n}/${r.k}: some sets cross-checked against my areas`);
}
is(crossChecked > 300, `cross-checked ${crossChecked} wall sets against my own areas`);

/* the old activity's seven thirds constructions are all accepted (circle radii, triangle centroid→vertices, hexagon alternate vertices, square/rectangle strips, turned square strips, oval parametric spokes) */
{
  const R3 = C.rounds(3), byShape = (s) => R3.find((r) => r.shape === s && !r.surprise);
  [['circle', ['p:0', 'p:8', 'p:16']], ['triangle', ['p:0', 'p:4', 'p:8']], ['hexagon', ['p:1', 'p:5', 'p:9']], ['square', ['top:4', 'top:8']], ['rectL', ['top:4', 'top:8']], ['tsquare', ['ll:2', 'll:4']], ['oval', ['p:0', 'p:4', 'p:8']]]
    .forEach(([s, ids]) => is(C.accepts(byShape(s), ids), `the old ${s} thirds construction ${ids} is accepted`));
}

/* ---------- 3. tubes, the hand, Check ---------- */
{
  const st = C.newState(3, 1); ['side:2', 'side:4'].forEach((id) => C.toggle(st, id));
  const parts = C.partsNow(st), t = C.tubes(parts, 3, C.whole('triangle'));
  is(t.tubes.every((tb) => near(tb.level * C.whole('triangle') / 3, parts[tb.part].area, 1e-6)), 'a tube level is its part\'s area over one fair share');
  is(t.tubes.map((tb) => C.lineState(tb.level)).sort().join() === 'at,over,under', 'the 1 : 3 : 5 strips read under / at / over');
  const four = C.newState(3, 3); ['top:3', 'top:6', 'top:9'].forEach((id) => C.toggle(four, id));
  const t4 = C.tubes(C.partsNow(four), 3, C.whole('square'));
  is(t4.tubes.length === 3 && t4.puddle.length === 1, 'four parts on a three-tube rack: one part spills into the puddle tray');
  const two = C.newState(3, 3); C.toggle(two, 'top:6'); const t2 = C.tubes(C.partsNow(two), 3, C.whole('square'));
  is(t2.tubes[2].part === null && t2.tubes[2].level === 0, 'two parts on a three-tube rack: a tube stands dry');
}
{
  /* no wall → a note, no miss; wrong count → hintCount; unequal → hintUnequal; second miss → help + hintGhost; a new wall clears the help */
  const st = C.newState(3, 3);
  let r = C.check(st); is(r.result === 'note' && r.key === 'hintStart' && st.misses === 0, 'Check with no wall: the start hint, no miss');
  C.toggle(st, 'top:6'); r = C.check(st); is(r.result === 'miss' && r.kind === 'count' && C.hint(st, r) === 'hintCount' && st.misses === 1 && !st.help, 'two parts for thirds: a count miss');
  C.toggle(st, 'top:6'); C.toggle(st, 'top:3'); C.toggle(st, 'top:7'); r = C.check(st);
  is(r.result === 'miss' && r.kind === 'unequal' && st.help && C.hint(st, r) === 'hintGhost', 'second miss: help on, the ghost hint');
  C.toggle(st, 'top:7'); is(!st.help && st.verdict === null, 'a lifted wall clears the help and empties the tubes');
  C.toggle(st, 'top:7'); r = C.check(st); is(r.kind === 'unequal' && C.hint(st, r) === 'hintGhost', 'the help returns at the next miss');
  C.toggle(st, 'top:3'); C.toggle(st, 'top:7'); C.toggle(st, 'top:4'); C.toggle(st, 'top:8'); r = C.check(st);
  is(r.result === 'ok' && st.done, 'thirds strips at 4/12 and 8/12: solved');
  const st1 = C.newState(3, 3); C.toggle(st1, 'top:3'); C.toggle(st1, 'top:7'); r = C.check(st1);
  is(C.hint(st1, r) === 'hintUnequal', 'a first unequal miss: the unequal hint');
  /* four walls at most */
  const s4 = C.newState(4, 0); ['p:0', 'p:6', 'p:12', 'p:18'].forEach((id) => C.toggle(s4, id)); const t5 = C.toggle(s4, 'p:3');
  is(!t5.ok && t5.key === 'hintTooMany' && s4.walls.length === 4, 'a fifth wall is refused with the four-walls hint');
  is(C.toggle(s4, 'p:0').ok && s4.walls.length === 3, 'a wall that is up lifts away');
  is(!C.toggle(s4, 'nope').ok, 'an unknown wall does nothing');
}
{
  /* the color step: only on equal parts; k colored → done; wrong count → hintColour; second → help */
  const st = C.newState(3, 0, true); ['p:0', 'p:8'].forEach((id) => C.toggle(st, id)); let r = C.check(st);
  is(r.result === 'miss' && st.step === 'build', 'color on: two parts for thirds never open the color step');
  const st3 = C.newState(3, 0, true); ['p:0', 'p:8', 'p:12'].forEach((id) => C.toggle(st3, id)); const r3 = C.check(st3);
  is(C.partsNow(st3).length === 3 && r3.result === 'miss' && st3.step === 'build', 'color on: three UNEQUAL parts never open the color step');
  C.toggle(st, 'p:16'); r = C.check(st);
  is(r.result === 'built' && st.step === 'colour' && !st.done, 'color on: equal parts open the color step');
  is(!C.toggle(st, 'p:4').ok, 'in the color step the walls stay');
  C.colour(st, 0); C.colour(st, 1); r = C.check(st);
  is(r.result === 'miss' && r.kind === 'colour' && C.hint(st, r) === 'hintColour' && !st.help, 'two colored for 1 of 3: a color miss');
  r = C.check(st); is(st.help, 'second color miss: help');
  C.colour(st, 1); is(!st.help, 'a color tap clears the help');
  r = C.check(st); is(r.result === 'ok' && st.done, '1 of 3 colored: solved');
  const off = C.newState(3, 0, false); ['p:0', 'p:8', 'p:16'].forEach((id) => C.toggle(off, id)); r = C.check(off);
  is(r.result === 'ok' && off.done && off.step === 'build', 'color off: equal parts solve the round');
  is(!C.colour(off, 0), 'no coloring outside the color step');
}
/* the plan: order-only, never the previous order — even when the generator would deal the same order again */
for (const n of [2, 3, 4]) { const fixed = () => 0.37, a = C.plan(n, fixed, null), b = C.plan(n, fixed, a); is(b.join() !== a.join() && b.slice().sort((x, y) => x - y).join() === a.slice().sort((x, y) => x - y).join(), `${n}: a generator that repeats itself still gets a fresh order`); }
/* the plan: order-only, never the previous order */
for (const n of [2, 3, 4]) { let prev = null; for (let t = 0; t < 40; t++) { const p = C.plan(n, Math.random, prev); is(p.slice().sort((a, b) => a - b).join() === C.rounds(n).map((r) => r.k).join() && (!prev || p.join() !== prev.join()), `${n}: plan ${t} is a fresh order of every round`); prev = p; } }

/* ---------- 4. the words ---------- */
const src = fs.readFileSync(ACT, 'utf8');
const strings = Function('return ' + src.slice(src.indexOf('/*STRINGS-BEGIN*/') + 17, src.indexOf(',/*STRINGS-END*/')).replace(/^strings:\s*/, ''))();
const FRAC = Function('return ' + src.slice(src.indexOf('/*FRAC-BEGIN*/') + 14, src.indexOf(',/*FRAC-END*/')).replace(/^FRAC:\s*/, ''))();
const KEYS = Object.keys(strings);
for (const k of KEYS) {
  const en = strings[k].en, ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const l of LOCALES) {
    const v = strings[k][l];
    is(typeof v === 'string' && v.trim().length > 0, `${k}.${l} is written`);
    is(ph(v) === ph(en), `${k}.${l} carries the same placeholders as en (${ph(v)} vs ${ph(en)})`);
    if (l === 'fr') is(!/[^  ][!?:;]/.test(v.replace(/https?:/g, '').replace(/\{\w+\}/g, 'x')) || !/ [!?:;]/.test(v), `fr ${k}: no plain space before ! ? : ;`);
    if (/^(ok|q|hint)/.test(k) && l !== 'en') is(!/^\p{Ll}/u.test(v.replace(/^[¡¿]/, '')), `${k}.${l} starts with a capital`);
  }
}
/* the turned square is a square — never a diamond, rhombus, lozenge */
const BAN = /(?<!\p{L})(diamond|rhombus|raute|rhombus|losange|rombo|losango|ruit|romb|rombe|ruder|ruter|vinoneliö)/iu;
for (const k of KEYS) for (const l of LOCALES) is(!BAN.test(strings[k][l]), `${k}.${l}: the turned square is never called a diamond`);
for (const l of LOCALES) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = (j.prose || j)['fractions.partition-thirds.2-g-a-3'];
  is(!!p, `${l}: the prose entry exists`);
  if (p) is(!BAN.test(JSON.stringify(p)), `${l} prose: the turned square is never called a diamond`);
}
/* the poison of the ban, both ways */
is(BAN.test('a diamond') && BAN.test('Eine Raute') && BAN.test('un losange') && BAN.test('vinoneliö'), 'the diamond ban fires on its words');
is(!BAN.test('a turned square') && !BAN.test('Ruimte') && !BAN.test('rompe'), 'the diamond ban leaves other words alone');
/* fractions */
for (const l of LOCALES) {
  is(FRAC[l] && ['2', '3', '4'].every((n) => FRAC[l].plural[n]) && ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4'].every((a) => FRAC[l].amount[a]), `${l}: every fraction word is written`);
  is(FRAC[l].plural['2'].toLowerCase() === strings.pHalves[l].toLowerCase() && FRAC[l].plural['3'].toLowerCase() === strings.pThirds[l].toLowerCase() && FRAC[l].plural['4'].toLowerCase() === strings.pFourths[l].toLowerCase(), `${l}: the settings name the same fraction nouns as the task line`);
}
/* no dead strings: every key is asked for outside the strings block (the shell asks for title, instruction, the bubbles and the setting labels) */
/* the hint keys are chosen by the core (check / toggle / hint), the rest by the activity */
const body = src.slice(src.indexOf(',/*FRAC-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = ['title', 'instruction', 'instrBubble', 'okBubble'];
for (const k of KEYS) is(SHELL.includes(k) || body.includes("'" + k + "'"), `${k} is used`);
/* Next follows 0.5 s after the result (never a reading-time wait) */
is(/OK_MS: 500,/.test(src), 'Next appears 0.5 s after the result');
/* the manifest */
{
  const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find((x) => x.id === 'fractions.partition-thirds.2-g-a-3');
  is(row && row.tool === 'rain-table-activity' && JSON.stringify(row.params) === '{}', 'the manifest row points at the rain table with no params');
  is(row && row.alignment.code === '2.G.A.3' && Object.keys(row.slug).length === 11, 'the row keeps 2.G.A.3 and its 11 slugs');
  const html = fs.readFileSync(path.join(MINI, 'rain-table-activity.html'), 'utf8');
  is(/rain-table-core\.js\?v=\d+/.test(html) && /rain-table-activity\.js\?v=\d+/.test(html) && /LCS\.mount\(RainTableActivity/.test(html), 'the html loads the core and the activity');
}

if (fails.length) console.log(fails.map((f) => '  FAIL: ' + f).join('\n'));
console.log(`verify-rain-table-core: ${pass} pass, ${fail} fail (${totalSets} wall sets enumerated)`);
process.exit(fail ? 1 : 0);
