const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'household_bw',
  type: 'images',
  sourceFolderName: 'household bw',
  displayNames: {
    en: 'Household BW',
    de: 'Haushalt SW',
    fr: 'Ménage NB',
    es: 'Hogar BN',
    it: 'Casa BN',
    pt: 'Doméstico PB',
    nl: 'Huishouden ZW',
    sv: 'Hushåll SV',
    da: 'Husholdning SH',
    no: 'Husholdning SH',
    fi: 'Kotitalous MV'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'alarm clock': {
    en: 'Alarm Clock',
    de: 'Wecker',
    fr: 'Réveil',
    es: 'Despertador',
    it: 'Sveglia',
    pt: 'Despertador',
    nl: 'Wekker',
    sv: 'Väckarklocka',
    da: 'Vækkeur',
    no: 'Vekkerklokke',
    fi: 'Herätyskello'
  },
  'bathtub': {
    en: 'Bathtub',
    de: 'Badewanne',
    fr: 'Baignoire',
    es: 'Bañera',
    it: 'Vasca da bagno',
    pt: 'Banheira',
    nl: 'Badkuip',
    sv: 'Badkar',
    da: 'Badekar',
    no: 'Badekar',
    fi: 'Kylpyamme'
  },
  'bed': {
    en: 'Bed',
    de: 'Bett',
    fr: 'Lit',
    es: 'Cama',
    it: 'Letto',
    pt: 'Cama',
    nl: 'Bed',
    sv: 'Säng',
    da: 'Seng',
    no: 'Seng',
    fi: 'Sänky'
  },
  'blender': {
    en: 'Blender',
    de: 'Mixer',
    fr: 'Mixeur',
    es: 'Licuadora',
    it: 'Frullatore',
    pt: 'Liquidificador',
    nl: 'Blender',
    sv: 'Mixer',
    da: 'Blender',
    no: 'Blender',
    fi: 'Tehosekoitin'
  },
  'bookshelf': {
    en: 'Bookshelf',
    de: 'Bücherregal',
    fr: 'Bibliothèque',
    es: 'Librero',
    it: 'Libreria',
    pt: 'Estante de livros',
    nl: 'Boekenkast',
    sv: 'Bokhylla',
    da: 'Bogreol',
    no: 'Bokhylle',
    fi: 'Kirjahylly'
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
  'bowl': {
    en: 'Bowl',
    de: 'Schüssel',
    fr: 'Bol',
    es: 'Tazón',
    it: 'Ciotola',
    pt: 'Tigela',
    nl: 'Kom',
    sv: 'Skål',
    da: 'Skål',
    no: 'Bolle',
    fi: 'Kulho'
  },
  'broom': {
    en: 'Broom',
    de: 'Besen',
    fr: 'Balai',
    es: 'Escoba',
    it: 'Scopa',
    pt: 'Vassoura',
    nl: 'Bezem',
    sv: 'Kvast',
    da: 'Kost',
    no: 'Kost',
    fi: 'Luuta'
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
  'cabinet': {
    en: 'Cabinet',
    de: 'Schrank',
    fr: 'Armoire',
    es: 'Gabinete',
    it: 'Armadietto',
    pt: 'Armário',
    nl: 'Kast',
    sv: 'Skåp',
    da: 'Skab',
    no: 'Skap',
    fi: 'Kaappi'
  },
  'camera': {
    en: 'Camera',
    de: 'Kamera',
    fr: 'Appareil photo',
    es: 'Cámara',
    it: 'Fotocamera',
    pt: 'Câmera',
    nl: 'Camera',
    sv: 'Kamera',
    da: 'Kamera',
    no: 'Kamera',
    fi: 'Kamera'
  },
  'computer': {
    en: 'Computer',
    de: 'Computer',
    fr: 'Ordinateur',
    es: 'Computadora',
    it: 'Computer',
    pt: 'Computador',
    nl: 'Computer',
    sv: 'Dator',
    da: 'Computer',
    no: 'Datamaskin',
    fi: 'Tietokone'
  },
  'cup': {
    en: 'Cup',
    de: 'Tasse',
    fr: 'Tasse',
    es: 'Taza',
    it: 'Tazza',
    pt: 'Xícara',
    nl: 'Kopje',
    sv: 'Kopp',
    da: 'Kop',
    no: 'Kopp',
    fi: 'Kuppi'
  },
  'cup ': {
    en: 'Cup',
    de: 'Tasse',
    fr: 'Tasse',
    es: 'Taza',
    it: 'Tazza',
    pt: 'Xícara',
    nl: 'Kopje',
    sv: 'Kopp',
    da: 'Kop',
    no: 'Kopp',
    fi: 'Kuppi'
  },
  'curtain': {
    en: 'Curtain',
    de: 'Vorhang',
    fr: 'Rideau',
    es: 'Cortina',
    it: 'Tenda',
    pt: 'Cortina',
    nl: 'Gordijn',
    sv: 'Gardin',
    da: 'Gardin',
    no: 'Gardin',
    fi: 'Verho'
  },
  'desk lamp': {
    en: 'Desk Lamp',
    de: 'Schreibtischlampe',
    fr: 'Lampe de bureau',
    es: 'Lámpara de escritorio',
    it: 'Lampada da scrivania',
    pt: 'Luminária de mesa',
    nl: 'Bureaulamp',
    sv: 'Skrivbordslampa',
    da: 'Skrivebordslampe',
    no: 'Skrivebordslampe',
    fi: 'Pöytälamppu'
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
    fi: 'Karttapallo'
  },
  'hanger': {
    en: 'Hanger',
    de: 'Kleiderbügel',
    fr: 'Cintre',
    es: 'Gancho',
    it: 'Gruccia',
    pt: 'Cabide',
    nl: 'Kleerhanger',
    sv: 'Galge',
    da: 'Bøjle',
    no: 'Kleshenger',
    fi: 'Vaateripustin'
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
  'lamp': {
    en: 'Lamp',
    de: 'Lampe',
    fr: 'Lampe',
    es: 'Lámpara',
    it: 'Lampada',
    pt: 'Lâmpada',
    nl: 'Lamp',
    sv: 'Lampa',
    da: 'Lampe',
    no: 'Lampe',
    fi: 'Lamppu'
  },
  'light': {
    en: 'Light',
    de: 'Licht',
    fr: 'Lumière',
    es: 'Luz',
    it: 'Luce',
    pt: 'Luz',
    nl: 'Licht',
    sv: 'Ljus',
    da: 'Lys',
    no: 'Lys',
    fi: 'Valo'
  },
  'microwave': {
    en: 'Microwave',
    de: 'Mikrowelle',
    fr: 'Micro-ondes',
    es: 'Microondas',
    it: 'Microonde',
    pt: 'Micro-ondas',
    nl: 'Magnetron',
    sv: 'Mikrovågsugn',
    da: 'Mikroovn',
    no: 'Mikrobølgeovn',
    fi: 'Mikroaaltouuni'
  },
  'plant': {
    en: 'Plant',
    de: 'Pflanze',
    fr: 'Plante',
    es: 'Planta',
    it: 'Pianta',
    pt: 'Planta',
    nl: 'Plant',
    sv: 'Växt',
    da: 'Plante',
    no: 'Plante',
    fi: 'Kasvi'
  },
  'refrigerator': {
    en: 'Refrigerator',
    de: 'Kühlschrank',
    fr: 'Réfrigérateur',
    es: 'Refrigerador',
    it: 'Frigorifero',
    pt: 'Geladeira',
    nl: 'Koelkast',
    sv: 'Kylskåp',
    da: 'Køleskab',
    no: 'Kjøleskap',
    fi: 'Jääkaappi'
  },
  'sink': {
    en: 'Sink',
    de: 'Waschbecken',
    fr: 'Évier',
    es: 'Fregadero',
    it: 'Lavandino',
    pt: 'Pia',
    nl: 'Gootsteen',
    sv: 'Diskho',
    da: 'Vask',
    no: 'Vask',
    fi: 'Pesuallas'
  },
  'sofa': {
    en: 'Sofa',
    de: 'Sofa',
    fr: 'Canapé',
    es: 'Sofá',
    it: 'Divano',
    pt: 'Sofá',
    nl: 'Bank',
    sv: 'Soffa',
    da: 'Sofa',
    no: 'Sofa',
    fi: 'Sohva'
  },
  'speaker': {
    en: 'Speaker',
    de: 'Lautsprecher',
    fr: 'Haut-parleur',
    es: 'Bocina',
    it: 'Altoparlante',
    pt: 'Caixa de som',
    nl: 'Luidspreker',
    sv: 'Högtalare',
    da: 'Højttaler',
    no: 'Høyttaler',
    fi: 'Kaiutin'
  },
  'spray': {
    en: 'Spray',
    de: 'Sprühflasche',
    fr: 'Spray',
    es: 'Atomizador',
    it: 'Spray',
    pt: 'Spray',
    nl: 'Spray',
    sv: 'Sprayflaska',
    da: 'Spray',
    no: 'Spray',
    fi: 'Suihkepullo'
  },
  'tablet': {
    en: 'Tablet',
    de: 'Tablet',
    fr: 'Tablette',
    es: 'Tableta',
    it: 'Tablet',
    pt: 'Tablet',
    nl: 'Tablet',
    sv: 'Surfplatta',
    da: 'Tablet',
    no: 'Nettbrett',
    fi: 'Tabletti'
  },
  'telephone': {
    en: 'Telephone',
    de: 'Telefon',
    fr: 'Téléphone',
    es: 'Teléfono',
    it: 'Telefono',
    pt: 'Telefone',
    nl: 'Telefoon',
    sv: 'Telefon',
    da: 'Telefon',
    no: 'Telefon',
    fi: 'Puhelin'
  },
  'television': {
    en: 'Television',
    de: 'Fernseher',
    fr: 'Télévision',
    es: 'Televisión',
    it: 'Televisore',
    pt: 'Televisão',
    nl: 'Televisie',
    sv: 'TV',
    da: 'Fjernsyn',
    no: 'TV',
    fi: 'Televisio'
  },
  'toilet paper': {
    en: 'Toilet Paper',
    de: 'Toilettenpapier',
    fr: 'Papier toilette',
    es: 'Papel higiénico',
    it: 'Carta igienica',
    pt: 'Papel higiênico',
    nl: 'Toiletpapier',
    sv: 'Toalettpapper',
    da: 'Toiletpapir',
    no: 'Toalettpapir',
    fi: 'Vessapaperi'
  },
  'toilet': {
    en: 'Toilet',
    de: 'Toilette',
    fr: 'Toilettes',
    es: 'Inodoro',
    it: 'Gabinetto',
    pt: 'Vaso sanitário',
    nl: 'Toilet',
    sv: 'Toalett',
    da: 'Toilet',
    no: 'Toalett',
    fi: 'WC'
  },
  'towel': {
    en: 'Towel',
    de: 'Handtuch',
    fr: 'Serviette',
    es: 'Toalla',
    it: 'Asciugamano',
    pt: 'Toalha',
    nl: 'Handdoek',
    sv: 'Handduk',
    da: 'Håndklæde',
    no: 'Håndkle',
    fi: 'Pyyhe'
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
  'vacuum cleaner': {
    en: 'Vacuum Cleaner',
    de: 'Staubsauger',
    fr: 'Aspirateur',
    es: 'Aspiradora',
    it: 'Aspirapolvere',
    pt: 'Aspirador de pó',
    nl: 'Stofzuiger',
    sv: 'Dammsugare',
    da: 'Støvsuger',
    no: 'Støvsuger',
    fi: 'Pölynimuri'
  },
  'vanity': {
    en: 'Vanity',
    de: 'Schminktisch',
    fr: 'Coiffeuse',
    es: 'Tocador',
    it: 'Toeletta',
    pt: 'Penteadeira',
    nl: 'Kaptafel',
    sv: 'Sminkbord',
    da: 'Sminkebord',
    no: 'Sminkebord',
    fi: 'Meikkauspöytä'
  },
  'washing machine': {
    en: 'Washing Machine',
    de: 'Waschmaschine',
    fr: 'Machine à laver',
    es: 'Lavadora',
    it: 'Lavatrice',
    pt: 'Máquina de lavar',
    nl: 'Wasmachine',
    sv: 'Tvättmaskin',
    da: 'Vaskemaskine',
    no: 'Vaskemaskin',
    fi: 'Pesukone'
  },
  'window': {
    en: 'Window',
    de: 'Fenster',
    fr: 'Fenêtre',
    es: 'Ventana',
    it: 'Finestra',
    pt: 'Janela',
    nl: 'Raam',
    sv: 'Fönster',
    da: 'Vindue',
    no: 'Vindu',
    fi: 'Ikkuna'
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
  console.log('Image Import Script: Household BW');
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
