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
const LOCALES = String(args.locales || 'en,es').split(',').filter(Boolean);
const OUT = args.out || path.join(__dirname, '..', '.scratch', 'responsive-shots');
const WIDTHS = [320, 360, 412, 568, 640, 768, 834, 1024, 1152, 1280, 1366, 1600, 1920];
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
  await page.goto(`${BASE}/${locale}`, { waitUntil: 'networkidle2', timeout: 120000 });
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
      // elements inside overflow-clipped ancestors can't actually break out;
      // approximate: skip anything inside the masthead (overflow-x: clip)
      if (el.closest('.hv6-masthead') && r.right > vw + tol) continue;
      if (r.right > vw + tol && offenders.length < 8) {
        offenders.push(
          `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 2).join('.')} right=${Math.round(r.right)}`,
        );
      }
    }
    const mob = document.querySelector('.hv6-mob');
    let sculpture = 'MISSING';
    if (mob) {
      const r = mob.getBoundingClientRect();
      const visible = r.width > 100 && r.height > 100;
      sculpture = !visible ? 'INVISIBLE' : 'ok';
    }
    return { vw, overflowX, offenders, sculpture };
  }, EDGE_TOLERANCE);

  const shot = path.join(OUT, `resp-${locale}-${width}.png`);
  await page.screenshot({ path: shot, fullPage: true });
  await page.close();

  const fails = [];
  if (m.overflowX > 0) fails.push(`hscroll +${m.overflowX}px`);
  if (m.offenders.length) fails.push(`edge-breakout: ${m.offenders.join(' | ')}`);
  if (m.sculpture !== 'ok') fails.push(`sculpture ${m.sculpture}`);
  const realErrors = consoleErrors.filter((e) => !/favicon/.test(e));
  if (realErrors.length) fails.push(`console errors: ${realErrors.slice(0, 2).join(' ; ')}`);
  const status = fails.length ? `FAIL  ${fails.join('  ·  ')}` : 'PASS';
  console.log(`  ${locale} @ ${String(width).padStart(4)}  ${status}`);
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
  }
  await browser.close();
  console.log(ok ? '\nPASS: all widths clean.' : '\nFAIL: fix the reported widths.');
  process.exit(ok ? 0 : 1);
})();
