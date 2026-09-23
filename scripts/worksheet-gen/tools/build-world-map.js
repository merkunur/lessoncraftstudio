#!/usr/bin/env node
/**
 * build-world-map.js — the G1-379 `maps` world-map data pipeline (design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3 "NEW primitives/world-map.js + the world-map
 * data pipeline", steps 1-8). Plain Node, no dependency: parse, project, simplify, rasterise.
 *
 *   node scripts/worksheet-gen/tools/build-world-map.js            rebuild data/b5/world-map.js
 *   node scripts/worksheet-gen/tools/build-world-map.js --check    rebuild in memory, exit 1 if the
 *                                                                  committed module differs
 *   node scripts/worksheet-gen/tools/build-world-map.js --opened="<who>"
 *        record that a human OPENED the renders of the CURRENT geometry (mapOpened:{by, date,
 *        hash}); the family gate FAILS a module whose mapOpened is absent or whose hash is stale
 *
 * 1 SOURCE   Natural Earth 1:110m physical land (public domain), vendored ONCE at
 *            tools/vendor/ne_110m_land.geojson (github.com/nvkelso/natural-earth-vector, tag
 *            v5.1.2, geojson/ne_110m_land.geojson); its SHA-256 goes into the module header.
 *            The Caspian IS a hole of the Eurasia ring in this layer (measured), so no lakes layer
 *            is vendored. No country layer, no country border anywhere.
 * 2 PROJECT  Natural Earth I (Šavrič, Jenny, Patterson, Petrovič, Hurni 2011), central meridian
 *            11° E, λ = lon − 11° wrapped to (−180, 180]; seam at 169° W (the Bering Strait: Cape
 *            Dezhnev goes right with Asia, Cape Prince of Wales stays left). The tool ASSERTS no kept
 *            ring crosses the seam except Antarctica, which is closed along the pole line.
 * 3 SCALE    viewBox units: 2000 across the equator (1 unit = 639/2000 px at w 639); crop north
 *            84° N; crop south −90° with Antarctica, −58° without.
 * 4 ISLANDS  keep a ring iff its spherical area >= 20,000 km² or it is on the KEEP list; the
 *            dropped list is printed.
 * 5 SIMPLIFY Douglas-Peucker in projected space, ε = 0.8 px at 639 (2.504 units); edges along
 *            the source dateline (±180°) and the pole are ARTIFICIAL: chains are simplified
 *            between them, and artificial edges are never stroked (no seam line in Chukotka).
 * 6 REGIONS  the land is rasterised at 4 x 639 px; the three CUT polylines are barriers; each
 *            land component is flood-filled from its seed city; islands take the OVERRIDE table,
 *            the rest the nearest labelled land. The three cut polylines are stored WHOLE (the
 *            primitive clips them to land); the region raster itself is NOT stored — the gate
 *            re-derives it from the drawn map (qa/verify-world-map.js).
 * 7 ANCHORS  a continent's disc (r 15 + halo 3 = 18 px) sits on the pole of inaccessibility of
 *            its region's largest component: overlapping its own coast by <= 5 px, never another
 *            region's land. Oceans at the design's defaults, verified on water >= 6 px off the
 *            coast in BOTH the simplified and the source layer (else a 10° box search).
 * 8 LEADERS  the Arctic, the Southern Ocean and Antarctica: a disc in a CORNER VOID of the card
 *            (outside the projection outline) + a teal leader ending in a 4 px dot on the target.
 *
 * DEVIATION (measured; _work/G1-379-build.md): each cut is extended into open water at both ends so
 * it separates the land it crosses (the design's end points sit on the coast).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = path.join(__dirname, 'vendor', 'ne_110m_land.geojson');
const OUT = path.join(__dirname, '..', 'data', 'b5', 'world-map.js');
const SOURCE_TAG = 'natural-earth-vector v5.1.2 geojson/ne_110m_land.geojson';
const D2R = Math.PI / 180;
const R_EARTH = 6371;

const DEFAULTS = {
  lon0: 11, cropN: 84, cropS: -90, cropSNoAnt: -58, dpPx: 0.8, W: 2000, pxW: 639, minArea: 20000,
};
const XMAX = Math.PI * 0.8707;   // the equator half-width in projection units
const U = (o) => o.W / (2 * XMAX);   // units per projection unit

/** Natural Earth I (closed form) — φ, λ in radians. */
function ne1(lam, phi) {
  const p2 = phi * phi, p4 = p2 * p2, p6 = p4 * p2, p8 = p4 * p4, p10 = p8 * p2, p12 = p6 * p6;
  return [lam * (0.870700 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p10 - 0.001529 * p12),
    phi * (1.007226 + 0.015085 * p2 - 0.044475 * p6 + 0.028874 * p8 - 0.005916 * p10)];
}
function wrapLam(lon, lon0) { let l = lon - lon0; while (l <= -180) l += 360; while (l > 180) l -= 360; return l; }
function makeProject(o) {
  const u = U(o), yTop = ne1(0, o.cropN * D2R)[1];
  return (lon, lat, forceLam) => {
    const lam = forceLam != null ? forceLam : wrapLam(lon, o.lon0);
    const [x, y] = ne1(lam * D2R, lat * D2R);
    return [o.W / 2 + x * u, (yTop - y) * u];
  };
}
function heightUnits(o, cropS) { return (ne1(0, o.cropN * D2R)[1] - ne1(0, cropS * D2R)[1]) * U(o); }

