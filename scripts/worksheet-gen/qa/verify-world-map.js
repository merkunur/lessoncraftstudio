#!/usr/bin/env node
/**
 * verify-world-map.js — the gate of primitives/world-map.js + the generated data/b5/world-map.js
 * (G1-379 `maps` F3 / F4; design docs/worksheet-gen/b5-designs/G1-379-maps.md §3 step 10).
 *
 *   node scripts/worksheet-gen/qa/verify-world-map.js [--no-sheet]
 *
 * The gate carries its OWN copy of the Natural Earth I formula, the seed cities, the island
 * overrides and every checkpoint (it never imports the tool's projection), so a wrong module
 * cannot certify itself.
 * (a) PROVENANCE  sha256(tools/vendor/ne_110m_land.geojson) === the module header; the committed
 *     module === a fresh tools/build-world-map.js build (no hand edit).
 * (b) SHAPE       per region, the drawn land's area within +-2 % of the SOURCE's kept rings
 *     (both rasterised in Chromium at 4 x 639, regions by the gate's own flood); sampled
 *     Hausdorff <= 1.0 px at 639 both ways (source vertices -> drawn coast, drawn vertices ->
 *     source coast).
 *     (the design's "Istanbul Europe side 28.98 E 41.04 N" falls in the Bosporus gap of the 1:110m layer —
 *     measured: no land there, the nearest land pixel is Asian — so the European checkpoint is Thrace,
 *     28.0 E 41.2 N; McMurdo (on Ross Island, below the layer's resolution) is Vostok Station;
 *     Cape Horn / the Cape of Good Hope / Dakar are coastal TIPS searched within 2 px.)
 * (c) POSITION    24 land checkpoints inside land AND in the right region, 8 water checkpoints on
 *     water, all measured on the RENDER of worldMap() at 639 (4x raster, the land / sea read from
 *     the rendered pixel colour; region from the gate's flood with the three cuts as barriers).
 * (d) PROPORTION  region area order Asia > Africa > North America > South America > Europe >
 *     Oceania; Greenland < 0.20 x Africa (recorded).
 * (e) LEGIBILITY  Europe bbox 95..125 px; New Zealand and Madagascar >= 6 px tall; the Europe /
 *     Asia cut >= 40 px drawn over land; every continent disc on its own region, overlapping its
 *     coast <= 5 px, never another region's land; every ocean disc >= 6 px off the coast; every
 *     leader dot on its target (Arctic / Southern on water, Antarctica on Antarctica); no two
 *     halos overlap; no disc outside the card.
 * (f) HUMAN OPEN  the module carries mapOpened:{by, date, hash} for THIS geometry (the renders
 *     out/dev/G1-379-world-map-*.png OPENED by a human; tools/build-world-map.js --opened=…).
 * POISON (each must FAIL for its own reason): PR9 built at lon0 190 · PR10 crop north 75 · PR11 a
 *   continent disc moved onto water · PR12 the Arctic disc in the 23 px polar band without a
 *   leader · PR20 a module without mapOpened. The committed module is the control.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const H = require('./b5-maps-harness.js');
const WM = require('../primitives/world-map.js');
const TOOL = require('../tools/build-world-map.js');
const { WORLD_MAP } = require('../data/b5/world-map.js');
const { MAPS_LOC } = require('../data/b5/maps.js');

const SRC = path.join(__dirname, '..', 'tools', 'vendor', 'ne_110m_land.geojson');
const D2R = Math.PI / 180;
/* ---- the gate's own copies ---- */
function ne1(lam, phi) {
  const p2 = phi * phi, p4 = p2 * p2, p6 = p4 * p2, p8 = p4 * p4, p10 = p8 * p2, p12 = p6 * p6;
  return [lam * (0.870700 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p10 - 0.001529 * p12), phi * (1.007226 + 0.015085 * p2 - 0.044475 * p6 + 0.028874 * p8 - 0.005916 * p10)];
}
function projector(lon0, cropN, W) {
  const u = W / (2 * Math.PI * 0.8707), yTop = ne1(0, cropN * D2R)[1];
  return (lon, lat) => { let l = lon - lon0; while (l <= -180) l += 360; while (l > 180) l -= 360; const [x, y] = ne1(l * D2R, lat * D2R); return [W / 2 + x * u, (yTop - y) * u]; };
}
const SEEDS = { europe: [2.35, 48.85], asia: [116.4, 39.9], africa: [31.24, 30.04], northAmerica: [-87.6, 41.9], southAmerica: [-47.9, -15.8], oceania: [133.9, -23.7], antarctica: [0, -89] };
const OVERRIDES = { northAmerica: [[-42, 72], [-79, 21.8], [-71, 19], [-72, 68]], europe: [[-19, 65], [-2, 54], [-8, 53.3], [16, 78.5], [55.5, 72.5], [14, 37.5], [9, 40]], africa: [[47, -19]], asia: [[138, 36], [143, 43.5], [131, 32.7], [80.7, 7.8], [121, 23.7], [109.8, 19.2], [143, 50], [114, 1], [101.5, 0], [120.4, -2.5], [110, -7.3]], oceania: [[140, -5], [146.6, -42], [175.5, -38.5], [170, -44]] };
const LAND = [
  ['Cape of Good Hope', 18.47, -34.36, 'africa'], ['Cairo', 31.24, 30.04, 'africa'], ['Dakar', -17.45, 14.69, 'africa'], ['Mogadishu', 45.34, 2.04, 'africa'],
  ['Gibraltar', -5.35, 36.14, 'europe'], ['Oslo', 10.75, 59.91, 'europe'], ['Istanbul province, Europe side (Thrace)', 28.0, 41.2, 'europe'], ['Moscow', 37.62, 55.75, 'europe'],
  ['Mumbai', 72.88, 19.08, 'asia'], ['Singapore', 103.82, 1.35, 'asia'], ['Tokyo', 139.69, 35.69, 'asia'], ['Beijing', 116.4, 39.9, 'asia'], ['Reykjavik', -21.94, 64.15, 'europe'],
  ['Nuuk', -51.72, 64.18, 'northAmerica'], ['Anchorage', -149.9, 61.22, 'northAmerica'], ['New York', -74.0, 40.71, 'northAmerica'], ['Mexico City', -99.13, 19.43, 'northAmerica'],
  ['Panama City', -79.52, 8.98, 'northAmerica'], ['Bogotá', -74.07, 4.71, 'southAmerica'], ['Lima', -77.04, -12.05, 'southAmerica'], ['Cape Horn', -67.28, -55.98, 'southAmerica'],
  ['Sydney', 151.21, -33.87, 'oceania'], ['Wellington', 174.78, -41.29, 'oceania'], ['Vostok Station', 106.84, -78.46, 'antarctica'],
  ['Greenland north cape', -33.0, 83.3, 'northAmerica'],
];
/** coastal TIPS below the 1:110m resolution (the Hermite Islands of Cape Horn are not in the layer): searched within 2 px, not 1 */
const TIP = new Set(['Cape Horn', 'Cape of Good Hope', 'Dakar']);
const WATER = [['mid-Atlantic', -35, 15], ['Pacific west edge', -165, 0], ['Pacific east edge', 175, 0], ['Indian', 80, -20], ['Arctic', -160, 78], ['Southern', -120, -65], ['Mediterranean', 18, 34], ['Caspian', 51, 42]];
const REG = ['northAmerica', 'southAmerica', 'europe', 'asia', 'africa', 'oceania', 'antarctica'];
const PX = 639;
/** the design's real continent areas (M km²; §3 step 10 d) */
const REAL_MKM2 = { asia: 44.6, africa: 30.4, northAmerica: 24.7, southAmerica: 17.8, europe: 10.2, oceania: 8.5 };
/** km² per 4x raster pixel on each row: y depends on φ only in Natural Earth I, so the local area
 *  scale is A(φ)·B'(φ) / cos φ (x = λ·A(φ), y = B(φ)); φ per row by bisection of the gate's own B. */
