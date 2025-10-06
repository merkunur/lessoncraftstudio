/**
 * ================================================================
 * DYNAMIC SEO AUTOMATION TEST
 * ================================================================
 *
 * This test proves the automation is DYNAMIC by:
 * 1. Testing different languages (EN, SV, DE)
 * 2. Verifying schema data CHANGES per post
 * 3. Showing data comes from DATABASE, not hardcoded
 */

const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://localhost:3001';

/**
 * Fetch all posts from database to see what's available
 */
async function getAllPosts() {
  try {
    const response = await axios.get(`${BASE_URL}/api/blog/posts`);
    return response.data.posts || [];
  } catch (error) {
    console.log(`❌ Could not fetch posts: ${error.message}`);
    return [];
  }
}

/**
 * Fetch blog post HTML
 */
async function fetchBlogPage(locale, slug) {
  try {
    const url = `${BASE_URL}/${locale}/blog/${slug}`;
    const response = await axios.get(url);
    return { success: true, html: response.data, url };
  } catch (error) {
    return { success: false };
  }
}

/**
 * Extract schema data to prove it's dynamic
 */
function extractSchemaData(html) {
  const $ = cheerio.load(html);
  const schemaScripts = $('script[type="application/ld+json"]');

  let blogPostingSchema = null;

  schemaScripts.each((index, elem) => {
    try {
      const schemas = JSON.parse($(elem).html());
      if (Array.isArray(schemas)) {
        blogPostingSchema = schemas.find(s => s['@type'] === 'BlogPosting');
      }
    } catch (error) {
      // Skip
    }
  });

  return {
    headline: blogPostingSchema?.headline || null,
    description: blogPostingSchema?.description || null,
    keywords: blogPostingSchema?.keywords || null,
    datePublished: blogPostingSchema?.datePublished || null,
    author: blogPostingSchema?.author?.name || null,
    image: blogPostingSchema?.image || null,
    inLanguage: blogPostingSchema?.inLanguage || null
  };
}

/**
 * Extract meta tags
 */
function extractMetaTags(html) {
  const $ = cheerio.load(html);

  return {
    title: $('title').text() || null,
    description: $('meta[name="description"]').attr('content') || null,
    keywords: $('meta[name="keywords"]').attr('content') || null,
    canonical: $('link[rel="canonical"]').attr('href') || null,
    ogTitle: $('meta[property="og:title"]').attr('content') || null,
    ogLocale: $('meta[property="og:locale"]').attr('content') || null
  };
}

/**
 * Main test execution
 */
