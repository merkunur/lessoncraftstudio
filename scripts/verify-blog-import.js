/**
 * BLOG IMPORT VERIFICATION SCRIPT
 *
 * Checks database to verify blog posts were imported correctly
 */

const { PrismaClient } = require('../frontend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function verifyImport() {
  console.log('════════════════════════════════════════════════════');
  console.log('  BLOG IMPORT VERIFICATION');
  console.log('════════════════════════════════════════════════════\n');

  try {
    // Count total posts
    const totalPosts = await prisma.blogPost.count();
    console.log(`📊 Total blog posts in database: ${totalPosts}`);

    // Count published posts
    const publishedPosts = await prisma.blogPost.count({
      where: { status: 'published' }
    });
    console.log(`✅ Published posts: ${publishedPosts}`);

    // Count draft posts
    const draftPosts = await prisma.blogPost.count({
      where: { status: 'draft' }
    });
    console.log(`📝 Draft posts: ${draftPosts}`);

    console.log('');

    // Check language coverage
    const posts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        translations: true,
        status: true
      }
    });

    const languageCoverage = {
      en: 0, de: 0, fr: 0, es: 0, pt: 0, it: 0,
      nl: 0, da: 0, sv: 0, no: 0, fi: 0
    };

    let totalTranslations = 0;

    posts.forEach(post => {
      const translations = post.translations;
      Object.keys(translations).forEach(lang => {
        if (languageCoverage[lang] !== undefined) {
          languageCoverage[lang]++;
          totalTranslations++;
        }
      });
    });

    console.log('📚 Language Coverage:');
    console.log('───────────────────────────────────────────────────');
    Object.entries(languageCoverage).forEach(([lang, count]) => {
      const langNames = {
        en: 'English', de: 'German', fr: 'French', es: 'Spanish',
        pt: 'Portuguese', it: 'Italian', nl: 'Dutch', da: 'Danish',
        sv: 'Swedish', no: 'Norwegian', fi: 'Finnish'
      };
      console.log(`  ${langNames[lang].padEnd(12)} (${lang}): ${count} posts`);
    });
    console.log('───────────────────────────────────────────────────');
    console.log(`  Total translations: ${totalTranslations}`);
    console.log('');

    // Show sample posts
    console.log('📖 Sample Posts (first 5):');
    console.log('───────────────────────────────────────────────────');
    const samplePosts = await prisma.blogPost.findMany({
      take: 5,
      select: {
        slug: true,
        translations: true,
        status: true,
        publishedAt: true
      }
    });

    samplePosts.forEach((post, index) => {
      const translations = post.translations;
      const enTitle = translations.en?.title || 'No English title';
      const languages = Object.keys(translations).join(', ');
      console.log(`  ${index + 1}. ${enTitle.substring(0, 50)}...`);
      console.log(`     Slug: ${post.slug}`);
      console.log(`     Languages: ${languages}`);
      console.log(`     Status: ${post.status}`);
      console.log('');
    });

    // Verification summary
    console.log('════════════════════════════════════════════════════');
    console.log('  VERIFICATION SUMMARY');
    console.log('════════════════════════════════════════════════════');

    const expectedPosts = 112;
    const expectedTranslationsPerPost = 11;
    const expectedTotalTranslations = expectedPosts * expectedTranslationsPerPost; // 1,232

    console.log(`  Expected posts: ${expectedPosts}`);
    console.log(`  Actual posts:   ${totalPosts}`);
    console.log('');
    console.log(`  Expected total translations: ${expectedTotalTranslations}`);
    console.log(`  Actual total translations:   ${totalTranslations}`);
    console.log('');

    if (totalPosts === expectedPosts && totalTranslations >= expectedTotalTranslations * 0.9) {
      console.log('✅ VERIFICATION PASSED');
      console.log('   All posts imported successfully!');
    } else if (totalPosts >= expectedPosts * 0.9) {
      console.log('⚠️  VERIFICATION PARTIAL');
      console.log('   Most posts imported, but some may be missing translations');
    } else {
      console.log('❌ VERIFICATION FAILED');
      console.log('   Import incomplete - missing posts');
    }

    console.log('════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error during verification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyImport();
