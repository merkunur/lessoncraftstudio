/**
 * Border Import Script: Borders (First Folder)
 *
 * IMPORTANT: Borders are a THIRD content type:
 * 1. type: 'borders' (not 'images' or 'backgrounds')
 * 2. Stored in /images/borders/{theme}/ (not /images/{theme}/)
 * 3. NO resize - keep original aspect ratio
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-borders.js
 */

const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION
// ============================================================

const THEME_CONFIG = {
  name: 'borders_1',
  type: 'borders',
  sourceFolderName: 'BORDERS/borders',
  displayNames: {
    en: 'Borders 1',
    de: 'Rahmen 1',
    fr: 'Bordures 1',
    es: 'Marcos 1',
    it: 'Bordi 1',
    pt: 'Bordas 1',
    nl: 'Randen 1',
    sv: 'Ramar 1',
    da: 'Rammer 1',
    no: 'Rammer 1',
    fi: 'Kehykset 1'
  }
};

// Image translations - KEY IS FILENAME WITHOUT EXTENSION (lowercase)
const IMAGE_TRANSLATIONS = {
  // Landscape borders 001-013
  'borders landscape 001': {
    en: 'Landscape Border 1',
    de: 'Querformat Rahmen 1',
    fr: 'Bordure paysage 1',
    es: 'Marco horizontal 1',
    it: 'Bordo orizzontale 1',
    pt: 'Borda paisagem 1',
    nl: 'Liggende rand 1',
    sv: 'Liggande ram 1',
    da: 'Landskabsramme 1',
    no: 'Liggende ramme 1',
    fi: 'Vaakakehys 1'
  },
  'borders landscape 002': {
    en: 'Landscape Border 2',
    de: 'Querformat Rahmen 2',
    fr: 'Bordure paysage 2',
    es: 'Marco horizontal 2',
    it: 'Bordo orizzontale 2',
    pt: 'Borda paisagem 2',
    nl: 'Liggende rand 2',
    sv: 'Liggande ram 2',
    da: 'Landskabsramme 2',
    no: 'Liggende ramme 2',
    fi: 'Vaakakehys 2'
  },
  'borders landscape 003': {
    en: 'Landscape Border 3',
    de: 'Querformat Rahmen 3',
    fr: 'Bordure paysage 3',
    es: 'Marco horizontal 3',
    it: 'Bordo orizzontale 3',
    pt: 'Borda paisagem 3',
    nl: 'Liggende rand 3',
    sv: 'Liggande ram 3',
    da: 'Landskabsramme 3',
    no: 'Liggende ramme 3',
    fi: 'Vaakakehys 3'
  },
  'borders landscape 004': {
    en: 'Landscape Border 4',
    de: 'Querformat Rahmen 4',
    fr: 'Bordure paysage 4',
    es: 'Marco horizontal 4',
    it: 'Bordo orizzontale 4',
    pt: 'Borda paisagem 4',
    nl: 'Liggende rand 4',
    sv: 'Liggande ram 4',
    da: 'Landskabsramme 4',
    no: 'Liggende ramme 4',
    fi: 'Vaakakehys 4'
  },
  'borders landscape 005': {
    en: 'Landscape Border 5',
    de: 'Querformat Rahmen 5',
    fr: 'Bordure paysage 5',
    es: 'Marco horizontal 5',
    it: 'Bordo orizzontale 5',
    pt: 'Borda paisagem 5',
    nl: 'Liggende rand 5',
    sv: 'Liggande ram 5',
    da: 'Landskabsramme 5',
    no: 'Liggende ramme 5',
    fi: 'Vaakakehys 5'
  },
  'borders landscape 006': {
    en: 'Landscape Border 6',
    de: 'Querformat Rahmen 6',
    fr: 'Bordure paysage 6',
    es: 'Marco horizontal 6',
    it: 'Bordo orizzontale 6',
    pt: 'Borda paisagem 6',
    nl: 'Liggende rand 6',
    sv: 'Liggande ram 6',
    da: 'Landskabsramme 6',
    no: 'Liggende ramme 6',
    fi: 'Vaakakehys 6'
  },
  'borders landscape 007': {
    en: 'Landscape Border 7',
    de: 'Querformat Rahmen 7',
    fr: 'Bordure paysage 7',
    es: 'Marco horizontal 7',
    it: 'Bordo orizzontale 7',
    pt: 'Borda paisagem 7',
    nl: 'Liggende rand 7',
    sv: 'Liggande ram 7',
    da: 'Landskabsramme 7',
    no: 'Liggende ramme 7',
    fi: 'Vaakakehys 7'
  },
  'borders landscape 008': {
    en: 'Landscape Border 8',
    de: 'Querformat Rahmen 8',
    fr: 'Bordure paysage 8',
    es: 'Marco horizontal 8',
    it: 'Bordo orizzontale 8',
    pt: 'Borda paisagem 8',
    nl: 'Liggende rand 8',
    sv: 'Liggande ram 8',
    da: 'Landskabsramme 8',
    no: 'Liggende ramme 8',
    fi: 'Vaakakehys 8'
  },
  'borders landscape 009': {
    en: 'Landscape Border 9',
    de: 'Querformat Rahmen 9',
    fr: 'Bordure paysage 9',
    es: 'Marco horizontal 9',
    it: 'Bordo orizzontale 9',
    pt: 'Borda paisagem 9',
    nl: 'Liggende rand 9',
    sv: 'Liggande ram 9',
    da: 'Landskabsramme 9',
    no: 'Liggende ramme 9',
    fi: 'Vaakakehys 9'
  },
  'borders landscape 010': {
    en: 'Landscape Border 10',
    de: 'Querformat Rahmen 10',
    fr: 'Bordure paysage 10',
    es: 'Marco horizontal 10',
    it: 'Bordo orizzontale 10',
    pt: 'Borda paisagem 10',
    nl: 'Liggende rand 10',
    sv: 'Liggande ram 10',
    da: 'Landskabsramme 10',
    no: 'Liggende ramme 10',
    fi: 'Vaakakehys 10'
  },
  'borders landscape 011': {
    en: 'Landscape Border 11',
    de: 'Querformat Rahmen 11',
    fr: 'Bordure paysage 11',
    es: 'Marco horizontal 11',
    it: 'Bordo orizzontale 11',
    pt: 'Borda paisagem 11',
    nl: 'Liggende rand 11',
    sv: 'Liggande ram 11',
    da: 'Landskabsramme 11',
    no: 'Liggende ramme 11',
    fi: 'Vaakakehys 11'
  },
  'borders landscape 012': {
    en: 'Landscape Border 12',
    de: 'Querformat Rahmen 12',
    fr: 'Bordure paysage 12',
    es: 'Marco horizontal 12',
    it: 'Bordo orizzontale 12',
    pt: 'Borda paisagem 12',
    nl: 'Liggende rand 12',
    sv: 'Liggande ram 12',
    da: 'Landskabsramme 12',
    no: 'Liggende ramme 12',
    fi: 'Vaakakehys 12'
  },
  'borders landscape 013': {
    en: 'Landscape Border 13',
    de: 'Querformat Rahmen 13',
    fr: 'Bordure paysage 13',
    es: 'Marco horizontal 13',
    it: 'Bordo orizzontale 13',
    pt: 'Borda paisagem 13',
    nl: 'Liggende rand 13',
    sv: 'Liggande ram 13',
    da: 'Landskabsramme 13',
    no: 'Liggende ramme 13',
    fi: 'Vaakakehys 13'
  },
  // Portrait borders 001-019
  'borders portrait 001': {
    en: 'Portrait Border 1',
    de: 'Hochformat Rahmen 1',
    fr: 'Bordure portrait 1',
    es: 'Marco vertical 1',
    it: 'Bordo verticale 1',
    pt: 'Borda retrato 1',
    nl: 'Staande rand 1',
    sv: 'Stående ram 1',
    da: 'Portrætramme 1',
    no: 'Stående ramme 1',
    fi: 'Pystykehys 1'
  },
  'borders portrait 002': {
    en: 'Portrait Border 2',
    de: 'Hochformat Rahmen 2',
    fr: 'Bordure portrait 2',
    es: 'Marco vertical 2',
    it: 'Bordo verticale 2',
    pt: 'Borda retrato 2',
    nl: 'Staande rand 2',
    sv: 'Stående ram 2',
    da: 'Portrætramme 2',
    no: 'Stående ramme 2',
    fi: 'Pystykehys 2'
  },
  'borders portrait 003': {
    en: 'Portrait Border 3',
    de: 'Hochformat Rahmen 3',
    fr: 'Bordure portrait 3',
    es: 'Marco vertical 3',
    it: 'Bordo verticale 3',
    pt: 'Borda retrato 3',
    nl: 'Staande rand 3',
    sv: 'Stående ram 3',
    da: 'Portrætramme 3',
    no: 'Stående ramme 3',
    fi: 'Pystykehys 3'
  },
  'borders portrait 004': {
    en: 'Portrait Border 4',
    de: 'Hochformat Rahmen 4',
    fr: 'Bordure portrait 4',
    es: 'Marco vertical 4',
    it: 'Bordo verticale 4',
    pt: 'Borda retrato 4',
    nl: 'Staande rand 4',
    sv: 'Stående ram 4',
    da: 'Portrætramme 4',
    no: 'Stående ramme 4',
    fi: 'Pystykehys 4'
  },
  'borders portrait 005': {
    en: 'Portrait Border 5',
    de: 'Hochformat Rahmen 5',
    fr: 'Bordure portrait 5',
    es: 'Marco vertical 5',
    it: 'Bordo verticale 5',
    pt: 'Borda retrato 5',
    nl: 'Staande rand 5',
    sv: 'Stående ram 5',
    da: 'Portrætramme 5',
    no: 'Stående ramme 5',
    fi: 'Pystykehys 5'
  },
  'borders portrait 006': {
    en: 'Portrait Border 6',
    de: 'Hochformat Rahmen 6',
    fr: 'Bordure portrait 6',
    es: 'Marco vertical 6',
    it: 'Bordo verticale 6',
    pt: 'Borda retrato 6',
    nl: 'Staande rand 6',
    sv: 'Stående ram 6',
    da: 'Portrætramme 6',
    no: 'Stående ramme 6',
    fi: 'Pystykehys 6'
  },
  'borders portrait 007': {
    en: 'Portrait Border 7',
    de: 'Hochformat Rahmen 7',
    fr: 'Bordure portrait 7',
    es: 'Marco vertical 7',
    it: 'Bordo verticale 7',
    pt: 'Borda retrato 7',
    nl: 'Staande rand 7',
    sv: 'Stående ram 7',
    da: 'Portrætramme 7',
    no: 'Stående ramme 7',
    fi: 'Pystykehys 7'
  },
  'borders portrait 008': {
    en: 'Portrait Border 8',
    de: 'Hochformat Rahmen 8',
    fr: 'Bordure portrait 8',
    es: 'Marco vertical 8',
    it: 'Bordo verticale 8',
    pt: 'Borda retrato 8',
    nl: 'Staande rand 8',
    sv: 'Stående ram 8',
    da: 'Portrætramme 8',
    no: 'Stående ramme 8',
    fi: 'Pystykehys 8'
  },
  'borders portrait 009': {
    en: 'Portrait Border 9',
    de: 'Hochformat Rahmen 9',
    fr: 'Bordure portrait 9',
    es: 'Marco vertical 9',
    it: 'Bordo verticale 9',
    pt: 'Borda retrato 9',
    nl: 'Staande rand 9',
    sv: 'Stående ram 9',
    da: 'Portrætramme 9',
    no: 'Stående ramme 9',
    fi: 'Pystykehys 9'
  },
  'borders portrait 010': {
    en: 'Portrait Border 10',
    de: 'Hochformat Rahmen 10',
    fr: 'Bordure portrait 10',
    es: 'Marco vertical 10',
    it: 'Bordo verticale 10',
    pt: 'Borda retrato 10',
    nl: 'Staande rand 10',
    sv: 'Stående ram 10',
    da: 'Portrætramme 10',
    no: 'Stående ramme 10',
    fi: 'Pystykehys 10'
  },
  'borders portrait 011': {
    en: 'Portrait Border 11',
    de: 'Hochformat Rahmen 11',
    fr: 'Bordure portrait 11',
    es: 'Marco vertical 11',
    it: 'Bordo verticale 11',
    pt: 'Borda retrato 11',
    nl: 'Staande rand 11',
    sv: 'Stående ram 11',
    da: 'Portrætramme 11',
    no: 'Stående ramme 11',
    fi: 'Pystykehys 11'
  },
  'borders portrait 012': {
    en: 'Portrait Border 12',
    de: 'Hochformat Rahmen 12',
    fr: 'Bordure portrait 12',
    es: 'Marco vertical 12',
    it: 'Bordo verticale 12',
    pt: 'Borda retrato 12',
    nl: 'Staande rand 12',
    sv: 'Stående ram 12',
    da: 'Portrætramme 12',
    no: 'Stående ramme 12',
    fi: 'Pystykehys 12'
  },
  'borders portrait 013': {
    en: 'Portrait Border 13',
    de: 'Hochformat Rahmen 13',
    fr: 'Bordure portrait 13',
    es: 'Marco vertical 13',
    it: 'Bordo verticale 13',
    pt: 'Borda retrato 13',
    nl: 'Staande rand 13',
    sv: 'Stående ram 13',
    da: 'Portrætramme 13',
    no: 'Stående ramme 13',
    fi: 'Pystykehys 13'
  },
  'borders portrait 014': {
    en: 'Portrait Border 14',
    de: 'Hochformat Rahmen 14',
    fr: 'Bordure portrait 14',
    es: 'Marco vertical 14',
    it: 'Bordo verticale 14',
    pt: 'Borda retrato 14',
    nl: 'Staande rand 14',
    sv: 'Stående ram 14',
    da: 'Portrætramme 14',
    no: 'Stående ramme 14',
    fi: 'Pystykehys 14'
  },
  'borders portrait 015': {
    en: 'Portrait Border 15',
    de: 'Hochformat Rahmen 15',
    fr: 'Bordure portrait 15',
    es: 'Marco vertical 15',
    it: 'Bordo verticale 15',
    pt: 'Borda retrato 15',
    nl: 'Staande rand 15',
    sv: 'Stående ram 15',
    da: 'Portrætramme 15',
    no: 'Stående ramme 15',
    fi: 'Pystykehys 15'
  },
  'borders portrait 016': {
    en: 'Portrait Border 16',
    de: 'Hochformat Rahmen 16',
    fr: 'Bordure portrait 16',
    es: 'Marco vertical 16',
    it: 'Bordo verticale 16',
    pt: 'Borda retrato 16',
    nl: 'Staande rand 16',
    sv: 'Stående ram 16',
    da: 'Portrætramme 16',
    no: 'Stående ramme 16',
    fi: 'Pystykehys 16'
  },
  'borders portrait 017': {
    en: 'Portrait Border 17',
    de: 'Hochformat Rahmen 17',
    fr: 'Bordure portrait 17',
    es: 'Marco vertical 17',
    it: 'Bordo verticale 17',
    pt: 'Borda retrato 17',
    nl: 'Staande rand 17',
    sv: 'Stående ram 17',
    da: 'Portrætramme 17',
    no: 'Stående ramme 17',
    fi: 'Pystykehys 17'
  },
  'borders portrait 018': {
    en: 'Portrait Border 18',
    de: 'Hochformat Rahmen 18',
    fr: 'Bordure portrait 18',
    es: 'Marco vertical 18',
    it: 'Bordo verticale 18',
    pt: 'Borda retrato 18',
    nl: 'Staande rand 18',
    sv: 'Stående ram 18',
    da: 'Portrætramme 18',
    no: 'Stående ramme 18',
    fi: 'Pystykehys 18'
  },
  'borders portrait 019': {
    en: 'Portrait Border 19',
    de: 'Hochformat Rahmen 19',
    fr: 'Bordure portrait 19',
    es: 'Marco vertical 19',
    it: 'Bordo verticale 19',
    pt: 'Borda retrato 19',
    nl: 'Staande rand 19',
    sv: 'Stående ram 19',
    da: 'Portrætramme 19',
    no: 'Stående ramme 19',
    fi: 'Pystykehys 19'
  }
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images/borders', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images/borders', THEME_CONFIG.name);

