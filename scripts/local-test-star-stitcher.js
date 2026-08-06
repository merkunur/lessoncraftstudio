#!/usr/bin/env node
/* =====================================================================
   local-test-star-stitcher.js — interaction harness for "Count the Stars
   Awake" (CCSS K.CC.A.2). Serves `mini tools/` + drives the real shell:

     • a Count-on beat advances the numeral + flies the firefly + lights the
       next dark star; the DOM exposes NO order on dark dots (anti-cheat);
     • MASHING past a by-N target + waking OVERSHOOTS (glide back, no lock);
       counting EXACTLY to the target + waking LOCKS;
     • the whole trail completes → reveal → solved → shell celebrates;
     • read-k needs the pick-anchor "Start here"; quantity-start needs the pip
       count; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'star-stitcher.connect-sequence.k-cc-a-2';
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

  const url = `http://127.0.0.1:${PORT}/star-stitcher-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const count = () => page.evaluate(() => window.StarStitcherActivity.cstate.count);
  const lockedIdx = () => page.evaluate(() => window.StarStitcherActivity.cstate.lockedIdx);
  const solved = () => page.evaluate(() => window.StarStitcherActivity.solved);
  const stage = () => page.evaluate(() => window.StarStitcherActivity.stage);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.StarStitcherActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'star-stitcher.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.StarStitcherActivity.round && document.querySelector('.ss-root'), { timeout: 4000 });
  }
  const beat = () => page.click('.ss-beat').then(() => sleep(40)).catch(() => {});
  const wake = () => page.click('.ss-wake').then(() => sleep(40)).catch(() => {});

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.StarStitcherActivity; return t && t._activityRow && document.querySelector('.ss-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Count the Stars Awake', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.StarStitcherActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.StarStitcherActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* COUNT ON advances + NO order leaked on dark dots */
    await force('plus1-7');  // start 7, targets 8..12 (each +1)
    note(await count() === 7, 'did not start at the given k=7');
    const darkOrders = await page.evaluate(() => { const t = window.StarStitcherActivity; const v = window.ConnectSequenceCore.getRenderableState(t.round, t.cstate); return v.dots.filter(d => !d.lit && !d.passing).map(d => d.order); });
    note(darkOrders.every(o => o == null), `a dark dot leaked its order ${JSON.stringify(darkOrders)} (anti-cheat broken)`);
    await beat();
    note(await count() === 8, `Count on did not advance the numeral (count=${await count()})`);
    await wake();
    note(await lockedIdx() === 1, 'waking at the +1 target did not lock the segment');

    /* MASHING past a by-N target OVERSHOOTS (glide back, no lock) */
    await force('byn-12');  // start 12, first target 15 (3 on)
    await beat(); await beat(); await beat(); await beat();  // mash 4 → count 16, past the target 15
    note(await count() === 16, `mash did not reach 16 (count=${await count()})`);
    await wake();
    note(await lockedIdx() === 0 && await count() === 12, 'overshoot did not glide back to the segment start (12)');
    // count exactly to 15 + wake → lock
    await beat(); await beat(); await beat();
    note(await count() === 15, 'recount to the target failed');
    await wake();
    note(await lockedIdx() === 1, 'waking exactly at the by-N target did not lock');

    /* complete a whole trail → reveal → solved (plus1-7) */
    await force('plus1-7');
    for (let seg = 0; seg < 5; seg++) { await beat(); await wake(); }  // 5 targets, each +1
    note(await solved(), 'completing the trail did not solve');
    note(await stage() === 'done' && await page.$('.ss-creature') !== null, 'the reveal did not show the creature');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'Check did not celebrate after the reveal');

    /* READ-K needs the pick-anchor "Start here" */
    await force('readk-11');
    note(await stage() === 'pick-anchor', 'read-k did not start in pick-anchor');
    await page.click('.ss-beat'); await sleep(40);  // "Start here"
    note(await stage() === 'count-on', 'pick-anchor did not advance to count-on');

    /* QUANTITY-START needs the pip count */
    await force('qty-7');
    note(await stage() === 'count-set', 'quantity-start did not start in count-set');
    await page.evaluate(() => { const t = window.StarStitcherActivity; t.setCount = t.round.setN; t.render(); }); await sleep(20);
    note(await page.$('.ss-beat') !== null, 'count-set did not show the proceed button after counting the pips');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('plus1-7'); await beat(); await wake();
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} star-stitcher/en — "${title}"`);
  } catch (e) {
    fails.push('star-stitcher/en: ' + e.message);
    console.log(`  FAIL star-stitcher/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`STAR-STITCHER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('STAR-STITCHER LOCAL TEST PASSED — count-on advances + NO dark-dot order leak, mashing overshoots+glides-back, exact-count locks, trail→reveal→solved, pick-anchor + count-set pre-stages, ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
