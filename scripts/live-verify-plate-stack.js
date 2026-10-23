#!/usr/bin/env node
/* =====================================================================
   live-verify-plate-stack.js — drives Daisy's Plate Stack ON PRODUCTION in
   en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. A Level-2 round: an empty Check is no miss; the second
   holder opens the slot; the wrong count is a miss; the right count and
   the right ending tile serve the order, and the bubble names the plural.
   Every locale's page returns 200, the wrapper version is page.tsx's, the
   pictures load, the iframe grows with the card.
   Usage: node scripts/live-verify-plate-stack.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '075-plate-stack', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'daisy-plate-stack-activities.json'), 'utf8')).find(r => r.id === 'daisy-plate-stack.plurals.l-k-1-c');
const C = require(path.join(MT, 'plate-stack-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, PlateStackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'plate-stack-activity.js'), 'utf8') + ';this.__A = PlateStackActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="plate-stack-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds plate-stack-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PlateStackActivity && window.PlateStackActivity.st && document.querySelector('.ps-bench'), { timeout: 30000 });
    const i = C.ids(loc, 'l2').find(x => { const r = C.round(loc, 'l2', x); return r.cls === 'end' && r.target >= 3; }), r = C.round(loc, 'l2', i);
    await frame.evaluate((i) => { const a = window.PlateStackActivity; a.OK_MS = 600000; a.api.settings.level = 'l2'; a.api.settings.answer = 'tiles'; a._pool = null; a._ensurePool(); a._start(i); a._render2(); }, i);
    await frame.waitForFunction(() => document.querySelectorAll('.ps-pic').length >= 1 && [...document.querySelectorAll('.ps-pic')].every(x => x.complete && x.naturalWidth > 0), { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => [...document.querySelectorAll('.ps-pic')].length >= 1 && [...document.querySelectorAll('.ps-pic')].every(x => x.naturalWidth > 0)), `[${loc} @${w}] the picture loads`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 30) }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(180);
    };
    const st = () => frame.evaluate(() => { const s = window.PlateStackActivity.st; return { h: s.holders, misses: s.misses, done: s.done, last: s.last && s.last.reason, word: PlateStackCore.word(s) }; });
    const note = () => frame.evaluate(() => document.querySelector('.ps-note').textContent);
    await click('.ps-check'); let s = await st();
    is(s.misses === 0 && sp(await note()) === sp(STR.hEmpty[loc]), `[${loc} @${w}] an empty Check: the hint, no miss`);
    await click('.ps-pile'); s = await st();
    is(s.h === 2 && await frame.evaluate(() => !!document.querySelector('.ps-slot.is-open')), `[${loc} @${w}] the second plate opens the slot`);
    await click('.ps-check'); s = await st();
    is(s.misses === 1 && s.last === 'count', `[${loc} @${w}] two for a ticket of ${r.target}: a miss`);
    while ((await st()).h < r.target) await click('.ps-pile');
    await click(`.ps-tile[data-tile="${r.right}"]`); await click('.ps-check'); s = await st();
    const msg = sp(await note());
    is(s.done && s.word === r.plural && msg === sp(STR.okAdd[loc].split('{w}').join(C.show(loc, r.plural))), `[${loc} @${w}] served: «${msg}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-plate-stack: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
