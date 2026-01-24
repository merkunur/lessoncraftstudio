/**
 * Import Script: Animals BW 3 (Black and White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-animals-bw-3-images.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Detect environment and set paths
const isServer = fs.existsSync('/opt/lessoncraftstudio');
let frontendRoot;

if (isServer) {
  frontendRoot = '/opt/lessoncraftstudio/frontend';
} else {
  frontendRoot = path.resolve(__dirname, '..', 'frontend');
}

process.chdir(frontendRoot);

// Load dependencies from frontend
const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const sharp = require(path.join(frontendRoot, 'node_modules', 'sharp'));

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION
// ============================================================

const THEME_CONFIG = {
  name: 'animals_bw_3',
  type: 'images',
  displayNames: {
    en: 'Animals BW 3',
    de: 'Tiere SW 3',
    fr: 'Animaux NB 3',
    es: 'Animales BN 3',
    it: 'Animali BN 3',
    pt: 'Animais PB 3',
    nl: 'Dieren ZW 3',
    sv: 'Djur SV 3',
    da: 'Dyr SH 3',
    no: 'Dyr SH 3',
    fi: 'Elaimet MV 3'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'alligator.png': {
    en: 'Alligator',
    de: 'Alligator',
    fr: 'Alligator',
    es: 'Caiman',
    it: 'Alligatore',
    pt: 'Jacare',
    nl: 'Alligator',
    sv: 'Alligator',
    da: 'Alligator',
    no: 'Alligator',
    fi: 'Alligaattori'
  },
  'alligator 2.png': {
    en: 'Alligator 2',
    de: 'Alligator 2',
    fr: 'Alligator 2',
    es: 'Caiman 2',
    it: 'Alligatore 2',
    pt: 'Jacare 2',
    nl: 'Alligator 2',
    sv: 'Alligator 2',
    da: 'Alligator 2',
    no: 'Alligator 2',
    fi: 'Alligaattori 2'
  },
  'bat.png': {
    en: 'Bat',
    de: 'Fledermaus',
    fr: 'Chauve-souris',
    es: 'Murcielago',
    it: 'Pipistrello',
    pt: 'Morcego',
    nl: 'Vleermuis',
    sv: 'Fladdermus',
    da: 'Flagermus',
    no: 'Flaggermus',
    fi: 'Lepakko'
  },
  'bee.png': {
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
    fi: 'Mehilainen'
  },
  'bee 2.png': {
    en: 'Bee 2',
    de: 'Biene 2',
    fr: 'Abeille 2',
    es: 'Abeja 2',
    it: 'Ape 2',
    pt: 'Abelha 2',
    nl: 'Bij 2',
    sv: 'Bi 2',
    da: 'Bi 2',
    no: 'Bie 2',
    fi: 'Mehilainen 2'
  },
  'bee 3.png': {
    en: 'Bee 3',
    de: 'Biene 3',
    fr: 'Abeille 3',
    es: 'Abeja 3',
    it: 'Ape 3',
    pt: 'Abelha 3',
    nl: 'Bij 3',
    sv: 'Bi 3',
    da: 'Bi 3',
    no: 'Bie 3',
    fi: 'Mehilainen 3'
  },
  'camel.png': {
    en: 'Camel',
    de: 'Kamel',
    fr: 'Chameau',
    es: 'Camello',
    it: 'Cammello',
    pt: 'Camelo',
    nl: 'Kameel',
    sv: 'Kamel',
    da: 'Kamel',
    no: 'Kamel',
    fi: 'Kameli'
  },
  'cat.png': {
    en: 'Cat',
    de: 'Katze',
    fr: 'Chat',
    es: 'Gato',
    it: 'Gatto',
    pt: 'Gato',
    nl: 'Kat',
    sv: 'Katt',
    da: 'Kat',
    no: 'Katt',
    fi: 'Kissa'
  },
  'cat 2.png': {
    en: 'Cat 2',
    de: 'Katze 2',
    fr: 'Chat 2',
    es: 'Gato 2',
    it: 'Gatto 2',
    pt: 'Gato 2',
    nl: 'Kat 2',
    sv: 'Katt 2',
    da: 'Kat 2',
    no: 'Katt 2',
    fi: 'Kissa 2'
  },
  'cat 3.png': {
    en: 'Cat 3',
    de: 'Katze 3',
    fr: 'Chat 3',
    es: 'Gato 3',
    it: 'Gatto 3',
    pt: 'Gato 3',
    nl: 'Kat 3',
    sv: 'Katt 3',
    da: 'Kat 3',
    no: 'Katt 3',
    fi: 'Kissa 3'
  },
  'chicken.png': {
    en: 'Chicken',
    de: 'Huhn',
    fr: 'Poulet',
    es: 'Pollo',
    it: 'Pollo',
    pt: 'Galinha',
    nl: 'Kip',
    sv: 'Kyckling',
    da: 'Kylling',
    no: 'Kylling',
    fi: 'Kana'
  },
  'cow.png': {
    en: 'Cow',
    de: 'Kuh',
    fr: 'Vache',
    es: 'Vaca',
    it: 'Mucca',
    pt: 'Vaca',
    nl: 'Koe',
    sv: 'Ko',
    da: 'Ko',
    no: 'Ku',
    fi: 'Lehma'
  },
  'cow 2.png': {
    en: 'Cow 2',
    de: 'Kuh 2',
    fr: 'Vache 2',
    es: 'Vaca 2',
    it: 'Mucca 2',
    pt: 'Vaca 2',
    nl: 'Koe 2',
    sv: 'Ko 2',
    da: 'Ko 2',
    no: 'Ku 2',
    fi: 'Lehma 2'
  },
  'cow 3.png': {
    en: 'Cow 3',
    de: 'Kuh 3',
    fr: 'Vache 3',
    es: 'Vaca 3',
    it: 'Mucca 3',
    pt: 'Vaca 3',
    nl: 'Koe 3',
    sv: 'Ko 3',
    da: 'Ko 3',
    no: 'Ku 3',
    fi: 'Lehma 3'
  },
  'crow.png': {
    en: 'Crow',
    de: 'Krahe',
    fr: 'Corbeau',
    es: 'Cuervo',
    it: 'Corvo',
    pt: 'Corvo',
    nl: 'Kraai',
    sv: 'Kraka',
    da: 'Krage',
    no: 'Krake',
    fi: 'Varis'
  },
  'deer.png': {
    en: 'Deer',
    de: 'Hirsch',
    fr: 'Cerf',
    es: 'Venado',
    it: 'Cervo',
    pt: 'Veado',
    nl: 'Hert',
    sv: 'Hjort',
    da: 'Hjort',
    no: 'Hjort',
    fi: 'Peura'
  },
  'dinosaur.png': {
    en: 'Dinosaur',
    de: 'Dinosaurier',
    fr: 'Dinosaure',
    es: 'Dinosaurio',
    it: 'Dinosauro',
    pt: 'Dinossauro',
    nl: 'Dinosaurus',
    sv: 'Dinosaurie',
    da: 'Dinosaur',
    no: 'Dinosaur',
    fi: 'Dinosaurus'
  },
  'dinosaur 2.png': {
    en: 'Dinosaur 2',
    de: 'Dinosaurier 2',
    fr: 'Dinosaure 2',
    es: 'Dinosaurio 2',
    it: 'Dinosauro 2',
    pt: 'Dinossauro 2',
    nl: 'Dinosaurus 2',
    sv: 'Dinosaurie 2',
    da: 'Dinosaur 2',
    no: 'Dinosaur 2',
    fi: 'Dinosaurus 2'
  },
  'dog.png': {
    en: 'Dog',
    de: 'Hund',
    fr: 'Chien',
    es: 'Perro',
    it: 'Cane',
    pt: 'Cachorro',
    nl: 'Hond',
    sv: 'Hund',
    da: 'Hund',
    no: 'Hund',
    fi: 'Koira'
  },
  'dolphin.png': {
    en: 'Dolphin',
    de: 'Delfin',
    fr: 'Dauphin',
    es: 'Delfin',
    it: 'Delfino',
    pt: 'Golfinho',
    nl: 'Dolfijn',
    sv: 'Delfin',
    da: 'Delfin',
    no: 'Delfin',
    fi: 'Delfiini'
  },
  'dolphin 2.png': {
    en: 'Dolphin 2',
    de: 'Delfin 2',
    fr: 'Dauphin 2',
    es: 'Delfin 2',
    it: 'Delfino 2',
    pt: 'Golfinho 2',
    nl: 'Dolfijn 2',
    sv: 'Delfin 2',
    da: 'Delfin 2',
    no: 'Delfin 2',
    fi: 'Delfiini 2'
  },
  'donkey.png': {
    en: 'Donkey',
    de: 'Esel',
    fr: 'Ane',
    es: 'Burro',
    it: 'Asino',
    pt: 'Burro',
    nl: 'Ezel',
    sv: 'Asna',
    da: 'Aesel',
    no: 'Esel',
    fi: 'Aasi'
  },
  'duck.png': {
    en: 'Duck',
    de: 'Ente',
    fr: 'Canard',
    es: 'Pato',
    it: 'Anatra',
    pt: 'Pato',
    nl: 'Eend',
    sv: 'Anka',
    da: 'And',
    no: 'And',
    fi: 'Ankka'
  },
  'elephant.png': {
    en: 'Elephant',
    de: 'Elefant',
    fr: 'Elephant',
    es: 'Elefante',
    it: 'Elefante',
    pt: 'Elefante',
    nl: 'Olifant',
    sv: 'Elefant',
    da: 'Elefant',
    no: 'Elefant',
    fi: 'Norsu'
  },
  'elephant 2.png': {
    en: 'Elephant 2',
    de: 'Elefant 2',
    fr: 'Elephant 2',
    es: 'Elefante 2',
    it: 'Elefante 2',
    pt: 'Elefante 2',
    nl: 'Olifant 2',
    sv: 'Elefant 2',
    da: 'Elefant 2',
    no: 'Elefant 2',
    fi: 'Norsu 2'
  },
  'fish.png': {
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
  'fish 2.png': {
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
  'frog.png': {
    en: 'Frog',
    de: 'Frosch',
    fr: 'Grenouille',
    es: 'Rana',
    it: 'Rana',
    pt: 'Sapo',
    nl: 'Kikker',
    sv: 'Groda',
    da: 'Fro',
    no: 'Frosk',
    fi: 'Sammakko'
  },
  'frog 2.png': {
    en: 'Frog 2',
    de: 'Frosch 2',
    fr: 'Grenouille 2',
    es: 'Rana 2',
    it: 'Rana 2',
    pt: 'Sapo 2',
    nl: 'Kikker 2',
    sv: 'Groda 2',
    da: 'Fro 2',
    no: 'Frosk 2',
    fi: 'Sammakko 2'
  },
  'giraffe.png': {
    en: 'Giraffe',
    de: 'Giraffe',
    fr: 'Girafe',
    es: 'Jirafa',
    it: 'Giraffa',
    pt: 'Girafa',
    nl: 'Giraffe',
    sv: 'Giraff',
    da: 'Giraf',
    no: 'Sjiraff',
    fi: 'Kirahvi'
  },
  'giraffe 2.png': {
    en: 'Giraffe 2',
    de: 'Giraffe 2',
    fr: 'Girafe 2',
    es: 'Jirafa 2',
    it: 'Giraffa 2',
    pt: 'Girafa 2',
    nl: 'Giraffe 2',
    sv: 'Giraff 2',
    da: 'Giraf 2',
    no: 'Sjiraff 2',
    fi: 'Kirahvi 2'
  },
  'hippopotamus.png': {
    en: 'Hippopotamus',
    de: 'Nilpferd',
    fr: 'Hippopotame',
    es: 'Hipopotamo',
    it: 'Ippopotamo',
    pt: 'Hipopotamo',
    nl: 'Nijlpaard',
    sv: 'Flodhast',
    da: 'Flodhest',
    no: 'Flodhest',
    fi: 'Virtahepo'
  },
  'hippopotamus 2.png': {
    en: 'Hippopotamus 2',
    de: 'Nilpferd 2',
    fr: 'Hippopotame 2',
    es: 'Hipopotamo 2',
    it: 'Ippopotamo 2',
    pt: 'Hipopotamo 2',
    nl: 'Nijlpaard 2',
    sv: 'Flodhast 2',
    da: 'Flodhest 2',
    no: 'Flodhest 2',
    fi: 'Virtahepo 2'
  },
  'horse.png': {
    en: 'Horse',
    de: 'Pferd',
    fr: 'Cheval',
    es: 'Caballo',
    it: 'Cavallo',
    pt: 'Cavalo',
    nl: 'Paard',
    sv: 'Hast',
    da: 'Hest',
    no: 'Hest',
    fi: 'Hevonen'
  },
  'horse 2.png': {
    en: 'Horse 2',
    de: 'Pferd 2',
    fr: 'Cheval 2',
    es: 'Caballo 2',
    it: 'Cavallo 2',
    pt: 'Cavalo 2',
    nl: 'Paard 2',
    sv: 'Hast 2',
    da: 'Hest 2',
    no: 'Hest 2',
    fi: 'Hevonen 2'
  },
  'jellyfish.png': {
    en: 'Jellyfish',
    de: 'Qualle',
    fr: 'Meduse',
    es: 'Medusa',
    it: 'Medusa',
    pt: 'Agua-viva',
    nl: 'Kwal',
    sv: 'Manet',
    da: 'Vandmand',
    no: 'Manet',
    fi: 'Meduusa'
  },
  'ladybug.png': {
    en: 'Ladybug',
    de: 'Marienkafer',
    fr: 'Coccinelle',
    es: 'Catarina',
    it: 'Coccinella',
    pt: 'Joaninha',
    nl: 'Lieveheersbeestje',
    sv: 'Nyckelpiga',
    da: 'Mariehone',
    no: 'Marihone',
    fi: 'Leppakerttu'
  },
  'lion.png': {
    en: 'Lion',
    de: 'Lowe',
    fr: 'Lion',
    es: 'Leon',
    it: 'Leone',
    pt: 'Leao',
    nl: 'Leeuw',
    sv: 'Lejon',
    da: 'Love',
    no: 'Love',
    fi: 'Leijona'
  },
  'lion 2.png': {
    en: 'Lion 2',
    de: 'Lowe 2',
    fr: 'Lion 2',
    es: 'Leon 2',
    it: 'Leone 2',
    pt: 'Leao 2',
    nl: 'Leeuw 2',
    sv: 'Lejon 2',
    da: 'Love 2',
    no: 'Love 2',
    fi: 'Leijona 2'
  },
  'monkey.png': {
    en: 'Monkey',
    de: 'Affe',
    fr: 'Singe',
    es: 'Mono',
    it: 'Scimmia',
    pt: 'Macaco',
    nl: 'Aap',
    sv: 'Apa',
    da: 'Abe',
    no: 'Ape',
    fi: 'Apina'
  },
  'mouse.png': {
    en: 'Mouse',
    de: 'Maus',
    fr: 'Souris',
    es: 'Raton',
    it: 'Topo',
    pt: 'Rato',
    nl: 'Muis',
    sv: 'Mus',
    da: 'Mus',
    no: 'Mus',
    fi: 'Hiiri'
  },
  'mouse 2.png': {
    en: 'Mouse 2',
    de: 'Maus 2',
    fr: 'Souris 2',
    es: 'Raton 2',
    it: 'Topo 2',
    pt: 'Rato 2',
    nl: 'Muis 2',
    sv: 'Mus 2',
    da: 'Mus 2',
    no: 'Mus 2',
    fi: 'Hiiri 2'
  },
  'mouse 3.png': {
    en: 'Mouse 3',
    de: 'Maus 3',
    fr: 'Souris 3',
    es: 'Raton 3',
    it: 'Topo 3',
    pt: 'Rato 3',
    nl: 'Muis 3',
    sv: 'Mus 3',
    da: 'Mus 3',
    no: 'Mus 3',
    fi: 'Hiiri 3'
  },
  'teddy bear 2.png': {
    en: 'Teddy Bear',
    de: 'Teddybar',
    fr: 'Ours en peluche',
    es: 'Osito de peluche',
    it: 'Orsacchiotto',
    pt: 'Ursinho de pelucia',
    nl: 'Teddybeer',
    sv: 'Nallebjorn',
    da: 'Bamse',
    no: 'Bamse',
    fi: 'Nallekarhu'
  }
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const randomStr = crypto.randomBytes(4).toString('hex');
  const baseName = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${baseName}-${timestamp}-${randomStr}.webp`;
}

async function optimizeImage(inputBuffer) {
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (metadata.format === 'svg') {
    return {
      buffer: inputBuffer,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: 'svg'
    };
  }

  let pipeline = image;
  if (metadata.width > 800 || metadata.height > 800) {
    pipeline = pipeline.resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  const outputBuffer = await pipeline.webp({ quality: 85 }).toBuffer();
  const outputMetadata = await sharp(outputBuffer).metadata();

  return {
    buffer: outputBuffer,
    width: outputMetadata.width,
    height: outputMetadata.height,
    format: 'webp'
  };
}

async function main() {
  console.log('='.repeat(60));
  console.log(`Image Import Script: ${THEME_CONFIG.displayNames.en}`);
  console.log('='.repeat(60));

  // Resolve paths
  let projectRoot, sourceDir, destDir;
  const sourceFolderName = 'animals bw 3';

  if (isServer) {
    projectRoot = '/opt/lessoncraftstudio';
    sourceDir = path.join(projectRoot, 'image library', sourceFolderName);
    destDir = path.join(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  } else {
    projectRoot = path.resolve(__dirname, '..');
    sourceDir = path.resolve(projectRoot, 'image library', sourceFolderName);
    destDir = path.resolve(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  }

  console.log(`\nSource: ${sourceDir}`);
  console.log(`Destination: ${destDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`\nERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created destination directory`);
  }

  try {
    // Step 1: Create or update theme
    console.log('\n--- Step 1: Creating/Updating Theme ---');

    let theme = await prisma.imageTheme.findFirst({
      where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
    });

    if (theme) {
      console.log(`Theme exists (id: ${theme.id}), updating...`);
      theme = await prisma.imageTheme.update({
        where: { id: theme.id },
        data: { displayNames: THEME_CONFIG.displayNames }
      });
    } else {
      theme = await prisma.imageTheme.create({
        data: {
          name: THEME_CONFIG.name,
          type: THEME_CONFIG.type,
          displayNames: THEME_CONFIG.displayNames,
          sortOrder: 0
        }
      });
      console.log(`Created new theme (id: ${theme.id})`);
    }

    // Step 2: Process images
    console.log('\n--- Step 2: Processing Images ---');

    const files = fs.readdirSync(sourceDir).filter(f =>
      /\.(png|jpg|jpeg|webp|svg)$/i.test(f)
    );

    console.log(`Found ${files.length} image files`);

    let successCount = 0, skipCount = 0, errorCount = 0;

    const maxSortOrder = await prisma.imageLibraryItem.aggregate({
      where: { themeId: theme.id },
      _max: { sortOrder: true }
    });
    let currentSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    for (const filename of files) {
      console.log(`\nProcessing: ${filename}`);

      const translations = IMAGE_TRANSLATIONS[filename];
      if (!translations) {
        console.log(`  WARNING: No translations for "${filename}", skipping`);
        skipCount++;
        continue;
      }

      try {
        const inputBuffer = fs.readFileSync(path.join(sourceDir, filename));
        const optimized = await optimizeImage(inputBuffer);
        const newFilename = generateUniqueFilename(filename);
        const destPath = path.join(destDir, newFilename);
        const relativeFilePath = `/images/${THEME_CONFIG.name}/${newFilename}`;

        fs.writeFileSync(destPath, optimized.buffer);
        console.log(`  Saved: ${newFilename} (${optimized.width}x${optimized.height})`);

        // Check if already exists
        const existing = await prisma.imageLibraryItem.findFirst({
          where: {
            themeId: theme.id,
            translations: { path: ['en'], equals: translations.en }
          }
        });

        if (existing) {
          await prisma.imageLibraryItem.update({
            where: { id: existing.id },
            data: {
              translations,
              filePath: relativeFilePath,
              filename: newFilename,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height
            }
          });
          console.log(`  Updated existing record`);
        } else {
          await prisma.imageLibraryItem.create({
            data: {
              themeId: theme.id,
              filename: newFilename,
              filePath: relativeFilePath,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height,
              translations,
              sortOrder: currentSortOrder++
            }
          });
          console.log(`  Created database record`);
        }

        successCount++;
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
        errorCount++;
      }
    }

    // Step 3: Sync to standalone
    if (isServer) {
      const standaloneDir = path.join(projectRoot, 'frontend', '.next', 'standalone', 'public', 'images', THEME_CONFIG.name);
      console.log(`\n--- Syncing to standalone build ---`);
      if (!fs.existsSync(standaloneDir)) {
        fs.mkdirSync(standaloneDir, { recursive: true });
      }
      const destFiles = fs.readdirSync(destDir);
      for (const file of destFiles) {
        fs.copyFileSync(path.join(destDir, file), path.join(standaloneDir, file));
      }
      console.log(`Copied ${destFiles.length} files to standalone`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
    console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  } catch (error) {
    console.error('\nFATAL ERROR:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
