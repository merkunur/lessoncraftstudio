/**
 * FIX FAILED BLOG POSTS
 *
 * Imports the 19 posts that failed due to hex escape errors
 * Strategy: Sanitize HTML content to remove problematic escape sequences
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('../frontend/node_modules/@prisma/client');

const prisma = new PrismaClient();

// Configuration
const BLOG_BUILDING_DIR = 'C:/Users/rkgen/lessoncraftstudio/BLOG BUILDING';

// Language configuration
const LANGUAGES = {
  'ENGLISH BLOGPOSTS': 'en',
  'GERMAN BLOGPOSTS': 'de',
  'FRENCH BLOGPOSTS': 'fr',
  'SPANISH BLOGPOSTS': 'es',
  'PORTUGUESE BLOGPOSTS': 'pt',
  'ITALIAN BLOGPOSTS': 'it',
  'DUTCH BLOGPOSTS': 'nl',
  'DANISH BLOGPOSTS': 'da',
  'SWEDISH BLOGPOSTS': 'sv',
  'NORWEGIAN BLOGPOSTS': 'no',
  'FINNISH BLOGPOSTS': 'fi'
};

/**
 * Sanitize HTML content to prevent hex escape errors
 * AGGRESSIVE approach: Remove ALL backslashes
 */
function sanitizeHtmlContent(html) {
  if (!html) return '';

  // Remove ALL backslashes to prevent ANY escape sequence issues
  let sanitized = html
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove ALL backslashes (they cause JSON serialization issues)
    .replace(/\\/g, '')
    // Remove other control characters
    .replace(/[\x00-\x1F\x7F]/g, '');

  return sanitized;
}

/**
 * Extract slug from filename
 */
function extractSlugFromFilename(filename) {
  return filename
    .replace(/^\d{3}-/, '') // Remove "001-" prefix
    .replace(/\.html$/, ''); // Remove .html extension
}

/**
 * Parse HTML blog post and extract metadata and content
 */
function parseHtmlBlogPost(htmlContent) {
  const root = parse(htmlContent);

  // Extract metadata from <head>
  const metaTitle = root.querySelector('title')?.text || '';
  const metaDescription = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const metaKeywords = root.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';

  // Extract main title from <h1>
  const h1 = root.querySelector('h1')?.text || metaTitle;

  // Extract article content
  const article = root.querySelector('article');
  let content = article ? article.innerHTML : '';

  // Sanitize content to prevent hex escape errors
  content = sanitizeHtmlContent(content);

  // Generate excerpt (first 200 characters of text content)
  const textContent = article ? article.text : '';
  const excerpt = textContent.substring(0, 200).trim() + '...';

  return {
    title: h1,
    metaTitle: sanitizeHtmlContent(metaTitle),
    metaDescription: sanitizeHtmlContent(metaDescription),
    keywords: metaKeywords,
    content,
    excerpt: sanitizeHtmlContent(excerpt)
  };
}

/**
 * Find HTML file for a given post number in a language folder
 */
function findHtmlFile(languageFolder, postNumber) {
  const folderPath = path.join(BLOG_BUILDING_DIR, languageFolder);
  const files = fs.readdirSync(folderPath);

  const pattern = new RegExp(`^${postNumber}-.*\\.html$`);
  const htmlFile = files.find(f => pattern.test(f));

  if (!htmlFile) {
    return null;
  }

  return path.join(folderPath, htmlFile);
}

/**
 * Load and parse a single blog post across all languages
 */
function loadBlogPost(postNumber) {
  const translations = {};
  const slugsByLanguage = {};
  let primarySlug = null;

  // Load each language version
  for (const [folderName, langCode] of Object.entries(LANGUAGES)) {
    const htmlFilePath = findHtmlFile(folderName, postNumber);

    if (!htmlFilePath) {
      continue;
    }

    try {
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      const parsed = parseHtmlBlogPost(htmlContent);
      const slug = extractSlugFromFilename(path.basename(htmlFilePath));

      translations[langCode] = {
        title: parsed.title,
        content: parsed.content,
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        excerpt: parsed.excerpt
      };

      slugsByLanguage[langCode] = slug;

      if (langCode === 'en') {
        primarySlug = slug;
      }
    } catch (error) {
      console.error(`   ❌ Error loading ${langCode}:`, error.message);
    }
  }

  if (!primarySlug) {
    primarySlug = Object.values(slugsByLanguage)[0];
  }

  const keywordsString = Object.values(translations).find(t => t.metaDescription)?.metaDescription || '';
  const keywords = keywordsString.split(',').map(k => k.trim()).filter(k => k).slice(0, 10);

  return {
    slug: primarySlug,
    slugsByLanguage,
    translations,
    keywords,
    translationCount: Object.keys(translations).length
  };
}

