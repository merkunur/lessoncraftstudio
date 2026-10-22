#!/usr/bin/env node
/* =====================================================================
   live-verify-rewind-rail.js — drives The Rewind Rail (Snippy's Letter
   Trace) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. The letter t, on its own: an
   empty Check is no miss; the cross written first + Check → the rewind
   stops with the flag and names the order slip; written the right way +
   Check → won, the tile filled. Every locale's page returns 200, the
   wrapper version is page.tsx's, the snail and the picture load, the
   iframe grows with the card.
   Usage: node scripts/live-verify-rewind-rail.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '074-rewind-rail', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'snippy-activities.json'), 'utf8')).find(r => r.id === 'snippy.letter-formation.l-k-1-a');
global.WritingCarriageCore = require(path.join(MT, 'writing-carriage-core.js'));
const C = require(path.join(MT, 'rewind-rail-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, RewindRailCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'rewind-rail-activity.js'), 'utf8') + ';this.__A = RewindRailActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="rewind-rail-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds rewind-rail-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.RewindRailActivity && window.RewindRailActivity.st && document.querySelector('.rr-svg'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.RewindRailActivity; a.OK_MS = 600000; a.api.settings.letters = 's1'; a.api.settings.steps = 'own'; a._pool = null; a._ensurePool(); a._start('t'); a._render2(); });
    await frame.waitForFunction(() => document.querySelectorAll('.rr-wrap img').length >= 2 && [...document.querySelectorAll('.rr-wrap img')].every(i => i.complete && i.naturalWidth > 0), { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => [...document.querySelectorAll('.rr-wrap img')].length >= 2 && [...document.querySelectorAll('.rr-wrap img')].every(i => i.naturalWidth > 0)), `[${loc} @${w}] the snail and the picture load`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async () => { const y = await frame.evaluate(() => { const r = document.querySelector('.rr-pads').getBoundingClientRect(); return r.top; }); const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 80, behavior: 'instant' }), o.y + y); await wait(300); };
    const settle = () => frame.waitForFunction(() => !window.RewindRailActivity._busy && !window.RewindRailActivity._raf, { timeout: 20000 }).catch(() => {});
    const st = () => frame.evaluate(() => { const a = window.RewindRailActivity, s = a.st; return { misses: s.misses, done: s.done, g: s.graded && s.graded.kind, mode: a._view.mode }; });
    const stroke = async (k) => {
      const o = await frameOff();
      const P = await frame.evaluate((k) => { const a = window.RewindRailActivity, L = RewindRailCore.lanes(a.st.r.strokes)[k]; return L.pts.filter((x, i) => i % 3 === 0 || i === L.pts.length - 1).map(q => a._toClient('you', q)); }, k);
      await page.mouse.move(o.x + P[0].x, o.y + P[0].y); await page.mouse.down();
      for (const q of P.slice(1)) await page.mouse.move(o.x + q.x, o.y + q.y);
      await page.mouse.up(); await wait(120);
    };
    const check = async () => { const o = await frameOff(); const b = await frame.evaluate(() => { const r = document.querySelector('.rr-check').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); await page.mouse.click(o.x + b.x, o.y + b.y); await wait(200); await settle(); await wait(150); };
    const note = () => frame.evaluate(() => document.querySelector('.rr-note').textContent);
    await toView();
    await check(); let s = await st();
    is(s.misses === 0 && sp(await note()) === sp(STR.hEmpty[loc]), `[${loc} @${w}] an empty Check: the hint, no miss`);
    await toView(); await stroke(1); await stroke(0); await check(); s = await st();
    const flag = await frame.evaluate(() => !!document.querySelector('.rr-flag'));
    is(s.misses === 1 && s.g === 'order' && s.mode === 'frozen' && flag && sp(await note()) === sp(STR.hOrder[loc].replace('{c}', STR.c0[loc])), `[${loc} @${w}] cross first: the rewind stops with the flag — «${await note()}»`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-order.png`) });
    await toView(); await stroke(0); await stroke(1); await check(); s = await st();
    const tile = await frame.evaluate(() => { const t = [...document.querySelectorAll('.rr-tile')].find(e => e.textContent === 't'); return t ? t.className : ''; });
    is(s.done && s.misses === 1 && /is-done/.test(tile) && sp(await note()) === sp(STR.okLetter[loc].replace('{g}', 't')), `[${loc} @${w}] t the right way: won, the tile filled — «${await note()}»`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-rewind-rail: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
