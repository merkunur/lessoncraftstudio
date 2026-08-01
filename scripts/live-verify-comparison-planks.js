/* =====================================================================
   live-verify-comparison-planks.js — TOOL #42 on PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-comparison-planks.js

   ⚠ THIS DRIVES THE BRACKET ON THE LIVE SITE. "It mounts" is not the
   claim. #40's production gate keyed on `.unh-tape[data-t="a"]`, an
   attribute the tool never emits, so every tape assertion compared two
   EMPTY NodeLists — it would have passed on a tool with no tapes at
   all. Hence:

     ⭐ RULE 1 — ASSERT NON-VACUITY FIRST. Prove the collection is
     non-empty and its size is in range, THEN assert anything about its
     contents. A querySelectorAll comparison is not evidence until you
     have shown it selected something.

     ⭐ RULE 2 — SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE.
     `document.body.textContent` on a Next page includes the RSC
     flight-data, which serialises EVERY sibling tool. #40's
     no-named-unit ban read the RULER's correct slug and condemned ten
     of eleven locales. The ruler legitimately owns centimetres.

     ⭐ RULE 3 — WRITE ASSERTIONS FROM THE ARTEFACT. #40's gate demanded
     both tapes open on the same unit because the howToUse copy said so;
     the tool deliberately opens 160/100. The narrative described a
     button, not the opening state.
   ===================================================================== */

'use strict';
const puppeteer = require('puppeteer');
const CONTENT = require('./_comparison-planks-content.js');

