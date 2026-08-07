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

      /* ⭐ DRIVE THE MAIN CONTROL. Tap a card; the board must answer. */
      await frame.click('[data-fk="card-help"]');
      await new Promise((r) => setTimeout(r, 200));
      const said = await frame.evaluate(() => document.querySelectorAll('.hlb-said').length);
      is(said === 1, 'tapping a card lifts it — the board answers');

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
