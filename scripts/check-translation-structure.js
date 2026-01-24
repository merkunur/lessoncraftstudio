const { PrismaClient } = require('../frontend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function checkTranslations() {
  const post = await prisma.blogPost.findFirst({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  console.log('Post:', post.slug);
  console.log('');

  const trans = post.translations;
  Object.keys(trans).forEach(lang => {
    const t = trans[lang];
    console.log(lang + ':');
    console.log('  has title:', !!t.title);
    console.log('  has content:', !!t.content);
    console.log('  has slug:', !!t.slug);
    console.log('');
  });

  await prisma.$disconnect();
}

checkTranslations();
