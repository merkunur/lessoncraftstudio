#!/usr/bin/env node
/* =====================================================================
   local-test-comparison-creek.js — interaction harness for "Comparison
   Creek" (CCSS K.CC.C.7). Serves `mini tools/` + drives the real shell:

     • renders Captain Quill + the river fork + two channel buoys + Check;
     • CORRECT: tapping the reader-correct channel (or = beacon / MORE-LESS)
       resolves → done → Check celebrates + locks;
     • WRONG: tapping the wrong channel does NOT advance + POSITION-FLIPS
       (the left channel's data-side swaps) so the child must re-read;
     • every fork solvable via deriveCorrect; tie via the = beacon, name-it
       via MORE/LESS;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-comparison-creek.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'comparison-creek.river-steer.k-cc-c-7';
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
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `${BASE}/comparison-creek-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ComparisonCreekActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'comparison-creek.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ComparisonCreekActivity.fork && (document.querySelector('.cc-channel') || document.querySelector('.cc-relbtn')), { timeout: 4000 });
  }
  const meta = () => page.evaluate(() => { const C = window.RiverSteerCore, f = window.ComparisonCreekActivity.fork; return { id: f.id, correct: C.deriveCorrect(f), mode: f.responseMode }; });
  const state = () => page.evaluate(() => ({ done: window.ComparisonCreekActivity.phase === 'done', celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')), readOnly: window.ComparisonCreekActivity.readOnly }));
  const leftSide = () => page.evaluate(() => { const e = document.querySelector('.cc-channel.cc-left'); return e ? e.getAttribute('data-side') : null; });
  async function tapSide(side) { const el = await page.$('.cc-channel[data-side="' + side + '"]'); if (el) { await el.click(); return true; } return false; }
  async function tapBeacon() { const el = await page.$('.cc-beacon'); if (el) await el.click(); }
  async function tapRel(word) { const bs = await page.$$('.cc-relbtn'); for (const b of bs) { const t = await (await b.getProperty('textContent')).jsonValue(); if (String(t).trim().toLowerCase() === word) { await b.click(); return true; } } return false; }
  async function solve(m) { if (m.mode === 'side') await tapSide(m.correct); else if (m.mode === 'equal') await tapBeacon(); else await tapRel(m.correct); await new Promise(r => setTimeout(r, 120)); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ComparisonCreekActivity; return t && t._activityRow && document.querySelector('.cc-quill') && (document.querySelector('.cc-channel') || document.querySelector('.cc-relbtn')) && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    note(!!(await page.$('.cc-quill-svg')), 'no Captain Quill');
    note(!!(await page.$('.cc-river')), 'no river');
    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Comparison Creek', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.ComparisonCreekActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.ComparisonCreekActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* WRONG → no advance + POSITION-FLIP (the left channel's data-side swaps) */
    await force('sc-7-6');
    const m0 = await meta();
    const before = await leftSide();
    const wrong = m0.correct === 'L' ? 'R' : 'L';
    await tapSide(wrong);
    await new Promise(r => setTimeout(r, 120));
    const w = await state();
    note(!w.done && !w.celebrated, 'a wrong steer advanced/celebrated (must reverse, no penalty)');
    const after = await leftSide();
    note(before !== after, `position-flip did not swap the buoys (left side ${before}→${after})`);
    // now steer the correct channel (by identity) → done
    await tapSide(m0.correct);
    await new Promise(r => setTimeout(r, 120));
    note((await state()).done, 'steering the correct channel after the flip did not complete');

    /* EVERY fork solvable */
    const FORKS = ['sc-7-6', 'sc-5-6', 'sc-8-9', 'sc-7-6s', 'dot-4-5', 'ros-7-6', 'sum-4-5', 'sz-3-8', 'sz-9-4', 'tie-6-6', 'name-6-7', 'btw-5-8'];
    for (const id of FORKS) {
      await force(id);
      const m = await meta();
      await solve(m);
      const st = await state();
      note(st.done, `fork '${id}' (${m.mode}) did not complete via the reader-correct response`);
      if (st.done) { await page.click('.lcs-activity-check'); const fin = await state(); note(fin.celebrated && fin.readOnly, `${id}: Check did not celebrate + lock`); }
    }

    /* mobile overflow 280→768 */
    for (const w2 of [280, 360, 412, 768]) {
      await page.setViewport({ width: w2, height: 800 });
      await force('sz-3-8');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w2}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} comparison-creek/en — "${title}"`);
  } catch (e) {
    fails.push('comparison-creek/en: ' + e.message);
    console.log(`  FAIL comparison-creek/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`COMPARISON-CREEK LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('COMPARISON-CREEK LOCAL TEST PASSED — Quill + river render, wrong steer position-flips (no penalty), all 12 forks solve via the reader, ≥7 reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
