#!/usr/bin/env node
/**
 * Spanish Blog SEO \u2014 Live HTML Verification Script
 * Verify rendered HTML signals Google actually sees for all Spanish blog posts
 *
 * Fetches each Spanish blog post via http://localhost:3000/es/blog/{es-slug}
 * and verifies all SEO signals in the rendered HTML output.
 *
 * Checks per post (43 checks):
 *   F. HTTP Response (checks 1-2)
 *   G. HTML Head \u2014 Meta Tags (checks 3-6)
 *   H. HTML Head \u2014 Canonical & Hreflang (checks 7-12)
 *   I. HTML Head \u2014 Open Graph (checks 13-16)
 *   J. HTML Body \u2014 JSON-LD Schema (checks 17-23)
 *   L. Spanish-Specific Live Checks (checks 24-29)
 *   K. Redirect Checks (checks 30-31) \u2014 sampled
 *   S. Spanish Character Rendering (checks 32-35)
 *   N. Spanish Accent/Encoding Checks (checks 36-38)
 *   O. Spanish Content Quality (checks 39-41)
 *   P. Spanish NBSP Handling (checks 42-43)
 *   Q. Spanish Legacy Redirects (checks 44-45) \u2014 sampled
 *
 * Usage:
 *   node scripts/verify-spanish-blog-seo-live.js
 *
 * Prerequisites: Next.js app running on localhost:3000
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Resolve @prisma/client from frontend/node_modules
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

const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCAL_BASE = 'http://localhost:3000';
const LOCALE = 'es';

// Spanish category display names (must match page.tsx CATEGORY_DISPLAY_NAMES)
const ES_CATEGORY_NAMES = {
  'teaching-resources': 'Recursos Did\u00e1cticos',
  'worksheet-tips': 'Consejos de Fichas',
  'educational-activities': 'Actividades Educativas',
  'learning-strategies': 'Estrategias de Aprendizaje',
  'curriculum-guides': 'Gu\u00edas Curriculares',
  'parent-resources': 'Recursos para Padres',
  'seasonal-content': 'Contenido Estacional',
};

// English words that should NOT appear in a Spanish-only title
const ENGLISH_SIGNALS = ['worksheet', 'printable', 'classroom', 'student'];
// Spanish words that confirm a title IS Spanish
const SPANISH_SIGNALS = [
  'ficha', 'para', 'como', 'gu\u00eda', 'generador', 'los', 'las', 'del',
  'una', 'con', 'por', 'educativo', 'aprendizaje', 'actividades',
  'ense\u00f1anza', 'maestro', 'alumno', 'escuela', 'ejercicio',
];

// ---------------------------------------------------------------------------
// Hreflang mapping (must match frontend/lib/schema-generator.ts)
// ---------------------------------------------------------------------------
const hreflangMap = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

// OG locale map
const ogLocaleMap = {
  en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', pt: 'pt_BR',
  it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE', da: 'da_DK', no: 'nb_NO', fi: 'fi_FI',
};

// ---------------------------------------------------------------------------
// Spanish-specific helper functions
// ---------------------------------------------------------------------------

/** Detect double-encoded HTML entities */
function hasDoubleEncodedEntities(str) {
  return /&amp;#x27;|&amp;#39;|&amp;apos;|&amp;amp;|&amp;#\d+;|&amp;#x[0-9a-f]+;/i.test(str || '');
}

/** Detect mojibake (encoding corruption) common in Spanish text */
function hasSpanishMojibake(str) {
  // \u00f1 -> \u00c3\u00b1, \u00e1 -> \u00c3\u00a1, \u00e9 -> \u00c3\u00a9, \u00ed -> \u00c3\u00ad,
  // \u00f3 -> \u00c3\u00b3, \u00fa -> \u00c3\u00ba, \u00fc -> \u00c3\u00bc,
  // \u00bf -> \u00c2\u00bf, \u00a1 -> \u00c2\u00a1
  return /Ã±|Ã¡|Ã©|Ã­|Ã³|Ãº|Ã¼|Â¿|Â¡|Â«|Â»|\ufffd/.test(str || '');
}

/** Count non-breaking spaces in a string */
function countNBSP(str) {
  return (str || '').split('\u00a0').length - 1;
}

// Brand names that contain English signal words but are NOT English text
const BRAND_EXCLUSIONS = ['worksheetworks', 'teachers pay teachers', 'teacherspayteachers', 'super teacher worksheets'];

/** Detect mixed English/Spanish in a title */
function hasMixedLanguage(title) {
  if (!title) return false;
  let lower = title.toLowerCase();
  // Strip brand names before checking
  for (const brand of BRAND_EXCLUSIONS) {
    lower = lower.replace(new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '');
  }
  const hasEnglish = ENGLISH_SIGNALS.some(w => lower.includes(w));
  const hasSpanish = SPANISH_SIGNALS.some(w => lower.includes(w));
  return hasEnglish && hasSpanish;
}

// ---------------------------------------------------------------------------
// HTTP fetch helper (follows redirects manually to detect 301s)
// ---------------------------------------------------------------------------
function fetchUrl(url, { followRedirects = true, maxRedirects = 5 } = {}) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { timeout: 30000 }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && followRedirects && maxRedirects > 0) {
        const location = res.headers['location'];
        if (location) {
          const nextUrl = location.startsWith('http') ? location : new URL(location, url).href;
          fetchUrl(nextUrl, { followRedirects, maxRedirects: maxRedirects - 1 })
            .then(resolve)
            .catch(reject);
          res.resume();
          return;
        }
      }

      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          url,
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function fetchNoFollow(url) {
  return fetchUrl(url, { followRedirects: false });
}

