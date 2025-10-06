/**
 * ================================================================
 * COMPREHENSIVE SEO VERIFICATION FOR EXISTING BLOG POSTS
 * ================================================================
 *
 * This test verifies SEO automation on existing posts in database
 */

const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://localhost:3001';

// Posts to test (from your existing database)
const POSTS_TO_TEST = [
  { locale: 'en', slug: 'sagdtsghdghg', name: 'EXISTING_POST_1' },
  { locale: 'en', slug: 'dasfreg', name: 'EXISTING_POST_2' },
  { locale: 'en', slug: 'cumbur', name: 'EXISTING_POST_3' }
];

/**
 * Fetch and parse blog post HTML
 */
async function fetchBlogPage(locale, slug) {
  try {
    const url = `${BASE_URL}/${locale}/blog/${slug}`;
    console.log(`🌐 Fetching: ${url}`);
    const response = await axios.get(url);
    return { success: true, html: response.data, url };
  } catch (error) {
    console.log(`❌ Failed to fetch page: ${error.message}`);
    return { success: false };
  }
}

/**
 * Parse and verify all SEO elements
 */
function verifySEOElements(html, postInfo) {
  const $ = cheerio.load(html);
  const results = {
    post: postInfo,
    schemas: { total: 0, types: [], valid: true, details: {} },
    metaTags: { found: [], missing: [], valid: true },
    hreflang: { count: 0, languages: [], valid: true },
    canonical: { found: false, url: null, valid: true },
    openGraph: { found: [], missing: [], valid: true },
    twitter: { found: [], missing: [], valid: true },
    article: { found: [], missing: [], valid: true }
  };

  console.log('\n' + '='.repeat(80));
  console.log(`VERIFYING: ${postInfo.name} (${postInfo.locale}/${postInfo.slug})`);
  console.log('='.repeat(80));

  // ================================================================
  // 1. SCHEMA MARKUP VERIFICATION
  // ================================================================
  console.log('\n🔍 1. SCHEMA MARKUP ANALYSIS:');
  console.log('-'.repeat(80));
  const schemaScripts = $('script[type="application/ld+json"]');

  if (schemaScripts.length === 0) {
    console.log('   ❌ CRITICAL: No schema markup found!');
    results.schemas.valid = false;
  } else {
    schemaScripts.each((index, elem) => {
      try {
        const schemaContent = $(elem).html();
        const schemas = JSON.parse(schemaContent);

        if (Array.isArray(schemas)) {
          results.schemas.total = schemas.length;
          console.log(`   ✅ Found ${schemas.length} schemas`);

          schemas.forEach((schema, idx) => {
            const type = schema['@type'];
            results.schemas.types.push(type);
            console.log(`\n   📋 Schema ${idx + 1}: ${type}`);

            // Detailed verification for each schema type
            if (type === 'BlogPosting') {
              const details = {
                headline: schema.headline || '❌ Missing',
                description: schema.description || '❌ Missing',
                datePublished: schema.datePublished || '❌ Missing',
                dateModified: schema.dateModified || '❌ Missing',
                keywords: schema.keywords || '❌ Missing',
                author: schema.author?.name || '❌ Missing',
                publisher: schema.publisher?.name || '❌ Missing',
                image: schema.image ? '✅ Present' : '❌ Missing',
                valid: !!(schema.headline && schema.description && schema.datePublished)
              };

              console.log(`      • Headline: ${details.headline}`);
              console.log(`      • Description: ${details.description}`);
              console.log(`      • Date Published: ${details.datePublished}`);
              console.log(`      • Date Modified: ${details.dateModified}`);
              console.log(`      • Keywords: ${details.keywords}`);
              console.log(`      • Author: ${details.author}`);
              console.log(`      • Publisher: ${details.publisher}`);
              console.log(`      • Image: ${details.image}`);
              console.log(`      ${details.valid ? '✅' : '❌'} Schema Valid: ${details.valid}`);

              results.schemas.details.BlogPosting = details;
            }

            if (type === 'BreadcrumbList') {
              const itemCount = schema.itemListElement?.length || 0;
              const valid = itemCount >= 3;
              console.log(`      • Breadcrumb Items: ${itemCount}`);
              console.log(`      ${valid ? '✅' : '❌'} Valid: ${valid} (Expected: 3+)`);

              if (schema.itemListElement) {
                schema.itemListElement.forEach((item, i) => {
                  console.log(`        ${i + 1}. ${item.name}`);
                });
              }

              results.schemas.details.BreadcrumbList = { itemCount, valid };
            }

            if (type === 'LearningResource') {
              const details = {
                name: schema.name || '❌ Missing',
                educationalLevel: schema.educationalLevel || '❌ Missing',
                educationalUse: schema.educationalUse || '❌ Missing',
                teaches: schema.teaches || '❌ Missing',
                typicalAgeRange: schema.typicalAgeRange || '❌ Missing',
                valid: !!(schema.name && schema.educationalLevel)
              };

              console.log(`      • Name: ${details.name}`);
              console.log(`      • Educational Level: ${details.educationalLevel}`);
              console.log(`      • Educational Use: ${details.educationalUse}`);
              console.log(`      • Teaches: ${details.teaches}`);
              console.log(`      • Age Range: ${details.typicalAgeRange}`);
              console.log(`      ${details.valid ? '✅' : '❌'} Schema Valid: ${details.valid}`);

              results.schemas.details.LearningResource = details;
            }

            if (type === 'ImageObject') {
              const url = schema.url || '❌ Missing';
              const valid = !!schema.url;
              console.log(`      • URL: ${url}`);
              console.log(`      • Width: ${schema.width || 'N/A'}`);
              console.log(`      • Height: ${schema.height || 'N/A'}`);
              console.log(`      ${valid ? '✅' : '❌'} Schema Valid: ${valid}`);

              results.schemas.details.ImageObject = { url, valid };
            }

            if (type === 'EducationalOrganization') {
              const langCount = schema.availableLanguage?.length || 0;
              const valid = !!(schema.name && schema.availableLanguage);
              console.log(`      • Name: ${schema.name || '❌ Missing'}`);
              console.log(`      • Available Languages: ${langCount}`);
              console.log(`      ${valid ? '✅' : '❌'} Schema Valid: ${valid}`);

              results.schemas.details.EducationalOrganization = {
                name: schema.name,
                languageCount: langCount,
                valid
              };
            }
          });

          // Overall schema validation
          console.log(`\n   📊 SCHEMA SUMMARY:`);
          console.log(`      Total Schemas: ${results.schemas.total}`);
          console.log(`      Expected: 5 (or 4 without image)`);
          if (results.schemas.total >= 4) {
            console.log(`      ✅ PASSED`);
          } else {
            console.log(`      ❌ FAILED - Insufficient schemas`);
            results.schemas.valid = false;
          }
        }
      } catch (error) {
        results.schemas.valid = false;
        console.log(`   ❌ Schema parsing error: ${error.message}`);
      }
    });
  }

  // ================================================================
  // 2. META TAGS VERIFICATION
  // ================================================================
  console.log('\n🔍 2. META TAGS ANALYSIS:');
  console.log('-'.repeat(80));

  const metaTagsToCheck = [
    { name: 'title', selector: 'title', critical: true },
    { name: 'description', selector: 'meta[name="description"]', critical: true },
    { name: 'keywords', selector: 'meta[name="keywords"]', critical: false },
    { name: 'robots', selector: 'meta[name="robots"]', critical: true },
    { name: 'googlebot', selector: 'meta[name="googlebot"]', critical: true }
  ];

  metaTagsToCheck.forEach(meta => {
    const elem = $(meta.selector);
    if (elem.length > 0) {
      const content = meta.name === 'title' ? elem.text() : elem.attr('content');
      results.metaTags.found.push(meta.name);
      console.log(`   ✅ ${meta.name}: ${content?.substring(0, 60)}...`);
    } else {
      results.metaTags.missing.push(meta.name);
      console.log(`   ${meta.critical ? '❌' : '⚠️'} ${meta.name}: Missing`);
    }
  });

  const criticalMetasMissing = results.metaTags.missing.filter(name =>
    metaTagsToCheck.find(m => m.name === name)?.critical
  );

  console.log(`\n   📊 META TAGS SUMMARY:`);
  console.log(`      Found: ${results.metaTags.found.length}/${metaTagsToCheck.length}`);
  if (criticalMetasMissing.length === 0) {
    console.log(`      ✅ PASSED - All critical tags present`);
  } else {
    console.log(`      ❌ FAILED - Missing critical tags: ${criticalMetasMissing.join(', ')}`);
    results.metaTags.valid = false;
  }

  // ================================================================
  // 3. CANONICAL URL VERIFICATION
  // ================================================================
  console.log('\n🔍 3. CANONICAL URL ANALYSIS:');
  console.log('-'.repeat(80));

  const canonical = $('link[rel="canonical"]');
  if (canonical.length > 0) {
    results.canonical.found = true;
    results.canonical.url = canonical.attr('href');
    console.log(`   ✅ Canonical URL: ${results.canonical.url}`);

    // Verify it matches expected pattern
    const expectedPattern = `${BASE_URL}/${postInfo.locale}/blog/${postInfo.slug}`;
    if (results.canonical.url === expectedPattern) {
      console.log(`   ✅ URL Format: Correct`);
    } else {
      console.log(`   ⚠️ URL Format: Expected ${expectedPattern}`);
    }
  } else {
    results.canonical.valid = false;
    console.log(`   ❌ Canonical URL: Missing (CRITICAL)`);
  }

  console.log(`\n   📊 CANONICAL SUMMARY:`);
  console.log(`      ${results.canonical.found ? '✅ PASSED' : '❌ FAILED'}`);

  // ================================================================
  // 4. HREFLANG TAGS VERIFICATION
  // ================================================================
  console.log('\n🔍 4. HREFLANG TAGS ANALYSIS:');
  console.log('-'.repeat(80));

  const hreflangTags = $('link[rel="alternate"][hreflang]');
  hreflangTags.each((index, elem) => {
    const hreflang = $(elem).attr('hreflang');
    const href = $(elem).attr('href');
    if (hreflang) {
      results.hreflang.languages.push(hreflang);
      results.hreflang.count++;
      console.log(`   ✅ ${hreflang}: ${href}`);
    }
  });

  console.log(`\n   📊 HREFLANG SUMMARY:`);
  console.log(`      Total Languages: ${results.hreflang.count}`);
  console.log(`      Expected: 11`);
  console.log(`      Languages: ${results.hreflang.languages.join(', ')}`);
  if (results.hreflang.count >= 11) {
    console.log(`      ✅ PASSED`);
  } else {
    console.log(`      ⚠️ WARNING - Only ${results.hreflang.count} languages`);
  }

  // ================================================================
  // 5. OPEN GRAPH TAGS VERIFICATION
  // ================================================================
  console.log('\n🔍 5. OPEN GRAPH TAGS ANALYSIS:');
  console.log('-'.repeat(80));

  const ogTagsToCheck = [
    'og:title',
    'og:description',
    'og:url',
    'og:type',
    'og:site_name',
    'og:locale',
    'og:image'
  ];

  ogTagsToCheck.forEach(tag => {
    const elem = $(`meta[property="${tag}"]`);
    if (elem.length > 0) {
      const content = elem.attr('content');
      results.openGraph.found.push(tag);
      console.log(`   ✅ ${tag}: ${content?.substring(0, 50)}...`);
    } else {
      results.openGraph.missing.push(tag);
      console.log(`   ❌ ${tag}: Missing`);
    }
  });

  console.log(`\n   📊 OPEN GRAPH SUMMARY:`);
  console.log(`      Found: ${results.openGraph.found.length}/${ogTagsToCheck.length}`);
  if (results.openGraph.found.length >= 6) {
    console.log(`      ✅ PASSED`);
  } else {
    console.log(`      ❌ FAILED`);
    results.openGraph.valid = false;
  }

  // ================================================================
  // 6. TWITTER CARD TAGS VERIFICATION
  // ================================================================
  console.log('\n🔍 6. TWITTER CARD TAGS ANALYSIS:');
  console.log('-'.repeat(80));

  const twitterTagsToCheck = [
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:creator'
  ];

  twitterTagsToCheck.forEach(tag => {
    const elem = $(`meta[name="${tag}"]`);
    if (elem.length > 0) {
      const content = elem.attr('content');
      results.twitter.found.push(tag);
      console.log(`   ✅ ${tag}: ${content?.substring(0, 50)}...`);
    } else {
      results.twitter.missing.push(tag);
      console.log(`   ⚠️ ${tag}: Missing`);
    }
  });

  console.log(`\n   📊 TWITTER CARD SUMMARY:`);
  console.log(`      Found: ${results.twitter.found.length}/${twitterTagsToCheck.length}`);
  if (results.twitter.found.length >= 4) {
    console.log(`      ✅ PASSED`);
  } else {
    console.log(`      ⚠️ WARNING - Incomplete`);
  }

  // ================================================================
  // 7. ARTICLE META TAGS VERIFICATION
  // ================================================================
  console.log('\n🔍 7. ARTICLE META TAGS ANALYSIS:');
  console.log('-'.repeat(80));

  const articleTagsToCheck = [
    'article:author',
    'article:published_time',
    'article:modified_time',
    'article:section',
    'article:tag'
  ];

  articleTagsToCheck.forEach(tag => {
    const elem = $(`meta[name="${tag}"], meta[property="${tag}"]`);
    if (elem.length > 0) {
      const content = elem.attr('content');
      results.article.found.push(tag);
      console.log(`   ✅ ${tag}: ${content?.substring(0, 50)}...`);
    } else {
      results.article.missing.push(tag);
      console.log(`   ⚠️ ${tag}: Missing`);
    }
  });

  console.log(`\n   📊 ARTICLE TAGS SUMMARY:`);
  console.log(`      Found: ${results.article.found.length}/${articleTagsToCheck.length}`);
  if (results.article.found.length >= 4) {
    console.log(`      ✅ PASSED`);
  } else {
    console.log(`      ⚠️ WARNING - Incomplete`);
  }

  return results;
}

