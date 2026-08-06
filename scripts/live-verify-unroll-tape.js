/* =====================================================================
   live-verify-unroll-tape.js — TOOL #41 on production, all 11 locales
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-unroll-tape.js

   ⚠ NEVER "it mounts". This DRIVES the strand on the live site with a
   real pointer drag and checks the two things the tool exists to show:
   THE CORD KEEPS ITS LENGTH WHEN IT STOPS BEING CURVED, and THE SHAPE
   DOES NOT MOVE WHILE IT HAPPENS.

   ⚠ NON-VACUITY FIRST. #40 shipped a production gate keyed on an
   attribute the tool never emitted; every assertion compared two empty
   NodeLists and it would have passed on a tool with no tapes at all. So
   the collections are proved non-empty and correctly sized BEFORE
   anything is asserted about their contents.

   ⚠ AND THE NAMED-UNIT BAN IS SCOPED TO THIS TOOL'S OWN VISIBLE PROSE.
   `document.body.textContent` carries Next's RSC flight-data, which
   serialises every sibling tool — on #40 that made the ban condemn the
   RULER's own correct name in ten of eleven locales.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
/* ⚠ THE EXPECTED LABELS COME FROM THE TOOL, NEVER FROM A LITERAL HERE.
   This file matched foot buttons against hard-coded English, and its own
   header records that biting once when a label was re-authored. A gate
   that carries its own copy of the thing it checks has a half-life. */
const TOOL = require(require('path').join(__dirname, '..', 'mini tools', 'unroll-tape.js'));
const LBL = (k) => TOOL.strings[k].en;

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const C = require('./_unroll-tape-content.js');
const S = require('./_unroll-tape-strings.js');

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⚠ POISON-TESTED IN BOTH DIRECTIONS, EVERY RUN, BEFORE A PAGE IS READ.
   The must-pass half is the one that matters: this program has bought
   the ban-too-wide defect four times, and once the ban was too NARROW
   (French `centimètres` carries an accented è that `centimet` misses). */
