#!/usr/bin/env node
/**
 * verify-school-ruling.js [--no-png] — the render-measuring gate of
 * primitives/school-ruling.js (nt5-F `cursive-writing`, G2-377; design §2 / §5).
 *
 * For every SHIPPED unit and every ruling kind at its SMALLEST and LARGEST
 * geometry (non-Seyès X 14 / 18 plain and capital rows; Seyès i 11.34 / 15.12
 * mm-steps), the EMITTED svg is rendered in Chromium (through the real file://
 * cursive faces, the component's own @font-face) and every line's rendered y
 * is read back and compared with rulingGeometry() / seyesGeometry() recomputed
 * here from primitives/cursive-metrics.json (±0.6 px):
 *   us3    top · x · base          lin4  top · x · base · desc     doble  x · base
 *   seyes  a thin line every i, the writing lines at 3 i / 7 i (row A / B)
 *   every kind: the coral margin rule at marginX, full height
 * plus the INK: a "xxx" run of the unit placed by the component on each
 * non-Seyès row must put its ink top ON the x-line and its ink bottom within
 * xDescender of the base line (±1.2 px), i.e. the lines sit on the MEASURED ink.
 *
 * Poison (both ways): a line moved 2 px in the emitted svg FAILS; the committed
 * primitive PASSES; a geometry for an unknown unit THROWS. Writes colour +
 * greyscale sheets to out/dev/G2-377-school-ruling{,-grey}.png for the human
 * print check (the Mittelband must survive greyscale). Exit 1 on any failure.
 *
 * EXPORTS run({ page }) → { assertions, fails } (the family gate calls it).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const SR = require('../primitives/school-ruling.js');
const C = require('../templates/components-b6/cursive-writing.js');
const { NEUTRAL_UNITS } = (() => ({ NEUTRAL_UNITS: require('../data/b6/cursive-writing.js').CURSIVE_WRITING_NEUTRAL.shipped }))();

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'out', 'dev');
const W = 675, MARGIN = 76;

function cases() {
  const out = [];
  for (const unit of NEUTRAL_UNITS) {
    for (const kind of ['us3', 'lin4', 'doble']) {
      for (const X of [14, 18]) for (const cap of [false, true]) out.push({ unit, kind, X, cap });
    }
    for (const i of [11.34, 15.12]) out.push({ unit, kind: 'seyes', i });
  }
  return out;
}

function caseHtml(c, k, poison) {
  if (c.kind === 'seyes') {
    const g = SR.seyesGeometry({ unit: c.unit, i: c.i, rows: 2, last: false });
    let svg = SR.schoolRuling({ kind: 'seyes', w: W, geom: g, marginX: MARGIN });
    if (poison) svg = svg.replace(/(data-lcs-line="seyes-writing" data-lcs-y=")/, '$1').replace(/y1="([0-9.]+)" x2="675" y2="([0-9.]+)" stroke="#8A8276"/, (m, a, b) => `y1="${+a + 2}" x2="675" y2="${+b + 2}" stroke="#8A8276"`);
    return { html: `<div class="case" data-k="${k}" style="position:relative;width:${W}px;height:${g.height}px;margin:6px 0">${svg}</div>`, expect: { seyes: true, i: c.i, baselines: g.baselines, height: g.height } };
  }
  const g = SR.rulingGeometry({ unit: c.unit, kind: c.kind, X: c.X, cap: c.cap });
  const inner = C.cwChainRun({ unit: c.unit, texts: ['xxx'], fs: g.fs, yB: g.yB, left: MARGIN + 16, gap: 26 });
  let row = C.cwRow({ kind: c.kind, unit: c.unit, geom: g, w: W, marginX: MARGIN, row: 'A', inner });
  if (poison) row = row.replace(/(<line x1="0" y1=")([0-9.]+)(" x2="675" y2=")([0-9.]+)(" stroke="[^"]+" stroke-width="[^"]+"(?: stroke-dasharray="[^"]+")? data-lcs-line="x")/, (m, a, y1, b, y2, c2) => `${a}${+y1 + 2}${b}${+y2 + 2}${c2}`);
  const lines = { us3: ['top', 'x', 'base'], lin4: ['top', 'x', 'base', 'desc'], doble: ['x', 'base'] }[c.kind];
  const want = { top: g.yTop, x: g.yX, base: g.yB, desc: g.yD };
  const m = SR.metricsFor(c.unit);
  return { html: `<div class="case" data-k="${k}" style="margin:6px 0">${row}</div>`, expect: { lines: Object.fromEntries(lines.map((l) => [l, want[l]])), rowH: g.rowH, xDesc: m.xDescender * g.fs } };
}

async function measure(page, list, poison) {
  const faces = [...new Set(list.map((c) => c.unit))].map((u) => C.cwFontFace(u)).join('');
  const built = list.map((c, k) => caseHtml(c, k, poison && k === 0));
  const html = `<!doctype html><html><head><meta charset="utf-8">${faces}<style>body{margin:8px;background:#FFFFFF}</style></head><body>${built.map((b) => b.html).join('')}</body></html>`;
  const f = path.join(OUT, `G2-377-school-ruling${poison ? '-poison' : ''}.html`);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(f, html, 'utf8');
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
  await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate((expects) => {
    const fails = []; let n = 0;
    const ctx = document.createElement('canvas').getContext('2d');
    document.querySelectorAll('.case').forEach((el) => {
      const k = Number(el.dataset.k), e = expects[k];
      const svg = el.querySelector('svg[data-lcs-prim="school-ruling"]');
      const top = svg.getBoundingClientRect().top;
      const lineY = (ln) => { const r = ln.getBoundingClientRect(); return (r.top + r.bottom) / 2 - top; };
      const margin = svg.querySelector('line[data-lcs-line="margin"]');
      const mr = margin.getBoundingClientRect();
      n++; if (Math.abs((mr.left + mr.right) / 2 - svg.getBoundingClientRect().left - 76) > 0.6 || Math.abs(mr.height - svg.getBoundingClientRect().height) > 0.6) fails.push(`case ${k}: margin rule not at 76 full height`);
      if (e.seyes) {
        const thin = [...svg.querySelectorAll('line[data-lcs-line="seyes-thin"], line[data-lcs-line="seyes-writing"]')].map(lineY).sort((a, b) => a - b);
        for (let j = 1; j < thin.length; j++) { n++; if (Math.abs(thin[j] - thin[j - 1] - e.i) > 0.6) fails.push(`case ${k}: Seyès interline ${(thin[j] - thin[j - 1]).toFixed(2)} ≠ i ${e.i}`); }
        const writing = [...svg.querySelectorAll('line[data-lcs-line="seyes-writing"]')].map(lineY);
        for (const b of e.baselines) { n++; if (!writing.some((y) => Math.abs(y - b) <= 0.6)) fails.push(`case ${k}: no writing line at ${b} (have ${writing.map((y) => y.toFixed(1)).join(',')})`); }
        return;
      }
      for (const [name, y] of Object.entries(e.lines)) {
        const ln = svg.querySelector(`line[data-lcs-line="${name}"]`);
        n++;
        if (!ln) { fails.push(`case ${k}: no ${name} line`); continue; }
        const got = lineY(ln);
        if (Math.abs(got - y) > 0.6) fails.push(`case ${k}: ${name} line at ${got.toFixed(2)} ≠ geometry ${y}`);
      }
      // the ink: "xxx" on this row — its top on the x-line, its bottom on the base line (+ the x's own descent)
      const span = el.querySelector('[data-lcs-cursive]');
      const cs = getComputedStyle(span);
      ctx.font = `${cs.fontSize} ${cs.fontFamily}`;
      const mt = ctx.measureText(span.textContent);
      const rng = document.createRange(); rng.selectNodeContents(span);
      // the rendered baseline: a zero-size inline-block probe at vertical-align:baseline
      const pr = document.createElement('span'); pr.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; span.appendChild(pr);
      const bl = pr.getBoundingClientRect().top - top; pr.remove();
      const inkTop = bl - mt.actualBoundingBoxAscent, inkBot = bl + mt.actualBoundingBoxDescent;
      n++; if (Math.abs(inkTop - e.lines.x) > 1.2) fails.push(`case ${k}: "xxx" ink top ${inkTop.toFixed(2)} not on the x-line ${e.lines.x}`);
      n++; if (Math.abs(bl - e.lines.base) > 1.0) fails.push(`case ${k}: baseline ${bl.toFixed(2)} not on the base line ${e.lines.base}`);
      n++; if (inkBot - e.lines.base > e.xDesc + 1.2) fails.push(`case ${k}: "xxx" ink bottom ${inkBot.toFixed(2)} below base + xDescender`);
    });
    return { n, fails };
  }, built.map((b) => b.expect));
}

async function run({ page, png = true }) {
  const list = cases();
  const fails = [];
  let assertions = 0;
  const good = await measure(page, list, false);
  assertions += good.n;
  for (const f of good.fails) fails.push('school-ruling: ' + f);
  if (png) {
    await page.screenshot({ path: path.join(OUT, 'G2-377-school-ruling.png'), fullPage: true });
    await page.addStyleTag({ content: 'body{filter:grayscale(1)}' });
    await page.screenshot({ path: path.join(OUT, 'G2-377-school-ruling-grey.png'), fullPage: true });
  }
  // poison both ways: case 0 (us3) and the first Seyès case with a line moved 2 px must FAIL
  const firstSeyes = list.findIndex((c) => c.kind === 'seyes');
  for (const [label, sub] of [['a us3 x-line moved 2 px', [list[0]]], ['a Seyès writing line moved 2 px', [list[firstSeyes]]]]) {
    const bad = await measure(page, sub, true);
    assertions++;
    if (!bad.fails.length) fails.push(`school-ruling POISON SILENT: ${label} passed`);
    else console.log(`poison killed: ${label} → ${bad.fails[0]}`);
  }
  assertions++;
  try { SR.rulingGeometry({ unit: 'fr-moderne2', kind: 'us3', X: 16 }); fails.push('school-ruling POISON SILENT: an unknown unit built a geometry'); } catch (e) { console.log('poison killed: unknown unit → ' + e.message.slice(0, 80)); }
  // fix round 2: a closed slice's `tail` (interlines under its last writing line) — 3 draws NO extra writing line
  // (the face slice), 4 would draw the next writing line and THROWS (both directions)
  for (const i of [11.34, 15.12]) {
    const g = SR.seyesGeometry({ unit: 'fr-trad', i, rows: 2, last: true, tail: 3 });
    const svg = SR.schoolRuling({ kind: 'seyes', w: W, geom: g, marginX: MARGIN });
    const writing = [...svg.matchAll(/data-lcs-line="seyes-writing" data-lcs-y="([0-9.]+)"/g)].map((m) => Number(m[1]));
    assertions++;
    if (writing.join(',') !== g.baselines.join(',')) fails.push(`school-ruling: a tail-3 slice at i ${i} draws writing lines ${writing.join(',')} (want only its baselines ${g.baselines.join(',')})`);
    if (Math.abs(g.height - Math.round(10 * i * 100) / 100) > 0.011) fails.push(`school-ruling: a tail-3 slice at i ${i} is ${g.height} high (want 10 i)`);
  }
  assertions++;
  try { SR.seyesGeometry({ unit: 'fr-trad', i: 15.12, rows: 2, last: true, tail: 4 }); fails.push('school-ruling POISON SILENT: a tail-4 slice (its 4th interline IS the next writing line) was built'); } catch (e) { console.log('poison killed: Seyès tail 4 → ' + e.message.slice(0, 80)); }
  return { assertions, fails, cases: list.length };
}

if (require.main === module) {
  (async () => {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
      const r = await run({ page, png: !process.argv.includes('--no-png') });
      for (const f of r.fails) console.log('FAIL ' + f);
      console.log(`verify-school-ruling: ${r.cases} cases, ${r.assertions} assertions, ${r.fails.length} failure(s)`);
      process.exitCode = r.fails.length ? 1 : 0;
    } finally { await browser.close(); }
  })();
}

module.exports = { run };
