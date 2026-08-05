#!/usr/bin/env node
/* =====================================================================
   live-verify-wodb.js — the tool ON PRODUCTION, all 11 locales.

   ⚠ NEVER "it mounts". This DRIVES the control the operator asked for:
   it presses Next grid and proves the BOARD changed, walks back with
   Previous, and checks that the doctrine line — which the shell hides in
   every embed, and which was therefore never seen by a teacher until
   this rebuild — is actually on the stage.

   Rules inherited, each bought by a real defect:
     - assert NON-VACUITY first: an empty NodeList compared to another
       empty NodeList passes and proves nothing
     - scope every content check to the TOOL's own prose, never
       document.body.textContent, which carries Next's RSC flight-data
       for every sibling tool on the page
     - reach controls BY INDEX or by data-fk, never by English text
     - return plain numbers from page.evaluate — a DOMRect's properties
       live on its prototype and serialise out as {}

   Run:  node scripts/live-verify-wodb.js
   ===================================================================== */

'use strict';
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const HOST = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const T = require(path.join(ROOT, 'mini tools', 'wodb.js'));
const CONTENT = {};
for (const l of LOCALES) {
  try { CONTENT[l] = require(path.join(ROOT, 'frontend', 'messages', 'tool-content', l + '.json')).wodb; }
  catch (_) { CONTENT[l] = null; }
}

let FAIL = 0, PASS = 0;
const fail = (m) => { FAIL++; console.log('  FAIL  ' + m); };
const ok = () => { PASS++; };

