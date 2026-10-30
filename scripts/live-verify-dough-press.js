#!/usr/bin/env node
/* =====================================================================
   live-verify-dough-press.js — drives "Same Size, Different Shape" (The
   Dough Press, #171) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): the fourths round — a real tap on the uneven fourths, Check
   → a miss with a coral rim and a pale gap on the tray; a real tap on the
   mixed fourths, Check → every patty fits, solved. Every one of the 11
   pages returns 200; the wrapper version is page.tsx's; the iframe grows
   with the card.
   Usage: node scripts/live-verify-dough-press.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed (and are deleted after the row) */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '171-dough-press'));
const ROW = H.row('choice-board-activities.json', 'choice-board.fraction-noncongruent.2-g-a-3');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'dough-press-activity.html', global: 'DoughPressActivity', ready: '.dp-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds dough-press-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    /* the fourths round: the model cut into four squares, the mixed fourths is the ✓ */
    await o.frame.evaluate(() => { const a = window.DoughPressActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.board = 'match'; a.api.settings.read = 'words'; a._pool = null; a._ensurePool(); a._start(12, 0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.DoughPressActivity.st)));
    let s = await S();
    const idx = (fig) => s.tiles.findIndex((t) => t.fig === fig);
    await o.click('tile-' + idx('sq-fourths-uneq'), tag); await o.click('check', tag); s = await S();
    is(s.misses === 1 && await o.frame.evaluate(() => document.querySelectorAll('.dp-over').length > 0 && document.querySelectorAll('.dp-gap').length > 0), tag + ' the uneven fourths → a miss: a coral rim and a pale gap on the tray');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await o.click('tile-' + idx('sq-fourths-mixed'), tag); await o.click('check', tag); s = await S();
    is(s.done && await o.frame.evaluate(() => document.querySelectorAll('.dp-fit').length === 4), tag + ' the mixed fourths → four patties fit exactly, solved');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-dough-press'));
})().catch((e) => { console.error(e); process.exit(1); });
