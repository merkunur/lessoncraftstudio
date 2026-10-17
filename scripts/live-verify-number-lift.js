#!/usr/bin/env node
/* =====================================================================
   live-verify-number-lift.js — drives the Number Elevator ON PRODUCTION:
   real activity page, real taps. 6 and 9: the pig (6) → Check → "find both
   numbers"; Check → floors 6 and 9 lit; the dog (9) → Check → the ride:
   tickets left on floors 6 and 9 → "Yes — 9 is bigger than 6!"; the
   iframe grows with the card.
   Usage: node scripts/live-verify-number-lift.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '019-number-lift', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'number-lift-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'number-lift-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="number-lift-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds number-lift-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.NumberLiftActivity && window.NumberLiftActivity.st && window.NumberLiftActivity._theme, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = document.querySelector(s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 400);
      };
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const lit = () => frame.evaluate(() => [...document.querySelectorAll('.nl-floor.is-lit')].map(f => f.getAttribute('data-f')).sort((a, b) => a - b).join());
      await frame.evaluate(() => { const t = window.NumberLiftActivity; const i = t._pool.findIndex(r => r.left === 6 && r.right === 9); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => [...document.querySelectorAll('.nl-tnum')].map(e => e.textContent).join())) === '6,9', `[${loc} @${w}] tickets 6 and 9`);
      await tap('.nl-p-left'); await tap('.lcs-activity-check', 600);
      is((await bubble()) === STR.hintFind[loc] && (await lit()) === '', `[${loc} @${w}] the 6 → "${await bubble()}", nothing lit`);
      await tap('.lcs-activity-check', 600);
      is((await lit()) === '6,9', `[${loc} @${w}] again → floors 6 and 9 lit`);
      await tap('.nl-p-right'); await tap('.lcs-activity-check', 4500);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, drops: [...document.querySelectorAll('.nl-drop')].filter(d => d.textContent).map(d => d.textContent).sort((a, b) => a - b).join() }));
      is(ok.cel && ok.txt === interp(STR.celebrate[loc], { b: 9, s: 6 }) && ok.drops === '6,9', `[${loc} @${w}] the 9 → the ride (${ok.drops}) → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-number-lift: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
