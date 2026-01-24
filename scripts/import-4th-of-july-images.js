/**
 * Import Script: 4th of July Images
 *
 * This script imports images from "image library/4th of July/" folder
 * into the content manager as a new theme under "Main Images".
 *
 * Usage: cd frontend && node ../scripts/import-4th-of-july-images.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Detect environment and set paths
const isServer = fs.existsSync('/opt/lessoncraftstudio');
let frontendRoot;

if (isServer) {
  // Production server
  frontendRoot = '/opt/lessoncraftstudio/frontend';
} else {
  // Local development
  frontendRoot = path.resolve(__dirname, '..', 'frontend');
}

process.chdir(frontendRoot);

// Now require modules from frontend's node_modules
const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const sharp = require(path.join(frontendRoot, 'node_modules', 'sharp'));

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: '4th_of_july',
  type: 'images',
  displayNames: {
    en: '4th of July',
    de: '4. Juli',
    fr: '4 juillet',
    es: '4 de Julio',
    it: '4 luglio',
    pt: '4 de Julho',
    nl: '4 juli',
    sv: '4 juli',
    da: '4. juli',
    no: '4. juli',
    fi: 'Heinakuun 4.'
  }
};

// Image translations (filename -> translations)
const IMAGE_TRANSLATIONS = {
  'balloon.png': {
    en: 'Balloon',
    de: 'Ballon',
    fr: 'Ballon',
    es: 'Globo',
    it: 'Palloncino',
    pt: 'Balao',
    nl: 'Ballon',
    sv: 'Ballong',
    da: 'Ballon',
    no: 'Ballong',
    fi: 'Ilmapallo'
  },
  'baseball.png': {
    en: 'Baseball',
    de: 'Baseball',
    fr: 'Baseball',
    es: 'Beisbol',
    it: 'Baseball',
    pt: 'Beisebol',
    nl: 'Honkbal',
    sv: 'Baseboll',
    da: 'Baseball',
    no: 'Baseball',
    fi: 'Pesapallo'
  },
  'cake.png': {
    en: 'Cake',
    de: 'Kuchen',
    fr: 'Gateau',
    es: 'Pastel',
    it: 'Torta',
    pt: 'Bolo',
    nl: 'Taart',
    sv: 'Tarta',
    da: 'Kage',
    no: 'Kake',
    fi: 'Kakku'
  },
  'eagle.png': {
    en: 'Eagle',
    de: 'Adler',
    fr: 'Aigle',
    es: 'Aguila',
    it: 'Aquila',
    pt: 'Aguia',
    nl: 'Adelaar',
    sv: 'Orn',
    da: 'Orn',
    no: 'Orn',
    fi: 'Kotka'
  },
  'flag.png': {
    en: 'Flag',
    de: 'Flagge',
    fr: 'Drapeau',
    es: 'Bandera',
    it: 'Bandiera',
    pt: 'Bandeira',
    nl: 'Vlag',
    sv: 'Flagga',
    da: 'Flag',
    no: 'Flagg',
    fi: 'Lippu'
  },
  'French fries.png': {
    en: 'French Fries',
    de: 'Pommes Frites',
    fr: 'Frites',
    es: 'Papas Fritas',
    it: 'Patatine Fritte',
    pt: 'Batatas Fritas',
    nl: 'Patat',
    sv: 'Pommes Frites',
    da: 'Pomfritter',
    no: 'Pommes Frites',
    fi: 'Ranskalaiset'
  },
  'grill.png': {
    en: 'Grill',
    de: 'Grill',
    fr: 'Gril',
    es: 'Parrilla',
    it: 'Griglia',
    pt: 'Churrasqueira',
    nl: 'Grill',
    sv: 'Grill',
    da: 'Grill',
    no: 'Grill',
    fi: 'Grilli'
  },
  'hamburger.png': {
    en: 'Hamburger',
    de: 'Hamburger',
    fr: 'Hamburger',
    es: 'Hamburguesa',
    it: 'Hamburger',
    pt: 'Hamburguer',
    nl: 'Hamburger',
    sv: 'Hamburgare',
    da: 'Hamburger',
    no: 'Hamburger',
    fi: 'Hampurilainen'
  },
  'hotdog.png': {
    en: 'Hot Dog',
    de: 'Hotdog',
    fr: 'Hot-dog',
    es: 'Hot Dog',
    it: 'Hot Dog',
    pt: 'Cachorro-Quente',
    nl: 'Hotdog',
    sv: 'Korv med Brod',
    da: 'Hotdog',
    no: 'Polse i Brod',
    fi: 'Hodari'
  },
  'ice cream.png': {
    en: 'Ice Cream',
    de: 'Eiscreme',
    fr: 'Glace',
    es: 'Helado',
    it: 'Gelato',
    pt: 'Sorvete',
    nl: 'IJs',
    sv: 'Glass',
    da: 'Is',
    no: 'Iskrem',
    fi: 'Jaatelo'
  },
  'lemonade.png': {
    en: 'Lemonade',
    de: 'Limonade',
    fr: 'Limonade',
    es: 'Limonada',
    it: 'Limonata',
    pt: 'Limonada',
    nl: 'Limonade',
    sv: 'Lemonad',
    da: 'Lemonade',
    no: 'Limonade',
    fi: 'Limonadi'
  },
  'liberty.png': {
    en: 'Liberty',
    de: 'Freiheit',
    fr: 'Liberte',
    es: 'Libertad',
    it: 'Liberta',
    pt: 'Liberdade',
    nl: 'Vrijheid',
    sv: 'Frihet',
    da: 'Frihed',
    no: 'Frihet',
    fi: 'Vapaus'
  },
  'statue.png': {
    en: 'Statue',
    de: 'Statue',
    fr: 'Statue',
    es: 'Estatua',
    it: 'Statua',
    pt: 'Estatua',
    nl: 'Standbeeld',
    sv: 'Staty',
    da: 'Statue',
    no: 'Statue',
    fi: 'Patsas'
  },
  'Uncle Sam.png': {
    en: 'Uncle Sam',
    de: 'Onkel Sam',
    fr: 'Oncle Sam',
    es: 'Tio Sam',
    it: 'Zio Sam',
    pt: 'Tio Sam',
    nl: 'Oom Sam',
    sv: 'Farbror Sam',
    da: 'Onkel Sam',
    no: 'Onkel Sam',
    fi: 'Seta Sam'
  },
  'US.png': {
    en: 'US',
    de: 'USA',
    fr: 'Etats-Unis',
    es: 'EE.UU.',
    it: 'USA',
    pt: 'EUA',
    nl: 'VS',
    sv: 'USA',
    da: 'USA',
    no: 'USA',
    fi: 'USA'
  },
  'watermelon.png': {
    en: 'Watermelon',
    de: 'Wassermelone',
    fr: 'Pasteque',
    es: 'Sandia',
    it: 'Anguria',
    pt: 'Melancia',
    nl: 'Watermeloen',
    sv: 'Vattenmelon',
    da: 'Vandmelon',
    no: 'Vannmelon',
    fi: 'Vesimeloni'
  }
};

// Generate unique filename (mirrors API logic)
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

// Optimize image (mirrors API logic)
async function optimizeImage(inputBuffer) {
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  // Check if SVG (keep as-is)
  if (metadata.format === 'svg') {
    return {
      buffer: inputBuffer,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: 'svg'
    };
  }

  // Resize if larger than 800x800, convert to WebP
  let pipeline = image;

  if (metadata.width > 800 || metadata.height > 800) {
    pipeline = pipeline.resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  const outputBuffer = await pipeline
    .webp({ quality: 85 })
    .toBuffer();

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
  console.log('4th of July Image Import Script');
  console.log('='.repeat(60));

  // Resolve paths based on environment
  let projectRoot, sourceDir, destDir;

  if (isServer) {
    projectRoot = '/opt/lessoncraftstudio';
    sourceDir = path.join(projectRoot, 'image library', '4th of July');
    destDir = path.join(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  } else {
    projectRoot = path.resolve(__dirname, '..');
    sourceDir = path.resolve(projectRoot, 'image library', '4th of July');
    destDir = path.resolve(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  }

  console.log(`\nSource: ${sourceDir}`);
  console.log(`Destination: ${destDir}`);

  // Check source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error(`\nERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  // Create destination directory
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`\nCreated destination directory: ${destDir}`);
  }

  try {
    // Step 1: Create or update theme
    console.log('\n--- Step 1: Creating/Updating Theme ---');

    let theme = await prisma.imageTheme.findFirst({
      where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
    });

    if (theme) {
      console.log(`Theme "${THEME_CONFIG.name}" already exists (id: ${theme.id})`);
      // Update displayNames if needed
      theme = await prisma.imageTheme.update({
        where: { id: theme.id },
        data: { displayNames: THEME_CONFIG.displayNames }
      });
      console.log('Updated theme displayNames');
    } else {
      theme = await prisma.imageTheme.create({
        data: {
          name: THEME_CONFIG.name,
          type: THEME_CONFIG.type,
          displayNames: THEME_CONFIG.displayNames,
          sortOrder: 0
        }
      });
      console.log(`Created new theme "${THEME_CONFIG.name}" (id: ${theme.id})`);
    }

    // Step 2: Get list of source files
    console.log('\n--- Step 2: Processing Images ---');

    const files = fs.readdirSync(sourceDir).filter(f =>
      f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp') || f.endsWith('.svg')
    );

    console.log(`Found ${files.length} image files`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Get current max sortOrder for this theme
    const maxSortOrder = await prisma.imageLibraryItem.aggregate({
      where: { themeId: theme.id },
      _max: { sortOrder: true }
    });
    let currentSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    for (const filename of files) {
      console.log(`\nProcessing: ${filename}`);

      const translations = IMAGE_TRANSLATIONS[filename];
      if (!translations) {
        console.log(`  WARNING: No translations found for "${filename}", skipping`);
        skipCount++;
        continue;
      }

      const sourcePath = path.resolve(sourceDir, filename);

      try {
        // Read source file
        const inputBuffer = fs.readFileSync(sourcePath);
        const inputStats = fs.statSync(sourcePath);

        // Optimize image
        const optimized = await optimizeImage(inputBuffer);

        // Generate unique filename
        const newFilename = generateUniqueFilename(filename);
        const destPath = path.resolve(destDir, newFilename);
        const relativeFilePath = `/images/${THEME_CONFIG.name}/${newFilename}`;

        // Save optimized image
        fs.writeFileSync(destPath, optimized.buffer);
        console.log(`  Saved: ${newFilename} (${optimized.width}x${optimized.height})`);

        // Check if image already exists in database (by original filename pattern)
        const existingImage = await prisma.imageLibraryItem.findFirst({
          where: {
            themeId: theme.id,
            translations: {
              path: ['en'],
              equals: translations.en
            }
          }
        });

        if (existingImage) {
          console.log(`  Image "${translations.en}" already exists in database, updating...`);
          await prisma.imageLibraryItem.update({
            where: { id: existingImage.id },
            data: {
              translations: translations,
              filePath: relativeFilePath,
              filename: newFilename,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height
            }
          });
        } else {
          // Create database record
          await prisma.imageLibraryItem.create({
            data: {
              themeId: theme.id,
              filename: newFilename,
              filePath: relativeFilePath,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height,
              translations: translations,
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

    // Step 3: Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Theme: ${THEME_CONFIG.name}`);
    console.log(`Theme ID: ${theme.id}`);
    console.log(`\nResults:`);
    console.log(`  Success: ${successCount}`);
    console.log(`  Skipped: ${skipCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`\nImages saved to: ${destDir}`);

    // Sync to standalone build (production only)
    if (isServer) {
      const standaloneDir = path.join(projectRoot, 'frontend', '.next', 'standalone', 'public', 'images', THEME_CONFIG.name);
      console.log(`\n--- Syncing to standalone build ---`);
      if (!fs.existsSync(standaloneDir)) {
        fs.mkdirSync(standaloneDir, { recursive: true });
      }
      const destFiles = fs.readdirSync(destDir);
      for (const file of destFiles) {
        const src = path.join(destDir, file);
        const dest = path.join(standaloneDir, file);
        fs.copyFileSync(src, dest);
      }
      console.log(`Copied ${destFiles.length} files to standalone build`);
    } else {
      const standaloneDir = path.resolve(frontendRoot, '.next', 'standalone', 'public', 'images', THEME_CONFIG.name);
      console.log(`\n--- IMPORTANT ---`);
      console.log(`For production, sync images to standalone build:`);
      console.log(`  mkdir -p "${standaloneDir}"`);
      console.log(`  cp -r "${destDir}"/* "${standaloneDir}/"`);
    }

  } catch (error) {
    console.error('\nFATAL ERROR:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
