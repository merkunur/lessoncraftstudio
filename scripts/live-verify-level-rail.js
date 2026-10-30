#!/usr/bin/env node
/* =====================================================================
   live-verify-level-rail.js — drives "Pip's Stacking Fence" (The Level
   Rail, #168) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): a "how many more" round — the rail laid on the shorter picket by
   the keyboard and the slider raised to its top → level; a wrong dial by
   real taps → a miss; the right dial → solved; then a build round —
   every picket raised by the keyboard → solved. Every one of the 11
   pages returns 200; the wrapper version is page.tsx's; the iframe grows
   with the card.
   Usage: node scripts/live-verify-level-rail.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/level-rail-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '168-level-rail'));
const ROW = H.row('graph-it-activities.json', 'graph-it.bar-graph.2-md-d-10');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'level-rail-activity.html', global: 'LevelRailActivity', ready: '.lr-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds level-rail-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.LevelRailActivity._picsReady, { timeout: 30000 });
    const start = (level, k) => o.frame.evaluate((level, k) => { const a = window.LevelRailActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = level; a.api.settings.rail = 'show'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, level, k);
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.LevelRailActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { const sel = '[data-k="' + k + '"]'; await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(150); };
    const keys = async (k, key, n) => { await o.frame.focus('[data-k="' + k + '"]'); for (let i = 0; i < n; i++) await o.page.keyboard.press(key); await H.wait(100); };
    /* how many more leaves than raspberries: raspberries 4 */
    await start('read', 0);
    let s = await S(), guard = 0;
    while (s.rail.on !== 'raspberry' && guard++ < 6) { await keys('foot', 'ArrowRight', 1); s = await S(); }
    await keys('slider', 'ArrowUp', 4); s = await S();
    is(s.rail.on === 'raspberry' && C.isLevel(s), `${tag} the rail laid on the raspberries and raised to 4 → level`);
    for (let i = 0; i < 3; i++) await tap('dial-o-up');
    await tap('check'); s = await S();
    is(s.misses === 1, `${tag} a wrong dial (3) by real taps → a miss`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap('dial-o-down'); await tap('check'); s = await S();
    is(s.done, `${tag} the right dial (2) → solved`);
    /* a build round by the keyboard */
    await start('build', 0); s = await S();
    for (const c of s.cats) await keys('picket-' + c, 'ArrowUp', s.round.data[c]);
    await tap('check'); s = await S();
    is(s.done, `${tag} every picket raised to the tally → solved`);
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-level-rail'));
})().catch((e) => { console.error(e); process.exit(1); });
