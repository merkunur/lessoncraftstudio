/**
 * tangram.js — the K-353 `tangram` apparatus (design file §2 "NEW
 * primitives/tangram.js"). Pure SVG on primitives/_tokens.js; every function
 * is Node-testable (tools/gate-tangram-figures.js + qa/verify-b4-tangram.js
 * re-derive from it). NO text is ever drawn: the family is wordless.
 *
 * GEOMETRY (design §2). Unit square side 1, SVG axes (y down),
 * h = Math.SQRT2 / 4 = 0.353553 (the small-triangle leg = the square side).
 * Local polygons, reference vertex at the origin:
 *   L1 L2  (0,0) (1,0) (0.5,0.5)                  area 0.25   hyp along +x, apex +y
 *   M      (0,0) (0.5,0) (0,0.5)                  area 0.125  right angle at the origin
 *   S1 S2  (0,0) (0.5,0) (0.25,0.25)              area 0.0625
 *   Q      (0,0) (0.25,0.25) (0,0.5) (-0.25,0.25) area 0.125  diamond, vertex at the origin
 *   P      (0,0) (0.25,0.25) (0.25,0.75) (0,0.5)  area 0.125  long sides vertical; CHIRAL
 * Placement {id, x, y, rot, flip}: `flip` mirrors local x before rotation
 * (legal on P only); `rot` in 45° steps applies (x cos − y sin, x sin + y cos)
 * (clockwise on screen); then translate (x, y); then multiply by S. Every
 * vertex of every placed tan is a + b√2 in units of 1/8 (the ring property
 * the gate's 1e-9 tolerances rely on); the bank stores the measured decimal
 * form and nothing here converts.
 *
 * API
 *   TANS · h · clsOf(id) · TRANSFORMS (the 8 lattice symmetries)
 *   placeUnit(t) → unit polygon of one placement
 *   polyArea · clipArea(a, b) (both convex, Sutherland-Hodgman) · contactLength
 *   bboxOf(polys) → {x0, y0, x1, y1, w, h}
 *   silhouette(tiling) → [loop] (unit coords): orient every polygon positive,
 *     split every edge at every vertex lying on it, drop equal-and-opposite
 *     segment pairs (6-decimal keys, |v| < 5e-7 snapped), chain survivors
 *     taking the LARGEST signed turn at a fork (pinch vertices, e.g. the
 *     boat's hull/sail corner), drop collinear vertices.
 *   analyze(tiling) → { polys, bbox, area, expected, loops, silhouette,
 *     symmetryGroup, chiral, outlineKind, counts, faults } — the loader's
 *     per-entry derivation (never authored); `faults` = rules 1-6 of the gate
 *   transformTiling(tiling, t) → the placements under one of the 8 symmetries
 *     (rot/flip RE-DERIVED so the polygons equal the transformed point sets;
 *     mirrors toggle `flip` on P), re-bboxed to the origin
 *   symmetryGroup(tiling) → the subset of the 8 whose silhouette equals the
 *     original's as a point set after bbox normalisation (6 decimals)
 *   triangulate(loop) (ear clipping) · areaInside(convexPoly, loop) — the
 *     CONCAVE-capable containment the lattice tiler uses
 *   countTilings(loop, classes, opts) → the number of lattice tilings of the
 *     outline by the listed classes (positions (a + b√2)/8 inside the bbox,
 *     8 rotations, P flip; counted modulo swapping congruent tans)
 *   placeTans(tiling, S, {stroke, pad}) → {tans:[{id, cls, pts:[[px,py]..], area}], w, h, sp, bbox}
 *     (origin = bbox min minus the stroke pad sp = stroke/2 + 1, or `pad` when given)
 *   tangramFigure({figure|tans, S, mode, missing, stroke, pad, transform, data})
 *     modes: template (cream tans, 3 px teal seams + edge, data-lcs-tan) ·
 *     solution (cream tans, 2 px teal seams, 3 px teal outline path;
 *     data-lcs-tan + data-lcs-class per polygon) · outline (one path, WHITE
 *     fill, 3 px teal, no polygons) · silhouette (one path, teal fill + teal
 *     3 px stroke, round joins) · hole (six polygons tealSoft + 2 px teal
 *     seams; the hole path fill NONE, 3 px dashed 8 6 coral, data-lcs-hole;
 *     root data-lcs-missing=<class>)
 *   canonicalPose(cls, S, {flip}) → the true-size polygon in the canonical
 *     pose: L/M/S hyp horizontal apex UP, Q axis-aligned, P long sides
 *     horizontal leaning right (`flip` mirrors it)
 *   tanGlyph(cls, Sg, {flip}) → an inline svg icon (data-lcs-glyph, data-lcs-flip)
 *   tanChip(cls, S, {flip})   → the SAME pose at the figure's S (data-lcs-chip)
 *   tanLegend({rows, Sg})     → the wordless colour legend (swatch + glyph)
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, esc } = require('./_svg.js');

const T = tokens.color;
const CODE = tokens.codeColors;
const R2 = Math.SQRT2;
const h = R2 / 4;
const EPS = 1e-9;

const TANS = {
  L: { poly: [[0, 0], [1, 0], [0.5, 0.5]], area: 0.25, kind: 'triangle', ids: ['L1', 'L2'] },
  M: { poly: [[0, 0], [0.5, 0], [0, 0.5]], area: 0.125, kind: 'triangle', ids: ['M'] },
  S: { poly: [[0, 0], [0.5, 0], [0.25, 0.25]], area: 0.0625, kind: 'triangle', ids: ['S1', 'S2'] },
  Q: { poly: [[0, 0], [0.25, 0.25], [0, 0.5], [-0.25, 0.25]], area: 0.125, kind: 'square', ids: ['Q'] },
  P: { poly: [[0, 0], [0.25, 0.25], [0.25, 0.75], [0, 0.5]], area: 0.125, kind: 'parallelogram', ids: ['P'] },
};
const TAN_IDS = ['L1', 'L2', 'M', 'S1', 'S2', 'Q', 'P'];
const CLASSES = ['L', 'M', 'S', 'Q', 'P'];
const LEGEND_COLORS = { L: 'codeRed', M: 'codeBlue', S: 'codeYellow', Q: 'codeGreen', P: 'codeOrange' };

const TRANSFORMS = {
  id: ([x, y]) => [x, y],
  rot90: ([x, y]) => [-y, x],
  rot180: ([x, y]) => [-x, -y],
  rot270: ([x, y]) => [y, -x],
  mirX: ([x, y]) => [-x, y],
  mirY: ([x, y]) => [x, -y],
  mirD: ([x, y]) => [y, x],
  mirA: ([x, y]) => [-y, -x],
};
const TRANSFORM_NAMES = Object.keys(TRANSFORMS);
const MIRRORS = new Set(['mirX', 'mirY', 'mirD', 'mirA']);

function clsOf(id) { return String(id)[0]; }

/* ------------------------------------------------------------------ geometry */
function placeLocal(cls, x, y, rot, flip) {
  const th = ((rot || 0) * Math.PI) / 180;
  const c = Math.cos(th), s = Math.sin(th);
  return TANS[cls].poly.map(([px, py]) => {
    const lx = flip ? -px : px;
    return [lx * c - py * s + x, lx * s + py * c + y];
  });
}
function placeUnit(t) {
  const cls = clsOf(t.id);
  if (!TANS[cls]) throw new Error('tangram: unknown tan id ' + t.id);
  return placeLocal(cls, t.x, t.y, t.rot, t.flip);
}
function polyArea(p) {
  let a = 0;
  for (let i = 0; i < p.length; i++) { const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length]; a += x1 * y2 - x2 * y1; }
  return a / 2;
}
/** Sutherland-Hodgman: the area of sub ∩ clp, both convex (any orientation). */
function clipArea(sub, clp) {
  const sgn = polyArea(clp) >= 0 ? 1 : -1;
  let out = sub;
  for (let i = 0; i < clp.length; i++) {
    const A = clp[i], B = clp[(i + 1) % clp.length];
    const inp = out; out = [];
    const side = (p) => sgn * ((B[0] - A[0]) * (p[1] - A[1]) - (B[1] - A[1]) * (p[0] - A[0]));
    for (let j = 0; j < inp.length; j++) {
      const P = inp[j], Qp = inp[(j + 1) % inp.length];
      const sp = side(P), sq = side(Qp);
      if (sp >= -1e-12) out.push(P);
      if ((sp >= -1e-12) !== (sq >= -1e-12)) { const t = sp / (sp - sq); out.push([P[0] + t * (Qp[0] - P[0]), P[1] + t * (Qp[1] - P[1])]); }
    }
    if (!out.length) break;
  }
  return out.length ? Math.abs(polyArea(out)) : 0;
}
/** Shared-edge contact length between two polygons (collinear opposite segments). */
function contactLength(p, q) {
  let len = 0;
  for (let i = 0; i < p.length; i++) for (let j = 0; j < q.length; j++) {
    const a = p[i], b = p[(i + 1) % p.length], c = q[j], d = q[(j + 1) % q.length];
    const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy);
    const cross = (pt) => Math.abs(ux * (pt[1] - a[1]) - uy * (pt[0] - a[0])) / L;
    if (cross(c) > EPS || cross(d) > EPS) continue;
    const proj = (pt) => (ux * (pt[0] - a[0]) + uy * (pt[1] - a[1])) / L;
    const lo = Math.max(0, Math.min(proj(c), proj(d))), hi = Math.min(L, Math.max(proj(c), proj(d)));
    if (hi - lo > EPS) len += hi - lo;
  }
  return len;
}
function bboxOf(polys) {
  const xs = polys.flat().map((v) => v[0]), ys = polys.flat().map((v) => v[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), x1 = Math.max(...xs), y1 = Math.max(...ys);
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}
const key6 = (p) => p.map((v) => (Math.abs(v) < 5e-7 ? 0 : v).toFixed(6)).join(',');
const key5 = (p) => p.map((v) => (Math.abs(v) < 5e-6 ? 0 : v).toFixed(5)).join(',');

/** The outer loop(s) of a set of polygons (unit coords). A null loop = the tracer broke (a defect). */
function silhouetteOf(polys) {
  const verts = []; polys.forEach((p) => p.forEach((v) => verts.push(v)));
  const segs = [];
  polys.forEach((p) => {
    const o = polyArea(p) >= 0 ? 1 : -1;
    for (let i = 0; i < p.length; i++) {
      let a = p[i], b = p[(i + 1) % p.length];
      if (o < 0) [a, b] = [b, a];
      const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy);
      const ts = [0, 1];
      verts.forEach((v) => {
        const cr = Math.abs(ux * (v[1] - a[1]) - uy * (v[0] - a[0])) / L;
        if (cr < EPS) { const t = (ux * (v[0] - a[0]) + uy * (v[1] - a[1])) / (L * L); if (t > EPS && t < 1 - EPS) ts.push(t); }
      });
      ts.sort((x, y) => x - y);
      for (let k = 0; k + 1 < ts.length; k++) if (ts[k + 1] - ts[k] > EPS) segs.push([[a[0] + ux * ts[k], a[1] + uy * ts[k]], [a[0] + ux * ts[k + 1], a[1] + uy * ts[k + 1]]]);
    }
  });
  const used = new Array(segs.length).fill(false);
  const kept = [];
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    let twin = -1;
    for (let j = i + 1; j < segs.length; j++) if (!used[j] && key6(segs[j][0]) === key6(segs[i][1]) && key6(segs[j][1]) === key6(segs[i][0])) { twin = j; break; }
    if (twin >= 0) used[i] = used[twin] = true; else kept.push(segs[i]);
  }
  const loops = [];
  const left = kept.slice();
  while (left.length) {
    const loop = [left.shift()];
    let guard = 0;
    while (guard++ < 500) {
      const cur = loop[loop.length - 1];
      const end = key6(cur[1]);
      if (end === key6(loop[0][0])) break;
      const cands = left.map((s, i) => [s, i]).filter(([s]) => key6(s[0]) === end);
      if (!cands.length) { loop.push(null); break; }
      const din = [cur[1][0] - cur[0][0], cur[1][1] - cur[0][1]];
      const turn = ([s]) => Math.atan2(din[0] * (s[1][1] - s[0][1]) - din[1] * (s[1][0] - s[0][0]), din[0] * (s[1][0] - s[0][0]) + din[1] * (s[1][1] - s[0][1]));
      cands.sort((A, B) => turn(B) - turn(A));
      const [seg, idx] = cands[0];
      left.splice(idx, 1);
      loop.push(seg);
    }
    loops.push(loop);
  }
  const pts = (loop) => {
    if (loop.includes(null)) return null;
    const out = loop.map((s) => s[0]);
    const res = [];
    for (let i = 0; i < out.length; i++) {
      const p = out[(i - 1 + out.length) % out.length], c = out[i], n = out[(i + 1) % out.length];
      const cr = (c[0] - p[0]) * (n[1] - c[1]) - (c[1] - p[1]) * (n[0] - c[0]);
      if (Math.abs(cr) > EPS) res.push(c);
    }
    return res;
  };
  return loops.map(pts);
}
function silhouette(tiling) { return silhouetteOf(tiling.map(placeUnit)); }

