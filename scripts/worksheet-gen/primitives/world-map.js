/**
 * world-map.js — the G1-379 `maps` world map (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3 "NEW primitives/world-map.js", step 9).
 * Pure SVG on primitives/_tokens.js over the GENERATED data/b5/world-map.js (Natural Earth
 * 1:110m land, Natural Earth I, central meridian 11° E; tools/build-world-map.js). Never a
 * hand-drawn continent, never a country border, never a graticule (a grid reads as coordinates).
 *
 *   card      cream; the projection OUTLINE (curved sides, flat crop lines) teal 2, the sea
 *             tealSoft inside it; land white ONE fill (a colour-coded map prints the grouping);
 *             coast teal 1.5 (artificial dateline / pole edges are filled, never stroked).
 *   crop      84° N .. −90° when the locale's set includes Antarctica (h = w x 327.6/639), else
 *             84° N .. −58° (h = w x 279.7/639; Antarctica and its islands are not drawn).
 *   cuts      a membership line (ink 1.5, dash 4 3, CLIPPED TO LAND) is drawn only between
 *             regions of DIFFERENT members of the locale's set: a merged America draws no Panama
 *             cut; Europe / Asia is drawn wherever the set separates them.
 *   markers   (F3 / F4) ONE style for continents and oceans (a style difference would print land
 *             vs sea): a white halo r 18 + a coral disc r 15 + a white Baloo 2 700 20 px numeral
 *             (the water-cycle marker recipe, re-declared here). A member spanning two regions
 *             shows its numeral on BOTH; the Pacific shows its numeral on its TWO discs. The
 *             Arctic, the Southern Ocean and Antarctica sit in the card's CORNER VOIDS with a
 *             teal 1.5 leader ending in a 4 px teal dot on the target.
 *
 * API
 *   worldMap({ w = 639, set, oceans = [], numbers = {}, data = WORLD_MAP })
 *     -> { svg, width, height, scale, anchors:{<member|ocean>:[{x,y,leader?}] (px)} }
 *     set = the locale's continentSet [{id, regions}]; antarctica is drawn iff a member holds the
 *     'antarctica' region; oceans ⊆ the ocean ids; numbers = {<member|ocean id>: n} (markers are
 *     drawn only for ids carrying a number). w < 480 THROWS; an unknown region / ocean THROWS;
 *     'southern' without antarctica THROWS.
 * Root: <svg data-lcs-prim="world-map" data-lcs-crop="-90|-58" data-lcs-hash>
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { WORLD_MAP } = require('../data/b5/world-map.js');

const T = tokens.color;
const F = tokens.font;
const MIN_W = 480;
const REGIONS = ['northAmerica', 'southAmerica', 'europe', 'asia', 'africa', 'oceania', 'antarctica'];
const OCEAN_IDS = ['pacific', 'atlantic', 'indian', 'arctic', 'southern'];
const LEADER_IDS = ['arctic', 'southern', 'antarctica'];
const f2 = (v) => +(+v).toFixed(2);

function pairs(flat) { const out = []; for (let i = 0; i < flat.length; i += 2) out.push([flat[i], flat[i + 1]]); return out; }
function ringD(flat) { const p = pairs(flat); return 'M' + p.map(([x, y]) => `${x} ${y}`).join('L') + 'Z'; }
/** the stroked coast: the ring's edges minus the artificial ones, as open sub-paths */
function coastD(flat, art) {
  const p = pairs(flat), n = p.length, bad = new Set(art);
  if (!bad.size) return ringD(flat);
  let d = '', open = false;
  const start = art[art.length - 1] + 1;
  for (let k = 0; k < n; k++) {
    const i = (start + k) % n, j = (i + 1) % n;
    if (bad.has(i)) { open = false; continue; }
    if (!open) { d += `M${p[i][0]} ${p[i][1]}`; open = true; }
    d += `L${p[j][0]} ${p[j][1]}`;
  }
  return d;
}

