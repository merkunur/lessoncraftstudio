#!/usr/bin/env node
/* =====================================================================
   local-test-two-tales.js — interaction harness (RL.1.9 compare-two-stories,
   clarity-first redesign of #68). Serves `mini tools/` + drives the DOM:

     • tapping a wrong card does NOT resolve (warm re-read nudge, no advance);
       tapping the mode-predicate card resolves; shell Check hidden until
       resolved.
     • the two tale panels + 3 statement cards + Hear-it render; the shell
       prompt carries the same/only-one question; no stored answer; EN-only;
       ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'two-tales.compare.rl-1-9';
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

  const url = `http://127.0.0.1:${PORT}/two-tales-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.TwoTalesActivity._resolved, miss: !!document.querySelector('.tt-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TwoTalesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TwoTalesActivity._round && document.querySelector('.tt-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapCi = (i) => page.evaluate((idx) => { const b = Array.from(document.querySelectorAll('.tt-cand')).find(x => +x.getAttribute('data-ci') === idx); if (b) b.click(); return !!b; }, i).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleCi = (id) => page.evaluate((rid) => {
    const t = window.TwoTalesActivity, r = t._pool.find(x => x.id === rid), C = window.TwoTalesCore;
    return C.oracle(r, t._stories);
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TwoTalesActivity; return t && t._activityRow && document.querySelector('.tt-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Two Moons', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.TwoTalesActivity._activityRow.slug));
    note(slugKeys.indexOf('en') >= 0, `manifest slug missing en base: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.TwoTalesActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.TwoTalesActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const modes = await page.evaluate(() => Array.from(new Set(window.TwoTalesActivity._pool.map(r => r.mode))));
    note(modes.indexOf('same') >= 0 && modes.indexOf('diff') >= 0, `modes not same+diff: ${modes.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.TwoTalesActivity._pool.every(r => r.correct == null && r.correctIndex == null && r.verdict == null)), 'a round carries a stored answer-flag field');

    /* a SAME round: prompt + tales + cards render; wrong no-advance; correct resolves */
    await force('tt-s1');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/same/i.test(prompt), `same-round prompt not the SAME question: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.tt-tale').length === 2), 'the 2 tale panels did not render');
    note(await page.evaluate(() => document.querySelectorAll('.tt-cand').length === 3), 'the 3 statement cards did not render');
    note(await page.evaluate(() => !!document.querySelector('.tt-hear')), 'the Hear-both button did not render');
    note(await page.evaluate(() => (document.querySelectorAll('.tt-sum')[0].textContent || '').length > 0 && (document.querySelectorAll('.tt-sum')[1].textContent || '').length > 0), 'tale summaries did not render');

    let oi = await oracleCi('tt-s1');
    await tapCi((oi + 1) % 3);   // a wrong card
    note(!(await S()).resolved, 'a wrong card resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapCi(oi);
    note((await S()).resolved, 'the correct card did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a DIFF round */
    await force('tt-d1');
    const promptD = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/only one/i.test(promptD), `diff-round prompt not the ONLY-ONE question: "${promptD}"`);
    oi = await oracleCi('tt-d1');
    await tapCi(oi);
    note((await S()).resolved, 'diff round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('tt-s3'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} two-tales/en — "${title}"`);
  } catch (e) {
    fails.push('two-tales/en: ' + e.message);
    console.log(`  FAIL two-tales/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`TWO-TALES LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('TWO-TALES LOCAL TEST PASSED — compare-two-stories: a wrong card does NOT resolve (warm re-read nudge, no advance); the mode-predicate card resolves; two tale panels + 3 statement cards + Hear-it render; the shell prompt carries the same/only-one question; shell Check hides until resolved; no stored answer; EN-only; same+diff modes + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
