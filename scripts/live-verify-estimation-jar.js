#!/usr/bin/env node
/* =====================================================================
   live-verify-estimation-jar.js — the tool, on PRODUCTION, in all eleven
   locales, DRIVING THE MAIN CONTROL. Never "it mounts".

   THE RULES THIS GATE INHERITS, each bought by a real defect:
     · a FRESH BROWSER per locale — a shared context carries state and
       certifies locale 11 off locale 1's boot;
     · ASSERT NON-VACUITY FIRST. A querySelectorAll comparison is not
       evidence until you have shown it selected something;
     · SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE. On a Next page
       `document.body.textContent` carries RSC flight-data that
       serialises every sibling tool, so a ban read against the body
       condemns copy this tool never wrote;
     · REACH CONTROLS BY INDEX, never by English text — the stage strip
       is localised, and "print" appears inside "Another blueprint".

   Usage: node scripts/live-verify-estimation-jar.js [--locales=en,de]
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',') : ALL;

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => {
  if (c) { pass++; console.log('  ok   ' + n); }
  else { fail++; bad.push(n); console.log('  FAIL ' + n + (x ? ' — ' + x : '')); }
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* Unicode boundaries, because \b is ASCII-only and cannot see the edge of
   lähimpänä or nærmest. Poison-tested below before it judges anything. */
const w = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');
const RANK = w('closest|nearest|winner|wins|champion|gewinn\\p{L}*|gagnant\\p{L}*|'
  + 'vincitor\\p{L}*|ganador\\p{L}*|vencedor\\p{L}*|winnaar\\p{L}*|vinnare\\p{L}*|'
  + 'vinder\\p{L}*|voitt\\p{L}*|n(ä|æ|a)rmast\\p{L}*|n(æ|ae)rmest\\p{L}*|l(ä|a)himp(ä|a)n(ä|a)');

