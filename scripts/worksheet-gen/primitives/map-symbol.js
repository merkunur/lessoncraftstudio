/**
 * map-symbol.js — the G1-379 `maps` plan symbols (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §2 "NEW primitives/map-symbol.js").
 * Pure SVG on primitives/_tokens.js. Every symbol is a TOP VIEW (a thing seen from
 * above: a tree has no trunk, a tent is a dome disc with its seams) drawn in a
 * `0 0 44 44` viewBox centred on (22,22). No <text>, no letter, no digit — the key
 * WORD lives beside the symbol in the legend, never inside it. Greyscale is carried
 * by OUTLINE first and value second (qa/verify-map-symbols.js measures both on the
 * rendered pixels).
 *
 *   id          geometry (viewBox units)                                   greyscale read
 *   house       roof rect x 4..40 y 7..37 r 3; ridge x 22 white 2;        dark-light two-tone rect
 *               left half teal, right half tealSoft (a lit gable roof;
 *               === primitives/top-side-view.js topSideView('house','top'))
 *   tree        9-lobe scalloped ring (arcs r 7 centred on a circle r 15),  light disc, scalloped rim, textured
 *               tealSoft, teal 2; inner 3-lobe scallop r 6 teal 1
 *   bush        union of circles (15,25) r 11, (28,26) r 11, (22,15) r 10,  light, 3 smooth bumps, plain
 *               ONE merged outline teal 1.5, tealSoft, no texture
 *   pond        closed Catmull-Rom blob through the 7 design points, white, blob with waves
 *               teal 2.5; two wave strokes teal 1.5
 *   bench       rect x 4..40 y 17..27 r 3 ink; slats y 20.5 / 23.5 white 1.2 darkest thin bar
 *   tent        circle r 14 coral, ink 2; the seam X white 2.5             mid-grey disc, white X
 *   flowerBed   centre r 7 tealSoft teal 1.5; 6 coral dots r 4.5 at r 15    ring of dots
 *   bridge      (key form) tealSoft river stub y 15..29; two teal 3 rails    ][ over a light band
 *               y 12 / 32 x 9..35 with end flares
 *
 * API
 *   mapSymbol({ id, px = 44, x, y, attrs }) -> { svg, meta:{id, px} }
 *     px < 36 THROWS (the G2 floor; the design ships 40-48); an unknown id THROWS.
 *     With x/y the symbol is emitted as a NESTED <svg> placed at (x,y) (its top-left,
 *     in the caller's units) — the form islandMap embeds; without, a standalone root.
 *   symbolBody(id)  -> the inner markup (viewBox 44 units), for the gates
 *   unionOutline(circles) -> the path `d` of the union boundary of overlapping circles
 *   SYMBOL_IDS, VIEW (44)
 * Root: <svg data-lcs-prim="map-symbol" data-lcs-symbol="<id>" …>
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const T = tokens.color;
const VIEW = 44;
const MIN_PX = 36;
const SYMBOL_IDS = ['house', 'tree', 'bush', 'pond', 'bench', 'tent', 'flowerBed', 'bridge'];
const f2 = (v) => +(+v).toFixed(2);

/** Closed centripetal-ish Catmull-Rom (uniform, tension 0.5) through pts -> cubic path d. */
function closedCatmull(pts) {
  const n = pts.length;
  let d = `M${f2(pts[0][0])} ${f2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f2(c1[0])} ${f2(c1[1])} ${f2(c2[0])} ${f2(c2[1])} ${f2(p2[0])} ${f2(p2[1])}`;
  }
  return d + ' Z';
}

/**
 * The outer boundary of a union of circles [{x,y,r}] as arcs. Vertices are the pairwise
 * intersections not inside any other circle, walked by angle round the centroid; each
 * boundary arc belongs to the circle both its ends lie on whose arc midpoint is outside
 * every other circle.
 */
