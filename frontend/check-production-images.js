// Diagnostic script to check production database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://lcs_user:LcS2025SecureDBPass@65.108.5.250:5432/lessoncraftstudio_prod'
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
