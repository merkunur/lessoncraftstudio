const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const CONTENT_TYPES = [
  { file: 'images-metadata.json', type: 'images' },
  { file: 'backgrounds-metadata.json', type: 'backgrounds' },
  { file: 'borders-metadata.json', type: 'borders' },
  { file: 'train-templates-metadata.json', type: 'train' },
  { file: 'worksheet-templates-metadata.json', type: 'worksheet' }
];

async function syncImages() {
  try {
    console.log('\n🔄 Syncing images to existing themes...\n');

    for (const contentType of CONTENT_TYPES) {
      const filePath = path.join(__dirname, '../public/data', contentType.file);

      if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${contentType.type} - file not found: ${contentType.file}`);
        continue;
      }

      console.log(`\n📦 Processing ${contentType.type} from ${contentType.file}...`);

      const metadata = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Handle different metadata formats
      let themes = [];
      if (metadata.themes) {
        themes = metadata.themes;
      } else if (metadata.templates && Array.isArray(metadata.templates)) {
        themes = [{
          name: `${contentType.type}-templates`,
          images: metadata.templates
        }];
      }

      for (const themeData of themes) {
        if (!themeData.name) continue;
        if (themeData.active === false) continue;

        // Find the theme in database
        let dbTheme = await prisma.imageTheme.findFirst({
          where: {
            name: themeData.name,
            type: contentType.type
          },
          include: {
            images: true
          }
        });

        // Try with -type suffix if not found
        if (!dbTheme) {
          dbTheme = await prisma.imageTheme.findFirst({
            where: {
              name: `${themeData.name}-${contentType.type}`,
              type: contentType.type
            },
            include: {
              images: true
            }
          });
        }

        if (!dbTheme) {
          console.log(`  ❌ Theme "${themeData.name}" not found in database, skipping...`);
          continue;
        }

        console.log(`  📁 Processing theme: ${dbTheme.name} (currently has ${dbTheme.images.length} images)`);

        const images = themeData.images || [];
        let addedCount = 0;
        let skippedCount = 0;

        for (let i = 0; i < images.length; i++) {
          const img = images[i];

          // Check if image already exists by path
          const exists = dbTheme.images.some(dbImg => dbImg.filePath === img.path);

          if (exists) {
            skippedCount++;
            continue;
          }

          // Add the image
          await prisma.imageLibraryItem.create({
            data: {
              filename: img.filename || img.name || `image-${i}`,
              filePath: img.path,
              fileSize: 0,
              mimeType: 'image/png',
              themeId: dbTheme.id,
              translations: img.translations || { en: img.displayName || img.name || img.filename },
              sortOrder: dbTheme.images.length + addedCount
            }
          });

          addedCount++;
        }

        console.log(`     ✅ Added ${addedCount} new images, skipped ${skippedCount} existing`);
      }
    }

    console.log('\n✨ Image sync completed!\n');

    // Show summary
    const summary = await prisma.imageTheme.groupBy({
      by: ['type'],
      _count: true
    });

    console.log('📊 Final Database Summary:');
    for (const item of summary) {
      const imageCount = await prisma.imageLibraryItem.count({
        where: {
          theme: {
            type: item.type
          }
        }
      });
      console.log(`   ${item.type}: ${item._count} themes, ${imageCount} items`);
    }
    console.log('');

  } catch (error) {
    console.error('\n❌ Sync error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

syncImages();
