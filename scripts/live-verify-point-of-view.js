#!/usr/bin/env node
/* =====================================================================
   live-verify-point-of-view.js — drives Lumen's Lighthouse Windows (The
   Window That Shows What It Sees) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): the real activity page, real pointer. The
   whale round: the low window shows the whale huge and cut off → Check →
   the view hint; the high window shows a dot → Check → the success line
   naming the creature. Every one of the 11 pages returns 200; the wrapper
   version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-point-of-view.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '119-window-shows-what-it-sees', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'point-of-view-activities.json'), 'utf8')).find(x => x.id === 'point-of-view.who-told.rl-1-6');
const C = require(path.join(MT, 'point-of-view-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, LumenWindowsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'point-of-view-activity.js'), 'utf8') + ';this.__A = window.PointOfViewActivity;', ctx); return ctx.__A; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="point-of-view-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds point-of-view-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PointOfViewActivity && window.PointOfViewActivity.st && document.querySelector('.pv-foot .pv-check'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.PointOfViewActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.task = 'window'; a.api.settings.views = 'after'; a._pool = null; a._ensurePool(); a._start(3, 0); a._view.note = ''; a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(200); };
    const st = () => frame.evaluate(() => { const s = window.PointOfViewActivity.st; return { sel: s.sel, last: s.last, done: s.done, misses: s.misses }; });
    const note = () => frame.evaluate(() => document.querySelector('.pv-note').textContent);
    const R = C.round1(loc, 3);
    await click('[data-k="win-low"]');
    const low = await frame.evaluate(() => { const v = document.querySelector('.pv-view.kind-panel'), im = v && v.querySelector('img'); return !!(im && im.getBoundingClientRect().bottom > v.getBoundingClientRect().bottom + 4); });
    await click('[data-k="check"]'); await wait(300); let s = await st();
    is(low && s.misses === 1 && sp(await note()) === sp(T(loc, 'hintL1Miss1')), `[${loc} @${w}] the low window shows the whale huge and cut off; Check → «${sp(await note())}»`);
    await click('[data-k="win-high"]');
    const dot = await frame.evaluate(() => !!document.querySelector('.pv-view.kind-panel .pv-dot') && !document.querySelector('.pv-view.kind-panel img'));
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.PointOfViewActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    is(dot && s.done && sp(await note()) === sp(T(loc, 'okHigh', { name: C.name(loc, R.chars.high) })), `[${loc} @${w}] the high window shows a dot; Check → «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-point-of-view: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
