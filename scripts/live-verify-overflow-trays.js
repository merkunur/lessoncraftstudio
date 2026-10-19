#!/usr/bin/env node
/* =====================================================================
   live-verify-overflow-trays.js — drives the Overflow Trays ON PRODUCTION:
   the real activity page, real taps. Make 14: ten taps on the spout fill
   the top tray and open the chute, three more overflow below, Check (too
   few — the dotted shape of 14), one more tap, Check: the numeral splits
   (1 on the full tray, 4 below) and the shell celebrates.
   Usage: node scripts/live-verify-overflow-trays.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '030-overflow-trays', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'overflow-trays-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'overflow-trays-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="overflow-trays-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds overflow-trays-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.OverflowTraysActivity && window.OverflowTraysActivity.st && document.querySelector('.ot-tray'), { timeout: 30000 });
      await wait(600);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(120); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.move(o.x + c.x, o.y + c.y); await page.mouse.down(); await wait(30); await page.mouse.up(); await wait(ms || 120);
      };
      const state = () => frame.evaluate(() => { const C = window.OverflowTraysCore, s = window.OverflowTraysActivity._cur(); return { tot: C.total(s), top: C.top(s), bottom: C.bottom(s), misses: s.misses, done: s.done }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.ot-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.OverflowTraysActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.n === 14); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(500);
      for (let i = 0; i < 10; i++) await tap('.ot-spout');
      let s = await state();
      is(s.top === 10 && s.bottom === 0 && await frame.evaluate(() => document.querySelector('.ot-chute').classList.contains('is-open')), `[${loc} @${w}] ten taps fill the top tray, the chute opens (${s.top}/${s.bottom})`);
      for (let i = 0; i < 3; i++) await tap('.ot-spout');
      s = await state();
      is(s.top === 10 && s.bottom === 3, `[${loc} @${w}] three more overflow below (${s.top}/${s.bottom})`);
      await tap('.ot-check', 300);
      is((await state()).misses === 1 && (await note()) === STR.hintFew[loc], `[${loc} @${w}] 13 for 14: "${await note()}"`);
      is((await frame.evaluate(() => document.querySelectorAll('.ot-cell.is-dotted').length)) === 14, `[${loc} @${w}] the dotted shape of 14`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`), fullPage: w < 500 });
      await tap('.ot-spout');
      await tap('.ot-check', 300);
      await frame.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 15000 }).catch(() => {});
      is((await state()).done && (await bubble()) === interp(STR.okTeen[loc], { n: 14, ones: 4 }), `[${loc} @${w}] "${await bubble()}"`);
      is((await frame.evaluate(() => [document.querySelector('.ot-badge1').textContent, document.querySelector('.ot-badge2').textContent].join('|'))) === '1|4', `[${loc} @${w}] the 1 on the full tray, the 4 below`);
      await wait(1500);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-overflow-trays: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
