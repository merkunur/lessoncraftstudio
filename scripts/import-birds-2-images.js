/**
 * Import Script: Birds 2 Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-birds-2-images.js
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
// CONFIGURATION - BIRDS 2 THEME
// ============================================================

const THEME_CONFIG = {
  name: 'birds_2',
  type: 'images',
  sourceFolderName: 'birds 2',  // Actual folder name with space
  displayNames: {
    en: 'Birds 2',                  // American English
    de: 'Vögel 2',                  // German
    fr: 'Oiseaux 2',                // French
    es: 'Aves 2',                   // Mexican Spanish
    it: 'Uccelli 2',                // Italian
    pt: 'Pássaros 2',               // Brazilian Portuguese
    nl: 'Vogels 2',                 // Dutch
    sv: 'Fåglar 2',                 // Swedish
    da: 'Fugle 2',                  // Danish
    no: 'Fugler 2',                 // Norwegian
    fi: 'Linnut 2'                  // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'blue jay.png': {
    en: 'Blue Jay',                 // American English
    de: 'Blauhäher',                // German
    fr: 'Geai bleu',                // French
    es: 'Arrendajo azul',           // Mexican Spanish
    it: 'Ghiandaia azzurra',        // Italian
    pt: 'Gaio-azul',                // Brazilian Portuguese
    nl: 'Blauwe gaai',              // Dutch
    sv: 'Blåskrika',                // Swedish
    da: 'Blåskade',                 // Danish
    no: 'Blåskrike',                // Norwegian
    fi: 'Sinitöyhtönärhi'           // Finnish
  },
  'canary.png': {
    en: 'Canary',                   // American English
    de: 'Kanarienvogel',            // German
    fr: 'Canari',                   // French
    es: 'Canario',                  // Mexican Spanish
    it: 'Canarino',                 // Italian
    pt: 'Canário',                  // Brazilian Portuguese
    nl: 'Kanarie',                  // Dutch
    sv: 'Kanariefågel',             // Swedish
    da: 'Kanariefugl',              // Danish
    no: 'Kanarifugl',               // Norwegian
    fi: 'Kanarialintu'              // Finnish
  },
  'cardinal.png': {
    en: 'Cardinal',                 // American English
    de: 'Kardinal',                 // German
    fr: 'Cardinal',                 // French
    es: 'Cardenal',                 // Mexican Spanish
    it: 'Cardinale',                // Italian
    pt: 'Cardeal',                  // Brazilian Portuguese
    nl: 'Kardinaal',                // Dutch
    sv: 'Kardinal',                 // Swedish
    da: 'Kardinal',                 // Danish
    no: 'Kardinal',                 // Norwegian
    fi: 'Punakardinaali'            // Finnish
  },
  'chicken.png': {
    en: 'Chicken',                  // American English
    de: 'Huhn',                     // German
    fr: 'Poulet',                   // French
    es: 'Pollo',                    // Mexican Spanish
    it: 'Pollo',                    // Italian
    pt: 'Frango',                   // Brazilian Portuguese
    nl: 'Kip',                      // Dutch
    sv: 'Kyckling',                 // Swedish
    da: 'Kylling',                  // Danish
    no: 'Kylling',                  // Norwegian
    fi: 'Kana'                      // Finnish
  },
  'crane.png': {
    en: 'Crane',                    // American English
    de: 'Kranich',                  // German
    fr: 'Grue',                     // French
    es: 'Grulla',                   // Mexican Spanish
    it: 'Gru',                      // Italian
    pt: 'Grou',                     // Brazilian Portuguese
    nl: 'Kraanvogel',               // Dutch
    sv: 'Trana',                    // Swedish
    da: 'Trane',                    // Danish
    no: 'Trane',                    // Norwegian
    fi: 'Kurki'                     // Finnish
  },
  'crow.png': {
    en: 'Crow',                     // American English
    de: 'Krähe',                    // German
    fr: 'Corbeau',                  // French
    es: 'Cuervo',                   // Mexican Spanish
    it: 'Corvo',                    // Italian
    pt: 'Corvo',                    // Brazilian Portuguese
    nl: 'Kraai',                    // Dutch
    sv: 'Kråka',                    // Swedish
    da: 'Krage',                    // Danish
    no: 'Kråke',                    // Norwegian
    fi: 'Varis'                     // Finnish
  },
  'dove.png': {
    en: 'Dove',                     // American English
    de: 'Taube',                    // German
    fr: 'Colombe',                  // French
    es: 'Paloma',                   // Mexican Spanish
    it: 'Colomba',                  // Italian
    pt: 'Pomba',                    // Brazilian Portuguese
    nl: 'Duif',                     // Dutch
    sv: 'Duva',                     // Swedish
    da: 'Due',                      // Danish
    no: 'Due',                      // Norwegian
    fi: 'Kyyhky'                    // Finnish
  },
  'duck.png': {
    en: 'Duck',                     // American English
    de: 'Ente',                     // German
    fr: 'Canard',                   // French
    es: 'Pato',                     // Mexican Spanish
    it: 'Anatra',                   // Italian
    pt: 'Pato',                     // Brazilian Portuguese
    nl: 'Eend',                     // Dutch
    sv: 'Anka',                     // Swedish
    da: 'And',                      // Danish
    no: 'And',                      // Norwegian
    fi: 'Ankka'                     // Finnish
  },
  'eagle.png': {
    en: 'Eagle',                    // American English
    de: 'Adler',                    // German
    fr: 'Aigle',                    // French
    es: 'Águila',                   // Mexican Spanish
    it: 'Aquila',                   // Italian
    pt: 'Águia',                    // Brazilian Portuguese
    nl: 'Adelaar',                  // Dutch
    sv: 'Örn',                      // Swedish
    da: 'Ørn',                      // Danish
    no: 'Ørn',                      // Norwegian
    fi: 'Kotka'                     // Finnish
  },
  'falcon.png': {
    en: 'Falcon',                   // American English
    de: 'Falke',                    // German
    fr: 'Faucon',                   // French
    es: 'Halcón',                   // Mexican Spanish
    it: 'Falco',                    // Italian
    pt: 'Falcão',                   // Brazilian Portuguese
    nl: 'Valk',                     // Dutch
    sv: 'Falk',                     // Swedish
    da: 'Falk',                     // Danish
    no: 'Falk',                     // Norwegian
    fi: 'Haukka'                    // Finnish
  },
  'finch.png': {
    en: 'Finch',                    // American English
    de: 'Fink',                     // German
    fr: 'Pinson',                   // French
    es: 'Pinzón',                   // Mexican Spanish
    it: 'Fringuello',               // Italian
    pt: 'Tentilhão',                // Brazilian Portuguese
    nl: 'Vink',                     // Dutch
    sv: 'Fink',                     // Swedish
    da: 'Finke',                    // Danish
    no: 'Finke',                    // Norwegian
    fi: 'Peippo'                    // Finnish
  },
  'flamingo.png': {
    en: 'Flamingo',                 // American English
    de: 'Flamingo',                 // German
    fr: 'Flamant rose',             // French
    es: 'Flamenco',                 // Mexican Spanish
    it: 'Fenicottero',              // Italian
    pt: 'Flamingo',                 // Brazilian Portuguese
    nl: 'Flamingo',                 // Dutch
    sv: 'Flamingo',                 // Swedish
    da: 'Flamingo',                 // Danish
    no: 'Flamingo',                 // Norwegian
    fi: 'Flamingo'                  // Finnish
  },
  'goose.png': {
    en: 'Goose',                    // American English
    de: 'Gans',                     // German
    fr: 'Oie',                      // French
    es: 'Ganso',                    // Mexican Spanish
    it: 'Oca',                      // Italian
    pt: 'Ganso',                    // Brazilian Portuguese
    nl: 'Gans',                     // Dutch
    sv: 'Gås',                      // Swedish
    da: 'Gås',                      // Danish
    no: 'Gås',                      // Norwegian
    fi: 'Hanhi'                     // Finnish
  },
  'hawk.png': {
    en: 'Hawk',                     // American English
    de: 'Habicht',                  // German
    fr: 'Épervier',                 // French
    es: 'Gavilán',                  // Mexican Spanish
    it: 'Falco',                    // Italian
    pt: 'Gavião',                   // Brazilian Portuguese
    nl: 'Havik',                    // Dutch
    sv: 'Hök',                      // Swedish
    da: 'Høg',                      // Danish
    no: 'Hauk',                     // Norwegian
    fi: 'Haukka'                    // Finnish
  },
  'hen.png': {
    en: 'Hen',                      // American English
    de: 'Henne',                    // German
    fr: 'Poule',                    // French
    es: 'Gallina',                  // Mexican Spanish
    it: 'Gallina',                  // Italian
    pt: 'Galinha',                  // Brazilian Portuguese
    nl: 'Hen',                      // Dutch
    sv: 'Höna',                     // Swedish
    da: 'Høne',                     // Danish
    no: 'Høne',                     // Norwegian
    fi: 'Kana'                      // Finnish
  },
  'heron.png': {
    en: 'Heron',                    // American English
    de: 'Reiher',                   // German
    fr: 'Héron',                    // French
    es: 'Garza',                    // Mexican Spanish
    it: 'Airone',                   // Italian
    pt: 'Garça',                    // Brazilian Portuguese
    nl: 'Reiger',                   // Dutch
    sv: 'Häger',                    // Swedish
    da: 'Hejre',                    // Danish
    no: 'Hegre',                    // Norwegian
    fi: 'Haikara'                   // Finnish
  },
  'hummingbird.png': {
    en: 'Hummingbird',              // American English
    de: 'Kolibri',                  // German
    fr: 'Colibri',                  // French
    es: 'Colibrí',                  // Mexican Spanish
    it: 'Colibrì',                  // Italian
    pt: 'Beija-flor',               // Brazilian Portuguese
    nl: 'Kolibrie',                 // Dutch
    sv: 'Kolibri',                  // Swedish
    da: 'Kolibri',                  // Danish
    no: 'Kolibri',                  // Norwegian
    fi: 'Kolibri'                   // Finnish
  },
  'kingfisher.png': {
    en: 'Kingfisher',               // American English
    de: 'Eisvogel',                 // German
    fr: 'Martin-pêcheur',           // French
    es: 'Martín pescador',          // Mexican Spanish
    it: 'Martin pescatore',         // Italian
    pt: 'Martim-pescador',          // Brazilian Portuguese
    nl: 'IJsvogel',                 // Dutch
    sv: 'Kungsfiskare',             // Swedish
    da: 'Isfugl',                   // Danish
    no: 'Isfugl',                   // Norwegian
    fi: 'Kuningaskalastaja'         // Finnish
  },
  'macaw.png': {
    en: 'Macaw',                    // American English
    de: 'Ara',                      // German
    fr: 'Ara',                      // French
    es: 'Guacamayo',                // Mexican Spanish
    it: 'Ara',                      // Italian
    pt: 'Arara',                    // Brazilian Portuguese
    nl: 'Ara',                      // Dutch
    sv: 'Ara',                      // Swedish
    da: 'Ara',                      // Danish
    no: 'Ara',                      // Norwegian
    fi: 'Ara'                       // Finnish
  },
  'magpie.png': {
    en: 'Magpie',                   // American English
    de: 'Elster',                   // German
    fr: 'Pie',                      // French
    es: 'Urraca',                   // Mexican Spanish
    it: 'Gazza',                    // Italian
    pt: 'Pega',                     // Brazilian Portuguese
    nl: 'Ekster',                   // Dutch
    sv: 'Skata',                    // Swedish
    da: 'Skade',                    // Danish
    no: 'Skjære',                   // Norwegian
    fi: 'Harakka'                   // Finnish
  },
  'ostrich.png': {
    en: 'Ostrich',                  // American English
    de: 'Strauß',                   // German
    fr: 'Autruche',                 // French
    es: 'Avestruz',                 // Mexican Spanish
    it: 'Struzzo',                  // Italian
    pt: 'Avestruz',                 // Brazilian Portuguese
    nl: 'Struisvogel',              // Dutch
    sv: 'Struts',                   // Swedish
    da: 'Struds',                   // Danish
    no: 'Struts',                   // Norwegian
    fi: 'Strutsi'                   // Finnish
  },
  'owl.png': {
    en: 'Owl',                      // American English
    de: 'Eule',                     // German
    fr: 'Hibou',                    // French
    es: 'Búho',                     // Mexican Spanish
    it: 'Gufo',                     // Italian
    pt: 'Coruja',                   // Brazilian Portuguese
    nl: 'Uil',                      // Dutch
    sv: 'Uggla',                    // Swedish
    da: 'Ugle',                     // Danish
    no: 'Ugle',                     // Norwegian
    fi: 'Pöllö'                     // Finnish
  },
  'parrot.png': {
    en: 'Parrot',                   // American English
    de: 'Papagei',                  // German
    fr: 'Perroquet',                // French
    es: 'Loro',                     // Mexican Spanish
    it: 'Pappagallo',               // Italian
    pt: 'Papagaio',                 // Brazilian Portuguese
    nl: 'Papegaai',                 // Dutch
    sv: 'Papegoja',                 // Swedish
    da: 'Papegøje',                 // Danish
    no: 'Papegøye',                 // Norwegian
    fi: 'Papukaija'                 // Finnish
  },
  'peacock.png': {
    en: 'Peacock',                  // American English
    de: 'Pfau',                     // German
    fr: 'Paon',                     // French
    es: 'Pavo real',                // Mexican Spanish
    it: 'Pavone',                   // Italian
    pt: 'Pavão',                    // Brazilian Portuguese
    nl: 'Pauw',                     // Dutch
    sv: 'Påfågel',                  // Swedish
    da: 'Påfugl',                   // Danish
    no: 'Påfugl',                   // Norwegian
    fi: 'Riikinkukko'               // Finnish
  },
  'pelican.png': {
    en: 'Pelican',                  // American English
    de: 'Pelikan',                  // German
    fr: 'Pélican',                  // French
    es: 'Pelícano',                 // Mexican Spanish
    it: 'Pellicano',                // Italian
    pt: 'Pelicano',                 // Brazilian Portuguese
    nl: 'Pelikaan',                 // Dutch
    sv: 'Pelikan',                  // Swedish
    da: 'Pelikan',                  // Danish
    no: 'Pelikan',                  // Norwegian
    fi: 'Pelikaani'                 // Finnish
  },
  'penguin.png': {
    en: 'Penguin',                  // American English
    de: 'Pinguin',                  // German
    fr: 'Pingouin',                 // French
    es: 'Pingüino',                 // Mexican Spanish
    it: 'Pinguino',                 // Italian
    pt: 'Pinguim',                  // Brazilian Portuguese
    nl: 'Pinguïn',                  // Dutch
    sv: 'Pingvin',                  // Swedish
    da: 'Pingvin',                  // Danish
    no: 'Pingvin',                  // Norwegian
    fi: 'Pingviini'                 // Finnish
  },
  'pigeon.png': {
    en: 'Pigeon',                   // American English
    de: 'Taube',                    // German
    fr: 'Pigeon',                   // French
    es: 'Paloma',                   // Mexican Spanish
    it: 'Piccione',                 // Italian
    pt: 'Pombo',                    // Brazilian Portuguese
    nl: 'Duif',                     // Dutch
    sv: 'Duva',                     // Swedish
    da: 'Due',                      // Danish
    no: 'Due',                      // Norwegian
    fi: 'Kyyhkynen'                 // Finnish
  },
  'puffin.png': {
    en: 'Puffin',                   // American English
    de: 'Papageientaucher',         // German
    fr: 'Macareux',                 // French
    es: 'Frailecillo',              // Mexican Spanish
    it: 'Pulcinella di mare',       // Italian
    pt: 'Papagaio-do-mar',          // Brazilian Portuguese
    nl: 'Papegaaiduiker',           // Dutch
    sv: 'Lunnefågel',               // Swedish
    da: 'Lunde',                    // Danish
    no: 'Lundefugl',                // Norwegian
    fi: 'Lunni'                     // Finnish
  },
  'quail.png': {
    en: 'Quail',                    // American English
    de: 'Wachtel',                  // German
    fr: 'Caille',                   // French
    es: 'Codorniz',                 // Mexican Spanish
    it: 'Quaglia',                  // Italian
    pt: 'Codorna',                  // Brazilian Portuguese
    nl: 'Kwartel',                  // Dutch
    sv: 'Vaktel',                   // Swedish
    da: 'Vagtel',                   // Danish
    no: 'Vaktel',                   // Norwegian
    fi: 'Viiriäinen'                // Finnish
  },
  'robin.png': {
    en: 'Robin',                    // American English
    de: 'Rotkehlchen',              // German
    fr: 'Rouge-gorge',              // French
    es: 'Petirrojo',                // Mexican Spanish
    it: 'Pettirosso',               // Italian
    pt: 'Pisco-de-peito-ruivo',     // Brazilian Portuguese
    nl: 'Roodborst',                // Dutch
    sv: 'Rödhake',                  // Swedish
    da: 'Rødhals',                  // Danish
    no: 'Rødstrupe',                // Norwegian
    fi: 'Punarinta'                 // Finnish
  },
  'rooster.png': {
    en: 'Rooster',                  // American English
    de: 'Hahn',                     // German
    fr: 'Coq',                      // French
    es: 'Gallo',                    // Mexican Spanish
    it: 'Gallo',                    // Italian
    pt: 'Galo',                     // Brazilian Portuguese
    nl: 'Haan',                     // Dutch
    sv: 'Tupp',                     // Swedish
    da: 'Hane',                     // Danish
    no: 'Hane',                     // Norwegian
    fi: 'Kukko'                     // Finnish
  },
  'seagull.png': {
    en: 'Seagull',                  // American English
    de: 'Möwe',                     // German
    fr: 'Mouette',                  // French
    es: 'Gaviota',                  // Mexican Spanish
    it: 'Gabbiano',                 // Italian
    pt: 'Gaivota',                  // Brazilian Portuguese
    nl: 'Zeemeeuw',                 // Dutch
    sv: 'Fiskmås',                  // Swedish
    da: 'Måge',                     // Danish
    no: 'Måke',                     // Norwegian
    fi: 'Lokki'                     // Finnish
  },
  'sparrow.png': {
    en: 'Sparrow',                  // American English
    de: 'Spatz',                    // German
    fr: 'Moineau',                  // French
    es: 'Gorrión',                  // Mexican Spanish
    it: 'Passero',                  // Italian
    pt: 'Pardal',                   // Brazilian Portuguese
    nl: 'Mus',                      // Dutch
    sv: 'Sparv',                    // Swedish
    da: 'Spurv',                    // Danish
    no: 'Spurv',                    // Norwegian
    fi: 'Varpunen'                  // Finnish
  },
  'stork.png': {
    en: 'Stork',                    // American English
    de: 'Storch',                   // German
    fr: 'Cigogne',                  // French
    es: 'Cigüeña',                  // Mexican Spanish
    it: 'Cicogna',                  // Italian
    pt: 'Cegonha',                  // Brazilian Portuguese
    nl: 'Ooievaar',                 // Dutch
    sv: 'Stork',                    // Swedish
    da: 'Stork',                    // Danish
    no: 'Stork',                    // Norwegian
    fi: 'Haikara'                   // Finnish
  },
  'swallow.png': {
    en: 'Swallow',                  // American English
    de: 'Schwalbe',                 // German
    fr: 'Hirondelle',               // French
    es: 'Golondrina',               // Mexican Spanish
    it: 'Rondine',                  // Italian
    pt: 'Andorinha',                // Brazilian Portuguese
    nl: 'Zwaluw',                   // Dutch
    sv: 'Svala',                    // Swedish
    da: 'Svale',                    // Danish
    no: 'Svale',                    // Norwegian
    fi: 'Pääskynen'                 // Finnish
  },
  'swan.png': {
    en: 'Swan',                     // American English
    de: 'Schwan',                   // German
    fr: 'Cygne',                    // French
    es: 'Cisne',                    // Mexican Spanish
    it: 'Cigno',                    // Italian
    pt: 'Cisne',                    // Brazilian Portuguese
    nl: 'Zwaan',                    // Dutch
    sv: 'Svan',                     // Swedish
    da: 'Svane',                    // Danish
    no: 'Svane',                    // Norwegian
    fi: 'Joutsen'                   // Finnish
  },
  'toucan.png': {
    en: 'Toucan',                   // American English
    de: 'Tukan',                    // German
    fr: 'Toucan',                   // French
    es: 'Tucán',                    // Mexican Spanish
    it: 'Tucano',                   // Italian
    pt: 'Tucano',                   // Brazilian Portuguese
    nl: 'Toekan',                   // Dutch
    sv: 'Tukan',                    // Swedish
    da: 'Tukan',                    // Danish
    no: 'Tukan',                    // Norwegian
    fi: 'Tukaani'                   // Finnish
  },
  'turkey.png': {
    en: 'Turkey',                   // American English
    de: 'Truthahn',                 // German
    fr: 'Dinde',                    // French
    es: 'Guajolote',                // Mexican Spanish (Pavo is also used)
    it: 'Tacchino',                 // Italian
    pt: 'Peru',                     // Brazilian Portuguese
    nl: 'Kalkoen',                  // Dutch
    sv: 'Kalkon',                   // Swedish
    da: 'Kalkun',                   // Danish
    no: 'Kalkun',                   // Norwegian
    fi: 'Kalkkuna'                  // Finnish
  },
  'vulture.png': {
    en: 'Vulture',                  // American English
    de: 'Geier',                    // German
    fr: 'Vautour',                  // French
    es: 'Buitre',                   // Mexican Spanish
    it: 'Avvoltoio',                // Italian
    pt: 'Abutre',                   // Brazilian Portuguese
    nl: 'Gier',                     // Dutch
    sv: 'Gam',                      // Swedish
    da: 'Grib',                     // Danish
    no: 'Gribb',                    // Norwegian
    fi: 'Korppikotka'               // Finnish
  },
  'woodpecker.png': {
    en: 'Woodpecker',               // American English
    de: 'Specht',                   // German
    fr: 'Pic',                      // French
    es: 'Pájaro carpintero',        // Mexican Spanish
    it: 'Picchio',                  // Italian
    pt: 'Pica-pau',                 // Brazilian Portuguese
    nl: 'Specht',                   // Dutch
    sv: 'Hackspett',                // Swedish
    da: 'Spætte',                   // Danish
    no: 'Hakkespett',               // Norwegian
    fi: 'Tikka'                     // Finnish
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
  const sourceFolderName = THEME_CONFIG.sourceFolderName || THEME_CONFIG.displayNames.en;

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
