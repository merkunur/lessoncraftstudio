#!/usr/bin/env node
/* =====================================================================
   live-verify-counting-necklace.js — drives the Counting Necklace ON
   PRODUCTION: real activity page, real taps; eight beads slid past the
   clasp one by one, a wrong "how many" (named, Count again shows), the
   right one, the beads slide apart, the right "now" card → the round
   celebrates; the iframe grows with the card.
   Usage: node scripts/live-verify-counting-necklace.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '009-counting-necklace', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'counting-necklace-activities.json'), 'utf8'))[0];
const STR = require(path.join(__dirname, '..', 'mini tools', 'counting-necklace-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="counting-necklace-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds counting-necklace-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.CountingNecklaceActivity && window.CountingNecklaceActivity.st, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, fy) => { await frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel); await wait(250); const o = await off(); const c = await frame.evaluate((s, fy) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * (fy || 0.5) }; }, sel, fy); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(260); };
      const state = () => frame.evaluate(() => { const s = window.CountingNecklaceActivity.st; return { n: s.n, total: s.total, counted: s.counted, phase: s.phase, misses: s.misses, done: s.done, hm: s.howMany, af: s.after }; });
      await frame.evaluate(() => { const t = window.CountingNecklaceActivity; const i = t._pool.findIndex(r => r.n === 8 && r.twist === 'spread'); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      let st = await state();
      is(st.n === 8 && st.phase === 'count', `[${loc} @${w}] eight beads to count`);
      for (let k = 0; k < 8; k++) await tap('.nk-necklace', 0.9);
      st = await state();
      is(st.counted === 8 && st.phase === 'howMany', `[${loc} @${w}] eight real taps slid eight beads (counted ${st.counted})`);
      await wait(1200);
      const wi = st.hm.cards.findIndex(c => c !== 8);
      await tap(`.nk-card:nth-child(${wi + 1})`);
      const v1 = await frame.evaluate(() => ({ note: document.querySelector('.nk-note').textContent, recount: !document.querySelector('.nk-recount').hidden }));
      is(v1.note === STR.noteLast[loc] && v1.recount, `[${loc} @${w}] a wrong how-many is named ("${v1.note}"), Count again shows`);
      await tap(`.nk-card:nth-child(${st.hm.cards.indexOf(8) + 1})`); await wait(1400);
      st = await state();
      const q = await frame.evaluate(() => document.querySelector('.nk-question').textContent);
      is(st.phase === 'after' && q === STR.qSpread[loc], `[${loc} @${w}] the beads slide apart: "${q}"`);
      await tap(`.nk-card:nth-child(${st.af.cards.indexOf(8) + 1})`); await wait(1200);
      st = await state();
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden }));
      is(st.done && ok.cel && ok.next, `[${loc} @${w}] 8 → the round celebrates ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-counting-necklace: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
