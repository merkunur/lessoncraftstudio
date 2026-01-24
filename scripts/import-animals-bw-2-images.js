/**
 * Import Script: Animals BW 2 (Black and White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-animals-bw-2-images.js
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
  name: 'animals_bw_2',
  type: 'images',
  displayNames: {
    en: 'Animals BW 2',
    de: 'Tiere SW 2',
    fr: 'Animaux NB 2',
    es: 'Animales BN 2',
    it: 'Animali BN 2',
    pt: 'Animais PB 2',
    nl: 'Dieren ZW 2',
    sv: 'Djur SV 2',
    da: 'Dyr SH 2',
    no: 'Dyr SH 2',
    fi: 'Elaimet MV 2'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'bull.png': {
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
    fi: 'Harka'
  },
  'cat .png': {
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
  'fox.png': {
    en: 'Fox',
    de: 'Fuchs',
    fr: 'Renard',
    es: 'Zorro',
    it: 'Volpe',
    pt: 'Raposa',
    nl: 'Vos',
    sv: 'Rav',
    da: 'Raev',
    no: 'Rev',
    fi: 'Kettu'
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
  'leopard.png': {
    en: 'Leopard',
    de: 'Leopard',
    fr: 'Leopard',
    es: 'Leopardo',
    it: 'Leopardo',
    pt: 'Leopardo',
    nl: 'Luipaard',
    sv: 'Leopard',
    da: 'Leopard',
    no: 'Leopard',
    fi: 'Leopardi'
  },
  'lion.png': {
    en: 'Lion',
    de: 'Lowe',
    fr: 'Lion',
    es: 'Leon',
    it: 'Leone',
    pt: 'Leao',
    nl: 'Leeuw',
    sv: 'Lejon',
    da: 'Love',
    no: 'Love',
    fi: 'Leijona'
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
  'monkey 2.png': {
    en: 'Monkey 2',
    de: 'Affe 2',
    fr: 'Singe 2',
    es: 'Mono 2',
    it: 'Scimmia 2',
    pt: 'Macaco 2',
    nl: 'Aap 2',
    sv: 'Apa 2',
    da: 'Abe 2',
    no: 'Ape 2',
    fi: 'Apina 2'
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
  'panda.png': {
    en: 'Panda',
    de: 'Panda',
    fr: 'Panda',
    es: 'Panda',
    it: 'Panda',
    pt: 'Panda',
    nl: 'Panda',
    sv: 'Panda',
    da: 'Panda',
    no: 'Panda',
    fi: 'Panda'
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
  'porcupine.png': {
    en: 'Porcupine',
    de: 'Stachelschwein',
    fr: 'Porc-epic',
    es: 'Puercoespin',
    it: 'Porcospino',
    pt: 'Porco-espinho',
    nl: 'Stekelvarken',
    sv: 'Piggsvin',
    da: 'Pindsvin',
    no: 'Piggsvin',
    fi: 'Piikkisika'
  },
  'rabbit.png': {
    en: 'Rabbit',
    de: 'Hase',
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
  'raccoon.png': {
    en: 'Raccoon',
    de: 'Waschbar',
    fr: 'Raton laveur',
    es: 'Mapache',
    it: 'Procione',
    pt: 'Guaxinim',
    nl: 'Wasbeer',
    sv: 'Tvattbjorn',
    da: 'Vaskebjorn',
    no: 'Vaskebjorn',
    fi: 'Pesukarhu'
  },
  'rhinoceros.png': {
    en: 'Rhinoceros',
    de: 'Nashorn',
    fr: 'Rhinoceros',
    es: 'Rinoceronte',
    it: 'Rinoceronte',
    pt: 'Rinoceronte',
    nl: 'Neushoorn',
    sv: 'Noshorning',
    da: 'Naeshorn',
    no: 'Neshorn',
    fi: 'Sarvikuono'
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
  'sloth.png': {
    en: 'Sloth',
    de: 'Faultier',
    fr: 'Paresseux',
    es: 'Perezoso',
    it: 'Bradipo',
    pt: 'Preguica',
    nl: 'Luiaard',
    sv: 'Sengangare',
    da: 'Dovendyr',
    no: 'Dovendyr',
    fi: 'Laiskiainen'
  },
  'squirrel.png': {
    en: 'Squirrel',
    de: 'Eichhornchen',
    fr: 'Ecureuil',
    es: 'Ardilla',
    it: 'Scoiattolo',
    pt: 'Esquilo',
    nl: 'Eekhoorn',
    sv: 'Ekorre',
    da: 'Egern',
    no: 'Ekorn',
    fi: 'Orava'
  },
  'teddy bear.png': {
    en: 'Teddy Bear',
    de: 'Teddybar',
    fr: 'Ours en peluche',
    es: 'Osito de peluche',
    it: 'Orsacchiotto',
    pt: 'Ursinho de pelucia',
    nl: 'Teddybeer',
    sv: 'Nallebjorn',
    da: 'Bamse',
    no: 'Bamse',
    fi: 'Nallekarhu'
  },
  'yak.png': {
    en: 'Yak',
    de: 'Yak',
    fr: 'Yak',
    es: 'Yak',
    it: 'Yak',
    pt: 'Iaque',
    nl: 'Yak',
    sv: 'Jak',
    da: 'Yak',
    no: 'Jak',
    fi: 'Jakki'
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
  const sourceFolderName = 'animals bw 2';

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
