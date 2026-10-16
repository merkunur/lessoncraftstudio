#!/usr/bin/env node
/* =====================================================================
   live-verify-writing-line.js — drives the Fading Line ON PRODUCTION: real
   activity page, real pointer drags; a backwards drag on the 3 (named), the
   three boxes written by the ideal path (the round checks itself), then the
   "always" guide on the 7; the iframe must grow with the card.
   Usage: node scripts/live-verify-writing-line.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '005-writing-line', 'live'));
const ROW = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'writing-line-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const CORE = require(path.join(__dirname, '..', 'mini tools', 'writing-line-core.js'));
const { ST } = CORE.deps();
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
      const frameEl = await page.waitForSelector('iframe[src*="writing-line-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds writing-line-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.WritingLineActivity && window.WritingLineActivity.st, { timeout: 30000 });
      await wait(500);
      const off = async () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const drag = async (b, pts) => {
        const r = await frame.evaluate((b) => { const sv = document.querySelectorAll('.wl-box')[b].firstChild; sv.scrollIntoView({ block: 'center' }); const q = sv.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }, b);
        const o = await off();
        const px = (p) => ({ x: o.x + r.x + p.x / 100 * r.w, y: o.y + r.y + p.y / 100 * r.h });
        const p0 = px(pts[0]); await page.mouse.move(p0.x, p0.y); await page.mouse.down();
        for (let i = 1; i < pts.length; i++) { const p = px(pts[i]); await page.mouse.move(p.x, p.y, { steps: 2 }); }
        await page.mouse.up(); await wait(60);
      };
      const force = async (d) => { await frame.evaluate((d) => { const t = window.WritingLineActivity; const i = t._pool.findIndex(r => r.digit === d); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, d); await wait(600); };
      const strokesOf = () => frame.evaluate(() => window.WritingLineActivity.st.strokes);
      const writeBox = async (b) => { const s = await strokesOf(); for (let i = 0; i < s.length; i++) await drag(b, ST.flatten(s[i], 1.2)); };
      await force(3);
      let st = await frame.evaluate(() => ({ d: window.WritingLineActivity.st.digit, boxes: document.querySelectorAll('.wl-box').length, shown: [...document.querySelectorAll('.wl-box')].filter(b => b.style.display !== 'none').length }));
      is(st.d === 3 && st.boxes === 3 && st.shown === (w > 500 ? 3 : 1), `[${loc} @${w}] the 3 on ${st.shown} visible box(es)`);
      const strokes = await strokesOf();
      await drag(0, ST.flatten(CORE.reverseStroke(strokes[0]), 1.2));
      const n1 = await frame.evaluate(() => ({ t: document.querySelector('.wl-note').textContent, slip: document.querySelector('.wl-note').classList.contains('is-slip'), fails: window.WritingLineActivity.st.cells[0].fails }));
      is(n1.slip && n1.fails === 1, `[${loc} @${w}] a backwards drag is named ("${n1.t}")`);
      await writeBox(0); await writeBox(1); await writeBox(2); await wait(1400);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, done: window.WritingLineActivity.st.done, inks: [...document.querySelectorAll('.wl-box')].map(b => b.querySelectorAll('.wl-ink:not(.wl-ink-live)').length), next: !document.querySelector('.lcs-activity-next').hidden }));
      is(ok.cel && ok.done && ok.next && ok.inks.every(n => n === strokes.length), `[${loc} @${w}] three boxes written by real drags → the round checked itself ("${ok.txt}")`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const nxt = f.contentDocument.querySelector('.lcs-activity-next').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, nextBottom: nxt.bottom }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8 && fit.nextBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Next bottom ${fit.nextBottom.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-3.png`), fullPage: w < 500 });
      await frame.evaluate(() => { const t = window.WritingLineActivity; t.api.settings.guide = 'full'; t.onSettings('guide', 'full'); });
      await wait(400); await force(7);
      const g = await frame.evaluate(() => ({ guide: window.WritingLineActivity.st.guide, roads: [...document.querySelectorAll('.wl-box')].map(b => b.querySelectorAll('.wl-road').length), strokes: window.WritingLineActivity.st.strokes.length }));
      is(g.guide === 'full' && g.roads.every(n => n === g.strokes), `[${loc} @${w}] the "always" guide lays the road in every box (7 has ${g.strokes} stroke(s) in ${loc})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-7.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-writing-line: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
