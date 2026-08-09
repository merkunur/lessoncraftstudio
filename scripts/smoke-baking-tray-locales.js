/* =====================================================================
   smoke-baking-tray-locales.js — TOOL #46 in all eleven
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-baking-tray-locales.js

   ⚠ FRESH BROWSER PER LOCALE. A shared one caches the module and every
   later locale passes on the first one's copy — a green run that has
   tested exactly one language.

   ⚠ REACH CONTROLS BY INDEX, NEVER BY AN ENGLISH LABEL. "Turn the tray"
   does not exist in Finnish, and a selector that reads English silently
   matches nothing in ten locales.

   ⭐⭐ AND THE REACHABILITY RECORDER IS THE POINT OF THIS FILE.
   "The string exists" and "the string is REACHED" are different
   questions, and a regex over source cannot tell them apart: #39 shipped
   `hintMark` authored in eleven languages and wired to nothing, and the
   first dead-string check was defeated by a live `t()` call sitting in a
   branch that could never run. So this gate wraps the tool's own strings
   object in a PROXY and records every key the runtime actually asks for,
   while driving the tool over a matrix of real states. A key that is
   never asked for is dead, whatever the source says.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const T = require(path.join(ROOT, 'baking-tray.js'));
const PORT = 5608;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'baking-tray.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const KEYS = Object.keys(T.strings);
const asked = {};
KEYS.forEach((k) => { asked[k] = {}; });

(async () => {
  for (const loc of LOCALES) {
    /* fresh browser, not just a fresh page */
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.setViewport({ width: 1024, height: 940, deviceScaleFactor: 1 });

    /* ⭐ THE RECORDER GOES IN BEFORE THE TOOL MOUNTS. A recorder
       installed afterwards cannot see what was read AT MOUNT — three
       aria keys scored "never asked" on #43 for exactly that reason.
       And it wraps the tool's own STRINGS object, not the shell's `t`:
       lcs-shell.js freezes its api, so `t` is non-writable and wrapping
       it silently no-ops in sloppy mode — a gate unable to attach its
       own instrument, reporting that as a defect in the tool. */
    await p.evaluateOnNewDocument(() => {
      window.__asked = {};
      Object.defineProperty(window, 'BakingTray', {
        configurable: true,
        set: function (v) {
          const real = v.strings;
          v.strings = new Proxy(real, {
            get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
          });
          Object.defineProperty(window, 'BakingTray', { value: v, writable: true, configurable: true });
        }
      });
    });

    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/baking-tray.html?lang=${loc}`, { waitUntil: 'load' });
    await p.waitForSelector('.btr-wrap', { timeout: 12000 });
    await wait(220);

    /* ⭐ DRIVE EVERY STATE THE STRINGS DESCRIBE, or the digest reports my
       laziness as a dead string. Whole, one cut, two cuts, a column cut,
       a square tray, turned, at the size limits, and the paywall. */
    const drive = async () => {
      await p.evaluate(() => {
        const T = window.BakingTray;
        T.st = T.crack(T.st, 'row', 5); T._paint();
      }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.crack(T.st, 'row', 2); T._paint(); }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.newState(6, 6); T._paint(); }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.crack(T.newState(7, 6), 'col', 4); T._paint(); }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.crack(T.st, 'col', 2); T._paint(); }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.newState(1, 1); T._paint(); }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.newState(10, 10); T._paint(); }); await wait(120);
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.newState(7, 6); T._paint(); }); await wait(120);
      /* the turn, and the announcement it makes */
      await p.evaluate(() => document.querySelector('.btr-turn').click()); await wait(700);
      /* the paywall */
      await p.evaluate(() => document.querySelectorAll('.btr-chip')[document.querySelectorAll('.btr-chip').length - 1].click());
      await wait(200);
      /* the settings drawer renders the two setting labels */
      await p.evaluate(() => { const c = document.querySelector('.lcs-ctrl'); if (c) c.click(); });
      await wait(220);
    };
    await drive();

    const got = await p.evaluate(() => window.__asked || {});
    KEYS.forEach((k) => { if (got[k]) asked[k][loc] = true; });

    const title = await p.$eval('.lcs-title', (n) => n.textContent.trim());
    is(title === T.strings.title[loc], `${loc}: the h1 is the authored title ("${title}")`);
    is(errs.length === 0, `${loc}: no console errors` + (errs.length ? ': ' + errs[0] : ''));
    /* ⚠ a raw key on screen means t() fell through to the key name */
    const raw = await p.evaluate((ks) => ks.filter((k) => document.body.innerText.indexOf(k) >= 0), KEYS);
    is(raw.length === 0, `${loc}: no raw key leaked onto the page` + (raw.length ? ': ' + raw[0] : ''));
    /* ⚠ and no ENGLISH leaked into a non-English locale */
    if (loc !== 'en') {
      const en = String(T.strings.turnBtn.en);
      const leaked = await p.evaluate((s) => document.body.innerText.indexOf(s) >= 0, en);
      is(!leaked, `${loc}: the English "${en}" does not appear`);
    }
    await b.close();
  }

  console.log('\n— THE AUTHORED STRING SET, key by key (was it ASKED FOR?) —');
  const dead = [];
  KEYS.forEach((k) => {
    const hit = LOCALES.filter((l) => asked[k][l]);
    const mark = hit.length === LOCALES.length ? 'asked ' : hit.length === 0 ? 'DEAD  ' : 'part  ';
    console.log(`  ${mark} ${k.padEnd(14)} ${hit.length}/${LOCALES.length}`);
    if (hit.length === 0) dead.push(k);
  });
  /* the shell consumes these itself, by name, from outside the tool */
  const SHELL = ['title', 'instruction'];
  const realDead = dead.filter((k) => SHELL.indexOf(k) < 0);
  is(realDead.length === 0,
    'every authored key is asked for by the runtime' + (realDead.length ? ` — DEAD: ${realDead.join(', ')}` : ''));

  srv.close();
  if (FAIL) { console.error(`\nFAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`\nPASS — ${PASS} assertions across ${LOCALES.length} locales`);
})().catch((e) => { console.error(e); srv.close(); process.exit(1); });
