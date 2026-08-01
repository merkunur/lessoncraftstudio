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

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'urt');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5533;
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
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
    await page.setViewport({ width: W, height: W < 500 ? 740 : 900 });
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
        grips: grips.length,
        benchW: Math.round(rect(document.querySelector('.urt-bench')).width),
        cardW: Math.round(rect(document.querySelector('.urt-bench').parentElement).width)
      };
    });

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
  is(Math.abs(after.strandLen - before.strandLen) / before.strandLen < 1e-6,
    `⭐ AND THE STRAND IS THE SAME LENGTH THROUGHOUT (${before.strandLen.toFixed(4)} → ${after.strandLen.toFixed(4)})`);
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
      const st = { shape: U.st.shape, A, t: 1, flag: null, committed: false };
      out.push(U.strandLength(o, st, A) / A);
    }
    return out;
  });
  const spread = (Math.max.apply(null, ratios) - Math.min.apply(null, ratios)) / ratios[0];
  is(spread < 1e-12, `⭐ THE INVARIANCE: around÷across is identical at 5 sizes (spread ${spread.toExponential(2)})`);

  /* =================================================================
     L9 — the flag is gated by the MODEL, driven in the browser
     ================================================================= */
  const flagState = await page.evaluate(() => {
    const U = window.UnrollTape;
    U.st = { shape: 0, A: 150, t: 0, flag: null, committed: false }; U.render();
    const hasGrip = !!document.querySelector('.urt-flag');
    U.st = U.setFlag(U.st, U.outlineFor(U.shelf()[0]), 3) || U.st;
    U.st = U.setPeel(U.st, 0.4) || U.st; U.render();
    const afterPeel = !!document.querySelector('.urt-flag');
    const moved = U.setFlag(U.st, U.outlineFor(U.shelf()[0]), 5);
    return { hasGrip, afterPeel, refused: moved === null, committed: U.st.committed };
  });
  is(flagState.hasGrip, 'the flag is grabbable while the strand is still wrapped');
  is(flagState.committed, 'planting then peeling COMMITS the guess');
  is(!flagState.afterPeel, 'and the flag handle is gone once committed');
  is(flagState.refused, '⭐ and the model REFUSES to move it — not merely a disabled attribute');

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
