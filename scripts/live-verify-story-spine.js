#!/usr/bin/env node
/* =====================================================================
   live-verify-story-spine.js — drives the book that cracks and mends
   (Dot's Story Spine) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): the real activity page, real pointer. Name the parts: the
   stud with no tabs asks (no miss); the TROUBLE and FIX tabs swapped stop
   the reading at the trouble tab (miss); the right tabs read through — the
   pennant, the sealed crack, the ribbon, the book on the shelf, the
   success text filled. Find the trouble: the calm page lies flat (miss);
   the right page reads through. The wrapper version is the one in
   page.tsx; the iframe grows with the card; every locale's page returns
   200.
   Usage: node scripts/live-verify-story-spine.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '065-story-book', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'story-spine-activities.json'), 'utf8')).find(r => r.id === 'story-spine.role.rl-k-3');
const C = require(path.join(MT, 'story-spine-book-core.js'));
const OKWIN = (() => { const vm = require('vm'); const ctx = { window: {}, StorySpineBookCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'story-spine-activity.js'), 'utf8') + ';this.__A = StorySpineActivity;', ctx); return ctx.__A.strings.okWin; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="story-spine-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds story-spine-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.StorySpineActivity && window.StorySpineActivity.st && document.querySelector('.ssb-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(200); };
    const read = async () => { await tap('[data-k="check"]'); await frame.waitForFunction(() => !window.StorySpineActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.StorySpineActivity.st; return JSON.parse(JSON.stringify({ slots: s.slots, tabs: s.tabs, misses: s.misses, done: s.done, last: s.last })); });
    const force = (task, story) => frame.evaluate((task, story) => { const a = window.StorySpineActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.task = task; a.api.settings.words = 'shown'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.story === story); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, task, story);

    /* Name the parts: the kite */
    const r = C.rounds(loc, 'name').find(x => x.story === 'kite'), ids = r.pages.map(p => p.id);
    await force('name', 'kite'); await wait(800);
    await read(); let s = await st();
    is(s.misses === 0 && s.last && s.last.reason === 'empty', `[${loc} @${w}] the stud with no tabs asks (no miss)`);
    for (const [role, id] of [['start', ids[0]], ['trouble', ids[2]], ['fix', ids[1]]]) { await tap(`.ssb-tray [data-tab="${role}"]`); await tap(`.ssb-table [data-page="${id}"]`); }
    await read(); s = await st();
    is(s.misses === 1 && s.last.role === 'trouble', `[${loc} @${w}] the trouble and fix tabs swapped — the reading stops at the trouble tab (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap(`.ssb-table [data-page="${ids[2]}"] .ssb-tab`); await tap(`.ssb-table [data-page="${ids[1]}"]`);
    await frame.evaluate(() => { window.StorySpineActivity.OK_MS = 0; });
    await read(); await wait(500); s = await st();
    const m = await frame.evaluate(() => ({ pen: !!document.querySelector('[data-slot="0"] .ssb-pennant'), sealed: !!document.querySelector('[data-slot="1"] .ssb-crack.is-sealed'), tabs: document.querySelectorAll('.ssb-rtab').length, shelf: document.querySelectorAll('.ssb-spine').length }));
    is(s.done && m.pen && m.sealed && m.tabs === 3 && m.shelf >= 1, `[${loc} @${w}] the right tabs read through — the pennant, the sealed crack, the ribbon, the book on the shelf`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(OKWIN[loc]), `[${loc} @${w}] the success text is filled («${bubble}»)`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });

    /* Find the trouble: the nest */
    const t = C.rounds(loc, 'trouble').find(x => x.story === 'nest');
    await force('trouble', 'nest'); await wait(800);
    await tap(`.ssb-table [data-page="${t.cands[1].id}"]`); await tap('[data-slot="1"]'); await read(); s = await st();
    is(s.misses === 1 && s.last.reason === 'no-crack', `[${loc} @${w}] the calm page lies flat (miss)`);
    await tap(`.ssb-table [data-page="${t.cands[0].id}"]`); await tap('[data-slot="1"]');
    await frame.evaluate(() => { window.StorySpineActivity.OK_MS = 0; });
    await read(); await wait(500); s = await st();
    is(s.done, `[${loc} @${w}] the right trouble page reads through`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-trouble.png`) });
    await wait(3000); /* the shell grows the iframe after the success bubble settles */
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-story-spine: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
