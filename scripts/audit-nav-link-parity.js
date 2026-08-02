/**
 * Nav + footer internal-link parity gate.
 *
 * The category nav and footer dropdowns are crawl-bait: the homepage doctrine
 * puts ~140 above-fold internal links per locale, x11, and that mesh is load
 * bearing for SEO. Moving the tool catalogue and the topic taxonomy OUT of the
 * client bundle (the 727KB layout chunk) is exactly the kind of change that can
 * silently drop links or reorder them while every page still renders fine.
 *
 * So: snapshot every nav/footer link (href, label AND order) per locale, and
 * diff. A dropped link, a changed slug, an English label leaking into a Finnish
 * menu, or a reordered crawl mesh all fail here.
 *
 *   node scripts/audit-nav-link-parity.js --save=before.json
 *   node scripts/audit-nav-link-parity.js --compare=before.json
 *   node scripts/audit-nav-link-parity.js --cross            # locales vs each other
 *
 * ⚠ Dropdown items are behind `{isOpen && ...}` in CategoryNav, so they are NOT
 * in the SSR HTML (§A.13.50) — this drives the real DOM. Collecting from `curl`
 * would see a fraction of the mesh and call it parity.
 *
 * ⚠ Disclosures are opened ONE AT A TIME and closed again. The first version
 * clicked every button three times over, which TOGGLES: whether a dropdown was
 * open at collection time depended on click order. That made the gate flaky —
 * it reported Norwegian as having lost four links when no/da/sv have identical
 * availability data and must render identical navs. The site was consistent;
 * the measurement was not.
 */
const fs = require('fs');
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = (args.base || 'https://www.lessoncraftstudio.com').replace(/\/$/, '');
const LOCALES = String(args.locales || 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',').filter(Boolean);
const key = (l) => `${l.href}||${l.label}`;

const harvest = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('header a[href], nav a[href], footer a[href]')]
      .map((a) => ({ href: a.getAttribute('href') || '', label: (a.textContent || '').replace(/\s+/g, ' ').trim() }))
      .filter((l) => l.href && !/^(mailto:|tel:|javascript:|#)/i.test(l.href)),
  );

async function collect(page) {
  const found = await harvest(page); // at rest

  const total = (await page.$$('header button, nav button, footer button')).length;
  for (let i = 0; i < total; i++) {
    const open = await page.$$('header button, nav button, footer button');
    if (i >= open.length) break;
    try {
      await open[i].click({ delay: 5 });
      await new Promise((r) => setTimeout(r, 180));
      found.push(...(await harvest(page)));
    } catch {
      continue; // not clickable at this viewport; the other viewport covers it
    }
    // Close again so the next iteration starts from a known state.
    const close = await page.$$('header button, nav button, footer button');
    if (close[i]) await close[i].click({ delay: 5 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 60));
  }
  return found;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const snapshot = {};

  for (const locale of LOCALES) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));

    // Desktop (CategoryNav) then phone (MobileCategoryAccordion) — two
    // different components off the same buildCategories() output.
    const links = [];
    for (const vp of [{ width: 1366, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewport(vp);
      await page.goto(`${BASE}/${locale}/?cb=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 180000 });
      links.push(...(await collect(page)));
    }
    await page.close();

    const seen = new Set();
    snapshot[locale] = links.filter((l) => (seen.has(key(l)) ? false : (seen.add(key(l)), true)));
    console.log(`  ${locale.padEnd(3)} ${String(snapshot[locale].length).padStart(4)} nav/footer links`);
  }
  await browser.close();

  /* Non-vacuity: a run that collected nothing would "match" an empty baseline
     and report parity. The nav genuinely carries well over a hundred links per
     locale; under 20 means the collector broke, not that the site shrank. */
  const thin = LOCALES.filter((l) => (snapshot[l] || []).length < 20);
  if (thin.length) {
    console.log(`\nFAIL: collected <20 links for ${thin.join(', ')} — the collector is broken, not the site.`);
    process.exit(1);
  }

  if (args.save) {
    fs.writeFileSync(args.save, JSON.stringify(snapshot, null, 2));
    console.log(`\nSaved baseline -> ${args.save}`);
    process.exit(0);
  }

  if (args.cross) {
    /* Structural cross-check, no baseline needed: locales with the same catalogue
       must produce the same SHAPE of nav. Compares link COUNT per locale — a
       locale that silently lost a whole category stands out against its peers. */
    const counts = LOCALES.map((l) => snapshot[l].length);
    const median = [...counts].sort((a, b) => a - b)[Math.floor(counts.length / 2)];
    let bad = 0;
    for (const l of LOCALES) {
      const n = snapshot[l].length;
      const off = Math.abs(n - median) / median > 0.1; // >10% from the median
      if (off) bad++;
      console.log(`  ${l.padEnd(3)} ${String(n).padStart(4)}  ${off ? `OUTLIER (median ${median})` : 'in line'}`);
    }
    console.log(bad ? `\nFAIL: ${bad} locale(s) diverge from the median nav size.` : '\nPASS: every locale renders a nav of consistent size.');
    process.exit(bad ? 1 : 0);
  }

  if (args.compare) {
    const before = JSON.parse(fs.readFileSync(args.compare, 'utf8'));
    let bad = 0;
    for (const locale of LOCALES) {
      const a = before[locale] || [];
      const b = snapshot[locale] || [];
      const missing = a.filter((x) => !b.some((y) => key(y) === key(x)));
      const added = b.filter((x) => !a.some((y) => key(y) === key(x)));
      // Order compared over links present in BOTH, so an addition can't
      // masquerade as a reorder.
      const common = a.filter((x) => b.some((y) => key(y) === key(x))).map(key);
      const commonAfter = b.filter((x) => a.some((y) => key(y) === key(x))).map(key);
      const reordered = common.join('\n') !== commonAfter.join('\n');

      const ok = !missing.length && !added.length && !reordered;
      if (!ok) bad++;
      console.log(
        `  ${locale.padEnd(3)} ${a.length} -> ${b.length}  ${ok ? 'PARITY' : 'DIFF'}` +
          (missing.length ? `\n      MISSING (${missing.length}): ${missing.slice(0, 6).map(key).join(' | ')}` : '') +
          (added.length ? `\n      ADDED   (${added.length}): ${added.slice(0, 6).map(key).join(' | ')}` : '') +
          (reordered ? `\n      ORDER CHANGED among common links` : ''),
      );
    }
    console.log(bad ? `\nFAIL: ${bad} locale(s) differ.` : '\nPASS: nav/footer link parity holds in every locale.');
    process.exit(bad ? 1 : 0);
  }

  console.log('\n(no --save, --compare or --cross given; nothing asserted)');
})();
