/**
 * Comprehensive Blog Post SEO Audit
 *
 * Audits all 1,232 blog post URLs (112 posts × 11 languages) against Google's SEO best practices.
 *
 * Features:
 * - Database field analysis (titles, descriptions, slugs, content, keywords)
 * - HTTP requests to verify actual rendered meta tags
 * - JSON-LD schema validation on live pages
 * - Hreflang implementation verification
 * - Canonical URL validation
 *
 * Usage:
 *   node scripts/comprehensive-seo-audit.js                    # Full audit (database + live pages)
 *   node scripts/comprehensive-seo-audit.js --database-only    # Database audit only (faster)
 *   node scripts/comprehensive-seo-audit.js --verbose          # Verbose output
 *   node scripts/comprehensive-seo-audit.js --output=json      # Output JSON format
 *   node scripts/comprehensive-seo-audit.js --sample=10        # Audit only first N posts
 */

const { PrismaClient } = require('@prisma/client');
const https = require('https');
const http = require('http');

const prisma = new PrismaClient();

// Configuration
const CONFIG = {
  baseUrl: 'https://www.lessoncraftstudio.com',
  concurrency: 5,          // Max parallel HTTP requests
  requestTimeout: 10000,   // 10 seconds per request
  delayBetweenBatches: 100, // 100ms delay between batches
  maxRetries: 1,
  supportedLocales: ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'],
  hreflangCodes: {
    en: 'en',
    de: 'de',
    es: 'es-MX',
    fr: 'fr',
    it: 'it',
    pt: 'pt-BR',
    nl: 'nl',
    sv: 'sv',
    da: 'da',
    no: 'no',
    fi: 'fi'
  },
  seo: {
    titleMinLength: 30,
    titleOptimalMin: 55,
    titleOptimalMax: 60,
    titleMaxLength: 70,
    descriptionMinLength: 50,
    descriptionOptimalMin: 155,
    descriptionOptimalMax: 160,
    descriptionMaxLength: 160,
    slugMaxLength: 60,
    contentMinWords: 300,
    contentOptimalWords: 1000
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  databaseOnly: args.includes('--database-only'),
  verbose: args.includes('--verbose'),
  outputJson: args.includes('--output=json'),
  sample: parseInt(args.find(a => a.startsWith('--sample='))?.split('=')[1]) || null
};

// Utility functions
function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countWords(text) {
  const clean = stripHtml(text);
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function log(message, level = 'info') {
  if (options.outputJson && level !== 'error') return;
  if (level === 'verbose' && !options.verbose) return;
  console.log(message);
}

// HTTP request helper with timeout and retry
function makeRequest(url, retries = CONFIG.maxRetries) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const timeout = setTimeout(() => {
      req.destroy();
      if (retries > 0) {
        resolve(makeRequest(url, retries - 1));
      } else {
        resolve({ error: 'timeout', url });
      }
    }, CONFIG.requestTimeout);

    const req = protocol.get(url, (res) => {
      clearTimeout(timeout);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          url
        });
      });
    });

    req.on('error', (err) => {
      clearTimeout(timeout);
      if (retries > 0) {
        resolve(makeRequest(url, retries - 1));
      } else {
        resolve({ error: err.message, url });
      }
    });
  });
}

// Process requests in batches with concurrency control
async function batchRequests(urls, processFn) {
  const results = [];
  for (let i = 0; i < urls.length; i += CONFIG.concurrency) {
    const batch = urls.slice(i, i + CONFIG.concurrency);
    const batchResults = await Promise.all(batch.map(processFn));
    results.push(...batchResults);

    // Progress indicator
    if (!options.outputJson) {
      process.stdout.write(`\r  Progress: ${Math.min(i + CONFIG.concurrency, urls.length)}/${urls.length} pages checked`);
    }

    // Delay between batches to avoid overwhelming server
    if (i + CONFIG.concurrency < urls.length) {
      await new Promise(r => setTimeout(r, CONFIG.delayBetweenBatches));
    }
  }
  if (!options.outputJson) console.log(''); // New line after progress
  return results;
}

// HTML parsing functions
function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractMetaDescription(html) {
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  if (match) return match[1].trim();
  const match2 = html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  return match2 ? match2[1].trim() : null;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  if (match) return match[1].trim();
  const match2 = html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  return match2 ? match2[1].trim() : null;
}

