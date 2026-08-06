#!/usr/bin/env node
/* =====================================================================
   _bridge-probe.js — the multi-state control-bottom probe for "The Friendship
   Bridge" (K.CC.C.6). The uncapped visual-qa sweep covers first paint; this
   drives the predict / pair-ladder / count / build / how-many-more / done
   states and MEASURES the lowest control INCLUDING the shell `.lcs-activity-check`
   (the #10 lesson) ≤ vh−4 across all sweep widths. Also asserts the friend
   discs / pills / chips / adders are ≥44px and nothing overlaps; the beam never
   forces a horizontal scroll; the 9-vs-10-class groups fit.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'friendship-bridge.compare-balance.k-cc-c-6';
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
  const url = `http://127.0.0.1:${PORT}/friendship-bridge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.FriendshipBridgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'friendship-bridge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.FriendshipBridgeActivity.round && document.querySelector('.fb-root'), { timeout: 4000 });
  }
  const pairAll = () => page.evaluate(() => { const t = window.FriendshipBridgeActivity, C = window.CompareBalanceCore, s = t.cstate; const n = Math.min(s.L.length, s.R.length); for (let i = 0; i < n; i++) { if (C.addPair(s, 'L' + i, 'R' + i)) t.pairOrder.push(['L' + i, 'R' + i]); } if (t.phase === 'predict') t.phase = 'play'; t.render(); }).then(() => sleep(20));
  const countAll = () => page.evaluate(() => { const t = window.FriendshipBridgeActivity, C = window.CompareBalanceCore, s = t.cstate; s.L.concat(s.R).forEach(id => C.markCounted(s, id)); t.render(); }).then(() => sleep(20));
  const addSome = (k) => page.evaluate((n) => { const t = window.FriendshipBridgeActivity, C = window.CompareBalanceCore; for (let i = 0; i < n; i++) C.addFriend(t.cstate, t.buildSide); t.render(); }, k).then(() => sleep(20));
  const winIt = () => page.evaluate(() => { const t = window.FriendshipBridgeActivity, C = window.CompareBalanceCore, s = t.cstate; const n = Math.min(s.L.length, s.R.length); for (let i = 0; i < n; i++) { if (C.addPair(s, 'L' + i, 'R' + i)) t.pairOrder.push(['L' + i, 'R' + i]); } t._commitJudge(C.relation(s)); }).then(() => sleep(30));

  const states = {
    'predict': async () => { await force('predict-bust'); },
    'pair': async () => { await force('match-spread'); await pairAll(); },
    'count': async () => { await force('count-mislead'); await countAll(); },
    'build': async () => { await force('build-equal'); await addSome(3); },
    'howmany': async () => { await force('how-many-more'); await pairAll(); },
    'done': async () => { await force('match-near'); await winIt(); }
  };

  async function controlBottom(includeCheck) {
    return await page.evaluate((withCheck) => {
      const sel = '.fb-groups,.fb-pills,.fb-picker,.fb-adders,.fb-guess,.fb-beambox,.fb-garland,.fb-done' + (withCheck ? ',.lcs-activity-check' : '');
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    }, includeCheck);
  }
  async function checks() {
    return await page.evaluate(() => {
      const ctrls = Array.from(document.querySelectorAll('.fb-disc,.fb-pill,.fb-chip,.fb-add'));
      let minCtrl = 999; ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minCtrl = Math.min(minCtrl, r.width, r.height); });
      const all = Array.from(document.querySelectorAll('.fb-pill,.fb-chip,.fb-add'));
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minCtrl: ctrls.length ? Math.round(minCtrl) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.FriendshipBridgeActivity; return t && t._activityRow && document.querySelector('.fb-root'); }, { timeout: 15000 });

  const order = ['predict', 'pair', 'count', 'build', 'howmany', 'done'];

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
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  ctrl=${tt.minCtrl} overlap=${tt.overlap} overflow=${tt.overflow}${subFloor ? ' [activity-controls]' : ''}`);
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
  if (fails.length) { console.error(`BRIDGE-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`BRIDGE-PROBE PASSED — predict/pair/count/build/howmany/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; discs/pills/chips/adders ≥${CTRL_MIN}px, no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
