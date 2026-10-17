#!/usr/bin/env node
/* =====================================================================
   live-verify-treat-box.js — drives the Treat Box ON PRODUCTION: real
   activity page, real taps. Order 7: eight treats into the shut box (they
   vanish under the lid), a peek shows them, Check says too many and leaves
   the lid off, one treat back to the tray, Check → the round celebrates
   with every treat numbered; the iframe grows with the card.
   Usage: node scripts/live-verify-treat-box.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '014-treat-box', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'treat-box-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'treat-box-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="treat-box-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds treat-box-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.TreatBoxActivity && window.TreatBoxActivity.st && window.TreatBoxActivity._theme, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(250); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 450);
      };
      const state = () => frame.evaluate(() => { const s = window.TreatBoxActivity.st; return { n: s.n, box: s.box.length, misses: s.misses, peeks: s.peeks, done: s.done }; });
      const shown = () => frame.evaluate(() => [...document.querySelectorAll('.tb-in')].filter(e => !e.hidden).length);
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.TreatBoxActivity; const i = t._pool.findIndex(r => r.n === 7); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => document.querySelector('.tb-ticket').textContent)) === '7' && (await frame.evaluate(() => [...document.querySelectorAll('.tb-treat')].filter(e => !e.hidden).length)) === 12, `[${loc} @${w}] the ticket says 7; twelve treats on the tray`);
      for (let k = 0; k < 8; k++) await tap('.tb-treat', 300);
      await wait(500);
      is((await state()).box === 8 && (await shown()) === 0, `[${loc} @${w}] eight treats in the box, out of sight under the lid`);
      await tap('.tb-lid', 500);
      is((await shown()) === 8 && (await state()).peeks === 1, `[${loc} @${w}] a peek shows the eight`);
      await wait(2600);
      is((await shown()) === 0, `[${loc} @${w}] the lid drops again by itself`);
      await tap('.lcs-activity-check', 700);
      is((await bubble()) === STR.hintMore[loc] && (await state()).misses === 1 && (await shown()) === 8, `[${loc} @${w}] too many named, the lid off: "${await bubble()}"`);
      await tap('.tb-in', 600);
      is((await state()).box === 7, `[${loc} @${w}] one treat back to the tray`);
      await tap('.lcs-activity-check', 800);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden, nums: [...document.querySelectorAll('.tb-num.is-on')].map(n => n.textContent).join() }));
      is((await state()).done && ok.cel && ok.next && ok.txt === interp(STR.celebrate[loc], { n: 7 }) && ok.nums === '1,2,3,4,5,6,7', `[${loc} @${w}] seven → "${ok.txt}", numbered ${ok.nums}`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-treat-box: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
