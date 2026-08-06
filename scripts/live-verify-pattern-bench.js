#!/usr/bin/env node
/* =====================================================================
   live-verify-pattern-bench.js — eleven landings on PRODUCTION, DRIVEN.

   200 is not "it works", and neither is "it mounts". The previous version
   of this file asserted that a 12-bead strip existed inside the iframe
   and stopped there — which would have passed happily while the tool was
   pinned at phone size on every desktop, while a costume change faded the
   whole apparatus to nothing, and while the paid sheet sat in a free
   visitor's DOM. So it drives:
     · ⭐ THE OPERATOR'S DIRECTIVE — a real click on a bead changes EXACTLY
       the beads in its family, measured on the rendered DOM
     · ⭐ THE SLIDE — a real click on a grip leaves the strip byte-identical
       while the unit visibly rotates
     · ⭐ THE COSTUME CHANGE — and asserts the beads are still VISIBLE
       afterwards (computed opacity), because attributes survive a blackout
     · ⭐ THE IFRAME BOX — the tool must not be pinned at phone size
     · the cloth arms, covers an interior bead, and auto-disarms
     · a free visitor has NO print sheet in the DOM
     · the chrome is in THAT locale, hreflang chain, zero console errors

   ⚠ A FRESH BROWSER PER LOCALE. Sharing gave a false negative on the
   eleventh page during the Sorting Hoops run, and localStorage leaked the
   previous locale's state between them.
   ⚠ Cache disabled — Cloudflare holds tool bytes for 5 minutes (§15.8).

   Usage: node scripts/live-verify-pattern-bench.js [--locales=en,de]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
/* read the slugs from what was actually REGISTERED, so this can never
   drift from the shipped content the way a second copy would */
