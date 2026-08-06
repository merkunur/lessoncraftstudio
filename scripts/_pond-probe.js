#!/usr/bin/env node
/* =====================================================================
   _pond-probe.js — the multi-state control-bottom probe for "Pippa's Pond-Juice
   Lab" (3.MD.A.2). The uncapped visual-qa sweep covers first paint; this drives
   the order / pouring-frosted / revealed-read / compare / diff-scale / wrong /
   served states and per the #10 lesson MEASURES the lowest control INCLUDING the
   shell `.lcs-activity-check` ≤ vh−4 across all sweep widths. Also asserts the
   pour/report/pick controls ≥44px + the scale numerals ≥ a min rendered size
   (the read is possible), nothing overlaps, no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pond-juice.pour-measure.3-md-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, SCALE_MIN = 8;

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
  const url = `http://127.0.0.1:${PORT}/pond-juice-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PondJuiceActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pond-juice.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PondJuiceActivity.round && document.querySelector('.pj-root'), { timeout: 4000 });
    await sleep(60);
  }
  const pour = () => page.evaluate(() => { const a = window.PondJuiceActivity; a._reveal(); }).then(() => sleep(40));
  const wrongState = () => page.evaluate(() => { const a = window.PondJuiceActivity; a._mood = 'idle'; a.msg = a.api.t('wrong'); a.render(); }).then(() => sleep(40));
  const winState = () => page.evaluate(() => { const a = window.PondJuiceActivity, C = window.PourMeasureCore; if (a._isTwoCup()) { C.pick(a.cstate, C.argMaxCup(a.round)); } else { if (a.round.cog === 'estimate-pour') { C.pour(a.cstate); C.release(a.cstate); } else C.reveal(a.cstate); C.report(a.cstate, C.levelValue(a.round)); } a._win('done'); }).then(() => sleep(120));

  const states = {
    'order': async () => { await force('est-six-is-five'); },
    'revealed': async () => { await force('est-six-is-five'); await pour(); },
    'readlevel': async () => { await force('read-between-five'); await pour(); },
    'compare': async () => { await force('compare-six-four'); },
    'diff': async () => { await force('diff-big-small'); },
    'wrong': async () => { await force('est-six-is-five'); await pour(); await wrongState(); },
    'served': async () => { await force('read-seven'); await winState(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.pj-onebox,.pj-twobox,.pj-tray,.pj-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.pj-pour,.pj-num,.pj-pick'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minTap = Math.min(minTap, r.width, r.height); });
      let minScale = 999; document.querySelectorAll('.pj-beaker-svg text').forEach(e => { const r = e.getBoundingClientRect(); if (r.height) minScale = Math.min(minScale, r.height); });
      const all = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 8 && oy > 8) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minScale: Math.round(minScale), overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.PondJuiceActivity; return t && t._activityRow && document.querySelector('.pj-root'); }, { timeout: 15000 });

  const order = ['order', 'revealed', 'readlevel', 'compare', 'diff', 'wrong', 'served'];

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
      if (tt.minScale < SCALE_MIN && tt.minScale !== 999) fails.push(`${label} @${w}×${h}: a scale numeral is ${tt.minScale}px (<${SCALE_MIN}px — not legible)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} scale=${tt.minScale} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`POND-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`POND-PROBE PASSED — order/revealed/readlevel/compare/diff/wrong/served: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; pour/report/pick ≥${CTRL_MIN}px + scale numerals ≥${SCALE_MIN}px legible (off the 320 sub-floor for taps), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
