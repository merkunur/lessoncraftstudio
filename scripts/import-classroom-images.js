/**
 * Import Script: Classroom Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-classroom-images.js
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
// CONFIGURATION - CLASSROOM THEME
// ============================================================

const THEME_CONFIG = {
  name: 'classroom',
  type: 'images',
  sourceFolderName: 'classroom',
  displayNames: {
    en: 'Classroom',                  // American English
    de: 'Klassenzimmer',              // German
    fr: 'Salle de classe',            // French
    es: 'Salón de clases',            // Mexican Spanish
    it: 'Aula',                       // Italian
    pt: 'Sala de aula',               // Brazilian Portuguese
    nl: 'Klaslokaal',                 // Dutch
    sv: 'Klassrum',                   // Swedish
    da: 'Klasseværelse',              // Danish
    no: 'Klasserom',                  // Norwegian
    fi: 'Luokkahuone'                 // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'backpack.png': {
    en: 'Backpack',                   // American English
    de: 'Rucksack',                   // German
    fr: 'Sac à dos',                  // French
    es: 'Mochila',                    // Mexican Spanish
    it: 'Zaino',                      // Italian
    pt: 'Mochila',                    // Brazilian Portuguese
    nl: 'Rugzak',                     // Dutch
    sv: 'Ryggsäck',                   // Swedish
    da: 'Rygsæk',                     // Danish
    no: 'Ryggsekk',                   // Norwegian
    fi: 'Reppu'                       // Finnish
  },
  'binder.png': {
    en: 'Binder',                     // American English
    de: 'Ordner',                     // German
    fr: 'Classeur',                   // French
    es: 'Carpeta',                    // Mexican Spanish
    it: 'Raccoglitore',               // Italian
    pt: 'Fichário',                   // Brazilian Portuguese
    nl: 'Ordner',                     // Dutch
    sv: 'Pärm',                       // Swedish
    da: 'Ringbind',                   // Danish
    no: 'Ringperm',                   // Norwegian
    fi: 'Kansio'                      // Finnish
  },
  'book.png': {
    en: 'Book',                       // American English
    de: 'Buch',                       // German
    fr: 'Livre',                      // French
    es: 'Libro',                      // Mexican Spanish
    it: 'Libro',                      // Italian
    pt: 'Livro',                      // Brazilian Portuguese
    nl: 'Boek',                       // Dutch
    sv: 'Bok',                        // Swedish
    da: 'Bog',                        // Danish
    no: 'Bok',                        // Norwegian
    fi: 'Kirja'                       // Finnish
  },
  'cabinet.png': {
    en: 'Cabinet',                    // American English
    de: 'Schrank',                    // German
    fr: 'Armoire',                    // French
    es: 'Gabinete',                   // Mexican Spanish
    it: 'Armadio',                    // Italian
    pt: 'Armário',                    // Brazilian Portuguese
    nl: 'Kast',                       // Dutch
    sv: 'Skåp',                       // Swedish
    da: 'Skab',                       // Danish
    no: 'Skap',                       // Norwegian
    fi: 'Kaappi'                      // Finnish
  },
  'calculator.png': {
    en: 'Calculator',                 // American English
    de: 'Taschenrechner',             // German
    fr: 'Calculatrice',               // French
    es: 'Calculadora',                // Mexican Spanish
    it: 'Calcolatrice',               // Italian
    pt: 'Calculadora',                // Brazilian Portuguese
    nl: 'Rekenmachine',               // Dutch
    sv: 'Miniräknare',                // Swedish
    da: 'Lommeregner',                // Danish
    no: 'Kalkulator',                 // Norwegian
    fi: 'Laskin'                      // Finnish
  },
  'calender.png': {
    en: 'Calendar',                   // American English
    de: 'Kalender',                   // German
    fr: 'Calendrier',                 // French
    es: 'Calendario',                 // Mexican Spanish
    it: 'Calendario',                 // Italian
    pt: 'Calendário',                 // Brazilian Portuguese
    nl: 'Kalender',                   // Dutch
    sv: 'Kalender',                   // Swedish
    da: 'Kalender',                   // Danish
    no: 'Kalender',                   // Norwegian
    fi: 'Kalenteri'                   // Finnish
  },
  'chair.png': {
    en: 'Chair',                      // American English
    de: 'Stuhl',                      // German
    fr: 'Chaise',                     // French
    es: 'Silla',                      // Mexican Spanish
    it: 'Sedia',                      // Italian
    pt: 'Cadeira',                    // Brazilian Portuguese
    nl: 'Stoel',                      // Dutch
    sv: 'Stol',                       // Swedish
    da: 'Stol',                       // Danish
    no: 'Stol',                       // Norwegian
    fi: 'Tuoli'                       // Finnish
  },
  'clock.png': {
    en: 'Clock',                      // American English
    de: 'Uhr',                        // German
    fr: 'Horloge',                    // French
    es: 'Reloj',                      // Mexican Spanish
    it: 'Orologio',                   // Italian
    pt: 'Relógio',                    // Brazilian Portuguese
    nl: 'Klok',                       // Dutch
    sv: 'Klocka',                     // Swedish
    da: 'Ur',                         // Danish
    no: 'Klokke',                     // Norwegian
    fi: 'Kello'                       // Finnish
  },
  'computer.png': {
    en: 'Computer',                   // American English
    de: 'Computer',                   // German
    fr: 'Ordinateur',                 // French
    es: 'Computadora',                // Mexican Spanish
    it: 'Computer',                   // Italian
    pt: 'Computador',                 // Brazilian Portuguese
    nl: 'Computer',                   // Dutch
    sv: 'Dator',                      // Swedish
    da: 'Computer',                   // Danish
    no: 'Datamaskin',                 // Norwegian
    fi: 'Tietokone'                   // Finnish
  },
  'crayon.png': {
    en: 'Crayon',                     // American English
    de: 'Wachsmalstift',              // German
    fr: 'Crayon de couleur',          // French
    es: 'Crayón',                     // Mexican Spanish
    it: 'Pastello a cera',            // Italian
    pt: 'Giz de cera',                // Brazilian Portuguese
    nl: 'Waskrijtje',                 // Dutch
    sv: 'Krita',                      // Swedish
    da: 'Farvekridt',                 // Danish
    no: 'Fargestift',                 // Norwegian
    fi: 'Vahaliitu'                   // Finnish
  },
  'desk.png': {
    en: 'Desk',                       // American English
    de: 'Schreibtisch',               // German
    fr: 'Bureau',                     // French
    es: 'Escritorio',                 // Mexican Spanish
    it: 'Scrivania',                  // Italian
    pt: 'Escrivaninha',               // Brazilian Portuguese
    nl: 'Bureau',                     // Dutch
    sv: 'Skrivbord',                  // Swedish
    da: 'Skrivebord',                 // Danish
    no: 'Skrivebord',                 // Norwegian
    fi: 'Työpöytä'                    // Finnish
  },
  'eraser.png': {
    en: 'Eraser',                     // American English
    de: 'Radiergummi',                // German
    fr: 'Gomme',                      // French
    es: 'Borrador',                   // Mexican Spanish
    it: 'Gomma',                      // Italian
    pt: 'Borracha',                   // Brazilian Portuguese
    nl: 'Gum',                        // Dutch
    sv: 'Suddgummi',                  // Swedish
    da: 'Viskelæder',                 // Danish
    no: 'Viskelær',                   // Norwegian
    fi: 'Pyyhekumi'                   // Finnish
  },
  'folder.png': {
    en: 'Folder',                     // American English
    de: 'Mappe',                      // German
    fr: 'Dossier',                    // French
    es: 'Folder',                     // Mexican Spanish
    it: 'Cartella',                   // Italian
    pt: 'Pasta',                      // Brazilian Portuguese
    nl: 'Map',                        // Dutch
    sv: 'Mapp',                       // Swedish
    da: 'Mappe',                      // Danish
    no: 'Mappe',                      // Norwegian
    fi: 'Kansio'                      // Finnish
  },
  'globe.png': {
    en: 'Globe',                      // American English
    de: 'Globus',                     // German
    fr: 'Globe',                      // French
    es: 'Globo terráqueo',            // Mexican Spanish
    it: 'Mappamondo',                 // Italian
    pt: 'Globo',                      // Brazilian Portuguese
    nl: 'Wereldbol',                  // Dutch
    sv: 'Jordglob',                   // Swedish
    da: 'Globus',                     // Danish
    no: 'Globus',                     // Norwegian
    fi: 'Maapallo'                    // Finnish
  },
  'glue.png': {
    en: 'Glue',                       // American English
    de: 'Kleber',                     // German
    fr: 'Colle',                      // French
    es: 'Pegamento',                  // Mexican Spanish
    it: 'Colla',                      // Italian
    pt: 'Cola',                       // Brazilian Portuguese
    nl: 'Lijm',                       // Dutch
    sv: 'Lim',                        // Swedish
    da: 'Lim',                        // Danish
    no: 'Lim',                        // Norwegian
    fi: 'Liima'                       // Finnish
  },
  'librarian.png': {
    en: 'Librarian',                  // American English
    de: 'Bibliothekar',               // German
    fr: 'Bibliothécaire',             // French
    es: 'Bibliotecario',              // Mexican Spanish
    it: 'Bibliotecario',              // Italian
    pt: 'Bibliotecário',              // Brazilian Portuguese
    nl: 'Bibliothecaris',             // Dutch
    sv: 'Bibliotekarie',              // Swedish
    da: 'Bibliotekar',                // Danish
    no: 'Bibliotekar',                // Norwegian
    fi: 'Kirjastonhoitaja'            // Finnish
  },
  'lunchbox.png': {
    en: 'Lunchbox',                   // American English
    de: 'Brotdose',                   // German
    fr: 'Boîte à lunch',              // French
    es: 'Lonchera',                   // Mexican Spanish
    it: 'Portapranzo',                // Italian
    pt: 'Lancheira',                  // Brazilian Portuguese
    nl: 'Broodtrommel',               // Dutch
    sv: 'Matlåda',                    // Swedish
    da: 'Madkasse',                   // Danish
    no: 'Matboks',                    // Norwegian
    fi: 'Eväslaatikko'                // Finnish
  },
  'map.png': {
    en: 'Map',                        // American English
    de: 'Karte',                      // German
    fr: 'Carte',                      // French
    es: 'Mapa',                       // Mexican Spanish
    it: 'Mappa',                      // Italian
    pt: 'Mapa',                       // Brazilian Portuguese
    nl: 'Kaart',                      // Dutch
    sv: 'Karta',                      // Swedish
    da: 'Kort',                       // Danish
    no: 'Kart',                       // Norwegian
    fi: 'Kartta'                      // Finnish
  },
  'marker.png': {
    en: 'Marker',                     // American English
    de: 'Marker',                     // German
    fr: 'Marqueur',                   // French
    es: 'Marcador',                   // Mexican Spanish
    it: 'Pennarello',                 // Italian
    pt: 'Marcador',                   // Brazilian Portuguese
    nl: 'Stift',                      // Dutch
    sv: 'Tuschpenna',                 // Swedish
    da: 'Tusch',                      // Danish
    no: 'Tusj',                       // Norwegian
    fi: 'Tussi'                       // Finnish
  },
  'notebook.png': {
    en: 'Notebook',                   // American English
    de: 'Notizbuch',                  // German
    fr: 'Cahier',                     // French
    es: 'Cuaderno',                   // Mexican Spanish
    it: 'Quaderno',                   // Italian
    pt: 'Caderno',                    // Brazilian Portuguese
    nl: 'Schrift',                    // Dutch
    sv: 'Anteckningsbok',             // Swedish
    da: 'Notesbog',                   // Danish
    no: 'Notatbok',                   // Norwegian
    fi: 'Vihko'                       // Finnish
  },
  'paper.png': {
    en: 'Paper',                      // American English
    de: 'Papier',                     // German
    fr: 'Papier',                     // French
    es: 'Papel',                      // Mexican Spanish
    it: 'Carta',                      // Italian
    pt: 'Papel',                      // Brazilian Portuguese
    nl: 'Papier',                     // Dutch
    sv: 'Papper',                     // Swedish
    da: 'Papir',                      // Danish
    no: 'Papir',                      // Norwegian
    fi: 'Paperi'                      // Finnish
  },
  'pen.png': {
    en: 'Pen',                        // American English
    de: 'Kugelschreiber',             // German
    fr: 'Stylo',                      // French
    es: 'Pluma',                      // Mexican Spanish
    it: 'Penna',                      // Italian
    pt: 'Caneta',                     // Brazilian Portuguese
    nl: 'Pen',                        // Dutch
    sv: 'Penna',                      // Swedish
    da: 'Kuglepen',                   // Danish
    no: 'Penn',                       // Norwegian
    fi: 'Kynä'                        // Finnish
  },
  'pencil.png': {
    en: 'Pencil',                     // American English
    de: 'Bleistift',                  // German
    fr: 'Crayon',                     // French
    es: 'Lápiz',                      // Mexican Spanish
    it: 'Matita',                     // Italian
    pt: 'Lápis',                      // Brazilian Portuguese
    nl: 'Potlood',                    // Dutch
    sv: 'Blyertspenna',               // Swedish
    da: 'Blyant',                     // Danish
    no: 'Blyant',                     // Norwegian
    fi: 'Lyijykynä'                   // Finnish
  },
  'ruler.png': {
    en: 'Ruler',                      // American English
    de: 'Lineal',                     // German
    fr: 'Règle',                      // French
    es: 'Regla',                      // Mexican Spanish
    it: 'Righello',                   // Italian
    pt: 'Régua',                      // Brazilian Portuguese
    nl: 'Liniaal',                    // Dutch
    sv: 'Linjal',                     // Swedish
    da: 'Lineal',                     // Danish
    no: 'Linjal',                     // Norwegian
    fi: 'Viivain'                     // Finnish
  },
  'scissors.png': {
    en: 'Scissors',                   // American English
    de: 'Schere',                     // German
    fr: 'Ciseaux',                    // French
    es: 'Tijeras',                    // Mexican Spanish
    it: 'Forbici',                    // Italian
    pt: 'Tesoura',                    // Brazilian Portuguese
    nl: 'Schaar',                     // Dutch
    sv: 'Sax',                        // Swedish
    da: 'Saks',                       // Danish
    no: 'Saks',                       // Norwegian
    fi: 'Sakset'                      // Finnish
  },
  'shelf.png': {
    en: 'Shelf',                      // American English
    de: 'Regal',                      // German
    fr: 'Étagère',                    // French
    es: 'Estante',                    // Mexican Spanish
    it: 'Scaffale',                   // Italian
    pt: 'Prateleira',                 // Brazilian Portuguese
    nl: 'Plank',                      // Dutch
    sv: 'Hylla',                      // Swedish
    da: 'Hylde',                      // Danish
    no: 'Hylle',                      // Norwegian
    fi: 'Hylly'                       // Finnish
  },
  'stapler.png': {
    en: 'Stapler',                    // American English
    de: 'Hefter',                     // German
    fr: 'Agrafeuse',                  // French
    es: 'Engrapadora',                // Mexican Spanish
    it: 'Cucitrice',                  // Italian
    pt: 'Grampeador',                 // Brazilian Portuguese
    nl: 'Nietmachine',                // Dutch
    sv: 'Häftapparat',                // Swedish
    da: 'Hæftemaskine',               // Danish
    no: 'Stiftemaskin',               // Norwegian
    fi: 'Nitoja'                      // Finnish
  },
  'student.png': {
    en: 'Student',                    // American English
    de: 'Schüler',                    // German
    fr: 'Élève',                      // French
    es: 'Estudiante',                 // Mexican Spanish
    it: 'Studente',                   // Italian
    pt: 'Estudante',                  // Brazilian Portuguese
    nl: 'Leerling',                   // Dutch
    sv: 'Elev',                       // Swedish
    da: 'Elev',                       // Danish
    no: 'Elev',                       // Norwegian
    fi: 'Oppilas'                     // Finnish
  },
  'table.png': {
    en: 'Table',                      // American English
    de: 'Tisch',                      // German
    fr: 'Table',                      // French
    es: 'Mesa',                       // Mexican Spanish
    it: 'Tavolo',                     // Italian
    pt: 'Mesa',                       // Brazilian Portuguese
    nl: 'Tafel',                      // Dutch
    sv: 'Bord',                       // Swedish
    da: 'Bord',                       // Danish
    no: 'Bord',                       // Norwegian
    fi: 'Pöytä'                       // Finnish
  },
  'tablet.png': {
    en: 'Tablet',                     // American English
    de: 'Tablet',                     // German
    fr: 'Tablette',                   // French
    es: 'Tableta',                    // Mexican Spanish
    it: 'Tablet',                     // Italian
    pt: 'Tablet',                     // Brazilian Portuguese
    nl: 'Tablet',                     // Dutch
    sv: 'Surfplatta',                 // Swedish
    da: 'Tablet',                     // Danish
    no: 'Nettbrett',                  // Norwegian
    fi: 'Tabletti'                    // Finnish
  },
  'tape.png': {
    en: 'Tape',                       // American English
    de: 'Klebeband',                  // German
    fr: 'Ruban adhésif',              // French
    es: 'Cinta adhesiva',             // Mexican Spanish
    it: 'Nastro adesivo',             // Italian
    pt: 'Fita adesiva',               // Brazilian Portuguese
    nl: 'Plakband',                   // Dutch
    sv: 'Tejp',                       // Swedish
    da: 'Tape',                       // Danish
    no: 'Teip',                       // Norwegian
    fi: 'Teippi'                      // Finnish
  },
  'teacher.png': {
    en: 'Teacher',                    // American English
    de: 'Lehrer',                     // German
    fr: 'Professeur',                 // French
    es: 'Maestro',                    // Mexican Spanish
    it: 'Insegnante',                 // Italian
    pt: 'Professor',                  // Brazilian Portuguese
    nl: 'Leraar',                     // Dutch
    sv: 'Lärare',                     // Swedish
    da: 'Lærer',                      // Danish
    no: 'Lærer',                      // Norwegian
    fi: 'Opettaja'                    // Finnish
  },
  'whiteboard.png': {
    en: 'Whiteboard',                 // American English
    de: 'Whiteboard',                 // German
    fr: 'Tableau blanc',              // French
    es: 'Pizarrón',                   // Mexican Spanish
    it: 'Lavagna bianca',             // Italian
    pt: 'Quadro branco',              // Brazilian Portuguese
    nl: 'Whiteboard',                 // Dutch
    sv: 'Whiteboard',                 // Swedish
    da: 'Whiteboard',                 // Danish
    no: 'Whiteboard',                 // Norwegian
    fi: 'Valkotaulu'                  // Finnish
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
