#!/usr/bin/env node
/* =====================================================================
   live-verify-our-day.js — 11 locales ON PRODUCTION, a fresh browser
   each, DRIVING the controls.

   ⚠ "IT MOUNTS" IS NOT VERIFICATION. The two worst defects in this
   rebuild — a display mode that could not be left, and a palette sheet
   clipped below its first row — both rendered perfectly and were only
   found by driving the thing and then LOOKING at it.

   ⚠ NON-VACUITY FIRST. Every assertion below is preceded by a check
   that the collection it inspects is non-empty, because a
   querySelectorAll comparison is not evidence until you have shown it
   selected something.
   ===================================================================== */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = process.env.OUR_DAY_BASE || 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const SLUG = {
  en: 'our-day', de: 'unser-tag', fr: 'notre-journee', it: 'la-nostra-giornata',
  es: 'nuestro-dia', pt: 'nosso-dia', nl: 'onze-dag', sv: 'var-dag',
  da: 'vores-dag', no: 'dagen-var', fi: 'meidan-paiva'
};

let checks = 0;
const fails = [];
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

(async () => {
  console.log('production: ' + BASE + '\n');
  for (const loc of LOCALES) {
    /* fresh browser per locale — a shared one caches the module and
       reuses the origin, so later locales pass on an earlier one's copy */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.setViewport({ width: 1280, height: 900 });

    const url = `${BASE}/${loc}/tools/${SLUG[loc]}`;
    let landed = true;
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      ok(resp && resp.status() === 200, `${loc}: landing ${url} -> ${resp && resp.status()}`);
    } catch (e) { landed = false; fails.push(`${loc}: landing did not load — ${e.message}`); }

    if (landed) {
      /* the iframe, at the width the tool page actually gives it */
      const frameEl = await page.$('iframe');
      ok(!!frameEl, `${loc}: no iframe on the tool page`);
      if (frameEl) {
        const box = await frameEl.boundingBox();
        ok(box && box.width > 300, `${loc}: iframe width ${box && Math.round(box.width)}`);
        const frame = await frameEl.contentFrame();
        ok(!!frame, `${loc}: iframe has no content frame`);
        if (frame) {
          try {
            await frame.waitForSelector('.od-wrap', { timeout: 25000 });

            /* --- non-vacuity, then substance --- */
            const seen = await frame.evaluate(() => ({
              wraps: document.querySelectorAll('.od-wrap').length,
              addSlot: document.querySelectorAll('.od-addslot').length,
              title: (document.querySelector('.lcs-title') || {}).textContent || '',
              rawKeys: (document.body.textContent.match(/\b(soonFrame|dayDoneTitle|addOwn|makeTitle|noticeFull|recentLbl|makeNew)\b/g) || []).length
            }));
            ok(seen.wraps === 1, `${loc}: expected one .od-wrap, saw ${seen.wraps}`);
            ok(seen.addSlot >= 1, `${loc}: the add-a-card slot is absent`);
            ok(seen.title.trim().length > 0, `${loc}: the tool title is empty`);
            ok(seen.rawKeys === 0, `${loc}: a RAW STRING KEY is rendering (${seen.rawKeys} found)`);

            /* --- DRIVE IT: open the palette, add a card, start the day,
                   move the sun. Never "it mounts". --- */
            await frame.click('.od-addslot');
            await new Promise((r) => setTimeout(r, 700));
            const tiles = await frame.$$('.od-tile');
            ok(tiles.length >= 5, `${loc}: palette opened with only ${tiles.length} tiles`);
            /* reach controls BY INDEX, never by English text */
            for (const i of [0, 1, 2]) {
              await frame.evaluate((n) => { const t = document.querySelectorAll('.od-tile'); if (t[n]) t[n].click(); }, i);
              await new Promise((r) => setTimeout(r, 180));
            }
            await frame.evaluate(() => { const c = document.querySelector('.od-close'); if (c) c.click(); });
            await new Promise((r) => setTimeout(r, 400));
            const built = await frame.$$eval('.od-card', (n) => n.length);
            ok(built >= 3, `${loc}: tapped 3 tiles, strip holds ${built}`);

            await frame.click('.od-start');
            await new Promise((r) => setTimeout(r, 500));
            const running = await frame.evaluate(() => ({
              sun: document.querySelectorAll('.od-sun').length,
              mode: window.OurDay && OurDay.mode
            }));
            ok(running.sun === 1, `${loc}: expected one sun after Start, saw ${running.sun}`);
            ok(running.mode === 'run', `${loc}: mode is ${running.mode} after Start`);

            /* the two-stage advance, driven with a real click */
            await frame.click('.od-sun');
            await new Promise((r) => setTimeout(r, 350));
            const warned = await frame.evaluate(() => ({ soon: document.querySelectorAll('.od-card.od-soon').length, w: OurDay.day.warned, s: OurDay.day.sunIdx }));
            ok(warned.w === true, `${loc}: the first sun tap did not arm the warning`);
            ok(warned.soon === 1, `${loc}: the warning ring is not on the next card (${warned.soon})`);
            ok(warned.s === 0, `${loc}: the warning tap MOVED the sun (to ${warned.s})`);

            await frame.click('.od-sun');
            await new Promise((r) => setTimeout(r, 400));
            const moved = await frame.evaluate(() => ({ s: OurDay.day.sunIdx, done: document.querySelectorAll('.od-card.od-done').length }));
            ok(moved.s === 1, `${loc}: the second tap did not cross (sunIdx ${moved.s})`);
            ok(moved.done === 1, `${loc}: the departed card is not marked done (${moved.done})`);

            /* the free tier must NOT hand over the premium print sheet */
            const paywall = await frame.evaluate(() => ({
              premium: !!OurDay.premium,
              printDocs: document.querySelectorAll('.od-printdocs .od-doc').length
            }));
            if (!paywall.premium) ok(paywall.printDocs === 0, `${loc}: FREE TIER HAS THE PRINT SHEET IN THE DOM (${paywall.printDocs})`);

            ok(errs.length === 0, `${loc}: console error — ${errs[0]}`);
          } catch (e) {
            fails.push(`${loc}: driving the tool threw — ${e.message}`);
          }
        }
      }
    }
    await browser.close();
    process.stdout.write(loc + ' ');
  }

  console.log(`\n\n${checks} assertions across ${LOCALES.length} locales on production`);
  if (!checks) { console.error('FATAL: measured nothing'); process.exit(1); }
  if (fails.length) {
    console.error(`FAIL — ${fails.length}:`);
    fails.forEach((f) => console.error('  x ' + f));
    process.exit(1);
  }
  console.log('PASS — live, in every locale, driving the sun');
})();
