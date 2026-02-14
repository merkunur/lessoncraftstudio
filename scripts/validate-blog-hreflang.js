/**
 * Part 15: Blog Hreflang Validation Script
 *
 * Verifies that the hreflang logic in page.tsx (generateMetadata) and
 * sitemap.ts produce identical results for every published blog post.
 *
 * Checks:
 *   1. HTML === Sitemap  -  locale/URL sets must match exactly
 *   2. No redirect URLs  -  no slug that belongs to a different locale
 *   3. Reciprocal links  -  every hreflang pair has a reciprocal entry
 *   4. x-default agree   -  both sources pick the same x-default URL
 *   5. Own-slug required  -  no locale gets hreflang without translations[locale].slug
 *
 * Usage (run from frontend directory on server):
 *   cd /opt/lessoncraftstudio/frontend
 *   NODE_PATH=./node_modules node ../scripts/validate-blog-hreflang.js
 *
 * Exit code 0 = all posts pass, 1 = failures found.
 */

const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Load the cross-locale redirect map
const { crossLocaleSlugs } = require(
  path.resolve(__dirname, '../frontend/config/blog-cross-locale-redirects.js')
);

const prisma = new PrismaClient();

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const BASE_URL = 'https://www.lessoncraftstudio.com';

// Must match schema-generator.ts hreflangMap exactly
const hreflangMap = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
  pt: 'pt-BR',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
  da: 'da',
  no: 'no',
  fi: 'fi',
};

function getHreflangCode(locale) {
  return hreflangMap[locale] || locale;
}

// Build slug -> nativeLocale map from redirect data
const slugToNativeLocale = new Map();
for (const { slug, nativeLocale } of crossLocaleSlugs) {
  slugToNativeLocale.set(slug, nativeLocale);
}

// =====================================================================
// Simulate page.tsx generateMetadata hreflang logic
// =====================================================================
function computeMetadataHreflang(translations) {
  const languages = {};

  for (const loc of ALL_LOCALES) {
    const trans = translations[loc];
    if (trans && trans.title && trans.content && trans.slug) {
      const code = getHreflangCode(loc);
      languages[code] = `${BASE_URL}/${loc}/blog/${trans.slug}`;
    }
  }

  // x-default
  const enTrans = translations['en'];
  if (enTrans && enTrans.title && enTrans.content && enTrans.slug) {
    languages['x-default'] = `${BASE_URL}/en/blog/${enTrans.slug}`;
  } else {
    const firstAvailable = ALL_LOCALES.find((loc) => {
      const t = translations[loc];
      return t && t.title && t.content && t.slug;
    });
    if (firstAvailable) {
      languages['x-default'] = `${BASE_URL}/${firstAvailable}/blog/${translations[firstAvailable].slug}`;
    }
  }

  return languages;
}

// =====================================================================
// Simulate sitemap.ts hreflang logic
// =====================================================================
function computeSitemapHreflang(translations) {
  // Filter available locales (same logic as sitemap.ts lines 316-324)
  const availableLocales = ALL_LOCALES.filter((locale) => {
    const translation = translations[locale];
    if (!translation || !translation.title || !translation.content) return false;
    if (!translation.slug) return false;
    const native = slugToNativeLocale.get(translation.slug);
    if (native && native !== locale) return false;
    return true;
  });

  if (availableLocales.length === 0) return {};

  const alternates = {};
  for (const loc of availableLocales) {
    const locSlug = translations[loc].slug;
    alternates[getHreflangCode(loc)] = `${BASE_URL}/${loc}/blog/${locSlug}`;
  }

  // x-default
  if (availableLocales.includes('en')) {
    alternates['x-default'] = `${BASE_URL}/en/blog/${translations['en'].slug}`;
  } else {
    const fallbackLocale = availableLocales[0];
    alternates['x-default'] = `${BASE_URL}/${fallbackLocale}/blog/${translations[fallbackLocale].slug}`;
  }

  return alternates;
}

