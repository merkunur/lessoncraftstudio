#!/usr/bin/env node
/* =====================================================================
   live-verify-parking-tower.js — drives Bramble's Parking Tower ON
   PRODUCTION: the real activity page, real pointer. N1: a wrong bay
   (above the bus) is tapped and checked — "next to means the same floor";
   the bay next to the bus wins. T3: the basement (a ride down the lift)
   wins "under the tower". P3: the bulldozer parked in A6 on the roof plan.
   The pictures load (case-exact paths on the server); the iframe grows
   with the card; the wrapper version is the one in page.tsx.
   Usage: node scripts/live-verify-parking-tower.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '036-parking-tower', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'parking-tower-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'parking-tower-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, ParkingTowerCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'parking-tower-activity.js'), 'utf8') + '\n;this.__A = ParkingTowerActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="parking-tower-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds parking-tower-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.ParkingTowerActivity && window.ParkingTowerActivity.st && document.querySelector('.pt-spot'), { timeout: 30000 });
      const force = async (words, id) => { await frame.evaluate((wd, id) => { const t = window.ParkingTowerActivity; t.OK_MS = 60000; t.FAST = true; t.api.settings.words = wd; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, words, id); await wait(900); };
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const box = (sel) => frame.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      const tapIn = async (sel) => { let b = await box(sel), o = await off(); if (!b) return false; await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(150); o = await off(); b = await box(sel); await page.mouse.click(o.x + b.x, o.y + b.y); await wait(250); return true; };
      const st = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.ParkingTowerActivity.st)));

      /* N1: next to the bus */
      await force('near', 'N1');
      is(await frame.evaluate(() => [...document.querySelectorAll('.pt-stage img')].every(i => i.complete && i.naturalWidth > 0)), `[${loc} @${w}] the pictures load (case-exact on the server)`);
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.p_N1[loc], `[${loc} @${w}] the prompt`);
      await tapIn('.pt-spot[data-k="1,2"]');
      let s = await st();
      is(s.parked && s.parked.c === 1 && s.parked.l === 2, `[${loc} @${w}] a real tap parks the truck above the bus`);
      await tapIn('.pt-check');
      is((await frame.evaluate(() => document.querySelector('.pt-note').textContent)) === STR.hintNext[loc] && (await frame.evaluate(() => document.querySelectorAll('.pt-arrow').length)) === 3, `[${loc} @${w}] miss 1: "next to" — the arrows`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
      await tapIn('.pt-spot[data-k="2,1"]');
      await tapIn('.pt-check');
      is((await st()).done, `[${loc} @${w}] next to the bus wins`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.ok_N1[loc]), `[${loc} @${w}] the win: "${bub}"`);

      /* T3: under the tower — the basement */
      await force('tower', 'T3');
      await tapIn('.pt-spot[data-k="BASE"]'); await tapIn('.pt-check');
      is((await st()).done && (await frame.evaluate(() => { const p = document.querySelector('.pt-route').getAttribute('points').split(' ').map(x => x.split(',').map(Number)); return p[2][1] > p[1][1]; })), `[${loc} @${w}] T3: the basement, reached DOWN the lift, wins`);

      /* P3: the bulldozer in A6 */
      await force('plan6', 'P3');
      await tapIn('.pt-sq[data-code="A6"]'); await tapIn('.pt-check');
      is((await st()).done, `[${loc} @${w}] P3: A6 on the roof plan wins`);
      await wait(1200);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-parking-tower: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
