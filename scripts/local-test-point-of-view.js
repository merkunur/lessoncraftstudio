#!/usr/bin/env node
/* =====================================================================
   local-test-point-of-view.js — interaction harness (RL.1.6 point-of-view,
   clarity-first redesign of #66). Serves `mini tools/` + drives the DOM:

     • tapping a wrong-height creature does NOT resolve (warm vantage nudge,
       no advance); tapping the view-matching creature resolves; shell Check
       hidden until resolved.
     • the 3 window-cards + height labels render; the shell prompt carries the
       first-person line; no stored answer; EN-only; ≥7 distinct + reshuffle;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'point-of-view.who-told.rl-1-6';
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

  const url = `http://127.0.0.1:${PORT}/point-of-view-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.PointOfViewActivity._resolved, miss: !!document.querySelector('.lw-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PointOfViewActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PointOfViewActivity._round && document.querySelector('.lw-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapCi = (i) => page.evaluate((idx) => { const b = Array.from(document.querySelectorAll('.lw-cand')).find(x => +x.getAttribute('data-ci') === idx); if (b) b.click(); return !!b; }, i).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleCi = (id) => page.evaluate((rid) => {
    const t = window.PointOfViewActivity, r = t._pool.find(x => x.id === rid), C = window.PointOfViewCore;
    return C.oracle(r);
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PointOfViewActivity; return t && t._activityRow && document.querySelector('.lw-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Lumen's Lighthouse Windows", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PointOfViewActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest has en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PointOfViewActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PointOfViewActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const views = await page.evaluate(() => Array.from(new Set(window.PointOfViewActivity._pool.map(r => r.view))));
    note(views.indexOf('high') >= 0 && views.indexOf('low') >= 0, `views not high+low: ${views.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.PointOfViewActivity._pool.every(r => r.correct == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* prompt carries the first-person line; windows render; wrong no-advance; correct resolves */
    await force('pv-boat');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/tiny dot/i.test(prompt) && /who said/i.test(prompt), `prompt not the line question: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.lw-cand').length === 3), 'the 3 window-cards did not render');
    note(await page.evaluate(() => document.querySelectorAll('.lw-cand .lw-win').length === 3), 'window svgs did not render');
    note(await page.evaluate(() => (document.querySelector('.lw-row').textContent || '').indexOf('Up high') >= 0), 'height labels did not render');

    let oi = await oracleCi('pv-boat');
    await tapCi((oi + 1) % 3);   // a wrong-height creature
    note(!(await S()).resolved, 'a wrong-height creature resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapCi(oi);
    note((await S()).resolved, 'the view-matching creature did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a low-view round */
    await force('pv-wave');
    oi = await oracleCi('pv-wave');
    await tapCi(oi);
    note((await S()).resolved, 'low-view round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('pv-town'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} point-of-view/en — "${title}"`);
  } catch (e) {
    fails.push('point-of-view/en: ' + e.message);
    console.log(`  FAIL point-of-view/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`POINT-OF-VIEW LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('POINT-OF-VIEW LOCAL TEST PASSED — viewpoint clarity build: a wrong-height creature does NOT resolve (warm vantage nudge, no advance); the view-matching creature resolves; the 3 window-cards + height labels render; the shell prompt carries the first-person line; shell Check hides until resolved; no stored answer; EN-only; high+low views + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
