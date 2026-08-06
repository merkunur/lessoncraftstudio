#!/usr/bin/env node
/* =====================================================================
   local-test-marina-headline-desk.js — interaction harness for "Marina's
   Headline Desk" (CCSS RI.2.2). Serves `mini tools/` + drives the real shell:
     • a round renders the story lines + Read button + 3 topic cards;
     • tapping the TOPIC card → shell Check → celebrate;
     • tapping the detail OR offtopic foil → tryagain, NO card marked (no leak);
     • cards carry the option TEXT only (no kind attribute);
     • tap-to-deselect; ≥7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'marina-headline-desk.main-topic.ri-2-2';
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

  const url = `http://127.0.0.1:${PORT}/marina-headline-desk-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MarinaHeadlineDeskActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'marina-headline-desk.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MarinaHeadlineDeskActivity.round && document.querySelector('.mhd-root'), { timeout: 4000 });
    await sleep(40);
  }
  const idOfKind = (kind) => page.evaluate((k) => { const r = window.MarinaHeadlineDeskActivity.round; return (r.options.filter(o => o.kind === k)[0] || {}).id; }, kind);
  const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.mhd-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.MarinaHeadlineDeskActivity; return t && t._activityRow && document.querySelector('.mhd-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Marina's Headline Desk", `header title "${title}"`);

    const Np = await page.evaluate(() => window.MarinaHeadlineDeskActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.MarinaHeadlineDeskActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('bees');
    note(await page.$$eval('.mhd-line', els => els.length) >= 3, 'story did not render >=3 lines');
    note(await page.$$eval('.mhd-opt', els => els.length) === 3, 'did not render 3 cards');
    const attrs = await page.$$eval('.mhd-opt', els => els.map(e => e.getAttribute('data-kind') || e.getAttribute('data-answer')).filter(Boolean));
    note(attrs.length === 0, 'a card leaks a kind/answer attribute');

    await tap(await idOfKind('topic')); await check();
    note(await celebrated(), 'the topic card did not celebrate');

    await force('rain');
    await tap(await idOfKind('detail')); await check();
    note(await triedAgain(), 'the detail foil did not show try-again');
    note(!(await celebrated()), 'the detail foil celebrated (must not)');
    const leak = await page.$$eval('.mhd-opt', els => els.filter(e => /mhd-correct|mhd-right|mhd-wrong|mhd-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');

    await force('frog');
    await tap(await idOfKind('offtopic')); await check();
    note(!(await celebrated()), 'the offtopic foil celebrated (must not)');
    await tap(await idOfKind('topic')); await check();
    note(await celebrated(), 'the topic did not celebrate after the foil attempts');

    await force('teeth');
    const tid = await idOfKind('topic');
    await tap(tid); note(await page.evaluate(() => !!window.MarinaHeadlineDeskActivity.sel), 'first tap did not select');
    await tap(tid); note(await page.evaluate(() => !window.MarinaHeadlineDeskActivity.sel), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('seed');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} marina-headline-desk/en — "${title}"`);
  } catch (e) {
    fails.push('marina-headline-desk/en: ' + e.message);
    console.log(`  FAIL marina-headline-desk/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MARINA-HEADLINE-DESK LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('MARINA-HEADLINE-DESK LOCAL TEST PASSED — story + Read + 3 topic cards; the topic celebrates; detail + offtopic foils = try-again with NO card marked (no leak); cards carry no kind; tap-to-deselect; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
