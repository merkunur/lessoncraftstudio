const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'furniture',
  type: 'images',
  sourceFolderName: 'furniture',
  displayNames: {
    en: 'Furniture',
    de: 'Möbel',
    fr: 'Meubles',
    es: 'Muebles',
    it: 'Mobili',
    pt: 'Móveis',
    nl: 'Meubels',
    sv: 'Möbler',
    da: 'Møbler',
    no: 'Møbler',
    fi: 'Huonekalut'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'armchair': {
    en: 'Armchair',
    de: 'Sessel',
    fr: 'Fauteuil',
    es: 'Sillón',
    it: 'Poltrona',
    pt: 'Poltrona',
    nl: 'Fauteuil',
    sv: 'Fåtölj',
    da: 'Lænestol',
    no: 'Lenestol',
    fi: 'Nojatuoli'
  },
  'bed': {
    en: 'Bed',
    de: 'Bett',
    fr: 'Lit',
    es: 'Cama',
    it: 'Letto',
    pt: 'Cama',
    nl: 'Bed',
    sv: 'Säng',
    da: 'Seng',
    no: 'Seng',
    fi: 'Sänky'
  },
  'bench': {
    en: 'Bench',
    de: 'Bank',
    fr: 'Banc',
    es: 'Banca',
    it: 'Panca',
    pt: 'Banco',
    nl: 'Bank',
    sv: 'Bänk',
    da: 'Bænk',
    no: 'Benk',
    fi: 'Penkki'
  },
  'bookcase': {
    en: 'Bookcase',
    de: 'Bücherregal',
    fr: 'Bibliothèque',
    es: 'Librero',
    it: 'Libreria',
    pt: 'Estante',
    nl: 'Boekenkast',
    sv: 'Bokhylla',
    da: 'Bogreol',
    no: 'Bokhylle',
    fi: 'Kirjahylly'
  },
  'cabinet': {
    en: 'Cabinet',
    de: 'Schrank',
    fr: 'Armoire',
    es: 'Gabinete',
    it: 'Armadietto',
    pt: 'Armário',
    nl: 'Kast',
    sv: 'Skåp',
    da: 'Skab',
    no: 'Skap',
    fi: 'Kaappi'
  },
  'chair': {
    en: 'Chair',
    de: 'Stuhl',
    fr: 'Chaise',
    es: 'Silla',
    it: 'Sedia',
    pt: 'Cadeira',
    nl: 'Stoel',
    sv: 'Stol',
    da: 'Stol',
    no: 'Stol',
    fi: 'Tuoli'
  },
  'couch,': {
    en: 'Couch',
    de: 'Couch',
    fr: 'Canapé',
    es: 'Sofá',
    it: 'Divano',
    pt: 'Sofá',
    nl: 'Bank',
    sv: 'Soffa',
    da: 'Sofa',
    no: 'Sofa',
    fi: 'Sohva'
  },
  'crib': {
    en: 'Crib',
    de: 'Kinderbett',
    fr: 'Berceau',
    es: 'Cuna',
    it: 'Culla',
    pt: 'Berço',
    nl: 'Wieg',
    sv: 'Spjälsäng',
    da: 'Tremmeseng',
    no: 'Barneseng',
    fi: 'Pinnasänky'
  },
  'curtains': {
    en: 'Curtains',
    de: 'Vorhänge',
    fr: 'Rideaux',
    es: 'Cortinas',
    it: 'Tende',
    pt: 'Cortinas',
    nl: 'Gordijnen',
    sv: 'Gardiner',
    da: 'Gardiner',
    no: 'Gardiner',
    fi: 'Verhot'
  },
  'cushion': {
    en: 'Cushion',
    de: 'Kissen',
    fr: 'Coussin',
    es: 'Cojín',
    it: 'Cuscino',
    pt: 'Almofada',
    nl: 'Kussen',
    sv: 'Kudde',
    da: 'Pude',
    no: 'Pute',
    fi: 'Tyyny'
  },
  'desk': {
    en: 'Desk',
    de: 'Schreibtisch',
    fr: 'Bureau',
    es: 'Escritorio',
    it: 'Scrivania',
    pt: 'Escrivaninha',
    nl: 'Bureau',
    sv: 'Skrivbord',
    da: 'Skrivebord',
    no: 'Skrivebord',
    fi: 'Työpöytä'
  },
  'dresser': {
    en: 'Dresser',
    de: 'Kommode',
    fr: 'Commode',
    es: 'Cómoda',
    it: 'Cassettiera',
    pt: 'Cômoda',
    nl: 'Ladekast',
    sv: 'Byrå',
    da: 'Kommode',
    no: 'Kommode',
    fi: 'Lipasto'
  },
  'lamp': {
    en: 'Lamp',
    de: 'Lampe',
    fr: 'Lampe',
    es: 'Lámpara',
    it: 'Lampada',
    pt: 'Abajur',
    nl: 'Lamp',
    sv: 'Lampa',
    da: 'Lampe',
    no: 'Lampe',
    fi: 'Lamppu'
  },
  'mirror': {
    en: 'Mirror',
    de: 'Spiegel',
    fr: 'Miroir',
    es: 'Espejo',
    it: 'Specchio',
    pt: 'Espelho',
    nl: 'Spiegel',
    sv: 'Spegel',
    da: 'Spejl',
    no: 'Speil',
    fi: 'Peili'
  },
  'nightstand': {
    en: 'Nightstand',
    de: 'Nachttisch',
    fr: 'Table de nuit',
    es: 'Buró',
    it: 'Comodino',
    pt: 'Criado-mudo',
    nl: 'Nachtkastje',
    sv: 'Nattduksbord',
    da: 'Natbord',
    no: 'Nattbord',
    fi: 'Yöpöytä'
  },
  'ottoman': {
    en: 'Ottoman',
    de: 'Hocker',
    fr: 'Pouf',
    es: 'Otomana',
    it: 'Pouf',
    pt: 'Pufe',
    nl: 'Poef',
    sv: 'Fotpall',
    da: 'Puf',
    no: 'Fotskammel',
    fi: 'Rahi'
  },
  'rocker': {
    en: 'Rocking Chair',
    de: 'Schaukelstuhl',
    fr: 'Chaise à bascule',
    es: 'Mecedora',
    it: 'Sedia a dondolo',
    pt: 'Cadeira de balanço',
    nl: 'Schommelstoel',
    sv: 'Gungstol',
    da: 'Gyngestol',
    no: 'Gyngestol',
    fi: 'Keinutuoli'
  },
  'rug': {
    en: 'Rug',
    de: 'Teppich',
    fr: 'Tapis',
    es: 'Tapete',
    it: 'Tappeto',
    pt: 'Tapete',
    nl: 'Vloerkleed',
    sv: 'Matta',
    da: 'Tæppe',
    no: 'Teppe',
    fi: 'Matto'
  },
  'shelf': {
    en: 'Shelf',
    de: 'Regal',
    fr: 'Étagère',
    es: 'Repisa',
    it: 'Mensola',
    pt: 'Prateleira',
    nl: 'Plank',
    sv: 'Hylla',
    da: 'Hylde',
    no: 'Hylle',
    fi: 'Hylly'
  },
  'sofa': {
    en: 'Sofa',
    de: 'Sofa',
    fr: 'Sofa',
    es: 'Sofá',
    it: 'Sofà',
    pt: 'Sofá',
    nl: 'Sofa',
    sv: 'Soffa',
    da: 'Sofa',
    no: 'Sofa',
    fi: 'Sohva'
  },
  'stool': {
    en: 'Stool',
    de: 'Hocker',
    fr: 'Tabouret',
    es: 'Taburete',
    it: 'Sgabello',
    pt: 'Banqueta',
    nl: 'Kruk',
    sv: 'Pall',
    da: 'Taburet',
    no: 'Krakk',
    fi: 'Jakkara'
  },
  'table': {
    en: 'Table',
    de: 'Tisch',
    fr: 'Table',
    es: 'Mesa',
    it: 'Tavolo',
    pt: 'Mesa',
    nl: 'Tafel',
    sv: 'Bord',
    da: 'Bord',
    no: 'Bord',
    fi: 'Pöytä'
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
  console.log('Image Import Script: Furniture');
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
