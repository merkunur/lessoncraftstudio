#!/usr/bin/env node
/* =====================================================================
   local-test-snippy.js — interaction harness for "Snippy the Sound-Spark
   Snail" (L.K.1.a). Serves `mini tools/` + drives the shell by feeding
   synthetic formation paths to the REAL activity:

     • GUIDED then CERTIFY: tracing each stroke in order at guided advances to the
       graded CERTIFY pass; tracing it again (correct start + order) → bloom.
     • WRONG CERTIFY START demotes: at certify, starting on the SECOND stroke's
       dot → wrong-start → back to guided (no free retry), not solved.
     • OFF-PATH: a garbage path → no advance.
     • CERTIFY HIDES the path: the certify SVG has NO dashed guide path; guided does.
     • the b/d reversal certifies via DISTINCT order.
     • >=7 distinct letters + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'snippy.letter-formation.l-k-1-a';
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

  const url = `http://127.0.0.1:${PORT}/snippy-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => { const a = window.SnippyActivity; return { solved: a.solved, roundId: a.round && a.round.id, level: a.level, strokesDone: a.cs && a.cs.strokesDone, msg: a.msg }; });
  const glyph = (letter) => page.evaluate((l) => window.SnippyCore.glyphOf(l).map(s => s.map(p => ({ x: p.x, y: p.y }))), letter);
  const trace = (startPt, pth) => page.evaluate((sp, p) => window.SnippyActivity._traceStroke(sp, p), startPt, pth).then(() => sleep(12));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SnippyActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'snippy.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SnippyActivity.round && document.querySelector('.sn-root'), { timeout: 4000 });
    await sleep(40);
  }
  /* trace every stroke of the CURRENT letter in order (correct starts + ideal path) */
  async function formCorrect(letter) {
    const strokes = await glyph(letter);
    for (const st of strokes) await trace(st[0], st);
  }
  const certifyHasGuide = () => page.evaluate(() => !!document.querySelector('.sn-svg path[stroke-dasharray]'));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SnippyActivity; return t && t._activityRow && document.querySelector('.sn-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Snippy's Letter Trace", `header title "${title}"`);

    /* >=7 distinct letters + reshuffle */
    const N = await page.evaluate(() => window.SnippyActivity._pool.length);
    const letters = await page.evaluate(() => new Set(window.SnippyActivity._activityRow.params.rounds.map(r => r.letter)).size);
    note(letters >= 7, `expected >=7 distinct letters, got ${letters}`);
    const ids = await page.evaluate((c) => { const t = window.SnippyActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* single-stroke c: guided trace → certify; certify trace → bloom */
    await force('letter-c');
    note((await S()).level === 'guided', 'c did not start at guided');
    await formCorrect('c'); let s = await S();
    note(s.level === 'certify' && !s.solved, `c: after guided, level=${s.level} solved=${s.solved} (want certify, not solved)`);
    note(!(await certifyHasGuide()), 'c: the CERTIFY pass still shows the dashed guide path (must be hidden)');
    await formCorrect('c'); s = await S();
    note(s.solved, 'c: certify formation did not bloom');

    /* GUIDED shows the dashed guide path (the levels differ) */
    await force('letter-t');
    note(await certifyHasGuide(), 't: the GUIDED pass does not show the dashed guide path (no scaffold)');

    /* multi-stroke t: guided → certify → bloom */
    await force('letter-t'); await formCorrect('t'); s = await S();
    note(s.level === 'certify', `t: after guided, level=${s.level}`);
    await formCorrect('t'); s = await S();
    note(s.solved, 't: certify formation (correct order) did not bloom');

    /* WRONG CERTIFY START demotes: t, at certify, start on the 2nd stroke's dot */
    await force('letter-t'); await formCorrect('t');   /* → certify */
    const tg = await glyph('t');
    await trace(tg[1][0], tg[1]);   /* the cross-stroke start, used FIRST = wrong order */
    s = await S();
    note(s.level === 'guided' && !s.solved && /peek|dot/i.test(s.msg || ''), `t: a wrong certify start did not demote (level=${s.level} solved=${s.solved} msg="${s.msg}")`);

    /* OFF-PATH: c guided, garbage path → no advance */
    await force('letter-c');
    const cg = await glyph('c');
    await trace(cg[0][0], [{ x: 0, y: 0 }, { x: 2, y: 3 }, { x: 1, y: 6 }]); s = await S();
    note(s.strokesDone === 0 && s.level === 'guided', `c: a garbage path advanced (strokesDone=${s.strokesDone})`);

    /* the b/d reversal both certify (distinct order) */
    for (const L of ['letter-b', 'letter-d']) { await force(L); await formCorrect(L.slice(-1)); await formCorrect(L.slice(-1)); s = await S(); note(s.solved, `${L}: did not certify`); }

    /* shell Check celebrates after a bloom */
    await force('letter-i'); await formCorrect('i'); await formCorrect('i');
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a formation');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('letter-a'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} snippy/en — "${title}"`);
  } catch (e) {
    fails.push('snippy/en: ' + e.message);
    console.log(`  FAIL snippy/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SNIPPY LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SNIPPY LOCAL TEST PASSED — tracing each stroke in order at GUIDED advances to the graded CERTIFY pass, where the dashed guide path is HIDDEN (guided shows it); forming correctly at certify blooms; a wrong certify start DEMOTES to a re-peek (no free retry, not solved); a garbage path does not advance; the b/d reversal both certify via distinct order; shell Check celebrates; >=7 distinct letters + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
