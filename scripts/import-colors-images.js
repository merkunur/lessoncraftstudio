/**
 * Import Script: Colors Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-colors-images.js
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
// CONFIGURATION - COLORS THEME
// ============================================================

const THEME_CONFIG = {
  name: 'colors',
  type: 'images',
  sourceFolderName: 'colors',
  displayNames: {
    en: 'Colors',                       // American English
    de: 'Farben',                       // German
    fr: 'Couleurs',                     // French
    es: 'Colores',                      // Mexican Spanish
    it: 'Colori',                       // Italian
    pt: 'Cores',                        // Brazilian Portuguese
    nl: 'Kleuren',                      // Dutch
    sv: 'Färger',                       // Swedish
    da: 'Farver',                       // Danish
    no: 'Farger',                       // Norwegian
    fi: 'Värit'                         // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'beige.png': {
    en: 'Beige',                        // American English
    de: 'Beige',                        // German
    fr: 'Beige',                        // French
    es: 'Beige',                        // Mexican Spanish
    it: 'Beige',                        // Italian
    pt: 'Bege',                         // Brazilian Portuguese
    nl: 'Beige',                        // Dutch
    sv: 'Beige',                        // Swedish
    da: 'Beige',                        // Danish
    no: 'Beige',                        // Norwegian
    fi: 'Beesi'                         // Finnish
  },
  'black.png': {
    en: 'Black',                        // American English
    de: 'Schwarz',                      // German
    fr: 'Noir',                         // French
    es: 'Negro',                        // Mexican Spanish
    it: 'Nero',                         // Italian
    pt: 'Preto',                        // Brazilian Portuguese
    nl: 'Zwart',                        // Dutch
    sv: 'Svart',                        // Swedish
    da: 'Sort',                         // Danish
    no: 'Svart',                        // Norwegian
    fi: 'Musta'                         // Finnish
  },
  'blue.png': {
    en: 'Blue',                         // American English
    de: 'Blau',                         // German
    fr: 'Bleu',                         // French
    es: 'Azul',                         // Mexican Spanish
    it: 'Blu',                          // Italian
    pt: 'Azul',                         // Brazilian Portuguese
    nl: 'Blauw',                        // Dutch
    sv: 'Blå',                          // Swedish
    da: 'Blå',                          // Danish
    no: 'Blå',                          // Norwegian
    fi: 'Sininen'                       // Finnish
  },
  'brown.png': {
    en: 'Brown',                        // American English
    de: 'Braun',                        // German
    fr: 'Marron',                       // French
    es: 'Café',                         // Mexican Spanish
    it: 'Marrone',                      // Italian
    pt: 'Marrom',                       // Brazilian Portuguese
    nl: 'Bruin',                        // Dutch
    sv: 'Brun',                         // Swedish
    da: 'Brun',                         // Danish
    no: 'Brun',                         // Norwegian
    fi: 'Ruskea'                        // Finnish
  },
  'coral.png': {
    en: 'Coral',                        // American English
    de: 'Koralle',                      // German
    fr: 'Corail',                       // French
    es: 'Coral',                        // Mexican Spanish
    it: 'Corallo',                      // Italian
    pt: 'Coral',                        // Brazilian Portuguese
    nl: 'Koraal',                       // Dutch
    sv: 'Korall',                       // Swedish
    da: 'Koral',                        // Danish
    no: 'Korall',                       // Norwegian
    fi: 'Koralli'                       // Finnish
  },
  'crimson.png': {
    en: 'Crimson',                      // American English
    de: 'Karmesinrot',                  // German
    fr: 'Cramoisi',                     // French
    es: 'Carmesí',                      // Mexican Spanish
    it: 'Cremisi',                      // Italian
    pt: 'Carmesim',                     // Brazilian Portuguese
    nl: 'Karmozijn',                    // Dutch
    sv: 'Karmosinröd',                  // Swedish
    da: 'Karmin',                       // Danish
    no: 'Karmosinrød',                  // Norwegian
    fi: 'Karmiininpunainen'             // Finnish
  },
  'gray.png': {
    en: 'Gray',                         // American English
    de: 'Grau',                         // German
    fr: 'Gris',                         // French
    es: 'Gris',                         // Mexican Spanish
    it: 'Grigio',                       // Italian
    pt: 'Cinza',                        // Brazilian Portuguese
    nl: 'Grijs',                        // Dutch
    sv: 'Grå',                          // Swedish
    da: 'Grå',                          // Danish
    no: 'Grå',                          // Norwegian
    fi: 'Harmaa'                        // Finnish
  },
  'green.png': {
    en: 'Green',                        // American English
    de: 'Grün',                         // German
    fr: 'Vert',                         // French
    es: 'Verde',                        // Mexican Spanish
    it: 'Verde',                        // Italian
    pt: 'Verde',                        // Brazilian Portuguese
    nl: 'Groen',                        // Dutch
    sv: 'Grön',                         // Swedish
    da: 'Grøn',                         // Danish
    no: 'Grønn',                        // Norwegian
    fi: 'Vihreä'                        // Finnish
  },
  'lime.png': {
    en: 'Lime',                         // American English
    de: 'Limette',                      // German
    fr: 'Citron vert',                  // French
    es: 'Lima',                         // Mexican Spanish
    it: 'Lime',                         // Italian
    pt: 'Lima',                         // Brazilian Portuguese
    nl: 'Limoen',                       // Dutch
    sv: 'Lime',                         // Swedish
    da: 'Lime',                         // Danish
    no: 'Lime',                         // Norwegian
    fi: 'Limenvihreä'                   // Finnish
  },
  'orange.png': {
    en: 'Orange',                       // American English
    de: 'Orange',                       // German
    fr: 'Orange',                       // French
    es: 'Naranja',                      // Mexican Spanish
    it: 'Arancione',                    // Italian
    pt: 'Laranja',                      // Brazilian Portuguese
    nl: 'Oranje',                       // Dutch
    sv: 'Orange',                       // Swedish
    da: 'Orange',                       // Danish
    no: 'Oransje',                      // Norwegian
    fi: 'Oranssi'                       // Finnish
  },
  'peach.png': {
    en: 'Peach',                        // American English
    de: 'Pfirsich',                     // German
    fr: 'Pêche',                        // French
    es: 'Durazno',                      // Mexican Spanish
    it: 'Pesca',                        // Italian
    pt: 'Pêssego',                      // Brazilian Portuguese
    nl: 'Perzik',                       // Dutch
    sv: 'Persika',                      // Swedish
    da: 'Fersken',                      // Danish
    no: 'Fersken',                      // Norwegian
    fi: 'Persikka'                      // Finnish
  },
  'pink.png': {
    en: 'Pink',                         // American English
    de: 'Rosa',                         // German
    fr: 'Rose',                         // French
    es: 'Rosa',                         // Mexican Spanish
    it: 'Rosa',                         // Italian
    pt: 'Rosa',                         // Brazilian Portuguese
    nl: 'Roze',                         // Dutch
    sv: 'Rosa',                         // Swedish
    da: 'Lyserød',                      // Danish
    no: 'Rosa',                         // Norwegian
    fi: 'Vaaleanpunainen'               // Finnish
  },
  'purple.png': {
    en: 'Purple',                       // American English
    de: 'Lila',                         // German
    fr: 'Violet',                       // French
    es: 'Morado',                       // Mexican Spanish
    it: 'Viola',                        // Italian
    pt: 'Roxo',                         // Brazilian Portuguese
    nl: 'Paars',                        // Dutch
    sv: 'Lila',                         // Swedish
    da: 'Lilla',                        // Danish
    no: 'Lilla',                        // Norwegian
    fi: 'Violetti'                      // Finnish
  },
  'red.png': {
    en: 'Red',                          // American English
    de: 'Rot',                          // German
    fr: 'Rouge',                        // French
    es: 'Rojo',                         // Mexican Spanish
    it: 'Rosso',                        // Italian
    pt: 'Vermelho',                     // Brazilian Portuguese
    nl: 'Rood',                         // Dutch
    sv: 'Röd',                          // Swedish
    da: 'Rød',                          // Danish
    no: 'Rød',                          // Norwegian
    fi: 'Punainen'                      // Finnish
  },
  'scarlet.png': {
    en: 'Scarlet',                      // American English
    de: 'Scharlachrot',                 // German
    fr: 'Écarlate',                     // French
    es: 'Escarlata',                    // Mexican Spanish
    it: 'Scarlatto',                    // Italian
    pt: 'Escarlate',                    // Brazilian Portuguese
    nl: 'Scharlaken',                   // Dutch
    sv: 'Scharlakansröd',               // Swedish
    da: 'Skarlagen',                    // Danish
    no: 'Skarlagenrød',                 // Norwegian
    fi: 'Tulipunainen'                  // Finnish
  },
  'turquoise.png': {
    en: 'Turquoise',                    // American English
    de: 'Türkis',                       // German
    fr: 'Turquoise',                    // French
    es: 'Turquesa',                     // Mexican Spanish
    it: 'Turchese',                     // Italian
    pt: 'Turquesa',                     // Brazilian Portuguese
    nl: 'Turkoois',                     // Dutch
    sv: 'Turkos',                       // Swedish
    da: 'Turkis',                       // Danish
    no: 'Turkis',                       // Norwegian
    fi: 'Turkoosi'                      // Finnish
  },
  'violet.png': {
    en: 'Violet',                       // American English
    de: 'Violett',                      // German
    fr: 'Violet',                       // French
    es: 'Violeta',                      // Mexican Spanish
    it: 'Violetto',                     // Italian
    pt: 'Violeta',                      // Brazilian Portuguese
    nl: 'Violet',                       // Dutch
    sv: 'Violett',                      // Swedish
    da: 'Violet',                       // Danish
    no: 'Fiolett',                      // Norwegian
    fi: 'Violetti'                      // Finnish
  },
  'white.png': {
    en: 'White',                        // American English
    de: 'Weiß',                         // German
    fr: 'Blanc',                        // French
    es: 'Blanco',                       // Mexican Spanish
    it: 'Bianco',                       // Italian
    pt: 'Branco',                       // Brazilian Portuguese
    nl: 'Wit',                          // Dutch
    sv: 'Vit',                          // Swedish
    da: 'Hvid',                         // Danish
    no: 'Hvit',                         // Norwegian
    fi: 'Valkoinen'                     // Finnish
  },
  'yellow.png': {
    en: 'Yellow',                       // American English
    de: 'Gelb',                         // German
    fr: 'Jaune',                        // French
    es: 'Amarillo',                     // Mexican Spanish
    it: 'Giallo',                       // Italian
    pt: 'Amarelo',                      // Brazilian Portuguese
    nl: 'Geel',                         // Dutch
    sv: 'Gul',                          // Swedish
    da: 'Gul',                          // Danish
    no: 'Gul',                          // Norwegian
    fi: 'Keltainen'                     // Finnish
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
  const sourceFolderName = THEME_CONFIG.sourceFolderName;

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
