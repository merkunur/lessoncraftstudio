/* =====================================================================
   audit-tool-print-sheets.js — a Print chip must produce a SHEET
   ---------------------------------------------------------------------
   Run:  node scripts/audit-tool-print-sheets.js [--tool=<key>]

   ⭐ WHY THIS EXISTS. #40 unit-handle and #41 unroll-tape each shipped a
   chip labelled "Print the bench" / "Print the runway" that called
   `window.print()` with NO @media print block at all — so they printed
   the whole web page: nav, hints, buttons, footer, the tool at screen
   size. That is §23.6's "a control must do WHAT ITS LABEL SAYS",
   shipped twice.

   ⚠ AND THE GENERIC LIVENESS GATE CANNOT SEE IT. `window.print` fires,
   the DOM changes, the control "acts" — it scores green while printing
   the wrong thing. A defect class needs its own gate when the shared one
   is structurally blind to it.

   This renders each tool in PRINT MEDIA and asserts what reaches paper:
   the chrome is gone, the apparatus is there, and nothing interactive
   survives (a sheet has no grips).
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5540;

/* every tool that offers a Print chip must appear here */
const TOOLS = [
  { key: 'unit-handle', p: 'unh', apparatus: '.unh-bench' },
  { key: 'unroll-tape', p: 'urt', apparatus: '.urt-bench' },
  { key: 'comparison-planks', p: 'cmp', apparatus: '.cmp-sheet' }
];

const only = (process.argv.find((a) => a.indexOf('--tool=') === 0) || '').split('=')[1];

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
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const t of TOOLS) {
    if (only && only !== t.key) continue;
    console.log('\n[' + t.key + ']');
    const src = fs.readFileSync(path.join(ROOT, t.key + '.js'), 'utf8');

    const hasChip = /window\.print/.test(src);
    const hasBlock = /@media print/.test(src);
    is(!hasChip || hasBlock, hasChip
      ? (hasBlock ? 'offers a Print chip AND ships an @media print block' : '⭐ Print chip with NO @media print block — it prints the web page')
      : 'offers no Print chip (nothing to check)');
    if (!hasChip) continue;

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/${t.key}.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.' + t.p + '-wrap', { timeout: 9000 }).catch(() => { });
    await new Promise((r) => setTimeout(r, 600));

    /* drive the tool's own print path so whatever the chip builds is built */
    await page.evaluate((p) => {
      const orig = window.print;
      window.print = function () { };          /* headless print would hang */
      const b = Array.from(document.querySelectorAll('.' + p + '-chip'))
        .find((x) => /print|drucken|imprim|stamp|afdruk|skriv|tulosta/i.test(x.textContent));
      if (b && !b.disabled) b.click();
      window.print = orig;
    }, t.p);
    await new Promise((r) => setTimeout(r, 300));

    /* ⭐ NOW LOOK AT IT IN PRINT MEDIA */
    await page.emulateMediaType('print');
    await new Promise((r) => setTimeout(r, 200));

    const seen = await page.evaluate((p, apparatus) => {
      const anyVis = (sel) => Array.from(document.querySelectorAll(sel)).some((e) => {
        const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0;
      });
      return {
        hint: anyVis('.' + p + '-hint'),
        foot: anyVis('.' + p + '-foot'),
        chips: anyVis('.' + p + '-chip'),
        handles: anyVis('.' + p + '-handle, .' + p + '-grip'),
        apparatus: anyVis(apparatus),
        shellHeader: anyVis('.lcs-header')
      };
    }, t.p, t.apparatus);

    is(seen.apparatus === true, `the apparatus (${t.apparatus}) reaches the page`);
    is(!seen.hint, 'the hint text is gone');
    is(!seen.foot && !seen.chips, 'the button row is gone');
    is(!seen.handles, 'no interactive grips survive — a sheet has no handles');
    is(!seen.shellHeader, 'the shell header is gone');

    await page.emulateMediaType('screen');
    await new Promise((r) => setTimeout(r, 150));
    const back = await page.evaluate((p) => {
      const e = document.querySelector('.' + p + '-foot');
      return !!e && getComputedStyle(e).display !== 'none';
    }, t.p);
    is(back, 'and the chrome returns on screen — the print rules are scoped to print');

    await page.close();
  }

  await browser.close();
  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks: every Print chip produces a sheet`);
})();