const HOST = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the eleven landings answer 200 ---------------------------- */
  console.log('\n[landings]');
  for (const loc of LOCALES) {
    const url = `${HOST}/${loc}/tools/${CONTENT[loc].slug}`;
    const page = await browser.newPage();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => null);
    is(!!res && res.status() === 200, `${loc}: ${res ? res.status() : 'no response'} ${url}`);
    if (res && res.status() === 200) {
      /* ⭐ RULE 2 — the tool's OWN prose, never document.body. The h1
         and the landing copy container; not the flight-data, which
         carries every sibling tool's strings. */
      const seen = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const main = document.querySelector('main') || document.body;
        const paras = Array.from(main.querySelectorAll('p')).map((p) => p.textContent).join(' ');
        return { h1: h1 ? h1.textContent.trim() : '', paras: paras, iframe: !!document.querySelector('iframe') };
      });
      is(seen.h1.length > 0, `${loc}: the landing has an h1 (vacuity guard) — "${seen.h1}"`);
      is(seen.h1.indexOf(CONTENT[loc].name) >= 0, `${loc}: h1 carries the native name "${CONTENT[loc].name}"`);
      is(seen.paras.length > 400, `${loc}: landing prose present (${seen.paras.length} chars)`);
      is(seen.iframe, `${loc}: the tool iframe is on the page`);
      /* the fence, in the tool's own prose only */
      is(!/\b(cm|mm|centimet|zentimet|centímetr|sentti|\binch)/i.test(seen.paras),
        `${loc}: the landing prose names no unit`);
    }
    await page.close();
  }

  /* ---- 2. ⭐ DRIVE THE BRACKET ON PRODUCTION ------------------------ */
  console.log('\n[the apparatus, driven live]');
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = `${HOST}/mini-tools/comparison-planks.html?lang=en&embed=1`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  is(res.status() === 200, `the tool itself answers ${res.status()}`);
  await page.waitForSelector('.cmp-bench', { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 900));

  /* ⭐ RULE 1 — NON-VACUITY BEFORE ANYTHING ELSE */
  const shape = await page.evaluate(() => ({
    planks: document.querySelectorAll('.cmp-a, .cmp-b').length,
    nums: document.querySelectorAll('.cmp-num').length,
    handles: document.querySelectorAll('.cmp-handle').length,
    chips: document.querySelectorAll('.cmp-chip').length
  }));
  is(shape.planks === 2, `NON-VACUITY: exactly two planks in the DOM (got ${shape.planks})`);
  is(shape.nums === 2, `NON-VACUITY: exactly two numerals (got ${shape.nums})`);
  is(shape.handles === 3, `NON-VACUITY: three handles (got ${shape.handles})`);
  is(shape.chips === 3, `NON-VACUITY: three chips (got ${shape.chips})`);
  if (shape.planks !== 2) { console.error('  aborting — nothing below would be measuring anything'); }

  const read = () => page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const at = (s, a) => { const e = q(s); return e ? Number(e.getAttribute(a)) : null; };
    const inst = window.ComparisonPlanks;
    return {
      phase: inst.st.phase, a: inst.st.a, b: inst.st.b,
      aW: at('.cmp-a', 'width'), bW: at('.cmp-b', 'width'),
      ocW: at('.cmp-offcut', 'width'),
      hollow: !!q('.cmp-hollow') && getComputedStyle(q('.cmp-hollow')).display !== 'none',
      nums: Array.from(document.querySelectorAll('.cmp-num')).map((e) => e.textContent),
      hoAria: q('.cmp-h-o') ? q('.cmp-h-o').getAttribute('aria-label') : null,
      composedRight: inst.composedRight(inst.st), longRight: inst.longRight(inst.st)
    };
  });

  const before = await read();
  is(before.a !== before.b, `it opens with a difference (${before.a} and ${before.b})`);
  is(before.ocW === Math.abs(before.a - before.b) * 60,
    `the piece is exactly the difference (${before.ocW} model units)`);
  is(before.nums.length === 2 && before.nums.indexOf(String(Math.abs(before.a - before.b))) < 0
    || before.nums.join(',') === `${before.a},${before.b}`,
    `⭐ the third number is NOWHERE on the stage — the numerals are "${before.nums.join(', ')}"`);
  is(/bracket/i.test(before.hoAria || ''), `attached: the grip announces the BRACKET — "${before.hoAria}"`);

  /* the real 2-axis drag, on production */
  const grip = await page.$('.cmp-h-o');
  is(!!grip, 'the bracket has a grip to take hold of');
  const g = await grip.boundingBox();
  is(g && g.width >= 44 && g.height >= 44, `CONTROL floor live: ${Math.round(g.width)}x${Math.round(g.height)}px`);
  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 14; i++) {
    await page.mouse.move(g.x + g.width / 2 - i * 6, g.y + g.height / 2 + i * 13);
    await new Promise((r) => setTimeout(r, 18));
  }
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 400));

  const carried = await read();
  is(carried.phase === 'free' || carried.phase === 'laid',
    `⭐ a real drag took the piece off on production (phase → ${carried.phase})`);
  is(carried.ocW === before.ocW, `⭐ and the piece KEPT ITS LENGTH (${before.ocW} → ${carried.ocW})`);
  is(carried.aW === before.aW && carried.bW === before.bW,
    `⭐ and NEITHER PLANK MOVED (${carried.aW}, ${carried.bW})`);
  is(carried.hollow, 'and it left a hollow where it came from');
  is(!/bracket/i.test(carried.hoAria || ''), `free: the grip now announces THE PIECE — "${carried.hoAria}"`);
  is(carried.nums.length === 2, 'still exactly two numerals — the difference is never printed');

  /* seat it and check the payoff in the model AND in rendered pixels */
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.cmp-chip'))[0];
    if (b && !b.disabled) b.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  const seated = await read();
  is(seated.phase === 'laid', `the piece seats (phase → ${seated.phase})`);
  is(Object.is(seated.composedRight, seated.longRight),
    `⭐⭐ 0.00 EXACTLY on production: the composite ends where the long plank ends (${seated.longRight}) — one expression evaluated twice`);

  const px = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const far = q('.cmp-far'), oc = q('.cmp-offcut');
    if (!far || !oc) return null;
    return { far: far.getBoundingClientRect().left, oc: oc.getBoundingClientRect().right };
  });
  is(px !== null, 'both the far line and the piece are rendered (vacuity guard)');
  if (px) is(Math.abs(px.far - px.oc) < 1.5,
    `and in rendered px the piece meets the far line to ${Math.abs(px.far - px.oc).toFixed(4)}px`);

  /* no verdict, ever */
  const verdict = await page.evaluate(() =>
    document.querySelectorAll('.correct, .wrong, .score, .streak, .timer').length);
  is(verdict === 0, 'no verdict, score, streak or timer element exists anywhere');

  await page.close();
  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} live assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions against PRODUCTION`);
})();
