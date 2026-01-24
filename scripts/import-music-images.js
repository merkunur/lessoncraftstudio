const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'music',
  type: 'images',
  sourceFolderName: 'music',
  displayNames: {
    en: 'Music',
    de: 'Musik',
    fr: 'Musique',
    es: 'Música',
    it: 'Musica',
    pt: 'Música',
    nl: 'Muziek',
    sv: 'Musik',
    da: 'Musik',
    no: 'Musikk',
    fi: 'Musiikki'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'accordion': {
    en: 'Accordion',
    de: 'Akkordeon',
    fr: 'Accordéon',
    es: 'Acordeón',
    it: 'Fisarmonica',
    pt: 'Acordeão',
    nl: 'Accordeon',
    sv: 'Dragspel',
    da: 'Harmonika',
    no: 'Trekkspill',
    fi: 'Haitari'
  },
  'cymbals': {
    en: 'Cymbals',
    de: 'Becken',
    fr: 'Cymbales',
    es: 'Platillos',
    it: 'Piatti',
    pt: 'Pratos',
    nl: 'Bekkens',
    sv: 'Cymbaler',
    da: 'Bækkener',
    no: 'Cymbal',
    fi: 'Symbaalit'
  },
  'drum': {
    en: 'Drum',
    de: 'Trommel',
    fr: 'Tambour',
    es: 'Tambor',
    it: 'Tamburo',
    pt: 'Tambor',
    nl: 'Trommel',
    sv: 'Trumma',
    da: 'Tromme',
    no: 'Tromme',
    fi: 'Rumpu'
  },
  'flute': {
    en: 'Flute',
    de: 'Flöte',
    fr: 'Flûte',
    es: 'Flauta',
    it: 'Flauto',
    pt: 'Flauta',
    nl: 'Fluit',
    sv: 'Flöjt',
    da: 'Fløjte',
    no: 'Fløyte',
    fi: 'Huilu'
  },
  'guitar': {
    en: 'Guitar',
    de: 'Gitarre',
    fr: 'Guitare',
    es: 'Guitarra',
    it: 'Chitarra',
    pt: 'Violão',
    nl: 'Gitaar',
    sv: 'Gitarr',
    da: 'Guitar',
    no: 'Gitar',
    fi: 'Kitara'
  },
  'harp': {
    en: 'Harp',
    de: 'Harfe',
    fr: 'Harpe',
    es: 'Arpa',
    it: 'Arpa',
    pt: 'Harpa',
    nl: 'Harp',
    sv: 'Harpa',
    da: 'Harpe',
    no: 'Harpe',
    fi: 'Harppu'
  },
  'keyboard': {
    en: 'Keyboard',
    de: 'Keyboard',
    fr: 'Clavier',
    es: 'Teclado',
    it: 'Tastiera',
    pt: 'Teclado',
    nl: 'Keyboard',
    sv: 'Keyboard',
    da: 'Keyboard',
    no: 'Keyboard',
    fi: 'Koskettimet'
  },
  'note': {
    en: 'Musical Note',
    de: 'Musiknote',
    fr: 'Note de musique',
    es: 'Nota musical',
    it: 'Nota musicale',
    pt: 'Nota musical',
    nl: 'Muzieknoot',
    sv: 'Musiknot',
    da: 'Musiknode',
    no: 'Musikknote',
    fi: 'Nuotti'
  },
  'piano': {
    en: 'Piano',
    de: 'Klavier',
    fr: 'Piano',
    es: 'Piano',
    it: 'Pianoforte',
    pt: 'Piano',
    nl: 'Piano',
    sv: 'Piano',
    da: 'Klaver',
    no: 'Piano',
    fi: 'Piano'
  },
  'saxophone': {
    en: 'Saxophone',
    de: 'Saxophon',
    fr: 'Saxophone',
    es: 'Saxofón',
    it: 'Sassofono',
    pt: 'Saxofone',
    nl: 'Saxofoon',
    sv: 'Saxofon',
    da: 'Saxofon',
    no: 'Saksofon',
    fi: 'Saksofoni'
  },
  'singer': {
    en: 'Singer',
    de: 'Sänger',
    fr: 'Chanteur',
    es: 'Cantante',
    it: 'Cantante',
    pt: 'Cantor',
    nl: 'Zanger',
    sv: 'Sångare',
    da: 'Sanger',
    no: 'Sanger',
    fi: 'Laulaja'
  },
  'stage': {
    en: 'Stage',
    de: 'Bühne',
    fr: 'Scène',
    es: 'Escenario',
    it: 'Palcoscenico',
    pt: 'Palco',
    nl: 'Podium',
    sv: 'Scen',
    da: 'Scene',
    no: 'Scene',
    fi: 'Lava'
  },
  'trombone': {
    en: 'Trombone',
    de: 'Posaune',
    fr: 'Trombone',
    es: 'Trombón',
    it: 'Trombone',
    pt: 'Trombone',
    nl: 'Trombone',
    sv: 'Trombon',
    da: 'Basun',
    no: 'Trombone',
    fi: 'Pasuuna'
  },
  'trumpet': {
    en: 'Trumpet',
    de: 'Trompete',
    fr: 'Trompette',
    es: 'Trompeta',
    it: 'Tromba',
    pt: 'Trompete',
    nl: 'Trompet',
    sv: 'Trumpet',
    da: 'Trompet',
    no: 'Trompet',
    fi: 'Trumpetti'
  },
  'violin': {
    en: 'Violin',
    de: 'Violine',
    fr: 'Violon',
    es: 'Violín',
    it: 'Violino',
    pt: 'Violino',
    nl: 'Viool',
    sv: 'Fiol',
    da: 'Violin',
    no: 'Fiolin',
    fi: 'Viulu'
  },
  'xylophone': {
    en: 'Xylophone',
    de: 'Xylophon',
    fr: 'Xylophone',
    es: 'Xilófono',
    it: 'Xilofono',
    pt: 'Xilofone',
    nl: 'Xylofoon',
    sv: 'Xylofon',
    da: 'Xylofon',
    no: 'Xylofon',
    fi: 'Ksylofoni'
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
  console.log('Image Import Script: Music');
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
