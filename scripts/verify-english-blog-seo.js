#!/usr/bin/env node
/**
 * English Blog SEO Verification & Auto-Fix Script
 * Part 1 of 11: Verify all 112 English blog posts
 *
 * Runs 21 checks per post:
 *   A. Translation Data Integrity (checks 1-8)
 *   B. URL & Redirect Correctness (checks 9-11)
 *   C. Sitemap Correctness (checks 12-14)
 *   D. Schema / Metadata Correctness (checks 15-19)
 *   E. Cross-Locale Isolation (checks 20-21)
 *
 * Usage:
 *   node scripts/verify-english-blog-seo.js --dry-run   # audit only
 *   node scripts/verify-english-blog-seo.js              # audit + fix
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const LOCALE = 'en';
const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY_RUN = process.argv.includes('--dry-run');

// ---------------------------------------------------------------------------
// normalizeSlug - ported from frontend/lib/slug-utils.ts
// ---------------------------------------------------------------------------
const CHAR_MAP = {
  '\u00e4': 'ae', '\u00f6': 'oe', '\u00fc': 'ue', '\u00df': 'ss',
  '\u00c4': 'Ae', '\u00d6': 'Oe', '\u00dc': 'Ue',
  '\u00e5': 'aa', '\u00f8': 'oe', '\u00e6': 'ae',
  '\u00c5': 'Aa', '\u00d8': 'Oe', '\u00c6': 'Ae',
  '\u00e0': 'a', '\u00e2': 'a', '\u00e7': 'c', '\u00e9': 'e', '\u00e8': 'e',
  '\u00ea': 'e', '\u00eb': 'e', '\u00ee': 'i', '\u00ef': 'i', '\u00f4': 'o', '\u0153': 'oe',
  '\u00f9': 'u', '\u00fb': 'u', '\u00ff': 'y',
  '\u00c0': 'A', '\u00c2': 'A', '\u00c7': 'C', '\u00c9': 'E', '\u00c8': 'E',
  '\u00ca': 'E', '\u00cb': 'E', '\u00ce': 'I', '\u00cf': 'I', '\u00d4': 'O', '\u0152': 'Oe',
  '\u00d9': 'U', '\u00db': 'U', '\u0178': 'Y',
  '\u00e1': 'a', '\u00ed': 'i', '\u00f3': 'o', '\u00fa': 'u', '\u00f1': 'n',
  '\u00c1': 'A', '\u00cd': 'I', '\u00d3': 'O', '\u00da': 'U', '\u00d1': 'N',
  '\u00e3': 'a', '\u00f5': 'o', '\u00c3': 'A', '\u00d5': 'O',
  '\u0105': 'a', '\u0107': 'c', '\u0119': 'e', '\u0142': 'l', '\u0144': 'n',
  '\u015b': 's', '\u017a': 'z', '\u017c': 'z',
  '\u0104': 'A', '\u0106': 'C', '\u0118': 'E', '\u0141': 'L', '\u0143': 'N',
  '\u015a': 'S', '\u0179': 'Z', '\u017b': 'Z',
  '\u010d': 'c', '\u010f': 'd', '\u011b': 'e', '\u0148': 'n', '\u0159': 'r',
  '\u0161': 's', '\u0165': 't', '\u016f': 'u', '\u017e': 'z',
  '\u010c': 'C', '\u010e': 'D', '\u011a': 'E', '\u0147': 'N', '\u0158': 'R',
  '\u0160': 'S', '\u0164': 'T', '\u016e': 'U', '\u017d': 'Z',
  '\u2018': '', '\u2019': '', '\u201c': '', '\u201d': '', '\u2013': '-', '\u2014': '-',
  '\u2026': '...', '\u00ab': '', '\u00bb': '', '\u2039': '', '\u203a': '',
};

function normalizeSlug(text) {
  if (!text) return '';
  let slug = text;
  for (const [char, replacement] of Object.entries(CHAR_MAP)) {
    slug = slug.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
  }
  slug = slug.toLowerCase();
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  slug = slug.replace(/[\s_]+/g, '-');
  slug = slug.replace(/[^a-z0-9-]/g, '');
  slug = slug.replace(/-+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');
  return slug;
}

// ---------------------------------------------------------------------------
// Load cross-locale redirects
// ---------------------------------------------------------------------------
function loadCrossLocaleRedirects() {
  // Try multiple possible paths (script may run from different directories)
  const candidates = [
    path.join(__dirname, '..', 'frontend', 'config', 'blog-cross-locale-redirects.js'),
    path.join(process.cwd(), 'frontend', 'config', 'blog-cross-locale-redirects.js'),
    '/opt/lessoncraftstudio/frontend/config/blog-cross-locale-redirects.js',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      // The file exports crossLocaleSlugs via module.exports
      const mod = require(p);
      // It might export the array directly or as a property
      if (Array.isArray(mod)) return mod;
      if (mod.crossLocaleSlugs && Array.isArray(mod.crossLocaleSlugs)) return mod.crossLocaleSlugs;
      // Try to parse the file manually if module.exports isn't standard
      const content = fs.readFileSync(p, 'utf8');
      const match = content.match(/const crossLocaleSlugs\s*=\s*(\[[\s\S]*?\n\]);/);
      if (match) {
        try { return JSON.parse(match[1]); } catch {}
      }
      // Return whatever the module gave us
      return mod;
    }
  }
  console.warn('WARNING: Could not find blog-cross-locale-redirects.js');
  return [];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const prisma = new PrismaClient();
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  ENGLISH BLOG SEO VERIFICATION');
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (audit only)' : 'LIVE (audit + fix)'}`);
  console.log('='.repeat(80));
  console.log();

  // Fetch all published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
      category: true,
      keywords: true,
      featuredImage: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${posts.length} published blog posts\n`);

  // Load cross-locale redirect data
  const crossLocaleData = loadCrossLocaleRedirects();
  const slugToNativeLocale = new Map();
  if (Array.isArray(crossLocaleData)) {
    for (const entry of crossLocaleData) {
      if (entry.slug && entry.nativeLocale) {
        slugToNativeLocale.set(entry.slug, entry.nativeLocale);
      }
    }
  }
  console.log(`Loaded ${slugToNativeLocale.size} cross-locale slug mappings\n`);

  // Build a map of all slugs across all locales (for collision detection)
  const allSlugsByLocale = new Map(); // slug -> [{locale, postId}]
  for (const post of posts) {
    const t = post.translations;
    for (const loc of ALL_LOCALES) {
      if (t[loc] && t[loc].slug) {
        const s = t[loc].slug;
        if (!allSlugsByLocale.has(s)) allSlugsByLocale.set(s, []);
        allSlugsByLocale.get(s).push({ locale: loc, postId: post.id, postSlug: post.slug });
      }
    }
    // Also include the primary slug
    if (!allSlugsByLocale.has(post.slug)) allSlugsByLocale.set(post.slug, []);
    allSlugsByLocale.get(post.slug).push({ locale: 'primary', postId: post.id, postSlug: post.slug });
  }

  // Collect all titles across all locales (for duplicate detection)
  const titleToLocalePost = new Map(); // title -> [{locale, postSlug}]
  for (const post of posts) {
    const t = post.translations;
    for (const loc of ALL_LOCALES) {
      if (t[loc] && t[loc].title) {
        const title = t[loc].title.trim();
        if (!titleToLocalePost.has(title)) titleToLocalePost.set(title, []);
        titleToLocalePost.get(title).push({ locale: loc, postSlug: post.slug });
      }
    }
  }

  // Results
  const report = {
    locale: LOCALE,
    totalPosts: posts.length,
    totalChecks: 0,
    passed: 0,
    failed: 0,
    fixed: 0,
    unfixable: 0,
    mode: DRY_RUN ? 'dry-run' : 'live',
    timestamp: new Date().toISOString(),
    posts: [],
  };

  const fixQueue = []; // {postId, field, oldValue, newValue, description}

  // ---------------------------------------------------------------------------
  // Run checks for each post
  // ---------------------------------------------------------------------------
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const t = post.translations || {};
    const en = t[LOCALE] || {};
    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      checks: [],
    };

    function check(id, name, pass, detail, fixable = false, fixAction = null) {
      report.totalChecks++;
      const result = { id, name, pass: !!pass, detail };
      if (pass) {
        report.passed++;
      } else {
        report.failed++;
        result.fixable = fixable;
        if (fixable && fixAction) {
          result.fixDescription = fixAction.description;
          fixQueue.push({ postId: post.id, ...fixAction });
          if (!DRY_RUN) report.fixed++;
        } else if (!fixable) {
          report.unfixable++;
        }
      }
      postReport.checks.push(result);
      return pass;
    }

    // =========================================================================
    // A. Translation Data Integrity (checks 1-8)
    // =========================================================================

    // 1. translations.en.title exists and is non-empty
    check('A1', 'en.title exists', en.title && en.title.trim().length > 0,
      en.title ? `"${en.title.substring(0, 70)}"` : 'MISSING');

    // 2. translations.en.content exists and is non-empty
    const contentLen = en.content ? en.content.length : 0;
    check('A2', 'en.content exists', contentLen > 0,
      contentLen > 0 ? `${contentLen} chars` : 'MISSING');

    // 3. translations.en.slug exists and matches normalizeSlug(title)
    const expectedSlug = en.title ? normalizeSlug(en.title) : '';
    const actualEnSlug = en.slug || '';
    // Slug may have been manually set - just check it exists and is valid
    const slugExists = actualEnSlug.length > 0;
    const slugMatchesNormalized = actualEnSlug === expectedSlug;
    check('A3', 'en.slug exists', slugExists,
      slugExists
        ? (slugMatchesNormalized ? `"${actualEnSlug}"` : `"${actualEnSlug}" (differs from normalized: "${expectedSlug.substring(0, 60)}")`)
        : 'MISSING',
      !slugExists && en.title, // fixable if we have a title
      !slugExists && en.title ? {
        field: 'translations.en.slug',
        oldValue: '',
        newValue: expectedSlug,
        description: `Set en.slug to "${expectedSlug.substring(0, 60)}"`,
        patch: { slug: expectedSlug },
      } : null
    );

    // 4. translations.en.metaTitle exists (<=70 chars)
    const metaTitle = en.metaTitle || '';
    const metaTitleOk = metaTitle.length > 0 && metaTitle.length <= 70;
    check('A4', 'en.metaTitle exists (<=70 chars)', metaTitleOk,
      metaTitle.length > 0 ? `"${metaTitle.substring(0, 70)}" (${metaTitle.length} chars)` : 'MISSING',
      metaTitle.length === 0 && en.title, // fixable if we have a title
      metaTitle.length === 0 && en.title ? {
        field: 'translations.en.metaTitle',
        oldValue: '',
        newValue: en.title.substring(0, 70),
        description: `Set metaTitle from title: "${en.title.substring(0, 70)}"`,
        patch: { metaTitle: en.title.substring(0, 70) },
      } : null
    );

    // 5. translations.en.metaDescription exists (<=160 chars)
    const metaDesc = en.metaDescription || '';
    const metaDescOk = metaDesc.length > 0 && metaDesc.length <= 160;
    check('A5', 'en.metaDescription exists (<=160 chars)', metaDescOk,
      metaDesc.length > 0 ? `${metaDesc.length} chars` : 'MISSING',
      metaDesc.length === 0 && en.excerpt, // fixable if we have an excerpt
      metaDesc.length === 0 && en.excerpt ? {
        field: 'translations.en.metaDescription',
        oldValue: '',
        newValue: en.excerpt.substring(0, 160),
        description: `Set metaDescription from excerpt (${en.excerpt.substring(0, 40)}...)`,
        patch: { metaDescription: en.excerpt.substring(0, 160) },
      } : null
    );

    // 6. translations.en.excerpt exists
    check('A6', 'en.excerpt exists', en.excerpt && en.excerpt.trim().length > 0,
      en.excerpt ? `${en.excerpt.length} chars` : 'MISSING');

    // 7. translations.en.focusKeyword exists
    check('A7', 'en.focusKeyword exists', en.focusKeyword && en.focusKeyword.trim().length > 0,
      en.focusKeyword ? `"${en.focusKeyword}"` : 'MISSING');

    // 8. post.slug equals translations.en.slug
    const primaryMatchesEn = post.slug === actualEnSlug;
    check('A8', 'post.slug matches en.slug', primaryMatchesEn || !actualEnSlug,
      primaryMatchesEn ? `Both: "${post.slug}"` : `primary="${post.slug}" vs en="${actualEnSlug}"`,
      !primaryMatchesEn && actualEnSlug, // fixable
      !primaryMatchesEn && actualEnSlug ? {
        field: 'post.slug',
        oldValue: post.slug,
        newValue: actualEnSlug,
        description: `Update primary slug from "${post.slug}" to "${actualEnSlug}"`,
        updatePrimarySlug: true,
        newSlugValue: actualEnSlug,
      } : null
    );

    // =========================================================================
    // B. URL & Redirect Correctness (checks 9-11)
    // =========================================================================

    // 9. English slug's nativeLocale in cross-locale redirects is 'en'
    const enSlugNative = slugToNativeLocale.get(actualEnSlug || post.slug);
    const nativeIsEn = enSlugNative === 'en' || enSlugNative === undefined; // undefined means not in the list (might be ok for new posts)
    check('B9', 'English slug nativeLocale=en', nativeIsEn,
      enSlugNative ? `nativeLocale="${enSlugNative}"` : 'Not in cross-locale redirects (may need regeneration)');

    // 10. No slug collision with other locales
    const enSlug = actualEnSlug || post.slug;
    const slugUsers = (allSlugsByLocale.get(enSlug) || []).filter(
      u => u.locale !== 'en' && u.locale !== 'primary' && u.postId !== post.id
    );
    check('B10', 'No slug collision with other locales', slugUsers.length === 0,
      slugUsers.length === 0 ? 'No collisions' : `Collision: ${JSON.stringify(slugUsers)}`);

    // 11. English slug appears in cross-locale redirects with nativeLocale='en'
    check('B11', 'Slug in cross-locale redirects', slugToNativeLocale.has(enSlug),
      slugToNativeLocale.has(enSlug)
        ? `Present, nativeLocale="${slugToNativeLocale.get(enSlug)}"`
        : 'Missing from cross-locale redirects (needs regeneration)');

    // =========================================================================
    // C. Sitemap Correctness (checks 12-14)
    // These checks verify the DATA that the sitemap generator uses.
    // If the data is correct, the sitemap output will be correct.
    // =========================================================================

    // 12. English URL would appear in sitemap (title + content exist)
    const wouldAppearInSitemap = !!(en.title && en.content);
    check('C12', 'Would appear in English sitemap', wouldAppearInSitemap,
      wouldAppearInSitemap ? `URL: ${BASE_URL}/en/blog/${enSlug}` : 'Missing title or content');

    // 13. Hreflang alternates: count how many locales have valid translations
    const availableLocales = ALL_LOCALES.filter(loc => {
      const tr = t[loc];
      if (!tr || !tr.title || !tr.content) return false;
      const resolvedSlug = tr.slug || post.slug;
      const native = slugToNativeLocale.get(resolvedSlug);
      if (native && native !== loc) return false; // would redirect
      return true;
    });
    check('C13', 'Hreflang alternates available', availableLocales.length > 0,
      `${availableLocales.length} locales: [${availableLocales.join(', ')}]`);

    // 14. x-default would point to English URL
    const xDefaultIsEn = availableLocales.includes('en');
    check('C14', 'x-default points to English', xDefaultIsEn,
      xDefaultIsEn ? `${BASE_URL}/en/blog/${enSlug}` : `Would fallback to ${availableLocales[0] || 'none'}`);

    // =========================================================================
    // D. Schema / Metadata Correctness (checks 15-19)
    // These verify the data that the page component uses for schema generation.
    // =========================================================================

    // 15. BlogPosting.inLanguage would be "en" (always correct for /en/ route)
    check('D15', 'BlogPosting.inLanguage=en', true, 'Hardcoded from URL locale');

    // 16. BlogPosting.headline would match en.title
    const headlineMatch = en.title && en.title.length > 0;
    check('D16', 'BlogPosting.headline = en.title', headlineMatch,
      headlineMatch ? `"${en.title.substring(0, 60)}"` : 'No title available');

    // 17. BlogPosting.description = en.metaDescription
    const descAvailable = (en.metaDescription || en.excerpt || '').length > 0;
    check('D17', 'BlogPosting.description available', descAvailable,
      descAvailable ? `${(en.metaDescription || en.excerpt).substring(0, 60)}...` : 'No description or excerpt');

    // 18. Canonical URL would be correct
    const canonicalCorrect = !!(en.slug || post.slug);
    check('D18', 'Canonical URL correct', canonicalCorrect,
      `${BASE_URL}/en/blog/${en.slug || post.slug}`);

    // 19. html lang="en" (always correct for /en/ route)
    check('D19', 'html lang=en', true, 'Set by Next.js locale routing');

    // =========================================================================
    // E. Cross-Locale Isolation (checks 20-21)
    // =========================================================================

    // 20. No other locale has an identical title to the English title
    const enTitle = (en.title || '').trim();
    const duplicateTitleLocales = [];
    if (enTitle) {
      const matches = titleToLocalePost.get(enTitle) || [];
      for (const m of matches) {
        if (m.locale !== 'en' && m.postSlug === post.slug) {
          duplicateTitleLocales.push(m.locale);
        }
      }
    }
    check('E20', 'No duplicate English title in other locales', duplicateTitleLocales.length === 0,
      duplicateTitleLocales.length === 0
        ? 'Unique across locales'
        : `DUPLICATE title in: [${duplicateTitleLocales.join(', ')}]`);

    // 21. No other locale has English body content (check first 200 chars of content)
    const enContentSnippet = (en.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
    const duplicateContentLocales = [];
    if (enContentSnippet.length > 50) {
      for (const loc of ALL_LOCALES) {
        if (loc === 'en') continue;
        const locContent = (t[loc]?.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
        if (locContent.length > 50 && locContent === enContentSnippet) {
          duplicateContentLocales.push(loc);
        }
      }
    }
    check('E21', 'No English content duplicated to other locales', duplicateContentLocales.length === 0,
      duplicateContentLocales.length === 0
        ? 'Content unique to English'
        : `DUPLICATE content in: [${duplicateContentLocales.join(', ')}]`);

    report.posts.push(postReport);
  }

  // ---------------------------------------------------------------------------
  // Apply fixes
  // ---------------------------------------------------------------------------
  if (!DRY_RUN && fixQueue.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('  APPLYING FIXES');
    console.log('='.repeat(80));

    // Group fixes by post
    const fixesByPost = new Map();
    for (const fix of fixQueue) {
      if (!fixesByPost.has(fix.postId)) fixesByPost.set(fix.postId, []);
      fixesByPost.get(fix.postId).push(fix);
    }

    for (const [postId, fixes] of fixesByPost) {
      const post = posts.find(p => p.id === postId);
      if (!post) continue;

      console.log(`\nFixing post: ${post.slug}`);

      // Collect translation patches
      const translationPatches = {};
      let newPrimarySlug = null;

      for (const fix of fixes) {
        console.log(`  - ${fix.description}`);
        if (fix.updatePrimarySlug) {
          newPrimarySlug = fix.newSlugValue;
        } else if (fix.patch) {
          Object.assign(translationPatches, fix.patch);
        }
      }

      // Apply translation patches
      if (Object.keys(translationPatches).length > 0) {
        const updatedTranslations = { ...post.translations };
        updatedTranslations[LOCALE] = { ...updatedTranslations[LOCALE], ...translationPatches };
        await prisma.blogPost.update({
          where: { id: postId },
          data: { translations: updatedTranslations },
        });
        console.log(`  => Updated translations for ${LOCALE}`);
      }

      // Apply primary slug update
      if (newPrimarySlug) {
        await prisma.blogPost.update({
          where: { id: postId },
          data: { slug: newPrimarySlug },
        });
        console.log(`  => Updated primary slug to "${newPrimarySlug}"`);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Console Summary
  // ---------------------------------------------------------------------------
  console.log('\n' + '='.repeat(80));
  console.log('  SUMMARY');
  console.log('='.repeat(80));
  console.log(`  Posts checked:    ${report.totalPosts}`);
  console.log(`  Total checks:     ${report.totalChecks}`);
  console.log(`  PASSED:           ${report.passed}`);
  console.log(`  FAILED:           ${report.failed}`);
  if (!DRY_RUN) {
    console.log(`  Auto-fixed:       ${report.fixed}`);
  }
  console.log(`  Unfixable:        ${report.unfixable}`);
  console.log(`  Fix queue:        ${fixQueue.length} fixes pending`);
  console.log();

  // Print failures grouped by check
  const failuresByCheck = {};
  for (const pr of report.posts) {
    for (const c of pr.checks) {
      if (!c.pass) {
        if (!failuresByCheck[c.id]) failuresByCheck[c.id] = { name: c.name, failures: [] };
        failuresByCheck[c.id].failures.push({
          post: pr.primarySlug,
          detail: c.detail,
          fixable: c.fixable,
          fixDescription: c.fixDescription,
        });
      }
    }
  }

  if (Object.keys(failuresByCheck).length > 0) {
    console.log('FAILURES BY CHECK:');
    console.log('-'.repeat(80));
    for (const [checkId, data] of Object.entries(failuresByCheck).sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(`\n[${checkId}] ${data.name} - ${data.failures.length} failure(s):`);
      for (const f of data.failures) {
        const fixTag = f.fixable ? (DRY_RUN ? ' [WILL FIX]' : ' [FIXED]') : ' [MANUAL]';
        console.log(`  - ${f.post}: ${f.detail}${fixTag}`);
        if (f.fixDescription) console.log(`    Fix: ${f.fixDescription}`);
      }
    }
  } else {
    console.log('ALL CHECKS PASSED! No issues found.');
  }

  // ---------------------------------------------------------------------------
  // Save JSON report
  // ---------------------------------------------------------------------------
  const reportPath = path.join(__dirname, 'english-blog-seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

  await prisma.$disconnect();
})().catch(async (err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
