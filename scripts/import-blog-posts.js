/**
 * BLOG POST IMPORT SCRIPT
 *
 * Imports 1,232 blog posts (112 posts × 11 languages) into PostgreSQL database
 *
 * Strategy:
 * - Match posts by number (001-112)
 * - Read .html files from each language folder
 * - Create 1 database entry per post with 11 language translations
 * - Use language-specific slugs from filenames
 * - Extract content from <article> tags
 * - Set all to status: 'published'
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('../frontend/node_modules/@prisma/client');

const prisma = new PrismaClient();

// Configuration
const BLOG_BUILDING_DIR = 'C:/Users/rkgen/lessoncraftstudio/BLOG BUILDING';
const API_URL = 'http://localhost:3000'; // Change to production URL if needed
const DRY_RUN = false; // Set to true to test without actually importing

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
 * Extract slug from filename
 * Example: "001-33-editable-worksheet-generators-elementary-teachers.html"
 *       -> "33-editable-worksheet-generators-elementary-teachers"
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
  const canonicalUrl = root.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

  // Extract main title from <h1>
  const h1 = root.querySelector('h1')?.text || metaTitle;

  // Extract article content
  const article = root.querySelector('article');
  const content = article ? article.innerHTML : '';

  // Generate excerpt (first 200 characters of text content)
  const textContent = article ? article.text : '';
  const excerpt = textContent.substring(0, 200).trim() + '...';

  return {
    title: h1,
    metaTitle,
    metaDescription,
    keywords: metaKeywords,
    content,
    excerpt,
    canonicalUrl
  };
}

/**
 * Find HTML file for a given post number in a language folder
 */
function findHtmlFile(languageFolder, postNumber) {
  const folderPath = path.join(BLOG_BUILDING_DIR, languageFolder);
  const files = fs.readdirSync(folderPath);

  // Find file matching pattern: 001-*.html
  const pattern = new RegExp(`^${postNumber}-.*\\.html$`);
  const htmlFile = files.find(f => pattern.test(f));

  if (!htmlFile) {
    console.warn(`⚠️  No HTML file found for post ${postNumber} in ${languageFolder}`);
    return null;
  }

  return path.join(folderPath, htmlFile);
}

/**
 * Load and parse a single blog post across all languages
 */
function loadBlogPost(postNumber) {
  console.log(`\n📖 Loading post ${postNumber}...`);

  const translations = {};
  const slugsByLanguage = {};
  let primarySlug = null; // Will use English slug as primary

  // Load each language version
  for (const [folderName, langCode] of Object.entries(LANGUAGES)) {
    const htmlFilePath = findHtmlFile(folderName, postNumber);

    if (!htmlFilePath) {
      console.warn(`   ⚠️  Skipping ${langCode} - file not found`);
      continue;
    }

    try {
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      const parsed = parseHtmlBlogPost(htmlContent);
      const slug = extractSlugFromFilename(path.basename(htmlFilePath));

      // Store translation
      translations[langCode] = {
        title: parsed.title,
        content: parsed.content,
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        excerpt: parsed.excerpt
      };

      slugsByLanguage[langCode] = slug;

      // Use English slug as primary
      if (langCode === 'en') {
        primarySlug = slug;
      }

      console.log(`   ✅ ${langCode}: ${parsed.title.substring(0, 60)}...`);
    } catch (error) {
      console.error(`   ❌ Error loading ${langCode}:`, error.message);
    }
  }

  // If no English version, use first available slug
  if (!primarySlug) {
    primarySlug = Object.values(slugsByLanguage)[0];
  }

  // Extract keywords from first available translation
  const firstTranslation = Object.values(translations)[0];
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
 * Save blog post to database via Prisma (direct database access)
 */
async function saveBlogPost(postData) {
  const { slug, translations, keywords } = postData;

  if (DRY_RUN) {
    console.log(`   🔍 DRY RUN - Would create database entry`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Languages: ${Object.keys(translations).join(', ')}`);
    return { success: true, dryRun: true };
  }

  try {
    // Get admin user ID (assuming admin@lessoncraftstudio.com exists)
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@lessoncraftstudio.com' }
    });

    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    // Create blog post directly in database
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
 * Main import function
 */
async function importAllBlogPosts() {
  console.log('════════════════════════════════════════════════════');
  console.log('  BLOG POST IMPORT SCRIPT');
  console.log('  Importing 1,232 posts (112 posts × 11 languages)');
  console.log('════════════════════════════════════════════════════\n');

  if (DRY_RUN) {
    console.log('⚠️  DRY RUN MODE - No actual imports will be performed\n');
  }

  const stats = {
    total: 112,
    successful: 0,
    failed: 0,
    skipped: 0,
    startTime: Date.now()
  };

  // Import posts 001-112
  for (let i = 1; i <= 112; i++) {
    const postNumber = String(i).padStart(3, '0');

    try {
      // Load post across all languages
      const postData = loadBlogPost(postNumber);

      if (postData.translationCount === 0) {
        console.log(`   ⏭️  Skipped - no translations found`);
        stats.skipped++;
        continue;
      }

      console.log(`   📊 Loaded ${postData.translationCount} language versions`);

      // Save to database
      console.log(`   💾 Saving to database...`);
      const result = await saveBlogPost(postData);

      if (result.success) {
        if (result.dryRun) {
          console.log(`   ✅ DRY RUN SUCCESS`);
        } else {
          console.log(`   ✅ Imported successfully! ID: ${result.post?.id}`);
        }
        stats.successful++;
      } else {
        console.error(`   ❌ Failed to save: ${result.error}`);
        stats.failed++;
      }

      // Rate limiting - wait 500ms between posts to avoid overwhelming the server
      if (!DRY_RUN && i < 112) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

    } catch (error) {
      console.error(`   ❌ Error processing post ${postNumber}:`, error.message);
      stats.failed++;
    }
  }

  // Print summary
  const elapsedSeconds = Math.round((Date.now() - stats.startTime) / 1000);

  console.log('\n════════════════════════════════════════════════════');
  console.log('  IMPORT SUMMARY');
  console.log('════════════════════════════════════════════════════');
  console.log(`  Total posts:      ${stats.total}`);
  console.log(`  ✅ Successful:     ${stats.successful}`);
  console.log(`  ❌ Failed:         ${stats.failed}`);
  console.log(`  ⏭️  Skipped:        ${stats.skipped}`);
  console.log(`  ⏱️  Time elapsed:   ${elapsedSeconds}s`);
  console.log('════════════════════════════════════════════════════\n');

  if (stats.successful > 0) {
    console.log('✅ Import completed!');
    console.log('\nNext steps:');
    console.log('1. Verify posts in database: node scripts/check-blog.js');
    console.log('2. Check blog list page: https://lessoncraftstudio.com/blog');
    console.log('3. Check sitemap: https://lessoncraftstudio.com/sitemap.xml');
    console.log('4. Submit sitemap to Google Search Console');
  }

  if (stats.failed > 0) {
    console.log(`\n⚠️  ${stats.failed} posts failed to import. Check errors above.`);
  }

  // Cleanup
  await prisma.$disconnect();
}

// Run the import
importAllBlogPosts().catch(error => {
  console.error('\n❌ Fatal error:', error);
  prisma.$disconnect();
  process.exit(1);
});
