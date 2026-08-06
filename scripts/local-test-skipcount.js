#!/usr/bin/env node
/* =====================================================================
   local-test-skipcount.js — interaction harness (2.NBT.A.2 skip-counting,
   clarity-first). Serves `mini tools/` + drives the rendered DOM:

     • fill / whichstep : a WRONG number does NOT resolve (warm nudge, no
       advance); the correct number resolves; shell Check hidden until
       resolved.
     • the lily-pad scene renders (an .sc-scene svg); the shell prompt
       interpolates the step; no stored answer; EN-only; ≥7 distinct +
       reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'skipcount.fill.2-nbt-a-2';
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

  const url = `http://127.0.0.1:${PORT}/skipcount-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.SkipCountActivity._resolved, miss: !!document.querySelector('.sc-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SkipCountActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SkipCountActivity._round && document.querySelector('.sc-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickVal = (v) => page.evaluate((val) => { const b = Array.from(document.querySelectorAll('.sc-cand')).find(x => Number(x.textContent.replace(/[^0-9]/g, '')) === val); if (b) b.click(); return !!b; }, v).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const D = (id) => page.evaluate((rid) => {
    const t = window.SkipCountActivity, r = t._pool.find(x => x.id === rid), C = window.SkipCountCore, a = C.answerValue(r);
    return { right: a, wrong: C.choices(r).find(c => c !== a) };
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SkipCountActivity; return t && t._activityRow && document.querySelector('.sc-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Hopper's Lily Hops", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.SkipCountActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.SkipCountActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.SkipCountActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.SkipCountActivity._pool.map(r => r.cog))));
    note(cogs.indexOf('fill') >= 0 && cogs.indexOf('whichstep') >= 0, `cogs not [fill,whichstep]: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.SkipCountActivity._pool.every(r => r.answer == null && r.landing == null)), 'a round carries a stored answer field');

    /* FILL: prompt interpolates the step; wrong no-advance; correct resolves; scene renders */
    await force('sc-fill-10-mid');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/10/.test(prompt) && /missing/i.test(prompt), `fill prompt not interpolated: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.sc-scene')), 'the lily-pad scene svg did not render');

    let d = await D('sc-fill-10-mid');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `fill: a wrong number (${d.wrong}) resolved`);
    note((await S()).miss, 'fill: wrong gave no nudge');
    await clickVal(d.right);
    note((await S()).resolved, `fill: the correct number (${d.right}) did not resolve`);
    note(await checkVisible(), 'fill: shell Check did not appear after resolve');

    /* BACKWARD fill */
    await force('sc-fill-10-back');
    const pb = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/down/i.test(pb), `backward prompt not 'counting down': "${pb}"`);
    d = await D('sc-fill-10-back');
    await clickVal(d.right);
    note((await S()).resolved, `backward fill: correct (${d.right}) did not resolve`);

    /* WHICHSTEP */
    await force('sc-step-10');
    d = await D('sc-step-10');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `whichstep: a wrong step (+${d.wrong}) resolved`);
    await clickVal(d.right);
    note((await S()).resolved, `whichstep: the correct step (+${d.right}) did not resolve`);

    /* mobile overflow 280→768 (widest = a 5-pad fill) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('sc-fill-5-mid'); await sleep(50);
      const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} skipcount/en — "${title}"`);
  } catch (e) {
    fails.push('skipcount/en: ' + e.message);
    console.log(`  FAIL skipcount/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`SKIPCOUNT LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('SKIPCOUNT LOCAL TEST PASSED — skip-count clarity build: a wrong number does NOT resolve (warm nudge, no advance); the correct missing number / step resolves; the lily-pad scene svg renders; the shell prompt interpolates the step (+ "counting down" for backward); shell Check hides until resolved; no stored answer; EN-only; fill+whichstep cogs + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