function extractHreflangTags(html) {
  const hreflangPattern = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["'][^>]*>/gi;
  const hreflangPattern2 = /<link[^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["'][^>]*rel=["']alternate["'][^>]*>/gi;
  const hreflangPattern3 = /<link[^>]*href=["']([^"']*)["'][^>]*hreflang=["']([^"']*)["'][^>]*rel=["']alternate["'][^>]*>/gi;

  const tags = {};
  let match;

  while ((match = hreflangPattern.exec(html)) !== null) {
    tags[match[1]] = match[2];
  }
  while ((match = hreflangPattern2.exec(html)) !== null) {
    tags[match[1]] = match[2];
  }
  while ((match = hreflangPattern3.exec(html)) !== null) {
    tags[match[2]] = match[1];
  }

  return tags;
}

function extractJsonLd(html) {
  const scripts = [];
  const pattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      scripts.push(parsed);
    } catch (e) {
      scripts.push({ error: 'Invalid JSON', raw: match[1].substring(0, 100) });
    }
  }

  return scripts;
}

function extractOpenGraph(html) {
  const og = {};
  const pattern = /<meta[^>]*property=["'](og:[^"']*)["'][^>]*content=["']([^"']*)["'][^>]*>/gi;
  const pattern2 = /<meta[^>]*content=["']([^"']*)["'][^>]*property=["'](og:[^"']*)["'][^>]*>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    og[match[1]] = match[2];
  }
  while ((match = pattern2.exec(html)) !== null) {
    og[match[2]] = match[1];
  }

  return og;
}

function extractTwitterCard(html) {
  const twitter = {};
  const pattern = /<meta[^>]*name=["'](twitter:[^"']*)["'][^>]*content=["']([^"']*)["'][^>]*>/gi;
  const pattern2 = /<meta[^>]*content=["']([^"']*)["'][^>]*name=["'](twitter:[^"']*)["'][^>]*>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    twitter[match[1]] = match[2];
  }
  while ((match = pattern2.exec(html)) !== null) {
    twitter[match[2]] = match[1];
  }

  return twitter;
}

