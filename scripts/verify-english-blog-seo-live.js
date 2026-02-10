#!/usr/bin/env node
/**
 * English Blog SEO — Live HTML Verification Script
 * Part 1 Phase 2: Verify rendered HTML signals Google actually sees
 *
 * Fetches each English blog post via http://localhost:3000/en/blog/{slug}
 * and verifies all SEO signals in the rendered HTML output.
 *
 * Checks per post (25 checks):
 *   F. HTTP Response (checks 1-2)
 *   G. HTML Head — Meta Tags (checks 3-6)
 *   H. HTML Head — Canonical & Hreflang (checks 7-12)
 *   I. HTML Head — Open Graph (checks 13-16)
 *   J. HTML Body — JSON-LD Schema (checks 17-23)
 *   K. Redirect Checks (checks 24-25) — sampled
 *
 * Usage:
 *   node scripts/verify-english-blog-seo-live.js
 *
 * Prerequisites: Next.js app running on localhost:3000
 */

const http = require('http');
const https = require('https');
const { execSync } = require('child_process');
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

const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCAL_BASE = 'http://localhost:3000';
const LOCALE = 'en';

// ---------------------------------------------------------------------------
// Hreflang mapping (must match frontend/lib/schema-generator.ts)
// ---------------------------------------------------------------------------
const hreflangMap = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

