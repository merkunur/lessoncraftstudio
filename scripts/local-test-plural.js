#!/usr/bin/env node
/* =====================================================================
   local-test-plural.js — interaction harness (L.2.1.b irregular plurals,
   clarity-first redesign of #79). Serves `mini tools/` + drives the DOM:

     • tapping a wrong chip does NOT resolve (warm nudge, no advance); tapping
       the correct plural resolves + shows the singular → plural reveal; shell
       Check hidden until resolved.
     • the singular + 3 plural chips + Hear-it render; the shell prompt carries
       the "more than one" question; no stored plural literal; EN-only; ≥7
       distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'plural.irregular.l-2-1-b';
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

  const url = `http://127.0.0.1:${PORT}/plural-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.PluralActivity._resolved, miss: !!document.querySelector('.pl-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PluralActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PluralActivity._round && document.querySelector('.pl-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapStr = (str) => page.evaluate((s) => { const b = Array.from(document.querySelectorAll('.pl-cand')).find(x => x.getAttribute('data-str') === s); if (b) b.click(); return !!b; }, str).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const derived = (id) => page.evaluate((rid) => { const t = window.PluralActivity, r = t._pool.find(x => x.id === rid), C = window.PluralCore; return { correct: C.derivePlural(r), chips: C.chipStrings(r) }; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PluralActivity; return t && t._activityRow && document.querySelector('.pl-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Doubling Pond', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PluralActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PluralActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PluralActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.PluralActivity._pool.every(r => r.plural == null && r.correct == null)), 'a round stores a plural/answer literal field');

    /* a vowel-change round: prompt + singular + chips render; wrong no-advance; correct resolves + shows reveal */
    await force('pl-foot');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/more than one foot/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const s = document.querySelector('.pl-single'); return s && s.textContent.trim() === 'foot'; }), 'the singular did not render');
    note(await page.evaluate(() => document.querySelectorAll('.pl-cand').length === 3), 'the 3 plural chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.pl-hear')), 'the Hear-it button did not render');

    let d = await derived('pl-foot');
    note(d.correct === 'feet', `foot derive wrong: "${d.correct}"`);
    const wrongChip = d.chips.find(s => s !== d.correct);
    await tapStr(wrongChip);
    note(!(await S()).resolved, 'a wrong chip resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapStr(d.correct);
    note((await S()).resolved, 'the correct plural did not resolve');
    note(await page.evaluate(() => { const r = document.querySelector('.pl-reveal .pl-plural'); return r && r.textContent.trim() === 'feet'; }), 'the plural reveal did not show feet');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a no-change round (fish→fish) */
    await force('pl-deer');
    d = await derived('pl-deer');
    note(d.correct === 'deer', `no-change derive wrong: "${d.correct}"`);
    await tapStr('deer');
    note((await S()).resolved, 'no-change round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('pl-child'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} plural/en — "${title}"`);
  } catch (e) {
    fails.push('plural/en: ' + e.message);
    console.log(`  FAIL plural/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`PLURAL LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PLURAL LOCAL TEST PASSED — irregular plurals: a wrong chip does NOT resolve (warm nudge, no advance); the correct plural resolves + shows the singular→plural reveal; the singular + 3 chips + Hear-it render; the shell prompt carries the question; no stored plural literal; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
