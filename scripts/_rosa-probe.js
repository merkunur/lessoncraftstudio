#!/usr/bin/env node
/* =====================================================================
   _rosa-probe.js — the multi-state control-bottom probe for "Rosa Raccoon's
   Rhyme Wagon" (RF.K.2.a). Drives the judge / pick / odd / sort / chant /
   field / chain / resolved states and MEASURES the lowest control INCLUDING
   the shell `.lcs-activity-check` <= vh-4 across 320·360·412·768·1024·1366,
   plus tap >= 44px (the picture tiles + buttons), no overlap, no horizontal
   overflow. Serves the image library locally. (Unique name — grepped clear.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'rhyme-shop.rhyme.rf-k-2-a';
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
  const url = `http://127.0.0.1:${PORT}/rhyme-shop-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.RhymeShopActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.RhymeShopActivity._round && document.querySelector('.rs-root'), { timeout: 4000 });
    await sleep(80);   /* let the library images lay out */
  }
  const clickWord = (w) => page.evaluate((word) => { const els = Array.from(document.querySelectorAll('.rs-tile,.rs-btn')); const hit = els.find(e => (e.getAttribute('aria-label') || e.textContent || '').replace(/[♪\s]/g, '').toLowerCase().indexOf(word.toLowerCase()) >= 0); if (hit) hit.click(); }, w).then(() => sleep(25));
  const clickBtn = (t) => page.evaluate((tx) => { const b = Array.from(document.querySelectorAll('.rs-btn')).find(x => x.textContent.trim() === tx); if (b && !b.disabled) b.click(); }, t).then(() => sleep(25));

  const states = {
    'judge': async () => { await force('rhyme-shop.judge-snail-whale'); },
    'pick': async () => { await force('rhyme-shop.pick-pear'); },
    'odd': async () => { await force('rhyme-shop.odd-ehr'); },
    'sort': async () => { await force('rhyme-shop.sort-eyl-iy'); },
    'chant': async () => { await force('rhyme-shop.chant-whale'); },
    'field': async () => { await force('rhyme-shop.field-bee'); },
    'chain': async () => { await force('rhyme-shop.chain-eyl'); },
    'resolved': async () => { await force('rhyme-shop.judge-snail-whale'); await clickBtn('Yes, they ring!'); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.rs-root,.rs-grid,.rs-bins,.rs-pile,.rs-row,.rs-tile,.rs-bin,.rs-btn,.rs-couplet,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.rs-tile,.rs-bin,.rs-btn'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      let bleed = 0;
      document.querySelectorAll('.rs-line,.rs-couplet,.rs-word,.rs-btn').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      const boxes = Array.from(document.querySelectorAll('.rs-tile,.rs-btn')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, bleed, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.RhymeShopActivity; return t && t._activityRow && document.querySelector('.rs-root'); }, { timeout: 15000 });

  const order = ['judge', 'pick', 'odd', 'sort', 'chant', 'field', 'chain', 'resolved'];

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
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} tile pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} bleed=${tt.bleed} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`ROSA-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`ROSA-PROBE PASSED — judge/pick/odd/sort/chant/field/chain/resolved: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 320→1366; tiles/buttons ≥${CTRL_MIN}px (off the 320 sub-floor), no word/couplet overflow, no tile overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
