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

/* ⚠⚠ WAIT ON A SIGNAL, NEVER ON A SLEEP. The run is now STEPPED — one beat
   per card — so a twelve-card rail takes ~5s. Every fixed `wait(360)` in
   this file was written for a run that completed in one frame, and with a
   stepped run they expire mid-journey: the tool then CORRECTLY refuses the
   next clear/drop/Run (`if (self._running) return`), and the gate reads
   that as three wrong trails rather than as its own impatience. The tool
   marks the run with `.arw-mat.arw-running`; wait for it to clear. */
const runRail = async (page) => {
  await page.evaluate(() => document.querySelector('[data-fk="run"]').click());
  await page.waitForFunction(() => !document.querySelector('.arw-mat.arw-running'), { timeout: 20000, polling: 60 });
  await wait(120);
};

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
        await page.evaluate(() => {
          const clear = document.querySelector('[data-fk="clear"]'); if (clear && !clear.disabled) clear.click();
        });
        await wait(150);
        await drop(page, rail);
        await runRail(page);
        const got = await trailPts(page, 'arw-trail');
        const st0 = T.newState();
        const want = T.trailPoints(T.run(st0.pose, rail, st0.n)).map((p) => [p.x, p.y]);
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
      await runRail(page);
      const run1 = await trailPts(page, 'arw-trail');
      is(!!run1 && !(await trailPts(page, 'arw-ghost')), 'L2 the FIRST run leaves no ghost — there is nothing behind it yet');

      /* edit exactly ONE middle card: remove slot 2 (the R) and put an L there */
      await page.evaluate(() => document.querySelectorAll('.arw-place.arw-filled')[2].click());
      await wait(120);
      await page.evaluate(() => { const t = document.querySelectorAll('.arw-card'); t[2].click(); });  /* L appended */
      await wait(120);
      await runRail(page);
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
      await runRail(page);
      const before = await trailPts(page, 'arw-trail');
      const eyeIdx = await page.evaluate(() => Array.from(document.querySelectorAll('.arw-bar .arw-chip')).findIndex((b) => b.textContent.length > 3));
      await page.evaluate((i) => document.querySelectorAll('.arw-bar .arw-chip')[i].click(), eyeIdx);
      await wait(420);
      const after = await trailPts(page, 'arw-trail');
      is(!!after && before.length === after.length && after.every((p, i) => p[0] === before[i][0] && p[1] === before[i][1]),
        'L3 ⭐ the trail is BYTE-IDENTICAL in the beetle\'s frame — nothing is recomputed, the mat is one CSS rotation of the same DOM');
      /* ⚠⚠ THIS ASSERTION USED TO CERTIFY THE DEFECT. It read
         `is(rot.fixed, 'the beetle is fixed dead centre while the world
         turns under it')` — and dead centre is exactly where the beetle
         must NOT be. Every mat is even-sided, so the mat's centre is a
         GRID VERTEX and never a square: the beetle was drawn on the corner
         of four squares in every state, detached from the end of its own
         trail, and this gate was green about it.
         ⭐ ASK IT IN PIXELS. The beetle rides inside the frame, so its
         screen position must be the ROTATED position of its own square —
         a measurement no shared convention can satisfy by accident. */
      const rot = await page.evaluate(() => {
        const f = document.querySelector('.arw-frame');
        const b = document.querySelector('.arw-beetle');
        const box = document.querySelector('.arw-mat');
        const T = window.ArrowStrip;
        const e = T.endPose(T.st), n = T.st.n;
        const mb = box.getBoundingClientRect(), bb = b.getBoundingClientRect();
        const m = new DOMMatrixReadOnly(getComputedStyle(f).transform);
        const deg = Math.round(Math.atan2(m.b, m.a) * 180 / Math.PI);
        const cx = mb.x + mb.width / 2, cy = mb.y + mb.height / 2;
        const px = mb.x + (e.c + 0.5) / n * mb.width, py = mb.y + (e.r + 0.5) / n * mb.height;
        const th = deg * Math.PI / 180;
        return {
          t: getComputedStyle(f).transform,
          deg: deg,
          insideFrame: f.contains(b),
          got: [bb.x + bb.width / 2, bb.y + bb.height / 2],
          want: [cx + (px - cx) * Math.cos(th) - (py - cy) * Math.sin(th),
                 cy + (px - cx) * Math.sin(th) + (py - cy) * Math.cos(th)],
          atBoxCentre: Math.hypot(bb.x + bb.width / 2 - cx, bb.y + bb.height / 2 - cy) < 2
        };
      });
      is(rot.t !== 'none' && rot.t !== '' && rot.deg !== 0, `L3 the mat really is rotated (${rot.deg}deg, a real transform, not a re-layout)`);
      is(rot.insideFrame, 'L3 ⭐ the beetle rides INSIDE the rotating frame — that is what makes the two rotations cancel');
      /* ⚠⚠ AND IT ACTUALLY DRAWS. A bare <use> in a <div> renders nothing,
         and the beetle shipped that way while every measurement here
         stayed green — they all read the DIV's box, which a CSS width
         gives it whether or not anything is painted inside. Assert the
         svg root, the <use>, and a resolved symbol with real geometry. */
      const drawn = await page.evaluate(() => {
        const b = document.querySelector('.arw-beetle');
        const svg = b && b.querySelector('svg');
        const u = svg && svg.querySelector('use');
        if (!u) return { ok: false, why: 'no <use> inside an <svg> root' };
        const sym = document.querySelector(u.getAttribute('href'));
        if (!sym) return { ok: false, why: 'the symbol it points at does not exist' };
        const paths = sym.querySelectorAll('path,circle');
        const box = u.getBBox ? u.getBBox() : null;
        return { ok: paths.length >= 6 && !!box && box.width > 10 && box.height > 10, why: `${paths.length} shapes, bbox ${box && box.width.toFixed(0)}x${box && box.height.toFixed(0)}` };
      });
      is(drawn.ok, `L3 ⭐⭐ the beetle actually PAINTS on the mat — ${drawn.why}`);
      const off = Math.hypot(rot.got[0] - rot.want[0], rot.got[1] - rot.want[1]);
      is(off < 2, `L3 ⭐⭐ the beetle is drawn on its OWN square in the rotated frame (off by ${off.toFixed(2)}px) — build #1 pinned it to the mat centre, which on an even-sided mat is a grid vertex and never a square`);
      is(!rot.atBoxCentre, 'L3 the beetle is NOT parked at the mat centre (the shipped defect, which the old assertion demanded)');
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
      await runRail(page);
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
      const at0 = await page.evaluate(() => { const b = document.querySelector('.arw-beetle').getBoundingClientRect(); return [b.x, b.y]; });
      await drop(page, ['B', 'B', 'B']);
      await runRail(page);
      /* ⚠ A FULLY BLOCKED RUN DRAWS NO LINE, AND THAT IS CORRECT. Nothing
         travelled, so a polyline would be a lie about a journey that did
         not happen. The first version of this check called .every() on the
         missing polyline and CRASHED — reading "no line" as a harness
         error rather than as the honest render. What must be there is the
         start ring, an unmoved beetle, and the persistent per-card mark. */
      const pts = await trailPts(page, 'arw-trail');
      is(pts === null, 'L5 ⭐ three blocked cards travel nowhere, so no trail line is drawn — a zero-length line would be a lie');
      is(await page.evaluate(() => !!document.querySelector('.arw-startdot')), 'L5 the start ring is still drawn, so the square it stands on is marked');
      const at1 = await page.evaluate(() => { const b = document.querySelector('.arw-beetle').getBoundingClientRect(); return [b.x, b.y]; });
      is(Math.abs(at0[0] - at1[0]) < 0.5 && Math.abs(at0[1] - at1[1]) < 0.5,
        `L5 ⭐ the beetle is exactly where it started (${Math.hypot(at0[0] - at1[0], at0[1] - at1[1]).toFixed(2)}px) — it did not move and it did not wrap`);
      /* ⭐ D6: the refusal is NAMED, and the mark PERSISTS after the run —
         build #1 called blocked() from nowhere, so the class predicted a
         square, the beetle was elsewhere, and the tool said nothing. */
      const marks = await page.evaluate(() => document.querySelectorAll('.arw-place.arw-stopped').length);
      is(marks === 3, `L5 ⭐ all three refused cards keep their mark after the run (${marks}/3) — afterwards anyone can point at WHICH card the edge stopped`);
      await page.close();
    }

    /* ---------------- L6 ⭐ LABELS ARE TRUE ---------------- */
    console.log('\nL6 every noun-labelled control does what it says');
    {
      const page = await newPage(browser);
      await open(page, 'en');
      const before = await page.evaluate(() => document.querySelectorAll('.arw-place.arw-filled').length);
      await drop(page, ['F', 'R', 'F']);
      const filled = await page.evaluate(() => document.querySelectorAll('.arw-place.arw-filled').length);
      is(before === 0 && filled === 3, 'L6 tapping the tray puts cards in the rail');
      await runRail(page);
      is(!!(await trailPts(page, 'arw-trail')), 'L6 ⭐ "Run it" RUNS THE RAIL — it does not arm a mode (the "New cards" lesson)');
      /* ⚠ BY HANDLE, NOT BY INDEX. The foot gained a "take the last card
         off" control between Run and Empty, so index [1] silently became a
         DIFFERENT button — and an index-addressed gate does not fail, it
         quietly tests the wrong control. */
      await page.evaluate(() => document.querySelector('[data-fk="clear"]').click());
      await wait(200);
      const emptied = await page.evaluate(() => document.querySelectorAll('.arw-place.arw-filled').length);
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
    const SIDES = {};
    /* ⚠ EVERY MAT SIZE, NOT JUST THE DEFAULT. The sweep only ever opened
       the 6x6 and so could not see that the mat was sized for six columns
       whatever n was — it happened to be right for the default. */
    console.log('\nL8 the sweep — all three mat sizes at every viewport');
    /* ⚠ THE WIDE CELLS CARRY THEIR OWN HEIGHT. This mat is 1:1, so its cap is
       set by the SHORT side of the screen; testing 1400 at the 900px height
       used above would test a tier that does not apply. Each wide entry is
       its tier's exact FLOOR, at all three mat sizes, because the per-grid
       ceilings differ and an 8x8 at the floor is the tightest cell there is. */
    for (const [w, n, hh] of [[320, 4], [320, 6], [320, 8], [360, 6], [412, 8], [768, 8], [1024, 4], [1024, 6], [1024, 8], [1366, 8],
      [1400, 4, 880], [1400, 6, 880], [1400, 8, 880],
      [1800, 6, 1050], [1800, 8, 1050],
      [2400, 6, 1150], [2400, 8, 1150],
      [2560, 4, 1440], [2560, 6, 1440], [2560, 8, 1440]]) {
      const page = await newPage(browser);
      await open(page, 'en', w, hh || 900);
      await page.evaluate((size) => {
        const b = Array.from(document.querySelectorAll('.arw-sizes .arw-chip'));
        const hit = b.find((e) => e.textContent.indexOf(String(size)) === 0);
        if (hit) hit.click();
      }, n);
      await wait(200);
      const cols = await page.evaluate(() => document.querySelectorAll('.arw-cell').length);
      is(cols === n * n, `L8 @${w} n=${n} the mat really has ${n * n} squares (${cols})`);
      await drop(page, ['F', 'F', 'R', 'F']);
      await runRail(page);
      const m = await page.evaluate(() => {
        const r = {};
        /* ⚠ EVERY control class named, never "something has 44px" — an
           or-shaped assertion hid a missing tap floor once already. */
        ['.arw-chip', '.arw-card', '.arw-place.arw-filled'].forEach((s) => {
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
      is(m['.arw-chip'].min >= 43.5 && m['.arw-card'].min >= 43.5 && m['.arw-place.arw-filled'].min >= 43.5,
        `L8 @${w} n=${n} every CONTROL holds 44px (chip ${m['.arw-chip'].min.toFixed(1)}, card ${m['.arw-card'].min.toFixed(1)}, slot ${m['.arw-place.arw-filled'].min.toFixed(1)})`);
      is(m.cell >= 33.5, `L8 @${w} n=${n} the mat CELL holds its own 34px canvas floor (${m.cell.toFixed(1)})`);
      is(m.outside === 0, `L8 @${w} n=${n} every cell is inside the mat box`);
      is(m.matOutside === 0, `L8 @${w} n=${n} ⭐ and THE MAT ITSELF is inside the card`);
      if (w >= 768) is(m.matW <= m.scrollW + 1, `L8 @${w} n=${n} the whole mat is visible without scrolling sideways (${m.matW.toFixed(0)} of ${m.scrollW})`);
      is(m.docOverflow <= 0, `L8 @${w} n=${n} the page does not scroll sideways`);
      is(m.minFont >= 14, `L8 @${w} n=${n} every text-bearing node is >=14px (${m.minFont})`);
      /* ⚠ THIS WAS A HARDCODED 900 while the sweep above now opens each wide
         cell at its tier's real height. A tool fitting a 1440px board
         reported CUT OFF five times. Measure against the viewport the cell
         actually used; below 1400 that IS 900, so no narrow cell moves. */
      const vpH = hh || 900;
      if (w >= 768) is(m.bottom <= vpH, `L8 @${w} n=${n} FITS — the last control's bottom is ${m.bottom.toFixed(0)} of ${vpH}`);
      is(page._errs.length === 0, `L8 @${w} n=${n} zero console errors${page._errs.length ? ' — ' + page._errs[0] : ''}`);
      SIDES[w + 'x' + n] = m.matW;
      if (SHOT && ((w === 360 && n === 6) || (w === 768 && n === 8) || (w === 1024 && n === 8))) await page.screenshot({ path: path.join(SHOT_DIR, `arrow-strip-${w}-n${n}.png`), fullPage: true });
      await page.close();
    }
    /* ------------- L9 ⭐⭐ THE INSTRUMENT IS NOT FROZEN ------------- */
    /* ⚠⚠ THIS EXISTS BECAUSE 211 OF THE ASSERTIONS ABOVE PASSED ON A MAT
       FROZEN AT 372px FROM 1024 ALL THE WAY TO 2560. Every containment,
       tap-floor, canvas-floor, FITS and overflow check is satisfied by an
       instrument that never grows — they all measure whether it fits, and
       none asks whether it USES what it is given. A "not smaller"
       assertion would have passed too. Strict growth, with a margin the
       MECHANISM justifies: the 2560 tier is sized for roughly twice the
       height budget of the 1024 one, so anything under 1.6x means a term
       I did not intend has become the binder — which is exactly how
       screen.availHeight quietly pinned it at 600. */
    console.log('\nL9 the mat actually uses a bigger board');
    [4, 6, 8].forEach((n) => {
      const small = SIDES['1024x' + n], big = SIDES['2560x' + n];
      if (!small || !big) { is(false, `L9 n=${n} the sweep did not measure both ends — the check is vacuous`); return; }
      is(big >= small * 1.6, `L9 ⭐⭐ n=${n} the mat grows ${small.toFixed(0)}px @1024 -> ${big.toFixed(0)}px @2560 (${(big / small).toFixed(2)}x, floor 1.60x)`);
    });
  } finally {
    await browser.close();
    server.close();
  }

  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions`);
  process.exit(FAIL ? 1 : 0);
})();
