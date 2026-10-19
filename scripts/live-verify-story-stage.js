#!/usr/bin/env node
/* =====================================================================
   live-verify-story-stage.js — drives the Story Stage ON PRODUCTION: the
   real activity page, real taps. 3 birds + 2 more: the narrator acts 3,
   Next before acting → "act out this line first", two taps on the pile,
   Next, 5 → the shell celebrates "3 and 2 more make 5". 7 balloons, 3 pop:
   no pile, three taps leave three crossed outlines, Next, a wrong 7 → the
   replay, 4 → celebrates.
   Usage: node scripts/live-verify-story-stage.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '024-story-stage', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'story-stage-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'story-stage-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="story-stage-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds story-stage-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.StoryStageActivity && window.StoryStageActivity.st && document.querySelector('.ss-place'), { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, ms) => {
        await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => !e.hidden && e.offsetParent !== null); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 250);
      };
      const state = () => frame.evaluate(() => { const s = window.StoryStageActivity.st, C = window.StoryStageCore; return { kind: s.kind, line: s.line, done: s.done, misses: s.misses, solid: C.solid(s), outs: s.places.filter(p => p && p.out).length }; });
      const note = () => frame.evaluate(() => { const n = document.querySelector('.ss-note'); return n.closest('[hidden]') || n.hidden ? '' : n.textContent; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      const force = (kind) => frame.evaluate((kind) => { const t = window.StoryStageActivity; t.FAST = true; const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, kind);
      const idle = () => frame.waitForFunction(() => { const t = window.StoryStageActivity; return !t._acting && !t._replay && !t._busy; }, { timeout: 15000 });
      /* 3 birds + 2 more */
      await force('bird'); await wait(300); await idle();
      is((await state()).solid === 3 && (await state()).line === 1, `[${loc} @${w}] the narrator acted 3 birds`);
      await tap('.ss-go', 300);
      is((await note()) === STR.hintAct[loc] && (await state()).misses === 0, `[${loc} @${w}] Next before acting → "${await note()}"`);
      await tap('.ss-pile'); await tap('.ss-pile');
      await tap('.ss-go', 300);
      is((await state()).line === 2 && (await state()).solid === 5, `[${loc} @${w}] two birds brought, the question is lit`);
      await tap('.ss-key[data-v="5"]'); await tap('.ss-go', 1800);
      is((await state()).done && (await bubble()) === interp(STR.sumAdd[loc], { a: 3, b: 2, c: 5 }), `[${loc} @${w}] 5 → "${await bubble()}"`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-add.png`), fullPage: w < 500 });
      /* 7 balloons, 3 pop */
      await force('balloon'); await wait(300); await idle();
      is(await frame.evaluate(() => document.querySelector('.ss-pile').hidden), `[${loc} @${w}] no pile in a take story`);
      for (let k = 0; k < 3; k++) { const i = await frame.evaluate(() => window.StoryStageActivity.st.places.findIndex(p => p && !p.out)); await tap(`.ss-place[data-i="${i}"]`, 500); }
      is((await state()).outs === 3 && (await state()).solid === 4, `[${loc} @${w}] three balloons popped, three outlines stay`);
      await tap('.ss-go', 300);
      await tap('.ss-key[data-v="7"]'); await tap('.ss-go', 400);
      is((await state()).misses === 1 && (await frame.evaluate(() => !!window.StoryStageActivity._replay)), `[${loc} @${w}] 7 → the replay`);
      await idle(); await wait(200);
      is((await note()) === STR.hintReplayLeft[loc], `[${loc} @${w}] replay note "${await note()}"`);
      await tap('.ss-key[data-v="4"]'); await tap('.ss-go', 1800);
      is((await state()).done && (await bubble()) === interp(STR.sumTake[loc], { a: 7, b: 3, c: 4 }), `[${loc} @${w}] 4 → "${await bubble()}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-take.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-story-stage: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
