#!/usr/bin/env node
/* =====================================================================
   live-verify-ten-seat-wheel.js — drives the Ten-Seat Wheel ON
   PRODUCTION: the real activity page, real taps. Make 10 with 7 aboard:
   dial 2 → the gate boards two, the brake lurches ("There are still empty
   seats."); dial 6 → riders stand on the edge, the brake holds and all hop
   off; dial 3 → the wheel spins ("7 and 3 make 10 — every seat is full!").
   Whole 2 + 2: the hub set to 4 ("2 and 2 make 4!").
   Usage: node scripts/live-verify-ten-seat-wheel.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '028-ten-seat-wheel', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'ten-seat-wheel-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'ten-seat-wheel-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="ten-seat-wheel-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds ten-seat-wheel-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.TenSeatWheelActivity && window.TenSeatWheelActivity.st && document.querySelector('.tw-wheel'), { timeout: 30000 });
      await wait(600);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(150); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 250);
      };
      const times = async (sel, n) => { for (let i = 0; i < n; i++) await tap(sel, 150); };
      const idle = () => frame.waitForFunction(() => !window.TenSeatWheelActivity._busy, { timeout: 12000 });
      const state = () => frame.evaluate(() => { const s = window.TenSeatWheelActivity.st; return { boarded: s.boarded, extras: s.extras, misses: s.misses, done: s.done, dial: s.dial }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.tw-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const force = (level, kind, k) => frame.evaluate((level, kind, k) => { const t = window.TenSeatWheelActivity; if (t.api.settings.wheel !== level) { t.api.settings.wheel = level; t._pool = null; } const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind && (k == null || r.k === k)); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, level, kind, k == null ? null : k);
      /* Make 10, 7 aboard */
      await force('ten', 'fill', 7); await wait(500);
      await times('.tw-ddown', 3); await tap('.tw-gate'); await idle();
      await tap('.tw-brake'); await idle(); await wait(200);
      is((await state()).misses === 1 && (await note()) === STR.hintShort[loc], `[${loc} @${w}] dial 2: "${await note()}"`);
      await times('.tw-dup', 4); await tap('.tw-gate'); await idle();
      is((await state()).extras === 3, `[${loc} @${w}] dial 6: three riders on the edge`);
      await tap('.tw-brake'); await idle(); await wait(200);
      let s = await state();
      is(s.misses === 2 && s.boarded === 0 && s.extras === 0 && !s.done, `[${loc} @${w}] the brake holds, all hop off`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`), fullPage: w < 500 });
      await times('.tw-ddown', 3); await tap('.tw-gate'); await idle();
      await tap('.tw-brake', 300); await idle(); await wait(2600);
      is((await state()).done && (await bubble()) === interp(STR.celebrateFill[loc], { k: 7, m: 3, n: 10 }), `[${loc} @${w}] "${await bubble()}"`);
      /* whole 2 + 2 */
      await force('upto5', 'whole', null); await wait(500);
      const whole = await frame.evaluate(() => { const s = window.TenSeatWheelActivity.st; return { a: s.a, b: s.b, n: s.n }; });
      /* the hub starts blank; its first touch counts from 5 */
      if (whole.n === 5) { await tap('.tw-dup', 150); await tap('.tw-ddown', 150); } else { await times('.tw-ddown', 5 - whole.n); await times('.tw-dup', whole.n - 5); }
      await tap('.tw-brake', 300); await idle(); await wait(2600);
      is((await state()).done && (await bubble()) === interp(STR.celebrateWhole[loc], whole), `[${loc} @${w}] whole: "${await bubble()}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-whole.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-ten-seat-wheel: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
