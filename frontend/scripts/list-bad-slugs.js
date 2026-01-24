/**
 * List all problematic slugs for ES and PT
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  console.log('=== PROBLEMATIC SLUGS ===\n');

  for (const lang of ['es', 'pt']) {
    const langName = lang === 'es' ? 'SPANISH' : 'PORTUGUESE';
    console.log(`\n${langName} SLUGS WITH "final-optimized":\n`);

    let count = 0;
    for (const post of posts) {
      const t = post.translations?.[lang];
      if (t?.slug?.includes('final-optimized')) {
        count++;
        console.log(`Post: ${post.slug}`);
        console.log(`  ${lang} slug: ${t.slug}`);
        console.log(`  ${lang} title: ${t.title?.substring(0, 60)}...`);
        console.log();
      }
    }
    console.log(`Total: ${count}\n`);
  }

  // Also check for other languages
  console.log('\n=== CHECKING ALL LANGUAGES FOR "final-optimized" ===\n');

  const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  const countByLang = {};

  for (const post of posts) {
    for (const lang of locales) {
      const t = post.translations?.[lang];
      if (t?.slug?.includes('final-optimized') || t?.slug?.includes('optimized')) {
        countByLang[lang] = (countByLang[lang] || 0) + 1;
      }
    }
  }

  console.log('Slugs containing "optimized" by language:');
  for (const [lang, count] of Object.entries(countByLang)) {
    console.log(`  ${lang}: ${count}`);
  }

  await prisma.$disconnect();
}

list().catch(e => {
  console.error(e);
  process.exit(1);
});
