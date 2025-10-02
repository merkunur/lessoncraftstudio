const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listThemes() {
  const themes = await prisma.imageTheme.findMany({
    where: { type: 'images' },
    select: {
      name: true,
      _count: {
        select: { images: true }
      }
    }
  });

  console.log('\n📦 Image themes in database:');
  themes.forEach(t => console.log(`  - ${t.name}: ${t._count.images} images`));
  console.log('');

  await prisma.$disconnect();
}

listThemes();
