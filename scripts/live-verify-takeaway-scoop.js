#!/usr/bin/env node
/* =====================================================================
   live-verify-takeaway-scoop.js — drives Tuck Breaks a Ten (The Take-Away
   Scoop) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. 342 − 5: the scoop refused with
   empty cups, a ten snapped, the scoop lifts five → 3 flats, 3 rods,
   7 cubes; 327 → the tens box wrong, the first hint; 337 → solved, the
   success line. Every one of the 11 pages returns 200; the
   wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-takeaway-scoop.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '147-takeaway-scoop', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'place-value-regroup-activities.json'), 'utf8')).find(x => x.id === 'place-value-regroup.subtract-decompose.2-nbt-b-7');
const C = require(path.join(MT, 'takeaway-scoop-core.js'));
const ACT = (() => { const ctx = { window: {}, TakeawayScoopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'takeaway-scoop-activity.js'), 'utf8') + ';this.__A = window.TakeawayScoopActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
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
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    /* the page hydrates and can rebuild the iframe: settle, then take the iframe that is there now */
    await page.waitForSelector('iframe[src*="takeaway-scoop-activity.html"]', { timeout: 45000 }).catch(() => null);
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 30000 }).catch(() => {}); await wait(1500);
    const frameEl = await page.$('iframe[src*="takeaway-scoop-activity.html"]');
    is(!!frameEl, `[${loc} @${w}] the page embeds takeaway-scoop-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TakeawayScoopActivity && window.TakeawayScoopActivity.st && document.querySelector('.tk-wrap'), { timeout: 45000 });
    await frame.evaluate(() => { const a = window.TakeawayScoopActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.take = 'ones'; a.api.settings.written = 'hidden'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
    const click = async (k) => { const sel = '[data-k="' + k + '"]', e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(100); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(90); };
    const note = () => frame.evaluate(() => document.querySelector('.tk-note').textContent);
    await click('scoop');
    const r0 = await frame.evaluate(() => { const st = window.TakeawayScoopActivity.st; return { used: st.scoop.used, O: st.mat.O, blink: document.querySelectorAll('.tk-well.is-blink').length }; });
    is(!r0.used && r0.O === 2 && r0.blink === 3, `[${loc} @${w}] the scoop refuses with three empty cups (${JSON.stringify(r0)})`);
    await click('shelf-T'); await click('scoop');
    const s0 = await frame.evaluate(() => { const st = window.TakeawayScoopActivity.st; return { H: st.mat.H, T: st.mat.T, O: st.mat.O, used: st.scoop.used }; });
    is(s0.H === 3 && s0.T === 3 && s0.O === 7 && s0.used, `[${loc} @${w}] a ten snapped, the scoop lifts five → 3, 3, 7 (${JSON.stringify(s0)})`);
    for (const k of ['key-3', 'key-2', 'key-7', 'check']) await click(k);
    const s1 = await frame.evaluate(() => { const st = window.TakeawayScoopActivity.st; return { misses: st.misses, wrong: st.verdict && st.verdict.wrongs.join() }; });
    is(s1.misses === 1 && s1.wrong === 'T' && sp(await note()) === sp(T(loc, 'hintCount')), `[${loc} @${w}] 327 → the tens box wrong, «${sp(await note())}»`);
    for (const k of ['key-del', 'key-del', 'key-3', 'key-7', 'check']) await click(k);
    const line = T(loc, 'okTen', { a: 342, b: 5, c: 337 });
    is(await frame.evaluate(() => window.TakeawayScoopActivity.st.done) && sp(await note()) === sp(line), `[${loc} @${w}] 337 → «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-takeaway-scoop: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
