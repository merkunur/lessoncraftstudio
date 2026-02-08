#!/usr/bin/env node
/**
 * verify-seo.js — Comprehensive SEO verification for all page types
 *
 * Usage:
 *   node scripts/verify-seo.js homepage <locale>              # Check homepage
 *   node scripts/verify-seo.js homepage all                   # Check all 11 homepages
 *   node scripts/verify-seo.js product <locale>               # Check all products for locale
 *   node scripts/verify-seo.js product <locale> <slug>        # Check one product
 *   node scripts/verify-seo.js blog <locale>                  # Check all blog posts for locale
 *   node scripts/verify-seo.js blog <locale> <slug>           # Check one blog post
 *   node scripts/verify-seo.js blog <locale> --fetch          # Also fetch rendered HTML for sample
 *
 * Options:
 *   --fetch     Also fetch rendered HTML pages (slower, checks schemas/OG)
 *   --json      Output as JSON
 *   --verbose   Show passing checks too (default: only failures)
 *
 * Run on server: cd /opt/lessoncraftstudio && node scripts/verify-seo.js blog en
 */

const path = require('path');
const fs = require('fs');
const http = require('http');

// Resolve Prisma from frontend
const frontendDir = path.resolve(__dirname, '..', 'frontend');
const { PrismaClient } = require(path.join(frontendDir, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION
// ============================================================

const VALID_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCAL_URL = 'http://localhost:3000';

const HREFLANG_MAP = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi'
};

const OG_LOCALE_MAP = {
  en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', pt: 'pt_BR',
  it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE', da: 'da_DK', no: 'no_NO', fi: 'fi_FI'
};

const SEO_RULES = {
  metaTitle: { min: 45, optimal_min: 50, optimal_max: 60, max: 70 },
  metaDescription: { min: 120, optimal_min: 140, optimal_max: 160, max: 170 },
};

// Garbage patterns for blog meta detection
const GARBAGE_TITLE_PATTERNS = [
  /^Free Printable/i,
  /^Kostenlos Druckbar/i, /^Kostenlose Druckbare/i,
  /^Gratuit Imprimable/i, /^Gratuite Imprimable/i,
  /^Gratis Imprimible/i, /^Gratuito Imprimible/i,
  /^Gr[aá]tis Imprim[ií]vel/i,
  /^Gratuito Stampabile/i, /^Gratuita Stampabile/i,
  /^Gratis Afdrukbaar/i, /^Gratis Printbaar/i,
  /^Gratis Utskrivbar/i, /^Gratis Utskrivbara/i,
  /^Gratis Printbar/i, /^Gratis Print/i,
  /^Gratis Utskriftbar/i,
  /^Ilmainen Tulostettava/i, /^Ilmaisia Tulostettavia/i,
  /\.\.\.\s+-\s/, // truncated template with "... -"
];

const GARBAGE_DESC_PATTERNS = [
  /^Download free/i,
  /^Laden Sie kostenlose/i,
  /^T[eé]l[eé]chargez/i,
  /^Descarg[aue] gratis/i,
  /^Baixe gr[aá]tis/i, /^Baixe gratuitamente/i,
  /^Scarica gratis/i, /^Scarica gratuitamente/i,
  /^Download gratis/i,
  /^Ladda ner gratis/i,
  /^Last ned gratis/i,
  /^Lataa ilmaisi/i,
  /worksheets for kindergarten and first grade\. Professional printables/i,
  /Arbeitsbl.*tter f.*r Vorschule und Grundschule herunter/i,
  /pour la maternelle et le primaire/i,
  /para preescolar y primaria/i,
  /para pr.*-escola e ensino fundamental/i,
  /per la scuola materna e primaria/i,
  /voor kleuterschool en basisschool/i,
  /f.*r f.*rskola och grundskola/i,
  /til b.*rnehave og indskoling/i,
  /for barnehage og barneskole/i,
  /esikoulu ja ala-aste/i,
];

const GARBAGE_KEYWORD_PATTERNS = [
  /^free .* worksheets$/i,
  /^kostenlos.* arbeitsbl/i,
  /^gratuit.* fiches/i,
  /^gratis .* hojas/i,
  /^gratis .* schede/i,
  /^gratis .* werkbladen/i,
  /^gratis .* arbetsblad/i,
  /^gratis .* arbeidsark/i,
  /^gratis .* opgaver/i,
  /^gratis .* oppgaver/i,
  /^ilmainen .* ty/i,
];

// ============================================================
// RESULT TRACKING
// ============================================================

class AuditResults {
  constructor() {
    this.results = [];
    this.totals = { pass: 0, fail: 0, warn: 0, info: 0 };
  }

  add(severity, category, item, check, message, details) {
    this.results.push({ severity, category, item, check, message, details });
    if (severity === 'PASS') this.totals.pass++;
    else if (severity === 'FAIL') this.totals.fail++;
    else if (severity === 'WARN') this.totals.warn++;
    else this.totals.info++;
  }

  pass(category, item, check, message) { this.add('PASS', category, item, check, message); }
  fail(category, item, check, message, details) { this.add('FAIL', category, item, check, message, details); }
  warn(category, item, check, message, details) { this.add('WARN', category, item, check, message, details); }
  info(category, item, check, message) { this.add('INFO', category, item, check, message); }

  print(verbose) {
    const failures = this.results.filter(r => r.severity === 'FAIL');
    const warnings = this.results.filter(r => r.severity === 'WARN');

    console.log(`\n${'='.repeat(70)}`);
    console.log(`AUDIT RESULTS`);
    console.log(`${'='.repeat(70)}`);
    console.log(`  PASS: ${this.totals.pass}`);
    console.log(`  FAIL: ${this.totals.fail}`);
    console.log(`  WARN: ${this.totals.warn}`);
    console.log(`  INFO: ${this.totals.info}`);
    console.log(`${'─'.repeat(70)}`);

    if (failures.length > 0) {
      console.log(`\nFAILURES (${failures.length}):`);
      for (const r of failures) {
        console.log(`  [FAIL] ${r.category} | ${r.item} | ${r.check}: ${r.message}`);
        if (r.details) console.log(`         ${r.details}`);
      }
    }

    if (warnings.length > 0) {
      console.log(`\nWARNINGS (${warnings.length}):`);
      for (const r of warnings) {
        console.log(`  [WARN] ${r.category} | ${r.item} | ${r.check}: ${r.message}`);
        if (r.details) console.log(`         ${r.details}`);
      }
    }

    if (verbose) {
      const passes = this.results.filter(r => r.severity === 'PASS');
      if (passes.length > 0) {
        console.log(`\nPASSES (${passes.length}):`);
        for (const r of passes) {
          console.log(`  [PASS] ${r.category} | ${r.item} | ${r.check}: ${r.message}`);
        }
      }
    }

    console.log(`\n${'='.repeat(70)}`);
    if (this.totals.fail === 0 && this.totals.warn === 0) {
      console.log('ALL CHECKS PASSED');
    } else {
      console.log(`${this.totals.fail} failures, ${this.totals.warn} warnings`);
    }
    console.log(`${'='.repeat(70)}\n`);
  }
}

// ============================================================
// HTML FETCHING & PARSING
// ============================================================

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    const url = `${LOCAL_URL}${urlPath}`;
    const req = http.get(url, { timeout: 15000 }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        const redirectPath = loc.startsWith('http') ? new URL(loc).pathname : loc;
        return fetchPage(redirectPath).then(resolve).catch(reject);
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function parseHTML(html) {
  const result = {
    title: '',
    metaDescription: '',
    metaKeywords: '',
    canonical: '',
    robots: '',
    ogTags: {},
    twitterTags: {},
    hreflang: [],
    schemas: [],
    h1: [],
    h2: [],
    statusCode: null,
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) result.title = decodeHTMLEntities(titleMatch[1]);

  // Meta tags
  const metaRegex = /<meta\s+[^>]*>/gi;
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const tag = match[0];
    const name = extractAttr(tag, 'name') || '';
    const property = extractAttr(tag, 'property') || '';
    const content = extractAttr(tag, 'content') || '';

    if (name === 'description') result.metaDescription = decodeHTMLEntities(content);
    if (name === 'keywords') result.metaKeywords = decodeHTMLEntities(content);
    if (name === 'robots') result.robots = content;

    if (property.startsWith('og:')) result.ogTags[property] = decodeHTMLEntities(content);
    if (name.startsWith('twitter:') || property.startsWith('twitter:'))
      result.twitterTags[name || property] = decodeHTMLEntities(content);
  }

  // Canonical
  const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  if (canonicalMatch) result.canonical = canonicalMatch[1];

  // Hreflang
  const hreflangRegex = /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi;
  while ((match = hreflangRegex.exec(html)) !== null) {
    result.hreflang.push({ lang: match[1], href: match[2] });
  }
  // Also check reverse order (href before hreflang)
  const hreflangRegex2 = /<link[^>]+href="([^"]+)"[^>]+hreflang="([^"]+)"/gi;
  while ((match = hreflangRegex2.exec(html)) !== null) {
    const exists = result.hreflang.find(h => h.lang === match[2]);
    if (!exists) result.hreflang.push({ lang: match[2], href: match[1] });
  }

  // JSON-LD schemas
  const schemaRegex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  while ((match = schemaRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) {
        result.schemas.push(...parsed);
      } else if (parsed['@graph']) {
        result.schemas.push(...parsed['@graph']);
      } else {
        result.schemas.push(parsed);
      }
    } catch (e) {
      result.schemas.push({ _parseError: e.message, _raw: match[1].substring(0, 200) });
    }
  }

  // H1 tags
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  while ((match = h1Regex.exec(html)) !== null) {
    result.h1.push(stripTags(match[1]).trim());
  }

  // H2 tags
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  while ((match = h2Regex.exec(html)) !== null) {
    result.h2.push(stripTags(match[1]).trim());
  }

  return result;
}