function rowFactors(data, heightPx, S) {
  const u = data.view.w / (2 * Math.PI * 0.8707), k = PX / data.view.w, pxPerProj = u * k * S;
  const yTop = ne1(0, data.header.cropN * D2R)[1];
  const A = (p) => { const p2 = p * p; return 0.870700 - 0.131979 * p2 - 0.013791 * p2 * p2 + 0.003971 * p2 ** 5 - 0.001529 * p2 ** 6; };
  const B = (p) => ne1(0, p)[1];
  const out = [];
  for (let row = 0; row < Math.ceil(heightPx * S); row++) {
    const y = yTop - (row + 0.5) / pxPerProj;
    let lo = -Math.PI / 2, hi = Math.PI / 2;
    for (let it = 0; it < 60; it++) { const mid = (lo + hi) / 2; if (B(mid) < y) lo = mid; else hi = mid; }
    const p = (lo + hi) / 2, dB = (B(p + 1e-6) - B(p - 1e-6)) / 2e-6;
    out.push(Math.cos(p) / (A(p) * dB) / (pxPerProj * pxPerProj) * 6371 * 6371);
  }
  return out;
}

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const pairs = (f) => { const o = []; for (let i = 0; i < f.length; i += 2) o.push([f[i], f[i + 1]]); return o; };

