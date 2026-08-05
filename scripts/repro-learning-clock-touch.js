#!/usr/bin/env node
/* =====================================================================
   repro-learning-clock-touch.js — the touch measurement.

   ⭐ ORIGINALLY STEP 0 OF THE REBUILD, and it did its job. Against the
   SHIPPED build it measured, at 412px with real CDP touch events:

       [shipped]  pointerdown:1  pointermove:2  POINTERCANCEL:1  150 -> 150
       [+ root  ] pointerdown:1  pointermove:12 pointerup:1      150 -> 180

   `touch-action:none` sat on `.lck-hand`, an SVG <g>, where it is not
   honoured. The browser claimed the gesture after two moves and cancelled
   it — and `pointercancel` was wired straight to the release handler, so
   the hand snapped back before it had visibly moved.

   ⭐ IT NOW ANSWERS A DIFFERENT QUESTION: which of the three declarations
   the rebuild ships is actually LOAD-BEARING? The rebuilt tool declares
   `touch-action:none` on the HTML face wrapper, on the <svg> root and on
   the grip buttons, deliberately redundantly. Redundancy is only worth
   its weight if you know what each layer buys, so this runs the same
   finger drag against five builds and prints the table.

   ⚠ IT IS SELF-POISONING: the run FAILS unless the shipped build drags
   AND stripping every rule stops it. A harness that cannot drive anything
   would otherwise report a clean sweep of nothing.

   Run:  node scripts/repro-learning-clock-touch.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SRC = fs.readFileSync(path.join(MINI, 'learning-clock.js'), 'utf8').replace(/\r\n/g, '\n');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const R_FACE = '.lck-face{position:relative;width:100%;aspect-ratio:1;touch-action:none;';
const R_FACE_OFF = '.lck-face{position:relative;width:100%;aspect-ratio:1;';
const R_SVG = '.lck-svg{display:block;width:100%;height:auto;touch-action:none;';
const R_SVG_OFF = '.lck-svg{display:block;width:100%;height:auto;';
const R_GRIP = "'touch-action:none;-webkit-tap-highlight-color:transparent;'";
const R_GRIP_OFF = "'-webkit-tap-highlight-color:transparent;'";
[['face', R_FACE], ['svg', R_SVG], ['grip', R_GRIP]].forEach(function (p) {
  if (SRC.indexOf(p[1]) < 0) { console.error('FATAL: the ' + p[0] + ' anchor moved — this would measure nothing'); process.exit(1); }
});
const cut = (s, a, b) => s.split(a).join(b);
const BUILDS = {
  'as shipped': SRC,
  'no face rule': cut(SRC, R_FACE, R_FACE_OFF),
  'no svg rule': cut(SRC, R_SVG, R_SVG_OFF),
  'no grip rule': cut(SRC, R_GRIP, R_GRIP_OFF),
  'none at all': cut(cut(cut(SRC, R_FACE, R_FACE_OFF), R_SVG, R_SVG_OFF), R_GRIP, R_GRIP_OFF)
};
Object.keys(BUILDS).forEach(function (k) {
  if (k !== 'as shipped' && BUILDS[k] === SRC) { console.error('FATAL: variant "' + k + '" is INERT'); process.exit(1); }
});

let VARIANT = 'as shipped';
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/learning-clock.html';
    if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length); else p = p.replace(/^\//, '');
    if (p === 'learning-clock.js') {
      res.setHeader('Content-Type', 'text/javascript');
      res.end(BUILDS[VARIANT]);
      return;
    }
    fs.readFile(path.join(MINI, p), (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* a HALF-TURN of the minute hand — comfortably past the 30-minute snap.
   ⚠ A first version swept 50 degrees, i.e. 8 minutes, which the default
   granularity rounded straight back to where it started; the tool was
   working and the harness reported it dead. */
async function dragMinute(page, cdp) {
  const g = await page.evaluate(() => {
    const r = document.querySelector('.lck-svg').getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: r.width / 1000 };
  });
  const at = deg => {
    const a = deg * Math.PI / 180, r = 418 * g.s;
    return { x: g.cx + Math.sin(a) * r, y: g.cy - Math.cos(a) * r };
  };
  const before = await page.evaluate(() => LearningClock.total);
  await page.evaluate(() => { window.__pe = []; });
  const p0 = at(180);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p0.x, y: p0.y, radiusX: 12, radiusY: 12, force: 1 }] });
  await sleep(30);
  for (let i = 1; i <= 12; i++) {
    const p = at(180 + i * 15);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: p.x, y: p.y, radiusX: 12, radiusY: 12, force: 1 }] });
    await sleep(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(160);
  const after = await page.evaluate(() => LearningClock.total);
  const pe = await page.evaluate(() => window.__pe.slice());
  return { before, after, moved: after !== before, pe };
}

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const URL = `http://127.0.0.1:${PORT}/mini-tools/learning-clock.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const results = {};

  for (const v of Object.keys(BUILDS)) {
    VARIANT = v;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 915, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
    await page.evaluateOnNewDocument(() => {
      window.__pe = [];
      ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'].forEach(function (t) {
        document.addEventListener(t, function (e) { window.__pe.push(t + ':' + e.pointerType); }, true);
      });
      if (window.speechSynthesis) window.speechSynthesis.speak = function () {};
    });
    const cdp = await page.target().createCDPSession();
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.lck-svg');
    await sleep(280);
    results[v] = await dragMinute(page, cdp);
    await page.close();
  }

  await browser.close();
  server.close();

  console.log('');
  console.log('=========== WHICH touch-action DECLARATION IS LOAD-BEARING ===========');
  Object.keys(results).forEach(k => {
    const r = results[k];
    const kinds = {};
    (r.pe || []).forEach(x => { kinds[x] = (kinds[x] || 0) + 1; });
    console.log('  ' + k.padEnd(14) + ' moved=' + (r.moved ? 'YES' : 'NO ') +
      '  ' + String(r.before) + ' -> ' + String(r.after) + '   ' + JSON.stringify(kinds));
  });

  const fails = [];
  if (!results['as shipped'].moved) fails.push('the SHIPPED build does not drag — nothing else here means anything');
  if (results['none at all'].moved) fails.push('stripping EVERY touch-action rule still drags — the poison is inert');
  console.log('');
  if (fails.length) { fails.forEach(f => console.log('  x ' + f)); console.log('FAIL'); process.exit(1); }
  console.log('PASS — the shipped build drags on a real touchscreen, and removing every');
  console.log('       touch-action rule breaks it, so the measurement above is real.');
})().catch(e => { console.error(e); process.exit(1); });
