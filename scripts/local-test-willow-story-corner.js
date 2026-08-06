#!/usr/bin/env node
/* =====================================================================
   local-test-willow-story-corner.js — interaction harness for "Willow's
   Story Corner" (CCSS RL.K.9). Serves `mini tools/` + drives the real shell:

     • two tales render (each a name + 3 beats) + 4 options + a "Hear both"
       button;
     • tapping the DERIVED-correct option → shell Check → celebrate;
     • tapping a WRONG option → tryagain, NO option marked correct/wrong
       (diffuse feedback / no leak);
     • all four option keys exist (a / b / both / neither);
     • tap-to-deselect; ≥7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'willow-story-corner.compare-tales.rl-k-9';
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

  const url = `http://127.0.0.1:${PORT}/willow-story-corner-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WillowStoryCornerActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'willow-story-corner.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WillowStoryCornerActivity.round && document.querySelector('.wsc-root'), { timeout: 4000 });
    await sleep(40);
  }
  const ansKey = () => page.evaluate(() => window.CompareTalesCore.answerKey(window.WillowStoryCornerActivity.round));
  const tapOpt = (key) => page.evaluate((k) => { const b = document.querySelector('.wsc-opt[data-key="' + k + '"]'); if (b) b.click(); }, key).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const otherKey = (k) => ({ a: 'b', b: 'a', both: 'neither', neither: 'both' }[k]);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WillowStoryCornerActivity; return t && t._activityRow && document.querySelector('.wsc-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Willow's Story Corner", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.WillowStoryCornerActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.WillowStoryCornerActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* structure + correct → celebrate (a 'both' round) */
    await force('fb-lost');   // fox+bunny both lost something → 'both'
    note(await page.$$eval('.wsc-tale', els => els.length) === 2, 'did not render 2 tales');
    note(await page.$$eval('.wsc-opt', els => els.length) === 4, 'did not render 4 options');
    const keys = await page.$$eval('.wsc-opt', els => els.map(e => e.getAttribute('data-key')).sort().join(','));
    note(keys === 'a,b,both,neither', `option keys = ${keys} (expected a,b,both,neither)`);
    note(await ansKey() === 'both', 'fb-lost should derive to both');
    await tapOpt(await ansKey()); await check();
    note(await celebrated(), 'correct (both) pick did not celebrate');

    /* a 'b'/'a' round + wrong pick = tryagain, no leak */
    await force('fb-help');   // only bunny got help → 'b'
    note(await ansKey() === 'b', 'fb-help should derive to b');
    const wrong = otherKey(await ansKey());
    await tapOpt(wrong); await check();
    note(await triedAgain(), 'a wrong pick did not show try-again');
    note(!(await celebrated()), 'a wrong pick celebrated (must not)');
    const leak = await page.$$eval('.wsc-opt', els => els.filter(e => /wsc-correct|wsc-right|wsc-wrong|wsc-bad/.test(e.className)).length);
    note(leak === 0, 'an option is marked correct/wrong after a wrong pick (answer leak)');
    // now correct
    await tapOpt(await ansKey()); await check();
    note(await celebrated(), 'correct (b) pick did not celebrate');

    /* a 'neither' round resolves */
    await force('fb-climb');  // neither fox nor bunny climbed → 'neither'
    note(await ansKey() === 'neither', 'fb-climb should derive to neither');
    await tapOpt('neither'); await check();
    note(await celebrated(), 'correct (neither) pick did not celebrate');

    /* tap-to-deselect */
    await force('bm-made');
    await tapOpt('a');
    note(await page.evaluate(() => window.WillowStoryCornerActivity.sel === 'a'), 'first tap did not select');
    await tapOpt('a');
    note(await page.evaluate(() => !window.WillowStoryCornerActivity.sel), 'second tap did not deselect');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('of-scared');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} willow-story-corner/en — "${title}"`);
  } catch (e) {
    fails.push('willow-story-corner/en: ' + e.message);
    console.log(`  FAIL willow-story-corner/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WILLOW-STORY-CORNER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WILLOW-STORY-CORNER LOCAL TEST PASSED — 2 tales + 4 options (a/b/both/neither); both/b/neither rounds resolve on the correct pick; wrong pick = try-again with NO option marked (diffuse, no leak); tap-to-deselect; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
