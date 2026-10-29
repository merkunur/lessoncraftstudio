#!/usr/bin/env node
/* =====================================================================
   live-verify-drive-cables.js — drives "Sprocket's Clock — Match Analog
   and Digital" (The Drive Cables, #160) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): Level 2 "12:45 · 9:10 · 5:35" — real taps
   plug 12:45 into the 1:45 lure and the others right → Check: the lure
   clock carries 12:45's dashed hands, two lamps lit; a double tap pulls
   12:45 out, real taps plug it right → solved, three lamps.
   Every one of the 11 pages returns 200 (de, es, pt, it, nl, sv, da, no
   and fi are new pages); the wrapper version is page.tsx's; the iframe
   grows with the card.
   Usage: node scripts/live-verify-drive-cables.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '160-drive-cables'));
const ROW = H.row('clock-digital-activities.json', 'clock-digital.match-clocks.2-md-c-7');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'drive-cables-activity.html', global: 'DriveCablesActivity', ready: '.dc-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds drive-cables-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.DriveCablesActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.DriveCablesActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = '2'; a.api.settings.nums = 'all'; a._pool = null; a._ensurePool(); a._start(7); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.DriveCablesActivity.st)));
    const lay = (await S()).round.layout, at = (c) => lay.indexOf(c), lure = lay.indexOf('L');
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { await o.frame.evaluate((k) => document.querySelector('[data-k="' + k + '"]').scrollIntoView({ block: 'center' }), k); await settle(); const e = await o.xy('[data-k="' + k + '"]'), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(90); };
    const plug = async (c, s) => { await tap('card-' + c); await tap('clock-' + s); };
    await plug(0, lure); await plug(1, at(1)); await plug(2, at(2)); let s = await S();
    is(s.plugs.join() === [lure, at(1), at(2)].join(), `${tag} real taps plug the three cards (${s.plugs.join()})`);
    await tap('check'); s = await S();
    const look = await o.frame.evaluate((l) => ({ ghost: (document.querySelector('[data-k="clock-' + l + '"] .dc-ghost') || { getAttribute: () => null }).getAttribute('data-ghost'), lamps: document.querySelectorAll('.dc-lamp.is-on').length }), lure);
    is(s.misses === 1 && look.ghost === String(s.round.cards[0]) && look.lamps === 2, `${tag} Check: the lure clock carries 12:45's dashed hands, two lamps lit (${look.ghost}, ${look.lamps})`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap('card-0'); await tap('card-0'); s = await S();
    is(s.plugs[0] === null, `${tag} a double tap pulls 12:45 out`);
    await plug(0, at(0)); await tap('check'); s = await S();
    is(s.done && (await o.frame.evaluate(() => document.querySelectorAll('.dc-lamp.is-on').length)) === 3, `${tag} plugged right → solved, three lamps`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-drive-cables'));
})().catch((e) => { console.error(e); process.exit(1); });
