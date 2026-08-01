/* =====================================================================
   smoke-build-plan-locales.js — TOOL #44 in all eleven locales
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-build-plan-locales.js

   ⚠ A WHOLE NEW BROWSER PER LOCALE, not a new page. A shared browser
   caches the module and every later locale passes on the first one's
   copy.

   ⚠ CONTROLS ARE REACHED BY INDEX, NEVER BY ENGLISH TEXT — and this
   tool proved why on its own local-test: "Another BLUEPRINT" contains
   the word "print", so /print/i matched the wrong chip and reported a
   defect in a tool that was fine.

   ⭐⭐ AND IT RECORDS WHICH KEYS WERE ASKED FOR, not merely which
   strings appeared. #39 shipped a string authored in eleven locales and
   never referenced, and proved a SOURCE SCAN cannot tell "exists" from
   "is reached" — a t('key') call sitting in a dead branch reads
   identically.
     · api.t CANNOT be wrapped: lcs-shell.js:482 builds the api with
       Object.freeze and `t` is non-writable, so the assignment silently
       no-ops. #43's first recorder did exactly that and reported "0
       keys asked for" in all eleven locales while every string
       rendered — a gate failing a CORRECT tool.
     · The shell resolves i18n.t(tool.strings, key) at CALL time, so the
       recording point is a PROXY over the tool's own strings object.
     · A recorder installed after mount cannot see what was read AT
       mount, so the build is re-run through the Proxy.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const SoT = require('./_build-plan-strings.js');
const PORT = 5574;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ⚠ EXEMPT, WITH A CITATION EACH — never a loosened pattern.
   `title` and `instruction` are read by the SHELL at lcs-shell.js:448-449
   (`i18n.t(tool.strings, 'title')`), once, before the tool is mounted,
   so no recorder living inside the page can ever see them. They are
   still covered: both must RENDER, which is the assertion below.
   Nothing joins this list without the same kind of reference. */
const SHELL_CONSUMED = ['title', 'instruction'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'build-plan.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  for (const loc of LOCALES) {
    console.log(`\n[${loc}]`);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => {
      if (m.type() === 'error' && !/404|net::ERR|favicon|quota\/status/.test(m.text())) errs.push(m.text());
    });
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/build-plan.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.bpl-bench', { timeout: 9000 });
    await new Promise((r) => setTimeout(r, 500));

    const got = await page.evaluate(() => {
      const inst = window.BuildPlan;
      if (!inst) return { fatal: 'window.BuildPlan is not defined — the gate is driving nothing' };
      const seen = new Set();
      const asked = new Set();

      const realStrings = inst.strings;
      inst.strings = new Proxy(realStrings, {
        get: function (t, k) { if (typeof k === 'string') asked.add(k); return t[k]; }
      });

      const harvest = () => {
        document.querySelectorAll('body, body *').forEach((e) => {
          if (e.childElementCount === 0 && e.textContent.trim()) seen.add(e.textContent.trim());
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) seen.add(a.trim());
        });
      };

      /* a matrix reaching EVERY hint branch:
         flat (hintPlan) · ragged+ambiguous (hintSame) · determined
         (hintDetermined) · and the turn, which has its own hint only
         if the dispatch ever selects it — the states below make each
         branch the selected one at least once. */
      const states = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 3, 1, 2, 3, 1, 2, 3],
        [4, 4, 4, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 4, 4, 4, 4, 4, 4, 4, 4]
      ];
      for (const h of states) { inst.st = inst._st({ h: h }); inst._paint(); harvest(); }

      /* ⚠ the aria labels are built during _build(), which ran at mount
         — before this recorder existed. Re-run it through the Proxy. */
      try { inst.render(); harvest(); } catch (e) { /* not fatal */ }

      /* the hint that only a turn produces */
      try {
        inst.st = inst._st({ h: [1, 2, 3, 1, 2, 3, 1, 2, 3] });
        inst._paint();
        document.querySelectorAll('.bpl-chip')[0].click();
        harvest();
      } catch (e) { /* not fatal */ }

      /* ⭐ the turn's own hint, reached the way a child reaches it */
      try {
        inst.st = inst._st({ h: [1, 2, 3, 1, 2, 3, 1, 2, 3] });
        inst._touched = false; inst._justTurned = false;
        inst._paint(); harvest();                 /* hintPlan */
        document.querySelectorAll('.bpl-chip')[0].click(); harvest();   /* hintTurn */
        document.querySelectorAll('.bpl-chip')[1].click(); harvest();   /* hintSame */
      } catch (e) { /* not fatal */ }

      if (inst._showGate) { try { inst._showGate(); harvest(); } catch (e) { /* not fatal */ } }

      /* ⚠⚠ THERE WAS A LINE HERE THAT CALLED api.t('hintTurn') DIRECTLY,
         with a comment excusing it: "the dispatch may not reach it".
         It never reached it — `hintTurn` appeared exactly ONCE in the
         whole tool, its own declaration, and the turn had no hint at
         all. I wrote the excuse instead of reading the dispatch, and in
         doing so I defeated the very gate I had just built to catch
         dead strings (#39).
         A GATE YOU HELP PAST IS NOT A GATE. Every key must now be
         reached the way a child reaches it — by driving the controls —
         and verify- proves by ENUMERATION that the dispatch can select
         every hint, so this can never again be papered over here. */

      inst.strings = realStrings;
      return { blob: Array.from(seen).join(''), count: seen.size, asked: Array.from(asked) };
    });
    if (got.fatal) { is(false, `${loc}: ${got.fatal}`); await browser.close(); continue; }

    const want = SoT[loc];
    if (!want) { is(false, `${loc}: no entry in the SoT`); await browser.close(); continue; }

    /* ⭐ REACHED, not merely authored */
    const never = Object.keys(want)
      .filter((k) => SHELL_CONSUMED.indexOf(k) < 0)
      .filter((k) => got.asked.indexOf(k) < 0);
    is(got.asked.length > 0, `${loc}: the translator was actually called (${got.asked.length} keys asked for)`);
    is(never.length === 0,
      `${loc}: every authored key is REQUESTED at runtime (${SHELL_CONSUMED.length} shell-consumed, cited)`
      + (never.length ? ` — NEVER ASKED FOR: ${never.join(', ')}` : ''));

    const missing = Object.keys(want).filter((k) => {
      /* placeholders are filled before they reach the DOM */
      const probe = want[k].split('{')[0].trim();
      return probe.length > 3 && got.blob.indexOf(probe) < 0;
    });
    is(got.count > 8, `${loc}: harvested ${got.count} rendered strings (vacuity guard)`);
    is(missing.length === 0,
      `${loc}: all ${Object.keys(want).length} authored strings RENDERED`
      + (missing.length ? ` — MISSING: ${missing.join(', ')}` : ''));

    if (loc !== 'en') {
      const leaked = Object.keys(want).filter((k) => want[k] === SoT.en[k]);
      is(leaked.length === 0, `${loc}: no string is identical to English` + (leaked.length ? ` — ${leaked.join(', ')}` : ''));
    }
    is(errs.length === 0, `${loc}: no page errors` + (errs.length ? ' — ' + errs[0] : ''));

    /* print the whole set so a human can read it — that is the point */
    for (const k of Object.keys(want)) console.log(`       ${k.padEnd(15)} ${want[k]}`);

    await browser.close();
  }

  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions across ${LOCALES.length} fresh browsers`);
})();
