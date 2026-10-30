#!/usr/bin/env node
/* =====================================================================
   live-verify-stamp-sheet.js — drives "Make and Count Squares" (The
   Stamp Sheet, #170) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): real taps on the rails (on a phone the first tap parks the
   wheel, the second runs it) make one line out of place → Check → a miss
   with misprints; a tap heals it, the true grid → the count step; the
   total on the keypad → solved. Every one of the 11 pages returns 200;
   the wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-stamp-sheet.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed (and are deleted after the row) */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '170-stamp-sheet'));
const ROW = H.row('fractions-activities.json', 'fractions.make-and-count-squares.2-g-a-2');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'stamp-sheet-activity.html', global: 'StampSheetActivity', ready: '.sts-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds stamp-sheet-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    /* 3 rows of 4 */
    await o.frame.evaluate(() => { const a = window.StampSheetActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.board = 'numbers'; a.api.settings.card = 'rowsOf'; a._pool = null; a._ensurePool(); a._start(4, 0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.StampSheetActivity.st)));
    const notch = async (axis, h) => {
      await o.frame.evaluate(() => document.querySelector('.sts-sheetsvg').scrollIntoView({ block: 'center' })); await H.wait(250);
      const p = await o.frame.evaluate((axis, h) => { const a = window.StampSheetActivity, g = a._g, b = document.querySelector('.sts-sheetsvg').getBoundingClientRect(); return { x: axis === 'col' ? b.left + g.R + h * g.u / 2 : b.left + g.R / 2, y: axis === 'col' ? b.top + g.R / 2 : b.top + g.R + h * g.u / 2, direct: g.u / 2 >= 44 }; }, axis, h);
      const off = await o.off(), before = (await S())[axis === 'col' ? 'colCuts' : 'rowCuts'].length;
      await o.page.mouse.click(off.x + p.x, off.y + p.y); await H.wait(150);
      if ((await S())[axis === 'col' ? 'colCuts' : 'rowCuts'].length === before && !p.direct) { await o.page.mouse.click(off.x + p.x, off.y + p.y); await H.wait(150); }
    };
    for (const h of [2, 5]) await notch('col', h);
    for (const h of [2, 4]) await notch('row', h);
    let s = await S(); is(s.colCuts.slice().sort().join() === '2,5' && s.rowCuts.slice().sort().join() === '2,4', tag + ' real taps on the rails made the lines (' + s.colCuts + ' / ' + s.rowCuts + ')');
    await o.click('check', tag); s = await S();
    is(s.misses === 1 && await o.frame.evaluate(() => document.querySelectorAll('.sts-sliced, .sts-bordered').length > 0), tag + ' one line out of place → a miss, misprints on the sheet');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await o.click('perf-col-5', tag); for (const h of [4, 6]) await notch('col', h);
    await o.click('check', tag); s = await S();
    is(s.step === 'count', tag + ' the true grid → the count step');
    await o.click('key-1', tag); await o.click('key-2', tag); await o.click('check', tag); s = await S();
    is(s.done, tag + ' 12 on the keypad → solved');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-stamp-sheet'));
})().catch((e) => { console.error(e); process.exit(1); });
