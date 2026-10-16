#!/usr/bin/env node
/* =====================================================================
   live-verify-jar-label.js — drives the Jar Label ON PRODUCTION: real
   activity page, real taps; marks on two toys, a wrong label (41 on the
   jar of 14, named and laid against the jar), the right label (sticks,
   the round celebrates), a fill round by real shelf taps; the toy from the
   library at ≥ 96 px; the iframe must grow with the card.
   Usage: node scripts/live-verify-jar-label.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '007-jar-label', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'jar-label-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const CORE = require(path.join(__dirname, '..', 'mini tools', 'jar-label-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const POOL = CORE.rounds('to20', 'both', 'jl');
  for (const loc of LOCALES) {
    const url = `https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`;
    for (const w of [1366, 390]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      is(res && (res.status() === 200 || res.status() === 304), `[${loc} @${w}] ${url} → ${res && res.status()}`);
      const frameEl = await page.waitForSelector('iframe[src*="jar-label-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds jar-label-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.JarLabelActivity && window.JarLabelActivity.st && window.JarLabelActivity._theme, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel) => { await frame.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center' }); }, sel); await wait(80); const o = await off(); const c = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); await page.mouse.click(o.x + c.x, o.y + c.y); await wait(90); };
      const force = async (i) => { await frame.evaluate((i) => { const t = window.JarLabelActivity; const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(600); };
      const state = () => frame.evaluate(() => { const s = window.JarLabelActivity.st; return { id: s.id, n: s.n, typed: s.typed, inJar: s.inJar, marked: s.marks.filter(Boolean).length, checked: s.checked ? s.checked.slip : null, done: s.done, mode: document.querySelector('.jl-wrap').classList.contains('is-side') ? 'side' : 'stack' }; });
      const typeLabel = async (a) => { const st = await state(); if (st.mode === 'stack') await tap('.jl-pencil'); for (const d of String(a)) await tap(`.jl-key:nth-child(${d === '0' ? 10 : Number(d)})`); if (st.mode === 'stack') await tap('.jl-key-done'); };
      await force(POOL.findIndex(r => r.kind === 'count' && r.n === 14));
      let st = await state();
      is(st.id === 'to20-count-14' && st.n === 14, `[${loc} @${w}] the jar of 14 (${st.mode})`);
      await tap('.jl-cell[data-i="0"]'); await tap('.jl-cell[data-i="1"]'); st = await state();
      is(st.marked === 2, `[${loc} @${w}] two marks by real taps`);
      const toy = await frame.evaluate(() => { const i = document.querySelector('.jl-cell.is-toy img'); const r = i.getBoundingClientRect(); return { src: i.getAttribute('src'), w: r.width, nat: i.naturalWidth }; });
      is(/^\/image-library-webp\/themes\/toys\//.test(toy.src) && toy.nat > 0 && toy.w >= (w > 500 ? 96 : 64), `[${loc} @${w}] the toy loads from the library at ${toy.w.toFixed(0)} px (${toy.src})`);
      await typeLabel(41); await tap('.lcs-activity-check'); st = await state();
      const n1 = await frame.evaluate(() => ({ bubble: document.querySelector('.lcs-activity-bubble').textContent, cls: document.querySelector('.lcs-activity-bubble').className, wrong: document.querySelector('.jl-label').classList.contains('is-wrong') }));
      is(st.checked === 'reversed' && /tryagain/.test(n1.cls) && n1.wrong, `[${loc} @${w}] 41 on the jar of 14 → reversed ("${n1.bubble}")`);
      for (let k = 0; k < 2; k++) await tap('.jl-key-erase');
      await typeLabel(12); await tap('.lcs-activity-check'); st = await state();
      const laid = await frame.evaluate(() => ({ ticked: document.querySelectorAll('.jl-cell.is-ticked').length, over: document.querySelectorAll('.jl-cell.is-over').length, note: document.querySelector('.jl-note').textContent }));
      is(st.checked === 'more' && laid.ticked === 12 && laid.over === 2 && /2/.test(laid.note), `[${loc} @${w}] 12 laid against the jar: 12 ticked, 2 left over ("${laid.note}")`);
      for (let k = 0; k < 2; k++) await tap('.jl-key-erase');
      await typeLabel(14); await tap('.lcs-activity-check'); await wait(500); st = await state();
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, stuck: document.querySelector('.jl-label').classList.contains('is-stuck'), next: !document.querySelector('.lcs-activity-next').hidden }));
      is(st.done && ok.cel && ok.stuck && ok.next, `[${loc} @${w}] 14 sticks → the round celebrates ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Next bottom ${fit.nextBottom.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      /* a fill round by real shelf taps */
      await force(POOL.findIndex(r => r.kind === 'fill' && r.n === 7));
      for (let i = 0; i < 7; i++) await tap('.jl-shelf-toy');
      await tap('.lcs-activity-check'); await wait(400); st = await state();
      is(st.inJar === 7 && st.done && (await frame.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'))), `[${loc} @${w}] seven dropped in by real taps → done`);
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-jar-label: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
