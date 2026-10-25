#!/usr/bin/env node
/* =====================================================================
   live-verify-set-clock.js — drives Set the Clock (The Echo Slice) ON
   PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. 7:30: both hands from the tray, a tap on
   the face points the long hand at the 6, the short hand on the 7 →
   Check → a miss (hintEdge, the receipt "7?:30"); the short hand half way
   between the 7 and the 8 → Check → the locale's celebration, the bell,
   the receipt with no "?". Every locale page (11) returns 200, the
   wrapper version is page.tsx, the iframe grows with the card; the
   2.MD.C.7 sibling page (still on clock-activity) returns 200 in all 11.
   Usage: node scripts/live-verify-set-clock.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '104-set-clock', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'set-clock-activities.json'), 'utf8')).find(r => r.id === 'clock.set-clock.1-md-b-3');
const SIB = JSON.parse(fs.readFileSync(path.join(MT, 'clock-activities.json'), 'utf8')).find(r => r.id === 'clock.tell-time-5-min.2-md-c-7');
const C = require(path.join(MT, 'set-clock-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, SetClockCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'set-clock-activity.js'), 'utf8') + ';this.__A = SetClockActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = a || {}; return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OKT = (loc) => { const w = ACT.TIMES[loc].w['7:30']; return T(loc, 'ok', { W: w.charAt(0).toUpperCase() + w.slice(1) }); };
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [row, what] of [[ROW, 'set-clock'], [SIB, 'the 2.MD.C.7 sibling']]) for (const loc of Object.keys(row.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${row.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] ${what}: /${loc}/activities/${row.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="set-clock-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds set-clock-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SetClockActivity && window.SetClockActivity.st && document.querySelector('.sc-svg'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.SetClockActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = 'both'; a.api.settings.slice = 'after'; a._pool = null; a._ensurePool(); a._start('7:30', 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const scrollTo = async (y0) => { const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200); };
    const click = async (sel) => {
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      if (y0 == null) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      await scrollTo(y0); const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(250);
    };
    const tapFace = async (deg) => {
      const c = await frame.evaluate(() => { const a = window.SetClockActivity, D = a._dims(), r = document.querySelector('.sc-svg').getBoundingClientRect(); return { x: r.left + D.cx, y: r.top + D.cy, r: D.r }; });
      await scrollTo(c.y); const o = await frameOff(); const c2 = await frame.evaluate(() => { const a = window.SetClockActivity, D = a._dims(), r = document.querySelector('.sc-svg').getBoundingClientRect(); return { x: r.left + D.cx, y: r.top + D.cy, r: D.r }; });
      const a = deg * Math.PI / 180; await page.mouse.click(o.x + c2.x + 0.8 * c2.r * Math.sin(a), o.y + c2.y - 0.8 * c2.r * Math.cos(a)); await wait(250);
    };
    const st = () => frame.evaluate(() => { const a = window.SetClockActivity, s = a.st; const r = document.querySelector('.sc-receipt'); return { done: s.done, misses: s.misses, short: s.short, long: s.long, receipt: r ? r.textContent : null, ring: a._view.ring }; });
    const note = () => frame.evaluate(() => document.querySelector('.sc-note').textContent);
    await click('[data-k="tray-short"]'); await click('[data-k="tray-long"]'); await tapFace(180);
    await click('[data-k="tray-short"]'); await tapFace(210); let s = await st();
    is(s.long === 30 && s.short === 84, `[${loc} @${w}] the hands put on the clock by real taps: long on the 6, short on the 7 (${s.long}/${s.short})`);
    await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintEdge')) && sp(s.receipt) === sp('7?' + ACT.TIMES[loc].sep.trim() + '30'), `[${loc} @${w}] on the 7 → a miss, «${await note()}», the receipt «${s.receipt}»`);
    await tapFace(225); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.SetClockActivity.st.done && document.querySelector('.sc-note').textContent, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && s.ring >= 1 && sp(await note()) === sp(OKT(loc)) && s.receipt && s.receipt.indexOf('?') < 0, `[${loc} @${w}] half way between the 7 and the 8 → «${await note()}», the bell, the receipt «${s.receipt}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-set-clock: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