/** Ear clipping of a simple polygon (any orientation) → triangles. */
function triangulate(loop) {
  const pts = loop.map((p) => [p[0], p[1]]);
  if (polyArea(pts) < 0) pts.reverse();
  const idx = pts.map((_, i) => i);
  const tris = [];
  const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const inside = (p, a, b, c) => cross(a, b, p) >= -EPS && cross(b, c, p) >= -EPS && cross(c, a, p) >= -EPS;
  let guard = 0;
  while (idx.length > 3 && guard++ < 1000) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const ia = idx[(i - 1 + idx.length) % idx.length], ib = idx[i], ic = idx[(i + 1) % idx.length];
      const a = pts[ia], b = pts[ib], c = pts[ic];
      if (cross(a, b, c) <= EPS) continue;   // reflex or degenerate
      let ear = true;
      for (const j of idx) {
        if (j === ia || j === ib || j === ic) continue;
        const p = pts[j];
        if (key6(p) === key6(a) || key6(p) === key6(b) || key6(p) === key6(c)) continue;
        if (inside(p, a, b, c)) { ear = false; break; }
      }
      if (!ear) continue;
      tris.push([a, b, c]);
      idx.splice(i, 1);
      clipped = true;
      break;
    }
    if (!clipped) throw new Error('tangram: triangulate found no ear (not a simple polygon)');
  }
  if (idx.length === 3) tris.push([pts[idx[0]], pts[idx[1]], pts[idx[2]]]);
  return tris;
}
/** The area of a CONVEX polygon lying inside a (possibly concave) simple loop (`tris` = a cached triangulate(loop)). */
function areaInside(poly, loop, tris) {
  let a = 0;
  for (const tri of tris || triangulate(loop)) a += clipArea(poly, tri);
  return a;
}
/** Point inside-or-on a simple loop (ray casting + on-edge test). */
function pointInLoop(p, loop) {
  const n = loop.length;
  for (let i = 0; i < n; i++) {
    const a = loop[i], b = loop[(i + 1) % n];
    const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy);
    const cr = Math.abs(ux * (p[1] - a[1]) - uy * (p[0] - a[0])) / L;
    if (cr < 1e-7) { const t = (ux * (p[0] - a[0]) + uy * (p[1] - a[1])) / (L * L); if (t >= -1e-7 && t <= 1 + 1e-7) return true; }
  }
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = loop[i][0], yi = loop[i][1], xj = loop[j][0], yj = loop[j][1];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/* ------------------------------------------------------------------ analysis (the loader's derivation) */
function transformPoint(name, p) { return TRANSFORMS[name](p); }
function normKey(pts) {
  const b = bboxOf([pts]);
  return pts.map((p) => key6([p[0] - b.x0, p[1] - b.y0])).sort().join('|');
}
function symmetryGroupOfLoop(loop) {
  if (!loop) return ['id'];
  const base = normKey(loop);
  return TRANSFORM_NAMES.filter((n) => normKey(loop.map((p) => transformPoint(n, p))) === base);
}
function outlineKindOf(loop) {
  if (!loop) return 'other';
  if (loop.length === 3) return 'triangle';
  if (loop.length === 4) {
    const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const sides = loop.map((p, i) => d(p, loop[(i + 1) % 4]));
    const diag = [d(loop[0], loop[2]), d(loop[1], loop[3])];
    if (sides.every((s) => Math.abs(s - sides[0]) < 1e-6) && Math.abs(diag[0] - diag[1]) < 1e-6) return 'square';
  }
  return 'other';
}
function countsOf(tiling) {
  const c = { tans: tiling.length, triangles: 0, squares: 0 };
  for (const t of tiling) { const k = TANS[clsOf(t.id)]; if (!k) continue; if (k.kind === 'triangle') c.triangles++; if (k.kind === 'square') c.squares++; }
  return c;
}
/** Everything the loader derives for one entry; `faults` are the gate's rules 1-6 (empty = valid). */
function analyze(tiling, opts = {}) {
  const faults = [];
  const ids = tiling.map((t) => t.id);
  if (new Set(ids).size !== ids.length) faults.push('duplicate tan id (' + ids.join(' ') + ')');
  for (const t of tiling) {
    if (!TAN_IDS.includes(t.id)) faults.push('unknown tan id ' + t.id);
    if (!Number.isFinite(t.x) || !Number.isFinite(t.y)) faults.push(t.id + ': non-numeric position');
    if ((t.rot || 0) % 45 !== 0) faults.push(t.id + ': rot ' + t.rot + ' is not a 45° step');
    if (t.flip && clsOf(t.id) !== 'P') faults.push(t.id + ': flip on a non-P tan');
  }
  if (opts.full && ids.slice().sort().join() !== TAN_IDS.slice().sort().join()) faults.push('not the 7 tans (' + ids.join(' ') + ')');
  const valid = tiling.filter((t) => TAN_IDS.includes(t.id));
  const polys = valid.map(placeUnit);
  const expected = valid.reduce((a, t) => a + TANS[clsOf(t.id)].area, 0);
  const area = polys.reduce((a, p) => a + Math.abs(polyArea(p)), 0);
  if (Math.abs(area - expected) > EPS) faults.push(`area ${area.toFixed(6)} != ${expected.toFixed(6)}`);
  let maxOverlap = 0;
  const adj = polys.map(() => new Set());
  for (let i = 0; i < polys.length; i++) for (let j = i + 1; j < polys.length; j++) {
    const ov = clipArea(polys[i], polys[j]);
    if (ov > maxOverlap) maxOverlap = ov;
    if (contactLength(polys[i], polys[j]) > 1e-6) { adj[i].add(j); adj[j].add(i); }
  }
  if (maxOverlap > EPS) faults.push(`overlap ${maxOverlap.toFixed(6)} unit²`);
  if (polys.length) {
    const seen = new Set([0]); const st = [0];
    while (st.length) { const v = st.pop(); adj[v].forEach((w) => { if (!seen.has(w)) { seen.add(w); st.push(w); } }); }
    if (seen.size !== polys.length) faults.push(`not edge-connected (${seen.size}/${polys.length})`);
  }
  const loops = polys.length ? silhouetteOf(polys) : [];
  const silArea = loops.reduce((a, l) => a + (l ? Math.abs(polyArea(l)) : 0), 0);
  if (loops.length !== 1 || !loops[0]) faults.push(`silhouette is ${loops.length} loop(s)` + (loops.some((l) => !l) ? ' (tracer broke)' : ''));
  else if (Math.abs(silArea - expected) > EPS) faults.push(`silhouette area ${silArea.toFixed(6)} != ${expected.toFixed(6)}`);
  const loop = loops.length === 1 ? loops[0] : null;
  const group = symmetryGroupOfLoop(loop);
  return {
    polys, bbox: polys.length ? bboxOf(polys) : null, area, expected, loops, silhouette: loop,
    symmetryGroup: group, chiral: !group.some((n) => MIRRORS.has(n)), outlineKind: outlineKindOf(loop),
    counts: countsOf(valid), faults,
  };
}