/** Source rings the design KEEPS (>= 20,000 km², the keep list, Antarctica) — the gate's own filter. */
function sourceRings(lon0) {
  const gj = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  const out = [];
  for (const f of gj.features) {
    const g = f.geometry, polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const p of polys) {
      const r = p[0], a = TOOL.sphArea(r);
      const ant = r.some((q) => q[1] <= -89.9);
      const keep = Object.values(TOOL.KEEP).some((k) => pip(k, r));
      if (a >= 20000 || keep || ant) out.push({ ring: r, holes: p.slice(1), ant });
    }
  }
  return out;
}
function pip(p, ring) { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c; } return c; }

/** Hausdorff (px at 639) between the source's kept coasts and the drawn coasts. */
function hausdorff(data) {
  const P = projector(data.header.lon0, data.header.cropN, data.view.w);
  const k = PX / data.view.w;
  const drawn = [...data.rings.map((r) => pairs(r.pts)), ...data.rings.flatMap((r) => r.holes.map((h) => pairs(h.pts))), pairs(data.antarctica.pts)];
  // only source rings the module DRAWS (the design drops a ring under 12 px² after simplification): a source ring counts
  // when a drawn ring has its bbox within 2 px on all four sides
  const allSrc = sourceRings(data.header.lon0).filter((s) => !s.ant).flatMap((s) => [s.ring, ...s.holes].map((r) => r.map(([lon, lat]) => P(lon, lat))));
  const bb = (r) => { const xs = r.map((p) => p[0]), ys = r.map((p) => p[1]); return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]; };
  const drawnBB = drawn.map(bb), pad = 2 / k;
  const src = allSrc.filter((r) => { const b = bb(r); return drawnBB.some((d) => d.every((v, i) => Math.abs(v - b[i]) <= pad)); });   // the SAME ring, drawn
  const segsOf = (rings) => { const g = new Map(); const C = 20; for (const r of rings) for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; if (Math.abs(a[0] - b[0]) > 1000) continue; const key = (x, y) => `${Math.floor(x / C)},${Math.floor(y / C)}`; const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]); for (let gx = Math.floor(x0 / C); gx <= Math.floor(x1 / C); gx++) for (let gy = Math.floor(y0 / C); gy <= Math.floor(y1 / C); gy++) { const kk = `${gx},${gy}`; if (!g.has(kk)) g.set(kk, []); g.get(kk).push([a, b]); } void key; } return g; };
  const dist = (p, g) => { const C = 20; let d = Infinity; const gx = Math.floor(p[0] / C), gy = Math.floor(p[1] / C); for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (const [a, b] of g.get(`${gx + dx},${gy + dy}`) || []) { const ex = b[0] - a[0], ey = b[1] - a[1], L2 = ex * ex + ey * ey; const t = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * ex + (p[1] - a[1]) * ey) / L2)) : 0; d = Math.min(d, Math.hypot(p[0] - a[0] - t * ex, p[1] - a[1] - t * ey)); } return d; };
  const gD = segsOf(drawn), gS = segsOf(src);
  let srcToDrawn = 0, drawnToSrc = 0;
  let worst = null;
  for (const r of src) for (const p of r) { const d = dist(p, gD); if (d > srcToDrawn) { srcToDrawn = d; worst = p; } }
  if (process.env.WM_DEBUG) console.log('worst source point (units)', worst);
  for (const r of drawn.slice(0, -1)) for (const p of r) drawnToSrc = Math.max(drawnToSrc, dist(p, gS));
  return { srcToDrawn: srcToDrawn * k, drawnToSrc: drawnToSrc * k };
}

