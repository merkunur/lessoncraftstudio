#!/usr/bin/env node
/* =====================================================================
   live-verify-minute-train.js — drives "Sprocket's Clock — Match Analog
   and Digital" (The Minute Train, #161) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): Level 2 "4:55" — eleven real taps send the
   train to the long hand; 5:55 written by real taps → the lap: one pale
   carriage finishes the ring; 4:55 → solved.
   Every one of the 11 pages returns 200 (de, es, pt, it, nl, sv, da, no
   and fi are new pages); the wrapper version is page.tsx's; the iframe
   grows with the card.
   Usage: node scripts/live-verify-minute-train.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '161-minute-train'));
const ROW = H.row('clock-digital-activities.json', 'clock-digital.read-five-minute.2-md-c-7');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'minute-train-activity.html', global: 'MinuteTrainActivity', ready: '.mt-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds minute-train-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.MinuteTrainActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.MinuteTrainActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = '2'; a.api.settings.roof = 'shown'; a._pool = null; a._ensurePool(); a._start(7); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.MinuteTrainActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { await o.frame.evaluate((k) => document.querySelector('[data-k="' + k + '"]').scrollIntoView({ block: 'center' }), k); await settle(); const e = await o.xy('[data-k="' + k + '"]'), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(90); };
    const write = async (hh, mm) => { await tap('box-h'); while ((await S()).h || (await S()).m) { await tap((await S()).m ? 'box-m' : 'box-h'); await tap('back'); } await tap('box-h'); for (const d of hh) await tap('key-' + d); await tap('box-m'); for (const d of mm) await tap('key-' + d); };
    for (let i = 0; i < 11; i++) await tap('add');
    let s = await S();
    is(s.cars === 11 && (await o.frame.evaluate(() => { const c = document.querySelectorAll('.mt-car'); return c[c.length - 1].textContent; })) === '55', `${tag} eleven real taps: the train reaches the long hand, the last roof says 55 (${s.cars})`);
    await write('5', '55'); await tap('check'); s = await S();
    const lap = await o.frame.evaluate(() => document.querySelectorAll('.mt-car.is-lap').length);
    is(s.verdict && s.verdict.kind === 'nextHour' && lap === 1, `${tag} 5:55 → the lap: one pale carriage finishes the ring (${s.verdict && s.verdict.kind}, ${lap})`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-lap.png`) });
    await write('4', '55'); await tap('check'); s = await S();
    is(s.done, `${tag} 4:55 → solved`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-minute-train'));
})().catch((e) => { console.error(e); process.exit(1); });
