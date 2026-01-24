const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'spring',
  type: 'images',
  sourceFolderName: 'spring',
  displayNames: {
    en: 'Spring',
    de: 'Frühling',
    fr: 'Printemps',
    es: 'Primavera',
    it: 'Primavera',
    pt: 'Primavera',
    nl: 'Lente',
    sv: 'Vår',
    da: 'Forår',
    no: 'Vår',
    fi: 'Kevät'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'bee': {
    en: 'Bee',
    de: 'Biene',
    fr: 'Abeille',
    es: 'Abeja',
    it: 'Ape',
    pt: 'Abelha',
    nl: 'Bij',
    sv: 'Bi',
    da: 'Bi',
    no: 'Bie',
    fi: 'Mehiläinen'
  },
  'bicycle': {
    en: 'Bicycle',
    de: 'Fahrrad',
    fr: 'Vélo',
    es: 'Bicicleta',
    it: 'Bicicletta',
    pt: 'Bicicleta',
    nl: 'Fiets',
    sv: 'Cykel',
    da: 'Cykel',
    no: 'Sykkel',
    fi: 'Polkupyörä'
  },
  'bird': {
    en: 'Bird',
    de: 'Vogel',
    fr: 'Oiseau',
    es: 'Pájaro',
    it: 'Uccello',
    pt: 'Pássaro',
    nl: 'Vogel',
    sv: 'Fågel',
    da: 'Fugl',
    no: 'Fugl',
    fi: 'Lintu'
  },
  'birdhouse': {
    en: 'Birdhouse',
    de: 'Vogelhaus',
    fr: 'Nichoir',
    es: 'Casa para pájaros',
    it: 'Casetta per uccelli',
    pt: 'Casa de passarinho',
    nl: 'Vogelhuisje',
    sv: 'Fågelholk',
    da: 'Fuglehus',
    no: 'Fuglekasse',
    fi: 'Linnunpönttö'
  },
  'bud': {
    en: 'Bud',
    de: 'Knospe',
    fr: 'Bourgeon',
    es: 'Brote',
    it: 'Bocciolo',
    pt: 'Botão',
    nl: 'Knop',
    sv: 'Knopp',
    da: 'Knop',
    no: 'Knopp',
    fi: 'Silmu'
  },
  'bunny': {
    en: 'Bunny',
    de: 'Häschen',
    fr: 'Lapin',
    es: 'Conejito',
    it: 'Coniglietto',
    pt: 'Coelhinho',
    nl: 'Konijntje',
    sv: 'Kanin',
    da: 'Kanin',
    no: 'Kanin',
    fi: 'Pupu'
  },
  'butterfly': {
    en: 'Butterfly',
    de: 'Schmetterling',
    fr: 'Papillon',
    es: 'Mariposa',
    it: 'Farfalla',
    pt: 'Borboleta',
    nl: 'Vlinder',
    sv: 'Fjäril',
    da: 'Sommerfugl',
    no: 'Sommerfugl',
    fi: 'Perhonen'
  },
  'caterpillar': {
    en: 'Caterpillar',
    de: 'Raupe',
    fr: 'Chenille',
    es: 'Oruga',
    it: 'Bruco',
    pt: 'Lagarta',
    nl: 'Rups',
    sv: 'Larv',
    da: 'Larve',
    no: 'Larve',
    fi: 'Toukka'
  },
  'chick': {
    en: 'Chick',
    de: 'Küken',
    fr: 'Poussin',
    es: 'Pollito',
    it: 'Pulcino',
    pt: 'Pintinho',
    nl: 'Kuiken',
    sv: 'Kyckling',
    da: 'Kylling',
    no: 'Kylling',
    fi: 'Tipu'
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
  'duckling': {
    en: 'Duckling',
    de: 'Entchen',
    fr: 'Caneton',
    es: 'Patito',
    it: 'Anatroccolo',
    pt: 'Patinho',
    nl: 'Eendje',
    sv: 'Ankunge',
    da: 'Ælling',
    no: 'Andunge',
    fi: 'Ankanpoikanen'
  },
  'easter egg': {
    en: 'Easter Egg',
    de: 'Osterei',
    fr: 'Œuf de Pâques',
    es: 'Huevo de Pascua',
    it: 'Uovo di Pasqua',
    pt: 'Ovo de Páscoa',
    nl: 'Paasei',
    sv: 'Påskägg',
    da: 'Påskeæg',
    no: 'Påskeegg',
    fi: 'Pääsiäismuna'
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
  'frog': {
    en: 'Frog',
    de: 'Frosch',
    fr: 'Grenouille',
    es: 'Rana',
    it: 'Rana',
    pt: 'Sapo',
    nl: 'Kikker',
    sv: 'Groda',
    da: 'Frø',
    no: 'Frosk',
    fi: 'Sammakko'
  },
  'garden': {
    en: 'Garden',
    de: 'Garten',
    fr: 'Jardin',
    es: 'Jardín',
    it: 'Giardino',
    pt: 'Jardim',
    nl: 'Tuin',
    sv: 'Trädgård',
    da: 'Have',
    no: 'Hage',
    fi: 'Puutarha'
  },
  'grass': {
    en: 'Grass',
    de: 'Gras',
    fr: 'Herbe',
    es: 'Pasto',
    it: 'Erba',
    pt: 'Grama',
    nl: 'Gras',
    sv: 'Gräs',
    da: 'Græs',
    no: 'Gress',
    fi: 'Ruoho'
  },
  'kite': {
    en: 'Kite',
    de: 'Drachen',
    fr: 'Cerf-volant',
    es: 'Papalote',
    it: 'Aquilone',
    pt: 'Pipa',
    nl: 'Vlieger',
    sv: 'Drake',
    da: 'Drage',
    no: 'Drage',
    fi: 'Leija'
  },
  'lamb': {
    en: 'Lamb',
    de: 'Lamm',
    fr: 'Agneau',
    es: 'Cordero',
    it: 'Agnello',
    pt: 'Cordeiro',
    nl: 'Lam',
    sv: 'Lamm',
    da: 'Lam',
    no: 'Lam',
    fi: 'Karitsa'
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
    no: 'Reir',
    fi: 'Pesä'
  },
  'puddle': {
    en: 'Puddle',
    de: 'Pfütze',
    fr: 'Flaque',
    es: 'Charco',
    it: 'Pozzanghera',
    pt: 'Poça',
    nl: 'Plas',
    sv: 'Pöl',
    da: 'Vandpyt',
    no: 'Sølepytt',
    fi: 'Lätäkkö'
  },
  'rain boots': {
    en: 'Rain Boots',
    de: 'Gummistiefel',
    fr: 'Bottes de pluie',
    es: 'Botas de lluvia',
    it: 'Stivali da pioggia',
    pt: 'Galochas',
    nl: 'Regenlaarzen',
    sv: 'Gummistövlar',
    da: 'Gummistøvler',
    no: 'Gummistøvler',
    fi: 'Kumisaappaat'
  },
  'rain': {
    en: 'Rain',
    de: 'Regen',
    fr: 'Pluie',
    es: 'Lluvia',
    it: 'Pioggia',
    pt: 'Chuva',
    nl: 'Regen',
    sv: 'Regn',
    da: 'Regn',
    no: 'Regn',
    fi: 'Sade'
  },
  'rainbow': {
    en: 'Rainbow',
    de: 'Regenbogen',
    fr: 'Arc-en-ciel',
    es: 'Arcoíris',
    it: 'Arcobaleno',
    pt: 'Arco-íris',
    nl: 'Regenboog',
    sv: 'Regnbåge',
    da: 'Regnbue',
    no: 'Regnbue',
    fi: 'Sateenkaari'
  },
  'raincoat': {
    en: 'Raincoat',
    de: 'Regenmantel',
    fr: 'Imperméable',
    es: 'Impermeable',
    it: 'Impermeabile',
    pt: 'Capa de chuva',
    nl: 'Regenjas',
    sv: 'Regnrock',
    da: 'Regnfrakke',
    no: 'Regnfrakk',
    fi: 'Sadetakki'
  },
  'robin': {
    en: 'Robin',
    de: 'Rotkehlchen',
    fr: 'Rouge-gorge',
    es: 'Petirrojo',
    it: 'Pettirosso',
    pt: 'Pisco',
    nl: 'Roodborstje',
    sv: 'Rödhake',
    da: 'Rødhals',
    no: 'Rødstrupe',
    fi: 'Punarinta'
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
  'snail': {
    en: 'Snail',
    de: 'Schnecke',
    fr: 'Escargot',
    es: 'Caracol',
    it: 'Lumaca',
    pt: 'Caracol',
    nl: 'Slak',
    sv: 'Snigel',
    da: 'Snegl',
    no: 'Snegl',
    fi: 'Etana'
  },
  'sun': {
    en: 'Sun',
    de: 'Sonne',
    fr: 'Soleil',
    es: 'Sol',
    it: 'Sole',
    pt: 'Sol',
    nl: 'Zon',
    sv: 'Sol',
    da: 'Sol',
    no: 'Sol',
    fi: 'Aurinko'
  },
  'tulip': {
    en: 'Tulip',
    de: 'Tulpe',
    fr: 'Tulipe',
    es: 'Tulipán',
    it: 'Tulipano',
    pt: 'Tulipa',
    nl: 'Tulp',
    sv: 'Tulpan',
    da: 'Tulipan',
    no: 'Tulipan',
    fi: 'Tulppaani'
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
    fi: 'Kastelukann'
  },
  'worm': {
    en: 'Worm',
    de: 'Wurm',
    fr: 'Ver',
    es: 'Gusano',
    it: 'Verme',
    pt: 'Minhoca',
    nl: 'Worm',
    sv: 'Mask',
    da: 'Orm',
    no: 'Mark',
    fi: 'Mato'
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
  console.log('Image Import Script: Spring');
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
