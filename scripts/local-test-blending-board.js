#!/usr/bin/env node
/* =====================================================================
   local-test-blending-board.js — the local DoD for the Blending Board
   FREE-PLAY TOOL (mini tools/blending-board.html).

   Serves `mini tools/` + `image-library-webp/` locally, then:
     A. viewport sweep 320·360·412·768·1024·1366 — no horizontal
        overflow · stage controls ≥44px · columns render
     B. functional drive (768): chevron flick changes the face + resets
        the badge · swipe-flick works (pointer synth) · blend (bar
        click) → REAL badge for c-a-t (picture) · robot badge for a
        deep-linked nonsense combo · shuffle changes the word · panel
        (deck rows + locked upsell + card strip) · My-deck editor
        (toggle → live count changes; Use → free-tier upsell)
     C. resume: reload restores deck + column positions; deep link
        ?deck&cards lands on the exact word
     D. lang smoke: ?lang=de + ?lang=fi mount (EN fallback until the
        locale decks ship)
     E. console errors: zero tolerated (locale-deck 404s OK pre-fanout)
   Screenshots at 360/768/1024 → docs/audit-results/blending-board/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'blending-board', 'qa');
const MIME = { '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.html':'text/html', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png' };

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 },
  { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 },
];
const SHOT_WIDTHS = new Set([360, 768, 1024]);
const MIN_TAP = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/') p = '/blending-board.html';
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/blending-board.html`;

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
    await page.waitForSelector('.bbd-card', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate((MIN_TAP) => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const sel = ['.bbd-card', '.bbd-chev', '.bbd-pill', '.bbd-shuffle'];
      const small = [];
      for (const s of sel) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          /* chevrons + blendbar have ::before hit-area extenders; measure visual only for cards/pill */
          if (r.width && (r.width < MIN_TAP || r.height < MIN_TAP) && s !== '.bbd-chev') small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
          if (s === '.bbd-chev' && r.width && (r.width + 12 < MIN_TAP || r.height + 12 < MIN_TAP)) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)} (incl. hit inset)`);
        });
      }
      return { overflow, small, cols: document.querySelectorAll('.bbd-colgroup').length };
    }, MIN_TAP);
    if (m.overflow > 1) FAIL(`${vp.w}px: horizontal overflow ${m.overflow}px`);
    if (m.small.length) FAIL(`${vp.w}px: tap targets <44px: ${[...new Set(m.small)].join(', ')}`);
    if (!m.cols) FAIL(`${vp.w}px: no columns rendered`);
    if (m.overflow <= 1 && !m.small.length && m.cols) OK(`${vp.w}px: fits, ${m.cols} columns, taps ok`);
    if (SHOT_WIDTHS.has(vp.w)) await page.screenshot({ path: path.join(OUT, `sweep-${vp.w}.png`), fullPage: true });
  }

  /* ---------- B. functional drive at 768 ---------- */
  console.log('\nB. functional drive (768)');
  await page.setViewport({ width: 768, height: 1000 });
  await page.evaluate(() => localStorage.clear());
  /* deep link to a REAL word with a picture: cat */
  await page.goto(BASE + '?lang=en&deck=en-cvc-1&cards=c.a.t', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.bbd-card');

  const word0 = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  if (word0 !== 'cat') FAIL(`deep link: standing word "${word0}" (want "cat")`);
  else OK('deep link ?deck=en-cvc-1&cards=c.a.t → "cat" standing');

  /* chevron flick changes the face */
  await page.click('.bbd-colgroup:nth-child(1) .bbd-chev.down');
  await new Promise(r => setTimeout(r, 450));
  const word1 = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  if (word1 === 'cat') FAIL('chevron flick did not change the word');
  else OK(`chevron flick: "cat" → "${word1}"`);

  /* flick back up to cat */
  await page.click('.bbd-colgroup:nth-child(1) .bbd-chev.up');
  await new Promise(r => setTimeout(r, 450));

  /* swipe-flick: synthetic vertical drag on the vowel card */
  await page.evaluate(() => {
    const card = document.querySelectorAll('.bbd-card')[1];
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const fire = (type, y) => card.dispatchEvent(new PointerEvent(type, { pointerId: 9, clientX: cx, clientY: y, bubbles: true }));
    fire('pointerdown', cy); fire('pointermove', cy - 20); fire('pointermove', cy - 60); fire('pointerup', cy - 60);
  });
  await new Promise(r => setTimeout(r, 450));
  const word2 = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  if (word2 === 'cat') FAIL('swipe-flick did not change the vowel');
  else OK(`swipe-flick vowel: "cat" → "${word2}"`);

  /* back to cat via deep reload, then blend → REAL picture badge */
  await page.goto(BASE + '?lang=en&deck=en-cvc-1&cards=c.a.t', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.bbd-card');
  const emptyBefore = await page.$('.bbd-badge-empty');
  if (!emptyBefore) FAIL('badge slot placeholder missing before blend');
  await page.click('.bbd-blendbar');
  await new Promise(r => setTimeout(r, 3 * 260 + 600 + 700));
  const realBadge = await page.evaluate(() => {
    const b = document.querySelector('.bbd-badge.real');
    return b ? { img: !!b.querySelector('img'), word: b.querySelector('.bbd-badge-word').textContent.trim() } : null;
  });
  if (!realBadge) FAIL('blend on "cat": no real badge');
  else if (!realBadge.img) FAIL('blend on "cat": badge has no picture');
  else OK(`blend "cat" → picture badge (${realBadge.word})`);
  await page.screenshot({ path: path.join(OUT, 'badge-real-768.png'), fullPage: true });

  /* flick clears the badge */
  await page.click('.bbd-colgroup:nth-child(3) .bbd-chev.down');
  await new Promise(r => setTimeout(r, 400));
  const cleared = await page.$('.bbd-badge-empty');
  if (!cleared) FAIL('flick after blend did not clear the badge');
  else OK('flick clears the badge');

  /* robot word: h-i-g is not in the real map */
  await page.goto(BASE + '?lang=en&deck=en-cvc-1&cards=h.i.g', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.bbd-card');
  await page.click('.bbd-blendbar');
  await new Promise(r => setTimeout(r, 3 * 260 + 600 + 700));
  const robot = await page.evaluate(() => {
    const b = document.querySelector('.bbd-badge.robot');
    return b ? { svg: !!b.querySelector('.bbd-robot'), cap: (b.querySelector('.bbd-badge-cap') || {}).textContent } : null;
  });
  if (!robot) FAIL('blend on "hig": no robot badge');
  else if (!robot.svg) FAIL('robot badge missing the robot SVG');
  else OK(`blend "hig" → robot badge ("${robot.cap}")`);
  await page.screenshot({ path: path.join(OUT, 'badge-robot-768.png'), fullPage: true });

  /* shuffle changes the word */
  const beforeShuffle = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  await page.click('.bbd-shuffle');
  await new Promise(r => setTimeout(r, 3 * 110 + 500));
  const afterShuffle = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  if (beforeShuffle === afterShuffle) FAIL('shuffle did not change the word');
  else OK(`shuffle: "${beforeShuffle}" → "${afterShuffle}"`);

  /* panel: deck rows + locked upsell + card strip */
  await page.click('.bbd-pill');
  await page.waitForSelector('.bbd-panel.open', { timeout: 3000 });
  const rows = await page.$$eval('.bbd-deck-row', els => els.length);
  const locked = await page.$$eval('.bbd-deck-row.locked', els => els.length);
  if (rows < 2) FAIL(`panel: only ${rows} deck rows`);
  else OK(`panel: ${rows} deck rows (${locked} locked)`);
  if (!locked) FAIL('no locked decks for the free tier');
  else {
    await page.click('.bbd-deck-row.locked');
    await new Promise(r => setTimeout(r, 200));
    const upsell = await page.$('.bbd-upsell');
    if (!upsell) FAIL('locked deck tap: no upsell');
    else OK('locked deck tap → warm upsell');
  }
  const strip = await page.$$eval('.bbd-strip-col', els => els.length);
  if (!strip) FAIL('panel: no card strip');
  else OK(`panel: card strip ${strip} columns`);
  await page.screenshot({ path: path.join(OUT, 'panel-768.png'), fullPage: true });

  /* My deck: toggle → live count changes; Use → upsell (free tier) */
  await page.evaluate(() => { [...document.querySelectorAll('.bbd-tab')].at(-1).click(); });
  await new Promise(r => setTimeout(r, 250));
  const count1 = await page.$eval('.bbd-count-line', el => el.textContent).catch(() => null);
  if (!count1) FAIL('My deck: no live count line');
  await page.click('.bbd-pick[aria-pressed="true"]');
  await new Promise(r => setTimeout(r, 250));
  const count2 = await page.$eval('.bbd-count-line', el => el.textContent).catch(() => null);
  if (count1 && count2 && count1 === count2) FAIL('My deck: toggling a card did not change the live count');
  else OK(`My deck: live count "${count1}" → "${count2}"`);
  await page.screenshot({ path: path.join(OUT, 'editor-768.png'), fullPage: true });
  await page.evaluate(() => { const b = [...document.querySelectorAll('.bbd-btn.primary')].at(-1); if (b) b.click(); });
  await new Promise(r => setTimeout(r, 250));
  const useUpsell = await page.$('.bbd-panel .bbd-upsell');
  if (!useUpsell) FAIL('"Use this deck" free tier: no upsell');
  else OK('"Use this deck" free tier → upsell (activation locked)');

  /* ---------- C. resume ---------- */
  console.log('\nC. resume');
  await page.evaluate(() => document.querySelector('.bbd-panel-close').click());
  await page.click('.bbd-colgroup:nth-child(1) .bbd-chev.down');
  await new Promise(r => setTimeout(r, 400));
  const posWord = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.bbd-card');
  const resumed = await page.evaluate(() => [...document.querySelectorAll('.bbd-face-txt, .bbd-face.seamed')].map(e => e.textContent).join(''));
  if (posWord !== resumed) FAIL(`resume: "${posWord}" → "${resumed}"`);
  else OK(`resume: "${resumed}" restored`);

  /* ---------- D. lang smoke ---------- */
  console.log('\nD. lang smoke');
  for (const L of ['de', 'fi']) {
    await page.goto(BASE + `?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.bbd-card', { timeout: 8000 }).then(() => true).catch(() => false);
    const title = await page.$eval('.lcs-title', el => el.textContent).catch(() => '');
    if (!got) FAIL(`${L}: no columns (deck fallback failed)`);
    else OK(`${L}: mounted, title="${title}"`);
  }

  /* ---------- E. console errors ---------- */
  console.log('\nE. console errors');
  const realErrors = consoleErrors.filter(e => !/404|Failed to load resource|net::ERR/i.test(e));
  if (realErrors.length) FAIL('console errors: ' + realErrors.slice(0, 5).join(' | '));
  else OK(`no console errors (${consoleErrors.length - realErrors.length} expected 404s ignored)`);

  await browser.close();
  server.close();

  console.log('\n' + (fails.length ? `RESULT: FAIL (${fails.length})` : 'RESULT: PASS'));
  console.log('screenshots → ' + OUT);
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
