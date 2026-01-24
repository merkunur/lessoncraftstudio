/**
 * UPDATE ALL BLOG POSTS WITH LANGUAGE-SPECIFIC SLUGS
 *
 * Strategy: Match by comparing titles instead of slugs
 * This handles the mismatch between database slugs and HTML filenames
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('../frontend/node_modules/@prisma/client');

const prisma = new PrismaClient();

// Configuration - Platform detection
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
 * Extract title from HTML file
 */
function extractTitleFromHtml(htmlContent) {
  try {
    const root = parse(htmlContent);
    const h1 = root.querySelector('h1');
    const title = h1 ? h1.text.trim() : '';
    return title;
  } catch (error) {
    return '';
  }
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
 * Parse filename to get post number
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
 * Returns: { postNumber: { langCode: { slug, title } } }
 */
function buildFileMapping() {
  console.log('📋 Building comprehensive file mapping...\n');

  const mapping = {}; // { '001': { en: { slug, title }, de: { slug, title }, ... } }

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

      try {
        const htmlPath = path.join(folderPath, file);
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const title = extractTitleFromHtml(htmlContent);

        // Add to main mapping
        if (!mapping[postNumber]) {
          mapping[postNumber] = {};
        }
        mapping[postNumber][langCode] = { slug, title };
      } catch (error) {
        console.error(`   ❌ Error reading ${file}:`, error.message);
      }
    }
  }

  console.log(`   ✅ Built mapping for ${Object.keys(mapping).length} posts\n`);
  return mapping;
}

/**
 * Normalize title for comparison (remove punctuation, lowercase, trim)
 */
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Find post number by matching English title
 */
function findPostNumberByTitle(dbTitle, mapping) {
  const normalizedDbTitle = normalizeTitle(dbTitle);

  for (const [postNumber, langs] of Object.entries(mapping)) {
    if (langs.en && langs.en.title) {
      const normalizedFileTitle = normalizeTitle(langs.en.title);

      // Exact match
      if (normalizedFileTitle === normalizedDbTitle) {
        return postNumber;
      }

      // Partial match (either contains the other)
      if (normalizedFileTitle.includes(normalizedDbTitle) ||
          normalizedDbTitle.includes(normalizedFileTitle)) {
        return postNumber;
      }
    }
  }

  return null;
}

/**
 * Update all blog posts with language-specific slugs
 */
async function updateAllLanguageSlugs() {
  console.log('════════════════════════════════════════════════════');
  console.log('  UPDATE ALL LANGUAGE-SPECIFIC SLUGS');
  console.log('  Matching by title comparison');
  console.log('════════════════════════════════════════════════════\n');

  const stats = {
    total: 0,
    updated: 0,
    alreadyHad: 0,
    notFound: 0,
    errors: 0,
    startTime: Date.now()
  };

  try {
    // Build file mapping
    const mapping = buildFileMapping();

    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { id: true, slug: true, translations: true }
    });

    stats.total = posts.length;
    console.log(`📊 Found ${stats.total} blog posts in database\n`);

    for (const post of posts) {
      try {
        const translations = post.translations;
        const englishTitle = translations.en?.title || '';

        if (!englishTitle) {
          console.log(`   ⏭️  Post ${post.id} - no English title, skipping`);
          stats.errors++;
          continue;
        }

        // Check if already has language-specific slugs
        const hasLanguageSlugs = Object.values(translations).some((t) => t && t.slug);

        if (hasLanguageSlugs) {
          // Update anyway to ensure all languages are included
          console.log(`   🔄 Post ${post.id} - updating existing language slugs`);
        }

        // Find post number by title
        const postNumber = findPostNumberByTitle(englishTitle, mapping);

        if (!postNumber) {
          console.log(`   ❌ Post ${post.id} - couldn't match title: "${englishTitle.substring(0, 50)}..."`);
          stats.notFound++;
          continue;
        }

        // Get language-specific slugs from mapping
        const slugsByLanguage = mapping[postNumber];

        if (!slugsByLanguage || Object.keys(slugsByLanguage).length === 0) {
          console.log(`   ⏭️  Post ${postNumber} - no language slugs found in mapping`);
          stats.errors++;
          continue;
        }

        // Add slug to each translation
        const updatedTranslations = { ...translations };
        let addedCount = 0;

        for (const [langCode, langData] of Object.entries(slugsByLanguage)) {
          if (updatedTranslations[langCode]) {
            const oldSlug = updatedTranslations[langCode].slug;
            updatedTranslations[langCode].slug = langData.slug;

            if (!oldSlug || oldSlug !== langData.slug) {
              addedCount++;
            }
          }
        }

        // Update in database
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { translations: updatedTranslations }
        });

        console.log(`   ✅ Post ${postNumber} updated: ${post.slug}`);
        console.log(`      Added/updated ${addedCount} language slugs (${Object.keys(slugsByLanguage).join(', ')})`);
        stats.updated++;

      } catch (error) {
        console.error(`   ❌ Error updating post ${post.id}:`, error.message);
        stats.errors++;
      }
    }

    // Print summary
    const elapsedSeconds = Math.round((Date.now() - stats.startTime) / 1000);

    console.log('\n════════════════════════════════════════════════════');
    console.log('  UPDATE SUMMARY');
    console.log('════════════════════════════════════════════════════');
    console.log(`  Total posts:           ${stats.total}`);
    console.log(`  ✅ Updated:             ${stats.updated}`);
    console.log(`  ❌ Not found in files:  ${stats.notFound}`);
    console.log(`  ⚠️  Errors:              ${stats.errors}`);
    console.log(`  ⏱️  Time elapsed:        ${elapsedSeconds}s`);
    console.log('════════════════════════════════════════════════════\n');

    if (stats.updated === stats.total) {
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
updateAllLanguageSlugs().catch(error => {
  console.error('\n❌ Fatal error:', error);
  prisma.$disconnect();
  process.exit(1);
});
