/**
 * Import Script: Beach BW 2 Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-beach-bw-2-images.js
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
  name: 'beach_bw_2',
  type: 'images',
  displayNames: {
    en: 'Beach BW 2',
    de: 'Strand SW 2',
    fr: 'Plage NB 2',
    es: 'Playa BN 2',
    it: 'Spiaggia BN 2',
    pt: 'Praia PB 2',
    nl: 'Strand ZW 2',
    sv: 'Strand SV 2',
    da: 'Strand SH 2',
    no: 'Strand SH 2',
    fi: 'Ranta MV 2'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'bag.png': {
    en: 'Bag',
    de: 'Tasche',
    fr: 'Sac',
    es: 'Bolsa',
    it: 'Borsa',
    pt: 'Bolsa',
    nl: 'Tas',
    sv: 'Väska',
    da: 'Taske',
    no: 'Veske',
    fi: 'Laukku'
  },
  'boat 2.png': {
    en: 'Boat',
    de: 'Boot',
    fr: 'Bateau',
    es: 'Bote',
    it: 'Barca',
    pt: 'Barco',
    nl: 'Boot',
    sv: 'Båt',
    da: 'Båd',
    no: 'Båt',
    fi: 'Vene'
  },
  'boat.png': {
    en: 'Boat',
    de: 'Boot',
    fr: 'Bateau',
    es: 'Bote',
    it: 'Barca',
    pt: 'Barco',
    nl: 'Boot',
    sv: 'Båt',
    da: 'Båd',
    no: 'Båt',
    fi: 'Vene'
  },
  'bucket.png': {
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
  'camera.png': {
    en: 'Camera',
    de: 'Kamera',
    fr: 'Appareil photo',
    es: 'Cámara',
    it: 'Macchina fotografica',
    pt: 'Câmera',
    nl: 'Camera',
    sv: 'Kamera',
    da: 'Kamera',
    no: 'Kamera',
    fi: 'Kamera'
  },
  'cocktail.png': {
    en: 'Cocktail',
    de: 'Cocktail',
    fr: 'Cocktail',
    es: 'Cóctel',
    it: 'Cocktail',
    pt: 'Coquetel',
    nl: 'Cocktail',
    sv: 'Cocktail',
    da: 'Cocktail',
    no: 'Cocktail',
    fi: 'Cocktail'
  },
  'crab.png': {
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
  'deck chair.png': {
    en: 'Deck Chair',
    de: 'Liegestuhl',
    fr: 'Transat',
    es: 'Silla de playa',
    it: 'Sdraio',
    pt: 'Cadeira de praia',
    nl: 'Ligstoel',
    sv: 'Solstol',
    da: 'Liggestol',
    no: 'Solstol',
    fi: 'Aurinkotuoli'
  },
  'flip flops.png': {
    en: 'Flip Flops',
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
  'inflatable ring.png': {
    en: 'Inflatable Ring',
    de: 'Schwimmring',
    fr: 'Bouée',
    es: 'Flotador',
    it: 'Ciambella gonfiabile',
    pt: 'Boia',
    nl: 'Zwemband',
    sv: 'Badring',
    da: 'Badering',
    no: 'Badring',
    fi: 'Uimarengas'
  },
  'island.png': {
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
  'lounger.png': {
    en: 'Lounger',
    de: 'Sonnenliege',
    fr: 'Bain de soleil',
    es: 'Tumbona',
    it: 'Lettino',
    pt: 'Espreguiçadeira',
    nl: 'Ligbed',
    sv: 'Solsäng',
    da: 'Solseng',
    no: 'Solseng',
    fi: 'Aurinkotuoli'
  },
  'sandcastle.png': {
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
  'seashell 2.png': {
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
  'seashell.png': {
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
  'shorts.png': {
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
  'signpost.png': {
    en: 'Signpost',
    de: 'Wegweiser',
    fr: 'Panneau indicateur',
    es: 'Letrero',
    it: 'Cartello',
    pt: 'Placa de sinalização',
    nl: 'Wegwijzer',
    sv: 'Vägvisare',
    da: 'Vejviser',
    no: 'Veiskilt',
    fi: 'Opastekyltti'
  },
  'snorkel.png': {
    en: 'Snorkel',
    de: 'Schnorchel',
    fr: 'Tuba',
    es: 'Snorkel',
    it: 'Boccaglio',
    pt: 'Snorkel',
    nl: 'Snorkel',
    sv: 'Snorkel',
    da: 'Snorkel',
    no: 'Snorkel',
    fi: 'Snorkkeli'
  },
  'suitcase.png': {
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
  'sunglasses.png': {
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
  'surfboard.png': {
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
  'tote bag.png': {
    en: 'Tote Bag',
    de: 'Tragetasche',
    fr: 'Cabas',
    es: 'Bolsa de mano',
    it: 'Borsa shopper',
    pt: 'Bolsa sacola',
    nl: 'Draagtas',
    sv: 'Tygkasse',
    da: 'Mulepose',
    no: 'Handlenett',
    fi: 'Kangaskassi'
  },
  'umbrella.png': {
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
  'watermelon.png': {
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
  const sourceFolderName = 'Beach BW 2';

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
