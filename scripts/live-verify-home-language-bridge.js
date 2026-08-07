#!/usr/bin/env node
/* =====================================================================
   live-verify-home-language-bridge.js — the Say It Board on production,
   in all eleven, DRIVEN.
   ---------------------------------------------------------------------
   ⚠ THE VERSION THIS REPLACES ONLY COUNTED CARDS AND ICONS. "It mounts"
   is not a test: every one of the four defects that shipped in v2 would
   have mounted perfectly. This one taps a card and checks the board
   answered, opens a category, and confirms the print sheet a FREE
   visitor gets is not blank — because that is what was broken.

   ⚠ FRESH BROWSER PER LOCALE, cache disabled (Cloudflare holds a 5-min
   TTL, so a stale edge is the normal case for the first few minutes
   after a deploy, not an anomaly).

   Usage: node scripts/live-verify-home-language-bridge.js
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const PAGES = [
  ['en', 'say-it-board'], ['de', 'sag-es-tafel'], ['fr', 'tableau-pour-se-faire-comprendre'],
  ['it', 'tavola-per-farsi-capire'], ['es', 'tablero-para-decirlo'], ['pt', 'quadro-para-falar'],
  ['nl', 'zegbord'], ['sv', 'sag-det-tavlan'], ['da', 'sig-det-tavlen'],
  ['no', 'si-det-tavla'], ['fi', 'sanomistaulu']
];

let pass = 0, fail = 0;
const is = (c, m) => { if (c) { pass++; console.log('    ok   ' + m); } else { fail++; console.error('    FAIL ' + m); } };

(async () => {
  for (const [loc, slug] of PAGES) {
    console.log(`[${loc}] /${loc}/tools/${slug}/`);
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const p = await b.newPage();
      await p.setCacheEnabled(false);
      await p.setViewport({ width: 1280, height: 900 });
      const res = await p.goto(`${BASE}/${loc}/tools/${slug}/`, { waitUntil: 'networkidle2', timeout: 60000 });
      is(res && res.status() === 200, `the page is 200 (got ${res && res.status()})`);

      /* the tool lives in an iframe; wait for it and then drive it */
      let frame = null;
      for (let i = 0; i < 40 && !frame; i++) {
        frame = p.frames().find((f) => /mini-tools\/home-language-bridge/.test(f.url()));
        if (!frame) await new Promise((r) => setTimeout(r, 500));
      }
      if (!frame) { is(false, 'the tool iframe never appeared'); await b.close(); continue; }

      await frame.waitForFunction(() => document.querySelectorAll('.hlb-card').length > 0, { timeout: 30000 });
      const m = await frame.evaluate(() => ({
        cards: document.querySelectorAll('.hlb-card').length,
        core: document.querySelectorAll('.hlb-rail .hlb-card').length,
        tabs: document.querySelectorAll('.hlb-tab').length,
        sheet: document.querySelectorAll('.hlb-sheet .hlb-p-card').length,
        icons: document.querySelectorAll('.hlb-sheet .hlb-p-icon').length,
        first: (document.querySelector('.hlb-card .hlb-text') || {}).textContent || ''
      }));
      is(m.cards === 20, `20 cards (8 core + 12) — got ${m.cards}`);
      is(m.core === 8, `the core rail holds 8 — got ${m.core}`);
      is(m.tabs >= 2, `category tabs present — got ${m.tabs}`);

      /* ⭐ DRIVE THE MAIN CONTROL. Tap a card; the board must answer.
         ⚠ CLICK THE ELEMENT HANDLE, NOT A FRAME SELECTOR. `frame.click`
         resolves the selector in the frame but dispatches the click at
         PAGE coordinates — and this frame is an iframe scrolled down
         inside the tool page, so the pointer landed on whatever was at
         those coordinates in the parent document. It reported a clean
         miss as a dead control in nine locales, while a direct probe
         showed the tap working perfectly. A wrong measurement that
         looks exactly like a defect is the worst kind, and this is the
         second time in this build I nearly filed one. */
      /* ⚠ NO SILENT NO-OP. `if (el) el.click()` swallows a missing
         element and the very next assertion then reports a dead control
         — a scripted interaction must fail loudly when it does not
         happen. And the card to tap is READ OFF THE BOARD rather than
         named: `card-help` is an English id, and on a board whose whole
         subject is other languages, hard-coding one is how a probe ends
         up measuring nothing in ten locales. */
      const tapped = await frame.evaluate(() => {
        const el = document.querySelector('.hlb-rail .hlb-card');
        if (!el) throw new Error('no core card to tap');
        const id = el.getAttribute('data-id');
        el.click();
        return id;
      });
      await new Promise((r) => setTimeout(r, 250));
      /* ⚠⚠ THE ANSWER IS "THE BOARD RESPONDED", NOT "THE CARD LIFTED",
         and getting that wrong nearly had me file a defect against
         correct behaviour for the third time in this build.
         This checker's machine has an ENGLISH voice and no others. So in
         `en` the card lifts and speaks — and in the other ten
         `_canSpeak(room)` is false, Show-big is FORCED ON, and a tap
         correctly opens the large view INSTEAD of lifting. That is the
         tool's headline invention working exactly as designed: with no
         voice, showing is the only channel left, so the apparatus
         reconfigures rather than printing an apology.
         An assertion that demands one specific response condemns the
         other, correct one. Assert the CONSEQUENCE, and report which
         arm ran so the difference stays visible rather than averaged. */
      const r2 = await frame.evaluate(() => ({
        lifted: document.querySelectorAll('.hlb-said').length,
        big: !!document.querySelector('.hlb-big.hlb-open'),
        forced: !!window.HomeLanguageBridge._forcedBig
      }));
      is(r2.lifted === 1 || r2.big,
        `tapping "${tapped}" is answered — ${r2.big ? 'shown large (no voice for this language on this device)' : 'lifted and spoken'}`);
      if (r2.big) is(r2.forced, 'and it was shown large because the device has no voice, not by accident');

      /* switch category: the twelve change and the eight do not */
      const before = await frame.evaluate(() =>
        Array.from(document.querySelectorAll('.hlb-rail .hlb-card')).map((c) => c.getAttribute('data-id')).join());
      const tabs = await frame.$$('.hlb-tab');
      if (tabs.length > 1) {
        await tabs[1].click();
        await new Promise((r) => setTimeout(r, 250));
        const after = await frame.evaluate(() => ({
          core: Array.from(document.querySelectorAll('.hlb-rail .hlb-card')).map((c) => c.getAttribute('data-id')).join(),
          n: document.querySelectorAll('.hlb-board .hlb-card').length
        }));
        is(after.core === before, 'the core is byte-identical after switching category — the motor plan survives');
        is(after.n === 12, `the group still holds exactly 12 — got ${after.n}`);
      }

      /* ⭐ the free print sheet is REAL, and it carries the pictures */
      is(m.sheet > 0, `a FREE visitor has a print sheet (${m.sheet} cards) — not a blank page`);
      is(m.icons === m.sheet, `every printed card carries its picture (${m.icons}/${m.sheet})`);
      is(!!m.first, `the board is in ${loc}: ${JSON.stringify(m.first)}`);
    } catch (e) {
      is(false, 'threw: ' + e.message);
    }
    await b.close();
  }
  console.log('');
  console.log(fail ? `FAIL — ${pass} passed, ${fail} failed` : `PASS — ${pass} assertions live across ${PAGES.length} locales`);
  process.exit(fail ? 1 : 0);
})();