function sphArea(r) {
  let s = 0;
  for (let i = 0; i < r.length - 1; i++) { const [l1, p1] = r[i], [l2, p2] = r[i + 1]; s += (l2 - l1) * D2R * (2 + Math.sin(p1 * D2R) + Math.sin(p2 * D2R)); }
  return Math.abs((s * R_EARTH * R_EARTH) / 2);
}
function pipLL(p, ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

/** The KEEP list (§3 step 4) by a point inside each island. */
const KEEP = {
  'Great Britain': [-2, 54], Ireland: [-8, 53.3], Iceland: [-19, 65], Madagascar: [47, -19], 'Sri Lanka': [80.7, 7.8],
  Tasmania: [146.6, -42], Sicily: [14, 37.5], Sardinia: [9, 40], Cuba: [-79, 21.8], Hispaniola: [-71, 19], Taiwan: [121, 23.7],
  Hainan: [109.8, 19.2], Hokkaido: [143, 43.5], Honshu: [138, 36], Kyushu: [131, 32.7], Borneo: [114, 1], Sumatra: [101.5, 0],
  Sulawesi: [120.4, -2.5], Java: [110, -7.3], 'New Guinea': [140, -5], 'NZ North': [175.5, -38.5], 'NZ South': [170, -44],
};
/** §3 step 6 island overrides (a point inside each) — the rest take the nearest labelled land. */
const OVERRIDE = {
  northAmerica: { Greenland: [-42, 72], Cuba: [-79, 21.8], Hispaniola: [-71, 19], Baffin: [-72, 68] },
  europe: { Iceland: [-19, 65], 'Great Britain': [-2, 54], Ireland: [-8, 53.3], Svalbard: [16, 78.5], 'Novaya Zemlya': [55.5, 72.5], Sicily: [14, 37.5], Sardinia: [9, 40] },
  africa: { Madagascar: [47, -19] },
  asia: { Honshu: [138, 36], Hokkaido: [143, 43.5], Kyushu: [131, 32.7], Shikoku: [133.6, 33.6], 'Sri Lanka': [80.7, 7.8], Taiwan: [121, 23.7], Hainan: [109.8, 19.2], Sakhalin: [143, 50], Borneo: [114, 1], Sumatra: [101.5, 0], Sulawesi: [120.4, -2.5], Java: [110, -7.3], Timor: [125.5, -9.2] },
  oceania: { 'New Guinea': [140, -5], Tasmania: [146.6, -42], 'NZ North': [175.5, -38.5], 'NZ South': [170, -44] },
};
const SEEDS = { europe: [2.35, 48.85], asia: [116.4, 39.9], africa: [31.24, 30.04], northAmerica: [-87.6, 41.9], southAmerica: [-47.9, -15.8], oceania: [133.9, -23.7], antarctica: [0, -89] };
/** §3 step 6 cuts (lon, lat), each extended into open water at both ends (deviation). */
const CUTS = {
  europeAsia: [[67.5, 70.3], [66.0, 69.0], [60.0, 67.0], [59.5, 64.0], [59.0, 61.0], [59.5, 58.0], [59.0, 55.0], [59.0, 52.0], [58.6, 51.2], [55.0, 51.5], [52.0, 51.2], [51.4, 50.0], [51.9, 47.1], [50.5, 45.0], [48.5, 41.8],
    [46.5, 42.6], [43.5, 43.2], [40.0, 43.4], [37.5, 43.2], [31.0, 42.3], [29.3, 41.6], [29.05, 41.15], [29.05, 40.95], [28.0, 40.7], [26.7, 40.35], [26.2, 40.0], [25.6, 39.7]],
  americas: [[-76.6, 9.6], [-77.2, 8.7], [-77.9, 7.2], [-78.4, 6.4]],
  africaAsia: [[32.3, 31.9], [32.3, 31.3], [32.6, 29.9], [32.7, 29.3]],
};
const CUT_REGIONS = { europeAsia: ['europe', 'asia'], americas: ['northAmerica', 'southAmerica'], africaAsia: ['africa', 'asia'] };
const OCEANS = { pacific: [[-145, 5], [170, 5]], atlantic: [[-35, 15]], indian: [[78, -22]] };
const LEADERS = { arctic: { void: 'topLeft', target: [-155, 77] }, southern: { void: 'bottomLeft', target: [-130, -62] }, antarctica: { void: 'bottomRight', target: [140, -80] } };
const REGIONS = ['northAmerica', 'southAmerica', 'europe', 'asia', 'africa', 'oceania', 'antarctica'];
const DISC_R_PX = 18;   // coral r 15 + white halo 3

/* ------------------------------------------------------------ Douglas-Peucker */
function dp(pts, eps) {
  if (pts.length < 3) return pts.slice();
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let best = -1, bi = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    for (let i = a + 1; i < b; i++) {
      const d = L ? Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / L : Math.hypot(pts[i][0] - x1, pts[i][1] - y1);
      if (d > best) { best = d; bi = i; }
    }
    if (best > eps) { keep[bi] = 1; stack.push([a, bi], [bi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

/* ------------------------------------------------------------ build */
function build(opts = {}) {
  const o = { ...DEFAULTS, ...opts };
  const raw = fs.readFileSync(SRC);
  const sha = crypto.createHash('sha256').update(raw).digest('hex');
  const gj = JSON.parse(raw.toString('utf8'));
  const P = makeProject(o);
  const eps = (o.dpPx * o.W) / o.pxW;
  const log = [];
  // 1. rings with their holes; area filter
  const src = [];
  for (const f of gj.features) {
    const g = f.geometry, polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) src.push({ outer: poly[0], holes: poly.slice(1) });
  }
  const kept = [], dropped = [];
  for (const r of src) {
    const a = sphArea(r.outer);
    const keepName = Object.entries(KEEP).find(([, p]) => pipLL(p, r.outer));
    const isAnt = r.outer.some((p) => p[1] <= -89.9);
    if (a >= o.minArea || keepName || isAnt) kept.push({ ...r, area: a, name: keepName ? keepName[0] : null, antarctica: isAnt });
    else dropped.push({ area: Math.round(a), at: centroidLL(r.outer) });
  }
  // 2. project; seam; artificial edges
  const rings = [];
  let antRing = null;
  for (const r of kept) {
    if (r.antarctica) { antRing = r; continue; }
    const lams = r.outer.map((p) => wrapLam(p[0], o.lon0));
    for (let i = 0; i < lams.length - 1; i++) if (Math.abs(lams[i + 1] - lams[i]) > 180) throw new Error(`build-world-map: a ring near ${centroidLL(r.outer)} crosses the seam at lon ${o.lon0 - 180}° (only Antarctica may)`);
    const addRing = (ll, hole) => {
      const pts = ll.map(([lon, lat]) => P(lon, lat));
      const art = ll.map((p, i) => { const q = ll[(i + 1) % ll.length]; return Math.abs(p[0]) >= 179.999 && Math.abs(q[0]) >= 179.999 && Math.sign(p[0]) === Math.sign(q[0]); });
      return { pts, art, hole };
    };
    const ring = addRing(r.outer.slice(0, -1), false);
    ring.holes = r.holes.map((h) => addRing(h.slice(0, -1), true));
    ring.area = r.area; ring.name = r.name; ring.ll = r.outer;
    rings.push(ring);
  }
  if (!antRing) throw new Error('build-world-map: no Antarctica ring in the source');
  const ant = antarcticaRing(antRing.outer, o, P);
  // 3. simplify (chains between artificial edges; closed rings split at two far points)
  const simp = (ring) => {
    const n = ring.pts.length;
    if (!ring.art.some(Boolean)) {
      let far = 0, fd = -1;
      for (let i = 1; i < n; i++) { const d = Math.hypot(ring.pts[i][0] - ring.pts[0][0], ring.pts[i][1] - ring.pts[0][1]); if (d > fd) { fd = d; far = i; } }
      const a = dp(ring.pts.slice(0, far + 1), eps), b = dp([...ring.pts.slice(far), ring.pts[0]], eps);
      return { pts: [...a, ...b.slice(1, -1)], art: new Array(a.length + b.length - 2).fill(false) };
    }
    // rotate so an artificial edge ends the list, then simplify each real chain
    const start = ring.art.findIndex(Boolean);
    const idx = [...Array(n).keys()].map((k) => (start + 1 + k) % n);
    const out = [], art = [];
    let chain = [idx[0]];
    for (let k = 1; k <= n; k++) {
      const prev = idx[k - 1];
      if (ring.art[prev] || k === n) {
        const c = dp(chain.map((i) => ring.pts[i]), eps);
        c.forEach((p, j) => { out.push(p); art.push(j === c.length - 1 ? !!ring.art[prev] : false); });
        if (k < n) chain = [idx[k]];
      } else chain.push(idx[k]);
    }
    return { pts: out, art };
  };
  const q = (p) => [Math.round(p[0]), Math.round(p[1])];
  const polys = [];
  const minPts = [];
  for (const r of rings) {
    const s = simp(r);
    const pts = s.pts.map(q);
    const areaPx = Math.abs(shoelace(pts)) * (o.pxW / o.W) ** 2;
    if ((pts.length < 4 || areaPx < 12) && !r.name) { dropped.push({ area: Math.round(r.area), at: centroidLL(r.ll), why: 'simplified away' }); continue; }
    polys.push({ pts, art: s.art, holes: r.holes.map((h) => { const t = simp(h); return { pts: t.pts.map(q), art: t.art }; }), name: r.name, ll: r.ll, area: r.area });
  }
  const antS = { pts: ant.pts.map(q), art: ant.art };
  // 4. regions on a 4x raster
  const S = 4 * o.pxW / o.W;   // raster px per unit
  const Hn = heightUnits(o, o.cropS);
  const RW = Math.round(o.W * S), RH = Math.ceil(Hn * S);
  const land = rasterise([...polys.flatMap((p) => [p.pts, ...p.holes.map((h) => h.pts)]), antS.pts], RW, RH, S);
  const cutsU = Object.fromEntries(Object.entries(CUTS).map(([k, v]) => [k, v.map(([lon, lat]) => q(P(lon, lat)))]));
  const barrier = new Uint8Array(RW * RH);
  for (const pl of Object.values(cutsU)) for (let i = 0; i < pl.length - 1; i++) stampLine(barrier, RW, RH, pl[i][0] * S, pl[i][1] * S, pl[i + 1][0] * S, pl[i + 1][1] * S, 1.2);
  const label = new Int8Array(RW * RH).fill(-1);
  const fill = (sx, sy, rid) => {
    const st = [sy * RW + sx]; let n = 0;
    while (st.length) {
      const i = st.pop();
      if (label[i] !== -1 || !land[i] || barrier[i]) continue;
      label[i] = rid; n++;
      const x = i % RW, y = (i - x) / RW;
      if (x > 0) st.push(i - 1); if (x < RW - 1) st.push(i + 1); if (y > 0) st.push(i - RW); if (y < RH - 1) st.push(i + RW);
    }
    return n;
  };
  const at = (lon, lat) => { const p = P(lon, lat); return [Math.min(RW - 1, Math.max(0, Math.round(p[0] * S))), Math.min(RH - 1, Math.max(0, Math.round(p[1] * S)))]; };
  for (const [reg, ll] of Object.entries(SEEDS)) { const [x, y] = at(ll[0], ll[1]); const n = fill(x, y, REGIONS.indexOf(reg)); if (!n) throw new Error(`build-world-map: seed ${reg} is not on land`); log.push(`seed ${reg}: ${n} px`); }
  for (const [reg, isl] of Object.entries(OVERRIDE)) for (const [nm, ll] of Object.entries(isl)) {
    const [x, y] = at(ll[0], ll[1]);
    if (!land[y * RW + x]) { log.push(`override ${nm}: not on land in the simplified layer (skipped)`); continue; }
    if (label[y * RW + x] === -1) fill(x, y, REGIONS.indexOf(reg));
    else if (label[y * RW + x] !== REGIONS.indexOf(reg)) throw new Error(`build-world-map: override ${nm} -> ${reg} but the flood reached it as ${REGIONS[label[y * RW + x]]}`);
  }
  // the rest (islands, barrier pixels) take the nearest labelled land (multi-source BFS)
  nearestFill(label, land, RW, RH);
  // every kept ring's region (the label under most of its raster pixels) — printed for the audit
  const ringRegions = polys.map((p) => {
    const own = rasterise([p.pts], RW, RH, S); const c = {};
    for (let i = 0; i < own.length; i++) if (own[i] && label[i] >= 0) c[label[i]] = (c[label[i]] || 0) + 1;
    const best = Object.entries(c).sort((a, b) => b[1] - a[1])[0];
    return { at: centroidLL(p.ll), km2: Math.round(p.area), region: best ? REGIONS[+best[0]] : null, name: p.name };
  });
  // 5. per-region stats at 639
  const px = 1 / S * (o.pxW / o.W);   // raster px -> 639 px (= 1/4)
  const stats = {};
  for (let r = 0; r < REGIONS.length; r++) stats[REGIONS[r]] = { px4: 0, x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity };
  for (let i = 0; i < label.length; i++) if (label[i] >= 0) { const s = stats[REGIONS[label[i]]]; s.px4++; const x = i % RW, y = (i - x) / RW; s.x0 = Math.min(s.x0, x); s.x1 = Math.max(s.x1, x); s.y0 = Math.min(s.y0, y); s.y1 = Math.max(s.y1, y); }
  // 6. anchors (continents) on a 639 grid via EDT
  const g = downsample(label, RW, RH, 4);
  const anchors = {};
  for (let r = 0; r < REGIONS.length; r++) {
    const reg = REGIONS[r];
    if (reg === 'antarctica') continue;
    const own = g.lab.map((v) => (v === r ? 1 : 0));
    const comp = largestComponent(own, g.w, g.h);
    const dOwn = edt(comp.map((v) => (v ? 0 : 1)), g.w, g.h, true);   // distance to anything not in the component
    const other = g.lab.map((v) => (v >= 0 && v !== r ? 1 : 0));
    const dOther = edt(other, g.w, g.h, false);   // distance to other-region land
    let best = -1, bi = -1;
    for (let i = 0; i < comp.length; i++) if (comp[i] && dOther[i] >= DISC_R_PX + 1 && dOwn[i] > best) { best = dOwn[i]; bi = i; }
    if (bi < 0 || best < DISC_R_PX - 5) throw new Error(`build-world-map: no anchor for ${reg} (best clearance ${best.toFixed(1)} px)`);
    const x = bi % g.w, y = (bi - x) / g.w;
    anchors[reg] = { x: +((x + 0.5) * o.W / o.pxW).toFixed(1), y: +((y + 0.5) * o.W / o.pxW).toFixed(1), clear: +best.toFixed(1), otherClear: +Math.min(dOther[bi], 999).toFixed(1) };
  }
  // 7. oceans: on water >= 6 px off the coast (simplified AND source), else a 10° box search
  // the SOURCE layer (every ring, unsimplified; the few tiny rings that straddle the seam — St Lawrence Island — are left out)
  const crossesSeam = (ring) => ring.some((p, i) => i > 0 && Math.abs(wrapLam(p[0], o.lon0) - wrapLam(ring[i - 1][0], o.lon0)) > 180);
  const srcLand = rasterise([...src.filter((r) => !r.outer.some((p) => p[1] <= -89.9) && !crossesSeam(r.outer)).flatMap((r) => [r.outer, ...r.holes]).map((ring) => ring.map(([lon, lat]) => P(lon, lat))), ant.srcPts], RW, RH, S);
  const gs = downsample(Array.from(srcLand, (v) => (v ? 0 : -1)), RW, RH, 4);   // Array.from: a typed .map would wrap -1 to 255
  const dLandS = edt(g.lab.map((v) => (v >= 0 ? 1 : 0)), g.w, g.h, false), dLandSrc = edt(gs.lab.map((v) => (v >= 0 ? 1 : 0)), gs.w, gs.h, false);
  const oceans = {};
  for (const [oc, pts] of Object.entries(OCEANS)) {
    oceans[oc] = pts.map(([lon, lat]) => {
      const tryAt = (a, b) => { const [ux, uy] = P(a, b); const x = Math.floor((ux * o.pxW) / o.W), y = Math.floor((uy * o.pxW) / o.W); const i = y * g.w + x; return x >= 0 && y >= 0 && x < g.w && y < g.h && Math.min(dLandS[i], dLandSrc[i]) >= DISC_R_PX + 6 ? [ux, uy, Math.min(dLandS[i], dLandSrc[i])] : null; };
      let hit = tryAt(lon, lat), moved = false;
      for (let r = 1; !hit && r <= 10; r++) for (let dx = -r; dx <= r && !hit; dx++) for (let dy = -r; dy <= r && !hit; dy++) { hit = tryAt(lon + dx, lat + dy); if (hit) moved = [lon + dx, lat + dy]; }
      if (!hit) throw new Error(`build-world-map: no water anchor for ${oc} within 10° of (${lon}, ${lat})`);
      return { x: +hit[0].toFixed(1), y: +hit[1].toFixed(1), lon: moved ? moved[0] : lon, lat: moved ? moved[1] : lat, clear: +(hit[2] - DISC_R_PX).toFixed(1) };
    });
  }
  // 8. the projection outline (units) + leaders in the corner voids
  const outline = (cropS) => {
    const L = [], R = [];
    for (let lat = o.cropN; lat >= cropS - 1e-9; lat -= 0.5) { L.push(q(P(0, lat, -180))); R.push(q(P(0, lat, 180))); }
    return [...R, ...L.reverse()];
  };
  const outlineA = outline(o.cropS), outlineN = outline(o.cropSNoAnt);
  const leaders = {};
  for (const [m, def] of Object.entries(LEADERS)) {
    const H = heightUnits(o, o.cropS);
    const tgt = P(def.target[0], def.target[1]);
    const r = DISC_R_PX * o.W / o.pxW, pad = 3 * o.W / o.pxW;
    let best = null;
    for (let cx = r + pad; cx < o.W / 2; cx += 4) for (let cy = r + pad; cy < H / 2; cy += 4) {
      const X = def.void.endsWith('Right') ? o.W - cx : cx, Y = def.void.startsWith('bottom') ? H - cy : cy;
      if (pointInPoly([X, Y], outlineA)) continue;
      const cl = distToRing([X, Y], outlineA) - r;
      if (cl < pad) continue;
      const d = Math.hypot(X - tgt[0], Y - tgt[1]);
      if (!best || d < best.d) best = { x: X, y: Y, d, cl };
    }
    if (!best) throw new Error(`build-world-map: no room in the ${def.void} void for the ${m} disc`);
    leaders[m] = { void: def.void, disc: { x: +best.x.toFixed(1), y: +best.y.toFixed(1) }, target: { x: +tgt[0].toFixed(1), y: +tgt[1].toFixed(1), lon: def.target[0], lat: def.target[1] }, clear: +(best.cl * o.pxW / o.W).toFixed(1) };
  }
  // stats for the report
  const pxOf = (s) => s.px4 / 16;
  const europe = stats.europe;
  const report = {
    kept: polys.length + 1, dropped: dropped.length, droppedList: dropped.sort((a, b) => b.area - a.area).slice(0, 40),
    regionPx: Object.fromEntries(REGIONS.map((r) => [r, Math.round(pxOf(stats[r]))])),
    europeBboxPx: +((europe.x1 - europe.x0 + 1) / 4).toFixed(1),
    heightPx: { antarctica: +(heightUnits(o, o.cropS) * o.pxW / o.W).toFixed(1), none: +(heightUnits(o, o.cropSNoAnt) * o.pxW / o.W).toFixed(1) },
    points: polys.reduce((s, p) => s + p.pts.length, 0) + antS.pts.length,
    ringRegions,
    log,
  };
  const data = {
    header: { source: SOURCE_TAG, sha256: sha, licence: 'public domain (Natural Earth)', projection: 'Natural Earth I', lon0: o.lon0, seamLon: o.lon0 - 180, cropN: o.cropN, cropS: o.cropS, cropSNoAntarctica: o.cropSNoAnt, dpPx: o.dpPx, unitsAcross: o.W, pxAt: o.pxW, minAreaKm2: o.minArea },
    view: { w: o.W, hAntarctica: +heightUnits(o, o.cropS).toFixed(2), hNoAntarctica: +heightUnits(o, o.cropSNoAnt).toFixed(2) },
    rings: polys.map((p, i) => ({ region: ringRegions[i].region, pts: p.pts.flat(), art: artIdx(p.art), holes: p.holes.map((h) => ({ pts: h.pts.flat(), art: artIdx(h.art) })) })),
    antarctica: { pts: antS.pts.flat(), art: artIdx(antS.art) },
    outline: { antarctica: outlineA.flat(), none: outlineN.flat() },
    cuts: Object.fromEntries(Object.entries(cutsU).map(([k, v]) => [k, { regions: CUT_REGIONS[k], pts: v.flat() }])),
    anchors, oceans, leaders,
    seeds: SEEDS, overrides: OVERRIDE,
  };
  data.hash = crypto.createHash('sha256').update(JSON.stringify([data.rings, data.antarctica, data.cuts, data.anchors, data.oceans, data.leaders])).digest('hex').slice(0, 16);
  return { data, report };
}
const artIdx = (a) => a.map((v, i) => (v ? i : -1)).filter((i) => i >= 0);
function centroidLL(r) { const xs = r.map((p) => p[0]), ys = r.map((p) => p[1]); return [+((Math.min(...xs) + Math.max(...xs)) / 2).toFixed(1), +((Math.min(...ys) + Math.max(...ys)) / 2).toFixed(1)]; }
function shoelace(p) { let s = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; }
function pointInPoly(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c; } return c; }
function distToRing(p, r) { let d = Infinity; for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy; const t = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2)) : 0; d = Math.min(d, Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)); } return d; }

