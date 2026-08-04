#!/usr/bin/env node
/* =====================================================================
   live-verify-fraction-kitchen.js — 11 locales, on PRODUCTION
   ---------------------------------------------------------------------
   Never "it mounts". This drives the knife until the food is actually
   cut, in every locale, on the deployed bytes.

   ⚠ NON-VACUITY FIRST. Every assertion below runs only after the board,
   the guides and the chips are confirmed present — #40's gate compared
   two EMPTY NodeLists and reported green.
   ⚠ REACH CONTROLS BY INDEX, never by English text: the food chips read
   "Sjokolade" and "Kakku" live.
   ⚠ SCOPE THE BANS to the tool's own prose. Next serialises every
   sibling tool into the landing page's RSC payload, so a ban read off
   document.body.textContent condemns the neighbours' copy.
   ⚠ Return PLAIN NUMBERS from page.evaluate — a DOMRect serialises as {}.

   Usage: node scripts/live-verify-fraction-kitchen.js [--locales=en,de]
   ===================================================================== */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');

const ORIGIN = 'https://www.lessoncraftstudio.com';
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = (process.argv.find((a) => a.startsWith('--locales=')) || '').split('=')[1];
const LOCALES = arg ? arg.split(',').filter((l) => ALL.includes(l)) : ALL;

const content = (l) => require(path.join(__dirname, '..', 'frontend', 'messages', 'tool-content', l + '.json'))['fraction-kitchen'];

