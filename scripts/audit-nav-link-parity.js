/**
 * Nav + footer internal-link parity gate.
 *
 * The category nav and footer dropdowns are crawl-bait: the homepage doctrine
 * puts ~140 above-fold internal links per locale, x11, and that mesh is load
 * bearing for SEO. The 727KB layout chunk is being fixed by moving the tool
 * catalogue and the topic taxonomy OUT of the client bundle and passing the
 * resolved slice down as props — which is exactly the kind of change that can
 * silently drop links or reorder them while every page still renders fine.
 *
 * So: snapshot every nav/footer link (href, label AND order) per locale before
 * the change, and diff after. A dropped link, a changed slug, an English label
 * leaking into a Finnish menu, or a reordered crawl mesh all fail here.
 *
 *   node scripts/audit-nav-link-parity.js --save=before.json
 *   node scripts/audit-nav-link-parity.js --compare=before.json
 *
 * ⚠ Dropdown items are gated behind `{isOpen && ...}` in CategoryNav, so they
 * are NOT in the SSR HTML (§A.13.50). This drives the real DOM and clicks every
 * disclosure button, then collects. Collecting from `curl` output would report
 * a fraction of the mesh and call it parity.
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

/* Collect after opening every disclosure in the nav/footer. Returns links in
   DOCUMENT ORDER — order is part of the contract, not just membership. */
async function collect(page) {
  // Open everything that can open. Buttons are re-queried each round because
  // opening one can mount another (mobile accordion inside the drawer).
  for (let round = 0; round < 3; round++) {
    const buttons = await page.$$('header button, nav button, footer button');
    for (const b of buttons) {
      try {
        await b.click({ delay: 5 });
      } catch {
        /* not clickable in this viewport — fine, another viewport covers it */
      }
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return page.evaluate(() => {
    const roots = [...document.querySelectorAll('header, nav, footer')];
    const seen = new Set();
    const out = [];
    for (const root of roots) {
      for (const a of root.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href') || '';
        if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) continue;
        const label = (a.textContent || '').replace(/\s+/g, ' ').trim();
        const key = `${href}||${label}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ href, label });
      }
    }
    return out;
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const snapshot = {};

  for (const locale of LOCALES) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));

    // Desktop first (CategoryNav), then phone (MobileCategoryAccordion) — the
    // two surfaces render DIFFERENT components off the same buildCategories().
    const links = [];
    for (const vp of [{ width: 1366, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewport(vp);
      await page.goto(`${BASE}/${locale}/?cb=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 180000 });
      links.push(...(await collect(page)));
    }
    await page.close();

    // Dedupe across viewports, preserving first-seen order.
    const seen = new Set();
    snapshot[locale] = links.filter((l) => {
      const k = `${l.href}||${l.label}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    console.log(`  ${locale.padEnd(3)} ${String(snapshot[locale].length).padStart(4)} nav/footer links`);
  }
  await browser.close();

  /* Non-vacuity. A run that collected nothing would otherwise "match" an empty
     baseline and report parity. The nav genuinely carries dozens of links per
     locale; anything under 20 means the collector failed, not that the site is
     small. */
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

  if (args.compare) {
    const before = JSON.parse(fs.readFileSync(args.compare, 'utf8'));
    let bad = 0;
    for (const locale of LOCALES) {
      const a = before[locale] || [];
      const b = snapshot[locale] || [];
      const key = (l) => `${l.href}||${l.label}`;
      const missing = a.filter((x) => !b.some((y) => key(y) === key(x)));
      const added = b.filter((x) => !a.some((y) => key(y) === key(x)));
      // Order check over the links present in BOTH, so an addition doesn't
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

  console.log('\n(no --save or --compare given; nothing asserted)');
})();
