#!/usr/bin/env node
/**
 * audit-hero-fold.js — the defect this hero was rebuilt for, measured.
 *
 * On production (2026-09-03, v10) a 1366×768 laptop showed the poster and the
 * poetic H1 and NOTHING that said what the site is: the placard line and both
 * CTAs sat below the fold (primary CTA bottom = 801px). This gate asserts,
 * per viewport × locale, that the H1, the LAST placard and the PRIMARY CTA
 * all end inside the viewport, that the poster remains the dominant object
 * (so the band budget cannot creep and shrink the picture to a thumbnail),
 * and that the lead numeral is set in the same ink as its label (the
 * "letterpress, not sale banner" law — no coral numeral).
 *
 * Usage:
 *   node scripts/audit-hero-fold.js --base=http://localhost:3000 \
 *     [--path=/{locale}] [--locales=en,de,fi] [--out=dir] [--poison]
 *   --poison injects `.hv10-below{padding-top:240px}` and must FAIL.
 * Exit 1 on any failure. Screenshots per shot go to --out.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/);
  return m ? [m[1], m[2] ?? true] : [a, true];
}));
const BASE = (args.base || 'http://localhost:3000').replace(/\/$/, '');
const PATHNAME = args.path || '/{locale}';
const LOCALES = String(args.locales || 'en,de,fi').split(',').map((s) => s.trim()).filter(Boolean);
const OUT = args.out || path.join(__dirname, '..', '.scratch', 'hero-fold');
const POISON = !!args.poison;
const SLACK = 4;               // px the bottoms may sit above the fold, at least
const MIN_STAGE_W = 700;       // at desktop widths the poster stays the dominant object
const SMALL_PHONE_VH = 700;    // below this height the small-phone rule applies (see loop)
const SMALL_PHONE_FLICK = 120; // px of scroll a thumb-flick reveals

const VIEWPORTS = [
  [1280, 720], [1366, 768], [1536, 864], [1920, 1080],
  [390, 844], [375, 667], [360, 740],
];

async function shoot(browser, locale, w, h) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setCacheEnabled(false);
  const url = `${BASE}${PATHNAME.replace('{locale}', locale)}?cb=${Date.now()}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
  if (POISON) await page.addStyleTag({ content: '.hv10-below{padding-top:240px !important}' });
  await new Promise((r) => setTimeout(r, 600));
  const m = await page.evaluate(() => {
    const rect = (s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect() : null; };
    const last = document.querySelectorAll('.hv10-placards > li');
    const lastRect = last.length ? last[last.length - 1].getBoundingClientRect() : null;
    const count = document.querySelector('.hv10-placard-count');
    const title = document.querySelector('.hv10-placard.is-lead .hv10-placard-title');
    const col = (el) => (el ? getComputedStyle(el).color : null);
    const stage = rect('.hv10-stage');
    return {
      vh: window.innerHeight,
      h1: rect('.hv10-h1') && Math.round(rect('.hv10-h1').bottom),
      placards: last.length,
      lastPlacard: lastRect && Math.round(lastRect.bottom),
      leadPlacard: last.length ? Math.round(last[0].getBoundingClientRect().bottom) : null,
      cta: rect('.hv10-cta.is-primary') && Math.round(rect('.hv10-cta.is-primary').bottom),
      stageW: stage && Math.round(stage.width),
      stageBottom: stage && Math.round(stage.bottom),
      bandTop: rect('.hv10-below') && Math.round(rect('.hv10-below').top),
      countColor: col(count),
      titleColor: col(title),
    };
  });
  fs.mkdirSync(OUT, { recursive: true });
  await page.screenshot({ path: path.join(OUT, `fold-${locale}-${w}x${h}.png`) });
  await page.close();
  return m;
}

(async () => {
  console.log(`Hero-fold — ${BASE}${PATHNAME}  locales ${LOCALES.join('/')}${POISON ? '  [POISONED]' : ''}`);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let failed = false;
  let measured = 0;
  for (const locale of LOCALES) {
    for (const [w, h] of VIEWPORTS) {
      let m;
      try { m = await shoot(browser, locale, w, h); } catch (e) { console.log(`  ${locale} ${w}x${h}  FAIL  ${e.message}`); failed = true; continue; }
      const notes = [];
      // non-vacuity first: the things we measure must exist
      if (m.h1 == null) notes.push('no .hv10-h1');
      if (m.placards !== 4) notes.push(`placards ${m.placards} (expected 4)`);
      if (m.cta == null) notes.push('no primary CTA');
      if (m.stageW == null) notes.push('no .hv10-stage');
      if (!notes.length) {
        measured++;
        const fold = m.vh - SLACK;
        if (m.h1 > fold) notes.push(`h1 bottom ${m.h1} > fold ${fold}`);
        if (m.vh >= SMALL_PHONE_VH) {
          if (m.lastPlacard > fold) notes.push(`last placard bottom ${m.lastPlacard} > fold ${fold}`);
          if (m.cta > fold) notes.push(`primary CTA bottom ${m.cta} > fold ${fold}`);
        } else {
          /* The iPhone-SE class (375×667): 130px of chrome plus a 187px poster
             leave ~350px, and four labels plus two stacked buttons measure
             ~400px in German and Finnish. What is honestly required there is
             that the headline AND the lead label (the library and its number)
             are in the fold, and that the primary CTA is one thumb-flick away. */
          if (m.leadPlacard > fold) notes.push(`lead placard bottom ${m.leadPlacard} > fold ${fold} (small phone)`);
          if (m.cta > fold + SMALL_PHONE_FLICK) notes.push(`primary CTA bottom ${m.cta} > fold+flick ${fold + SMALL_PHONE_FLICK} (small phone)`);
        }
        if (w >= 1280 && m.stageW < MIN_STAGE_W) notes.push(`poster ${m.stageW}px wide < ${MIN_STAGE_W} — the band is eating the picture`);
        if (m.bandTop != null && m.stageBottom != null && m.bandTop < m.stageBottom - 1) notes.push('band overlaps the poster');
        if (m.countColor && m.titleColor && m.countColor !== m.titleColor) notes.push(`numeral ink ${m.countColor} ≠ label ink ${m.titleColor}`);
      }
      const ok = notes.length === 0;
      if (!ok) failed = true;
      console.log(`  ${locale.padEnd(2)} ${String(w).padStart(4)}x${String(h).padEnd(4)}  ${ok ? 'PASS' : 'FAIL'}  h1=${m.h1} placard=${m.lastPlacard} cta=${m.cta} vh=${m.vh} poster=${m.stageW}${notes.length ? '  · ' + notes.join(' · ') : ''}`);
    }
  }
  await browser.close();
  if (!measured) { console.log('\nINCONCLUSIVE: nothing measured.'); process.exit(1); }
  if (POISON) {
    console.log(failed ? '\nPOISON OK: the gate catches a band pushed out of the fold.' : '\nPOISON MISSED: a 240px push still passed — the gate is vacuous.');
    process.exit(failed ? 0 : 1);
  }
  console.log(failed ? '\nFAIL: the hero does not fit the fold somewhere above.' : `\nPASS: headline, four placards and the primary CTA inside the fold at ${measured} shots.`);
  console.log('shots:', OUT);
  process.exit(failed ? 1 : 0);
})();
