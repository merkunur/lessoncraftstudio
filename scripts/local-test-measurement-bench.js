#!/usr/bin/env node
/* =====================================================================
   local-test-measurement-bench.js — the local Definition-of-Done for
   Measurement Bench. Sections:
     A  viewports 320-1366 — no h-overflow, NO-SCROLL ≥768, visible tap
        targets ≥44px, stage clear of the dock
     B  LENGTH (free) — supply drag lays a unit; a constructed gap
        arrangement counts via the kindly scooch (≤1 voice line, chain
        closes, never a red state); a complete chain counts and speaks
        the sentence; the estimate chip pins and the comparison is pure
        juxtaposition (no verdict words)
     C  the ruler check — inch toggle reads reduced fractions/whole
        inches after counting
     D  CAPACITY (premium) — hold-to-pour raises the target, release
        stops, pour-to-brim auto-stops EXACTLY at capacity and speaks
        the capacity sentence; volume conserved
     E  WEIGHT (premium) — cubes tilt the beam (derived sign), exact
        cubes settle to the localized sentence; overshoot line ≤1
     F  free vs premium — ?bench=weight unentitled → gate panel with
        ZERO premium DOM; locked tabs gate; premium honors deep links
     G  no-shame audit — no alarm-red/verdict-green, no ✗, silence
        while laying (sounds only on snap/count)
     H  reduced motion   I  keyboard reachability
   Screenshots → docs/audit-results/measurement-bench/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'measurement-bench', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

let pass = 0, fail = 0;
const bad = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; bad.push(name); console.log('  ✗ FAIL ' + name + (extra ? ' — ' + extra : '')); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/measurement-bench.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    await page.setViewport({ width: opts.w || 1024, height: opts.h || 768 });
    await page.evaluateOnNewDocument((premium) => {
      try { localStorage.clear(); } catch (_) {}
      if (premium) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          localStorage.setItem('lcs:measurement-bench:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, settings: null, log: [], setups: [] }));
        } catch (_) {}
      }
    }, !!opts.premium);
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  async function ready(page) { await page.waitForSelector('.mb-stage', { timeout: 8000 }); await sleep(250); }
  async function spy(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) { LCSAudio.speak = function (o) { window.__spoken.push(o.text); }; LCSAudio.cancel = function () {}; }
      window.__notes = 0;
      const Real = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function () { window.__notes++; return Real.call(this); };
    });
  }
  async function stagePt(page, x, y) {
    return page.evaluate((x, y) => {
      const r = document.querySelector('.mb-stage').getBoundingClientRect();
      const s = MeasurementBench._scale;
      return { x: r.left + x * s, y: r.top + y * s };
    }, x, y);
  }

  /* ============================ A: viewports ============================ */
  console.log('A. viewport sweep');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE);
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const tiny = [];
      document.querySelectorAll('button, a').forEach((b) => {
        const r = b.getBoundingClientRect();
        const cs = getComputedStyle(b);
        if (r.width === 0 || cs.pointerEvents === 'none' || parseFloat(cs.opacity) < 0.05) return;
        if ((r.width < 44 || r.height < 44) && !b.classList.contains('mb-cube')) tiny.push(`${(b.textContent || b.className).trim().slice(0, 18)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      });
      const stage = document.querySelector('.mb-stage-outer').getBoundingClientRect();
      const dock = document.querySelector('.mb-dock').getBoundingClientRect();
      return { hOver: doc.scrollWidth - doc.clientWidth, vOver: doc.scrollHeight - doc.clientHeight, tiny, overlap: stage.bottom - 2 > dock.top && dock.height > 0 };
    });
    ok(`${w}x${h} no h-overflow`, m.hOver <= 1, `${m.hOver}px`);
    if (w >= 768) ok(`${w}x${h} NO-SCROLL`, m.vOver <= 2, `${m.vOver}px`);
    ok(`${w}x${h} tap targets ≥44`, m.tiny.length === 0, m.tiny.join('; '));
    ok(`${w}x${h} stage clear of dock`, !m.overlap);
    await page.screenshot({ path: path.join(QA, `A-${w}x${h}.png`) });
    ok(`${w}x${h} no js errors`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ B: length bench ========================= */
  console.log('B. length — lay, scooch, count, estimate');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    /* pin an estimate first */
    await page.click('.mb-est-pin');
    await sleep(200);
    let st = await page.evaluate(() => ({ pinned: MeasurementBench.est.pinned, note: !!document.querySelector('.mb-est.pinned') }));
    ok('estimate pins as a note', st.pinned && st.note);
    /* drag one unit from the supply to the track */
    const sup = await page.evaluate(() => {
      const r = document.querySelector('.mb-supply').getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    const drop = await stagePt(page, 200, 268);
    await page.mouse.move(sup.x, sup.y);
    await page.mouse.down();
    for (let i = 1; i <= 6; i++) await page.mouse.move(sup.x + (drop.x - sup.x) * i / 6, sup.y + (drop.y - sup.y) * i / 6);
    await page.mouse.up();
    await sleep(250);
    st = await page.evaluate(() => ({ placed: MeasurementBench.placed.length, laid: document.querySelectorAll('.mb-unit.laid').length }));
    ok('supply drag lays a unit on the lattice', st.placed === 1 && st.laid === 1);
    /* the rendered img must carry EXACTLY the placement the pure fn returns
       (the operator-defect class: units must span the DEPICTED object) */
    const plOk = await page.evaluate(() => {
      const T = MeasurementBench;
      const obj = T.LENGTH_OBJECTS[T.lenIdx];
      const pl = T._lenPlacement(obj, T._lenX0, T._lenTrackY);
      const img = document.querySelector('.mb-lenobj');
      const close = (a, b) => Math.abs(parseFloat(a) - b) < 0.6;
      const nums = (str) => (str.match(/-?[\d.]+/g) || []).map(Number);
      const sameNums = (a, b) => { const x = nums(a), y = nums(b); return x.length === y.length && x.every((v, i) => Math.abs(v - y[i]) < 0.6); };
      return close(img.style.width, pl.width) &&
        (obj.rot === 90 ? sameNums(img.style.transform, pl.transform)
          : close(img.style.left, pl.left) && close(img.style.top, pl.top));
    });
    ok('rendered object placement equals _lenPlacement (trim-exact)', plOk);
    /* construct a GAP arrangement for the worm (180px, 4 clips at X0=240):
       [240, 300, 345, 390] — 15px gap after the first clip */
    await page.evaluate(() => {
      const T = MeasurementBench;
      T.placed = [T._lenX0, T._lenX0 + 60, T._lenX0 + 105, T._lenX0 + 150];
      T.render();
    });
    await sleep(200);
    await page.evaluate(() => { window.__spoken = []; });
    await page.click('.mb-chip.primary');
    await sleep(600);
    const scooch = await page.evaluate(() => ({
      spokeScooch: window.__spoken.some((s) => /snuggle/i.test(s)),
      spokeCount: window.__spoken.some((s) => /long!/i.test(s))
    }));
    ok('gap → the kindly scooch line speaks', scooch.spokeScooch);
    await sleep(1600);
    const counted = await page.evaluate(() => ({
      counted: MeasurementBench.counted,
      placed: MeasurementBench.placed.length,
      chain: MeasurementBench.placed.every((x, i) => x === MeasurementBench._lenX0 + i * 45),
      spoke: window.__spoken.some((s) => /key is 4 paperclips long/i.test(s)),
      compare: window.__spoken.some((s) => /You guessed 5 · It measured 4/.test(s)),
      compareUI: !!document.querySelector('.mb-est.compared')
    }));
    ok('chain closes + counts 4 exact clips', counted.counted && counted.placed === 4 && counted.chain);
    ok('length sentence speaks', counted.spoke);
    ok('estimate juxtaposition (no verdict framing)', counted.compare && counted.compareUI);
    await page.screenshot({ path: path.join(QA, 'B-length-counted.png') });
    /* second defect run: scooch line must NOT speak again (≤1/session) */
    await page.evaluate(() => {
      const T = MeasurementBench;
      T.placed = []; T.counted = false; T.est = null; T.measured = null;
      T.render();
      T.placed = [T._lenX0 + 15, T._lenX0 + 60, T._lenX0 + 105, T._lenX0 + 150];
      window.__spoken = [];
    });
    await page.click('.mb-chip.primary');
    await sleep(2500);
    const second = await page.evaluate(() => window.__spoken.some((s) => /snuggle/i.test(s)));
    ok('second scooch is silent (≤1 voice line per session)', !second);
    /* short chain: kindly not-covered line, no count */
    await page.evaluate(() => {
      const T = MeasurementBench;
      T.counted = false;
      T.placed = [T._lenX0, T._lenX0 + 45];
      T.render();
      window.__spoken = [];
    });
    await page.click('.mb-chip.primary');
    await sleep(700);
    const shortSt = await page.evaluate(() => ({ counted: MeasurementBench.counted, spoke: window.__spoken.some((s) => /isn’t covered|isn't covered/i.test(s)) }));
    ok('short chain waits with the covered line', !shortSt.counted && shortSt.spoke);
    ok('B no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ C: ruler check ========================== */
  console.log('C. ruler check + inch toggle');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => {
      const T = MeasurementBench;
      T.api.settings.rulerCheck = true;
      T.api.settings.units = 'inch';
      T.placed = [T._lenX0, T._lenX0 + 45, T._lenX0 + 90, T._lenX0 + 135];
      T.counted = true;
      T.render();
    });
    await sleep(300);
    const r = await page.evaluate(() => {
      const read = document.querySelector('.mb-ruler-read');
      return { strip: !!document.querySelector('.mb-ruler'), read: read ? read.textContent : '' };
    });
    ok('ruler strip renders after counting', r.strip);
    ok('inch readout is whole/reduced ("4 in")', r.read === '4 in', r.read);
    await page.evaluate(() => { MeasurementBench.api.settings.units = 'cm'; MeasurementBench.render(); });
    await sleep(200);
    const cm = await page.evaluate(() => (document.querySelector('.mb-ruler-read') || {}).textContent);
    ok('cm readout dot-decimal ("12 cm")', cm === '12 cm', cm);
    await page.screenshot({ path: path.join(QA, 'C-ruler-check.png') });
    ok('C no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ D: capacity ============================= */
  console.log('D. capacity (premium) — hold-to-pour, brim auto-stop');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE + '?bench=capacity');
    await ready(page);
    await spy(page);
    const vessels = await page.evaluate(() => document.querySelectorAll('.mb-vessel').length);
    ok('3 vessels render', vessels === 3);
    /* short hold: level rises then stops on release */
    const jug = await page.evaluate(() => {
      const r = document.querySelector('.mb-vessel[data-vessel="jug"]').getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await page.mouse.move(jug.x, jug.y);
    await page.mouse.down();
    await sleep(900);
    await page.mouse.up();
    await sleep(200);
    let lv = await page.evaluate(() => ({ ...MeasurementBench.levels }));
    ok('hold-to-pour raises the target', lv.tall > 0.5, JSON.stringify(lv));
    const frozen = lv.tall;
    await sleep(500);
    lv = await page.evaluate(() => ({ ...MeasurementBench.levels }));
    ok('release stops the pour', Math.abs(lv.tall - frozen) < 0.01);
    ok('volume conserved', Math.abs(lv.jug + lv.tall + lv.wide - 10) < 0.01, JSON.stringify(lv));
    /* pour to the brim: hold until auto-stop */
    await page.evaluate(() => { window.__spoken = []; });
    await page.mouse.move(jug.x, jug.y);
    await page.mouse.down();
    await sleep(6200);
    await page.mouse.up();
    await sleep(1200);
    const brim = await page.evaluate(() => ({
      tall: MeasurementBench.levels.tall,
      spokeFull: window.__spoken.some((s) => /full to the top/i.test(s)),
      spokeCap: window.__spoken.some((s) => /tall beaker holds 8 cups/i.test(s))
    }));
    ok('brim auto-stops EXACTLY at capacity', Math.abs(brim.tall - 8) < 0.001, String(brim.tall));
    ok('full + capacity sentences speak', brim.spokeFull && brim.spokeCap);
    await page.screenshot({ path: path.join(QA, 'D-capacity-brim.png') });
    ok('D no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ E: weight =============================== */
  console.log('E. weight (premium) — derived tilt, settle sentence');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE + '?bench=weight');
    await ready(page);
    await spy(page);
    const key = await page.evaluate(() => MeasurementBench._wtKey);
    const weight = await page.evaluate(() => MeasurementBench.WEIGHTS[MeasurementBench._wtKey]);
    ok('an object sits on the left pan', !!key);
    /* seating asserts: the loads' DOM rects must sit on the pan floors
       AT THE SHARED ANCHORS, at rest AND at both tilt extremes */
    const seating = async (label) => {
      await sleep(900);
      const m = await page.evaluate(() => {
        const T = MeasurementBench;
        const s = T._scale;
        const stageR = document.querySelector('.mb-stage').getBoundingClientRect();
        const L = T._panAnchor('left', T.balAngle), R = T._panAnchor('right', T.balAngle);
        const obj = document.querySelector('.mb-wtobj').getBoundingClientRect();
        const stack = document.querySelector('.mb-cubestack').getBoundingClientRect();
        const toStage = (px, py) => ({ x: (px - stageR.left) / s, y: (py - stageR.top) / s });
        const objBC = toStage(obj.left + obj.width / 2, obj.bottom);
        const stackB = toStage(stack.left + stack.width / 2, stack.bottom);
        return { objDx: objBC.x - L.x, objFloor: objBC.y - (L.y + 66), stackDx: stackB.x - R.x, stackFloor: stackB.y - (R.y + 62) };
      });
      ok(`${label}: object bottom-center seated on the left pan`, Math.abs(m.objDx) < 6 && Math.abs(m.objFloor) < 6, JSON.stringify(m));
      ok(`${label}: cube stack seated on the right pan`, Math.abs(m.stackDx) < 6 && Math.abs(m.stackFloor) < 6, JSON.stringify(m));
    };
    await seating('at rest (0 cubes, tilted left)');
    /* under-load: beam must tilt negative (object side down) */
    await page.evaluate((n) => { MeasurementBench.cubes = n; }, Math.max(0, weight - 2));
    await sleep(900);
    let angle = await page.evaluate(() => MeasurementBench.balAngle);
    ok('under-loaded beam tilts toward the object', angle < -1, String(angle));
    /* overshoot: positive tilt + ≤1 kind line */
    await page.evaluate(() => { window.__spoken = []; });
    await page.evaluate((n) => { MeasurementBench.cubes = n; MeasurementBench._checkOver(); }, weight + 2);
    await sleep(900);
    angle = await page.evaluate(() => MeasurementBench.balAngle);
    const over1 = await page.evaluate(() => window.__spoken.some((s) => /Take one off/i.test(s)));
    ok('over-loaded beam tilts the other way + kind line', angle > 1 && over1);
    await seating('over-loaded (tilted right)');
    await page.evaluate(() => { window.__spoken = []; MeasurementBench._checkOver(); });
    const over2 = await page.evaluate(() => window.__spoken.some((s) => /Take one off/i.test(s)));
    ok('overshoot line ≤1 per object', !over2);
    /* exact: settle → sentence with the localized noun */
    await page.evaluate(() => { window.__spoken = []; });
    await page.evaluate((n) => { MeasurementBench.cubes = n; }, weight);
    await sleep(3500);
    const done = await page.evaluate(() => ({
      settled: MeasurementBench.settled,
      spoke: window.__spoken.join(' | ')
    }));
    ok('exact cubes settle the beam', done.settled);
    ok('weight sentence speaks with the noun', new RegExp('weighs ' + weight + ' cubes', 'i').test(done.spoke), done.spoke);
    await seating('settled (level)');
    await page.screenshot({ path: path.join(QA, 'E-weight-settled.png') });
    /* heavy-object capture: 12 cubes in the 4-column stack for the eyeball */
    await page.evaluate(() => {
      const T = MeasurementBench;
      T.wtIdx = T.WEIGHT_KEYS.indexOf('horse');
      T.cubes = 0; T.balAngle = 0; T.balVel = 0; T.settled = false; T.overSpoken = false;
      T.est = null; T.measured = null;
      T.render();
      T.cubes = 12; T._paintCubes();
    });
    await sleep(2500);
    await page.screenshot({ path: path.join(QA, 'E-weight-heavy.png') });
    ok('E no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ F: free vs premium ====================== */
  console.log('F. free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?bench=weight');
    await ready(page);
    const free = await page.evaluate(() => ({
      gate: !!document.querySelector('.mb-gatepanel'),
      href: (document.querySelector('.mb-gatepanel a') || {}).getAttribute && document.querySelector('.mb-gatepanel a').getAttribute('href'),
      premiumDom: !!(document.querySelector('.mb-balance') || document.querySelector('.mb-cubesupply') || document.querySelector('.mb-vessel')),
      lockedTabs: document.querySelectorAll('.mb-tab.locked').length
    }));
    ok('unentitled ?bench=weight → gate panel', free.gate);
    ok('zero premium DOM behind the gate', !free.premiumDom);
    ok('gate links to pricing with from=', /from=tool-measurement-bench/.test(free.href || ''), free.href);
    ok('both premium tabs show locks', free.lockedTabs === 2);
    await page.screenshot({ path: path.join(QA, 'F-free-gate.png') });
    const p2 = await newPage({ premium: true });
    await p2.goto(BASE + '?bench=capacity');
    await ready(p2);
    const prem = await p2.evaluate(() => ({ bench: MeasurementBench.bench, vessels: document.querySelectorAll('.mb-vessel').length, locks: document.querySelectorAll('.mb-tab.locked').length }));
    ok('premium honors ?bench=capacity', prem.bench === 'capacity' && prem.vessels === 3 && prem.locks === 0);
    ok('F no js errors', page._errs.length === 0 && p2._errs.length === 0, page._errs[0] || p2._errs[0]);
    await page.close(); await p2.close();
  }

  /* ============================ G: no-shame audit ======================= */
  console.log('G. no-shame audit');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    const audit = await page.evaluate(() => {
      const badColors = [];
      const isBad = (col) => {
        const m = col && col.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return false;
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        if (r > 185 && g < 90 && b < 90) return true;
        if (g > 150 && r < 100 && b < 100) return true;
        return false;
      };
      document.querySelectorAll('.mb-wrap *').forEach((el) => {
        const s = getComputedStyle(el);
        [s.color, s.backgroundColor, s.borderColor].forEach((col) => { if (isBad(col)) badColors.push(el.className + ':' + col); });
      });
      return { badColors: badColors.slice(0, 3), glyphs: /[✗✘❌]/.test(document.body.textContent) };
    });
    ok('no alarm-red / verdict-green anywhere', audit.badColors.length === 0, audit.badColors.join('; '));
    ok('no ✗ glyphs', !audit.glyphs);
    /* silence while laying a defective chain (no sound until Count) */
    await page.evaluate(() => {
      MeasurementBench.placed = [MeasurementBench._lenX0 + 30, MeasurementBench._lenX0 + 90];
      MeasurementBench.render();
      window.__notes = 0; window.__spoken = [];
    });
    await sleep(600);
    const silent = await page.evaluate(() => ({ notes: window.__notes, spoken: window.__spoken.length }));
    ok('laying a "wrong" chain is SILENT (silence is the no-shame channel)', silent.notes === 0 && silent.spoken === 0);
    ok('G no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ H: reduced motion ======================= */
  console.log('H. reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => {
      const T = MeasurementBench;
      T.placed = [T._lenX0, T._lenX0 + 60, T._lenX0 + 105, T._lenX0 + 150];
      T.render();
    });
    await page.click('.mb-chip.primary');
    await sleep(2500);
    const counted = await page.evaluate(() => MeasurementBench.counted);
    ok('reduced motion: scooch + count still complete', counted);
    ok('H no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ I: keyboard ============================= */
  console.log('I. keyboard reachability');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    const kb = await page.evaluate(() => {
      const tabs = [...document.querySelectorAll('.mb-tab')];
      tabs[0].focus();
      const focusable = document.activeElement.classList.contains('mb-tab');
      const buttons = [...document.querySelectorAll('.mb-tab, .mb-chip, .mb-est-btn, .mb-est-pin, .mb-minichip')].every((b) => b.tagName === 'BUTTON');
      return { focusable, buttons };
    });
    ok('tabs are focusable buttons', kb.focusable);
    ok('all chips are real <button>s', kb.buttons);
    ok('I no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
  console.log('local-test-measurement-bench: ALL GREEN');
})();
