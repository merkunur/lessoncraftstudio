/**
 * top-side-view.js — the G1-379 `maps` F1 two-view drawings (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3 F1 "primitives/top-side-view.js", design B's
 * model). Pure SVG on primitives/_tokens.js.
 *
 * ONE model record (data/b5/maps.js MAPS.TOPSIDE[id]: solids in model space 0..100 — x left to
 * right, y FRONT (0) to BACK (100), z up) projected TWICE orthographically:
 *   side  = (x, z): the thing seen from the FRONT, standing on the bottom of its box; painter
 *           by y descending (far first); the stable record order breaks ties.
 *   top   = (x, y): the thing seen from ABOVE, the FRONT at the BOTTOM of the tile; painter by
 *           the solid's top z ascending (the highest part drawn last).
 * Hidden parts are simply covered (a table's legs under its top, a tree's trunk under its crown,
 * a car's wheels under its body). ONE scale per model, shared by both views:
 *   s = min(box / extentX, box / extentY, box / extentZ)
 * so the WIDTH seen from the front equals the width seen from above (an honest cue, and the
 * gate's registration check). A view whose larger side falls under 56 px THROWS (the K floor).
 * The house's top view is drawn with the SAME recipe as primitives/map-symbol.js 'house' (a
 * two-tone gable roof, left teal / right tealSoft, a white ridge) — the key symbol IS the
 * house seen from above.
 *
 * Solids: box · cyl · frustum (+ optional white `bands` [[z0,z1]…], seen from above as rings) ·
 * cylY (a wheel) · gableY (ridge along y) · crown (a leafy ball: the scalloped crown) · handle
 * (a cup's C-handle) · arc (a bucket's bail).
 *
 * API
 *   topSideView({ model, view:'side'|'top', box = 84, record }) -> { svg, meta:{ model, view, s,
 *     w, h (px of the drawn extent), x0 (px, left of the drawn extent in the box) } }
 *     `record` defaults to MAPS.TOPSIDE[model]; an unknown model / view THROWS; a view whose
 *     larger side < 56 THROWS.
 *   extentsOf(record) -> {x0,x1,y0,y1,z0,z1};  scaleOf(record, box)
 * Root: <svg data-lcs-prim="top-side-view" data-lcs-model data-lcs-view data-lcs-scale>
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { scallopRing } = require('./map-symbol.js');
const { MAPS } = require('../data/b5/maps.js');

const T = tokens.color;
const MIN_SIDE = 56;
const SW = 2.5;   // outline px
const f2 = (v) => +(+v).toFixed(2);

function solidExtent(o) {
  switch (o.type) {
    case 'box': case 'gableY': return [o.x0, o.x1, o.y0, o.y1, o.z0, o.z1];
    case 'cyl': return [o.cx - o.r, o.cx + o.r, o.cy - o.r, o.cy + o.r, o.z0, o.z1];
    case 'frustum': { const R = Math.max(o.r0, o.r1); return [o.cx - R, o.cx + R, o.cy - R, o.cy + R, o.z0, o.z1]; }
    case 'crown': return [o.cx - o.r, o.cx + o.r, o.cy - o.r, o.cy + o.r, o.cz - o.r, o.cz + o.r];
    case 'cylY': return [o.cx - o.r, o.cx + o.r, o.y0, o.y1, o.cz - o.r, o.cz + o.r];
    case 'handle': return [o.x0, o.x1, o.cy - o.t / 2, o.cy + o.t / 2, o.z0, o.z1];
    case 'arc': return [o.cx - o.r, o.cx + o.r, o.cy - 1, o.cy + 1, o.z0, o.z0 + o.h];
    default: throw new Error(`top-side-view: unknown solid "${o.type}"`);
  }
}
function extentsOf(rec) {
  const e = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity, z0: Infinity, z1: -Infinity };
  for (const o of rec.solids) { const [a, b, c, d, g, h] = solidExtent(o); e.x0 = Math.min(e.x0, a); e.x1 = Math.max(e.x1, b); e.y0 = Math.min(e.y0, c); e.y1 = Math.max(e.y1, d); e.z0 = Math.min(e.z0, g); e.z1 = Math.max(e.z1, h); }
  return e;
}
function scaleOf(rec, box) { const e = extentsOf(rec); return Math.min(box / (e.x1 - e.x0), box / (e.y1 - e.y0), box / (e.z1 - e.z0)); }
const fillOf = (o) => (o.fill && o.fill !== 'none' ? T[o.fill] : 'none');

/** The gable roof from above: the map-symbol 'house' recipe on the roof rect (px). */
function roofTop(x, y, w, h) {
  const k = w / 36, r = 3 * k, mid = x + w / 2;
  return el('rect', { x: f2(x), y: f2(y), width: f2(w), height: f2(h), rx: f2(r), ry: f2(r), fill: T.tealSoft }) +
    el('path', { d: `M${f2(x + r)} ${f2(y)} L${f2(mid)} ${f2(y)} L${f2(mid)} ${f2(y + h)} L${f2(x + r)} ${f2(y + h)} Q${f2(x)} ${f2(y + h)} ${f2(x)} ${f2(y + h - r)} L${f2(x)} ${f2(y + r)} Q${f2(x)} ${f2(y)} ${f2(x + r)} ${f2(y)} Z`, fill: T.teal }) +
    el('rect', { x: f2(x), y: f2(y), width: f2(w), height: f2(h), rx: f2(r), ry: f2(r), fill: 'none', stroke: T.teal, 'stroke-width': f2(2 * k) }) +
    el('line', { x1: f2(mid), y1: f2(y + k), x2: f2(mid), y2: f2(y + h - k), stroke: T.white, 'stroke-width': f2(2 * k) });
}

