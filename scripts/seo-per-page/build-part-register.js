#!/usr/bin/env node
/* Build the >=400 part register: the work-order for rewriting every page.
 *
 * Why parts are cut by SIBLING CLASS, not by slug order
 * -----------------------------------------------------
 * The whole point of the programme is that no two pages read alike. The only
 * pages at risk of reading alike are siblings — same locale, same worksheet
 * type, same mode. If siblings were scattered across parts, an author writing
 * part 7 could not see what part 200 had already written, and the anti-template
 * gate would have nothing to compare against. So a class stays whole inside one
 * part wherever it fits; a class larger than the target splits into CONSECUTIVE
 * parts that record their siblings, so the gate still spans the whole class.
 *
 * Ordering is by opportunity: en and de first (largest corpora, strongest
 * verified demand), then the Romance locales, then nl, then the Nordics whose
 * harvested demand is thinnest.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const OUT_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'parts');

const LOCALE_ORDER = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// ~80 keeps every part a single focused sitting and puts the landing corpus alone
// past 360 parts; the hubs, activities and tools registered after it carry the
// programme beyond the 400 the operator asked for.
const TARGET = 80;
const MAX_PART = 100; // never exceed this, even to keep a class whole

function classKey(c) {
  return [c.type || 'unknown', c.mode == null ? 'null' : c.mode].join('::');
}

function build() {
  const parts = [];
  const summary = [];

  for (const locale of LOCALE_ORDER) {
    const lf = path.join(LANDING_DIR, `${locale}.json`);
    if (!fs.existsSync(lf)) continue;
    const landings = JSON.parse(fs.readFileSync(lf, 'utf8')).landings || [];

    const factFile = path.join(FACTS_DIR, `${locale}.json`);
    const facts = fs.existsSync(factFile)
      ? new Map(JSON.parse(fs.readFileSync(factFile, 'utf8')).decks.map((d) => [d.slug, d]))
      : new Map();

    // group into sibling classes
    const classes = new Map();
    for (const l of landings) {
      const k = classKey(l.coordinate || {});
      if (!classes.has(k)) classes.set(k, []);
      classes.get(k).push(l);
    }

    // biggest classes first: they define the part boundaries, small ones fill gaps
    const ordered = [...classes.entries()].sort((a, b) => b[1].length - a[1].length || (a[0] < b[0] ? -1 : 1));

    let bucket = [];
    let bucketClasses = [];
    const flush = () => {
      if (!bucket.length) return;
      parts.push({ locale, pages: bucket, classes: bucketClasses });
      bucket = [];
      bucketClasses = [];
    };

    for (const [k, pages] of ordered) {
      pages.sort((a, b) => (a.slug < b.slug ? -1 : 1));
      if (pages.length > MAX_PART) {
        // class too big for one part: flush what we have, then split the class
        // into consecutive parts that each declare the full class as siblings
        flush();
        const chunks = Math.ceil(pages.length / TARGET);
        const size = Math.ceil(pages.length / chunks);
        for (let i = 0; i < pages.length; i += size) {
          parts.push({
            locale,
            pages: pages.slice(i, i + size),
            classes: [k],
            splitOf: { class: k, total: pages.length, chunk: i / size + 1, chunks },
          });
        }
        continue;
      }
      if (bucket.length + pages.length > MAX_PART) flush();
      bucket = bucket.concat(pages);
      bucketClasses.push(k);
    }
    flush();

    summary.push({ locale, pages: landings.length, classes: classes.size, withFacts: facts.size });
  }

  // write one file per part, numbered in execution order
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (/^\d{3}\.json$/.test(f)) fs.unlinkSync(path.join(OUT_DIR, f));
  }

  const index = [];
  parts.forEach((p, i) => {
    const id = String(i + 1).padStart(3, '0');
    const rec = {
      part: i + 1,
      locale: p.locale,
      classes: p.classes,
      splitOf: p.splitOf || null,
      count: p.pages.length,
      // siblings the gate must compare against, even if in an adjacent part
      pages: p.pages.map((l) => ({
        slug: l.slug,
        type: (l.coordinate || {}).type,
        mode: (l.coordinate || {}).mode,
        theme: (l.coordinate || {}).theme,
        level: (l.coordinate || {}).level,
        deck: l.canonicalDeckSlug,
      })),
    };
    fs.writeFileSync(path.join(OUT_DIR, `${id}.json`), JSON.stringify(rec, null, 1));
    index.push({
      part: i + 1, locale: p.locale, count: p.pages.length,
      classes: p.classes.length, split: p.splitOf ? p.splitOf.class : null,
    });
  });

  fs.writeFileSync(path.join(OUT_DIR, 'index.json'),
    JSON.stringify({ generated: 'build-part-register.js', totalParts: parts.length, totalPages: index.reduce((n, x) => n + x.count, 0), summary, index }, null, 1));

  return { parts: parts.length, pages: index.reduce((n, x) => n + x.count, 0), summary, index };
}

if (require.main === module) {
  const r = build();
  console.log(`${r.parts} parts | ${r.pages} pages`);
  for (const s of r.summary) {
    const n = r.index.filter((x) => x.locale === s.locale).length;
    console.log(`  ${s.locale.padEnd(3)} ${String(s.pages).padStart(5)} pages  ${String(s.classes).padStart(3)} classes  -> ${String(n).padStart(3)} parts`);
  }
  const sizes = r.index.map((x) => x.count);
  console.log(`  part size: min ${Math.min(...sizes)} max ${Math.max(...sizes)}`);
}

module.exports = { build };
