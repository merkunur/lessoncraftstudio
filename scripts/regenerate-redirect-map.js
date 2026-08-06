/**
 * Regenerate Blog Cross-Locale Redirect Map
 *
 * Queries the database to build a fresh slug -> nativeLocale map,
 * compares against the existing map, reports a diff, and writes
 * the updated file to frontend/config/blog-cross-locale-redirects.js.
 *
 * Usage (run on server):
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/regenerate-redirect-map.js
 */

const path = require('path');
const fs = require('fs');
const prismaPath = path.join(__dirname, '../frontend/node_modules/@prisma/client');
const { PrismaClient } = require(prismaPath);

const prisma = new PrismaClient();

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

async function main() {
  console.log('=== Regenerate Cross-Locale Redirect Map ===\n');

  // ── Step 1: Load OLD map ──────────────────────────────────────────
  const mapPath = path.join(__dirname, '../frontend/config/blog-cross-locale-redirects.js');
  let oldEntries = [];
  try {
    const oldModule = require(mapPath);
    oldEntries = oldModule.crossLocaleSlugs || [];
    console.log(`OLD map: ${oldEntries.length} entries (from ${mapPath})`);
  } catch (e) {
    console.log(`No existing map found at ${mapPath} - will create fresh`);
  }

  // Build lookup from old map: slug -> { nativeLocale, wrongLocales }
  const oldMap = new Map();
  for (const entry of oldEntries) {
    oldMap.set(entry.slug, {
      nativeLocale: entry.nativeLocale,
      wrongLocales: entry.wrongLocales.slice().sort(),
    });
  }

  // ── Step 2: Query DB ──────────────────────────────────────────────
  console.log('\nFetching published blog posts from database...');
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
    },
    orderBy: { createdAt: 'asc' },
  });
  console.log(`Found ${posts.length} published blog posts`);

  // ── Step 3: Build NEW map ─────────────────────────────────────────
  // slug -> { nativeLocale, sharedWith[] }
  const slugToLocale = new Map();

  for (const post of posts) {
    const translations = post.translations || {};
    const postSlugs = new Map(); // slug -> locale[]

    // English uses primary slug (or translations.en.slug)
    const enSlug = translations.en?.slug || post.slug;
    if (!postSlugs.has(enSlug)) postSlugs.set(enSlug, []);
    postSlugs.get(enSlug).push('en');

    // Other locales
    for (const locale of LOCALES) {
      if (locale === 'en') continue;
      const translation = translations[locale];
      if (translation && translation.slug) {
        const slug = translation.slug;
        if (!postSlugs.has(slug)) postSlugs.set(slug, []);
        postSlugs.get(slug).push(locale);
      }
    }

    // Store: slug -> first locale claiming it
    for (const [slug, locales] of postSlugs.entries()) {
      slugToLocale.set(slug, { locale: locales[0], sharedWith: locales });
    }
  }

  console.log(`Indexed ${slugToLocale.size} unique slugs from DB\n`);

  // Build redirect data array (same format as existing file)
  const newEntries = [];
  let totalRedirects = 0;

  for (const [slug, info] of slugToLocale.entries()) {
    const { locale: nativeLocale, sharedWith } = info;
    const wrongLocales = LOCALES.filter(l => !sharedWith.includes(l));

    if (wrongLocales.length > 0) {
      newEntries.push({ slug, nativeLocale, wrongLocales });
      totalRedirects += wrongLocales.length;
    }
  }

  console.log(`NEW map: ${newEntries.length} entries, ${totalRedirects} total redirects`);

  // Build lookup from new map
  const newMap = new Map();
  for (const entry of newEntries) {
    newMap.set(entry.slug, {
      nativeLocale: entry.nativeLocale,
      wrongLocales: entry.wrongLocales.slice().sort(),
    });
  }

  // ── Step 4: Compute diff ──────────────────────────────────────────
  const added = [];
  const removed = [];
  const changed = [];

  // Find REMOVED (in old, not in new)
  for (const [slug, oldInfo] of oldMap.entries()) {
    if (!newMap.has(slug)) {
      removed.push({ slug, nativeLocale: oldInfo.nativeLocale });
    }
  }

  // Find ADDED (in new, not in old) and CHANGED
  for (const [slug, newInfo] of newMap.entries()) {
    if (!oldMap.has(slug)) {
      added.push({ slug, nativeLocale: newInfo.nativeLocale });
    } else {
      const oldInfo = oldMap.get(slug);
      const localeChanged = oldInfo.nativeLocale !== newInfo.nativeLocale;
      const wrongChanged = JSON.stringify(oldInfo.wrongLocales) !== JSON.stringify(newInfo.wrongLocales);
      if (localeChanged || wrongChanged) {
        changed.push({
          slug,
          oldLocale: oldInfo.nativeLocale,
          newLocale: newInfo.nativeLocale,
          oldWrong: oldInfo.wrongLocales,
          newWrong: newInfo.wrongLocales,
        });
      }
    }
  }

  console.log('\n=== DIFF ===\n');
  console.log(`  ADDED:   ${added.length}`);
  console.log(`  REMOVED: ${removed.length}`);
  console.log(`  CHANGED: ${changed.length}`);

  if (added.length > 0) {
    console.log('\n  Added entries:');
    for (const a of added) {
      console.log(`    + ${a.slug} (${a.nativeLocale})`);
    }
  }

  if (removed.length > 0) {
    console.log('\n  Removed entries (stale):');
    for (const r of removed) {
      console.log(`    - ${r.slug} (${r.nativeLocale})`);
    }
  }

  if (changed.length > 0) {
    console.log('\n  Changed entries:');
    for (const c of changed) {
      console.log(`    ~ ${c.slug}: ${c.oldLocale} -> ${c.newLocale}`);
      if (JSON.stringify(c.oldWrong) !== JSON.stringify(c.newWrong)) {
        console.log(`      wrongLocales: [${c.oldWrong.join(',')}] -> [${c.newWrong.join(',')}]`);
      }
    }
  }

  // ── Step 5: Write updated file ────────────────────────────────────
  const jsContent = `/**
 * Blog Cross-Locale Slug Redirects (Generated)
 *
 * Auto-generated mapping of slugs to their native locale.
 * When a slug is accessed under the wrong locale, redirect to the correct locale.
 * Generated from: scripts/regenerate-redirect-map.js
 *
 * Total redirects: ${totalRedirects}
 * Generated: ${new Date().toISOString()}
 */

const crossLocaleSlugs = ${JSON.stringify(newEntries, null, 2)};

/**
 * Generate Next.js redirect objects for cross-locale blog slugs
 * For each slug, redirects from all wrong locales to the native locale
 */
function generateCrossLocaleRedirects() {
  const redirects = [];

  for (const { slug, nativeLocale, wrongLocales } of crossLocaleSlugs) {
    for (const wrongLocale of wrongLocales) {
      redirects.push({
        source: \`/\${wrongLocale}/blog/\${slug}\`,
        destination: \`/\${nativeLocale}/blog/\${slug}\`,
        permanent: true,
      });
    }
  }

  return redirects;
}

module.exports = {
  crossLocaleSlugs,
  generateCrossLocaleRedirects,
};
`;

  fs.writeFileSync(mapPath, jsContent);
  console.log(`\nWrote updated map to: ${mapPath}`);

  // ── Step 6: Validation ────────────────────────────────────────────
  console.log('\n=== VALIDATION ===\n');

  // Check every DB slug is in the new map
  let missingFromMap = 0;
  for (const [slug] of slugToLocale.entries()) {
    if (!newMap.has(slug)) {
      // This can happen for slugs shared across ALL 11 locales (no wrong locales)
      console.log(`  INFO: slug "${slug}" not in map (shared across all locales)`);
      missingFromMap++;
    }
  }

  // Check no orphans (map entries not in DB)
  let orphans = 0;
  for (const entry of newEntries) {
    if (!slugToLocale.has(entry.slug)) {
      console.log(`  ERROR: orphan slug "${entry.slug}" in map but not in DB`);
      orphans++;
    }
  }

  console.log(`  DB slugs: ${slugToLocale.size}`);
  console.log(`  Map entries: ${newEntries.length}`);
  console.log(`  Missing from map: ${missingFromMap} (expected 0 unless slug shared across all locales)`);
  console.log(`  Orphans in map: ${orphans} (expected 0)`);

  if (orphans === 0 && removed.length >= 0) {
    console.log('\n  PASS: Map is a clean mirror of the database');
  } else {
    console.log('\n  FAIL: Map has orphan entries - investigate');
  }

  console.log('\n=== DONE ===');

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