/** The placements under one of the 8 symmetries, rot/flip re-derived from the transformed polygons, re-bboxed to the origin. */
function transformTiling(tiling, t) {
  if (!TRANSFORMS[t]) throw new Error('tangram: unknown transform ' + t);
  const f = TRANSFORMS[t];
  const targets = tiling.map((p) => placeUnit(p).map(f));
  const b = bboxOf(targets);
  const out = tiling.map((p, i) => {
    const cls = clsOf(p.id);
    const target = targets[i].map(([x, y]) => [x - b.x0, y - b.y0]);
    const want = target.map(key6).sort().join('|');
    const flips = cls === 'P' ? [false, true] : [false];
    for (const flip of flips) for (let rot = 0; rot < 360; rot += 45) {
      const local = placeLocal(cls, 0, 0, rot, flip);
      for (let j = 0; j < target.length; j++) {
        const dx = target[j][0] - local[0][0], dy = target[j][1] - local[0][1];
        const moved = local.map(([x, y]) => [x + dx, y + dy]);
        if (moved.map(key6).sort().join('|') === want) return { id: p.id, x: snap(dx), y: snap(dy), rot, flip };
      }
    }
    throw new Error('tangram: transformTiling could not re-derive ' + p.id + ' under ' + t);
  });
  return out;
}
function snap(v) { return Math.abs(v) < 5e-7 ? 0 : v; }
function symmetryGroup(tiling) { return symmetryGroupOfLoop(silhouette(tiling)[0] || null); }

