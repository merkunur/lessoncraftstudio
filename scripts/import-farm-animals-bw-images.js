const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'farm_animals_bw',
  type: 'images',
  sourceFolderName: 'farm animals bw',
  displayNames: {
    en: 'Farm Animals BW',
    de: 'Bauernhoftiere SW',
    fr: 'Animaux de la ferme NB',
    es: 'Animales de granja BN',
    it: 'Animali della fattoria BN',
    pt: 'Animais da fazenda PB',
    nl: 'Boerderijdieren ZW',
    sv: 'Bondgårdsdjur SV',
    da: 'Bondegårdsdyr SH',
    no: 'Gårdsdyr SH',
    fi: 'Maatilan eläimet MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'alpaca': {
    en: 'Alpaca',
    de: 'Alpaka',
    fr: 'Alpaga',
    es: 'Alpaca',
    it: 'Alpaca',
    pt: 'Alpaca',
    nl: 'Alpaca',
    sv: 'Alpacka',
    da: 'Alpaka',
    no: 'Alpakka',
    fi: 'Alpakka'
  },
  'alpaca 2': {
    en: 'Alpaca 2',
    de: 'Alpaka 2',
    fr: 'Alpaga 2',
    es: 'Alpaca 2',
    it: 'Alpaca 2',
    pt: 'Alpaca 2',
    nl: 'Alpaca 2',
    sv: 'Alpacka 2',
    da: 'Alpaka 2',
    no: 'Alpakka 2',
    fi: 'Alpakka 2'
  },
  'antelope': {
    en: 'Antelope',
    de: 'Antilope',
    fr: 'Antilope',
    es: 'Antílope',
    it: 'Antilope',
    pt: 'Antílope',
    nl: 'Antilope',
    sv: 'Antilop',
    da: 'Antilope',
    no: 'Antilope',
    fi: 'Antilooppi'
  },
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
  'bee 2': {
    en: 'Bee 2',
    de: 'Biene 2',
    fr: 'Abeille 2',
    es: 'Abeja 2',
    it: 'Ape 2',
    pt: 'Abelha 2',
    nl: 'Bij 2',
    sv: 'Bi 2',
    da: 'Bi 2',
    no: 'Bie 2',
    fi: 'Mehiläinen 2'
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
    fi: 'Sonni'
  },
  'camel': {
    en: 'Camel',
    de: 'Kamel',
    fr: 'Chameau',
    es: 'Camello',
    it: 'Cammello',
    pt: 'Camelo',
    nl: 'Kameel',
    sv: 'Kamel',
    da: 'Kamel',
    no: 'Kamel',
    fi: 'Kameli'
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
  'crab': {
    en: 'Crab',
    de: 'Krabbe',
    fr: 'Crabe',
    es: 'Cangrejo',
    it: 'Granchio',
    pt: 'Caranguejo',
    nl: 'Krab',
    sv: 'Krabba',
    da: 'Krabbe',
    no: 'Krabbe',
    fi: 'Rapu'
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
  'donkey 2': {
    en: 'Donkey 2',
    de: 'Esel 2',
    fr: 'Âne 2',
    es: 'Burro 2',
    it: 'Asino 2',
    pt: 'Burro 2',
    nl: 'Ezel 2',
    sv: 'Åsna 2',
    da: 'Æsel 2',
    no: 'Esel 2',
    fi: 'Aasi 2'
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
  'duck 2': {
    en: 'Duck 2',
    de: 'Ente 2',
    fr: 'Canard 2',
    es: 'Pato 2',
    it: 'Anatra 2',
    pt: 'Pato 2',
    nl: 'Eend 2',
    sv: 'Anka 2',
    da: 'And 2',
    no: 'And 2',
    fi: 'Ankka 2'
  },
  'duck 3': {
    en: 'Duck 3',
    de: 'Ente 3',
    fr: 'Canard 3',
    es: 'Pato 3',
    it: 'Anatra 3',
    pt: 'Pato 3',
    nl: 'Eend 3',
    sv: 'Anka 3',
    da: 'And 3',
    no: 'And 3',
    fi: 'Ankka 3'
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
  'pigeon': {
    en: 'Pigeon',
    de: 'Taube',
    fr: 'Pigeon',
    es: 'Paloma',
    it: 'Piccione',
    pt: 'Pombo',
    nl: 'Duif',
    sv: 'Duva',
    da: 'Due',
    no: 'Due',
    fi: 'Kyyhky'
  },
  'pony': {
    en: 'Pony',
    de: 'Pony',
    fr: 'Poney',
    es: 'Poni',
    it: 'Pony',
    pt: 'Pônei',
    nl: 'Pony',
    sv: 'Ponny',
    da: 'Pony',
    no: 'Ponni',
    fi: 'Poni'
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
  'swan': {
    en: 'Swan',
    de: 'Schwan',
    fr: 'Cygne',
    es: 'Cisne',
    it: 'Cigno',
    pt: 'Cisne',
    nl: 'Zwaan',
    sv: 'Svan',
    da: 'Svane',
    no: 'Svane',
    fi: 'Joutsen'
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
  },
  'unicorn': {
    en: 'Unicorn',
    de: 'Einhorn',
    fr: 'Licorne',
    es: 'Unicornio',
    it: 'Unicorno',
    pt: 'Unicórnio',
    nl: 'Eenhoorn',
    sv: 'Enhörning',
    da: 'Enhjørning',
    no: 'Enhjørning',
    fi: 'Yksisarvinen'
  },
  'yak': {
    en: 'Yak',
    de: 'Yak',
    fr: 'Yak',
    es: 'Yak',
    it: 'Yak',
    pt: 'Iaque',
    nl: 'Jak',
    sv: 'Jak',
    da: 'Jak',
    no: 'Jak',
    fi: 'Jakki'
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
  console.log('Image Import Script: Farm Animals BW');
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
