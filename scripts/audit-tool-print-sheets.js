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

   ⭐ SURFACE 2 (2026-08-03) — THE THIRD MEMBER OF THE SAME FAMILY, and
   the one this gate's original shape was structurally blind to. #40 and
   #41 REACHED window.print() and printed the wrong thing. The hosted
   worksheet at /play/w/<linkId> reached window.print() and printed
   NOTHING: the route served it under `Content-Security-Policy: sandbox
   allow-scripts allow-popups`, and the HTML spec's sandboxed-modals flag
   makes window.print() a silent no-op unless `allow-modals` is present.
   The button's listener fired; the browser discarded the call.

   ⚠ AND THIS GATE COULD NOT HAVE SEEN IT — line ~88 STUBS window.print
   out ("headless print would hang"), so it never exercises the call at
   all, and it never renders a sandboxed document. A gate that stubs the
   thing under test is measuring its own stub.

   The surface-2 section below is SELF-POISONING: it loads the same
   document twice, once under each header, and requires OPPOSITE
   outcomes. If the poison side ever stops producing the block, the run
   FAILS rather than greens.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
/* ⚠ REQUIRED LAZILY. --contract-only runs inside deploy.sh on Hetzner,
   where puppeteer's node_modules exists but NO Chromium does (measured
   2026-08-03: no system binary, no ~/.cache/puppeteer, no bundled
   download). A top-level require is survivable there, but launching is
   not — see CONTRACT_ONLY below. */

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5540;

/* every tool that offers a Print chip must appear here */
const TOOLS = [
  { key: 'unit-handle', p: 'unh', apparatus: '.unh-bench' },
  { key: 'unroll-tape', p: 'urt', apparatus: '.urt-bench' },
  { key: 'comparison-planks', p: 'cmp', apparatus: '.cmp-sheet' },
  { key: 'cold-line', p: 'cld', apparatus: '.cld-sheet' },
  { key: 'number-line', p: 'nl', apparatus: '.nl-sheet' }
];

const only = (process.argv.find((a) => a.indexOf('--tool=') === 0) || '').split('=')[1];

/* ⭐ --contract-only: the STATIC half, no browser. This is what deploy.sh
   runs, because Hetzner has no Chromium — a browser gate wired into the
   deploy would abort every deploy rather than guard anything. What can
   actually REGRESS is the CSP token list in route.ts, and that is a
   filesystem fact. The browser probes below prove the MECHANISM (that
   the token is what makes print work at all); they are a dev/operator
   run, not a per-deploy one. */
