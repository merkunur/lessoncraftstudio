#!/usr/bin/env node
/* =====================================================================
   live-verify-say-it-slot.js — drives "Count Out the Money" (The Say-It
   Slot, #165) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): level 1 — a coin dropped with a wrong count by real wheel taps is
   spat back and the wheels roll back; then biggest-first by real taps
   (wheels, coin, slot) to the price → solved, the parade replays the
   child's count. Every one of the 11 pages returns 200; the wrapper
   version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-say-it-slot.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '165-say-it-slot'));
const ROW = H.row('money-activities.json', 'money.count-out.2-md-c-8');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'say-it-slot-activity.html', global: 'SayItSlotActivity', ready: '.si-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds say-it-slot-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.SayItSlotActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.SayItSlotActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = '1'; a.api.settings.coins = 'purse'; a._pool = null; a._ensurePool(); a._start(3); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.SayItSlotActivity.st)));
    const idle = () => o.frame.waitForFunction(() => { const a = window.SayItSlotActivity; return a.st.done || !a._timers.length; }, { timeout: 5000 }).catch(() => {});
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { await idle(); const sel = '[data-k="' + k + '"]'; await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(150); };
    const turnTo = async (n) => { for (let g = 0; g < 40; g++) { const s = await S(), d = n - s.counter; if (!d) return; await tap((d > 0 ? 'up-' : 'down-') + (Math.abs(d) >= 10 ? 1 : 0)); } };
    let s = await S(); const r = s.round;
    const big = s.coins.filter((c) => c.at === 'cloth' && c.v <= r.price).sort((a, b) => b.v - a.v)[0];
    const wrong = big.v + 1 <= r.price ? big.v + 1 : big.v - 1;
    await turnTo(wrong); await tap('coin-' + big.id); await tap('slot'); s = await S();
    is(s.missTotal === 1 && s.counter === 0 && s.box.length === 0, `${tag} a wrong count (${wrong}) by real taps: the ${big.v} is spat back, the wheels roll back`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-spit.png`) });
    for (let g = 0; g < 12 && !(await S()).done; g++) {
      s = await S(); const gap = r.price - s.counter;
      const c = s.coins.filter((x) => x.at === 'cloth' && x.v <= gap).sort((a, b) => b.v - a.v)[0]; if (!c) break;
      await turnTo(s.counter + c.v);
      /* after a spit the coin is still held: tapping it again would put it down */
      if (await o.frame.evaluate(() => window.SayItSlotActivity._view.sel) !== c.id) await tap('coin-' + c.id);
      await tap('slot');
    }
    s = await S();
    is(s.done && s.counter === r.price, `${tag} biggest-first by real taps → exactly ${r.price}, solved`);
    is(await o.frame.evaluate(() => { const p = document.querySelector('.si-parade'); return p ? p.getAttribute('data-chain') : ''; }) === s.said.join(','), `${tag} the parade replays the child's count ${s.said.join(', ')}`);
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-say-it-slot'));
})().catch((e) => { console.error(e); process.exit(1); });
