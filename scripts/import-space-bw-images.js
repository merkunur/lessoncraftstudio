const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'space_bw',
  type: 'images',
  sourceFolderName: 'space bw',
  displayNames: {
    en: 'Space BW',
    de: 'Weltraum SW',
    fr: 'Espace NB',
    es: 'Espacio BN',
    it: 'Spazio BN',
    pt: 'Espaço PB',
    nl: 'Ruimte ZW',
    sv: 'Rymden SV',
    da: 'Rummet SH',
    no: 'Verdensrommet SH',
    fi: 'Avaruus MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'earth': {
    en: 'Earth',
    de: 'Erde',
    fr: 'Terre',
    es: 'Tierra',
    it: 'Terra',
    pt: 'Terra',
    nl: 'Aarde',
    sv: 'Jorden',
    da: 'Jorden',
    no: 'Jorden',
    fi: 'Maa'
  },
  'meteor': {
    en: 'Meteor',
    de: 'Meteor',
    fr: 'Météore',
    es: 'Meteoro',
    it: 'Meteora',
    pt: 'Meteoro',
    nl: 'Meteoor',
    sv: 'Meteor',
    da: 'Meteor',
    no: 'Meteor',
    fi: 'Meteori'
  },
  'planet 2': {
    en: 'Planet 2',
    de: 'Planet 2',
    fr: 'Planète 2',
    es: 'Planeta 2',
    it: 'Pianeta 2',
    pt: 'Planeta 2',
    nl: 'Planeet 2',
    sv: 'Planet 2',
    da: 'Planet 2',
    no: 'Planet 2',
    fi: 'Planeetta 2'
  },
  'planet': {
    en: 'Planet',
    de: 'Planet',
    fr: 'Planète',
    es: 'Planeta',
    it: 'Pianeta',
    pt: 'Planeta',
    nl: 'Planeet',
    sv: 'Planet',
    da: 'Planet',
    no: 'Planet',
    fi: 'Planeetta'
  },
  'rocket': {
    en: 'Rocket',
    de: 'Rakete',
    fr: 'Fusée',
    es: 'Cohete',
    it: 'Razzo',
    pt: 'Foguete',
    nl: 'Raket',
    sv: 'Raket',
    da: 'Raket',
    no: 'Rakett',
    fi: 'Raketti'
  },
  'sky': {
    en: 'Sky',
    de: 'Himmel',
    fr: 'Ciel',
    es: 'Cielo',
    it: 'Cielo',
    pt: 'Céu',
    nl: 'Hemel',
    sv: 'Himmel',
    da: 'Himmel',
    no: 'Himmel',
    fi: 'Taivas'
  },
  'telescope': {
    en: 'Telescope',
    de: 'Teleskop',
    fr: 'Télescope',
    es: 'Telescopio',
    it: 'Telescopio',
    pt: 'Telescópio',
    nl: 'Telescoop',
    sv: 'Teleskop',
    da: 'Teleskop',
    no: 'Teleskop',
    fi: 'Teleskooppi'
  },
  'ufo': {
    en: 'UFO',
    de: 'UFO',
    fr: 'OVNI',
    es: 'OVNI',
    it: 'UFO',
    pt: 'OVNI',
    nl: 'UFO',
    sv: 'UFO',
    da: 'UFO',
    no: 'UFO',
    fi: 'UFO'
  }
};

// Paths
const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images', THEME_CONFIG.name);

// Image processing settings (from IMAGE LIBRARY.md)
const MAX_DIMENSION = 800;
const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Resize if needed, maintaining aspect ratio
  let processedImage = image;
  if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
    processedImage = image.resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  // Convert to WebP
  await processedImage.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

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
  console.log('Image Import Script: Space BW');
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
  let theme = await prisma.imageTheme.findUnique({
    where: { name: THEME_CONFIG.name }
  });

  if (!theme) {
    const maxSortOrder = await prisma.imageTheme.aggregate({
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
    const lookupKey = baseName.toLowerCase();

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

      // Process image
      const { width, height, size } = await processImage(inputPath, outputPath);

      // Copy to standalone
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));

      console.log(`  Saved: ${newFilename} (${width}x${height})`);

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

      // Create database record
      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/${THEME_CONFIG.name}/${newFilename}`,
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
  console.log('IMPORT COMPLETE');
  console.log('============================================================');
  console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
  console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
