const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'easter_bw',
  type: 'images',
  sourceFolderName: 'Easter bw',
  displayNames: {
    en: 'Easter BW',
    de: 'Ostern SW',
    fr: 'Pâques NB',
    es: 'Pascua BN',
    it: 'Pasqua BN',
    pt: 'Páscoa PB',
    nl: 'Pasen ZW',
    sv: 'Påsk SV',
    da: 'Påske SH',
    no: 'Påske SH',
    fi: 'Pääsiäinen MV'
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
  'angel ': {
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
  'bible': {
    en: 'Bible',
    de: 'Bibel',
    fr: 'Bible',
    es: 'Biblia',
    it: 'Bibbia',
    pt: 'Bíblia',
    nl: 'Bijbel',
    sv: 'Bibel',
    da: 'Bibel',
    no: 'Bibel',
    fi: 'Raamattu'
  },
  'bird': {
    en: 'Bird',
    de: 'Vogel',
    fr: 'Oiseau',
    es: 'Pájaro',
    it: 'Uccello',
    pt: 'Pássaro',
    nl: 'Vogel',
    sv: 'Fågel',
    da: 'Fugl',
    no: 'Fugl',
    fi: 'Lintu'
  },
  'branch': {
    en: 'Branch',
    de: 'Zweig',
    fr: 'Branche',
    es: 'Rama',
    it: 'Ramo',
    pt: 'Galho',
    nl: 'Tak',
    sv: 'Gren',
    da: 'Gren',
    no: 'Gren',
    fi: 'Oksa'
  },
  'bread': {
    en: 'Bread',
    de: 'Brot',
    fr: 'Pain',
    es: 'Pan',
    it: 'Pane',
    pt: 'Pão',
    nl: 'Brood',
    sv: 'Bröd',
    da: 'Brød',
    no: 'Brød',
    fi: 'Leipä'
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
  'butterfly': {
    en: 'Butterfly',
    de: 'Schmetterling',
    fr: 'Papillon',
    es: 'Mariposa',
    it: 'Farfalla',
    pt: 'Borboleta',
    nl: 'Vlinder',
    sv: 'Fjäril',
    da: 'Sommerfugl',
    no: 'Sommerfugl',
    fi: 'Perhonen'
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
  'candy': {
    en: 'Candy',
    de: 'Süßigkeit',
    fr: 'Bonbon',
    es: 'Dulce',
    it: 'Caramella',
    pt: 'Doce',
    nl: 'Snoep',
    sv: 'Godis',
    da: 'Slik',
    no: 'Godteri',
    fi: 'Karkki'
  },
  'carrot': {
    en: 'Carrot',
    de: 'Karotte',
    fr: 'Carotte',
    es: 'Zanahoria',
    it: 'Carota',
    pt: 'Cenoura',
    nl: 'Wortel',
    sv: 'Morot',
    da: 'Gulerod',
    no: 'Gulrot',
    fi: 'Porkkana'
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
  'cookie': {
    en: 'Cookie',
    de: 'Keks',
    fr: 'Biscuit',
    es: 'Galleta',
    it: 'Biscotto',
    pt: 'Biscoito',
    nl: 'Koekje',
    sv: 'Kaka',
    da: 'Småkage',
    no: 'Kjeks',
    fi: 'Keksi'
  },
  'cross': {
    en: 'Cross',
    de: 'Kreuz',
    fr: 'Croix',
    es: 'Cruz',
    it: 'Croce',
    pt: 'Cruz',
    nl: 'Kruis',
    sv: 'Kors',
    da: 'Kors',
    no: 'Kors',
    fi: 'Risti'
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
  'easter': {
    en: 'Easter',
    de: 'Ostern',
    fr: 'Pâques',
    es: 'Pascua',
    it: 'Pasqua',
    pt: 'Páscoa',
    nl: 'Pasen',
    sv: 'Påsk',
    da: 'Påske',
    no: 'Påske',
    fi: 'Pääsiäinen'
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
  'lollipop': {
    en: 'Lollipop',
    de: 'Lutscher',
    fr: 'Sucette',
    es: 'Paleta',
    it: 'Lecca-lecca',
    pt: 'Pirulito',
    nl: 'Lolly',
    sv: 'Klubba',
    da: 'Slikkepind',
    no: 'Kjærlighet på pinne',
    fi: 'Tikkari'
  },
  'mushroom': {
    en: 'Mushroom',
    de: 'Pilz',
    fr: 'Champignon',
    es: 'Hongo',
    it: 'Fungo',
    pt: 'Cogumelo',
    nl: 'Paddenstoel',
    sv: 'Svamp',
    da: 'Svamp',
    no: 'Sopp',
    fi: 'Sieni'
  },
  'rabbit': {
    en: 'Rabbit',
    de: 'Kaninchen',
    fr: 'Lapin',
    es: 'Conejo',
    it: 'Coniglio',
    pt: 'Coelho',
    nl: 'Konijn',
    sv: 'Kanin',
    da: 'Kanin',
    no: 'Kanin',
    fi: 'Kani'
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
  console.log('Image Import Script: Easter BW');
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

    // Get translations (try with and without trailing spaces)
    let translations = IMAGE_TRANSLATIONS[lookupKey];
    if (!translations) {
      translations = IMAGE_TRANSLATIONS[lookupKey.trim()];
    }

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
