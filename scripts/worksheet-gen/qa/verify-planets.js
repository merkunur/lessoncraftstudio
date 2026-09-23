#!/usr/bin/env node
/**
 * verify-planets.js — the gate of primitives/planets.js (G1-378
 * `earth-and-space`, design §2 "Gate (in qa/verify-b5-earth-and-space.js)"; the
 * family gate runs this file as its primitive step).
 *
 *   node scripts/worksheet-gen/qa/verify-planets.js [--no-sheets]
 *
 * The eight glyphs rasterised (sharp) at box 64 and read in GREYSCALE:
 *   meanL  mean Rec.709 lightness of the disc (r <= 27 units, inside the outline)
 *   ring   h / v / 0 from the bounding box of the drawn pixels OUTSIDE r 33
 *   bands  runs of grid-coloured pixels 4.5..10 units tall down the x = 50 column
 *   cap    the top chord (rows 22-29) >= 235 while the rest of the disc <= 200
 * Every PAIR must differ in at least one of: meanL by >= 8 levels, ring, bands
 * (>= 2 vs < 2), cap. Every disc radius (the drawn disc element, in paper px)
 * equal within ±0.5 px across the eight and === 30 units. Tokens only, no text.
 * THROWS — unknown id, box 50.
 * POISON (the untouched set is the control): Venus drawn with the Earth's fills
 * (the pair test) · PR10 Jupiter at the honest r 36 (the uniform radius).
 * SHEETS — box 56 and 64, colour + greyscale: out/dev/G1-378-planets-sheet-{colour,grey}.png
 */
'use strict';
const path = require('path');
const fs = require('fs');
const T = require('../primitives/_tokens.js');
const PL = require('../primitives/planets.js');
const { rasterize, nearest, lum, alpha } = require('./es-raster.js');

const PALETTE = new Set(Object.values(T.color).map((c) => c.toUpperCase()));
const NAMES = Object.keys(T.color);
let assertions = 0;
const fails = [];
const ok = (c, m) => { assertions++; if (!c) fails.push(m); return !!c; };

async function signature(svg) {
  const img = await rasterize(svg, 400);   // 4 px per unit
  const u = img.w / 100;
  let sum = 0, n = 0;
  let top = 0, topN = 0, rest = 0, restN = 0;
  let ox0 = Infinity, ox1 = -Infinity, oy0 = Infinity, oy1 = -Infinity, outN = 0;
  for (let y = 0; y < img.h; y++) for (let x = 0; x < img.w; x++) {
    const X = (x + 0.5) / u, Y = (y + 0.5) / u;
    const r = Math.hypot(X - 50, Y - 50);
    if (r <= 27) {
      const L = lum(img, x, y);
      sum += L; n++;
      if (Y >= 22 && Y <= 29) { top += L; topN++; } else if (Y >= 40) { rest += L; restN++; }
    } else if (r > 33 && alpha(img, x, y) > 128) { outN++; ox0 = Math.min(ox0, X); ox1 = Math.max(ox1, X); oy0 = Math.min(oy0, Y); oy1 = Math.max(oy1, Y); }
  }
  let ring = '0';
  if (outN > 50) { const w = ox1 - ox0, h = oy1 - oy0; ring = w > 1.5 * h ? 'h' : h > 1.5 * w ? 'v' : '?'; }
  // bands down x = 50
  const x = Math.floor(50 * u);
  let bands = 0, run = 0;
  const flush = () => { const len = run / u; if (len >= 4.5 && len <= 10) bands++; run = 0; };
  for (let y = Math.floor(22 * u); y < Math.ceil(78 * u); y++) { if (nearest(img, x, y, NAMES) === 'grid') run++; else flush(); }
  flush();
  const topL = top / Math.max(1, topN), restL = rest / Math.max(1, restN);
  return { meanL: sum / n, ring, bands, cap: topL >= 235 && restL <= 200 };
}

function discRadiusPx(svg) {
  const box = +(/width="([\d.]+)"/.exec(svg)[1]);
  const m = /<circle cx="50" cy="50" r="([\d.]+)" fill="#[0-9A-F]{6}" data-lcs-part="disc"/i.exec(svg);
  return m ? +m[1] * box / 100 : NaN;
}

