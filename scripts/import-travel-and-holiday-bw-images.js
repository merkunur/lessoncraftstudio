const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'travel_and_holiday_bw',
  type: 'images',
  sourceFolderName: 'travel and holiday bw',
  displayNames: {
    en: 'Travel and Holiday BW',
    de: 'Reisen und Urlaub SW',
    fr: 'Voyages et Vacances NB',
    es: 'Viajes y Vacaciones BN',
    it: 'Viaggi e Vacanze BN',
    pt: 'Viagens e Férias PB',
    nl: 'Reizen en Vakantie ZW',
    sv: 'Resor och Semester SV',
    da: 'Rejser og Ferie SH',
    no: 'Reiser og Ferie SH',
    fi: 'Matkailu ja Loma MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'airplane': {
    en: 'Airplane',
    de: 'Flugzeug',
    fr: 'Avion',
    es: 'Avión',
    it: 'Aeroplano',
    pt: 'Avião',
    nl: 'Vliegtuig',
    sv: 'Flygplan',
    da: 'Fly',
    no: 'Fly',
    fi: 'Lentokone'
  },
  'backpack': {
    en: 'Backpack',
    de: 'Rucksack',
    fr: 'Sac à dos',
    es: 'Mochila',
    it: 'Zaino',
    pt: 'Mochila',
    nl: 'Rugzak',
    sv: 'Ryggsäck',
    da: 'Rygsæk',
    no: 'Ryggsekk',
    fi: 'Reppu'
  },
  'binoculars': {
    en: 'Binoculars',
    de: 'Fernglas',
    fr: 'Jumelles',
    es: 'Binoculares',
    it: 'Binocolo',
    pt: 'Binóculos',
    nl: 'Verrekijker',
    sv: 'Kikare',
    da: 'Kikkert',
    no: 'Kikkert',
    fi: 'Kiikari'
  },
  'bus': {
    en: 'Bus',
    de: 'Bus',
    fr: 'Bus',
    es: 'Autobús',
    it: 'Autobus',
    pt: 'Ônibus',
    nl: 'Bus',
    sv: 'Buss',
    da: 'Bus',
    no: 'Buss',
    fi: 'Bussi'
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
  'cable car': {
    en: 'Cable Car',
    de: 'Seilbahn',
    fr: 'Téléphérique',
    es: 'Teleférico',
    it: 'Funivia',
    pt: 'Teleférico',
    nl: 'Kabelbaan',
    sv: 'Linbana',
    da: 'Svævebane',
    no: 'Taubane',
    fi: 'Köysirata'
  },
  'camp': {
    en: 'Camp',
    de: 'Lager',
    fr: 'Camp',
    es: 'Campamento',
    it: 'Campo',
    pt: 'Acampamento',
    nl: 'Kamp',
    sv: 'Läger',
    da: 'Lejr',
    no: 'Leir',
    fi: 'Leiri'
  },
  'camper': {
    en: 'Camper',
    de: 'Wohnmobil',
    fr: 'Camping-car',
    es: 'Casa rodante',
    it: 'Camper',
    pt: 'Trailer',
    nl: 'Camper',
    sv: 'Husbil',
    da: 'Autocamper',
    no: 'Bobil',
    fi: 'Matkailuauto'
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
  'car': {
    en: 'Car',
    de: 'Auto',
    fr: 'Voiture',
    es: 'Carro',
    it: 'Automobile',
    pt: 'Carro',
    nl: 'Auto',
    sv: 'Bil',
    da: 'Bil',
    no: 'Bil',
    fi: 'Auto'
  },
  'cruise': {
    en: 'Cruise Ship',
    de: 'Kreuzfahrtschiff',
    fr: 'Bateau de croisière',
    es: 'Crucero',
    it: 'Nave da crociera',
    pt: 'Navio de cruzeiro',
    nl: 'Cruiseschip',
    sv: 'Kryssningsfartyg',
    da: 'Krydstogtskib',
    no: 'Cruiseskip',
    fi: 'Risteilyalus'
  },
  'double-decker': {
    en: 'Double-Decker Bus',
    de: 'Doppeldeckerbus',
    fr: 'Bus à impériale',
    es: 'Autobús de dos pisos',
    it: 'Autobus a due piani',
    pt: 'Ônibus de dois andares',
    nl: 'Dubbeldekker',
    sv: 'Dubbeldäckare',
    da: 'Dobbeltdækkerbus',
    no: 'Dobbeldekkerbuss',
    fi: 'Kaksikerrosbussi'
  },
  'food': {
    en: 'Food',
    de: 'Essen',
    fr: 'Nourriture',
    es: 'Comida',
    it: 'Cibo',
    pt: 'Comida',
    nl: 'Eten',
    sv: 'Mat',
    da: 'Mad',
    no: 'Mat',
    fi: 'Ruoka'
  },
  'gas pump': {
    en: 'Gas Pump',
    de: 'Zapfsäule',
    fr: 'Pompe à essence',
    es: 'Bomba de gasolina',
    it: 'Pompa di benzina',
    pt: 'Bomba de gasolina',
    nl: 'Benzinepomp',
    sv: 'Bensinpump',
    da: 'Benzinstander',
    no: 'Bensinpumpe',
    fi: 'Bensiinipumppu'
  },
  'globe': {
    en: 'Globe',
    de: 'Globus',
    fr: 'Globe',
    es: 'Globo terráqueo',
    it: 'Mappamondo',
    pt: 'Globo',
    nl: 'Globe',
    sv: 'Jordglob',
    da: 'Globus',
    no: 'Globus',
    fi: 'Maapallo'
  },
  'hat': {
    en: 'Hat',
    de: 'Hut',
    fr: 'Chapeau',
    es: 'Sombrero',
    it: 'Cappello',
    pt: 'Chapéu',
    nl: 'Hoed',
    sv: 'Hatt',
    da: 'Hat',
    no: 'Hatt',
    fi: 'Hattu'
  },
  'hotel': {
    en: 'Hotel',
    de: 'Hotel',
    fr: 'Hôtel',
    es: 'Hotel',
    it: 'Hotel',
    pt: 'Hotel',
    nl: 'Hotel',
    sv: 'Hotell',
    da: 'Hotel',
    no: 'Hotell',
    fi: 'Hotelli'
  },
  'island': {
    en: 'Island',
    de: 'Insel',
    fr: 'Île',
    es: 'Isla',
    it: 'Isola',
    pt: 'Ilha',
    nl: 'Eiland',
    sv: 'Ö',
    da: 'Ø',
    no: 'Øy',
    fi: 'Saari'
  },
  'kayak': {
    en: 'Kayak',
    de: 'Kajak',
    fr: 'Kayak',
    es: 'Kayak',
    it: 'Kayak',
    pt: 'Caiaque',
    nl: 'Kajak',
    sv: 'Kajak',
    da: 'Kajak',
    no: 'Kajakk',
    fi: 'Kajakki'
  },
  'lighthouse': {
    en: 'Lighthouse',
    de: 'Leuchtturm',
    fr: 'Phare',
    es: 'Faro',
    it: 'Faro',
    pt: 'Farol',
    nl: 'Vuurtoren',
    sv: 'Fyr',
    da: 'Fyrtårn',
    no: 'Fyrtårn',
    fi: 'Majakka'
  },
  'lightning': {
    en: 'Lightning',
    de: 'Blitz',
    fr: 'Éclair',
    es: 'Relámpago',
    it: 'Fulmine',
    pt: 'Relâmpago',
    nl: 'Bliksem',
    sv: 'Blixt',
    da: 'Lyn',
    no: 'Lyn',
    fi: 'Salama'
  },
  'log cabin': {
    en: 'Log Cabin',
    de: 'Blockhütte',
    fr: 'Cabane en rondins',
    es: 'Cabaña de troncos',
    it: 'Capanna di tronchi',
    pt: 'Cabana de madeira',
    nl: 'Blokhut',
    sv: 'Timmerstuga',
    da: 'Bjælkehytte',
    no: 'Tømmerhytte',
    fi: 'Hirsimökki'
  },
  'lounge': {
    en: 'Lounge Chair',
    de: 'Liegestuhl',
    fr: 'Chaise longue',
    es: 'Silla de playa',
    it: 'Sdraio',
    pt: 'Espreguiçadeira',
    nl: 'Ligstoel',
    sv: 'Solstol',
    da: 'Liggestol',
    no: 'Solstol',
    fi: 'Aurinkotuoli'
  },
  'map': {
    en: 'Map',
    de: 'Karte',
    fr: 'Carte',
    es: 'Mapa',
    it: 'Mappa',
    pt: 'Mapa',
    nl: 'Kaart',
    sv: 'Karta',
    da: 'Kort',
    no: 'Kart',
    fi: 'Kartta'
  },
  'mountain': {
    en: 'Mountain',
    de: 'Berg',
    fr: 'Montagne',
    es: 'Montaña',
    it: 'Montagna',
    pt: 'Montanha',
    nl: 'Berg',
    sv: 'Berg',
    da: 'Bjerg',
    no: 'Fjell',
    fi: 'Vuori'
  },
  'museum': {
    en: 'Museum',
    de: 'Museum',
    fr: 'Musée',
    es: 'Museo',
    it: 'Museo',
    pt: 'Museu',
    nl: 'Museum',
    sv: 'Museum',
    da: 'Museum',
    no: 'Museum',
    fi: 'Museo'
  },
  'passport': {
    en: 'Passport',
    de: 'Reisepass',
    fr: 'Passeport',
    es: 'Pasaporte',
    it: 'Passaporto',
    pt: 'Passaporte',
    nl: 'Paspoort',
    sv: 'Pass',
    da: 'Pas',
    no: 'Pass',
    fi: 'Passi'
  },
  'scuba diving': {
    en: 'Scuba Diving',
    de: 'Tauchen',
    fr: 'Plongée sous-marine',
    es: 'Buceo',
    it: 'Immersione subacquea',
    pt: 'Mergulho',
    nl: 'Duiken',
    sv: 'Dykning',
    da: 'Dykning',
    no: 'Dykking',
    fi: 'Sukellus'
  },
  'shopping cart': {
    en: 'Shopping Cart',
    de: 'Einkaufswagen',
    fr: 'Chariot de courses',
    es: 'Carrito de compras',
    it: 'Carrello della spesa',
    pt: 'Carrinho de compras',
    nl: 'Winkelwagen',
    sv: 'Kundvagn',
    da: 'Indkøbsvogn',
    no: 'Handlevogn',
    fi: 'Ostoskärry'
  },
  'signpost': {
    en: 'Signpost',
    de: 'Wegweiser',
    fr: 'Panneau indicateur',
    es: 'Señalización',
    it: 'Cartello stradale',
    pt: 'Placa de sinalização',
    nl: 'Wegwijzer',
    sv: 'Vägvisare',
    da: 'Vejviser',
    no: 'Veiskilt',
    fi: 'Tienviitta'
  },
  'stage': {
    en: 'Stage',
    de: 'Bühne',
    fr: 'Scène',
    es: 'Escenario',
    it: 'Palcoscenico',
    pt: 'Palco',
    nl: 'Podium',
    sv: 'Scen',
    da: 'Scene',
    no: 'Scene',
    fi: 'Lava'
  },
  'suitcase': {
    en: 'Suitcase',
    de: 'Koffer',
    fr: 'Valise',
    es: 'Maleta',
    it: 'Valigia',
    pt: 'Mala',
    nl: 'Koffer',
    sv: 'Resväska',
    da: 'Kuffert',
    no: 'Koffert',
    fi: 'Matkalaukku'
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
  'sunrise': {
    en: 'Sunrise',
    de: 'Sonnenaufgang',
    fr: 'Lever du soleil',
    es: 'Amanecer',
    it: 'Alba',
    pt: 'Nascer do sol',
    nl: 'Zonsopgang',
    sv: 'Soluppgång',
    da: 'Solopgang',
    no: 'Soloppgang',
    fi: 'Auringonnousu'
  },
  'taxi': {
    en: 'Taxi',
    de: 'Taxi',
    fr: 'Taxi',
    es: 'Taxi',
    it: 'Taxi',
    pt: 'Táxi',
    nl: 'Taxi',
    sv: 'Taxi',
    da: 'Taxa',
    no: 'Drosje',
    fi: 'Taksi'
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
  'ticket': {
    en: 'Ticket',
    de: 'Ticket',
    fr: 'Billet',
    es: 'Boleto',
    it: 'Biglietto',
    pt: 'Passagem',
    nl: 'Ticket',
    sv: 'Biljett',
    da: 'Billet',
    no: 'Billett',
    fi: 'Lippu'
  },
  'train': {
    en: 'Train',
    de: 'Zug',
    fr: 'Train',
    es: 'Tren',
    it: 'Treno',
    pt: 'Trem',
    nl: 'Trein',
    sv: 'Tåg',
    da: 'Tog',
    no: 'Tog',
    fi: 'Juna'
  },
  'yacht': {
    en: 'Yacht',
    de: 'Jacht',
    fr: 'Yacht',
    es: 'Yate',
    it: 'Yacht',
    pt: 'Iate',
    nl: 'Jacht',
    sv: 'Yacht',
    da: 'Yacht',
    no: 'Yacht',
    fi: 'Jahti'
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
  console.log('Image Import Script: Travel and Holiday BW');
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
