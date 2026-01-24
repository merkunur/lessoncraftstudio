const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'food_bw',
  type: 'images',
  sourceFolderName: 'food bw',
  displayNames: {
    en: 'Food BW',
    de: 'Essen SW',
    fr: 'Nourriture NB',
    es: 'Comida BN',
    it: 'Cibo BN',
    pt: 'Comida PB',
    nl: 'Voedsel ZW',
    sv: 'Mat SV',
    da: 'Mad SH',
    no: 'Mat SH',
    fi: 'Ruoka MV'
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
  'burrito': {
    en: 'Burrito',
    de: 'Burrito',
    fr: 'Burrito',
    es: 'Burrito',
    it: 'Burrito',
    pt: 'Burrito',
    nl: 'Burrito',
    sv: 'Burrito',
    da: 'Burrito',
    no: 'Burrito',
    fi: 'Burrito'
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
  'cheeseburger': {
    en: 'Cheeseburger',
    de: 'Cheeseburger',
    fr: 'Cheeseburger',
    es: 'Hamburguesa con queso',
    it: 'Cheeseburger',
    pt: 'Cheesebúrguer',
    nl: 'Cheeseburger',
    sv: 'Cheeseburgare',
    da: 'Cheeseburger',
    no: 'Cheeseburger',
    fi: 'Juustohampurilainen'
  },
  'chocolate': {
    en: 'Chocolate',
    de: 'Schokolade',
    fr: 'Chocolat',
    es: 'Chocolate',
    it: 'Cioccolato',
    pt: 'Chocolate',
    nl: 'Chocolade',
    sv: 'Choklad',
    da: 'Chokolade',
    no: 'Sjokolade',
    fi: 'Suklaa'
  },
  'cookie': {
    en: 'Cookie',
    de: 'Keks',
    fr: 'Cookie',
    es: 'Galleta',
    it: 'Biscotto',
    pt: 'Biscoito',
    nl: 'Koekje',
    sv: 'Kaka',
    da: 'Småkage',
    no: 'Kjeks',
    fi: 'Keksi'
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
  'cupcake': {
    en: 'Cupcake',
    de: 'Cupcake',
    fr: 'Cupcake',
    es: 'Cupcake',
    it: 'Cupcake',
    pt: 'Cupcake',
    nl: 'Cupcake',
    sv: 'Cupcake',
    da: 'Cupcake',
    no: 'Cupcake',
    fi: 'Kuppikakku'
  },
  'cupcake 2': {
    en: 'Cupcake 2',
    de: 'Cupcake 2',
    fr: 'Cupcake 2',
    es: 'Cupcake 2',
    it: 'Cupcake 2',
    pt: 'Cupcake 2',
    nl: 'Cupcake 2',
    sv: 'Cupcake 2',
    da: 'Cupcake 2',
    no: 'Cupcake 2',
    fi: 'Kuppikakku 2'
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
  'donut 2': {
    en: 'Donut 2',
    de: 'Donut 2',
    fr: 'Beignet 2',
    es: 'Dona 2',
    it: 'Ciambella 2',
    pt: 'Rosquinha 2',
    nl: 'Donut 2',
    sv: 'Munk 2',
    da: 'Donut 2',
    no: 'Smultring 2',
    fi: 'Donitsi 2'
  },
  'fish': {
    en: 'Fish',
    de: 'Fisch',
    fr: 'Poisson',
    es: 'Pescado',
    it: 'Pesce',
    pt: 'Peixe',
    nl: 'Vis',
    sv: 'Fisk',
    da: 'Fisk',
    no: 'Fisk',
    fi: 'Kala'
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
  'fried chicken': {
    en: 'Fried Chicken',
    de: 'Brathähnchen',
    fr: 'Poulet frit',
    es: 'Pollo frito',
    it: 'Pollo fritto',
    pt: 'Frango frito',
    nl: 'Gefrituurde kip',
    sv: 'Stekt kyckling',
    da: 'Stegt kylling',
    no: 'Stekt kylling',
    fi: 'Paistettu kana'
  },
  'fried egg': {
    en: 'Fried Egg',
    de: 'Spiegelei',
    fr: 'Œuf au plat',
    es: 'Huevo frito',
    it: 'Uovo fritto',
    pt: 'Ovo frito',
    nl: 'Gebakken ei',
    sv: 'Stekt ägg',
    da: 'Spejlæg',
    no: 'Speilegg',
    fi: 'Paistettu muna'
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
  'ice cream 2': {
    en: 'Ice Cream 2',
    de: 'Eiscreme 2',
    fr: 'Glace 2',
    es: 'Helado 2',
    it: 'Gelato 2',
    pt: 'Sorvete 2',
    nl: 'IJsje 2',
    sv: 'Glass 2',
    da: 'Is 2',
    no: 'Iskrem 2',
    fi: 'Jäätelö 2'
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
  'pizza 2': {
    en: 'Pizza 2',
    de: 'Pizza 2',
    fr: 'Pizza 2',
    es: 'Pizza 2',
    it: 'Pizza 2',
    pt: 'Pizza 2',
    nl: 'Pizza 2',
    sv: 'Pizza 2',
    da: 'Pizza 2',
    no: 'Pizza 2',
    fi: 'Pizza 2'
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
  console.log('Image Import Script: Food BW');
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
