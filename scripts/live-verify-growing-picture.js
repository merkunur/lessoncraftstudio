#!/usr/bin/env node
/* =====================================================================
   live-verify-growing-picture.js — drives "Gauge's Good Guess" (The
   Growing Picture, #154) ON PRODUCTION in en, de, sv and fi (desktop 1366
   + phone 390): the ant, a real tap on 30 cm → the ant grows as long as
   the 30-cm ruler; Check → too big, hintBigRuler, the dashed ghost; a tap
   on 1 cm → the size bar and the label; Check → solved, in the album.
   Every one of the 11 pages returns 200 (sv, da, no and fi are new pages);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Plumbing: scripts/lib/activity-harness.js.
   Usage: node scripts/live-verify-growing-picture.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/growing-picture-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '154-growing-picture'));
const ROW = H.row('gauge-good-guess-activities.json', 'gauge-good-guess.estimate.2-md-a-3');
const { T } = H.strings('growing-picture-activity.js', 'GrowingPictureActivity', { GrowingPictureCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'growing-picture-activity.html', global: 'GrowingPictureActivity', ready: '.gp-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds growing-picture-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.GrowingPictureActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.GrowingPictureActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'estimate'; a.api.settings.grow = 'tap'; a._pool = null; a._ensurePool(); a._cards = { 0: [0, 1, 2] }; a._start(0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.GrowingPictureActivity.st)));
    const note = () => o.frame.evaluate(() => document.querySelector('.gp-note').textContent);
    const geo = () => o.frame.evaluate(() => { const b = document.querySelector('.gp-picbox'), r = document.querySelector('.gp-ruler'); return { pic: b ? b.getBoundingClientRect().width : null, ruler: r ? r.getBoundingClientRect().width : null, ghost: !!document.querySelector('.gp-ghost'), bar: !!document.querySelector('.gp-sizebar'), label: !!document.querySelector('.gp-chip .gp-label') }; });
    await o.click('card-2', tag);
    let g = await geo();
    is(g.pic && g.ruler && Math.abs(g.pic - g.ruler) <= 0.03 * g.ruler, `${tag} 30 cm: the ant is as long as the 30-cm ruler (${g.pic && g.pic.toFixed(0)} / ${g.ruler && g.ruler.toFixed(0)})`);
    await o.click('check', tag);
    let s = await S(); g = await geo();
    is(s.verdict && s.verdict.kind === 'big' && g.ghost && sp(await note()) === sp(T(loc, 'hintBigRuler')), `${tag} Check → too big, the ghost, «${sp(await note())}»`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-big.png`) });
    await o.click('card-0', tag); g = await geo();
    is(g.bar && g.label && !g.pic, `${tag} 1 cm: the size bar and the ant as its label`);
    await o.click('check', tag);
    s = await S();
    is(s.done && (await o.frame.$$('.gp-athumb')).length === 1, `${tag} 1 cm → solved, the ant in the album`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-growing-picture'));
})().catch((e) => { console.error(e); process.exit(1); });
