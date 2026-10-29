#!/usr/bin/env node
/* =====================================================================
   live-verify-spirit-bench.js — drives "Bram's Board Shop" (The Spirit
   Level, #156) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the 45 − 15 board — a real tap puts the 45 on the top rail, a real
   tap the 15 on the bottom rail; 60 typed (the keyword sum) and checked →
   the saw cuts a 60, the level leans; 30 → solved, the level straight.
   Every one of the 11 pages returns 200 (sv, da, no and fi are new pages);
   the wrapper version is page.tsx's; the iframe grows with the card.
   The script waits until the iframe offset holds still before tapping.
   Usage: node scripts/live-verify-spirit-bench.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/spirit-bench-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '156-spirit-bench'));
const ROW = H.row('bram-board-shop-activities.json', 'bram-board-shop.length-word-problems.2-md-b-5');
const { T } = H.strings('spirit-bench-activity.js', 'SpiritBenchActivity', { SpiritBenchCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'spirit-bench-activity.html', global: 'SpiritBenchActivity', ready: '.sb-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds spirit-bench-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.SpiritBenchActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.SpiritBenchActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.numbers = '80'; a.api.settings.ruler = 'shown'; a._pool = null; a._ensurePool(); a._start(3); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.SpiritBenchActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { await o.frame.evaluate((k) => document.querySelector('[data-k="' + k + '"]').scrollIntoView({ block: 'center' }), k); await settle(); const e = await o.xy('[data-k="' + k + '"]'), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(90); };
    const typeN = async (n) => { for (const d of String(n)) await tap('key-' + d); };
    await tap('board-2'); await tap('rail-top'); await tap('board-1'); await tap('rail-bottom');
    let s = await S();
    is(s.top === 2 && s.bottom.join() === '1', `${tag} real taps put the 45 on top and the 15 below (top ${s.top}, bottom ${s.bottom})`);
    await typeN(60); await tap('check');
    s = await S();
    const lvl = await o.frame.evaluate(() => { const e = document.querySelector('[data-level]'); return e && e.getAttribute('data-level'); }), cut = await o.frame.evaluate(() => { const e = document.querySelector('[data-cut]'); return e && e.getAttribute('data-cut'); });
    is(s.verdict && s.verdict.kind === 'number' && cut === '60' && lvl === 'bottom', `${tag} 60 → the saw cuts a 60, the level leans (${cut}, ${lvl})`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-missed.png`) });
    await tap('back'); await tap('back'); await typeN(30); await tap('check');
    s = await S();
    is(s.done && (await o.frame.evaluate(() => document.querySelector('[data-level]').getAttribute('data-level'))) === 'flat', `${tag} 30 → solved, the level straight`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-spirit-bench'));
})().catch((e) => { console.error(e); process.exit(1); });
