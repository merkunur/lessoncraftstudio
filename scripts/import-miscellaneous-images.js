const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'miscellaneous',
  type: 'images',
  sourceFolderName: 'miscellaneous',
  displayNames: {
    en: 'Miscellaneous',
    de: 'Verschiedenes',
    fr: 'Divers',
    es: 'Misceláneo',
    it: 'Varie',
    pt: 'Diversos',
    nl: 'Diversen',
    sv: 'Blandat',
    da: 'Diverse',
    no: 'Diverse',
    fi: 'Sekalaista'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'acorn': {
    en: 'Acorn',
    de: 'Eichel',
    fr: 'Gland',
    es: 'Bellota',
    it: 'Ghianda',
    pt: 'Bolota',
    nl: 'Eikel',
    sv: 'Ekollon',
    da: 'Agern',
    no: 'Eikenøtt',
    fi: 'Tammenterhon'
  },
  'autumn': {
    en: 'Autumn',
    de: 'Herbst',
    fr: 'Automne',
    es: 'Otoño',
    it: 'Autunno',
    pt: 'Outono',
    nl: 'Herfst',
    sv: 'Höst',
    da: 'Efterår',
    no: 'Høst',
    fi: 'Syksy'
  },
  'bonfire': {
    en: 'Bonfire',
    de: 'Lagerfeuer',
    fr: 'Feu de camp',
    es: 'Fogata',
    it: 'Falò',
    pt: 'Fogueira',
    nl: 'Kampvuur',
    sv: 'Lägereld',
    da: 'Bål',
    no: 'Bål',
    fi: 'Nuotio'
  },
  'computer keyboard': {
    en: 'Computer Keyboard',
    de: 'Computertastatur',
    fr: 'Clavier d\'ordinateur',
    es: 'Teclado de computadora',
    it: 'Tastiera del computer',
    pt: 'Teclado de computador',
    nl: 'Computertoetsenbord',
    sv: 'Datortangentbord',
    da: 'Computertastatur',
    no: 'Datatastatur',
    fi: 'Tietokonenäppäimistö'
  },
  'crow': {
    en: 'Crow',
    de: 'Krähe',
    fr: 'Corbeau',
    es: 'Cuervo',
    it: 'Corvo',
    pt: 'Corvo',
    nl: 'Kraai',
    sv: 'Kråka',
    da: 'Krage',
    no: 'Kråke',
    fi: 'Varis'
  },
  'ghost': {
    en: 'Ghost',
    de: 'Geist',
    fr: 'Fantôme',
    es: 'Fantasma',
    it: 'Fantasma',
    pt: 'Fantasma',
    nl: 'Spook',
    sv: 'Spöke',
    da: 'Spøgelse',
    no: 'Spøkelse',
    fi: 'Kummitus'
  },
  'halloween': {
    en: 'Halloween',
    de: 'Halloween',
    fr: 'Halloween',
    es: 'Halloween',
    it: 'Halloween',
    pt: 'Halloween',
    nl: 'Halloween',
    sv: 'Halloween',
    da: 'Halloween',
    no: 'Halloween',
    fi: 'Halloween'
  },
  'house': {
    en: 'House',
    de: 'Haus',
    fr: 'Maison',
    es: 'Casa',
    it: 'Casa',
    pt: 'Casa',
    nl: 'Huis',
    sv: 'Hus',
    da: 'Hus',
    no: 'Hus',
    fi: 'Talo'
  },
  'leaf': {
    en: 'Leaf',
    de: 'Blatt',
    fr: 'Feuille',
    es: 'Hoja',
    it: 'Foglia',
    pt: 'Folha',
    nl: 'Blad',
    sv: 'Löv',
    da: 'Blad',
    no: 'Blad',
    fi: 'Lehti'
  },
  'orchard': {
    en: 'Orchard',
    de: 'Obstgarten',
    fr: 'Verger',
    es: 'Huerto',
    it: 'Frutteto',
    pt: 'Pomar',
    nl: 'Boomgaard',
    sv: 'Fruktträdgård',
    da: 'Frugtplantage',
    no: 'Frukthage',
    fi: 'Hedelmätarha'
  },
  'pinecone': {
    en: 'Pinecone',
    de: 'Tannenzapfen',
    fr: 'Pomme de pin',
    es: 'Piña',
    it: 'Pigna',
    pt: 'Pinha',
    nl: 'Dennenappel',
    sv: 'Tallkotte',
    da: 'Grankogle',
    no: 'Kongle',
    fi: 'Käpy'
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
  console.log('Image Import Script: Miscellaneous');
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
