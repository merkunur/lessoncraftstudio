const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'kitchen_bw',
  type: 'images',
  sourceFolderName: 'kitchen bw',
  displayNames: {
    en: 'Kitchen BW',
    de: 'Küche SW',
    fr: 'Cuisine NB',
    es: 'Cocina BN',
    it: 'Cucina BN',
    pt: 'Cozinha PB',
    nl: 'Keuken ZW',
    sv: 'Kök SV',
    da: 'Køkken SH',
    no: 'Kjøkken SH',
    fi: 'Keittiö MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
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
  "chef's knife 2": {
    en: "Chef's Knife",
    de: 'Kochmesser',
    fr: 'Couteau de chef',
    es: 'Cuchillo de chef',
    it: 'Coltello da chef',
    pt: 'Faca de chef',
    nl: 'Koksmes',
    sv: 'Kockkniv',
    da: 'Kokkekniv',
    no: 'Kokkekniv',
    fi: 'Kokinveitsi'
  },
  'coffee carafe': {
    en: 'Coffee Carafe',
    de: 'Kaffeekanne',
    fr: 'Carafe à café',
    es: 'Jarra de café',
    it: 'Caraffa per caffè',
    pt: 'Jarra de café',
    nl: 'Koffiekan',
    sv: 'Kaffekanna',
    da: 'Kaffekande',
    no: 'Kaffekanne',
    fi: 'Kahvipannu'
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
  'electric kettle': {
    en: 'Electric Kettle',
    de: 'Wasserkocher',
    fr: 'Bouilloire électrique',
    es: 'Hervidor eléctrico',
    it: 'Bollitore elettrico',
    pt: 'Chaleira elétrica',
    nl: 'Waterkoker',
    sv: 'Vattenkokare',
    da: 'Elkedel',
    no: 'Vannkoker',
    fi: 'Vedenkeitin'
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
  'spatula 2': {
    en: 'Spatula 2',
    de: 'Pfannenwender 2',
    fr: 'Spatule 2',
    es: 'Espátula 2',
    it: 'Spatola 2',
    pt: 'Espátula 2',
    nl: 'Spatel 2',
    sv: 'Stekspade 2',
    da: 'Paletkniv 2',
    no: 'Stekespade 2',
    fi: 'Lasta 2'
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
  console.log('Image Import Script: Kitchen BW');
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