const CONTRACT_ONLY = process.argv.includes('--contract-only');

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
});
/* ⚠ do not bind a port during a deploy — contract-only serves nothing */
if (!CONTRACT_ONLY) srv.listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  const browser = CONTRACT_ONLY
    ? null
    : await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const t of TOOLS) {
    if (CONTRACT_ONLY) break;
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

  /* ===================================================================
     SURFACE 2 — the hosted worksheet's CSP sandbox
     =================================================================== */
  if (!only || only === 'hosted-worksheet') {
    console.log('\n[hosted-worksheet CSP]');

    /* ⭐ READ THE FAN-OUT OFF ITS SoT, AND REFUSE TO RUN IF IT PARSES
       IMPLAUSIBLY FEW. The apps that may be hosted are declared once, in
       core.ts; hardcoding 29 here would rot silently the day one is
       added. Refusing below 29 is the non-vacuity rule applied to a
       LIST — the #42 lesson, where a completeness check that listed a
       subset of the required fields CERTIFIED an incomplete entry. */
    const coreSrc = fs.readFileSync(
      path.join(__dirname, '..', 'frontend', 'lib', 'hosted-worksheets', 'core.ts'), 'utf8');
    const setBlock = (coreSrc.match(/HOSTABLE_APP_IDS\s*=\s*new Set\(\[([\s\S]*?)\]\)/) || [])[1];
    const hostable = setBlock ? (setBlock.match(/'[a-z0-9-]+'/g) || []).map((s) => s.slice(1, -1)) : [];
    is(hostable.length >= 29, `SoT: core.ts declares ${hostable.length} hostable apps (refuse below 29)`);
    if (hostable.length < 29) throw new Error('HOSTABLE_APP_IDS parsed implausibly few — gate would be vacuous');

    /* ⭐ EXTRACT THE REAL HANDLER, NEVER REIMPLEMENT IT. #44's lesson: a
       gate that rewrites the thing it checks is testing a copy, and three
       mutations of the real dispatch sailed through. This pulls the
       literal line out of the shipped apps and requires it in ALL of
       them — so the fixture is the product's own code, and the check
       doubles as a fan-out completeness assertion. */
    const HANDLER = 'document.getElementById("lcs-cel-print").addEventListener("click",function(){window.print()});';
    const missing = hostable.filter((a) => {
      const p = path.join(__dirname, '..', 'REFERENCE APPS', a + '.html');
      return !fs.existsSync(p) || fs.readFileSync(p, 'utf8').indexOf(HANDLER) === -1;
    });
    is(missing.length === 0, missing.length
      ? `⭐ ${missing.length} hostable app(s) lack the print handler: ${missing.join(', ')}`
      : `all ${hostable.length} hostable apps carry the verbatim print handler`);

    /* THE CONTRACT — this is the assertion that flips with the fix. The
       header variants below are LITERALS, so the poison side exists no
       matter what the repo says; this reads what we actually ship. */
    const routeSrc = fs.readFileSync(
      path.join(__dirname, '..', 'frontend', 'app', 'play', 'w', '[linkId]', 'route.ts'), 'utf8');
    const cspLits = routeSrc.match(/'Content-Security-Policy':\s*'([^']*)'/g) || [];
    is(cspLits.length === 1, `route.ts declares exactly one CSP literal (found ${cspLits.length})`);
    const shipped = ((cspLits[0] || '').match(/'Content-Security-Policy':\s*'([^']*)'/) || [])[1] || '';
    is(/\ballow-modals\b/.test(shipped), `⭐ shipped CSP grants allow-modals — else Print is a silent no-op  [${shipped}]`);
    is(!/\ballow-same-origin\b/.test(shipped), 'shipped CSP still WITHHOLDS allow-same-origin — the opaque origin holds');

    const POISON = 'sandbox allow-scripts allow-popups';
    const FIXED = 'sandbox allow-scripts allow-popups allow-modals';
    const DOC =
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>t</title></head><body>' +
      '<div class="lcs-celebration"><div class="lcs-celebration__cta">' +
      '<button type="button" id="lcs-do-another">Do Another</button>' +
      '<button type="button" id="lcs-cel-print">Print my worksheet</button>' +
      '</div></div><script>window.__printCalls=0;(function(){var n=window.print;' +
      'window.print=function(){window.__printCalls++;try{n.call(window)}catch(e){}}})();' +
      HANDLER + '<\/script></body></html>';

    if (CONTRACT_ONLY) {
      console.log('  note  --contract-only: browser probes skipped (no Chromium on the deploy host)');
    } else {

    const srv2 = http.createServer((rq, rs) => {
      rs.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': rq.url.indexOf('/fixed') === 0 ? FIXED : POISON,
      });
      rs.end(DOC);
    }).listen(PORT + 1);

    const probe = async (route) => {
      const page = await browser.newPage();
      const logs = [];
      /* ⚠ THE BLINK SECURITY MESSAGE ARRIVES VIA Log.entryAdded, NOT
         Runtime.consoleAPICalled — page.on('console') never sees it. */
      const cdp = await page.createCDPSession();
      await cdp.send('Log.enable');
      cdp.on('Log.entryAdded', (e) => logs.push(String(e.entry && e.entry.text || '')));
      page.on('console', (m) => logs.push(m.text()));
      /* attach BEFORE navigating: an unhandled dialog blocks the page */
      let dialogs = 0;
      page.on('dialog', async (d) => { dialogs++; await d.dismiss().catch(() => { }); });

      await page.goto(`http://127.0.0.1:${PORT + 1}${route}`, { waitUntil: 'domcontentloaded' });

      /* ⚠ DO NOT AWAIT THE CLICK. If native print ever blocks the
         renderer, an awaited evaluate never resolves and the run reads
         as a hang — which the harness would score as SURVIVED. Fire it
         detached, then poll. */
      page.evaluate(() => { setTimeout(() => document.getElementById('lcs-cel-print').click(), 0); })
        .catch(() => { });
      await new Promise((r) => setTimeout(r, 1200));

      let printCalls = -1, alive = false;
      try {
        printCalls = await page.evaluate(() => window.__printCalls);
        alive = true;
      } catch { /* renderer wedged */ }

      /* wording-independent corroboration of the SAME single flag */
      let confirmRet = null;
      if (alive) {
        try { confirmRet = await page.evaluate(() => window.confirm('probe')); } catch { }
      }
      await page.close().catch(() => { });
      return { logs, printCalls, alive, dialogs, confirmRet };
    };

    const bad = await probe('/poison');
    const good = await probe('/fixed');
    const blocked = (r) => r.logs.some((t) => /ignored call to 'print\(\)'/i.test(t));

    is(bad.alive && good.alive, 'both renderers stayed responsive through the print call');
    is(bad.printCalls >= 1 && good.printCalls >= 1,
      `the real handler ran on both sides (${bad.printCalls}/${good.printCalls}) — the button is wired`);

    /* ⭐ THE POISON HALF. This must FAIL on the unfixed header, or the
       green half proves nothing. */
    is(blocked(bad), 'POISON: unfixed header ⇒ the browser reports it ignored print()');
    is(!blocked(good), '⭐ FIXED: allow-modals ⇒ print() is no longer ignored');
    is(bad.dialogs === 0 && bad.confirmRet === false,
      'POISON: modals flag set — confirm() returns false and raises no dialog');
    is(good.dialogs >= 1, '⭐ FIXED: modals flag clear — confirm() actually raises a dialog');

    if (blocked(bad)) {
      const m = bad.logs.find((t) => /ignored call to 'print\(\)'/i.test(t)) || '';
      console.log(/allow-modals/i.test(m)
        ? '  note  the block names allow-modals — diagnosis confirmed verbatim'
        : '  note  ⚠ block message no longer names allow-modals (Chromium reworded): ' + m);
    }

    srv2.close();
    }
  }

  if (browser) await browser.close();
  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks: every Print chip produces a sheet${CONTRACT_ONLY ? ' (contract-only)' : ''}`);
})();
