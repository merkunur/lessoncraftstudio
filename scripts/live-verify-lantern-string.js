#!/usr/bin/env node
/* =====================================================================
   live-verify-lantern-string.js — drives the Two-Ended Lantern String ON
   PRODUCTION: the real activity page, real taps. Make 4: 1 and 2 fall
   short (the note says so), 3 then 1 meet and hang on the garland, 2 and
   2 finish the board ("You found every way to make 4!"). Missing 3: the
   4 runs past the end and is too many, the 1 lights it ("2 and 1 make
   3!"). Whole 1 + 3: the key 4, Light it ("1 and 3 make 4!").
   Usage: node scripts/live-verify-lantern-string.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '027-lantern-string', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'lantern-string-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'lantern-string-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="lantern-string-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds lantern-string-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.LanternStringActivity && window.LanternStringActivity.st && document.querySelector('.ls-string'), { timeout: 30000 });
      await wait(500);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null && !e.disabled); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 300);
      };
      const state = () => frame.evaluate(() => { const s = window.LanternStringActivity.st; return { found: s.found.map(f => f.join('+')), misses: s.misses, done: s.done }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.ls-note'); return n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const idle = () => frame.waitForFunction(() => !window.LanternStringActivity._busy, { timeout: 8000 });
      const card = async (v, ms) => { const id = await frame.evaluate((v) => { const st = window.LanternStringActivity.st; const c = st.cards.find(x => x.v === v && !x.found && x.id !== st.left && x.id !== st.right); return c && c.id; }, v); await tap(`.ls-card[data-id="${id}"]`, ms || 300); await idle(); };
      const force = (kind, n) => frame.evaluate((kind, n) => { const t = window.LanternStringActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind && r.n === n); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, kind, n);
      /* make 4 */
      await force('pair', 4); await wait(400);
      await card(1); await card(2); await wait(300);
      is((await state()).misses === 1 && (await note()) === STR.hintShort1[loc], `[${loc} @${w}] 1 + 2 on a string of 4: "${await note()}"`);
      await idle(); await wait(200);
      await card(3); await card(1); await idle(); await wait(200);
      is((await state()).found.join() === '3+1', `[${loc} @${w}] 3 then 1 hang on the garland`);
      await card(2); await card(2, 200); await idle(); await wait(2200);
      is((await state()).done && (await bubble()) === interp(STR.celebrateAll[loc], { n: 4 }), `[${loc} @${w}] the board: "${await bubble()}"`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-pair.png`), fullPage: w < 500 });
      /* missing 3, given 2 */
      await force('missing', 3); await wait(400);
      await card(4); await tap('.ls-light', 400); await idle();
      is((await state()).misses === 1 && (await note()) === interp(STR.hintCross[loc], { k: 3 }) && (await frame.evaluate(() => document.querySelectorAll('.ls-ob').length)) === 1, `[${loc} @${w}] 2 + 4 on 3: "${await note()}", one bulb past the end`);
      await card(1); await tap('.ls-light', 2400);
      is((await state()).done && (await bubble()) === interp(STR.celebrateMake[loc], { a: 2, b: 1, n: 3 }), `[${loc} @${w}] "${await bubble()}"`);
      /* whole 1 + 3 */
      await force('whole', 4); await wait(400);
      await tap('.ls-key[data-v="4"]', 300); await tap('.ls-light', 2800);
      is((await state()).done && (await bubble()) === interp(STR.celebrateMake[loc], { a: 1, b: 3, n: 4 }), `[${loc} @${w}] whole: "${await bubble()}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-whole.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-lantern-string: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
