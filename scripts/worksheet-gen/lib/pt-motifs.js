/**
 * pt-motifs.js — the scene elements Picture Tracing draws ITSELF (the library has no "ground", "cloud" or "wave"
 * drawings to place): flat, rounded, child-friendly line art in the library's own manner (one even outline, round ends,
 * no hatching, no shading). Every motif returns polylines in PAGE px — { pts, closed } — so it traces exactly by
 * construction (a guide that IS the drawing; nothing to erase). Bigger things (a house, a tree, an animal, a boat) never
 * come from here: they come from the library list (_SUBSTRATE-POOL.md).
 *
 * Curves are Catmull-Rom through a few control points, sampled densely; circles and arcs are sampled at ~3 px.
 */
'use strict';

function catmull(ctrl, closed = false, step = 3) {
  const P = closed ? [ctrl[ctrl.length - 1], ...ctrl, ctrl[0], ctrl[1]] : [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];
  const out = [];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]); const n = Math.max(2, Math.ceil(L / step));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(closed ? out[0] : ctrl[ctrl.length - 1]);
  return out;
}
const line = (pts, closed = false) => ({ pts, closed });
function arc(cx, cy, rx, ry, a0, a1, step = 3) {
  const L = Math.abs(a1 - a0) * Math.max(rx, ry); const n = Math.max(6, Math.ceil(L / step)); const pts = [];
  for (let k = 0; k <= n; k++) { const a = a0 + (a1 - a0) * k / n; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
  return pts;
}
const circle = (cx, cy, r) => line(arc(cx, cy, r, r, 0, 2 * Math.PI), true);
const ellipse = (cx, cy, rx, ry) => line(arc(cx, cy, rx, ry, 0, 2 * Math.PI), true);

/** a gently rolling ground line from x0 to x1 at y (amp = height of the rolls) */
function ground(x0, x1, y, amp = 6, rolls = 3, phase = 0) {
  const ctrl = []; const n = rolls * 2;
  for (let i = 0; i <= n; i++) ctrl.push([x0 + (x1 - x0) * i / n, y + (i % 2 ? -amp : amp * 0.3) * (phase ? -1 : 1)]);
  return [line(catmull(ctrl))];
}
/** a soft hill: an arc rising from (x0,y) to (x1,y) with height h */
function hill(x0, x1, y, h) { const c = [[x0, y], [x0 + (x1 - x0) * 0.25, y - h * 0.78], [(x0 + x1) / 2, y - h], [x0 + (x1 - x0) * 0.75, y - h * 0.78], [x1, y]]; return [line(catmull(c))]; }
/** sun: a circle + n short rays (or a smiling face when face = true) */
function sun(cx, cy, r, rays = 8, face = false) {
  const out = [circle(cx, cy, r)];
  // r + 12: at r + 7 the classifier's junction grid (3.5 px cells ±1) joined SOME rays to the circle, so two of eight rays printed dashed and six solid (final review)
  for (let i = 0; i < rays; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / rays; out.push(line([[cx + Math.cos(a) * (r + 12), cy + Math.sin(a) * (r + 12)], [cx + Math.cos(a) * (r + 12 + r * 0.42), cy + Math.sin(a) * (r + 12 + r * 0.42)]])); }
  if (face) out.push(line(arc(cx, cy + r * 0.05, r * 0.45, r * 0.38, 0.25 * Math.PI, 0.75 * Math.PI)));
  return out;
}
/** the OUTLINE of a union of circles (+ optional flat base): rasterised at 2×, traced by marching squares, smoothed —
 *  a cloud drawn as overlapping arcs showed every arc inside the cloud (2026-10-22); a union has one clean outline */
function blobUnion(circles, base) {
  const { contours } = require('./cbn-lineart.js');
  const { rdpRing, chaikin } = require('./pt-trace.js');
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const [cx, cy, r] of circles) { x0 = Math.min(x0, cx - r); y0 = Math.min(y0, cy - r); x1 = Math.max(x1, cx + r); y1 = Math.max(y1, cy + r); }
  if (base) { y1 = Math.max(y1, base.y); x0 = Math.min(x0, base.x0); x1 = Math.max(x1, base.x1); }
  const K = 2, ox = Math.floor(x0) - 3, oy = Math.floor(y0) - 3;
  const inside = (x, y) => {
    const X = x / K + ox, Y = y / K + oy;
    for (const [cx, cy, r] of circles) if ((X - cx) * (X - cx) + (Y - cy) * (Y - cy) <= r * r) return true;
    return !!base && Y <= base.y && Y >= base.top && X >= base.x0 && X <= base.x1;
  };
  const W = Math.ceil((x1 - ox + 3) * K), H = Math.ceil((y1 - oy + 3) * K);
  const rings = contours(inside, 0, 0, W, H).sort((p, q) => q.length - p.length);
  if (!rings.length) return [];
  let r = rings[0].map(([x, y]) => [x / K + ox, y / K + oy]);
  r = rdpRing(r, 0.6); r = chaikin(r, true, 2);
  return [line(r, true)];
}
/** a puffy cloud: 4 bumps on a flat base, width w, base at y */
function cloud(cx, y, w) {
  const x0 = cx - w / 2, h = w * 0.42;
  const C = [[x0 + w * 0.2, y - w * 0.13, w * 0.16], [x0 + w * 0.42, y - w * 0.23, w * 0.21], [x0 + w * 0.66, y - w * 0.22, w * 0.2], [x0 + w * 0.84, y - w * 0.12, w * 0.15]];
  void h;
  return blobUnion(C, { x0: x0 + w * 0.12, x1: x0 + w * 0.9, y, top: y - w * 0.14 });
}
function smoothJoin(pts) { return pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 0.5); }
/** a grass tuft: 3-5 pointed blades from a base point */
function grass(cx, y, h, blades = 3) {
  const out = []; const span = h * 0.9;
  for (let i = 0; i < blades; i++) {
    const t = blades === 1 ? 0.5 : i / (blades - 1); const bx = cx - span / 2 + span * t; const lean = (t - 0.5) * h * 0.7;
    out.push(line(catmull([[bx - h * 0.09, y], [bx + lean * 0.4 - h * 0.02, y - h * 0.55], [bx + lean, y - h * (0.8 + 0.2 * (1 - Math.abs(t - 0.5) * 2))]]).concat(catmull([[bx + lean, y - h * (0.8 + 0.2 * (1 - Math.abs(t - 0.5) * 2))], [bx + lean * 0.4 + h * 0.06, y - h * 0.5], [bx + h * 0.09, y]]).slice(1))));
  }
  return out;
}
/** a small daisy: a centre circle + petals */
function daisy(cx, cy, r, petals = 6, stem = 0) {
  const out = [circle(cx, cy, r * 0.32)];
  for (let i = 0; i < petals; i++) { const a = i * 2 * Math.PI / petals - Math.PI / 2; const px = cx + Math.cos(a) * r * 0.68, py = cy + Math.sin(a) * r * 0.68; const e = arc(px, py, r * 0.36, r * 0.22, 0, 2 * Math.PI).map(([x, y]) => { const dx = x - px, dy = y - py; return [px + dx * Math.cos(a) - dy * Math.sin(a), py + dx * Math.sin(a) + dy * Math.cos(a)]; }); out.push(line(e, true)); }
  if (stem) out.push(line(catmull([[cx, cy + r * 0.95], [cx + 2, cy + r + stem * 0.5], [cx, cy + r + stem]])));
  return out;
}
/** wavy water line(s): waves from x0 to x1 at y, wavelength wl, amplitude a */
function waves(x0, x1, y, wl = 46, a = 7) {
  const ctrl = []; for (let x = x0, i = 0; x <= x1 + 0.1; x += wl / 2, i++) ctrl.push([Math.min(x, x1), y + (i % 2 ? -a : a)]);
  return [line(catmull(ctrl))];
}
/** a rain drop (tip up), height h */
function drop(cx, cy, h) { const r = h * 0.32; const pts = [[cx, cy - h / 2], ...arc(cx, cy + h / 2 - r, r, r, -0.15 * Math.PI, 1.15 * Math.PI).reverse().reverse()]; return [line(catmull([[cx, cy - h / 2], [cx + r * 0.75, cy], [cx + r, cy + h / 2 - r], [cx, cy + h / 2], [cx - r, cy + h / 2 - r], [cx - r * 0.75, cy]], true))]; void pts; }
/** a 6-arm snowflake with little side ticks */
function snowflake(cx, cy, r) {
  const out = [];
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3 - Math.PI / 2, ex = cx + Math.cos(a) * r, ey = cy + Math.sin(a) * r;
    out.push(line([[cx, cy], [ex, ey]]));
    const mx = cx + Math.cos(a) * r * 0.6, my = cy + Math.sin(a) * r * 0.6;
    for (const s of [-1, 1]) { const b = a + s * 0.75; out.push(line([[mx, my], [mx + Math.cos(b) * r * 0.3, my + Math.sin(b) * r * 0.3]])); }
  }
  return out;
}
/** a rounded 5-point star */
function star(cx, cy, r, inner = 0.48) {
  const ctrl = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * inner : r; ctrl.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  return [line(ctrl.concat([ctrl[0]]), true)];
}
/** a crescent moon */
function moon(cx, cy, r) { return [line(arc(cx, cy, r, r, 0.35 * Math.PI, 1.65 * Math.PI).concat(arc(cx + r * 0.42, cy, r * 0.78, r * 0.78, 1.55 * Math.PI, 0.45 * Math.PI)), true)]; }
/** a rainbow: k concentric half arcs */
function rainbow(cx, y, r, k = 3, gap = 16) { const out = []; for (let i = 0; i < k; i++) out.push(line(arc(cx, y, r - i * gap, r - i * gap, Math.PI, 2 * Math.PI))); return out; }
/** mountains: a zigzag ridge with 2-3 peaks */
function mountains(x0, x1, y, h, peaks = 3) {
  const ctrl = [[x0, y]]; const w = (x1 - x0) / peaks;
  for (let i = 0; i < peaks; i++) { ctrl.push([x0 + w * (i + 0.5), y - h * (i % 2 ? 0.72 : 1)]); ctrl.push([x0 + w * (i + 1), y - (i === peaks - 1 ? 0 : h * 0.3)]); }
  return [line(ctrl)];
}
/** a picket fence: posts with pointed tops + two rails */
function fence(x0, x1, y, h, posts = 5) {
  const out = []; const step = (x1 - x0) / (posts - 1), pw = Math.min(16, step * 0.42);
  for (let i = 0; i < posts; i++) { const x = x0 + i * step; out.push(line([[x - pw / 2, y], [x - pw / 2, y - h + pw * 0.6], [x, y - h], [x + pw / 2, y - h + pw * 0.6], [x + pw / 2, y]])); }
  for (const t of [0.35, 0.72]) for (let i = 0; i < posts - 1; i++) out.push(line([[x0 + i * step + pw / 2, y - h * t], [x0 + (i + 1) * step - pw / 2, y - h * t]]));
  return out;
}
/** a rounded rectangle (picture frame, window, sign) */
function roundRect(x, y, w, h, r = 10) {
  const pts = []; pts.push(...arc(x + w - r, y + r, r, r, -Math.PI / 2, 0), ...arc(x + w - r, y + h - r, r, r, 0, Math.PI / 2), ...arc(x + r, y + h - r, r, r, Math.PI / 2, Math.PI), ...arc(x + r, y + r, r, r, Math.PI, 1.5 * Math.PI));
  return [line(pts.concat([pts[0]]), true)];
}
/** a bubble ring with a small highlight arc */
function bubble(cx, cy, r) { return [circle(cx, cy, r), line(arc(cx, cy, r * 0.62, r * 0.62, 1.1 * Math.PI, 1.45 * Math.PI))]; }
/** a winding path (two parallel edges) from a to b through ctrl points */
function pathBand(ctrl, width) {
  const c = catmull(ctrl, false, 3); const L = [], R = [];
  for (let i = 0; i < c.length; i++) {
    const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1;
    const k = width / 2 * (1 - 0.7 * i / (c.length - 1));                 // WIDE at the first point (the viewer's edge), 30 % at the last
    L.push([c[i][0] - dy / n * k, c[i][1] + dx / n * k]); R.push([c[i][0] + dy / n * k, c[i][1] - dx / n * k]);
  }
  return [line(L), line(R)];
}
/** a kite/balloon string: a gentle S from (x0,y0) to (x1,y1) */
function string(x0, y0, x1, y1) { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2; return [line(catmull([[x0, y0], [mx + (y1 - y0) * 0.12, my - (x1 - x0) * 0.08], [x1, y1]]))]; }
/** bunting: a sagging string with triangular flags */
function bunting(x0, x1, y, sag = 22, flags = 6) {
  const out = []; const str = catmull([[x0, y], [(x0 + x1) / 2, y + sag], [x1, y]]); out.push(line(str));
  const at = (t) => str[Math.round(t * (str.length - 1))];
  for (let i = 0; i < flags; i++) { const t0 = (i + 0.15) / flags, t1 = (i + 0.85) / flags; const a = at(t0), b = at(t1); const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + Math.abs(b[0] - a[0]) * 1.1]; out.push(line([a, m, b])); }
  return out;
}
/** exact shapes (the shapes face, K.G.A.2 "regardless of orientation or size"): true geometry, optionally turned by
 *  `deg` about the centre. A square has equal sides and right angles; a circle is a circle — never an oval, never a
 *  rounded box (the contract refuses them). */
