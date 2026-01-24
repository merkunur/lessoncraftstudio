const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'tree',
  type: 'images',
  sourceFolderName: 'tree',
  displayNames: {
    en: 'Trees',
    de: 'Bäume',
    fr: 'Arbres',
    es: 'Árboles',
    it: 'Alberi',
    pt: 'Árvores',
    nl: 'Bomen',
    sv: 'Träd',
    da: 'Træer',
    no: 'Trær',
    fi: 'Puut'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'apple': {
    en: 'Apple Tree',
    de: 'Apfelbaum',
    fr: 'Pommier',
    es: 'Manzano',
    it: 'Melo',
    pt: 'Macieira',
    nl: 'Appelboom',
    sv: 'Äppelträd',
    da: 'Æbletræ',
    no: 'Epletre',
    fi: 'Omenapuu'
  },
  'ash': {
    en: 'Ash Tree',
    de: 'Esche',
    fr: 'Frêne',
    es: 'Fresno',
    it: 'Frassino',
    pt: 'Freixo',
    nl: 'Es',
    sv: 'Ask',
    da: 'Ask',
    no: 'Ask',
    fi: 'Saarni'
  },
  'aspen': {
    en: 'Aspen Tree',
    de: 'Espe',
    fr: 'Tremble',
    es: 'Álamo temblón',
    it: 'Pioppo tremulo',
    pt: 'Álamo tremedor',
    nl: 'Esp',
    sv: 'Asp',
    da: 'Bævreasp',
    no: 'Osp',
    fi: 'Haapa'
  },
  'banana': {
    en: 'Banana Tree',
    de: 'Bananenbaum',
    fr: 'Bananier',
    es: 'Plátano',
    it: 'Banano',
    pt: 'Bananeira',
    nl: 'Bananenboom',
    sv: 'Bananträd',
    da: 'Banan',
    no: 'Banantre',
    fi: 'Banaanipuu'
  },
  'banyan': {
    en: 'Banyan Tree',
    de: 'Banyanbaum',
    fr: 'Banian',
    es: 'Higuera de Bengala',
    it: 'Baniano',
    pt: 'Figueira-de-bengala',
    nl: 'Waringin',
    sv: 'Banjanträd',
    da: 'Banyan',
    no: 'Banyantre',
    fi: 'Baniaanipuu'
  },
  'baobab': {
    en: 'Baobab Tree',
    de: 'Affenbrotbaum',
    fr: 'Baobab',
    es: 'Baobab',
    it: 'Baobab',
    pt: 'Baobá',
    nl: 'Baobab',
    sv: 'Baobabträd',
    da: 'Baobab',
    no: 'Baobabtre',
    fi: 'Apinanleipäpuu'
  },
  'beech': {
    en: 'Beech Tree',
    de: 'Buche',
    fr: 'Hêtre',
    es: 'Haya',
    it: 'Faggio',
    pt: 'Faia',
    nl: 'Beuk',
    sv: 'Bok',
    da: 'Bøg',
    no: 'Bøk',
    fi: 'Pyökki'
  },
  'birch': {
    en: 'Birch Tree',
    de: 'Birke',
    fr: 'Bouleau',
    es: 'Abedul',
    it: 'Betulla',
    pt: 'Bétula',
    nl: 'Berk',
    sv: 'Björk',
    da: 'Birk',
    no: 'Bjørk',
    fi: 'Koivu'
  },
  'cedar': {
    en: 'Cedar Tree',
    de: 'Zeder',
    fr: 'Cèdre',
    es: 'Cedro',
    it: 'Cedro',
    pt: 'Cedro',
    nl: 'Ceder',
    sv: 'Ceder',
    da: 'Cedertræ',
    no: 'Seder',
    fi: 'Setri'
  },
  'cherry': {
    en: 'Cherry Tree',
    de: 'Kirschbaum',
    fr: 'Cerisier',
    es: 'Cerezo',
    it: 'Ciliegio',
    pt: 'Cerejeira',
    nl: 'Kersenboom',
    sv: 'Körsbärsträd',
    da: 'Kirsebærtræ',
    no: 'Kirsebærtre',
    fi: 'Kirsikkapuu'
  },
  'chestnut': {
    en: 'Chestnut Tree',
    de: 'Kastanienbaum',
    fr: 'Châtaignier',
    es: 'Castaño',
    it: 'Castagno',
    pt: 'Castanheiro',
    nl: 'Kastanjeboom',
    sv: 'Kastanjeträd',
    da: 'Kastanjetræ',
    no: 'Kastanjetre',
    fi: 'Kastanjapuu'
  },
  'coconut': {
    en: 'Coconut Tree',
    de: 'Kokospalme',
    fr: 'Cocotier',
    es: 'Cocotero',
    it: 'Palma da cocco',
    pt: 'Coqueiro',
    nl: 'Kokospalm',
    sv: 'Kokospalm',
    da: 'Kokospalme',
    no: 'Kokospalme',
    fi: 'Kookospalmu'
  },
  'cypress': {
    en: 'Cypress Tree',
    de: 'Zypresse',
    fr: 'Cyprès',
    es: 'Ciprés',
    it: 'Cipresso',
    pt: 'Cipreste',
    nl: 'Cipres',
    sv: 'Cypress',
    da: 'Cypres',
    no: 'Sypress',
    fi: 'Sypressi'
  },
  'dogwood': {
    en: 'Dogwood Tree',
    de: 'Hartriegel',
    fr: 'Cornouiller',
    es: 'Cornejo',
    it: 'Corniolo',
    pt: 'Corniso',
    nl: 'Kornoelje',
    sv: 'Kornell',
    da: 'Kornel',
    no: 'Kornell',
    fi: 'Kanukka'
  },
  'elm': {
    en: 'Elm Tree',
    de: 'Ulme',
    fr: 'Orme',
    es: 'Olmo',
    it: 'Olmo',
    pt: 'Olmo',
    nl: 'Iep',
    sv: 'Alm',
    da: 'Elm',
    no: 'Alm',
    fi: 'Jalava'
  },
  'fir': {
    en: 'Fir Tree',
    de: 'Tanne',
    fr: 'Sapin',
    es: 'Abeto',
    it: 'Abete',
    pt: 'Abeto',
    nl: 'Spar',
    sv: 'Gran',
    da: 'Ædelgran',
    no: 'Edelgran',
    fi: 'Pihta'
  },
  'hemlock': {
    en: 'Hemlock Tree',
    de: 'Hemlocktanne',
    fr: 'Pruche',
    es: 'Cicuta',
    it: 'Tsuga',
    pt: 'Cicuta',
    nl: 'Hemlockspar',
    sv: 'Hemlock',
    da: 'Hemlock',
    no: 'Hemlokk',
    fi: 'Hemlokki'
  },
  'juniper': {
    en: 'Juniper Tree',
    de: 'Wacholder',
    fr: 'Genévrier',
    es: 'Enebro',
    it: 'Ginepro',
    pt: 'Zimbro',
    nl: 'Jeneverbes',
    sv: 'En',
    da: 'Enebær',
    no: 'Einer',
    fi: 'Kataja'
  },
  'lemon': {
    en: 'Lemon Tree',
    de: 'Zitronenbaum',
    fr: 'Citronnier',
    es: 'Limonero',
    it: 'Limone',
    pt: 'Limoeiro',
    nl: 'Citroenboom',
    sv: 'Citronträd',
    da: 'Citrontræ',
    no: 'Sitrontre',
    fi: 'Sitruunapuu'
  },
  'maple': {
    en: 'Maple Tree',
    de: 'Ahorn',
    fr: 'Érable',
    es: 'Arce',
    it: 'Acero',
    pt: 'Bordo',
    nl: 'Esdoorn',
    sv: 'Lönn',
    da: 'Løn',
    no: 'Lønn',
    fi: 'Vaahtera'
  },
  'oak': {
    en: 'Oak Tree',
    de: 'Eiche',
    fr: 'Chêne',
    es: 'Roble',
    it: 'Quercia',
    pt: 'Carvalho',
    nl: 'Eik',
    sv: 'Ek',
    da: 'Eg',
    no: 'Eik',
    fi: 'Tammi'
  },
  'orange': {
    en: 'Orange Tree',
    de: 'Orangenbaum',
    fr: 'Oranger',
    es: 'Naranjo',
    it: 'Arancio',
    pt: 'Laranjeira',
    nl: 'Sinaasappelboom',
    sv: 'Apelsinträd',
    da: 'Appelsintræ',
    no: 'Appelsintre',
    fi: 'Appelsiinipuu'
  },
  'palm': {
    en: 'Palm Tree',
    de: 'Palme',
    fr: 'Palmier',
    es: 'Palmera',
    it: 'Palma',
    pt: 'Palmeira',
    nl: 'Palmboom',
    sv: 'Palm',
    da: 'Palme',
    no: 'Palme',
    fi: 'Palmu'
  },
  'peach': {
    en: 'Peach Tree',
    de: 'Pfirsichbaum',
    fr: 'Pêcher',
    es: 'Durazno',
    it: 'Pesco',
    pt: 'Pessegueiro',
    nl: 'Perzikboom',
    sv: 'Persikoträd',
    da: 'Ferskentræ',
    no: 'Ferskentre',
    fi: 'Persikkapuu'
  },
  'pear': {
    en: 'Pear Tree',
    de: 'Birnbaum',
    fr: 'Poirier',
    es: 'Peral',
    it: 'Pero',
    pt: 'Pereira',
    nl: 'Perenboom',
    sv: 'Päronträd',
    da: 'Pæretræ',
    no: 'Pæretre',
    fi: 'Päärynäpuu'
  },
  'pine': {
    en: 'Pine Tree',
    de: 'Kiefer',
    fr: 'Pin',
    es: 'Pino',
    it: 'Pino',
    pt: 'Pinheiro',
    nl: 'Pijnboom',
    sv: 'Tall',
    da: 'Fyr',
    no: 'Furu',
    fi: 'Mänty'
  },
  'plum': {
    en: 'Plum Tree',
    de: 'Pflaumenbaum',
    fr: 'Prunier',
    es: 'Ciruelo',
    it: 'Susino',
    pt: 'Ameixeira',
    nl: 'Pruimenboom',
    sv: 'Plommonträd',
    da: 'Blommetræ',
    no: 'Plommetre',
    fi: 'Luumupuu'
  },
  'poplar': {
    en: 'Poplar Tree',
    de: 'Pappel',
    fr: 'Peuplier',
    es: 'Álamo',
    it: 'Pioppo',
    pt: 'Choupo',
    nl: 'Populier',
    sv: 'Poppel',
    da: 'Poppel',
    no: 'Poppel',
    fi: 'Poppeli'
  },
  'redbud': {
    en: 'Redbud Tree',
    de: 'Judasbaum',
    fr: 'Gainier',
    es: 'Árbol del amor',
    it: 'Albero di Giuda',
    pt: 'Olaia',
    nl: 'Judasboom',
    sv: 'Judasträd',
    da: 'Judastræ',
    no: 'Judastre',
    fi: 'Juudaspuu'
  },
  'redwood': {
    en: 'Redwood Tree',
    de: 'Mammutbaum',
    fr: 'Séquoia',
    es: 'Secuoya roja',
    it: 'Sequoia',
    pt: 'Sequoia vermelha',
    nl: 'Kustmammoetboom',
    sv: 'Kustsekvoja',
    da: 'Kystmammuttræ',
    no: 'Kystsekvoia',
    fi: 'Punapuu'
  },
  'sequoia': {
    en: 'Sequoia Tree',
    de: 'Riesenmammutbaum',
    fr: 'Séquoia géant',
    es: 'Secuoya gigante',
    it: 'Sequoia gigante',
    pt: 'Sequoia gigante',
    nl: 'Mammoetboom',
    sv: 'Jättesekvoja',
    da: 'Kæmpemammuttræ',
    no: 'Kjempesekvoia',
    fi: 'Jättiläispunapuu'
  },
  'spruce': {
    en: 'Spruce Tree',
    de: 'Fichte',
    fr: 'Épicéa',
    es: 'Picea',
    it: 'Abete rosso',
    pt: 'Abeto vermelho',
    nl: 'Spar',
    sv: 'Gran',
    da: 'Gran',
    no: 'Gran',
    fi: 'Kuusi'
  },
  'sycamore': {
    en: 'Sycamore Tree',
    de: 'Platane',
    fr: 'Platane',
    es: 'Sicómoro',
    it: 'Sicomoro',
    pt: 'Sicômoro',
    nl: 'Plataan',
    sv: 'Platan',
    da: 'Platan',
    no: 'Platan',
    fi: 'Plataani'
  },
  'walnut': {
    en: 'Walnut Tree',
    de: 'Walnussbaum',
    fr: 'Noyer',
    es: 'Nogal',
    it: 'Noce',
    pt: 'Nogueira',
    nl: 'Walnootboom',
    sv: 'Valnötsträd',
    da: 'Valnøddetræ',
    no: 'Valnøttre',
    fi: 'Saksanpähkinäpuu'
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
  console.log('Image Import Script: Trees');
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
