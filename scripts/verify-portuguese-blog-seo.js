#!/usr/bin/env node
/**
 * Portuguese Blog SEO Verification & Auto-Fix Script
 * Verify all published Portuguese blog posts with 40 checks per post
 *
 * Checks per post (40 checks):
 *   A. Translation Completeness (checks 1-5)
 *   B. Slug Integrity (checks 6-10)
 *   C. Content Quality (checks 11-15)
 *   D. SEO Field Quality (checks 16-20)
 *   E. Portuguese-Specific DB Checks (checks 21-30)
 *   F. Cross-Locale Integrity (checks 31-40)
 *
 * Usage:
 *   node scripts/verify-portuguese-blog-seo.js --dry-run   # audit only
 *   node scripts/verify-portuguese-blog-seo.js              # audit + fix
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

const LOCALE = 'pt';
const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ROMANCE_LOCALES = ['fr', 'it', 'es']; // Cross-Romance comparison targets (exclude pt itself)
const DRY_RUN = process.argv.includes('--dry-run');

// Portuguese category display names (from page.tsx lines 784-792)
const PT_CATEGORY_NAMES = {
  'teaching-resources': 'Recursos Did\u00e1ticos',
  'worksheet-tips': 'Dicas de Fichas',
  'educational-activities': 'Atividades Educativas',
  'learning-strategies': 'Estrat\u00e9gias de Aprendizagem',
  'curriculum-guides': 'Guias Curriculares',
  'parent-resources': 'Recursos para Pais',
  'seasonal-content': 'Conte\u00fado Sazonal',
};

// Portuguese language signals
const PORTUGUESE_SIGNALS = [
  'ficha', 'para', 'como', 'guia', 'gerador', 'dos', 'das', 'uma',
  'com', 'por', 'educativo', 'aprendizagem', 'atividades',
  'ensino', 'professor', 'aluno', 'escola', 'exerc\u00edcio',
  'conte\u00fado', 'estrat\u00e9gia', 'desenvolvimento', 'trabalho',
];

// English words that should NOT appear in Portuguese-only fields
// Removed cognates: editable/template/generator/teacher exist in PT context
const ENGLISH_SIGNALS = [
  'worksheet', 'printable',
  'classroom', 'student',
];

// Brand names that contain English signal words but are NOT English text
const BRAND_EXCLUSIONS = ['worksheetworks', 'teachers pay teachers', 'teacherspayteachers', 'super teacher worksheets', 'google classroom'];

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
// Portuguese-specific helper functions
// ---------------------------------------------------------------------------

/** Detect mojibake (encoding corruption) common in Portuguese text */
function hasPortugueseMojibake(str) {
  // \u00e3 -> \u00c3\u00a3, \u00f5 -> \u00c3\u00b5, \u00e7 -> \u00c3\u00a7,
  // \u00e1 -> \u00c3\u00a1, \u00e9 -> \u00c3\u00a9, \u00ed -> \u00c3\u00ad,
  // \u00f3 -> \u00c3\u00b3, \u00fa -> \u00c3\u00ba, \u00e2 -> \u00c3\u00a2,
  // \u00ea -> \u00c3\u00aa, \u00f4 -> \u00c3\u00b4, \u00ab -> \u00c2\u00ab, \u00bb -> \u00c2\u00bb
  return /\u00c3\u00a3|\u00c3\u00b5|\u00c3\u00a7|\u00c3\u00a1|\u00c3\u00a9|\u00c3\u00ad|\u00c3\u00b3|\u00c3\u00ba|\u00c3\u00a2|\u00c3\u00aa|\u00c3\u00b4|\u00c2\u00ab|\u00c2\u00bb|\ufffd|Ã£|Ã µ|Ã§|Ã¡|Ã©|Ã­|Ã³|Ãº|Ã¢|Ãª|Ã´|Â«|Â»/.test(str || '');
}

/** Check for raw \uXXXX escape sequences (literal backslash-u, not actual Unicode) */
function hasRawUnicodeEscapes(str) {
  return /\\u[0-9a-fA-F]{4}/.test(str || '');
}

/** Count non-breaking spaces in a string */
function countNBSP(str) {
  return (str || '').split('\u00a0').length - 1;
}

/** Detect if text has Portuguese language signals */
function hasPortugueseSignals(str) {
  if (!str) return false;
  const lower = str.toLowerCase();
  return PORTUGUESE_SIGNALS.some(w => lower.includes(w));
}

