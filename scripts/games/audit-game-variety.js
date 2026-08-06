#!/usr/bin/env node
/* =====================================================================
   audit-game-variety.js — the variety + stub-playable gate for GAMES
   ---------------------------------------------------------------------
   The games analogue of audit-activity-variety.js (CLAUDE.md §A.13.60).
   Everything in the games program stays LOCAL until all ~300 games are
   ready, so this probes the local double-click harness (file://), not a
   deployed route.

   Per game it asserts (HARD gate, exit 1 on any failure):
     1. round pool ≥ 7 distinct rounds
     2. the per-mount order is a PERMUTATION of the pool (no drop/dupe)
     3. a fresh reshuffle differs from it (order-only; same set) — the
        "child never gets the same sequence twice" rule
     4. STUB-PLAYABLE: the stage renders interactive controls AND solving
        a round advances the non-numeric progress vessel (the win→advance
        wiring works with ZERO art — the "asset-stubbed FIRST" rule)

   USAGE:
     node scripts/games/audit-game-variety.js
     node scripts/games/audit-game-variety.js --min=7 --locales=en
   ===================================================================== */
'use strict';
const path = require('path');
const { pathToFileURL } = require('url');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const MIN = parseInt(arg('min', '7'), 10);
const LOCALES = arg('locales', 'en').split(',');
const HARNESS = pathToFileURL(path.join(__dirname, '..', '..', 'mini tools', 'game-preview.html')).href;

function isPermutation(a, n) {
  if (a.length !== n) return false;
  const seen = new Set(a);
  if (seen.size !== n) return false;
  for (let i = 0; i < n; i++) if (!seen.has(i)) return false;
  return true;
}

(async () => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 1000 });
  await page.goto(HARNESS, { waitUntil: 'load', timeout: 30000 });
  await page.waitForFunction(() => window.__PREVIEW_GAMES__ && window.__PREVIEW_GAMES__.length, { timeout: 10000 });

  const gameIds = await page.evaluate(() => window.__PREVIEW_GAMES__.map(g => g.id));
  console.log('=== GAME variety + stub-playable gate (local harness) — ' + gameIds.length + ' game(s), ≥' + MIN + ' rounds ===');

  const fails = [];
  for (let gi = 0; gi < gameIds.length; gi++) {
    for (const loc of LOCALES) {
      const label = gameIds[gi] + ' @' + loc;
      try {
        const res = await page.evaluate(async (gi, loc) => {
          const game = window.__PREVIEW_GAMES__[gi];
          window.GameShell.mount(game, { mount: '#lcs-root', lang: loc });
          const gs = window.__GAME_SHELL__;
          const order = gs.order.slice();
          // reshuffle: differs + same set (retry up to 4× to dodge a coincidental equal)
          let resh = gs.reshuffle(), tries = 1;
          while (resh.join(',') === order.join(',') && tries < 4) { resh = gs.reshuffle(); tries++; }
          // re-load round 0 then solve it; vessel should advance by one
          gs.loadRound(0);
          await new Promise(r => setTimeout(r, 60));
          const buttonsBefore = gs.stageButtons();
          const pipsBefore = gs.filledPips();
          gs.solveRound();
          await new Promise(r => setTimeout(r, 80));
          const pipsAfter = gs.filledPips();
          return {
            poolLen: gs.pool.length,
            order, resh,
            buttons: buttonsBefore,
            pipsBefore, pipsAfter
          };
        }, gi, loc);

        const probs = [];
        if (res.poolLen < MIN) probs.push('only ' + res.poolLen + ' rounds (<' + MIN + ')');
        if (!isPermutation(res.order, res.poolLen)) probs.push('mount order is not a clean permutation');
        if (!isPermutation(res.resh, res.poolLen)) probs.push('reshuffle is not a clean permutation');
        if (res.resh.join(',') === res.order.join(',')) probs.push('reshuffle did not change the order');
        if (res.buttons < 1) probs.push('no interactive controls in the stage (not playable on stubs)');
        if (res.pipsAfter <= res.pipsBefore) probs.push('solving a round did not advance the progress vessel');

        if (probs.length) { fails.push(label + ': ' + probs.join('; ')); console.log('  FAIL ' + label + ' — ' + probs.join('; ')); }
        else console.log('  ok   ' + label + ' — ' + res.poolLen + ' rounds, reshuffled, ' + res.buttons + ' controls, vessel advances on stubs');
      } catch (e) {
        fails.push(label + ': ' + e.message); console.log('  FAIL ' + label + ' — ' + e.message);
      }
    }
  }
  await browser.close();

  console.log('');
  if (fails.length) { console.error('GAME VARIETY GATE FAILED — ' + fails.length + ' failure(s).'); process.exit(1); }
  console.log('GAME VARIETY GATE PASSED — every game has ≥' + MIN + ' rounds, a working per-pass reshuffle, and is playable on stubs.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
