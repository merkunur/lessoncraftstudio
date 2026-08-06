#!/usr/bin/env node
/* =====================================================================
   _tuck-hundred-probe.js — control-bottom + functional probe for the two
   HUNDRED-level place-value-regroup activities (2.NBT.B.7):
     A "Tuck Makes a Hundred"  (add, compose a hundred)
     B "Tuck Breaks a Hundred" (subtract, decompose a hundred = double borrow)
   Asserts the regroup is load-bearing + the cascade resolves, and MEASURES the
   lowest control (incl. keypad + Check) on the BUSY interactive state of each
   (A: pre-make-hundred 11 tens; B: post-cascade 9 tens + 12 ones) across
   320·360·412·768·1024·1366. cb ≤ viewport. (Post-success display balloon is
   shell-inherent — asserted functionally, not fold-checked.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 0;
const ADD = 'place-value-regroup.add-compose-hundred.2-nbt-b-7';
const SUB = 'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7';

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

  async function load(activity) {
    await page.goto(`http://127.0.0.1:${PORT}/place-value-regroup-activity.html?lang=en&activity=${activity}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PlaceValueRegroupActivity; return t && t._activityRow && document.querySelector('.pvr-root'); }, { timeout: 15000 });
  }
  async function force(rid) {
    await page.evaluate((id) => {
      const t = window.PlaceValueRegroupActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id.indexOf(id) >= 0);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, rid);
    await page.waitForFunction(() => window.PlaceValueRegroupActivity.a && document.querySelector('.pvr-root'), { timeout: 4000 });
    await sleep(60);
  }
  const press = () => page.evaluate(() => { const b = document.querySelector('.pvr-maketen'); if (b) b.click(); }).then(() => sleep(60));
  const hasBtn = () => page.evaluate(() => !!document.querySelector('.pvr-maketen'));
  const typeNum = (n) => page.evaluate((v) => { const keys = Array.from(document.querySelectorAll('.lcs-activity-key')); String(v).split('').forEach(ch => { const k = keys.find(x => x.textContent === ch); if (k) k.click(); }); }, n).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(50));
  const RO = () => page.evaluate(() => window.PlaceValueRegroupActivity.readOnly);
  const target = () => page.evaluate(() => { const t = window.PlaceValueRegroupActivity; return t.operation === 'subtract' ? t.a - t.b : t.a + t.b; });
  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.pvr-root,.pvr-mat,.pvr-col,.pvr-bar,.pvr-maketen,.lcs-activity-answer,.lcs-activity-keypad,.lcs-activity-check,.lcs-activity-next';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  const overflow = () => page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return Math.round(d.scrollWidth - d.clientWidth); });

  await page.setViewport({ width: 412, height: 820 });

  /* ---- A: make-a-hundred functional ---- */
  await load(ADD);
  await force('r-340-70'); await typeNum(await target()); await check();
  if (await RO()) fails.push('A: typing the total WITHOUT making a hundred resolved — regroup not required');
  await force('r-340-70'); const tBefore = await page.evaluate(() => window.PlaceValueRegroupActivity.tensCount);
  await press(); const tAfter = await page.evaluate(() => window.PlaceValueRegroupActivity.tensCount);
  if (!(tBefore >= 10 && tAfter === tBefore - 10)) fails.push(`A: make-a-hundred did not drop tens by 10 (${tBefore}→${tAfter})`);
  await typeNum(await target()); await check();
  if (!(await RO())) fails.push('A: make-a-hundred + correct total did NOT resolve');

  /* ---- B: break-a-hundred THEN break-a-ten functional ---- */
  await load(SUB);
  await force('r-302-5'); await typeNum(await target()); await check();
  if (await RO()) fails.push('B: typing the difference with NO breaks resolved — cascade not required');
  await force('r-302-5'); await press();   // break a hundred (tens 0→10)
  if (await page.evaluate(() => window.PlaceValueRegroupActivity._decomposed)) fails.push('B: marked decomposed after only breaking a hundred');
  await typeNum(await target()); await check();
  if (await RO()) fails.push('B: resolved after only breaking a hundred (still needs a ten)');
  await force('r-302-5'); await press(); await press();   // break hundred, then break ten
  if (await page.evaluate(() => document.querySelectorAll('.pvr-cube.is-take').length) < 1) fails.push('B: no "take away" ones marked after the cascade');
  await typeNum(await target()); await check();
  if (!(await RO())) fails.push('B: full cascade + correct difference did NOT resolve');

  /* ---- FITS on the BUSY interactive state of each ---- */
  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    // A busy = pre-make-hundred (11 tens shown)
    await load(ADD); await force('r-340-70');
    let cb = await controlBottom(), ov = await overflow();
    if (cb > h - MARGIN) fails.push(`A pre-make-hundred @${w}×${h}: control ${cb} > ${h - MARGIN}`);
    if (ov > 2) fails.push(`A @${w}×${h}: overflow ${ov}`);
    console.log(`  ${cb <= h - MARGIN && ov <= 2 ? 'ok  ' : 'FAIL'} A-busy @${w}×${h}  cb=${cb} ov=${ov}`);
    // B busy = post-cascade (9 tens + 12 ones)
    await load(SUB); await force('r-302-5'); await press(); await press();
    cb = await controlBottom(); ov = await overflow();
    if (cb > h - MARGIN) fails.push(`B post-cascade @${w}×${h}: control ${cb} > ${h - MARGIN}`);
    if (ov > 2) fails.push(`B @${w}×${h}: overflow ${ov}`);
    console.log(`  ${cb <= h - MARGIN && ov <= 2 ? 'ok  ' : 'FAIL'} B-busy @${w}×${h}  cb=${cb} ov=${ov}`);
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TUCK-HUNDRED-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('TUCK-HUNDRED-PROBE PASSED — A: make-a-hundred required + drops tens by 10 + resolves; B: break-a-hundred THEN break-a-ten required (one break is not enough) + take-marks + resolves; both BUSY interactive states fit the fold across 320→1366 with no overflow.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
