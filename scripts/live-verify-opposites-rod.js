#!/usr/bin/env node
/* =====================================================================
   live-verify-opposites-rod.js — drives The Two-Ended Rod (Quill's Mirror
   Market) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. Pictures, the hot/cold rod: the
   middle word dragged onto the rod parks in the groove, a miss with the
   hint; the opposite dragged onto the rod slides to the far end and the
   shell names the pair. Then the same-or-opposite level: a word dragged to
   the far end lands there. The wrapper version is the one in page.tsx; the
   iframe grows with the card; every locale's page returns 200.
   Usage: node scripts/live-verify-opposites-rod.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '072-two-ended-rod', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'opposites-activities.json'), 'utf8')).find(r => r.id === 'opposites.antonyms.k-l-5-b');
const C = require(path.join(MT, 'opposites-rod-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, OppositesRodCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'opposites-rod-activity.js'), 'utf8') + ';this.__A = OppositesRodActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="opposites-rod-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds opposites-rod-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.OppositesRodActivity && window.OppositesRodActivity.st && window.OppositesRodCore && document.querySelector('.tr-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const settle = () => frame.waitForFunction(() => !window.OppositesRodActivity._busy, { timeout: 15000 }).catch(() => {});
    const drag = async (from, to) => { await toView(from); const a = await ctrOf(from), b = await ctrOf(to); if (!a || !b) throw new Error('drag ' + from + ' → ' + to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14); await page.mouse.up(); await wait(300); await settle(); };
    const st = () => frame.evaluate(() => { const s = window.OppositesRodActivity.st; return JSON.parse(JSON.stringify({ parked: s.parked, ends: s.ends, misses: s.misses, done: s.done })); });
    const note = () => frame.evaluate(() => document.querySelector('.tr-note').textContent);
    const force = (level, id) => frame.evaluate((level, id) => { const a = window.OppositesRodActivity; a.api.settings.level = level; a.api.settings.words = 'pics'; a.api.settings.answer = 'pick'; a._pool = null; const pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf(id); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; a.OK_MS = 60000; a.FAST = true; a.MISS_MS = 0; window.LCS_reloadFirstTask(); }, level, id);
    await force('pictures', 'pic.hot'); await wait(800);
    await drag('.tr-basket .tr-card[data-card="warm"]', '.tr-rodbox'); let s = await st();
    is(s.misses === 1 && s.parked.warm === 'mid' && sp(await note()).startsWith(sp(STR.hMid[loc]).split('{')[0].trim()), `[${loc} @${w}] warm parks in the middle groove — a miss with the hint`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await frame.evaluate(() => { window.OppositesRodActivity.OK_MS = 0; });
    await drag('.tr-basket .tr-card[data-card="cold"]', '.tr-rodbox'); await wait(500); s = await st();
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = sp(await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; }));
    const W = C.DATA.TEXT[loc].w;
    is(s.done && bubble.includes(sp(W.hot)) && bubble.includes(sp(W.cold)), `[${loc} @${w}] cold slides to the far end — «${bubble.slice(0, 60)}»`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(2500);
    await force('same', 'same.0'); await wait(800);
    const far = C.round(loc, 'same.0', 0, 'L').cards.find(c => c.home === 'far');
    await drag(`.tr-basket .tr-card[data-card="${far.id}"]`, '.tr-zone.is-far'); s = await st();
    is(s.ends[far.id] === 'far', `[${loc} @${w}] same or opposite: «${far.word}» dragged lands at the far end`);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-opposites-rod: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
