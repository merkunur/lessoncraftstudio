#!/usr/bin/env node
/* =====================================================================
   local-test-clock-ampm.js — interaction harness ("Sprocket's Clock — A.M./P.M.")
   Serves `mini tools/` + drives:
     • the everyday-activity scene (sentence + time) + 2 buttons (a.m. sun /
       p.m. moon) + Sprocket render; the shell prompt asks a.m. or p.m.
     • tapping the wrong period does NOT resolve (warm nudge); the correct one
       resolves + shows the ampm-aware note; shell Check hidden until resolved.
     • EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = (process.argv.find(a => a.startsWith('--activity=')) || '').split('=')[1] || 'clock-ampm.morning-or-night.2-md-c-7';
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

  const url = `http://127.0.0.1:${PORT}/clock-ampm-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.ClockAmpmActivity._resolved, miss: !!document.querySelector('.ap-msg.miss') }));
  async function force(idx) {
    await page.evaluate((k0) => {
      const t = window.ClockAmpmActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = Math.min(Math.max(0, k0), n - 1);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, idx);
    await page.waitForFunction(() => window.ClockAmpmActivity._round && document.querySelector('.ap-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tap = (choice) => page.evaluate((c) => { const b = Array.from(document.querySelectorAll('.ap-choice')).find(x => x.getAttribute('data-choice') === c); if (b) b.click(); return !!b; }, choice).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const ampm = () => page.evaluate(() => window.ClockAmpmActivity._round.ampm);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ClockAmpmActivity; return t && t._activityRow && document.querySelector('.ap-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Sprocket's Clock/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.ClockAmpmActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest has en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.ClockAmpmActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ClockAmpmActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    await force(0);
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/a\.m\.|p\.m\./i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const a = document.querySelector('.ap-activity'); return a && a.textContent.trim().length > 0; }), 'the activity scene did not render');
    note(await page.evaluate(() => { const t = document.querySelector('.ap-time'); return t && /\d:\d\d/.test(t.textContent); }), 'the time did not render');
    note(await page.evaluate(() => document.querySelectorAll('.ap-choice').length === 2), 'expected 2 a.m./p.m. buttons');
    note(await page.evaluate(() => document.querySelectorAll('.ap-choice .ap-icon').length === 2), 'expected a sun + a moon icon on the buttons');

    const correct = await ampm();
    const wrong = correct === 'AM' ? 'PM' : 'AM';
    await tap(wrong);
    note(!(await S()).resolved, 'the wrong period resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tap(correct);
    note((await S()).resolved, 'the correct period did not resolve');
    note(await page.evaluate(() => { const m = document.querySelector('.ap-msg'); return m && /a\.m\.|p\.m\./i.test(m.textContent); }), 'the win note did not show');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    await force(4);
    const c2 = await ampm();
    await tap(c2);
    note((await S()).resolved, 'second round did not resolve');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force(6); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} clock-ampm/en — "${title}"`);
  } catch (e) {
    fails.push('clock-ampm/en: ' + e.message);
    console.log(`  FAIL clock-ampm/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`CLOCK-AMPM LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('CLOCK-AMPM LOCAL TEST PASSED — a.m./p.m.: activity scene (sentence + time) + 2 sun/moon buttons + Sprocket; the wrong period does NOT resolve (warm nudge); the correct period resolves + shows the note; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
