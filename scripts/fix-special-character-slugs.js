/**
 * Fix special characters in blog post slugs
 * Normalizes all slugs to be URL-safe using professional transliteration
 */

const { PrismaClient } = require('../frontend/node_modules/@prisma/client');
const { normalizeSlug, isValidSlug } = require('./slug-utils');

const prisma = new PrismaClient();

async function fixSlugs() {
  console.log('════════════════════════════════════════════════════');
  console.log('  FIX SPECIAL CHARACTERS IN SLUGS');
  console.log('  Using professional transliteration standards');
  console.log('════════════════════════════════════════════════════\n');

  const stats = {
    total: 0,
    fixed: 0,
    alreadyValid: 0,
    errors: 0
  };

  try {
    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { id: true, slug: true, translations: true }
    });

    stats.total = posts.length;
    console.log(`📊 Found ${stats.total} blog posts\n`);

    for (const post of posts) {
      try {
        const translations = post.translations;
        let hasChanges = false;
        const updatedTranslations = { ...translations };

        // Check and fix primary slug
        const originalSlug = post.slug;
        const normalizedSlug = normalizeSlug(originalSlug);

        if (originalSlug !== normalizedSlug) {
          console.log(`\n🔧 Fixing primary slug:`);
          console.log(`   OLD: ${originalSlug}`);
          console.log(`   NEW: ${normalizedSlug}`);

          // Update primary slug
          await prisma.blogPost.update({
            where: { id: post.id },
            data: { slug: normalizedSlug }
          });

          hasChanges = true;
        }

        // Check and fix language-specific slugs
        for (const [locale, translation] of Object.entries(translations)) {
          if (translation && translation.slug) {
            const originalLangSlug = translation.slug;
            const normalizedLangSlug = normalizeSlug(originalLangSlug);

            if (originalLangSlug !== normalizedLangSlug) {
              console.log(`\n🔧 Fixing ${locale} slug:`);
              console.log(`   OLD: ${originalLangSlug}`);
              console.log(`   NEW: ${normalizedLangSlug}`);

              updatedTranslations[locale] = {
                ...translation,
                slug: normalizedLangSlug
              };

              hasChanges = true;
            } else if (!isValidSlug(originalLangSlug)) {
              console.log(`\n⚠️  Warning: ${locale} slug may have issues:`);
              console.log(`   SLUG: ${originalLangSlug}`);
            }
          }
        }

        // Update translations if there were changes
        if (hasChanges && Object.keys(updatedTranslations).length > 0) {
          await prisma.blogPost.update({
            where: { id: post.id },
            data: { translations: updatedTranslations }
          });

          stats.fixed++;
          console.log(`   ✅ Updated post ID: ${post.id}`);
        } else if (!hasChanges) {
          stats.alreadyValid++;
        }

      } catch (error) {
        console.error(`\n❌ Error fixing post ${post.id}:`, error.message);
        stats.errors++;
      }
    }

    // Print summary
    console.log('\n════════════════════════════════════════════════════');
    console.log('  SUMMARY');
    console.log('════════════════════════════════════════════════════');
    console.log(`  Total posts:        ${stats.total}`);
    console.log(`  ✅ Fixed:            ${stats.fixed}`);
    console.log(`  ✓  Already valid:    ${stats.alreadyValid}`);
    console.log(`  ❌ Errors:           ${stats.errors}`);
    console.log('════════════════════════════════════════════════════\n');

    if (stats.fixed > 0) {
      console.log('🎉 SUCCESS! Fixed special characters in slugs.');
      console.log('📝 Next steps:');
      console.log('   1. Rebuild frontend to regenerate static pages');
      console.log('   2. Test URLs with special characters');
      console.log('   3. Update sitemap\n');
    } else if (stats.alreadyValid === stats.total) {
      console.log('✅ All slugs are already valid!\n');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix
fixSlugs().catch(error => {
  console.error('\n❌ Fatal error:', error);
  prisma.$disconnect();
  process.exit(1);
});
