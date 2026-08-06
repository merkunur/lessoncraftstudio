#!/usr/bin/env node
/* =====================================================================
   _pesto-probe.js — the multi-state control-bottom probe for "Pesto's Soup
   Stall" (L.1.5.d). Drives pick / order / bound / manner (initial) + a
   wrong-scaffold + resolved, and MEASURES the lowest control INCLUDING the
   shell `.lcs-activity-check` across 320·360·412·768·1024·1366, plus tap
   ≥44px, no overlap, no horizontal overflow. (Unique name — grepped clear.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'shades.pick.l-1-5-d';
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
  const url = `http://127.0.0.1:${PORT}/shades-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ShadesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ShadesActivity._round && document.querySelector('.sh-root'), { timeout: 4000 });
    await sleep(60);
  }
  const solve = (correct) => page.evaluate((ok) => {
    const t = window.ShadesActivity, r = t._round, Core = window.ShadesCore;
    const byText = (txt) => Array.from(document.querySelectorAll('.sh-cand')).find(b => b.textContent === txt && !b.classList.contains('gone'));
    const ws = Core.words(r);
    if (r.cog === 'pick') { const a = ws.find(w => w.rank === r.requiredRank), o = ws.find(w => w.rank !== r.requiredRank); const b = byText((ok ? a : o).text); if (b) b.click(); }
    else if (r.cog === 'manner') { const a = Core.wordById(r, r.answerId), o = ws.find(w => w.id !== r.answerId); const b = byText((ok ? a : o).text); if (b) b.click(); }
    else if (r.cog === 'bound') { const oi = Core.boundOracle(r), a = ws[oi], o = ws.find((w, i) => i !== oi); const b = byText((ok ? a : o).text); if (b) b.click(); }
    else if (r.cog === 'order') {
      const seq = Core.orderOracle(r);
      if (ok) { for (let k = 0; k < seq.length; k++) { const w = Core.wordById(r, seq[k]); const b = byText(w.text); if (b) b.click(); } }
      else { const w = Core.wordById(r, seq[seq.length - 1]); const b = byText(w.text); if (b) b.click(); }   /* strongest first = wrong */
    }
  }, correct).then(() => sleep(50));

  const states = {
    'pick': async () => { await force('pick-soup-low'); },
    'order': async () => { await force('order-temp'); },
    'bound': async () => { await force('bound-size'); },
    'manner': async () => { await force('manner-shy'); },
    'wrong': async () => { await force('pick-soup-low'); await solve(false); },
    'resolved': async () => { await force('pick-soup-high'); await solve(true); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.sh-root,.sh-say,.sh-cue,.sh-bound,.sh-placed,.sh-jars,.sh-cand,.sh-line,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.sh-cand'));
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
  await page.waitForFunction(() => { const t = window.ShadesActivity; return t && t._activityRow && document.querySelector('.sh-root'); }, { timeout: 15000 });

  /* functional sanity */
  await states.resolved();
  if (!(await page.evaluate(() => window.ShadesActivity._resolved))) fails.push('a correct pick did NOT resolve');
  await states.wrong();
  if (await page.evaluate(() => window.ShadesActivity._resolved)) fails.push('a wrong-rank pick resolved — must not advance');

  const order = ['pick', 'order', 'bound', 'manner', 'wrong', 'resolved'];
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
  if (fails.length) { console.error(`PESTO-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`PESTO-PROBE PASSED — pick/order/bound/manner/wrong/resolved: a correct shade resolves + a wrong shade does not advance; lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; controls ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
