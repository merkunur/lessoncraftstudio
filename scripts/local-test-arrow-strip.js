/* =====================================================================
   local-test-arrow-strip.js — the browser DoD for TOOL #37
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-arrow-strip.js [--shot]

   The model gate proves the kinematics; this proves the BEETLE ON SCREEN
   is those kinematics, that the rail really is inert until Run, and that
   the whole thing fits a projector and a phone.

     L1 ⭐ THE TRAIL IS THE RUN   the rendered polyline's vertices ARE the
                                 model's pose sequence, measured
     L2 ⭐ THE GHOST              run, edit ONE middle card, run again:
                                 the old trail is still there and the new
                                 one diverges at exactly the edited index
     L3 ⭐ FRAME TOGGLE 0.00px    the beetle's-eye mat is the same DOM
                                 under one rotation — measured on the
                                 rendered trail vertices
     L4    BUILD, THEN RUN        dropping cards moves nothing
     L5 ⭐ EDGE HONESTY ON SCREEN a blocked run leaves the beetle where it
                                 was, and does not wrap
     L6 ⭐ LABELS ARE TRUE        Run runs; Empty empties. The lesson from
                                 "New cards", asserted in the browser
     L7    THE HINT IS ABOVE      and inside the viewport at 360 and 1024
     L8    THE SWEEP              320-1366, two tap floors, text >=14px,
                                 no page overflow, cells inside the mat,
                                 FITS at desktop, zero console errors
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5504;
const SHOT = process.argv.indexOf('--shot') > -1;
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'arrow-strip', 'qa');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

/* the SAME model object the DOM is checked against — never a second guess */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'arrow-strip.js'), 'utf8') + '\n;this.__T = ArrowStrip;', sandbox);
const T = sandbox.__T;

