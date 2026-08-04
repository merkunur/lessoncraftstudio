#!/usr/bin/env node
/* =====================================================================
   audit-fraction-kitchen-locale-layout.js — 11 locales × 6 viewports
   ---------------------------------------------------------------------
   English fitting proves nothing about German compounds or Finnish
   agglutination, and this tool just grew two new text surfaces that are
   made of exactly those: the word ribbon (which now carries all thirteen
   utterance channels) and the partition chips (which now carry the
   locale fraction word beside the glyph). Both were English-only when
   they were designed.

   ⚠ CLONING A GATE COPIES ITS SELECTORS *AND* ITS GLOBALS. Two of #43's
   locale gates silently drove the PREVIOUS tool's global and certified
   eleven locales off one untouched opening frame. So this asserts
   window.FractionKitchen exists as a FATAL before measuring anything.

   ⚠ Containment is measured against the CARD, not the wrap: .lcs-app is
   overflow:hidden and clips silently.

   Usage: node scripts/audit-fraction-kitchen-locale-layout.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT = process.argv.includes('--shot');
const SHOTDIR = path.join(REPO, '.scratch', 'frk', 'locales');
if (SHOT) fs.mkdirSync(SHOTDIR, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
/* the longest chrome depends on mode × food × n, so one opening frame
   per locale would measure almost nothing */
const STATES = [
  { name: 'cut-pizza-2', run: 'T.food="pizza";T.n=2;T._resetCut(true);' },
  { name: 'cut-cake-8', run: 'T.premium=true;T.food="cake";T.n=8;T._resetCut(true);' },
  { name: 'share-6', run: 'T.premium=true;T.food="pizza";T.n=6;T.committed=[0,1,2];T.sliced=true;T.mode="share";T.friends=6;T.placed=[];T.render();' },
  { name: 'equiv-cake', run: 'T.premium=true;T.mode="equiv";T.equivTask=T.EQUIV[4];T.equivFilled=0;T.render();' },
  { name: 'said-long', run: 'T.premium=true;T.food="pizza";T.n=6;T._resetCut(true);T._speak(T.api.t("wobbleLine"));' }
];