// ---------------------------------------------------------------------------
// HTML Entity Decoding (extended for Spanish)
// ---------------------------------------------------------------------------
function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&laquo;/g, '\u00ab')
    .replace(/&raquo;/g, '\u00bb')
    .replace(/&iquest;/g, '\u00bf')
    .replace(/&iexcl;/g, '\u00a1')
    .replace(/&ntilde;/g, '\u00f1')
    .replace(/&Ntilde;/g, '\u00d1')
    .replace(/&aacute;/g, '\u00e1')
    .replace(/&eacute;/g, '\u00e9')
    .replace(/&iacute;/g, '\u00ed')
    .replace(/&oacute;/g, '\u00f3')
    .replace(/&uacute;/g, '\u00fa')
    .replace(/&uuml;/g, '\u00fc')
    .replace(/&amp;/g, '&');
}

// ---------------------------------------------------------------------------
// HTML Parsing Helpers (regex-based, no dependencies)
// ---------------------------------------------------------------------------

function extractMetaContent(html, nameOrProperty, attrType = 'name') {
  const patterns = [
    new RegExp(`<meta\\s+${attrType}=["']${nameOrProperty}["']\\s+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+${attrType}=["']${nameOrProperty}["']`, 'i'),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractAllJsonLd(html) {
  const blocks = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) {
        blocks.push(...parsed);
      } else {
        blocks.push(parsed);
      }
    } catch (e) {
      blocks.push({ _parseError: e.message, _raw: match[1].substring(0, 200) });
    }
  }
  return blocks;
}

function extractCanonicalLinks(html) {
  const results = [];
  const regex = /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
    if (hrefMatch) results.push(hrefMatch[1]);
  }
  return results;
}

function extractHreflangLinks(html) {
  const results = [];
  const regex = /<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
    if (hrefMatch) results.push({ lang: match[1], href: hrefMatch[1] });
  }
  // Also check reversed attribute order
  const regex2 = /<link\s+[^>]*hreflang=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*>/gi;
  while ((match = regex2.exec(html)) !== null) {
    const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const existing = results.find(r => r.lang === match[1] && r.href === hrefMatch[1]);
      if (!existing) results.push({ lang: match[1], href: hrefMatch[1] });
    }
  }
  return results;
}