function unionOutline(circles) {
  const inside = (p, skip) => circles.some((c, k) => !skip.includes(k) && Math.hypot(p[0] - c.x, p[1] - c.y) < c.r - 1e-6);
  const verts = [];
  for (let i = 0; i < circles.length; i++) for (let j = i + 1; j < circles.length; j++) {
    const a = circles[i], b = circles[j];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    if (d >= a.r + b.r || d <= Math.abs(a.r - b.r)) continue;
    const l = (a.r * a.r - b.r * b.r + d * d) / (2 * d), h = Math.sqrt(a.r * a.r - l * l);
    const mx = a.x + (b.x - a.x) * l / d, my = a.y + (b.y - a.y) * l / d;
    for (const s of [1, -1]) {
      const p = [mx + s * h * (b.y - a.y) / d, my - s * h * (b.x - a.x) / d];
      if (!inside(p, [i, j])) verts.push({ p, on: [i, j] });
    }
  }
  if (!verts.length) throw new Error('map-symbol: unionOutline needs overlapping circles');
  const cx = circles.reduce((s, c) => s + c.x, 0) / circles.length, cy = circles.reduce((s, c) => s + c.y, 0) / circles.length;
  verts.sort((u, v) => Math.atan2(u.p[1] - cy, u.p[0] - cx) - Math.atan2(v.p[1] - cy, v.p[0] - cx));
  let d = `M${f2(verts[0].p[0])} ${f2(verts[0].p[1])}`;
  for (let k = 0; k < verts.length; k++) {
    const u = verts[k], v = verts[(k + 1) % verts.length];
    const shared = u.on.filter((c) => v.on.includes(c));
    let best = null;
    for (const ci of shared) {
      const c = circles[ci];
      // the clockwise (sweep 1, y-down) arc from u to v on circle ci: its midpoint
      let a0 = Math.atan2(u.p[1] - c.y, u.p[0] - c.x), a1 = Math.atan2(v.p[1] - c.y, v.p[0] - c.x);
      while (a1 <= a0) a1 += 2 * Math.PI;
      const am = (a0 + a1) / 2, mid = [c.x + c.r * Math.cos(am), c.y + c.r * Math.sin(am)];
      if (!inside(mid, [ci])) { best = { c, large: a1 - a0 > Math.PI ? 1 : 0 }; break; }
    }
    if (!best) throw new Error('map-symbol: unionOutline found no boundary arc');
    d += ` A${best.c.r} ${best.c.r} 0 ${best.large} 1 ${f2(v.p[0])} ${f2(v.p[1])}`;
  }
  return d + ' Z';
}

/** The tree crown: 9 arcs r 7 whose centres sit on a circle r 15. */
function scallopRing({ lobes = 9, ringR = 15, lobeR = 7, cx = 22, cy = 22 } = {}) {
  // + a centre disc r ringR so the crown is SOLID (the lobes alone leave a hole of r ~9)
  return unionOutline([{ x: cx, y: cy, r: ringR }, ...Array.from({ length: lobes }, (_, k) => ({
    x: cx + ringR * Math.cos(-Math.PI / 2 + k * 2 * Math.PI / lobes), y: cy + ringR * Math.sin(-Math.PI / 2 + k * 2 * Math.PI / lobes), r: lobeR,
  }))]);
}

const BUSH_CIRCLES = [{ x: 13.5, y: 28, r: 9.5 }, { x: 30.5, y: 28, r: 9.5 }, { x: 22, y: 18, r: 9 }];
const POND_PTS = [[6, 22], [14, 9], [30, 8], [39, 18], [36, 33], [20, 37], [8, 31]];

