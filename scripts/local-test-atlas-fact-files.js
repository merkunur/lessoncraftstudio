#!/usr/bin/env node
/* =====================================================================
   local-test-atlas-fact-files.js — interaction harness for "Atlas's Fact Files"
   (CCSS RI.K.1). Serves `mini tools/`; drives the real shell:
     • a round renders the fact card + question + 3 answer cards;
     • tapping the correct answer → shell Check → celebrate;
     • tapping a wrong answer → tryagain, NO card marked (no leak);
     • cards SHUFFLED; tap-to-deselect; ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'atlas-fact-files.key-detail.ri-k-1';
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
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/atlas-fact-files-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.AtlasFactFilesActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'atlas-fact-files.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.AtlasFactFilesActivity.round && document.querySelector('.aff-root'), { timeout: 4000 });
    await sleep(40);
  }
  const correctId = () => page.evaluate(() => window.FactDetailCore.oracle(window.AtlasFactFilesActivity.round));
  const wrongId = () => page.evaluate(() => { const o = window.FactDetailCore.oracle(window.AtlasFactFilesActivity.round); return [0, 1, 2].filter(i => i !== o)[0]; });
  const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.aff-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const firstCardText = () => page.$eval('.aff-opt', e => e.textContent.trim()).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.AtlasFactFilesActivity; return t && t._activityRow && document.querySelector('.aff-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Atlas's Fact Files", `header title "${title}"`);

    const Np = await page.evaluate(() => window.AtlasFactFilesActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.AtlasFactFilesActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('bees');
    note(!!(await page.$('.aff-fact')), 'no fact card');
    note(!!(await page.$('.aff-q')), 'no question');
    note(await page.$$eval('.aff-opt', els => els.length) === 3, 'did not render 3 answer cards');

    await tap(await correctId()); await check();
    note(await celebrated(), 'the correct answer did not celebrate');

    await force('frog');
    await tap(await wrongId()); await check();
    note(await triedAgain(), 'a wrong answer did not show try-again');
    note(!(await celebrated()), 'a wrong answer celebrated (must not)');
    const leak = await page.$$eval('.aff-opt', els => els.filter(e => /aff-correct|aff-right|aff-wrong|aff-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');
    await tap(await correctId()); await check();
    note(await celebrated(), 'the correct answer did not celebrate after the wrong attempt');

    const firsts = [];
    for (const id of ['bees', 'frog', 'sun', 'spider', 'cow']) { await force(id); firsts.push(await firstCardText()); }
    note(new Set(firsts).size >= 2, `the first card is identical across rounds (${firsts.join(' / ')}) — cards not shuffled`);

    await force('rain');
    const cw = await correctId();
    await tap(cw); note(await page.evaluate(() => window.AtlasFactFilesActivity.sel != null), 'first tap did not select');
    await tap(cw); note(await page.evaluate(() => window.AtlasFactFilesActivity.sel == null), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('penguin');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} atlas-fact-files/en — "${title}"`);
  } catch (e) {
    fails.push('atlas-fact-files/en: ' + e.message);
    console.log(`  FAIL atlas-fact-files/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ATLAS-FACT-FILES LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('ATLAS-FACT-FILES LOCAL TEST PASSED — fact card + question + 3 answer cards; the correct answer celebrates; wrong = try-again with NO card marked (no leak); cards shuffle; tap-to-deselect; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
