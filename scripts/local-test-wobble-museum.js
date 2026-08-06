#!/usr/bin/env node
/* =====================================================================
   local-test-wobble-museum.js — interaction harness (W.K.2 informative-writing
   topic focus, clarity-first redesign of #85). Serves `mini tools/` + drives the
   DOM:

     • tapping an on-topic sentence does NOT resolve (warm nudge, no advance);
       tapping the drifted sentence resolves + shows the for-later note; shell
       Check hidden until resolved.
     • the room-sign + 4 sentence rows + Hear-it render; the shell prompt carries
       the question; no stored drift flag; EN-only; ≥7 distinct + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wobble-museum.catch-drift.w-k-2';
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

  const url = `http://127.0.0.1:${PORT}/wobble-museum-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.WobbleMuseumActivity._resolved, miss: !!document.querySelector('.wm-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WobbleMuseumActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WobbleMuseumActivity._round && document.querySelector('.wm-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapOi = (oi) => page.evaluate((i) => { const b = Array.from(document.querySelectorAll('.wm-line')).find(x => +x.getAttribute('data-oi') === i); if (b) b.click(); return !!b; }, oi).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const driftOi = (id) => page.evaluate((rid) => { const t = window.WobbleMuseumActivity, r = t._pool.find(x => x.id === rid), C = window.WobbleMuseumCore; return C.oracle(r); }, id);
  const onTopicOi = (id) => page.evaluate((rid) => { const t = window.WobbleMuseumActivity, r = t._pool.find(x => x.id === rid), C = window.WobbleMuseumCore; for (let i = 0; i < r.sentences.length; i++) if (!C.isDrift(r, i)) return i; return -1; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WobbleMuseumActivity; return t && t._activityRow && document.querySelector('.wm-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Wobble Museum', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.WobbleMuseumActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest has en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.WobbleMuseumActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.WobbleMuseumActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.WobbleMuseumActivity._pool.every(r => r.driftIndex == null && r.correct == null)), 'a round stores a drift/answer flag field');

    /* a room: sign + 4 lines + Hear render; wrong (on-topic) no-advance; drift resolves + note */
    await force('wm-frogs');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/wandered in/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const s = document.querySelector('.wm-sign'); return s && /frogs/i.test(s.textContent); }), 'the room-sign did not render');
    note(await page.evaluate(() => document.querySelectorAll('.wm-line').length === 4), 'the 4 sentence rows did not render');
    note(await page.evaluate(() => !!document.querySelector('.wm-hear')), 'the Hear-it button did not render');

    const onTopic = await onTopicOi('wm-frogs');
    await tapOi(onTopic);   // an on-topic sentence
    note(!(await S()).resolved, 'an on-topic sentence resolved');
    note((await S()).miss, 'wrong gave no nudge');
    const drift = await driftOi('wm-frogs');
    await tapOi(drift);
    note((await S()).resolved, 'the drifted sentence did not resolve');
    note(await page.evaluate(() => { const m = document.querySelector('.wm-line-msg'); return m && /wandered in/i.test(m.textContent); }), 'the for-later note did not show');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a second room */
    await force('wm-moon');
    const d2 = await driftOi('wm-moon');
    await tapOi(d2);
    note((await S()).resolved, 'second room: drift did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('wm-trucks'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} wobble-museum/en — "${title}"`);
  } catch (e) {
    fails.push('wobble-museum/en: ' + e.message);
    console.log(`  FAIL wobble-museum/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`WOBBLE-MUSEUM LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('WOBBLE-MUSEUM LOCAL TEST PASSED — catch-the-drift: an on-topic sentence does NOT resolve (warm nudge, no advance); the drifted sentence resolves + shows the for-later note; the room-sign + 4 rows + Hear-it render; the shell prompt carries the question; no stored drift flag; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
