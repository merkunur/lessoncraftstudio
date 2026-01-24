/**
 * Import Script: Body Parts Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-body-parts-images.js
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
// CONFIGURATION - BODY PARTS THEME
// ============================================================

const THEME_CONFIG = {
  name: 'body_parts',
  type: 'images',
  sourceFolderName: 'body parts',  // Actual folder name with space
  displayNames: {
    en: 'Body Parts',               // American English
    de: 'Körperteile',              // German
    fr: 'Parties du corps',         // French
    es: 'Partes del cuerpo',        // Mexican Spanish
    it: 'Parti del corpo',          // Italian
    pt: 'Partes do corpo',          // Brazilian Portuguese
    nl: 'Lichaamsdelen',            // Dutch
    sv: 'Kroppsdelar',              // Swedish
    da: 'Kropsdele',                // Danish
    no: 'Kroppsdeler',              // Norwegian
    fi: 'Ruumiinosat'               // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'ankle.png': {
    en: 'Ankle',                    // American English
    de: 'Knöchel',                  // German
    fr: 'Cheville',                 // French
    es: 'Tobillo',                  // Mexican Spanish
    it: 'Caviglia',                 // Italian
    pt: 'Tornozelo',                // Brazilian Portuguese
    nl: 'Enkel',                    // Dutch
    sv: 'Vrist',                    // Swedish
    da: 'Ankel',                    // Danish
    no: 'Ankel',                    // Norwegian
    fi: 'Nilkka'                    // Finnish
  },
  'arm.png': {
    en: 'Arm',                      // American English
    de: 'Arm',                      // German
    fr: 'Bras',                     // French
    es: 'Brazo',                    // Mexican Spanish
    it: 'Braccio',                  // Italian
    pt: 'Braço',                    // Brazilian Portuguese
    nl: 'Arm',                      // Dutch
    sv: 'Arm',                      // Swedish
    da: 'Arm',                      // Danish
    no: 'Arm',                      // Norwegian
    fi: 'Käsivarsi'                 // Finnish
  },
  'brain.png': {
    en: 'Brain',                    // American English
    de: 'Gehirn',                   // German
    fr: 'Cerveau',                  // French
    es: 'Cerebro',                  // Mexican Spanish
    it: 'Cervello',                 // Italian
    pt: 'Cérebro',                  // Brazilian Portuguese
    nl: 'Hersenen',                 // Dutch
    sv: 'Hjärna',                   // Swedish
    da: 'Hjerne',                   // Danish
    no: 'Hjerne',                   // Norwegian
    fi: 'Aivot'                     // Finnish
  },
  'cheeks.png': {
    en: 'Cheeks',                   // American English
    de: 'Wangen',                   // German
    fr: 'Joues',                    // French
    es: 'Mejillas',                 // Mexican Spanish
    it: 'Guance',                   // Italian
    pt: 'Bochechas',                // Brazilian Portuguese
    nl: 'Wangen',                   // Dutch
    sv: 'Kinder',                   // Swedish
    da: 'Kinder',                   // Danish
    no: 'Kinn',                     // Norwegian
    fi: 'Posket'                    // Finnish
  },
  'chin.png': {
    en: 'Chin',                     // American English
    de: 'Kinn',                     // German
    fr: 'Menton',                   // French
    es: 'Barbilla',                 // Mexican Spanish
    it: 'Mento',                    // Italian
    pt: 'Queixo',                   // Brazilian Portuguese
    nl: 'Kin',                      // Dutch
    sv: 'Haka',                     // Swedish
    da: 'Hage',                     // Danish
    no: 'Hake',                     // Norwegian
    fi: 'Leuka'                     // Finnish
  },
  'ear.png': {
    en: 'Ear',                      // American English
    de: 'Ohr',                      // German
    fr: 'Oreille',                  // French
    es: 'Oreja',                    // Mexican Spanish
    it: 'Orecchio',                 // Italian
    pt: 'Orelha',                   // Brazilian Portuguese
    nl: 'Oor',                      // Dutch
    sv: 'Öra',                      // Swedish
    da: 'Øre',                      // Danish
    no: 'Øre',                      // Norwegian
    fi: 'Korva'                     // Finnish
  },
  'elbow.png': {
    en: 'Elbow',                    // American English
    de: 'Ellbogen',                 // German
    fr: 'Coude',                    // French
    es: 'Codo',                     // Mexican Spanish
    it: 'Gomito',                   // Italian
    pt: 'Cotovelo',                 // Brazilian Portuguese
    nl: 'Elleboog',                 // Dutch
    sv: 'Armbåge',                  // Swedish
    da: 'Albue',                    // Danish
    no: 'Albue',                    // Norwegian
    fi: 'Kyynärpää'                 // Finnish
  },
  'eye.png': {
    en: 'Eye',                      // American English
    de: 'Auge',                     // German
    fr: 'Œil',                      // French
    es: 'Ojo',                      // Mexican Spanish
    it: 'Occhio',                   // Italian
    pt: 'Olho',                     // Brazilian Portuguese
    nl: 'Oog',                      // Dutch
    sv: 'Öga',                      // Swedish
    da: 'Øje',                      // Danish
    no: 'Øye',                      // Norwegian
    fi: 'Silmä'                     // Finnish
  },
  'eyebrow.png': {
    en: 'Eyebrow',                  // American English
    de: 'Augenbraue',               // German
    fr: 'Sourcil',                  // French
    es: 'Ceja',                     // Mexican Spanish
    it: 'Sopracciglio',             // Italian
    pt: 'Sobrancelha',              // Brazilian Portuguese
    nl: 'Wenkbrauw',                // Dutch
    sv: 'Ögonbryn',                 // Swedish
    da: 'Øjenbryn',                 // Danish
    no: 'Øyenbryn',                 // Norwegian
    fi: 'Kulmakarva'                // Finnish
  },
  'eyelashes.png': {
    en: 'Eyelashes',                // American English
    de: 'Wimpern',                  // German
    fr: 'Cils',                     // French
    es: 'Pestañas',                 // Mexican Spanish
    it: 'Ciglia',                   // Italian
    pt: 'Cílios',                   // Brazilian Portuguese
    nl: 'Wimpers',                  // Dutch
    sv: 'Ögonfransar',              // Swedish
    da: 'Øjenvipper',               // Danish
    no: 'Øyevipper',                // Norwegian
    fi: 'Silmäripset'               // Finnish
  },
  'face.png': {
    en: 'Face',                     // American English
    de: 'Gesicht',                  // German
    fr: 'Visage',                   // French
    es: 'Cara',                     // Mexican Spanish
    it: 'Viso',                     // Italian
    pt: 'Rosto',                    // Brazilian Portuguese
    nl: 'Gezicht',                  // Dutch
    sv: 'Ansikte',                  // Swedish
    da: 'Ansigt',                   // Danish
    no: 'Ansikt',                   // Norwegian
    fi: 'Kasvot'                    // Finnish
  },
  'finger.png': {
    en: 'Finger',                   // American English
    de: 'Finger',                   // German
    fr: 'Doigt',                    // French
    es: 'Dedo',                     // Mexican Spanish
    it: 'Dito',                     // Italian
    pt: 'Dedo',                     // Brazilian Portuguese
    nl: 'Vinger',                   // Dutch
    sv: 'Finger',                   // Swedish
    da: 'Finger',                   // Danish
    no: 'Finger',                   // Norwegian
    fi: 'Sormi'                     // Finnish
  },
  'foot.png': {
    en: 'Foot',                     // American English
    de: 'Fuß',                      // German
    fr: 'Pied',                     // French
    es: 'Pie',                      // Mexican Spanish
    it: 'Piede',                    // Italian
    pt: 'Pé',                       // Brazilian Portuguese
    nl: 'Voet',                     // Dutch
    sv: 'Fot',                      // Swedish
    da: 'Fod',                      // Danish
    no: 'Fot',                      // Norwegian
    fi: 'Jalka'                     // Finnish
  },
  'forehead.png': {
    en: 'Forehead',                 // American English
    de: 'Stirn',                    // German
    fr: 'Front',                    // French
    es: 'Frente',                   // Mexican Spanish
    it: 'Fronte',                   // Italian
    pt: 'Testa',                    // Brazilian Portuguese
    nl: 'Voorhoofd',                // Dutch
    sv: 'Panna',                    // Swedish
    da: 'Pande',                    // Danish
    no: 'Panne',                    // Norwegian
    fi: 'Otsa'                      // Finnish
  },
  'hair.png': {
    en: 'Hair',                     // American English
    de: 'Haare',                    // German
    fr: 'Cheveux',                  // French
    es: 'Cabello',                  // Mexican Spanish
    it: 'Capelli',                  // Italian
    pt: 'Cabelo',                   // Brazilian Portuguese
    nl: 'Haar',                     // Dutch
    sv: 'Hår',                      // Swedish
    da: 'Hår',                      // Danish
    no: 'Hår',                      // Norwegian
    fi: 'Hiukset'                   // Finnish
  },
  'hand.png': {
    en: 'Hand',                     // American English
    de: 'Hand',                     // German
    fr: 'Main',                     // French
    es: 'Mano',                     // Mexican Spanish
    it: 'Mano',                     // Italian
    pt: 'Mão',                      // Brazilian Portuguese
    nl: 'Hand',                     // Dutch
    sv: 'Hand',                     // Swedish
    da: 'Hånd',                     // Danish
    no: 'Hånd',                     // Norwegian
    fi: 'Käsi'                      // Finnish
  },
  'head.png': {
    en: 'Head',                     // American English
    de: 'Kopf',                     // German
    fr: 'Tête',                     // French
    es: 'Cabeza',                   // Mexican Spanish
    it: 'Testa',                    // Italian
    pt: 'Cabeça',                   // Brazilian Portuguese
    nl: 'Hoofd',                    // Dutch
    sv: 'Huvud',                    // Swedish
    da: 'Hoved',                    // Danish
    no: 'Hode',                     // Norwegian
    fi: 'Pää'                       // Finnish
  },
  'heart.png': {
    en: 'Heart',                    // American English
    de: 'Herz',                     // German
    fr: 'Cœur',                     // French
    es: 'Corazón',                  // Mexican Spanish
    it: 'Cuore',                    // Italian
    pt: 'Coração',                  // Brazilian Portuguese
    nl: 'Hart',                     // Dutch
    sv: 'Hjärta',                   // Swedish
    da: 'Hjerte',                   // Danish
    no: 'Hjerte',                   // Norwegian
    fi: 'Sydän'                     // Finnish
  },
  'heel.png': {
    en: 'Heel',                     // American English
    de: 'Ferse',                    // German
    fr: 'Talon',                    // French
    es: 'Talón',                    // Mexican Spanish
    it: 'Tallone',                  // Italian
    pt: 'Calcanhar',                // Brazilian Portuguese
    nl: 'Hiel',                     // Dutch
    sv: 'Häl',                      // Swedish
    da: 'Hæl',                      // Danish
    no: 'Hæl',                      // Norwegian
    fi: 'Kantapää'                  // Finnish
  },
  'knee.png': {
    en: 'Knee',                     // American English
    de: 'Knie',                     // German
    fr: 'Genou',                    // French
    es: 'Rodilla',                  // Mexican Spanish
    it: 'Ginocchio',                // Italian
    pt: 'Joelho',                   // Brazilian Portuguese
    nl: 'Knie',                     // Dutch
    sv: 'Knä',                      // Swedish
    da: 'Knæ',                      // Danish
    no: 'Kne',                      // Norwegian
    fi: 'Polvi'                     // Finnish
  },
  'leg.png': {
    en: 'Leg',                      // American English
    de: 'Bein',                     // German
    fr: 'Jambe',                    // French
    es: 'Pierna',                   // Mexican Spanish
    it: 'Gamba',                    // Italian
    pt: 'Perna',                    // Brazilian Portuguese
    nl: 'Been',                     // Dutch
    sv: 'Ben',                      // Swedish
    da: 'Ben',                      // Danish
    no: 'Bein',                     // Norwegian
    fi: 'Sääri'                     // Finnish
  },
  'lip.png': {
    en: 'Lip',                      // American English
    de: 'Lippe',                    // German
    fr: 'Lèvre',                    // French
    es: 'Labio',                    // Mexican Spanish
    it: 'Labbro',                   // Italian
    pt: 'Lábio',                    // Brazilian Portuguese
    nl: 'Lip',                      // Dutch
    sv: 'Läpp',                     // Swedish
    da: 'Læbe',                     // Danish
    no: 'Leppe',                    // Norwegian
    fi: 'Huuli'                     // Finnish
  },
  'mouth.png': {
    en: 'Mouth',                    // American English
    de: 'Mund',                     // German
    fr: 'Bouche',                   // French
    es: 'Boca',                     // Mexican Spanish
    it: 'Bocca',                    // Italian
    pt: 'Boca',                     // Brazilian Portuguese
    nl: 'Mond',                     // Dutch
    sv: 'Mun',                      // Swedish
    da: 'Mund',                     // Danish
    no: 'Munn',                     // Norwegian
    fi: 'Suu'                       // Finnish
  },
  'muscles.png': {
    en: 'Muscles',                  // American English
    de: 'Muskeln',                  // German
    fr: 'Muscles',                  // French
    es: 'Músculos',                 // Mexican Spanish
    it: 'Muscoli',                  // Italian
    pt: 'Músculos',                 // Brazilian Portuguese
    nl: 'Spieren',                  // Dutch
    sv: 'Muskler',                  // Swedish
    da: 'Muskler',                  // Danish
    no: 'Muskler',                  // Norwegian
    fi: 'Lihakset'                  // Finnish
  },
  'nail.png': {
    en: 'Nail',                     // American English
    de: 'Nagel',                    // German
    fr: 'Ongle',                    // French
    es: 'Uña',                      // Mexican Spanish
    it: 'Unghia',                   // Italian
    pt: 'Unha',                     // Brazilian Portuguese
    nl: 'Nagel',                    // Dutch
    sv: 'Nagel',                    // Swedish
    da: 'Negl',                     // Danish
    no: 'Negl',                     // Norwegian
    fi: 'Kynsi'                     // Finnish
  },
  'neck.png': {
    en: 'Neck',                     // American English
    de: 'Hals',                     // German
    fr: 'Cou',                      // French
    es: 'Cuello',                   // Mexican Spanish
    it: 'Collo',                    // Italian
    pt: 'Pescoço',                  // Brazilian Portuguese
    nl: 'Nek',                      // Dutch
    sv: 'Hals',                     // Swedish
    da: 'Hals',                     // Danish
    no: 'Nakke',                    // Norwegian
    fi: 'Kaula'                     // Finnish
  },
  'nose.png': {
    en: 'Nose',                     // American English
    de: 'Nase',                     // German
    fr: 'Nez',                      // French
    es: 'Nariz',                    // Mexican Spanish
    it: 'Naso',                     // Italian
    pt: 'Nariz',                    // Brazilian Portuguese
    nl: 'Neus',                     // Dutch
    sv: 'Näsa',                     // Swedish
    da: 'Næse',                     // Danish
    no: 'Nese',                     // Norwegian
    fi: 'Nenä'                      // Finnish
  },
  'shoulder.png': {
    en: 'Shoulder',                 // American English
    de: 'Schulter',                 // German
    fr: 'Épaule',                   // French
    es: 'Hombro',                   // Mexican Spanish
    it: 'Spalla',                   // Italian
    pt: 'Ombro',                    // Brazilian Portuguese
    nl: 'Schouder',                 // Dutch
    sv: 'Axel',                     // Swedish
    da: 'Skulder',                  // Danish
    no: 'Skulder',                  // Norwegian
    fi: 'Olkapää'                   // Finnish
  },
  'skeleton.png': {
    en: 'Skeleton',                 // American English
    de: 'Skelett',                  // German
    fr: 'Squelette',                // French
    es: 'Esqueleto',                // Mexican Spanish
    it: 'Scheletro',                // Italian
    pt: 'Esqueleto',                // Brazilian Portuguese
    nl: 'Skelet',                   // Dutch
    sv: 'Skelett',                  // Swedish
    da: 'Skelet',                   // Danish
    no: 'Skjelett',                 // Norwegian
    fi: 'Luuranko'                  // Finnish
  },
  'thumb.png': {
    en: 'Thumb',                    // American English
    de: 'Daumen',                   // German
    fr: 'Pouce',                    // French
    es: 'Pulgar',                   // Mexican Spanish
    it: 'Pollice',                  // Italian
    pt: 'Polegar',                  // Brazilian Portuguese
    nl: 'Duim',                     // Dutch
    sv: 'Tumme',                    // Swedish
    da: 'Tommelfinger',             // Danish
    no: 'Tommel',                   // Norwegian
    fi: 'Peukalo'                   // Finnish
  },
  'toe.png': {
    en: 'Toe',                      // American English
    de: 'Zeh',                      // German
    fr: 'Orteil',                   // French
    es: 'Dedo del pie',             // Mexican Spanish
    it: 'Dito del piede',           // Italian
    pt: 'Dedo do pé',               // Brazilian Portuguese
    nl: 'Teen',                     // Dutch
    sv: 'Tå',                       // Swedish
    da: 'Tå',                       // Danish
    no: 'Tå',                       // Norwegian
    fi: 'Varvas'                    // Finnish
  },
  'tongue.png': {
    en: 'Tongue',                   // American English
    de: 'Zunge',                    // German
    fr: 'Langue',                   // French
    es: 'Lengua',                   // Mexican Spanish
    it: 'Lingua',                   // Italian
    pt: 'Língua',                   // Brazilian Portuguese
    nl: 'Tong',                     // Dutch
    sv: 'Tunga',                    // Swedish
    da: 'Tunge',                    // Danish
    no: 'Tunge',                    // Norwegian
    fi: 'Kieli'                     // Finnish
  },
  'tooth.png': {
    en: 'Tooth',                    // American English
    de: 'Zahn',                     // German
    fr: 'Dent',                     // French
    es: 'Diente',                   // Mexican Spanish
    it: 'Dente',                    // Italian
    pt: 'Dente',                    // Brazilian Portuguese
    nl: 'Tand',                     // Dutch
    sv: 'Tand',                     // Swedish
    da: 'Tand',                     // Danish
    no: 'Tann',                     // Norwegian
    fi: 'Hammas'                    // Finnish
  },
  'wrist.png': {
    en: 'Wrist',                    // American English
    de: 'Handgelenk',               // German
    fr: 'Poignet',                  // French
    es: 'Muñeca',                   // Mexican Spanish
    it: 'Polso',                    // Italian
    pt: 'Pulso',                    // Brazilian Portuguese
    nl: 'Pols',                     // Dutch
    sv: 'Handled',                  // Swedish
    da: 'Håndled',                  // Danish
    no: 'Håndledd',                 // Norwegian
    fi: 'Ranne'                     // Finnish
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
