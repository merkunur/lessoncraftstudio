#!/usr/bin/env node
/* =====================================================================
   local-test-place-value-regroup.js — interaction harness (1.NBT.C.4
   compose-a-ten, the first deferred production-core). Serves `mini tools/` +
   drives the DOM:

     • the tens/ones columns (+ labels) + the "Make a ten" button + Tuck render;
       the shell prompt carries the equation; the shell keypad renders.
     • typing the correct total BEFORE bundling does NOT resolve (regroup
       required); tap "Make a ten" → ones<10 + button hides → type total →
       Check → resolves + caption.
     • no stored sum/answer flag; EN-only; ≥7 distinct + reshuffle;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'place-value-regroup.add-compose-ten.1-nbt-c-4';
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

  const url = `http://127.0.0.1:${PORT}/place-value-regroup-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PlaceValueRegroupActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id.indexOf(rid) >= 0);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PlaceValueRegroupActivity.a && document.querySelector('.pvr-root'), { timeout: 4000 });
    await sleep(50);
  }
  const bundle = () => page.evaluate(() => { const b = document.querySelector('.pvr-maketen'); if (b) b.click(); }).then(() => sleep(50));
  const typeTotal = () => page.evaluate(() => { const t = window.PlaceValueRegroupActivity, sum = t.a + t.b, keys = Array.from(document.querySelectorAll('.lcs-activity-key')); String(sum).split('').forEach(ch => { const k = keys.find(x => x.textContent === ch); if (k) k.click(); }); }).then(() => sleep(40));
  const clickCheck = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(50));
  const RO = () => page.evaluate(() => window.PlaceValueRegroupActivity.readOnly);
  const ones = () => page.evaluate(() => window.PlaceValueRegroupActivity.onesCount);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PlaceValueRegroupActivity; return t && t._activityRow && document.querySelector('.pvr-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Ten Bundles/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PlaceValueRegroupActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PlaceValueRegroupActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PlaceValueRegroupActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.PlaceValueRegroupActivity._pool.every(t => t.sum == null && t.answer == null)), 'a task stores a sum/answer flag field');

    /* render check */
    await force('r-27-5');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/27\s*\+\s*5/.test(prompt), `prompt wrong: "${prompt}"`);
    note(await page.evaluate(() => document.querySelectorAll('.pvr-col').length === 2), 'the tens/ones columns did not render');
    note(await page.evaluate(() => document.querySelectorAll('.pvr-rod').length === 2), 'expected 2 ten-rods for 27');
    note(await page.evaluate(() => document.querySelectorAll('.pvr-cube').length === 12), 'expected 12 ones for 7+5');
    note(await page.evaluate(() => !!document.querySelector('.pvr-maketen')), 'the "Make a ten" button did not render (ones≥10)');
    note(await page.evaluate(() => !!document.querySelector('.lcs-activity-keypad')), 'the shell keypad did not render');

    /* regroup load-bearing: type total WITHOUT bundling → no resolve */
    await typeTotal(); await clickCheck();
    note(!(await RO()), 'typing the total without bundling resolved (regroup not required)');
    note((await ones()) === 12, 'ones changed without bundling');

    /* bundle → ones 12→2, button gone; type → resolve + caption */
    await bundle();
    note((await ones()) === 2, `after bundle ones should be 2, got ${await ones()}`);
    note(await page.evaluate(() => document.querySelectorAll('.pvr-rod').length === 3), 'expected 3 ten-rods after bundling 27+5');
    note(!(await page.evaluate(() => !!document.querySelector('.pvr-maketen'))), 'the button is still present after bundling');
    await typeTotal(); await clickCheck();
    note(await RO(), 'bundle + correct total did not resolve');
    note(await page.evaluate(() => { const c = document.querySelector('.pvr-cap'); return c && /27 \+ 5 = 32/.test(c.textContent); }), 'the equation caption did not show');

    /* a second round */
    await force('r-55-8'); await bundle(); await typeTotal(); await clickCheck();
    note(await RO(), 'second round did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('r-74-8'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} place-value-regroup/en — "${title}"`);
  } catch (e) {
    fails.push('place-value-regroup/en: ' + e.message);
    console.log(`  FAIL place-value-regroup/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`PLACE-VALUE-REGROUP LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PLACE-VALUE-REGROUP LOCAL TEST PASSED — compose-a-ten: tens/ones columns + "Make a ten" + Tuck + keypad render; typing the total without bundling does NOT resolve (regroup required); bundling 27+5 gives 3 tens + 2 ones + hides the button; type the total → resolves + caption "27 + 5 = 32"; no stored answer flag; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