const NAMED_UNIT = /(\bcm\b|\bmm\b|centimet|centimèt|zentimet|centímetr|sentti|senttimetr|\bmeter\b|\bmetre\b|\bmetro\b|\bmètre\b|\binch(es)?\b|\btum(mar)?\b|\btomme[rn]?\b|paperclip|büroklammer|trombone|graffett)/i;
const MUST_FIRE = [
  'measure it in cm', 'in Zentimetern', 'en centímetros', 'en centimètres',
  'em centímetros', 'in centimetri', 'in centimeters', 'i centimeter',
  'senttimetreinä', 'three inches', 'i tum', 'to tommer', 'met paperclips'
];
const MUST_PASS = [
  /* the tool's own eleven names — none may ever be condemned */
  S.en.title, S.de.title, S.fr.title, S.es.title, S.pt.title, S.it.title,
  S.nl.title, S.sv.title, S.da.title, S.no.title, S.fi.title,
  /* and prose that merely contains the letters */
  'Mät med tummen.', 'the parameter is immaterial', 'Sentään ei ole nimetty.'
];
(function poison() {
  const missed = MUST_FIRE.filter((s) => !NAMED_UNIT.test(s));
  const condemned = MUST_PASS.filter((s) => NAMED_UNIT.test(s));
  is(missed.length === 0, `the unit ban fires on all ${MUST_FIRE.length} violations` + (missed.length ? ` — MISSED: ${missed[0]}` : ''));
  is(condemned.length === 0, `and clears all ${MUST_PASS.length} innocents incl. every tool name` + (condemned.length ? ` — CONDEMNED: ${condemned[0]}` : ''));
}());

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the eleven landings ------------------------------------- */
  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}/tools/${C[loc].slug}`;
    const page = await browser.newPage();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const seen = await page.evaluate(() => ({
      h1: (document.querySelector('h1') || {}).textContent || '',
      desc: (document.querySelector('meta[name="description"]') || { content: '' }).content,
      canon: (document.querySelector('link[rel=canonical]') || { href: '' }).href,
      iframe: (document.querySelector('iframe') || { src: '' }).src,
      /* ⚠ VISIBLE PROSE ONLY — never document.body, which carries the
         RSC payload of every sibling tool on the page */
      prose: Array.from(document.querySelectorAll('main p, main h1, main h2, main h3, main li'))
        .map((e) => e.textContent || '').join(' ')
    }));
    is(res.status() === 200, `${loc}: ${url} -> ${res.status()}`);
    is(seen.h1.indexOf(C[loc].name) >= 0, `${loc}: h1 is "${seen.h1.trim()}"`);
    is(seen.desc === C[loc].metaDescription, `${loc}: meta description is this locale's`);
    is(seen.canon.indexOf(C[loc].slug) >= 0, `${loc}: canonical carries the native slug`);
    is(/\/mini-tools\/unroll-tape\.html/.test(seen.iframe), `${loc}: the iframe points at unroll-tape.html`);
    is(seen.prose.length > 400, `${loc}: the landing prose rendered (${seen.prose.length} chars)`);
    is(seen.prose.indexOf(C[loc].about[2].slice(0, 40)) >= 0, `${loc}: the third paragraph is on the page`);
    is(!NAMED_UNIT.test(seen.prose), `${loc}: ⭐ no named unit in this tool's own prose`);
    await page.close();
  }

  /* ---- 2. ⭐ THE STRAND, DRAGGED, on production -------------------- */
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
  await page.goto(`${BASE}/mini-tools/unroll-tape.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('.urt-bench', { timeout: 20000 });
  await wait(900);

  /* the shape book must come from the server, not the offline fallback */
  const book = await page.evaluate(() =>
    fetch('/mini-tools/unroll-tape-shapes.json').then((r) => r.json()).then((d) => d.shapes.length).catch(() => 0));
  is(book === 12, `the shape book served ${book} shapes from production (expected 12)`);

  const read = () => page.evaluate(() => {
    const s = document.querySelector('.urt-strand');
    const o = document.querySelector('.urt-outline');
    const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
    const len = (a) => { let L = 0; for (let i = 1; i < a.length; i++) L += Math.hypot(a[i][0] - a[i - 1][0], a[i][1] - a[i - 1][1]); return L; };
    const sp = pts(s), op = pts(o);
    const r = o.getBoundingClientRect();
    return {
      strandVerts: sp.length, outlineVerts: op.length, strandLen: len(sp),
      obj: [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 100) / 100).join(','),
      ticks: document.querySelectorAll('.urt-tick').length,
      nums: Array.from(document.querySelectorAll('.urt-num')).map((e) => e.textContent).join(','),
      handles: document.querySelectorAll('.urt-handle').length,
      t: window.UnrollTape.st.t
    };
  });

  const before = await read();
  /* ⚠ NON-VACUITY FIRST — prove the collections exist and are the right
     size before asserting anything about how they change */
  is(before.strandVerts > 100, `the strand is a real polyline (${before.strandVerts} vertices)`);
  is(before.outlineVerts === 512, `the outline carries exactly 512 vertices (saw ${before.outlineVerts})`);
  is(before.ticks >= 3, `the runway is ruled (${before.ticks} ticks, numerals ${before.nums})`);
  /* ⚠ TWO, NOT THREE. The size DRAG HANDLE is gone: a continuous drag is a
     zoom, and invariance is evidence only when there are two separately
     witnessed trials with a prediction in between — a wrist movement cannot
     hold a prediction. Size is now three discrete rungs in the foot. What is
     left on the bench is the strand tip and the flag. */
  is(before.handles === 2, `both bench handles are present (saw ${before.handles})`);
  is(before.strandLen > 100, `and the strand has real length (${before.strandLen.toFixed(1)})`);

  /* =================================================================
     ⭐⭐ THE FLAG, DRAGGED ON PRODUCTION — the exact gesture the operator
     reported dead. This suite drove the strand tip and never the flag,
     and eleven scripts asserted the flag with `!!querySelector` alone.
     Existence is not reachability: the shipped flag was a 45%-opacity
     pennant under 20px wide with an opaque handle-dot on top of it.
     ================================================================= */
  const flagBefore = await page.evaluate(() => {
    const f = document.querySelector('.urt-flag');
    if (!f) return null;
    const r = f.getBoundingClientRect();
    const cloth = f.querySelector('.urt-fl-cloth');
    const cr = cloth ? cloth.getBoundingClientRect() : null;
    const el = document.elementFromPoint((r.left + r.right) / 2, (r.top + r.bottom) / 2);
    const cs = getComputedStyle(f);
    return {
      x: Math.round((r.left + r.right) / 2), w: Math.round(r.width), h: Math.round(r.height),
      cloth: cr ? Math.round(cr.width) + "x" + Math.round(cr.height) : null,
      topmostIsOwn: !!(el && (el === f || f.contains(el))),
      opacity: Number(cs.opacity)
    };
  });
  is(!!flagBefore, 'a flag handle is on the bench');
  is(flagBefore && flagBefore.w >= 44 && flagBefore.h >= 44,
    `the flag is a ${flagBefore ? flagBefore.w + "x" + flagBefore.h : "?"} target (K-2 floor 44)`);
  is(flagBefore && flagBefore.topmostIsOwn,
    '⭐ the flag is the TOPMOST element at its own centre — nothing covers it');
  is(flagBefore && flagBefore.opacity > 0.9,
    `and it is at full opacity (${flagBefore ? flagBefore.opacity : "?"}), not the .45 that reads as disabled`);
  is(!!(flagBefore && flagBefore.cloth),
    `⭐ and it has a visible cloth (${flagBefore ? flagBefore.cloth : "none"}) — the thing a teacher reaches for`);

  const fbox = await (await page.$('.urt-flag')).boundingBox();
  await page.mouse.move(fbox.x + fbox.width / 2, fbox.y + fbox.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) { await page.mouse.move(fbox.x + fbox.width / 2 + i * 18, fbox.y + fbox.height / 2); await wait(20); }
  await page.mouse.up();
  await wait(300);
  const flagAfter = await page.evaluate(() => {
    const f = document.querySelector('.urt-flag');
    if (!f) return null;
    const r = f.getBoundingClientRect();
    return { x: Math.round((r.left + r.right) / 2), n: window.UnrollTape.st.flags.length };
  });
  is(!!flagAfter && flagAfter.x > flagBefore.x + 70,
    `⭐⭐ A REAL POINTER DRAG MOVES THE FLAG ON PRODUCTION (${flagBefore.x}px → ${flagAfter ? flagAfter.x : "gone"}px)`);
  is(!!flagAfter && flagAfter.n === 1,
    'and it moves that flag rather than planting a second one');

  /* the runway itself plants one — the gesture a teacher reaches for first */
  const planted = await page.evaluate(() => {
    const U = window.UnrollTape;
    const strip = document.querySelector('.urt-plant');
    if (!strip) return { err: 'no runway hit surface' };
    const r = strip.getBoundingClientRect();
    const before = U.st.flags.length;
    strip.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true,
      clientX: r.left + r.width * 0.7, clientY: r.top + r.height / 2,
      pointerId: 9, isPrimary: true, button: 0 }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 9 }));
    return { before: before, after: U.st.flags.length };
  });
  is(planted.after === planted.before + 1,
    `⭐ tapping the runway plants a flag there (${planted.before} → ${planted.after})`);

  await page.evaluate(() => { const U = window.UnrollTape; U.st = U.newState(); U.marks = [];
    U.st.A = U.defaultA(U.outlineFor(U.shelf()[0])); U._dirtyBuild = true; U.render(); });
  await wait(250);

  const tip = await page.$('.urt-tip');
  is(!!tip, 'the strand has a draggable tip');
  const g = await tip.boundingBox();
  is(g.width >= 44 && g.height >= 44, `the tip is a ${Math.round(g.width)}x${Math.round(g.height)} target (K-2 floor 44)`);

  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(g.x + g.width / 2 + i * 20, g.y + g.height / 2); await wait(22); }
  await page.mouse.up();
  await wait(300);

  const after = await read();
  is(after.t > before.t, `⭐ a real pointer drag lays the strand down (t ${before.t.toFixed(3)} → ${after.t.toFixed(3)})`);
  is(after.strandVerts < before.strandVerts, `the wrap gives up vertices to the lay (${before.strandVerts} → ${after.strandVerts})`);
  is(Math.abs(after.strandLen - before.strandLen) / before.strandLen < 1e-6,
    `⭐ AND THE CORD KEEPS ITS LENGTH (${before.strandLen.toFixed(4)} → ${after.strandLen.toFixed(4)})`);
  is(after.obj === before.obj, `⭐ AND THE SHAPE DID NOT MOVE — geometry identical (${before.obj})`);

  /* ---- 3. ⭐ THE INVARIANCE, driven on production ------------------
     ⚠ NAME THE SHAPE. The bench opens on the PEBBLE (R = 2.30); asserting
     "3.14" against whatever happens to be loaded is asserting against the
     wrong shape, which is how this gate first read a failure on a correct
     tool. The circle is the shape this claim is about, so ask for it. */
  const measured = await page.evaluate(() => {
    const U = window.UnrollTape;
    const shelf = U.shelf();
    const idx = shelf.findIndex((s) => s.k === 'circle');
    if (idx < 0) return null;
    const o = U.outlineFor(shelf[idx]), out = [];
    for (const A of [80, 120, 160, 200, U.aMax(o)]) {
      out.push(U.strandLength(o, { shape: idx, A, t: 1, flag: null, committed: false }, A) / A);
    }
    return { k: shelf[idx].k, ratios: out };
  });
  is(!!measured, 'the circle is on the free shelf');
  const ratios = measured.ratios;
  const spread = (Math.max.apply(null, ratios) - Math.min.apply(null, ratios)) / ratios[0];
  is(spread < 1e-12, `⭐ THE INVARIANCE ON PRODUCTION: the ${measured.k}'s reading is identical at 5 sizes (spread ${spread.toExponential(2)})`);
  is(ratios[0].toFixed(2) === '3.14', `⭐ and it reads 3.14 — three and a bit, at every one of them`);

  /* the named buttons do what their labels say */
  const foot = async (label) => {
    const ok = await page.evaluate((l) => {
      const b = Array.from(document.querySelectorAll('.urt-foot .urt-chip')).find((x) => x.textContent === l);
      if (!b || b.disabled) return false;
      b.click(); return true;
    }, label);
    await wait(1200);
    return ok;
  };
  /* ⚠ THE BUTTON IS A TOGGLE, AND ITS LABEL DEPENDS ON THE STATE. It reads
     "Put it back round" only at t = 1; after a 0.6 drag it still reads
     "Let it lie down". Asking for the wrong label reports a live control
     as dead — write the assertion from the artefact, not from the plan. */
  is(await foot(LBL('unrollBtn')), `"${LBL('unrollBtn')}" carries the strand the rest of the way`);
  const landed = await read();
  is(landed.t >= 1, `⭐ and it lands fully (t → ${landed.t.toFixed(3)})`);
  is(landed.strandVerts === 2, `at rest the laid cord is ONE straight segment (${landed.strandVerts} vertices)`);
  is(Math.abs(landed.strandLen - before.strandLen) / before.strandLen < 1e-6,
    `⭐ and it STILL has the length it had when it was curved (${landed.strandLen.toFixed(4)})`);

  is(await foot(LBL('rollBackBtn')), `"${LBL('rollBackBtn')}" is live once the cord is down`);
  const backOn = await read();
  is(backOn.t < 0.05, `⭐ and it puts the cord back round (t → ${backOn.t.toFixed(3)})`);

  const objBefore = backOn.obj;
  is(await foot(LBL('nextShapeBtn')), `"${LBL('nextShapeBtn')}" is live`);
  const swapped = await read();
  is(swapped.obj !== objBefore, 'a different shape is on the bench');
  is(swapped.outlineVerts === 512, 'and it too carries exactly 512 vertices');

  /* no verdict, ever */
  const verdict = await page.evaluate(() =>
    document.querySelectorAll('[class*="correct"],[class*="wrong"],[class*="score"]').length);
  is(verdict === 0, '⭐ no verdict element exists anywhere in the rendered DOM');
  is(errs.length === 0, 'zero console errors on production' + (errs.length ? ' — ' + errs[0] : ''));
  await page.close();

  /* ---- 4. the hub card has its thumbnail --------------------------- */
  const hub = await browser.newPage();
  const r = await hub.goto(`${BASE}/mini-tools/tool-previews/unroll-tape.webp`, { timeout: 30000 });
  is(r.status() === 200, `the hub thumbnail serves ${r.status()} (the #38 defect, gated)`);
  await hub.close();

  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions driven on production`);
})();
