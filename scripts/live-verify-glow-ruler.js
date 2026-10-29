#!/usr/bin/env node
/* =====================================================================
   live-verify-glow-ruler.js — drives "Read the Ruler" (The Glow Ruler,
   #152) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390),
   real pointer: the 8-cm key, the arrows to 10 → the light runs past the
   end, two coral spaces, hintOver; back to 8 → solved with the tag. Every
   one of the 11 pages returns 200; the wrapper version is page.tsx's; the
   iframe grows with the card. Plumbing: scripts/lib/activity-harness.js.
   Usage: node scripts/live-verify-glow-ruler.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const H = require('./lib/activity-harness');
const C = require('../mini tools/glow-ruler-core.js');
const OUT = H.arg('out', path.join(H.REPO, 'docs', 'audit-results', 'activities-rebuild', '152-glow-ruler', 'live'));
const ROW = H.row('choice-board-activities.json', 'choice-board.read-ruler.2-md-a-1');
const { T } = H.strings('glow-ruler-activity.js', 'GlowRulerActivity', { GlowRulerCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'glow-ruler-activity.html', global: 'GlowRulerActivity', ready: '.gr-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds glow-ruler-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.GlowRulerActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.GlowRulerActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.numbers = 'every'; a._pool = null; a._ensurePool(); a._start(4); a._render2(); });
    await o.frame.waitForFunction(() => { const i = document.querySelector('.gr-pic'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 30000 });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.GlowRulerActivity.st)));
    const note = () => o.frame.evaluate(() => document.querySelector('.gr-note').textContent);
    for (let i = 0; i < 10; i++) await o.click('nudge-on', tag);
    await o.click('check', tag);
    let s = await S();
    is(s.marker === 10 && s.verdict && s.verdict.kind === 'over' && sp(await note()) === sp(T(loc, 'hintOver')) && (await o.frame.$$('.gr-lit.is-over')).length === 2, `${tag} 10 for the 8-cm key → two coral spaces, «${sp(await note())}»`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-over.png`) });
    for (let i = 0; i < 2; i++) await o.click('nudge-back', tag);
    await o.click('check', tag);
    s = await S();
    is(s.done && sp(await o.frame.$eval('.gr-tag', (e) => e.textContent)) === sp('8 ' + T(loc, 'unit')), `${tag} back to 8 → solved, the tag «8 cm»`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-glow-ruler'));
})().catch((e) => { console.error(e); process.exit(1); });
