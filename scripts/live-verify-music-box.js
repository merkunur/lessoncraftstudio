#!/usr/bin/env node
/* =====================================================================
   live-verify-music-box.js — drives the Music-Box Strip ON PRODUCTION: the
   real activity page, real taps. Frère Jacques: a wrong bar (nothing
   punched, "Look — the rods…"), then every right bar (eight holes), the
   crank: the song plays and the shell says "You played Frère Jacques!
   8 facts, 8 notes."; the lid picture loads.
   Usage: node scripts/live-verify-music-box.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '029-music-box', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'music-box-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'music-box-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="music-box-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds music-box-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.MusicBoxActivity && window.MusicBoxActivity.st && document.querySelector('.mb-bar'), { timeout: 30000 });
      await wait(600);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(150); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.bottom - 10 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 250);
      };
      const state = () => frame.evaluate(() => { const C = window.MusicBoxCore, s = window.MusicBoxActivity.st, f = C.fact(s); return { pos: s.pos, full: s.full, done: s.done, ans: f ? C.answerOf(f) : null }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.mb-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.MusicBoxActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.songId === 'frere1'); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(500);
      let s = await state();
      await tap(`.mb-bar[data-k="${s.ans === 1 ? 2 : 1}"]`);
      is((await state()).pos === 0 && (await note()) === STR.hintRods[loc], `[${loc} @${w}] a wrong bar: "${await note()}"`);
      for (let i = 0; i < 8; i++) { s = await state(); if (s.full) break; await tap(`.mb-bar[data-k="${s.ans}"]`, 300); }
      s = await state();
      is(s.full && (await note()) === STR.hintCrank[loc], `[${loc} @${w}] eight holes: "${await note()}"`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-full.png`), fullPage: w < 500 });
      await tap('.mb-crank', 200);
      await frame.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 15000 }).catch(() => {});
      is((await state()).done && (await bubble()) === interp(STR.celebrateSong[loc], { song: STR.songFrere[loc], n: 8 }), `[${loc} @${w}] "${await bubble()}"`);
      is(await frame.evaluate(() => { const i = document.querySelector('.mb-lidpic'); return !i.hidden && i.complete && i.naturalWidth > 0; }), `[${loc} @${w}] the bell on the lid`);
      /* the parent page resizes the iframe a moment after the card grows (the bubble, the lid) */
      await wait(1500);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-song.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-music-box: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
