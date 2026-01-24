const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'home_and_nature_bw',
  type: 'images',
  sourceFolderName: 'home and nature bw',
  displayNames: {
    en: 'Home and Nature BW',
    de: 'Haus und Natur SW',
    fr: 'Maison et Nature NB',
    es: 'Hogar y Naturaleza BN',
    it: 'Casa e Natura BN',
    pt: 'Casa e Natureza PB',
    nl: 'Huis en Natuur ZW',
    sv: 'Hem och Natur SV',
    da: 'Hjem og Natur SH',
    no: 'Hjem og Natur SH',
    fi: 'Koti ja Luonto MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'boombox': {
    en: 'Boombox',
    de: 'Ghettoblaster',
    fr: 'Radiocassette',
    es: 'Radiograbadora',
    it: 'Stereo portatile',
    pt: 'Rádio portátil',
    nl: 'Ghettoblaster',
    sv: 'Bärbar stereo',
    da: 'Ghettoblaster',
    no: 'Ghettoblaster',
    fi: 'Mankka'
  },
  'bowl': {
    en: 'Bowl',
    de: 'Schüssel',
    fr: 'Bol',
    es: 'Tazón',
    it: 'Ciotola',
    pt: 'Tigela',
    nl: 'Kom',
    sv: 'Skål',
    da: 'Skål',
    no: 'Bolle',
    fi: 'Kulho'
  },
  'bulb': {
    en: 'Light Bulb',
    de: 'Glühbirne',
    fr: 'Ampoule',
    es: 'Foco',
    it: 'Lampadina',
    pt: 'Lâmpada',
    nl: 'Gloeilamp',
    sv: 'Glödlampa',
    da: 'Pære',
    no: 'Lyspære',
    fi: 'Hehkulamppu'
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
  'cloud': {
    en: 'Cloud',
    de: 'Wolke',
    fr: 'Nuage',
    es: 'Nube',
    it: 'Nuvola',
    pt: 'Nuvem',
    nl: 'Wolk',
    sv: 'Moln',
    da: 'Sky',
    no: 'Sky',
    fi: 'Pilvi'
  },
  'desk lamp': {
    en: 'Desk Lamp',
    de: 'Schreibtischlampe',
    fr: 'Lampe de bureau',
    es: 'Lámpara de escritorio',
    it: 'Lampada da scrivania',
    pt: 'Luminária de mesa',
    nl: 'Bureaulamp',
    sv: 'Skrivbordslampa',
    da: 'Skrivebordslampe',
    no: 'Skrivebordslampe',
    fi: 'Työpöytälamppu'
  },
  'door': {
    en: 'Door',
    de: 'Tür',
    fr: 'Porte',
    es: 'Puerta',
    it: 'Porta',
    pt: 'Porta',
    nl: 'Deur',
    sv: 'Dörr',
    da: 'Dør',
    no: 'Dør',
    fi: 'Ovi'
  },
  'dress': {
    en: 'Dress',
    de: 'Kleid',
    fr: 'Robe',
    es: 'Vestido',
    it: 'Vestito',
    pt: 'Vestido',
    nl: 'Jurk',
    sv: 'Klänning',
    da: 'Kjole',
    no: 'Kjole',
    fi: 'Mekko'
  },
  'fan': {
    en: 'Fan',
    de: 'Ventilator',
    fr: 'Ventilateur',
    es: 'Ventilador',
    it: 'Ventilatore',
    pt: 'Ventilador',
    nl: 'Ventilator',
    sv: 'Fläkt',
    da: 'Ventilator',
    no: 'Vifte',
    fi: 'Tuuletin'
  },
  'flower': {
    en: 'Flower',
    de: 'Blume',
    fr: 'Fleur',
    es: 'Flor',
    it: 'Fiore',
    pt: 'Flor',
    nl: 'Bloem',
    sv: 'Blomma',
    da: 'Blomst',
    no: 'Blomst',
    fi: 'Kukka'
  },
  'frame': {
    en: 'Picture Frame',
    de: 'Bilderrahmen',
    fr: 'Cadre photo',
    es: 'Marco',
    it: 'Cornice',
    pt: 'Porta-retrato',
    nl: 'Fotolijst',
    sv: 'Bildram',
    da: 'Billedramme',
    no: 'Bilderamme',
    fi: 'Kehys'
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
  'nest': {
    en: 'Nest',
    de: 'Nest',
    fr: 'Nid',
    es: 'Nido',
    it: 'Nido',
    pt: 'Ninho',
    nl: 'Nest',
    sv: 'Bo',
    da: 'Rede',
    no: 'Rede',
    fi: 'Pesä'
  },
  'plant': {
    en: 'Plant',
    de: 'Pflanze',
    fr: 'Plante',
    es: 'Planta',
    it: 'Pianta',
    pt: 'Planta',
    nl: 'Plant',
    sv: 'Växt',
    da: 'Plante',
    no: 'Plante',
    fi: 'Kasvi'
  },
  'plate': {
    en: 'Plate',
    de: 'Teller',
    fr: 'Assiette',
    es: 'Plato',
    it: 'Piatto',
    pt: 'Prato',
    nl: 'Bord',
    sv: 'Tallrik',
    da: 'Tallerken',
    no: 'Tallerken',
    fi: 'Lautanen'
  },
  'saucepan': {
    en: 'Saucepan',
    de: 'Kochtopf',
    fr: 'Casserole',
    es: 'Cacerola',
    it: 'Pentola',
    pt: 'Panela',
    nl: 'Steelpan',
    sv: 'Kastrull',
    da: 'Kasserolle',
    no: 'Kasserolle',
    fi: 'Kattila'
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
  'spoon': {
    en: 'Spoon',
    de: 'Löffel',
    fr: 'Cuillère',
    es: 'Cuchara',
    it: 'Cucchiaio',
    pt: 'Colher',
    nl: 'Lepel',
    sv: 'Sked',
    da: 'Ske',
    no: 'Skje',
    fi: 'Lusikka'
  },
  'table lamp': {
    en: 'Table Lamp',
    de: 'Tischlampe',
    fr: 'Lampe de table',
    es: 'Lámpara de mesa',
    it: 'Lampada da tavolo',
    pt: 'Abajur',
    nl: 'Tafellamp',
    sv: 'Bordslampa',
    da: 'Bordlampe',
    no: 'Bordlampe',
    fi: 'Pöytälamppu'
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
  },
  'teacup': {
    en: 'Teacup',
    de: 'Teetasse',
    fr: 'Tasse à thé',
    es: 'Taza de té',
    it: 'Tazza da tè',
    pt: 'Xícara de chá',
    nl: 'Theekopje',
    sv: 'Tekopp',
    da: 'Tekop',
    no: 'Tekopp',
    fi: 'Teekuppi'
  },
  'trash can': {
    en: 'Trash Can',
    de: 'Mülleimer',
    fr: 'Poubelle',
    es: 'Bote de basura',
    it: 'Cestino',
    pt: 'Lixeira',
    nl: 'Prullenbak',
    sv: 'Soptunna',
    da: 'Skraldespand',
    no: 'Søppelbøtte',
    fi: 'Roskakori'
  },
  'tree': {
    en: 'Tree',
    de: 'Baum',
    fr: 'Arbre',
    es: 'Árbol',
    it: 'Albero',
    pt: 'Árvore',
    nl: 'Boom',
    sv: 'Träd',
    da: 'Træ',
    no: 'Tre',
    fi: 'Puu'
  },
  'tree 2': {
    en: 'Tree 2',
    de: 'Baum 2',
    fr: 'Arbre 2',
    es: 'Árbol 2',
    it: 'Albero 2',
    pt: 'Árvore 2',
    nl: 'Boom 2',
    sv: 'Träd 2',
    da: 'Træ 2',
    no: 'Tre 2',
    fi: 'Puu 2'
  },
  'tree 3': {
    en: 'Tree 3',
    de: 'Baum 3',
    fr: 'Arbre 3',
    es: 'Árbol 3',
    it: 'Albero 3',
    pt: 'Árvore 3',
    nl: 'Boom 3',
    sv: 'Träd 3',
    da: 'Træ 3',
    no: 'Tre 3',
    fi: 'Puu 3'
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
  console.log('Image Import Script: Home and Nature BW');
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