async function checkSet(svgs, tag) {
  const f = [];
  const sigs = {};
  for (const [id, svg] of Object.entries(svgs)) {
    const hexes = (svg.match(/#[0-9A-Fa-f]{6}\b/g) || []).map((h) => h.toUpperCase());
    if (!hexes.every((h) => PALETTE.has(h))) f.push(`${tag} ${id}: off-palette hex`);
    if (/<text\b/.test(svg)) f.push(`${tag} ${id}: text in a glyph`);
    sigs[id] = await signature(svg);
  }
  const ids = Object.keys(svgs);
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const a = sigs[ids[i]], b = sigs[ids[j]];
    const differ = Math.abs(a.meanL - b.meanL) >= 8 || a.ring !== b.ring || (a.bands >= 2) !== (b.bands >= 2) || a.cap !== b.cap;
    if (!differ) f.push(`${tag}: ${ids[i]} and ${ids[j]} do not differ in greyscale (L ${a.meanL.toFixed(1)} / ${b.meanL.toFixed(1)}, ring ${a.ring}/${b.ring}, bands ${a.bands}/${b.bands}, cap ${a.cap}/${b.cap})`);
  }
  const radii = ids.map((id) => discRadiusPx(svgs[id]));
  const box = +(/width="([\d.]+)"/.exec(svgs[ids[0]])[1]);
  const want = 30 * box / 100;
  radii.forEach((r, i) => { if (!(Math.abs(r - want) <= 0.5)) f.push(`${tag}: glyph radii not uniform — ${ids[i]} disc ${Number.isNaN(r) ? 'unreadable' : r.toFixed(2) + ' px'} vs ${want.toFixed(2)}`); });
  return { f, sigs };
}

const poisonLog = [];
let killed = 0, total = 0;
function judge(name, findings, re, control) {
  total++;
  const hit = findings.some((x) => re.test(x));
  const v = hit && control.length === 0 ? 'KILLED' : control.length ? 'CONTROL RED' : findings.length ? 'WRONG REASON' : 'SILENT';
  if (v === 'KILLED') killed++;
  poisonLog.push(`  ${name}: ${v}${v === 'KILLED' ? '' : ' — ' + JSON.stringify((control.length ? control : findings).slice(0, 3))}`);
}
const glyphs = (box) => Object.fromEntries(PL.PLANET_IDS.map((id) => [id, PL.planetGlyph({ id, box }).svg]));

async function main() {
  for (const box of [56, 64]) {
    const { f, sigs } = await checkSet(glyphs(box), `box ${box}`);
    for (const x of f) ok(false, x);
    assertions += 28 + 8;
    if (box === 64) console.log('signatures (box 64): ' + Object.entries(sigs).map(([id, s]) => `${id} L${s.meanL.toFixed(0)} ${s.ring} b${s.bands}${s.cap ? ' cap' : ''}`).join(' · '));
  }
  const throws = (fn) => { try { fn(); return false; } catch (e) { return true; } };
  ok(throws(() => PL.planetGlyph({ id: 'pluto' })), 'pluto did not throw');
  ok(throws(() => PL.planetGlyph({ id: 'mars', box: 50 })), 'box 50 did not throw');
  const ctl = (await checkSet(glyphs(64), 'ctl')).f;
  {
    const g = glyphs(64);
    g.venus = g.earth.replace('data-lcs-planet="earth"', 'data-lcs-planet="venus"');
    judge('Venus drawn with the Earth\'s fills', (await checkSet(g, 'P')).f, /earth and venus do not differ|venus and earth do not differ/, ctl);
  }
  {
    const g = glyphs(64);
    g.jupiter = g.jupiter.replace(/<circle cx="50" cy="50" r="30" (fill="#FFFFFF" data-lcs-part="disc")/, '<circle cx="50" cy="50" r="36" $1');
    ok(g.jupiter !== glyphs(64).jupiter, 'PR10 needle missed');
    judge('PR10 Jupiter at honest r 36', (await checkSet(g, 'P')).f, /glyph radii not uniform — jupiter disc 23\.04 px/, ctl);
  }
  const pngs = [];
  if (!process.argv.includes('--no-sheets')) {
    const puppeteer = require('puppeteer');
    const out = path.join(__dirname, '..', 'out', 'dev');
    fs.mkdirSync(out, { recursive: true });
    const row = (box) => `<div>${PL.PLANET_IDS.map((id) => `<figure style="margin:8px;display:inline-flex;flex-direction:column;align-items:center;font:12px sans-serif">${PL.planetGlyph({ id, box }).svg}<figcaption>${id} ${box}</figcaption></figure>`).join('')}</div>`;
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 900, height: 400, deviceScaleFactor: 3 });
      for (const [name, filter] of [['colour', ''], ['grey', 'filter:grayscale(1)']]) {
        await page.setContent(`<html><body style="margin:8px;background:#FFFFFF;${filter}">${row(56)}${row(64)}</body></html>`);
        const fp = path.join(out, `G1-378-planets-sheet-${name}.png`);
        await page.screenshot({ path: fp, fullPage: true });
        pngs.push(fp);
      }
    } finally { await browser.close(); }
  }
  console.log('poison:\n' + poisonLog.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { signature, checkSet };