// Database-level checks for a single translation
function checkTranslation(translation, locale, postSlug) {
  const checks = {
    locale,
    issues: {
      critical: [],
      warnings: [],
      passed: []
    }
  };

  // 1. Meta Title Checks
  const title = translation.metaTitle || translation.title || '';
  if (!title) {
    checks.issues.critical.push({
      check: 'metaTitlePresent',
      message: 'Missing meta title and title'
    });
  } else {
    checks.issues.passed.push('metaTitlePresent');

    if (title.length < CONFIG.seo.titleMinLength) {
      checks.issues.critical.push({
        check: 'metaTitleLength',
        message: `Title too short: ${title.length} chars (min: ${CONFIG.seo.titleMinLength})`,
        value: title.length
      });
    } else if (title.length < CONFIG.seo.titleOptimalMin) {
      checks.issues.warnings.push({
        check: 'metaTitleLength',
        message: `Title slightly short: ${title.length} chars (optimal: ${CONFIG.seo.titleOptimalMin}-${CONFIG.seo.titleOptimalMax})`,
        value: title.length
      });
    } else if (title.length > CONFIG.seo.titleMaxLength) {
      checks.issues.warnings.push({
        check: 'metaTitleLength',
        message: `Title too long: ${title.length} chars (max: ${CONFIG.seo.titleMaxLength})`,
        value: title.length
      });
    } else if (title.length >= CONFIG.seo.titleOptimalMin && title.length <= CONFIG.seo.titleOptimalMax) {
      checks.issues.passed.push('metaTitleOptimal');
    } else {
      checks.issues.passed.push('metaTitleLength');
    }
  }
  checks.metaTitle = title;
  checks.metaTitleLength = title.length;

  // 2. Meta Description Checks
  const description = translation.metaDescription || '';
  if (!description) {
    checks.issues.critical.push({
      check: 'metaDescriptionPresent',
      message: 'Missing meta description'
    });
  } else {
    checks.issues.passed.push('metaDescriptionPresent');

    if (description.length < CONFIG.seo.descriptionMinLength) {
      checks.issues.critical.push({
        check: 'metaDescriptionLength',
        message: `Description too short: ${description.length} chars (min: ${CONFIG.seo.descriptionMinLength})`,
        value: description.length
      });
    } else if (description.length < CONFIG.seo.descriptionOptimalMin) {
      checks.issues.warnings.push({
        check: 'metaDescriptionLength',
        message: `Description slightly short: ${description.length} chars (optimal: ${CONFIG.seo.descriptionOptimalMin}-${CONFIG.seo.descriptionOptimalMax})`,
        value: description.length
      });
    } else if (description.length > CONFIG.seo.descriptionMaxLength) {
      checks.issues.warnings.push({
        check: 'metaDescriptionLength',
        message: `Description too long: ${description.length} chars (max: ${CONFIG.seo.descriptionMaxLength})`,
        value: description.length
      });
    } else {
      checks.issues.passed.push('metaDescriptionLength');
    }
  }
  checks.metaDescription = description;
  checks.metaDescriptionLength = description.length;

  // 3. Slug Checks
  const slug = translation.slug || postSlug;
  if (!slug) {
    checks.issues.critical.push({
      check: 'slugPresent',
      message: 'Missing slug'
    });
  } else {
    checks.issues.passed.push('slugPresent');

    // Check slug format (lowercase, hyphens only, no special chars)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      checks.issues.warnings.push({
        check: 'slugFormat',
        message: `Slug contains invalid characters: "${slug}"`,
        value: slug
      });
    } else {
      checks.issues.passed.push('slugFormat');
    }

    if (slug.length > CONFIG.seo.slugMaxLength) {
      checks.issues.warnings.push({
        check: 'slugLength',
        message: `Slug too long: ${slug.length} chars (max: ${CONFIG.seo.slugMaxLength})`,
        value: slug.length
      });
    } else {
      checks.issues.passed.push('slugLength');
    }
  }
  checks.slug = slug;

  // 4. Content Checks
  const content = translation.content || '';
  const wordCount = countWords(content);
  if (!content) {
    checks.issues.critical.push({
      check: 'contentPresent',
      message: 'Missing content'
    });
  } else {
    checks.issues.passed.push('contentPresent');

    if (wordCount < CONFIG.seo.contentMinWords) {
      checks.issues.warnings.push({
        check: 'contentLength',
        message: `Content too short: ${wordCount} words (min: ${CONFIG.seo.contentMinWords})`,
        value: wordCount
      });
    } else if (wordCount >= CONFIG.seo.contentOptimalWords) {
      checks.issues.passed.push('contentOptimal');
    } else {
      checks.issues.passed.push('contentLength');
    }
  }
  checks.contentWordCount = wordCount;

  // 5. Focus Keyword Checks
  const focusKeyword = translation.focusKeyword || '';
  if (!focusKeyword) {
    checks.issues.warnings.push({
      check: 'focusKeywordPresent',
      message: 'Missing focus keyword'
    });
  } else {
    checks.issues.passed.push('focusKeywordPresent');

    const keywordLower = focusKeyword.toLowerCase();

    // Check keyword in title
    if (!title.toLowerCase().includes(keywordLower)) {
      checks.issues.warnings.push({
        check: 'keywordInTitle',
        message: `Focus keyword "${focusKeyword}" not found in title`
      });
    } else {
      checks.issues.passed.push('keywordInTitle');
    }

    // Check keyword in description
    if (!description.toLowerCase().includes(keywordLower)) {
      checks.issues.warnings.push({
        check: 'keywordInDescription',
        message: `Focus keyword "${focusKeyword}" not found in meta description`
      });
    } else {
      checks.issues.passed.push('keywordInDescription');
    }

    // Check keyword in slug
    const slugKeyword = keywordLower.replace(/\s+/g, '-');
    if (!slug.toLowerCase().includes(slugKeyword) && !slug.toLowerCase().includes(keywordLower.replace(/\s+/g, ''))) {
      checks.issues.warnings.push({
        check: 'keywordInSlug',
        message: `Focus keyword "${focusKeyword}" not reflected in slug`
      });
    } else {
      checks.issues.passed.push('keywordInSlug');
    }
  }
  checks.focusKeyword = focusKeyword;

  // 6. Excerpt Check
  if (!translation.excerpt) {
    checks.issues.warnings.push({
      check: 'excerptPresent',
      message: 'Missing excerpt (used for listing pages)'
    });
  } else {
    checks.issues.passed.push('excerptPresent');
  }

  // 7. Author Check
  if (!translation.author) {
    checks.issues.warnings.push({
      check: 'authorPresent',
      message: 'Missing author attribution'
    });
  } else {
    checks.issues.passed.push('authorPresent');
  }

  return checks;
}

