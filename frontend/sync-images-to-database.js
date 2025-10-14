const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { createId } = require('@paralleldrive/cuid2');

const prisma = new PrismaClient();

// Directories to exclude from scanning (not image libraries)
// These are either app-specific resources or have their own content types
const EXCLUDED_DIRS = [
  'alphabetsvg',           // ❌ Letter SVG files used by writing.html app
  'drawing lines',         // ❌ Drawing line templates for drawing lines.html app
  'coloring',              // ❌ Coloring page templates for coloring.html app
  'prepositions',          // ❌ Preposition images used by prepositions.html app
  'symbols',               // ❌ Symbol images used by more less.html app
  'template',              // Template files
  'train-templates',       // Train template type
  'train_templates',       // Train template type
  'worksheet-templates',   // Worksheet template type
  'worksheet_templates',   // Worksheet template type
  'backgrounds',           // Has its own content type (backgrounds)
  'borders',               // Has its own content type (borders)
  'icons',                 // UI icons, not worksheet images
  '.next',                 // Build artifacts
  'node_modules'           // Dependencies
];

// Type mapping for special directories
const TYPE_MAPPING = {
  'backgrounds': 'backgrounds',
  'borders': 'borders',
  'train-templates': 'train',
  'train_templates': 'train',
  'worksheet-templates': 'worksheet',
  'worksheet_templates': 'worksheet'
};

function generateId() {
  return createId();
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'].includes(ext);
}

function getAllImageFiles(dirPath, basePath = '') {
  const files = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = basePath ? path.join(basePath, entry.name) : entry.name;

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        files.push(...getAllImageFiles(fullPath, relativePath));
      } else if (entry.isFile() && isImageFile(entry.name)) {
        files.push({
          filename: entry.name,
          relativePath: relativePath,
          fullPath: fullPath
        });
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }

  return files;
}

async function syncImagesToDatabase() {
  console.log('🚀 Starting image sync to database...\n');

  const imagesDir = path.join(__dirname, 'public', 'images');

  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    return;
  }

  let totalThemesCreated = 0;
  let totalImagesAdded = 0;
  let totalImagesSkipped = 0;
  let totalErrors = 0;

  try {
    // Get all directories in images folder
    const directories = fs.readdirSync(imagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => !EXCLUDED_DIRS.includes(name));

    console.log(`📁 Found ${directories.length} image directories to process\n`);

    for (const dirName of directories) {
      console.log(`\n📂 Processing directory: ${dirName}`);
      console.log('─'.repeat(60));

      // Determine the type for this directory
      const contentType = TYPE_MAPPING[dirName] || 'images';

      // Check if theme exists in database
      let theme = await prisma.imageTheme.findFirst({
        where: { name: dirName }
      });

      // Create theme if it doesn't exist
      if (!theme) {
        try {
          theme = await prisma.imageTheme.create({
            data: {
              id: generateId(),
              name: dirName,
              displayNames: { en: dirName },
              type: contentType,
              sortOrder: 0,
              updatedAt: new Date()
            }
          });
          console.log(`✅ Created theme: ${dirName} (type: ${contentType})`);
          totalThemesCreated++;
        } catch (error) {
          console.error(`❌ Error creating theme ${dirName}:`, error.message);
          totalErrors++;
          continue;
        }
      } else {
        console.log(`✓ Theme already exists: ${dirName} (ID: ${theme.id})`);
      }

      // Get all image files in this directory (including subdirectories)
      const dirPath = path.join(imagesDir, dirName);
      const imageFiles = getAllImageFiles(dirPath);

      console.log(`   Found ${imageFiles.length} image files`);

      let addedCount = 0;
      let skippedCount = 0;

      for (const file of imageFiles) {
        try {
          // Construct the file path as stored in database (with forward slashes)
          const filePath = `/images/${dirName}/${file.relativePath}`.replace(/\\/g, '/');

          // Check if image already exists in database
          const exists = await prisma.imageLibraryItem.findFirst({
            where: { filePath: filePath }
          });

          if (exists) {
            skippedCount++;
            totalImagesSkipped++;
            continue;
          }

          // Get file stats
          const stats = fs.statSync(file.fullPath);

          // Get display name from filename (without extension)
          const displayName = path.basename(file.filename, path.extname(file.filename))
            .replace(/[-_]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          // Create image record
          await prisma.imageLibraryItem.create({
            data: {
              id: generateId(),
              themeId: theme.id,
              filename: file.filename,
              filePath: filePath,
              fileSize: stats.size,
              mimeType: getMimeType(file.filename),
              translations: { en: displayName },
              sortOrder: 0,
              updatedAt: new Date()
            }
          });

          addedCount++;
          totalImagesAdded++;

          // Show progress every 10 images
          if (addedCount % 10 === 0) {
            console.log(`   ⏳ Added ${addedCount} images...`);
          }
        } catch (error) {
          console.error(`   ❌ Error adding ${file.relativePath}:`, error.message);
          totalErrors++;
        }
      }

      console.log(`   ✅ Added: ${addedCount} images`);
      if (skippedCount > 0) {
        console.log(`   ⏭️  Skipped: ${skippedCount} (already in database)`);
      }
    }

    console.log('\n' + '═'.repeat(60));
    console.log('📊 SYNC SUMMARY');
    console.log('═'.repeat(60));
    console.log(`✅ Themes created:     ${totalThemesCreated}`);
    console.log(`✅ Images added:       ${totalImagesAdded}`);
    console.log(`⏭️  Images skipped:     ${totalImagesSkipped}`);
    console.log(`❌ Errors:             ${totalErrors}`);
    console.log('═'.repeat(60));

    // Show final database stats
    const themeCount = await prisma.imageTheme.count();
    const imageCount = await prisma.imageLibraryItem.count();

    console.log('\n📈 FINAL DATABASE STATISTICS');
    console.log('─'.repeat(60));
    console.log(`Total themes in database:  ${themeCount}`);
    console.log(`Total images in database:  ${imageCount}`);
    console.log('─'.repeat(60));

    console.log('\n🎉 Image sync completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Fatal error during sync:', error);
    throw error;
  }
}

// Run the sync
syncImagesToDatabase()
  .catch((error) => {
    console.error('💥 Sync failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('👋 Database connection closed\n');
  });
