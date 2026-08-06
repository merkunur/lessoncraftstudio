#!/usr/bin/env node
/* =====================================================================
   audit-game-mobile.js — phone/tablet layout gate for GAMES
   ---------------------------------------------------------------------
   The games analogue of audit-activity-mobile.js (CLAUDE.md §A.13.55).
   Games render inside an iframe with a card that clips horizontal
   overflow, so any over-wide content is cut off on small screens. This
   mounts each game (embed mode) at phone→tablet widths in the local
   harness and HARD-fails on horizontal overflow or off-screen controls.

   USAGE:
     node scripts/games/audit-game-mobile.js
     node scripts/games/audit-game-mobile.js --widths=280,320,360,412,768
   ===================================================================== */
'use strict';
const path = require('path');
const { pathToFileURL } = require('url');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const WIDTHS = arg('widths', '280,320,360,412,768').split(',').map(n => parseInt(n, 10));
const LOCALES = arg('locales', 'en').split(',');
const HARNESS = pathToFileURL(path.join(__dirname, '..', '..', 'mini tools', 'game-preview.html')).href;

(async () => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(HARNESS, { waitUntil: 'load', timeout: 30000 });
  await page.waitForFunction(() => window.__PREVIEW_GAMES__ && window.__PREVIEW_GAMES__.length, { timeout: 10000 });
  const gameIds = await page.evaluate(() => window.__PREVIEW_GAMES__.map(g => g.id));

  console.log('=== GAME mobile layout gate (local harness) — widths ' + WIDTHS.join(',') + ' ===');
  const fails = [];

  for (let gi = 0; gi < gameIds.length; gi++) {
    for (const loc of LOCALES) {
      for (const w of WIDTHS) {
        const label = gameIds[gi] + ' @' + loc + ' @' + w + 'px';
        try {
          await page.setViewport({ width: w, height: 900 });
          // mount the game alone in a clean full-width body (embed mode) at this width
          const r = await page.evaluate(async (gi, loc) => {
            document.body.innerHTML = '<div id="g" style="width:100%"></div>';
            window.GameShell.mount(window.__PREVIEW_GAMES__[gi], { mount: '#g', lang: loc, embed: true });
            await new Promise(res => setTimeout(res, 120));
            const vw = document.documentElement.clientWidth;
            const card = document.querySelector('.lcs-game');
            const out = { vw, cardOverflow: 0, pageScroll: 0, offscreen: 0, controls: 0, tapTooSmall: 0 };
            if (card) out.cardOverflow = Math.max(0, card.scrollWidth - card.clientWidth);
            out.pageScroll = Math.max(0, document.documentElement.scrollWidth - vw);
            // any interactive control extending past the viewport, or below 36px tap target
            const ctrls = document.querySelectorAll('.lcs-game button, .lcs-game [role="button"]');
            out.controls = ctrls.length;
            ctrls.forEach(el => {
              const b = el.getBoundingClientRect();
              if (b.right > vw + 1 || b.left < -1) out.offscreen++;
              if (b.width > 0 && (b.width < 36 || b.height < 36)) out.tapTooSmall++;
            });
            return out;
          }, gi, loc);

          const probs = [];
          if (r.cardOverflow > 2) probs.push('card overflows by ' + r.cardOverflow + 'px');
          if (r.pageScroll > 2) probs.push('horizontal page scroll ' + r.pageScroll + 'px');
          if (r.offscreen > 0) probs.push(r.offscreen + ' control(s) off-screen');
          if (r.controls < 1) probs.push('no controls rendered');
          if (probs.length) { fails.push(label + ': ' + probs.join('; ')); console.log('  FAIL ' + label + ' — ' + probs.join('; ')); }
          else console.log('  ok   ' + label + (r.tapTooSmall ? '  (WARN ' + r.tapTooSmall + ' tap target<36px)' : ''));
        } catch (e) {
          fails.push(label + ': ' + e.message); console.log('  FAIL ' + label + ' — ' + e.message);
        }
      }
    }
  }
  await browser.close();

  console.log('');
  if (fails.length) { console.error('GAME MOBILE GATE FAILED — ' + fails.length + ' failure(s).'); process.exit(1); }
  console.log('GAME MOBILE GATE PASSED — no overflow/clip/off-screen controls 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
