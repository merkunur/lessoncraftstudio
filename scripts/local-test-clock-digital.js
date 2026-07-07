#!/usr/bin/env node
/* =====================================================================
   local-test-clock-digital.js — interaction harness ("Sprocket's Clock",
   read analog → digital). Serves `mini tools/` + drives:
     • the analog clock SVG (face + 12 numerals + 2 hands) + 3 digital cards +
       Sprocket render; the shell prompt asks the time.
     • tapping a wrong digital time does NOT resolve (warm nudge); tapping the
       matching time resolves + shows the note; shell Check hidden until resolved.
     • EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = (process.argv.find(a => a.startsWith('--activity=')) || '').split('=')[1] || 'clock-digital.read-hour.1-md-b-3';
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

  const url = `http://127.0.0.1:${PORT}/clock-digital-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.ClockDigitalActivity._resolved, miss: !!document.querySelector('.cd-msg.miss') }));
  async function force(idx) {
    await page.evaluate((k0) => {
      const t = window.ClockDigitalActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = Math.min(Math.max(0, k0), n - 1);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, idx);
    await page.waitForFunction(() => window.ClockDigitalActivity._round && document.querySelector('.cd-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapOi = (oi) => page.evaluate((i) => { const b = Array.from(document.querySelectorAll('.cd-choice')).find(x => +x.getAttribute('data-oi') === i); if (b) b.click(); return !!b; }, oi).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  /* current (forced-to-front) round's oracle / a wrong option, from the live _round */
  const oracleOi = () => page.evaluate(() => { const t = window.ClockDigitalActivity, C = window.ClockDigitalCore; return C.oracle(t._round); });
  const nonOi = () => page.evaluate(() => { const t = window.ClockDigitalActivity, C = window.ClockDigitalCore, r = t._round; for (let i = 0; i < r.options.length; i++) if (!C.isAnswer(r, i)) return i; return -1; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ClockDigitalActivity; return t && t._activityRow && document.querySelector('.cd-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Sprocket's Clock/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.ClockDigitalActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);  // read-hour/read-half-hour/read-quarter are now FR-fanned (multi-locale); the invariant is en-present, not en-only

    const N = await page.evaluate(() => window.ClockDigitalActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ClockDigitalActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    await force(0);
    const direction = await page.evaluate(() => (window.ClockDigitalActivity._activityRow.params || {}).direction || 'analog-to-digital');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/time|clock/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.cd-choice').length === 3), 'expected 3 choice cards');
    if (direction === 'digital-to-analog') {
      note(await page.evaluate(() => { const r = document.querySelector('.cd-readout'); return r && /\d:\d\d/.test(r.textContent); }), 'the digital readout stimulus did not render');
      note(await page.evaluate(() => document.querySelectorAll('.cd-choice.cd-clockcard').length === 3), 'expected 3 analog-clock cards');
      note(await page.evaluate(() => Array.from(document.querySelectorAll('.cd-choice')).every(b => b.querySelector('.cd-clock'))), 'a clock card has no analog clock');
      note(await page.evaluate(() => document.querySelectorAll('.cd-choice .cd-clock text').length === 36), 'expected 12 numerals × 3 clock cards');
    } else {
      note(await page.evaluate(() => !!document.querySelector('.cd-clock')), 'the analog clock did not render');
      note(await page.evaluate(() => document.querySelectorAll('.cd-clock text').length === 12), 'expected 12 clock numerals');
      note(await page.evaluate(() => document.querySelectorAll('.cd-clock line').length >= 14), 'expected ticks + 2 hands');
      note(await page.evaluate(() => Array.from(document.querySelectorAll('.cd-choice')).some(b => /\d:\d\d/.test(b.textContent))), 'digital cards have no time text');
    }

    const non = await nonOi();
    await tapOi(non);
    note(!(await S()).resolved, 'a wrong time resolved');
    note((await S()).miss, 'wrong gave no nudge');
    const oi = await oracleOi();
    await tapOi(oi);
    note((await S()).resolved, 'the matching time did not resolve');
    note(await page.evaluate(() => { const m = document.querySelector('.cd-msg'); return m && /\b(o'clock|half past|quarter|\d:\d\d)\b/i.test(m.textContent); }), 'the win note did not show');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    await force(4);
    const o2 = await oracleOi();
    await tapOi(o2);
    note((await S()).resolved, 'second round did not resolve');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force(8); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} clock-digital/en — "${title}"`);
  } catch (e) {
    fails.push('clock-digital/en: ' + e.message);
    console.log(`  FAIL clock-digital/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`CLOCK-DIGITAL LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('CLOCK-DIGITAL LOCAL TEST PASSED — read analog→digital: clock face (12 numerals + ticks + 2 hands) + 3 digital cards + Sprocket render; a wrong time does NOT resolve (warm nudge); the matching time resolves + shows the note; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
