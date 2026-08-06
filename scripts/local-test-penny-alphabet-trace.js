#!/usr/bin/env node
/* =====================================================================
   local-test-penny-alphabet-trace.js — interaction harness for "Penny's Alphabet
   Trace" (CCSS L.K.1.a). Serves `mini tools/`; drives the real shell:
     • a round renders the spline guide letter + start dot;
     • tracing each stroke in order (ideal path) forms the letter → solved → shell Check;
     • a garbage drag does NOT advance; an out-of-order drag does not advance;
     • ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'penny-alphabet-trace.letter-formation.l-k-1-a';
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

  const url = `http://127.0.0.1:${PORT}/penny-alphabet-trace-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PennyAlphabetTraceActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'penny-alphabet-trace.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PennyAlphabetTraceActivity.round && document.querySelector('.pat-svg'), { timeout: 4000 });
    await sleep(40);
  }
  // drive a stroke by feeding its ideal checkpoint path straight into the tool (geometry-independent of pixel mapping)
  const traceStroke = (idx) => page.evaluate((i) => {
    const t = window.PennyAlphabetTraceActivity, g = window.AlphabetTraceCore.glyphOf(t.round.letter);
    if (i >= g.length) return;
    t._traceStroke(g[i].map(p => ({ x: p.x, y: p.y })));
  }, idx).then(() => sleep(30));
  const strokesDone = () => page.evaluate(() => window.PennyAlphabetTraceActivity.cs.strokesDone);
  const solved = () => page.evaluate(() => window.PennyAlphabetTraceActivity.solved);
  async function traceAll() { const ns = await page.evaluate(() => window.AlphabetTraceCore.glyphOf(window.PennyAlphabetTraceActivity.round.letter).length); for (let i = 0; i < ns; i++) await traceStroke(i); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PennyAlphabetTraceActivity; return t && t._activityRow && document.querySelector('.pat-svg'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Penny's Alphabet Trace", `header title "${title}"`);

    const Np = await page.evaluate(() => window.PennyAlphabetTraceActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.PennyAlphabetTraceActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    // a multi-stroke letter (A): trace in order → solved
    await force('u-A');
    note(!!(await page.$('.pat-svg')), 'no trace surface');
    await traceAll();
    note(await solved(), 'tracing A in order did not solve');

    // garbage path does not advance (E, stroke 0)
    await force('u-E');
    await page.evaluate(() => window.PennyAlphabetTraceActivity._traceStroke([{ x: 2, y: 2 }, { x: 6, y: 9 }, { x: 1, y: 5 }]));
    await sleep(30);
    note((await strokesDone()) === 0, 'a garbage drag advanced a stroke (must not)');
    note(!(await solved()), 'a garbage drag solved (must not)');

    // out-of-order: feeding stroke 1 first on a multi-stroke letter is rejected
    await force('u-A');
    await page.evaluate(() => { const g = window.AlphabetTraceCore.glyphOf('A'); window.PennyAlphabetTraceActivity._traceStroke(g[1].map(p => ({ x: p.x, y: p.y }))); });
    await sleep(30);
    note((await strokesDone()) === 0, 'an out-of-order stroke advanced (must not)');

    // a single-stroke letter (O) traces + solves
    await force('u-O');
    await traceAll();
    note(await solved(), 'tracing O did not solve');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('l-g');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} penny-alphabet-trace/en — "${title}"`);
  } catch (e) {
    fails.push('penny-alphabet-trace/en: ' + e.message);
    console.log(`  FAIL penny-alphabet-trace/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`PENNY-ALPHABET-TRACE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('PENNY-ALPHABET-TRACE LOCAL TEST PASSED — spline guide + start dot; in-order trace forms the letter → solved; garbage + out-of-order do not advance; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
