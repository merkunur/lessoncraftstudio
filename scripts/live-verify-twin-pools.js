#!/usr/bin/env node
/* =====================================================================
   live-verify-twin-pools.js — drives the Twin Pools ON PRODUCTION: real
   activity page, real taps. Seven crabs scattered: a mark, eight in the twin pool, too many,
   too many again (seven strings, the extra ringed), the ringed one out,
   Check → seven strings, celebrate; the iframe grows with the card.
   Usage: node scripts/live-verify-treat-box.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '015-twin-pools', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'twin-pools-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'twin-pools-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="twin-pools-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds twin-pools-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.TwinPoolsActivity && window.TwinPoolsActivity.st && window.TwinPoolsActivity._theme, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(250); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 450);
      };
      const state = () => frame.evaluate(() => { const s = window.TwinPoolsActivity.st; return { n: s.n, filled: s.filled.length, misses: s.misses, done: s.done }; });
      const strings = () => frame.evaluate(() => document.querySelectorAll('.tw-strings path').length);
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.TwinPoolsActivity; const i = t._pool.findIndex(r => r.n === 7 && r.arr === 'scatter'); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => [...document.querySelectorAll('.tw-m')].filter(e => !e.hidden).length)) === 7 && (await frame.evaluate(() => [...document.querySelectorAll('.tw-place')].filter(e => !e.hidden).length)) === 12, `[${loc} @${w}] seven crabs in the first pool; an empty twin pool of 12`);
      await tap('.tw-m', 300);
      is((await frame.evaluate(() => document.querySelectorAll('.tw-m.is-marked').length)) === 1, `[${loc} @${w}] a tap marks a crab as counted`);
      for (let k = 0; k < 8; k++) await tap('.tw-place:not(.is-full)', 250);
      is((await state()).filled === 8, `[${loc} @${w}] eight in the twin pool`);
      await tap('.lcs-activity-check', 700);
      is((await bubble()) === STR.hintMore[loc] && (await state()).misses === 1 && (await strings()) === 0, `[${loc} @${w}] too many: "${await bubble()}", no strings yet`);
      await tap('.lcs-activity-check', 900);
      is((await bubble()) === STR.hintMoreTied[loc] && (await strings()) === 7 && (await frame.evaluate(() => document.querySelectorAll('.tw-place.is-lone').length)) === 1, `[${loc} @${w}] second miss: seven strings, the extra one ringed`);
      await tap('.tw-place.is-lone', 500);
      await tap('.lcs-activity-check', 1200);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden, strings: document.querySelectorAll('.tw-strings path').length, gold: document.querySelectorAll('.tw-num.is-gold').length }));
      is((await state()).done && ok.cel && ok.next && ok.txt === interp(STR.celebrate[loc], { n: 7 }) && ok.strings === 7 && ok.gold === 2, `[${loc} @${w}] seven → "${ok.txt}", seven strings, the last pair gold`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-twin-pools: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