function extractAttr(tag, attr) {
  const regex = new RegExp(`${attr}="([^"]*)"`, 'i');
  const match = tag.match(regex);
  return match ? match[1] : null;
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '');
}

function decodeHTMLEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

// ============================================================
// COMMON CHECKS (work on parsed HTML)
// ============================================================

function checkParsedMeta(parsed, audit, pageType, item, locale) {
  const cat = 'meta';

  // Title
  if (!parsed.title) {
    audit.fail(cat, item, 'title', 'Missing <title> tag');
  } else {
    const len = parsed.title.length;
    if (len < SEO_RULES.metaTitle.min) {
      audit.fail(cat, item, 'title-length', `Title too short: ${len} chars`, parsed.title.substring(0, 70));
    } else if (len > SEO_RULES.metaTitle.max) {
      audit.warn(cat, item, 'title-length', `Title too long: ${len} chars`, parsed.title.substring(0, 70));
    } else {
      audit.pass(cat, item, 'title-length', `Title OK: ${len} chars`);
    }

    // Check for garbage patterns
    for (const pattern of GARBAGE_TITLE_PATTERNS) {
      if (pattern.test(parsed.title)) {
        audit.fail(cat, item, 'title-garbage', `Title matches garbage pattern: ${pattern}`, parsed.title.substring(0, 60));
        break;
      }
    }
  }

  // Description
  if (!parsed.metaDescription) {
    audit.fail(cat, item, 'description', 'Missing meta description');
  } else {
    const len = parsed.metaDescription.length;
    if (len < SEO_RULES.metaDescription.min) {
      audit.fail(cat, item, 'desc-length', `Description too short: ${len} chars`, parsed.metaDescription.substring(0, 80));
    } else if (len > SEO_RULES.metaDescription.max) {
      audit.warn(cat, item, 'desc-length', `Description too long: ${len} chars`);
    } else {
      audit.pass(cat, item, 'desc-length', `Description OK: ${len} chars`);
    }
  }

  // Canonical
  if (!parsed.canonical) {
    audit.fail(cat, item, 'canonical', 'Missing canonical URL');
  } else {
    if (!parsed.canonical.startsWith('https://')) {
      audit.fail(cat, item, 'canonical-https', `Canonical not HTTPS: ${parsed.canonical}`);
    }
    if (!parsed.canonical.includes('www.lessoncraftstudio.com')) {
      audit.fail(cat, item, 'canonical-domain', `Canonical wrong domain: ${parsed.canonical}`);
    }
    if (parsed.canonical.endsWith('/') && parsed.canonical !== `${BASE_URL}/`) {
      audit.warn(cat, item, 'canonical-trailing-slash', `Canonical has trailing slash: ${parsed.canonical}`);
    }
    audit.pass(cat, item, 'canonical', `Canonical: ${parsed.canonical}`);
  }

  // OG tags
  const requiredOG = ['og:title', 'og:description', 'og:url', 'og:image'];
  for (const tag of requiredOG) {
    if (!parsed.ogTags[tag]) {
      audit.fail('og', item, tag, `Missing ${tag}`);
    } else {
      audit.pass('og', item, tag, `${tag}: ${parsed.ogTags[tag].substring(0, 50)}...`);
    }
  }

  // OG locale
  const expectedOGLocale = OG_LOCALE_MAP[locale];
  if (parsed.ogTags['og:locale'] !== expectedOGLocale) {
    audit.fail('og', item, 'og:locale', `Expected ${expectedOGLocale}, got ${parsed.ogTags['og:locale']}`);
  }

  // OG type
  if (pageType === 'blog') {
    if (parsed.ogTags['og:type'] !== 'article') {
      audit.fail('og', item, 'og:type', `Blog should have og:type=article, got ${parsed.ogTags['og:type']}`);
    }
  }

  // Twitter card
  if (!parsed.twitterTags['twitter:card']) {
    audit.warn('twitter', item, 'card', 'Missing twitter:card');
  }

  // Hreflang
  if (parsed.hreflang.length === 0) {
    audit.fail('hreflang', item, 'missing', 'No hreflang tags found');
  } else {
    // Check all 11 locales + x-default
    const foundLangs = new Set(parsed.hreflang.map(h => h.lang));
    for (const [loc, code] of Object.entries(HREFLANG_MAP)) {
      if (!foundLangs.has(code)) {
        audit.fail('hreflang', item, `missing-${loc}`, `Missing hreflang for ${loc} (${code})`);
      }
    }
    if (!foundLangs.has('x-default')) {
      audit.fail('hreflang', item, 'x-default', 'Missing x-default hreflang');
    } else {
      const xDefault = parsed.hreflang.find(h => h.lang === 'x-default');
      if (xDefault && !xDefault.href.includes('/en/') && !xDefault.href.endsWith('/en')) {
        audit.warn('hreflang', item, 'x-default-en', `x-default should point to English, got: ${xDefault.href}`);
      }
    }
    audit.pass('hreflang', item, 'count', `${parsed.hreflang.length} hreflang tags found`);
  }

  // H1
  if (parsed.h1.length === 0) {
    audit.fail('content', item, 'h1', 'No H1 tag found');
  } else if (parsed.h1.length > 1) {
    audit.warn('content', item, 'h1-multiple', `Multiple H1 tags: ${parsed.h1.length}`);
  } else {
    audit.pass('content', item, 'h1', `H1: ${parsed.h1[0].substring(0, 50)}`);
  }
}

