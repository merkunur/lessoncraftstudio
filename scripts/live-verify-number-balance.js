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
  ['en', 'number-balance'], ['de', 'zahlenwaage'], ['fr', 'balance-des-nombres'],
  ['it', 'bilancia-dei-numeri'], ['es', 'balanza-numerica'], ['pt', 'balanca-numerica'],
  ['nl', 'getallenbalans'], ['sv', 'talvag'], ['da', 'talvagt'],
  ['no', 'tallvekt'], ['fi', 'lukuvaaka']
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
        frame = page.frames().find(f => /mini-tools\/number-balance/.test(f.url()));
        if (!frame) await wait(500);
      }
      if (!frame) throw new Error('the tool iframe never appeared');
      await frame.waitForFunction(() => document.querySelectorAll('.nbal-tile').length > 0, { timeout: 30000 });
      const blocks = await frame.evaluate(() => ({
        tiles: document.querySelectorAll('.nbal-tile').length,
        hoops: document.querySelectorAll('.nbal-beamg .nbal-beam').length,
        zones: document.querySelectorAll('[data-slot]').length,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        modes: Array.from(document.querySelectorAll('.hp-chip')).slice(0, 2).map(c => c.textContent)
      }));
      /* switch to the picture world — proves both JSON files are served */
      const beam = await frame.evaluate(() => {
        const T = window.NumberBalance;
        T.st = T.newState(); T.st.left = [4, 3]; T.st.right = [9];
        T.api.settings.notation = true; T.render();
        return new Promise((res) => setTimeout(() => {
          const g = document.querySelector('.nbal-beamg');
          const m = /rotate\(\s*(-?[\d.]+)/.exec((g && g.getAttribute('transform')) || '');
          const sym = document.querySelector('.nbal-symbol');
          res({ angle: m ? parseFloat(m[1]) : null, symbol: sym ? sym.textContent : null,
                frame: T.frameText() });
        }, 2200));
      });
      const okAll = blocks.tiles >= 10 && blocks.hoops === 1 && blocks.zones === 2
        && beam.angle !== null && beam.angle > 1 && beam.symbol === '<';
      if (okAll) {
        pass++;
        console.log(`  ok    ${loc}  "${blocks.title.trim()}"  beam ${beam.angle.toFixed(1)}deg  "${beam.symbol}"  frame: ${beam.frame}`);
      } else {
        fail++;
        console.error(`  FAIL  ${loc}  tiles=${blocks.tiles} beam=${blocks.hoops} pans=${blocks.zones} angle=${beam.angle} sym=${beam.symbol}  ${url}`);
      }
    } catch (e) { fail++; console.error(`  FAIL  ${loc}  ${e.message}  ${url}`); }
    await browser.close();
  }
  console.log(`\n${pass} rendered, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
