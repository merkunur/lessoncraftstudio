/**
 * Blog Cross-Locale Slug Audit Script
 *
 * This script generates redirect mappings for slugs accessed under wrong locales.
 * When a Swedish slug is accessed under /fi/blog/, it should redirect to /sv/blog/.
 *
 * For each blog post:
 * - Extract all localized slugs (e.g., {sv: 'swedish-slug', fi: 'finnish-slug', ...})
 * - For each slug, for each WRONG locale, generate redirect to the CORRECT locale
 *
 * Output: JSON mapping for use in next.config.js redirects
 *
 * Usage (run on server with database access):
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/audit-blog-cross-locale-slugs.js
 */

const path = require('path');
const prismaPath = path.join(__dirname, '../frontend/node_modules/@prisma/client');
const { PrismaClient } = require(prismaPath);
const fs = require('fs');

const prisma = new PrismaClient();

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

async function main() {
  console.log('Starting blog cross-locale slug audit...\n');

  // Fetch all published blog posts from database
  console.log('Fetching blog posts from database...');
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${posts.length} published blog posts\n`);

  // Build slug -> locale mapping for all posts
  // Maps: slug -> { locale: string, postId: string }
  const slugToLocale = new Map();

  // Also track slugs per post to detect slugs used across multiple locales
  const slugsPerPost = new Map();

  for (const post of posts) {
    const translations = post.translations || {};
    const postSlugs = new Map(); // slug -> locale(s) within this post

    // English uses the primary slug
    const enSlug = translations.en?.slug || post.slug;
    if (!postSlugs.has(enSlug)) postSlugs.set(enSlug, []);
    postSlugs.get(enSlug).push('en');

    // Other locales use their translation slugs
    for (const locale of LOCALES) {
      if (locale === 'en') continue;

      const translation = translations[locale];
      if (translation && translation.slug) {
        const slug = translation.slug;
        if (!postSlugs.has(slug)) postSlugs.set(slug, []);
        postSlugs.get(slug).push(locale);
      }
    }

    // Store mapping: slug -> its native locale
    for (const [slug, locales] of postSlugs.entries()) {
      // If slug is shared across locales (identical translation), pick first
      const nativeLocale = locales[0];
      slugToLocale.set(slug, { locale: nativeLocale, postId: post.id, sharedWith: locales });
    }

    slugsPerPost.set(post.id, postSlugs);
  }

  console.log(`Indexed ${slugToLocale.size} unique slugs\n`);

  // Generate cross-locale redirects
  // For each slug, redirect from every WRONG locale to the CORRECT locale
  const crossLocaleRedirects = [];
  const stats = {
    uniqueSlugs: slugToLocale.size,
    sharedSlugs: 0,
    redirectsGenerated: 0,
    skippedShared: 0,
  };

  for (const [slug, info] of slugToLocale.entries()) {
    const { locale: nativeLocale, sharedWith } = info;

    // Skip if this slug is shared across multiple locales (same slug in multiple languages)
    // In this case, accessing /fi/blog/shared-slug is valid for Finnish
    if (sharedWith.length > 1) {
      stats.sharedSlugs++;
      // Only redirect from locales NOT in the shared list
      for (const wrongLocale of LOCALES) {
        if (!sharedWith.includes(wrongLocale)) {
          crossLocaleRedirects.push({
            source: `/${wrongLocale}/blog/${slug}`,
            destination: `/${nativeLocale}/blog/${slug}`,
            permanent: true,
            _meta: { slug, from: wrongLocale, to: nativeLocale, shared: true }
          });
          stats.redirectsGenerated++;
        } else {
          stats.skippedShared++;
        }
      }
    } else {
      // Slug belongs to exactly one locale - redirect all others
      for (const wrongLocale of LOCALES) {
        if (wrongLocale !== nativeLocale) {
          crossLocaleRedirects.push({
            source: `/${wrongLocale}/blog/${slug}`,
            destination: `/${nativeLocale}/blog/${slug}`,
            permanent: true,
            _meta: { slug, from: wrongLocale, to: nativeLocale, shared: false }
          });
          stats.redirectsGenerated++;
        }
      }
    }
  }

  // Output results
  console.log('=== AUDIT RESULTS ===\n');
  console.log(`Total unique slugs: ${stats.uniqueSlugs}`);
  console.log(`Slugs shared across locales: ${stats.sharedSlugs}`);
  console.log(`Cross-locale redirects generated: ${stats.redirectsGenerated}`);
  console.log(`Skipped (valid shared locale): ${stats.skippedShared}`);
  console.log();

  // Sample output for verification
  console.log('=== SAMPLE REDIRECTS ===\n');
  const samples = crossLocaleRedirects.slice(0, 10);
  for (const r of samples) {
    console.log(`${r.source}`);
    console.log(`  → ${r.destination}`);
    console.log();
  }
  if (crossLocaleRedirects.length > 10) {
    console.log(`... and ${crossLocaleRedirects.length - 10} more\n`);
  }

  // Clean redirects for output (remove _meta)
  const cleanRedirects = crossLocaleRedirects.map(({ source, destination, permanent }) => ({
    source,
    destination,
    permanent
  }));

  // Output JSON for use in redirect configuration
  const outputPath = path.join(__dirname, 'blog-cross-locale-redirects.json');
  fs.writeFileSync(outputPath, JSON.stringify(cleanRedirects, null, 2));
  console.log(`\nFull mapping saved to: ${outputPath}`);

  // Output JS module format for blog-redirects.js
  const jsOutputPath = path.join(__dirname, 'blog-cross-locale-redirects.js');

  // Extract just the data needed for the JS file (locale, slug, targetLocale)
  const redirectData = [];
  for (const [slug, info] of slugToLocale.entries()) {
    const { locale: nativeLocale, sharedWith } = info;

    // For shared slugs, only add non-shared wrong locales
    const wrongLocales = LOCALES.filter(l => !sharedWith.includes(l));

    if (wrongLocales.length > 0) {
      redirectData.push({
        slug,
        nativeLocale,
        wrongLocales
      });
    }
  }

  const jsContent = `/**
 * Blog Cross-Locale Slug Redirects (Generated)
 *
 * Auto-generated mapping of slugs to their native locale.
 * When a slug is accessed under the wrong locale, redirect to the correct locale.
 * Generated from: scripts/audit-blog-cross-locale-slugs.js
 *
 * Total redirects: ${stats.redirectsGenerated}
 * Generated: ${new Date().toISOString()}
 */

const crossLocaleSlugs = ${JSON.stringify(redirectData, null, 2)};

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

  fs.writeFileSync(jsOutputPath, jsContent);
  console.log(`JS module saved to: ${jsOutputPath}`);

  // Group by source locale for analysis
  console.log('\n=== REDIRECTS BY SOURCE LOCALE ===\n');
  const bySourceLocale = {};
  for (const r of crossLocaleRedirects) {
    const source = r._meta.from;
    if (!bySourceLocale[source]) bySourceLocale[source] = 0;
    bySourceLocale[source]++;
  }
  for (const locale of LOCALES) {
    console.log(`  ${locale}: ${bySourceLocale[locale] || 0} redirects`);
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
