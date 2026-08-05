#!/usr/bin/env node
/**
 * audit-hang-rows.js — MEASURED gate for the Print Room's wall (homepage
 * Room II, ".hv10-hang").
 *
 * WHY THIS EXISTS. The wall shipped rendering 5 / 5 / 1 — two full rows and a
 * single lonely worksheet — and every existing homepage gate passed it:
 *   · audit-homepage-responsive.js asserts overflow, right-edge containment
 *     and console cleanliness. A ragged row overflows nothing.
 *   · audit-hero-identity.js measures `.hv10-stage` (the hero) only.
 *   · audit-homepage-link-count.js counts anchors in raw HTML.
 * A ragged last row was simply unmeasured, which is why it reached the
 * operator. This gate measures it.
 *
 * THE ASSERTION, per (locale, width):
 *   (a) every rendered row of the wall holds the SAME number of works —
 *       i.e. the wall is a rectangle, with no fragment under a full row;
 *   (b) at least MIN_TILES works are visible, so "one row of five" cannot
 *       satisfy (a) by rendering almost nothing;
 *   (c) at least two rows, so the wall still reads as a wall.
 *
 * ⚠ ROWS ARE GROUPED BY offsetTop, NOT getBoundingClientRect().top.
 * `.hv10-work` carries `rotate: var(--tilt)`, and a rotated box's bounding
 * rect grows by an amount that differs per tile, which scatters ONE visual
 * row across several distinct tops. An earlier hand-measurement of this same
 * wall grouped by bounding-rect x and reported "9 columns" on a grid that
 * plainly renders 5. offsetTop is the layout position and ignores the
 * transform.
 *
 * The sweep deliberately includes ±1px around every breakpoint: the layout it
 * replaced sat on two sub-3px knife-edges, and that class of bug hides
 * between round numbers.
 *
 * Usage:
 *   node scripts/audit-hang-rows.js --base=http://localhost:3000 [--locales=en,de]
 *   node scripts/audit-hang-rows.js --base=http://localhost:3000 --path=/{locale}/preview/homepage-v10
 *
 * Poison test (prove it can FAIL before trusting it green): point it at a
 * build that still has the ragged wall, e.g. production before this ships:
 *   node scripts/audit-hang-rows.js --base=https://www.lessoncraftstudio.com
 *
 * Exit 1 on any failure.
 */
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

const BASE = args.base || 'http://localhost:3000';
const PATH_TEMPLATE = args.path || '/{locale}';
const LOCALES = String(args.locales || 'en').split(',').filter(Boolean);
const MIN_TILES = Number(args['min-tiles'] || 12);

const urlFor = (locale) =>
  BASE + (PATH_TEMPLATE.includes('{locale}') ? PATH_TEMPLATE.replace(/\{locale\}/g, locale) : PATH_TEMPLATE);

// Round numbers PLUS ±1px around each declared breakpoint (480/640/880) and
// around the old emergent transitions (520/1200), which is where the
// replaced layout misbehaved.
const WIDTHS = [
  320, 360, 412, 479, 480, 481, 519, 520, 521, 639, 640, 641, 768, 834,
  879, 880, 881, 900, 1024, 1152, 1180, 1200, 1201, 1280, 1366, 1600, 1920, 2560,
];

async function measure(page) {
  return page.evaluate(() => {
    const hang = document.querySelector('.hv10-hang');
    if (!hang) return { missing: true };
    const items = [...hang.querySelectorAll(':scope > .hv10-work')].filter(
      (el) => getComputedStyle(el).display !== 'none',
    );
    // offsetTop, not getBoundingClientRect(): see the header note on `rotate`.
    const byRow = new Map();
    for (const el of items) byRow.set(el.offsetTop, (byRow.get(el.offsetTop) || 0) + 1);
    const rows = [...byRow.entries()].sort((a, b) => a[0] - b[0]).map(([, n]) => n);
    const w = items[0] ? Math.round(items[0].getBoundingClientRect().width) : 0;
    return { missing: false, total: items.length, rows, tileW: w };
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const failures = [];
  let checks = 0;

  console.log(`Print-room wall audit — ${BASE}${PATH_TEMPLATE}`);
  console.log(`widths ${WIDTHS.length}, locales ${LOCALES.join(',')}, min tiles ${MIN_TILES}\n`);

  for (const locale of LOCALES) {
    const page = await browser.newPage();
    await page.goto(urlFor(locale), { waitUntil: 'domcontentloaded', timeout: 90000 });

    for (const width of WIDTHS) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      // Let the media queries and the grid settle before reading layout.
      await new Promise((r) => setTimeout(r, 220));
      const m = await measure(page);
      checks++;

      const where = `${locale} @ ${width}px`;
      if (m.missing) {
        failures.push(`${where}: .hv10-hang not found`);
        console.log(`  FAIL  ${where.padEnd(16)} wall missing`);
        continue;
      }

      const uniform = m.rows.length > 0 && new Set(m.rows).size === 1;
      const enough = m.total >= MIN_TILES;
      const isWall = m.rows.length >= 2;
      const ok = uniform && enough && isWall;

      const detail = `${String(m.total).padStart(2)} works, rows [${m.rows.join(',')}], tile ${m.tileW}px`;
      if (ok) {
        console.log(`  ok    ${where.padEnd(16)} ${detail}`);
      } else {
        const why = [
          uniform ? null : `ragged last row (${m.rows.join(',')})`,
          enough ? null : `only ${m.total} works, need >= ${MIN_TILES}`,
          isWall ? null : `only ${m.rows.length} row`,
        ].filter(Boolean).join('; ');
        failures.push(`${where}: ${why}`);
        console.log(`  FAIL  ${where.padEnd(16)} ${detail}  <- ${why}`);
      }
    }
    await page.close();
  }

  await browser.close();

  console.log(`\n${checks - failures.length}/${checks} checks passed`);
  if (failures.length) {
    console.log(`\n${failures.length} FAILURE(S):`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log('Every rendered row of the wall is full, at every width.');
})().catch((e) => {
  console.error('audit-hang-rows: ' + e.message);
  process.exit(1);
});
