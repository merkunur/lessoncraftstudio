#!/usr/bin/env node
/* =====================================================================
   local-test-sort-bins.js — local interaction harness for the E3
   sort/drag-to-bin activity (no Next stack needed).

   Serves `mini tools/` at /mini-tools/ and drives the standalone
   sort-bins-activity.html with puppeteer to exercise the REAL drag path:

     • renders (pile + bins + tiles present) per locale;
     • per-locale CORE strings — the 4 family bin labels render the locale's
       localized text (not a raw key, not English in a non-EN locale);
     • DRAG interaction (page.mouse → pointer events): a full CORRECT sort
       locks the board (celebration); a deliberate WRONG drop paints the
       coral mark and does NOT celebrate;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + pass-2 order
       ≠ pass-1 (same set, order-only);
     • basic mobile overflow at 280/360/412/768 (no horizontal scroll).

   Usage:
     node scripts/local-test-sort-bins.js                 # all 11 locales
     node scripts/local-test-sort-bins.js --locales=en,de --shot
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
/* Both E3 coordinates on the shared engine: sort-by-sides is the G1
   regression proof (it must still play exactly as before after the core
   extension); defining-attributes is the new 1.G.A.1 mechanic. */
const ACTIVITIES = [
  { id: 'sort-bins.sort-by-sides.2-g-a-1', mode: 'sides' },
  { id: 'sort-bins.defining-attributes.1-g-a-1', mode: 'defining' },
];
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'sort-bins');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/' || p === '/sort-bins-activity.html') file = path.join(MINI, 'sort-bins-activity.html');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

/* the localized bin-label SoT, read straight from the core (so the harness
   asserts against the same strings the engine ships). */
function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'sort-bins-core.js'), 'utf8');
  const win = {}; new Function('window', src)(win);
  return win.SortBinsCore.strings;
}

