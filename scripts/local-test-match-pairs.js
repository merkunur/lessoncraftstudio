#!/usr/bin/env node
/* =====================================================================
   local-test-match-pairs.js — local interaction harness for the E4
   "Add It Both Ways" (1.OA.B.3) commutative-property match-pairs activity
   (no Next stack needed). Serves `mini tools/` + drives
   match-pairs-activity.html with puppeteer:
     • renders the 6-card board per locale;
     • localized title (= manifest page_title) + worded prompt (= taskCommutative);
     • TAP-TO-PAIR: forming 2 of 3 correct pairs (incomplete) does NOT celebrate;
       completing all 3 correct pairs celebrates + locks (readOnly);
     • variety/shuffle (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-match-pairs.js [--locales=en,de] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
const ACTIVITY_ID = 'match-pairs.add-it-both-ways.1-oa-b-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'match-pairs');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = (p === '/' || p === '/match-pairs-activity.html') ? path.join(MINI, 'match-pairs-activity.html')
      : p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}

(async () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(MINI, 'match-pairs-activities.json'), 'utf8'));
  const row = manifest.find(r => r.id === ACTIVITY_ID);
  if (!row) { console.error('FAIL: manifest row not found: ' + ACTIVITY_ID); process.exit(1); }

  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port, BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const celebrating = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));

  async function clickCard(page, idx) { await page.evaluate(i => { document.querySelectorAll('.mp-card')[i].click(); }, idx); }
  /* group card indices by parsed sum; returns [{value, idxs:[a,b]}…] for complete pairs */
  async function groups(page) {
    return page.$$eval('.mp-card', els => {
      const g = {};
      els.forEach((el, i) => {
        const t = ((el.querySelector('.mp-card-num') || el).textContent || '').trim();
        const m = /^(\d+)\s*\+\s*(\d+)$/.exec(t);
        const v = m ? (parseInt(m[1], 10) + parseInt(m[2], 10)) : ('x' + i);
        (g[v] = g[v] || []).push(i);
      });
      return Object.keys(g).filter(v => g[v].length === 2).map(v => ({ value: v, idxs: g[v] }));
    });
  }

  for (const loc of LOCALES) {
    const tag = `${loc}/add-it-both-ways`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/match-pairs-activity.html?lang=${loc}&activity=${ACTIVITY_ID}&embed=1`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.MatchPairsActivity;
        return t && t._activityRow && document.querySelector('.mp-card') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* localized title (= manifest page_title) + prompt (= taskCommutative[loc]) */
      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      const wantTitle = row.page_title && row.page_title[loc];
      if (wantTitle) note(title === wantTitle, `${tag}: title "${title}" ≠ page_title "${wantTitle}"`);
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      const wantPrompt = await page.evaluate(l => { const s = window.MatchPairsActivity.strings.taskCommutative; return s && (s[l] || null); }, loc);
      note(prompt.length > 0, `${tag}: empty prompt`);
      if (wantPrompt) note(prompt === wantPrompt, `${tag}: prompt "${prompt}" ≠ taskCommutative "${wantPrompt}"`);

      /* nextTask installed (commutative routes through nextTask, tasks nulled) */
      const wired = await page.evaluate(() => typeof window.MatchPairsActivity.nextTask === 'function' && !window.MatchPairsActivity.tasks);
      note(wired, `${tag}: nextTask not installed / tasks not nulled`);

      /* variety: ≥7 distinct + pass-2 reshuffle */
      const N = await page.evaluate(() => window.MatchPairsActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.MatchPairsActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

      /* interaction: reload round 0, pair 2 of 3 (incomplete → no celebrate),
         then the 3rd (complete → celebrate + lock) */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelectorAll('.mp-card').length === 6, { timeout: 5000 });
      let g = await groups(page);
      note(g.length === 3, `${tag}: ${g.length} complete value-pairs on board (expected 3)`);
      if (g.length === 3) {
        await clickCard(page, g[0].idxs[0]); await clickCard(page, g[0].idxs[1]);
        await clickCard(page, g[1].idxs[0]); await clickCard(page, g[1].idxs[1]);
        await page.click('.lcs-activity-check');
        note(!(await celebrating(page)), `${tag}: an INCOMPLETE pairing (2 of 3) still celebrated`);
        /* third pair */
        g = await groups(page);
        await clickCard(page, g[2].idxs[0]); await clickCard(page, g[2].idxs[1]);
        await page.click('.lcs-activity-check');
        const ok = await page.evaluate(() => ({ c: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), ro: window.MatchPairsActivity.readOnly, all: window.MatchPairsActivity.allPaired() }));
        note(ok.all, `${tag}: board not allPaired after 3 correct pairs`);
        note(ok.c && ok.ro, `${tag}: complete correct pairing did not celebrate + lock`);
      }

      /* mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${tag.replace('/', '-')}-${w}.png`) });
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okT = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | "${prompt}" | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MATCH-PAIRS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`MATCH-PAIRS LOCAL TEST PASSED — ${LOCALES.length} locale(s): board + localized title/prompt + tap-to-pair (incomplete doesn't celebrate, complete celebrates+locks) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
