#!/usr/bin/env node
/* =====================================================================
   live-verify-spring-switch.js — drives the Spring Switch ON PRODUCTION:
   the real activity page, real taps. All 4: one crate left, the switch
   thrown, three right, the bond set 1 and 3, the coupler → "4 = 1 + 3!"
   and one staircase row. Sealed 5 = 2 + ☐: three crates into the open
   car, its circle set to 3, Check → the shell celebrates "2 and 3 make 5".
   Usage: node scripts/live-verify-spring-switch.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '025-spring-switch', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'spring-switch-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'spring-switch-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="spring-switch-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds spring-switch-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.SpringSwitchActivity && window.SpringSwitchActivity.st && document.querySelector('.sw-yard'), { timeout: 30000 });
      await wait(500);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 250);
      };
      const state = () => frame.evaluate(() => { const s = window.SpringSwitchActivity.st; return { hill: s.hill, L: s.L, R: s.R, sw: s.sw, found: s.found.slice(), done: s.done, plate: Object.assign({}, s.plate) }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.sw-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const force = (sfx) => frame.evaluate((sfx) => { const t = window.SpringSwitchActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id.endsWith(sfx)); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, sfx);
      const settle = () => frame.waitForFunction(() => window.SpringSwitchActivity._inflight === 0, { timeout: 8000 });
      const dial = async (box, v) => { await tap('.sw-circle-' + box, 250); await tap(`.sw-key:nth-child(${v})`, 250); };
      /* all 4 → 1 + 3 */
      await force('all.4'); await wait(300);
      if ((await state()).sw !== 'L') await tap('.sw-switch');
      await tap('.sw-lever', 900); await settle();
      await tap('.sw-switch', 300);
      for (let i = 0; i < 3; i++) { await tap('.sw-lever', 700); }
      await settle(); await wait(300);
      let s = await state();
      is(s.L === 1 && s.R === 3 && s.hill === 0, `[${loc} @${w}] the switch split 4 into 1 and 3 (${s.L}, ${s.R})`);
      await dial('a', 1); await dial('b', 3);
      await tap('.sw-coupler', 600);
      s = await state();
      is(s.found.join() === '1+3' && (await note()) === interp(STR.banked[loc], { n: 4, a: 1, b: 3 }), `[${loc} @${w}] banked: "${await note()}"`);
      is(await frame.evaluate(() => document.querySelectorAll('.sw-row.is-found').length === 1), `[${loc} @${w}] one staircase row`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-all.png`), fullPage: w < 500 });
      /* sealed 5 = 2 + ☐ */
      await force('sealed.2-3'); await wait(300);
      for (let i = 0; i < 3; i++) await tap('.sw-lever', 700);
      await settle(); await wait(300);
      is((await state()).R === 3, `[${loc} @${w}] three crates in the open car`);
      await dial('b', 3);
      await tap('.sw-go', 1800);
      is((await state()).done && (await bubble()) === interp(STR.celebrateMake[loc], { a: 2, b: 3, n: 5 }), `[${loc} @${w}] "${await bubble()}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-sealed.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-spring-switch: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
