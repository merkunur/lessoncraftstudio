const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'education_bw',
  type: 'images',
  sourceFolderName: 'education bw',
  displayNames: {
    en: 'Education BW',
    de: 'Bildung SW',
    fr: 'Éducation NB',
    es: 'Educación BN',
    it: 'Istruzione BN',
    pt: 'Educação PB',
    nl: 'Onderwijs ZW',
    sv: 'Utbildning SV',
    da: 'Uddannelse SH',
    no: 'Utdanning SH',
    fi: 'Koulutus MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'backpack': {
    en: 'Backpack',
    de: 'Rucksack',
    fr: 'Sac à dos',
    es: 'Mochila',
    it: 'Zaino',
    pt: 'Mochila',
    nl: 'Rugzak',
    sv: 'Ryggsäck',
    da: 'Rygsæk',
    no: 'Ryggsekk',
    fi: 'Reppu'
  },
  'book': {
    en: 'Book',
    de: 'Buch',
    fr: 'Livre',
    es: 'Libro',
    it: 'Libro',
    pt: 'Livro',
    nl: 'Boek',
    sv: 'Bok',
    da: 'Bog',
    no: 'Bok',
    fi: 'Kirja'
  },
  'book 2': {
    en: 'Book 2',
    de: 'Buch 2',
    fr: 'Livre 2',
    es: 'Libro 2',
    it: 'Libro 2',
    pt: 'Livro 2',
    nl: 'Boek 2',
    sv: 'Bok 2',
    da: 'Bog 2',
    no: 'Bok 2',
    fi: 'Kirja 2'
  },
  'box': {
    en: 'Box',
    de: 'Schachtel',
    fr: 'Boîte',
    es: 'Caja',
    it: 'Scatola',
    pt: 'Caixa',
    nl: 'Doos',
    sv: 'Låda',
    da: 'Æske',
    no: 'Boks',
    fi: 'Laatikko'
  },
  'calculator': {
    en: 'Calculator',
    de: 'Taschenrechner',
    fr: 'Calculatrice',
    es: 'Calculadora',
    it: 'Calcolatrice',
    pt: 'Calculadora',
    nl: 'Rekenmachine',
    sv: 'Miniräknare',
    da: 'Lommeregner',
    no: 'Kalkulator',
    fi: 'Laskin'
  },
  'clock': {
    en: 'Clock',
    de: 'Uhr',
    fr: 'Horloge',
    es: 'Reloj',
    it: 'Orologio',
    pt: 'Relógio',
    nl: 'Klok',
    sv: 'Klocka',
    da: 'Ur',
    no: 'Klokke',
    fi: 'Kello'
  },
  'crayon': {
    en: 'Crayon',
    de: 'Buntstift',
    fr: 'Crayon de couleur',
    es: 'Crayón',
    it: 'Pastello',
    pt: 'Giz de cera',
    nl: 'Krijt',
    sv: 'Krita',
    da: 'Farvekridt',
    no: 'Fargestift',
    fi: 'Värikynä'
  },
  'crayon 2': {
    en: 'Crayon 2',
    de: 'Buntstift 2',
    fr: 'Crayon de couleur 2',
    es: 'Crayón 2',
    it: 'Pastello 2',
    pt: 'Giz de cera 2',
    nl: 'Krijt 2',
    sv: 'Krita 2',
    da: 'Farvekridt 2',
    no: 'Fargestift 2',
    fi: 'Värikynä 2'
  },
  'eraser': {
    en: 'Eraser',
    de: 'Radiergummi',
    fr: 'Gomme',
    es: 'Borrador',
    it: 'Gomma',
    pt: 'Borracha',
    nl: 'Gum',
    sv: 'Suddgummi',
    da: 'Viskelæder',
    no: 'Viskelær',
    fi: 'Pyyhekumi'
  },
  'gift box': {
    en: 'Gift Box',
    de: 'Geschenkbox',
    fr: 'Boîte cadeau',
    es: 'Caja de regalo',
    it: 'Scatola regalo',
    pt: 'Caixa de presente',
    nl: 'Cadeaudoos',
    sv: 'Presentlåda',
    da: 'Gaveæske',
    no: 'Gaveboks',
    fi: 'Lahjapakkaus'
  },
  'glasses': {
    en: 'Glasses',
    de: 'Brille',
    fr: 'Lunettes',
    es: 'Lentes',
    it: 'Occhiali',
    pt: 'Óculos',
    nl: 'Bril',
    sv: 'Glasögon',
    da: 'Briller',
    no: 'Briller',
    fi: 'Silmälasit'
  },
  'glue': {
    en: 'Glue',
    de: 'Kleber',
    fr: 'Colle',
    es: 'Pegamento',
    it: 'Colla',
    pt: 'Cola',
    nl: 'Lijm',
    sv: 'Lim',
    da: 'Lim',
    no: 'Lim',
    fi: 'Liima'
  },
  'letter': {
    en: 'Letter',
    de: 'Brief',
    fr: 'Lettre',
    es: 'Carta',
    it: 'Lettera',
    pt: 'Carta',
    nl: 'Brief',
    sv: 'Brev',
    da: 'Brev',
    no: 'Brev',
    fi: 'Kirje'
  },
  'notebook': {
    en: 'Notebook',
    de: 'Notizbuch',
    fr: 'Cahier',
    es: 'Cuaderno',
    it: 'Quaderno',
    pt: 'Caderno',
    nl: 'Notitieboek',
    sv: 'Anteckningsbok',
    da: 'Notesbog',
    no: 'Notatbok',
    fi: 'Muistivihko'
  },
  'paintbrush': {
    en: 'Paintbrush',
    de: 'Pinsel',
    fr: 'Pinceau',
    es: 'Pincel',
    it: 'Pennello',
    pt: 'Pincel',
    nl: 'Penseel',
    sv: 'Pensel',
    da: 'Pensel',
    no: 'Pensel',
    fi: 'Sivellin'
  },
  'palette': {
    en: 'Palette',
    de: 'Palette',
    fr: 'Palette',
    es: 'Paleta',
    it: 'Tavolozza',
    pt: 'Paleta',
    nl: 'Palet',
    sv: 'Palett',
    da: 'Palet',
    no: 'Palett',
    fi: 'Paletti'
  },
  'pen': {
    en: 'Pen',
    de: 'Kugelschreiber',
    fr: 'Stylo',
    es: 'Pluma',
    it: 'Penna',
    pt: 'Caneta',
    nl: 'Pen',
    sv: 'Penna',
    da: 'Kuglepen',
    no: 'Penn',
    fi: 'Kynä'
  },
  'pencil': {
    en: 'Pencil',
    de: 'Bleistift',
    fr: 'Crayon',
    es: 'Lápiz',
    it: 'Matita',
    pt: 'Lápis',
    nl: 'Potlood',
    sv: 'Blyertspenna',
    da: 'Blyant',
    no: 'Blyant',
    fi: 'Lyijykynä'
  },
  'push pin': {
    en: 'Push Pin',
    de: 'Reißzwecke',
    fr: 'Punaise',
    es: 'Chincheta',
    it: 'Puntina',
    pt: 'Percevejo',
    nl: 'Punaise',
    sv: 'Häftstift',
    da: 'Tegnestift',
    no: 'Tegnestift',
    fi: 'Nasta'
  },
  'ruler': {
    en: 'Ruler',
    de: 'Lineal',
    fr: 'Règle',
    es: 'Regla',
    it: 'Righello',
    pt: 'Régua',
    nl: 'Liniaal',
    sv: 'Linjal',
    da: 'Lineal',
    no: 'Linjal',
    fi: 'Viivoitin'
  },
  'scissors': {
    en: 'Scissors',
    de: 'Schere',
    fr: 'Ciseaux',
    es: 'Tijeras',
    it: 'Forbici',
    pt: 'Tesoura',
    nl: 'Schaar',
    sv: 'Sax',
    da: 'Saks',
    no: 'Saks',
    fi: 'Sakset'
  },
  'umbrella': {
    en: 'Umbrella',
    de: 'Regenschirm',
    fr: 'Parapluie',
    es: 'Paraguas',
    it: 'Ombrello',
    pt: 'Guarda-chuva',
    nl: 'Paraplu',
    sv: 'Paraply',
    da: 'Paraply',
    no: 'Paraply',
    fi: 'Sateenvarjo'
  },
  'umbrella 2': {
    en: 'Umbrella 2',
    de: 'Regenschirm 2',
    fr: 'Parapluie 2',
    es: 'Paraguas 2',
    it: 'Ombrello 2',
    pt: 'Guarda-chuva 2',
    nl: 'Paraplu 2',
    sv: 'Paraply 2',
    da: 'Paraply 2',
    no: 'Paraply 2',
    fi: 'Sateenvarjo 2'
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
  console.log('Image Import Script: Education BW');
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
