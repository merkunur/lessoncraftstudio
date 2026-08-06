#!/usr/bin/env node
/* =====================================================================
   live-verify-heart-words.js — proves TOOL #21 works ON PRODUCTION.

   ⚠ "It mounts" is not verification. This drives the real apparatus with
   real pointer events against the live origin, and checks the ten landing
   pages that sell it.

   ⚠ The landing prose scan is scoped to `main p, main h1, main h2, main li`
   and NEVER `document.body.textContent` — the body carries Next's RSC
   flight data, which serialises every sibling tool on the page. A ban read
   off the body condemns a tool for a NEIGHBOUR's copy.

   Usage: node scripts/live-verify-heart-words.js [--locales=en,de]
   ===================================================================== */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const TOOL = require(path.join(__dirname, '..', 'mini tools', 'heart-words.js'));
const CONTENT = {};
for (const loc of ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no']) {
  try { CONTENT[loc] = require(path.join(__dirname, '..', 'frontend', 'messages', 'tool-content', loc + '.json'))['heart-words']; }
  catch (_) { CONTENT[loc] = null; }
}

const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim())
                    : ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const sec = (s) => console.log('\n' + s);
const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* ⚠ no-shame ban, Unicode-boundaried. `\b` is ASCII-only and matches
   INSIDE `quizá`, which condemned correct Spanish during the build. */
const VERDICT_EN = /(?<!\p{L})(correct|incorrect|wrong|oops|try again|test|quiz|drill|fail)(?!\p{L})/iu;

