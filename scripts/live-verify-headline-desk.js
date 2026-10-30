#!/usr/bin/env node
/* =====================================================================
   live-verify-headline-desk.js — drives "Marina's Headline Desk" (The
   Stapler, #173) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): Level 1, the bees round — a real tap on the detail card, the
   stapler → one strip stapled, two blown onto the floor; a real tap on the
   topic, the stapler → every strip stapled, solved. Page statuses are
   checked with plain HTTP (a browser sweep of all 11 pages made the later
   plays lose the iframe, #172); the wrapper version is page.tsx's; the
   iframe grows with the card.
   Usage: node scripts/live-verify-headline-desk.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), https = require('https');
const H = require('./lib/activity-harness');
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '173-headline-desk'));
const ROW = H.row('marina-headline-desk-activities.json', 'marina-headline-desk.main-topic.ri-2-2');
const WRAPPER = H.WRAPPER();
const status = (url) => new Promise((res) => { https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/130' } }, (r) => { r.resume(); res(r.statusCode); }).on('error', () => res(0)); });
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'marina-headline-desk-activity.html', global: 'MarinaHeadlineDeskActivity', ready: '.hd-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds marina-headline-desk-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.MarinaHeadlineDeskActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'story'; a.api.settings.cards = '3'; a._pool = null; a._ensurePool(); a._start(0, 0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.MarinaHeadlineDeskActivity.st)));
    const count = (sel) => o.frame.evaluate((s) => document.querySelectorAll(s).length, sel);
    let s = await S();
    await o.click('card-' + s.cards.findIndex((c) => c.role === 'detail'), tag); await o.click('stapler', tag); s = await S();
    is(s.misses === 1 && await count('.hd-strip.is-stapled') === 1 && await count('.hd-crumple') === 2, tag + ' the detail → one strip stapled, two blown onto the floor');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await o.click('card-' + s.cards.findIndex((c) => c.role === 'topic'), tag); await o.click('stapler', tag); s = await S();
    is(s.done && await count('.hd-strip.is-stapled') === 3, tag + ' the topic → every strip stapled, solved');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-headline-desk'));
})().catch((e) => { console.error(e); process.exit(1); });
