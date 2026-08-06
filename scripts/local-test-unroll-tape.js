/* =====================================================================
   local-test-unroll-tape.js — the browser gate for TOOL #41
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-unroll-tape.js [--shot]

   Serves `mini tools/` locally — no deploy — and drives the tool with
   REAL POINTER EVENTS across the full viewport sweep.

   ⚠ WHAT verify- CANNOT SEE. It runs in Node with no DOM, so it proves
   the model and nothing else. Three things live only here:
     E3   the RENDERED strand's summed segment length equals the model's
     TAP  two floors, named separately: controls ≥44px, canvas ≥34px
     FIT  every control's bottom is inside the viewport, at DESKTOP too
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/* ⚠ THE SAME ENV INDIRECTION verify- HAS CARRIED ALL ALONG. Without it the
   mutation harness could only ever run the MODEL gate, so every browser-side
   claim in this file had ZERO mutation coverage — which is how a tool that
   renders no flag handle at all was killed by nothing. */
const SHELL = path.join(__dirname, '..', 'mini tools');
const ROOT = process.env.URT_TOOL_DIR || SHELL;
const OUT = path.join(__dirname, '..', '.scratch', 'urt');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5533;
/* 1400x880 is the EXACT Tier-A floor -- the widest bench this tool draws
   against the shortest viewport that draws it, and therefore the tightest
   cell in the sweep. 1366 stays as the CONTROL: nothing may move there. */