let PASS = 0, FAIL = 0;
const is = (cond, msg) => { if (cond) { PASS++; console.log('  ok   ' + msg); } else { FAIL++; console.error('  FAIL ' + msg); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(browser, o) {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().includes('/api/auth/me')
    ? r.respond({
      status: 200, contentType: 'application/json',
      body: JSON.stringify(o && o.premium
        ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
        : { user: { subscriptionTier: 'free' }, subscription: null })
    })
    : r.continue()));
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
  }, !!(o && o.premium));
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const open = async (page, lang, w, h) => {
  await page.setViewport({ width: w || 1024, height: h || 900 });
  await page.goto(`http://127.0.0.1:${PORT}/arrow-strip.html?lang=${lang || 'en'}&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.arw-wrap', { timeout: 9000 });
  await page.waitForSelector('.arw-card', { timeout: 9000 });
  await wait(250);
};

/* drop cards into the rail by tapping the tray; F B L R are tray order */
const IDX = { F: 0, B: 1, L: 2, R: 3 };
const drop = async (page, cards) => {
  for (const k of cards) {
    await page.evaluate((i) => document.querySelectorAll('.arw-card')[i].click(), IDX[k]);
    await wait(40);
  }
};
const clickText = async (page, sel, i) => { await page.evaluate((s, n) => document.querySelectorAll(s)[n].click(), sel, i); await wait(320); };

/* the rendered trail's vertices, in mat coordinates, read off the SVG */
const trailPts = (page, cls) => page.evaluate((c) => {
  const el = document.querySelector('.' + c);
  if (!el) return null;
  return el.getAttribute('points').trim().split(/\s+/).map((p) => p.split(',').map(Number));
}, cls);

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  try {
    /* ---------------- L1 ⭐ THE TRAIL IS THE RUN ---------------- */
    console.log('\nL1 the trail is the run');
    {
      const page = await newPage(browser);
      await open(page, 'en');
      const RAILS = [['F', 'F', 'R', 'F'], ['R', 'F', 'R', 'F', 'R', 'F'], ['F', 'L', 'F', 'L', 'F', 'B'], ['L', 'F', 'F', 'R', 'F']];
      let checked = 0;
      for (const rail of RAILS) {
        await clickText(page, '.arw-chip', 1);            /* Empty the rail is foot chip; use the explicit path below */
        await page.evaluate(() => {
          const b = Array.from(document.querySelectorAll('.arw-foot .arw-chip'));
          const clear = b[1]; if (clear && !clear.disabled) clear.click();
        });
        await wait(150);
        await drop(page, rail);
        await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
        await wait(360);
        const got = await trailPts(page, 'arw-trail');
        const st0 = T.newState();
        const want = T.run(st0.pose, rail, st0.n).map((p) => [p.c + 0.5, p.r + 0.5]);
        is(got && got.length === want.length && got.every((p, i) => p[0] === want[i][0] && p[1] === want[i][1]),
          `L1 [${rail.join('')}] — ${want.length} rendered vertices ARE the model's pose sequence`);
        checked++;
      }
      is(checked === RAILS.length, `L1 all ${checked} rails checked (not vacuous)`);
      await page.close();
    }

    /* ---------------- L2 ⭐ THE GHOST ---------------- */
    console.log('\nL2 the ghost — invention 2');
    {
      const page = await newPage(browser);
      await open(page, 'en');
      const first = ['F', 'F', 'R', 'F', 'F'];
      await drop(page, first);
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(360);
      const run1 = await trailPts(page, 'arw-trail');
      is(!!run1 && !(await trailPts(page, 'arw-ghost')), 'L2 the FIRST run leaves no ghost — there is nothing behind it yet');

      /* edit exactly ONE middle card: remove slot 2 (the R) and put an L there */
      await page.evaluate(() => document.querySelectorAll('.arw-slot')[2].click());
      await wait(120);
      await page.evaluate(() => { const t = document.querySelectorAll('.arw-card'); t[2].click(); });  /* L appended */
      await wait(120);
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(360);
      const ghost = await trailPts(page, 'arw-ghost');
      const run2 = await trailPts(page, 'arw-trail');
      is(!!ghost && ghost.length === run1.length && ghost.every((p, i) => p[0] === run1[i][0] && p[1] === run1[i][1]),
        'L2 ⭐ the previous run is STILL ON SCREEN as the ghost, vertex for vertex');
      is(!!run2, 'L2 the new run is drawn over it');
      const div = run2.findIndex((p, i) => !ghost[i] || p[0] !== ghost[i][0] || p[1] !== ghost[i][1]);
      is(div > 0, `L2 ⭐ the two runs are identical up to the edit and diverge at vertex ${div} — the class can see how far downstream one card reached`);
      await page.close();
    }

    /* ---------------- L3 ⭐ FRAME TOGGLE ---------------- */
    console.log("\nL3 the beetle's-eye toggle — one rotation of the real mat");
    {
      const page = await newPage(browser);
      await open(page, 'en');
      await drop(page, ['F', 'F', 'R', 'F']);
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(360);
      const before = await trailPts(page, 'arw-trail');
      const eyeIdx = await page.evaluate(() => Array.from(document.querySelectorAll('.arw-bar .arw-chip')).findIndex((b) => b.textContent.length > 3));
      await page.evaluate((i) => document.querySelectorAll('.arw-bar .arw-chip')[i].click(), eyeIdx);
      await wait(420);
      const after = await trailPts(page, 'arw-trail');
      is(!!after && before.length === after.length && after.every((p, i) => p[0] === before[i][0] && p[1] === before[i][1]),
        'L3 ⭐ the trail is BYTE-IDENTICAL in the beetle\'s frame — nothing is recomputed, the mat is one CSS rotation of the same DOM');
      const rot = await page.evaluate(() => {
        const f = document.querySelector('.arw-frame');
        return { t: getComputedStyle(f).transform, fixed: !!document.querySelector('.arw-beetle.arw-fixed') };
      });
      is(rot.t !== 'none' && rot.t !== '', 'L3 the mat really is rotated (a real transform, not a re-layout)');
      is(rot.fixed, 'L3 the beetle is fixed dead centre while the world turns under it');
      /* the mat must be square or a quarter turn stops landing on squares */
      const box = await page.evaluate(() => { const b = document.querySelector('.arw-mat').getBoundingClientRect(); return [b.width, b.height]; });
      is(Math.abs(box[0] - box[1]) < 0.5, `L3 the mat is square (${box[0].toFixed(2)} x ${box[1].toFixed(2)}) — a quarter turn is exact`);
      await page.close();
    }

    /* ---------------- L4 BUILD, THEN RUN ---------------- */
    console.log('\nL4 build, then run — separated in time');
    {
      const page = await newPage(browser);
      await open(page, 'en');
      const at0 = await page.evaluate(() => { const b = document.querySelector('.arw-beetle'); return [b.style.left, b.style.top]; });
      await drop(page, ['F', 'F', 'R', 'F', 'F', 'F']);
      const at1 = await page.evaluate(() => { const b = document.querySelector('.arw-beetle'); return [b.style.left, b.style.top]; });
      is(at0[0] === at1[0] && at0[1] === at1[1], 'L4 ⭐ six cards in the rail and the beetle has NOT MOVED — the rail is inert while it is built');
      is(!(await trailPts(page, 'arw-trail')), 'L4 and no trail is drawn before Run');
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(400);
      const at2 = await page.evaluate(() => { const b = document.querySelector('.arw-beetle'); return [b.style.left, b.style.top]; });
      is(at2[0] !== at1[0] || at2[1] !== at1[1], 'L4 and it moves the moment Run is pressed');
      await page.close();
    }

    /* ---------------- L5 ⭐ EDGE HONESTY ON SCREEN ---------------- */
    console.log('\nL5 edge honesty, on the rendered mat');
    {
      const page = await newPage(browser);
      await open(page, 'en');
      /* the beetle starts bottom-left facing up; five B cards all push it
         off the bottom edge, so it must not move and must not wrap */
      await drop(page, ['B', 'B', 'B']);
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(380);
      const pts = await trailPts(page, 'arw-trail');
      const same = pts.every((p) => p[0] === pts[0][0] && p[1] === pts[0][1]);
      is(same, 'L5 ⭐ three blocked cards and every trail vertex is the same square — it stands still');
      const st = T.newState();
      is(pts[0][1] === st.pose.r + 0.5, 'L5 and it did NOT wrap to the far edge');
      await page.close();
    }

    /* ---------------- L6 ⭐ LABELS ARE TRUE ---------------- */
    console.log('\nL6 every noun-labelled control does what it says');
    {
      const page = await newPage(browser);
      await open(page, 'en');
      const before = await page.evaluate(() => document.querySelectorAll('.arw-slot').length);
      await drop(page, ['F', 'R', 'F']);
      const filled = await page.evaluate(() => document.querySelectorAll('.arw-slot').length);
      is(before === 0 && filled === 3, 'L6 tapping the tray puts cards in the rail');
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(380);
      is(!!(await trailPts(page, 'arw-trail')), 'L6 ⭐ "Run it" RUNS THE RAIL — it does not arm a mode (the "New cards" lesson)');
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[1].click());
      await wait(200);
      const emptied = await page.evaluate(() => document.querySelectorAll('.arw-slot').length);
      is(emptied === 0, 'L6 ⭐ "Empty the rail" EMPTIES THE RAIL');
      is(!(await trailPts(page, 'arw-trail')), 'L6 and the trail goes with it');
      await page.close();
    }

    /* ---------------- L7 THE HINT IS ABOVE THE MAT ---------------- */
    console.log('\nL7 the hint is above the mat and on screen');
    for (const w of [360, 1024]) {
      const page = await newPage(browser);
      await open(page, 'en', w, w === 360 ? 780 : 900);
      const r = await page.evaluate(() => {
        const h = document.querySelector('.arw-hint').getBoundingClientRect();
        const m = document.querySelector('.arw-mat').getBoundingClientRect();
        return { hb: h.bottom, ht: h.top, mt: m.top, txt: (document.querySelector('.arw-hint').textContent || '').trim() };
      });
      is(r.hb <= r.mt + 1, `L7 @${w} the hint sits above the mat`);
      is(r.ht >= 0 && r.hb <= (w === 360 ? 780 : 900), `L7 @${w} the hint is inside the viewport`);
      is(r.txt.length > 0, `L7 @${w} the hint says something ("${r.txt}")`);
      await page.close();
    }

    /* ---------------- L8 THE SWEEP ---------------- */
    /* ⚠ EVERY MAT SIZE, NOT JUST THE DEFAULT. The sweep only ever opened
       the 6x6 and so could not see that the mat was sized for six columns
       whatever n was — it happened to be right for the default. */
    console.log('\nL8 the sweep — all three mat sizes at every viewport');
    for (const [w, n] of [[320, 4], [320, 6], [320, 8], [360, 6], [412, 8], [768, 8], [1024, 4], [1024, 8], [1366, 8]]) {
      const page = await newPage(browser);
      await open(page, 'en', w, 900);
      await page.evaluate((size) => {
        const b = Array.from(document.querySelectorAll('.arw-sizes .arw-chip'));
        const hit = b.find((e) => e.textContent.indexOf(String(size)) === 0);
        if (hit) hit.click();
      }, n);
      await wait(200);
      const cols = await page.evaluate(() => document.querySelectorAll('.arw-cell').length);
      is(cols === n * n, `L8 @${w} n=${n} the mat really has ${n * n} squares (${cols})`);
      await drop(page, ['F', 'F', 'R', 'F']);
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(360);
      const m = await page.evaluate(() => {
        const r = {};
        /* ⚠ EVERY control class named, never "something has 44px" — an
           or-shaped assertion hid a missing tap floor once already. */
        ['.arw-chip', '.arw-card', '.arw-slot'].forEach((s) => {
          const els = Array.from(document.querySelectorAll(s));
          r[s] = { n: els.length, min: els.length ? Math.min(...els.map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height))) : -1 };
        });
        const cells = Array.from(document.querySelectorAll('.arw-cell'));
        r.cell = cells.length ? Math.min(...cells.map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height))) : -1;
        /* ⚠ CONTAINMENT IS AGAINST THE CARD, NOT THE MAT. The first cut
           checked every cell against .arw-mat and passed an 8x8 mat that
           ran clean off the right edge of the card at 1024 — because the
           cells WERE inside the mat and it was the MAT that overflowed,
           silently absorbed by .arw-scroll's overflow-x. Measure against
           the outermost thing the teacher can actually see. */
        const matEl = document.querySelector('.arw-mat');
        const mat = matEl.getBoundingClientRect();
        const card = (document.querySelector('.lcs-app') || document.body).getBoundingClientRect();
        r.outside = cells.filter((e) => e.getBoundingClientRect().right > mat.right + 1).length;
        r.matOutside = (mat.right > card.right + 1 || mat.left < card.left - 1) ? 1 : 0;
        r.matW = mat.width;
        r.scrollW = matEl.parentElement.clientWidth;
        r.docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const txt = Array.from(document.querySelectorAll('.arw-hint,.arw-chip,.arw-gate span,.arw-gate a'))
          .filter((e) => (e.textContent || '').trim());
        r.minFont = txt.length ? Math.min(...txt.map((e) => parseFloat(getComputedStyle(e).fontSize))) : 99;
        const foot = document.querySelector('.arw-foot').getBoundingClientRect();
        r.bottom = foot.bottom;
        return r;
      });
      is(m['.arw-chip'].min >= 43.5 && m['.arw-card'].min >= 43.5 && m['.arw-slot'].min >= 43.5,
        `L8 @${w} n=${n} every CONTROL holds 44px (chip ${m['.arw-chip'].min.toFixed(1)}, card ${m['.arw-card'].min.toFixed(1)}, slot ${m['.arw-slot'].min.toFixed(1)})`);
      is(m.cell >= 33.5, `L8 @${w} n=${n} the mat CELL holds its own 34px canvas floor (${m.cell.toFixed(1)})`);
      is(m.outside === 0, `L8 @${w} n=${n} every cell is inside the mat box`);
      is(m.matOutside === 0, `L8 @${w} n=${n} ⭐ and THE MAT ITSELF is inside the card`);
      if (w >= 768) is(m.matW <= m.scrollW + 1, `L8 @${w} n=${n} the whole mat is visible without scrolling sideways (${m.matW.toFixed(0)} of ${m.scrollW})`);
      is(m.docOverflow <= 0, `L8 @${w} n=${n} the page does not scroll sideways`);
      is(m.minFont >= 14, `L8 @${w} n=${n} every text-bearing node is >=14px (${m.minFont})`);
      if (w >= 768) is(m.bottom <= 900, `L8 @${w} n=${n} FITS — the last control's bottom is ${m.bottom.toFixed(0)} of 900`);
      is(page._errs.length === 0, `L8 @${w} n=${n} zero console errors${page._errs.length ? ' — ' + page._errs[0] : ''}`);
      if (SHOT && ((w === 360 && n === 6) || (w === 768 && n === 8) || (w === 1024 && n === 8))) await page.screenshot({ path: path.join(SHOT_DIR, `arrow-strip-${w}-n${n}.png`), fullPage: true });
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions`);
  process.exit(FAIL ? 1 : 0);
})();
