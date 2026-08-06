#!/usr/bin/env node
/* =====================================================================
   _mims-probe.js — the multi-state control-bottom probe for "Mim's Memory
   Baskets" (L.K.5.A). The uncapped visual-qa sweep covers first paint; this
   drives the spill / mid-sort / wrong-floatback / odd / full-sorted states and
   per the #10 lesson MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` ≤ vh−4 across all sweep widths. Also asserts spill
   objects + baskets ≥44px, legible basket labels, nothing overlaps, no
   horizontal overflow. Serves `/image-library-webp/` (else the pictures 404).
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mims-baskets.category-sort.l-k-5-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, LABEL_MIN = 11;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p);
    else if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
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
  const url = `http://127.0.0.1:${PORT}/mims-baskets-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MimsBasketsActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'mims-baskets.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MimsBasketsActivity.round && document.querySelector('.mb-root'), { timeout: 4000 });
    await sleep(220);   // let pictures load
  }
  const placeOne = () => page.evaluate(() => { const a = window.MimsBasketsActivity, C = window.CategorySortCore, n = a.round.spill[0]; C.drop(a.cstate, n, C.categoryOf(n)); a.render(); }).then(() => sleep(120));
  const wrongState = () => page.evaluate(() => { const a = window.MimsBasketsActivity; a._mood = 'hmm'; a.msg = a.api.t('wrong'); a.render(); }).then(() => sleep(40));
  const winState = () => page.evaluate(() => { const a = window.MimsBasketsActivity, C = window.CategorySortCore; a.round.spill.forEach(n => C.drop(a.cstate, n, C.categoryOf(n))); a._win(); }).then(() => sleep(150));

  const states = {
    'spill': async () => { await force('sort-four'); },
    'midsort': async () => { await force('sort-four'); await placeOne(); },
    'wrong': async () => { await force('confound-red'); await wrongState(); },
    'odd': async () => { await force('odd-one-out'); },
    'sorted': async () => { await force('sort-three'); await winState(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.mb-spill,.mb-baskets,.mb-garden,.mb-vase,.mb-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.mb-thing,.mb-basket'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minTap = Math.min(minTap, r.width, r.height); });
      let minLabel = 999; document.querySelectorAll('.mb-blab').forEach(e => { minLabel = Math.min(minLabel, parseFloat(getComputedStyle(e).fontSize) || 999); });
      const all = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 8 && oy > 8) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minLabel: Math.round(minLabel), overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.MimsBasketsActivity; return t && t._activityRow && document.querySelector('.mb-root'); }, { timeout: 15000 });

  const order = ['spill', 'midsort', 'wrong', 'odd', 'sorted'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a thing/basket is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.minLabel < LABEL_MIN && tt.minLabel !== 999) fails.push(`${label} @${w}×${h}: a basket label is ${tt.minLabel}px (<${LABEL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping things/baskets`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} label=${tt.minLabel} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`MIMS-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`MIMS-PROBE PASSED — spill/midsort/wrong/odd/sorted: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; things/baskets ≥${CTRL_MIN}px + basket labels ≥${LABEL_MIN}px (off the 320 sub-floor for taps), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
