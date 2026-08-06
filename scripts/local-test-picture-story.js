#!/usr/bin/env node
/* =====================================================================
   local-test-picture-story.js — interaction harness (RL.K.1 story key-
   details, clarity-first redesign of #58). Serves `mini tools/` + drives the
   rendered DOM:

     • a WRONG choice does NOT resolve (warm nudge, no advance); the correct
       one resolves; shell Check hidden until resolved.
     • the 3-panel strip + captions render; the shell prompt carries the
       question; no stored answer; EN-only; ≥7 distinct + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'picture-story.read.rl-k-1';
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

  const url = `http://127.0.0.1:${PORT}/picture-story-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.PictureStoryActivity._resolved, miss: !!document.querySelector('.ps-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PictureStoryActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PictureStoryActivity._round && document.querySelector('.ps-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickText = (s) => page.evaluate((val) => { const b = Array.from(document.querySelectorAll('.ps-cand')).find(x => x.textContent.trim() === val); if (b) b.click(); return !!b; }, s).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const D = (id) => page.evaluate((rid) => {
    const t = window.PictureStoryActivity, r = t._pool.find(x => x.id === rid), C = window.PictureStoryCore;
    return { right: r.answer, wrong: C.choices(r).find(c => c !== r.answer) };
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PictureStoryActivity; return t && t._activityRow && document.querySelector('.ps-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Fable's Picture Stories", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PictureStoryActivity._activityRow.slug));
    note(slugKeys.indexOf('en') >= 0, `manifest slug missing en base: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PictureStoryActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PictureStoryActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const qtypes = await page.evaluate(() => Array.from(new Set(window.PictureStoryActivity._pool.map(r => r.qtype))));
    note(qtypes.length >= 3, `only ${qtypes.length} qtypes: ${qtypes.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.PictureStoryActivity._pool.every(r => r.isCorrect == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* prompt carries the question; strip renders; wrong no-advance; correct resolves */
    await force('ps-mit-what');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/slipped off/i.test(prompt), `prompt not interpolated: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.ps-panel').length === 3), 'the 3-panel strip did not render');
    note(await page.evaluate(() => (document.querySelector('.ps-strip').textContent || '').indexOf('mitten') >= 0), 'captions did not render');
    note(await page.evaluate(() => document.querySelectorAll('.ps-cand').length === 3), 'did not render 3 choice cards');

    let d = await D('ps-mit-what');
    await clickText(d.wrong);
    note(!(await S()).resolved, `a wrong choice ("${d.wrong}") resolved`);
    note((await S()).miss, 'wrong gave no nudge');
    await clickText(d.right);
    note((await S()).resolved, `the correct choice ("${d.right}") did not resolve`);
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a why round on a different story */
    await force('ps-pic-why');
    d = await D('ps-pic-why');
    await clickText(d.right);
    note((await S()).resolved, 'why round: correct did not resolve');

    /* mobile overflow 280→768 (the 3-glyph picnic panel + an order round) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('ps-mit-order'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `order horizontal overflow ${over}px at ${w}px`);
      await force('ps-pic-why'); await sleep(40);
      over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `picnic horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} picture-story/en — "${title}"`);
  } catch (e) {
    fails.push('picture-story/en: ' + e.message);
    console.log(`  FAIL picture-story/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`PICTURE-STORY LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PICTURE-STORY LOCAL TEST PASSED — story comprehension clarity build: a wrong choice does NOT resolve (warm nudge, no advance); the correct one resolves; the 3-panel captioned strip renders; the shell prompt carries the question; shell Check hides until resolved; no stored answer-flag; EN-only; ≥3 qtypes + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
