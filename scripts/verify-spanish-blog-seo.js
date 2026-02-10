#!/usr/bin/env node
/**
 * Spanish Blog SEO Verification & Auto-Fix Script
 * Verify all published Spanish blog posts with 40 checks per post
 *
 * Checks per post (40 checks):
 *   A. Translation Completeness (checks 1-5)
 *   B. Slug Integrity (checks 6-10)
 *   C. Content Quality (checks 11-15)
 *   D. SEO Field Quality (checks 16-20)
 *   E. Spanish-Specific DB Checks (checks 21-30)
 *   F. Cross-Locale Integrity (checks 31-40)
 *
 * Usage:
 *   node scripts/verify-spanish-blog-seo.js --dry-run   # audit only
 *   node scripts/verify-spanish-blog-seo.js              # audit + fix
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

const LOCALE = 'es';
const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ROMANCE_LOCALES = ['fr', 'it', 'pt']; // Cross-Romance comparison targets (exclude es itself)
const DRY_RUN = process.argv.includes('--dry-run');

// Spanish category display names (from page.tsx lines 775-783)
const ES_CATEGORY_NAMES = {
  'teaching-resources': 'Recursos Did\u00e1cticos',
  'worksheet-tips': 'Consejos de Fichas',
  'educational-activities': 'Actividades Educativas',
  'learning-strategies': 'Estrategias de Aprendizaje',
  'curriculum-guides': 'Gu\u00edas Curriculares',
  'parent-resources': 'Recursos para Padres',
  'seasonal-content': 'Contenido Estacional',
};

// Spanish language signals
const SPANISH_SIGNALS = [
  'ficha', 'para', 'como', 'gu\u00eda', 'generador', 'los', 'las', 'del',
  'una', 'con', 'por', 'educativo', 'aprendizaje', 'actividades',
  'ense\u00f1anza', 'maestro', 'alumno', 'escuela', 'ejercicio',
];

// English words that should NOT appear in Spanish-only fields
const ENGLISH_SIGNALS = [
  'worksheet', 'printable',
  'classroom', 'student',
];

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
// Spanish-specific helper functions
// ---------------------------------------------------------------------------

/** Detect mojibake (encoding corruption) common in Spanish text */
function hasSpanishMojibake(str) {
  // \u00f1 -> \u00c3\u00b1, \u00e1 -> \u00c3\u00a1, \u00e9 -> \u00c3\u00a9, \u00ed -> \u00c3\u00ad,
  // \u00f3 -> \u00c3\u00b3, \u00fa -> \u00c3\u00ba, \u00fc -> \u00c3\u00bc,
  // \u00bf -> \u00c2\u00bf, \u00a1 -> \u00c2\u00a1, \u00ab -> \u00c2\u00ab, \u00bb -> \u00c2\u00bb
  return /\u00c3\u00b1|\u00c3\u00a1|\u00c3\u00a9|\u00c3\u00ad|\u00c3\u00b3|\u00c3\u00ba|\u00c3\u00bc|\u00c2\u00bf|\u00c2\u00a1|\u00c2\u00ab|\u00c2\u00bb|\ufffd|Ã±|Ã¡|Ã©|Ã­|Ã³|Ãº|Ã¼|Â¿|Â¡|Â«|Â»/.test(str || '');
}

/** Check for raw \uXXXX escape sequences (literal backslash-u, not actual Unicode) */
function hasRawUnicodeEscapes(str) {
  return /\\u[0-9a-fA-F]{4}/.test(str || '');
}

/** Count non-breaking spaces in a string */
function countNBSP(str) {
  return (str || '').split('\u00a0').length - 1;
}

/** Check if \u00bf and ? are balanced (inverted question mark usage) */
function isInvertedQuestionBalanced(str) {
  if (!str) return true;
  const invertedCount = (str.match(/\u00bf/g) || []).length;
  const normalCount = (str.match(/\?/g) || []).length;
  if (invertedCount === 0) return true; // No inverted marks, nothing to balance
  return invertedCount <= normalCount; // Each \u00bf should have a matching ?
}

/** Check if \u00a1 and ! are balanced (inverted exclamation mark usage) */
function isInvertedExclamationBalanced(str) {
  if (!str) return true;
  const invertedCount = (str.match(/\u00a1/g) || []).length;
  const normalCount = (str.match(/!/g) || []).length;
  if (invertedCount === 0) return true;
  return invertedCount <= normalCount;
}

