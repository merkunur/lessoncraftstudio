/**
 * Quick local verification: cross-reference redirect map against DB dump.
 * Usage: node scripts/verify-map-locally.js
 */
const path = require('path');
const fs = require('fs');

// Load redirect map
const { crossLocaleSlugs } = require(path.join(__dirname, '../frontend/config/blog-cross-locale-redirects.js'));
console.log('Redirect map entries:', crossLocaleSlugs.length);

// Load DB dump
const dbDump = JSON.parse(fs.readFileSync(path.join(__dirname, 'db-slugs-dump.json'), 'utf-8'));
console.log('DB posts:', dbDump.length);

// Build DB slug set
const dbSlugs = new Set();
for (const post of dbDump) {
  for (const slug of Object.values(post.localeSlugs || {})) {
    if (slug) dbSlugs.add(slug);
  }
}
console.log('DB unique slugs:', dbSlugs.size);

// Check: map slugs not in DB (stale)
const stale = crossLocaleSlugs.filter(e => !dbSlugs.has(e.slug));
console.log('\nStale entries (map slug not in DB):', stale.length);
for (const s of stale) {
  console.log('  -', s.slug, '(' + s.nativeLocale + ')');
}

// Check: DB slugs not in map
const mapSlugs = new Set(crossLocaleSlugs.map(e => e.slug));
const missing = [...dbSlugs].filter(s => !mapSlugs.has(s));
console.log('Missing entries (DB slug not in map):', missing.length);
for (const m of missing) {
  console.log('  -', m);
}

// Check shared slugs
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const dbSlugToLocales = new Map();
for (const post of dbDump) {
  for (const [locale, slug] of Object.entries(post.localeSlugs || {})) {
    if (!slug) continue;
    if (!dbSlugToLocales.has(slug)) dbSlugToLocales.set(slug, new Set());
    dbSlugToLocales.get(slug).add(locale);
  }
}
let shared = 0;
for (const [slug, locales] of dbSlugToLocales) {
  if (locales.size > 1) {
    shared++;
    console.log('  Shared slug:', slug, '->', [...locales].join(', '));
  }
}
console.log('\nShared slugs:', shared);

const allGood = stale.length === 0 && missing.length === 0;
console.log('\n' + (allGood ? 'PASS: Map is a perfect mirror of DB' : 'FAIL: Issues found'));
process.exit(allGood ? 0 : 1);
