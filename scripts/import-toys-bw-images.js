const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'toys_bw',
  type: 'images',
  sourceFolderName: 'toys bw',
  displayNames: {
    en: 'Toys BW',
    de: 'Spielzeug SW',
    fr: 'Jouets NB',
    es: 'Juguetes BN',
    it: 'Giocattoli BN',
    pt: 'Brinquedos PB',
    nl: 'Speelgoed ZW',
    sv: 'Leksaker SV',
    da: 'Legetøj SH',
    no: 'Leker SH',
    fi: 'Lelut MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'airplane': {
    en: 'Airplane',
    de: 'Flugzeug',
    fr: 'Avion',
    es: 'Avión',
    it: 'Aeroplano',
    pt: 'Avião',
    nl: 'Vliegtuig',
    sv: 'Flygplan',
    da: 'Flyvemaskine',
    no: 'Fly',
    fi: 'Lentokone'
  },
  'boat': {
    en: 'Boat',
    de: 'Boot',
    fr: 'Bateau',
    es: 'Barco',
    it: 'Barca',
    pt: 'Barco',
    nl: 'Boot',
    sv: 'Båt',
    da: 'Båd',
    no: 'Båt',
    fi: 'Vene'
  },
  'bucket': {
    en: 'Bucket',
    de: 'Eimer',
    fr: 'Seau',
    es: 'Cubeta',
    it: 'Secchio',
    pt: 'Balde',
    nl: 'Emmer',
    sv: 'Hink',
    da: 'Spand',
    no: 'Bøtte',
    fi: 'Ämpäri'
  },
  'cactus': {
    en: 'Cactus',
    de: 'Kaktus',
    fr: 'Cactus',
    es: 'Cactus',
    it: 'Cactus',
    pt: 'Cacto',
    nl: 'Cactus',
    sv: 'Kaktus',
    da: 'Kaktus',
    no: 'Kaktus',
    fi: 'Kaktus'
  },
  'car': {
    en: 'Car',
    de: 'Auto',
    fr: 'Voiture',
    es: 'Carro',
    it: 'Automobile',
    pt: 'Carro',
    nl: 'Auto',
    sv: 'Bil',
    da: 'Bil',
    no: 'Bil',
    fi: 'Auto'
  },
  'dinosaur': {
    en: 'Dinosaur',
    de: 'Dinosaurier',
    fr: 'Dinosaure',
    es: 'Dinosaurio',
    it: 'Dinosauro',
    pt: 'Dinossauro',
    nl: 'Dinosaurus',
    sv: 'Dinosaurie',
    da: 'Dinosaur',
    no: 'Dinosaur',
    fi: 'Dinosaurus'
  },
  'drum': {
    en: 'Drum',
    de: 'Trommel',
    fr: 'Tambour',
    es: 'Tambor',
    it: 'Tamburo',
    pt: 'Tambor',
    nl: 'Trommel',
    sv: 'Trumma',
    da: 'Tromme',
    no: 'Tromme',
    fi: 'Rumpu'
  },
  'duck': {
    en: 'Duck',
    de: 'Ente',
    fr: 'Canard',
    es: 'Pato',
    it: 'Anatra',
    pt: 'Pato',
    nl: 'Eend',
    sv: 'Anka',
    da: 'And',
    no: 'And',
    fi: 'Ankka'
  },
  'garbage truck': {
    en: 'Garbage Truck',
    de: 'Müllwagen',
    fr: 'Camion poubelle',
    es: 'Camión de basura',
    it: 'Camion della spazzatura',
    pt: 'Caminhão de lixo',
    nl: 'Vuilniswagen',
    sv: 'Sopbil',
    da: 'Skraldebil',
    no: 'Søppelbil',
    fi: 'Jäteauto'
  },
  'guitar': {
    en: 'Guitar',
    de: 'Gitarre',
    fr: 'Guitare',
    es: 'Guitarra',
    it: 'Chitarra',
    pt: 'Violão',
    nl: 'Gitaar',
    sv: 'Gitarr',
    da: 'Guitar',
    no: 'Gitar',
    fi: 'Kitara'
  },
  'helicopter': {
    en: 'Helicopter',
    de: 'Hubschrauber',
    fr: 'Hélicoptère',
    es: 'Helicóptero',
    it: 'Elicottero',
    pt: 'Helicóptero',
    nl: 'Helikopter',
    sv: 'Helikopter',
    da: 'Helikopter',
    no: 'Helikopter',
    fi: 'Helikopteri'
  },
  'loader': {
    en: 'Loader',
    de: 'Radlader',
    fr: 'Chargeuse',
    es: 'Cargador',
    it: 'Pala caricatrice',
    pt: 'Carregadeira',
    nl: 'Shovel',
    sv: 'Hjullastare',
    da: 'Læsser',
    no: 'Hjullaster',
    fi: 'Pyöräkuormaaja'
  },
  'monster truck': {
    en: 'Monster Truck',
    de: 'Monstertruck',
    fr: 'Monster truck',
    es: 'Camioneta monstruo',
    it: 'Monster truck',
    pt: 'Caminhão monstro',
    nl: 'Monstertruck',
    sv: 'Monstertruck',
    da: 'Monstertruck',
    no: 'Monstertruck',
    fi: 'Monsteriauto'
  },
  'motorcycle': {
    en: 'Motorcycle',
    de: 'Motorrad',
    fr: 'Moto',
    es: 'Motocicleta',
    it: 'Motocicletta',
    pt: 'Motocicleta',
    nl: 'Motor',
    sv: 'Motorcykel',
    da: 'Motorcykel',
    no: 'Motorsykkel',
    fi: 'Moottoripyörä'
  },
  'party hat': {
    en: 'Party Hat',
    de: 'Partyhut',
    fr: 'Chapeau de fête',
    es: 'Gorro de fiesta',
    it: 'Cappello da festa',
    pt: 'Chapéu de festa',
    nl: 'Feesthoedje',
    sv: 'Partyhatt',
    da: 'Festhat',
    no: 'Festlue',
    fi: 'Juhlahattu'
  },
  'robot': {
    en: 'Robot',
    de: 'Roboter',
    fr: 'Robot',
    es: 'Robot',
    it: 'Robot',
    pt: 'Robô',
    nl: 'Robot',
    sv: 'Robot',
    da: 'Robot',
    no: 'Robot',
    fi: 'Robotti'
  },
  'rocket': {
    en: 'Rocket',
    de: 'Rakete',
    fr: 'Fusée',
    es: 'Cohete',
    it: 'Razzo',
    pt: 'Foguete',
    nl: 'Raket',
    sv: 'Raket',
    da: 'Raket',
    no: 'Rakett',
    fi: 'Raketti'
  },
  'rocking horse': {
    en: 'Rocking Horse',
    de: 'Schaukelpferd',
    fr: 'Cheval à bascule',
    es: 'Caballito mecedor',
    it: 'Cavallo a dondolo',
    pt: 'Cavalo de balanço',
    nl: 'Hobbelpaard',
    sv: 'Gunghäst',
    da: 'Gyngehest',
    no: 'Gyngehest',
    fi: 'Keinuhevonen'
  },
  'spinning top': {
    en: 'Spinning Top',
    de: 'Kreisel',
    fr: 'Toupie',
    es: 'Trompo',
    it: 'Trottola',
    pt: 'Pião',
    nl: 'Tol',
    sv: 'Snurra',
    da: 'Snurretop',
    no: 'Snurrebass',
    fi: 'Hyrrä'
  },
  'tank': {
    en: 'Tank',
    de: 'Panzer',
    fr: 'Char',
    es: 'Tanque',
    it: 'Carro armato',
    pt: 'Tanque',
    nl: 'Tank',
    sv: 'Stridsvagn',
    da: 'Tank',
    no: 'Stridsvogn',
    fi: 'Panssarivaunu'
  },
  'teddy bear': {
    en: 'Teddy Bear',
    de: 'Teddybär',
    fr: 'Ours en peluche',
    es: 'Oso de peluche',
    it: 'Orsacchiotto',
    pt: 'Ursinho de pelúcia',
    nl: 'Teddybeer',
    sv: 'Nallebjörn',
    da: 'Bamse',
    no: 'Teddybjørn',
    fi: 'Nalle'
  },
  'tractor': {
    en: 'Tractor',
    de: 'Traktor',
    fr: 'Tracteur',
    es: 'Tractor',
    it: 'Trattore',
    pt: 'Trator',
    nl: 'Tractor',
    sv: 'Traktor',
    da: 'Traktor',
    no: 'Traktor',
    fi: 'Traktori'
  },
  'train': {
    en: 'Train',
    de: 'Zug',
    fr: 'Train',
    es: 'Tren',
    it: 'Treno',
    pt: 'Trem',
    nl: 'Trein',
    sv: 'Tåg',
    da: 'Tog',
    no: 'Tog',
    fi: 'Juna'
  },
  'trumpet': {
    en: 'Trumpet',
    de: 'Trompete',
    fr: 'Trompette',
    es: 'Trompeta',
    it: 'Tromba',
    pt: 'Trompete',
    nl: 'Trompet',
    sv: 'Trumpet',
    da: 'Trompet',
    no: 'Trompet',
    fi: 'Trumpetti'
  },
  'ufo': {
    en: 'UFO',
    de: 'UFO',
    fr: 'OVNI',
    es: 'OVNI',
    it: 'UFO',
    pt: 'OVNI',
    nl: 'UFO',
    sv: 'UFO',
    da: 'UFO',
    no: 'UFO',
    fi: 'UFO'
  },
  'video game': {
    en: 'Video Game',
    de: 'Videospiel',
    fr: 'Jeu vidéo',
    es: 'Videojuego',
    it: 'Videogioco',
    pt: 'Videogame',
    nl: 'Videospel',
    sv: 'TV-spel',
    da: 'Videospil',
    no: 'Videospill',
    fi: 'Videopeli'
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
  console.log('Image Import Script: Toys BW');
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
