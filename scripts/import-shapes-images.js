const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'shapes',
  type: 'images',
  sourceFolderName: 'shapes',
  displayNames: {
    en: 'Shapes',
    de: 'Formen',
    fr: 'Formes',
    es: 'Formas',
    it: 'Forme',
    pt: 'Formas',
    nl: 'Vormen',
    sv: 'Former',
    da: 'Former',
    no: 'Former',
    fi: 'Muodot'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'circle': {
    en: 'Circle',
    de: 'Kreis',
    fr: 'Cercle',
    es: 'Círculo',
    it: 'Cerchio',
    pt: 'Círculo',
    nl: 'Cirkel',
    sv: 'Cirkel',
    da: 'Cirkel',
    no: 'Sirkel',
    fi: 'Ympyrä'
  },
  'cone': {
    en: 'Cone',
    de: 'Kegel',
    fr: 'Cône',
    es: 'Cono',
    it: 'Cono',
    pt: 'Cone',
    nl: 'Kegel',
    sv: 'Kon',
    da: 'Kegle',
    no: 'Kjegle',
    fi: 'Kartio'
  },
  'cube': {
    en: 'Cube',
    de: 'Würfel',
    fr: 'Cube',
    es: 'Cubo',
    it: 'Cubo',
    pt: 'Cubo',
    nl: 'Kubus',
    sv: 'Kub',
    da: 'Terning',
    no: 'Kube',
    fi: 'Kuutio'
  },
  'cylinder': {
    en: 'Cylinder',
    de: 'Zylinder',
    fr: 'Cylindre',
    es: 'Cilindro',
    it: 'Cilindro',
    pt: 'Cilindro',
    nl: 'Cilinder',
    sv: 'Cylinder',
    da: 'Cylinder',
    no: 'Sylinder',
    fi: 'Sylinteri'
  },
  'diamond': {
    en: 'Diamond',
    de: 'Raute',
    fr: 'Losange',
    es: 'Rombo',
    it: 'Rombo',
    pt: 'Losango',
    nl: 'Ruit',
    sv: 'Romb',
    da: 'Rombe',
    no: 'Rombe',
    fi: 'Vinoneliö'
  },
  'heart': {
    en: 'Heart',
    de: 'Herz',
    fr: 'Cœur',
    es: 'Corazón',
    it: 'Cuore',
    pt: 'Coração',
    nl: 'Hart',
    sv: 'Hjärta',
    da: 'Hjerte',
    no: 'Hjerte',
    fi: 'Sydän'
  },
  'heptagon': {
    en: 'Heptagon',
    de: 'Siebeneck',
    fr: 'Heptagone',
    es: 'Heptágono',
    it: 'Ettagono',
    pt: 'Heptágono',
    nl: 'Zevenhoek',
    sv: 'Sjuhörning',
    da: 'Syvkant',
    no: 'Sjukant',
    fi: 'Seitsenkulmio'
  },
  'hexagon': {
    en: 'Hexagon',
    de: 'Sechseck',
    fr: 'Hexagone',
    es: 'Hexágono',
    it: 'Esagono',
    pt: 'Hexágono',
    nl: 'Zeshoek',
    sv: 'Sexhörning',
    da: 'Sekskant',
    no: 'Sekskant',
    fi: 'Kuusikulmio'
  },
  'moon': {
    en: 'Moon',
    de: 'Mond',
    fr: 'Lune',
    es: 'Luna',
    it: 'Luna',
    pt: 'Lua',
    nl: 'Maan',
    sv: 'Måne',
    da: 'Måne',
    no: 'Måne',
    fi: 'Kuu'
  },
  'octogon': {
    en: 'Octagon',
    de: 'Achteck',
    fr: 'Octogone',
    es: 'Octágono',
    it: 'Ottagono',
    pt: 'Octógono',
    nl: 'Achthoek',
    sv: 'Åttahörning',
    da: 'Ottekant',
    no: 'Åttekant',
    fi: 'Kahdeksankulmio'
  },
  'oval': {
    en: 'Oval',
    de: 'Oval',
    fr: 'Ovale',
    es: 'Óvalo',
    it: 'Ovale',
    pt: 'Oval',
    nl: 'Ovaal',
    sv: 'Oval',
    da: 'Oval',
    no: 'Oval',
    fi: 'Soikio'
  },
  'parallelogram': {
    en: 'Parallelogram',
    de: 'Parallelogramm',
    fr: 'Parallélogramme',
    es: 'Paralelogramo',
    it: 'Parallelogramma',
    pt: 'Paralelogramo',
    nl: 'Parallellogram',
    sv: 'Parallellogram',
    da: 'Parallelogram',
    no: 'Parallellogram',
    fi: 'Suunnikas'
  },
  'pentagon': {
    en: 'Pentagon',
    de: 'Fünfeck',
    fr: 'Pentagone',
    es: 'Pentágono',
    it: 'Pentagono',
    pt: 'Pentágono',
    nl: 'Vijfhoek',
    sv: 'Femhörning',
    da: 'Femkant',
    no: 'Femkant',
    fi: 'Viisikulmio'
  },
  'pyramid': {
    en: 'Pyramid',
    de: 'Pyramide',
    fr: 'Pyramide',
    es: 'Pirámide',
    it: 'Piramide',
    pt: 'Pirâmide',
    nl: 'Piramide',
    sv: 'Pyramid',
    da: 'Pyramide',
    no: 'Pyramide',
    fi: 'Pyramidi'
  },
  'rectangle': {
    en: 'Rectangle',
    de: 'Rechteck',
    fr: 'Rectangle',
    es: 'Rectángulo',
    it: 'Rettangolo',
    pt: 'Retângulo',
    nl: 'Rechthoek',
    sv: 'Rektangel',
    da: 'Rektangel',
    no: 'Rektangel',
    fi: 'Suorakulmio'
  },
  'rectangular box': {
    en: 'Rectangular Box',
    de: 'Quader',
    fr: 'Pavé droit',
    es: 'Prisma rectangular',
    it: 'Parallelepipedo',
    pt: 'Paralelepípedo',
    nl: 'Balk',
    sv: 'Rätblock',
    da: 'Kasse',
    no: 'Rettkantet boks',
    fi: 'Suorakulmainen särmiö'
  },
  'sphere': {
    en: 'Sphere',
    de: 'Kugel',
    fr: 'Sphère',
    es: 'Esfera',
    it: 'Sfera',
    pt: 'Esfera',
    nl: 'Bol',
    sv: 'Sfär',
    da: 'Kugle',
    no: 'Kule',
    fi: 'Pallo'
  },
  'square': {
    en: 'Square',
    de: 'Quadrat',
    fr: 'Carré',
    es: 'Cuadrado',
    it: 'Quadrato',
    pt: 'Quadrado',
    nl: 'Vierkant',
    sv: 'Kvadrat',
    da: 'Kvadrat',
    no: 'Kvadrat',
    fi: 'Neliö'
  },
  'star': {
    en: 'Star',
    de: 'Stern',
    fr: 'Étoile',
    es: 'Estrella',
    it: 'Stella',
    pt: 'Estrela',
    nl: 'Ster',
    sv: 'Stjärna',
    da: 'Stjerne',
    no: 'Stjerne',
    fi: 'Tähti'
  },
  'trapezoid': {
    en: 'Trapezoid',
    de: 'Trapez',
    fr: 'Trapèze',
    es: 'Trapecio',
    it: 'Trapezio',
    pt: 'Trapézio',
    nl: 'Trapezium',
    sv: 'Trapets',
    da: 'Trapez',
    no: 'Trapes',
    fi: 'Puolisuunnikas'
  },
  'triangle': {
    en: 'Triangle',
    de: 'Dreieck',
    fr: 'Triangle',
    es: 'Triángulo',
    it: 'Triangolo',
    pt: 'Triângulo',
    nl: 'Driehoek',
    sv: 'Triangel',
    da: 'Trekant',
    no: 'Trekant',
    fi: 'Kolmio'
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
  console.log('Image Import Script: Shapes');
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
