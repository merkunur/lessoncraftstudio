const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token-here';

// Map theme folders to proper display names
const themeMapping = {
  'alphabet': 'Alphabet',
  'alphabetsvg': 'Alphabet SVG',
  'animals': 'Animals',
  'background': 'Backgrounds',
  'borders': 'Borders',
  'coloring': 'Coloring',
  'drawing lines': 'Drawing Lines',
  'food': 'Food',
  'general': 'General',
  'numbers': 'Numbers',
  'nature': 'Nature',
  'school': 'School',
  'shapes': 'Shapes',
  'sports': 'Sports',
  'template': 'Templates',
  'transportation': 'Transportation',
  'weather': 'Weather'
};

// Supported locales
const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Translation mappings for image names
const translations = {
  'cat': {
    'en': 'Cat',
    'de': 'Katze',
    'fr': 'Chat',
    'es': 'Gato',
    'pt': 'Gato',
    'it': 'Gatto',
    'nl': 'Kat',
    'sv': 'Katt',
    'da': 'Kat',
    'no': 'Katt',
    'fi': 'Kissa'
  },
  'dog': {
    'en': 'Dog',
    'de': 'Hund',
    'fr': 'Chien',
    'es': 'Perro',
    'pt': 'Cão',
    'it': 'Cane',
    'nl': 'Hond',
    'sv': 'Hund',
    'da': 'Hund',
    'no': 'Hund',
    'fi': 'Koira'
  },
  'apple': {
    'en': 'Apple',
    'de': 'Apfel',
    'fr': 'Pomme',
    'es': 'Manzana',
    'pt': 'Maçã',
    'it': 'Mela',
    'nl': 'Appel',
    'sv': 'Äpple',
    'da': 'Æble',
    'no': 'Eple',
    'fi': 'Omena'
  },
  // Add more translations as needed
};

async function getDirectories(source) {
  const dirents = await fs.readdir(source, { withFileTypes: true });
  return dirents
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

async function getImages(dirPath) {
  const files = await fs.readdir(dirPath);
  return files.filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file));
}

function capitalizeWords(str) {
  return str.split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getTranslation(baseName, locale) {
  const key = baseName.toLowerCase().replace(/[-_\s]+/g, '');
  if (translations[key] && translations[key][locale]) {
    return translations[key][locale];
  }
  // Fallback to capitalized base name
  return capitalizeWords(baseName.replace(/[-_]/g, ' '));
}

async function createTheme(themeKey, displayName) {
  console.log(`Creating theme: ${themeKey}`);
  
  try {
    // Create theme for English first
    const themeData = {
      data: {
        themeKey: themeKey,
        displayName: displayName,
        sortOrder: 0,
        locale: 'en'
      }
    };
    
    const response = await fetch(`${STRAPI_URL}/api/image-themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(themeData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to create theme ${themeKey}:`, error);
      return null;
    }
    
    const created = await response.json();
    console.log(`✓ Created theme ${themeKey}`);
    return created.data.id;
  } catch (error) {
    console.error(`Error creating theme ${themeKey}:`, error);
    return null;
  }
}

async function uploadImage(filePath, filename) {
  try {
    const formData = new FormData();
    const fileStream = await fs.readFile(filePath);
    formData.append('files', fileStream, filename);
    
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to upload ${filename}:`, error);
      return null;
    }
    
    const uploadedFiles = await response.json();
    return uploadedFiles[0];
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error);
    return null;
  }
}

async function createImageAsset(fileKey, displayName, fileId, themeId, locale) {
  try {
    const imageAssetData = {
      data: {
        fileKey: fileKey,
        displayName: displayName,
        file: fileId,
        themes: themeId ? [themeId] : [],
        isPremium: false,
        locale: locale
      }
    };
    
    const response = await fetch(`${STRAPI_URL}/api/image-assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(imageAssetData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to create image asset:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error creating image asset:`, error);
    return false;
  }
}

async function migrateImages() {
  console.log('===========================================');
  console.log('Starting Image Library Migration to Strapi');
  console.log('===========================================\n');
  
  const baseImagePath = path.join(__dirname, '../frontend/public/images');
  
  // Check if image directory exists
  try {
    await fs.access(baseImagePath);
  } catch (error) {
    console.error(`Image directory not found: ${baseImagePath}`);
    return;
  }
  
  const themes = await getDirectories(baseImagePath);
  console.log(`Found ${themes.length} theme directories\n`);
  
  let totalImages = 0;
  let successfulMigrations = 0;
  
  for (const theme of themes) {
    const themePath = path.join(baseImagePath, theme);
    const themeKey = theme.toLowerCase().replace(/\s+/g, '-');
    const displayName = themeMapping[theme] || capitalizeWords(theme);
    
    console.log(`\nProcessing theme: ${displayName}`);
    console.log('------------------------');
    
    // Create theme in Strapi
    const themeId = await createTheme(themeKey, displayName);
    
    // Get all images in theme
    const images = await getImages(themePath);
    console.log(`Found ${images.length} images`);
    
    for (const imageName of images) {
      totalImages++;
      const imagePath = path.join(themePath, imageName);
      const baseName = path.basename(imageName, path.extname(imageName));
      const fileKey = `${themeKey}_${baseName}`.toLowerCase().replace(/[\s-]+/g, '_');
      
      process.stdout.write(`  Migrating ${imageName}...`);
      
      // Upload image to Strapi
      const uploadedFile = await uploadImage(imagePath, imageName);
      if (!uploadedFile) {
        console.log(' ✗ Failed to upload');
        continue;
      }
      
      // Create image asset for each locale
      let success = true;
      for (const locale of locales) {
        const localizedName = getTranslation(baseName, locale);
        const created = await createImageAsset(
          fileKey,
          localizedName,
          uploadedFile.id,
          themeId,
          locale
        );
        if (!created) {
          success = false;
          break;
        }
      }
      
      if (success) {
        successfulMigrations++;
        console.log(' ✓');
      } else {
        console.log(' ✗ Failed to create asset');
      }
    }
  }
  
  console.log('\n===========================================');
  console.log('Migration Complete!');
  console.log(`Total images processed: ${totalImages}`);
  console.log(`Successfully migrated: ${successfulMigrations}`);
  console.log(`Failed: ${totalImages - successfulMigrations}`);
  console.log('===========================================');
}

// Check if required dependencies are installed
async function checkDependencies() {
  try {
    require('node-fetch');
    require('form-data');
    return true;
  } catch (error) {
    console.error('Missing required dependencies. Please run:');
    console.error('npm install node-fetch form-data');
    return false;
  }
}

// Main execution
async function main() {
  if (!await checkDependencies()) {
    process.exit(1);
  }
  
  if (!STRAPI_TOKEN || STRAPI_TOKEN === 'your-api-token-here') {
    console.error('Please set STRAPI_API_TOKEN environment variable or update the script with your API token');
    console.error('You can create an API token in Strapi Admin Panel -> Settings -> API Tokens');
    process.exit(1);
  }
  
  await migrateImages();
}

main().catch(console.error);