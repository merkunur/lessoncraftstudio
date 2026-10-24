#!/usr/bin/env node
/* =====================================================================
   live-verify-hour-road.js — drives Sprocket's Clock (The Hour Road) ON
   PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. R1 (3:30) with its cards in a fixed order:
   tap 4:30 → Check → a miss (hintNext), the road rolled round the dial;
   tap 3:30 → Check → the locale's celebration. Every locale page (11)
   returns 200, the wrapper version is page.tsx, Sprocket loads, the
   iframe grows with the card.
   Usage: node scripts/live-verify-hour-road.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '101-hour-road', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'hour-road-activities.json'), 'utf8')).find(r => r.id === 'clock-digital.read-half-hour.1-md-b-3');
const C = require(path.join(MT, 'hour-road-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, HourRoadCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'hour-road-activity.js'), 'utf8') + ';this.__A = HourRoadActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OKT = (loc, t) => { const f = Object.create(ACT); f.api = { lang: loc, t: (k) => ACT.strings[k][loc] }; return f._t('okTime', { d: f._digital(t), p: f._phrase(t) }); };
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
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
    const frameEl = await page.waitForSelector('iframe[src*="hour-road-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds hour-road-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.HourRoadActivity && window.HourRoadActivity.st && document.querySelector('.hr-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.HourRoadActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = 'both'; a.api.settings.road = 'shown'; a._pool = null; a._ensurePool(); a._start('R1', 0); a.st.order = [0, 1, 2]; a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(250);
    };
    const st = () => frame.evaluate(() => { const s = window.HourRoadActivity.st; return { done: s.done, misses: s.misses, rolled: window.HourRoadActivity._view.s === 1 }; });
    const note = () => frame.evaluate(() => document.querySelector('.hr-note').textContent);
    await frame.waitForFunction(() => { const i = document.querySelector('.hr-rooster'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = document.querySelector('.hr-rooster'); return !!(i && i.naturalWidth > 0); }), `[${loc} @${w}] Sprocket (a library picture) loads`);
    is(await frame.evaluate(() => document.querySelectorAll('.hr-sign').length) === 13, `[${loc} @${w}] the road has its 13 posts`);
    await click('[data-k="card-2"]'); await click('[data-k="check"]'); let s = await st();
    is(s.misses === 1 && s.rolled && sp(await note()) === sp(T(loc, 'hintNext')), `[${loc} @${w}] 4:30 → a miss, the road rolled round the dial, «${await note()}»`);
    await click('[data-k="card-0"]'); await click('[data-k="check"]'); await frame.waitForFunction(() => window.HourRoadActivity.st.done && document.querySelector('.hr-note').textContent, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && sp(await note()) === sp(OKT(loc, { h: 3, m: 30 })), `[${loc} @${w}] 3:30 → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-hour-road: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
