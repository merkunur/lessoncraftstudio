/**
 * Import Script: Birds Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-birds-images.js
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
// CONFIGURATION - BIRDS THEME
// ============================================================

const THEME_CONFIG = {
  name: 'birds',
  type: 'images',
  displayNames: {
    en: 'Birds',                    // American English
    de: 'Vögel',                    // German
    fr: 'Oiseaux',                  // French
    es: 'Aves',                     // Mexican Spanish
    it: 'Uccelli',                  // Italian
    pt: 'Pássaros',                 // Brazilian Portuguese
    nl: 'Vogels',                   // Dutch
    sv: 'Fåglar',                   // Swedish
    da: 'Fugle',                    // Danish
    no: 'Fugler',                   // Norwegian
    fi: 'Linnut'                    // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'eagle.png': {
    en: 'Eagle',                    // American English
    de: 'Adler',                    // German
    fr: 'Aigle',                    // French
    es: 'Águila',                   // Mexican Spanish
    it: 'Aquila',                   // Italian
    pt: 'Águia',                    // Brazilian Portuguese
    nl: 'Adelaar',                  // Dutch
    sv: 'Örn',                      // Swedish
    da: 'Ørn',                      // Danish
    no: 'Ørn',                      // Norwegian
    fi: 'Kotka'                     // Finnish
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
  'hornbill.png': {
    en: 'Hornbill',                 // American English
    de: 'Nashornvogel',             // German
    fr: 'Calao',                    // French
    es: 'Cálao',                    // Mexican Spanish
    it: 'Bucero',                   // Italian
    pt: 'Calau',                    // Brazilian Portuguese
    nl: 'Neushoornvogel',           // Dutch
    sv: 'Näshornsfågel',            // Swedish
    da: 'Næsehornsfugl',            // Danish
    no: 'Næsehornsfugl',            // Norwegian
    fi: 'Sarvikuontolintu'          // Finnish
  },
  'macaw.png': {
    en: 'Macaw',                    // American English
    de: 'Ara',                      // German
    fr: 'Ara',                      // French
    es: 'Guacamayo',                // Mexican Spanish
    it: 'Ara',                      // Italian
    pt: 'Arara',                    // Brazilian Portuguese
    nl: 'Ara',                      // Dutch
    sv: 'Ara',                      // Swedish
    da: 'Ara',                      // Danish
    no: 'Ara',                      // Norwegian
    fi: 'Ara'                       // Finnish
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
  const sourceFolderName = THEME_CONFIG.name; // Use theme name for folder

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
