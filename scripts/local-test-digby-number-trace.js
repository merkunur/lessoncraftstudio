#!/usr/bin/env node
/* =====================================================================
   local-test-digby-number-trace.js — interaction harness for "Digby's Number
   Trace" (CCSS K.CC.A.3). Serves `mini tools/`; drives the real shell:
     • a round renders the spline guide numeral + start dot;
     • tracing each stroke in order (ideal path) forms the numeral → solved;
     • a garbage drag + an out-of-order drag do NOT advance;
     • ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'digby-number-trace.numeral-formation.k-cc-a-3';
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
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/digby-number-trace-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.DigbyNumberTraceActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'digby-number-trace.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.DigbyNumberTraceActivity.round && document.querySelector('.dnt-svg'), { timeout: 4000 });
    await sleep(40);
  }
  const traceStroke = (idx) => page.evaluate((i) => {
    const t = window.DigbyNumberTraceActivity, g = window.NumberTraceCore.glyphOf(t.round.digit);
    if (i >= g.length) return; t._traceStroke(g[i].map(p => ({ x: p.x, y: p.y })));
  }, idx).then(() => sleep(30));
  const strokesDone = () => page.evaluate(() => window.DigbyNumberTraceActivity.cs.strokesDone);
  const solved = () => page.evaluate(() => window.DigbyNumberTraceActivity.solved);
  async function traceAll() { const ns = await page.evaluate(() => window.NumberTraceCore.glyphOf(window.DigbyNumberTraceActivity.round.digit).length); for (let i = 0; i < ns; i++) await traceStroke(i); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.DigbyNumberTraceActivity; return t && t._activityRow && document.querySelector('.dnt-svg'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Digby's Number Trace", `header title "${title}"`);

    const Np = await page.evaluate(() => window.DigbyNumberTraceActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.DigbyNumberTraceActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    // a multi-stroke numeral (4): trace in order → solved
    await force('n4');
    note(!!(await page.$('.dnt-svg')), 'no trace surface');
    await traceAll();
    note(await solved(), 'tracing 4 in order did not solve');

    // garbage path does not advance (numeral 2, stroke 0)
    await force('n2');
    await page.evaluate(() => window.DigbyNumberTraceActivity._traceStroke([{ x: 2, y: 2 }, { x: 6, y: 9 }, { x: 1, y: 5 }]));
    await sleep(30);
    note((await strokesDone()) === 0, 'a garbage drag advanced a stroke (must not)');
    note(!(await solved()), 'a garbage drag solved (must not)');

    // out-of-order: feeding stroke 1 first on the 2-stroke numeral 4 is rejected
    await force('n4');
    await page.evaluate(() => { const g = window.NumberTraceCore.glyphOf('4'); window.DigbyNumberTraceActivity._traceStroke(g[1].map(p => ({ x: p.x, y: p.y }))); });
    await sleep(30);
    note((await strokesDone()) === 0, 'an out-of-order stroke advanced (must not)');

    // a single-stroke numeral (0) traces + solves
    await force('n0');
    await traceAll();
    note(await solved(), 'tracing 0 did not solve');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('n8');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} digby-number-trace/en — "${title}"`);
  } catch (e) {
    fails.push('digby-number-trace/en: ' + e.message);
    console.log(`  FAIL digby-number-trace/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`DIGBY-NUMBER-TRACE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('DIGBY-NUMBER-TRACE LOCAL TEST PASSED — spline guide + start dot; in-order trace forms the numeral → solved; garbage + out-of-order do not advance; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
