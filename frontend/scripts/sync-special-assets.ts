/**
 * Sync Special Assets Script
 * Migrates existing border/background/train/worksheet files from disk into database
 * Follows the exact same pattern as main images
 *
 * Storage pattern (matching main images):
 * - Main images: public/images/{theme}/ → database: /images/{theme}/{file}
 * - Borders: public/borders/{theme}/ → database: /images/borders/{theme}/{file}
 * - Backgrounds: public/images/backgrounds/{theme}/ → database: /images/backgrounds/{theme}/{file}
 * - Train: public/images/train-templates/{theme}/ → database: /images/train-templates/{theme}/{file}
 * - Worksheet: public/images/worksheet-templates/{theme}/ → database: /images/worksheet-templates/{theme}/{file}
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

interface AssetConfig {
  type: string;
  diskPath: string; // Where files actually are on disk
  dbPathPrefix: string; // How paths are stored in database
}

const ASSET_CONFIGS: AssetConfig[] = [
  {
    type: 'borders',
    diskPath: 'public/images/borders',
    dbPathPrefix: '/images/borders', // New location in database
  },
  {
    type: 'backgrounds',
    diskPath: 'public/images/backgrounds',
    dbPathPrefix: '/images/backgrounds',
  },
  {
    type: 'train',
    diskPath: 'public/images/train-templates',
    dbPathPrefix: '/images/train-templates',
  },
  {
    type: 'worksheet',
    diskPath: 'public/images/worksheet-templates',
    dbPathPrefix: '/images/worksheet-templates',
  },
];

async function syncAssets() {
  console.log('🔄 Starting special assets sync...\n');

  for (const config of ASSET_CONFIGS) {
    await syncAssetType(config);
  }

  console.log('\n✅ Special assets sync complete!');
  await prisma.$disconnect();
}

async function syncAssetType(config: AssetConfig) {
  console.log(`\n📂 Syncing ${config.type}...`);

  const fullPath = path.join(process.cwd(), config.diskPath);

  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const themeName = entry.name;
        await syncTheme(config, themeName);
      }
    }
  } catch (error) {
    console.log(`   ⚠️  Directory not found: ${fullPath}`);
  }
}

async function syncTheme(config: AssetConfig, themeName: string) {
  console.log(`  📁 Theme: ${themeName}`);

  // Find or create theme
  let theme = await prisma.imageTheme.findFirst({
    where: {
      name: themeName,
      type: config.type,
    },
  });

  if (!theme) {
    console.log(`     Creating new theme: ${themeName}`);
    theme = await prisma.imageTheme.create({
      data: {
        name: themeName,
        displayNames: { en: themeName },
        type: config.type,
        sortOrder: 0,
      },
    });
  }

  // Scan files in theme directory on disk
  const themePath = path.join(process.cwd(), config.diskPath, themeName);

  try {
    const files = await fs.readdir(themePath);
    const imageFiles = files.filter((file) =>
      /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file)
    );

    console.log(`     Found ${imageFiles.length} files on disk`);

    let addedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];

      // Database path follows the pattern: /images/borders/{theme}/{file}
      const dbFilePath = `${config.dbPathPrefix}/${themeName}/${filename}`;

      // Check if already exists
      const existing = await prisma.imageLibraryItem.findFirst({
        where: {
          themeId: theme.id,
          filename: filename,
        },
      });

      if (existing) {
        skippedCount++;
        continue;
      }

      // Get file stats from disk
      const fullFilePath = path.join(themePath, filename);
      const stats = await fs.stat(fullFilePath);

      // Create display name from filename
      const displayName = filename.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '').replace(/-/g, ' ');

      // Create image library item with database path
      await prisma.imageLibraryItem.create({
        data: {
          filename,
          filePath: dbFilePath, // Use database path format
          themeId: theme.id,
          translations: { en: displayName },
          fileSize: stats.size,
          mimeType: getMimeType(filename),
          width: null,
          height: null,
          sortOrder: i,
        },
      });

      addedCount++;
    }

    console.log(`     ✓ Added: ${addedCount}, Skipped (existing): ${skippedCount}`);
  } catch (error) {
    console.log(`     ⚠️  Error reading theme directory: ${error}`);
  }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  };
  return mimeTypes[ext] || 'image/png';
}

// Run the sync
syncAssets().catch((error) => {
  console.error('❌ Error syncing assets:', error);
  process.exit(1);
});