function symbolBody(id) {
  switch (id) {
    case 'house':
      return el('rect', { x: 4, y: 7, width: 36, height: 30, rx: 3, ry: 3, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 2 }) +
        el('path', { d: 'M7 7 L22 7 L22 37 L7 37 Q4 37 4 34 L4 10 Q4 7 7 7 Z', fill: T.teal }) +
        el('rect', { x: 4, y: 7, width: 36, height: 30, rx: 3, ry: 3, fill: 'none', stroke: T.teal, 'stroke-width': 2 }) +
        el('line', { x1: 22, y1: 8, x2: 22, y2: 36, stroke: T.white, 'stroke-width': 2 });
    case 'tree': {
      const inner = [90, 210, 330].map((a) => {
        const r = (a * Math.PI) / 180, cx = 22 + 5 * Math.cos(r), cy = 22 + 5 * Math.sin(r);
        const s = r + Math.PI / 2, e = r - Math.PI / 2;   // the outer half of each small circle
        return el('path', { d: `M${f2(cx + 6 * Math.cos(e))} ${f2(cy + 6 * Math.sin(e))} A6 6 0 0 1 ${f2(cx + 6 * Math.cos(s))} ${f2(cy + 6 * Math.sin(s))}`, fill: 'none', stroke: T.teal, 'stroke-width': 1, 'stroke-linecap': 'round' });
      }).join('');
      return el('path', { d: scallopRing(), fill: T.tealSoft, stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round', 'data-lcs-outline': 'scallop' }) + inner;
    }
    case 'bush':
      return el('path', { d: unionOutline(BUSH_CIRCLES), fill: T.tealSoft, stroke: T.teal, 'stroke-width': 1.5, 'stroke-linejoin': 'round', 'data-lcs-outline': 'bumps' });
    case 'pond':
      return el('path', { d: closedCatmull(POND_PTS), fill: T.white, stroke: T.teal, 'stroke-width': 2.5 }) +
        el('path', { d: 'M14 20 q4 -3 8 0 t8 0', fill: 'none', stroke: T.teal, 'stroke-width': 1.5, 'stroke-linecap': 'round' }) +
        el('path', { d: 'M14 27 q4 -3 8 0 t8 0', fill: 'none', stroke: T.teal, 'stroke-width': 1.5, 'stroke-linecap': 'round' });
    case 'bench':
      return el('rect', { x: 4, y: 17, width: 36, height: 10, rx: 3, ry: 3, fill: T.ink }) +
        el('line', { x1: 7, y1: 20.5, x2: 37, y2: 20.5, stroke: T.white, 'stroke-width': 1.2 }) +
        el('line', { x1: 7, y1: 23.5, x2: 37, y2: 23.5, stroke: T.white, 'stroke-width': 1.2 });
    case 'tent':
      return el('circle', { cx: 22, cy: 22, r: 14, fill: T.coral, stroke: T.ink, 'stroke-width': 2 }) +
        el('line', { x1: 12.1, y1: 12.1, x2: 31.9, y2: 31.9, stroke: T.white, 'stroke-width': 2.5, 'stroke-linecap': 'round' }) +
        el('line', { x1: 31.9, y1: 12.1, x2: 12.1, y2: 31.9, stroke: T.white, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
    case 'flowerBed':
      return [0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        return el('circle', { cx: f2(22 + 15 * Math.cos(r)), cy: f2(22 + 15 * Math.sin(r)), r: 4.5, fill: T.coral });
      }).join('') + el('circle', { cx: 22, cy: 22, r: 7, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 1.5 });
    case 'bridge':
      return el('rect', { x: 0, y: 15, width: 44, height: 14, fill: T.tealSoft }) +
        el('path', { d: 'M5 8 L9 12 L35 12 L39 8', fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) +
        el('path', { d: 'M5 36 L9 32 L35 32 L39 36', fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    default:
      throw new Error(`map-symbol: unknown id "${id}"`);
  }
}

function mapSymbol({ id, px = 44, x, y, attrs } = {}) {
  if (!SYMBOL_IDS.includes(id)) throw new Error(`map-symbol: unknown id "${id}"`);
  if (!(px >= MIN_PX)) throw new Error(`map-symbol: px ${px} < ${MIN_PX} (the floor)`);
  const body = symbolBody(id);
  const extra = { 'data-lcs-prim': 'map-symbol', 'data-lcs-symbol': id, ...(attrs || {}) };
  if (x != null && y != null) extra.x = f2(x), extra.y = f2(y);
  const svg = svgRoot({ width: f2(px), height: f2(px), viewBox: `0 0 ${VIEW} ${VIEW}`, label: '' }, body, extra);
  return { svg, meta: { id, px } };
}

module.exports = { mapSymbol, symbolBody, unionOutline, scallopRing, closedCatmull, SYMBOL_IDS, VIEW, MIN_PX, BUSH_CIRCLES, POND_PTS };
