#!/usr/bin/env node
/**
 * verify-flat-shape.js — the gate of primitives/flat-shape.js (K-368 `2d-shapes`,
 * design docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §2; the design names it
 * qa/verify-b5-flat-shape.js — the commission named this file, see the build record).
 *
 *   node scripts/worksheet-gen/qa/verify-flat-shape.js [--no-render] [--table]
 *
 * NODE PASS — every kind × sub × variant × 8 rotations × R {32, 44, 69} (near-
 * misses from R 44, the primitive refuses below). Each figure is RE-PARSED from
 * the emitted markup (the <path d>, <circle>, <ellipse>), never from meta:
 *   - side count; side ratios (±1 %) and the unit's angles (±1°) against the
 *     design's unit table (an INDEPENDENT copy below — the gate never imports
 *     the primitive's table); right angles ±1° where the kind has them;
 *   - rectangle aspect >= 1.5 (long / short from the drawn sides);
 *   - minimum caliper width + maximum extent (the page floors): at every R >=
 *     minR(kind) the drawn figure has min caliper >= 30 and extent >= 72;
 *   - gap: the path is OPEN and the visible gap (endpoint distance − stroke,
 *     the round caps) >= 10 px; circle gap likewise;
 *   - curved: the Bézier's sagitta >= 15 % of its chord;
 *   - round: one fillet arc per corner, radius >= 20 % of the shortest side;
 *   - ellipse aspect >= 1.4; chord sagitta (the missing cap) >= 0.2 R;
 *   - the stroked bbox fits inside box − 1 at EVERY rotation, the box is
 *     rotation-invariant, the lens (when drawn) is the first element and
 *     white, tokens only, no <text>, no fill on the figure.
 * THROWS — rectangle aspect 1.2, a near-miss at R 43, round on the skinny
 * triangle, an unknown kind / variant.
 * POISON — each must FAIL for its own reason, the untouched primitive is the
 * control: a `gap` at 0.10 · a `curved` at 0.05 · a `rectangle` at aspect 1.2 ·
 * a `round` at 0.10 · A's old obtuse (2.9,1) at R 69 under the 30 px floor.
 * RENDER PASS (default; --no-render skips) — the same figures drawn in
 * Chromium: every figure's getBBox() (grown by half the stroke) must agree
 * with the node bbox within 1 px and sit inside its box; then two contact
 * sheets (colour + greyscale) at the smallest and largest page sizes the
 * design uses (lens d 78 / R 33 and lens d 188 / R 82) for a human to READ:
 * out/dev/K-368-flat-shape-sheet-{colour,grey}.png.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const tokens = require('../primitives/_tokens.js');
const FS = require('../primitives/flat-shape.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const ROTS = [0, 17, 45, 60, 90, 133, 210, 300];
const RS = [32, 44, 69];
const SW = 3;
const FLOOR_W = 30, FLOOR_E = 72;

/* The design's unit table, copied INDEPENDENTLY of the primitive (a change to one without the other fails). */
const S3 = Math.sqrt(3);
const DESIGN_UNITS = {
  square: [[-1, -1], [1, -1], [1, 1], [-1, 1]],
  'triangle/equilateral': [[0, -1], [S3 / 2, 0.5], [-S3 / 2, 0.5]],
  'triangle/right': [[0, 0], [0, 1.4], [2, 1.4]],
  'triangle/obtuse': [[0, 0], [2, 0], [2.7, 1.4]],
  'triangle/scalene': [[0, 0], [2, 0], [0.6, 1.3]],
  'triangle/skinny': [[0, 0], [2.6, 0], [0.45, 0.75]],
  hexagon: [0, 1, 2, 3, 4, 5].map((k) => [Math.cos(k * Math.PI / 3), Math.sin(k * Math.PI / 3)]),
  rhombus: [[0, 0], [2, 0], [3, S3], [1, S3]],
  parallelogram: [[0, 0], [2.4, 0], [3.084, 1.879], [0.684, 1.879]],
  trapezoid: [[0, 0], [3, 0], [2.3, 1.3], [0.7, 1.3]],
  kite: [[0, -1.2], [0.8, 0], [0, 1.6], [-0.8, 0]],
};
const rectUnit = (a) => [[-a, -1], [a, -1], [a, 1], [-a, 1]];

