const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'sports_bw_2',
  type: 'images',
  sourceFolderName: 'sports bw 2',
  displayNames: {
    en: 'Sports BW 2',
    de: 'Sport SW 2',
    fr: 'Sports NB 2',
    es: 'Deportes BN 2',
    it: 'Sport BN 2',
    pt: 'Esportes PB 2',
    nl: 'Sport ZW 2',
    sv: 'Sport SV 2',
    da: 'Sport SH 2',
    no: 'Sport SH 2',
    fi: 'Urheilu MV 2'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'basketball': {
    en: 'Basketball',
    de: 'Basketball',
    fr: 'Basketball',
    es: 'Baloncesto',
    it: 'Pallacanestro',
    pt: 'Basquete',
    nl: 'Basketbal',
    sv: 'Basket',
    da: 'Basketball',
    no: 'Basketball',
    fi: 'Koripallo'
  },
  'bowling ball': {
    en: 'Bowling Ball',
    de: 'Bowlingkugel',
    fr: 'Boule de bowling',
    es: 'Bola de boliche',
    it: 'Palla da bowling',
    pt: 'Bola de boliche',
    nl: 'Bowlingbal',
    sv: 'Bowlingklot',
    da: 'Bowlingkugle',
    no: 'Bowlingkule',
    fi: 'Keilapallo'
  },
  'bowling pin': {
    en: 'Bowling Pin',
    de: 'Bowlingkegel',
    fr: 'Quille de bowling',
    es: 'Pino de boliche',
    it: 'Birillo',
    pt: 'Pino de boliche',
    nl: 'Bowlingpin',
    sv: 'Bowlingkägla',
    da: 'Bowlingkegle',
    no: 'Bowlingkjegle',
    fi: 'Keilakartiö'
  },
  'boxing glove': {
    en: 'Boxing Glove',
    de: 'Boxhandschuh',
    fr: 'Gant de boxe',
    es: 'Guante de boxeo',
    it: 'Guantone da boxe',
    pt: 'Luva de boxe',
    nl: 'Bokshandschoen',
    sv: 'Boxningshandske',
    da: 'Boksehandske',
    no: 'Boksehanske',
    fi: 'Nyrkkeilyhanska'
  },
  'flag': {
    en: 'Flag',
    de: 'Flagge',
    fr: 'Drapeau',
    es: 'Bandera',
    it: 'Bandiera',
    pt: 'Bandeira',
    nl: 'Vlag',
    sv: 'Flagga',
    da: 'Flag',
    no: 'Flagg',
    fi: 'Lippu'
  },
  'football': {
    en: 'Football',
    de: 'Football',
    fr: 'Football américain',
    es: 'Fútbol americano',
    it: 'Football americano',
    pt: 'Futebol americano',
    nl: 'American football',
    sv: 'Amerikansk fotboll',
    da: 'Amerikansk fodbold',
    no: 'Amerikansk fotball',
    fi: 'Amerikkalainen jalkapallo'
  },
  'helmet': {
    en: 'Helmet',
    de: 'Helm',
    fr: 'Casque',
    es: 'Casco',
    it: 'Casco',
    pt: 'Capacete',
    nl: 'Helm',
    sv: 'Hjälm',
    da: 'Hjelm',
    no: 'Hjelm',
    fi: 'Kypärä'
  },
  'ice skate': {
    en: 'Ice Skate',
    de: 'Schlittschuh',
    fr: 'Patin à glace',
    es: 'Patín de hielo',
    it: 'Pattino da ghiaccio',
    pt: 'Patins de gelo',
    nl: 'Schaats',
    sv: 'Skridskor',
    da: 'Skøjte',
    no: 'Skøyte',
    fi: 'Luistin'
  },
  'jump rope': {
    en: 'Jump Rope',
    de: 'Springseil',
    fr: 'Corde à sauter',
    es: 'Cuerda para saltar',
    it: 'Corda per saltare',
    pt: 'Corda de pular',
    nl: 'Springtouw',
    sv: 'Hopprep',
    da: 'Sjippetov',
    no: 'Hoppetau',
    fi: 'Hyppynaru'
  },
  'shuttlecock': {
    en: 'Shuttlecock',
    de: 'Federball',
    fr: 'Volant',
    es: 'Volante',
    it: 'Volano',
    pt: 'Peteca',
    nl: 'Shuttle',
    sv: 'Badmintonboll',
    da: 'Fjerbold',
    no: 'Badmintonball',
    fi: 'Sulkapallo'
  },
  'skateboard': {
    en: 'Skateboard',
    de: 'Skateboard',
    fr: 'Skateboard',
    es: 'Patineta',
    it: 'Skateboard',
    pt: 'Skate',
    nl: 'Skateboard',
    sv: 'Skateboard',
    da: 'Skateboard',
    no: 'Skateboard',
    fi: 'Rullalauta'
  },
  'sneaker': {
    en: 'Sneaker',
    de: 'Turnschuh',
    fr: 'Basket',
    es: 'Tenis',
    it: 'Scarpa da ginnastica',
    pt: 'Tênis',
    nl: 'Sneaker',
    sv: 'Sneaker',
    da: 'Sneaker',
    no: 'Joggesko',
    fi: 'Lenkkarit'
  },
  'soccer ball': {
    en: 'Soccer Ball',
    de: 'Fußball',
    fr: 'Ballon de football',
    es: 'Balón de fútbol',
    it: 'Pallone da calcio',
    pt: 'Bola de futebol',
    nl: 'Voetbal',
    sv: 'Fotboll',
    da: 'Fodbold',
    no: 'Fotball',
    fi: 'Jalkapallo'
  },
  'stopwatch': {
    en: 'Stopwatch',
    de: 'Stoppuhr',
    fr: 'Chronomètre',
    es: 'Cronómetro',
    it: 'Cronometro',
    pt: 'Cronômetro',
    nl: 'Stopwatch',
    sv: 'Stoppur',
    da: 'Stopur',
    no: 'Stoppeklokke',
    fi: 'Sekuntikello'
  },
  'tennis ball': {
    en: 'Tennis Ball',
    de: 'Tennisball',
    fr: 'Balle de tennis',
    es: 'Pelota de tenis',
    it: 'Pallina da tennis',
    pt: 'Bola de tênis',
    nl: 'Tennisbal',
    sv: 'Tennisboll',
    da: 'Tennisbold',
    no: 'Tennisball',
    fi: 'Tennispallo'
  },
  'tennis racket': {
    en: 'Tennis Racket',
    de: 'Tennisschläger',
    fr: 'Raquette de tennis',
    es: 'Raqueta de tenis',
    it: 'Racchetta da tennis',
    pt: 'Raquete de tênis',
    nl: 'Tennisracket',
    sv: 'Tennisracket',
    da: 'Tennisketsjer',
    no: 'Tennisracket',
    fi: 'Tennismaila'
  },
  'torch': {
    en: 'Torch',
    de: 'Fackel',
    fr: 'Torche',
    es: 'Antorcha',
    it: 'Torcia',
    pt: 'Tocha',
    nl: 'Fakkel',
    sv: 'Fackla',
    da: 'Fakkel',
    no: 'Fakkel',
    fi: 'Soihtu'
  },
  'trophy': {
    en: 'Trophy',
    de: 'Pokal',
    fr: 'Trophée',
    es: 'Trofeo',
    it: 'Trofeo',
    pt: 'Troféu',
    nl: 'Trofee',
    sv: 'Pokal',
    da: 'Pokal',
    no: 'Pokal',
    fi: 'Pokaali'
  },
  'volleyball': {
    en: 'Volleyball',
    de: 'Volleyball',
    fr: 'Volleyball',
    es: 'Voleibol',
    it: 'Pallavolo',
    pt: 'Vôlei',
    nl: 'Volleybal',
    sv: 'Volleyboll',
    da: 'Volleyball',
    no: 'Volleyball',
    fi: 'Lentopallo'
  },
  'water bottle': {
    en: 'Water Bottle',
    de: 'Wasserflasche',
    fr: 'Bouteille d\'eau',
    es: 'Botella de agua',
    it: 'Bottiglia d\'acqua',
    pt: 'Garrafa de água',
    nl: 'Waterfles',
    sv: 'Vattenflaska',
    da: 'Vandflaske',
    no: 'Vannflaske',
    fi: 'Vesipullo'
  }
};

