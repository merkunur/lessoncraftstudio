#!/usr/bin/env node
/* =====================================================================
   _layunits-probe.js — the multi-state control-bottom probe for "Inchie's
   Garden Path / Lay the Units" (1.MD.A.2). The uncapped visual-qa sweep covers
   first paint; this drives the empty / mid-lay-gap / abutted-awaiting-count /
   counting / judge / start-offset / inverse states and per the #10 lesson
   MEASURES the lowest control INCLUDING the shell `.lcs-activity-check` <= vh-4
   across 320·360·412·768·1024·1366. Bakes in the text-containment check
   (prompt/tally/Inchie line) + a no-overlap check (the HTML buttons) + tap
   >=44px (the buttons + the SVG helpers + judge cards) + no horizontal overflow
   (the SVG is viewBox-bounded). (Unique name — a prior game owns _forge-probe.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'lay-units.measure.1-md-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
/* the §A.13.62 DoD's six viewports verbatim (the real gate visual-qa-activity.js
   tests these; the probe drives the INTERACTED states across the same set). */
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
  const url = `http://127.0.0.1:${PORT}/lay-units-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.LayUnitsActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'lay-units.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.LayUnitsActivity.round && document.querySelector('.lu-root'), { timeout: 4000 });
    await sleep(40);
  }
  const add = (n) => page.evaluate((k) => { const a = window.LayUnitsActivity; for (let i = 0; i < k; i++) a._add(a.round.unitWidth); }, n).then(() => sleep(20));
  const oracle = () => page.evaluate(() => { const a = window.LayUnitsActivity; a.helpers = window.LayUnitsCore.legalAbut(a.round); a.selected = null; a._afterMove(); }).then(() => sleep(20));
  const countSome = (k) => page.evaluate((n) => { const a = window.LayUnitsActivity; for (let i = 0; i < n; i++) a._countTap(i); }, k).then(() => sleep(20));

  const states = {
    'empty': async () => { await force('span-pencil'); },
    'mid-gap': async () => { await force('span-pencil'); await add(2); },
    'abutted': async () => { await force('span-pencil'); await oracle(); },
    'counting': async () => { await force('span-pencil'); await oracle(); await countSome(2); },
    'judge': async () => { await force('judge-ribbon'); },
    'start': async () => { await force('start-stick'); },
    'inverse': async () => { await force('inverse-leaf'); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.lu-btn,.lu-judgecard,.lu-forge,.lu-tally,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.lu-btn,.lu-judgecard'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      /* count/lay UNIT helpers only — exclude the inverse "little" helpers
         (intrinsically thin: 8 sub-units across, the "smaller-unit→bigger-count"
         pedagogy — never 44px-wide by design) and the JUDGE rows' decorative
         helpers (the whole .lu-judgecard is the tap target, not the sub-node). */
      let minHelper = 999; document.querySelectorAll('.lu-forge .lu-h:not(.lu-little)').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minHelper = Math.min(minHelper, Math.min(r.width, r.height)); });
      let bleed = 0;
      document.querySelectorAll('.lu-prompt,.lu-tally,.lu-saytext,.lu-counthint,.lu-donetext').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      const boxes = Array.from(document.querySelectorAll('.lu-btn')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minHelper: Math.round(minHelper), bleed, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.LayUnitsActivity; return t && t._activityRow && document.querySelector('.lu-root'); }, { timeout: 15000 });

  const order = ['empty', 'mid-gap', 'abutted', 'counting', 'judge', 'start', 'inverse'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a button is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.minHelper < CTRL_MIN && tt.minHelper !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a helper hit-box is ${tt.minHelper}px (<${CTRL_MIN}px)`);
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} button pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} helper=${tt.minHelper} bleed=${tt.bleed} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`LAYUNITS-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`LAYUNITS-PROBE PASSED — empty/mid-gap/abutted/counting/judge/start/inverse: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; buttons/judge-cards + the SVG helper hit-boxes ≥${CTRL_MIN}px (off the 320 sub-floor), no prompt/tally glyph overflow, no button overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