let assertions = 0;
let fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ------------------------------------------------------------ parsing the emitted markup */
function attr(tag, name) { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag); return m ? m[1] : null; }
function parseSvg(svg) {
  const root = /^<svg[^>]*>/.exec(svg)[0];
  const els = [...svg.matchAll(/<(path|circle|ellipse|text|rect|line|polygon)\b[^>]*\/?>/g)].map((m) => ({ tag: m[1], src: m[0] }));
  const fig = els.find((e) => (attr(e.src, 'stroke') || '').toUpperCase() === tokens.color.teal.toUpperCase());
  const lens = els.find((e) => attr(e.src, 'data-lcs-lens'));
  return { root, w: +attr(root, 'width'), h: +attr(root, 'height'), els, fig, lens,
    verts: (attr(root, 'data-lcs-verts') || '').split(';').filter(Boolean).map((p) => p.split(',').map(Number)) };
}
/** Path → {segs:[{cmd, from, to, ctl?, rx?, ry?, large?, sweep?}], closed, start} (absolute M/L/Q/A/Z as flat-shape emits). */
function parsePath(d) {
  const toks = d.match(/[MLQAZ]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const segs = [];
  let i = 0, cmd = null, cur = null, start = null, closed = false;
  const num = () => +toks[i++];
  while (i < toks.length) {
    if (/[MLQAZ]/.test(toks[i])) { cmd = toks[i++]; if (cmd === 'Z') { closed = true; if (cur && start && Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 1e-6) segs.push({ cmd: 'L', from: cur, to: start }); cur = start; continue; } }
    if (cmd === 'M') { cur = [num(), num()]; start = cur; }
    else if (cmd === 'L') { const to = [num(), num()]; segs.push({ cmd: 'L', from: cur, to }); cur = to; }
    else if (cmd === 'Q') { const ctl = [num(), num()], to = [num(), num()]; segs.push({ cmd: 'Q', from: cur, ctl, to }); cur = to; }
    else if (cmd === 'A') { const rx = num(), ry = num(); num(); const large = num(), sweep = num(); const to = [num(), num()]; segs.push({ cmd: 'A', from: cur, to, rx, ry, large, sweep }); cur = to; }
    else i++;
  }
  return { segs, closed, start };
}
/** Sampled points along a segment (arcs by the SVG F.6.5 endpoint-to-centre conversion). */
function segPoints(s, n) {
  const out = [];
  if (s.cmd === 'L') { out.push(s.from, s.to); return out; }
  if (s.cmd === 'Q') { for (let k = 0; k <= n; k++) { const u = k / n; out.push([(1 - u) ** 2 * s.from[0] + 2 * (1 - u) * u * s.ctl[0] + u * u * s.to[0], (1 - u) ** 2 * s.from[1] + 2 * (1 - u) * u * s.ctl[1] + u * u * s.to[1]]); } return out; }
  const [x1, y1] = s.from, [x2, y2] = s.to;
  let rx = Math.abs(s.rx), ry = Math.abs(s.ry);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const lam = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
  if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
  const num2 = rx * rx * ry * ry - rx * rx * dy * dy - ry * ry * dx * dx, den = rx * rx * dy * dy + ry * ry * dx * dx;
  let coef = Math.sqrt(Math.max(0, num2 / den)); if (s.large === s.sweep) coef = -coef;
  const cxp = coef * rx * dy / ry, cyp = -coef * ry * dx / rx;
  const cx = cxp + (x1 + x2) / 2, cy = cyp + (y1 + y2) / 2;
  const ang = (ux, uy, vx, vy) => { const sg = Math.sign(ux * vy - uy * vx) || 1; return sg * Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy))))); };
  const th1 = ang(1, 0, (dx - cxp) / rx, (dy - cyp) / ry);
  let dth = ang((dx - cxp) / rx, (dy - cyp) / ry, (-dx - cxp) / rx, (-dy - cyp) / ry);
  if (!s.sweep && dth > 0) dth -= 2 * Math.PI; else if (s.sweep && dth < 0) dth += 2 * Math.PI;
  for (let k = 0; k <= n; k++) { const th = th1 + dth * k / n; out.push([cx + rx * Math.cos(th), cy + ry * Math.sin(th)]); }
  return out;
}
/** Every drawn point of the figure element (for bbox / caliper). */
function figurePoints(fig) {
  if (fig.tag === 'circle') { const cx = +attr(fig.src, 'cx'), cy = +attr(fig.src, 'cy'), r = +attr(fig.src, 'r'); return Array.from({ length: 360 }, (_, k) => [cx + r * Math.cos(k * Math.PI / 180), cy + r * Math.sin(k * Math.PI / 180)]); }
  if (fig.tag === 'ellipse') {
    const cx = +attr(fig.src, 'cx'), cy = +attr(fig.src, 'cy'), rx = +attr(fig.src, 'rx'), ry = +attr(fig.src, 'ry');
    const m = /rotate\(([-\d.]+)/.exec(attr(fig.src, 'transform') || ''); const t = (m ? +m[1] : 0) * Math.PI / 180;
    return Array.from({ length: 360 }, (_, k) => { const a = k * Math.PI / 180, x = rx * Math.cos(a), y = ry * Math.sin(a); return [cx + x * Math.cos(t) - y * Math.sin(t), cy + x * Math.sin(t) + y * Math.cos(t)]; });
  }
  const p = parsePath(attr(fig.src, 'd'));
  return p.segs.flatMap((s) => segPoints(s, 48));
}
function bboxOf(pts) { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) }; }
function hull(pts) {
  const P = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const p of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (const p of P.reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
function caliper(pts) {
  const H = hull(pts);
  let minW = Infinity, maxE = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i], b = H[(i + 1) % H.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (L < 1e-9) continue;
    let w = 0; for (const p of H) w = Math.max(w, Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / L);
    minW = Math.min(minW, w);
  }
  for (let i = 0; i < H.length; i++) for (let j = i + 1; j < H.length; j++) maxE = Math.max(maxE, Math.hypot(H[i][0] - H[j][0], H[i][1] - H[j][1]));
  return { minWidth: minW, maxExtent: maxE };
}
const angleAt = (p, v, q) => { const a = [p[0] - v[0], p[1] - v[1]], b = [q[0] - v[0], q[1] - v[1]]; return Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180 / Math.PI; };
function sidesAndAngles(P) {
  const n = P.length;
  return { sides: P.map((p, i) => Math.hypot(P[(i + 1) % n][0] - p[0], P[(i + 1) % n][1] - p[1])), angles: P.map((v, i) => angleAt(P[(i - 1 + n) % n], v, P[(i + 1) % n])) };
}
/** Compare a drawn polygon with a unit polygon up to similarity (any start vertex, either direction — a mirror is a reversal): side RATIOS ±1 %, angles ±1°. */
function similar(drawn, unit) {
  const a = sidesAndAngles(drawn);
  const n = a.sides.length;
  if (unit.length !== n) return false;
  const sa = a.sides.map((x) => x / a.sides[0]);
  for (const U of [unit, unit.slice().reverse()]) {
    const b = sidesAndAngles(U);
    for (let off = 0; off < n; off++) {
      const bs = Array.from({ length: n }, (_, i) => b.sides[(i + off) % n]);
      const ba = Array.from({ length: n }, (_, i) => b.angles[(i + off) % n]);
      if (bs.every((x, i) => Math.abs(x / bs[0] - sa[i]) <= 0.01 * (x / bs[0]) + 1e-6) && ba.every((x, i) => Math.abs(x - a.angles[i]) <= 1)) return true;
    }
  }
  return false;
}

/* ------------------------------------------------------------ one figure */
function checkFigure(args, tag) {
  let r;
  try { r = FS.flatShape(args); } catch (e) { ok(false, `${tag}: threw "${e.message}"`); return null; }
  const s = parseSvg(r.svg);
  const box = 2 * (args.R + (args.pad == null ? 3 : args.pad) + (args.lens || 0));
  ok(Math.abs(s.w - box) < 0.02 && Math.abs(s.h - box) < 0.02, `${tag}: svg ${s.w}×${s.h} ≠ box ${box} (the box must not depend on rot)`);
  ok(!!s.fig, `${tag}: no teal-stroked figure element`);
  if (!s.fig) return null;
  ok(!s.els.some((e) => e.tag === 'text') && !/<text/.test(r.svg), `${tag}: text inside the shape svg`);
  ok((attr(s.fig.src, 'fill') || '') === 'none', `${tag}: the figure carries fill "${attr(s.fig.src, 'fill')}"`);
  ok(+attr(s.fig.src, 'stroke-width') === SW, `${tag}: stroke-width ${attr(s.fig.src, 'stroke-width')} ≠ ${SW}`);
  for (const m of r.svg.matchAll(/(fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[2].toUpperCase()), `${tag}: off-palette ${m[1]} ${m[2]}`);
  if (args.lens) ok(!!s.lens && s.els.indexOf(s.lens) === 0 && (attr(s.lens.src, 'fill') || '').toUpperCase() === tokens.color.white.toUpperCase() && Math.abs(+attr(s.lens.src, 'r') - box / 2) < 0.02, `${tag}: the lens is not the first element / white / r = box/2`);
  const pts = figurePoints(s.fig);
  const bb = bboxOf(pts);
  const h = SW / 2;
  ok(bb.x0 - h >= 1 - 1e-6 && bb.y0 - h >= 1 - 1e-6 && bb.x1 + h <= box - 1 + 1e-6 && bb.y1 + h <= box - 1 + 1e-6, `${tag}: stroked bbox [${bb.x0.toFixed(1)},${bb.y0.toFixed(1)} → ${bb.x1.toFixed(1)},${bb.y1.toFixed(1)}] ± ${h} leaves box − 1 (${box})`);
  const cal = caliper(pts);
  const kind = args.kind, variant = args.variant || 'none';
  const polygonal = !['circle', 'ellipse', 'chord'].includes(kind);
  const unitKey = kind === 'triangle' ? 'triangle/' + args.sub : kind;
  if (polygonal && variant === 'none') {
    const p = parsePath(attr(s.fig.src, 'd'));
    const P = p.segs.map((x) => x.from);
    ok(p.closed && p.segs.every((x) => x.cmd === 'L'), `${tag}: a plain polygon that is not closed straight sides`);
    const unit = kind === 'rectangle' ? rectUnit(args.aspect) : (args._unit || DESIGN_UNITS[unitKey]);
    ok(P.length === unit.length, `${tag}: ${P.length} sides drawn ≠ ${unit.length}`);
    ok(similar(P, unit), `${tag}: the drawn ${unitKey} is not similar to the design's unit (side ratios ±1 %, angles ±1°)`);
    const sa = sidesAndAngles(P);
    if (kind === 'square' || kind === 'rectangle') ok(sa.angles.every((a) => Math.abs(a - 90) <= 1), `${tag}: a corner is not right (${sa.angles.map((a) => a.toFixed(1)).join('/')})`);
    if (kind === 'square') ok(Math.max(...sa.sides) / Math.min(...sa.sides) <= 1.01, `${tag}: square sides not equal`);
    if (kind === 'rectangle') ok(Math.max(...sa.sides) / Math.min(...sa.sides) >= 1.5 - 1e-3, `${tag}: rectangle aspect ${(Math.max(...sa.sides) / Math.min(...sa.sides)).toFixed(2)} < 1.5`);
    if (unitKey === 'triangle/right') ok(sa.angles.some((a) => Math.abs(a - 90) <= 1), `${tag}: the right triangle has no right angle`);
    // the stamp is the drawn polygon
    ok(s.verts.length === P.length && s.verts.every((v, i) => Math.hypot(v[0] - P[i][0], v[1] - P[i][1]) < 0.02), `${tag}: data-lcs-verts ≠ the drawn polygon`);
  }
  if (variant === 'gap') {
    const p = parsePath(attr(s.fig.src, 'd'));
    ok(!p.closed, `${tag}: a gap variant is a CLOSED path`);
    const first = p.segs[0].from, last = p.segs[p.segs.length - 1].to;
    const vis = Math.hypot(first[0] - last[0], first[1] - last[1]) - SW;
    ok(vis >= 10, `${tag}: visible gap ${vis.toFixed(1)} px < 10 (after round caps)`);
  }
  if (variant === 'curved') {
    const q = parsePath(attr(s.fig.src, 'd')).segs.filter((x) => x.cmd === 'Q');
    ok(q.length === 1, `${tag}: ${q.length} curved sides ≠ 1`);
    if (q.length) {
      const c = q[0], L = Math.hypot(c.to[0] - c.from[0], c.to[1] - c.from[1]);
      const mid = [(c.from[0] + c.to[0]) / 2, (c.from[1] + c.to[1]) / 2], b = [0.25 * c.from[0] + 0.5 * c.ctl[0] + 0.25 * c.to[0], 0.25 * c.from[1] + 0.5 * c.ctl[1] + 0.25 * c.to[1]];
      const sag = Math.hypot(b[0] - mid[0], b[1] - mid[1]);
      ok(sag >= 0.15 * L, `${tag}: sagitta ${sag.toFixed(1)} px < 15 % of the ${L.toFixed(1)} px side`);
      // it bulges OUTWARD (away from the polygon centroid)
      const c0 = s.verts.reduce((a, v) => [a[0] + v[0] / s.verts.length, a[1] + v[1] / s.verts.length], [0, 0]);
      ok(Math.hypot(b[0] - c0[0], b[1] - c0[1]) > Math.hypot(mid[0] - c0[0], mid[1] - c0[1]), `${tag}: the curved side bulges inward`);
    }
  }
  if (variant === 'round') {
    const segs = parsePath(attr(s.fig.src, 'd')).segs, arcs = segs.filter((x) => x.cmd === 'A');
    ok(arcs.length === s.verts.length, `${tag}: ${arcs.length} fillets ≠ ${s.verts.length} corners`);
    const shortest = Math.min(...sidesAndAngles(s.verts).sides);
    ok(arcs.every((a) => a.rx >= 0.2 * shortest - 1e-6), `${tag}: a fillet radius ${arcs.map((a) => a.rx).join('/')} < 20 % of the shortest side ${shortest.toFixed(1)}`);
  }
  if (kind === 'ellipse') { const rx = +attr(s.fig.src, 'rx'), ry = +attr(s.fig.src, 'ry'); ok(rx / ry >= 1.4 - 1e-3, `${tag}: ellipse aspect ${(rx / ry).toFixed(2)} < 1.4`); }
  if (kind === 'chord') {
    const seg = parsePath(attr(s.fig.src, 'd')).segs.find((x) => x.cmd === 'A');
    const c = Math.hypot(seg.to[0] - seg.from[0], seg.to[1] - seg.from[1]);
    const sag = seg.rx - Math.sqrt(Math.max(0, seg.rx * seg.rx - c * c / 4));
    ok(sag >= 0.2 * args.R, `${tag}: the chord cuts a ${sag.toFixed(1)} px cap < 0.2 R`);
    ok(seg.large === 1, `${tag}: the chord keeps the SMALL arc (large-arc 0)`);
    // the kept part is the big one: the drawn extent ≈ 2 × arc radius
    ok(cal.maxExtent >= 1.9 * seg.rx - 1, `${tag}: the chord segment is the small cap (extent ${cal.maxExtent.toFixed(1)} vs r ${seg.rx})`);
  }
  // the page floors: at R >= minR the drawn figure meets 30 / 72
  const need = FS.minR(kind, args.sub, args.aspect || 1, args._unit ? { _unit: args._unit } : undefined);
  if (args.R >= need - 1e-6 && variant === 'none') ok(cal.minWidth >= FLOOR_W - 0.3 && cal.maxExtent >= FLOOR_E - 0.3, `${tag}: min caliper ${cal.minWidth.toFixed(1)} / extent ${cal.maxExtent.toFixed(1)} below ${FLOOR_W} / ${FLOOR_E} at R ${args.R} >= minR ${need.toFixed(1)}`);
  return { r, s, cal, bb, box };
}

/** A gap / curve goes on a LONG side (the F1 composer's rule): the unit polygon's longest side, cycled by rot among the equal-longest. */
function longSide(t, rot) {
  if (t.kind === 'circle') return 0;
  const U = FS.unitPolygon(t.kind, t.sub, t.aspect || 1, false);
  const L = U.map((p, i) => Math.hypot(U[(i + 1) % U.length][0] - p[0], U[(i + 1) % U.length][1] - p[1]));
  const m = Math.max(...L);
  const longest = L.map((x, i) => (x >= m * 0.999 ? i : -1)).filter((i) => i >= 0);
  return longest[(rot / 17 | 0) % longest.length];
}
function longLen(t) { const U = FS.unitPolygon(t.kind, t.sub, t.aspect || 1, false); return Math.max(...U.map((p, i) => Math.hypot(U[(i + 1) % U.length][0] - p[0], U[(i + 1) % U.length][1] - p[1]))); }
function* cases() {
  const tri = FS.TRIANGLE_SUBS;
  const trues = [
    { kind: 'square' }, { kind: 'circle' }, { kind: 'hexagon' },
    { kind: 'rectangle', aspect: 1.5 }, { kind: 'rectangle', aspect: 2.2 }, { kind: 'rectangle', aspect: 3.0 },
    ...tri.map((sub) => ({ kind: 'triangle', sub })),
  ];
  for (const t of trues) for (const variant of ['none', 'gap', 'curved', 'round']) {
    if (t.kind === 'circle' && (variant === 'curved' || variant === 'round')) continue;
    if (variant === 'round' && t.kind === 'triangle' && t.sub !== 'equilateral') continue;   // the trim rule refuses them (asserted below)
    for (const R of RS) for (const rot of ROTS) for (const flip of [false, true]) {
      if (flip && rot % 90 !== 17) continue;
      if (variant !== 'none' && R < 44) continue;   // a variant is a near-miss: never below R 44 (the primitive refuses; asserted below)
      if (variant === 'gap' && t.kind !== 'circle' && longLen(t) * R * 0.30 - SW < 11) continue;   // too short a side for a legible gap: the primitive refuses (asserted below)   // mirrors at one rotation keep the sweep affordable
      yield { ...t, variant, vside: variant === 'none' ? 0 : longSide(t, rot), R, rot, flip };
    }
  }
  const nms = [{ kind: 'rhombus' }, { kind: 'parallelogram' }, { kind: 'trapezoid' }, { kind: 'kite' }, { kind: 'ellipse', aspect: 1.4 }, { kind: 'ellipse', aspect: 1.8 }, { kind: 'chord' }];
  for (const t of nms) for (const R of [44, 69]) for (const rot of ROTS) for (const flip of [false, true]) {
    if (flip && rot !== 17) continue;
    yield { ...t, R, rot, flip };
  }
}

function nodePass() {
  let n = 0;
  const table = {};
  for (const c of cases()) {
    const tag = `${c.kind}${c.sub ? '/' + c.sub : ''}${c.aspect && c.aspect !== 1 ? '@' + c.aspect : ''} ${c.variant || 'none'} R${c.R} rot${c.rot}${c.flip ? ' flip' : ''}`;
    const out = checkFigure(c, tag);
    n++;
    if (out && (c.variant || 'none') === 'none' && c.rot === 0 && !c.flip) table[`${c.kind}${c.sub ? '/' + c.sub : ''}${c.aspect && c.aspect !== 1 ? '@' + c.aspect : ''} R${c.R}`] = `minW ${out.cal.minWidth.toFixed(1)} ext ${out.cal.maxExtent.toFixed(1)}`;
  }
  // lens boxes: R + pad + lens is the half-box at every rotation
  for (const rot of ROTS) checkFigure({ kind: 'triangle', sub: 'skinny', R: 60, rot, lens: 78 - 60 - 3 }, `lens skinny R60 rot${rot}`);
  // the design's per-kind minima (§2, m)
  const MIN = { square: 36, circle: 36, 'triangle/equilateral': 47.6, 'triangle/right': 36, 'triangle/skinny': 54.1, 'rectangle@2.2': 36.2, 'rectangle@2.6': 41.8 };
  for (const [k, want] of Object.entries(MIN)) {
    const [kk, a] = k.split('@'); const [kind, sub] = kk.split('/');
    const got = FS.minR(kind, sub, a ? +a : 1);
    ok(Math.abs(got - want) <= 0.15, `minR ${k}: ${got.toFixed(2)} ≠ the design's ${want}`);
  }
  ok(Math.abs(FS.minR('triangle', 'obtuse') - 49.4) <= 0.3, `minR obtuse ${FS.minR('triangle', 'obtuse').toFixed(2)} ≠ ~49.4`);
  // throws
  const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(!!m && re.test(m), `${what}: ${m ? 'threw "' + m + '"' : 'did not throw'}`); };
  throws(() => FS.flatShape({ kind: 'rectangle', aspect: 1.2, R: 50 }), /aspect 1\.2 < 1\.5/, 'rectangle aspect 1.2');
  throws(() => FS.flatShape({ kind: 'rhombus', R: 43 }), /near-miss rhombus at R 43/, 'rhombus at R 43');
  throws(() => FS.flatShape({ kind: 'triangle', sub: 'skinny', variant: 'round', R: 60 }), /cannot be rounded/, 'round skinny triangle');
  throws(() => FS.flatShape({ kind: 'pentagon', R: 50 }), /unknown kind/, 'unknown kind');
  throws(() => FS.flatShape({ kind: 'hexagon', variant: 'gap', vside: 0, R: 32 }), /never drawn at R 32 < 44/, 'gap variant at R 32');
  throws(() => FS.flatShape({ kind: 'rectangle', aspect: 3, variant: 'gap', vside: 1, R: 44 }), /too short for a gap/, 'gap on the 27.8 px short side of a 3:1 rectangle at R 44');
  throws(() => FS.flatShape({ kind: 'hexagon', variant: 'gap', vside: 0, R: 44 }), /too short for a gap \(visible 10\.2 px/, 'gap on a 44 px hexagon side');
  throws(() => FS.flatShape({ kind: 'square', variant: 'wavy', R: 50 }), /unknown variant/, 'unknown variant');
  return { n, table };
}

/* ------------------------------------------------------------ poisons */
function poisons() {
  const log = [];
  let killed = 0;
  const TOTAL = 5;
  const own = (fn) => { const saved = fails, savedA = assertions; fails = []; try { fn(); } finally { /* noop */ } const out = fails; fails = saved; assertions = savedA; return out; };
  const judge = (name, findings, re, control) => {
    const hit = findings.some((x) => re.test(x));
    const ctlClean = control.length === 0;
    log.push(`  ${name}: ${hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT'}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 2))}; control ${ctlClean ? 'clean' : JSON.stringify(control.slice(0, 2))}`);
    if (hit && ctlClean) killed++;
  };
  const K = FS.KNOBS;
  const withKnobs = (patch, fn) => { const saved = { ...K }; Object.assign(K, patch); try { return fn(); } finally { Object.assign(K, saved); } };
  // P-gap: a gap at 0.10 of a square side at R 44 (visible 0.10 × 62.2 − 3 = 3.2 px)
  judge('gap 0.10', withKnobs({ gapPx: 0, gapMin: 0.10, gapMax: 0.10, _allowShortGap: true }, () => own(() => checkFigure({ kind: 'square', variant: 'gap', vside: 1, R: 44, rot: 30 }, 'P gap'))), /visible gap [\d.]+ px < 10/,
    own(() => checkFigure({ kind: 'square', variant: 'gap', vside: 1, R: 44, rot: 30 }, 'P gap control')));
  judge('curved 0.05', withKnobs({ curveK: 0.05 }, () => own(() => checkFigure({ kind: 'rectangle', aspect: 2, variant: 'curved', vside: 0, R: 60, rot: 20 }, 'P curved'))), /sagitta [\d.]+ px < 15 %/,
    own(() => checkFigure({ kind: 'rectangle', aspect: 2, variant: 'curved', vside: 0, R: 60, rot: 20 }, 'P curved control')));
  judge('rectangle aspect 1.2', withKnobs({ rectMin: 1.0 }, () => own(() => checkFigure({ kind: 'rectangle', aspect: 1.2, R: 60, rot: 10 }, 'P rect 1.2'))), /rectangle aspect 1\.20 < 1\.5/,
    own(() => checkFigure({ kind: 'rectangle', aspect: 1.5, R: 60, rot: 10 }, 'P rect control')));
  judge('round 0.10', withKnobs({ roundK: 0.10 }, () => own(() => checkFigure({ kind: 'square', variant: 'round', R: 60, rot: 12 }, 'P round'))), /fillet radius .* < 20 %/,
    own(() => checkFigure({ kind: 'square', variant: 'round', R: 60, rot: 12 }, 'P round control')));
  // A's old obtuse (2.9,1) at R 69: min caliper 0.425 R = 29.3 < 30 (the page floor at the lens maximum)
  {
    const oldU = [[0, 0], [2, 0], [2.9, 1]];
    const f = own(() => { const out = checkFigure({ kind: 'triangle', sub: 'obtuse', _unit: oldU, R: 69, rot: 0 }, 'P old obtuse'); if (out) ok(out.cal.minWidth >= FLOOR_W, `P old obtuse: min caliper ${out.cal.minWidth.toFixed(1)} < ${FLOOR_W} at R 69 (the lens maximum)`); });
    const c = own(() => { const out = checkFigure({ kind: 'triangle', sub: 'obtuse', R: 69, rot: 0 }, 'P obtuse control'); if (out) ok(out.cal.minWidth >= FLOOR_W, `control obtuse: min caliper ${out.cal.minWidth.toFixed(1)} < ${FLOOR_W}`); });
    judge('old obtuse (2.9,1) R 69', f, /min caliper 29\.\d < 30/, c);
  }
  return { log, killed, TOTAL };
}

/* ------------------------------------------------------------ render pass */
async function renderPass(opts) {
  const puppeteer = require('puppeteer');
  const out = path.join(__dirname, '..', 'out', 'dev');
  fs.mkdirSync(out, { recursive: true });
  const figs = [];
  for (const c of cases()) if (c.R !== 32 && [0, 45, 133].includes(c.rot) && !c.flip) figs.push(c);
  const browser = await puppeteer.launch({ headless: 'new' });
  let mismatch = 0;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 1 });
    // 1. measured bbox vs the node bbox
    const html = `<html><body style="margin:0;background:${tokens.color.cream}">` + figs.map((c, i) => `<div id="f${i}" style="display:inline-block">${FS.flatShape(c).svg}</div>`).join('') + '</body></html>';
    await page.setContent(html);
    const got = await page.evaluate((n) => Array.from({ length: n }, (_, i) => {
      const svg = document.querySelector(`#f${i} svg`);
      const el = [...svg.children].find((e) => e.getAttribute('stroke'));
      const m = svg.getScreenCTM().inverse().multiply(el.getScreenCTM());
      const L = el.getTotalLength();
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (let k = 0; k <= 720; k++) { const p = el.getPointAtLength(L * k / 720); const x = m.a * p.x + m.c * p.y + m.e, y = m.b * p.x + m.d * p.y + m.f; x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
      return { x0, y0, x1, y1, w: svg.getBoundingClientRect().width };
    }), figs.length);
    figs.forEach((c, i) => {
      const s = parseSvg(FS.flatShape(c).svg);
      const bb = bboxOf(figurePoints(s.fig));
      const g = got[i];
      const d = Math.max(Math.abs(g.x0 - bb.x0), Math.abs(g.y0 - bb.y0), Math.abs(g.x1 - bb.x1), Math.abs(g.y1 - bb.y1));
      if (!ok(d <= 1, `render ${c.kind}${c.sub ? '/' + c.sub : ''} ${c.variant || 'none'} R${c.R} rot${c.rot}: Chromium bbox differs from the node bbox by ${d.toFixed(2)} px`)) mismatch++;
      ok(g.x0 - SW / 2 >= 0 && g.y0 - SW / 2 >= 0 && g.x1 + SW / 2 <= g.w && g.y1 + SW / 2 <= g.w, `render ${c.kind} R${c.R} rot${c.rot}: drawn outside its box`);
    });
    // 2. contact sheets at the smallest and largest page sizes (lens d 78 / R 33 and lens d 188 / R 82), colour + greyscale
    const rows = [
      ['circle', {}], ['square', {}], ['square 45°', { rot: 45 }], ['rectangle 2.4', { kind: 'rectangle', aspect: 2.4, rot: 28 }], ['rectangle 1.7', { kind: 'rectangle', aspect: 1.7 }],
      ['triangle right', { kind: 'triangle', sub: 'right' }], ['triangle obtuse', { kind: 'triangle', sub: 'obtuse', rot: 180 }], ['triangle skinny', { kind: 'triangle', sub: 'skinny', rot: 52 }], ['equilateral', { kind: 'triangle', sub: 'equilateral', rot: 30 }], ['hexagon', { kind: 'hexagon', rot: 10 }],
      ['gap', { kind: 'triangle', sub: 'equilateral', variant: 'gap', vside: 1 }], ['curved', { kind: 'rectangle', aspect: 2, variant: 'curved', vside: 0, rot: 15 }], ['round', { kind: 'square', variant: 'round', rot: 20 }], ['circle gap', { kind: 'circle', variant: 'gap', rot: 40 }],
      ['rhombus', { kind: 'rhombus', rot: 10 }], ['parallelogram', { kind: 'parallelogram' }], ['trapezoid', { kind: 'trapezoid' }], ['kite', { kind: 'kite' }], ['ellipse', { kind: 'ellipse', aspect: 1.6, rot: 20 }], ['chord', { kind: 'chord', rot: 30 }],
    ];
    const NM = ['rhombus', 'parallelogram', 'trapezoid', 'kite', 'ellipse', 'chord'];
    const kindOf = (label, spec) => spec.kind || (label.startsWith('circle') ? 'circle' : 'square');
    const fig = (label, spec, lensD, R) => {
      const kind = kindOf(label, spec);
      const args = { ...spec, kind, R, lens: lensD / 2 - R - 3 };
      return `<figure style="margin:6px;display:inline-flex;flex-direction:column;align-items:center;font:12px sans-serif;color:${tokens.color.ink}">${FS.flatShape(args).svg}<figcaption>${label} · R ${R}</figcaption></figure>`;
    };
    // the smallest page size (F3 lens d 78, R 33, true figures, plain), the F1 size (lens d 132, R 44, variants + near-misses) and the largest (base d1 lens d 188, R 82)
    const small = rows.filter(([l, sp]) => !NM.includes(kindOf(l, sp)) && !sp.variant).map(([l, sp]) => fig(l, sp, 78, 33)).join('');
    const mid = rows.filter(([l, sp]) => NM.includes(kindOf(l, sp)) || sp.variant).map(([l, sp]) => fig(l, sp, 132, 44)).join('');
    const large = rows.filter(([l, sp]) => !NM.includes(kindOf(l, sp)) && !sp.variant).map(([l, sp]) => fig(l, sp, 188, 82)).join('');
    const doc = (filter) => `<html><body style="margin:8px;background:${tokens.color.cream};${filter}"><div style="width:1380px">${small}</div><div style="width:1380px">${mid}</div><div style="width:1380px">${large}</div></body></html>`;
    for (const [name, filter] of [['colour', ''], ['grey', 'filter:grayscale(1)']]) {
      await page.setContent(doc(filter));
      const fp = path.join(out, `K-368-flat-shape-sheet-${name}.png`);
      await page.screenshot({ path: fp, fullPage: true });
      opts.pngs.push(fp);
    }
  } finally { await browser.close(); }
  return { figs: figs.length, mismatch };
}

async function main() {
  const pngs = [];
  const np = nodePass();
  console.log(`node pass: ${np.n} figures parsed`);
  if (process.argv.includes('--table')) console.log(Object.entries(np.table).map(([k, v]) => '  ' + k + ': ' + v).join('\n'));
  const pz = poisons();
  console.log('poison:\n' + pz.log.join('\n'));
  if (!process.argv.includes('--no-render')) {
    const rp = await renderPass({ pngs });
    console.log(`render pass: ${rp.figs} figures measured in Chromium, ${rp.mismatch} bbox mismatches; sheets:\n  ${pngs.join('\n  ')}`);
  }
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  ') + (fails.length > 40 ? `\n  … ${fails.length - 40} more` : ''));
  const pass = !fails.length && pz.killed === pz.TOTAL;
  console.log(pass ? `PASS (${assertions} assertions, ${pz.killed}/${pz.TOTAL} poisons killed)` : `FAIL (${fails.length} findings, ${pz.killed}/${pz.TOTAL} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, checkFigure, parseSvg, parsePath, figurePoints, caliper, nodePass };
