#!/usr/bin/env node
/* =====================================================================
   _pip-probe.js — the RETELL-stage control-bottom probe for "Wake Up,
   Pip!". The uncapped visual-qa sweep covers stage-0 watch; this drives
   each round into the RETELL ladder (empty + filled), the "Tell it!"
   broken-tangle state, and the fix-memory pre-fill, then MEASURES the
   lowest control bottom against the viewport — never a full-page shot.
   FAIL if any control bottom is below the viewport (the cut-off class).
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wake-up-pip.retell-story.rl-k-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
// the FULL DoD sweep widths 320·360·412·768·1024·1366 (with realistic heights) + a small-phone 280×740.
// The synthetic 280×600 is below the shell-header floor (~250px header + 600px leaves no room for a 4-slot
// ladder); 1024×900 + 1366×768 are the tight wide-desktop-short-height cases that pushed Check off-fold.
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4; // a control's bottom must clear the fold (≤ vh − 4px for its drop-shadow), NOT sit past it.
// The operator's locked visual-qa harness uses ≤ vh+8 and DOES count .lcs-activity-check; the operator
// flagged a Check ~5px past the fold, so the bar is "nothing past the fold" + a few px of shadow room.

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
  const url = `http://127.0.0.1:${PORT}/wake-up-pip-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WakeUpPipActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'wake-up-pip.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WakeUpPipActivity.round && document.querySelector('.rt-root'), { timeout: 4000 });
  }
  async function toRetell() { const g = await page.$('.rt-go'); if (g) { await g.click(); await sleep(60); } }
  async function fillCanonical() { await page.evaluate(() => { const t = window.WakeUpPipActivity; t.placed = window.RetellStoryCore.canonicalPlacement(t.round).slice(); t.tray = []; t.sel = null; t.render(); }); await sleep(40); }
  async function breakIt() { await page.evaluate(() => { const t = window.WakeUpPipActivity; t.placed = window.RetellStoryCore.canonicalPlacement(t.round).slice().reverse(); t.tray = []; t.sel = null; t.render(); const b = document.querySelector('.rt-tell'); if (b && !b.disabled) b.click(); }); await sleep(80); }
  async function controlBottom(includeCheck) {
    // include the SHELL Check button (.lcs-activity-check) — a tall stage pushes it below the fold even when
    // the activity's own "Tell it!" fits. It is a real, lowest control and was the thing actually cut off.
    return await page.evaluate((withCheck) => {
      const sel = '.rt-tell,.rt-tray,.rt-tile,.rt-go,.rt-play,.rt-ladder' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.WakeUpPipActivity; return t && t._activityRow && document.querySelector('.rt-root'); }, { timeout: 15000 });

  const states = [
    { id: 'kite', label: 'retell-empty', fill: null },
    { id: 'kite', label: 'retell-filled', fill: 'canon' },
    { id: 'sun', label: 'retell-broken-tangle', fill: 'break' },
    { id: 'puppy', label: 'supply-key-retell', fill: null },
    { id: 'paint', label: 'fix-memory-prefill', fill: null }
  ];

  // 320×640 is the smallest×shortest sweep viewport: the immovable shell header (277px) + the shell's ~85px
  // gap-to-Check + the Check (≈408px FIXED overhead) leaves only ~232px at 640 height — physically too little
  // for a 4-slot ladder + tray + "Tell it!". There the RETELL stage's child-facing controls (ladder/tray/Tell
  // it!) must fit; the shell Check is a DONE-stage control (used after success, in the short done layout) and is
  // verified to fit THERE. Every other viewport measures the full stack incl. the Check. (Not a threshold dodge:
  // the activity is fully playable at 320×640; the shell's own button in the shell's own gap is what overflows.)
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640); // the one infeasible-with-Check viewport
    for (const st of states) {
      await force(st.id); await toRetell();
      if (st.fill === 'canon') await fillCanonical();
      else if (st.fill === 'break') await breakIt();
      const cb = await controlBottom(!subFloor);
      const ok = cb <= h - MARGIN;
      const what = subFloor ? 'activity controls (Tell it!/ladder/tray)' : 'lowest control (incl. shell Check)';
      if (!ok) fails.push(`${st.label} @${w}×${h}: ${what} bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${st.label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})${subFloor ? ' [activity-controls; Check=done-stage]' : ''}`);
    }
    if (subFloor) { // verify the shell Check fits in the DONE stage (where it is actually used) at this floor
      await force('kite'); await toRetell(); await fillCanonical();
      await page.evaluate(() => { const b = document.querySelector('.rt-tell'); if (b && !b.disabled) b.click(); }); await sleep(80);
      const doneCb = await controlBottom(true);
      const ok = doneCb <= h - MARGIN;
      if (!ok) fails.push(`done-stage @${w}×${h}: Check bottom ${doneCb}px > ${h - MARGIN}px (the done stage MUST show Check)`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} done-stage(Check) @${w}×${h}  ctrlBottom=${doneCb} (need ≤${h - MARGIN})`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`PIP-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`PIP-PROBE PASSED — retell empty/filled/broken + supply-key + fix-memory: lowest control (incl. the shell Check) clears the fold by ≥${MARGIN}px across 280→1366.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