/** Everything measured in Chromium on the RENDER: returns findings + the numbers. */
async function measure(page, data, set, oceans, numbers, tag) {
  const map = WM.worldMap({ w: PX, set, oceans, numbers, data });
  const bare = WM.worldMap({ w: PX, set, oceans, numbers: {}, data });   // land / sea is read on a render WITHOUT markers (a disc covers Moscow)
  const P = projector(data.header.lon0, data.header.cropN, data.view.w);
  const kk = PX / data.view.w;
  const proj = (lon, lat) => { const [x, y] = P(lon, lat); return [x * kk, y * kk]; };
  const antarctica = set.some((m) => m.regions.includes('antarctica'));
  const src = sourceRings(data.header.lon0).filter((s) => antarctica || !s.ant).filter((s) => !s.ring.some((q, i) => i > 0 && Math.abs(q[0] - s.ring[i - 1][0]) > 300 && !s.ant));
  const srcPx = src.filter((s) => !s.ant).flatMap((s) => [s.ring, ...s.holes]).map((r) => r.map(([lon, lat]) => proj(lon, lat)));
  const arg = {
    svg: bare.svg, height: map.height, S: 4, tips: [...TIP], debug: !!process.env.WM_DEBUG,
    land: [...data.rings.filter((r) => antarctica || r.region !== 'antarctica').flatMap((r) => [pairs(r.pts), ...r.holes.map((h) => pairs(h.pts))]), ...(antarctica ? [pairs(data.antarctica.pts)] : [])].map((r) => r.map(([x, y]) => [x * kk, y * kk])),
    srcLand: srcPx.concat(antarctica ? [pairs(data.antarctica.pts).map(([x, y]) => [x * kk, y * kk])] : []),
    cuts: Object.values(data.cuts).map((c) => pairs(c.pts).map(([x, y]) => [x * kk, y * kk])),
    euAsiaCut: pairs(data.cuts.europeAsia.pts).map(([x, y]) => [x * kk, y * kk]),
    seeds: Object.entries(SEEDS).filter(([r]) => antarctica || r !== 'antarctica').map(([r, ll]) => [REG.indexOf(r), ...proj(ll[0], ll[1])]),
    overrides: Object.entries(OVERRIDES).flatMap(([r, pts]) => pts.map((ll) => [REG.indexOf(r), ...proj(ll[0], ll[1])])),
    land_cp: LAND.filter((c) => antarctica || c[3] !== 'antarctica').map((c) => [c[0], ...proj(c[1], c[2]), REG.indexOf(c[3])]),
    water_cp: WATER.filter((c) => antarctica || c[2] > -60).map((c) => [c[0], ...proj(c[1], c[2])]),
    anchors: map.anchors,
    rowFactor: rowFactors(data, map.height, 4),
    greenland: proj(-42, 72), africaPt: proj(20, 5), nz: [proj(175.5, -38.5), proj(170, -44)], madagascar: proj(47, -19),
  };
  await H.openDoc(page, `world-map-measure-${tag}`, `<div id="wm">${bare.svg}</div>`);
  return page.evaluate(async (a) => {
    const f = [];
    const S = a.S, W = Math.round(639 * S), Hh = Math.ceil(a.height * S);
    const cv = (fn) => { const c = document.createElement('canvas'); c.width = W; c.height = Hh; const x = c.getContext('2d'); fn(x); return x.getImageData(0, 0, W, Hh).data; };
    const fillRings = (x, rings) => { x.beginPath(); for (const r of rings) { r.forEach(([px, py], i) => (i ? x.lineTo(px * S, py * S) : x.moveTo(px * S, py * S))); x.closePath(); } x.fill('evenodd'); };
    // the drawn land and the source land, rasterised
    const landD = cv((x) => { x.fillStyle = '#fff'; fillRings(x, a.land); });
    const srcD = cv((x) => { x.fillStyle = '#fff'; fillRings(x, a.srcLand); });
    const barD = cv((x) => { x.strokeStyle = '#fff'; x.lineWidth = 1.5; x.lineCap = 'round'; for (const c of a.cuts) { x.beginPath(); c.forEach(([px, py], i) => (i ? x.lineTo(px * S, py * S) : x.moveTo(px * S, py * S))); x.stroke(); } });
    const N = W * Hh, land = new Uint8Array(N), src = new Uint8Array(N), bar = new Uint8Array(N);
    for (let i = 0; i < N; i++) { land[i] = landD[i * 4 + 3] > 127 ? 1 : 0; src[i] = srcD[i * 4 + 3] > 127 ? 1 : 0; bar[i] = barD[i * 4 + 3] > 40 ? 1 : 0; }
    // the gate's flood: seeds, then overrides, then the nearest label (land only)
    const lab = new Int8Array(N).fill(-1);
    const flood = (sx, sy, r) => { const s0 = Math.round(sy * S) * W + Math.round(sx * S); if (!land[s0]) return 0; const st = [s0]; let n = 0; while (st.length) { const i = st.pop(); if (lab[i] !== -1 || !land[i] || bar[i]) continue; lab[i] = r; n++; const x = i % W; if (x > 0) st.push(i - 1); if (x < W - 1) st.push(i + 1); if (i >= W) st.push(i - W); if (i < N - W) st.push(i + W); } return n; };
    for (const [r, x, y] of a.seeds) if (!flood(x, y, r)) f.push(`seed ${r} is not on the drawn land`);
    for (const [r, x, y] of a.overrides) { const i = Math.round(y * S) * W + Math.round(x * S); if (land[i] && lab[i] === -1) flood(x, y, r); }
    // nearest label everywhere (land pixels first, then the whole field, for the source comparison)
    const field = Int8Array.from(lab); const q = []; for (let i = 0; i < N; i++) if (field[i] >= 0) q.push(i);
    for (let h = 0; h < q.length; h++) { const i = q[h], x = i % W; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, i >= W ? i - W : -1, i < N - W ? i + W : -1]) if (j >= 0 && field[j] === -1) { field[j] = field[i]; q.push(j); } }
    for (let i = 0; i < N; i++) if (land[i] && lab[i] === -1) lab[i] = field[i];
    // (b) area per region: drawn vs source
    const area = new Array(7).fill(0), areaS = new Array(7).fill(0), km2 = new Array(7).fill(0);
    for (let i = 0; i < N; i++) { if (land[i] && lab[i] >= 0) { area[lab[i]]++; km2[lab[i]] += a.rowFactor[Math.floor(i / W)] || 0; } if (src[i] && field[i] >= 0) areaS[field[i]]++; }
    // the RENDER: land / sea from the rendered pixel colour
    const svg = document.querySelector('#wm svg');
    const ras = await window.__raster(svg, S);
    const isLandPx = (i) => ras.rgb[i * 3] > 245 && ras.rgb[i * 3 + 1] > 245 && ras.rgb[i * 3 + 2] > 245;
    const isSeaPx = (i) => Math.abs(ras.rgb[i * 3] - 221) < 8 && Math.abs(ras.rgb[i * 3 + 1] - 235) < 8 && Math.abs(ras.rgb[i * 3 + 2] - 232) < 8;
    const idx = (x, y) => Math.round(y * S) * W + Math.round(x * S);
    const cps = [];
    for (const [name, x, y, want] of a.land_cp) {
      if (y < 0 || y > a.height || x < 0 || x > 639) { f.push(`${name} falls outside the card (clipped)`); continue; }
      // land within 1 px (at 639) of the checkpoint, on the RENDER; its region from the flood
      let hit = -1, best = 1e9; const rr = a.tips.includes(name) ? 2 * S : S;
      for (let dy = -rr; dy <= rr; dy++) for (let dx = -rr; dx <= rr; dx++) { const i = idx(x + dx / S, y + dy / S); if (i >= 0 && i < N && land[i] && (isLandPx(i) || ras.rgb[i * 3] < 120)) { const d = dx * dx + dy * dy; if (d < best) { best = d; hit = i; } } }
      if (hit < 0) { f.push(`${name}: no land within ${rr / S} px on the render`); cps.push([name, 'sea']); continue; }
      if (lab[hit] !== want) f.push(`${name}: land of region ${lab[hit]} ≠ ${want} (the wrong continent)` + (a.debug ? ` [cp land ${land[idx(x, y)]} lab ${lab[idx(x, y)]} bar ${bar[idx(x, y)]} hit d ${Math.sqrt(best).toFixed(1)}]` : ''));
      cps.push([name, lab[hit]]);
    }
    for (const [name, x, y] of a.water_cp) {
      let bad = false;
      for (let dy = -S; dy <= S; dy++) for (let dx = -S; dx <= S; dx++) { const i = idx(x + dx / S, y + dy / S); if (i < 0 || i >= N || land[i] || isLandPx(i)) bad = true; }
      if (bad) f.push(`${name}: land within 1 px of a water checkpoint`);
    }
    // (e) legibility
    const bbox = (r) => { let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1; for (let i = 0; i < N; i++) if (land[i] && lab[i] === r) { const x = i % W, y = (i - x) / W; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } return { w: (x1 - x0 + 1) / S, h: (y1 - y0 + 1) / S }; };
    const eu = bbox(2);
    const compH = (x, y) => { const s0 = idx(x, y); if (!land[s0]) return 0; const seen = new Set([s0]); const st = [s0]; let y0 = 1e9, y1 = -1; while (st.length) { const i = st.pop(); const yy = Math.floor(i / W); y0 = Math.min(y0, yy); y1 = Math.max(y1, yy); const xx = i % W; for (const j of [xx > 0 ? i - 1 : -1, xx < W - 1 ? i + 1 : -1, i >= W ? i - W : -1, i < N - W ? i + W : -1]) if (j >= 0 && land[j] && !seen.has(j)) { seen.add(j); st.push(j); } } return (y1 - y0 + 1) / S; };
    const nzH = Math.max(...a.nz.map(([x, y]) => compH(x, y))), mgH = compH(a.madagascar[0], a.madagascar[1]);
    let cutLen = 0; const c = a.euAsiaCut;
    for (let k = 0; k < c.length - 1; k++) { const L = Math.hypot(c[k + 1][0] - c[k][0], c[k + 1][1] - c[k][1]); const n = Math.ceil(L * 4); for (let t = 0; t < n; t++) { const x = c[k][0] + (c[k + 1][0] - c[k][0]) * (t + 0.5) / n, y = c[k][1] + (c[k + 1][1] - c[k][1]) * (t + 0.5) / n; if (land[idx(x, y)]) cutLen += L / n; } }
    // discs: every marker (own region / water / leaders)
    const discs = [];
    for (const [id, list] of Object.entries(a.anchors)) for (const m of list) discs.push({ id, ...m });
    for (const d of discs) {
      if (d.x - 18 < 0 || d.x + 18 > 639 || d.y - 18 < 0 || d.y + 18 > a.height) f.push(`disc ${d.id} leaves the card`);
      let onSea = 0, onOther = 0, total = 0, maxSeaDepth = 0;
      for (let dy = -18 * S; dy <= 18 * S; dy++) for (let dx = -18 * S; dx <= 18 * S; dx++) {
        if (dx * dx + dy * dy > 18 * 18 * S * S) continue; const i = idx(d.x + dx / S, d.y + dy / S); if (i < 0 || i >= N) continue; total++;
        if (!land[i]) { onSea++; maxSeaDepth = Math.max(maxSeaDepth, 18 - Math.hypot(dx, dy) / S); } else if (d.region && lab[i] !== ['northAmerica', 'southAmerica', 'europe', 'asia', 'africa', 'oceania', 'antarctica'].indexOf(d.region)) onOther++;
      }
      if (d.region) {
        if (onOther) f.push(`continent disc ${d.id} covers ${onOther} px of another region's land`);
        if (maxSeaDepth > 5.01) f.push(`continent disc ${d.id} overlaps the sea by ${maxSeaDepth.toFixed(1)} px (> 5, the anchor rule)`);
      } else if (!d.leader) {
        let near = 1e9; for (let dy = -30 * S; dy <= 30 * S; dy++) for (let dx = -30 * S; dx <= 30 * S; dx++) { const i = idx(d.x + dx / S, d.y + dy / S); if (i >= 0 && i < N && land[i]) near = Math.min(near, Math.hypot(dx, dy) / S); }
        if (near - 18 < 6) f.push(`ocean disc ${d.id} is ${(near - 18).toFixed(1)} px off the coast (< 6)`);
      } else {
        // a leader disc sits in a corner void: off the projection outline and off all land
        let inside = 0;
        const out = svg.querySelector('[data-lcs-sea]');
        const ctm = out.getScreenCTM(), R0 = svg.getBoundingClientRect();
        for (let t = 0; t < 32; t++) { const px = d.x + 18 * Math.cos(t / 32 * 2 * Math.PI), py = d.y + 18 * Math.sin(t / 32 * 2 * Math.PI); const p = svg.createSVGPoint(); p.x = (px) / (R0.width / svg.viewBox.baseVal.width); p.y = py / (R0.height / svg.viewBox.baseVal.height); if (out.isPointInFill(p)) inside++; }
        void ctm;
        if (inside) f.push(`leader disc ${d.id} is not in a corner void (${inside}/32 of its rim on the map) — polar-band clearance`);
        const ti = idx(d.leader.x, d.leader.y);
        const wantLand = d.id === 'antarctica';
        if (wantLand ? !land[ti] || lab[ti] !== 6 : land[ti]) f.push(`leader dot ${d.id} is not on its target (${wantLand ? 'Antarctica' : 'water'})`);
      }
    }
    for (let i = 0; i < discs.length; i++) for (let j = i + 1; j < discs.length; j++) if (Math.hypot(discs[i].x - discs[j].x, discs[i].y - discs[j].y) < 36) f.push(`halos ${discs[i].id} / ${discs[j].id} overlap`);
    const gl = compH(a.greenland[0], a.greenland[1]);
    let glArea = 0; { const s0 = idx(a.greenland[0], a.greenland[1]); const seen = new Set([s0]); const st = [s0]; while (st.length) { const i = st.pop(); glArea++; const xx = i % W; for (const j of [xx > 0 ? i - 1 : -1, xx < W - 1 ? i + 1 : -1, i >= W ? i - W : -1, i < N - W ? i + W : -1]) if (j >= 0 && land[j] && !seen.has(j)) { seen.add(j); st.push(j); } } }
    void gl;
    let glKm = 0; { const s0 = idx(a.greenland[0], a.greenland[1]); const seen = new Set([s0]); const st = [s0]; while (st.length) { const i = st.pop(); glKm += a.rowFactor[Math.floor(i / W)] || 0; const xx = i % W; for (const j of [xx > 0 ? i - 1 : -1, xx < W - 1 ? i + 1 : -1, i >= W ? i - W : -1, i < N - W ? i + W : -1]) if (j >= 0 && land[j] && !seen.has(j)) { seen.add(j); st.push(j); } } }
    return { f, area: area.map((v) => v / (S * S)), areaS: areaS.map((v) => v / (S * S)), km2, eu, nzH, mgH, cutLen, glRatio: glArea / area[4], glKmRatio: glKm / km2[4], cps };
  }, arg);
}

