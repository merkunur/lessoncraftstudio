#!/usr/bin/env node
/* =====================================================================
   _shapeforge-probe.js — the multi-state control-bottom probe for "Shape Forge
   / Mim's Glow Workshop" (1.G.A.2). The uncapped visual-qa sweep covers first
   paint; this drives the selected / mid-tiling / near-complete / substitute /
   named / forged states and per the #10 lesson MEASURES the lowest control
   INCLUDING the shell `.lcs-activity-check` <= vh-4 across 320·360·412·768·
   1024·1366. Bakes in the text-containment check (prompt/hint/count) + a
   no-overlap check (palette) + tap >=44px (palette shards / rotate / the SVG
   anchor dots) + no horizontal overflow (the SVG is viewBox-bounded).
   (NOTE: a DIFFERENT game owns `_forge-probe.js` — this is `_shapeforge-`.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'shapeforge.compose.1-g-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
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

const DRIVE = `function(pls){ var a=window.ShapeForgeActivity; pls.forEach(function(pl){ a.selected=pl.pieceId; a.orient=pl.orient; a._placeAt(pl.orient,pl.dr,pl.dc); }); }`;

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const fails = [];
  const url = `http://127.0.0.1:${PORT}/shapeforge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ShapeForgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'shapeforge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ShapeForgeActivity.round && document.querySelector('.sf-svg'), { timeout: 4000 });
    await sleep(40);
  }
  const drive = (pls) => page.evaluate('(' + DRIVE + ')(' + JSON.stringify(pls) + ')').then(() => sleep(20));
  const selp = (pid) => page.evaluate((p) => window.ShapeForgeActivity._select(p), pid).then(() => sleep(20));
  const sol = () => page.evaluate(() => window.ShapeForgeCore.audit(window.ShapeForgeActivity.round).solution);

  const states = {
    'selected': async () => { await force('build-hexagon'); await selp('rhombus'); },
    'mid': async () => { await force('build-hexagon'); const s = await sol(); await drive(s.slice(0, Math.max(1, s.length - 1))); },
    'near': async () => { await force('build-parallelogram'); const s = await sol(); await drive(s.slice(0, s.length - 1)); },
    'substitute': async () => { await force('substitute-tri'); await selp('triangle'); },
    'named': async () => { await force('named-hexagon'); },
    'forged': async () => { await force('onramp-rhombus'); await drive(await sol()); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.sf-shard,.sf-rotate,.sf-forge,.sf-palette,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.sf-shard,.sf-rotate'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      let minAnchor = 999; document.querySelectorAll('.sf-anchor').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minAnchor = Math.min(minAnchor, Math.min(r.width, r.height)); });
      let bleed = 0;
      document.querySelectorAll('.sf-prompt,.sf-hint,.sf-count,.sf-saytext,.sf-donetext').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      const boxes = Array.from(document.querySelectorAll('.sf-shard')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, minAnchor: Math.round(minAnchor), bleed, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.ShapeForgeActivity; return t && t._activityRow && document.querySelector('.sf-root'); }, { timeout: 15000 });

  const order = ['selected', 'mid', 'near', 'substitute', 'named', 'forged'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a palette/rotate control is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.minAnchor < CTRL_MIN && tt.minAnchor !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a placement anchor is ${tt.minAnchor}px (<${CTRL_MIN}px)`);
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} palette pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} anchor=${tt.minAnchor} bleed=${tt.bleed} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`SHAPEFORGE-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`SHAPEFORGE-PROBE PASSED — selected/mid/near/substitute/named/forged: lowest control (incl. shell Check) clears the fold by ≥${MARGIN}px across 280→1366; palette/rotate + the SVG placement anchors ≥${CTRL_MIN}px (off the 320 sub-floor), no prompt/hint glyph overflow, no palette overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
