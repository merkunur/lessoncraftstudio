const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'toys',
  type: 'images',
  sourceFolderName: 'toys',
  displayNames: {
    en: 'Toys',
    de: 'Spielzeug',
    fr: 'Jouets',
    es: 'Juguetes',
    it: 'Giocattoli',
    pt: 'Brinquedos',
    nl: 'Speelgoed',
    sv: 'Leksaker',
    da: 'Legetøj',
    no: 'Leker',
    fi: 'Lelut'
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
  'baby girl': {
    en: 'Baby Girl',
    de: 'Baby Mädchen',
    fr: 'Bébé fille',
    es: 'Bebé niña',
    it: 'Bambina',
    pt: 'Bebê menina',
    nl: 'Baby meisje',
    sv: 'Flickbebis',
    da: 'Babypige',
    no: 'Babyjente',
    fi: 'Tyttövauva'
  },
  'baby': {
    en: 'Baby',
    de: 'Baby',
    fr: 'Bébé',
    es: 'Bebé',
    it: 'Bambino',
    pt: 'Bebê',
    nl: 'Baby',
    sv: 'Baby',
    da: 'Baby',
    no: 'Baby',
    fi: 'Vauva'
  },
  'ball': {
    en: 'Ball',
    de: 'Ball',
    fr: 'Ballon',
    es: 'Pelota',
    it: 'Palla',
    pt: 'Bola',
    nl: 'Bal',
    sv: 'Boll',
    da: 'Bold',
    no: 'Ball',
    fi: 'Pallo'
  },
  'balloon': {
    en: 'Balloon',
    de: 'Luftballon',
    fr: 'Ballon',
    es: 'Globo',
    it: 'Palloncino',
    pt: 'Balão',
    nl: 'Ballon',
    sv: 'Ballong',
    da: 'Ballon',
    no: 'Ballong',
    fi: 'Ilmapallo'
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
  'blocks': {
    en: 'Blocks',
    de: 'Bauklötze',
    fr: 'Blocs',
    es: 'Bloques',
    it: 'Blocchi',
    pt: 'Blocos',
    nl: 'Blokken',
    sv: 'Klossar',
    da: 'Klodser',
    no: 'Klosser',
    fi: 'Palikat'
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
  'cards': {
    en: 'Cards',
    de: 'Karten',
    fr: 'Cartes',
    es: 'Cartas',
    it: 'Carte',
    pt: 'Cartas',
    nl: 'Kaarten',
    sv: 'Kort',
    da: 'Kort',
    no: 'Kort',
    fi: 'Kortit'
  },
  'chess': {
    en: 'Chess',
    de: 'Schach',
    fr: 'Échecs',
    es: 'Ajedrez',
    it: 'Scacchi',
    pt: 'Xadrez',
    nl: 'Schaak',
    sv: 'Schack',
    da: 'Skak',
    no: 'Sjakk',
    fi: 'Shakki'
  },
  'crayons': {
    en: 'Crayons',
    de: 'Buntstifte',
    fr: 'Crayons de couleur',
    es: 'Crayones',
    it: 'Pastelli',
    pt: 'Giz de cera',
    nl: 'Kleurpotloden',
    sv: 'Kritor',
    da: 'Farvekridt',
    no: 'Fargestifter',
    fi: 'Värikynät'
  },
  'dice': {
    en: 'Dice',
    de: 'Würfel',
    fr: 'Dés',
    es: 'Dados',
    it: 'Dadi',
    pt: 'Dados',
    nl: 'Dobbelstenen',
    sv: 'Tärningar',
    da: 'Terninger',
    no: 'Terninger',
    fi: 'Nopat'
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
  'doll': {
    en: 'Doll',
    de: 'Puppe',
    fr: 'Poupée',
    es: 'Muñeca',
    it: 'Bambola',
    pt: 'Boneca',
    nl: 'Pop',
    sv: 'Docka',
    da: 'Dukke',
    no: 'Dukke',
    fi: 'Nukke'
  },
  'domino': {
    en: 'Domino',
    de: 'Domino',
    fr: 'Domino',
    es: 'Dominó',
    it: 'Domino',
    pt: 'Dominó',
    nl: 'Domino',
    sv: 'Domino',
    da: 'Domino',
    no: 'Domino',
    fi: 'Domino'
  },
  'girl': {
    en: 'Girl',
    de: 'Mädchen',
    fr: 'Fille',
    es: 'Niña',
    it: 'Ragazza',
    pt: 'Menina',
    nl: 'Meisje',
    sv: 'Flicka',
    da: 'Pige',
    no: 'Jente',
    fi: 'Tyttö'
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
  'kite': {
    en: 'Kite',
    de: 'Drachen',
    fr: 'Cerf-volant',
    es: 'Papalote',
    it: 'Aquilone',
    pt: 'Pipa',
    nl: 'Vlieger',
    sv: 'Drake',
    da: 'Drage',
    no: 'Drage',
    fi: 'Leija'
  },
  'lego': {
    en: 'Lego',
    de: 'Lego',
    fr: 'Lego',
    es: 'Lego',
    it: 'Lego',
    pt: 'Lego',
    nl: 'Lego',
    sv: 'Lego',
    da: 'Lego',
    no: 'Lego',
    fi: 'Lego'
  },
  'race car': {
    en: 'Race Car',
    de: 'Rennauto',
    fr: 'Voiture de course',
    es: 'Carro de carreras',
    it: 'Auto da corsa',
    pt: 'Carro de corrida',
    nl: 'Raceauto',
    sv: 'Racerbil',
    da: 'Racerbil',
    no: 'Racerbil',
    fi: 'Kilpa-auto'
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
  'sandbox': {
    en: 'Sandbox',
    de: 'Sandkasten',
    fr: 'Bac à sable',
    es: 'Arenero',
    it: 'Sabbiera',
    pt: 'Caixa de areia',
    nl: 'Zandbak',
    sv: 'Sandlåda',
    da: 'Sandkasse',
    no: 'Sandkasse',
    fi: 'Hiekkalaatikko'
  },
  'scooter': {
    en: 'Scooter',
    de: 'Roller',
    fr: 'Trottinette',
    es: 'Patín del diablo',
    it: 'Monopattino',
    pt: 'Patinete',
    nl: 'Step',
    sv: 'Sparkcykel',
    da: 'Løbehjul',
    no: 'Sparkesykkel',
    fi: 'Potkulauta'
  },
  'shovel': {
    en: 'Shovel',
    de: 'Schaufel',
    fr: 'Pelle',
    es: 'Pala',
    it: 'Paletta',
    pt: 'Pazinha',
    nl: 'Schepje',
    sv: 'Spade',
    da: 'Skovl',
    no: 'Spade',
    fi: 'Lapio'
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
  'slide': {
    en: 'Slide',
    de: 'Rutsche',
    fr: 'Toboggan',
    es: 'Resbaladilla',
    it: 'Scivolo',
    pt: 'Escorregador',
    nl: 'Glijbaan',
    sv: 'Rutschkana',
    da: 'Rutsjebane',
    no: 'Sklie',
    fi: 'Liukumäki'
  },
  'swing': {
    en: 'Swing',
    de: 'Schaukel',
    fr: 'Balançoire',
    es: 'Columpio',
    it: 'Altalena',
    pt: 'Balanço',
    nl: 'Schommel',
    sv: 'Gunga',
    da: 'Gynge',
    no: 'Huske',
    fi: 'Keinu'
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
  'truck': {
    en: 'Truck',
    de: 'Lastwagen',
    fr: 'Camion',
    es: 'Camión',
    it: 'Camion',
    pt: 'Caminhão',
    nl: 'Vrachtwagen',
    sv: 'Lastbil',
    da: 'Lastbil',
    no: 'Lastebil',
    fi: 'Kuorma-auto'
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
  console.log('Image Import Script: Toys');
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
