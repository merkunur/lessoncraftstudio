#!/usr/bin/env node
/* =====================================================================
   live-verify-wake-up-pip.js — drives The Flipbook (Wake Up, Pip!) ON
   PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. Story order: Flip with empty slots asks
   (no miss); the pages tapped in reverse stop the flip at slot 2 (miss);
   in order the book plays through, Pip sits up, the ribbon fills and the
   success text is filled. The missing page: the trivial page is a dead
   frame (miss); the key page plays through. The wrapper version is the
   one in page.tsx; the iframe grows with the card; every locale's page
   returns 200.
   Usage: node scripts/live-verify-wake-up-pip.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '064-flipbook', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'wake-up-pip-activities.json'), 'utf8')).find(r => r.id === 'wake-up-pip.retell-story.rl-k-2');
const C = require(path.join(MT, 'wake-up-pip-core.js'));
const OKWIN = (() => { const vm = require('vm'); const ctx = { window: {}, WakeUpPipCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'wake-up-pip-activity.js'), 'utf8') + ';this.__A = WakeUpPipActivity;', ctx); return ctx.__A.strings.okWin; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="wake-up-pip-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds wake-up-pip-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.WakeUpPipActivity && window.WakeUpPipActivity.st && document.querySelector('.wup-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(200); };
    const flip = async () => { await tap('[data-k="check"]'); await frame.waitForFunction(() => !window.WakeUpPipActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.WakeUpPipActivity.st; return JSON.parse(JSON.stringify({ sockets: s.sockets, tray: s.tray, misses: s.misses, done: s.done, last: s.last })); });
    const force = (game, story) => frame.evaluate((game, story) => { const a = window.WakeUpPipActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.game = game; a.api.settings.pages = '4'; a.api.settings.caps = 'off'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.story === story); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, game, story);

    /* Story order: the kite */
    const r = C.rounds(loc, 'order', 4).find(x => x.story === 'kite'), ids = r.pages.map(p => p.id);
    await force('order', 'kite'); await wait(800);
    await flip(); let s = await st();
    is(s.misses === 0 && s.last && s.last.result === 'empty', `[${loc} @${w}] Flip with empty slots asks (no miss)`);
    for (let i = 0; i < 4; i++) { await tap(`[data-page="${ids[3 - i]}"]`); await tap(`[data-socket="${i}"]`); }
    await flip(); s = await st();
    is(s.misses === 1 && s.last.result === 'backwards' && s.last.at === 1, `[${loc} @${w}] reversed — the flip stops at slot 2 (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-break.png`) });
    for (let i = 0; i < 4; i++) { s = await st(); if (s.sockets[i] === ids[i]) continue; await tap(`[data-socket="${s.sockets.indexOf(ids[i])}"]`); await tap(`[data-socket="${i}"]`); }
    await frame.evaluate(() => { window.WakeUpPipActivity.OK_MS = 0; });
    await flip(); await wait(500); s = await st();
    const tabs = await frame.evaluate(() => document.querySelectorAll('.wup-rtab').length);
    is(s.done && tabs === 4 && await frame.evaluate(() => document.querySelector('.wup-pip').classList.contains('is-awake')), `[${loc} @${w}] in order it plays through — Pip sits up, the ribbon has 4 tabs`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(OKWIN[loc]), `[${loc} @${w}] the success text is filled («${bubble}»)`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });

    /* The missing page: the crow */
    const m = C.rounds(loc, 'missing', 4).find(x => x.story === 'crow');
    await force('missing', 'crow'); await wait(800);
    await tap(`[data-page="${m.trivial.id}"]`); await tap(`[data-socket="${m.empty}"]`); await flip(); s = await st();
    is(s.misses === 1 && s.last.result === 'dead', `[${loc} @${w}] the trivial page is a dead frame (miss)`);
    await tap(`[data-socket="${m.empty}"]`); await tap(`[data-page="${m.pages[m.empty].id}"]`); await tap(`[data-socket="${m.empty}"]`);
    await frame.evaluate(() => { window.WakeUpPipActivity.OK_MS = 0; });
    await flip(); await wait(500); s = await st();
    is(s.done, `[${loc} @${w}] the key page plays through`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-missing.png`) });
    await wait(3000); /* the shell grows the iframe after the success bubble settles */
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-wake-up-pip: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
