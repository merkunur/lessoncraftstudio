#!/usr/bin/env node
/* =====================================================================
   local-test-halfway-harbors.js — interaction harness (3.NBT.A.1, clarity
   rebuild). Serves `mini tools/` + drives the rendered DOM:

     • nearest / big-trail : a NON-nearest harbor does NOT resolve (warm
       nudge, no advance); the nearest harbor resolves; shell Check hidden
       until resolved.
     • halfway : a non-midpoint buoy does NOT resolve; the true midpoint does.
     • the number-line renders (an .hh-nl svg + a boat numeral); no stored
       answer in the round; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'halfway-harbors.nearest.3-nbt-a-1';
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

  const url = `http://127.0.0.1:${PORT}/halfway-harbors-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.HalfwayHarborsActivity._resolved, miss: !!document.querySelector('.hh-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.HalfwayHarborsActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.HalfwayHarborsActivity._round && document.querySelector('.hh-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickVal = (v) => page.evaluate((val) => { const b = Array.from(document.querySelectorAll('.hh-cand')).find(x => Number(x.textContent) === val); if (b) b.click(); return !!b; }, v).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const D = (id) => page.evaluate((rid) => {
    const t = window.HalfwayHarborsActivity, r = t._pool.find(x => x.id === rid), C = window.HalfwayHarborsCore, oi = C.oracle(r);
    if (r.cog === 'halfway') return { right: r.buoyMarkers[oi], wrong: r.buoyMarkers.find((m, i) => i !== oi) };
    return { right: r.harbors[oi], wrong: r.harbors.find((h, i) => i !== oi) };
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.HalfwayHarborsActivity; return t && t._activityRow && document.querySelector('.hh-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Halfway Harbors', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.HalfwayHarborsActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en base slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.HalfwayHarborsActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.HalfwayHarborsActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.HalfwayHarborsActivity._pool.map(r => r.cog))));
    note(cogs.length >= 3, `only ${cogs.length} cogs: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.HalfwayHarborsActivity._pool.every(r => r.answer == null && r.nearest == null && r.midpoint == null)), 'a round carries a stored answer field');

    /* NEAREST: Check hidden; a non-nearest harbor does NOT resolve; the nearest does; the number-line renders */
    await force('hh-near-63');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.hh-nl')), 'the number-line svg did not render');
    let d = await D('hh-near-63');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `nearest: a non-nearest harbor (${d.wrong}) resolved`);
    note((await S()).miss, 'nearest: wrong gave no nudge');
    await clickVal(d.right);
    note((await S()).resolved, `nearest: the nearest harbor (${d.right}) did not resolve`);
    note(await checkVisible(), 'nearest: shell Check did not appear after resolve');

    /* BIG-TRAIL */
    await force('hh-big-247');
    d = await D('hh-big-247');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `big-trail: a non-nearest lighthouse (${d.wrong}) resolved`);
    await clickVal(d.right);
    note((await S()).resolved, `big-trail: the nearest lighthouse (${d.right}) did not resolve`);

    /* HALFWAY */
    await force('hh-half-40-50');
    d = await D('hh-half-40-50');
    await clickVal(d.wrong);
    note(!(await S()).resolved, `halfway: a non-midpoint buoy (${d.wrong}) resolved`);
    await clickVal(d.right);
    note((await S()).resolved, `halfway: the midpoint buoy (${d.right}) did not resolve`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('hh-big-480'); await sleep(50);
      const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} halfway-harbors/en — "${title}"`);
  } catch (e) {
    fails.push('halfway-harbors/en: ' + e.message);
    console.log(`  FAIL halfway-harbors/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`HALFWAY-HARBORS LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('HALFWAY-HARBORS LOCAL TEST PASSED — number-line clarity rebuild: a non-nearest harbor / non-midpoint buoy do NOT resolve (warm nudge, no advance); the nearest harbor + the midpoint buoy resolve; the number-line svg renders; shell Check hides until resolved; no stored answer; EN-only; ≥3 cogs + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
