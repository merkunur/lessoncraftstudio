#!/usr/bin/env node
/* =====================================================================
   live-verify-second-ring.js — drives "Sprocket's Clock — 12-Hour &
   24-Hour" (The Second Ring, #159) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): the "3:00 p.m." card — real taps write
   17:00 → the run: the tag says 17 and the ring holds 13…17; real taps
   write 15:00 → solved, 15 stays in the ring.
   Every one of the 11 pages returns 200 (sv, da, no and fi are new pages);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-second-ring.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '159-second-ring'));
const ROW = H.row('clock-convert-activities.json', 'clock-convert.12-24.2-md-c-7');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'second-ring-activity.html', global: 'SecondRingActivity', ready: '.sr-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds second-ring-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.SecondRingActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.SecondRingActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = '1'; a.api.settings.ring = 'keep'; a._pool = null; a._ensurePool(); a._start(a._pool.findIndex((r) => r.h24 === 15)); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.SecondRingActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { await o.frame.evaluate((k) => document.querySelector('[data-k="' + k + '"]').scrollIntoView({ block: 'center' }), k); await settle(); const e = await o.xy('[data-k="' + k + '"]'), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(90); };
    const write = async (hh, mm) => { await tap('box-h'); for (const d of hh) await tap('key-' + d); await tap('box-m'); for (const d of mm) await tap('key-' + d); };
    await write('17', '00'); let s = await S();
    is(s.h === '17' && s.m === '00', `${tag} real taps write 17:00 (${s.h}:${s.m})`);
    await tap('check'); s = await S();
    const run = await o.frame.evaluate(() => ({ tag: (document.querySelector('.sr-tag') || {}).getAttribute ? document.querySelector('.sr-tag').getAttribute('data-tag') : null, toks: document.querySelectorAll('[data-token]').length }));
    is(s.verdict && s.verdict.kind === 'hour' && run.tag === '17' && run.toks === 5, `${tag} the run to 17: the tag says 17, the ring holds 13…17 (${run.tag}, ${run.toks})`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-run.png`) });
    for (let i = 0; i < 4; i++) await tap('back');
    await write('15', '00'); await tap('check'); s = await S();
    is(s.done && (await o.frame.evaluate(() => { const e = document.querySelector('[data-socket="15"]'); return e && e.getAttribute('data-token'); })) === '15', `${tag} 15:00 → solved, 15 stays in the ring`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-second-ring'));
})().catch((e) => { console.error(e); process.exit(1); });
