const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'things_that_fly',
  type: 'images',
  sourceFolderName: 'Things That Fly',
  displayNames: {
    en: 'Things That Fly',
    de: 'Dinge die fliegen',
    fr: 'Choses qui volent',
    es: 'Cosas que vuelan',
    it: 'Cose che volano',
    pt: 'Coisas que voam',
    nl: 'Dingen die vliegen',
    sv: 'Saker som flyger',
    da: 'Ting der flyver',
    no: 'Ting som flyr',
    fi: 'Lentävät asiat'
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
  'bat': {
    en: 'Bat',
    de: 'Fledermaus',
    fr: 'Chauve-souris',
    es: 'Murciélago',
    it: 'Pipistrello',
    pt: 'Morcego',
    nl: 'Vleermuis',
    sv: 'Fladdermus',
    da: 'Flagermus',
    no: 'Flaggermus',
    fi: 'Lepakko'
  },
  'bee': {
    en: 'Bee',
    de: 'Biene',
    fr: 'Abeille',
    es: 'Abeja',
    it: 'Ape',
    pt: 'Abelha',
    nl: 'Bij',
    sv: 'Bi',
    da: 'Bi',
    no: 'Bie',
    fi: 'Mehiläinen'
  },
  'beetle': {
    en: 'Beetle',
    de: 'Käfer',
    fr: 'Scarabée',
    es: 'Escarabajo',
    it: 'Scarabeo',
    pt: 'Besouro',
    nl: 'Kever',
    sv: 'Skalbagge',
    da: 'Bille',
    no: 'Bille',
    fi: 'Kovakuoriainen'
  },
  'bird': {
    en: 'Bird',
    de: 'Vogel',
    fr: 'Oiseau',
    es: 'Pájaro',
    it: 'Uccello',
    pt: 'Pássaro',
    nl: 'Vogel',
    sv: 'Fågel',
    da: 'Fugl',
    no: 'Fugl',
    fi: 'Lintu'
  },
  'blue jay': {
    en: 'Blue Jay',
    de: 'Blauhäher',
    fr: 'Geai bleu',
    es: 'Arrendajo azul',
    it: 'Ghiandaia azzurra',
    pt: 'Gaio-azul',
    nl: 'Blauwe gaai',
    sv: 'Blåskrika',
    da: 'Blåskade',
    no: 'Blåskrike',
    fi: 'Sinikotka'
  },
  'butterfly': {
    en: 'Butterfly',
    de: 'Schmetterling',
    fr: 'Papillon',
    es: 'Mariposa',
    it: 'Farfalla',
    pt: 'Borboleta',
    nl: 'Vlinder',
    sv: 'Fjäril',
    da: 'Sommerfugl',
    no: 'Sommerfugl',
    fi: 'Perhonen'
  },
  'dragon': {
    en: 'Dragon',
    de: 'Drache',
    fr: 'Dragon',
    es: 'Dragón',
    it: 'Drago',
    pt: 'Dragão',
    nl: 'Draak',
    sv: 'Drake',
    da: 'Drage',
    no: 'Drage',
    fi: 'Lohikäärme'
  },
  'dragonfly': {
    en: 'Dragonfly',
    de: 'Libelle',
    fr: 'Libellule',
    es: 'Libélula',
    it: 'Libellula',
    pt: 'Libélula',
    nl: 'Libel',
    sv: 'Trollslända',
    da: 'Guldsmed',
    no: 'Øyenstikker',
    fi: 'Sudenkorento'
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
  'eagle': {
    en: 'Eagle',
    de: 'Adler',
    fr: 'Aigle',
    es: 'Águila',
    it: 'Aquila',
    pt: 'Águia',
    nl: 'Adelaar',
    sv: 'Örn',
    da: 'Ørn',
    no: 'Ørn',
    fi: 'Kotka'
  },
  'firefly': {
    en: 'Firefly',
    de: 'Glühwürmchen',
    fr: 'Luciole',
    es: 'Luciérnaga',
    it: 'Lucciola',
    pt: 'Vaga-lume',
    nl: 'Vuurvliegje',
    sv: 'Eldfluga',
    da: 'Ildflue',
    no: 'Ildflue',
    fi: 'Tulikärpänen'
  },
  'flamingo': {
    en: 'Flamingo',
    de: 'Flamingo',
    fr: 'Flamant rose',
    es: 'Flamingo',
    it: 'Fenicottero',
    pt: 'Flamingo',
    nl: 'Flamingo',
    sv: 'Flamingo',
    da: 'Flamingo',
    no: 'Flamingo',
    fi: 'Flamingo'
  },
  'frisbee': {
    en: 'Frisbee',
    de: 'Frisbee',
    fr: 'Frisbee',
    es: 'Frisbee',
    it: 'Frisbee',
    pt: 'Frisbee',
    nl: 'Frisbee',
    sv: 'Frisbee',
    da: 'Frisbee',
    no: 'Frisbee',
    fi: 'Frisbee'
  },
  'goose': {
    en: 'Goose',
    de: 'Gans',
    fr: 'Oie',
    es: 'Ganso',
    it: 'Oca',
    pt: 'Ganso',
    nl: 'Gans',
    sv: 'Gås',
    da: 'Gås',
    no: 'Gås',
    fi: 'Hanhi'
  },
  'grasshopper': {
    en: 'Grasshopper',
    de: 'Heuschrecke',
    fr: 'Sauterelle',
    es: 'Saltamontes',
    it: 'Cavalletta',
    pt: 'Gafanhoto',
    nl: 'Sprinkhaan',
    sv: 'Gräshoppa',
    da: 'Græshoppe',
    no: 'Gresshoppe',
    fi: 'Heinäsirkka'
  },
  'hawk': {
    en: 'Hawk',
    de: 'Habicht',
    fr: 'Faucon',
    es: 'Halcón',
    it: 'Falco',
    pt: 'Falcão',
    nl: 'Havik',
    sv: 'Hök',
    da: 'Høg',
    no: 'Hauk',
    fi: 'Haukka'
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
  'hummingbird': {
    en: 'Hummingbird',
    de: 'Kolibri',
    fr: 'Colibri',
    es: 'Colibrí',
    it: 'Colibrì',
    pt: 'Beija-flor',
    nl: 'Kolibrie',
    sv: 'Kolibri',
    da: 'Kolibri',
    no: 'Kolibri',
    fi: 'Kolibri'
  },
  'jet': {
    en: 'Jet',
    de: 'Düsenflugzeug',
    fr: 'Jet',
    es: 'Jet',
    it: 'Jet',
    pt: 'Jato',
    nl: 'Straaljager',
    sv: 'Jetplan',
    da: 'Jetfly',
    no: 'Jetfly',
    fi: 'Suihkukone'
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
  'ladybug': {
    en: 'Ladybug',
    de: 'Marienkäfer',
    fr: 'Coccinelle',
    es: 'Catarina',
    it: 'Coccinella',
    pt: 'Joaninha',
    nl: 'Lieveheersbeestje',
    sv: 'Nyckelpiga',
    da: 'Mariehøne',
    no: 'Marihøne',
    fi: 'Leppäkerttu'
  },
  'mosquito': {
    en: 'Mosquito',
    de: 'Mücke',
    fr: 'Moustique',
    es: 'Mosquito',
    it: 'Zanzara',
    pt: 'Mosquito',
    nl: 'Mug',
    sv: 'Mygga',
    da: 'Myg',
    no: 'Mygg',
    fi: 'Hyttynen'
  },
  'owl': {
    en: 'Owl',
    de: 'Eule',
    fr: 'Hibou',
    es: 'Búho',
    it: 'Gufo',
    pt: 'Coruja',
    nl: 'Uil',
    sv: 'Uggla',
    da: 'Ugle',
    no: 'Ugle',
    fi: 'Pöllö'
  },
  'paper airplane': {
    en: 'Paper Airplane',
    de: 'Papierflieger',
    fr: 'Avion en papier',
    es: 'Avión de papel',
    it: 'Aeroplano di carta',
    pt: 'Avião de papel',
    nl: 'Papieren vliegtuig',
    sv: 'Pappersflygplan',
    da: 'Papirfly',
    no: 'Papirfly',
    fi: 'Paperilennokki'
  },
  'parrot': {
    en: 'Parrot',
    de: 'Papagei',
    fr: 'Perroquet',
    es: 'Loro',
    it: 'Pappagallo',
    pt: 'Papagaio',
    nl: 'Papegaai',
    sv: 'Papegoja',
    da: 'Papegøje',
    no: 'Papegøye',
    fi: 'Papukaija'
  },
  'pegasus': {
    en: 'Pegasus',
    de: 'Pegasus',
    fr: 'Pégase',
    es: 'Pegaso',
    it: 'Pegaso',
    pt: 'Pégaso',
    nl: 'Pegasus',
    sv: 'Pegasus',
    da: 'Pegasus',
    no: 'Pegasus',
    fi: 'Pegasos'
  },
  'pelican': {
    en: 'Pelican',
    de: 'Pelikan',
    fr: 'Pélican',
    es: 'Pelícano',
    it: 'Pellicano',
    pt: 'Pelicano',
    nl: 'Pelikaan',
    sv: 'Pelikan',
    da: 'Pelikan',
    no: 'Pelikan',
    fi: 'Pelikaani'
  },
  'pigeon': {
    en: 'Pigeon',
    de: 'Taube',
    fr: 'Pigeon',
    es: 'Paloma',
    it: 'Piccione',
    pt: 'Pombo',
    nl: 'Duif',
    sv: 'Duva',
    da: 'Due',
    no: 'Due',
    fi: 'Kyyhky'
  },
  'robin': {
    en: 'Robin',
    de: 'Rotkehlchen',
    fr: 'Rouge-gorge',
    es: 'Petirrojo',
    it: 'Pettirosso',
    pt: 'Pintarroxo',
    nl: 'Roodborstje',
    sv: 'Rödhake',
    da: 'Rødhals',
    no: 'Rødstrupe',
    fi: 'Punarinta'
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
  'seagull': {
    en: 'Seagull',
    de: 'Möwe',
    fr: 'Mouette',
    es: 'Gaviota',
    it: 'Gabbiano',
    pt: 'Gaivota',
    nl: 'Zeemeeuw',
    sv: 'Fiskmås',
    da: 'Måge',
    no: 'Måke',
    fi: 'Lokki'
  },
  'swan': {
    en: 'Swan',
    de: 'Schwan',
    fr: 'Cygne',
    es: 'Cisne',
    it: 'Cigno',
    pt: 'Cisne',
    nl: 'Zwaan',
    sv: 'Svan',
    da: 'Svane',
    no: 'Svane',
    fi: 'Joutsen'
  },
  'toucan': {
    en: 'Toucan',
    de: 'Tukan',
    fr: 'Toucan',
    es: 'Tucán',
    it: 'Tucano',
    pt: 'Tucano',
    nl: 'Toekan',
    sv: 'Tukan',
    da: 'Tukan',
    no: 'Tukan',
    fi: 'Tukaani'
  },
  'wasp': {
    en: 'Wasp',
    de: 'Wespe',
    fr: 'Guêpe',
    es: 'Avispa',
    it: 'Vespa',
    pt: 'Vespa',
    nl: 'Wesp',
    sv: 'Geting',
    da: 'Hveps',
    no: 'Veps',
    fi: 'Ampiainen'
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
  console.log('Image Import Script: Things That Fly');
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