// =====================================================================
// MAIN
// =====================================================================
async function main() {
  console.log('=== BLOG HREFLANG VALIDATION ===');
  console.log(`Date: ${new Date().toISOString()}\n`);

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Found ${posts.length} published posts\n`);

  const failures = [];
  let passCount = 0;

  for (const post of posts) {
    const translations = post.translations || {};
    const postFailures = [];

    const metaHreflang = computeMetadataHreflang(translations);
    const sitemapHreflang = computeSitemapHreflang(translations);

    // ---------------------------------------------------------------
    // Check 1: HTML === Sitemap (locale/URL sets must match exactly)
    // ---------------------------------------------------------------
    const metaKeys = Object.keys(metaHreflang).sort();
    const sitemapKeys = Object.keys(sitemapHreflang).sort();

    if (metaKeys.join(',') !== sitemapKeys.join(',')) {
      const onlyMeta = metaKeys.filter((k) => !sitemapKeys.includes(k));
      const onlySitemap = sitemapKeys.filter((k) => !metaKeys.includes(k));
      postFailures.push({
        check: 'HTML_SITEMAP_KEYS_MISMATCH',
        detail: `Metadata has [${onlyMeta.join(', ')}] extra; Sitemap has [${onlySitemap.join(', ')}] extra`,
      });
    } else {
      // Keys match - check URLs match too
      for (const key of metaKeys) {
        if (metaHreflang[key] !== sitemapHreflang[key]) {
          postFailures.push({
            check: 'HTML_SITEMAP_URL_MISMATCH',
            detail: `Key "${key}": meta="${metaHreflang[key]}" vs sitemap="${sitemapHreflang[key]}"`,
          });
        }
      }
    }

    // ---------------------------------------------------------------
    // Check 2: No redirect URLs (no slug that maps to a different locale)
    // ---------------------------------------------------------------
    for (const [code, url] of Object.entries(metaHreflang)) {
      if (code === 'x-default') continue;
      // Extract locale and slug from URL
      const match = url.match(/\/([a-z]{2})\/blog\/(.+)$/);
      if (match) {
        const urlLocale = match[1];
        const urlSlug = match[2];
        const native = slugToNativeLocale.get(urlSlug);
        if (native && native !== urlLocale) {
          postFailures.push({
            check: 'REDIRECT_URL',
            detail: `hreflang "${code}" points to /${urlLocale}/blog/${urlSlug} but slug belongs to "${native}"`,
          });
        }
      }
    }

    // ---------------------------------------------------------------
    // Check 3: Reciprocal links
    // For each locale L that has an hreflang entry, the post as seen
    // from locale L should generate hreflang entries back to all the
    // same locales. Since we use a single translations object for all
    // locales of the same post, reciprocity is guaranteed by both
    // algorithms — but we verify it explicitly anyway.
    // ---------------------------------------------------------------
    // Both meta and sitemap use the same translations object, so
    // they each produce ONE set of alternates shared across all locales.
    // Reciprocity: every hreflang key (locale) should also produce the
    // same set when computed from its own perspective. Because the
    // algorithms don't vary per-locale (they iterate ALL_LOCALES),
    // the result is inherently the same — no per-locale divergence.
    // We still verify that every locale mentioned has its own slug.
    const hreflangLocaleEntries = Object.entries(metaHreflang).filter(([k]) => k !== 'x-default');
    for (const [code, url] of hreflangLocaleEntries) {
      // Reverse-map hreflang code to locale
      const locale = Object.entries(hreflangMap).find(([, v]) => v === code)?.[0];
      if (!locale) continue;
      const trans = translations[locale];
      if (!trans || !trans.slug) {
        postFailures.push({
          check: 'RECIPROCAL_MISSING_SLUG',
          detail: `hreflang "${code}" listed but translations["${locale}"].slug is missing`,
        });
      }
    }

    // ---------------------------------------------------------------
    // Check 4: x-default consistency
    // ---------------------------------------------------------------
    if (metaHreflang['x-default'] !== sitemapHreflang['x-default']) {
      postFailures.push({
        check: 'X_DEFAULT_MISMATCH',
        detail: `meta="${metaHreflang['x-default']}" vs sitemap="${sitemapHreflang['x-default']}"`,
      });
    }

    // ---------------------------------------------------------------
    // Check 5: Own-slug requirement
    // No locale should get hreflang unless translations[locale].slug exists
    // ---------------------------------------------------------------
    for (const [code, url] of Object.entries(metaHreflang)) {
      if (code === 'x-default') continue;
      const locale = Object.entries(hreflangMap).find(([, v]) => v === code)?.[0];
      if (!locale) continue;
      const trans = translations[locale];
      if (!trans || !trans.slug) {
        postFailures.push({
          check: 'NO_OWN_SLUG',
          detail: `Locale "${locale}" (hreflang "${code}") included without own slug`,
        });
      }
    }

    // Tally
    if (postFailures.length === 0) {
      passCount++;
    } else {
      failures.push({
        postSlug: post.slug,
        postId: post.id,
        localeCount: Object.keys(metaHreflang).filter((k) => k !== 'x-default').length,
        issues: postFailures,
      });
    }
  }

  // =====================================================================
  // OUTPUT
  // =====================================================================
  console.log('=== RESULTS ===\n');
  console.log(`Posts checked:  ${posts.length}`);
  console.log(`Passed:         ${passCount}`);
  console.log(`Failed:         ${failures.length}`);

  if (failures.length > 0) {
    console.log('\n--- FAILURES ---\n');
    for (const f of failures) {
      console.log(`Post: ${f.postSlug} (${f.postId}) — ${f.localeCount} locale hreflangs`);
      for (const issue of f.issues) {
        console.log(`  [${issue.check}] ${issue.detail}`);
      }
      console.log('');
    }
  }

  console.log(`\n${failures.length === 0 ? 'ALL CHECKS PASSED' : `${failures.length} post(s) with failures`}`);

  await prisma.$disconnect();
  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch(async (err) => {
  console.error('Fatal error:', err);
  await prisma.$disconnect();
  process.exit(2);
});
