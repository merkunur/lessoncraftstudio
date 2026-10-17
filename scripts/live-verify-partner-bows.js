#!/usr/bin/env node
/* =====================================================================
   live-verify-partner-bows.js — drives the Partner Bows ON PRODUCTION:
   real activity page, real taps. Six bees spread out against eight huddled
   flowers: six pairs made by tapping (six bows), "The same" → "look who
   has no partner", again → the two flowers without a partner ringed,
   "More" on the flowers → "Yes — 8 is more than 6!", both groups numbered;
   the iframe grows with the card.
   Usage: node scripts/live-verify-partner-bows.js [--locales=en,sv,fi] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '017-partner-bows', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'partner-bows-activities.json'), 'utf8'))[0];
const STR = require(path.join(MT, 'partner-bows-activity.js')).strings;
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
      const frameEl = await page.waitForSelector('iframe[src*="partner-bows-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds partner-bows-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PartnerBowsActivity && window.PartnerBowsActivity.st && Object.keys(window.PartnerBowsActivity._themes).length >= 5, { timeout: 30000 });
      await wait(400);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const tap = async (sel, pick, ms) => {
        await frame.evaluate((s, p) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null)[p || 0]; if (!el) throw new Error('no ' + s); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, sel, pick);
        await wait(200); const o = await off();
        const c = await frame.evaluate((s, p) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null)[p || 0]; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
        await page.mouse.click(o.x + c.x, o.y + c.y); await wait(ms || 300);
      };
      const st = () => frame.evaluate(() => { const s = window.PartnerBowsActivity.st; return { a: s.a, b: s.b, pairs: s.pairs.length, misses: s.misses, done: s.done }; });
      const bubble = () => frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      await frame.evaluate(() => { const t = window.PartnerBowsActivity; const i = t._pool.findIndex(r => r.a === 6 && r.b === 8); const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(800);
      const s0 = await st();
      is(s0.a === 6 && s0.b === 8, `[${loc} @${w}] six bees on top, eight flowers below`);
      for (let k = 0; k < 6; k++) { await tap('.pb-mat-a .pb-it', k, 150); await tap('.pb-mat-b .pb-it', k, 150); }
      is((await st()).pairs === 6 && (await frame.evaluate(() => document.querySelectorAll('.pb-bow.is-on').length)) === 12, `[${loc} @${w}] six pairs tapped, twelve bows`);
      await tap('.pb-same', 0); await tap('.lcs-activity-check', 0, 600);
      is((await bubble()) === STR.hintLeft[loc] && (await st()).misses === 1, `[${loc} @${w}] "The same" → "${await bubble()}"`);
      await tap('.lcs-activity-check', 0, 600);
      is((await bubble()) === STR.hintTied[loc] && (await frame.evaluate(() => document.querySelectorAll('.pb-mat-b .pb-it.is-lone').length)) === 2, `[${loc} @${w}] again → the two flowers without a partner ringed`);
      await tap('.pb-mat-b .pb-more', 0); await tap('.lcs-activity-check', 0, 900);
      const ok = await frame.evaluate(() => ({ cel: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), txt: document.querySelector('.lcs-activity-bubble').textContent, gold: document.querySelectorAll('.pb-num.is-gold').length }));
      is((await st()).done && ok.cel && ok.txt === interp(STR.celebrateMore[loc], { m: 8, f: 6 }) && ok.gold === 2, `[${loc} @${w}] "More" on the flowers → "${ok.txt}"`);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-partner-bows: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
