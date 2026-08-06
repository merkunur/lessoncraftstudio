#!/usr/bin/env node
/* =====================================================================
   local-test-pim-comma-mail.js — interaction harness for "Pim's Comma Mail"
   (CCSS L.2.2.b). Serves `mini tools/`; drives the real shell:
     • a round renders the kind label + 3 greeting/closing option cards;
     • tapping the correctly-comma'd form → shell Check → celebrate;
     • tapping a wrong form → tryagain, NO card marked (no leak);
     • cards SHUFFLED; tap-to-deselect; ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pim-comma-mail.letter-commas.l-2-2-b';
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

  const url = `http://127.0.0.1:${PORT}/pim-comma-mail-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PimCommaMailActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pim-comma-mail.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PimCommaMailActivity.round && document.querySelector('.pcm-root'), { timeout: 4000 });
    await sleep(40);
  }
  const correctId = () => page.evaluate(() => window.LetterCommaCore.oracle(window.PimCommaMailActivity.round));
  const wrongId = () => page.evaluate(() => { const o = window.LetterCommaCore.oracle(window.PimCommaMailActivity.round); return [0, 1, 2].filter(i => i !== o)[0]; });
  const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.pcm-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const firstCardText = () => page.$eval('.pcm-opt', e => e.textContent.trim()).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PimCommaMailActivity; return t && t._activityRow && document.querySelector('.pcm-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pim's Comma Mail", `header title "${title}"`);

    const Np = await page.evaluate(() => window.PimCommaMailActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.PimCommaMailActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('sam');
    note(await page.$$eval('.pcm-opt', els => els.length) === 3, 'did not render 3 option cards');

    await tap(await correctId()); await check();
    note(await celebrated(), 'the correct form did not celebrate');

    await force('love');
    await tap(await wrongId()); await check();
    note(await triedAgain(), 'a wrong form did not show try-again');
    note(!(await celebrated()), 'a wrong form celebrated (must not)');
    const leak = await page.$$eval('.pcm-opt', els => els.filter(e => /pcm-correct|pcm-right|pcm-wrong|pcm-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');
    await tap(await correctId()); await check();
    note(await celebrated(), 'the correct form did not celebrate after the wrong attempt');

    const firsts = [];
    for (const id of ['sam', 'grandma', 'mrfox', 'friend', 'pal']) { await force(id); firsts.push(await firstCardText()); }
    note(new Set(firsts).size >= 2, `the first card is identical across rounds (${firsts.join(' / ')}) — cards not shuffled`);

    await force('yourstruly');
    const cw = await correctId();
    await tap(cw); note(await page.evaluate(() => window.PimCommaMailActivity.sel != null), 'first tap did not select');
    await tap(cw); note(await page.evaluate(() => window.PimCommaMailActivity.sel == null), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('auntmia');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} pim-comma-mail/en — "${title}"`);
  } catch (e) {
    fails.push('pim-comma-mail/en: ' + e.message);
    console.log(`  FAIL pim-comma-mail/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`PIM-COMMA-MAIL LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('PIM-COMMA-MAIL LOCAL TEST PASSED — 3 option cards; the correct form celebrates; wrong = try-again with NO card marked (no leak); cards shuffle; tap-to-deselect; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
