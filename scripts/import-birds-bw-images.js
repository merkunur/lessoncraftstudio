/**
 * Import Script: Birds BW (Black & White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-birds-bw-images.js
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
// CONFIGURATION - BIRDS BW THEME
// ============================================================

const THEME_CONFIG = {
  name: 'birds_bw',
  type: 'images',
  sourceFolderName: 'birds bw',  // Actual folder name with space
  displayNames: {
    en: 'Birds BW',                     // American English
    de: 'Vögel SW',                     // German (Schwarz-Weiß)
    fr: 'Oiseaux N&B',                  // French (Noir et Blanc)
    es: 'Aves ByN',                     // Mexican Spanish (Blanco y Negro)
    it: 'Uccelli B&N',                  // Italian (Bianco e Nero)
    pt: 'Pássaros P&B',                 // Brazilian Portuguese (Preto e Branco)
    nl: 'Vogels Z&W',                   // Dutch (Zwart-Wit)
    sv: 'Fåglar S&V',                   // Swedish (Svart och Vit)
    da: 'Fugle S&H',                    // Danish (Sort og Hvid)
    no: 'Fugler S&H',                   // Norwegian (Svart og Hvit)
    fi: 'Linnut M&V'                    // Finnish (Mustavalkoinen)
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
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
  'kiwi.png': {
    en: 'Kiwi',                     // American English
    de: 'Kiwi',                     // German
    fr: 'Kiwi',                     // French
    es: 'Kiwi',                     // Mexican Spanish
    it: 'Kiwi',                     // Italian
    pt: 'Quivi',                    // Brazilian Portuguese
    nl: 'Kiwi',                     // Dutch
    sv: 'Kivi',                     // Swedish
    da: 'Kiwi',                     // Danish
    no: 'Kivi',                     // Norwegian
    fi: 'Kiivi'                     // Finnish
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
  'pelican.png': {
    en: 'Pelican',                  // American English
    de: 'Pelikan',                  // German
    fr: 'Pélican',                  // French
    es: 'Pelícano',                 // Mexican Spanish
    it: 'Pellicano',                // Italian
    pt: 'Pelicano',                 // Brazilian Portuguese
    nl: 'Pelikaan',                 // Dutch
    sv: 'Pelikan',                  // Swedish
    da: 'Pelikan',                  // Danish
    no: 'Pelikan',                  // Norwegian
    fi: 'Pelikaani'                 // Finnish
  },
  'penguin.png': {
    en: 'Penguin',                  // American English
    de: 'Pinguin',                  // German
    fr: 'Pingouin',                 // French
    es: 'Pingüino',                 // Mexican Spanish
    it: 'Pinguino',                 // Italian
    pt: 'Pinguim',                  // Brazilian Portuguese
    nl: 'Pinguïn',                  // Dutch
    sv: 'Pingvin',                  // Swedish
    da: 'Pingvin',                  // Danish
    no: 'Pingvin',                  // Norwegian
    fi: 'Pingviini'                 // Finnish
  },
  'penguin 2.png': {
    en: 'Penguin 2',                // American English
    de: 'Pinguin 2',                // German
    fr: 'Pingouin 2',               // French
    es: 'Pingüino 2',               // Mexican Spanish
    it: 'Pinguino 2',               // Italian
    pt: 'Pinguim 2',                // Brazilian Portuguese
    nl: 'Pinguïn 2',                // Dutch
    sv: 'Pingvin 2',                // Swedish
    da: 'Pingvin 2',                // Danish
    no: 'Pingvin 2',                // Norwegian
    fi: 'Pingviini 2'               // Finnish
  },
  'pigeon.png': {
    en: 'Pigeon',                   // American English
    de: 'Taube',                    // German
    fr: 'Pigeon',                   // French
    es: 'Paloma',                   // Mexican Spanish
    it: 'Piccione',                 // Italian
    pt: 'Pombo',                    // Brazilian Portuguese
    nl: 'Duif',                     // Dutch
    sv: 'Duva',                     // Swedish
    da: 'Due',                      // Danish
    no: 'Due',                      // Norwegian
    fi: 'Kyyhkynen'                 // Finnish
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
  },
  'woodpecker.png': {
    en: 'Woodpecker',               // American English
    de: 'Specht',                   // German
    fr: 'Pic',                      // French
    es: 'Pájaro carpintero',        // Mexican Spanish
    it: 'Picchio',                  // Italian
    pt: 'Pica-pau',                 // Brazilian Portuguese
    nl: 'Specht',                   // Dutch
    sv: 'Hackspett',                // Swedish
    da: 'Spætte',                   // Danish
    no: 'Hakkespett',               // Norwegian
    fi: 'Tikka'                     // Finnish
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
