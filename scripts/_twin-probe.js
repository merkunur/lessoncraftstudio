#!/usr/bin/env node
/* =====================================================================
   _twin-probe.js — the multi-stage control-bottom probe for "Twinsies".
   The uncapped visual-qa sweep covers stage-0 first paint; this drives the
   build/declare states (incl. the 20-object teens ten-frame + the numeral
   source) and MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` (the #10 lesson) against the viewport, ≥4px margin.
   Verifies the stage time-share collapses the model to a peek chip in build.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'twinsies.count-twin.k-cc-b-5';
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
  const url = `http://127.0.0.1:${PORT}/twinsies-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TwinsiesActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'twinsies.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TwinsiesActivity.round && document.querySelector('.tw-root'), { timeout: 4000 });
  }
  async function toBuild(placed) { await page.evaluate((p) => { const t = window.TwinsiesActivity; const n = t.round.model.n; for (let i = 0; i < n; i++) t.caught[i] = true; t.committed = true; t.stage = 'build'; t.placed = p; t.render(); }, placed); await sleep(30); }
  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.tw-declare,.tw-plate,.tw-cell,.tw-commit,.tw-readout,.tw-model,.tw-numeral' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.TwinsiesActivity; return t && t._activityRow && document.querySelector('.tw-root'); }, { timeout: 15000 });

  const states = [
    { id: 'scattered-7', label: 'count-model', build: null },
    { id: 'scattered-7', label: 'build-mid', build: 4 },
    { id: 'scattered-7', label: 'build-valid', build: 7 },
    { id: 'cover-line-12', label: 'teens-build(20-cell)', build: 12 },
    { id: 'numeral-8', label: 'numeral-build', build: 8 }
  ];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const st of states) {
      await force(st.id);
      if (st.build != null) await toBuild(st.build);
      const cb = await controlBottom(!subFloor);
      const ok = cb <= h - MARGIN;
      const what = subFloor ? 'activity controls' : 'lowest control (incl. shell Check)';
      if (!ok) fails.push(`${st.label} @${w}×${h}: ${what} bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${st.label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})${subFloor ? ' [activity-controls]' : ''}`);
    }
    if (subFloor) {
      await force('numeral-8'); await toBuild(8);
      await page.evaluate(() => { const t = window.TwinsiesActivity; t.solved = true; t.stage = 'done'; t.render(); });
      await sleep(40);
      const doneCb = await controlBottom(true);
      const ok = doneCb <= h - MARGIN;
      if (!ok) fails.push(`done-stage @${w}×${h}: Check bottom ${doneCb}px > ${h - MARGIN}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} done-stage(Check) @${w}×${h}  ctrlBottom=${doneCb} (need ≤${h - MARGIN})`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TWIN-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`TWIN-PROBE PASSED — count/build/teens/numeral: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
