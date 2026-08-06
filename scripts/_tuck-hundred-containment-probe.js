#!/usr/bin/env node
/* =====================================================================
   _tuck-hundred-containment-probe.js — the IN-COLUMN CONTAINMENT proof for
   the hundreds column of the place-value-regroup activities (2.NBT.B.7).
   The operator saw the hundred-flats spill OUTSIDE the column box when
   hundreds > 3. The fold/page-overflow gates (_tuck-hundred-probe,
   visual-qa) never caught it because the flats spilled their own COLUMN box
   without exceeding the page width. This asserts every .pvr-flat's bounding
   box is contained within its .pvr-col-hundreds box across all viewports —
   at the worst cases (compose-hundred → 5 flats post-bundle; pre-bundle 4;
   the subtract-3place 4-flat states). FAILS on the buggy nowrap build.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const ADD = 'place-value-regroup.add-compose-hundred.2-nbt-b-7';
const SUBTEN = 'place-value-regroup.subtract-decompose.2-nbt-b-7';
const TOL = 1.0;   // px tolerance

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
  // measure: for every flat, is it inside the hundreds column content box?
  async function containment() {
    return await page.evaluate((tol) => {
      const col = document.querySelector('.pvr-col-hundreds');
      if (!col) return { flats: 0, spills: [] };
      const cs = getComputedStyle(col);
      const bl = parseFloat(cs.borderLeftWidth) || 0, br = parseFloat(cs.borderRightWidth) || 0;
      const cr = col.getBoundingClientRect();
      const inL = cr.left + bl, inR = cr.right - br;   // content+padding box (inside the border)
      const flats = Array.from(col.querySelectorAll('.pvr-flat'));
      const spills = [];
      flats.forEach((f, i) => {
        const r = f.getBoundingClientRect();
        if (r.left < inL - tol || r.right > inR + tol) spills.push({ i, fl: Math.round(r.left), fr: Math.round(r.right), cl: Math.round(inL), cr: Math.round(inR) });
      });
      return { flats: flats.length, spills };
    }, TOL);
  }

  // case = { activity, round, presses, label, expectFlats }
  const cases = [
    { activity: ADD, round: 'r-450-60', presses: 0, label: 'compose-hundred PRE-bundle (4 flats)', expect: 4 },
    { activity: ADD, round: 'r-450-60', presses: 1, label: 'compose-hundred POST-bundle (5 flats)', expect: 5 },
    { activity: ADD, round: 'r-410-90', presses: 1, label: 'compose-hundred POST-bundle (5 flats, alt)', expect: 5 },
    { activity: SUBTEN, round: 'r-451-8', presses: 0, label: 'subtract-decompose-ten (4 flats)', expect: 4 }
  ];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    for (const c of cases) {
      await load(c.activity); await force(c.round);
      for (let p = 0; p < c.presses; p++) await press();
      const r = await containment();
      const ok = r.spills.length === 0 && r.flats >= c.expect;
      if (r.flats < c.expect) fails.push(`${c.label} @${w}×${h}: expected ≥${c.expect} flats, saw ${r.flats}`);
      if (r.spills.length) fails.push(`${c.label} @${w}×${h}: ${r.spills.length}/${r.flats} flat(s) spill the column box e.g. ${JSON.stringify(r.spills[0])}`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${c.label} @${w}×${h}  flats=${r.flats} spills=${r.spills.length}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TUCK-HUNDRED-CONTAINMENT FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('TUCK-HUNDRED-CONTAINMENT PASSED — every hundred-flat (4 pre-bundle, 5 post-bundle, and the subtract 4-flat state) stays INSIDE its .pvr-col-hundreds box across 320→1366; no flat spills the container.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