/** Antarctica: cut at the seam, closed along the seam edges and the pole line (artificial). */
function antarcticaRing(outer, o, P) {
  let ll = outer.slice(0, -1).filter((p) => p[1] > -89.9);
  const lam = (p) => wrapLam(p[0], o.lon0);
  let cut = -1;
  for (let i = 0; i < ll.length; i++) { const a = lam(ll[i]), b = lam(ll[(i + 1) % ll.length]); if (Math.abs(b - a) > 180) { if (cut >= 0) throw new Error('build-world-map: Antarctica crosses the seam twice'); cut = i; } }
  if (cut < 0) throw new Error('build-world-map: Antarctica does not cross the seam');
  const a = ll[cut], b = ll[(cut + 1) % ll.length];
  const la = lam(a), lb = lam(b);
  // the seam latitude by interpolation in unwrapped λ
  const lbU = lb + (la > 0 ? 360 : -360), side = la > 0 ? 180 : -180;
  const t = (side - la) / (lbU - la), latC = a[1] + t * (b[1] - a[1]);
  ll = [...ll.slice(cut + 1), ...ll.slice(0, cut + 1)];   // starts just past the seam, ends just before it
  const first = lam(ll[0]) > 0 ? 180 : -180, last = lam(ll[ll.length - 1]) > 0 ? 180 : -180;
  const pts = [P(0, latC, first), ...ll.map((p) => P(p[0], p[1])), P(0, latC, last), P(0, -90, last), P(0, -90, first)];
  const art = pts.map((_, i) => i >= pts.length - 3);   // last -> pole, pole -> pole, pole -> first seam point
  const srcPts = pts.slice();
  return { pts, art, srcPts };
}

