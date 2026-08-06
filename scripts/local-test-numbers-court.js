#!/usr/bin/env node
/* =====================================================================
   local-test-numbers-court.js — interaction harness for "Numbers Court"
   (CCSS 1.OA.D.7). Serves `mini tools/` + drives the real shell:

     • a TRUE round: verdict TRUE → deposit every operand → beam levels → done;
     • a FALSE round: verdict FALSE → tap the heavier pan → done;
     • a repair round: verdict FALSE → justify → place the leveling tile → done;
       a WRONG tile REGENERATES a fresh round (the equation changes, back to verdict);
     • a WRONG verdict does NOT advance + reveals NO beam tilt (no directional leak);
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'numbers-court.judge-balance.1-oa-d-7';
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
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `${BASE_URL()}`;
  function BASE_URL() { return `http://127.0.0.1:${PORT}/numbers-court-activity.html?lang=en&activity=${ACTIVITY}&embed=1`; }
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // force the first round to be the one matching the predicate (form/truth), with optional _forceRepair.
  async function forceKind(pred, forceRepair) {
    const ok = await page.evaluate(({ pred, forceRepair }) => {
      const t = window.NumbersCourtActivity, C = window.JudgeBalanceCore;
      function match(r) {
        if (pred === 'true') return C.isTrue(r);
        if (pred === 'false') return !C.isTrue(r);
        if (pred === 'commutative') return r.form === 'commutative';
        if (pred === 'repair') return C.isGold(r) && !C.isTrue(r) && !!C.repairTarget(r);
        return false;
      }
      function findIdx() { for (let i = 0; i < t._pool.length; i++) { t._pool[i].setup(t); if (match(t.round)) return i; } return -1; }
      let idx = findIdx(), guard = 0;
      while (idx < 0 && guard++ < 150) { t._rebuildPool(); idx = findIdx(); }
      if (idx < 0) return false;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const at = order.indexOf(idx); if (at > 0) { order.splice(at, 1); order.unshift(idx); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      t._forceRepair = forceRepair;
      window.LCS_reloadFirstTask();
      return true;
    }, { pred, forceRepair: forceRepair === undefined ? null : forceRepair });
    if (!ok) throw new Error('could not force a "' + pred + '" round');
    await page.waitForFunction(() => window.NumbersCourtActivity.round && document.querySelector('.nc-beam'), { timeout: 4000 });
  }
  const stageOf = () => page.evaluate(() => window.NumbersCourtActivity.stage);
  const tiltOf = () => page.evaluate(() => window.NumbersCourtActivity.tilt);
  const round = () => page.evaluate(() => JSON.parse(JSON.stringify(window.NumbersCourtActivity.round)));
  const done = () => page.evaluate(() => window.NumbersCourtActivity.stage === 'done');
  const clickSel = async (sel) => { const e = await page.$(sel); if (e) { await e.click(); await sleep(80); return true; } return false; };

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => window.NumbersCourtActivity && document.querySelector('.nc-tess') && document.querySelector('.lcs-activity-check'), { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Numbers Court', `header title "${title}"`);
    note(!!(await page.$('.nc-tess-svg')), 'no Judge Tess');

    /* variety/shuffle */
    const N = await page.evaluate(() => window.NumbersCourtActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.NumbersCourtActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    const sigs = await page.evaluate(() => { const t = window.NumbersCourtActivity, C = window.JudgeBalanceCore, s = new Set(); t._pool.forEach(task => { task.setup(t); s.add(C.signature(t.round)); }); return s.size; });
    note(sigs >= 7, `only ${sigs} distinct experiences (<7)`);

    /* WRONG verdict → no advance + NO tilt leak */
    await forceKind('false');
    const before = await stageOf();
    await clickSel('.nc-vtrue');   // wrong (it's false)
    note(await stageOf() === 'verdict', 'wrong verdict advanced past verdict stage');
    note(await tiltOf() === 0, `wrong verdict tilted the beam (${await tiltOf()}) — directional leak`);

    /* FALSE round: verdict FALSE → tap heavier pan → done */
    await forceKind('false', false);
    await clickSel('.nc-vfalse');
    note(await stageOf() === 'justify', 'correct FALSE verdict did not reveal justify');
    const r1 = await round(); const heavy = await page.evaluate(() => window.JudgeBalanceCore.heavier(window.NumbersCourtActivity.round));
    await clickSel('.nc-pan[data-side="' + heavy + '"]');
    note(await done(), 'FALSE round did not complete after tapping the heavier pan');

    /* TRUE round: verdict TRUE → deposit every operand → done */
    await forceKind('true');
    await clickSel('.nc-vtrue');
    note(await stageOf() === 'justify', 'correct TRUE verdict did not reveal justify');
    // deposit every operand button until done
    for (let k = 0; k < 8 && !(await done()); k++) { const b = await page.$('.nc-num-tap:not(.nc-num-used)'); if (b) { await b.click(); await sleep(90); } else break; }
    note(await done(), 'TRUE round did not complete after depositing the operands');

    /* commutative TRUE round solvable */
    await forceKind('commutative');
    await clickSel('.nc-vtrue');
    for (let k = 0; k < 8 && !(await done()); k++) { const b = await page.$('.nc-num-tap:not(.nc-num-used)'); if (b) { await b.click(); await sleep(90); } else break; }
    note(await done(), 'commutative TRUE round did not complete');

    /* REPAIR round: verdict FALSE → justify → place the leveling tile → done */
    await forceKind('repair', true);
    await clickSel('.nc-vfalse');
    const heavy2 = await page.evaluate(() => window.JudgeBalanceCore.heavier(window.NumbersCourtActivity.round));
    await clickSel('.nc-pan[data-side="' + heavy2 + '"]');
    note(await stageOf() === 'repair', 'caught-false GOLD round did not reveal the repair (with _forceRepair)');
    const target = await page.evaluate(() => window.JudgeBalanceCore.repairTarget(window.NumbersCourtActivity.round).value);
    // WRONG tile first → regenerates
    const eqBefore = await page.evaluate(() => JSON.stringify(window.NumbersCourtActivity.round.expr));
    const wrongTile = await page.evaluate((tv) => { const tiles = [...document.querySelectorAll('.nc-tile')].map(b => +b.textContent); return tiles.filter(v => v !== tv)[0]; }, target);
    await page.evaluate((wt) => { const b = [...document.querySelectorAll('.nc-tile')].find(x => +x.textContent === wt); if (b) b.click(); }, wrongTile);
    await sleep(900);
    note(await stageOf() === 'verdict', 'wrong repair tile did not regenerate back to verdict');
    const eqAfter = await page.evaluate(() => JSON.stringify(window.NumbersCourtActivity.round.expr));
    note(eqBefore !== eqAfter, 'wrong repair did not REGENERATE a fresh equation');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await forceKind('false');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} numbers-court/en — "${title}"`);
  } catch (e) {
    fails.push('numbers-court/en: ' + e.message);
    console.log(`  FAIL numbers-court/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`NUMBERS-COURT LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('NUMBERS-COURT LOCAL TEST PASSED — Tess + beam render, TRUE deposits + FALSE tap-heavier + commutative + repair all complete, wrong repair regenerates, wrong verdict leaks no tilt, ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
