#!/usr/bin/env node
/**
 * Gate: the answer key in the maker screen (2026-10-31).
 *
 *   a print-only template with a key (K-002 Count and Circle) offers the Answer key switch under More options; on →
 *     every page is followed by its key page, the key page carries the key layer, and Print carries the key pages
 *   a template whose key exists only on some levels (K-438 Build the Word: levels 2-3) offers the switch on those levels
 *     only — not on level 1, where the page has nothing to mark
 *   a template with no key (K-012 one-to-one: any pairing is right) never offers it
 * Not vacuous: the same probe that finds no switch on K-438 level 1 / K-012 must find it on K-002 and K-438 level 2.
 *
 *   node scripts/makers/gates/keys-shell.js
 */
'use strict';
const http = require('http');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');

(async () => {
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await new Promise((r) => http.get(`${base}/__dev/access?as=sub&made=0&downloaded=0`, (res) => { res.resume(); res.on('end', r); }));
  const browser = await puppeteer.launch();
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1366, height: 900 });
  const settle = (ms = 900) => new Promise((r) => setTimeout(r, ms));
  const pages = () => p.evaluate(() => [...document.querySelectorAll('.mk-sheet iframe')].map((f) => f.getAttribute('srcdoc')));
  const groups = () => p.$$eval('.mk-group', (gs) => gs.map((g) => g.getAttribute('aria-label')));
  const chip = (label, i) => p.evaluate((label, i) => { const g = [...document.querySelectorAll('.mk-group')].find((x) => x.getAttribute('aria-label') === label); if (!g) return false; g.querySelectorAll('.mk-chip')[i].click(); return true; }, label, i);
  const openMore = () => p.evaluate(() => { const b = document.querySelector('.mk-more'); if (b.getAttribute('aria-expanded') !== 'true') b.click(); });

  // 1. K-002: key on → page + key page; print carries it
  await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-002`, { waitUntil: 'networkidle0' }); await settle(1200);
  await openMore(); await settle(300);
  check('K-002 offers the Answer key switch', (await groups()).includes('Answer key'));
  const before = await pages();
  if (!(await chip('Answer key', 1))) fail('K-002: could not press the Answer key switch');
  await settle(1200);
  const after = await pages();
  check('K-002: key on → each page followed by its key page', after.length === 2 * before.length, { before: before.length, after: after.length });
  check('K-002: the key page carries the key layer, the worksheet does not', /data-lcs-key/.test(after[1] || '') && !/<style data-lcs-key/.test(after[0] || ''));
  await p.click('#mk-print'); await settle(900);
  // the printed document: the key page shows its answers (a ring on the right choice), the worksheet page none
  const printed = await p.evaluate(() => { const d = document.querySelector('#mk-print-host iframe').contentDocument; const br = [...d.querySelectorAll('.mk-break')]; const ringed = (b) => [...b.querySelectorAll('[data-lcs-correct]')].filter((e) => getComputedStyle(e).boxShadow !== 'none').length; return { n: br.length, sheet: ringed(br[0]), key: ringed(br[1]) }; });
  check('K-002: Print shows the answers on the key page and none on the worksheet', printed.n === 2 && printed.sheet === 0 && printed.key > 0, printed);

  // 2. K-438: the switch on levels 2-3 only
  await p.goto(`${base}/makers/app/?maker=sight-words&lang=en&t=K-438`, { waitUntil: 'networkidle0' }); await settle(1200);
  await openMore(); await settle(300);
  const at = {};
  for (const i of [0, 1, 2]) { await chip('Level', i); await settle(900); await openMore(); await settle(200); at[i + 1] = (await groups()).includes('Answer key'); }
  check('K-438: no switch on level 1, a switch on levels 2 and 3', !at[1] && at[2] && at[3], at);

  // 3. K-012: never a switch
  await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-012`, { waitUntil: 'networkidle0' }); await settle(1200);
  await openMore(); await settle(300);
  check('K-012 (any pairing is right) offers no Answer key switch', !(await groups()).includes('Answer key'));

  await browser.close(); srv.close();
  check('no page errors', !errs.length, errs.slice(0, 3));
  console.log(fails ? `keys shell: ${fails} failing` : 'keys shell: all pass');
  if (fails) process.exitCode = 1;
  function fail(s) { fails++; console.log('FAIL ' + s); }
})().catch((e) => { console.error('keys shell: error — ' + e.message); process.exit(1); });
