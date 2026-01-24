const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'flowers',
  type: 'images',
  sourceFolderName: 'flowers',
  displayNames: {
    en: 'Flowers',
    de: 'Blumen',
    fr: 'Fleurs',
    es: 'Flores',
    it: 'Fiori',
    pt: 'Flores',
    nl: 'Bloemen',
    sv: 'Blommor',
    da: 'Blomster',
    no: 'Blomster',
    fi: 'Kukat'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'aster': {
    en: 'Aster',
    de: 'Aster',
    fr: 'Aster',
    es: 'Áster',
    it: 'Astro',
    pt: 'Áster',
    nl: 'Aster',
    sv: 'Aster',
    da: 'Asters',
    no: 'Asters',
    fi: 'Asteri'
  },
  'azalea': {
    en: 'Azalea',
    de: 'Azalee',
    fr: 'Azalée',
    es: 'Azalea',
    it: 'Azalea',
    pt: 'Azaleia',
    nl: 'Azalea',
    sv: 'Azalea',
    da: 'Azalea',
    no: 'Asalea',
    fi: 'Atsalea'
  },
  'begonia': {
    en: 'Begonia',
    de: 'Begonie',
    fr: 'Bégonia',
    es: 'Begonia',
    it: 'Begonia',
    pt: 'Begônia',
    nl: 'Begonia',
    sv: 'Begonia',
    da: 'Begonie',
    no: 'Begonia',
    fi: 'Begonia'
  },
  'bluebell': {
    en: 'Bluebell',
    de: 'Glockenblume',
    fr: 'Jacinthe des bois',
    es: 'Campanilla',
    it: 'Giacinto selvatico',
    pt: 'Campainha',
    nl: 'Boshyacint',
    sv: 'Blåklocka',
    da: 'Blåklokke',
    no: 'Blåklokke',
    fi: 'Sinililja'
  },
  'buttercup': {
    en: 'Buttercup',
    de: 'Butterblume',
    fr: 'Bouton d\'or',
    es: 'Ranúnculo',
    it: 'Ranuncolo',
    pt: 'Botão-de-ouro',
    nl: 'Boterbloem',
    sv: 'Smörblomma',
    da: 'Smørblomst',
    no: 'Smørblomst',
    fi: 'Leinikki'
  },
  'carnation': {
    en: 'Carnation',
    de: 'Nelke',
    fr: 'Œillet',
    es: 'Clavel',
    it: 'Garofano',
    pt: 'Cravo',
    nl: 'Anjer',
    sv: 'Nejlika',
    da: 'Nellike',
    no: 'Nellik',
    fi: 'Neilikka'
  },
  'cherry blossom': {
    en: 'Cherry Blossom',
    de: 'Kirschblüte',
    fr: 'Fleur de cerisier',
    es: 'Flor de cerezo',
    it: 'Fiore di ciliegio',
    pt: 'Flor de cerejeira',
    nl: 'Kersenbloesem',
    sv: 'Körsbärsblom',
    da: 'Kirsebærblomst',
    no: 'Kirsebærblomst',
    fi: 'Kirsikankukka'
  },
  'clover': {
    en: 'Clover',
    de: 'Klee',
    fr: 'Trèfle',
    es: 'Trébol',
    it: 'Trifoglio',
    pt: 'Trevo',
    nl: 'Klaver',
    sv: 'Klöver',
    da: 'Kløver',
    no: 'Kløver',
    fi: 'Apila'
  },
  'columbine': {
    en: 'Columbine',
    de: 'Akelei',
    fr: 'Ancolie',
    es: 'Aguileña',
    it: 'Aquilegia',
    pt: 'Aquilégia',
    nl: 'Akelei',
    sv: 'Akleja',
    da: 'Akeleje',
    no: 'Akeleie',
    fi: 'Akileija'
  },
  'cornflower': {
    en: 'Cornflower',
    de: 'Kornblume',
    fr: 'Bleuet',
    es: 'Aciano',
    it: 'Fiordaliso',
    pt: 'Centáurea',
    nl: 'Korenbloem',
    sv: 'Blåklint',
    da: 'Kornblomst',
    no: 'Kornblomst',
    fi: 'Ruiskaunokki'
  },
  'crocus': {
    en: 'Crocus',
    de: 'Krokus',
    fr: 'Crocus',
    es: 'Azafrán',
    it: 'Croco',
    pt: 'Açafrão',
    nl: 'Krokus',
    sv: 'Krokus',
    da: 'Krokus',
    no: 'Krokus',
    fi: 'Krookus'
  },
  'daffodil': {
    en: 'Daffodil',
    de: 'Narzisse',
    fr: 'Jonquille',
    es: 'Narciso',
    it: 'Narciso',
    pt: 'Narciso',
    nl: 'Narcis',
    sv: 'Påsklilja',
    da: 'Påskelilje',
    no: 'Påskelilje',
    fi: 'Narsissi'
  },
  'dahlia': {
    en: 'Dahlia',
    de: 'Dahlie',
    fr: 'Dahlia',
    es: 'Dalia',
    it: 'Dalia',
    pt: 'Dália',
    nl: 'Dahlia',
    sv: 'Dahlia',
    da: 'Dahlia',
    no: 'Dahlia',
    fi: 'Daalia'
  },
  'dandelion': {
    en: 'Dandelion',
    de: 'Löwenzahn',
    fr: 'Pissenlit',
    es: 'Diente de león',
    it: 'Tarassaco',
    pt: 'Dente-de-leão',
    nl: 'Paardenbloem',
    sv: 'Maskros',
    da: 'Mælkebøtte',
    no: 'Løvetann',
    fi: 'Voikukka'
  },
  'forget-me-not': {
    en: 'Forget-Me-Not',
    de: 'Vergissmeinnicht',
    fr: 'Myosotis',
    es: 'Nomeolvides',
    it: 'Nontiscordardimé',
    pt: 'Miosótis',
    nl: 'Vergeet-mij-nietje',
    sv: 'Förgätmigej',
    da: 'Forglemmigej',
    no: 'Forglemmegei',
    fi: 'Lemmikki'
  },
  'forsythia': {
    en: 'Forsythia',
    de: 'Forsythie',
    fr: 'Forsythia',
    es: 'Forsitia',
    it: 'Forsizia',
    pt: 'Forsítia',
    nl: 'Forsythia',
    sv: 'Forsythia',
    da: 'Forsythia',
    no: 'Gullbusk',
    fi: 'Onnenpensas'
  },
  'hibiscus': {
    en: 'Hibiscus',
    de: 'Hibiskus',
    fr: 'Hibiscus',
    es: 'Hibisco',
    it: 'Ibisco',
    pt: 'Hibisco',
    nl: 'Hibiscus',
    sv: 'Hibiskus',
    da: 'Hibiscus',
    no: 'Hibiskus',
    fi: 'Hibiskus'
  },
  'hydrangea': {
    en: 'Hydrangea',
    de: 'Hortensie',
    fr: 'Hortensia',
    es: 'Hortensia',
    it: 'Ortensia',
    pt: 'Hortênsia',
    nl: 'Hortensia',
    sv: 'Hortensia',
    da: 'Hortensia',
    no: 'Hortensia',
    fi: 'Hortensia'
  },
  'jasmine': {
    en: 'Jasmine',
    de: 'Jasmin',
    fr: 'Jasmin',
    es: 'Jazmín',
    it: 'Gelsomino',
    pt: 'Jasmim',
    nl: 'Jasmijn',
    sv: 'Jasmin',
    da: 'Jasmin',
    no: 'Jasmin',
    fi: 'Jasmiini'
  },
  'lavender': {
    en: 'Lavender',
    de: 'Lavendel',
    fr: 'Lavande',
    es: 'Lavanda',
    it: 'Lavanda',
    pt: 'Lavanda',
    nl: 'Lavendel',
    sv: 'Lavendel',
    da: 'Lavendel',
    no: 'Lavendel',
    fi: 'Laventeli'
  },
  'lilac': {
    en: 'Lilac',
    de: 'Flieder',
    fr: 'Lilas',
    es: 'Lila',
    it: 'Lillà',
    pt: 'Lilás',
    nl: 'Sering',
    sv: 'Syrén',
    da: 'Syren',
    no: 'Syrin',
    fi: 'Syreeni'
  },
  'lily': {
    en: 'Lily',
    de: 'Lilie',
    fr: 'Lys',
    es: 'Lirio',
    it: 'Giglio',
    pt: 'Lírio',
    nl: 'Lelie',
    sv: 'Lilja',
    da: 'Lilje',
    no: 'Lilje',
    fi: 'Lilja'
  },
  'lotus': {
    en: 'Lotus',
    de: 'Lotus',
    fr: 'Lotus',
    es: 'Loto',
    it: 'Loto',
    pt: 'Lótus',
    nl: 'Lotus',
    sv: 'Lotus',
    da: 'Lotus',
    no: 'Lotus',
    fi: 'Lootus'
  },
  'marigold': {
    en: 'Marigold',
    de: 'Ringelblume',
    fr: 'Souci',
    es: 'Cempasúchil',
    it: 'Calendula',
    pt: 'Calêndula',
    nl: 'Goudsbloem',
    sv: 'Ringblomma',
    da: 'Morgenfrue',
    no: 'Ringblomst',
    fi: 'Kehäkukka'
  },
  'morning glory': {
    en: 'Morning Glory',
    de: 'Trichterwinde',
    fr: 'Gloire du matin',
    es: 'Gloria de la mañana',
    it: 'Campanella',
    pt: 'Glória-da-manhã',
    nl: 'Dagbloem',
    sv: 'Blomman för dagen',
    da: 'Pragtsnerle',
    no: 'Vindel',
    fi: 'Päivänkakkara'
  },
  'orchid': {
    en: 'Orchid',
    de: 'Orchidee',
    fr: 'Orchidée',
    es: 'Orquídea',
    it: 'Orchidea',
    pt: 'Orquídea',
    nl: 'Orchidee',
    sv: 'Orkidé',
    da: 'Orkidé',
    no: 'Orkidé',
    fi: 'Orkidea'
  },
  'peony': {
    en: 'Peony',
    de: 'Pfingstrose',
    fr: 'Pivoine',
    es: 'Peonía',
    it: 'Peonia',
    pt: 'Peônia',
    nl: 'Pioenroos',
    sv: 'Pion',
    da: 'Pæon',
    no: 'Peon',
    fi: 'Pioni'
  },
  'petunia': {
    en: 'Petunia',
    de: 'Petunie',
    fr: 'Pétunia',
    es: 'Petunia',
    it: 'Petunia',
    pt: 'Petúnia',
    nl: 'Petunia',
    sv: 'Petunia',
    da: 'Petunia',
    no: 'Petunia',
    fi: 'Petunia'
  },
  'phlox': {
    en: 'Phlox',
    de: 'Phlox',
    fr: 'Phlox',
    es: 'Flox',
    it: 'Flox',
    pt: 'Flox',
    nl: 'Vlambloem',
    sv: 'Flox',
    da: 'Floks',
    no: 'Floks',
    fi: 'Leimukukka'
  },
  'rose': {
    en: 'Rose',
    de: 'Rose',
    fr: 'Rose',
    es: 'Rosa',
    it: 'Rosa',
    pt: 'Rosa',
    nl: 'Roos',
    sv: 'Ros',
    da: 'Rose',
    no: 'Rose',
    fi: 'Ruusu'
  },
  'snowdrop': {
    en: 'Snowdrop',
    de: 'Schneeglöckchen',
    fr: 'Perce-neige',
    es: 'Campanilla de invierno',
    it: 'Bucaneve',
    pt: 'Floco-de-neve',
    nl: 'Sneeuwklokje',
    sv: 'Snödroppe',
    da: 'Vintergæk',
    no: 'Snøklokke',
    fi: 'Lumikello'
  },
  'sunflower': {
    en: 'Sunflower',
    de: 'Sonnenblume',
    fr: 'Tournesol',
    es: 'Girasol',
    it: 'Girasole',
    pt: 'Girassol',
    nl: 'Zonnebloem',
    sv: 'Solros',
    da: 'Solsikke',
    no: 'Solsikke',
    fi: 'Auringonkukka'
  },
  'trillium': {
    en: 'Trillium',
    de: 'Waldlilie',
    fr: 'Trille',
    es: 'Trilio',
    it: 'Trillium',
    pt: 'Trillium',
    nl: 'Drieblad',
    sv: 'Treblad',
    da: 'Treblad',
    no: 'Treblad',
    fi: 'Kolmilehti'
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
  'violet': {
    en: 'Violet',
    de: 'Veilchen',
    fr: 'Violette',
    es: 'Violeta',
    it: 'Viola',
    pt: 'Violeta',
    nl: 'Viooltje',
    sv: 'Viol',
    da: 'Viol',
    no: 'Fiol',
    fi: 'Orvokki'
  },
  'water lily': {
    en: 'Water Lily',
    de: 'Seerose',
    fr: 'Nénuphar',
    es: 'Nenúfar',
    it: 'Ninfea',
    pt: 'Nenúfar',
    nl: 'Waterlelie',
    sv: 'Näckros',
    da: 'Åkande',
    no: 'Vannlilje',
    fi: 'Lumme'
  },
  'wisteria': {
    en: 'Wisteria',
    de: 'Glyzinie',
    fr: 'Glycine',
    es: 'Glicinia',
    it: 'Glicine',
    pt: 'Glicínia',
    nl: 'Blauweregen',
    sv: 'Blåregn',
    da: 'Blåregn',
    no: 'Blåregn',
    fi: 'Sinisade'
  },
  'zinnia': {
    en: 'Zinnia',
    de: 'Zinnie',
    fr: 'Zinnia',
    es: 'Zinnia',
    it: 'Zinnia',
    pt: 'Zínia',
    nl: 'Zinnia',
    sv: 'Zinnia',
    da: 'Zinnia',
    no: 'Zinnia',
    fi: 'Sinnia'
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
  console.log('Image Import Script: Flowers');
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
