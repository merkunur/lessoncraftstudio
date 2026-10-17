#!/usr/bin/env node
/* =====================================================================
   live-verify-block-towers.js — drives the Block Towers ON PRODUCTION:
   real activity page, real taps. 3 and 8: the 8 → Check → "count from 1", no
   towers; Check → the towers grow to 3 and 8; the 3 → Check → both grow,
   the 3 stops first with its flag → "Yes — 3 is smaller than 8!"; the
   iframe grows with the card.
   Usage: node scripts/live-verify-block-towers.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '020-block-towers', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'block-towers-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'block-towers-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="block-towers-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds block-towers-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.BlockTowersActivity && window.BlockTowersActivity.st && document.querySelector('.bt-card'), { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = document.querySelector(s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 400);
      };
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const towers = () => frame.evaluate(() => ['left', 'right'].map(sd => document.querySelectorAll('.bt-col-' + sd + ' .bt-slot.is-on').length).join());
      await frame.evaluate(() => { const t = window.BlockTowersActivity; const i = t._pool.findIndex(r => r.left === 3 && r.right === 8); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => [...document.querySelectorAll('.bt-num')].map(e => e.textContent).join())) === '3,8', `[${loc} @${w}] cards 3 and 8`);
      await tap('.bt-card-right'); await tap('.lcs-activity-check', 600);
      is((await bubble()) === STR.hintCount[loc] && (await towers()) === '0,0', `[${loc} @${w}] the 8 → "${await bubble()}", no towers`);
      await tap('.lcs-activity-check', 600);
      await wait(3600); is((await towers()) === '3,8' && (await bubble()) === STR.hintBuilt[loc], `[${loc} @${w}] again → the towers grow to 3 and 8`);
      await tap('.bt-card-left'); await tap('.lcs-activity-check', 4000);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, flag: document.querySelector('.bt-col-left .bt-flag.is-on .bt-flag-n') ? document.querySelector('.bt-col-left .bt-flag-n').textContent : '' }));
      is(ok.cel && ok.txt === interp(STR.celebrate[loc], { s: 3, b: 8 }) && ok.flag === '3' && (await towers()) === '3,8', `[${loc} @${w}] the 3 → both towers grow, the 3 flagged → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-block-towers: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