function drawSolid(o, view, P) {
  const st = { stroke: T.teal, 'stroke-width': SW, 'stroke-linejoin': 'round' };
  const fill = fillOf(o);
  if (view === 'side') {
    switch (o.type) {
      case 'box': case 'cyl': {
        const [a, b] = o.type === 'box' ? [o.x0, o.x1] : [o.cx - o.r, o.cx + o.r];
        const [X0, Z1] = P(a, o.z1), [X1, Z0] = P(b, o.z0);
        return el('rect', { x: X0, y: Z1, width: f2(X1 - X0), height: f2(Z0 - Z1), fill, ...st });
      }
      case 'frustum': {
        const [a0, zb] = P(o.cx - o.r0, o.z0), [b0] = P(o.cx + o.r0, o.z0), [a1, zt] = P(o.cx - o.r1, o.z1), [b1] = P(o.cx + o.r1, o.z1);
        let s = el('path', { d: `M${a0} ${zb} L${b0} ${zb} L${b1} ${zt} L${a1} ${zt} Z`, fill, ...st });
        for (const [z0, z1] of o.bands || []) {
          const t0 = (z0 - o.z0) / (o.z1 - o.z0), t1 = (z1 - o.z0) / (o.z1 - o.z0);
          const r0 = o.r0 + (o.r1 - o.r0) * t0, r1 = o.r0 + (o.r1 - o.r0) * t1;
          const [p, q0] = P(o.cx - r0, z0), [pp] = P(o.cx + r0, z0), [u, q1] = P(o.cx - r1, z1), [uu] = P(o.cx + r1, z1);
          s += el('path', { d: `M${p} ${q0} L${pp} ${q0} L${uu} ${q1} L${u} ${q1} Z`, fill: T.white, stroke: T.teal, 'stroke-width': 1.5 });
        }
        return s;
      }
      case 'crown': {
        const [cx, cz] = P(o.cx, o.cz), [ex] = P(o.cx + o.r, o.cz);
        const k = (ex - cx) / 22;
        return el('path', { d: scallopRing({ cx: 22, cy: 22 }), transform: `translate(${f2(cx - 22 * k)} ${f2(cz - 22 * k)}) scale(${f2(k)})`, fill, stroke: T.teal, 'stroke-width': f2(SW / k), 'stroke-linejoin': 'round' });
      }
      case 'cylY': { const [cx, cz] = P(o.cx, o.cz), [ex] = P(o.cx + o.r, o.cz); return el('circle', { cx, cy: cz, r: f2(ex - cx), fill, ...st }) + el('circle', { cx, cy: cz, r: f2((ex - cx) * 0.4), fill: T.grid }); }
      case 'handle': {
        // the C drawn as a stroke of the handle's thickness, its OUTER edge on x1 + SW/2 (= the top view's rect edge)
        const t = Math.max(SW, P(o.t, 0)[0] - P(0, 0)[0]);
        const [X0, Z1] = P(o.x0, o.z1), [X1r, Z0] = P(o.x1, o.z0);
        const X1 = f2(X1r - t / 2 + SW / 2), top = f2(Z1 + t / 2), bot = f2(Z0 - t / 2);
        return el('path', { d: `M${X0} ${top} L${f2(X1 - (bot - top) / 3)} ${top} Q${X1} ${top} ${X1} ${f2((top + bot) / 2)} Q${X1} ${bot} ${f2(X1 - (bot - top) / 3)} ${bot} L${X0} ${bot}`, fill: 'none', stroke: T.teal, 'stroke-width': f2(t), 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' });
      }
      case 'arc': { const [a, z] = P(o.cx - o.r, o.z0), [b] = P(o.cx + o.r, o.z0), [, top] = P(o.cx, o.z0 + o.h); return el('path', { d: `M${a} ${z} C${a} ${f2(top - (z - top) * 0.33)} ${b} ${f2(top - (z - top) * 0.33)} ${b} ${z}`, fill: 'none', stroke: T.ink, 'stroke-width': SW, 'stroke-linecap': 'round' }); }
      case 'gableY': { const [a, z0] = P(o.x0, o.z0), [b] = P(o.x1, o.z0), [m, z1] = P((o.x0 + o.x1) / 2, o.z1); return el('path', { d: `M${a} ${z0} L${m} ${z1} L${b} ${z0} Z`, fill: T.teal, ...st }); }
      default: throw new Error(`top-side-view: unknown solid "${o.type}"`);
    }
  }
  // top
  switch (o.type) {
    case 'box': { const [X0, Y0] = P(o.x0, o.y1), [X1, Y1] = P(o.x1, o.y0); return el('rect', { x: X0, y: Y0, width: f2(X1 - X0), height: f2(Y1 - Y0), fill, ...st }); }
    case 'cyl': { const [cx, cy] = P(o.cx, o.cy), [ex] = P(o.cx + o.r, o.cy); return el('circle', { cx, cy, r: f2(ex - cx), fill, ...st }); }
    case 'frustum': {
      const [cx, cy] = P(o.cx, o.cy), k = P(1, 0)[0] - P(0, 0)[0];
      const R = Math.max(o.r0, o.r1) * k, rr = Math.min(o.r0, o.r1) * k;
      let s = el('circle', { cx, cy, r: f2(R), fill, ...st });
      if (o.r1 >= o.r0) s += el('circle', { cx, cy, r: f2(R - 3.5), fill: 'none', stroke: T.teal, 'stroke-width': 1.5 });   // the rim seen from above
      else {
        for (const [z0, z1] of o.bands || []) for (const z of [z0, z1]) { const t = (z - o.z0) / (o.z1 - o.z0); s += el('circle', { cx, cy, r: f2((o.r0 + (o.r1 - o.r0) * t) * k), fill: 'none', stroke: T.white, 'stroke-width': 2.5 }); }
        s += el('circle', { cx, cy, r: f2(Math.max(rr, 2.5)), fill, ...st });
      }
      return s;
    }
    case 'crown': {
      const [cx, cy] = P(o.cx, o.cy), [ex] = P(o.cx + o.r, o.cy);
      const k = (ex - cx) / 22;
      return el('path', { d: scallopRing({ cx: 22, cy: 22 }), transform: `translate(${f2(cx - 22 * k)} ${f2(cy - 22 * k)}) scale(${f2(k)})`, fill, stroke: T.teal, 'stroke-width': f2(SW / k), 'stroke-linejoin': 'round' });
    }
    case 'cylY': { const [X0, Y0] = P(o.cx - o.r, o.y1), [X1, Y1] = P(o.cx + o.r, o.y0); return el('rect', { x: X0, y: Y0, width: f2(X1 - X0), height: f2(Y1 - Y0), fill, ...st }); }
    case 'handle': { const [X0, Y0] = P(o.x0, o.cy + o.t / 2), [X1, Y1] = P(o.x1, o.cy - o.t / 2); return el('rect', { x: X0, y: Y0, width: f2(X1 - X0), height: f2(Y1 - Y0), rx: 2, ry: 2, fill, ...st }); }
    case 'arc': { const [a, y] = P(o.cx - o.r, o.cy), [b] = P(o.cx + o.r, o.cy); return el('line', { x1: a, y1: y, x2: b, y2: y, stroke: T.ink, 'stroke-width': SW, 'stroke-linecap': 'round' }); }
    case 'gableY': { const [X0, Y0] = P(o.x0, o.y1), [X1, Y1] = P(o.x1, o.y0); return roofTop(X0, Y0, X1 - X0, Y1 - Y0); }
    default: throw new Error(`top-side-view: unknown solid "${o.type}"`);
  }
}

function topOf(o) { return solidExtent(o)[5]; }
function midY(o) { const e = solidExtent(o); return (e[2] + e[3]) / 2; }

function topSideView({ model, view, box = 84, record } = {}) {
  const rec = record || MAPS.TOPSIDE[model];
  if (!rec) throw new Error(`top-side-view: unknown model "${model}"`);
  if (view !== 'side' && view !== 'top') throw new Error(`top-side-view: view "${view}" ∉ side | top`);
  const e = extentsOf(rec);
  const s = scaleOf(rec, box);
  const w = (e.x1 - e.x0) * s, h = view === 'side' ? (e.z1 - e.z0) * s : (e.y1 - e.y0) * s;
  if (Math.max(w, h) < MIN_SIDE - 1e-9) throw new Error(`top-side-view: ${model} ${view} larger side ${w.toFixed(1)} x ${h.toFixed(1)} < ${MIN_SIDE}`);
  const ox = (box - w) / 2;
  const oy = view === 'side' ? box - h : (box - h) / 2;   // the side view stands on the bottom of its box
  const P = view === 'side'
    ? (x, z) => [f2(ox + (x - e.x0) * s), f2(oy + (e.z1 - z) * s)]
    : (x, y) => [f2(ox + (x - e.x0) * s), f2(oy + (e.y1 - y) * s)];   // FRONT (y small) at the BOTTOM
  const order = rec.solids.map((o, i) => ({ o, i }));
  if (view === 'side') order.sort((a, b) => midY(b.o) - midY(a.o) || a.i - b.i);
  else order.sort((a, b) => topOf(a.o) - topOf(b.o) || a.i - b.i);
  const inner = order.map(({ o }) => drawSolid(o, view, P)).join('');
  const svg = svgRoot({ width: box, height: box, viewBox: `0 0 ${box} ${box}`, label: '' }, inner,
    { 'data-lcs-prim': 'top-side-view', 'data-lcs-model': model, 'data-lcs-view': view, 'data-lcs-scale': f2(s), style: 'display:block;overflow:visible' });
  return { svg, meta: { model, view, s, w, h, x0: ox } };
}

module.exports = { topSideView, extentsOf, scaleOf, MIN_SIDE };
