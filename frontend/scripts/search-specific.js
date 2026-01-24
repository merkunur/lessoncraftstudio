/**
 * Search for specific problem slugs from the original issue
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function search() {
  // Specific slugs from the original problem
  const searchTerms = [
    'vorschule', 'feinmotorik', 'aktivitaeten', // German
    'generador', 'sopa-de-letras', // Spanish
    'strumenti', 'alfabetizzazione', // Italian
    'feter', 'jours-ecole', 'activites-fiches' // French
  ];

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true }
  });

  console.log('Searching for specific problematic slugs...\n');
  let found = 0;

  for (const post of posts) {
    const trans = post.translations || {};
    for (const [lang, content] of Object.entries(trans)) {
      const slug = content?.slug || '';
      for (const term of searchTerms) {
        if (slug.toLowerCase().includes(term.toLowerCase())) {
          found++;
          console.log('Match:');
          console.log('  Post:', post.slug);
          console.log('  Lang key:', lang);
          console.log('  Slug:', slug);
          console.log('  Title:', (content?.title || '').substring(0, 60));
          console.log();
        }
      }
    }
  }

  console.log(`Total matches: ${found}`);
  await prisma.$disconnect();
}

search().catch(e => {
  console.error(e);
  process.exit(1);
});
