/**
 * Import Script: Accessories Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-accessories-images.js
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
  name: 'accessories',
  type: 'images',
  displayNames: {
    en: 'Accessories',
    de: 'Accessoires',
    fr: 'Accessoires',
    es: 'Accesorios',
    it: 'Accessori',
    pt: 'Acessorios',
    nl: 'Accessoires',
    sv: 'Tillbehor',
    da: 'Tilbehor',
    no: 'Tilbehor',
    fi: 'Asusteet'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'apron.png': {
    en: 'Apron',
    de: 'Schurze',
    fr: 'Tablier',
    es: 'Delantal',
    it: 'Grembiule',
    pt: 'Avental',
    nl: 'Schort',
    sv: 'Forklade',
    da: 'Forklade',
    no: 'Forkle',
    fi: 'Esiliina'
  },
  'backpack.png': {
    en: 'Backpack',
    de: 'Rucksack',
    fr: 'Sac a dos',
    es: 'Mochila',
    it: 'Zaino',
    pt: 'Mochila',
    nl: 'Rugzak',
    sv: 'Ryggsack',
    da: 'Rygsaek',
    no: 'Ryggsekk',
    fi: 'Reppu'
  },
  'badge.png': {
    en: 'Badge',
    de: 'Abzeichen',
    fr: 'Badge',
    es: 'Insignia',
    it: 'Distintivo',
    pt: 'Distintivo',
    nl: 'Badge',
    sv: 'Marke',
    da: 'Badge',
    no: 'Merke',
    fi: 'Merkki'
  },
  'barrette.png': {
    en: 'Barrette',
    de: 'Haarspange',
    fr: 'Barrette',
    es: 'Pasador',
    it: 'Fermaglio',
    pt: 'Presilha',
    nl: 'Haarspeld',
    sv: 'Harspanne',
    da: 'Harspaende',
    no: 'Harspenne',
    fi: 'Hiussolki'
  },
  'beanie.png': {
    en: 'Beanie',
    de: 'Mutze',
    fr: 'Bonnet',
    es: 'Gorro',
    it: 'Berretto',
    pt: 'Gorro',
    nl: 'Muts',
    sv: 'Mossa',
    da: 'Hue',
    no: 'Lue',
    fi: 'Pipo'
  },
  'belt.png': {
    en: 'Belt',
    de: 'Gurtel',
    fr: 'Ceinture',
    es: 'Cinturon',
    it: 'Cintura',
    pt: 'Cinto',
    nl: 'Riem',
    sv: 'Balte',
    da: 'Baelte',
    no: 'Belte',
    fi: 'Vyo'
  },
  'bow tie.png': {
    en: 'Bow Tie',
    de: 'Fliege',
    fr: 'Noeud papillon',
    es: 'Corbata de mono',
    it: 'Papillon',
    pt: 'Gravata borboleta',
    nl: 'Vlinderdas',
    sv: 'Fluga',
    da: 'Butterfly',
    no: 'Sloyfeslips',
    fi: 'Rusetti'
  },
  'bracelet.png': {
    en: 'Bracelet',
    de: 'Armband',
    fr: 'Bracelet',
    es: 'Pulsera',
    it: 'Braccialetto',
    pt: 'Pulseira',
    nl: 'Armband',
    sv: 'Armband',
    da: 'Armband',
    no: 'Armband',
    fi: 'Rannerengas'
  },
  'cap.png': {
    en: 'Cap',
    de: 'Kappe',
    fr: 'Casquette',
    es: 'Gorra',
    it: 'Cappellino',
    pt: 'Bone',
    nl: 'Pet',
    sv: 'Keps',
    da: 'Kasket',
    no: 'Caps',
    fi: 'Lippis'
  },
  'cape.png': {
    en: 'Cape',
    de: 'Umhang',
    fr: 'Cape',
    es: 'Capa',
    it: 'Mantello',
    pt: 'Capa',
    nl: 'Cape',
    sv: 'Kapa',
    da: 'Kappe',
    no: 'Kappe',
    fi: 'Viitta'
  },
  'crown.png': {
    en: 'Crown',
    de: 'Krone',
    fr: 'Couronne',
    es: 'Corona',
    it: 'Corona',
    pt: 'Coroa',
    nl: 'Kroon',
    sv: 'Krona',
    da: 'Krone',
    no: 'Krone',
    fi: 'Kruunu'
  },
  'earmuffs.png': {
    en: 'Earmuffs',
    de: 'Ohrenschutzer',
    fr: 'Cache-oreilles',
    es: 'Orejeras',
    it: 'Paraorecchie',
    pt: 'Protetores de ouvido',
    nl: 'Oorwarmers',
    sv: 'Oronvarmare',
    da: 'Orevarmere',
    no: 'Orevarmere',
    fi: 'Korvalapput'
  },
  'glove.png': {
    en: 'Glove',
    de: 'Handschuh',
    fr: 'Gant',
    es: 'Guante',
    it: 'Guanto',
    pt: 'Luva',
    nl: 'Handschoen',
    sv: 'Handske',
    da: 'Handske',
    no: 'Hanske',
    fi: 'Hansikas'
  },
  'goggles.png': {
    en: 'Goggles',
    de: 'Schutzbrille',
    fr: 'Lunettes de protection',
    es: 'Gafas',
    it: 'Occhialini',
    pt: 'Oculos de protecao',
    nl: 'Veiligheidsbril',
    sv: 'Skyddsglasokon',
    da: 'Beskyttelsesbriller',
    no: 'Vernebriller',
    fi: 'Suojalasit'
  },
  'hair tie.png': {
    en: 'Hair Tie',
    de: 'Haargummi',
    fr: 'Elastique a cheveux',
    es: 'Liga para el cabello',
    it: 'Elastico per capelli',
    pt: 'Elastico de cabelo',
    nl: 'Haarelastiek',
    sv: 'Harsnodd',
    da: 'Harelastik',
    no: 'Harstrikk',
    fi: 'Hiuslenkki'
  },
  'handbag.png': {
    en: 'Handbag',
    de: 'Handtasche',
    fr: 'Sac a main',
    es: 'Bolso',
    it: 'Borsa',
    pt: 'Bolsa',
    nl: 'Handtas',
    sv: 'Handvaska',
    da: 'Handtaske',
    no: 'Handveske',
    fi: 'Kassilaukku'
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
  'headband.png': {
    en: 'Headband',
    de: 'Stirnband',
    fr: 'Bandeau',
    es: 'Diadema',
    it: 'Fascia per capelli',
    pt: 'Tiara',
    nl: 'Hoofdband',
    sv: 'Pannband',
    da: 'Pandebånd',
    no: 'Pannebånd',
    fi: 'Hiuspanta'
  },
  'mask.png': {
    en: 'Mask',
    de: 'Maske',
    fr: 'Masque',
    es: 'Mascara',
    it: 'Maschera',
    pt: 'Mascara',
    nl: 'Masker',
    sv: 'Mask',
    da: 'Maske',
    no: 'Maske',
    fi: 'Naamio'
  },
  'medal.png': {
    en: 'Medal',
    de: 'Medaille',
    fr: 'Medaille',
    es: 'Medalla',
    it: 'Medaglia',
    pt: 'Medalha',
    nl: 'Medaille',
    sv: 'Medalj',
    da: 'Medalje',
    no: 'Medalje',
    fi: 'Mitali'
  },
  'mitten.png': {
    en: 'Mitten',
    de: 'Faustling',
    fr: 'Moufle',
    es: 'Manopla',
    it: 'Muffola',
    pt: 'Luva sem dedos',
    nl: 'Want',
    sv: 'Vante',
    da: 'Vante',
    no: 'Vott',
    fi: 'Kinnas'
  },
  'necklace.png': {
    en: 'Necklace',
    de: 'Halskette',
    fr: 'Collier',
    es: 'Collar',
    it: 'Collana',
    pt: 'Colar',
    nl: 'Ketting',
    sv: 'Halsband',
    da: 'Halskæde',
    no: 'Halskjede',
    fi: 'Kaulakoru'
  },
  'party hat.png': {
    en: 'Party Hat',
    de: 'Partyhut',
    fr: 'Chapeau de fete',
    es: 'Gorro de fiesta',
    it: 'Cappello da festa',
    pt: 'Chapeu de festa',
    nl: 'Feesthoed',
    sv: 'Partyhatt',
    da: 'Festhat',
    no: 'Festlue',
    fi: 'Juhlahattu'
  },
  'purse.png': {
    en: 'Purse',
    de: 'Geldborse',
    fr: 'Porte-monnaie',
    es: 'Monedero',
    it: 'Borsellino',
    pt: 'Porta-moedas',
    nl: 'Portemonnee',
    sv: 'Portmonna',
    da: 'Pung',
    no: 'Pengepung',
    fi: 'Kukkaro'
  },
  'rain boots.png': {
    en: 'Rain Boots',
    de: 'Gummistiefel',
    fr: 'Bottes de pluie',
    es: 'Botas de lluvia',
    it: 'Stivali da pioggia',
    pt: 'Botas de chuva',
    nl: 'Regenlaarzen',
    sv: 'Gummistovlar',
    da: 'Gummistovler',
    no: 'Gummistovler',
    fi: 'Kumisaappaat'
  },
  'ribbon.png': {
    en: 'Ribbon',
    de: 'Band',
    fr: 'Ruban',
    es: 'Liston',
    it: 'Nastro',
    pt: 'Fita',
    nl: 'Lint',
    sv: 'Band',
    da: 'Band',
    no: 'Band',
    fi: 'Nauha'
  },
  'ring.png': {
    en: 'Ring',
    de: 'Ring',
    fr: 'Bague',
    es: 'Anillo',
    it: 'Anello',
    pt: 'Anel',
    nl: 'Ring',
    sv: 'Ring',
    da: 'Ring',
    no: 'Ring',
    fi: 'Sormus'
  },
  'scarf.png': {
    en: 'Scarf',
    de: 'Schal',
    fr: 'Echarpe',
    es: 'Bufanda',
    it: 'Sciarpa',
    pt: 'Cachecol',
    nl: 'Sjaal',
    sv: 'Halsduk',
    da: 'Halstoerklaede',
    no: 'Skjerf',
    fi: 'Huivi'
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
  'sun hat.png': {
    en: 'Sun Hat',
    de: 'Sonnenhut',
    fr: 'Chapeau de soleil',
    es: 'Sombrero de sol',
    it: 'Cappello da sole',
    pt: 'Chapeu de sol',
    nl: 'Zonnehoed',
    sv: 'Solhatt',
    da: 'Solhat',
    no: 'Solhatt',
    fi: 'Aurinkohattu'
  },
  'sunglasses.png': {
    en: 'Sunglasses',
    de: 'Sonnenbrille',
    fr: 'Lunettes de soleil',
    es: 'Lentes de sol',
    it: 'Occhiali da sole',
    pt: 'Oculos de sol',
    nl: 'Zonnebril',
    sv: 'Solglasokon',
    da: 'Solbriller',
    no: 'Solbriller',
    fi: 'Aurinkolasit'
  },
  'suspenders.png': {
    en: 'Suspenders',
    de: 'Hosentrager',
    fr: 'Bretelles',
    es: 'Tirantes',
    it: 'Bretelle',
    pt: 'Suspensorios',
    nl: 'Bretels',
    sv: 'Hangslen',
    da: 'Seler',
    no: 'Bukseseler',
    fi: 'Henkselit'
  },
  'tiara.png': {
    en: 'Tiara',
    de: 'Diadem',
    fr: 'Diademe',
    es: 'Tiara',
    it: 'Tiara',
    pt: 'Tiara',
    nl: 'Tiara',
    sv: 'Tiara',
    da: 'Tiara',
    no: 'Tiara',
    fi: 'Tiara'
  },
  'tie.png': {
    en: 'Tie',
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
  'tights.png': {
    en: 'Tights',
    de: 'Strumpfhose',
    fr: 'Collants',
    es: 'Medias',
    it: 'Collant',
    pt: 'Meia-calca',
    nl: 'Panty',
    sv: 'Strumpbyxor',
    da: 'Strompebukser',
    no: 'Strompebukse',
    fi: 'Sukkahousut'
  },
  'umbrella.png': {
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
  'vest.png': {
    en: 'Vest',
    de: 'Weste',
    fr: 'Gilet',
    es: 'Chaleco',
    it: 'Gilet',
    pt: 'Colete',
    nl: 'Vest',
    sv: 'Vast',
    da: 'Vest',
    no: 'Vest',
    fi: 'Liivi'
  },
  'wallet.png': {
    en: 'Wallet',
    de: 'Brieftasche',
    fr: 'Portefeuille',
    es: 'Cartera',
    it: 'Portafoglio',
    pt: 'Carteira',
    nl: 'Portemonnee',
    sv: 'Planbok',
    da: 'Tegnebog',
    no: 'Lommebok',
    fi: 'Lompakko'
  },
  'wand.png': {
    en: 'Wand',
    de: 'Zauberstab',
    fr: 'Baguette magique',
    es: 'Varita magica',
    it: 'Bacchetta magica',
    pt: 'Varinha magica',
    nl: 'Toverstaf',
    sv: 'Trollstav',
    da: 'Tryllestav',
    no: 'Tryllestav',
    fi: 'Taikasauva'
  },
  'watch.png': {
    en: 'Watch',
    de: 'Uhr',
    fr: 'Montre',
    es: 'Reloj',
    it: 'Orologio',
    pt: 'Relogio',
    nl: 'Horloge',
    sv: 'Klocka',
    da: 'Ur',
    no: 'Klokke',
    fi: 'Rannekello'
  },
  'whistle.png': {
    en: 'Whistle',
    de: 'Pfeife',
    fr: 'Sifflet',
    es: 'Silbato',
    it: 'Fischietto',
    pt: 'Apito',
    nl: 'Fluitje',
    sv: 'Visselpipa',
    da: 'Floejte',
    no: 'Floyte',
    fi: 'Pilli'
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
  const sourceFolderName = 'accessories'; // Folder name in image library

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
