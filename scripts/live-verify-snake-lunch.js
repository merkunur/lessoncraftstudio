#!/usr/bin/env node
/* =====================================================================
   live-verify-snake-lunch.js — drives the Snake-Groove Lunchbox ON
   PRODUCTION: the real activity page, real taps. Any way 10: the 6 and
   the 4 tapped in, the lid shuts, the lever feeds "10 = 6 + 4"; 4 + 6
   again is refused as the same lunch; 7 + 3 ends the round with the
   shell's "Two different lunches…". Too full 8: 4 and 2 tapped out, the
   lid shuts, the lever feeds "Just right…".
   Usage: node scripts/live-verify-snake-lunch.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '026-snake-lunch', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'snake-lunch-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'snake-lunch-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="snake-lunch-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds snake-lunch-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.SnakeLunchActivity && window.SnakeLunchActivity.st && document.querySelector('.sl-box'), { timeout: 30000 });
      await wait(500);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 300);
      };
      const state = () => frame.evaluate(() => { const C = window.SnakeLunchCore, s = window.SnakeLunchActivity.st; return { lid: C.lid(s), ways: s.ways.slice(), misses: s.misses, done: s.done, box: C.inBox(s).map(x => x.k) }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.sl-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const force = (kind, n) => frame.evaluate((kind, n) => { const t = window.SnakeLunchActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind && (n == null || r.n === n)); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, kind, n);
      const idle = () => frame.waitForFunction(() => { const t = window.SnakeLunchActivity; return !t._reveal && !t._busy; }, { timeout: 8000 });
      const strand = async (k) => { const id = await frame.evaluate((k) => { const s = window.SnakeLunchActivity.st.strands.find(x => x.at === 'wall' && !x.locked && x.k === k); return s && s.id; }, k); await tap(`.sl-strand[data-id="${id}"]`, 400); await idle(); };
      const cupOf = async (k) => { const i = await frame.evaluate((k) => { const C = window.SnakeLunchCore, st = window.SnakeLunchActivity.st; return C.cups(st).inside.findIndex(c => C.byId(st, c.strand).k === k); }, k); await tap(`.sl-cup:nth-child(${i + 1})`, 400); await idle(); };
      /* any way 10 */
      await force('any', 10); await wait(400);
      await strand(6); await strand(4); await wait(500);
      is((await state()).lid === 'shut', `[${loc} @${w}] 6 + 4: the lid shuts`);
      await tap('.sl-lever', 400); await idle(); await wait(300);
      let s = await state();
      is(s.ways.join() === '6+4' && (await note()).startsWith(interp(STR.yum[loc], { n: 10, a: 6, b: 4 })), `[${loc} @${w}] Clunk eats: "${await note()}"`);
      await strand(4); await strand(6); await wait(400); await tap('.sl-lever', 400);
      is((await state()).misses === 1 && (await note()) === STR.hintRepeat[loc], `[${loc} @${w}] 4 + 6 again → "${await note()}"`);
      await cupOf(4); await cupOf(6);
      await strand(7); await strand(3); await wait(500); await tap('.sl-lever', 2200);
      is((await state()).done && (await bubble()) === interp(STR.celebrateTwo[loc], { n: 10 }), `[${loc} @${w}] 7 + 3: "${await bubble()}"`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-any.png`), fullPage: w < 500 });
      /* too full 8 */
      await force('toofull'); await wait(400);
      await cupOf(4); await cupOf(2); await wait(500);
      is((await state()).lid === 'shut', `[${loc} @${w}] too full: 4 and 2 out, the lid shuts`);
      await tap('.sl-lever', 2200);
      is((await state()).done && (await bubble()) === interp(STR.celebrateJust[loc], { n: 8 }), `[${loc} @${w}] "${await bubble()}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-toofull.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-snake-lunch: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
