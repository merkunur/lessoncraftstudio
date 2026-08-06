#!/usr/bin/env node
/* =====================================================================
   local-test-fraction-equiv.js — interaction harness (3.NF.A.3 equivalent
   fractions, clarity-first redesign of #86). Serves `mini tools/` + drives the
   DOM:

     • tapping a non-equivalent candidate does NOT resolve (warm nudge, no
       advance); tapping the equivalent candidate resolves + shows the same-
       amount note; shell Check hidden until resolved.
     • the reference card + 3 candidate bars + Hear-it render; the shell prompt
       carries the question; no stored answer flag; EN-only; ≥7 distinct +
       reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'fraction-equiv.same-amount.3-nf-a-3';
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

  const url = `http://127.0.0.1:${PORT}/fraction-equiv-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.FractionEquivActivity._resolved, miss: !!document.querySelector('.fe-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.FractionEquivActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.FractionEquivActivity._round && document.querySelector('.fe-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapCi = (ci) => page.evaluate((i) => { const b = Array.from(document.querySelectorAll('.fe-cand')).find(x => +x.getAttribute('data-ci') === i); if (b) b.click(); return !!b; }, ci).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const equivCi = (id) => page.evaluate((rid) => { const t = window.FractionEquivActivity, r = t._pool.find(x => x.id === rid), C = window.FractionEquivCore; return C.oracle(r); }, id);
  const distractorCi = (id) => page.evaluate((rid) => { const t = window.FractionEquivActivity, r = t._pool.find(x => x.id === rid), C = window.FractionEquivCore; for (let i = 0; i < r.candidates.length; i++) if (!C.isAnswer(r, i)) return i; return -1; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.FractionEquivActivity; return t && t._activityRow && document.querySelector('.fe-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Same-Amount Bakery/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.FractionEquivActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en base slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.FractionEquivActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.FractionEquivActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.FractionEquivActivity._pool.every(r => r.correctIndex == null && r.answer == null && r.candidates.every(c => c.equivalent == null))), 'a round stores an answer/equivalent flag field');

    /* a round: ref + 3 cands + Hear render; wrong (non-equivalent) no-advance; equivalent resolves + note */
    await force('fe-half-fourths');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/same amount/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.fe-ref .fe-ref-svg')), 'the reference card did not render');
    note(await page.evaluate(() => document.querySelectorAll('.fe-cand').length === 3), 'the 3 candidate cards did not render');
    note(await page.evaluate(() => !!document.querySelector('.fe-hear')), 'the Hear-it button did not render');

    const dis = await distractorCi('fe-half-fourths');
    await tapCi(dis);   // a non-equivalent candidate
    note(!(await S()).resolved, 'a non-equivalent candidate resolved');
    note((await S()).miss, 'wrong gave no nudge');
    const eq = await equivCi('fe-half-fourths');
    await tapCi(eq);
    note((await S()).resolved, 'the equivalent candidate did not resolve');
    note(await page.evaluate(() => { const m = document.querySelector('.fe-msg'); return m && /same amount/i.test(m.textContent); }), 'the same-amount note did not show');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a second round */
    await force('fe-twothirds-sixths');
    const e2 = await equivCi('fe-twothirds-sixths');
    await tapCi(e2);
    note((await S()).resolved, 'second round: equivalent did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('fe-half-eighths'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} fraction-equiv/en — "${title}"`);
  } catch (e) {
    fails.push('fraction-equiv/en: ' + e.message);
    console.log(`  FAIL fraction-equiv/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`FRACTION-EQUIV LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('FRACTION-EQUIV LOCAL TEST PASSED — same-amount: a non-equivalent candidate does NOT resolve (warm nudge, no advance); the equivalent candidate resolves + shows the same-amount note; the reference card + 3 candidate bars + Hear-it render; the shell prompt carries the question; no stored answer flag; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