/* ------------------------------------------------------------------ the lattice tiler (concave-capable) */
/**
 * The number of tilings of `loop` (unit coords, simple, possibly concave) by
 * the listed classes (e.g. ['S','S','Q']) with every reference vertex on the
 * lattice (a + b√2)/8 inside the loop's bbox, 8 rotations, P flip; a placement
 * counts when the area of the tan inside the loop equals its area (1e-9);
 * solutions are counted as SETS of polygons (congruent tans swapped = one).
 */
function countTilings(loop, classes, opts = {}) {
  const b = bboxOf([loop]);
  const pad = opts.pad == null ? 1e-6 : opts.pad;
  const latticeIn = (lo, hi) => {
    const vals = [];
    for (let bb = -12; bb <= 12; bb++) {
      const aLo = Math.ceil((lo - pad) * 8 - bb * R2), aHi = Math.floor((hi + pad) * 8 - bb * R2);
      for (let a = aLo; a <= aHi; a++) vals.push((a + bb * R2) / 8);
    }
    return vals;
  };
  const xs = latticeIn(b.x0, b.x1), ys = latticeIn(b.y0, b.y1);
  const tris = triangulate(loop);
  // the reference vertex is a vertex of every tan, so it must lie inside or on the loop
  const anchors = [];
  for (const x of xs) for (const y of ys) if (pointInLoop([x, y], loop)) anchors.push([x, y]);
  const cand = {};
  for (const c of new Set(classes)) {
    const seen = new Set();
    cand[c] = [];
    for (const [x, y] of anchors) for (let rot = 0; rot < 360; rot += 45) for (const flip of (c === 'P' ? [false, true] : [false])) {
      const poly = placeLocal(c, x, y, rot, flip);
      const pb = bboxOf([poly]);
      if (pb.x0 < b.x0 - 1e-6 || pb.x1 > b.x1 + 1e-6 || pb.y0 < b.y0 - 1e-6 || pb.y1 > b.y1 + 1e-6) continue;
      if (poly.some((v) => !pointInLoop(v, loop))) continue;
      if (Math.abs(areaInside(poly, loop, tris) - TANS[c].area) > EPS) continue;
      const k = poly.map(key5).sort().join('|');
      if (seen.has(k)) continue;
      seen.add(k);
      cand[c].push({ poly, key: k });
    }
  }
  // exact-cover search with the extreme-point rule: the lowest-left point of the uncovered
  // region is an extreme point of whichever tan covers it, so that tan must carry it as a
  // VERTEX — index every candidate by its vertices and only try those. Each tiling is then
  // generated once (the order of placement is forced), and congruent tans swap into one.
  const byVertex = {};
  for (const c of Object.keys(cand)) { byVertex[c] = new Map(); cand[c].forEach((p, i) => { for (const v of p.poly) { const k = key5(v); if (!byVertex[c].has(k)) byVertex[c].set(k, []); byVertex[c].get(k).push(i); } }); }
  const remaining = {};
  for (const c of classes) remaining[c] = (remaining[c] || 0) + 1;
  const corners = loop.map((v) => [v[0], v[1]]);
  const R = 1e-4;
  const DIRS = [...Array(16)].map((_, i) => { const a = ((i + 0.5) * Math.PI) / 8; return [Math.cos(a), Math.sin(a)]; });
  const strictlyIn = (q, poly) => { const n = poly.length; const o = polyArea(poly) >= 0 ? 1 : -1; for (let i = 0; i < n; i++) { const a = poly[i], b = poly[(i + 1) % n]; if (o * ((b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0])) <= 1e-12) return false; } return true; };
  const uncoveredNear = (p, chosen) => DIRS.some((d) => { const q = [p[0] + R * d[0], p[1] + R * d[1]]; return pointInLoop(q, loop) && !chosen.some((c) => strictlyIn(q, c.poly)); });
  const sols = new Set();
  let guard = 0;
  const rec = (chosen, left) => {
    if (guard++ > 5e6) throw new Error('tangram: countTilings search exploded');
    if (left === 0) { sols.add(chosen.map((p) => p.key).sort().join('#')); return; }
    const pts = corners.concat(chosen.flatMap((c) => c.poly));
    pts.sort((a, b) => (Math.abs(a[1] - b[1]) > 1e-7 ? a[1] - b[1] : a[0] - b[0]));
    let star = null;
    for (const p of pts) if (uncoveredNear(p, chosen)) { star = p; break; }
    if (!star) return;   // nothing uncovered but tans remain (area mismatch) — no solution down this branch
    const k = key5(star);
    for (const c of Object.keys(remaining)) {
      if (!remaining[c]) continue;
      const list = byVertex[c].get(k) || [];
      remaining[c]--;
      for (const i of list) { const p = cand[c][i]; if (chosen.every((q) => clipArea(p.poly, q.poly) < EPS)) rec(chosen.concat(p), left - 1); }
      remaining[c]++;
    }
  };
  rec([], classes.length);
  return sols.size;
}

