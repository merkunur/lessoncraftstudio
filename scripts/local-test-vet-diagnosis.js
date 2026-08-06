#!/usr/bin/env node
/* =====================================================================
   local-test-vet-diagnosis.js — interaction harness for "Vet's Diagnosis
   Window" (CCSS 1.OA.A.1). Serves `mini tools/` + drives the shell:

     • MODEL→DIAL ORACLE: place each known tile in its iconic role-slot, mark
       the unknown "?", LEAVE the decoy in the tray → the 0-20 dial appears →
       dial the derived answer → Diagnose → the x-ray CLEARS (solved).
     • THE KEYPAD IS GATED: it does NOT appear until the model is fully bound.
     • NUMBER MATTERS: correct binding + the keyword number (sum) → NOT solved.
     • BINDING MATTERS: a magnitude binding on a breaking cell + the true
       answer → NOT solved (the binding is graded, not just the number).
     • NO ON-DROP FEEDBACK: placing a tile mid-solve evaluates nothing.
     • RESHUFFLE-ON-WRONG: a wrong Diagnose clears the binding + the dial +
       reshuffles the tray (anti-brute-force).
     • the story is SPOKEN (whole sentence, not isolated words); the decoy is
       left unbound; >=7 cogs + reshuffle; shell Check celebrates; no overflow
       280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'vet-diagnosis.word-problems.1-oa-a-1';
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

  const url = `http://127.0.0.1:${PORT}/vet-diagnosis-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.VetDiagnosisActivity; return { solved: a.solved, roundId: a.round && a.round.id, dialed: a.dialed, nBound: Object.keys(a.binding).filter(k => a.binding[k] != null).length }; });
  const hasKeypad = () => page.evaluate(() => !!document.querySelector('.vd-keypad'));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.VetDiagnosisActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'vet-diagnosis.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.VetDiagnosisActivity.round && document.querySelector('.vd-diagram'), { timeout: 4000 });
    await sleep(40);
  }
  /* drive the REAL taps to the correct binding (decoy left in the tray). */
  const bindOracleByTaps = () => page.evaluate(() => {
    const a = window.VetDiagnosisActivity, au = window.VetDiagnosisCore.audit(a.round);
    a.snap.roles.forEach(role => {
      const tileId = au.correct[role];
      if (tileId === '?') { a._tapSlot(role); }            /* mark the mystery */
      else { a._tapTile(tileId); a._tapSlot(role); }       /* select tile → place in slot */
    });
  });
  const setBinding = (mapFn) => page.evaluate((src) => {
    const a = window.VetDiagnosisActivity, C = window.VetDiagnosisCore, au = C.audit(a.round);
    /* eslint-disable no-new-func */
    const map = (new Function('au', 'C', 'a', 'return (' + src + ')(au,C,a);'))(au, C, a);
    a.binding = map; a.render();
  }, mapFn.toString());
  const dial = (n) => page.evaluate((v) => { window.VetDiagnosisActivity._dial(v); }, n);
  const diagnose = () => page.evaluate(() => { window.VetDiagnosisActivity._diagnose(); }).then(() => sleep(40));
  const answer = () => page.evaluate(() => window.VetDiagnosisCore.audit(window.VetDiagnosisActivity.round).answer);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.VetDiagnosisActivity; return t && t._activityRow && document.querySelector('.vd-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Vet's Diagnosis Window", `header title "${title}"`);

    /* >=7 cogs + reshuffle + result capped */
    const N = await page.evaluate(() => window.VetDiagnosisActivity._pool.length);
    const cogs = await page.evaluate(() => new Set(window.VetDiagnosisActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const resultCount = await page.evaluate(() => window.VetDiagnosisActivity._activityRow.params.rounds.filter(r => r.cog === 'result').length);
    note(resultCount <= 2, `result on-ramp not capped (${resultCount})`);
    const ids = await page.evaluate((c) => { const t = window.VetDiagnosisActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* THE KEYPAD IS GATED + NO ON-DROP FEEDBACK: bind one tile only */
    await force('addto-change-acorns');
    note(!(await hasKeypad()), 'the keypad appeared before the model was fully bound');
    await page.evaluate(() => { const a = window.VetDiagnosisActivity, au = window.VetDiagnosisCore.audit(a.round); const role = a.snap.roles.find(r => au.correct[r] !== '?'); a._tapTile(au.correct[role]); a._tapSlot(role); });
    let s = await A(); note(!s.solved, 'placing one tile solved the round (no commit needed?)');
    note(!(await hasKeypad()), 'the keypad appeared after only a partial binding');

    /* MODEL→DIAL ORACLE → solved + x-ray clears + the story was spoken */
    await force('addto-change-acorns');
    await page.evaluate(() => { window.__spoke = []; });
    await bindOracleByTaps();
    note(await hasKeypad(), 'the keypad did not appear after the model was fully bound');
    await dial(await answer()); await diagnose();
    s = await A(); note(s.solved, 'the model→dial oracle did not heal the patient');
    const cleared = await page.evaluate(() => !!document.querySelector('.vd-xray.vd-clear'));
    note(cleared, 'the x-ray did not clear on a correct diagnosis');
    await sleep(360);
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/Pip had 5 acorns/.test(spoke), `the story was not spoken as a whole sentence ("${spoke.slice(0, 40)}")`);

    /* NUMBER MATTERS: correct binding + the keyword sum (5+12=17) → NOT solved */
    await force('addto-change-acorns');
    await bindOracleByTaps();
    await dial(17); await diagnose();
    s = await A(); note(!s.solved, 'a correct binding with the WRONG (keyword-sum) number was accepted');

    /* BINDING MATTERS: a magnitude binding on a breaking cell + true answer → NOT solved */
    await force('takefrom-change-ducks');
    /* magnitude: biggest tile → result slot, next → start, decoy stays out, mark change '?' */
    await setBinding(function (au, C, a) {
      const tiles = a.snap.tiles.slice().sort((x, y) => y.value - x.value);
      const m = { change: '?' };
      m.result = tiles[0].id;   /* biggest → the "container" (result) — WRONG for take-from */
      m.start = tiles[1].id;
      return m;
    });
    await dial(await answer()); await diagnose();
    s = await A(); note(!s.solved, 'a MAGNITUDE binding (biggest→result) was accepted on a magnitude-breaking cell');

    /* RESHUFFLE-ON-WRONG: the wrong Diagnose just above cleared the binding */
    s = await A(); note(s.nBound === 0 && s.dialed == null, 'a wrong Diagnose did not clear the binding + dial (reshuffle)');

    /* shell Check celebrates after a healed patient */
    await force('compare-bigger-cats');
    await bindOracleByTaps(); await dial(await answer()); await diagnose();
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a healed patient');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('compare-diff-cats'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} vet-diagnosis/en — "${title}"`);
  } catch (e) {
    fails.push('vet-diagnosis/en: ' + e.message);
    console.log(`  FAIL vet-diagnosis/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`VET-DIAGNOSIS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('VET-DIAGNOSIS LOCAL TEST PASSED — model→dial: placing each known in its iconic role-slot + marking the mystery + dialing the derived answer heals the patient (the x-ray clears) + the story is spoken whole; the keypad is GATED behind a full binding; the WRONG number is rejected even with a correct binding; a MAGNITUDE binding is rejected on a breaking cell (the binding is graded); placing a tile is commit-only (no on-drop feedback); a wrong Diagnose clears the binding + dial + reshuffles; >=7 cogs + reshuffle; result capped; shell Check celebrates; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
