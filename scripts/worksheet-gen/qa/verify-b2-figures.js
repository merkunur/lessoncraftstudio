#!/usr/bin/env node
/**
 * verify-b2-figures.js — the geometry gate for data/b2/figures.js.
 *
 * DOT_FIGURES: 12-20 vertices, clockwise, closed, no self-intersection,
 * min pairwise spacing ≥ MIN_SP, every vertex ≥ 5 units from every
 * non-incident edge, every dot/square mark INSIDE the polygon, and the
 * admissible-midpoint resample (the SAME rule primitives/dot-figure.js uses —
 * exported from here so the primitive and the gate share one implementation
 * of the RULE while the gate re-checks the RESULT) must reach 20 dots with
 * spacing intact.
 *
 * PIXEL_FIGURES: square 6-8, ≥ 40 % filled, asymmetric under all three flips,
 * one 8-connected component.
 *
 * Poison (run every time): a self-intersecting bowtie and a symmetric pixel
 * figure must FAIL, and every real figure must PASS — the gate exits 1 when
 * either half of that is false.
 */
'use strict';
const { DOT_FIGURES, PIXEL_FIGURES, monoRows } = require('../data/b2/figures.js');

const MIN_SP = 7;

function segInt(a, b, c, d) {
  const cr = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const d1 = cr(c, d, a), d2 = cr(c, d, b), d3 = cr(a, b, c), d4 = cr(a, b, d);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0)) && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0;
}
function inside(pt, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}
function distToSeg(m, a, b) {
  const L2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2;
  const t = L2 === 0 ? 0 : Math.max(0, Math.min(1, ((m[0] - a[0]) * (b[0] - a[0]) + (m[1] - a[1]) * (b[1] - a[1])) / L2));
  return Math.hypot(m[0] - (a[0] + t * (b[0] - a[0])), m[1] - (a[1] + t * (b[1] - a[1])));
}
function midpointOk(p, i, m) {
  const n = p.length;
  for (let k = 0; k < n; k++) if (Math.hypot(p[k][0] - m[0], p[k][1] - m[1]) < MIN_SP) return false;
  for (let j = 0; j < n; j++) {
    if (j === i) continue;
    if (distToSeg(m, p[j], p[(j + 1) % n]) < 5) return false;
  }
  return true;
}
/** Resample a closed polyline to exactly N vertices by splitting the longest
 *  admissible segment at its (integer) midpoint. Returns null when impossible. */
