#!/usr/bin/env node

/**
 * Simplified migration script - creates image assets with direct file references
 * This bypasses the upload API and creates entries directly
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const IMAGES_DIR = path.join(__dirname, '../frontend/public/images');

// Test subset - only 3 themes
const TEST_THEMES = ['animals', 'food', 'transportation'];
const MAX_IMAGES_PER_THEME = 5;

// Import translations from our comprehensive dictionary
const translations = {
  themes: {
    'animals': {
      'en': 'Animals', 'de': 'Tiere', 'fr': 'Animaux', 'es': 'Animales',
      'pt': 'Animais', 'it': 'Animali', 'nl': 'Dieren', 'sv': 'Djur',
      'da': 'Dyr', 'no': 'Dyr', 'fi': 'Eläimet'
    },
    'food': {
      'en': 'Food', 'de': 'Essen', 'fr': 'Nourriture', 'es': 'Comida',
      'pt': 'Comida', 'it': 'Cibo', 'nl': 'Eten', 'sv': 'Mat',
      'da': 'Mad', 'no': 'Mat', 'fi': 'Ruoka'
    },
    'transportation': {
      'en': 'Transportation', 'de': 'Transport', 'fr': 'Transport', 'es': 'Transporte',
      'pt': 'Transporte', 'it': 'Trasporti', 'nl': 'Vervoer', 'sv': 'Transport',
      'da': 'Transport', 'no': 'Transport', 'fi': 'Liikenne'
    }
  },
  images: {
    'cat': { 'en': 'Cat', 'de': 'Katze', 'fr': 'Chat', 'es': 'Gato', 'pt': 'Gato', 'it': 'Gatto', 'nl': 'Kat', 'sv': 'Katt', 'da': 'Kat', 'no': 'Katt', 'fi': 'Kissa' },
    'dog': { 'en': 'Dog', 'de': 'Hund', 'fr': 'Chien', 'es': 'Perro', 'pt': 'Cão', 'it': 'Cane', 'nl': 'Hond', 'sv': 'Hund', 'da': 'Hund', 'no': 'Hund', 'fi': 'Koira' },
    'bird': { 'en': 'Bird', 'de': 'Vogel', 'fr': 'Oiseau', 'es': 'Pájaro', 'pt': 'Pássaro', 'it': 'Uccello', 'nl': 'Vogel', 'sv': 'Fågel', 'da': 'Fugl', 'no': 'Fugl', 'fi': 'Lintu' },
    'cow': { 'en': 'Cow', 'de': 'Kuh', 'fr': 'Vache', 'es': 'Vaca', 'pt': 'Vaca', 'it': 'Mucca', 'nl': 'Koe', 'sv': 'Ko', 'da': 'Ko', 'no': 'Ku', 'fi': 'Lehmä' },
    'apple': { 'en': 'Apple', 'de': 'Apfel', 'fr': 'Pomme', 'es': 'Manzana', 'pt': 'Maçã', 'it': 'Mela', 'nl': 'Appel', 'sv': 'Äpple', 'da': 'Æble', 'no': 'Eple', 'fi': 'Omena' },
    'banana': { 'en': 'Banana', 'de': 'Banane', 'fr': 'Banane', 'es': 'Plátano', 'pt': 'Banana', 'it': 'Banana', 'nl': 'Banaan', 'sv': 'Banan', 'da': 'Banan', 'no': 'Banan', 'fi': 'Banaani' },
    'carrot': { 'en': 'Carrot', 'de': 'Karotte', 'fr': 'Carotte', 'es': 'Zanahoria', 'pt': 'Cenoura', 'it': 'Carota', 'nl': 'Wortel', 'sv': 'Morot', 'da': 'Gulerod', 'no': 'Gulrot', 'fi': 'Porkkana' },
    'car': { 'en': 'Car', 'de': 'Auto', 'fr': 'Voiture', 'es': 'Coche', 'pt': 'Carro', 'it': 'Auto', 'nl': 'Auto', 'sv': 'Bil', 'da': 'Bil', 'no': 'Bil', 'fi': 'Auto' },
    'bus': { 'en': 'Bus', 'de': 'Bus', 'fr': 'Bus', 'es': 'Autobús', 'pt': 'Ônibus', 'it': 'Autobus', 'nl': 'Bus', 'sv': 'Buss', 'da': 'Bus', 'no': 'Buss', 'fi': 'Bussi' },
    'train': { 'en': 'Train', 'de': 'Zug', 'fr': 'Train', 'es': 'Tren', 'pt': 'Trem', 'it': 'Treno', 'nl': 'Trein', 'sv': 'Tåg', 'da': 'Tog', 'no': 'Tog', 'fi': 'Juna' }
  }
};

// Helper to create axios instance
const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth header if token is provided
if (STRAPI_API_TOKEN) {
  api.defaults.headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
}

/**
 * Create or update image theme
 */
