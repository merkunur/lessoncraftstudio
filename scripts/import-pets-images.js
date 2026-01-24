const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'pets',
  type: 'images',
  sourceFolderName: 'pets',
  displayNames: {
    en: 'Pets',
    de: 'Haustiere',
    fr: 'Animaux de compagnie',
    es: 'Mascotas',
    it: 'Animali domestici',
    pt: 'Animais de estimação',
    nl: 'Huisdieren',
    sv: 'Husdjur',
    da: 'Kæledyr',
    no: 'Kjæledyr',
    fi: 'Lemmikit'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'cat': {
    en: 'Cat',
    de: 'Katze',
    fr: 'Chat',
    es: 'Gato',
    it: 'Gatto',
    pt: 'Gato',
    nl: 'Kat',
    sv: 'Katt',
    da: 'Kat',
    no: 'Katt',
    fi: 'Kissa'
  },
  'chinchilla': {
    en: 'Chinchilla',
    de: 'Chinchilla',
    fr: 'Chinchilla',
    es: 'Chinchilla',
    it: 'Cincillà',
    pt: 'Chinchila',
    nl: 'Chinchilla',
    sv: 'Chinchilla',
    da: 'Chinchilla',
    no: 'Chinchilla',
    fi: 'Chinchilla'
  },
  'cockatiel': {
    en: 'Cockatiel',
    de: 'Nymphensittich',
    fr: 'Calopsitte',
    es: 'Cacatúa ninfa',
    it: 'Calopsitta',
    pt: 'Calopsita',
    nl: 'Valkparkiet',
    sv: 'Nymfparakit',
    da: 'Nymfeparakit',
    no: 'Nymfeparakitt',
    fi: 'Neitokakadu'
  },
  'dog': {
    en: 'Dog',
    de: 'Hund',
    fr: 'Chien',
    es: 'Perro',
    it: 'Cane',
    pt: 'Cachorro',
    nl: 'Hond',
    sv: 'Hund',
    da: 'Hund',
    no: 'Hund',
    fi: 'Koira'
  },
  'ferret': {
    en: 'Ferret',
    de: 'Frettchen',
    fr: 'Furet',
    es: 'Hurón',
    it: 'Furetto',
    pt: 'Furão',
    nl: 'Fret',
    sv: 'Iller',
    da: 'Fritte',
    no: 'Ilder',
    fi: 'Fretti'
  },
  'finch': {
    en: 'Finch',
    de: 'Fink',
    fr: 'Pinson',
    es: 'Pinzón',
    it: 'Fringuello',
    pt: 'Tentilhão',
    nl: 'Vink',
    sv: 'Fink',
    da: 'Finke',
    no: 'Finke',
    fi: 'Peippo'
  },
  'fish': {
    en: 'Fish',
    de: 'Fisch',
    fr: 'Poisson',
    es: 'Pez',
    it: 'Pesce',
    pt: 'Peixe',
    nl: 'Vis',
    sv: 'Fisk',
    da: 'Fisk',
    no: 'Fisk',
    fi: 'Kala'
  },
  'frog': {
    en: 'Frog',
    de: 'Frosch',
    fr: 'Grenouille',
    es: 'Rana',
    it: 'Rana',
    pt: 'Sapo',
    nl: 'Kikker',
    sv: 'Groda',
    da: 'Frø',
    no: 'Frosk',
    fi: 'Sammakko'
  },
  'gecko': {
    en: 'Gecko',
    de: 'Gecko',
    fr: 'Gecko',
    es: 'Gecko',
    it: 'Geco',
    pt: 'Lagartixa',
    nl: 'Gekko',
    sv: 'Gecko',
    da: 'Gekko',
    no: 'Gekko',
    fi: 'Gekko'
  },
  'gerbil': {
    en: 'Gerbil',
    de: 'Rennmaus',
    fr: 'Gerbille',
    es: 'Jerbo',
    it: 'Gerbillo',
    pt: 'Gerbil',
    nl: 'Gerbil',
    sv: 'Ökenråtta',
    da: 'Ørkenrotte',
    no: 'Ørkenrotte',
    fi: 'Gerbiili'
  },
  'goldfish': {
    en: 'Goldfish',
    de: 'Goldfisch',
    fr: 'Poisson rouge',
    es: 'Pez dorado',
    it: 'Pesce rosso',
    pt: 'Peixe dourado',
    nl: 'Goudvis',
    sv: 'Guldfisk',
    da: 'Guldfisk',
    no: 'Gullfisk',
    fi: 'Kultakala'
  },
  'guinea pig': {
    en: 'Guinea Pig',
    de: 'Meerschweinchen',
    fr: 'Cochon d\'Inde',
    es: 'Cuyo',
    it: 'Cavia',
    pt: 'Porquinho-da-índia',
    nl: 'Cavia',
    sv: 'Marsvin',
    da: 'Marsvin',
    no: 'Marsvin',
    fi: 'Marsu'
  },
  'hamster': {
    en: 'Hamster',
    de: 'Hamster',
    fr: 'Hamster',
    es: 'Hámster',
    it: 'Criceto',
    pt: 'Hamster',
    nl: 'Hamster',
    sv: 'Hamster',
    da: 'Hamster',
    no: 'Hamster',
    fi: 'Hamsteri'
  },
  'iguana': {
    en: 'Iguana',
    de: 'Leguan',
    fr: 'Iguane',
    es: 'Iguana',
    it: 'Iguana',
    pt: 'Iguana',
    nl: 'Leguaan',
    sv: 'Leguan',
    da: 'Leguan',
    no: 'Leguan',
    fi: 'Iguaani'
  },
  'lizard': {
    en: 'Lizard',
    de: 'Eidechse',
    fr: 'Lézard',
    es: 'Lagartija',
    it: 'Lucertola',
    pt: 'Lagarto',
    nl: 'Hagedis',
    sv: 'Ödla',
    da: 'Firben',
    no: 'Øgle',
    fi: 'Lisko'
  },
  'mouse': {
    en: 'Mouse',
    de: 'Maus',
    fr: 'Souris',
    es: 'Ratón',
    it: 'Topo',
    pt: 'Camundongo',
    nl: 'Muis',
    sv: 'Mus',
    da: 'Mus',
    no: 'Mus',
    fi: 'Hiiri'
  },
  'parrot': {
    en: 'Parrot',
    de: 'Papagei',
    fr: 'Perroquet',
    es: 'Loro',
    it: 'Pappagallo',
    pt: 'Papagaio',
    nl: 'Papegaai',
    sv: 'Papegoja',
    da: 'Papegøje',
    no: 'Papegøye',
    fi: 'Papukaija'
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
  'tortoise': {
    en: 'Tortoise',
    de: 'Schildkröte',
    fr: 'Tortue terrestre',
    es: 'Tortuga de tierra',
    it: 'Tartaruga',
    pt: 'Tartaruga terrestre',
    nl: 'Landschildpad',
    sv: 'Landsköldpadda',
    da: 'Landskildpadde',
    no: 'Landskilpadde',
    fi: 'Kilpikonna'
  },
  'turtle': {
    en: 'Turtle',
    de: 'Wasserschildkröte',
    fr: 'Tortue',
    es: 'Tortuga',
    it: 'Tartaruga d\'acqua',
    pt: 'Tartaruga',
    nl: 'Waterschildpad',
    sv: 'Sköldpadda',
    da: 'Skildpadde',
    no: 'Skilpadde',
    fi: 'Kilpikonna'
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
  console.log('Image Import Script: Pets');
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
