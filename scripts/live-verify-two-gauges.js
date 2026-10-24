#!/usr/bin/env node
/* =====================================================================
   live-verify-two-gauges.js — drives Fixit's Fix-It Corner (The Two
   Gauges) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. To 20, 6 + 6 = □ + 4: at rest the
   left needle on 12; 10 from the pad and the lever — the right needle
   sweeps to 14 (hGap); 8 — both gauges agree (okBal). Every locale's page
   returns 200, the wrapper version is page.tsx's, the gadget loads, the
   iframe grows with the card.
   Usage: node scripts/live-verify-two-gauges.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '089-two-gauges', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'fix-it-corner-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'fix-it-corner.missing-part.1-oa-d-8'); })();
const C = require(path.join(MT, 'two-gauges-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, TwoGaugesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'two-gauges-activity.js'), 'utf8') + ';this.__A = TwoGaugesActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="two-gauges-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds two-gauges-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TwoGaugesActivity && window.TwoGaugesActivity.st && document.querySelector('.tg-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.TwoGaugesActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.numbers = '20'; a.api.settings.path = 'help'; a._pool = null; a._ensurePool(); a._start(5, 5, 3); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.TwoGaugesActivity.st; return { done: s.done, misses: s.misses, value: s.value }; });
    const note = () => frame.evaluate(() => document.querySelector('.tg-note').textContent);
    const degs = () => frame.evaluate(() => [...document.querySelectorAll('.tg-needle')].map(n => +n.getAttribute('data-deg')));
    await frame.waitForFunction(() => { const i = document.querySelector('.tg-gimg'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = document.querySelector('.tg-gimg'); return !!i && i.naturalWidth > 0; }), `[${loc} @${w}] the gadget (a library picture) loads`);
    let d = await degs(); is(d[0] === 297 && d[1] === 135, `[${loc} @${w}] 6 + 6 = □ + 4 at rest: the left needle on 12, the right on 0 (${d})`);
    await click('[data-k="socket"]'); await click('[data-k="key-10"]'); await click('[data-k="lever"]'); let s = await st(); d = await degs();
    is(s.misses === 1 && d[1] === 324 && sp(await note()) === sp(T(loc, 'hGap')), `[${loc} @${w}] 10 sweeps the right needle to 14: «${await note()}»`);
    await click('[data-k="socket"]'); await click('[data-k="key-8"]'); await click('[data-k="lever"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okBal', { eq: '6 + 6 = 8 + 4', s: 12 })), `[${loc} @${w}] 8 balances both gauges: «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-two-gauges: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
