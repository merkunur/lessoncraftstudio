#!/usr/bin/env node
/* =====================================================================
   _vet-probe.js — the multi-state control-bottom probe for "Vet's Diagnosis
   Window" (1.OA.A.1). The uncapped visual-qa sweep covers first paint; this
   drives the read / partially-bound / fully-bound-keypad / committed-cleared /
   wrong-cloudy / compare-bars / start-unknown states and per the #10 lesson
   MEASURES the lowest control INCLUDING the shell `.lcs-activity-check` AND the
   self-rendered `.vd-diagnose` <= vh-4 across 320·360·412·768·1024·1366. Bakes
   in the Game-32 TEXT-CONTAINMENT check (no story/tile/slot/key/display glyph
   overflows its box) + a NO-OVERLAP check (slots/tiles must not collapse into
   each other) + tap >=44px + no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'vet-diagnosis.word-problems.1-oa-a-1';
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

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const fails = [];
  const url = `http://127.0.0.1:${PORT}/vet-diagnosis-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.VetDiagnosisActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'vet-diagnosis.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.VetDiagnosisActivity.round && document.querySelector('.vd-diagram'), { timeout: 4000 });
    await sleep(40);
  }
  const bindOracle = () => page.evaluate(() => {
    const a = window.VetDiagnosisActivity, au = window.VetDiagnosisCore.audit(a.round);
    a.snap.roles.forEach(role => { const id = au.correct[role]; if (id === '?') a._tapSlot(role); else { a._tapTile(id); a._tapSlot(role); } });
  }).then(() => sleep(20));
  const bindOne = () => page.evaluate(() => {
    const a = window.VetDiagnosisActivity, au = window.VetDiagnosisCore.audit(a.round); const role = a.snap.roles.find(r => au.correct[r] !== '?'); a._tapTile(au.correct[role]); a._tapSlot(role);
  }).then(() => sleep(20));
  const committed = () => page.evaluate(() => { const a = window.VetDiagnosisActivity; const ans = window.VetDiagnosisCore.audit(a.round).answer; a._dial(ans); a._diagnose(); }).then(() => sleep(40));
  const wrong = () => page.evaluate(() => {
    const a = window.VetDiagnosisActivity, tiles = a.snap.tiles.slice().sort((x, y) => y.value - x.value);
    a.binding = { change: '?', result: tiles[0].id, start: tiles[1].id }; a.render(); a._dial(window.VetDiagnosisCore.audit(a.round).answer); a._diagnose();
  }).then(() => sleep(40));

  const states = {
    'read':      async () => { await force('addto-change-acorns'); },
    'partial':   async () => { await force('addto-change-acorns'); await bindOne(); },
    'keypad':    async () => { await force('addto-change-acorns'); await bindOracle(); },
    'committed': async () => { await force('addto-change-acorns'); await bindOracle(); await committed(); },
    'wrong':     async () => { await force('takefrom-change-ducks'); await wrong(); },
    'compare':   async () => { await force('compare-bigger-cats'); await bindOracle(); },
    'start':     async () => { await force('addto-start-eggs'); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.vd-slot,.vd-tile,.vd-key,.vd-diagnose,.vd-replay,.vd-diagram,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.vd-slot,.vd-tile,.vd-key,.vd-diagnose'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height) minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      /* TEXT-CONTAINMENT: no numeral/word overflows its box (in-flow → scrollWidth catches it). */
      let bleed = 0;
      document.querySelectorAll('.vd-storytext,.vd-slot,.vd-tile,.vd-key,.vd-disp,.vd-saytext,.vd-trayhint').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      /* NO-OVERLAP among the placed/selectable slots + tiles */
      const boxes = Array.from(document.querySelectorAll('.vd-slot,.vd-tile')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, bleed, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.VetDiagnosisActivity; return t && t._activityRow && document.querySelector('.vd-root'); }, { timeout: 15000 });

  const order = ['read', 'partial', 'keypad', 'committed', 'wrong', 'compare', 'start'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} slot/tile pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} bleed=${tt.bleed} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`VET-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`VET-PROBE PASSED — read/partial/keypad/committed/wrong/compare/start: lowest control (incl. shell Check + Diagnose) clears the fold by ≥${MARGIN}px across 280→1366; slots/tiles/keys/Diagnose ≥${CTRL_MIN}px (off the 320 sub-floor), no story/tile/slot/key glyph overflows its box, no slot/tile overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
