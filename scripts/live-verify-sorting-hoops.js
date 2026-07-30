#!/usr/bin/env node
/* Live post-deploy check for Sorting Hoops, all eleven landings, RENDERED.
   200 is not "it works": the tool lives in a hydration-gated iframe and its
   picture world is a runtime join of two served JSON files, so this waits for
   the frame, counts the hoops and the tray, and then switches to the picture
   world to prove object-attributes.json and syllable-counts.json actually
   reach the browser. Cache disabled (Cloudflare 5-min TTL, §15.8). */
'use strict';
const puppeteer = require('puppeteer');

const PAGES = [
  ['en', 'sorting-hoops'], ['de', 'sortierreifen'], ['fr', 'cerceaux-de-tri'],
  ['it', 'cerchi-per-classificare'], ['es', 'aros-para-clasificar'], ['pt', 'arcos-de-classificacao'],
  ['nl', 'sorteerhoepels'], ['sv', 'sorteringsringar'], ['da', 'sorteringsringe'],
  ['no', 'sorteringsringer'], ['fi', 'lajitteluvanteet']
];
const BASE = 'https://www.lessoncraftstudio.com';
let pass = 0, fail = 0;
const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* ⚠ A FRESH BROWSER PER LOCALE, not a shared one. Sharing produced a false
   negative: the eleventh page reported "the tool iframe never appeared" while
   the identical URL rendered perfectly on its own. A harness that fails on
   page eleven and passes on page one is measuring itself, not the site. */
(async () => {
  for (const [loc, slug] of PAGES) {
    const url = `${BASE}/${loc}/tools/${slug}`;
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1280, height: 1000 });
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      let frame = null;
      for (let i = 0; i < 60 && !frame; i++) {
        frame = page.frames().find(f => /mini-tools\/sorting-hoops/.test(f.url()));
        if (!frame) await wait(500);
      }
      if (!frame) throw new Error('the tool iframe never appeared');
      await frame.waitForFunction(() => document.querySelectorAll('.hp-tile').length > 0, { timeout: 30000 });
      const blocks = await frame.evaluate(() => ({
        tiles: document.querySelectorAll('.hp-tile').length,
        hoops: document.querySelectorAll('.hp-svg ellipse').length,
        zones: document.querySelectorAll('[data-slot]').length,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        modes: Array.from(document.querySelectorAll('.hp-chip')).slice(0, 2).map(c => c.textContent)
      }));
      /* switch to the picture world — proves both JSON files are served */
      const pics = await frame.evaluate(() => {
        const T = window.SortingHoops;
        T.world = 'picture'; T._newRound();
        return new Promise((res) => setTimeout(() => res({
          n: (T._pictures || []).length,
          withSyl: (T._pictures || []).filter(p => p.syl).length,
          withAttr: (T._pictures || []).filter(p => p.attr && p.attr.living).length,
          sample: (T.tray[0] || {}).word || null
        }), 3500));
      });
      const okAll = blocks.tiles === 12 && blocks.hoops === 2 && blocks.zones === 5
        && pics.n > 500 && pics.withAttr > 500 && pics.withSyl > 300;
      if (okAll) {
        pass++;
        console.log(`  ok    ${loc}  "${blocks.title.trim()}"  [${blocks.modes.join(' | ')}]  pictures ${pics.n} (attr ${pics.withAttr}, syl ${pics.withSyl})  e.g. ${pics.sample}`);
      } else {
        fail++;
        console.error(`  FAIL  ${loc}  tiles=${blocks.tiles} hoops=${blocks.hoops} zones=${blocks.zones} pics=${pics.n} attr=${pics.withAttr} syl=${pics.withSyl}  ${url}`);
      }
    } catch (e) { fail++; console.error(`  FAIL  ${loc}  ${e.message}  ${url}`); }
    await browser.close();
  }
  console.log(`\n${pass} rendered, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
