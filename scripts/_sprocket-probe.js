#!/usr/bin/env node
/* =====================================================================
   _sprocket-probe.js — control-bottom probe for "Sprocket's Clock"
   (read analog → digital). Drives 2 rounds + wrong + resolved, MEASURES the
   lowest control incl. the shell Check across 320·360·412·768·1024·1366, plus
   tap ≥44 on the digital cards, no overlap, no overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = (process.argv.find(a => a.startsWith('--activity=')) || '').split('=')[1] || 'clock-digital.read-hour.1-md-b-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };
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
  const url = `http://127.0.0.1:${PORT}/clock-digital-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(idx) {
    await page.evaluate((k0) => {
      const t = window.ClockDigitalActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = Math.min(Math.max(0, k0), n - 1);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, idx);
    await page.waitForFunction(() => window.ClockDigitalActivity._round && document.querySelector('.cd-root'), { timeout: 4000 });
    await sleep(60);
  }
  const solve = (ok) => page.evaluate((correct) => {
    const t = window.ClockDigitalActivity, r = t._round, C = window.ClockDigitalCore;
    const oi = C.oracle(r);
    let target = oi;
    if (!correct) { for (let i = 0; i < r.options.length; i++) if (!C.isAnswer(r, i)) { target = i; break; } }
    const b = Array.from(document.querySelectorAll('.cd-choice')).find(x => +x.getAttribute('data-oi') === target); if (b) b.click();
  }, ok).then(() => sleep(50));

  const states = {
    'roundA': async () => { await force(0); },
    'roundB': async () => { await force(4); },
    'wrong': async () => { await force(2); await solve(false); },
    'resolved': async () => { await force(8); await solve(true); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.cd-root,.cd-clock,.cd-readout,.cd-row,.cd-choice,.cd-say,.cd-msg,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.cd-choice'));
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
  await page.waitForFunction(() => { const t = window.ClockDigitalActivity; return t && t._activityRow && document.querySelector('.cd-root'); }, { timeout: 15000 });

  await states.resolved();
  if (!(await page.evaluate(() => window.ClockDigitalActivity._resolved))) fails.push('a correct tap did NOT resolve');
  await states.wrong();
  if (await page.evaluate(() => window.ClockDigitalActivity._resolved)) fails.push('a wrong tap resolved — must not advance');

  const order = ['roundA', 'roundB', 'wrong', 'resolved'];
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. Check) bottom ${cb}px > ${h - MARGIN}px — cut off`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a digital card is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} card pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`SPROCKET-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`SPROCKET-PROBE PASSED — roundA/roundB/wrong/resolved: a correct tap resolves + a wrong tap does not advance; lowest control (incl. Check) clears the fold by ≥${MARGIN}px across 320→1366; digital cards ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