/* ------------------------------------------------------------------ rendering */
const fmt = (v) => (Math.round(v * 100) / 100).toString();
const ptsAttr = (pts) => pts.map((p) => fmt(p[0]) + ',' + fmt(p[1])).join(' ');
const pathD = (pts) => 'M' + pts.map((p) => fmt(p[0]) + ' ' + fmt(p[1])).join('L') + 'Z';

/** Pixel polygons of a tiling at scale S; origin = bbox min minus the stroke pad sp = stroke/2 + 1. */
function placeTans(tiling, S, opts = {}) {
  const stroke = opts.stroke == null ? tokens.stroke.primitive : opts.stroke;
  const sp = opts.pad == null ? stroke / 2 + 1 : opts.pad;
  const unit = tiling.map(placeUnit);
  const b = bboxOf(unit);
  const toPx = (p) => [(p[0] - b.x0) * S + sp, (p[1] - b.y0) * S + sp];
  const tans = tiling.map((t, i) => ({ id: t.id, cls: clsOf(t.id), pts: unit[i].map(toPx), area: TANS[clsOf(t.id)].area * S * S }));
  return { tans, w: b.w * S + 2 * sp, h: b.h * S + 2 * sp, sp, bbox: b, toPx };
}

const MODES = ['template', 'solution', 'outline', 'silhouette', 'hole'];

