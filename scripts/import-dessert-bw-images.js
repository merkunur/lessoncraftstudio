/**
 * Import Script: Dessert BW (Black and White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-dessert-bw-images.js
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
// CONFIGURATION - DESSERT BW THEME
// ============================================================

const THEME_CONFIG = {
  name: 'dessert_bw',
  type: 'images',
  sourceFolderName: 'dessert bw',
  displayNames: {
    en: 'Dessert (B&W)',                // American English
    de: 'Nachtisch (S/W)',              // German
    fr: 'Dessert (N&B)',                // French
    es: 'Postre (B/N)',                 // Mexican Spanish
    it: 'Dolce (B/N)',                  // Italian
    pt: 'Sobremesa (P&B)',              // Brazilian Portuguese
    nl: 'Nagerecht (Z/W)',              // Dutch
    sv: 'Efterrätt (S/V)',              // Swedish
    da: 'Dessert (S/H)',                // Danish
    no: 'Dessert (S/H)',                // Norwegian
    fi: 'Jälkiruoka (M/V)'              // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'biscuit.png': {
    en: 'Biscuit',                      // American English
    de: 'Keks',                         // German
    fr: 'Biscuit',                      // French
    es: 'Galleta',                      // Mexican Spanish
    it: 'Biscotto',                     // Italian
    pt: 'Biscoito',                     // Brazilian Portuguese
    nl: 'Koekje',                       // Dutch
    sv: 'Kex',                          // Swedish
    da: 'Kiks',                         // Danish
    no: 'Kjeks',                        // Norwegian
    fi: 'Keksi'                         // Finnish
  },
  'cake.png': {
    en: 'Cake',                         // American English
    de: 'Kuchen',                       // German
    fr: 'Gâteau',                       // French
    es: 'Pastel',                       // Mexican Spanish
    it: 'Torta',                        // Italian
    pt: 'Bolo',                         // Brazilian Portuguese
    nl: 'Taart',                        // Dutch
    sv: 'Tårta',                        // Swedish
    da: 'Kage',                         // Danish
    no: 'Kake',                         // Norwegian
    fi: 'Kakku'                         // Finnish
  },
  'cake 2.png': {
    en: 'Layer Cake',                   // American English
    de: 'Schichtkuchen',                // German
    fr: 'Gâteau à étages',              // French
    es: 'Pastel de capas',              // Mexican Spanish
    it: 'Torta a strati',               // Italian
    pt: 'Bolo de camadas',              // Brazilian Portuguese
    nl: 'Laagjestaart',                 // Dutch
    sv: 'Lagertårta',                   // Swedish
    da: 'Lagkage',                      // Danish
    no: 'Lagkake',                      // Norwegian
    fi: 'Kerroskakku'                   // Finnish
  },
  'candy.png': {
    en: 'Candy',                        // American English
    de: 'Bonbon',                       // German
    fr: 'Bonbon',                       // French
    es: 'Dulce',                        // Mexican Spanish
    it: 'Caramella',                    // Italian
    pt: 'Doce',                         // Brazilian Portuguese
    nl: 'Snoep',                        // Dutch
    sv: 'Godis',                        // Swedish
    da: 'Slik',                         // Danish
    no: 'Godteri',                      // Norwegian
    fi: 'Karkki'                        // Finnish
  },
  'chocolate.png': {
    en: 'Chocolate',                    // American English
    de: 'Schokolade',                   // German
    fr: 'Chocolat',                     // French
    es: 'Chocolate',                    // Mexican Spanish
    it: 'Cioccolato',                   // Italian
    pt: 'Chocolate',                    // Brazilian Portuguese
    nl: 'Chocolade',                    // Dutch
    sv: 'Choklad',                      // Swedish
    da: 'Chokolade',                    // Danish
    no: 'Sjokolade',                    // Norwegian
    fi: 'Suklaa'                        // Finnish
  },
  'cupcake.png': {
    en: 'Cupcake',                      // American English
    de: 'Cupcake',                      // German
    fr: 'Cupcake',                      // French
    es: 'Cupcake',                      // Mexican Spanish
    it: 'Cupcake',                      // Italian
    pt: 'Cupcake',                      // Brazilian Portuguese
    nl: 'Cupcake',                      // Dutch
    sv: 'Cupcake',                      // Swedish
    da: 'Cupcake',                      // Danish
    no: 'Cupcake',                      // Norwegian
    fi: 'Kuppikakku'                    // Finnish
  },
  'donut.png': {
    en: 'Donut',                        // American English
    de: 'Donut',                        // German
    fr: 'Beignet',                      // French
    es: 'Dona',                         // Mexican Spanish
    it: 'Ciambella',                    // Italian
    pt: 'Rosquinha',                    // Brazilian Portuguese
    nl: 'Donut',                        // Dutch
    sv: 'Munk',                         // Swedish
    da: 'Doughnut',                     // Danish
    no: 'Smultring',                    // Norwegian
    fi: 'Donitsi'                       // Finnish
  },
  'ice cream.png': {
    en: 'Ice Cream',                    // American English
    de: 'Eiscreme',                     // German
    fr: 'Glace',                        // French
    es: 'Helado',                       // Mexican Spanish
    it: 'Gelato',                       // Italian
    pt: 'Sorvete',                      // Brazilian Portuguese
    nl: 'IJsje',                        // Dutch
    sv: 'Glass',                        // Swedish
    da: 'Is',                           // Danish
    no: 'Iskrem',                       // Norwegian
    fi: 'Jäätelö'                       // Finnish
  },
  'ice pop.png': {
    en: 'Ice Pop',                      // American English
    de: 'Eis am Stiel',                 // German
    fr: 'Glace à l\'eau',               // French
    es: 'Paleta',                       // Mexican Spanish
    it: 'Ghiacciolo',                   // Italian
    pt: 'Picolé',                       // Brazilian Portuguese
    nl: 'IJslolly',                     // Dutch
    sv: 'Isglass',                      // Swedish
    da: 'Ispind',                       // Danish
    no: 'Ispinne',                      // Norwegian
    fi: 'Mehujää'                       // Finnish
  },
  'lollipop.png': {
    en: 'Lollipop',                     // American English
    de: 'Lutscher',                     // German
    fr: 'Sucette',                      // French
    es: 'Paleta',                       // Mexican Spanish
    it: 'Lecca-lecca',                  // Italian
    pt: 'Pirulito',                     // Brazilian Portuguese
    nl: 'Lolly',                        // Dutch
    sv: 'Klubba',                       // Swedish
    da: 'Slikkepind',                   // Danish
    no: 'Kjærlighet på pinne',          // Norwegian
    fi: 'Tikkari'                       // Finnish
  },
  'muffin.png': {
    en: 'Muffin',                       // American English
    de: 'Muffin',                       // German
    fr: 'Muffin',                       // French
    es: 'Muffin',                       // Mexican Spanish
    it: 'Muffin',                       // Italian
    pt: 'Muffin',                       // Brazilian Portuguese
    nl: 'Muffin',                       // Dutch
    sv: 'Muffin',                       // Swedish
    da: 'Muffin',                       // Danish
    no: 'Muffins',                      // Norwegian
    fi: 'Muffini'                       // Finnish
  },
  'pie.png': {
    en: 'Pie',                          // American English
    de: 'Kuchen',                       // German
    fr: 'Tarte',                        // French
    es: 'Pay',                          // Mexican Spanish
    it: 'Crostata',                     // Italian
    pt: 'Torta',                        // Brazilian Portuguese
    nl: 'Taart',                        // Dutch
    sv: 'Paj',                          // Swedish
    da: 'Tærte',                        // Danish
    no: 'Pai',                          // Norwegian
    fi: 'Piirakka'                      // Finnish
  },
  'pudding.png': {
    en: 'Pudding',                      // American English
    de: 'Pudding',                      // German
    fr: 'Pudding',                      // French
    es: 'Pudín',                        // Mexican Spanish
    it: 'Budino',                       // Italian
    pt: 'Pudim',                        // Brazilian Portuguese
    nl: 'Pudding',                      // Dutch
    sv: 'Pudding',                      // Swedish
    da: 'Budding',                      // Danish
    no: 'Pudding',                      // Norwegian
    fi: 'Vanukas'                       // Finnish
  },
  'sundae.png': {
    en: 'Sundae',                       // American English
    de: 'Eisbecher',                    // German
    fr: 'Coupe glacée',                 // French
    es: 'Sundae',                       // Mexican Spanish
    it: 'Coppa gelato',                 // Italian
    pt: 'Sundae',                       // Brazilian Portuguese
    nl: 'IJscoupe',                     // Dutch
    sv: 'Glassbägare',                  // Swedish
    da: 'Isbæger',                      // Danish
    no: 'Iskrembeger',                  // Norwegian
    fi: 'Jäätelöannos'                  // Finnish
  },
  'waffle.png': {
    en: 'Waffle',                       // American English
    de: 'Waffel',                       // German
    fr: 'Gaufre',                       // French
    es: 'Waffle',                       // Mexican Spanish
    it: 'Waffle',                       // Italian
    pt: 'Waffle',                       // Brazilian Portuguese
    nl: 'Wafel',                        // Dutch
    sv: 'Våffla',                       // Swedish
    da: 'Vaffel',                       // Danish
    no: 'Vaffel',                       // Norwegian
    fi: 'Vohveli'                       // Finnish
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
