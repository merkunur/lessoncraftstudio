const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Comprehensive translations dictionary
const imageTranslations = {
  // Animals
  'cat': { 'en': 'Cat', 'de': 'Katze', 'fr': 'Chat', 'es': 'Gato', 'pt': 'Gato', 'it': 'Gatto', 'nl': 'Kat', 'sv': 'Katt', 'da': 'Kat', 'no': 'Katt', 'fi': 'Kissa' },
  'dog': { 'en': 'Dog', 'de': 'Hund', 'fr': 'Chien', 'es': 'Perro', 'pt': 'Cão', 'it': 'Cane', 'nl': 'Hond', 'sv': 'Hund', 'da': 'Hund', 'no': 'Hund', 'fi': 'Koira' },
  'bird': { 'en': 'Bird', 'de': 'Vogel', 'fr': 'Oiseau', 'es': 'Pájaro', 'pt': 'Pássaro', 'it': 'Uccello', 'nl': 'Vogel', 'sv': 'Fågel', 'da': 'Fugl', 'no': 'Fugl', 'fi': 'Lintu' },
  'fish': { 'en': 'Fish', 'de': 'Fisch', 'fr': 'Poisson', 'es': 'Pez', 'pt': 'Peixe', 'it': 'Pesce', 'nl': 'Vis', 'sv': 'Fisk', 'da': 'Fisk', 'no': 'Fisk', 'fi': 'Kala' },
  'lion': { 'en': 'Lion', 'de': 'Löwe', 'fr': 'Lion', 'es': 'León', 'pt': 'Leão', 'it': 'Leone', 'nl': 'Leeuw', 'sv': 'Lejon', 'da': 'Løve', 'no': 'Løve', 'fi': 'Leijona' },
  'elephant': { 'en': 'Elephant', 'de': 'Elefant', 'fr': 'Éléphant', 'es': 'Elefante', 'pt': 'Elefante', 'it': 'Elefante', 'nl': 'Olifant', 'sv': 'Elefant', 'da': 'Elefant', 'no': 'Elefant', 'fi': 'Norsu' },
  'cow': { 'en': 'Cow', 'de': 'Kuh', 'fr': 'Vache', 'es': 'Vaca', 'pt': 'Vaca', 'it': 'Mucca', 'nl': 'Koe', 'sv': 'Ko', 'da': 'Ko', 'no': 'Ku', 'fi': 'Lehmä' },
  'horse': { 'en': 'Horse', 'de': 'Pferd', 'fr': 'Cheval', 'es': 'Caballo', 'pt': 'Cavalo', 'it': 'Cavallo', 'nl': 'Paard', 'sv': 'Häst', 'da': 'Hest', 'no': 'Hest', 'fi': 'Hevonen' },
  'pig': { 'en': 'Pig', 'de': 'Schwein', 'fr': 'Cochon', 'es': 'Cerdo', 'pt': 'Porco', 'it': 'Maiale', 'nl': 'Varken', 'sv': 'Gris', 'da': 'Gris', 'no': 'Gris', 'fi': 'Sika' },
  'sheep': { 'en': 'Sheep', 'de': 'Schaf', 'fr': 'Mouton', 'es': 'Oveja', 'pt': 'Ovelha', 'it': 'Pecora', 'nl': 'Schaap', 'sv': 'Får', 'da': 'Får', 'no': 'Sau', 'fi': 'Lammas' },
  'rabbit': { 'en': 'Rabbit', 'de': 'Hase', 'fr': 'Lapin', 'es': 'Conejo', 'pt': 'Coelho', 'it': 'Coniglio', 'nl': 'Konijn', 'sv': 'Kanin', 'da': 'Kanin', 'no': 'Kanin', 'fi': 'Kani' },
  'mouse': { 'en': 'Mouse', 'de': 'Maus', 'fr': 'Souris', 'es': 'Ratón', 'pt': 'Rato', 'it': 'Topo', 'nl': 'Muis', 'sv': 'Mus', 'da': 'Mus', 'no': 'Mus', 'fi': 'Hiiri' },
  
  // Food
  'apple': { 'en': 'Apple', 'de': 'Apfel', 'fr': 'Pomme', 'es': 'Manzana', 'pt': 'Maçã', 'it': 'Mela', 'nl': 'Appel', 'sv': 'Äpple', 'da': 'Æble', 'no': 'Eple', 'fi': 'Omena' },
  'banana': { 'en': 'Banana', 'de': 'Banane', 'fr': 'Banane', 'es': 'Plátano', 'pt': 'Banana', 'it': 'Banana', 'nl': 'Banaan', 'sv': 'Banan', 'da': 'Banan', 'no': 'Banan', 'fi': 'Banaani' },
  'bread': { 'en': 'Bread', 'de': 'Brot', 'fr': 'Pain', 'es': 'Pan', 'pt': 'Pão', 'it': 'Pane', 'nl': 'Brood', 'sv': 'Bröd', 'da': 'Brød', 'no': 'Brød', 'fi': 'Leipä' },
  'pizza': { 'en': 'Pizza', 'de': 'Pizza', 'fr': 'Pizza', 'es': 'Pizza', 'pt': 'Pizza', 'it': 'Pizza', 'nl': 'Pizza', 'sv': 'Pizza', 'da': 'Pizza', 'no': 'Pizza', 'fi': 'Pizza' },
  'cake': { 'en': 'Cake', 'de': 'Kuchen', 'fr': 'Gâteau', 'es': 'Pastel', 'pt': 'Bolo', 'it': 'Torta', 'nl': 'Taart', 'sv': 'Tårta', 'da': 'Kage', 'no': 'Kake', 'fi': 'Kakku' },
  
  // Add more translations as needed
};

