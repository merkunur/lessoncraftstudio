#!/usr/bin/env node
/* =====================================================================
   live-verify-hour-ball.js — drives "Sprocket's Clock — Match Analog
   and Digital" (The Hour Ball, #162) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): Level 1 "9:45" — a real tap on 10:45 →
   Check: the cup opens on ball 9, ball 10 still waits at the top; a real
   tap on 9:45 → solved, and the clock runs on: ball 10 drops.
   Every one of the 11 pages returns 200 (de, es, pt, it, nl, sv, da, no
   and fi are new pages); the wrapper version is page.tsx's; the iframe
   grows with the card.
   Usage: node scripts/live-verify-hour-ball.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '161-hour-ball'));
const ROW = H.row('clock-digital-activities.json', 'clock-digital.read-quarter-hour.2-md-c-7');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'hour-ball-activity.html', global: 'HourBallActivity', ready: '.hb-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds hour-ball-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.HourBallActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.HourBallActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = '1'; a.api.settings.tray = 'show'; a._pool = null; a._ensurePool(); a._start(1); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.HourBallActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tapSel = async (sel) => { await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(120); };
    const card = async (h, m) => { const i = (await S()).round.cards.findIndex((c) => c.h === h && c.m === m); await tapSel('.hb-card[data-card="' + i + '"]'); };
    await card(10, 45); let s = await S();
    is(s.posted !== null && s.round.cards[s.posted].h === 10, `${tag} a real tap posts 10:45`);
    await tapSel('[data-k="check"]'); s = await S();
    const look = await o.frame.evaluate(() => ({ cup: (document.querySelector('[data-cup]') || { getAttribute: () => null }).getAttribute('data-cup'), wait: (document.querySelector('[data-waiting]') || { getAttribute: () => null }).getAttribute('data-waiting') }));
    is(s.misses === 1 && look.cup === '9' && look.wait === '10', `${tag} Check: the cup opens on ball 9, ball 10 still waits at the top (${look.cup}, ${look.wait})`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-later.png`) });
    await card(9, 45); await tapSel('[data-k="check"]'); await H.wait(300); s = await S();
    const cup2 = await o.frame.evaluate(() => (document.querySelector('[data-cup]') || { getAttribute: () => null }).getAttribute('data-cup'));
    is(s.done && cup2 === '10', `${tag} 9:45 → solved; the clock runs on and ball 10 drops (${cup2})`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-hour-ball'));
})().catch((e) => { console.error(e); process.exit(1); });