const WIDTHS = [320, 360, 412, 768, 1024, 1366, 1400, 1920, 2560];
const heightFor = (W) => (W >= 2400 ? 1440 : W >= 1800 ? 1080 : W >= 1400 ? 880 : W < 500 ? 740 : 900);

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  /* the harness copies only the tool and its data into tmp; the shell and
     its css still resolve from the real tree */
  let fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) fp = path.join(SHELL, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* =================================================================
     L1-L6 — the viewport sweep
     ================================================================= */
  for (const W of WIDTHS) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    await page.setViewport({ width: W, height: heightFor(W) });
    await page.goto(`http://127.0.0.1:${PORT}/unroll-tape.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.urt-bench', { timeout: 9000 });
    await wait(600);

    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const ctrls = Array.from(document.querySelectorAll('.urt-chip'));
      const grips = Array.from(document.querySelectorAll('.urt-handle'));
      const rect = (e) => e.getBoundingClientRect();
      let lowest = 0;
      for (const c of ctrls) lowest = Math.max(lowest, rect(c).bottom);
      return {
        overflowX: doc.scrollWidth > doc.clientWidth,
        lowestControl: Math.round(lowest),
        viewportH: window.innerHeight,
        minChip: Math.round(Math.min.apply(null, ctrls.map((c) => rect(c).height))),
        minGrip: Math.round(Math.min.apply(null, grips.map((g) => rect(g).width))),
        chips: ctrls.length,
        sizes: document.querySelectorAll('.urt-sz').length,
        grips: grips.length,
        benchW: Math.round(rect(document.querySelector('.urt-bench')).width),
        cardW: Math.round(rect(document.querySelector('.urt-bench').parentElement).width)
      };
    });

    /* ⚠⚠ NON-VACUITY FIRST. `Math.min.apply(null, [])` is Infinity and
       `Infinity >= 44` PASSES, so every tap-target floor below was
       satisfiable by an EMPTY NodeList — the #40 defect this file's own
       header claims to have fixed, reintroduced. `lowest` seeded at 0 had
       the same hole. Assert the collections exist before believing any
       number computed from them. */
    is(m.chips >= 3 && m.sizes === 3,
      `${W}px: the foot has its controls (${m.chips} chips + ${m.sizes} size rungs) — the floors below measure something`);
    is(m.grips >= 2, `${W}px: the bench has its handles (${m.grips}) — ditto`);
    is(m.benchW >= 240, `${W}px: the bench is actually laid out (${m.benchW}px wide, not collapsed)`);
    is(!m.overflowX, `${W}px: no horizontal overflow`);
    is(m.lowestControl <= m.viewportH, `${W}px: FITS — lowest control at ${m.lowestControl} ≤ ${m.viewportH}`);
    /* ⚠ TWO TAP FLOORS, NAMED SEPARATELY. A chip is a control (44px);
       a grip is a canvas handle inside an SVG (34px) — conflating them
       hides whichever is the smaller requirement. */
    is(m.minChip >= 44, `${W}px: every chip is ≥44px tall (${m.minChip})`);
    is(m.minGrip >= 34, `${W}px: every canvas grip is ≥34px wide (${m.minGrip})`);
    is(m.benchW <= m.cardW, `${W}px: the bench is contained by THE CARD (${m.benchW} ≤ ${m.cardW})`);
    is(errs.length === 0, `${W}px: no console errors` + (errs.length ? ' — ' + errs[0] : ''));

    if (SHOT && [360, 768, 1024].indexOf(W) >= 0) {
      await page.screenshot({ path: path.join(OUT, `sweep-${W}.png`), fullPage: true });
    }
    await page.close();
  }

  /* =================================================================
     L7 — ⭐ A REAL POINTER DRAG on the strand's tip
     ================================================================= */
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://127.0.0.1:${PORT}/unroll-tape.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.urt-bench', { timeout: 9000 });
  await wait(600);

  const read = () => page.evaluate(() => {
    const s = document.querySelector('.urt-strand');
    const o = document.querySelector('.urt-outline');
    const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
    const len = (a) => { let L = 0; for (let i = 1; i < a.length; i++) L += Math.hypot(a[i][0] - a[i - 1][0], a[i][1] - a[i - 1][1]); return L; };
    const sp = pts(s), op = pts(o);
    return {
      strandVerts: sp.length,
      strandLen: len(sp),
      outlineBox: (() => { const r = o.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 100) / 100).join(','); })(),
      t: window.UnrollTape.st.t,
      A: window.UnrollTape.st.A,
      modelLen: (() => { const U = window.UnrollTape; const oo = U.outlineFor(U.shelf()[U.st.shape]); return U.strandLength(oo, U.st, U.st.A); })()
    };
  });

  const before = await read();
  is(before.strandVerts > 100, `the strand is a real polyline (${before.strandVerts} vertices) — not an empty NodeList`);
  is(Math.abs(before.strandLen - before.modelLen) < 0.05,
    `⭐ E3: the RENDERED strand measures ${before.strandLen.toFixed(3)} against the model's ${before.modelLen.toFixed(3)}`);

  const tip = await page.$('.urt-tip');
  is(!!tip, 'the strand has a draggable tip');
  const g = await tip.boundingBox();
  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) { await page.mouse.move(g.x + g.width / 2 + i * 22, g.y + g.height / 2); await wait(22); }
  await page.mouse.up();
  await wait(250);

  const after = await read();
  is(after.t > before.t, `⭐ a real pointer drag unrolls the strand (t ${before.t.toFixed(3)} → ${after.t.toFixed(3)})`);
  is(after.strandVerts < before.strandVerts, `and the wrap gives up vertices to the lay (${before.strandVerts} → ${after.strandVerts})`);
  /* ⚠ THE MODEL LENGTH IS EXACTLY CONSERVED; THE PICTURE'S IS NOT, AND
     CONFLATING THEM WAS WRONG. As t grows, more of the strand is the exact
     straight lay and less is the discretised wrap, so the RENDERED polyline
     creeps toward the true length by the chord-vs-arc deficit — measured
     8e-4 on 675, i.e. 1.2e-6 relative. Asserting 1e-6 on the PICTURE was
     asserting that a theorem is false. Two quantities, two assertions,
     exactly as the tool's own docblock says. */
  is(Math.abs(after.modelLen - before.modelLen) < 1e-9,
    `⭐ AND THE STRAND IS THE SAME LENGTH THROUGHOUT — the model conserves it exactly (${before.modelLen.toFixed(6)} → ${after.modelLen.toFixed(6)})`);
  /* ⚠ the picture is serialised with toFixed(3) over ~360 vertices, so it
     cannot be read to better than ~0.02 — a monotone-increase assertion
     was demanding a precision the attribute does not carry. */
  is(Math.abs(after.strandLen - before.strandLen) < 0.05,
    `and the PICTURE tracks it within serialisation noise (${before.strandLen.toFixed(4)} → ${after.strandLen.toFixed(4)})`);
  is(after.outlineBox === before.outlineBox, `⭐ AND THE SHAPE DID NOT MOVE — geometry identical (${before.outlineBox})`);
  is(Math.abs(after.strandLen - after.modelLen) < 0.05, 'E3 still holds mid-peel');

  /* =================================================================
     L8 — ⭐ THE INVARIANCE, driven: grow the shape, the reading holds
     ================================================================= */
  await page.evaluate(() => { const U = window.UnrollTape; U.st = U.setPeel(U.st, 1) || U.st; U.render(); });
  await wait(200);
  const ratios = await page.evaluate(() => {
    const U = window.UnrollTape, o = U.outlineFor(U.shelf()[U.st.shape]), out = [];
    for (const A of [80, 120, 160, 200, U.aMax(o)]) {
      const st = { shape: U.st.shape, A, t: 1, flags: [], committed: false };
      out.push(U.strandLength(o, st, A) / A);
    }
    return out;
  });
  const spread = (Math.max.apply(null, ratios) - Math.min.apply(null, ratios)) / ratios[0];
  is(spread < 1e-12, `⭐ THE INVARIANCE: around÷across is identical at 5 sizes (spread ${spread.toExponential(2)})`);

  /* =================================================================
     L9 — ⭐⭐ THE FLAG, DRIVEN BY A REAL POINTER. THE ASSERTIONS THIS
     SUITE HAS NEVER HAD, AND THE REASON THE OPERATOR COULD NOT SET IT.

     Every `.urt-flag` assertion in all eleven scripts was
     `!!querySelector`; the flag was only ever moved by calling the model
     directly inside page.evaluate. Three DOM paths existed FOR it — a
     pointerdown tap, a click and a keydown — each carrying a comment
     saying a liveness gate had once reported it dead, and not one was
     driven by any test. Here each is driven separately, and each must
     MOVE the flag to a new RENDERED position.
     ================================================================= */
  await page.evaluate(() => {
    const U = window.UnrollTape;
    U.st = U.newState(); U.marks = [];
    U.st.A = U.defaultA(U.outlineFor(U.shelf()[0]));
    U._dirtyBuild = true; U.render();
  });
  await wait(300);

  const flagX = () => page.evaluate(() => {
    const f = document.querySelector('.urt-flag');
    if (!f) return null;
    const r = f.getBoundingClientRect();
    return {
      x: Math.round((r.left + r.right) / 2),
      n: window.UnrollTape.st.flags.length,
      a: window.UnrollTape.st.flags[0]
    };
  });

  /* (a) hit-testability. `document.elementFromPoint` appears ZERO times
     across the eleven scripts, and "the box is 44px" says nothing about
     whether a finger can actually reach it — the shipped flag was a 45%
     ghost with an opaque dot sitting on top of its own pole. */
  const reach = await page.evaluate(() => Array.from(document.querySelectorAll('.urt-handle')).map((h) => {
    const r = h.getBoundingClientRect();
    const el = document.elementFromPoint((r.left + r.right) / 2, (r.top + r.bottom) / 2);
    const cs = getComputedStyle(h);
    return {
      cls: h.className, own: !!(el && (el === h || h.contains(el))),
      w: Math.round(r.width), h: Math.round(r.height),
      vis: cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.5
    };
  }));
  /* ⭐ THE FLAG MUST HAVE A VISIBLE CLOTH. The whole reported defect was a
     flag nobody could see, and a mutation that deleted the cloth outright
     survived every other gate — 51 of 52 died, this one lived. A handle
     whose graphic is gone is a handle nobody will reach for. */
  const cloth = await page.evaluate(() => {
    const c = document.querySelector('.urt-flag .urt-fl-cloth');
    if (!c) return { present: false };
    const r = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    return { present: true, w: Math.round(r.width), h: Math.round(r.height),
      painted: cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent' };
  });
  is(cloth.present, '⭐ the flag has its cloth — the graphic a teacher actually reaches for');
  is(cloth.present && cloth.w >= 20 && cloth.h >= 14,
    `and it is big enough to see across a classroom (${cloth.w}x${cloth.h}px)`);
  is(cloth.painted, 'and it is actually painted, not an empty box');
  is(reach.length >= 2, `both bench handles are present (${reach.length})`);
  is(reach.every((r) => r.own), '⭐ every handle is the TOPMOST element at its own centre — nothing covers it');
  is(reach.every((r) => r.vis), '⭐ and none is drawn at a disabled-looking opacity (the old ghost was .45)');
  is(reach.every((r) => r.w >= 44 && r.h >= 44),
    `and each is at least 44px both ways (${reach.map((r) => r.w + 'x' + r.h).join(' ')})`);

  /* (b) handle-vs-handle overlap: two 44px boxes that intersect are two
     controls a finger cannot choose between. Nothing measured this. */
  const overlap = await page.evaluate(() => {
    const hs = Array.from(document.querySelectorAll('.urt-handle')).map((h) => h.getBoundingClientRect());
    let worst = 0;
    for (let i = 0; i < hs.length; i++) {
      for (let j = i + 1; j < hs.length; j++) {
        const ox = Math.min(hs[i].right, hs[j].right) - Math.max(hs[i].left, hs[j].left);
        const oy = Math.min(hs[i].bottom, hs[j].bottom) - Math.max(hs[i].top, hs[j].top);
        if (ox > 0 && oy > 0) worst = Math.max(worst, Math.min(ox, oy));
      }
    }
    return Math.round(worst);
  });
  is(overlap < 22, `no two handles overlap by more than half a target (${overlap}px)`);

  /* (c) THE DRAG. pointerdown, ten moves, pointerup — and the flag must
     have MOVED. This is the exact gesture the operator reported dead. */
  const f0 = await flagX();
  is(!!f0, 'a flag handle is on the bench before anyone touches it');
  const fb = await (await page.$('.urt-flag')).boundingBox();
  await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) {
    await page.mouse.move(fb.x + fb.width / 2 + i * 18, fb.y + fb.height / 2);
    await wait(20);
  }
  await page.mouse.up();
  await wait(250);
  const f1 = await flagX();
  is(!!f1 && f1.x > f0.x + 80,
    `⭐⭐ A REAL POINTER DRAG MOVES THE FLAG (${f0.x}px → ${f1 ? f1.x : 'gone'}px) — the defect the operator reported`);
  is(!!f1 && f1.n === 1, 'and it moves that flag rather than planting a second one');

  /* (d) TAPPING THE RUNWAY plants one — the gesture a teacher reaches for
     first, and the one that makes the whole failure class moot. */
  const planted = await page.evaluate(() => {
    const U = window.UnrollTape;
    const strip = document.querySelector('.urt-plant');
    if (!strip) return { err: 'no runway hit surface' };
    const r = strip.getBoundingClientRect();
    const before = U.st.flags.length;
    strip.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, clientX: r.left + r.width * 0.62, clientY: r.top + r.height / 2,
      pointerId: 7, isPrimary: true, button: 0
    }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 7 }));
    return { before: before, after: U.st.flags.length, flags: U.st.flags.slice() };
  });
  is(planted.after === planted.before + 1,
    `⭐ tapping the runway plants a flag there (${planted.before} → ${planted.after})`);

  /* (e) THE KEYBOARD. A drag-only handle is dead to a keyboard user, and
     the shipped step was 12 model units — 0.046 acrosses, twenty-two
     presses to cross one tick. */
  const kb = await page.evaluate(() => {
    const U = window.UnrollTape;
    const f = document.querySelector('.urt-flag');
    const a0 = U.st.flags[0];
    f.focus();
    f.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    const a1 = U.st.flags[0];
    document.querySelector('.urt-flag').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
    return { a0: a0, a1: a1, a2: U.st.flags[0] };
  });
  is(Math.abs((kb.a1 - kb.a0) - 0.1) < 1e-6,
    `⭐ an arrow key moves the flag by a tenth of a width (${kb.a0} → ${kb.a1}), not by 0.046`);
  is(Math.abs((kb.a2 - kb.a1) - 1) < 1e-6,
    `and shift-arrow by a whole width (${kb.a1} → ${kb.a2})`);

  /* (f) the model gate: committed means refused, not merely disabled */
  const flagState = await page.evaluate(() => {
    const U = window.UnrollTape;
    const o = U.outlineFor(U.shelf()[U.st.shape]);
    U.st = U.setPeel(U.st, 0.4) || U.st; U.render();
    const afterPeel = !!document.querySelector('.urt-flag');
    return {
      afterPeel: afterPeel,
      refusedMove: U.moveFlag(U.st, o, 0, 1.2) === null,
      refusedAdd: U.addFlag(U.st, o, 1.2) === null,
      disabledAfter: Array.from(document.querySelectorAll('.urt-flag')).every((f) => f.disabled),
      committed: U.st.committed
    };
  });
  is(flagState.committed, 'peeling COMMITS the guess');
  is(flagState.refusedMove && flagState.refusedAdd,
    '⭐ and the model REFUSES both moving and planting — not merely a disabled attribute');
  is(flagState.afterPeel,
    '⭐ the planted flag STAYS on the bench — the guess is never removed, never marked, never scored');
  is(flagState.disabledAfter,
    'and it stops being an enabled control, so it never invites a gesture the model will refuse');

  /* (g) three flags, from three children, and never a fourth */
  const three = await page.evaluate(() => {
    const U = window.UnrollTape;
    U.st = U.newState(); U.st.A = U.defaultA(U.outlineFor(U.shelf()[0]));
    const o = U.outlineFor(U.shelf()[0]);
    U.st = U.addFlag(U.st, o, 1.0) || U.st;
    U.st = U.addFlag(U.st, o, 2.0) || U.st;
    U.st = U.addFlag(U.st, o, 3.0) || U.st;
    const fourth = U.addFlag(U.st, o, 3.5);
    U.render();
    return { n: U.st.flags.length, fourth: fourth === null, drawn: document.querySelectorAll('.urt-flag').length };
  });
  is(three.n === 3 && three.fourth, 'three flags may be planted and a fourth is refused');
  is(three.drawn === 3, `and all three are drawn (${three.drawn})`);

  /* (h) ⭐ THE RECORD, and the stagger that makes Barbier legible. Two
     marks at the same place is the POINT; drawn on one line they became a
     single illegible glyph. */
  const rail = await page.evaluate(() => {
    const U = window.UnrollTape;
    U.st = U.newState(); U.st.A = U.defaultA(U.outlineFor(U.shelf()[0]));
    U.marks = U.addMark(U.addMark([], 'circle', 3.1416), 'reuleaux', 3.1416);
    U.render();
    const minis = Array.from(document.querySelectorAll('.urt-markmini'));
    const boxes = minis.map((m) => m.getBoundingClientRect());
    let sameRow = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        if (Math.abs(boxes[i].top - boxes[j].top) < 4) sameRow = true;
      }
    }
    const bench = document.querySelector('.urt-bench').getBoundingClientRect();
    return {
      n: minis.length, sameRow: sameRow,
      inside: boxes.every((b) => b.bottom <= bench.bottom + 1 && b.top >= bench.top - 1),
      widths: boxes.map((b) => Math.round(b.width))
    };
  });
  is(rail.n === 2, `two landings leave two marks (${rail.n})`);
  is(!rail.sameRow, '⭐ and two marks at the SAME place stagger onto two rows rather than hiding each other');
  is(rail.inside, 'both marks are inside the bench — a staggered row is not drawn off the viewBox');
  is(rail.widths.length === 2 && Math.abs(rail.widths[0] - rail.widths[1]) <= 2,
    `⭐ every miniature is the SAME WIDTH (${rail.widths.join(' vs ')}) — which is the thesis, restated each time one is drawn`);

  /* =================================================================
     L10 — no verdict is ever rendered
     ================================================================= */
  const verdict = await page.evaluate(() =>
    document.querySelectorAll('[class*="correct"],[class*="wrong"],[class*="score"]').length);
  is(verdict === 0, 'no verdict element exists anywhere in the rendered DOM');
  is(errs.length === 0, 'no page errors across the whole drive' + (errs.length ? ' — ' + errs[0] : ''));

  await page.close();
  await browser.close();
  srv.close();

  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions in a real browser`);
})();
