const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'easter',
  type: 'images',
  sourceFolderName: 'easter',
  displayNames: {
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
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
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
  'chocolate': {
    en: 'Chocolate',
    de: 'Schokolade',
    fr: 'Chocolat',
    es: 'Chocolate',
    it: 'Cioccolato',
    pt: 'Chocolate',
    nl: 'Chocolade',
    sv: 'Choklad',
    da: 'Chokolade',
    no: 'Sjokolade',
    fi: 'Suklaa'
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
  'daffodil': {
    en: 'Daffodil',
    de: 'Narzisse',
    fr: 'Jonquille',
    es: 'Narciso',
    it: 'Narciso',
    pt: 'Narciso',
    nl: 'Narcis',
    sv: 'Påsklilja',
    da: 'Påskelilje',
    no: 'Påskelilje',
    fi: 'Narsissi'
  },
  'duckling': {
    en: 'Duckling',
    de: 'Entchen',
    fr: 'Caneton',
    es: 'Patito',
    it: 'Anatroccolo',
    pt: 'Patinho',
    nl: 'Eendje',
    sv: 'Ankunge',
    da: 'Ælling',
    no: 'Andunge',
    fi: 'Ankanpoikanen'
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
  'feather': {
    en: 'Feather',
    de: 'Feder',
    fr: 'Plume',
    es: 'Pluma',
    it: 'Piuma',
    pt: 'Pena',
    nl: 'Veer',
    sv: 'Fjäder',
    da: 'Fjer',
    no: 'Fjær',
    fi: 'Höyhen'
  },
  'flower': {
    en: 'Flower',
    de: 'Blume',
    fr: 'Fleur',
    es: 'Flor',
    it: 'Fiore',
    pt: 'Flor',
    nl: 'Bloem',
    sv: 'Blomma',
    da: 'Blomst',
    no: 'Blomst',
    fi: 'Kukka'
  },
  'jelly beans': {
    en: 'Jelly Beans',
    de: 'Geleebohnen',
    fr: 'Dragées',
    es: 'Gomitas',
    it: 'Caramelle Gommose',
    pt: 'Jujubas',
    nl: 'Jellybeans',
    sv: 'Gelébönor',
    da: 'Gelébønner',
    no: 'Gelébønner',
    fi: 'Hyytelökarkit'
  },
  'lamb': {
    en: 'Lamb',
    de: 'Lamm',
    fr: 'Agneau',
    es: 'Cordero',
    it: 'Agnello',
    pt: 'Cordeiro',
    nl: 'Lam',
    sv: 'Lamm',
    da: 'Lam',
    no: 'Lam',
    fi: 'Karitsa'
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
  'rainbow': {
    en: 'Rainbow',
    de: 'Regenbogen',
    fr: 'Arc-en-ciel',
    es: 'Arcoíris',
    it: 'Arcobaleno',
    pt: 'Arco-íris',
    nl: 'Regenboog',
    sv: 'Regnbåge',
    da: 'Regnbue',
    no: 'Regnbue',
    fi: 'Sateenkaari'
  },
  'ribbon': {
    en: 'Ribbon',
    de: 'Schleife',
    fr: 'Ruban',
    es: 'Listón',
    it: 'Nastro',
    pt: 'Fita',
    nl: 'Lint',
    sv: 'Band',
    da: 'Bånd',
    no: 'Bånd',
    fi: 'Nauha'
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
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
  console.log('Image Import Script: Easter');
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
