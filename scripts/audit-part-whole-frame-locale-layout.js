/* =====================================================================
   audit-part-whole-frame-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-part-whole-frame-locale-layout.js [--shot]

   ⚠ THE ENGLISH SWEEP IS NOT THE SWEEP. `local-test-` measures layout in
   English, and English is among the SHORTEST of the eleven here — the
   German `Das Ganze`, the Finnish `Ota liina pois kokonaisuuden päältä`
   and the Dutch `Bekijk het Leerkracht-pakket` all run half again as long
   as their English source. A row that fits at 320px in English can break
   in five languages, and no English-only gate can see it.

   ⚠⚠ AND A CLONED GATE COPIES ITS SELECTORS *AND* ITS GLOBALS. Both of
   #43's locale gates drove `window.ComparisonPlanks` with #42's state
   shape into a tool that has neither, and it surfaced only because the
   global was absent. Had the names matched, every cell would have
   certified the same untouched opening frame. So this drives
   `window.PartWholeFrame` explicitly and FAILS LOUDLY if it is not there.

   ⭐ EVERY STATE WHOSE TEXT CHANGES IS SWEPT, not just the one the tool
   opens on: both cloth states (the peg's accessible name swaps between
   two authored phrases of different length), the three notation modes,
   and both the smallest and the densest whole — because the wide-tier
   size ladder keys on the COLUMN COUNT, so a small whole is the state
   with the LARGEST counters and a big whole the state with the most rows.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'pwf', 'locales');
const SHOT = process.argv.indexOf('--shot') >= 0;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '').replace(/^\//, '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(0);

let PASS = 0, FAIL = 0;
const worst = [];
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  const PORT = srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    for (const W of WIDTHS) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e)));
      /* the record and the print sheet only exist for a subscriber, and
         the record is the widest thing on the stage — sweeping the free
         build would skip the whole right-hand column */
      await page.setRequestInterception(true);
      page.on('request', (r) => r.url().includes('/api/auth/me')
        ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
        : r.continue());
      await page.evaluateOnNewDocument(() => { try { localStorage.clear(); localStorage.setItem('accessToken', 'harness'); } catch (_) {} });
      await page.setViewport({ width: W, height: W < 500 ? 740 : 900 });
      await page.goto(`http://127.0.0.1:${PORT}/part-whole-frame.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.pwf-sheet', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 420));

      const m = await page.evaluate(() => {
        const inst = window.PartWholeFrame;
        if (!inst) return { fatal: 'window.PartWholeFrame is not defined' };
        if (typeof inst._setWhole !== 'function' || !inst.api) return { fatal: 'the global is not this tool' };
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        const card = document.querySelector('.lcs-app') || document.body;
        const cardBox = r(card);
        const out = { overflow: false, escape: -Infinity, worstEl: '', lowest: 0, vh: window.innerHeight,
                      pegNames: new Set(), tiny: [], seen: 0 };

        const measure = () => {
          if (doc.scrollWidth > doc.clientWidth + 1) out.overflow = true;
          /* ⚠ measured against THE CARD, not an inner row — an overflow-x
             on the row would absorb the evidence */
          const els = document.querySelectorAll(
            '.pwf-headlbl,.pwf-cap,.pwf-linkbtn,.pwf-quickbtn,.pwf-step,.pwf-wayslbl,'
            + '.pwf-wayshint,.pwf-nline,.pwf-num,.pwf-headval,.pwf-gate,.pwf-waycell');
          for (const e of els) {
            const b = r(e);
            if (!b.width || getComputedStyle(e).visibility === 'hidden') continue;
            const over = Math.round(Math.max(cardBox.left - b.left, b.right - cardBox.right));
            if (over > out.escape) { out.escape = over; out.worstEl = (e.className.split(' ')[0] || '?') + ' "' + e.textContent.trim().slice(0, 26) + '"'; }
            out.lowest = Math.max(out.lowest, Math.round(b.bottom));
            const px = parseFloat(getComputedStyle(e).fontSize);
            if (e.textContent.trim() && px < 14) out.tiny.push(e.className.split(' ')[0] + ' ' + px.toFixed(1));
          }
          for (const p of document.querySelectorAll('.pwf-peg')) out.pegNames.add(p.getAttribute('aria-label') || '');
          out.seen++;
        };

        /* ⭐ every state whose TEXT or SIZE changes. The peg's accessible
           name swaps between two authored phrases; the notation has three
           modes; and the size ladder keys on the column count, so a small
           whole is the LARGEST-counter state and a big one the densest. */
        [['off', 6], ['sum', 6], ['family', 6], ['family', 20], ['sum', 2]].forEach(([note, whole]) => {
          inst.api.settings.notation = note;
          inst.api.settings.band = '20';
          inst.api.settings.tone = 'two';
          inst._setWhole(whole);
          inst.render();
          measure();
          inst.covers = { whole: false, a: true, b: false };
          inst.render();
          measure();
          inst.covers = { whole: false, a: false, b: false };
        });
        out.pegNames = Array.from(out.pegNames);
        return out;
      });

      const tag = `${loc}@${W}px`;
      if (m.fatal) { is(false, `${tag}: ${m.fatal}`); await page.close(); continue; }
      is(m.seen === 10, `${tag}: all ten states were measured, got ${m.seen}`);
      is(!m.overflow, `${tag}: horizontal overflow in some state`);
      is(m.escape <= 0, `${tag}: something escapes THE CARD by ${m.escape}px — ${m.worstEl}`);
      is(m.tiny.length === 0, `${tag}: text below the 14px reading floor — ${m.tiny.slice(0, 3).join(', ')}`);
      /* ⭐ the peg's accessible name is one of SIX authored phrases and
         swaps with its state; if only one ever appeared, the sweep never
         entered the covered state and half of these strings are untested */
      is(m.pegNames.length >= 2, `${tag}: the peg names both of its states, got ${m.pegNames.length}`);
      is(m.pegNames.every((n) => n && n.length > 3), `${tag}: a peg has no accessible name`);
      is(errs.length === 0, `${tag}: page error — ${errs[0] || ''}`);
      if (m.escape > -6) worst.push(`${tag} margin ${-m.escape}px (${m.worstEl})`);

      if (SHOT && W === 360) await page.screenshot({ path: path.join(OUT, `${loc}-360.png`), fullPage: true });
      await page.close();
    }
    process.stdout.write(`  ${loc}`);
  }

  await browser.close();
  srv.close();
  console.log('');
  if (worst.length) {
    console.log('\n  tightest margins (informational, not a failure):');
    for (const w of worst.slice(0, 8)) console.log('    ' + w);
  }
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks across ${LOCALES.length} locales × ${WIDTHS.length} viewports`);
})();
