const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'valentine_bw_2',
  type: 'images',
  sourceFolderName: 'valentine bw 2',
  displayNames: {
    en: 'Valentine BW 2',
    de: 'Valentinstag SW 2',
    fr: 'Saint-Valentin NB 2',
    es: 'San Valentín BN 2',
    it: 'San Valentino BN 2',
    pt: 'Dia dos Namorados PB 2',
    nl: 'Valentijnsdag ZW 2',
    sv: 'Alla hjärtans dag SV 2',
    da: 'Valentinsdag SH 2',
    no: 'Valentinsdag SH 2',
    fi: 'Ystävänpäivä MV 2'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'balloon': {
    en: 'Balloon',
    de: 'Ballon',
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
  'calendar': {
    en: 'Calendar',
    de: 'Kalender',
    fr: 'Calendrier',
    es: 'Calendario',
    it: 'Calendario',
    pt: 'Calendário',
    nl: 'Kalender',
    sv: 'Kalender',
    da: 'Kalender',
    no: 'Kalender',
    fi: 'Kalenteri'
  },
  'diamond': {
    en: 'Diamond',
    de: 'Diamant',
    fr: 'Diamant',
    es: 'Diamante',
    it: 'Diamante',
    pt: 'Diamante',
    nl: 'Diamant',
    sv: 'Diamant',
    da: 'Diamant',
    no: 'Diamant',
    fi: 'Timantti'
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
  'handbag': {
    en: 'Handbag',
    de: 'Handtasche',
    fr: 'Sac à main',
    es: 'Bolso',
    it: 'Borsa',
    pt: 'Bolsa',
    nl: 'Handtas',
    sv: 'Handväska',
    da: 'Håndtaske',
    no: 'Håndveske',
    fi: 'Käsilaukku'
  },
  'key': {
    en: 'Key',
    de: 'Schlüssel',
    fr: 'Clé',
    es: 'Llave',
    it: 'Chiave',
    pt: 'Chave',
    nl: 'Sleutel',
    sv: 'Nyckel',
    da: 'Nøgle',
    no: 'Nøkkel',
    fi: 'Avain'
  },
  'letter': {
    en: 'Love Letter',
    de: 'Liebesbrief',
    fr: 'Lettre d\'amour',
    es: 'Carta de amor',
    it: 'Lettera d\'amore',
    pt: 'Carta de amor',
    nl: 'Liefdesbrief',
    sv: 'Kärleksbrev',
    da: 'Kærlighedsbrev',
    no: 'Kjærlighetsbrev',
    fi: 'Rakkauskirje'
  },
  'perfume': {
    en: 'Perfume',
    de: 'Parfüm',
    fr: 'Parfum',
    es: 'Perfume',
    it: 'Profumo',
    pt: 'Perfume',
    nl: 'Parfum',
    sv: 'Parfym',
    da: 'Parfume',
    no: 'Parfyme',
    fi: 'Hajuvesi'
  },
  'sunglasses': {
    en: 'Sunglasses',
    de: 'Sonnenbrille',
    fr: 'Lunettes de soleil',
    es: 'Lentes de sol',
    it: 'Occhiali da sole',
    pt: 'Óculos de sol',
    nl: 'Zonnebril',
    sv: 'Solglasögon',
    da: 'Solbriller',
    no: 'Solbriller',
    fi: 'Aurinkolasit'
  },
  'tulip': {
    en: 'Tulip',
    de: 'Tulpe',
    fr: 'Tulipe',
    es: 'Tulipán',
    it: 'Tulipano',
    pt: 'Tulipa',
    nl: 'Tulp',
    sv: 'Tulpan',
    da: 'Tulipan',
    no: 'Tulipan',
    fi: 'Tulppaani'
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
  console.log('Image Import Script: Valentine BW 2');
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
