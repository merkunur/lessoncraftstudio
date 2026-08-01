/* =====================================================================
   audit-build-plan-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-build-plan-locale-layout.js [--shot]

   English fitting proves nothing about German compounds, Finnish
   agglutination or Dutch chains. This measures the CHROME — the four
   chips and the hint line — in every locale at every width, because
   that is where a long word breaks a layout.

   ⚠ CLONING A GATE COPIES ITS SELECTORS *AND* ITS GLOBALS. Two of #43's
   locale gates silently drove the PREVIOUS tool's global with the
   previous tool's state shape, and only surfaced because that global
   was absent. Had the names matched, eleven locales and 396 cells would
   have been certified off one untouched opening frame. Everything here
   is written against build-plan's own artefact.

   ⚠ MEASURED AGAINST THE CARD, not the inner row: an overflow-x on a
   flex row absorbs the evidence.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'bpl', 'locales');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5575;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

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
const worst = [];
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const loc of LOCALES) {
    process.stdout.write('  ' + loc + ' ');
    for (const W of WIDTHS) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e)));
      await page.setViewport({ width: W, height: W < 500 ? 740 : 900 });
      await page.goto(`http://127.0.0.1:${PORT}/build-plan.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.bpl-bench', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 300));

      const m = await page.evaluate(() => {
        const inst = window.BuildPlan;
        if (!inst) return { fatal: 'window.BuildPlan is not defined' };
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const card = document.querySelector('.bpl-bench').closest('.lcs-app');
        const cardBox = r(card);
        const out = { overflow: false, chipOver: -Infinity, worstChip: '', lowest: 0, hintOver: -Infinity, vh: window.innerHeight, hintSeen: 0 };

        /* every state whose HINT text differs, because the longest hint
           in a locale is not the same branch in every locale */
        const states = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1],     /* hintPlan */
          [1, 2, 3, 1, 2, 3, 1, 2, 3],     /* hintSame */
          [4, 4, 4, 0, 0, 0, 0, 0, 0],     /* hintDetermined */
          [4, 4, 4, 4, 4, 4, 4, 4, 4]      /* the fullest stage */
        ];
        const hintTexts = new Set();
        for (const h of states) {
          inst.st = inst._st({ h: h }); inst._paint();
          if (doc.scrollWidth > doc.clientWidth) out.overflow = true;
          for (const c of document.querySelectorAll('.bpl-chip')) {
            if (getComputedStyle(c).visibility === 'hidden') continue;
            const b = r(c);
            const over = Math.round(Math.max(cardBox.left - b.left, b.right - cardBox.right));
            if (over > out.chipOver) { out.chipOver = over; out.worstChip = c.textContent.trim(); }
            out.lowest = Math.max(out.lowest, Math.round(b.bottom));
          }
          const hint = document.querySelector('.bpl-hint');
          if (hint && hint.textContent.trim()) {
            hintTexts.add(hint.textContent.trim());
            const hb = r(hint);
            out.hintOver = Math.max(out.hintOver, Math.round(Math.max(cardBox.left - hb.left, hb.right - cardBox.right)));
            out.lowest = Math.max(out.lowest, Math.round(hb.bottom));
          }
        }
        out.hintSeen = hintTexts.size;
        return out;
      });

      const tag = `${loc}@${W}px`;
      if (m.fatal) { is(false, `${tag}: ${m.fatal}`); await page.close(); continue; }
      is(!m.overflow, `${tag}: horizontal overflow in some state`);
      is(m.chipOver <= 0, `${tag}: a chip escapes THE CARD by ${m.chipOver}px — "${m.worstChip}"`);
      is(m.hintOver <= 0, `${tag}: the hint line escapes the card by ${m.hintOver}px`);
      /* ⚠ the floor is the number of DISTINCT hint texts the four
         states must produce; three branches are reachable from them */
      is(m.hintSeen >= 3, `${tag}: only ${m.hintSeen} distinct hint texts across four states — a branch is not reachable`);
      is(m.lowest <= m.vh, `${tag}: FITS — lowest chrome ${m.lowest} <= ${m.vh}`);
      is(errs.length === 0, `${tag}: page error — ${errs[0] || ''}`);
      if (m.chipOver > -6) worst.push(`${tag} margin ${-m.chipOver}px ("${m.worstChip}")`);

      if (SHOT && W === 360) await page.screenshot({ path: path.join(OUT, `${loc}-360.png`), fullPage: true });
      await page.close();
    }
  }
  await browser.close();
  srv.close();
  console.log('\n');
  if (worst.length) {
    console.log('  tightest chip margins (informational, not a failure):');
    for (const w of worst.slice(0, 10)) console.log('    ' + w);
    console.log('');
  }
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks across ${LOCALES.length} locales × ${WIDTHS.length} viewports`);
})();