const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  await image.webp({ quality: WEBP_QUALITY }).toFile(outputPath);
  const outputMetadata = await sharp(outputPath).metadata();
  return {
    width: outputMetadata.width,
    height: outputMetadata.height,
    size: fs.statSync(outputPath).size
  };
}

async function main() {
  console.log('============================================================');
  console.log('Border Import Script: ' + THEME_CONFIG.displayNames.en);
  console.log('============================================================\n');

  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log('Created destination directory');
  }

  if (!fs.existsSync(STANDALONE_DIR)) {
    fs.mkdirSync(STANDALONE_DIR, { recursive: true });
  }

  console.log('\n--- Step 1: Creating/Updating Theme ---');
  let theme = await prisma.imageTheme.findFirst({
    where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
  });

  if (!theme) {
    const maxSortOrder = await prisma.imageTheme.aggregate({
      where: { type: THEME_CONFIG.type },
      _max: { sortOrder: true }
    });

    theme = await prisma.imageTheme.create({
      data: {
        name: THEME_CONFIG.name,
        displayNames: THEME_CONFIG.displayNames,
        type: THEME_CONFIG.type,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1
      }
    });
    console.log(`Created new theme (id: ${theme.id})`);
  } else {
    console.log(`Using existing theme (id: ${theme.id})`);
  }

  console.log('\n--- Step 2: Processing Images ---');
  const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));
  console.log(`Found ${files.length} image files\n`);

  let successCount = 0, skipCount = 0, errorCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const lookupKey = baseName.toLowerCase().trim();

    console.log(`Processing: ${file}`);

    const translations = IMAGE_TRANSLATIONS[lookupKey];
    if (!translations) {
      console.log(`  WARNING: No translations found for "${lookupKey}", skipping`);
      skipCount++;
      continue;
    }

    try {
      const inputPath = path.join(SOURCE_DIR, file);
      const newFilename = generateUniqueFilename(baseName);
      const outputPath = path.join(DEST_DIR, newFilename);

      const { width, height, size } = await processImage(inputPath, outputPath);
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));

      console.log(`  Saved: ${newFilename} (${width}x${height}) - Original aspect ratio preserved`);

      const existing = await prisma.imageLibraryItem.findFirst({
        where: { themeId: theme.id, translations: { path: ['en'], equals: translations.en } }
      });

      if (existing) {
        console.log(`  Already in database, skipping`);
        skipCount++;
        continue;
      }

      const maxSort = await prisma.imageLibraryItem.aggregate({
        where: { themeId: theme.id },
        _max: { sortOrder: true }
      });

      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/borders/${THEME_CONFIG.name}/${newFilename}`,
          translations: translations,
          fileSize: size,
          mimeType: 'image/webp',
          width: width,
          height: height,
          sortOrder: (maxSort._max.sortOrder || 0) + 1
        }
      });

      console.log(`  Created database record`);
      successCount++;
    } catch (error) {
      console.log(`  ERROR: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n--- Syncing to standalone build ---');
  const destFiles = fs.readdirSync(DEST_DIR);
  for (const file of destFiles) {
    const src = path.join(DEST_DIR, file);
    const dest = path.join(STANDALONE_DIR, file);
    if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
  }
  console.log(`Copied ${destFiles.length} files to standalone`);

  console.log('\n============================================================');
  console.log('BORDER IMPORT COMPLETE');
  console.log('============================================================');
  console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
  console.log(`Type: ${THEME_CONFIG.type}`);
  console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
