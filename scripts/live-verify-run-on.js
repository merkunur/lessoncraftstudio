#!/usr/bin/env node
/* =====================================================================
   live-verify-run-on.js — drives "Set the Clock — Tell Time to the
   Nearest 5 Minutes" (The Run-On Test, #163) ON PRODUCTION in en, de, sv
   and fi (desktop 1366 + phone 390): five minutes, 9:20 — real drags put
   the long hand on the 4 and the short hand ON the 9 → Check: the readout
   says 9:20, yet the clock runs on crooked (no bell); a real drag of the
   short hand on toward the 10 → solved, the bell strikes ten times.
   Every one of the 11 pages returns 200; the wrapper version is
   page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-run-on.js [--locales=…] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./lib/activity-harness');
/* screenshots go outside the repo: they are never committed */
const OUT = H.arg('out', path.join(os.tmpdir(), 'lcs-live', '163-run-on'));
const ROW = H.row('clock-activities.json', 'clock.tell-time-5-min.2-md-c-7');
const WRAPPER = H.WRAPPER();
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const V = await H.live({ html: 'run-on-activity.html', global: 'RunOnActivity', ready: '.ro-wrap' });
  const { is } = V.C;
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  if (!H.arg('locales', '')) for (const loc of Object.keys(ROW.slug)) { const s = await V.status(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`); is(s === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${s}`); }
  for (const loc of H.arg('locales', 'en,de,sv,fi').split(',')) for (const w of [1366, 390]) {
    const tag = `[${loc} @${w}]`;
    const o = await V.open(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, w);
    is(!!o.frameEl, tag + ' the page embeds run-on-activity.html');
    if (!o.frameEl) { await o.page.close(); continue; }
    is(o.src.includes('v=' + WRAPPER), tag + ' wrapper version ' + WRAPPER);
    await o.frame.evaluate(() => { const a = window.RunOnActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = 'five'; a._pool = null; a._ensurePool(); a._start(3); a._render2(); });
    const S = () => o.frame.evaluate(() => JSON.parse(JSON.stringify(window.RunOnActivity.st)));
    const settle = async () => { let a = await o.off(); for (let i = 0; i < 20; i++) { await H.wait(120); const b = await o.off(); if (Math.abs(b.x - a.x) < 0.5 && Math.abs(b.y - a.y) < 0.5) return; a = b; } };
    const tapSel = async (sel) => { await o.frame.evaluate((q) => document.querySelector(q).scrollIntoView({ block: 'center' }), sel); await settle(); const e = await o.xy(sel), off = await o.off(); await o.page.mouse.click(off.x + e.x, off.y + e.y); await H.wait(120); };
    /* a real drag of a grip through the clock to an angle */
    const drag = async (which, ang) => {
      await o.frame.evaluate(() => document.querySelector('.ro-clock').scrollIntoView({ block: 'center' })); await settle();
      const p = await o.frame.evaluate((w, a) => {
        const b = document.querySelector('[data-k="grip-' + w + '"]').getBoundingClientRect(), c = document.querySelector('.ro-clock').getBoundingClientRect(), k = c.width / 400, t = (a - 90) * Math.PI / 180, rad = w === 'long' ? 130 : 90;
        return { x0: b.left + b.width / 2, y0: b.top + b.height / 2, x1: c.left + (200 + rad * Math.cos(t)) * k, y1: c.top + (220 + rad * Math.sin(t)) * k };
      }, which, ang);
      const off = await o.off();
      await o.page.mouse.move(off.x + p.x0, off.y + p.y0); await o.page.mouse.down();
      await o.page.mouse.move(off.x + (p.x0 + p.x1) / 2, off.y + (p.y0 + p.y1) / 2, { steps: 5 }); await o.page.mouse.move(off.x + p.x1, off.y + p.y1, { steps: 5 }); await o.page.mouse.up(); await H.wait(120);
    };
    const attr = (sel, a) => o.frame.evaluate((q, a) => { const e = document.querySelector(q); return e ? e.getAttribute(a) : null; }, sel, a);
    const count = (sel) => o.frame.evaluate((q) => document.querySelectorAll(q).length, sel);
    await drag('long', 120); await drag('short', 270); let s = await S();
    is(s.long === 120 && s.short === 270 && await attr('[data-readout]', 'data-readout') === '', `${tag} real drags: long on the 4, short on the 9; the readout still empty (${s.long}/${s.short})`);
    await tapSel('[data-k="check"]'); s = await S();
    is(s.misses === 1 && await attr('[data-readout]', 'data-readout') === '9:20' && await count('[data-crooked]') === 1 && await count('[data-stroke]') === 0, `${tag} Check: the readout says 9:20, yet the run-on arrives crooked — no bell`);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-crooked.png`) });
    await drag('short', 280); await tapSel('[data-k="check"]'); await H.wait(300); s = await S();
    is(s.done && await count('[data-stroke]') === 10, `${tag} the short hand on toward the 10 → solved; the bell strikes ten times`);
    await H.wait(1500);
    await o.page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await o.fit();
    is(fit.frameH >= fit.cardH - 8, `${tag} iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await o.page.close();
  }
  await V.close();
  process.exit(V.C.report('live-verify-run-on'));
})().catch((e) => { console.error(e); process.exit(1); });