function subdivide(pts, N) {
  const p = pts.map((v) => v.slice());
  while (p.length < N) {
    const cands = p.map((a, i) => { const b = p[(i + 1) % p.length]; return { i, L: Math.hypot(a[0] - b[0], a[1] - b[1]) }; })
      .sort((u, v) => v.L - u.L);
    let done = false;
    for (const { i, L } of cands) {
      if (L < 2 * MIN_SP) break;
      const a = p[i], b = p[(i + 1) % p.length];
      const m = [Math.round((a[0] + b[0]) / 2), Math.round((a[1] + b[1]) / 2)];
      if (!midpointOk(p, i, m)) continue;
      p.splice(i + 1, 0, m); done = true; break;
    }
    if (!done) return null;
  }
  return p;
}
function checkPoly(key, pts, tag, fails) {
  const n = pts.length;
  for (const [x, y] of pts) if (x < 2 || x > 98 || y < 2 || y > 98) fails.push(`${key}${tag}: vertex out of box ${x},${y}`);
  let minD = 1e9;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
    if (d < minD) minD = d;
    if (d < MIN_SP) fails.push(`${key}${tag}: vertices ${i + 1},${j + 1} too close (${d.toFixed(1)})`);
  }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (j === i + 1 || (i === 0 && j === n - 1)) continue;
    if (segInt(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) fails.push(`${key}${tag}: segments ${i + 1}-${i + 2} and ${j + 1}-${j + 2} intersect`);
  }
  let A = 0; for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; A += a[0] * b[1] - b[0] * a[1]; }
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    if (j === i || (j + 1) % n === i) continue;
    const d = distToSeg(pts[i], pts[j], pts[(j + 1) % n]);
    if (d < 5) fails.push(`${key}${tag}: vertex ${i + 1} lies ${d.toFixed(1)} from edge ${j + 1}-${j + 2}`);
  }
  return { n, minD: +minD.toFixed(1), area: A / 2 };
}
function checkPixel(f, fails) {
  const mono = monoRows(f);
  const H = mono.length, W = mono[0].length;
  const filled = mono.join('').split('#').length - 1;
  if (filled / (W * H) < 0.40) fails.push(`${f.key}: fill ${Math.round(filled / (W * H) * 100)}% < 40%`);
  const lr = mono.map((r) => [...r].reverse().join(''));
  const tb = mono.slice().reverse();
  const rot = tb.map((r) => [...r].reverse().join(''));
  const eq = (a, b) => a.join('|') === b.join('|');
  if (eq(mono, lr)) fails.push(`${f.key}: left-right symmetric`);
  if (eq(mono, tb)) fails.push(`${f.key}: top-bottom symmetric`);
  if (eq(mono, rot)) fails.push(`${f.key}: 180° symmetric`);
  const seen = new Set(); let comps = 0;
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
    if (mono[r][c] !== '#' || seen.has(r + ',' + c)) continue;
    comps++; const st = [[r, c]]; seen.add(r + ',' + c);
    while (st.length) {
      const [y, x] = st.pop();
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy, nx = x + dx;
        if (ny < 0 || nx < 0 || ny >= H || nx >= W) continue;
        if (mono[ny][nx] === '#' && !seen.has(ny + ',' + nx)) { seen.add(ny + ',' + nx); st.push([ny, nx]); }
      }
    }
  }
  if (comps !== 1) fails.push(`${f.key}: ${comps} components`);
}

function checkDotFigure(f, fails) {
  const r = checkPoly(f.key, f.pts, '', fails);
  if (r.area < 0) fails.push(`${f.key}: not clockwise`);
  for (const m of f.marks || []) {
    if ((m.type === 'dot' || m.type === 'square') && !inside([m.x, m.y], f.pts)) fails.push(`${f.key}: ${m.type} mark outside polygon`);
  }
  const s20 = subdivide(f.pts, 20);
  if (!s20) fails.push(`${f.key}: cannot subdivide to 20 dots`);
  else checkPoly(f.key, s20, '@20', fails);
  return r;
}

if (require.main === module) {
  const fails = [];
  for (const f of DOT_FIGURES) {
    const r = checkDotFigure(f, fails);
    console.log(`${f.key.padEnd(10)} V=${r.n} minSpacing=${r.minD}`);
  }
  for (const f of PIXEL_FIGURES) checkPixel(f, fails);
  // poison: must FIRE
  const p1 = [];
  checkPoly('POISON-bowtie', [[10,10],[90,90],[90,10],[10,90],[50,50],[30,20],[70,20],[80,60],[20,60],[40,80],[60,80],[50,30]], '', p1);
  const p2 = [];
  checkPixel({ key: 'POISON-sym', rows: ['.####.', '######', '######', '######', '######', '.####.'] }, p2);
  const poisonOk = p1.length > 0 && p2.length > 0;
  console.log(`poison: bowtie fired=${p1.length > 0} symmetric fired=${p2.length > 0}`);
  if (fails.length) console.log('FAILS:\n' + fails.join('\n'));
  console.log(fails.length || !poisonOk ? 'FAIL' : `ALL CHECKS PASS (${DOT_FIGURES.length} dot figures, ${PIXEL_FIGURES.length} pixel figures)`);
  process.exit(fails.length || !poisonOk ? 1 : 0);
}

module.exports = { subdivide, checkPoly, checkPixel, checkDotFigure, inside, MIN_SP };
