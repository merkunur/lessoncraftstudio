const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'sea_life_bw',
  type: 'images',
  sourceFolderName: 'sea life bw',
  displayNames: {
    en: 'Sea Life BW',
    de: 'Meeresleben SW',
    fr: 'Vie marine NB',
    es: 'Vida marina BN',
    it: 'Vita marina BN',
    pt: 'Vida marinha PB',
    nl: 'Zeeleven ZW',
    sv: 'Havsliv SV',
    da: 'Havliv SH',
    no: 'Havliv SH',
    fi: 'Merielämä MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'clown fish': {
    en: 'Clownfish',
    de: 'Clownfisch',
    fr: 'Poisson-clown',
    es: 'Pez payaso',
    it: 'Pesce pagliaccio',
    pt: 'Peixe-palhaço',
    nl: 'Clownvis',
    sv: 'Clownfisk',
    da: 'Klovnfisk',
    no: 'Klovnefisk',
    fi: 'Vuokkokala'
  },
  'crab': {
    en: 'Crab',
    de: 'Krabbe',
    fr: 'Crabe',
    es: 'Cangrejo',
    it: 'Granchio',
    pt: 'Caranguejo',
    nl: 'Krab',
    sv: 'Krabba',
    da: 'Krabbe',
    no: 'Krabbe',
    fi: 'Rapu'
  },
  'dolphin': {
    en: 'Dolphin',
    de: 'Delfin',
    fr: 'Dauphin',
    es: 'Delfín',
    it: 'Delfino',
    pt: 'Golfinho',
    nl: 'Dolfijn',
    sv: 'Delfin',
    da: 'Delfin',
    no: 'Delfin',
    fi: 'Delfiini'
  },
  'fish': {
    en: 'Fish',
    de: 'Fisch',
    fr: 'Poisson',
    es: 'Pez',
    it: 'Pesce',
    pt: 'Peixe',
    nl: 'Vis',
    sv: 'Fisk',
    da: 'Fisk',
    no: 'Fisk',
    fi: 'Kala'
  },
  'fish 2': {
    en: 'Fish 2',
    de: 'Fisch 2',
    fr: 'Poisson 2',
    es: 'Pez 2',
    it: 'Pesce 2',
    pt: 'Peixe 2',
    nl: 'Vis 2',
    sv: 'Fisk 2',
    da: 'Fisk 2',
    no: 'Fisk 2',
    fi: 'Kala 2'
  },
  'fish 3': {
    en: 'Fish 3',
    de: 'Fisch 3',
    fr: 'Poisson 3',
    es: 'Pez 3',
    it: 'Pesce 3',
    pt: 'Peixe 3',
    nl: 'Vis 3',
    sv: 'Fisk 3',
    da: 'Fisk 3',
    no: 'Fisk 3',
    fi: 'Kala 3'
  },
  'jellyfish': {
    en: 'Jellyfish',
    de: 'Qualle',
    fr: 'Méduse',
    es: 'Medusa',
    it: 'Medusa',
    pt: 'Água-viva',
    nl: 'Kwal',
    sv: 'Manet',
    da: 'Vandmand',
    no: 'Manet',
    fi: 'Meduusa'
  },
  'lobster': {
    en: 'Lobster',
    de: 'Hummer',
    fr: 'Homard',
    es: 'Langosta',
    it: 'Aragosta',
    pt: 'Lagosta',
    nl: 'Kreeft',
    sv: 'Hummer',
    da: 'Hummer',
    no: 'Hummer',
    fi: 'Hummeri'
  },
  'narwhal': {
    en: 'Narwhal',
    de: 'Narwal',
    fr: 'Narval',
    es: 'Narval',
    it: 'Narvalo',
    pt: 'Narval',
    nl: 'Narwal',
    sv: 'Narval',
    da: 'Narhval',
    no: 'Narhval',
    fi: 'Sarvivalas'
  },
  'octopus': {
    en: 'Octopus',
    de: 'Oktopus',
    fr: 'Pieuvre',
    es: 'Pulpo',
    it: 'Polpo',
    pt: 'Polvo',
    nl: 'Octopus',
    sv: 'Bläckfisk',
    da: 'Blæksprutte',
    no: 'Blekksprut',
    fi: 'Mustekala'
  },
  'orca': {
    en: 'Orca',
    de: 'Orca',
    fr: 'Orque',
    es: 'Orca',
    it: 'Orca',
    pt: 'Orca',
    nl: 'Orka',
    sv: 'Späckhuggare',
    da: 'Spækhugger',
    no: 'Spekkhogger',
    fi: 'Miekkavalas'
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
  'pufferfish': {
    en: 'Pufferfish',
    de: 'Kugelfisch',
    fr: 'Poisson-globe',
    es: 'Pez globo',
    it: 'Pesce palla',
    pt: 'Baiacu',
    nl: 'Kogelvis',
    sv: 'Blåsfisk',
    da: 'Kuglefisk',
    no: 'Kulefisk',
    fi: 'Pallokala'
  },
  'seahorse': {
    en: 'Seahorse',
    de: 'Seepferdchen',
    fr: 'Hippocampe',
    es: 'Caballito de mar',
    it: 'Cavalluccio marino',
    pt: 'Cavalo-marinho',
    nl: 'Zeepaardje',
    sv: 'Sjöhäst',
    da: 'Søhest',
    no: 'Sjøhest',
    fi: 'Merihevonen'
  },
  'shark': {
    en: 'Shark',
    de: 'Hai',
    fr: 'Requin',
    es: 'Tiburón',
    it: 'Squalo',
    pt: 'Tubarão',
    nl: 'Haai',
    sv: 'Haj',
    da: 'Haj',
    no: 'Hai',
    fi: 'Hai'
  },
  'squid': {
    en: 'Squid',
    de: 'Tintenfisch',
    fr: 'Calmar',
    es: 'Calamar',
    it: 'Calamaro',
    pt: 'Lula',
    nl: 'Inktvis',
    sv: 'Bläckfisk',
    da: 'Blæksprutte',
    no: 'Blekksprut',
    fi: 'Kalmari'
  },
  'starfish': {
    en: 'Starfish',
    de: 'Seestern',
    fr: 'Étoile de mer',
    es: 'Estrella de mar',
    it: 'Stella marina',
    pt: 'Estrela-do-mar',
    nl: 'Zeester',
    sv: 'Sjöstjärna',
    da: 'Søstjerne',
    no: 'Sjøstjerne',
    fi: 'Meritähti'
  },
  'stingray': {
    en: 'Stingray',
    de: 'Stachelrochen',
    fr: 'Raie pastenague',
    es: 'Mantarraya',
    it: 'Pastinaca',
    pt: 'Arraia',
    nl: 'Pijlstaartrog',
    sv: 'Spjutrocka',
    da: 'Pilrokke',
    no: 'Piggrokke',
    fi: 'Keihäsrausku'
  },
  'swordfish': {
    en: 'Swordfish',
    de: 'Schwertfisch',
    fr: 'Espadon',
    es: 'Pez espada',
    it: 'Pesce spada',
    pt: 'Peixe-espada',
    nl: 'Zwaardvis',
    sv: 'Svärdfisk',
    da: 'Sværdfisk',
    no: 'Sverdfisk',
    fi: 'Miekkakala'
  },
  'turtle': {
    en: 'Sea Turtle',
    de: 'Meeresschildkröte',
    fr: 'Tortue de mer',
    es: 'Tortuga marina',
    it: 'Tartaruga marina',
    pt: 'Tartaruga marinha',
    nl: 'Zeeschildpad',
    sv: 'Havssköldpadda',
    da: 'Havskildpadde',
    no: 'Havskilpadde',
    fi: 'Merikilpikonna'
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
  },
  'whale': {
    en: 'Whale',
    de: 'Wal',
    fr: 'Baleine',
    es: 'Ballena',
    it: 'Balena',
    pt: 'Baleia',
    nl: 'Walvis',
    sv: 'Val',
    da: 'Hval',
    no: 'Hval',
    fi: 'Valas'
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
  console.log('Image Import Script: Sea Life BW');
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
