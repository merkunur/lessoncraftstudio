const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'dinosaurs',
  type: 'images',
  sourceFolderName: 'dinosaurs',
  displayNames: {
    en: 'Dinosaurs',
    de: 'Dinosaurier',
    fr: 'Dinosaures',
    es: 'Dinosaurios',
    it: 'Dinosauri',
    pt: 'Dinossauros',
    nl: 'Dinosaurussen',
    sv: 'Dinosaurier',
    da: 'Dinosaurer',
    no: 'Dinosaurer',
    fi: 'Dinosaurukset'
  }
};

// Image translations (filename without extension -> translations)
// Dinosaur names are scientific names that remain largely the same across languages
const IMAGE_TRANSLATIONS = {
  'allosaurus': {
    en: 'Allosaurus',
    de: 'Allosaurus',
    fr: 'Allosaure',
    es: 'Alosaurio',
    it: 'Allosauro',
    pt: 'Alossauro',
    nl: 'Allosaurus',
    sv: 'Allosaurus',
    da: 'Allosaurus',
    no: 'Allosaurus',
    fi: 'Allosaurus'
  },
  'ankylosaurus': {
    en: 'Ankylosaurus',
    de: 'Ankylosaurus',
    fr: 'Ankylosaure',
    es: 'Anquilosaurio',
    it: 'Anchilosauro',
    pt: 'Anquilossauro',
    nl: 'Ankylosaurus',
    sv: 'Ankylosaurus',
    da: 'Ankylosaurus',
    no: 'Ankylosaurus',
    fi: 'Ankylosaurus'
  },
  'apatosaurus': {
    en: 'Apatosaurus',
    de: 'Apatosaurus',
    fr: 'Apatosaure',
    es: 'Apatosaurio',
    it: 'Apatosauro',
    pt: 'Apatossauro',
    nl: 'Apatosaurus',
    sv: 'Apatosaurus',
    da: 'Apatosaurus',
    no: 'Apatosaurus',
    fi: 'Apatosaurus'
  },
  'argentinosaurus': {
    en: 'Argentinosaurus',
    de: 'Argentinosaurus',
    fr: 'Argentinosaurus',
    es: 'Argentinosaurio',
    it: 'Argentinosauro',
    pt: 'Argentinossauro',
    nl: 'Argentinosaurus',
    sv: 'Argentinosaurus',
    da: 'Argentinosaurus',
    no: 'Argentinosaurus',
    fi: 'Argentinosaurus'
  },
  'brachiosaurus': {
    en: 'Brachiosaurus',
    de: 'Brachiosaurus',
    fr: 'Brachiosaure',
    es: 'Braquiosaurio',
    it: 'Brachiosauro',
    pt: 'Braquiossauro',
    nl: 'Brachiosaurus',
    sv: 'Brachiosaurus',
    da: 'Brachiosaurus',
    no: 'Brachiosaurus',
    fi: 'Brachiosaurus'
  },
  'brontosaurus': {
    en: 'Brontosaurus',
    de: 'Brontosaurus',
    fr: 'Brontosaure',
    es: 'Brontosaurio',
    it: 'Brontosauro',
    pt: 'Brontossauro',
    nl: 'Brontosaurus',
    sv: 'Brontosaurus',
    da: 'Brontosaurus',
    no: 'Brontosaurus',
    fi: 'Brontosaurus'
  },
  'carnotaurus': {
    en: 'Carnotaurus',
    de: 'Carnotaurus',
    fr: 'Carnotaure',
    es: 'Carnotauro',
    it: 'Carnotauro',
    pt: 'Carnotauro',
    nl: 'Carnotaurus',
    sv: 'Carnotaurus',
    da: 'Carnotaurus',
    no: 'Carnotaurus',
    fi: 'Carnotaurus'
  },
  'deinonychus': {
    en: 'Deinonychus',
    de: 'Deinonychus',
    fr: 'Déinonychus',
    es: 'Deinonico',
    it: 'Deinonychus',
    pt: 'Deinonico',
    nl: 'Deinonychus',
    sv: 'Deinonychus',
    da: 'Deinonychus',
    no: 'Deinonychus',
    fi: 'Deinonychus'
  },
  'dimetrodon': {
    en: 'Dimetrodon',
    de: 'Dimetrodon',
    fr: 'Dimétrodon',
    es: 'Dimetrodonte',
    it: 'Dimetrodonte',
    pt: 'Dimetrodonte',
    nl: 'Dimetrodon',
    sv: 'Dimetrodon',
    da: 'Dimetrodon',
    no: 'Dimetrodon',
    fi: 'Dimetrodon'
  },
  'diplodocus': {
    en: 'Diplodocus',
    de: 'Diplodocus',
    fr: 'Diplodocus',
    es: 'Diplodoco',
    it: 'Diplodoco',
    pt: 'Diplódoco',
    nl: 'Diplodocus',
    sv: 'Diplodocus',
    da: 'Diplodocus',
    no: 'Diplodocus',
    fi: 'Diplodocus'
  },
  'giganotosaurus': {
    en: 'Giganotosaurus',
    de: 'Giganotosaurus',
    fr: 'Giganotosaure',
    es: 'Giganotosaurio',
    it: 'Giganotosauro',
    pt: 'Giganotossauro',
    nl: 'Giganotosaurus',
    sv: 'Giganotosaurus',
    da: 'Giganotosaurus',
    no: 'Giganotosaurus',
    fi: 'Giganotosaurus'
  },
  'ichthyosaurus': {
    en: 'Ichthyosaurus',
    de: 'Ichthyosaurus',
    fr: 'Ichthyosaure',
    es: 'Ictiosaurio',
    it: 'Ittiosauro',
    pt: 'Ictiossauro',
    nl: 'Ichthyosaurus',
    sv: 'Ichthyosaurus',
    da: 'Ichthyosaurus',
    no: 'Ichthyosaurus',
    fi: 'Ichthyosaurus'
  },
  'iguanodon': {
    en: 'Iguanodon',
    de: 'Iguanodon',
    fr: 'Iguanodon',
    es: 'Iguanodonte',
    it: 'Iguanodonte',
    pt: 'Iguanodonte',
    nl: 'Iguanodon',
    sv: 'Iguanodon',
    da: 'Iguanodon',
    no: 'Iguanodon',
    fi: 'Iguanodon'
  },
  'maiasaura': {
    en: 'Maiasaura',
    de: 'Maiasaura',
    fr: 'Maiasaura',
    es: 'Maiasaura',
    it: 'Maiasaura',
    pt: 'Maiassaura',
    nl: 'Maiasaura',
    sv: 'Maiasaura',
    da: 'Maiasaura',
    no: 'Maiasaura',
    fi: 'Maiasaura'
  },
  'mosasaurus': {
    en: 'Mosasaurus',
    de: 'Mosasaurus',
    fr: 'Mosasaure',
    es: 'Mosasaurio',
    it: 'Mosasauro',
    pt: 'Mosassauro',
    nl: 'Mosasaurus',
    sv: 'Mosasaurus',
    da: 'Mosasaurus',
    no: 'Mosasaurus',
    fi: 'Mosasaurus'
  },
  'oviraptor': {
    en: 'Oviraptor',
    de: 'Oviraptor',
    fr: 'Oviraptor',
    es: 'Oviraptor',
    it: 'Oviraptor',
    pt: 'Oviraptor',
    nl: 'Oviraptor',
    sv: 'Oviraptor',
    da: 'Oviraptor',
    no: 'Oviraptor',
    fi: 'Oviraptor'
  },
  'pachycephalosaurus': {
    en: 'Pachycephalosaurus',
    de: 'Pachycephalosaurus',
    fr: 'Pachycéphalosaure',
    es: 'Paquicefalosaurio',
    it: 'Pachicefalosauro',
    pt: 'Paquicefalossauro',
    nl: 'Pachycephalosaurus',
    sv: 'Pachycephalosaurus',
    da: 'Pachycephalosaurus',
    no: 'Pachycephalosaurus',
    fi: 'Pachycephalosaurus'
  },
  'parasaurolophus': {
    en: 'Parasaurolophus',
    de: 'Parasaurolophus',
    fr: 'Parasaurolophus',
    es: 'Parasaurolofus',
    it: 'Parasaurolofo',
    pt: 'Parassaurolofo',
    nl: 'Parasaurolophus',
    sv: 'Parasaurolophus',
    da: 'Parasaurolophus',
    no: 'Parasaurolophus',
    fi: 'Parasaurolophus'
  },
  'plesiosaurus': {
    en: 'Plesiosaurus',
    de: 'Plesiosaurus',
    fr: 'Plésiosaure',
    es: 'Plesiosaurio',
    it: 'Plesiosauro',
    pt: 'Plesiossauro',
    nl: 'Plesiosaurus',
    sv: 'Plesiosaurus',
    da: 'Plesiosaurus',
    no: 'Plesiosaurus',
    fi: 'Plesiosaurus'
  },
  'stegosaurus': {
    en: 'Stegosaurus',
    de: 'Stegosaurus',
    fr: 'Stégosaure',
    es: 'Estegosaurio',
    it: 'Stegosauro',
    pt: 'Estegossauro',
    nl: 'Stegosaurus',
    sv: 'Stegosaurus',
    da: 'Stegosaurus',
    no: 'Stegosaurus',
    fi: 'Stegosaurus'
  },
  'styracosaurus': {
    en: 'Styracosaurus',
    de: 'Styracosaurus',
    fr: 'Styracosaure',
    es: 'Estiracosaurio',
    it: 'Stiracosauro',
    pt: 'Estiracossauro',
    nl: 'Styracosaurus',
    sv: 'Styracosaurus',
    da: 'Styracosaurus',
    no: 'Styracosaurus',
    fi: 'Styracosaurus'
  },
  'therizinosaurus': {
    en: 'Therizinosaurus',
    de: 'Therizinosaurus',
    fr: 'Thérizinosaure',
    es: 'Terizinosaurio',
    it: 'Terizinosauro',
    pt: 'Terizinossauro',
    nl: 'Therizinosaurus',
    sv: 'Therizinosaurus',
    da: 'Therizinosaurus',
    no: 'Therizinosaurus',
    fi: 'Therizinosaurus'
  },
  'triceratops': {
    en: 'Triceratops',
    de: 'Triceratops',
    fr: 'Tricératops',
    es: 'Triceratops',
    it: 'Triceratopo',
    pt: 'Tricerátops',
    nl: 'Triceratops',
    sv: 'Triceratops',
    da: 'Triceratops',
    no: 'Triceratops',
    fi: 'Triceratops'
  },
  'tyrannosaurus rex': {
    en: 'Tyrannosaurus Rex',
    de: 'Tyrannosaurus Rex',
    fr: 'Tyrannosaure Rex',
    es: 'Tiranosaurio Rex',
    it: 'Tirannosauro Rex',
    pt: 'Tiranossauro Rex',
    nl: 'Tyrannosaurus Rex',
    sv: 'Tyrannosaurus Rex',
    da: 'Tyrannosaurus Rex',
    no: 'Tyrannosaurus Rex',
    fi: 'Tyrannosaurus Rex'
  },
  'velociraptor': {
    en: 'Velociraptor',
    de: 'Velociraptor',
    fr: 'Vélociraptor',
    es: 'Velociraptor',
    it: 'Velociraptor',
    pt: 'Velociraptor',
    nl: 'Velociraptor',
    sv: 'Velociraptor',
    da: 'Velociraptor',
    no: 'Velociraptor',
    fi: 'Velociraptor'
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
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
  console.log('Image Import Script: Dinosaurs');
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
