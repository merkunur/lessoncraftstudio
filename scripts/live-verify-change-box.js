#!/usr/bin/env node
/* =====================================================================
   live-verify-change-box.js — drives "Make Change with Coins" (The Change
   Box, #166) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   a change round — almost the whole pile given back by real taps → Pip
   comes up short (his count against the tag); a tray coin tapped back;
   then the right change by real taps → solved. Every one of the 11 pages
   returns 200; the wrapper version is page.tsx's; the iframe grows with
   the card.
   Usage: node scripts/live-verify-change-box.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/change-box-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '166-change-box'));
const ROW = H.row('money-activities.json', 'money.make-change.2-md-c-8');
const WRAPPER = H.WRAPPER();
const ways = (target, coins) => { const out = []; const n = coins.length; for (let m = 1; m < (1 << n); m++) { const p = []; for (let i = 0; i < n; i++) if (m & (1 << i)) p.push(coins[i]); if (p.reduce((a, b) => a + b, 0) === target) out.push(p); } return out.sort((a, b) => a.length - b.length); };
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'change-box-activity.html', global: 'ChangeBoxActivity', ready: '.cb-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds change-box-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.ChangeBoxActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.ChangeBoxActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.shop = 'change'; a.api.settings.count = 'check'; a._pool = null; a._ensurePool(); a._start(3, 0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.ChangeBoxActivity.st)));
    const idle = () => o.frame.waitForFunction(() => { const a = window.ChangeBoxActivity; return a.st.done || !a._timers.length; }, { timeout: 5000 }).catch(() => {});
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tap = async (k) => { await idle(); const sel = '[data-k="' + k + '"]'; await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(150); };
    let s = await S(); const r = s.round, small = Math.min(...r.pile);
    const give = s.coins.filter((c) => c.at === 'pile').sort((a, b) => b.v - a.v); give.splice(give.findIndex((c) => c.v === small), 1);
    for (const c of give) await tap('coin-' + c.id);
    await tap('check'); s = await S();
    is(s.misses === 1 && s.verdict && s.verdict.why === 'short', `${tag} almost all of it given back by real taps → Pip has only ${small}, short of ${r.price}`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-short.png`) });
    const back = s.coins.filter((c) => c.at === 'tray'); for (const c of back) await tap('coin-' + c.id);
    s = await S(); is(s.coins.every((c) => c.at === 'pile'), `${tag} tray coins tapped back to the pile`);
    for (const v of ways(C.change(r), r.pile)[0]) { s = await S(); const c = s.coins.find((x) => x.at === 'pile' && x.v === v); await tap('coin-' + c.id); }
    await tap('check'); s = await S();
    is(s.done, `${tag} the right change (${C.change(r)}) by real taps → Pip lands on ${r.price}, solved`);
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-change-box'));
})().catch((e) => { console.error(e); process.exit(1); });
