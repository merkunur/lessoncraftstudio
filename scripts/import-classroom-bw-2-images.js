/**
 * Import Script: Classroom BW 2 (Black and White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-classroom-bw-2-images.js
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
// CONFIGURATION - CLASSROOM BW 2 THEME
// ============================================================

const THEME_CONFIG = {
  name: 'classroom_bw_2',
  type: 'images',
  sourceFolderName: 'classroom bw 2',
  displayNames: {
    en: 'Classroom 2 (B&W)',            // American English
    de: 'Klassenzimmer 2 (S/W)',        // German
    fr: 'Salle de classe 2 (N&B)',      // French
    es: 'Salón de clases 2 (B/N)',      // Mexican Spanish
    it: 'Aula 2 (B/N)',                 // Italian
    pt: 'Sala de aula 2 (P&B)',         // Brazilian Portuguese
    nl: 'Klaslokaal 2 (Z/W)',           // Dutch
    sv: 'Klassrum 2 (S/V)',             // Swedish
    da: 'Klasseværelse 2 (S/H)',        // Danish
    no: 'Klasserom 2 (S/H)',            // Norwegian
    fi: 'Luokkahuone 2 (M/V)'           // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'analog clock.png': {
    en: 'Analog Clock',                 // American English
    de: 'Analoguhr',                    // German
    fr: 'Horloge analogique',           // French
    es: 'Reloj analógico',              // Mexican Spanish
    it: 'Orologio analogico',           // Italian
    pt: 'Relógio analógico',            // Brazilian Portuguese
    nl: 'Analoge klok',                 // Dutch
    sv: 'Analog klocka',                // Swedish
    da: 'Analogt ur',                   // Danish
    no: 'Analog klokke',                // Norwegian
    fi: 'Analoginen kello'              // Finnish
  },
  'backpack.png': {
    en: 'Backpack',                     // American English
    de: 'Rucksack',                     // German
    fr: 'Sac à dos',                    // French
    es: 'Mochila',                      // Mexican Spanish
    it: 'Zaino',                        // Italian
    pt: 'Mochila',                      // Brazilian Portuguese
    nl: 'Rugzak',                       // Dutch
    sv: 'Ryggsäck',                     // Swedish
    da: 'Rygsæk',                       // Danish
    no: 'Ryggsekk',                     // Norwegian
    fi: 'Reppu'                         // Finnish
  },
  'book.png': {
    en: 'Book',                         // American English
    de: 'Buch',                         // German
    fr: 'Livre',                        // French
    es: 'Libro',                        // Mexican Spanish
    it: 'Libro',                        // Italian
    pt: 'Livro',                        // Brazilian Portuguese
    nl: 'Boek',                         // Dutch
    sv: 'Bok',                          // Swedish
    da: 'Bog',                          // Danish
    no: 'Bok',                          // Norwegian
    fi: 'Kirja'                         // Finnish
  },
  'bookshelf.png': {
    en: 'Bookshelf',                    // American English
    de: 'Bücherregal',                  // German
    fr: 'Bibliothèque',                 // French
    es: 'Librero',                      // Mexican Spanish
    it: 'Scaffale',                     // Italian
    pt: 'Estante',                      // Brazilian Portuguese
    nl: 'Boekenkast',                   // Dutch
    sv: 'Bokhylla',                     // Swedish
    da: 'Bogreol',                      // Danish
    no: 'Bokhylle',                     // Norwegian
    fi: 'Kirjahylly'                    // Finnish
  },
  'calculator.png': {
    en: 'Calculator',                   // American English
    de: 'Taschenrechner',               // German
    fr: 'Calculatrice',                 // French
    es: 'Calculadora',                  // Mexican Spanish
    it: 'Calcolatrice',                 // Italian
    pt: 'Calculadora',                  // Brazilian Portuguese
    nl: 'Rekenmachine',                 // Dutch
    sv: 'Miniräknare',                  // Swedish
    da: 'Lommeregner',                  // Danish
    no: 'Kalkulator',                   // Norwegian
    fi: 'Laskin'                        // Finnish
  },
  'calendar.png': {
    en: 'Calendar',                     // American English
    de: 'Kalender',                     // German
    fr: 'Calendrier',                   // French
    es: 'Calendario',                   // Mexican Spanish
    it: 'Calendario',                   // Italian
    pt: 'Calendário',                   // Brazilian Portuguese
    nl: 'Kalender',                     // Dutch
    sv: 'Kalender',                     // Swedish
    da: 'Kalender',                     // Danish
    no: 'Kalender',                     // Norwegian
    fi: 'Kalenteri'                     // Finnish
  },
  'chair.png': {
    en: 'Chair',                        // American English
    de: 'Stuhl',                        // German
    fr: 'Chaise',                       // French
    es: 'Silla',                        // Mexican Spanish
    it: 'Sedia',                        // Italian
    pt: 'Cadeira',                      // Brazilian Portuguese
    nl: 'Stoel',                        // Dutch
    sv: 'Stol',                         // Swedish
    da: 'Stol',                         // Danish
    no: 'Stol',                         // Norwegian
    fi: 'Tuoli'                         // Finnish
  },
  'computer.png': {
    en: 'Computer',                     // American English
    de: 'Computer',                     // German
    fr: 'Ordinateur',                   // French
    es: 'Computadora',                  // Mexican Spanish
    it: 'Computer',                     // Italian
    pt: 'Computador',                   // Brazilian Portuguese
    nl: 'Computer',                     // Dutch
    sv: 'Dator',                        // Swedish
    da: 'Computer',                     // Danish
    no: 'Datamaskin',                   // Norwegian
    fi: 'Tietokone'                     // Finnish
  },
  'dresser.png': {
    en: 'Dresser',                      // American English
    de: 'Kommode',                      // German
    fr: 'Commode',                      // French
    es: 'Cómoda',                       // Mexican Spanish
    it: 'Cassettiera',                  // Italian
    pt: 'Cômoda',                       // Brazilian Portuguese
    nl: 'Ladekast',                     // Dutch
    sv: 'Byrå',                         // Swedish
    da: 'Kommode',                      // Danish
    no: 'Kommode',                      // Norwegian
    fi: 'Lipasto'                       // Finnish
  },
  'Earth.png': {
    en: 'Earth',                        // American English
    de: 'Erde',                         // German
    fr: 'Terre',                        // French
    es: 'Tierra',                       // Mexican Spanish
    it: 'Terra',                        // Italian
    pt: 'Terra',                        // Brazilian Portuguese
    nl: 'Aarde',                        // Dutch
    sv: 'Jorden',                       // Swedish
    da: 'Jorden',                       // Danish
    no: 'Jorden',                       // Norwegian
    fi: 'Maa'                           // Finnish
  },
  'Erlenmeyer flask.png': {
    en: 'Erlenmeyer Flask',             // American English
    de: 'Erlenmeyerkolben',             // German
    fr: 'Fiole Erlenmeyer',             // French
    es: 'Matraz Erlenmeyer',            // Mexican Spanish
    it: 'Beuta',                        // Italian
    pt: 'Frasco Erlenmeyer',            // Brazilian Portuguese
    nl: 'Erlenmeyer',                   // Dutch
    sv: 'Erlenmeyerkolv',               // Swedish
    da: 'Erlenmeyerkolbe',              // Danish
    no: 'Erlenmeyerkolbe',              // Norwegian
    fi: 'Erlenmeyerpullo'               // Finnish
  },
  'globe.png': {
    en: 'Globe',                        // American English
    de: 'Globus',                       // German
    fr: 'Globe',                        // French
    es: 'Globo terráqueo',              // Mexican Spanish
    it: 'Mappamondo',                   // Italian
    pt: 'Globo',                        // Brazilian Portuguese
    nl: 'Wereldbol',                    // Dutch
    sv: 'Jordglob',                     // Swedish
    da: 'Globus',                       // Danish
    no: 'Globus',                       // Norwegian
    fi: 'Maapallo'                      // Finnish
  },
  'human torso.png': {
    en: 'Human Torso',                  // American English
    de: 'Menschlicher Torso',           // German
    fr: 'Torse humain',                 // French
    es: 'Torso humano',                 // Mexican Spanish
    it: 'Torso umano',                  // Italian
    pt: 'Torso humano',                 // Brazilian Portuguese
    nl: 'Menselijke torso',             // Dutch
    sv: 'Mänsklig bål',                 // Swedish
    da: 'Menneskelig torso',            // Danish
    no: 'Menneskelig torso',            // Norwegian
    fi: 'Ihmisen vartalo'               // Finnish
  },
  'magnifying glass.png': {
    en: 'Magnifying Glass',             // American English
    de: 'Lupe',                         // German
    fr: 'Loupe',                        // French
    es: 'Lupa',                         // Mexican Spanish
    it: 'Lente d\'ingrandimento',       // Italian
    pt: 'Lupa',                         // Brazilian Portuguese
    nl: 'Vergrootglas',                 // Dutch
    sv: 'Förstoringsglas',              // Swedish
    da: 'Forstørrelsesglas',            // Danish
    no: 'Forstørrelsesglass',           // Norwegian
    fi: 'Suurennuslasi'                 // Finnish
  },
  'map.png': {
    en: 'Map',                          // American English
    de: 'Karte',                        // German
    fr: 'Carte',                        // French
    es: 'Mapa',                         // Mexican Spanish
    it: 'Mappa',                        // Italian
    pt: 'Mapa',                         // Brazilian Portuguese
    nl: 'Kaart',                        // Dutch
    sv: 'Karta',                        // Swedish
    da: 'Kort',                         // Danish
    no: 'Kart',                         // Norwegian
    fi: 'Kartta'                        // Finnish
  },
  'microscope.png': {
    en: 'Microscope',                   // American English
    de: 'Mikroskop',                    // German
    fr: 'Microscope',                   // French
    es: 'Microscopio',                  // Mexican Spanish
    it: 'Microscopio',                  // Italian
    pt: 'Microscópio',                  // Brazilian Portuguese
    nl: 'Microscoop',                   // Dutch
    sv: 'Mikroskop',                    // Swedish
    da: 'Mikroskop',                    // Danish
    no: 'Mikroskop',                    // Norwegian
    fi: 'Mikroskooppi'                  // Finnish
  },
  'notebook.png': {
    en: 'Notebook',                     // American English
    de: 'Notizbuch',                    // German
    fr: 'Cahier',                       // French
    es: 'Cuaderno',                     // Mexican Spanish
    it: 'Quaderno',                     // Italian
    pt: 'Caderno',                      // Brazilian Portuguese
    nl: 'Schrift',                      // Dutch
    sv: 'Anteckningsbok',               // Swedish
    da: 'Notesbog',                     // Danish
    no: 'Notatbok',                     // Norwegian
    fi: 'Vihko'                         // Finnish
  },
  'palette.png': {
    en: 'Palette',                      // American English
    de: 'Palette',                      // German
    fr: 'Palette',                      // French
    es: 'Paleta',                       // Mexican Spanish
    it: 'Tavolozza',                    // Italian
    pt: 'Paleta',                       // Brazilian Portuguese
    nl: 'Palet',                        // Dutch
    sv: 'Palett',                       // Swedish
    da: 'Palet',                        // Danish
    no: 'Palett',                       // Norwegian
    fi: 'Paletti'                       // Finnish
  },
  'paper airplane.png': {
    en: 'Paper Airplane',               // American English
    de: 'Papierflieger',                // German
    fr: 'Avion en papier',              // French
    es: 'Avión de papel',               // Mexican Spanish
    it: 'Aeroplano di carta',           // Italian
    pt: 'Avião de papel',               // Brazilian Portuguese
    nl: 'Papieren vliegtuig',           // Dutch
    sv: 'Pappersflygplan',              // Swedish
    da: 'Papirfly',                     // Danish
    no: 'Papirfly',                     // Norwegian
    fi: 'Paperilennokki'                // Finnish
  },
  'pen.png': {
    en: 'Pen',                          // American English
    de: 'Kugelschreiber',               // German
    fr: 'Stylo',                        // French
    es: 'Pluma',                        // Mexican Spanish
    it: 'Penna',                        // Italian
    pt: 'Caneta',                       // Brazilian Portuguese
    nl: 'Pen',                          // Dutch
    sv: 'Penna',                        // Swedish
    da: 'Kuglepen',                     // Danish
    no: 'Penn',                         // Norwegian
    fi: 'Kynä'                          // Finnish
  },
  'pencil.png': {
    en: 'Pencil',                       // American English
    de: 'Bleistift',                    // German
    fr: 'Crayon',                       // French
    es: 'Lápiz',                        // Mexican Spanish
    it: 'Matita',                       // Italian
    pt: 'Lápis',                        // Brazilian Portuguese
    nl: 'Potlood',                      // Dutch
    sv: 'Blyertspenna',                 // Swedish
    da: 'Blyant',                       // Danish
    no: 'Blyant',                       // Norwegian
    fi: 'Lyijykynä'                     // Finnish
  },
  'scissors.png': {
    en: 'Scissors',                     // American English
    de: 'Schere',                       // German
    fr: 'Ciseaux',                      // French
    es: 'Tijeras',                      // Mexican Spanish
    it: 'Forbici',                      // Italian
    pt: 'Tesoura',                      // Brazilian Portuguese
    nl: 'Schaar',                       // Dutch
    sv: 'Sax',                          // Swedish
    da: 'Saks',                         // Danish
    no: 'Saks',                         // Norwegian
    fi: 'Sakset'                        // Finnish
  },
  'table.png': {
    en: 'Table',                        // American English
    de: 'Tisch',                        // German
    fr: 'Table',                        // French
    es: 'Mesa',                         // Mexican Spanish
    it: 'Tavolo',                       // Italian
    pt: 'Mesa',                         // Brazilian Portuguese
    nl: 'Tafel',                        // Dutch
    sv: 'Bord',                         // Swedish
    da: 'Bord',                         // Danish
    no: 'Bord',                         // Norwegian
    fi: 'Pöytä'                         // Finnish
  },
  'whiteboard.png': {
    en: 'Whiteboard',                   // American English
    de: 'Whiteboard',                   // German
    fr: 'Tableau blanc',                // French
    es: 'Pizarrón',                     // Mexican Spanish
    it: 'Lavagna bianca',               // Italian
    pt: 'Quadro branco',                // Brazilian Portuguese
    nl: 'Whiteboard',                   // Dutch
    sv: 'Whiteboard',                   // Swedish
    da: 'Whiteboard',                   // Danish
    no: 'Whiteboard',                   // Norwegian
    fi: 'Valkotaulu'                    // Finnish
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
