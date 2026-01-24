const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'vegetables_bw_2',
  type: 'images',
  sourceFolderName: 'vegetables bw 2',
  displayNames: {
    en: 'Vegetables BW 2',
    de: 'Gemüse SW 2',
    fr: 'Légumes NB 2',
    es: 'Verduras BN 2',
    it: 'Verdure BN 2',
    pt: 'Vegetais PB 2',
    nl: 'Groenten ZW 2',
    sv: 'Grönsaker SV 2',
    da: 'Grøntsager SH 2',
    no: 'Grønnsaker SH 2',
    fi: 'Vihannekset MV 2'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'cauliflower': {
    en: 'Cauliflower',
    de: 'Blumenkohl',
    fr: 'Chou-fleur',
    es: 'Coliflor',
    it: 'Cavolfiore',
    pt: 'Couve-flor',
    nl: 'Bloemkool',
    sv: 'Blomkål',
    da: 'Blomkål',
    no: 'Blomkål',
    fi: 'Kukkakaali'
  },
  'corn': {
    en: 'Corn',
    de: 'Mais',
    fr: 'Maïs',
    es: 'Elote',
    it: 'Mais',
    pt: 'Milho',
    nl: 'Maïs',
    sv: 'Majs',
    da: 'Majs',
    no: 'Mais',
    fi: 'Maissi'
  },
  'eggplant': {
    en: 'Eggplant',
    de: 'Aubergine',
    fr: 'Aubergine',
    es: 'Berenjena',
    it: 'Melanzana',
    pt: 'Berinjela',
    nl: 'Aubergine',
    sv: 'Aubergine',
    da: 'Aubergine',
    no: 'Aubergine',
    fi: 'Munakoiso'
  },
  'lettuce 2': {
    en: 'Lettuce',
    de: 'Salat',
    fr: 'Laitue',
    es: 'Lechuga',
    it: 'Lattuga',
    pt: 'Alface',
    nl: 'Sla',
    sv: 'Sallad',
    da: 'Salat',
    no: 'Salat',
    fi: 'Salaatti'
  },
  'lettuce': {
    en: 'Lettuce',
    de: 'Salat',
    fr: 'Laitue',
    es: 'Lechuga',
    it: 'Lattuga',
    pt: 'Alface',
    nl: 'Sla',
    sv: 'Sallad',
    da: 'Salat',
    no: 'Salat',
    fi: 'Salaatti'
  },
  'mushroom': {
    en: 'Mushroom',
    de: 'Pilz',
    fr: 'Champignon',
    es: 'Champiñón',
    it: 'Fungo',
    pt: 'Cogumelo',
    nl: 'Paddenstoel',
    sv: 'Svamp',
    da: 'Svamp',
    no: 'Sopp',
    fi: 'Sieni'
  },
  'pea': {
    en: 'Pea',
    de: 'Erbse',
    fr: 'Petit pois',
    es: 'Chícharo',
    it: 'Pisello',
    pt: 'Ervilha',
    nl: 'Erwt',
    sv: 'Ärta',
    da: 'Ært',
    no: 'Ert',
    fi: 'Herne'
  },
  'pepper': {
    en: 'Pepper',
    de: 'Pfeffer',
    fr: 'Poivre',
    es: 'Pimienta',
    it: 'Pepe',
    pt: 'Pimenta',
    nl: 'Peper',
    sv: 'Peppar',
    da: 'Peber',
    no: 'Pepper',
    fi: 'Pippuri'
  },
  'radish': {
    en: 'Radish',
    de: 'Radieschen',
    fr: 'Radis',
    es: 'Rábano',
    it: 'Ravanello',
    pt: 'Rabanete',
    nl: 'Radijs',
    sv: 'Rädisa',
    da: 'Radise',
    no: 'Reddik',
    fi: 'Retiisi'
  },
  'spinach': {
    en: 'Spinach',
    de: 'Spinat',
    fr: 'Épinard',
    es: 'Espinaca',
    it: 'Spinacio',
    pt: 'Espinafre',
    nl: 'Spinazie',
    sv: 'Spenat',
    da: 'Spinat',
    no: 'Spinat',
    fi: 'Pinaatti'
  },
  'turnip': {
    en: 'Turnip',
    de: 'Rübe',
    fr: 'Navet',
    es: 'Nabo',
    it: 'Rapa',
    pt: 'Nabo',
    nl: 'Raap',
    sv: 'Rova',
    da: 'Roe',
    no: 'Kålrot',
    fi: 'Nauris'
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
  console.log('Image Import Script: Vegetables BW 2');
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
