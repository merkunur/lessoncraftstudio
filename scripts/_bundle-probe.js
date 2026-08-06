#!/usr/bin/env node
/* =====================================================================
   _bundle-probe.js — the multi-state control-bottom probe for "Bundle Bot"
   (1.NBT.B.2.a). The uncapusers visual-qa sweep covers first paint; this drives
   the feed / near-ten / bundled-rod / multi-ten / impostor / unbundle-exploded /
   decade-empty / overfill / solved states and per the #10 lesson MEASURES the
   lowest control INCLUDING the shell `.lcs-activity-check` ≤ vh−4 across all
   sweep widths. Also asserts feeder/tidy/bars ≥44px + the lever ≥56px, nothing
   overlaps, no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'bundle-bot.bundle-machine.1-nbt-b-2-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, LEVER_MIN = 56;

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
  const url = `http://127.0.0.1:${PORT}/bundle-bot-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.BundleBotActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'bundle-bot.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.BundleBotActivity.round && document.querySelector('.bb-root'), { timeout: 4000 });
  }
  // drive a precise state in-page via the REAL core, then re-render
  const drive = (tens, ones) => page.evaluate((t, o) => { const a = window.BundleBotActivity, C = window.BundleMachineCore; a.cstate.tens = t; a.cstate.ones = o; if (C.isSolved(a.cstate)) { a._win(); } else { a.render(); } }, tens, ones).then(() => sleep(20));
  const feedOnes = (o) => page.evaluate((n) => { const a = window.BundleBotActivity, C = window.BundleMachineCore; while (a.cstate.ones < n) C.feed(a.cstate, 1); a._newBar = false; a.msg = (a.cstate.ones > 10) ? a.api.t('overfill') : null; a.render(); }, o).then(() => sleep(20));

  const states = {
    'feed': async () => { await force('build-thirty-four'); await feedOnes(6); },
    'nearten': async () => { await force('build-thirty-four'); await feedOnes(9); },
    'bundled': async () => { await force('build-thirty-four'); await drive(1, 0); },
    'multiten': async () => { await force('build-forty-five'); await drive(3, 5); },
    'impostor': async () => { await force('impostor-twenty-nine'); },
    'unbundle': async () => { await force('unbundle-thirty-two'); await drive(2, 12); },
    'decade': async () => { await force('decade-forty'); await drive(3, 0); },
    'overfill': async () => { await force('overfill-thirty-six'); await feedOnes(12); },
    'solved': async () => { await force('build-twenty-three'); await drive(2, 3); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.bb-target,.bb-shop,.bb-controls,.bb-finrow,.bb-wholecap,.bb-shelf,.bb-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.bb-feeder,.bb-tidybtn,.bb-bar:not(.bb-bar-static)'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minTap = Math.min(minTap, r.width, r.height); });
      const lever = document.querySelector('.bb-lever'); const lh = lever ? Math.round(lever.getBoundingClientRect().height) : 999;
      const all = Array.from(document.querySelectorAll('.bb-feeder,.bb-tidybtn,.bb-lever,.bb-bar'));
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, lever: lh, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.BundleBotActivity; return t && t._activityRow && document.querySelector('.bb-root'); }, { timeout: 15000 });

  const order = ['feed', 'nearten', 'bundled', 'multiten', 'impostor', 'unbundle', 'decade', 'overfill', 'solved'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a feeder/tidy/bar is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.lever < LEVER_MIN && tt.lever !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: the lever is ${tt.lever}px (<${LEVER_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} lever=${tt.lever} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`BUNDLE-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`BUNDLE-PROBE PASSED — feed/nearten/bundled/multiten/impostor/unbundle/decade/overfill/solved: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; feeder/tidy/bars ≥${CTRL_MIN}px + lever ≥${LEVER_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
