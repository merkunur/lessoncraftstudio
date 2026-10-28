#!/usr/bin/env node
/* =====================================================================
   live-verify-deciding-gate.js — drives "Compare Three-Digit Numbers"
   (The Deciding Gate, #151) ON PRODUCTION in en, de, sv and fi (desktop
   1366 + phone 390), real pointer: 389 / 412 with the tens gate called →
   the race stops at the hundreds, one bar, hintLate; the hundreds gate
   and < → solved with the long view. Every one of the 11 pages returns
   200; the wrapper version is page.tsx's; the iframe grows with the card.
   Plumbing: scripts/lib/activity-harness.js.
   Usage: node scripts/live-verify-deciding-gate.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const H = require('./lib/activity-harness');
const C = require('../mini tools/deciding-gate-core.js');
const OUT = H.arg('out', path.join(H.REPO, 'docs', 'audit-results', 'activities-rebuild', '151-deciding-gate', 'live'));
const ROW = H.row('match-pairs-activities.json', 'match-pairs.compare-three-digit-numbers.2-nbt-a-4');
const { T } = H.strings('deciding-gate-activity.js', 'DecidingGateActivity', { DecidingGateCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'deciding-gate-activity.html', global: 'DecidingGateActivity', ready: '.dg-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds deciding-gate-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.DecidingGateActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.job = 'compare'; a.api.settings.digits = 'three'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const note = () => o.frame.evaluate(() => document.querySelector('.dg-note').textContent);
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.DecidingGateActivity.st)));
    for (const k of ['gate-1', 'sign-lt', 'check']) await o.click(k, tag);
    let s = await S();
    is(s.verdict && s.verdict.kind === 'gateLate' && sp(await note()) === sp(T(loc, 'hintLate', { at: T(loc, 'atH') })) && (await o.frame.$$('.dg-gatebar')).length === 1, `${tag} the tens called for 389/412 → the race stops at the hundreds, «${sp(await note())}»`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-late.png`) });
    for (const k of ['gate-0', 'check']) await o.click(k, tag);
    s = await S();
    is(s.done && (await o.frame.$$('.dg-long')).length === 1, `${tag} the hundreds gate and < → solved, the long view`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-deciding-gate'));
})().catch((e) => { console.error(e); process.exit(1); });