/**
 * Save blog post to database
 */
async function saveBlogPost(postData) {
  const { slug, translations, keywords } = postData;

  try {
    // Get admin user ID
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@lessoncraftstudio.com' }
    });

    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    // Check if post already exists
    const existingPost = await prisma.blogPost.findFirst({
      where: { slug }
    });

    if (existingPost) {
      console.log(`   ⏭️  Skipped - already exists in database`);
      return { success: true, skipped: true };
    }

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        authorId: adminUser.id,
        slug,
        translations,
        category: 'worksheet-tips',
        keywords: keywords || [],
        featuredImage: null,
        status: 'published',
        publishedAt: new Date()
      }
    });

    return { success: true, post };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Main fix function - only import missing posts
 */
async function fixFailedPosts() {
  console.log('════════════════════════════════════════════════════');
  console.log('  FIX FAILED BLOG POSTS');
  console.log('  Re-importing posts that failed with hex escape errors');
  console.log('════════════════════════════════════════════════════\n');

  // Get list of existing posts
  const existingPosts = await prisma.blogPost.findMany({
    select: { slug: true }
  });
  const existingSlugs = new Set(existingPosts.map(p => p.slug));

  console.log(`📊 Currently in database: ${existingPosts.length} posts`);
  console.log(`🎯 Target: 112 posts total\n`);

  const stats = {
    total: 112,
    alreadyImported: existingPosts.length,
    successful: 0,
    failed: 0,
    startTime: Date.now()
  };

  // Import posts 001-112, but skip ones that already exist
  for (let i = 1; i <= 112; i++) {
    const postNumber = String(i).padStart(3, '0');

    try {
      console.log(`\n📖 Loading post ${postNumber}...`);
      const postData = loadBlogPost(postNumber);

      if (postData.translationCount === 0) {
        console.log(`   ⏭️  Skipped - no translations found`);
        continue;
      }

      // Check if already exists
      if (existingSlugs.has(postData.slug)) {
        console.log(`   ✅ Already imported: ${postData.slug}`);
        continue;
      }

      console.log(`   📊 Loaded ${postData.translationCount} language versions`);
      console.log(`   💾 Saving to database...`);

      const result = await saveBlogPost(postData);

      if (result.success) {
        if (result.skipped) {
          // Already existed
        } else {
          console.log(`   ✅ Imported successfully! ID: ${result.post?.id}`);
          stats.successful++;
        }
      } else {
        console.error(`   ❌ Failed to save: ${result.error}`);
        stats.failed++;
      }

      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`   ❌ Error processing post ${postNumber}:`, error.message);
      stats.failed++;
    }
  }

  // Print summary
  const elapsedSeconds = Math.round((Date.now() - stats.startTime) / 1000);
  const finalTotal = stats.alreadyImported + stats.successful;

  console.log('\n════════════════════════════════════════════════════');
  console.log('  FIX SUMMARY');
  console.log('════════════════════════════════════════════════════');
  console.log(`  Already imported:  ${stats.alreadyImported}`);
  console.log(`  ✅ Newly imported:  ${stats.successful}`);
  console.log(`  ❌ Still failed:    ${stats.failed}`);
  console.log(`  📊 Total in DB:     ${finalTotal} / ${stats.total}`);
  console.log(`  ⏱️  Time elapsed:    ${elapsedSeconds}s`);
  console.log('════════════════════════════════════════════════════\n');

  if (finalTotal === stats.total) {
    console.log('🎉 SUCCESS! All 112 posts are now in the database!');
    console.log('\nNext steps:');
    console.log('1. Verify: node scripts/verify-blog-import.js');
    console.log('2. Re-submit sitemap to Google Search Console');
  } else if (stats.failed > 0) {
    console.log(`⚠️  ${stats.failed} posts still failed. These may need manual import.`);
  }

  await prisma.$disconnect();
}

// Run the fix
fixFailedPosts().catch(error => {
  console.error('\n❌ Fatal error:', error);
  prisma.$disconnect();
  process.exit(1);
});
