#!/usr/bin/env node
/* =====================================================================
   local-test-part-whole-frame.js — the local Definition-of-Done for the
   Number Bonds Board. Nothing here is asserted from source: every claim
   is measured in a real browser against the rendered DOM.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool
   (local-test-heart-words.js:4-8 records the same). SECTION L12 is the
   substitute: the full viewport sweep with measured containment, at
   DESKTOP widths too, not just phone.

     L1  the frame renders; the nest holds the whole; a + b === whole
     L2  a real pointer drag carries EXACTLY one, and the nest never moves
     L3  ⭐ THE SWALLOWED TAP — after a completed drag-carry, the very next
         TAP must still work. The old build reset its drag flag inside a
         click handler on a node render() had already destroyed.
     L4  a drag released short of the seam changes nothing
     L5  ⭐ THE LEGS TOUCH THE TRAYS — measured, at every width. Nothing in
         any previous gate asked whether a line reached the thing it
         pointed at, and for months it did not.
     L6  ⭐ THE TWO TRAYS ARE THE SAME SIZE — measured, in four locales.
         They were flex items sized by their own content and so differed
         in every language.
     L7  ⭐ A CLOTH DOES NOT MOVE THE BOARD — measured before and after.
     L8  the covers remove the count from the DOM, not just from view; the
         two-tone nest goes neutral; the voice and the live region go
         silent; the notation shows `?`
     L9  colour, shape and tone actually change the rendered counters
     L10 free vs subscriber: the band chip is ABSENT not disabled, the
         record and print DOM, and the exact gate CTA
     L11 keyboard parity, the record row puts a split back, soft chime
     L12 the sweep 320-2560: FITS at desktop, reachable below, taps >=44,
         text >=14px, no overflow, the card fills a desktop viewport,
         zero console errors

   Usage: node scripts/local-test-part-whole-frame.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'part-whole-frame', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900], [1920, 950], [2560, 1300]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (cond, m) => cond ? ok(m) : bad(m);

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(MINI, path.basename(p) || 'index.html');
    fs.readFile(file, (e, buf) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(buf);
    });
  });
}

async function newPage(browser, o) {
  o = o || {};
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    if (r.url().includes('/api/auth/me')) {
      return r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      });
    }
    r.continue();
  });
  await page.evaluateOnNewDocument((premium) => {
    window.__notes = [];
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && AC.prototype.createOscillator) {
      const orig = AC.prototype.createOscillator;
      AC.prototype.createOscillator = function () {
        const osc = orig.call(this);
        const st = osc.start.bind(osc);
        osc.start = function (...a) { try { window.__notes.push({ type: osc.type, hz: osc.frequency && osc.frequency.value }); } catch (_) {} return st(...a); };
        return osc;
      };
    }
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
  }, !!o.premium);
  page._errs = [];
  const benign = (t) => /404|net::ERR|Failed to load resource/.test(t);
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const ready = async (p) => { await p.waitForSelector('.pwf-wrap', { timeout: 8000 }); await new Promise(r => setTimeout(r, 320)); };
const spy = (p) => p.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = (o) => window.__spoken.push(o); });
const settle = (ms) => new Promise(r => setTimeout(r, ms || 320));

/* the measured DOM snapshot — one evaluate, no source reading */
const state = (p) => p.evaluate(() => {
  const n = (sel) => document.querySelectorAll(sel).length;
  const txt = (sel) => { const e = document.querySelector(sel); return e ? e.textContent.trim() : null; };
  return {
    wrap: n('.pwf-wrap'),
    wholeDots: n('.pwf-box-whole .pwf-dot'),
    aDots: n('.pwf-box-a .pwf-dot'),
    bDots: n('.pwf-box-b .pwf-dot'),
    headVal: txt('.pwf-headval'),
    covered: n('.pwf-covered'), cloths: n('.pwf-cloth'),
    partCovered: n('.pwf-partcovered'),
    ways: n('.pwf-wayrow'), waysBox: n('.pwf-ways'),
    printMat: n('.pwf-printmat'), printWays: n('.pwf-printways'),
    locked: n('.pwf-locked'), gate: n('.pwf-gate'),
    gateHref: (document.querySelector('.pwf-gate a') || {}).href || null,
    notation: txt('.pwf-notation'),
    quick: Array.from(document.querySelectorAll('.pwf-quickbtn')).map(e => e.textContent.trim()),
    body: document.body.innerText
  };
});

/* ⚠ A SCRIPTED INTERACTION THAT SILENTLY DOES NOTHING HOLLOWS OUT THE
   NEXT ASSERTION — the recorded Lids defect, where a click helper hit a
   legitimately-disabled control, returned false, and the very next check
   ("the toggle is not swapped") passed because nothing had been toggled.
   Every helper here THROWS when it does not happen. */
async function dragBetween(page, fromSel, toSel, opts) {
  opts = opts || {};
  const box = await page.evaluate((f, t) => {
    const a = document.querySelector(f), b = document.querySelector(t);
    if (!a || !b) return null;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    return { x1: ra.left + ra.width / 2, y1: ra.top + ra.height / 2, x2: rb.left + rb.width / 2, y2: rb.top + rb.height / 2 };
  }, fromSel, toSel);
  if (!box) throw new Error(`dragBetween: ${fromSel} -> ${toSel} — one of them is not in the DOM`);
  const frac = opts.frac === undefined ? 1 : opts.frac;
  await page.mouse.move(box.x1, box.y1);
  await page.mouse.down();
  let ghost = null;
  for (let i = 1; i <= 6; i++) {
    await page.mouse.move(box.x1 + (box.x2 - box.x1) * frac * i / 6, box.y1 + (box.y2 - box.y1) * frac * i / 6);
    if (i === 3 && opts.measureGhost) {
      ghost = await page.evaluate(() => {
        const g = document.querySelector('.pwf-ghost');
        if (!g) return null;
        const r = g.getBoundingClientRect();
        const d = document.querySelector('.pwf-box-b .pwf-dot') || document.querySelector('.pwf-dot');
        const dr = d ? d.getBoundingClientRect() : null;
        return { w: Math.round(r.width), h: Math.round(r.height), dotW: dr ? Math.round(dr.width) : null };
      });
    }
  }
  await page.mouse.up();
  await settle(360);
  return ghost;
}

