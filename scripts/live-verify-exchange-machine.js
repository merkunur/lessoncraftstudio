/* =====================================================================
   live-verify-exchange-machine.js — TOOL #45 on PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-exchange-machine.js

   ⚠ THIS DRIVES THE APPARATUS ON THE LIVE SITE. "It mounts" is not the
   claim (§23.4). The inherited rules, each bought by a shipped defect:

     ⭐ RULE 1 — ASSERT NON-VACUITY FIRST. #40's gate keyed on an
     attribute the tool never emits, so every assertion compared two
     EMPTY NodeLists and would have passed on a tool with no tapes.

     ⭐ RULE 2 — SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE.
     `document.body.textContent` on a Next page carries the RSC
     flight-data, which serialises EVERY sibling tool. #40's
     no-named-unit ban read the RULER's own correct slug and condemned
     ten of eleven locales. Here the ban runs on the rendered SVG text
     of the apparatus and NOWHERE ELSE — and never on landing prose,
     which must be free to STATE the refusal (#44's ruling).

     ⭐ RULE 3 — WRITE ASSERTIONS FROM THE ARTEFACT, NOT THE NARRATIVE.

     ⭐ RULE 4 — REACH CONTROLS BY INDEX, NEVER BY ENGLISH TEXT.
     Chip order is fixed by construction: 0 method · 1 operation ·
     2 next record · 3 print.

   ⚠ RETURN PLAIN NUMBERS FROM page.evaluate — a DOMRect's properties
   live on its PROTOTYPE and it serialises out as `{}`, so every field
   is undefined and every comparison NaN (#43).

   ⭐ AND THE POINT OF THIS FILE: the two laws the tool's whole thesis
   rests on are asserted HERE, ON PRODUCTION, from the DOM and the live
   model together — CONSERVATION (an exchange moves value and never
   creates it) and THE LOCK (material moved iff the mark is written).
   A tool that passes those locally and breaks them live is lying to a
   class, and that is the only failure mode that actually matters.
   ===================================================================== */

'use strict';
const puppeteer = require('puppeteer');
const CONTENT = require('./_exchange-machine-content.js');

