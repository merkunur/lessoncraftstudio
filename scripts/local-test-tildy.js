#!/usr/bin/env node
/* =====================================================================
   local-test-tildy.js — interaction harness for "Tildy's Tailor Shop / Ruler
   Lab" (2.MD.A.1). Serves `mini tools/` + drives the shell:

     • ALIGN-READ: place the ruler's 0 at the strip start → Measure it → tap the
       true length → wrapped.
     • OFF-BY-ONE: place the 0 at the 1 → Measure it → NOT solved, reads one
       short, warm (no red), stays placeable.
     • NUDGE-TO-GREEN: committing wrong placements reveals NO proximity signal
       (the message is the same "not at the start", never "closer") → no convergence.
     • SPAN (broken ruler): tap the count spanned.
     • DIAGNOSE: tap the right "what went wrong" + a wrong one is not accepted.
     • SELECT-TOOL: pick a long-enough ruler + a too-short one is not accepted.
     • >=7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'tildy.measure-ruler.2-md-a-1';
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

  const url = `http://127.0.0.1:${PORT}/tildy-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => { const a = window.TildyActivity; return { solved: a.solved, roundId: a.round && a.round.id, phase: a.phase, rulerZero: a.rulerZero, msg: a.msg }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TildyActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'tildy.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TildyActivity.round && document.querySelector('.td-root'), { timeout: 4000 });
    await sleep(40);
  }
  const setZero = (cm) => page.evaluate((c) => window.TildyActivity._setRulerZero(c), cm).then(() => sleep(15));
  const measure = () => page.evaluate(() => window.TildyActivity._measureIt()).then(() => sleep(15));
  const tapVal = (v) => page.evaluate((x) => window.TildyActivity._tapValue(x), v).then(() => sleep(15));
  const diag = (d) => page.evaluate((x) => window.TildyActivity._chooseDiag(x), d).then(() => sleep(15));
  const tool = (L) => page.evaluate((x) => window.TildyActivity._chooseTool(x), L).then(() => sleep(15));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TildyActivity; return t && t._activityRow && document.querySelector('.td-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Tildy's Tailor Shop", `header title "${title}"`);

    /* >=7 distinct + reshuffle */
    const N = await page.evaluate(() => window.TildyActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.TildyActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* ALIGN-READ: ribbon 7 → place 0 at start (0), measure, tap 7 */
    await force('align-ribbon-7');
    note((await S()).rulerZero === 3, 'ribbon: ruler did not start off-zero (Knot nudge)');
    await setZero(0); await measure(); let s = await S();
    note(s.phase === 'read', `ribbon: aligned measure did not enter read phase (phase=${s.phase})`);
    await tapVal(7); s = await S();
    note(s.solved, 'ribbon: tapping 7 (the aligned read) did not wrap');

    /* OFF-BY-ONE: place 0 at the 1 → reads one short, not solved, warm */
    await force('align-ribbon-7');
    await setZero(1); await measure(); s = await S();
    note(!s.solved && s.phase === 'place' && /short/i.test(s.msg || ''), `off-by-one: did not warn/stay (solved=${s.solved} phase=${s.phase} msg="${s.msg}")`);

    /* NUDGE-TO-GREEN: committing wrong placements gives no proximity signal */
    await force('align-leather-5');
    await setZero(2); await measure(); const m2 = (await S()).msg;
    await setZero(3); await measure(); const m3 = (await S()).msg;
    note(!/closer|warmer|almost|nearly/i.test((m2 || '') + (m3 || '')), 'a proximity ("closer/warmer") signal leaked on a wrong commit');
    await setZero(0); await measure(); await tapVal(5); s = await S();
    note(s.solved, 'leather: aligning + reading 5 did not wrap');

    /* SPAN (broken ruler): tap the count spanned (6) */
    await force('span-broken-6'); await tapVal(6); s = await S();
    note(s.solved, 'span: tapping 6 (the spanned count) did not wrap');
    await force('span-broken-6'); await tapVal(7); s = await S();
    note(!s.solved, 'span: tapping 7 (wrong span) was accepted');

    /* DIAGNOSE: the right "what went wrong" + a wrong one */
    await force('diagnose-offby1'); await diag('zero-not-at-start'); s = await S();
    note(s.solved, 'diagnose: the correct diagnosis was not accepted');
    await force('diagnose-offby1'); await diag('ruler-too-short'); s = await S();
    note(!s.solved, 'diagnose: a wrong diagnosis was accepted');

    /* SELECT-TOOL: a long-enough ruler + a too-short one */
    await force('select-tool-11'); await tool(12); s = await S();
    note(s.solved, 'select-tool: the 12-cm ruler (reaches 11) was not accepted');
    await force('select-tool-11'); await tool(6); s = await S();
    note(!s.solved, 'select-tool: the 6-cm ruler (too short) was accepted');

    /* shell Check celebrates after a wrap */
    await force('align-yarn-4'); await setZero(0); await measure(); await tapVal(4);
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a measure');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('align-cord-9'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} tildy/en — "${title}"`);
  } catch (e) {
    fails.push('tildy/en: ' + e.message);
    console.log(`  FAIL tildy/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TILDY LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('TILDY LOCAL TEST PASSED — placing the ruler 0 at the strip start + Measure it + tapping the true length wraps; the off-by-one (0 at the 1) reads one short + stays placeable (warm, no red); committing wrong placements gives NO proximity signal; the broken-ruler span is graded by count; the diagnosis + select-tool grade right/wrong; shell Check celebrates; >=7 distinct rounds + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
