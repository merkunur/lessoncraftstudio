#!/usr/bin/env node
/**
 * Portuguese Blog SEO \u2014 Live HTML Verification Script
 * Verify rendered HTML signals Google actually sees for all Portuguese blog posts
 *
 * Fetches each Portuguese blog post via http://localhost:3000/pt/blog/{pt-slug}
 * and verifies all SEO signals in the rendered HTML output.
 *
 * Checks per post (43 checks):
 *   F. HTTP Response (checks 1-2)
 *   G. HTML Head \u2014 Meta Tags (checks 3-6)
 *   H. HTML Head \u2014 Canonical & Hreflang (checks 7-12)
 *   I. HTML Head \u2014 Open Graph (checks 13-16)
 *   J. HTML Body \u2014 JSON-LD Schema (checks 17-23)
 *   L. Portuguese-Specific Live Checks (checks 24-29)
 *   K. Redirect Checks (checks 30-31) \u2014 sampled
 *   S. Portuguese Character Rendering (checks 32-35)
 *   N. Portuguese Accent/Encoding Checks (checks 36-38)
 *   O. Portuguese Content Quality (checks 39-41)
 *   P. Portuguese NBSP Handling (checks 42-43)
 *   Q. Portuguese Legacy Redirects (checks 44-45) \u2014 sampled
 *
 * Usage:
 *   node scripts/verify-portuguese-blog-seo-live.js
 *
 * Prerequisites: Next.js app running on localhost:3000
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '..', 'frontend');
const PRISMA_CLIENT_PATH = path.join(frontendDir, 'node_modules', '@prisma', 'client');

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
const LOCALE = 'pt';

// Portuguese category display names (from page.tsx)
const PT_CATEGORY_NAMES = {
  'teaching-resources': 'Recursos Did\u00e1ticos',
  'worksheet-tips': 'Dicas de Fichas',
  'educational-activities': 'Atividades Educativas',
  'learning-strategies': 'Estrat\u00e9gias de Aprendizagem',
  'curriculum-guides': 'Guias Curriculares',
  'parent-resources': 'Recursos para Pais',
  'seasonal-content': 'Conte\u00fado Sazonal',
};

const ENGLISH_SIGNALS = ['worksheet', 'printable', 'classroom', 'student'];
const PORTUGUESE_SIGNALS = [
  'ficha', 'para', 'como', 'guia', 'gerador', 'dos', 'das', 'uma',
  'com', 'por', 'educativo', 'aprendizagem', 'atividades',
  'ensino', 'professor', 'aluno', 'escola', 'exerc\u00edcio',
  'conte\u00fado', 'estrat\u00e9gia', 'desenvolvimento', 'trabalho',
];
const BRAND_EXCLUSIONS = ['worksheetworks', 'teachers pay teachers', 'teacherspayteachers', 'super teacher worksheets', 'google classroom'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasDoubleEncodedEntities(str) {
  return /&amp;#x27;|&amp;#39;|&amp;apos;|&amp;amp;|&amp;#\d+;|&amp;#x[0-9a-f]+;/i.test(str || '');
}

function hasPortugueseMojibake(str) {
  return /Ã£|Ãµ|Ã§|Ã¡|Ã©|Ã­|Ã³|Ãº|Ã¢|Ãª|Ã´|Â«|Â»|\ufffd/.test(str || '');
}

function countNBSP(str) {
  return (str || '').split('\u00a0').length - 1;
}

function hasMixedLanguage(title) {
  if (!title) return false;
  let lower = title.toLowerCase();
  for (const brand of BRAND_EXCLUSIONS) {
    lower = lower.replace(new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '');
  }
  const hasEnglish = ENGLISH_SIGNALS.some(w => lower.includes(w));
  const hasPortuguese = PORTUGUESE_SIGNALS.some(w => lower.includes(w));
  return hasEnglish && hasPortuguese;
}

function fetchUrl(url, { followRedirects = true, maxRedirects = 5 } = {}) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { timeout: 30000 }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && followRedirects && maxRedirects > 0) {
        const location = res.headers['location'];
        if (location) {
          const nextUrl = location.startsWith('http') ? location : new URL(location, url).href;
          fetchUrl(nextUrl, { followRedirects, maxRedirects: maxRedirects - 1 })
            .then(resolve).catch(reject);
          res.resume();
          return;
        }
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => { resolve({ statusCode: res.statusCode, headers: res.headers, body, url }); });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function fetchNoFollow(url) { return fetchUrl(url, { followRedirects: false }); }

function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&laquo;/g, '\u00ab').replace(/&raquo;/g, '\u00bb')
    .replace(/&atilde;/g, '\u00e3').replace(/&Atilde;/g, '\u00c3')
    .replace(/&otilde;/g, '\u00f5').replace(/&Otilde;/g, '\u00d5')
    .replace(/&ccedil;/g, '\u00e7').replace(/&Ccedil;/g, '\u00c7')
    .replace(/&aacute;/g, '\u00e1').replace(/&eacute;/g, '\u00e9')
    .replace(/&iacute;/g, '\u00ed').replace(/&oacute;/g, '\u00f3')
    .replace(/&uacute;/g, '\u00fa').replace(/&acirc;/g, '\u00e2')
    .replace(/&ecirc;/g, '\u00ea').replace(/&ocirc;/g, '\u00f4')
    .replace(/&amp;/g, '&');
}

function extractMetaContent(html, nameOrProperty, attrType = 'name') {
  const patterns = [
    new RegExp(`<meta\\s+${attrType}=["']${nameOrProperty}["']\\s+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+${attrType}=["']${nameOrProperty}["']`, 'i'),
  ];
  for (const p of patterns) { const m = html.match(p); if (m) return m[1]; }
  return null;
}

function extractAllJsonLd(html) {
  const blocks = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) blocks.push(...parsed); else blocks.push(parsed);
    } catch (e) { blocks.push({ _parseError: e.message, _raw: match[1].substring(0, 200) }); }
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

async function loadPostsFromDB() {
  const { PrismaClient } = require(PRISMA_CLIENT_PATH);
  const prisma = new PrismaClient();
  try {
    return await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { id: true, slug: true, translations: true, category: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: 'asc' },
    });
  } finally { await prisma.$disconnect(); }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  PORTUGUESE BLOG SEO \u2014 LIVE HTML VERIFICATION');
  console.log('  Fetches rendered HTML and verifies all SEO signals');
  console.log('='.repeat(80));
  console.log();

  try {
    await fetchUrl(`${LOCAL_BASE}/pt/blog`, { followRedirects: true });
    console.log('Next.js server is reachable at localhost:3000\n');
  } catch (e) {
    console.error('ERROR: Cannot reach localhost:3000. Is Next.js running?');
    process.exit(1);
  }

  const posts = await loadPostsFromDB();
  console.log(`Found ${posts.length} published blog posts\n`);

  const postsWithPt = posts.filter(p => {
    const pt = (p.translations || {})[LOCALE] || {};
    return pt.title && pt.content && pt.slug;
  });
  console.log(`Posts with Portuguese translation + slug: ${postsWithPt.length}/${posts.length}\n`);

  const portugueseLegacySlugs = loadPortugueseLegacySlugs();
  console.log(`Loaded ${portugueseLegacySlugs.length} Portuguese legacy slug redirects\n`);

  const activePtSlugs = new Set(postsWithPt.map(p => (p.translations || {})[LOCALE]?.slug).filter(Boolean));

  const report = {
    locale: LOCALE, phase: 'live-html',
    totalPosts: posts.length, postsWithTranslation: postsWithPt.length,
    totalChecks: 0, passed: 0, failed: 0,
    timestamp: new Date().toISOString(), posts: [],
  };

  const failuresByCheck = {};

  for (let i = 0; i < postsWithPt.length; i++) {
    const post = postsWithPt[i];
    const t = post.translations || {};
    const pt = t[LOCALE] || {};
    const en = t['en'] || {};
    const ptSlug = pt.slug;
    const url = `${LOCAL_BASE}/pt/blog/${ptSlug}`;
    const expectedCanonical = `${BASE_URL}/pt/blog/${ptSlug}`;

    const postReport = { index: i + 1, postId: post.id, primarySlug: post.slug, ptSlug, url, checks: [] };

    process.stdout.write(`[${i + 1}/${postsWithPt.length}] ${ptSlug.substring(0, 60).padEnd(60)} `);

    function check(id, name, pass, detail) {
      report.totalChecks++;
      const result = { id, name, pass: !!pass, detail };
      if (pass) { report.passed++; }
      else {
        report.failed++;
        if (!failuresByCheck[id]) failuresByCheck[id] = { name, failures: [] };
        failuresByCheck[id].failures.push({ slug: ptSlug, detail });
      }
      postReport.checks.push(result);
      return pass;
    }

    let res;
    try { res = await fetchNoFollow(url); }
    catch (e) {
      check('F1', 'HTTP 200 response', false, `Fetch error: ${e.message}`);
      report.posts.push(postReport);
      console.log('FETCH ERROR');
      continue;
    }

    const html = res.body;
    const statusCode = res.statusCode;

    // F. HTTP Response (1-2)
    check('F1', 'HTTP status 200', statusCode === 200,
      `Status: ${statusCode}${statusCode !== 200 ? ` (Location: ${res.headers['location'] || 'none'})` : ''}`);

    if (statusCode !== 200) {
      report.posts.push(postReport);
      console.log(`STATUS ${statusCode}`);
      continue;
    }

    const contentLang = res.headers['content-language'] || '';
    check('F2', 'Content-Language header', contentLang === 'pt' || contentLang === '',
      contentLang ? `Content-Language: ${contentLang}` : 'Not set (OK)');

    // G. Meta Tags (3-6)
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : '';
    check('G3', '<title> exists and non-empty', pageTitle.length > 0,
      pageTitle ? `"${pageTitle.substring(0, 80)}"` : 'MISSING');

    const metaDescRaw = extractMetaContent(html, 'description');
    const metaDesc = decodeHtmlEntities(metaDescRaw);
    check('G4', 'meta description exists (<=160 chars)', metaDesc && metaDesc.length > 0 && metaDesc.length <= 160,
      metaDesc ? `${metaDesc.length} chars` : 'MISSING');

    const robotsMeta = extractMetaContent(html, 'robots');
    const googlebotMeta = extractMetaContent(html, 'googlebot');
    const hasNoindex = (robotsMeta && robotsMeta.includes('noindex')) || (googlebotMeta && googlebotMeta.includes('noindex'));
    check('G5', 'No noindex in robots meta', !hasNoindex,
      robotsMeta ? `robots="${robotsMeta}"` : 'No robots meta (defaults to index)');

    const metaKeywordsRaw = extractMetaContent(html, 'keywords');
    const metaKeywords = decodeHtmlEntities(metaKeywordsRaw);
    const focusKeyword = pt.focusKeyword || '';
    const keywordsContainFocus = focusKeyword ? (metaKeywords && metaKeywords.toLowerCase().includes(focusKeyword.toLowerCase())) : true;
    check('G6', 'meta keywords contains PT focusKeyword', keywordsContainFocus,
      focusKeyword
        ? (metaKeywords ? `keywords has focusKeyword="${focusKeyword}"` : `MISSING meta keywords`)
        : 'No focusKeyword in DB (skipped)');

    // H. Canonical & Hreflang (7-12)
    const canonicals = extractCanonicalLinks(html);
    check('H7', 'Exactly one canonical tag', canonicals.length === 1,
      `${canonicals.length} canonical tag(s)${canonicals.length > 0 ? ': ' + canonicals[0] : ''}`);

    const canonical = canonicals[0] || '';
    check('H8', 'Canonical URL correct', canonical === expectedCanonical,
      canonical === expectedCanonical ? `OK: ${canonical}` : `Expected: ${expectedCanonical} | Got: ${canonical}`);

    const hreflangLinks = extractHreflangLinks(html);
    // Portuguese hreflang uses "pt-BR" per schema-generator.ts
    const ptHreflang = hreflangLinks.find(h => h.lang === 'pt-BR');
    check('H9', 'hreflang="pt-BR" matches canonical', ptHreflang && ptHreflang.href === expectedCanonical,
      ptHreflang
        ? (ptHreflang.href === expectedCanonical ? `OK: ${ptHreflang.href}` : `Mismatch: ${ptHreflang.href}`)
        : 'MISSING hreflang="pt-BR"');

    const xDefault = hreflangLinks.find(h => h.lang === 'x-default');
    const enSlug = en.slug || post.slug;
    const expectedXDefault = `${BASE_URL}/en/blog/${enSlug}`;
    check('H10', 'hreflang="x-default" points to English URL', xDefault && xDefault.href === expectedXDefault,
      xDefault
        ? (xDefault.href === expectedXDefault ? `OK: ${xDefault.href}` : `Expected EN: ${expectedXDefault} | Got: ${xDefault.href}`)
        : 'MISSING hreflang="x-default"');

    const translations = post.translations || {};
    const expectedHreflangCount = Object.keys(translations).filter(loc => {
      const tr = translations[loc];
      return tr && tr.title && tr.content;
    }).length;
    check('H11', 'Hreflang count matches translated locales', hreflangLinks.length >= expectedHreflangCount,
      `${hreflangLinks.length} hreflang tags (expected ~${expectedHreflangCount + 1})`);

    const hreflangLangs = hreflangLinks.map(h => h.lang);
    const duplicateHreflangs = hreflangLangs.filter((lang, idx) => hreflangLangs.indexOf(lang) !== idx);
    check('H12', 'No duplicate hreflang tags', duplicateHreflangs.length === 0,
      duplicateHreflangs.length === 0 ? `All ${hreflangLangs.length} unique` : `Duplicates: [${[...new Set(duplicateHreflangs)].join(', ')}]`);

    // I. Open Graph (13-16)
    const ogLocale = extractMetaContent(html, 'og:locale', 'property');
    check('I13', 'og:locale = pt_BR', ogLocale === 'pt_BR',
      ogLocale ? `og:locale="${ogLocale}"` : 'MISSING');

    const ogUrl = extractMetaContent(html, 'og:url', 'property');
    check('I14', 'og:url matches canonical', ogUrl === expectedCanonical,
      ogUrl ? (ogUrl === expectedCanonical ? `OK` : `Mismatch: ${ogUrl}`) : 'MISSING');

    const ogType = extractMetaContent(html, 'og:type', 'property');
    check('I15', 'og:type = article', ogType === 'article',
      ogType ? `og:type="${ogType}"` : 'MISSING');

    const ogTitle = extractMetaContent(html, 'og:title', 'property');
    check('I16', 'og:title is non-empty', ogTitle && ogTitle.length > 0,
      ogTitle ? `"${decodeHtmlEntities(ogTitle).substring(0, 80)}"` : 'MISSING');

    // J. JSON-LD Schema (17-23)
    const jsonLdBlocks = extractAllJsonLd(html);
    check('J17', 'JSON-LD schema exists', jsonLdBlocks.length > 0, `${jsonLdBlocks.length} block(s)`);

    const blogPosting = jsonLdBlocks.find(s => s['@type'] === 'BlogPosting');
    const bpInLang = blogPosting ? blogPosting.inLanguage : null;
    check('J18', 'BlogPosting.inLanguage = pt or pt-BR', bpInLang === 'pt' || bpInLang === 'pt-BR',
      blogPosting ? `inLanguage="${bpInLang}"` : 'No BlogPosting');

    const bpHeadline = blogPosting ? blogPosting.headline : null;
    const ptTitle = pt.title || '';
    check('J19', 'BlogPosting.headline matches pt.title', bpHeadline === ptTitle,
      blogPosting
        ? (bpHeadline === ptTitle ? `OK: "${(bpHeadline || '').substring(0, 60)}"` : `DB: "${ptTitle.substring(0, 50)}" | HTML: "${(bpHeadline || '').substring(0, 50)}"`)
        : 'No BlogPosting');

    const bpUrl = blogPosting ? blogPosting.url : null;
    check('J20', 'BlogPosting.url matches canonical', bpUrl === expectedCanonical,
      blogPosting ? (bpUrl === expectedCanonical ? `OK` : `Got: ${bpUrl}`) : 'No BlogPosting');

    const hasDates = blogPosting && blogPosting.datePublished && blogPosting.dateModified;
    check('J21', 'BlogPosting has dates', !!hasDates,
      blogPosting
        ? (hasDates ? `published=${blogPosting.datePublished.substring(0, 10)}` : 'Missing dates')
        : 'No BlogPosting');

    const breadcrumb = jsonLdBlocks.find(s => s['@type'] === 'BreadcrumbList');
    const breadcrumbItems = breadcrumb && breadcrumb.itemListElement ? breadcrumb.itemListElement.length : 0;
    check('J22', 'BreadcrumbList schema exists', !!breadcrumb,
      breadcrumb ? `${breadcrumbItems} items: ${(breadcrumb.itemListElement || []).map(i => i.name).join(' > ')}` : 'MISSING');

    const htmlLang = extractHtmlLang(html);
    check('J23', '<html lang="pt" or "pt-BR">', htmlLang === 'pt' || htmlLang === 'pt-BR',
      htmlLang ? `lang="${htmlLang}"` : 'MISSING lang');

    // L. Portuguese-Specific Live Checks (24-29)
    const enTitle = (en.title || '').trim();
    const ptPageTitle = decodeHtmlEntities(pageTitle);

    check('L24', '<title> is NOT English title', !enTitle || !ptPageTitle || !ptPageTitle.includes(enTitle),
      (!enTitle || !ptPageTitle || !ptPageTitle.includes(enTitle))
        ? `Page title: "${ptPageTitle.substring(0, 60)}"`
        : `ENGLISH FALLBACK: "${enTitle.substring(0, 50)}"`);

    const ogTitleDecoded = decodeHtmlEntities(ogTitle || '');
    check('L25', 'og:title is NOT English title', !enTitle || !ogTitleDecoded || ogTitleDecoded !== enTitle,
      (!enTitle || !ogTitleDecoded || ogTitleDecoded !== enTitle) ? 'Not English' : `ENGLISH FALLBACK`);

    check('L26', 'BlogPosting.headline is NOT English title', !enTitle || !bpHeadline || bpHeadline !== enTitle,
      (!enTitle || !bpHeadline || bpHeadline !== enTitle) ? 'Not English' : `ENGLISH FALLBACK`);

    check('L27', 'BreadcrumbList has >= 2 items', !breadcrumb || breadcrumbItems >= 2,
      breadcrumb ? `${breadcrumbItems} items` : 'No breadcrumb');

    const enHreflang = hreflangLinks.find(h => h.lang === 'en');
    check('L28', 'hreflang="en" exists (reciprocal)', !!enHreflang,
      enHreflang ? `OK: en -> ${enHreflang.href}` : 'MISSING');

    const ptHreflangCheck = hreflangLinks.find(h => h.lang === 'pt-BR');
    check('L29', 'hreflang="pt-BR" points to Portuguese URL', !ptHreflangCheck || ptHreflangCheck.href.includes('/pt/blog/'),
      ptHreflangCheck
        ? (ptHreflangCheck.href.includes('/pt/blog/') ? `OK: ${ptHreflangCheck.href}` : `WRONG: ${ptHreflangCheck.href}`)
        : 'No hreflang="pt-BR"');

    // S. Character Rendering (32-35)
    const decodedTitle = decodeHtmlEntities(pageTitle);
    check('S32', '<title> no double-encoded entities', !hasDoubleEncodedEntities(decodedTitle),
      hasDoubleEncodedEntities(decodedTitle) ? `Double-encoded in title` : 'Clean');

    const decodedOgTitle = decodeHtmlEntities(ogTitle || '');
    check('S33', 'og:title no double-encoded entities', !hasDoubleEncodedEntities(decodedOgTitle),
      hasDoubleEncodedEntities(decodedOgTitle) ? `Double-encoded in og:title` : 'Clean');

    check('S34', 'BlogPosting.headline clean in JSON-LD', !hasDoubleEncodedEntities(bpHeadline || ''),
      hasDoubleEncodedEntities(bpHeadline || '') ? `Double-encoded in headline` : 'Clean');

    check('S35', 'meta description no double-encoded entities', !hasDoubleEncodedEntities(metaDesc || ''),
      hasDoubleEncodedEntities(metaDesc || '') ? `Double-encoded in description` : 'Clean');

    // N. Accent/Encoding (36-38)
    check('N36', '<title> no mojibake', !hasPortugueseMojibake(pageTitle),
      hasPortugueseMojibake(pageTitle) ? `Corruption in title: "${pageTitle.substring(0, 60)}"` : 'Accents/\u00e3/\u00f5/\u00e7 OK');

    check('N37', 'meta description no mojibake', !hasPortugueseMojibake(metaDesc || ''),
      hasPortugueseMojibake(metaDesc || '') ? `Corruption in description` : 'Accents/\u00e3/\u00f5/\u00e7 OK');

    check('N38', 'JSON-LD headline no mojibake', !hasPortugueseMojibake(bpHeadline || ''),
      hasPortugueseMojibake(bpHeadline || '') ? `Corruption in headline` : 'Accents/\u00e3/\u00f5/\u00e7 OK');

    // O. Content Quality (39-41)
    const faqSchema = jsonLdBlocks.find(s => s['@type'] === 'FAQPage');
    const articleMatch = html.match(/<article class="article-container">([\s\S]*?)<\/article>/);
    const articleHtml = articleMatch ? articleMatch[1] : '';
    const faqItems = [];
    const faqPattern = /<h[23][^>]*>([^<]*\?)<\/h[23]>\s*([\s\S]*?)(?=<h[23]|<\/article|<\/section|<footer|$)/gi;
    let faqMatch;
    while ((faqMatch = faqPattern.exec(articleHtml)) !== null) {
      const question = faqMatch[1].trim();
      const answerText = faqMatch[2].trim().replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (question && answerText && answerText.length > 20) faqItems.push({ question, answer: answerText.substring(0, 500) });
    }
    const faqEligible = faqItems.length >= 2;
    check('O39', 'FAQPage schema if eligible', !faqEligible || !!faqSchema,
      faqEligible
        ? (faqSchema ? `FAQ schema present (${faqItems.length} pairs)` : `MISSED: ${faqItems.length} pairs`)
        : `${faqItems.length} pair(s) \u2014 not eligible`);

    let categoryLabelOk = true;
    let categoryDetail = 'No category breadcrumb';
    if (breadcrumb && breadcrumb.itemListElement && post.category) {
      const categoryItem = breadcrumb.itemListElement.find(item => item.item && item.item.includes(`/pt/blog/category/`));
      if (categoryItem) {
        const expectedPtName = PT_CATEGORY_NAMES[post.category];
        if (expectedPtName) {
          categoryLabelOk = categoryItem.name === expectedPtName;
          categoryDetail = categoryLabelOk ? `"${categoryItem.name}" (Portuguese)` : `Expected "${expectedPtName}" | Got "${categoryItem.name}"`;
        } else { categoryDetail = `Unknown category: ${post.category}`; }
      } else { categoryDetail = 'No category item found'; }
    }
    check('O40', 'Breadcrumb category is Portuguese', categoryLabelOk, categoryDetail);

    check('O41', 'No mixed English/Portuguese in <title>', !hasMixedLanguage(ptPageTitle),
      hasMixedLanguage(ptPageTitle) ? `Mixed: "${ptPageTitle.substring(0, 60)}"` : 'Language consistent');

    // P. NBSP (42-43)
    const titleNbspCount = countNBSP(pageTitle);
    check('P42', '<title> NBSP not inflating beyond 70', pageTitle.length <= 70 || titleNbspCount === 0,
      titleNbspCount > 0 ? `${titleNbspCount} NBSP(s), ${pageTitle.length} chars` : `No NBSP, ${pageTitle.length} chars`);

    const descNbspCount = countNBSP(metaDesc || '');
    check('P43', 'meta description NBSP not inflating beyond 160', (metaDesc || '').length <= 160 || descNbspCount === 0,
      descNbspCount > 0 ? `${descNbspCount} NBSP(s), ${(metaDesc || '').length} chars` : `No NBSP, ${(metaDesc || '').length} chars`);

    const postPassed = postReport.checks.filter(c => c.pass).length;
    const postFailed = postReport.checks.filter(c => !c.pass).length;
    console.log(postFailed === 0 ? `PASS (${postPassed}/${postPassed + postFailed})` : `FAIL (${postFailed} issues)`);
    report.posts.push(postReport);

    if (i < postsWithPt.length - 1) await new Promise(r => setTimeout(r, 100));
  }

  // K. Redirect Checks (30-31)
  console.log('\n' + '-'.repeat(80));
  console.log('  REDIRECT CHECKS (sampled)');
  console.log('-'.repeat(80));

  const redirectReport = { checks: [] };
  function redirectCheck(id, name, pass, detail) {
    report.totalChecks++;
    const result = { id, name, pass: !!pass, detail };
    if (pass) report.passed++; else {
      report.failed++;
      if (!failuresByCheck[id]) failuresByCheck[id] = { name, failures: [] };
      failuresByCheck[id].failures.push({ slug: 'redirect-test', detail });
    }
    redirectReport.checks.push(result);
  }

  // K30: Portuguese slug under /en/blog/
  console.log('\nK30: Testing Portuguese slugs under /en/blog/...');
  const ptSlugs = postsWithPt.map(p => (p.translations || {})[LOCALE]?.slug).filter(Boolean);
  const sampleCount30 = Math.min(5, ptSlugs.length);
  const step30 = Math.max(1, Math.floor(ptSlugs.length / sampleCount30));
  let k30Pass = 0, k30Fail = 0;
  const k30Details = [];
  for (let si = 0; si < sampleCount30; si++) {
    const slug = ptSlugs[si * step30];
    try {
      const wrongRes = await fetchNoFollow(`${LOCAL_BASE}/en/blog/${slug}`);
      const isRedirect = [301, 302, 307, 308].includes(wrongRes.statusCode);
      const location = wrongRes.headers['location'] || '';
      if (isRedirect && location.includes('/pt/blog/')) { k30Pass++; k30Details.push(`${slug}: ${wrongRes.statusCode} -> correct`); }
      else if (wrongRes.statusCode === 404) { k30Pass++; k30Details.push(`${slug}: 404`); }
      else { k30Fail++; k30Details.push(`${slug}: ${wrongRes.statusCode}`); }
      console.log(`  ${k30Details[k30Details.length - 1]}`);
    } catch (e) { k30Fail++; k30Details.push(`${slug}: Error`); console.log(`  ${slug}: Error`); }
  }
  redirectCheck('K30', 'Portuguese slug under /en/ redirects (5 samples)', k30Fail === 0, `${k30Pass}/${sampleCount30} OK`);

  // K31: English slug under /pt/blog/
  console.log('\nK31: Testing English slugs under /pt/blog/...');
  const enSlugs = posts.map(p => (p.translations || {})['en']?.slug || p.slug);
  const sampleCount31 = Math.min(5, enSlugs.length);
  const step31 = Math.max(1, Math.floor(enSlugs.length / sampleCount31));
  let k31Pass = 0, k31Fail = 0;
  const k31Details = [];
  for (let si = 0; si < sampleCount31; si++) {
    const slug = enSlugs[si * step31];
    try {
      const wrongRes = await fetchNoFollow(`${LOCAL_BASE}/pt/blog/${slug}`);
      const isRedirect = [301, 302, 307, 308].includes(wrongRes.statusCode);
      const lang = wrongRes.statusCode === 200 ? extractHtmlLang(wrongRes.body) : null;
      if (isRedirect) { k31Pass++; k31Details.push(`${slug}: ${wrongRes.statusCode} redirect`); }
      else if (wrongRes.statusCode === 200 && lang === 'pt') { k31Pass++; k31Details.push(`${slug}: 200 pt`); }
      else if (wrongRes.statusCode === 404) { k31Pass++; k31Details.push(`${slug}: 404`); }
      else { k31Fail++; k31Details.push(`${slug}: ${wrongRes.statusCode} lang=${lang}`); }
      console.log(`  ${k31Details[k31Details.length - 1]}`);
    } catch (e) { k31Fail++; k31Details.push(`${slug}: Error`); console.log(`  ${slug}: Error`); }
  }
  redirectCheck('K31', 'English slug under /pt/ redirects (5 samples)', k31Fail === 0, `${k31Pass}/${sampleCount31} OK`);

  // Q. Legacy Redirects (44-45)
  console.log('\n' + '-'.repeat(80));
  console.log('  PORTUGUESE LEGACY REDIRECT CHECKS');
  console.log('-'.repeat(80));

  console.log('\nQ44: Testing Portuguese legacy slug redirects...');
  const sampleCount44 = Math.min(5, portugueseLegacySlugs.length);
  const step44 = Math.max(1, Math.floor(portugueseLegacySlugs.length / sampleCount44));
  let q44Pass = 0, q44Fail = 0;
  const q44Details = [];
  for (let si = 0; si < sampleCount44; si++) {
    const legacy = portugueseLegacySlugs[si * step44];
    if (!legacy) continue;
    try {
      const legacyRes = await fetchNoFollow(`${LOCAL_BASE}/pt/blog/${legacy.oldSlug}`);
      const location = legacyRes.headers['location'] || '';
      if (legacyRes.statusCode === 301 && location.includes(`/pt/blog/${legacy.newSlug}`)) {
        q44Pass++; q44Details.push(`${legacy.oldSlug}: 301 correct`);
      } else { q44Fail++; q44Details.push(`${legacy.oldSlug}: ${legacyRes.statusCode}`); }
      console.log(`  ${q44Details[q44Details.length - 1]}`);
    } catch (e) { q44Fail++; q44Details.push(`${legacy.oldSlug}: Error`); console.log(`  ${legacy.oldSlug}: Error`); }
  }
  redirectCheck('Q44', 'Portuguese legacy slugs 301-redirect (5 samples)', q44Fail === 0, `${q44Pass}/${sampleCount44} OK`);

  console.log('\nQ45: Checking for legacy/active slug collisions...');
  const legacyCollisions = portugueseLegacySlugs.filter(l => activePtSlugs.has(l.oldSlug));
  const q45Detail = legacyCollisions.length === 0
    ? `No collisions among ${portugueseLegacySlugs.length} legacy vs ${activePtSlugs.size} active`
    : `${legacyCollisions.length} collision(s)`;
  console.log(`  ${q45Detail}`);
  redirectCheck('Q45', 'No legacy/active slug collisions', legacyCollisions.length === 0, q45Detail);

  report.posts.push({ index: 'redirects', slug: 'redirect-checks', checks: redirectReport.checks });

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('  SUMMARY');
  console.log('='.repeat(80));
  console.log(`  Posts checked:    ${postsWithPt.length} (of ${posts.length} total)`);
  console.log(`  Total checks:     ${report.totalChecks}`);
  console.log(`  PASSED:           ${report.passed}`);
  console.log(`  FAILED:           ${report.failed}`);
  console.log(`  Pass rate:        ${((report.passed / report.totalChecks) * 100).toFixed(1)}%`);
  console.log();

  if (Object.keys(failuresByCheck).length > 0) {
    console.log('FAILURES BY CHECK:');
    console.log('-'.repeat(80));
    for (const [checkId, data] of Object.entries(failuresByCheck).sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(`\n[${checkId}] ${data.name} - ${data.failures.length} failure(s):`);
      for (const f of data.failures.slice(0, 10)) console.log(`  - ${f.slug}: ${f.detail}`);
      if (data.failures.length > 10) console.log(`  ... and ${data.failures.length - 10} more`);
    }
  } else {
    console.log('ALL CHECKS PASSED! Every SEO signal is correct in rendered HTML.');
  }

  const reportPath = path.join(__dirname, 'portuguese-blog-seo-live-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
})().catch((err) => { console.error('FATAL ERROR:', err); process.exit(1); });