// Paths
const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images', THEME_CONFIG.name);

// Image processing settings (from IMAGE LIBRARY.md)
const MAX_DIMENSION = 800;
const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Resize if needed, maintaining aspect ratio
  let processedImage = image;
  if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
    processedImage = image.resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  // Convert to WebP
  await processedImage.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

  // Get final dimensions
  const outputMetadata = await sharp(outputPath).metadata();
  return {
    width: outputMetadata.width,
    height: outputMetadata.height,
    size: fs.statSync(outputPath).size
  };
}

async function main() {
  console.log('============================================================');
  console.log('Image Import Script: Sports BW 2');
  console.log('============================================================\n');

  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  // Create destination directory
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log('Created destination directory');
  }

  // Create standalone directory
  if (!fs.existsSync(STANDALONE_DIR)) {
    fs.mkdirSync(STANDALONE_DIR, { recursive: true });
  }

  // Step 1: Create or get theme
  console.log('\n--- Step 1: Creating/Updating Theme ---');
  let theme = await prisma.imageTheme.findUnique({
    where: { name: THEME_CONFIG.name }
  });

  if (!theme) {
    const maxSortOrder = await prisma.imageTheme.aggregate({
      _max: { sortOrder: true }
    });

    theme = await prisma.imageTheme.create({
      data: {
        name: THEME_CONFIG.name,
        displayNames: THEME_CONFIG.displayNames,
        type: THEME_CONFIG.type,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1
      }
    });
    console.log(`Created new theme (id: ${theme.id})`);
  } else {
    console.log(`Using existing theme (id: ${theme.id})`);
  }

  // Step 2: Process images
  console.log('\n--- Step 2: Processing Images ---');
  const files = fs.readdirSync(SOURCE_DIR).filter(f =>
    /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f)
  );
  console.log(`Found ${files.length} image files\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const lookupKey = baseName.toLowerCase();

    console.log(`Processing: ${file}`);

    // Get translations
    const translations = IMAGE_TRANSLATIONS[lookupKey];
    if (!translations) {
      console.log(`  WARNING: No translations found for "${lookupKey}", skipping`);
      skipCount++;
      continue;
    }

    try {
      const inputPath = path.join(SOURCE_DIR, file);
      const newFilename = generateUniqueFilename(baseName);
      const outputPath = path.join(DEST_DIR, newFilename);

      // Process image
      const { width, height, size } = await processImage(inputPath, outputPath);

      // Copy to standalone
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));

      console.log(`  Saved: ${newFilename} (${width}x${height})`);

      // Check if already exists in database
      const existing = await prisma.imageLibraryItem.findFirst({
        where: {
          themeId: theme.id,
          translations: {
            path: ['en'],
            equals: translations.en
          }
        }
      });

      if (existing) {
        console.log(`  Already in database, skipping`);
        skipCount++;
        continue;
      }

      // Get max sort order for this theme
      const maxSort = await prisma.imageLibraryItem.aggregate({
        where: { themeId: theme.id },
        _max: { sortOrder: true }
      });

      // Create database record
      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/${THEME_CONFIG.name}/${newFilename}`,
          translations: translations,
          fileSize: size,
          mimeType: 'image/webp',
          width: width,
          height: height,
          sortOrder: (maxSort._max.sortOrder || 0) + 1
        }
      });

      console.log(`  Created database record`);
      successCount++;

    } catch (error) {
      console.log(`  ERROR: ${error.message}`);
      errorCount++;
    }
  }

  // Sync to standalone
  console.log('\n--- Syncing to standalone build ---');
  const destFiles = fs.readdirSync(DEST_DIR);
  for (const file of destFiles) {
    const src = path.join(DEST_DIR, file);
    const dest = path.join(STANDALONE_DIR, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log(`Copied ${destFiles.length} files to standalone`);

  console.log('\n============================================================');
  console.log('IMPORT COMPLETE');
  console.log('============================================================');
  console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
  console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
