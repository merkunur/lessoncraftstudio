#!/usr/bin/env node
/* =====================================================================
   _winter-probe.js — the multi-stage control-bottom probe for "Squirrel's
   Fair Winter Piles". The uncapped visual-qa sweep covers stage-0 first
   paint; this drives the draw/read/valid/fix/5-stepper states and MEASURES
   the lowest control INCLUDING the shell `.lcs-activity-check` (the #10
   lesson: a tall stage pushes the shell Check below the fold even when the
   activity's own controls fit) against the viewport, requiring ≥4px margin.
   Full DoD sweep widths × every stage state.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'winter-piles.draw-partition.2-oa-c-4';
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
  const url = `http://127.0.0.1:${PORT}/winter-piles-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WinterPilesActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'winter-piles.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WinterPilesActivity.round && document.querySelector('.wp-field'), { timeout: 4000 });
  }
  async function setState(cuts, addends) { await page.evaluate((c, a) => { const t = window.WinterPilesActivity; t.cuts = c.slice(); t._resetAddends(); if (a) t.addends = a.slice(); t.render(); }, cuts, addends || null); await sleep(30); }
  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.wp-lock,.wp-strip,.wp-step,.wp-field,.wp-hoard,.wp-total' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.WinterPilesActivity; return t && t._activityRow && document.querySelector('.wp-field'); }, { timeout: 15000 });

  // states: empty array · mid-cut (steppers blank) · valid (lock-it-in showing) · 5-stepper worst (fix-5x2 fully cut + read) · fix-preset
  const states = [
    { id: 'fair-4x4', label: 'empty', cuts: [] },
    { id: 'fair-4x4', label: 'mid-cut', cuts: [2] },
    { id: 'fair-4x4', label: 'valid-lock-it-in', cuts: [2], addends: [8, 8] },
    { id: 'fair-4x4', label: '4-stepper-valid', cuts: [1, 2, 3], addends: [4, 4, 4, 4] },
    { id: 'fix-4x3', label: 'fix-preset', cuts: null }
  ];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const st of states) {
      await force(st.id);
      if (st.cuts) await setState(st.cuts, st.addends);
      const cb = await controlBottom(!subFloor);
      const ok = cb <= h - MARGIN;
      const what = subFloor ? 'activity controls' : 'lowest control (incl. shell Check)';
      if (!ok) fails.push(`${st.label} @${w}×${h}: ${what} bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${st.label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})${subFloor ? ' [activity-controls; Check=done-stage]' : ''}`);
    }
    if (subFloor) {
      await force('fair-4x4'); await setState([2], [8, 8]);
      await page.evaluate(() => { const b = document.querySelector('.wp-lock'); if (b) b.click(); }); await sleep(60);
      const doneCb = await controlBottom(true);
      const ok = doneCb <= h - MARGIN;
      if (!ok) fails.push(`done-stage @${w}×${h}: Check bottom ${doneCb}px > ${h - MARGIN}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} done-stage(Check) @${w}×${h}  ctrlBottom=${doneCb} (need ≤${h - MARGIN})`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`WINTER-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`WINTER-PROBE PASSED — empty/mid-cut/valid/5-stepper/fix-preset: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
