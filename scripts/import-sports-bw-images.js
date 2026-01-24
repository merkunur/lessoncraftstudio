const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'sports_bw',
  type: 'images',
  sourceFolderName: 'sports bw',
  displayNames: {
    en: 'Sports BW',
    de: 'Sport SW',
    fr: 'Sports NB',
    es: 'Deportes BN',
    it: 'Sport BN',
    pt: 'Esportes PB',
    nl: 'Sport ZW',
    sv: 'Sport SV',
    da: 'Sport SH',
    no: 'Sport SH',
    fi: 'Urheilu MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'badminton': {
    en: 'Badminton',
    de: 'Badminton',
    fr: 'Badminton',
    es: 'Bádminton',
    it: 'Badminton',
    pt: 'Badminton',
    nl: 'Badminton',
    sv: 'Badminton',
    da: 'Badminton',
    no: 'Badminton',
    fi: 'Sulkapallo'
  },
  'baseball 2': {
    en: 'Baseball 2',
    de: 'Baseball 2',
    fr: 'Baseball 2',
    es: 'Béisbol 2',
    it: 'Baseball 2',
    pt: 'Beisebol 2',
    nl: 'Honkbal 2',
    sv: 'Baseboll 2',
    da: 'Baseball 2',
    no: 'Baseball 2',
    fi: 'Pesäpallo 2'
  },
  'baseball': {
    en: 'Baseball',
    de: 'Baseball',
    fr: 'Baseball',
    es: 'Béisbol',
    it: 'Baseball',
    pt: 'Beisebol',
    nl: 'Honkbal',
    sv: 'Baseboll',
    da: 'Baseball',
    no: 'Baseball',
    fi: 'Pesäpallo'
  },
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
  'beach ball': {
    en: 'Beach Ball',
    de: 'Wasserball',
    fr: 'Ballon de plage',
    es: 'Pelota de playa',
    it: 'Pallone da spiaggia',
    pt: 'Bola de praia',
    nl: 'Strandbal',
    sv: 'Badboll',
    da: 'Badebold',
    no: 'Badeball',
    fi: 'Rantapallo'
  },
  'bicycle': {
    en: 'Bicycle',
    de: 'Fahrrad',
    fr: 'Vélo',
    es: 'Bicicleta',
    it: 'Bicicletta',
    pt: 'Bicicleta',
    nl: 'Fiets',
    sv: 'Cykel',
    da: 'Cykel',
    no: 'Sykkel',
    fi: 'Polkupyörä'
  },
  'bowling': {
    en: 'Bowling',
    de: 'Bowling',
    fr: 'Bowling',
    es: 'Boliche',
    it: 'Bowling',
    pt: 'Boliche',
    nl: 'Bowlen',
    sv: 'Bowling',
    da: 'Bowling',
    no: 'Bowling',
    fi: 'Keilailu'
  },
  'boxing': {
    en: 'Boxing',
    de: 'Boxen',
    fr: 'Boxe',
    es: 'Boxeo',
    it: 'Pugilato',
    pt: 'Boxe',
    nl: 'Boksen',
    sv: 'Boxning',
    da: 'Boksning',
    no: 'Boksing',
    fi: 'Nyrkkeily'
  },
  'cap': {
    en: 'Cap',
    de: 'Mütze',
    fr: 'Casquette',
    es: 'Gorra',
    it: 'Cappellino',
    pt: 'Boné',
    nl: 'Pet',
    sv: 'Keps',
    da: 'Kasket',
    no: 'Caps',
    fi: 'Lippalakki'
  },
  'cricket': {
    en: 'Cricket',
    de: 'Cricket',
    fr: 'Cricket',
    es: 'Críquet',
    it: 'Cricket',
    pt: 'Críquete',
    nl: 'Cricket',
    sv: 'Cricket',
    da: 'Cricket',
    no: 'Cricket',
    fi: 'Kriketti'
  },
  'dart': {
    en: 'Dart',
    de: 'Dartpfeil',
    fr: 'Fléchette',
    es: 'Dardo',
    it: 'Freccetta',
    pt: 'Dardo',
    nl: 'Dartpijl',
    sv: 'Pil',
    da: 'Dartpil',
    no: 'Dartpil',
    fi: 'Tikka'
  },
  'dumbbell  2': {
    en: 'Dumbbell 2',
    de: 'Hantel 2',
    fr: 'Haltère 2',
    es: 'Mancuerna 2',
    it: 'Manubrio 2',
    pt: 'Halter 2',
    nl: 'Halter 2',
    sv: 'Hantel 2',
    da: 'Håndvægt 2',
    no: 'Håndvekt 2',
    fi: 'Käsipaino 2'
  },
  'dumbbell': {
    en: 'Dumbbell',
    de: 'Hantel',
    fr: 'Haltère',
    es: 'Mancuerna',
    it: 'Manubrio',
    pt: 'Halter',
    nl: 'Halter',
    sv: 'Hantel',
    da: 'Håndvægt',
    no: 'Håndvekt',
    fi: 'Käsipaino'
  },
  'eight ball': {
    en: 'Eight Ball',
    de: 'Billardkugel',
    fr: 'Boule huit',
    es: 'Bola ocho',
    it: 'Palla otto',
    pt: 'Bola oito',
    nl: 'Achtbal',
    sv: 'Åttaboll',
    da: 'Otterbold',
    no: 'Åtteball',
    fi: 'Kahdeksanpallo'
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
  'football 2': {
    en: 'Football 2',
    de: 'Football 2',
    fr: 'Football américain 2',
    es: 'Fútbol americano 2',
    it: 'Football americano 2',
    pt: 'Futebol americano 2',
    nl: 'American football 2',
    sv: 'Amerikansk fotboll 2',
    da: 'Amerikansk fodbold 2',
    no: 'Amerikansk fotball 2',
    fi: 'Amerikkalainen jalkapallo 2'
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
  'goggles': {
    en: 'Goggles',
    de: 'Schwimmbrille',
    fr: 'Lunettes de natation',
    es: 'Goggles',
    it: 'Occhialini',
    pt: 'Óculos de natação',
    nl: 'Zwembril',
    sv: 'Simglasögon',
    da: 'Svømmebriller',
    no: 'Svømmebriller',
    fi: 'Uimalasit'
  },
  'golf ': {
    en: 'Golf',
    de: 'Golf',
    fr: 'Golf',
    es: 'Golf',
    it: 'Golf',
    pt: 'Golfe',
    nl: 'Golf',
    sv: 'Golf',
    da: 'Golf',
    no: 'Golf',
    fi: 'Golf'
  },
  'golf 2': {
    en: 'Golf 2',
    de: 'Golf 2',
    fr: 'Golf 2',
    es: 'Golf 2',
    it: 'Golf 2',
    pt: 'Golfe 2',
    nl: 'Golf 2',
    sv: 'Golf 2',
    da: 'Golf 2',
    no: 'Golf 2',
    fi: 'Golf 2'
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
  'hockey': {
    en: 'Hockey',
    de: 'Hockey',
    fr: 'Hockey',
    es: 'Hockey',
    it: 'Hockey',
    pt: 'Hóquei',
    nl: 'Hockey',
    sv: 'Hockey',
    da: 'Hockey',
    no: 'Hockey',
    fi: 'Jääkiekko'
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
  'kettlebell': {
    en: 'Kettlebell',
    de: 'Kugelhantel',
    fr: 'Kettlebell',
    es: 'Pesa rusa',
    it: 'Kettlebell',
    pt: 'Kettlebell',
    nl: 'Kettlebell',
    sv: 'Kettlebell',
    da: 'Kettlebell',
    no: 'Kettlebell',
    fi: 'Kahvakuula'
  },
  'race car': {
    en: 'Race Car',
    de: 'Rennwagen',
    fr: 'Voiture de course',
    es: 'Auto de carreras',
    it: 'Auto da corsa',
    pt: 'Carro de corrida',
    nl: 'Raceauto',
    sv: 'Racerbil',
    da: 'Racerbil',
    no: 'Racerbil',
    fi: 'Kilpa-auto'
  },
  'rollerblade': {
    en: 'Rollerblade',
    de: 'Inlineskate',
    fr: 'Roller',
    es: 'Patines en línea',
    it: 'Pattino in linea',
    pt: 'Patins inline',
    nl: 'Skeeler',
    sv: 'Inlines',
    da: 'Rulleskøjte',
    no: 'Rulleskøyte',
    fi: 'Rullaluistin'
  },
  'rosette': {
    en: 'Rosette',
    de: 'Rosette',
    fr: 'Rosette',
    es: 'Escarapela',
    it: 'Coccarda',
    pt: 'Roseta',
    nl: 'Rozet',
    sv: 'Rosett',
    da: 'Roset',
    no: 'Rosett',
    fi: 'Ruusuke'
  },
  'scale': {
    en: 'Scale',
    de: 'Waage',
    fr: 'Balance',
    es: 'Báscula',
    it: 'Bilancia',
    pt: 'Balança',
    nl: 'Weegschaal',
    sv: 'Våg',
    da: 'Vægt',
    no: 'Vekt',
    fi: 'Vaaka'
  },
  'scooter': {
    en: 'Scooter',
    de: 'Roller',
    fr: 'Trottinette',
    es: 'Scooter',
    it: 'Monopattino',
    pt: 'Patinete',
    nl: 'Step',
    sv: 'Sparkcykel',
    da: 'Løbehjul',
    no: 'Sparkesykkel',
    fi: 'Potkulauta'
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
  'soccer': {
    en: 'Soccer',
    de: 'Fußball',
    fr: 'Football',
    es: 'Fútbol',
    it: 'Calcio',
    pt: 'Futebol',
    nl: 'Voetbal',
    sv: 'Fotboll',
    da: 'Fodbold',
    no: 'Fotball',
    fi: 'Jalkapallo'
  },
  'stopwatch 2': {
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
  'table tennis': {
    en: 'Table Tennis',
    de: 'Tischtennis',
    fr: 'Tennis de table',
    es: 'Tenis de mesa',
    it: 'Ping pong',
    pt: 'Tênis de mesa',
    nl: 'Tafeltennis',
    sv: 'Bordtennis',
    da: 'Bordtennis',
    no: 'Bordtennis',
    fi: 'Pöytätennis'
  },
  'tape measure': {
    en: 'Tape Measure',
    de: 'Maßband',
    fr: 'Mètre ruban',
    es: 'Cinta métrica',
    it: 'Metro a nastro',
    pt: 'Fita métrica',
    nl: 'Meetlint',
    sv: 'Måttband',
    da: 'Målebånd',
    no: 'Målebånd',
    fi: 'Mittanauha'
  },
  'tennis': {
    en: 'Tennis',
    de: 'Tennis',
    fr: 'Tennis',
    es: 'Tenis',
    it: 'Tennis',
    pt: 'Tênis',
    nl: 'Tennis',
    sv: 'Tennis',
    da: 'Tennis',
    no: 'Tennis',
    fi: 'Tennis'
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
  'whistle': {
    en: 'Whistle',
    de: 'Pfeife',
    fr: 'Sifflet',
    es: 'Silbato',
    it: 'Fischietto',
    pt: 'Apito',
    nl: 'Fluitje',
    sv: 'Visselpipa',
    da: 'Fløjte',
    no: 'Fløyte',
    fi: 'Pilli'
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
  console.log('Image Import Script: Sports BW');
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
