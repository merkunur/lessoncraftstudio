#!/usr/bin/env node
/* =====================================================================
   live-verify-mending-basket.js — drives Granny's Mending Basket (The
   Thread That Snaps) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): the real activity page, real pointer. Fill the gap, first
   round: a wrong piece tapped into the hole → Check → the locale's
   hintSnap and the thread in two frayed halves; the answer → Check → the
   thread held, the page healed. Every one of the 11 pages returns 200; the wrapper version is page.tsx's; the iframe
   grows with the card.
   Usage: node scripts/live-verify-mending-basket.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '115-thread-that-snaps', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'mending-basket-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'mending-basket-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, MendingBasketCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'mending-basket-activity.js'), 'utf8') + ';this.__A = MendingBasketActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="mending-basket-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds mending-basket-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.MendingBasketActivity && window.MendingBasketActivity.st && document.querySelector('.mb-foot'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.MendingBasketActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.clue = 'fill'; a._pool = null; a._ensurePool(); a._pos = [2]; a._start(0, 0); a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const o = await off(); await page.mouse.click(o.x + e.x, o.y + e.y); await wait(200); };
    const st = () => frame.evaluate(() => { const s = window.MendingBasketActivity.st; return { pieces: s.pieces, right: s.right, R: s.R, last: s.last, done: s.done }; });
    const note = () => frame.evaluate(() => document.querySelector('.mb-note').textContent);
    let s = await st(); const wrong = s.pieces.findIndex(p => p !== s.R.ans);
    await click(`[data-k="piece-${wrong}"]`); await click('[data-k="check"]'); await wait(300); s = await st();
    is(s.last === 'snap' && sp(await note()) === sp(T(loc, 'hintSnap', { a: C.word(s.R.tok, s.R.key), b: s.pieces[wrong] })) && await frame.evaluate(() => document.querySelectorAll('.mb-thread .mb-snapped').length === 2), `[${loc} @${w}] ${s.pieces[wrong]} → «${sp(await note())}», the thread snapped`);
    await click(`[data-k="piece-${s.right}"]`); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.MendingBasketActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && await frame.evaluate(() => document.querySelectorAll('.mb-thread .mb-held').length === 1 && !!document.querySelector('.mb-page.is-healed')), `[${loc} @${w}] → «${sp(await note())}», the thread held, the page healed`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-mending-basket: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
