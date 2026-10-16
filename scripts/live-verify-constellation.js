#!/usr/bin/env node
/* =====================================================================
   live-verify-constellation.js — drives the Constellation Thread ON PRODUCTION:
   real activity page, real pointer; the kite round (a back slip, a skip slip,
   then the whole run → the round checks itself), then the "to 20" setting
   and the staircase 10 → 16; the iframe must grow with the card.
   Usage: node scripts/live-verify-constellation.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '004-constellation', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'constellation-activities.json'), 'utf8'))[0];
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
      const frameEl = await page.waitForSelector('iframe[src*="constellation-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds constellation-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.ConstellationActivity && window.ConstellationActivity.st, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel) => {
        const r = await frame.evaluate((s) => { const b = document.querySelector(s); b.scrollIntoView({ block: 'center' }); const q = b.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
        const o = await off(); await page.mouse.click(o.x + r.x, o.y + r.y); await wait(90);
      };
      const play = async (shape) => {
        await frame.evaluate((shape) => { const t = window.ConstellationActivity; const i = t._pool.findIndex(r => r.shape === shape); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, shape);
        await wait(600);
        const st0 = await frame.evaluate(() => { const s = window.ConstellationActivity.st; return { start: s.start, end: s.end, shape: s.shape, stars: document.querySelectorAll('.sky-star').length, lit: document.querySelectorAll('.sky-star.is-lit').length }; });
        is(st0.shape === shape && st0.stars === (await frame.evaluate(() => window.ConstellationActivity.st.stars.length)) && st0.lit === 1, `[${loc} @${w}] ${shape} ${st0.start}→${st0.end}: ${st0.stars} stars, one awake`);
        /* a back slip (1) and a skip slip (start+2), by real taps */
        await tap('.sky-star[data-v="1"]');
        const n1 = await frame.evaluate(() => ({ t: document.querySelector('.sky-note').textContent, slip: document.querySelector('.sky-note').classList.contains('is-slip'), lit: document.querySelectorAll('.sky-star.is-lit').length }));
        is(n1.slip && n1.lit === 1, `[${loc} @${w}] tapping 1 → a named slip ("${n1.t}"), nothing lights`);
        await tap(`.sky-star[data-v="${st0.start + 2}"]`);
        const n2 = await frame.evaluate(() => ({ slip: document.querySelector('.sky-note').classList.contains('is-slip'), lit: document.querySelectorAll('.sky-star.is-lit').length }));
        is(n2.slip && n2.lit === 1, `[${loc} @${w}] tapping ${st0.start + 2} → a named slip, nothing lights`);
        for (let v = st0.start + 1; v <= st0.end; v++) await tap(`.sky-star[data-v="${v}"]`);
        await wait(1400);
        const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, lit: document.querySelectorAll('.sky-star.is-lit').length, ink: document.querySelectorAll('.sky-thread .sky-ink').length, next: !document.querySelector('.lcs-activity-next').hidden }));
        is(ok.cel && ok.next && ok.lit === st0.end - st0.start + 1 && ok.ink >= st0.end - st0.start, `[${loc} @${w}] the run → the round checked itself ("${ok.txt}"), ${ok.lit} awake, ${ok.ink} lines`);
        const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
        is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Next bottom ${fit.nextBottom.toFixed(0)})`);
      };
      await play('kite');
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-10.png`), fullPage: w < 500 });
      await frame.evaluate(() => { const t = window.ConstellationActivity; t.api.settings.range = '20'; t.onSettings('range', '20'); });
      await wait(400);
      is((await frame.evaluate(() => window.ConstellationActivity._pool.length)) === 10 && (await frame.evaluate(() => window.ConstellationActivity.st.N)) === 20, `[${loc} @${w}] the "to 20" setting serves the teen pool`);
      await play('stairs');
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-20.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-constellation: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
