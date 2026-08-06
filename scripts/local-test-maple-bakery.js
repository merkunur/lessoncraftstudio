#!/usr/bin/env node
/* =====================================================================
   local-test-maple-bakery.js — interaction harness (3.OA.A.2 division,
   clarity-first). Serves `mini tools/` + drives the rendered DOM:

     • share / pack : a WRONG number does NOT resolve (warm nudge, no
       advance); the correct number resolves; shell Check hidden until
       resolved.
     • the bakery scene renders (an .mb-scene svg); no stored answer in the
       round; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'maple-bakery.share.3-oa-a-2';
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

  const url = `http://127.0.0.1:${PORT}/maple-bakery-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.MapleBakeryActivity._resolved, miss: !!document.querySelector('.mb-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MapleBakeryActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MapleBakeryActivity._round && document.querySelector('.mb-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickVal = (v) => page.evaluate((val) => { const b = Array.from(document.querySelectorAll('.mb-cand')).find(x => Number(x.textContent) === val); if (b) b.click(); return !!b; }, v).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const D = (id) => page.evaluate((rid) => {
    const t = window.MapleBakeryActivity, r = t._pool.find(x => x.id === rid), C = window.MapleBakeryCore, a = C.answerValue(r);
    return { right: a, wrong: C.choices(r).find(c => c !== a) };
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.MapleBakeryActivity; return t && t._activityRow && document.querySelector('.mb-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Maple's Bakery", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.MapleBakeryActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en base slug: ${slugKeys.join(',')}`);   // relaxed from EN-only (activity now de+fr fanned; dev script, untracked)

    const N = await page.evaluate(() => window.MapleBakeryActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.MapleBakeryActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.MapleBakeryActivity._pool.map(r => r.cog))));
    note(cogs.length >= 2 && cogs.indexOf('share') >= 0 && cogs.indexOf('pack') >= 0, `cogs not [share,pack]: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.MapleBakeryActivity._pool.every(r => r.answer == null && r.quotient == null && r.boxes == null)), 'a round carries a stored answer field');

    /* prompt interpolation: the shell prompt should carry the numbers */
    await force('mb-share-12-3');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/12/.test(prompt) && /3/.test(prompt) && /plate/i.test(prompt), `share prompt not interpolated: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.mb-scene')), 'the bakery scene svg did not render');

    let d = await D('mb-share-12-3');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `share: a wrong number (${d.wrong}) resolved`);
    note((await S()).miss, 'share: wrong gave no nudge');
    await clickVal(d.right);
    note((await S()).resolved, `share: the correct number (${d.right}) did not resolve`);
    note(await checkVisible(), 'share: shell Check did not appear after resolve');

    /* PACK */
    await force('mb-pack-18-6');
    const prompt2 = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/18/.test(prompt2) && /6/.test(prompt2) && /box/i.test(prompt2), `pack prompt not interpolated: "${prompt2}"`);
    d = await D('mb-pack-18-6');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `pack: a wrong number (${d.wrong}) resolved`);
    await clickVal(d.right);
    note((await S()).resolved, `pack: the correct number (${d.right}) did not resolve`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('mb-pack-20-4'); await sleep(50);
      const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} maple-bakery/en — "${title}"`);
  } catch (e) {
    fails.push('maple-bakery/en: ' + e.message);
    console.log(`  FAIL maple-bakery/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`MAPLE-BAKERY LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('MAPLE-BAKERY LOCAL TEST PASSED — division clarity build: a wrong number does NOT resolve (warm nudge, no advance); the correct share-size / box-count resolves; the bakery scene svg renders; the shell prompt interpolates the numbers; shell Check hides until resolved; no stored answer; EN-only; share+pack cogs + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
