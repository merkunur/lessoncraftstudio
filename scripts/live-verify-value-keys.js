#!/usr/bin/env node
/* =====================================================================
   live-verify-value-keys.js — drives "Expanded Form" (The Value-Key
   Adding Machine, #150) ON PRODUCTION in en, de, sv and fi (desktop 1366
   + phone 390), real pointer: 305 made with a 50 → the drums 355 and the
   zero hint; the 50 lifted → solved, the tape "300 + 5". Every one of
   the 11 pages returns 200; the wrapper version is page.tsx's; the iframe
   grows with the card. Plumbing: scripts/lib/activity-harness.js.
   Usage: node scripts/live-verify-value-keys.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const H = require('./lib/activity-harness');
const C = require('../mini tools/value-keys-core.js');
const OUT = H.arg('out', path.join(H.REPO, 'docs', 'audit-results', 'activities-rebuild', '150-value-keys', 'live'));
const ROW = H.row('place-value-activities.json', 'place-value.expanded-form.2-nbt-a-3');
const { T } = H.strings('value-keys-activity.js', 'ValueKeysActivity', { ValueKeysCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp, K305 = C.rounds('make', 3).findIndex((r) => r.n === 305);
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'value-keys-activity.html', global: 'ValueKeysActivity', ready: '.vk-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds value-keys-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate((k) => { const a = window.ValueKeysActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.job = 'make'; a.api.settings.numbers = 'three'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, K305);
    const press = async (p, d) => { if (await o.frame.$('[data-k="tab-' + p + '"]')) await o.click('tab-' + p, tag); await o.click('key-' + p + d, tag); };
    const note = () => o.frame.evaluate(() => document.querySelector('.vk-note').textContent);
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.ValueKeysActivity.st)));
    await press('h', 3); await press('t', 5); await press('o', 5); await o.click('check', tag);
    let s = await S();
    is(s.verdict && s.verdict.kind === 'zeroPressed' && s.drums === 355 && sp(await note()) === sp(T(loc, 'hintZero', { zero: '0 ' + T(loc, 'wT0') })), `${tag} 50 for 305 → drums 355, «${sp(await note())}»`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-zero.png`) });
    await press('t', 5); await o.click('check', tag);
    s = await S();
    is(s.done && s.tape.join('|') === '300|+ 5|= 305', `${tag} 305 = 300 + 5 (${s.tape.join(' ')})`);
    await H.wait(900);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await H.wait(1200);
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-value-keys'));
})().catch((e) => { console.error(e); process.exit(1); });
