#!/usr/bin/env node
/* =====================================================================
   live-verify-magnet-plates.js — drives Sunny-Side Diner (The Magnet
   Plates) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. A Level-1 round: an empty tray is a
   hint; the right tray turns into plates; the golden "and" joins them; no
   end cap keeps the hatch shut (a miss); the end cap docks and the hatch
   opens, the bubble naming the sentence. Every locale's page returns 200,
   the wrapper version is page.tsx's, the pictures load, the iframe grows.
   Usage: node scripts/live-verify-magnet-plates.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '077-magnet-plates', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'sunny-side-diner-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'sunny-side-diner.compound-order.l-k-1-f'); })();
const C = require(path.join(MT, 'magnet-plates-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, MagnetPlatesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'magnet-plates-activity.js'), 'utf8') + ';this.__A = MagnetPlatesActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(400);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="magnet-plates-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds magnet-plates-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.MagnetPlatesActivity && window.MagnetPlatesActivity.st && document.querySelector('.mp-wrap'), { timeout: 30000 });
    const i = ['en', 'de', 'sv', 'fi'].indexOf(loc), r = C.round('l1', i);
    await frame.evaluate((i) => { const a = window.MagnetPlatesActivity; a.OK_MS = 600000; a.api.settings.level = 'l1'; a.api.settings.order = 'show'; a._pool = null; a._ensurePool(); a._start(i); a._render2(); }, i);
    await frame.waitForFunction(() => { const im = [...document.querySelectorAll('.mp-wrap img.mp-pic')]; return im.length >= 6 && im.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const im = [...document.querySelectorAll('.mp-wrap img.mp-pic')]; return im.length >= 6 && im.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] the pictures load`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(500);
    };
    const st = () => frame.evaluate(() => { const s = window.MagnetPlatesActivity.st; return { phase: s.phase, misses: s.misses, done: s.done, last: s.last && s.last.reason, joints: s.joints.slice(), end: s.end }; });
    const note = () => frame.evaluate(() => document.querySelector('.mp-note').textContent);
    await click('.mp-check'); let s = await st();
    is(s.misses === 0 && sp(await note()) === sp(STR.hEmptyTray[loc]), `[${loc} @${w}] an empty tray: the hint, no miss`);
    for (const p of r.ticket) for (let k = 0; k < p.qty; k++) await click(`.mp-bin[data-food="${p.food}"]`);
    await click('.mp-check'); s = await st();
    is(s.phase === 'rail', `[${loc} @${w}] the right tray turns into plates on the rail`);
    await click('[data-k="hook-and-0"]'); await click('[data-k="gap-0"]'); s = await st();
    is(s.joints[0] === 'and', `[${loc} @${w}] the golden "and" joins the plates`);
    await click('.mp-check'); s = await st();
    is(!s.done && s.last === 'end' && s.misses === 1, `[${loc} @${w}] no end cap: the hatch stays shut (a miss)`);
    await click('[data-k="hook-end"]'); await click('[data-k="dock"]'); await click('.mp-check'); s = await st();
    const want = C.say(loc, r.ticket), msg = sp(await note());
    is(s.done && msg === sp(STR.okTwo[loc].split('{s}').join(want)), `[${loc} @${w}] the hatch opens: «${msg}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-magnet-plates: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
