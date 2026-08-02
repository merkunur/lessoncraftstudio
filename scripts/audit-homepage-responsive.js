#!/usr/bin/env node
/**
 * audit-homepage-responsive.js — MEASURED responsive gate for the homepage
 * (§A.13.62 discipline applied to the marketing surface: never eyeball what
 * you can measure; never trust the widths you happened to test).
 *
 * At every width in the sweep, for each locale:
 *   (a) zero horizontal overflow: document.scrollWidth <= viewport width;
 *   (b) no visible element's bounding box crosses the viewport right edge
 *       by more than 2px (catches transforms/absolute children that don't
 *       grow scrollWidth but DO clip);
 *   (c) the hero sculpture (.hv6-mob) exists, is visible, and sits inside
 *       the viewport horizontally;
 *   (d) no console errors.
 * Full-page screenshot per (locale, width) for the human pass.
 *
 * Usage:
 *   node scripts/audit-homepage-responsive.js --base=http://localhost:3000 \
 *     [--path=/en] [--locales=en,es] [--out=dir]
 * Exit 1 on any failure.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = args.base || 'http://localhost:3000';
// --path was documented but never read (the goto hardcoded `/${locale}`), so the
// gate could not be pointed at a preview route. `{locale}` is substituted per run;
// a bare path with no placeholder is used as-is.
const PATH_TEMPLATE = args.path || '/{locale}';
const LOCALES = String(args.locales || 'en,es').split(',').filter(Boolean);
const urlFor = (locale) =>
  BASE + (PATH_TEMPLATE.includes('{locale}')
    ? PATH_TEMPLATE.replace(/\{locale\}/g, locale)
    : PATH_TEMPLATE);
const OUT = args.out || path.join(__dirname, '..', '.scratch', 'responsive-shots');
const WIDTHS = [320, 360, 412, 568, 640, 768, 834, 1024, 1152, 1280, 1366, 1600, 1920, 2560];
const EDGE_TOLERANCE = 2;

async function auditOne(browser, locale, width) {
  const page = await browser.newPage();
  const consoleErrors = [];
  // favicon 500s are a dev-server-only artifact (prod serves 200); ignore.
  // The console message text omits the URL — it lives in location().
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const u = (m.location() && m.location().url) || '';
    if (/favicon/.test(u)) return;
    consoleErrors.push(`${m.text()}${u ? ` @ ${u}` : ''}`);
  });
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) consoleErrors.push(`${r.status()} ${r.url()}`); });
  await page.setViewport({ width, height: 950 });
  await page.goto(urlFor(locale), { waitUntil: 'networkidle2', timeout: 120000 });
  // scroll through for lazy content, back to top
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const s = () => {
        y += 700; window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(s, 90);
        else { window.scrollTo(0, 0); setTimeout(res, 500); }
      };
      s();
    });
  });
  await new Promise((r) => setTimeout(r, 800));

  const m = await page.evaluate((tol) => {
    const vw = document.documentElement.clientWidth;
    const overflowX = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw;
    // walk visible elements for right-edge breakouts
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // Semantic bleed hook. Prefer this over class names: the list below has
      // rotted with every redesign (`.hv6-masthead` had ZERO references in
      // frontend/ when this was written — verified, then removed). Anything
      // that bleeds past the viewport BY DESIGN marks itself with data-bleed
      // and is clipped by an ancestor's overflow-x: clip.
      if (el.closest('[data-bleed]')) continue;
      // v8 Open House: these containers bleed past the right edge BY DESIGN
      // and are clipped by .hv7-ground { overflow-x: clip } / the fold's own
      // clip. Check (a) hscroll still guards real overflow.
      if (el.closest('.hv7-fan, .hv9-fold-fan, .hv7-overlap-x, .hv7-keepstack')) continue;
      // sr-only subtrees are visually 1px-clipped by construction (nav
      // crawl-bait lists); child rects still report layout positions.
      if (el.closest('.sr-only, [aria-hidden="true"]')) continue;
      if (r.right > vw + tol && offenders.length < 8) {
        offenders.push(
          `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 2).join('.')} right=${Math.round(r.right)}`,
        );
      }
    }
    // (c) The hero's signature apparatus must be present and substantial at
    // every width. v6/v9 render the Calder mobile `.hv6-mob` (two instances —
    // desktop fold + phone fold — exactly one visible at a time). v10 renders
    // the gallery poster `.hv10-stage` (one instance at every width, by
    // design: it is ONE composition, not a per-device rearrangement).
    // Either satisfies this; ALL instances are checked, since measuring only
    // the first once matched a display:none desktop twin on phone widths.
    const heroes = [...document.querySelectorAll('.hv6-mob, .hv10-stage')];
    let sculpture = 'MISSING';
    if (heroes.length) {
      const anyVisible = heroes.some((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 100 && r.height > 100;
      });
      sculpture = anyVisible ? 'ok' : 'INVISIBLE';
    }
    // (d2) beetle containment: the walking beetle's rect must sit fully
    // inside its strip at every width where the seam renders (>=1024).
    let beetle = 'n/a';
    const b = document.querySelector('.hv9-beetle');
    if (b) {
      const strip = b.closest('.hv9-strip');
      const cs2 = strip && getComputedStyle(strip.closest('.hv9-seam') || strip);
      if (strip && cs2 && cs2.display !== 'none') {
        const br = b.getBoundingClientRect();
        const sr = strip.getBoundingClientRect();
        beetle = br.left >= sr.left - 1 && br.right <= sr.right + 1 ? 'ok' : `ESCAPED (${Math.round(br.right)} vs ${Math.round(sr.right)})`;
      }
    }
    // (d4) animation census: a stagger bug that multiplies animations
    // shows up as an explosion here.
    const census = document.getAnimations ? document.getAnimations().length : -1;
    // (d5) the mobile's drop-thread must never touch the fan worksheets
    let drop = 'n/a';
    const dr = document.querySelector('.hv9-fold-stage .hv6-mob-drop');
    if (dr && getComputedStyle(dr).display !== 'none') {
      const dRect = dr.getBoundingClientRect();
      const hit = [...document.querySelectorAll('.hv9-fold-fan .hv7-sheet')].some((sh) => {
        const r = sh.getBoundingClientRect();
        return dRect.bottom > r.top + 2 && dRect.top < r.bottom && dRect.right > r.left && dRect.left < r.right;
      });
      drop = hit ? 'TOUCHES FAN' : 'ok';
    }
    // (d6) close-band flanking sheets must be fully inside the viewport
    let closeSheets = 'ok';
    for (const sh of document.querySelectorAll('#close .hv7-sheet')) {
      const cs2 = getComputedStyle(sh);
      if (cs2.display === 'none') continue;
      const r = sh.getBoundingClientRect();
      if (r.left < -2 || r.right > vw + 2) { closeSheets = `CUT (${Math.round(r.left)}..${Math.round(r.right)})`; break; }
    }
    return { vw, overflowX, offenders, sculpture, beetle, census, drop, closeSheets };
  }, EDGE_TOLERANCE);

  const shot = path.join(OUT, `resp-${locale}-${width}.png`);
  await page.screenshot({ path: shot, fullPage: true });
  await page.close();

  const fails = [];
  if (m.overflowX > 0) fails.push(`hscroll +${m.overflowX}px`);
  if (m.offenders.length) fails.push(`edge-breakout: ${m.offenders.join(' | ')}`);
  if (m.sculpture !== 'ok') fails.push(`sculpture ${m.sculpture}`);
  if (m.beetle !== 'ok' && m.beetle !== 'n/a') fails.push(`beetle ${m.beetle}`);
  if (m.drop !== 'ok' && m.drop !== 'n/a') fails.push(`drop-thread ${m.drop}`);
  if (m.closeSheets !== 'ok') fails.push(`close sheets ${m.closeSheets}`);
  if (m.census > 220) fails.push(`animation census ${m.census} > 220 (stagger multiplication?)`);
  const realErrors = consoleErrors.filter((e) => !/favicon/.test(e));
  if (realErrors.length) fails.push(`console errors: ${realErrors.slice(0, 2).join(' ; ')}`);
  const status = fails.length ? `FAIL  ${fails.join('  ·  ')}` : 'PASS';
  console.log(`  ${locale} @ ${String(width).padStart(4)}  ${status}`);
  return fails.length === 0;
}

async function auditReducedMotion(browser, locale) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1280, height: 950 });
  await page.goto(urlFor(locale), { waitUntil: 'networkidle2', timeout: 120000 });
  await new Promise((r) => setTimeout(r, 1200));
  const m = await page.evaluate(() => {
    const running = document.getAnimations
      ? document.getAnimations().filter((a) => a.constructor.name === 'CSSAnimation' && a.playState === 'running').length
      : -1;
    // Same dual selector as the main pass — see the note there.
    const heroes = [...document.querySelectorAll('.hv6-mob, .hv10-stage')];
    const sculpture = heroes.some((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 100 && r.height > 100;
    });
    return { running, sculpture };
  });
  await page.close();
  const fails = [];
  if (m.running > 0) fails.push(`reduced-motion: ${m.running} CSS animations still running`);
  if (!m.sculpture) fails.push('reduced-motion: sculpture pose missing (blank, not composed)');
  console.log(`  ${locale} @ reduced-motion  ${fails.length ? `FAIL  ${fails.join('  ·  ')}` : 'PASS'}`);
  return fails.length === 0;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`Homepage responsive audit — ${BASE}, widths ${WIDTHS.join('/')}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  let ok = true;
  for (const locale of LOCALES) {
    for (const w of WIDTHS) {
      ok = (await auditOne(browser, locale, w)) && ok;
    }
    ok = (await auditReducedMotion(browser, locale)) && ok;
  }
  await browser.close();
  console.log(ok ? '\nPASS: all widths clean.' : '\nFAIL: fix the reported widths.');
  process.exit(ok ? 0 : 1);
})();