/** Even-odd scanline fill of unit-space rings onto a W x H raster at S px/unit. */
function rasterise(rings, W, H, S) {
  const out = new Uint8Array(W * H);
  const edges = [];
  for (const r of rings) for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; if (a[1] !== b[1]) edges.push([a[0] * S, a[1] * S, b[0] * S, b[1] * S]); }
  const byRow = Array.from({ length: H }, () => []);
  for (const e of edges) { const y0 = Math.max(0, Math.ceil(Math.min(e[1], e[3]) - 0.5)), y1 = Math.min(H - 1, Math.floor(Math.max(e[1], e[3]) - 0.5)); for (let y = y0; y <= y1; y++) byRow[y].push(e); }
  for (let y = 0; y < H; y++) {
    const yc = y + 0.5, xs = [];
    for (const [x1, y1, x2, y2] of byRow[y]) if ((y1 > yc) !== (y2 > yc)) xs.push(x1 + ((yc - y1) * (x2 - x1)) / (y2 - y1));
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.max(0, Math.ceil(xs[k] - 0.5)); x <= Math.min(W - 1, Math.floor(xs[k + 1] - 0.5)); x++) out[y * W + x] ^= 1;
  }
  return out;
}
function stampLine(buf, W, H, x1, y1, x2, y2, rad) {
  const n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) * 2) + 1;
  for (let k = 0; k <= n; k++) {
    const x = x1 + ((x2 - x1) * k) / n, y = y1 + ((y2 - y1) * k) / n;
    for (let dy = -Math.ceil(rad); dy <= Math.ceil(rad); dy++) for (let dx = -Math.ceil(rad); dx <= Math.ceil(rad); dx++) {
      const X = Math.round(x + dx), Y = Math.round(y + dy);
      if (X >= 0 && Y >= 0 && X < W && Y < H && Math.hypot(X - x, Y - y) <= rad) buf[Y * W + X] = 1;
    }
  }
}
function nearestFill(label, land, W, H) {
  const q = [];
  for (let i = 0; i < label.length; i++) if (label[i] >= 0) q.push(i);
  for (let h = 0; h < q.length; h++) {
    const i = q[h], x = i % W, y = (i - x) / W;
    for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && label[j] === -1) { label[j] = label[i]; q.push(j); }
  }
  for (let i = 0; i < label.length; i++) if (!land[i]) label[i] = -1;
}
function downsample(label, W, H, f) {
  const w = Math.floor(W / f), h = Math.floor(H / f), lab = new Array(w * h).fill(-1);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const c = {};
    for (let dy = 0; dy < f; dy++) for (let dx = 0; dx < f; dx++) { const v = label[(y * f + dy) * W + x * f + dx]; c[v] = (c[v] || 0) + 1; }
    let best = -1, bn = -1; for (const [v, n] of Object.entries(c)) if (n > bn) { bn = n; best = +v; }
    lab[y * w + x] = best;
  }
  return { w, h, lab };
}
function largestComponent(mask, W, H) {
  const seen = new Int32Array(W * H).fill(-1); let bestId = -1, bestN = 0, id = 0;
  for (let s = 0; s < mask.length; s++) {
    if (!mask[s] || seen[s] >= 0) continue;
    const st = [s]; let n = 0; seen[s] = id;
    while (st.length) { const i = st.pop(); n++; const x = i % W, y = (i - x) / W; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && mask[j] && seen[j] < 0) { seen[j] = id; st.push(j); } }
    if (n > bestN) { bestN = n; bestId = id; } id++;
  }
  return seen.map((v) => (v === bestId ? 1 : 0));
}
/** Exact Euclidean distance transform (Felzenszwalb) to the nearest `1` cell; `edgeIsFeature` treats outside the grid as a feature. */
function edt(feat, W, H, edgeIsFeature) {
  const INF = 1e12;
  const f = new Float64Array(W * H);
  for (let i = 0; i < f.length; i++) f[i] = feat[i] ? 0 : INF;
  const pad = edgeIsFeature ? 1 : 0;
  const d1 = (arr, n) => {
    const m = n + 2 * pad, ff = new Float64Array(m); for (let i = 0; i < m; i++) ff[i] = (i < pad || i >= n + pad) ? 0 : arr[i - pad];
    const v = new Int32Array(m), z = new Float64Array(m + 1), d = new Float64Array(m); let k = 0; v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
    for (let q = 1; q < m; q++) { let s; do { const p = v[k]; s = ((ff[q] + q * q) - (ff[p] + p * p)) / (2 * q - 2 * p); if (s <= z[k]) k--; else break; } while (k >= 0); k++; v[k] = q; z[k] = s; z[k + 1] = Infinity; }
    k = 0; for (let q = 0; q < m; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + ff[v[k]]; }
    return Array.from(d.slice(pad, pad + n));
  };
  for (let x = 0; x < W; x++) { const col = []; for (let y = 0; y < H; y++) col.push(f[y * W + x]); const r = d1(col, H); for (let y = 0; y < H; y++) f[y * W + x] = r[y]; }
  for (let y = 0; y < H; y++) { const row = Array.from(f.slice(y * W, y * W + W)); const r = d1(row, W); for (let x = 0; x < W; x++) f[y * W + x] = r[x]; }
  return Array.from(f, (v) => Math.sqrt(v));
}

