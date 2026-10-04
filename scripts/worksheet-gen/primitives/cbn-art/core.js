/**
 * cbn-art/core.js — the Color by Number drawing kit (2026-10-04, operator: "top quality, professional, child friendly …
 * cute coloring style … very clear and attractive").
 *
 * A drawing is an Art: an ordered list of
 *   REGIONS  closed shapes the child colours: { svg-shape, colour, tf }. Paint order = list order; a later region hides
 *            what it overlaps, so a part's NUMBER goes where it is VISIBLE (lib/cbn-label.js measures that).
 *   DETAILS  ink only (eyes, smiles, whiskers, veins, ripples): never coloured, never numbered.
 * colour 'none' = a region that stays white (a cloud, an eye-white) and carries no number.
 *
 * Shapes are built in local units and placed with a transform (translate / scale / rotate / flip) so one character
 * drawn once can sit in many scenes. Smooth organic outlines come from blob() — a closed Catmull-Rom curve through
 * control points, turned into cubic Béziers — which is what makes the parts round and friendly.
 *
 * Rendering (lib/cbn-render.js): 'line' (the worksheet: white parts, thick round ink outlines, numbers),
 * 'colour' (the answer key), 'id' (each region a unique flat colour — the labeller's input).
 */
'use strict';

const f = (n) => (Math.round(n * 100) / 100).toString();