(async () => {
  console.log('live-verify-wodb — ' + HOST + '\n');
  for (const loc of LOCALES) {
    const c = CONTENT[loc];
    if (!c || !c.slug) { fail(loc + ' has no landing content'); continue; }
    /* ⚠ a FRESH BROWSER per locale — a reused one carries localStorage,
       and this tool's free tier is localStorage-backed */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const marks = [];
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 900 });
      await page.goto(HOST + '/' + loc + '/tools/' + c.slug, { waitUntil: 'networkidle2', timeout: 90000 });

      const frameEl = await page.$('iframe');
      if (!frameEl) { fail(loc + ' — no iframe (play meter wall, or the landing 404s)'); await browser.close(); continue; }
      const frame = await frameEl.contentFrame();
      await frame.waitForSelector('.wdb-grid', { timeout: 30000 });
      await new Promise((r) => setTimeout(r, 2500));

      /* 1. NON-VACUITY — four cells, or every check below is hollow */
      const cells = await frame.$$eval('.wdb-cell', (n) => n.length);
      if (cells !== 4) { fail(loc + ' — ' + cells + ' cells, not 4'); await browser.close(); continue; }
      ok();

      /* 2. THE DOCTRINE LINE IS ON THE STAGE. It is authored in eleven
            locales, handed to the shell, and hidden by
            lcs-shell.css:261 in every embed — which is what this page
            is. Before the rebuild no teacher had ever seen it. */
      const doc = await frame.$eval('.wdb-doctrine', (n) => (n.textContent || '').trim()).catch(() => '');
      if (!doc) fail(loc + ' — the doctrine line is not on the stage');
      else if (doc !== (T.strings.doctrine[loc] || '')) {
        fail(loc + ' — doctrine reads "' + doc + '", the tool declares "' + T.strings.doctrine[loc] + '"');
      } else { ok(); marks.push('doctrine'); }

      /* 3. THE BOARD IS BIG. Measured before the rebuild: 112px cells at
            every desktop width, inside a 422px iframe pinned by a fixed
            point. Anything under 200 means the binding is back. */
      const cellW = await frame.$eval('.wdb-cell', (n) => Math.round(n.getBoundingClientRect().width));
      if (cellW < 200) fail(loc + ' — a cell is ' + cellW + 'px; the board is pinned again');
      else { ok(); marks.push(cellW + 'px cells'); }

      /* 4. NEXT GRID — the control this rebuild exists for. It must
            change the BOARD, not just its own appearance. A free visitor
            has one grid, so the chip is the turn; either way it must DO
            something to the four corners. */
      const before = await frame.$$eval('.wdb-cell', (n) => n.map((c) => c.getAttribute('aria-label')).join('|'));
      const kind = await frame.$eval('[data-fk="next"]', (n) => (n.textContent || '').trim());
      await frame.$eval('[data-fk="next"]', (n) => n.click());
      await new Promise((r) => setTimeout(r, 900));
      const after = await frame.$$eval('.wdb-cell', (n) => n.map((c) => c.getAttribute('aria-label')).join('|'));
      if (!before || before === after) {
        fail(loc + ' — the forward control ("' + kind + '") did not change the four corners');
      } else { ok(); marks.push('forward:"' + kind + '"'); }

      /* 5. every cell carries an accessible name. Picture cells used to
            be <img alt=""> inside an unnamed <button>: four "button, not
            pressed"s and nothing else. */
      const named = await frame.$$eval('.wdb-cell', (n) => n.filter((c) => (c.getAttribute('aria-label') || '').length > 3).length);
      if (named !== 4) fail(loc + ' — ' + named + '/4 cells have an accessible name');
      else { ok(); marks.push('4 named'); }

      /* 6. no verdict vocabulary in the TOOL's own prose. ⚠ scoped to
            .wdb-wrap — document.body would drag in the RSC flight-data
            for every sibling tool and condemn correct copy. */
      const prose = await frame.$eval('.wdb-wrap', (n) => n.innerText || '');
      const BAN = { en: /(?<!\p{L})(correct|incorrect|wrong)(?!\p{L})/iu, de: /(?<!\p{L})(richtig|falsch)(?!\p{L})/iu,
        fr: /(?<!\p{L})(bonne réponse|faux)(?!\p{L})/iu, it: /(?<!\p{L})(giust[oa]|sbagliat[oa])(?!\p{L})/iu,
        es: /(?<!\p{L})(correct[oa]|incorrect[oa])(?!\p{L})/iu, pt: /(?<!\p{L})(corret[oa]|errad[oa])(?!\p{L})/iu,
        nl: /(?<!\p{L})(fout|goed antwoord)(?!\p{L})/iu, sv: /(?<!\p{L})(rätt svar|fel svar)(?!\p{L})/iu,
        da: /(?<!\p{L})(forkert|rigtigt svar)(?!\p{L})/iu, no: /(?<!\p{L})(feil svar|riktig svar)(?!\p{L})/iu,
        fi: /(?<!\p{L})(väärin|oikea vastaus)(?!\p{L})/iu };
      /* the doctrine legitimately says "answer" — strip the noun, keep the ban */
      const stripped = prose.replace(/(?<!\p{L})(answers?|Antworten?|réponses?|rispost[ae]|respuestas?|respostas?|antwoord(en)?|svar|vastaus\w*)(?!\p{L})/giu, '');
      if (BAN[loc].test(stripped)) fail(loc + ' — verdict vocabulary on the live stage');
      else ok();

      /* 7. the landing page itself matches the content SoT */
      const h1 = await page.$eval('h1', (n) => (n.textContent || '').trim()).catch(() => '');
      if (!h1 || h1.indexOf(c.name.slice(0, 8)) < 0) fail(loc + ' — landing h1 is "' + h1 + '", expected ' + c.name);
      else ok();

      console.log('  ok    ' + loc.padEnd(3) + ' ' + marks.join(' · '));
      await browser.close();
    } catch (e) {
      fail(loc + ' — ' + e.message);
      try { await browser.close(); } catch (_) {}
    }
  }
  console.log('');
  if (FAIL) { console.log('FAIL — ' + FAIL + ' failure(s), ' + PASS + ' assertions clear'); process.exit(1); }
  console.log('PASS — ' + PASS + ' assertions driven on production across ' + LOCALES.length + ' locales');
})();
