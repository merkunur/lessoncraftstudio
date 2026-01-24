/**
 * Blog Post SEO Audit Script
 * Tests all blog posts × all languages for proper SEO
 */

const https = require('https');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Results storage
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  skipped: 0
};

/**
 * Fetch a URL and return status code
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'SEO-Audit-Bot/1.0' },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        html: data
      }));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

/**
 * Check if HTML has proper SEO elements
 */
function checkSeo(html, expectedSlug) {
  const issues = [];

  // Check title
  if (!/<title[^>]*>[^<]+<\/title>/i.test(html)) {
    issues.push('Missing title');
  }

  // Check meta description
  if (!/<meta[^>]*name=["']description["']/i.test(html)) {
    issues.push('Missing meta description');
  }

  // Check canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    issues.push('Missing canonical');
  } else if (!canonicalMatch[1].includes('www.lessoncraftstudio.com')) {
    issues.push(`Wrong canonical domain: ${canonicalMatch[1]}`);
  }

  // Check for noindex (should NOT be present)
  if (/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    issues.push('Has noindex but should be indexed');
  }

  // Check for BlogPosting schema (can be escaped or unescaped)
  if (!html.includes('BlogPosting')) {
    issues.push('Missing BlogPosting schema');
  }

  return issues;
}

/**
 * Test a single blog post in all languages
 */
async function testBlogPost(post, index, total) {
  const translations = post.translations || {};
  const primarySlug = post.slug;

  console.log(`\n[${index + 1}/${total}] Testing: ${primarySlug}`);

  for (const locale of LOCALES) {
    // Get the language-specific slug or fallback to primary
    const localeSlug = translations[locale]?.slug || primarySlug;
    const url = `${BASE_URL}/${locale}/blog/${localeSlug}`;

    try {
      const response = await fetchUrl(url);

      if (response.statusCode === 404) {
        results.errors.push({
          url,
          locale,
          slug: primarySlug,
          type: '404',
          message: 'Page not found'
        });
        results.failed++;
        process.stdout.write('x');
      } else if (response.statusCode === 200) {
        const issues = checkSeo(response.html, localeSlug);
        if (issues.length > 0) {
          results.errors.push({
            url,
            locale,
            slug: primarySlug,
            type: 'seo-issues',
            issues
          });
          results.failed++;
          process.stdout.write('!');
        } else {
          results.passed++;
          process.stdout.write('.');
        }
      } else {
        results.errors.push({
          url,
          locale,
          slug: primarySlug,
          type: 'http-error',
          message: `HTTP ${response.statusCode}`
        });
        results.failed++;
        process.stdout.write('x');
      }
    } catch (error) {
      results.errors.push({
        url,
        locale,
        slug: primarySlug,
        type: 'error',
        message: error.message
      });
      results.failed++;
      process.stdout.write('E');
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Blog Post SEO Audit');
  console.log('='.repeat(60));

  try {
    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        slug: true,
        translations: true
      },
      orderBy: { slug: 'asc' }
    });

    console.log(`Found ${posts.length} published blog posts`);
    console.log(`Testing each in ${LOCALES.length} languages`);
    console.log(`Total URLs to test: ${posts.length * LOCALES.length}`);
    console.log('\nProgress (. = pass, ! = SEO issue, x = 404/error, E = network error):');

    for (let i = 0; i < posts.length; i++) {
      await testBlogPost(posts[i], i, posts.length);
    }

    // Print summary
    console.log('\n\n' + '='.repeat(60));
    console.log('BLOG SEO AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Passed: ${results.passed}`);
    console.log(`Total Failed: ${results.failed}`);
    console.log(`Total Skipped: ${results.skipped}`);

    if (results.errors.length > 0) {
      console.log('\n--- ISSUES FOUND ---\n');

      // Group by type
      const byType = {};
      for (const error of results.errors) {
        if (!byType[error.type]) byType[error.type] = [];
        byType[error.type].push(error);
      }

      for (const [type, errors] of Object.entries(byType)) {
        console.log(`\n${type.toUpperCase()} (${errors.length} issues):`);

        // Show first 20 of each type
        for (const error of errors.slice(0, 20)) {
          console.log(`  - [${error.locale}] ${error.slug}`);
          if (error.issues) {
            for (const issue of error.issues) {
              console.log(`      * ${issue}`);
            }
          } else if (error.message) {
            console.log(`      ${error.message}`);
          }
        }
        if (errors.length > 20) {
          console.log(`  ... and ${errors.length - 20} more`);
        }
      }
    }

    console.log('\n' + '='.repeat(60));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
