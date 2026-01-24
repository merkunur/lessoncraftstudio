/**
 * Import Script: Beach Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-beach-images.js
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
  name: 'beach',
  type: 'images',
  displayNames: {
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
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'bathing suit.png': {
    en: 'Bathing Suit',
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
  'beach bag.png': {
    en: 'Beach Bag',
    de: 'Strandtasche',
    fr: 'Sac de plage',
    es: 'Bolsa de playa',
    it: 'Borsa da spiaggia',
    pt: 'Bolsa de praia',
    nl: 'Strandtas',
    sv: 'Strandväska',
    da: 'Strandtaske',
    no: 'Strandveske',
    fi: 'Rantalaukku'
  },
  'beach ball.png': {
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
  'beach umbrella.png': {
    en: 'Beach Umbrella',
    de: 'Sonnenschirm',
    fr: 'Parasol',
    es: 'Sombrilla de playa',
    it: 'Ombrellone',
    pt: 'Guarda-sol',
    nl: 'Parasol',
    sv: 'Parasoll',
    da: 'Strandparasol',
    no: 'Strandparasoll',
    fi: 'Aurinkovarjo'
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
  'cabana.png': {
    en: 'Cabana',
    de: 'Strandkabine',
    fr: 'Cabane de plage',
    es: 'Cabaña',
    it: 'Cabina',
    pt: 'Cabana',
    nl: 'Strandcabine',
    sv: 'Strandhytt',
    da: 'Strandhytte',
    no: 'Strandhytte',
    fi: 'Rantamaja'
  },
  'chair.png': {
    en: 'Chair',
    de: 'Liegestuhl',
    fr: 'Chaise longue',
    es: 'Silla de playa',
    it: 'Sdraio',
    pt: 'Cadeira de praia',
    nl: 'Strandstoel',
    sv: 'Solstol',
    da: 'Strandstol',
    no: 'Strandstol',
    fi: 'Rantaituoli'
  },
  'cloud.png': {
    en: 'Cloud',
    de: 'Wolke',
    fr: 'Nuage',
    es: 'Nube',
    it: 'Nuvola',
    pt: 'Nuvem',
    nl: 'Wolk',
    sv: 'Moln',
    da: 'Sky',
    no: 'Sky',
    fi: 'Pilvi'
  },
  'cooler.png': {
    en: 'Cooler',
    de: 'Kühlbox',
    fr: 'Glacière',
    es: 'Hielera',
    it: 'Borsa frigo',
    pt: 'Cooler',
    nl: 'Koelbox',
    sv: 'Kylväska',
    da: 'Køletaske',
    no: 'Kjølebag',
    fi: 'Kylmälaukku'
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
  'dolphin.png': {
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
  'driftwood.png': {
    en: 'Driftwood',
    de: 'Treibholz',
    fr: 'Bois flotté',
    es: 'Madera a la deriva',
    it: 'Legno galleggiante',
    pt: 'Madeira flutuante',
    nl: 'Drijfhout',
    sv: 'Drivved',
    da: 'Drivtømmer',
    no: 'Drivved',
    fi: 'Ajopuu'
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
  'flip-flops.png': {
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
  'hat.png': {
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
  'ice cream.png': {
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
  'jellyfish.png': {
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
  'juice box.png': {
    en: 'Juice Box',
    de: 'Saftpackung',
    fr: 'Brique de jus',
    es: 'Caja de jugo',
    it: 'Succo di frutta',
    pt: 'Caixinha de suco',
    nl: 'Drinkpakje',
    sv: 'Juiceförpackning',
    da: 'Juiceboks',
    no: 'Juiceboks',
    fi: 'Mehupakkaus'
  },
  'kite.png': {
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
  'lifeguard tower.png': {
    en: 'Lifeguard Tower',
    de: 'Rettungsturm',
    fr: 'Poste de secours',
    es: 'Torre de salvavidas',
    it: 'Torretta del bagnino',
    pt: 'Torre de salva-vidas',
    nl: 'Reddingstoren',
    sv: 'Livräddningstorn',
    da: 'Livredder tårn',
    no: 'Livreddertårn',
    fi: 'Hengenpelastajan torni'
  },
  'lifeguard.png': {
    en: 'Lifeguard',
    de: 'Rettungsschwimmer',
    fr: 'Sauveteur',
    es: 'Salvavidas',
    it: 'Bagnino',
    pt: 'Salva-vidas',
    nl: 'Badmeester',
    sv: 'Livräddare',
    da: 'Livredder',
    no: 'Livredder',
    fi: 'Hengenpelastaja'
  },
  'lighthouse.png': {
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
  'net.png': {
    en: 'Net',
    de: 'Netz',
    fr: 'Filet',
    es: 'Red',
    it: 'Rete',
    pt: 'Rede',
    nl: 'Net',
    sv: 'Nät',
    da: 'Net',
    no: 'Nett',
    fi: 'Verkko'
  },
  'palm tree.png': {
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
  'pelican.png': {
    en: 'Pelican',
    de: 'Pelikan',
    fr: 'Pélican',
    es: 'Pelícano',
    it: 'Pellicano',
    pt: 'Pelicano',
    nl: 'Pelikaan',
    sv: 'Pelikan',
    da: 'Pelikan',
    no: 'Pelikan',
    fi: 'Pelikaani'
  },
  'rock.png': {
    en: 'Rock',
    de: 'Felsen',
    fr: 'Rocher',
    es: 'Roca',
    it: 'Roccia',
    pt: 'Pedra',
    nl: 'Rots',
    sv: 'Klippa',
    da: 'Klippe',
    no: 'Stein',
    fi: 'Kallio'
  },
  'sailboat.png': {
    en: 'Sailboat',
    de: 'Segelboot',
    fr: 'Voilier',
    es: 'Velero',
    it: 'Barca a vela',
    pt: 'Veleiro',
    nl: 'Zeilboot',
    sv: 'Segelbåt',
    da: 'Sejlbåd',
    no: 'Seilbåt',
    fi: 'Purjevene'
  },
  'sandals.png': {
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
  'seagull.png': {
    en: 'Seagull',
    de: 'Möwe',
    fr: 'Mouette',
    es: 'Gaviota',
    it: 'Gabbiano',
    pt: 'Gaivota',
    nl: 'Zeemeeuw',
    sv: 'Fiskmås',
    da: 'Måge',
    no: 'Måke',
    fi: 'Lokki'
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
  'shovel.png': {
    en: 'Shovel',
    de: 'Schaufel',
    fr: 'Pelle',
    es: 'Pala',
    it: 'Paletta',
    pt: 'Pá',
    nl: 'Schep',
    sv: 'Spade',
    da: 'Skovl',
    no: 'Spade',
    fi: 'Lapio'
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
  'spade.png': {
    en: 'Spade',
    de: 'Schaufel',
    fr: 'Pelle',
    es: 'Pala',
    it: 'Paletta',
    pt: 'Pazinha',
    nl: 'Schepje',
    sv: 'Spade',
    da: 'Skovl',
    no: 'Spade',
    fi: 'Lapio'
  },
  'starfish.png': {
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
  'sun hat.png': {
    en: 'Sun Hat',
    de: 'Sonnenhut',
    fr: 'Chapeau de soleil',
    es: 'Sombrero para el sol',
    it: 'Cappello da sole',
    pt: 'Chapéu de sol',
    nl: 'Zonnehoed',
    sv: 'Solhatt',
    da: 'Solhat',
    no: 'Solhatt',
    fi: 'Aurinkohattu'
  },
  'sun.png': {
    en: 'Sun',
    de: 'Sonne',
    fr: 'Soleil',
    es: 'Sol',
    it: 'Sole',
    pt: 'Sol',
    nl: 'Zon',
    sv: 'Sol',
    da: 'Sol',
    no: 'Sol',
    fi: 'Aurinko'
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
  'sunscreen.png': {
    en: 'Sunscreen',
    de: 'Sonnencreme',
    fr: 'Crème solaire',
    es: 'Bloqueador solar',
    it: 'Crema solare',
    pt: 'Protetor solar',
    nl: 'Zonnebrandcrème',
    sv: 'Solkräm',
    da: 'Solcreme',
    no: 'Solkrem',
    fi: 'Aurinkovoide'
  },
  'swimsuit.png': {
    en: 'Swimsuit',
    de: 'Badeanzug',
    fr: 'Maillot de bain',
    es: 'Traje de baño',
    it: 'Costume da bagno',
    pt: 'Roupa de banho',
    nl: 'Zwempak',
    sv: 'Baddräkt',
    da: 'Badedragt',
    no: 'Badedrakt',
    fi: 'Uimapuku'
  },
  'turtle.png': {
    en: 'Turtle',
    de: 'Schildkröte',
    fr: 'Tortue',
    es: 'Tortuga',
    it: 'Tartaruga',
    pt: 'Tartaruga',
    nl: 'Schildpad',
    sv: 'Sköldpadda',
    da: 'Skildpadde',
    no: 'Skilpadde',
    fi: 'Kilpikonna'
  },
  'umbrella.png': {
    en: 'Umbrella',
    de: 'Schirm',
    fr: 'Parapluie',
    es: 'Sombrilla',
    it: 'Ombrello',
    pt: 'Guarda-chuva',
    nl: 'Paraplu',
    sv: 'Paraply',
    da: 'Paraply',
    no: 'Paraply',
    fi: 'Sateenvarjo'
  },
  'water.png': {
    en: 'Water',
    de: 'Wasser',
    fr: 'Eau',
    es: 'Agua',
    it: 'Acqua',
    pt: 'Água',
    nl: 'Water',
    sv: 'Vatten',
    da: 'Vand',
    no: 'Vann',
    fi: 'Vesi'
  },
  'wave.png': {
    en: 'Wave',
    de: 'Welle',
    fr: 'Vague',
    es: 'Ola',
    it: 'Onda',
    pt: 'Onda',
    nl: 'Golf',
    sv: 'Våg',
    da: 'Bølge',
    no: 'Bølge',
    fi: 'Aalto'
  },
  'whale.png': {
    en: 'Whale',
    de: 'Wal',
    fr: 'Baleine',
    es: 'Ballena',
    it: 'Balena',
    pt: 'Baleia',
    nl: 'Walvis',
    sv: 'Val',
    da: 'Hval',
    no: 'Hval',
    fi: 'Valas'
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
  const sourceFolderName = THEME_CONFIG.displayNames.en;

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
