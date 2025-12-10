/**
 * UPDATE BLOG POSTS WITH LANGUAGE-SPECIFIC SLUGS
 *
 * This script updates all existing blog posts to include language-specific slugs
 * in their translations object, enabling proper SEO-friendly URLs per language.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../frontend/node_modules/@prisma/client');

const prisma = new PrismaClient();

// Configuration
const BLOG_BUILDING_DIR = 'C:/Users/rkgen/lessoncraftstudio/BLOG BUILDING';

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
 */
function extractSlugFromFilename(filename) {
  return filename
    .replace(/^\d{3}-/, '') // Remove "001-" prefix
    .replace(/\.html$/, ''); // Remove .html extension
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
 * Get language-specific slugs for a post number
 */
function getSlugsByLanguage(postNumber) {
  const slugsByLanguage = {};

  for (const [folderName, langCode] of Object.entries(LANGUAGES)) {
    const htmlFilePath = findHtmlFile(folderName, postNumber);

    if (htmlFilePath) {
      const slug = extractSlugFromFilename(path.basename(htmlFilePath));
      slugsByLanguage[langCode] = slug;
    }
  }

  return slugsByLanguage;
}

/**
 * Update all blog posts with language-specific slugs
 */
async function updateLanguageSlugs() {
  console.log('════════════════════════════════════════════════════');
  console.log('  UPDATE LANGUAGE-SPECIFIC SLUGS');
  console.log('════════════════════════════════════════════════════\n');

  const stats = {
    total: 0,
    updated: 0,
    failed: 0,
    startTime: Date.now()
  };

  try {
    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { id: true, slug: true, translations: true }
    });

    stats.total = posts.length;
    console.log(`📊 Found ${stats.total} blog posts in database\n`);

    for (const post of posts) {
      try {
        // Extract post number from English slug
        const match = post.slug.match(/^(\d{3})-/);
        if (!match) {
          // Try to match post number from filename pattern in translations
          const englishSlug = post.slug;
          console.log(`   ⚠️  Post ${post.id} - trying to match slug: ${englishSlug}`);

          // Search for matching HTML file
          let postNumber = null;
          for (let i = 1; i <= 112; i++) {
            const testNumber = String(i).padStart(3, '0');
            const testFilePath = findHtmlFile('ENGLISH BLOGPOSTS', testNumber);
            if (testFilePath) {
              const testSlug = extractSlugFromFilename(path.basename(testFilePath));
              if (testSlug === englishSlug) {
                postNumber = testNumber;
                break;
              }
            }
          }

          if (!postNumber) {
            console.log(`   ⏭️  Skipping - couldn't determine post number`);
            continue;
          }

          console.log(`   ✅ Matched to post ${postNumber}`);

          // Get slugs for all languages
          const slugsByLanguage = getSlugsByLanguage(postNumber);

          if (Object.keys(slugsByLanguage).length === 0) {
            console.log(`   ⏭️  Skipping - no language slugs found`);
            continue;
          }

          // Add slug to each translation
          const updatedTranslations = { ...post.translations };
          for (const [langCode, langSlug] of Object.entries(slugsByLanguage)) {
            if (updatedTranslations[langCode]) {
              updatedTranslations[langCode].slug = langSlug;
            }
          }

          // Update in database
          await prisma.blogPost.update({
            where: { id: post.id },
            data: { translations: updatedTranslations }
          });

          console.log(`   ✅ Updated post: ${post.slug}`);
          console.log(`      Languages: ${Object.keys(slugsByLanguage).join(', ')}`);
          stats.updated++;
        } else {
          const postNumber = match[1];

          // Get slugs for all languages
          const slugsByLanguage = getSlugsByLanguage(postNumber);

          if (Object.keys(slugsByLanguage).length === 0) {
            console.log(`   ⏭️  Post ${postNumber} - no language slugs found`);
            continue;
          }

          // Add slug to each translation
          const updatedTranslations = { ...post.translations };
          for (const [langCode, langSlug] of Object.entries(slugsByLanguage)) {
            if (updatedTranslations[langCode]) {
              updatedTranslations[langCode].slug = langSlug;
            }
          }

          // Update in database
          await prisma.blogPost.update({
            where: { id: post.id },
            data: { translations: updatedTranslations }
          });

          console.log(`   ✅ Post ${postNumber} updated: ${Object.keys(slugsByLanguage).length} language slugs added`);
          stats.updated++;
        }

      } catch (error) {
        console.error(`   ❌ Error updating post ${post.id}:`, error.message);
        stats.failed++;
      }
    }

    // Print summary
    const elapsedSeconds = Math.round((Date.now() - stats.startTime) / 1000);

    console.log('\n════════════════════════════════════════════════════');
    console.log('  UPDATE SUMMARY');
    console.log('════════════════════════════════════════════════════');
    console.log(`  Total posts:      ${stats.total}`);
    console.log(`  ✅ Updated:        ${stats.updated}`);
    console.log(`  ❌ Failed:         ${stats.failed}`);
    console.log(`  ⏱️  Time elapsed:   ${elapsedSeconds}s`);
    console.log('════════════════════════════════════════════════════\n');

    if (stats.updated === stats.total) {
      console.log('🎉 SUCCESS! All posts now have language-specific slugs!\n');
      console.log('Next steps:');
      console.log('1. Update frontend to use language-specific slugs');
      console.log('2. Update sitemap to use language-specific slugs');
      console.log('3. Test URLs: /da/blog/[danish-slug], /sv/blog/[swedish-slug]');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateLanguageSlugs().catch(error => {
  console.error('\n❌ Fatal error:', error);
  prisma.$disconnect();
  process.exit(1);
});
