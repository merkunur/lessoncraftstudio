const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'faces_bw',
  type: 'images',
  sourceFolderName: 'faces bw',
  displayNames: {
    en: 'Faces BW',
    de: 'Gesichter SW',
    fr: 'Visages NB',
    es: 'Caras BN',
    it: 'Volti BN',
    pt: 'Rostos PB',
    nl: 'Gezichten ZW',
    sv: 'Ansikten SV',
    da: 'Ansigter SH',
    no: 'Ansikter SH',
    fi: 'Kasvot MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'alligator': {
    en: 'Alligator',
    de: 'Alligator',
    fr: 'Alligator',
    es: 'Caimán',
    it: 'Alligatore',
    pt: 'Jacaré',
    nl: 'Alligator',
    sv: 'Alligator',
    da: 'Alligator',
    no: 'Alligator',
    fi: 'Alligaattori'
  },
  'bear': {
    en: 'Bear',
    de: 'Bär',
    fr: 'Ours',
    es: 'Oso',
    it: 'Orso',
    pt: 'Urso',
    nl: 'Beer',
    sv: 'Björn',
    da: 'Bjørn',
    no: 'Bjørn',
    fi: 'Karhu'
  },
  'boy': {
    en: 'Boy',
    de: 'Junge',
    fr: 'Garçon',
    es: 'Niño',
    it: 'Ragazzo',
    pt: 'Menino',
    nl: 'Jongen',
    sv: 'Pojke',
    da: 'Dreng',
    no: 'Gutt',
    fi: 'Poika'
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
  'elephant': {
    en: 'Elephant',
    de: 'Elefant',
    fr: 'Éléphant',
    es: 'Elefante',
    it: 'Elefante',
    pt: 'Elefante',
    nl: 'Olifant',
    sv: 'Elefant',
    da: 'Elefant',
    no: 'Elefant',
    fi: 'Norsu'
  },
  'fox': {
    en: 'Fox',
    de: 'Fuchs',
    fr: 'Renard',
    es: 'Zorro',
    it: 'Volpe',
    pt: 'Raposa',
    nl: 'Vos',
    sv: 'Räv',
    da: 'Ræv',
    no: 'Rev',
    fi: 'Kettu'
  },
  'giraffe': {
    en: 'Giraffe',
    de: 'Giraffe',
    fr: 'Girafe',
    es: 'Jirafa',
    it: 'Giraffa',
    pt: 'Girafa',
    nl: 'Giraffe',
    sv: 'Giraff',
    da: 'Giraf',
    no: 'Sjiraff',
    fi: 'Kirahvi'
  },
  'girl': {
    en: 'Girl',
    de: 'Mädchen',
    fr: 'Fille',
    es: 'Niña',
    it: 'Ragazza',
    pt: 'Menina',
    nl: 'Meisje',
    sv: 'Flicka',
    da: 'Pige',
    no: 'Jente',
    fi: 'Tyttö'
  },
  'hippopotamus': {
    en: 'Hippopotamus',
    de: 'Nilpferd',
    fr: 'Hippopotame',
    es: 'Hipopótamo',
    it: 'Ippopotamo',
    pt: 'Hipopótamo',
    nl: 'Nijlpaard',
    sv: 'Flodhäst',
    da: 'Flodhest',
    no: 'Flodhest',
    fi: 'Virtahepo'
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
  'koala': {
    en: 'Koala',
    de: 'Koala',
    fr: 'Koala',
    es: 'Koala',
    it: 'Koala',
    pt: 'Coala',
    nl: 'Koala',
    sv: 'Koala',
    da: 'Koala',
    no: 'Koala',
    fi: 'Koala'
  },
  'lion': {
    en: 'Lion',
    de: 'Löwe',
    fr: 'Lion',
    es: 'León',
    it: 'Leone',
    pt: 'Leão',
    nl: 'Leeuw',
    sv: 'Lejon',
    da: 'Løve',
    no: 'Løve',
    fi: 'Leijona'
  },
  'monkey': {
    en: 'Monkey',
    de: 'Affe',
    fr: 'Singe',
    es: 'Mono',
    it: 'Scimmia',
    pt: 'Macaco',
    nl: 'Aap',
    sv: 'Apa',
    da: 'Abe',
    no: 'Ape',
    fi: 'Apina'
  },
  'mouse': {
    en: 'Mouse',
    de: 'Maus',
    fr: 'Souris',
    es: 'Ratón',
    it: 'Topo',
    pt: 'Rato',
    nl: 'Muis',
    sv: 'Mus',
    da: 'Mus',
    no: 'Mus',
    fi: 'Hiiri'
  },
  'panda 2': {
    en: 'Panda 2',
    de: 'Panda 2',
    fr: 'Panda 2',
    es: 'Panda 2',
    it: 'Panda 2',
    pt: 'Panda 2',
    nl: 'Panda 2',
    sv: 'Panda 2',
    da: 'Panda 2',
    no: 'Panda 2',
    fi: 'Panda 2'
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
  'rhino': {
    en: 'Rhino',
    de: 'Nashorn',
    fr: 'Rhinocéros',
    es: 'Rinoceronte',
    it: 'Rinoceronte',
    pt: 'Rinoceronte',
    nl: 'Neushoorn',
    sv: 'Noshörning',
    da: 'Næsehorn',
    no: 'Neshorn',
    fi: 'Sarvikuono'
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
  'tiger': {
    en: 'Tiger',
    de: 'Tiger',
    fr: 'Tigre',
    es: 'Tigre',
    it: 'Tigre',
    pt: 'Tigre',
    nl: 'Tijger',
    sv: 'Tiger',
    da: 'Tiger',
    no: 'Tiger',
    fi: 'Tiikeri'
  },
  'walrus': {
    en: 'Walrus',
    de: 'Walross',
    fr: 'Morse',
    es: 'Morsa',
    it: 'Tricheco',
    pt: 'Morsa',
    nl: 'Walrus',
    sv: 'Valross',
    da: 'Hvalros',
    no: 'Hvalross',
    fi: 'Mursu'
  },
  'wolf': {
    en: 'Wolf',
    de: 'Wolf',
    fr: 'Loup',
    es: 'Lobo',
    it: 'Lupo',
    pt: 'Lobo',
    nl: 'Wolf',
    sv: 'Varg',
    da: 'Ulv',
    no: 'Ulv',
    fi: 'Susi'
  },
  'zebra': {
    en: 'Zebra',
    de: 'Zebra',
    fr: 'Zèbre',
    es: 'Cebra',
    it: 'Zebra',
    pt: 'Zebra',
    nl: 'Zebra',
    sv: 'Zebra',
    da: 'Zebra',
    no: 'Sebra',
    fi: 'Seepra'
  },
  'zebra 2': {
    en: 'Zebra 2',
    de: 'Zebra 2',
    fr: 'Zèbre 2',
    es: 'Cebra 2',
    it: 'Zebra 2',
    pt: 'Zebra 2',
    nl: 'Zebra 2',
    sv: 'Zebra 2',
    da: 'Zebra 2',
    no: 'Sebra 2',
    fi: 'Seepra 2'
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
  console.log('Image Import Script: Faces BW');
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