/**
 * One drawn figure. `figure` = the bank key (stamped), `tans` = its placements
 * (required), `mode` one of MODES, `missing` = the hole's tan id (hole mode),
 * `transform` = the lattice symmetry already applied by the caller (stamped
 * only when given), `data` = extra root attributes.
 */
function tangramFigure({ figure, tans, S, mode = 'solution', missing = null, stroke, pad, transform, data }) {
  if (!Array.isArray(tans) || !tans.length) throw new Error('tangram: tangramFigure needs placements');
  if (!MODES.includes(mode)) throw new Error('tangram: unknown mode ' + mode);
  if (!(S > 0)) throw new Error('tangram: bad scale ' + S);
  const sw = stroke == null ? tokens.stroke.primitive : stroke;
  const seamW = tokens.stroke.grid + 0.5;   // 2
  const P = placeTans(tans, S, { stroke: sw, pad });
  const unit = tans.map(placeUnit);
  const loops = silhouetteOf(unit);
  if (loops.length !== 1 || !loops[0]) throw new Error('tangram: ' + (figure || 'figure') + ' has no single silhouette loop');
  const loopPx = loops[0].map(P.toPx);
  const parts = [];
  const tanPoly = (t, fill, w, extra) => el('polygon', {
    points: ptsAttr(t.pts), fill, stroke: T.teal, 'stroke-width': w, 'stroke-linejoin': 'round',
    'data-lcs-tan': t.id, 'data-lcs-class': t.cls, ...(extra || {}),
  });
  if (mode === 'template') {
    for (const t of P.tans) parts.push(tanPoly(t, T.cream, sw));
  } else if (mode === 'solution') {
    for (const t of P.tans) parts.push(tanPoly(t, T.cream, seamW));
    parts.push(el('path', { d: pathD(loopPx), fill: 'none', stroke: T.teal, 'stroke-width': sw, 'stroke-linejoin': 'round', 'data-lcs-outline': '1' }));
  } else if (mode === 'outline') {
    parts.push(el('path', { d: pathD(loopPx), fill: T.white, stroke: T.teal, 'stroke-width': sw, 'stroke-linejoin': 'round', 'data-lcs-outline': '1' }));
  } else if (mode === 'silhouette') {
    parts.push(el('path', { d: pathD(loopPx), fill: T.teal, stroke: T.teal, 'stroke-width': sw, 'stroke-linejoin': 'round', 'data-lcs-silhouette': '1' }));
  } else if (mode === 'hole') {
    const hole = P.tans.find((t) => t.id === missing);
    if (!hole) throw new Error('tangram: hole mode needs `missing` = one of the placed tan ids (' + tans.map((t) => t.id).join(' ') + ')');
    for (const t of P.tans) if (t.id !== missing) parts.push(tanPoly(t, T.tealSoft, seamW));
    parts.push(el('path', { d: pathD(hole.pts), fill: 'none', stroke: T.coral, 'stroke-width': sw, 'stroke-dasharray': '8 6', 'stroke-linejoin': 'round', 'data-lcs-hole': hole.cls }));
  }
  const tanCount = mode === 'hole' ? tans.length - 1 : (mode === 'outline' || mode === 'silhouette' ? 0 : tans.length);
  const attrs = {
    'data-ws-content': '', 'data-lcs-prim': 'tangram', 'data-lcs-figure': figure || '', 'data-lcs-mode': mode,
    'data-lcs-scale': S, 'data-lcs-tans': tanCount, style: 'display:block;flex:0 0 auto',
  };
  if (mode === 'hole') attrs['data-lcs-missing'] = clsOf(missing);
  if (transform) attrs['data-lcs-transform'] = transform;
  Object.assign(attrs, data || {});
  const w = Math.ceil(P.w), ht = Math.ceil(P.h);
  return { html: svgRoot({ width: w, height: ht, viewBox: `0 0 ${w} ${ht}`, label: 'tangram' }, parts.join(''), attrs), width: w, height: ht, tans: P.tans, loop: loopPx };
}

