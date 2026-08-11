/* =====================================================================
   audit-pair-gate-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-pair-gate-locale-layout.js [--shot]

   ⚠⚠ THE ENGLISH SWEEP IS NOT THE SWEEP. probe-pair-gate.js measures
   geometry in English only, and the smoke visits all eleven locales at
   one width — so ten languages at a phone width are unmeasured until
   this file. The act strip is the widest surface this tool ships: a
   20-chip numeral strip, a legend, prediction chips with miniatures,
   and five labeled buttons whose captions run longest in da/no/fi.

   ⭐ EVERYTHING IS MEASURED AGAINST THE CARD (.pgt-wrap), NOT AGAINST
   ITS OWN ROW. Every row here is flex-wrap, so an over-wide button
   simply wraps and reports no overflow — the evidence is absorbed
   exactly as an overflow-x absorbs it.

   ⭐ AND IT SWEEPS BOTH EXTREME WIDTH SETTINGS, k=2 AND k=5. The
   prediction-chip row is at its widest at k=5 (chips 0..4, each with
   a five-place miniature), a state the default never shows.

   ⚠ TAP FLOORS ARE NAMED SEPARATELY: controls ≥44px (the house
   control floor) — held for every .pgt-btn including all twenty strip
   chips. Marchers are not tap targets; no canvas floor exists to
   assert, and asserting one would measure a thing that does not exist.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'pair-gate', 'locales');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5687;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const heightFor = (W) => (W < 500 ? 740 : 900);
const TAP = 44;

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'pair-gate.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('  FAIL ' + m); } };

/* measure every control against the CARD */
const MEASURE = (k) => {
  const T = window.PairGate;
  if (String(k) !== String(T.st.k)) { T.api.settings.n = String(k); T.onSettings(); }
  const r = (e) => e.getBoundingClientRect();
  const wrap = document.querySelector('.pgt-wrap');
  const wb = r(wrap);
  let over = -Infinity, tap = 999, n = 0;
  document.querySelectorAll('.pgt-btn').forEach((b) => {
    const bx = r(b);
    if (bx.width === 0) return;
    n++;
    over = Math.max(over, Math.round(Math.max(wb.left - bx.left, bx.right - wb.right)));
    tap = Math.min(tap, Math.round(bx.height));
  });
  document.querySelectorAll('.pgt-leg, .pgt-say').forEach((e) => {
    const bx = r(e);
    if (bx.width === 0) return;
    over = Math.max(over, Math.round(Math.max(wb.left - bx.left, bx.right - wb.right)));
  });
  /* ⚠ NO page-overflow assertion. This gate's own poison run proved it
     unmeasurable: the SHELL clips at `.lcs-app.embed{overflow-x:hidden}`
     (measured), so horizontal page scroll is structurally impossible
     and the check could never fire — a gate that cannot fail is not a
     gate. Containment is carried entirely by the against-the-CARD
     check above, which the poison observes firing. */
  return { over, tap, n, wrapW: Math.round(wb.width) };
};

/* ------------------------------------------------------------------ */
/* POISON — every measured assertion must be observed FAILING on a
   synthetic violation, and the untouched tool observed PASSING. */
async function poison(browser) {
  let ok = true;
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 740 });
  await page.goto(`http://127.0.0.1:${PORT}/mini-tools/pair-gate.html?lang=de&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.pgt-wrap', { timeout: 9000 });
  await new Promise((r) => setTimeout(r, 350));

  const probe = (mutate) => page.evaluate((src, mfn) => {
    /* eslint-disable no-eval */
    if (src) eval(src);
    return eval('(' + mfn + ')')(2);
  }, mutate || '', MEASURE.toString());

  const control = await probe(null);
  if (control.over <= 0 && control.tap >= TAP && control.n >= 25) {
    console.log(`  CONTROL  untouched de@360 passes — margin ${-control.over}px, tap ${control.tap}px, ${control.n} controls`);
  } else { ok = false; console.log('  !! CONTROL FAILED on the shipped tool: ' + JSON.stringify(control)); }

  /* 1. containment — a label wide enough to escape the card */
  const p1 = await probe("var l=document.querySelector('.pgt-b-call .pgt-lab');l.textContent='X'.repeat(120);"
    + "l.parentNode.style.maxWidth='none';l.style.whiteSpace='nowrap';");
  if (p1.over > 0) console.log(`  FIRED    containment — a 120-char nowrap label escapes by ${p1.over}px`);
  else { ok = false; console.log('  !! containment DID NOT FIRE on a 120-char nowrap label'); }

  /* 2. tap floor — squash a control under 44px */
  const p2 = await probe("var b=document.querySelector('.pgt-b-size-7');b.style.minHeight='0';b.style.height='20px';b.style.padding='0';");
  if (p2.tap < TAP) console.log(`  FIRED    tap floor — a squashed chip measures ${p2.tap}px`);
  else { ok = false; console.log('  !! tap floor DID NOT FIRE on a 20px control'); }

  /* 3. the card check must also see a NON-BUTTON surface escaping */
  const p3 = await probe("var s=document.querySelector('.pgt-leg');s.textContent='Y'.repeat(140);s.style.whiteSpace='nowrap';s.style.width='max-content';");
  if (p3.over > 0) console.log(`  FIRED    legend containment — a 140-char legend escapes by ${p3.over}px`);
  else { ok = false; console.log('  !! legend containment DID NOT FIRE'); }

  await page.close();
  return ok;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const armed = await poison(browser);
  if (!armed) {
    console.log('\nFATAL: the poison block failed — this gate is not a gate.');
    await browser.close(); srv.close(); process.exit(1);
  }

  for (const L of LOCALES) {
    for (const W of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: W, height: heightFor(W) });
      await page.goto(`http://127.0.0.1:${PORT}/mini-tools/pair-gate.html?lang=${L}&embed=1`, { waitUntil: 'domcontentloaded' });
      try { await page.waitForSelector('.pgt-wrap', { timeout: 9000 }); } catch (e) {
        is(false, `${L}@${W}: the tool never mounted`); await page.close(); continue;
      }
      await new Promise((r) => setTimeout(r, 320));

      for (const k of [2, 5]) {
        const m = await page.evaluate((kk, mfn) => eval('(' + mfn + ')')(kk), k, MEASURE.toString());
        is(m.n >= 25, `${L}@${W} k=${k}: only ${m.n} controls measured — the strip is missing`);
        is(m.over <= 0, `${L}@${W} k=${k}: a control escapes the card by ${m.over}px`);
        is(m.tap >= TAP, `${L}@${W} k=${k}: the smallest control is ${m.tap}px (< ${TAP})`);
      }
      if (SHOT) await page.screenshot({ path: path.join(OUT, `${L}-${W}.png`) });
      await page.close();
    }
    console.log(`[${L}] swept ${WIDTHS.length} widths x k=2,5`);
  }

  await browser.close(); srv.close();
  console.log(`\n${FAIL ? 'FAIL' : 'PASS'}  ${PASS} layout cells clean, ${FAIL} failures`);
  if (FAIL) process.exit(1);
})();
