#!/usr/bin/env node
/* =====================================================================
   live-verify-egg-cartons.js — drives the Ten-Shelf ON PRODUCTION: real
   activity page, real pointer, a count round (tag all, wrong then right)
   and, if the next round is a pack round, adds cartons to the target; the
   iframe must grow with the card after every change.
   Usage: node scripts/live-verify-egg-cartons.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '002-egg-cartons', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'egg-cartons-activities.json'), 'utf8'))[0];
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
      const frameEl = await page.waitForSelector('iframe[src*="egg-cartons-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds egg-cartons-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.EggCartonsActivity && window.EggCartonsActivity.st, { timeout: 30000 });
      await wait(500);
      /* force a count round of seven and a pack round of six, through the order seam */
      const play = async (kind, tens) => {
        await frame.evaluate((kind, tens) => { const t = window.EggCartonsActivity; const i = t._pool.findIndex(r => r.kind === kind && r.tens === tens); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, kind, tens);
        await wait(600);
        const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        if (kind === 'count') {
          for (let i = 0; i < tens; i++) {
            const r = await frame.evaluate(i => { const b = document.querySelectorAll('.ec-carton')[i]; b.scrollIntoView({ block: 'center' }); const q = b.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, i);
            const o = await off(); await page.mouse.click(o.x + r.x, o.y + r.y); await wait(60);
          }
          const labels = await frame.evaluate(() => [...document.querySelectorAll('.ec-carton .ec-tag')].map(t => t.textContent));
          is(labels.join() === [...Array(tens).keys()].map(i => 10 * (i + 1)).join(), `[${loc} @${w}] real taps label 10…${10 * tens} (got ${labels.join()})`);
          await frame.evaluate((v) => [...document.querySelectorAll('.ec-num')].find(b => b.dataset.v === String(v)).click(), 10 * tens + 10);
          await frame.click('.lcs-activity-check'); await wait(200);
          is(await frame.evaluate(() => /tryagain/.test(document.querySelector('.lcs-activity-bubble').className)), `[${loc} @${w}] wrong numeral → try-again`);
          await frame.evaluate((v) => [...document.querySelectorAll('.ec-num')].find(b => b.dataset.v === String(v)).click(), 10 * tens);
        } else {
          for (let i = 0; i < tens; i++) { await frame.click('.ec-add'); await wait(60); }
          is((await frame.evaluate(() => document.querySelectorAll('.ec-carton').length)) === tens, `[${loc} @${w}] ${tens} cartons packed`);
        }
        await frame.click('.lcs-activity-check'); await wait(400);
        const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent }));
        is(ok.cel, `[${loc} @${w}] ${kind} ${tens} → celebrates ("${ok.txt}")`);
        await wait(1300);
        const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
        is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Next bottom ${fit.nextBottom.toFixed(0)})`);
      };
      await play('count', 7);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-count.png`), fullPage: w < 500 });
      await play('pack', 6);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-pack.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-egg-cartons: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
