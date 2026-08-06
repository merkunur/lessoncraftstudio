#!/usr/bin/env node
/* =====================================================================
   _sprout-probe.js — the multi-state control-bottom probe for "Sprout's
   Patchwork Meadow" (3.MD.C.6). Drives tile / repair / estimate / finish /
   build (initial) + wrong-estimate-scaffold + resolved, and MEASURES the
   lowest control INCLUDING the shell `.lcs-activity-check` <= vh-4 across
   320·360·412·768·1024·1366, plus tap >= 44px, no overlap, no horizontal
   overflow. Serves the image library locally. (Unique name — grepped clear.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'patchwork-meadow.tile.3-md-c-6';
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
  const url = `http://127.0.0.1:${PORT}/patchwork-meadow-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PatchworkMeadowActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PatchworkMeadowActivity._round && document.querySelector('.pm-root'), { timeout: 4000 });
    await sleep(60);
  }
  /* cover a grid round by tapping the rendered cells (build → exactly target). */
  const solveGrid = () => page.evaluate(() => {
    const t = window.PatchworkMeadowActivity; let guard = 0;
    const cells = () => Array.from(document.querySelectorAll('.pm-cand'));
    while (guard++ < 80) {
      if (t._resolved) break;
      const over = cells().find(c => c.classList.contains('over'));
      if (over) { over.click(); continue; }
      const empty = cells().find(c => !c.classList.contains('patch') && !c.classList.contains('over'));
      if (!empty) break;
      empty.click();
    }
    return t._resolved;
  }).then(() => sleep(40));
  const pickWrongEstimate = () => page.evaluate(() => {
    const t = window.PatchworkMeadowActivity, Core = window.PatchworkMeadowCore, ok = Core.oracle(t._round);
    const btns = Array.from(document.querySelectorAll('.pm-choice'));
    // click a choice that is NOT the correct value
    const want = Core.regionArea(t._round);
    const wrong = btns.find(b => Number(b.textContent) !== want);
    if (wrong) wrong.click();
    return { clicked: !!wrong, ok };
  }).then(() => sleep(40));

  const states = {
    'tile': async () => { await force('pm-tile-staircase'); },
    'repair': async () => { await force('pm-repair-bed'); },
    'estimate': async () => { await force('pm-estimate-stair'); },
    'finish': async () => { await force('pm-finish-bigstair'); },
    'build': async () => { await force('pm-build-six'); },
    'wrong': async () => { await force('pm-estimate-stair'); await pickWrongEstimate(); },
    'resolved': async () => { await force('pm-tile-flowerbed'); await solveGrid(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.pm-root,.pm-grid,.pm-cand,.pm-cell,.pm-choice,.pm-line,.pm-say,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.pm-cand,.pm-choice'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      const boxes = Array.from(document.querySelectorAll('.pm-cand,.pm-choice')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.PatchworkMeadowActivity; return t && t._activityRow && document.querySelector('.pm-root'); }, { timeout: 15000 });

  /* functional sanity (once): a correct cover resolves; a wrong estimate does NOT */
  await states.resolved();
  if (!(await page.evaluate(() => window.PatchworkMeadowActivity._resolved))) fails.push('a full correct cover did NOT resolve');
  await states.wrong();
  if (await page.evaluate(() => window.PatchworkMeadowActivity._resolved)) fails.push('a wrong estimate pick resolved (must not advance)');

  const order = ['tile', 'repair', 'estimate', 'finish', 'build', 'wrong', 'resolved'];
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
  if (fails.length) { console.error(`SPROUT-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`SPROUT-PROBE PASSED — tile/repair/estimate/finish/build/wrong/resolved: a full cover resolves + a wrong estimate does not advance; lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; controls ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
