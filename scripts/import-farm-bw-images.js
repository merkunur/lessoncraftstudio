const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'farm_bw',
  type: 'images',
  sourceFolderName: 'farm bw',
  displayNames: {
    en: 'Farm BW',
    de: 'Bauernhof SW',
    fr: 'Ferme NB',
    es: 'Granja BN',
    it: 'Fattoria BN',
    pt: 'Fazenda PB',
    nl: 'Boerderij ZW',
    sv: 'Bondgård SV',
    da: 'Bondegård SH',
    no: 'Gård SH',
    fi: 'Maatila MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'barn': {
    en: 'Barn',
    de: 'Scheune',
    fr: 'Grange',
    es: 'Granero',
    it: 'Fienile',
    pt: 'Celeiro',
    nl: 'Schuur',
    sv: 'Lada',
    da: 'Lade',
    no: 'Låve',
    fi: 'Lato'
  },
  'cat': {
    en: 'Cat',
    de: 'Katze',
    fr: 'Chat',
    es: 'Gato',
    it: 'Gatto',
    pt: 'Gato',
    nl: 'Kat',
    sv: 'Katt',
    da: 'Kat',
    no: 'Katt',
    fi: 'Kissa'
  },
  'cow': {
    en: 'Cow',
    de: 'Kuh',
    fr: 'Vache',
    es: 'Vaca',
    it: 'Mucca',
    pt: 'Vaca',
    nl: 'Koe',
    sv: 'Ko',
    da: 'Ko',
    no: 'Ku',
    fi: 'Lehmä'
  },
  'dog': {
    en: 'Dog',
    de: 'Hund',
    fr: 'Chien',
    es: 'Perro',
    it: 'Cane',
    pt: 'Cachorro',
    nl: 'Hond',
    sv: 'Hund',
    da: 'Hund',
    no: 'Hund',
    fi: 'Koira'
  },
  'donkey': {
    en: 'Donkey',
    de: 'Esel',
    fr: 'Âne',
    es: 'Burro',
    it: 'Asino',
    pt: 'Burro',
    nl: 'Ezel',
    sv: 'Åsna',
    da: 'Æsel',
    no: 'Esel',
    fi: 'Aasi'
  },
  'donkey 2': {
    en: 'Donkey 2',
    de: 'Esel 2',
    fr: 'Âne 2',
    es: 'Burro 2',
    it: 'Asino 2',
    pt: 'Burro 2',
    nl: 'Ezel 2',
    sv: 'Åsna 2',
    da: 'Æsel 2',
    no: 'Esel 2',
    fi: 'Aasi 2'
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
  'duck 2': {
    en: 'Duck 2',
    de: 'Ente 2',
    fr: 'Canard 2',
    es: 'Pato 2',
    it: 'Anatra 2',
    pt: 'Pato 2',
    nl: 'Eend 2',
    sv: 'Anka 2',
    da: 'And 2',
    no: 'And 2',
    fi: 'Ankka 2'
  },
  'farmer': {
    en: 'Farmer',
    de: 'Bauer',
    fr: 'Fermier',
    es: 'Granjero',
    it: 'Agricoltore',
    pt: 'Fazendeiro',
    nl: 'Boer',
    sv: 'Bonde',
    da: 'Landmand',
    no: 'Bonde',
    fi: 'Maanviljelijä'
  },
  'fence': {
    en: 'Fence',
    de: 'Zaun',
    fr: 'Clôture',
    es: 'Cerca',
    it: 'Recinzione',
    pt: 'Cerca',
    nl: 'Hek',
    sv: 'Staket',
    da: 'Hegn',
    no: 'Gjerde',
    fi: 'Aita'
  },
  'goat': {
    en: 'Goat',
    de: 'Ziege',
    fr: 'Chèvre',
    es: 'Cabra',
    it: 'Capra',
    pt: 'Cabra',
    nl: 'Geit',
    sv: 'Get',
    da: 'Ged',
    no: 'Geit',
    fi: 'Vuohi'
  },
  'hay': {
    en: 'Hay',
    de: 'Heu',
    fr: 'Foin',
    es: 'Heno',
    it: 'Fieno',
    pt: 'Feno',
    nl: 'Hooi',
    sv: 'Hö',
    da: 'Hø',
    no: 'Høy',
    fi: 'Heinä'
  },
  'horse': {
    en: 'Horse',
    de: 'Pferd',
    fr: 'Cheval',
    es: 'Caballo',
    it: 'Cavallo',
    pt: 'Cavalo',
    nl: 'Paard',
    sv: 'Häst',
    da: 'Hest',
    no: 'Hest',
    fi: 'Hevonen'
  },
  'nest': {
    en: 'Nest',
    de: 'Nest',
    fr: 'Nid',
    es: 'Nido',
    it: 'Nido',
    pt: 'Ninho',
    nl: 'Nest',
    sv: 'Bo',
    da: 'Rede',
    no: 'Reir',
    fi: 'Pesä'
  },
  'pig': {
    en: 'Pig',
    de: 'Schwein',
    fr: 'Cochon',
    es: 'Cerdo',
    it: 'Maiale',
    pt: 'Porco',
    nl: 'Varken',
    sv: 'Gris',
    da: 'Gris',
    no: 'Gris',
    fi: 'Sika'
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
  'rooster': {
    en: 'Rooster',
    de: 'Hahn',
    fr: 'Coq',
    es: 'Gallo',
    it: 'Gallo',
    pt: 'Galo',
    nl: 'Haan',
    sv: 'Tupp',
    da: 'Hane',
    no: 'Hane',
    fi: 'Kukko'
  },
  'scarecrow': {
    en: 'Scarecrow',
    de: 'Vogelscheuche',
    fr: 'Épouvantail',
    es: 'Espantapájaros',
    it: 'Spaventapasseri',
    pt: 'Espantalho',
    nl: 'Vogelverschrikker',
    sv: 'Fågelskrämma',
    da: 'Fugleskræmsel',
    no: 'Fugleskremsel',
    fi: 'Linnunpelätin'
  },
  'sheep': {
    en: 'Sheep',
    de: 'Schaf',
    fr: 'Mouton',
    es: 'Oveja',
    it: 'Pecora',
    pt: 'Ovelha',
    nl: 'Schaap',
    sv: 'Får',
    da: 'Får',
    no: 'Sau',
    fi: 'Lammas'
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
  'vegetables': {
    en: 'Vegetables',
    de: 'Gemüse',
    fr: 'Légumes',
    es: 'Verduras',
    it: 'Verdure',
    pt: 'Legumes',
    nl: 'Groenten',
    sv: 'Grönsaker',
    da: 'Grøntsager',
    no: 'Grønnsaker',
    fi: 'Vihannekset'
  },
  'watering can': {
    en: 'Watering Can',
    de: 'Gießkanne',
    fr: 'Arrosoir',
    es: 'Regadera',
    it: 'Annaffiatoio',
    pt: 'Regador',
    nl: 'Gieter',
    sv: 'Vattenkanna',
    da: 'Vandkande',
    no: 'Vannkanne',
    fi: 'Kastelukannu'
  },
  'wheelbarrow': {
    en: 'Wheelbarrow',
    de: 'Schubkarre',
    fr: 'Brouette',
    es: 'Carretilla',
    it: 'Carriola',
    pt: 'Carrinho de mão',
    nl: 'Kruiwagen',
    sv: 'Skottkärra',
    da: 'Trillebør',
    no: 'Trillebår',
    fi: 'Kottikärryt'
  },
  'windmill': {
    en: 'Windmill',
    de: 'Windmühle',
    fr: 'Moulin à vent',
    es: 'Molino de viento',
    it: 'Mulino a vento',
    pt: 'Moinho de vento',
    nl: 'Windmolen',
    sv: 'Väderkvarn',
    da: 'Vindmølle',
    no: 'Vindmølle',
    fi: 'Tuulimylly'
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
  console.log('Image Import Script: Farm BW');
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
