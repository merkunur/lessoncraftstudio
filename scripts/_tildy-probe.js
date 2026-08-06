#!/usr/bin/env node
/* =====================================================================
   _tildy-probe.js — the multi-state control-bottom probe for "Tildy's Tailor
   Shop / Ruler Lab" (2.MD.A.1). The uncapped visual-qa sweep covers first
   paint; this drives the place / aligned-pre-commit / read / off-by-one-
   consequence / span / diagnose / select-tool / committed-done states and per
   the #10 lesson MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` <= vh-4 across 320·360·412·768·1024·1366. Bakes in the
   text-containment check (prompt / numerals / Tildy line) + a no-overlap check
   (the HTML Measure-it / option buttons) + tap >=44px (Measure-it + chips — the
   ruler + numerals are SVG sub-nodes, exempt) + no horizontal overflow.
   (Unique name — grepped clear.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'tildy.measure-ruler.2-md-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const fails = [];
  const url = `http://127.0.0.1:${PORT}/tildy-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TildyActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'tildy.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TildyActivity.round && document.querySelector('.td-root'), { timeout: 4000 });
    await sleep(40);
  }
  const setZero = (cm) => page.evaluate((c) => window.TildyActivity._setRulerZero(c), cm).then(() => sleep(12));
  const measure = () => page.evaluate(() => window.TildyActivity._measureIt()).then(() => sleep(12));
  const tapVal = (v) => page.evaluate((x) => window.TildyActivity._tapValue(x), v).then(() => sleep(12));

  const states = {
    'place': async () => { await force('align-ribbon-7'); },
    'aligned': async () => { await force('align-ribbon-7'); await setZero(0); },
    'read': async () => { await force('align-ribbon-7'); await setZero(0); await measure(); },
    'offbyone': async () => { await force('align-ribbon-7'); await setZero(1); await measure(); },
    'span': async () => { await force('span-broken-6'); },
    'diagnose': async () => { await force('diagnose-offby1'); },
    'select-tool': async () => { await force('select-tool-11'); },
    'committed': async () => { await force('align-yarn-4'); await setZero(0); await measure(); await tapVal(4); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.td-measure,.td-opt,.td-options,.td-stage,.td-done,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.td-measure,.td-opt'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      let bleed = 0;
      document.querySelectorAll('.td-prompt,.td-saytext,.td-counthint,.td-donetext,.td-opt').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      const boxes = Array.from(document.querySelectorAll('.td-measure,.td-opt')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, bleed, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.TildyActivity; return t && t._activityRow && document.querySelector('.td-root'); }, { timeout: 15000 });

  const order = ['place', 'aligned', 'read', 'offbyone', 'span', 'diagnose', 'select-tool', 'committed'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a button is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} button pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} bleed=${tt.bleed} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TILDY-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`TILDY-PROBE PASSED — place/aligned/read/offbyone/span/diagnose/select-tool/committed: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; Measure-it + chips ≥${CTRL_MIN}px (off the 320 sub-floor), no prompt/numeral/done glyph overflow, no button overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
