#!/usr/bin/env node
/* =====================================================================
   _juniper-probe.js — multi-state control-bottom probe for "The Clock Tower"
   (L.1.1.e, clarity-first redesign of #70). Drives a past + present + future
   round + a wrong-tap + resolved, and MEASURES the lowest control INCLUDING
   the shell `.lcs-activity-check` across 320·360·412·768·1024·1366, plus tap
   ≥44px on the form chips, no overlap, no overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'tense.past-present-future.l-1-1-e';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
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
  const url = `http://127.0.0.1:${PORT}/tense-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TenseActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TenseActivity._round && document.querySelector('.tn-root'), { timeout: 4000 });
    await sleep(60);
  }
  const solve = (ok) => page.evaluate((correct) => {
    const t = window.TenseActivity, r = t._round, C = window.TenseCore;
    const ans = C.oracle(r), tense = correct ? ans : C.TENSES.find(x => x !== ans);
    const b = Array.from(document.querySelectorAll('.tn-cand')).find(x => x.getAttribute('data-tense') === tense); if (b) b.click();
  }, ok).then(() => sleep(50));

  const states = {
    'past': async () => { await force('tn-p1'); },
    'present': async () => { await force('tn-n1'); },
    'future': async () => { await force('tn-f1'); },
    'wrong': async () => { await force('tn-p2'); await solve(false); },
    'resolved': async () => { await force('tn-n2'); await solve(true); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.tn-root,.tn-windows,.tn-win,.tn-say,.tn-strip,.tn-cand,.tn-line-msg,.tn-hear,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.tn-cand'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      const boxes = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.TenseActivity; return t && t._activityRow && document.querySelector('.tn-root'); }, { timeout: 15000 });

  await states.resolved();
  if (!(await page.evaluate(() => window.TenseActivity._resolved))) fails.push('a correct tap did NOT resolve');
  await states.wrong();
  if (await page.evaluate(() => window.TenseActivity._resolved)) fails.push('a wrong form resolved — must not advance');

  const order = ['past', 'present', 'future', 'wrong', 'resolved'];
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a chip is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} chip pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`JUNIPER-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`JUNIPER-PROBE PASSED — past/present/future/wrong/resolved: a correct tap resolves + a wrong form does not advance; lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; chips ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