/**
 * Generate final report
 */
function generateFinalReport(allResults) {
  console.log('\n\n');
  console.log('='.repeat(80));
  console.log('📊 FINAL COMPREHENSIVE TEST REPORT');
  console.log('='.repeat(80));

  let totalPosts = allResults.length;
  let postsWithAllSchemas = 0;
  let postsWithValidMeta = 0;
  let postsWithCanonical = 0;
  let postsWithHreflang = 0;

  allResults.forEach(result => {
    if (result.schemas && result.schemas.total >= 4) postsWithAllSchemas++;
    if (result.metaTags && result.metaTags.valid) postsWithValidMeta++;
    if (result.canonical && result.canonical.found) postsWithCanonical++;
    if (result.hreflang && result.hreflang.count >= 11) postsWithHreflang++;
  });

  console.log('\n📋 OVERALL STATISTICS:');
  console.log(`   Total Posts Tested: ${totalPosts}`);
  console.log(`   Posts with Complete Schemas (4-5): ${postsWithAllSchemas}/${totalPosts}`);
  console.log(`   Posts with Valid Meta Tags: ${postsWithValidMeta}/${totalPosts}`);
  console.log(`   Posts with Canonical URLs: ${postsWithCanonical}/${totalPosts}`);
  console.log(`   Posts with Full Hreflang (11): ${postsWithHreflang}/${totalPosts}`);

  const allPassed = (
    postsWithAllSchemas === totalPosts &&
    postsWithValidMeta === totalPosts &&
    postsWithCanonical === totalPosts
  );

  console.log('\n' + '='.repeat(80));
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED - SEO AUTOMATION IS WORKING FLAWLESSLY! 🎉');
  } else {
    console.log('⚠️ SOME TESTS HAD ISSUES - REVIEW DETAILS ABOVE');
  }
  console.log('='.repeat(80) + '\n');

  return allPassed;
}

/**
 * MAIN TEST EXECUTION
 */
async function runTests() {
  console.log('🚀 COMPREHENSIVE SEO VERIFICATION TEST\n');
  console.log('Testing existing blog posts for:');
  console.log('  ✓ Schema Markup (5 types)');
  console.log('  ✓ Meta Tags');
  console.log('  ✓ Canonical URLs');
  console.log('  ✓ Hreflang Tags');
  console.log('  ✓ Open Graph Tags');
  console.log('  ✓ Twitter Cards');
  console.log('  ✓ Article Metadata\n');

  const allResults = [];

  for (const post of POSTS_TO_TEST) {
    const fetchResult = await fetchBlogPage(post.locale, post.slug);

    if (!fetchResult.success) {
      console.log(`\n❌ Skipping ${post.name} - could not fetch`);
      continue;
    }

    const verification = verifySEOElements(fetchResult.html, post);
    allResults.push(verification);

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const allPassed = generateFinalReport(allResults);

  return allPassed;
}

// Execute tests
runTests()
  .then(allPassed => {
    process.exit(allPassed ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
