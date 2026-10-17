#!/usr/bin/env node
/* =====================================================================
   live-verify-pot-nest.js — drives the Nesting Pots ON PRODUCTION:
   real activity page, real taps. 6, 9, 2, 4: 6 in, 9 bounces; 9 then
   2 → Check → stuck, the inside pot glows; lift, 6, 4, 2 → "9, 6, 4, 2 …";
   the iframe grows with the card.
   Usage: node scripts/live-verify-pot-nest.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '022-pot-nest', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'pot-nest-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'pot-nest-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="pot-nest-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds pot-nest-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PotNestActivity && window.PotNestActivity.st && document.querySelector('.pn-tp'), { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { document.querySelector(s).scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 20) }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 500);
      };
      const pot = (v) => tap('.pn-tp[data-v="' + v + '"]');
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const st = () => frame.evaluate(() => { const s = window.PotNestActivity.st; return { nest: s.nest.join(), tray: s.tray.join(), bounces: s.bounces, done: s.done }; });
      await frame.evaluate(() => { const t = window.PotNestActivity; const i = t._pool.findIndex(r => r.pots.join() === '6,9,2,4'); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => [...document.querySelectorAll('.pn-tp-n')].map(e => e.textContent).join())) === '6,9,2,4', `[${loc} @${w}] the row 6, 9, 2, 4`);
      await pot(6); await pot(9, 1100);
      let s = await st();
      is(s.nest === '6' && s.bounces === 1, `[${loc} @${w}] 6 in, then 9 bounces back`);
      await tap('button.pn-pot.is-inner'); await pot(9); await pot(2);
      await tap('.lcs-activity-check');
      is((await bubble()) === STR.hintStuck[loc] && !!(await frame.evaluate(() => document.querySelector('.pn-pot.is-cue'))), `[${loc} @${w}] 9 then 2 → stuck, the inside pot glows → "${await bubble()}"`);
      await tap('button.pn-pot.is-inner'); await pot(6); await pot(4); await pot(2);
      await tap('.lcs-activity-check', 800);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, nest: [...document.querySelectorAll('.pn-nest .pn-pot .pn-n')].map(e => e.textContent).join() }));
      is(ok.cel && (await st()).done && ok.nest === '9,6,4,2' && ok.txt === interp(STR.celebrate[loc], { list: '9, 6, 4, 2' }), `[${loc} @${w}] 9, 6, 4, 2 → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-pot-nest: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
