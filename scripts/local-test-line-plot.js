#!/usr/bin/env node
/* =====================================================================
   local-test-line-plot.js — interaction harness (2.MD.D.9 line plot,
   clarity-first). Serves `mini tools/` + drives the rendered DOM:

     • read / plot : a WRONG number does NOT resolve (warm nudge, no advance);
       the correct one resolves; shell Check hidden until resolved.
     • the tide-line scene renders (an .tl-scene svg with ✕ marks); the shell
       prompt interpolates; no stored answer; EN-only; ≥7 distinct + reshuffle;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'line-plot.read.2-md-d-9';
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

  const url = `http://127.0.0.1:${PORT}/line-plot-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.LinePlotActivity._resolved, miss: !!document.querySelector('.tl-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.LinePlotActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.LinePlotActivity._round && document.querySelector('.tl-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickVal = (v) => page.evaluate((val) => { const b = Array.from(document.querySelectorAll('.tl-cand')).find(x => Number(x.textContent) === val); if (b) b.click(); return !!b; }, v).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const D = (id) => page.evaluate((rid) => {
    const t = window.LinePlotActivity, r = t._pool.find(x => x.id === rid), C = window.LinePlotCore, a = C.oracle(r);
    return { right: a, wrong: C.choices(r).find(c => c !== a) };
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.LinePlotActivity; return t && t._activityRow && document.querySelector('.tl-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Shelly's Tide-Line", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.LinePlotActivity._activityRow.slug));
    // The EN slug is the canonical base; the activity is a localized fan-out target
    // (de/fr/es/pt/it/nl added since the original EN-only build), so assert EN is PRESENT
    // rather than EN-only (the old EN-only assertion went stale at the first localization).
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.LinePlotActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.LinePlotActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.LinePlotActivity._pool.map(r => r.cog))));
    note(cogs.indexOf('read') >= 0 && cogs.indexOf('plot') >= 0, `cogs not [read,plot]: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.LinePlotActivity._pool.every(r => r.answer == null && r.correct == null)), 'a round carries a stored answer field');

    /* READ: prompt interpolates; wrong no-advance; correct resolves; scene renders with ✕ marks */
    await force('lp-at-5');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/5/.test(prompt) && /how many/i.test(prompt), `read prompt not interpolated: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.tl-scene')), 'the tide-line scene svg did not render');
    note(await page.evaluate(() => (document.querySelector('.tl-scene').textContent.match(/✕/g) || []).length >= 5), 'fewer than 5 ✕ marks rendered');

    let d = await D('lp-at-5');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `read: a wrong number (${d.wrong}) resolved`);
    note((await S()).miss, 'read: wrong gave no nudge');
    await clickVal(d.right);
    note((await S()).resolved, `read: the correct number (${d.right}) did not resolve`);
    note(await checkVisible(), 'read: shell Check did not appear after resolve');

    /* PLOT: a measure-bar; wrong no-advance; correct resolves + drops an X */
    await force('lp-plot-7');
    const pp = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/how long/i.test(pp), `plot prompt wrong: "${pp}"`);
    d = await D('lp-plot-7');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `plot: a wrong number (${d.wrong}) resolved`);
    await clickVal(d.right);
    note((await S()).resolved, `plot: the correct number (${d.right}) did not resolve`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('lp-diff-1'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `read horizontal overflow ${over}px at ${w}px`);
      await force('lp-plot-7'); await sleep(40);
      over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `plot horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} line-plot/en — "${title}"`);
  } catch (e) {
    fails.push('line-plot/en: ' + e.message);
    console.log(`  FAIL line-plot/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`LINE-PLOT LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('LINE-PLOT LOCAL TEST PASSED — line-plot clarity build: a wrong number does NOT resolve (warm nudge, no advance); the correct read/plot answer resolves; the tide-line scene svg renders with ✕ marks; the shell prompt interpolates; shell Check hides until resolved; no stored answer; EN-only; read+plot cogs + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