const turn = (pts, cx, cy, deg) => { if (!deg) return pts; const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]); };
const poly = (pts) => line(pts.concat([pts[0]]), true);
const shapes = {
  circle: (cx, cy, r) => [circle(cx, cy, r)],
  square: (cx, cy, s, deg = 0) => [poly(turn([[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]], cx, cy, deg))],
  rect: (cx, cy, w, h, deg = 0) => [poly(turn([[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]], cx, cy, deg))],
  // an equilateral triangle with side s, its centroid at (cx, cy); deg 180 = upside down
  triangle: (cx, cy, s, deg = 0) => { const h = s * Math.sqrt(3) / 2; return [poly(turn([[cx, cy - h * 2 / 3], [cx + s / 2, cy + h / 3], [cx - s / 2, cy + h / 3]], cx, cy, deg))]; },
};

/** a fir tree as ONE closed polyline with `tiers` zigzag tiers (F6: its sides are zigzags, not a plain triangle) +
 *  a trunk rectangle; apex (ax, ay), base y `by` with half-width `hw`, trunk to `ty` with half-width `tw` */
function fir(ax, ay, by, hw, ty, tw, tiers = 3) {
  const R = [], L = [];
  for (let k = 1; k <= tiers; k++) {
    const yTip = ay + (by - ay) * k / tiers, w = hw * k / tiers;           // the tier's outer point
    // the notch steps back IN, under the previous tier's tip (⚠ a notch wider than that tip merged the tiers into one
    // plain triangle, 2026-10-22)
    const yIn = ay + (by - ay) * (k - 1) / tiers + 6, wIn = hw * (k - 1) / tiers * 0.5;
    if (k > 1) { R.push([ax + wIn, yIn]); L.unshift([ax - wIn, yIn]); }
    R.push([ax + w, yTip]); L.unshift([ax - w, yTip]);
  }
  const outline = [[ax, ay], ...R, [ax + tw, by], [ax - tw, by], ...L, [ax, ay]];
  return [line(outline.filter((p, i) => !(i > 0 && p[0] === outline[i - 1][0] && p[1] === outline[i - 1][1])), true),
    line([[ax - tw, by], [ax - tw, ty], [ax + tw, ty], [ax + tw, by]])];
}
/** badge glyphs (structure, white on a black disc): an eye, an arrow (deg: 90 = down), a start-dot sample */
const glyph = {
  eye: (cx, cy, r) => [line(arc(cx, cy + r * 0.9, r * 1.25, r * 1.25, -0.78 * Math.PI, -0.22 * Math.PI).concat(arc(cx, cy - r * 0.9, r * 1.25, r * 1.25, 0.22 * Math.PI, 0.78 * Math.PI)), true), circle(cx, cy, r * 0.32)],
  arrow: (cx, cy, r, deg = 0) => { const a = deg * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a); const T = (x, y) => [cx + x * c - y * sn, cy + x * sn + y * c]; return [line([T(-r * 0.55, 0), T(r * 0.55, 0)]), line([T(r * 0.15, -r * 0.4), T(r * 0.55, 0), T(r * 0.15, r * 0.4)])]; },
};
/** F9 "where do I start?": four pictures drawn as DESIGNED STROKES in teaching order (pedagogy #9: ≤ 4 strokes, each
 *  starting at its top or left end, the c/o rule for round ones). Traced library drawings fragment at every junction
 *  (the flag had eight start dots), so these are authored: every line carries `fixed: true` (its point order IS the
 *  direction; the renderer never re-orients it). Box: (cx, by) = bottom centre, h = height. */
