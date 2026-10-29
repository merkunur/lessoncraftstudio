#!/usr/bin/env node
/* =====================================================================
   live-verify-day-wheel.js — drives "Sprocket's Clock" (The Day Wheel,
   #158) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the breakfast card at 7:00 — a real drag winds the hour hand 210° to the
   first 7:00 (gold), one more lap to the second 7:00 (violet) → the lap
   miss; a real drag one lap back → solved, the picture seats on the wheel.
   Every one of the 11 pages returns 200 (sv, da, no and fi are new pages);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-day-wheel.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '158-day-wheel'));
const ROW = H.row('clock-ampm-activities.json', 'clock-ampm.morning-or-night.2-md-c-7');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'day-wheel-activity.html', global: 'DayWheelActivity', ready: '.dw-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds day-wheel-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.DayWheelActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.DayWheelActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = '1'; a.api.settings.clue = 'what'; a._pool = null; a._ensurePool(); a._start(a._pool.findIndex((r) => r.key === 'breakfast')); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.DayWheelActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const into = async (sel) => { await o.frame.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await settle(); };
    const tap = async (k) => { await into('[data-k="' + k + '"]'); const e = await o.xy('[data-k="' + k + '"]'), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(90); };
    /* a real drag round the face from angle a0 by deg (negative = back) */
    const wind = async (a0, deg) => {
      await into('.dw-clock');
      const b = await o.frame.evaluate(() => { const r = document.querySelector('.dw-clock').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width }; }), off = await o.off();
      const cx = off.x + b.x + b.w / 2, cy = off.y + b.y + b.w / 2, r = b.w * 0.3, at = (a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
      let p = at(a0); await o.page.mouse.move(p[0], p[1]); await o.page.mouse.down();
      const n = Math.max(4, Math.ceil(Math.abs(deg) / 6));
      for (let i = 1; i <= n; i++) { p = at(a0 + deg * i / n); await o.page.mouse.move(p[0], p[1]); }
      await o.page.mouse.up(); await H.wait(120);
    };
    await wind(0, 210); let s = await S();
    is(s.minutes === 420, `${tag} a real drag of 210° → the first 7:00 (${s.minutes})`);
    await wind(210, 360); await tap('check'); s = await S();
    is(s.minutes === 1140 && s.verdict && s.verdict.kind === 'lap', `${tag} one more lap → the same face in the violet lap: the lap miss (${s.minutes})`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-lap.png`) });
    await wind(210, -360); await tap('check'); s = await S();
    is(s.done && (await o.frame.evaluate(() => document.querySelectorAll('[data-seat]').length)) === 1, `${tag} one lap back → solved, the picture seats on the wheel`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-day-wheel'));
})().catch((e) => { console.error(e); process.exit(1); });
