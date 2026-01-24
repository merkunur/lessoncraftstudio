const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'hospital',
  type: 'images',
  sourceFolderName: 'hospital',
  displayNames: {
    en: 'Hospital',
    de: 'Krankenhaus',
    fr: 'Hôpital',
    es: 'Hospital',
    it: 'Ospedale',
    pt: 'Hospital',
    nl: 'Ziekenhuis',
    sv: 'Sjukhus',
    da: 'Hospital',
    no: 'Sykehus',
    fi: 'Sairaala'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'ambulance': {
    en: 'Ambulance',
    de: 'Krankenwagen',
    fr: 'Ambulance',
    es: 'Ambulancia',
    it: 'Ambulanza',
    pt: 'Ambulância',
    nl: 'Ambulance',
    sv: 'Ambulans',
    da: 'Ambulance',
    no: 'Ambulanse',
    fi: 'Ambulanssi'
  },
  'bandage': {
    en: 'Bandage',
    de: 'Verband',
    fr: 'Bandage',
    es: 'Vendaje',
    it: 'Benda',
    pt: 'Bandagem',
    nl: 'Verband',
    sv: 'Bandage',
    da: 'Bandage',
    no: 'Bandasje',
    fi: 'Side'
  },
  'bed': {
    en: 'Hospital Bed',
    de: 'Krankenhausbett',
    fr: 'Lit d\'hôpital',
    es: 'Cama de hospital',
    it: 'Letto d\'ospedale',
    pt: 'Cama de hospital',
    nl: 'Ziekenhuisbed',
    sv: 'Sjukhussäng',
    da: 'Hospitalsseng',
    no: 'Sykehusseng',
    fi: 'Sairaalasänky'
  },
  'bracelet': {
    en: 'Hospital Bracelet',
    de: 'Patientenarmband',
    fr: 'Bracelet d\'hôpital',
    es: 'Pulsera de hospital',
    it: 'Braccialetto ospedaliero',
    pt: 'Pulseira de hospital',
    nl: 'Ziekenhuisbandje',
    sv: 'Sjukhusarmband',
    da: 'Hospitalsarmbånd',
    no: 'Sykehusarmbånd',
    fi: 'Sairaalapanta'
  },
  'cast': {
    en: 'Cast',
    de: 'Gipsverband',
    fr: 'Plâtre',
    es: 'Yeso',
    it: 'Gesso',
    pt: 'Gesso',
    nl: 'Gips',
    sv: 'Gips',
    da: 'Gips',
    no: 'Gips',
    fi: 'Kipsi'
  },
  'chart': {
    en: 'Medical Chart',
    de: 'Krankenakte',
    fr: 'Dossier médical',
    es: 'Expediente médico',
    it: 'Cartella clinica',
    pt: 'Prontuário',
    nl: 'Medisch dossier',
    sv: 'Patientjournal',
    da: 'Patientjournal',
    no: 'Pasientjournal',
    fi: 'Potilaskertomus'
  },
  'crutches': {
    en: 'Crutches',
    de: 'Krücken',
    fr: 'Béquilles',
    es: 'Muletas',
    it: 'Stampelle',
    pt: 'Muletas',
    nl: 'Krukken',
    sv: 'Kryckor',
    da: 'Krykker',
    no: 'Krykker',
    fi: 'Kainalosauvat'
  },
  'doctor': {
    en: 'Doctor',
    de: 'Arzt',
    fr: 'Médecin',
    es: 'Doctor',
    it: 'Dottore',
    pt: 'Médico',
    nl: 'Dokter',
    sv: 'Läkare',
    da: 'Læge',
    no: 'Lege',
    fi: 'Lääkäri'
  },
  'gloves': {
    en: 'Medical Gloves',
    de: 'Medizinische Handschuhe',
    fr: 'Gants médicaux',
    es: 'Guantes médicos',
    it: 'Guanti medici',
    pt: 'Luvas médicas',
    nl: 'Medische handschoenen',
    sv: 'Medicinska handskar',
    da: 'Medicinske handsker',
    no: 'Medisinske hansker',
    fi: 'Lääkärin hanskat'
  },
  'gown': {
    en: 'Hospital Gown',
    de: 'Krankenhaushemd',
    fr: 'Blouse d\'hôpital',
    es: 'Bata de hospital',
    it: 'Camice ospedaliero',
    pt: 'Avental de hospital',
    nl: 'Ziekenhuisjas',
    sv: 'Sjukhuskläder',
    da: 'Hospitalskittel',
    no: 'Sykehuskjole',
    fi: 'Sairaalatakki'
  },
  'mask': {
    en: 'Face Mask',
    de: 'Mundschutz',
    fr: 'Masque',
    es: 'Cubrebocas',
    it: 'Mascherina',
    pt: 'Máscara',
    nl: 'Mondkapje',
    sv: 'Munskydd',
    da: 'Mundbind',
    no: 'Munnbind',
    fi: 'Kasvomaski'
  },
  'medicine': {
    en: 'Medicine',
    de: 'Medizin',
    fr: 'Médicament',
    es: 'Medicina',
    it: 'Medicina',
    pt: 'Remédio',
    nl: 'Medicijn',
    sv: 'Medicin',
    da: 'Medicin',
    no: 'Medisin',
    fi: 'Lääke'
  },
  'monitor': {
    en: 'Heart Monitor',
    de: 'Herzmonitor',
    fr: 'Moniteur cardiaque',
    es: 'Monitor cardíaco',
    it: 'Monitor cardiaco',
    pt: 'Monitor cardíaco',
    nl: 'Hartmonitor',
    sv: 'Hjärtmonitor',
    da: 'Hjerteovervågning',
    no: 'Hjerteovervåkning',
    fi: 'Sydänmonitori'
  },
  'nurse': {
    en: 'Nurse',
    de: 'Krankenschwester',
    fr: 'Infirmière',
    es: 'Enfermera',
    it: 'Infermiera',
    pt: 'Enfermeira',
    nl: 'Verpleegster',
    sv: 'Sjuksköterska',
    da: 'Sygeplejerske',
    no: 'Sykepleier',
    fi: 'Sairaanhoitaja'
  },
  'scrubs': {
    en: 'Scrubs',
    de: 'OP-Kleidung',
    fr: 'Tenue médicale',
    es: 'Uniforme médico',
    it: 'Divisa medica',
    pt: 'Roupa cirúrgica',
    nl: 'Operatiekleding',
    sv: 'Sjukhuskläder',
    da: 'Hospitalstøj',
    no: 'Sykehusklær',
    fi: 'Hoitajan asu'
  },
  'stethoscope': {
    en: 'Stethoscope',
    de: 'Stethoskop',
    fr: 'Stéthoscope',
    es: 'Estetoscopio',
    it: 'Stetoscopio',
    pt: 'Estetoscópio',
    nl: 'Stethoscoop',
    sv: 'Stetoskop',
    da: 'Stetoskop',
    no: 'Stetoskop',
    fi: 'Stetoskooppi'
  },
  'stretcher': {
    en: 'Stretcher',
    de: 'Trage',
    fr: 'Brancard',
    es: 'Camilla',
    it: 'Barella',
    pt: 'Maca',
    nl: 'Brancard',
    sv: 'Bår',
    da: 'Båre',
    no: 'Båre',
    fi: 'Paarit'
  },
  'syringe': {
    en: 'Syringe',
    de: 'Spritze',
    fr: 'Seringue',
    es: 'Jeringa',
    it: 'Siringa',
    pt: 'Seringa',
    nl: 'Injectiespuit',
    sv: 'Spruta',
    da: 'Sprøjte',
    no: 'Sprøyte',
    fi: 'Ruisku'
  },
  'thermometer': {
    en: 'Thermometer',
    de: 'Thermometer',
    fr: 'Thermomètre',
    es: 'Termómetro',
    it: 'Termometro',
    pt: 'Termômetro',
    nl: 'Thermometer',
    sv: 'Termometer',
    da: 'Termometer',
    no: 'Termometer',
    fi: 'Lämpömittari'
  },
  'tissue': {
    en: 'Tissue',
    de: 'Taschentuch',
    fr: 'Mouchoir',
    es: 'Pañuelo',
    it: 'Fazzoletto',
    pt: 'Lenço',
    nl: 'Zakdoek',
    sv: 'Näsduk',
    da: 'Lommetørklæde',
    no: 'Lommetørkle',
    fi: 'Nenäliina'
  },
  'wheelchair': {
    en: 'Wheelchair',
    de: 'Rollstuhl',
    fr: 'Fauteuil roulant',
    es: 'Silla de ruedas',
    it: 'Sedia a rotelle',
    pt: 'Cadeira de rodas',
    nl: 'Rolstoel',
    sv: 'Rullstol',
    da: 'Kørestol',
    no: 'Rullestol',
    fi: 'Pyörätuoli'
  },
  'x-ray': {
    en: 'X-Ray',
    de: 'Röntgenbild',
    fr: 'Radiographie',
    es: 'Radiografía',
    it: 'Radiografia',
    pt: 'Raio-X',
    nl: 'Röntgenfoto',
    sv: 'Röntgen',
    da: 'Røntgen',
    no: 'Røntgen',
    fi: 'Röntgenkuva'
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
  console.log('Image Import Script: Hospital');
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
