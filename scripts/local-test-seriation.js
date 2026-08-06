#!/usr/bin/env node
/* =====================================================================
   local-test-seriation.js — interaction harness (1.MD.A.1 order/indirect
   length-compare, clarity-first redesign of #69). Serves `mini tools/` + drives
   the DOM:

     • tapping a wrong chip does NOT resolve (warm cord nudge, no advance);
       tapping the per-mode oracle chip resolves; shell Check hidden until
       resolved.
     • the cord reference + 3 ribbon shelves + 3 color chips render; the shell
       prompt carries the longest/shortest/samecord question; no stored answer;
       EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'seriation.compare-length.1-md-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

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

  const url = `http://127.0.0.1:${PORT}/seriation-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.SeriationActivity._resolved, miss: !!document.querySelector('.sr-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SeriationActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SeriationActivity._round && document.querySelector('.sr-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapCi = (i) => page.evaluate((idx) => { const b = Array.from(document.querySelectorAll('.sr-cand')).find(x => +x.getAttribute('data-ci') === idx); if (b) b.click(); return !!b; }, i).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleCi = (id) => page.evaluate((rid) => {
    const t = window.SeriationActivity, r = t._pool.find(x => x.id === rid), C = window.SeriationCore;
    return C.oracle(r);
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SeriationActivity; return t && t._activityRow && document.querySelector('.sr-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Faraway Shelf', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.SeriationActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.SeriationActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.SeriationActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const modes = await page.evaluate(() => Array.from(new Set(window.SeriationActivity._pool.map(r => r.mode))));
    note(modes.length >= 2, `<2 modes: ${modes.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.SeriationActivity._pool.every(r => r.correct == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* a LONGEST round: prompt + scene + chips render; wrong no-advance; correct resolves */
    await force('fs-l1');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/longest/i.test(prompt), `longest-round prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.sr-scene .sr-row').length === 4), 'scene rows (cord + 3 shelves) did not render');
    note(await page.evaluate(() => document.querySelectorAll('.sr-cand').length === 3), 'the 3 color chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.sr-cord-flag')), 'the cord reference did not render');

    let oi = await oracleCi('fs-l1');
    await tapCi((oi + 1) % 3);   // a wrong chip
    note(!(await S()).resolved, 'a wrong chip resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapCi(oi);
    note((await S()).resolved, 'the correct chip did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a SAMECORD round (the indirect-comparison heart) */
    await force('fs-c1');
    const promptC = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/cord/i.test(promptC), `samecord-round prompt wrong: "${promptC}"`);
    oi = await oracleCi('fs-c1');
    await tapCi(oi);
    note((await S()).resolved, 'samecord round: correct did not resolve');

    /* a SHORTEST round */
    await force('fs-s1');
    oi = await oracleCi('fs-s1');
    await tapCi(oi);
    note((await S()).resolved, 'shortest round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('fs-l3'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} seriation/en — "${title}"`);
  } catch (e) {
    fails.push('seriation/en: ' + e.message);
    console.log(`  FAIL seriation/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`SERIATION LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('SERIATION LOCAL TEST PASSED — order/indirect length-compare: a wrong chip does NOT resolve (warm cord nudge, no advance); the per-mode oracle chip resolves; cord reference + 3 ribbon shelves + 3 color chips render; the shell prompt carries the longest/shortest/samecord question; shell Check hides until resolved; no stored answer; EN-only; ≥2 modes + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
