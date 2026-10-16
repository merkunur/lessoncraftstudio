#!/usr/bin/env node
/* =====================================================================
   live-verify-fruit-stand.js — drives the Fruit Stand ON PRODUCTION: real
   activity page, real taps; order 17 → a tap on space 14 (fills 1..14),
   Check (named: too few, the fruit numbered), a tap on space 17, Check →
   the round celebrates; the iframe grows with the card.
   Usage: node scripts/live-verify-fruit-stand.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '011-fruit-stand', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'fruit-stand-activities.json'), 'utf8'))[0];
const STR = require(path.join(__dirname, '..', 'mini tools', 'fruit-stand-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="fruit-stand-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds fruit-stand-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.FruitStandActivity && window.FruitStandActivity.st && window.FruitStandActivity._theme, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel) => { await frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel); await wait(250); const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(500); };
      const spaceSel = (i) => `.fs-tray:nth-child(${Math.floor(i / 10) + 1}) .fs-cup:nth-child(${i % 10 + 1})`;
      const state = () => frame.evaluate(() => { const s = window.FruitStandActivity.st; return { n: s.n, filled: s.filled, misses: s.misses, done: s.done }; });
      await frame.evaluate(() => { const t = window.FruitStandActivity; const i = t._pool.findIndex(r => r.n === 17); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      let st = await state();
      is(st.n === 17 && st.filled === 0 && (await frame.evaluate(() => document.querySelector('.fs-slip-num').textContent)) === '17', `[${loc} @${w}] the order slip reads 17, the trays empty`);
      await tap(spaceSel(13));
      st = await state();
      is(st.filled === 14 && (await frame.evaluate(() => [...document.querySelectorAll('.fs-cup img')].length)) === 14, `[${loc} @${w}] a real tap on space 14 fills 14 fruits`);
      await tap('.lcs-activity-check');
      const v = await frame.evaluate(() => ({ note: document.querySelector('.fs-note').textContent, bubble: document.querySelector('.lcs-activity-bubble').textContent, nums: [...document.querySelectorAll('.fs-num.is-on')].length }));
      is(v.note === interp(STR.noteCompare[loc], { a: 14, n: 17 }) && v.bubble === STR.hintFewer[loc] && v.nums === 14, `[${loc} @${w}] Check with 14: "${v.note}" / "${v.bubble}", 14 numbered`);
      await tap(spaceSel(16));
      await tap('.lcs-activity-check'); await wait(600);
      st = await state();
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden }));
      is(st.done && st.filled === 17 && ok.cel && ok.next && ok.txt === STR.celebrate[loc], `[${loc} @${w}] 17 → the round celebrates ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-fruit-stand: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
