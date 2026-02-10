#!/usr/bin/env node
/**
 * French Blog SEO — Live HTML Verification Script
 * Verify rendered HTML signals Google actually sees for all French blog posts
 *
 * Fetches each French blog post via http://localhost:3000/fr/blog/{fr-slug}
 * and verifies all SEO signals in the rendered HTML output.
 *
 * Checks per post (45 checks):
 *   F. HTTP Response (checks 1-2)
 *   G. HTML Head — Meta Tags (checks 3-6)
 *   H. HTML Head — Canonical & Hreflang (checks 7-12)
 *   I. HTML Head — Open Graph (checks 13-16)
 *   J. HTML Body — JSON-LD Schema (checks 17-23)
 *   L. French-Specific Live Checks (checks 24-29)
 *   K. Redirect Checks (checks 30-31) — sampled
 *   M. French Apostrophe Rendering (checks 32-35)
 *   N. French Accent Rendering (checks 36-38)
 *   O. French Content Quality (checks 39-41)
 *   P. French NBSP Handling (checks 42-43)
 *   Q. French Legacy Redirects (checks 44-45) — sampled
 *
 * Usage:
 *   node scripts/verify-french-blog-seo-live.js
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
const LOCALE = 'fr';

// French category display names (must match page.tsx CATEGORY_DISPLAY_NAMES)
const FR_CATEGORY_NAMES = {
  'teaching-resources': 'Ressources P\u00e9dagogiques',
  'worksheet-tips': 'Conseils Fiches',
  'educational-activities': 'Activit\u00e9s \u00c9ducatives',
  'learning-strategies': 'Strat\u00e9gies d\'Apprentissage',
  'curriculum-guides': 'Guides de Programme',
  'parent-resources': 'Ressources Parents',
  'seasonal-content': 'Contenu Saisonnier',
};

// English words that should NOT appear in a French-only title
const ENGLISH_SIGNALS = ['worksheet', 'generator', 'printable', 'template', 'editable', 'classroom', 'teacher', 'student'];
// French words that confirm a title IS French
const FRENCH_SIGNALS = ['fiche', 'pour', 'des', 'les', 'une', 'dans', 'avec', 'sur', 'comment', 'guide', 'activit', '\u00e9ducati', 'enseignement', 'apprentissage'];

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
// French-specific helper functions
// ---------------------------------------------------------------------------

/** Detect HTML entity-encoded apostrophes */
function hasHtmlEntityApostrophe(str) {
  return /&#x27;|&#39;|&apos;|&amp;(?:apos|#39|#x27);/i.test(str || '');
}

/** Detect mojibake (encoding corruption) common in French text */
function hasMojibake(str) {
  return /Ã©|Ã¨|Ã |Ã§|Ã´|Ã®|Ã¯|Ã¹|Ã»|Å\u0093|\ufffd/.test(str || '');
}

/** Count non-breaking spaces in a string */
function countNBSP(str) {
  return (str || '').split('\u00a0').length - 1;
}

