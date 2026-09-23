/**
 * island-map.js — the G1-379 `maps` island plate (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §2 "NEW primitives/island-map.js").
 * Pure SVG on primitives/_tokens.js; ONE invented wordless island (data/b5/island.js
 * ISLE_1) drawn strictly FROM ABOVE: a white island in a tealSoft sea with a grid-1.5
 * wave hatch, a road coast to coast, a river from its spring to the sea, 0..2 dashed
 * footpaths, a bridge at every path/river crossing, the plan symbols of
 * primitives/map-symbol.js on committed slots, and (base) a north arrow carrying the
 * locale's own N letter in the top-right sea. No grid line, no edge label, no word.
 *
 * API
 *   islandMap({ w = 615, symbols = [{id, x, y}], footpaths = [], northArrow = {letter} | null,
 *               symPx = 44, isle = ISLE_1, attrs }) -> { svg, width, height, scale, meta }
 *     w < 480 THROWS; an unknown footpath THROWS; a symbol id outside map-symbol THROWS; a
 *     symbol centre outside the coast THROWS. Bridges are DERIVED, never passed: slot A (the
 *     road) always, B / C iff their footpath is drawn (a footpath is drawn IFF its bridge is).
 *     Each bridge is stamped data-lcs-sym="bridge" data-lcs-slot="A|B|C" — so a count of
 *     [data-lcs-sym=bridge] IS the number of bridges on the map.
 *     meta: { bridges:{A:{x,y,angle},…} (units), symbols:[{id,x,y}] , arrow:{x,y,w,h} | null }
 *   islandGeometry(isle) -> the sampled polylines the drawing AND the gates use:
 *     { coast (closed polygon), river, road, paths:{P1,P2}, crossings:{A,B,C} }
 *   pointInPoly(p, poly), distToPolyline(p, pl, closed), polylineCrossings(a, b, closedB)
 *   slotKey(symPx, w) -> 's44w615' (the ISLE_1.slots key)
 * Root: <svg data-lcs-prim="island-map" data-lcs-isle data-lcs-w data-lcs-sym-px class="mp-field-svg">
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { symbolBody, SYMBOL_IDS, VIEW: SYM_VIEW } = require('./map-symbol.js');
const { ISLE_1 } = require('../data/b5/island.js');

const T = tokens.color;
const F = tokens.font;
const MIN_W = 480;
const f2 = (v) => +(+v).toFixed(2);

/* ------------------------------------------------------------------ geometry */
/** Centripetal Catmull-Rom (alpha 0.5, Barry-Goldman) sampled at `per` points per segment. */
function sampleCR(pts, closed, per = 14) {
  const P = closed ? pts : [[2 * pts[0][0] - pts[1][0], 2 * pts[0][1] - pts[1][1]], ...pts, [2 * pts[pts.length - 1][0] - pts[pts.length - 2][0], 2 * pts[pts.length - 1][1] - pts[pts.length - 2][1]]];
  const n = P.length;
  const at = (i) => P[((i % n) + n) % n];
  const segs = closed ? n : n - 3;
  const out = [];
  const tj = (ti, a, b) => ti + Math.pow(Math.hypot(b[0] - a[0], b[1] - a[1]), 0.5);
  for (let s = 0; s < segs; s++) {
    const i = closed ? s : s + 1;
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const t0 = 0, t1 = tj(t0, p0, p1), t2 = tj(t1, p1, p2), t3 = tj(t2, p2, p3);
    for (let k = 0; k < per; k++) {
      const t = t1 + (t2 - t1) * k / per;
      const L = (pa, pb, ta, tb) => [((tb - t) * pa[0] + (t - ta) * pb[0]) / (tb - ta), ((tb - t) * pa[1] + (t - ta) * pb[1]) / (tb - ta)];
      const A1 = L(p0, p1, t0, t1), A2 = L(p1, p2, t1, t2), A3 = L(p2, p3, t2, t3);
      const B1 = L(A1, A2, t0, t2), B2 = L(A2, A3, t1, t3);
      out.push(L(B1, B2, t1, t2));
    }
  }
  if (!closed) out.push(pts[pts.length - 1].slice());
  return out.map(([x, y]) => [f2(x), f2(y)]);
}
function pointInPoly(p, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function distSeg(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
  const t = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2)) : 0;
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}
function distToPolyline(p, pl, closed) {
  let d = Infinity;
  for (let i = 0; i < pl.length - 1; i++) d = Math.min(d, distSeg(p, pl[i], pl[i + 1]));
  if (closed) d = Math.min(d, distSeg(p, pl[pl.length - 1], pl[0]));
  return d;
}
function segX(a, b, c, d) {
  const r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c[0], d[1] - c[1]];
  const den = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(den) < 1e-12) return null;
  const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den, u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { p: [a[0] + t * r[0], a[1] + t * r[1]], angle: Math.atan2(r[1], r[0]) };
}
/** Every crossing of polyline a with polyline b (b closed if closedB). */
function polylineCrossings(a, b, closedB) {
  const out = [];
  const bs = closedB ? [...b, b[0]] : b;
  for (let i = 0; i < a.length - 1; i++) for (let j = 0; j < bs.length - 1; j++) {
    const x = segX(a[i], a[i + 1], bs[j], bs[j + 1]);
    if (x) out.push({ ...x, i });
  }
  return out;
}
function extendEnds(pl, by) {
  const [a, b] = [pl[0], pl[1]], [c, d] = [pl[pl.length - 2], pl[pl.length - 1]];
  const u = (p, q) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / L, (q[1] - p[1]) / L]; };
  const s = u(b, a), e = u(c, d);
  return [[f2(a[0] + s[0] * by), f2(a[1] + s[1] * by)], ...pl, [f2(d[0] + e[0] * by), f2(d[1] + e[1] * by)]];
}

