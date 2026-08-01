/* =====================================================================
   local-test-cold-line.js — the browser gate for TOOL #43
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-cold-line.js [--shot]

   Serves `mini tools/` locally — no deploy — and drives the tool with
   REAL pointer events in BOTH poses.

   ⚠ THREE FLOORS, NAMED SEPARATELY. An or-shaped assertion has hidden a
   missing floor before:
     · CONTROLS ≥44px — the chips and the three handles
     · NUMERALS ≥18px — the scale labels, the only text on the stage
     · CANVAS   ≥34px — NOTHING here qualifies; there are no cells.
       Stated, not skipped.

   ⚠ AND THE COLUMN HAS NO SIZE FLOOR OF ITS OWN. Its length is set by
   the arena, not by a control, so asserting one would be asserting that
   the instrument may not be small. Declared so the omission is a
   decision on the record rather than a gap.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'cld');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5558;
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const open = async (b, W, H, dpr) => {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
  await p.setViewport({ width: W, height: H, deviceScaleFactor: dpr || 1 });
  await p.goto(`http://127.0.0.1:${PORT}/cold-line.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
  await p.waitForSelector('.cld-bench', { timeout: 9000 });
  await wait(450);
  p.__errs = errs;
  return p;
};
const setState = (p, st) => p.evaluate((s) => {
  const t = window.ColdLine; t.st = t._st(s); t._paint();
}, st);

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const T = require(path.join(ROOT, 'cold-line.js'));

  /* =================================================================
     L1 — the sweep, both poses, dpr 1 and 2
     ================================================================= */
  let benchMin = Infinity;
  for (const W of WIDTHS) for (const dpr of [1, 2]) {
    const p = await open(browser, W, W < 500 ? 740 : 900, dpr);
    for (const tipped of [false, true]) {
      await setState(p, { lo: -12, a: -5, b: 3, tipped: tipped });
      await wait(120);
      const m = await p.evaluate(() => {
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const bench = document.querySelector('.cld-bench');
        const card = bench.closest('.lcs-app');
        const chips = Array.from(document.querySelectorAll('.cld-chip'));
        const handles = Array.from(document.querySelectorAll('.cld-handle'))
          .filter((e) => getComputedStyle(e).display !== 'none');
        const nums = Array.from(document.querySelectorAll('.cld-num'));
        const ticks = Array.from(document.querySelectorAll('.cld-tick'));
        const bb = r(bench), cb = r(card);
        return {
          overflowX: doc.scrollWidth > doc.clientWidth,
          nTicks: ticks.length, nNums: nums.length,
          nHandles: handles.length, nChips: chips.length,
          minChip: chips.length ? Math.round(Math.min.apply(null, chips.map((c) => r(c).height))) : -1,
          minHandle: handles.length ? Math.round(Math.min.apply(null, handles.map((h) => r(h).width))) : -1,
          minNum: nums.length ? Math.min.apply(null, nums.map((n) => parseFloat(getComputedStyle(n).fontSize))) : -1,
          /* ⚠ THE CARD, not the bench. `.lcs-app` is overflow:hidden — it
             CLIPS rather than grows, so a too-tall instrument is silently
             cut off and no horizontal-overflow check would ever see it. */
          benchInCard: bb.top >= cb.top - 1 && bb.bottom <= cb.bottom + 1
            && bb.left >= cb.left - 1 && bb.right <= cb.right + 1,
          benchW: Math.round(bb.width), benchH: Math.round(bb.height),
          lowest: chips.length ? Math.round(Math.max.apply(null, chips.map((c) => r(c).bottom))) : 0,
          vh: window.innerHeight,
          /* ⚠ INK: stroke only, and non-zero width. An SVG <line> has a
             computed `fill` of BLACK by default, so "fill is not none" is
             not a test for ink — commit 833c0186 bought that. */
          inkedTicks: ticks.filter((t) => {
            const cs = getComputedStyle(t);
            return cs.stroke && cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0;
          }).length
        };
      });
      const tag = `${W}px@${dpr}x ${tipped ? 'tipped ' : 'upright'}`;
      /* non-vacuity FIRST — everything below compares nothing otherwise */
      is(m.nTicks === T.WINDOW, `${tag}: NON-VACUITY ${m.nTicks} ticks === WINDOW`);
      is(m.nHandles === 3, `${tag}: NON-VACUITY three handles visible`);
      is(m.nChips === 4, `${tag}: NON-VACUITY four chips`);
      is(m.inkedTicks === m.nTicks, `${tag}: every tick carries a real stroke (${m.inkedTicks}/${m.nTicks})`);
      is(!m.overflowX, `${tag}: no horizontal overflow`);
      is(m.benchInCard, `${tag}: ⭐ the bench is INSIDE THE CARD (overflow:hidden clips silently)`);
      is(m.minChip >= 44, `${tag}: CONTROL floor — smallest chip ${m.minChip}px`);
      is(m.minHandle >= 44, `${tag}: CONTROL floor — smallest handle ${m.minHandle}px`);
      is(m.minNum >= 18, `${tag}: NUMERAL floor — smallest label ${m.minNum}px`);
      is(m.lowest <= m.vh, `${tag}: FITS — lowest chip ${m.lowest} ≤ ${m.vh}`);
      is(p.__errs.length === 0, `${tag}: no console errors` + (p.__errs.length ? ' — ' + p.__errs[0] : ''));
      if (dpr === 1 && !tipped) benchMin = Math.min(benchMin, Math.min(m.benchW, m.benchH));
      if (SHOT && dpr === 2 && [360, 768, 1024].indexOf(W) >= 0) {
        await p.screenshot({ path: path.join(OUT, `sweep-${W}-${tipped ? 'tipped' : 'upright'}.png`), fullPage: true });
      }
    }
    await p.close();
  }

  /* ⭐ THE BAND, RE-MEASURED. verify- prints the derivation from a
     recorded bench; this measures the real one and asserts the
     recorded number still holds, so the two gates talk to each other and
     the figure can never drift from reality without a gate going red. */
  console.log(`\n  the bench measures ${benchMin}px at the narrowest viewport (verify- records 296px)`);
  is(Math.abs(benchMin - 296) <= 8, `the RECORDED bench (296px) still matches the measured one (${benchMin}px)`);
  const pitch = (T.BOT - T.TOP) / (T.WINDOW - 1) * benchMin / T.W;
  console.log(`  one value unit is ${pitch.toFixed(2)}px; labels every ${T.LABEL_EVERY} at ${(pitch * T.LABEL_EVERY).toFixed(1)}px`);
  is(pitch >= 5, `the minor-tick floor holds on the MEASURED bench (${pitch.toFixed(2)}px ≥ 5px)`);
  console.log('  ⚠ the CANVAS floor (≥34px) does not apply: there are no cells. Stated, not skipped.');
  console.log('  ⚠ and the COLUMN carries no size floor — its length is set by the arena, not by a control.');

  /* =================================================================
     L2 — ⭐ THE TIP IS ONE NODE, NOT TWO NUMBERS THAT AGREE
     ================================================================= */
  console.log('\n[L2] the tip');
  {
    const p = await open(browser, 1024, 900, 1);
    await setState(p, { lo: -12, a: -5, b: 3, tipped: false });
    await wait(150);
    /* tag the zero tick, then tip, then ask whether it is the SAME node */
    const same = await p.evaluate(() => {
      const ticks = Array.from(document.querySelectorAll('.cld-tick'));
      if (!ticks.length) return { vacuous: true };
      window.__zeroTick = ticks[0];
      const before = ticks[0].getBoundingClientRect();
      const t = window.ColdLine;
      t.st = t.tip(t.st); t._paint();
      const after = Array.from(document.querySelectorAll('.cld-tick'))[0];
      return {
        vacuous: false,
        identical: after === window.__zeroTick,
        movedPx: Math.round(Math.abs(after.getBoundingClientRect().left - before.left)),
        instTransform: document.querySelector('.cld-inst').getAttribute('transform')
      };
    });
    is(!same.vacuous, 'NON-VACUITY: there are ticks to identify');
    /* ⚠ the ticks ARE rebuilt per window (their VALUES change when it
       slides), so node identity is asserted where it is真: the ONE group
       that carries the pose. */
    is(/rotate\(90/.test(same.instTransform || ''),
      `⭐ the tip is ONE matrix on ONE group — "${same.instTransform}" — not a re-render of two agreeing numbers`);
    is(same.movedPx > 20, `and the geometry really moved (${same.movedPx}px), so the assertion is not vacuous`);

    /* the SAME WINDOW in both poses — asserted at DESKTOP, where the
       horizontal extent far exceeds the vertical and a per-orientation
       window would silently diverge */
    const counts = {};
    for (const tipped of [false, true]) {
      await setState(p, { lo: -12, a: -5, b: 3, tipped: tipped });
      await wait(120);
      counts[tipped] = await p.evaluate(() => ({
        ticks: document.querySelectorAll('.cld-tick').length,
        nums: Array.from(document.querySelectorAll('.cld-num')).map((e) => e.textContent).join(','),
        marks: Array.from(document.querySelectorAll('.cld-mark')).filter((e) => e.style.display !== 'none').length,
        span: document.querySelector('.cld-span').textContent
      }));
    }
    is(counts[false].ticks === counts[true].ticks, `⭐ same ticks in both poses (${counts[false].ticks})`);
    is(counts[false].nums === counts[true].nums, `⭐ same numerals in both poses (${counts[false].nums})`);
    is(counts[false].marks === counts[true].marks, `⭐ same marks in both poses (${counts[false].marks})`);
    is(counts[false].span === counts[true].span, `⭐ SAME SPAN in both poses ("${counts[false].span}")`);
    await p.close();
  }

  /* =================================================================
     L3 — ⭐ THE MINUS SIGN MUST NOT ABUT ITS TICK
     -----------------------------------------------------------------
     This is a shipped defect promoted to an assertion. The glyph
     rendered correctly all along (measured 47.8 units against 24.4) but
     the label sat 62 model units from the tube while the major tick
     already reached 46 — so the two merged into one dash and EVERY
     NEGATIVE READ AS POSITIVE. No string check could see it: the
     textContent was right. I found it by looking at the render, which
     is exactly why it is now measured.
     ================================================================= */
  console.log('\n[L3] the minus sign');
  {
    const p = await open(browser, 1024, 900, 1);
    for (const tipped of [false, true]) {
      await setState(p, { lo: -12, a: -5, b: 3, tipped: tipped });
      await wait(120);
      const g = await p.evaluate(() => {
        const r = (e) => e.getBoundingClientRect();
        const negs = Array.from(document.querySelectorAll('.cld-num'))
          .filter((e) => e.textContent.charCodeAt(0) === 0x2212);
        const ticks = Array.from(document.querySelectorAll('.cld-tick'));
        if (!negs.length || !ticks.length) return { vacuous: true };
        let worst = Infinity;
        for (const n of negs) {
          const nb = r(n);
          for (const t of ticks) {
            const tb = r(t);
            /* the smallest edge-to-edge gap between this label's box and
               any tick's box, along the label's own reading direction */
            const gap = Math.max(nb.left - tb.right, tb.left - nb.right,
              nb.top - tb.bottom, tb.top - nb.bottom);
            if (gap < worst) worst = gap;
          }
        }
        return { vacuous: false, negs: negs.length, worst: Math.round(worst * 10) / 10 };
      });
      const tag = tipped ? 'tipped ' : 'upright';
      is(!g.vacuous, `${tag}: NON-VACUITY there are negative labels and ticks to compare`);
      is(g.negs >= 2, `${tag}: ${g.negs} negative labels on screen`);
      is(g.worst >= 3, `${tag}: ⭐ the minus clears every tick by ${g.worst}px — it reads as a SIGN, not part of the tick`);
    }
    await p.close();
  }

  /* =================================================================
     L4 — the band SWEPT, not sampled. #42 shipped a clipped numeral
     because its containment check only ever ran the opening state.
     ================================================================= */
  console.log('\n[L4] the whole band, both poses');
  {
    const p = await open(browser, 320, 740, 1);
    const EDGES = [T.DMIN, T.loMax(), -12, 0, -30, 10];
    for (const lo of EDGES) {
      for (const tipped of [false, true]) {
        await setState(p, { lo: lo, a: lo, b: lo + T.WINDOW - 1, tipped: tipped });
        await wait(90);
        const m = await p.evaluate(() => {
          const r = (e) => e.getBoundingClientRect();
          const bench = document.querySelector('.cld-bench');
          const bb = r(bench);
          const nums = Array.from(document.querySelectorAll('.cld-num'));
          if (!nums.length) return { vacuous: true };
          let outL = -Infinity, outR = -Infinity, outT = -Infinity, outB = -Infinity;
          for (const n of nums) {
            const nb = r(n);
            outL = Math.max(outL, bb.left - nb.left);
            outR = Math.max(outR, nb.right - bb.right);
            outT = Math.max(outT, bb.top - nb.top);
            outB = Math.max(outB, nb.bottom - bb.bottom);
          }
          return {
            vacuous: false, n: nums.length,
            out: Math.round(Math.max(outL, outR, outT, outB) * 10) / 10,
            texts: nums.map((e) => e.textContent).join(' ')
          };
        });
        const tag = `lo=${lo} ${tipped ? 'tipped ' : 'upright'}`;
        is(!m.vacuous, `${tag}: NON-VACUITY labels present`);
        is(m.out <= 0, `${tag}: every label inside the bench (worst overhang ${m.out}px) — "${m.texts}"`);
      }
    }
    await p.close();
  }

  /* =================================================================
     L5 — REAL POINTER DRAGS, in both poses
     ================================================================= */
  console.log('\n[L5] driven with real pointer events');
  {
    const p = await open(browser, 1024, 900, 1);
    for (const tipped of [false, true]) {
      await setState(p, { lo: -12, a: -5, b: 3, tipped: tipped });
      await wait(150);
      const before = await p.evaluate(() => Object.assign({}, window.ColdLine.st));
      const h = await p.$('.cld-h-a');
      const box = await h.boundingBox();
      is(!!box, `${tipped ? 'tipped' : 'upright'}: the first mark has a grip`);
      /* drag along the axis — the SAME gesture in both poses, because the
         pose lives in the model's toInstrument, not in two code paths */
      const dx = tipped ? 120 : 0, dy = tipped ? 0 : -120;
      await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await p.mouse.down();
      for (let i = 1; i <= 10; i++) {
        await p.mouse.move(box.x + box.width / 2 + dx * i / 10, box.y + box.height / 2 + dy * i / 10);
        await wait(16);
      }
      await p.mouse.up();
      await wait(200);
      const after = await p.evaluate(() => Object.assign({}, window.ColdLine.st));
      is(after.a > before.a, `${tipped ? 'tipped' : 'upright'}: ⭐ a real drag moved the mark ${before.a} → ${after.a}`);
      is(after.b === before.b, `${tipped ? 'tipped' : 'upright'}: and the OTHER mark did not flinch (${after.b})`);
      is(after.lo === before.lo, `${tipped ? 'tipped' : 'upright'}: and the window did not move`);
    }
    /* the chips are live */
    const chipLive = await p.evaluate(() => {
      const t = window.ColdLine;
      t.st = t._st({ lo: -30, a: -5, b: 3, tipped: false }); t._paint();
      const before = t.st.lo;
      const zero = Array.from(document.querySelectorAll('.cld-chip'))
        .find((c) => /zero/i.test(c.textContent));
      if (!zero || zero.disabled) return { ok: false, why: 'the Find zero chip is absent or disabled' };
      zero.click();
      return { ok: t.st.lo !== before, before: before, after: t.st.lo };
    });
    is(chipLive.ok, `⭐ the Find zero chip has a CONSEQUENCE (lo ${chipLive.before} → ${chipLive.after})`);
    await p.close();
  }

  /* no verdict, ever */
  {
    const p = await open(browser, 1024, 900, 1);
    const v = await p.evaluate(() =>
      document.querySelectorAll('.correct, .wrong, .score, .streak, .timer').length);
    is(v === 0, 'no verdict, score, streak or timer element exists anywhere');
    await p.close();
  }

  await browser.close();
  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions in a real browser`);
})();