const KEY = 'pattern-bench';
const MSG = path.join(__dirname, '..', 'frontend', 'messages', 'tool-content');
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SLUGS = {}, TITLES = {};
ALL.forEach((loc) => {
  const e = JSON.parse(fs.readFileSync(path.join(MSG, `${loc}.json`), 'utf8'))[KEY];
  if (!e) { console.error(`FATAL ${loc}.json has no "${KEY}" entry — registration did not run`); process.exit(1); }
  SLUGS[loc] = e.slug; TITLES[loc] = e.name;
});
const arg = process.argv.find((a) => a.indexOf('--locales=') === 0);
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.indexOf(l) > -1) : ALL;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}/tools/${SLUGS[loc]}`;
    console.log(`\n[${loc}] ${url}`);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setViewport({ width: 1440, height: 900 });
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/favicon|net::ERR_ABORT|404/.test(m.text())) errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(String(e)));

      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      is(res && res.status() === 200, `HTTP ${res ? res.status() : 'none'}`);
      if (!res || res.status() !== 200) { await browser.close(); continue; }

      const head = await page.evaluate(() => ({
        canonical: (document.querySelector('link[rel=canonical]') || {}).href || null,
        hreflang: document.querySelectorAll('link[rel=alternate][hreflang]').length,
        ld: document.querySelectorAll('script[type="application/ld+json"]').length
      }));
      is(head.canonical === url, `canonical self (${head.canonical})`);
      is(head.hreflang >= 12, `hreflang chain ${head.hreflang}`);
      is(head.ld >= 1, `JSON-LD present (${head.ld})`);

      /* the tool lives in a hydration-gated iframe */
      let frame = null, box = null;
      for (let i = 0; i < 30 && !frame; i++) {
        const el = await page.$('iframe');
        if (el) {
          const f = await el.contentFrame();
          if (f) {
            try { await f.waitForSelector('.ptn-wrap', { timeout: 1200 }); frame = f;
              box = await page.evaluate(() => {
                const r = document.querySelector('iframe').getBoundingClientRect();
                return { w: Math.round(r.width), h: Math.round(r.height) };
              });
            } catch (_) {}
          }
        }
        if (!frame) await wait(600);
      }
      if (!frame) { bad('the tool never mounted'); await browser.close(); continue; }
      await wait(1400);

      /* ⭐ D1 — the tool must not be pinned at phone size on a desktop */
      is(box.h > 520, `the iframe is ${box.w}x${box.h} — not pinned at ~422px`);

      const st0 = await frame.evaluate(() => ({
        cells: document.querySelectorAll('.ptn-cell').length,
        slots: document.querySelectorAll('.ptn-slot').length,
        grips: document.querySelectorAll('.ptn-grip').length,
        seq: Array.from(document.querySelectorAll('.ptn-cell')).map((c) => c.getAttribute('aria-label')).join(''),
        title: (document.querySelector('.lcs-title') || {}).textContent || ''
      }));
      is(st0.cells >= 7, `the strip mounted (${st0.cells} beads)`);
      is(st0.slots === 2 && st0.grips === 2, `the unit bay and both bracket grips render`);
      is((st0.title || '').trim() === TITLES[loc], `chrome is ${loc}: "${(st0.title || '').trim()}"`);

      /* ⭐ THE OPERATOR'S DIRECTIVE, ON PRODUCTION */
      const fam = await frame.evaluate(() => {
        const T = window.PatternBench;
        return T ? T.classOf(T.st, 2) : null;
      });
      is(fam && fam.length >= 2, `bead 2's family is ${fam ? fam.length : 0} beads (non-vacuity)`);
      await frame.evaluate(() => document.querySelectorAll('.ptn-cell')[2].click());
      await wait(500);
      const seq1 = await frame.evaluate(() =>
        Array.from(document.querySelectorAll('.ptn-cell')).map((c) => c.getAttribute('aria-label')).join(''));
      const diff = [];
      for (let i = 0; i < st0.seq.length; i++) if (st0.seq[i] !== seq1[i]) diff.push(i);
      is(diff.length > 0, 'a real tap changed the strip');
      is(diff.join(',') === (fam || []).join(','),
        `⭐ the tap changed EXACTLY the family [${diff}] — the operator's directive, live`);

      /* ⭐ THE SLIDE.
         ⚠ NON-VACUITY FIRST, and this fired on the very first live run:
         the tap above had cycled the unit to `bb`, and rotating a unit
         whose letters are identical is genuinely a no-op — so the
         assertion "the unit rotated" failed against a CORRECT tool. The
         rotation is only observable when the unit holds two distinct
         letters, so drive it there with a real click and say so. */
      let guard = 0;
      while (guard++ < 4) {
        const distinct = await frame.evaluate(() =>
          new Set(window.PatternBench.st.unit).size);
        if (distinct >= 2) break;
        await frame.evaluate(() => document.querySelectorAll('.ptn-cell')[3].click());
        await wait(400);
      }
      is(await frame.evaluate(() => new Set(window.PatternBench.st.unit).size) >= 2,
        'the unit holds two distinct letters, so a rotation is observable at all');
      const before = await frame.evaluate(() =>
        Array.from(document.querySelectorAll('.ptn-cell')).map((c) => c.getAttribute('aria-label')).join(''));
      const u0 = await frame.evaluate(() => window.PatternBench.st.unit.join(''));
      await frame.evaluate(() => document.querySelector('.ptn-grip-r').click());
      await wait(500);
      const after = await frame.evaluate(() =>
        Array.from(document.querySelectorAll('.ptn-cell')).map((c) => c.getAttribute('aria-label')).join(''));
      const u1 = await frame.evaluate(() => window.PatternBench.st.unit.join(''));
      is(after === before, `⭐ the slide left the strip byte-identical (${before})`);
      is(u1 !== u0, `while the unit rotated ${u0} -> ${u1}`);

      /* ⭐ THE COSTUME CHANGE — and the beads must still be VISIBLE.
         Attributes survive a blackout; opacity does not. */
      await frame.evaluate(() => document.querySelectorAll('.ptn-segbtn')[1].click());
      await wait(1600);
      const vis = await frame.evaluate(() => {
        const g = Array.from(document.querySelectorAll('.ptn-cell .ptn-glyph, .ptn-slot .ptn-glyph'));
        const o = g.map((n) => parseFloat(getComputedStyle(n).opacity));
        return { n: g.length, invisible: o.filter((x) => x < 0.05).length };
      });
      is(vis.n > 0 && vis.invisible === 0,
        `⭐ after the costume change all ${vis.n} beads are still VISIBLE (${vis.invisible} faded out)`);

      /* the cloth */
      await frame.evaluate(() => {
        const c = Array.from(document.querySelectorAll('.ptn-chip')).find((x) => x.getAttribute('data-fk') === 'cloth');
        if (c) c.click();
      });
      await wait(300);
      await frame.evaluate(() => document.querySelectorAll('.ptn-cell')[3].click());
      await wait(400);
      const cov = await frame.evaluate(() => ({
        covered: window.PatternBench.st.covered.length,
        armed: window.PatternBench.st.armed,
        glyphs: document.querySelectorAll('.ptn-cell[data-i="3"] .ptn-glyph').length
      }));
      is(cov.covered === 1 && cov.glyphs === 0, 'the cloth covers an interior bead and it leaves the DOM');
      is(cov.armed === false, 'and the cloth auto-disarms');

      /* a free visitor must have NO print sheet anywhere in the DOM */
      const sheet = await frame.evaluate(() => ({
        sheet: !!document.getElementById('ptn-printsheet'),
        paid: document.body.classList.contains('ptn-paid'),
        locked: document.querySelectorAll('.ptn-locked').length
      }));
      is(!sheet.sheet && !sheet.paid, '⭐ a free visitor has NO print sheet in the DOM — Ctrl+P cannot reach it');
      is(sheet.locked >= 2, `the paid surfaces are locked (${sheet.locked})`);

      is(errs.length === 0, `zero console errors ${errs[0] || ''}`);
    } catch (e) {
      bad(`${loc}: ${e.message}`);
    } finally {
      await browser.close();
    }
  }
  console.log('\n' + (FAIL ? `FAILED — ${FAIL} failed, ${PASS} passed`
    : `ALL GREEN — ${PASS} assertions DRIVEN on production across ${LOCALES.length} locales`));
  process.exit(FAIL ? 1 : 0);
})();
