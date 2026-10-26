#!/usr/bin/env node
/* =====================================================================
   live-verify-bea-two-bookshelves.js — drives Bea's Two Bookshelves (The
   Shaker Shelf and the Ribbon Shelf) ON PRODUCTION in en, de, sv and fi
   (desktop 1366 + phone 390): the real activity page, real pointer. Bea
   asks, round five: a wrong book opened (its pages in order) and put on
   the asked shelf → Check → the shelf's own hint, the book back on the
   desk; the right book → Check → the success line naming it, the spine
   band. Every one of the 11 pages returns 200; the wrapper version is
   page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-bea-two-bookshelves.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '118-shaker-shelf-ribbon-shelf', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'bea-two-bookshelves-activities.json'), 'utf8')).find(x => x.id === 'bea-two-bookshelves.story-or-fact.rl-1-5');
const C = require(path.join(MT, 'bea-two-bookshelves-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, BeaShelvesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'bea-two-bookshelves-activity.js'), 'utf8') + ';this.__A = window.BeaTwoBookshelvesActivity;', ctx); return ctx.__A; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="bea-two-bookshelves-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds bea-two-bookshelves-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.BeaTwoBookshelvesActivity && window.BeaTwoBookshelvesActivity.st && document.querySelector('.bs-foot .bs-check'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.BeaTwoBookshelvesActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.books = 'ask'; a.api.settings.pages = 'closed'; a._pool = null; a._ensurePool(); a._slots = null; a._start(4, 0); a._view.note = ''; a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel, corner) => frame.evaluate((s, c) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return c ? { x: r.left + 18, y: r.top + 16 } : { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, corner);
    const click = async (sel, corner) => { const e = await xy(sel, corner); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const e2 = await xy(sel, corner), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(200); };
    const st = () => frame.evaluate(() => { const s = window.BeaTwoBookshelvesActivity.st; return { desk: s.desk, ask: s.ask, right: s.right, place: s.place, last: s.last, done: s.done }; });
    const note = () => frame.evaluate(() => document.querySelector('.bs-note').textContent);
    let s = await st(); const sh = s.ask === 'story' ? 'ribbon' : 'shaker', wrong = s.desk.find(id => id !== s.right);
    await click(`[data-k="cover-${wrong}"]`);
    const pg = await frame.evaluate(() => [...document.querySelectorAll('.bs-open .bs-page .bs-s')].map(e => e.textContent));
    is(pg.length === 3 && sp(pg[0]) === sp(C.book(loc, wrong).p[0].s), `[${loc} @${w}] the cover opens to its three pages in order`);
    await click(`[data-k="shelf-${sh}"]`, true); await click('[data-k="check"]'); await wait(300); s = await st();
    const hk = sh === 'shaker' ? 'hintStoryOnShaker' : 'hintFactOnRibbon';
    is(s.last === (sh === 'shaker' ? 'storyOnShaker' : 'factOnRibbon') && !s.place[wrong] && sp(await note()) === sp(T(loc, hk)), `[${loc} @${w}] the wrong book fails the shelf's test → «${sp(await note())}», back on the desk`);
    await click(`[data-k="cover-${s.right}"]`); await click(`[data-k="shelf-${sh}"]`, true); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.BeaTwoBookshelvesActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    const br = C.book(loc, s.right);
    is(s.done && sp(await note()) === sp(T(loc, br.kind === 'story' ? 'okStory' : 'okFact', { title: br.t })) && await frame.evaluate(() => !!document.querySelector('.bs-mini.is-good')), `[${loc} @${w}] the right book → «${sp(await note())}», the spine band`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-bea-two-bookshelves: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
