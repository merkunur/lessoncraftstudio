#!/usr/bin/env node
/* =====================================================================
   live-verify-letterbox.js — drives the Letterbox Street ON PRODUCTION: real
   activity page, real pointer drags; a wrong door (named), then the three
   letters posted by real drags (the round checks itself), the resident
   picture from the library at ≥ 96 px; the iframe must grow with the card.
   Usage: node scripts/live-verify-letterbox.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '006-letterbox', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'letterbox-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const CORE = require(path.join(__dirname, '..', 'mini tools', 'letterbox-core.js'));
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
      const frameEl = await page.waitForSelector('iframe[src*="letterbox-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds letterbox-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.LetterboxActivity && window.LetterboxActivity.st && window.LetterboxActivity._theme, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      /* one scroll that brings the whole street + van into view, THEN both points are read from the same
         geometry — scrolling for the second point would move the first (the page scrolls with the frame) */
      const scrollWrap = async () => { await frame.evaluate(() => document.querySelector('.lb-wrap').scrollIntoView({ block: 'center' })); await wait(120); };
      const center = async (sel) => { const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return { x: o.x + c.x, y: o.y + c.y }; };
      const dragTo = async (i) => {
        await scrollWrap();
        const a = await center('.lb-letter'), b = await center('.lb-house-' + i);
        await page.mouse.move(a.x, a.y); await page.mouse.down();
        await page.mouse.move(a.x + 9, a.y - 9, { steps: 2 });
        await page.mouse.move(b.x, b.y, { steps: 6 });
        await wait(40); await page.mouse.up(); await wait(120);
      };
      const force = async (i) => { await frame.evaluate((i) => { const t = window.LetterboxActivity; const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(600); };
      const state = () => frame.evaluate(() => { const s = window.LetterboxActivity.st; return { id: s.id, letters: s.letters, houses: s.houses.map(h => h.n), at: s.at, misses: s.misses, done: s.done }; });
      await force(4);
      let st = await state();
      const R = CORE.rounds('to20', 'lb')[4];
      is(st.id === 'to20-4' && st.letters.join() === R.letters.join() && st.houses.join() === R.houses.map(h => h.n).join(), `[${loc} @${w}] the 13 · 14 · 11 street (plates ${st.houses.join(' ')})`);
      const right = st.houses.indexOf(13), wrong = st.houses.indexOf(31);
      await dragTo(wrong);
      const n1 = await frame.evaluate(() => ({ t: document.querySelector('.lb-note').textContent, slip: document.querySelector('.lb-note').classList.contains('is-slip'), misses: window.LetterboxActivity.st.misses }));
      is(n1.slip && n1.misses === 1 && /31/.test(n1.t) && /13/.test(n1.t), `[${loc} @${w}] the reversal door is named ("${n1.t}")`);
      await dragTo(right); await wait(500);
      const d1 = await frame.evaluate(() => { const h = [...document.querySelectorAll('.lb-house')].find(b => b.classList.contains('is-open')); const img = h && h.querySelector('.lb-resident'); const r = img && img.getBoundingClientRect(); return { open: !!h, src: img && img.getAttribute('src'), w: r ? r.width : 0, nat: img ? img.naturalWidth : 0, at: window.LetterboxActivity.st.at }; });
      is(d1.open && d1.at === 1 && /^\/image-library-webp\/themes\/animals\//.test(d1.src || '') && d1.nat > 0 && d1.w >= (w > 500 ? 96 : 64), `[${loc} @${w}] the door opens and the resident loads from the library (${d1.w.toFixed(0)} px, ${d1.src})`);
      for (let k = 1; k < 3; k++) { st = await state(); await dragTo(st.houses.indexOf(st.letters[k])); await wait(450); }
      await wait(1500);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, done: window.LetterboxActivity.st.done, next: !document.querySelector('.lcs-activity-next').hidden, opens: document.querySelectorAll('.lb-house.is-open .lb-resident').length }));
      is(ok.cel && ok.done && ok.next && ok.opens === 3, `[${loc} @${w}] three letters posted by real drags → the round checked itself ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Next bottom ${fit.nextBottom.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-letterbox: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
