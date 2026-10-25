#!/usr/bin/env node
/* =====================================================================
   live-verify-one-piece-stamp.js — drives Make Equal Parts (The One-Piece
   Stamp) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. Square fourths: the off-centre
   cross DRAGGED from dot to dot; Check → the locale's hint, the stamp
   hangs over a piece in coral; a fresh round: the fair cross dragged, a
   glass stamp lifted by a tap and DRAGGED onto a copy (number 2); Check →
   the locale's success line, 1/4 on every piece. Every locale page (11)
   returns 200; the wrapper version is page.tsx's; the iframe grows with
   the card.
   Usage: node scripts/live-verify-one-piece-stamp.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '108-one-piece-stamp', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'one-piece-stamp-activities.json'), 'utf8')).find(r => r.id === 'fractions.partition-equal-shares.1-g-a-3');
const C = require(path.join(MT, 'one-piece-stamp-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, OnePieceStampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'one-piece-stamp-activity.js'), 'utf8') + ';this.__A = OnePieceStampActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
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
    await page.close(); await wait(300);
  }
  is(Object.keys(ROW.slug).length === 11, 'the row has all 11 locales');
  const R = C.DATA.L1[1];
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="one-piece-stamp-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds one-piece-stamp-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.OnePieceStampActivity && window.OnePieceStampActivity.st && document.querySelector('.ops-mat'), { timeout: 30000 });
    const fresh = () => frame.evaluate(() => { const a = window.OnePieceStampActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'hf'; a.api.settings.marks = 'off'; a.api.settings.stamp = 'hand'; a._pool = null; a._ensurePool(); a._start(1, 0); a._render2(); });
    await fresh();
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    /* page coordinates of a model point on the mat, the mat scrolled into view first */
    const at = async (m) => { const r0 = await frame.evaluate(() => { const r = document.querySelector('.ops-mat').getBoundingClientRect(); return { top: r.top, h: r.height }; }); const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + r0.top + r0.h / 2); await wait(150); const o = await frameOff(); const r = await frame.evaluate(() => { const r = document.querySelector('.ops-mat').getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; }); return { x: o.x + r.l + m[0] / 100 * r.w, y: o.y + r.t + m[1] / 100 * r.h }; };
    const drag = async (m1, m2) => { const a = await at(m1), b = await at(m2); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await wait(15); } await page.mouse.up(); await wait(250); };
    const tap = async (m) => { const p = await at(m); await page.mouse.click(p.x, p.y); await wait(250); };
    const piece = (i) => frame.evaluate((i) => { const p = window.OnePieceStampActivity.st.pieces[i]; return [p.cx, p.cy]; }, i);
    const check = async () => { const e = await frame.evaluate(() => { const b = document.querySelector('[data-k="check"]'); const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 350, behavior: 'instant' }), o0.y + e.y); await wait(150); const o = await frameOff(); await page.mouse.click(o.x + e.x, o.y + e.y); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.OnePieceStampActivity.st; return { cuts: s.cuts.length, pieces: s.pieces.length, tokens: Object.keys(s.tokens).length, done: s.done, misses: s.misses }; });
    const note = () => frame.evaluate(() => document.querySelector('.ops-note').textContent);
    for (const c of R[4]) await drag(c.a, c.b);
    let s = await st(); is(s.cuts === 2 && s.pieces === 4, `[${loc} @${w}] the off-centre cross dragged from dot to dot → four pieces`);
    await check(); s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintUneq')) && await frame.evaluate(() => document.querySelectorAll('.ops-over').length === 1), `[${loc} @${w}] Check → «${sp(await note())}», the stamp hangs over a piece in coral`);
    await fresh();
    for (const c of R[3]) await drag(c.a, c.b);
    await tap(await piece(0)); await drag(await piece(0), await piece(3)); s = await st();
    is(s.tokens === 2, `[${loc} @${w}] the glass stamp lifted by a tap and dragged onto a copy → number 2`);
    await check();
    await frame.waitForFunction(() => window.OnePieceStampActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    const okLine = sp(await note()), labels = await frame.evaluate(() => document.querySelectorAll('.ops-plabel').length);
    is(s.done && okLine === sp(T(loc, 'ok4')) && labels === 4, `[${loc} @${w}] → «${okLine}», 1/4 on every piece`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-one-piece-stamp: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
