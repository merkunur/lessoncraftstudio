/**
 * Database Fix Script: Regenerate blog post slugs from titles
 *
 * This script fixes the wrong-language slug issue by regenerating
 * all translation slugs from their respective titles.
 *
 * The root cause: blog-content-manager.html was copying non-English
 * content to the English translation, causing slugs to be generated
 * from wrong-language titles.
 *
 * Usage:
 *   node scripts/fix-blog-slugs.js --dry-run  # Preview changes
 *   node scripts/fix-blog-slugs.js            # Apply changes
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VERBOSE = args.includes('--verbose');

// Character transliteration map for European languages (from lib/slug-utils.ts)
const CHAR_MAP = {
  // German
  'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
  'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue',

  // Scandinavian (Danish, Swedish, Norwegian)
  'å': 'aa', 'ø': 'oe', 'æ': 'ae',
  'Å': 'Aa', 'Ø': 'Oe', 'Æ': 'Ae',

  // French
  'à': 'a', 'â': 'a', 'ç': 'c', 'é': 'e', 'è': 'e',
  'ê': 'e', 'ë': 'e', 'î': 'i', 'ï': 'i', 'ô': 'o', 'œ': 'oe',
  'ù': 'u', 'û': 'u', 'ÿ': 'y',
  'À': 'A', 'Â': 'A', 'Ç': 'C', 'É': 'E', 'È': 'E',
  'Ê': 'E', 'Ë': 'E', 'Î': 'I', 'Ï': 'I', 'Ô': 'O', 'Œ': 'Oe',
  'Ù': 'U', 'Û': 'U', 'Ÿ': 'Y',

  // Spanish
  'á': 'a', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ñ': 'n',
  'Á': 'A', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ñ': 'N',

  // Portuguese
  'ã': 'a', 'õ': 'o',
  'Ã': 'A', 'Õ': 'O',

  // Polish
  'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
  'ś': 's', 'ź': 'z', 'ż': 'z',
  'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
  'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',

  // Czech/Slovak
  'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r',
  'š': 's', 'ť': 't', 'ů': 'u', 'ž': 'z',
  'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R',
  'Š': 'S', 'Ť': 'T', 'Ů': 'U', 'Ž': 'Z',

  // Quotes and dashes (using Unicode escape sequences to avoid encoding issues)
  '\u2018': '', '\u2019': '', '\u201C': '', '\u201D': '', '\u2013': '-', '\u2014': '-',
  '\u2026': '...', '\u00AB': '', '\u00BB': '', '\u2039': '', '\u203A': '',
};

/**
 * Normalize a slug to be URL-safe (same as lib/slug-utils.ts)
 * @param {string} text - The text to convert to a slug
 * @returns {string} URL-safe slug
 */
function normalizeSlug(text) {
  if (!text) return '';

  let slug = text;

  // Step 1: Transliterate special characters
  for (const [char, replacement] of Object.entries(CHAR_MAP)) {
    slug = slug.split(char).join(replacement);
  }

  // Step 2: Convert to lowercase
  slug = slug.toLowerCase();

  // Step 3: Remove any remaining non-ASCII characters
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Step 4: Replace spaces and underscores with hyphens
  slug = slug.replace(/[\s_]+/g, '-');

  // Step 5: Remove all non-alphanumeric characters except hyphens
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // Step 6: Remove duplicate hyphens
  slug = slug.replace(/-+/g, '-');

  // Step 7: Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

/**
 * Main fix function
 */
async function fixBlogSlugs() {
  console.log('=== BLOG SLUG FIX SCRIPT ===\n');
  console.log(DRY_RUN ? '🔍 DRY RUN MODE - No changes will be made\n' : '⚡ LIVE MODE - Changes will be applied\n');

  try {
    // Fetch all blog posts
    const posts = await prisma.blogPost.findMany({
      select: {
        id: true,
        slug: true,
        translations: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Total posts: ${posts.length}\n`);

    let totalChanges = 0;
    let postsModified = 0;
    const changeLog = [];

    for (const post of posts) {
      const translations = post.translations;
      if (!translations || typeof translations !== 'object') {
        console.log(`⚠️  Post "${post.slug}" has no translations object - skipping`);
        continue;
      }

      let postModified = false;
      const postChanges = [];

      for (const [locale, translation] of Object.entries(translations)) {
        if (!translation || typeof translation !== 'object') continue;
        if (!translation.title) {
          if (VERBOSE) console.log(`  [${locale}] No title - skipping`);
          continue;
        }

        const currentSlug = translation.slug || '';
        const newSlug = normalizeSlug(translation.title);

        if (currentSlug !== newSlug) {
          postChanges.push({
            locale,
            oldSlug: currentSlug || '(empty)',
            newSlug,
            title: translation.title.substring(0, 50)
          });

          // Update the translation object
          translation.slug = newSlug;
          postModified = true;
          totalChanges++;
        }
      }

      if (postModified) {
        postsModified++;

        console.log(`\n📝 Post: ${post.slug}`);
        for (const change of postChanges) {
          console.log(`   [${change.locale}] "${change.oldSlug}" → "${change.newSlug}"`);
          if (VERBOSE) console.log(`      Title: ${change.title}...`);
        }

        changeLog.push({
          postSlug: post.slug,
          changes: postChanges
        });

        if (!DRY_RUN) {
          // Apply the fix
          await prisma.blogPost.update({
            where: { id: post.id },
            data: { translations }
          });
        }
      }
    }

    // Summary
    console.log('\n=== SUMMARY ===\n');
    console.log(`Total posts: ${posts.length}`);
    console.log(`Posts modified: ${postsModified}`);
    console.log(`Total slug changes: ${totalChanges}`);

    if (DRY_RUN) {
      console.log('\n🔍 DRY RUN COMPLETE - No changes were made');
      console.log('Run without --dry-run to apply these changes');
    } else {
      console.log('\n✅ CHANGES APPLIED SUCCESSFULLY');
      console.log('\nNext steps:');
      console.log('1. Clear ISR cache: pm2 restart lessoncraftstudio');
      console.log('2. Regenerate sitemap: /sitemap.xml will update automatically');
      console.log('3. Request Google re-crawl via Search Console');
    }

    return {
      totalPosts: posts.length,
      postsModified,
      totalChanges,
      changeLog
    };

  } catch (error) {
    console.error('\n❌ Error fixing slugs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix
fixBlogSlugs()
  .then(result => {
    console.log('\n=== SCRIPT COMPLETE ===');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