function checkSchemas(parsed, audit, pageType, item, locale) {
  const schemas = parsed.schemas;
  const cat = 'schema';

  if (schemas.length === 0) {
    audit.fail(cat, item, 'missing', 'No JSON-LD schemas found');
    return;
  }

  // Check for parse errors
  const parseErrors = schemas.filter(s => s._parseError);
  for (const err of parseErrors) {
    audit.fail(cat, item, 'parse-error', `JSON-LD parse error: ${err._parseError}`);
  }

  const validSchemas = schemas.filter(s => !s._parseError);
  const types = validSchemas.map(s => s['@type']).filter(Boolean);

  // Check inLanguage on relevant schemas
  const hreflangCode = HREFLANG_MAP[locale];
  for (const schema of validSchemas) {
    if (schema.inLanguage && schema.inLanguage !== hreflangCode) {
      audit.fail(cat, item, 'inLanguage', `Schema ${schema['@type']} has inLanguage=${schema.inLanguage}, expected ${hreflangCode}`);
    }
  }

  // Page-type specific schema checks
  if (pageType === 'homepage') {
    const required = ['EducationalOrganization', 'WebSite', 'SoftwareApplication', 'FAQPage'];
    for (const type of required) {
      if (!types.includes(type)) {
        audit.fail(cat, item, `missing-${type}`, `Missing ${type} schema on homepage`);
      } else {
        audit.pass(cat, item, `has-${type}`, `${type} schema present`);
      }
    }

    // Check WebSite has SearchAction
    const website = validSchemas.find(s => s['@type'] === 'WebSite');
    if (website && !website.potentialAction) {
      audit.fail(cat, item, 'SearchAction', 'WebSite schema missing potentialAction (SearchAction)');
    }
  }

  if (pageType === 'product') {
    const required = ['SoftwareApplication', 'BreadcrumbList', 'WebPage'];
    for (const type of required) {
      if (!types.includes(type)) {
        audit.fail(cat, item, `missing-${type}`, `Missing ${type} schema on product page`);
      }
    }

    // SoftwareApplication should have offers
    const app = validSchemas.find(s => s['@type'] === 'SoftwareApplication');
    if (app) {
      if (!app.offers) {
        audit.fail(cat, item, 'offers', 'SoftwareApplication missing offers');
      } else if (app.offers['@type'] === 'AggregateOffer' && (!app.offers.offers || app.offers.offers.length < 2)) {
        audit.warn(cat, item, 'offers-count', 'SoftwareApplication has fewer than 2 offer tiers');
      }
      audit.pass(cat, item, 'has-SoftwareApplication', 'SoftwareApplication schema present');
    }
  }

  if (pageType === 'blog') {
    const required = ['BlogPosting', 'BreadcrumbList'];
    for (const type of required) {
      if (!types.includes(type)) {
        audit.fail(cat, item, `missing-${type}`, `Missing ${type} schema on blog post`);
      }
    }

    // BlogPosting checks
    const post = validSchemas.find(s => s['@type'] === 'BlogPosting');
    if (post) {
      const requiredFields = ['headline', 'datePublished', 'dateModified', 'author', 'publisher'];
      for (const field of requiredFields) {
        if (!post[field]) {
          audit.fail(cat, item, `BlogPosting-${field}`, `BlogPosting missing ${field}`);
        }
      }
      // Check dateModified is not hardcoded
      if (post.dateModified === '2024-06-01' || post.dateModified === '2024-06-01T00:00:00.000Z') {
        audit.fail(cat, item, 'dateModified-hardcoded', 'BlogPosting dateModified is hardcoded, should be dynamic');
      }
      audit.pass(cat, item, 'has-BlogPosting', 'BlogPosting schema present');
    }

    // LearningResource
    if (types.includes('LearningResource')) {
      audit.pass(cat, item, 'has-LearningResource', 'LearningResource schema present');
    } else {
      audit.warn(cat, item, 'missing-LearningResource', 'No LearningResource schema');
    }
  }

  audit.info(cat, item, 'schema-count', `${validSchemas.length} schemas found: ${types.join(', ')}`);
}

