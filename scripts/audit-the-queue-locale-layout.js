/* =====================================================================
   audit-the-queue-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-the-queue-locale-layout.js [--shot]

   ⚠⚠ THE ENGLISH SWEEP IS NOT THE SWEEP, AND THIS TOOL PROVES IT TWICE.
   `probe-the-queue.js` measures geometry in English only, and
   `smoke-the-queue-locales.js` visits all eleven locales but ONLY at
   1024px — so between them, ten languages at a phone width were
   completely unmeasured until this file existed. That is precisely the
   surface the locale fold changes: every visible label on the apparatus
   is now a different length in every language.

   Measured on the shipped copy, longest end-button label per locale:
     en 24 · de 24 ("Am anderen Ende anfangen") · da 23 ("Begynd i den
     anden ende") · sv 22 · no 25 ("Start fra den andre enden") · nl 24
     · it 25 ("Comincia dall'altra parte") · fr 21 · es 21 · pt 21 ·
     fi 15 ("Toisesta päästä" — the shortest, because Finnish answers
     "mistä?" with a case ending and needs no verb).
   Six of eleven are LONGER than the English, so an English-only gate
   measures near the best case.

   ⭐ THE TWO ROWS ARE MEASURED AGAINST THE CARD, NOT AGAINST THEMSELVES.
   `.que-row` is `flex-wrap`, so a button that does not fit simply wraps
   and the row reports no overflow — the evidence is absorbed exactly as
   an `overflow-x` absorbs it. Every button is therefore compared to the
   bounding box of `.que-wrap`, which is the box a teacher sees.

   ⭐ AND IT SWEEPS BOTH SETTINGS, NOT JUST THE DEFAULT. `size: 'four'`
   is the default, but `size: 'three'` is a shipped setting that changes
   the platform AND permanently disables the `board` button — a disabled
   button still occupies the row, so the row is at its widest in the
   state the default never shows. Both are driven.

   ⚠ TAP FLOORS ARE NAMED SEPARATELY: controls ≥44px (the house control
   floor), which is what `.que-btn{min-height:44px}` claims and what this
   gate holds it to. The canvas carries no tap targets in this tool —
   nothing on the platform is clickable — so there is no cell floor to
   assert, and asserting one would be measuring a thing that does not
   exist.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'the-queue', 'locales');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5561;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const heightFor = (W) => (W < 500 ? 740 : 900);
const TAP = 44;

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

/* ------------------------------------------------------------------ */
/* POISON — every measured assertion must be observed FAILING on a      */
/* synthetic violation, and the untouched tool must be observed         */
/* PASSING. Bought here: the first version of this gate hoisted its     */
/* reference node and reported 198 confident failures against a         */
/* perfectly contained tool. A gate nobody has watched fail is          */
/* indistinguishable from one that CANNOT fail — and a gate nobody has  */
/* watched pass is indistinguishable from one that condemns everything. */
/* ------------------------------------------------------------------ */
async function poison(browser) {
  let ok = true;
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 740 });
  await page.goto(`http://127.0.0.1:${PORT}/the-queue.html?lang=de&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.que-wrap', { timeout: 9000 });
  await new Promise((r) => setTimeout(r, 320));

  const probe = (mutate) => page.evaluate((src) => {
    const r = (e) => e.getBoundingClientRect();
    window.TheQueue.st = { members: [2, 0, 3, 1], end: 'a', k: 2 };
    window.TheQueue.render();
    /* eslint-disable no-eval */
    if (src) eval(src);
    const wrap = document.querySelector('.que-wrap');
    const wb = r(wrap);
    let over = -Infinity, tap = 999;
    for (const b of document.querySelectorAll('.que-btn')) {
      const bx = r(b);
      over = Math.max(over, Math.round(Math.max(wb.left - bx.left, bx.right - wb.right)));
      tap = Math.min(tap, Math.round(bx.height));
    }
    const doc = document.documentElement;
    return { over, tap, overflow: doc.scrollWidth > doc.clientWidth, wrapW: Math.round(wb.width) };
  }, mutate || '');

  const control = await probe(null);
  if (control.over <= 0 && control.tap >= TAP && !control.overflow && control.wrapW >= 100) {
    console.log(`  CONTROL  untouched de@360 passes — margin ${-control.over}px, tap ${control.tap}px, card ${control.wrapW}px`);
  } else { ok = false; console.log('  !! CONTROL FAILED on the shipped tool: ' + JSON.stringify(control)); }

  /* 1. containment — a label wide enough to escape the card */
  const p1 = await probe("document.querySelector('.que-b-step .que-label').textContent='X'.repeat(120);"
    + "document.querySelector('.que-b-step').style.flex='0 0 auto';"
    + "document.querySelector('.que-b-step').style.whiteSpace='nowrap';");
  if (p1.over > 0 || p1.overflow) console.log(`  FIRED    containment/overflow — a 120-char label escapes by ${p1.over}px`);
  else { ok = false; console.log('  !! containment DID NOT FIRE on a 120-char nowrap label'); }

  /* 2. tap floor — squash a control under 44px */
  const p2 = await probe("var b=document.querySelector('.que-b-step');b.style.minHeight='20px';b.style.height='20px';b.style.padding='0';");
  if (p2.tap < TAP) console.log(`  FIRED    tap floor — a control at ${p2.tap}px < ${TAP}px`);
  else { ok = false; console.log('  !! tap floor DID NOT FIRE on a 20px control'); }

  /* 3. the degenerate reference box — the defect this gate itself shipped */
  const p3 = await page.evaluate(() => {
    const w = document.querySelector('.que-wrap');
    w.style.width = '0px'; w.style.padding = '0'; w.style.maxWidth = '0px';
    return Math.round(w.getBoundingClientRect().width);
  });
  if (p3 < 100) console.log(`  FIRED    degenerate reference box — card measured ${p3}px, below the 100px floor`);
  else { ok = false; console.log('  !! the degenerate-card guard DID NOT FIRE at width 0'); }

  await page.close();
  console.log(ok ? '\nPOISON: OK\n' : '\nPOISON: BROKEN\n');
  return ok;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  if (process.argv.indexOf('--poison') !== -1) {
    const ok = await poison(browser);
    await browser.close(); srv.close();
    process.exit(ok ? 0 : 1);
  }

  for (const loc of LOCALES) {
    for (const W of WIDTHS) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e)));
      await page.setViewport({ width: W, height: heightFor(W) });
      await page.goto(`http://127.0.0.1:${PORT}/the-queue.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.que-wrap', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 320));

      const m = await page.evaluate(() => {
        const inst = window.TheQueue;
        const doc = document.documentElement;
        const r = (e) => e.getBoundingClientRect();
        /* ⚠⚠ `.que-wrap` IS RE-QUERIED INSIDE THE STATE LOOP, NEVER HOISTED.
           `render()` calls `_build()`, which does `host.innerHTML = ''` and
           creates a FRESH wrap — so a handle taken before the loop is a
           DETACHED NODE from the second state onward, and a detached node's
           getBoundingClientRect() is all zeros. The first version of this
           gate hoisted it and reported controls "escaping the card by
           958px" on a tool that is perfectly contained: every button was
           being compared against a rectangle at the origin with no size.
           It is the recorded cache-key-outliving-its-node defect, and it
           produced a confident, precise, entirely fictional measurement.
           The tell was the informational line contradicting the failure —
           the same run reported a 978px MARGIN and a 958px ESCAPE. */
        const out = {
          overflow: false, btnOver: -Infinity, worstBtn: '', shortTap: 999, worstTapBtn: '',
          lowest: 0, vh: window.innerHeight, sayOver: 0, gateOver: 0, states: 0, btnSeen: 0
        };

        /* ⭐ BOTH SETTINGS, and within each the three states the row can be
           in: nothing chosen, an end chosen, and a landing. A sweep that
           only saw the opening frame would never see `is-on` (which swaps
           background AND colour) or a disabled `board`. */
        const states = [
          { size: 'four', st: { members: [2, 0, 3, 1], end: null, k: 0 } },
          { size: 'four', st: { members: [2, 0, 3, 1], end: 'a', k: 2 } },
          { size: 'four', st: { members: [0, 1, 2, 3], end: 'b', k: 4 } },
          { size: 'three', st: { members: [2, 0, 3], end: null, k: 0 } },
          { size: 'three', st: { members: [2, 0, 3], end: 'b', k: 2 } }
        ];

        for (const s of states) {
          inst.api.settings.size = s.size;
          inst.st = s.st;
          inst.render();
          out.states++;
          const wrap = document.querySelector('.que-wrap');   /* fresh, every state */
          if (!wrap) { out.noWrap = true; continue; }
          const wrapBox = r(wrap);
          /* non-vacuity on the reference box itself: a zero-size card makes
             every containment comparison below meaningless-but-passing */
          if (wrapBox.width < 100) { out.badWrap = Math.round(wrapBox.width); continue; }
          if (doc.scrollWidth > doc.clientWidth) out.overflow = true;

          for (const b of document.querySelectorAll('.que-btn')) {
            const bx = r(b);
            if (getComputedStyle(b).display === 'none') continue;
            out.btnSeen++;
            /* ⚠ measured against THE CARD. `.que-row` is flex-wrap, so a
               button that does not fit WRAPS and the row reports nothing. */
            const over = Math.round(Math.max(wrapBox.left - bx.left, bx.right - wrapBox.right));
            if (over > out.btnOver) { out.btnOver = over; out.worstBtn = b.textContent.trim(); }
            if (bx.height < out.shortTap) { out.shortTap = Math.round(bx.height); out.worstTapBtn = b.textContent.trim(); }
            out.lowest = Math.max(out.lowest, Math.round(bx.bottom));
          }

          const say = document.querySelector('.que-say');
          if (say) out.sayOver = Math.max(out.sayOver, Math.round(r(say).right - wrapBox.right));
          const gate = document.querySelector('.que-gate.is-on');
          if (gate) {
            const gb = r(gate);
            out.gateOver = Math.max(out.gateOver, Math.round(gb.right - wrapBox.right));
            out.lowest = Math.max(out.lowest, Math.round(gb.bottom));
          }
        }
        return out;
      });

      const tag = `${loc}@${W}px`;
      /* ⚠ NON-VACUITY FIRST — every assertion below compares against a
         collection, and a selector that matched nothing would let all of
         them pass over an empty set (#40's two empty NodeLists). */
      is(m.states === 5, `${tag}: drove ${m.states} states, expected 5`);
      is(!m.noWrap, `${tag}: .que-wrap was absent after a render — the gate cannot measure`);
      is(!m.badWrap, `${tag}: .que-wrap measured ${m.badWrap}px wide — a degenerate reference box`);
      is(m.btnSeen >= 25, `${tag}: only ${m.btnSeen} button measurements across 5 states — the selector is broken, not the tool`);
      is(!m.overflow, `${tag}: horizontal overflow in some state`);
      is(m.btnOver <= 0, `${tag}: a control escapes THE CARD by ${m.btnOver}px — "${m.worstBtn}"`);
      is(m.sayOver <= 0, `${tag}: the spoken line escapes the card by ${m.sayOver}px`);
      is(m.gateOver <= 0, `${tag}: the paid panel escapes the card by ${m.gateOver}px`);
      is(m.shortTap >= TAP, `${tag}: control ${m.shortTap}px < ${TAP}px — "${m.worstTapBtn}"`);
      is(errs.length === 0, `${tag}: page error — ${errs[0] || ''}`);
      if (m.btnOver > -8) worst.push(`${tag} margin ${-m.btnOver}px ("${m.worstBtn}")`);

      if (SHOT && (W === 360 || W === 768)) {
        await page.screenshot({ path: path.join(OUT, `${loc}-${W}.png`), fullPage: true });
      }
      await page.close();
    }
    process.stdout.write(`  ${loc}`);
  }

  await browser.close();
  srv.close();
  console.log('');
  if (worst.length) {
    console.log('\n  tightest control margins (informational, not a failure):');
    for (const w of worst.slice(0, 10)) console.log('    ' + w);
  }
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks across ${LOCALES.length} locales × ${WIDTHS.length} viewports × 5 states`);
})();
