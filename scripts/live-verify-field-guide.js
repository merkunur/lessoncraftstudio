#!/usr/bin/env node
/* =====================================================================
   live-verify-field-guide.js — drives Detective Dewey's Field Guide (The
   Book That Only Opens Where You Send It) ON PRODUCTION in en, de, sv and
   fi (desktop 1366 + phone 390): the real activity page, real pointer.
   Contents, round one: a wrong line → the book opens that wrong page with
   hint 1; the right line → its page; its second sentence → the success
   line naming the page, the fact on Dewey's card. Every one of the 11
   pages returns 200; the wrapper version is page.tsx's; the iframe grows
   with the card.
   Usage: node scripts/live-verify-field-guide.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '121-book-that-opens-where-you-send-it', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'field-guide-activities.json'), 'utf8')).find(x => x.id === 'field-guide.text-features.1-ri-5');
const C = require(path.join(MT, 'field-guide-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, FieldGuideCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'field-guide-activity.js'), 'utf8') + ';this.__A = window.FieldGuideActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
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
    const frameEl = await page.waitForSelector('iframe[src*="field-guide-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds field-guide-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.FieldGuideActivity && window.FieldGuideActivity.st && document.querySelector('.fg-card'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.FieldGuideActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.tools = 'A'; a.api.settings.help = 'after'; a._pool = null; a._ensurePool(); a._start(0, 0); a._view.note = ''; a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.FieldGuideActivity.st; return { rd: s.rd, opened: s.opened, misses: s.misses, done: s.done }; });
    const note = () => frame.evaluate(() => document.querySelector('.fg-note').textContent);
    let s = await st(); const A = s.rd.part, wrong = C.lines(loc, s.rd).find(l => l.part !== A).part;
    await click('[data-k="line-' + wrong + '"]'); s = await st();
    is(s.opened === wrong && s.misses === 1 && sp(await note()) === sp(T(loc, 'hintLine1')), '[' + loc + ' @' + w + '] a wrong line opens the wrong page: «' + sp(await note()) + '»');
    if (w < 560) await click('[data-k="back"]');
    await click('[data-k="line-' + A + '"]'); s = await st();
    is(s.opened === A, `[${loc} @${w}] the right line opens its page`);
    await click('[data-k="sent-' + A + '-1"]');
    await frame.waitForFunction(() => window.FieldGuideActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okPage', { p: C.pageOf(A) })) && sp(await frame.evaluate(() => document.querySelector('.fg-found').textContent)) === sp(C.page(loc, A).s[1]), '[' + loc + ' @' + w + '] the fact → «' + sp(await note()) + '», on Dewey\'s card');
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-field-guide: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
