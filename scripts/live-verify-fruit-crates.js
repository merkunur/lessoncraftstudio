#!/usr/bin/env node
/* =====================================================================
   live-verify-fruit-crates.js — drives the Fruit Crates ON PRODUCTION:
   real activity page, real taps on the keys (the floating pad on a phone);
   41 on the crates of 14 (named, the landmarks 5 and 10 appear), 13 (the
   count-on runs to "?"), then 14 (the slate turns gold, the round
   celebrates); the fruit from the library at ≥ 96 px; the iframe grows
   with the card.
   Usage: node scripts/live-verify-fruit-crates.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '008-fruit-crates', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'fruit-crates-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
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
      const frameEl = await page.waitForSelector('iframe[src*="fruit-crates-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds fruit-crates-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.FruitCratesActivity && window.FruitCratesActivity.st && window.FruitCratesActivity._theme, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel) => { await frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel); await wait(250); const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(160); };
      const state = () => frame.evaluate(() => { const s = window.FruitCratesActivity.st; return { n: s.n, typed: s.typed, misses: s.misses, slip: s.checked ? s.checked.slip : null, done: s.done, mode: document.querySelector('.fc-wrap').classList.contains('is-row') ? 'row' : 'stack' }; });
      const chips = () => frame.evaluate(() => [...document.querySelectorAll('.fc-crate:not([hidden]) .fc-box')].map((b, i) => { const c = b.querySelector('.fc-chip'); return c.classList.contains('is-on') ? (i + 1) + ':' + c.textContent : null; }).filter(Boolean).join(' '));
      const write = async (a) => { const st = await state(); if (st.mode === 'stack') await tap('.fc-pencil'); while ((await state()).typed !== '') await tap('.fc-key-erase'); for (const d of String(a)) await tap(`.fc-key:nth-child(${d === '0' ? 10 : Number(d)})`); if (st.mode === 'stack') await tap('.fc-key-done'); };
      await frame.evaluate(() => { const t = window.FruitCratesActivity; const i = t._pool.findIndex(r => r.n === 14); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(1400);
      let st = await state();
      is(st.n === 14 && st.typed === '', `[${loc} @${w}] the crates of 14 (${st.mode})`);
      const fruit = await frame.evaluate(() => { const i = document.querySelector('.fc-box img'); const r = i.getBoundingClientRect(); return { src: i.getAttribute('src'), w: Math.min(r.width, r.height), nat: i.naturalWidth }; });
      is(/^\/image-library-webp\/themes\/fruits\//.test(fruit.src) && fruit.nat > 0 && fruit.w >= (w > 500 ? 96 : 64), `[${loc} @${w}] the fruit loads from the library at ${fruit.w.toFixed(0)} px (${fruit.src})`);
      await write(41); await tap('.lcs-activity-check'); st = await state();
      const b1 = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(st.slip === 'reversed' && st.misses === 1 && (await chips()) === '5:5 10:10', `[${loc} @${w}] 41 → reversed, the crates show 5 and 10 ("${b1}")`);
      await write(13); await tap('.lcs-activity-check'); st = await state();
      is(st.slip === 'more' && st.misses === 2 && (await chips()) === '5:5 10:10 11:11 12:12 13:13 14:?', `[${loc} @${w}] 13 → the count-on runs to "?" (${await chips()})`);
      await write(14); await tap('.lcs-activity-check'); await wait(600); st = await state();
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, gold: document.querySelector('.fc-slate').classList.contains('is-gold'), next: !document.querySelector('.lcs-activity-next').hidden }));
      is(st.done && ok.cel && ok.gold && ok.next, `[${loc} @${w}] 14 → the slate turns gold, the round celebrates ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-fruit-crates: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
