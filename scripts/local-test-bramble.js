#!/usr/bin/env node
/* =====================================================================
   local-test-bramble.js — interaction harness for "Bramble's Berry-Juice
   Stand" (K.MD.A.2 · capacity). Serves `mini tools/` + drives the shell:

     • PREDICT-FIRST: the result is unreachable before a commit (playPour
       throws; snapshot leaks no capacity); the shell Check is hidden until
       the round resolves.
     • CORRECT prediction → berry drops + the shell Check serves + Next.
     • WRONG prediction → warm discovery (no red / no "try again"): a berry
       STILL drops, the round resolves, advances.
     • NO PROXIMITY signal (no "warmer/closer") on any commit.
     • SAME-capacity reveal celebrates; WILL-IT-FIT is binary; DESCRIBE adds a
       recall sub-phase; the TRANSFER re-offer is a novel surface of the same
       structure.
     • >=7 distinct rounds + reshuffle; no overflow 280→768.

   Runs with prefers-reduced-motion so the pour resolves synchronously.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'bramble.holds-more.k-md-a-2';
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
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/bramble-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => {
    const a = window.BrambleActivity;
    return { phase: a._phase, committed: a._committed, resolved: a._resolved, berries: a._berries, cog: a._round && a._round.cog, line: (document.querySelector('.bb-line') || {}).textContent || '' };
  });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.BrambleActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'bramble.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.BrambleActivity._round && document.querySelector('.bb-root'), { timeout: 4000 });
    await sleep(30);
  }
  const predict = (opt) => page.evaluate((o) => window.BrambleActivity._onPredict(o), opt).then(() => sleep(40));
  const describe = (opt) => page.evaluate((o) => window.BrambleActivity._onDescribe(o), opt).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => {
    const c = document.querySelector('.lcs-activity-check');
    if (!c) return false;
    const s = getComputedStyle(c);
    return s.display !== 'none' && c.offsetParent !== null;
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.BrambleActivity; return t && t._activityRow && document.querySelector('.bb-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Bramble's Berry-Juice Stand", `header title "${title}"`);

    /* >=7 distinct + reshuffle */
    const N = await page.evaluate(() => window.BrambleActivity._pool.length);
    const ids = await page.evaluate((c) => {
      const t = window.BrambleActivity, out = [];
      for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); }
      return out;
    }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* PREDICT-FIRST: pre-commit, playPour throws + snapshot has no capacity + Check hidden */
    await force('wide-wins-1');
    let s = await S();
    note(s.phase === 'predict' && s.committed == null, `wide-wins did not begin in predict phase (phase=${s.phase})`);
    const preLeak = await page.evaluate(() => {
      const a = window.BrambleActivity, C = window.BrambleCore, r = a._round;
      let threw = false; try { C.playPour(r, null); } catch (e) { threw = true; }
      const snap = JSON.stringify(C.snapshot(r));
      return { threw, leak: /trueCapacity|"level"|trueComparison/.test(snap) };
    });
    note(preLeak.threw, 'predict-first: playPour did NOT throw before a commit');
    note(!preLeak.leak, 'predict-first: snapshot leaked trueCapacity / level pre-commit');
    note(!(await checkVisible()), 'the shell Check is visible BEFORE the round resolves (should be hidden)');

    /* CORRECT prediction → resolves, berry drops, Check appears, celebrates */
    const beforeBerries = (await S()).berries;
    await predict('B_MORE');   /* wide-wins: B(8) > A(5) → B_MORE is correct */
    s = await S();
    note(s.resolved === true, 'wide-wins: a correct prediction did not resolve the round');
    note(s.berries === beforeBerries + 1, `wide-wins: berry did not drop (berries ${beforeBerries}→${s.berries})`);
    note(await checkVisible(), 'wide-wins: the shell Check did not appear after resolving');
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); });
    await sleep(120);
    const celebrated = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(celebrated, 'wide-wins: the shell Check did not celebrate after resolving');

    /* WRONG prediction → warm discovery (no red/try-again), berry STILL drops, resolves */
    await force('tall-less-1');     /* B(9) > A(6) → B_MORE correct; we commit A_MORE (wrong) */
    const b2 = (await S()).berries;
    await predict('A_MORE');
    s = await S();
    note(s.resolved === true, 'tall-less: a WRONG prediction did not resolve (warm-advance-on-miss broken)');
    note(s.berries === b2 + 1, 'tall-less: a wrong prediction did not still drop a berry');
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'tall-less: a wrong prediction showed the shell "try again" state (should be warm, no red)');
    note(/now we know|lied/i.test(s.line), `tall-less: the miss line is not the warm-discovery copy ("${s.line}")`);

    /* NO PROXIMITY signal anywhere */
    note(!/closer|warmer|almost|nearly/i.test(s.line), 'a proximity ("closer/warmer") hint leaked on a miss');

    /* WILL-IT-FIT: binary 2-option; correct FITS resolves */
    await force('fit-1');
    const fitOpts = await page.evaluate(() => document.querySelectorAll('.bb-choice').length);
    note(fitOpts === 2, `will-it-fit did not render exactly 2 options (got ${fitOpts})`);
    await predict('FITS');   /* A(6) <= B(9) → FITS correct */
    note((await S()).resolved === true, 'will-it-fit: a correct FITS did not resolve');

    /* SAME-capacity reveal */
    await force('same-1');
    await predict('A_MORE');   /* truth SAME; any commit resolves the celebration */
    s = await S();
    note(s.resolved === true, 'same-reveal: did not resolve');
    note(/same/i.test(s.line), `same-reveal: the line did not announce SAME ("${s.line}")`);

    /* DESCRIBE: predict → pour → recall sub-phase → resolve */
    await force('describe-1');     /* A(8) > B(5) → A_MORE correct */
    await predict('A_MORE');
    await sleep(60);               /* describe sub-phase appears after the pour */
    let dphase = (await S()).phase;
    note(dphase === 'describe', `describe: did not enter the recall sub-phase after the pour (phase=${dphase})`);
    await describe('A_MORE');
    note((await S()).resolved === true, 'describe: the recall selection did not resolve');

    /* TRANSFER re-offer = novel surface, same structure */
    const xfer = await page.evaluate(() => {
      const p = window.BrambleActivity._pool;
      const t = p.find(r => r.id === 'bramble.transfer-1');
      const src = p.find(r => r.id === (t && t.reofferOf));
      return t && src ? { sameSig: t.structuralSignature === src.structuralSignature, novelSurface: t.surfaceKey !== src.surfaceKey } : null;
    });
    note(xfer && xfer.sameSig && xfer.novelSurface, 'transfer-1 is not a novel surface of its source structure');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('decouple-1'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} bramble/en — "${title}"`);
  } catch (e) {
    fails.push('bramble/en: ' + e.message);
    console.log(`  FAIL bramble/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`BRAMBLE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('BRAMBLE LOCAL TEST PASSED — predict-first (the pour is unreachable pre-commit; the Check is hidden until resolve); a correct prediction drops a berry + the Check serves + celebrates; a WRONG prediction is a warm discovery (no red / no "try again") that STILL drops a berry + resolves; no proximity signal; will-it-fit is binary; same-reveal celebrates; describe adds a recall sub-phase; the transfer is a novel surface of the same structure; >=7 distinct rounds + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