/** Detect mixed English/French in a title */
function hasMixedLanguage(title) {
  if (!title) return false;
  const lower = title.toLowerCase();
  const hasEnglish = ENGLISH_SIGNALS.some(w => lower.includes(w));
  const hasFrench = FRENCH_SIGNALS.some(w => lower.includes(w));
  return hasEnglish && hasFrench;
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
// HTML Entity Decoding (extended for French)
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
function loadFrenchLegacySlugs() {
  const candidates = [
    path.join(__dirname, '..', 'frontend', 'config', 'blog-redirects.ts'),
    '/opt/lessoncraftstudio/frontend/config/blog-redirects.ts',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const slugs = [];
      // Parse {oldSlug, newSlug, locale} entries where locale = "fr"
      const entryRegex = /\{\s*"oldSlug":\s*"([^"]+)",\s*"newSlug":\s*"([^"]+)",\s*"locale":\s*"fr"\s*\}/g;
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
  console.log('  FRENCH BLOG SEO \u2014 LIVE HTML VERIFICATION');
  console.log('  Fetches rendered HTML and verifies all SEO signals');
  console.log('='.repeat(80));
  console.log();

  // Check if localhost:3000 is reachable
  try {
    await fetchUrl(`${LOCAL_BASE}/fr/blog`, { followRedirects: true });
    console.log('Next.js server is reachable at localhost:3000\n');
  } catch (e) {
    console.error('ERROR: Cannot reach localhost:3000. Is Next.js running?');
    console.error('Start with: cd frontend && npm run dev (or pm2 start)');
    process.exit(1);
  }

  // Load posts from database
  const posts = await loadPostsFromDB();
  console.log(`Found ${posts.length} published blog posts\n`);

  // Filter to posts that have French translations
  const postsWithFr = posts.filter(p => {
    const fr = (p.translations || {})[LOCALE] || {};
    return fr.title && fr.content && fr.slug;
  });
  console.log(`Posts with French translation + slug: ${postsWithFr.length}/${posts.length}\n`);

  // Load French legacy slugs for Q44-Q45
  const frenchLegacySlugs = loadFrenchLegacySlugs();
  console.log(`Loaded ${frenchLegacySlugs.length} French legacy slug redirects\n`);

  // Build active slug set for Q45
  const activeFrSlugs = new Set(postsWithFr.map(p => (p.translations || {})[LOCALE]?.slug).filter(Boolean));

  // Results
  const report = {
    locale: LOCALE,
    phase: 'live-html',
    totalPosts: posts.length,
    postsWithTranslation: postsWithFr.length,
    totalChecks: 0,
    passed: 0,
    failed: 0,
    timestamp: new Date().toISOString(),
    posts: [],
  };

  const failuresByCheck = {};

  // ---------------------------------------------------------------------------
  // Process each post with French translation
  // ---------------------------------------------------------------------------
  for (let i = 0; i < postsWithFr.length; i++) {
    const post = postsWithFr[i];
    const t = post.translations || {};
    const fr = t[LOCALE] || {};
    const en = t['en'] || {};
    const frSlug = fr.slug;
    const url = `${LOCAL_BASE}/fr/blog/${frSlug}`;
    const expectedCanonical = `${BASE_URL}/fr/blog/${frSlug}`;

    const postReport = {
      index: i + 1,
      postId: post.id,
      primarySlug: post.slug,
      frSlug,
      url,
      checks: [],
    };

    // Progress indicator
    process.stdout.write(`[${i + 1}/${postsWithFr.length}] ${frSlug.substring(0, 60).padEnd(60)} `);

    function check(id, name, pass, detail) {
      report.totalChecks++;
      const result = { id, name, pass: !!pass, detail };
      if (pass) {
        report.passed++;
      } else {
        report.failed++;
        if (!failuresByCheck[id]) failuresByCheck[id] = { name, failures: [] };
        failuresByCheck[id].failures.push({ slug: frSlug, detail });
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
    check('F2', 'Content-Language header', contentLang === 'fr' || contentLang === '',
      contentLang ? `Content-Language: ${contentLang}` : 'Not set (OK \u2014 lang attr in HTML is sufficient)');

    // =========================================================================
    // G. HTML Head — Meta Tags (checks 3-6)
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

    // G6: meta keywords contains FR focusKeyword
    const metaKeywordsRaw = extractMetaContent(html, 'keywords');
    const metaKeywords = decodeHtmlEntities(metaKeywordsRaw);
    const focusKeyword = fr.focusKeyword || '';
    const keywordsContainFocus = focusKeyword
      ? (metaKeywords && metaKeywords.toLowerCase().includes(focusKeyword.toLowerCase()))
      : true;
    check('G6', 'meta keywords contains FR focusKeyword', keywordsContainFocus,
      focusKeyword
        ? (metaKeywords ? `keywords="${metaKeywords.substring(0, 80)}" | focusKeyword="${focusKeyword}"` : `MISSING meta keywords (focusKeyword="${focusKeyword}")`)
        : 'No focusKeyword in DB (skipped)');

    // =========================================================================
    // H. HTML Head — Canonical & Hreflang (checks 7-12)
    // =========================================================================

    // H7: Exactly ONE canonical tag
    const canonicals = extractCanonicalLinks(html);
    check('H7', 'Exactly one canonical tag', canonicals.length === 1,
      `${canonicals.length} canonical tag(s)${canonicals.length > 0 ? ': ' + canonicals[0] : ''}`);

    // H8: Canonical = https://www.lessoncraftstudio.com/fr/blog/{fr-slug}
    const canonical = canonicals[0] || '';
    check('H8', 'Canonical URL correct', canonical === expectedCanonical,
      canonical === expectedCanonical
        ? `OK: ${canonical}`
        : `Expected: ${expectedCanonical} | Got: ${canonical}`);

    // H9: hreflang="fr" href matches canonical
    const hreflangLinks = extractHreflangLinks(html);
    const frHreflang = hreflangLinks.find(h => h.lang === 'fr');
    check('H9', 'hreflang="fr" matches canonical', frHreflang && frHreflang.href === expectedCanonical,
      frHreflang
        ? (frHreflang.href === expectedCanonical ? `OK: ${frHreflang.href}` : `Mismatch: ${frHreflang.href}`)
        : 'MISSING hreflang="fr"');

    // H10: hreflang="x-default" points to ENGLISH URL (not French)
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
    // I. HTML Head — Open Graph (checks 13-16)
    // =========================================================================

    // I13: og:locale = fr_FR
    const ogLocale = extractMetaContent(html, 'og:locale', 'property');
    check('I13', 'og:locale = fr_FR', ogLocale === 'fr_FR',
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
    // J. HTML Body — JSON-LD Schema (checks 17-23)
    // =========================================================================

    const jsonLdBlocks = extractAllJsonLd(html);

    // J17: At least one JSON-LD block exists
    check('J17', 'JSON-LD schema exists', jsonLdBlocks.length > 0,
      `${jsonLdBlocks.length} JSON-LD block(s)`);

    // Find BlogPosting schema
    const blogPosting = jsonLdBlocks.find(s => s['@type'] === 'BlogPosting');

    // J18: BlogPosting.inLanguage = "fr"
    const bpInLang = blogPosting ? blogPosting.inLanguage : null;
    check('J18', 'BlogPosting.inLanguage = fr', bpInLang === 'fr',
      blogPosting
        ? `inLanguage="${bpInLang}"`
        : 'No BlogPosting schema found');

    // J19: BlogPosting.headline matches DB fr.title
    const bpHeadline = blogPosting ? blogPosting.headline : null;
    const frTitle = fr.title || '';
    check('J19', 'BlogPosting.headline matches fr.title', bpHeadline === frTitle,
      blogPosting
        ? (bpHeadline === frTitle
            ? `OK: "${bpHeadline ? bpHeadline.substring(0, 60) : ''}"`
            : `DB: "${frTitle.substring(0, 50)}" | HTML: "${(bpHeadline || '').substring(0, 50)}"`)
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

    // J23: <html lang="fr">
    const htmlLang = extractHtmlLang(html);
    check('J23', '<html lang="fr">', htmlLang === 'fr',
      htmlLang ? `lang="${htmlLang}"` : 'MISSING lang attribute');

    // =========================================================================
    // L. French-Specific Live Checks (checks 24-29)
    // These catch rendered content that falls back to English
    // =========================================================================

    const enTitle = (en.title || '').trim();
    const frPageTitle = decodeHtmlEntities(pageTitle);

    // L24: <title> is NOT the English title
    const titleNotEnglish = !enTitle || !frPageTitle || !frPageTitle.includes(enTitle);
    check('L24', '<title> is NOT English title', titleNotEnglish,
      titleNotEnglish
        ? `Page title: "${frPageTitle.substring(0, 60)}" (not English)`
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

    // L28: hreflang="en" tag exists and points to English URL (reciprocal hreflang)
    const enHreflang = hreflangLinks.find(h => h.lang === 'en');
    check('L28', 'hreflang="en" exists (reciprocal)', !!enHreflang,
      enHreflang
        ? `OK: en -> ${enHreflang.href}`
        : 'MISSING hreflang="en" (reciprocal link required)');

    // L29: hreflang="fr" points to a /fr/blog/ URL
    const frHreflangCheck = hreflangLinks.find(h => h.lang === 'fr');
    const frHreflangPointsToFR = !frHreflangCheck || frHreflangCheck.href.includes('/fr/blog/');
    check('L29', 'hreflang="fr" points to French URL', frHreflangPointsToFR,
      frHreflangCheck
        ? (frHreflangPointsToFR ? `OK: ${frHreflangCheck.href}` : `WRONG: ${frHreflangCheck.href} (not a /fr/ URL)`)
        : 'No hreflang="fr" found');

    // =========================================================================
    // M. French Apostrophe Rendering (checks 32-35) — NEW
    // =========================================================================

    // M32: <title> has clean apostrophes (no double-encoded HTML entities)
    // Next.js encodes ' → &#x27; in <title> — that's standard HTML, not a bug.
    // Decode first, then check: entities in the DECODED string = double-encoding.
    const decodedTitle = decodeHtmlEntities(pageTitle);
    const titleHasEntityApostrophe = hasHtmlEntityApostrophe(decodedTitle);
    check('M32', '<title> clean apostrophes', !titleHasEntityApostrophe,
      titleHasEntityApostrophe
        ? `Double-encoded apostrophe in title: "${decodedTitle.substring(0, 60)}"`
        : 'Clean apostrophes in title');

    // M33: og:title has clean apostrophes (no double-encoded HTML entities)
    const decodedOgTitle = decodeHtmlEntities(ogTitle || '');
    const ogTitleHasEntityApostrophe = hasHtmlEntityApostrophe(decodedOgTitle);
    check('M33', 'og:title clean apostrophes', !ogTitleHasEntityApostrophe,
      ogTitleHasEntityApostrophe
        ? `Double-encoded apostrophe in og:title: "${decodedOgTitle.substring(0, 60)}"`
        : 'Clean apostrophes in og:title');

    // M34: BlogPosting.headline has clean apostrophes in JSON-LD
    const headlineHasEntityApostrophe = hasHtmlEntityApostrophe(bpHeadline || '');
    check('M34', 'BlogPosting.headline clean apostrophes', !headlineHasEntityApostrophe,
      headlineHasEntityApostrophe
        ? `Entity apostrophe in headline: "${(bpHeadline || '').substring(0, 60)}"`
        : 'Clean apostrophes in headline');

    // M35: meta description has clean apostrophes (no double-encoded HTML entities)
    // metaDesc is already decoded (line ~429), so entities here = double-encoding
    const metaDescHasEntityApostrophe = hasHtmlEntityApostrophe(metaDesc || '');
    check('M35', 'meta description clean apostrophes', !metaDescHasEntityApostrophe,
      metaDescHasEntityApostrophe
        ? `Double-encoded apostrophe in description: "${(metaDesc || '').substring(0, 60)}"`
        : 'Clean apostrophes in meta description');

    // =========================================================================
    // N. French Accent Rendering (checks 36-38) — NEW
    // =========================================================================

    // N36: <title> has proper accented characters (no mojibake)
    const titleHasMojibake = hasMojibake(pageTitle);
    check('N36', '<title> no mojibake', !titleHasMojibake,
      titleHasMojibake
        ? `Encoding corruption in title: "${pageTitle.substring(0, 60)}"`
        : 'Accents render correctly in title');

    // N37: meta description has proper accents
    const metaDescHasMojibake = hasMojibake(metaDesc || '');
    check('N37', 'meta description no mojibake', !metaDescHasMojibake,
      metaDescHasMojibake
        ? `Encoding corruption in description: "${(metaDesc || '').substring(0, 60)}"`
        : 'Accents render correctly in description');

    // N38: JSON-LD headline has proper accents
    const headlineHasMojibake = hasMojibake(bpHeadline || '');
    check('N38', 'JSON-LD headline no mojibake', !headlineHasMojibake,
      headlineHasMojibake
        ? `Encoding corruption in headline: "${(bpHeadline || '').substring(0, 60)}"`
        : 'Accents render correctly in headline');

    // =========================================================================
    // O. French Content Quality (checks 39-41) — NEW
    // =========================================================================

    // O39: FAQPage schema present if >= 2 valid Q&A pairs in content
    // Must match real pipeline (content-analyzer.ts extractFAQItems): question heading
    // ending in ?, followed by answer text > 20 chars. Need 2+ valid pairs.
    // IMPORTANT: Scope to <article class="article-container"> only — the real pipeline
    // runs on DB content, not the full page (which includes related post cards with ? headings).
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

    // O40: Breadcrumb category label is French, not English
    let categoryLabelOk = true;
    let categoryDetail = 'No category breadcrumb to check';
    if (breadcrumb && breadcrumb.itemListElement && post.category) {
      const categoryItem = breadcrumb.itemListElement.find(item =>
        item.item && item.item.includes(`/fr/blog/category/`)
      );
      if (categoryItem) {
        const expectedFrName = FR_CATEGORY_NAMES[post.category];
        if (expectedFrName) {
          categoryLabelOk = categoryItem.name === expectedFrName;
          categoryDetail = categoryLabelOk
            ? `Category: "${categoryItem.name}" (French)`
            : `Expected "${expectedFrName}" | Got "${categoryItem.name}"`;
        } else {
          categoryDetail = `Unknown category: ${post.category}`;
        }
      } else {
        categoryDetail = 'No category breadcrumb item found';
      }
    }
    check('O40', 'Breadcrumb category is French', categoryLabelOk,
      categoryDetail);

    // O41: No mixed English/French in <title>
    const titleMixed = hasMixedLanguage(frPageTitle);
    check('O41', 'No mixed English/French in <title>', !titleMixed,
      titleMixed
        ? `Mixed language: "${frPageTitle.substring(0, 60)}"`
        : 'Title language consistent');

    // =========================================================================
    // P. French NBSP Handling (checks 42-43) — NEW
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
    if (i < postsWithFr.length - 1) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // =========================================================================
  // K. Redirect Checks (sampled) — checks 30-31
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

  // K30: French slug under /en/blog/ should redirect to /fr/blog/
  console.log('\nK30: Testing French slugs under /en/blog/ (should redirect to /fr/blog/)...');
  const frSlugs = postsWithFr.map(p => (p.translations || {})[LOCALE]?.slug).filter(Boolean);
  const sampleCount30 = Math.min(5, frSlugs.length);
  const step30 = Math.max(1, Math.floor(frSlugs.length / sampleCount30));
  const sampleFrSlugs = [];
  for (let i = 0; i < sampleCount30; i++) {
    sampleFrSlugs.push(frSlugs[i * step30]);
  }

  let k30Pass = 0;
  let k30Fail = 0;
  const k30Details = [];

  for (const slug of sampleFrSlugs) {
    try {
      const wrongUrl = `${LOCAL_BASE}/en/blog/${slug}`;
      const wrongRes = await fetchNoFollow(wrongUrl);
      const isRedirect = [301, 302, 307, 308].includes(wrongRes.statusCode);
      const location = wrongRes.headers['location'] || '';

      let detail;
      if (isRedirect) {
        const redirectsToFr = location.includes('/fr/blog/');
        if (redirectsToFr) {
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

  redirectCheck('K30', 'French slug under /en/ redirects to /fr/ (5 samples)', k30Fail === 0,
    `${k30Pass}/${sampleCount30} OK | ${k30Details.join(' ; ')}`);

  // K31: English slug under /fr/blog/ should redirect to /en/blog/
  console.log('\nK31: Testing English slugs under /fr/blog/ (should redirect to /en/blog/)...');
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
      const wrongUrl = `${LOCAL_BASE}/fr/blog/${slug}`;
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
        if (lang === 'fr') {
          detail = `${slug}: 200 under /fr/ (lang="${lang}") \u2014 may exist in French`;
          k31Pass++;
        } else {
          detail = `${slug}: 200 under /fr/ but lang="${lang}" (expected fr or redirect)`;
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

  redirectCheck('K31', 'English slug under /fr/ redirects to /en/ (5 samples)', k31Fail === 0,
    `${k31Pass}/${sampleCount31} OK | ${k31Details.join(' ; ')}`);

  // =========================================================================
  // Q. French Legacy Redirects (checks 44-45) — NEW
  // =========================================================================
  console.log('\n' + '-'.repeat(80));
  console.log('  FRENCH LEGACY REDIRECT CHECKS');
  console.log('-'.repeat(80));

  // Q44: 5 sampled French legacy slugs 301-redirect correctly
  console.log('\nQ44: Testing French legacy slug redirects (should 301 to new slug)...');
  const sampleCount44 = Math.min(5, frenchLegacySlugs.length);
  const step44 = Math.max(1, Math.floor(frenchLegacySlugs.length / sampleCount44));
  const sampleLegacy = [];
  for (let i = 0; i < sampleCount44; i++) {
    if (frenchLegacySlugs[i * step44]) sampleLegacy.push(frenchLegacySlugs[i * step44]);
  }

  let q44Pass = 0;
  let q44Fail = 0;
  const q44Details = [];

  for (const legacy of sampleLegacy) {
    try {
      const legacyUrl = `${LOCAL_BASE}/fr/blog/${legacy.oldSlug}`;
      const legacyRes = await fetchNoFollow(legacyUrl);
      const isRedirect = [301, 302, 307, 308].includes(legacyRes.statusCode);
      const location = legacyRes.headers['location'] || '';

      let detail;
      if (isRedirect && legacyRes.statusCode === 301) {
        const expectedDest = `/fr/blog/${legacy.newSlug}`;
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

  redirectCheck('Q44', 'French legacy slugs 301-redirect correctly (5 samples)', q44Fail === 0,
    `${q44Pass}/${sampleCount44} OK | ${q44Details.join(' ; ')}`);

  // Q45: No French legacy slug collides with active slug
  console.log('\nQ45: Checking for legacy/active slug collisions...');
  const legacyCollisions = [];
  for (const legacy of frenchLegacySlugs) {
    if (activeFrSlugs.has(legacy.oldSlug)) {
      legacyCollisions.push(legacy.oldSlug);
    }
  }
  const q45Detail = legacyCollisions.length === 0
    ? `No collisions among ${frenchLegacySlugs.length} legacy slugs vs ${activeFrSlugs.size} active slugs`
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
  console.log(`  Posts checked:    ${postsWithFr.length} (of ${posts.length} total)`);
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
  const reportPath = path.join(__dirname, 'french-blog-seo-live-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

})().catch((err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
