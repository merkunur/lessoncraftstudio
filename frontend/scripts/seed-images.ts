import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function seedImages() {
  console.log('🌱 Seeding images from filesystem...');

  const baseDir = path.join(process.cwd(), 'public', 'images');

  // Get all directories in the images folder
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const themeDirs = entries.filter(entry =>
    entry.isDirectory() &&
    !['backgrounds', 'borders', 'template', 'coloring'].includes(entry.name)
  );

  let totalImages = 0;
  let totalThemes = 0;

  for (const themeDir of themeDirs) {
    const themeName = themeDir.name;
    const themePath = path.join(baseDir, themeName);

    // Check if directory has images
    const files = fs.readdirSync(themePath);
    const imageFiles = files.filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file));

    if (imageFiles.length === 0) continue;

    console.log(`\n📁 Processing theme: ${themeName} (${imageFiles.length} images)`);

    // Create or get theme
    const theme = await prisma.imageTheme.upsert({
      where: { name: themeName },
      update: {},
      create: {
        name: themeName,
        displayNames: {
          en: themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/-/g, ' ')
        },
        type: 'images',
        sortOrder: totalThemes,
      },
    });

    totalThemes++;

    // Add images to theme
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = `/images/${themeName}/${file}`;
      const fileName = path.basename(file, path.extname(file)).replace(/[-_]/g, ' ');

      const stats = fs.statSync(path.join(themePath, file));

      // Check if image already exists
      const existing = await prisma.imageLibraryItem.findFirst({
        where: {
          themeId: theme.id,
          filename: file,
        }
      });

      if (!existing) {
        await prisma.imageLibraryItem.create({
          data: {
            themeId: theme.id,
            filename: file,
            filePath: filePath,
            fileSize: stats.size,
            mimeType: 'image/png',
            translations: {
              en: fileName
            },
            sortOrder: i,
          },
        });
      }

      totalImages++;
      process.stdout.write(`   ✓ ${fileName}\r`);
    }
  }

  console.log(`\n\n✅ Seeding complete!`);
  console.log(`   Themes: ${totalThemes}`);
  console.log(`   Images: ${totalImages}`);
}

seedImages()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
