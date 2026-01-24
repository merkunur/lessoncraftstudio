const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'food_bw_2',
  type: 'images',
  sourceFolderName: 'food bw 2',
  displayNames: {
    en: 'Food BW 2',
    de: 'Essen SW 2',
    fr: 'Nourriture NB 2',
    es: 'Comida BN 2',
    it: 'Cibo BN 2',
    pt: 'Comida PB 2',
    nl: 'Voedsel ZW 2',
    sv: 'Mat SV 2',
    da: 'Mad SH 2',
    no: 'Mat SH 2',
    fi: 'Ruoka MV 2'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'bread': {
    en: 'Bread',
    de: 'Brot',
    fr: 'Pain',
    es: 'Pan',
    it: 'Pane',
    pt: 'Pão',
    nl: 'Brood',
    sv: 'Bröd',
    da: 'Brød',
    no: 'Brød',
    fi: 'Leipä'
  },
  'cake': {
    en: 'Cake',
    de: 'Kuchen',
    fr: 'Gâteau',
    es: 'Pastel',
    it: 'Torta',
    pt: 'Bolo',
    nl: 'Taart',
    sv: 'Tårta',
    da: 'Kage',
    no: 'Kake',
    fi: 'Kakku'
  },
  'cake 2': {
    en: 'Cake 2',
    de: 'Kuchen 2',
    fr: 'Gâteau 2',
    es: 'Pastel 2',
    it: 'Torta 2',
    pt: 'Bolo 2',
    nl: 'Taart 2',
    sv: 'Tårta 2',
    da: 'Kage 2',
    no: 'Kake 2',
    fi: 'Kakku 2'
  },
  'cake 3': {
    en: 'Cake 3',
    de: 'Kuchen 3',
    fr: 'Gâteau 3',
    es: 'Pastel 3',
    it: 'Torta 3',
    pt: 'Bolo 3',
    nl: 'Taart 3',
    sv: 'Tårta 3',
    da: 'Kage 3',
    no: 'Kake 3',
    fi: 'Kakku 3'
  },
  'cheese': {
    en: 'Cheese',
    de: 'Käse',
    fr: 'Fromage',
    es: 'Queso',
    it: 'Formaggio',
    pt: 'Queijo',
    nl: 'Kaas',
    sv: 'Ost',
    da: 'Ost',
    no: 'Ost',
    fi: 'Juusto'
  },
  'chips': {
    en: 'Chips',
    de: 'Chips',
    fr: 'Chips',
    es: 'Papitas',
    it: 'Patatine',
    pt: 'Batatas chips',
    nl: 'Chips',
    sv: 'Chips',
    da: 'Chips',
    no: 'Chips',
    fi: 'Sipsit'
  },
  'croissant': {
    en: 'Croissant',
    de: 'Croissant',
    fr: 'Croissant',
    es: 'Croissant',
    it: 'Cornetto',
    pt: 'Croissant',
    nl: 'Croissant',
    sv: 'Croissant',
    da: 'Croissant',
    no: 'Croissant',
    fi: 'Croissant'
  },
  'donut': {
    en: 'Donut',
    de: 'Donut',
    fr: 'Beignet',
    es: 'Dona',
    it: 'Ciambella',
    pt: 'Rosquinha',
    nl: 'Donut',
    sv: 'Munk',
    da: 'Donut',
    no: 'Smultring',
    fi: 'Donitsi'
  },
  'drumstick': {
    en: 'Drumstick',
    de: 'Hähnchenschenkel',
    fr: 'Pilon de poulet',
    es: 'Muslo de pollo',
    it: 'Coscia di pollo',
    pt: 'Coxa de frango',
    nl: 'Kippenpoot',
    sv: 'Kycklingklubba',
    da: 'Kyllingelår',
    no: 'Kyllinglår',
    fi: 'Kanankoipi'
  },
  'egg': {
    en: 'Egg',
    de: 'Ei',
    fr: 'Œuf',
    es: 'Huevo',
    it: 'Uovo',
    pt: 'Ovo',
    nl: 'Ei',
    sv: 'Ägg',
    da: 'Æg',
    no: 'Egg',
    fi: 'Muna'
  },
  'french fries': {
    en: 'French Fries',
    de: 'Pommes frites',
    fr: 'Frites',
    es: 'Papas fritas',
    it: 'Patatine fritte',
    pt: 'Batatas fritas',
    nl: 'Frietjes',
    sv: 'Pommes frites',
    da: 'Pomfritter',
    no: 'Pommes frites',
    fi: 'Ranskalaiset'
  },
  'hamburger': {
    en: 'Hamburger',
    de: 'Hamburger',
    fr: 'Hamburger',
    es: 'Hamburguesa',
    it: 'Hamburger',
    pt: 'Hambúrguer',
    nl: 'Hamburger',
    sv: 'Hamburgare',
    da: 'Hamburger',
    no: 'Hamburger',
    fi: 'Hampurilainen'
  },
  'hamburger 2': {
    en: 'Hamburger 2',
    de: 'Hamburger 2',
    fr: 'Hamburger 2',
    es: 'Hamburguesa 2',
    it: 'Hamburger 2',
    pt: 'Hambúrguer 2',
    nl: 'Hamburger 2',
    sv: 'Hamburgare 2',
    da: 'Hamburger 2',
    no: 'Hamburger 2',
    fi: 'Hampurilainen 2'
  },
  'hot dog': {
    en: 'Hot Dog',
    de: 'Hotdog',
    fr: 'Hot-dog',
    es: 'Hot dog',
    it: 'Hot dog',
    pt: 'Cachorro-quente',
    nl: 'Hotdog',
    sv: 'Korv med bröd',
    da: 'Hotdog',
    no: 'Pølse',
    fi: 'Hodari'
  },
  'ice cream': {
    en: 'Ice Cream',
    de: 'Eiscreme',
    fr: 'Glace',
    es: 'Helado',
    it: 'Gelato',
    pt: 'Sorvete',
    nl: 'IJsje',
    sv: 'Glass',
    da: 'Is',
    no: 'Iskrem',
    fi: 'Jäätelö'
  },
  'lollipop': {
    en: 'Lollipop',
    de: 'Lutscher',
    fr: 'Sucette',
    es: 'Paleta',
    it: 'Lecca-lecca',
    pt: 'Pirulito',
    nl: 'Lolly',
    sv: 'Klubba',
    da: 'Slikkepind',
    no: 'Kjærlighet på pinne',
    fi: 'Tikkari'
  },
  'muffin': {
    en: 'Muffin',
    de: 'Muffin',
    fr: 'Muffin',
    es: 'Muffin',
    it: 'Muffin',
    pt: 'Muffin',
    nl: 'Muffin',
    sv: 'Muffin',
    da: 'Muffin',
    no: 'Muffin',
    fi: 'Muffini'
  },
  'pizza': {
    en: 'Pizza',
    de: 'Pizza',
    fr: 'Pizza',
    es: 'Pizza',
    it: 'Pizza',
    pt: 'Pizza',
    nl: 'Pizza',
    sv: 'Pizza',
    da: 'Pizza',
    no: 'Pizza',
    fi: 'Pizza'
  },
  'popcorn': {
    en: 'Popcorn',
    de: 'Popcorn',
    fr: 'Pop-corn',
    es: 'Palomitas',
    it: 'Popcorn',
    pt: 'Pipoca',
    nl: 'Popcorn',
    sv: 'Popcorn',
    da: 'Popcorn',
    no: 'Popcorn',
    fi: 'Popcorn'
  },
  'pretzel': {
    en: 'Pretzel',
    de: 'Brezel',
    fr: 'Bretzel',
    es: 'Pretzel',
    it: 'Pretzel',
    pt: 'Pretzel',
    nl: 'Pretzel',
    sv: 'Kringla',
    da: 'Kringle',
    no: 'Kringle',
    fi: 'Rinkeli'
  },
  'sallad': {
    en: 'Salad',
    de: 'Salat',
    fr: 'Salade',
    es: 'Ensalada',
    it: 'Insalata',
    pt: 'Salada',
    nl: 'Salade',
    sv: 'Sallad',
    da: 'Salat',
    no: 'Salat',
    fi: 'Salaatti'
  },
  'sandwich': {
    en: 'Sandwich',
    de: 'Sandwich',
    fr: 'Sandwich',
    es: 'Sándwich',
    it: 'Panino',
    pt: 'Sanduíche',
    nl: 'Boterham',
    sv: 'Smörgås',
    da: 'Sandwich',
    no: 'Sandwich',
    fi: 'Voileipä'
  },
  'sausage': {
    en: 'Sausage',
    de: 'Wurst',
    fr: 'Saucisse',
    es: 'Salchicha',
    it: 'Salsiccia',
    pt: 'Salsicha',
    nl: 'Worst',
    sv: 'Korv',
    da: 'Pølse',
    no: 'Pølse',
    fi: 'Makkara'
  },
  'soup': {
    en: 'Soup',
    de: 'Suppe',
    fr: 'Soupe',
    es: 'Sopa',
    it: 'Zuppa',
    pt: 'Sopa',
    nl: 'Soep',
    sv: 'Soppa',
    da: 'Suppe',
    no: 'Suppe',
    fi: 'Keitto'
  },
  'taco': {
    en: 'Taco',
    de: 'Taco',
    fr: 'Taco',
    es: 'Taco',
    it: 'Taco',
    pt: 'Taco',
    nl: 'Taco',
    sv: 'Taco',
    da: 'Taco',
    no: 'Taco',
    fi: 'Taco'
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
  console.log('Image Import Script: Food BW 2');
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