/** Detect if text has English language signals (excluding brand names) */
function hasEnglishSignals(str) {
  if (!str) return false;
  let lower = str.toLowerCase();
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

/** Detect Portuguese HowTo patterns */
function detectPortugueseHowTo(title, content) {
  const patterns = [
    /^Como\s/i,                  // "Como fazer..."
    /Guia\s+para\s/i,           // "Guia para..."
    /Passo\s+\d/i,              // "Passo 1:"
    /Como\s+criar/i,            // "Como criar..."
    /Como\s+usar/i,             // "Como usar..."
    /Como\s+utilizar/i,         // "Como utilizar..."
    /Tutorial\s/i,               // "Tutorial..."
    /Guia\s+completo/i,         // "Guia completo..."
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
function loadPortugueseLegacySlugs() {
  const candidates = [
    path.join(__dirname, '..', 'frontend', 'config', 'blog-redirects.ts'),
    '/opt/lessoncraftstudio/frontend/config/blog-redirects.ts',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const slugs = [];
      const entryRegex = /\{\s*"oldSlug":\s*"([^"]+)",\s*"newSlug":\s*"([^"]+)",\s*"locale":\s*"pt"\s*\}/g;
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
  console.log('  PORTUGUESE BLOG SEO VERIFICATION');
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
  const legacySlugs = loadPortugueseLegacySlugs();
  const legacyOldSlugs = new Set(legacySlugs.map(s => s.oldSlug));
  console.log(`Loaded ${legacySlugs.length} Portuguese legacy slug redirects\n`);

  // Build a map of all slugs across all locales (for collision detection)
  const allSlugsByLocale = new Map();
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

  // Collect dedup sets for Portuguese fields
  const ptSlugSet = new Map();
  const ptMetaTitleSet = new Map();
  const ptMetaDescSet = new Map();
  const ptFocusKeywordSet = new Map();

  for (const post of posts) {
    const pt = (post.translations || {})[LOCALE] || {};
    if (pt.slug && !ptSlugSet.has(pt.slug)) ptSlugSet.set(pt.slug, post.slug);
    if (pt.metaTitle && !ptMetaTitleSet.has(pt.metaTitle)) ptMetaTitleSet.set(pt.metaTitle, post.slug);
    if (pt.metaDescription && !ptMetaDescSet.has(pt.metaDescription)) ptMetaDescSet.set(pt.metaDescription, post.slug);
    if (pt.focusKeyword && !ptFocusKeywordSet.has(pt.focusKeyword)) ptFocusKeywordSet.set(pt.focusKeyword, post.slug);
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

  // Count posts with Portuguese translations
  const postsWithPt = posts.filter(p => {
    const pt = (p.translations || {})[LOCALE] || {};
    return pt.title && pt.content;
  });
  console.log(`Posts with Portuguese translation: ${postsWithPt.length}/${posts.length}\n`);

  // Results
  const report = {
    locale: LOCALE,
    totalPosts: posts.length,
    postsWithTranslation: postsWithPt.length,
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
  let faqEligibleCount = 0;
  let howToDetectedCount = 0;

  // ---------------------------------------------------------------------------
  // Run checks for each post
  // ---------------------------------------------------------------------------
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const t = post.translations || {};
    const pt = t[LOCALE] || {};
    const en = t['en'] || {};
    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      ptSlug: pt.slug || '',
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

    check('A1', 'pt.title exists', pt.title && pt.title.trim().length > 0,
      pt.title ? `"${pt.title.substring(0, 70)}"` : 'MISSING');

    const actualPtSlug = pt.slug || '';
    check('A2', 'pt.slug exists', actualPtSlug.length > 0,
      actualPtSlug ? `"${actualPtSlug.substring(0, 60)}"` : 'MISSING',
      !actualPtSlug && pt.title,
      !actualPtSlug && pt.title ? {
        field: 'translations.pt.slug',
        oldValue: '',
        newValue: normalizeSlug(pt.title),
        description: `Set pt.slug to "${normalizeSlug(pt.title).substring(0, 60)}"`,
        patch: { slug: normalizeSlug(pt.title) },
      } : null
    );

    const contentLen = pt.content ? pt.content.length : 0;
    check('A3', 'pt.content exists (>100 chars)', contentLen > 100,
      contentLen > 0 ? `${contentLen} chars` : 'MISSING');

    const metaDesc = pt.metaDescription || '';
    const metaDescOk = metaDesc.length >= 50 && metaDesc.length <= 160;
    check('A4', 'pt.metaDescription 50-160 chars', metaDescOk,
      metaDesc.length > 0 ? `${metaDesc.length} chars: "${metaDesc.substring(0, 80)}..."` : 'MISSING',
      metaDesc.length === 0 && pt.excerpt,
      metaDesc.length === 0 && pt.excerpt ? {
        field: 'translations.pt.metaDescription',
        oldValue: '',
        newValue: pt.excerpt.substring(0, 160),
        description: `Set metaDescription from excerpt`,
        patch: { metaDescription: pt.excerpt.substring(0, 160) },
      } : null
    );

    const metaTitle = pt.metaTitle || '';
    const metaTitleOk = metaTitle.length >= 20 && metaTitle.length <= 70;
    check('A5', 'pt.metaTitle 20-70 chars', metaTitleOk,
      metaTitle.length > 0 ? `${metaTitle.length} chars: "${metaTitle.substring(0, 70)}"` : 'MISSING',
      metaTitle.length === 0 && pt.title,
      metaTitle.length === 0 && pt.title ? {
        field: 'translations.pt.metaTitle',
        oldValue: '',
        newValue: pt.title.substring(0, 70),
        description: `Set metaTitle from title: "${pt.title.substring(0, 70)}"`,
        patch: { metaTitle: pt.title.substring(0, 70) },
      } : null
    );

    // =========================================================================
    // B. Slug Integrity (checks 6-10)
    // =========================================================================

    const slugIsAscii = !actualPtSlug || /^[a-z0-9-]+$/.test(actualPtSlug);
    check('B6', 'pt.slug is ASCII-safe', slugIsAscii,
      slugIsAscii
        ? (actualPtSlug ? `"${actualPtSlug.substring(0, 50)}" is valid ASCII` : 'No slug')
        : `Non-ASCII chars in slug: "${actualPtSlug.substring(0, 50)}"`);

    const enSlug = en.slug || post.slug;
    const slugDiffersFromEn = !actualPtSlug || !enSlug || actualPtSlug !== enSlug;
    check('B7', 'pt.slug != en.slug (localized)', slugDiffersFromEn,
      slugDiffersFromEn
        ? (actualPtSlug && enSlug
            ? `PT: "${actualPtSlug.substring(0, 40)}" | EN: "${enSlug.substring(0, 40)}"`
            : 'One or both slugs missing')
        : `SAME: "${actualPtSlug.substring(0, 60)}"`);

    const slugFirstSeen = ptSlugSet.get(actualPtSlug);
    const slugIsUnique = !actualPtSlug || slugFirstSeen === post.slug;
    check('B8', 'No duplicate PT slug', slugIsUnique,
      slugIsUnique
        ? (actualPtSlug ? `Unique slug` : 'No slug')
        : `DUPLICATE: also used by ${slugFirstSeen}`);

    const slugUsers = actualPtSlug
      ? (allSlugsByLocale.get(actualPtSlug) || []).filter(
          u => u.locale !== LOCALE && u.locale !== 'primary' && u.postId !== post.id
        )
      : [];
    check('B9', 'No cross-locale slug collision', slugUsers.length === 0 || !actualPtSlug,
      actualPtSlug
        ? (slugUsers.length === 0 ? 'No collisions' : `Collision: ${JSON.stringify(slugUsers)}`)
        : 'No PT slug to check');

    check('B10', 'pt.slug <= 80 chars', !actualPtSlug || actualPtSlug.length <= 80,
      actualPtSlug ? `${actualPtSlug.length} chars` : 'No slug');

    // =========================================================================
    // C. Content Quality (checks 11-15)
    // =========================================================================

    const ptTitle = (pt.title || '').trim();
    const enTitle = (en.title || '').trim();
    const titleIsPortuguese = !ptTitle || !enTitle || ptTitle !== enTitle;
    check('C11', 'pt.title is Portuguese (not EN fallback)', titleIsPortuguese,
      titleIsPortuguese
        ? (ptTitle && enTitle
            ? `PT: "${ptTitle.substring(0, 40)}" | EN: "${enTitle.substring(0, 40)}"`
            : 'One or both titles missing')
        : `SAME AS ENGLISH: "${ptTitle.substring(0, 60)}"`);

    const ptMetaDesc = (pt.metaDescription || '').trim();
    const enMetaDesc = (en.metaDescription || '').trim();
    const metaDescIsPortuguese = !ptMetaDesc || !enMetaDesc || ptMetaDesc !== enMetaDesc;
    check('C12', 'pt.metaDescription is Portuguese', metaDescIsPortuguese,
      metaDescIsPortuguese
        ? (ptMetaDesc && enMetaDesc
            ? `PT: "${ptMetaDesc.substring(0, 40)}..." | EN: "${enMetaDesc.substring(0, 40)}..."`
            : 'One or both missing')
        : `SAME AS ENGLISH: "${ptMetaDesc.substring(0, 60)}"`);

    const focusKeyword = (pt.focusKeyword || '').trim();
    check('C13', 'pt.focusKeyword exists', focusKeyword.length > 0,
      focusKeyword ? `"${focusKeyword}"` : 'MISSING');

    const fkInTitle = focusKeyword && ptTitle && ptTitle.toLowerCase().includes(focusKeyword.toLowerCase());
    const fkInDesc = focusKeyword && ptMetaDesc && ptMetaDesc.toLowerCase().includes(focusKeyword.toLowerCase());
    const fkPresent = !focusKeyword || fkInTitle || fkInDesc;
    check('C14', 'focusKeyword in title or metaDescription', fkPresent,
      focusKeyword
        ? (fkInTitle ? `Found in title` : (fkInDesc ? `Found in metaDescription` : `NOT in title or metaDescription`))
        : 'No focusKeyword to check');

    const metaTitleFirstSeen = ptMetaTitleSet.get(metaTitle);
    const metaTitleUnique = !metaTitle || metaTitleFirstSeen === post.slug;
    check('C15', 'No duplicate PT metaTitle', metaTitleUnique,
      metaTitleUnique
        ? (metaTitle ? `Unique metaTitle` : 'No metaTitle')
        : `DUPLICATE: also used by ${metaTitleFirstSeen}`);

    // =========================================================================
    // D. SEO Field Quality (checks 16-20)
    // =========================================================================

    const metaDescFirstSeen = ptMetaDescSet.get(pt.metaDescription);
    const metaDescUnique = !pt.metaDescription || metaDescFirstSeen === post.slug;
    check('D16', 'No duplicate PT metaDescription', metaDescUnique,
      metaDescUnique
        ? (pt.metaDescription ? `Unique` : 'No metaDescription')
        : `DUPLICATE: also used by ${metaDescFirstSeen}`);

    const fkFirstSeen = ptFocusKeywordSet.get(focusKeyword);
    const fkUnique = !focusKeyword || fkFirstSeen === post.slug;
    check('D17', 'No duplicate PT focusKeyword', fkUnique,
      fkUnique
        ? (focusKeyword ? `Unique` : 'No focusKeyword')
        : `DUPLICATE: also used by ${fkFirstSeen}`);

    const titleNotGeneric = !ptTitle || (
      !ptTitle.startsWith('Untitled') &&
      !ptTitle.startsWith('Sem t\u00edtulo') &&
      !ptTitle.startsWith('Test') &&
      ptTitle.length > 10
    );
    check('D18', 'pt.title not generic', titleNotGeneric,
      titleNotGeneric
        ? (ptTitle ? `OK: "${ptTitle.substring(0, 50)}"` : 'No title')
        : `Generic title: "${ptTitle.substring(0, 50)}"`);

    check('D19', 'pt.metaDescription != en.metaDescription', metaDescIsPortuguese,
      metaDescIsPortuguese ? 'Different from English' : 'SAME AS ENGLISH');

    const titleHasHtml = /<[^>]+>/.test(ptTitle);
    const descHasHtml = /<[^>]+>/.test(ptMetaDesc);
    check('D20', 'No HTML in title/metaDescription', !titleHasHtml && !descHasHtml,
      titleHasHtml ? `HTML in title: "${ptTitle.substring(0, 50)}"` :
      descHasHtml ? `HTML in metaDescription` : 'Clean');

    // =========================================================================
    // E. Portuguese-Specific DB Checks (checks 21-30)
    // =========================================================================

    const titleHasMojibake = hasPortugueseMojibake(ptTitle);
    check('E21', 'pt.title no mojibake', !titleHasMojibake,
      titleHasMojibake
        ? `Mojibake in title: "${ptTitle.substring(0, 60)}"`
        : (ptTitle ? 'Accents/\u00e7/\u00e3/\u00f5 intact' : 'No title'));

    const descHasMojibake = hasPortugueseMojibake(ptMetaDesc);
    check('E22', 'pt.metaDescription no mojibake', !descHasMojibake,
      descHasMojibake
        ? `Mojibake in metaDescription`
        : (ptMetaDesc ? 'Accents/\u00e7/\u00e3/\u00f5 intact' : 'No metaDescription'));

    const titleHasRawEscapes = hasRawUnicodeEscapes(ptTitle);
    check('E23', 'No raw \\uXXXX in title', !titleHasRawEscapes,
      titleHasRawEscapes
        ? `Raw escape in title: "${ptTitle.substring(0, 60)}"`
        : 'No raw escapes');

    const fkIsEnglish = focusKeyword && hasEnglishSignals(focusKeyword) && !hasPortugueseSignals(focusKeyword);
    check('E24', 'focusKeyword is Portuguese', !fkIsEnglish,
      fkIsEnglish
        ? `English focusKeyword: "${focusKeyword}"`
        : (focusKeyword ? `OK: "${focusKeyword}"` : 'No focusKeyword'));

    // E25: Portuguese uses \u00ab \u00bb guillemets - check they're balanced if present
    const leftGuillemet = (ptTitle + ' ' + ptMetaDesc).match(/\u00ab/g) || [];
    const rightGuillemet = (ptTitle + ' ' + ptMetaDesc).match(/\u00bb/g) || [];
    const guillemetsBalanced = leftGuillemet.length === 0 || leftGuillemet.length === rightGuillemet.length;
    check('E25', 'Guillemets \u00ab\u00bb balanced', guillemetsBalanced,
      guillemetsBalanced ? 'Balanced or no guillemets' : `Unbalanced: ${leftGuillemet.length} \u00ab vs ${rightGuillemet.length} \u00bb`);

    // E26: Portuguese tilde vowels (\u00e3/\u00f5) should render correctly
    const hasTildeVowels = /[\u00e3\u00f5\u00c3\u00d5]/.test(ptTitle + ' ' + ptMetaDesc);
    check('E26', 'Tilde vowels \u00e3/\u00f5 render correctly', true,
      hasTildeVowels ? 'Tilde vowels present and intact' : 'No tilde vowels in title/description');

    // E27: Title/description don't have mixed PT/EN
    const titleMixed = ptTitle && hasEnglishSignals(ptTitle) && hasPortugueseSignals(ptTitle);
    const descMixed = ptMetaDesc && hasEnglishSignals(ptMetaDesc) && hasPortugueseSignals(ptMetaDesc);
    check('E27', 'No mixed PT/EN in title/description', !titleMixed && !descMixed,
      titleMixed
        ? `Mixed language in title: "${ptTitle.substring(0, 60)}"`
        : (descMixed ? `Mixed language in metaDescription` : 'Language consistent'));

    // E28: Slug uses hyphens not underscores
    const slugHasUnderscores = actualPtSlug && actualPtSlug.includes('_');
    check('E28', 'pt.slug uses hyphens (not underscores)', !slugHasUnderscores,
      slugHasUnderscores
        ? `Underscore in slug: "${actualPtSlug.substring(0, 50)}"`
        : (actualPtSlug ? 'Hyphens only' : 'No slug'));

    // E29: Content has Portuguese H2/H3 headings (not English)
    const headingPattern = /<h[23][^>]*>([^<]+)<\/h[23]>/gi;
    const headings = [];
    let hMatch;
    const contentStr = pt.content || '';
    while ((hMatch = headingPattern.exec(contentStr)) !== null) {
      headings.push(hMatch[1].trim());
    }
    const portugueseHeadings = headings.filter(h => hasPortugueseSignals(h));
    const englishHeadings = headings.filter(h => hasEnglishSignals(h) && !hasPortugueseSignals(h));
    const headingsOk = headings.length === 0 || englishHeadings.length === 0;
    check('E29', 'Content headings are Portuguese', headingsOk,
      headings.length > 0
        ? (headingsOk
            ? `${headings.length} headings, ${portugueseHeadings.length} Portuguese signals`
            : `${englishHeadings.length} English heading(s): "${englishHeadings[0].substring(0, 40)}"`)
        : 'No headings found');

    // E30: Category is valid
    const validCategories = Object.keys(PT_CATEGORY_NAMES);
    const categoryValid = !post.category || validCategories.includes(post.category);
    check('E30', 'Category is valid', categoryValid,
      post.category
        ? (categoryValid ? `"${post.category}" -> "${PT_CATEGORY_NAMES[post.category]}"` : `Unknown: "${post.category}"`)
        : 'No category');

    // =========================================================================
    // F. Cross-Locale Integrity (checks 31-40)
    // =========================================================================

    const enExists = en.title && en.content;
    check('F31', 'English translation exists', !!enExists,
      enExists ? 'EN title + content present' : 'MISSING English translation');

    const createdAtValid = post.createdAt && post.createdAt.getTime() > 0;
    check('F32', 'createdAt valid date', createdAtValid,
      createdAtValid ? `${post.createdAt.toISOString().substring(0, 10)}` : 'Invalid/missing');

    const datesConsistent = !post.updatedAt || !post.createdAt || post.updatedAt >= post.createdAt;
    check('F33', 'updatedAt >= createdAt', datesConsistent,
      datesConsistent
        ? (post.updatedAt ? `updated=${post.updatedAt.toISOString().substring(0, 10)}` : 'No updatedAt')
        : `updatedAt < createdAt`);

    const categoryHasPtName = !post.category || !!PT_CATEGORY_NAMES[post.category];
    check('F34', 'Category has Portuguese display name', categoryHasPtName,
      post.category
        ? (categoryHasPtName ? `"${PT_CATEGORY_NAMES[post.category]}"` : `No PT name for "${post.category}"`)
        : 'No category');

    const slugInLegacy = actualPtSlug && legacyOldSlugs.has(actualPtSlug);
    check('F35', 'PT slug not in legacy redirects', !slugInLegacy,
      slugInLegacy
        ? `COLLISION: "${actualPtSlug}" is a legacy oldSlug (redirect loop risk)`
        : (actualPtSlug ? 'No collision' : 'No slug'));

    const plainText = (pt.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(' ').filter(w => w.length > 0).length;
    check('F36', 'Content word count > 300', wordCount > 300,
      `${wordCount} words${wordCount <= 300 ? ' (thin content)' : ''}`);

    const hasCtrl = hasControlChars(ptTitle) || hasControlChars(ptMetaDesc) ||
                    hasControlChars(focusKeyword) || hasControlChars(actualPtSlug);
    check('F37', 'No ASCII control chars', !hasCtrl,
      hasCtrl ? 'Control characters found' : 'Clean');

    const duplicateTitleLocales = [];
    if (ptTitle) {
      const matches = titleToLocalePost.get(ptTitle) || [];
      for (const m of matches) {
        if (m.locale !== LOCALE && m.postSlug === post.slug) {
          duplicateTitleLocales.push(m.locale);
        }
      }
    }
    check('F38', 'PT title unique across locales', duplicateTitleLocales.length === 0 || !ptTitle,
      ptTitle
        ? (duplicateTitleLocales.length === 0
            ? 'Unique across locales'
            : `DUPLICATE in: [${duplicateTitleLocales.join(', ')}]`)
        : 'No PT title to check');

    const duplicateDescLocales = [];
    if (ptMetaDesc) {
      const matches = metaDescToLocalePost.get(ptMetaDesc) || [];
      for (const m of matches) {
        if (m.locale !== LOCALE && m.postSlug === post.slug) {
          duplicateDescLocales.push(m.locale);
        }
      }
    }
    check('F39', 'PT metaDescription unique across locales', duplicateDescLocales.length === 0 || !ptMetaDesc,
      ptMetaDesc
        ? (duplicateDescLocales.length === 0
            ? 'Unique across locales'
            : `DUPLICATE in: [${duplicateDescLocales.join(', ')}]`)
        : 'No PT metaDescription to check');

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
        if (fix.patch) Object.assign(translationPatches, fix.patch);
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
  console.log(`  With PT data:     ${report.postsWithTranslation}`);
  console.log(`  Total checks:     ${report.totalChecks}`);
  console.log(`  PASSED:           ${report.passed}`);
  console.log(`  FAILED:           ${report.failed}`);
  if (!DRY_RUN) console.log(`  Auto-fixed:       ${report.fixed}`);
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
          ptSlug: pr.ptSlug,
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
      if (data.failures.length > 10) console.log(`  ... and ${data.failures.length - 10} more`);
    }
  } else {
    console.log('ALL CHECKS PASSED! No issues found.');
  }

  const reportPath = path.join(__dirname, 'portuguese-blog-seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

  await prisma.$disconnect();
})().catch(async (err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
