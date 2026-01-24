const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'home_bw_2',
  type: 'images',
  sourceFolderName: 'home bw 2',
  displayNames: {
    en: 'Home BW 2',
    de: 'Zuhause SW 2',
    fr: 'Maison NB 2',
    es: 'Hogar BN 2',
    it: 'Casa BN 2',
    pt: 'Casa PB 2',
    nl: 'Huis ZW 2',
    sv: 'Hem SV 2',
    da: 'Hjem SH 2',
    no: 'Hjem SH 2',
    fi: 'Koti MV 2'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'air conditioning': {
    en: 'Air Conditioning',
    de: 'Klimaanlage',
    fr: 'Climatisation',
    es: 'Aire acondicionado',
    it: 'Aria condizionata',
    pt: 'Ar-condicionado',
    nl: 'Airconditioning',
    sv: 'Luftkonditionering',
    da: 'Aircondition',
    no: 'Klimaanlegg',
    fi: 'Ilmastointi'
  },
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
  'broom': {
    en: 'Broom',
    de: 'Besen',
    fr: 'Balai',
    es: 'Escoba',
    it: 'Scopa',
    pt: 'Vassoura',
    nl: 'Bezem',
    sv: 'Kvast',
    da: 'Kost',
    no: 'Kost',
    fi: 'Luuta'
  },
  'bucket': {
    en: 'Bucket',
    de: 'Eimer',
    fr: 'Seau',
    es: 'Cubeta',
    it: 'Secchio',
    pt: 'Balde',
    nl: 'Emmer',
    sv: 'Hink',
    da: 'Spand',
    no: 'Bøtte',
    fi: 'Ämpäri'
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
  'fireplace': {
    en: 'Fireplace',
    de: 'Kamin',
    fr: 'Cheminée',
    es: 'Chimenea',
    it: 'Camino',
    pt: 'Lareira',
    nl: 'Open haard',
    sv: 'Öppen spis',
    da: 'Pejs',
    no: 'Peis',
    fi: 'Takka'
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
  'hanger': {
    en: 'Hanger',
    de: 'Kleiderbügel',
    fr: 'Cintre',
    es: 'Gancho',
    it: 'Gruccia',
    pt: 'Cabide',
    nl: 'Kleerhanger',
    sv: 'Galge',
    da: 'Bøjle',
    no: 'Kleshenger',
    fi: 'Vaateripustin'
  },
  'iron': {
    en: 'Iron',
    de: 'Bügeleisen',
    fr: 'Fer à repasser',
    es: 'Plancha',
    it: 'Ferro da stiro',
    pt: 'Ferro de passar',
    nl: 'Strijkijzer',
    sv: 'Strykjärn',
    da: 'Strygejern',
    no: 'Strykejern',
    fi: 'Silitysrauta'
  },
  'ironing board': {
    en: 'Ironing Board',
    de: 'Bügelbrett',
    fr: 'Planche à repasser',
    es: 'Tabla de planchar',
    it: 'Asse da stiro',
    pt: 'Tábua de passar',
    nl: 'Strijkplank',
    sv: 'Strykbräda',
    da: 'Strygebræt',
    no: 'Strykebrett',
    fi: 'Silitystauta'
  },
  'padlock': {
    en: 'Padlock',
    de: 'Vorhängeschloss',
    fr: 'Cadenas',
    es: 'Candado',
    it: 'Lucchetto',
    pt: 'Cadeado',
    nl: 'Hangslot',
    sv: 'Hänglås',
    da: 'Hængelås',
    no: 'Hengelås',
    fi: 'Riippulukko'
  },
  'paintbrush': {
    en: 'Paintbrush',
    de: 'Pinsel',
    fr: 'Pinceau',
    es: 'Brocha',
    it: 'Pennello',
    pt: 'Pincel',
    nl: 'Kwast',
    sv: 'Pensel',
    da: 'Pensel',
    no: 'Pensel',
    fi: 'Sivellin'
  },
  'paintbrush 2': {
    en: 'Paintbrush 2',
    de: 'Pinsel 2',
    fr: 'Pinceau 2',
    es: 'Brocha 2',
    it: 'Pennello 2',
    pt: 'Pincel 2',
    nl: 'Kwast 2',
    sv: 'Pensel 2',
    da: 'Pensel 2',
    no: 'Pensel 2',
    fi: 'Sivellin 2'
  },
  'picture frame': {
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
  'pillow': {
    en: 'Pillow',
    de: 'Kissen',
    fr: 'Oreiller',
    es: 'Almohada',
    it: 'Cuscino',
    pt: 'Travesseiro',
    nl: 'Kussen',
    sv: 'Kudde',
    da: 'Pude',
    no: 'Pute',
    fi: 'Tyyny'
  },
  'sewing machine': {
    en: 'Sewing Machine',
    de: 'Nähmaschine',
    fr: 'Machine à coudre',
    es: 'Máquina de coser',
    it: 'Macchina da cucire',
    pt: 'Máquina de costura',
    nl: 'Naaimachine',
    sv: 'Symaskin',
    da: 'Symaskine',
    no: 'Symaskin',
    fi: 'Ompelukone'
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
  'television': {
    en: 'Television',
    de: 'Fernseher',
    fr: 'Télévision',
    es: 'Televisión',
    it: 'Televisione',
    pt: 'Televisão',
    nl: 'Televisie',
    sv: 'TV',
    da: 'Fjernsyn',
    no: 'TV',
    fi: 'Televisio'
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
  'vacuum cleaner': {
    en: 'Vacuum Cleaner',
    de: 'Staubsauger',
    fr: 'Aspirateur',
    es: 'Aspiradora',
    it: 'Aspirapolvere',
    pt: 'Aspirador',
    nl: 'Stofzuiger',
    sv: 'Dammsugare',
    da: 'Støvsuger',
    no: 'Støvsuger',
    fi: 'Pölynimuri'
  },
  'wardrobe': {
    en: 'Wardrobe',
    de: 'Kleiderschrank',
    fr: 'Armoire',
    es: 'Ropero',
    it: 'Armadio',
    pt: 'Guarda-roupa',
    nl: 'Kledingkast',
    sv: 'Garderob',
    da: 'Garderobeskab',
    no: 'Garderobe',
    fi: 'Vaatekaappi'
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
  },
  'watering can': {
    en: 'Watering Can',
    de: 'Gießkanne',
    fr: 'Arrosoir',
    es: 'Regadera',
    it: 'Annaffiatoio',
    pt: 'Regador',
    nl: 'Gieter',
    sv: 'Vattenkanna',
    da: 'Vandkande',
    no: 'Vannkanne',
    fi: 'Kastelukannu'
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
  console.log('Image Import Script: Home BW 2');
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