function judgeNumbers(m) {
  const f = [...m.f];
  const r = Object.fromEntries(REG.map((k, i) => [k, m.km2[i]]));   // TRUE areas: each pixel weighted by the projection's inverse area scale at its row
  REG.forEach((k, i) => { if (m.areaS[i] > 0) { const d = m.area[i] / m.areaS[i] - 1; if (Math.abs(d) > 0.02) f.push(`${k}: drawn area ${m.area[i].toFixed(0)} px² vs source ${m.areaS[i].toFixed(0)} (${(d * 100).toFixed(1)} %, > 2 %)`); } });
  const ord = ['asia', 'africa', 'northAmerica', 'southAmerica', 'europe', 'oceania'];
  for (let i = 0; i < ord.length - 1; i++) if (!(r[ord[i]] > r[ord[i + 1]])) f.push(`proportion: ${ord[i]} ${(r[ord[i]] / 1e6).toFixed(2)} M km² ≤ ${ord[i + 1]} ${(r[ord[i + 1]] / 1e6).toFixed(2)} M km²`);
  for (const [k, real] of Object.entries(REAL_MKM2)) if (r[k] > 0 && Math.abs(r[k] / 1e6 / real - 1) > 0.15) f.push(`proportion: ${k} measures ${(r[k] / 1e6).toFixed(2)} M km², real ${real} (> 15 % off)`);
  if (!(m.glKmRatio < 0.2)) f.push(`Greenland is ${(m.glKmRatio * 100).toFixed(0)} % of Africa (>= 20 %)`);
  if (m.eu.w < 95 || m.eu.w > 125) f.push(`Europe bbox ${m.eu.w.toFixed(1)} px ∉ 95..125`);
  if (m.nzH < 6) f.push(`New Zealand ${m.nzH.toFixed(1)} px tall (< 6)`);
  if (m.mgH < 6) f.push(`Madagascar ${m.mgH.toFixed(1)} px tall (< 6)`);
  if (m.cutLen < 40) f.push(`the Europe / Asia cut is ${m.cutLen.toFixed(1)} px over land (< 40)`);
  return f;
}

