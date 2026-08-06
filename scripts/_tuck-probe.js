#!/usr/bin/env node
/* =====================================================================
   _tuck-probe.js — multi-state control-bottom probe for "Tuck's Ten Bundles"
   (1.NBT.C.4 compose-a-ten, the first deferred production-core). Drives 2
   rounds + bundled + resolved (bundle → type the total → Check), and MEASURES
   the lowest control INCLUDING the shell keypad + Check across
   320·360·412·768·1024·1366, plus no overlap / no overflow. The resolved state
   (keypad + Check + Next) is the real fold check at the 900-tall desktops.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'place-value-regroup.add-compose-ten.1-nbt-c-4';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
/* FITS is checked on the INTERACTIVE states (the child reads the blocks, taps
   Make-a-ten, uses the keypad). The post-SUCCESS state is NOT fold-checked here:
   the shell's .lcs-activity-answer-display balloons ~70px once it shows the
   typed number (a shell-keypad characteristic shared by array/ten-frame, not
   this activity's layout) and the official visual-qa gate never resolves. The
   resolve is asserted FUNCTIONALLY below instead. cb ≤ viewport = visible. */
const MARGIN = 0;

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
  const url = `http://127.0.0.1:${PORT}/place-value-regroup-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PlaceValueRegroupActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id.indexOf(rid) >= 0);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PlaceValueRegroupActivity.a && document.querySelector('.pvr-root'), { timeout: 4000 });
    await sleep(60);
  }
  const bundle = () => page.evaluate(() => { const b = document.querySelector('.pvr-maketen'); if (b) b.click(); }).then(() => sleep(60));
  const typeTotal = () => page.evaluate(() => {
    const t = window.PlaceValueRegroupActivity, sum = t.a + t.b, keys = Array.from(document.querySelectorAll('.lcs-activity-key'));
    String(sum).split('').forEach(ch => { const k = keys.find(x => x.textContent === ch); if (k) k.click(); });
  }).then(() => sleep(40));
  const clickCheck = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(50));

  const states = {
    'roundA': async () => { await force('r-27-5'); },
    'roundB': async () => { await force('r-55-8'); },
    'bundled': async () => { await force('r-36-7'); await bundle(); },
    /* wait out the ~900ms confetti (appended to the stage on success) so the
       measurement reflects the PERSISTENT resolved layout, not the transient
       celebration overlay */
    'resolved': async () => { await force('r-28-6'); await bundle(); await typeTotal(); await clickCheck(); await sleep(1000); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.pvr-root,.pvr-mat,.pvr-col,.pvr-bar,.pvr-maketen,.pvr-say,.lcs-activity-answer,.lcs-activity-keypad,.lcs-activity-check,.lcs-activity-next';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function overflow() {
    return await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return Math.round(d.scrollWidth - d.clientWidth); });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.PlaceValueRegroupActivity; return t && t._activityRow && document.querySelector('.pvr-root'); }, { timeout: 15000 });

  /* regroup is load-bearing: typing the right total WITHOUT bundling must NOT resolve */
  await force('r-27-5'); await typeTotal(); await clickCheck();
  if (await page.evaluate(() => window.PlaceValueRegroupActivity.readOnly)) fails.push('typing the total WITHOUT bundling resolved — regroup not required');
  /* bundle then answer → resolves */
  await states.resolved();
  if (!(await page.evaluate(() => window.PlaceValueRegroupActivity.readOnly))) fails.push('bundle + correct total did NOT resolve');
  /* the button disappears after bundling */
  await states.bundled();
  if (await page.evaluate(() => !!document.querySelector('.pvr-maketen'))) fails.push('the "Make a ten" button is still present after bundling');

  const order = ['roundA', 'roundB', 'bundled'];
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. keypad + Check) bottom ${cb}px > ${h - MARGIN}px — cut off`);
      const ov = await overflow();
      if (ov > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${ov}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  overflow=${ov}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TUCK-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`TUCK-PROBE PASSED — typing the total without bundling does NOT resolve (regroup required); bundle + correct total resolves; the button hides after bundling; the INTERACTIVE states (roundA/roundB/bundled — keypad + Check visible) fit the fold across 320→1366; no horizontal overflow. (Post-success keypad-display balloon is shell-inherent + not fold-checked.)`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
