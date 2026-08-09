/* =====================================================================
   live-verify-baking-tray.js — TOOL #46 on PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-baking-tray.js

   ⚠ THIS DRIVES THE APPARATUS ON THE LIVE SITE. "It mounts" is not the
   claim (§23.4). The inherited rules, each bought by a shipped defect:

     ⭐ RULE 1 — ASSERT NON-VACUITY FIRST.
     ⭐ RULE 2 — SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE. A Next
     page's `document.body.textContent` carries the RSC flight-data,
     which serialises EVERY sibling tool.
     ⭐ RULE 3 — WRITE ASSERTIONS FROM THE ARTEFACT, NOT THE NARRATIVE.
     ⭐ RULE 4 — REACH CONTROLS BY INDEX, NEVER BY ENGLISH TEXT.
     ⚠ RETURN PLAIN NUMBERS from page.evaluate — a DOMRect's properties
     live on its PROTOTYPE and it serialises out as `{}`.

   ⭐⭐ AND EVERY STRUCTURAL ASSERTION HERE IS ONE THAT CAN ONLY BE TRUE
   OF THE NEW BUILD, so this file doubles as a DEPLOYED-BYTES CHECK.
   #45's production gate returned PASS on 108 assertions against a STALE
   deploy, because every one of them tested the MODEL — and the model was
   identical in the broken build. The four below are the fixes the native
   panels found, and each is invisible in the previous bytes:
     · conservation survives the 11-and-12 ceiling
     · the steppers carry CHEVRONS, not a `+`
     · the turn starts at MINUS ninety, not zero
     · the printed sheet reaches the FIFTH line
   ===================================================================== */

'use strict';
const puppeteer = require('puppeteer');
const CONTENT = require('./_baking-tray-content.js');

const HOST = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⚠ UNICODE LOOKAROUNDS, NEVER `\b` — ASCII-only, blind beside an
   accented letter. And a LETTER boundary is not a boundary for a
   NUMERAL: "42" inside "421" needs \p{N} in the guard too. */
const numeral = (b) => new RegExp('(?<![\\p{L}\\p{N}])(?:' + b + ')(?![\\p{L}\\p{N}])', 'iu');
const TOTAL = numeral('42');
/* the operator, as a glyph — the apparatus may never print one */
const OPS = /[×✕✖·]|(?<!\p{L})x(?!\p{L})|\s\+\s|\s=\s/iu;

