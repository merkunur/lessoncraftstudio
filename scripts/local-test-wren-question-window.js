#!/usr/bin/env node
/* =====================================================================
   local-test-wren-question-window.js — interaction harness for "Wren's
   Question Window" (CCSS L.K.1.d). Serves `mini tools/` + drives the real shell:
     • a round renders the question sentence + 6 wh-word chips;
     • tapping the correct question word → shell Check → celebrate;
     • tapping a wrong word → tryagain, NO chip marked (no leak);
     • the 6 chips are SHUFFLED (correct not always first) across rounds;
     • tap-to-deselect; ≥7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wren-question-window.question-words.l-k-1-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
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

  const url = `http://127.0.0.1:${PORT}/wren-question-window-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WrenQuestionWindowActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'wren-question-window.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WrenQuestionWindowActivity.round && document.querySelector('.wqw-root'), { timeout: 4000 });
    await sleep(40);
  }
  const correct = () => page.evaluate(() => window.QuestionWordCore.oracle(window.WrenQuestionWindowActivity.round));
  const aWrong = () => page.evaluate(() => { const r = window.WrenQuestionWindowActivity.round, C = window.QuestionWordCore; return C.chips(r).filter(c => c !== C.oracle(r))[0]; });
  const tap = (w) => page.evaluate((x) => { const b = document.querySelector('.wqw-chip[data-w="' + x + '"]'); if (b) b.click(); }, w).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const firstChipText = () => page.$eval('.wqw-chip', e => e.textContent.trim()).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WrenQuestionWindowActivity; return t && t._activityRow && document.querySelector('.wqw-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Wren's Question Window", `header title "${title}"`);

    const Np = await page.evaluate(() => window.WrenQuestionWindowActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.WrenQuestionWindowActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('eat');
    note(!!(await page.$('.wqw-sent')), 'no sentence card');
    note(await page.$$eval('.wqw-chip', els => els.length) === 6, 'did not render 6 chips');

    await tap(await correct()); await check();
    note(await celebrated(), 'the correct question word did not celebrate');

    await force('next');
    await tap(await aWrong()); await check();
    note(await triedAgain(), 'a wrong question word did not show try-again');
    note(!(await celebrated()), 'a wrong question word celebrated (must not)');
    const leak = await page.$$eval('.wqw-chip', els => els.filter(e => /wqw-correct|wqw-right|wqw-wrong|wqw-bad/.test(e.className)).length);
    note(leak === 0, 'a chip is marked correct/wrong after a wrong pick (leak)');
    await tap(await correct()); await check();
    note(await celebrated(), 'the correct question word did not celebrate after the wrong attempt');

    const firsts = [];
    for (const id of ['eat', 'next', 'plate', 'open', 'hungry']) { await force(id); firsts.push(await firstChipText()); }
    note(new Set(firsts).size >= 2, `the first chip is identical across rounds (${firsts.join(',')}) — chips not shuffled`);

    await force('eggs');
    const cw = await correct();
    await tap(cw); note(await page.evaluate(() => !!window.WrenQuestionWindowActivity.sel), 'first tap did not select');
    await tap(cw); note(await page.evaluate(() => !window.WrenQuestionWindowActivity.sel), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('plateon');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} wren-question-window/en — "${title}"`);
  } catch (e) {
    fails.push('wren-question-window/en: ' + e.message);
    console.log(`  FAIL wren-question-window/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WREN-QUESTION-WINDOW LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WREN-QUESTION-WINDOW LOCAL TEST PASSED — sentence + 6 wh-word chips; the correct question word celebrates; wrong = try-again with NO chip marked (no leak); chips shuffle (correct not pinned); tap-to-deselect; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
