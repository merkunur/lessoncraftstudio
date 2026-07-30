#!/usr/bin/env node
/* Live post-deploy check: all eleven Say It Board landings, RENDERED.
   200 is not "it works" — the tool lives in a hydration-gated iframe, so
   this waits for the frame, waits for the board inside it, and counts
   cards + drawn icons. Cache disabled (Cloudflare 5-min TTL, §15.8). */
'use strict';
const puppeteer = require('puppeteer');

const PAGES = [
  ['en', 'say-it-board'], ['de', 'sag-es-tafel'], ['fr', 'tableau-pour-se-faire-comprendre'],
  ['it', 'tavola-per-farsi-capire'], ['es', 'tablero-para-decirlo'], ['pt', 'quadro-para-falar'],
  ['nl', 'zegbord'], ['sv', 'sag-det-tavlan'], ['da', 'sig-det-tavlen'],
  ['no', 'si-det-tavla'], ['fi', 'sanomistaulu']
];
const BASE = 'https://www.lessoncraftstudio.com';
let pass = 0, fail = 0;
const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const [loc, slug] of PAGES) {
    const url = `${BASE}/${loc}/tools/${slug}`;
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1280, height: 1000 });
    let r = null, err = null;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      /* poll for the iframe itself, then for the board inside it */
      let frame = null;
      for (let i = 0; i < 40 && !frame; i++) {
        frame = page.frames().find(f => /mini-tools\/home-language-bridge/.test(f.url()));
        if (!frame) await wait(500);
      }
      if (!frame) throw new Error('the tool iframe never appeared');
      await frame.waitForFunction(() => document.querySelectorAll('.hlb-card').length > 0, { timeout: 30000 });
      r = await frame.evaluate(() => {
        const c = Array.from(document.querySelectorAll('.hlb-card'));
        return {
          cards: c.length,
          icons: c.filter(x => {
            const d = x.querySelector('svg.hlb-icon path.hlb-ipath');
            return !!(d && (d.getAttribute('d') || '').length > 12);
          }).length,
          title: (document.querySelector('.lcs-title') || {}).textContent || '',
          first: (c[0].querySelector('.hlb-text') || {}).textContent || ''
        };
      });
      const h1 = await page.$eval('h1', (e) => e.textContent.trim()).catch(() => '');
      if (r.cards === 12 && r.icons === 12) {
        pass++; console.log(`  ok    ${loc}  h1="${h1}"  tool="${r.title.trim()}"  first="${r.first.trim()}"`);
      } else {
        fail++; console.error(`  FAIL  ${loc}  cards=${r.cards} icons=${r.icons}  ${url}`);
      }
    } catch (e) { err = e; fail++; console.error(`  FAIL  ${loc}  ${e.message}  ${url}`); }
    await page.close();
  }
  await browser.close();
  console.log(`\n${pass} rendered, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
