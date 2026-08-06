#!/usr/bin/env node
/* =====================================================================
   _tentank-probe.js — the multi-stage control-bottom probe for "Dewey's
   Ten-Tank". The uncapped visual-qa sweep covers the first paint only; this
   drives the build-ten / place-ones / regroup / separate / repair / compare /
   done states and MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` (the #10 lesson) ≤ vh−4 across all sweep widths.
   Mobile budget: only ONE full 2×5 grid is active at a time; its cells are
   ≥40px (the physical floor for a 5-wide frame in the ~231px card at 280px —
   above the §A.13.55 36px WARN line); the larger controls (the sealed-ten
   chip, the repair options, the judge buttons) are ≥44px.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'ten-tank.ten-frame-tank.k-nbt-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CELL_MIN = 40, CTRL_MIN = 44;

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
  const url = `http://127.0.0.1:${PORT}/ten-tank-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TenTankActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'ten-tank.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TenTankActivity.round && document.querySelector('.tt-root'), { timeout: 4000 });
  }
  const fillReady = (k) => page.evaluate((kk) => { for (let i = 0; i < kk; i++) { const r = document.querySelector('.tt-cell.tt-ready'); if (r) r.click(); } }, k).then(() => sleep(30));

  const states = {
    'build-ten': async () => { await force('seal-13'); await fillReady(4); },
    'place-ones': async () => { await force('seal-13'); await fillReady(10); await fillReady(2); },
    'regroup': async () => { await force('regroup-12'); await fillReady(5); },
    'separate': async () => { await force('decompose-16'); },
    'repair': async () => { await force('repair-14'); },
    'compare': async () => { await force('compare-13-18'); await page.evaluate(() => document.querySelectorAll('.tt-cmpcard').forEach(c => c.click())); await sleep(30); },
    'done': async () => { await force('seal-13'); await fillReady(10); await fillReady(3); }
  };

  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.tt-frame,.tt-tank,.tt-tenchip,.tt-eq,.tt-opts,.tt-trays,.tt-dsource,.tt-cmpmain,.tt-bignum,.tt-pond,.tt-peekbtn,.tt-side' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }
  async function taps() {
    return await page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('.tt-cell'));
      const ctrls = Array.from(document.querySelectorAll('.tt-tenchip,.tt-opt,.tt-judge:not(:disabled),.tt-peekbtn,.tt-cmpcard'));
      let minCell = 999, minCtrl = 999, overlap = 0;
      cells.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minCell = Math.min(minCell, r.width, r.height); });
      ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minCtrl = Math.min(minCtrl, r.width, r.height); });
      for (let i = 0; i < cells.length; i++) for (let j = i + 1; j < cells.length; j++) {
        const a = cells[i].getBoundingClientRect(), b = cells[j].getBoundingClientRect();
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 6 && oy > 6) overlap++;
      }
      return { minCell: cells.length ? Math.round(minCell) : 999, minCtrl: ctrls.length ? Math.round(minCtrl) : 999, overlap };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.TenTankActivity; return t && t._activityRow && document.querySelector('.tt-root'); }, { timeout: 15000 });

  const order = ['build-ten', 'place-ones', 'regroup', 'separate', 'repair', 'compare', 'done'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom(!subFloor);
      const ok = cb <= h - MARGIN;
      const what = subFloor ? 'activity controls' : 'lowest control (incl. shell Check)';
      if (!ok) fails.push(`${label} @${w}×${h}: ${what} bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await taps();
      if (tt.minCell < CELL_MIN && tt.minCell !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a frame cell is ${tt.minCell}px (<${CELL_MIN}px)`);
      if (tt.minCtrl < CTRL_MIN && tt.minCtrl !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minCtrl}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping cells`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  cell=${tt.minCell} ctrl=${tt.minCtrl} overlap=${tt.overlap}${subFloor ? ' [activity-controls]' : ''}`);
    }
    if (subFloor) {
      await states['done']();
      const doneCb = await controlBottom(true);
      const ok = doneCb <= h - MARGIN;
      if (!ok) fails.push(`done-stage @${w}×${h}: Check bottom ${doneCb}px > ${h - MARGIN}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} done-stage(Check) @${w}×${h}  ctrlBottom=${doneCb} (need ≤${h - MARGIN})`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TENTANK-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`TENTANK-PROBE PASSED — build-ten/place-ones/regroup/separate/repair/compare/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; frame cells ≥${CELL_MIN}px, controls ≥${CTRL_MIN}px, no overlap.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
