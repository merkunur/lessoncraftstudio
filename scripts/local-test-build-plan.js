/* =====================================================================
   local-test-build-plan.js — the browser gate for TOOL #44
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-build-plan.js [--shot]

   Serves `mini tools/` locally — no deploy — and drives the tool with
   REAL pointer events.

   ⚠ THREE FLOORS, NAMED SEPARATELY. An or-shaped assertion has hidden a
   missing floor twice:
     · CONTROLS ≥44px — the four chips
     · CANVAS   ≥34px — the eighteen hit-targets, which sit ON the
       apparatus and scale with it. The building's columns were 11% of
       the arena in the first draft = 32.6px at a 320px page, UNDER the
       floor and invisible to any check that measures only chips.
     · NUMERALS ≥18px — the nine blueprint numerals, the only text on
       the stage.

   ⭐⭐ AND THE PROJECTIONS ARE MEASURED OFF THE RENDER, NOT THE MODEL.
   A gate that reads front()/side() and compares them to what front()
   and side() returned is asking the tool to confirm itself. Here the
   profile heights are COUNTED IN THE DOM and compared against heights
   counted from the drawn cubes — two independent renders of the same
   nine integers.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'bpl');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5573;
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'build-plan.html';
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
  /* ⚠ /api/quota/status and /favicon.ico 404 on a static server BY
     DESIGN — the entitlement fetch is meant to fail closed and stay
     pessimistic offline. Counting them as errors condemns a correct
     tool, which is how the shoot harness reported five failures. */
  p.on('console', (m) => {
    if (m.type() === 'error' && !/404|net::ERR|favicon|quota\/status/.test(m.text())) errs.push(m.text());
  });
  await p.setViewport({ width: W, height: H, deviceScaleFactor: dpr || 1 });
  await p.goto(`http://127.0.0.1:${PORT}/build-plan.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
  await p.waitForSelector('.bpl-bench', { timeout: 9000 });
  await wait(420);
  p.__errs = errs;
  return p;
};
const setState = (p, h) => p.evaluate((hh) => {
  const t = window.BuildPlan; t.st = t._st({ h: hh }); t._paint();
}, h);

/* three states worth driving everywhere */
const RAGGED = [1, 2, 3, 1, 2, 3, 1, 2, 3];
const DETERMINED = [4, 4, 4, 0, 0, 0, 0, 0, 0];
const FULL = [4, 4, 4, 4, 4, 4, 4, 4, 4];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const T = require(path.join(ROOT, 'build-plan.js'));

  /* =================================================================
     L1 — the sweep
     ================================================================= */
  console.log('\n[L1] the sweep, three states, dpr 1 and 2');
  let benchMin = Infinity;
  for (const W of WIDTHS) for (const dpr of [1, 2]) {
    const p = await open(browser, W, W < 500 ? 740 : 900, dpr);
    for (const h of [RAGGED, DETERMINED, FULL]) {
      await setState(p, h);
      await wait(90);
      const m = await p.evaluate(() => {
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const bench = document.querySelector('.bpl-bench');
        const card = bench.closest('.lcs-app');
        const bb = r(bench), cb = r(card);
        const chips = Array.from(document.querySelectorAll('.bpl-chip'));
        const hits = Array.from(document.querySelectorAll('.bpl-hit'))
          .filter((e) => getComputedStyle(e).display !== 'none');
        const nums = Array.from(document.querySelectorAll('.bpl-num'));
        const cells = Array.from(document.querySelectorAll('.bpl-cell'));
        return {
          overflowX: doc.scrollWidth > doc.clientWidth,
          nCells: cells.length, nNums: nums.length, nHits: hits.length, nChips: chips.length,
          benchW: bb.width, benchH: bb.height,
          /* ⚠ against THE CARD. `.lcs-app` is overflow:hidden — it CLIPS
             rather than grows, so a too-tall stage is silently cut off
             and no horizontal-overflow check would ever see it. */
          benchInCard: bb.top >= cb.top - 1 && bb.bottom <= cb.bottom + 1
            && bb.left >= cb.left - 1 && bb.right <= cb.right + 1,
          minChip: chips.length ? Math.min.apply(null, chips.map((c) => r(c).height)) : -1,
          minHit: hits.length ? Math.min.apply(null, hits.map((e) => Math.min(r(e).width, r(e).height))) : -1,
          minNum: nums.length ? Math.min.apply(null, nums.map((n) => parseFloat(getComputedStyle(n).fontSize))) : -1,
          lowest: chips.length ? Math.max.apply(null, chips.map((c) => r(c).bottom)) : 0,
          vh: window.innerHeight,
          /* every numeral must actually carry a digit */
          inked: nums.filter((n) => /^[0-4]$/.test(n.textContent)).length
        };
      });
      const tag = `${W}px@${dpr}x`;
      is(m.nCells === 9, `${tag}: NON-VACUITY nine blueprint squares (got ${m.nCells})`);
      is(m.nNums === 9 && m.inked === 9, `${tag}: NON-VACUITY nine numerals, all a digit 0-4`);
      is(m.nHits === 18, `${tag}: NON-VACUITY eighteen hit-targets — nine per end (got ${m.nHits})`);
      is(m.nChips === 4, `${tag}: NON-VACUITY four chips (got ${m.nChips})`);
      /* ⭐⭐ THE ARENA IS SQUARE. #43 shipped a rectangle here and every
         %-positioned control drifted off what it drove. */
      is(Math.abs(m.benchW - m.benchH) <= 1,
        `${tag}: ⭐⭐ the arena is SQUARE — ${Math.round(m.benchW)}x${Math.round(m.benchH)}`);
      is(!m.overflowX, `${tag}: no horizontal overflow`);
      is(m.benchInCard, `${tag}: ⭐ the stage is INSIDE THE CARD (overflow:hidden clips silently)`);
      is(m.minChip >= 44, `${tag}: CONTROL floor — smallest chip ${m.minChip.toFixed(1)}px`);
      is(m.minHit >= 34, `${tag}: CANVAS floor — smallest hit-target ${m.minHit.toFixed(1)}px`);
      is(m.minNum >= 18, `${tag}: NUMERAL floor — smallest numeral ${m.minNum.toFixed(1)}px`);
      is(m.lowest <= m.vh, `${tag}: FITS — lowest chip ${Math.round(m.lowest)} <= ${m.vh}`);
      is(p.__errs.length === 0, `${tag}: no console errors` + (p.__errs.length ? ' — ' + p.__errs[0] : ''));
      if (dpr === 1) benchMin = Math.min(benchMin, m.benchW);
    }
    if (SHOT && [360, 768, 1024].indexOf(W) >= 0 && dpr === 2) {
      await p.screenshot({ path: path.join(OUT, `sweep-${W}.png`), fullPage: true });
    }
    await p.close();
  }
  console.log(`\n  the arena measures ${Math.round(benchMin)}px at the narrowest viewport`);
  {
    /* the CANVAS floor, re-derived from the measured arena rather than
       trusted from the CSS percentage */
    const cellPx = benchMin * 0.14;
    is(cellPx >= 34, `a hit-target is 14% of the arena = ${cellPx.toFixed(1)}px at the narrowest viewport, clear of the 34px canvas floor`);
  }

  /* =================================================================
     L2 — ⭐⭐ THE PROFILES, COUNTED IN THE DOM
     -----------------------------------------------------------------
     The heights of the two profiles are counted as RENDERED RECTS, and
     compared against heights counted from the RENDERED CUBES. Neither
     side of this comparison calls front() or side(), so the tool is
     not being asked to confirm itself.
     ================================================================= */
  console.log('\n[L2] the two profiles, measured off the render');
  {
    const p = await open(browser, 1024, 900, 1);
    const CASES = [RAGGED, DETERMINED, FULL, [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 3, 0, 3, 3, 3, 0, 3, 0], [4, 1, 0, 0, 2, 0, 3, 0, 1]];
    let bad = 0, checked = 0, vacuous = 0;
    for (const h of CASES) {
      await setState(p, h);
      await wait(80);
      const m = await p.evaluate(() => {
        const cubes = Array.from(document.querySelectorAll('.bpl-f-top[data-cube]'));
        /* height of each column, counted from the DRAWN cubes */
        const col = new Array(9).fill(0);
        for (const c of cubes) col[Number(c.getAttribute('data-col'))]++;
        /* height of each profile bar, counted from the DRAWN rects */
        const prof = (v) => {
          const o = [0, 0, 0];
          for (const e of document.querySelectorAll(`.bpl-vc[data-view="${v}"]`)) o[Number(e.getAttribute('data-col'))]++;
          return o;
        };
        return { col: col, front: prof('front'), side: prof('side'), nCubes: cubes.length };
      });
      /* the oracle, computed here from the DRAWN column heights */
      const wantFront = [0, 1, 2].map((c) => Math.max(m.col[c], m.col[3 + c], m.col[6 + c]));
      const wantSide = [0, 1, 2].map((r) => Math.max(m.col[r * 3], m.col[r * 3 + 1], m.col[r * 3 + 2]));
      const total = h.reduce((a, b) => a + b, 0);
      if (m.nCubes !== total) bad++;
      if (m.col.join() !== h.join()) bad++;
      if (m.front.join() !== wantFront.join()) { bad++; console.error(`    front ${m.front} want ${wantFront} for ${h}`); }
      if (m.side.join() !== wantSide.join()) { bad++; console.error(`    side ${m.side} want ${wantSide} for ${h}`); }
      if (total === 0 && m.nCubes === 0) vacuous++;
      checked++;
    }
    is(checked === CASES.length, `NON-VACUITY: ${checked} states rendered and measured`);
    is(vacuous === 1, 'the empty building is one of them, and it really draws nothing');
    is(bad === 0, `⭐⭐ every rendered profile matches the rendered cubes, and the cubes match the numerals: ${bad} faults`);
    await p.close();
  }

  /* =================================================================
     L3 — ⭐ EVERY CONTROL SITS ON THE THING IT DRIVES
     #43 shipped a tool whose handles drifted off their marks, so each
     mark drew as TWO circles, with seven suites green.
     ================================================================= */
  console.log('\n[L3] the hit-targets are concentric with what they drive');
  for (const W of [320, 412, 768, 1366]) {
    const p = await open(browser, W, W < 500 ? 740 : 900, 1);
    for (const h of [RAGGED, FULL, [0, 0, 0, 0, 0, 0, 0, 0, 0]]) {
      await setState(p, h);
      await wait(80);
      const m = await p.evaluate(() => {
        const mid = (e) => { const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, w: b.width }; };
        const cells = Array.from(document.querySelectorAll('.bpl-cell')).map(mid);
        const nums = Array.from(document.querySelectorAll('.bpl-num')).map(mid);
        const hp = Array.from(document.querySelectorAll('.bpl-h-plan')).map(mid);
        const hc = Array.from(document.querySelectorAll('.bpl-h-col')).map(mid);
        /* the TOP face of each column = the drawn cube with the highest
           data-z for that column; when a column is empty there is none */
        const tops = {};
        for (const e of document.querySelectorAll('.bpl-f-top[data-cube]')) {
          const c = Number(e.getAttribute('data-col')), z = Number(e.getAttribute('data-z'));
          if (!tops[c] || z > tops[c].z) tops[c] = { z: z, m: mid(e) };
        }
        return { cells: cells, nums: nums, hp: hp, hc: hc, tops: tops };
      });
      const d = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
      let planBad = 0, numBad = 0, colBad = 0, colChecked = 0;
      for (let i = 0; i < 9; i++) {
        const tol = Math.max(2, m.cells[i].w * 0.12);
        if (d(m.hp[i], m.cells[i]) > tol) planBad++;
        if (d(m.nums[i], m.cells[i]) > tol) numBad++;
        const t = m.tops[i];
        if (t) { colChecked++; if (d(m.hc[i], t.m) > Math.max(3, t.m.w * 0.2)) colBad++; }
      }
      const tag = `${W}px h=${h[0]}${h[4]}${h[8]}`;
      is(planBad === 0, `${tag}: every blueprint target is centred on its square: ${planBad} off`);
      is(numBad === 0, `${tag}: every numeral is centred in its square: ${numBad} off`);
      if (h.reduce((a, b) => a + b, 0) > 0) {
        is(colChecked === 9, `${tag}: NON-VACUITY all nine columns have a drawn top face (got ${colChecked})`);
        is(colBad === 0, `${tag}: ⭐ every building target sits on its column's TOP face: ${colBad} off`);
      }
    }
    await p.close();
  }

  /* =================================================================
     L4 — real pointer drags, and the keyboard
     ================================================================= */
  console.log('\n[L4] driven with real pointer events, and with keys');
  {
    const p = await open(browser, 1024, 900, 1);
    for (const sel of ['.bpl-h-plan', '.bpl-h-col']) {
      await setState(p, [2, 2, 2, 2, 2, 2, 2, 2, 2]);
      await wait(80);
      const btn = (await p.$$(sel))[4];                 /* the middle one */
      const box = await btn.boundingBox();
      is(!!box && box.width >= 34, `${sel}: there is something to take hold of (${Math.round(box.width)}px)`);
      const before = await p.evaluate(() => window.BuildPlan.st.h.slice());
      await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await p.mouse.down();
      for (let i = 1; i <= 10; i++) { await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2 - i * 9); await wait(14); }
      await p.mouse.up();
      await wait(220);
      const after = await p.evaluate(() => window.BuildPlan.st.h.slice());
      is(after[4] > before[4], `${sel}: ⭐ a real upward drag RAISED that column ${before[4]} -> ${after[4]}`);
      let others = 0;
      for (let i = 0; i < 9; i++) if (i !== 4 && after[i] !== before[i]) others++;
      is(others === 0, `${sel}: …and no other column moved (${others} did)`);
    }
    /* the keyboard path — a drag-only target is dead to assistive tech
       and a synthetic .click() never fires pointerdown (#41) */
    await setState(p, [2, 2, 2, 2, 2, 2, 2, 2, 2]);
    await wait(60);
    for (const sel of ['.bpl-h-plan', '.bpl-h-col']) {
      const b0 = await p.evaluate(() => window.BuildPlan.st.h.slice());
      await p.evaluate((s) => document.querySelectorAll(s)[0].focus(), sel);
      await p.keyboard.press('ArrowUp');
      await wait(90);
      const b1 = await p.evaluate(() => window.BuildPlan.st.h.slice());
      is(b1[0] === b0[0] + 1, `${sel}: ArrowUp raises by one (${b0[0]} -> ${b1[0]})`);
      await p.keyboard.press('ArrowDown');
      await wait(90);
      const b2 = await p.evaluate(() => window.BuildPlan.st.h.slice());
      is(b2[0] === b0[0], `${sel}: ArrowDown lowers it back (${b1[0]} -> ${b2[0]})`);
    }
    /* ⭐ A TAP NEVER WRAPS (#39 shipped +30 -> -30) */
    await setState(p, [4, 0, 0, 0, 0, 0, 0, 0, 0]);
    await wait(60);
    await p.evaluate(() => document.querySelectorAll('.bpl-h-plan')[0].click());
    await wait(90);
    const capped = await p.evaluate(() => window.BuildPlan.st.h[0]);
    is(capped === 4, `⭐ a tap at the ceiling CLAMPS and does not wrap (still ${capped})`);
    await p.close();
  }

  /* =================================================================
     L5 — ⭐⭐ EVERY CONTROL CHANGES SOMETHING ELSE
     #39 shipped a numeral strip whose only effect was its own
     highlight class, and it scored 84/84 on the liveness gate, which
     asks "did the DOM change?" — a control that highlights ITSELF
     changes the DOM. Here each control is asserted on what it changes
     ELSEWHERE, and on what it must LEAVE ALONE.
     ================================================================= */
  console.log('\n[L5] every control has a consequence elsewhere');
  {
    const p = await open(browser, 1024, 900, 1);
    const res = await p.evaluate(() => {
      const t = window.BuildPlan;
      const out = [];
      /* ⚠⚠ BY INDEX, NEVER BY ENGLISH TEXT — and this tool proves why.
         The first version matched the print chip with /print/i, which
         also matches "Another BLUEPRINT", and `.find()` returns the
         first hit. So the print assertion clicked the WRONG CONTROL and
         reported a defect in a tool that was fine.
         ⚠ And my throwaway probe "confirmed" the bug, because it made
         the same mistake on a fresh page where _next() opens the gate
         on its first call anyway — a wrong measurement agreeing with a
         wrong measurement. The recipe's rule (reach controls by index)
         exists for exactly this.
         Order is fixed by _build(): turn, another-one, next, print. */
      const CHIP = { turn: 0, same: 1, next: 2, print: 3 };
      const chips = () => Array.from(document.querySelectorAll('.bpl-chip'));
      const chip = (k) => chips()[CHIP[k]];
      const set = (h) => { t.st = t._st({ h: h }); t._paint(); };
      const prof = (v) => {
        const o = [0, 0, 0];
        for (const e of document.querySelectorAll(`.bpl-vc[data-view="${v}"]`)) o[Number(e.getAttribute('data-col'))]++;
        return o.join(',');
      };
      const cubeCount = () => document.querySelectorAll('.bpl-f-top[data-cube]').length;

      /* --- the turn: the profiles SWAP, and the cube count is kept -- */
      set([1, 2, 3, 1, 2, 3, 1, 2, 3]);
      const f0 = prof('front'), s0 = prof('side'), n0 = cubeCount(), h0 = t.st.h.join();
      const turn = chip('turn');
      if (!turn || turn.disabled) out.push(['the turn chip', false, 'absent or disabled']);
      else {
        turn.click();
        out.push(['the turn changes the blueprint', t.st.h.join() !== h0, `${h0} -> ${t.st.h.join()}`]);
        out.push(['…and the FRONT profile becomes the old SIDE, reversed',
          prof('front') === s0.split(',').reverse().join(','), `${f0} -> ${prof('front')} (old side ${s0})`]);
        out.push(['…and not one cube is added or lost', cubeCount() === n0, `${n0} cubes`]);
      }

      /* --- the turn on a SYMMETRIC building: visibly nothing, and
             that is the point, so it must NOT be disabled ------------ */
      set([4, 1, 4, 1, 1, 1, 4, 1, 4]);
      const symBefore = t.st.h.join();
      const symChip = chip('turn');
      out.push(['the turn stays ENABLED on a symmetric building', !symChip.disabled, 'not disabled']);
      symChip.click();
      out.push(['…and on that one it honestly changes nothing', t.st.h.join() === symBefore,
        'the 125 turn-invariant buildings are a fact, not a bug']);

      /* --- the payoff: the BUILDING changes, the PROFILES do not ---- */
      set([1, 2, 3, 1, 2, 3, 1, 2, 3]);
      const pf = prof('front'), ps = prof('side'), ph = t.st.h.join();
      const same = chip('same');
      if (!same || same.disabled) out.push(['the payoff chip', false, 'absent or disabled on an ambiguous building']);
      else {
        same.click();
        out.push(['⭐ the payoff chip gives a DIFFERENT building', t.st.h.join() !== ph, `${ph} -> ${t.st.h.join()}`]);
        out.push(['⭐⭐ …and BOTH profiles are untouched — that is the whole lesson',
          prof('front') === pf && prof('side') === ps, `front ${pf}, side ${ps}`]);
      }

      /* --- and it goes DEAD on a determined building ---------------- */
      set([4, 4, 4, 0, 0, 0, 0, 0, 0]);
      out.push(['⭐ the payoff chip is DISABLED where the two directions determine the building',
        chip('same').disabled === true, 'disabled on a determined pair']);
      set([1, 2, 3, 1, 2, 3, 1, 2, 3]);
      out.push(['…and live again where they do not', chip('same').disabled === false, 'enabled']);

      /* --- next: a different setting ------------------------------- */
      const nh = t.st.h.join();
      chip('next').click();
      out.push(['the next chip serves a different building', t.st.h.join() !== nh, `${nh} -> ${t.st.h.join()}`]);

      /* --- print on the free tier: the gate appears ----------------- */
      Array.from(document.querySelectorAll('.bpl-gate')).forEach((e) => e.remove());
      chip('print').click();
      out.push(['the print chip has a consequence on the free tier',
        document.querySelectorAll('.bpl-gate').length > 0 || document.querySelectorAll('.bpl-sheet svg').length > 0,
        'the gate or the sheet appeared']);
      Array.from(document.querySelectorAll('.bpl-gate')).forEach((e) => e.remove());

      /* --- a single column: one profile may move, the other may not
             when the change is hidden behind a taller neighbour ------ */
      set([3, 3, 3, 3, 1, 3, 3, 3, 3]);
      const bf = prof('front'), bs = prof('side'), bc = cubeCount();
      t.st = t.setHeight(t.st, 1, 1, 2) || t.st; t._paint();
      out.push(['raising a hidden column adds cubes', cubeCount() > bc, `${bc} -> ${cubeCount()}`]);
      out.push(['⭐ …and BOTH profiles stay exactly the same, because a taller neighbour hides it',
        prof('front') === bf && prof('side') === bs, `front ${bf}, side ${bs}`]);
      return out;
    });
    for (const [what, ok, detail] of res) is(ok, `⭐ ${what} — ${detail}`);
    /* ⚠ the floor is the REAL count, not a round number I liked: turn 3
       + symmetric 2 + payoff 2 + disabled/enabled 2 + next 1 + print 1
       + hidden column 2 = 13. My first version asserted 15 and failed a
       correct run — an inflated non-vacuity bound is a gate that fails
       on correct code and teaches you to loosen it. */
    is(res.length === 13, `NON-VACUITY: ${res.length} consequence assertions ran, all four chips and both ends covered`);
    await p.close();
  }

  /* =================================================================
     L6 — the standing refusals, on the rendered page
     ================================================================= */
  console.log('\n[L6] the refusals');
  {
    const p = await open(browser, 1024, 900, 1);
    await setState(p, RAGGED);
    const m = await p.evaluate(() => ({
      verdict: document.querySelectorAll('.correct, .wrong, .score, .streak, .timer').length,
      inputs: document.querySelectorAll('input, textarea, .lcs-activity-keypad').length,
      /* the only text on the stage is a numeral */
      svgText: Array.from(document.querySelectorAll('.bpl-svg text')).map((e) => e.textContent).join('|'),
      sheetVisible: getComputedStyle(document.querySelector('.bpl-sheet')).display
    }));
    is(m.verdict === 0, 'no verdict, score, streak or timer element exists anywhere');
    is(m.inputs === 0, 'refuse: no input and no keypad — the tool never asks for a total');
    is(/^[0-4](\|[0-4])*$/.test(m.svgText),
      `⭐ the ONLY text on the apparatus is nine numerals — "${m.svgText}" (§23.2: no words on the apparatus)`);
    is(m.sheetVisible === 'none', 'the print sheet is hidden on screen and appears only in print');
    await p.close();
  }

  await browser.close();
  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions in a real browser`);
})();
