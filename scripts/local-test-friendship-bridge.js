#!/usr/bin/env node
/* =====================================================================
   local-test-friendship-bridge.js — interaction harness for "The Friendship
   Bridge" (CCSS K.CC.C.6). Serves `mini tools/` + drives the real shell:

     • PAIR + JUDGE: pairing two friends gives them a buddy badge; tapping the
       correct relation pill solves; the beam stays FLAT during match+judge and
       tips ONLY after a correct commit (post-commit applause, never the answer).
     • MISLEADING: a misleading round's correct answer is the NON-perceptual side
       (the spread bunch that LOOKS bigger is not).
     • NO PRE-COMMIT EMPHASIS: no glow/pulse class on any leftover before commit.
     • HOW-MANY-MORE: pair, then the leftover count solves; a wrong count re-asks.
     • MAKE-EQUAL / BUILD-EQUAL: adding to the lonely side until equal solves.
     • COUNT-JUDGE / CONSERVATION / PREDICT-VERIFY complete.
     • ≥7 distinct act-types + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'friendship-bridge.compare-balance.k-cc-c-6';
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

  const url = `http://127.0.0.1:${PORT}/friendship-bridge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const T = () => page.evaluate(() => window.FriendshipBridgeActivity);
  const solved = () => page.evaluate(() => window.FriendshipBridgeActivity.solved);
  const beamTip = () => page.evaluate(() => { const b = document.querySelector('.fb-beam'); return b ? b.getAttribute('data-tip') : '__nobeam__'; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.FriendshipBridgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'friendship-bridge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.FriendshipBridgeActivity.round && document.querySelector('.fb-root'), { timeout: 4000 });
  }
  // pair all possible 1-to-1 via the core API (then re-render)
  const pairAll = () => page.evaluate(() => {
    const t = window.FriendshipBridgeActivity, C = window.CompareBalanceCore, s = t.cstate;
    const n = Math.min(s.L.length, s.R.length); for (let i = 0; i < n; i++) { if (C.addPair(s, 'L' + i, 'R' + i)) t.pairOrder.push(['L' + i, 'R' + i]); }
    t.render();
  }).then(() => sleep(20));
  const countAll = () => page.evaluate(() => { const t = window.FriendshipBridgeActivity, C = window.CompareBalanceCore, s = t.cstate; s.L.concat(s.R).forEach(id => C.markCounted(s, id)); t.render(); }).then(() => sleep(20));
  const clickPill = (cls) => page.evaluate((c) => { const b = document.querySelector('.fb-pill-' + c); if (b) b.click(); }, cls).then(() => sleep(40));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.FriendshipBridgeActivity; return t && t._activityRow && document.querySelector('.fb-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Friendship Bridge', `header title "${title}"`);

    /* variety/shuffle + ≥7 act-types */
    const N = await page.evaluate(() => window.FriendshipBridgeActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.FriendshipBridgeActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const acts = await page.evaluate(() => new Set(window.FriendshipBridgeActivity._activityRow.params.rounds.map(r => r.actType)).size);
    note(acts >= 7, `only ${acts} distinct act-types`);

    /* PAIR + JUDGE — honest near pair (6 vs 5, more) → Big (left) */
    await force('match-near');
    note(beamTip() && await beamTip() === '', 'beam was not flat at the start of a match round');
    await pairAll();
    // a buddy badge appears for paired discs, and NO glow/pulse class anywhere
    const badges = await page.evaluate(() => document.querySelectorAll('.fb-badge').length);
    note(badges >= 2, 'pairing did not produce buddy badges on the ladder');
    const emph = await page.evaluate(() => document.querySelectorAll('[class*="glow"],[class*="pulse"]').length);
    note(emph === 0, 'a glow/pulse emphasis class is present on the board pre-commit');
    note(await beamTip() === '', 'beam tilted BEFORE the relation was committed (it must stay flat through matching)');
    await clickPill('left'); // Big has more
    note(await solved(), 'committing the correct relation (Big has more) did not solve');
    note(await beamTip() === 'left', 'beam did not tip toward Big after the correct commit');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a solve');

    /* MISLEADING — match-spread (5 spread vs 6 cluster, more) → the answer is the NON-perceptual side (right/Bit) */
    await force('match-spread');
    const fct = await page.evaluate(() => window.CompareBalanceCore.facts(window.FriendshipBridgeActivity.cstate));
    note(fct.misleading && fct.perceptualSide === 'left' && fct.matchSide === 'right', 'match-spread is not the spread-looks-more illusion (perc left, match right)');
    await pairAll();
    await clickPill('left'); // the perceptual (wrong) side
    note(!await solved(), 'the perceptual side wrongly solved a misleading round');
    await clickPill('right'); // the true (count) side
    note(await solved(), 'the true side did not solve the misleading round');

    /* CONSERVATION — 5 spread vs 5 cluster → SAME (despite the spread illusion) */
    await force('conservation');
    // skip the predict gate
    await page.evaluate(() => { window.FriendshipBridgeActivity.phase = 'play'; window.FriendshipBridgeActivity.render(); }); await sleep(20);
    await pairAll();
    await clickPill('left'); note(!await solved(), 'a non-SAME pill solved the conservation round');
    await clickPill('same'); note(await solved(), 'SAME did not solve the conservation round');
    note(await beamTip() === 'same', 'beam did not settle flat (same) on conservation');

    /* COUNT-JUDGE — count-mislead (7 scatter vs 8 cluster) → Bit (right) */
    await force('count-mislead');
    await countAll();
    await clickPill('right'); note(await solved(), 'count-judge (8 vs 7 → Bit) did not solve after counting');

    /* HOW-MANY-MORE — 6 vs 4 → difference 2 */
    await force('how-many-more');
    await pairAll();
    await page.evaluate(() => { const chips = [...document.querySelectorAll('.fb-chip')]; const five = chips.find(c => c.textContent === '5'); if (five) five.click(); }); await sleep(40);
    note(!await solved(), 'a wrong difference (5) solved how-many-more');
    await page.evaluate(() => { const chips = [...document.querySelectorAll('.fb-chip')]; const two = chips.find(c => c.textContent === '2'); if (two) two.click(); }); await sleep(40);
    note(await solved(), 'the correct difference (2) did not solve how-many-more');

    /* MAKE-EQUAL — 3 vs 5 → add 2 to the lonely side */
    await force('make-equal');
    for (let g = 0; g < 6 && !(await solved()); g++) { await page.evaluate(() => { const b = document.querySelector('.fb-add:not(.fb-minus)'); if (b) b.click(); }); await sleep(30); }
    note(await solved(), 'make-equal did not solve after topping up the lonely side');

    /* BUILD-EQUAL — 0 vs 6 → build 6 from scratch */
    await force('build-equal');
    for (let g = 0; g < 8 && !(await solved()); g++) { await page.evaluate(() => { const b = document.querySelector('.fb-add:not(.fb-minus)'); if (b) b.click(); }); await sleep(30); }
    note(await solved(), 'build-equal did not solve after building a matching bunch');

    /* PREDICT-VERIFY — guess, then pair + judge (4 spread vs 6 → Bit) */
    await force('predict-bust');
    note(await page.$('.fb-guess') !== null, 'predict round did not show the guess gate first');
    await page.evaluate(() => { const b = document.querySelector('.fb-guess .fb-pill-left'); if (b) b.click(); }); await sleep(30); // guess Big (the illusion)
    note(await page.evaluate(() => window.FriendshipBridgeActivity.phase) === 'play', 'guessing did not advance to the pairing phase');
    await pairAll();
    await clickPill('right'); note(await solved(), 'predict-verify did not solve on the true side');
    note(await page.evaluate(() => window.FriendshipBridgeActivity.busted) === true, 'a wrong prediction was not flagged busted for the reveal');

    /* FEWER question — fewer-near (5 vs 6, fewer) → Big (left, the smaller) */
    await force('fewer-near');
    await pairAll();
    await clickPill('right'); note(!await solved(), 'the MORE side solved a FEWER question');
    await clickPill('left'); note(await solved(), 'the fewer side (Big) did not solve the FEWER question');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('match-spread'); await sleep(20);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} friendship-bridge/en — "${title}"`);
  } catch (e) {
    fails.push('friendship-bridge/en: ' + e.message);
    console.log(`  FAIL friendship-bridge/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`FRIENDSHIP-BRIDGE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('FRIENDSHIP-BRIDGE LOCAL TEST PASSED — pair→buddy badges; beam stays FLAT through match+judge, tips only after a correct commit; the perceptual side fails a misleading round (the true side solves); conservation→SAME; count-judge/how-many-more/make-equal/build-equal/predict-verify/FEWER all solve; no pre-commit emphasis; ≥7 act-types + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
