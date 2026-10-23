#!/usr/bin/env node
/* =====================================================================
   live-verify-turning-domino.js — drives Find the Missing Part (The Turning
   Domino) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. 12 − ? = 7: 8 hangs 3 dots off
   the plate, 5 is right, turning + breaking off + putting back + turning
   fills the four facts. Every locale's page returns 200, the wrapper
   version is page.tsx's, the iframe grows with the card.
   Usage: node scripts/live-verify-turning-domino.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '084-turning-domino', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'number-bond-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'numberbond.subtraction-unknown-addend.1-oa-b-4'); })();
const C = require(path.join(MT, 'turning-domino-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, TurningDominoCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'turning-domino-activity.js'), 'utf8') + ';this.__A = TurningDominoActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="turning-domino-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds turning-domino-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TurningDominoActivity && window.TurningDominoActivity.st && document.querySelector('.td-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.TurningDominoActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.numbers = 'w20'; a._pool = null; a._ensurePool(); a.api.settings.house = 'on'; a._start(3); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.TurningDominoActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, stage: s.stage, facts: s.facts.length, removed: s.removed }; });
    const note = () => frame.evaluate(() => document.querySelector('.td-note').textContent);
    const eq = () => frame.evaluate(() => document.querySelector('.td-eq').textContent);
    const dialTo = async (n) => { for (let g = 0; g < 25; g++) { const d = await frame.evaluate(() => window.TurningDominoActivity.st.dial); if (d === n) return; await click(`[data-k="${d == null || d < n ? 'plus' : 'minus'}"]`); } };
    is(sp(await eq()) === '12 − ? = 7' && (await frame.evaluate(() => document.querySelectorAll('.td-tray .td-half.is-down').length)) === 1, `[${loc} @${w}] 12 − ? = 7, the hidden half face down in the tray`);
    await dialTo(8); await click('[data-k="go"]'); let s = await st();
    is(s.last === 'many' && (await frame.evaluate(() => document.querySelectorAll('.td-over').length)) === 3 && sp(await note()) === sp(T(loc, 'hOver', { whole: 12 })), `[${loc} @${w}] 8 leaves 3 dots hanging off the plate: «${await note()}»`);
    await dialTo(5); await click('[data-k="go"]'); s = await st();
    is(s.stage === 2 && s.facts === 1 && sp(await eq()) === '7 + 5 = 12', `[${loc} @${w}] 5 is right: the domino is whole (${await eq()})`);
    await click('[data-k="turn"]'); await wait(600); await click('[data-k="half-right"]'); s = await st();
    is(s.removed === 'right' && sp(await eq()) === '12 − 7 = 5' && s.facts === 3, `[${loc} @${w}] turn, then break the 7 off: 12 − 7 = 5 (${await eq()})`);
    await click('.td-tray .td-half'); await click('[data-k="turn"]'); await wait(600); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okFour', { a: 7, b: 5, w: 12 })), `[${loc} @${w}] the fourth fact fills the house: «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-turning-domino: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
