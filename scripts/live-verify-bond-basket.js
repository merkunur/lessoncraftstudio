#!/usr/bin/env node
/* =====================================================================
   live-verify-bond-basket.js — drives Find the Total (The Covered Basket)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. 8 + 3: the 8 is poured under the cloth (the
   tag says 8), the 3 are posted one by one (the tag still says 8), 10 is a
   miss that counts on 9, 10, 11, then 11 succeeds. Every locale's page returns 200, the wrapper
   version is page.tsx's, the pictures load, the iframe grows with the card.
   Usage: node scripts/live-verify-bond-basket.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '081-bond-basket', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'number-bond-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'numberbond.find-the-total.1-oa-a-1'); })();
const C = require(path.join(MT, 'bond-basket-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, BondBasketCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'bond-basket-activity.js'), 'utf8') + ';this.__A = BondBasketActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="bond-basket-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds bond-basket-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.BondBasketActivity && window.BondBasketActivity.st && document.querySelector('.bb-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.BondBasketActivity; a.OK_MS = 600000; a.api.settings.task = 'total'; a.api.settings.coat = 'pictures'; a._pool = null; a._ensurePool(); a._start(4); a._render2(); });
    await frame.waitForFunction(() => { const im = [...document.querySelectorAll('.bb-wrap img.bb-pic')]; return im.length >= 3 && im.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const im = [...document.querySelectorAll('.bb-wrap img.bb-pic')]; return im.length >= 3 && im.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] the pictures load`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(450);
    };
    const st = () => frame.evaluate(() => { const s = window.BondBasketActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, under: s.under, posted: s.posted }; });
    const note = () => frame.evaluate(() => document.querySelector('.bb-note').textContent);
    const tagNow = () => frame.evaluate(() => { const e = document.querySelector('.bb-cloth .bb-tag'); return e ? e.textContent : null; });
    await click('.bb-bowl[data-side="L"]'); await wait(2200);
    is((await tagNow()) === '8', `[${loc} @${w}] the 8 is poured under the cloth, the tag says 8`);
    for (let k = 0; k < 3; k++) await click('.bb-bowl[data-side="R"]');
    let s = await st(); is(s.posted === 3 && (await tagNow()) === '8', `[${loc} @${w}] three posted, the tag still says 8`);
    await click('[data-k="key-1"]'); await click('[data-k="key-0"]'); await click('[data-k="key-ok"]'); s = await st();
    is(s.misses === 1 && (await frame.evaluate(() => [...document.querySelectorAll('.bb-arcn')].map(e => e.textContent).join(','))) === '9,10,11', `[${loc} @${w}] 10 is a miss that counts on 9, 10, 11`);
    await click('[data-k="key-del"]'); await click('[data-k="key-del"]'); await click('[data-k="key-1"]'); await click('[data-k="key-1"]'); await click('[data-k="key-ok"]'); s = await st();
    const msg = sp(await note());
    is(s.done && msg === sp(STR.okTotal[loc].replace('{a}', 8).replace('{b}', 3).replace('{total}', 11).replace('{first}', 8)), `[${loc} @${w}] 11: «${msg}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-bond-basket: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
