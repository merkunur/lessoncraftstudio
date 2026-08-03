/* =====================================================================
   audit-comparison-planks-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-comparison-planks-locale-layout.js [--shot]

   ⚠ THE ENGLISH SWEEP IS NOT THE SWEEP. `local-test-` measures layout
   in English, and English is among the SHORTEST of the eleven here —
   German `Arbeitsblatt drucken` and Dutch `Bekijk het Leerkracht-pakket`
   are half again as long as their English source. A chip row that fits
   at 320px in English can break in five languages, and no English-only
   gate can see it.

   ⭐ AND THE TOGGLE CHIP IS SIZED BY ITS LONGEST STATE, not by what is
   showing. `_chipToggle` swaps between takeBtn / layBtn / putBackBtn,
   so this drives all three and measures each — a sweep that only ever
   saw `takeBtn` would be measuring the shortest of the three.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'cmp', 'locales');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5538;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
/* 1400x880 is the EXACT Tier-A floor -- the widest bench this tool draws
   against the shortest viewport that draws it, and therefore the tightest
   cell in the sweep. It matters most HERE: this tool has the heaviest
   chrome in the batch (466px measured, gate open, German), so its Tier-A
   budget is 839 of 880 and there is no room for a guess.
   1366 stays as the CONTROL: nothing may move there. */
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

let PASS = 0, FAIL = 0;
const worst = [];
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    for (const W of WIDTHS) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e)));
      await page.setViewport({ width: W, height: heightFor(W) });
      await page.goto(`http://127.0.0.1:${PORT}/comparison-planks.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.cmp-bench', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 320));

      /* ⭐ measure the toggle in ALL THREE of its states, plus the two
         hint lines in the state where BOTH are showing at once */
      const m = await page.evaluate(() => {
        const inst = window.ComparisonPlanks;
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const card = document.querySelector('.cmp-bench').parentElement;
        const cardBox = r(card);
        const out = { overflow: false, chipOver: -Infinity, worstChip: '', lowest: 0, vh: window.innerHeight };
        const states = [
          { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 },   /* takeBtn */
          { a: 5, b: 9, phase: 'free', dx: 300, dy: 400 },   /* layBtn  */
          { a: 5, b: 9, phase: 'laid', dx: 0, dy: 0 }        /* putBack */
        ];
        for (const st of states) {
          inst.st = inst._st(st); inst._paint();
          if (doc.scrollWidth > doc.clientWidth) out.overflow = true;
          for (const c of document.querySelectorAll('.cmp-chip')) {
            const b = r(c);
            if (getComputedStyle(c).visibility === 'hidden') continue;
            /* ⚠ measured against THE CARD, not the inner row — an
               overflow-x on the row would absorb the evidence */
            const over = Math.round(Math.max(cardBox.left - b.left, b.right - cardBox.right));
            if (over > out.chipOver) { out.chipOver = over; out.worstChip = c.textContent.trim(); }
            out.lowest = Math.max(out.lowest, Math.round(b.bottom));
          }
        }
        /* the two-hint frame: attached with a difference shows both */
        inst.st = inst._st({ a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 }); inst._paint();
        const hints = Array.from(document.querySelectorAll('.cmp-hint'))
          .filter((e) => getComputedStyle(e).display !== 'none');
        out.hintCount = hints.length;
        out.hintOver = hints.reduce((a, e) => Math.max(a, Math.round(r(e).right - cardBox.right)), 0);
        return out;
      });

      const tag = `${loc}@${W}px`;
      is(!m.overflow, `${tag}: horizontal overflow in some toggle state`);
      is(m.chipOver <= 0, `${tag}: a chip escapes THE CARD by ${m.chipOver}px — "${m.worstChip}"`);
      is(m.hintOver <= 0, `${tag}: a hint line escapes the card by ${m.hintOver}px`);
      is(m.hintCount === 2, `${tag}: both hint lines show at once, got ${m.hintCount}`);
      is(m.lowest <= m.vh, `${tag}: FITS — lowest chip ${m.lowest} ≤ ${m.vh}`);
      is(errs.length === 0, `${tag}: page error — ${errs[0] || ''}`);
      if (m.chipOver > -6) worst.push(`${tag} margin ${-m.chipOver}px ("${m.worstChip}")`);

      if (SHOT && W === 360) await page.screenshot({ path: path.join(OUT, `${loc}-360.png`), fullPage: true });
      await page.close();
    }
    process.stdout.write(`  ${loc} `);
  }

  await browser.close();
  srv.close();
  console.log('');
  if (worst.length) {
    console.log('\n  tightest chip margins (informational, not a failure):');
    for (const w of worst.slice(0, 8)) console.log('    ' + w);
  }
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks across ${LOCALES.length} locales × ${WIDTHS.length} viewports`);
})();
