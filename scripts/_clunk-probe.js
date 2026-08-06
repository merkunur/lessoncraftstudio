#!/usr/bin/env node
/* =====================================================================
   _clunk-probe.js — the multi-state control-bottom probe for "Clunk's Lost
   Lunch" (K.OA.A.3 + 1.OA.D.8). The uncapped visual-qa sweep covers first paint;
   this drives the assemble / pre-feed / fed-correct / two-ways-second / reduce-
   overfull / missing-locked / exact-n / constrained / within-20 states and
   MEASURES the lowest control INCLUDING the shell `.lcs-activity-check` (the #10
   lesson) ≤ vh−4 across all sweep widths. Also asserts cubbies/chips ≥44px + the
   lever ≥56px and nothing overlaps; no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'clunks-lost-lunch.make-total.k-oa-a-3';
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
  const url = `http://127.0.0.1:${PORT}/clunks-lost-lunch-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ClunksLostLunchActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'clunks-lost-lunch.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ClunksLostLunchActivity.round && document.querySelector('.cl-root'), { timeout: 4000 });
  }
  const addCore = (costs) => page.evaluate((cs) => { const t = window.ClunksLostLunchActivity, C = window.MakeTotalCore; cs.forEach(c => C.addChip(t.cstate, c)); t.render(); }, costs).then(() => sleep(20));
  const way1 = () => page.evaluate(() => { const t = window.ClunksLostLunchActivity, C = window.MakeTotalCore; t.round.solutions[0].forEach(c => C.addChip(t.cstate, c)); t._feed(); }).then(() => sleep(25));
  const winCore = () => page.evaluate(() => { const t = window.ClunksLostLunchActivity, C = window.MakeTotalCore, sols = t.round.solutions; sols[0].forEach(c => C.addChip(t.cstate, c)); t._feed(); if (t.schema === 'two-ways') { sols[1].forEach(c => C.addChip(t.cstate, c)); t._feed(); } }).then(() => sleep(30));

  const states = {
    'assemble': async () => { await force('make-ten'); await addCore([6, 3]); },
    'prefeed': async () => { await force('make-ten'); await addCore([6, 4]); },
    'fedcorrect': async () => { await force('make-ten'); await winCore(); },
    'twoways2': async () => { await force('two-ways-eight'); await way1(); },
    'reduce': async () => { await force('too-full'); },
    'missing': async () => { await force('clunk-holds-6'); },
    'exactn': async () => { await force('exactly-three'); await addCore([2, 4]); },
    'constrained': async () => { await force('no-fives-wall'); },
    'twelve': async () => { await force('make-twelve'); await addCore([8, 4]); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.cl-target,.cl-wall,.cl-box,.cl-leverwrap,.cl-gallery,.cl-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.cl-cubby,.cl-chip:not(.cl-chip-static)'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minTap = Math.min(minTap, r.width, r.height); });
      const lever = document.querySelector('.cl-lever'); const lh = lever ? Math.round(lever.getBoundingClientRect().height) : 999;
      const all = Array.from(document.querySelectorAll('.cl-cubby,.cl-chip,.cl-lever'));
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, lever: lh, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.ClunksLostLunchActivity; return t && t._activityRow && document.querySelector('.cl-root'); }, { timeout: 15000 });

  const order = ['assemble', 'prefeed', 'fedcorrect', 'twoways2', 'reduce', 'missing', 'exactn', 'constrained', 'twelve'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a cubby/chip is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.lever < LEVER_MIN && tt.lever !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: the lever is ${tt.lever}px (<${LEVER_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} lever=${tt.lever} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`CLUNK-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`CLUNK-PROBE PASSED — assemble/prefeed/fedcorrect/twoways2/reduce/missing/exactn/constrained/twelve: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; cubbies/chips ≥${CTRL_MIN}px + lever ≥${LEVER_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
