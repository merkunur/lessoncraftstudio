/* =====================================================================
   smoke-cold-line-locales.js — TOOL #43 in all eleven languages
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-cold-line-locales.js

   ⚠ A FRESH BROWSER PER LOCALE. A reused context carries the previous
   locale's module state, and a tool that silently kept `en` would pass
   a same-context sweep. The cost is ~11 launches; the alternative is a
   sweep that cannot detect the failure it exists to detect.

   ⭐ AND IT PRINTS THE WHOLE AUTHORED STRING SET PER LOCALE, rendered.
   "The locale loaded" is not the claim; "every string a child or a
   screen reader can reach is in their language" is.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const SoT = require('./_cold-line-strings.js');
const PORT = 5561;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
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
    /* ⚠ a WHOLE NEW BROWSER, not a new page */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/cold-line.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.cld-bench', { timeout: 9000 });
    await new Promise((r) => setTimeout(r, 500));

    /* ⚠⚠ THIS BLOCK WAS CLONED AND NOT ADAPTED, AND IT DROVE THE WRONG
       TOOL. It read `window.ComparisonPlanks` and pushed #42's state
       shape — {phase, dx, dy} — into a tool whose state is
       {lo, a, b, tipped}. The only reason it did not silently harvest
       an unchanging opening screen and report eleven green locales is
       that #42's global does not exist on this page, so it threw. Had
       the two tools shared a global name, this would have certified
       every locale off ONE never-updated render.
       Cloning a gate copies its selectors AND its globals; the
       write-from-the-artefact rule covers both.

       ⭐ AND IT NOW RECORDS WHICH KEYS WERE ASKED FOR, not only which
       strings appeared. #39 shipped a string authored in all eleven
       locales and never referenced, and proved a SOURCE scan cannot
       tell "exists" from "is reached" — a t('key') call sitting in a
       dead branch reads identically. So api.t is wrapped before the
       states are driven, and every authored key must be REQUESTED. */
    const got = await page.evaluate(() => {
      const inst = window.ColdLine;
      if (!inst) return { fatal: 'window.ColdLine is not defined — the gate is driving nothing' };
      const seen = new Set();
      const asked = new Set();

      /* ⚠⚠ THE TRANSLATOR CANNOT BE WRAPPED — lcs-shell.js:482 builds the
         api with Object.freeze and `t` is non-writable, so an
         assignment to inst.api.t SILENTLY NO-OPS in sloppy mode. The
         first version of this recorder did exactly that and reported
         "0 keys asked for" in all eleven locales while every string
         rendered correctly — a gate failing on a correct tool because
         its instrument could not attach. Measured with a property
         descriptor before it was believed.
         The shell resolves `i18n.t(tool.strings, key)` at CALL time, so
         the recording point is the tool's own strings object: a Proxy
         over it sees every key the shell looks up, needs nothing to be
         writable, and measures the thing the assertion is about. */
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

      /* a matrix that reaches EVERY hint branch and BOTH poses:
         marks equal (hintSet) · a mark outside the window (hintSlide) ·
         both in view and apart (hintSpan) · tipped (hintTip) · zero out
         of view (zeroOff) · the window hard against the domain floor,
         where the bulb is honest, and off it, where it is not. */
      const states = [
        { lo: -12, a: -5, b: 3, tipped: false },
        { lo: -12, a: 0, b: 0, tipped: false },
        { lo: -12, a: -5, b: 3, tipped: true },
        { lo: 8, a: -5, b: 3, tipped: false },
        { lo: 10, a: 12, b: 20, tipped: false },
        { lo: -30, a: -28, b: -20, tipped: false },
        { lo: -30, a: -28, b: -20, tipped: true }
      ];
      for (const st of states) { inst.st = inst._st(st); inst._paint(); harvest(); }

      /* both tip-chip captions: it reads one way upright and the other
         way flat, so a single pose only ever renders one of them */
      inst.st = inst._st({ lo: -12, a: -5, b: 3, tipped: false }); inst._paint(); harvest();
      inst.st = inst._st({ lo: -12, a: -5, b: 3, tipped: true }); inst._paint(); harvest();

      /* ⚠ AND THE BUILD MUST BE RE-RUN THROUGH THE PROXY. The three
         aria keys are read in _build() -> _handle(), which ran at mount
         — before this recorder existed — so they scored "never asked
         for" on a tool that asks for all three. A recorder installed
         after mount can only see what is read AFTER mount; anything
         read once, at construction, is invisible to it unless the
         construction is repeated. render() rebuilds. */
      try { inst.render(); harvest(); } catch (_) { }

      if (inst._showGate) { try { inst._showGate(); harvest(); } catch (_) { } }
      inst.strings = realStrings;
      return { blob: Array.from(seen).join(''), count: seen.size, asked: Array.from(asked) };
    });
    if (got.fatal) { is(false, `${loc}: ${got.fatal}`); await browser.close(); continue; }

    const want = SoT[loc];
    const missing = Object.keys(want).filter((k) => got.blob.indexOf(want[k]) < 0);
    is(got.count > 5, `${loc}: harvested ${got.count} rendered strings (vacuity guard)`);
    /* ⭐ REACHED, not merely authored — the #39 defect, gated.

       ⚠ TWO KEYS ARE EXEMPT, AND THE EXEMPTION IS A LIST WITH A LINE
       REFERENCE EACH, NEVER A LOOSENED PATTERN (§23.6). `title` and
       `instruction` are read by the SHELL at lcs-shell.js:448-449
       (`i18n.t(tool.strings, 'title')`), once, before the tool is
       mounted — so no recorder living inside the page can ever see
       them, however the states are driven. They are still covered:
       both must RENDER, which is the assertion immediately below.
       Nothing else may join this list without the same kind of
       citation. */
    const SHELL_CONSUMED = ['title', 'instruction'];
    const never = Object.keys(want)
      .filter((k) => SHELL_CONSUMED.indexOf(k) < 0)
      .filter((k) => got.asked.indexOf(k) < 0);
    is(got.asked.length > 0, `${loc}: the translator was actually called (${got.asked.length} keys asked for)`);
    is(never.length === 0,
      `${loc}: every authored key is REQUESTED at runtime (${SHELL_CONSUMED.length} shell-consumed, cited)`
      + (never.length ? ` — NEVER ASKED FOR: ${never.join(', ')}` : ''));
    is(missing.length === 0,
      `${loc}: all ${Object.keys(want).length} authored strings RENDERED`
      + (missing.length ? ` — MISSING: ${missing.join(', ')}` : ''));

    /* ⚠ and the locale must not be silently English. Only a non-en
       locale can fail this, and only on strings that genuinely differ —
       so compare against EN's set rather than a hand-picked key. */
    if (loc !== 'en') {
      const leaked = Object.keys(want).filter((k) => want[k] === SoT.en[k]);
      is(leaked.length === 0, `${loc}: no string is identical to English` + (leaked.length ? ` — ${leaked.join(', ')}` : ''));
    }
    is(errs.length === 0, `${loc}: no page errors` + (errs.length ? ' — ' + errs[0] : ''));

    /* print the set so a human can read it, which is the point */
    for (const k of Object.keys(want)) console.log(`       ${k.padEnd(12)} ${want[k]}`);

    await browser.close();
  }

  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions across ${LOCALES.length} fresh browsers`);
})();
