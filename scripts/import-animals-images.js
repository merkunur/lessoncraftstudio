/**
 * Import Animals Images to Database
 *
 * This script imports the "animals" theme which is the DEFAULT theme
 * used by all worksheet generators. The theme name MUST be exactly "animals"
 * to match the hardcoded references in 33 apps.
 *
 * Run from: /opt/lessoncraftstudio
 * Command: node scripts/import-animals-images.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Theme configuration - name MUST be 'animals' to match hardcoded default
const themeName = 'animals';
const themeDisplayNames = {
  en: 'Animals',
  de: 'Tiere',
  fr: 'Animaux',
  es: 'Animales',
  it: 'Animali',
  pt: 'Animais',
  nl: 'Dieren',
  sv: 'Djur',
  da: 'Dyr',
  no: 'Dyr',
  fi: 'Eläimet'
};

// Image translations in all 11 languages
const imageTranslations = {
  'antelope': { en: 'Antelope', de: 'Antilope', fr: 'Antilope', es: 'Antílope', it: 'Antilope', pt: 'Antílope', nl: 'Antilope', sv: 'Antilop', da: 'Antilope', no: 'Antilope', fi: 'Antilooppi' },
  'bat': { en: 'Bat', de: 'Fledermaus', fr: 'Chauve-souris', es: 'Murciélago', it: 'Pipistrello', pt: 'Morcego', nl: 'Vleermuis', sv: 'Fladdermus', da: 'Flagermus', no: 'Flaggermus', fi: 'Lepakko' },
  'camel': { en: 'Camel', de: 'Kamel', fr: 'Chameau', es: 'Camello', it: 'Cammello', pt: 'Camelo', nl: 'Kameel', sv: 'Kamel', da: 'Kamel', no: 'Kamel', fi: 'Kameli' },
  'cat': { en: 'Cat', de: 'Katze', fr: 'Chat', es: 'Gato', it: 'Gatto', pt: 'Gato', nl: 'Kat', sv: 'Katt', da: 'Kat', no: 'Katt', fi: 'Kissa' },
  'dog': { en: 'Dog', de: 'Hund', fr: 'Chien', es: 'Perro', it: 'Cane', pt: 'Cachorro', nl: 'Hond', sv: 'Hund', da: 'Hund', no: 'Hund', fi: 'Koira' },
  'dolphin': { en: 'Dolphin', de: 'Delfin', fr: 'Dauphin', es: 'Delfín', it: 'Delfino', pt: 'Golfinho', nl: 'Dolfijn', sv: 'Delfin', da: 'Delfin', no: 'Delfin', fi: 'Delfiini' },
  'donkey': { en: 'Donkey', de: 'Esel', fr: 'Âne', es: 'Burro', it: 'Asino', pt: 'Burro', nl: 'Ezel', sv: 'Åsna', da: 'Æsel', no: 'Esel', fi: 'Aasi' },
  'duck': { en: 'Duck', de: 'Ente', fr: 'Canard', es: 'Pato', it: 'Anatra', pt: 'Pato', nl: 'Eend', sv: 'Anka', da: 'And', no: 'And', fi: 'Ankka' },
  'elephant': { en: 'Elephant', de: 'Elefant', fr: 'Éléphant', es: 'Elefante', it: 'Elefante', pt: 'Elefante', nl: 'Olifant', sv: 'Elefant', da: 'Elefant', no: 'Elefant', fi: 'Norsu' },
  'fish': { en: 'Fish', de: 'Fisch', fr: 'Poisson', es: 'Pez', it: 'Pesce', pt: 'Peixe', nl: 'Vis', sv: 'Fisk', da: 'Fisk', no: 'Fisk', fi: 'Kala' },
  'fox': { en: 'Fox', de: 'Fuchs', fr: 'Renard', es: 'Zorro', it: 'Volpe', pt: 'Raposa', nl: 'Vos', sv: 'Räv', da: 'Ræv', no: 'Rev', fi: 'Kettu' },
  'giraffe': { en: 'Giraffe', de: 'Giraffe', fr: 'Girafe', es: 'Jirafa', it: 'Giraffa', pt: 'Girafa', nl: 'Giraffe', sv: 'Giraff', da: 'Giraf', no: 'Sjiraff', fi: 'Kirahvi' },
  'hippopotamus': { en: 'Hippopotamus', de: 'Nilpferd', fr: 'Hippopotame', es: 'Hipopótamo', it: 'Ippopotamo', pt: 'Hipopótamo', nl: 'Nijlpaard', sv: 'Flodhäst', da: 'Flodhest', no: 'Flodhest', fi: 'Virtahepo' },
  'horse': { en: 'Horse', de: 'Pferd', fr: 'Cheval', es: 'Caballo', it: 'Cavallo', pt: 'Cavalo', nl: 'Paard', sv: 'Häst', da: 'Hest', no: 'Hest', fi: 'Hevonen' },
  'iguana': { en: 'Iguana', de: 'Leguan', fr: 'Iguane', es: 'Iguana', it: 'Iguana', pt: 'Iguana', nl: 'Leguaan', sv: 'Leguan', da: 'Leguan', no: 'Leguan', fi: 'Iguaani' },
  'jaguar': { en: 'Jaguar', de: 'Jaguar', fr: 'Jaguar', es: 'Jaguar', it: 'Giaguaro', pt: 'Onça', nl: 'Jaguar', sv: 'Jaguar', da: 'Jaguar', no: 'Jaguar', fi: 'Jaguaari' },
  'koala': { en: 'Koala', de: 'Koala', fr: 'Koala', es: 'Koala', it: 'Koala', pt: 'Coala', nl: 'Koala', sv: 'Koala', da: 'Koala', no: 'Koala', fi: 'Koala' },
  'leopard': { en: 'Leopard', de: 'Leopard', fr: 'Léopard', es: 'Leopardo', it: 'Leopardo', pt: 'Leopardo', nl: 'Luipaard', sv: 'Leopard', da: 'Leopard', no: 'Leopard', fi: 'Leopardi' },
  'moose': { en: 'Moose', de: 'Elch', fr: 'Élan', es: 'Alce', it: 'Alce', pt: 'Alce', nl: 'Eland', sv: 'Älg', da: 'Elg', no: 'Elg', fi: 'Hirvi' },
  'orangutan': { en: 'Orangutan', de: 'Orang-Utan', fr: 'Orang-outan', es: 'Orangután', it: 'Orango', pt: 'Orangotango', nl: 'Orang-oetan', sv: 'Orangutang', da: 'Orangutang', no: 'Orangutang', fi: 'Oranki' },
  'owl': { en: 'Owl', de: 'Eule', fr: 'Hibou', es: 'Búho', it: 'Gufo', pt: 'Coruja', nl: 'Uil', sv: 'Uggla', da: 'Ugle', no: 'Ugle', fi: 'Pöllö' },
  'panda': { en: 'Panda', de: 'Panda', fr: 'Panda', es: 'Panda', it: 'Panda', pt: 'Panda', nl: 'Panda', sv: 'Panda', da: 'Panda', no: 'Panda', fi: 'Panda' },
  'penguin': { en: 'Penguin', de: 'Pinguin', fr: 'Pingouin', es: 'Pingüino', it: 'Pinguino', pt: 'Pinguim', nl: 'Pinguïn', sv: 'Pingvin', da: 'Pingvin', no: 'Pingvin', fi: 'Pingviini' },
  'pig': { en: 'Pig', de: 'Schwein', fr: 'Cochon', es: 'Cerdo', it: 'Maiale', pt: 'Porco', nl: 'Varken', sv: 'Gris', da: 'Gris', no: 'Gris', fi: 'Sika' },
  'rabbit': { en: 'Rabbit', de: 'Kaninchen', fr: 'Lapin', es: 'Conejo', it: 'Coniglio', pt: 'Coelho', nl: 'Konijn', sv: 'Kanin', da: 'Kanin', no: 'Kanin', fi: 'Kani' },
  'raccoon': { en: 'Raccoon', de: 'Waschbär', fr: 'Raton laveur', es: 'Mapache', it: 'Procione', pt: 'Guaxinim', nl: 'Wasbeer', sv: 'Tvättbjörn', da: 'Vaskebjørn', no: 'Vaskebjørn', fi: 'Pesukarhu' },
  'reindeer': { en: 'Reindeer', de: 'Rentier', fr: 'Renne', es: 'Reno', it: 'Renna', pt: 'Rena', nl: 'Rendier', sv: 'Ren', da: 'Rensdyr', no: 'Reinsdyr', fi: 'Poro' },
  'seagull': { en: 'Seagull', de: 'Möwe', fr: 'Mouette', es: 'Gaviota', it: 'Gabbiano', pt: 'Gaivota', nl: 'Zeemeeuw', sv: 'Fiskmås', da: 'Måge', no: 'Måke', fi: 'Lokki' },
  'sheep': { en: 'Sheep', de: 'Schaf', fr: 'Mouton', es: 'Oveja', it: 'Pecora', pt: 'Ovelha', nl: 'Schaap', sv: 'Får', da: 'Får', no: 'Sau', fi: 'Lammas' },
  'swan': { en: 'Swan', de: 'Schwan', fr: 'Cygne', es: 'Cisne', it: 'Cigno', pt: 'Cisne', nl: 'Zwaan', sv: 'Svan', da: 'Svane', no: 'Svane', fi: 'Joutsen' },
  'tiger': { en: 'Tiger', de: 'Tiger', fr: 'Tigre', es: 'Tigre', it: 'Tigre', pt: 'Tigre', nl: 'Tijger', sv: 'Tiger', da: 'Tiger', no: 'Tiger', fi: 'Tiikeri' },
  'turtle': { en: 'Turtle', de: 'Schildkröte', fr: 'Tortue', es: 'Tortuga', it: 'Tartaruga', pt: 'Tartaruga', nl: 'Schildpad', sv: 'Sköldpadda', da: 'Skildpadde', no: 'Skilpadde', fi: 'Kilpikonna' },
  'vulture': { en: 'Vulture', de: 'Geier', fr: 'Vautour', es: 'Buitre', it: 'Avvoltoio', pt: 'Abutre', nl: 'Gier', sv: 'Gam', da: 'Grib', no: 'Gribb', fi: 'Korppikotka' },
  'whale': { en: 'Whale', de: 'Wal', fr: 'Baleine', es: 'Ballena', it: 'Balena', pt: 'Baleia', nl: 'Walvis', sv: 'Val', da: 'Hval', no: 'Hval', fi: 'Valas' },
  'wolf': { en: 'Wolf', de: 'Wolf', fr: 'Loup', es: 'Lobo', it: 'Lupo', pt: 'Lobo', nl: 'Wolf', sv: 'Varg', da: 'Ulv', no: 'Ulv', fi: 'Susi' },
  'woodpecker': { en: 'Woodpecker', de: 'Specht', fr: 'Pic', es: 'Pájaro carpintero', it: 'Picchio', pt: 'Pica-pau', nl: 'Specht', sv: 'Hackspett', da: 'Spætte', no: 'Hakkespett', fi: 'Tikka' },
  'zebra': { en: 'Zebra', de: 'Zebra', fr: 'Zèbre', es: 'Cebra', it: 'Zebra', pt: 'Zebra', nl: 'Zebra', sv: 'Sebra', da: 'Zebra', no: 'Sebra', fi: 'Seepra' }
};

// Source folder for images
const sourceFolder = '/opt/lessoncraftstudio/image library/animals';

async function importImages() {
  console.log('Starting Animals theme import...');
  console.log(`Theme name: ${themeName} (DEFAULT theme for all apps)`);
  console.log(`Source folder: ${sourceFolder}`);

  // Check if source folder exists
  if (!fs.existsSync(sourceFolder)) {
    console.error(`Source folder not found: ${sourceFolder}`);
    process.exit(1);
  }

  // Check if theme already exists
  const existingTheme = await prisma.imageTheme.findFirst({
    where: { name: themeName }
  });

  if (existingTheme) {
    console.log(`\n⚠️  Theme "${themeName}" already exists with ID: ${existingTheme.id}`);
    console.log('Skipping to avoid duplicates. Delete existing theme first if you want to reimport.');
    await prisma.$disconnect();
    return;
  }

  // Create theme
  const theme = await prisma.imageTheme.create({
    data: {
      name: themeName,
      displayNames: themeDisplayNames,
      type: 'images',
      sortOrder: 0  // First position since it's the default theme
    }
  });

  console.log(`\nCreated theme: ${themeName} (ID: ${theme.id})`);

  // Create destination directories
  const destDir = `/opt/lessoncraftstudio/frontend/public/images/${theme.id}`;
  const standaloneDir = `/opt/lessoncraftstudio/frontend/.next/standalone/public/images/${theme.id}`;

  fs.mkdirSync(destDir, { recursive: true });
  fs.mkdirSync(standaloneDir, { recursive: true });
  console.log(`Created directories:\n  ${destDir}\n  ${standaloneDir}`);

  // Get all PNG files
  const files = fs.readdirSync(sourceFolder).filter(f => f.endsWith('.png'));
  console.log(`\nFound ${files.length} images to import`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const baseName = file.replace('.png', '').toLowerCase();

    try {
      // Check if we have translations for this image
      if (!imageTranslations[baseName]) {
        console.log(`⚠️  No translations for: ${baseName}, skipping`);
        skipCount++;
        continue;
      }

      const sourcePath = path.join(sourceFolder, file);

      // Generate unique filename
      const timestamp = Date.now();
      const randomStr = crypto.randomBytes(4).toString('hex');
      const newFilename = `${baseName}-${timestamp}-${randomStr}.webp`;

      const destPath = path.join(destDir, newFilename);
      const standalonePath = path.join(standaloneDir, newFilename);

      // Optimize and convert to WebP
      await sharp(sourcePath)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(destPath);

      // Copy to standalone directory
      fs.copyFileSync(destPath, standalonePath);

      // Get file stats
      const stats = fs.statSync(destPath);
      const metadata = await sharp(destPath).metadata();

      // Create database record
      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/${theme.id}/${newFilename}`,
          translations: imageTranslations[baseName],
          fileSize: stats.size,
          mimeType: 'image/webp',
          width: metadata.width || 800,
          height: metadata.height || 800,
          sortOrder: i
        }
      });

      successCount++;
      console.log(`✓ [${i + 1}/${files.length}] ${baseName} -> ${newFilename}`);
    } catch (error) {
      errorCount++;
      console.error(`✗ [${i + 1}/${files.length}] ${file}: ${error.message}`);
    }
  }

  console.log('\n========================================');
  console.log('Import Complete!');
  console.log('========================================');
  console.log(`Theme: ${themeName}`);
  console.log(`Theme ID: ${theme.id}`);
  console.log(`Success: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log('========================================');
  console.log('\nThis theme will now be used as the DEFAULT theme');
  console.log('for all worksheet generators.');
  console.log('\nRun: pm2 restart lessoncraftstudio');

  await prisma.$disconnect();
}

importImages().catch(async (error) => {
  console.error('Import failed:', error);
  await prisma.$disconnect();
  process.exit(1);
});
