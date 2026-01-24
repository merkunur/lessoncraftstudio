/**
 * Import Script: Breakfast Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-breakfast-images.js
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
// CONFIGURATION - BREAKFAST THEME
// ============================================================

const THEME_CONFIG = {
  name: 'breakfast',
  type: 'images',
  sourceFolderName: 'breakfast',
  displayNames: {
    en: 'Breakfast',                  // American English
    de: 'Frühstück',                  // German
    fr: 'Petit-déjeuner',             // French
    es: 'Desayuno',                   // Mexican Spanish
    it: 'Colazione',                  // Italian
    pt: 'Café da manhã',              // Brazilian Portuguese
    nl: 'Ontbijt',                    // Dutch
    sv: 'Frukost',                    // Swedish
    da: 'Morgenmad',                  // Danish
    no: 'Frokost',                    // Norwegian
    fi: 'Aamiainen'                   // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'apple.png': {
    en: 'Apple',                      // American English
    de: 'Apfel',                      // German
    fr: 'Pomme',                      // French
    es: 'Manzana',                    // Mexican Spanish
    it: 'Mela',                       // Italian
    pt: 'Maçã',                       // Brazilian Portuguese
    nl: 'Appel',                      // Dutch
    sv: 'Äpple',                      // Swedish
    da: 'Æble',                       // Danish
    no: 'Eple',                       // Norwegian
    fi: 'Omena'                       // Finnish
  },
  'bacon.png': {
    en: 'Bacon',                      // American English
    de: 'Speck',                      // German
    fr: 'Bacon',                      // French
    es: 'Tocino',                     // Mexican Spanish
    it: 'Pancetta',                   // Italian
    pt: 'Bacon',                      // Brazilian Portuguese
    nl: 'Spek',                       // Dutch
    sv: 'Bacon',                      // Swedish
    da: 'Bacon',                      // Danish
    no: 'Bacon',                      // Norwegian
    fi: 'Pekoni'                      // Finnish
  },
  'bagel.png': {
    en: 'Bagel',                      // American English
    de: 'Bagel',                      // German
    fr: 'Bagel',                      // French
    es: 'Bagel',                      // Mexican Spanish
    it: 'Bagel',                      // Italian
    pt: 'Bagel',                      // Brazilian Portuguese
    nl: 'Bagel',                      // Dutch
    sv: 'Bagel',                      // Swedish
    da: 'Bagel',                      // Danish
    no: 'Bagel',                      // Norwegian
    fi: 'Bagel'                       // Finnish
  },
  'banana.png': {
    en: 'Banana',                     // American English
    de: 'Banane',                     // German
    fr: 'Banane',                     // French
    es: 'Plátano',                    // Mexican Spanish
    it: 'Banana',                     // Italian
    pt: 'Banana',                     // Brazilian Portuguese
    nl: 'Banaan',                     // Dutch
    sv: 'Banan',                      // Swedish
    da: 'Banan',                      // Danish
    no: 'Banan',                      // Norwegian
    fi: 'Banaani'                     // Finnish
  },
  'biscuit.png': {
    en: 'Biscuit',                    // American English
    de: 'Keks',                       // German
    fr: 'Biscuit',                    // French
    es: 'Galleta',                    // Mexican Spanish
    it: 'Biscotto',                   // Italian
    pt: 'Biscoito',                   // Brazilian Portuguese
    nl: 'Koekje',                     // Dutch
    sv: 'Kex',                        // Swedish
    da: 'Kiks',                       // Danish
    no: 'Kjeks',                      // Norwegian
    fi: 'Keksi'                       // Finnish
  },
  'blueberry.png': {
    en: 'Blueberry',                  // American English
    de: 'Blaubeere',                  // German
    fr: 'Myrtille',                   // French
    es: 'Arándano',                   // Mexican Spanish
    it: 'Mirtillo',                   // Italian
    pt: 'Mirtilo',                    // Brazilian Portuguese
    nl: 'Bosbes',                     // Dutch
    sv: 'Blåbär',                     // Swedish
    da: 'Blåbær',                     // Danish
    no: 'Blåbær',                     // Norwegian
    fi: 'Mustikka'                    // Finnish
  },
  'boiled egg.png': {
    en: 'Boiled Egg',                 // American English
    de: 'Gekochtes Ei',               // German
    fr: 'Œuf à la coque',             // French
    es: 'Huevo cocido',               // Mexican Spanish
    it: 'Uovo sodo',                  // Italian
    pt: 'Ovo cozido',                 // Brazilian Portuguese
    nl: 'Gekookt ei',                 // Dutch
    sv: 'Kokt ägg',                   // Swedish
    da: 'Kogt æg',                    // Danish
    no: 'Kokt egg',                   // Norwegian
    fi: 'Keitetty muna'               // Finnish
  },
  'butter.png': {
    en: 'Butter',                     // American English
    de: 'Butter',                     // German
    fr: 'Beurre',                     // French
    es: 'Mantequilla',                // Mexican Spanish
    it: 'Burro',                      // Italian
    pt: 'Manteiga',                   // Brazilian Portuguese
    nl: 'Boter',                      // Dutch
    sv: 'Smör',                       // Swedish
    da: 'Smør',                       // Danish
    no: 'Smør',                       // Norwegian
    fi: 'Voi'                         // Finnish
  },
  'cereal.png': {
    en: 'Cereal',                     // American English
    de: 'Müsli',                      // German
    fr: 'Céréales',                   // French
    es: 'Cereal',                     // Mexican Spanish
    it: 'Cereali',                    // Italian
    pt: 'Cereal',                     // Brazilian Portuguese
    nl: 'Ontbijtgranen',              // Dutch
    sv: 'Flingor',                    // Swedish
    da: 'Morgenmad',                  // Danish
    no: 'Frokostblanding',            // Norwegian
    fi: 'Murot'                       // Finnish
  },
  'cheese.png': {
    en: 'Cheese',                     // American English
    de: 'Käse',                       // German
    fr: 'Fromage',                    // French
    es: 'Queso',                      // Mexican Spanish
    it: 'Formaggio',                  // Italian
    pt: 'Queijo',                     // Brazilian Portuguese
    nl: 'Kaas',                       // Dutch
    sv: 'Ost',                        // Swedish
    da: 'Ost',                        // Danish
    no: 'Ost',                        // Norwegian
    fi: 'Juusto'                      // Finnish
  },
  'croissant.png': {
    en: 'Croissant',                  // American English
    de: 'Croissant',                  // German
    fr: 'Croissant',                  // French
    es: 'Croissant',                  // Mexican Spanish (also "cuerno" in Mexico)
    it: 'Croissant',                  // Italian (also "cornetto")
    pt: 'Croissant',                  // Brazilian Portuguese
    nl: 'Croissant',                  // Dutch
    sv: 'Croissant',                  // Swedish
    da: 'Croissant',                  // Danish
    no: 'Croissant',                  // Norwegian
    fi: 'Croissant'                   // Finnish
  },
  'donut.png': {
    en: 'Donut',                      // American English
    de: 'Donut',                      // German
    fr: 'Beignet',                    // French
    es: 'Dona',                       // Mexican Spanish
    it: 'Ciambella',                  // Italian
    pt: 'Rosquinha',                  // Brazilian Portuguese
    nl: 'Donut',                      // Dutch
    sv: 'Munk',                       // Swedish
    da: 'Donut',                      // Danish
    no: 'Smultring',                  // Norwegian
    fi: 'Donitsi'                     // Finnish
  },
  'fried egg.png': {
    en: 'Fried Egg',                  // American English
    de: 'Spiegelei',                  // German
    fr: 'Œuf au plat',                // French
    es: 'Huevo frito',                // Mexican Spanish
    it: 'Uovo fritto',                // Italian
    pt: 'Ovo frito',                  // Brazilian Portuguese
    nl: 'Gebakken ei',                // Dutch
    sv: 'Stekt ägg',                  // Swedish
    da: 'Spejlæg',                    // Danish
    no: 'Stekt egg',                  // Norwegian
    fi: 'Paistettu muna'              // Finnish
  },
  'grapefruit.png': {
    en: 'Grapefruit',                 // American English
    de: 'Grapefruit',                 // German
    fr: 'Pamplemousse',               // French
    es: 'Toronja',                    // Mexican Spanish
    it: 'Pompelmo',                   // Italian
    pt: 'Toranja',                    // Brazilian Portuguese
    nl: 'Grapefruit',                 // Dutch
    sv: 'Grapefrukt',                 // Swedish
    da: 'Grapefrugt',                 // Danish
    no: 'Grapefrukt',                 // Norwegian
    fi: 'Greippi'                     // Finnish
  },
  'grapes.png': {
    en: 'Grapes',                     // American English
    de: 'Trauben',                    // German
    fr: 'Raisins',                    // French
    es: 'Uvas',                       // Mexican Spanish
    it: 'Uva',                        // Italian
    pt: 'Uvas',                       // Brazilian Portuguese
    nl: 'Druiven',                    // Dutch
    sv: 'Vindruvor',                  // Swedish
    da: 'Vindruer',                   // Danish
    no: 'Druer',                      // Norwegian
    fi: 'Viinirypäleet'               // Finnish
  },
  'honey.png': {
    en: 'Honey',                      // American English
    de: 'Honig',                      // German
    fr: 'Miel',                       // French
    es: 'Miel',                       // Mexican Spanish
    it: 'Miele',                      // Italian
    pt: 'Mel',                        // Brazilian Portuguese
    nl: 'Honing',                     // Dutch
    sv: 'Honung',                     // Swedish
    da: 'Honning',                    // Danish
    no: 'Honning',                    // Norwegian
    fi: 'Hunaja'                      // Finnish
  },
  'jam.png': {
    en: 'Jam',                        // American English
    de: 'Marmelade',                  // German
    fr: 'Confiture',                  // French
    es: 'Mermelada',                  // Mexican Spanish
    it: 'Marmellata',                 // Italian
    pt: 'Geleia',                     // Brazilian Portuguese
    nl: 'Jam',                        // Dutch
    sv: 'Sylt',                       // Swedish
    da: 'Marmelade',                  // Danish
    no: 'Syltetøy',                   // Norwegian
    fi: 'Hillo'                       // Finnish
  },
  'juice.png': {
    en: 'Juice',                      // American English
    de: 'Saft',                       // German
    fr: 'Jus',                        // French
    es: 'Jugo',                       // Mexican Spanish
    it: 'Succo',                      // Italian
    pt: 'Suco',                       // Brazilian Portuguese
    nl: 'Sap',                        // Dutch
    sv: 'Juice',                      // Swedish
    da: 'Juice',                      // Danish
    no: 'Juice',                      // Norwegian
    fi: 'Mehu'                        // Finnish
  },
  'melon.png': {
    en: 'Melon',                      // American English
    de: 'Melone',                     // German
    fr: 'Melon',                      // French
    es: 'Melón',                      // Mexican Spanish
    it: 'Melone',                     // Italian
    pt: 'Melão',                      // Brazilian Portuguese
    nl: 'Meloen',                     // Dutch
    sv: 'Melon',                      // Swedish
    da: 'Melon',                      // Danish
    no: 'Melon',                      // Norwegian
    fi: 'Meloni'                      // Finnish
  },
  'milk.png': {
    en: 'Milk',                       // American English
    de: 'Milch',                      // German
    fr: 'Lait',                       // French
    es: 'Leche',                      // Mexican Spanish
    it: 'Latte',                      // Italian
    pt: 'Leite',                      // Brazilian Portuguese
    nl: 'Melk',                       // Dutch
    sv: 'Mjölk',                      // Swedish
    da: 'Mælk',                       // Danish
    no: 'Melk',                       // Norwegian
    fi: 'Maito'                       // Finnish
  },
  'muffin.png': {
    en: 'Muffin',                     // American English
    de: 'Muffin',                     // German
    fr: 'Muffin',                     // French
    es: 'Muffin',                     // Mexican Spanish
    it: 'Muffin',                     // Italian
    pt: 'Muffin',                     // Brazilian Portuguese
    nl: 'Muffin',                     // Dutch
    sv: 'Muffin',                     // Swedish
    da: 'Muffin',                     // Danish
    no: 'Muffin',                     // Norwegian
    fi: 'Muffini'                     // Finnish
  },
  'muffin 2.png': {
    en: 'Muffin',                     // American English
    de: 'Muffin',                     // German
    fr: 'Muffin',                     // French
    es: 'Muffin',                     // Mexican Spanish
    it: 'Muffin',                     // Italian
    pt: 'Muffin',                     // Brazilian Portuguese
    nl: 'Muffin',                     // Dutch
    sv: 'Muffin',                     // Swedish
    da: 'Muffin',                     // Danish
    no: 'Muffin',                     // Norwegian
    fi: 'Muffini'                     // Finnish
  },
  'oatmeal.png': {
    en: 'Oatmeal',                    // American English
    de: 'Haferbrei',                  // German
    fr: 'Flocons d\'avoine',          // French
    es: 'Avena',                      // Mexican Spanish
    it: 'Farina d\'avena',            // Italian
    pt: 'Aveia',                      // Brazilian Portuguese
    nl: 'Havermout',                  // Dutch
    sv: 'Havregryn',                  // Swedish
    da: 'Havregrød',                  // Danish
    no: 'Havregryn',                  // Norwegian
    fi: 'Kaurapuuro'                  // Finnish
  },
  'orange.png': {
    en: 'Orange',                     // American English
    de: 'Orange',                     // German
    fr: 'Orange',                     // French
    es: 'Naranja',                    // Mexican Spanish
    it: 'Arancia',                    // Italian
    pt: 'Laranja',                    // Brazilian Portuguese
    nl: 'Sinaasappel',                // Dutch
    sv: 'Apelsin',                    // Swedish
    da: 'Appelsin',                   // Danish
    no: 'Appelsin',                   // Norwegian
    fi: 'Appelsiini'                  // Finnish
  },
  'pancake.png': {
    en: 'Pancake',                    // American English
    de: 'Pfannkuchen',                // German
    fr: 'Crêpe',                      // French
    es: 'Hotcake',                    // Mexican Spanish
    it: 'Pancake',                    // Italian
    pt: 'Panqueca',                   // Brazilian Portuguese
    nl: 'Pannenkoek',                 // Dutch
    sv: 'Pannkaka',                   // Swedish
    da: 'Pandekage',                  // Danish
    no: 'Pannekake',                  // Norwegian
    fi: 'Pannukakku'                  // Finnish
  },
  'porridge.png': {
    en: 'Porridge',                   // American English
    de: 'Brei',                       // German
    fr: 'Porridge',                   // French
    es: 'Gachas',                     // Mexican Spanish
    it: 'Porridge',                   // Italian
    pt: 'Mingau',                     // Brazilian Portuguese
    nl: 'Pap',                        // Dutch
    sv: 'Gröt',                       // Swedish
    da: 'Grød',                       // Danish
    no: 'Grøt',                       // Norwegian
    fi: 'Puuro'                       // Finnish
  },
  'raspberry.png': {
    en: 'Raspberry',                  // American English
    de: 'Himbeere',                   // German
    fr: 'Framboise',                  // French
    es: 'Frambuesa',                  // Mexican Spanish
    it: 'Lampone',                    // Italian
    pt: 'Framboesa',                  // Brazilian Portuguese
    nl: 'Framboos',                   // Dutch
    sv: 'Hallon',                     // Swedish
    da: 'Hindbær',                    // Danish
    no: 'Bringebær',                  // Norwegian
    fi: 'Vadelma'                     // Finnish
  },
  'sausage.png': {
    en: 'Sausage',                    // American English
    de: 'Wurst',                      // German
    fr: 'Saucisse',                   // French
    es: 'Salchicha',                  // Mexican Spanish
    it: 'Salsiccia',                  // Italian
    pt: 'Salsicha',                   // Brazilian Portuguese
    nl: 'Worst',                      // Dutch
    sv: 'Korv',                       // Swedish
    da: 'Pølse',                      // Danish
    no: 'Pølse',                      // Norwegian
    fi: 'Makkara'                     // Finnish
  },
  'smoothie.png': {
    en: 'Smoothie',                   // American English
    de: 'Smoothie',                   // German
    fr: 'Smoothie',                   // French
    es: 'Licuado',                    // Mexican Spanish
    it: 'Frullato',                   // Italian
    pt: 'Vitamina',                   // Brazilian Portuguese
    nl: 'Smoothie',                   // Dutch
    sv: 'Smoothie',                   // Swedish
    da: 'Smoothie',                   // Danish
    no: 'Smoothie',                   // Norwegian
    fi: 'Smoothie'                    // Finnish
  },
  'strawberry.png': {
    en: 'Strawberry',                 // American English
    de: 'Erdbeere',                   // German
    fr: 'Fraise',                     // French
    es: 'Fresa',                      // Mexican Spanish
    it: 'Fragola',                    // Italian
    pt: 'Morango',                    // Brazilian Portuguese
    nl: 'Aardbei',                    // Dutch
    sv: 'Jordgubbe',                  // Swedish
    da: 'Jordbær',                    // Danish
    no: 'Jordbær',                    // Norwegian
    fi: 'Mansikka'                    // Finnish
  },
  'toast.png': {
    en: 'Toast',                      // American English
    de: 'Toast',                      // German
    fr: 'Toast',                      // French
    es: 'Pan tostado',                // Mexican Spanish
    it: 'Toast',                      // Italian
    pt: 'Torrada',                    // Brazilian Portuguese
    nl: 'Toast',                      // Dutch
    sv: 'Rostat bröd',                // Swedish
    da: 'Toast',                      // Danish
    no: 'Toast',                      // Norwegian
    fi: 'Paahtoleipä'                 // Finnish
  },
  'yoghurt.png': {
    en: 'Yogurt',                     // American English (spelled without 'h')
    de: 'Joghurt',                    // German
    fr: 'Yaourt',                     // French
    es: 'Yogur',                      // Mexican Spanish
    it: 'Yogurt',                     // Italian
    pt: 'Iogurte',                    // Brazilian Portuguese
    nl: 'Yoghurt',                    // Dutch
    sv: 'Yoghurt',                    // Swedish
    da: 'Yoghurt',                    // Danish
    no: 'Yoghurt',                    // Norwegian
    fi: 'Jogurtti'                    // Finnish
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
