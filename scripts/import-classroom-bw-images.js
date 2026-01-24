/**
 * Import Script: Classroom BW (Black and White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-classroom-bw-images.js
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
// CONFIGURATION - CLASSROOM BW THEME
// ============================================================

const THEME_CONFIG = {
  name: 'classroom_bw',
  type: 'images',
  sourceFolderName: 'classroom bw',
  displayNames: {
    en: 'Classroom (B&W)',              // American English
    de: 'Klassenzimmer (S/W)',          // German
    fr: 'Salle de classe (N&B)',        // French
    es: 'Salón de clases (B/N)',        // Mexican Spanish
    it: 'Aula (B/N)',                   // Italian
    pt: 'Sala de aula (P&B)',           // Brazilian Portuguese
    nl: 'Klaslokaal (Z/W)',             // Dutch
    sv: 'Klassrum (S/V)',               // Swedish
    da: 'Klasseværelse (S/H)',          // Danish
    no: 'Klasserom (S/H)',              // Norwegian
    fi: 'Luokkahuone (M/V)'             // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'bell.png': {
    en: 'Bell',                         // American English
    de: 'Glocke',                       // German
    fr: 'Cloche',                       // French
    es: 'Campana',                      // Mexican Spanish
    it: 'Campanella',                   // Italian
    pt: 'Sino',                         // Brazilian Portuguese
    nl: 'Bel',                          // Dutch
    sv: 'Klocka',                       // Swedish
    da: 'Klokke',                       // Danish
    no: 'Bjelle',                       // Norwegian
    fi: 'Kello'                         // Finnish
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
  'briefcase.png': {
    en: 'Briefcase',                    // American English
    de: 'Aktentasche',                  // German
    fr: 'Mallette',                     // French
    es: 'Maletín',                      // Mexican Spanish
    it: 'Valigetta',                    // Italian
    pt: 'Pasta',                        // Brazilian Portuguese
    nl: 'Aktetas',                      // Dutch
    sv: 'Portfölj',                     // Swedish
    da: 'Mappe',                        // Danish
    no: 'Dokumentmappe',                // Norwegian
    fi: 'Salkku'                        // Finnish
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
  'graduation cap.png': {
    en: 'Graduation Cap',               // American English
    de: 'Doktorhut',                    // German
    fr: 'Mortier',                      // French
    es: 'Birrete',                      // Mexican Spanish
    it: 'Tocco',                        // Italian
    pt: 'Capelo',                       // Brazilian Portuguese
    nl: 'Afstudeerhoed',                // Dutch
    sv: 'Studentmössa',                 // Swedish
    da: 'Studenterhue',                 // Danish
    no: 'Studentlue',                   // Norwegian
    fi: 'Ylioppilaslakki'               // Finnish
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
  'marker.png': {
    en: 'Marker',                       // American English
    de: 'Marker',                       // German
    fr: 'Marqueur',                     // French
    es: 'Marcador',                     // Mexican Spanish
    it: 'Pennarello',                   // Italian
    pt: 'Marcador',                     // Brazilian Portuguese
    nl: 'Stift',                        // Dutch
    sv: 'Tuschpenna',                   // Swedish
    da: 'Tusch',                        // Danish
    no: 'Tusj',                         // Norwegian
    fi: 'Tussi'                         // Finnish
  },
  'microphone.png': {
    en: 'Microphone',                   // American English
    de: 'Mikrofon',                     // German
    fr: 'Microphone',                   // French
    es: 'Micrófono',                    // Mexican Spanish
    it: 'Microfono',                    // Italian
    pt: 'Microfone',                    // Brazilian Portuguese
    nl: 'Microfoon',                    // Dutch
    sv: 'Mikrofon',                     // Swedish
    da: 'Mikrofon',                     // Danish
    no: 'Mikrofon',                     // Norwegian
    fi: 'Mikrofoni'                     // Finnish
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
  'projector.png': {
    en: 'Projector',                    // American English
    de: 'Projektor',                    // German
    fr: 'Projecteur',                   // French
    es: 'Proyector',                    // Mexican Spanish
    it: 'Proiettore',                   // Italian
    pt: 'Projetor',                     // Brazilian Portuguese
    nl: 'Projector',                    // Dutch
    sv: 'Projektor',                    // Swedish
    da: 'Projektor',                    // Danish
    no: 'Prosjektor',                   // Norwegian
    fi: 'Projektori'                    // Finnish
  },
  'puzzle.png': {
    en: 'Puzzle',                       // American English
    de: 'Puzzle',                       // German
    fr: 'Puzzle',                       // French
    es: 'Rompecabezas',                 // Mexican Spanish
    it: 'Puzzle',                       // Italian
    pt: 'Quebra-cabeça',                // Brazilian Portuguese
    nl: 'Puzzel',                       // Dutch
    sv: 'Pussel',                       // Swedish
    da: 'Puslespil',                    // Danish
    no: 'Puslespill',                   // Norwegian
    fi: 'Palapeli'                      // Finnish
  },
  'ruler.png': {
    en: 'Ruler',                        // American English
    de: 'Lineal',                       // German
    fr: 'Règle',                        // French
    es: 'Regla',                        // Mexican Spanish
    it: 'Righello',                     // Italian
    pt: 'Régua',                        // Brazilian Portuguese
    nl: 'Liniaal',                      // Dutch
    sv: 'Linjal',                       // Swedish
    da: 'Lineal',                       // Danish
    no: 'Linjal',                       // Norwegian
    fi: 'Viivain'                       // Finnish
  },
  'stamp.png': {
    en: 'Stamp',                        // American English
    de: 'Stempel',                      // German
    fr: 'Tampon',                       // French
    es: 'Sello',                        // Mexican Spanish
    it: 'Timbro',                       // Italian
    pt: 'Carimbo',                      // Brazilian Portuguese
    nl: 'Stempel',                      // Dutch
    sv: 'Stämpel',                      // Swedish
    da: 'Stempel',                      // Danish
    no: 'Stempel',                      // Norwegian
    fi: 'Leima'                         // Finnish
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
  'telescope.png': {
    en: 'Telescope',                    // American English
    de: 'Teleskop',                     // German
    fr: 'Télescope',                    // French
    es: 'Telescopio',                   // Mexican Spanish
    it: 'Telescopio',                   // Italian
    pt: 'Telescópio',                   // Brazilian Portuguese
    nl: 'Telescoop',                    // Dutch
    sv: 'Teleskop',                     // Swedish
    da: 'Teleskop',                     // Danish
    no: 'Teleskop',                     // Norwegian
    fi: 'Kaukoputki'                    // Finnish
  },
  'trophy.png': {
    en: 'Trophy',                       // American English
    de: 'Pokal',                        // German
    fr: 'Trophée',                      // French
    es: 'Trofeo',                       // Mexican Spanish
    it: 'Trofeo',                       // Italian
    pt: 'Troféu',                       // Brazilian Portuguese
    nl: 'Trofee',                       // Dutch
    sv: 'Trofé',                        // Swedish
    da: 'Trofæ',                        // Danish
    no: 'Trofé',                        // Norwegian
    fi: 'Palkinto'                      // Finnish
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
