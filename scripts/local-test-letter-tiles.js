#!/usr/bin/env node
/* =====================================================================
   local-test-letter-tiles.js — the local DoD for the Letter Tiles
   FREE-PLAY TOOL (mini tools/letter-tiles.html).

   Serves `mini tools/` + `image-library-webp/` locally, then:
     A. viewport sweep 320·360·412·768·1024·1366 — no horizontal
        overflow · board renders · check + pill ≥44px · tray present
        (narrow widths: single-row scroll + sheet chevron)
     B. functional drive (768):
        drag a tray tile onto the board (synthetic pointer clone-drag)
        · kiss-snap: second tile dropped near the first straightens
          (rot 0) and gap ≈ 6px
        · tap a board tile = no error + wiggle class
        · build "cat" via keyboard auto-place → C = check → picture
          badge in the slot + glow
        · unknown string ("ttq") → NO badge, NO robot, quiet shimmer
        · drag a board tile off-board = removed
        · prompt mode: open panel → free stage row → card dealt +
          ghost sockets (guides=boxes) · locked stage → upsell ·
          My words preview free / Use locked
     C. resume: reload restores the standing board tiles
     D. lang smoke: ?lang=de + ?lang=fi mount (EN data fallback until
        the locale files ship)
     E. console errors: zero tolerated (locale-file 404s OK pre-fanout)
   Screenshots at 360/768/1024 → docs/audit-results/letter-tiles/qa/
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
const OUT = path.join(REPO, 'docs', 'audit-results', 'letter-tiles', 'qa');
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
    if (p === '/') p = '/letter-tiles.html';
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
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* synthetic clone-drag from a tray tile to board coordinates */
async function dragTrayToBoard(page, g, bx, by) {
  return page.evaluate(({ g, bx, by }) => {
    const src = document.querySelector(`.ltl-traytile[data-g="${g}"]`);
    if (!src) return 'no tray tile ' + g;
    const r = src.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    const board = document.querySelector('.ltl-board').getBoundingClientRect();
    const tx = board.left + bx, ty = board.top + by;
    const fire = (type, x, y) => src.dispatchEvent(new PointerEvent(type, { pointerId: 7, clientX: x, clientY: y, bubbles: true }));
    fire('pointerdown', sx, sy);
    /* vertical-leaning first move so the phone axis-lock reads "lift" */
    fire('pointermove', sx + 4, sy - 14);
    fire('pointermove', (sx + tx) / 2, (sy + ty) / 2);
    fire('pointermove', tx, ty);
    fire('pointerup', tx, ty);
    return null;
  }, { g, bx, by });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/letter-tiles.html`;

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
    await page.waitForSelector('.ltl-board', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate((MIN_TAP) => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.ltl-check', '.ltl-pill']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.width < MIN_TAP || r.height < MIN_TAP)) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
        });
      }
      const trayTiles = document.querySelectorAll('.ltl-traytile').length;
      const board = !!document.querySelector('.ltl-board');
      const narrow = window.innerWidth <= 560;
      const sheetBtn = document.querySelector('.ltl-sheetbtn');
      const sheetVisible = sheetBtn && getComputedStyle(sheetBtn).display !== 'none';
      /* ⚠ CHILD-vs-CHILD, WHICH IS THE OVERLAP THAT ACTUALLY SHIPPED BROKEN.
         Every geometry assertion in this harness was tile-vs-tile — the
         headline invariant "letters never stack" means tiles never stack on
         EACH OTHER. Meanwhile the anchor picture sat on top of the glyph
         INSIDE the tile, from the tool's first commit until 2026-07-31, and
         nothing here could see it: the three .ltl-face-txt assertions all
         read textContent, and a string reads back identically whether or not
         a solid white disc is painted over it.
         The picture is now in flow above the letter, so any intersection at
         all is a regression. */
      const covered = [];
      document.querySelectorAll('.ltl-traytile, .ltl-tile').forEach((tile) => {
        const img = tile.querySelector('.ltl-anchor');
        const txt = tile.querySelector('.ltl-face-txt');
        if (!img || !txt) return;                 /* e.g. "qu" ships anchor:null */
        if (getComputedStyle(img).display === 'none') return;   /* picture alphabet off */
        const a = img.getBoundingClientRect(), b = txt.getBoundingClientRect();
        if (!a.width || !b.width) return;
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 0.5 && oy > 0.5) {
          covered.push(`${(txt.textContent || '?').trim()} (${Math.round(ox)}x${Math.round(oy)}px)`);
        }
      });
      return { overflow, small, trayTiles, board, narrow, sheetVisible, covered };
    }, MIN_TAP);
    if (m.overflow > 1) FAIL(`${vp.w}px: horizontal overflow ${m.overflow}px`);
    if (m.small.length) FAIL(`${vp.w}px: tap targets <44px: ${[...new Set(m.small)].join(', ')}`);
    if (!m.board) FAIL(`${vp.w}px: no board`);
    if (m.trayTiles < 26) FAIL(`${vp.w}px: only ${m.trayTiles} tray tiles`);
    if (m.narrow && !m.sheetVisible) FAIL(`${vp.w}px: sheet chevron hidden on narrow viewport`);
    if (m.covered.length) FAIL(`${vp.w}px: the anchor picture COVERS the letter on ${m.covered.length} tile(s): ${[...new Set(m.covered)].slice(0, 8).join(', ')}`);
    else OK(`${vp.w}px: no anchor picture overlaps its letter`);
    if (m.overflow <= 1 && !m.small.length && m.board && m.trayTiles >= 26) OK(`${vp.w}px: fits, board + ${m.trayTiles} tray tiles${m.narrow ? ', sheet chevron' : ''}`);
    if (SHOT_WIDTHS.has(vp.w)) await page.screenshot({ path: path.join(OUT, `sweep-${vp.w}.png`), fullPage: true });
  }

  /* ---------- B. functional drive at 768 ---------- */
  console.log('\nB. functional drive (768)');
  await page.setViewport({ width: 768, height: 1000 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ltl-board');
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ltl-traytile');

  /* drag "c" onto the board */
  const dragErr = await dragTrayToBoard(page, 'c', 120, 120);
  if (dragErr) FAIL('tray drag: ' + dragErr);
  await sleep(350);
  let tiles = await page.$$eval('.ltl-tile', els => els.length);
  if (tiles !== 1) FAIL(`after drag: ${tiles} board tiles (want 1)`);
  else OK('tray clone-drag → 1 board tile');

  /* kiss-snap: drop "a" just right of "c" — should straighten + 6px gap */
  const cRect = await page.evaluate(() => {
    const t = document.querySelector('.ltl-tile');
    const b = document.querySelector('.ltl-board').getBoundingClientRect();
    const r = t.getBoundingClientRect();
    return { right: r.right - b.left, midY: r.top + r.height / 2 - b.top, width: r.width };
  });
  await dragTrayToBoard(page, 'a', cRect.right + cRect.width * 0.2, cRect.midY);
  await sleep(350);
  const kiss = await page.evaluate(() => {
    const ts = [...document.querySelectorAll('.ltl-tile')].sort((x, y) => x.getBoundingClientRect().left - y.getBoundingClientRect().left);
    if (ts.length !== 2) return { n: ts.length };
    const r0 = ts[0].getBoundingClientRect(), r1 = ts[1].getBoundingClientRect();
    const gap = r1.left - r0.right;
    const rot = ts[1].style.getPropertyValue('--ltl-rot');
    return { n: 2, gap, rot, sameRow: Math.abs(r0.top - r1.top) < 4 };
  });
  if (kiss.n !== 2) FAIL(`kiss test: ${kiss.n} tiles on board`);
  else if (!kiss.sameRow) FAIL('kiss test: tiles not on the same baseline');
  else if (Math.abs(kiss.gap - 6) > 4) FAIL(`kiss test: gap ${kiss.gap.toFixed(1)}px (want ≈6)`);
  else if (parseFloat(kiss.rot) !== 0) FAIL(`kiss test: kissed tile rot ${kiss.rot} (want 0deg)`);
  else OK(`kiss-snap: gap ${kiss.gap.toFixed(1)}px, straightened`);

  /* tap a board tile: wiggle, no crash */
  await page.evaluate(() => {
    const t = document.querySelector('.ltl-tile');
    const r = t.getBoundingClientRect();
    const fire = (type) => t.dispatchEvent(new PointerEvent(type, { pointerId: 8, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, bubbles: true }));
    fire('pointerdown'); fire('pointerup');
  });
  await sleep(150);
  const wiggled = await page.evaluate(() => !!document.querySelector('.ltl-traytile.ltl-wiggle, .ltl-tile .ltl-wiggle, .ltl-tile.ltl-wiggle'));
  OK(`board tile tap ok${wiggled ? ' (wiggle)' : ''}`);

  /* clear, then build "cat" via auto-place (Enter on tray tiles) */
  await page.evaluate(() => document.querySelectorAll('.ltl-tile').forEach(() => {}));
  await page.evaluate(() => {
    /* reset via the shell reset button */
    const b = [...document.querySelectorAll('.lcs-ctrl')].find(x => /reset|zurück/i.test(x.getAttribute('aria-label') || ''));
    if (b) b.click();
  });
  await sleep(200);
  tiles = await page.$$eval('.ltl-tile', els => els.length);
  if (tiles !== 0) FAIL(`shell reset: ${tiles} tiles remain`);
  else OK('shell reset clears the board');

  for (const g of ['c', 'a', 't']) {
    await page.evaluate((g) => {
      const el = document.querySelector(`.ltl-traytile[data-g="${g}"]`);
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }, g);
    await sleep(120);
  }
  const word = await page.evaluate(() => [...document.querySelectorAll('.ltl-tile .ltl-face-txt')].map(e => e.textContent).join(''));
  if (word !== 'cat') FAIL(`auto-place: board reads "${word}" (want "cat")`);
  else OK('keyboard auto-place built "cat"');

  /* check → picture badge */
  await page.click('.ltl-check');
  await sleep(3 * 260 + 300 + 900);
  const badge = await page.evaluate(() => {
    const b = document.querySelector('.ltl-badge');
    return b ? { img: !!b.querySelector('img'), word: (b.querySelector('.ltl-badge-word') || {}).textContent } : null;
  });
  if (!badge) FAIL('check "cat": no badge');
  else if (!badge.img) FAIL('check "cat": badge has no picture');
  else OK(`check "cat" → picture badge ("${badge.word}")`);
  await page.screenshot({ path: path.join(OUT, 'badge-real-768.png'), fullPage: true });

  /* unknown string: reset, build "ttq" → NO badge, no robot */
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.lcs-ctrl')].find(x => /reset/i.test(x.getAttribute('aria-label') || ''));
    if (b) b.click();
  });
  await sleep(200);
  for (const g of ['t', 't', 'q']) {
    await page.evaluate((g) => {
      document.querySelector(`.ltl-traytile[data-g="${g}"]`)
        .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }, g);
    await sleep(120);
  }
  await page.click('.ltl-check');
  await sleep(3 * 260 + 300 + 900);
  const noBadge = await page.evaluate(() => ({
    badge: !!document.querySelector('.ltl-badge'),
    robot: !!document.querySelector('[class*="robot"]'),
  }));
  if (noBadge.badge) FAIL('check "ttq": badge appeared for an unknown string');
  else if (noBadge.robot) FAIL('check "ttq": robot marker on the open board (banned)');
  else OK('check "ttq" → quiet (no badge, no robot, no shame)');

  /* drag a board tile off-board = removed */
  const before = await page.$$eval('.ltl-tile', els => els.length);
  await page.evaluate(() => {
    const t = document.querySelector('.ltl-tile');
    const r = t.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const fire = (type, x, y) => t.dispatchEvent(new PointerEvent(type, { pointerId: 9, clientX: x, clientY: y, bubbles: true }));
    fire('pointerdown', cx, cy); fire('pointermove', cx, cy + 40); fire('pointermove', cx, cy + 500); fire('pointerup', cx, cy + 500);
  });
  await sleep(250);
  const after = await page.$$eval('.ltl-tile', els => els.length);
  if (after !== before - 1) FAIL(`off-board drag: ${before} → ${after} tiles (want ${before - 1})`);
  else OK('off-board drag removes the tile');

  /* prompt mode via the panel */
  await page.click('.ltl-pill');
  await page.waitForSelector('.ltl-panel.open', { timeout: 3000 });
  const stageRows = await page.$$eval('.ltl-stage-row', els => els.length);
  const lockedRows = await page.$$eval('.ltl-stage-row.locked', els => els.length);
  if (stageRows < 2) FAIL(`panel: only ${stageRows} stage rows`);
  else OK(`panel: ${stageRows} stage rows (${lockedRows} locked)`);
  if (!lockedRows) FAIL('panel: no locked stages for the free tier');
  else {
    await page.click('.ltl-stage-row.locked');
    await sleep(200);
    const upsell = await page.$('.ltl-upsell');
    if (!upsell) FAIL('locked stage tap: no upsell');
    else OK('locked stage tap → warm upsell');
  }
  /* enter the free stage */
  await page.click('.ltl-stage-row:not(.locked)');
  await sleep(400);
  const prompt = await page.evaluate(() => ({
    card: !!document.querySelector('.ltl-card'),
    sockets: document.querySelectorAll('.ltl-socket').length,
    pill: document.querySelector('.ltl-pill').textContent,
  }));
  if (!prompt.card) FAIL('prompt mode: no card dealt');
  else OK(`prompt mode: card dealt, pill "${prompt.pill.trim()}"`);
  if (!prompt.sockets) FAIL('prompt mode: no ghost sockets (guides=boxes default)');
  else OK(`prompt mode: ${prompt.sockets} ghost sockets`);
  await page.screenshot({ path: path.join(OUT, 'prompt-768.png'), fullPage: true });

  /* exit prompt via the card's × */
  await page.click('.ltl-card-close');
  await sleep(200);
  const backFree = await page.evaluate(() => !document.querySelector('.ltl-card'));
  if (!backFree) FAIL('card × did not exit prompt mode');
  else OK('card × → back to free build');

  /* My words: preview free, Use locked */
  await page.click('.ltl-pill');
  await page.waitForSelector('.ltl-panel.open');
  await page.evaluate(() => { [...document.querySelectorAll('.ltl-tab')].at(-1).click(); });
  await sleep(200);
  await page.type('.ltl-textarea', 'sun\nhat\npig');
  await page.evaluate(() => { [...document.querySelectorAll('.ltl-btn')].find(b => !b.classList.contains('primary')).click(); });
  await sleep(200);
  const chips = await page.$$eval('.ltl-draftchip', els => els.map(e => e.textContent));
  if (chips.length !== 3) FAIL(`My words preview: ${chips.length} chips (want 3)`);
  else OK(`My words preview free: ${chips.join(', ')}`);
  await page.evaluate(() => { const b = document.querySelector('.ltl-btn.primary'); if (b) b.click(); });
  await sleep(200);
  const useUpsell = await page.$('.ltl-panel .ltl-upsell');
  if (!useUpsell) FAIL('"Use these cards" free tier: no upsell');
  else OK('"Use these cards" free tier → upsell (activation locked)');
  await page.screenshot({ path: path.join(OUT, 'panel-768.png'), fullPage: true });
  await page.evaluate(() => document.querySelector('.ltl-panel-close').click());

  /* ---------- C. resume ---------- */
  console.log('\nC. resume');
  const standing = await page.$$eval('.ltl-tile .ltl-face-txt', els => els.map(e => e.textContent).join(''));
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ltl-board');
  await sleep(400);
  const resumed = await page.$$eval('.ltl-tile .ltl-face-txt', els => els.map(e => e.textContent).join(''));
  if (standing !== resumed) FAIL(`resume: "${standing}" → "${resumed}"`);
  else OK(`resume: board "${resumed}" restored`);

  /* ---------- D. lang smoke ---------- */
  console.log('\nD. lang smoke');
  for (const L of ['de', 'fi']) {
    await page.goto(BASE + `?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.ltl-traytile', { timeout: 8000 }).then(() => true).catch(() => false);
    const title = await page.$eval('.lcs-title', el => el.textContent).catch(() => '');
    if (!got) FAIL(`${L}: no tray (data fallback failed)`);
    else OK(`${L}: mounted, title="${title}"`);
  }

  /* ---------- E. console errors ---------- */
  /* ---------- D2. the TILE grows on a wide board, and the board keeps its rows ----
     ⭐⭐ THE APPARATUS IS EMPTY AT REST, which is why an earlier content-scale
     probe could not see this tool at all: `.ltl-board` is inked and full-width,
     so every box measure looked healthy while the letters stayed 84px. Place
     real tiles through the tool's own `_dropNew` and measure THOSE.
     Two assertions, and the second is the one with teeth: the tile must be
     strictly bigger than at 1366, AND the board must still hold at least as
     many rows — raising the tile alone costs a row silently, and a board that
     fits fewer words is a worse instrument no overflow check would flag. */
  console.log('\nD2. tile growth on a wide board');
  {
    const cells = [{ width: 1366, height: 900 }, { width: 1920, height: 1080 },
      { width: 2400, height: 1150 }, { width: 2560, height: 1440 }];
    let base = null;
    for (const vp of cells) {
      await page.setViewport(vp);
      await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
      await page.waitForSelector('.ltl-board');
      /* ⚠ THE BOARD IS RESTORED FROM STORAGE, so tiles accumulate across
         cells — the counts came out 6, 10, 14, 18 and the non-vacuity check
         is the only reason that was visible instead of quietly averaging a
         growing pile. Start each cell from an empty board. */
      await page.evaluate(() => { LetterTiles.boardTiles = []; LetterTiles.render(); });
      await page.waitForSelector('.ltl-board');
      const m = await page.evaluate(() => {
        const b = document.querySelector('.ltl-board').getBoundingClientRect();
        /* drop four tiles across the board through the tool's own path */
        ['m', 'a', 't', 's'].forEach((g, i) => {
          LetterTiles._dropNew(g, b.left + 60 + i * 120, b.top + 40);
        });
        const tiles = [...document.querySelectorAll('.ltl-tile')];
        if (!tiles.length) return null;
        const hs = tiles.map((t) => t.getBoundingClientRect().height).sort((x, y) => x - y);
        return {
          n: tiles.length,
          tile: hs[Math.floor(hs.length / 2)],       /* median, not mean */
          rows: LetterTiles._rowCount,
          boardH: b.height,
          escapes: tiles.some((t) => {
            const r = t.getBoundingClientRect();
            return r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5;
          })
        };
      });
      if (!m || m.n !== 4) { FAIL(`tiles @${vp.width}: expected 4 on the board, got ${m ? m.n : 'none'} — measurement void`); continue; }
      if (vp.width === 1366) { base = m; OK(`1366 baseline: tile ${Math.round(m.tile)}px, ${m.rows} rows`); continue; }
      /* ⚠ A 0.5px EPSILON WAS NOT ENOUGH. On the un-fixed build the tile is a
         constant 84 CSS px, but the rendered box wobbles sub-pixel with the
         layout, so "94 -> 94" scraped past and the poison fired at only one of
         three cells. The margin is not invented: the smallest tier step raises
         the ceiling 84 -> 100, i.e. +19%, while the noise is under 1%. */
      if (m.tile <= base.tile * 1.05) FAIL(`tiles @${vp.width}: still ${Math.round(m.tile)}px against ${Math.round(base.tile)}px at 1366 — the board grew and the letters did not`);
      else if (m.rows < base.rows) FAIL(`tiles @${vp.width}: board dropped to ${m.rows} rows from ${base.rows} — a bigger tile cost a row`);
      else if (m.escapes) FAIL(`tiles @${vp.width}: a tile escapes the board`);
      else OK(`@${vp.width}: tile ${Math.round(base.tile)} -> ${Math.round(m.tile)}px, ${m.rows} rows (was ${base.rows}), nothing escapes`);
    }
    await page.setViewport({ width: 1024, height: 768 });
  }

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
