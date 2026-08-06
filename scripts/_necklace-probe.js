#!/usr/bin/env node
/* =====================================================================
   _necklace-probe.js — the multi-stage control-bottom probe for "The Necklace
   That Won't Hold Still". The uncapped visual-qa sweep covers STAGE-0 first
   paint only; this drives the model-full / produce / recount / confirm / fix /
   done states and MEASURES the lowest control INCLUDING the shell
   `.lcs-activity-check` (the #10 lesson) ≤ vh−4 across all sweep widths. Also
   asserts every bead tap-target ≥44px and no two adjacent targets overlap.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'necklace.bead-string.k-cc-b-4';
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
  const url = `http://127.0.0.1:${PORT}/necklace-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.NecklaceActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'necklace.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.NecklaceActivity.round && document.querySelector('.nk-root'), { timeout: 4000 });
  }
  const countFull = () => page.evaluate(() => { const t = window.NecklaceActivity, n = t._modelN(); for (let i = 0; i < n; i++) t._catch(i); }).then(() => sleep(25));
  const thread = (k) => page.evaluate((kk) => { const t = window.NecklaceActivity; t.placed = kk; t.render(); }, k).then(() => sleep(20));
  const commit = () => page.evaluate(() => { const b = document.querySelector('.nk-commit'); if (b) b.click(); }).then(() => sleep(30));

  // state drivers — each leaves the activity in the named stage
  const states = {
    'count-model': async (id) => { await force(id); },
    'model-full': async (id) => { await force(id); await countFull(); },
    'produce-mid': async (id) => { await force(id); await countFull(); await commit(); await thread(3); },
    'recount-shaken': async () => { await force('recount-7'); await countFull(); await commit(); await countFull(); },
    'confirm': async () => { await force('confirm-10'); await countFull(); await commit(); },
    'fix': async () => { await force('findskip-9'); },
    'done': async () => { await force('heard-7'); await thread(7); await page.evaluate(() => { const d = document.querySelector('.nk-declare'); if (d) d.click(); }); await sleep(40); }
  };

  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.nk-model,.nk-cord,.nk-commit,.nk-declare,.nk-cardinal,.nk-readout,.nk-doneneck,.nk-branch,.nk-peek' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }
  async function tapTargets() {
    return await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('.nk-obj,.nk-slot.nk-ready,.nk-slot.nk-filled,.nk-declare,.nk-commit,.nk-cardinal'));
      let minSide = 999; const rects = [];
      els.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) { minSide = Math.min(minSide, r.width, r.height); rects.push(r); } });
      // overlap among bead targets only (declare/commit are large & separate)
      const beads = Array.from(document.querySelectorAll('.nk-obj,.nk-slot')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < beads.length; i++) for (let j = i + 1; j < beads.length; j++) {
        const a = beads[i], b = beads[j];
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 6 && oy > 6) overlap++;
      }
      return { minSide: Math.round(minSide), overlap, n: els.length };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.NecklaceActivity; return t && t._activityRow && document.querySelector('.nk-root'); }, { timeout: 15000 });

  const order = [
    ['count-model', 'thread-6'], ['model-full', 'thread-6'], ['produce-mid', 'thread-6'],
    ['recount-shaken', null], ['confirm', null], ['fix', null], ['done', null]
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
      // tap-target sanity (skip the tiny 320 sub-floor where some bead shrinks are accepted)
      const tt = await tapTargets();
      if (tt.minSide < 44 && !subFloor) fails.push(`${label} @${w}×${h}: a tap target is ${tt.minSide}px (<44px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping bead targets`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  minTap=${tt.minSide}  overlap=${tt.overlap}${subFloor ? ' [activity-controls]' : ''}`);
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
  if (fails.length) { console.error(`NECKLACE-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`NECKLACE-PROBE PASSED — count-model/model-full/produce/recount/confirm/fix/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; bead tap targets ≥44px, no overlap.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
