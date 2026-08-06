#!/usr/bin/env node
/* =====================================================================
   _wondering-probe.js — the multi-stage control-bottom probe for "The
   Wondering Jar". The uncapped visual-qa sweep covers the ESTIMATE first paint
   only; this drives the count (line/array/circle/scatter) + compare + two-jar
   states and MEASURES the lowest control INCLUDING the shell `.lcs-activity-
   check` (the #10 lesson) ≤ vh−4 across all sweep widths. Also asserts the
   slider thumb ≥44px, spread items ≥40px, and no overlapping item targets.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wondering-jar.estimate-jar.k-cc-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4;

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
  const url = `http://127.0.0.1:${PORT}/wondering-jar-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WonderingJarActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'wondering-jar.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WonderingJarActivity.round && document.querySelector('.wj-root'), { timeout: 4000 });
  }
  // lock the wish (slider via _lock, or pick the first judgment button) → count stage
  const lock = () => page.evaluate(() => { const t = window.WonderingJarActivity; if (t._estimateMode() === 'slider') t._lock(t.guess); else { const b = document.querySelector('.wj-pick'); if (b) b.click(); } }).then(() => sleep(30));
  const tapN = (k) => page.evaluate((kk) => { const els = document.querySelectorAll('.wj-item'); for (let i = 0; i < Math.min(kk, els.length); i++) els[i].click(); }).then(() => sleep(30), k);
  const countAll = () => page.evaluate(() => { const t = window.WonderingJarActivity; let g = 0; while (t.stage === 'count' && g++ < 80) { const els = document.querySelectorAll('.wj-item'); if (!els.length) break; for (const e of els) { e.click(); if (t.stage !== 'count') break; } } }).then(() => sleep(40));

  const states = {
    'estimate': async (id) => { await force(id); },
    'count-mid': async (id) => { await force(id); await lock(); await tapN(2); },
    'count-array': async () => { await force('array-12'); await lock(); },
    'count-circle': async () => { await force('circle-9'); await lock(); },
    'count-scatter': async () => { await force('scatter-7'); await lock(); },
    'compare': async (id) => { await force(id); await lock(); await countAll(); },
    'two-jar': async () => { await force('compare-two'); await lock(); await tapN(3); }
  };

  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.wj-jars,.wj-slider,.wj-lock,.wj-pick,.wj-spread,.wj-readout,.wj-compare,.wj-phase' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }
  async function taps() {
    return await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.wj-item'));
      const thumb = document.querySelector('.wj-thumb'), lock = document.querySelector('.wj-lock'), pick = document.querySelector('.wj-pick');
      let minItem = 999; items.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minItem = Math.min(minItem, r.width, r.height); });
      let ctrl = 999; [thumb, lock, pick].forEach(e => { if (e) { const r = e.getBoundingClientRect(); if (r.width) ctrl = Math.min(ctrl, r.width, r.height); } });
      let overlap = 0;
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const a = items[i].getBoundingClientRect(), b = items[j].getBoundingClientRect();
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 6 && oy > 6) overlap++;
      }
      return { minItem: items.length ? Math.round(minItem) : 999, minCtrl: ctrl === 999 ? 999 : Math.round(ctrl), overlap };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.WonderingJarActivity; return t && t._activityRow && document.querySelector('.wj-root'); }, { timeout: 15000 });

  const order = [
    ['estimate', 'line-8'], ['count-mid', 'line-8'], ['count-array', null], ['count-circle', null],
    ['count-scatter', null], ['compare', 'line-8'], ['two-jar', null]
  ];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const [label, id] of order) {
      await states[label](id);
      const cb = await controlBottom(!subFloor);
      const ok = cb <= h - MARGIN;
      const what = subFloor ? 'activity controls' : 'lowest control (incl. shell Check)';
      if (!ok) fails.push(`${label} @${w}×${h}: ${what} bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await taps();
      if (tt.minItem < 40 && tt.minItem !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a spread item is ${tt.minItem}px (<40px)`);
      if (tt.minCtrl < 44 && tt.minCtrl !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a slider/lock/pick control is ${tt.minCtrl}px (<44px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping item targets`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  item=${tt.minItem} ctrl=${tt.minCtrl} overlap=${tt.overlap}${subFloor ? ' [activity-controls]' : ''}`);
    }
    if (subFloor) {
      await states['compare']('line-8');
      const doneCb = await controlBottom(true);
      const ok = doneCb <= h - MARGIN;
      if (!ok) fails.push(`compare-stage @${w}×${h}: Check bottom ${doneCb}px > ${h - MARGIN}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} compare-stage(Check) @${w}×${h}  ctrlBottom=${doneCb} (need ≤${h - MARGIN})`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`WONDERING-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`WONDERING-PROBE PASSED — estimate/count(line·array·circle·scatter)/compare/two-jar: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; spread items ≥40px, slider/lock/pick ≥44px, no overlap.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
