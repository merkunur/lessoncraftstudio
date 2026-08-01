/* =====================================================================
   live-verify-cold-line.js — TOOL #43 on PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-cold-line.js

   ⚠ THIS TIPS THE INSTRUMENT ON THE LIVE SITE. "It mounts" is not the
   claim (§23.4). Three rules inherited, each bought by a shipped defect:

     ⭐ RULE 1 — ASSERT NON-VACUITY FIRST. #40's gate keyed on
     `.unh-tape[data-t="a"]`, an attribute the tool never emits, so
     every assertion compared two EMPTY NodeLists and would have passed
     on a tool with no tapes at all.

     ⭐ RULE 2 — SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE.
     `document.body.textContent` on a Next page carries the RSC
     flight-data, which serialises EVERY sibling tool. #40's
     no-named-unit ban read the RULER's own correct slug and condemned
     ten of eleven locales.

     ⭐ RULE 3 — WRITE ASSERTIONS FROM THE ARTEFACT, NOT THE NARRATIVE.

   ⚠⚠ AND ONE CLAIM IS DELIBERATELY DOWNGRADED HERE, BECAUSE THE
   DESIGN CHANGED UNDER IT. The plan said the tip could be asserted at
   0.00px "if it is one node under a transform" — the arrow-strip
   technique — and said that if the design ever RE-RENDERS instead, the
   claim must be restated as a tolerance and downgraded. It re-renders:
   the pose is an exact integer map `(x,y) -> (W-y, x)` on a square
   arena, recomputed, not a CSS rotation. So this gate asserts a
   SUB-PIXEL TOLERANCE on the rendered span and an EXACT equality in the
   model, and says which is which. Claiming 0.00px here would be
   claiming a property of a technique the tool does not use.
   ===================================================================== */

'use strict';
const puppeteer = require('puppeteer');
const CONTENT = require('./_cold-line-content.js');

const HOST = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⭐ the unit ban, poison-tested in BOTH directions before it is
   trusted — a ban that has only ever been shown to fire is half a
   test, and #38's likelihood ban was too WIDE, not too narrow.

   ⚠ THE FINNISH CASE IS WHY THIS THREADS A NEEDLE RATHER THAN CASTING
   A NET. The first draft matched `aste` and `asteen` only, so
   `astetta` — the partitive, and the form a Finn actually says when
   giving a temperature — sailed through. But `asteikko` means SCALE,
   which is the one noun the Finnish panel legitimately needs for this
   tool's central part. So the stem is followed by an EXPLICIT LIST of
   the case endings for the unit, and `asteikko`/`asteikolla` fall
   outside it by construction. Widening to `\baste\w*` would have
   condemned correct native copy — the #40 defect exactly. */
const UNIT = /(°|\bcelsius|\bfahrenheit|\bcentigrad|\bgrad(?:i|os|er|en|us)?\b|\bgrader\b|\baste(?:en|tta|ita|essa)?\b)/i;

