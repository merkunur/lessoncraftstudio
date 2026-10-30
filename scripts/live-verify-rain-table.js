#!/usr/bin/env node
/* =====================================================================
   live-verify-rain-table.js — drives "Make Thirds" (The Rain Table, #172)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the
   square thirds round — a real tap on the middle notch, Check → a count
   miss (two tubes over, one dry); the wall lifted, real taps on the 4/12
   and 8/12 notches, Check → every tube at the gold line, solved. Every one
   of the 11 pages returns 200; the wrapper version is page.tsx's; the
   iframe grows with the card.
   Usage: node scripts/live-verify-rain-table.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed (and are deleted after the row) */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '172-rain-table'));
const ROW = H.row('fractions-activities.json', 'fractions.partition-thirds.2-g-a-3');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'rain-table-activity.html', global: 'RainTableActivity', ready: '.rt-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds rain-table-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    /* the square thirds round (notches only) */
    await o.frame.evaluate(() => { const a = window.RainTableActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.parts = '3'; a.api.settings.colour = 'off'; a._pool = null; a._ensurePool(); a._start(3, 0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.RainTableActivity.st)));
    const tubes = () => o.frame.evaluate(() => Array.from(document.querySelectorAll('.rt-tube')).map((t) => t.getAttribute('data-state')).join(','));
    await o.click('w-top:6', tag); await o.click('check', tag); let s = await S();
    is(s.misses === 1 && await tubes() === 'over,over,dry', tag + ' halves for thirds → a miss: two tubes over, one dry (' + await tubes() + ')');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await o.click('w-top:6', tag); await o.click('w-top:4', tag); await o.click('w-top:8', tag); await o.click('check', tag); s = await S();
    is(s.done && await tubes() === 'at,at,at', tag + ' walls at 4/12 and 8/12 → every tube at the gold line, solved');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-rain-table'));
})().catch((e) => { console.error(e); process.exit(1); });
