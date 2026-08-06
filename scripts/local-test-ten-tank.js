#!/usr/bin/env node
/* =====================================================================
   local-test-ten-tank.js — interaction harness for "Dewey's Ten-Tank"
   (CCSS K.NBT.A.1). Serves `mini tools/` + drives the real shell:

     • SEAL: tapping the left frame to 10 SEALS (10 dots → one ten chip,
       sealedTenPlaced) and advances to place-ones.
     • THE LIVE 10 + N: placing N ones lights `10 + N = 1N`; the win fires on the
       exact composition.
     • THE 10TH-ONE REFUSAL: a 10th one is refused (charming msg), ones stays 9.
     • COUNT-13-SINGLES IS IMPOSSIBLE: there is no path to place a single in the
       left frame (singleDotPlacedInLeft stays 0).
     • REGROUP: dropping loose ones AUTO-SNAPS the 10th into a ten.
     • READY-TEN comes after a seal; DECOMPOSE separates the ten AS a unit;
       REPAIR picks the missing-count; COMPARE reveals both then judges.
     • ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'ten-tank.ten-frame-tank.k-nbt-a-1';
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

  const url = `http://127.0.0.1:${PORT}/ten-tank-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const stage = () => page.evaluate(() => window.TenTankActivity.stage);
  const solved = () => page.evaluate(() => window.TenTankActivity.solved);
  const trace = () => page.evaluate(() => window.TenFrameTankCore.__TFT_TRACE__(window.TenTankActivity.round, window.TenTankActivity.cstate));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TenTankActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'ten-tank.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TenTankActivity.round && document.querySelector('.tt-root'), { timeout: 4000 });
  }
  const tapReady = () => page.evaluate(() => { const r = document.querySelector('.tt-cell.tt-ready'); if (r) r.click(); }).then(() => sleep(20));
  const fillFrame = async (n) => { for (let i = 0; i < n; i++) await tapReady(); };

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TenTankActivity; return t && t._activityRow && document.querySelector('.tt-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Dewey's Ten-Tank", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.TenTankActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.TenTankActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* SEAL: fill the left frame to 10 → seals → place-ones */
    await force('seal-13');  // target 13 → ten + 3
    note(await stage() === 'build-ten', 'seal round did not start at build-ten');
    await fillFrame(9); note((await trace()).sealedTenPlaced === false, 'sealed before the 10th dot');
    await tapReady();  // 10th → seal
    note((await trace()).sealedTenPlaced === true && await stage() === 'place-ones', 'the 10th dot did not seal + advance to place-ones');
    note((await trace()).singleDotPlacedInLeft === 0, 'a single leaked into the left frame');
    // place 3 ones → win
    await fillFrame(3);
    note(await solved(), 'seal+3 ones did not win 13');
    const eqText = await page.evaluate(() => { const e = document.querySelector('.tt-eq'); return e ? e.textContent.replace(/\s+/g, '') : ''; });
    note(/10\+3=13/.test(eqText), `the live equation did not read 10+3=13 (got "${eqText}")`);
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after the compose');

    /* THE ONES CAP (core rule): a 10th one is refused (the win gates it in the UI,
       but the defensive cap must hold) — drive the real core directly. */
    const capRes = await page.evaluate(() => {
      const Core = window.TenFrameTankCore; const r = { type: 'seal', mode: 'compose', target: 19 }; const s = Core.newState(r, true); Core.seal(s);
      for (let i = 0; i < 9; i++) Core.placeOne(r, s);            // ones → 9
      const res = Core.placeOne(r, s);                            // the 10th → refused
      return { ones: s.ones, rejected: !!res.rejected };
    });
    note(capRes.ones === 9 && capRes.rejected, `the ones cap leaked (ones=${capRes.ones} rejected=${capRes.rejected})`);

    /* REGROUP: loose ones, 10th auto-snaps */
    await force('regroup-12');
    note(await stage() === 'regroup-loose', 'regroup did not start at regroup-loose');
    await fillFrame(9); note((await trace()).sealedTenPlaced === false, 'regroup sealed before the 10th loose');
    await tapReady();  // 10th loose → snap
    note((await trace()).sealedTenPlaced === true && await stage() === 'place-ones', 'the 10th loose did not snap into a ten');
    await fillFrame(2); note(await solved(), 'regroup did not complete 12');

    /* READY-TEN (after a seal happened this session): place + ones */
    await force('ready-15');
    note(await stage() === 'place-ten', 'ready-ten did not start at place-ten');
    await page.click('.tt-tensource'); await sleep(40);
    note(await stage() === 'place-ones' && (await trace()).sealedTenPlaced, 'placing the ready-made ten did not advance');
    await fillFrame(5); note(await solved(), 'ready-ten + 5 did not win 15');

    /* DECOMPOSE: separate the ten + ones (ten AS a unit, no crack) */
    await force('decompose-16');
    note(await stage() === 'separate', 'decompose did not start at separate');
    await page.evaluate(() => { const t = document.querySelector('.tt-dsource .tt-tenchip'); if (t) t.click(); }); await sleep(30);
    note((await trace()).sealedTenPlaced === true, 'the ten cracked during decompose');
    for (let i = 0; i < 6; i++) { await page.evaluate(() => { const o = document.querySelector('.tt-dsource .tt-one'); if (o) o.click(); }); await sleep(15); }
    note(await solved(), 'decompose did not separate 16 into a ten + 6');

    /* REPAIR: pick the correct missing count */
    await force('repair-14');  // preset 2 → need +2
    note(await stage() === 'repair', 'repair did not start at repair');
    const optTexts = await page.evaluate(() => Array.from(document.querySelectorAll('.tt-opt')).map(b => b.textContent));
    note(optTexts.length === 3, `repair did not offer 3 options (got ${optTexts.length})`);
    // pick the right one (+2)
    await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.tt-opt')).find(x => /\+2\b/.test(x.textContent)); if (b) b.click(); }); await sleep(40);
    note(await solved(), 'repair with the correct +2 did not win 14');

    /* COMPARE: reveal both then judge */
    await force('compare-13-18');
    note(await stage() === 'compare', 'compare did not start at compare');
    // judge before revealing → no-op
    await page.evaluate(() => { const j = document.querySelector('.tt-judge'); if (j && !j.disabled) j.click(); }); await sleep(20);
    note(!await solved(), 'compare allowed a judge before revealing both');
    await page.evaluate(() => { document.querySelectorAll('.tt-cmpcard').forEach(c => c.click()); }); await sleep(40);  // reveal both
    note((await page.evaluate(() => window.TenFrameTankCore.canJudge(window.TenTankActivity.cstate))) === true, 'revealing both did not enable judging');
    // pick B (18 > 13)
    await page.evaluate(() => { const cols = document.querySelectorAll('.tt-cmpcol'); const jb = cols[1] && cols[1].querySelector('.tt-judge'); if (jb) jb.click(); }); await sleep(40);
    note(await solved(), 'compare picking the bigger (18) did not win');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('seal-13'); await tapReady();
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} ten-tank/en — "${title}"`);
  } catch (e) {
    fails.push('ten-tank/en: ' + e.message);
    console.log(`  FAIL ten-tank/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TEN-TANK LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('TEN-TANK LOCAL TEST PASSED — seal collapses 10→1 + lights 10+N; the 10th one refused; no single-in-left; regroup auto-snaps the 10th loose; ready-ten after a seal; decompose moves the ten AS a unit; repair picks the missing count; compare reveals-both-then-judges; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
