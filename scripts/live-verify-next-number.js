#!/usr/bin/env node
/* =====================================================================
   live-verify-next-number.js — drives the Peek Path ON PRODUCTION: real
   activity page, real pointer; a round of seven (a wrong answer, then the
   right one), then the "to 20" setting and 19 → 20; the iframe must grow
   with the card after every change.
   Usage: node scripts/live-verify-next-number.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '003-next-number', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'next-number-activities.json'), 'utf8'))[0];
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
      const frameEl = await page.waitForSelector('iframe[src*="next-number-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds next-number-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.NextNumberActivity && window.NextNumberActivity.st, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, idx) => {
        const r = await frame.evaluate((s, i) => { const b = document.querySelectorAll(s)[i]; b.scrollIntoView({ block: 'center' }); const q = b.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel, idx || 0);
        const o = await off(); await page.mouse.click(o.x + r.x, o.y + r.y); await wait(80);
      };
      const play = async (n) => {
        await frame.evaluate((n) => { const t = window.NextNumberActivity; const i = t._pool.findIndex(r => r.n === n); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, n);
        await wait(600);
        const st0 = await frame.evaluate(() => ({ n: window.NextNumberActivity.st.n, stones: document.querySelectorAll('.np-stone').length, ask: document.querySelector('.np-stone.is-ask') && document.querySelector('.np-stone.is-ask').dataset.v }));
        is(st0.n === n && Number(st0.ask) === n + 1, `[${loc} @${w}] round ${n}: the question stone is ${n + 1} (got ${st0.ask})`);
        /* wrong first: the same number */
        for (const d of String(n)) await tap(`.np-key[data-d="${d}"]`);
        await tap('.lcs-activity-check'); await wait(200);
        const h = await frame.evaluate(() => ({ cls: document.querySelector('.lcs-activity-bubble').className, open: window.NextNumberActivity.st.open.length }));
        is(/tryagain/.test(h.cls) && h.open === n - 1, `[${loc} @${w}] round ${n}: the same number → try-again + the run-up opens (${h.open})`);
        for (let i = 0; i < 2; i++) await tap('.np-erase');
        for (const d of String(n + 1)) await tap(`.np-key[data-d="${d}"]`);
        const face = await frame.evaluate(() => document.querySelector('.np-stone.is-ask .np-face').textContent);
        is(face === String(n + 1), `[${loc} @${w}] round ${n}: real taps write ${n + 1} on the stone (got ${face})`);
        await tap('.lcs-activity-check'); await wait(900);
        const ok = await frame.evaluate((n) => { const p = document.querySelector('.np-puck').getBoundingClientRect(); const s = document.querySelectorAll('.np-stone')[n].getBoundingClientRect(); const cx = p.left + p.width / 2; return { cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, hopped: cx >= s.left && cx <= s.right && p.top >= s.top && p.top <= s.bottom + 2 }; }, n);
        is(ok.cel && ok.hopped, `[${loc} @${w}] round ${n} → celebrates ("${ok.txt}") and the counter hopped onto ${n + 1}`);
        await wait(1300);
        const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
        is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Next bottom ${fit.nextBottom.toFixed(0)})`);
      };
      await play(7);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-10.png`), fullPage: w < 500 });
      await frame.evaluate(() => { const t = window.NextNumberActivity; t.api.settings.range = '20'; t.onSettings('range', '20'); });
      await wait(400);
      is((await frame.evaluate(() => document.querySelectorAll('.np-stone').length)) === 20, `[${loc} @${w}] the "to 20" setting lays twenty stones`);
      await play(19);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-20.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-next-number: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
