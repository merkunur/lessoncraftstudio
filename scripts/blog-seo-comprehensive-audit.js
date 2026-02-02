/**
 * Comprehensive Blog SEO Audit Script
 *
 * This script performs a full SEO audit of all blog posts including:
 * - Database-level validation (meta title, description, focus keywords, content length)
 * - Live URL status codes (200, 301, 404)
 * - Redirect chain validation
 * - Cross-locale consistency checks
 *
 * Usage (run on server with database access):
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/blog-seo-comprehensive-audit.js
 *
 * Options:
 *   --full           Run full audit including live URL checks (slow)
 *   --db-only        Only run database-level checks (fast)
 *   --output=json    Output format: json, csv, or both
 *   --locale=en      Only audit specific locale
 */

const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Must run from frontend directory where node_modules is
const prismaPath = path.join(__dirname, '../frontend/node_modules/@prisma/client');
const { PrismaClient } = require(prismaPath);

const prisma = new PrismaClient();

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BASE_URL = 'https://www.lessoncraftstudio.com';

// SEO validation rules
const SEO_RULES = {
  metaTitle: { min: 30, max: 70, optimal: { min: 50, max: 60 } },
  metaDescription: { min: 100, max: 160, optimal: { min: 120, max: 155 } },
  content: { min: 300, optimal: 1000 },
  focusKeyword: { minWords: 1, maxWords: 5 },
};

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  full: args.includes('--full'),
  dbOnly: args.includes('--db-only'),
  output: args.find(a => a.startsWith('--output='))?.split('=')[1] || 'json',
  locale: args.find(a => a.startsWith('--locale='))?.split('=')[1] || null,
};

/**
 * Sleep for ms milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch URL and return status code and final location
 */
