#!/usr/bin/env node
/* =====================================================================
   local-test-marlo-magnifier.js — interaction harness for "Marlo's
   Magnifier" (CCSS RL.1.3). Serves `mini tools/` + drives the real shell:

     • a round renders the trait clue + story lines + Read button + 3 detail
       cards;
     • tapping the SUPPORTING detail → shell Check → celebrate;
     • tapping a non-supporting (true) foil → tryagain, NO card marked
       correct/wrong (diffuse, no leak);
     • cards carry the detail TEXT only (no supports attribute);
     • tap-to-deselect; ≥7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'marlo-magnifier.trait-evidence.rl-1-3';
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

  const url = `http://127.0.0.1:${PORT}/marlo-magnifier-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MarloMagnifierActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'marlo-magnifier.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MarloMagnifierActivity.round && document.querySelector('.mgf-root'), { timeout: 4000 });
    await sleep(40);
  }
  const supId = () => page.evaluate(() => window.TraitEvidenceCore.oracle(window.MarloMagnifierActivity.round));
  const foilId = () => page.evaluate(() => { const r = window.MarloMagnifierActivity.round; return (r.details.filter(d => !d.supports)[0] || {}).id; });
  const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.mgf-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.MarloMagnifierActivity; return t && t._activityRow && document.querySelector('.mgf-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Marlo's Magnifier", `header title "${title}"`);

    /* variety/shuffle */
    const Np = await page.evaluate(() => window.MarloMagnifierActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.MarloMagnifierActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    /* structure */
    await force('brave');
    note(!!(await page.$('.mgf-clue')), 'no trait clue banner');
    note(await page.$$eval('.mgf-line', els => els.length) >= 3, 'story did not render >=3 lines');
    note(await page.$$eval('.mgf-opt', els => els.length) === 3, 'did not render 3 detail cards');
    const attrs = await page.$$eval('.mgf-opt', els => els.map(e => e.getAttribute('data-supports') || e.getAttribute('data-answer')).filter(Boolean));
    note(attrs.length === 0, 'a card leaks a supports/answer attribute');

    /* supporting detail → celebrate */
    await tap(await supId()); await check();
    note(await celebrated(), 'the supporting detail did not celebrate');

    /* foil → tryagain, no leak */
    await force('kind');
    await tap(await foilId()); await check();
    note(await triedAgain(), 'a foil did not show try-again');
    note(!(await celebrated()), 'a foil celebrated (must not)');
    const leak = await page.$$eval('.mgf-opt', els => els.filter(e => /mgf-correct|mgf-right|mgf-wrong|mgf-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');
    await tap(await supId()); await check();
    note(await celebrated(), 'the supporting detail did not celebrate after the foil attempt');

    /* tap-to-deselect */
    await force('honest');
    const s = await supId();
    await tap(s); note(await page.evaluate(() => !!window.MarloMagnifierActivity.sel), 'first tap did not select');
    await tap(s); note(await page.evaluate(() => !window.MarloMagnifierActivity.sel), 'second tap did not deselect');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('hardworking');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} marlo-magnifier/en — "${title}"`);
  } catch (e) {
    fails.push('marlo-magnifier/en: ' + e.message);
    console.log(`  FAIL marlo-magnifier/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MARLO-MAGNIFIER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('MARLO-MAGNIFIER LOCAL TEST PASSED — trait clue + story + Read + 3 detail cards; the supporting detail celebrates; foils = try-again with NO card marked (diffuse, no leak); cards carry no supports; tap-to-deselect; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
