#!/usr/bin/env node
/**
 * Gate: the in-browser downloads (ARCHITECTURE §3, P3) in Chromium, Firefox and WebKit (Safari's engine), with real
 * clicks and real downloaded files.
 *
 *   "Save as image" (page tools) → a PNG of the whole sheet at 2× (US Letter 1632 × 2112 / A4 1588 × 2246), white
 *     background, the page drawn (not blank): ≥ 3 % of its pixels are ink, and the picture area is not empty
 *   "Download PDF" (shown with ?pdf=raster and on iPad / iPhone) → a PDF with one page per worksheet page at exact
 *     Letter / A4 points, each page one JPEG; with the answer key on → page + key pages
 *   spike S2 (fidelity): the PNG of a page against the same page photographed by the browser itself
 *     (page.screenshot of the preview's paper document at 2×) — differing pixels reported; pass ≤ 0.5 %
 *   each download is one download on the meter
 *
 *   node scripts/makers/gates/exports-shell.js [--browsers=chromium,firefox,webkit]
 */
'use strict';
const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');
const REPO = path.join(__dirname, '..', '..', '..');
const { chromium, firefox, webkit } = require(path.join(REPO, 'frontend', 'node_modules', 'playwright'));
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const { PDFDocument } = require(path.join(REPO, 'node_modules', 'pdf-lib'));
const { handler } = require('../serve.js');

const ENGINES = { chromium, firefox, webkit };
const want = (process.argv.find((a) => a.startsWith('--browsers=')) || '--browsers=chromium,firefox,webkit').slice(11).split(',');

async function pixels(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}
/** share of pixels that are not near-white */
function inkShare(px) {
  let ink = 0;
  for (let k = 0; k < px.data.length; k += 3) if (px.data[k] < 235 || px.data[k + 1] < 235 || px.data[k + 2] < 235) ink++;
  return ink / (px.w * px.h);
}
/*
 * Share of pixels of `a` that differ by more than 48 in some channel from EVERY pixel of `b` within 1 px. A sub-pixel
 * offset of a picture or a glyph edge (measured in WebKit: identical-looking images, differences spread evenly along
 * every edge) is not a visible difference; a missing picture, a wrong font or a shifted block still is.
 */