function getTranslations(fileName) {
  const baseName = fileName.toLowerCase().replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
  
  if (imageTranslations[baseName]) {
    return imageTranslations[baseName];
  }
  
  // Generate default translations
  const capitalized = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  return {
    'en': capitalized,
    'de': capitalized,
    'fr': capitalized,
    'es': capitalized,
    'pt': capitalized,
    'it': capitalized,
    'nl': capitalized,
    'sv': capitalized,
    'da': capitalized,
    'no': capitalized,
    'fi': capitalized
  };
}

async function checkExistingAsset(fileName, theme) {
  try {
    const response = await axios.get(
      `${STRAPI_URL}/api/image-assets?filters[fileName][$eq]=${fileName}&filters[metadata][theme][$eq]=${theme}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    );
    return response.data.data.length > 0 ? response.data.data[0] : null;
  } catch (error) {
    console.error(`Error checking existing asset: ${error.message}`);
    return null;
  }
}

async function createOrUpdateAsset(filePath, fileName, theme, translations) {
  try {
    const existing = await checkExistingAsset(fileName, theme);
    
    if (existing) {
      // Update translations if needed
      console.log(`Updating translations for existing asset: ${fileName} in ${theme}`);
      await axios.put(
        `${STRAPI_URL}/api/image-assets/${existing.id}`,
        {
          data: {
            translations: translations,
            displayName: translations.en
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return;
    }
    
    console.log(`Creating new asset: ${fileName} in ${theme}`);
    
    // Create new asset
    const assetData = {
      fileName: fileName,
      displayName: translations.en,
      translations: translations,
      metadata: {
        originalPath: `/images/${theme}/${fileName}`,
        theme: theme
      },
      isPremium: false
    };
    
    await axios.post(
      `${STRAPI_URL}/api/image-assets`,
      { data: assetData },
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error(`Error creating/updating asset ${fileName}: ${error.message}`);
  }
}

async function migrateTheme(themePath, themeName) {
  console.log(`\nMigrating theme: ${themeName}`);
  const fullPath = path.join(__dirname, '..', 'frontend', 'public', 'images', themePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Theme path not found: ${fullPath}`);
    return;
  }
  
  const files = fs.readdirSync(fullPath);
  const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
  
  console.log(`Found ${imageFiles.length} images in ${themeName}`);
  
  for (const file of imageFiles) {
    const fileName = path.basename(file, path.extname(file));
    const translations = getTranslations(file);
    await createOrUpdateAsset(
      path.join(fullPath, file),
      fileName,
      themeName,
      translations
    );
  }
}

async function migrateAllImages() {
  console.log('Starting migration of all images to Strapi...');
  
  const imagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
  const themes = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`Found ${themes.length} themes to migrate: ${themes.join(', ')}`);
  
  for (const theme of themes) {
    await migrateTheme(theme, theme);
  }
  
  console.log('\nMigration complete!');
}

// Run migration
migrateAllImages().catch(console.error);