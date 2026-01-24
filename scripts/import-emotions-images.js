const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'emotions',
  type: 'images',
  sourceFolderName: 'emotions',
  displayNames: {
    en: 'Emotions',
    de: 'Emotionen',
    fr: 'Émotions',
    es: 'Emociones',
    it: 'Emozioni',
    pt: 'Emoções',
    nl: 'Emoties',
    sv: 'Känslor',
    da: 'Følelser',
    no: 'Følelser',
    fi: 'Tunteet'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'angry': {
    en: 'Angry',
    de: 'Wütend',
    fr: 'En colère',
    es: 'Enojado',
    it: 'Arrabbiato',
    pt: 'Bravo',
    nl: 'Boos',
    sv: 'Arg',
    da: 'Vred',
    no: 'Sint',
    fi: 'Vihainen'
  },
  'bored': {
    en: 'Bored',
    de: 'Gelangweilt',
    fr: 'Ennuyé',
    es: 'Aburrido',
    it: 'Annoiato',
    pt: 'Entediado',
    nl: 'Verveeld',
    sv: 'Uttråkad',
    da: 'Kedet',
    no: 'Kjeda',
    fi: 'Tylsistynyt'
  },
  'capricious': {
    en: 'Capricious',
    de: 'Launisch',
    fr: 'Capricieux',
    es: 'Caprichoso',
    it: 'Capriccioso',
    pt: 'Caprichoso',
    nl: 'Grillig',
    sv: 'Nyckfull',
    da: 'Lunefuld',
    no: 'Lunefull',
    fi: 'Oikukas'
  },
  'confused': {
    en: 'Confused',
    de: 'Verwirrt',
    fr: 'Confus',
    es: 'Confundido',
    it: 'Confuso',
    pt: 'Confuso',
    nl: 'Verward',
    sv: 'Förvirrad',
    da: 'Forvirret',
    no: 'Forvirret',
    fi: 'Hämmentynyt'
  },
  'content': {
    en: 'Content',
    de: 'Zufrieden',
    fr: 'Content',
    es: 'Contento',
    it: 'Contento',
    pt: 'Contente',
    nl: 'Tevreden',
    sv: 'Nöjd',
    da: 'Tilfreds',
    no: 'Fornøyd',
    fi: 'Tyytyväinen'
  },
  'disgusted': {
    en: 'Disgusted',
    de: 'Angeekelt',
    fr: 'Dégoûté',
    es: 'Asqueado',
    it: 'Disgustato',
    pt: 'Enojado',
    nl: 'Walgend',
    sv: 'Äcklad',
    da: 'Væmmet',
    no: 'Kvalm',
    fi: 'Ällöttynyt'
  },
  'excited': {
    en: 'Excited',
    de: 'Aufgeregt',
    fr: 'Excité',
    es: 'Emocionado',
    it: 'Eccitato',
    pt: 'Empolgado',
    nl: 'Opgewonden',
    sv: 'Upprymd',
    da: 'Begejstret',
    no: 'Begeistret',
    fi: 'Innostunut'
  },
  'happy': {
    en: 'Happy',
    de: 'Glücklich',
    fr: 'Heureux',
    es: 'Feliz',
    it: 'Felice',
    pt: 'Feliz',
    nl: 'Blij',
    sv: 'Glad',
    da: 'Glad',
    no: 'Glad',
    fi: 'Iloinen'
  },
  'merry': {
    en: 'Merry',
    de: 'Fröhlich',
    fr: 'Joyeux',
    es: 'Alegre',
    it: 'Allegro',
    pt: 'Alegre',
    nl: 'Vrolijk',
    sv: 'Munter',
    da: 'Lystig',
    no: 'Lystig',
    fi: 'Hilpeä'
  },
  'sad': {
    en: 'Sad',
    de: 'Traurig',
    fr: 'Triste',
    es: 'Triste',
    it: 'Triste',
    pt: 'Triste',
    nl: 'Verdrietig',
    sv: 'Ledsen',
    da: 'Trist',
    no: 'Trist',
    fi: 'Surullinen'
  },
  'scared': {
    en: 'Scared',
    de: 'Verängstigt',
    fr: 'Effrayé',
    es: 'Asustado',
    it: 'Spaventato',
    pt: 'Assustado',
    nl: 'Bang',
    sv: 'Rädd',
    da: 'Bange',
    no: 'Redd',
    fi: 'Peloissaan'
  },
  'sceptical': {
    en: 'Skeptical',
    de: 'Skeptisch',
    fr: 'Sceptique',
    es: 'Escéptico',
    it: 'Scettico',
    pt: 'Cético',
    nl: 'Sceptisch',
    sv: 'Skeptisk',
    da: 'Skeptisk',
    no: 'Skeptisk',
    fi: 'Epäileväinen'
  },
  'shy': {
    en: 'Shy',
    de: 'Schüchtern',
    fr: 'Timide',
    es: 'Tímido',
    it: 'Timido',
    pt: 'Tímido',
    nl: 'Verlegen',
    sv: 'Blyg',
    da: 'Genert',
    no: 'Sjenert',
    fi: 'Ujo'
  },
  'surprised': {
    en: 'Surprised',
    de: 'Überrascht',
    fr: 'Surpris',
    es: 'Sorprendido',
    it: 'Sorpreso',
    pt: 'Surpreso',
    nl: 'Verrast',
    sv: 'Förvånad',
    da: 'Overrasket',
    no: 'Overrasket',
    fi: 'Yllättynyt'
  },
  'tired': {
    en: 'Tired',
    de: 'Müde',
    fr: 'Fatigué',
    es: 'Cansado',
    it: 'Stanco',
    pt: 'Cansado',
    nl: 'Moe',
    sv: 'Trött',
    da: 'Træt',
    no: 'Trøtt',
    fi: 'Väsynyt'
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
  console.log('Image Import Script: Emotions');
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
