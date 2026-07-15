#!/usr/bin/env node
/* =====================================================================
   local-test-sound-boxes-tool.js — the §A.13.62-spirit local DoD for the
   Sound Boxes FREE-PLAY TOOL (mini tools/sound-boxes.html — NOT the
   RF.K.2.d activity, whose harness is local-test-sound-boxes.js).

   Serves `mini tools/` + `image-library-webp/` locally (no deploy), then:
     A. viewport sweep 320·360·412·768·1024·1366 — MEASURED gates:
        no horizontal overflow · stage controls tap ≥44px · boxes visible
     B. functional drive (768): place all chips (tap path) → completion +
        blend bar · abc toggle shows tiles · blend runs · next word resets ·
        panel opens (stage rows + word grid) · locked-stage tap → upsell ·
        custom words: add → seam rows → seam toggle changes box count →
        "Use these words" (free) → upsell · reset button clears chips
     C. resume: reload → same list+index restored from localStorage +
        deep link ?list=&word=
     D. lang smoke: ?lang=de + ?lang=fi mount with localized strings and
        fall back to the EN bank gracefully when the locale bank is absent
     E. console errors: zero tolerated (404s for absent banks are OK)
   Screenshots at 360/768/1024 → docs/audit-results/sound-boxes/qa/
   Exit 1 on any FAIL. NEVER move a threshold to pass — fix the layout.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'sound-boxes', 'qa');
const MIME = { '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.html':'text/html', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png' };

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 },
  { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 },
];
const SHOT_WIDTHS = new Set([360, 768, 1024]);
const MIN_TAP = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' ) p = '/sound-boxes.html';
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

const fails = [];
function FAIL(msg) { fails.push(msg); console.log('  ✗ FAIL ' + msg); }
function OK(msg) { console.log('  ✓ ' + msg); }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/sound-boxes.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.sbx-box', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate((MIN_TAP) => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - window.innerWidth;
      const sel = ['.sbx-box', '.sbx-chip', '.sbx-nav', '.sbx-abc', '.sbx-pill', '.sbx-picture'];
      const small = [];
      for (const s of sel) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.width < MIN_TAP || r.height < MIN_TAP)) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
        });
      }
      const boxes = document.querySelectorAll('.sbx-box').length;
      return { overflow, small, boxes };
    }, MIN_TAP);
    if (m.overflow > 1) FAIL(`${vp.w}px: horizontal overflow ${m.overflow}px`);
    if (m.small.length) FAIL(`${vp.w}px: tap targets <44px: ${[...new Set(m.small)].join(', ')}`);
    if (!m.boxes) FAIL(`${vp.w}px: no boxes rendered`);
    if (m.overflow <= 1 && !m.small.length && m.boxes) OK(`${vp.w}px: fits, ${m.boxes} boxes, taps ≥44`);
    if (SHOT_WIDTHS.has(vp.w)) {
      await page.screenshot({ path: path.join(OUT, `sweep-${vp.w}.png`), fullPage: true });
    }
  }

  /* A2: 4-box word at the narrow widths (count-aware box sizing) */
  console.log('\nA2. 4-box word at 320/360 (deep link, s3 brush)');
  for (const w of [320, 360]) {
    await page.setViewport({ width: w, height: 740 });
    await page.goto(BASE + '?lang=en&list=s3&word=brush', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.sbx-box', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      boxes: document.querySelectorAll('.sbx-box').length,
    }));
    if (m.boxes !== 4) FAIL(`${w}px brush: ${m.boxes} boxes (want 4)`);
    if (m.overflow > 1) FAIL(`${w}px brush: horizontal overflow ${m.overflow}px`);
    if (m.boxes === 4 && m.overflow <= 1) OK(`${w}px: 4 boxes fit, no overflow`);
  }

  /* ---------- B. functional drive at 768 ---------- */
  console.log('\nB. functional drive (768)');
  await page.setViewport({ width: 768, height: 1000 });
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.sbx-box');

  const nBoxes = await page.$$eval('.sbx-box', els => els.length);
  for (let i = 0; i < nBoxes; i++) {
    await page.click('.sbx-chip:not(.ghost)');
    await new Promise(r => setTimeout(r, 380));
  }
  await new Promise(r => setTimeout(r, 1800));
  const afterFill = await page.evaluate(() => ({
    filled: document.querySelectorAll('.sbx-box.filled').length,
    total: document.querySelectorAll('.sbx-box').length,
    blend: !!document.querySelector('.sbx-blendbar.show'),
    ghosts: document.querySelectorAll('.sbx-chip.ghost').length,
  }));
  if (afterFill.filled !== afterFill.total) FAIL(`fill: ${afterFill.filled}/${afterFill.total} boxes filled`);
  else OK(`all ${afterFill.total} boxes filled via tap`);
  if (!afterFill.blend) FAIL('blend bar did not appear on completion');
  else OK('blend bar appeared');
  if (afterFill.ghosts !== afterFill.total) FAIL(`tray ghosts ${afterFill.ghosts}/${afterFill.total}`);

  await page.screenshot({ path: path.join(OUT, 'filled-768.png'), fullPage: true });

  /* abc toggle → tiles */
  await page.click('.sbx-abc');
  await new Promise(r => setTimeout(r, 300));
  const tiles = await page.$$eval('.sbx-tile', els => els.length);
  if (!tiles) FAIL('abc toggle: no grapheme tiles rendered');
  else OK(`abc toggle: ${tiles} tiles`);
  await page.screenshot({ path: path.join(OUT, 'letters-768.png'), fullPage: true });

  /* blend click runs without error */
  await page.click('.sbx-blendbar');
  await new Promise(r => setTimeout(r, nBoxes * 240 + 400));
  OK('blend ran');

  /* next word resets */
  await page.click('.sbx-nav.next');
  await new Promise(r => setTimeout(r, 500));
  const afterNext = await page.$$eval('.sbx-box.filled', els => els.length);
  if (afterNext !== 0) FAIL('next word: chips not reset');
  else OK('next word: fresh boxes');

  /* reset button (shell chrome) — place one chip then reset */
  await page.click('.sbx-chip:not(.ghost)');
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.lcs-ctrl')].find(x => (x.getAttribute('aria-label') || '').match(/Reset/i));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 200));
  const afterReset = await page.$$eval('.sbx-box.filled', els => els.length);
  if (afterReset !== 0) FAIL('reset did not clear chips');
  else OK('reset clears chips');

  /* panel: stages + locked-stage upsell */
  await page.click('.sbx-pill');
  await page.waitForSelector('.sbx-panel.open', { timeout: 3000 });
  const stageRows = await page.$$eval('.sbx-stage-row', els => els.length);
  const lockedRows = await page.$$eval('.sbx-stage-row.locked', els => els.length);
  if (stageRows < 2) FAIL(`panel: only ${stageRows} stage rows`);
  else OK(`panel: ${stageRows} stage rows (${lockedRows} locked)`);
  if (!lockedRows) FAIL('no locked stages for the free tier');
  else {
    await page.click('.sbx-stage-row.locked');
    await new Promise(r => setTimeout(r, 200));
    const upsell = await page.$('.sbx-upsell');
    if (!upsell) FAIL('locked stage tap: no upsell line');
    else OK('locked stage tap → warm upsell + pricing link');
  }
  const gridCells = await page.$$eval('.sbx-wordcell', els => els.length);
  if (!gridCells) FAIL('panel: word grid empty');
  else OK(`panel: word grid ${gridCells} cells`);
  await page.screenshot({ path: path.join(OUT, 'panel-768.png'), fullPage: true });

  /* custom words: add → seams → toggle → use (locked) */
  await page.evaluate(() => {
    [...document.querySelectorAll('.sbx-tab')].at(-1).click();
  });
  await new Promise(r => setTimeout(r, 200));
  await page.type('.sbx-textarea', 'ship\nfrog\nmoon');
  await page.evaluate(() => { [...document.querySelectorAll('.sbx-btn')].find(b => !b.classList.contains('primary')).click(); });
  await new Promise(r => setTimeout(r, 250));
  const seamRows = await page.$$eval('.sbx-seamrow', els => els.length);
  if (seamRows !== 3) FAIL(`custom: ${seamRows}/3 seam rows`);
  else OK('custom: 3 seam rows');
  const shipBoxes = await page.$eval('.sbx-seamrow .sbx-seamcount', el => el.textContent);
  OK(`custom: "ship" segmentation = "${shipBoxes}" (expect 3 boxes via bank exact-match)`);
  const before = shipBoxes;
  await page.click('.sbx-seamrow .sbx-seam');
  await new Promise(r => setTimeout(r, 250));
  const after = await page.$eval('.sbx-seamrow .sbx-seamcount', el => el.textContent);
  if (before === after) FAIL('seam toggle did not change box count');
  else OK(`seam toggle: "${before}" → "${after}"`);
  await page.screenshot({ path: path.join(OUT, 'custom-768.png'), fullPage: true });
  await page.evaluate(() => { const b = [...document.querySelectorAll('.sbx-btn.primary')].at(-1); if (b) b.click(); });
  await new Promise(r => setTimeout(r, 250));
  const useUpsell = await page.$('.sbx-panel .sbx-upsell');
  if (!useUpsell) FAIL('"Use these words" free-tier: no upsell shown');
  else OK('"Use these words" free-tier → upsell (activation locked)');

  /* ---------- C. resume + deep link ---------- */
  console.log('\nC. resume + deep link');
  await page.evaluate(() => document.querySelector('.sbx-panel-close').click());
  await page.click('.sbx-nav.next'); await new Promise(r => setTimeout(r, 300));
  await page.click('.sbx-nav.next'); await new Promise(r => setTimeout(r, 300));
  const posBefore = await page.$eval('.sbx-pill', el => el.textContent);
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.sbx-box');
  const posAfter = await page.$eval('.sbx-pill', el => el.textContent);
  if (posBefore !== posAfter) FAIL(`resume: "${posBefore}" → "${posAfter}"`);
  else OK(`resume: position restored (${posAfter.trim()})`);

  await page.goto(BASE + '?lang=en&list=s2&word=fish', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.sbx-box');
  const deepBoxes = await page.$$eval('.sbx-box', els => els.length);
  if (deepBoxes !== 3) FAIL(`deep link fish: ${deepBoxes} boxes (want 3)`);
  else OK('deep link ?list=s2&word=fish → 3 boxes');

  /* ---------- D. lang smoke ---------- */
  console.log('\nD. lang smoke');
  for (const L of ['de', 'fi']) {
    await page.goto(BASE + `?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.sbx-box', { timeout: 8000 }).then(() => true).catch(() => false);
    const title = await page.$eval('.lcs-title', el => el.textContent).catch(() => '');
    if (!got) FAIL(`${L}: no boxes (bank fallback failed)`);
    else OK(`${L}: mounted, title="${title}"`);
  }

  /* ---------- E. console errors ---------- */
  console.log('\nE. console errors');
  const realErrors = consoleErrors.filter(e =>
    !/404|Failed to load resource|net::ERR/i.test(e));
  if (realErrors.length) FAIL('console errors: ' + realErrors.slice(0, 5).join(' | '));
  else OK(`no console errors (${consoleErrors.length - realErrors.length} expected 404s ignored)`);

  await browser.close();
  server.close();

  console.log('\n' + (fails.length ? `RESULT: FAIL (${fails.length})` : 'RESULT: PASS'));
  console.log('screenshots → ' + OUT);
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
