#!/usr/bin/env node
/* =====================================================================
   _sd-probe.js — the READ-BACK-phase control-bottom probe for "Sunny-Side
   Diner". The uncapped visual-qa sweep covers the tray phase (stage 0);
   this drives each round into the read-back, the COUPLER-SNAPPED state, and
   the EXTEND-GROWN 3-slot state (the tallest), then MEASURES the bottom of
   the lowest control (the food rail + the "Say it back" button) against the
   viewport — never a full-page screenshot. FAIL if any control bottom is
   below the viewport (the #6 desktop cut-off class) at 280/360/412/768/1024.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sunny-side-diner.compound-order.l-k-1-f';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 600], [360, 740], [412, 820], [768, 1000], [1024, 900]];

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
  const url = `http://127.0.0.1:${PORT}/sunny-side-diner-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SunnySideDinerActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'sunny-side-diner.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SunnySideDinerActivity.round && document.querySelector('.sd-diner'), { timeout: 4000 });
  }
  async function gatherAdvance() {
    await page.evaluate(() => { const T = window.SunnySideDinerActivity; T.activeOrder.items.forEach(it => { for (let k = 0; k < it.quantity; k++) { const c = [...document.querySelectorAll('.sd-palette .sd-foodchip')].find(b => b.getAttribute('aria-label') === it.food); if (c) c.click(); } }); });
    await sleep(50); const go = await page.$('.sd-go'); if (go) { await go.click(); await sleep(70); }
  }
  async function fill(coupler) {
    await page.evaluate((wc) => {
      const T = window.SunnySideDinerActivity, Core = window.CompoundOrderCore, items = T.activeOrder.items;
      for (let i = 0; i < items.length; i++) if (!T.assembled.slots[i]) { const c = [...document.querySelectorAll('.sd-rail .sd-foodchip')].find(b => b.getAttribute('aria-label') === items[i].food); if (c) c.click(); }
      for (let i = 0; i < items.length; i++) { let g = 0; while (T.assembled.slots[i] && T.assembled.slots[i].count !== items[i].quantity && g++ < 5) { const b = document.querySelectorAll('.sd-slot-full .sd-count'); if (!b[i]) break; b[i].click(); } }
      if (wc && Core.needsCoupler(T.activeOrder) && !T.assembled.coupler) { const c = document.querySelector('.sd-coupler') || document.querySelector('.sd-couplerslot'); if (c) c.click(); }
    }, coupler);
    await sleep(50);
  }
  // bottom of the lowest interactive control vs viewport height
  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.sd-say,.sd-rail,.sd-coupler,.sd-go,.sd-foodchip';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.SunnySideDinerActivity; return t && t._activityRow && document.querySelector('.sd-diner'); }, { timeout: 15000 });

  // states: each round's read-back (un-coupled) + coupled; the extend round also at its grown 3-slot state
  const states = [
    { id: 'asm-pancake-milk', label: 'read-back/no-coupler', coupler: false, grow: false },
    { id: 'asm-pancake-milk', label: 'read-back/coupled', coupler: true, grow: false },
    { id: 'rep-egg-milk', label: 'repair/coupled', coupler: true, grow: false },
    { id: 'ext-pancake-milk-egg', label: 'extend-grown(3-slot)', coupler: true, grow: true }
  ];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    for (const st of states) {
      await force(st.id); await gatherAdvance();
      await fill(st.coupler);
      if (st.grow) {
        // drive the first complete read-back → grows → fill the 3rd
        await page.evaluate(() => { const b = document.querySelector('.sd-say'); if (b && !b.disabled) b.click(); });
        await sleep(80); await fill(true);
      }
      const cb = await controlBottom();
      const ok = cb <= h + 1;
      if (!ok) fails.push(`${st.label} @${w}×${h}: control bottom ${cb}px > viewport ${h}px (cut off)`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${st.label} @${w}×${h}  ctrlBottom=${cb}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`SD-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('SD-PROBE PASSED — read-back / coupler-snapped / extend-grown 3-slot control-bottoms all fit 280→1024 (no desktop cut-off).');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
