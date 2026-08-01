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

    /* ⭐⭐ DRIVE IT ENTITLED, OR THE WHOLE CHECK IS VACUOUS. On a tool
       whose sheet is a PAID feature the Print chip shows the paywall and
       returns WITHOUT building anything — so the first version of this
       gate clicked, got the gate panel, and then passed an EMPTY
       .cmp-sheet because `display:grid` and `width > 0` were both true
       of a container with no children and zero height. It was the exact
       vacuity trap it had been written to catch, in the gate written to
       catch it. Force the entitled state first, then assert CONTENT. */
    await page.evaluate((p) => {
      const inst = Object.keys(window).map((k) => window[k])
        .find((v) => v && typeof v === 'object' && v.id && v.STORE_KEY && ('premium' in v));
      if (inst) inst.premium = true;
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
        shellHeader: anyVis('.lcs-header'),
        /* ⭐ NON-VACUITY: what actually reaches paper, measured. A
           container can be visible, full-width and completely empty. */
        appKids: (() => { const e = document.querySelector(apparatus); return e ? e.querySelectorAll('*').length : -1; })(),
        appH: (() => { const e = document.querySelector(apparatus); return e ? Math.round(e.getBoundingClientRect().height) : -1; })(),
        /* ⚠ AND IT MUST NOT ASSUME ONE RENDERING TECHNOLOGY. The first
           version counted SVG primitives only and reported 0 for
           unit-handle — whose apparatus contains ZERO SVG and is built
           entirely from HTML elements. That is a wrong measurement, not
           a wrong tool. Ink is: an SVG primitive with a fill or stroke,
           OR an HTML box with a non-transparent background or a visible
           border, OR a text node. */
        inked: (() => {
          const e = document.querySelector(apparatus);
          if (!e) return 0;
          const clear = (v) => !v || v === 'none' || v === 'rgba(0, 0, 0, 0)' || v === 'transparent';
          const SVG_SHAPE = /^(rect|line|circle|ellipse|path|polygon|polyline|text)$/i;
          /* ⚠ COUNT DRAWING PRIMITIVES, NOT CONTAINERS. The first version
             counted every descendant, so stripping EVERY stroke off the
             sheet still scored 12 — the <svg> wrappers and layout boxes
             were counting themselves as ink. A poison test caught it:
             the number moved 20 -> 12 and the assertion still passed. */
          return Array.from(e.querySelectorAll('*')).filter((x) => {
            const cs = getComputedStyle(x);
            if (cs.display === 'none' || cs.visibility === 'hidden') return false;
            const tag = x.tagName.toLowerCase();
            if (SVG_SHAPE.test(tag)) {
              /* ⚠ A <line> HAS A COMPUTED FILL OF BLACK BY DEFAULT, and
                 fill is meaningless for a line — so "fill is not none"
                 scored every stroke-less line as ink, and a sheet with
                 EVERY stroke stripped still reported 8. Stroke-only
                 primitives are judged on stroke alone, and a stroke
                 needs a non-zero width to leave a mark. */
              const strokes = !clear(cs.stroke) && parseFloat(cs.strokeWidth) > 0;
              if (/^(line|polyline)$/.test(tag)) return strokes;
              return strokes || !clear(cs.fill);
            }
            if (tag === 'svg' || tag === 'g' || tag === 'defs') return false;   /* containers */
            if (x.childElementCount > 0) return false;                          /* HTML leaves only */
            if (!clear(cs.backgroundColor) || !clear(cs.backgroundImage)) return true;
            if (parseFloat(cs.borderTopWidth) > 0 && !clear(cs.borderTopColor)) return true;
            return x.textContent.trim().length > 0;
          }).length;
        })()
      };
    }, t.p, t.apparatus);

    is(seen.apparatus === true, `the apparatus (${t.apparatus}) reaches the page`);
    is(seen.appKids > 0, `NON-VACUITY: it has ${seen.appKids} descendants — an empty container is still "visible"`);
    is(seen.appH > 40, `NON-VACUITY: it is ${seen.appH}px tall, not a zero-height grid`);
    is(seen.inked > 0, `⭐ ${seen.inked} shapes carry a fill or a stroke — something actually reaches paper`);
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
