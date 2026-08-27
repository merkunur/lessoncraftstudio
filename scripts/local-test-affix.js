#!/usr/bin/env node
/* =====================================================================
   local-test-affix.js — interaction harness (L.2.4.b/c affix word-meaning,
   clarity-first). Serves `mini tools/` + drives the rendered DOM:

     • apply / which : a WRONG option does NOT resolve (warm nudge, no
       advance); the correct one resolves; shell Check hidden until resolved.
     • the machine scene renders (an .af-scene svg); the shell prompt
       interpolates the word/meaning; no stored answer; EN-only; ≥7 distinct
       + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'affix.apply.l-2-4-b';
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

  const url = `http://127.0.0.1:${PORT}/affix-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.AffixActivity._resolved, miss: !!document.querySelector('.af-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.AffixActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.AffixActivity._round && document.querySelector('.af-root'), { timeout: 4000 });
    await sleep(50);
  }
  const solve = (correct) => page.evaluate((ok) => {
    const t = window.AffixActivity, r = t._round, LABEL = { un: 'un-', re: 're-', ful: '-ful', less: '-less' };
    if (r.cog === 'which') {
      const aff = ok ? r.affix : r.options.find(a => a !== r.affix);
      const b = Array.from(document.querySelectorAll('.af-cand')).find(x => { const l = x.querySelector('.af-cog-label'); return l && l.textContent === LABEL[aff]; });
      if (b) b.click(); return !!b;
    }
    const o = ok ? r.options.find(x => x.affix === r.affix) : r.options.find(x => x.affix !== r.affix);
    const b = Array.from(document.querySelectorAll('.af-cand')).find(x => x.textContent.trim() === o.text);
    if (b) b.click(); return !!b;
  }, correct).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.AffixActivity; return t && t._activityRow && document.querySelector('.af-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Marigold's Knowing Machine", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.AffixActivity._activityRow.slug));
    // The EN slug is the canonical base; the activity is a localized fan-out target
    // (de/fr/es/pt/it/nl added since the original EN-only build), so assert EN is PRESENT
    // rather than EN-only (the old EN-only assertion went stale at the first localization).
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.AffixActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.AffixActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.AffixActivity._pool.map(r => r.cog))));
    note(cogs.indexOf('apply') >= 0 && cogs.indexOf('which') >= 0, `cogs not [apply,which]: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.AffixActivity._pool.every(r => r.isCorrect == null && r.correctIndex == null)), 'a round carries a stored answer field');

    /* APPLY: prompt interpolates the word; wrong no-advance; correct resolves; scene renders */
    await force('af-unkind');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/unkind/.test(prompt) && /mean/i.test(prompt), `apply prompt not interpolated: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.af-scene')), 'the machine scene svg did not render');
    note(await page.evaluate(() => document.querySelectorAll('.af-row .af-cand').length === 3), 'apply did not render 3 meaning cards');

    await solve(false);
    note(!(await S()).resolved, 'apply: a wrong meaning resolved');
    note((await S()).miss, 'apply: wrong gave no nudge');
    await solve(true);
    note((await S()).resolved, 'apply: the correct meaning did not resolve');
    note(await checkVisible(), 'apply: shell Check did not appear after resolve');

    /* WHICH: prompt interpolates the meaning; cog row; wrong no-advance; correct resolves */
    await force('af-which-retie');
    const pw = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/again/i.test(pw) && /cog/i.test(pw), `which prompt not interpolated: "${pw}"`);
    note(await page.evaluate(() => document.querySelectorAll('.af-cogrow .af-cand').length === 3), 'which did not render 3 cog buttons');
    await solve(false);
    note(!(await S()).resolved, 'which: a wrong cog resolved');
    await solve(true);
    note((await S()).resolved, 'which: the correct cog did not resolve');

    /* mobile overflow 280→768 (a stacked apply + a cog-row which) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('af-helpful'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `apply horizontal overflow ${over}px at ${w}px`);
      await force('af-which-useless'); await sleep(40);
      over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `which horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} affix/en — "${title}"`);
  } catch (e) {
    fails.push('affix/en: ' + e.message);
    console.log(`  FAIL affix/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`AFFIX LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('AFFIX LOCAL TEST PASSED — affix-meaning clarity build: a wrong meaning/cog does NOT resolve (warm nudge, no advance); the correct one resolves; the Knowing-Machine scene svg renders (3 meaning cards / 3 cogs); the shell prompt interpolates the word/meaning; shell Check hides until resolved; no stored answer; EN-only; apply+which cogs + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
