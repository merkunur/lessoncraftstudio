#!/usr/bin/env node
/* =====================================================================
   local-test-pond-juice.js — interaction harness for "Pippa's Pond-Juice Lab"
   (CCSS 3.MD.A.2). Serves `mini tools/` + drives the shell:

     • SCALE-READER: Pour/Look → reveal → tap the level on the number-strip →
       correct (the result spoken); a wrong report is NOT accepted.
     • LEVEL HIDDEN DURING POUR: before the reveal the frosted overlay is opaque
       (the fill is hidden) + there is NO report-strip; after the reveal the
       frost clears + the strip appears.
     • NUMERAL-MATCH FAILS: on an estimate-pour round (order 6, actual 5),
       reporting the ORDER "6" is WRONG; reporting the revealed "5" is correct.
     • NON-LEAKING WRONG: a wrong reading → a "what does it say?" re-ask, no
       number highlighted.
     • CONSERVATION: compare/diff-scale pick the higher-VALUE cup; on diff-scale
       the SHORTER column is MORE (picking the taller is wrong).
     • ≥7 rounds + 4 cogs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pond-juice.pour-measure.3-md-a-2';
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

  const url = `http://127.0.0.1:${PORT}/pond-juice-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const st = () => page.evaluate(() => { const a = window.PondJuiceActivity; return { solved: a.solved, msg: a.msg, revealed: a.cstate.revealed }; });
  const clickPour = () => page.evaluate(() => { const b = document.querySelector('.pj-pour'); if (b) b.click(); }).then(() => sleep(25));
  const clickNum = (v) => page.evaluate((n) => { const b = [...document.querySelectorAll('.pj-num')].find(x => x.textContent === String(n)); if (b) { b.click(); return true; } return false; }, v).then(() => sleep(25));
  const clickPick = (i) => page.evaluate((idx) => { const b = document.querySelectorAll('.pj-pick')[idx]; if (b) b.click(); }, i).then(() => sleep(25));
  const frostOpacity = () => page.evaluate(() => { const f = document.querySelector('.pj-frost'); return f ? parseFloat(f.getAttribute('opacity')) : -1; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PondJuiceActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pond-juice.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PondJuiceActivity.round && document.querySelector('.pj-root .pj-onebox, .pj-root .pj-twobox'), { timeout: 4000 });
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.PondJuiceActivity; return t && t._activityRow && document.querySelector('.pj-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pippa's Pond-Juice Lab", `header title "${title}"`);

    /* variety/shuffle + ≥7 rounds + 4 cogs */
    const N = await page.evaluate(() => window.PondJuiceActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PondJuiceActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const cogs = await page.evaluate(() => new Set(window.PondJuiceActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs === 4, `expected 4 cogs, got ${cogs}`);

    /* LEVEL HIDDEN DURING POUR: frosted opaque + no strip pre-reveal */
    await force('est-six-is-five');
    note(await frostOpacity() > 0.9, 'the beaker is NOT frosted before the reveal (the level is visible)');
    let hasStrip = await page.evaluate(() => !!document.querySelector('.pj-strip'));
    note(!hasStrip, 'the report-strip is present BEFORE the reveal (the read should follow the pour)');

    /* SCALE-READER + NUMERAL-MATCH FAILS: order 6, actual 5 */
    await clickPour();
    let s = await st(); note(s.revealed, 'Pour did not reveal the beaker');
    note(await frostOpacity() < 0.1, 'the beaker did not clear on the reveal (frost still opaque)');
    hasStrip = await page.evaluate(() => !!document.querySelector('.pj-strip')); note(hasStrip, 'no report-strip after the reveal');
    await clickNum(6); s = await st(); note(!s.solved, 'reporting the ORDER numeral 6 was accepted (numeral-matching not defeated)');
    note(/what does it say/i.test(s.msg || ''), `the wrong message is not the non-leaking re-ask ("${s.msg}")`);
    await page.evaluate(() => { window.__spoke = []; });
    await clickNum(5); s = await st(); note(s.solved, 'reporting the revealed level 5 did not solve');
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/five|just right/i.test(spoke), `the result was not spoken on a correct read ("${spoke}")`);
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a correct read');

    /* read-level: reveal + read 7 */
    await force('read-seven'); await clickPour(); await clickNum(7); s = await st(); note(s.solved, 'the read-level round did not solve at 7');

    /* CONSERVATION compare: pick the higher-value cup (cup0=6 > cup1=4) */
    await force('compare-six-four'); await clickPick(1); s = await st(); note(!s.solved, 'picking the lower-value cup was accepted in compare');
    await force('compare-six-four'); await clickPick(0); s = await st(); note(s.solved, 'picking the higher-value cup did not solve compare');

    /* DIFF-SCALE: the SHORTER column is MORE (cup0 tall=3, cup1 short=7) */
    await force('diff-big-small'); await clickPick(0); s = await st(); note(!s.solved, 'picking the TALLER column (lower value) was accepted in diff-scale');
    await force('diff-big-small'); await clickPick(1); s = await st(); note(s.solved, 'picking the shorter-but-MORE cup did not solve diff-scale');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('est-six-is-five'); await clickPour(); await sleep(40);   // the revealed strip (0-10) is the worst case
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} pond-juice/en — "${title}"`);
  } catch (e) {
    fails.push('pond-juice/en: ' + e.message);
    console.log(`  FAIL pond-juice/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`POND-JUICE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('POND-JUICE LOCAL TEST PASSED — the level is HIDDEN during the pour (frosted opaque, no strip) → reveals on Pour (frost clears, strip appears); the scale-reader reports the revealed level → correct (spoken); the ORDER numeral is WRONG (the answer is the revealed level); non-leaking wrong; compare/diff pick the higher-VALUE cup (diff: the shorter column is more); ≥7 rounds + 4 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
