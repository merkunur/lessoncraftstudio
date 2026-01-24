const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'tools',
  type: 'images',
  sourceFolderName: 'tools',
  displayNames: {
    en: 'Tools',
    de: 'Werkzeuge',
    fr: 'Outils',
    es: 'Herramientas',
    it: 'Attrezzi',
    pt: 'Ferramentas',
    nl: 'Gereedschap',
    sv: 'Verktyg',
    da: 'Værktøj',
    no: 'Verktøy',
    fi: 'Työkalut'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'bolt': {
    en: 'Bolt',
    de: 'Schraube',
    fr: 'Boulon',
    es: 'Tornillo',
    it: 'Bullone',
    pt: 'Parafuso',
    nl: 'Bout',
    sv: 'Bult',
    da: 'Bolt',
    no: 'Bolt',
    fi: 'Pultti'
  },
  'caulking gun': {
    en: 'Caulking Gun',
    de: 'Kartuschenpistole',
    fr: 'Pistolet à calfeutrer',
    es: 'Pistola de calafateo',
    it: 'Pistola per silicone',
    pt: 'Pistola de calafetagem',
    nl: 'Kitspuit',
    sv: 'Fogpistol',
    da: 'Fugepistol',
    no: 'Fugepistol',
    fi: 'Saumauspistooli'
  },
  'electric drill': {
    en: 'Electric Drill',
    de: 'Bohrmaschine',
    fr: 'Perceuse électrique',
    es: 'Taladro eléctrico',
    it: 'Trapano elettrico',
    pt: 'Furadeira elétrica',
    nl: 'Boormachine',
    sv: 'Borrmaskin',
    da: 'Boremaskine',
    no: 'Boremaskin',
    fi: 'Sähköpora'
  },
  'extension cord': {
    en: 'Extension Cord',
    de: 'Verlängerungskabel',
    fr: 'Rallonge électrique',
    es: 'Cable de extensión',
    it: 'Prolunga elettrica',
    pt: 'Extensão elétrica',
    nl: 'Verlengsnoer',
    sv: 'Förlängningssladd',
    da: 'Forlængerledning',
    no: 'Skjøteledning',
    fi: 'Jatkojohto'
  },
  'flashlight': {
    en: 'Flashlight',
    de: 'Taschenlampe',
    fr: 'Lampe de poche',
    es: 'Linterna',
    it: 'Torcia elettrica',
    pt: 'Lanterna',
    nl: 'Zaklamp',
    sv: 'Ficklampa',
    da: 'Lommelygte',
    no: 'Lommelykt',
    fi: 'Taskulamppu'
  },
  'hammer': {
    en: 'Hammer',
    de: 'Hammer',
    fr: 'Marteau',
    es: 'Martillo',
    it: 'Martello',
    pt: 'Martelo',
    nl: 'Hamer',
    sv: 'Hammare',
    da: 'Hammer',
    no: 'Hammer',
    fi: 'Vasara'
  },
  'handsaw': {
    en: 'Handsaw',
    de: 'Handsäge',
    fr: 'Scie à main',
    es: 'Serrucho',
    it: 'Sega a mano',
    pt: 'Serrote',
    nl: 'Handzaag',
    sv: 'Handsåg',
    da: 'Håndsav',
    no: 'Håndsag',
    fi: 'Käsisaha'
  },
  'ladder': {
    en: 'Ladder',
    de: 'Leiter',
    fr: 'Échelle',
    es: 'Escalera',
    it: 'Scala',
    pt: 'Escada',
    nl: 'Ladder',
    sv: 'Stege',
    da: 'Stige',
    no: 'Stige',
    fi: 'Tikkaat'
  },
  'nail': {
    en: 'Nail',
    de: 'Nagel',
    fr: 'Clou',
    es: 'Clavo',
    it: 'Chiodo',
    pt: 'Prego',
    nl: 'Spijker',
    sv: 'Spik',
    da: 'Søm',
    no: 'Spiker',
    fi: 'Naula'
  },
  'nut': {
    en: 'Nut',
    de: 'Mutter',
    fr: 'Écrou',
    es: 'Tuerca',
    it: 'Dado',
    pt: 'Porca',
    nl: 'Moer',
    sv: 'Mutter',
    da: 'Møtrik',
    no: 'Mutter',
    fi: 'Mutteri'
  },
  'paint brush': {
    en: 'Paint Brush',
    de: 'Pinsel',
    fr: 'Pinceau',
    es: 'Brocha',
    it: 'Pennello',
    pt: 'Pincel',
    nl: 'Verfkwast',
    sv: 'Pensel',
    da: 'Pensel',
    no: 'Pensel',
    fi: 'Maalipensseli'
  },
  'pliers': {
    en: 'Pliers',
    de: 'Zange',
    fr: 'Pince',
    es: 'Pinzas',
    it: 'Pinze',
    pt: 'Alicate',
    nl: 'Tang',
    sv: 'Tång',
    da: 'Tang',
    no: 'Tang',
    fi: 'Pihdit'
  },
  'plunger': {
    en: 'Plunger',
    de: 'Saugglocke',
    fr: 'Ventouse',
    es: 'Destapacaños',
    it: 'Sturalavandini',
    pt: 'Desentupidor',
    nl: 'Ontstopper',
    sv: 'Vaskrensare',
    da: 'Svupper',
    no: 'Stoppeklokke',
    fi: 'Viemäripumppu'
  },
  'screwdriver': {
    en: 'Screwdriver',
    de: 'Schraubenzieher',
    fr: 'Tournevis',
    es: 'Desarmador',
    it: 'Cacciavite',
    pt: 'Chave de fenda',
    nl: 'Schroevendraaier',
    sv: 'Skruvmejsel',
    da: 'Skruetrækker',
    no: 'Skrutrekker',
    fi: 'Ruuvimeisseli'
  },
  'spanner': {
    en: 'Wrench',
    de: 'Schraubenschlüssel',
    fr: 'Clé à molette',
    es: 'Llave inglesa',
    it: 'Chiave inglese',
    pt: 'Chave inglesa',
    nl: 'Moersleutel',
    sv: 'Skiftnyckel',
    da: 'Skruenøgle',
    no: 'Skiftenøkkel',
    fi: 'Jakoavain'
  },
  'spirit level': {
    en: 'Spirit Level',
    de: 'Wasserwaage',
    fr: 'Niveau à bulle',
    es: 'Nivel de burbuja',
    it: 'Livella a bolla',
    pt: 'Nível de bolha',
    nl: 'Waterpas',
    sv: 'Vattenpass',
    da: 'Vaterpas',
    no: 'Vaterpass',
    fi: 'Vesivaaka'
  },
  'tape measure': {
    en: 'Tape Measure',
    de: 'Maßband',
    fr: 'Mètre ruban',
    es: 'Cinta métrica',
    it: 'Metro a nastro',
    pt: 'Trena',
    nl: 'Meetlint',
    sv: 'Måttband',
    da: 'Målebånd',
    no: 'Målebånd',
    fi: 'Mittanauha'
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
  console.log('Image Import Script: Tools');
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