(async () => {
  /* poison the ban in BOTH directions before a single page is opened */
  sec('0  the ban, poison-tested before anything loads');
  const MUST_FIRE = ['That answer is wrong.', 'Test: correct or incorrect?', 'try again'];
  const MUST_PASS = ['Esta palabra parece que se puede leer sonido a sonido. Las cajas quizá vayan mejor.',
                     'Diesen Teil merken wir uns.', 'Cette partie, on la retient par cœur.',
                     'Den här delen lär vi oss utantill.'];
  is(MUST_FIRE.every(s => VERDICT_EN.test(s)), `the ban fires on all ${MUST_FIRE.length} must-fire strings`);
  is(MUST_PASS.every(s => !VERDICT_EN.test(s)), `and passes all ${MUST_PASS.length} correct native strings`);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------------------------------------------------------
     A — the ten landing pages
     --------------------------------------------------------------- */
  sec('A  the landing pages');
  for (const loc of LOCALES) {
    const C = CONTENT[loc];
    if (!C) { is(false, `${loc}: no tool-content entry`); continue; }
    const page = await browser.newPage();
    const url = `${BASE}/${loc}/tools/${C.slug}`;
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    is(resp && resp.status() === 200, `${loc}: ${url} -> ${resp ? resp.status() : 'no response'}`);

    const m = await page.evaluate(() => {
      const q = (s) => Array.from(document.querySelectorAll(s));
      /* ⚠ MAIN ONLY — the body carries RSC flight data for every sibling tool */
      const prose = q('main p, main h1, main h2, main h3, main li').map(e => e.textContent).join(' ');
      const canon = document.querySelector('link[rel=canonical]');
      const iframe = document.querySelector('iframe');
      return {
        h1: (document.querySelector('main h1') || {}).textContent || '',
        prose: prose,
        proseLen: prose.length,
        canonical: canon ? canon.getAttribute('href') : '',
        iframeSrc: iframe ? iframe.getAttribute('src') : '',
        desc: (document.querySelector('meta[name=description]') || {}).content || ''
      };
    });
    is(m.h1.indexOf(C.name) >= 0, `${loc}: h1 carries the native name ("${m.h1.trim().slice(0, 40)}")`);
    is(m.canonical.indexOf('/' + C.slug) >= 0, `${loc}: canonical carries the native slug`);
    is(/\/mini-tools\/heart-words\.html/.test(m.iframeSrc), `${loc}: the iframe points at the tool (${m.iframeSrc.slice(0, 60)})`);
    is(m.proseLen > 400, `${loc}: the landing carries real prose (${m.proseLen} chars)`);
    is(m.desc === C.metaDescription, `${loc}: meta description matches the authored one`);

    /* ⚠ NO LEXICAL VERDICT BAN HERE, DELIBERATELY. The no-shame ban governs
       the tool's CHILD-FACING strings (verify T4) — it is the wrong
       instrument for adult marketing prose, which has to USE those words in
       order to DENY them: this landing says "there is no marking, no score
       and no wrong tap available", and a word ban condemns the very
       sentence that sells the pedagogy. Ban-too-wide, third dress.
       What is actually worth checking on a landing is that it does not
       claim a tier the product does not have — the real defect found here
       was copy calling the printable cards Premium after they became free. */
    is(!/premium[^.]{0,80}(print|imprim|druck|stamp|afdruk|skriv ut|print)/i.test(m.prose),
      `${loc}: the prose does not put the printable cards behind Premium — sheet A is free for everyone`);
    await page.close();
  }

  /* ---------------------------------------------------------------
     B — DRIVING THE APPARATUS ON PRODUCTION
     --------------------------------------------------------------- */
  sec('B  ⭐ driving the real apparatus on production');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 704, height: 900 });
    await page.goto(`${BASE}/mini-tools/heart-words.html?lang=en&embed=1`,
      { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('.hw-box', { timeout: 20000 });
    await wait(600);

    /* NON-VACUITY: prove production is serving the real bank, not the
       inline offline fallback */
    const bank = await page.evaluate(async () => {
      const r = await fetch('/mini-tools/heart-words-en.json', { cache: 'no-cache' });
      if (!r.ok) return { ok: false, status: r.status };
      const j = await r.json();
      return { ok: true, words: j.words.length, shelves: j.shelves.length, target: j.targetTotal, version: j.version };
    });
    is(bank.ok, `production serves the English bank (${bank.ok ? 'ok' : 'http ' + bank.status})`);
    is(bank.words === 120 && bank.target === 120,
      `and it is the NEW bank: ${bank.words} words / ${bank.shelves} shelves, v${bank.version} — not the offline fallback`);

    /* the ramp — the defect this whole rebuild turned on */
    const ramp = await page.evaluate(() => {
      const T = window.HeartWords;
      T.premium = true;
      const pick = (n) => {
        const hit = T.bank.words.find(w => w.boxes.length === n && !T.tailText(w));
        if (!hit) return null;
        T.shelfId = hit.shelf;
        const l = T.wordsForShelf(hit.shelf);
        T.index = l.findIndex(w => w.id === hit.id);
        T.mapped = {}; T.face = 'map'; T.surface = 'board'; T.render();
        const b = document.querySelector('.hw-face-map .hw-box');
        return b ? b.getBoundingClientRect().width : null;
      };
      const two = pick(2), five = pick(5);
      T.premium = false; T.shelfId = T.firstFreeShelf(); T.index = 0; T.render();
      return { two, five };
    });
    is(ramp.two && ramp.five && ramp.two / ramp.five > 1.6,
      `⭐ the tile ramp is live: a 2-box word is ${(ramp.two / ramp.five).toFixed(2)}x a 5-box word ` +
      `(${Math.round(ramp.two)} vs ${Math.round(ramp.five)}) — it responded to the surface`);

    /* A REAL POINTER TAP, not a synthetic click */
    await wait(400);
    const boxes = await page.$$('.hw-face-map .hw-box');
    is(boxes.length >= 2, `the free card offers ${boxes.length} boxes`);
    for (const b of boxes) {
      const r = await b.boundingBox();
      await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
      await page.mouse.down(); await page.mouse.up();
      await wait(140);
    }
    await wait(600);
    const after = await page.evaluate(() => ({
      mapped: document.querySelectorAll('.hw-face-map .hw-box.hw-mapped').length,
      hearts: document.querySelectorAll('.hw-face-map .hw-box .hw-heart').length,
      sealW: (function () { const h = document.querySelector('.hw-heart'); return h ? h.getBoundingClientRect().width : 0; })(),
      spines: document.querySelectorAll('.hw-spine').length
    }));
    is(after.mapped === boxes.length, `every box settled under a real pointer (${after.mapped}/${boxes.length})`);
    is(after.hearts >= 1, `the heart seal arrived on production (${after.hearts})`);
    is(after.sealW >= 26, `and it renders ${Math.round(after.sealW)}px — legible from the back of the room`);
    is(after.spines >= 1, `the mapped word reached the shelf (${after.spines})`);

    /* the write face — the routine's ending */
    const wrote = await page.evaluate(() => {
      const T = window.HeartWords;
      const b = Array.from(document.querySelectorAll('.hw-flip'))
        .find(x => x.textContent.trim() === T.strings.writeIt.en);
      if (!b) return { found: false };
      b.click();
      return { found: true,
               blanks: document.querySelectorAll('.hw-blankrow .hw-box').length,
               text: Array.from(document.querySelectorAll('.hw-blankrow .hw-box')).map(e => e.textContent.trim()).join('') };
    });
    is(wrote.found && wrote.blanks >= 2, `the write face opens on production (${wrote.blanks} empty boxes)`);
    is(wrote.text === '', 'and the boxes are genuinely empty — the child retrieves the word');

    /* the desk + the teacher's own words */
    const desk = await page.evaluate(() => {
      const T = window.HeartWords;
      T.surface = 'desk'; T.deskTab = 'mine'; T.render();
      const ta = document.querySelector('.hw-ed-area');
      if (!ta) return { ok: false };
      T._addFromText('shone');
      const save = Array.from(document.querySelectorAll('.hw-ed-btn'))
        .find(x => x.textContent.trim() === T.strings.saveWord.en);
      return { ok: true,
               boxes: T._draft ? T._draft.boxes.join('|') : '',
               heart: T._draft ? T._draft.heart.length : -1,
               saveAria: save ? save.getAttribute('aria-disabled') : null,
               seams: document.querySelectorAll('.hw-seam').length };
    });
    is(desk.ok, 'the teacher desk opens on production');
    is(desk.boxes === 'sh|o|n|e', `the machine proposes a split (${desk.boxes})`);
    is(desk.heart === 0, '⭐ and it does NOT guess the heart');
    is(desk.saveAria === 'true', '⭐ the keep control announces itself unavailable until the teacher marks it');
    is(desk.seams >= 3, `the seam editor is live (${desk.seams} tap targets)`);

    /* the free visitor's print sheet — this used to be a BLANK PAGE */
    const printed = await page.evaluate(() => {
      const T = window.HeartWords;
      T.premium = false; T._printSheet = 'home'; T.surface = 'board'; T.render();
      const s = document.querySelector('.hw-printsheet');
      return { cards: document.querySelectorAll('.hw-printcard').length,
               kind: s ? s.getAttribute('data-sheet') : null };
    });
    is(printed.cards === 10, `a FREE visitor's Ctrl+P yields ${printed.cards} cards, not a blank page`);
    is(printed.kind === 'cards', 'and only ever the free sheet, whatever the chooser last said');

    await page.close();
  }

  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions on production`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions on production`);
})().catch(e => { console.error('HARNESS THREW: ' + e.message + '\n' + e.stack); process.exit(1); });
