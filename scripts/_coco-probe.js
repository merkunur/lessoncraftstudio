#!/usr/bin/env node
/* =====================================================================
   _coco-probe.js — multi-state control-bottom probe for "Coco's Sound Boxes"
   (RF.K.2.d). Drives 2 rounds + a wrong-tap + resolved, and MEASURES the lowest
   control INCLUDING the shell `.lcs-activity-check` across 320·360·412·768·
   1024·1366, plus tap ≥44px on the picture tiles, no overlap, no overflow.
   Serves /image-library-webp/ so the real CVC pictures render.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sound-boxes.phoneme-position.rf-k-2-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' };
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
  const url = `http://127.0.0.1:${PORT}/sound-boxes-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SoundBoxesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SoundBoxesActivity._round && document.querySelector('.sb-root'), { timeout: 4000 });
    await sleep(70);
  }
  const solve = (ok) => page.evaluate((correct) => {
    const t = window.SoundBoxesActivity, r = t._round, C = window.SoundBoxesCore;
    const oi = C.oracle(r);
    let target = oi;
    if (!correct) { for (let i = 0; i < r.options.length; i++) if (!C.isAnswer(r, i)) { target = i; break; } }
    const b = Array.from(document.querySelectorAll('.sb-choice')).find(x => +x.getAttribute('data-oi') === target); if (b) b.click();
  }, ok).then(() => sleep(50));

  const states = {
    'roundA': async () => { await force('sb-cat-first'); },
    'roundB': async () => { await force('sb-sun-mid'); },
    'wrong': async () => { await force('sb-cat-last'); await solve(false); },
    /* wait out the ~900ms confetti (appended to the stage on success) so the
       measurement reflects the PERSISTENT resolved layout, not the celebration */
    'resolved': async () => { await force('sb-van-last'); await solve(true); await sleep(1000); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.sb-root,.sb-stim,.sb-target,.sb-boxes,.sb-row,.sb-choice,.sb-say,.sb-hear,.sb-msg,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.sb-choice'));
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
  await page.waitForFunction(() => { const t = window.SoundBoxesActivity; return t && t._activityRow && document.querySelector('.sb-root'); }, { timeout: 15000 });

  await states.resolved();
  if (!(await page.evaluate(() => window.SoundBoxesActivity._resolved))) fails.push('a correct tap did NOT resolve');
  await states.wrong();
  if (await page.evaluate(() => window.SoundBoxesActivity._resolved)) fails.push('a wrong (non-match) tap resolved — must not advance');

  const order = ['roundA', 'roundB', 'wrong', 'resolved'];
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a picture tile is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} tile pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`COCO-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`COCO-PROBE PASSED — roundA/roundB/wrong/resolved: a correct tap resolves + a wrong (non-match) tap does not advance; lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; picture tiles ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
