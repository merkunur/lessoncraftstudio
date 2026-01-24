/**
 * Import Script: Apparel BW Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-apparel-bw-images.js
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
  name: 'apparel_bw',
  type: 'images',
  displayNames: {
    en: 'Apparel BW',
    de: 'Kleidung SW',
    fr: 'Vetements NB',
    es: 'Ropa BN',
    it: 'Abbigliamento BN',
    pt: 'Vestuario PB',
    nl: 'Kleding ZW',
    sv: 'Klader SV',
    da: 'Toj SH',
    no: 'Klaer SH',
    fi: 'Vaatteet MV'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'baby overall.png': {
    en: 'Baby Overall',
    de: 'Baby-Overall',
    fr: 'Salopette bebe',
    es: 'Overol de bebe',
    it: 'Tutina neonato',
    pt: 'Macacao de bebe',
    nl: 'Baby-overall',
    sv: 'Babyoverall',
    da: 'Baby-overall',
    no: 'Baby-overall',
    fi: 'Vauvan haalari'
  },
  "baby's onesie.png": {
    en: "Baby's Onesie",
    de: 'Baby-Strampler',
    fr: 'Grenouillere',
    es: 'Mameluco de bebe',
    it: 'Body neonato',
    pt: 'Body de bebe',
    nl: 'Baby-romper',
    sv: 'Babybody',
    da: 'Babybody',
    no: 'Babybody',
    fi: 'Vauvan body'
  },
  'boots.png': {
    en: 'Boots',
    de: 'Stiefel',
    fr: 'Bottes',
    es: 'Botas',
    it: 'Stivali',
    pt: 'Botas',
    nl: 'Laarzen',
    sv: 'Stovlar',
    da: 'Stovler',
    no: 'Stovler',
    fi: 'Saappaat'
  },
  'cap.png': {
    en: 'Cap',
    de: 'Mutze',
    fr: 'Casquette',
    es: 'Gorra',
    it: 'Berretto',
    pt: 'Bone',
    nl: 'Pet',
    sv: 'Keps',
    da: 'Kasket',
    no: 'Caps',
    fi: 'Lippis'
  },
  'coat.png': {
    en: 'Coat',
    de: 'Mantel',
    fr: 'Manteau',
    es: 'Abrigo',
    it: 'Cappotto',
    pt: 'Casaco',
    nl: 'Jas',
    sv: 'Kappa',
    da: 'Frakke',
    no: 'Frakk',
    fi: 'Takki'
  },
  'coat 2.png': {
    en: 'Coat 2',
    de: 'Mantel 2',
    fr: 'Manteau 2',
    es: 'Abrigo 2',
    it: 'Cappotto 2',
    pt: 'Casaco 2',
    nl: 'Jas 2',
    sv: 'Kappa 2',
    da: 'Frakke 2',
    no: 'Frakk 2',
    fi: 'Takki 2'
  },
  'dress.png': {
    en: 'Dress',
    de: 'Kleid',
    fr: 'Robe',
    es: 'Vestido',
    it: 'Vestito',
    pt: 'Vestido',
    nl: 'Jurk',
    sv: 'Klanning',
    da: 'Kjole',
    no: 'Kjole',
    fi: 'Mekko'
  },
  'dress 2.png': {
    en: 'Dress 2',
    de: 'Kleid 2',
    fr: 'Robe 2',
    es: 'Vestido 2',
    it: 'Vestito 2',
    pt: 'Vestido 2',
    nl: 'Jurk 2',
    sv: 'Klanning 2',
    da: 'Kjole 2',
    no: 'Kjole 2',
    fi: 'Mekko 2'
  },
  'dress 3.png': {
    en: 'Dress 3',
    de: 'Kleid 3',
    fr: 'Robe 3',
    es: 'Vestido 3',
    it: 'Vestito 3',
    pt: 'Vestido 3',
    nl: 'Jurk 3',
    sv: 'Klanning 3',
    da: 'Kjole 3',
    no: 'Kjole 3',
    fi: 'Mekko 3'
  },
  'dress 4.png': {
    en: 'Dress 4',
    de: 'Kleid 4',
    fr: 'Robe 4',
    es: 'Vestido 4',
    it: 'Vestito 4',
    pt: 'Vestido 4',
    nl: 'Jurk 4',
    sv: 'Klanning 4',
    da: 'Kjole 4',
    no: 'Kjole 4',
    fi: 'Mekko 4'
  },
  'dress 5.png': {
    en: 'Dress 5',
    de: 'Kleid 5',
    fr: 'Robe 5',
    es: 'Vestido 5',
    it: 'Vestito 5',
    pt: 'Vestido 5',
    nl: 'Jurk 5',
    sv: 'Klanning 5',
    da: 'Kjole 5',
    no: 'Kjole 5',
    fi: 'Mekko 5'
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
  'hat.png': {
    en: 'Hat',
    de: 'Hut',
    fr: 'Chapeau',
    es: 'Sombrero',
    it: 'Cappello',
    pt: 'Chapeu',
    nl: 'Hoed',
    sv: 'Hatt',
    da: 'Hat',
    no: 'Hatt',
    fi: 'Hattu'
  },
  'hat 2.png': {
    en: 'Hat 2',
    de: 'Hut 2',
    fr: 'Chapeau 2',
    es: 'Sombrero 2',
    it: 'Cappello 2',
    pt: 'Chapeu 2',
    nl: 'Hoed 2',
    sv: 'Hatt 2',
    da: 'Hat 2',
    no: 'Hatt 2',
    fi: 'Hattu 2'
  },
  'high-heeled shoes.png': {
    en: 'High-Heeled Shoes',
    de: 'Stockelschuhe',
    fr: 'Chaussures a talons',
    es: 'Zapatos de tacon',
    it: 'Scarpe con tacco',
    pt: 'Sapatos de salto',
    nl: 'Hoge hakken',
    sv: 'Hogklackade skor',
    da: 'Stiletter',
    no: 'Hoyhelte sko',
    fi: 'Korkokaengat'
  },
  'jacket.png': {
    en: 'Jacket',
    de: 'Jacke',
    fr: 'Veste',
    es: 'Chaqueta',
    it: 'Giacca',
    pt: 'Jaqueta',
    nl: 'Jasje',
    sv: 'Jacka',
    da: 'Jakke',
    no: 'Jakke',
    fi: 'Takki'
  },
  'mittens.png': {
    en: 'Mittens',
    de: 'Faustlinge',
    fr: 'Moufles',
    es: 'Mitones',
    it: 'Muffole',
    pt: 'Luvas',
    nl: 'Wanten',
    sv: 'Vantar',
    da: 'Vanter',
    no: 'Votter',
    fi: 'Lapaset'
  },
  'necktie.png': {
    en: 'Necktie',
    de: 'Krawatte',
    fr: 'Cravate',
    es: 'Corbata',
    it: 'Cravatta',
    pt: 'Gravata',
    nl: 'Stropdas',
    sv: 'Slips',
    da: 'Slips',
    no: 'Slips',
    fi: 'Solmio'
  },
  'scarf 2.png': {
    en: 'Scarf',
    de: 'Schal',
    fr: 'Echarpe',
    es: 'Bufanda',
    it: 'Sciarpa',
    pt: 'Cachecol',
    nl: 'Sjaal',
    sv: 'Halsduk',
    da: 'Halstorklaede',
    no: 'Skjerf',
    fi: 'Huivi'
  },
  'shirt.png': {
    en: 'Shirt',
    de: 'Hemd',
    fr: 'Chemise',
    es: 'Camisa',
    it: 'Camicia',
    pt: 'Camisa',
    nl: 'Overhemd',
    sv: 'Skjorta',
    da: 'Skjorte',
    no: 'Skjorte',
    fi: 'Paita'
  },
  'shirt 2.png': {
    en: 'Shirt 2',
    de: 'Hemd 2',
    fr: 'Chemise 2',
    es: 'Camisa 2',
    it: 'Camicia 2',
    pt: 'Camisa 2',
    nl: 'Overhemd 2',
    sv: 'Skjorta 2',
    da: 'Skjorte 2',
    no: 'Skjorte 2',
    fi: 'Paita 2'
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
  'smartwatch.png': {
    en: 'Smartwatch',
    de: 'Smartwatch',
    fr: 'Montre connectee',
    es: 'Reloj inteligente',
    it: 'Smartwatch',
    pt: 'Relogio inteligente',
    nl: 'Smartwatch',
    sv: 'Smartklocka',
    da: 'Smartwatch',
    no: 'Smartklokke',
    fi: 'Alykello'
  },
  'sock.png': {
    en: 'Sock',
    de: 'Socke',
    fr: 'Chaussette',
    es: 'Calcetin',
    it: 'Calzino',
    pt: 'Meia',
    nl: 'Sok',
    sv: 'Strumpa',
    da: 'Sok',
    no: 'Sokk',
    fi: 'Sukka'
  },
  'sunglasses.png': {
    en: 'Sunglasses',
    de: 'Sonnenbrille',
    fr: 'Lunettes de soleil',
    es: 'Gafas de sol',
    it: 'Occhiali da sole',
    pt: 'Oculos de sol',
    nl: 'Zonnebril',
    sv: 'Solglasogon',
    da: 'Solbriller',
    no: 'Solbriller',
    fi: 'Aurinkolasit'
  },
  'sweatshirt.png': {
    en: 'Sweatshirt',
    de: 'Sweatshirt',
    fr: 'Sweat-shirt',
    es: 'Sudadera',
    it: 'Felpa',
    pt: 'Moletom',
    nl: 'Sweater',
    sv: 'Sweatshirt',
    da: 'Sweatshirt',
    no: 'Genser',
    fi: 'Collegepaita'
  },
  't-shirt.png': {
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
  const sourceFolderName = 'apparel bw';

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