const _geo = new Map();
function islandGeometry(isle = ISLE_1) {
  if (_geo.has(isle.id)) return _geo.get(isle.id);
  const coast = sampleCR(isle.coast, true, 16);
  const river = sampleCR(isle.river.pts, false, 16);
  const road = extendEnds(sampleCR(isle.road.pts, false, 16), 24);   // the drawn road runs INTO the coast at both ends
  const paths = Object.fromEntries(Object.entries(isle.footpaths).map(([k, v]) => [k, sampleCR(v.pts, false, 16)]));
  const cross = (pl) => { const c = polylineCrossings(pl, river, false); return c.length ? { x: f2(c[0].p[0]), y: f2(c[0].p[1]), angle: c[0].angle, n: c.length } : null; };
  const crossings = { A: cross(road), B: cross(paths.P1), C: cross(paths.P2) };
  const g = { coast, river, road, paths, crossings };
  _geo.set(isle.id, g);
  return g;
}
function slotKey(symPx, w) { return `s${symPx}w${w}`; }
const toD = (pl, closed) => 'M' + pl.map(([x, y]) => `${x} ${y}`).join(' L') + (closed ? ' Z' : '');

/* ------------------------------------------------------------------ drawing */
function bridgeMark(slot, c, halfW) {
  const cos = Math.cos(c.angle), sin = Math.sin(c.angle);
  const L = 16;   // half of band 18 + 14 = 32 along the crossing line
  const P = (a, b) => `${f2(c.x + a * cos - b * sin)} ${f2(c.y + a * sin + b * cos)}`;
  const rail = (s) => `M${P(-L - 5, s * (halfW + 7))} L${P(-L, s * halfW)} L${P(L, s * halfW)} L${P(L + 5, s * (halfW + 7))}`;
  const deck = `M${P(-L, -halfW)} L${P(L, -halfW)} L${P(L, halfW)} L${P(-L, halfW)} Z`;
  return el('g', { 'data-lcs-sym': 'bridge', 'data-lcs-slot': slot, 'data-lcs-x': c.x, 'data-lcs-y': c.y },
    el('path', { d: deck, fill: T.white }) +
    el('path', { d: rail(-1), fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) +
    el('path', { d: rail(1), fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
}

function northArrowSvg(box, letter) {
  const { x, y } = box;
  return el('g', { 'data-lcs-north': letter, transform: `translate(${x} ${y})` },
    el('path', { d: 'M20 26 L20 48 L10 54 Z', fill: T.teal }) +
    el('path', { d: 'M20 26 L30 54 L20 48 Z', fill: T.white }) +
    el('path', { d: 'M20 26 L30 54 L20 48 L10 54 Z', fill: 'none', stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
    el('circle', { cx: 20, cy: 12, r: 12, fill: T.white, stroke: T.teal, 'stroke-width': 1.5 }) +
    el('text', { x: 20, y: 13, 'font-family': `${F.display}, cursive`, 'font-size': 18, 'font-weight': 700, fill: T.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-north-letter': letter }, letter));
}

function seaHatch(isle, coast) {
  const out = [];
  for (let row = 0, y = 20; y < isle.view.h; row++, y += 48) {
    for (let x = (row % 2 ? 32 : 0) + 6; x < isle.view.w - 20; x += 64) {
      const pts = [[x, y], [x + 10, y - 2], [x + 20, y]];
      if (pts.some((p) => pointInPoly(p, coast) || distToPolyline(p, coast, true) < 14)) continue;
      if (isle.arrow && x + 20 >= isle.arrow.x - 6 && y >= isle.arrow.y - 6 && y <= isle.arrow.y + isle.arrow.h + 6) continue;
      out.push(`M${x} ${y} q5 -4 10 0 t10 0`);
    }
  }
  return el('path', { d: out.join(' '), fill: 'none', stroke: T.grid, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'data-lcs-hatch': '' });
}

function islandMap({ w = 615, symbols = [], footpaths = [], northArrow = null, symPx = 44, isle = ISLE_1, attrs } = {}) {
  if (!(w >= MIN_W)) throw new Error(`island-map: w ${w} < ${MIN_W}`);
  for (const fp of footpaths) if (!isle.footpaths[fp]) throw new Error(`island-map: unknown footpath "${fp}"`);
  const g = islandGeometry(isle);
  const scale = w / isle.view.w;
  const height = f2(isle.view.h * scale);
  const s = symPx / scale;   // the symbol box in island units
  const clipId = `mp-clip-${isle.id}`;
  const parts = [];
  parts.push(el('defs', {}, el('clipPath', { id: clipId }, el('path', { d: toD(g.coast, true) }))));
  parts.push(el('rect', { x: 0, y: 0, width: isle.view.w, height: isle.view.h, fill: T.tealSoft, 'data-lcs-sea': '' }));
  parts.push(seaHatch({ ...isle, arrow: northArrow ? isle.arrow : null }, g.coast));
  parts.push(el('path', { d: toD(g.coast, true), fill: T.white, 'data-lcs-land': '' }));
  // lines, clipped to the island
  const lines = [];
  const riverD = toD(g.river, false);
  lines.push(el('path', { d: riverD, fill: 'none', stroke: T.teal, 'stroke-width': isle.river.band + 3, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' }));
  lines.push(el('path', { d: riverD, fill: 'none', stroke: T.tealSoft, 'stroke-width': isle.river.band, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round', 'data-lcs-river': '' }));
  const roadD = toD(g.road, false);
  lines.push(el('path', { d: roadD, fill: 'none', stroke: T.teal, 'stroke-width': isle.road.width + 3, 'stroke-linejoin': 'round' }));
  lines.push(el('path', { d: roadD, fill: 'none', stroke: T.white, 'stroke-width': isle.road.width, 'stroke-linejoin': 'round', 'data-lcs-road': '' }));
  for (const fp of footpaths) lines.push(el('path', { d: toD(g.paths[fp], false), fill: 'none', stroke: T.ink, 'stroke-width': 2, 'stroke-dasharray': '6 5', 'stroke-linecap': 'round', 'data-lcs-path': fp }));
  parts.push(el('g', { 'clip-path': `url(#${clipId})` }, lines.join('')));
  // the spring
  const sp = isle.river.pts[0];
  parts.push(el('circle', { cx: sp[0], cy: sp[1], r: isle.river.springR, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 1.5, 'data-lcs-spring': '' }));
  // bridges (derived)
  const bridges = { A: g.crossings.A };
  for (const fp of footpaths) bridges[isle.footpaths[fp].bridge] = g.crossings[isle.footpaths[fp].bridge];
  for (const [slot, c] of Object.entries(bridges)) {
    if (!c) throw new Error(`island-map: bridge slot ${slot} has no river crossing`);
    parts.push(bridgeMark(slot, c, slot === 'A' ? isle.road.width / 2 + 3 : 6));
  }
  parts.push(el('path', { d: toD(g.coast, true), fill: 'none', stroke: T.teal, 'stroke-width': 3 / scale * 1, 'stroke-linejoin': 'round', 'data-lcs-coast': '' }));
  // symbols
  for (const sym of symbols) {
    if (!SYMBOL_IDS.includes(sym.id) || sym.id === 'bridge') throw new Error(`island-map: symbol "${sym.id}" cannot be placed (bridges are derived)`);
    if (!pointInPoly([sym.x, sym.y], g.coast)) throw new Error(`island-map: symbol ${sym.id} at (${sym.x},${sym.y}) is off the island`);
    parts.push(el('svg', { x: f2(sym.x - s / 2), y: f2(sym.y - s / 2), width: f2(s), height: f2(s), viewBox: `0 0 ${SYM_VIEW} ${SYM_VIEW}`, 'data-lcs-sym': sym.id, 'data-lcs-x': sym.x, 'data-lcs-y': sym.y }, symbolBody(sym.id)));
  }
  if (northArrow) parts.push(northArrowSvg(isle.arrow, northArrow.letter));
  const svg = svgRoot({ width: f2(w), height, viewBox: `0 0 ${isle.view.w} ${isle.view.h}`, label: '' }, parts.join(''),
    { 'data-lcs-prim': 'island-map', 'data-lcs-isle': isle.id, 'data-lcs-w': w, 'data-lcs-sym-px': symPx, style: 'display:block', ...(attrs || {}) });
  return { svg, width: w, height, scale, meta: { bridges, symbols: symbols.map((x) => ({ ...x })), arrow: northArrow ? { ...isle.arrow } : null, symUnits: s } };
}

module.exports = { islandMap, islandGeometry, sampleCR, pointInPoly, distToPolyline, polylineCrossings, slotKey, MIN_W, ISLE_1 };
