#!/usr/bin/env node
/* =====================================================================
   live-verify-counting-lamp.js — drives Whistle Valley (The Counting Lamp)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. Find the spot 1–11: 8 on tie 8 and 4 on tie
   3 → the lamp stops at tie 8 (hintCountOn); 8 moved to tie 7 → okTies.
   Every locale's page returns 200, the wrapper version is page.tsx's, the
   engine loads, the iframe grows with the card.
   Usage: node scripts/live-verify-counting-lamp.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '092-counting-lamp', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'track-repair-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'track-repair.count-to-120.1-nbt-a-1'); })();
const C = require(path.join(MT, 'counting-lamp-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, CountingLampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'counting-lamp-activity.js'), 'utf8') + ';this.__A = CountingLampActivity;', ctx); return ctx.__A.strings; })();
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="counting-lamp-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds counting-lamp-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.CountingLampActivity && window.CountingLampActivity.st && document.querySelector('.lm-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.CountingLampActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.track = 'spots'; a.api.settings.numbers = '120'; a._pool = null; a._ensurePool(); a._start(0, 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.CountingLampActivity.st; return { done: s.done, misses: s.misses, seats: s.seats }; });
    const note = () => frame.evaluate(() => document.querySelector('.lm-note').textContent);
    await frame.waitForFunction(() => { const i = [...document.querySelectorAll('.lm-engine-pic')]; return i.length === 1 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = [...document.querySelectorAll('.lm-engine-pic')]; return i.length === 1 && i.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] the engine (a library picture) loads`);
    await click('[data-k="plate-8"]'); await click('[data-k="seat-8"]'); await click('[data-k="plate-4"]'); await click('[data-k="seat-3"]'); await click('[data-k="check"]'); let s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintCountOn')), `[${loc} @${w}] 8 one tie too far: the lamp stops there: «${await note()}»`);
    await click('[data-k="seat-8"]'); await click('[data-k="seat-7"]'); await click('[data-k="check"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okTies', { a: 4, b: 8 })), `[${loc} @${w}] 8 moved to tie 7: «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-counting-lamp: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
