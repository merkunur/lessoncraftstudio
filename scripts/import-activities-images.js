/**
 * Import Script: Activities Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-activities-images.js
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
  name: 'activities',
  type: 'images',
  displayNames: {
    en: 'Activities',
    de: 'Aktivitaten',
    fr: 'Activites',
    es: 'Actividades',
    it: 'Attivita',
    pt: 'Atividades',
    nl: 'Activiteiten',
    sv: 'Aktiviteter',
    da: 'Aktiviteter',
    no: 'Aktiviteter',
    fi: 'Aktiviteetit'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'baking.png': {
    en: 'Baking',
    de: 'Backen',
    fr: 'Patisserie',
    es: 'Hornear',
    it: 'Cucinare dolci',
    pt: 'Cozinhar',
    nl: 'Bakken',
    sv: 'Baka',
    da: 'Bage',
    no: 'Baking',
    fi: 'Leipominen'
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
  'basketball.png': {
    en: 'Basketball',
    de: 'Basketball',
    fr: 'Basketball',
    es: 'Basquetbol',
    it: 'Pallacanestro',
    pt: 'Basquete',
    nl: 'Basketbal',
    sv: 'Basket',
    da: 'Basketball',
    no: 'Basketball',
    fi: 'Koripallo'
  },
  'biking.png': {
    en: 'Biking',
    de: 'Radfahren',
    fr: 'Velo',
    es: 'Ciclismo',
    it: 'Ciclismo',
    pt: 'Ciclismo',
    nl: 'Fietsen',
    sv: 'Cykla',
    da: 'Cykling',
    no: 'Sykling',
    fi: 'Pyoraily'
  },
  'camping.png': {
    en: 'Camping',
    de: 'Camping',
    fr: 'Camping',
    es: 'Acampar',
    it: 'Campeggio',
    pt: 'Acampar',
    nl: 'Kamperen',
    sv: 'Camping',
    da: 'Camping',
    no: 'Camping',
    fi: 'Telttailu'
  },
  'chess.png': {
    en: 'Chess',
    de: 'Schach',
    fr: 'Echecs',
    es: 'Ajedrez',
    it: 'Scacchi',
    pt: 'Xadrez',
    nl: 'Schaken',
    sv: 'Schack',
    da: 'Skak',
    no: 'Sjakk',
    fi: 'Shakki'
  },
  'dancing.png': {
    en: 'Dancing',
    de: 'Tanzen',
    fr: 'Danse',
    es: 'Bailar',
    it: 'Ballare',
    pt: 'Dancar',
    nl: 'Dansen',
    sv: 'Dansa',
    da: 'Dans',
    no: 'Danse',
    fi: 'Tanssi'
  },
  'fishing.png': {
    en: 'Fishing',
    de: 'Angeln',
    fr: 'Peche',
    es: 'Pescar',
    it: 'Pesca',
    pt: 'Pescar',
    nl: 'Vissen',
    sv: 'Fiska',
    da: 'Fiskeri',
    no: 'Fiske',
    fi: 'Kalastus'
  },
  'football.png': {
    en: 'Football',
    de: 'American Football',
    fr: 'Football americain',
    es: 'Futbol americano',
    it: 'Football americano',
    pt: 'Futebol americano',
    nl: 'American football',
    sv: 'Amerikansk fotboll',
    da: 'Amerikansk fodbold',
    no: 'Amerikansk fotball',
    fi: 'Amerikkalainen jalkapallo'
  },
  'guitar.png': {
    en: 'Guitar',
    de: 'Gitarre',
    fr: 'Guitare',
    es: 'Guitarra',
    it: 'Chitarra',
    pt: 'Violao',
    nl: 'Gitaar',
    sv: 'Gitarr',
    da: 'Guitar',
    no: 'Gitar',
    fi: 'Kitara'
  },
  'gymnastics.png': {
    en: 'Gymnastics',
    de: 'Turnen',
    fr: 'Gymnastique',
    es: 'Gimnasia',
    it: 'Ginnastica',
    pt: 'Ginastica',
    nl: 'Gymnastiek',
    sv: 'Gymnastik',
    da: 'Gymnastik',
    no: 'Gymnastikk',
    fi: 'Voimistelu'
  },
  'hiking.png': {
    en: 'Hiking',
    de: 'Wandern',
    fr: 'Randonnee',
    es: 'Senderismo',
    it: 'Escursionismo',
    pt: 'Caminhada',
    nl: 'Wandelen',
    sv: 'Vandring',
    da: 'Vandring',
    no: 'Vandring',
    fi: 'Patikointi'
  },
  'jumping.png': {
    en: 'Jumping',
    de: 'Springen',
    fr: 'Sauter',
    es: 'Saltar',
    it: 'Saltare',
    pt: 'Pular',
    nl: 'Springen',
    sv: 'Hoppa',
    da: 'Hoppe',
    no: 'Hoppe',
    fi: 'Hyppiminen'
  },
  'knitting.png': {
    en: 'Knitting',
    de: 'Stricken',
    fr: 'Tricot',
    es: 'Tejer',
    it: 'Lavorare a maglia',
    pt: 'Tricotar',
    nl: 'Breien',
    sv: 'Sticka',
    da: 'Strikning',
    no: 'Strikking',
    fi: 'Neulominen'
  },
  'painting.png': {
    en: 'Painting',
    de: 'Malen',
    fr: 'Peinture',
    es: 'Pintar',
    it: 'Dipingere',
    pt: 'Pintar',
    nl: 'Schilderen',
    sv: 'Mala',
    da: 'Male',
    no: 'Male',
    fi: 'Maalaus'
  },
  'photography.png': {
    en: 'Photography',
    de: 'Fotografie',
    fr: 'Photographie',
    es: 'Fotografia',
    it: 'Fotografia',
    pt: 'Fotografia',
    nl: 'Fotografie',
    sv: 'Fotografering',
    da: 'Fotografering',
    no: 'Fotografering',
    fi: 'Valokuvaus'
  },
  'piano.png': {
    en: 'Piano',
    de: 'Klavier',
    fr: 'Piano',
    es: 'Piano',
    it: 'Pianoforte',
    pt: 'Piano',
    nl: 'Piano',
    sv: 'Piano',
    da: 'Klaver',
    no: 'Piano',
    fi: 'Piano'
  },
  'picnic.png': {
    en: 'Picnic',
    de: 'Picknick',
    fr: 'Pique-nique',
    es: 'Picnic',
    it: 'Picnic',
    pt: 'Piquenique',
    nl: 'Picknick',
    sv: 'Picknick',
    da: 'Picnic',
    no: 'Piknik',
    fi: 'Piknik'
  },
  'playground.png': {
    en: 'Playground',
    de: 'Spielplatz',
    fr: 'Aire de jeux',
    es: 'Parque de juegos',
    it: 'Parco giochi',
    pt: 'Parquinho',
    nl: 'Speeltuin',
    sv: 'Lekplats',
    da: 'Legeplads',
    no: 'Lekeplass',
    fi: 'Leikkikentta'
  },
  'pottery.png': {
    en: 'Pottery',
    de: 'Topfern',
    fr: 'Poterie',
    es: 'Ceramica',
    it: 'Ceramica',
    pt: 'Ceramica',
    nl: 'Pottenbakken',
    sv: 'Keramik',
    da: 'Keramik',
    no: 'Keramikk',
    fi: 'Keramiikka'
  },
  'puzzle.png': {
    en: 'Puzzle',
    de: 'Puzzle',
    fr: 'Puzzle',
    es: 'Rompecabezas',
    it: 'Puzzle',
    pt: 'Quebra-cabeca',
    nl: 'Puzzel',
    sv: 'Pussel',
    da: 'Puslespil',
    no: 'Puslespill',
    fi: 'Palapeli'
  },
  'reading.png': {
    en: 'Reading',
    de: 'Lesen',
    fr: 'Lecture',
    es: 'Leer',
    it: 'Leggere',
    pt: 'Ler',
    nl: 'Lezen',
    sv: 'Lasa',
    da: 'Laese',
    no: 'Lese',
    fi: 'Lukeminen'
  },
  'running.png': {
    en: 'Running',
    de: 'Laufen',
    fr: 'Course',
    es: 'Correr',
    it: 'Correre',
    pt: 'Correr',
    nl: 'Rennen',
    sv: 'Springa',
    da: 'Lobe',
    no: 'Lope',
    fi: 'Juoksu'
  },
  'science.png': {
    en: 'Science',
    de: 'Wissenschaft',
    fr: 'Science',
    es: 'Ciencia',
    it: 'Scienza',
    pt: 'Ciencia',
    nl: 'Wetenschap',
    sv: 'Vetenskap',
    da: 'Videnskab',
    no: 'Vitenskap',
    fi: 'Tiede'
  },
  'sewing.png': {
    en: 'Sewing',
    de: 'Nahen',
    fr: 'Couture',
    es: 'Coser',
    it: 'Cucire',
    pt: 'Costurar',
    nl: 'Naaien',
    sv: 'Sy',
    da: 'Sy',
    no: 'Sy',
    fi: 'Ompelu'
  },
  'singing.png': {
    en: 'Singing',
    de: 'Singen',
    fr: 'Chant',
    es: 'Cantar',
    it: 'Cantare',
    pt: 'Cantar',
    nl: 'Zingen',
    sv: 'Sjunga',
    da: 'Synge',
    no: 'Synge',
    fi: 'Laulaminen'
  },
  'skating.png': {
    en: 'Skating',
    de: 'Schlittschuhlaufen',
    fr: 'Patinage',
    es: 'Patinar',
    it: 'Pattinaggio',
    pt: 'Patinacao',
    nl: 'Schaatsen',
    sv: 'Skridskoakning',
    da: 'Skojtelobning',
    no: 'Skoyteloping',
    fi: 'Luistelu'
  },
  'skiing.png': {
    en: 'Skiing',
    de: 'Skifahren',
    fr: 'Ski',
    es: 'Esquiar',
    it: 'Sciare',
    pt: 'Esquiar',
    nl: 'Skieen',
    sv: 'Skidakning',
    da: 'Skisport',
    no: 'Ski',
    fi: 'Hiihto'
  },
  'soccer.png': {
    en: 'Soccer',
    de: 'Fussball',
    fr: 'Football',
    es: 'Futbol',
    it: 'Calcio',
    pt: 'Futebol',
    nl: 'Voetbal',
    sv: 'Fotboll',
    da: 'Fodbold',
    no: 'Fotball',
    fi: 'Jalkapallo'
  },
  'swimming.png': {
    en: 'Swimming',
    de: 'Schwimmen',
    fr: 'Natation',
    es: 'Nadar',
    it: 'Nuoto',
    pt: 'Natacao',
    nl: 'Zwemmen',
    sv: 'Simning',
    da: 'Svomning',
    no: 'Svomming',
    fi: 'Uinti'
  },
  'tennis.png': {
    en: 'Tennis',
    de: 'Tennis',
    fr: 'Tennis',
    es: 'Tenis',
    it: 'Tennis',
    pt: 'Tenis',
    nl: 'Tennis',
    sv: 'Tennis',
    da: 'Tennis',
    no: 'Tennis',
    fi: 'Tennis'
  },
  'theater.png': {
    en: 'Theater',
    de: 'Theater',
    fr: 'Theatre',
    es: 'Teatro',
    it: 'Teatro',
    pt: 'Teatro',
    nl: 'Theater',
    sv: 'Teater',
    da: 'Teater',
    no: 'Teater',
    fi: 'Teatteri'
  },
  'violin.png': {
    en: 'Violin',
    de: 'Geige',
    fr: 'Violon',
    es: 'Violin',
    it: 'Violino',
    pt: 'Violino',
    nl: 'Viool',
    sv: 'Fiol',
    da: 'Violin',
    no: 'Fiolin',
    fi: 'Viulu'
  },
  'writing.png': {
    en: 'Writing',
    de: 'Schreiben',
    fr: 'Ecriture',
    es: 'Escribir',
    it: 'Scrivere',
    pt: 'Escrever',
    nl: 'Schrijven',
    sv: 'Skriva',
    da: 'Skrive',
    no: 'Skrive',
    fi: 'Kirjoittaminen'
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
  const sourceFolderName = 'activities';

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
