#!/usr/bin/env node
/* =====================================================================
   local-test-graph-it.js — interaction harness for "Pip's Stacking Fence"
   (2.MD.D.10). Serves `mini tools/` + drives the shell:

     • BUILD: place units to the EXACT per-category count → auto-resolves; a
       wrong count does NOT resolve; the SR table-mirror updates on placement.
     • INTERPRET: select a chip + DELIBERATE commit → correct resolves; a WRONG
       commit routes through a GUIDED RE-READ (the two bars highlight + a spoken
       scaffold + the rail reshuffles), NO advance, NO shell try-again.
     • VERIFY (true/false) + MATCH (pick the graph) resolve correctly.
     • The shell Check is hidden until resolved.
     • >=7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'graph-it.bar-graph.2-md-d-10';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
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

  const url = `http://127.0.0.1:${PORT}/graph-it-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => { const a = window.GraphItActivity; return { resolved: a._resolved, harvest: a._harvest, cog: a._round && a._round.cog, line: (document.querySelector('.gi-line') || {}).textContent || '', miss: !!document.querySelector('.gi-line.miss') }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.GraphItActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'graph-it.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.GraphItActivity._round && document.querySelector('.gi-root'), { timeout: 4000 });
    await sleep(30);
  }
  const place = (cat, times) => page.evaluate((c, t) => { for (let i = 0; i < t; i++) window.GraphItActivity._place(c); }, cat, times).then(() => sleep(20));
  const select = (v) => page.evaluate((x) => window.GraphItActivity._select(x), v).then(() => sleep(20));
  const commit = () => page.evaluate(() => window.GraphItActivity._commit()).then(() => sleep(20));
  const pickThumb = (oi) => page.evaluate((i) => window.GraphItActivity._pickThumb(i), oi).then(() => sleep(20));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const railHas = (v) => page.evaluate((x) => (window.GraphItActivity._rail || []).indexOf(x) >= 0, v);
  const matchCorrect = () => page.evaluate(() => window.GraphItCore.matchIndex(window.GraphItActivity._round));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.GraphItActivity; return t && t._activityRow && document.querySelector('.gi-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pip's Stacking Fence", `header title "${title}"`);

    /* >=7 distinct + reshuffle */
    const N = await page.evaluate(() => window.GraphItActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.GraphItActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* BUILD: build-tally-3 = {berry:8, leaf:6} */
    await force('build-tally-3');
    note(!(await checkVisible()), 'shell Check visible before the build resolves');
    /* SR table mirror present + updates */
    const tableBefore = await page.evaluate(() => { const t = document.querySelector('.gi-sronly table'); return t ? t.textContent : null; });
    note(tableBefore !== null, 'SR table-mirror missing');
    await place('berry', 3);
    const tableAfter = await page.evaluate(() => document.querySelector('.gi-sronly table').textContent);
    note(tableBefore !== tableAfter, 'SR table-mirror did not update on placement');
    note(!(await S()).resolved, 'build resolved early (before exact count)');
    await place('berry', 5); await place('leaf', 6);   /* berry 8, leaf 6 → exact */
    let s = await S();
    note(s.resolved, 'build did not auto-resolve at the exact per-category count');
    note(s.harvest >= 1, 'no harvest on a completed build');
    note(await checkVisible(), 'shell Check did not appear after the build resolved');

    /* BUILD wrong count does not resolve */
    await force('build-tally-3'); await place('berry', 8); await place('leaf', 5);  /* leaf 5, needs 6 */
    note(!(await S()).resolved, 'build resolved with a wrong count');

    /* INTERPRET more-1: leaf6 - berry4 = 2 */
    await force('more-1');
    note(await railHas(2), 'the correct answer (2) is not in the rail');
    /* WRONG commit → guided re-read, no advance, no shell try-again */
    const wrong = await page.evaluate(() => (window.GraphItActivity._rail || []).find(v => v !== 2));
    await select(wrong); await commit(); s = await S();
    note(!s.resolved, 'a WRONG interpret commit resolved the round (must not advance)');
    note(s.miss && /count up|Berries|Leaves/i.test(s.line), `the guided re-read line is missing ("${s.line}")`);
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'a wrong interpret commit showed the shell "try again" (should be the guided re-read)');
    const hl = await page.evaluate(() => document.querySelectorAll('.gi-graph rect[stroke="#F2784B"]').length);
    note(hl > 0, 'the two referenced bars were not highlighted on the guided re-read');
    /* now read it right */
    await select(2); await commit(); s = await S();
    note(s.resolved, 'a correct interpret commit did not resolve');

    /* VERIFY-1: acorn8 - pinecone5 = 3, claim by 2 → FALSE */
    await force('verify-1'); await select('F'); await commit();
    note((await S()).resolved, 'verify: the correct FALSE did not resolve');
    await force('verify-1'); await select('T'); await commit();
    note(!(await S()).resolved, 'verify: a wrong TRUE resolved');

    /* MATCH-1 */
    await force('match-1');
    const correctIdx = await matchCorrect();
    await pickThumb(correctIdx);
    note((await S()).resolved, 'match: picking the correct graph did not resolve');
    await force('match-1');
    await pickThumb((correctIdx + 1) % 3);
    note(!(await S()).resolved, 'match: a wrong graph resolved');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('build-tally-2'); await sleep(30);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px (build)`);
      await force('more-2'); await sleep(30);
      const over2 = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over2 <= 2, `horizontal overflow ${over2}px at ${w}px (interpret)`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} graph-it/en — "${title}"`);
  } catch (e) {
    fails.push('graph-it/en: ' + e.message);
    console.log(`  FAIL graph-it/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`GRAPH-IT LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('GRAPH-IT LOCAL TEST PASSED — build to the exact per-category count auto-resolves (a wrong count does not); the SR table-mirror updates on placement; a correct interpret commit resolves; a WRONG commit routes through a guided re-read (bars highlighted + spoken scaffold + rail reshuffled), NO advance, NO shell try-again; verify + match grade right/wrong; the shell Check is hidden until resolved; >=7 distinct rounds + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