function moduleText(data, mapOpened) {
  return `/**
 * data/b5/world-map.js — GENERATED by scripts/worksheet-gen/tools/build-world-map.js (never
 * hand-edit; rebuild). The G1-379 \`maps\` world map: Natural Earth 1:110m land (public domain),
 * Natural Earth I projection, central meridian ${data.header.lon0}° E, seam ${data.header.seamLon}°, crop
 * ${data.header.cropN}° N / ${data.header.cropS}° (with Antarctica) or ${data.header.cropSNoAntarctica}° (without), Douglas-Peucker
 * ${data.header.dpPx} px at ${data.header.pxAt}; units: ${data.header.unitsAcross} across (1 unit = ${data.header.pxAt}/${data.header.unitsAcross} px at w ${data.header.pxAt}).
 *
 * source: ${data.header.source}
 * sha256: ${data.header.sha256}
 * geometry hash: ${data.hash}
 *
 * rings: flat integer [x0,y0,x1,y1,…] (units); art = indices i whose edge i -> i+1 is ARTIFICIAL
 * (the source dateline / the pole line: filled, never stroked). cuts are stored whole (the
 * primitive clips them to land). mapOpened = the human open of the renders of THIS geometry
 * (qa/verify-world-map.js FAILS a module without it, or with a stale hash).
 * \`data/\` is gitignored — the reviewer force-adds this module.
 */
'use strict';
const WORLD_MAP = ${JSON.stringify({ ...data, mapOpened: mapOpened || null })};
module.exports = { WORLD_MAP };
`;
}