(async () => {
  const STR = coreStrings();
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };

  /* the localized labels a bin may legitimately show, per mode:
     • sides    → one of the 4 family labels
     • defining → one of the 4 positive labels OR the 4 negative labels
       (the target box + the "not" box; the target rotates per round). */
  function expectedLabels(mode, loc) {
    const pos = ['binTriangles', 'binQuadrilaterals', 'binPentagons', 'binHexagons'];
    const neg = ['binNotTriangles', 'binNotQuadrilaterals', 'binNotPentagons', 'binNotHexagons'];
    const keys = (mode === 'defining') ? pos.concat(neg) : pos;
    return keys.map(k => (STR[k] && (STR[k][loc] || STR[k].en))).filter(Boolean);
  }

  for (const loc of LOCALES) {
    let locFail = false;
    for (const act of ACTIVITIES) {
      const tag = `${loc}/${act.mode}`;
      const page = await browser.newPage();
      await page.setViewport({ width: 412, height: 900 });
      const errs = [];
      // ignore harness-only network 404s (favicon, optional audio inventory) — they
      // don't occur on the real Next route; we only care about JS errors.
      const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
      page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
      page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
      const url = `${BASE}/sort-bins-activity.html?lang=${loc}&activity=${act.id}&embed=1`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await page.waitForFunction(() => {
          const t = window.SortBinsActivity;
          return t && t._activityRow && document.querySelector('.sb-tile') && document.querySelector('.sb-bin-label');
        }, { timeout: 15000 });

        /* mode actually entered must match the manifest's intent */
        const mode = await page.evaluate(() => window.SortBinsActivity.mode);
        note(mode === act.mode, `${tag}: core entered mode "${mode}", expected "${act.mode}"`);

        /* defining mode: the in-iframe title must be the defining title (proves
           the synchronous id-based string swap reached the shell header). */
        if (act.mode === 'defining') {
          const h1 = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
          const expTitle = (STR.titleDefining && (STR.titleDefining[loc] || STR.titleDefining.en)) || '';
          note(h1 === expTitle, `${tag}: header title "${h1}" ≠ defining title "${expTitle}"`);
        }

        /* 1. bin labels render the locale's localized strings (per mode) */
        const labels = await page.$$eval('.sb-bin-label', els => els.map(e => e.textContent.trim()));
        const expected = expectedLabels(act.mode, loc);
        labels.forEach(l => note(expected.indexOf(l) !== -1,
          `${tag}: bin label "${l}" is not one of this locale's localized labels [${expected.join(', ')}]`));
        note(labels.length >= 2, `${tag}: only ${labels.length} bins rendered`);

        /* 2. variety/shuffle over 2 passes */
        const N = (await page.evaluate(() => window.SortBinsActivity._pool.length));
        const ids = await page.evaluate((count) => {
          const t = window.SortBinsActivity, out = [];
          for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); }
          return out;
        }, 2 * N);
        const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
        const distinct = new Set(p1).size;
        note(distinct >= 7, `${tag}: only ${distinct} distinct rounds (<7)`);
        note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not the same set (order-only violated)`);
        note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical to pass-1 (no reshuffle)`);

        /* 3. DRAG interaction. Re-mount round 0 via the shell's reload hook so
              we sort a known board. The correct bin is mode-specific:
              sides → the family bin matching side count; defining → bin 0 (the
              target box) iff the tile IS the target, else bin 1. */
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        await page.waitForFunction(() => document.querySelectorAll('.sb-tile').length > 0, { timeout: 5000 });

        const plan = await page.evaluate((m) => {
          const t = window.SortBinsActivity;
          if (m === 'defining') return t.items.map(it => ({ uid: it.uid, bin: it.isTarget ? 0 : 1 }));
          const famSides = t.bins.map(b => t._FAMILY[b].sides);
          return t.items.map(it => ({ uid: it.uid, bin: famSides.indexOf(it.sides) }));
        }, act.mode);

        const centerOf = (sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, sel);
        async function drag(uid, binIdx) {
          const from = await centerOf(`.sb-tile[data-uid="${uid}"]`);
          const to = await centerOf(`.sb-bin-drop[data-bin="${binIdx}"]`);
          if (!from || !to) throw new Error(`drag target missing (uid=${uid} bin=${binIdx})`);
          await page.mouse.move(from.x, from.y);
          await page.mouse.down();
          await page.mouse.move((from.x + to.x) / 2, (from.y + to.y) / 2, { steps: 4 });
          await page.mouse.move(to.x, to.y, { steps: 6 });
          await page.mouse.up();
        }

        // deliberate WRONG first: drag the first tile to a wrong bin, Check → expect fail mark
        const binCount = await page.evaluate(() => window.SortBinsActivity.bins.length);
        const wrongBin = (plan[0].bin + 1) % binCount;
        await drag(plan[0].uid, wrongBin);
        // place the rest correctly so "all placed" but one wrong
        for (let i = 1; i < plan.length; i++) await drag(plan[i].uid, plan[i].bin);
        await page.click('.lcs-activity-check');
        const wrongState = await page.evaluate(() => ({
          celebrated: document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'),
          hasWrong: !!document.querySelector('.sb-tile.sb-wrong'),
          readOnly: window.SortBinsActivity.readOnly
        }));
        note(!wrongState.celebrated && !wrongState.readOnly, `${tag}: a wrong sort still celebrated/locked`);
        note(wrongState.hasWrong, `${tag}: wrong sort did not paint a coral mark`);

        // now fix it: drag tile 0 to its correct bin, Check → expect celebrate + lock
        await drag(plan[0].uid, plan[0].bin);
        await page.click('.lcs-activity-check');
        const okState = await page.evaluate(() => ({
          celebrated: document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'),
          readOnly: window.SortBinsActivity.readOnly,
          isCorrect: window.SortBinsActivity.isCorrect()
        }));
        note(okState.isCorrect, `${tag}: full correct sort did not satisfy isCorrect()`);
        note(okState.celebrated && okState.readOnly, `${tag}: correct sort did not celebrate + lock`);

        /* 4. basic mobile overflow */
        for (const w of [280, 360, 412, 768]) {
          await page.setViewport({ width: w, height: 900 });
          await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
          const over = await page.evaluate(() => {
            const d = document.scrollingElement || document.documentElement;
            return d.scrollWidth - d.clientWidth;
          });
          note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
          if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${act.mode}-${w}.png`) });
        }
        await page.setViewport({ width: 412, height: 900 });

        note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
        const ok = !fails.some(f => f.startsWith(tag + ':'));
        if (!ok) locFail = true;
        console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${tag} — ${labels.join(' / ')} | ${distinct} distinct rounds`);
      } catch (e) {
        fails.push(`${tag}: ${e.message}`);
        locFail = true;
        console.log(`  FAIL ${tag} — ${e.message}`);
      } finally { await page.close(); }
    }
    if (locFail) { /* keep going; summary below */ }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SORT-BINS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`SORT-BINS LOCAL TEST PASSED — ${LOCALES.length} locale(s) × ${ACTIVITIES.length} activities (sort-by-sides regression + defining-attributes): render + localized labels + drag-to-bin (correct locks, wrong marks) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
