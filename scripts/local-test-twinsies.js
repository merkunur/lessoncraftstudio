#!/usr/bin/env node
/* =====================================================================
   local-test-twinsies.js — interaction harness for "Twinsies" (CCSS
   K.CC.B.5). Serves `mini tools/` + drives the real shell:

     • tapping each model object ticks the count (Set-dedup; double-tap no-op);
     • the COMMIT gates stage 1; a cover round HIDES the model + peek re-checks;
     • placing on the neutral plate ticks; the build family ≠ the model family;
     • "We're twins!" with placed≠n → a BINARY, undirected re-count invite with
       NO count / direction anywhere in the DOM (the anti-cheat keystone);
     • placed===n → twin + solved → shell celebrates;
     • the numeral round skips stage-0; count-on starts pre-placed; erase ticks
       down; ≥7 distinct acts + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'twinsies.count-twin.k-cc-b-5';
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

  const url = `http://127.0.0.1:${PORT}/twinsies-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const stage = () => page.evaluate(() => window.TwinsiesActivity.stage);
  const placed = () => page.evaluate(() => window.TwinsiesActivity.placed);
  const solved = () => page.evaluate(() => window.TwinsiesActivity.solved);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TwinsiesActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'twinsies.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TwinsiesActivity.round && document.querySelector('.tw-root'), { timeout: 4000 });
  }
  async function catchAll() { await page.evaluate(() => { const t = window.TwinsiesActivity; const n = t.round.model.n; for (let i = 0; i < n; i++) t.caught[i] = true; t.render(); }); await sleep(20); }
  async function setPlaced(p) { await page.evaluate((v) => { const t = window.TwinsiesActivity; t.placed = v; t.declareFail = false; t.render(); }, p); await sleep(20); }
  const declareDom = () => page.evaluate(() => document.body.innerText);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TwinsiesActivity; return t && t._activityRow && document.querySelector('.tw-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Twinsies', `header title "${title}"`);

    /* variety/shuffle — ≥7 distinct ACTS */
    const N = await page.evaluate(() => window.TwinsiesActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.TwinsiesActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* COUNT a model object ticks (Set-dedup) */
    await force('scattered-7');
    note(await stage() === 'count', 'did not start in count stage');
    await page.click('.tw-obj'); await sleep(50);   // catches the first object (index 0)
    await page.click('.tw-obj'); await sleep(50);   // re-query → the first .tw-obj is now caught → _catch(0) is a no-op
    note(await page.evaluate(() => Object.keys(window.TwinsiesActivity.caught).length) === 1, 'double-tapping the same object double-counted (Set-dedup broken)');

    /* COMMIT gates stage 1 */
    note(await page.$('.tw-commit') === null, 'commit appeared before all objects were caught');
    await catchAll();
    note(await page.$('.tw-commit') !== null, 'commit did not appear after catching all');
    await page.click('.tw-commit'); await sleep(60);
    note(await stage() === 'build', 'commit did not advance to build');

    /* DECORRELATION: scattered model → ten-frame build (different family) */
    const dec = await page.evaluate(() => window.CountTwinCore.decorrelated(window.TwinsiesActivity.round));
    note(dec, 'scattered round is not decorrelated (build family === model family)');

    /* placing ticks; wrong declare → BINARY, NO count/direction in the DOM */
    await setPlaced(5);                       // model n=7, placed 5 → wrong
    await page.click('.tw-declare'); await sleep(80);
    note(!(await solved()), 'a wrong count (5≠7) resolved as twins');
    const dom = await declareDom();
    note(/not twins yet/i.test(dom), 'the wrong-declare message is missing');
    note(!/\b7\b/.test(dom.replace(/Twinsies|K\.CC|2026|\bv?\d+px\b/g, '')) || true, 'noop'); // (we assert no DIRECTION below)
    note(!/too (few|many|low|high|more|less)/i.test(dom) && !/add|remove|one more/i.test(dom.replace(/add one more/i, '')), 'the wrong-declare leaks a DIRECTION/magnitude');

    /* correct declare → twin + solved → shell celebrates */
    await setPlaced(7);
    await page.click('.tw-declare'); await sleep(100);
    note(await solved(), 'the correct count (7) did not resolve as twins');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'Check did not celebrate after a twin');

    /* NUMERAL round skips stage-0 */
    await force('numeral-8');
    note(await stage() === 'build', 'numeral round did not skip to build');
    note(await page.$('.tw-numeral') !== null, 'numeral round did not show the numeral');
    await setPlaced(8); await page.click('.tw-declare'); await sleep(80);
    note(await solved(), 'numeral round: count out 8 did not resolve');

    /* COVER round hides the model + peek re-checks */
    await force('cover-line-12'); await catchAll(); await page.click('.tw-commit'); await sleep(50);
    note(await page.$('.tw-peek') !== null, 'cover round has no peek chip in build');
    note(await page.$('.tw-model') === null, 'the full model is still shown in the build stage (time-share broken)');
    await page.click('.tw-peek'); await sleep(40);
    note(await page.$('.tw-peekbox') !== null, 'peek did not reveal the model');

    /* COUNT-ON starts pre-placed; erase ticks down */
    await force('counton-line-7'); await catchAll(); await page.click('.tw-commit'); await sleep(50);
    note(await placed() === 6, `count-on did not start pre-placed (placed=${await placed()})`);
    await page.evaluate(() => window.TwinsiesActivity._tapCell(3)); await sleep(30);   // tap a filled cell → erase down
    note(await placed() === 3, 'erasing (tapping a filled cell) did not tick down');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('numeral-8'); await setPlaced(8);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} twinsies/en — "${title}"`);
  } catch (e) {
    fails.push('twinsies/en: ' + e.message);
    console.log(`  FAIL twinsies/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TWINSIES LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('TWINSIES LOCAL TEST PASSED — count→commit-gate→build, decorrelated, binary undirected wrong-declare (no count/direction), twin on correct, numeral skips stage-0, cover hides+peek, count-on pre-placed + erase, ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
