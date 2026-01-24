const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'weather',
  type: 'images',
  sourceFolderName: 'weather',
  displayNames: {
    en: 'Weather',
    de: 'Wetter',
    fr: 'Météo',
    es: 'Clima',
    it: 'Meteo',
    pt: 'Clima',
    nl: 'Weer',
    sv: 'Väder',
    da: 'Vejr',
    no: 'Vær',
    fi: 'Sää'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
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
  'cloudy': {
    en: 'Cloudy',
    de: 'Bewölkt',
    fr: 'Nuageux',
    es: 'Nublado',
    it: 'Nuvoloso',
    pt: 'Nublado',
    nl: 'Bewolkt',
    sv: 'Molnigt',
    da: 'Overskyet',
    no: 'Overskyet',
    fi: 'Pilvinen'
  },
  'cold': {
    en: 'Cold',
    de: 'Kalt',
    fr: 'Froid',
    es: 'Frío',
    it: 'Freddo',
    pt: 'Frio',
    nl: 'Koud',
    sv: 'Kallt',
    da: 'Koldt',
    no: 'Kaldt',
    fi: 'Kylmä'
  },
  'hot': {
    en: 'Hot',
    de: 'Heiß',
    fr: 'Chaud',
    es: 'Caliente',
    it: 'Caldo',
    pt: 'Quente',
    nl: 'Heet',
    sv: 'Varmt',
    da: 'Varmt',
    no: 'Varmt',
    fi: 'Kuuma'
  },
  'mittens': {
    en: 'Mittens',
    de: 'Fäustlinge',
    fr: 'Moufles',
    es: 'Mitones',
    it: 'Muffole',
    pt: 'Luvas',
    nl: 'Wanten',
    sv: 'Vantar',
    da: 'Vanter',
    no: 'Votter',
    fi: 'Lapaset'
  },
  'partly cloudy': {
    en: 'Partly Cloudy',
    de: 'Teilweise bewölkt',
    fr: 'Partiellement nuageux',
    es: 'Parcialmente nublado',
    it: 'Parzialmente nuvoloso',
    pt: 'Parcialmente nublado',
    nl: 'Gedeeltelijk bewolkt',
    sv: 'Delvis molnigt',
    da: 'Delvis overskyet',
    no: 'Delvis overskyet',
    fi: 'Puolipilvinen'
  },
  'puddle': {
    en: 'Puddle',
    de: 'Pfütze',
    fr: 'Flaque',
    es: 'Charco',
    it: 'Pozzanghera',
    pt: 'Poça',
    nl: 'Plas',
    sv: 'Vattenpöl',
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
  'raindrop': {
    en: 'Raindrop',
    de: 'Regentropfen',
    fr: 'Goutte de pluie',
    es: 'Gota de lluvia',
    it: 'Goccia di pioggia',
    pt: 'Gota de chuva',
    nl: 'Regendruppel',
    sv: 'Regndroppe',
    da: 'Regndråbe',
    no: 'Regndråpe',
    fi: 'Sadepisara'
  },
  'rainy': {
    en: 'Rainy',
    de: 'Regnerisch',
    fr: 'Pluvieux',
    es: 'Lluvioso',
    it: 'Piovoso',
    pt: 'Chuvoso',
    nl: 'Regenachtig',
    sv: 'Regnigt',
    da: 'Regnfuldt',
    no: 'Regnfullt',
    fi: 'Sateinen'
  },
  'scarf': {
    en: 'Scarf',
    de: 'Schal',
    fr: 'Écharpe',
    es: 'Bufanda',
    it: 'Sciarpa',
    pt: 'Cachecol',
    nl: 'Sjaal',
    sv: 'Halsduk',
    da: 'Halstørklæde',
    no: 'Skjerf',
    fi: 'Huivi'
  },
  'snowflake': {
    en: 'Snowflake',
    de: 'Schneeflocke',
    fr: 'Flocon de neige',
    es: 'Copo de nieve',
    it: 'Fiocco di neve',
    pt: 'Floco de neve',
    nl: 'Sneeuwvlok',
    sv: 'Snöflinga',
    da: 'Snefnug',
    no: 'Snøfnugg',
    fi: 'Lumihiutale'
  },
  'stormy': {
    en: 'Stormy',
    de: 'Stürmisch',
    fr: 'Orageux',
    es: 'Tormentoso',
    it: 'Tempestoso',
    pt: 'Tempestuoso',
    nl: 'Stormachtig',
    sv: 'Stormigt',
    da: 'Stormfuldt',
    no: 'Stormfullt',
    fi: 'Myrskyinen'
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
  'sunglasses': {
    en: 'Sunglasses',
    de: 'Sonnenbrille',
    fr: 'Lunettes de soleil',
    es: 'Lentes de sol',
    it: 'Occhiali da sole',
    pt: 'Óculos de sol',
    nl: 'Zonnebril',
    sv: 'Solglasögon',
    da: 'Solbriller',
    no: 'Solbriller',
    fi: 'Aurinkolasit'
  },
  'sunny': {
    en: 'Sunny',
    de: 'Sonnig',
    fr: 'Ensoleillé',
    es: 'Soleado',
    it: 'Soleggiato',
    pt: 'Ensolarado',
    nl: 'Zonnig',
    sv: 'Soligt',
    da: 'Solrigt',
    no: 'Solfylt',
    fi: 'Aurinkoinen'
  },
  'thermometer': {
    en: 'Thermometer',
    de: 'Thermometer',
    fr: 'Thermomètre',
    es: 'Termómetro',
    it: 'Termometro',
    pt: 'Termômetro',
    nl: 'Thermometer',
    sv: 'Termometer',
    da: 'Termometer',
    no: 'Termometer',
    fi: 'Lämpömittari'
  },
  'thunderstorm': {
    en: 'Thunderstorm',
    de: 'Gewitter',
    fr: 'Orage',
    es: 'Tormenta eléctrica',
    it: 'Temporale',
    pt: 'Tempestade',
    nl: 'Onweer',
    sv: 'Åskväder',
    da: 'Tordenvejr',
    no: 'Tordenvær',
    fi: 'Ukkonen'
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
  console.log('Image Import Script: Weather');
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