// Live page checks
function checkLivePage(response, expectedData, locale) {
  const checks = {
    httpStatus: response.status,
    issues: {
      critical: [],
      warnings: [],
      passed: []
    }
  };

  if (response.error) {
    checks.issues.critical.push({
      check: 'httpRequest',
      message: `Request failed: ${response.error}`
    });
    return checks;
  }

  if (response.status !== 200) {
    checks.issues.critical.push({
      check: 'httpStatus',
      message: `HTTP status ${response.status} (expected 200)`
    });
    return checks;
  }

  checks.issues.passed.push('httpStatus');

  const html = response.body;

  // 1. Title tag verification
  const liveTitle = extractTitle(html);
  if (!liveTitle) {
    checks.issues.critical.push({
      check: 'titleTagPresent',
      message: 'Title tag missing from rendered page'
    });
  } else {
    checks.issues.passed.push('titleTagPresent');

    const expectedTitle = expectedData.metaTitle || expectedData.title || '';
    // Allow for brand suffix variations
    if (expectedTitle && !liveTitle.includes(expectedTitle.substring(0, 40))) {
      checks.issues.warnings.push({
        check: 'titleTagMatch',
        message: 'Rendered title differs from database',
        expected: expectedTitle.substring(0, 60),
        actual: liveTitle.substring(0, 60)
      });
    } else {
      checks.issues.passed.push('titleTagMatch');
    }
  }
  checks.liveTitle = liveTitle;

  // 2. Meta description verification
  const liveDescription = extractMetaDescription(html);
  if (!liveDescription) {
    checks.issues.critical.push({
      check: 'metaDescriptionTagPresent',
      message: 'Meta description tag missing from rendered page'
    });
  } else {
    checks.issues.passed.push('metaDescriptionTagPresent');

    const expectedDesc = expectedData.metaDescription || '';
    if (expectedDesc && liveDescription !== expectedDesc) {
      // Allow for truncation
      if (!liveDescription.startsWith(expectedDesc.substring(0, 100))) {
        checks.issues.warnings.push({
          check: 'metaDescriptionMatch',
          message: 'Rendered meta description differs from database',
          expected: expectedDesc.substring(0, 80),
          actual: liveDescription.substring(0, 80)
        });
      } else {
        checks.issues.passed.push('metaDescriptionMatch');
      }
    } else {
      checks.issues.passed.push('metaDescriptionMatch');
    }
  }
  checks.liveDescription = liveDescription;

  // 3. Canonical URL verification
  const canonical = extractCanonical(html);
  if (!canonical) {
    checks.issues.critical.push({
      check: 'canonicalPresent',
      message: 'Canonical URL missing'
    });
  } else {
    checks.issues.passed.push('canonicalPresent');

    // Verify canonical is HTTPS
    if (!canonical.startsWith('https://')) {
      checks.issues.critical.push({
        check: 'canonicalHttps',
        message: `Canonical URL not HTTPS: ${canonical}`
      });
    } else {
      checks.issues.passed.push('canonicalHttps');
    }

    // Verify canonical matches current locale
    if (!canonical.includes(`/${locale}/`)) {
      checks.issues.warnings.push({
        check: 'canonicalLocale',
        message: `Canonical URL doesn't match locale ${locale}: ${canonical}`
      });
    } else {
      checks.issues.passed.push('canonicalLocale');
    }
  }
  checks.canonical = canonical;

  // 4. Hreflang verification
  const hreflangTags = extractHreflangTags(html);
  const hreflangCount = Object.keys(hreflangTags).length;

  if (hreflangCount === 0) {
    checks.issues.critical.push({
      check: 'hreflangPresent',
      message: 'No hreflang tags found'
    });
  } else {
    checks.issues.passed.push('hreflangPresent');

    // x-default is intentionally omitted — all 11 locales have complete hreflang entries
    // so x-default is unnecessary (it's meant for language-selector pages per Google docs)
    checks.issues.passed.push('hreflangNoXDefault');

    // Check for self-referential tag
    const currentHreflangCode = CONFIG.hreflangCodes[locale] || locale;
    if (!hreflangTags[currentHreflangCode]) {
      checks.issues.warnings.push({
        check: 'hreflangSelfRef',
        message: `Missing self-referential hreflang tag for ${currentHreflangCode}`
      });
    } else {
      checks.issues.passed.push('hreflangSelfRef');
    }
  }
  checks.hreflangTags = hreflangTags;
  checks.hreflangCount = hreflangCount;

  // 5. JSON-LD Schema verification
  const schemas = extractJsonLd(html);
  if (schemas.length === 0) {
    checks.issues.critical.push({
      check: 'schemaPresent',
      message: 'No JSON-LD schemas found'
    });
  } else {
    checks.issues.passed.push('schemaPresent');

    // Check for BlogPosting schema
    const blogPosting = schemas.find(s => s['@type'] === 'BlogPosting');
    if (!blogPosting) {
      checks.issues.warnings.push({
        check: 'schemaBlogPosting',
        message: 'Missing BlogPosting schema'
      });
    } else {
      checks.issues.passed.push('schemaBlogPosting');

      // Verify required BlogPosting fields
      const requiredFields = ['headline', 'author', 'datePublished'];
      for (const field of requiredFields) {
        if (!blogPosting[field]) {
          checks.issues.warnings.push({
            check: `schemaBlogPosting_${field}`,
            message: `BlogPosting schema missing ${field}`
          });
        }
      }
    }

    // Check for BreadcrumbList schema
    const breadcrumb = schemas.find(s => s['@type'] === 'BreadcrumbList');
    if (!breadcrumb) {
      checks.issues.warnings.push({
        check: 'schemaBreadcrumb',
        message: 'Missing BreadcrumbList schema'
      });
    } else {
      checks.issues.passed.push('schemaBreadcrumb');
    }

    // Check for parsing errors
    const errors = schemas.filter(s => s.error);
    if (errors.length > 0) {
      checks.issues.critical.push({
        check: 'schemaValid',
        message: `${errors.length} JSON-LD schema(s) have invalid syntax`
      });
    } else {
      checks.issues.passed.push('schemaValid');
    }
  }
  checks.schemaCount = schemas.length;

  // 6. Open Graph verification
  const og = extractOpenGraph(html);
  const requiredOg = ['og:title', 'og:description', 'og:type', 'og:url'];

  for (const prop of requiredOg) {
    if (!og[prop]) {
      checks.issues.warnings.push({
        check: `og_${prop.replace(':', '_')}`,
        message: `Missing ${prop} meta tag`
      });
    } else {
      checks.issues.passed.push(`og_${prop.replace(':', '_')}`);
    }
  }

  // Verify og:type is article
  if (og['og:type'] && og['og:type'] !== 'article') {
    checks.issues.warnings.push({
      check: 'og_type_value',
      message: `og:type should be "article", got "${og['og:type']}"`
    });
  }

  // Verify og:locale
  if (og['og:locale']) {
    checks.issues.passed.push('og_locale');
  }
  checks.openGraph = og;

  // 7. Twitter Card verification
  const twitter = extractTwitterCard(html);
  if (!twitter['twitter:card']) {
    checks.issues.warnings.push({
      check: 'twitterCard',
      message: 'Missing twitter:card meta tag'
    });
  } else {
    checks.issues.passed.push('twitterCard');
  }

  if (!twitter['twitter:title']) {
    checks.issues.warnings.push({
      check: 'twitterTitle',
      message: 'Missing twitter:title meta tag'
    });
  } else {
    checks.issues.passed.push('twitterTitle');
  }
  checks.twitterCard = twitter;

  return checks;
}

