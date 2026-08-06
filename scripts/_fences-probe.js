#!/usr/bin/env node
/* =====================================================================
   _fences-probe.js — the multi-state control-bottom probe for "The Mending
   Fences" (3.MD.D.8). Drives mend-board / more-fence-or-grass / fence-it-or-
   plant / roll-reach / same-area-diff-perim (initial) + a wrong-scaffold +
   resolved, and MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` across 320·360·412·768·1024·1366, plus tap ≥44px, no
   overlap, no horizontal overflow. Serves the image library locally.
   (Unique name — grepped clear.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mending-fences.mend-board.3-md-d-8';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
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
  const url = `http://127.0.0.1:${PORT}/mending-fences-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MendingFencesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MendingFencesActivity._round && document.querySelector('.mf-root'), { timeout: 4000 });
    await sleep(60);
  }
  const solve = (correct) => page.evaluate((ok) => {
    const t = window.MendingFencesActivity, r = t._round, Core = window.MendingFencesCore;
    const q = (s) => Array.from(document.querySelectorAll(s));
    if (r.cog === 'mend-board') {
      const v = ok ? Core.deriveDoublingAnswer(r) : Core.subtractionFoil(r);
      const b = q('.mf-plate').find(x => Number(x.textContent) === v); if (b) b.click();
    } else if (r.cog === 'more-fence-or-grass') {
      const mf = Core.deriveMoreFence(r.fields);
      q('.mf-field-btn')[ok ? mf : (1 - mf)].click();
      if (ok) { q('.mf-field-btn')[Core.deriveMoreGrass(r.fields)].click(); }
    } else if (r.cog === 'same-area-diff-perim') {
      const mf = Core.deriveMoreFence(r.fields); q('.mf-field-btn')[ok ? mf : (1 - mf)].click();
    } else if (r.cog === 'fence-it-or-plant') {
      const want = Core.unitOracle(r), map = { edge: 'Edge marks', interior: 'Inside squares', border: 'Edge ring' };
      const lab = ok ? map[want] : map.border;
      const b = q('.mf-unit').find(x => (x.getAttribute('aria-label') || '').indexOf(lab) >= 0); if (b) b.click();
    } else if (r.cog === 'roll-reach') {
      const want = Core.reachOracle(r), pick = ok ? want : (want === 'reach' ? 'short' : 'reach');
      const lab = pick === 'reach' ? 'reaches' : 'too short';
      const b = q('.mf-reach').find(x => x.textContent.indexOf(lab) >= 0); if (b) b.click();
    }
  }, correct).then(() => sleep(50));

  const states = {
    'mend': async () => { await force('mf-mend-7x3'); },
    'rank': async () => { await force('mf-rank-9x2-5x5'); },
    'unit': async () => { await force('mf-unit-fence-4x3'); },
    'roll': async () => { await force('mf-roll-reach-4x3'); },
    'same': async () => { await force('mf-samearea-6x2-4x3'); },
    'wrong': async () => { await force('mf-mend-7x3'); await solve(false); },
    'resolved': async () => { await force('mf-mend-6x4'); await solve(true); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.mf-root,.mf-stage,.mf-fields,.mf-field,.mf-field-btn,.mf-plates,.mf-plate,.mf-units,.mf-unit,.mf-reaches,.mf-reach,.mf-rope,.mf-line,.mf-say,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.mf-cand'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      const boxes = Array.from(document.querySelectorAll('.mf-cand')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.MendingFencesActivity; return t && t._activityRow && document.querySelector('.mf-root'); }, { timeout: 15000 });

  /* functional sanity: a correct commit resolves; a wrong does not advance */
  await states.resolved();
  if (!(await page.evaluate(() => window.MendingFencesActivity._resolved))) fails.push('a correct mend did NOT resolve');
  await states.wrong();
  if (await page.evaluate(() => window.MendingFencesActivity._resolved)) fails.push('a wrong (P−side foil) mend resolved — must not advance');

  const order = ['mend', 'rank', 'unit', 'roll', 'same', 'wrong', 'resolved'];
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
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} control pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`FENCES-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`FENCES-PROBE PASSED — mend/rank/unit/roll/same/wrong/resolved: a correct commit resolves + the P−side foil does not advance; lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; controls ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
