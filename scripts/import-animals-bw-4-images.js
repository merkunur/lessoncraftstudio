/**
 * Import Script: Animals BW 4 Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-animals-bw-4-images.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Detect environment and set paths
const isServer = fs.existsSync('/opt/lessoncraftstudio');
let frontendRoot;

if (isServer) {
  frontendRoot = '/opt/lessoncraftstudio/frontend';
} else {
  frontendRoot = path.resolve(__dirname, '..', 'frontend');
}

process.chdir(frontendRoot);

// Load dependencies from frontend
const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const sharp = require(path.join(frontendRoot, 'node_modules', 'sharp'));

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION
// ============================================================

const THEME_CONFIG = {
  name: 'animals_bw_4',
  type: 'images',
  displayNames: {
    en: 'Animals BW 4',
    de: 'Tiere SW 4',
    fr: 'Animaux NB 4',
    es: 'Animales BN 4',
    it: 'Animali BN 4',
    pt: 'Animais PB 4',
    nl: 'Dieren ZW 4',
    sv: 'Djur SV 4',
    da: 'Dyr SH 4',
    no: 'Dyr SH 4',
    fi: 'Elaimet MV 4'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'beaver.png': {
    en: 'Beaver',
    de: 'Biber',
    fr: 'Castor',
    es: 'Castor',
    it: 'Castoro',
    pt: 'Castor',
    nl: 'Bever',
    sv: 'Baver',
    da: 'Baever',
    no: 'Bever',
    fi: 'Majava'
  },
  'cat.png': {
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
  'cat 2.png': {
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
  'cat 3.png': {
    en: 'Cat 3',
    de: 'Katze 3',
    fr: 'Chat 3',
    es: 'Gato 3',
    it: 'Gatto 3',
    pt: 'Gato 3',
    nl: 'Kat 3',
    sv: 'Katt 3',
    da: 'Kat 3',
    no: 'Katt 3',
    fi: 'Kissa 3'
  },
  'chick.png': {
    en: 'Chick',
    de: 'Kuken',
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
  'chicken.png': {
    en: 'Chicken',
    de: 'Huhn',
    fr: 'Poule',
    es: 'Gallina',
    it: 'Gallina',
    pt: 'Galinha',
    nl: 'Kip',
    sv: 'Hona',
    da: 'Hone',
    no: 'Hone',
    fi: 'Kana'
  },
  'cow.png': {
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
    fi: 'Lehma'
  },
  'crocodile.png': {
    en: 'Crocodile',
    de: 'Krokodil',
    fr: 'Crocodile',
    es: 'Cocodrilo',
    it: 'Coccodrillo',
    pt: 'Crocodilo',
    nl: 'Krokodil',
    sv: 'Krokodil',
    da: 'Krokodille',
    no: 'Krokodille',
    fi: 'Krokotiili'
  },
  'dog.png': {
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
  'donkey.png': {
    en: 'Donkey',
    de: 'Esel',
    fr: 'Ane',
    es: 'Burro',
    it: 'Asino',
    pt: 'Burro',
    nl: 'Ezel',
    sv: 'Asna',
    da: 'Aesel',
    no: 'Esel',
    fi: 'Aasi'
  },
  'duck.png': {
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
  'duck 2.png': {
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
  'duck 3.png': {
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
  'elephant.png': {
    en: 'Elephant',
    de: 'Elefant',
    fr: 'Elephant',
    es: 'Elefante',
    it: 'Elefante',
    pt: 'Elefante',
    nl: 'Olifant',
    sv: 'Elefant',
    da: 'Elefant',
    no: 'Elefant',
    fi: 'Norsu'
  },
  'giraffe.png': {
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
  'goat.png': {
    en: 'Goat',
    de: 'Ziege',
    fr: 'Chevre',
    es: 'Cabra',
    it: 'Capra',
    pt: 'Cabra',
    nl: 'Geit',
    sv: 'Get',
    da: 'Ged',
    no: 'Geit',
    fi: 'Vuohi'
  },
  'goat 2.png': {
    en: 'Goat 2',
    de: 'Ziege 2',
    fr: 'Chevre 2',
    es: 'Cabra 2',
    it: 'Capra 2',
    pt: 'Cabra 2',
    nl: 'Geit 2',
    sv: 'Get 2',
    da: 'Ged 2',
    no: 'Geit 2',
    fi: 'Vuohi 2'
  },
  'hippopotamus.png': {
    en: 'Hippopotamus',
    de: 'Nilpferd',
    fr: 'Hippopotame',
    es: 'Hipopotamo',
    it: 'Ippopotamo',
    pt: 'Hipopotamo',
    nl: 'Nijlpaard',
    sv: 'Flodhast',
    da: 'Flodhest',
    no: 'Flodhest',
    fi: 'Virtahepo'
  },
  'kangaroo.png': {
    en: 'Kangaroo',
    de: 'Kanguru',
    fr: 'Kangourou',
    es: 'Canguro',
    it: 'Canguro',
    pt: 'Canguru',
    nl: 'Kangoeroe',
    sv: 'Kanguru',
    da: 'Kaenguru',
    no: 'Kenguru',
    fi: 'Kenguru'
  },
  'koala.png': {
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
  'llama.png': {
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
  'monkey.png': {
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
  'mouse.png': {
    en: 'Mouse',
    de: 'Maus',
    fr: 'Souris',
    es: 'Raton',
    it: 'Topo',
    pt: 'Rato',
    nl: 'Muis',
    sv: 'Mus',
    da: 'Mus',
    no: 'Mus',
    fi: 'Hiiri'
  },
  'ostrich.png': {
    en: 'Ostrich',
    de: 'Strauss',
    fr: 'Autruche',
    es: 'Avestruz',
    it: 'Struzzo',
    pt: 'Avestruz',
    nl: 'Struisvogel',
    sv: 'Struts',
    da: 'Struds',
    no: 'Struts',
    fi: 'Strutsi'
  },
  'pig.png': {
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
  'pig 2.png': {
    en: 'Pig 2',
    de: 'Schwein 2',
    fr: 'Cochon 2',
    es: 'Cerdo 2',
    it: 'Maiale 2',
    pt: 'Porco 2',
    nl: 'Varken 2',
    sv: 'Gris 2',
    da: 'Gris 2',
    no: 'Gris 2',
    fi: 'Sika 2'
  },
  'pony.png': {
    en: 'Pony',
    de: 'Pony',
    fr: 'Poney',
    es: 'Poni',
    it: 'Pony',
    pt: 'Ponei',
    nl: 'Pony',
    sv: 'Ponny',
    da: 'Pony',
    no: 'Ponni',
    fi: 'Poni'
  },
  'pony 2.png': {
    en: 'Pony 2',
    de: 'Pony 2',
    fr: 'Poney 2',
    es: 'Poni 2',
    it: 'Pony 2',
    pt: 'Ponei 2',
    nl: 'Pony 2',
    sv: 'Ponny 2',
    da: 'Pony 2',
    no: 'Ponni 2',
    fi: 'Poni 2'
  },
  'rabbit.png': {
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
  'rabbit 2.png': {
    en: 'Rabbit 2',
    de: 'Kaninchen 2',
    fr: 'Lapin 2',
    es: 'Conejo 2',
    it: 'Coniglio 2',
    pt: 'Coelho 2',
    nl: 'Konijn 2',
    sv: 'Kanin 2',
    da: 'Kanin 2',
    no: 'Kanin 2',
    fi: 'Kani 2'
  },
  'rooster.png': {
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
  'sheep.png': {
    en: 'Sheep',
    de: 'Schaf',
    fr: 'Mouton',
    es: 'Oveja',
    it: 'Pecora',
    pt: 'Ovelha',
    nl: 'Schaap',
    sv: 'Far',
    da: 'Far',
    no: 'Sau',
    fi: 'Lammas'
  },
  'sheep 2.png': {
    en: 'Sheep 2',
    de: 'Schaf 2',
    fr: 'Mouton 2',
    es: 'Oveja 2',
    it: 'Pecora 2',
    pt: 'Ovelha 2',
    nl: 'Schaap 2',
    sv: 'Far 2',
    da: 'Far 2',
    no: 'Sau 2',
    fi: 'Lammas 2'
  },
  'turtle.png': {
    en: 'Turtle',
    de: 'Schildkrote',
    fr: 'Tortue',
    es: 'Tortuga',
    it: 'Tartaruga',
    pt: 'Tartaruga',
    nl: 'Schildpad',
    sv: 'Skoldpadda',
    da: 'Skildpadde',
    no: 'Skilpadde',
    fi: 'Kilpikonna'
  },
  'unicorn.png': {
    en: 'Unicorn',
    de: 'Einhorn',
    fr: 'Licorne',
    es: 'Unicornio',
    it: 'Unicorno',
    pt: 'Unicornio',
    nl: 'Eenhoorn',
    sv: 'Enhörning',
    da: 'Enhjorning',
    no: 'Enhjorning',
    fi: 'Yksisarvinen'
  },
  'zebra.png': {
    en: 'Zebra',
    de: 'Zebra',
    fr: 'Zebre',
    es: 'Cebra',
    it: 'Zebra',
    pt: 'Zebra',
    nl: 'Zebra',
    sv: 'Zebra',
    da: 'Zebra',
    no: 'Sebra',
    fi: 'Seepra'
  }
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const randomStr = crypto.randomBytes(4).toString('hex');
  const baseName = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${baseName}-${timestamp}-${randomStr}.webp`;
}

async function optimizeImage(inputBuffer) {
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (metadata.format === 'svg') {
    return {
      buffer: inputBuffer,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: 'svg'
    };
  }

  let pipeline = image;
  if (metadata.width > 800 || metadata.height > 800) {
    pipeline = pipeline.resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  const outputBuffer = await pipeline.webp({ quality: 85 }).toBuffer();
  const outputMetadata = await sharp(outputBuffer).metadata();

  return {
    buffer: outputBuffer,
    width: outputMetadata.width,
    height: outputMetadata.height,
    format: 'webp'
  };
}

async function main() {
  console.log('='.repeat(60));
  console.log(`Image Import Script: ${THEME_CONFIG.displayNames.en}`);
  console.log('='.repeat(60));

  // Resolve paths
  let projectRoot, sourceDir, destDir;
  const sourceFolderName = 'animals bw 4';

  if (isServer) {
    projectRoot = '/opt/lessoncraftstudio';
    sourceDir = path.join(projectRoot, 'image library', sourceFolderName);
    destDir = path.join(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  } else {
    projectRoot = path.resolve(__dirname, '..');
    sourceDir = path.resolve(projectRoot, 'image library', sourceFolderName);
    destDir = path.resolve(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  }

  console.log(`\nSource: ${sourceDir}`);
  console.log(`Destination: ${destDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`\nERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created destination directory`);
  }

  try {
    // Step 1: Create or update theme
    console.log('\n--- Step 1: Creating/Updating Theme ---');

    let theme = await prisma.imageTheme.findFirst({
      where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
    });

    if (theme) {
      console.log(`Theme exists (id: ${theme.id}), updating...`);
      theme = await prisma.imageTheme.update({
        where: { id: theme.id },
        data: { displayNames: THEME_CONFIG.displayNames }
      });
    } else {
      theme = await prisma.imageTheme.create({
        data: {
          name: THEME_CONFIG.name,
          type: THEME_CONFIG.type,
          displayNames: THEME_CONFIG.displayNames,
          sortOrder: 0
        }
      });
      console.log(`Created new theme (id: ${theme.id})`);
    }

    // Step 2: Process images
    console.log('\n--- Step 2: Processing Images ---');

    const files = fs.readdirSync(sourceDir).filter(f =>
      /\.(png|jpg|jpeg|webp|svg)$/i.test(f)
    );

    console.log(`Found ${files.length} image files`);

    let successCount = 0, skipCount = 0, errorCount = 0;

    const maxSortOrder = await prisma.imageLibraryItem.aggregate({
      where: { themeId: theme.id },
      _max: { sortOrder: true }
    });
    let currentSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    for (const filename of files) {
      console.log(`\nProcessing: ${filename}`);

      const translations = IMAGE_TRANSLATIONS[filename];
      if (!translations) {
        console.log(`  WARNING: No translations for "${filename}", skipping`);
        skipCount++;
        continue;
      }

      try {
        const inputBuffer = fs.readFileSync(path.join(sourceDir, filename));
        const optimized = await optimizeImage(inputBuffer);
        const newFilename = generateUniqueFilename(filename);
        const destPath = path.join(destDir, newFilename);
        const relativeFilePath = `/images/${THEME_CONFIG.name}/${newFilename}`;

        fs.writeFileSync(destPath, optimized.buffer);
        console.log(`  Saved: ${newFilename} (${optimized.width}x${optimized.height})`);

        // Check if already exists
        const existing = await prisma.imageLibraryItem.findFirst({
          where: {
            themeId: theme.id,
            translations: { path: ['en'], equals: translations.en }
          }
        });

        if (existing) {
          await prisma.imageLibraryItem.update({
            where: { id: existing.id },
            data: {
              translations,
              filePath: relativeFilePath,
              filename: newFilename,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height
            }
          });
          console.log(`  Updated existing record`);
        } else {
          await prisma.imageLibraryItem.create({
            data: {
              themeId: theme.id,
              filename: newFilename,
              filePath: relativeFilePath,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height,
              translations,
              sortOrder: currentSortOrder++
            }
          });
          console.log(`  Created database record`);
        }

        successCount++;
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
        errorCount++;
      }
    }

    // Step 3: Sync to standalone
    if (isServer) {
      const standaloneDir = path.join(projectRoot, 'frontend', '.next', 'standalone', 'public', 'images', THEME_CONFIG.name);
      console.log(`\n--- Syncing to standalone build ---`);
      if (!fs.existsSync(standaloneDir)) {
        fs.mkdirSync(standaloneDir, { recursive: true });
      }
      const destFiles = fs.readdirSync(destDir);
      for (const file of destFiles) {
        fs.copyFileSync(path.join(destDir, file), path.join(standaloneDir, file));
      }
      console.log(`Copied ${destFiles.length} files to standalone`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
    console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  } catch (error) {
    console.error('\nFATAL ERROR:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
