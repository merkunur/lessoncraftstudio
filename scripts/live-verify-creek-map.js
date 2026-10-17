#!/usr/bin/env node
/* =====================================================================
   live-verify-creek-map.js — drives the Creek Map ON PRODUCTION:
   real activity page, real taps. "follow the bigger" 7/6 then 5/3: 7 then 3 → Check
   → stuck in the reeds of fork 2; Check → dots under 5 and 3; 5 → Check
   → the boat reaches the pond → "…7 and 5…"; the iframe grows with the card.
   Usage: node scripts/live-verify-creek-map.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '021-creek-map', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'creek-map-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'creek-map-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="creek-map-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds creek-map-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => { const t = window.CreekMapActivity; return t && t.st && t._themes['vehicles'] && t._themes['forest creatures']; }, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, k, ms) => {
        await frame.evaluate((s, k) => { document.querySelectorAll(s)[k].scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel, k);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s, k) => { const r = document.querySelectorAll(s)[k].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, k);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 400);
      };
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const look = () => frame.evaluate(() => ({ reeds: [...document.querySelectorAll('.cm-reeds')].map(r => r.classList.contains('is-on') ? 1 : 0).join(''), dots: [...document.querySelectorAll('.cm-dots')].map(d => d.hidden ? '-' : d.querySelectorAll('i').length).join(','), done: window.CreekMapActivity.st.done }));
      await frame.evaluate(() => { const t = window.CreekMapActivity; const i = t._pool.findIndex(r => r.rule === 'bigger' && r.forks[0].join() === '7,6' && r.forks[1].join() === '5,3'); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => [...document.querySelectorAll('.cm-n')].map(e => e.textContent).join())) === '7,6,5,3', `[${loc} @${w}] "follow the bigger": 7/6 then 5/3`);
      await tap('.cm-buoy', 0); await tap('.cm-buoy', 3); await tap('.lcs-activity-check', 0, 2600);
      let v = await look();
      is((await bubble()) === STR.hintForkBig[loc] && v.reeds === '0001', `[${loc} @${w}] 7 then 3 → the boat stops in the reeds of fork 2 → "${await bubble()}"`);
      await tap('.lcs-activity-check', 0, 2600); v = await look();
      is(v.dots === '-,-,5,3' && (await bubble()) === STR.hintDotsBig[loc], `[${loc} @${w}] again → dots under 5 and 3`);
      await tap('.cm-buoy', 2); await tap('.lcs-activity-check', 0, 3200);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent }));
      is(ok.cel && (await look()).done && ok.txt === interp(STR.celebrateBig[loc], { a: 7, b: 5 }), `[${loc} @${w}] 7 then 5 → the boat reaches the pond → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-creek-map: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
