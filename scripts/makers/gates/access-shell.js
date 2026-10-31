#!/usr/bin/env node
/**
 * Gate: who may make what in the maker screen (operator ruling 2026-10-31; ARCHITECTURE §9).
 *
 * Drives the screen with real clicks against the local stand-in of the metering API (serve.js /__dev/access):
 *   anonymous   → sample page only: no controls, no New version / Add page, Print disabled, "Sign in" goes to sign-in
 *   free, 3 left → "Make this worksheet" spends exactly one; the worksheet then has its controls; another template is
 *                 locked again with one fewer; going back to the opened one costs nothing; a reload keeps it open
 *   free, 0 left → "See plans"
 *   free, downloads used up → Print shows the no-downloads note and prints nothing
 *   subscriber  → controls at once, nothing metered
 *
 *   node scripts/makers/gates/access-shell.js
 */
'use strict';
const http = require('http');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const set = (q) => new Promise((r) => http.get(`${base}/__dev/access?${q}`, (res) => { let b = ''; res.on('data', (c) => { b += c; }); res.on('end', () => r(JSON.parse(b))); }));
  const browser = await puppeteer.launch();
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; const x = extra && extra.page !== undefined ? { ...extra, page: extra.page ? '(' + extra.page.length + ' chars)' : '' } : extra; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || x === undefined ? '' : ' — ' + JSON.stringify(x))); };
  const settle = (ms = 900) => new Promise((r) => setTimeout(r, ms));
  const snap = (p) => p.evaluate(() => ({
    levelChips: document.querySelectorAll('#mk-controls .mk-group').length,
    card: (document.querySelector('.mk-access p') || {}).textContent || null,
    cardBtn: (document.querySelector('.mk-access button') || {}).textContent || null,
    newHidden: document.getElementById('mk-new').hidden,
    addHidden: document.getElementById('mk-add').hidden,
    printDisabled: document.getElementById('mk-print').disabled,
    printHidden: document.getElementById('mk-print').hidden,
    pages: document.querySelectorAll('.mk-sheet iframe').length,
    page: (document.querySelector('.mk-sheet iframe') || { getAttribute: () => '' }).getAttribute('srcdoc'),
  }));
  const open = async (p, maker = 'counting') => { await p.goto(`${base}/makers/app/?maker=${maker}&lang=en`, { waitUntil: 'networkidle0' }); await settle(); };
  const pickCard = (p, i) => p.evaluate((i) => document.querySelectorAll('.mk-card')[i].click(), i);

  // anonymous
  await set('as=anon&made=0&downloaded=0');
  let p = await browser.newPage();
  await open(p);
  let s = await snap(p);
  check('anonymous: sample page shown, no controls, New/Add hidden, Print disabled', s.pages === 1 && s.levelChips === 0 && s.newHidden && s.addHidden && s.printHidden, s);
  check('anonymous: the card offers sign-in', /Sign in to make/.test(s.card) && s.cardBtn === 'Sign in', s.card);
  await Promise.all([p.waitForNavigation({ timeout: 10000 }).catch(() => null), p.click('.mk-access button')]);
  check('anonymous: Sign in goes to the sign-in page with a way back', /\/en\/auth\/signin\?redirect=%2Fmakers%2Fapp%2F/.test(p.url()), p.url());
  await p.close();

  // free account, 3 left
  await set('as=free&made=0&downloaded=0');
  p = await browser.newPage();
  await open(p);
  s = await snap(p);
  const samplePage = s.page;
  check('free: the card says 3 of 3 left and offers Make', /3 of 3/.test(s.card) && s.cardBtn === 'Make this worksheet', s.card);
  await p.click('.mk-access button'); await settle();
  s = await snap(p);
  let d = await set('');
  check('free: Make spends exactly one and opens the controls', d.made === 1 && s.levelChips > 0 && !s.printDisabled && !s.card, { made: d.made, s });
  await p.evaluate(() => { const b = [...document.querySelectorAll('#mk-controls .mk-chip')].find((x) => x.textContent === '3'); if (b) b.click(); }); await settle();
  s = await snap(p);
  check('free: inside the opened worksheet a change is free', (await set('')).made === 1 && s.page !== samplePage, { made: (await set('')).made });
  await pickCard(p, 1); await settle();
  s = await snap(p);
  check('free: another template is locked again, now 2 of 3', /2 of 3/.test(s.card || '') && s.levelChips === 0, s.card);
  await pickCard(p, 0); await settle();
  s = await snap(p);
  check('free: back to the opened template costs nothing', !s.card && (await set('')).made === 1, s.card);
  await p.reload({ waitUntil: 'networkidle0' }); await settle();
  s = await snap(p);
  check('free: a reload keeps the opened worksheet open, uncharged', !s.card && (await set('')).made === 1, s.card);
  // downloads used up → Print refuses with the note
  await set('downloaded=3');
  await p.click('#mk-print'); await settle(400);
  const note = await p.evaluate(() => (document.querySelector('.mk-access-note') || {}).textContent || null);
  const printFrames = await p.evaluate(() => document.querySelectorAll('#mk-print-host iframe').length);
  check('free: with no downloads left Print shows the note and prints nothing', /3 downloads/.test(note || '') && printFrames === 0, { note, printFrames });
  await p.close();

  // free account, none left
  await set('as=free&made=3&downloaded=0');
  p = await browser.newPage();
  await open(p);
  s = await snap(p);
  check('free, 0 left: the card offers plans and nothing can be made', /made your 3/.test(s.card || '') && s.cardBtn === 'See plans' && s.levelChips === 0, s.card);
  await p.close();

  // subscriber
  await set('as=sub&made=0&downloaded=0');
  p = await browser.newPage();
  await open(p);
  s = await snap(p);
  check('subscriber: controls at once, no card, nothing metered', !s.card && s.levelChips > 0 && !s.printDisabled && (await set('')).made === 0, s);
  await p.close();

  await browser.close(); srv.close();
  console.log(fails ? `access gate: ${fails} failing` : 'access gate: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('access gate: error — ' + e.message); process.exit(1); });
