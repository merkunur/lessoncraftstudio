#!/usr/bin/env node
/* =====================================================================
   _pips-probe.js — the multi-state control-bottom probe for "Pip's Round"
   (K.CC.A.3). The uncapped visual-qa sweep covers first paint; this drives the
   read-cross-font / read-audio / dense-block / delivered-waving / wrong-curtain
   states and per the #10 lesson MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` ≤ vh−4 across all sweep widths. Also asserts house
   hotspots ≥44px + the plate numeral ≥ a min font (the reading is possible),
   nothing overlaps, no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pips-round.mail-route.k-cc-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, PLATE_MIN = 14;

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
  const url = `http://127.0.0.1:${PORT}/pips-round-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PipsRoundActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pips-round.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PipsRoundActivity.round && document.querySelector('.pr-root'), { timeout: 4000 });
  }
  const clickNumeral = (num) => page.evaluate((n) => { const b = [...document.querySelectorAll('.pr-house')].find(x => { const p = x.querySelector('.pr-plate'); return p && p.textContent === String(n); }); if (b) b.click(); }, num).then(() => sleep(30));
  const wrongNumeral = (round) => page.evaluate((rid) => { const t = window.PipsRoundActivity; const d = t.round.houses.find(h => (h.numeral | 0) !== (t.round.targetValue | 0)); const b = [...document.querySelectorAll('.pr-house')].find(x => { const p = x.querySelector('.pr-plate'); return p && p.textContent === String(d.numeral); }); if (b) b.click(); }, round).then(() => sleep(30));

  const states = {
    'read-crossfont': async () => { await force('teen-reversal-thirteen'); },
    'read-audio': async () => { await force('hear-seventeen'); },
    'dense': async () => { await force('dense-twelve'); },
    'delivered': async () => { await force('single-seven'); await clickNumeral(7); },
    'wrong': async () => { await force('teen-reversal-thirteen'); await wrongNumeral(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.pr-envelope,.pr-map,.pr-doorcard,.pr-satchel,.pr-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.pr-house'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minTap = Math.min(minTap, r.width, r.height); });
      let minPlate = 999; document.querySelectorAll('.pr-plate').forEach(e => { minPlate = Math.min(minPlate, parseFloat(getComputedStyle(e).fontSize) || 999); });
      const all = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 8 && oy > 8) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minPlate: Math.round(minPlate), overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.PipsRoundActivity; return t && t._activityRow && document.querySelector('.pr-root'); }, { timeout: 15000 });

  const order = ['read-crossfont', 'read-audio', 'dense', 'delivered', 'wrong'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a house hotspot is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.minPlate < PLATE_MIN && tt.minPlate !== 999) fails.push(`${label} @${w}×${h}: a plate numeral is ${tt.minPlate}px (<${PLATE_MIN}px — not legible)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping houses`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} plate=${tt.minPlate} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`PIPS-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`PIPS-PROBE PASSED — read-crossfont/read-audio/dense/delivered/wrong: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; house hotspots ≥${CTRL_MIN}px + plate numerals ≥${PLATE_MIN}px legible (off the 320 sub-floor for hotspots), no house overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
