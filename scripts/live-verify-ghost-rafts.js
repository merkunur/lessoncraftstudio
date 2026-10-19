#!/usr/bin/env node
/* =====================================================================
   live-verify-ghost-rafts.js — drives the Ghost Rafts ON PRODUCTION: the
   real activity page, real taps. Catch 13: ten taps on drifting bubbles
   seal the raft and hook three on behind; the card 31 builds three ghost
   rafts and one ghost bubble; the card 13 fills the record 10 + 3 = 13 and
   the shell celebrates; the duckling picture loads.
   Usage: node scripts/live-verify-ghost-rafts.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '031-ghost-rafts', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'ghost-rafts-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'ghost-rafts-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="ghost-rafts-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds ghost-rafts-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.GhostRaftsActivity && window.GhostRaftsActivity.st && document.querySelector('.gr-tank'), { timeout: 30000 });
      await wait(600);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(80); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 150);
      };
      const state = () => frame.evaluate(() => { const s = window.GhostRaftsActivity._cur(); return { raft: s.tank.raft, seats: s.tank.seats, loose: s.tank.loose, tow: s.tank.tow, misses: s.misses, done: s.done }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.gr-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.GhostRaftsActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === 'catch.13'); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._deal = null; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(500);
      is(await frame.evaluate(() => { const i = document.querySelector('.gr-duck'); return i.complete && i.naturalWidth > 0; }), `[${loc} @${w}] the duckling picture loads`);
      for (let i = 0; i < 10; i++) await tap('.gr-bub', 120);
      await wait(300);
      let s = await state();
      is(s.raft === 1 && s.tow === 3 && s.loose === 0, `[${loc} @${w}] ten taps seal the raft; three hook on behind (${s.raft}, ${s.tow}, ${s.loose})`);
      await tap('.gr-card[data-v="31"]', 500);
      is((await state()).misses === 1 && (await frame.evaluate(() => [document.querySelectorAll('.gr-ghost .gr-graft').length, document.querySelectorAll('.gr-ghost .gr-gbub').length].join('+'))) === '3+1' && (await note()) === interp(STR.hintGhost[loc], { m: 31 }), `[${loc} @${w}] 31: three ghost rafts and a ghost bubble — "${await note()}"`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-ghost.png`), fullPage: w < 500 });
      await wait(1600);
      await tap('.gr-card[data-v="13"]', 300);
      await frame.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 15000 }).catch(() => {});
      is((await state()).done && (await bubble()) === interp(STR.okMake[loc], { k: 3, n: 13 }), `[${loc} @${w}] "${await bubble()}"`);
      is((await frame.evaluate(() => [...document.querySelectorAll('.gr-record b')].map(b => b.textContent).join('|'))) === '10|3|13', `[${loc} @${w}] the record 10 + 3 = 13`);
      await wait(1500);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-ghost-rafts: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
