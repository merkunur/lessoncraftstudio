const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'home_bw',
  type: 'images',
  sourceFolderName: 'home bw',
  displayNames: {
    en: 'Home BW',
    de: 'Zuhause SW',
    fr: 'Maison NB',
    es: 'Hogar BN',
    it: 'Casa BN',
    pt: 'Casa PB',
    nl: 'Huis ZW',
    sv: 'Hem SV',
    da: 'Hjem SH',
    no: 'Hjem SH',
    fi: 'Koti MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'alarm clock': {
    en: 'Alarm Clock',
    de: 'Wecker',
    fr: 'Réveil',
    es: 'Despertador',
    it: 'Sveglia',
    pt: 'Despertador',
    nl: 'Wekker',
    sv: 'Väckarklocka',
    da: 'Vækkeur',
    no: 'Vekkerklokke',
    fi: 'Herätyskello'
  },
  'alarm clock 2': {
    en: 'Alarm Clock 2',
    de: 'Wecker 2',
    fr: 'Réveil 2',
    es: 'Despertador 2',
    it: 'Sveglia 2',
    pt: 'Despertador 2',
    nl: 'Wekker 2',
    sv: 'Väckarklocka 2',
    da: 'Vækkeur 2',
    no: 'Vekkerklokke 2',
    fi: 'Herätyskello 2'
  },
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
  'bathtub': {
    en: 'Bathtub',
    de: 'Badewanne',
    fr: 'Baignoire',
    es: 'Tina',
    it: 'Vasca da bagno',
    pt: 'Banheira',
    nl: 'Badkuip',
    sv: 'Badkar',
    da: 'Badekar',
    no: 'Badekar',
    fi: 'Kylpyamme'
  },
  'blender': {
    en: 'Blender',
    de: 'Mixer',
    fr: 'Mixeur',
    es: 'Licuadora',
    it: 'Frullatore',
    pt: 'Liquidificador',
    nl: 'Blender',
    sv: 'Mixer',
    da: 'Blender',
    no: 'Blender',
    fi: 'Tehosekoitin'
  },
  'cactus': {
    en: 'Cactus',
    de: 'Kaktus',
    fr: 'Cactus',
    es: 'Cactus',
    it: 'Cactus',
    pt: 'Cacto',
    nl: 'Cactus',
    sv: 'Kaktus',
    da: 'Kaktus',
    no: 'Kaktus',
    fi: 'Kaktus'
  },
  'calendar': {
    en: 'Calendar',
    de: 'Kalender',
    fr: 'Calendrier',
    es: 'Calendario',
    it: 'Calendario',
    pt: 'Calendário',
    nl: 'Kalender',
    sv: 'Kalender',
    da: 'Kalender',
    no: 'Kalender',
    fi: 'Kalenteri'
  },
  'chandelier': {
    en: 'Chandelier',
    de: 'Kronleuchter',
    fr: 'Lustre',
    es: 'Candelabro',
    it: 'Lampadario',
    pt: 'Lustre',
    nl: 'Kroonluchter',
    sv: 'Kristallkrona',
    da: 'Lysekrone',
    no: 'Lysekrone',
    fi: 'Kattokruunu'
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
  'colander': {
    en: 'Colander',
    de: 'Sieb',
    fr: 'Passoire',
    es: 'Colador',
    it: 'Scolapasta',
    pt: 'Escorredor',
    nl: 'Vergiet',
    sv: 'Durkslag',
    da: 'Dørslag',
    no: 'Dørslag',
    fi: 'Siivilä'
  },
  'cuckoo clock': {
    en: 'Cuckoo Clock',
    de: 'Kuckucksuhr',
    fr: 'Horloge à coucou',
    es: 'Reloj cucú',
    it: 'Orologio a cucù',
    pt: 'Relógio cuco',
    nl: 'Koekoeksklok',
    sv: 'Gökur',
    da: 'Kukur',
    no: 'Gjøkur',
    fi: 'Käkikello'
  },
  'cup': {
    en: 'Cup',
    de: 'Tasse',
    fr: 'Tasse',
    es: 'Taza',
    it: 'Tazza',
    pt: 'Xícara',
    nl: 'Kopje',
    sv: 'Kopp',
    da: 'Kop',
    no: 'Kopp',
    fi: 'Kuppi'
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
  'espresso machine': {
    en: 'Espresso Machine',
    de: 'Espressomaschine',
    fr: 'Machine à expresso',
    es: 'Máquina de café',
    it: 'Macchina per espresso',
    pt: 'Máquina de café',
    nl: 'Espressomachine',
    sv: 'Espressomaskin',
    da: 'Espressomaskine',
    no: 'Espressomaskin',
    fi: 'Espressokone'
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
  'fishbowl': {
    en: 'Fishbowl',
    de: 'Goldfischglas',
    fr: 'Bocal à poissons',
    es: 'Pecera',
    it: 'Boccia per pesci',
    pt: 'Aquário',
    nl: 'Vissenkom',
    sv: 'Fiskakvarium',
    da: 'Akvarium',
    no: 'Gullfiskbolle',
    fi: 'Kala-akvaario'
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
  'frying pan': {
    en: 'Frying Pan',
    de: 'Bratpfanne',
    fr: 'Poêle à frire',
    es: 'Sartén',
    it: 'Padella',
    pt: 'Frigideira',
    nl: 'Koekenpan',
    sv: 'Stekpanna',
    da: 'Stegepande',
    no: 'Stekepanne',
    fi: 'Paistinpannu'
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
  'mixer': {
    en: 'Mixer',
    de: 'Rührgerät',
    fr: 'Batteur',
    es: 'Batidora',
    it: 'Sbattitore',
    pt: 'Batedeira',
    nl: 'Mixer',
    sv: 'Elvisp',
    da: 'Håndmixer',
    no: 'Mikser',
    fi: 'Sähkövatkain'
  },
  'mortar': {
    en: 'Mortar and Pestle',
    de: 'Mörser',
    fr: 'Mortier et pilon',
    es: 'Molcajete',
    it: 'Mortaio',
    pt: 'Pilão',
    nl: 'Vijzel',
    sv: 'Mortel',
    da: 'Morter',
    no: 'Morter',
    fi: 'Huhmare'
  },
  'microwave': {
    en: 'Microwave',
    de: 'Mikrowelle',
    fr: 'Micro-ondes',
    es: 'Microondas',
    it: 'Microonde',
    pt: 'Micro-ondas',
    nl: 'Magnetron',
    sv: 'Mikrovågsugn',
    da: 'Mikroovn',
    no: 'Mikrobølgeovn',
    fi: 'Mikroaaltouuni'
  },
  'oven': {
    en: 'Oven',
    de: 'Backofen',
    fr: 'Four',
    es: 'Horno',
    it: 'Forno',
    pt: 'Forno',
    nl: 'Oven',
    sv: 'Ugn',
    da: 'Ovn',
    no: 'Ovn',
    fi: 'Uuni'
  },
  'pot': {
    en: 'Pot',
    de: 'Topf',
    fr: 'Marmite',
    es: 'Olla',
    it: 'Pentola',
    pt: 'Panela',
    nl: 'Pot',
    sv: 'Gryta',
    da: 'Gryde',
    no: 'Gryte',
    fi: 'Kattila'
  },
  'refrigerator': {
    en: 'Refrigerator',
    de: 'Kühlschrank',
    fr: 'Réfrigérateur',
    es: 'Refrigerador',
    it: 'Frigorifero',
    pt: 'Geladeira',
    nl: 'Koelkast',
    sv: 'Kylskåp',
    da: 'Køleskab',
    no: 'Kjøleskap',
    fi: 'Jääkaappi'
  },
  'rocking chair': {
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
  'speaker': {
    en: 'Speaker',
    de: 'Lautsprecher',
    fr: 'Haut-parleur',
    es: 'Bocina',
    it: 'Altoparlante',
    pt: 'Caixa de som',
    nl: 'Luidspreker',
    sv: 'Högtalare',
    da: 'Højttaler',
    no: 'Høyttaler',
    fi: 'Kaiutin'
  },
  'teapot': {
    en: 'Teapot',
    de: 'Teekanne',
    fr: 'Théière',
    es: 'Tetera',
    it: 'Teiera',
    pt: 'Bule',
    nl: 'Theepot',
    sv: 'Tekanna',
    da: 'Tekande',
    no: 'Tekanne',
    fi: 'Teekannu'
  },
  'toaster': {
    en: 'Toaster',
    de: 'Toaster',
    fr: 'Grille-pain',
    es: 'Tostador',
    it: 'Tostapane',
    pt: 'Torradeira',
    nl: 'Broodrooster',
    sv: 'Brödrost',
    da: 'Brødrister',
    no: 'Brødrister',
    fi: 'Leivänpaahdin'
  },
  'washing machine': {
    en: 'Washing Machine',
    de: 'Waschmaschine',
    fr: 'Machine à laver',
    es: 'Lavadora',
    it: 'Lavatrice',
    pt: 'Máquina de lavar',
    nl: 'Wasmachine',
    sv: 'Tvättmaskin',
    da: 'Vaskemaskine',
    no: 'Vaskemaskin',
    fi: 'Pesukone'
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
  console.log('Image Import Script: Home BW');
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
