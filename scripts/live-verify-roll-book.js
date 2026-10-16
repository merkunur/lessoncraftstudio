#!/usr/bin/env node
/* =====================================================================
   live-verify-roll-book.js — drives the Roll Book ON PRODUCTION: real
   activity page, real taps and a real drag; a 7-dot card: eight ducklings
   sent (too many, named), one called back, the 7 stamp pressed, Check
   before tracing ("trace"), the 7 traced in the mud → the round
   celebrates; the iframe grows with the card.
   Usage: node scripts/live-verify-roll-book.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '013-roll-book', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'roll-book-activities.json'), 'utf8'))[0];
global.NumberTraceCore = require(path.join(MT, 'number-trace-core.js')).NumberTraceCore;
global.StrokeTraceCore = require(path.join(MT, 'stroke-trace-core.js')).StrokeTraceCore;
const STR = require(path.join(MT, 'roll-book-activity.js')).strings;
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of LOCALES) {
    const url = `https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`;
    for (const w of [1366, 390]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      is(res && (res.status() === 200 || res.status() === 304), `[${loc} @${w}] ${url} → ${res && res.status()}`);
      const frameEl = await page.waitForSelector('iframe[src*="roll-book-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds roll-book-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.RollBookActivity && window.RollBookActivity.st && window.RollBookActivity._theme, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const centre = (sel) => frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
      const tap = async (sel, ms) => { await centre(sel); await wait(250); const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 450); };
      const state = () => frame.evaluate(() => { const s = window.RollBookActivity.st; return { n: s.n, bank: s.bank.length, digit: s.digit, misses: s.misses, done: s.done }; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.RollBookActivity; const i = t._pool.findIndex(r => r.n === 7); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => document.querySelectorAll('.rb-card .rb-dot').length)) === 7, `[${loc} @${w}] the card shows seven dots`);
      for (let k = 0; k < 8; k++) await tap('.rb-raft', 300);
      await wait(600);
      is((await state()).bank === 8, `[${loc} @${w}] eight ducklings sent to the bank (${(await state()).bank})`);
      await tap('.lcs-activity-check');
      is((await bubble()) === STR.hintMore[loc] && (await state()).misses === 1, `[${loc} @${w}] too many named: "${await bubble()}"`);
      await tap('.rb-duck:not([hidden])', 700);
      is((await state()).bank === 7, `[${loc} @${w}] one duckling called back`);
      await tap('.rb-stamp:nth-child(7)');
      await tap('.lcs-activity-check');
      is((await bubble()) === STR.hintTrace[loc] && (await state()).digit === 7, `[${loc} @${w}] stamped 7, not traced: "${await bubble()}"`);
      await centre('.rb-mud'); await wait(300);
      const strokes = await frame.evaluate(() => { const ST = window.RollBookCore._ST(); return window.RollBookCore.glyph(window.RollBookActivity.st).map(s => ST.flatten(s, 1)); });
      const o = await off();
      const box = await frame.evaluate(() => { const r = document.querySelector('.rb-mud-svg').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
      for (const s of strokes) {
        const at = (p) => [o.x + box.x + p.x / 100 * box.w, o.y + box.y + p.y / 100 * box.h];
        await page.mouse.move(...at(s[0])); await page.mouse.down();
        for (const p of s) await page.mouse.move(...at(p));
        await page.mouse.up();
      }
      await wait(300);
      await tap('.lcs-activity-check', 700);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden }));
      is((await state()).done && ok.cel && ok.next && ok.txt === interp(STR.celebrate[loc], { n: 7 }), `[${loc} @${w}] traced 7 → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-roll-book: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
