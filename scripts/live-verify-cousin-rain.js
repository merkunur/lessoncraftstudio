#!/usr/bin/env node
/* =====================================================================
   live-verify-cousin-rain.js — drives Mim's Memory Baskets (The Cousin
   Rain) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the
   real activity page, real pointer. Sort round 0: things on the grass are a
   hint; a dog and a cat rain their cousin; an apple among them makes a
   mixed basket and Check splits the cloud into two families; the right
   grouping succeeds and the line names the kinds. Every locale's page
   returns 200, the wrapper version is page.tsx's, the pictures load, the
   iframe grows with the card.
   Usage: node scripts/live-verify-cousin-rain.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '078-cousin-rain', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'mims-baskets-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'mims-baskets.category-sort.l-k-5-a'); })();
const C = require(path.join(MT, 'cousin-rain-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, CousinRainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'cousin-rain-activity.js'), 'utf8') + ';this.__A = CousinRainActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="cousin-rain-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds cousin-rain-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.CousinRainActivity && window.CousinRainActivity.st && document.querySelector('.cr-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.CousinRainActivity; a.OK_MS = 600000; a.api.settings.level = 'l1'; a.api.settings.baskets = 'any'; a.api.settings.rain = 'live'; a._pool = null; a._ensurePool(); a._start(0); a._view.spill = false; a._render2(); });
    await frame.waitForFunction(() => { const im = [...document.querySelectorAll('.cr-wrap img.cr-pic')]; return im.length >= 7 && im.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const im = [...document.querySelectorAll('.cr-wrap img.cr-pic')]; return im.length >= 7 && im.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] the pictures load`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(450);
    };
    const put = async (i, b) => { const at = await frame.evaluate((i) => window.CousinRainActivity.st.place[i], i); await click(at === null ? `.cr-thing[data-i="${i}"]` : `.cr-item[data-i="${i}"]`); await click(`.cr-basket[data-b="${b}"]`); };
    const st = () => frame.evaluate(() => { const s = window.CousinRainActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, place: s.place.slice() }; });
    const note = () => frame.evaluate(() => document.querySelector('.cr-note').textContent);
    const r = C.round('l1', 0);
    await click('.cr-check'); let s = await st();
    is(s.misses === 0 && sp(await note()) === sp(STR.hMeadow[loc]), `[${loc} @${w}] things on the grass: the hint, no miss`);
    await put(0, 0); await put(1, 0);
    is(await frame.evaluate(() => { const c = document.querySelector('.cr-basket[data-b="0"] .cr-cousin'); return c && c.getAttribute('data-cousin'); }) === r.cousin.animal, `[${loc} @${w}] a dog and a cat rain the ${r.cousin.animal}`);
    await put(2, 0); await put(3, 1);
    await click('.cr-check'); s = await st();
    is(s.misses === 1 && s.last === 'mixed' && await frame.evaluate(() => document.querySelectorAll('.cr-basket[data-b="0"] .cr-fam').length) === 2, `[${loc} @${w}] a mixed basket: the cloud splits into two families`);
    await put(2, 1); await click('.cr-check'); s = await st();
    const msg = sp(await note());
    is(s.done && msg === sp(C.success(loc, { r })), `[${loc} @${w}] success: «${msg}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-cousin-rain: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