(async () => {
  /* ---- 0. the ban proves itself before it judges anything ---------- */
  console.log('[poison — the unit ban, both directions]');
  is(UNIT.test('twenty degrees celsius'), 'MUST FIRE: "celsius"');
  is(UNIT.test('minus 5 °'), 'MUST FIRE: the degree sign');
  is(UNIT.test('zehn Grad'), 'MUST FIRE: German "Grad"');
  is(UNIT.test('kymmenen astetta'), 'MUST FIRE: Finnish partitive "astetta" — the form a Finn actually says');
  is(!UNIT.test('the marks slide along the scale'), 'MUST PASS: ordinary prose about the scale');
  is(!UNIT.test('una escala graduada de números'), 'MUST PASS: Spanish "graduada" is not a unit');
  is(!UNIT.test('gradvis flyttar du skalan'), 'MUST PASS: Swedish "gradvis" (gradually) is not a unit');
  is(!UNIT.test('siirrä asteikkoa ylös'), '⭐ MUST PASS: Finnish "asteikko" means SCALE — the tool\'s own central noun');
  is(!UNIT.test('merkit pysyvät asteikolla'), '⭐ MUST PASS: "asteikolla" (on the scale) is not a temperature');

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the eleven landings answer 200 --------------------------- */
  console.log('\n[landings]');
  for (const loc of LOCALES) {
    const url = `${HOST}/${loc}/tools/${CONTENT[loc].slug}`;
    const page = await browser.newPage();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => null);
    is(!!res && res.status() === 200, `${loc}: ${res ? res.status() : 'no response'} ${url}`);
    if (res && res.status() === 200) {
      /* ⭐ RULE 2 — the tool's OWN prose, never document.body */
      const seen = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const main = document.querySelector('main') || document.body;
        const paras = Array.from(main.querySelectorAll('p, li')).map((p) => p.textContent).join(' ');
        return {
          h1: h1 ? h1.textContent.trim() : '',
          paras: paras,
          iframe: !!document.querySelector('iframe')
        };
      });
      is(seen.h1.length > 0, `${loc}: the landing has an h1 (vacuity guard) — "${seen.h1}"`);
      is(seen.h1.indexOf(CONTENT[loc].name) >= 0, `${loc}: h1 carries the native name "${CONTENT[loc].name}"`);
      is(seen.paras.length > 400, `${loc}: landing prose present (${seen.paras.length} chars)`);
      is(seen.iframe, `${loc}: the tool iframe is on the page`);
      is(!UNIT.test(seen.paras), `${loc}: ⭐ the landing prose names NO unit — refuse #4`);
    }
    await page.close();
  }

  /* ---- 2. ⭐ DRIVE THE INSTRUMENT ON PRODUCTION -------------------- */
  console.log('\n[the apparatus, driven live]');
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = `${HOST}/mini-tools/cold-line.html?lang=en&embed=1`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  is(res.status() === 200, `the tool itself answers ${res.status()}`);
  await page.waitForSelector('.cld-bench', { timeout: 20000 });
  await wait(900);

  /* ⭐ RULE 1 — NON-VACUITY BEFORE ANYTHING ELSE */
  const shape = await page.evaluate(() => ({
    tubes: document.querySelectorAll('.cld-tube').length,
    marks: document.querySelectorAll('.cld-mark').length,
    handles: document.querySelectorAll('.cld-handle').length,
    chips: document.querySelectorAll('.cld-chip').length,
    ticks: document.querySelectorAll('.cld-tick').length,
    nums: document.querySelectorAll('.cld-num').length
  }));
  is(shape.tubes === 1, `NON-VACUITY: one column in the DOM (got ${shape.tubes})`);
  is(shape.marks === 2, `NON-VACUITY: exactly two marks (got ${shape.marks})`);
  is(shape.handles === 3, `NON-VACUITY: three handles — two marks and the scale (got ${shape.handles})`);
  is(shape.chips === 4, `NON-VACUITY: four chips (got ${shape.chips})`);
  is(shape.ticks >= 20, `NON-VACUITY: the window is ticked (${shape.ticks} ticks)`);
  is(shape.nums >= 4, `NON-VACUITY: the scale is numbered (${shape.nums} labels)`);
  if (shape.marks !== 2) console.error('  aborting judgement — nothing below would be measuring anything');

  const read = () => page.evaluate(() => {
    const t = window.ColdLine;
    /* ⚠ RETURN PLAIN NUMBERS. A DOMRect's properties live on its
       PROTOTYPE, so it serialises out of page.evaluate as `{}` — every
       field undefined, every comparison NaN, and the assertion fails on
       a tool that is fine. It read "the bench keeps its footprint
       through the turn (NaNpx)". A gate reporting NaN is reporting that
       it measured nothing, which is not the same as a failure. */
    const r = (s) => {
      const e = document.querySelector(s);
      if (!e) return null;
      const b = e.getBoundingClientRect();
      return { width: b.width, height: b.height, left: b.left, top: b.top };
    };
    const dotOf = (s) => {
      const g = document.querySelector(s + ' .cld-mark-dot');
      if (!g) return null;
      const b = g.getBoundingClientRect();
      return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
    };
    const a = dotOf('.cld-mark-a'), b = dotOf('.cld-mark-b');
    return {
      st: JSON.parse(JSON.stringify(t.st)),
      span: Math.abs(t.st.a - t.st.b),
      pxSpan: (a && b) ? Math.hypot(a.x - b.x, a.y - b.y) : null,
      bench: r('.cld-bench'),
      nums: Array.from(document.querySelectorAll('.cld-num')).map((e) => e.textContent),
      spanText: (document.querySelector('.cld-span') || {}).textContent || '',
      hint: (document.querySelector('.cld-hint') || {}).textContent || ''
    };
  });

  const before = await read();
  is(before.st.a !== before.st.b, `it opens with two marks apart (${before.st.a} and ${before.st.b})`);
  is(before.st.a < 0 && before.st.b > 0,
    `⭐ and they open ON OPPOSITE SIDES OF ZERO (${before.st.a}, ${before.st.b}) — the one thing no printable on this platform can show`);
  is(before.pxSpan > 20, `NON-VACUITY: the two dots are rendered and apart (${Math.round(before.pxSpan)}px)`);

  /* refuse #4, on the apparatus itself — every numeral is a bare
     integer, no unit rides along */
  is(before.nums.every((n) => /^(−)?\d+$/.test(n)),
    `⭐ every scale label is a BARE numeral — "${before.nums.slice(0, 4).join('", "')}"`);
  is(before.nums.some((n) => n.charCodeAt(0) === 0x2212),
    'refuse #6: the negatives carry U+2212, never a hyphen');
  is(!before.nums.some((n) => n.indexOf('-') >= 0),
    '…and no ASCII hyphen appears on the scale at all');

  /* ---- 3. ⭐⭐ THE TIP, MEASURED BOTH WAYS ------------------------- */
  console.log('\n[the tip]');
  const chips = await page.$$('.cld-chip');
  is(chips.length === 4, `four chips to drive (got ${chips.length})`);
  const cb = await chips[0].boundingBox();
  is(cb && cb.width >= 44 && cb.height >= 44,
    `CONTROL floor live: the tip chip is ${Math.round(cb.width)}x${Math.round(cb.height)}px`);
  await chips[0].click();
  await wait(500);
  const tipped = await read();

  is(tipped.st.tipped === true, `⭐ one tap tipped the whole instrument on production`);
  is(tipped.st.a === before.st.a && tipped.st.b === before.st.b && tipped.st.lo === before.st.lo,
    `⭐⭐ EXACT in the model: nothing about the reading changed — lo ${tipped.st.lo}, marks ${tipped.st.a} and ${tipped.st.b}`);
  is(tipped.span === before.span, `⭐⭐ EXACT in the model: the span is still ${tipped.span}`);

  /* ⚠ THE DOWNGRADED CLAIM, STATED AS SUCH. The pose is a recomputed
     integer map, not one node under a CSS transform, so the honest
     assertion on rendered pixels is a tolerance — and the tolerance is
     tight because the map is exact and the arena is square. */
  const drift = Math.abs(tipped.pxSpan - before.pxSpan);
  is(drift < 1.5,
    `⭐ and in RENDERED PIXELS the span survives the turn to ${drift.toFixed(3)}px ` +
    `(${before.pxSpan.toFixed(1)} upright vs ${tipped.pxSpan.toFixed(1)} flat) — a TOLERANCE, not a 0.00 claim: ` +
    `the pose is recomputed, not a CSS rotation`);

  const benchDrift = Math.abs(tipped.bench.width - before.bench.width) + Math.abs(tipped.bench.height - before.bench.height);
  is(benchDrift < 2, `the bench keeps its footprint through the turn (${benchDrift.toFixed(2)}px)`);

  /* the minus survives the turn — the shipped defect, on production */
  const clr = await page.evaluate(() => {
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
        const gap = Math.max(nb.left - tb.right, tb.left - nb.right, nb.top - tb.bottom, tb.top - nb.bottom);
        if (gap < worst) worst = gap;
      }
    }
    return { vacuous: false, negs: negs.length, worst: Math.round(worst * 10) / 10 };
  });
  is(!clr.vacuous, 'NON-VACUITY: there are negative labels and ticks to compare, tipped');
  is(clr.worst >= 3,
    `⭐ tipped on production, the minus still clears every tick by ${clr.worst}px — it reads as a SIGN, not part of the tick`);

  /* back upright — the turn is reversible and lossless */
  await (await page.$$('.cld-chip'))[0].click();
  await wait(450);
  const back = await read();
  is(back.st.tipped === false, 'a second tap stands it back up');
  is(back.st.a === before.st.a && back.st.b === before.st.b && back.st.lo === before.st.lo,
    'and the round trip is LOSSLESS in the model');

  /* ---- 4. a real drag of the SCALE on production ------------------- */
  console.log('\n[sliding the scale]');
  const grip = await page.$('.cld-h-s');
  is(!!grip, 'the scale has a grip to take hold of');
  const g = await grip.boundingBox();
  is(g && g.width >= 44 && g.height >= 44, `CONTROL floor live: ${Math.round(g.width)}x${Math.round(g.height)}px`);
  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) {
    await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2 + i * 9);
    await wait(18);
  }
  await page.mouse.up();
  await wait(400);

  const slid = await read();
  is(slid.st.lo !== back.st.lo, `⭐ a real drag moved the window on production (lo ${back.st.lo} → ${slid.st.lo})`);
  is(slid.st.a === back.st.a && slid.st.b === back.st.b,
    `⭐⭐ and NEITHER MARK MOVED — the readings are still ${slid.st.a} and ${slid.st.b}. ` +
    `The scale slid under them; that is the whole thesis`);
  is(Math.abs(slid.st.a - slid.st.b) === before.span,
    `and the span is untouched at ${before.span}`);

  /* ---- 5. the standing refusals ------------------------------------ */
  console.log('\n[the refusals]');
  const refuse = await page.evaluate(() => ({
    verdict: document.querySelectorAll('.correct, .wrong, .score, .streak, .timer').length,
    inputs: document.querySelectorAll('input[type=text], input[type=number], .lcs-activity-keypad').length,
    arrows: document.querySelectorAll('marker, [marker-end], .jump, .hop').length,
    svgText: Array.from(document.querySelectorAll('.cld-svg text')).map((e) => e.textContent).join(' ')
  }));
  is(refuse.verdict === 0, 'no verdict, score, streak or timer element exists anywhere');
  is(refuse.inputs === 0, '⭐ refuse #1: no input and no keypad — the tool never asks what the reading is');
  is(refuse.arrows === 0, '⭐ refuse #2: no marker, arrowhead, jump or hop — position and distance only');
  is(!UNIT.test(refuse.svgText), `⭐ refuse #4: no unit anywhere in the apparatus's own text`);

  await page.close();
  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} live assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions against PRODUCTION`);
})();