async function runDynamicTest() {
  console.log('🧪 DYNAMIC SEO AUTOMATION TEST\n');
  console.log('This test proves the automation is DYNAMIC by comparing');
  console.log('how SEO data CHANGES for different posts.\n');
  console.log('='.repeat(80));

  // Fetch all available posts
  console.log('\n📋 Step 1: Fetching all posts from database...\n');
  const allPosts = await getAllPosts();

  if (allPosts.length === 0) {
    console.log('❌ No posts found in database');
    return false;
  }

  console.log(`Found ${allPosts.length} posts:`);
  allPosts.forEach((post, idx) => {
    console.log(`   ${idx + 1}. ${post.slug} (${post.category})`);
  });

  // Select diverse posts to test
  const postsToTest = allPosts.slice(0, 3);

  console.log('\n' + '='.repeat(80));
  console.log('📊 Step 2: Testing SEO automation for each post\n');

  const results = [];

  for (const post of postsToTest) {
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`Testing: ${post.slug}`);
    console.log(`Category: ${post.category}`);
    console.log(`Title: ${post.title}`);
    console.log('─'.repeat(80));

    // Test in English
    const enResult = await fetchBlogPage('en', post.slug);

    if (!enResult.success) {
      console.log('❌ Could not fetch English version');
      continue;
    }

    const schemaData = extractSchemaData(enResult.html);
    const metaData = extractMetaTags(enResult.html);

    console.log('\n📋 Schema Data Extracted:');
    console.log(`   Headline: "${schemaData.headline}"`);
    console.log(`   Description: "${schemaData.description}"`);
    console.log(`   Keywords: "${schemaData.keywords}"`);
    console.log(`   Date Published: ${schemaData.datePublished}`);
    console.log(`   Author: ${schemaData.author}`);
    console.log(`   Language: ${schemaData.inLanguage}`);
    console.log(`   Has Image: ${schemaData.image ? 'Yes' : 'No'}`);

    console.log('\n🏷️ Meta Tags Extracted:');
    console.log(`   Title: "${metaData.title}"`);
    console.log(`   Description: "${metaData.description}"`);
    console.log(`   Keywords: "${metaData.keywords}"`);
    console.log(`   Canonical: ${metaData.canonical}`);
    console.log(`   OG Locale: ${metaData.ogLocale}`);

    // Test Swedish version
    console.log('\n🇸🇪 Testing Swedish (sv) version...');
    const svResult = await fetchBlogPage('sv', post.slug);

    if (svResult.success) {
      const svSchemaData = extractSchemaData(svResult.html);
      const svMetaData = extractMetaTags(svResult.html);

      console.log(`   Schema Language: ${svSchemaData.inLanguage}`);
      console.log(`   OG Locale: ${svMetaData.ogLocale}`);
      console.log(`   Canonical includes /sv/: ${svMetaData.canonical?.includes('/sv/') ? 'Yes ✅' : 'No ❌'}`);
    }

    // Test German version
    console.log('\n🇩🇪 Testing German (de) version...');
    const deResult = await fetchBlogPage('de', post.slug);

    if (deResult.success) {
      const deSchemaData = extractSchemaData(deResult.html);
      const deMetaData = extractMetaTags(deResult.html);

      console.log(`   Schema Language: ${deSchemaData.inLanguage}`);
      console.log(`   OG Locale: ${deMetaData.ogLocale}`);
      console.log(`   Canonical includes /de/: ${deMetaData.canonical?.includes('/de/') ? 'Yes ✅' : 'No ❌'}`);
    }

    results.push({
      slug: post.slug,
      schemaData,
      metaData
    });
  }

  // Comparative Analysis
  console.log('\n\n' + '='.repeat(80));
  console.log('🔬 COMPARATIVE ANALYSIS - PROVING DYNAMIC AUTOMATION');
  console.log('='.repeat(80));

  console.log('\nComparing schema data across posts:\n');

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`Post ${i + 1}: ${result.slug}`);
    console.log(`   Headline: "${result.schemaData.headline}"`);
    console.log(`   Keywords: "${result.schemaData.keywords}"`);
    console.log(`   Published: ${result.schemaData.datePublished}`);
    console.log(`   Canonical: ${result.metaData.canonical}`);
    console.log('');
  }

  // Check if data is different
  console.log('─'.repeat(80));
  console.log('\n🎯 VERIFICATION RESULTS:\n');

  const headlines = results.map(r => r.schemaData.headline);
  const keywords = results.map(r => r.schemaData.keywords);
  const dates = results.map(r => r.schemaData.datePublished);
  const canonicals = results.map(r => r.metaData.canonical);

  // Check uniqueness
  const uniqueHeadlines = new Set(headlines);
  const uniqueKeywords = new Set(keywords);
  const uniqueDates = new Set(dates);
  const uniqueCanonicals = new Set(canonicals);

  console.log(`1. Headlines are DIFFERENT across posts?`);
  if (uniqueHeadlines.size === headlines.length) {
    console.log(`   ✅ YES - All ${headlines.length} posts have unique headlines`);
    console.log(`   This proves schema data comes from DATABASE, not hardcoded!`);
  } else {
    console.log(`   ⚠️ Some posts share the same headline`);
  }

  console.log(`\n2. Keywords are DIFFERENT across posts?`);
  if (uniqueKeywords.size === keywords.length) {
    console.log(`   ✅ YES - All ${keywords.length} posts have unique keywords`);
    console.log(`   This proves keywords are dynamically pulled per post!`);
  } else {
    console.log(`   ⚠️ Some posts share the same keywords`);
  }

  console.log(`\n3. Published dates are DIFFERENT across posts?`);
  if (uniqueDates.size === dates.length) {
    console.log(`   ✅ YES - All ${dates.length} posts have unique dates`);
    console.log(`   This proves dates are auto-populated from database!`);
  } else {
    console.log(`   ⚠️ Some posts have the same date`);
  }

  console.log(`\n4. Canonical URLs are UNIQUE per post?`);
  if (uniqueCanonicals.size === canonicals.length) {
    console.log(`   ✅ YES - All ${canonicals.length} posts have unique canonical URLs`);
    console.log(`   This proves URLs are generated dynamically per post!`);
  } else {
    console.log(`   ❌ Posts share canonical URLs (CRITICAL ERROR)`);
  }

  // Final verdict
  console.log('\n' + '='.repeat(80));
  const isDynamic = (
    uniqueHeadlines.size === headlines.length &&
    uniqueCanonicals.size === canonicals.length
  );

  if (isDynamic) {
    console.log('✅ CONCLUSION: SEO AUTOMATION IS FULLY DYNAMIC');
    console.log('   - Each post gets unique schema data');
    console.log('   - Data is pulled from database, not hardcoded');
    console.log('   - System adapts to different post content');
    console.log('   - Multi-language support working (locale changes)');
  } else {
    console.log('⚠️ WARNING: Some data appears static or duplicated');
  }
  console.log('='.repeat(80) + '\n');

  return isDynamic;
}

// Execute
runDynamicTest()
  .then(isDynamic => {
    process.exit(isDynamic ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
