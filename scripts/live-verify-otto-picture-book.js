#!/usr/bin/env node
/* =====================================================================
   live-verify-otto-picture-book.js — drives Otto's proof pins (Otto's
   Picture Book) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. The boat story, two
   sentences: both strips tapped onto wrong panels and checked → the
   words those panels do not show dangle, the hint (a miss); the strips
   tapped onto their panels → every pin sticks, the success text. Then
   True or false? on the elephant and the mouse: the wrong answer → the
   hint; the right answer → the success text. The wrapper version is the
   one in page.tsx; the iframe grows with the card; every locale's page
   returns 200.
   Usage: node scripts/live-verify-otto-picture-book.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '067-proof-pins', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'otto-picture-book-activities.json'), 'utf8')).find(r => r.id === 'otto-picture-book.which-picture.rl-k-7');
const C = require(path.join(MT, 'otto-pins-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, OttoPinsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'otto-picture-book-activity.js'), 'utf8') + ';this.__A = OttoPictureBookActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
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
    const frameEl = await page.waitForSelector('iframe[src*="otto-picture-book-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds otto-picture-book-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.OttoPictureBookActivity && window.OttoPictureBookActivity.st && window.OttoPinsCore && document.querySelector('.op-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); await frame.waitForFunction(() => !window.OttoPictureBookActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(150); };
    const st = () => frame.evaluate(() => { const s = window.OttoPictureBookActivity.st; return JSON.parse(JSON.stringify({ docks: s.docks, misses: s.misses, done: s.done })); });
    const note = () => frame.evaluate(() => document.querySelector('.op-note').textContent);
    const force = (task, key) => frame.evaluate((task, key) => { const a = window.OttoPictureBookActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.task = task; a.api.settings.parts = 'two'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.story === key || x.key === key); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, task, key);
    const bubbleHas = async (key) => { await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {}); const b = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; }); return b && !/\{\w+\}/.test(b) && b.includes(STR[key][loc]); };
    /* the boat story, two sentences: strip 1 → panel 3, strip 2 → panel 4 */
    const r = C.rounds(loc, 'which', true).find(x => x.story === 'boat');
    await force('which', 'boat'); await wait(800);
    for (let k = 0; k < 2; k++) { await tap(`[data-strip="${k}"]`); await tap(`[data-panel="${(r.strips[k].target + 1) % 4}"]`); }
    await tap('.op-check'); let s = await st();
    const dang = await frame.evaluate(() => document.querySelectorAll('.op-word.is-dangle').length);
    is(s.misses === 1 && dang >= 1 && (await note()) === STR.hintWhich[loc], `[${loc} @${w}] both strips on wrong panels — ${dang} word(s) dangle, the hint, a miss`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await frame.evaluate(() => { window.OttoPictureBookActivity.OK_MS = 0; });
    for (let k = 0; k < 2; k++) { await tap(`[data-strip="${k}"]`); await tap(`[data-panel="${r.strips[k].target}"]`); }
    await tap('.op-check'); await wait(500); s = await st();
    is(s.done && JSON.stringify(s.docks) === JSON.stringify(r.strips.map(x => x.target)), `[${loc} @${w}] the strips on their panels — every pin sticks`);
    is(await bubbleHas('okWhich'), `[${loc} @${w}] the success text`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    /* True or false? — the elephant and the mouse (the two-part sentence is false) */
    const t = C.rounds(loc, 'tf', true).find(x => x.key === 'tf8');
    await force('tf', 'tf8'); await wait(800);
    await tap(`[data-tf="${t.truth ? 0 : 1}"]`); await tap('.op-check'); s = await st();
    is(s.misses === 1 && (await note()) === STR.hintTF[loc], `[${loc} @${w}] true or false: the wrong answer — the hint`);
    await frame.evaluate(() => { window.OttoPictureBookActivity.OK_MS = 0; });
    await tap(`[data-tf="${t.truth ? 1 : 0}"]`); await tap('.op-check'); await wait(500); s = await st();
    is(s.done && await bubbleHas(t.truth ? 'okTrue' : 'okFalse'), `[${loc} @${w}] true or false: the right answer — the success text`);
    await wait(3000);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-otto-picture-book: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
