#!/usr/bin/env node
/* =====================================================================
   live-verify-tide-plot.js — drives "Read a Line Plot" (Shelly's Tide-Line,
   The Tide You Push, #167) ON PRODUCTION in en, de, sv and fi (desktop 1366
   + phone 390): a "longer than 4 cm" round — the left wave pushed in over
   the 2s–4s by the keyboard, a wrong pebble by a real tap → "count the dry
   shells"; the right pebble → solved; then a measuring round — each shell
   slid to the stop and dropped (Home, Enter) → solved. Every one of the 11
   pages returns 200; the wrapper version is page.tsx's; the iframe grows
   with the card.
   Usage: node scripts/live-verify-tide-plot.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '167-tide-plot'));
const ROW = H.row('line-plot-activities.json', 'line-plot.read.2-md-d-9');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'tide-plot-activity.html', global: 'TidePlotActivity', ready: '.tp-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds tide-plot-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.TidePlotActivity._picsReady, { timeout: 30000 });
    const start = (level, k) => o.frame.evaluate((level, k) => { const a = window.TidePlotActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = level; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, level, k);
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.TidePlotActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { const sel = '[data-k="' + k + '"]'; await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(150); };
    const keys = async (k, key, n) => { await o.frame.focus('[data-k="' + k + '"]'); for (let i = 0; i < n; i++) await o.page.keyboard.press(key); await H.wait(100); };
    /* longer than 4 cm */
    await start('read', 2);
    await keys('shore-L', 'ArrowRight', 4);
    let s = await S();
    is(s.tide.L === 4, `${tag} the left wave pushed in over the 2s, 3s and 4s`);
    await tap('pebble-4'); await tap('check'); s = await S();
    is(s.misses === 1 && s.verdict && s.verdict.why === 'answer', `${tag} the right tide, a wrong pebble → a miss on the answer`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap('pebble-5'); await tap('check'); s = await S();
    is(s.done, `${tag} the right pebble → solved`);
    /* a measuring round */
    await start('measure', 0);
    s = await S();
    for (let j = 0; j < s.shells.length; j++) await keys('shell', 'Home', 1), await keys('shell', 'Enter', 1);
    s = await S();
    is(s.shells.every((x) => x.col === x.len), `${tag} every shell slid to the stop and dropped on its length`);
    await tap('check'); s = await S();
    is(s.done, `${tag} measuring round → solved`);
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-tide-plot'));
})().catch((e) => { console.error(e); process.exit(1); });
