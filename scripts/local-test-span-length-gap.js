#!/usr/bin/env node
/* =====================================================================
   local-test-span-length-gap.js — interaction harness for "Span's Length Gap"
   (CCSS 2.MD.A.4). Serves `mini tools/`; drives the real shell:
     • a round renders two labeled bars + the question;
     • typing the DERIVED difference on the keypad → shell Check → celebrate + reveal;
     • typing a wrong number → tryagain;
     • ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'span-length-gap.how-much-longer.2-md-a-4';
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

  const url = `http://127.0.0.1:${PORT}/span-length-gap-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SpanLengthGapActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'span-length-gap.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SpanLengthGapActivity.round && document.querySelector('.slg-bars'), { timeout: 4000 });
    await sleep(40);
  }
  const answer = () => page.evaluate(() => window.LengthGapCore.answerValue(window.SpanLengthGapActivity.round));
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
  const solved = () => page.evaluate(() => !!document.querySelector('.slg-q.slg-solved'));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SpanLengthGapActivity; return t && t._activityRow && document.querySelector('.slg-bars') && document.querySelector('.lcs-activity-keypad'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Span's Length Gap", `header title "${title}"`);

    const Np = await page.evaluate(() => window.SpanLengthGapActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.SpanLengthGapActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('ribbon');
    note(await page.$$eval('.slg-bar', els => els.length) === 2, 'did not render 2 bars');
    const a1 = await answer();
    await typeNum(a1); await check();
    note(await celebrated(), 'the correct difference did not celebrate');
    note(await solved(), 'the gap did not reveal on correct');

    await force('scarf');
    const a2 = await answer();
    await typeNum(a2 + 1); await check();
    note(await triedAgain(), 'a wrong difference did not show try-again');
    note(!(await celebrated()), 'a wrong difference celebrated (must not)');
    note(!(await solved()), 'the gap revealed after a WRONG attempt (must not)');
    await typeNum(a2); await check();
    note(await celebrated(), 'the correct difference did not celebrate after the wrong attempt');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('track');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} span-length-gap/en — "${title}"`);
  } catch (e) {
    fails.push('span-length-gap/en: ' + e.message);
    console.log(`  FAIL span-length-gap/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SPAN-LENGTH-GAP LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SPAN-LENGTH-GAP LOCAL TEST PASSED — two bars + keypad; correct difference celebrates + reveals; wrong = try-again with no reveal; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
