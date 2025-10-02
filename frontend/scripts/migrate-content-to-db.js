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

async function migrateContent() {
  try {
    console.log('\n🚀 Starting content migration to database...\n');

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
        // For train/worksheet templates, create a single theme with all templates
        themes = [{
          name: `${contentType.type}-templates`,
          displayNames: {
            en: `${contentType.type.charAt(0).toUpperCase() + contentType.type.slice(1)} Templates`,
            de: `${contentType.type.charAt(0).toUpperCase() + contentType.type.slice(1)} Vorlagen`,
            fr: `Modèles ${contentType.type}`,
            es: `Plantillas ${contentType.type}`,
            it: `Modelli ${contentType.type}`,
            pt: `Modelos ${contentType.type}`,
            nl: `${contentType.type} Sjablonen`,
            sv: `${contentType.type} Mallar`,
            da: `${contentType.type} Skabeloner`,
            no: `${contentType.type} Maler`,
            fi: `${contentType.type} Mallit`
          },
          active: true,
          sortOrder: 1,
          images: metadata.templates
        }];
      }

      for (const themeData of themes) {
        // Skip inactive themes
        if (themeData.active === false) {
          console.log(`  ⏭️  Skipping inactive theme: ${themeData.name}`);
          continue;
        }

        // Skip if no name
        if (!themeData.name) {
          console.log(`  ⏭️  Skipping theme with no name`);
          continue;
        }

        // Check if theme already exists
        const existing = await prisma.imageTheme.findFirst({
          where: {
            name: themeData.name,
            type: contentType.type
          }
        });

        if (existing) {
          console.log(`  ✓ Theme "${themeData.name}" (${contentType.type}) already exists, skipping...`);
          continue;
        }

        // Create unique theme name by combining with type if collision exists
        let themeName = themeData.name;
        const nameExists = await prisma.imageTheme.findFirst({
          where: { name: themeData.name }
        });

        if (nameExists && nameExists.type !== contentType.type) {
          // Name collision across types - make unique
          themeName = `${themeData.name}-${contentType.type}`;
        }

        // Check if this final name already exists (from previous runs)
        const finalExists = await prisma.imageTheme.findFirst({
          where: { name: themeName }
        });

        if (finalExists) {
          console.log(`  ✓ Theme "${themeName}" already exists, skipping...`);
          continue;
        }

        // Create theme
        console.log(`  📁 Creating theme: ${themeName}`);
        const theme = await prisma.imageTheme.create({
          data: {
            name: themeName,
            displayNames: themeData.displayNames || { en: themeData.name },
            type: contentType.type,
            sortOrder: themeData.sortOrder || 0
          }
        });

        // Add images to theme
        const images = themeData.images || [];
        console.log(`     Adding ${images.length} images...`);

        for (let i = 0; i < images.length; i++) {
          const img = images[i];

          await prisma.imageLibraryItem.create({
            data: {
              filename: img.filename || img.name || `image-${i}`,
              filePath: img.path,
              fileSize: 0, // We don't have this info
              mimeType: 'image/png', // Assume PNG
              themeId: theme.id,
              translations: img.translations || { en: img.displayName || img.name || img.filename },
              sortOrder: i
            }
          });
        }

        console.log(`  ✅ Created "${themeData.name}" with ${images.length} images`);
      }
    }

    console.log('\n✨ Migration completed successfully!\n');

    // Show summary
    const summary = await prisma.imageTheme.groupBy({
      by: ['type'],
      _count: true
    });

    console.log('📊 Database Summary:');
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
    console.error('\n❌ Migration error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrateContent();
