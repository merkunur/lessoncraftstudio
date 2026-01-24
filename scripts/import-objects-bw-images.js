const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'objects_bw',
  type: 'images',
  sourceFolderName: 'objects bw',
  displayNames: {
    en: 'Objects BW',
    de: 'Objekte SW',
    fr: 'Objets NB',
    es: 'Objetos BN',
    it: 'Oggetti BN',
    pt: 'Objetos PB',
    nl: 'Objecten ZW',
    sv: 'Objekt SV',
    da: 'Objekter SH',
    no: 'Objekter SH',
    fi: 'Esineet MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
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
  'blanket': {
    en: 'Blanket',
    de: 'Decke',
    fr: 'Couverture',
    es: 'Cobija',
    it: 'Coperta',
    pt: 'Cobertor',
    nl: 'Deken',
    sv: 'Filt',
    da: 'Tæppe',
    no: 'Teppe',
    fi: 'Peitto'
  },
  'bone': {
    en: 'Bone',
    de: 'Knochen',
    fr: 'Os',
    es: 'Hueso',
    it: 'Osso',
    pt: 'Osso',
    nl: 'Bot',
    sv: 'Ben',
    da: 'Knogle',
    no: 'Bein',
    fi: 'Luu'
  },
  'bottle': {
    en: 'Bottle',
    de: 'Flasche',
    fr: 'Bouteille',
    es: 'Botella',
    it: 'Bottiglia',
    pt: 'Garrafa',
    nl: 'Fles',
    sv: 'Flaska',
    da: 'Flaske',
    no: 'Flaske',
    fi: 'Pullo'
  },
  'bucket': {
    en: 'Bucket',
    de: 'Eimer',
    fr: 'Seau',
    es: 'Cubeta',
    it: 'Secchio',
    pt: 'Balde',
    nl: 'Emmer',
    sv: 'Hink',
    da: 'Spand',
    no: 'Bøtte',
    fi: 'Ämpäri'
  },
  'bulb': {
    en: 'Light Bulb',
    de: 'Glühbirne',
    fr: 'Ampoule',
    es: 'Foco',
    it: 'Lampadina',
    pt: 'Lâmpada',
    nl: 'Gloeilamp',
    sv: 'Glödlampa',
    da: 'Pære',
    no: 'Lyspære',
    fi: 'Lamppu'
  },
  'comb': {
    en: 'Comb',
    de: 'Kamm',
    fr: 'Peigne',
    es: 'Peine',
    it: 'Pettine',
    pt: 'Pente',
    nl: 'Kam',
    sv: 'Kam',
    da: 'Kam',
    no: 'Kam',
    fi: 'Kampa'
  },
  'globe': {
    en: 'Globe',
    de: 'Globus',
    fr: 'Globe',
    es: 'Globo terráqueo',
    it: 'Mappamondo',
    pt: 'Globo',
    nl: 'Wereldbol',
    sv: 'Jordglob',
    da: 'Globus',
    no: 'Globus',
    fi: 'Maapallo'
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
  'guitar': {
    en: 'Guitar',
    de: 'Gitarre',
    fr: 'Guitare',
    es: 'Guitarra',
    it: 'Chitarra',
    pt: 'Violão',
    nl: 'Gitaar',
    sv: 'Gitarr',
    da: 'Guitar',
    no: 'Gitar',
    fi: 'Kitara'
  },
  'hanger': {
    en: 'Hanger',
    de: 'Kleiderbügel',
    fr: 'Cintre',
    es: 'Gancho',
    it: 'Appendiabiti',
    pt: 'Cabide',
    nl: 'Kleerhanger',
    sv: 'Galge',
    da: 'Bøjle',
    no: 'Kleshenger',
    fi: 'Vaateripustin'
  },
  'hoodie': {
    en: 'Hoodie',
    de: 'Kapuzenpullover',
    fr: 'Sweat à capuche',
    es: 'Sudadera con capucha',
    it: 'Felpa con cappuccio',
    pt: 'Moletom com capuz',
    nl: 'Hoodie',
    sv: 'Huvtröja',
    da: 'Hættetrøje',
    no: 'Hettegenser',
    fi: 'Huppari'
  },
  'iron': {
    en: 'Iron',
    de: 'Bügeleisen',
    fr: 'Fer à repasser',
    es: 'Plancha',
    it: 'Ferro da stiro',
    pt: 'Ferro de passar',
    nl: 'Strijkijzer',
    sv: 'Strykjärn',
    da: 'Strygejern',
    no: 'Strykejern',
    fi: 'Silitysrauta'
  },
  'iron 2': {
    en: 'Iron 2',
    de: 'Bügeleisen 2',
    fr: 'Fer à repasser 2',
    es: 'Plancha 2',
    it: 'Ferro da stiro 2',
    pt: 'Ferro de passar 2',
    nl: 'Strijkijzer 2',
    sv: 'Strykjärn 2',
    da: 'Strygejern 2',
    no: 'Strykejern 2',
    fi: 'Silitysrauta 2'
  },
  'jacket': {
    en: 'Jacket',
    de: 'Jacke',
    fr: 'Veste',
    es: 'Chamarra',
    it: 'Giacca',
    pt: 'Jaqueta',
    nl: 'Jas',
    sv: 'Jacka',
    da: 'Jakke',
    no: 'Jakke',
    fi: 'Takki'
  },
  'jeans': {
    en: 'Jeans',
    de: 'Jeans',
    fr: 'Jean',
    es: 'Jeans',
    it: 'Jeans',
    pt: 'Jeans',
    nl: 'Spijkerbroek',
    sv: 'Jeans',
    da: 'Jeans',
    no: 'Jeans',
    fi: 'Farkut'
  },
  'kettle': {
    en: 'Kettle',
    de: 'Wasserkocher',
    fr: 'Bouilloire',
    es: 'Tetera',
    it: 'Bollitore',
    pt: 'Chaleira',
    nl: 'Waterkoker',
    sv: 'Vattenkokare',
    da: 'Elkedel',
    no: 'Vannkoker',
    fi: 'Vedenkeitin'
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
  'magnifying glass': {
    en: 'Magnifying Glass',
    de: 'Lupe',
    fr: 'Loupe',
    es: 'Lupa',
    it: 'Lente d\'ingrandimento',
    pt: 'Lupa',
    nl: 'Vergrootglas',
    sv: 'Förstoringsglas',
    da: 'Forstørrelsesglas',
    no: 'Forstørrelsesglass',
    fi: 'Suurennuslasi'
  },
  'medal': {
    en: 'Medal',
    de: 'Medaille',
    fr: 'Médaille',
    es: 'Medalla',
    it: 'Medaglia',
    pt: 'Medalha',
    nl: 'Medaille',
    sv: 'Medalj',
    da: 'Medalje',
    no: 'Medalje',
    fi: 'Mitali'
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
  'shoe': {
    en: 'Shoe',
    de: 'Schuh',
    fr: 'Chaussure',
    es: 'Zapato',
    it: 'Scarpa',
    pt: 'Sapato',
    nl: 'Schoen',
    sv: 'Sko',
    da: 'Sko',
    no: 'Sko',
    fi: 'Kenkä'
  },
  'shoes 2': {
    en: 'Shoes 2',
    de: 'Schuhe 2',
    fr: 'Chaussures 2',
    es: 'Zapatos 2',
    it: 'Scarpe 2',
    pt: 'Sapatos 2',
    nl: 'Schoenen 2',
    sv: 'Skor 2',
    da: 'Sko 2',
    no: 'Sko 2',
    fi: 'Kengät 2'
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
  'smartphone': {
    en: 'Smartphone',
    de: 'Smartphone',
    fr: 'Smartphone',
    es: 'Celular',
    it: 'Smartphone',
    pt: 'Celular',
    nl: 'Smartphone',
    sv: 'Smartphone',
    da: 'Smartphone',
    no: 'Smarttelefon',
    fi: 'Älypuhelin'
  },
  'sneaker': {
    en: 'Sneaker',
    de: 'Turnschuh',
    fr: 'Basket',
    es: 'Tenis',
    it: 'Sneaker',
    pt: 'Tênis',
    nl: 'Sneaker',
    sv: 'Sneaker',
    da: 'Sneaker',
    no: 'Joggesko',
    fi: 'Lenkkarit'
  },
  'sneakers': {
    en: 'Sneakers',
    de: 'Turnschuhe',
    fr: 'Baskets',
    es: 'Tenis',
    it: 'Sneakers',
    pt: 'Tênis',
    nl: 'Sneakers',
    sv: 'Sneakers',
    da: 'Sneakers',
    no: 'Joggesko',
    fi: 'Lenkkarit'
  },
  'spoon': {
    en: 'Spoon',
    de: 'Löffel',
    fr: 'Cuillère',
    es: 'Cuchara',
    it: 'Cucchiaio',
    pt: 'Colher',
    nl: 'Lepel',
    sv: 'Sked',
    da: 'Ske',
    no: 'Skje',
    fi: 'Lusikka'
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
  'telescope': {
    en: 'Telescope',
    de: 'Teleskop',
    fr: 'Télescope',
    es: 'Telescopio',
    it: 'Telescopio',
    pt: 'Telescópio',
    nl: 'Telescoop',
    sv: 'Teleskop',
    da: 'Teleskop',
    no: 'Teleskop',
    fi: 'Kaukoputki'
  },
  'toothbrush': {
    en: 'Toothbrush',
    de: 'Zahnbürste',
    fr: 'Brosse à dents',
    es: 'Cepillo de dientes',
    it: 'Spazzolino',
    pt: 'Escova de dentes',
    nl: 'Tandenborstel',
    sv: 'Tandborste',
    da: 'Tandbørste',
    no: 'Tannbørste',
    fi: 'Hammasharja'
  },
  'toothpaste': {
    en: 'Toothpaste',
    de: 'Zahnpasta',
    fr: 'Dentifrice',
    es: 'Pasta de dientes',
    it: 'Dentifricio',
    pt: 'Pasta de dente',
    nl: 'Tandpasta',
    sv: 'Tandkräm',
    da: 'Tandpasta',
    no: 'Tannkrem',
    fi: 'Hammastahna'
  },
  'vase': {
    en: 'Vase',
    de: 'Vase',
    fr: 'Vase',
    es: 'Florero',
    it: 'Vaso',
    pt: 'Vaso',
    nl: 'Vaas',
    sv: 'Vas',
    da: 'Vase',
    no: 'Vase',
    fi: 'Maljakko'
  },
  'whistle': {
    en: 'Whistle',
    de: 'Pfeife',
    fr: 'Sifflet',
    es: 'Silbato',
    it: 'Fischietto',
    pt: 'Apito',
    nl: 'Fluitje',
    sv: 'Visselpipa',
    da: 'Fløjte',
    no: 'Fløyte',
    fi: 'Pilli'
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
  console.log('Image Import Script: Objects BW');
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