/** The true-size polygon of one class in the canonical pose at scale S (px, bbox at the origin). */
function canonicalPose(cls, S, opts = {}) {
  if (!TANS[cls]) throw new Error('tangram: unknown class ' + cls);
  const flip = !!opts.flip;
  if (flip && cls !== 'P') throw new Error('tangram: flip is legal on P only');
  let pts;
  if (cls === 'L') pts = [[0, 0.5], [1, 0.5], [0.5, 0]];
  else if (cls === 'M') { const d = 0.5 * R2; pts = [[0, d / 2], [d, d / 2], [d / 2, 0]]; }
  else if (cls === 'S') pts = [[0, 0.25], [0.5, 0.25], [0.25, 0]];
  else if (cls === 'Q') pts = [[0, 0], [h, 0], [h, h], [0, h]];
  else pts = flip ? [[0, 0], [0.5, 0], [0.75, 0.25], [0.25, 0.25]] : [[0.25, 0], [0.75, 0], [0.5, 0.25], [0, 0.25]];
  return pts.map(([x, y]) => [x * S, y * S]);
}
function poseSvg(cls, S, opts, stampName) {
  const sw = 2;
  const sp = sw / 2 + 1;
  const pts = canonicalPose(cls, S, opts).map(([x, y]) => [x + sp, y + sp]);
  const b = bboxOf([pts]);
  const w = Math.ceil(b.x1 + sp), ht = Math.ceil(b.y1 + sp);
  const attrs = { 'data-lcs-prim': 'tangram-' + (stampName === 'data-lcs-chip' ? 'chip' : 'glyph'), [stampName]: cls, 'data-lcs-scale': S, style: 'display:block;flex:0 0 auto' };
  if (opts && opts.flip) attrs['data-lcs-flip'] = '1';
  Object.assign(attrs, (opts && opts.data) || {});
  return { html: svgRoot({ width: w, height: ht, viewBox: `0 0 ${w} ${ht}`, label: 'tangram piece' }, el('polygon', { points: ptsAttr(pts), fill: T.cream, stroke: T.teal, 'stroke-width': sw, 'stroke-linejoin': 'round', 'data-lcs-pose': cls }), attrs), width: w, height: ht };
}
function tanGlyph(cls, Sg = 64, opts) { return poseSvg(cls, Sg, opts || {}, 'data-lcs-glyph'); }
function tanChip(cls, S, opts) { return poseSvg(cls, S, opts || {}, 'data-lcs-chip'); }

