#!/usr/bin/env node
/* =====================================================================
   live-verify-acorn-sieve.js — drives Tally's Acorn Baskets (The Acorn
   Sieve) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. 23 + 14, cloth off: tip both
   baskets, shake, 3 · 10 · 40 → the loose window is wrong, the cups count
   10 20 30, the first hint; 3 · 7 · 37 → solved, the success line.
   Every one of the 11 pages returns 200; the wrapper version is
   page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-acorn-sieve.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '144-acorn-sieve', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'tally-squirrel-activities.json'), 'utf8')).find(x => x.id === 'tally-squirrel.add-four.2-nbt-b-6');
const C = require(path.join(MT, 'acorn-sieve-core.js'));
const ACT = (() => { const ctx = { window: {}, AcornSieveCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'acorn-sieve-activity.js'), 'utf8') + ';this.__A = window.AcornSieveActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
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
    await page.waitForSelector('iframe[src*="acorn-sieve-activity.html"]', { timeout: 45000 }).catch(() => null);
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 30000 }).catch(() => {}); await wait(1500);
    const frameEl = await page.$('iframe[src*="acorn-sieve-activity.html"]');
    is(!!frameEl, `[${loc} @${w}] the page embeds acorn-sieve-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.AcornSieveActivity && window.AcornSieveActivity.st && document.querySelector('.as-wrap'), { timeout: 45000 });
    await frame.evaluate(() => { const a = window.AcornSieveActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.baskets = 'four'; a.api.settings.cloth = 'off'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
    const click = async (k) => { const sel = '[data-k="' + k + '"]', e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(100); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(90); };
    const note = () => frame.evaluate(() => document.querySelector('.as-note').textContent);
    for (const k of ['tub-0', 'tub-1', 'grip', 'win-cups', 'key-3', 'win-loose', 'key-1', 'key-0', 'win-all', 'key-4', 'key-0', 'check']) await click(k);
    const s1 = await frame.evaluate(() => { const st = window.AcornSieveActivity.st; return { cups: st.cups, tray: st.tray, misses: st.misses, labels: [...document.querySelectorAll('.as-sieve .as-labt')].map(e => e.textContent).join() }; });
    is(s1.cups === 3 && s1.tray === 7 && s1.misses === 1 && s1.labels === '10,20,30' && sp(await note()) === sp(T(loc, 'hintCount')), `[${loc} @${w}] 3 · 10 · 40 → 3 cups, 7 loose, the cups count 10 20 30, «${sp(await note())}»`);
    for (const k of ['win-loose', 'key-del', 'key-del', 'key-7', 'win-all', 'key-del', 'key-del', 'key-3', 'key-7', 'check']) await click(k);
    const line = T(loc, 'okFour', { list: '23 + 14', total: 37, t: 3, o: 7 });
    is(await frame.evaluate(() => window.AcornSieveActivity.st.done) && sp(await note()) === sp(line), `[${loc} @${w}] 3 · 7 · 37 → «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-acorn-sieve: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
