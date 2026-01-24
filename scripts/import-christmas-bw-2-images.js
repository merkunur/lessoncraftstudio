/**
 * Import Script: Christmas Black & White 2 Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-christmas-bw-2-images.js
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
// CONFIGURATION - CHRISTMAS BW 2 THEME
// ============================================================

const THEME_CONFIG = {
  name: 'christmas_bw_2',
  type: 'images',
  sourceFolderName: 'Christmas bw 2',
  displayNames: {
    en: 'Christmas B&W 2',            // American English
    de: 'Weihnachten S/W 2',          // German
    fr: 'Noël N&B 2',                 // French
    es: 'Navidad B&N 2',              // Mexican Spanish
    it: 'Natale B&N 2',               // Italian
    pt: 'Natal P&B 2',                // Brazilian Portuguese
    nl: 'Kerstmis Z/W 2',             // Dutch
    sv: 'Jul S/V 2',                  // Swedish
    da: 'Jul S/H 2',                  // Danish
    no: 'Jul S/H 2',                  // Norwegian
    fi: 'Joulu M/V 2'                 // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
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
  'Christmas stocking.png': {
    en: 'Christmas Stocking',         // American English
    de: 'Weihnachtsstrumpf',          // German
    fr: 'Chaussette de Noël',         // French
    es: 'Calcetín navideño',          // Mexican Spanish
    it: 'Calza di Natale',            // Italian
    pt: 'Meia de Natal',              // Brazilian Portuguese
    nl: 'Kerstsok',                   // Dutch
    sv: 'Julstrumpa',                 // Swedish
    da: 'Julestrømpe',                // Danish
    no: 'Julestrømpe',                // Norwegian
    fi: 'Joulusukka'                  // Finnish
  },
  'Christmas tree.png': {
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
  'cupcake.png': {
    en: 'Cupcake',                    // American English
    de: 'Cupcake',                    // German
    fr: 'Cupcake',                    // French
    es: 'Cupcake',                    // Mexican Spanish
    it: 'Cupcake',                    // Italian
    pt: 'Cupcake',                    // Brazilian Portuguese
    nl: 'Cupcake',                    // Dutch
    sv: 'Cupcake',                    // Swedish
    da: 'Cupcake',                    // Danish
    no: 'Cupcake',                    // Norwegian
    fi: 'Kuppikakku'                  // Finnish
  },
  'fireplace.png': {
    en: 'Fireplace',                  // American English
    de: 'Kamin',                      // German
    fr: 'Cheminée',                   // French
    es: 'Chimenea',                   // Mexican Spanish
    it: 'Camino',                     // Italian
    pt: 'Lareira',                    // Brazilian Portuguese
    nl: 'Open haard',                 // Dutch
    sv: 'Öppen spis',                 // Swedish
    da: 'Pejs',                       // Danish
    no: 'Peis',                       // Norwegian
    fi: 'Takka'                       // Finnish
  },
  'gift box.png': {
    en: 'Gift Box',                   // American English
    de: 'Geschenkbox',                // German
    fr: 'Boîte cadeau',               // French
    es: 'Caja de regalo',             // Mexican Spanish
    it: 'Scatola regalo',             // Italian
    pt: 'Caixa de presente',          // Brazilian Portuguese
    nl: 'Geschenkdoos',               // Dutch
    sv: 'Presentask',                 // Swedish
    da: 'Gaveæske',                   // Danish
    no: 'Gaveeske',                   // Norwegian
    fi: 'Lahjapaketti'                // Finnish
  },
  'gingerbread house.png': {
    en: 'Gingerbread House',          // American English
    de: 'Lebkuchenhaus',              // German
    fr: 'Maison en pain d\'épices',   // French
    es: 'Casa de jengibre',           // Mexican Spanish
    it: 'Casetta di pan di zenzero',  // Italian
    pt: 'Casa de gengibre',           // Brazilian Portuguese
    nl: 'Peperkoekhuis',              // Dutch
    sv: 'Pepparkakshus',              // Swedish
    da: 'Honningkagehus',             // Danish
    no: 'Pepperkakehus',              // Norwegian
    fi: 'Piparkakkutalo'              // Finnish
  },
  'gingerbread man.png': {
    en: 'Gingerbread Man',            // American English
    de: 'Lebkuchenmann',              // German
    fr: 'Bonhomme de pain d\'épices', // French
    es: 'Hombre de jengibre',         // Mexican Spanish
    it: 'Omino di pan di zenzero',    // Italian
    pt: 'Boneco de gengibre',         // Brazilian Portuguese
    nl: 'Peperkoekmannetje',          // Dutch
    sv: 'Pepparkaksgubbe',            // Swedish
    da: 'Honningkagemand',            // Danish
    no: 'Pepperkakemann',             // Norwegian
    fi: 'Piparkakkuukko'              // Finnish
  },
  'ice skates.png': {
    en: 'Ice Skates',                 // American English
    de: 'Schlittschuhe',              // German
    fr: 'Patins à glace',             // French
    es: 'Patines de hielo',           // Mexican Spanish
    it: 'Pattini da ghiaccio',        // Italian
    pt: 'Patins de gelo',             // Brazilian Portuguese
    nl: 'Schaatsen',                  // Dutch
    sv: 'Skridskor',                  // Swedish
    da: 'Skøjter',                    // Danish
    no: 'Skøyter',                    // Norwegian
    fi: 'Luistimet'                   // Finnish
  },
  'mug.png': {
    en: 'Mug',                        // American English
    de: 'Tasse',                      // German
    fr: 'Tasse',                      // French
    es: 'Taza',                       // Mexican Spanish
    it: 'Tazza',                      // Italian
    pt: 'Caneca',                     // Brazilian Portuguese
    nl: 'Mok',                        // Dutch
    sv: 'Mugg',                       // Swedish
    da: 'Krus',                       // Danish
    no: 'Kopp',                       // Norwegian
    fi: 'Muki'                        // Finnish
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
  'Santa Claus.png': {
    en: 'Santa Claus',                // American English
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
  'snow globe.png': {
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
  'winter jacket.png': {
    en: 'Winter Jacket',              // American English
    de: 'Winterjacke',                // German
    fr: 'Veste d\'hiver',             // French
    es: 'Chamarra de invierno',       // Mexican Spanish
    it: 'Giacca invernale',           // Italian
    pt: 'Jaqueta de inverno',         // Brazilian Portuguese
    nl: 'Winterjas',                  // Dutch
    sv: 'Vinterjacka',                // Swedish
    da: 'Vinterjakke',                // Danish
    no: 'Vinterjakke',                // Norwegian
    fi: 'Talvitakki'                  // Finnish
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
