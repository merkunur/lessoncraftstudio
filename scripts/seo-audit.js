/**
 * Comprehensive SEO Audit Script
 * Tests all pages × all languages for proper SEO implementation
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const STATIC_PAGES = ['', '/apps', '/blog', '/pricing', '/terms', '/privacy', '/license'];

// Results storage
const results = {
  passed: 0,
  failed: 0,
  errors: []
};

/**
 * Fetch a URL and return HTML content
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, {
      headers: { 'User-Agent': 'SEO-Audit-Bot/1.0' },
      timeout: 30000
    }, (res) => {
      let data = '';

      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({
          statusCode: res.statusCode,
          redirectTo: res.headers.location,
          html: ''
        });
        return;
      }

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        html: data
      }));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Extract SEO elements from HTML
 */
function extractSeoElements(html) {
  const elements = {
    title: null,
    description: null,
    canonical: null,
    hreflangs: {},
    ogTitle: null,
    ogDescription: null,
    ogUrl: null,
    noindex: false
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  elements.title = titleMatch ? titleMatch[1].trim() : null;

  // Meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  elements.description = descMatch ? descMatch[1] : null;

  // Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                         html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  elements.canonical = canonicalMatch ? canonicalMatch[1] : null;

  // Hreflangs
  const hreflangRegex = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi;
  const hreflangRegex2 = /<link[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["']/gi;

  let match;
  while ((match = hreflangRegex.exec(html)) !== null) {
    elements.hreflangs[match[1]] = match[2];
  }
  while ((match = hreflangRegex2.exec(html)) !== null) {
    elements.hreflangs[match[1]] = match[2];
  }

  // OpenGraph
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  elements.ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;

  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  elements.ogDescription = ogDescMatch ? ogDescMatch[1] : null;

  const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i);
  elements.ogUrl = ogUrlMatch ? ogUrlMatch[1] : null;

  // Noindex
  elements.noindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["']/i.test(html);

  return elements;
}

/**
 * Validate SEO elements for a page
 */
function validateSeo(url, locale, elements, pageType) {
  const issues = [];

  // Check HTTP status (handled separately)

  // Check title
  if (!elements.title) {
    issues.push('Missing <title> tag');
  }

  // Check description
  if (!elements.description) {
    issues.push('Missing meta description');
  }

  // Check canonical
  if (!elements.canonical) {
    issues.push('Missing canonical URL');
  } else if (!elements.canonical.startsWith('https://www.lessoncraftstudio.com')) {
    issues.push(`Canonical uses wrong domain: ${elements.canonical}`);
  }

  // Check hreflangs
  const expectedHreflangs = [...LOCALES, 'x-default'];
  for (const lang of expectedHreflangs) {
    if (!elements.hreflangs[lang]) {
      issues.push(`Missing hreflang for: ${lang}`);
    } else if (!elements.hreflangs[lang].startsWith('https://www.lessoncraftstudio.com')) {
      issues.push(`Hreflang ${lang} uses wrong domain: ${elements.hreflangs[lang]}`);
    }
  }

  // Check OpenGraph
  if (!elements.ogTitle) {
    issues.push('Missing og:title');
  }
  if (!elements.ogUrl) {
    issues.push('Missing og:url');
  } else if (!elements.ogUrl.startsWith('https://www.lessoncraftstudio.com')) {
    issues.push(`og:url uses wrong domain: ${elements.ogUrl}`);
  }

  // Check noindex (should NOT be present on public pages)
  if (elements.noindex && pageType !== 'app-detail') {
    issues.push('Page has noindex but should be indexed');
  }

  return issues;
}

/**
 * Test a single URL
 */
async function testUrl(url, locale, pageType) {
  try {
    const response = await fetchUrl(url);

    // Check for redirects
    if (response.statusCode >= 300 && response.statusCode < 400) {
      results.errors.push({
        url,
        locale,
        type: 'redirect',
        message: `Redirects to: ${response.redirectTo}`
      });
      results.failed++;
      return;
    }

    // Check for 404
    if (response.statusCode === 404) {
      results.errors.push({
        url,
        locale,
        type: '404',
        message: 'Page not found'
      });
      results.failed++;
      return;
    }

    // Check for other errors
    if (response.statusCode !== 200) {
      results.errors.push({
        url,
        locale,
        type: 'http-error',
        message: `HTTP ${response.statusCode}`
      });
      results.failed++;
      return;
    }

    // Extract and validate SEO
    const seoElements = extractSeoElements(response.html);
    const issues = validateSeo(url, locale, seoElements, pageType);

    if (issues.length > 0) {
      results.errors.push({
        url,
        locale,
        type: 'seo-issues',
        issues
      });
      results.failed++;
    } else {
      results.passed++;
    }

  } catch (error) {
    results.errors.push({
      url,
      locale,
      type: 'error',
      message: error.message
    });
    results.failed++;
  }
}

/**
 * Run static page audit
 */
async function auditStaticPages() {
  console.log('\n=== PHASE 1: Static Page Audit ===\n');

  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      const url = `${BASE_URL}/${locale}${page}`;
      process.stdout.write(`Testing: ${url} ... `);
      await testUrl(url, locale, 'static');
      console.log(results.errors.length > 0 && results.errors[results.errors.length - 1].url === url ? 'FAIL' : 'OK');
    }
  }

  console.log(`\nStatic Pages: ${results.passed} passed, ${results.failed} failed`);
}

/**
 * Test sitemap
 */
async function auditSitemap() {
  console.log('\n=== PHASE 3: Sitemap Verification ===\n');

  try {
    const response = await fetchUrl(`${BASE_URL}/sitemap.xml`);

    if (response.statusCode !== 200) {
      console.log(`ERROR: Sitemap returned HTTP ${response.statusCode}`);
      return;
    }

    const xml = response.html;

    // Count URLs
    const urlMatches = xml.match(/<loc>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    console.log(`Sitemap contains ${urlCount} URLs`);

    // Check for /support (should not exist)
    if (xml.includes('/support')) {
      console.log('WARNING: Sitemap contains /support URLs (should be removed)');
    }

    // Check domain consistency
    if (xml.includes('://lessoncraftstudio.com/') && !xml.includes('://www.lessoncraftstudio.com/')) {
      console.log('WARNING: Sitemap uses non-www domain');
    }

    // Extract all URLs and test a sample
    const locRegex = /<loc>([^<]+)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }

    // Test first 10 URLs as sample
    console.log(`\nTesting sample of ${Math.min(10, urls.length)} sitemap URLs...`);
    for (let i = 0; i < Math.min(10, urls.length); i++) {
      process.stdout.write(`  ${urls[i]} ... `);
      try {
        const testResponse = await fetchUrl(urls[i]);
        console.log(testResponse.statusCode === 200 ? 'OK' : `HTTP ${testResponse.statusCode}`);
      } catch (e) {
        console.log(`ERROR: ${e.message}`);
      }
    }

  } catch (error) {
    console.log(`ERROR: Failed to fetch sitemap: ${error.message}`);
  }
}

/**
 * Test robots.txt
 */
async function auditRobots() {
  console.log('\n=== PHASE 4: Technical Infrastructure ===\n');

  try {
    const response = await fetchUrl(`${BASE_URL}/robots.txt`);

    if (response.statusCode !== 200) {
      console.log(`ERROR: robots.txt returned HTTP ${response.statusCode}`);
      return;
    }

    const txt = response.html;
    console.log('robots.txt content:');
    console.log(txt.substring(0, 500));

    // Check for sitemap reference
    if (txt.includes('Sitemap:')) {
      console.log('\n✓ Contains sitemap reference');
    } else {
      console.log('\n✗ Missing sitemap reference');
    }

    // Check for admin block
    if (txt.includes('Disallow: /admin')) {
      console.log('✓ Blocks /admin');
    }

    // Check for API block
    if (txt.includes('Disallow: /api')) {
      console.log('✓ Blocks /api');
    }

  } catch (error) {
    console.log(`ERROR: Failed to fetch robots.txt: ${error.message}`);
  }
}

/**
 * Print summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('SEO AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Passed: ${results.passed}`);
  console.log(`Total Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log('\n--- ISSUES FOUND ---\n');

    // Group by type
    const byType = {};
    for (const error of results.errors) {
      const type = error.type;
      if (!byType[type]) byType[type] = [];
      byType[type].push(error);
    }

    for (const [type, errors] of Object.entries(byType)) {
      console.log(`\n${type.toUpperCase()} (${errors.length} issues):`);
      for (const error of errors.slice(0, 10)) {
        console.log(`  - ${error.url}`);
        if (error.issues) {
          for (const issue of error.issues) {
            console.log(`      * ${issue}`);
          }
        } else if (error.message) {
          console.log(`      ${error.message}`);
        }
      }
      if (errors.length > 10) {
        console.log(`  ... and ${errors.length - 10} more`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('LessonCraftStudio Comprehensive SEO Audit');
  console.log('='.repeat(60));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Languages: ${LOCALES.join(', ')}`);
  console.log(`Static Pages: ${STATIC_PAGES.length}`);
  console.log(`Total Static URLs: ${STATIC_PAGES.length * LOCALES.length}`);

  await auditStaticPages();
  await auditSitemap();
  await auditRobots();

  printSummary();
}

main().catch(console.error);
