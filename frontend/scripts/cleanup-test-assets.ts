/**
 * Cleanup Test Assets Script
 * Deletes all test images from borders, backgrounds, train, and worksheet templates
 * This removes both database entries and physical files
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

const ASSET_TYPES_TO_CLEAN = ['borders', 'backgrounds', 'train', 'worksheet'];

// Get the true source directory (not standalone)
function getSourceRoot(): string {
  const cwd = process.cwd();
  if (cwd.endsWith('.next/standalone') || cwd.includes('.next/standalone')) {
    return path.resolve(cwd, '../..');
  }
  return cwd;
}

async function cleanupAssets() {
  console.log('🧹 Starting cleanup of test assets...\n');

  const sourceRoot = getSourceRoot();
  let totalImagesDeleted = 0;
  let totalThemesDeleted = 0;
  let totalFilesDeleted = 0;

  for (const assetType of ASSET_TYPES_TO_CLEAN) {
    console.log(`\n📂 Cleaning ${assetType}...`);

    try {
      // Find all themes of this type
      const themes = await prisma.imageTheme.findMany({
        where: { type: assetType },
        include: { images: true },
      });

      console.log(`   Found ${themes.length} themes with images to delete`);

      for (const theme of themes) {
        console.log(`   🗑️  Deleting theme: ${theme.name} (${theme.images.length} images)`);

        // Delete physical files from disk
        for (const image of theme.images) {
          try {
            const fullPath = path.join(sourceRoot, 'public', image.filePath);
            await fs.unlink(fullPath);
            console.log(`      ✓ Deleted file: ${image.filename}`);
            totalFilesDeleted++;
          } catch (error) {
            console.warn(`      ⚠️  Could not delete file: ${image.filename}`, error);
          }
        }

        // Delete all images from database (CASCADE will handle this, but being explicit)
        const deletedImages = await prisma.imageLibraryItem.deleteMany({
          where: { themeId: theme.id },
        });
        totalImagesDeleted += deletedImages.count;
        console.log(`      ✓ Deleted ${deletedImages.count} image records from database`);

        // Delete theme from database
        await prisma.imageTheme.delete({
          where: { id: theme.id },
        });
        totalThemesDeleted++;
        console.log(`      ✓ Deleted theme from database`);

        // Try to delete theme directory from disk if it's empty
        try {
          const themeDirMap: Record<string, string> = {
            'borders': path.join(sourceRoot, 'public', 'images', 'borders', theme.name),
            'backgrounds': path.join(sourceRoot, 'public', 'images', 'backgrounds', theme.name),
            'train': path.join(sourceRoot, 'public', 'images', 'train-templates', theme.name),
            'worksheet': path.join(sourceRoot, 'public', 'images', 'worksheet-templates', theme.name),
          };

          const themeDir = themeDirMap[assetType];
          if (themeDir) {
            await fs.rmdir(themeDir);
            console.log(`      ✓ Deleted theme directory: ${themeDir}`);
          }
        } catch (error) {
          // Directory might not be empty or might not exist - that's okay
          console.log(`      ℹ️  Could not delete theme directory (may not be empty or may not exist)`);
        }
      }

      console.log(`   ✅ Cleaned ${assetType}: ${themes.length} themes`);
    } catch (error) {
      console.error(`   ❌ Error cleaning ${assetType}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Cleanup complete!');
  console.log(`   Themes deleted: ${totalThemesDeleted}`);
  console.log(`   Image records deleted: ${totalImagesDeleted}`);
  console.log(`   Physical files deleted: ${totalFilesDeleted}`);
  console.log('='.repeat(60) + '\n');

  await prisma.$disconnect();
}

// Run the cleanup
cleanupAssets().catch((error) => {
  console.error('❌ Error during cleanup:', error);
  process.exit(1);
});
