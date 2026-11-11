#!/usr/bin/env node
/**
 * The live site while class links are SWITCHED OFF (the dark deploy): nothing of the feature is reachable, and
 * what every visitor uses still works.
 *
 *   node scripts/class-results/tests/live-dark.js            read-only against www.lessoncraftstudio.com
 *
 * 1. Every class route answers 404 (the class page, both APIs, the teacher page in three languages).
 * 2. The two script files are served, and the deck script on the origin is the reviewed working copy.
 * 3. A maker student page carries no class loader.
 * 4. A deck opened the ordinary way: no reporter is requested, the page is not in class mode, the play check is
 *    sent without a class token and is answered, no script error.
 * 5. A deck opened with a made-up class token: the reporter loads and hides the page furniture, the worksheet's
 *    own Check still works, the report is answered 404 and the worksheet is not disturbed (fail-open).
 *
 * After the switch is set this script must FAIL at step 1: then the launch checklist applies instead.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const QA = require(path.join(REPO, 'scripts', 'lib', 'qa-header.js')).headers();
const HOST = 'https://www.lessoncraftstudio.com';
const DECK = '/en/decks/number-lines-easy-g1116-10/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 400))); };
const get = (p, opt) => fetch(HOST + p, Object.assign({ headers: QA, redirect: 'manual' }, opt || {}));

(async () => {
  // 1 — nothing is reachable
  const routes = [['GET', '/c/abcdefghij'], ['GET', '/api/class/abcdefghij'], ['GET', '/api/class/abcdefghij/seat/s000000001'], ['POST', '/api/class/start'], ['POST', '/api/class/report'], ['GET', '/api/classes'], ['POST', '/api/classes'], ['GET', '/api/classes/c000000001/results'], ['GET', '/en/workspace/classes'], ['GET', '/de/workspace/classes'], ['GET', '/fi/workspace/classes']];
  const got = [];
  for (const [m, p] of routes) { const r = await get(p, m === 'POST' ? { method: 'POST', headers: Object.assign({ 'content-type': 'application/json' }, QA), body: '{}' } : {}); got.push(m + ' ' + p + ' → ' + r.status); }
  check('switched off: all 11 class routes answer 404', got.every((x) => x.endsWith('→ 404')), got.filter((x) => !x.endsWith('→ 404')));
  const ws = await (await get('/en/workspace')).text();
  check('the workspace page does not mention the Classes screen', !/workspace\/classes/.test(ws));

  // 2 — the script files
  const norm = (s) => s.replace(/\r\n/g, '\n');
  const cls = await get('/worksheet-generators/js/lcs-class.js?v=1');
  const clsText = await cls.text();
  check('lcs-class.js is served as JavaScript and is the working copy', cls.status === 200 && /javascript/.test(cls.headers.get('content-type') || '') && norm(clsText) === norm(fs.readFileSync(path.join(REPO, 'scripts', 'class-results', 'web', 'lcs-class.js'), 'utf8')), { status: cls.status, type: cls.headers.get('content-type'), bytes: clsText.length });
  const meter = await (await get('/worksheet-generators/js/lcs-meter.js?v=1&fresh=' + Date.now())).text();
  check('lcs-meter.js on the origin is the working copy (the edge may serve the previous one for up to four hours)', norm(meter) === norm(fs.readFileSync(path.join(REPO, 'scripts', 'class-results', 'web', 'lcs-meter.js'), 'utf8')), { bytes: meter.length });

  // 3 — a maker student page (any 12-character id answers the kid-safe 404 page; a real one must carry no loader either)
  const s404 = await (await get('/s/zzzzzzzzzzzz')).text();
  check('a maker student page carries no class loader', !/lcs-class/.test(s404));

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const open = async (hash) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 800 });
    const seen = { classJs: 0, meter: null, meterStatus: null, report: null, errors: [] };
    page.on('pageerror', (e) => seen.errors.push(e.message));
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const u = req.url();
      if (/lcs-insights\.js|\/api\/send|umami/i.test(u)) return req.abort();
      if (u.includes('/js/lcs-class.js')) seen.classJs++;
      if (u.includes('/api/quota/check-and-increment')) seen.meter = req.postData();
      if (u.startsWith(HOST)) return req.continue({ headers: Object.assign({}, req.headers(), QA) });
      req.continue();
    });
    page.on('response', (res) => { const u = res.url(); if (u.includes('/api/quota/check-and-increment')) seen.meterStatus = res.status(); if (u.includes('/api/class/report')) seen.report = res.status(); });
    await page.goto(HOST + DECK + hash, { waitUntil: 'networkidle2', timeout: 60000 });
    return { page, seen };
  };
  const play = (page) => page.evaluate(() => { const B = window.DECK_BUNDLE, opts = [...document.querySelectorAll('#lcs-overlay .lcs-opt')]; let k = 0; B.items.forEach((it, i) => { opts[k + B.answers[i]].click(); k += it.options.length; }); document.getElementById('lcs-check').click(); });
  try {
    // 4 — the ordinary visit
    const a = await open('');
    await play(a.page); await sleep(900);
    const st = await a.page.evaluate(() => ({ on: !!window.__lcsClass, mode: document.body.classList.contains('lcs-class-mode'), cele: !document.getElementById('lcs-celebration').hidden, chrome: !!document.getElementById('lcs-site-chrome') && getComputedStyle(document.getElementById('lcs-site-chrome')).display !== 'none' }));
    const body = a.seen.meter ? JSON.parse(a.seen.meter) : null;
    check('ordinary visit: no reporter, no class mode, the site header shows, the worksheet checks and celebrates', !st.on && !st.mode && st.chrome && st.cele && a.seen.classJs === 0, { st, classJs: a.seen.classJs });
    check('ordinary visit: the play check is sent without a class token and answered 200', !!body && body.kind === 'play' && !('classToken' in body) && a.seen.meterStatus === 200, { body, status: a.seen.meterStatus });
    check('ordinary visit: nothing is sent to the class API, no script error', a.seen.report === null && !a.seen.errors.length, a.seen);
    await a.page.close();

    // 5 — a made-up token while the switch is off
    const b = await open('#lcs=abcdefghijkmnpqrstuv');
    const fresh = await b.page.evaluate(() => !!window.__lcsClass);
    if (!fresh) console.log('      (the edge still serves the previous lcs-meter.js to this page: step 5 is skipped; run again within four hours)');
    else {
      await play(b.page); await sleep(1200);
      const s2 = await b.page.evaluate(() => ({ mode: document.body.classList.contains('lcs-class-mode'), cele: !document.getElementById('lcs-celebration').hidden, go: !!document.getElementById('lcs-class-go') }));
      check('made-up token, switch off: the report is answered 404, no button appears, the worksheet still checks and celebrates', b.seen.report === 404 && !s2.go && s2.cele && s2.mode, { report: b.seen.report, s2 });
      check('made-up token, switch off: the play is still metered like any other (answered 200), no script error', b.seen.meterStatus === 200 && !b.seen.errors.length, { status: b.seen.meterStatus, errors: b.seen.errors });
    }
    await b.page.close();
  } catch (e) { fails++; console.log('FAIL  the robot crashed: ' + (e.stack || e.message)); }
  await browser.close();
  console.log(fails ? `\n${fails} FAILURE(S)` : '\nlive-dark: the feature is switched off and nothing else changed');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
