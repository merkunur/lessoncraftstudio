const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'vehicles_bw_2',
  type: 'images',
  sourceFolderName: 'vehicles bw 2',
  displayNames: {
    en: 'Vehicles BW 2',
    de: 'Fahrzeuge SW 2',
    fr: 'Véhicules NB 2',
    es: 'Vehículos BN 2',
    it: 'Veicoli BN 2',
    pt: 'Veículos PB 2',
    nl: 'Voertuigen ZW 2',
    sv: 'Fordon SV 2',
    da: 'Køretøjer SH 2',
    no: 'Kjøretøy SH 2',
    fi: 'Ajoneuvot MV 2'
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
  'airplane 2': {
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
  'ambulance': {
    en: 'Ambulance',
    de: 'Krankenwagen',
    fr: 'Ambulance',
    es: 'Ambulancia',
    it: 'Ambulanza',
    pt: 'Ambulância',
    nl: 'Ambulance',
    sv: 'Ambulans',
    da: 'Ambulance',
    no: 'Ambulanse',
    fi: 'Ambulanssi'
  },
  'boat': {
    en: 'Boat',
    de: 'Boot',
    fr: 'Bateau',
    es: 'Bote',
    it: 'Barca',
    pt: 'Barco',
    nl: 'Boot',
    sv: 'Båt',
    da: 'Båd',
    no: 'Båt',
    fi: 'Vene'
  },
  'boat 2': {
    en: 'Boat',
    de: 'Boot',
    fr: 'Bateau',
    es: 'Bote',
    it: 'Barca',
    pt: 'Barco',
    nl: 'Boot',
    sv: 'Båt',
    da: 'Båd',
    no: 'Båt',
    fi: 'Vene'
  },
  'bus': {
    en: 'Bus',
    de: 'Bus',
    fr: 'Bus',
    es: 'Autobús',
    it: 'Autobus',
    pt: 'Ônibus',
    nl: 'Bus',
    sv: 'Buss',
    da: 'Bus',
    no: 'Buss',
    fi: 'Bussi'
  },
  'bus 2': {
    en: 'Bus',
    de: 'Bus',
    fr: 'Bus',
    es: 'Autobús',
    it: 'Autobus',
    pt: 'Ônibus',
    nl: 'Bus',
    sv: 'Buss',
    da: 'Bus',
    no: 'Buss',
    fi: 'Bussi'
  },
  'camper': {
    en: 'Camper',
    de: 'Wohnmobil',
    fr: 'Camping-car',
    es: 'Camper',
    it: 'Camper',
    pt: 'Trailer',
    nl: 'Camper',
    sv: 'Husbil',
    da: 'Autocamper',
    no: 'Bobil',
    fi: 'Matkailuauto'
  },
  'car': {
    en: 'Car',
    de: 'Auto',
    fr: 'Voiture',
    es: 'Carro',
    it: 'Macchina',
    pt: 'Carro',
    nl: 'Auto',
    sv: 'Bil',
    da: 'Bil',
    no: 'Bil',
    fi: 'Auto'
  },
  'crane': {
    en: 'Crane',
    de: 'Kran',
    fr: 'Grue',
    es: 'Grúa',
    it: 'Gru',
    pt: 'Guindaste',
    nl: 'Kraan',
    sv: 'Kran',
    da: 'Kran',
    no: 'Kran',
    fi: 'Nosturi'
  },
  'delivery truck': {
    en: 'Delivery Truck',
    de: 'Lieferwagen',
    fr: 'Camion de livraison',
    es: 'Camión de reparto',
    it: 'Furgone per consegne',
    pt: 'Caminhão de entrega',
    nl: 'Bestelwagen',
    sv: 'Leveransbil',
    da: 'Varebil',
    no: 'Leveringsbil',
    fi: 'Jakeluauto'
  },
  'dump truck': {
    en: 'Dump Truck',
    de: 'Kipplaster',
    fr: 'Camion-benne',
    es: 'Camión de volteo',
    it: 'Autocarro ribaltabile',
    pt: 'Caminhão basculante',
    nl: 'Kiepwagen',
    sv: 'Tippbil',
    da: 'Lastbil med tiplad',
    no: 'Dumper',
    fi: 'Kippiauto'
  },
  'excavator': {
    en: 'Excavator',
    de: 'Bagger',
    fr: 'Excavatrice',
    es: 'Excavadora',
    it: 'Escavatore',
    pt: 'Escavadeira',
    nl: 'Graafmachine',
    sv: 'Grävmaskin',
    da: 'Gravemaskine',
    no: 'Gravemaskin',
    fi: 'Kaivinkone'
  },
  'excavator 2': {
    en: 'Excavator',
    de: 'Bagger',
    fr: 'Excavatrice',
    es: 'Excavadora',
    it: 'Escavatore',
    pt: 'Escavadeira',
    nl: 'Graafmachine',
    sv: 'Grävmaskin',
    da: 'Gravemaskine',
    no: 'Gravemaskin',
    fi: 'Kaivinkone'
  },
  'garbage truck': {
    en: 'Garbage Truck',
    de: 'Müllwagen',
    fr: 'Camion-poubelle',
    es: 'Camión de basura',
    it: 'Camion della spazzatura',
    pt: 'Caminhão de lixo',
    nl: 'Vuilniswagen',
    sv: 'Sopbil',
    da: 'Skraldebil',
    no: 'Søppelbil',
    fi: 'Jäteauto'
  },
  'helicopter 2': {
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
  'hot air balloon': {
    en: 'Hot Air Balloon',
    de: 'Heißluftballon',
    fr: 'Montgolfière',
    es: 'Globo aerostático',
    it: 'Mongolfiera',
    pt: 'Balão de ar quente',
    nl: 'Luchtballon',
    sv: 'Luftballong',
    da: 'Luftballon',
    no: 'Luftballong',
    fi: 'Kuumailmapallo'
  },
  'mixer truck': {
    en: 'Cement Mixer',
    de: 'Betonmischer',
    fr: 'Bétonnière',
    es: 'Mezcladora de cemento',
    it: 'Betoniera',
    pt: 'Betoneira',
    nl: 'Betonmixer',
    sv: 'Cementblandare',
    da: 'Cementblander',
    no: 'Betongblander',
    fi: 'Betonimylly'
  },
  'monster truck': {
    en: 'Monster Truck',
    de: 'Monstertruck',
    fr: 'Monster truck',
    es: 'Camión monstruo',
    it: 'Monster truck',
    pt: 'Caminhonete gigante',
    nl: 'Monstertruck',
    sv: 'Monstertruck',
    da: 'Monstertruck',
    no: 'Monstertruck',
    fi: 'Monsteri-auto'
  },
  'pickup 2': {
    en: 'Pickup Truck',
    de: 'Pickup',
    fr: 'Pick-up',
    es: 'Camioneta',
    it: 'Pick-up',
    pt: 'Picape',
    nl: 'Pick-up',
    sv: 'Pickup',
    da: 'Pickup',
    no: 'Pickup',
    fi: 'Avolava-auto'
  },
  'police car': {
    en: 'Police Car',
    de: 'Polizeiauto',
    fr: 'Voiture de police',
    es: 'Patrulla',
    it: 'Auto della polizia',
    pt: 'Viatura policial',
    nl: 'Politieauto',
    sv: 'Polisbil',
    da: 'Politibil',
    no: 'Politibil',
    fi: 'Poliisiauto'
  },
  'race car': {
    en: 'Race Car',
    de: 'Rennwagen',
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
  'submarine': {
    en: 'Submarine',
    de: 'U-Boot',
    fr: 'Sous-marin',
    es: 'Submarino',
    it: 'Sottomarino',
    pt: 'Submarino',
    nl: 'Onderzeeër',
    sv: 'Ubåt',
    da: 'Ubåd',
    no: 'Ubåt',
    fi: 'Sukellusvene'
  },
  'tanker truck': {
    en: 'Tanker Truck',
    de: 'Tankwagen',
    fr: 'Camion-citerne',
    es: 'Camión cisterna',
    it: 'Autocisterna',
    pt: 'Caminhão-tanque',
    nl: 'Tankwagen',
    sv: 'Tankbil',
    da: 'Tankbil',
    no: 'Tankbil',
    fi: 'Säiliöauto'
  },
  'taxi': {
    en: 'Taxi',
    de: 'Taxi',
    fr: 'Taxi',
    es: 'Taxi',
    it: 'Taxi',
    pt: 'Táxi',
    nl: 'Taxi',
    sv: 'Taxi',
    da: 'Taxa',
    no: 'Taxi',
    fi: 'Taksi'
  },
  'tow truck': {
    en: 'Tow Truck',
    de: 'Abschleppwagen',
    fr: 'Dépanneuse',
    es: 'Grúa remolque',
    it: 'Carro attrezzi',
    pt: 'Guincho',
    nl: 'Sleepwagen',
    sv: 'Bärgningsbil',
    da: 'Kranvogn',
    no: 'Bergingsbil',
    fi: 'Hinausauto'
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
  'train 2': {
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
  'van': {
    en: 'Van',
    de: 'Lieferwagen',
    fr: 'Camionnette',
    es: 'Camioneta',
    it: 'Furgone',
    pt: 'Van',
    nl: 'Busje',
    sv: 'Skåpbil',
    da: 'Varevogn',
    no: 'Varebil',
    fi: 'Pakettiauto'
  },
  'van 2': {
    en: 'Van',
    de: 'Lieferwagen',
    fr: 'Camionnette',
    es: 'Camioneta',
    it: 'Furgone',
    pt: 'Van',
    nl: 'Busje',
    sv: 'Skåpbil',
    da: 'Varevogn',
    no: 'Varebil',
    fi: 'Pakettiauto'
  },
  'van 3': {
    en: 'Van',
    de: 'Lieferwagen',
    fr: 'Camionnette',
    es: 'Camioneta',
    it: 'Furgone',
    pt: 'Van',
    nl: 'Busje',
    sv: 'Skåpbil',
    da: 'Varevogn',
    no: 'Varebil',
    fi: 'Pakettiauto'
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
  console.log('Image Import Script: Vehicles BW 2');
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
    const lookupKey = baseName.toLowerCase().trim();

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
