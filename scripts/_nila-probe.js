#!/usr/bin/env node
/* =====================================================================
   _nila-probe.js — the multi-state control-bottom probe for "Nila's Idea
   Pond" (RI.K.2). The uncapped visual-qa sweep covers first paint; this
   drives the hear / netted / committed-school / supply / wrong-replay /
   done states and per the #10 lesson MEASURES the lowest control INCLUDING
   the shell `.lcs-activity-check` <= vh-4 across 320·360·412·768·1024·1366.
   Also asserts the fish/commit/slot/pond/replay controls >= 44px, the
   paragraph + phrase text >= a min size (legible), nothing overlaps, no
   horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'nila-pond.main-idea-net.ri-k-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, TEXT_MIN = 11;

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
  const url = `http://127.0.0.1:${PORT}/nila-pond-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.NilaPondActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'nila-pond.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.NilaPondActivity.round && document.querySelector('.np-root'), { timeout: 4000 });
    await sleep(40);
  }
  const net = () => page.evaluate(() => { const a = window.NilaPondActivity; a._netted = a.round.topicId; a.render(); }).then(() => sleep(20));
  const commit = () => page.evaluate(() => { const a = window.NilaPondActivity; a._netted = a.round.topicId; a._commit(); }).then(() => sleep(40));
  const schoolFull = () => page.evaluate(() => {
    const a = window.NilaPondActivity;
    a._netted = a.round.topicId; a._commit();   /* → school: 3 detail fish in the tray + 2 empty slots + pond (the tallest school view) */
  }).then(() => sleep(40));
  const wrong = () => page.evaluate(() => {
    const a = window.NilaPondActivity;
    a._netted = a._fishOrder.find(id => id !== a.round.topicId); a._commit();
  }).then(() => sleep(60));

  const states = {
    'hear':    async () => { await force('bear-warm'); },
    'netted':  async () => { await force('bear-eat'); await net(); },
    'school':  async () => { await force('bear-warm'); await schoolFull(); },
    'supply':  async () => { await force('duck-nest'); await commit(); },
    'wrong':   async () => { await force('bear-eat'); await wrong(); },
    'done':    async () => { await force('bear-coat'); await commit(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.np-commit,.np-pond,.np-hint,.np-vessel,.np-detail,.np-slot,.np-replay,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.np-fish,.np-detail,.np-slot,.np-commit,.np-pond,.np-replay'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, r.height); });
      let minText = 999; document.querySelectorAll('.np-fishphrase,.np-goldphrase,.np-slotphrase,.np-para').forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs) minText = Math.min(minText, fs); });
      const all = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 8 && oy > 8) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minText: Math.round(minText), overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.NilaPondActivity; return t && t._activityRow && document.querySelector('.np-root'); }, { timeout: 15000 });

  const order = ['hear', 'netted', 'school', 'supply', 'wrong', 'done'];

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
      if (tt.minText < TEXT_MIN && tt.minText !== 999) fails.push(`${label} @${w}×${h}: text is ${tt.minText}px (<${TEXT_MIN}px — not legible)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} text=${tt.minText} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`NILA-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`NILA-PROBE PASSED — hear/netted/school/supply/wrong/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; fish/commit/slot/pond/replay ≥${CTRL_MIN}px (off the 320 sub-floor), paragraph+phrase text ≥${TEXT_MIN}px legible, no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