// ---------------------------------------------------------------------------
// HTTP fetch helper (follows redirects manually to detect 301s)
// ---------------------------------------------------------------------------
function fetchUrl(url, { followRedirects = true, maxRedirects = 5 } = {}) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { timeout: 30000 }, (res) => {
      // If redirect and we should follow
      if ([301, 302, 307, 308].includes(res.statusCode) && followRedirects && maxRedirects > 0) {
        const location = res.headers['location'];
        if (location) {
          // Resolve relative URLs
          const nextUrl = location.startsWith('http') ? location : new URL(location, url).href;
          fetchUrl(nextUrl, { followRedirects, maxRedirects: maxRedirects - 1 })
            .then(resolve)
            .catch(reject);
          res.resume(); // drain the response
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

// Fetch without following redirects (to verify 301 behavior)
function fetchNoFollow(url) {
  return fetchUrl(url, { followRedirects: false });
}

// ---------------------------------------------------------------------------
// HTML Entity Decoding (for comparing HTML-encoded vs raw DB values)
// ---------------------------------------------------------------------------
function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&'); // Must be last
}

// ---------------------------------------------------------------------------
// HTML Parsing Helpers (regex-based, no dependencies)
// ---------------------------------------------------------------------------

function extractTag(html, tagRegex) {
  const match = html.match(tagRegex);
  return match ? match : null;
}

function extractAllMatches(html, regex) {
  const results = [];
  let match;
  const r = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  while ((match = r.exec(html)) !== null) {
    results.push(match);
  }
  return results;
}

function extractMetaContent(html, nameOrProperty, attrType = 'name') {
  // Match both name="x" and property="x" with content="y"
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
      // Could be a single object or array
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
  // Also check reversed attribute order: hreflang before rel
  const regex2 = /<link\s+[^>]*hreflang=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*>/gi;
  while ((match = regex2.exec(html)) !== null) {
    const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      // Avoid duplicates
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
// Load slug list from database via Prisma
// ---------------------------------------------------------------------------
async function loadSlugsFromDB() {
  // Try to load from Phase 1 report first (faster, no DB needed)
  const reportPath = path.join(__dirname, 'english-blog-seo-report.json');
  if (fs.existsSync(reportPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      if (report.posts && report.posts.length > 0) {
        const slugs = report.posts.map(p => ({
          slug: p.primarySlug,
          postId: p.postId,
        }));
        console.log(`Loaded ${slugs.length} slugs from Phase 1 report\n`);
        return slugs;
      }
    } catch (e) {
      console.log('Could not parse Phase 1 report, falling back to DB query');
    }
  }

  // Fallback: query database directly
  const { PrismaClient } = require(PRISMA_CLIENT_PATH);
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { id: true, slug: true, translations: true },
      orderBy: { createdAt: 'asc' },
    });
    const slugs = posts.map(p => {
      const en = (p.translations || {})[LOCALE] || {};
      return {
        slug: en.slug || p.slug,
        postId: p.id,
        enTitle: en.title || '',
        focusKeyword: en.focusKeyword || '',
      };
    });
    console.log(`Loaded ${slugs.length} slugs from database\n`);
    return slugs;
  } finally {
    await prisma.$disconnect();
  }
}

// Load slugs + full DB data for cross-referencing
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
  console.log('  ENGLISH BLOG SEO — LIVE HTML VERIFICATION');
  console.log('  Fetches rendered HTML and verifies all SEO signals');
  console.log('='.repeat(80));
  console.log();

  // Check if localhost:3000 is reachable
  try {
    await fetchUrl(`${LOCAL_BASE}/en/blog`, { followRedirects: true });
    console.log('Next.js server is reachable at localhost:3000\n');
  } catch (e) {
    console.error('ERROR: Cannot reach localhost:3000. Is Next.js running?');
    console.error('Start with: cd frontend && npm run dev (or pm2 start)');
    process.exit(1);
  }

  // Load posts from database (we need DB data for cross-referencing)
  const posts = await loadPostsFromDB();
  console.log(`Found ${posts.length} published blog posts\n`);

  // Build lookup map: slug -> post data
  const postBySlug = new Map();
  for (const post of posts) {
    const en = (post.translations || {})[LOCALE] || {};
    const enSlug = en.slug || post.slug;
    postBySlug.set(enSlug, { ...post, enSlug, enData: en });
  }

  // Results
  const report = {
    locale: LOCALE,
    phase: 'live-html',
    totalPosts: posts.length,
    totalChecks: 0,
    passed: 0,
    failed: 0,
    timestamp: new Date().toISOString(),
    posts: [],
  };

  // Track failures by check ID for summary
  const failuresByCheck = {};

  // ---------------------------------------------------------------------------
  // Process each post
  // ---------------------------------------------------------------------------
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const en = (post.translations || {})[LOCALE] || {};
    const enSlug = en.slug || post.slug;
    const url = `${LOCAL_BASE}/en/blog/${enSlug}`;
    const expectedCanonical = `${BASE_URL}/en/blog/${enSlug}`;

    const postReport = {
      index: i + 1,
      postId: post.id,
      slug: enSlug,
      url,
      checks: [],
    };

    // Progress indicator
    process.stdout.write(`[${i + 1}/${posts.length}] ${enSlug.substring(0, 60).padEnd(60)} `);

    function check(id, name, pass, detail) {
      report.totalChecks++;
      const result = { id, name, pass: !!pass, detail };
      if (pass) {
        report.passed++;
      } else {
        report.failed++;
        if (!failuresByCheck[id]) failuresByCheck[id] = { name, failures: [] };
        failuresByCheck[id].failures.push({ slug: enSlug, detail });
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
      // Skip remaining checks for this post
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
      // Can't check HTML if we got a redirect or error
      postReport.checks.push({ id: 'SKIP', name: 'Remaining checks skipped (non-200)', pass: false, detail: `Status ${statusCode}` });
      report.posts.push(postReport);
      console.log(`STATUS ${statusCode}`);
      continue;
    }

    // F2: Content-Language header (Next.js may or may not set this)
    const contentLang = res.headers['content-language'] || '';
    check('F2', 'Content-Language header', contentLang === 'en' || contentLang === '',
      contentLang ? `Content-Language: ${contentLang}` : 'Not set (OK — lang attr in HTML is sufficient)');

    // =========================================================================
    // G. HTML Head — Meta Tags (checks 3-6)
    // =========================================================================

    // G3: <title> exists and is non-empty
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : '';
    check('G3', '<title> exists and non-empty', pageTitle.length > 0,
      pageTitle ? `"${pageTitle.substring(0, 80)}"` : 'MISSING');

    // G4: <meta name="description"> exists, non-empty, <=160 chars
    // Decode HTML entities for length check — Google sees decoded text, not raw HTML entities
    const metaDescRaw = extractMetaContent(html, 'description');
    const metaDesc = decodeHtmlEntities(metaDescRaw);
    const metaDescOk = metaDesc && metaDesc.length > 0 && metaDesc.length <= 160;
    check('G4', 'meta description exists (<=160 chars)', metaDescOk,
      metaDesc ? `${metaDesc.length} chars (decoded): "${metaDesc.substring(0, 80)}..."` : 'MISSING');

    // G5: <meta name="robots"> does NOT contain "noindex"
    const robotsMeta = extractMetaContent(html, 'robots');
    const googlebotMeta = extractMetaContent(html, 'googlebot');
    const hasNoindex = (robotsMeta && robotsMeta.includes('noindex')) ||
                       (googlebotMeta && googlebotMeta.includes('noindex'));
    check('G5', 'No noindex in robots meta', !hasNoindex,
      robotsMeta ? `robots="${robotsMeta}"` : 'No robots meta (defaults to index)');

    // G6: <meta name="keywords"> contains focusKeyword
    // Decode HTML entities for comparison — &#x27; vs ' etc.
    const metaKeywordsRaw = extractMetaContent(html, 'keywords');
    const metaKeywords = decodeHtmlEntities(metaKeywordsRaw);
    const focusKeyword = en.focusKeyword || '';
    const keywordsContainFocus = focusKeyword
      ? (metaKeywords && metaKeywords.toLowerCase().includes(focusKeyword.toLowerCase()))
      : true; // No focus keyword in DB = skip this check (pass)
    check('G6', 'meta keywords contains focusKeyword', keywordsContainFocus,
      focusKeyword
        ? (metaKeywords ? `keywords="${metaKeywords.substring(0, 80)}" | focusKeyword="${focusKeyword}"` : `MISSING meta keywords (focusKeyword="${focusKeyword}")`)
        : 'No focusKeyword in DB (skipped)');

    // =========================================================================
    // H. HTML Head — Canonical & Hreflang (checks 7-12)
    // =========================================================================

    // H7: Exactly ONE <link rel="canonical"> tag
    const canonicals = extractCanonicalLinks(html);
    check('H7', 'Exactly one canonical tag', canonicals.length === 1,
      `${canonicals.length} canonical tag(s)${canonicals.length > 0 ? ': ' + canonicals[0] : ''}`);

    // H8: Canonical href matches expected URL
    const canonical = canonicals[0] || '';
    check('H8', 'Canonical URL correct', canonical === expectedCanonical,
      canonical === expectedCanonical
        ? `OK: ${canonical}`
        : `Expected: ${expectedCanonical} | Got: ${canonical}`);

    // H9: hreflang="en" matches canonical
    const hreflangLinks = extractHreflangLinks(html);
    const enHreflang = hreflangLinks.find(h => h.lang === 'en');
    check('H9', 'hreflang="en" matches canonical', enHreflang && enHreflang.href === expectedCanonical,
      enHreflang
        ? (enHreflang.href === expectedCanonical ? `OK: ${enHreflang.href}` : `Mismatch: ${enHreflang.href}`)
        : 'MISSING hreflang="en"');

    // H10: hreflang="x-default" matches canonical (English = default)
    const xDefault = hreflangLinks.find(h => h.lang === 'x-default');
    check('H10', 'hreflang="x-default" matches canonical', xDefault && xDefault.href === expectedCanonical,
      xDefault
        ? (xDefault.href === expectedCanonical ? `OK: ${xDefault.href}` : `Mismatch: ${xDefault.href}`)
        : 'MISSING hreflang="x-default"');

    // H11: Hreflang tags exist for all locales that have translations
    const translations = post.translations || {};
    const expectedHreflangCount = Object.keys(translations).filter(loc => {
      const t = translations[loc];
      return t && t.title && t.content;
    }).length;
    // +1 for x-default
    const actualHreflangCount = hreflangLinks.length;
    // Expected: one per translated locale + x-default
    const expectedTotal = expectedHreflangCount + 1; // locales + x-default
    check('H11', 'Hreflang count matches translated locales', actualHreflangCount >= expectedHreflangCount,
      `${actualHreflangCount} hreflang tags (expected ~${expectedTotal} = ${expectedHreflangCount} locales + x-default)`);

    // H12: No duplicate hreflang tags for the same language code
    const hreflangLangs = hreflangLinks.map(h => h.lang);
    const duplicateHreflangs = hreflangLangs.filter((lang, idx) => hreflangLangs.indexOf(lang) !== idx);
    check('H12', 'No duplicate hreflang tags', duplicateHreflangs.length === 0,
      duplicateHreflangs.length === 0
        ? `All ${hreflangLangs.length} hreflang codes unique`
        : `Duplicates: [${[...new Set(duplicateHreflangs)].join(', ')}]`);

    // =========================================================================
    // I. HTML Head — Open Graph (checks 13-16)
    // =========================================================================

    // I13: og:locale = en_US
    const ogLocale = extractMetaContent(html, 'og:locale', 'property');
    check('I13', 'og:locale = en_US', ogLocale === 'en_US',
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
      ogTitle ? `"${ogTitle.substring(0, 80)}"` : 'MISSING');

    // =========================================================================
    // J. HTML Body — JSON-LD Schema (checks 17-23)
    // =========================================================================

    const jsonLdBlocks = extractAllJsonLd(html);

    // J17: At least one JSON-LD block exists
    check('J17', 'JSON-LD schema exists', jsonLdBlocks.length > 0,
      `${jsonLdBlocks.length} JSON-LD block(s)`);

    // Find BlogPosting schema (may be in array or standalone)
    const blogPosting = jsonLdBlocks.find(s => s['@type'] === 'BlogPosting');

    // J18: BlogPosting.inLanguage = "en"
    const bpInLang = blogPosting ? blogPosting.inLanguage : null;
    check('J18', 'BlogPosting.inLanguage = en', bpInLang === 'en',
      blogPosting
        ? `inLanguage="${bpInLang}"`
        : 'No BlogPosting schema found');

    // J19: BlogPosting.headline matches DB en.title
    const bpHeadline = blogPosting ? blogPosting.headline : null;
    const enTitle = en.title || '';
    check('J19', 'BlogPosting.headline matches title', bpHeadline === enTitle,
      blogPosting
        ? (bpHeadline === enTitle
            ? `OK: "${bpHeadline ? bpHeadline.substring(0, 60) : ''}"`
            : `DB: "${enTitle.substring(0, 50)}" | HTML: "${(bpHeadline || '').substring(0, 50)}"`)
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

    // J23: <html lang="en"> attribute
    const htmlLang = extractHtmlLang(html);
    check('J23', '<html lang="en">', htmlLang === 'en',
      htmlLang ? `lang="${htmlLang}"` : 'MISSING lang attribute');

    // Count passes/fails for this post
    const postPassed = postReport.checks.filter(c => c.pass).length;
    const postFailed = postReport.checks.filter(c => !c.pass).length;
    console.log(postFailed === 0 ? `PASS (${postPassed}/${postPassed + postFailed})` : `FAIL (${postFailed} issues)`);

    report.posts.push(postReport);

    // Small delay to avoid overwhelming the server
    if (i < posts.length - 1) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // =========================================================================
  // K. Redirect Checks (sampled, not all 112)
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

  // K24: Old slug redirect test
  // The slug that was changed in Phase 1: "33-editable-worksheet-generators-elementary-teachers"
  // should redirect to the new slug
  console.log('\nK24: Testing old slug redirect...');
  try {
    const oldSlugUrl = `${LOCAL_BASE}/en/blog/33-editable-worksheet-generators-elementary-teachers`;
    const oldSlugRes = await fetchNoFollow(oldSlugUrl);
    const is301 = oldSlugRes.statusCode === 301 || oldSlugRes.statusCode === 308;
    const redirectLocation = oldSlugRes.headers['location'] || '';
    redirectCheck('K24', 'Old slug redirects (301)', is301,
      `Status: ${oldSlugRes.statusCode} | Location: ${redirectLocation || 'none'}`);
    console.log(`  Status: ${oldSlugRes.statusCode} Location: ${redirectLocation || 'none'} ${is301 ? 'PASS' : 'FAIL'}`);
  } catch (e) {
    redirectCheck('K24', 'Old slug redirects (301)', false, `Error: ${e.message}`);
    console.log(`  Error: ${e.message}`);
  }

  // K25: Cross-locale redirect tests (English slug under wrong locale)
  // Pick 5 random English slugs and test them under /de/blog/
  console.log('\nK25: Testing cross-locale redirects (English slug under /de/blog/)...');
  const allSlugs = posts.map(p => {
    const en = (p.translations || {})[LOCALE] || {};
    return en.slug || p.slug;
  });

  // Deterministic sample: pick 5 evenly spaced
  const sampleCount = Math.min(5, allSlugs.length);
  const step = Math.floor(allSlugs.length / sampleCount);
  const sampleSlugs = [];
  for (let i = 0; i < sampleCount; i++) {
    sampleSlugs.push(allSlugs[i * step]);
  }

  let crossLocalePass = 0;
  let crossLocaleFail = 0;
  const crossLocaleDetails = [];

  for (const slug of sampleSlugs) {
    try {
      // An English slug accessed under /de/ should redirect
      const crossUrl = `${LOCAL_BASE}/de/blog/${slug}`;
      const crossRes = await fetchNoFollow(crossUrl);
      const isRedirect = crossRes.statusCode === 301 || crossRes.statusCode === 308 || crossRes.statusCode === 307;
      const location = crossRes.headers['location'] || '';
      // Could also 200 if the slug happens to exist in German too — that's also OK
      const isOk = isRedirect || crossRes.statusCode === 200;

      // But if 200, check that it's actually German content (not English content under /de/)
      let detail;
      if (isRedirect) {
        detail = `${slug}: 301 -> ${location}`;
        crossLocalePass++;
      } else if (crossRes.statusCode === 200) {
        // Check if the HTML lang is "de" — if so, this slug exists in German (OK)
        const lang = extractHtmlLang(crossRes.body);
        if (lang === 'de') {
          detail = `${slug}: 200 (exists in German — OK)`;
          crossLocalePass++;
        } else {
          detail = `${slug}: 200 but lang="${lang}" (should be de or redirect)`;
          crossLocaleFail++;
        }
      } else {
        detail = `${slug}: Status ${crossRes.statusCode}`;
        // 404 is acceptable — slug doesn't exist in German
        if (crossRes.statusCode === 404) {
          crossLocalePass++;
        } else {
          crossLocaleFail++;
        }
      }
      crossLocaleDetails.push(detail);
      console.log(`  ${detail}`);
    } catch (e) {
      crossLocaleDetails.push(`${slug}: Error: ${e.message}`);
      crossLocaleFail++;
      console.log(`  ${slug}: Error: ${e.message}`);
    }
  }

  redirectCheck('K25', 'Cross-locale redirects (5 samples)', crossLocaleFail === 0,
    `${crossLocalePass}/${sampleCount} OK | ${crossLocaleDetails.join(' ; ')}`);

  report.posts.push({ index: 'redirects', slug: 'redirect-checks', checks: redirectReport.checks });

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
  console.log(`  Pass rate:        ${((report.passed / report.totalChecks) * 100).toFixed(1)}%`);
  console.log();

  // Print failures grouped by check
  if (Object.keys(failuresByCheck).length > 0) {
    console.log('FAILURES BY CHECK:');
    console.log('-'.repeat(80));
    for (const [checkId, data] of Object.entries(failuresByCheck).sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(`\n[${checkId}] ${data.name} - ${data.failures.length} failure(s):`);
      for (const f of data.failures.slice(0, 10)) { // Show max 10 per check
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
  const reportPath = path.join(__dirname, 'english-blog-seo-live-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

})().catch((err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
