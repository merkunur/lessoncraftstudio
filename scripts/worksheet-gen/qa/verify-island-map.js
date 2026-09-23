#!/usr/bin/env node
/**
 * verify-island-map.js — the gate of primitives/island-map.js + data/b5/island.js ISLE_1 (G1-379
 * `maps` base / F5; design docs/worksheet-gen/b5-designs/G1-379-maps.md §2 "NEW primitives/island-map.js").
 *
 *   node scripts/worksheet-gen/qa/verify-island-map.js [--no-sheet]
 *
 * GEOMETRY (the sampled polylines the drawing uses): the river crosses the coast EXACTLY once and
 *   its spring is on land; the road meets the coast only at its two ends; every bridge slot lies
 *   on a river / line intersection (+-2 units); each footpath starts and ends on the island.
 * SLOTS — the committed ISLE_1.slots === a fresh tools/build-island-slots.js build (--check);
 *   every config the ladder USES holds enough slots (d2 44 px none/P1/P2 >= 15: the smallest d2
 *   page places 11 + 4 spare; d1 48 px none >= 14; F5 40 px on 533 none >= 11); the composer
 *   asserts capacity >= placed + 4 per page.
 * RENDER — every slot of every config FILLED (44 px on 615, 48 px on 615, 40 px on 533): each
 *   symbol's four box corners on LAND (the rendered land path, isPointInFill), every box >= 6 px
 *   clear of the river and road bands (measured on the drawn paths), pairwise box gaps >= 8 px,
 *   the north arrow's whole box on SEA, every bridge on the river, the rendered symbol box === its
 *   px; token hexes only; no <text> but the north letter.
 * POISON — PR2 a symbol centred on the river band -> band clearance; a north arrow moved onto
 *   the land -> "arrow on land"; a stale slot table (one slot nudged) -> --check.
 * SHEET — out/dev/G1-379-island-{colour,grey}.png (the island filled at 615 with P1, and at 533).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const IM = require('../primitives/island-map.js');
const SLOTS = require('../tools/build-island-slots.js');
const H = require('./b5-maps-harness.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const IDS = ['house', 'tree', 'bush', 'pond', 'bench', 'tent', 'flowerBed'];
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

function geometry() {
  const g = IM.islandGeometry();
  const f = [];
  const rc = IM.polylineCrossings(g.river, g.coast, true);
  if (rc.length !== 1) f.push(`the river crosses the coast ${rc.length} times (≠ 1)`);
  if (!IM.pointInPoly(IM.ISLE_1.river.pts[0], g.coast)) f.push('the spring is not on the island');
  const road = IM.polylineCrossings(g.road, g.coast, true);
  const n = g.road.length;
  if (road.length !== 2 || !road.some((c) => c.i < 3) || !road.some((c) => c.i > n - 4)) f.push(`the road meets the coast ${road.length} times, not only at its two ends`);
  for (const [slot, line] of [['A', g.road], ['B', g.paths.P1], ['C', g.paths.P2]]) {
    const c = g.crossings[slot];
    if (!c) { f.push(`bridge ${slot}: no crossing`); continue; }
    if (IM.distToPolyline([c.x, c.y], g.river, false) > 2 || IM.distToPolyline([c.x, c.y], line, false) > 2) f.push(`bridge ${slot} is off the river / line intersection`);
  }
  for (const [k, pl] of Object.entries(g.paths)) if (!IM.pointInPoly(pl[0], g.coast) || !IM.pointInPoly(pl[pl.length - 1], g.coast)) f.push(`footpath ${k} leaves the island`);
  return f;
}

function fullIsland(px, w, cfg, extra = {}) {
  const key = IM.slotKey(px, w), slots = IM.ISLE_1.slots[key][cfg];
  const fp = cfg === 'none' ? [] : cfg === 'P1P2' ? ['P1', 'P2'] : [cfg];
  return IM.islandMap({ w, symPx: px, footpaths: fp, symbols: slots.map((p, i) => ({ id: IDS[i % IDS.length], x: p[0], y: p[1] })), northArrow: w === 615 ? { letter: 'N' } : null, ...extra });
}

async function renderCheck(page, islands, tag) {
  await H.openDoc(page, `island-measure-${tag}`, islands.map((s, i) => `<div id="i${i}" style="margin:4px">${s}</div>`).join(''));
  return page.evaluate((n) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      const f = [];
      const svg = document.querySelector(`#i${k} svg`);
      const symPx = +svg.dataset.lcsSymPx;
      const land = svg.querySelector('[data-lcs-land]'), ctm = svg.getScreenCTM();
      const onLand = (x, y) => { const p = svg.createSVGPoint(); p.x = (x - ctm.e) / ctm.a; p.y = (y - ctm.f) / ctm.d; return land.isPointInFill(p); };
      const box = (s) => { if (s.tagName.toLowerCase() !== 'svg') return s.getBoundingClientRect(); const x = +s.getAttribute('x'), y = +s.getAttribute('y'), w = +s.getAttribute('width'), h = +s.getAttribute('height'); return { left: ctm.a * x + ctm.e, top: ctm.d * y + ctm.f, right: ctm.a * (x + w) + ctm.e, bottom: ctm.d * (y + h) + ctm.f, width: ctm.a * w, height: ctm.d * h }; };
      const band = (sel) => { const p = svg.querySelector(sel); const m = p.getScreenCTM(); const L = p.getTotalLength(); const pts = []; for (let i = 0; i <= 500; i++) { const q = p.getPointAtLength((L * i) / 500); pts.push([m.a * q.x + m.e, m.d * q.y + m.f]); } return { pts, half: (parseFloat(p.getAttribute('stroke-width')) / 2 + 1.5) * m.a }; };
      const river = band('[data-lcs-river]'), road = band('[data-lcs-road]');
      const bd = (r, [x, y]) => Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
      const syms = [...svg.querySelectorAll('[data-lcs-sym]')];
      const placed = syms.filter((s) => s.dataset.lcsSym !== 'bridge');
      for (const s of placed) {
        const r = box(s);
        if (Math.abs(r.width - symPx) > 0.6) f.push(`${s.dataset.lcsSym}: ${r.width.toFixed(1)} px ≠ ${symPx}`);
        for (const [x, y] of [[r.left + 1, r.top + 1], [r.right - 1, r.top + 1], [r.left + 1, r.bottom - 1], [r.right - 1, r.bottom - 1]]) if (!onLand(x, y)) { f.push(`${s.dataset.lcsSym} (${s.dataset.lcsX},${s.dataset.lcsY}): a box corner on the sea`); break; }
        for (const [nm, b] of [['river', river], ['road', road]]) { const d = Math.min(...b.pts.map((p) => bd(r, p))) - b.half; if (d < 6) f.push(`${s.dataset.lcsSym} (${s.dataset.lcsX},${s.dataset.lcsY}) is ${d.toFixed(1)} px from the ${nm} band (< 6)`); }
      }
      const boxes = syms.map((s) => ({ id: s.dataset.lcsSym, r: box(s) }));
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i].r, b = boxes[j].r; const gap = Math.max(b.left - a.right, a.left - b.right, b.top - a.bottom, a.top - b.bottom); if (gap < 8) f.push(`${boxes[i].id} / ${boxes[j].id} ${gap.toFixed(1)} px apart (< 8)`); }
      for (const b of syms.filter((s) => s.dataset.lcsSym === 'bridge')) { const r = b.getBoundingClientRect(), cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2; const d = Math.min(...river.pts.map(([x, y]) => Math.hypot(x - cx, y - cy))); if (d > 3) f.push(`bridge ${b.dataset.lcsSlot} ${d.toFixed(1)} px off the river`); }
      const arrow = svg.querySelector('[data-lcs-north]');
      if (arrow) { const r = arrow.getBoundingClientRect(); let hit = false; for (let a = 0; a <= 10; a++) for (let b = 0; b <= 10; b++) if (onLand(r.left + (r.width * a) / 10, r.top + (r.height * b) / 10)) hit = true; if (hit) f.push('the north arrow is on the land (arrow on land)'); }
      out.push({ f, n: placed.length });
    }
    return out;
  }, islands.length);
}

async function main() {
  geometry().forEach((x) => ok(false, 'geometry: ' + x)); ok(true, 'geometry');
  const fresh = SLOTS.build({ ...IM.ISLE_1, slots: undefined });
  ok(JSON.stringify(fresh) === JSON.stringify(IM.ISLE_1.slots), 'the committed slots differ from a fresh tools/build-island-slots.js build');
  // the configs the ladder USES and their floors: d2 (44 on 615, 0..1 footpath) places >= 11 -> 15; d1 (48, no footpath)
  // places <= 10 -> 14; F5 (40 on 533, no footpath) places 7 -> 11
  const USED = { s44w615: { none: 15, P1: 15, P2: 15 }, s48w615: { none: 14 }, s40w533: { none: 11 } };
  for (const [k, v] of Object.entries(USED)) for (const [c, need] of Object.entries(v)) ok(IM.ISLE_1.slots[k][c].length >= need, `${k}/${c}: ${IM.ISLE_1.slots[k][c].length} slots < ${need}`);
  for (const [what, fn] of [['w 479', () => IM.islandMap({ w: 479 })], ['a bridge placed as a symbol', () => IM.islandMap({ symbols: [{ id: 'bridge', x: 200, y: 100 }] })], ['a symbol in the sea', () => IM.islandMap({ symbols: [{ id: 'tree', x: 10, y: 10 }] })], ['unknown footpath', () => IM.islandMap({ footpaths: ['P9'] })]]) {
    let threw = false; try { fn(); } catch (e) { threw = true; } ok(threw, `${what} must THROW`);
  }
  const all = [];
  for (const [px, w] of SLOTS.SIZES) for (const cfg of ['none', 'P1', 'P2']) all.push(fullIsland(px, w, cfg).svg);
  for (const s of all) { for (const h of s.match(/#[0-9a-fA-F]{6}\b/g) || []) ok(PALETTE.has(h.toUpperCase()), `off-palette ${h}`); ok((s.match(/<text/g) || []).length <= 1, 'a <text> other than the north letter'); }
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  let pngs = [];
  await H.withBrowser(async (page) => {
    const rs = await renderCheck(page, all, 'all');
    rs.forEach((r, i) => r.f.forEach((x) => ok(false, `render ${i}: ${x}`))); assertions += rs.reduce((s, r) => s + r.n, 0);
    console.log(`render: ${rs.length} islands, ${rs.reduce((s, r) => s + r.n, 0)} placed symbols measured; ${rs.reduce((s, r) => s + r.f.length, 0)} findings`);
    log.push(`  control: ${rs.reduce((s, r) => s + r.f.length, 0)} findings`);
    // PR2: a symbol centred on the river band
    const g = IM.islandGeometry(); const onRiver = g.river[Math.floor(g.river.length * 0.35)];
    const p2 = IM.islandMap({ w: 615, symbols: [{ id: 'bush', x: onRiver[0], y: onRiver[1] }], northArrow: { letter: 'N' } }).svg;
    judge('PR2 symbol on the river band', (await renderCheck(page, [p2], 'PR2'))[0].f, /from the river band/);
    // arrow on land
    const onLand = IM.islandMap({ w: 615, northArrow: { letter: 'N' }, isle: { ...IM.ISLE_1, id: 'isle-1-poison', arrow: { x: 300, y: 100, w: 40, h: 56 } } }).svg;
    judge('P arrow on land', (await renderCheck(page, [onLand], 'Parrow'))[0].f, /arrow on land/);
    // stale slot table
    const stale = JSON.parse(JSON.stringify(IM.ISLE_1.slots)); stale.s44w615.none[0][0] += 3;
    judge('P stale slot table', JSON.stringify(fresh) === JSON.stringify(stale) ? [] : ['the committed slots differ from a fresh build'], /differ from a fresh build/);
    if (!process.argv.includes('--no-sheet')) pngs = await H.sheet(page, 'island', `<div>${fullIsland(44, 615, 'P1').svg}</div><div style="margin-top:8px">${fullIsland(40, 533, 'none').svg}</div>`);
  });
  console.log('slots: ' + Object.entries(IM.ISLE_1.slots).map(([k, v]) => `${k} ` + Object.entries(v).map(([c, a]) => `${c} ${a.length}`).join('/')).join(' · '));
  console.log('poison:\n' + log.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main };
