#!/usr/bin/env node
/* =====================================================================
   _tildy-drag-probe.js — the REAL pointer-drag proof for "Tildy's Tailor
   Shop" (2.MD.A.1). The other gates (verify-tildy-core / local-test /
   _tildy-probe / visual-qa) drive the ruler by calling _setRulerZero()
   DIRECTLY — none exercises the actual drag gesture, which is exactly why
   "can't slide the ruler" shipped. This dispatches a genuine mouse/pointer
   drag on the ruler <g> and asserts rulerZero TRACKS across many moves —
   crucially across a VERTICAL DRIFT off the thin ruler band, which only
   succeeds if pointer capture survives (i.e. the activity does NOT full-
   re-render mid-drag, detaching the captured element). A buggy full-render-
   per-move build loses capture and FAILS the drift step.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'tildy.measure-ruler.2-md-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

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
  const url = `http://127.0.0.1:${PORT}/tildy-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.TildyActivity; return t && t._activityRow && document.querySelector('.td-root'); }, { timeout: 15000 });

  // force the on-ramp align round (initialZero=3, rulerLen=12, strip 0..7)
  await page.evaluate(() => {
    const t = window.TildyActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
    const k = t._pool.findIndex(x => x.id === 'tildy.align-ribbon-7');
    const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
    t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
  });
  await page.waitForFunction(() => window.TildyActivity.round && document.querySelector('.td-ruler.td-grab'), { timeout: 4000 });
  await sleep(60);

  const z = () => page.evaluate(() => window.TildyActivity.rulerZero);
  const rulerBox = () => page.evaluate(() => { const g = document.querySelector('.td-ruler'); const r = g.getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, top: r.top, bottom: r.bottom, left: r.left, right: r.right }; });

  const z0 = await z();
  if (z0 !== 3) fails.push(`initial rulerZero expected 3 (initialZero), got ${z0}`);

  // --- the drag: grab the ruler, slide LEFT toward cm 0, drifting the cursor
  //     vertically OFF the band partway (the capture-survival discriminator) ---
  const box = await rulerBox();
  await page.mouse.move(box.cx, box.cy);
  await page.mouse.down();
  await sleep(10);

  const track = [];                                  // rulerZero after each move
  const totalDx = box.cx - box.left + 4;             // enough leftward travel to reach 0 and clamp
  const STEPS = 8;
  for (let i = 1; i <= STEPS; i++) {
    const x = box.cx - (totalDx * i) / STEPS;
    // drift the cursor 70px ABOVE the ruler band on the middle steps — off the <g> entirely
    const y = (i >= 3 && i <= 5) ? box.top - 70 : box.cy;
    await page.mouse.move(x, y);
    await sleep(14);
    track.push(await z());
  }
  await page.mouse.up();
  await sleep(40);
  const zEnd = await z();

  // 1) it actually moved off the start
  if (track[0] === z0 && track[track.length - 1] === z0) fails.push(`ruler never moved (stayed at ${z0} across all ${STEPS} moves) — "can't slide"`);
  // 2) it TRACKED across multiple moves (≥3 distinct positions) — not stuck after the first tick
  const distinct = new Set(track).size;
  if (distinct < 3) fails.push(`ruler tracked only ${distinct} distinct position(s) across ${STEPS} moves ${JSON.stringify(track)} — capture lost mid-drag (full-render-per-move bug)`);
  // 3) the VERTICAL-DRIFT steps (i=3..5, cursor 70px off the band) still updated rulerZero —
  //    proves pointer capture held (the buggy build stops here)
  const driftMoved = track[2] !== track[1] || track[3] !== track[2] || track[4] !== track[3];
  if (!driftMoved) fails.push(`ruler stopped tracking when the cursor drifted off the band (steps 3-5: ${track.slice(1, 5)}) — pointer capture was lost (re-render mid-drag)`);
  // 4) it reached + clamped at the start (0) and stayed after release
  if (zEnd !== 0) fails.push(`after dragging fully left, rulerZero=${zEnd}, expected 0 (clamped to strip start)`);

  // --- clamp test: drag far RIGHT past the table edge → clamps at TABLE-rulerLen (14-12=2) ---
  await page.evaluate(() => window.TildyActivity.render());
  await sleep(30);
  const box2 = await rulerBox();
  await page.mouse.move(box2.cx, box2.cy); await page.mouse.down(); await sleep(10);
  for (let i = 1; i <= 6; i++) { await page.mouse.move(box2.cx + 60 * i, box2.cy); await sleep(12); }
  await page.mouse.up(); await sleep(30);
  const zRight = await z();
  if (zRight !== 2) fails.push(`dragging far right gave rulerZero=${zRight}, expected clamp at 2 (TABLE 14 − rulerLen 12)`);

  console.log(`initial=${z0}  track=${JSON.stringify(track)} (distinct=${distinct})  end=${zEnd}  rightClamp=${zRight}`);
  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`TILDY-DRAG-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('TILDY-DRAG-PROBE PASSED — a REAL mouse/pointer drag slides the ruler: it tracks across ≥3 positions, KEEPS tracking when the cursor drifts off the ruler band (pointer capture survives → no full re-render mid-drag), reaches + clamps at the strip start (0), and clamps at the right table edge (2).');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
