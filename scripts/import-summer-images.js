const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'summer',
  type: 'images',
  sourceFolderName: 'summer',
  displayNames: {
    en: 'Summer',
    de: 'Sommer',
    fr: 'Été',
    es: 'Verano',
    it: 'Estate',
    pt: 'Verão',
    nl: 'Zomer',
    sv: 'Sommar',
    da: 'Sommer',
    no: 'Sommer',
    fi: 'Kesä'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'barbecue': {
    en: 'Barbecue',
    de: 'Grill',
    fr: 'Barbecue',
    es: 'Parrilla',
    it: 'Barbecue',
    pt: 'Churrasqueira',
    nl: 'Barbecue',
    sv: 'Grill',
    da: 'Grill',
    no: 'Grill',
    fi: 'Grilli'
  },
  'beach ball': {
    en: 'Beach Ball',
    de: 'Wasserball',
    fr: 'Ballon de plage',
    es: 'Pelota de playa',
    it: 'Pallone da spiaggia',
    pt: 'Bola de praia',
    nl: 'Strandbal',
    sv: 'Badboll',
    da: 'Badebold',
    no: 'Badeball',
    fi: 'Rantapallo'
  },
  'beach': {
    en: 'Beach',
    de: 'Strand',
    fr: 'Plage',
    es: 'Playa',
    it: 'Spiaggia',
    pt: 'Praia',
    nl: 'Strand',
    sv: 'Strand',
    da: 'Strand',
    no: 'Strand',
    fi: 'Ranta'
  },
  'bucket': {
    en: 'Bucket',
    de: 'Eimer',
    fr: 'Seau',
    es: 'Cubeta',
    it: 'Secchiello',
    pt: 'Balde',
    nl: 'Emmer',
    sv: 'Hink',
    da: 'Spand',
    no: 'Bøtte',
    fi: 'Ämpäri'
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
  'campfire': {
    en: 'Campfire',
    de: 'Lagerfeuer',
    fr: 'Feu de camp',
    es: 'Fogata',
    it: 'Falò',
    pt: 'Fogueira',
    nl: 'Kampvuur',
    sv: 'Lägereld',
    da: 'Lejrbål',
    no: 'Leirbål',
    fi: 'Nuotio'
  },
  'cap': {
    en: 'Cap',
    de: 'Mütze',
    fr: 'Casquette',
    es: 'Gorra',
    it: 'Cappellino',
    pt: 'Boné',
    nl: 'Pet',
    sv: 'Keps',
    da: 'Kasket',
    no: 'Caps',
    fi: 'Lippalakki'
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
  'flip-flops': {
    en: 'Flip-Flops',
    de: 'Flip-Flops',
    fr: 'Tongs',
    es: 'Chanclas',
    it: 'Infradito',
    pt: 'Chinelos',
    nl: 'Slippers',
    sv: 'Flip-flops',
    da: 'Klipklapper',
    no: 'Flip-flops',
    fi: 'Varvassandaalit'
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
  'hot dog': {
    en: 'Hot Dog',
    de: 'Hotdog',
    fr: 'Hot-dog',
    es: 'Hot dog',
    it: 'Hot dog',
    pt: 'Cachorro-quente',
    nl: 'Hotdog',
    sv: 'Korv med bröd',
    da: 'Hotdog',
    no: 'Pølse i brød',
    fi: 'Hodari'
  },
  'ice cream': {
    en: 'Ice Cream',
    de: 'Eiscreme',
    fr: 'Glace',
    es: 'Helado',
    it: 'Gelato',
    pt: 'Sorvete',
    nl: 'IJsje',
    sv: 'Glass',
    da: 'Is',
    no: 'Iskrem',
    fi: 'Jäätelö'
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
  'ladybug': {
    en: 'Ladybug',
    de: 'Marienkäfer',
    fr: 'Coccinelle',
    es: 'Catarina',
    it: 'Coccinella',
    pt: 'Joaninha',
    nl: 'Lieveheersbeestje',
    sv: 'Nyckelpiga',
    da: 'Mariehøne',
    no: 'Marihøne',
    fi: 'Leppäkerttu'
  },
  'lemonade': {
    en: 'Lemonade',
    de: 'Limonade',
    fr: 'Limonade',
    es: 'Limonada',
    it: 'Limonata',
    pt: 'Limonada',
    nl: 'Limonade',
    sv: 'Lemonad',
    da: 'Lemonade',
    no: 'Limonade',
    fi: 'Limonadi'
  },
  'life jacket': {
    en: 'Life Jacket',
    de: 'Schwimmweste',
    fr: 'Gilet de sauvetage',
    es: 'Chaleco salvavidas',
    it: 'Giubbotto di salvataggio',
    pt: 'Colete salva-vidas',
    nl: 'Zwemvest',
    sv: 'Flytväst',
    da: 'Redningsvest',
    no: 'Redningsvest',
    fi: 'Pelastusliivi'
  },
  'palm tree': {
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
  'pineapple': {
    en: 'Pineapple',
    de: 'Ananas',
    fr: 'Ananas',
    es: 'Piña',
    it: 'Ananas',
    pt: 'Abacaxi',
    nl: 'Ananas',
    sv: 'Ananas',
    da: 'Ananas',
    no: 'Ananas',
    fi: 'Ananas'
  },
  'pool': {
    en: 'Pool',
    de: 'Schwimmbad',
    fr: 'Piscine',
    es: 'Alberca',
    it: 'Piscina',
    pt: 'Piscina',
    nl: 'Zwembad',
    sv: 'Pool',
    da: 'Swimmingpool',
    no: 'Svømmebasseng',
    fi: 'Uima-allas'
  },
  'popsicle': {
    en: 'Popsicle',
    de: 'Eis am Stiel',
    fr: 'Sucette glacée',
    es: 'Paleta',
    it: 'Ghiacciolo',
    pt: 'Picolé',
    nl: 'IJslolly',
    sv: 'Isglass',
    da: 'Ispind',
    no: 'Ispinne',
    fi: 'Jäätelöpuikko'
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
  'sand': {
    en: 'Sand',
    de: 'Sand',
    fr: 'Sable',
    es: 'Arena',
    it: 'Sabbia',
    pt: 'Areia',
    nl: 'Zand',
    sv: 'Sand',
    da: 'Sand',
    no: 'Sand',
    fi: 'Hiekka'
  },
  'sandals': {
    en: 'Sandals',
    de: 'Sandalen',
    fr: 'Sandales',
    es: 'Sandalias',
    it: 'Sandali',
    pt: 'Sandálias',
    nl: 'Sandalen',
    sv: 'Sandaler',
    da: 'Sandaler',
    no: 'Sandaler',
    fi: 'Sandaalit'
  },
  'sandcastle': {
    en: 'Sandcastle',
    de: 'Sandburg',
    fr: 'Château de sable',
    es: 'Castillo de arena',
    it: 'Castello di sabbia',
    pt: 'Castelo de areia',
    nl: 'Zandkasteel',
    sv: 'Sandslott',
    da: 'Sandslot',
    no: 'Sandslott',
    fi: 'Hiekkalinna'
  },
  'seashell': {
    en: 'Seashell',
    de: 'Muschel',
    fr: 'Coquillage',
    es: 'Concha',
    it: 'Conchiglia',
    pt: 'Concha',
    nl: 'Schelp',
    sv: 'Snäcka',
    da: 'Musling',
    no: 'Skjell',
    fi: 'Simpukka'
  },
  'shorts': {
    en: 'Shorts',
    de: 'Shorts',
    fr: 'Short',
    es: 'Shorts',
    it: 'Pantaloncini',
    pt: 'Shorts',
    nl: 'Korte broek',
    sv: 'Shorts',
    da: 'Shorts',
    no: 'Shorts',
    fi: 'Shortsit'
  },
  'spade': {
    en: 'Spade',
    de: 'Schaufel',
    fr: 'Pelle',
    es: 'Pala',
    it: 'Paletta',
    pt: 'Pá',
    nl: 'Schepje',
    sv: 'Spade',
    da: 'Skovl',
    no: 'Spade',
    fi: 'Lapio'
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
  'strawberry': {
    en: 'Strawberry',
    de: 'Erdbeere',
    fr: 'Fraise',
    es: 'Fresa',
    it: 'Fragola',
    pt: 'Morango',
    nl: 'Aardbei',
    sv: 'Jordgubbe',
    da: 'Jordbær',
    no: 'Jordbær',
    fi: 'Mansikka'
  },
  'sun hat': {
    en: 'Sun Hat',
    de: 'Sonnenhut',
    fr: 'Chapeau de soleil',
    es: 'Sombrero de sol',
    it: 'Cappello da sole',
    pt: 'Chapéu de sol',
    nl: 'Zonnehoed',
    sv: 'Solhatt',
    da: 'Solhat',
    no: 'Solhatt',
    fi: 'Aurinkohattu'
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
  'surfboard': {
    en: 'Surfboard',
    de: 'Surfbrett',
    fr: 'Planche de surf',
    es: 'Tabla de surf',
    it: 'Tavola da surf',
    pt: 'Prancha de surf',
    nl: 'Surfplank',
    sv: 'Surfbräda',
    da: 'Surfbræt',
    no: 'Surfebrett',
    fi: 'Surffilauta'
  },
  'swimming': {
    en: 'Swimming',
    de: 'Schwimmen',
    fr: 'Natation',
    es: 'Natación',
    it: 'Nuoto',
    pt: 'Natação',
    nl: 'Zwemmen',
    sv: 'Simning',
    da: 'Svømning',
    no: 'Svømming',
    fi: 'Uinti'
  },
  'swimsuit': {
    en: 'Swimsuit',
    de: 'Badeanzug',
    fr: 'Maillot de bain',
    es: 'Traje de baño',
    it: 'Costume da bagno',
    pt: 'Maiô',
    nl: 'Badpak',
    sv: 'Baddräkt',
    da: 'Badedragt',
    no: 'Badedrakt',
    fi: 'Uimapuku'
  },
  't-shirt': {
    en: 'T-Shirt',
    de: 'T-Shirt',
    fr: 'T-shirt',
    es: 'Camiseta',
    it: 'Maglietta',
    pt: 'Camiseta',
    nl: 'T-shirt',
    sv: 'T-shirt',
    da: 'T-shirt',
    no: 'T-skjorte',
    fi: 'T-paita'
  },
  'tent': {
    en: 'Tent',
    de: 'Zelt',
    fr: 'Tente',
    es: 'Tienda de campaña',
    it: 'Tenda',
    pt: 'Barraca',
    nl: 'Tent',
    sv: 'Tält',
    da: 'Telt',
    no: 'Telt',
    fi: 'Teltta'
  },
  'umbrella': {
    en: 'Umbrella',
    de: 'Sonnenschirm',
    fr: 'Parasol',
    es: 'Sombrilla',
    it: 'Ombrellone',
    pt: 'Guarda-sol',
    nl: 'Parasol',
    sv: 'Parasoll',
    da: 'Parasol',
    no: 'Parasoll',
    fi: 'Aurinkovarjo'
  },
  'watermelon': {
    en: 'Watermelon',
    de: 'Wassermelone',
    fr: 'Pastèque',
    es: 'Sandía',
    it: 'Anguria',
    pt: 'Melancia',
    nl: 'Watermeloen',
    sv: 'Vattenmelon',
    da: 'Vandmelon',
    no: 'Vannmelon',
    fi: 'Vesimeloni'
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
  console.log('Image Import Script: Summer');
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
