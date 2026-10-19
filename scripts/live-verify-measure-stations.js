#!/usr/bin/env node
/* =====================================================================
   live-verify-measure-stations.js — drives the Measuring Stations ON
   PRODUCTION: the real activity page, real pointer. How tall? The giraffe
   is DRAGGED onto the track (it tips over and lies down; the track's sign
   flag pops up; "The track shows how long…"), then tapped onto the post
   (the cap, the bar = its standing height; the shell celebrates); the
   picture loads; the iframe grows with the card.
   Usage: node scripts/live-verify-measure-stations.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '032-measure-stations', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'measure-stations-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'measure-stations-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="measure-stations-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds measure-stations-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.MeasureStationsActivity && window.MeasureStationsActivity.st && document.querySelector('.ms-bay'), { timeout: 30000 });
      await frame.evaluate(() => { const t = window.MeasureStationsActivity; t.BACK_MS = 60000; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === 'one.giraffe'); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(700);
      is(await frame.evaluate(() => { const i = document.querySelector('.ms-plinth .ms-img'); return i && i.complete && i.naturalWidth > 0; }), `[${loc} @${w}] the giraffe picture loads`);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const box = (sel) => frame.evaluate((s) => { const el = document.querySelector(s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      /* a real drag: the plinth to the track */
      await box('.ms-bays'); await wait(200);
      let o = await off(); const a = await frame.evaluate(() => { const r = document.querySelector('.ms-plinth').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }), b = await frame.evaluate(() => { const r = document.querySelector('.ms-bay.ms-track').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.6 }; });
      await page.mouse.move(o.x + a.x, o.y + a.y); await page.mouse.down();
      for (let i = 1; i <= 12; i++) { await page.mouse.move(o.x + a.x + (b.x - a.x) * i / 12, o.y + a.y + (b.y - a.y) * i / 12); await wait(20); }
      await page.mouse.up(); await wait(900);
      const s1 = await frame.evaluate(() => { const s = window.MeasureStationsActivity._cur(); return { placed: s.placed, misses: s.misses }; });
      const n1 = await frame.evaluate(() => document.querySelector('.ms-note').textContent);
      is(s1.placed === 'track' && s1.misses === 1 && n1 === STR.hintTrackTall[loc], `[${loc} @${w}] dragged onto the track: "${n1}"`);
      is(await frame.evaluate(() => /ms-tip/.test((document.querySelector('.ms-track .ms-img') || {}).className || '') && document.querySelector('.ms-bay.ms-track').classList.contains('is-flag')), `[${loc} @${w}] the giraffe lies down on the track; the track's sign pops up`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-track.png`), fullPage: w < 500 });
      await frame.evaluate(() => { const t = window.MeasureStationsActivity; t._clearTimers(); t._busy = false; t._fx.back = true; t._paint(); });
      const p = await box('.ms-bay.ms-post'); o = await off();
      await page.mouse.click(o.x + p.x, o.y + p.y);
      await frame.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 15000 }).catch(() => {});
      is(await frame.evaluate(() => window.MeasureStationsActivity.st.done) && (await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent)) === STR.okTall[loc], `[${loc} @${w}] the post answers: "${await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent)}"`);
      is(await frame.evaluate(() => { const b = document.querySelector('.ms-post .ms-bar-tall'); return !!b && parseFloat(b.style.height) > 40; }), `[${loc} @${w}] the post's bar shows the standing height`);
      await wait(1500);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-measure-stations: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
