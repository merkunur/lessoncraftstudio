#!/usr/bin/env node
/* =====================================================================
   live-verify-fair-share.js — drives the Friendship Bridge ON PRODUCTION:
   real activity page, real taps. Nine against five: "The same" (a shake,
   no miss), the top plate (right), one toy across → Check → "the top plate
   has more", both numbered; one more across → 7 and 7 → "Fair! 7 and 7.";
   the iframe grows with the card.
   Usage: node scripts/live-verify-fair-share.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '018-friendship-bridge', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'fair-share-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'fair-share-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="fair-share-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds fair-share-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.FairShareActivity && window.FairShareActivity.st && window.FairShareActivity._theme, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, pick, ms) => {
        await frame.evaluate((s, p) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).display !== 'none')[p || 0]; if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel, pick);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s, p) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).display !== 'none')[p || 0]; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 400);
      };
      const st = () => frame.evaluate(() => { const s = window.FairShareActivity.st; return { a: s.plates.a.length, b: s.plates.b.length, phase: s.phase, judgeMisses: s.judgeMisses, misses: s.misses, done: s.done }; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.FairShareActivity; const i = t._pool.findIndex(r => r.a === 9 && r.b === 5); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      let s = await st();
      is(s.a === 9 && s.b === 5 && s.phase === 'judge', `[${loc} @${w}] nine and five, step 1`);
      await tap('.fs-same', 0); s = await st();
      is(s.phase === 'judge' && s.judgeMisses === 1 && s.misses === 0, `[${loc} @${w}] "The same" → a shake, no miss`);
      await tap('.fs-plate-a .fs-pick', 0); s = await st();
      is(s.phase === 'share', `[${loc} @${w}] the top plate → step 2`);
      await tap('.fs-plate-a .fs-toy', 0, 900);
      is((await st()).a === 8 && (await st()).b === 6, `[${loc} @${w}] one toy across the bridge: 8 and 6`);
      await tap('.lcs-activity-check', 0, 700);
      is((await bubble()) === STR.hintMoreTop[loc] && (await frame.evaluate(() => document.querySelectorAll('.fs-num.is-on').length)) === 14, `[${loc} @${w}] Check → "${await bubble()}", both plates numbered`);
      await tap('.fs-plate-a .fs-toy', 0, 900);
      await tap('.lcs-activity-check', 0, 1000);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent }));
      is((await st()).done && ok.cel && ok.txt === interp(STR.celebrate[loc], { n: 7 }), `[${loc} @${w}] 7 and 7 → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-fair-share: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
