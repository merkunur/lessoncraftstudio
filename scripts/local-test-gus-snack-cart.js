#!/usr/bin/env node
/* =====================================================================
   local-test-gus-snack-cart.js — interaction harness for "Gus's Snack Cart"
   (CCSS 2.NBT.B.5). Serves `mini tools/`; drives the real shell:
     • a round renders the gopher + story + big number sentence (a ± b = ?);
     • typing the DERIVED answer on the keypad → shell Check → celebrate + the
       "?" reveals the answer (.gsc-solved);
     • typing a wrong number → tryagain, "?" stays;
     • ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'gus-snack-cart.within-100.2-nbt-b-5';
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

  const url = `http://127.0.0.1:${PORT}/gus-snack-cart-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.GusSnackCartActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'gus-snack-cart.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.GusSnackCartActivity.round && document.querySelector('.gsc-eq'), { timeout: 4000 });
    await sleep(40);
  }
  const answer = () => page.evaluate(() => window.AddSub100Core.answerValue(window.GusSnackCartActivity.round));
  async function typeNum(n) {
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-key-clear'); if (c) c.click(); });
    for (const ch of String(n)) {
      await page.evaluate((d) => { const k = Array.from(document.querySelectorAll('.lcs-activity-key')).find(b => b.textContent.trim() === d && !b.classList.contains('lcs-activity-key-clear')); if (k) k.click(); }, ch);
      await sleep(15);
    }
    await sleep(30);
  }
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const solvedShown = () => page.evaluate(() => { const e = document.querySelector('.gsc-eq.gsc-solved .gsc-ans'); return e ? e.textContent.trim() : null; });
  const ansText = () => page.$eval('.gsc-ans', e => e.textContent.trim()).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.GusSnackCartActivity; return t && t._activityRow && document.querySelector('.gsc-eq') && document.querySelector('.lcs-activity-keypad'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Gus's Snack Cart", `header title "${title}"`);

    const Np = await page.evaluate(() => window.GusSnackCartActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.GusSnackCartActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    // a subtraction round: correct answer celebrates + reveals
    await force('r1');
    note(await page.$('.gsc-story') != null, 'no story line');
    note((await ansText()) === '?', 'the answer slot did not start as "?"');
    const a1 = await answer();
    await typeNum(a1); await check();
    note(await celebrated(), 'the correct answer did not celebrate');
    note(String(await solvedShown()) === String(a1), `the answer did not reveal (${await solvedShown()} vs ${a1})`);

    // an addition round: a wrong number → try-again, "?" stays
    await force('r6');
    const a6 = await answer();
    await typeNum(a6 + 1); await check();
    note(await triedAgain(), 'a wrong answer did not show try-again');
    note(!(await celebrated()), 'a wrong answer celebrated (must not)');
    note((await ansText()) === '?', 'the answer revealed after a WRONG attempt (must not)');
    await typeNum(a6); await check();
    note(await celebrated(), 'the correct answer did not celebrate after the wrong attempt');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('r8');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} gus-snack-cart/en — "${title}"`);
  } catch (e) {
    fails.push('gus-snack-cart/en: ' + e.message);
    console.log(`  FAIL gus-snack-cart/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`GUS-SNACK-CART LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('GUS-SNACK-CART LOCAL TEST PASSED — story + number sentence + keypad; correct = celebrate + reveal; wrong = try-again with "?" kept; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