let pass = 0, fail = 0;
const bad = [];
const ok = (name, cond, extra) => {
  if (cond) pass++;
  else { fail++; bad.push(name); console.log('  ✗ ' + name + (extra ? ' — ' + extra : '')); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const f = path.join(MINI, p.startsWith('/mini-tools/') ? p.slice('/mini-tools/'.length) : p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  console.log(`audit-fraction-kitchen-locale-layout — ${LOCALES.length} locales × ${WIDTHS.length} widths × ${STATES.length} states\n`);

  let labelTexts = new Set();

  for (const loc of LOCALES) {
    let locFail = 0;
    for (const w of WIDTHS) {
      for (const st of STATES) {
        const page = await browser.newPage();
        await page.setViewport({ width: w, height: w < 500 ? 740 : 900 });
        const errs = [];
        page.on('pageerror', (e) => { if (!/404|net::ERR/.test(e.message)) errs.push(e.message); });
        await page.goto(`http://127.0.0.1:${PORT}/mini-tools/fraction-kitchen.html?lang=${loc}&embed=1`);
        await page.waitForSelector('.frk-wrap', { timeout: 8000 });

        /* ⚠ FATAL, not a soft check: a cloned gate that drives the wrong
           global measures the previous tool's opening frame and passes. */
        const mine = await page.evaluate(() => !!(window.FractionKitchen && window.FractionKitchen.id === 'fraction-kitchen'));
        if (!mine) {
          console.error('FATAL: window.FractionKitchen is not this tool — the gate is measuring something else.');
          process.exit(1);
        }
        try { await page.evaluate('(function(){var T=window.FractionKitchen;' + st.run + '})()'); }
        catch (e) { ok(`${loc} ${w} ${st.name} state applies`, false, e.message); await page.close(); continue; }
        await sleep(260);

        const m = await page.evaluate(() => {
          const card = document.querySelector('.lcs-app') || document.body;
          const cb = card.getBoundingClientRect();
          const over = [];
          let lowest = 0, minText = 1e9, chips = 0;
          const texts = [];
          document.querySelectorAll('.frk-wrap *').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) return;
            const cs = getComputedStyle(el);
            if (cs.visibility === 'hidden' || cs.display === 'none') return;
            /* ⚠ measure LAYOUT BOXES only. SVG descendants are not laid out
               by CSS and .frk-food is overflow:visible by design, so their
               bounding boxes legitimately extend past their container —
               reporting those as overflow condemns correct art. The root
               <svg> is a replaced element and does count. */
            const inSvg = el.ownerSVGElement || (el.parentElement && el.parentElement.closest('svg'));
            if (!inSvg && (r.right > cb.right + 0.5 || r.left < cb.left - 0.5)) {
              const nm = (typeof el.className === 'string' && el.className) || el.tagName.toLowerCase();
              over.push(nm + ' ' + Math.round(Math.max(r.right - cb.right, cb.left - r.left)) + 'px');
            }
            lowest = Math.max(lowest, r.bottom);
            const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
            if (own) {
              texts.push(el.textContent.trim());
              minText = Math.min(minText, parseFloat(cs.fontSize));
            }
            if (el.classList && el.classList.contains('frk-chip')) chips++;
          });
          const lbl = document.querySelector('.frk-nowlbl');
          const lblR = lbl && lbl.getBoundingClientRect();
          const ribbon = document.querySelector('.frk-ribbon');
          const ribR = ribbon && ribbon.getBoundingClientRect();
          return {
            over: over.slice(0, 3), lowest, minText: minText === 1e9 ? 99 : minText, chips,
            cardBottom: cb.bottom, innerH: window.innerHeight,
            lblOut: !!(lbl && ribR && (lblR.right > ribR.right + 0.5 || lblR.left < ribR.left - 0.5)),
            lblText: lbl ? lbl.textContent.trim() : '',
            texts
          };
        });

        const tag = `${loc} ${w} ${st.name}`;
        ok(`${tag} no element escapes the CARD`, m.over.length === 0, m.over.join(' | '));
        ok(`${tag} non-vacuity: chips rendered`, m.chips >= 4, `chips=${m.chips}`);
        ok(`${tag} every text node ≥14px`, m.minText >= 14, `${m.minText}px`);
        ok(`${tag} the partition label stays inside the ribbon`, !m.lblOut, m.lblText);
        if (w >= 768) ok(`${tag} content FITS the viewport`, m.lowest <= m.innerH + 1, `${Math.round(m.lowest)} > ${m.innerH}`);
        ok(`${tag} no js errors`, errs.length === 0, errs[0]);
        if (m.lblText) labelTexts.add(loc + ':' + m.lblText);
        if (m.over.length || errs.length) locFail++;

        if (SHOT && w === 360 && st.name === 'said-long') {
          await page.screenshot({ path: path.join(SHOTDIR, `${loc}-${w}-${st.name}.png`) });
        }
        await page.close();
      }
    }
    console.log(`  ${loc}: ${locFail ? locFail + ' problem cell(s)' : 'clean'}`);
  }

  /* NON-VACUITY, derived: every locale must have produced a partition
     label, and they must not all be the same string (which would mean the
     locale switch never took and eleven runs measured English). */
  const perLocale = new Set([...labelTexts].map((s) => s.split(':')[0]));
  ok('non-vacuity: every locale produced a partition label', perLocale.size === LOCALES.length, `${perLocale.size}/${LOCALES.length}`);
  const distinct = new Set([...labelTexts].map((s) => s.split(':').slice(1).join(':')));
  ok('non-vacuity: the labels are NOT all the same string', distinct.size >= 6, `${distinct.size} distinct`);

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + [...new Set(bad)].slice(0, 12).join(' · ')); process.exit(1); }
  console.log('audit-fraction-kitchen-locale-layout: ALL GREEN');
})();
