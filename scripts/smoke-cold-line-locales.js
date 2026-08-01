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

    /* drive every reachable state and harvest what the DOM received */
    const got = await page.evaluate(() => {
      const inst = window.ComparisonPlanks;
      const seen = new Set();
      const harvest = () => {
        document.querySelectorAll('body, body *').forEach((e) => {
          if (e.childElementCount === 0 && e.textContent.trim()) seen.add(e.textContent.trim());
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) seen.add(a.trim());
        });
      };
      const states = [
        { a: 7, b: 7, phase: 'attached', dx: 0, dy: 0 },
        { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 },
        { a: 5, b: 9, phase: 'lifting', dx: 300, dy: 260 },
        { a: 5, b: 9, phase: 'free', dx: 300, dy: 400 },
        { a: 5, b: 9, phase: 'laid', dx: 0, dy: 0 }
      ];
      for (const st of states) { inst.st = inst._st(st); inst._paint(); harvest(); }
      if (inst._showGate) { try { inst._showGate(); } catch (_) { } }
      harvest();
      return { blob: Array.from(seen).join(''), count: seen.size };
    });

    const want = SoT[loc];
    const missing = Object.keys(want).filter((k) => got.blob.indexOf(want[k]) < 0);
    is(got.count > 5, `${loc}: harvested ${got.count} rendered strings (vacuity guard)`);
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
