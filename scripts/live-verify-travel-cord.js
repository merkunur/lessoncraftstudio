#!/usr/bin/env node
/* =====================================================================
   live-verify-travel-cord.js — drives The Faraway Shelf (The Travelling
   Cord) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the
   real activity page, real pointer. L1 with its default places: tap the
   basket, tap red → its tag says longer; the cord to blue and green; choose blue → Check → a miss and
   all three tags; choose red → Check → okLong. Every locale page (11)
   returns 200, the wrapper version is page.tsx, Tilly loads, the iframe
   grows with the card.
   Usage: node scripts/live-verify-travel-cord.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '099-travel-cord', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'travel-cord-activities.json'), 'utf8')).find(r => r.id === 'seriation.compare-length.1-md-a-1');
const C = require(path.join(MT, 'travel-cord-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, TravelCordCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'travel-cord-activity.js'), 'utf8') + ';this.__A = TravelCordActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const CAP = (s) => s.charAt(0).toUpperCase() + s.slice(1);
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
    const frameEl = await page.waitForSelector('iframe[src*="travel-cord-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds travel-cord-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TravelCordActivity && window.TravelCordActivity.st && document.querySelector('.tc-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.TravelCordActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.question = 'mixed'; a.api.settings.things = 'ribbons'; a._pool = null; a._ensurePool(); a._start('L1', 0); a.st.r.items.forEach(x => { a.st.lay.place[x.id] = x.home; a.st.lay.off[x.id] = 0; }); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.TravelCordActivity.st; return { done: s.done, misses: s.misses, tags: Object.assign({}, s.tags), carrying: s.carrying }; });
    const note = () => frame.evaluate(() => document.querySelector('.tc-note').textContent);
    await frame.waitForFunction(() => { const i = document.querySelector('.tc-cat'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = document.querySelector('.tc-cat'); return !!(i && i.naturalWidth > 0); }), `[${loc} @${w}] Tilly (a library picture) loads`);
    await click('[data-k="cord"]'); let s = await st();
    is(s.carrying, `[${loc} @${w}] the basket hands over the cord`);
    await click('[data-k="thing-red"]'); s = await st();
    is(s.tags.red === 'long' && sp(await note()) === sp(T(loc, 'tagNote', { name: CAP(ACT.RIBBON[loc].red), tag: T(loc, 'tagLong') })), `[${loc} @${w}] red: «${await note()}»`);
    for (const id of ['blue', 'green']) { await click('[data-k="cord"]'); await click('[data-k="thing-' + id + '"]'); }
    await click('[data-k="thing-blue"]'); await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && Object.keys(s.tags).length === 3 && sp(await note()) === sp(T(loc, 'hintLong')), `[${loc} @${w}] blue → a miss, three tags, «${await note()}»`);
    await click('[data-k="thing-red"]'); await click('[data-k="check"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okLong', { Rib: CAP(ACT.RIBBON[loc].red) })), `[${loc} @${w}] red → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-travel-cord: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
