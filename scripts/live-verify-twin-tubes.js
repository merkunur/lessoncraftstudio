#!/usr/bin/env node
/* =====================================================================
   live-verify-twin-tubes.js — drives Three Ways to Show a Number (The
   Twin Tubes) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. 247, 274, 427: 247 against
   200 + 70 + 4 → the tens tubes ringed, "4 tens and 7 tens"; out; every
   number clipped by hand (numeral + word → a pair, the pair + its
   expanded form → a triple) → the round line. Every one of the 11 pages
   returns 200; the wrapper version is page.tsx's; the iframe grows with
   the card.
   Usage: node scripts/live-verify-twin-tubes.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '142-twin-tubes', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'match-pairs-activities.json'), 'utf8')).find(x => x.id === 'match-pairs.three-ways-to-show-a-number.2-nbt-a-3');
const C = require(path.join(MT, 'twin-tubes-core.js'));
const PV = (() => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'place-value-core.js'), 'utf8'), ctx); return ctx.window.PlaceValueCore; })();
const ACT = (() => { const ctx = { window: { PlaceValueCore: PV }, TwinTubesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'twin-tubes-activity.js'), 'utf8') + ';this.__A = window.TwinTubesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const CP = (loc, p, k) => T(loc, 'c' + 'HTO'[p] + (k === 0 ? '0' : k === 1 ? '1' : 'n'), { k });
const W = (loc, n) => PV._NUMBER_WORD_HELPERS[loc](n, 'cardinal');
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
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="twin-tubes-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds twin-tubes-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TwinTubesActivity && window.TwinTubesActivity.st && document.querySelector('.tt-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.TwinTubesActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.cards = 'three'; a.api.settings.nums = 'nozero'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
    const click = async (k) => { const sel = '[data-k="' + k + '"]', e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(100); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(90); };
    const note = () => frame.evaluate(() => document.querySelector('.tt-note').textContent);
    await click('n0'); await click('e1');
    const diff = T(loc, 'diffT', { a: CP(loc, 1, 4), b: CP(loc, 1, 7) });
    is(sp(await note()) === sp(diff) && (await frame.evaluate(() => document.querySelectorAll('.tt-glass.is-ring').length)) === 2, `[${loc} @${w}] 247 against 200 + 70 + 4 → «${sp(await note())}»`);
    await click('cradle-1'); await click('cradle-0');
    for (const key of [0, 1, 2]) for (const k of ['n' + key, 'w' + key, 'pair-' + key, 'e' + key]) await click(k);
    await frame.waitForFunction(() => window.TwinTubesActivity.st.done, { timeout: 15000 }).catch(() => {});
    const line = T(loc, 'okTriple', { numeral: '427', word: W(loc, 427), expanded: '400 + 20 + 7' });
    is(await frame.evaluate(() => window.TwinTubesActivity.st.done) && sp(await note()) === sp(line), `[${loc} @${w}] every number clipped by hand → «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-twin-tubes: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
