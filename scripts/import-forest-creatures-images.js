const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'forest_creatures',
  type: 'images',
  sourceFolderName: 'forest creatures',
  displayNames: {
    en: 'Forest Creatures',
    de: 'Waldtiere',
    fr: 'Créatures de la forêt',
    es: 'Criaturas del bosque',
    it: 'Creature della foresta',
    pt: 'Criaturas da floresta',
    nl: 'Boswezens',
    sv: 'Skogsdjur',
    da: 'Skovdyr',
    no: 'Skogsdyr',
    fi: 'Metsän eläimet'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'ant': {
    en: 'Ant',
    de: 'Ameise',
    fr: 'Fourmi',
    es: 'Hormiga',
    it: 'Formica',
    pt: 'Formiga',
    nl: 'Mier',
    sv: 'Myra',
    da: 'Myre',
    no: 'Maur',
    fi: 'Muurahainen'
  },
  'badger': {
    en: 'Badger',
    de: 'Dachs',
    fr: 'Blaireau',
    es: 'Tejón',
    it: 'Tasso',
    pt: 'Texugo',
    nl: 'Das',
    sv: 'Grävling',
    da: 'Grævling',
    no: 'Grevling',
    fi: 'Mäyrä'
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
  'bear': {
    en: 'Bear',
    de: 'Bär',
    fr: 'Ours',
    es: 'Oso',
    it: 'Orso',
    pt: 'Urso',
    nl: 'Beer',
    sv: 'Björn',
    da: 'Bjørn',
    no: 'Bjørn',
    fi: 'Karhu'
  },
  'beaver': {
    en: 'Beaver',
    de: 'Biber',
    fr: 'Castor',
    es: 'Castor',
    it: 'Castoro',
    pt: 'Castor',
    nl: 'Bever',
    sv: 'Bäver',
    da: 'Bæver',
    no: 'Bever',
    fi: 'Majava'
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
    fi: 'Sinitöyhtönärhi'
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
  'cardinal': {
    en: 'Cardinal',
    de: 'Kardinal',
    fr: 'Cardinal',
    es: 'Cardenal',
    it: 'Cardinale',
    pt: 'Cardeal',
    nl: 'Kardinaal',
    sv: 'Kardinal',
    da: 'Kardinal',
    no: 'Kardinal',
    fi: 'Punakardinaali'
  },
  'caterpillar': {
    en: 'Caterpillar',
    de: 'Raupe',
    fr: 'Chenille',
    es: 'Oruga',
    it: 'Bruco',
    pt: 'Lagarta',
    nl: 'Rups',
    sv: 'Larv',
    da: 'Larve',
    no: 'Larve',
    fi: 'Toukka'
  },
  'chipmunk': {
    en: 'Chipmunk',
    de: 'Streifenhörnchen',
    fr: 'Tamia',
    es: 'Ardilla listada',
    it: 'Tamia',
    pt: 'Esquilo-listrado',
    nl: 'Wangzakeekhoorn',
    sv: 'Jordekorre',
    da: 'Jordegern',
    no: 'Jordekorn',
    fi: 'Maaorava'
  },
  'deer': {
    en: 'Deer',
    de: 'Hirsch',
    fr: 'Cerf',
    es: 'Venado',
    it: 'Cervo',
    pt: 'Veado',
    nl: 'Hert',
    sv: 'Hjort',
    da: 'Hjort',
    no: 'Hjort',
    fi: 'Peura'
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
  'earthworm': {
    en: 'Earthworm',
    de: 'Regenwurm',
    fr: 'Ver de terre',
    es: 'Lombriz',
    it: 'Lombrico',
    pt: 'Minhoca',
    nl: 'Regenworm',
    sv: 'Daggmask',
    da: 'Regnorm',
    no: 'Meitemark',
    fi: 'Kastemato'
  },
  'finch': {
    en: 'Finch',
    de: 'Fink',
    fr: 'Pinson',
    es: 'Pinzón',
    it: 'Fringuello',
    pt: 'Tentilhão',
    nl: 'Vink',
    sv: 'Fink',
    da: 'Finke',
    no: 'Finke',
    fi: 'Peippo'
  },
  'firefly': {
    en: 'Firefly',
    de: 'Glühwürmchen',
    fr: 'Luciole',
    es: 'Luciérnaga',
    it: 'Lucciola',
    pt: 'Vagalume',
    nl: 'Vuurvliegje',
    sv: 'Eldfluga',
    da: 'Ildflue',
    no: 'Ildflue',
    fi: 'Tulikärpänen'
  },
  'fox': {
    en: 'Fox',
    de: 'Fuchs',
    fr: 'Renard',
    es: 'Zorro',
    it: 'Volpe',
    pt: 'Raposa',
    nl: 'Vos',
    sv: 'Räv',
    da: 'Ræv',
    no: 'Rev',
    fi: 'Kettu'
  },
  'frog': {
    en: 'Frog',
    de: 'Frosch',
    fr: 'Grenouille',
    es: 'Rana',
    it: 'Rana',
    pt: 'Sapo',
    nl: 'Kikker',
    sv: 'Groda',
    da: 'Frø',
    no: 'Frosk',
    fi: 'Sammakko'
  },
  'gopher': {
    en: 'Gopher',
    de: 'Erdhörnchen',
    fr: 'Gaufre',
    es: 'Tuza',
    it: 'Gopher',
    pt: 'Esquilo-terrestre',
    nl: 'Grondeekhoorn',
    sv: 'Gopher',
    da: 'Jordegern',
    no: 'Jordekorn',
    fi: 'Pussirottasuku'
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
    pt: 'Gavião',
    nl: 'Havik',
    sv: 'Hök',
    da: 'Høg',
    no: 'Hauk',
    fi: 'Haukka'
  },
  'hedgehog': {
    en: 'Hedgehog',
    de: 'Igel',
    fr: 'Hérisson',
    es: 'Erizo',
    it: 'Riccio',
    pt: 'Ouriço',
    nl: 'Egel',
    sv: 'Igelkott',
    da: 'Pindsvin',
    no: 'Pinnsvin',
    fi: 'Siili'
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
  'lizard': {
    en: 'Lizard',
    de: 'Eidechse',
    fr: 'Lézard',
    es: 'Lagartija',
    it: 'Lucertola',
    pt: 'Lagarto',
    nl: 'Hagedis',
    sv: 'Ödla',
    da: 'Firben',
    no: 'Øgle',
    fi: 'Lisko'
  },
  'moose': {
    en: 'Moose',
    de: 'Elch',
    fr: 'Élan',
    es: 'Alce',
    it: 'Alce',
    pt: 'Alce',
    nl: 'Eland',
    sv: 'Älg',
    da: 'Elg',
    no: 'Elg',
    fi: 'Hirvi'
  },
  'mouse': {
    en: 'Mouse',
    de: 'Maus',
    fr: 'Souris',
    es: 'Ratón',
    it: 'Topo',
    pt: 'Rato',
    nl: 'Muis',
    sv: 'Mus',
    da: 'Mus',
    no: 'Mus',
    fi: 'Hiiri'
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
  'porcupine': {
    en: 'Porcupine',
    de: 'Stachelschwein',
    fr: 'Porc-épic',
    es: 'Puercoespín',
    it: 'Porcospino',
    pt: 'Porco-espinho',
    nl: 'Stekelvarken',
    sv: 'Piggsvin',
    da: 'Hulepindsvin',
    no: 'Piggsvin',
    fi: 'Piikkisika'
  },
  'rabbit': {
    en: 'Rabbit',
    de: 'Kaninchen',
    fr: 'Lapin',
    es: 'Conejo',
    it: 'Coniglio',
    pt: 'Coelho',
    nl: 'Konijn',
    sv: 'Kanin',
    da: 'Kanin',
    no: 'Kanin',
    fi: 'Kani'
  },
  'raccoon': {
    en: 'Raccoon',
    de: 'Waschbär',
    fr: 'Raton laveur',
    es: 'Mapache',
    it: 'Procione',
    pt: 'Guaxinim',
    nl: 'Wasbeer',
    sv: 'Tvättbjörn',
    da: 'Vaskebjørn',
    no: 'Vaskebjørn',
    fi: 'Pesukarhu'
  },
  'slug': {
    en: 'Slug',
    de: 'Nacktschnecke',
    fr: 'Limace',
    es: 'Babosa',
    it: 'Lumaca',
    pt: 'Lesma',
    nl: 'Naaktslak',
    sv: 'Snigel',
    da: 'Snegl',
    no: 'Snegle',
    fi: 'Etana'
  },
  'snail': {
    en: 'Snail',
    de: 'Schnecke',
    fr: 'Escargot',
    es: 'Caracol',
    it: 'Chiocciola',
    pt: 'Caracol',
    nl: 'Slak',
    sv: 'Snigel',
    da: 'Snegl',
    no: 'Snegle',
    fi: 'Kotilo'
  },
  'spider': {
    en: 'Spider',
    de: 'Spinne',
    fr: 'Araignée',
    es: 'Araña',
    it: 'Ragno',
    pt: 'Aranha',
    nl: 'Spin',
    sv: 'Spindel',
    da: 'Edderkop',
    no: 'Edderkopp',
    fi: 'Hämähäkki'
  },
  'squirrel': {
    en: 'Squirrel',
    de: 'Eichhörnchen',
    fr: 'Écureuil',
    es: 'Ardilla',
    it: 'Scoiattolo',
    pt: 'Esquilo',
    nl: 'Eekhoorn',
    sv: 'Ekorre',
    da: 'Egern',
    no: 'Ekorn',
    fi: 'Orava'
  },
  'toad': {
    en: 'Toad',
    de: 'Kröte',
    fr: 'Crapaud',
    es: 'Sapo',
    it: 'Rospo',
    pt: 'Sapo',
    nl: 'Pad',
    sv: 'Padda',
    da: 'Tudse',
    no: 'Padde',
    fi: 'Rupikonna'
  },
  'turkey': {
    en: 'Turkey',
    de: 'Truthahn',
    fr: 'Dinde',
    es: 'Pavo',
    it: 'Tacchino',
    pt: 'Peru',
    nl: 'Kalkoen',
    sv: 'Kalkon',
    da: 'Kalkun',
    no: 'Kalkun',
    fi: 'Kalkkuna'
  },
  'turtle': {
    en: 'Turtle',
    de: 'Schildkröte',
    fr: 'Tortue',
    es: 'Tortuga',
    it: 'Tartaruga',
    pt: 'Tartaruga',
    nl: 'Schildpad',
    sv: 'Sköldpadda',
    da: 'Skildpadde',
    no: 'Skilpadde',
    fi: 'Kilpikonna'
  },
  'weasel': {
    en: 'Weasel',
    de: 'Wiesel',
    fr: 'Belette',
    es: 'Comadreja',
    it: 'Donnola',
    pt: 'Doninha',
    nl: 'Wezel',
    sv: 'Vessla',
    da: 'Væsel',
    no: 'Røyskatt',
    fi: 'Lumikko'
  },
  'wolf': {
    en: 'Wolf',
    de: 'Wolf',
    fr: 'Loup',
    es: 'Lobo',
    it: 'Lupo',
    pt: 'Lobo',
    nl: 'Wolf',
    sv: 'Varg',
    da: 'Ulv',
    no: 'Ulv',
    fi: 'Susi'
  },
  'woodpecker': {
    en: 'Woodpecker',
    de: 'Specht',
    fr: 'Pic',
    es: 'Pájaro carpintero',
    it: 'Picchio',
    pt: 'Pica-pau',
    nl: 'Specht',
    sv: 'Hackspett',
    da: 'Spætte',
    no: 'Hakkespett',
    fi: 'Tikka'
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
  console.log('Image Import Script: Forest Creatures');
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
