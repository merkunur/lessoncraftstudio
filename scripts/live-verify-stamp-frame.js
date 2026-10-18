#!/usr/bin/env node
/* =====================================================================
   live-verify-stamp-frame.js — drives the Stamp Frame ON PRODUCTION: the
   real activity page, real taps. 4 + 3: four orange + three green stamped,
   Check → brackets merge, tap 4 → "only the 4 part", tap 7 → the shell
   celebrates. 8 − 3: eight orange, Check with no crosses → "cross out",
   three crosses, Check → three peel into the dish, tap 5 → celebrates.
   Usage: node scripts/live-verify-stamp-frame.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '023-stamp-frame', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'stamp-frame-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'stamp-frame-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="stamp-frame-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds stamp-frame-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.StampFrameActivity && window.StampFrameActivity.st && document.querySelector('.sf-cell'), { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 250);
      };
      const state = () => frame.evaluate(() => { const s = window.StampFrameActivity.st; return { a: s.a, b: s.b, op: s.op, step: s.step, done: s.done, dish: s.dish, misses1: s.misses1, misses2: s.misses2 }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.sf-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const force = (a, b, op) => frame.evaluate((a, b, op) => { const t = window.StampFrameActivity; const i = t._pool.findIndex(r => r.a === a && r.b === b && r.op === op); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, a, b, op);
      const cells = async (list) => { for (const i of list) await tap(`.sf-cell[data-i="${i}"]`, 120); };
      const step2 = () => frame.waitForFunction(() => { const t = window.StampFrameActivity; return t.st.step === 2 && !t._busy; }, { timeout: 8000 });
      /* 4 + 3 */
      await force(4, 3, '+'); await wait(500);
      await tap('.sf-stamp-c'); await cells([0, 2, 5, 7]);
      await tap('.sf-stamp-t'); await cells([1, 3, 9]);
      await tap('.sf-go', 300); await step2(); await wait(300);
      is((await note()) === interp(STR.askAdd[loc], { a: 4, b: 3 }), `[${loc} @${w}] 4 + 3 printed → "${await note()}"`);
      await tap('.sf-strip .sf-key:nth-child(4)', 400);
      is((await note()) === interp(STR.hintPart[loc], { n: 4 }), `[${loc} @${w}] tapped 4 → "${await note()}"`);
      await tap('.sf-strip .sf-key:nth-child(7)', 1300);
      is((await state()).done && (await bubble()) === interp(STR.celebrateAdd[loc], { a: 4, b: 3, c: 7 }), `[${loc} @${w}] 7 → "${await bubble()}"`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-add.png`), fullPage: w < 500 });
      /* 8 − 3 */
      await force(8, 3, '-'); await wait(500);
      await tap('.sf-stamp-c'); await cells([0, 1, 2, 3, 4, 5, 6, 7]);
      await tap('.sf-go', 400);
      is((await note()) === STR.hintCross[loc] && (await state()).misses1 === 1, `[${loc} @${w}] no crosses → "${await note()}"`);
      await tap('.sf-stamp-x'); await cells([1, 4, 6]);
      await tap('.sf-go', 300); await step2(); await wait(300);
      const st = await state();
      is(st.dish === 3 && (await frame.evaluate(() => document.querySelectorAll('.sf-peeled').length)) === 3, `[${loc} @${w}] three crossed counters peeled into the dish`);
      await tap('.sf-strip .sf-key:nth-child(5)', 1300);
      is((await state()).done && (await bubble()) === interp(STR.celebrateSub[loc], { a: 8, b: 3, c: 5 }), `[${loc} @${w}] 5 → "${await bubble()}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-sub.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-stamp-frame: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
