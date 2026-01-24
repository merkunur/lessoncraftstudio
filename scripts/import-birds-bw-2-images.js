/**
 * Import Script: Birds BW 2 (Black & White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-birds-bw-2-images.js
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
// CONFIGURATION - BIRDS BW 2 THEME
// ============================================================

const THEME_CONFIG = {
  name: 'birds_bw_2',
  type: 'images',
  sourceFolderName: 'birds bw 2',  // Actual folder name with spaces
  displayNames: {
    en: 'Birds BW 2',                   // American English
    de: 'Vögel SW 2',                   // German (Schwarz-Weiß)
    fr: 'Oiseaux N&B 2',                // French (Noir et Blanc)
    es: 'Aves ByN 2',                   // Mexican Spanish (Blanco y Negro)
    it: 'Uccelli B&N 2',                // Italian (Bianco e Nero)
    pt: 'Pássaros P&B 2',               // Brazilian Portuguese (Preto e Branco)
    nl: 'Vogels Z&W 2',                 // Dutch (Zwart-Wit)
    sv: 'Fåglar S&V 2',                 // Swedish (Svart och Vit)
    da: 'Fugle S&H 2',                  // Danish (Sort og Hvid)
    no: 'Fugler S&H 2',                 // Norwegian (Svart og Hvit)
    fi: 'Linnut M&V 2'                  // Finnish (Mustavalkoinen)
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'bird.png': {
    en: 'Bird',                     // American English
    de: 'Vogel',                    // German
    fr: 'Oiseau',                   // French
    es: 'Pájaro',                   // Mexican Spanish
    it: 'Uccello',                  // Italian
    pt: 'Pássaro',                  // Brazilian Portuguese
    nl: 'Vogel',                    // Dutch
    sv: 'Fågel',                    // Swedish
    da: 'Fugl',                     // Danish
    no: 'Fugl',                     // Norwegian
    fi: 'Lintu'                     // Finnish
  },
  'bird 2.png': {
    en: 'Bird 2',                   // American English
    de: 'Vogel 2',                  // German
    fr: 'Oiseau 2',                 // French
    es: 'Pájaro 2',                 // Mexican Spanish
    it: 'Uccello 2',                // Italian
    pt: 'Pássaro 2',                // Brazilian Portuguese
    nl: 'Vogel 2',                  // Dutch
    sv: 'Fågel 2',                  // Swedish
    da: 'Fugl 2',                   // Danish
    no: 'Fugl 2',                   // Norwegian
    fi: 'Lintu 2'                   // Finnish
  },
  'bird 3.png': {
    en: 'Bird 3',                   // American English
    de: 'Vogel 3',                  // German
    fr: 'Oiseau 3',                 // French
    es: 'Pájaro 3',                 // Mexican Spanish
    it: 'Uccello 3',                // Italian
    pt: 'Pássaro 3',                // Brazilian Portuguese
    nl: 'Vogel 3',                  // Dutch
    sv: 'Fågel 3',                  // Swedish
    da: 'Fugl 3',                   // Danish
    no: 'Fugl 3',                   // Norwegian
    fi: 'Lintu 3'                   // Finnish
  },
  'chicken.png': {
    en: 'Chicken',                  // American English
    de: 'Huhn',                     // German
    fr: 'Poulet',                   // French
    es: 'Pollo',                    // Mexican Spanish
    it: 'Pollo',                    // Italian
    pt: 'Frango',                   // Brazilian Portuguese
    nl: 'Kip',                      // Dutch
    sv: 'Kyckling',                 // Swedish
    da: 'Kylling',                  // Danish
    no: 'Kylling',                  // Norwegian
    fi: 'Kana'                      // Finnish
  },
  'crow.png': {
    en: 'Crow',                     // American English
    de: 'Krähe',                    // German
    fr: 'Corbeau',                  // French
    es: 'Cuervo',                   // Mexican Spanish
    it: 'Corvo',                    // Italian
    pt: 'Corvo',                    // Brazilian Portuguese
    nl: 'Kraai',                    // Dutch
    sv: 'Kråka',                    // Swedish
    da: 'Krage',                    // Danish
    no: 'Kråke',                    // Norwegian
    fi: 'Varis'                     // Finnish
  },
  'duck.png': {
    en: 'Duck',                     // American English
    de: 'Ente',                     // German
    fr: 'Canard',                   // French
    es: 'Pato',                     // Mexican Spanish
    it: 'Anatra',                   // Italian
    pt: 'Pato',                     // Brazilian Portuguese
    nl: 'Eend',                     // Dutch
    sv: 'Anka',                     // Swedish
    da: 'And',                      // Danish
    no: 'And',                      // Norwegian
    fi: 'Ankka'                     // Finnish
  },
  'duck 2.png': {
    en: 'Duck 2',                   // American English
    de: 'Ente 2',                   // German
    fr: 'Canard 2',                 // French
    es: 'Pato 2',                   // Mexican Spanish
    it: 'Anatra 2',                 // Italian
    pt: 'Pato 2',                   // Brazilian Portuguese
    nl: 'Eend 2',                   // Dutch
    sv: 'Anka 2',                   // Swedish
    da: 'And 2',                    // Danish
    no: 'And 2',                    // Norwegian
    fi: 'Ankka 2'                   // Finnish
  },
  'flamingo.png': {
    en: 'Flamingo',                 // American English
    de: 'Flamingo',                 // German
    fr: 'Flamant rose',             // French
    es: 'Flamenco',                 // Mexican Spanish
    it: 'Fenicottero',              // Italian
    pt: 'Flamingo',                 // Brazilian Portuguese
    nl: 'Flamingo',                 // Dutch
    sv: 'Flamingo',                 // Swedish
    da: 'Flamingo',                 // Danish
    no: 'Flamingo',                 // Norwegian
    fi: 'Flamingo'                  // Finnish
  },
  'goose.png': {
    en: 'Goose',                    // American English
    de: 'Gans',                     // German
    fr: 'Oie',                      // French
    es: 'Ganso',                    // Mexican Spanish
    it: 'Oca',                      // Italian
    pt: 'Ganso',                    // Brazilian Portuguese
    nl: 'Gans',                     // Dutch
    sv: 'Gås',                      // Swedish
    da: 'Gås',                      // Danish
    no: 'Gås',                      // Norwegian
    fi: 'Hanhi'                     // Finnish
  },
  'hummingbird.png': {
    en: 'Hummingbird',              // American English
    de: 'Kolibri',                  // German
    fr: 'Colibri',                  // French
    es: 'Colibrí',                  // Mexican Spanish
    it: 'Colibrì',                  // Italian
    pt: 'Beija-flor',               // Brazilian Portuguese
    nl: 'Kolibrie',                 // Dutch
    sv: 'Kolibri',                  // Swedish
    da: 'Kolibri',                  // Danish
    no: 'Kolibri',                  // Norwegian
    fi: 'Kolibri'                   // Finnish
  },
  'ostrich.png': {
    en: 'Ostrich',                  // American English
    de: 'Strauß',                   // German
    fr: 'Autruche',                 // French
    es: 'Avestruz',                 // Mexican Spanish
    it: 'Struzzo',                  // Italian
    pt: 'Avestruz',                 // Brazilian Portuguese
    nl: 'Struisvogel',              // Dutch
    sv: 'Struts',                   // Swedish
    da: 'Struds',                   // Danish
    no: 'Struts',                   // Norwegian
    fi: 'Strutsi'                   // Finnish
  },
  'owl.png': {
    en: 'Owl',                      // American English
    de: 'Eule',                     // German
    fr: 'Hibou',                    // French
    es: 'Búho',                     // Mexican Spanish
    it: 'Gufo',                     // Italian
    pt: 'Coruja',                   // Brazilian Portuguese
    nl: 'Uil',                      // Dutch
    sv: 'Uggla',                    // Swedish
    da: 'Ugle',                     // Danish
    no: 'Ugle',                     // Norwegian
    fi: 'Pöllö'                     // Finnish
  },
  'parrot.png': {
    en: 'Parrot',                   // American English
    de: 'Papagei',                  // German
    fr: 'Perroquet',                // French
    es: 'Loro',                     // Mexican Spanish
    it: 'Pappagallo',               // Italian
    pt: 'Papagaio',                 // Brazilian Portuguese
    nl: 'Papegaai',                 // Dutch
    sv: 'Papegoja',                 // Swedish
    da: 'Papegøje',                 // Danish
    no: 'Papegøye',                 // Norwegian
    fi: 'Papukaija'                 // Finnish
  },
  'peacock.png': {
    en: 'Peacock',                  // American English
    de: 'Pfau',                     // German
    fr: 'Paon',                     // French
    es: 'Pavo real',                // Mexican Spanish
    it: 'Pavone',                   // Italian
    pt: 'Pavão',                    // Brazilian Portuguese
    nl: 'Pauw',                     // Dutch
    sv: 'Påfågel',                  // Swedish
    da: 'Påfugl',                   // Danish
    no: 'Påfugl',                   // Norwegian
    fi: 'Riikinkukko'               // Finnish
  },
  'rooster.png': {
    en: 'Rooster',                  // American English
    de: 'Hahn',                     // German
    fr: 'Coq',                      // French
    es: 'Gallo',                    // Mexican Spanish
    it: 'Gallo',                    // Italian
    pt: 'Galo',                     // Brazilian Portuguese
    nl: 'Haan',                     // Dutch
    sv: 'Tupp',                     // Swedish
    da: 'Hane',                     // Danish
    no: 'Hane',                     // Norwegian
    fi: 'Kukko'                     // Finnish
  },
  'swan.png': {
    en: 'Swan',                     // American English
    de: 'Schwan',                   // German
    fr: 'Cygne',                    // French
    es: 'Cisne',                    // Mexican Spanish
    it: 'Cigno',                    // Italian
    pt: 'Cisne',                    // Brazilian Portuguese
    nl: 'Zwaan',                    // Dutch
    sv: 'Svan',                     // Swedish
    da: 'Svane',                    // Danish
    no: 'Svane',                    // Norwegian
    fi: 'Joutsen'                   // Finnish
  },
  'toucan.png': {
    en: 'Toucan',                   // American English
    de: 'Tukan',                    // German
    fr: 'Toucan',                   // French
    es: 'Tucán',                    // Mexican Spanish
    it: 'Tucano',                   // Italian
    pt: 'Tucano',                   // Brazilian Portuguese
    nl: 'Toekan',                   // Dutch
    sv: 'Tukan',                    // Swedish
    da: 'Tukan',                    // Danish
    no: 'Tukan',                    // Norwegian
    fi: 'Tukaani'                   // Finnish
  },
  'turkey.png': {
    en: 'Turkey',                   // American English
    de: 'Truthahn',                 // German
    fr: 'Dinde',                    // French
    es: 'Guajolote',                // Mexican Spanish
    it: 'Tacchino',                 // Italian
    pt: 'Peru',                     // Brazilian Portuguese
    nl: 'Kalkoen',                  // Dutch
    sv: 'Kalkon',                   // Swedish
    da: 'Kalkun',                   // Danish
    no: 'Kalkun',                   // Norwegian
    fi: 'Kalkkuna'                  // Finnish
  },
  'turkey 2.png': {
    en: 'Turkey 2',                 // American English
    de: 'Truthahn 2',               // German
    fr: 'Dinde 2',                  // French
    es: 'Guajolote 2',              // Mexican Spanish
    it: 'Tacchino 2',               // Italian
    pt: 'Peru 2',                   // Brazilian Portuguese
    nl: 'Kalkoen 2',                // Dutch
    sv: 'Kalkon 2',                 // Swedish
    da: 'Kalkun 2',                 // Danish
    no: 'Kalkun 2',                 // Norwegian
    fi: 'Kalkkuna 2'                // Finnish
  },
  'vulture.png': {
    en: 'Vulture',                  // American English
    de: 'Geier',                    // German
    fr: 'Vautour',                  // French
    es: 'Buitre',                   // Mexican Spanish
    it: 'Avvoltoio',                // Italian
    pt: 'Abutre',                   // Brazilian Portuguese
    nl: 'Gier',                     // Dutch
    sv: 'Gam',                      // Swedish
    da: 'Grib',                     // Danish
    no: 'Gribb',                    // Norwegian
    fi: 'Korppikotka'               // Finnish
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
  const sourceFolderName = THEME_CONFIG.sourceFolderName || THEME_CONFIG.displayNames.en;

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