/** The wordless colour legend: rows of [swatch 20 r5][8][glyph]; `rows` = classes in reading order. */
function tanLegend({ rows = CLASSES, Sg = 64, rowH, gap = 6 } = {}) {
  const items = rows.map((cls) => {
    const c = LEGEND_COLORS[cls];
    if (!c) throw new Error('tangram: no legend colour for class ' + cls);
    const swatch = svgRoot({ width: 22, height: 22, label: 'colour' }, el('rect', { x: 1, y: 1, width: 20, height: 20, rx: 5, ry: 5, fill: CODE[c], stroke: T.ink, 'stroke-width': 1, 'data-lcs-swatch': c }), { 'data-lcs-legend-swatch': cls, style: 'display:block;flex:0 0 auto' });
    const g = tanGlyph(cls, Sg);
    return `<div data-lcs-legend="${esc(cls)}" style="display:flex;align-items:center;gap:8px;height:${rowH || Math.max(36, Math.ceil(Sg / 2) + 4)}px">${swatch}${g.html}</div>`;
  });
  return `<div data-lcs-tan-legend aria-hidden="true" style="display:flex;flex-direction:column;justify-content:center;gap:${gap}px;flex:0 0 auto">${items.join('')}</div>`;
}

module.exports = {
  TANS, TAN_IDS, CLASSES, LEGEND_COLORS, TRANSFORMS, TRANSFORM_NAMES, MIRRORS, MODES, h, clsOf,
  placeUnit, placeLocal, polyArea, clipArea, contactLength, bboxOf, silhouette, silhouetteOf, triangulate, areaInside, pointInLoop,
  analyze, transformTiling, symmetryGroup, countTilings,
  placeTans, tangramFigure, canonicalPose, tanGlyph, tanChip, tanLegend,
};