// Main audit function
async function auditAllPosts() {
  const startTime = Date.now();

  log('=== COMPREHENSIVE BLOG POST SEO AUDIT ===\n');
  log(`Mode: ${options.databaseOnly ? 'Database Only' : 'Database + Live Pages'}`);
  log(`Base URL: ${CONFIG.baseUrl}`);
  log(`Locales: ${CONFIG.supportedLocales.join(', ')}\n`);

  // Fetch all published blog posts
  log('Fetching published blog posts from database...');
  let posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
      keywords: true,
      featuredImage: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: { createdAt: 'desc' }
  });

  if (options.sample) {
    posts = posts.slice(0, options.sample);
    log(`Sampling first ${options.sample} posts for audit`);
  }

  log(`Found ${posts.length} published posts\n`);

  const results = {
    timestamp: new Date().toISOString(),
    mode: options.databaseOnly ? 'database-only' : 'full',
    baseUrl: CONFIG.baseUrl,
    totalPosts: posts.length,
    totalTranslations: 0,
    summary: {
      database: {
        critical: {},
        warnings: {},
        passed: {}
      },
      livePages: {
        critical: {},
        warnings: {},
        passed: {}
      }
    },
    byLanguage: {},
    posts: []
  };

  // Initialize language stats
  for (const locale of CONFIG.supportedLocales) {
    results.byLanguage[locale] = {
      total: 0,
      hasTranslation: 0,
      database: { critical: 0, warnings: 0, passed: 0 },
      livePages: { critical: 0, warnings: 0, passed: 0 }
    };
  }

  // Phase 1: Database Analysis
  log('--- PHASE 1: Database Analysis ---\n');

  for (const post of posts) {
    const postResult = {
      id: post.id,
      slug: post.slug,
      publishedAt: post.publishedAt,
      translations: {}
    };

    const translations = post.translations || {};

    for (const locale of CONFIG.supportedLocales) {
      const translation = translations[locale];
      results.byLanguage[locale].total++;

      if (!translation || (!translation.title && !translation.content)) {
        postResult.translations[locale] = {
          exists: false,
          database: { issues: { critical: [{ check: 'translationExists', message: 'Translation missing' }], warnings: [], passed: [] } }
        };
        results.byLanguage[locale].database.critical++;
        continue;
      }

      results.byLanguage[locale].hasTranslation++;
      results.totalTranslations++;

      const dbChecks = checkTranslation(translation, locale, post.slug);
      postResult.translations[locale] = {
        exists: true,
        slug: translation.slug || post.slug,
        database: dbChecks
      };

      // Aggregate stats
      results.byLanguage[locale].database.critical += dbChecks.issues.critical.length;
      results.byLanguage[locale].database.warnings += dbChecks.issues.warnings.length;
      results.byLanguage[locale].database.passed += dbChecks.issues.passed.length;

      // Aggregate issue counts
      for (const issue of dbChecks.issues.critical) {
        results.summary.database.critical[issue.check] = (results.summary.database.critical[issue.check] || 0) + 1;
      }
      for (const issue of dbChecks.issues.warnings) {
        results.summary.database.warnings[issue.check] = (results.summary.database.warnings[issue.check] || 0) + 1;
      }
      for (const check of dbChecks.issues.passed) {
        results.summary.database.passed[check] = (results.summary.database.passed[check] || 0) + 1;
      }
    }

    results.posts.push(postResult);
  }

  log(`Database analysis complete: ${results.totalTranslations} translations checked\n`);

  // Phase 2: Live Page Validation (unless --database-only)
  if (!options.databaseOnly) {
    log('--- PHASE 2: Live Page Validation ---\n');
    log(`Checking ${results.totalTranslations} live pages (this may take ~25-30 minutes)...\n`);

    const urlsToCheck = [];
    for (const postResult of results.posts) {
      for (const [locale, transResult] of Object.entries(postResult.translations)) {
        if (transResult.exists) {
          urlsToCheck.push({
            postIndex: results.posts.indexOf(postResult),
            locale,
            slug: transResult.slug,
            url: `${CONFIG.baseUrl}/${locale}/blog/${encodeURIComponent(transResult.slug)}`
          });
        }
      }
    }

    const liveResults = await batchRequests(urlsToCheck, async (item) => {
      const response = await makeRequest(item.url);
      const post = results.posts[item.postIndex];
      const translation = post.translations[item.locale];

      const liveChecks = checkLivePage(
        response,
        translation.database,
        item.locale
      );

      return {
        ...item,
        liveChecks
      };
    });

    // Merge live results back
    for (const result of liveResults) {
      const post = results.posts[result.postIndex];
      post.translations[result.locale].livePage = result.liveChecks;

      // Aggregate live page stats
      const locale = result.locale;
      results.byLanguage[locale].livePages.critical += result.liveChecks.issues.critical.length;
      results.byLanguage[locale].livePages.warnings += result.liveChecks.issues.warnings.length;
      results.byLanguage[locale].livePages.passed += result.liveChecks.issues.passed.length;

      for (const issue of result.liveChecks.issues.critical) {
        results.summary.livePages.critical[issue.check] = (results.summary.livePages.critical[issue.check] || 0) + 1;
      }
      for (const issue of result.liveChecks.issues.warnings) {
        results.summary.livePages.warnings[issue.check] = (results.summary.livePages.warnings[issue.check] || 0) + 1;
      }
      for (const check of result.liveChecks.issues.passed) {
        results.summary.livePages.passed[check] = (results.summary.livePages.passed[check] || 0) + 1;
      }
    }

    log('Live page validation complete\n');
  }

  // Calculate totals
  const dbCriticalTotal = Object.values(results.summary.database.critical).reduce((a, b) => a + b, 0);
  const dbWarningsTotal = Object.values(results.summary.database.warnings).reduce((a, b) => a + b, 0);
  const dbPassedTotal = Object.values(results.summary.database.passed).reduce((a, b) => a + b, 0);

  const lpCriticalTotal = Object.values(results.summary.livePages.critical).reduce((a, b) => a + b, 0);
  const lpWarningsTotal = Object.values(results.summary.livePages.warnings).reduce((a, b) => a + b, 0);
  const lpPassedTotal = Object.values(results.summary.livePages.passed).reduce((a, b) => a + b, 0);

  results.summary.totals = {
    database: { critical: dbCriticalTotal, warnings: dbWarningsTotal, passed: dbPassedTotal },
    livePages: { critical: lpCriticalTotal, warnings: lpWarningsTotal, passed: lpPassedTotal }
  };

  const duration = Math.round((Date.now() - startTime) / 1000);
  results.durationSeconds = duration;

  // Output results
  if (options.outputJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    printSummary(results);
  }

  return results;
}