const fixed = (pts, closed = false) => ({ pts, closed, fixed: true });
const stroke = {
  flag: (cx, by, h) => {
    const top = by - h, x0 = cx - h * 0.32;
    const cloth = catmull([[x0, top + 6], [x0 + h * 0.2, top - 4], [x0 + h * 0.42, top + 10], [x0 + h * 0.62, top + 2]])
      .concat(catmull([[x0 + h * 0.62, top + 2], [x0 + h * 0.6, top + h * 0.22], [x0 + h * 0.62, top + h * 0.42]]).slice(1))
      .concat(catmull([[x0 + h * 0.62, top + h * 0.42], [x0 + h * 0.4, top + h * 0.5], [x0 + h * 0.2, top + h * 0.38], [x0, top + h * 0.46]]).slice(1));
    return [fixed([[x0, top], [x0, by]]), fixed(cloth)];
  },
  heart: (cx, by, h) => {
    const top = by - h, w = h * 0.55;
    const half = (sg) => catmull([[cx, top + h * 0.24], [cx + sg * w * 0.45, top], [cx + sg * w, top + h * 0.22], [cx + sg * w * 0.7, top + h * 0.62], [cx, by]]);
    // ONE stroke: from the dip down the left side to the point, then up the right side back to the dip — one start dot,
    // one arrow (two halves from one dot gave two opposing arrows: the child could not tell which way to go, nl panel)
    return [fixed(half(-1).concat(half(1).slice().reverse().slice(1)), true)];
  },
  stocking: (cx, by, h) => {
    const top = by - h, w = h * 0.5, x0 = cx - w * 0.55;
    const body = catmull([[x0, top + h * 0.2], [x0, top + h * 0.6], [x0 + w * 0.1, by - h * 0.1], [x0 + w * 0.6, by], [x0 + w * 1.15, by - h * 0.06], [x0 + w * 1.05, by - h * 0.25], [x0 + w * 0.6, top + h * 0.6], [x0 + w * 0.62, top + h * 0.2]]);
    const cuff = [[x0 - 4, top], [x0 + w * 0.66, top], [x0 + w * 0.66, top + h * 0.2], [x0 - 4, top + h * 0.2], [x0 - 4, top]];
    return [fixed(cuff, true), fixed(body)];
  },
  bell: (cx, by, h) => {
    const top = by - h * 0.86, w = h * 0.5;
    const rim = by - h * 0.14;
    // the outline from the top, anticlockwise for the viewer: down the LEFT side, across the rim, up the right side
    const left = catmull([[cx, top], [cx - w * 0.45, top + h * 0.08], [cx - w * 0.6, top + h * 0.4], [cx - w * 0.95, rim]]);
    const out = left.concat([[cx + w * 0.95, rim]]).concat(catmull([[cx + w * 0.95, rim], [cx + w * 0.6, top + h * 0.4], [cx + w * 0.45, top + h * 0.08], [cx, top]]).slice(1));
    const loop = arc(cx, top - h * 0.07, h * 0.07, h * 0.07, -Math.PI / 6, -Math.PI / 6 - 2 * Math.PI);   // 2 o'clock, anticlockwise (screen: angle decreasing = anticlockwise for the viewer)
    const clap = arc(cx, by - h * 0.07, h * 0.07, h * 0.07, -Math.PI / 6, -Math.PI / 6 - 2 * Math.PI);
    return [fixed(out, true), fixed(loop, true), fixed(clap, true)];
  },
};

module.exports = { stroke, fir, glyph, blobUnion, catmull, arc, circle, ellipse, ground, hill, sun, cloud, grass, daisy, waves, drop, snowflake, star, moon, rainbow, mountains, fence, roundRect, bubble, pathBand, string, bunting, shapes, line };
