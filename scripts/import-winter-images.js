const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'winter',
  type: 'images',
  sourceFolderName: 'winter',
  displayNames: {
    en: 'Winter',
    de: 'Winter',
    fr: 'Hiver',
    es: 'Invierno',
    it: 'Inverno',
    pt: 'Inverno',
    nl: 'Winter',
    sv: 'Vinter',
    da: 'Vinter',
    no: 'Vinter',
    fi: 'Talvi'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'boots': {
    en: 'Boots',
    de: 'Stiefel',
    fr: 'Bottes',
    es: 'Botas',
    it: 'Stivali',
    pt: 'Botas',
    nl: 'Laarzen',
    sv: 'Stövlar',
    da: 'Støvler',
    no: 'Støvler',
    fi: 'Saappaat'
  },
  'cabin': {
    en: 'Cabin',
    de: 'Hütte',
    fr: 'Cabane',
    es: 'Cabaña',
    it: 'Capanna',
    pt: 'Cabana',
    nl: 'Hut',
    sv: 'Stuga',
    da: 'Hytte',
    no: 'Hytte',
    fi: 'Mökki'
  },
  'coat': {
    en: 'Coat',
    de: 'Mantel',
    fr: 'Manteau',
    es: 'Abrigo',
    it: 'Cappotto',
    pt: 'Casaco',
    nl: 'Jas',
    sv: 'Kappa',
    da: 'Frakke',
    no: 'Frakk',
    fi: 'Takki'
  },
  'cocoa': {
    en: 'Hot Cocoa',
    de: 'Heiße Schokolade',
    fr: 'Chocolat chaud',
    es: 'Chocolate caliente',
    it: 'Cioccolata calda',
    pt: 'Chocolate quente',
    nl: 'Warme chocolademelk',
    sv: 'Varm choklad',
    da: 'Varm kakao',
    no: 'Varm kakao',
    fi: 'Kaakao'
  },
  'earmuffs': {
    en: 'Earmuffs',
    de: 'Ohrenschützer',
    fr: 'Cache-oreilles',
    es: 'Orejeras',
    it: 'Paraorecchie',
    pt: 'Protetores de ouvido',
    nl: 'Oorwarmers',
    sv: 'Öronmuffar',
    da: 'Ørevarmere',
    no: 'Ørevarmere',
    fi: 'Korvaläpät'
  },
  'evergreen': {
    en: 'Evergreen',
    de: 'Immergrün',
    fr: 'Conifère',
    es: 'Árbol perenne',
    it: 'Sempreverde',
    pt: 'Sempre-verde',
    nl: 'Groenblijvend',
    sv: 'Vintergröna',
    da: 'Stedsegrøn',
    no: 'Eviggrønn',
    fi: 'Ikivihreä'
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
  'hat': {
    en: 'Winter Hat',
    de: 'Wintermütze',
    fr: 'Bonnet',
    es: 'Gorro',
    it: 'Berretto',
    pt: 'Gorro',
    nl: 'Muts',
    sv: 'Mössa',
    da: 'Hue',
    no: 'Lue',
    fi: 'Pipo'
  },
  'hockey': {
    en: 'Hockey',
    de: 'Eishockey',
    fr: 'Hockey',
    es: 'Hockey',
    it: 'Hockey',
    pt: 'Hóquei',
    nl: 'IJshockey',
    sv: 'Ishockey',
    da: 'Ishockey',
    no: 'Ishockey',
    fi: 'Jääkiekko'
  },
  'ice': {
    en: 'Ice',
    de: 'Eis',
    fr: 'Glace',
    es: 'Hielo',
    it: 'Ghiaccio',
    pt: 'Gelo',
    nl: 'IJs',
    sv: 'Is',
    da: 'Is',
    no: 'Is',
    fi: 'Jää'
  },
  'icicle': {
    en: 'Icicle',
    de: 'Eiszapfen',
    fr: 'Stalactite',
    es: 'Carámbano',
    it: 'Ghiacciolo',
    pt: 'Sincelo',
    nl: 'IJspegel',
    sv: 'Istapp',
    da: 'Istap',
    no: 'Istapp',
    fi: 'Jääpuikko'
  },
  'igloo': {
    en: 'Igloo',
    de: 'Iglu',
    fr: 'Igloo',
    es: 'Iglú',
    it: 'Igloo',
    pt: 'Iglu',
    nl: 'Iglo',
    sv: 'Igloo',
    da: 'Iglo',
    no: 'Iglo',
    fi: 'Iglu'
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
  'owl': {
    en: 'Owl',
    de: 'Eule',
    fr: 'Hibou',
    es: 'Búho',
    it: 'Gufo',
    pt: 'Coruja',
    nl: 'Uil',
    sv: 'Uggla',
    da: 'Ugle',
    no: 'Ugle',
    fi: 'Pöllö'
  },
  'penguin': {
    en: 'Penguin',
    de: 'Pinguin',
    fr: 'Pingouin',
    es: 'Pingüino',
    it: 'Pinguino',
    pt: 'Pinguim',
    nl: 'Pinguïn',
    sv: 'Pingvin',
    da: 'Pingvin',
    no: 'Pingvin',
    fi: 'Pingviini'
  },
  'pine': {
    en: 'Pine Tree',
    de: 'Kiefer',
    fr: 'Pin',
    es: 'Pino',
    it: 'Pino',
    pt: 'Pinheiro',
    nl: 'Dennenboom',
    sv: 'Tall',
    da: 'Fyr',
    no: 'Furu',
    fi: 'Mänty'
  },
  'pinecone': {
    en: 'Pinecone',
    de: 'Tannenzapfen',
    fr: 'Pomme de pin',
    es: 'Piña',
    it: 'Pigna',
    pt: 'Pinha',
    nl: 'Dennenappel',
    sv: 'Kotte',
    da: 'Kogle',
    no: 'Kongle',
    fi: 'Käpy'
  },
  'polar bear': {
    en: 'Polar Bear',
    de: 'Eisbär',
    fr: 'Ours polaire',
    es: 'Oso polar',
    it: 'Orso polare',
    pt: 'Urso polar',
    nl: 'IJsbeer',
    sv: 'Isbjörn',
    da: 'Isbjørn',
    no: 'Isbjørn',
    fi: 'Jääkarhu'
  },
  'seal': {
    en: 'Seal',
    de: 'Robbe',
    fr: 'Phoque',
    es: 'Foca',
    it: 'Foca',
    pt: 'Foca',
    nl: 'Zeehond',
    sv: 'Säl',
    da: 'Sæl',
    no: 'Sel',
    fi: 'Hylje'
  },
  'shovel': {
    en: 'Snow Shovel',
    de: 'Schneeschaufel',
    fr: 'Pelle à neige',
    es: 'Pala para nieve',
    it: 'Pala da neve',
    pt: 'Pá de neve',
    nl: 'Sneeuwschep',
    sv: 'Snöskyffel',
    da: 'Sneskovl',
    no: 'Snøspade',
    fi: 'Lumikola'
  },
  'skating': {
    en: 'Ice Skating',
    de: 'Schlittschuhlaufen',
    fr: 'Patinage',
    es: 'Patinaje sobre hielo',
    it: 'Pattinaggio',
    pt: 'Patinação no gelo',
    nl: 'Schaatsen',
    sv: 'Skridskoåkning',
    da: 'Skøjteløb',
    no: 'Skøyting',
    fi: 'Luistelu'
  },
  'skiing': {
    en: 'Skiing',
    de: 'Skifahren',
    fr: 'Ski',
    es: 'Esquí',
    it: 'Sci',
    pt: 'Esqui',
    nl: 'Skiën',
    sv: 'Skidåkning',
    da: 'Skiløb',
    no: 'Skiing',
    fi: 'Hiihto'
  },
  'sled': {
    en: 'Sled',
    de: 'Schlitten',
    fr: 'Luge',
    es: 'Trineo',
    it: 'Slitta',
    pt: 'Trenó',
    nl: 'Slee',
    sv: 'Släde',
    da: 'Slæde',
    no: 'Kjelke',
    fi: 'Kelkka'
  },
  'sledding': {
    en: 'Sledding',
    de: 'Rodeln',
    fr: 'Faire de la luge',
    es: 'Paseo en trineo',
    it: 'Slittino',
    pt: 'Andar de trenó',
    nl: 'Sleeën',
    sv: 'Åka släde',
    da: 'Kælkning',
    no: 'Aking',
    fi: 'Kelkkailu'
  },
  'sleigh': {
    en: 'Sleigh',
    de: 'Pferdeschlitten',
    fr: 'Traîneau',
    es: 'Trineo',
    it: 'Slitta',
    pt: 'Trenó',
    nl: 'Arrenslee',
    sv: 'Släde',
    da: 'Slæde',
    no: 'Slede',
    fi: 'Reki'
  },
  'snowboarding': {
    en: 'Snowboarding',
    de: 'Snowboarden',
    fr: 'Snowboard',
    es: 'Snowboard',
    it: 'Snowboard',
    pt: 'Snowboard',
    nl: 'Snowboarden',
    sv: 'Snowboard',
    da: 'Snowboard',
    no: 'Snøbrett',
    fi: 'Lumilautailu'
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
  'snowman': {
    en: 'Snowman',
    de: 'Schneemann',
    fr: 'Bonhomme de neige',
    es: 'Muñeco de nieve',
    it: 'Pupazzo di neve',
    pt: 'Boneco de neve',
    nl: 'Sneeuwpop',
    sv: 'Snögubbe',
    da: 'Snemand',
    no: 'Snømann',
    fi: 'Lumiukko'
  },
  'sweater': {
    en: 'Sweater',
    de: 'Pullover',
    fr: 'Pull',
    es: 'Suéter',
    it: 'Maglione',
    pt: 'Suéter',
    nl: 'Trui',
    sv: 'Tröja',
    da: 'Sweater',
    no: 'Genser',
    fi: 'Villapaita'
  },
  'walrus': {
    en: 'Walrus',
    de: 'Walross',
    fr: 'Morse',
    es: 'Morsa',
    it: 'Tricheco',
    pt: 'Morsa',
    nl: 'Walrus',
    sv: 'Valross',
    da: 'Hvalros',
    no: 'Hvalross',
    fi: 'Mursu'
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
  console.log('Image Import Script: Winter');
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
