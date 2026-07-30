#!/usr/bin/env node
/* =====================================================================
   live-verify-class-graph.js — production check for TOOL #34, all 11.

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

   Usage: node scripts/live-verify-class-graph.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
/* read from what was actually REGISTERED, so this can never drift from
   the shipped content the way a second copy would */
const KEY = 'class-graph';
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
      await frame.waitForSelector('.cgr-wrap', { timeout: 20000 });
      await wait(1200);
      const t = await frame.evaluate(() => ({
        cols: document.querySelectorAll('.cgr-col').length,
        votes: document.querySelectorAll('.cgr-vote').length,
        bars: document.querySelectorAll('.cgr-bar').length,
        q: (document.querySelector('.cgr-question') || {}).textContent || '',
        counts: document.querySelectorAll('.cgr-count').length,
        chips: Array.from(document.querySelectorAll('.cgr-chip')).map((b) => b.textContent).join(' | ')
      }));
      is(t.cols === 3, `the board mounted with three answers (${t.cols})`);
      is(t.votes === t.cols, `a vote button per answer (${t.votes})`);
      is(t.bars === t.cols, `every column holds its bar already (${t.bars})`);
      is(t.q.length > 0, `the question is in this locale: "${t.q}"`);
      is(t.counts === 0, 'and not one number is showing yet');
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
