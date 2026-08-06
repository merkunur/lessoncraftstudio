#!/usr/bin/env node
/* =====================================================================
   local-test-mamas-roll-call.js — interaction harness for "Mama's Roll Call"
   (CCSS K.CC.B.5). Serves `mini tools/` + drives the real shell:

     • COUNT-OUT→SIGN→SEAL: send exactly N (NO counter/seal appears mid-send) →
       Sign → form the numeral → commit SEALS + the roll-book fills.
     • NO REACTION DURING COUNT-OUT: solved stays false through the whole send;
       no numeral counter of the sent set is shown.
     • FORM-WITHOUT-SEND: signing + forming with 0 sent → mismatch (no seal) +
       a non-directional re-do (fresh raft).
     • WRONG COUNT: sending N−1 → mismatch.
     • 0-CASE: send zero → form "0" → seal.
     • DISTRACT: sending a wrong-KIND duck blocks the seal.
     • MATCH-SET (group target) / COUNT-SET / RUNNING-TOTAL / SCATTER seal.
     • ≥7 act-types + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mamas-roll-call.numeral-trace.k-cc-b-5';
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

  const url = `http://127.0.0.1:${PORT}/mamas-roll-call-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.MamasRollCallActivity.solved);
  const stage = () => page.evaluate(() => window.MamasRollCallActivity.cstate.stage);
  const sentCount = () => page.evaluate(() => window.MamasRollCallActivity.cstate.sent.length);
  const clickSel = (sel) => page.evaluate((s) => { const b = document.querySelector(s); if (b) { b.click(); return true; } return false; }, sel).then(() => sleep(30));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MamasRollCallActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'mamas-roll-call.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MamasRollCallActivity.round && document.querySelector('.rc-root'), { timeout: 4000 });
  }
  // send N ducks of `kind` (or any) via the raft DOM, re-querying each time
  async function sendN(n, kind) {
    for (let i = 0; i < n; i++) {
      const ok = await page.evaluate((kd) => {
        const ducks = [...document.querySelectorAll('.rc-raft .rc-duck')];
        const d = kd ? ducks.find(x => (x.getAttribute('aria-label') || '').indexOf(kd) === 0 || (x.getAttribute('aria-label') || '').indexOf(kd) >= 0) : ducks[0];
        if (d) { d.click(); return true; } return false;
      }, kind); await sleep(20); if (!ok) break;
    }
  }
  // count all brood (forward acts), handling running-total batches
  async function countAllBrood() {
    let guard = 0;
    while (guard++ < 20) {
      await page.evaluate(() => { document.querySelectorAll('.rc-bench .rc-duck:not(.rc-counted)').forEach(d => d.click()); });
      await sleep(25);
      const more = await page.$('.rc-more');
      if (more) { await clickSel('.rc-more'); } else break;
    }
    await page.evaluate(() => { document.querySelectorAll('.rc-bench .rc-duck:not(.rc-counted)').forEach(d => d.click()); }); await sleep(25);
  }
  const goSign = () => clickSel('.rc-sign:not(.rc-off)');
  async function formAll() { let g = 0; while (g++ < 4 && await stage() === 'sign' && !(await solved())) { const ok = await clickSel('.rc-stroke-next'); if (!ok) break; } }
  async function solve(id) {
    await force(id);
    const isProd = await page.evaluate(() => window.NumeralTraceCore.isProductionAct(window.MamasRollCallActivity.round));
    const n = await page.evaluate(() => window.MamasRollCallActivity.cstate.call.n);
    const kind = await page.evaluate(() => window.MamasRollCallActivity.round.call.kind || null);
    if (isProd) await sendN(n, kind); else await countAllBrood();
    await goSign(); await formAll();
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.MamasRollCallActivity; return t && t._activityRow && document.querySelector('.rc-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Mama's Roll Call", `header title "${title}"`);

    /* variety/shuffle + ≥7 act-types */
    const N = await page.evaluate(() => window.MamasRollCallActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.MamasRollCallActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const acts = await page.evaluate(() => new Set(window.MamasRollCallActivity._activityRow.params.rounds.map(r => r.act_type)).size);
    note(acts >= 7, `only ${acts} distinct act-types`);

    /* COUNT-OUT→SIGN→SEAL + NO REACTION DURING COUNT-OUT (swim-six, n=6) */
    await force('swim-six');
    await sendN(3);
    note(await sentCount() === 3 && !(await solved()), 'mid-send: not 3 sent / already solved (a reaction fired during count-out)');
    const noCounter = await page.evaluate(() => !document.querySelector('.rc-counter') && document.querySelectorAll('.rc-call-n').length <= 1);
    note(noCounter, 'a sent-count numeral counter is shown during count-out (must have none)');
    await sendN(3); // total 6
    await goSign();
    note(await stage() === 'sign', 'Sign nav did not advance to the sign stage');
    await formAll();
    note(await solved(), 'sending exactly 6 + forming the numeral did not seal the roll');
    await clickSel('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a sealed roll');

    /* FORM-WITHOUT-SEND → mismatch + fresh re-do */
    await force('swim-eight');
    await goSign(); await formAll();
    note(!(await solved()), 'forming the numeral with NOTHING sent sealed the roll (set production not load-bearing)');
    note(await stage() === 'count-out' && await sentCount() === 0, 'a mismatch did not reset to a fresh count-out raft');

    /* WRONG COUNT (send n-1) → mismatch */
    await force('swim-six'); await sendN(5); await goSign(); await formAll();
    note(!(await solved()), 'sending 5 when 6 were called still sealed');

    /* 0-CASE (none-sleep) → send zero, form "0" */
    await force('none-sleep'); await goSign(); await formAll();
    note(await solved(), 'the zero roll did not seal by sending none + forming "0"');

    /* DISTRACT (yellow-six): a wrong-kind send blocks the seal */
    await force('yellow-six');
    await sendN(1, 'brown'); await sendN(5, 'yellow'); await goSign(); await formAll();
    note(!(await solved()), 'a brown (wrong-kind) duck in the sent set still sealed the roll');
    // now the correct way
    await solve('yellow-six');
    note(await solved(), 'sending 6 of the called kind did not seal the distract roll');

    /* MATCH-SET (group target) */
    await solve('match-seven');
    note(await solved(), 'match-set (send one per lily-pad) did not seal');

    /* COUNT-SET (forward) */
    await solve('count-brood');
    note(await solved(), 'count-set (count the brood) did not seal');

    /* RUNNING-TOTAL (batches) */
    await solve('they-arrive');
    note(await solved(), 'running-total (count across arriving batches) did not seal');

    /* SCATTER-OUT */
    await solve('scatter-six');
    note(await solved(), 'scatter-out did not seal');

    /* mobile overflow 280→768 (the raft-of-10 + the sign channel) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('match-nine'); await sleep(25);
      const over1 = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over1 <= 2, `count-out horizontal overflow ${over1}px at ${w}px`);
      await page.evaluate(() => { window.NumeralTraceCore.goToSign(window.MamasRollCallActivity.cstate); window.MamasRollCallActivity.render(); }); await sleep(20);
      const over2 = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over2 <= 2, `sign horizontal overflow ${over2}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} mamas-roll-call/en — "${title}"`);
  } catch (e) {
    fails.push('mamas-roll-call/en: ' + e.message);
    console.log(`  FAIL mamas-roll-call/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MAMAS-ROLL-CALL LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('MAMAS-ROLL-CALL LOCAL TEST PASSED — count-out→sign→seal (no counter/seal mid-send); form-without-send → mismatch + fresh re-do; wrong count → mismatch; 0-case seals; a wrong-kind send blocks the seal; match-set/count-set/running-total/scatter seal; ≥7 act-types + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
