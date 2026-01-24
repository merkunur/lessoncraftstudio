const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'farm_animals',
  type: 'images',
  sourceFolderName: 'farm animals',
  displayNames: {
    en: 'Farm Animals',
    de: 'Bauernhoftiere',
    fr: 'Animaux de la ferme',
    es: 'Animales de granja',
    it: 'Animali della fattoria',
    pt: 'Animais da fazenda',
    nl: 'Boerderijdieren',
    sv: 'Bondgårdsdjur',
    da: 'Bondegårdsdyr',
    no: 'Gårdsdyr',
    fi: 'Maatilan eläimet'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'bee': {
    en: 'Bee',
    de: 'Biene',
    fr: 'Abeille',
    es: 'Abeja',
    it: 'Ape',
    pt: 'Abelha',
    nl: 'Bij',
    sv: 'Bi',
    da: 'Bi',
    no: 'Bie',
    fi: 'Mehiläinen'
  },
  'bull': {
    en: 'Bull',
    de: 'Stier',
    fr: 'Taureau',
    es: 'Toro',
    it: 'Toro',
    pt: 'Touro',
    nl: 'Stier',
    sv: 'Tjur',
    da: 'Tyr',
    no: 'Okse',
    fi: 'Härkä'
  },
  'calf': {
    en: 'Calf',
    de: 'Kalb',
    fr: 'Veau',
    es: 'Becerro',
    it: 'Vitello',
    pt: 'Bezerro',
    nl: 'Kalf',
    sv: 'Kalv',
    da: 'Kalv',
    no: 'Kalv',
    fi: 'Vasikka'
  },
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
  'cat 2': {
    en: 'Cat 2',
    de: 'Katze 2',
    fr: 'Chat 2',
    es: 'Gato 2',
    it: 'Gatto 2',
    pt: 'Gato 2',
    nl: 'Kat 2',
    sv: 'Katt 2',
    da: 'Kat 2',
    no: 'Katt 2',
    fi: 'Kissa 2'
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
  'cow': {
    en: 'Cow',
    de: 'Kuh',
    fr: 'Vache',
    es: 'Vaca',
    it: 'Mucca',
    pt: 'Vaca',
    nl: 'Koe',
    sv: 'Ko',
    da: 'Ko',
    no: 'Ku',
    fi: 'Lehmä'
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
  'donkey': {
    en: 'Donkey',
    de: 'Esel',
    fr: 'Âne',
    es: 'Burro',
    it: 'Asino',
    pt: 'Burro',
    nl: 'Ezel',
    sv: 'Åsna',
    da: 'Æsel',
    no: 'Esel',
    fi: 'Aasi'
  },
  'duck': {
    en: 'Duck',
    de: 'Ente',
    fr: 'Canard',
    es: 'Pato',
    it: 'Anatra',
    pt: 'Pato',
    nl: 'Eend',
    sv: 'Anka',
    da: 'And',
    no: 'And',
    fi: 'Ankka'
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
  'foal': {
    en: 'Foal',
    de: 'Fohlen',
    fr: 'Poulain',
    es: 'Potro',
    it: 'Puledro',
    pt: 'Potro',
    nl: 'Veulen',
    sv: 'Föl',
    da: 'Føl',
    no: 'Føll',
    fi: 'Varsa'
  },
  'goat': {
    en: 'Goat',
    de: 'Ziege',
    fr: 'Chèvre',
    es: 'Cabra',
    it: 'Capra',
    pt: 'Cabra',
    nl: 'Geit',
    sv: 'Get',
    da: 'Ged',
    no: 'Geit',
    fi: 'Vuohi'
  },
  'goose': {
    en: 'Goose',
    de: 'Gans',
    fr: 'Oie',
    es: 'Ganso',
    it: 'Oca',
    pt: 'Ganso',
    nl: 'Gans',
    sv: 'Gås',
    da: 'Gås',
    no: 'Gås',
    fi: 'Hanhi'
  },
  'hen': {
    en: 'Hen',
    de: 'Henne',
    fr: 'Poule',
    es: 'Gallina',
    it: 'Gallina',
    pt: 'Galinha',
    nl: 'Hen',
    sv: 'Höna',
    da: 'Høne',
    no: 'Høne',
    fi: 'Kana'
  },
  'horse': {
    en: 'Horse',
    de: 'Pferd',
    fr: 'Cheval',
    es: 'Caballo',
    it: 'Cavallo',
    pt: 'Cavalo',
    nl: 'Paard',
    sv: 'Häst',
    da: 'Hest',
    no: 'Hest',
    fi: 'Hevonen'
  },
  'horse 2': {
    en: 'Horse 2',
    de: 'Pferd 2',
    fr: 'Cheval 2',
    es: 'Caballo 2',
    it: 'Cavallo 2',
    pt: 'Cavalo 2',
    nl: 'Paard 2',
    sv: 'Häst 2',
    da: 'Hest 2',
    no: 'Hest 2',
    fi: 'Hevonen 2'
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
  'llama': {
    en: 'Llama',
    de: 'Lama',
    fr: 'Lama',
    es: 'Llama',
    it: 'Lama',
    pt: 'Lhama',
    nl: 'Lama',
    sv: 'Lama',
    da: 'Lama',
    no: 'Lama',
    fi: 'Laama'
  },
  'owl': {
    en: 'Owl',
    de: 'Eule',
    fr: 'Hibou',
    es: 'Búho',
    it: 'Gufo',
    pt: 'Coruja',
    nl: 'Uil',
    sv: 'Uggla',
    da: 'Ugle',
    no: 'Ugle',
    fi: 'Pöllö'
  },
  'ox': {
    en: 'Ox',
    de: 'Ochse',
    fr: 'Bœuf',
    es: 'Buey',
    it: 'Bue',
    pt: 'Boi',
    nl: 'Os',
    sv: 'Oxe',
    da: 'Okse',
    no: 'Okse',
    fi: 'Härkä'
  },
  'pig': {
    en: 'Pig',
    de: 'Schwein',
    fr: 'Cochon',
    es: 'Cerdo',
    it: 'Maiale',
    pt: 'Porco',
    nl: 'Varken',
    sv: 'Gris',
    da: 'Gris',
    no: 'Gris',
    fi: 'Sika'
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
  'rooster': {
    en: 'Rooster',
    de: 'Hahn',
    fr: 'Coq',
    es: 'Gallo',
    it: 'Gallo',
    pt: 'Galo',
    nl: 'Haan',
    sv: 'Tupp',
    da: 'Hane',
    no: 'Hane',
    fi: 'Kukko'
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
  },
  'turkey': {
    en: 'Turkey',
    de: 'Truthahn',
    fr: 'Dinde',
    es: 'Pavo',
    it: 'Tacchino',
    pt: 'Peru',
    nl: 'Kalkoen',
    sv: 'Kalkon',
    da: 'Kalkun',
    no: 'Kalkun',
    fi: 'Kalkkuna'
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
  console.log('Image Import Script: Farm Animals');
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
