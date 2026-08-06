#!/usr/bin/env node
/* =====================================================================
   local-test-track-repair.js — interaction harness for "Whistle Valley —
   Number-Line Track Repair" (CCSS 1.NBT.A.1). Serves `mini tools/` + drives
   the shell:

     • CONTINUOUS PLACE-AT-DISTANCE: place each target tie at valueToPct
       (within ε) → "Send the train!" → repaired (the restored sequence SUNG
       post-commit, spy).
     • SORT-CHEAT FAILS: place the smallest in-range tray values (incl. an
       in-range distractor) at the gap positions → commit → NOT repaired
       (the engine waits + the trolley reshuffles).
     • COMMIT-ONLY / NO ON-DROP FEEDBACK: placing a tie mid-solve does not
       solve or flag anything.
     • RESHUFFLE-ON-WRONG: a wrong commit clears placements + reshuffles.
     • NO sequential audio while solving (a per-tie tap speaks ONE numeral,
       never a sequence); >=1 round reaches >=100; >=7 cogs + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'track-repair.count-to-120.1-nbt-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

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

  const url = `http://127.0.0.1:${PORT}/track-repair-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.TrackRepairActivity; return { solved: a.solved, roundId: a.round && a.round.id, msg: a.msg, nPlaced: Object.keys(a.placements).length, trolley: (a._trolley || []).join(',') }; });
  const aud = () => page.evaluate(() => window.TrackRepairCore.audit(window.TrackRepairActivity.round));
  const placeOracle = () => page.evaluate(() => { const a = window.TrackRepairActivity, C = window.TrackRepairCore, r = a.round; C.targetValues(r).forEach(v => a._placeTie(v, C.valueToPct(v, r.start, r.end))); });
  const placeSort = () => page.evaluate(() => {
    const a = window.TrackRepairActivity, C = window.TrackRepairCore, r = a.round, au = C.audit(r);
    const present = au.present;
    const inRange = au.trolley.filter(v => v >= r.start && v <= r.end && present.indexOf(v) === -1).sort((x, y) => x - y);
    const tgts = au.targets.slice().sort((x, y) => x.value - y.value);
    inRange.slice(0, tgts.length).forEach((v, i) => a._placeTie(v, tgts[i].truePct));
  });
  const clickSend = () => page.evaluate(() => { const b = document.querySelector('.tr-send'); if (b) b.click(); }).then(() => sleep(40));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TrackRepairActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'track-repair.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TrackRepairActivity.round && document.querySelector('.tr-track'), { timeout: 4000 });
    await sleep(30);
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.TrackRepairActivity; return t && t._activityRow && document.querySelector('.tr-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Whistle Valley", `header title "${title}"`);

    /* >=7 cogs + reshuffle + ceiling */
    const N = await page.evaluate(() => window.TrackRepairActivity._pool.length);
    const cogs = await page.evaluate(() => new Set(window.TrackRepairActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const ceiling = await page.evaluate(() => window.TrackRepairActivity._activityRow.params.rounds.some(r => r.end >= 100));
    note(ceiling, 'no round reaches the >=100 ceiling');
    const ids = await page.evaluate((c) => { const t = window.TrackRepairActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* COMMIT-ONLY / NO ON-DROP FEEDBACK: place one tie → nothing solved/flagged */
    await force('skip-10-30');
    await page.evaluate(() => { const a = window.TrackRepairActivity, C = window.TrackRepairCore, r = a.round; a._placeTie(15, C.valueToPct(15, r.start, r.end)); });
    let s = await A(); note(!s.solved, 'placing one tie solved the round (no commit needed?)');
    note(!/all aboard|not yet/i.test(s.msg || ''), 'placing a tie gave on-drop feedback (must be commit-only)');

    /* SORT-CHEAT FAILS on a skip round */
    await force('skip-10-30');
    await placeSort(); await clickSend();
    s = await A(); note(!s.solved, 'the SORT cheat (smallest in-range incl. distractor) was accepted on skip');
    note(/not yet|waiting/i.test(s.msg || ''), `wrong commit did not give the engine-waits message ("${s.msg}")`);

    /* RESHUFFLE-ON-WRONG: a wrong commit clears placements */
    s = await A(); note(s.nPlaced === 0, 'a wrong commit did not clear the placed ties (reshuffle)');

    /* ORACLE place → commit → repaired + the sequence sung */
    await force('skip-10-30');
    await page.evaluate(() => { window.__spoke = []; });
    await placeOracle(); await clickSend();
    s = await A(); note(s.solved, 'placing every target at its true position did not repair the track');
    await sleep(360);
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/10, ?15, ?20, ?25, ?30/.test(spoke), `the restored sequence was not sung post-commit ("${spoke}")`);

    /* NO sequential audio while SOLVING: tapping a tie speaks ONE numeral */
    await force('count-on-47');
    await page.evaluate(() => { window.__spoke = []; const b = document.querySelector('.tr-tie[data-val="48"]'); if (b) b.click(); });
    await sleep(40);
    const tapSpoke = await page.evaluate(() => (window.__spoke || []));
    note(tapSpoke.length <= 1 && (tapSpoke[0] === '48' || tapSpoke.length === 0), `tapping a tie spoke a sequence, not one numeral (${JSON.stringify(tapSpoke)})`);

    /* a dense round (count-on) oracle → repaired + coupled positions */
    await force('count-on-47'); await placeOracle(); await clickSend();
    s = await A(); note(s.solved, 'the count-on oracle did not repair');

    /* shell Check celebrates */
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a repaired track');

    /* mobile overflow 280→768 (skip = the widest trolley) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('skip-10-30'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} track-repair/en — "${title}"`);
  } catch (e) {
    fails.push('track-repair/en: ' + e.message);
    console.log(`  FAIL track-repair/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TRACK-REPAIR LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('TRACK-REPAIR LOCAL TEST PASSED — continuous place-at-distance: placing every target at its true position repairs the track + the restored sequence is SUNG post-commit; the SORT cheat (smallest in-range incl. distractor) is rejected; placing a tie is commit-only (no on-drop feedback); a wrong commit makes the engine WAIT + clears+reshuffles the trolley; tapping a tie speaks ONE numeral (no sequential solving audio); >=1 round reaches >=100; >=7 cogs + reshuffle; shell Check celebrates; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