async function createOrUpdateTheme(folderName) {
  try {
    // Check if theme exists
    const { data: existingData } = await api.get('/image-themes', {
      params: {
        filters: { folderName: { $eq: folderName } },
        fields: ['id']
      }
    });

    const themeTranslations = translations.themes[folderName] || {};
    
    const themeData = {
      folderName: folderName,
      displayName: themeTranslations.en || folderName,
      translations: themeTranslations,
      sortOrder: TEST_THEMES.indexOf(folderName)
    };

    let result;
    if (existingData.data && existingData.data.length > 0) {
      // Update existing
      result = await api.put(`/image-themes/${existingData.data[0].id}`, {
        data: themeData
      });
      console.log(`✓ Updated theme: ${folderName}`);
    } else {
      // Create new
      result = await api.post('/image-themes', {
        data: themeData
      });
      console.log(`✓ Created theme: ${folderName}`);
    }

    return result.data.data;
  } catch (error) {
    console.error(`✗ Failed to create/update theme ${folderName}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Create or update image asset (simplified - without file upload)
 */
async function createOrUpdateImageAsset(fileName, themeFolderName, themeId) {
  try {
    // Check if asset exists
    const { data: existingData } = await api.get('/image-assets', {
      params: {
        filters: { fileName: { $eq: fileName } },
        fields: ['id']
      }
    });

    // Get translations
    const baseName = path.basename(fileName, path.extname(fileName)).toLowerCase();
    const imageTranslations = translations.images[baseName] || {};
    
    // If no translations, create default
    if (Object.keys(imageTranslations).length === 0) {
      const displayName = baseName.replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].forEach(locale => {
        imageTranslations[locale] = displayName;
      });
    }

    // Create asset data with a reference to the file location
    const assetData = {
      fileName: fileName,
      displayName: imageTranslations.en || baseName,
      translations: imageTranslations,
      fileUrl: `/images/${themeFolderName}/${fileName}`, // Direct reference to public file
      themes: themeId ? [themeId] : [] // This properly links the image to the theme
    };

    let result;
    if (existingData.data && existingData.data.length > 0) {
      // Update existing
      result = await api.put(`/image-assets/${existingData.data[0].id}`, {
        data: assetData
      });
      console.log(`  ✓ Updated image: ${fileName}`);
    } else {
      // Create new
      result = await api.post('/image-assets', {
        data: assetData
      });
      console.log(`  ✓ Created image: ${fileName}`);
    }

    return result.data.data;
  } catch (error) {
    console.error(`  ✗ Failed to create/update image ${fileName}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('================================================');
  console.log('  Simplified Image Library Migration');
  console.log('================================================');
  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`Test themes: ${TEST_THEMES.join(', ')}`);
  console.log(`Max images per theme: ${MAX_IMAGES_PER_THEME}`);
  console.log('');

  // Test Strapi connection
  try {
    await api.get('/image-themes');
    console.log('✓ Connected to Strapi successfully\n');
  } catch (error) {
    console.error('✗ Failed to connect to Strapi:', error.message);
    console.log('\nMake sure:');
    console.log('1. Strapi is running (npm run develop)');
    console.log('2. The URL is correct');
    console.log('3. Authentication is disabled for development');
    process.exit(1);
  }

  let totalThemes = 0;
  let totalImages = 0;

  // Process each test theme
  for (const themeName of TEST_THEMES) {
    const themePath = path.join(IMAGES_DIR, themeName);
    
    console.log(`\nProcessing theme: ${themeName}`);
    console.log('----------------------------------------');
    
    // Check if theme folder exists
    try {
      await fs.access(themePath);
    } catch {
      console.log(`✗ Theme folder not found: ${themePath}`);
      continue;
    }

    // Create theme in Strapi
    const theme = await createOrUpdateTheme(themeName);
    if (!theme) {
      console.log(`✗ Skipping theme ${themeName} due to errors`);
      continue;
    }
    totalThemes++;

    // Get images in theme folder
    const files = await fs.readdir(themePath);
    const imageFiles = files
      .filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f))
      .slice(0, MAX_IMAGES_PER_THEME);

    console.log(`Found ${imageFiles.length} images (max ${MAX_IMAGES_PER_THEME})`);

    // Process each image
    for (const imageFile of imageFiles) {
      const asset = await createOrUpdateImageAsset(imageFile, themeName, theme.id);
      if (asset) {
        totalImages++;
      }
    }
  }

  // Summary
  console.log('\n================================================');
  console.log('  Migration Complete!');
  console.log('================================================');
  console.log(`✓ Themes migrated: ${totalThemes}`);
  console.log(`✓ Images migrated: ${totalImages}`);
  console.log('\nTest the API endpoints:');
  console.log(`- ${STRAPI_URL}/api/image-themes/translated?locale=de`);
  console.log(`- ${STRAPI_URL}/api/image-themes/folder/animals?locale=fr`);
  console.log(`- ${STRAPI_URL}/api/image-assets?filters[themes][folderName][$eq]=food&locale=es`);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { createOrUpdateTheme, createOrUpdateImageAsset };