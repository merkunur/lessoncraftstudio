const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'easter_bw_2',
  type: 'images',
  sourceFolderName: 'Easter bw 2',
  displayNames: {
    en: 'Easter BW 2',
    de: 'Ostern SW 2',
    fr: 'Pâques NB 2',
    es: 'Pascua BN 2',
    it: 'Pasqua BN 2',
    pt: 'Páscoa PB 2',
    nl: 'Pasen ZW 2',
    sv: 'Påsk SV 2',
    da: 'Påske SH 2',
    no: 'Påske SH 2',
    fi: 'Pääsiäinen MV 2'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'angel': {
    en: 'Angel',
    de: 'Engel',
    fr: 'Ange',
    es: 'Ángel',
    it: 'Angelo',
    pt: 'Anjo',
    nl: 'Engel',
    sv: 'Ängel',
    da: 'Engel',
    no: 'Engel',
    fi: 'Enkeli'
  },
  'balloon': {
    en: 'Balloon',
    de: 'Luftballon',
    fr: 'Ballon',
    es: 'Globo',
    it: 'Palloncino',
    pt: 'Balão',
    nl: 'Ballon',
    sv: 'Ballong',
    da: 'Ballon',
    no: 'Ballong',
    fi: 'Ilmapallo'
  },
  'basket': {
    en: 'Basket',
    de: 'Korb',
    fr: 'Panier',
    es: 'Canasta',
    it: 'Cestino',
    pt: 'Cesta',
    nl: 'Mand',
    sv: 'Korg',
    da: 'Kurv',
    no: 'Kurv',
    fi: 'Kori'
  },
  'bell': {
    en: 'Bell',
    de: 'Glocke',
    fr: 'Cloche',
    es: 'Campana',
    it: 'Campana',
    pt: 'Sino',
    nl: 'Bel',
    sv: 'Klocka',
    da: 'Klokke',
    no: 'Klokke',
    fi: 'Kello'
  },
  'bunny': {
    en: 'Bunny',
    de: 'Häschen',
    fr: 'Lapin',
    es: 'Conejito',
    it: 'Coniglietto',
    pt: 'Coelhinho',
    nl: 'Konijntje',
    sv: 'Kanin',
    da: 'Kanin',
    no: 'Kanin',
    fi: 'Pupu'
  },
  'cake': {
    en: 'Cake',
    de: 'Kuchen',
    fr: 'Gâteau',
    es: 'Pastel',
    it: 'Torta',
    pt: 'Bolo',
    nl: 'Taart',
    sv: 'Tårta',
    da: 'Kage',
    no: 'Kake',
    fi: 'Kakku'
  },
  'candle': {
    en: 'Candle',
    de: 'Kerze',
    fr: 'Bougie',
    es: 'Vela',
    it: 'Candela',
    pt: 'Vela',
    nl: 'Kaars',
    sv: 'Ljus',
    da: 'Stearinlys',
    no: 'Stearinlys',
    fi: 'Kynttilä'
  },
  'chick': {
    en: 'Chick',
    de: 'Küken',
    fr: 'Poussin',
    es: 'Pollito',
    it: 'Pulcino',
    pt: 'Pintinho',
    nl: 'Kuiken',
    sv: 'Kyckling',
    da: 'Kylling',
    no: 'Kylling',
    fi: 'Tipu'
  },
  'chicken': {
    en: 'Chicken',
    de: 'Huhn',
    fr: 'Poulet',
    es: 'Pollo',
    it: 'Pollo',
    pt: 'Galinha',
    nl: 'Kip',
    sv: 'Höna',
    da: 'Høne',
    no: 'Høne',
    fi: 'Kana'
  },
  'chicken 2': {
    en: 'Chicken 2',
    de: 'Huhn 2',
    fr: 'Poulet 2',
    es: 'Pollo 2',
    it: 'Pollo 2',
    pt: 'Galinha 2',
    nl: 'Kip 2',
    sv: 'Höna 2',
    da: 'Høne 2',
    no: 'Høne 2',
    fi: 'Kana 2'
  },
  'church': {
    en: 'Church',
    de: 'Kirche',
    fr: 'Église',
    es: 'Iglesia',
    it: 'Chiesa',
    pt: 'Igreja',
    nl: 'Kerk',
    sv: 'Kyrka',
    da: 'Kirke',
    no: 'Kirke',
    fi: 'Kirkko'
  },
  'cookies': {
    en: 'Cookies',
    de: 'Kekse',
    fr: 'Biscuits',
    es: 'Galletas',
    it: 'Biscotti',
    pt: 'Biscoitos',
    nl: 'Koekjes',
    sv: 'Kakor',
    da: 'Småkager',
    no: 'Kjeks',
    fi: 'Keksit'
  },
  'dove': {
    en: 'Dove',
    de: 'Taube',
    fr: 'Colombe',
    es: 'Paloma',
    it: 'Colomba',
    pt: 'Pomba',
    nl: 'Duif',
    sv: 'Duva',
    da: 'Due',
    no: 'Due',
    fi: 'Kyyhky'
  },
  'egg': {
    en: 'Egg',
    de: 'Ei',
    fr: 'Œuf',
    es: 'Huevo',
    it: 'Uovo',
    pt: 'Ovo',
    nl: 'Ei',
    sv: 'Ägg',
    da: 'Æg',
    no: 'Egg',
    fi: 'Muna'
  },
  'gift': {
    en: 'Gift',
    de: 'Geschenk',
    fr: 'Cadeau',
    es: 'Regalo',
    it: 'Regalo',
    pt: 'Presente',
    nl: 'Cadeau',
    sv: 'Present',
    da: 'Gave',
    no: 'Gave',
    fi: 'Lahja'
  },
  'lily': {
    en: 'Lily',
    de: 'Lilie',
    fr: 'Lys',
    es: 'Lirio',
    it: 'Giglio',
    pt: 'Lírio',
    nl: 'Lelie',
    sv: 'Lilja',
    da: 'Lilje',
    no: 'Lilje',
    fi: 'Lilja'
  },
  'sheep': {
    en: 'Sheep',
    de: 'Schaf',
    fr: 'Mouton',
    es: 'Oveja',
    it: 'Pecora',
    pt: 'Ovelha',
    nl: 'Schaap',
    sv: 'Får',
    da: 'Får',
    no: 'Sau',
    fi: 'Lammas'
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
  console.log('Image Import Script: Easter BW 2');
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