function main() {
  const args = process.argv.slice(2);
  const opened = (args.find((a) => a.startsWith('--opened=')) || '').slice(9);
  const { data, report } = build();
  console.log(`kept ${report.kept} rings (${report.points} points), dropped ${report.dropped}; height ${report.heightPx.antarctica} px (Antarctica) / ${report.heightPx.none} px; Europe bbox ${report.europeBboxPx} px`);
  console.log('region px: ' + Object.entries(report.regionPx).map(([k, v]) => `${k} ${v}`).join(' · '));
  console.log('anchors: ' + Object.entries(data.anchors).map(([k, v]) => `${k} clear ${v.clear}/${v.otherClear}`).join(' · '));
  console.log('oceans: ' + Object.entries(data.oceans).map(([k, v]) => `${k} ` + v.map((p) => `(${p.lon},${p.lat}) +${p.clear}`).join(' ')).join(' · '));
  console.log('leaders: ' + Object.entries(data.leaders).map(([k, v]) => `${k} ${v.void} clear ${v.clear}`).join(' · '));
  console.log('dropped (largest): ' + report.droppedList.slice(0, 12).map((d) => `${d.area}km² @${d.at}${d.why ? ' ' + d.why : ''}`).join(' · '));
  report.log.forEach((l) => console.log('  ' + l));
  if (args.includes('--rings')) for (const r of report.ringRegions) console.log(`  ring @${r.at} ${r.km2} km² -> ${r.region}${r.name ? ' (' + r.name + ')' : ''}`);
  let prev = null;
  try { delete require.cache[require.resolve(OUT)]; prev = require(OUT).WORLD_MAP; } catch (e) { prev = null; }
  if (args.includes('--check')) {
    const same = prev && prev.hash === data.hash && prev.header.sha256 === data.header.sha256;
    console.log(same ? 'PASS (the committed module is current)' : 'FAIL (the committed module differs — rebuild)');
    return same;
  }
  let mapOpened = prev && prev.mapOpened && prev.mapOpened.hash === data.hash ? prev.mapOpened : null;
  if (opened) mapOpened = { by: opened, date: new Date().toISOString().slice(0, 10), hash: data.hash };
  const text = moduleText(data, mapOpened);
  fs.writeFileSync(OUT, text);
  console.log(`wrote ${OUT} (${(text.length / 1024).toFixed(1)} KB)${mapOpened ? ' — mapOpened ' + mapOpened.by : ' — mapOpened: NONE (open the renders, then --opened=<who>)'}`);
  return true;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { build, ne1, wrapLam, makeProject, heightUnits, DEFAULTS, CUTS, SEEDS, OVERRIDE, OCEANS, LEADERS, REGIONS, rasterise, edt, sphArea, KEEP };
