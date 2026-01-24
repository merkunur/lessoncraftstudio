/**
 * Import Script: Bakery Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-bakery-images.js
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
  name: 'bakery',
  type: 'images',
  displayNames: {
    en: 'Bakery',
    de: 'Bäckerei',
    fr: 'Boulangerie',
    es: 'Panadería',
    it: 'Panetteria',
    pt: 'Padaria',
    nl: 'Bakkerij',
    sv: 'Bageri',
    da: 'Bageri',
    no: 'Bakeri',
    fi: 'Leipomo'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'bagel.png': {
    en: 'Bagel',
    de: 'Bagel',
    fr: 'Bagel',
    es: 'Bagel',
    it: 'Bagel',
    pt: 'Bagel',
    nl: 'Bagel',
    sv: 'Bagel',
    da: 'Bagel',
    no: 'Bagel',
    fi: 'Bageli'
  },
  'baguette.png': {
    en: 'Baguette',
    de: 'Baguette',
    fr: 'Baguette',
    es: 'Baguette',
    it: 'Baguette',
    pt: 'Baguete',
    nl: 'Stokbrood',
    sv: 'Baguette',
    da: 'Baguette',
    no: 'Baguett',
    fi: 'Patonki'
  },
  'brownie.png': {
    en: 'Brownie',
    de: 'Brownie',
    fr: 'Brownie',
    es: 'Brownie',
    it: 'Brownie',
    pt: 'Brownie',
    nl: 'Brownie',
    sv: 'Brownie',
    da: 'Brownie',
    no: 'Brownie',
    fi: 'Brownie'
  },
  'bun.png': {
    en: 'Bun',
    de: 'Brötchen',
    fr: 'Petit pain',
    es: 'Bollo',
    it: 'Panino',
    pt: 'Pãozinho',
    nl: 'Broodje',
    sv: 'Bulle',
    da: 'Bolle',
    no: 'Rundstykke',
    fi: 'Sämpylä'
  },
  'cake.png': {
    en: 'Cake',
    de: 'Kuchen',
    fr: 'Gâteau',
    es: 'Pastel',
    it: 'Torta',
    pt: 'Bolo',
    nl: 'Taart',
    sv: 'Tårta',
    da: 'Kage',
    no: 'Kake',
    fi: 'Kakku'
  },
  'cheesecake.png': {
    en: 'Cheesecake',
    de: 'Käsekuchen',
    fr: 'Cheesecake',
    es: 'Pastel de queso',
    it: 'Cheesecake',
    pt: 'Cheesecake',
    nl: 'Kaastaart',
    sv: 'Cheesecake',
    da: 'Cheesecake',
    no: 'Ostekake',
    fi: 'Juustokakku'
  },
  'cinnamon roll.png': {
    en: 'Cinnamon Roll',
    de: 'Zimtschnecke',
    fr: 'Roulé à la cannelle',
    es: 'Rol de canela',
    it: 'Rotolo alla cannella',
    pt: 'Pão de canela',
    nl: 'Kaneelbroodje',
    sv: 'Kanelbulle',
    da: 'Kanelsnegl',
    no: 'Kanelbolle',
    fi: 'Korvapuusti'
  },
  'cookie.png': {
    en: 'Cookie',
    de: 'Keks',
    fr: 'Biscuit',
    es: 'Galleta',
    it: 'Biscotto',
    pt: 'Biscoito',
    nl: 'Koekje',
    sv: 'Kaka',
    da: 'Småkage',
    no: 'Kjeks',
    fi: 'Keksi'
  },
  'croissant.png': {
    en: 'Croissant',
    de: 'Croissant',
    fr: 'Croissant',
    es: 'Cuerno',
    it: 'Cornetto',
    pt: 'Croissant',
    nl: 'Croissant',
    sv: 'Croissant',
    da: 'Croissant',
    no: 'Croissant',
    fi: 'Croissant'
  },
  'cupcake.png': {
    en: 'Cupcake',
    de: 'Cupcake',
    fr: 'Cupcake',
    es: 'Panquecito',
    it: 'Cupcake',
    pt: 'Cupcake',
    nl: 'Cupcake',
    sv: 'Cupcake',
    da: 'Cupcake',
    no: 'Cupcake',
    fi: 'Kuppikakku'
  },
  'doughnut.png': {
    en: 'Doughnut',
    de: 'Donut',
    fr: 'Beignet',
    es: 'Dona',
    it: 'Ciambella',
    pt: 'Rosquinha',
    nl: 'Donut',
    sv: 'Munk',
    da: 'Doughnut',
    no: 'Smultring',
    fi: 'Donitsi'
  },
  'eclair.png': {
    en: 'Eclair',
    de: 'Eclair',
    fr: 'Éclair',
    es: 'Eclair',
    it: 'Eclair',
    pt: 'Bomba de chocolate',
    nl: 'Eclair',
    sv: 'Eclair',
    da: 'Eclair',
    no: 'Eclair',
    fi: 'Tuulihattu'
  },
  'gingerbread man.png': {
    en: 'Gingerbread Man',
    de: 'Lebkuchenmann',
    fr: 'Bonhomme en pain d\'épices',
    es: 'Hombre de jengibre',
    it: 'Omino di pan di zenzero',
    pt: 'Boneco de gengibre',
    nl: 'Speculaaspop',
    sv: 'Pepparkaksgubbe',
    da: 'Peberkagesmand',
    no: 'Pepperkakemann',
    fi: 'Piparkakkuukko'
  },
  'muffin.png': {
    en: 'Muffin',
    de: 'Muffin',
    fr: 'Muffin',
    es: 'Muffin',
    it: 'Muffin',
    pt: 'Muffin',
    nl: 'Muffin',
    sv: 'Muffin',
    da: 'Muffin',
    no: 'Muffins',
    fi: 'Muffini'
  },
  'pie.png': {
    en: 'Pie',
    de: 'Kuchen',
    fr: 'Tarte',
    es: 'Pay',
    it: 'Torta',
    pt: 'Torta',
    nl: 'Taart',
    sv: 'Paj',
    da: 'Tærte',
    no: 'Pai',
    fi: 'Piirakka'
  },
  'pretzel.png': {
    en: 'Pretzel',
    de: 'Brezel',
    fr: 'Bretzel',
    es: 'Pretzel',
    it: 'Pretzel',
    pt: 'Pretzel',
    nl: 'Pretzel',
    sv: 'Kringla',
    da: 'Kringle',
    no: 'Kringle',
    fi: 'Rinkeli'
  },
  'tart.png': {
    en: 'Tart',
    de: 'Torte',
    fr: 'Tartelette',
    es: 'Tarta',
    it: 'Crostata',
    pt: 'Torta',
    nl: 'Taartje',
    sv: 'Tårta',
    da: 'Tærte',
    no: 'Terte',
    fi: 'Torttu'
  },
  'toast.png': {
    en: 'Toast',
    de: 'Toast',
    fr: 'Toast',
    es: 'Pan tostado',
    it: 'Toast',
    pt: 'Torrada',
    nl: 'Toast',
    sv: 'Rostat bröd',
    da: 'Ristet brød',
    no: 'Toast',
    fi: 'Paahtoleipä'
  },
  'waffle.png': {
    en: 'Waffle',
    de: 'Waffel',
    fr: 'Gaufre',
    es: 'Waffle',
    it: 'Waffle',
    pt: 'Waffle',
    nl: 'Wafel',
    sv: 'Våffla',
    da: 'Vaffel',
    no: 'Vaffel',
    fi: 'Vohveli'
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
  const sourceFolderName = THEME_CONFIG.displayNames.en;

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
