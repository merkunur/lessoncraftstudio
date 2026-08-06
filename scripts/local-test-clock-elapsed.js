#!/usr/bin/env node
/* =====================================================================
   local-test-clock-elapsed.js — interaction harness ("Sprocket's Clock —
   Elapsed Time"). Serves `mini tools/` + drives:
     • the START analog clock (face + 12 numerals + 2 hands) + a duration line +
       3 digital answer cards + Sprocket render; the shell prompt asks the time.
     • tapping a wrong end-time does NOT resolve (warm nudge); tapping the
       computed end resolves + shows the note; shell Check hidden until resolved.
     • EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = (process.argv.find(a => a.startsWith('--activity=')) || '').split('=')[1] || 'clock-elapsed.what-time.3-md-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
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

  const url = `http://127.0.0.1:${PORT}/clock-elapsed-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.ClockElapsedActivity._resolved, miss: !!document.querySelector('.ce-msg.miss') }));
  async function force(idx) {
    await page.evaluate((k0) => {
      const t = window.ClockElapsedActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = Math.min(Math.max(0, k0), n - 1);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, idx);
    await page.waitForFunction(() => window.ClockElapsedActivity._round && document.querySelector('.ce-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapOi = (oi) => page.evaluate((i) => { const b = Array.from(document.querySelectorAll('.ce-choice')).find(x => +x.getAttribute('data-oi') === i); if (b) b.click(); return !!b; }, oi).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleOi = () => page.evaluate(() => { const t = window.ClockElapsedActivity, C = window.ClockElapsedCore; return C.oracle(t._round); });
  const nonOi = () => page.evaluate(() => { const t = window.ClockElapsedActivity, C = window.ClockElapsedCore, r = t._round; for (let i = 0; i < r.options.length; i++) if (!C.isAnswer(r, i)) return i; return -1; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ClockElapsedActivity; return t && t._activityRow && document.querySelector('.ce-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Sprocket's Clock/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.ClockElapsedActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en base slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.ClockElapsedActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ClockElapsedActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    await force(0);
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/minutes/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.ce-clock')), 'the start analog clock did not render');
    note(await page.evaluate(() => document.querySelectorAll('.ce-clock text').length === 12), 'expected 12 clock numerals');
    note(await page.evaluate(() => document.querySelectorAll('.ce-clock line').length >= 14), 'expected ticks + 2 hands');
    note(await page.evaluate(() => document.querySelectorAll('.ce-choice').length === 3), 'expected 3 answer cards');
    note(await page.evaluate(() => Array.from(document.querySelectorAll('.ce-choice')).every(b => /\d:\d\d/.test(b.textContent))), 'answer cards have no time text');

    const non = await nonOi();
    await tapOi(non);
    note(!(await S()).resolved, 'a wrong end-time resolved');
    note((await S()).miss, 'wrong gave no nudge');
    const oi = await oracleOi();
    await tapOi(oi);
    note((await S()).resolved, 'the computed end-time did not resolve');
    note(await page.evaluate(() => { const m = document.querySelector('.ce-msg'); return m && /\d:\d\d [+−] \d+ min = \d:\d\d/.test(m.textContent); }), 'the win note did not show');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    await force(4);
    const o2 = await oracleOi();
    await tapOi(o2);
    note((await S()).resolved, 'second round did not resolve');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force(7); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} clock-elapsed/en — "${title}"`);
  } catch (e) {
    fails.push('clock-elapsed/en: ' + e.message);
    console.log(`  FAIL clock-elapsed/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`CLOCK-ELAPSED LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('CLOCK-ELAPSED LOCAL TEST PASSED — elapsed time: start clock (12 numerals + ticks + 2 hands) + duration line + 3 digital answer cards + Sprocket; a wrong end-time does NOT resolve (warm nudge); the computed end resolves + shows the note; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
