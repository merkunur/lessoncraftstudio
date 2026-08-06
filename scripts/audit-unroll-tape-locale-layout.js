/* =====================================================================
   audit-unroll-tape-locale-layout.js — 11 locales × 9 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-unroll-tape-locale-layout.js [--shot]

   The smoke gate proves each locale's STRINGS are right. This one proves
   each locale's LAYOUT survives them: a German compound or a Finnish
   agglutination is two or three times an English button, and the row it
   sits in is the same width in every language.

   99 renders. Measured, not eyeballed:
     · no horizontal overflow at any width in any language
     · the bench is contained by THE CARD (not by its own inner box —
       an overflow-x on the inner box absorbs the evidence)
     · every chip still ≥44px and still on-screen
     · the button row never pushes the bench off the bottom
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'urt', 'locale');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5535;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
/* 1400x880 is the EXACT Tier-A floor -- the widest bench this tool draws
   against the shortest viewport that draws it, and therefore the tightest
   cell in the sweep. 1366 stays as the CONTROL: nothing may move there. */
const WIDTHS = [320, 360, 412, 768, 1024, 1366, 1400, 1920, 2560];
const heightFor = (W) => (W >= 2400 ? 1440 : W >= 1800 ? 1080 : W >= 1400 ? 880 : W < 500 ? 740 : 900);

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0, renders = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const worst = { chip: Infinity, chipAt: '', overhang: -Infinity, overhangAt: '' };

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    for (const W of WIDTHS) {
      await page.setViewport({ width: W, height: heightFor(W) });
      await page.goto(`http://127.0.0.1:${PORT}/unroll-tape.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.urt-bench', { timeout: 9000 });
      await wait(260);
      renders++;

      const m = await page.evaluate(() => {
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const bench = document.querySelector('.urt-bench');
        const card = bench.parentElement;
        const chips = Array.from(document.querySelectorAll('.urt-chip'));
        const cardR = r(card);
        let over = -Infinity, minH = Infinity, offscreen = 0;
        for (const c of chips) {
          const cr = r(c);
          minH = Math.min(minH, cr.height);
          over = Math.max(over, cr.right - cardR.right);
          if (cr.right > window.innerWidth + 0.5 || cr.left < -0.5) offscreen++;
        }
        return {
        chipCount: chips.length,
        gripCount: document.querySelectorAll('.urt-handle').length,
        shapeChips: document.querySelectorAll('.urt-chip-shape').length,
        benchW: Math.round((document.querySelector('.urt-bench') || { getBoundingClientRect: () => ({ width: 0 }) }).getBoundingClientRect().width),
          overflowX: doc.scrollWidth > doc.clientWidth,
          benchOver: Math.round((r(bench).width - cardR.width) * 100) / 100,
          chipOver: Math.round(over * 100) / 100,
          minChipH: Math.round(minH),
          offscreen,
          lowest: Math.round(Math.max.apply(null, chips.map((c) => r(c).bottom))),
          vh: window.innerHeight
        };
      });

      const at = `${loc}@${W}`;
      /* ⚠⚠ NON-VACUITY FIRST, AND THIS FILE WAS THE WORST OFFENDER.
         Every aggregate below is seeded so that an EMPTY `.urt-chip`
         NodeList passes all of them: `over` starts at -Infinity, `minH` at
         Infinity, `offscreen` at 0, and `Math.max.apply(null, [])` is
         -Infinity. There was no chips.length assertion anywhere in the
         file, so a renamed class would have reported "PASS — 594 checks
         across 99 renders" having measured nothing at all. */
      is(m.chipCount >= 3, `${loc} ${W}px: the foot rendered its chips (${m.chipCount})`);
      is(m.shapeChips >= 5, `${loc} ${W}px: the shape shelf rendered (${m.shapeChips} chips)`);
      is(m.gripCount >= 2, `${loc} ${W}px: the bench rendered its handles (${m.gripCount})`);
      is(m.benchW >= 240, `${loc} ${W}px: the bench is laid out (${m.benchW}px)`);
      is(!m.overflowX, `${at}: horizontal overflow`);
      /* ⚠ measured against THE CARD, never the inner box */
      is(m.benchOver <= 0.5, `${at}: the bench overhangs the card by ${m.benchOver}px`);
      is(m.chipOver <= 0.5, `${at}: a button overhangs the card by ${m.chipOver}px`);
      is(m.offscreen === 0, `${at}: ${m.offscreen} button(s) off-screen`);
      is(m.minChipH >= 44, `${at}: smallest button is ${m.minChipH}px, under the 44px floor`);
      is(m.lowest <= m.vh, `${at}: the button row is cut off (${m.lowest} > ${m.vh})`);

      if (m.minChipH < worst.chip) { worst.chip = m.minChipH; worst.chipAt = at; }
      if (m.chipOver > worst.overhang) { worst.overhang = m.chipOver; worst.overhangAt = at; }

      if (SHOT && W === 360) await page.screenshot({ path: path.join(OUT, `${loc}-360.png`), fullPage: true });
    }
    await page.close();
    console.log(`  ok   ${loc}: ${WIDTHS.length} widths clean`);
  }

  await browser.close();
  srv.close();
  console.log('');
  console.log(`  tightest button: ${worst.chip}px at ${worst.chipAt}`);
  console.log(`  worst overhang:  ${worst.overhang}px at ${worst.overhangAt}`);
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks across ${renders} renders`); process.exit(1); }
  console.log(`PASS — ${PASS} checks across ${renders} renders (${LOCALES.length} locales × ${WIDTHS.length} widths)`);
})();
