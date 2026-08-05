#!/usr/bin/env node
/* =====================================================================
   local-test-learning-clock.js — the local definition of done.

   ⭐⭐ THE VERSION THIS REPLACES COULD NOT SEE THE REPORTED DEFECT. It
   drove `page.mouse` and nothing else — and `touch-action` is irrelevant
   to a mouse — so its header claim, "ONE real pointer drag moves the
   hands", was true of the only input it tested while the tool was
   unusable on a touchscreen. Its tap sweep also selected
   `.lck-chip,.lck-big,.lck-speak,.lck-why,.lck-sky` and NOT `.lck-hand`,
   so the two most important controls in the tool had never been measured
   against any floor. Both are fixed here, and section B is POISONED: the
   same drag must FAIL on a build with the root rule stripped.

     A  viewport sweep — no overflow, no collisions, both tap floors
     B  TOUCH — a real finger drag moves the hands (poisoned)
     C  five input paths: pen · mouse · click · keyboard · fat contact
     D  the gesture survives leaving the dial; one snap, one utterance
     E  no leaked window listeners across 20 renders
     F  gearing invariants through the real engine
     G  the bubble equals sayTime at 20 snapped times
     H  speakDrag, BOTH states (it used to be a dead toggle)
     I  practice — the neutral pose, the diagnosis
     J  elapsed — 30 minutes across 12, and 90 != 30
     K  accessibility — the AX TREE, not a DOM query
     L  free-tier gates
     M  the print sheet is absent unless entitled
     N  console clean

   Run:  node scripts/local-test-learning-clock.js
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
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const TAP_CONTROL = 44;
const TAP_CANVAS = 34;   /* named SEPARATELY from the control floor, never or-shaped */

/* ⚠ THE POISON STRIPS ALL THREE DECLARATIONS, because MEASUREMENT says
   any ONE of them is sufficient. repro-learning-clock-touch.js drives the
   same finger drag against five builds:
       as shipped / no face rule / no svg rule / no grip rule  -> all MOVE
       none at all                                             -> DOES NOT
   So the redundancy is real defence-in-depth rather than belt-and-braces
   decoration, and a poison that removed only the <svg> rule would be
   INERT — which is exactly what a first version did. */
const RULES = [
  ['.lck-face{position:relative;width:100%;aspect-ratio:1;touch-action:none;', '.lck-face{position:relative;width:100%;aspect-ratio:1;'],
  ['.lck-svg{display:block;width:100%;height:auto;touch-action:none;', '.lck-svg{display:block;width:100%;height:auto;'],
  ["'touch-action:none;-webkit-tap-highlight-color:transparent;'", "'-webkit-tap-highlight-color:transparent;'"]
];
let POISON = SRC;
RULES.forEach(r => {
  if (SRC.indexOf(r[0]) < 0) { console.error('FATAL: a touch anchor moved — section B would measure nothing'); process.exit(1); }
  POISON = POISON.split(r[0]).join(r[1]);
});
if (POISON === SRC) { console.error('FATAL: the poison is inert'); process.exit(1); }
let VARIANT = 'live';

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/learning-clock.html';
    if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length); else p = p.replace(/^\//, '');
    if (p === 'learning-clock.js') {
      res.setHeader('Content-Type', 'text/javascript');
      res.end(VARIANT === 'poison' ? POISON : SRC);
      return;
    }
    fs.readFile(path.join(MINI, p), (e, b) => {
      if (e) { res.statusCode = 404; res.end('nf'); return; }
      res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

const fails = [];
let n = 0;
function FAIL(m) { fails.push(m); console.log('  x FAIL ' + m); }
function OK(m) { n++; console.log('  . ' + m); }
function is(c, m) { if (c) OK(m); else FAIL(m); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function open(browser, opts) {
  opts = opts || {};
  const page = await browser.newPage();
  await page.setViewport({ width: opts.w || 1024, height: opts.h || 1500, hasTouch: true, deviceScaleFactor: 1 });
  const errs = [];
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    window.__pe = [];
    if (window.speechSynthesis) {
      window.speechSynthesis.speak = u => window.__spoken.push({ text: u.text, lang: u.lang });
      window.speechSynthesis.getVoices = () => [{ lang: 'en-US' }, { lang: 'de-DE' }];
    }
    ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'].forEach(t =>
      document.addEventListener(t, e => window.__pe.push(t + ':' + e.pointerType), true));
  });
  await page.goto(opts.url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.lck-svg');
  if (opts.paid) await page.evaluate(() => { const T = window.LearningClock; T.premium = true; T.premiumKnown = true; T.render(); });
  await sleep(300);
  page.__errs = errs;
  return page;
}

function dialGeo(page) {
  return page.evaluate(() => {
    const r = document.querySelector('.lck-svg').getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: r.width / 1000 };
  });
}
async function touchDrag(page, cdp, fromDeg, toDeg, radiusUnits) {
  const g = await dialGeo(page);
  const pt = deg => {
    const a = deg * Math.PI / 180, r = radiusUnits * g.s;
    return { x: g.cx + Math.sin(a) * r, y: g.cy - Math.cos(a) * r };
  };
  const p0 = pt(fromDeg);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p0.x, y: p0.y, radiusX: 12, radiusY: 12, force: 1 }] });
  await sleep(24);
  for (let i = 1; i <= 14; i++) {
    const p = pt(fromDeg + (toDeg - fromDeg) * i / 14);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: p.x, y: p.y, radiusX: 12, radiusY: 12, force: 1 }] });
    await sleep(14);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(150);
}