(async () => {
  console.log('[poison — both directions]');
  is(TOTAL.test('that makes 42 buns'), 'MUST FIRE: the total');
  is(!TOTAL.test('there are 421 of them'), '⚠ MUST PASS: 42 inside a longer numeral');
  is(OPS.test('7 x 6') && OPS.test('5 + 2'), 'MUST FIRE: an operator glyph');
  is(!OPS.test('Break after row 5: 5 rows above, 2 rows below.'), '⚠ MUST PASS: a correct label');

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the eleven landings answer 200 --------------------------- */
  console.log('\n[landings]');
  for (const loc of LOCALES) {
    const url = `${HOST}/${loc}/tools/${CONTENT[loc].slug}`;
    const page = await browser.newPage();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => null);
    is(!!res && res.status() === 200, `${loc}: ${res ? res.status() : 'no response'} /${loc}/tools/${CONTENT[loc].slug}`);
    if (res && res.status() === 200) {
      /* ⭐ RULE 2 — the tool's OWN prose, never document.body */
      const seen = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const main = document.querySelector('main') || document.body;
        const paras = Array.from(main.querySelectorAll('p, li')).map((p) => p.textContent).join(' ');
        return { h1: h1 ? h1.textContent.trim() : '', chars: paras.length, iframe: !!document.querySelector('iframe') };
      });
      is(seen.h1.length > 0, `${loc}: the landing has an h1 (vacuity guard) — "${seen.h1}"`);
      is(seen.h1.indexOf(CONTENT[loc].name) >= 0, `${loc}: h1 carries the native name "${CONTENT[loc].name}"`);
      is(seen.chars > 400, `${loc}: landing prose present (${seen.chars} chars)`);
      is(seen.iframe, `${loc}: the tool iframe is on the page`);
      /* ⚠ NO BAN ON LANDING PROSE. A landing page MUST be able to state
         what the apparatus refuses to do, and every locale's copy quotes
         `7 × 6 = 5 × 6 + 2 × 6` deliberately. The bans belong on the
         APPARATUS, where they are enforced below. */
    }
    await page.close();
  }

  /* ---- 2. ⭐ DRIVE THE APPARATUS ON PRODUCTION --------------------- */
  console.log('\n[the apparatus, driven live]');
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const res = await page.goto(`${HOST}/mini-tools/baking-tray.html?lang=en&embed=1`,
    { waitUntil: 'domcontentloaded', timeout: 45000 });
  is(res.status() === 200, `the tool itself answers ${res.status()}`);
  await page.waitForSelector('.btr-wrap', { timeout: 20000 });
  await wait(700);

  /* ⭐ RULE 1 — NON-VACUITY BEFORE ANYTHING ELSE */
  const shape = await page.evaluate(() => ({
    hasModel: !!window.BakingTray && !!window.BakingTray.st,
    buns: document.querySelectorAll('circle.btr-bun').length,
    slabs: document.querySelectorAll('.btr-slab').length,
    nums: Array.from(document.querySelectorAll('.btr-num')).map((n) => n.textContent),
    pads: document.querySelectorAll('.btr-pad').length,
    hot: document.querySelectorAll('.btr-hot').length,
    svgText: Array.from(document.querySelectorAll('.btr-svg text')).map((n) => n.textContent).join(' ')
  }));
  is(shape.hasModel, 'NON-VACUITY: the model is on the page and has a state');
  is(shape.buns === 42, `NON-VACUITY: forty-two buns are drawn (${shape.buns})`);
  is(shape.slabs === 1, 'NON-VACUITY: the tray is ONE fused piece');
  is(shape.hot === 1, 'NON-VACUITY: the tray itself is the press target');
  is(shape.pads >= 10, `NON-VACUITY: a keyboard button per seam (${shape.pads})`);
  is(shape.nums.join(',') === '7,6', `two edge numerals, and only two: ${shape.nums.join(' and ')}`);
  is(!TOTAL.test(shape.svgText) && !OPS.test(shape.svgText),
    `⭐ NO OPERATOR AND NO TOTAL ON THE APPARATUS — the stage carries numerals only ("${shape.svgText.replace(/\s+/g, ' ').slice(0, 40)}…")`);
  is(/[0-9]/.test(shape.svgText), 'vacuity guard on that ban: the stage does carry numerals');

  /* ⭐⭐ DEPLOYED-BYTES CHECK 1 — the chevrons. The previous build
     rendered a literal `+` here, permanently, in all eleven locales. */
  const stepper = await page.evaluate(() => {
    const b = document.querySelectorAll('.btr-sbtn');
    return { n: b.length, text: Array.from(b).map((x) => x.textContent.trim()).join(''), svgs: document.querySelectorAll('.btr-sbtn svg').length };
  });
  is(stepper.n === 4 && stepper.svgs === 4,
    `NON-VACUITY: four steppers, each drawing an icon (${stepper.svgs}/${stepper.n})`);
  is(stepper.text === '',
    `⭐⭐ THE STEPPERS CARRY NO TEXT AT ALL — the previous build printed a literal "+" between the two numerals of the array, in the tool whose one rule is that no operator appears on the apparatus (got "${stepper.text}")`);

  /* ---- 3. THE BREAK, by real pointer ------------------------------- */
  console.log('\n[the break — the whole thesis, live]');
  const pt = await page.evaluate(() => {
    const T = window.BakingTray, st = T.st, P = T.pitch(st), G = T.gutter(st), B = T.trayBox(st);
    const tW = st.cols * P, tH = st.rows * P;
    const OX = G + (B - tW) / 2, OY = G + (B - tH) / 2;
    const r = document.querySelector('.btr-svg').getBoundingClientRect();
    return {
      x: r.left + (OX + (Math.floor(st.cols / 2) + 0.5) * P) / 1000 * r.width,
      y: r.top + (OY + 5 * P) / 1000 * r.height
    };
  });
  await page.mouse.move(pt.x, pt.y);
  await page.mouse.down(); await wait(80); await page.mouse.up();
  await wait(700);

  const cut = await page.evaluate(() => {
    const T = window.BakingTray, st = T.st;
    return {
      cuts: st.cuts.slice(), spans: T.spans(st), area: T.area(st), count: T.count(st),
      buns: document.querySelectorAll('circle.btr-bun').length,
      slabs: document.querySelectorAll('.btr-slab').length,
      nums: Array.from(document.querySelectorAll('.btr-num')).map((n) => n.textContent).sort()
    };
  });
  is(cut.cuts.join(',') === '5', `⭐ one real pointer press broke it at the fifth line (${cut.cuts.join(',')})`);
  is(cut.slabs === 2, 'the tray is now two pieces');
  is(cut.buns === 42, `⭐⭐ AND THERE ARE STILL FORTY-TWO BUNS (${cut.buns}) — the count did not change`);
  is(cut.area === cut.count, `⭐ CONSERVATION through a real press: ${cut.area} === ${cut.count}`);
  is(cut.nums.join(',') === '2,5,6,6',
    `⭐⭐ THE INVENTION, ON SCREEN: the 7 split into ${cut.spans.join(' and ')} and the 6 duplicated — four numerals now read ${cut.nums.join(' ')}`);

  /* ---- 4. ⭐⭐ DEPLOYED-BYTES CHECK 2 — the turn runs forwards ------ */
  console.log('\n[the turn — and which way round it runs]');
  await page.evaluate(() => { const T = window.BakingTray; T.st = T.newState(7, 6); T._paint(); });
  await wait(250);
  const angles = await page.evaluate(() => new Promise((res) => {
    const seen = [];
    const grab = () => {
      const g = document.querySelector('.btr-tray');
      const m = g && /rotate\(([-\d.]+)/.exec(g.getAttribute('transform') || '');
      seen.push(m ? Number(m[1]) : 0);
    };
    document.querySelector('.btr-turn').click();
    const id = setInterval(grab, 40);
    setTimeout(() => { clearInterval(id); res(seen); }, 520);
  }));
  await wait(400);
  const turned = await page.evaluate(() => {
    const T = window.BakingTray;
    return { rows: T.st.rows, cols: T.st.cols, buns: document.querySelectorAll('circle.btr-bun').length, pitch: T.pitch(T.st) };
  });
  is(angles.length >= 4, `vacuity guard: the turn was sampled ${angles.length} times mid-flight`);
  is(angles[0] < -45,
    `⭐⭐ THE TURN STARTS AT ${angles[0].toFixed(0)}° — the previous build ran it BACKWARDS, snapping into the post-turn layout and spinning away from it`);
  is(angles[angles.length - 1] > angles[0] && angles.every((a) => a <= 0.5),
    'and travels forward to zero, never overshooting');
  is(turned.rows === 6 && turned.cols === 7, `the tray turned (7x6 → ${turned.rows}x${turned.cols})`);
  is(turned.buns === 42, `…and not one bun was added or lost (${turned.buns})`);

  /* ---- 5. ⭐⭐ DEPLOYED-BYTES CHECK 3 — the ceiling and the sheet --- */
  console.log('\n[the two defects the panels found in the model]');
  const ceiling = await page.evaluate(() => {
    const T = window.BakingTray;
    const big = T.newState(12, 7, T.MAX12);
    return {
      built: T.count(big),
      turned: T.count(T.rotate(big)),
      broken: T.count(T.crack(big, 'row', 5))
    };
  });
  is(ceiling.built === 84 && ceiling.turned === 84 && ceiling.broken === 84,
    `⭐⭐ CONSERVATION SURVIVES THE 11-AND-12 SETTING: 84 buns built, ${ceiling.turned} after a turn, ${ceiling.broken} after a break. The previous build lost fourteen, and the census certified it.`);

  const sheet = await page.evaluate(() => {
    const T = window.BakingTray;
    T.st = T.newState(7, 6);
    return T._printCuts().map((c) => (c.axis ? c.axis[0] + c.k : 'whole'));
  });
  is(sheet.indexOf('r5') >= 0,
    `⭐⭐ THE PRINTED SHEET REACHES THE FIFTH LINE — the derivation the tool exists for (${sheet.join(' ')}). The previous build walked 1,2,3 and never got there.`);
  is(sheet[0] === 'whole' && new Set(sheet).size === sheet.length,
    'and every cell is a different break, with no padded duplicates');

  /* ---- 6. what it refuses to be ------------------------------------ */
  console.log('\n[the refusals]');
  const refuse = await page.evaluate(() => ({
    inputs: document.querySelectorAll('input, textarea, select').length,
    score: /\bscore\b|\bstreak\b|\btimer\b/i.test(document.body.innerText),
    turnDisabled: (() => {
      const T = window.BakingTray; T.st = T.crack(T.newState(7, 6), 'row', 5); T._paint();
      return document.querySelector('.btr-turn').disabled;
    })()
  }));
  is(refuse.inputs === 0, 'no typing surface — the material is the only input');
  is(refuse.score === false, 'no score, no streak, no timer (§20.4, operator-locked)');
  is(refuse.turnDisabled === true, '⭐ the turn is visibly DISABLED on a broken tray — refused, never a silent no-op');

  await page.close();
  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions against ${HOST}, eleven locales, apparatus driven`);
})().catch((e) => { console.error(e); process.exit(1); });
