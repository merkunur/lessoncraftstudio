#!/usr/bin/env node
/* =====================================================================
   _pantry-probe.js — the multi-state control-bottom probe for "Bo's Berry
   Pantry" (1.NBT.B.2). The uncapped visual-qa sweep covers first paint; this
   drives the read / locked / launched-fed-correct / value-compare / decade /
   unitize-worst-width / numeral / encode-hoard / wrong-revert states and per the
   #10 lesson MEASURES the lowest control INCLUDING the shell `.lcs-activity-check`
   ≤ vh−4 across all sweep widths. Also asserts shelves ≥44px + the sling ≥56px,
   nothing overlaps, no horizontal overflow. Reduced-motion is forced so the
   launch resolves synchronously.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'bos-berry-pantry.slingshot-tens.1-nbt-b-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44, SLING_MIN = 56;

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
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const fails = [];
  const url = `http://127.0.0.1:${PORT}/bos-berry-pantry-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.BosBerryPantryActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'bos-berry-pantry.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.BosBerryPantryActivity.round && document.querySelector('.bp-root'), { timeout: 4000 });
  }
  const lockCorrect = () => page.evaluate(() => { const t = window.BosBerryPantryActivity; t._lockShelf(window.SlingshotTensCore.correctKey(t.round)); }).then(() => sleep(15));
  const lockWrong = () => page.evaluate(() => { const t = window.BosBerryPantryActivity, ck = window.SlingshotTensCore.correctKey(t.round); t._lockShelf(ck === 0 ? 1 : 0); }).then(() => sleep(15));
  const fire = () => page.evaluate(() => window.BosBerryPantryActivity._launch()).then(() => sleep(30));

  const states = {
    'read': async () => { await force('pack-thirty-four'); },
    'locked': async () => { await force('pack-thirty-four'); await lockCorrect(); },
    'fedcorrect': async () => { await force('pack-thirty-four'); await lockCorrect(); await fire(); },
    'compare': async () => { await force('which-is-more'); },
    'decade': async () => { await force('seventy-no-loose'); },
    'unitize': async () => { await force('bundle-twenty-five'); },   // the 1-crate-15-loose trap = worst-case width
    'numeral': async () => { await force('send-sixty-three'); },
    'encode': async () => { await force('name-the-hoard'); },
    'wrong': async () => { await force('pack-thirty-four'); await lockWrong(); await fire(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.bp-prompt,.bp-shelves,.bp-slingbar,.bp-pantry,.bp-wholecap,.bp-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.bp-shelf'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minTap = Math.min(minTap, r.width, r.height); });
      const sling = document.querySelector('.bp-sling'); const sh = sling ? Math.round(sling.getBoundingClientRect().height) : 999;
      const all = Array.from(document.querySelectorAll('.bp-shelf,.bp-sling'));
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, sling: sh, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.BosBerryPantryActivity; return t && t._activityRow && document.querySelector('.bp-root'); }, { timeout: 15000 });

  const order = ['read', 'locked', 'fedcorrect', 'compare', 'decade', 'unitize', 'numeral', 'encode', 'wrong'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a shelf is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.sling < SLING_MIN && tt.sling !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: the sling is ${tt.sling}px (<${SLING_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} sling=${tt.sling} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`PANTRY-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`PANTRY-PROBE PASSED — read/locked/fedcorrect/compare/decade/unitize/numeral/encode/wrong: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; shelves ≥${CTRL_MIN}px + sling ≥${SLING_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
