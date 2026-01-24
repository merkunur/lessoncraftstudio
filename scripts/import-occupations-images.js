const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Theme configuration
const THEME_CONFIG = {
  name: 'occupations',
  type: 'images',
  sourceFolderName: 'occupations',
  displayNames: {
    en: 'Occupations',
    de: 'Berufe',
    fr: 'Métiers',
    es: 'Ocupaciones',
    it: 'Professioni',
    pt: 'Profissões',
    nl: 'Beroepen',
    sv: 'Yrken',
    da: 'Erhverv',
    no: 'Yrker',
    fi: 'Ammatit'
  }
};

// Image translations (filename without extension -> translations)
const IMAGE_TRANSLATIONS = {
  'actor': {
    en: 'Actor',
    de: 'Schauspieler',
    fr: 'Acteur',
    es: 'Actor',
    it: 'Attore',
    pt: 'Ator',
    nl: 'Acteur',
    sv: 'Skådespelare',
    da: 'Skuespiller',
    no: 'Skuespiller',
    fi: 'Näyttelijä'
  },
  'architect': {
    en: 'Architect',
    de: 'Architekt',
    fr: 'Architecte',
    es: 'Arquitecto',
    it: 'Architetto',
    pt: 'Arquiteto',
    nl: 'Architect',
    sv: 'Arkitekt',
    da: 'Arkitekt',
    no: 'Arkitekt',
    fi: 'Arkkitehti'
  },
  'artist': {
    en: 'Artist',
    de: 'Künstler',
    fr: 'Artiste',
    es: 'Artista',
    it: 'Artista',
    pt: 'Artista',
    nl: 'Kunstenaar',
    sv: 'Konstnär',
    da: 'Kunstner',
    no: 'Kunstner',
    fi: 'Taiteilija'
  },
  'astronaut': {
    en: 'Astronaut',
    de: 'Astronaut',
    fr: 'Astronaute',
    es: 'Astronauta',
    it: 'Astronauta',
    pt: 'Astronauta',
    nl: 'Astronaut',
    sv: 'Astronaut',
    da: 'Astronaut',
    no: 'Astronaut',
    fi: 'Astronautti'
  },
  'athlete': {
    en: 'Athlete',
    de: 'Athlet',
    fr: 'Athlète',
    es: 'Atleta',
    it: 'Atleta',
    pt: 'Atleta',
    nl: 'Atleet',
    sv: 'Atlet',
    da: 'Atlet',
    no: 'Idrettsutøver',
    fi: 'Urheilija'
  },
  'author': {
    en: 'Author',
    de: 'Autor',
    fr: 'Auteur',
    es: 'Autor',
    it: 'Autore',
    pt: 'Autor',
    nl: 'Auteur',
    sv: 'Författare',
    da: 'Forfatter',
    no: 'Forfatter',
    fi: 'Kirjailija'
  },
  'baker': {
    en: 'Baker',
    de: 'Bäcker',
    fr: 'Boulanger',
    es: 'Panadero',
    it: 'Panettiere',
    pt: 'Padeiro',
    nl: 'Bakker',
    sv: 'Bagare',
    da: 'Bager',
    no: 'Baker',
    fi: 'Leipuri'
  },
  'ballerina': {
    en: 'Ballerina',
    de: 'Ballerina',
    fr: 'Ballerine',
    es: 'Bailarina',
    it: 'Ballerina',
    pt: 'Bailarina',
    nl: 'Ballerina',
    sv: 'Ballerina',
    da: 'Ballerina',
    no: 'Ballerina',
    fi: 'Ballerina'
  },
  'barber': {
    en: 'Barber',
    de: 'Friseur',
    fr: 'Barbier',
    es: 'Barbero',
    it: 'Barbiere',
    pt: 'Barbeiro',
    nl: 'Kapper',
    sv: 'Frisör',
    da: 'Barber',
    no: 'Frisør',
    fi: 'Parturi'
  },
  'bus driver 2': {
    en: 'Bus Driver 2',
    de: 'Busfahrer 2',
    fr: 'Conducteur de bus 2',
    es: 'Chofer de autobús 2',
    it: 'Autista di autobus 2',
    pt: 'Motorista de ônibus 2',
    nl: 'Buschauffeur 2',
    sv: 'Busschaufför 2',
    da: 'Buschauffør 2',
    no: 'Bussjåfør 2',
    fi: 'Linja-autonkuljettaja 2'
  },
  'carpenter': {
    en: 'Carpenter',
    de: 'Zimmermann',
    fr: 'Charpentier',
    es: 'Carpintero',
    it: 'Falegname',
    pt: 'Carpinteiro',
    nl: 'Timmerman',
    sv: 'Snickare',
    da: 'Tømrer',
    no: 'Snekker',
    fi: 'Puuseppä'
  },
  'cashier': {
    en: 'Cashier',
    de: 'Kassierer',
    fr: 'Caissier',
    es: 'Cajero',
    it: 'Cassiere',
    pt: 'Caixa',
    nl: 'Kassier',
    sv: 'Kassör',
    da: 'Kasserer',
    no: 'Kasserer',
    fi: 'Kassatyöntekijä'
  },
  'chef': {
    en: 'Chef',
    de: 'Küchenchef',
    fr: 'Chef cuisinier',
    es: 'Chef',
    it: 'Chef',
    pt: 'Chef',
    nl: 'Chef-kok',
    sv: 'Kock',
    da: 'Kok',
    no: 'Kokk',
    fi: 'Kokki'
  },
  'coach': {
    en: 'Coach',
    de: 'Trainer',
    fr: 'Entraîneur',
    es: 'Entrenador',
    it: 'Allenatore',
    pt: 'Treinador',
    nl: 'Coach',
    sv: 'Tränare',
    da: 'Træner',
    no: 'Trener',
    fi: 'Valmentaja'
  },
  'construction worker': {
    en: 'Construction Worker',
    de: 'Bauarbeiter',
    fr: 'Ouvrier du bâtiment',
    es: 'Trabajador de construcción',
    it: 'Operaio edile',
    pt: 'Trabalhador da construção',
    nl: 'Bouwvakker',
    sv: 'Byggnadsarbetare',
    da: 'Bygningsarbejder',
    no: 'Bygningsarbeider',
    fi: 'Rakennustyöntekijä'
  },
  'cook': {
    en: 'Cook',
    de: 'Koch',
    fr: 'Cuisinier',
    es: 'Cocinero',
    it: 'Cuoco',
    pt: 'Cozinheiro',
    nl: 'Kok',
    sv: 'Kock',
    da: 'Kok',
    no: 'Kokk',
    fi: 'Kokki'
  },
  'crossing guard': {
    en: 'Crossing Guard',
    de: 'Schülerlotse',
    fr: 'Agent de circulation',
    es: 'Guardia de cruce',
    it: 'Vigile scolastico',
    pt: 'Guarda de trânsito',
    nl: 'Verkeersregelaar',
    sv: 'Skolvärd',
    da: 'Skolepatrulje',
    no: 'Trafikkdirigent',
    fi: 'Liikenteenohjaaja'
  },
  'crossing guard 2': {
    en: 'Crossing Guard 2',
    de: 'Schülerlotse 2',
    fr: 'Agent de circulation 2',
    es: 'Guardia de cruce 2',
    it: 'Vigile scolastico 2',
    pt: 'Guarda de trânsito 2',
    nl: 'Verkeersregelaar 2',
    sv: 'Skolvärd 2',
    da: 'Skolepatrulje 2',
    no: 'Trafikkdirigent 2',
    fi: 'Liikenteenohjaaja 2'
  },
  'delivery driver': {
    en: 'Delivery Driver',
    de: 'Lieferfahrer',
    fr: 'Livreur',
    es: 'Repartidor',
    it: 'Fattorino',
    pt: 'Entregador',
    nl: 'Bezorger',
    sv: 'Leveranschaufför',
    da: 'Leveringschauffør',
    no: 'Budbilsjåfør',
    fi: 'Kuljettaja'
  },
  'detective': {
    en: 'Detective',
    de: 'Detektiv',
    fr: 'Détective',
    es: 'Detective',
    it: 'Detective',
    pt: 'Detetive',
    nl: 'Detective',
    sv: 'Detektiv',
    da: 'Detektiv',
    no: 'Detektiv',
    fi: 'Etsivä'
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
  'doctor 2': {
    en: 'Doctor 2',
    de: 'Arzt 2',
    fr: 'Médecin 2',
    es: 'Doctor 2',
    it: 'Dottore 2',
    pt: 'Médico 2',
    nl: 'Dokter 2',
    sv: 'Läkare 2',
    da: 'Læge 2',
    no: 'Lege 2',
    fi: 'Lääkäri 2'
  },
  'farmer': {
    en: 'Farmer',
    de: 'Bauer',
    fr: 'Fermier',
    es: 'Granjero',
    it: 'Agricoltore',
    pt: 'Fazendeiro',
    nl: 'Boer',
    sv: 'Bonde',
    da: 'Landmand',
    no: 'Bonde',
    fi: 'Maanviljelijä'
  },
  'firefighter': {
    en: 'Firefighter',
    de: 'Feuerwehrmann',
    fr: 'Pompier',
    es: 'Bombero',
    it: 'Vigile del fuoco',
    pt: 'Bombeiro',
    nl: 'Brandweerman',
    sv: 'Brandman',
    da: 'Brandmand',
    no: 'Brannmann',
    fi: 'Palomies'
  },
  'flight attendant': {
    en: 'Flight Attendant',
    de: 'Flugbegleiter',
    fr: 'Agent de bord',
    es: 'Sobrecargo',
    it: 'Assistente di volo',
    pt: 'Comissário de bordo',
    nl: 'Stewardess',
    sv: 'Flygvärdinna',
    da: 'Stewardesse',
    no: 'Flyvertinne',
    fi: 'Lentoemäntä'
  },
  'florist': {
    en: 'Florist',
    de: 'Florist',
    fr: 'Fleuriste',
    es: 'Florista',
    it: 'Fiorista',
    pt: 'Florista',
    nl: 'Bloemist',
    sv: 'Florist',
    da: 'Blomsterhandler',
    no: 'Blomsterhandler',
    fi: 'Kukkakauppias'
  },
  'gardener': {
    en: 'Gardener',
    de: 'Gärtner',
    fr: 'Jardinier',
    es: 'Jardinero',
    it: 'Giardiniere',
    pt: 'Jardineiro',
    nl: 'Tuinman',
    sv: 'Trädgårdsmästare',
    da: 'Gartner',
    no: 'Gartner',
    fi: 'Puutarhuri'
  },
  'janitor': {
    en: 'Janitor',
    de: 'Hausmeister',
    fr: 'Concierge',
    es: 'Conserje',
    it: 'Bidello',
    pt: 'Zelador',
    nl: 'Conciërge',
    sv: 'Vaktmästare',
    da: 'Pedel',
    no: 'Vaktmester',
    fi: 'Talonmies'
  },
  'judge': {
    en: 'Judge',
    de: 'Richter',
    fr: 'Juge',
    es: 'Juez',
    it: 'Giudice',
    pt: 'Juiz',
    nl: 'Rechter',
    sv: 'Domare',
    da: 'Dommer',
    no: 'Dommer',
    fi: 'Tuomari'
  },
  'librarian': {
    en: 'Librarian',
    de: 'Bibliothekar',
    fr: 'Bibliothécaire',
    es: 'Bibliotecario',
    it: 'Bibliotecario',
    pt: 'Bibliotecário',
    nl: 'Bibliothecaris',
    sv: 'Bibliotekarie',
    da: 'Bibliotekar',
    no: 'Bibliotekar',
    fi: 'Kirjastonhoitaja'
  },
  'mail carrier': {
    en: 'Mail Carrier',
    de: 'Briefträger',
    fr: 'Facteur',
    es: 'Cartero',
    it: 'Postino',
    pt: 'Carteiro',
    nl: 'Postbode',
    sv: 'Brevbärare',
    da: 'Postbud',
    no: 'Postbud',
    fi: 'Postinkantaja'
  },
  'mail carrier 2': {
    en: 'Mail Carrier 2',
    de: 'Briefträger 2',
    fr: 'Facteur 2',
    es: 'Cartero 2',
    it: 'Postino 2',
    pt: 'Carteiro 2',
    nl: 'Postbode 2',
    sv: 'Brevbärare 2',
    da: 'Postbud 2',
    no: 'Postbud 2',
    fi: 'Postinkantaja 2'
  },
  'mechanic': {
    en: 'Mechanic',
    de: 'Mechaniker',
    fr: 'Mécanicien',
    es: 'Mecánico',
    it: 'Meccanico',
    pt: 'Mecânico',
    nl: 'Monteur',
    sv: 'Mekaniker',
    da: 'Mekaniker',
    no: 'Mekaniker',
    fi: 'Mekaanikko'
  },
  'musician': {
    en: 'Musician',
    de: 'Musiker',
    fr: 'Musicien',
    es: 'Músico',
    it: 'Musicista',
    pt: 'Músico',
    nl: 'Muzikant',
    sv: 'Musiker',
    da: 'Musiker',
    no: 'Musiker',
    fi: 'Muusikko'
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
  'office worker': {
    en: 'Office Worker',
    de: 'Büroangestellter',
    fr: 'Employé de bureau',
    es: 'Empleado de oficina',
    it: 'Impiegato',
    pt: 'Funcionário de escritório',
    nl: 'Kantoormedewerker',
    sv: 'Kontorsarbetare',
    da: 'Kontormedarbejder',
    no: 'Kontorarbeider',
    fi: 'Toimistotyöntekijä'
  },
  'paramedic': {
    en: 'Paramedic',
    de: 'Rettungssanitäter',
    fr: 'Ambulancier',
    es: 'Paramédico',
    it: 'Paramedico',
    pt: 'Paramédico',
    nl: 'Ambulanceverpleegkundige',
    sv: 'Ambulanssjukvårdare',
    da: 'Ambulancebehandler',
    no: 'Ambulansearbeider',
    fi: 'Ensihoitaja'
  },
  'park ranger': {
    en: 'Park Ranger',
    de: 'Parkwächter',
    fr: 'Garde forestier',
    es: 'Guardaparques',
    it: 'Guardia forestale',
    pt: 'Guarda florestal',
    nl: 'Boswachter',
    sv: 'Parkväktare',
    da: 'Skovrider',
    no: 'Parkoppsynsmann',
    fi: 'Metsänvartija'
  },
  'pharmacist': {
    en: 'Pharmacist',
    de: 'Apotheker',
    fr: 'Pharmacien',
    es: 'Farmacéutico',
    it: 'Farmacista',
    pt: 'Farmacêutico',
    nl: 'Apotheker',
    sv: 'Farmaceut',
    da: 'Farmaceut',
    no: 'Farmasøyt',
    fi: 'Apteekkari'
  },
  'photographer': {
    en: 'Photographer',
    de: 'Fotograf',
    fr: 'Photographe',
    es: 'Fotógrafo',
    it: 'Fotografo',
    pt: 'Fotógrafo',
    nl: 'Fotograaf',
    sv: 'Fotograf',
    da: 'Fotograf',
    no: 'Fotograf',
    fi: 'Valokuvaaja'
  },
  'pilot': {
    en: 'Pilot',
    de: 'Pilot',
    fr: 'Pilote',
    es: 'Piloto',
    it: 'Pilota',
    pt: 'Piloto',
    nl: 'Piloot',
    sv: 'Pilot',
    da: 'Pilot',
    no: 'Pilot',
    fi: 'Lentäjä'
  },
  'police officer': {
    en: 'Police Officer',
    de: 'Polizist',
    fr: 'Policier',
    es: 'Policía',
    it: 'Poliziotto',
    pt: 'Policial',
    nl: 'Politieagent',
    sv: 'Polis',
    da: 'Politibetjent',
    no: 'Politibetjent',
    fi: 'Poliisi'
  },
  'sanitation worker': {
    en: 'Sanitation Worker',
    de: 'Müllmann',
    fr: 'Éboueur',
    es: 'Recolector de basura',
    it: 'Netturbino',
    pt: 'Gari',
    nl: 'Vuilnisman',
    sv: 'Renhållningsarbetare',
    da: 'Renovationsarbejder',
    no: 'Renovasjonsarbeider',
    fi: 'Jätehuoltotyöntekijä'
  },
  'singer': {
    en: 'Singer',
    de: 'Sänger',
    fr: 'Chanteur',
    es: 'Cantante',
    it: 'Cantante',
    pt: 'Cantor',
    nl: 'Zanger',
    sv: 'Sångare',
    da: 'Sanger',
    no: 'Sanger',
    fi: 'Laulaja'
  },
  'tailor': {
    en: 'Tailor',
    de: 'Schneider',
    fr: 'Tailleur',
    es: 'Sastre',
    it: 'Sarto',
    pt: 'Alfaiate',
    nl: 'Kleermaker',
    sv: 'Skräddare',
    da: 'Skrædder',
    no: 'Skredder',
    fi: 'Räätäli'
  },
  'teacher': {
    en: 'Teacher',
    de: 'Lehrer',
    fr: 'Enseignant',
    es: 'Maestro',
    it: 'Insegnante',
    pt: 'Professor',
    nl: 'Leraar',
    sv: 'Lärare',
    da: 'Lærer',
    no: 'Lærer',
    fi: 'Opettaja'
  },
  'truck driver': {
    en: 'Truck Driver',
    de: 'LKW-Fahrer',
    fr: 'Camionneur',
    es: 'Camionero',
    it: 'Camionista',
    pt: 'Caminhoneiro',
    nl: 'Vrachtwagenchauffeur',
    sv: 'Lastbilschaufför',
    da: 'Lastbilchauffør',
    no: 'Lastebilsjåfør',
    fi: 'Rekkakuski'
  },
  'veterinarian': {
    en: 'Veterinarian',
    de: 'Tierarzt',
    fr: 'Vétérinaire',
    es: 'Veterinario',
    it: 'Veterinario',
    pt: 'Veterinário',
    nl: 'Dierenarts',
    sv: 'Veterinär',
    da: 'Dyrlæge',
    no: 'Veterinær',
    fi: 'Eläinlääkäri'
  },
  'waitress': {
    en: 'Waitress',
    de: 'Kellnerin',
    fr: 'Serveuse',
    es: 'Mesera',
    it: 'Cameriera',
    pt: 'Garçonete',
    nl: 'Serveerster',
    sv: 'Servitris',
    da: 'Servitrice',
    no: 'Servitør',
    fi: 'Tarjoilija'
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
  console.log('Image Import Script: Occupations');
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
