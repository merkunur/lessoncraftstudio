#!/usr/bin/env node
/* =====================================================================
   live-verify-capped-mat.js — drives "Hundreds, Tens, and Ones" (The
   Capped Mat, #149) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): the real activity page, real pointer.
     Build (round 1): one ten too many → the caps drop and read the
     build, the first hint; the right build → done, the lid.
     Read (307): caps 3 and 7, the tens bare → the fold, the hint quotes
     307 and 37; the 0 cap → done.
   Every one of the 11 pages returns 200; the wrapper version is
   page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-capped-mat.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const QA = require('./lib/qa-header'); /* passes Cloudflare's bot check with the secret QA header (our host only) */
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '149-capped-mat', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'place-value-activities.json'), 'utf8')).find(x => x.id === 'place-value.hundreds-tens-and-ones.2-nbt-a-1');
const C = require(path.join(MT, 'capped-mat-core.js'));
const ACT = (() => { const ctx = { window: {}, CappedMatCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'capped-mat-activity.js'), 'utf8') + ';this.__A = CappedMatActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
const dig = (n) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 });
const READ_K = C.rounds('read').findIndex(r => r.n === 307);
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage(); await QA.apply(page);
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage(); await QA.apply(page);
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    if (!(await page.waitForSelector('iframe[src*="capped-mat-activity.html"]', { timeout: 45000 }).catch(() => null))) { await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForSelector('iframe[src*="capped-mat-activity.html"]', { timeout: 45000 }).catch(() => null); }
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 30000 }).catch(() => {}); await wait(1500);
    const frameEl = await page.$('iframe[src*="capped-mat-activity.html"]');
    is(!!frameEl, `[${loc} @${w}] the page embeds capped-mat-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.CappedMatActivity && window.CappedMatActivity.st && document.querySelector('.cm-wrap'), { timeout: 45000 });
    const use = (job, k) => frame.evaluate((job, k) => { const a = window.CappedMatActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.job = job; a.api.settings.blocks = 'tidy'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, job, k);
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
    const click = async (k) => { const sel = '[data-k="' + k + '"]', e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(100); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(90); };
    const note = () => frame.evaluate(() => document.querySelector('.cm-note').textContent);
    const S = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.CappedMatActivity.st)));
    /* Build */
    await use('build', 1);
    const n = (await S()).round.n, d = dig(n), wrong = Object.assign({}, d, { t: d.t === 9 ? 8 : d.t + 1 });
    for (const p of ['h', 't', 'o']) for (let i = 0; i < wrong[p]; i++) await click('add-' + p);
    await click('check');
    let s = await S();
    is(s.verdict && s.verdict.kind === 'wrongBuild' && s.caps.t === wrong.t && sp(await note()) === sp(T(loc, 'hintBuildLook', { n, built: '' + wrong.h + wrong.t + wrong.o })), `[${loc} @${w}] a wrong build: the caps read it, «${sp(await note())}»`);
    await click(wrong.t > d.t ? 'rem-t' : 'add-t'); await click('check');
    s = await S();
    is(s.done && !!(await frame.$('.cm-lid')), `[${loc} @${w}] the right build closes the lid on ${n}`);
    await wait(900);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-build-done.png`) });
    /* Read 307 */
    await use('read', READ_K);
    for (const k of ['seat-h', 'cap-3', 'seat-o', 'cap-7', 'check']) await click(k);
    s = await S();
    is(s.verdict && s.verdict.kind === 'zeroFold' && sp(await note()) === sp(T(loc, 'hintZeroFold', { n: 307, fold: '37' })), `[${loc} @${w}] the bare tens folds 307 into 37: «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-fold.png`) });
    for (const k of ['seat-t', 'cap-0', 'check']) await click(k);
    is((await S()).done, `[${loc} @${w}] the 0 cap closes 307`);
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-capped-mat: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
