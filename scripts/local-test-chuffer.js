#!/usr/bin/env node
/* =====================================================================
   local-test-chuffer.js — interaction harness for "Chuffer's Switchyard"
   (CCSS K.OA.A.3). Serves `mini tools/` + drives the real shell:

     • STATE-THE-PARTS: distributing crates + filling N=☐+☐ with the CORRECT
       car-counts + the coupler banks a way; a rung lights in the route-book.
     • MISMATCH: stating WRONG parts → "count again", no bank.
     • DUPLICATE: re-banking the same way → "already knows that route".
     • MIRROR: the commutative swap → a celebrated mirror, NO new rung.
     • COMPLETE: banking the full unordered set opens the station.
     • the make-ten (sealed car) / equation-build / judge-route flows complete.
     • ≥7 distinct act-types + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'chuffer.rail-decompose.k-oa-a-3';
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

  const url = `http://127.0.0.1:${PORT}/chuffer-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.ChufferActivity.solved);
  const ab = () => page.evaluate(() => ({ a: window.ChufferActivity.cstate.a, b: window.ChufferActivity.cstate.b }));
  const manifestSize = () => page.evaluate(() => Object.keys(window.ChufferActivity.cstate.manifest).length);
  const lastResult = () => page.evaluate(() => window.ChufferActivity.cstate.lastResult);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ChufferActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'chuffer.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ChufferActivity.round && document.querySelector('.cf-root'), { timeout: 4000 });
  }
  // arrange the cars to a=targetA (b=whole-targetA) via the shifter, state correctly, couple
  async function setSplit(targetA) {
    let guard = 0;
    while ((await ab()).a !== targetA && guard++ < 20) { const cur = (await ab()).a; await page.evaluate((dir) => { const b = document.querySelector(dir === 'a' ? '.cf-shiftbtn' : '.cf-shift .cf-shiftbtn:last-child'); if (b) b.click(); }, cur < targetA ? 'a' : 'b'); await sleep(20); }
  }
  const stateAndCouple = async (sa, sb) => {
    await page.evaluate((v) => { window.ChufferActivity.statedA = v.a; window.ChufferActivity.statedB = v.b; window.ChufferActivity.picking = null; window.ChufferActivity.render(); }, { a: sa, b: sb });
    await page.evaluate(() => { const c = document.querySelector('.cf-coupler:not(.cf-off)'); if (c) c.click(); }); await sleep(40);
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ChufferActivity; return t && t._activityRow && document.querySelector('.cf-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Chuffer's Switchyard", `header title "${title}"`);

    /* variety/shuffle + ≥7 act-types */
    const N = await page.evaluate(() => window.ChufferActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ChufferActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const acts = await page.evaluate(() => new Set(window.ChufferActivity._activityRow.params.rounds.map(r => r.actType)).size);
    note(acts >= 7, `only ${acts} distinct act-types`);

    /* STATE-THE-PARTS + MISMATCH + DUPLICATE + MIRROR + COMPLETE on N=5 (ways {1,4},{2,3}) */
    await force('decompose-5');
    await setSplit(2);  // a=2,b=3
    // MISMATCH: state wrong (3,2 when actual is 2,3)... actually state a wrong number
    await stateAndCouple(4, 1);  // wrong vs actual 2,3
    note(await lastResult() === 'mismatch' && await manifestSize() === 0, 'stating WRONG parts banked a way (mismatch failed)');
    // CORRECT: state 2,3
    await stateAndCouple(2, 3);
    note(await lastResult() === 'recorded' && await manifestSize() === 1, 'stating the correct parts did not bank the way');
    // DUPLICATE: same again
    await stateAndCouple(2, 3);
    note(await lastResult() === 'duplicate' && await manifestSize() === 1, 're-banking the same way was not a duplicate');
    // MIRROR: swap to 3,2
    await setSplit(3);  // a=3,b=2
    await stateAndCouple(3, 2);
    note(await lastResult() === 'mirror' && await manifestSize() === 1, 'a commutative swap added a rung (must be mirror)');
    // COMPLETE: bank the other way {1,4}
    await setSplit(1);  // a=1,b=4
    await stateAndCouple(1, 4);
    note(await solved(), 'banking the full unordered set did not complete the round');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after completion');

    /* MAKE-TEN (sealed car a=3, partner 7) */
    await force('maketen-3');
    note((await ab()).a === 3 && (await ab()).b === 7, 'make-ten did not seal a=3 / partner 7');
    note(await page.$('.cf-shift') === null, 'make-ten showed a shifter (sealed car must be immovable)');
    await stateAndCouple(3, 7);
    note(await solved(), 'make-ten (state the partner) did not complete');

    /* EQUATION-BUILD (given 2+4 of 6) */
    await force('equation-6');
    await setSplit(2);  // build a=2,b=4
    await stateAndCouple(2, 4);
    note(await solved(), 'equation-build (build 2+4) did not complete');

    /* JUDGE-ROUTE: judge each proposal */
    await force('judge-6');
    for (let g = 0; g < 5; g++) {
      if (await solved()) break;
      const ok = await page.evaluate(() => {
        const t = window.ChufferActivity, r = t.round, prop = r.proposed[t.judgeIdx]; const key = window.RailDecomposeCore.keyOf(prop.a, prop.b);
        const isNew = !t.cstate.manifest[key]; const btn = document.querySelector(isNew ? '.cf-jnew' : '.cf-jgot'); if (btn) { btn.click(); return true; } return false;
      }); await sleep(60); if (!ok) break;
    }
    note(await solved(), 'judge-route (judge each proposal) did not complete');

    /* mobile overflow 280→768 (N=10 worst case) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('decompose-10'); await sleep(20);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} chuffer/en — "${title}"`);
  } catch (e) {
    fails.push('chuffer/en: ' + e.message);
    console.log(`  FAIL chuffer/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`CHUFFER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('CHUFFER LOCAL TEST PASSED — state-the-parts banks a way; WRONG parts → mismatch (no bank); re-bank → duplicate; commutative swap → mirror (no new rung); full set → complete; make-ten (sealed) + equation-build + judge-route complete; ≥7 act-types + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