const ALL_OCEANS = ['pacific', 'atlantic', 'indian', 'arctic', 'southern'];
const NUMS = { northAmerica: 3, southAmerica: 6, europe: 1, asia: 4, africa: 2, oceania: 5, antarctica: 7, pacific: 8, atlantic: 9, indian: 10, arctic: 11, southern: 12 };
const MERGED = [{ id: 'america', regions: ['northAmerica', 'southAmerica'] }, { id: 'europe', regions: ['europe'] }, { id: 'asia', regions: ['asia'] }, { id: 'africa', regions: ['africa'] }, { id: 'oceania', regions: ['oceania'] }];

async function main() {
  const setEN = MAPS_LOC.en.continentSet;
  // (a) provenance + (f) human open
  const sha = crypto.createHash('sha256').update(fs.readFileSync(SRC)).digest('hex');
  ok(sha === WORLD_MAP.header.sha256, `vendored SHA-256 ${sha.slice(0, 12)} ≠ the module header ${WORLD_MAP.header.sha256.slice(0, 12)}`);
  const fresh = TOOL.build().data;
  ok(fresh.hash === WORLD_MAP.hash, `the committed module (${WORLD_MAP.hash}) ≠ a fresh build (${fresh.hash}) — a hand edit or a stale module`);
  const openedOk = (d) => !!(d.mapOpened && d.mapOpened.by && d.mapOpened.date && d.mapOpened.hash === d.hash);
  ok(openedOk(WORLD_MAP), 'the module has no mapOpened for this geometry (open the renders, then tools/build-world-map.js --opened=<who>)');
  // (b) Hausdorff
  const hd = hausdorff(WORLD_MAP);
  ok(hd.srcToDrawn <= 1.0 && hd.drawnToSrc <= 1.0, `Hausdorff ${hd.srcToDrawn.toFixed(2)} / ${hd.drawnToSrc.toFixed(2)} px > 1.0`);
  console.log(`provenance ${sha.slice(0, 12)}…; Hausdorff source→drawn ${hd.srcToDrawn.toFixed(2)} px, drawn→source ${hd.drawnToSrc.toFixed(2)} px; mapOpened ${WORLD_MAP.mapOpened ? WORLD_MAP.mapOpened.by + ' ' + WORLD_MAP.mapOpened.date : 'NONE'}`);
  const log = []; let killed = 0, total = 0;
  const judgeP = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  let pngs = [];
  await H.withBrowser(async (page) => {
    const mA = await measure(page, WORLD_MAP, setEN, ALL_OCEANS, NUMS, 'en7');
    const fA = judgeNumbers(mA); fA.forEach((x) => ok(false, 'en 7+5: ' + x)); assertions += mA.cps.length + 30;
    console.log(`en 7+5: ${fA.length} findings · true areas M km² ${REG.map((k, i) => k + ' ' + (mA.km2[i] / 1e6).toFixed(2)).join(' ')} · Europe ${mA.eu.w.toFixed(1)} px · NZ ${mA.nzH.toFixed(1)} · Madagascar ${mA.mgH.toFixed(1)} · cut ${mA.cutLen.toFixed(1)} px · Greenland/Africa ${(mA.glKmRatio * 100).toFixed(1)} % (true) / ${(mA.glRatio * 100).toFixed(1)} % (on the page)`);
    const mB = await measure(page, WORLD_MAP, MERGED, ['pacific', 'atlantic', 'indian'], { america: 1, europe: 2, asia: 3, africa: 4, oceania: 5, pacific: 6, atlantic: 7, indian: 8 }, 'merged');
    const fB = judgeNumbers(mB).filter((x) => !/proportion|Greenland|antarctica/.test(x)); fB.forEach((x) => ok(false, 'merged 5 no-Antarctica: ' + x)); assertions += mB.cps.length + 20;
    console.log(`merged America, no Antarctica (crop −58): ${fB.length} findings`);
    log.push(`  control: ${fA.length + fB.length} findings`);
    // PR9 lon0 190
    { let f = []; try { const d = TOOL.build({ lon0: 190 }).data; const m = await measure(page, d, setEN, ALL_OCEANS, NUMS, 'PR9'); f = judgeNumbers(m); } catch (e) { f = [e.message]; }
      judgeP('PR9 built at lon0 190', f, /crosses the seam|Oslo|wrong continent/); }
    // PR10 crop north 75
    { let f = []; try { const d = TOOL.build({ cropN: 75 }).data; const m = await measure(page, d, setEN, ALL_OCEANS, NUMS, 'PR10'); f = judgeNumbers(m); } catch (e) { f = [e.message]; }
      judgeP('PR10 crop north 75', f, /Greenland north cape falls outside the card|Greenland/); }
    // PR11 the Europe disc moved onto the Bay of Biscay
    { const P = projector(11, 84, 2000); const [x, y] = P(-8, 45.5); const d = { ...WORLD_MAP, anchors: { ...WORLD_MAP.anchors, europe: { ...WORLD_MAP.anchors.europe, x, y } } };
      judgeP('PR11 continent disc on water', judgeNumbers(await measure(page, d, setEN, ALL_OCEANS, NUMS, 'PR11')), /continent disc europe overlaps the sea/); }
    // PR12 the Arctic disc in the 69..84 N band (no corner void)
    { const P = projector(11, 84, 2000); const [x, y] = P(-150, 79); const d = { ...WORLD_MAP, leaders: { ...WORLD_MAP.leaders, arctic: { ...WORLD_MAP.leaders.arctic, disc: { x, y } } } };
      judgeP('PR12 Arctic disc in the polar band', judgeNumbers(await measure(page, d, setEN, ALL_OCEANS, NUMS, 'PR12')), /leader disc arctic is not in a corner void|leaves the card|halos/); }
    // PR20 no mapOpened
    judgeP('PR20 module without mapOpened', openedOk({ ...WORLD_MAP, mapOpened: null }) ? [] : ['no mapOpened'], /no mapOpened/);
    if (!process.argv.includes('--no-sheet')) {
      const cell = (svg, cap) => `<figure style="margin:6px;display:inline-flex;flex-direction:column;gap:4px;background:#fff;padding:6px;border:1px solid #C8BFAE">${svg}<figcaption>${cap}</figcaption></figure>`;
      const a = WM.worldMap({ w: 639, set: setEN, oceans: ALL_OCEANS, numbers: NUMS }).svg;
      const b = WM.worldMap({ w: 639, set: MERGED, oceans: ['pacific', 'atlantic', 'indian'], numbers: { america: 1, europe: 2, asia: 3, africa: 4, oceania: 5, pacific: 6, atlantic: 7, indian: 8 } }).svg;
      const c = WM.worldMap({ w: 480, set: setEN, oceans: ALL_OCEANS, numbers: NUMS }).svg;
      const d = WM.worldMap({ w: 480, set: MERGED, oceans: [], numbers: {} }).svg;
      pngs = await H.sheet(page, 'world-map', `<div>${cell(a, 'en 7 continents + 5 oceans, 639')}${cell(b, 'merged America, 5 members, no Antarctica (crop −58), 639')}</div><div>${cell(c, 'en at 480')}${cell(d, 'merged at 480, no markers')}</div>`, { width: 1330 });
    }
  });
  console.log('poison:\n' + log.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main };