const HOST = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const CHIP = { method: 0, op: 1, next: 2, print: 3 };

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⚠ RE-QUERY EVERY TIME. `_paint()` rebuilds the hit layer, so an
   ElementHandle held across one interaction is DETACHED for the next —
   the first draft of this file crashed on exactly that.
   ⭐ AND A SCRIPTED INTERACTION THAT DOES NOT HAPPEN MUST FAIL LOUDLY
   (#39): a helper that quietly returned false hit a legitimately
   disabled control there, and the very next assertion — "the toggle is
   not swapped" — passed because nothing had been toggled. */
async function tap(page, sel, i, why) {
  const ok = await page.evaluate((s, n) => {
    const el = document.querySelectorAll(s)[n];
    if (!el || el.disabled) return false;
    el.click(); return true;
  }, sel, i);
  if (!ok) { FAIL++; console.error(`  FAIL  the tap did not happen: ${sel}[${i}] — ${why}`); }
  await wait(180);
  return ok;
}
/* plain numbers only — a DOMRect serialises as {} */
const box = (page, sel, i) => page.evaluate((s, n) => {
  const el = document.querySelectorAll(s)[n];
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { w: r.width, h: r.height };
}, sel, i);

/* ⚠ UNICODE LOOKAROUNDS, NEVER `\b` — it is ASCII-only and cannot see a
   boundary beside an accented letter, which killed three bans on #44's
   apply script and a weather ban on #43. */
const w = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');

/* THE APPARATUS CARRIES NUMERALS AND THE MATERIAL — NOTHING ELSE (§23.2).
   A number WORD on the stage would be `place-value-lab`'s moat leaking in
   and would make the tool unusable in the six locales with no reliable
   voice. This ban runs on the rendered SVG text only. */
const NUMWORD_BAN = w([
  'one|two|three|four|five|six|seven|eight|nine|ten|hundred',
  'eins|zwei|drei|vier|zehn|hundert',
  'un|deux|trois|dix|cent|cento|dieci|diez|cien',
  'tien|honderd|tio|hundra|ti|hundre|kymmenen|sata'
].join('|'));

(async () => {
  console.log('[poison — the ban, both directions]');
  is(NUMWORD_BAN.test('break a ten'), 'MUST FIRE: English "ten"');
  is(NUMWORD_BAN.test('zehn Plättchen'), 'MUST FIRE: German "zehn"');
  is(NUMWORD_BAN.test('kymmenen levyä'), '⭐ MUST FIRE: Finnish "kymmenen" — the form `\\b` can see but only by luck');
  is(!NUMWORD_BAN.test('204 − 137'), 'MUST PASS: bare numerals, which is all the stage may carry');
  is(!NUMWORD_BAN.test('centrum tiende tenth'), '⚠ MUST PASS: words that merely CONTAIN a number word are not one');

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
        return { h1: h1 ? h1.textContent.trim() : '', chars: paras.length, iframe: !!document.querySelector('iframe') };
      });
      is(seen.h1.length > 0, `${loc}: the landing has an h1 (vacuity guard) — "${seen.h1}"`);
      is(seen.h1.indexOf(CONTENT[loc].name) >= 0, `${loc}: h1 carries the native name "${CONTENT[loc].name}"`);
      is(seen.chars > 400, `${loc}: landing prose present (${seen.chars} chars)`);
      is(seen.iframe, `${loc}: the tool iframe is on the page`);
    }
    await page.close();
  }

  /* ---- 2. ⭐ DRIVE THE APPARATUS ON PRODUCTION --------------------- */
  console.log('\n[the apparatus, driven live]');
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = `${HOST}/mini-tools/exchange-machine.html?lang=en&embed=1`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  is(res.status() === 200, `the tool itself answers ${res.status()}`);
  await page.waitForSelector('.exm-wrap', { timeout: 20000 });
  await wait(900);

  /* ⭐ RULE 1 — NON-VACUITY BEFORE ANYTHING ELSE */
  const shape = await page.evaluate(() => ({
    hasModel: !!window.ExchangeMachine && !!window.ExchangeMachine.st,
    discs: document.querySelectorAll('.exm-disc').length,
    tubes: document.querySelectorAll('.exm-tube').length,
    lanes: document.querySelectorAll('.exm-hit:not(.exm-slot)').length,
    slots: document.querySelectorAll('.exm-slot').length,
    chips: document.querySelectorAll('.exm-chip').length,
    svg: document.querySelectorAll('.exm-svg').length
  }));
  is(shape.hasModel, 'NON-VACUITY: the model is on the page and has a state');
  is(shape.svg === 1, `NON-VACUITY: exactly one stage is drawn (got ${shape.svg})`);
  is(shape.discs > 0, `NON-VACUITY: the material is drawn (${shape.discs} counters)`);
  is(shape.tubes >= 2, `NON-VACUITY: the columns are drawn (${shape.tubes} tubes)`);
  is(shape.lanes >= 2 && shape.lanes <= 3, `NON-VACUITY: one hit-target per column (${shape.lanes})`);
  is(shape.slots === shape.lanes, `NON-VACUITY: one answer slot per column (${shape.slots})`);
  is(shape.chips === 4, `NON-VACUITY: four chips (got ${shape.chips})`);

  /* the whole live reading, in plain numbers */
  const read = () => page.evaluate(() => {
    const T = window.ExchangeMachine, st = T.st;
    const svgText = Array.from(document.querySelectorAll('.exm-svg text')).map((n) => n.textContent).join(' ');
    return {
      op: st.op, a: st.a, b: st.b,
      col: st.col.slice(), moved: st.moved.slice(), carried: st.carried.slice(),
      taken: st.taken.slice(), ans: st.ans.slice(),
      value: T.value(st), conserved: T.conserved(st), settled: T.settled(st), width: T.width(st),
      discs: document.querySelectorAll('.exm-disc').length,
      marks: document.querySelectorAll('.exm-mark').length,
      strikes: document.querySelectorAll('.exm-strike').length,
      ghosts: document.querySelectorAll('.exm-ghost').length,
      openLanes: Array.from(document.querySelectorAll('.exm-hit:not(.exm-slot)')).map((b) => !b.disabled),
      svgText: svgText
    };
  });

  const r0 = await read();
  is(r0.op === 'sub' && r0.a === 48 && r0.b === 23,
    `the first free record is the one that needs NO exchange — ${r0.a} − ${r0.b}`);
  is(r0.conserved && r0.value === r0.a,
    `⭐⭐ LAW 1 (CONSERVATION), at rest: the material is worth exactly ${r0.a}`);
  is(r0.discs === r0.col.reduce((x, y) => x + y, 0),
    `⭐ the DRAWN counters are the model's counters, lane for lane (${r0.discs})`);
  is(!NUMWORD_BAN.test(r0.svgText),
    `⭐ NO WORDS ON THE APPARATUS — the stage carries numerals only ("${r0.svgText.slice(0, 48).replace(/\s+/g, ' ')}…")`);
  is(/[0-9]/.test(r0.svgText), 'vacuity guard on that ban: the stage does carry numerals');

  /* ---- 3. the take, and the answer line ---------------------------- */
  console.log('\n[taking, and writing it down]');
  const lb = await box(page, '.exm-hit:not(.exm-slot)', 0);
  is(lb && lb.w >= 34 && lb.h >= 34,
    `CANVAS floor live: the ones lane is ${Math.round(lb.w)}x${Math.round(lb.h)}px`);
  for (let i = 0; i < 3; i++) await tap(page, '.exm-hit:not(.exm-slot)', 0, 'take a counter from the ones');
  const r1 = await read();
  is(r1.taken[0] === 3, `three taps took three counters out of the ones (taken = ${r1.taken[0]})`);
  is(r1.conserved, '⭐⭐ LAW 1 holds after taking — nothing was conjured, nothing lost');
  is(r1.discs < r0.discs, `…and the stage shows it (${r0.discs} → ${r1.discs} counters)`);

  await tap(page, '.exm-slot', 0, 'write the ones digit on the answer line');
  const r2 = await read();
  is(r2.ans[0] === 5, `⭐ the answer line takes the digit the MATERIAL says, not one I typed (${r2.ans[0]})`);

  /* ---- 4. ⭐⭐ THE EXCHANGE, AND THE LOCK -------------------------- */
  console.log('\n[the exchange — the whole thesis, live]');
  /* move to 42 − 17: one borrow, the first record that needs one */
  const cb = await box(page, '.exm-chip', CHIP.next);
  is(cb && cb.h >= 44, `CONTROL floor live: the next-record chip is ${Math.round(cb.w)}x${Math.round(cb.h)}px`);
  await tap(page, '.exm-chip', CHIP.next, 'move to the next record');
  await wait(320);

  const b0 = await read();
  is(b0.a === 42 && b0.b === 17, `the record that needs a borrow — ${b0.a} − ${b0.b}`);
  is(b0.openLanes[1] === true, '⭐ the tens lane is LIVE: the tool is inviting the exchange, not the take');
  is(b0.marks === 0 && b0.strikes === 0, 'vacuity guard: nothing is written on the sum yet');

  await tap(page, '.exm-hit:not(.exm-slot)', 1, 'break a ten');
  await wait(240);
  const b1 = await read();

  is(b1.col[1] === b0.col[1] - 1 && b1.col[0] === b0.col[0] + 10,
    `⭐⭐ ONE TAP BROKE A TEN — tens ${b0.col[1]}→${b1.col[1]}, ones ${b0.col[0]}→${b1.col[0]}`);
  is(b1.value === b0.value && b1.conserved,
    `⭐⭐ LAW 1 (CONSERVATION) THROUGH AN EXCHANGE: still worth exactly ${b1.value}. Value moved; none was made.`);
  is(b1.moved[1] === true, 'the model records that the tens column gave ten away');
  is(b1.marks + b1.strikes > b0.marks + b0.strikes,
    `⭐⭐ LAW 2 (THE LOCK): the material moved AND the pen mark appeared in the same instant — ${b0.marks + b0.strikes} → ${b1.marks + b1.strikes} marks. This is the entire product.`);
  is(b1.discs === b0.discs + 9,
    `…and ten counters replaced one, on screen (${b0.discs} → ${b1.discs})`);

  /* the reverse: the same machine run backwards fuses ten into one */
  await page.evaluate(() => {
    const b = document.querySelectorAll('.exm-hit:not(.exm-slot)')[1];
    b.focus();
    b.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
  });
  await wait(400);
  const b2 = await read();
  is(b2.col[1] === b0.col[1] && b2.col[0] === b0.col[0],
    `⭐ AND IT RUNS BACKWARDS — ten fused back into one (${b1.col.join(',')} → ${b2.col.join(',')})`);
  is(b2.moved[1] === false && b2.marks + b2.strikes === b0.marks + b0.strikes,
    '⭐⭐ …and the mark UNWROTE ITSELF. The lock is a bijection, live: no mark without material, no material without a mark.');
  is(b2.conserved && b2.value === b0.value, `LAW 1 holds in reverse too (${b2.value})`);

  /* ---- 5. solve one record end to end ------------------------------ */
  console.log('\n[a record solved end to end, on production]');
  let guard = 0;
  while (guard++ < 40) {
    const done = await page.evaluate(() => {
      const T = window.ExchangeMachine;
      return T.st.ans.slice(0, T.width(T.st)).every((d) => d !== null);
    });
    if (done) break;
    const moved = await page.evaluate(() => {
      const pick = (sel) => Array.from(document.querySelectorAll(sel)).filter((b) => !b.disabled)[0];
      const el = pick('.exm-hit:not(.exm-slot)') || pick('.exm-slot');
      if (!el) return false; el.click(); return true;
    });
    if (!moved) break;
    await wait(120);
  }
  const fin = await read();
  is(guard < 40, `the record can be finished by driving the apparatus alone (${guard} moves)`);
  is(fin.ans.slice(0, fin.width).every((d) => d !== null), `every column is answered (${fin.ans.join('')})`);
  {
    const wrote = fin.ans.slice(0, fin.width).reduce((s, d, k) => s + d * Math.pow(10, k), 0);
    is(wrote === b0.a - b0.b,
      `⭐⭐ AND THE ANSWER THE MATERIAL WROTE IS THE RIGHT ONE: ${b0.a} − ${b0.b} = ${wrote}`);
  }
  is(fin.conserved, 'LAW 1 held across every move of the whole record');

  /* ---- 6. the other direction: addition, and the carry -------------- */
  console.log('\n[the same machine, addition]');
  await tap(page, '.exm-chip', CHIP.op, 'turn the machine round to addition');
  await wait(320);
  const a0 = await read();
  is(a0.op === 'add', 'the operation chip turns the machine round');
  is(a0.conserved, 'LAW 1 holds on the addition side too (value − filled === the top number)');

  /* ⚠ AND THE RECORD MUST ACTUALLY HAVE A CARRY IN IT. The first draft
     flipped the operation chip and demanded a carry on the SAME
     operands — but 42 + 17 has ones 2 + 7 = 9, so there is no carry to
     catch and a CORRECT tool failed. That is #40's recorded trap
     exactly: an assertion written from the plan's narrative instead of
     from the artefact. Seek the record by asking the MODEL which one
     overflows, never by assuming which one does. */
  let addRec = a0;
  for (let i = 0; i < 8; i++) {
    if (addRec.op === 'add' && (addRec.a % 10) + (addRec.b % 10) >= 10) break;
    await tap(page, '.exm-chip', CHIP.next, 'look for an addition record whose ones overflow');
    await wait(260);
    addRec = await read();
  }
  is(addRec.op === 'add' && (addRec.a % 10) + (addRec.b % 10) >= 10,
    `⭐ found a record that genuinely needs a carry — ${addRec.a} + ${addRec.b} (ones ${addRec.a % 10} + ${addRec.b % 10})`);

  {
    const laneCount = await page.evaluate(() => document.querySelectorAll('.exm-hit:not(.exm-slot)').length);
    const marks0 = addRec.marks + addRec.strikes;
    let carried = false, prev = addRec.col.slice(), broke = false;
    for (let i = 0; i < 20 && !carried; i++) {
      const open = await page.evaluate(() => {
        const b = Array.from(document.querySelectorAll('.exm-hit:not(.exm-slot)')).filter((x) => !x.disabled)[0];
        if (!b) return false; b.click(); return true;
      });
      if (!open) break;
      await wait(130);
      const now = await read();
      if (now.col[0] < prev[0] && now.col[1] > prev[1]) carried = true;
      prev = now.col.slice();
      if (!now.conserved) { broke = true; break; }
    }
    const a1 = await read();
    is(!broke && a1.conserved, `⭐⭐ LAW 1 holds through the fill and the carry — ${a1.value} − ${a1.value - a1.a} filled = ${a1.a}`);
    is(carried,
      `⭐⭐ TEN ONES FUSED INTO ONE TEN — the same latch, run the other way (${addRec.col.join(',')} → ${a1.col.join(',')})`);
    /* ⚠ `moved` is the BORROW ledger; the carry keeps its own, `carried`.
       Naming the wrong field failed a correct tool once here — read the
       artefact, not the field name you expected to find. */
    is(a1.carried[0] === true, 'the model records the carry in its own ledger — `carried`, not the borrow\'s `moved`');
    is(a1.moved.every((m) => m === false), '…and the borrow ledger stayed empty: the two directions are not one flag');
    is(a1.marks + a1.strikes > marks0,
      `⭐⭐ LAW 2 (THE LOCK) ON THE ADDITION SIDE: the carry digit was written in the same instant — ${marks0} → ${a1.marks + a1.strikes} marks`);
    is(laneCount >= 2, `vacuity guard: the addition stage has ${laneCount} lanes`);
  }

  /* ---- 7. what it refuses to be ------------------------------------ */
  console.log('\n[the refusals]');
  const refuse = await page.evaluate(() => ({
    inputs: document.querySelectorAll('input, textarea, select').length,
    timers: document.body.innerHTML.match(/countdown|stopwatch/gi) || [],
    score: /\bscore\b|\bstreak\b/i.test(document.body.innerText)
  }));
  is(refuse.inputs === 0, 'no typing surface — the material writes the digits, not a keypad');
  is(refuse.timers.length === 0, 'no timer');
  is(refuse.score === false, 'no score, no streak (§20.4, operator-locked)');

  /* ---- 8. the free/paid line, and the print sheet ------------------ */
  console.log('\n[the shelf]');
  const gate = await page.evaluate(() => ({
    lock: document.querySelectorAll('.exm-lock').length,
    paid: document.querySelectorAll('.exm-paid').length,
    printDisabled: document.querySelectorAll('.exm-chip')[3].disabled
  }));
  is(gate.lock >= 1, `the gate line is rendered for a visitor without the plan (${gate.lock})`);
  is(typeof gate.printDisabled === 'boolean', 'the print chip reports a real entitlement state');

  await page.close();
  await browser.close();

  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions against ${HOST}, eleven locales, apparatus driven`);
})().catch((e) => { console.error(e); process.exit(1); });
