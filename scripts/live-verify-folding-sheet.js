#!/usr/bin/env node
/* =====================================================================
   live-verify-folding-sheet.js — production check for TOOL #34, all 11.

   ⚠ FRESH BROWSER PER LOCALE. Sharing one browser across eleven locales
   gave a false negative on the eleventh page during an earlier run, and
   localStorage leaked the previous locale's state between them.

   Per locale, on the RENDERED landing page:
     - HTTP 200 (a missing live-tool-slugs key returns 410)
     - the iframe mounts, the line is there and every pair of words has
       a tappable gap between them
     - the chrome is in THAT locale
     - hreflang chain of 12, canonical self, JSON-LD
     - zero console errors

   Usage: node scripts/live-verify-folding-sheet.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
/* read from what was actually REGISTERED, so this can never drift from
   the shipped content the way a second copy would */
const KEY = 'folding-sheet';
const MSG = path.join(__dirname, '..', 'frontend', 'messages', 'tool-content');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SLUGS = {}, TITLES = {};
LOCALES.forEach((loc) => {
  const e = JSON.parse(fs.readFileSync(path.join(MSG, `${loc}.json`), 'utf8'))[KEY];
  if (!e) { console.error(`FATAL ${loc}.json has no "${KEY}" entry — registration did not run`); process.exit(1); }
  SLUGS[loc] = e.slug; TITLES[loc] = e.name;
});

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}/tools/${SLUGS[loc]}`;
    console.log(`[${loc}] ${url}`);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/favicon|net::ERR_ABORT/.test(m.text())) errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(String(e)));
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      is(res && res.status() === 200, `HTTP ${res ? res.status() : 'none'}`);
      if (!res || res.status() !== 200) { await browser.close(); continue; }

      const head = await page.evaluate(() => ({
        canonical: (document.querySelector('link[rel=canonical]') || {}).href || null,
        hreflang: document.querySelectorAll('link[rel=alternate][hreflang]').length,
        ld: document.querySelectorAll('script[type="application/ld+json"]').length,
        h1: (document.querySelector('h1') || {}).textContent || ''
      }));
      is(head.canonical === url || head.canonical === url + '/', `canonical self (${head.canonical})`);
      is(head.hreflang === 12, `hreflang chain 12 (${head.hreflang})`);
      is(head.ld >= 1, `JSON-LD present (${head.ld})`);
      is(head.h1.trim() === TITLES[loc], `h1 in locale: "${head.h1.trim()}"`);

      const fh = await page.waitForSelector('iframe', { timeout: 20000 });
      const frame = await fh.contentFrame();
      await frame.waitForSelector('.fsh-wrap', { timeout: 20000 });
      await wait(1200);
      const t = await frame.evaluate(() => ({
        cells: document.querySelectorAll('.fsh-cell').length,
        gaps: document.querySelectorAll('.fsh-gap').length,
        glyphs: document.querySelectorAll('.fsh-glyph').length,
        crease: document.querySelectorAll('.fsh-crease').length,
        swatches: document.querySelectorAll('.fsh-swatch').length,
        square: (() => {
          const r = document.querySelector('.fsh-sheet').getBoundingClientRect();
          return Math.abs(r.width - r.height);
        })(),
        chips: Array.from(document.querySelectorAll('.fsh-chip')).map((b) => b.textContent).join(' | ')
      }));
      is(t.cells === 64, `the sheet mounted, eight by eight (${t.cells} squares)`);
      is(t.gaps === 7, `a gap handle between every pair of columns (${t.gaps})`);
      is(t.glyphs === 4, `four crease directions (${t.glyphs})`);
      is(t.crease === 1, 'the crease is on the sheet');
      is(t.swatches === 4, `four colours to paint with (${t.swatches})`);
      is(t.square <= 1.5, `the sheet is square, so the diagonals stay exact (|w-h| = ${t.square.toFixed(2)}px)`);
      is(t.chips.length > 0, `chips: ${t.chips}`);

      /* ⭐ AND THE FOLD ACTUALLY FOLDS, ON PRODUCTION, IN THIS LOCALE.
         A page that merely mounts proves nothing — Class Graph shipped a
         dead button past five green suites, so the live check drives the
         one control the whole tool exists for. */
      const folded = await frame.evaluate(() => {
        const cells = [9, 10, 17, 18, 25];
        cells.forEach((i) => {
          const c = document.querySelector('.fsh-cell[data-i="' + i + '"]');
          if (c) c.click();
        });
        return true;
      });
      await wait(400);
      const foldChip = await frame.evaluate(() => {
        /* the fold chip is the first chip after the four glyphs */
        const b = Array.from(document.querySelectorAll('.fsh-chip'))
          .filter((x) => !/fsh-glyph/.test(x.className));
        if (!b.length) return null;
        b[0].click();
        return b[0].textContent;
      });
      await wait(900);
      const after = await frame.evaluate(() => ({
        flap: document.querySelectorAll('.fsh-flap').length,
        layered: document.querySelectorAll('.fsh-l-two,.fsh-l-one,.fsh-l-twotone').length,
        clipped: (document.querySelector('.fsh-sheet').style.clipPath || '').length > 0
      }));
      is(folded && foldChip !== null, `the fold chip is there in this locale ("${foldChip}")`);
      is(after.flap === 1, 'folding lays the far half over the near half');
      is(after.clipped, 'and the sheet really is narrower once folded');
      is(after.layered > 0, `the paper says what happened (${after.layered} squares carry a layer state)`);
      is(errs.length === 0, `zero console errors${errs.length ? ' — ' + errs[0] : ''}`);
    } catch (e) {
      bad(`${loc}: ${String(e).slice(0, 160)}`);
    }
    await browser.close();
  }
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
