const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'tools_bw',
  type: 'images',
  sourceFolderName: 'tools bw',
  displayNames: {
    en: 'Tools BW',
    de: 'Werkzeuge SW',
    fr: 'Outils NB',
    es: 'Herramientas BN',
    it: 'Attrezzi BN',
    pt: 'Ferramentas PB',
    nl: 'Gereedschap ZW',
    sv: 'Verktyg SV',
    da: 'Værktøj SH',
    no: 'Verktøy SH',
    fi: 'Työkalut MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'axe 2': {
    en: 'Axe 2',
    de: 'Axt 2',
    fr: 'Hache 2',
    es: 'Hacha 2',
    it: 'Ascia 2',
    pt: 'Machado 2',
    nl: 'Bijl 2',
    sv: 'Yxa 2',
    da: 'Økse 2',
    no: 'Øks 2',
    fi: 'Kirves 2'
  },
  'axe': {
    en: 'Axe',
    de: 'Axt',
    fr: 'Hache',
    es: 'Hacha',
    it: 'Ascia',
    pt: 'Machado',
    nl: 'Bijl',
    sv: 'Yxa',
    da: 'Økse',
    no: 'Øks',
    fi: 'Kirves'
  },
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
  'chainsaw': {
    en: 'Chainsaw',
    de: 'Kettensäge',
    fr: 'Tronçonneuse',
    es: 'Motosierra',
    it: 'Motosega',
    pt: 'Motosserra',
    nl: 'Kettingzaag',
    sv: 'Motorsåg',
    da: 'Motorsav',
    no: 'Motorsag',
    fi: 'Moottorisaha'
  },
  'double-ended wrench': {
    en: 'Double-Ended Wrench',
    de: 'Doppelmaulschlüssel',
    fr: 'Clé à deux bouts',
    es: 'Llave de dos bocas',
    it: 'Chiave a doppia estremità',
    pt: 'Chave de boca dupla',
    nl: 'Dubbelzijdige moersleutel',
    sv: 'Dubbelnyckel',
    da: 'Dobbeltnøgle',
    no: 'Dobbeltsidig nøkkel',
    fi: 'Kaksipääavain'
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
  'garden fork': {
    en: 'Garden Fork',
    de: 'Grabegabel',
    fr: 'Fourche de jardin',
    es: 'Horca de jardín',
    it: 'Forca da giardino',
    pt: 'Garfo de jardim',
    nl: 'Tuinvork',
    sv: 'Trädgårdsgrep',
    da: 'Havegreb',
    no: 'Hagegaffel',
    fi: 'Puutarhahanko'
  },
  'gloves': {
    en: 'Gloves',
    de: 'Handschuhe',
    fr: 'Gants',
    es: 'Guantes',
    it: 'Guanti',
    pt: 'Luvas',
    nl: 'Handschoenen',
    sv: 'Handskar',
    da: 'Handsker',
    no: 'Hansker',
    fi: 'Käsineet'
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
  'lawn mower': {
    en: 'Lawn Mower',
    de: 'Rasenmäher',
    fr: 'Tondeuse à gazon',
    es: 'Cortadora de césped',
    it: 'Tosaerba',
    pt: 'Cortador de grama',
    nl: 'Grasmaaier',
    sv: 'Gräsklippare',
    da: 'Græsslåmaskine',
    no: 'Gressklipper',
    fi: 'Ruohonleikkuri'
  },
  'paint roller': {
    en: 'Paint Roller',
    de: 'Farbroller',
    fr: 'Rouleau à peinture',
    es: 'Rodillo de pintura',
    it: 'Rullo per pittura',
    pt: 'Rolo de pintura',
    nl: 'Verfroller',
    sv: 'Målarrulle',
    da: 'Malerrulle',
    no: 'Malerull',
    fi: 'Maalitela'
  },
  'pickaxe': {
    en: 'Pickaxe',
    de: 'Spitzhacke',
    fr: 'Pioche',
    es: 'Pico',
    it: 'Piccone',
    pt: 'Picareta',
    nl: 'Houweel',
    sv: 'Hacka',
    da: 'Hakke',
    no: 'Hakke',
    fi: 'Hakku'
  },
  'pipe wrench': {
    en: 'Pipe Wrench',
    de: 'Rohrzange',
    fr: 'Clé à molette',
    es: 'Llave de tubo',
    it: 'Chiave per tubi',
    pt: 'Chave de grifo',
    nl: 'Pijptang',
    sv: 'Rörtång',
    da: 'Rørtang',
    no: 'Rørtang',
    fi: 'Putkipihdit'
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
  'pruning shears': {
    en: 'Pruning Shears',
    de: 'Gartenschere',
    fr: 'Sécateur',
    es: 'Tijeras de podar',
    it: 'Cesoie',
    pt: 'Tesoura de poda',
    nl: 'Snoeischaar',
    sv: 'Sekatör',
    da: 'Beskæresaks',
    no: 'Beskjæringssaks',
    fi: 'Oksasakset'
  },
  'rubber boot': {
    en: 'Rubber Boot',
    de: 'Gummistiefel',
    fr: 'Botte en caoutchouc',
    es: 'Bota de hule',
    it: 'Stivale di gomma',
    pt: 'Bota de borracha',
    nl: 'Rubberen laars',
    sv: 'Gummistövel',
    da: 'Gummistøvle',
    no: 'Gummistøvel',
    fi: 'Kumisaapas'
  },
  'screw': {
    en: 'Screw',
    de: 'Schraube',
    fr: 'Vis',
    es: 'Tornillo',
    it: 'Vite',
    pt: 'Parafuso',
    nl: 'Schroef',
    sv: 'Skruv',
    da: 'Skrue',
    no: 'Skrue',
    fi: 'Ruuvi'
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
  'shovel': {
    en: 'Shovel',
    de: 'Schaufel',
    fr: 'Pelle',
    es: 'Pala',
    it: 'Pala',
    pt: 'Pá',
    nl: 'Schep',
    sv: 'Spade',
    da: 'Skovl',
    no: 'Spade',
    fi: 'Lapio'
  },
  'sickle': {
    en: 'Sickle',
    de: 'Sichel',
    fr: 'Faucille',
    es: 'Hoz',
    it: 'Falce',
    pt: 'Foice',
    nl: 'Sikkel',
    sv: 'Skära',
    da: 'Segl',
    no: 'Sigd',
    fi: 'Sirppi'
  },
  'traffic cone': {
    en: 'Traffic Cone',
    de: 'Verkehrskegel',
    fr: 'Cône de signalisation',
    es: 'Cono de tráfico',
    it: 'Cono stradale',
    pt: 'Cone de trânsito',
    nl: 'Verkeerskegel',
    sv: 'Trafikkon',
    da: 'Trafikkegle',
    no: 'Trafikkjegle',
    fi: 'Liikennekartiо'
  },
  'trowel': {
    en: 'Trowel',
    de: 'Kelle',
    fr: 'Truelle',
    es: 'Paleta',
    it: 'Cazzuola',
    pt: 'Espátula',
    nl: 'Troffel',
    sv: 'Murslev',
    da: 'Murske',
    no: 'Murskje',
    fi: 'Laasti'
  },
  'wheelbarrow': {
    en: 'Wheelbarrow',
    de: 'Schubkarre',
    fr: 'Brouette',
    es: 'Carretilla',
    it: 'Carriola',
    pt: 'Carrinho de mão',
    nl: 'Kruiwagen',
    sv: 'Skottkärra',
    da: 'Trillebør',
    no: 'Trillebår',
    fi: 'Kottikärryt'
  },
  'wrench 2': {
    en: 'Wrench 2',
    de: 'Schraubenschlüssel 2',
    fr: 'Clé 2',
    es: 'Llave inglesa 2',
    it: 'Chiave inglese 2',
    pt: 'Chave inglesa 2',
    nl: 'Moersleutel 2',
    sv: 'Skiftnyckel 2',
    da: 'Skruenøgle 2',
    no: 'Skiftenøkkel 2',
    fi: 'Jakoavain 2'
  },
  'wrench': {
    en: 'Wrench',
    de: 'Schraubenschlüssel',
    fr: 'Clé',
    es: 'Llave inglesa',
    it: 'Chiave inglese',
    pt: 'Chave inglesa',
    nl: 'Moersleutel',
    sv: 'Skiftnyckel',
    da: 'Skruenøgle',
    no: 'Skiftenøkkel',
    fi: 'Jakoavain'
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
  console.log('Image Import Script: Tools BW');
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
