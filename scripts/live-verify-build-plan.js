/* =====================================================================
   live-verify-build-plan.js — TOOL #44 on PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-build-plan.js

   ⚠ THIS DRIVES THE APPARATUS ON THE LIVE SITE. "It mounts" is not the
   claim (§23.4). Four rules inherited, each bought by a shipped defect:

     ⭐ RULE 1 — ASSERT NON-VACUITY FIRST. #40's gate keyed on an
     attribute the tool never emits, so every assertion compared two
     EMPTY NodeLists and would have passed on a tool with no tapes.

     ⭐ RULE 2 — SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE.
     `document.body.textContent` on a Next page carries the RSC
     flight-data, which serialises EVERY sibling tool. #40's
     no-named-unit ban read the RULER's own correct slug and condemned
     ten of eleven locales.

     ⭐ RULE 3 — WRITE ASSERTIONS FROM THE ARTEFACT, NOT THE NARRATIVE.

     ⭐ RULE 4 — REACH CONTROLS BY INDEX, NEVER BY ENGLISH TEXT. This
     tool proved it: "Another BLUEPRINT" contains the word "print", so
     /print/i matched the wrong chip and reported a defect in a tool
     that was fine. On production the labels are not even English.

   ⚠ AND RETURN PLAIN NUMBERS FROM page.evaluate. A DOMRect's properties
   live on its PROTOTYPE, so it serialises out as `{}` — every field
   undefined, every comparison NaN. #43's production gate reported
   "NaNpx" and a gate reporting NaN is reporting that it measured
   nothing, which is not the same as a failure.
   ===================================================================== */

'use strict';
const puppeteer = require('puppeteer');
const CONTENT = require('./_build-plan-content.js');

const HOST = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CHIP = { turn: 0, same: 1, next: 2, print: 3 };

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⚠ UNICODE LOOKAROUNDS, NEVER `\b` — it is ASCII-only and cannot see a
   boundary beside an accented letter, which killed three bans on this
   tool's own apply script and a weather ban on #43. */
const w = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');
const TOTAL_BAN = w('volumen?|volume|altogether|totalt|totale|tutto|insgesamt|sammanlagt|yhteensä|yhteensa');
const SOLID_BAN = w('sphere|cylinder|cylindre|cilindro|cilinder|sylinteri|zylinder|cone|cono|kegel|kegle|kartio|pyramide|pyramidi|piramide|prisma|kugel|klot|pallo|kule');