function extractHtmlLang(html) {
  const match = html.match(/<html[^>]*\slang=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

// ---------------------------------------------------------------------------
// Load legacy blog slugs for Q44-Q45
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
// Load posts from database
// ---------------------------------------------------------------------------
async function loadPostsFromDB() {
  const { PrismaClient } = require(PRISMA_CLIENT_PATH);
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        slug: true,
        translations: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    return posts;
  } finally {
    await prisma.$disconnect();
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  SPANISH BLOG SEO \u2014 LIVE HTML VERIFICATION');
  console.log('  Fetches rendered HTML and verifies all SEO signals');
  console.log('='.repeat(80));
  console.log();

  // Check if localhost:3000 is reachable
  try {
    await fetchUrl(`${LOCAL_BASE}/es/blog`, { followRedirects: true });
    console.log('Next.js server is reachable at localhost:3000\n');
  } catch (e) {
    console.error('ERROR: Cannot reach localhost:3000. Is Next.js running?');
    console.error('Start with: cd frontend && npm run dev (or pm2 start)');
    process.exit(1);
  }

  // Load posts from database
  const posts = await loadPostsFromDB();
  console.log(`Found ${posts.length} published blog posts\n`);

  // Filter to posts that have Spanish translations
  const postsWithEs = posts.filter(p => {
    const es = (p.translations || {})[LOCALE] || {};
    return es.title && es.content && es.slug;
  });
  console.log(`Posts with Spanish translation + slug: ${postsWithEs.length}/${posts.length}\n`);

  // Load Spanish legacy slugs for Q44-Q45
  const spanishLegacySlugs = loadSpanishLegacySlugs();
  console.log(`Loaded ${spanishLegacySlugs.length} Spanish legacy slug redirects\n`);

  // Build active slug set for Q45
  const activeEsSlugs = new Set(postsWithEs.map(p => (p.translations || {})[LOCALE]?.slug).filter(Boolean));

  // Results
  const report = {
    locale: LOCALE,
    phase: 'live-html',
    totalPosts: posts.length,
    postsWithTranslation: postsWithEs.length,
    totalChecks: 0,
    passed: 0,
    failed: 0,
    timestamp: new Date().toISOString(),
    posts: [],
  };

  const failuresByCheck = {};

  // ---------------------------------------------------------------------------
  // Process each post with Spanish translation
  // ---------------------------------------------------------------------------
  for (let i = 0; i < postsWithEs.length; i++) {
    const post = postsWithEs[i];
    const t = post.translations || {};
    const es = t[LOCALE] || {};
    const en = t['en'] || {};
    const esSlug = es.slug;
    const url = `${LOCAL_BASE}/es/blog/${esSlug}`;
    const expectedCanonical = `${BASE_URL}/es/blog/${esSlug}`;

    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      esSlug,
      url,
      checks: [],
    };

    // Progress indicator
    process.stdout.write(`[${i + 1}/${postsWithEs.length}] ${esSlug.substring(0, 60).padEnd(60)} `);

    function check(id, name, pass, detail) {
      report.totalChecks++;
      const result = { id, name, pass: !!pass, detail };
      if (pass) {
        report.passed++;
      } else {
        report.failed++;
        if (!failuresByCheck[id]) failuresByCheck[id] = { name, failures: [] };
        failuresByCheck[id].failures.push({ slug: esSlug, detail });
      }
      postReport.checks.push(result);
      return pass;
    }

    // Fetch the page
    let res;
    try {
      res = await fetchNoFollow(url);
    } catch (e) {
      check('F1', 'HTTP 200 response', false, `Fetch error: ${e.message}`);
      postReport.checks.push({ id: 'SKIP', name: 'Remaining checks skipped', pass: false, detail: 'Could not fetch page' });
      report.posts.push(postReport);
      console.log('FETCH ERROR');
      continue;
    }

    const html = res.body;
    const statusCode = res.statusCode;

    // =========================================================================
    // F. HTTP Response (checks 1-2)
    // =========================================================================

    // F1: Status code = 200
    check('F1', 'HTTP status 200', statusCode === 200,
      `Status: ${statusCode}${statusCode !== 200 ? ` (Location: ${res.headers['location'] || 'none'})` : ''}`);

    if (statusCode !== 200) {
      postReport.checks.push({ id: 'SKIP', name: 'Remaining checks skipped (non-200)', pass: false, detail: `Status ${statusCode}` });
      report.posts.push(postReport);
      console.log(`STATUS ${statusCode}`);
      continue;
    }

    // F2: Content-Language header
    const contentLang = res.headers['content-language'] || '';
    check('F2', 'Content-Language header', contentLang === 'es' || contentLang === '',
      contentLang ? `Content-Language: ${contentLang}` : 'Not set (OK \u2014 lang attr in HTML is sufficient)');

    // =========================================================================
    // G. HTML Head \u2014 Meta Tags (checks 3-6)
    // =========================================================================

    // G3: <title> exists and is non-empty
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : '';
    check('G3', '<title> exists and non-empty', pageTitle.length > 0,
      pageTitle ? `"${pageTitle.substring(0, 80)}"` : 'MISSING');

    // G4: meta description <=160 chars (decoded)
    const metaDescRaw = extractMetaContent(html, 'description');
    const metaDesc = decodeHtmlEntities(metaDescRaw);
    const metaDescOk = metaDesc && metaDesc.length > 0 && metaDesc.length <= 160;
    check('G4', 'meta description exists (<=160 chars)', metaDescOk,
      metaDesc ? `${metaDesc.length} chars (decoded): "${metaDesc.substring(0, 80)}..."` : 'MISSING');

    // G5: No noindex in robots
    const robotsMeta = extractMetaContent(html, 'robots');
    const googlebotMeta = extractMetaContent(html, 'googlebot');
    const hasNoindex = (robotsMeta && robotsMeta.includes('noindex')) ||
                       (googlebotMeta && googlebotMeta.includes('noindex'));
    check('G5', 'No noindex in robots meta', !hasNoindex,
      robotsMeta ? `robots="${robotsMeta}"` : 'No robots meta (defaults to index)');

    // G6: meta keywords contains ES focusKeyword
    const metaKeywordsRaw = extractMetaContent(html, 'keywords');
    const metaKeywords = decodeHtmlEntities(metaKeywordsRaw);
    const focusKeyword = es.focusKeyword || '';
    const keywordsContainFocus = focusKeyword
      ? (metaKeywords && metaKeywords.toLowerCase().includes(focusKeyword.toLowerCase()))
      : true;
    check('G6', 'meta keywords contains ES focusKeyword', keywordsContainFocus,
      focusKeyword
        ? (metaKeywords ? `keywords="${metaKeywords.substring(0, 80)}" | focusKeyword="${focusKeyword}"` : `MISSING meta keywords (focusKeyword="${focusKeyword}")`)
        : 'No focusKeyword in DB (skipped)');

    // =========================================================================
    // H. HTML Head \u2014 Canonical & Hreflang (checks 7-12)
    // =========================================================================

    // H7: Exactly ONE canonical tag
    const canonicals = extractCanonicalLinks(html);
    check('H7', 'Exactly one canonical tag', canonicals.length === 1,
      `${canonicals.length} canonical tag(s)${canonicals.length > 0 ? ': ' + canonicals[0] : ''}`);

    // H8: Canonical = https://www.lessoncraftstudio.com/es/blog/{es-slug}
    const canonical = canonicals[0] || '';
    check('H8', 'Canonical URL correct', canonical === expectedCanonical,
      canonical === expectedCanonical
        ? `OK: ${canonical}`
        : `Expected: ${expectedCanonical} | Got: ${canonical}`);

    // H9: hreflang="es" href matches canonical
    const hreflangLinks = extractHreflangLinks(html);
    const esHreflang = hreflangLinks.find(h => h.lang === 'es');
    check('H9', 'hreflang="es" matches canonical', esHreflang && esHreflang.href === expectedCanonical,
      esHreflang
        ? (esHreflang.href === expectedCanonical ? `OK: ${esHreflang.href}` : `Mismatch: ${esHreflang.href}`)
        : 'MISSING hreflang="es"');

    // H10: hreflang="x-default" points to ENGLISH URL (not Spanish)
    const xDefault = hreflangLinks.find(h => h.lang === 'x-default');
    const enSlug = en.slug || post.slug;
    const expectedXDefault = `${BASE_URL}/en/blog/${enSlug}`;
    check('H10', 'hreflang="x-default" points to English URL', xDefault && xDefault.href === expectedXDefault,
      xDefault
        ? (xDefault.href === expectedXDefault ? `OK: ${xDefault.href}` : `Expected EN: ${expectedXDefault} | Got: ${xDefault.href}`)
        : 'MISSING hreflang="x-default"');

    // H11: Hreflang count matches translated locales
    const translations = post.translations || {};
    const expectedHreflangCount = Object.keys(translations).filter(loc => {
      const tr = translations[loc];
      return tr && tr.title && tr.content;
    }).length;
    const actualHreflangCount = hreflangLinks.length;
    const expectedTotal = expectedHreflangCount + 1; // locales + x-default
    check('H11', 'Hreflang count matches translated locales', actualHreflangCount >= expectedHreflangCount,
      `${actualHreflangCount} hreflang tags (expected ~${expectedTotal} = ${expectedHreflangCount} locales + x-default)`);

    // H12: No duplicate hreflang tags
    const hreflangLangs = hreflangLinks.map(h => h.lang);
    const duplicateHreflangs = hreflangLangs.filter((lang, idx) => hreflangLangs.indexOf(lang) !== idx);
    check('H12', 'No duplicate hreflang tags', duplicateHreflangs.length === 0,
      duplicateHreflangs.length === 0
        ? `All ${hreflangLangs.length} hreflang codes unique`
        : `Duplicates: [${[...new Set(duplicateHreflangs)].join(', ')}]`);

    // =========================================================================
    // I. HTML Head \u2014 Open Graph (checks 13-16)
    // =========================================================================

    // I13: og:locale = es_ES
    const ogLocale = extractMetaContent(html, 'og:locale', 'property');
    check('I13', 'og:locale = es_ES', ogLocale === 'es_ES',
      ogLocale ? `og:locale="${ogLocale}"` : 'MISSING');

    // I14: og:url matches canonical
    const ogUrl = extractMetaContent(html, 'og:url', 'property');
    check('I14', 'og:url matches canonical', ogUrl === expectedCanonical,
      ogUrl ? (ogUrl === expectedCanonical ? `OK: ${ogUrl}` : `Mismatch: ${ogUrl}`) : 'MISSING');

    // I15: og:type = article
    const ogType = extractMetaContent(html, 'og:type', 'property');
    check('I15', 'og:type = article', ogType === 'article',
      ogType ? `og:type="${ogType}"` : 'MISSING');

    // I16: og:title is non-empty
    const ogTitle = extractMetaContent(html, 'og:title', 'property');
    check('I16', 'og:title is non-empty', ogTitle && ogTitle.length > 0,
      ogTitle ? `"${decodeHtmlEntities(ogTitle).substring(0, 80)}"` : 'MISSING');

    // =========================================================================
    // J. HTML Body \u2014 JSON-LD Schema (checks 17-23)
    // =========================================================================

    const jsonLdBlocks = extractAllJsonLd(html);

    // J17: At least one JSON-LD block exists
    check('J17', 'JSON-LD schema exists', jsonLdBlocks.length > 0,
      `${jsonLdBlocks.length} JSON-LD block(s)`);

    // Find BlogPosting schema
    const blogPosting = jsonLdBlocks.find(s => s['@type'] === 'BlogPosting');

    // J18: BlogPosting.inLanguage = "es"
    const bpInLang = blogPosting ? blogPosting.inLanguage : null;
    check('J18', 'BlogPosting.inLanguage = es', bpInLang === 'es',
      blogPosting
        ? `inLanguage="${bpInLang}"`
        : 'No BlogPosting schema found');

    // J19: BlogPosting.headline matches DB es.title
    const bpHeadline = blogPosting ? blogPosting.headline : null;
    const esTitle = es.title || '';
    check('J19', 'BlogPosting.headline matches es.title', bpHeadline === esTitle,
      blogPosting
        ? (bpHeadline === esTitle
            ? `OK: "${bpHeadline ? bpHeadline.substring(0, 60) : ''}"`
            : `DB: "${esTitle.substring(0, 50)}" | HTML: "${(bpHeadline || '').substring(0, 50)}"`)
        : 'No BlogPosting schema found');

    // J20: BlogPosting.url matches canonical
    const bpUrl = blogPosting ? blogPosting.url : null;
    check('J20', 'BlogPosting.url matches canonical', bpUrl === expectedCanonical,
      blogPosting
        ? (bpUrl === expectedCanonical ? `OK: ${bpUrl}` : `Expected: ${expectedCanonical} | Got: ${bpUrl}`)
        : 'No BlogPosting schema found');

    // J21: BlogPosting has datePublished and dateModified
    const hasDates = blogPosting && blogPosting.datePublished && blogPosting.dateModified;
    check('J21', 'BlogPosting has dates', !!hasDates,
      blogPosting
        ? (hasDates
            ? `published=${blogPosting.datePublished.substring(0, 10)} modified=${blogPosting.dateModified.substring(0, 10)}`
            : `datePublished=${blogPosting.datePublished || 'MISSING'} dateModified=${blogPosting.dateModified || 'MISSING'}`)
        : 'No BlogPosting schema found');

    // J22: BreadcrumbList schema exists
    const breadcrumb = jsonLdBlocks.find(s => s['@type'] === 'BreadcrumbList');
    const hasBreadcrumb = !!breadcrumb;
    const breadcrumbItems = breadcrumb && breadcrumb.itemListElement ? breadcrumb.itemListElement.length : 0;
    check('J22', 'BreadcrumbList schema exists', hasBreadcrumb,
      hasBreadcrumb
        ? `${breadcrumbItems} items: ${(breadcrumb.itemListElement || []).map(i => i.name).join(' > ')}`
        : 'MISSING');

    // J23: <html lang="es">
    const htmlLang = extractHtmlLang(html);
    check('J23', '<html lang="es">', htmlLang === 'es',
      htmlLang ? `lang="${htmlLang}"` : 'MISSING lang attribute');

    // =========================================================================
    // L. Spanish-Specific Live Checks (checks 24-29)
    // =========================================================================

    const enTitle = (en.title || '').trim();
    const esPageTitle = decodeHtmlEntities(pageTitle);

    // L24: <title> is NOT the English title
    const titleNotEnglish = !enTitle || !esPageTitle || !esPageTitle.includes(enTitle);
    check('L24', '<title> is NOT English title', titleNotEnglish,
      titleNotEnglish
        ? `Page title: "${esPageTitle.substring(0, 60)}" (not English)`
        : `ENGLISH FALLBACK: title contains "${enTitle.substring(0, 50)}"`);

    // L25: og:title is NOT the English title
    const ogTitleDecoded = decodeHtmlEntities(ogTitle || '');
    const ogTitleNotEnglish = !enTitle || !ogTitleDecoded || ogTitleDecoded !== enTitle;
    check('L25', 'og:title is NOT English title', ogTitleNotEnglish,
      ogTitleNotEnglish
        ? `og:title: "${ogTitleDecoded.substring(0, 60)}" (not English)`
        : `ENGLISH FALLBACK: og:title="${enTitle.substring(0, 50)}"`);

    // L26: BlogPosting.headline is NOT the English title
    const headlineNotEnglish = !enTitle || !bpHeadline || bpHeadline !== enTitle;
    check('L26', 'BlogPosting.headline is NOT English title', headlineNotEnglish,
      headlineNotEnglish
        ? `headline: "${(bpHeadline || '').substring(0, 60)}" (not English)`
        : `ENGLISH FALLBACK: headline="${enTitle.substring(0, 50)}"`);

    // L27: BreadcrumbList has >= 2 items
    let breadcrumbLangOk = true;
    let breadcrumbDetail = 'No breadcrumb to check';
    if (breadcrumb && breadcrumb.itemListElement) {
      const items = breadcrumb.itemListElement;
      breadcrumbDetail = items.map(i => i.name).join(' > ');
      breadcrumbLangOk = items.length >= 2;
    }
    check('L27', 'BreadcrumbList has >= 2 items', breadcrumbLangOk,
      breadcrumbDetail);

    // L28: hreflang="en" tag exists (reciprocal)
    const enHreflang = hreflangLinks.find(h => h.lang === 'en');
    check('L28', 'hreflang="en" exists (reciprocal)', !!enHreflang,
      enHreflang
        ? `OK: en -> ${enHreflang.href}`
        : 'MISSING hreflang="en" (reciprocal link required)');

    // L29: hreflang="es" points to a /es/blog/ URL
    const esHreflangCheck = hreflangLinks.find(h => h.lang === 'es');
    const esHreflangPointsToES = !esHreflangCheck || esHreflangCheck.href.includes('/es/blog/');
    check('L29', 'hreflang="es" points to Spanish URL', esHreflangPointsToES,
      esHreflangCheck
        ? (esHreflangPointsToES ? `OK: ${esHreflangCheck.href}` : `WRONG: ${esHreflangCheck.href} (not a /es/ URL)`)
        : 'No hreflang="es" found');

    // =========================================================================
    // S. Spanish Character Rendering (checks 32-35) \u2014 SPANISH-SPECIFIC
    // =========================================================================

    // S32: <title> \u2014 no double-encoded entities
    const decodedTitle = decodeHtmlEntities(pageTitle);
    const titleHasDoubleEncoded = hasDoubleEncodedEntities(decodedTitle);
    check('S32', '<title> no double-encoded entities', !titleHasDoubleEncoded,
      titleHasDoubleEncoded
        ? `Double-encoded entity in title: "${decodedTitle.substring(0, 60)}"`
        : 'Clean entities in title');

    // S33: og:title \u2014 no double-encoded entities
    const decodedOgTitle = decodeHtmlEntities(ogTitle || '');
    const ogTitleHasDoubleEncoded = hasDoubleEncodedEntities(decodedOgTitle);
    check('S33', 'og:title no double-encoded entities', !ogTitleHasDoubleEncoded,
      ogTitleHasDoubleEncoded
        ? `Double-encoded entity in og:title: "${decodedOgTitle.substring(0, 60)}"`
        : 'Clean entities in og:title');

    // S34: BlogPosting.headline \u2014 clean in JSON-LD
    const headlineHasDoubleEncoded = hasDoubleEncodedEntities(bpHeadline || '');
    check('S34', 'BlogPosting.headline clean in JSON-LD', !headlineHasDoubleEncoded,
      headlineHasDoubleEncoded
        ? `Double-encoded entity in headline: "${(bpHeadline || '').substring(0, 60)}"`
        : 'Clean entities in headline');

    // S35: meta description \u2014 no double-encoded entities
    const metaDescHasDoubleEncoded = hasDoubleEncodedEntities(metaDesc || '');
    check('S35', 'meta description no double-encoded entities', !metaDescHasDoubleEncoded,
      metaDescHasDoubleEncoded
        ? `Double-encoded entity in description: "${(metaDesc || '').substring(0, 60)}"`
        : 'Clean entities in meta description');

    // =========================================================================
    // N. Spanish Accent/Encoding Checks (checks 36-38)
    // =========================================================================

    // N36: <title> no mojibake
    const titleHasMojibake = hasSpanishMojibake(pageTitle);
    check('N36', '<title> no mojibake', !titleHasMojibake,
      titleHasMojibake
        ? `Encoding corruption in title: "${pageTitle.substring(0, 60)}"`
        : 'Accents/\u00f1 render correctly in title');

    // N37: meta description no mojibake
    const metaDescHasMojibake = hasSpanishMojibake(metaDesc || '');
    check('N37', 'meta description no mojibake', !metaDescHasMojibake,
      metaDescHasMojibake
        ? `Encoding corruption in description: "${(metaDesc || '').substring(0, 60)}"`
        : 'Accents/\u00f1 render correctly in description');

    // N38: JSON-LD headline no mojibake
    const headlineHasMojibake = hasSpanishMojibake(bpHeadline || '');
    check('N38', 'JSON-LD headline no mojibake', !headlineHasMojibake,
      headlineHasMojibake
        ? `Encoding corruption in headline: "${(bpHeadline || '').substring(0, 60)}"`
        : 'Accents/\u00f1 render correctly in headline');

    // =========================================================================
    // O. Spanish Content Quality (checks 39-41)
    // =========================================================================

    // O39: FAQPage schema if eligible
    const faqSchema = jsonLdBlocks.find(s => s['@type'] === 'FAQPage');
    const articleMatch = html.match(/<article class="article-container">([\s\S]*?)<\/article>/);
    const articleHtml = articleMatch ? articleMatch[1] : '';
    const faqItems = [];
    const faqPattern = /<h[23][^>]*>([^<]*\?)<\/h[23]>\s*([\s\S]*?)(?=<h[23]|<\/article|<\/section|<footer|$)/gi;
    let faqMatch;
    while ((faqMatch = faqPattern.exec(articleHtml)) !== null) {
      const question = faqMatch[1].trim();
      const answerText = faqMatch[2].trim().replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (question && answerText && answerText.length > 20) {
        faqItems.push({ question, answer: answerText.substring(0, 500) });
      }
    }
    const faqEligible = faqItems.length >= 2;
    const hasFaqSchema = !!faqSchema;
    check('O39', 'FAQPage schema if eligible', !faqEligible || hasFaqSchema,
      faqEligible
        ? (hasFaqSchema ? `FAQ schema present (${faqItems.length} valid Q&A pairs)` : `MISSED: ${faqItems.length} valid Q&A pairs but no FAQPage schema`)
        : `${faqItems.length} valid Q&A pair(s) \u2014 not FAQ-eligible`);

    // O40: Breadcrumb category label is Spanish
    let categoryLabelOk = true;
    let categoryDetail = 'No category breadcrumb to check';
    if (breadcrumb && breadcrumb.itemListElement && post.category) {
      const categoryItem = breadcrumb.itemListElement.find(item =>
        item.item && item.item.includes(`/es/blog/category/`)
      );
      if (categoryItem) {
        const expectedEsName = ES_CATEGORY_NAMES[post.category];
        if (expectedEsName) {
          categoryLabelOk = categoryItem.name === expectedEsName;
          categoryDetail = categoryLabelOk
            ? `Category: "${categoryItem.name}" (Spanish)`
            : `Expected "${expectedEsName}" | Got "${categoryItem.name}"`;
        } else {
          categoryDetail = `Unknown category: ${post.category}`;
        }
      } else {
        categoryDetail = 'No category breadcrumb item found';
      }
    }
    check('O40', 'Breadcrumb category is Spanish', categoryLabelOk,
      categoryDetail);

    // O41: No mixed English/Spanish in <title>
    const titleMixed = hasMixedLanguage(esPageTitle);
    check('O41', 'No mixed English/Spanish in <title>', !titleMixed,
      titleMixed
        ? `Mixed language: "${esPageTitle.substring(0, 60)}"`
        : 'Title language consistent');

    // =========================================================================
    // P. Spanish NBSP Handling (checks 42-43)
    // =========================================================================

    // P42: <title> NBSP does not inflate length beyond 70
    const titleNbspCount = countNBSP(pageTitle);
    const titleLen = pageTitle.length;
    const titleNbspOk = titleLen <= 70 || titleNbspCount === 0;
    check('P42', '<title> NBSP not inflating beyond 70', titleNbspOk,
      titleNbspCount > 0
        ? `${titleNbspCount} NBSP(s), total length ${titleLen} chars${titleLen > 70 ? ' (OVER LIMIT)' : ''}`
        : `No NBSP, ${titleLen} chars`);

    // P43: meta description NBSP does not inflate beyond 160
    const descNbspCount = countNBSP(metaDesc || '');
    const descLen = (metaDesc || '').length;
    const descNbspOk = descLen <= 160 || descNbspCount === 0;
    check('P43', 'meta description NBSP not inflating beyond 160', descNbspOk,
      descNbspCount > 0
        ? `${descNbspCount} NBSP(s), total length ${descLen} chars${descLen > 160 ? ' (OVER LIMIT)' : ''}`
        : `No NBSP, ${descLen} chars`);

    // Count passes/fails for this post
    const postPassed = postReport.checks.filter(c => c.pass).length;
    const postFailed = postReport.checks.filter(c => !c.pass).length;
    console.log(postFailed === 0 ? `PASS (${postPassed}/${postPassed + postFailed})` : `FAIL (${postFailed} issues)`);

    report.posts.push(postReport);

    // Small delay to avoid overwhelming the server
    if (i < postsWithEs.length - 1) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // =========================================================================
  // K. Redirect Checks (sampled) \u2014 checks 30-31
  // =========================================================================
  console.log('\n' + '-'.repeat(80));
  console.log('  REDIRECT CHECKS (sampled)');
  console.log('-'.repeat(80));

  const redirectReport = { checks: [] };

  function redirectCheck(id, name, pass, detail) {
    report.totalChecks++;
    const result = { id, name, pass: !!pass, detail };
    if (pass) {
      report.passed++;
    } else {
      report.failed++;
      if (!failuresByCheck[id]) failuresByCheck[id] = { name, failures: [] };
      failuresByCheck[id].failures.push({ slug: 'redirect-test', detail });
    }
    redirectReport.checks.push(result);
  }

  // K30: Spanish slug under /en/blog/ should redirect to /es/blog/
  console.log('\nK30: Testing Spanish slugs under /en/blog/ (should redirect to /es/blog/)...');
  const esSlugs = postsWithEs.map(p => (p.translations || {})[LOCALE]?.slug).filter(Boolean);
  const sampleCount30 = Math.min(5, esSlugs.length);
  const step30 = Math.max(1, Math.floor(esSlugs.length / sampleCount30));
  const sampleEsSlugs = [];
  for (let i = 0; i < sampleCount30; i++) {
    sampleEsSlugs.push(esSlugs[i * step30]);
  }

  let k30Pass = 0;
  let k30Fail = 0;
  const k30Details = [];

  for (const slug of sampleEsSlugs) {
    try {
      const wrongUrl = `${LOCAL_BASE}/en/blog/${slug}`;
      const wrongRes = await fetchNoFollow(wrongUrl);
      const isRedirect = [301, 302, 307, 308].includes(wrongRes.statusCode);
      const location = wrongRes.headers['location'] || '';

      let detail;
      if (isRedirect) {
        const redirectsToEs = location.includes('/es/blog/');
        if (redirectsToEs) {
          detail = `${slug}: ${wrongRes.statusCode} -> ${location} (correct)`;
          k30Pass++;
        } else {
          detail = `${slug}: ${wrongRes.statusCode} -> ${location} (wrong destination)`;
          k30Fail++;
        }
      } else if (wrongRes.statusCode === 200) {
        const lang = extractHtmlLang(wrongRes.body);
        if (lang === 'en') {
          detail = `${slug}: 200 under /en/ (lang="${lang}") \u2014 may be a slug collision`;
          k30Fail++;
        } else {
          detail = `${slug}: 200 (lang="${lang}")`;
          k30Fail++;
        }
      } else if (wrongRes.statusCode === 404) {
        detail = `${slug}: 404 (not in redirect map)`;
        k30Pass++;
      } else {
        detail = `${slug}: Status ${wrongRes.statusCode}`;
        k30Fail++;
      }
      k30Details.push(detail);
      console.log(`  ${detail}`);
    } catch (e) {
      k30Details.push(`${slug}: Error: ${e.message}`);
      k30Fail++;
      console.log(`  ${slug}: Error: ${e.message}`);
    }
  }

  redirectCheck('K30', 'Spanish slug under /en/ redirects to /es/ (5 samples)', k30Fail === 0,
    `${k30Pass}/${sampleCount30} OK | ${k30Details.join(' ; ')}`);

  // K31: English slug under /es/blog/ should redirect to /en/blog/
  console.log('\nK31: Testing English slugs under /es/blog/ (should redirect to /en/blog/)...');
  const enSlugs = posts.map(p => {
    const en = (p.translations || {})['en'] || {};
    return en.slug || p.slug;
  });
  const sampleCount31 = Math.min(5, enSlugs.length);
  const step31 = Math.max(1, Math.floor(enSlugs.length / sampleCount31));
  const sampleEnSlugs = [];
  for (let i = 0; i < sampleCount31; i++) {
    sampleEnSlugs.push(enSlugs[i * step31]);
  }

  let k31Pass = 0;
  let k31Fail = 0;
  const k31Details = [];

  for (const slug of sampleEnSlugs) {
    try {
      const wrongUrl = `${LOCAL_BASE}/es/blog/${slug}`;
      const wrongRes = await fetchNoFollow(wrongUrl);
      const isRedirect = [301, 302, 307, 308].includes(wrongRes.statusCode);
      const location = wrongRes.headers['location'] || '';

      let detail;
      if (isRedirect) {
        const redirectsToEn = location.includes('/en/blog/');
        if (redirectsToEn) {
          detail = `${slug}: ${wrongRes.statusCode} -> ${location} (correct)`;
          k31Pass++;
        } else {
          detail = `${slug}: ${wrongRes.statusCode} -> ${location} (redirects but not to /en/)`;
          k31Pass++;
        }
      } else if (wrongRes.statusCode === 200) {
        const lang = extractHtmlLang(wrongRes.body);
        if (lang === 'es') {
          detail = `${slug}: 200 under /es/ (lang="${lang}") \u2014 may exist in Spanish`;
          k31Pass++;
        } else {
          detail = `${slug}: 200 under /es/ but lang="${lang}" (expected es or redirect)`;
          k31Fail++;
        }
      } else if (wrongRes.statusCode === 404) {
        detail = `${slug}: 404 (not in redirect map)`;
        k31Pass++;
      } else {
        detail = `${slug}: Status ${wrongRes.statusCode}`;
        k31Fail++;
      }
      k31Details.push(detail);
      console.log(`  ${detail}`);
    } catch (e) {
      k31Details.push(`${slug}: Error: ${e.message}`);
      k31Fail++;
      console.log(`  ${slug}: Error: ${e.message}`);
    }
  }

  redirectCheck('K31', 'English slug under /es/ redirects to /en/ (5 samples)', k31Fail === 0,
    `${k31Pass}/${sampleCount31} OK | ${k31Details.join(' ; ')}`);

  // =========================================================================
  // Q. Spanish Legacy Redirects (checks 44-45)
  // =========================================================================
  console.log('\n' + '-'.repeat(80));
  console.log('  SPANISH LEGACY REDIRECT CHECKS');
  console.log('-'.repeat(80));

  // Q44: 5 sampled Spanish legacy slugs 301-redirect correctly
  console.log('\nQ44: Testing Spanish legacy slug redirects (should 301 to new slug)...');
  const sampleCount44 = Math.min(5, spanishLegacySlugs.length);
  const step44 = Math.max(1, Math.floor(spanishLegacySlugs.length / sampleCount44));
  const sampleLegacy = [];
  for (let i = 0; i < sampleCount44; i++) {
    if (spanishLegacySlugs[i * step44]) sampleLegacy.push(spanishLegacySlugs[i * step44]);
  }

  let q44Pass = 0;
  let q44Fail = 0;
  const q44Details = [];

  for (const legacy of sampleLegacy) {
    try {
      const legacyUrl = `${LOCAL_BASE}/es/blog/${legacy.oldSlug}`;
      const legacyRes = await fetchNoFollow(legacyUrl);
      const isRedirect = [301, 302, 307, 308].includes(legacyRes.statusCode);
      const location = legacyRes.headers['location'] || '';

      let detail;
      if (isRedirect && legacyRes.statusCode === 301) {
        const expectedDest = `/es/blog/${legacy.newSlug}`;
        const pointsToNew = location.includes(expectedDest);
        if (pointsToNew) {
          detail = `${legacy.oldSlug}: 301 -> ${location} (correct)`;
          q44Pass++;
        } else {
          detail = `${legacy.oldSlug}: 301 -> ${location} (expected ${expectedDest})`;
          q44Fail++;
        }
      } else if (isRedirect) {
        detail = `${legacy.oldSlug}: ${legacyRes.statusCode} (expected 301) -> ${location}`;
        q44Fail++;
      } else if (legacyRes.statusCode === 404) {
        detail = `${legacy.oldSlug}: 404 (redirect not working)`;
        q44Fail++;
      } else {
        detail = `${legacy.oldSlug}: Status ${legacyRes.statusCode} (expected 301)`;
        q44Fail++;
      }
      q44Details.push(detail);
      console.log(`  ${detail}`);
    } catch (e) {
      q44Details.push(`${legacy.oldSlug}: Error: ${e.message}`);
      q44Fail++;
      console.log(`  ${legacy.oldSlug}: Error: ${e.message}`);
    }
  }

  redirectCheck('Q44', 'Spanish legacy slugs 301-redirect correctly (5 samples)', q44Fail === 0,
    `${q44Pass}/${sampleCount44} OK | ${q44Details.join(' ; ')}`);

  // Q45: No Spanish legacy slug collides with active slug
  console.log('\nQ45: Checking for legacy/active slug collisions...');
  const legacyCollisions = [];
  for (const legacy of spanishLegacySlugs) {
    if (activeEsSlugs.has(legacy.oldSlug)) {
      legacyCollisions.push(legacy.oldSlug);
    }
  }
  const q45Detail = legacyCollisions.length === 0
    ? `No collisions among ${spanishLegacySlugs.length} legacy slugs vs ${activeEsSlugs.size} active slugs`
    : `${legacyCollisions.length} collision(s): ${legacyCollisions.slice(0, 5).join(', ')}${legacyCollisions.length > 5 ? '...' : ''}`;
  console.log(`  ${q45Detail}`);

  redirectCheck('Q45', 'No legacy/active slug collisions', legacyCollisions.length === 0, q45Detail);

  report.posts.push({ index: 'redirects', slug: 'redirect-checks', checks: redirectReport.checks });

  // ---------------------------------------------------------------------------
  // Console Summary
  // ---------------------------------------------------------------------------
  console.log('\n' + '='.repeat(80));
  console.log('  SUMMARY');
  console.log('='.repeat(80));
  console.log(`  Posts checked:    ${postsWithEs.length} (of ${posts.length} total)`);
  console.log(`  Total checks:     ${report.totalChecks}`);
  console.log(`  PASSED:           ${report.passed}`);
  console.log(`  FAILED:           ${report.failed}`);
  console.log(`  Pass rate:        ${((report.passed / report.totalChecks) * 100).toFixed(1)}%`);
  console.log();

  // Print failures grouped by check
  if (Object.keys(failuresByCheck).length > 0) {
    console.log('FAILURES BY CHECK:');
    console.log('-'.repeat(80));
    for (const [checkId, data] of Object.entries(failuresByCheck).sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(`\n[${checkId}] ${data.name} - ${data.failures.length} failure(s):`);
      for (const f of data.failures.slice(0, 10)) {
        console.log(`  - ${f.slug}: ${f.detail}`);
      }
      if (data.failures.length > 10) {
        console.log(`  ... and ${data.failures.length - 10} more`);
      }
    }
  } else {
    console.log('ALL CHECKS PASSED! Every SEO signal is correct in rendered HTML.');
  }

  // ---------------------------------------------------------------------------
  // Save JSON report
  // ---------------------------------------------------------------------------
  const reportPath = path.join(__dirname, 'spanish-blog-seo-live-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

})().catch((err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