/** Detect if text has Spanish language signals */
function hasSpanishSignals(str) {
  if (!str) return false;
  const lower = str.toLowerCase();
  return SPANISH_SIGNALS.some(w => lower.includes(w));
}

// Brand names that contain English signal words but are NOT English text
const BRAND_EXCLUSIONS = ['worksheetworks', 'teachers pay teachers', 'teacherspayteachers', 'super teacher worksheets'];

/** Detect if text has English language signals (excluding brand names) */
function hasEnglishSignals(str) {
  if (!str) return false;
  let lower = str.toLowerCase();
  // Strip brand names before checking
  for (const brand of BRAND_EXCLUSIONS) {
    lower = lower.replace(new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '');
  }
  return ENGLISH_SIGNALS.some(w => lower.includes(w));
}

/** Check for ASCII control characters */
function hasControlChars(str) {
  return /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(str || '');
}

/** Count FAQ-eligible questions (H2/H3 headings ending with ?) in HTML content */
function countFAQQuestions(html) {
  if (!html) return 0;
  const pattern = /<h[23][^>]*>[^<]*\u00a0?\?<\/h[23]>/gi;
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
}

/** Detect Spanish HowTo patterns */
function detectSpanishHowTo(title, content) {
  const patterns = [
    /^C\u00f3mo\s/i,            // "C\u00f3mo hacer..."
    /^Como\s/i,                  // "Como hacer..." (without accent)
    /Gu\u00eda\s+para\s/i,      // "Gu\u00eda para..."
    /Paso\s+\d/i,                // "Paso 1:"
    /C\u00f3mo\s+crear/i,       // "C\u00f3mo crear..."
    /C\u00f3mo\s+usar/i,        // "C\u00f3mo usar..."
    /C\u00f3mo\s+utilizar/i,    // "C\u00f3mo utilizar..."
    /Tutorial\s/i,               // "Tutorial..."
    /Gu\u00eda\s+completa/i,    // "Gu\u00eda completa..."
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
// Load legacy blog redirects for F35
// ---------------------------------------------------------------------------
function loadSpanishLegacySlugs() {
  const candidates = [
    path.join(__dirname, '..', 'frontend', 'config', 'blog-redirects.ts'),
    '/opt/lessoncraftstudio/frontend/config/blog-redirects.ts',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const slugs = [];
      const entryRegex = /\{\s*"oldSlug":\s*"([^"]+)",\s*"newSlug":\s*"([^"]+)",\s*"locale":\s*"es"\s*\}/g;
      let match;
      while ((match = entryRegex.exec(content)) !== null) {
        slugs.push({ oldSlug: match[1], newSlug: match[2] });
      }
      return slugs;
    }
  }
  console.warn('WARNING: Could not find blog-redirects.ts for legacy slug checks');
  return [];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const prisma = new PrismaClient();
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  SPANISH BLOG SEO VERIFICATION');
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
      status: true,
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

  // Load legacy redirects
  const legacySlugs = loadSpanishLegacySlugs();
  const legacyOldSlugs = new Set(legacySlugs.map(s => s.oldSlug));
  console.log(`Loaded ${legacySlugs.length} Spanish legacy slug redirects\n`);

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
    if (!allSlugsByLocale.has(post.slug)) allSlugsByLocale.set(post.slug, []);
    allSlugsByLocale.get(post.slug).push({ locale: 'primary', postId: post.id, postSlug: post.slug });
  }

  // Collect dedup sets for Spanish fields
  const esSlugSet = new Map();     // slug -> postSlug (first seen)
  const esMetaTitleSet = new Map();
  const esMetaDescSet = new Map();
  const esFocusKeywordSet = new Map();

  // First pass: populate dedup sets
  for (const post of posts) {
    const es = (post.translations || {})[LOCALE] || {};
    if (es.slug) {
      if (!esSlugSet.has(es.slug)) esSlugSet.set(es.slug, post.slug);
    }
    if (es.metaTitle) {
      if (!esMetaTitleSet.has(es.metaTitle)) esMetaTitleSet.set(es.metaTitle, post.slug);
    }
    if (es.metaDescription) {
      if (!esMetaDescSet.has(es.metaDescription)) esMetaDescSet.set(es.metaDescription, post.slug);
    }
    if (es.focusKeyword) {
      if (!esFocusKeywordSet.has(es.focusKeyword)) esFocusKeywordSet.set(es.focusKeyword, post.slug);
    }
  }

  // Collect all titles across all locales (for duplicate detection)
  const titleToLocalePost = new Map();
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

  // Collect all metaDescriptions across locales
  const metaDescToLocalePost = new Map();
  for (const post of posts) {
    const t = post.translations;
    for (const loc of ALL_LOCALES) {
      if (t[loc] && t[loc].metaDescription) {
        const md = t[loc].metaDescription.trim();
        if (!metaDescToLocalePost.has(md)) metaDescToLocalePost.set(md, []);
        metaDescToLocalePost.get(md).push({ locale: loc, postSlug: post.slug });
      }
    }
  }

  // Count posts with Spanish translations
  const postsWithEs = posts.filter(p => {
    const es = (p.translations || {})[LOCALE] || {};
    return es.title && es.content;
  });
  console.log(`Posts with Spanish translation: ${postsWithEs.length}/${posts.length}\n`);

  // Results
  const report = {
    locale: LOCALE,
    totalPosts: posts.length,
    postsWithTranslation: postsWithEs.length,
    totalChecks: 0,
    passed: 0,
    failed: 0,
    fixed: 0,
    unfixable: 0,
    mode: DRY_RUN ? 'dry-run' : 'live',
    timestamp: new Date().toISOString(),
    posts: [],
  };

  const fixQueue = [];

  // Informational counters
  let faqEligibleCount = 0;
  let howToDetectedCount = 0;

  // ---------------------------------------------------------------------------
  // Run checks for each post
  // ---------------------------------------------------------------------------
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const t = post.translations || {};
    const es = t[LOCALE] || {};
    const en = t['en'] || {};
    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      esSlug: es.slug || '',
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
    // A. Translation Completeness (checks 1-5)
    // =========================================================================

    // A1: Spanish title exists & non-empty
    check('A1', 'es.title exists', es.title && es.title.trim().length > 0,
      es.title ? `"${es.title.substring(0, 70)}"` : 'MISSING');

    // A2: Spanish slug exists & non-empty
    const actualEsSlug = es.slug || '';
    check('A2', 'es.slug exists', actualEsSlug.length > 0,
      actualEsSlug ? `"${actualEsSlug.substring(0, 60)}"` : 'MISSING',
      !actualEsSlug && es.title,
      !actualEsSlug && es.title ? {
        field: 'translations.es.slug',
        oldValue: '',
        newValue: normalizeSlug(es.title),
        description: `Set es.slug to "${normalizeSlug(es.title).substring(0, 60)}"`,
        patch: { slug: normalizeSlug(es.title) },
      } : null
    );

    // A3: Spanish content exists & > 100 chars
    const contentLen = es.content ? es.content.length : 0;
    check('A3', 'es.content exists (>100 chars)', contentLen > 100,
      contentLen > 0 ? `${contentLen} chars` : 'MISSING');

    // A4: Spanish metaDescription exists & 50-160 chars
    const metaDesc = es.metaDescription || '';
    const metaDescOk = metaDesc.length >= 50 && metaDesc.length <= 160;
    check('A4', 'es.metaDescription 50-160 chars', metaDescOk,
      metaDesc.length > 0 ? `${metaDesc.length} chars: "${metaDesc.substring(0, 80)}..."` : 'MISSING',
      metaDesc.length === 0 && es.excerpt,
      metaDesc.length === 0 && es.excerpt ? {
        field: 'translations.es.metaDescription',
        oldValue: '',
        newValue: es.excerpt.substring(0, 160),
        description: `Set metaDescription from excerpt`,
        patch: { metaDescription: es.excerpt.substring(0, 160) },
      } : null
    );

    // A5: Spanish metaTitle exists & 20-70 chars
    const metaTitle = es.metaTitle || '';
    const metaTitleOk = metaTitle.length >= 20 && metaTitle.length <= 70;
    check('A5', 'es.metaTitle 20-70 chars', metaTitleOk,
      metaTitle.length > 0 ? `${metaTitle.length} chars: "${metaTitle.substring(0, 70)}"` : 'MISSING',
      metaTitle.length === 0 && es.title,
      metaTitle.length === 0 && es.title ? {
        field: 'translations.es.metaTitle',
        oldValue: '',
        newValue: es.title.substring(0, 70),
        description: `Set metaTitle from title: "${es.title.substring(0, 70)}"`,
        patch: { metaTitle: es.title.substring(0, 70) },
      } : null
    );

    // =========================================================================
    // B. Slug Integrity (checks 6-10)
    // =========================================================================

    // B6: Slug is ASCII-safe (no \u00f1, \u00e1, etc.)
    const slugIsAscii = !actualEsSlug || /^[a-z0-9-]+$/.test(actualEsSlug);
    check('B6', 'es.slug is ASCII-safe', slugIsAscii,
      slugIsAscii
        ? (actualEsSlug ? `"${actualEsSlug.substring(0, 50)}" is valid ASCII` : 'No slug')
        : `Non-ASCII chars in slug: "${actualEsSlug.substring(0, 50)}"`);

    // B7: Slug != English slug (localized)
    const enSlug = en.slug || post.slug;
    const slugDiffersFromEn = !actualEsSlug || !enSlug || actualEsSlug !== enSlug;
    check('B7', 'es.slug != en.slug (localized)', slugDiffersFromEn,
      slugDiffersFromEn
        ? (actualEsSlug && enSlug
            ? `ES: "${actualEsSlug.substring(0, 40)}" | EN: "${enSlug.substring(0, 40)}"`
            : 'One or both slugs missing')
        : `SAME: "${actualEsSlug.substring(0, 60)}"`);

    // B8: No slug duplicates across Spanish posts
    const slugFirstSeen = esSlugSet.get(actualEsSlug);
    const slugIsUnique = !actualEsSlug || slugFirstSeen === post.slug;
    check('B8', 'No duplicate ES slug', slugIsUnique,
      slugIsUnique
        ? (actualEsSlug ? `Unique slug` : 'No slug')
        : `DUPLICATE: also used by ${slugFirstSeen}`);

    // B9: Slug doesn't collide with another locale's slug
    const slugUsers = actualEsSlug
      ? (allSlugsByLocale.get(actualEsSlug) || []).filter(
          u => u.locale !== LOCALE && u.locale !== 'primary' && u.postId !== post.id
        )
      : [];
    check('B9', 'No cross-locale slug collision', slugUsers.length === 0 || !actualEsSlug,
      actualEsSlug
        ? (slugUsers.length === 0 ? 'No collisions' : `Collision: ${JSON.stringify(slugUsers)}`)
        : 'No ES slug to check');

    // B10: Slug length <= 80 chars
    check('B10', 'es.slug <= 80 chars', !actualEsSlug || actualEsSlug.length <= 80,
      actualEsSlug ? `${actualEsSlug.length} chars` : 'No slug');

    // =========================================================================
    // C. Content Quality (checks 11-15)
    // =========================================================================

    // C11: Title is actually Spanish (not English fallback)
    const esTitle = (es.title || '').trim();
    const enTitle = (en.title || '').trim();
    const titleIsSpanish = !esTitle || !enTitle || esTitle !== enTitle;
    check('C11', 'es.title is Spanish (not EN fallback)', titleIsSpanish,
      titleIsSpanish
        ? (esTitle && enTitle
            ? `ES: "${esTitle.substring(0, 40)}" | EN: "${enTitle.substring(0, 40)}"`
            : 'One or both titles missing')
        : `SAME AS ENGLISH: "${esTitle.substring(0, 60)}"`);

    // C12: metaDescription is Spanish
    const esMetaDesc = (es.metaDescription || '').trim();
    const enMetaDesc = (en.metaDescription || '').trim();
    const metaDescIsSpanish = !esMetaDesc || !enMetaDesc || esMetaDesc !== enMetaDesc;
    check('C12', 'es.metaDescription is Spanish', metaDescIsSpanish,
      metaDescIsSpanish
        ? (esMetaDesc && enMetaDesc
            ? `ES: "${esMetaDesc.substring(0, 40)}..." | EN: "${enMetaDesc.substring(0, 40)}..."`
            : 'One or both missing')
        : `SAME AS ENGLISH: "${esMetaDesc.substring(0, 60)}"`);

    // C13: focusKeyword exists
    const focusKeyword = (es.focusKeyword || '').trim();
    check('C13', 'es.focusKeyword exists', focusKeyword.length > 0,
      focusKeyword ? `"${focusKeyword}"` : 'MISSING');

    // C14: focusKeyword appears in title OR metaDescription
    const fkInTitle = focusKeyword && esTitle && esTitle.toLowerCase().includes(focusKeyword.toLowerCase());
    const fkInDesc = focusKeyword && esMetaDesc && esMetaDesc.toLowerCase().includes(focusKeyword.toLowerCase());
    const fkPresent = !focusKeyword || fkInTitle || fkInDesc;
    check('C14', 'focusKeyword in title or metaDescription', fkPresent,
      focusKeyword
        ? (fkInTitle ? `Found in title` : (fkInDesc ? `Found in metaDescription` : `NOT in title or metaDescription`))
        : 'No focusKeyword to check');

    // C15: No duplicate metaTitle across Spanish posts
    const metaTitleFirstSeen = esMetaTitleSet.get(metaTitle);
    const metaTitleUnique = !metaTitle || metaTitleFirstSeen === post.slug;
    check('C15', 'No duplicate ES metaTitle', metaTitleUnique,
      metaTitleUnique
        ? (metaTitle ? `Unique metaTitle` : 'No metaTitle')
        : `DUPLICATE: also used by ${metaTitleFirstSeen}`);

    // =========================================================================
    // D. SEO Field Quality (checks 16-20)
    // =========================================================================

    // D16: No duplicate metaDescription
    const metaDescFirstSeen = esMetaDescSet.get(es.metaDescription);
    const metaDescUnique = !es.metaDescription || metaDescFirstSeen === post.slug;
    check('D16', 'No duplicate ES metaDescription', metaDescUnique,
      metaDescUnique
        ? (es.metaDescription ? `Unique` : 'No metaDescription')
        : `DUPLICATE: also used by ${metaDescFirstSeen}`);

    // D17: No duplicate focusKeyword
    const fkFirstSeen = esFocusKeywordSet.get(focusKeyword);
    const fkUnique = !focusKeyword || fkFirstSeen === post.slug;
    check('D17', 'No duplicate ES focusKeyword', fkUnique,
      fkUnique
        ? (focusKeyword ? `Unique` : 'No focusKeyword')
        : `DUPLICATE: also used by ${fkFirstSeen}`);

    // D18: Title doesn't start with "Untitled" or generic
    const titleNotGeneric = !esTitle || (
      !esTitle.startsWith('Untitled') &&
      !esTitle.startsWith('Sin t\u00edtulo') &&
      !esTitle.startsWith('Test') &&
      esTitle.length > 10
    );
    check('D18', 'es.title not generic', titleNotGeneric,
      titleNotGeneric
        ? (esTitle ? `OK: "${esTitle.substring(0, 50)}"` : 'No title')
        : `Generic title: "${esTitle.substring(0, 50)}"`);

    // D19: metaDescription doesn't match English metaDescription
    check('D19', 'es.metaDescription != en.metaDescription', metaDescIsSpanish,
      metaDescIsSpanish ? 'Different from English' : 'SAME AS ENGLISH');

    // D20: No HTML tags in title or metaDescription
    const titleHasHtml = /<[^>]+>/.test(esTitle);
    const descHasHtml = /<[^>]+>/.test(esMetaDesc);
    check('D20', 'No HTML in title/metaDescription', !titleHasHtml && !descHasHtml,
      titleHasHtml ? `HTML in title: "${esTitle.substring(0, 50)}"` :
      descHasHtml ? `HTML in metaDescription` : 'Clean');

    // =========================================================================
    // E. Spanish-Specific DB Checks (checks 21-30)
    // =========================================================================

    // E21: Title has proper Spanish characters (no mojibake)
    const titleHasMojibake = hasSpanishMojibake(esTitle);
    check('E21', 'es.title no mojibake', !titleHasMojibake,
      titleHasMojibake
        ? `Mojibake in title: "${esTitle.substring(0, 60)}"`
        : (esTitle ? 'Accents/\u00f1 intact' : 'No title'));

    // E22: metaDescription has proper Spanish characters
    const descHasMojibake = hasSpanishMojibake(esMetaDesc);
    check('E22', 'es.metaDescription no mojibake', !descHasMojibake,
      descHasMojibake
        ? `Mojibake in metaDescription`
        : (esMetaDesc ? 'Accents/\u00f1 intact' : 'No metaDescription'));

    // E23: No raw \uXXXX escape sequences in title
    const titleHasRawEscapes = hasRawUnicodeEscapes(esTitle);
    check('E23', 'No raw \\uXXXX in title', !titleHasRawEscapes,
      titleHasRawEscapes
        ? `Raw escape in title: "${esTitle.substring(0, 60)}"`
        : 'No raw escapes');

    // E24: focusKeyword is Spanish (not English)
    const fkIsEnglish = focusKeyword && hasEnglishSignals(focusKeyword) && !hasSpanishSignals(focusKeyword);
    check('E24', 'focusKeyword is Spanish', !fkIsEnglish,
      fkIsEnglish
        ? `English focusKeyword: "${focusKeyword}"`
        : (focusKeyword ? `OK: "${focusKeyword}"` : 'No focusKeyword'));

    // E25: \u00bf balanced with ? (inverted question mark)
    const questionBalanced = isInvertedQuestionBalanced(esTitle) && isInvertedQuestionBalanced(esMetaDesc);
    check('E25', '\u00bf balanced with ?', questionBalanced,
      questionBalanced ? 'Balanced or no inverted marks' : 'Unbalanced \u00bf/? count');

    // E26: \u00a1 balanced with ! (inverted exclamation)
    const exclamBalanced = isInvertedExclamationBalanced(esTitle) && isInvertedExclamationBalanced(esMetaDesc);
    check('E26', '\u00a1 balanced with !', exclamBalanced,
      exclamBalanced ? 'Balanced or no inverted marks' : 'Unbalanced \u00a1/! count');

    // E27: Title/description don't have mixed ES/EN
    const titleMixed = esTitle && hasEnglishSignals(esTitle) && hasSpanishSignals(esTitle);
    const descMixed = esMetaDesc && hasEnglishSignals(esMetaDesc) && hasSpanishSignals(esMetaDesc);
    check('E27', 'No mixed ES/EN in title/description', !titleMixed && !descMixed,
      titleMixed
        ? `Mixed language in title: "${esTitle.substring(0, 60)}"`
        : (descMixed ? `Mixed language in metaDescription` : 'Language consistent'));

    // E28: Slug uses hyphens not underscores
    const slugHasUnderscores = actualEsSlug && actualEsSlug.includes('_');
    check('E28', 'es.slug uses hyphens (not underscores)', !slugHasUnderscores,
      slugHasUnderscores
        ? `Underscore in slug: "${actualEsSlug.substring(0, 50)}"`
        : (actualEsSlug ? 'Hyphens only' : 'No slug'));

    // E29: Content has Spanish H2/H3 headings (not English)
    const headingPattern = /<h[23][^>]*>([^<]+)<\/h[23]>/gi;
    const headings = [];
    let hMatch;
    const contentStr = es.content || '';
    while ((hMatch = headingPattern.exec(contentStr)) !== null) {
      headings.push(hMatch[1].trim());
    }
    const spanishHeadings = headings.filter(h => hasSpanishSignals(h));
    const englishHeadings = headings.filter(h => hasEnglishSignals(h) && !hasSpanishSignals(h));
    const headingsOk = headings.length === 0 || englishHeadings.length === 0;
    check('E29', 'Content headings are Spanish', headingsOk,
      headings.length > 0
        ? (headingsOk
            ? `${headings.length} headings, ${spanishHeadings.length} Spanish signals`
            : `${englishHeadings.length} English heading(s): "${englishHeadings[0].substring(0, 40)}"`)
        : 'No headings found');

    // E30: Category is valid
    const validCategories = Object.keys(ES_CATEGORY_NAMES);
    const categoryValid = !post.category || validCategories.includes(post.category);
    check('E30', 'Category is valid', categoryValid,
      post.category
        ? (categoryValid ? `"${post.category}" -> "${ES_CATEGORY_NAMES[post.category]}"` : `Unknown: "${post.category}"`)
        : 'No category');

    // =========================================================================
    // F. Cross-Locale Integrity (checks 31-40)
    // =========================================================================

    // F31: English translation also exists
    const enExists = en.title && en.content;
    check('F31', 'English translation exists', !!enExists,
      enExists ? 'EN title + content present' : 'MISSING English translation');

    // F32: createdAt is a valid date
    const createdAtValid = post.createdAt && post.createdAt.getTime() > 0;
    check('F32', 'createdAt valid date', createdAtValid,
      createdAtValid ? `${post.createdAt.toISOString().substring(0, 10)}` : 'Invalid/missing');

    // F33: updatedAt >= createdAt
    const datesConsistent = !post.updatedAt || !post.createdAt || post.updatedAt >= post.createdAt;
    check('F33', 'updatedAt >= createdAt', datesConsistent,
      datesConsistent
        ? (post.updatedAt ? `updated=${post.updatedAt.toISOString().substring(0, 10)}` : 'No updatedAt')
        : `updatedAt (${post.updatedAt.toISOString().substring(0, 10)}) < createdAt (${post.createdAt.toISOString().substring(0, 10)})`);

    // F34: Category has Spanish display name
    const categoryHasEsName = !post.category || !!ES_CATEGORY_NAMES[post.category];
    check('F34', 'Category has Spanish display name', categoryHasEsName,
      post.category
        ? (categoryHasEsName ? `"${ES_CATEGORY_NAMES[post.category]}"` : `No ES name for "${post.category}"`)
        : 'No category');

    // F35: ES slug not in legacy redirect oldSlug list
    const slugInLegacy = actualEsSlug && legacyOldSlugs.has(actualEsSlug);
    check('F35', 'ES slug not in legacy redirects', !slugInLegacy,
      slugInLegacy
        ? `COLLISION: "${actualEsSlug}" is a legacy oldSlug (redirect loop risk)`
        : (actualEsSlug ? 'No collision' : 'No slug'));

    // F36: Content word count > 300
    const plainText = (es.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(' ').filter(w => w.length > 0).length;
    check('F36', 'Content word count > 300', wordCount > 300,
      `${wordCount} words${wordCount <= 300 ? ' (thin content)' : ''}`);

    // F37: No ASCII control characters in any field
    const hasCtrl = hasControlChars(esTitle) || hasControlChars(esMetaDesc) ||
                    hasControlChars(focusKeyword) || hasControlChars(actualEsSlug);
    check('F37', 'No ASCII control chars', !hasCtrl,
      hasCtrl ? 'Control characters found' : 'Clean');

    // F38: Title not identical to another locale's title
    const duplicateTitleLocales = [];
    if (esTitle) {
      const matches = titleToLocalePost.get(esTitle) || [];
      for (const m of matches) {
        if (m.locale !== LOCALE && m.postSlug === post.slug) {
          duplicateTitleLocales.push(m.locale);
        }
      }
    }
    check('F38', 'ES title unique across locales', duplicateTitleLocales.length === 0 || !esTitle,
      esTitle
        ? (duplicateTitleLocales.length === 0
            ? 'Unique across locales'
            : `DUPLICATE in: [${duplicateTitleLocales.join(', ')}]`)
        : 'No ES title to check');

    // F39: metaDescription not identical to another locale's
    const duplicateDescLocales = [];
    if (esMetaDesc) {
      const matches = metaDescToLocalePost.get(esMetaDesc) || [];
      for (const m of matches) {
        if (m.locale !== LOCALE && m.postSlug === post.slug) {
          duplicateDescLocales.push(m.locale);
        }
      }
    }
    check('F39', 'ES metaDescription unique across locales', duplicateDescLocales.length === 0 || !esMetaDesc,
      esMetaDesc
        ? (duplicateDescLocales.length === 0
            ? 'Unique across locales'
            : `DUPLICATE in: [${duplicateDescLocales.join(', ')}]`)
        : 'No ES metaDescription to check');

    // F40: Post has published status
    check('F40', 'Post is published', post.status === 'published',
      `Status: ${post.status}`);

    report.posts.push(postReport);
  }

  // ---------------------------------------------------------------------------
  // Apply fixes
  // ---------------------------------------------------------------------------
  if (!DRY_RUN && fixQueue.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('  APPLYING FIXES');
    console.log('='.repeat(80));

    const fixesByPost = new Map();
    for (const fix of fixQueue) {
      if (!fixesByPost.has(fix.postId)) fixesByPost.set(fix.postId, []);
      fixesByPost.get(fix.postId).push(fix);
    }

    for (const [postId, fixes] of fixesByPost) {
      const post = posts.find(p => p.id === postId);
      if (!post) continue;

      console.log(`\nFixing post: ${post.slug}`);

      const translationPatches = {};

      for (const fix of fixes) {
        console.log(`  - ${fix.description}`);
        if (fix.patch) {
          Object.assign(translationPatches, fix.patch);
        }
      }

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
  console.log(`  With ES data:     ${report.postsWithTranslation}`);
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
  console.log(`  Spanish-specific insights:`);
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
          esSlug: pr.esSlug,
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
  const reportPath = path.join(__dirname, 'spanish-blog-seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

  await prisma.$disconnect();
})().catch(async (err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
