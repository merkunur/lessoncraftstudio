#!/usr/bin/env node
/* =====================================================================
   live-verify-sunken-stones.js — drives Lily's Ten Stones (The Sunken
   Stones) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. 8 + 6: a tap on 14 splashes (under
   water), 10 lands on the Ten Stone, 14, and 14 succeeds with the chain.
   Every locale's page returns 200, the wrapper version is page.tsx's, the
   frog loads, the iframe grows with the card.
   Usage: node scripts/live-verify-sunken-stones.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '086-sunken-stones', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'ten-stones-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'ten-stones.add-sub-within-20.1-oa-c-6'); })();
const C = require(path.join(MT, 'sunken-stones-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, SunkenStonesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'sunken-stones-activity.js'), 'utf8') + ';this.__A = SunkenStonesActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="sunken-stones-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds sunken-stones-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SunkenStonesActivity && window.SunkenStonesActivity.st && document.querySelector('.sk-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.SunkenStonesActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.facts = 'both'; a.api.settings.labels = 'five'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.SunkenStonesActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, lily: s.lily, rope: s.rope }; });
    const note = () => frame.evaluate(() => document.querySelector('.sk-note').textContent);
    const scrollTo = async (sel) => { const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel); const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(250); };
    const tapStone = async (n) => { await scrollTo('.sk-pond'); const o = await frameOff(); const q = await frame.evaluate((n) => { const a = window.SunkenStonesActivity, G = a._G, p = document.querySelector('.sk-pond').getBoundingClientRect(); return { x: p.left + G.x(n), y: p.top + G.sy }; }, n); await page.mouse.click(o.x + q.x, o.y + q.y); await wait(400); };
    await frame.waitForFunction(() => { const i = document.querySelector('.sk-frog'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = document.querySelector('.sk-frog'); return !!i && i.naturalWidth > 0; }), `[${loc} @${w}] Lily (the library frog) loads`);
    await tapStone(14); let s = await st();
    is(s.last === 'splash' && s.lily === 8 && s.misses === 0 && sp(await note()) === sp(T(loc, 'nSplash')), `[${loc} @${w}] a tap on 14 splashes: «${await note()}»`);
    await tapStone(10); s = await st(); is(s.lily === 10 && s.rope === 4, `[${loc} @${w}] 10 lands on the Ten Stone`);
    await tapStone(14); s = await st(); is(s.lily === 14 && s.rope === 0, `[${loc} @${w}] then 14`);
    await click('[data-k="key-1"]'); await click('[data-k="key-4"]'); await click('[data-k="key-ok"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okAdd', { a: 8, p: 2, r: 4, s: 14, b: 6 })), `[${loc} @${w}] 14 succeeds: «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-sunken-stones: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
