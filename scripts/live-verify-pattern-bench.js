#!/usr/bin/env node
/* =====================================================================
   live-verify-pattern-bench.js — production check for TOOL #32, all 11.

   ⚠ FRESH BROWSER PER LOCALE. Sharing one browser across eleven locales
   gave a false negative on the eleventh page during the Sorting Hoops
   run, and localStorage leaked the previous locale's state between them.

   Per locale it asserts on the RENDERED landing page:
     - HTTP 200 (a missing live-tool-slugs key returns 410)
     - the iframe mounts and a 12-bead strip really exists inside it
     - the tool chrome is in THAT locale, not English
     - hreflang chain of 12, canonical self, JSON-LD present
     - zero console errors

   Usage: node scripts/live-verify-pattern-bench.js
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const fs = require('fs');
const path = require('path');

const BASE = 'https://www.lessoncraftstudio.com';
/* read the slugs and titles from what was actually REGISTERED, so this can
   never drift from the shipped content the way a second copy would */
const KEY = 'pattern-bench';
const MSG = path.join(__dirname, '..', 'frontend', 'messages', 'tool-content');
const SLUGS = {}, TITLES = {};
['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].forEach((loc) => {
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
  for (const loc of Object.keys(SLUGS)) {
    const url = `${BASE}/${loc}/tools/${SLUGS[loc]}`;
    console.log(`[${loc}] ${url}`);
    /* a fresh browser, not just a fresh page — see the header */
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

      /* the instrument itself, inside the iframe */
      const fh = await page.waitForSelector('iframe', { timeout: 20000 });
      const frame = await fh.contentFrame();
      await frame.waitForSelector('.ptn-wrap', { timeout: 20000 });
      await wait(1200);
      const t = await frame.evaluate(() => ({
        cells: document.querySelectorAll('.ptn-strip .ptn-cell').length,
        unit: document.querySelectorAll('.ptn-unit .ptn-slot').length,
        chips: Array.from(document.querySelectorAll('.ptn-chip')).map((b) => b.textContent).join(' | ')
      }));
      is(t.cells === 12, `the strip mounted with 12 beads (${t.cells})`);
      is(t.unit === 2, `the unit mounted (${t.unit})`);
      is(t.chips.length > 0, `chips: ${t.chips}`);
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
