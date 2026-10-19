#!/usr/bin/env node
/* =====================================================================
   live-verify-sorting-chutes.js — drives the Sorting Chutes ON PRODUCTION:
   the real activity page, real pointer. How many animals? Every picture on
   the belt is dropped down its chute by a real tap (one wrong chute first:
   it bounces); the tubes are the counts; 3 is tapped and checked; the call
   wins ("…3 animals!"); the pictures load (case-exact paths on the server);
   the iframe grows with the card.
   Usage: node scripts/live-verify-sorting-chutes.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '035-sorting-chutes', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'sorting-chutes-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'sorting-chutes-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, SortingChutesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'sorting-chutes-activity.js'), 'utf8') + '\n;this.__A = SortingChutesActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="sorting-chutes-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds sorting-chutes-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.SortingChutesActivity && window.SortingChutesActivity.st && document.querySelector('.sc-funnel'), { timeout: 30000 });
      await frame.evaluate(() => { const t = window.SortingChutesActivity; t.OK_MS = 60000; t.api.settings.groups = 'two'; t.api.settings.numbers = 'shown'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === 'A1'); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(900);
      is(await frame.evaluate(() => [...document.querySelectorAll('.sc-obj img, .sc-lab')].every(i => i.complete && i.naturalWidth > 0)), `[${loc} @${w}] the pictures load (case-exact on the server)`);
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.pCountAnimals[loc], `[${loc} @${w}] the prompt`);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const box = (sel) => frame.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      const tapIn = async (sel) => { let b = await box(sel), o = await off(); if (!b) return false; await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(120); o = await off(); b = await box(sel); await page.mouse.click(o.x + b.x, o.y + b.y); await wait(150); return true; };
      /* one wrong chute first: it bounces */
      let st = await frame.evaluate(() => ({ belt: window.SortingChutesActivity.st.belt.slice() }));
      const want0 = C.keyOf(st.belt[0], false), wrong0 = want0 === 'animals' ? 'fruits' : 'animals';
      await tapIn(`.sc-funnel[data-key="${wrong0}"]`);
      is(await frame.evaluate((n) => window.SortingChutesActivity.st.belt.length === n && window.SortingChutesActivity.st.bounces === 1, st.belt.length), `[${loc} @${w}] a wrong chute bounces the picture back`);
      /* every picture down its chute, by real taps */
      for (let g = 0; g < 20; g++) {
        const s = await frame.evaluate(() => { const t = window.SortingChutesActivity.st; return { phase: t.phase, cur: t.belt[0] }; });
        if (s.phase !== 'sort') break;
        await tapIn(`.sc-funnel[data-key="${C.keyOf(s.cur, false)}"]`);
      }
      const counts = await frame.evaluate(() => { const t = window.SortingChutesActivity.st; return { phase: t.phase, a: t.tubes.animals.length, f: t.tubes.fruits.length }; });
      is(counts.phase === 'ask' && counts.a === 3 && counts.f === 2, `[${loc} @${w}] sorted: the tubes hold 3 animals and 2 fruits`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-sorted.png`) });
      await tapIn('.sc-num[data-v="3"]');
      await tapIn('.sc-check');
      is(await frame.evaluate(() => window.SortingChutesActivity.st.done), `[${loc} @${w}] 3 is checked and wins`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.okCountAnimals[loc].replace('{n}', '3')), `[${loc} @${w}] the win: "${bub}"`);
      await wait(1200);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-sorting-chutes: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
