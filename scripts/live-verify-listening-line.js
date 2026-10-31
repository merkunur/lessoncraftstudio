#!/usr/bin/env node
/* =====================================================================
   live-verify-listening-line.js — drives "Dr. Plume's Sentence Clinic"
   (#176, The Listening Line) ON PRODUCTION in en, de, sv and fi (desktop
   1366 + phone 390): Level 2, the first run — real taps put only the end
   mark and check (the line knots at the seam: a miss); real taps put the
   right mark in the seam and check (cured). Page statuses use plain HTTPS
   with the QA header; the wrapper version is page.tsx's; the iframe grows
   with the card.
   Usage: node scripts/live-verify-listening-line.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), https = require('https');
const H = require('./lib/activity-harness');
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '176-listening-line'));
const ROW = H.row('sentence-clinic-activities.json', 'sentence-clinic.fix-it.l-2-1');
const WRAPPER = H.WRAPPER();
const status = (url) => new Promise((res) => { https.get(url, { headers: Object.assign({ 'User-Agent': 'Mozilla/5.0 Chrome/130' }, require('./lib/qa-header').headers()) }, (r) => { r.resume(); res(r.statusCode); }).on('error', () => res(0)); });
const MARK = { T: '.', A: '?' };
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'sentence-clinic-activity.html', global: 'SentenceClinicActivity', ready: '.sc-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds sentence-clinic-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.SentenceClinicActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'two'; a.api.settings.line = 'check'; a._ensurePool(); a._start(0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.SentenceClinicActivity.st)));
    const count = (sel) => o.frame.evaluate((s) => document.querySelectorAll(s).length, sel);
    let s = await S(); const r = s.round, seam = r.units[0].to, end = r.tokens.length - 1;
    await o.click('tool-' + MARK[r.units[1].tune], tag); await o.click('gap-' + end, tag); await o.click('listen', tag); s = await S();
    is(s.misses === 1 && !s.done && await count('.sc-end.is-knot') === 1, tag + ' only the end mark: the line knots at the seam');
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-knot.png`) });
    if (MARK[r.units[0].tune] !== MARK[r.units[1].tune]) await o.click('tool-' + MARK[r.units[0].tune], tag);
    await o.click('gap-' + seam, tag); await o.click('listen', tag); s = await S();
    is(s.done && await count('.sc-bed.is-cured') === 1 && await count('.sc-end.is-bad') === 0, tag + ' the stop in the seam: cured, the bed sits up');
    await H.wait(1200);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-listening-line'));
})().catch((e) => { console.error(e); process.exit(1); });
