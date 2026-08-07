#!/usr/bin/env node
/* =====================================================================
   audit-home-language-bridge-locale-layout.js — the Say It Board at
   every width, in every language.
   ---------------------------------------------------------------------
   ⚠ THIS GATE DID NOT EXIST FOR THE v2 BOARD, and its absence is how a
   clipped core rail shipped. English fits. German compounds do not, and
   Finnish agglutination does not, and this board's whole subject is
   that the child does not speak English.

   ⭐ THE DEFECT THAT PROVES IT. The core rail is a fixed four columns —
   deliberately, because the eight cards a child needs most must stay in
   the same eight places whatever else is showing; that is the motor
   plan, and it is the reason a core works at all. But a CSS grid item
   defaults to `min-width:auto`, i.e. min-CONTENT, so a track holding
   the word "understand" refuses to shrink below that word. At 360px the
   four columns overflowed and the last two of the eight were CUT OFF.

   Nothing caught it. There was no horizontal document overflow — the
   card's own `overflow:hidden` ate the evidence. Every cell was above
   the tap floor. Nothing was "off screen" by any measure anyone was
   taking. It was visible the moment I looked at the render, and the fix
   is two CSS properties (`min-width:0` on the card, `overflow-wrap` on
   the text) that no amount of assertion-writing would have suggested.

   ⚠ SO THIS MEASURES CONTAINMENT AGAINST `.lcs-app`, THE CARD ITSELF,
   not against an inner box — cells inside a mat that itself overflows
   pass every cell-level check, and `overflow-x` absorbs the proof.

   ⚠ FRESH BROWSER PER CELL. A shared one caches the module and a
   locale-selection bug then hides behind the first locale's copy.

   ⚠ AND 704 IS IN THE SWEEP because it is the width a teacher on the
   tool page actually gets (`max-w-3xl`, measured, at 1440 / 1920 / 2560
   alike). Every other gate in this repo tops out at a list that omits
   it, and the v2 board's three `(min-width:1367px)` tiers were dead
   there for every desktop teacher who ever opened it.

   Usage: node scripts/audit-home-language-bridge-locale-layout.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 704, 768, 1024, 1366];
const TAP_FLOOR = 44;    /* a control */
const CELL_FLOOR = 34;   /* a card on the board — a different thing, named separately */
const TEXT_FLOOR = 14;
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const server = http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  let cells = 0, bad = 0;

  for (const w of WIDTHS) {
    for (const loc of LOCALES) {
      const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
      const p = await b.newPage();
      await p.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      await p.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (e) {} });
      await p.goto(`${base}/home-language-bridge.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 250));

      const m = await p.evaluate((TAP, CELL, TEXT) => {
        const app = document.querySelector('.lcs-app');
        if (!app) return { fatal: 'no .lcs-app' };
        const r = app.getBoundingClientRect();
        const cards = Array.from(document.querySelectorAll('.hlb-card'));
        if (!cards.length) return { fatal: 'no cards — this cell measured nothing' };
        const ctl = Array.from(document.querySelectorAll('.hlb-chip,.hlb-tab,.hlb-lang'))
          .filter((e) => e.getBoundingClientRect().width > 0);
        const txt = Array.from(document.querySelectorAll('.hlb-text,.hlb-privacy,.hlb-note,.hlb-hint'))
          .filter((e) => (e.textContent || '').trim() && e.getBoundingClientRect().width > 0);
        return {
          n: cards.length,
          past: cards.filter((c) => c.getBoundingClientRect().right > r.right + 1)
            .map((c) => c.getAttribute('data-id')),
          clip: cards.filter((c) => c.scrollWidth > c.clientWidth + 1 || c.scrollHeight > c.clientHeight + 1)
            .map((c) => c.getAttribute('data-id')),
          tiny: cards.filter((c) => { const b = c.getBoundingClientRect(); return b.width < CELL || b.height < CELL; }).length,
          smallCtl: ctl.filter((c) => { const b = c.getBoundingClientRect(); return b.width < TAP || b.height < TAP; })
            .map((c) => (c.textContent || '').trim().slice(0, 24)),
          smallTxt: txt.filter((e) => parseFloat(getComputedStyle(e).fontSize) < TEXT).length,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
        };
      }, TAP_FLOOR, CELL_FLOOR, TEXT_FLOOR);

      cells++;
      const at = `${w}px ${loc}`;
      if (m.fatal) { console.error(`  FATAL ${at}: ${m.fatal}`); bad++; }
      else {
        /* ⚠ THE TWO TAP FLOORS ARE NAMED SEPARATELY. An or-shaped
           assertion over both has hidden a missing floor twice in this
           programme: a control and a canvas cell are different things
           with different minimums. */
        if (m.past.length) { console.error(`  FAIL ${at}: ${m.past.length} card(s) past the card's right edge — ${m.past.join(', ')}`); bad++; }
        if (m.clip.length) { console.error(`  FAIL ${at}: ${m.clip.length} card(s) with clipped content — ${m.clip.join(', ')}`); bad++; }
        if (m.tiny) { console.error(`  FAIL ${at}: ${m.tiny} card(s) below the ${CELL_FLOOR}px cell floor`); bad++; }
        if (m.smallCtl.length) { console.error(`  FAIL ${at}: ${m.smallCtl.length} control(s) below the ${TAP_FLOOR}px tap floor — ${m.smallCtl.join(' | ')}`); bad++; }
        if (m.smallTxt) { console.error(`  FAIL ${at}: ${m.smallTxt} text node(s) below ${TEXT_FLOOR}px`); bad++; }
        if (m.overflow > 2) { console.error(`  FAIL ${at}: ${m.overflow}px of horizontal document overflow`); bad++; }
      }
      await b.close();
    }
  }
  server.close();

  /* ⚠ NON-VACUITY: a run that measured nothing must not report success. */
  if (cells !== LOCALES.length * WIDTHS.length) {
    console.error(`  FATAL measured ${cells} cells, expected ${LOCALES.length * WIDTHS.length}`);
    process.exit(1);
  }
  console.log('');
  console.log(bad
    ? `FAIL — ${bad} problem(s) across ${cells} cells`
    : `PASS — ${cells} cells (${LOCALES.length} locales x ${WIDTHS.length} widths), no clipping, no overflow, both tap floors held`);
  process.exit(bad ? 1 : 0);
})();