(async () => {
  /* poison the ban in BOTH directions before it is trusted */
  if (!RANK.test('who was closest')) { console.error('POISON: the ban misses an obvious hit'); process.exit(1); }
  if (RANK.test('Alle overslag hører hjemme på tallinja')) { console.error('POISON: the ban condemns correct copy'); process.exit(1); }

  for (const loc of LOCALES) {
    console.log('\n[' + loc + ']');
    /* a FRESH BROWSER, not a fresh page */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const p = await browser.newPage();
      await p.setViewport({ width: 1280, height: 900 });
      const errs = [];
      p.on('pageerror', e => errs.push(String(e.message)));
      await p.goto(`${BASE}/mini-tools/estimation-jar.html?lang=${loc}`, { waitUntil: 'networkidle2', timeout: 60000 });
      await p.waitForSelector('.ej-card', { timeout: 25000 });
      await sleep(1200);

      /* NON-VACUITY FIRST — everything below compares node sets, and an
         empty set agrees with any assertion you make about it. */
      const boot = await p.evaluate(() => ({
        stages: document.querySelectorAll('.ej-stagebtn').length,
        caps: document.querySelectorAll('.ej-capbtn').length,
        jar: !!document.querySelector('.ej-jar canvas.ej-pile'),
        sets: (window.EstimationJar && window.EstimationJar.data && window.EstimationJar.data.sets || []).length,
        title: (document.querySelector('.lcs-title') || {}).textContent || ''
      }));
      ok('the tool booted with its three stages and three jars', boot.stages === 3 && boot.caps === 3,
        `stages=${boot.stages} caps=${boot.caps}`);
      ok('the repertoire loaded from the server', boot.sets >= 100, 'sets=' + boot.sets);
      ok('the pile is a canvas (the count is not countable in the DOM)', boot.jar);
      ok('the title is localised', boot.title.trim().length > 2, boot.title);

      /* DRIVE THE MAIN CONTROL: the count the whole tool exists to hide.
         By INDEX — the buttons carry localised aria-labels. */
      const before = await p.evaluate(() => window.EstimationJar.count);
      /* ⚠ INDEX 2, not 3. The row is [−10, −1, +1, +10] and the readout
         between them is a span, not a button — I aimed at +10 first and
         watched 23 clamp to the ceiling at 30, which then made the
         doctrine-B check below fire on the number line's own "30" tick. */
      await p.evaluate(() => document.querySelectorAll('.ej-stepbtn')[2].click());  // +1
      await sleep(250);
      const after = await p.evaluate(() => window.EstimationJar.count);
      ok('the count control moves the jar by ONE', after === before + 1, `${before} -> ${after}`);

      /* the picture must actually change with it — the seven-states defect */
      const pic = await p.evaluate(() => {
        const T = window.EstimationJar;
        const a = JSON.stringify(T.packPile(T.count, T.capacityOf(), T.setId).length);
        const b = JSON.stringify(T.packPile(T.count - 1, T.capacityOf(), T.setId).length);
        return a !== b;
      });
      ok('one more object really is one more object', pic);

      /* the ritual, end to end */
      await p.evaluate(() => document.querySelectorAll('.ej-stagebtn')[1].click());
      await sleep(400);
      await p.evaluate(() => {
        const t = document.querySelector('.ej-track');
        const r = t.getBoundingClientRect();
        t.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: r.left + r.width * 0.5, clientY: r.top + r.height * 0.5 }));
      });
      await sleep(250);
      await p.evaluate(() => document.querySelector('.ej-go').click());
      await sleep(300);
      const dots = await p.$$eval('.ej-dot', e => e.filter(x => !x.classList.contains('ej-pending')).length);
      ok('an estimate commits to the plot', dots === 1, 'dots=' + dots);

      /* DOCTRINE B on production: the answer is not in the DOM yet */
      const secret = await p.evaluate(() => String(window.EstimationJar.count));
      /* ⚠ SCOPE IT. Doctrine B is that the true count must not be
         READABLE — not that the numeral may not appear anywhere. The
         number line's own scale is PUBLIC by design (its range is the
         jar's declared capacity, which the class can see), so the tick
         labels are excluded. Including them made this fire on a jar of
         30 against the "30" at the end of the axis: a wrong measurement
         reported as a defect, which is the trap this file warns about
         three comments above. What must be clean is the tool's prose,
         its aria, its title and its live region. */
      const leak = await p.evaluate(() => {
        const c = document.querySelector('.ej-card').cloneNode(true);
        c.querySelectorAll('.ej-ticks, .ej-truth, .ej-tally').forEach(n => n.remove());
        const aria = [...c.querySelectorAll('[aria-label]')].map(e => e.getAttribute('aria-label')).join(' ');
        const live = [...document.querySelectorAll('.lcs-sr-only')].map(e => e.textContent).join(' ');
        return (c.innerText + ' ' + aria + ' ' + live + ' ' + document.title);
      });
      ok('the true count is NOT in the DOM while the class estimates',
        !new RegExp('(?<!\\d)' + secret + '(?!\\d)').test(leak), 'count=' + secret);

      await p.evaluate(() => document.querySelectorAll('.ej-stagebtn')[2].click());
      await p.waitForFunction(() => !!document.querySelector('.ej-truth'), { timeout: 45000 });
      await sleep(400);
      const rev = await p.evaluate(() => ({
        truth: (document.querySelector('.ej-truth') || {}).textContent,
        tally: (document.querySelector('.ej-tally') || {}).textContent,
        frames: document.querySelectorAll('.ej-tf').length,
        closing: (document.querySelector('.ej-closing') || {}).textContent || ''
      }));
      ok('the reveal lands the true count on the line', rev.truth === secret, `${rev.truth} vs ${secret}`);
      ok('the running total is RENDERED, not only spoken', rev.tally === secret, 'tally=' + rev.tally);
      ok('the count came out in frames', rev.frames >= 1, 'frames=' + rev.frames);
      ok('the ritual closes with a localised line', rev.closing.trim().length > 5, rev.closing);

      /* DOCTRINE A — scoped to THIS TOOL'S prose, never document.body */
      const prose = await p.evaluate(() => document.querySelector('.ej-wrap').innerText);
      ok('no ranking vocabulary anywhere in the tool', !RANK.test(prose), (prose.match(RANK) || [])[0]);

      ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
      await p.close();
    } catch (e) {
      fail++; bad.push(loc + ': ' + e.message);
      console.log('  FAIL ' + loc + ' threw — ' + e.message);
    } finally {
      await browser.close();
    }
  }

  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  if (bad.length) bad.forEach(b => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})();