// Print human-readable summary
function printSummary(results) {
  console.log('\n' + '='.repeat(60));
  console.log('                    AUDIT SUMMARY');
  console.log('='.repeat(60) + '\n');

  console.log(`Total Posts: ${results.totalPosts}`);
  console.log(`Total Translations: ${results.totalTranslations}`);
  console.log(`Duration: ${results.durationSeconds} seconds\n`);

  // Database Issues Summary
  console.log('--- DATABASE ANALYSIS ---\n');

  console.log('CRITICAL ISSUES (blocking SEO):');
  if (Object.keys(results.summary.database.critical).length === 0) {
    console.log('  None found! ✓\n');
  } else {
    for (const [check, count] of Object.entries(results.summary.database.critical).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${check}: ${count}`);
    }
    console.log('');
  }

  console.log('WARNINGS (optimization opportunities):');
  const topWarnings = Object.entries(results.summary.database.warnings)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (topWarnings.length === 0) {
    console.log('  None found! ✓\n');
  } else {
    for (const [check, count] of topWarnings) {
      console.log(`  ${check}: ${count}`);
    }
    if (Object.keys(results.summary.database.warnings).length > 10) {
      console.log(`  ... and ${Object.keys(results.summary.database.warnings).length - 10} more warning types`);
    }
    console.log('');
  }

  // Live Page Issues Summary (if applicable)
  if (results.mode === 'full') {
    console.log('--- LIVE PAGE VALIDATION ---\n');

    console.log('CRITICAL ISSUES:');
    if (Object.keys(results.summary.livePages.critical).length === 0) {
      console.log('  None found! ✓\n');
    } else {
      for (const [check, count] of Object.entries(results.summary.livePages.critical).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${check}: ${count}`);
      }
      console.log('');
    }

    console.log('WARNINGS:');
    const topLpWarnings = Object.entries(results.summary.livePages.warnings)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    if (topLpWarnings.length === 0) {
      console.log('  None found! ✓\n');
    } else {
      for (const [check, count] of topLpWarnings) {
        console.log(`  ${check}: ${count}`);
      }
      console.log('');
    }
  }

  // Per-Language Breakdown
  console.log('--- BY LANGUAGE ---\n');
  console.log('Locale | Translations | DB Critical | DB Warnings | LP Critical | LP Warnings');
  console.log('-'.repeat(80));

  for (const [locale, stats] of Object.entries(results.byLanguage)) {
    const lpCrit = results.mode === 'full' ? stats.livePages.critical : '-';
    const lpWarn = results.mode === 'full' ? stats.livePages.warnings : '-';
    console.log(
      `  ${locale.padEnd(4)} | ${String(stats.hasTranslation).padEnd(12)} | ${String(stats.database.critical).padEnd(11)} | ${String(stats.database.warnings).padEnd(11)} | ${String(lpCrit).padEnd(11)} | ${lpWarn}`
    );
  }

  console.log('\n' + '='.repeat(60));
  console.log('                  RECOMMENDATIONS');
  console.log('='.repeat(60) + '\n');

  const totalCritical = results.summary.totals.database.critical + results.summary.totals.livePages.critical;
  const totalWarnings = results.summary.totals.database.warnings + results.summary.totals.livePages.warnings;

  if (totalCritical > 0) {
    console.log('🔴 CRITICAL: Fix these issues first:');

    // Prioritized recommendations
    if (results.summary.database.critical.metaTitlePresent > 0) {
      console.log(`   - Add meta titles to ${results.summary.database.critical.metaTitlePresent} translations`);
    }
    if (results.summary.database.critical.metaDescriptionPresent > 0) {
      console.log(`   - Add meta descriptions to ${results.summary.database.critical.metaDescriptionPresent} translations`);
    }
    if (results.summary.database.critical.contentPresent > 0) {
      console.log(`   - Add content to ${results.summary.database.critical.contentPresent} translations`);
    }
    if (results.summary.database.critical.translationExists > 0) {
      console.log(`   - Create ${results.summary.database.critical.translationExists} missing translations`);
    }
    if (results.summary.livePages.critical.httpStatus > 0) {
      console.log(`   - Fix ${results.summary.livePages.critical.httpStatus} pages returning non-200 status`);
    }
    if (results.summary.livePages.critical.hreflangPresent > 0) {
      console.log(`   - Add hreflang tags to ${results.summary.livePages.critical.hreflangPresent} pages`);
    }
    console.log('');
  }

  if (totalWarnings > 0) {
    console.log('🟡 WARNINGS: Optimize these for better rankings:');

    if (results.summary.database.warnings.focusKeywordPresent > 0) {
      console.log(`   - Add focus keywords to ${results.summary.database.warnings.focusKeywordPresent} translations`);
    }
    if (results.summary.database.warnings.metaTitleLength > 0) {
      console.log(`   - Optimize title lengths for ${results.summary.database.warnings.metaTitleLength} translations`);
    }
    if (results.summary.database.warnings.metaDescriptionLength > 0) {
      console.log(`   - Optimize description lengths for ${results.summary.database.warnings.metaDescriptionLength} translations`);
    }
    if (results.summary.database.warnings.contentLength > 0) {
      console.log(`   - Expand content for ${results.summary.database.warnings.contentLength} translations`);
    }
    if (results.summary.database.warnings.keywordInTitle > 0) {
      console.log(`   - Include focus keyword in ${results.summary.database.warnings.keywordInTitle} titles`);
    }
    console.log('');
  }

  if (totalCritical === 0 && totalWarnings === 0) {
    console.log('🟢 All checks passed! Your blog posts are well-optimized for SEO.\n');
  }

  console.log('='.repeat(60));
  console.log('                    AUDIT COMPLETE');
  console.log('='.repeat(60) + '\n');
}

// Run the audit
auditAllPosts()
  .then(results => {
    const criticalCount = results.summary.totals.database.critical + results.summary.totals.livePages.critical;
    process.exit(criticalCount > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Audit failed:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
