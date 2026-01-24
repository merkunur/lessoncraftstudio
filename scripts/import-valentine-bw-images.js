const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'valentine_bw',
  type: 'images',
  sourceFolderName: 'valentine bw',
  displayNames: {
    en: 'Valentine BW',
    de: 'Valentinstag SW',
    fr: 'Saint-Valentin NB',
    es: 'San Valentín BN',
    it: 'San Valentino BN',
    pt: 'Dia dos Namorados PB',
    nl: 'Valentijnsdag ZW',
    sv: 'Alla hjärtans dag SV',
    da: 'Valentinsdag SH',
    no: 'Valentinsdag SH',
    fi: 'Ystävänpäivä MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'angel': {
    en: 'Angel',
    de: 'Engel',
    fr: 'Ange',
    es: 'Ángel',
    it: 'Angelo',
    pt: 'Anjo',
    nl: 'Engel',
    sv: 'Ängel',
    da: 'Engel',
    no: 'Engel',
    fi: 'Enkeli'
  },
  'balloon': {
    en: 'Balloon',
    de: 'Ballon',
    fr: 'Ballon',
    es: 'Globo',
    it: 'Palloncino',
    pt: 'Balão',
    nl: 'Ballon',
    sv: 'Ballong',
    da: 'Ballon',
    no: 'Ballong',
    fi: 'Ilmapallo'
  },
  'cake': {
    en: 'Cake',
    de: 'Kuchen',
    fr: 'Gâteau',
    es: 'Pastel',
    it: 'Torta',
    pt: 'Bolo',
    nl: 'Taart',
    sv: 'Tårta',
    da: 'Kage',
    no: 'Kake',
    fi: 'Kakku'
  },
  'candle': {
    en: 'Candle',
    de: 'Kerze',
    fr: 'Bougie',
    es: 'Vela',
    it: 'Candela',
    pt: 'Vela',
    nl: 'Kaars',
    sv: 'Ljus',
    da: 'Stearinlys',
    no: 'Stearinlys',
    fi: 'Kynttilä'
  },
  'candy': {
    en: 'Candy',
    de: 'Süßigkeiten',
    fr: 'Bonbon',
    es: 'Dulce',
    it: 'Caramella',
    pt: 'Doce',
    nl: 'Snoep',
    sv: 'Godis',
    da: 'Slik',
    no: 'Godteri',
    fi: 'Karkki'
  },
  'card': {
    en: 'Card',
    de: 'Karte',
    fr: 'Carte',
    es: 'Tarjeta',
    it: 'Biglietto',
    pt: 'Cartão',
    nl: 'Kaart',
    sv: 'Kort',
    da: 'Kort',
    no: 'Kort',
    fi: 'Kortti'
  },
  'coffee mug': {
    en: 'Coffee Mug',
    de: 'Kaffeetasse',
    fr: 'Tasse à café',
    es: 'Taza de café',
    it: 'Tazza da caffè',
    pt: 'Caneca de café',
    nl: 'Koffiemok',
    sv: 'Kaffemugg',
    da: 'Kaffekrus',
    no: 'Kaffekopp',
    fi: 'Kahvimuki'
  },
  'conversation': {
    en: 'Conversation Heart',
    de: 'Gesprächsherz',
    fr: 'Cœur de conversation',
    es: 'Corazón de conversación',
    it: 'Cuore con messaggio',
    pt: 'Coração com mensagem',
    nl: 'Conversatiehart',
    sv: 'Samtalshjärta',
    da: 'Samtalehjerte',
    no: 'Samtalehjerte',
    fi: 'Keskustelusydän'
  },
  'cupcake': {
    en: 'Cupcake',
    de: 'Cupcake',
    fr: 'Cupcake',
    es: 'Cupcake',
    it: 'Cupcake',
    pt: 'Cupcake',
    nl: 'Cupcake',
    sv: 'Cupcake',
    da: 'Cupcake',
    no: 'Cupcake',
    fi: 'Kuppikakku'
  },
  'gift box 2': {
    en: 'Gift Box',
    de: 'Geschenkbox',
    fr: 'Boîte cadeau',
    es: 'Caja de regalo',
    it: 'Scatola regalo',
    pt: 'Caixa de presente',
    nl: 'Geschenkdoos',
    sv: 'Presentask',
    da: 'Gaveæske',
    no: 'Gaveeske',
    fi: 'Lahjapaketti'
  },
  'gift box': {
    en: 'Gift Box',
    de: 'Geschenkbox',
    fr: 'Boîte cadeau',
    es: 'Caja de regalo',
    it: 'Scatola regalo',
    pt: 'Caixa de presente',
    nl: 'Geschenkdoos',
    sv: 'Presentask',
    da: 'Gaveæske',
    no: 'Gaveeske',
    fi: 'Lahjapaketti'
  },
  'greeting card': {
    en: 'Greeting Card',
    de: 'Grußkarte',
    fr: 'Carte de vœux',
    es: 'Tarjeta de felicitación',
    it: 'Biglietto di auguri',
    pt: 'Cartão de felicitações',
    nl: 'Wenskaart',
    sv: 'Gratulationskort',
    da: 'Lykønskningskort',
    no: 'Gratulasjonskort',
    fi: 'Onnittelukortti'
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
  'key': {
    en: 'Key',
    de: 'Schlüssel',
    fr: 'Clé',
    es: 'Llave',
    it: 'Chiave',
    pt: 'Chave',
    nl: 'Sleutel',
    sv: 'Nyckel',
    da: 'Nøgle',
    no: 'Nøkkel',
    fi: 'Avain'
  },
  'note': {
    en: 'Love Note',
    de: 'Liebesbrief',
    fr: 'Billet doux',
    es: 'Nota de amor',
    it: 'Biglietto d\'amore',
    pt: 'Bilhete de amor',
    nl: 'Liefdesbrief',
    sv: 'Kärleksbrev',
    da: 'Kærlighedsbrev',
    no: 'Kjærlighetsbrev',
    fi: 'Rakkauskirje'
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
  'page': {
    en: 'Love Letter',
    de: 'Liebesbrief',
    fr: 'Lettre d\'amour',
    es: 'Carta de amor',
    it: 'Lettera d\'amore',
    pt: 'Carta de amor',
    nl: 'Liefdesbrief',
    sv: 'Kärleksbrev',
    da: 'Kærlighedsbrev',
    no: 'Kjærlighetsbrev',
    fi: 'Rakkauskirje'
  },
  'ring': {
    en: 'Ring',
    de: 'Ring',
    fr: 'Bague',
    es: 'Anillo',
    it: 'Anello',
    pt: 'Anel',
    nl: 'Ring',
    sv: 'Ring',
    da: 'Ring',
    no: 'Ring',
    fi: 'Sormus'
  },
  'shopping bag': {
    en: 'Shopping Bag',
    de: 'Einkaufstasche',
    fr: 'Sac de courses',
    es: 'Bolsa de compras',
    it: 'Borsa della spesa',
    pt: 'Sacola de compras',
    nl: 'Boodschappentas',
    sv: 'Shoppingväska',
    da: 'Indkøbspose',
    no: 'Handlepose',
    fi: 'Ostoskassi'
  },
  'teddy bear': {
    en: 'Teddy Bear',
    de: 'Teddybär',
    fr: 'Ours en peluche',
    es: 'Oso de peluche',
    it: 'Orsacchiotto',
    pt: 'Ursinho de pelúcia',
    nl: 'Teddybeer',
    sv: 'Nallebjörn',
    da: 'Bamse',
    no: 'Teddybjørn',
    fi: 'Nalle'
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
  console.log('Image Import Script: Valentine BW');
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
    // Handle filenames with trailing spaces like "teddy bear .png"
    const lookupKey = baseName.toLowerCase().trim();

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
