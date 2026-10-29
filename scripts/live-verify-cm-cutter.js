#!/usr/bin/env node
/* =====================================================================
   live-verify-cm-cutter.js — drives "Tildy's Tailor Shop" (The CM Cutter,
   #153) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the ribbon with the 0 left at 3, the numeral 4 tapped → Check leaves a
   stub on the table, 4 pieces in the jar, hintStub; the ruler moved to the
   strip and 7 tapped → solved. Every one of the 11 pages returns 200 (sv,
   da, no and fi are new pages); the wrapper version is page.tsx's; the
   iframe grows with the card. Plumbing: scripts/lib/activity-harness.js.
   Usage: node scripts/live-verify-cm-cutter.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/cm-cutter-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '153-cm-cutter'));
const ROW = H.row('tildy-activities.json', 'tildy.measure-ruler.2-md-a-1');
const { T } = H.strings('cm-cutter-activity.js', 'CmCutterActivity', { CmCutterCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'cm-cutter-activity.html', global: 'CmCutterActivity', ready: '.cc-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds cm-cutter-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.CmCutterActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.CmCutterActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'align'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.CmCutterActivity.st)));
    const note = () => o.frame.evaluate(() => document.querySelector('.cc-note').textContent);
    /* a real tap on the numeral 4 of the ruler, through the page */
    const tapNum = async (i) => {
      const p = await o.frame.evaluate((i) => { document.querySelector('.cc-band').scrollIntoView({ block: 'center' }); const t = document.querySelector('.cc-tick[data-tick="' + i + '"]').getBoundingClientRect(), r = document.querySelector('.cc-tablesvg .cc-ruler').getBoundingClientRect(); return { x: t.left + t.width / 2, y: r.top + r.height * 0.7 }; }, i);
      const off = await o.off(); await o.page.mouse.click(off.x + p.x, off.y + p.y); await H.wait(60);
    };
    await tapNum(4); await o.click('check', tag);
    let s = await S();
    is(s.reading === 4 && s.verdict && s.verdict.kind === 'inside' && sp(await note()) === sp(T(loc, 'hintStub')) && (await o.frame.$$('.cc-piece')).length === 4 && (await o.frame.$$('[data-left="stub"]')).length === 1, `${tag} 4 read with the 0 at 3 → a stub, 4 pieces, «${sp(await note())}»`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-stub.png`) });
    await o.frame.evaluate(() => window.CmCutterActivity._slide(0));
    await tapNum(7); await o.click('check', tag);
    s = await S();
    is(s.done && (await o.frame.$$('.cc-piece')).length === 7, `${tag} the 0 at the strip and 7 → solved, 7 pieces`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-cm-cutter'));
})().catch((e) => { console.error(e); process.exit(1); });
