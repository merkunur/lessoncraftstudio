#!/usr/bin/env node
/* =====================================================================
   live-verify-how-many.js — drives the Counting Table ON PRODUCTION.
   Opens the real activity page (the Next.js wrapper, iframe at the live
   width), waits for the instrument inside the iframe, taps every animal
   of the first round with a real pointer, answers wrong then right, and
   screenshots the page at desktop (1366) and phone (390) widths.
   "It mounts" is not evidence; the main control must MOVE SOMETHING.
   Usage: node scripts/live-verify-how-many.js [--locales=en,sv] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '001-how-many', 'live'));
const ROWS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'how-many-activities.json'), 'utf8'));
const ROW = ROWS.find(r => r.id === 'ten-frame.how-many.0-10.animals');
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
      is(res && res.status() === 200, `[${loc} @${w}] ${url} → ${res && res.status()}`);
      const frameEl = await page.waitForSelector('iframe[src*="how-many-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds how-many-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(/v=9\.725/.test(src), `[${loc} @${w}] wrapper version 9.725 in the iframe src (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.HowManyActivity && window.HowManyActivity.theme && document.querySelectorAll('.hm-pic').length === window.HowManyActivity.st.n, { timeout: 30000 });
      await wait(500);
      const n = await frame.evaluate(() => window.HowManyActivity.st.n);
      const fw = await page.evaluate(f => f.getBoundingClientRect().width, frameEl);
      console.log(`[${loc} @${w}] round n=${n}, iframe ${fw.toFixed(0)}px wide`);
      is(w < 500 || fw >= 700, `[${loc} @${w}] iframe is ≥700px on desktop (${fw.toFixed(0)})`);
      /* real pointer taps inside the iframe: page coordinates = frame offset + element rect */
      const off = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      for (let i = 0; i < n; i++) {
        const r = await frame.evaluate(i => { const b = document.querySelectorAll('.hm-pic')[i]; b.scrollIntoView({ block: 'center' }); const q = b.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, i);
        const off2 = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        await page.mouse.click(off2.x + r.x, off2.y + r.y);
        await wait(60);
      }
      const tags = await frame.evaluate(() => document.querySelectorAll('.hm-pic.is-tagged').length);
      is(tags === n, `[${loc} @${w}] ${tags}/${n} animals tagged by real taps`);
      if (n > 0) {
        await frame.evaluate((v) => [...document.querySelectorAll('.hm-num')].find(b => b.dataset.v === String(v)).click(), n === 10 ? 9 : n + 1);
        await frame.click('.lcs-activity-check'); await wait(200);
        const wrong = await frame.evaluate(() => ({ cls: document.querySelector('.lcs-activity-bubble').className, txt: document.querySelector('.lcs-activity-bubble').textContent }));
        is(/tryagain/.test(wrong.cls) && wrong.txt.length > 5, `[${loc} @${w}] wrong numeral → try-again bubble ("${wrong.txt.slice(0, 40)}")`);
      }
      await frame.evaluate((v) => [...document.querySelectorAll('.hm-num')].find(b => b.dataset.v === String(v)).click(), n);
      await frame.click('.lcs-activity-check'); await wait(300);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent }));
      is(ok.cel, `[${loc} @${w}] right numeral → celebrates ("${ok.txt}")`);
      /* the operator's defect: after Next and after "Mix them up" the card grows and
         the iframe must grow with it — the Check button must stay inside the iframe */
      await frame.click('.lcs-activity-next'); await wait(500);
      const mixOn = await frame.evaluate(() => { const m = document.querySelector('.hm-mix'); return m && !m.disabled; });
      if (mixOn) { await frame.click('.hm-mix'); await wait(500); }
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); const chk = f.contentDocument.querySelector('.lcs-activity-check').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height, checkBottom: chk.bottom }; }, frameEl);
      /* the shell rounds up and the iframe animates its height; the control inside the frame is the test */
      is(fit.frameH >= fit.cardH - 8 && fit.checkBottom <= fit.frameH + 1, `[${loc} @${w}] iframe grows with the card after Next/Mix (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)}, Check bottom ${fit.checkBottom.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-how-many: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
