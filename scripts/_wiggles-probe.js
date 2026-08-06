#!/usr/bin/env node
/* =====================================================================
   _wiggles-probe.js — control-bottom probe for "Wiggles' Sentence Builder"
   (L.1.1.j). Drives empty / all-placed / resolved across 320·360·412·768·1024·
   1366 and MEASURES the lowest control INCLUDING the shell Check; plus tap ≥44
   on slots + tiles, no overlap, no overflow (the wide word-rows are the risk).
   Serves /image-library-webp/ for the subject pictures.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sentence-builder.build-a-sentence.l-1-1-j';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
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
  const url = `http://127.0.0.1:${PORT}/sentence-builder-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SentenceBuilderActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SentenceBuilderActivity._round && document.querySelector('.snt-root'), { timeout: 4000 });
    await sleep(60);
  }
  const placeCorrect = () => page.evaluate(() => {
    const t = window.SentenceBuilderActivity, canon = t._canonical;
    for (let k = 0; k < canon.length; k++) {
      const tiles = Array.from(document.querySelectorAll('.snt-tile'));
      const b = tiles.find(x => !x.classList.contains('used') && x.textContent === canon[k]);
      if (b) b.click();
    }
  }).then(() => sleep(60));
  const clickCheck = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(60));

  const states = {
    'empty': async () => { await force('snt-dog'); },
    'built': async () => { await force('snt-cat'); await placeCorrect(); },
    'resolved': async () => { await force('snt-sun'); await placeCorrect(); await clickCheck(); await sleep(1000); }   /* wait out confetti */
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.snt-root,.snt-subject,.snt-slots,.snt-slot,.snt-palette,.snt-tile,.snt-say,.snt-hear,.lcs-activity-check,.lcs-activity-next';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.snt-slot, .snt-tile:not(.used)'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      const boxes = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.SentenceBuilderActivity; return t && t._activityRow && document.querySelector('.snt-root'); }, { timeout: 15000 });

  /* functional: correct order resolves */
  await states.resolved();
  if (!(await page.evaluate(() => window.SentenceBuilderActivity.readOnly))) fails.push('a correctly-built sentence did NOT resolve');

  const order = ['empty', 'built', 'resolved'];
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. Check) bottom ${cb}px > ${h - MARGIN}px — cut off`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a slot/tile is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`WIGGLES-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`WIGGLES-PROBE PASSED — empty/built/resolved: a correctly-built sentence resolves; lowest control (incl. Check) clears the fold by ≥${MARGIN}px across 320→1366; slots + tiles ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no overflow (the wide word-rows wrap).`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
