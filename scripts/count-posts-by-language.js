const { PrismaClient } = require('../frontend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function countByLanguage() {
  const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { translations: true }
  });

  console.log('Blog Posts Per Language:');
  console.log('═══════════════════════\n');

  for (const locale of locales) {
    const count = posts.filter(post => {
      const translations = post.translations;
      const translation = translations[locale];
      return translation && translation.title && translation.content;
    }).length;

    console.log(`${locale}: ${count} posts`);
  }

  await prisma.$disconnect();
}

countByLanguage();
