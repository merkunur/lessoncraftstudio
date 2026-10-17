#!/usr/bin/env node
/* =====================================================================
   live-verify-bug-jar.js — drives the Bug Jar ON PRODUCTION: real activity
   page, real taps. Fourteen butterflies: Check at the jar (guess first), a
   guess "more", the pour, the label set to 15 with bugs unticked (tick each
   one), every bug ticked, again 15 (numbered to 13 + "?"), down to 14 →
   celebrate, the verdict against the guess; the iframe grows with the card.
   Usage: node scripts/live-verify-bug-jar.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '016-bug-jar', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'bug-jar-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'bug-jar-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="bug-jar-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds bug-jar-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.BugJarActivity && window.BugJarActivity.st && window.BugJarActivity._theme, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, pick, ms) => {
        const c0 = await frame.evaluate((s, p) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden')[p || 0]; if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); return true; }, sel, pick);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s, p) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden')[p || 0]; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 350);
      };
      const state = () => frame.evaluate(() => { const s = window.BugJarActivity.st; return { n: s.n, phase: s.phase, guess: s.guess, answer: s.answer, misses: s.misses, done: s.done, seq: s.seq.length }; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.BugJarActivity; const i = t._pool.findIndex(r => r.n === 14); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      is((await frame.evaluate(() => document.querySelectorAll('.bj-mystery .bj-packed').length)) === 14 && (await frame.evaluate(() => document.querySelectorAll('.bj-bench .bj-packed').length)) === 10, `[${loc} @${w}] the jar packed with 14, the jar of ten beside it`);
      await tap('.lcs-activity-check', 0, 600);
      is((await bubble()) === STR.hintGuess[loc], `[${loc} @${w}] Check at the jar: "${await bubble()}"`);
      await tap('.bj-gbtn', 1); await tap('.bj-pour', 0, 1200);
      is((await state()).phase === 'count' && (await frame.evaluate(() => [...document.querySelectorAll('.bj-bug')].filter(e => !e.hidden).length)) === 14, `[${loc} @${w}] guessed more, poured: 14 bugs on the tray`);
      for (let k = 0; k < 5; k++) await tap('.bj-step', 1, 200);
      await tap('.lcs-activity-check', 0, 600);
      is((await bubble()) === STR.hintTicks[loc] && (await state()).misses === 1, `[${loc} @${w}] 15 with bugs unticked → "${await bubble()}"`);
      for (let k = 0; k < 14; k++) await tap('.bj-bug', k, 120);
      await tap('.lcs-activity-check', 0, 700);
      is((await bubble()) === STR.hintLast[loc] && (await frame.evaluate(() => [...document.querySelectorAll('.bj-num.is-on')].filter(n => n.textContent === '?').length)) === 1, `[${loc} @${w}] all ticked, 15 again → numbered with "?" on the last`);
      await tap('.bj-step', 0, 300);
      await tap('.lcs-activity-check', 0, 1000);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, chip: document.querySelector('.bj-chip').textContent, gold: document.querySelectorAll('.bj-num.is-gold').length }));
      is((await state()).done && ok.cel && ok.txt === interp(STR.celebrate[loc], { n: 14 }) && ok.chip === interp(STR.verdictMoreYes[loc], { b: 10 }) && ok.gold === 1, `[${loc} @${w}] 14 → "${ok.txt}" · "${ok.chip}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-bug-jar: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
