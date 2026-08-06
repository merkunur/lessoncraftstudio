#!/usr/bin/env node
/* =====================================================================
   local-test-bram-board-shop.js — interaction harness for "Bram's Board
   Shop" (CCSS 2.MD.B.5). Serves `mini tools/` + drives the real shell:

     • a round renders the story + the tape (segment slots) + the tile tray;
     • placing the CORRECT model (knowns in segments, unknown '?', decoy left
       out) + dialing the DERIVED cm → "Measure it" → solved;
     • a WRONG model (swapped knowns) → not solved (full binding graded) +
       tiles reshuffle;
     • binding the DECOY anywhere → not solved;
     • ≥7 distinct rounds + reshuffle; no horizontal overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'bram-board-shop.length-word-problems.2-md-b-5';
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

  const url = `http://127.0.0.1:${PORT}/bram-board-shop-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.BramBoardShopActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'bram-board-shop.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.BramBoardShopActivity.round && document.querySelector('.bbs-root'), { timeout: 4000 });
    await sleep(40);
  }
  // model the CORRECT binding + dial the answer + commit (drives the real grade path)
  const modelCorrect = () => page.evaluate(() => {
    const t = window.BramBoardShopActivity, a = window.LengthTapeCore.audit(t.round);
    t.binding = {}; t.roles = t.snap.roles; t.snap.roles.forEach(role => { t.binding[role] = a.correct[role]; });
    t.dialed = a.answer; t._commit();
  }).then(() => sleep(60));
  const solved = () => page.evaluate(() => window.BramBoardShopActivity.solved);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.BramBoardShopActivity; return t && t._activityRow && document.querySelector('.bbs-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Bram's Board Shop", `header title "${title}"`);

    /* variety/shuffle */
    const Np = await page.evaluate(() => window.BramBoardShopActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.BramBoardShopActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    /* structure */
    await force('takefrom-result');
    note(!!(await page.$('.bbs-story')), 'no story rendered');
    note(await page.$$eval('.bbs-slot', els => els.length) >= 3, 'tape did not render >=3 segment slots');
    note(await page.$$eval('.bbs-tile', els => els.length) === 3, 'tray did not render 3 tiles');

    /* correct model → solved */
    await modelCorrect();
    note(await solved(), 'the correct model + dialed answer did not solve');

    /* wrong model (swap knowns) → not solved + reshuffle */
    await force('takefrom-change');
    await page.evaluate(() => {
      const t = window.BramBoardShopActivity, a = window.LengthTapeCore.audit(t.round);
      const ks = t.snap.roles.filter(r => r !== t.round.unknownRole);
      t.binding = {}; t.binding[t.round.unknownRole] = '?';
      t.binding[ks[0]] = a.correct[ks[1]]; t.binding[ks[1]] = a.correct[ks[0]];
      t.dialed = a.answer; t._commit();
    });
    await sleep(50);
    note(!(await solved()), 'a swapped (wrong) model solved — full binding not graded');

    /* binding the decoy → not solved */
    await force('addto-result');
    await page.evaluate(() => {
      const t = window.BramBoardShopActivity, a = window.LengthTapeCore.audit(t.round);
      t.binding = {}; t.snap.roles.forEach(role => { t.binding[role] = a.correct[role]; });
      // overwrite a known slot with the decoy
      const ks = t.snap.roles.filter(r => r !== t.round.unknownRole);
      t.binding[ks[0]] = t.round.decoyId;
      t.dialed = a.answer; t._commit();
    });
    await sleep(50);
    note(!(await solved()), 'binding the decoy still solved (decoy must be rejected)');

    /* correct after the wrong attempts */
    await force('compare-diff');
    await modelCorrect();
    note(await solved(), 'a compare round did not solve on the correct model');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('compare-smaller');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} bram-board-shop/en — "${title}"`);
  } catch (e) {
    fails.push('bram-board-shop/en: ' + e.message);
    console.log(`  FAIL bram-board-shop/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`BRAM-BOARD-SHOP LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('BRAM-BOARD-SHOP LOCAL TEST PASSED — story + tape + tray render; correct model + dialed cm solves; swapped model + decoy-bound do NOT solve (full binding graded); ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
