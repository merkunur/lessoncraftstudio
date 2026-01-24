/**
 * Import Script: Desserts and Sweets Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-desserts-and-sweets-images.js
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
// CONFIGURATION - DESSERTS AND SWEETS THEME
// ============================================================

const THEME_CONFIG = {
  name: 'desserts_and_sweets',
  type: 'images',
  sourceFolderName: 'desserts and sweets',
  displayNames: {
    en: 'Desserts and Sweets',          // American English
    de: 'Desserts und Süßigkeiten',     // German
    fr: 'Desserts et sucreries',        // French
    es: 'Postres y dulces',             // Mexican Spanish
    it: 'Dolci e dolciumi',             // Italian
    pt: 'Sobremesas e doces',           // Brazilian Portuguese
    nl: 'Desserts en snoep',            // Dutch
    sv: 'Efterrätter och godis',        // Swedish
    da: 'Desserter og slik',            // Danish
    no: 'Desserter og godteri',         // Norwegian
    fi: 'Jälkiruoat ja makeiset'        // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'apple pie.png': {
    en: 'Apple Pie',                    // American English
    de: 'Apfelkuchen',                  // German
    fr: 'Tarte aux pommes',             // French
    es: 'Pay de manzana',               // Mexican Spanish
    it: 'Torta di mele',                // Italian
    pt: 'Torta de maçã',                // Brazilian Portuguese
    nl: 'Appeltaart',                   // Dutch
    sv: 'Äppelpaj',                     // Swedish
    da: 'Æbletærte',                    // Danish
    no: 'Eplekake',                     // Norwegian
    fi: 'Omenapiirakka'                 // Finnish
  },
  'brownie.png': {
    en: 'Brownie',                      // American English
    de: 'Brownie',                      // German
    fr: 'Brownie',                      // French
    es: 'Brownie',                      // Mexican Spanish
    it: 'Brownie',                      // Italian
    pt: 'Brownie',                      // Brazilian Portuguese
    nl: 'Brownie',                      // Dutch
    sv: 'Brownie',                      // Swedish
    da: 'Brownie',                      // Danish
    no: 'Brownie',                      // Norwegian
    fi: 'Brownie'                       // Finnish
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
  'candy cane.png': {
    en: 'Candy Cane',                   // American English
    de: 'Zuckerstange',                 // German
    fr: 'Sucre d\'orge',                // French
    es: 'Bastón de caramelo',           // Mexican Spanish
    it: 'Bastoncino di zucchero',       // Italian
    pt: 'Bengala de doce',              // Brazilian Portuguese
    nl: 'Zuurstok',                     // Dutch
    sv: 'Polkagris',                    // Swedish
    da: 'Sukkerstang',                  // Danish
    no: 'Sukkerstang',                  // Norwegian
    fi: 'Karamellitanko'                // Finnish
  },
  'chocolate bar.png': {
    en: 'Chocolate Bar',                // American English
    de: 'Schokoladenriegel',            // German
    fr: 'Barre de chocolat',            // French
    es: 'Barra de chocolate',           // Mexican Spanish
    it: 'Barretta di cioccolato',       // Italian
    pt: 'Barra de chocolate',           // Brazilian Portuguese
    nl: 'Chocoladereep',                // Dutch
    sv: 'Chokladkaka',                  // Swedish
    da: 'Chokoladebar',                 // Danish
    no: 'Sjokoladeplate',               // Norwegian
    fi: 'Suklaapatukka'                 // Finnish
  },
  'cinnamon roll.png': {
    en: 'Cinnamon Roll',                // American English
    de: 'Zimtschnecke',                 // German
    fr: 'Roulé à la cannelle',          // French
    es: 'Rollo de canela',              // Mexican Spanish
    it: 'Rotolo alla cannella',         // Italian
    pt: 'Pão de canela',                // Brazilian Portuguese
    nl: 'Kaneelbroodje',                // Dutch
    sv: 'Kanelbulle',                   // Swedish
    da: 'Kanelsnegl',                   // Danish
    no: 'Kanelbolle',                   // Norwegian
    fi: 'Korvapuusti'                   // Finnish
  },
  'cookie.png': {
    en: 'Cookie',                       // American English
    de: 'Keks',                         // German
    fr: 'Cookie',                       // French
    es: 'Galleta',                      // Mexican Spanish
    it: 'Biscotto',                     // Italian
    pt: 'Cookie',                       // Brazilian Portuguese
    nl: 'Koekje',                       // Dutch
    sv: 'Kaka',                         // Swedish
    da: 'Småkage',                      // Danish
    no: 'Kjeks',                        // Norwegian
    fi: 'Keksi'                         // Finnish
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
  'gingerbread man.png': {
    en: 'Gingerbread Man',              // American English
    de: 'Lebkuchenmann',                // German
    fr: 'Bonhomme en pain d\'épices',   // French
    es: 'Hombre de jengibre',           // Mexican Spanish
    it: 'Omino di pan di zenzero',      // Italian
    pt: 'Boneco de gengibre',           // Brazilian Portuguese
    nl: 'Peperkoekmannetje',            // Dutch
    sv: 'Pepparkaksgubbe',              // Swedish
    da: 'Peberkage-mand',               // Danish
    no: 'Pepperkakemann',               // Norwegian
    fi: 'Piparkakkuukko'                // Finnish
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
  'macaron.png': {
    en: 'Macaron',                      // American English
    de: 'Macaron',                      // German
    fr: 'Macaron',                      // French
    es: 'Macarrón',                     // Mexican Spanish
    it: 'Macaron',                      // Italian
    pt: 'Macaron',                      // Brazilian Portuguese
    nl: 'Macaron',                      // Dutch
    sv: 'Macaron',                      // Swedish
    da: 'Macaron',                      // Danish
    no: 'Makron',                       // Norwegian
    fi: 'Macaron'                       // Finnish
  },
  'milkshake.png': {
    en: 'Milkshake',                    // American English
    de: 'Milchshake',                   // German
    fr: 'Milkshake',                    // French
    es: 'Malteada',                     // Mexican Spanish
    it: 'Frappè',                       // Italian
    pt: 'Milkshake',                    // Brazilian Portuguese
    nl: 'Milkshake',                    // Dutch
    sv: 'Milkshake',                    // Swedish
    da: 'Milkshake',                    // Danish
    no: 'Milkshake',                    // Norwegian
    fi: 'Pirtelö'                       // Finnish
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
  'pancake.png': {
    en: 'Pancake',                      // American English
    de: 'Pfannkuchen',                  // German
    fr: 'Crêpe',                        // French
    es: 'Hotcake',                      // Mexican Spanish
    it: 'Pancake',                      // Italian
    pt: 'Panqueca',                     // Brazilian Portuguese
    nl: 'Pannenkoek',                   // Dutch
    sv: 'Pannkaka',                     // Swedish
    da: 'Pandekage',                    // Danish
    no: 'Pannekake',                    // Norwegian
    fi: 'Lettu'                         // Finnish
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
  'popsicle.png': {
    en: 'Popsicle',                     // American English
    de: 'Eis am Stiel',                 // German
    fr: 'Glace à l\'eau',               // French
    es: 'Paleta helada',                // Mexican Spanish
    it: 'Ghiacciolo',                   // Italian
    pt: 'Picolé',                       // Brazilian Portuguese
    nl: 'IJslolly',                     // Dutch
    sv: 'Isglass',                      // Swedish
    da: 'Ispind',                       // Danish
    no: 'Ispinne',                      // Norwegian
    fi: 'Mehujää'                       // Finnish
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
  'tart.png': {
    en: 'Tart',                         // American English
    de: 'Torte',                        // German
    fr: 'Tartelette',                   // French
    es: 'Tarta',                        // Mexican Spanish
    it: 'Crostatina',                   // Italian
    pt: 'Tortinha',                     // Brazilian Portuguese
    nl: 'Taartje',                      // Dutch
    sv: 'Tårta',                        // Swedish
    da: 'Tærte',                        // Danish
    no: 'Terte',                        // Norwegian
    fi: 'Torttu'                        // Finnish
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
