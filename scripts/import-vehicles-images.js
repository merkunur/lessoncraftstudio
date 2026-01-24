const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'vehicles',
  type: 'images',
  sourceFolderName: 'vehicles',
  displayNames: {
    en: 'Vehicles',
    de: 'Fahrzeuge',
    fr: 'Véhicules',
    es: 'Vehículos',
    it: 'Veicoli',
    pt: 'Veículos',
    nl: 'Voertuigen',
    sv: 'Fordon',
    da: 'Køretøjer',
    no: 'Kjøretøy',
    fi: 'Ajoneuvot'
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
  'bulldozer': {
    en: 'Bulldozer',
    de: 'Bulldozer',
    fr: 'Bulldozer',
    es: 'Bulldozer',
    it: 'Bulldozer',
    pt: 'Escavadeira',
    nl: 'Bulldozer',
    sv: 'Bulldozer',
    da: 'Bulldozer',
    no: 'Bulldoser',
    fi: 'Puskutraktori'
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
  'canoe': {
    en: 'Canoe',
    de: 'Kanu',
    fr: 'Canoë',
    es: 'Canoa',
    it: 'Canoa',
    pt: 'Canoa',
    nl: 'Kano',
    sv: 'Kanot',
    da: 'Kano',
    no: 'Kano',
    fi: 'Kanootti'
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
  'cement mixer': {
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
  'ferry': {
    en: 'Ferry',
    de: 'Fähre',
    fr: 'Ferry',
    es: 'Transbordador',
    it: 'Traghetto',
    pt: 'Balsa',
    nl: 'Veerboot',
    sv: 'Färja',
    da: 'Færge',
    no: 'Ferge',
    fi: 'Lautta'
  },
  'fire truck': {
    en: 'Fire Truck',
    de: 'Feuerwehrauto',
    fr: 'Camion de pompiers',
    es: 'Camión de bomberos',
    it: 'Autopompa',
    pt: 'Caminhão de bombeiros',
    nl: 'Brandweerwagen',
    sv: 'Brandbil',
    da: 'Brandbil',
    no: 'Brannbil',
    fi: 'Paloauto'
  },
  'forklift': {
    en: 'Forklift',
    de: 'Gabelstapler',
    fr: 'Chariot élévateur',
    es: 'Montacargas',
    it: 'Carrello elevatore',
    pt: 'Empilhadeira',
    nl: 'Vorkheftruck',
    sv: 'Gaffeltruck',
    da: 'Gaffeltruck',
    no: 'Gaffeltruck',
    fi: 'Trukki'
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
  'jeep': {
    en: 'Jeep',
    de: 'Jeep',
    fr: 'Jeep',
    es: 'Jeep',
    it: 'Jeep',
    pt: 'Jipe',
    nl: 'Jeep',
    sv: 'Jeep',
    da: 'Jeep',
    no: 'Jeep',
    fi: 'Maasturi'
  },
  'jet': {
    en: 'Jet',
    de: 'Düsenflugzeug',
    fr: 'Avion à réaction',
    es: 'Avión a reacción',
    it: 'Jet',
    pt: 'Jato',
    nl: 'Straalvliegtuig',
    sv: 'Jetplan',
    da: 'Jetfly',
    no: 'Jetfly',
    fi: 'Suihkukone'
  },
  'mail truck': {
    en: 'Mail Truck',
    de: 'Postauto',
    fr: 'Camion postal',
    es: 'Camión de correos',
    it: 'Furgone postale',
    pt: 'Caminhão dos correios',
    nl: 'Postauto',
    sv: 'Postbil',
    da: 'Postbil',
    no: 'Postbil',
    fi: 'Postiauto'
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
  'motorcycle': {
    en: 'Motorcycle',
    de: 'Motorrad',
    fr: 'Moto',
    es: 'Motocicleta',
    it: 'Motocicletta',
    pt: 'Motocicleta',
    nl: 'Motorfiets',
    sv: 'Motorcykel',
    da: 'Motorcykel',
    no: 'Motorsykkel',
    fi: 'Moottoripyörä'
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
  'sailboat': {
    en: 'Sailboat',
    de: 'Segelboot',
    fr: 'Voilier',
    es: 'Velero',
    it: 'Barca a vela',
    pt: 'Veleiro',
    nl: 'Zeilboot',
    sv: 'Segelbåt',
    da: 'Sejlbåd',
    no: 'Seilbåt',
    fi: 'Purjevene'
  },
  'school bus': {
    en: 'School Bus',
    de: 'Schulbus',
    fr: 'Bus scolaire',
    es: 'Autobús escolar',
    it: 'Scuolabus',
    pt: 'Ônibus escolar',
    nl: 'Schoolbus',
    sv: 'Skolbuss',
    da: 'Skolebus',
    no: 'Skolebuss',
    fi: 'Koulubussi'
  },
  'scooter': {
    en: 'Scooter',
    de: 'Roller',
    fr: 'Scooter',
    es: 'Scooter',
    it: 'Scooter',
    pt: 'Scooter',
    nl: 'Scooter',
    sv: 'Skoter',
    da: 'Scooter',
    no: 'Scooter',
    fi: 'Skootteri'
  },
  'ship': {
    en: 'Ship',
    de: 'Schiff',
    fr: 'Navire',
    es: 'Barco',
    it: 'Nave',
    pt: 'Navio',
    nl: 'Schip',
    sv: 'Skepp',
    da: 'Skib',
    no: 'Skip',
    fi: 'Laiva'
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
  'subway': {
    en: 'Subway',
    de: 'U-Bahn',
    fr: 'Métro',
    es: 'Metro',
    it: 'Metropolitana',
    pt: 'Metrô',
    nl: 'Metro',
    sv: 'Tunnelbana',
    da: 'Metro',
    no: 'T-bane',
    fi: 'Metro'
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
  'yacht': {
    en: 'Yacht',
    de: 'Yacht',
    fr: 'Yacht',
    es: 'Yate',
    it: 'Yacht',
    pt: 'Iate',
    nl: 'Jacht',
    sv: 'Yacht',
    da: 'Yacht',
    no: 'Yacht',
    fi: 'Jahti'
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
  console.log('Image Import Script: Vehicles');
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