/* ---------------------------------------------------------------- shape builders → path data (local units) */
function circle(cx, cy, r) { return `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`; }
function ellipse(cx, cy, rx, ry) { return `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0Z`; }
function rrect(x, y, w, h, r = 0) {
  r = Math.min(r, w / 2, h / 2);
  if (!r) return `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z`;
  return `M${f(x + r)} ${f(y)}H${f(x + w - r)}Q${f(x + w)} ${f(y)} ${f(x + w)} ${f(y + r)}V${f(y + h - r)}Q${f(x + w)} ${f(y + h)} ${f(x + w - r)} ${f(y + h)}H${f(x + r)}Q${f(x)} ${f(y + h)} ${f(x)} ${f(y + h - r)}V${f(y + r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Z`;
}
/** a closed smooth curve through the points (Catmull-Rom, tension t) */
function blob(pts, t = 1) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) * t / 6, p1[1] + (p2[1] - p0[1]) * t / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t / 6, p2[1] - (p3[1] - p1[1]) * t / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}
/** an open smooth curve through the points (for details) */
function curve(pts, t = 1) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) * t / 6, p1[1] + (p2[1] - p0[1]) * t / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t / 6, p2[1] - (p3[1] - p1[1]) * t / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}
/** a polygon with rounded corners (radius r at every vertex) */
function poly(pts, r = 0) {
  if (!r) return 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
  const n = pts.length; let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const v1 = [p0[0] - p1[0], p0[1] - p1[1]], v2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2), rr = Math.min(r, l1 / 2, l2 / 2);
    const a = [p1[0] + v1[0] / l1 * rr, p1[1] + v1[1] / l1 * rr], b = [p1[0] + v2[0] / l2 * rr, p1[1] + v2[1] / l2 * rr];
    d += (i === 0 ? 'M' : 'L') + `${f(a[0])} ${f(a[1])}Q${f(p1[0])} ${f(p1[1])} ${f(b[0])} ${f(b[1])}`;
  }
  return d + 'Z';
}
/** a star with n points */
function star(cx, cy, R, r, n = 5, rot = -90, round = 0) {
  const pts = [];
  for (let i = 0; i < 2 * n; i++) { const a = (rot + i * 180 / n) * Math.PI / 180, rr = i % 2 ? r : R; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
  return poly(pts, round);
}
/** points on an ellipse (for blobs) — k points, optional per-point radius jitter list */
function ring(cx, cy, rx, ry, k, jit) { return Array.from({ length: k }, (_, i) => { const a = (i / k) * 2 * Math.PI - Math.PI / 2, m = jit ? jit[i % jit.length] : 1; return [cx + rx * m * Math.cos(a), cy + ry * m * Math.sin(a)]; }); }
/** a fluffy cloud / bush / tree-crown outline: bumps around an ellipse */
function puff(cx, cy, rx, ry, bumps = 7, depth = 0.18) {
  const pts = [];
  for (let i = 0; i < bumps * 2; i++) { const a = (i / (bumps * 2)) * 2 * Math.PI - Math.PI / 2, m = i % 2 ? 1 - depth : 1 + depth * 0.25; pts.push([cx + rx * m * Math.cos(a), cy + ry * m * Math.sin(a)]); }
  return blob(pts, 1.25);
}

/**
 * a cloud / bush / tree-crown outline made of ROUND BUMPS: k points on an ellipse joined by outward arcs (bulge b =
 * how round the bumps are, 0.5 = half circles). flatBottom keeps the lower edge calm (a cloud's base, a bush on the
 * ground): bumps whose midpoint is below the centre by more than flatBottom*ry are drawn as gentle curves instead.
 */
function bumps(cx, cy, rx, ry, k = 8, b = 0.42, flatBottom = null, rot = -90) {
  const pts = Array.from({ length: k }, (_, i) => { const a = (rot + i * 360 / k) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < k; i++) {
    const p = pts[i], q = pts[(i + 1) % k];
    const ch = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const mid = (p[1] + q[1]) / 2;
    if (flatBottom !== null && mid > cy + flatBottom * ry) { d += `Q${f((p[0] + q[0]) / 2)} ${f(mid + ch * 0.08)} ${f(q[0])} ${f(q[1])}`; continue; }
    const r = ch / (2 * Math.sin(Math.PI * Math.min(0.95, Math.max(0.2, b)) ))  ;
    d += `A${f(r)} ${f(r)} 0 0 1 ${f(q[0])} ${f(q[1])}`;
  }
  return d + 'Z';
}

/* ---------------------------------------------------------------- the Art */
const COLOURS = ['red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'purple', 'pink', 'brown', 'grey', 'black', 'none'];

/** the outline of every region, in FINAL picture units (the same everywhere, whatever a part's scale) */
const OUTLINE = 3.2;

class Art {
  constructor(w = 600, h = 560) { this.w = w; this.h = h; this.items = []; this.tf = []; this.sc = [1]; this.grp = []; this.nGroups = 0; }
  /**
   * run fn as ONE object (a character, a pot, a tree): its regions carry the group, and lib/cbn-render.js checkSolid
   * demands the group's fills make ONE solid piece (no gap, no tangent joint). Nested groups belong to the outermost.
   * opts.edgeOk: the object may touch the frame edge (scenery that runs off the picture: trees, fences, clouds).
   */
  group(name, fn, opts = {}) {
    if (this.grp.length) { fn(this); return this; }
    this.grp.push({ id: ++this.nGroups, name, edgeOk: !!opts.edgeOk });
    try { fn(this); } finally { this.grp.pop(); }
    return this;
  }
  /**
   * run fn with a placement pushed: { x, y, s (scale), r (degrees), fx (mirror) }. Every region / detail inside is
   * placed by it; stroke widths are divided by the running scale so the ink stays the same weight on the page.
   */
  at(o, fn) {
    const s = o.s || 1;
    this.tf.push(`translate(${f(o.x || 0)} ${f(o.y || 0)})${o.r ? ` rotate(${f(o.r)})` : ''} scale(${f(o.fx ? -s : s)} ${f(s)})`);
    this.sc.push(this.sc[this.sc.length - 1] * s);
    try { fn(this); } finally { this.tf.pop(); this.sc.pop(); }
    return this;
  }
  get T() { return this.tf.join(' '); }
  get S() { return this.sc[this.sc.length - 1]; }
  region(d, colour, name) {
    if (!COLOURS.includes(colour)) throw new Error(`cbn-art: unknown colour "${colour}"`);
    this.items.push({ kind: 'r', d, colour, tf: this.T, ow: OUTLINE / this.S, name: name || '', group: this.grp[0] || null });
    return this;
  }
  /** an ink stroke (open or closed path); w in FINAL picture units */
  line(d, w = 2.6) { this.items.push({ kind: 'l', d, w: w / this.S, tf: this.T, group: this.grp[0] || null }); return this; }
  /** a solid ink shape (pupil, nostril) */
  ink(d) { this.items.push({ kind: 'k', d, tf: this.T }); return this; }
  /** a white shape on top of ink (eye highlight) */
  shine(d) { this.items.push({ kind: 's', d, tf: this.T }); return this; }
  get regions() { return this.items.filter((x) => x.kind === 'r'); }
}

module.exports = { Art, COLOURS, OUTLINE, bumps, circle, ellipse, rrect, blob, curve, poly, star, ring, puff, f };
