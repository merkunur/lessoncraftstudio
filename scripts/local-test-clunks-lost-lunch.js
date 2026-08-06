#!/usr/bin/env node
/* =====================================================================
   local-test-clunks-lost-lunch.js — interaction harness for "Clunk's Lost
   Lunch" (CCSS K.OA.A.3 + 1.OA.D.8). Serves `mini tools/` + drives the shell:

     • PLAN→FEED→SEAL: tapping snacks into the lunchbox + the lever SEALS (no
       per-tap win; the cascade replays the combo).
     • NO LIVE AGGREGATE: during assemble, NO DOM node's text equals sum(tray).
     • WRONG EMPTIES + NON-DIRECTIONAL: an over tray and an under tray both →
       the SAME "not my size" message + the tray empties (snacks returned).
     • TAP-TO-REMOVE: a tray chip taps back to the wall; locked givens reject.
     • TWO-WAYS: feed way 1 → "new way"; the SAME way → "same way"; a distinct
       way → seal.
     • REDUCE: starts over-full → put back to T → feed → seal.
     • the other schemas seal; ≥7 schemas + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'clunks-lost-lunch.make-total.k-oa-a-3';
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

  const url = `http://127.0.0.1:${PORT}/clunks-lost-lunch-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.ClunksLostLunchActivity.solved);
  const msgOf = () => page.evaluate(() => window.ClunksLostLunchActivity.msg);
  const wayCount = () => page.evaluate(() => window.ClunksLostLunchActivity.cstate.wayCount);
  const nonLocked = () => page.evaluate(() => window.MakeTotalCore.nonLockedCount(window.ClunksLostLunchActivity.cstate));
  const tapWall = (cost) => page.evaluate((c) => { const b = [...document.querySelectorAll('.cl-cubby')].find(x => { const f = x.querySelector('.cl-flag'); return f && f.textContent === String(c); }); if (b) { b.click(); return true; } return false; }, cost).then(() => sleep(20));
  const removeChip = (cost) => page.evaluate((c) => { const b = [...document.querySelectorAll('.cl-chip:not(.cl-locked)')].find(x => { const f = x.querySelector('.cl-chipnum'); return f && f.textContent === String(c); }); if (b) { b.click(); return true; } return false; }, cost).then(() => sleep(20));
  const feed = () => page.evaluate(() => { const l = document.querySelector('.cl-lever'); if (l) l.click(); }).then(() => sleep(40));
  const assemble = async (costs) => { for (const c of costs) await tapWall(c); };

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ClunksLostLunchActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'clunks-lost-lunch.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ClunksLostLunchActivity.round && document.querySelector('.cl-root'), { timeout: 4000 });
  }
  const solsOf = () => page.evaluate(() => window.ClunksLostLunchActivity.round.solutions);
  async function solve(id) { await force(id); const sch = await page.evaluate(() => window.ClunksLostLunchActivity.schema); const sols = await solsOf(); if (sch === 'reduce') { for (const c of sols[0]) await removeChip(c); } else { await assemble(sols[0]); } await feed(); if (sch === 'two-ways') { await assemble(sols[1]); await feed(); } }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ClunksLostLunchActivity; return t && t._activityRow && document.querySelector('.cl-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Clunk's Lost Lunch", `header title "${title}"`);

    /* variety/shuffle + ≥7 schemas */
    const N = await page.evaluate(() => window.ClunksLostLunchActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ClunksLostLunchActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const schemas = await page.evaluate(() => new Set(window.ClunksLostLunchActivity._activityRow.params.rounds.map(r => r.schema)).size);
    note(schemas >= 7, `only ${schemas} distinct schemas`);

    /* NO LIVE AGGREGATE — assemble a partial combo (sum 5, not a cubby cost, not T) → no DOM text === "5" */
    await force('make-ten'); // T=10, wall [2,3,4,6,7,8]
    await assemble([2, 3]); // sum 5
    const showsSum = await page.evaluate(() => { const want = '5'; return [...document.querySelectorAll('*')].some(e => e.children.length === 0 && (e.textContent || '').trim() === want); });
    note(!showsSum, 'a DOM node shows the running tray sum (a live-aggregate climb surface)');

    /* PLAN→FEED→SEAL (make-ten, solutions[0]) */
    await force('make-ten'); const s0 = (await solsOf())[0]; await assemble(s0); await feed();
    note(await solved(), 'assembling a good combo + feeding did not seal');
    const cascade = await page.evaluate(() => document.querySelectorAll('.cl-cascade .cl-chip').length > 0);
    note(cascade, 'the winning combo did not cascade on a correct feed');
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a sealed round');

    /* WRONG + NON-DIRECTIONAL: an over tray and an under tray → same message + tray empties */
    await force('make-ten'); await assemble([6, 4, 2]); await feed(); // over (12)
    const overMsg = await msgOf(); note(!(await solved()) && (await nonLocked()) === 0, 'an over feed did not empty the tray / sealed');
    await force('make-ten'); await assemble([6, 3]); await feed(); // under (9)
    const underMsg = await msgOf();
    note(overMsg === underMsg, `over (${overMsg}) and under (${underMsg}) wrong feeds gave DIFFERENT messages (a hill-climb tell)`);

    /* TAP-TO-REMOVE + locked reject (missing-addend has a locked 6) */
    await force('clunk-holds-6'); await assemble([3]); // tray = [6(locked), 3]
    await removeChip(3); note((await nonLocked()) === 0, 'tapping a tray chip did not remove it');
    const lockedStays = await page.evaluate(() => { const c = document.querySelector('.cl-locked'); if (c) c.click(); return !!document.querySelector('.cl-locked'); });
    note(lockedStays, 'a locked given chip was removed (must reject)');

    /* TWO-WAYS: way1 → "new way"; same way → "same"; distinct → seal */
    await force('two-ways-eight'); const tw = await solsOf();
    await assemble(tw[0]); await feed();
    note(!(await solved()) && (await wayCount()) === 1, 'first way of two-ways sealed early / no wayCount');
    await assemble(tw[0]); await feed(); // SAME multiset
    note(!(await solved()), 'a repeated way sealed the two-ways round (must reject the multiset-repeat)');
    await assemble(tw[1]); await feed(); // distinct
    note(await solved(), 'a distinct second way did not seal the two-ways round');

    /* REDUCE: starts over-full, put back to T */
    await force('too-full'); // start [3,3,4,2], T=8, remove [4]
    await removeChip(4); await feed();
    note(await solved(), 'reduce did not seal after putting snacks back to the target');

    /* the other schemas seal */
    for (const id of ['finish-with-2', 'exactly-three', 'no-fives-wall', 'make-twelve']) { await solve(id); note(await solved(), `schema round ${id} did not seal`); }

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('make-ten'); await sleep(25);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} clunks-lost-lunch/en — "${title}"`);
  } catch (e) {
    fails.push('clunks-lost-lunch/en: ' + e.message);
    console.log(`  FAIL clunks-lost-lunch/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`CLUNKS-LOST-LUNCH LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('CLUNKS-LOST-LUNCH LOCAL TEST PASSED — plan→feed→seal + cascade; NO live aggregate (no DOM sum during assemble); wrong empties + non-directional (over===under message); tap-to-remove + locked reject; two-ways rejects a repeat + accepts a distinct way; reduce puts-back-to-T; all schemas seal; ≥7 schemas + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
