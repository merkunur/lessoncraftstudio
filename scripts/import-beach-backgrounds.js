/**
 * Background Import Script: Beach
 *
 * IMPORTANT: Backgrounds are different from main images:
 * 1. type: 'backgrounds' (not 'images')
 * 2. Stored in /images/backgrounds/{theme}/ (not /images/{theme}/)
 * 3. NO resize - keep original aspect ratio
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-beach-backgrounds.js
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
  name: 'beach_bg',
  type: 'backgrounds',
  sourceFolderName: 'BACKGROUNDS/beach',
  displayNames: {
    en: 'Beach',
    de: 'Strand',
    fr: 'Plage',
    es: 'Playa',
    it: 'Spiaggia',
    pt: 'Praia',
    nl: 'Strand',
    sv: 'Strand',
    da: 'Strand',
    no: 'Strand',
    fi: 'Ranta'
  }
};

// Image translations - KEY IS FILENAME WITHOUT EXTENSION (lowercase)
const IMAGE_TRANSLATIONS = {
  'background landscape 011': {
    en: 'Landscape Background 1',
    de: 'Querformat Hintergrund 1',
    fr: 'Arrière-plan paysage 1',
    es: 'Fondo horizontal 1',
    it: 'Sfondo orizzontale 1',
    pt: 'Fundo paisagem 1',
    nl: 'Liggend achtergrond 1',
    sv: 'Liggande bakgrund 1',
    da: 'Landskabsbaggrund 1',
    no: 'Liggende bakgrunn 1',
    fi: 'Vaakasuuntainen tausta 1'
  },
  'background landscape 012': {
    en: 'Landscape Background 2',
    de: 'Querformat Hintergrund 2',
    fr: 'Arrière-plan paysage 2',
    es: 'Fondo horizontal 2',
    it: 'Sfondo orizzontale 2',
    pt: 'Fundo paisagem 2',
    nl: 'Liggend achtergrond 2',
    sv: 'Liggande bakgrund 2',
    da: 'Landskabsbaggrund 2',
    no: 'Liggende bakgrunn 2',
    fi: 'Vaakasuuntainen tausta 2'
  },
  'background landscape 013': {
    en: 'Landscape Background 3',
    de: 'Querformat Hintergrund 3',
    fr: 'Arrière-plan paysage 3',
    es: 'Fondo horizontal 3',
    it: 'Sfondo orizzontale 3',
    pt: 'Fundo paisagem 3',
    nl: 'Liggend achtergrond 3',
    sv: 'Liggande bakgrund 3',
    da: 'Landskabsbaggrund 3',
    no: 'Liggende bakgrunn 3',
    fi: 'Vaakasuuntainen tausta 3'
  },
  'background landscape 014': {
    en: 'Landscape Background 4',
    de: 'Querformat Hintergrund 4',
    fr: 'Arrière-plan paysage 4',
    es: 'Fondo horizontal 4',
    it: 'Sfondo orizzontale 4',
    pt: 'Fundo paisagem 4',
    nl: 'Liggend achtergrond 4',
    sv: 'Liggande bakgrund 4',
    da: 'Landskabsbaggrund 4',
    no: 'Liggende bakgrunn 4',
    fi: 'Vaakasuuntainen tausta 4'
  },
  'background landscape 015': {
    en: 'Landscape Background 5',
    de: 'Querformat Hintergrund 5',
    fr: 'Arrière-plan paysage 5',
    es: 'Fondo horizontal 5',
    it: 'Sfondo orizzontale 5',
    pt: 'Fundo paisagem 5',
    nl: 'Liggend achtergrond 5',
    sv: 'Liggande bakgrund 5',
    da: 'Landskabsbaggrund 5',
    no: 'Liggende bakgrunn 5',
    fi: 'Vaakasuuntainen tausta 5'
  },
  'background portrait 012': {
    en: 'Portrait Background 1',
    de: 'Hochformat Hintergrund 1',
    fr: 'Arrière-plan portrait 1',
    es: 'Fondo vertical 1',
    it: 'Sfondo verticale 1',
    pt: 'Fundo retrato 1',
    nl: 'Staand achtergrond 1',
    sv: 'Stående bakgrund 1',
    da: 'Portrætbaggrund 1',
    no: 'Stående bakgrunn 1',
    fi: 'Pystysuuntainen tausta 1'
  },
  'background portrait 013': {
    en: 'Portrait Background 2',
    de: 'Hochformat Hintergrund 2',
    fr: 'Arrière-plan portrait 2',
    es: 'Fondo vertical 2',
    it: 'Sfondo verticale 2',
    pt: 'Fundo retrato 2',
    nl: 'Staand achtergrond 2',
    sv: 'Stående bakgrund 2',
    da: 'Portrætbaggrund 2',
    no: 'Stående bakgrunn 2',
    fi: 'Pystysuuntainen tausta 2'
  },
  'background portrait 014': {
    en: 'Portrait Background 3',
    de: 'Hochformat Hintergrund 3',
    fr: 'Arrière-plan portrait 3',
    es: 'Fondo vertical 3',
    it: 'Sfondo verticale 3',
    pt: 'Fundo retrato 3',
    nl: 'Staand achtergrond 3',
    sv: 'Stående bakgrund 3',
    da: 'Portrætbaggrund 3',
    no: 'Stående bakgrunn 3',
    fi: 'Pystysuuntainen tausta 3'
  },
  'background portrait 015': {
    en: 'Portrait Background 4',
    de: 'Hochformat Hintergrund 4',
    fr: 'Arrière-plan portrait 4',
    es: 'Fondo vertical 4',
    it: 'Sfondo verticale 4',
    pt: 'Fundo retrato 4',
    nl: 'Staand achtergrond 4',
    sv: 'Stående bakgrund 4',
    da: 'Portrætbaggrund 4',
    no: 'Stående bakgrunn 4',
    fi: 'Pystysuuntainen tausta 4'
  },
  'background portrait 016': {
    en: 'Portrait Background 5',
    de: 'Hochformat Hintergrund 5',
    fr: 'Arrière-plan portrait 5',
    es: 'Fondo vertical 5',
    it: 'Sfondo verticale 5',
    pt: 'Fundo retrato 5',
    nl: 'Staand achtergrond 5',
    sv: 'Stående bakgrund 5',
    da: 'Portrætbaggrund 5',
    no: 'Stående bakgrunn 5',
    fi: 'Pystysuuntainen tausta 5'
  }
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

// PATHS - NOTE: backgrounds use /backgrounds/ subdirectory
const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images/backgrounds', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images/backgrounds', THEME_CONFIG.name);

// Image processing - NO RESIZE for backgrounds
const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);

  // NO RESIZE for backgrounds - just convert to WebP, keeping original dimensions
  await image.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

  // Get final dimensions
  const outputMetadata = await sharp(outputPath).metadata();
  return {
    width: outputMetadata.width,
    height: outputMetadata.height,
    size: fs.statSync(outputPath).size
  };
}

async function main() {
  console.log('============================================================');
  console.log('Background Import Script: ' + THEME_CONFIG.displayNames.en);
  console.log('============================================================\n');

  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  // Create destination directory
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log('Created destination directory');
  }

  // Create standalone directory
  if (!fs.existsSync(STANDALONE_DIR)) {
    fs.mkdirSync(STANDALONE_DIR, { recursive: true });
  }

  // Step 1: Create or get theme
  console.log('\n--- Step 1: Creating/Updating Theme ---');
  let theme = await prisma.imageTheme.findFirst({
    where: {
      name: THEME_CONFIG.name,
      type: THEME_CONFIG.type
    }
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

  // Step 2: Process images
  console.log('\n--- Step 2: Processing Images ---');
  const files = fs.readdirSync(SOURCE_DIR).filter(f =>
    /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f)
  );
  console.log(`Found ${files.length} image files\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const lookupKey = baseName.toLowerCase().trim();

    console.log(`Processing: ${file}`);

    // Get translations
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

      // Process image (no resize, just convert to WebP)
      const { width, height, size } = await processImage(inputPath, outputPath);

      // Copy to standalone
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));

      console.log(`  Saved: ${newFilename} (${width}x${height}) - Original aspect ratio preserved`);

      // Check if already exists in database
      const existing = await prisma.imageLibraryItem.findFirst({
        where: {
          themeId: theme.id,
          translations: {
            path: ['en'],
            equals: translations.en
          }
        }
      });

      if (existing) {
        console.log(`  Already in database, skipping`);
        skipCount++;
        continue;
      }

      // Get max sort order for this theme
      const maxSort = await prisma.imageLibraryItem.aggregate({
        where: { themeId: theme.id },
        _max: { sortOrder: true }
      });

      // Create database record - NOTE: filePath includes /backgrounds/
      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/backgrounds/${THEME_CONFIG.name}/${newFilename}`,
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

  // Sync to standalone
  console.log('\n--- Syncing to standalone build ---');
  const destFiles = fs.readdirSync(DEST_DIR);
  for (const file of destFiles) {
    const src = path.join(DEST_DIR, file);
    const dest = path.join(STANDALONE_DIR, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log(`Copied ${destFiles.length} files to standalone`);

  console.log('\n============================================================');
  console.log('BACKGROUND IMPORT COMPLETE');
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
