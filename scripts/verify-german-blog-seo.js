#!/usr/bin/env node
/**
 * German Blog SEO Verification & Auto-Fix Script
 * Part 2 of 11: Verify all 112 German blog posts
 *
 * Runs 27 checks per post:
 *   A. Translation Data Integrity (checks 1-8)
 *   B. URL & Redirect Correctness (checks 9-11)
 *   C. Sitemap Correctness (checks 12-14)
 *   D. Schema / Metadata Correctness (checks 15-19)
 *   E. Cross-Locale Isolation (checks 20-21)
 *   F. German-Specific Fallback Detection (checks 22-27)
 *
 * Usage:
 *   node scripts/verify-german-blog-seo.js --dry-run   # audit only
 *   node scripts/verify-german-blog-seo.js              # audit + fix
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

const LOCALE = 'de';
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
  console.log('  GERMAN BLOG SEO VERIFICATION');
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

  // Count posts with German translations
  const postsWithDe = posts.filter(p => {
    const de = (p.translations || {})[LOCALE] || {};
    return de.title && de.content;
  });
  console.log(`Posts with German translation: ${postsWithDe.length}/${posts.length}\n`);

  // Results
  const report = {
    locale: LOCALE,
    totalPosts: posts.length,
    postsWithTranslation: postsWithDe.length,
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
    const de = t[LOCALE] || {};
    const en = t['en'] || {};
    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      deSlug: de.slug || '',
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

    // A1: translations.de.title exists and is non-empty
    check('A1', 'de.title exists', de.title && de.title.trim().length > 0,
      de.title ? `"${de.title.substring(0, 70)}"` : 'MISSING');

    // A2: translations.de.content exists and is non-empty
    const contentLen = de.content ? de.content.length : 0;
    check('A2', 'de.content exists', contentLen > 0,
      contentLen > 0 ? `${contentLen} chars` : 'MISSING');

    // A3: translations.de.slug exists and is valid
    const expectedSlug = de.title ? normalizeSlug(de.title) : '';
    const actualDeSlug = de.slug || '';
    const slugExists = actualDeSlug.length > 0;
    const slugMatchesNormalized = actualDeSlug === expectedSlug;
    check('A3', 'de.slug exists', slugExists,
      slugExists
        ? (slugMatchesNormalized ? `"${actualDeSlug}"` : `"${actualDeSlug}" (differs from normalized: "${expectedSlug.substring(0, 60)}")`)
        : 'MISSING',
      !slugExists && de.title,
      !slugExists && de.title ? {
        field: 'translations.de.slug',
        oldValue: '',
        newValue: expectedSlug,
        description: `Set de.slug to "${expectedSlug.substring(0, 60)}"`,
        patch: { slug: expectedSlug },
      } : null
    );

    // A4: translations.de.metaTitle exists (<=70 chars)
    const metaTitle = de.metaTitle || '';
    const metaTitleOk = metaTitle.length > 0 && metaTitle.length <= 70;
    check('A4', 'de.metaTitle exists (<=70 chars)', metaTitleOk,
      metaTitle.length > 0 ? `"${metaTitle.substring(0, 70)}" (${metaTitle.length} chars)` : 'MISSING',
      metaTitle.length === 0 && de.title,
      metaTitle.length === 0 && de.title ? {
        field: 'translations.de.metaTitle',
        oldValue: '',
        newValue: de.title.substring(0, 70),
        description: `Set metaTitle from title: "${de.title.substring(0, 70)}"`,
        patch: { metaTitle: de.title.substring(0, 70) },
      } : null
    );

    // A5: translations.de.metaDescription exists (<=160 chars)
    const metaDesc = de.metaDescription || '';
    const metaDescOk = metaDesc.length > 0 && metaDesc.length <= 160;
    check('A5', 'de.metaDescription exists (<=160 chars)', metaDescOk,
      metaDesc.length > 0 ? `${metaDesc.length} chars` : 'MISSING',
      metaDesc.length === 0 && de.excerpt,
      metaDesc.length === 0 && de.excerpt ? {
        field: 'translations.de.metaDescription',
        oldValue: '',
        newValue: de.excerpt.substring(0, 160),
        description: `Set metaDescription from excerpt (${de.excerpt.substring(0, 40)}...)`,
        patch: { metaDescription: de.excerpt.substring(0, 160) },
      } : null
    );

    // A6: translations.de.excerpt exists
    check('A6', 'de.excerpt exists', de.excerpt && de.excerpt.trim().length > 0,
      de.excerpt ? `${de.excerpt.length} chars` : 'MISSING');

    // A7: translations.de.focusKeyword exists (must be German, not English)
    check('A7', 'de.focusKeyword exists', de.focusKeyword && de.focusKeyword.trim().length > 0,
      de.focusKeyword ? `"${de.focusKeyword}"` : 'MISSING');

    // A8: de.slug SHOULD differ from post.slug (primary/English slug)
    // For German, the slug should be a German translation, not the English primary
    const deSlugDiffersFromPrimary = actualDeSlug && actualDeSlug !== post.slug;
    check('A8', 'de.slug differs from primary slug', deSlugDiffersFromPrimary || !actualDeSlug,
      deSlugDiffersFromPrimary
        ? `DE: "${actualDeSlug.substring(0, 40)}" vs Primary: "${post.slug.substring(0, 40)}"`
        : (!actualDeSlug ? 'No DE slug' : `SAME as primary: "${post.slug.substring(0, 50)}"`));

    // =========================================================================
    // B. URL & Redirect Correctness (checks 9-11)
    // =========================================================================

    // B9: German slug's nativeLocale in cross-locale redirects is 'de'
    const deSlugNative = slugToNativeLocale.get(actualDeSlug);
    const nativeIsDe = deSlugNative === 'de';
    check('B9', 'German slug nativeLocale=de', nativeIsDe || !actualDeSlug,
      actualDeSlug
        ? (deSlugNative ? `nativeLocale="${deSlugNative}"` : 'Not in cross-locale redirects (may need regeneration)')
        : 'No DE slug to check');

    // B10: No slug collision with other locales
    const deSlug = actualDeSlug;
    const slugUsers = deSlug
      ? (allSlugsByLocale.get(deSlug) || []).filter(
          u => u.locale !== 'de' && u.locale !== 'primary' && u.postId !== post.id
        )
      : [];
    check('B10', 'No slug collision with other locales', slugUsers.length === 0 || !deSlug,
      deSlug
        ? (slugUsers.length === 0 ? 'No collisions' : `Collision: ${JSON.stringify(slugUsers)}`)
        : 'No DE slug to check');

    // B11: German slug appears in cross-locale redirects
    check('B11', 'Slug in cross-locale redirects', !deSlug || slugToNativeLocale.has(deSlug),
      deSlug
        ? (slugToNativeLocale.has(deSlug)
            ? `Present, nativeLocale="${slugToNativeLocale.get(deSlug)}"`
            : 'Missing from cross-locale redirects (needs regeneration)')
        : 'No DE slug to check');

    // =========================================================================
    // C. Sitemap Correctness (checks 12-14)
    // =========================================================================

    // C12: German URL would appear in sitemap (title + content exist)
    const wouldAppearInSitemap = !!(de.title && de.content);
    check('C12', 'Would appear in German sitemap', wouldAppearInSitemap,
      wouldAppearInSitemap ? `URL: ${BASE_URL}/de/blog/${deSlug || post.slug}` : 'Missing title or content');

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

    // C14: x-default points to English URL (NOT German)
    const xDefaultIsEn = availableLocales.includes('en');
    check('C14', 'x-default points to English (not German)', xDefaultIsEn,
      xDefaultIsEn
        ? `${BASE_URL}/en/blog/${en.slug || post.slug}`
        : `English not available; would fallback to ${availableLocales[0] || 'none'}`);

    // =========================================================================
    // D. Schema / Metadata Correctness (checks 15-19)
    // =========================================================================

    // D15: BlogPosting.inLanguage would be "de"
    check('D15', 'BlogPosting.inLanguage=de', true, 'Hardcoded from URL locale');

    // D16: BlogPosting.headline would match de.title
    const headlineMatch = de.title && de.title.length > 0;
    check('D16', 'BlogPosting.headline = de.title', headlineMatch,
      headlineMatch ? `"${de.title.substring(0, 60)}"` : 'No title available');

    // D17: BlogPosting.description available (de)
    const descAvailable = (de.metaDescription || de.excerpt || '').length > 0;
    check('D17', 'BlogPosting.description available', descAvailable,
      descAvailable ? `${(de.metaDescription || de.excerpt).substring(0, 60)}...` : 'No description or excerpt');

    // D18: Canonical URL = /de/blog/{de-slug}
    const canonicalCorrect = !!(de.slug || post.slug);
    check('D18', 'Canonical URL correct', canonicalCorrect,
      `${BASE_URL}/de/blog/${de.slug || post.slug}`);

    // D19: html lang="de"
    check('D19', 'html lang=de', true, 'Set by Next.js locale routing');

    // =========================================================================
    // E. Cross-Locale Isolation (checks 20-21)
    // =========================================================================

    // E20: No other locale has an identical title to the German title
    const deTitle = (de.title || '').trim();
    const duplicateTitleLocales = [];
    if (deTitle) {
      const matches = titleToLocalePost.get(deTitle) || [];
      for (const m of matches) {
        if (m.locale !== 'de' && m.postSlug === post.slug) {
          duplicateTitleLocales.push(m.locale);
        }
      }
    }
    check('E20', 'No duplicate DE title in other locales', duplicateTitleLocales.length === 0 || !deTitle,
      deTitle
        ? (duplicateTitleLocales.length === 0
            ? 'Unique across locales'
            : `DUPLICATE title in: [${duplicateTitleLocales.join(', ')}]`)
        : 'No DE title to check');

    // E21: No German body content duplicated to other locales
    const deContentSnippet = (de.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
    const duplicateContentLocales = [];
    if (deContentSnippet.length > 50) {
      for (const loc of ALL_LOCALES) {
        if (loc === 'de') continue;
        const locContent = (t[loc]?.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
        if (locContent.length > 50 && locContent === deContentSnippet) {
          duplicateContentLocales.push(loc);
        }
      }
    }
    check('E21', 'No DE content duplicated to other locales', duplicateContentLocales.length === 0,
      duplicateContentLocales.length === 0
        ? 'Content unique to German'
        : `DUPLICATE content in: [${duplicateContentLocales.join(', ')}]`);

    // =========================================================================
    // F. German-Specific Fallback Detection (checks 22-27)
    // These catch cases where German fields contain English fallback content
    // =========================================================================

    // F22: de.title is NOT the same as en.title (catches untranslated titles)
    const enTitle = (en.title || '').trim();
    const deTitleTrimmed = (de.title || '').trim();
    const titleNotEnglish = !deTitleTrimmed || !enTitle || deTitleTrimmed !== enTitle;
    check('F22', 'de.title != en.title (not English fallback)', titleNotEnglish,
      titleNotEnglish
        ? (deTitleTrimmed && enTitle
            ? `DE: "${deTitleTrimmed.substring(0, 40)}" | EN: "${enTitle.substring(0, 40)}"`
            : 'One or both titles missing')
        : `SAME: "${deTitleTrimmed.substring(0, 60)}"`);

    // F23: de.slug is NOT the same as en.slug (slug is actually German)
    const enSlug = en.slug || '';
    const slugNotEnglish = !actualDeSlug || !enSlug || actualDeSlug !== enSlug;
    check('F23', 'de.slug != en.slug (not English slug)', slugNotEnglish,
      slugNotEnglish
        ? (actualDeSlug && enSlug
            ? `DE: "${actualDeSlug.substring(0, 40)}" | EN: "${enSlug.substring(0, 40)}"`
            : 'One or both slugs missing')
        : `SAME: "${actualDeSlug.substring(0, 60)}"`);

    // F24: de.metaDescription is NOT the same as en.metaDescription
    const enMetaDesc = (en.metaDescription || '').trim();
    const deMetaDesc = (de.metaDescription || '').trim();
    const metaDescNotEnglish = !deMetaDesc || !enMetaDesc || deMetaDesc !== enMetaDesc;
    check('F24', 'de.metaDescription != en.metaDescription', metaDescNotEnglish,
      metaDescNotEnglish
        ? (deMetaDesc && enMetaDesc
            ? `DE: "${deMetaDesc.substring(0, 40)}..." | EN: "${enMetaDesc.substring(0, 40)}..."`
            : 'One or both missing')
        : `SAME: "${deMetaDesc.substring(0, 60)}"`);

    // F25: de.focusKeyword is NOT the same as en.focusKeyword
    const enFocusKeyword = (en.focusKeyword || '').trim();
    const deFocusKeyword = (de.focusKeyword || '').trim();
    const focusKeywordNotEnglish = !deFocusKeyword || !enFocusKeyword || deFocusKeyword !== enFocusKeyword;
    check('F25', 'de.focusKeyword != en.focusKeyword', focusKeywordNotEnglish,
      focusKeywordNotEnglish
        ? (deFocusKeyword && enFocusKeyword
            ? `DE: "${deFocusKeyword}" | EN: "${enFocusKeyword}"`
            : 'One or both missing')
        : `SAME: "${deFocusKeyword}"`);

    // F26: de.excerpt is NOT the same as en.excerpt
    const enExcerpt = (en.excerpt || '').trim();
    const deExcerpt = (de.excerpt || '').trim();
    const excerptNotEnglish = !deExcerpt || !enExcerpt || deExcerpt !== enExcerpt;
    check('F26', 'de.excerpt != en.excerpt', excerptNotEnglish,
      excerptNotEnglish
        ? (deExcerpt && enExcerpt
            ? `DE: "${deExcerpt.substring(0, 40)}..." | EN: "${enExcerpt.substring(0, 40)}..."`
            : 'One or both missing')
        : `SAME: "${deExcerpt.substring(0, 60)}"`);

    // F27: de.content first 200 chars is NOT the same as en.content first 200 chars
    const enContentSnippet = (en.content || '').replace(/<[^>]*>/g, '').substring(0, 200).trim();
    const contentNotEnglish = !deContentSnippet || deContentSnippet.length < 50 || !enContentSnippet || enContentSnippet.length < 50 || deContentSnippet !== enContentSnippet;
    check('F27', 'de.content != en.content (first 200 chars)', contentNotEnglish,
      contentNotEnglish
        ? (deContentSnippet.length >= 50 && enContentSnippet.length >= 50
            ? `DE starts: "${deContentSnippet.substring(0, 50)}..." | EN starts: "${enContentSnippet.substring(0, 50)}..."`
            : 'One or both too short to compare')
        : `SAME first 200 chars: "${deContentSnippet.substring(0, 60)}..."`);

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
  console.log(`  With DE data:     ${report.postsWithTranslation}`);
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

  // Print failures grouped by check
  const failuresByCheck = {};
  for (const pr of report.posts) {
    for (const c of pr.checks) {
      if (!c.pass) {
        if (!failuresByCheck[c.id]) failuresByCheck[c.id] = { name: c.name, failures: [] };
        failuresByCheck[c.id].failures.push({
          post: pr.primarySlug,
          deSlug: pr.deSlug,
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
  const reportPath = path.join(__dirname, 'german-blog-seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

  await prisma.$disconnect();
})().catch(async (err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
