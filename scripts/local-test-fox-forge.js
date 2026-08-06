#!/usr/bin/env node
/* =====================================================================
   local-test-fox-forge.js — interaction harness for "Fox & Forge / Pip's
   Chocolate Forge" (3.NF.A.1). Serves `mini tools/` + drives the shell:

     • BUILD: pick the size-correct mold → forge a pieces → hand over → correct.
     • WRONG SIZE: a foil mold (b'≠b) → forge → hand over → NOT correct; box clears.
     • COMMIT IS SPENT: forge < a → hand over → NOT correct; the box clears (no
       re-probing the same order).
     • EQUAL PARTS: the unequal mold REFUSES (forging it places nothing) → switch
       to the fair mold → build → correct.
     • NAME-UNIT: tap 1/b → correct; a wrong unit fraction → NOT correct.
     • CROSS-SHAPE: affirm → advances (non-scored).
     • >=7 cogs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'fox-forge.fraction.3-nf-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

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

  const url = `http://127.0.0.1:${PORT}/fox-forge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => { const a = window.FoxForgeActivity; return { solved: a.solved, roundId: a.round && a.round.id, placed: a.placed.length, active: a.activeMold, msg: a.msg }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.FoxForgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'fox-forge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.FoxForgeActivity.round && document.querySelector('.ff-root'), { timeout: 4000 });
    await sleep(40);
  }
  const sel = (b) => page.evaluate((mb) => window.FoxForgeActivity._selectMold(mb), b);
  const forge = (n) => page.evaluate((k) => { const a = window.FoxForgeActivity; for (let i = 0; i < k; i++) a._forge(); }, n);
  const hand = () => page.evaluate(() => window.FoxForgeActivity._handOver());
  const choose = (o) => page.evaluate((c) => window.FoxForgeActivity._chooseUnit(c), o);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.FoxForgeActivity; return t && t._activityRow && document.querySelector('.ff-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pip's Chocolate Forge", `header title "${title}"`);

    /* >=7 cogs + reshuffle */
    const N = await page.evaluate(() => window.FoxForgeActivity._pool.length);
    const cogs = await page.evaluate(() => new Set(window.FoxForgeActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const ids = await page.evaluate((c) => { const t = window.FoxForgeActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* BUILD: size-correct mold + forge a → hand over → correct */
    await force('build-three-fourths');           /* a=3, b=4 */
    await sel(4); await forge(3); let s = await S();
    note(s.placed === 3 && s.active === 4, `build: placed=${s.placed} active=${s.active} (want 3 of mold 4)`);
    await hand(); s = await S();
    note(s.solved, 'build: a correct 3/4 build did not hand over correct');

    /* WRONG SIZE: a foil mold → hand over → not correct; box clears */
    await force('build-three-fourths');
    await sel(2); await forge(3); await hand(); s = await S();
    note(!s.solved, 'wrong-size: a foil mold (1/2) was accepted for 3/4');
    note(s.placed === 0, 'wrong-size: the box did not clear on a wrong hand-over (commit not spent)');

    /* COMMIT IS SPENT: forge < a → hand over → not correct + cleared */
    await force('build-five-sixths');             /* a=5, b=6 */
    await sel(6); await forge(2); await hand(); s = await S();
    note(!s.solved, 'commit-prober: a short build (2 of 5) was accepted');
    note(s.placed === 0, 'commit-prober: the box did not clear (re-probing the same order is possible)');

    /* EQUAL PARTS: the unequal mold refuses; the fair mold builds */
    await force('equal-parts-fourths');           /* a=3, b=4, has an 'unequal' mold */
    await sel('unequal'); await forge(2); s = await S();
    note(s.placed === 0 && /equal/i.test(s.msg || ''), `equal-parts: the unequal mold did not refuse (placed=${s.placed}, msg="${s.msg}")`);
    await sel(4); await forge(3); await hand(); s = await S();
    note(s.solved, 'equal-parts: building 3/4 with the fair mold did not succeed');

    /* NAME-UNIT: tap 1/b → correct; a wrong unit fraction → not */
    await force('name-unit-thirds');              /* b=3 → 1/3 */
    await choose([1, 3]); s = await S();
    note(s.solved, 'name-unit: tapping 1/3 was not accepted');
    await force('name-unit-thirds');
    await choose([1, 2]); s = await S();
    note(!s.solved, 'name-unit: a wrong unit fraction (1/2) was accepted');

    /* CROSS-SHAPE: affirm advances (non-scored) */
    await force('cross-shape-half');
    await page.evaluate(() => window.FoxForgeActivity._affirm()); s = await S();
    note(s.solved, 'cross-shape: the affirm did not advance');

    /* shell Check celebrates after a build is handed over (commit sets solved) */
    await force('build-half'); await sel(2); await forge(1); await hand();
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a build');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('the-whole-three-fourths'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} fox-forge/en — "${title}"`);
  } catch (e) {
    fails.push('fox-forge/en: ' + e.message);
    console.log(`  FAIL fox-forge/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`FOX-FORGE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('FOX-FORGE LOCAL TEST PASSED — picking the size-correct mold + forging a pieces + handing over builds a/b (correct); a foil mold is rejected + the box clears (commit is spent); a short build is rejected + clears; the unequal mold REFUSES (forges nothing) then the fair mold builds; tapping 1/b names the unit + a wrong unit fraction does not; cross-shape advances; shell Check celebrates; >=7 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
