#!/usr/bin/env node
/* =====================================================================
   live-verify-peek-window.js — drives the Peek Window ON PRODUCTION: real
   activity page, real taps; seven ducks: the window opens by itself and
   shuts, Look again, a wrong number (named; the window stays open), the
   right number → the round celebrates; the iframe grows with the card.
   Usage: node scripts/live-verify-peek-window.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '012-peek-window', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'peek-window-activities.json'), 'utf8'))[0];
const STR = require(path.join(__dirname, '..', 'mini tools', 'peek-window-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="peek-window-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds peek-window-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PeekWindowActivity && window.PeekWindowActivity.st && Object.keys(window.PeekWindowActivity._themes).length === 3, { timeout: 30000 });
      await wait(400);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel) => { await frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel); await wait(250); const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(400); };
      const isOpen = () => frame.evaluate(() => document.querySelector('.pw-wrap').classList.contains('is-open'));
      const state = () => frame.evaluate(() => { const s = window.PeekWindowActivity.st; return { n: s.n, looks: s.looks, misses: s.misses, done: s.done }; });
      await frame.evaluate(() => { const t = window.PeekWindowActivity; const i = t._pool.findIndex(r => r.n === 7); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(1000);
      const opened = await isOpen();
      await wait(1800);
      const shut = !(await isOpen());
      is(opened && shut && (await frame.evaluate(() => document.querySelectorAll('.pw-item img').length)) === 7, `[${loc} @${w}] seven pictures; the window opened by itself and shut again`);
      await tap('.pw-look');
      is((await isOpen()) && (await state()).looks === 2, `[${loc} @${w}] Look again opens it`);
      await wait(1600);
      await tap('.pw-chip:nth-child(6)'); await tap('.lcs-activity-check');
      const b1 = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(b1 === STR.hintFive[loc] && (await isOpen()) && (await state()).misses === 1, `[${loc} @${w}] 6 for 7: "${b1}", the window stays open`);
      await tap('.pw-chip:nth-child(7)'); await tap('.lcs-activity-check'); await wait(500);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden }));
      is((await state()).done && ok.cel && ok.next && ok.txt === interp(STR.celebrate[loc], { n: 7 }), `[${loc} @${w}] 7 → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-peek-window: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
