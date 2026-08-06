#!/usr/bin/env node
/* =====================================================================
   local-test-comet-kangaroo.js — interaction harness for "Comet the Kangaroo"
   (CCSS 2.NBT.B.8). Serves `mini tools/` + drives the real shell:
     • a round renders the start node + leap label + a "?" landing node;
     • the shell shows the number keypad; typing the correct result → Check → celebrate;
     • typing a wrong result → tryagain (no celebrate);
     • ≥9 distinct rounds + reshuffle; the stage never leaks the result; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'comet-kangaroo.tens-hundreds.2-nbt-b-8';
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

  const url = `http://127.0.0.1:${PORT}/comet-kangaroo-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(idx) {
    await page.evaluate((k) => {
      const t = window.CometKangarooActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, idx);
    await page.waitForFunction(() => window.CometKangarooActivity.round && document.querySelector('.ckg-root'), { timeout: 4000 });
    await sleep(40);
  }
  const oracle = () => page.evaluate(() => window.JumpTensCore.oracle(window.CometKangarooActivity.round));
  async function typeNum(n) {
    const digits = String(n).split('');
    for (const d of digits) {
      await page.evaluate((dig) => {
        const keys = Array.from(document.querySelectorAll('.lcs-activity-key'));
        const k = keys.find(b => !b.classList.contains('lcs-activity-key-clear') && b.textContent.trim() === dig);
        if (k) k.click();
      }, d);
      await sleep(20);
    }
  }
  const clearPad = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-key-clear'); if (c) c.click(); }).then(() => sleep(30));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.CometKangarooActivity; return t && t._activityRow && document.querySelector('.ckg-root') && document.querySelector('.lcs-activity-keypad'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Comet the Kangaroo", `header title "${title}"`);

    const Np = await page.evaluate(() => window.CometKangarooActivity._pool.length);
    note(Np >= 9, `only ${Np} rounds (<9)`);
    const ids = await page.evaluate((count) => { const t = window.CometKangarooActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 9, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<9)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force(0);
    note(!!(await page.$('.ckg-start')), 'no start node');
    note(await page.$eval('.ckg-end', e => e.textContent.trim()) === '?', 'end node does not show "?"');
    const ans0 = await oracle();
    const stageTxt = await page.$eval('.ckg-root', e => e.textContent);
    note(stageTxt.indexOf(String(ans0)) < 0, `the stage leaks the result ${ans0}`);

    await typeNum(ans0); await check();
    note(await celebrated(), `the correct result ${ans0} did not celebrate`);

    await force(1);
    const ans1 = await oracle();
    await typeNum(ans1 === 0 ? 999 : ans1 + 1); await check();
    note(await triedAgain(), 'a wrong result did not show try-again');
    note(!(await celebrated()), 'a wrong result celebrated (must not)');
    await clearPad();
    await typeNum(ans1); await check();
    note(await celebrated(), 'the correct result did not celebrate after the wrong attempt');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force(2);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} comet-kangaroo/en — "${title}"`);
  } catch (e) {
    fails.push('comet-kangaroo/en: ' + e.message);
    console.log(`  FAIL comet-kangaroo/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`COMET-KANGAROO LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('COMET-KANGAROO LOCAL TEST PASSED — start node + leap + "?" landing; the correct keypad result celebrates; wrong = try-again; stage never leaks the result; ≥9 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