(async () => {
  console.log('[poison — the bans, both directions]');
  is(TOTAL_BAN.test('how many cubes altogether'), 'MUST FIRE: "altogether"');
  is(TOTAL_BAN.test('wie viele Würfel insgesamt'), 'MUST FIRE: German "insgesamt"');
  is(TOTAL_BAN.test('kuinka monta yhteensä'), '⭐ MUST FIRE: Finnish "yhteensä" — the accented form `\\b` cannot see');
  is(!TOTAL_BAN.test('that is how many cubes tall it is'),
    '⭐ MUST PASS: "how many cubes TALL" is a HEIGHT — this tool\'s own subject');
  is(!TOTAL_BAN.test('skriv ett tal i varje ruta'), 'MUST PASS: ordinary blueprint prose');
  is(SOLID_BAN.test('a cone and a cylinder'), 'MUST FIRE: named solids');
  is(!SOLID_BAN.test('turn it a quarter turn and watch the front'), 'MUST PASS: the turn copy');

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
      /* ⚠⚠ NO WORD-BAN ON LANDING PROSE, AND THIS IS A RULING NOT A
         RETREAT. The first version ran the apparatus bans over the
         landing copy and failed FOUR locales — every one of them on a
         sentence whose whole job is to STATE THE REFUSAL:
           es  "porque eso ya es volumen y toca mucho más adelante"
           it  "non chiede mai quanti cubetti ci siano in tutto"
           sv  "frågar aldrig hur många det är sammanlagt"
           fr  "dessinée en volume" (= drawn in three dimensions)
         A landing page MUST be able to say what the tool refuses to do
         — that is the fence being communicated to a teacher — and a
         regex cannot tell "never asks for a total" from "asks for a
         total". This is #38's Zufallsbeutel defect in its purest form:
         a fence that rejects correct native prose teaches a panel to
         reword AROUND it instead of reporting it.
         THE BANS BELONG ON THE APPARATUS, where the tool speaks, and
         they are enforced there — verify- checks every authored string
         and this gate checks the rendered SVG text. What holds the line
         on the landing is BEHAVIOURAL and is asserted at the bottom of
         this file: no input, no keypad, no answer taken. */
      is(seen.paras.length > 400, `${loc}: landing prose is substantial (${seen.paras.length} chars) — bans are enforced on the APPARATUS, not on prose that may legitimately describe the refusal`);
    }
    await page.close();
  }

  /* ---- 2. ⭐ DRIVE THE APPARATUS ON PRODUCTION --------------------- */
  console.log('\n[the apparatus, driven live]');
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = `${HOST}/mini-tools/build-plan.html?lang=en&embed=1`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  is(res.status() === 200, `the tool itself answers ${res.status()}`);
  await page.waitForSelector('.bpl-bench', { timeout: 20000 });
  await wait(900);

  /* ⭐ RULE 1 — NON-VACUITY BEFORE ANYTHING ELSE */
  const shape = await page.evaluate(() => ({
    cells: document.querySelectorAll('.bpl-cell').length,
    nums: document.querySelectorAll('.bpl-num').length,
    hits: document.querySelectorAll('.bpl-hit').length,
    chips: document.querySelectorAll('.bpl-chip').length,
    cubes: document.querySelectorAll('.bpl-f-top[data-cube]').length,
    profiles: document.querySelectorAll('.bpl-vc').length
  }));
  is(shape.cells === 9, `NON-VACUITY: nine blueprint squares (got ${shape.cells})`);
  is(shape.nums === 9, `NON-VACUITY: nine numerals (got ${shape.nums})`);
  is(shape.hits === 18, `NON-VACUITY: eighteen hit-targets, nine per end (got ${shape.hits})`);
  is(shape.chips === 4, `NON-VACUITY: four chips (got ${shape.chips})`);
  is(shape.cubes > 0, `NON-VACUITY: the building is drawn (${shape.cubes} cubes)`);
  is(shape.profiles > 0, `NON-VACUITY: the two profiles are drawn (${shape.profiles} bars)`);

  const read = () => page.evaluate(() => {
    const t = window.BuildPlan;
    const prof = (v) => {
      const o = [0, 0, 0];
      for (const e of document.querySelectorAll(`.bpl-vc[data-view="${v}"]`)) o[Number(e.getAttribute('data-col'))]++;
      return o.join(',');
    };
    const col = new Array(9).fill(0);
    for (const c of document.querySelectorAll('.bpl-f-top[data-cube]')) col[Number(c.getAttribute('data-col'))]++;
    const b = document.querySelector('.bpl-bench').getBoundingClientRect();
    return {
      h: t.st.h.slice(),
      numerals: Array.from(document.querySelectorAll('.bpl-num')).map((n) => n.textContent).join(''),
      col: col.join(','), front: prof('front'), side: prof('side'),
      /* ⚠ plain numbers — a DOMRect serialises as {} */
      bench: { w: b.width, h: b.height },
      sameDisabled: document.querySelectorAll('.bpl-chip')[1].disabled
    };
  });

  const before = await read();
  is(Math.abs(before.bench.w - before.bench.h) <= 1,
    `⭐⭐ the arena is SQUARE on production — ${Math.round(before.bench.w)}x${Math.round(before.bench.h)}`);
  is(before.numerals === before.h.join(''),
    `⭐ the nine numerals ARE the nine heights — "${before.numerals}"`);
  is(before.col === before.h.join(','),
    `⭐⭐ and the drawn cubes match them column by column — the blueprint and the building are ONE STATE (${before.col})`);
  is(/^[0-4]{9}$/.test(before.numerals), 'every numeral is a bare digit 0-4 — no words on the apparatus');

  /* ---- 3. the turn, on production ---------------------------------- */
  console.log('\n[the turn]');
  const chips = await page.$$('.bpl-chip');
  const cb = await chips[CHIP.turn].boundingBox();
  is(cb && cb.height >= 44, `CONTROL floor live: the turn chip is ${Math.round(cb.width)}x${Math.round(cb.height)}px`);
  await chips[CHIP.turn].click();
  await wait(500);
  const turned = await read();
  is(turned.h.join() !== before.h.join(), `⭐ one tap turned the building (${before.h.join('')} -> ${turned.h.join('')})`);
  is(turned.col === turned.h.join(','), '…and the drawn cubes still match the numerals exactly');
  is(turned.front === before.side.split(',').reverse().join(','),
    `⭐⭐ the FRONT profile is now the old SIDE, reversed — front and side are one kind of thing (${before.side} -> ${turned.front})`);
  {
    const n0 = before.h.reduce((a, b) => a + b, 0), n1 = turned.h.reduce((a, b) => a + b, 0);
    is(n0 === n1, `…and not one cube was added or lost (${n0})`);
  }

  /* ---- 4. the payoff, on production -------------------------------- */
  console.log('\n[the payoff]');
  is(turned.sameDisabled === false, 'the payoff chip is live on an ambiguous building');
  const pf = turned.front, ps = turned.side, ph = turned.h.join();
  await (await page.$$('.bpl-chip'))[CHIP.same].click();
  await wait(450);
  const swapped = await read();
  is(swapped.h.join() !== ph, `⭐ a DIFFERENT building (${ph} -> ${swapped.h.join('')})`);
  is(swapped.front === pf && swapped.side === ps,
    `⭐⭐ …and BOTH profiles are untouched — front ${pf}, side ${ps}. That is the whole lesson, live.`);
  is(swapped.col === swapped.h.join(','), '…and the new building is drawn correctly too');

  /* the chip must go DEAD where the two directions determine it */
  await page.evaluate(() => {
    const t = window.BuildPlan;
    t.st = t._st({ h: [4, 4, 4, 0, 0, 0, 0, 0, 0] }); t._paint();
  });
  await wait(300);
  const det = await read();
  is(det.sameDisabled === true,
    '⭐ the payoff chip is DISABLED on a building its two directions pin down — never a silent no-op');

  /* ---- 5. a real drag ---------------------------------------------- */
  console.log('\n[driven with a real pointer]');
  await page.evaluate(() => {
    const t = window.BuildPlan;
    t.st = t._st({ h: [2, 2, 2, 2, 2, 2, 2, 2, 2] }); t._paint();
  });
  await wait(250);
  const grip = (await page.$$('.bpl-h-plan'))[4];
  const g = await grip.boundingBox();
  is(g && Math.min(g.width, g.height) >= 34, `CANVAS floor live: ${Math.round(g.width)}x${Math.round(g.height)}px`);
  const b0 = await read();
  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) { await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2 - i * 9); await wait(16); }
  await page.mouse.up();
  await wait(400);
  const b1 = await read();
  is(b1.h[4] > b0.h[4], `⭐ a real drag raised that column on production (${b0.h[4]} -> ${b1.h[4]})`);
  {
    let others = 0;
    for (let i = 0; i < 9; i++) if (i !== 4 && b1.h[i] !== b0.h[i]) others++;
    is(others === 0, `…and no other column moved (${others} did)`);
  }
  is(b1.col === b1.h.join(','), '…and the building followed the blueprint immediately');

  /* ---- 6. the standing refusals ------------------------------------ */
  console.log('\n[the refusals]');
  const refuse = await page.evaluate(() => ({
    verdict: document.querySelectorAll('.correct, .wrong, .score, .streak, .timer').length,
    inputs: document.querySelectorAll('input, textarea, .lcs-activity-keypad').length,
    svgText: Array.from(document.querySelectorAll('.bpl-svg text')).map((e) => e.textContent).join('')
  }));
  is(refuse.verdict === 0, 'no verdict, score, streak or timer element exists anywhere');
  is(refuse.inputs === 0, '⭐ refuse #2: no input and no keypad — the tool never asks for a total');
  is(/^[0-4]{9}$/.test(refuse.svgText),
    `⭐ the ONLY text on the apparatus is nine numerals — "${refuse.svgText}" (§23.2)`);

  await page.close();
  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} live assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions against PRODUCTION`);
})();
