// Diagnostic script to check production database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || (() => { throw new Error('DATABASE_URL not set (secrets rotated 2026-07-03 — no hardcoded fallback)'); })()
    }
  }
});

async function checkImages() {
  console.log('🔍 Checking production database...\n');

  // Get all themes with image counts
  const themes = await prisma.imageTheme.findMany({
    where: { type: 'images' },
    include: {
      _count: {
        select: { images: true }
      },
      images: {
        orderBy: { createdAt: 'desc' },
        take: 3
      }
    }
  });

  console.log(`Found ${themes.length} themes:\n`);

  for (const theme of themes) {
    console.log(`📁 ${theme.name}: ${theme._count.images} images`);
    if (theme.images.length > 0) {
      console.log('   Latest images:');
      theme.images.forEach(img => {
        console.log(`   - ${img.filename}`);
        console.log(`     Path: ${img.filePath}`);
        console.log(`     Created: ${img.createdAt}`);
      });
    }
    console.log('');
  }

  await prisma.$disconnect();
}

checkImages().catch(console.error);
