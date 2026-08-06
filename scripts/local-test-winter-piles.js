#!/usr/bin/env node
/* =====================================================================
   local-test-winter-piles.js — interaction harness for "Squirrel's Fair
   Winter Piles" (CCSS 2.OA.C.4). Serves `mini tools/` + drives the real shell:

     • a real pointer DRAG over the field commits a snapped row-cut;
     • an UNEVEN cut is REACHABLE but with correct reads is NOT valid (no
       sparkle / no lock-it-in) — equality is enforced;
     • equal piles with BLANK addends is NOT valid (no auto-fill);
     • equal piles + correct reads → "lock it in" → solved → shell celebrates;
     • make-n rejects the wrong #piles; fix starts unfair + resolves; match
       rejects a non-matching partition + accepts the matching one;
     • erase removes a committed cut;
     • ≥7 distinct + reshuffle; no horizontal overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'winter-piles.draw-partition.2-oa-c-4';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
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

  const url = `http://127.0.0.1:${PORT}/winter-piles-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const T = 'window.WinterPilesActivity';
  const valid = () => page.evaluate(() => window.WinterPilesActivity._isValid());
  const cuts = () => page.evaluate(() => window.WinterPilesActivity.cuts.slice());
  const solved = () => page.evaluate(() => window.WinterPilesActivity.solved);
  const lockPresent = () => page.$('.wp-lock').then(e => !!e);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WinterPilesActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'winter-piles.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WinterPilesActivity.round && document.querySelector('.wp-field'), { timeout: 4000 });
  }
  async function setCuts(arr) { await page.evaluate((c) => { const t = window.WinterPilesActivity; t.cuts = c.slice(); t._resetAddends(); t.render(); }, arr); await sleep(20); }
  async function setAddends(arr) { await page.evaluate((a) => { const t = window.WinterPilesActivity; t.addends = a.slice(); t.render(); }, arr); await sleep(20); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WinterPilesActivity; return t && t._activityRow && document.querySelector('.wp-field') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Squirrel's Fair Winter Piles", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.WinterPilesActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.WinterPilesActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* REAL POINTER DRAG commits a snapped cut (fair-2x3, boundary 1 @ 50%) */
    await force('fair-2x3');
    const fb = await page.$('.wp-field').then(e => e.boundingBox());
    const cx = fb.x + fb.width / 2, midY = fb.y + fb.height * 0.5;
    await page.mouse.move(fb.x + fb.width * 0.25, midY); await page.mouse.down();
    await page.mouse.move(fb.x + fb.width * 0.75, midY, { steps: 6 }); await page.mouse.up();
    await sleep(60);
    note((await cuts()).indexOf(1) >= 0, `a pointer drag did not commit the snapped cut (cuts=${JSON.stringify(await cuts())})`);

    /* UNEVEN reachable but invalid (fair-4x4, cut [1] → piles 4 + 12) */
    await force('fair-4x4');
    await setCuts([1]); await setAddends([4, 12]);   // correct reads, but unequal
    note(!(await valid()), 'an UNEVEN partition with correct reads was accepted (equality not enforced)');
    note(!(await lockPresent()), 'lock-it-in appeared for an unequal partition');

    /* NO AUTO-FILL: equal cut, blank addends → invalid */
    await setCuts([2]);                               // piles 8 + 8
    note(!(await valid()), 'equal piles with BLANK addends validated (auto-fill leak)');
    note(!(await lockPresent()), 'lock-it-in appeared before the addends were read');

    /* VALID: correct reads → lock it in → solved */
    await setAddends([8, 8]);
    note(await valid(), 'equal piles + correct reads did not validate');
    note(await lockPresent(), 'lock-it-in did not appear for a valid partition');
    await page.click('.wp-lock'); await sleep(80);
    note(await solved(), 'locking it in did not mark solved');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'Check did not celebrate after a valid lock-in');

    /* MAKE-N: wrong #piles rejected, right accepted (make2-4x3, target 2 piles) */
    await force('make2-4x3');
    await setCuts([1, 2, 3]); await setAddends([3, 3, 3, 3]);  // 4 equal piles, but target is 2
    note(!(await valid()), 'make-n accepted the wrong #piles (4 instead of 2)');
    await setCuts([2]); await setAddends([6, 6]);
    note(await valid(), 'make-n did not accept 2 fair piles');

    /* FIX: starts unfair (preset), resolves after re-cut */
    await force('fix-4x3');
    note((await cuts()).length > 0, 'fix did not start with a preset cut');
    note(!(await valid()), 'fix started already valid (preset should be unfair)');
    await setCuts([2]); await setAddends([6, 6]);
    note(await valid(), 'fix did not resolve after re-cutting to fair piles');

    /* MATCH: non-matching rejected, matching accepted (match-3x4, target 4+4+4) */
    await force('match-3x4');
    await setCuts([1]); await setAddends([4, 8]);    // 2 piles, not the target's 3
    note(!(await valid()), 'match accepted a non-matching partition');
    await setCuts([1, 2]); await setAddends([4, 4, 4]);
    note(await valid(), 'match did not accept the matching 4+4+4 partition');

    /* ERASE: toggling a committed cut removes it */
    await force('fair-2x3'); await setCuts([1]);
    await page.evaluate(() => window.WinterPilesActivity._toggleCut(1)); await sleep(30);
    note((await cuts()).indexOf(1) < 0, 'erasing (toggling) a committed cut did not remove it');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('fair-4x4'); await setCuts([2]); await setAddends([8, 8]);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} winter-piles/en — "${title}"`);
  } catch (e) {
    fails.push('winter-piles/en: ' + e.message);
    console.log(`  FAIL winter-piles/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WINTER-PILES LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WINTER-PILES LOCAL TEST PASSED — pointer-drag cuts, uneven reachable-but-invalid, no auto-fill, valid→lock→solved, make-n/fix/match enforced, erase works, ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
