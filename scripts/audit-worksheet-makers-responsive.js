#!/usr/bin/env node
/**
 * audit-worksheet-makers-responsive.js — MEASURED responsive + motion gate
 * for the Press Hall (/[locale]/worksheet-makers), forked from
 * audit-homepage-responsive.js (whose hero checks are homepage-specific).
 *
 * At every width in the sweep, per locale:
 *   (a) zero horizontal overflow (document.scrollWidth <= viewport);
 *   (b) no visible element's box crosses the right edge by >2px
 *       ([data-bleed] subtrees + sr-only + horizontal scrollers exempt);
 *   (c) the Master Machine stage (.wmk-stage) exists and is substantial;
 *   (d) exactly 33 machine-card anchors, each with an id;
 *   (e) zero MISSING_MESSAGE leaks (next-intl missing-key marker);
 *   (f) animation census ≤ 220 (the v10 budget — this page runs ~15);
 *   (g) no console errors / 4xx-5xx (favicon exempt: dev-only artifact).
 * Then a reduced-motion pass: zero running CSS animations AND the composed
 * pose present (the finished sheet resting on the delivery tray — visible
 * picture cells — never a blank machine).
 *
 * Usage:
 *   node scripts/audit-worksheet-makers-responsive.js --base=http://localhost:3000 \
 *     [--path=/{locale}/worksheet-makers] [--locales=en,de,fi] [--out=dir]
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
const PATH_TEMPLATE = args.path || '/{locale}/worksheet-makers';
const LOCALES = String(args.locales || 'en,de,fi').split(',').filter(Boolean);
const urlFor = (locale) =>
  BASE + (PATH_TEMPLATE.includes('{locale}')
    ? PATH_TEMPLATE.replace(/\{locale\}/g, locale)
    : PATH_TEMPLATE);
const OUT = args.out || path.join(__dirname, '..', '.scratch', 'wmk-responsive-shots');
const WIDTHS = [320, 360, 412, 568, 640, 768, 834, 1024, 1152, 1280, 1366, 1600, 1920, 2560];
const EDGE_TOLERANCE = 2;
const EXPECTED_CARDS = 33;

async function auditOne(browser, locale, width) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const u = (m.location() && m.location().url) || '';
    if (/favicon/.test(u)) return;
    consoleErrors.push(`${m.text()}${u ? ` @ ${u}` : ''}`);
  });
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) consoleErrors.push(`${r.status()} ${r.url()}`); });
  await page.setViewport({ width, height: 950 });
  await page.goto(urlFor(locale), { waitUntil: 'networkidle2', timeout: 120000 });
  // scroll through for lazy specimens, back to top
  // Viewport-step sweep with real dwell: a 700px/90ms sweep outruns
  // Chromium's lazy-load trigger entirely (measured: 51 images never even
  // START loading after a fast sweep; 0 after a dwelled one). Real users
  // scroll at dwell speed — the harness must too, or it certifies blanks.
  await page.evaluate(async () => {
    const h = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += h) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 600));
    }
    window.scrollTo(0, 0);
  });
  // Wait for EVERY image (incl. remote specimens) to settle: the first sweep
  // certified blank sheets because lazy images the scroll had only just
  // triggered were still in flight when the screenshot fired.
  await page.evaluate(() => Promise.race([
    Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
    new Promise((r) => setTimeout(r, 25000)),
  ]));
  await new Promise((r) => setTimeout(r, 800));

  const m = await page.evaluate((tol) => {
    const vw = document.documentElement.clientWidth;
    const overflowX = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (el.closest('[data-bleed]')) continue;
      if (el.closest('.sr-only, [aria-hidden="true"]')) continue;
      // descendants of a horizontally scrollable box are reachable content,
      // not breakouts (auto|scroll ONLY — clip must never exempt, see the
      // homepage gate's note).
      let scroller = null;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (ox === 'auto' || ox === 'scroll') { scroller = p; break; }
      }
      if (scroller && scroller.getBoundingClientRect().right <= vw + tol) continue;
      if (r.right > vw + tol && offenders.length < 8) {
        offenders.push(
          `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 2).join('.')} right=${Math.round(r.right)}`,
        );
      }
    }
    // (c) the Master Machine stage: present + substantial at every width
    const stage = document.querySelector('.wmk-stage');
    let hero = 'MISSING';
    if (stage) {
      const r = stage.getBoundingClientRect();
      hero = r.width > 100 && r.height > 60 ? 'ok' : 'TINY';
    }
    // (d) 33 machine cards, each with an id
    const cards = [...document.querySelectorAll('.wmk-card-link')];
    const cardCount = cards.length;
    const cardsWithoutId = cards.filter((c) => !c.id).length;
    // (e) missing-message leak
    const missing = (document.body.innerText.match(/MISSING_MESSAGE|worksheetMakersPage\./g) || []).length;
    // (f) census
    const census = document.getAnimations ? document.getAnimations().length : -1;
    // (h) after the explicit image wait, nothing may still be unloaded —
    // an incomplete image means the capture (and any human read of it)
    // is not evidence.
    const imgsIncomplete = [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length;
    return { vw, overflowX, offenders, hero, cardCount, cardsWithoutId, missing, census, imgsIncomplete };
  }, EDGE_TOLERANCE);

  const shot = path.join(OUT, `wmk-${locale}-${width}.png`);
  await page.screenshot({ path: shot, fullPage: true });
  await page.close();

  const fails = [];
  if (m.overflowX > 0) fails.push(`hscroll +${m.overflowX}px`);
  if (m.offenders.length) fails.push(`edge-breakout: ${m.offenders.join(' | ')}`);
  if (m.hero !== 'ok') fails.push(`machine stage ${m.hero}`);
  if (m.cardCount !== EXPECTED_CARDS) fails.push(`cards ${m.cardCount} != ${EXPECTED_CARDS}`);
  if (m.cardsWithoutId > 0) fails.push(`${m.cardsWithoutId} cards missing id`);
  if (m.missing > 0) fails.push(`${m.missing} missing-message leaks`);
  if (m.census > 220) fails.push(`animation census ${m.census} > 220`);
  if (m.imgsIncomplete > 0) fails.push(`${m.imgsIncomplete} images never loaded`);
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
    // composed pose: the sheet rests DELIVERED (translated to the tray) with
    // its picture cells visible — never a blank machine.
    const sheet = document.querySelector('.wmk-m-sheet');
    let pose = 'MISSING';
    if (sheet) {
      const cs = getComputedStyle(sheet);
      const translated = cs.transform && cs.transform !== 'none';
      const visible = Number(cs.opacity) > 0.9;
      const cells = [...document.querySelectorAll('.wmk-m-cell')];
      const cellsVisible = cells.length >= 4 && cells.every((c) => Number(getComputedStyle(c).opacity) > 0.9);
      pose = translated && visible && cellsVisible ? 'ok' : `BROKEN (t=${translated} v=${visible} cells=${cellsVisible})`;
    }
    return { running, pose };
  });
  await page.close();
  const fails = [];
  if (m.running > 0) fails.push(`reduced-motion: ${m.running} CSS animations still running`);
  if (m.pose !== 'ok') fails.push(`reduced-motion pose ${m.pose}`);
  console.log(`  ${locale} @ reduced-motion  ${fails.length ? `FAIL  ${fails.join('  ·  ')}` : 'PASS'}`);
  return fails.length === 0;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`Worksheet-makers responsive audit — ${BASE}, widths ${WIDTHS.join('/')}`);
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
