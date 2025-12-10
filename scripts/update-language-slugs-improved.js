/**
 * UPDATE BLOG POSTS WITH LANGUAGE-SPECIFIC SLUGS (IMPROVED)
 *
 * This improved version builds a comprehensive map of all HTML files first,
 * then matches database posts more reliably.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../frontend/node_modules/@prisma/client');

const prisma = new PrismaClient();

// Configuration
// Detect environment and use appropriate path
const BLOG_BUILDING_DIR = process.platform === 'win32'
  ? 'C:/Users/rkgen/lessoncraftstudio/BLOG BUILDING'
  : '/opt/lessoncraftstudio/BLOG BUILDING';

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
 * Extract post number and slug from filename
 */
function parseFilename(filename) {
  const match = filename.match(/^(\d{3})-(.+)\.html$/);
  if (!match) return null;

  return {
    postNumber: match[1],
    slug: match[2]
  };
}

/**
 * Build comprehensive mapping of all HTML files
 * Returns: { postNumber: { langCode: slug } }
 */
function buildFileMapping() {
  console.log('📋 Building comprehensive file mapping...\n');

  const mapping = {}; // { '001': { en: 'slug', de: 'slug', ... } }
  const slugToPostNumber = {}; // { 'slug': '001' } for reverse lookup

  for (const [folderName, langCode] of Object.entries(LANGUAGES)) {
    const folderPath = path.join(BLOG_BUILDING_DIR, folderName);

    if (!fs.existsSync(folderPath)) {
      console.log(`   ⚠️  Folder not found: ${folderName}`);
      continue;
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));

    for (const file of files) {
      const parsed = parseFilename(file);
      if (!parsed) continue;

      const { postNumber, slug } = parsed;

      // Add to main mapping
      if (!mapping[postNumber]) {
        mapping[postNumber] = {};
      }
      mapping[postNumber][langCode] = slug;

      // Add to reverse lookup (for finding post number from database slug)
      if (!slugToPostNumber[slug]) {
        slugToPostNumber[slug] = postNumber;
      }
    }
  }

  console.log(`   ✅ Found ${Object.keys(mapping).length} unique posts`);
  console.log(`   ✅ Mapped ${Object.keys(slugToPostNumber).length} unique slugs\n`);

  return { mapping, slugToPostNumber };
}

/**
 * Find post number for a database slug
 */
function findPostNumber(dbSlug, slugToPostNumber, mapping) {
  // Direct match
  if (slugToPostNumber[dbSlug]) {
    return slugToPostNumber[dbSlug];
  }

  // Search through all post numbers and check if the English slug matches
  for (const [postNumber, slugs] of Object.entries(mapping)) {
    if (slugs.en === dbSlug) {
      return postNumber;
    }

    // Also check other languages in case database has a translated slug
    for (const langSlug of Object.values(slugs)) {
      if (langSlug === dbSlug) {
        return postNumber;
      }
    }
  }

  return null;
}

/**
 * Update all blog posts with language-specific slugs
 */
async function updateLanguageSlugs() {
  console.log('════════════════════════════════════════════════════');
  console.log('  UPDATE LANGUAGE-SPECIFIC SLUGS (IMPROVED)');
  console.log('════════════════════════════════════════════════════\n');

  const stats = {
    total: 0,
    updated: 0,
    skipped: 0,
    alreadyHasSlugs: 0,
    notFound: 0,
    startTime: Date.now()
  };

  try {
    // Build file mapping
    const { mapping, slugToPostNumber } = buildFileMapping();

    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { id: true, slug: true, translations: true }
    });

    stats.total = posts.length;
    console.log(`📊 Found ${stats.total} blog posts in database\n`);

    for (const post of posts) {
      try {
        const dbSlug = post.slug;

        // Check if already has language-specific slugs
        const translations = post.translations;
        const hasLanguageSlugs = Object.values(translations).some((t) => t && t.slug);

        if (hasLanguageSlugs) {
          console.log(`   ⏭️  Post ${post.id} (${dbSlug}) - already has language slugs`);
          stats.alreadyHasSlugs++;
          continue;
        }

        // Find post number
        const postNumber = findPostNumber(dbSlug, slugToPostNumber, mapping);

        if (!postNumber) {
          console.log(`   ❌ Post ${post.id} - couldn't match slug: ${dbSlug}`);
          stats.notFound++;
          continue;
        }

        // Get language-specific slugs from mapping
        const slugsByLanguage = mapping[postNumber];

        if (!slugsByLanguage || Object.keys(slugsByLanguage).length === 0) {
          console.log(`   ⏭️  Post ${postNumber} - no language slugs found in mapping`);
          stats.skipped++;
          continue;
        }

        // Add slug to each translation
        const updatedTranslations = { ...translations };
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

        console.log(`   ✅ Post ${postNumber} updated: ${dbSlug}`);
        console.log(`      Languages: ${Object.keys(slugsByLanguage).join(', ')}`);
        stats.updated++;

      } catch (error) {
        console.error(`   ❌ Error updating post ${post.id}:`, error.message);
        stats.skipped++;
      }
    }

    // Print summary
    const elapsedSeconds = Math.round((Date.now() - stats.startTime) / 1000);

    console.log('\n════════════════════════════════════════════════════');
    console.log('  UPDATE SUMMARY');
    console.log('════════════════════════════════════════════════════');
    console.log(`  Total posts:           ${stats.total}`);
    console.log(`  ✅ Updated:             ${stats.updated}`);
    console.log(`  ⏭️  Already had slugs:   ${stats.alreadyHasSlugs}`);
    console.log(`  ❌ Not found in files:  ${stats.notFound}`);
    console.log(`  ⏭️  Skipped:             ${stats.skipped}`);
    console.log(`  ⏱️  Time elapsed:        ${elapsedSeconds}s`);
    console.log('════════════════════════════════════════════════════\n');

    const totalProcessed = stats.updated + stats.alreadyHasSlugs;
    if (totalProcessed === stats.total) {
      console.log('🎉 SUCCESS! All posts now have language-specific slugs!\n');
    } else if (stats.updated > 0) {
      console.log(`✅ Updated ${stats.updated} posts successfully!`);
      if (stats.notFound > 0) {
        console.log(`⚠️  ${stats.notFound} posts couldn't be matched to HTML files\n`);
      }
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
