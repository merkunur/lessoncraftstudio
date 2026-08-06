#!/usr/bin/env node
/* =====================================================================
   local-test-hazel-word-bridge.js — interaction harness for "Hazel's Word
   Bridge" (CCSS L.1.1.g). Serves `mini tools/` + drives the real shell:
     • a round renders the two-clause sentence + 4 conjunction chips;
     • tapping the correct conjunction → shell Check → celebrate;
     • tapping a wrong conjunction → tryagain, NO chip marked (no leak);
     • the 4 chips are SHUFFLED (correct not always first) across rounds;
     • tap-to-deselect; ≥7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'hazel-word-bridge.joining-words.l-1-1-g';
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

  const url = `http://127.0.0.1:${PORT}/hazel-word-bridge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.HazelWordBridgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'hazel-word-bridge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.HazelWordBridgeActivity.round && document.querySelector('.hwb-root'), { timeout: 4000 });
    await sleep(40);
  }
  const correct = () => page.evaluate(() => window.ConjunctionCore.oracle(window.HazelWordBridgeActivity.round));
  const aWrong = () => page.evaluate(() => { const r = window.HazelWordBridgeActivity.round, C = window.ConjunctionCore; return C.chips(r).filter(c => c !== C.oracle(r))[0]; });
  const tap = (w) => page.evaluate((x) => { const b = document.querySelector('.hwb-chip[data-w="' + x + '"]'); if (b) b.click(); }, w).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const firstChipText = () => page.$eval('.hwb-chip', e => e.textContent.trim()).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.HazelWordBridgeActivity; return t && t._activityRow && document.querySelector('.hwb-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Hazel's Word Bridge", `header title "${title}"`);

    const Np = await page.evaluate(() => window.HazelWordBridgeActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.HazelWordBridgeActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('hatcoat');
    note(!!(await page.$('.hwb-sent')), 'no sentence card');
    note(await page.$$eval('.hwb-chip', els => els.length) === 4, 'did not render 4 chips');

    await tap(await correct()); await check();
    note(await celebrated(), 'the correct conjunction did not celebrate');

    await force('boots');
    await tap(await aWrong()); await check();
    note(await triedAgain(), 'a wrong conjunction did not show try-again');
    note(!(await celebrated()), 'a wrong conjunction celebrated (must not)');
    const leak = await page.$$eval('.hwb-chip', els => els.filter(e => /hwb-correct|hwb-right|hwb-wrong|hwb-bad/.test(e.className)).length);
    note(leak === 0, 'a chip is marked correct/wrong after a wrong pick (leak)');
    await tap(await correct()); await check();
    note(await celebrated(), 'the correct conjunction did not celebrate after the wrong attempt');

    const firsts = [];
    for (const id of ['hatcoat', 'milk', 'boots', 'dark', 'won']) { await force(id); firsts.push(await firstChipText()); }
    note(new Set(firsts).size >= 2, `the first chip is identical across rounds (${firsts.join(',')}) — chips not shuffled`);

    await force('won');
    const cw = await correct();
    await tap(cw); note(await page.evaluate(() => !!window.HazelWordBridgeActivity.sel), 'first tap did not select');
    await tap(cw); note(await page.evaluate(() => !window.HazelWordBridgeActivity.sel), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('box');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} hazel-word-bridge/en — "${title}"`);
  } catch (e) {
    fails.push('hazel-word-bridge/en: ' + e.message);
    console.log(`  FAIL hazel-word-bridge/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`HAZEL-WORD-BRIDGE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('HAZEL-WORD-BRIDGE LOCAL TEST PASSED — sentence + 4 conjunction chips; the correct conjunction celebrates; wrong = try-again with NO chip marked (no leak); chips shuffle (correct not pinned); tap-to-deselect; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