let pass = 0, fail = 0;
const bad = [];
const ok = (n, c, extra) => {
  if (c) { pass++; console.log('    ok   ' + n); }
  else { fail++; bad.push(n); console.log('    FAIL ' + n + (extra ? ' — ' + extra : '')); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Unicode-safe word boundary: \b is ASCII-only and cannot see the edge of
   "väärin" or "frações", so a ban written with \b is born dead in exactly
   the locales it is meant to police. */
const w = (s) => new RegExp('(?<!\\p{L})(' + s + ')(?!\\p{L})', 'iu');
const NOTATION = /[½⅓¼⅙⅛⅔¾]|\d\s*\/\s*\d/;

(async () => {
  console.log(`live-verify-fraction-kitchen — ${LOCALES.length} locale(s) on ${ORIGIN}\n`);
  for (const loc of LOCALES) {
    console.log('  ' + loc + '  /' + loc + '/tools/' + content(loc).slug);
    /* ⚠ a FRESH browser per locale: a shared one caches the module and
       every later locale passes on the first one's copy. */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 900 });
      const errs = [];
      page.on('pageerror', (e) => { if (!/404|net::ERR/.test(e.message)) errs.push(e.message); });

      const r = await page.goto(`${ORIGIN}/${loc}/tools/${content(loc).slug}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      ok('landing answers 200', r && r.status() === 200, r && String(r.status()));

      /* the tool itself lives in the iframe */
      await page.goto(`${ORIGIN}/mini-tools/fraction-kitchen.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForSelector('.frk-board', { timeout: 20000 });
      await sleep(600);

      const m = await page.evaluate(() => {
        const T = window.FractionKitchen;
        const chips = [...document.querySelectorAll('.frk-chip')];
        const guides = document.querySelectorAll('.frk-guide');
        const cut = [...document.querySelectorAll('.frk-cutbtn')];
        const knife = document.querySelector('button.frk-knife-btn');
        const kb = knife && knife.getBoundingClientRect();
        const cb = cut[0] && cut[0].getBoundingClientRect();
        const chipH = chips.length ? Math.min(...chips.map((c) => c.getBoundingClientRect().height)) : 0;
        return {
          isMine: !!(T && T.id === 'fraction-kitchen'),
          chips: chips.length, guides: guides.length, cutBtns: cut.length,
          knife: !!knife,
          knifeW: kb ? kb.width : 0, knifeH: kb ? kb.height : 0,
          cutMin: cb ? Math.min(cb.width, cb.height) : 0,
          chipMin: chipH,
          label: (document.querySelector('.frk-nowlbl') || {}).textContent || '',
          /* the refusals — this tool takes no answers and keeps no score */
          inputs: document.querySelectorAll('input, textarea, .lcs-activity-keypad').length,
          verdictish: document.querySelectorAll('.correct, .wrong, .score, .streak, .timer').length,
          /* the tool's OWN prose only, never document.body */
          prose: [...document.querySelectorAll('.frk-wrap')].map((e) => e.textContent).join(' ')
        };
      });

      ok('this is fraction-kitchen (not a sibling global)', m.isMine);
      ok('non-vacuity: chips, guides and cut targets are all present',
        m.chips >= 4 && m.guides >= 1 && m.cutBtns >= 1, `chips=${m.chips} guides=${m.guides} cut=${m.cutBtns}`);
      ok('the knife is a real button', m.knife);
      ok('CONTROL floor ≥44px (chips)', m.chipMin >= 44, `${m.chipMin.toFixed(1)}px`);
      ok('CONTROL floor ≥44px (knife)', Math.min(m.knifeW, m.knifeH) >= 44, `${m.knifeW.toFixed(0)}×${m.knifeH.toFixed(0)}`);
      ok('CANVAS floor ≥34px (cut target)', m.cutMin >= 34, `${m.cutMin.toFixed(1)}px`);
      ok('the partition label renders in this locale', !!m.label.trim(), JSON.stringify(m.label));
      ok('no input, keypad or answer surface', m.inputs === 0, String(m.inputs));
      ok('no verdict / score / streak / timer element', m.verdictish === 0, String(m.verdictish));
      ok('no fraction NOTATION on the apparatus', !NOTATION.test(m.prose),
        (m.prose.match(NOTATION) || [''])[0]);
      ok('no "Common Core" in the tool prose', !w('Common Core').test(m.prose));

      /* ⭐ DRIVE THE MAIN CONTROL. Press the knife, travel the guide, and
         require the food to actually come apart. */
      const pts = await page.evaluate(() => {
        const f = document.querySelector('.frk-food').getBoundingClientRect();
        const g = document.querySelector('.frk-guide[data-kind="c"][data-idx="0"]');
        const k = document.querySelector('.frk-knife').getBoundingClientRect();
        const to = (x, y) => ({ x: f.left + x / 100 * f.width, y: f.top + y / 100 * f.height });
        return {
          k: { x: k.left + k.width / 2, y: k.top + k.height / 2 },
          a: to(+g.getAttribute('x1'), +g.getAttribute('y1')),
          b: to(+g.getAttribute('x2'), +g.getAttribute('y2'))
        };
      });
      await page.mouse.move(pts.k.x, pts.k.y);
      await page.mouse.down();
      await page.mouse.move(pts.a.x, pts.a.y, { steps: 4 });
      for (let i = 1; i <= 12; i++) {
        await page.mouse.move(pts.a.x + (pts.b.x - pts.a.x) * i / 12, pts.a.y + (pts.b.y - pts.a.y) * i / 12);
      }
      await page.mouse.up();
      await sleep(700);
      const after = await page.evaluate(() => ({
        committed: window.FractionKitchen.committed.length,
        sliced: window.FractionKitchen.sliced,
        pieces: document.querySelectorAll('.frk-piece').length,
        said: (document.querySelector('.frk-said') || {}).textContent || ''
      }));
      ok('⭐ the knife CUTS on production', after.sliced && after.pieces >= 2,
        `committed=${after.committed} sliced=${after.sliced} pieces=${after.pieces}`);
      ok('⭐ the word ribbon shows the result (legible with the sound off)',
        !!after.said.trim(), JSON.stringify(after.said));
      ok('the ribbon text carries no notation', !NOTATION.test(after.said), after.said);
      ok('no js errors', errs.length === 0, errs[0]);
      await page.close();
    } catch (e) {
      ok(`${loc} ran without throwing`, false, e.message);
    }
    await browser.close();
  }
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + [...new Set(bad)].join(' · ')); process.exit(1); }
  console.log('live-verify-fraction-kitchen: ALL GREEN on production');
})();
