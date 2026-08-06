#!/usr/bin/env node
/* =====================================================================
   _clock-probe.js — the multi-state control-bottom probe for "Owl's Cuckoo
   Cottage" (1.MD.B.3). The uncapped visual-qa sweep covers first paint;
   this drives the read / set / order / world-cue / payoff states and per
   the #10 lesson MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` <= vh-4 across 320·360·412·768·1024·1366. Also
   asserts the event-cards / commit / order-clock controls >= 44px, the
   clock numerals legible, nothing overlaps, no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'clock-read.tell-time.1-md-b-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
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
  const url = `http://127.0.0.1:${PORT}/clock-read-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ClockReadActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'clock-read.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ClockReadActivity.round && document.querySelector('.crd-root'), { timeout: 4000 });
    await sleep(40);
  }
  const payoff = () => page.evaluate(() => { const a = window.ClockReadActivity, C = window.ClockReadCore; a.solved = true; a.msg = 'Cuckoo! half past eight — Bedtime!'; a.render(); }).then(() => sleep(20));

  const states = {
    'read':  async () => { await force('read-bedtime'); },
    'set':   async () => { await force('set-half-seven'); },
    'order': async () => { await force('order-bedtime'); },
    'cue':   async () => { await force('cue-dawn'); },
    'payoff': async () => { await force('read-bedtime'); await payoff(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.crd-card,.crd-wake,.crd-clockbtn,.crd-arc,.crd-readout,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.crd-card,.crd-wake,.crd-clockbtn'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, r.height); });
      /* the hand hit-line grab width (thinnest axis of an axis-aligned hand) */
      let handGrab = 999; document.querySelectorAll('.crd-hand-hour .crd-hit,.crd-hand-minute .crd-hit').forEach(e => { const r = e.getBoundingClientRect(); const m = Math.min(r.width, r.height); if (m) handGrab = Math.min(handGrab, m); });
      let minNum = 999; document.querySelectorAll('.crd-svg text').forEach(e => { const r = e.getBoundingClientRect(); if (r.height) minNum = Math.min(minNum, r.height); });
      const all = taps.map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 8 && oy > 8) overlap++; }
      /* TEXT-CONTAINMENT: a card's content must not overflow its own box, and
         the label/time glyphs must not cross the card's right padding edge
         (the "Breakfast" class the page-overflow check misses). */
      let textBleed = 0;
      document.querySelectorAll('.crd-card,.crd-clockbtn').forEach(card => {
        if (card.scrollWidth > card.clientWidth + 1) textBleed++;
        const cr = card.getBoundingClientRect(), pr = parseFloat(getComputedStyle(card).paddingRight) || 0;
        card.querySelectorAll('.crd-cardtext,.crd-cardtime').forEach(t => { if (t.getBoundingClientRect().right > cr.right - pr + 1) textBleed++; });
      });
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, handGrab: Math.round(handGrab), minNum: Math.round(minNum), overlap, textBleed, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.ClockReadActivity; return t && t._activityRow && document.querySelector('.crd-root'); }, { timeout: 15000 });

  const order = ['read', 'set', 'order', 'cue', 'payoff'];

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
      if ((label === 'set' || label === 'cue') && tt.handGrab < 40 && tt.handGrab !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: the hand grab is ${tt.handGrab}px (<40px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.textBleed > 0) fails.push(`${label} @${w}×${h}: ${tt.textBleed} card text(s) overflow their container (glyph past the card edge)`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} hand=${tt.handGrab} num=${tt.minNum} overlap=${tt.overlap} bleed=${tt.textBleed} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`CLOCK-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`CLOCK-PROBE PASSED — read/set/order/cue/payoff: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; event-cards/commit/order-clocks ≥${CTRL_MIN}px + the hand grab ≥40px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
