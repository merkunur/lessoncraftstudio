#!/usr/bin/env node
/* =====================================================================
   local-test-patchwork-meadow.js — interaction harness for "Sprout's
   Patchwork Meadow" (3.MD.C.6). Serves `mini tools/` + `image-library-webp/`
   and drives the shell by clicking the RENDERED DOM, per ACTION:

     • tile / finish / repair : tap region cells to cover (fix gap + overlap
       for repair) → a FULL clean cover KNITS into a meadow + resolves; the
       shell Check appears (hidden until resolved). A partial/over-stacked
       cover does NOT resolve (no-gaps/no-overlaps is load-bearing).
     • estimate : the bed is EMPTY at predict (object-counting can't help);
       a WRONG number → a warm scaffold (DIM the pick), NO advance, NO shell
       try-again; the correct number (= regionArea) resolves.
     • build : tap exactly N cells → the inverse (area as a SPACE target).
     • no stored area/total/w/h in the round; EN-only; 5 ACTIONS + ≥7 distinct
       + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'patchwork-meadow.tile.3-md-c-6';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/patchwork-meadow-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.PatchworkMeadowActivity._resolved, finds: window.PatchworkMeadowActivity._finds, cog: window.PatchworkMeadowActivity._round && window.PatchworkMeadowActivity._round.cog, line: (document.querySelector('.pm-line') || {}).textContent || '', miss: !!document.querySelector('.pm-line.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PatchworkMeadowActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PatchworkMeadowActivity._round && document.querySelector('.pm-root'), { timeout: 4000 });
    await sleep(50);
  }
  const solveGrid = () => page.evaluate(() => {
    const t = window.PatchworkMeadowActivity; let guard = 0;
    const cells = () => Array.from(document.querySelectorAll('.pm-cand'));
    while (guard++ < 80) {
      if (t._resolved) break;
      const over = cells().find(c => c.classList.contains('over'));
      if (over) { over.click(); continue; }
      const empty = cells().find(c => !c.classList.contains('patch') && !c.classList.contains('over'));
      if (!empty) break;
      empty.click();
    }
    return t._resolved;
  }).then(() => sleep(40));
  const tapOneCell = () => page.evaluate(() => { const c = document.querySelector('.pm-cand:not(.patch):not(.over)'); if (c) c.click(); return !!c; }).then(() => sleep(30));
  const clickChoice = (val) => page.evaluate((v) => { const b = Array.from(document.querySelectorAll('.pm-choice')).find(x => Number(x.textContent) === v); if (b) b.click(); return !!b; }, val).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PatchworkMeadowActivity; return t && t._activityRow && document.querySelector('.pm-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Sprout's Patchwork Meadow", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PatchworkMeadowActivity._activityRow.slug));
    note(slugKeys.indexOf('en') >= 0, `manifest slug missing en base: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PatchworkMeadowActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PatchworkMeadowActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.PatchworkMeadowActivity._pool.map(r => r.cog))));
    note(cogs.length >= 5, `only ${cogs.length} distinct ACTIONS: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* no stored area/total in any round (the read-total fence) */
    note(await page.evaluate(() => window.PatchworkMeadowActivity._pool.every(r => r.area == null && r.total == null && r.w == null && r.h == null)),
      'a round carries a stored area/total/w/h field (read-total / dimension leak)');

    /* TILE: Check hidden; a partial cover does NOT resolve; a full cover does */
    await force('pm-tile-staircase');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    await tapOneCell();
    note(!(await S()).resolved, 'tile: one patch resolved (a partial cover must not complete)');
    await solveGrid();
    note((await S()).resolved, 'tile: a full clean cover did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');
    note(await page.evaluate(() => document.querySelectorAll('.pm-cell.bloom').length >= 1), 'tile: the patches did not knit into a bloomed meadow');

    /* FINISH: a partial cover is pre-placed; finishing it resolves */
    await force('pm-finish-bigstair');
    note(await page.evaluate(() => document.querySelectorAll('.pm-cand.patch').length >= 1), 'finish: no pre-placed patches');
    note(!(await S()).resolved, 'finish: pre-placed cover already resolved');
    await solveGrid();
    note((await S()).resolved, 'finish: completing the cover did not resolve');

    /* REPAIR: a hidden gap + a double-stacked overlap; fixing both resolves */
    await force('pm-repair-bed');
    note(await page.evaluate(() => document.querySelectorAll('.pm-cand.over').length >= 1), 'repair: no overlap (double patch) to fix');
    note(!(await S()).resolved, 'repair: the flawed cover already resolved');
    await solveGrid();
    note((await S()).resolved, 'repair: fixing the gap + overlap did not resolve');

    /* ESTIMATE: bed empty at predict; wrong number scaffolds (no advance); correct resolves */
    await force('pm-estimate-stair');
    note(await page.evaluate(() => document.querySelectorAll('.pm-cand').length === 0 && document.querySelectorAll('.pm-choice').length >= 3), 'estimate: bed not empty / fewer than 3 choices at predict');
    const ra = await page.evaluate(() => window.PatchworkMeadowCore.regionArea(window.PatchworkMeadowActivity._round));
    const bboxA = await page.evaluate(() => window.PatchworkMeadowCore.bboxArea(window.PatchworkMeadowActivity._round));
    await clickChoice(bboxA);   // the tempting "count the whole rectangle" distractor
    let s = await S();
    note(!s.resolved && s.miss, `estimate: the bbox distractor resolved or gave no scaffold (resolved=${s.resolved})`);
    note(await page.evaluate(() => document.querySelectorAll('.pm-choice.dim').length >= 1), 'estimate: the wrong choice did not dim');
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'estimate wrong showed the shell try-again (must be a warm scaffold)');
    await clickChoice(ra);
    note((await S()).resolved, 'estimate: the correct area did not resolve');

    /* BUILD: tap exactly N cells (area as a SPACE target) */
    await force('pm-build-six');
    note(await page.evaluate(() => window.PatchworkMeadowActivity._round.target >= 4), 'build: target out of bounds');
    await solveGrid();
    note((await S()).resolved, 'build: building the target bed did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('pm-finish-bigstair'); await sleep(50);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} patchwork-meadow/en — "${title}"`);
  } catch (e) {
    fails.push('patchwork-meadow/en: ' + e.message);
    console.log(`  FAIL patchwork-meadow/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`PATCHWORK-MEADOW LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PATCHWORK-MEADOW LOCAL TEST PASSED — all 5 ACTIONS (tile/repair/estimate/finish/build): a full clean cover KNITS + resolves; a partial cover / overlap does not complete; estimate is empty at predict + a wrong number warm-scaffolds (no advance, no shell try-again) + the correct area resolves; build covers exactly the target; the shell Check hides until resolved; no stored area/total/w/h; EN-only; 5 actions + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
