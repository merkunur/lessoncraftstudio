#!/usr/bin/env node
/* =====================================================================
   local-test-shades.js — interaction harness for "Pesto's Soup Stall"
   (L.1.5.d). Serves `mini tools/` and drives the shell by clicking the
   RENDERED DOM, per cog:

     • pick   : a same-family WRONG-rank word does NOT resolve (directional
       nudge, no advance, no shell try-again); the right-strength word resolves.
     • order  : tapping the strongest first does NOT advance (directional
       nudge); tapping weakest→strongest resolves.
     • bound  : a word outside the bounds does NOT resolve; the between word does.
     • manner : a wrong manner does NOT resolve; the context-matched one does.
     • shell Check hidden until resolved; no stored answer/correct in the round;
       EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'shades.pick.l-1-5-d';
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

  const url = `http://127.0.0.1:${PORT}/shades-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.ShadesActivity._resolved, miss: !!document.querySelector('.sh-line.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ShadesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ShadesActivity._round && document.querySelector('.sh-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickText = (txt) => page.evaluate((s) => { const b = Array.from(document.querySelectorAll('.sh-cand')).find(x => x.textContent === s && !x.classList.contains('gone')); if (b) b.click(); return !!b; }, txt).then(() => sleep(40));
  const D = (id) => page.evaluate((rid) => {
    const t = window.ShadesActivity, r = t._pool.find(x => x.id === rid), Core = window.ShadesCore, ws = Core.words(r);
    const o = { words: ws.map(w => ({ text: w.text, rank: w.rank })) };
    if (r.cog === 'pick') { o.ans = ws.find(w => w.rank === r.requiredRank).text; o.wrong = ws.find(w => w.rank !== r.requiredRank).text; }
    if (r.cog === 'bound') { const bi = Core.boundOracle(r); o.ans = ws[bi].text; o.wrong = ws.find((w, i) => i !== bi).text; }
    if (r.cog === 'manner') { o.ans = Core.wordById(r, r.answerId).text; o.wrong = ws.find(w => w.id !== r.answerId).text; }
    if (r.cog === 'order') o.seq = Core.orderOracle(r).map(id => Core.wordById(r, id).text);
    return o;
  }, id);
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ShadesActivity; return t && t._activityRow && document.querySelector('.sh-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pesto's Soup Stall", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.ShadesActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.ShadesActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ShadesActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.ShadesActivity._pool.map(r => r.cog))));
    note(cogs.length >= 4, `only ${cogs.length} cogs: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.ShadesActivity._pool.every(r => r.answer == null && r.correct == null && r.correctIndex == null)), 'a round carries a stored answer/correct field');

    /* PICK: Check hidden; wrong-rank does NOT resolve; right-strength resolves */
    await force('pick-soup-low');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    let d = await D('pick-soup-low');
    await clickText(d.wrong);
    note(!(await S()).resolved, `pick: a same-family wrong-rank word (${d.wrong}) resolved`);
    note((await S()).miss, 'pick: wrong gave no directional nudge');
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'pick wrong showed the shell try-again (must be a warm nudge)');
    await clickText(d.ans);
    note((await S()).resolved, `pick: the right-strength word (${d.ans}) did not resolve`);
    note(await checkVisible(), 'pick: shell Check did not appear after resolve');

    /* ORDER: strongest-first does NOT advance; weakest→strongest resolves */
    await force('order-temp');
    d = await D('order-temp');
    await clickText(d.seq[d.seq.length - 1]);   // strongest first
    note(!(await S()).resolved, 'order: tapping the strongest first resolved');
    note((await S()).miss, 'order: wrong-order tap gave no nudge');
    for (const w of d.seq) { await clickText(w); }   // weakest→strongest
    note((await S()).resolved, 'order: weakest→strongest did not resolve');

    /* BOUND: outside the bounds does NOT resolve; the between word does */
    await force('bound-size');
    d = await D('bound-size');
    await clickText(d.wrong);
    note(!(await S()).resolved, `bound: an out-of-bounds word (${d.wrong}) resolved`);
    await clickText(d.ans);
    note((await S()).resolved, `bound: the between word (${d.ans}) did not resolve`);

    /* MANNER: wrong manner does NOT resolve; the context-matched one does */
    await force('manner-shy');
    d = await D('manner-shy');
    await clickText(d.wrong);
    note(!(await S()).resolved, `manner: a wrong manner (${d.wrong}) resolved`);
    await clickText(d.ans);
    note((await S()).resolved, `manner: the right manner (${d.ans}) did not resolve`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('pick-voice-high'); await sleep(50);
      const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} shades/en — "${title}"`);
  } catch (e) {
    fails.push('shades/en: ' + e.message);
    console.log(`  FAIL shades/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`SHADES LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('SHADES LOCAL TEST PASSED — all 4 cogs: same-family wrong-rank / out-of-bounds / wrong-order / wrong-manner all FAIL (directional nudge, no advance, no shell try-again); the right shade / order / between / manner all resolve; shell Check hides until resolved; no stored answer; EN-only; ≥4 cogs + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
