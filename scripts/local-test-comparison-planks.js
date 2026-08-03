/* =====================================================================
   local-test-comparison-planks.js — the browser gate for TOOL #42
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-comparison-planks.js [--shot]

   Serves `mini tools/` locally — no deploy — and drives the tool with
   REAL POINTER EVENTS, including the 2-axis detach that the shell's own
   `LCS.drag.linear` structurally cannot make (it is clientX-only).

   ⚠ THREE FLOORS, NAMED SEPARATELY. An or-shaped assertion has hidden a
   missing floor before:
     · CONTROLS  ≥44px — the chips and the three handles
     · CANVAS    ≥34px — nothing here qualifies; stated, not skipped
     · SOCKET    ≥28px — the DROP target. A drop target is not a tap
       target: the pointer is already captured and the child is steering,
       not aiming, so it earns its own number and its own reason.

   ⚠ AND THE PLANKS HAVE NO SIZE FLOOR, DELIBERATELY. A plank of 1 is
   SUPPOSED to render ~18px — it is a quantity, not a control. Asserting
   a floor on it would be asserting that the tool may not show small
   numbers. Declared here so the omission is a decision on the record
   rather than a gap.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'cmp');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5536;
/* 1400x880 is the EXACT Tier-A floor -- the widest bench this tool draws
   against the shortest viewport that draws it, and therefore the tightest
   cell in the sweep. It matters most HERE: this tool has the heaviest
   chrome in the batch (466px measured, gate open, German), so its Tier-A
   budget is 839 of 880 and there is no room for a guess.
   1366 stays as the CONTROL: nothing may move there. */
