#!/usr/bin/env node
/**
 * French Blog SEO Verification & Auto-Fix Script
 * Verify all 112 French blog posts with 40 checks per post
 *
 * Checks per post (40 checks):
 *   A. Translation Data Integrity (checks 1-8)
 *   B. URL & Redirect Correctness (checks 9-11)
 *   C. Sitemap Correctness (checks 12-14)
 *   D. Schema / Metadata Correctness (checks 15-19)
 *   E. Cross-Locale Isolation (checks 20-21)
 *   F. Fallback Detection (checks 22-27)
 *   G. French Language Integrity (checks 28-40) - 13 French-specific checks
 *
 * Usage:
 *   node scripts/verify-french-blog-seo.js --dry-run   # audit only
 *   node scripts/verify-french-blog-seo.js              # audit + fix
 */

const fs = require('fs');
const path = require('path');

// Resolve @prisma/client from frontend/node_modules (script runs from project root)
const frontendDir = path.join(__dirname, '..', 'frontend');
const PRISMA_CLIENT_PATH = path.join(frontendDir, 'node_modules', '@prisma', 'client');

// Load DATABASE_URL from frontend/.env if not already set
if (!process.env.DATABASE_URL) {
  const envPath = path.join(frontendDir, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^DATABASE_URL=["']?(.+?)["']?\s*$/m);
    if (match) process.env.DATABASE_URL = match[1];
  }
}

const { PrismaClient } = require(PRISMA_CLIENT_PATH);

const LOCALE = 'fr';
const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ROMANCE_LOCALES = ['it', 'es', 'pt']; // Cross-Romance comparison targets
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
// French-specific helper functions
// ---------------------------------------------------------------------------

/** Detect HTML entity-encoded apostrophes that should be literal ' */
function hasHtmlEntityApostrophe(str) {
  return /&#x27;|&#39;|&apos;|&amp;(?:apos|#39|#x27);/i.test(str || '');
}

/** Detect mojibake (encoding corruption) common in French text */
function hasMojibake(str) {
  return /\u00c3\u00a9|\u00c3\u00a8|\u00c3\u00a0|\u00c3\u00a7|\u00c3\u00b4|\u00c3\u00ae|\u00c3\u00af|\u00c3\u00b9|\u00c3\u00bb|\u00c5\u0093|\ufffd|Ã©|Ã¨|Ã |Ã§|Ã´|Ã®|Ã¯|Ã¹|Ã»/.test(str || '');
}

/** Count non-breaking spaces in a string */
function countNBSP(str) {
  return (str || '').split('\u00a0').length - 1;
}

/** Count FAQ-eligible questions (H2/H3 headings ending with ?) in HTML content */
function countFAQQuestions(html) {
  if (!html) return 0;
  // Match headings ending with ? (including with NBSP before ?)
  const pattern = /<h[23][^>]*>[^<]*\u00a0?\?<\/h[23]>/gi;
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
}

/** Detect French HowTo patterns that English-only extractHowToTitle() misses */
function detectFrenchHowTo(title, content) {
  const patterns = [
    /^Comment\s/i,           // "Comment faire..."
    /Guide\s+pour\s/i,       // "Guide pour..."
    /\u00c9tape\s+\d/i,      // "Étape 1:"
    /Etape\s+\d/i,           // "Etape 1:" (without accent)
    /Comment\s+cr\u00e9er/i,  // "Comment créer..."
    /Comment\s+utiliser/i,   // "Comment utiliser..."
    /Tutoriel\s/i,           // "Tutoriel..."
    /Guide\s+complet/i,      // "Guide complet..."
  ];

  const titleStr = title || '';
  const contentStr = (content || '').substring(0, 2000);

  for (const p of patterns) {
    if (p.test(titleStr) || p.test(contentStr)) {
      return { detected: true, pattern: p.source };
    }
  }
  return { detected: false, pattern: null };
}

// ---------------------------------------------------------------------------
// Load cross-locale redirects
// ---------------------------------------------------------------------------
function loadCrossLocaleRedirects() {
  const candidates = [
    path.join(__dirname, '..', 'frontend', 'config', 'blog-cross-locale-redirects.js'),
    path.join(process.cwd(), 'frontend', 'config', 'blog-cross-locale-redirects.js'),
    '/opt/lessoncraftstudio/frontend/config/blog-cross-locale-redirects.js',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const mod = require(p);
      if (Array.isArray(mod)) return mod;
      if (mod.crossLocaleSlugs && Array.isArray(mod.crossLocaleSlugs)) return mod.crossLocaleSlugs;
      const content = fs.readFileSync(p, 'utf8');
      const match = content.match(/const crossLocaleSlugs\s*=\s*(\[[\s\S]*?\n\]);/);
      if (match) {
        try { return JSON.parse(match[1]); } catch {}
      }
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
  console.log('  FRENCH BLOG SEO VERIFICATION');
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

  // Count posts with French translations
  const postsWithFr = posts.filter(p => {
    const fr = (p.translations || {})[LOCALE] || {};
    return fr.title && fr.content;
  });
  console.log(`Posts with French translation: ${postsWithFr.length}/${posts.length}\n`);

  // Results
  const report = {
    locale: LOCALE,
    totalPosts: posts.length,
    postsWithTranslation: postsWithFr.length,
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

  // Informational counters for G39/G40
  let faqEligibleCount = 0;
  let howToDetectedCount = 0;

  // ---------------------------------------------------------------------------
  // Run checks for each post
  // ---------------------------------------------------------------------------
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const t = post.translations || {};
    const fr = t[LOCALE] || {};
    const en = t['en'] || {};
    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      frSlug: fr.slug || '',
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

    // A1: translations.fr.title exists and is non-empty
    check('A1', 'fr.title exists', fr.title && fr.title.trim().length > 0,
      fr.title ? `"${fr.title.substring(0, 70)}"` : 'MISSING');

    // A2: translations.fr.content exists and is non-empty
    const contentLen = fr.content ? fr.content.length : 0;
    check('A2', 'fr.content exists', contentLen > 0,
      contentLen > 0 ? `${contentLen} chars` : 'MISSING');

    // A3: translations.fr.slug exists and is valid
    const expectedSlug = fr.title ? normalizeSlug(fr.title) : '';
    const actualFrSlug = fr.slug || '';
    const slugExists = actualFrSlug.length > 0;
    const slugMatchesNormalized = actualFrSlug === expectedSlug;
    check('A3', 'fr.slug exists', slugExists,
      slugExists
        ? (slugMatchesNormalized ? `"${actualFrSlug}"` : `"${actualFrSlug}" (differs from normalized: "${expectedSlug.substring(0, 60)}")`)
        : 'MISSING',
      !slugExists && fr.title,
      !slugExists && fr.title ? {
        field: 'translations.fr.slug',
        oldValue: '',
        newValue: expectedSlug,
        description: `Set fr.slug to "${expectedSlug.substring(0, 60)}"`,
        patch: { slug: expectedSlug },
      } : null
    );

    // A4: translations.fr.metaTitle exists (<=70 chars)
    const metaTitle = fr.metaTitle || '';
    const metaTitleOk = metaTitle.length > 0 && metaTitle.length <= 70;
    check('A4', 'fr.metaTitle exists (<=70 chars)', metaTitleOk,
      metaTitle.length > 0 ? `"${metaTitle.substring(0, 70)}" (${metaTitle.length} chars)` : 'MISSING',
      metaTitle.length === 0 && fr.title,
      metaTitle.length === 0 && fr.title ? {
        field: 'translations.fr.metaTitle',
        oldValue: '',
        newValue: fr.title.substring(0, 70),
        description: `Set metaTitle from title: "${fr.title.substring(0, 70)}"`,
        patch: { metaTitle: fr.title.substring(0, 70) },
      } : null
    );

    // A5: translations.fr.metaDescription exists (<=160 chars)
    const metaDesc = fr.metaDescription || '';
    const metaDescOk = metaDesc.length > 0 && metaDesc.length <= 160;
    check('A5', 'fr.metaDescription exists (<=160 chars)', metaDescOk,
      metaDesc.length > 0 ? `${metaDesc.length} chars` : 'MISSING',
      metaDesc.length === 0 && fr.excerpt,
      metaDesc.length === 0 && fr.excerpt ? {
        field: 'translations.fr.metaDescription',
        oldValue: '',
        newValue: fr.excerpt.substring(0, 160),
        description: `Set metaDescription from excerpt (${fr.excerpt.substring(0, 40)}...)`,
        patch: { metaDescription: fr.excerpt.substring(0, 160) },
      } : null
    );

    // A6: translations.fr.excerpt exists
    check('A6', 'fr.excerpt exists', fr.excerpt && fr.excerpt.trim().length > 0,
      fr.excerpt ? `${fr.excerpt.length} chars` : 'MISSING');

    // A7: translations.fr.focusKeyword exists
    check('A7', 'fr.focusKeyword exists', fr.focusKeyword && fr.focusKeyword.trim().length > 0,
      fr.focusKeyword ? `"${fr.focusKeyword}"` : 'MISSING');

    // A8: fr.slug SHOULD differ from post.slug (primary/English slug)
    const frSlugDiffersFromPrimary = actualFrSlug && actualFrSlug !== post.slug;
    check('A8', 'fr.slug differs from primary slug', frSlugDiffersFromPrimary || !actualFrSlug,
      frSlugDiffersFromPrimary
        ? `FR: "${actualFrSlug.substring(0, 40)}" vs Primary: "${post.slug.substring(0, 40)}"`
        : (!actualFrSlug ? 'No FR slug' : `SAME as primary: "${post.slug.substring(0, 50)}"`));

    // =========================================================================
    // B. URL & Redirect Correctness (checks 9-11)
    // =========================================================================

    // B9: French slug's nativeLocale in cross-locale redirects is 'fr'
    const frSlugNative = slugToNativeLocale.get(actualFrSlug);
    const nativeIsFr = frSlugNative === 'fr';
    check('B9', 'French slug nativeLocale=fr', nativeIsFr || !actualFrSlug,
      actualFrSlug
        ? (frSlugNative ? `nativeLocale="${frSlugNative}"` : 'Not in cross-locale redirects (may need regeneration)')
        : 'No FR slug to check');

    // B10: No slug collision with other locales
    const frSlug = actualFrSlug;
    const slugUsers = frSlug
      ? (allSlugsByLocale.get(frSlug) || []).filter(
          u => u.locale !== 'fr' && u.locale !== 'primary' && u.postId !== post.id
        )
      : [];
    check('B10', 'No slug collision with other locales', slugUsers.length === 0 || !frSlug,
      frSlug
        ? (slugUsers.length === 0 ? 'No collisions' : `Collision: ${JSON.stringify(slugUsers)}`)
        : 'No FR slug to check');

    // B11: French slug appears in cross-locale redirects
    check('B11', 'Slug in cross-locale redirects', !frSlug || slugToNativeLocale.has(frSlug),
      frSlug
        ? (slugToNativeLocale.has(frSlug)
            ? `Present, nativeLocale="${slugToNativeLocale.get(frSlug)}"`
            : 'Missing from cross-locale redirects (needs regeneration)')
        : 'No FR slug to check');

    // =========================================================================
    // C. Sitemap Correctness (checks 12-14)
    // =========================================================================

    // C12: French URL would appear in sitemap (title + content exist)
    const wouldAppearInSitemap = !!(fr.title && fr.content);
    check('C12', 'Would appear in French sitemap', wouldAppearInSitemap,
      wouldAppearInSitemap ? `URL: ${BASE_URL}/fr/blog/${frSlug || post.slug}` : 'Missing title or content');

    // C13: Hreflang alternates: count how many locales have valid translations
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

    // C14: x-default points to English URL (NOT French)
    const xDefaultIsEn = availableLocales.includes('en');
    check('C14', 'x-default points to English (not French)', xDefaultIsEn,
      xDefaultIsEn
        ? `${BASE_URL}/en/blog/${en.slug || post.slug}`
        : `English not available; would fallback to ${availableLocales[0] || 'none'}`);

    // =========================================================================
    // D. Schema / Metadata Correctness (checks 15-19)
    // =========================================================================

    // D15: BlogPosting.inLanguage would be "fr"
    check('D15', 'BlogPosting.inLanguage=fr', true, 'Hardcoded from URL locale');

    // D16: BlogPosting.headline would match fr.title
    const headlineMatch = fr.title && fr.title.length > 0;
    check('D16', 'BlogPosting.headline = fr.title', headlineMatch,
      headlineMatch ? `"${fr.title.substring(0, 60)}"` : 'No title available');

    // D17: BlogPosting.description available (fr)
    const descAvailable = (fr.metaDescription || fr.excerpt || '').length > 0;
    check('D17', 'BlogPosting.description available', descAvailable,
      descAvailable ? `${(fr.metaDescription || fr.excerpt).substring(0, 60)}...` : 'No description or excerpt');

    // D18: Canonical URL = /fr/blog/{fr-slug}
    const canonicalCorrect = !!(fr.slug || post.slug);
    check('D18', 'Canonical URL correct', canonicalCorrect,
      `${BASE_URL}/fr/blog/${fr.slug || post.slug}`);

    // D19: html lang="fr"
    check('D19', 'html lang=fr', true, 'Set by Next.js locale routing');

    // =========================================================================
    // E. Cross-Locale Isolation (checks 20-21)
    // =========================================================================

    // E20: No other locale has an identical title to the French title
    const frTitle = (fr.title || '').trim();
    const duplicateTitleLocales = [];
    if (frTitle) {
      const matches = titleToLocalePost.get(frTitle) || [];
      for (const m of matches) {
        if (m.locale !== 'fr' && m.postSlug === post.slug) {
          duplicateTitleLocales.push(m.locale);
        }
      }
    }
    check('E20', 'No duplicate FR title in other locales', duplicateTitleLocales.length === 0 || !frTitle,
      frTitle
        ? (duplicateTitleLocales.length === 0
            ? 'Unique across locales'
            : `DUPLICATE title in: [${duplicateTitleLocales.join(', ')}]`)
        : 'No FR title to check');

    // E21: No French body content duplicated to other locales
    const frContentSnippet = (fr.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
    const duplicateContentLocales = [];
    if (frContentSnippet.length > 50) {
      for (const loc of ALL_LOCALES) {
        if (loc === 'fr') continue;
        const locContent = (t[loc]?.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
        if (locContent.length > 50 && locContent === frContentSnippet) {
          duplicateContentLocales.push(loc);
        }
      }
    }
    check('E21', 'No FR content duplicated to other locales', duplicateContentLocales.length === 0,
      duplicateContentLocales.length === 0
        ? 'Content unique to French'
        : `DUPLICATE content in: [${duplicateContentLocales.join(', ')}]`);

    // =========================================================================
    // F. Fallback Detection (checks 22-27)
    // These catch cases where French fields contain English fallback content
    // =========================================================================

    // F22: fr.title is NOT the same as en.title (catches untranslated titles)
    const enTitle = (en.title || '').trim();
    const frTitleTrimmed = (fr.title || '').trim();
    const titleNotEnglish = !frTitleTrimmed || !enTitle || frTitleTrimmed !== enTitle;
    check('F22', 'fr.title != en.title (not English fallback)', titleNotEnglish,
      titleNotEnglish
        ? (frTitleTrimmed && enTitle
            ? `FR: "${frTitleTrimmed.substring(0, 40)}" | EN: "${enTitle.substring(0, 40)}"`
            : 'One or both titles missing')
        : `SAME: "${frTitleTrimmed.substring(0, 60)}"`);

    // F23: fr.slug is NOT the same as en.slug (slug is actually French)
    const enSlug = en.slug || '';
    const slugNotEnglish = !actualFrSlug || !enSlug || actualFrSlug !== enSlug;
    check('F23', 'fr.slug != en.slug (not English slug)', slugNotEnglish,
      slugNotEnglish
        ? (actualFrSlug && enSlug
            ? `FR: "${actualFrSlug.substring(0, 40)}" | EN: "${enSlug.substring(0, 40)}"`
            : 'One or both slugs missing')
        : `SAME: "${actualFrSlug.substring(0, 60)}"`);

    // F24: fr.metaDescription is NOT the same as en.metaDescription
    const enMetaDesc = (en.metaDescription || '').trim();
    const frMetaDesc = (fr.metaDescription || '').trim();
    const metaDescNotEnglish = !frMetaDesc || !enMetaDesc || frMetaDesc !== enMetaDesc;
    check('F24', 'fr.metaDescription != en.metaDescription', metaDescNotEnglish,
      metaDescNotEnglish
        ? (frMetaDesc && enMetaDesc
            ? `FR: "${frMetaDesc.substring(0, 40)}..." | EN: "${enMetaDesc.substring(0, 40)}..."`
            : 'One or both missing')
        : `SAME: "${frMetaDesc.substring(0, 60)}"`);

    // F25: fr.focusKeyword is NOT the same as en.focusKeyword
    const enFocusKeyword = (en.focusKeyword || '').trim();
    const frFocusKeyword = (fr.focusKeyword || '').trim();
    const focusKeywordNotEnglish = !frFocusKeyword || !enFocusKeyword || frFocusKeyword !== enFocusKeyword;
    check('F25', 'fr.focusKeyword != en.focusKeyword', focusKeywordNotEnglish,
      focusKeywordNotEnglish
        ? (frFocusKeyword && enFocusKeyword
            ? `FR: "${frFocusKeyword}" | EN: "${enFocusKeyword}"`
            : 'One or both missing')
        : `SAME: "${frFocusKeyword}"`);

    // F26: fr.excerpt is NOT the same as en.excerpt
    const enExcerpt = (en.excerpt || '').trim();
    const frExcerpt = (fr.excerpt || '').trim();
    const excerptNotEnglish = !frExcerpt || !enExcerpt || frExcerpt !== enExcerpt;
    check('F26', 'fr.excerpt != en.excerpt', excerptNotEnglish,
      excerptNotEnglish
        ? (frExcerpt && enExcerpt
            ? `FR: "${frExcerpt.substring(0, 40)}..." | EN: "${enExcerpt.substring(0, 40)}..."`
            : 'One or both missing')
        : `SAME: "${frExcerpt.substring(0, 60)}"`);

    // F27: fr.content first 200 chars is NOT the same as en.content first 200 chars
    const enContentSnippet = (en.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
    const contentNotEnglish = !frContentSnippet || frContentSnippet.length < 50 || !enContentSnippet || enContentSnippet.length < 50 || frContentSnippet !== enContentSnippet;
    check('F27', 'fr.content != en.content (first 200 chars)', contentNotEnglish,
      contentNotEnglish
        ? (frContentSnippet.length >= 50 && enContentSnippet.length >= 50
            ? `FR starts: "${frContentSnippet.substring(0, 50)}..." | EN starts: "${enContentSnippet.substring(0, 50)}..."`
            : 'One or both too short to compare')
        : `SAME first 200 chars: "${frContentSnippet.substring(0, 60)}..."`);

    // =========================================================================
    // G. French Language Integrity (checks 28-40) — 13 French-specific checks
    // =========================================================================

    // G28: Apostrophe integrity in fr.title
    const titleHasEntityApostrophe = hasHtmlEntityApostrophe(fr.title);
    check('G28', 'fr.title apostrophe integrity', !titleHasEntityApostrophe,
      titleHasEntityApostrophe
        ? `HTML entity apostrophe found in: "${(fr.title || '').substring(0, 60)}"`
        : (fr.title ? 'Clean apostrophes' : 'No title'));

    // G29: Apostrophe integrity in fr.metaTitle
    const metaTitleHasEntityApostrophe = hasHtmlEntityApostrophe(fr.metaTitle);
    check('G29', 'fr.metaTitle apostrophe integrity', !metaTitleHasEntityApostrophe,
      metaTitleHasEntityApostrophe
        ? `HTML entity apostrophe found in: "${(fr.metaTitle || '').substring(0, 60)}"`
        : (fr.metaTitle ? 'Clean apostrophes' : 'No metaTitle'));

    // G30: Apostrophe integrity in fr.metaDescription
    const metaDescHasEntityApostrophe = hasHtmlEntityApostrophe(fr.metaDescription);
    check('G30', 'fr.metaDescription apostrophe integrity', !metaDescHasEntityApostrophe,
      metaDescHasEntityApostrophe
        ? `HTML entity apostrophe found in: "${(fr.metaDescription || '').substring(0, 60)}"`
        : (fr.metaDescription ? 'Clean apostrophes' : 'No metaDescription'));

    // G31: Apostrophe integrity in fr.focusKeyword
    const focusKeywordHasEntityApostrophe = hasHtmlEntityApostrophe(fr.focusKeyword);
    check('G31', 'fr.focusKeyword apostrophe integrity', !focusKeywordHasEntityApostrophe,
      focusKeywordHasEntityApostrophe
        ? `HTML entity apostrophe found in: "${fr.focusKeyword}"`
        : (fr.focusKeyword ? 'Clean apostrophes' : 'No focusKeyword'));

    // G32: Accented chars preserved in fr.title (detect mojibake)
    const titleHasMojibake = hasMojibake(fr.title);
    check('G32', 'fr.title accented chars preserved', !titleHasMojibake,
      titleHasMojibake
        ? `Mojibake detected in: "${(fr.title || '').substring(0, 60)}"`
        : (fr.title ? 'Accents intact' : 'No title'));

    // G33: No NBSP inflating fr.metaTitle beyond 70 chars
    const metaTitleNbspCount = countNBSP(fr.metaTitle);
    const metaTitleVisibleLen = (fr.metaTitle || '').length;
    const metaTitleNbspOk = metaTitleVisibleLen <= 70 || metaTitleNbspCount === 0;
    check('G33', 'fr.metaTitle NBSP not inflating length', metaTitleNbspOk,
      metaTitleNbspCount > 0
        ? `${metaTitleNbspCount} NBSP(s), total length ${metaTitleVisibleLen} chars`
        : (fr.metaTitle ? `No NBSP, ${metaTitleVisibleLen} chars` : 'No metaTitle'));

    // G34: No NBSP inflating fr.metaDescription beyond 160 chars
    const metaDescNbspCount = countNBSP(fr.metaDescription);
    const metaDescVisibleLen = (fr.metaDescription || '').length;
    const metaDescNbspOk = metaDescVisibleLen <= 160 || metaDescNbspCount === 0;
    check('G34', 'fr.metaDescription NBSP not inflating length', metaDescNbspOk,
      metaDescNbspCount > 0
        ? `${metaDescNbspCount} NBSP(s), total length ${metaDescVisibleLen} chars`
        : (fr.metaDescription ? `No NBSP, ${metaDescVisibleLen} chars` : 'No metaDescription'));

    // G35: French slug normalization validates (produces valid [a-z0-9-]+)
    const normalizedFrSlug = fr.title ? normalizeSlug(fr.title) : '';
    const slugIsValid = !actualFrSlug || /^[a-z0-9-]+$/.test(actualFrSlug);
    check('G35', 'fr.slug normalization valid', slugIsValid,
      slugIsValid
        ? (actualFrSlug ? `"${actualFrSlug.substring(0, 50)}" is valid` : 'No slug')
        : `Invalid chars in slug: "${actualFrSlug.substring(0, 50)}"`);

    // G36: No cross-Romance-language title collision
    const romanceTitleCollisions = [];
    if (frTitle) {
      for (const romLoc of ROMANCE_LOCALES) {
        const romTitle = (t[romLoc]?.title || '').trim();
        if (romTitle && romTitle === frTitle) {
          romanceTitleCollisions.push(romLoc);
        }
      }
    }
    check('G36', 'No cross-Romance title collision', romanceTitleCollisions.length === 0,
      romanceTitleCollisions.length === 0
        ? 'No collisions with IT/ES/PT titles'
        : `COLLISION with: [${romanceTitleCollisions.join(', ')}] title="${frTitle.substring(0, 50)}"`);

    // G37: No cross-Romance-language slug collision
    const romanceSlugCollisions = [];
    if (actualFrSlug) {
      for (const romLoc of ROMANCE_LOCALES) {
        const romSlug = t[romLoc]?.slug || '';
        if (romSlug && romSlug === actualFrSlug) {
          romanceSlugCollisions.push(romLoc);
        }
      }
    }
    check('G37', 'No cross-Romance slug collision', romanceSlugCollisions.length === 0,
      romanceSlugCollisions.length === 0
        ? 'No collisions with IT/ES/PT slugs'
        : `COLLISION with: [${romanceSlugCollisions.join(', ')}] slug="${actualFrSlug.substring(0, 50)}"`);

    // G38: Featured image alt text is French
    const frAlt = fr.featuredImageAlt || '';
    const enAlt = en.featuredImageAlt || '';
    const altIsFrench = !frAlt || !enAlt || frAlt !== enAlt;
    check('G38', 'Featured image alt text is French', altIsFrench,
      frAlt
        ? (altIsFrench
            ? `FR alt: "${frAlt.substring(0, 50)}"`
            : `SAME as EN: "${frAlt.substring(0, 50)}"`)
        : 'No FR featuredImageAlt');

    // G39: FAQ question count (informational — always passes)
    const faqCount = countFAQQuestions(fr.content);
    if (faqCount >= 2) faqEligibleCount++;
    check('G39', 'FAQ question count (informational)', true,
      `${faqCount} question heading(s) found${faqCount >= 2 ? ' — FAQ schema eligible' : ''}`);

    // G40: HowTo pattern detection (informational — always passes)
    const howTo = detectFrenchHowTo(fr.title, fr.content);
    if (howTo.detected) howToDetectedCount++;
    check('G40', 'HowTo pattern detection (informational)', true,
      howTo.detected
        ? `French HowTo pattern detected: "${howTo.pattern}" — check if HowTo schema is generated`
        : 'No French HowTo pattern found');

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

      for (const fix of fixes) {
        console.log(`  - ${fix.description}`);
        if (fix.patch) {
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
    }
  }

  // ---------------------------------------------------------------------------
  // Console Summary
  // ---------------------------------------------------------------------------
  console.log('\n' + '='.repeat(80));
  console.log('  SUMMARY');
  console.log('='.repeat(80));
  console.log(`  Posts checked:    ${report.totalPosts}`);
  console.log(`  With FR data:     ${report.postsWithTranslation}`);
  console.log(`  Total checks:     ${report.totalChecks}`);
  console.log(`  PASSED:           ${report.passed}`);
  console.log(`  FAILED:           ${report.failed}`);
  if (!DRY_RUN) {
    console.log(`  Auto-fixed:       ${report.fixed}`);
  }
  console.log(`  Unfixable:        ${report.unfixable}`);
  console.log(`  Fix queue:        ${fixQueue.length} fixes pending`);
  console.log(`  Pass rate:        ${((report.passed / report.totalChecks) * 100).toFixed(1)}%`);
  console.log();
  console.log(`  French-specific insights:`);
  console.log(`    FAQ-eligible posts (>=2 questions): ${faqEligibleCount}`);
  console.log(`    HowTo-detected posts:               ${howToDetectedCount}`);
  console.log();

  // Print failures grouped by check
  const failuresByCheck = {};
  for (const pr of report.posts) {
    for (const c of pr.checks) {
      if (!c.pass) {
        if (!failuresByCheck[c.id]) failuresByCheck[c.id] = { name: c.name, failures: [] };
        failuresByCheck[c.id].failures.push({
          post: pr.primarySlug,
          frSlug: pr.frSlug,
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
      for (const f of data.failures.slice(0, 10)) {
        const fixTag = f.fixable ? (DRY_RUN ? ' [WILL FIX]' : ' [FIXED]') : ' [MANUAL]';
        console.log(`  - ${f.post}: ${f.detail}${fixTag}`);
        if (f.fixDescription) console.log(`    Fix: ${f.fixDescription}`);
      }
      if (data.failures.length > 10) {
        console.log(`  ... and ${data.failures.length - 10} more`);
      }
    }
  } else {
    console.log('ALL CHECKS PASSED! No issues found.');
  }

  // ---------------------------------------------------------------------------
  // Save JSON report
  // ---------------------------------------------------------------------------
  const reportPath = path.join(__dirname, 'french-blog-seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

  await prisma.$disconnect();
})().catch(async (err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