async function clickSel(page, sel) {
  const hit = await page.evaluate((s) => {
    const e = document.querySelector(s);
    if (!e) return 'missing';
    if (e.disabled) return 'disabled';
    e.click();
    return 'ok';
  }, sel);
  if (hit !== 'ok') throw new Error(`clickSel: ${sel} was ${hit} — the interaction did not happen`);
  await settle(260);
}

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------- L1 the frame renders ---------------- */
  console.log('[L1 the frame]');
  let page = await newPage(browser, {});
  await page.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(page);
  let s = await state(page);
  const whole = parseInt(s.headVal, 10);
  is(s.wrap === 1, 'the frame mounted');
  is(whole >= 2 && whole <= 10, `today's whole is inside the free band (${whole})`);
  is(s.wholeDots === whole, `the nest holds the whole (${s.wholeDots} = ${whole})`);
  is(s.aDots + s.bDots === whole, `the parts sum to the whole (${s.aDots} + ${s.bDots} = ${whole})`);
  is(s.quick.join(',') === '5,10', `free: quick-set chips are 5 and 10 only (${s.quick.join(',')})`);

  /* ---------------- L2 carry ---------------- */
  console.log('[L2 carrying one across]');
  await page.evaluate(() => { window.PartWholeFrame._setWhole(8); });
  await settle(320);
  s = await state(page);
  const before = { a: s.aDots, b: s.bDots, nest: s.wholeDots };
  const ghost = await dragBetween(page, '.pwf-box-a .pwf-dish', '.pwf-box-b .pwf-dish', { measureGhost: true });
  let s2 = await state(page);
  is(s2.aDots === before.a - 1 && s2.bDots === before.b + 1, `exactly one counter crossed (${before.a}/${before.b} -> ${s2.aDots}/${s2.bDots})`);
  is(s2.wholeDots === before.nest, 'THE WHOLE NEVER CHANGED');
  is(s2.aDots + s2.bDots === 8, 'conservation holds in the DOM after the carry');
  /* ⭐ the ghost is ONE COUNTER. The old build built it from the DISH's
     rect and hard-coded a coral circle: a ~158x105px orange ellipse
     followed the finger through the one gesture the tool teaches. */
  is(ghost !== null, 'a drag ghost exists mid-gesture');
  if (ghost) is(Math.abs(ghost.w - ghost.dotW) <= 2 && Math.abs(ghost.h - ghost.dotW) <= 2,
    `the ghost is one counter, not the tray (${ghost.w}x${ghost.h} vs a ${ghost.dotW}px counter)`);

  /* ---------------- L3 ⭐ THE SWALLOWED TAP ---------------- */
  console.log('[L3 the tap after a drag]');
  const t0 = await state(page);
  await clickSel(page, '.pwf-box-a .pwf-dish-live');
  const t1 = await state(page);
  is(t1.aDots === t0.aDots - 1,
    `a TAP right after a completed drag still carries (${t0.aDots} -> ${t1.aDots}) — the drag flag was released`);
  await clickSel(page, '.pwf-box-b .pwf-dish-live');
  const t2 = await state(page);
  is(t2.bDots === t1.bDots - 1, `and the return tap works too (${t1.bDots} -> ${t2.bDots})`);

  /* ---------------- L4 released short of the seam ---------------- */
  console.log('[L4 nowhere else to drop]');
  const s4a = await state(page);
  await dragBetween(page, '.pwf-box-a .pwf-dish', '.pwf-box-b .pwf-dish', { frac: 0.25 });
  let s4 = await state(page);
  is(s4.aDots === s4a.aDots && s4.bDots === s4a.bDots, 'a drag released short of the seam changed nothing');
  await dragBetween(page, '.pwf-box-a .pwf-dish', '.pwf-box-whole .pwf-dish');
  s4 = await state(page);
  is(s4.wholeDots === 8, 'the nest is not a place — a drag at it changed nothing');

  /* ---------------- L4b ⭐ THE RENDERER OBEYS ITS OWN MODEL ----------------
     slot() is the most-verified function in the tool — pairwise, banded,
     stable, with a gate section of its own — and the first build of this
     renderer never called it, so the counters fell into DOM order and a
     whole of six drew as FIVE-AND-ONE: the exact five-structure the
     arrangement exists to refuse. Every gate was green, because every gate
     was measuring the MODEL and nothing was measuring whether the renderer
     obeyed it.

     ⚠ SO THIS ASKS IT IN PIXELS. Re-deriving slot() here and comparing
     would put the same convention on both sides of the comparison, and two
     wrong things that agree look exactly like two right things that agree
     (the recorded mirrored-profile lesson). The question asked is the
     geometric one: are the counters in COLUMN PAIRS? */
  console.log('[L4b the arrangement, measured in pixels]');
  await page.evaluate(() => { window.PartWholeFrame.api.settings.tone = 'two'; window.PartWholeFrame.render(); });
  await settle(320);
  for (const w of [6, 7, 10]) {
    await page.evaluate((n) => { window.PartWholeFrame._setWhole(n); }, w);
    await settle(380);
    const g = await page.evaluate(() => {
      const dots = Array.from(document.querySelectorAll('.pwf-box-whole .pwf-dot'));
      return dots.map(d => {
        const r = d.getBoundingClientRect();
        return { x: Math.round(r.left), y: Math.round(r.top), bg: getComputedStyle(d).backgroundColor };
      });
    });
    if (g.length !== w) { bad(`whole ${w}: nest holds ${g.length}`); continue; }
    const cols = [...new Set(g.map(p => p.x))].sort((a, b) => a - b);
    const rows = [...new Set(g.map(p => p.y))].sort((a, b) => a - b);
    const expCols = Math.ceil(w / 2), expRows = Math.ceil(w / expCols);
    /* the first two counters are side by side in the SAME row — this is
       what fails when the renderer ignores slot() and DOM order wraps at
       whatever width the track template happens to be */
    is(g[0].y === g[1].y && g[0].x !== g[1].x,
      `whole ${w}: the first two counters are side by side (y ${g[0].y}=${g[1].y}, x ${g[0].x}!=${g[1].x})`);
    is(rows.length === expRows, `whole ${w}: ${rows.length} rows of counters`);
    is(cols.length === expCols, `whole ${w}: ${cols.length} columns, which is ceil(${w}/2)`);
    /* ⚠ the tray is no wider than it needs: three counters against the
       left edge of a five-column tray reads as a bug, not a quantity */
    const fit = await page.evaluate(() => {
      const cs = getComputedStyle(document.querySelector('.pwf-box-whole .pwf-dish'));
      return { tracks: cs.gridTemplateColumns.split(' ').filter(Boolean).length };
    });
    is(fit.tracks === expCols, `whole ${w}: the tray declares ${fit.tracks} columns, exactly what it needs`);
    /* ⭐⭐ THE THESIS, IN PIXELS: read the nest left-to-right, top-to-bottom
       and the two colours must form exactly TWO UNBROKEN RUNS. Column-major
       pairs passed every model check and put the boundary on a DIAGONAL —
       coral,coral,ink over coral,ink,ink — which is not a run, and only
       looking at the render caught it. This asks the question the way the
       eye asks it. */
    const reading = g.slice().sort((p, q) => p.y - q.y || p.x - q.x).map(p => p.bg);
    let runs = 1;
    for (let i = 1; i < reading.length; i++) if (reading[i] !== reading[i - 1]) runs++;
    is(runs <= 2, `whole ${w}: two-tone reads as ${runs} unbroken run(s) in reading order — the boundary is a cut, not a diagonal`);
  }
  await page.evaluate(() => { window.PartWholeFrame.api.settings.tone = 'one'; window.PartWholeFrame._setWhole(8); });
  await settle(340);

  /* ---------------- L5 ⭐ THE LEGS TOUCH THE TRAYS ---------------- */
  console.log('[L5 the connectors reach what they point at]');
  const legAt = (p) => p.evaluate(() => {
    const svg = document.querySelector('.pwf-legs');
    const sheet = document.querySelector('.pwf-sheet');
    const nest = document.querySelector('.pwf-box-whole .pwf-dish');
    const ta = document.querySelector('.pwf-box-a .pwf-dish');
    const tb = document.querySelector('.pwf-box-b .pwf-dish');
    if (!svg || !sheet || !nest || !ta || !tb) return null;
    const lines = Array.from(svg.querySelectorAll('line'));
    if (lines.length !== 2) return { lines: lines.length };
    const S = sheet.getBoundingClientRect();
    const foot = (l) => ({ x: parseFloat(l.getAttribute('x2')) + S.left, y: parseFloat(l.getAttribute('y2')) + S.top });
    const head = (l) => ({ x: parseFloat(l.getAttribute('x1')) + S.left, y: parseFloat(l.getAttribute('y1')) + S.top });
    const A = ta.getBoundingClientRect(), B = tb.getBoundingClientRect(), N = nest.getBoundingClientRect();
    return {
      lines: 2,
      aDx: Math.abs(foot(lines[0]).x - (A.left + A.width / 2)), aDy: Math.abs(foot(lines[0]).y - A.top),
      bDx: Math.abs(foot(lines[1]).x - (B.left + B.width / 2)), bDy: Math.abs(foot(lines[1]).y - B.top),
      apexDy: Math.abs(head(lines[0]).y - document.querySelector('.pwf-box-whole').getBoundingClientRect().bottom),
      svgW: Math.round(svg.getBoundingClientRect().width), sheetW: Math.round(S.width)
    };
  });
  for (const [w, h] of [[360, 740], [1024, 900], [1920, 950], [2560, 1300]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await settle(420);
    const L = await legAt(page);
    if (!L || L.lines !== 2) { bad(`${w}: expected two legs, found ${L ? L.lines : 'no svg'}`); continue; }
    const worst = Math.max(L.aDx, L.bDx, L.aDy, L.bDy);
    is(worst <= 3, `${w}px: both legs land on their tray (worst miss ${worst.toFixed(1)}px)`);
    is(L.apexDy <= 3, `${w}px: the apex sits on the nest (${L.apexDy.toFixed(1)}px)`);
    is(Math.abs(L.svgW - L.sheetW) <= 2, `${w}px: the legs span the whole sheet (${L.svgW} vs ${L.sheetW})`);
  }
  /* ---------------- L5b ⭐ NOTHING OVERLAPS ANYTHING ----------------
     Every other measurement in this file compares ONE box against a floor
     or a ceiling. None of them asks whether two rendered things COLLIDE —
     and the peg first shipped sitting on the third counter of every tray
     and through the nest's caption, which every containment check passed
     happily. That defect was found by eye. This is the gate for it. */
  console.log('[L5b nothing overlaps anything]');
  const collisions = (p) => p.evaluate(() => {
      const R = (e) => e.getBoundingClientRect();
      const overlap = (a, b) => {
        const x = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return (x > 1 && y > 1) ? Math.round(Math.min(x, y)) : 0;
      };
      /* ⚠ NON-OVERLAP IS NOT THE SAME AS CLEARANCE. Two things can miss
         each other by a pixel and still read as one object — the peg sat
         flush against the numeral on a phone and every overlap check was
         happy. Require a real gap, and measure it. */
      const CLEAR = 8;
      const gapX = (a, b) => (b.left >= a.right) ? b.left - a.right : (a.left >= b.right ? a.left - b.right : -1);
      const pegs = Array.from(document.querySelectorAll('.pwf-peg'));
      const material = Array.from(document.querySelectorAll('.pwf-dot,.pwf-cap,.pwf-num,.pwf-headval,.pwf-dish'));
      const out = [];
      pegs.forEach((p, i) => {
        material.forEach((m) => {
          /* the peg legitimately sits inside its own foot row; the
             collision that matters is with the MATERIAL and the TEXT */
          if (m.contains(p) || p.contains(m)) return;
          const d = overlap(R(p), R(m));
          if (d) { out.push(`peg${i} OVERLAPS ${m.className.split(' ')[0]} by ${d}px`); return; }
          if (!m.textContent.trim() && !m.classList.contains('pwf-dot')) return;
          const g = gapX(R(p), R(m));
          const sameRow = Math.min(R(p).bottom, R(m).bottom) - Math.max(R(p).top, R(m).top) > 2;
          if (sameRow && g >= 0 && g < CLEAR) out.push(`peg${i} is only ${Math.round(g)}px from ${m.className.split(' ')[0]}`);
        });
      });
      /* and the connectors must not run through the numerals */
      const svg = document.querySelector('.pwf-legs');
      if (svg) {
        const S = document.querySelector('.pwf-sheet').getBoundingClientRect();
        Array.from(svg.querySelectorAll('line')).forEach((l, i) => {
          const y1 = parseFloat(l.getAttribute('y1')) + S.top;
          Array.from(document.querySelectorAll('.pwf-box-whole .pwf-num')).forEach((n) => {
            const r = R(n);
            if (r.height > 2 && y1 < r.bottom - 2) out.push(`leg${i} starts ${Math.round(r.bottom - y1)}px above the bottom of the whole's numeral`);
          });
        });
      }
      return out;
  });
  for (const [w, h] of [[360, 740], [768, 1000], [1366, 900], [2560, 1300]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await settle(400);
    const hits = await collisions(page);
    is(hits.length === 0, `${w}px: no two rendered things collide${hits.length ? ' — ' + hits.slice(0, 3).join('; ') : ''}`);
  }
  /* ⭐ POISON IT IN PLACE. A probe that has only ever returned an empty
     list is indistinguishable from a probe that cannot return anything.
     Re-impose the peg's ORIGINAL geometry — pinned to the container's
     top-right corner, which is where it sat on the third counter of every
     tray — and require the probe to see it. */
  await page.setViewport({ width: 768, height: 1000, deviceScaleFactor: 1 });
  await settle(360);
  const poisonTag = await page.addStyleTag({
    content: '.pwf-peg{top:-8px !important;transform:none !important;inset-inline-end:-8px !important;position:absolute !important;}'
      + '.pwf-foot{position:static !important;}'
  });
  await settle(320);
  const poisoned = await collisions(page);
  is(poisoned.length > 0, `poison: the collision probe SEES the original corner-pinned peg (${poisoned.length} overlap(s), e.g. ${poisoned[0] || 'none'})`);
  await page.evaluate((h) => { const e = document.querySelector('style[data-poison]'); if (e) e.remove(); }, null);
  await poisonTag.evaluate((n) => n.remove());
  await settle(320);
  const cleared = await collisions(page);
  is(cleared.length === 0, 'poison removed: the probe goes quiet again');
  await page.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await settle(360);

  /* ---------------- L6 ⭐ THE TWO TRAYS ARE THE SAME SIZE ---------------- */
  console.log('[L6 two co-equal trays]');
  for (const loc of ['en', 'de', 'sv', 'fi']) {
    const p6 = await newPage(browser, {});
    await p6.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
    await p6.goto(`${BASE}/part-whole-frame.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await ready(p6);
    /* the worst case is a lopsided split in a long locale: one tray holds
       a two-digit count and the other holds one digit */
    await p6.evaluate(() => {
      const T = window.PartWholeFrame;
      T._setWhole(10);
      for (let i = 0; i < 4; i++) T._carry('toB');
    });
    await settle(500);
    const t = await p6.evaluate(() => {
      const a = document.querySelector('.pwf-box-a .pwf-dish').getBoundingClientRect();
      const b = document.querySelector('.pwf-box-b .pwf-dish').getBoundingClientRect();
      const ba = document.querySelector('.pwf-box-a').getBoundingClientRect();
      const bb = document.querySelector('.pwf-box-b').getBoundingClientRect();
      return { aw: a.width, bw: b.width, ah: a.height, bh: b.height, boxA: ba.width, boxB: bb.width,
        aN: document.querySelectorAll('.pwf-box-a .pwf-dot').length,
        bN: document.querySelectorAll('.pwf-box-b .pwf-dot').length };
    });
    is(Math.abs(t.aw - t.bw) <= 1 && Math.abs(t.ah - t.bh) <= 1,
      `${loc}: the trays are identical holding ${t.aN} and ${t.bN} (${t.aw.toFixed(1)}x${t.ah.toFixed(1)} vs ${t.bw.toFixed(1)}x${t.bh.toFixed(1)})`);
    is(Math.abs(t.boxA - t.boxB) <= 1, `${loc}: the two columns are equal (${t.boxA.toFixed(1)} vs ${t.boxB.toFixed(1)})`);
    await p6.close();
  }

  /* ---------------- L7 ⭐ A CLOTH DOES NOT MOVE THE BOARD ---------------- */
  console.log('[L7 covering does not move anything]');
  const geom = (p) => p.evaluate(() => {
    const g = (s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), t: Math.round(r.top) }; };
    return { sheet: g('.pwf-sheet'), a: g('.pwf-box-a .pwf-dish'), b: g('.pwf-box-b .pwf-dish'), nest: g('.pwf-box-whole .pwf-dish') };
  });
  const g0 = await geom(page);
  await clickSel(page, '.pwf-box-a .pwf-peg');
  const g1 = await geom(page);
  is(g1.a.h === g0.a.h && g1.b.h === g0.b.h && g1.b.t === g0.b.t,
    `covering a part left every tray where it was (${g0.a.h}px -> ${g1.a.h}px, sibling top ${g0.b.t} -> ${g1.b.t})`);
  is(g1.sheet.h === g0.sheet.h, `and the sheet did not change height (${g0.sheet.h} -> ${g1.sheet.h})`);
  await clickSel(page, '.pwf-box-a .pwf-peg');

  /* ---------------- L8 the covers hold in every channel ---------------- */
  console.log('[L8 the three cloths]');
  for (const which of ['whole', 'a', 'b']) {
    await clickSel(page, `.pwf-box-${which} .pwf-peg`);
    const c = await page.evaluate((w) => {
      const box = document.querySelector('.pwf-box-' + w);
      return {
        dots: box.querySelectorAll('.pwf-dot').length,
        num: box.querySelector('.pwf-num').textContent.trim(),
        cloth: box.querySelectorAll('.pwf-cloth').length,
        pressed: box.querySelector('.pwf-peg').getAttribute('aria-pressed'),
        pegLabel: box.querySelector('.pwf-peg').getAttribute('aria-label'),
        live: !!box.querySelector('.pwf-dish-live')
      };
    }, which);
    is(c.cloth === 1 && c.dots === 0 && c.num === '',
      `cover ${which}: counters and numeral are OUT of the DOM, not hidden`);
    is(c.pressed === 'true' && !!c.pegLabel, `cover ${which}: the peg states its own state ("${c.pegLabel}")`);
    if (which !== 'whole') is(c.live, `cover ${which}: the tray is STILL a live source under the cloth`);
    await clickSel(page, `.pwf-box-${which} .pwf-peg`);
  }
  const p8 = await newPage(browser, {});
  await p8.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await p8.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(p8);
  await spy(p8);
  await p8.evaluate(() => { window.PartWholeFrame.api.settings.notation = 'sum'; window.PartWholeFrame._setWhole(8); });
  await settle(320);
  await clickSel(p8, '.pwf-box-b .pwf-peg');
  await p8.evaluate(() => { window.__spoken = []; window.PartWholeFrame._carry('toB'); });
  await settle(800);
  const hidden = await p8.evaluate(() => ({
    spoken: (window.__spoken || []).map(x => x.text).join(' | '),
    live: (document.querySelector('.lcs-sr-only') || {}).textContent || '',
    notation: (document.querySelector('.pwf-notation') || {}).textContent || ''
  }));
  is(hidden.spoken === '', `the spoken split is SILENT while a cloth is down (said: "${hidden.spoken}")`);
  is(hidden.live.trim() === '', `the live region is silent too (said: "${hidden.live.trim()}")`);
  is(hidden.notation.indexOf('?') !== -1, `the notation shows the cloth as ? (${hidden.notation})`);
  /* two-tone: the nest must not answer "how many are hiding" for free */
  await p8.evaluate(() => { window.PartWholeFrame.api.settings.tone = 'two'; window.PartWholeFrame.render(); });
  await settle(340);
  const neutral = await p8.evaluate(() => {
    const dots = Array.from(document.querySelectorAll('.pwf-box-whole .pwf-dot'));
    return { n: dots.length, distinct: new Set(dots.map(d => getComputedStyle(d).backgroundColor)).size,
             partCovered: document.querySelectorAll('.pwf-partcovered').length };
  });
  is(neutral.partCovered === 1, 'the part-covered state is marked on the sheet');
  is(neutral.distinct === 1, `the two-tone nest goes NEUTRAL under a cloth (${neutral.distinct} colour across ${neutral.n} counters)`);
  await clickSel(p8, '.pwf-box-b .pwf-peg');
  await settle(340);
  const shown = await p8.evaluate(() => {
    const dots = Array.from(document.querySelectorAll('.pwf-box-whole .pwf-dot'));
    return { distinct: new Set(dots.map(d => getComputedStyle(d).backgroundColor)).size };
  });
  is(shown.distinct === 2, `and the boundary comes back when the cloth comes off (${shown.distinct} colours)`);
  const nb = await p8.evaluate(() => document.querySelectorAll('.pwf-box-whole .pwf-dot').length);
  await p8.evaluate(() => { window.PartWholeFrame._carry('toB'); });
  await settle(420);
  const na = await p8.evaluate(() => document.querySelectorAll('.pwf-box-whole .pwf-dot').length);
  is(nb === na, `two-tone: a carry changes a COAT, never the length of the nest (${nb} -> ${na})`);
  await p8.close();

  /* ⭐ THE RECORD IS A FOURTH CHANNEL. The row showing the split currently
     on the board IS the answer to "how many are hiding", so it has to go
     blind with everything else. Found by looking at the covered render;
     the voice, the live region and the nest were all already handled and
     this one was not. */
  console.log('[L8b the record does not leak the hidden split]');
  const p8b = await newPage(browser, { premium: true });
  await p8b.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });
  await p8b.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(p8b);
  await settle(360);
  await p8b.evaluate(() => { const T = window.PartWholeFrame; T.api.settings.tone = 'two'; T._setWhole(6); T._carry('toB'); });
  await settle(420);
  const openRec = await p8b.evaluate(() => {
    const cur = document.querySelector('.pwf-wayrow[aria-current="true"]');
    return { nums: cur ? cur.querySelectorAll('.pwf-waycell').length : -1,
             colours: cur ? new Set(Array.from(cur.querySelectorAll('.pwf-dot')).map(d => getComputedStyle(d).backgroundColor)).size : -1 };
  });
  is(openRec.nums === 2 && openRec.colours === 2, `uncovered: the current row shows both numerals and the boundary (${openRec.nums} numerals, ${openRec.colours} colours)`);
  await clickSel(p8b, '.pwf-box-a .pwf-peg');
  await settle(400);
  const blindRec = await p8b.evaluate(() => {
    const cur = document.querySelector('.pwf-wayrow[aria-current="true"]');
    const others = Array.from(document.querySelectorAll('.pwf-wayrow')).filter(r => !r.hasAttribute('aria-current'));
    return {
      nums: cur ? cur.querySelectorAll('.pwf-waycell').length : -1,
      colours: cur ? new Set(Array.from(cur.querySelectorAll('.pwf-dot')).map(d => getComputedStyle(d).backgroundColor)).size : -1,
      label: cur ? cur.getAttribute('aria-label') : '',
      othersBlind: others.every(r => r.querySelectorAll('.pwf-waycell').length === 0
        && !/\d/.test(r.getAttribute('aria-label') || '')),
      othersN: others.length
    };
  });
  is(blindRec.nums === 0, `covered: the current row's numerals are GONE (${blindRec.nums})`);
  is(blindRec.colours === 1, `covered: the current row shows no colour boundary (${blindRec.colours} colour)`);
  is(!/\d/.test(blindRec.label || ''), `covered: the row's accessible name carries no numbers ("${blindRec.label}")`);
  /* ⭐ THE WHOLE RECORD, NOT JUST THE CURRENT ROW. The first version of
     this assertion required the opposite — that earlier rows stay legible,
     on the argument that reasoning from history is the lesson. A native
     panel produced the counter-example: cover a part, carry ONCE, and the
     row recorded a moment ago states the answer to within one subtraction
     the class just watched. That is reading, not reasoning. */
  is(blindRec.othersBlind, `covered: EVERY row is blind, not just the current one (${blindRec.othersN} earlier rows)`);
  await p8b.close();

  /* ---------------- L9 colour, shape and tone are real ---------------- */
  console.log('[L9 the counter is what the teacher chose]');
  const p9 = await newPage(browser, {});
  await p9.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await p9.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(p9);
  const look = () => p9.evaluate(() => {
    const d = document.querySelector('.pwf-box-a .pwf-dot');
    if (!d) return null;
    const cs = getComputedStyle(d);
    return { edge: cs.backgroundColor, clip: cs.clipPath, radius: cs.borderRadius };
  });
  const base = await look();
  for (const sh of ['tile', 'heart', 'star']) {
    await p9.evaluate((v) => { window.PartWholeFrame.api.settings.shape = v; window.PartWholeFrame.render(); }, sh);
    await settle(240);
    const l = await look();
    if (sh === 'tile') is(l.radius !== base.radius, `shape ${sh}: the silhouette changed (radius ${base.radius} -> ${l.radius})`);
    else is(l.clip && l.clip !== 'none' && l.clip !== base.clip, `shape ${sh}: a real clip-path silhouette`);
  }
  await p9.evaluate(() => { window.PartWholeFrame.api.settings.shape = 'disc'; window.PartWholeFrame.render(); });
  const seen = new Set();
  for (const sc of ['coral-ink', 'violet-amber', 'ink-bone']) {
    await p9.evaluate((v) => { window.PartWholeFrame.api.settings.scheme = v; window.PartWholeFrame.render(); }, sc);
    await settle(240);
    seen.add((await look()).edge);
  }
  is(seen.size === 3, `all three colour schemes render distinctly (${seen.size} distinct counter edges)`);
  const trayPair = () => p9.evaluate(() => {
    const a = document.querySelector('.pwf-box-a .pwf-dot'), b = document.querySelector('.pwf-box-b .pwf-dot');
    return a && b ? [getComputedStyle(a).backgroundColor, getComputedStyle(b).backgroundColor] : null;
  });
  await p9.evaluate(() => { window.PartWholeFrame.api.settings.tone = 'one'; window.PartWholeFrame.render(); });
  await settle(220);
  let tp = await trayPair();
  is(tp && tp[0] === tp[1], `one-tone: both trays wear the same coat (${tp && tp[0]})`);
  await p9.evaluate(() => { window.PartWholeFrame.api.settings.tone = 'two'; window.PartWholeFrame.render(); });
  await settle(220);
  tp = await trayPair();
  is(tp && tp[0] !== tp[1], `two-tone: the two trays are told apart (${tp && tp.join(' vs ')})`);
  await p9.close();

  /* ---------------- L9b ⭐ THE DRAWER, WHICH NOTHING HAD EVER OPENED ----------------
     Four native panels found that the colour picker shipped THREE BLANK
     CHIPS: the option value was the scheme KEY and the shell renders a
     colour chip as `style.background = value`, so it was assigning
     'coral-ink'. The operator's headline ask, dead on arrival.
     Nothing here caught it because L9 sets the setting programmatically —
     the gate drove the model and never looked at the control. */
  console.log('[L9b the settings drawer is real]');
  const p9b = await newPage(browser, { premium: true });
  await p9b.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await p9b.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(p9b);
  await settle(360);
  const drawer = await p9b.evaluate(() => {
    const btn = document.querySelector('.lcs-ctrl');
    if (!btn) return { fatal: 'no settings button' };
    btn.click();
    const fields = Array.from(document.querySelectorAll('.lcs-field'));
    if (!fields.length) return { fatal: 'the drawer built no fields' };
    return {
      fields: fields.length,
      swatches: Array.from(document.querySelectorAll('.lcs-swatch'))
        .map(e => getComputedStyle(e).backgroundImage),
      unchecked: fields.filter(f => f.querySelectorAll('.lcs-chip').length
        && !f.querySelector('[aria-checked="true"]')).map(f => f.querySelector('label').textContent)
    };
  });
  if (drawer.fatal) bad(`the drawer: ${drawer.fatal}`);
  else {
    is(drawer.fields >= 6, `the drawer builds every settings field (${drawer.fields})`);
    is(drawer.swatches.length === 3, `three colour swatches (${drawer.swatches.length})`);
    /* ⭐ a swatch must carry an actual paint. `background:'coral-ink'` is
       not a colour, and a blank chip is what shipped. */
    is(drawer.swatches.every(b => /gradient|rgb/.test(b)),
      `every swatch shows a real colour pair (${drawer.swatches.map(b => b.slice(0, 24)).join(' | ')})`);
    is(new Set(drawer.swatches).size === 3, 'the three swatches are visibly different from one another');
    /* and the stored value must match the option value, or no chip is ever
       marked — the trap in the two-line fix */
    is(drawer.unchecked.length === 0,
      `every choice field has a chip marked selected${drawer.unchecked.length ? ' — ' + drawer.unchecked.join(', ') : ''}`);
  }
  await p9b.close();

  /* ---------------- L9c ⭐ WHAT ACTUALLY REACHES PAPER, IN BOTH TIERS ----------------
     Gating the CHIP is not gating the FEATURE — the recorded
     fraction-kitchen defect, back. The printed pages are built only for a
     subscriber while the print stylesheet hid the whole screen for
     everyone, so a free Ctrl+P produced a blank sheet. */
  console.log('[L9c the printed page, free and paid]');
  for (const tier of ['free', 'premium']) {
    const pp = await newPage(browser, { premium: tier === 'premium' });
    await pp.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
    await pp.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
    await ready(pp);
    await settle(400);
    await pp.emulateMediaType('print');
    await settle(300);
    const paper = await pp.evaluate(() => {
      const vis = (e) => { if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && getComputedStyle(e).display !== 'none'; };
      const ink = Array.from(document.querySelectorAll('.pwf-sheet *,.pwf-printmat *,.pwf-printways *')).filter(vis).length;
      return { board: vis(document.querySelector('.pwf-sheet')), mat: vis(document.querySelector('.pwf-printmat')), ink };
    });
    await pp.emulateMediaType(null);
    if (tier === 'free') {
      is(paper.board && !paper.mat, 'free: Ctrl+P prints the board it can see — not a blank sheet');
    } else {
      is(paper.mat && !paper.board, 'subscriber: Ctrl+P prints the mat, and the screen board is hidden');
    }
    is(paper.ink > 10, `${tier}: something actually reaches paper (${paper.ink} visible nodes)`);
    await pp.close();
  }

  /* ---------------- L10 free vs subscriber ---------------- */
  console.log('[L10 free and subscriber]');
  const free = await newPage(browser, { premium: false });
  await free.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await free.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(free);
  let fs1 = await state(free);
  is(fs1.waysBox === 0, 'free: the all-ways record is not built');
  is(fs1.printMat === 0 && fs1.printWays === 0, 'free: the print DOM does not exist');
  is(fs1.locked >= 1, 'free: the paid controls are marked, not merely disabled');
  const bandOpts = await free.evaluate(() => window.PartWholeFrame.settings.find(s => s.key === 'band').options.slice());
  is(bandOpts.indexOf('20') === -1, `free: the 20 band chip is ABSENT from the drawer (${bandOpts.join(',')})`);
  await free.evaluate(() => { window.PartWholeFrame._setWhole(14); });
  await settle(260);
  let fs2 = await state(free);
  is(parseInt(fs2.headVal, 10) <= 10, 'free: the whole cannot pass ten');
  is(fs2.gate === 1, 'free: the upsell strip appeared');
  is(/\/en\/pricing\?from=tool-part-whole-frame/.test(fs2.gateHref || ''), 'free: the CTA points at the Teacher plan');
  await free.close();

  const paid = await newPage(browser, { premium: true });
  await paid.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });
  await paid.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(paid);
  await settle(360);
  const paidOpts = await paid.evaluate(() => window.PartWholeFrame.settings.find(s => s.key === 'band').options.slice());
  is(paidOpts.indexOf('20') !== -1, `subscriber: the 20 band chip is present (${paidOpts.join(',')})`);
  await paid.evaluate(() => { window.PartWholeFrame.api.settings.band = '20'; window.PartWholeFrame._setWhole(14); });
  await settle(320);
  const ps = await state(paid);
  is(parseInt(ps.headVal, 10) === 14, 'subscriber: the whole goes past ten');
  is(ps.waysBox === 1, 'subscriber: the all-ways record is built');
  is(ps.printMat === 1 && ps.printWays === 1, 'subscriber: both printed pages exist');
  is(ps.quick.join(',') === '5,10,20', `subscriber: the quick-set chips include 20 (${ps.quick.join(',')})`);
  is(ps.ways >= 1, 'subscriber: the OPENING split is already in the record');
  await paid.evaluate(() => { window.PartWholeFrame._carry('toB'); });
  await settle(420);
  await paid.evaluate(() => { window.PartWholeFrame._carry('toB'); });
  await settle(420);
  const ps2 = await state(paid);
  is(ps2.ways >= 3, `subscriber: found ways accumulate (${ps2.ways})`);

  /* ---------------- L11 keyboard, the record row, the chime ---------------- */
  console.log('[L11 keyboard, the record, sound]');
  /* ⚠ THE TWO ROWS CARRY DIFFERENT ACCESSIBLE NAMES BY DESIGN, so compare
     the SPLIT, not the whole string: a tappable row says "8 is 3 and 5 —
     Put this one back on the board" while the row you are already on says
     only "8 is 3 and 5", because it is not a control. Comparing the raw
     names made this look like a regression when it was the fix. */
  const pick = await paid.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.pwf-wayrow'));
    const target = rows.find(r => !r.classList.contains('pwf-waynow'));
    if (!target) return null;
    const want = (target.getAttribute('aria-label') || '').split(' — ')[0];
    const wasButton = target.tagName === 'BUTTON';
    target.click();
    return { want, wasButton };
  });
  await settle(460);
  const after = await paid.evaluate(() => {
    const cur = document.querySelector('.pwf-wayrow[aria-current="true"]');
    return { cur: cur ? (cur.getAttribute('aria-label') || '').split(' — ')[0] : null, tag: cur ? cur.tagName : null };
  });
  is(pick !== null && pick.wasButton && after.cur === pick.want,
    `tapping a recorded way puts that split back on the board ("${after.cur}")`);
  /* ⭐ and the row you are now on has STOPPED being a control */
  is(after.tag === 'DIV', `the row already on the board is not a button (${after.tag}) — a control that can do nothing is furniture`);
  const nBefore = await paid.evaluate(() => document.querySelectorAll('.pwf-wayrow').length);
  await clickSel(paid, '.pwf-waystoggle');
  const ordered = await paid.evaluate(() => ({
    n: document.querySelectorAll('.pwf-wayrow').length,
    pressed: document.querySelector('.pwf-waystoggle').getAttribute('aria-pressed'),
    ways: window.PartWholeFrame.ways.slice()
  }));
  is(ordered.n === nBefore && ordered.pressed === 'true', `ordering is a VIEW — still ${ordered.n} rows`);
  await paid.close();

  const kb = await newPage(browser, {});
  await kb.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
  await kb.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(kb);
  await kb.evaluate(() => { window.PartWholeFrame._setWhole(8); });
  await settle(320);
  const k0 = await state(kb);
  await kb.evaluate(() => document.querySelector('.pwf-box-a .pwf-dish-live').focus());
  await kb.keyboard.press('ArrowRight');
  await settle(360);
  const k1 = await state(kb);
  is(k1.aDots === k0.aDots - 1, 'ArrowRight carries one counter across');
  is(k1.wholeDots === k0.wholeDots, 'the keyboard path also leaves the whole alone');
  /* ⭐ THE OUTWARD ARROW DOES NOTHING, AND THAT IS THE FIX. It used to move
     focus — in the WRONG DIRECTION: tray `a` is the left tray and ArrowLeft
     on it focused the right one. A native panel read the renderer and
     caught the inversion. The carry arrows already point at the tray the
     counter travels to, there is nothing outside the pair, and Tab is the
     way out; an arrow that points at nothing should do nothing. */
  const kA = await state(kb);
  await kb.evaluate(() => document.querySelector('.pwf-box-a .pwf-dish-live').focus());
  await kb.keyboard.press('ArrowLeft');
  await settle(260);
  const kAfter = await state(kb);
  const stillA = await kb.evaluate(() => (document.activeElement.closest('.pwf-box') || {}).className || '');
  is(/pwf-box-a/.test(stillA), `ArrowLeft on the LEFT tray does not jump focus rightwards (${stillA.trim()})`);
  is(kAfter.aDots === kA.aDots, 'and it does not carry either — the outward arrow points at nothing');
  /* the INWARD arrow on the right tray carries back */
  await kb.evaluate(() => document.querySelector('.pwf-box-b .pwf-dish-live').focus());
  await kb.keyboard.press('ArrowLeft');
  await settle(300);
  const kBack = await state(kb);
  is(kBack.bDots === kAfter.bDots - 1, `ArrowLeft on the RIGHT tray carries one back (${kAfter.bDots} -> ${kBack.bDots})`);
  const notes = await kb.evaluate(() => window.__notes || []);
  is(notes.length === 0 || notes.every(n => !n.hz || n.hz <= 1200), 'no shrill tones');
  await kb.close();

  /* ---------------- no verdict surface ---------------- */
  console.log('[no verdict surface]');
  s = await state(page);
  is(!/(?<!\p{L})(correct|wrong|score|try again|well done)(?!\p{L})/iu.test(s.body), 'no verdict/score in the rendered text');
  await page.close();

  /* ---------------- L12 THE SWEEP ----------------
     ⚠⚠ TWO STATES, BOTH SWEPT, BECAUSE THEY ARE CONSTRAINED BY DIFFERENT
     THINGS AND NEITHER IMPLIES THE OTHER — the recorded "sweep every
     configuration, not just the default" trap, in the shape it takes here.

       'dense'  — a whole of 20: the most counters, the most rows, the
                  four-fact notation. This is the HEIGHT-constrained state.
       'big'    — a whole of 6: only three columns, so the wide-tier column
                  ladder gives it the LARGEST counters in the whole tool
                  (104px at 2560). This is the state a viewport-only sweep
                  never enters, and it is where an oversized counter would
                  overflow.

     Sweeping only the first is how a small whole with a 104px counter
     ships past a gate that reports everything fits. */
  console.log('[L12 viewport sweep 320-2560]');
  const sw = await newPage(browser, { premium: true });
  await sw.goto(BASE + '/part-whole-frame.html?lang=de&embed=1', { waitUntil: 'networkidle0' });
  await ready(sw);
  await settle(360);
  for (const phase of ['dense', 'big']) {
  await sw.evaluate((ph) => {
    const T = window.PartWholeFrame;
    T.api.settings.band = '20';
    T.api.settings.notation = 'family';
    T.api.settings.shape = 'star';
    T.api.settings.tone = 'two';
    T._setWhole(ph === 'dense' ? 20 : 6);
    T.render();
  }, phase);
  await settle(420);
  console.log(`  -- ${phase} state --`);
  for (const [w, h] of VIEWPORTS) {
    await sw.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await settle(420);
    const m = await sw.evaluate((MIN_TAP, MIN_TEXT) => {
      /* ⚠ RESET SCROLL FIRST. A previous viewport may have left the
         document scrolled; every rect would then be negative and a
         `Math.max(acc, bottom)` starting at 0 would report a lowest of 0
         — an assertion that passes because it measured nothing. */
      [document.scrollingElement, document.documentElement, document.body,
       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')]
        .filter(Boolean).forEach(c => { try { c.scrollTop = 0; } catch (_) {} });
      const app = document.querySelector('.lcs-app') || document.body;
      const controls = Array.from(document.querySelectorAll('.pwf-step,.pwf-quickbtn,.pwf-linkbtn,.pwf-peg,.pwf-dish-live,.pwf-waystoggle,.pwf-wayrow'));
      if (!controls.length) return { noControls: true };
      const lowest = controls.reduce((acc, e) => Math.max(acc, e.getBoundingClientRect().bottom), -Infinity);
      const smallTap = controls.filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < MIN_TAP || r.height < MIN_TAP); })
        .map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      const texts = Array.from(document.querySelectorAll('.pwf-cap,.pwf-num,.pwf-headval,.pwf-nline,.pwf-waycell,.pwf-wayshint,.pwf-headlbl'))
        .filter(e => e.textContent.trim() && e.getBoundingClientRect().width > 0)
        .map(e => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }));
      const tiny = texts.filter(t => t.px < MIN_TEXT).map(t => t.cls + ' ' + t.px.toFixed(1) + 'px');
      const dot = document.querySelector('.pwf-box-a .pwf-dot');
      const dotPx = dot ? Math.round(dot.getBoundingClientRect().width) : 0;
      /* ⚠ DRIVE the scroll, do not infer it: the shell sets
         html,body{overflow:hidden}, so a taller scrollHeight means the
         content is CLIPPED, not that it can be reached. */
      const cands = [document.scrollingElement, document.documentElement, document.body,
                     document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')].filter(Boolean);
      const need = Math.max(0, lowest - window.innerHeight + 24);
      let took = null, movedBy = 0;
      for (const c of cands) {
        const before = c.scrollTop;
        c.scrollTop = need;
        if (c.scrollTop > before + 1) { took = c.className || c.tagName; movedBy = c.scrollTop - before; break; }
        c.scrollTop = before;
      }
      const lowEl = controls.reduce((best, e) =>
        (!best || e.getBoundingClientRect().bottom > best.getBoundingClientRect().bottom) ? e : best, null);
      const lr = lowEl.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), nControls: controls.length,
        lowestCls: lowEl.className,
        appH: Math.round(app.getBoundingClientRect().height),
        cardW: Math.round(app.getBoundingClientRect().width),
        sheetW: Math.round((document.querySelector('.pwf-sheet') || { getBoundingClientRect: () => ({ width: 0 }) }).getBoundingClientRect().width),
        winH: window.innerHeight,
        scrollTook: took, movedBy: Math.round(movedBy),
        lowestAfterScroll: Math.round(lr.bottom), lowestTopAfter: Math.round(lr.top),
        dotPx, smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${phase} ${w}x${h}: found NO controls to measure — the probe measured nothing`); continue; }
    const fits = m.lowest <= h + 8;
    const reachable = fits || (m.scrollTook !== null && m.lowestAfterScroll <= h + 8 && m.lowestTopAfter >= 0);
    is(m.overflow <= 2, `${phase} ${w}x${h}: no horizontal overflow (${m.overflow}px)`);
    if (w >= 768) is(fits, `${phase} ${w}x${h}: all ${m.nControls} controls FIT (lowest ${m.lowest} <= ${h}, ${m.lowestCls})`);
    else is(reachable, `${phase} ${w}x${h}: controls fit (${m.lowest}) or PROVEN reachable — scrolled ${m.scrollTook || 'nothing'} by ${m.movedBy}px, then fully visible at ${m.lowestTopAfter}-${m.lowestAfterScroll} inside ${h}`);
    is(m.smallTap.length === 0, `${phase} ${w}x${h}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.join(', ') : ''}`);
    is(m.tiny.length === 0, `${phase} ${w}x${h}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.join(', ') : ''}`);
    is(m.dotPx >= 16, `${phase} ${w}x${h}: star counters are >= 16px (${m.dotPx}px) — below that a row of twenty stops being countable`);
    /* ⚠ the card must FILL a desktop viewport, or the tool sits in a lake
       of cream. #lcs-root carries no height of its own, so .lcs-app's
       height:100% collapses to auto unless the tool supplies one. */
    if (w >= 1024) is(m.appH >= m.winH * 0.9, `${phase} ${w}x${h}: the card fills the viewport (${m.appH} of ${m.winH})`);
    /* ⭐ AND THE INSTRUMENT MUST BE WORTH THE SCREEN IT IS ON. A whole of
       six reserves three columns, so a viewport-only ladder left a 392px
       sheet inside a 1300px card at 1920 — the apparatus was 20% of the
       card. Six counters on a projector should be BIG. */
    if (phase === 'big' && w >= 1367) {
      is(m.sheetW >= m.cardW * 0.42,
        `${phase} ${w}x${h}: the instrument earns its screen (sheet ${m.sheetW} of a ${m.cardW} card = ${Math.round(100 * m.sheetW / m.cardW)}%)`);
    }
    if (SHOT && phase === 'dense' && [360, 768, 1024, 1920].includes(w)) {
      await sw.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
    }
  }
  }
  is(sw._errs.length === 0, `zero console errors${sw._errs.length ? ' — ' + sw._errs[0] : ''}`);
  if (SHOT) {
    for (const [w, h] of [[360, 740], [768, 1000], [1024, 900], [1920, 950]]) {
      await sw.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
      await sw.evaluate(() => {
        const T = window.PartWholeFrame;
        T.api.settings.shape = 'disc'; T.api.settings.notation = 'sum';
        T.api.settings.tone = 'two'; T._setWhole(6); T.render();
      });
      await settle(460);
      await sw.screenshot({ path: path.join(SHOT_DIR, `default-${w}.png`), fullPage: true });
    }
    await sw.setViewport({ width: 1024, height: 900, deviceScaleFactor: 2 });
    await settle(360);
    await sw.evaluate(() => { document.querySelector('.pwf-box-a .pwf-peg').click(); });
    await settle(360);
    await sw.screenshot({ path: path.join(SHOT_DIR, 'covered-1024.png'), fullPage: true });
  }
  await sw.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
