/**
 * CHECK LANGUAGE-SPECIFIC SLUGS IN DATABASE
 */

const { PrismaClient } = require('../frontend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function checkSlugs() {
  console.log('Checking language-specific slugs in database...\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  let postsWithSlugs = 0;
  let postsWithoutSlugs = 0;

  posts.forEach(post => {
    const translations = post.translations;
    const hasSlugs = translations.da?.slug || translations.sv?.slug ||
                     translations.no?.slug || translations.fi?.slug;

    if (hasSlugs) {
      postsWithSlugs++;
      console.log(`✅ Post ID: ${post.id}`);
      console.log(`   Primary slug: ${post.slug}`);
      console.log(`   Danish: ${translations.da?.slug || 'NONE'}`);
      console.log(`   Swedish: ${translations.sv?.slug || 'NONE'}`);
      console.log(`   Norwegian: ${translations.no?.slug || 'NONE'}`);
      console.log(`   Finnish: ${translations.fi?.slug || 'NONE'}`);
      console.log('');
    } else {
      postsWithoutSlugs++;
    }
  });

  console.log('\n════════════════════════════════════════════════════');
  console.log('SUMMARY');
  console.log('════════════════════════════════════════════════════');
  console.log(`Total posts: ${posts.length}`);
  console.log(`Posts WITH language-specific slugs: ${postsWithSlugs}`);
  console.log(`Posts WITHOUT language-specific slugs: ${postsWithoutSlugs}`);
  console.log('════════════════════════════════════════════════════\n');

  await prisma.$disconnect();
}

checkSlugs().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
