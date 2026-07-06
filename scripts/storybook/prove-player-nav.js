/* =====================================================================
   prove-player-nav.js — reader page-navigation gate for the storybook
   player (Round 8: SVG prev/next arrows + nav-generation guard).

   Drives the LIVE player on a multi-page story and asserts:
     1. arrows exist; prev HIDDEN on page 1, next visible
     2. next → page 2 (pip 'now' moves, prev appears)
     3. next mid-narration → page 3 (stale-chain guard: no crash, no
        double-advance a beat later)
     4. prev → back to page 2, page rebuilt (zone present)
     5. keyboard ArrowRight → page 3
     6. next through the last page → "The End" overlay
     7. ArrowLeft from The End → overlay removed, back on the last page
     8. zero page errors
   Screenshots (page1 / page2 / complete) → docs/audit-results/storybook/nav/

   USAGE:
     node scripts/storybook/prove-player-nav.js                  # vs prod
     node scripts/storybook/prove-player-nav.js --base=<origin>  # other host
   Story fixture: /mini-tools/stories/pips-picnic/ (5 pages, all interactive).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', 'frontend', 'node_modules', 'puppeteer'));

const BASE = (process.argv.find(a => a.startsWith('--base=')) || '--base=https://www.lessoncraftstudio.com').slice(7);
const URL = BASE + '/mini-tools/storybook.html?src=/mini-tools/stories/pips-picnic/&lang=en&debug=1';
const SHOTS = path.join(__dirname, '..', '..', 'docs', 'audit-results', 'storybook', 'nav');

let failures = 0;
function check(name, ok, detail) {
  console.log((ok ? '  PASS ' : '  FAIL ') + name + (ok ? '' : ' — ' + (detail || '')));
  if (!ok) failures++;
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--mute-audio'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 700 });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(String(e)));

  console.log('[prove-player-nav] ' + URL);
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForFunction('window.SB_PLAYER && window.SB_PLAYER.pageIndex() === 0', { timeout: 30000 });
  await page.evaluate('window.SBAudio && window.SBAudio.setMuted(true)');
  await sleep(600);

  const idx = () => page.evaluate('window.SB_PLAYER.pageIndex()');
  const vis = (sel) => page.evaluate((s) => {
    const el = document.querySelector(s);
    return !!el && getComputedStyle(el).display !== 'none';
  }, sel);
  const pipNow = () => page.evaluate(() =>
    Array.prototype.findIndex.call(document.querySelectorAll('.sb-pip'), p => p.classList.contains('now')));

  /* 1 — page 1 state */
  check('arrows built', await page.evaluate(() =>
    !!document.querySelector('.sb-nav-prev') && !!document.querySelector('.sb-nav-next')));
  check('prev hidden on page 1', !(await vis('.sb-nav-prev')));
  check('next visible on page 1', await vis('.sb-nav-next'));
  check('arrows are SVG symbols (no text)', await page.evaluate(() => {
    const n = document.querySelector('.sb-nav-next');
    return !!n.querySelector('svg polyline') && n.textContent.trim() === '';
  }));
  await page.screenshot({ path: path.join(SHOTS, 'page1.png') });

  /* 2 — next → page 2 */
  await page.click('.sb-nav-next');
  await sleep(900);
  check('next → page 2', (await idx()) === 1, 'pageIndex=' + (await idx()));
  check('pip "now" moved to 2', (await pipNow()) === 1);
  check('prev visible on page 2', await vis('.sb-nav-prev'));
  await page.screenshot({ path: path.join(SHOTS, 'page2.png') });

  /* 3 — next again immediately (mid-narration: stale-chain guard) */
  await page.click('.sb-nav-next');
  await sleep(500);
  check('next mid-narration → page 3', (await idx()) === 2, 'pageIndex=' + (await idx()));
  await sleep(2500); /* a stale celebration hold would auto-advance here */
  check('no ghost auto-advance after manual nav', (await idx()) === 2, 'pageIndex=' + (await idx()));

  /* 4 — prev → back to page 2, rebuilt */
  await page.click('.sb-nav-prev');
  await sleep(900);
  check('prev → back to page 2', (await idx()) === 1, 'pageIndex=' + (await idx()));
  check('page 2 rebuilt (zone present)', await page.evaluate(() => !!document.querySelector('.sb-zone')));

  /* 5 — keyboard */
  await page.keyboard.press('ArrowRight');
  await sleep(900);
  check('ArrowRight → page 3', (await idx()) === 2, 'pageIndex=' + (await idx()));

  /* 6 — walk to The End */
  const total = await page.evaluate('window.SB_PLAYER.pageCount()');
  for (let i = (await idx()); i < total; i++) {
    await page.click('.sb-nav-next').catch(() => {});
    await sleep(700);
  }
  check('The End overlay shown', await page.evaluate(() => !!document.querySelector('.sb-complete')));
  check('arrows hidden at The End', !(await vis('.sb-nav-next')));
  await page.screenshot({ path: path.join(SHOTS, 'complete.png') });

  /* 7 — back out of The End via keyboard */
  await page.keyboard.press('ArrowLeft');
  await sleep(900);
  check('ArrowLeft leaves The End', await page.evaluate(() => !document.querySelector('.sb-complete')));
  check('back on the last page', (await idx()) === total - 1, 'pageIndex=' + (await idx()));

  /* 8 — clean console */
  check('zero page errors', pageErrors.length === 0, pageErrors.slice(0, 3).join(' | '));

  await browser.close();
  console.log(failures === 0
    ? '[prove-player-nav] ALL PASS — screenshots in docs/audit-results/storybook/nav/'
    : '[prove-player-nav] ' + failures + ' FAILURE(S)');
  process.exit(failures === 0 ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
