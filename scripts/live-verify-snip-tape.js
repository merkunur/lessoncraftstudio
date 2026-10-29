#!/usr/bin/env node
/* =====================================================================
   live-verify-snip-tape.js — drives "Span's Length Gap" (The Snip-Out
   Tape, #155) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): caterpillar 5 / centipede 7 — a real tap on the tape puts the
   orange clip at 5, a real drag brings the green clip to 7, the gap glows;
   1, 2 on the keypad and Check → the 2-cm piece is snipped beside the
   12-cm dashed strip, hintGhost; delete, delete, 2, Check → solved.
   Every one of the 11 pages returns 200 (da, no and fi are new pages);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Plumbing: scripts/lib/activity-harness.js.
   Usage: node scripts/live-verify-snip-tape.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/snip-tape-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '155-snip-tape'));
const ROW = H.row('span-length-gap-activities.json', 'span-length-gap.how-much-longer.2-md-a-4');
const { T } = H.strings('snip-tape-activity.js', 'SnipTapeActivity', { SnipTapeCore: C });
const WRAPPER = H.WRAPPER(), sp = H.sp;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'snip-tape-activity.html', global: 'SnipTapeActivity', ready: '.st-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds snip-tape-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.SnipTapeActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate(() => { const a = window.SnipTapeActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.ruler = '12'; a.api.settings.starts = 'lined'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.SnipTapeActivity.st)));
    const note = () => o.frame.evaluate(() => document.querySelector('.st-note').textContent);
    /* a real tap on the tape (upper half) at 5, through the page */
    /* the parent page may still be scrolling after scrollIntoView: wait until the iframe's offset holds still for two reads */
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const geo = async () => { await o.frame.evaluate(() => document.querySelector('.st-board').scrollIntoView({ block: 'center' })); await settle(); return o.frame.evaluate(() => { const a = window.SnipTapeActivity, b = document.querySelector('.st-board').getBoundingClientRect(), c = document.querySelector('[data-k="clipB"]').getBoundingClientRect(); return { left: b.left, top: b.top, u: a._g.u, x0: a._g.x0, tapeY: a._g.tapeY, tapeH: a._g.tapeH, cx: c.left + c.width / 2, cy: c.top + c.height / 2 }; }); };
    let q = await geo(), off = await o.off();
    await o.page.mouse.click(off.x + q.left + q.x0 + 5 * q.u, off.y + q.top + q.tapeY + q.tapeH * 0.25); await H.wait(80);
    /* a real drag of the parked green clip to 7 */
    q = await geo(); off = await o.off();
    const tx = off.x + q.left + q.x0 + 7 * q.u, x0 = off.x + q.cx, y0 = off.y + q.cy;
    await o.page.mouse.move(x0, y0); await o.page.mouse.down();
    for (let i = 1; i <= 12; i++) await o.page.mouse.move(x0 + (tx - x0) * i / 12, y0);
    await o.page.mouse.up(); await H.wait(80);
    let s = await S();
    is(s.clipA === 5 && s.clipB === 7 && (await o.frame.$$('[data-glow]')).length === 1, `${tag} a real tap and a real drag clip 5 and 7; the gap glows (${s.clipA}, ${s.clipB})`);
    await o.click('key-1', tag); await o.click('key-2', tag); await o.click('check', tag);
    s = await S();
    const ghost = await o.frame.evaluate(() => { const e = document.querySelector('[data-ghost]'); return e && e.getAttribute('data-ghost'); });
    is(s.verdict && s.verdict.kind === 'number' && ghost === '12' && (await o.frame.$$('[data-piece]')).length === 1 && sp(await note()) === sp(T(loc, 'hintGhost')), `${tag} 12 → the piece snipped beside the 12-cm strip, «${sp(await note())}»`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-missed.png`) });
    await o.click('back', tag); await o.click('back', tag); await o.click('key-2', tag); await o.click('check', tag);
    s = await S();
    is(s.done && (await o.frame.$$('[data-over]')).length === 1, `${tag} 2 → solved, the overhang glows`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-snip-tape'));
})().catch((e) => { console.error(e); process.exit(1); });
