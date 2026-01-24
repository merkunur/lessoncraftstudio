/**
 * Cleanup Script: Remove combined borders theme
 */
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function cleanup() {
  console.log('Cleaning up combined borders theme...');

  const theme = await prisma.imageTheme.findFirst({
    where: { name: 'borders', type: 'borders' }
  });

  if (theme) {
    // Delete all images in this theme
    const deleted = await prisma.imageLibraryItem.deleteMany({
      where: { themeId: theme.id }
    });
    console.log(`Deleted ${deleted.count} image records from database`);

    // Delete the theme
    await prisma.imageTheme.delete({ where: { id: theme.id } });
    console.log(`Deleted theme: ${theme.id}`);

    // Delete files from disk
    const borderDir = '/opt/lessoncraftstudio/frontend/public/images/borders/borders';
    const standaloneDir = '/opt/lessoncraftstudio/frontend/.next/standalone/public/images/borders/borders';

    if (fs.existsSync(borderDir)) {
      fs.rmSync(borderDir, { recursive: true });
      console.log('Deleted folder: ' + borderDir);
    }

    if (fs.existsSync(standaloneDir)) {
      fs.rmSync(standaloneDir, { recursive: true });
      console.log('Deleted folder: ' + standaloneDir);
    }
  } else {
    console.log('Theme not found - nothing to clean up');
  }

  await prisma.$disconnect();
  console.log('Cleanup complete!');
}

cleanup().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
