#!/usr/bin/env node
/* =====================================================================
   local-test-tense.js — interaction harness (L.1.1.e verb tense, clarity-first
   redesign of #70). Serves `mini tools/` + drives the DOM:

     • tapping a wrong form does NOT resolve (warm time nudge, no advance);
       tapping the time-matching form resolves; shell Check hidden until
       resolved.
     • the 3 time-windows (correct one highlighted) + 3 form chips + Hear-it
       render; the shell prompt carries the sentence + time word; no stored
       answer; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'tense.past-present-future.l-1-1-e';
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

  const url = `http://127.0.0.1:${PORT}/tense-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.TenseActivity._resolved, miss: !!document.querySelector('.tn-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TenseActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TenseActivity._round && document.querySelector('.tn-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapTense = (tense) => page.evaluate((tn) => { const b = Array.from(document.querySelectorAll('.tn-cand')).find(x => x.getAttribute('data-tense') === tn); if (b) b.click(); return !!b; }, tense).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const otherTense = (id) => page.evaluate((rid) => { const t = window.TenseActivity, r = t._pool.find(x => x.id === rid), C = window.TenseCore; return C.TENSES.find(x => x !== r.time); }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TenseActivity; return t && t._activityRow && document.querySelector('.tn-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Clock Tower', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.TenseActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.TenseActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.TenseActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const times = await page.evaluate(() => Array.from(new Set(window.TenseActivity._pool.map(r => r.time))));
    note(times.length === 3, `not all 3 times present: ${times.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.TenseActivity._pool.every(r => r.correct == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* a PAST round: prompt + windows + chips render; wrong no-advance; correct resolves */
    await force('tn-p1');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/yesterday/i.test(prompt) && /which word fits/i.test(prompt), `past-round prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.tn-win').length === 3), 'the 3 time-windows did not render');
    note(await page.evaluate(() => { const on = document.querySelector('.tn-win.on .tn-wlab'); return on && on.textContent === 'Before'; }), 'the past round did not highlight the Before window');
    note(await page.evaluate(() => document.querySelectorAll('.tn-cand').length === 3), 'the 3 form chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.tn-hear')), 'the Hear-it button did not render');

    let other = await otherTense('tn-p1');
    await tapTense(other);   // a wrong form
    note(!(await S()).resolved, 'a wrong form resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapTense('past');
    note((await S()).resolved, 'the correct (past) form did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a FUTURE round (the "will" form) */
    await force('tn-f1');
    note(await page.evaluate(() => { const on = document.querySelector('.tn-win.on .tn-wlab'); return on && on.textContent === 'Soon'; }), 'the future round did not highlight the Soon window');
    await tapTense('future');
    note((await S()).resolved, 'future round: correct did not resolve');

    /* a PRESENT round */
    await force('tn-n1');
    await tapTense('present');
    note((await S()).resolved, 'present round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('tn-f2'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} tense/en — "${title}"`);
  } catch (e) {
    fails.push('tense/en: ' + e.message);
    console.log(`  FAIL tense/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`TENSE LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('TENSE LOCAL TEST PASSED — verb tense: a wrong form does NOT resolve (warm time nudge, no advance); the time-matching form resolves; 3 time-windows (correct one highlighted) + 3 form chips + Hear-it render; the shell prompt carries the sentence + time word; shell Check hides until resolved; no stored answer; EN-only; all 3 times + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