function worldMap({ w = 639, set, oceans = [], numbers = {}, data = WORLD_MAP } = {}) {
  if (!(w >= MIN_W)) throw new Error(`world-map: w ${w} < ${MIN_W}`);
  if (!Array.isArray(set) || !set.length) throw new Error('world-map: no continent set');
  const regionOf = {};
  for (const m of set) for (const r of m.regions) {
    if (!REGIONS.includes(r)) throw new Error(`world-map: unknown region "${r}"`);
    if (regionOf[r]) throw new Error(`world-map: region ${r} in two members`);
    regionOf[r] = m.id;
  }
  for (const oc of oceans) if (!OCEAN_IDS.includes(oc)) throw new Error(`world-map: unknown ocean "${oc}"`);
  const antarctica = !!regionOf.antarctica;
  if (oceans.includes('southern') && !antarctica) throw new Error('world-map: the Southern Ocean needs Antarctica drawn');
  const H = antarctica ? data.view.hAntarctica : data.view.hNoAntarctica;
  const scale = w / data.view.w;   // px per unit
  const height = f2(H * scale);
  const U = (px) => f2(px / scale);   // px -> units
  const parts = [];
  const clipLand = `wm-land-${antarctica ? 'a' : 'n'}`;
  const landRings = data.rings.filter((r) => antarctica || r.region !== 'antarctica');
  const landD = landRings.map((r) => ringD(r.pts) + r.holes.map((h) => ringD(h.pts)).join('')).join('') + (antarctica ? ringD(data.antarctica.pts) : '');
  const outline = ringD(antarctica ? data.outline.antarctica : data.outline.none);
  parts.push(el('defs', {}, el('clipPath', { id: clipLand }, el('path', { d: landD, 'clip-rule': 'evenodd' }))));
  parts.push(el('rect', { x: 0, y: 0, width: data.view.w, height: f2(H), fill: T.cream, 'data-lcs-card': '' }));
  parts.push(el('path', { d: outline, fill: T.tealSoft, 'data-lcs-sea': '' }));
  parts.push(el('path', { d: landD, fill: T.white, 'fill-rule': 'evenodd', 'data-lcs-land': '' }));
  const coast = landRings.map((r) => coastD(r.pts, r.art) + r.holes.map((h) => coastD(h.pts, h.art)).join('')).join('') + (antarctica ? coastD(data.antarctica.pts, data.antarctica.art) : '');
  parts.push(el('path', { d: coast, fill: 'none', stroke: T.teal, 'stroke-width': U(1.5), 'stroke-linejoin': 'round', 'data-lcs-coast': '' }));
  // cuts between DIFFERENT members only, clipped to land
  const cuts = [];
  for (const [k, c] of Object.entries(data.cuts)) {
    const [a, b] = c.regions;
    if (!regionOf[a] || !regionOf[b] || regionOf[a] === regionOf[b]) continue;
    cuts.push(el('path', { d: 'M' + pairs(c.pts).map(([x, y]) => `${x} ${y}`).join('L'), fill: 'none', stroke: T.ink, 'stroke-width': U(1.5), 'stroke-dasharray': `${U(4)} ${U(3)}`, 'data-lcs-cut': k }));
  }
  if (cuts.length) parts.push(el('g', { 'clip-path': `url(#${clipLand})` }, cuts.join('')));
  parts.push(el('path', { d: outline, fill: 'none', stroke: T.teal, 'stroke-width': U(2), 'data-lcs-outline': '' }));
  // markers
  const anchors = {};
  const marker = (id, n, x, y, extra) => el('g', { 'data-lcs-marker': id, 'data-lcs-n': n, ...(extra || {}) },
    el('circle', { cx: x, cy: y, r: U(18), fill: T.white }) + el('circle', { cx: x, cy: y, r: U(15), fill: T.coral }) +
    el('text', { x, y: f2(y + U(1)), 'font-family': `${F.display}, cursive`, 'font-size': U(20), 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(n)));
  const leader = (id, n) => {
    const L = data.leaders[id];
    const dx = L.target.x - L.disc.x, dy = L.target.y - L.disc.y, d = Math.hypot(dx, dy);
    const sx = f2(L.disc.x + (dx / d) * U(18)), sy = f2(L.disc.y + (dy / d) * U(18));
    anchors[id] = [{ x: f2(L.disc.x * scale), y: f2(L.disc.y * scale), leader: { x: f2(L.target.x * scale), y: f2(L.target.y * scale) } }];
    return el('g', { 'data-lcs-leader': id },
      el('line', { x1: sx, y1: sy, x2: L.target.x, y2: L.target.y, stroke: T.teal, 'stroke-width': U(1.5), 'stroke-linecap': 'round' }) +
      el('circle', { cx: L.target.x, cy: L.target.y, r: U(2), fill: T.teal, 'data-lcs-leader-dot': id })) + marker(id, n, L.disc.x, L.disc.y, { 'data-lcs-via-leader': '' });
  };
  const marks = [];
  for (const m of set) {
    const n = numbers[m.id];
    if (n == null) continue;
    anchors[m.id] = [];
    for (const r of m.regions) {
      if (r === 'antarctica') { marks.push(leader('antarctica', n)); anchors[m.id] = anchors.antarctica; continue; }
      const a = data.anchors[r];
      if (!a) throw new Error(`world-map: no anchor for ${r}`);
      marks.push(marker(m.id, n, a.x, a.y, { 'data-lcs-region': r }));
      anchors[m.id].push({ x: f2(a.x * scale), y: f2(a.y * scale), region: r });
    }
  }
  for (const oc of oceans) {
    const n = numbers[oc];
    if (n == null) continue;
    if (LEADER_IDS.includes(oc)) { marks.push(leader(oc, n)); continue; }
    anchors[oc] = [];
    for (const a of data.oceans[oc]) { marks.push(marker(oc, n, a.x, a.y, { 'data-lcs-ocean': oc })); anchors[oc].push({ x: f2(a.x * scale), y: f2(a.y * scale) }); }
  }
  parts.push(...marks);
  const svg = svgRoot({ width: w, height, viewBox: `0 0 ${data.view.w} ${f2(H)}`, label: '' }, parts.join(''),
    { 'data-lcs-prim': 'world-map', 'data-lcs-crop': antarctica ? -90 : -58, 'data-lcs-hash': data.hash, style: 'display:block' });
  return { svg, width: w, height, scale, anchors };
}

module.exports = { worldMap, REGIONS, OCEAN_IDS, MIN_W };
