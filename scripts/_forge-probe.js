#!/usr/bin/env node
/* =====================================================================
   _forge-probe.js — the multi-state control-bottom probe for "Rivet's Number
   Forge" (K.CC.A.3). The uncapped visual-qa sweep covers first paint; this
   drives the bench / mid-count / minted / teen / subset / verify / build /
   reverse / parade / done states and MEASURES the lowest control INCLUDING
   the shell `.lcs-activity-check` (the #10 lesson) ≤ vh−4 across all sweep
   widths. Also asserts the treasure halos / +Add / lever are ≥44px and nothing
   overlaps; the teen ten-frame (14) fits; no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'rivets-number-forge.numeral-album.k-cc-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
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
  const url = `http://127.0.0.1:${PORT}/rivets-number-forge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.RivetsNumberForgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'rivets-number-forge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.RivetsNumberForgeActivity.round && document.querySelector('.nf-root'), { timeout: 4000 });
  }
  const tapN = (n) => page.evaluate((k) => { const t = window.RivetsNumberForgeActivity, C = window.NumeralAlbumCore; for (let i = 0; i < k; i++) C.tapObject(t.cstate, 't' + i); t.render(); }, n).then(() => sleep(20));
  const forgeFrame0 = () => page.evaluate(() => { const t = window.RivetsNumberForgeActivity, C = window.NumeralAlbumCore, f = C.currentFrame(t.cstate); C.frameObjects(f).forEach(o => { if (o.target) C.tapObject(t.cstate, o.id); }); t._pull(); }).then(() => sleep(25));
  const produceN = (n) => page.evaluate((k) => { const t = window.RivetsNumberForgeActivity, C = window.NumeralAlbumCore; for (let i = 0; i < k; i++) C.addObject(t.cstate); t.render(); }, n).then(() => sleep(20));
  const solveAll = () => page.evaluate(() => { const t = window.RivetsNumberForgeActivity, C = window.NumeralAlbumCore; let g = 0; while (!C.isComplete(t.round, t.cstate) && g++ < 12) { const f = C.currentFrame(t.cstate); if (C.isProduceAct(t.round)) { const tg = C.targetOf(t.cstate); for (let i = 0; i < tg; i++) C.addObject(t.cstate); } else { C.frameObjects(f).forEach(o => { if (o.target) C.tapObject(t.cstate, o.id); }); } t._pull(); } }).then(() => sleep(30));

  const states = {
    'bench': async () => { await force('count-acorns'); },
    'midcount': async () => { await force('count-acorns'); await tapN(3); },
    'minted': async () => { await force('count-acorns'); await forgeFrame0(); },
    'teen': async () => { await force('count-teen'); },
    'subset': async () => { await force('only-the-acorns'); },
    'verify': async () => { await force('fix-rivets-card'); },
    'build': async () => { await force('build-the-card'); await produceN(2); },
    'reverse': async () => { await force('fill-the-ticket'); },
    'parade': async () => { await force('the-parade'); },
    'done': async () => { await force('card-of-nothing'); await solveAll(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.nf-strip,.nf-main,.nf-bench,.nf-forgecol,.nf-produce,.nf-parade,.nf-album,.nf-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const ctrls = Array.from(document.querySelectorAll('.nf-obj:not(.nf-obj-static),.nf-add,.nf-lever'));
      let minCtrl = 999; ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minCtrl = Math.min(minCtrl, r.width, r.height); });
      const all = Array.from(document.querySelectorAll('.nf-obj:not(.nf-obj-static),.nf-add,.nf-lever,.nf-slot'));
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minCtrl: ctrls.length ? Math.round(minCtrl) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.RivetsNumberForgeActivity; return t && t._activityRow && document.querySelector('.nf-root'); }, { timeout: 15000 });

  const order = ['bench', 'midcount', 'minted', 'teen', 'subset', 'verify', 'build', 'reverse', 'parade', 'done'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minCtrl < CTRL_MIN && tt.minCtrl !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minCtrl}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  ctrl=${tt.minCtrl} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`FORGE-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`FORGE-PROBE PASSED — bench/midcount/minted/teen/subset/verify/build/reverse/parade/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; treasure/+Add/lever ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
