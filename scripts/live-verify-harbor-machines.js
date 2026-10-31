#!/usr/bin/env node
/* =====================================================================
   live-verify-harbor-machines.js — drives "The Harbor Post" (#174, The
   Three Harbor Machines) ON PRODUCTION in en, de, sv and fi (desktop 1366
   + phone 390): Level 2, the snails note — a real tap on the stage (no
   sentence powers it: a miss, shapes on every sentence); a real tap on the
   lighthouse → it runs, solved. Page statuses use plain HTTPS with the QA
   header (Super Bot Fight Mode answers bare node requests with 403, #173);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-harbor-machines.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), https = require('https');
const H = require('./lib/activity-harness');
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '174-harbor-machines'));
const ROW = H.row('author-purpose-activities.json', 'author-purpose.why-wrote.ri-2-6');
const WRAPPER = H.WRAPPER();
const status = (url) => new Promise((res) => { https.get(url, { headers: Object.assign({ 'User-Agent': 'Mozilla/5.0 Chrome/130' }, require('./lib/qa-header').headers()) }, (r) => { r.resume(); res(r.statusCode); }).on('error', () => res(0)); });
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'author-purpose-activity.html', global: 'AuthorPurposeActivity', ready: '.hm-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds author-purpose-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.AuthorPurposeActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.notes = 'mostly'; a.api.settings.machines = 'three'; a._pool = null; a._ensurePool(); a._start(a._pool.findIndex((n) => n.id === 'i5')); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.AuthorPurposeActivity.st)));
    const count = (sel) => o.frame.evaluate((s) => document.querySelectorAll(s).length, sel);
    await o.click('mach-entertain', tag); let s = await S();
    is(s.misses === 1 && !s.done && await count('.hm-mach.is-sputter') === 1 && await count('.hm-dot svg') === 3, tag + ' the stage: a miss, it sputters, a shape on every sentence');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await o.click('mach-inform', tag); s = await S();
    is(s.done && await count('.hm-mach.hm-inform.is-run') === 1, tag + ' the lighthouse runs: solved');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-harbor-machines'));
})().catch((e) => { console.error(e); process.exit(1); });
