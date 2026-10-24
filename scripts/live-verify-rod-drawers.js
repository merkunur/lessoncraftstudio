#!/usr/bin/env node
/* =====================================================================
   live-verify-rod-drawers.js — drives Compare Two-Digit Numbers (The
   Ten-Rod Drawers) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): the real activity page, real pointer. 29 · 92: the tens knob
   opens both tens drawers and seals the ones; > → hintLookTens; < →
   okLess. Every locale page returns 200, the wrapper version is
   page.tsx, the iframe grows with the card.
   Usage: node scripts/live-verify-rod-drawers.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '095-rod-drawers', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'rod-drawers-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'choice-board.compare-two-digit.1-nbt-b-3'); })();
const C = require(path.join(MT, 'rod-drawers-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, RodDrawersCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'rod-drawers-activity.js'), 'utf8') + ';this.__A = RodDrawersActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="rod-drawers-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds rod-drawers-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.RodDrawersActivity && window.RodDrawersActivity.st && document.querySelector('.rd-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.RodDrawersActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.numbers = 'two'; a.api.settings.task = 'compare'; a._pool = null; a._ensurePool(); a._start(5, 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.RodDrawersActivity.st; return { done: s.done, misses: s.misses, open: s.open, sign: s.sign }; });
    const note = () => frame.evaluate(() => document.querySelector('.rd-note').textContent);
    await click('[data-k="pull-0"]'); let s = await st();
    is(s.open[0] && !s.open[1] && await frame.evaluate(() => document.querySelectorAll('.rd-knob.is-sealed').length) === 1, `[${loc} @${w}] 29 · 92: the tens knob opens both tens drawers and seals the ones`);
    await click('[data-k="sign"]'); await click('[data-k="sign"]'); s = await st();
    is(s.sign === '>', `[${loc} @${w}] the sign turned to >`);
    await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintLookTens')), `[${loc} @${w}] > → hintLookTens: «${await note()}»`);
    await click('[data-k="sign"]'); await click('[data-k="sign"]'); await click('[data-k="check"]'); s = await st();
    is(s.done && s.sign === '<' && sp(await note()) === sp(T(loc, 'okLess', { a: 29, b: 92 })), `[${loc} @${w}] < → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-rod-drawers: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
