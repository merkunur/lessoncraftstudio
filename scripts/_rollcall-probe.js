#!/usr/bin/env node
/* =====================================================================
   _rollcall-probe.js — the multi-state control-bottom probe for "Mama's Roll
   Call" (K.CC.B.5). The uncapped visual-qa sweep covers first paint; this drives
   the call / mid-send / sign (glyph channel) / match-set / distract / count-set
   / running-total / scatter / sealed states and MEASURES the lowest control
   INCLUDING the shell `.lcs-activity-check` (the #10 lesson) ≤ vh−4 across all
   sweep widths. Also asserts the duck-halos / Sign / stroke / nav are ≥44px and
   nothing overlaps; the raft-of-10 fits tidy; no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mamas-roll-call.numeral-trace.k-cc-b-5';
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
  const url = `http://127.0.0.1:${PORT}/mamas-roll-call-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MamasRollCallActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'mamas-roll-call.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MamasRollCallActivity.round && document.querySelector('.rc-root'), { timeout: 4000 });
  }
  const sendCore = (n, kind) => page.evaluate((args) => { const t = window.MamasRollCallActivity, C = window.NumeralTraceCore, s = t.cstate; const pool = args.kind ? s.raft.filter(d => d.kind === args.kind) : s.raft; for (let i = 0; i < args.n; i++) C.sendDuck(s, pool[i].id); t.render(); }, { n, kind }).then(() => sleep(20));
  const countCore = (n) => page.evaluate((k) => { const t = window.MamasRollCallActivity, C = window.NumeralTraceCore, s = t.cstate; for (let i = 0; i < Math.min(k, s.brood.length); i++) C.countDuck(s, s.brood[i].id); t.render(); }, n).then(() => sleep(20));
  const signCore = () => page.evaluate(() => { window.NumeralTraceCore.goToSign(window.MamasRollCallActivity.cstate); window.MamasRollCallActivity.render(); }).then(() => sleep(20));
  const winCore = () => page.evaluate(() => { const t = window.MamasRollCallActivity, C = window.NumeralTraceCore, s = t.cstate; if (C.isProductionAct(s.round)) { for (let i = 0; i < s.call.n; i++) C.sendDuck(s, s.raft[i].id); } else { s.brood.forEach(b => C.countDuck(s, b.id)); } C.goToSign(s); const st = C.glyphFor(s.call.n); for (let i = 0; i < st.length; i++) C.attemptStroke(s, i, null); t._commit(); }).then(() => sleep(25));

  const states = {
    'call': async () => { await force('swim-six'); },
    'midsend': async () => { await force('swim-six'); await sendCore(3); },
    'sign': async () => { await force('swim-six'); await sendCore(6); await signCore(); },
    'match': async () => { await force('match-nine'); },
    'distract': async () => { await force('yellow-six'); },
    'countset': async () => { await force('count-brood'); await countCore(3); },
    'running': async () => { await force('they-arrive'); },
    'scatter': async () => { await force('scatter-six'); },
    'done': async () => { await force('none-sleep'); await winCore(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.rc-call,.rc-main,.rc-bench,.rc-mud,.rc-strokes,.rc-nav,.rc-bank,.rc-nextnudge,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const ctrls = Array.from(document.querySelectorAll('.rc-duck,.rc-sign:not(.rc-off),.rc-stroke,.rc-more,.rc-back'));
      let minCtrl = 999; ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width) minCtrl = Math.min(minCtrl, r.width, r.height); });
      const all = Array.from(document.querySelectorAll('.rc-duck,.rc-sign,.rc-stroke,.rc-more,.rc-back,.rc-pad'));
      let overlap = 0;
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i].getBoundingClientRect(), b = all[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minCtrl: ctrls.length ? Math.round(minCtrl) : 999, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.MamasRollCallActivity; return t && t._activityRow && document.querySelector('.rc-root'); }, { timeout: 15000 });

  const order = ['call', 'midsend', 'sign', 'match', 'distract', 'countset', 'running', 'scatter', 'done'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minCtrl < CTRL_MIN && tt.minCtrl !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minCtrl}px (<${CTRL_MIN}px)`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} overlapping controls`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  ctrl=${tt.minCtrl} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`ROLLCALL-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`ROLLCALL-PROBE PASSED — call/midsend/sign/match/distract/countset/running/scatter/done: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; ducks/Sign/stroke/nav ≥${CTRL_MIN}px (off the 320 sub-floor), no overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
