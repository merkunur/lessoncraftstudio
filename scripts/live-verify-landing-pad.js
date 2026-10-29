#!/usr/bin/env node
/* =====================================================================
   live-verify-landing-pad.js — drives "Hopper's Number Line" (The Spring
   and the Landing Pad, #157) ON PRODUCTION in en, de, sv and fi (desktop
   1366 + phone 390): the 4 + 12 round — a real drag puts Hopper on 4, real
   taps load a ten and two ones, a real drag floats the pad on 15 (the
   start counted) → Let go: he hops to 16 and splashes; the pad dragged to
   16 → solved, the lotus opens.
   Every one of the 11 pages returns 200 (da, no and fi are new pages);
   the wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-landing-pad.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
const C = require('../mini tools/landing-pad-core.js');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '157-landing-pad'));
const ROW = H.row('hoppers-number-line-activities.json', 'hoppers-number-line.jump-sums.2-md-b-6');
const WRAPPER = H.WRAPPER(), K = C.rounds('20').findIndex((r) => r.start === 4 && r.size === 12);
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'landing-pad-activity.html', global: 'LandingPadActivity', ready: '.lp-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds landing-pad-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.waitForFunction(() => window.LandingPadActivity._picsReady, { timeout: 30000 });
    await o.frame.evaluate((k) => { const a = window.LandingPadActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.line = '20'; a.api.settings.labels = 'some'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, K);
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.LandingPadActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const into = async (sel) => { await o.frame.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await settle(); };
    const tap = async (k) => { await into('[data-k="' + k + '"]'); const e = await o.xy('[data-k="' + k + '"]'), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(90); };
    /* a freshly loaded page can still be growing its iframe: settle, drag, and re-drag once if the piece did not land (the state says) */
    const drag = async (k, stone) => {
      await drag1(k, stone);
      const at = await o.frame.evaluate((k) => { const st = window.LandingPadActivity.st; return k === 'frog' ? st.frogAt : st.padAt; }, k);
      if (at !== stone) { await H.wait(400); await drag1(k, stone); }
    };
    const drag1 = async (k, stone) => {
      await into('[data-k="' + k + '"]'); await into('[data-stone="' + stone + '"]'); await into('[data-k="' + k + '"]'); const a = await o.xy('[data-k="' + k + '"]'), b = await o.xy('[data-stone="' + stone + '"]'), off = await o.off();
      await o.page.mouse.move(off.x + a.x, off.y + a.y); await o.page.mouse.down();
      for (let i = 1; i <= 10; i++) await o.page.mouse.move(off.x + a.x + (b.x - a.x) * i / 10, off.y + a.y + (b.y - a.y) * i / 10);
      await o.page.mouse.up(); await H.wait(120);
    };
    await drag('frog', 4); await tap('ten'); await tap('one'); await tap('one'); await drag('pad', 15);
    let s = await S();
    is(s.frogAt === 4 && s.coils.length === 3 && s.padAt === 15, `${tag} real drags and taps: Hopper on 4, a ten and two ones, the pad on 15 (${s.frogAt}, ${s.coils.length}, ${s.padAt})`);
    await tap('check'); s = await S();
    is(s.verdict && s.verdict.kind === 'splash' && s.verdict.final === 16 && (await o.frame.evaluate(() => document.querySelectorAll('[data-splash]').length)) === 1, `${tag} the start counted: he hops to 16 and splashes`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-splash.png`) });
    await drag('pad', 16); await tap('check'); s = await S();
    is(s.done && (await o.frame.evaluate(() => document.querySelectorAll('[data-lotus]').length)) === 1, `${tag} the pad on 16 → solved, the lotus opens`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-landing-pad'));
})().catch((e) => { console.error(e); process.exit(1); });
