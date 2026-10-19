#!/usr/bin/env node
/* =====================================================================
   live-verify-drop-stands.js — drives the Drop-Down Stands ON PRODUCTION:
   the real activity page, real pointer. Which one is taller? The palm on
   the high stand is DRAGGED down (its stand folds), the truly taller palm
   is tapped, Check: the beam rests on its top, the call wins ("…on the
   same floor…"); the pictures load; the iframe grows with the card.
   Usage: node scripts/live-verify-drop-stands.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '034-drop-stands', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'drop-stands-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'drop-stands-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, DropStandsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'drop-stands-activity.js'), 'utf8') + '\n;this.__A = DropStandsActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="drop-stands-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds drop-stands-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.DropStandsActivity && window.DropStandsActivity.st && document.querySelector('.ds-col'), { timeout: 30000 });
      await frame.evaluate(() => { const t = window.DropStandsActivity; t.OK_MS = 60000; t.api.settings.compare = 'two'; t.api.settings.start = 'stands'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === 'P1'); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(900);
      is(await frame.evaluate(() => [...document.querySelectorAll('.ds-img')].every(i => i.complete && i.naturalWidth > 0)), `[${loc} @${w}] the palms load`);
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.pTaller[loc], `[${loc} @${w}] the prompt`);
      /* bring the stage into the page's viewport, instantly (the site scrolls smoothly) */
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const pic = (i) => frame.evaluate((i) => { const t = window.DropStandsActivity, G = t._geo(i), sr = t._stage.getBoundingClientRect(); return { x: sr.left + (G.ink.l + G.ink.r) / 2, y: sr.top + (G.ink.t + G.ink.b) / 2 }; }, i);
      let o = await off(), p = await pic(1);
      await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + p.y); await wait(300);
      /* a real drag: the palm on the high stand comes down to the floor */
      o = await off(); p = await pic(1);
      await page.mouse.move(o.x + p.x, o.y + p.y); await page.mouse.down();
      for (let i = 1; i <= 10; i++) { await page.mouse.move(o.x + p.x, o.y + p.y + i * 7); await wait(20); }
      await page.mouse.up(); await wait(500);
      is(await frame.evaluate(() => window.DropStandsActivity.st.items[1].down), `[${loc} @${w}] dragged down, the stand folds`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-folded.png`) });
      o = await off(); p = await pic(0); await page.mouse.click(o.x + p.x, o.y + p.y); await wait(300);
      is((await frame.evaluate(() => window.DropStandsActivity.st.choice)) === 0, `[${loc} @${w}] the taller palm chosen`);
      const c = await frame.evaluate(() => { const r = document.querySelector('.ds-check').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
      o = await off(); await page.mouse.click(o.x + c.x, o.y + c.y);
      await frame.waitForFunction(() => window.DropStandsActivity.st.done && window.DropStandsActivity._beamIn, { timeout: 15000 }).catch(() => {});
      await wait(700);
      const beam = await frame.evaluate(() => { const t = window.DropStandsActivity, b = document.querySelector('.ds-beam').getBoundingClientRect(), sr = t._stage.getBoundingClientRect(); return (b.bottom - sr.top) - t._geo(0).ink.t; });
      is(await frame.evaluate(() => window.DropStandsActivity.st.done) && Math.abs(beam) < 2, `[${loc} @${w}] the beam rests on the taller palm (off by ${beam.toFixed(1)} px) and the call wins`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.okTaller[loc]), `[${loc} @${w}] the win: "${bub}"`);
      await wait(1200);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-drop-stands: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
