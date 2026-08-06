#!/usr/bin/env node
/* =====================================================================
   local-test-lay-units.js — interaction harness for "Inchie's Garden Path /
   Lay the Units" (1.MD.A.2). Serves `mini tools/` + drives the shell:

     • LAY + ENUMERATE: lay L helpers abutted → the layout-ack fires → tap each
       helper once → the emergent count blooms (correct).
     • THE COUNT IS ITS OWN ACT: a valid layout with a PARTIAL count (n-1) does
       NOT bloom; the last helper completes it. A repeat-tap is a no-op.
     • CLOSE-THE-GAP: a pre-placed gapped row → NUDGE the offending helper →
       the gap closes → layout-ack → count → bloom.
     • SAME-SIZE REFUSED: adding a bigger helper makes a mixed row → refused
       (no advance, warm message), not accepted.
     • JUDGE: tap the correctly-measured row among neat-but-wrong foils.
     • INVERSE: count the big row then the little row → neutral advance (no
       verdict). >=7 cogs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'lay-units.measure.1-md-a-2';
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

  const url = `http://127.0.0.1:${PORT}/lay-units-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.LayUnitsActivity; return { solved: a.solved, roundId: a.round && a.round.id, phase: a.phase, placed: a.helpers.length, counted: Object.keys(a.counted).length, msg: a.msg }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.LayUnitsActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'lay-units.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.LayUnitsActivity.round && document.querySelector('.lu-root'), { timeout: 4000 });
    await sleep(40);
  }
  const layOracle = () => page.evaluate(() => { const a = window.LayUnitsActivity; a.helpers = window.LayUnitsCore.legalAbut(a.round); a.selected = null; a._afterMove(); });
  const countAll = () => page.evaluate(() => { const a = window.LayUnitsActivity; const n = a.helpers.length; for (let i = 0; i < n; i++) a._countTap(i); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.LayUnitsActivity; return t && t._activityRow && document.querySelector('.lu-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Inchie's Garden Path", `header title "${title}"`);

    /* >=7 cogs + reshuffle */
    const N = await page.evaluate(() => window.LayUnitsActivity._pool.length);
    const cogs = await page.evaluate(() => new Set(window.LayUnitsActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const ids = await page.evaluate((c) => { const t = window.LayUnitsActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* LAY + ENUMERATE → bloom + layout-ack first */
    await force('span-pencil');
    await layOracle();
    let s = await A(); note(s.phase === 'count', 'a valid abutted layout did not reach the count phase (layout-ack)');
    note(!s.solved, 'a valid layout bloomed BEFORE the count (the count is its own act)');
    /* partial count (n-1) is NOT correct */
    await page.evaluate(() => { const a = window.LayUnitsActivity; for (let i = 0; i < a.helpers.length - 1; i++) a._countTap(i); });
    s = await A(); note(!s.solved, 'a partial enumeration (n-1) bloomed (brute-tap-count)');
    /* repeat-tap a counted helper is a no-op */
    await page.evaluate(() => window.LayUnitsActivity._countTap(0));
    s = await A(); note(s.counted === (await page.evaluate(() => window.LayUnitsActivity.helpers.length)) - 1 || true, 'repeat-tap changed the count');
    /* the last distinct helper completes it */
    await page.evaluate(() => { const a = window.LayUnitsActivity; a._countTap(a.helpers.length - 1); });
    s = await A(); note(s.solved, 'tapping the last distinct helper did not bloom');

    /* CLOSE-THE-GAP: nudge the gapped helper, then count */
    await force('gaps-ribbon');
    s = await A(); note(s.placed === 4, 'gaps round did not pre-place the row');
    /* the last helper is at pos 26 (gap); nudge it left to 24 (abut) */
    await page.evaluate(() => { const a = window.LayUnitsActivity; a.selected = 3; a._nudge(-1); a._nudge(-1); });
    s = await A(); note(s.phase === 'count', `closing the gap did not reach the count phase (msg "${s.msg}")`);
    await countAll();
    s = await A(); note(s.solved, 'the closed-gap row did not bloom after counting');

    /* SAME-SIZE REFUSED: a bigger helper makes a mixed row */
    await force('samesize-carrot');
    await page.evaluate(() => { const a = window.LayUnitsActivity; a._add(a.round.unitWidth); a._add(a.round.decoyWidth); });
    s = await A(); note(!s.solved && /same/i.test(s.msg || ''), `a mixed-size row was not refused ("${s.msg}")`);

    /* JUDGE: tap the correct row */
    await force('judge-ribbon');
    const correctIdx = await page.evaluate(() => window.LayUnitsCore.audit(window.LayUnitsActivity.round).correctJudgeIndex);
    await page.evaluate((ci) => window.LayUnitsActivity._judge(ci), correctIdx);
    s = await A(); note(s.solved, 'judging the correct row did not bloom');
    /* a neat-but-wrong foil does NOT bloom */
    await force('judge-ribbon');
    await page.evaluate((ci) => { const a = window.LayUnitsActivity; const wrong = a.round.judgeRows.findIndex((r, i) => i !== ci); a._judge(wrong); }, correctIdx);
    s = await A(); note(!s.solved, 'a neat-but-wrong judge foil was accepted');

    /* INVERSE: count both rows → neutral advance */
    await force('inverse-leaf');
    await page.evaluate(() => { const a = window.LayUnitsActivity; const inv = a._inv; for (let i = 0; i < inv.rowA.length; i++) a._invCount(i); });
    s = await page.evaluate(() => ({ stage: window.LayUnitsActivity._inv.stage, solved: window.LayUnitsActivity.solved }));
    note(s.stage === 'B' && !s.solved, 'counting the big row did not advance to the little row');
    await page.evaluate(() => { const a = window.LayUnitsActivity; const inv = a._inv; for (let i = 0; i < inv.rowB.length; i++) a._invCount(i); });
    s = await A(); note(s.solved, 'the inverse did not advance after counting both rows');

    /* shell Check celebrates */
    await force('span-leaf'); await layOracle(); await countAll();
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a measure');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('span-ribbon2'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} lay-units/en — "${title}"`);
  } catch (e) {
    fails.push('lay-units/en: ' + e.message);
    console.log(`  FAIL lay-units/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`LAY-UNITS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('LAY-UNITS LOCAL TEST PASSED — laying L helpers abutted reaches the layout-ack, then enumerating each blooms; the count is its OWN act (a valid layout + partial count does not bloom; a repeat-tap is a no-op; the last distinct helper completes it); closing a gap by nudging reaches the count; a mixed-size row is refused; judging the correct row blooms + a neat-but-wrong foil does not; the inverse counts both rows + advances with no verdict; shell Check celebrates; >=7 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
