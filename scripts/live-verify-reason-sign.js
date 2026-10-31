#!/usr/bin/env node
/* =====================================================================
   live-verify-reason-sign.js — drives "Pearl's Opinion Page" (#175, The
   Sign That Stands on Its Reasons) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): Level 1, the park sign — a real tap on the
   restatement card and on the tide (a miss: a copy of the sign, soaked); a
   real tap on the copy brings it back; the reason card and the tide → the
   sign lifts, dry, solved. Page statuses use plain HTTPS with the QA header
   (Super Bot Fight Mode answers bare node requests with 403); the wrapper
   version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-reason-sign.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), https = require('https');
const H = require('./lib/activity-harness');
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '175-reason-sign'));
const ROW = H.row('pearl-opinion-page-activities.json', 'pearl-opinion-page.back-it-up.ri-2-8');
const WRAPPER = H.WRAPPER();
const status = (url) => new Promise((res) => { https.get(url, { headers: Object.assign({ 'User-Agent': 'Mozilla/5.0 Chrome/130' }, require('./lib/qa-header').headers()) }, (r) => { r.resume(); res(r.statusCode); }).on('error', () => res(0)); });
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'pearl-opinion-page-activity.html', global: 'PearlOpinionPageActivity', ready: '.ps-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds pearl-opinion-page-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.PearlOpinionPageActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'one'; a.api.settings.bridge = 'off'; a._start(0, 0, 0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.PearlOpinionPageActivity.st)));
    const count = (sel) => o.frame.evaluate((s) => document.querySelectorAll(s).length, sel);
    let s = await S();
    const cs = s.round.cards.find((c) => c.role === 'restate'), cr = s.round.cards.find((c) => c.role === 'reason');
    await o.click('card-' + cs.id, tag); await o.click('tide', tag); s = await S();
    is(s.misses === 1 && !s.done && await count('.ps-board.is-copy') === 1 && await count('.ps-site.is-wet') === 1, tag + ' the restatement: a copy of the sign on top, soaked');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await o.click('sock-0', tag);
    is(await count('.ps-board.is-copy') === 0, tag + ' the copy tapped back to the tray');
    await o.click('card-' + cr.id, tag); await o.click('tide', tag); s = await S();
    is(s.done && await count('.ps-site.is-up') === 1 && await count('.ps-plank.is-post') === 1, tag + ' the reason: the sign stands dry on its post, solved');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-reason-sign'));
})().catch((e) => { console.error(e); process.exit(1); });
