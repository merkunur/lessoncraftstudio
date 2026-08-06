#!/usr/bin/env node
/* =====================================================================
   local-test-necklace.js — interaction harness for "The Necklace That Won't
   Hold Still" (CCSS K.CC.B.4). Serves `mini tools/` + drives the real shell:

     • COUNT-MODEL: tapping a model bead ticks the count + speaks one number +
       a double-tap is a no-op (Set-dedup → one-to-one); the model beads expose
       NO ordinal in getRenderableState (anti-cheat).
     • COUNT-AND-THREAD: full model count → "thread mine" → threading a slot
       advances the count + speaks; over-thread is ERASABLE (tap a bead → down);
       clasp fires ONLY at count-equality, an undirected miss otherwise.
     • RECOUNT: count → "shake!" (narrated) → re-count the rearranged → AFFIRMS
       the same cardinal (the count NEVER changes).
     • CARDINALITY-CONFIRM: the cardinal is READ FROM the count (no free keypad).
     • THREAD-TO-HEARD: no model shown; the fox SPEAKS the number.
     • FIND-SKIP / REPAIR: the cord starts with a one-bead error to remove.
     • ≥7 distinct acts + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'necklace.bead-string.k-cc-b-4';
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

  const url = `http://127.0.0.1:${PORT}/necklace-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const caughtN = () => page.evaluate(() => Object.keys(window.NecklaceActivity.caught).length);
  const placed = () => page.evaluate(() => window.NecklaceActivity.placed);
  const stage = () => page.evaluate(() => window.NecklaceActivity.stage);
  const solved = () => page.evaluate(() => window.NecklaceActivity.solved);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.NecklaceActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'necklace.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.NecklaceActivity.round && document.querySelector('.nk-root'), { timeout: 4000 });
  }
  const tapModel = async (i) => { await page.evaluate((idx) => { document.querySelectorAll('.nk-obj')[idx].click(); }, i); await sleep(25); };
  const countModelFull = async () => { const n = await page.evaluate(() => window.NecklaceActivity._modelN()); for (let i = 0; i < n; i++) await tapModel(i); };
  const clickCommit = () => page.click('.nk-commit').then(() => sleep(40)).catch(() => {});
  const tapReady = () => page.evaluate(() => { const r = document.querySelector('.nk-ready'); if (r) r.click(); }).then(() => sleep(30));
  const tapFilled = () => page.evaluate(() => { const f = document.querySelector('.nk-filled'); if (f) f.click(); }).then(() => sleep(30));
  const declare = () => page.click('.nk-declare').then(() => sleep(60)).catch(() => {});

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.NecklaceActivity; return t && t._activityRow && document.querySelector('.nk-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "The Necklace That Won't Hold Still", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.NecklaceActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.NecklaceActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* COUNT-MODEL: tick + dedup + NO leaked ordinal */
    await force('thread-6');  // count-and-thread, target 6
    const leak = await page.evaluate(() => { const t = window.NecklaceActivity; const v = window.BeadStringCore.getRenderableState(t.round, { count: 0, placed: [], spoken: 0 }); return v.modelBeads.some(b => ('order' in b) || ('ordinal' in b)) || ('target' in v) || ('targetCount' in v); });
    note(!leak, 'getRenderableState leaks an ordinal/target (anti-cheat broken)');
    await tapModel(0); note(await caughtN() === 1, 'first model tap did not tick the count');
    await tapModel(0); note(await caughtN() === 1, 'double-tap a model bead changed the count (one-to-one broken)');
    for (let i = 1; i < 6; i++) await tapModel(i);
    note(await caughtN() === 6, `full model count != 6 (got ${await caughtN()})`);
    note(await page.$('.nk-commit') !== null, 'a full model count did not surface the proceed button');

    /* THREAD: hide → produce → over-thread erasable → clasp at equality */
    await clickCommit();
    note(await stage() === 'produce', 'commit did not advance to produce');
    for (let i = 0; i < 6; i++) await tapReady();
    note(await placed() === 6, `threading did not reach 6 (placed=${await placed()})`);
    await tapReady(); note(await placed() === 7, 'over-thread did not add (mash beyond target)');
    await tapFilled(); note(await placed() === 6, 'tapping a bead did not erase one (count down)');
    await declare();
    note(await solved(), 'clasp at count-equality did not solve');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after the clasp');

    /* undirected miss: thread the wrong count → clasp won't close (no direction) */
    await force('heard-7');  // thread-to-heard, target 7, no model
    note(await stage() === 'produce' && await page.$('.nk-obj') === null, 'heard round showed a model (should be audio-only)');
    for (let i = 0; i < 5; i++) await tapReady();  // 5 ≠ 7
    await declare();
    note(!await solved(), 'a wrong count was accepted as a clasp');
    const dirLeak = await page.evaluate(() => { const s = document.querySelector('.nk-say'); return /more|less|too many|fewer|add one|take one/i.test(s ? s.textContent : ''); });
    note(!dirLeak, 'the miss message leaks a direction/magnitude');
    for (let i = 5; i < 7; i++) await tapReady();
    await declare(); note(await solved(), 'recount to 7 did not clasp');

    /* RECOUNT: count → shake → re-count → affirm same cardinal (count never changes) */
    await force('recount-7');
    await countModelFull();
    note((await page.$eval('.nk-commit', e => e.textContent)).match(/shake/i), 'recount did not offer a narrated shake');
    await clickCommit();  // shake
    note(await caughtN() === 0 && await stage() === 'count-model' && await page.evaluate(() => window.NecklaceActivity.shaken), 'shake did not reset for the re-count');
    await countModelFull();
    await clickCommit();  // affirm
    note(await solved(), 'the re-count affirm did not solve');

    /* CARDINALITY-CONFIRM: read from the count, no free keypad */
    await force('confirm-10');
    await countModelFull();
    await clickCommit();
    note(await stage() === 'confirm', 'cardinality-confirm did not enter the confirm stage');
    const shown = await page.$eval('.nk-cardinal-num', e => e.textContent.trim()).catch(() => '');
    note(shown === '10', `the confirm cardinal "${shown}" is not the counted value 10`);
    note(await page.$('input') === null && await page.$('.lcs-activity-keypad') === null, 'a free keypad/input exists on the confirm round');
    await page.click('.nk-cardinal'); await sleep(60);
    note(await solved(), 'tapping the counted cardinal did not solve');

    /* FIND-SKIP: cord starts with one extra → remove one → fix */
    await force('findskip-9');
    note(await stage() === 'fix' && await placed() === 10, `find-skip did not start at the error count 10 (placed=${await placed()})`);
    await tapFilled(); note(await placed() === 9, 'removing the extra bead did not reach the target 9');
    await declare(); note(await solved(), 'the find-skip repair did not solve');

    /* REPAIR-OTHER: establish target → fix the friend's over-count */
    await force('repair-8');
    await countModelFull();
    await clickCommit();
    note(await stage() === 'fix' && await placed() === 9, `repair did not start the fix at the friend's 9 (placed=${await placed()})`);
    await tapFilled(); note(await placed() === 8, "fixing the friend's necklace did not reach 8");
    await declare(); note(await solved(), 'the repair did not solve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('thread-6'); await tapModel(0);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} necklace/en — "${title}"`);
  } catch (e) {
    fails.push('necklace/en: ' + e.message);
    console.log(`  FAIL necklace/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`NECKLACE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('NECKLACE LOCAL TEST PASSED — one-to-one count (dedup, no leaked ordinal); thread advances + over-thread erasable; clasp only at count-equality, undirected miss; recount affirms the same cardinal; confirm reads from the count (no keypad); heard audio-only; find-skip + repair remove the one-bead error; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
