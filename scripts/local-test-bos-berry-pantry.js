#!/usr/bin/env node
/* =====================================================================
   local-test-bos-berry-pantry.js — interaction harness for "Bo's Berry Pantry"
   (CCSS 1.NBT.B.2). Serves `mini tools/` + drives the shell with reduced-motion
   forced (so the launch resolves synchronously):

     • READ→LOCK→LAUNCH: locking the matching shelf + slinging SEALS (no per-tap
       win; the launch is the only evaluator).
     • NON-LEAKING WRONG: a wrong lock floats back with a re-decode cue that NEVER
       speaks the prompt's value (names the wrong shelf's crate-count instead).
     • VALUE-round (pile) seals on the unitized shelf; the count-match trap loses.
     • DECADE rejects the "stray-loose" near-miss; VALUE-COMPARE picks ten-dominates.
     • FIRST-ATTEMPT KEEPSAKE: a miss-then-correct round does NOT stock the pantry
       (solvedCount unchanged); a clean first read DOES (+1).
     • ≥7 rounds + 4 lanes + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'bos-berry-pantry.slingshot-tens.1-nbt-b-2';
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
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);   // launch resolves synchronously
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/bos-berry-pantry-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.BosBerryPantryActivity.solved);
  const msgOf = () => page.evaluate(() => window.BosBerryPantryActivity.msg);
  const solvedCount = () => page.evaluate(() => window.BosBerryPantryActivity.solvedCount);
  const correctKey = () => page.evaluate(() => window.SlingshotTensCore.correctKey(window.BosBerryPantryActivity.round));
  const lockKey = (key) => page.evaluate((k) => { window.BosBerryPantryActivity._lockShelf(k); }, key).then(() => sleep(15));
  const sling = () => page.evaluate(() => { var b = document.querySelector('.bp-sling'); if (b) b.click(); }).then(() => sleep(40));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.BosBerryPantryActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'bos-berry-pantry.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.BosBerryPantryActivity.round && document.querySelector('.bp-root .bp-shelfrow'), { timeout: 4000 });
  }
  const wrongKey = async () => { const ck = await correctKey(); return ck === 0 ? 1 : 0; };

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.BosBerryPantryActivity; return t && t._activityRow && document.querySelector('.bp-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Bo's Berry Pantry", `header title "${title}"`);

    /* variety/shuffle + ≥7 rounds + 4 lanes */
    const N = await page.evaluate(() => window.BosBerryPantryActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.BosBerryPantryActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const lanes = await page.evaluate(() => new Set(window.BosBerryPantryActivity._activityRow.params.rounds.map(r => r.lane)).size);
    note(lanes === 4, `expected 4 lanes, got ${lanes}`);

    /* NO numeral on a hoard shelf (digit-match dies) — a pile round */
    await force('pack-thirty-four');
    const hoardHasNumeral = await page.evaluate(() => !!document.querySelector('.bp-shelf .bp-hoard .bp-shnum'));
    note(!hoardHasNumeral, 'a hoard shelf shows a numeral (digit-match surface)');
    const promptHasDigit = await page.evaluate(() => { const c = document.querySelector('.bp-prompt'); return c && /\d/.test(c.textContent); });
    note(!promptHasDigit, 'a PILE prompt exposes a digit (must be berries only)');

    /* READ→LOCK→LAUNCH seals on the equivalent */
    await force('pack-thirty-four'); await lockKey(await correctKey()); await sling();
    note(await solved(), 'locking the equivalent + slinging did not seal');
    const pantry = await page.evaluate(() => !!document.querySelector('.bp-pantry'));
    note(pantry, 'no pantry gallery after a seal');
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a sealed round');

    /* NON-LEAKING wrong on a NUMERAL round (63): the cue never speaks the value */
    await force('send-sixty-three'); await lockKey(await wrongKey()); await sling();
    note(!(await solved()), 'a wrong lock sealed the numeral round');
    const wmsg = (await msgOf()) || '';
    note(!/63|sixty/i.test(wmsg), `the wrong cue LEAKS the prompt value ("${wmsg}")`);
    note(/crates|count again/i.test(wmsg), `the wrong cue is not the re-decode cue ("${wmsg}")`);

    /* VALUE-round (pile 28): the unitized shelf seals; the count-match (max-loose) shelf loses */
    await force('pack-twenty-eight'); const ck28 = await correctKey();
    const cm28 = await page.evaluate(() => { const t = window.BosBerryPantryActivity; return window.SlingshotTensCore.SOLVERS.countMatchSolver(t.round).key; });
    note(cm28 !== ck28, 'count-match picked the equivalent on a value-round (unitizing not load-bearing)');
    await lockKey(cm28); await sling(); note(!(await solved()), 'the count-match (max-loose) shelf SEALED a value-round');
    await force('pack-twenty-eight'); await lockKey(await correctKey()); await sling(); note(await solved(), 'the unitized shelf did not seal the value-round');

    /* DECADE rejects the stray-loose near-miss */
    await force('forty-no-loose'); const strayKey = await page.evaluate(() => window.BosBerryPantryActivity.round.shelves.findIndex(s => (s.tens | 0) === 4 && (s.ones | 0) === 1));
    await lockKey(strayKey); await sling(); note(!(await solved()), 'the "4 crates + a stray loose" near-miss sealed the decade round');

    /* VALUE-COMPARE: ten-dominates — the larger-value shelf seals, the more-loose trap loses */
    await force('which-is-more'); const trapKey = await page.evaluate(() => window.BosBerryPantryActivity.round.shelves.findIndex(s => s.kind === 'value-trap'));
    await lockKey(trapKey); await sling(); note(!(await solved()), 'the more-loose (lower-value) shelf won the compare round');
    await force('which-is-more'); await lockKey(await correctKey()); await sling(); note(await solved(), 'the higher-value shelf did not win the compare round');

    /* FIRST-ATTEMPT KEEPSAKE: a miss-then-correct round does NOT stock the pantry */
    await force('seventy-no-loose'); const before = await solvedCount();
    await lockKey(await wrongKey()); await sling();   // miss
    await lockKey(await correctKey()); await sling();  // then correct
    note(await solved(), 'the round did not complete after a correct second read');
    const afterMiss = await solvedCount(); note(afterMiss === before, `a miss-then-correct round STOCKED the pantry (solvedCount ${before}→${afterMiss})`);
    /* a clean first read DOES stock it (+1) */
    await force('name-the-hoard'); const b2 = await solvedCount(); await lockKey(await correctKey()); await sling();
    note((await solvedCount()) === b2 + 1, 'a clean first-attempt did NOT stock the pantry');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('bundle-twenty-five'); await sleep(25);   // the 15-loose trap = worst-case width
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} bos-berry-pantry/en — "${title}"`);
  } catch (e) {
    fails.push('bos-berry-pantry/en: ' + e.message);
    console.log(`  FAIL bos-berry-pantry/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`BOS-BERRY-PANTRY LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('BOS-BERRY-PANTRY LOCAL TEST PASSED — read→lock→launch seals (the launch is the only evaluator); NO numeral on hoard shelves + no digit on a pile prompt; ' +
    'non-leaking wrong (never the prompt value); the unitized shelf seals + the count-match trap loses; decade rejects the stray-loose; value-compare picks ten-dominates; ' +
    'first-attempt keepsake (miss-then-correct does NOT stock the pantry, a clean read does); ≥7 rounds + 4 lanes + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