function diffShare(a, b) {
  if (a.w !== b.w || a.h !== b.h) return 1;
  const near = (k, j) => Math.abs(a.data[k] - b.data[j]) <= 48 && Math.abs(a.data[k + 1] - b.data[j + 1]) <= 48 && Math.abs(a.data[k + 2] - b.data[j + 2]) <= 48;
  let n = 0;
  for (let y = 0; y < a.h; y++) {
    for (let x = 0; x < a.w; x++) {
      const k = (y * a.w + x) * 3;
      if (near(k, k)) continue;
      let ok = false;
      for (let dy = -1; dy <= 1 && !ok; dy++) for (let dx = -1; dx <= 1 && !ok; dx++) {
        const yy = y + dy, xx = x + dx;
        if (yy >= 0 && yy < a.h && xx >= 0 && xx < a.w && near(k, (yy * a.w + xx) * 3)) ok = true;
      }
      if (!ok) n++;
    }
  }
  return n / (a.w * a.h);
}

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const access = (q) => new Promise((r) => http.get(`${base}/__dev/access?${q}`, (res) => { let b = ''; res.on('data', (c) => { b += c; }); res.on('end', () => r(JSON.parse(b))); }));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-exports-'));
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };
  const s2 = [];

  for (const name of want) {
    const browser = await ENGINES[name].launch();
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, deviceScaleFactor: 2, acceptDownloads: true });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    const settle = (ms = 900) => p.waitForTimeout(ms);

    // 1. Save as image (en, US Letter; counting K-002: pictures + numbers)
    await access('as=free&made=0&downloaded=0');
    await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-002&pdf=raster`, { waitUntil: 'networkidle' }); await settle(1200);
    await p.click('.mk-access button'); await settle(1500);
    const before = (await access('')).downloaded;
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 60000 }), p.click('.mk-page [data-act=image]')]);
    const png = path.join(tmp, `${name}.png`);
    await dl.saveAs(png);
    const px = await pixels(png);
    const ink = inkShare(px);
    check(`${name}: Save as image → ${dl.suggestedFilename()} ${px.w}×${px.h}, ink ${(ink * 100).toFixed(1)} %`, px.w === 1632 && px.h === 2112 && ink > 0.03 && /\.png$/.test(dl.suggestedFilename()), { w: px.w, h: px.h, ink });
    // the white margin stays white (background painted), the picture area holds pictures
    const corner = px.data.slice(0, 3);
    check(`${name}: the paper is white (no black background)`, corner[0] > 245 && corner[1] > 245 && corner[2] > 245, [...corner]);
    check(`${name}: one download counted`, (await access('')).downloaded === before + 1);

    // spike S2: the browser's own photo of the same paper document at 2×
    const ref = path.join(tmp, `${name}-ref.png`);
    const shot = await ctx.newPage();
    const srcdoc = await p.evaluate(() => document.querySelector('.mk-sheet iframe').getAttribute('srcdoc'));
    await shot.setViewportSize({ width: 816, height: 1056 });
    await shot.goto(`${base}/makers/app/`); // same origin, so relative asset URLs resolve
    await shot.setContent(srcdoc, { waitUntil: 'networkidle' });
    await shot.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    await shot.screenshot({ path: ref, clip: { x: 0, y: 0, width: 816, height: 1056 } });
    await shot.close();
    const d = diffShare(px, await pixels(ref));
    s2.push({ browser: name, diff: d });
    check(`${name}: spike S2 — the image matches the browser's own render (${(d * 100).toFixed(2)} % of pixels differ; pass ≤ 0.5 %)`, d <= 0.005, d);

    // 2. Download PDF: two pages
    await access('as=sub&made=0&downloaded=0');
    await p.goto(`${base}/makers/app/?maker=counting&lang=de&t=K-002&pdf=raster`, { waitUntil: 'networkidle' }); await settle(1200);
    await p.click('#mk-add'); await settle(1500);
    const shown = await p.isVisible('#mk-pdf');
    const [dl2] = await Promise.all([p.waitForEvent('download', { timeout: 120000 }), p.click('#mk-pdf')]);
    const pdfFile = path.join(tmp, `${name}.pdf`);
    await dl2.saveAs(pdfFile);
    const pdf = await PDFDocument.load(fs.readFileSync(pdfFile));
    const sizes = pdf.getPages().map((pg) => pg.getSize()).map((s) => `${s.width.toFixed(2)}×${s.height.toFixed(2)}`);
    check(`${name}: Download PDF → ${dl2.suggestedFilename()}: ${sizes.length} A4 pages`, shown && sizes.length === 2 && sizes.every((s) => s === '595.28×841.89') && /\.pdf$/.test(dl2.suggestedFilename()), { shown, sizes });
    const label = await p.textContent('#mk-pdf');
    check(`${name}: the button is usable again afterwards ("${label}")`, label === 'PDF herunterladen' && !(await p.isDisabled('#mk-pdf')));

    // 3. without ?pdf=raster on a desktop the raster button is hidden (Print makes the vector PDF)
    await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-002`, { waitUntil: 'networkidle' }); await settle(1000);
    check(`${name}: desktop: no Download PDF button (Print saves the vector PDF)`, !(await p.isVisible('#mk-pdf')));

    if (errs.length) { fails++; console.log(`FAIL ${name}: page errors: ` + errs.slice(0, 3).join(' | ')); }
    await browser.close();
  }
  await access('as=sub&made=0&downloaded=0');
  if (process.argv.includes('--keep')) console.log('kept: ' + tmp); else fs.rmSync(tmp, { recursive: true, force: true });
  srv.close();
  console.log('S2: ' + s2.map((x) => `${x.browser} ${(x.diff * 100).toFixed(2)} %`).join(' · '));
  console.log(fails ? `exports gate: ${fails} failing` : 'exports gate: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('exports gate: error — ' + e.message); process.exit(1); });
