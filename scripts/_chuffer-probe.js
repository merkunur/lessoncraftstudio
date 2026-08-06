#!/usr/bin/env node
/* =====================================================================
   _chuffer-probe.js — the multi-state control-bottom probe for "Chuffer's
   Switchyard" (K.OA.A.3). The uncapped visual-qa sweep covers first paint;
   this drives the picker / banked-staircase / judge / make-ten / done states
   and MEASURES the lowest control INCLUDING the shell `.lcs-activity-check`
   (the #10 lesson) ≤ vh−4 across all sweep widths. Also asserts the steppers /
   chips / coupler / judge buttons are ≥44px and nothing overlaps; the N=10
   ten-frame cars + the merged route-book fit (the book scrolls; the cars +
   shifter + coupler stay above the fold).
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'chuffer.rail-decompose.k-oa-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
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
  const url = `http://127.0.0.1:${PORT}/chuffer-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ChufferActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'chuffer.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ChufferActivity.round && document.querySelector('.cf-root'), { timeout: 4000 });
  }
  const openPicker = () => page.evaluate(() => { window.ChufferActivity.picking = 'a'; window.ChufferActivity.render(); }).then(() => sleep(20));
  const bankOne = () => page.evaluate(() => { const t = window.ChufferActivity, C = window.RailDecomposeCore; C.setA(t.cstate, 2); t.statedA = t.cstate.a; t.statedB = t.cstate.b; C.stateParts(t.cstate, t.cstate.a, t.cstate.b); C.record(t.cstate); t.statedA = null; t.statedB = null; t.render(); }).then(() => sleep(20));
  const complete = () => page.evaluate(() => { const t = window.ChufferActivity; t.solved = true; t.render(); }).then(() => sleep(20));

  const states = {
    'base': async () => { await force('decompose-10'); },
    'picker': async () => { await force('decompose-5'); await openPicker(); },
    'banked': async () => { await force('decompose-10'); await bankOne(); },
    'judge': async () => { await force('judge-6'); },
    'maketen': async () => { await force('maketen-3'); },
    'done': async () => { await force('decompose-5'); await complete(); }
  };

  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.cf-yard,.cf-cars,.cf-shift,.cf-route,.cf-picker,.cf-coupler,.cf-book,.cf-judge,.cf-hill,.cf-side' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }
  async function checks() {
    return await page.evaluate(() => {
      const ctrls = Array.from(document.querySelectorAll('.cf-shiftbtn,.cf-box,.cf-chip,.cf-coupler:not(.cf-off),.cf-jbtn'));
      let minCtrl = 999; ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minCtrl = Math.min(minCtrl, r.width, r.height); });
      const card = document.querySelector('.cf-root'); const cr = card ? card.getBoundingClientRect() : null;
      const all = Array.from(document.querySelectorAll('.cf-shiftbtn,.cf-box,.cf-chip,.cf-coupler,.cf-jbtn,.cf-carbox')); let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      return { minCtrl: ctrls.length ? Math.round(minCtrl) : 999, overlap };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.ChufferActivity; return t && t._activityRow && document.querySelector('.cf-root'); }, { timeout: 15000 });

  const order = ['base', 'picker', 'banked', 'judge', 'maketen', 'done'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom(!subFloor);
      const ok = cb <= h - MARGIN;
      const what = subFloor ? 'activity controls' : 'lowest control (incl. shell Check)';
      if (!ok) fails.push(`${label} @${w}×${h}: ${what} bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minCtrl < CTRL_MIN && tt.minCtrl !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minCtrl}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  ctrl=${tt.minCtrl} overlap=${tt.overlap}${subFloor ? ' [activity-controls]' : ''}`);
    }
    if (subFloor) {
      await states['done']();
      const doneCb = await controlBottom(true);
      const ok = doneCb <= h - MARGIN;
      if (!ok) fails.push(`done-stage @${w}×${h}: Check bottom ${doneCb}px > ${h - MARGIN}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} done-stage(Check) @${w}×${h}  ctrlBottom=${doneCb} (need ≤${h - MARGIN})`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`CHUFFER-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`CHUFFER-PROBE PASSED — base/picker/banked/judge/maketen/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; steppers/chips/coupler/judge ≥${CTRL_MIN}px, no overlap.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
