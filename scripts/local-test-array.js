#!/usr/bin/env node
/* =====================================================================
   local-test-array.js — local interaction harness for the E13
   build-an-array activity (no Next stack needed).

   Serves `mini tools/` at /mini-tools/ and drives the standalone
   array-activity.html with puppeteer to exercise the REAL build path:

     • renders (R×C grid of cells + repeated-addition strip) per locale;
     • per-locale CORE strings — the title renders the locale's localized
       text (not a raw key, not English in a non-EN locale);
     • TAP-FILL interaction (page.click → pointerdown): filling every cell
       completes the strip (R addends, none blank); then the shell KEYPAD —
       a deliberate WRONG total does NOT celebrate, the CORRECT total
       (= rows×cols) celebrates + locks;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + pass-2 order
       ≠ pass-1 (same set, order-only);
     • basic mobile overflow at 280/360/412/768 (no horizontal scroll).

   Usage:
     node scripts/local-test-array.js                 # all 11 locales
     node scripts/local-test-array.js --locales=en,de --shot
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
/* both array activities — build-array (#1) + equal-groups (#2) */
const ACTIVITIES = [
  { id: 'array.build-array.2-oa-c-4', groups: false },
  { id: 'array.equal-groups.2-oa-c-4', groups: true }
];
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'array');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/' || p === '/array-activity.html') file = path.join(MINI, 'array-activity.html');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

/* the localized strings SoT, read straight from the core. */
function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'array-core.js'), 'utf8');
  const win = {}; new Function('window', src)(win);
  return win.ArrayCore.strings;
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

  for (const ACT of ACTIVITIES) {
   const pfx = ACT.groups ? 'equal-groups' : 'build-array';
   for (const loc of LOCALES) {
    const tag = `${pfx}/${loc}`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/array-activity.html?lang=${loc}&activity=${ACT.id}&embed=1`;

    /* keypad helpers (shell renders .lcs-activity-key digit buttons + clear) */
    async function clearPad() { const c = await page.$('.lcs-activity-key-clear'); if (c) await c.click(); }
    async function pressDigit(d) {
      const keys = await page.$$('.lcs-activity-key');
      for (const h of keys) { const t = (await page.evaluate(e => e.textContent.trim(), h)); if (t === String(d)) { await h.click(); return true; } }
      return false;
    }
    async function enterNumber(n) { await clearPad(); for (const ch of String(n)) { if (!await pressDigit(ch)) throw new Error('digit key ' + ch + ' missing'); } }

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.ArrayActivity;
        return t && t._activityRow && document.querySelector('.arr-cell') && document.querySelector('.arr-strip') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* 1. localized title (build-array → title; equal-groups → titleGroups) */
      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      const expTitle = ACT.groups ? (STR.titleGroups[loc] || STR.titleGroups.en) : (STR.title[loc] || STR.title.en);
      note(title === expTitle, `${tag}: header title "${title}" ≠ localized "${expTitle}"`);

      /* 2. correct layout for the mode + strip present, cell count === units×each */
      const hasGrid = !!(await page.$('.arr-grid'));
      const hasGroups = !!(await page.$('.arr-group'));
      note(ACT.groups ? (hasGroups && !hasGrid) : (hasGrid && !hasGroups), `${tag}: layout grid=${hasGrid} groups=${hasGroups} (expected ${ACT.groups ? 'groups' : 'grid'})`);
      const dims0 = await page.evaluate(() => ({ rows: window.ArrayActivity.rows, cols: window.ArrayActivity.cols }));
      const cellCount = await page.$$eval('.arr-cell', els => els.length);
      note(cellCount === dims0.rows * dims0.cols, `${tag}: ${cellCount} cells ≠ ${dims0.rows * dims0.cols}`);
      note(!!(await page.$('.arr-strip')), `${tag}: no repeated-addition strip`);

      /* 3. variety/shuffle over 2 passes */
      const N = (await page.evaluate(() => window.ArrayActivity._pool.length));
      const ids = await page.evaluate((count) => {
        const t = window.ArrayActivity, out = [];
        for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); }
        return out;
      }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      const distinct = new Set(p1).size;
      note(distinct >= 7, `${tag}: only ${distinct} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not the same set (order-only violated)`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical to pass-1 (no reshuffle)`);

      /* 4. TAP-FILL + KEYPAD. Re-mount round 0 so we build a known array. */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelectorAll('.arr-cell').length > 0, { timeout: 5000 });
      const dims = await page.evaluate(() => ({ rows: window.ArrayActivity.rows, cols: window.ArrayActivity.cols, total: window.ArrayActivity.total() }));

      // fill every cell → strip should show R complete addends (none blank)
      const cells = await page.$$('.arr-cell');
      for (const cell of cells) await cell.click();
      const addends = await page.$$eval('.arr-addend', els => els.filter(e => !e.classList.contains('arr-blank')).length);
      note(addends === dims.rows, `${tag}: filled shows ${addends} complete addends, expected ${dims.rows} units`);

      // WRONG total → no celebrate
      await enterNumber(dims.total - 1);
      await page.click('.lcs-activity-check');
      const wrong = await page.evaluate(() => ({
        celebrated: document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'),
        readOnly: window.ArrayActivity.readOnly
      }));
      note(!wrong.celebrated && !wrong.readOnly, `${tag}: a wrong total still celebrated/locked`);

      // CORRECT total → celebrate + lock
      await enterNumber(dims.total);
      await page.click('.lcs-activity-check');
      const ok = await page.evaluate(() => ({
        celebrated: document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'),
        readOnly: window.ArrayActivity.readOnly
      }));
      note(ok.celebrated && ok.readOnly, `${tag}: correct total (${dims.total}) did not celebrate + lock`);

      /* 5. mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        const over = await page.evaluate(() => {
          const d = document.scrollingElement || document.documentElement;
          return d.scrollWidth - d.clientWidth;
        });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${pfx}-${loc}-${w}.png`) });
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okLoc = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | ${dims.rows}×${dims.cols}=${dims.total} | ${distinct} distinct rounds`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
   }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ARRAY LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`ARRAY LOCAL TEST PASSED — ${ACTIVITIES.length} activities × ${LOCALES.length} locale(s): correct layout (grid / groups) + strip + localized title + tap-fill builds the equation + keypad total (correct celebrates, wrong doesn't) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
