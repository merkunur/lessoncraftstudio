#!/usr/bin/env node
/* =====================================================================
   local-test-author-purpose.js — interaction harness (RI.2.6 author's purpose,
   clarity-first redesign of #72). Serves `mini tools/` + drives the DOM:

     • tapping a wrong bin does NOT resolve (warm move nudge, no advance);
       tapping the matching bin resolves; shell Check hidden until resolved.
     • the note card + 3 bin chips + Hear-it render; the shell prompt carries
       the question; no stored answer; EN-only; ≥7 distinct + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'author-purpose.why-wrote.ri-2-6';
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

  const url = `http://127.0.0.1:${PORT}/author-purpose-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.AuthorPurposeActivity._resolved, miss: !!document.querySelector('.ap-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.AuthorPurposeActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.AuthorPurposeActivity._round && document.querySelector('.ap-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapPurpose = (p) => page.evaluate((pp) => { const b = Array.from(document.querySelectorAll('.ap-cand')).find(x => x.getAttribute('data-purpose') === pp); if (b) b.click(); return !!b; }, p).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const otherPurpose = (id) => page.evaluate((rid) => { const t = window.AuthorPurposeActivity, r = t._pool.find(x => x.id === rid), C = window.AuthorPurposeCore; return C.PURPOSES.find(x => x !== r.note.purpose); }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.AuthorPurposeActivity; return t && t._activityRow && document.querySelector('.ap-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Harbor Post', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.AuthorPurposeActivity._activityRow.slug));
    note(slugKeys.indexOf('en') >= 0, `manifest slug missing en base: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.AuthorPurposeActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.AuthorPurposeActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const purposes = await page.evaluate(() => Array.from(new Set(window.AuthorPurposeActivity._pool.map(r => r.note.purpose))));
    note(purposes.length === 3, `not all 3 purposes present: ${purposes.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.AuthorPurposeActivity._pool.every(r => r.correct == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* an INFORM round: prompt + note + bins + Hear render; wrong no-advance; correct resolves */
    await force('ap-i1');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/why did the author/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const n = document.querySelector('.ap-note'); return n && n.textContent.length > 20; }), 'the note card did not render');
    note(await page.evaluate(() => document.querySelectorAll('.ap-cand').length === 3), 'the 3 bins did not render');
    note(await page.evaluate(() => !!document.querySelector('.ap-hear')), 'the Hear-it button did not render');

    let other = await otherPurpose('ap-i1');
    await tapPurpose(other);   // a wrong bin
    note(!(await S()).resolved, 'a wrong bin resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapPurpose('inform');
    note((await S()).resolved, 'the correct (inform) bin did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* an INSTRUCT round + an ENTERTAIN round */
    await force('ap-s1'); await tapPurpose('instruct');
    note((await S()).resolved, 'instruct round: correct did not resolve');
    await force('ap-e1'); await tapPurpose('entertain');
    note((await S()).resolved, 'entertain round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('ap-s2'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} author-purpose/en — "${title}"`);
  } catch (e) {
    fails.push('author-purpose/en: ' + e.message);
    console.log(`  FAIL author-purpose/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`AUTHOR-PURPOSE LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('AUTHOR-PURPOSE LOCAL TEST PASSED — author\'s purpose: a wrong bin does NOT resolve (warm move nudge, no advance); the matching bin resolves; the note card + 3 bins + Hear-it render; the shell prompt carries the question; shell Check hides until resolved; no stored answer; EN-only; all 3 purposes + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
