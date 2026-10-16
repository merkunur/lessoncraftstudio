#!/usr/bin/env node
/* =====================================================================
   live-verify-animal-train.js — drives the Animal Train ON PRODUCTION:
   real activity page, real taps; ticket 7 → eight animals on (Go: "too
   many", the passengers numbered), a tap on the train (one off), Go → the
   next stop's ticket 8, one more on, Go → the round celebrates; the iframe
   grows with the card.
   Usage: node scripts/live-verify-animal-train.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '010-animal-train', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'animal-train-activities.json'), 'utf8'))[0];
const STR = require(path.join(__dirname, '..', 'mini tools', 'animal-train-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="animal-train-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds animal-train-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.AnimalTrainActivity && window.AnimalTrainActivity.st && window.AnimalTrainActivity._theme, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel) => { await frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel); await wait(250); const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(300); };
      const waitingSlot = () => frame.evaluate(() => { const s = [...document.querySelectorAll('.tr-slot')].findIndex(x => !x.hidden && !x.querySelector('.tr-animal').hidden); return s; });
      const board = async () => { const i = await waitingSlot(); await tap(`.tr-slot:nth-child(${i + 1}) .tr-animal`); };
      const state = () => frame.evaluate(() => { const s = window.AnimalTrainActivity.st; return { n: s.n, ticket: s.ticket, aboard: s.seats.length, leg: s.leg, done: s.done }; });
      const note = () => frame.evaluate(() => document.querySelector('.tr-note').hidden ? '' : document.querySelector('.tr-note-1').textContent + ' ' + document.querySelector('.tr-note-2').textContent);
      await frame.evaluate(() => { const t = window.AnimalTrainActivity; const i = t._pool.findIndex(r => r.n === 7 && r.stop === 'more'); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      let st = await state();
      const tk = await frame.evaluate(() => document.querySelector('.tr-ticket-num').textContent);
      is(st.ticket === 7 && tk === '7' && st.aboard === 0, `[${loc} @${w}] the ticket reads 7, the train empty`);
      for (let k = 0; k < 8; k++) await board();
      st = await state();
      is(st.aboard === 8, `[${loc} @${w}] eight real taps put eight animals on (aboard ${st.aboard})`);
      await tap('.tr-go');
      const n1 = await note();
      is(n1 === interp(STR.noteCompare[loc], { a: 8, t: 7 }) + ' ' + STR.noteTooMany[loc], `[${loc} @${w}] Go with 8: "${n1}"`);
      await tap('.tr-seat:nth-child(1) .tr-pass');
      st = await state();
      is(st.aboard === 7, `[${loc} @${w}] a tap on the train lets one off`);
      await tap('.tr-go'); await wait(1600);
      st = await state();
      const n2 = await note();
      is(st.leg === 1 && st.ticket === 8 && n2.trim() === interp(STR.noteNewTicket[loc], { t: 8 }), `[${loc} @${w}] next stop: "${n2.trim()}"`);
      await board(); await tap('.tr-go'); await wait(1400);
      st = await state();
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, next: !document.querySelector('.lcs-activity-next').hidden }));
      is(st.done && ok.cel && ok.next && ok.txt === STR.celebrate[loc], `[${loc} @${w}] 8 → the round celebrates ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-animal-train: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
