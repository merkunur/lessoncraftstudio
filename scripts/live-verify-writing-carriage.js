#!/usr/bin/env node
/* =====================================================================
   live-verify-writing-carriage.js — drives The Writing Carriage (Penny's
   Alphabet Trace) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. The letter L: a Check with
   nothing drawn is no miss; both strokes traced along the road, the letter
   glides out onto the line; written again with only the ruling and the
   green dot, the letter is pinned on the wall and the shell says it was
   written. The wrapper version is the one in page.tsx; the iframe grows
   with the card; every locale's page returns 200.
   Usage: node scripts/live-verify-writing-carriage.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '073-writing-carriage', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'penny-alphabet-trace-activities.json'), 'utf8')).find(r => r.id === 'penny-alphabet-trace.letter-formation.l-k-1-a');
const C = require(path.join(MT, 'writing-carriage-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, WritingCarriageCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'writing-carriage-activity.js'), 'utf8') + ';this.__A = WritingCarriageActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(400);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="writing-carriage-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds writing-carriage-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.WritingCarriageActivity && window.WritingCarriageActivity.st && window.WritingCarriageCore && document.querySelector('.wc-svg'), { timeout: 30000 });
    await wait(1200);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async () => { const b = await frame.evaluate(() => { const r = document.querySelector('.wc-svg').getBoundingClientRect(); return r.top + r.height / 2; }); const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b); await wait(250); };
    const settle = () => frame.waitForFunction(() => !window.WritingCarriageActivity._busy || window.WritingCarriageActivity.st.done, { timeout: 15000 }).catch(() => {});
    const st = () => frame.evaluate(() => { const s = window.WritingCarriageActivity.st; return { step: s.step, idx: s.tr.idx, misses: s.misses, done: s.done, inks: s.inks.length }; });
    const stroke = async () => {
      const o = await frameOff();
      const P = await frame.evaluate(() => { const a = window.WritingCarriageActivity, s = a.st, L = s.tr.lanes[s.tr.idx]; return L.pts.filter((x, i) => i % 3 === 0 || i === L.pts.length - 1).map(q => a._toClient(q)); });
      await page.mouse.move(o.x + P[0].x, o.y + P[0].y); await page.mouse.down();
      for (const q of P.slice(1)) await page.mouse.move(o.x + q.x, o.y + q.y);
      await page.mouse.up(); await wait(120); await settle(); await wait(80);
    };
    await frame.evaluate(() => { try { localStorage.clear(); } catch (e) {} const a = window.WritingCarriageActivity; a._wallKey = null; a.api.settings.level = 'upper'; a.api.settings.letters = 'all'; a.api.settings.practice = 'tw'; a._pool = null; a._paper = null; const pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf('L'); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; a.OK_MS = 60000; window.LCS_reloadFirstTask(); });
    await wait(700); await toView();
    const chk = await frame.evaluate(() => { const r = document.querySelector('.wc-check').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); const o0 = await frameOff();
    await page.mouse.click(o0.x + chk.x, o0.y + chk.y); await wait(200); let s = await st();
    is(s.misses === 0 && sp(await frame.evaluate(() => document.querySelector('.wc-note').textContent)) === sp(STR.hEmpty[loc]), `[${loc} @${w}] an empty Check: the hint, no miss`);
    await stroke(); await stroke(); s = await st();
    is(s.step === 1 && s.inks === 1 && await frame.evaluate(() => document.querySelectorAll('.wc-sheet > g').length === 1 && !document.querySelector('.wc-road')), `[${loc} @${w}] L traced: it glides out onto the line, the write step has no road`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-write.png`) });
    await stroke(); await stroke(); await wait(500); s = await st();
    const pinned = await frame.evaluate(() => { const e = document.querySelector('.wc-slot[data-slot="L"]'); return !!e && e.classList.contains('is-pinned'); });
    const msg = sp(await frame.evaluate(() => document.querySelector('.wc-note').textContent));
    is(s.done && s.misses === 0 && pinned && msg === sp(STR.okLetter[loc].replace('{g}', 'L')), `[${loc} @${w}] L written: pinned on the wall — «${msg}»`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-writing-carriage: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
