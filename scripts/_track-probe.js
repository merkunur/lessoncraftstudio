#!/usr/bin/env node
/* =====================================================================
   _track-probe.js — the multi-state control-bottom probe for "Whistle
   Valley — Number-Line Track Repair" (1.NBT.A.1). The uncapped visual-qa
   sweep covers first paint; this drives the read / placed-mid / committed /
   wrong-wait / two-gap / interval / to-120 states and per the #10 lesson
   MEASURES the lowest control INCLUDING the shell `.lcs-activity-check` <=
   vh-4 across 320·360·412·768·1024·1366. Bakes in the Game-32 TEXT-
   CONTAINMENT check (no tie numeral overflows its box) + a NO-OVERLAP check
   (to-scale ties must not collapse into each other) + tap >=44px + no
   horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'track-repair.count-to-120.1-nbt-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
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
  const url = `http://127.0.0.1:${PORT}/track-repair-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TrackRepairActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'track-repair.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TrackRepairActivity.round && document.querySelector('.tr-track'), { timeout: 4000 });
    await sleep(40);
  }
  const placeOracle = () => page.evaluate(() => { const a = window.TrackRepairActivity, C = window.TrackRepairCore, r = a.round; C.targetValues(r).forEach(v => a._placeTie(v, C.valueToPct(v, r.start, r.end))); }).then(() => sleep(20));
  const committed = () => page.evaluate(() => { const a = window.TrackRepairActivity, C = window.TrackRepairCore, r = a.round; C.targetValues(r).forEach(v => a._placeTie(v, C.valueToPct(v, r.start, r.end))); a._commit(); }).then(() => sleep(40));
  const wrong = () => page.evaluate(() => { const a = window.TrackRepairActivity; a.msg = a.api.t('engineWait'); a.render(); }).then(() => sleep(20));

  const states = {
    'read':     async () => { await force('skip-10-30'); },
    'placed':   async () => { await force('skip-10-30'); await placeOracle(); },
    'committed': async () => { await force('skip-10-30'); await committed(); },
    'wrong':    async () => { await force('skip-10-30'); await wrong(); },
    'two-gap':  async () => { await force('two-gap-33'); await placeOracle(); },
    'interval': async () => { await force('interval-40-80'); },
    'to-120':   async () => { await force('to-120-98'); await placeOracle(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.tr-tie,.tr-send,.tr-track,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.tr-tie,.tr-send'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, r.height); });
      /* TEXT-CONTAINMENT: the numeral-bearing pills must not overflow their
         box (the in-flow numeral makes scrollWidth catch it; the old absolute
         numeral did not — this guards the regression). */
      let bleed = 0;
      document.querySelectorAll('.tr-tie,.tr-anchortie,.tr-placed').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      /* NO-OVERLAP: to-scale ties on the rail must not collapse into each other */
      const onrail = Array.from(document.querySelectorAll('.tr-anchor,.tr-placed')).map(e => e.getBoundingClientRect());
      let railOverlap = 0;
      for (let i = 0; i < onrail.length; i++) for (let j = i + 1; j < onrail.length; j++) { const a = onrail[i], b = onrail[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) railOverlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, bleed, railOverlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.TrackRepairActivity; return t && t._activityRow && document.querySelector('.tr-root'); }, { timeout: 15000 });

  const order = ['read', 'placed', 'committed', 'wrong', 'two-gap', 'interval', 'to-120'];

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
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} tie numeral(s) overflow their box`);
      if (tt.railOverlap > 0) fails.push(`${label} @${w}×${h}: ${tt.railOverlap} on-rail ties overlap (to-scale spacing collapsed)`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} bleed=${tt.bleed} railOverlap=${tt.railOverlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TRACK-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`TRACK-PROBE PASSED — read/placed/committed/wrong/two-gap/interval/to-120: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; ties/send ≥${CTRL_MIN}px (off the 320 sub-floor), no tie numeral overflows its box, no on-rail ties overlap (to-scale spacing holds), no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
