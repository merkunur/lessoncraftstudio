const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'kitchen_tools',
  type: 'images',
  sourceFolderName: 'kitchen tools',
  displayNames: {
    en: 'Kitchen Tools',
    de: 'Küchenwerkzeuge',
    fr: 'Ustensiles de cuisine',
    es: 'Utensilios de cocina',
    it: 'Utensili da cucina',
    pt: 'Utensílios de cozinha',
    nl: 'Keukengerei',
    sv: 'Köksredskap',
    da: 'Køkkenredskaber',
    no: 'Kjøkkenredskaper',
    fi: 'Keittiövälineet'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'apron': {
    en: 'Apron',
    de: 'Schürze',
    fr: 'Tablier',
    es: 'Delantal',
    it: 'Grembiule',
    pt: 'Avental',
    nl: 'Schort',
    sv: 'Förkläde',
    da: 'Forklæde',
    no: 'Forkle',
    fi: 'Esiliina'
  },
  'baking sheet': {
    en: 'Baking Sheet',
    de: 'Backblech',
    fr: 'Plaque de cuisson',
    es: 'Bandeja para hornear',
    it: 'Teglia da forno',
    pt: 'Assadeira',
    nl: 'Bakplaat',
    sv: 'Bakplåt',
    da: 'Bageplade',
    no: 'Stekeplate',
    fi: 'Uunipelti'
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
  'bottle': {
    en: 'Bottle',
    de: 'Flasche',
    fr: 'Bouteille',
    es: 'Botella',
    it: 'Bottiglia',
    pt: 'Garrafa',
    nl: 'Fles',
    sv: 'Flaska',
    da: 'Flaske',
    no: 'Flaske',
    fi: 'Pullo'
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
  'butter knife': {
    en: 'Butter Knife',
    de: 'Buttermesser',
    fr: 'Couteau à beurre',
    es: 'Cuchillo para mantequilla',
    it: 'Coltello da burro',
    pt: 'Faca de manteiga',
    nl: 'Botermes',
    sv: 'Smörkniv',
    da: 'Smørkniv',
    no: 'Smørkniv',
    fi: 'Voiveitsi'
  },
  'cake pan': {
    en: 'Cake Pan',
    de: 'Kuchenform',
    fr: 'Moule à gâteau',
    es: 'Molde para pastel',
    it: 'Tortiera',
    pt: 'Forma de bolo',
    nl: 'Taartvorm',
    sv: 'Kakform',
    da: 'Kageform',
    no: 'Kakeform',
    fi: 'Kakkuvuoka'
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
  'cookie cutter': {
    en: 'Cookie Cutter',
    de: 'Plätzchenausstecher',
    fr: 'Emporte-pièce',
    es: 'Cortador de galletas',
    it: 'Stampino per biscotti',
    pt: 'Cortador de biscoitos',
    nl: 'Koekjesvorm',
    sv: 'Pepparkaksform',
    da: 'Kageforme',
    no: 'Kakeutstikker',
    fi: 'Keksileikkuri'
  },
  'cookie sheet': {
    en: 'Cookie Sheet',
    de: 'Keksblech',
    fr: 'Plaque à biscuits',
    es: 'Bandeja para galletas',
    it: 'Teglia per biscotti',
    pt: 'Assadeira de biscoitos',
    nl: 'Koekjesplaat',
    sv: 'Kakplåt',
    da: 'Kageplade',
    no: 'Kakeplate',
    fi: 'Keksileivin'
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
  'cutting board': {
    en: 'Cutting Board',
    de: 'Schneidebrett',
    fr: 'Planche à découper',
    es: 'Tabla de cortar',
    it: 'Tagliere',
    pt: 'Tábua de cortar',
    nl: 'Snijplank',
    sv: 'Skärbräda',
    da: 'Skærebræt',
    no: 'Skjærebrett',
    fi: 'Leikkuulauta'
  },
  'fork': {
    en: 'Fork',
    de: 'Gabel',
    fr: 'Fourchette',
    es: 'Tenedor',
    it: 'Forchetta',
    pt: 'Garfo',
    nl: 'Vork',
    sv: 'Gaffel',
    da: 'Gaffel',
    no: 'Gaffel',
    fi: 'Haarukka'
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
  'glass': {
    en: 'Glass',
    de: 'Glas',
    fr: 'Verre',
    es: 'Vaso',
    it: 'Bicchiere',
    pt: 'Copo',
    nl: 'Glas',
    sv: 'Glas',
    da: 'Glas',
    no: 'Glass',
    fi: 'Lasi'
  },
  'grater': {
    en: 'Grater',
    de: 'Reibe',
    fr: 'Râpe',
    es: 'Rallador',
    it: 'Grattugia',
    pt: 'Ralador',
    nl: 'Rasp',
    sv: 'Rivjärn',
    da: 'Rivejern',
    no: 'Rivjern',
    fi: 'Raastin'
  },
  'jar': {
    en: 'Jar',
    de: 'Glas',
    fr: 'Bocal',
    es: 'Frasco',
    it: 'Barattolo',
    pt: 'Pote',
    nl: 'Pot',
    sv: 'Burk',
    da: 'Krukke',
    no: 'Krukke',
    fi: 'Purkki'
  },
  'jug': {
    en: 'Jug',
    de: 'Krug',
    fr: 'Cruche',
    es: 'Jarra',
    it: 'Brocca',
    pt: 'Jarra',
    nl: 'Kan',
    sv: 'Kanna',
    da: 'Kande',
    no: 'Mugge',
    fi: 'Kannu'
  },
  'kettle': {
    en: 'Kettle',
    de: 'Wasserkessel',
    fr: 'Bouilloire',
    es: 'Tetera',
    it: 'Bollitore',
    pt: 'Chaleira',
    nl: 'Ketel',
    sv: 'Vattenkokare',
    da: 'Kedel',
    no: 'Kjele',
    fi: 'Kattila'
  },
  'kitchen scale': {
    en: 'Kitchen Scale',
    de: 'Küchenwaage',
    fr: 'Balance de cuisine',
    es: 'Báscula de cocina',
    it: 'Bilancia da cucina',
    pt: 'Balança de cozinha',
    nl: 'Keukenweegschaal',
    sv: 'Köksvåg',
    da: 'Køkkenvægt',
    no: 'Kjøkkenvekt',
    fi: 'Keittiövaaka'
  },
  'knife': {
    en: 'Knife',
    de: 'Messer',
    fr: 'Couteau',
    es: 'Cuchillo',
    it: 'Coltello',
    pt: 'Faca',
    nl: 'Mes',
    sv: 'Kniv',
    da: 'Kniv',
    no: 'Kniv',
    fi: 'Veitsi'
  },
  'ladle': {
    en: 'Ladle',
    de: 'Schöpfkelle',
    fr: 'Louche',
    es: 'Cucharón',
    it: 'Mestolo',
    pt: 'Concha',
    nl: 'Soeplepel',
    sv: 'Slev',
    da: 'Øse',
    no: 'Øse',
    fi: 'Kauha'
  },
  'lid': {
    en: 'Lid',
    de: 'Deckel',
    fr: 'Couvercle',
    es: 'Tapa',
    it: 'Coperchio',
    pt: 'Tampa',
    nl: 'Deksel',
    sv: 'Lock',
    da: 'Låg',
    no: 'Lokk',
    fi: 'Kansi'
  },
  'measuring cup': {
    en: 'Measuring Cup',
    de: 'Messbecher',
    fr: 'Verre doseur',
    es: 'Taza medidora',
    it: 'Misurino',
    pt: 'Copo medidor',
    nl: 'Maatbeker',
    sv: 'Mätbägare',
    da: 'Målebæger',
    no: 'Målebeger',
    fi: 'Mittakannu'
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
  'mixer': {
    en: 'Mixer',
    de: 'Rührgerät',
    fr: 'Batteur',
    es: 'Batidora',
    it: 'Sbattitore',
    pt: 'Batedeira',
    nl: 'Mixer',
    sv: 'Elvisp',
    da: 'Røremaskine',
    no: 'Mikser',
    fi: 'Sähkövatkain'
  },
  'muffin tin': {
    en: 'Muffin Tin',
    de: 'Muffinform',
    fr: 'Moule à muffins',
    es: 'Molde para muffins',
    it: 'Stampo per muffin',
    pt: 'Forma de muffin',
    nl: 'Muffinvorm',
    sv: 'Muffinsform',
    da: 'Muffinform',
    no: 'Muffinsform',
    fi: 'Muffinivuoka'
  },
  'mug': {
    en: 'Mug',
    de: 'Becher',
    fr: 'Mug',
    es: 'Tarro',
    it: 'Tazza',
    pt: 'Caneca',
    nl: 'Mok',
    sv: 'Mugg',
    da: 'Krus',
    no: 'Krus',
    fi: 'Muki'
  },
  'oven mitt': {
    en: 'Oven Mitt',
    de: 'Ofenhandschuh',
    fr: 'Gant de cuisine',
    es: 'Guante de horno',
    it: 'Guanto da forno',
    pt: 'Luva de forno',
    nl: 'Ovenwant',
    sv: 'Grytlapp',
    da: 'Grillhandske',
    no: 'Gryteklut',
    fi: 'Patakinnas'
  },
  'oven': {
    en: 'Oven',
    de: 'Ofen',
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
  'pan': {
    en: 'Pan',
    de: 'Pfanne',
    fr: 'Poêle',
    es: 'Sartén',
    it: 'Padella',
    pt: 'Panela',
    nl: 'Pan',
    sv: 'Panna',
    da: 'Pande',
    no: 'Panne',
    fi: 'Pannu'
  },
  'peeler': {
    en: 'Peeler',
    de: 'Schäler',
    fr: 'Éplucheur',
    es: 'Pelador',
    it: 'Pelapatate',
    pt: 'Descascador',
    nl: 'Dunschiller',
    sv: 'Skalare',
    da: 'Skræller',
    no: 'Skrell',
    fi: 'Kuorimaveitsi'
  },
  'pitcher': {
    en: 'Pitcher',
    de: 'Kanne',
    fr: 'Pichet',
    es: 'Jarra',
    it: 'Caraffa',
    pt: 'Jarra',
    nl: 'Kan',
    sv: 'Kanna',
    da: 'Kande',
    no: 'Mugge',
    fi: 'Kannu'
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
  'rolling pin': {
    en: 'Rolling Pin',
    de: 'Nudelholz',
    fr: 'Rouleau à pâtisserie',
    es: 'Rodillo',
    it: 'Mattarello',
    pt: 'Rolo de massa',
    nl: 'Deegroller',
    sv: 'Kavel',
    da: 'Kagerulle',
    no: 'Kjevle',
    fi: 'Kaulin'
  },
  'salt shaker': {
    en: 'Salt Shaker',
    de: 'Salzstreuer',
    fr: 'Salière',
    es: 'Salero',
    it: 'Saliera',
    pt: 'Saleiro',
    nl: 'Zoutvaatje',
    sv: 'Saltströare',
    da: 'Saltbøsse',
    no: 'Saltbøsse',
    fi: 'Suolasirotin'
  },
  'saucepan': {
    en: 'Saucepan',
    de: 'Kochtopf',
    fr: 'Casserole',
    es: 'Cacerola',
    it: 'Casseruola',
    pt: 'Panela',
    nl: 'Steelpan',
    sv: 'Kastrull',
    da: 'Kasserolle',
    no: 'Kasserolle',
    fi: 'Kasari'
  },
  'spatula': {
    en: 'Spatula',
    de: 'Pfannenwender',
    fr: 'Spatule',
    es: 'Espátula',
    it: 'Spatola',
    pt: 'Espátula',
    nl: 'Spatel',
    sv: 'Stekspade',
    da: 'Paletkniv',
    no: 'Stekespade',
    fi: 'Lasta'
  },
  'sponge': {
    en: 'Sponge',
    de: 'Schwamm',
    fr: 'Éponge',
    es: 'Esponja',
    it: 'Spugna',
    pt: 'Esponja',
    nl: 'Spons',
    sv: 'Svamp',
    da: 'Svamp',
    no: 'Svamp',
    fi: 'Sieni'
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
  'teapot': {
    en: 'Teapot',
    de: 'Teekanne',
    fr: 'Théière',
    es: 'Tetera',
    it: 'Teiera',
    pt: 'Bule de chá',
    nl: 'Theepot',
    sv: 'Tekanna',
    da: 'Tekande',
    no: 'Tekanne',
    fi: 'Teekannu'
  },
  'timer': {
    en: 'Timer',
    de: 'Timer',
    fr: 'Minuteur',
    es: 'Temporizador',
    it: 'Timer',
    pt: 'Timer',
    nl: 'Timer',
    sv: 'Timer',
    da: 'Timer',
    no: 'Timer',
    fi: 'Ajastin'
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
    da: 'Toaster',
    no: 'Brødrister',
    fi: 'Leivänpaahdin'
  },
  'tongs': {
    en: 'Tongs',
    de: 'Zange',
    fr: 'Pince',
    es: 'Pinzas',
    it: 'Pinze',
    pt: 'Pinça',
    nl: 'Tang',
    sv: 'Tång',
    da: 'Tang',
    no: 'Tang',
    fi: 'Pihdit'
  },
  'whisk': {
    en: 'Whisk',
    de: 'Schneebesen',
    fr: 'Fouet',
    es: 'Batidor',
    it: 'Frusta',
    pt: 'Batedor',
    nl: 'Garde',
    sv: 'Visp',
    da: 'Piskeris',
    no: 'Visp',
    fi: 'Vispilä'
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
  console.log('Image Import Script: Kitchen Tools');
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