// ============================================================
// BLOG VERIFICATION (database-level — checks ALL posts)
// ============================================================

async function verifyBlog(locale, specificSlug, doFetch, audit) {
  console.log(`\nVerifying blog posts for locale: ${locale.toUpperCase()}${specificSlug ? ` (slug: ${specificSlug})` : ''}\n`);

  // Fetch all posts from DB
  let posts;
  if (specificSlug) {
    posts = await prisma.$queryRaw`
      SELECT
        id, slug, category, keywords, featured_image as "featuredImage",
        created_at as "createdAt", updated_at as "updatedAt",
        jsonb_extract_path_text(translations, ${locale}, 'title') as title,
        jsonb_extract_path_text(translations, ${locale}, 'metaTitle') as "metaTitle",
        jsonb_extract_path_text(translations, ${locale}, 'metaDescription') as "metaDescription",
        jsonb_extract_path_text(translations, ${locale}, 'focusKeyword') as "focusKeyword",
        jsonb_extract_path_text(translations, ${locale}, 'excerpt') as excerpt,
        jsonb_extract_path_text(translations, ${locale}, 'slug') as "localeSlug",
        jsonb_extract_path_text(translations, ${locale}, 'content') as content
      FROM blog_posts
      WHERE status = 'published' AND slug = ${specificSlug}
      ORDER BY slug
    `;
  } else {
    posts = await prisma.$queryRaw`
      SELECT
        id, slug, category, keywords, featured_image as "featuredImage",
        created_at as "createdAt", updated_at as "updatedAt",
        jsonb_extract_path_text(translations, ${locale}, 'title') as title,
        jsonb_extract_path_text(translations, ${locale}, 'metaTitle') as "metaTitle",
        jsonb_extract_path_text(translations, ${locale}, 'metaDescription') as "metaDescription",
        jsonb_extract_path_text(translations, ${locale}, 'focusKeyword') as "focusKeyword",
        jsonb_extract_path_text(translations, ${locale}, 'excerpt') as excerpt,
        jsonb_extract_path_text(translations, ${locale}, 'slug') as "localeSlug",
        jsonb_extract_path_text(translations, ${locale}, 'content') as content
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY slug
    `;
  }

  console.log(`Found ${posts.length} published posts\n`);

  if (posts.length === 0) {
    audit.fail('blog', locale, 'no-posts', 'No published posts found');
    return;
  }

  // Track for duplicate detection
  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const seenKeywords = new Map();
  const seenSlugs = new Map();

  let stats = {
    titleOptimal: 0, titleShort: 0, titleLong: 0, titleGarbage: 0, titleMissing: 0,
    descOptimal: 0, descShort: 0, descLong: 0, descGarbage: 0, descMissing: 0,
    kwPresent: 0, kwGarbage: 0, kwMissing: 0,
    excerptPresent: 0, excerptMissing: 0,
    contentPresent: 0, contentMissing: 0,
    slugPresent: 0, slugMissing: 0,
  };

  for (const post of posts) {
    const item = post.slug;

    // === TITLE (H1) ===
    if (!post.title) {
      audit.fail('blog-data', item, 'title', `Missing title for locale ${locale}`);
    }

    // === META TITLE ===
    if (!post.metaTitle) {
      audit.fail('blog-data', item, 'metaTitle', `Missing metaTitle for locale ${locale}`);
      stats.titleMissing++;
    } else {
      const len = post.metaTitle.length;

      // Garbage check
      let isGarbage = false;
      for (const pattern of GARBAGE_TITLE_PATTERNS) {
        if (pattern.test(post.metaTitle)) {
          audit.fail('blog-data', item, 'metaTitle-garbage', `Garbage metaTitle pattern`, post.metaTitle.substring(0, 60));
          isGarbage = true;
          stats.titleGarbage++;
          break;
        }
      }

      if (!isGarbage) {
        if (len < SEO_RULES.metaTitle.min) {
          audit.warn('blog-data', item, 'metaTitle-short', `metaTitle short: ${len} chars`, post.metaTitle);
          stats.titleShort++;
        } else if (len > SEO_RULES.metaTitle.max) {
          audit.warn('blog-data', item, 'metaTitle-long', `metaTitle long: ${len} chars`, post.metaTitle.substring(0, 70));
          stats.titleLong++;
        } else {
          stats.titleOptimal++;
        }
      }

      // Duplicate check
      if (seenTitles.has(post.metaTitle)) {
        audit.fail('blog-data', item, 'metaTitle-duplicate', `Duplicate metaTitle with: ${seenTitles.get(post.metaTitle)}`);
      }
      seenTitles.set(post.metaTitle, item);
    }

    // === META DESCRIPTION ===
    if (!post.metaDescription) {
      audit.fail('blog-data', item, 'metaDescription', `Missing metaDescription for locale ${locale}`);
      stats.descMissing++;
    } else {
      const len = post.metaDescription.length;

      // Garbage check
      let isGarbage = false;
      for (const pattern of GARBAGE_DESC_PATTERNS) {
        if (pattern.test(post.metaDescription)) {
          audit.fail('blog-data', item, 'metaDescription-garbage', `Garbage metaDescription pattern`, post.metaDescription.substring(0, 60));
          isGarbage = true;
          stats.descGarbage++;
          break;
        }
      }

      if (!isGarbage) {
        if (len < SEO_RULES.metaDescription.min) {
          audit.warn('blog-data', item, 'metaDesc-short', `metaDescription short: ${len} chars`);
          stats.descShort++;
        } else if (len > SEO_RULES.metaDescription.max) {
          audit.warn('blog-data', item, 'metaDesc-long', `metaDescription long: ${len} chars`);
          stats.descLong++;
        } else {
          stats.descOptimal++;
        }
      }

      // Duplicate check
      if (seenDescriptions.has(post.metaDescription)) {
        audit.fail('blog-data', item, 'metaDesc-duplicate', `Duplicate metaDescription with: ${seenDescriptions.get(post.metaDescription)}`);
      }
      seenDescriptions.set(post.metaDescription, item);
    }

    // === FOCUS KEYWORD ===
    if (!post.focusKeyword) {
      audit.warn('blog-data', item, 'focusKeyword', `Missing focusKeyword for locale ${locale}`);
      stats.kwMissing++;
    } else {
      let isGarbage = false;
      for (const pattern of GARBAGE_KEYWORD_PATTERNS) {
        if (pattern.test(post.focusKeyword)) {
          audit.fail('blog-data', item, 'focusKeyword-garbage', `Garbage focusKeyword`, post.focusKeyword);
          isGarbage = true;
          stats.kwGarbage++;
          break;
        }
      }
      if (!isGarbage) {
        stats.kwPresent++;
      }

      // Duplicate check
      if (seenKeywords.has(post.focusKeyword)) {
        audit.warn('blog-data', item, 'focusKeyword-duplicate', `Duplicate focusKeyword with: ${seenKeywords.get(post.focusKeyword)}`);
      }
      seenKeywords.set(post.focusKeyword, item);
    }

    // === EXCERPT ===
    if (!post.excerpt || post.excerpt.length < 30) {
      audit.warn('blog-data', item, 'excerpt', `Missing or short excerpt`);
      stats.excerptMissing++;
    } else {
      stats.excerptPresent++;
    }

    // === CONTENT ===
    if (!post.content || post.content.length < 100) {
      audit.fail('blog-data', item, 'content', `Missing or very short content`);
      stats.contentMissing++;
    } else {
      stats.contentPresent++;
    }

    // === LOCALE SLUG ===
    if (!post.localeSlug) {
      audit.fail('blog-data', item, 'slug', `Missing locale slug for ${locale}`);
      stats.slugMissing++;
    } else {
      stats.slugPresent++;
      // Check for slug collisions
      if (seenSlugs.has(post.localeSlug)) {
        audit.fail('blog-data', item, 'slug-collision', `Slug collision: "${post.localeSlug}" also used by ${seenSlugs.get(post.localeSlug)}`);
      }
      seenSlugs.set(post.localeSlug, item);
    }
  }

  // Print summary statistics
  console.log(`${'─'.repeat(70)}`);
  console.log(`BLOG DATA SUMMARY — ${locale.toUpperCase()} (${posts.length} posts)`);
  console.log(`${'─'.repeat(70)}`);
  console.log(`  metaTitle:       ${stats.titleOptimal} optimal, ${stats.titleShort} short, ${stats.titleLong} long, ${stats.titleGarbage} garbage, ${stats.titleMissing} missing`);
  console.log(`  metaDescription: ${stats.descOptimal} optimal, ${stats.descShort} short, ${stats.descLong} long, ${stats.descGarbage} garbage, ${stats.descMissing} missing`);
  console.log(`  focusKeyword:    ${stats.kwPresent} ok, ${stats.kwGarbage} garbage, ${stats.kwMissing} missing`);
  console.log(`  excerpt:         ${stats.excerptPresent} ok, ${stats.excerptMissing} missing`);
  console.log(`  content:         ${stats.contentPresent} ok, ${stats.contentMissing} missing`);
  console.log(`  locale slug:     ${stats.slugPresent} ok, ${stats.slugMissing} missing`);
  console.log(`  duplicates:      titles=${seenTitles.size === posts.length ? 0 : posts.length - seenTitles.size}, descs=${seenDescriptions.size === posts.length ? 0 : posts.length - seenDescriptions.size}`);

  // Fetch sample pages for HTML checks
  if (doFetch) {
    const samplesToFetch = specificSlug ? posts : posts.slice(0, 5);
    console.log(`\nFetching ${samplesToFetch.length} pages for HTML verification...`);

    for (const post of samplesToFetch) {
      const slug = post.localeSlug || post.slug;
      const urlPath = `/${locale}/blog/${encodeURIComponent(slug)}`;
      try {
        const response = await fetchPage(urlPath);
        if (response.status !== 200) {
          audit.fail('blog-html', post.slug, 'http-status', `HTTP ${response.status} for ${urlPath}`);
          continue;
        }
        const parsed = parseHTML(response.body);
        parsed.statusCode = response.status;
        checkParsedMeta(parsed, audit, 'blog', post.slug, locale);
        checkSchemas(parsed, audit, 'blog', post.slug, locale);
      } catch (err) {
        audit.fail('blog-html', post.slug, 'fetch-error', `Failed to fetch ${urlPath}: ${err.message}`);
      }
    }
  }
}

