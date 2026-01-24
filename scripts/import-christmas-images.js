/**
 * Import Script: Christmas Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-christmas-images.js
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
// CONFIGURATION - CHRISTMAS THEME
// ============================================================

const THEME_CONFIG = {
  name: 'christmas',
  type: 'images',
  sourceFolderName: 'christmas',
  displayNames: {
    en: 'Christmas',                  // American English
    de: 'Weihnachten',                // German
    fr: 'Noël',                       // French
    es: 'Navidad',                    // Mexican Spanish
    it: 'Natale',                     // Italian
    pt: 'Natal',                      // Brazilian Portuguese
    nl: 'Kerstmis',                   // Dutch
    sv: 'Jul',                        // Swedish
    da: 'Jul',                        // Danish
    no: 'Jul',                        // Norwegian
    fi: 'Joulu'                       // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'angel.png': {
    en: 'Angel',                      // American English
    de: 'Engel',                      // German
    fr: 'Ange',                       // French
    es: 'Ángel',                      // Mexican Spanish
    it: 'Angelo',                     // Italian
    pt: 'Anjo',                       // Brazilian Portuguese
    nl: 'Engel',                      // Dutch
    sv: 'Ängel',                      // Swedish
    da: 'Engel',                      // Danish
    no: 'Engel',                      // Norwegian
    fi: 'Enkeli'                      // Finnish
  },
  'bell.png': {
    en: 'Bell',                       // American English
    de: 'Glocke',                     // German
    fr: 'Cloche',                     // French
    es: 'Campana',                    // Mexican Spanish
    it: 'Campana',                    // Italian
    pt: 'Sino',                       // Brazilian Portuguese
    nl: 'Bel',                        // Dutch
    sv: 'Klocka',                     // Swedish
    da: 'Klokke',                     // Danish
    no: 'Bjelle',                     // Norwegian
    fi: 'Kello'                       // Finnish
  },
  'candle.png': {
    en: 'Candle',                     // American English
    de: 'Kerze',                      // German
    fr: 'Bougie',                     // French
    es: 'Vela',                       // Mexican Spanish
    it: 'Candela',                    // Italian
    pt: 'Vela',                       // Brazilian Portuguese
    nl: 'Kaars',                      // Dutch
    sv: 'Ljus',                       // Swedish
    da: 'Stearinlys',                 // Danish
    no: 'Stearinlys',                 // Norwegian
    fi: 'Kynttilä'                    // Finnish
  },
  'candy cane.png': {
    en: 'Candy Cane',                 // American English
    de: 'Zuckerstange',               // German
    fr: 'Sucre d\'orge',              // French
    es: 'Bastón de caramelo',         // Mexican Spanish
    it: 'Bastoncino di zucchero',     // Italian
    pt: 'Bengala de doce',            // Brazilian Portuguese
    nl: 'Zuurstok',                   // Dutch
    sv: 'Polkagris',                  // Swedish
    da: 'Sukkerstang',                // Danish
    no: 'Sukkerstang',                // Norwegian
    fi: 'Karamellitanko'              // Finnish
  },
  'chimney.png': {
    en: 'Chimney',                    // American English
    de: 'Schornstein',                // German
    fr: 'Cheminée',                   // French
    es: 'Chimenea',                   // Mexican Spanish
    it: 'Camino',                     // Italian
    pt: 'Chaminé',                    // Brazilian Portuguese
    nl: 'Schoorsteen',                // Dutch
    sv: 'Skorsten',                   // Swedish
    da: 'Skorsten',                   // Danish
    no: 'Pipe',                       // Norwegian
    fi: 'Savupiippu'                  // Finnish
  },
  'church.png': {
    en: 'Church',                     // American English
    de: 'Kirche',                     // German
    fr: 'Église',                     // French
    es: 'Iglesia',                    // Mexican Spanish
    it: 'Chiesa',                     // Italian
    pt: 'Igreja',                     // Brazilian Portuguese
    nl: 'Kerk',                       // Dutch
    sv: 'Kyrka',                      // Swedish
    da: 'Kirke',                      // Danish
    no: 'Kirke',                      // Norwegian
    fi: 'Kirkko'                      // Finnish
  },
  'cookie.png': {
    en: 'Cookie',                     // American English
    de: 'Keks',                       // German
    fr: 'Biscuit',                    // French
    es: 'Galleta',                    // Mexican Spanish
    it: 'Biscotto',                   // Italian
    pt: 'Biscoito',                   // Brazilian Portuguese
    nl: 'Koekje',                     // Dutch
    sv: 'Kaka',                       // Swedish
    da: 'Småkage',                    // Danish
    no: 'Kjeks',                      // Norwegian
    fi: 'Keksi'                       // Finnish
  },
  'crystal ball.png': {
    en: 'Snow Globe',                 // American English
    de: 'Schneekugel',                // German
    fr: 'Boule à neige',              // French
    es: 'Bola de nieve',              // Mexican Spanish
    it: 'Palla di neve',              // Italian
    pt: 'Globo de neve',              // Brazilian Portuguese
    nl: 'Sneeuwbol',                  // Dutch
    sv: 'Snöglob',                    // Swedish
    da: 'Snekugle',                   // Danish
    no: 'Snøkule',                    // Norwegian
    fi: 'Lumipallo'                   // Finnish
  },
  'elf.png': {
    en: 'Elf',                        // American English
    de: 'Elf',                        // German
    fr: 'Lutin',                      // French
    es: 'Duende',                     // Mexican Spanish
    it: 'Elfo',                       // Italian
    pt: 'Elfo',                       // Brazilian Portuguese
    nl: 'Elf',                        // Dutch
    sv: 'Tomtenisse',                 // Swedish
    da: 'Nisse',                      // Danish
    no: 'Nisse',                      // Norwegian
    fi: 'Tonttu'                      // Finnish
  },
  'garland.png': {
    en: 'Garland',                    // American English
    de: 'Girlande',                   // German
    fr: 'Guirlande',                  // French
    es: 'Guirnalda',                  // Mexican Spanish
    it: 'Ghirlanda',                  // Italian
    pt: 'Guirlanda',                  // Brazilian Portuguese
    nl: 'Slinger',                    // Dutch
    sv: 'Girlang',                    // Swedish
    da: 'Guirlande',                  // Danish
    no: 'Girlander',                  // Norwegian
    fi: 'Köynnös'                     // Finnish
  },
  'gingerbread.png': {
    en: 'Gingerbread',                // American English
    de: 'Lebkuchen',                  // German
    fr: 'Pain d\'épices',             // French
    es: 'Pan de jengibre',            // Mexican Spanish
    it: 'Pan di zenzero',             // Italian
    pt: 'Pão de gengibre',            // Brazilian Portuguese
    nl: 'Peperkoek',                  // Dutch
    sv: 'Pepparkaka',                 // Swedish
    da: 'Honningkage',                // Danish
    no: 'Pepperkake',                 // Norwegian
    fi: 'Piparkakku'                  // Finnish
  },
  'lights.png': {
    en: 'Lights',                     // American English
    de: 'Lichterkette',               // German
    fr: 'Lumières',                   // French
    es: 'Luces',                      // Mexican Spanish
    it: 'Luci',                       // Italian
    pt: 'Luzes',                      // Brazilian Portuguese
    nl: 'Lichtjes',                   // Dutch
    sv: 'Ljusslingor',                // Swedish
    da: 'Lyskæde',                    // Danish
    no: 'Lyslenke',                   // Norwegian
    fi: 'Valot'                       // Finnish
  },
  'mistletoe.png': {
    en: 'Mistletoe',                  // American English
    de: 'Mistelzweig',                // German
    fr: 'Gui',                        // French
    es: 'Muérdago',                   // Mexican Spanish
    it: 'Vischio',                    // Italian
    pt: 'Visco',                      // Brazilian Portuguese
    nl: 'Maretak',                    // Dutch
    sv: 'Mistel',                     // Swedish
    da: 'Mistelten',                  // Danish
    no: 'Misteltein',                 // Norwegian
    fi: 'Misteli'                     // Finnish
  },
  'nativity.png': {
    en: 'Nativity',                   // American English
    de: 'Krippe',                     // German
    fr: 'Crèche',                     // French
    es: 'Nacimiento',                 // Mexican Spanish
    it: 'Presepe',                    // Italian
    pt: 'Presépio',                   // Brazilian Portuguese
    nl: 'Kerststal',                  // Dutch
    sv: 'Julkrubba',                  // Swedish
    da: 'Julekrybbe',                 // Danish
    no: 'Julekrybbe',                 // Norwegian
    fi: 'Jouluseimi'                  // Finnish
  },
  'nutcracker.png': {
    en: 'Nutcracker',                 // American English
    de: 'Nussknacker',                // German
    fr: 'Casse-noisette',             // French
    es: 'Cascanueces',                // Mexican Spanish
    it: 'Schiaccianoci',              // Italian
    pt: 'Quebra-nozes',               // Brazilian Portuguese
    nl: 'Notenkraker',                // Dutch
    sv: 'Nötknäppare',                // Swedish
    da: 'Nøddeknækker',               // Danish
    no: 'Nøtteknekker',               // Norwegian
    fi: 'Pähkinänsärkijä'             // Finnish
  },
  'ornament.png': {
    en: 'Ornament',                   // American English
    de: 'Christbaumkugel',            // German
    fr: 'Boule de Noël',              // French
    es: 'Esfera navideña',            // Mexican Spanish
    it: 'Pallina di Natale',          // Italian
    pt: 'Enfeite de Natal',           // Brazilian Portuguese
    nl: 'Kerstbal',                   // Dutch
    sv: 'Julkula',                    // Swedish
    da: 'Julekugle',                  // Danish
    no: 'Julekule',                   // Norwegian
    fi: 'Joulupallo'                  // Finnish
  },
  'present.png': {
    en: 'Present',                    // American English
    de: 'Geschenk',                   // German
    fr: 'Cadeau',                     // French
    es: 'Regalo',                     // Mexican Spanish
    it: 'Regalo',                     // Italian
    pt: 'Presente',                   // Brazilian Portuguese
    nl: 'Cadeau',                     // Dutch
    sv: 'Present',                    // Swedish
    da: 'Gave',                       // Danish
    no: 'Gave',                       // Norwegian
    fi: 'Lahja'                       // Finnish
  },
  'reindeer.png': {
    en: 'Reindeer',                   // American English
    de: 'Rentier',                    // German
    fr: 'Renne',                      // French
    es: 'Reno',                       // Mexican Spanish
    it: 'Renna',                      // Italian
    pt: 'Rena',                       // Brazilian Portuguese
    nl: 'Rendier',                    // Dutch
    sv: 'Ren',                        // Swedish
    da: 'Rensdyr',                    // Danish
    no: 'Reinsdyr',                   // Norwegian
    fi: 'Poro'                        // Finnish
  },
  'ribbon.png': {
    en: 'Ribbon',                     // American English
    de: 'Schleife',                   // German
    fr: 'Ruban',                      // French
    es: 'Listón',                     // Mexican Spanish
    it: 'Nastro',                     // Italian
    pt: 'Fita',                       // Brazilian Portuguese
    nl: 'Lint',                       // Dutch
    sv: 'Band',                       // Swedish
    da: 'Bånd',                       // Danish
    no: 'Bånd',                       // Norwegian
    fi: 'Nauha'                       // Finnish
  },
  'Rudolph.png': {
    en: 'Rudolph',                    // American English
    de: 'Rudolph',                    // German
    fr: 'Rudolph',                    // French
    es: 'Rodolfo',                    // Mexican Spanish
    it: 'Rudolph',                    // Italian
    pt: 'Rudolph',                    // Brazilian Portuguese
    nl: 'Rudolph',                    // Dutch
    sv: 'Rudolf',                     // Swedish
    da: 'Rudolf',                     // Danish
    no: 'Rudolf',                     // Norwegian
    fi: 'Rudolf'                      // Finnish
  },
  'sack.png': {
    en: 'Sack',                       // American English
    de: 'Sack',                       // German
    fr: 'Sac',                        // French
    es: 'Costal',                     // Mexican Spanish
    it: 'Sacco',                      // Italian
    pt: 'Saco',                       // Brazilian Portuguese
    nl: 'Zak',                        // Dutch
    sv: 'Säck',                       // Swedish
    da: 'Sæk',                        // Danish
    no: 'Sekk',                       // Norwegian
    fi: 'Säkki'                       // Finnish
  },
  'Santa.png': {
    en: 'Santa',                      // American English
    de: 'Weihnachtsmann',             // German
    fr: 'Père Noël',                  // French
    es: 'Santa Claus',                // Mexican Spanish
    it: 'Babbo Natale',               // Italian
    pt: 'Papai Noel',                 // Brazilian Portuguese
    nl: 'Kerstman',                   // Dutch
    sv: 'Jultomten',                  // Swedish
    da: 'Julemanden',                 // Danish
    no: 'Julenissen',                 // Norwegian
    fi: 'Joulupukki'                  // Finnish
  },
  'sleigh.png': {
    en: 'Sleigh',                     // American English
    de: 'Schlitten',                  // German
    fr: 'Traîneau',                   // French
    es: 'Trineo',                     // Mexican Spanish
    it: 'Slitta',                     // Italian
    pt: 'Trenó',                      // Brazilian Portuguese
    nl: 'Slee',                       // Dutch
    sv: 'Släde',                      // Swedish
    da: 'Slæde',                      // Danish
    no: 'Slede',                      // Norwegian
    fi: 'Reki'                        // Finnish
  },
  'snowman.png': {
    en: 'Snowman',                    // American English
    de: 'Schneemann',                 // German
    fr: 'Bonhomme de neige',          // French
    es: 'Muñeco de nieve',            // Mexican Spanish
    it: 'Pupazzo di neve',            // Italian
    pt: 'Boneco de neve',             // Brazilian Portuguese
    nl: 'Sneeuwpop',                  // Dutch
    sv: 'Snögubbe',                   // Swedish
    da: 'Snemand',                    // Danish
    no: 'Snømann',                    // Norwegian
    fi: 'Lumiukko'                    // Finnish
  },
  'star.png': {
    en: 'Star',                       // American English
    de: 'Stern',                      // German
    fr: 'Étoile',                     // French
    es: 'Estrella',                   // Mexican Spanish
    it: 'Stella',                     // Italian
    pt: 'Estrela',                    // Brazilian Portuguese
    nl: 'Ster',                       // Dutch
    sv: 'Stjärna',                    // Swedish
    da: 'Stjerne',                    // Danish
    no: 'Stjerne',                    // Norwegian
    fi: 'Tähti'                       // Finnish
  },
  'stocking.png': {
    en: 'Stocking',                   // American English
    de: 'Weihnachtsstrumpf',          // German
    fr: 'Chaussette de Noël',         // French
    es: 'Calcetín navideño',          // Mexican Spanish
    it: 'Calza della Befana',         // Italian
    pt: 'Meia de Natal',              // Brazilian Portuguese
    nl: 'Kerstsok',                   // Dutch
    sv: 'Julstrumpa',                 // Swedish
    da: 'Julestrømpe',                // Danish
    no: 'Julestrømpe',                // Norwegian
    fi: 'Joulusukka'                  // Finnish
  },
  'tree.png': {
    en: 'Christmas Tree',             // American English
    de: 'Weihnachtsbaum',             // German
    fr: 'Sapin de Noël',              // French
    es: 'Árbol de Navidad',           // Mexican Spanish
    it: 'Albero di Natale',           // Italian
    pt: 'Árvore de Natal',            // Brazilian Portuguese
    nl: 'Kerstboom',                  // Dutch
    sv: 'Julgran',                    // Swedish
    da: 'Juletræ',                    // Danish
    no: 'Juletre',                    // Norwegian
    fi: 'Joulukuusi'                  // Finnish
  },
  'wreath.png': {
    en: 'Wreath',                     // American English
    de: 'Kranz',                      // German
    fr: 'Couronne',                   // French
    es: 'Corona navideña',            // Mexican Spanish
    it: 'Ghirlanda',                  // Italian
    pt: 'Guirlanda',                  // Brazilian Portuguese
    nl: 'Krans',                      // Dutch
    sv: 'Krans',                      // Swedish
    da: 'Krans',                      // Danish
    no: 'Krans',                      // Norwegian
    fi: 'Seppele'                     // Finnish
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
