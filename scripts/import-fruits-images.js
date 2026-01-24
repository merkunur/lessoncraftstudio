const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'fruits',
  type: 'images',
  sourceFolderName: 'fruits',
  displayNames: {
    en: 'Fruits',
    de: 'Früchte',
    fr: 'Fruits',
    es: 'Frutas',
    it: 'Frutta',
    pt: 'Frutas',
    nl: 'Fruit',
    sv: 'Frukter',
    da: 'Frugter',
    no: 'Frukter',
    fi: 'Hedelmät'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'apple': {
    en: 'Apple',
    de: 'Apfel',
    fr: 'Pomme',
    es: 'Manzana',
    it: 'Mela',
    pt: 'Maçã',
    nl: 'Appel',
    sv: 'Äpple',
    da: 'Æble',
    no: 'Eple',
    fi: 'Omena'
  },
  'apricot': {
    en: 'Apricot',
    de: 'Aprikose',
    fr: 'Abricot',
    es: 'Chabacano',
    it: 'Albicocca',
    pt: 'Damasco',
    nl: 'Abrikoos',
    sv: 'Aprikos',
    da: 'Abrikos',
    no: 'Aprikos',
    fi: 'Aprikoosi'
  },
  'avocado': {
    en: 'Avocado',
    de: 'Avocado',
    fr: 'Avocat',
    es: 'Aguacate',
    it: 'Avocado',
    pt: 'Abacate',
    nl: 'Avocado',
    sv: 'Avokado',
    da: 'Avocado',
    no: 'Avokado',
    fi: 'Avokado'
  },
  'banana': {
    en: 'Banana',
    de: 'Banane',
    fr: 'Banane',
    es: 'Plátano',
    it: 'Banana',
    pt: 'Banana',
    nl: 'Banaan',
    sv: 'Banan',
    da: 'Banan',
    no: 'Banan',
    fi: 'Banaani'
  },
  'blackberry': {
    en: 'Blackberry',
    de: 'Brombeere',
    fr: 'Mûre',
    es: 'Zarzamora',
    it: 'Mora',
    pt: 'Amora',
    nl: 'Braam',
    sv: 'Björnbär',
    da: 'Brombær',
    no: 'Bjørnebær',
    fi: 'Karhunvatukka'
  },
  'blueberry': {
    en: 'Blueberry',
    de: 'Blaubeere',
    fr: 'Myrtille',
    es: 'Arándano',
    it: 'Mirtillo',
    pt: 'Mirtilo',
    nl: 'Bosbes',
    sv: 'Blåbär',
    da: 'Blåbær',
    no: 'Blåbær',
    fi: 'Mustikka'
  },
  'cherry': {
    en: 'Cherry',
    de: 'Kirsche',
    fr: 'Cerise',
    es: 'Cereza',
    it: 'Ciliegia',
    pt: 'Cereja',
    nl: 'Kers',
    sv: 'Körsbär',
    da: 'Kirsebær',
    no: 'Kirsebær',
    fi: 'Kirsikka'
  },
  'clementine': {
    en: 'Clementine',
    de: 'Clementine',
    fr: 'Clémentine',
    es: 'Clementina',
    it: 'Clementina',
    pt: 'Clementina',
    nl: 'Clementine',
    sv: 'Clementin',
    da: 'Klementin',
    no: 'Klementin',
    fi: 'Klementiini'
  },
  'coconut': {
    en: 'Coconut',
    de: 'Kokosnuss',
    fr: 'Noix de coco',
    es: 'Coco',
    it: 'Cocco',
    pt: 'Coco',
    nl: 'Kokosnoot',
    sv: 'Kokosnöt',
    da: 'Kokosnød',
    no: 'Kokosnøtt',
    fi: 'Kookospähkinä'
  },
  'cranberry': {
    en: 'Cranberry',
    de: 'Cranberry',
    fr: 'Canneberge',
    es: 'Arándano rojo',
    it: 'Mirtillo rosso',
    pt: 'Oxicoco',
    nl: 'Cranberry',
    sv: 'Tranbär',
    da: 'Tranebær',
    no: 'Tranebær',
    fi: 'Karpalo'
  },
  'dragonfruit': {
    en: 'Dragon Fruit',
    de: 'Drachenfrucht',
    fr: 'Fruit du dragon',
    es: 'Pitaya',
    it: 'Frutto del drago',
    pt: 'Pitaia',
    nl: 'Drakenfruit',
    sv: 'Drakfrukt',
    da: 'Dragefrugt',
    no: 'Dragefrukt',
    fi: 'Lohikäärmehedelmä'
  },
  'fig': {
    en: 'Fig',
    de: 'Feige',
    fr: 'Figue',
    es: 'Higo',
    it: 'Fico',
    pt: 'Figo',
    nl: 'Vijg',
    sv: 'Fikon',
    da: 'Figen',
    no: 'Fiken',
    fi: 'Viikuna'
  },
  'grapefruit': {
    en: 'Grapefruit',
    de: 'Grapefruit',
    fr: 'Pamplemousse',
    es: 'Toronja',
    it: 'Pompelmo',
    pt: 'Toranja',
    nl: 'Grapefruit',
    sv: 'Grapefrukt',
    da: 'Grapefrugt',
    no: 'Grapefrukt',
    fi: 'Greippi'
  },
  'kiwi': {
    en: 'Kiwi',
    de: 'Kiwi',
    fr: 'Kiwi',
    es: 'Kiwi',
    it: 'Kiwi',
    pt: 'Kiwi',
    nl: 'Kiwi',
    sv: 'Kiwi',
    da: 'Kiwi',
    no: 'Kiwi',
    fi: 'Kiivi'
  },
  'lemon': {
    en: 'Lemon',
    de: 'Zitrone',
    fr: 'Citron',
    es: 'Limón',
    it: 'Limone',
    pt: 'Limão',
    nl: 'Citroen',
    sv: 'Citron',
    da: 'Citron',
    no: 'Sitron',
    fi: 'Sitruuna'
  },
  'lime': {
    en: 'Lime',
    de: 'Limette',
    fr: 'Citron vert',
    es: 'Lima',
    it: 'Lime',
    pt: 'Lima',
    nl: 'Limoen',
    sv: 'Lime',
    da: 'Lime',
    no: 'Lime',
    fi: 'Limetti'
  },
  'mango': {
    en: 'Mango',
    de: 'Mango',
    fr: 'Mangue',
    es: 'Mango',
    it: 'Mango',
    pt: 'Manga',
    nl: 'Mango',
    sv: 'Mango',
    da: 'Mango',
    no: 'Mango',
    fi: 'Mango'
  },
  'nectarine': {
    en: 'Nectarine',
    de: 'Nektarine',
    fr: 'Nectarine',
    es: 'Nectarina',
    it: 'Nettarina',
    pt: 'Nectarina',
    nl: 'Nectarine',
    sv: 'Nektarin',
    da: 'Nektarin',
    no: 'Nektarin',
    fi: 'Nektariini'
  },
  'orange': {
    en: 'Orange',
    de: 'Orange',
    fr: 'Orange',
    es: 'Naranja',
    it: 'Arancia',
    pt: 'Laranja',
    nl: 'Sinaasappel',
    sv: 'Apelsin',
    da: 'Appelsin',
    no: 'Appelsin',
    fi: 'Appelsiini'
  },
  'papaya': {
    en: 'Papaya',
    de: 'Papaya',
    fr: 'Papaye',
    es: 'Papaya',
    it: 'Papaya',
    pt: 'Mamão',
    nl: 'Papaja',
    sv: 'Papaya',
    da: 'Papaya',
    no: 'Papaya',
    fi: 'Papaija'
  },
  'peach': {
    en: 'Peach',
    de: 'Pfirsich',
    fr: 'Pêche',
    es: 'Durazno',
    it: 'Pesca',
    pt: 'Pêssego',
    nl: 'Perzik',
    sv: 'Persika',
    da: 'Fersken',
    no: 'Fersken',
    fi: 'Persikka'
  },
  'pear': {
    en: 'Pear',
    de: 'Birne',
    fr: 'Poire',
    es: 'Pera',
    it: 'Pera',
    pt: 'Pera',
    nl: 'Peer',
    sv: 'Päron',
    da: 'Pære',
    no: 'Pære',
    fi: 'Päärynä'
  },
  'persimmon': {
    en: 'Persimmon',
    de: 'Kaki',
    fr: 'Kaki',
    es: 'Caqui',
    it: 'Cachi',
    pt: 'Caqui',
    nl: 'Kaki',
    sv: 'Persimon',
    da: 'Kaki',
    no: 'Kaki',
    fi: 'Persimoni'
  },
  'pineapple': {
    en: 'Pineapple',
    de: 'Ananas',
    fr: 'Ananas',
    es: 'Piña',
    it: 'Ananas',
    pt: 'Abacaxi',
    nl: 'Ananas',
    sv: 'Ananas',
    da: 'Ananas',
    no: 'Ananas',
    fi: 'Ananas'
  },
  'plum': {
    en: 'Plum',
    de: 'Pflaume',
    fr: 'Prune',
    es: 'Ciruela',
    it: 'Prugna',
    pt: 'Ameixa',
    nl: 'Pruim',
    sv: 'Plommon',
    da: 'Blomme',
    no: 'Plomme',
    fi: 'Luumu'
  },
  'pomegranate': {
    en: 'Pomegranate',
    de: 'Granatapfel',
    fr: 'Grenade',
    es: 'Granada',
    it: 'Melograno',
    pt: 'Romã',
    nl: 'Granaatappel',
    sv: 'Granatäpple',
    da: 'Granatæble',
    no: 'Granateple',
    fi: 'Granaattiomena'
  },
  'raspberry': {
    en: 'Raspberry',
    de: 'Himbeere',
    fr: 'Framboise',
    es: 'Frambuesa',
    it: 'Lampone',
    pt: 'Framboesa',
    nl: 'Framboos',
    sv: 'Hallon',
    da: 'Hindbær',
    no: 'Bringebær',
    fi: 'Vadelma'
  },
  'strawberry': {
    en: 'Strawberry',
    de: 'Erdbeere',
    fr: 'Fraise',
    es: 'Fresa',
    it: 'Fragola',
    pt: 'Morango',
    nl: 'Aardbei',
    sv: 'Jordgubbe',
    da: 'Jordbær',
    no: 'Jordbær',
    fi: 'Mansikka'
  },
  'watermelon': {
    en: 'Watermelon',
    de: 'Wassermelone',
    fr: 'Pastèque',
    es: 'Sandía',
    it: 'Anguria',
    pt: 'Melancia',
    nl: 'Watermeloen',
    sv: 'Vattenmelon',
    da: 'Vandmelon',
    no: 'Vannmelon',
    fi: 'Vesimeloni'
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
  console.log('Image Import Script: Fruits');
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