// ============================================================
// PRODUCT VERIFICATION (content files + optional HTML fetch)
// ============================================================

async function verifyProduct(locale, specificSlug, doFetch, audit) {
  console.log(`\nVerifying product pages for locale: ${locale.toUpperCase()}${specificSlug ? ` (slug: ${specificSlug})` : ''}\n`);

  const contentDir = path.join(frontendDir, 'content', 'product-pages', locale);

  if (!fs.existsSync(contentDir)) {
    audit.fail('product', locale, 'content-dir', `Content directory not found: ${contentDir}`);
    return;
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.ts'));
  const targetFiles = specificSlug ? files.filter(f => f === `${specificSlug}.ts`) : files;

  console.log(`Found ${targetFiles.length} content files\n`);

  let stats = {
    total: targetFiles.length,
    titleOk: 0, titleBad: 0,
    descOk: 0, descBad: 0,
    faqOk: 0, faqEmpty: 0,
    howToOk: 0, howToEmpty: 0,
    samplesOk: 0, samplesEmpty: 0,
  };

  for (const file of targetFiles) {
    const slug = file.replace('.ts', '');
    const filePath = path.join(contentDir, file);
    const item = `${locale}/${slug}`;

    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      audit.fail('product-file', item, 'read-error', `Cannot read: ${err.message}`);
      continue;
    }

    // Extract SEO title
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    if (!titleMatch) {
      audit.fail('product-file', item, 'seo-title', 'Missing SEO title');
      stats.titleBad++;
    } else {
      const title = titleMatch[1];
      const len = title.length;
      if (len < 30) {
        audit.fail('product-file', item, 'seo-title-short', `SEO title too short: ${len} chars`, title);
        stats.titleBad++;
      } else if (len > 70) {
        audit.warn('product-file', item, 'seo-title-long', `SEO title long: ${len} chars`, title.substring(0, 70));
        stats.titleBad++;
      } else {
        stats.titleOk++;
      }
    }

    // Extract SEO description
    const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
    if (!descMatch) {
      audit.fail('product-file', item, 'seo-desc', 'Missing SEO description');
      stats.descBad++;
    } else {
      const desc = descMatch[1];
      const len = desc.length;
      if (len < 100) {
        audit.fail('product-file', item, 'seo-desc-short', `SEO description short: ${len} chars`);
        stats.descBad++;
      } else if (len > 200) {
        audit.warn('product-file', item, 'seo-desc-long', `SEO description long: ${len} chars`);
        stats.descBad++;
      } else {
        stats.descOk++;
      }
    }

    // Check FAQ section (look for faq items array)
    const faqMatch = content.match(/faq:\s*\{[\s\S]*?items:\s*\[([\s\S]*?)\]/);
    if (!faqMatch) {
      audit.warn('product-file', item, 'faq-missing', 'No FAQ section found');
      stats.faqEmpty++;
    } else {
      // Count question items
      const questionCount = (faqMatch[1].match(/question:/g) || []).length;
      if (questionCount < 3) {
        audit.warn('product-file', item, 'faq-few', `Only ${questionCount} FAQ items (want 3+)`);
        stats.faqEmpty++;
      } else {
        stats.faqOk++;
      }
    }

    // Check howTo section
    const howToMatch = content.match(/howTo:\s*\{[\s\S]*?steps:\s*\[([\s\S]*?)\]/);
    if (!howToMatch) {
      audit.warn('product-file', item, 'howTo-missing', 'No how-to section found');
      stats.howToEmpty++;
    } else {
      const stepCount = (howToMatch[1].match(/title:/g) || []).length;
      if (stepCount < 2) {
        audit.warn('product-file', item, 'howTo-few', `Only ${stepCount} how-to steps`);
        stats.howToEmpty++;
      } else {
        stats.howToOk++;
      }
    }

    // Check samples section
    const samplesMatch = content.match(/samples:\s*\{[\s\S]*?items:\s*\[([\s\S]*?)\]/);
    if (!samplesMatch) {
      audit.warn('product-file', item, 'samples-missing', 'No samples section found');
      stats.samplesEmpty++;
    } else {
      const sampleCount = (samplesMatch[1].match(/worksheetSrc:/g) || []).length;
      if (sampleCount < 1) {
        audit.warn('product-file', item, 'samples-empty', 'Samples array is empty');
        stats.samplesEmpty++;
      } else {
        stats.samplesOk++;
      }
    }

    // Check canonicalUrl
    const canonicalMatch = content.match(/canonicalUrl:\s*['"`]([^'"`]+)['"`]/);
    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      if (!canonical.startsWith('https://www.lessoncraftstudio.com/')) {
        audit.fail('product-file', item, 'canonical', `Bad canonical URL: ${canonical}`);
      }
      if (!canonical.includes(`/${locale}/`)) {
        audit.fail('product-file', item, 'canonical-locale', `Canonical missing locale ${locale}: ${canonical}`);
      }
    }
  }

  console.log(`${'─'.repeat(70)}`);
  console.log(`PRODUCT CONTENT SUMMARY — ${locale.toUpperCase()} (${stats.total} pages)`);
  console.log(`${'─'.repeat(70)}`);
  console.log(`  SEO title:    ${stats.titleOk} ok, ${stats.titleBad} issues`);
  console.log(`  SEO desc:     ${stats.descOk} ok, ${stats.descBad} issues`);
  console.log(`  FAQ:          ${stats.faqOk} ok, ${stats.faqEmpty} missing/few`);
  console.log(`  How-to:       ${stats.howToOk} ok, ${stats.howToEmpty} missing/few`);
  console.log(`  Samples:      ${stats.samplesOk} ok, ${stats.samplesEmpty} missing/empty`);

  // Fetch sample pages
  if (doFetch) {
    const samplesToFetch = specificSlug ? [specificSlug] : targetFiles.slice(0, 3).map(f => f.replace('.ts', ''));
    console.log(`\nFetching ${samplesToFetch.length} pages for HTML verification...`);

    for (const slug of samplesToFetch) {
      const urlPath = `/${locale}/apps/${slug}`;
      try {
        const response = await fetchPage(urlPath);
        if (response.status !== 200) {
          audit.fail('product-html', slug, 'http-status', `HTTP ${response.status} for ${urlPath}`);
          continue;
        }
        const parsed = parseHTML(response.body);
        checkParsedMeta(parsed, audit, 'product', slug, locale);
        checkSchemas(parsed, audit, 'product', slug, locale);
      } catch (err) {
        audit.fail('product-html', slug, 'fetch-error', `Failed to fetch ${urlPath}: ${err.message}`);
      }
    }
  }
}

// ============================================================
// HOMEPAGE VERIFICATION (HTML fetch for each locale)
// ============================================================

async function verifyHomepage(locale, audit) {
  const locales = locale === 'all' ? VALID_LOCALES : [locale];

  for (const loc of locales) {
    console.log(`\nVerifying homepage: ${loc.toUpperCase()}`);
    const urlPath = `/${loc}`;
    const item = `homepage-${loc}`;

    try {
      const response = await fetchPage(urlPath);
      if (response.status !== 200) {
        audit.fail('homepage', item, 'http-status', `HTTP ${response.status} for ${urlPath}`);
        continue;
      }

      const parsed = parseHTML(response.body);
      parsed.statusCode = response.status;

      // Meta checks
      checkParsedMeta(parsed, audit, 'homepage', item, loc);

      // Schema checks
      checkSchemas(parsed, audit, 'homepage', item, loc);

      // Homepage-specific: check for brand in title
      if (parsed.title && !parsed.title.includes('LessonCraftStudio')) {
        audit.warn('homepage', item, 'title-brand', 'Title missing brand name "LessonCraftStudio"');
      }

      // Check OG type
      if (parsed.ogTags['og:type'] !== 'website') {
        audit.warn('homepage', item, 'og:type', `Expected og:type=website, got ${parsed.ogTags['og:type']}`);
      }

      // Check for sufficient H2s (features, sections)
      if (parsed.h2.length < 3) {
        audit.warn('homepage', item, 'h2-count', `Only ${parsed.h2.length} H2 tags (expected 3+ sections)`);
      }

      audit.pass('homepage', item, 'loaded', `Homepage loaded successfully (${response.body.length} bytes)`);
    } catch (err) {
      audit.fail('homepage', item, 'fetch-error', `Failed to fetch: ${err.message}`);
    }
  }
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const pageType = args[0];
  const locale = args[1];
  const slug = args[2] && !args[2].startsWith('--') ? args[2] : null;
  const doFetch = args.includes('--fetch');
  const verbose = args.includes('--verbose');
  const jsonOutput = args.includes('--json');

  if (!pageType || !locale || !['homepage', 'product', 'blog'].includes(pageType)) {
    console.error('Usage: node verify-seo.js <type> <locale> [slug] [--fetch] [--verbose] [--json]');
    console.error('Types: homepage, product, blog');
    console.error(`Locales: ${VALID_LOCALES.join(', ')}, all (homepage only)`);
    console.error('\nExamples:');
    console.error('  node scripts/verify-seo.js homepage en');
    console.error('  node scripts/verify-seo.js homepage all');
    console.error('  node scripts/verify-seo.js product en');
    console.error('  node scripts/verify-seo.js product en addition-worksheets --fetch');
    console.error('  node scripts/verify-seo.js blog en');
    console.error('  node scripts/verify-seo.js blog en --fetch');
    process.exit(1);
  }

  if (locale !== 'all' && !VALID_LOCALES.includes(locale)) {
    console.error(`Invalid locale: ${locale}. Valid: ${VALID_LOCALES.join(', ')}`);
    process.exit(1);
  }

  const audit = new AuditResults();

  console.log(`${'='.repeat(70)}`);
  console.log(`SEO Verification — ${pageType.toUpperCase()} | Locale: ${locale.toUpperCase()}${slug ? ` | Slug: ${slug}` : ''}${doFetch ? ' | +HTML fetch' : ''}`);
  console.log(`${'='.repeat(70)}`);

  try {
    if (pageType === 'homepage') {
      await verifyHomepage(locale, audit);
    } else if (pageType === 'product') {
      await verifyProduct(locale, slug, doFetch, audit);
    } else if (pageType === 'blog') {
      await verifyBlog(locale, slug, doFetch, audit);
    }
  } catch (err) {
    console.error(`\nFatal error: ${err.message}`);
    console.error(err.stack);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(audit.results, null, 2));
  } else {
    audit.print(verbose);
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