function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${BASE_URL}${res.headers.location}`;
        resolve({
          status: res.statusCode,
          redirectTo: res.headers.location,
          chain: [{ url, status: res.statusCode, location: res.headers.location }],
          final: null,
        });
      } else {
        resolve({
          status: res.statusCode,
          redirectTo: null,
          chain: [],
          final: { url, status: res.statusCode },
        });
      }
    });

    req.on('error', (err) => {
      resolve({ status: 0, error: err.message, chain: [], final: null });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'timeout', chain: [], final: null });
    });
  });
}

/**
 * Follow redirect chain to final destination
 */
async function followRedirects(url, maxRedirects = 10) {
  const chain = [];
  let currentUrl = url;
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    const result = await fetchUrl(currentUrl, 0);
    chain.push({ url: currentUrl, status: result.status });

    if ([301, 302, 307, 308].includes(result.status) && result.redirectTo) {
      const nextUrl = result.redirectTo.startsWith('http')
        ? result.redirectTo
        : `${BASE_URL}${result.redirectTo}`;
      currentUrl = nextUrl;
      redirectCount++;
    } else {
      break;
    }
  }

  return {
    originalUrl: url,
    finalUrl: currentUrl,
    finalStatus: chain[chain.length - 1]?.status || 0,
    redirectCount: chain.length - 1,
    chain,
    isLoop: redirectCount >= maxRedirects,
  };
}

/**
 * Count words in content (strip HTML)
 */
function countWords(content) {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(w => w.length > 0).length;
}

/**
 * Validate SEO fields for a single translation
 */
function validateTranslation(translation, locale, postId) {
  const issues = [];

  // Meta title validation
  if (!translation.metaTitle) {
    issues.push({ field: 'metaTitle', severity: 'HIGH', message: 'Missing meta title' });
  } else {
    const len = translation.metaTitle.length;
    if (len < SEO_RULES.metaTitle.min) {
      issues.push({ field: 'metaTitle', severity: 'MEDIUM', message: `Meta title too short (${len} chars, min ${SEO_RULES.metaTitle.min})` });
    } else if (len > SEO_RULES.metaTitle.max) {
      issues.push({ field: 'metaTitle', severity: 'MEDIUM', message: `Meta title too long (${len} chars, max ${SEO_RULES.metaTitle.max})` });
    } else if (len < SEO_RULES.metaTitle.optimal.min || len > SEO_RULES.metaTitle.optimal.max) {
      issues.push({ field: 'metaTitle', severity: 'LOW', message: `Meta title not optimal length (${len} chars, optimal ${SEO_RULES.metaTitle.optimal.min}-${SEO_RULES.metaTitle.optimal.max})` });
    }
  }

  // Meta description validation
  if (!translation.metaDescription) {
    issues.push({ field: 'metaDescription', severity: 'HIGH', message: 'Missing meta description' });
  } else {
    const len = translation.metaDescription.length;
    if (len < SEO_RULES.metaDescription.min) {
      issues.push({ field: 'metaDescription', severity: 'MEDIUM', message: `Meta description too short (${len} chars, min ${SEO_RULES.metaDescription.min})` });
    } else if (len > SEO_RULES.metaDescription.max) {
      issues.push({ field: 'metaDescription', severity: 'MEDIUM', message: `Meta description too long (${len} chars, max ${SEO_RULES.metaDescription.max})` });
    }
  }

  // Focus keyword validation
  if (!translation.focusKeyword) {
    issues.push({ field: 'focusKeyword', severity: 'MEDIUM', message: 'Missing focus keyword' });
  } else {
    const words = translation.focusKeyword.trim().split(/\s+/).length;
    if (words > SEO_RULES.focusKeyword.maxWords) {
      issues.push({ field: 'focusKeyword', severity: 'LOW', message: `Focus keyword too long (${words} words, max ${SEO_RULES.focusKeyword.maxWords})` });
    }
    // Check if focus keyword appears in title
    if (translation.metaTitle && translation.focusKeyword) {
      const titleLower = translation.metaTitle.toLowerCase();
      const keywordLower = translation.focusKeyword.toLowerCase();
      if (!titleLower.includes(keywordLower.split(' ')[0])) {
        issues.push({ field: 'focusKeyword', severity: 'LOW', message: 'Focus keyword not found in meta title' });
      }
    }
  }

  // Content validation
  const wordCount = countWords(translation.content);
  if (wordCount < SEO_RULES.content.min) {
    issues.push({ field: 'content', severity: 'HIGH', message: `Thin content (${wordCount} words, min ${SEO_RULES.content.min})` });
  } else if (wordCount < SEO_RULES.content.optimal) {
    issues.push({ field: 'content', severity: 'LOW', message: `Content below optimal (${wordCount} words, optimal ${SEO_RULES.content.optimal}+)` });
  }

  // Slug validation
  if (!translation.slug) {
    issues.push({ field: 'slug', severity: 'CRITICAL', message: 'Missing slug' });
  } else if (!/^[a-z0-9-]+$/.test(translation.slug)) {
    issues.push({ field: 'slug', severity: 'HIGH', message: `Invalid slug characters: ${translation.slug}` });
  }

  // Title validation
  if (!translation.title) {
    issues.push({ field: 'title', severity: 'HIGH', message: 'Missing title (H1)' });
  }

  return {
    locale,
    postId,
    slug: translation.slug,
    title: translation.title,
    issues,
    wordCount,
    metaTitleLength: translation.metaTitle?.length || 0,
    metaDescriptionLength: translation.metaDescription?.length || 0,
  };
}

/**
 * Run database-level SEO audit
 */
async function auditDatabase() {
  console.log('\n=== DATABASE SEO AUDIT ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
      featuredImage: true,
    },
  });

  console.log(`Auditing ${posts.length} published blog posts...\n`);

  const results = {
    totalPosts: posts.length,
    totalTranslations: 0,
    byLocale: {},
    bySeverity: { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [] },
    missingTranslations: [],
    allIssues: [],
  };

  for (const locale of LOCALES) {
    results.byLocale[locale] = { total: 0, issues: 0, missing: 0 };
  }

  for (const post of posts) {
    const translations = post.translations || {};

    // Check for missing translations
    for (const locale of LOCALES) {
      if (options.locale && options.locale !== locale) continue;

      if (!translations[locale]) {
        results.missingTranslations.push({ postId: post.id, locale });
        results.byLocale[locale].missing++;
        results.bySeverity.CRITICAL.push({
          postId: post.id,
          locale,
          field: 'translation',
          message: `Missing ${locale} translation`,
        });
        continue;
      }

      results.totalTranslations++;
      results.byLocale[locale].total++;

      const validation = validateTranslation(translations[locale], locale, post.id);

      if (validation.issues.length > 0) {
        results.byLocale[locale].issues += validation.issues.length;

        for (const issue of validation.issues) {
          results.bySeverity[issue.severity].push({
            postId: post.id,
            locale,
            slug: validation.slug,
            ...issue,
          });
          results.allIssues.push({
            postId: post.id,
            locale,
            slug: validation.slug,
            ...issue,
          });
        }
      }
    }

    // Check for missing featured image
    if (!post.featuredImage) {
      for (const locale of LOCALES) {
        if (options.locale && options.locale !== locale) continue;
        if (translations[locale]) {
          results.bySeverity.LOW.push({
            postId: post.id,
            locale,
            slug: translations[locale].slug,
            field: 'featuredImage',
            message: 'Missing featured image',
          });
        }
      }
    }
  }

  return results;
}

/**
 * Run live URL audit (slow)
 */
async function auditLiveUrls(dbResults) {
  console.log('\n=== LIVE URL AUDIT ===\n');
  console.log('Testing URLs (this may take a while)...\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      translations: true,
    },
  });

  const results = {
    totalUrls: 0,
    statusCodes: {},
    errors: [],
    redirects: [],
    success: [],
  };

  let urlCount = 0;
  const totalUrls = posts.length * (options.locale ? 1 : LOCALES.length);

  for (const post of posts) {
    const translations = post.translations || {};

    for (const locale of LOCALES) {
      if (options.locale && options.locale !== locale) continue;

      const translation = translations[locale];
      if (!translation?.slug) continue;

      const url = `${BASE_URL}/${locale}/blog/${translation.slug}`;
      urlCount++;

      // Rate limiting: 3 requests per second
      if (urlCount % 3 === 0) {
        await sleep(1000);
      }

      // Progress indicator
      if (urlCount % 50 === 0) {
        console.log(`  Progress: ${urlCount}/${totalUrls} URLs tested...`);
      }

      const result = await followRedirects(url);
      results.totalUrls++;

      // Track status codes
      const status = result.finalStatus;
      results.statusCodes[status] = (results.statusCodes[status] || 0) + 1;

      if (status === 200) {
        results.success.push({ url, locale, slug: translation.slug });
      } else if (status === 404) {
        results.errors.push({
          url,
          locale,
          slug: translation.slug,
          postId: post.id,
          status,
          severity: 'CRITICAL',
          message: '404 Not Found',
        });
      } else if (result.redirectCount > 0) {
        results.redirects.push({
          url,
          locale,
          slug: translation.slug,
          finalUrl: result.finalUrl,
          finalStatus: result.finalStatus,
          chain: result.chain,
          isLoop: result.isLoop,
        });

        if (result.isLoop) {
          results.errors.push({
            url,
            locale,
            slug: translation.slug,
            postId: post.id,
            status: 'LOOP',
            severity: 'CRITICAL',
            message: 'Redirect loop detected',
            chain: result.chain,
          });
        }
      } else if (status !== 200) {
        results.errors.push({
          url,
          locale,
          slug: translation.slug,
          postId: post.id,
          status,
          severity: 'HIGH',
          message: `HTTP ${status} error`,
        });
      }
    }
  }

  return results;
}

/**
 * Load legacy redirects configuration
 */
function loadLegacyRedirects() {
  const possiblePaths = [
    path.join(__dirname, '../frontend/config/blog-redirects.js'),
    '/opt/lessoncraftstudio/frontend/config/blog-redirects.js',
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const module = require(p);
        return module.legacyBlogSlugs || [];
      } catch (e) {
        console.warn(`Could not load redirects from ${p}:`, e.message);
      }
    }
  }
  return [];
}

/**
 * Audit redirect configuration
 */
async function auditRedirects() {
  console.log('\n=== REDIRECT CONFIGURATION AUDIT ===\n');

  const legacyRedirects = loadLegacyRedirects();
  console.log(`Found ${legacyRedirects.length} legacy redirects configured\n`);

  const results = {
    totalRedirects: legacyRedirects.length,
    byLocale: {},
    issues: [],
    duplicates: [],
    selfRedirects: [],
  };

  const seenOldSlugs = {};

  for (const redirect of legacyRedirects) {
    const { oldSlug, newSlug, locale } = redirect;

    // Track by locale
    if (!results.byLocale[locale]) {
      results.byLocale[locale] = { count: 0, issues: 0 };
    }
    results.byLocale[locale].count++;

    // Check for self-redirects
    if (oldSlug === newSlug) {
      results.selfRedirects.push(redirect);
      results.byLocale[locale].issues++;
    }

    // Check for duplicates
    const key = `${locale}:${oldSlug}`;
    if (seenOldSlugs[key]) {
      results.duplicates.push({ ...redirect, duplicateOf: seenOldSlugs[key] });
      results.byLocale[locale].issues++;
    } else {
      seenOldSlugs[key] = redirect;
    }
  }

  return results;
}

/**
 * Generate audit report
 */
function generateReport(dbResults, urlResults, redirectResults) {
  const report = {
    generated: new Date().toISOString(),
    summary: {
      totalPosts: dbResults.totalPosts,
      totalTranslations: dbResults.totalTranslations,
      totalIssues: dbResults.allIssues.length,
      bySeverity: {
        CRITICAL: dbResults.bySeverity.CRITICAL.length,
        HIGH: dbResults.bySeverity.HIGH.length,
        MEDIUM: dbResults.bySeverity.MEDIUM.length,
        LOW: dbResults.bySeverity.LOW.length,
      },
      missingTranslations: dbResults.missingTranslations.length,
    },
    databaseAudit: dbResults,
    urlAudit: urlResults || null,
    redirectAudit: redirectResults,
  };

  // Calculate SEO score (0-100)
  const totalChecks = dbResults.totalTranslations * 6; // 6 checks per translation
  const criticalWeight = 10;
  const highWeight = 5;
  const mediumWeight = 2;
  const lowWeight = 1;

  const deductions =
    report.summary.bySeverity.CRITICAL * criticalWeight +
    report.summary.bySeverity.HIGH * highWeight +
    report.summary.bySeverity.MEDIUM * mediumWeight +
    report.summary.bySeverity.LOW * lowWeight;

  const maxDeduction = totalChecks * criticalWeight;
  report.summary.seoScore = Math.max(0, Math.round(100 - (deductions / maxDeduction) * 100));

  return report;
}

/**
 * Output report to files
 */
function outputReport(report, format) {
  const outputDir = path.join(__dirname, '..');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  if (format === 'json' || format === 'both') {
    const jsonPath = path.join(outputDir, `blog-seo-audit-report-${timestamp}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`\nJSON report saved to: ${jsonPath}`);
  }

  if (format === 'csv' || format === 'both') {
    const csvPath = path.join(outputDir, `blog-seo-audit-issues-${timestamp}.csv`);
    const csvHeader = 'PostID,Locale,Slug,Severity,Field,Message\n';
    const csvRows = report.databaseAudit.allIssues.map(i =>
      `"${i.postId}","${i.locale}","${i.slug || ''}","${i.severity}","${i.field}","${i.message}"`
    ).join('\n');
    fs.writeFileSync(csvPath, csvHeader + csvRows);
    console.log(`CSV issues saved to: ${csvPath}`);
  }
}

