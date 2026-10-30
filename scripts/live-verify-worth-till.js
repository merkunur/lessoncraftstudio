#!/usr/bin/env node
/* =====================================================================
   live-verify-worth-till.js — drives "Pip's Market Stall" (The Worth Till,
   #164) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   level 1 — a real drag of the biggest coin into a wrong cup bounces it
   back; real taps sort every coin; the dial set by real taps to the total
   → solved. Every one of the 11 pages returns 200 (sv, da, no, fi new);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-worth-till.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/worth-till-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '164-worth-till'));
const ROW = H.row('coin-stall-activities.json', 'coin-stall.money.2-md-c-8');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'worth-till-activity.html', global: 'WorthTillActivity', ready: '.wt-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`, fam = C.famOf(loc);
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds worth-till-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.WorthTillActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.WorthTillActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = '1'; a._pool = null; a._ensurePool(); a._start(5); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.WorthTillActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tapSel = async (sel) => { await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(120); };
    const drag = async (id, cup) => {
      await o.frame.evaluate((id) => document.querySelector('[data-k="coin-' + id + '"]').scrollIntoView({ block: 'center' }), id); await settle();
      const a = await o.xy('[data-k="coin-' + id + '"]'), b = await o.xy('[data-k="cup-' + cup + '"]'), off = await o.off();
      await o.page.mouse.move(off.x + a.x, off.y + a.y); await o.page.mouse.down();
      await o.page.mouse.move(off.x + (a.x + b.x) / 2, off.y + (a.y + b.y) / 2, { steps: 6 }); await o.page.mouse.move(off.x + b.x, off.y + b.y, { steps: 6 }); await o.page.mouse.up(); await H.wait(150);
    };
    let s = await S(); const r = s.round, cups = C.cups(fam), big = Math.max(...r.coins), wrong = cups.find((v) => v !== big);
    const id0 = s.coins.find((c) => c.v === big).id;
    await drag(id0, wrong); s = await S();
    is(s.coins.find((c) => c.id === id0).at === 'counter' && s.bounces[id0] === 1, `${tag} a real drag of the ${big} into the ${wrong} cup bounces back`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-bounce.png`) });
    for (const c of s.coins) { await tapSel('[data-k="coin-' + c.id + '"]'); await tapSel('[data-k="cup-' + c.v + '"]'); }
    s = await S();
    is(s.coins.every((c) => c.at === 'till'), `${tag} every coin sorted into its cup by real taps`);
    for (const wh of ['t', 'o']) { const want = wh === 't' ? Math.floor(r.total / 10) : r.total % 10; for (let i = 0; i < want; i++) await tapSel('[data-k="up-' + wh + '"]'); }
    await tapSel('[data-k="check"]'); await H.wait(300); s = await S();
    is(s.done, `${tag} the dial set to ${r.total} by real taps → solved`);
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-worth-till'));
})().catch((e) => { console.error(e); process.exit(1); });
