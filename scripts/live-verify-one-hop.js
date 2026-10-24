#!/usr/bin/env node
/* =====================================================================
   live-verify-one-hop.js — drives Inchie's Garden Path (The One-Hop
   Helpers) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. A1: four taps on the pot, four
   taps on the helpers → Inchie reaches the end and the keypad opens; 5 →
   Check → a miss (hintCount1); 4 → Check → okLen. Every locale page (11)
   returns 200, the wrapper version is page.tsx, Inchie loads, the iframe
   grows with the card.
   Usage: node scripts/live-verify-one-hop.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '100-one-hop', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'one-hop-activities.json'), 'utf8')).find(r => r.id === 'lay-units.measure.1-md-a-2');
const C = require(path.join(MT, 'one-hop-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, OneHopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'one-hop-activity.js'), 'utf8') + ';this.__A = OneHopActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const CAP = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const OB = (loc, o) => ACT.OBJECTS[loc][o].split('|');
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
    const frameEl = await page.waitForSelector('iframe[src*="one-hop-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds one-hop-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.OneHopActivity && window.OneHopActivity.st && document.querySelector('.oh-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.OneHopActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.job = 'lay'; a.api.settings.sizes = 'one'; a._pool = null; a._ensurePool(); a._start('A1', 0); a._view = {}; a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(250);
    };
    const st = () => frame.evaluate(() => { const s = window.OneHopActivity.st; return { done: s.done, misses: s.misses, hops: s.hops, status: s.status, n: s.helpers.length }; });
    const note = () => frame.evaluate(() => document.querySelector('.oh-note').textContent);
    await frame.waitForFunction(() => { const i = document.querySelector('.oh-wormpic'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = document.querySelector('.oh-wormpic'), o = document.querySelector('.oh-obj'); return !!(i && i.naturalWidth > 0 && o && o.naturalWidth > 0); }), `[${loc} @${w}] Inchie and the car (library pictures) load`);
    for (let i = 0; i < 4; i++) await click('[data-k="pot"]');
    let s = await st(); is(s.n === 4, `[${loc} @${w}] four taps on the pot lay four helpers`);
    for (let i = 0; i < 4; i++) await click('[data-k="helper-0"]');
    s = await st(); is(s.status === 'end' && s.hops === 4 && await frame.evaluate(() => document.querySelectorAll('.oh-key').length) === 11, `[${loc} @${w}] four hops → the end, the keypad opens («${await note()}»)`);
    await click('[data-k="key-5"]'); await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintCount1')), `[${loc} @${w}] 5 → a miss, «${await note()}»`);
    await click('[data-k="key-4"]'); await click('[data-k="check"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okLen', { Obj: CAP(OB(loc, 'car')[0]), n: T(loc, 'nHelpers', { n: 4 }), long: OB(loc, 'car')[1] || '' })), `[${loc} @${w}] 4 → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-one-hop: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
