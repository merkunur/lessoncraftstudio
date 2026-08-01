/* =====================================================================
   audit-cold-line-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-cold-line-locale-layout.js [--shot]

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
const PORT = 5562;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

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
      await page.setViewport({ width: W, height: W < 500 ? 740 : 900 });
      await page.goto(`http://127.0.0.1:${PORT}/cold-line.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.cld-bench', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 320));

      /* ⭐ measure the chips in EVERY state whose caption changes, and
         the hint line in each of its four branches.

         ⚠⚠ CLONED AND NOT ADAPTED, LIKE THE SMOKE GATE: this drove
         `window.ComparisonPlanks` with #42's {phase, dx, dy} state into
         a tool whose state is {lo, a, b, tipped}. It only surfaced
         because #42's global is absent here. Had the names matched, all
         66 cells would have measured the same untouched opening frame
         and reported green. */
      const m = await page.evaluate(() => {
        const inst = window.ColdLine;
        if (!inst) return { fatal: 'window.ColdLine is not defined' };
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const card = document.querySelector('.cld-bench').parentElement;
        const cardBox = r(card);
        const out = { overflow: false, chipOver: -Infinity, worstChip: '', lowest: 0, vh: window.innerHeight };
        /* the tip chip carries a different caption in each pose, and
           the longest word in a locale may be in either of them; the
           window against the domain floor also draws the bulb, which
           adds a part to the widest row. Sweep all of it. */
        const states = [
          { lo: -12, a: -5, b: 3, tipped: false },
          { lo: -12, a: -5, b: 3, tipped: true },
          { lo: -30, a: -28, b: -20, tipped: false },
          { lo: 10, a: 12, b: 20, tipped: true }
        ];
        for (const st of states) {
          inst.st = inst._st(st); inst._paint();
          if (doc.scrollWidth > doc.clientWidth) out.overflow = true;
          for (const c of document.querySelectorAll('.cld-chip')) {
            const b = r(c);
            if (getComputedStyle(c).visibility === 'hidden') continue;
            /* ⚠ measured against THE CARD, not the inner row — an
               overflow-x on the row would absorb the evidence */
            const over = Math.round(Math.max(cardBox.left - b.left, b.right - cardBox.right));
            if (over > out.chipOver) { out.chipOver = over; out.worstChip = c.textContent.trim(); }
            out.lowest = Math.max(out.lowest, Math.round(b.bottom));
          }
        }
        /* the hint line, measured in EVERY branch it can take — one
           line, four texts, and the longest is not the same text in
           every locale. hintSlide only appears with a mark out of the
           window, so a single frame would never see it. */
        const hintStates = [
          { lo: -12, a: -5, b: 3, tipped: false },   /* hintSpan  */
          { lo: -12, a: 0, b: 0, tipped: false },    /* hintSet   */
          { lo: 8, a: -5, b: 3, tipped: false },     /* hintSlide */
          { lo: -12, a: -5, b: 3, tipped: true }     /* hintTip   */
        ];
        let hints = [];
        for (const hs of hintStates) {
          inst.st = inst._st(hs); inst._paint();
          const live = Array.from(document.querySelectorAll('.cld-hint'))
            .filter((e) => getComputedStyle(e).display !== 'none' && e.textContent.trim());
          hints = hints.concat(live);
          out.hintOver = Math.max(out.hintOver || 0,
            live.reduce((a, e) => Math.max(a, Math.round(r(e).right - cardBox.right)), 0));
          out.lowest = Math.max(out.lowest, ...live.map((e) => Math.round(r(e).bottom)));
        }
        out.hintCount = hints.length;
        return out;
      });

      const tag = `${loc}@${W}px`;
      if (m.fatal) { is(false, `${tag}: ${m.fatal}`); await page.close(); continue; }
      is(!m.overflow, `${tag}: horizontal overflow in some toggle state`);
      is(m.chipOver <= 0, `${tag}: a chip escapes THE CARD by ${m.chipOver}px — "${m.worstChip}"`);
      is(m.hintOver <= 0, `${tag}: a hint line escapes the card by ${m.hintOver}px`);
      /* ⚠ #42 showed TWO hint lines at once; this tool has ONE line
         that says four different things. Asserting "2" here would have
         been the narrative-over-artefact error again — so the claim is
         that the line is live in all FOUR branches. */
      is(m.hintCount === 4, `${tag}: the hint line is live in all four branches, got ${m.hintCount}`);
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
