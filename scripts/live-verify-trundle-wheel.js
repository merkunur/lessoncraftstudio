#!/usr/bin/env node
/* =====================================================================
   live-verify-trundle-wheel.js — drives "Sort Shapes by Sides" (The
   Trundle Wheel, #169) ON PRODUCTION in en, de, sv and fi (desktop 1366
   + phone 390): a sides-crates round — a shape tapped onto the lane and
   rolled round by taps until its ticket comes home; every shape sorted by
   tap-then-tap with one in the wrong crate → a miss, it comes home; then
   the right crate → solved. Every one of the 11 pages returns 200; the
   wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-trundle-wheel.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/trundle-wheel-core.js');
/* screenshots go outside the repo: they are never committed (and are deleted after the row) */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '169-trundle-wheel'));
const ROW = H.row('sort-bins-activities.json', 'sort-bins.sort-by-sides.2-g-a-1');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'trundle-wheel-activity.html', global: 'TrundleWheelActivity', ready: '.tw-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds trundle-wheel-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.TrundleWheelActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.board = 'sides'; a.api.settings.crates = 'both'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.TrundleWheelActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { const sel = '[data-k="' + k + '"]'; await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(150); };
    let s = await S(); const it0 = s.items[0], n0 = C.infoOf(it0).n;
    await tap('shape-' + it0.key); await tap('lane');
    s = await S(); is(s.docked === it0.key, `${tag} tap a shape, tap the lane: it is docked`);
    for (let k = 0; k < n0; k++) await tap('lane');
    s = await S(); const t0 = s.items.find((x) => x.key === it0.key);
    is(s.docked == null && t0.ticket && t0.ticket.dashes.length === n0, `${tag} rolled round by taps: a ticket of ${n0} dashes`);
    const placeOf = (it) => String(C.placeFor('sides', C.infoOf(it))), w0 = s.items[1], other = s.crates.find((c) => String(c) !== placeOf(w0));
    for (const it of s.items) { await tap('shape-' + it.key); await tap('place-' + (it.key === w0.key ? other : placeOf(it))); }
    await tap('check'); await o.frame.waitForFunction(() => !window.TrundleWheelActivity._view.anim, { timeout: 10000 }); s = await S();
    is(s.misses === 1 && s.items.find((x) => x.key === w0.key).place == null, `${tag} one shape in the wrong crate → a miss, it comes home`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap('shape-' + w0.key); await tap('place-' + placeOf(w0)); await tap('check'); s = await S();
    is(s.done, `${tag} the right crate → solved`);
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-trundle-wheel'));
})().catch((e) => { console.error(e); process.exit(1); });
