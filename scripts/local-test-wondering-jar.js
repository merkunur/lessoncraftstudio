#!/usr/bin/env node
/* =====================================================================
   local-test-wondering-jar.js — interaction harness for "The Wondering Jar"
   (CCSS K.CC.B.5). Serves `mini tools/` + drives the real shell:

     • ESTIMATE: the slider locks ANY wish; the jar is uncountable (no answer in
       the DOM / getActual throws); locking advances to count.
     • COUNT: tapping each DISTINCT sweet ticks the count + speaks; RE-TAPPING a
       counted sweet is INERT (no +1, no speech) — the conveyor anti-cheat;
       reaching all N distinct → compare.
     • ESTIMATE-HONORED-NEVER-GRADED: wish=0, real count → still advances.
     • COMPARE: the reveal narrates DIRECTION only (no distance number).
     • the two-jar (#7) flow counts A then B; the binary (#6) flow picks then counts.
     • ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wondering-jar.estimate-jar.k-cc-b-5';
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

  const url = `http://127.0.0.1:${PORT}/wondering-jar-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const stage = () => page.evaluate(() => window.WonderingJarActivity.stage);
  const solved = () => page.evaluate(() => window.WonderingJarActivity.solved);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WonderingJarActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'wondering-jar.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WonderingJarActivity.round && document.querySelector('.wj-root'), { timeout: 4000 });
  }
  const setGuess = (v) => page.evaluate((vv) => window.WonderingJarActivity._setGuess(vv), v).then(() => sleep(15));
  const lockSlider = () => page.click('.wj-lock').then(() => sleep(40)).catch(() => {});
  const tapItem = (i) => page.evaluate((idx) => { const els = document.querySelectorAll('.wj-item'); if (els[idx]) els[idx].click(); }, i).then(() => sleep(20));
  const itemCount = () => page.evaluate(() => document.querySelectorAll('.wj-item').length);
  const countOf = () => page.evaluate(() => { const t = window.WonderingJarActivity, r = t.round; const st = (r.type === 'compare-two' && t.jarPhase === 'A') ? t.cstateA : t.cstate; return Object.keys(st.counted).length; });

  async function countAllDistinct() {
    let guard = 0;
    while (await stage() === 'count' && guard++ < 60) { const n = await itemCount(); for (let i = 0; i < n; i++) { if (await stage() !== 'count') break; await tapItem(i); } }
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WonderingJarActivity; return t && t._activityRow && document.querySelector('.wj-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Wondering Jar', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.WonderingJarActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.WonderingJarActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* ESTIMATE: jar uncountable + getActual throws + slider locks any wish */
    await force('line-8');  // slider round, actual 8
    note(await stage() === 'estimate', 'did not start at estimate');
    const leak = await page.evaluate(() => { const t = window.WonderingJarActivity; const rs = window.EstimateJarCore.renderableState(t.round, t.cstate); let threw = false; try { window.EstimateJarCore.getActual(t.round, t.cstate); } catch (e) { threw = true; } const hasAnswer = Object.keys(rs).some(k => rs[k] === t.round.items.length); return { threw, hasAnswer, items: document.querySelectorAll('.wj-item').length }; });
    note(leak.threw, 'getActual did not throw at estimate (actual leaked)');
    note(!leak.hasAnswer, 'renderableState exposed a field === actual at estimate');
    note(leak.items === 0, 'spread items are present at estimate (jar not clumped)');
    await setGuess(3); await lockSlider();
    note(await stage() === 'count', 'locking the wish did not advance to count');
    note(await page.evaluate(() => window.WonderingJarActivity.cstate.guess) === 3, 'the locked wish value was lost');

    /* COUNT: distinct ticks; re-tap inert (the conveyor anti-cheat) */
    note(await itemCount() === 8, `the jar did not spread 8 items (got ${await itemCount()})`);
    await tapItem(0); note(await countOf() === 1, 'first tap did not tick the count');
    await tapItem(0); note(await countOf() === 1, 'RE-TAPPING a counted sweet advanced the count (conveyor!)');
    for (let i = 1; i < 8; i++) await tapItem(i);
    note(await stage() === 'compare' && await solved(), 'counting all 8 distinct did not reach compare/solved');

    /* COMPARE: direction only, no distance number */
    const rev = await page.evaluate(() => document.querySelector('.wj-compare') ? document.querySelector('.wj-compare').textContent : '');
    note(/8/.test(rev), 'the reveal did not show the actual count 8');
    note(!/close|far|away|off by|\bby \d/i.test(rev), 'the compare leaked a distance/accuracy phrase');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after the reveal');

    /* ESTIMATE HONORED-NEVER-GRADED: wish 0, full count → still advances */
    await force('scatter-7');
    await setGuess(0); await lockSlider();
    await countAllDistinct();
    note(await solved(), 'a wish of 0 blocked the count from completing (estimate is being graded)');

    /* PREDICT-COMPARISON (#6 binary): pick then count */
    await force('predict-11');
    note(await stage() === 'estimate' && await page.$('.wj-pick') !== null, 'binary round did not show more/fewer picks');
    await page.click('.wj-pick'); await sleep(40);  // pick "More"
    note(await stage() === 'count', 'binary pick did not advance to count');
    await countAllDistinct();
    note(await solved(), 'binary round count did not complete');

    /* COMPARE-TWO (#7): count A then B */
    await force('compare-two');
    await page.click('.wj-pick'); await sleep(40);  // which-more pick
    note(await stage() === 'count' && await page.evaluate(() => window.WonderingJarActivity.jarPhase) === 'A', 'compare-two did not start counting jar A');
    await countAllDistinct();
    note(await solved(), 'compare-two did not complete both counts');
    const two = await page.evaluate(() => document.querySelector('.wj-compare') ? document.querySelector('.wj-compare').textContent : '');
    note(/7/.test(two) && /10/.test(two), 'compare-two reveal did not show both jar counts (7 and 10)');

    /* mobile overflow 280→768 (estimate + a spread N=20-ish via array-12) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('array-12'); await setGuess(9); await lockSlider();
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} wondering-jar/en — "${title}"`);
  } catch (e) {
    fails.push('wondering-jar/en: ' + e.message);
    console.log(`  FAIL wondering-jar/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WONDERING-JAR LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WONDERING-JAR LOCAL TEST PASSED — jar uncountable at estimate (getActual throws); slider locks any wish; distinct tap ticks + RE-TAP INERT (conveyor anti-cheat); wish=0 still advances (honored-never-graded); reveal is direction-only; binary + two-jar flows complete; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
