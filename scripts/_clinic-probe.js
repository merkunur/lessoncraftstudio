#!/usr/bin/env node
/* =====================================================================
   _clinic-probe.js — the multi-state control-bottom probe for "Word
   Doctor's Clinic" (L.1.2.e). The uncapped visual-qa sweep covers first
   paint; this drives the listen / placed / hinted / healed states (incl. a
   4-tile word + a blend word) and per the #10 lesson MEASURES the lowest
   control INCLUDING the shell `.lcs-activity-check` <= vh-4 across
   320·360·412·768·1024·1366. Also asserts the slot/medicine/lamp controls
   >= 44px, the tiles legible, nothing overlaps, no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'word-clinic.spell-by-ear.l-1-2-e';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, TEXT_MIN = 14;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/image-library-webp/')) file = path.join(PUB, p.replace(/^\//, ''));
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
  const url = `http://127.0.0.1:${PORT}/word-clinic-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WordClinicActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'word-clinic.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WordClinicActivity.round && document.querySelector('.wc-root'), { timeout: 4000 });
    await sleep(40);
  }
  const hinted = () => page.evaluate(() => { const a = window.WordClinicActivity; a.wrongCount = 3; a._nurseHint(); a.render(); }).then(() => sleep(20));
  const healed = () => page.evaluate(() => { const a = window.WordClinicActivity, C = window.WordClinicCore; a.placed = C.correctGrapheme(a.round); a.solved = true; a.fever = 'well'; a.render(); }).then(() => sleep(20));

  const states = {
    'listen': async () => { await force('fish'); },
    'lamp':   async () => { await force('lamp'); },       /* a 4-tile word */
    'blend':  async () => { await force('frog'); },       /* a 2-letter sick cluster + tray */
    'hinted': async () => { await force('boat'); await hinted(); },
    'healed': async () => { await force('fish'); await healed(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.wc-lamp,.wc-med,.wc-slot,.wc-vessel,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.wc-med,.wc-slot,.wc-lamp'));
      let minTap = 999; taps.forEach(e => { if (e.classList.contains('wc-dim')) return; const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, r.height); });
      let minText = 999; document.querySelectorAll('.wc-tile,.wc-slot,.wc-med').forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs && e.textContent.trim()) minText = Math.min(minText, fs); });
      const all = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 8 && oy > 8) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minText: Math.round(minText), overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.WordClinicActivity; return t && t._activityRow && document.querySelector('.wc-root'); }, { timeout: 15000 });

  const order = ['listen', 'lamp', 'blend', 'hinted', 'healed'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.minText < TEXT_MIN && tt.minText !== 999) fails.push(`${label} @${w}×${h}: a tile is ${tt.minText}px (<${TEXT_MIN}px — not legible)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} text=${tt.minText} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`CLINIC-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`CLINIC-PROBE PASSED — listen/lamp/blend/hinted/healed: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; slot/medicine/lamp ≥${CTRL_MIN}px (off the 320 sub-floor), tiles ≥${TEXT_MIN}px legible, no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