(async () => {
  const srv = serve();
  await new Promise(r => srv.listen(0, r));
  const PORT = srv.address().port;
  const URL = `http://127.0.0.1:${PORT}/mini-tools/learning-clock.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ================= A ============================================= */
  console.log('\n[A] viewport sweep');
  for (const w of WIDTHS) {
    const page = await open(browser, { url: URL, w, h: 2000, paid: true });
    const m = await page.evaluate((TC, TV) => {
      const card = document.querySelector('.lcs-app').getBoundingClientRect();
      const out = { over: [], smallC: [], smallV: [], collide: [], grips: 0 };
      document.querySelectorAll('.lck-wrap [class^="lck-"]').forEach(el => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        if (r.right > card.right + 1) out.over.push(String(el.className).split(' ')[0] + ':+' + Math.round(r.right - card.right));
      });
      document.querySelectorAll('.lck-mode,.lck-chip,.lck-big,.lck-speak,.lck-why,.lck-half,.lck-step,.lck-devariant').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width && Math.min(r.width, r.height) < TC) out.smallC.push((el.getAttribute('data-fk') || 'x') + ':' + Math.round(Math.min(r.width, r.height)));
      });
      document.querySelectorAll('.lck-grip').forEach(el => {
        const r = el.getBoundingClientRect();
        out.grips++;
        if (r.width && Math.min(r.width, r.height) < TV) out.smallV.push(el.getAttribute('data-fk') + ':' + Math.round(Math.min(r.width, r.height)));
      });
      const boxes = [...document.querySelectorAll('.lck-modes,.lck-facecol,.lck-rail,.lck-hint,.lck-dock,.lck-prompt')]
        .map(e => ({ k: String(e.className).split(' ')[0], r: e.getBoundingClientRect() })).filter(b => b.r.width);
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i].r, b = boxes[j].r;
        if (a.left < b.right - 2 && b.left < a.right - 2 && a.top < b.bottom - 2 && b.top < a.bottom - 2)
          out.collide.push(boxes[i].k + ' x ' + boxes[j].k);
      }
      return out;
    }, TAP_CONTROL, TAP_CANVAS);
    is(m.grips === 2, `${w}: both grips exist (non-vacuity for the floor below)`);
    is(m.over.length === 0, `${w}: nothing escapes the card${m.over.length ? ' - ' + m.over.join(', ') : ''}`);
    is(m.smallC.length === 0, `${w}: every control >= ${TAP_CONTROL}px${m.smallC.length ? ' - ' + m.smallC.join(', ') : ''}`);
    is(m.smallV.length === 0, `${w}: every dial grip >= ${TAP_CANVAS}px${m.smallV.length ? ' - ' + m.smallV.join(', ') : ''}`);
    is(m.collide.length === 0, `${w}: no two regions overlap${m.collide.length ? ' - ' + m.collide.join(', ') : ''}`);
    await page.close();
  }

  /* ================= B ============================================= */
  console.log('\n[B] touch - the reported defect, and its poison');
  for (const variant of ['live', 'poison']) {
    VARIANT = variant;
    const page = await open(browser, { url: URL, w: 412, h: 1500 });
    const cdp = await page.target().createCDPSession();
    const before = await page.evaluate(() => LearningClock.total);
    await touchDrag(page, cdp, 180, 270, 418);
    const after = await page.evaluate(() => LearningClock.total);
    const pe = await page.evaluate(() => window.__pe.slice());
    const cancelled = pe.some(x => x.indexOf('pointercancel') === 0);
    if (variant === 'live') {
      is(after !== before, `a real finger drag MOVES the minute hand (${before} -> ${after})`);
      is(!cancelled, 'the browser never cancels the gesture');
      is(pe.filter(x => x === 'pointermove:touch').length >= 8, 'every touch move reaches the tool');
    } else {
      is(after === before, 'POISON: with every touch-action rule stripped the hand does NOT move');
      is(cancelled, 'POISON: the browser claims the gesture and fires pointercancel');
    }
    await page.close();
  }
  VARIANT = 'live';

  /* ================= C ============================================= */
  console.log('\n[C] input paths');
  {
    const page = await open(browser, { url: URL, w: 1024 });
    const cdp = await page.target().createCDPSession();
    const g = await dialGeo(page);
    const at = (deg, r) => ({ x: g.cx + Math.sin(deg * Math.PI / 180) * r * g.s, y: g.cy - Math.cos(deg * Math.PI / 180) * r * g.s });
    let b0 = await page.evaluate(() => LearningClock.total);
    /* ⚠ SWEEP PAST THE SNAP. A first version swept 70 degrees = 12 minutes,
       which the default 30-minute granularity rounded straight back to the
       start — the tool was working and this reported it dead. */
    const pen = at(180, 418), pen2 = at(330, 418);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pen.x, y: pen.y, button: 'left', clickCount: 1, pointerType: 'pen' });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pen2.x, y: pen2.y, button: 'left', buttons: 1, pointerType: 'pen' });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pen2.x, y: pen2.y, button: 'left', clickCount: 1, pointerType: 'pen' });
    await sleep(180);
    let b1 = await page.evaluate(() => LearningClock.total);
    const sawPen = await page.evaluate(() => window.__pe.some(x => x.indexOf(':pen') > 0));
    is(b1 !== b0, `a PEN drag moves the hand (${b0} -> ${b1})`);
    is(sawPen, 'the handler actually observed pointerType "pen"');

    b0 = b1;
    const m1 = at(0, 418), m2 = at(120, 418);
    await page.mouse.move(m1.x, m1.y); await page.mouse.down();
    await page.mouse.move(m2.x, m2.y, { steps: 10 }); await page.mouse.up();
    await sleep(180);
    b1 = await page.evaluate(() => LearningClock.total);
    is(b1 !== b0, `a MOUSE drag moves the hand (${b0} -> ${b1})`);
    console.log('  · a trackpad IS a mouse to the DOM - not separately emulated, and saying so beats pretending');

    /* ⚠ A DRAG SUPPRESSES THE CLICK IT ENDS WITH, for 400ms, or every
       release would also speak. Wait past that window or this measures
       the suppression rather than the click. */
    await sleep(450);
    const sp0 = await page.evaluate(() => window.__spoken.length);
    await page.evaluate(() => document.querySelector('.lck-grip-hour').click());
    await sleep(180);
    const sp1 = await page.evaluate(() => window.__spoken.length);
    is(sp1 > sp0, 'a synthetic CLICK on a grip speaks the time - a drag-only handle would be dead to the liveness gate');

    b0 = await page.evaluate(() => LearningClock.total);
    await page.focus('.lck-grip-minute');
    await page.keyboard.press('ArrowRight');
    await sleep(140);
    b1 = await page.evaluate(() => LearningClock.total);
    is(b1 !== b0, `ArrowRight on the minute grip moves it (${b0} -> ${b1})`);
    await page.keyboard.press('Enter');
    await sleep(140);
    is(await page.evaluate(() => window.__spoken.length) > sp1, 'Enter speaks the time');

    b0 = await page.evaluate(() => LearningClock.total);
    const fat = at(180, 418), fat2 = at(330, 418), palm = at(20, 300);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: fat.x, y: fat.y, radiusX: 30, radiusY: 30, force: 1, id: 1 }] });
    await sleep(24);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: fat2.x, y: fat2.y, radiusX: 30, radiusY: 30, force: 1, id: 1 }] });
    await sleep(24);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [
      { x: fat2.x, y: fat2.y, radiusX: 30, radiusY: 30, force: 1, id: 1 },
      { x: palm.x, y: palm.y, radiusX: 40, radiusY: 40, force: 1, id: 2 }] });
    await sleep(30);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(180);
    b1 = await page.evaluate(() => LearningClock.total);
    const jump = Math.min(((b1 - b0) % 720 + 720) % 720, ((b0 - b1) % 720 + 720) % 720);
    is(b1 !== b0, 'a FAT contact (radius 30, an interactive-whiteboard finger) still drags');
    is(jump < 90, `a stray second touch mid-drag produces no jump (moved ${jump} minutes)`);
    await page.close();
  }

  /* ================= D ============================================= */
  console.log('\n[D] the gesture leaves the dial');
  {
    const page = await open(browser, { url: URL, w: 1024 });
    const cdp = await page.target().createCDPSession();
    const g = await dialGeo(page);
    await page.evaluate(() => { window.__spoken = []; });
    const start = { x: g.cx, y: g.cy + 418 * g.s };
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: start.x, y: start.y, radiusX: 10, radiusY: 10, force: 1 }] });
    for (let i = 1; i <= 8; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: Math.max(2, g.cx - 260 - i * 18), y: g.cy + 26 * i, radiusX: 10, radiusY: 10, force: 1 }] });
      await sleep(16);
    }
    const moved = (await page.evaluate(() => LearningClock.total)) !== 150;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(220);
    is(moved, 'tracking continues far outside the SVG box');
    const spoken = await page.evaluate(() => window.__spoken.length);
    is(spoken === 1, `exactly ONE utterance on release (got ${spoken})`);
    await page.close();
  }

  /* ================= E ============================================= */
  console.log('\n[E] listener hygiene');
  {
    const page = await open(browser, { url: URL, w: 1024 });
    const leaked = await page.evaluate(() => {
      let added = 0;
      const orig = window.addEventListener.bind(window);
      window.addEventListener = function (t) { if (t === 'pointermove') added++; return orig.apply(window, arguments); };
      for (let i = 0; i < 20; i++) window.LearningClock.render();
      return added;
    });
    is(leaked === 0, `20 renders added ${leaked} window pointermove listener(s) - must be 0 (the _wired guard)`);
    await page.close();
  }

  /* ================= F ============================================= */
  console.log('\n[F] gearing');
  {
    const page = await open(browser, { url: URL, w: 1024 });
    const r = await page.evaluate(() => {
      const T = window.LearningClock;
      const out = {};
      T.total = 0; T._drag = { which: 'minute', lastAngle: 0 };
      for (let a = 10; a <= 720; a += 10) T._applyDrag('minute', a % 360);
      out.twoLaps = Math.round(T.total);
      T.total = 150; T._drag = { which: 'hour', lastAngle: 0 };
      const m0 = T.minuteAngle(T.total);
      T._applyDrag('hour', 30);
      out.sweep = Math.round(((T.minuteAngle(T.total) - m0) % 360 + 360) % 360);
      T._drag = null;
      out.hourLaw = Math.abs(T.hourAngle(T.total) - T.total / 2) < 1e-9;
      return out;
    });
    is(r.twoLaps === 120, `two full minute laps advance the clock two hours (got ${r.twoLaps} minutes)`);
    is(r.sweep < 3 || r.sweep > 357, `a 30-degree hour drag sweeps the minute a whole turn (residual ${r.sweep} deg)`);
    is(r.hourLaw, 'the hour angle stays 30h + 0.5m');
    await page.close();
  }

  /* ================= G ============================================= */
  console.log('\n[G] the bubble');
  {
    const page = await open(browser, { url: URL, w: 1024 });
    const bad = await page.evaluate(() => {
      const T = window.LearningClock, out = [];
      for (let i = 0; i < 20; i++) {
        const t = Math.floor(Math.random() * 24) * 30;
        T.total = t; T._bubbleFinal(false);
        const want = T.sayTime('en', T._h(), T._m(), {});
        const got = document.querySelector('.lck-bubbletext').textContent;
        if (got !== want) out.push(t + ': "' + got + '" != "' + want + '"');
      }
      return out;
    });
    is(bad.length === 0, 'the bubble equals sayTime at 20 snapped times' + (bad.length ? ' - ' + bad.slice(0, 2).join('; ') : ''));
    await page.close();
  }

  /* ================= H ============================================= */
  console.log('\n[H] speak-while-dragging - BOTH states');
  {
    for (const on of [false, true]) {
      const page = await open(browser, { url: URL, w: 1024 });
      const cdp = await page.target().createCDPSession();
      await page.evaluate(v => { window.LearningClock.api.settings.speakDrag = v; window.__spoken = []; }, on);
      await touchDrag(page, cdp, 180, 320, 418);
      const during = await page.evaluate(() => window.__spoken.length);
      if (on) is(during > 1, `ON: the time is spoken while dragging (${during} utterances)`);
      else is(during === 1, `OFF: silent during the drag, one utterance on release (got ${during})`);
      await page.close();
    }
  }

  /* ================= I ============================================= */
  console.log('\n[I] practice');
  {
    const page = await open(browser, { url: URL, w: 1024, paid: true });
    const r = await page.evaluate(() => {
      const T = window.LearningClock;
      T.mode = 'task'; T.task.order = []; T.task.idx = 0; T.task.done = 0;
      const bad = [], same = [];
      for (let i = 0; i < 24; i++) {
        T._nextTask();
        /* ⚠ THE RULE IS NOT "the minute hand always differs". For an
           o'clock target the answer IS the minute hand at 12, so a 12:00
           neutral pose has it right by construction and the round is
           honestly a one-hand task. The shipped defect was different and
           much worse: it handed over the minute hand for EVERY target at
           EVERY granularity, measured at 948 of 948. */
        if (T.total === T.task.target) same.push(T.task.target);
        if (T.task.target % 60 !== 0 && T.minuteAngle(T.total) === T.minuteAngle(T.task.target)) bad.push(T.task.target);
      }
      if (same.length) bad.push('start===target x' + same.length);
      const p = document.querySelector('.lck-prompt');
      return { bad: bad.length, prompt: p ? p.textContent : '' };
    });
    is(r.bad === 0, `24 rounds never open with the minute hand on the answer (${r.bad} did)`);
    is(r.prompt.length > 10 && /\S \S/.test(r.prompt), `the prompt renders whole: "${r.prompt}"`);
    const diag = await page.evaluate(() => {
      const T = window.LearningClock, seen = {};
      T.mode = 'task'; T.step = '30'; T.task.target = 150;
      T.task.phase = 'set'; T.total = 30; T._checkTask(); seen.minuteOk = T._taskNote;
      T.task.phase = 'set'; T.total = 120; T._checkTask(); seen.hourOk = T._taskNote;
      T.task.phase = 'set'; T.total = 200; T._checkTask(); seen.both = T._taskNote;   /* 3:20 - both wrong */
      T.task.phase = 'set'; T.total = 150; T._checkTask(); seen.phase = T.task.phase;
      return seen;
    });
    is(!!diag.minuteOk && !!diag.hourOk && !!diag.both, 'a wrong answer always produces a diagnosis line');
    is(diag.minuteOk !== diag.hourOk && diag.hourOk !== diag.both && diag.minuteOk !== diag.both,
      'the three diagnoses are DIFFERENT - each names the next move, not a verdict');
    is(diag.phase === 'done', 'the right answer completes the round');
    const html = await page.evaluate(() => document.body.innerHTML);
    is(!/class="[^"]*(?:\bwrong\b|\bscore\b|\bstreak\b|\btimer\b)/.test(html), 'no verdict, score, streak or timer class anywhere');
    await page.close();
  }

  /* ================= J ============================================= */
  console.log('\n[J] elapsed');
  {
    const page = await open(browser, { url: URL, w: 1024, paid: true });
    const r = await page.evaluate(() => {
      const T = window.LearningClock;
      T.mode = 'elapsed'; T.elapsed = { start: 710, end: null }; T.total = 20; T.render();
      const text = document.querySelector('.lck-bubbletext').textContent;
      const tracks = document.querySelectorAll('.lck-band circle').length;
      T.elapsed = { start: 0, end: 30 }; T.render();
      const thirty = [...document.querySelectorAll('.lck-band path')].map(p => p.getAttribute('d')).join('|');
      T.elapsed = { start: 0, end: 90 }; T.render();
      const ninety = [...document.querySelectorAll('.lck-band path')].map(p => p.getAttribute('d')).join('|');
      return { text, tracks, thirty, ninety };
    });
    is(/30/.test(r.text), `11:50 to 00:20 reads as 30 minutes ("${r.text}")`);
    is(r.tracks === 2, `two ghost tracks, one per unit (got ${r.tracks})`);
    is(r.thirty.length > 0, 'the band draws something at all - non-vacuity');
    is(r.ninety !== r.thirty, '90 minutes does NOT render identically to 30 (the shipped band overdrew laps)');
    await page.close();
  }

  /* ================= K ============================================= */
  console.log('\n[K] accessibility - the AX tree');
  {
    for (const lang of ['en', 'de']) {
      const page = await open(browser, { url: URL + '?lang=' + lang, w: 1024 });
      const cdp = await page.target().createCDPSession();
      await cdp.send('Accessibility.enable');
      const { nodes } = await cdp.send('Accessibility.getFullAXTree');
      const sliders = nodes.filter(x => x.role && x.role.value === 'slider');
      is(sliders.length === 2, `${lang}: both hands appear in the AX tree as sliders (got ${sliders.length})`);
      const names = sliders.map(s => ((s.name && s.name.value) || '').trim());
      is(names.every(x => x.length > 2), `${lang}: both sliders have a real accessible name`);
      is(names.every(x => x !== 'hour' && x !== 'minute'),
        `${lang}: names are not the raw English literals - the shipped build failed this in 10 locales`);
      const vt = sliders.map(s => {
        const p = (s.properties || []).find(q => q.name === 'valuetext');
        return p && p.value ? p.value.value : '';
      });
      const want = await page.evaluate(() => window.LearningClock._say());
      is(vt.every(x => x && x.length > 2), `${lang}: both sliders carry aria-valuetext`);
      is(vt.every(x => x === want), `${lang}: valuetext IS the colloquial reading ("${want}")`);
      await page.close();
    }
  }

  /* ================= L ============================================= */
  console.log('\n[L] the free tier');
  {
    const page = await open(browser, { url: URL, w: 1024 });
    const r = await page.evaluate(() => {
      const locked = [...document.querySelectorAll('.locked')].map(e => e.getAttribute('data-fk'));
      document.querySelector('[data-fk="step-1"]').click();
      return { locked, gate: !!document.querySelector('.lck-gate'), step: window.LearningClock.step,
        free: window.LearningClock.FREE_STEPS.slice() };
    });
    is(r.free.join(',') === '60,30,15,5', `free steps are 60/30/15/5 (got ${r.free.join(',')})`);
    is(r.locked.indexOf('step-15') < 0 && r.locked.indexOf('step-5') < 0, 'quarter hours and 5 minutes are NOT locked');
    is(['step-1', 'mode-task', 'mode-elapsed', 'ourtimes', 'print'].every(k => r.locked.indexOf(k) >= 0),
      'the 1-minute step, Practice, How-long, Our times and Print are locked');
    is(r.gate, 'a locked control shows the upgrade line instead of silently doing nothing');
    is(r.step !== '1', 'a locked step is refused, not applied');
    await page.close();
  }

  /* ================= M ============================================= */
  console.log('\n[M] the print sheet');
  {
    const free = await open(browser, { url: URL, w: 1024 });
    is((await free.evaluate(() => document.querySelectorAll('.lck-sheet').length)) === 0,
      'a free visitor has NO print subtree - Ctrl+P cannot reach it');
    is((await free.evaluate(() => document.body.classList.contains('lck-paid'))) === false,
      'the paid body class is absent for a free visitor');
    await free.close();
    const paid = await open(browser, { url: URL, w: 1024, paid: true });
    const s = await paid.evaluate(() => ({
      sheet: document.querySelectorAll('.lck-sheet').length,
      pages: document.querySelectorAll('.lck-page').length,
      faces: document.querySelectorAll('.lck-pface').length,
      cls: document.body.classList.contains('lck-paid'),
      sibling: !!(document.querySelector('.lck-sheet') && document.querySelector('.lck-sheet').parentElement.classList.contains('lcs-stage'))
    }));
    is(s.sheet === 1 && s.cls, 'an entitled visitor gets the sheet and the paid body class');
    is(s.pages === 4, `four pages (got ${s.pages})`);
    is(s.faces >= 18, `every page draws real dials (got ${s.faces})`);
    is(s.sibling, 'the sheet is a SIBLING of the wrap, not a descendant (print hides the wrap)');
    await paid.close();
  }

  /* ================= N ============================================= */
  console.log('\n[N] console');
  {
    const page = await open(browser, { url: URL, w: 1024, paid: true });
    await page.evaluate(() => { const T = window.LearningClock; T.mode = 'task'; T._nextTask(); });
    await sleep(250);
    is(page.__errs.length === 0, 'no console errors' + (page.__errs.length ? ' - ' + page.__errs.slice(0, 2).join(' | ') : ''));
    await page.close();
  }

  await browser.close();
  srv.close();
  console.log('');
  if (fails.length) { console.log(`FAIL - ${fails.length} of ${n + fails.length}`); process.exit(1); }
  console.log(`PASS - ${n} assertions in a real browser`);
})().catch(e => { console.error(e); process.exit(1); });