/**
 * Print summary to console
 */
function printSummary(report) {
  console.log('\n' + '='.repeat(60));
  console.log('BLOG SEO AUDIT SUMMARY');
  console.log('='.repeat(60));

  console.log(`\nGenerated: ${report.generated}`);
  console.log(`\nOverall SEO Score: ${report.summary.seoScore}/100`);

  console.log('\n--- Content Statistics ---');
  console.log(`Total blog posts: ${report.summary.totalPosts}`);
  console.log(`Total translations: ${report.summary.totalTranslations}`);
  console.log(`Missing translations: ${report.summary.missingTranslations}`);

  console.log('\n--- Issues by Severity ---');
  console.log(`CRITICAL: ${report.summary.bySeverity.CRITICAL}`);
  console.log(`HIGH: ${report.summary.bySeverity.HIGH}`);
  console.log(`MEDIUM: ${report.summary.bySeverity.MEDIUM}`);
  console.log(`LOW: ${report.summary.bySeverity.LOW}`);
  console.log(`Total: ${report.summary.totalIssues}`);

  if (report.urlAudit) {
    console.log('\n--- URL Status Codes ---');
    for (const [status, count] of Object.entries(report.urlAudit.statusCodes)) {
      console.log(`HTTP ${status}: ${count}`);
    }
    console.log(`Errors: ${report.urlAudit.errors.length}`);
  }

  console.log('\n--- Redirect Configuration ---');
  console.log(`Total legacy redirects: ${report.redirectAudit.totalRedirects}`);
  console.log(`Self-redirects (bugs): ${report.redirectAudit.selfRedirects.length}`);
  console.log(`Duplicate redirects: ${report.redirectAudit.duplicates.length}`);

  // Show top issues
  if (report.databaseAudit.bySeverity.CRITICAL.length > 0) {
    console.log('\n--- Critical Issues (first 10) ---');
    for (const issue of report.databaseAudit.bySeverity.CRITICAL.slice(0, 10)) {
      console.log(`  [${issue.locale}] ${issue.slug || issue.postId}: ${issue.message}`);
    }
  }

  if (report.databaseAudit.bySeverity.HIGH.length > 0) {
    console.log('\n--- High Priority Issues (first 10) ---');
    for (const issue of report.databaseAudit.bySeverity.HIGH.slice(0, 10)) {
      console.log(`  [${issue.locale}] ${issue.slug || issue.postId}: ${issue.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

async function main() {
  console.log('Blog SEO Comprehensive Audit');
  console.log('============================\n');

  console.log('Options:');
  console.log(`  Full audit (live URLs): ${options.full}`);
  console.log(`  Database only: ${options.dbOnly}`);
  console.log(`  Output format: ${options.output}`);
  console.log(`  Locale filter: ${options.locale || 'all'}`);

  try {
    // Always run database audit
    const dbResults = await auditDatabase();

    // Run live URL audit if requested
    let urlResults = null;
    if (options.full && !options.dbOnly) {
      urlResults = await auditLiveUrls(dbResults);
    }

    // Always audit redirect configuration
    const redirectResults = await auditRedirects();

    // Generate and output report
    const report = generateReport(dbResults, urlResults, redirectResults);

    printSummary(report);
    outputReport(report, options.output);

    console.log('\nAudit complete!');

  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