const WIDTHS = [320, 360, 412, 768, 1024, 1366, 1400, 1920, 2560];
const heightFor = (W) => (W >= 2400 ? 1440 : W >= 1800 ? 1080 : W >= 1400 ? 880 : W < 500 ? 740 : 900);

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

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* =================================================================
     L1 — the viewport sweep, at dpr 1 AND 2
     ================================================================= */
  let benchMin = Infinity;
  for (const W of WIDTHS) for (const dpr of [1, 2]) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    await page.setViewport({ width: W, height: heightFor(W), deviceScaleFactor: dpr });
    await page.goto(`http://127.0.0.1:${PORT}/comparison-planks.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.cmp-bench', { timeout: 9000 });
    await wait(450);

    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const r = (e) => e.getBoundingClientRect();
      const chips = Array.from(document.querySelectorAll('.cmp-chip'));
      const handles = Array.from(document.querySelectorAll('.cmp-handle'));
      const bench = document.querySelector('.cmp-bench');
      const card = bench.parentElement;
      return {
        overflowX: doc.scrollWidth > doc.clientWidth,
        minChip: Math.round(Math.min.apply(null, chips.map((c) => r(c).height))),
        minHandle: Math.round(Math.min.apply(null, handles.map((h) => r(h).width))),
        handles: handles.length,
        benchW: Math.round(r(bench).width),
        cardW: Math.round(r(card).width),
        lowest: Math.round(Math.max.apply(null, chips.map((c) => r(c).bottom))),
        vh: window.innerHeight,
        /* ⭐ THE CHECK THAT WAS MISSING, AND IT SHIPPED A DEFECT.
           Every gate here measured ONE box against a floor — overflow,
           tap size, containment. NOT ONE asked whether two rendered
           things LAND ON TOP OF EACH OTHER. The numerals were sized in
           px and offset in MODEL units, so on a phone bench the 16-unit
           offset was 5px and each numeral sat inside its own grip. Both
           boxes passed every floor they were measured against. */
        nums: Array.from(document.querySelectorAll('.cmp-num')).map((e) => {
          const b = r(e);
          return { top: b.top, bottom: b.bottom, size: parseFloat(getComputedStyle(e).fontSize) };
        }),
        grips: [r(document.querySelector('.cmp-h-a .cmp-grip')), r(document.querySelector('.cmp-h-b .cmp-grip'))]
          .map((b) => ({ top: b.top, bottom: b.bottom })),
        benchBox: { top: r(bench).top, bottom: r(bench).bottom }
      };
    });

    const tag = `${W}px@${dpr}x`;
    is(!m.overflowX, `${tag}: no horizontal overflow`);
    is(m.minChip >= 44, `${tag}: CONTROL floor — smallest chip ${m.minChip}px`);
    is(m.minHandle >= 44, `${tag}: CONTROL floor — smallest handle ${m.minHandle}px`);
    is(m.handles === 3, `${tag}: all three handles present`);
    is(m.benchW <= m.cardW, `${tag}: the bench is contained by THE CARD (${m.benchW} ≤ ${m.cardW})`);
    is(m.lowest <= m.vh, `${tag}: FITS — lowest control at ${m.lowest} ≤ ${m.vh}`);
    is(errs.length === 0, `${tag}: no console errors` + (errs.length ? ' — ' + errs[0] : ''));

    /* ⭐ NUMERAL vs GRIP — measured, per numeral, at every width.
       The numeral is above its plank (A) or below it (B), and the grip
       straddles the same x. Vacuity guard first: two numerals, or the
       whole block below compares nothing. */
    is(m.nums.length === 2, `${tag}: two numerals to measure (vacuity guard)`);
    if (m.nums.length === 2) {
      const gapA = Math.round(m.grips[0].top - m.nums[0].bottom);
      const gapB = Math.round(m.nums[1].top - m.grips[1].bottom);
      is(gapA >= 2, `${tag}: numeral A clears its grip by ${gapA}px`);
      is(gapB >= 2, `${tag}: numeral B clears its grip by ${gapB}px`);
      is(m.nums[0].top >= m.benchBox.top - 1 && m.nums[1].bottom <= m.benchBox.bottom + 1,
        `${tag}: both numerals stay inside the bench`);
      /* and legible: a numeral is the only text on the stage */
      const sz = Math.min(m.nums[0].size, m.nums[1].size);
      is(sz >= 18, `${tag}: NUMERAL floor — smallest numeral ${sz}px`);
    }
    if (dpr === 1) benchMin = Math.min(benchMin, m.benchW);

    if (SHOT && dpr === 2 && [360, 768, 1024].indexOf(W) >= 0) {
      await page.screenshot({ path: path.join(OUT, `sweep-${W}.png`), fullPage: true });
    }
    await page.close();
  }

  /* ⭐ THE BAND, MEASURED — the gate that derives it and the gate that
     measures it talk to each other, so N_MAX is never a preference. */
  const T = require(path.join(ROOT, 'comparison-planks.js'));
  const STROKE = 3, TICK = 8, FLOOR = 2 * STROKE + TICK;
  const unitPx = T.K * benchMin / T.W;
  console.log(`\n  the bench measures ${benchMin}px at the narrowest viewport`);
  console.log(`  one unit is therefore ${unitPx.toFixed(2)}px against a ${FLOOR}px bracket floor`);
  is(unitPx >= FLOOR, `⭐ the DERIVED band holds on the MEASURED bench (${unitPx.toFixed(2)}px ≥ ${FLOOR}px)`);
  console.log(`  ⚠ the planks themselves carry NO size floor: a plank of 1 is ${unitPx.toFixed(0)}px`);
  console.log(`    and is SUPPOSED to be — it is a quantity, not a control.`);

  /* =================================================================
     L2 — ⭐ THE 2-AXIS DETACH, driven with real pointer events
     ================================================================= */
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://127.0.0.1:${PORT}/comparison-planks.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.cmp-bench', { timeout: 9000 });
  await wait(500);

  const read = () => page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const at = (s, a) => { const e = q(s); return e ? Number(e.getAttribute(a)) : null; };
    const raw = (s, a) => { const e = q(s); return e ? e.getAttribute(a) : null; };
    const vis = (s) => { const e = q(s); return !!e && getComputedStyle(e).display !== 'none'; };
    return {
      phase: window.ComparisonPlanks.st.phase,
      a: window.ComparisonPlanks.st.a, b: window.ComparisonPlanks.st.b,
      aW: at('.cmp-a', 'width'), bW: at('.cmp-b', 'width'),
      ocW: at('.cmp-offcut', 'width'), ocX: at('.cmp-offcut', 'x'),
      ocWraw: raw('.cmp-offcut', 'width'),
      hollow: vis('.cmp-hollow'), socket: vis('.cmp-socket'),
      nums: Array.from(document.querySelectorAll('.cmp-num')).map((e) => e.textContent),
      textNodes: document.querySelectorAll('.cmp-bench .cmp-num').length,
      offcutNode: q('.cmp-offcut') === window.__ocRef,
      hoAria: q('.cmp-h-o') ? q('.cmp-h-o').getAttribute('aria-label') : null,
      rects: document.querySelectorAll('.cmp-bench rect').length
    };
  });
  await page.evaluate(() => { window.__ocRef = document.querySelector('.cmp-offcut'); });

  const before = await read();
  is(before.aW > 0 && before.bW > 0, `both planks render (${before.aW}, ${before.bW} model units)`);
  is(before.ocW === Math.abs(before.a - before.b) * 60, `the offcut is exactly the difference (${before.ocW})`);
  /* ⚠ no decimal may reach an attribute */
  is(!/\./.test(before.ocWraw), `and its width attribute carries no decimal point ("${before.ocWraw}")`);
  is(before.nums.length === 2, `⭐ EXACTLY TWO NUMERALS on the stage (${before.nums.join(', ')})`);
  is(before.textNodes === 2, `and exactly two text nodes — counted, not string-scanned`);

  const grip = await page.$('.cmp-h-o');
  is(!!grip, 'the offcut has a grip');
  /* ⭐ ONE ELEMENT, TWO JOBS — flagged by a native panel as a WIRING risk
     rather than a string problem, so it is asserted rather than trusted.
     While attached it is the BRACKET's grip; once free it is the PIECE's.
     Answering to one name in both states misdirects a screen-reader user
     in whichever state it is wrong for. */
  is(/bracket/i.test(before.hoAria || ''),
    `attached: the grip announces itself as THE BRACKET — "${before.hoAria}"`);
  const g = await grip.boundingBox();
  is(g.width >= 44 && g.height >= 44, `CONTROL floor — the grip is ${Math.round(g.width)}x${Math.round(g.height)}px`);

  /* ⭐ a genuinely 2-axis drag: down and to the left, which LCS.drag.linear
     could not express (clientX only) */
  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(g.x + g.width / 2 - i * 8, g.y + g.height / 2 + i * 14); await wait(20); }
  await page.mouse.up();
  await wait(250);

  const carried = await read();
  is(carried.phase === 'free' || carried.phase === 'laid', `⭐ a real 2-axis drag took the piece off (phase → ${carried.phase})`);
  is(carried.ocW === before.ocW, `⭐ AND THE PIECE KEPT ITS LENGTH (${before.ocW} → ${carried.ocW})`);
  is(carried.a === before.a && carried.b === before.b, '⭐ AND NEITHER PLANK CHANGED');
  is(carried.hollow === true, '⭐ and it left a HOLLOW where it came from');
  is(carried.offcutNode === true, '⭐⭐ AND IT IS THE SAME DOM NODE — re-parented, never copied');
  is(carried.rects === before.rects, `the stage's rect count never changed (${before.rects}) — no spawn frame`);
  is(carried.nums.length === 2, 'still exactly two numerals — the difference is never printed');

  /* the socket is a DROP target and earns its own floor */
  if (carried.phase === 'free') {
    const sock = await page.evaluate(() => {
      const e = document.querySelector('.cmp-socket');
      const r = e.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    is(sock.w >= 28, `SOCKET floor — the drop target is ${sock.w}px wide (a drop target is not a tap target)`);
  }

  /* =================================================================
     L3 — ⭐ THE PAYOFF, measured on the rendered DOM
     ================================================================= */
  const payoff = await page.evaluate(() => {
    const T = window.ComparisonPlanks;
    let n = T.st.phase === 'attached' ? T.cycleOffcut(T.st) : T.st;
    n = T.cycleOffcut(n) || n;
    T.st = n; T._paint();
    const q = (s) => document.querySelector(s);
    const num = (e, a) => Number(e.getAttribute(a));
    const oc = q('.cmp-offcut');
    const longer = T.roleOf(T.st) === 'a' ? q('.cmp-a') : q('.cmp-b');
    const shorter = T.roleOf(T.st) === 'a' ? q('.cmp-b') : q('.cmp-a');
    return {
      compositeRight: num(oc, 'x') + num(oc, 'width'),
      longRight: T.longRight(T.st),
      shorterWidth: num(shorter, 'width'),
      shorterExpected: 60 * Math.min(T.st.a, T.st.b),
      /* ⚠ COMPARE AGAINST THE FAR LINE, NOT THE LONGER PLANK'S RECT.
         While the piece is off it, the longer plank legitimately draws
         only its MATCHED region, so its rendered right edge sits at min,
         not max — 157px short, which is exactly the offcut's own width.
         The far line is the element that marks where the longer plank
         reaches, and it has stood there since the first frame. */
      ocRight: oc.getBoundingClientRect().right,
      farRight: q('.cmp-far').getBoundingClientRect().right,
      shorterRectRight: shorter.getBoundingClientRect().right,
      phase: T.st.phase
    };
  });
  is(payoff.phase === 'laid', 'the piece seats on the shorter plank');
  is(Object.is(payoff.compositeRight - payoff.longRight, 0),
    `⭐ 0.00 EXACTLY: the composite ends where the longer plank ends (${payoff.compositeRight}) — one expression evaluated twice`);
  is(payoff.shorterWidth === payoff.shorterExpected,
    `⭐ AND THE SHORTER PLANK DID NOT GROW (${payoff.shorterWidth}) — the misconception this tool exists to kill`);
  /* the same claim in rendered CSS px, where it is a measurement */
  is(Math.abs(payoff.ocRight - payoff.farRight) <= 1.6,
    `and in rendered px the composite meets the far line to ${Math.abs(payoff.ocRight - payoff.farRight).toFixed(4)}px`);

  /* =================================================================
     L4 — the freeze, and the refusals in the browser
     ================================================================= */
  const frozen = await page.evaluate(() => {
    const T = window.ComparisonPlanks;
    const before = T.st.a;
    const refused = T.setLen(T.st, 'a', T.st.a === 16 ? 1 : T.st.a + 1) === null;
    return { refused: refused, unchanged: T.st.a === before };
  });
  is(frozen.refused && frozen.unchanged, '⭐ the planks REFUSE to move while the piece is out — in the model, not a disabled attribute');

  const verdict = await page.evaluate(() =>
    document.querySelectorAll('[class*="correct"],[class*="wrong"],[class*="score"]').length);
  is(verdict === 0, 'no verdict element exists anywhere in the rendered DOM');
  is(errs.length === 0, 'no page errors across the whole drive' + (errs.length ? ' — ' + errs[0] : ''));

  await page.close();
  /* =================================================================
     L5 — ⭐ EVERY AUTHORED STRING IS *REACHED*, not merely authored
     -----------------------------------------------------------------
     #39 shipped `hintMark`, authored in all eleven locales and asked
     for by no branch. The first check for that class was a regex over
     the source — and mutation showed a source scan is defeated by
     making the BRANCH unreachable while the `t('key')` call still sits
     in the file. So this drives the tool through every reachable state
     and collects what the DOM actually received. A string that never
     appears is furniture, and furniture in eleven locales is eleven
     translations of nothing.

     ⚠ The state list is exhaustive by construction, not by hope: the
     model has exactly five reachable presentations — equal, attached,
     lifting, free, laid — and `_st` canonicalises everything else into
     one of them.
     ================================================================= */
  {
    const p5 = await browser.newPage();
    await p5.setViewport({ width: 1024, height: 900 });
    await p5.goto(`http://127.0.0.1:${PORT}/comparison-planks.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await p5.waitForSelector('.cmp-bench', { timeout: 9000 });
    await wait(400);

    const res = await p5.evaluate(() => {
      const inst = window.ComparisonPlanks;
      const seen = new Set();
      const harvest = () => {
        document.querySelectorAll('body, body *').forEach((e) => {
          if (e.childElementCount === 0 && e.textContent.trim()) seen.add(e.textContent.trim());
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) seen.add(a.trim());
        });
      };
      const states = [
        { a: 7, b: 7, phase: 'attached', dx: 0, dy: 0 },
        { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 },
        { a: 5, b: 9, phase: 'lifting', dx: 300, dy: 260 },
        { a: 5, b: 9, phase: 'free', dx: 300, dy: 380 },
        { a: 5, b: 9, phase: 'laid', dx: 0, dy: 0 }
      ];
      for (const st of states) { inst.st = inst._st(st); inst._paint(); harvest(); }
      /* the gate panel is a state of the UI too */
      /* the paywall panel is built but hidden for an entitled user;
         built-and-hidden is still REACHED. */
      if (inst._showGate) { try { inst._showGate(); } catch (_) { } }
      harvest();
      return { seen: Array.from(seen), authored: Object.keys(inst.strings).map((k) => [k, inst.strings[k].en]) };
    });

    const blob = res.seen.join('');
    const missing = res.authored.filter(([, v]) => blob.indexOf(v) < 0).map(([k]) => k);
    is(res.authored.length >= 18, `vacuity guard: ${res.authored.length} authored strings to account for`);
    is(res.seen.length > 5, `vacuity guard: the harvest collected ${res.seen.length} rendered strings`);
    is(missing.length === 0,
      `⭐ EVERY authored string is REACHED by some state — ${res.authored.length} keys`
      + (missing.length ? ` — DEAD: ${missing.join(', ')}` : ''));
    await p5.close();
  }

  /* =================================================================
     L6 — ⭐ THE NUMERALS ACROSS THE WHOLE BAND, not one point of it
     -----------------------------------------------------------------
     ⚠ THIS CAUGHT A SHIPPED DEFECT AND IT SHOULD EMBARRASS L1. The
     containment check in the viewport sweep ran on the OPENING state
     (5 and 9) at every width, and passed everywhere — while at the top
     of the band a plank's end sits at 99% of the bench, so its numeral
     was centred there and "16" was CLIPPED in half. The thumbnail
     generator found it, not the gate.

     A gate that samples ONE POINT of a band is not testing the band.
     Both extremes and both corners, at the narrowest and widest.
     ================================================================= */
  {
    const p6 = await browser.newPage();
    const PAIRS = [[1, 1], [16, 16], [1, 16], [16, 1], [16, 8], [2, 15]];
    for (const W of [320, 1366]) {
      await p6.setViewport({ width: W, height: heightFor(W) });
      await p6.goto(`http://127.0.0.1:${PORT}/comparison-planks.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
      await p6.waitForSelector('.cmp-bench', { timeout: 9000 });
      await wait(350);
      for (const [a, b] of PAIRS) {
        const r = await p6.evaluate(({ a, b }) => {
          const inst = window.ComparisonPlanks;
          inst.st = inst._st({ a: a, b: b, phase: 'attached', dx: 0, dy: 0 });
          inst._paint();
          const bx = document.querySelector('.cmp-bench').getBoundingClientRect();
          const ns = Array.from(document.querySelectorAll('.cmp-num')).map((e) => e.getBoundingClientRect());
          return {
            n: ns.length,
            outL: Math.round(Math.max.apply(null, ns.map((x) => bx.left - x.left))),
            outR: Math.round(Math.max.apply(null, ns.map((x) => x.right - bx.right))),
            texts: Array.from(document.querySelectorAll('.cmp-num')).map((e) => e.textContent).join(',')
          };
        }, { a, b });
        is(r.n === 2, `${W}px ${a}·${b}: two numerals (vacuity guard)`);
        is(r.outL <= 0 && r.outR <= 0,
          `${W}px ${a}·${b}: both numerals inside the bench (over L${r.outL} R${r.outR}) — "${r.texts}"`);
      }
    }
    await p6.close();
  }

  await browser.close();
  srv.close();

  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions in a real browser`);
})();
