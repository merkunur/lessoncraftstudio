const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Not needed with auth: false

// Translation dictionary for common image names
const imageTranslations = {
  "cat": {
    "en": "Cat",
    "de": "Katze",
    "fr": "Chat",
    "es": "Gato",
    "pt": "Gato",
    "it": "Gatto",
    "nl": "Kat",
    "sv": "Katt",
    "da": "Kat",
    "no": "Katt",
    "fi": "Kissa"
  },
  "dog": {
    "en": "Dog",
    "de": "Hund",
    "fr": "Chien",
    "es": "Perro",
    "pt": "Cão",
    "it": "Cane",
    "nl": "Hond",
    "sv": "Hund",
    "da": "Hund",
    "no": "Hund",
    "fi": "Koira"
  },
  "bird": {
    "en": "Bird",
    "de": "Vogel",
    "fr": "Oiseau",
    "es": "Pájaro",
    "pt": "Pássaro",
    "it": "Uccello",
    "nl": "Vogel",
    "sv": "Fågel",
    "da": "Fugl",
    "no": "Fugl",
    "fi": "Lintu"
  },
  "cow": {
    "en": "Cow",
    "de": "Kuh",
    "fr": "Vache",
    "es": "Vaca",
    "pt": "Vaca",
    "it": "Mucca",
    "nl": "Koe",
    "sv": "Ko",
    "da": "Ko",
    "no": "Ku",
    "fi": "Lehmä"
  },
  "pig": {
    "en": "Pig",
    "de": "Schwein",
    "fr": "Cochon",
    "es": "Cerdo",
    "pt": "Porco",
    "it": "Maiale",
    "nl": "Varken",
    "sv": "Gris",
    "da": "Gris",
    "no": "Gris",
    "fi": "Sika"
  },
  "sheep": {
    "en": "Sheep",
    "de": "Schaf",
    "fr": "Mouton",
    "es": "Oveja",
    "pt": "Ovelha",
    "it": "Pecora",
    "nl": "Schaap",
    "sv": "Får",
    "da": "Får",
    "no": "Sau",
    "fi": "Lammas"
  },
  "lion": {
    "en": "Lion",
    "de": "Löwe",
    "fr": "Lion",
    "es": "León",
    "pt": "Leão",
    "it": "Leone",
    "nl": "Leeuw",
    "sv": "Lejon",
    "da": "Løve",
    "no": "Løve",
    "fi": "Leijona"
  },
  "tiger": {
    "en": "Tiger",
    "de": "Tiger",
    "fr": "Tigre",
    "es": "Tigre",
    "pt": "Tigre",
    "it": "Tigre",
    "nl": "Tijger",
    "sv": "Tiger",
    "da": "Tiger",
    "no": "Tiger",
    "fi": "Tiikeri"
  },
  "mouse": {
    "en": "Mouse",
    "de": "Maus",
    "fr": "Souris",
    "es": "Ratón",
    "pt": "Rato",
    "it": "Topo",
    "nl": "Muis",
    "sv": "Mus",
    "da": "Mus",
    "no": "Mus",
    "fi": "Hiiri"
  },
  "fox": {
    "en": "Fox",
    "de": "Fuchs",
    "fr": "Renard",
    "es": "Zorro",
    "pt": "Raposa",
    "it": "Volpe",
    "nl": "Vos",
    "sv": "Räv",
    "da": "Ræv",
    "no": "Rev",
    "fi": "Kettu"
  },
  "zebra": {
    "en": "Zebra",
    "de": "Zebra",
    "fr": "Zèbre",
    "es": "Cebra",
    "pt": "Zebra",
    "it": "Zebra",
    "nl": "Zebra",
    "sv": "Zebra",
    "da": "Zebra",
    "no": "Zebra",
    "fi": "Seepra"
  },
  "apple": {
    "en": "Apple",
    "de": "Apfel",
    "fr": "Pomme",
    "es": "Manzana",
    "pt": "Maçã",
    "it": "Mela",
    "nl": "Appel",
    "sv": "Äpple",
    "da": "Æble",
    "no": "Eple",
    "fi": "Omena"
  },
  "banana": {
    "en": "Banana",
    "de": "Banane",
    "fr": "Banane",
    "es": "Plátano",
    "pt": "Banana",
    "it": "Banana",
    "nl": "Banaan",
    "sv": "Banan",
    "da": "Banan",
    "no": "Banan",
    "fi": "Banaani"
  },
  "orange": {
    "en": "Orange",
    "de": "Orange",
    "fr": "Orange",
    "es": "Naranja",
    "pt": "Laranja",
    "it": "Arancia",
    "nl": "Sinaasappel",
    "sv": "Apelsin",
    "da": "Appelsin",
    "no": "Appelsin",
    "fi": "Appelsiini"
  },
  "car": {
    "en": "Car",
    "de": "Auto",
    "fr": "Voiture",
    "es": "Coche",
    "pt": "Carro",
    "it": "Auto",
    "nl": "Auto",
    "sv": "Bil",
    "da": "Bil",
    "no": "Bil",
    "fi": "Auto"
  },
  "bus": {
    "en": "Bus",
    "de": "Bus",
    "fr": "Bus",
    "es": "Autobús",
    "pt": "Ônibus",
    "it": "Autobus",
    "nl": "Bus",
    "sv": "Buss",
    "da": "Bus",
    "no": "Buss",
    "fi": "Bussi"
  },
  "train": {
    "en": "Train",
    "de": "Zug",
    "fr": "Train",
    "es": "Tren",
    "pt": "Trem",
    "it": "Treno",
    "nl": "Trein",
    "sv": "Tåg",
    "da": "Tog",
    "no": "Tog",
    "fi": "Juna"
  },
  "tree": {
    "en": "Tree",
    "de": "Baum",
    "fr": "Arbre",
    "es": "Árbol",
    "pt": "Árvore",
    "it": "Albero",
    "nl": "Boom",
    "sv": "Träd",
    "da": "Træ",
    "no": "Tre",
    "fi": "Puu"
  },
  "sun": {
    "en": "Sun",
    "de": "Sonne",
    "fr": "Soleil",
    "es": "Sol",
    "pt": "Sol",
    "it": "Sole",
    "nl": "Zon",
    "sv": "Sol",
    "da": "Sol",
    "no": "Sol",
    "fi": "Aurinko"
  },
  "moon": {
    "en": "Moon",
    "de": "Mond",
    "fr": "Lune",
    "es": "Luna",
    "pt": "Lua",
    "it": "Luna",
    "nl": "Maan",
    "sv": "Måne",
    "da": "Måne",
    "no": "Måne",
    "fi": "Kuu"
  },
  "star": {
    "en": "Star",
    "de": "Stern",
    "fr": "Étoile",
    "es": "Estrella",
    "pt": "Estrela",
    "it": "Stella",
    "nl": "Ster",
    "sv": "Stjärna",
    "da": "Stjerne",
    "no": "Stjerne",
    "fi": "Tähti"
  },
  "ball": {
    "en": "Ball",
    "de": "Ball",
    "fr": "Balle",
    "es": "Pelota",
    "pt": "Bola",
    "it": "Palla",
    "nl": "Bal",
    "sv": "Boll",
    "da": "Bold",
    "no": "Ball",
    "fi": "Pallo"
  },
  "book": {
    "en": "Book",
    "de": "Buch",
    "fr": "Livre",
    "es": "Libro",
    "pt": "Livro",
    "it": "Libro",
    "nl": "Boek",
    "sv": "Bok",
    "da": "Bog",
    "no": "Bok",
    "fi": "Kirja"
  }
};

// Helper functions
async function getDirectories(source) {
  const dirents = await fs.readdir(source, { withFileTypes: true });
  return dirents
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

async function getImages(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    return files.filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

function capitalizeWords(str) {
  return str.split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getImageTranslations(imageName) {
  const baseName = imageName.toLowerCase().replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').replace(/[-_\s]+/g, '');
  
  // Check if we have translations for this image
  if (imageTranslations[baseName]) {
    return imageTranslations[baseName];
  }
  
  // Default: use capitalized name for all languages
  const defaultName = capitalizeWords(baseName);
  const defaultTranslations = {};
  ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].forEach(lang => {
    defaultTranslations[lang] = defaultName;
  });
  return defaultTranslations;
}

// Get theme ID by folder name
async function getThemeByFolderName(folderName) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/image-themes?filters[folderName][$eq]=${folderName}`);
    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return data.data[0];
      }
    }
  } catch (error) {
    console.error(`Error fetching theme ${folderName}:`, error);
  }
  return null;
}

// Create or update image asset
async function createOrUpdateImageAsset(imageData) {
  try {
    // Check if asset exists
    const checkResponse = await fetch(
      `${STRAPI_URL}/api/image-assets?filters[fileName][$eq]=${imageData.fileName}`
    );
    
    if (checkResponse.ok) {
      const existing = await checkResponse.json();
      if (existing.data && existing.data.length > 0) {
        console.log(`  ✓ Image asset exists: ${imageData.fileName}`);
        return existing.data[0];
      }
    }
    
    // Create new asset
    console.log(`  Creating image asset: ${imageData.fileName}`);
    const response = await fetch(`${STRAPI_URL}/api/image-assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: imageData })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`  ✗ Failed to create asset ${imageData.fileName}:`, error);
      return null;
    }
    
    const result = await response.json();
    console.log(`  ✓ Created image asset: ${imageData.fileName}`);
    return result.data;
  } catch (error) {
    console.error(`  ✗ Error with asset ${imageData.fileName}:`, error);
    return null;
  }
}

// Main function to populate image assets
async function populateImageAssets() {
  console.log('===========================================');
  console.log('Populating Image Assets in Strapi');
  console.log('===========================================\n');
  
  const baseImagePath = path.join(__dirname, '../frontend/public/images');
  
  // Check if image directory exists
  try {
    await fs.access(baseImagePath);
  } catch (error) {
    console.error(`Image directory not found: ${baseImagePath}`);
    return;
  }
  
  const themeFolders = await getDirectories(baseImagePath);
  // Exclude app-specific folders that are not part of the general image library
  const validThemes = themeFolders.filter(theme => 
    !['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg'].includes(theme)
  );
  
  console.log(`Found ${validThemes.length} theme directories\n`);
  
  let totalAssets = 0;
  let successfulAssets = 0;
  
  // Process each theme
  for (const themeName of validThemes) {
    const themePath = path.join(baseImagePath, themeName);
    
    console.log(`\n========== Processing theme: ${themeName} ==========`);
    
    // Get theme from Strapi
    const theme = await getThemeByFolderName(themeName);
    if (!theme) {
      console.log(`✗ Theme not found in Strapi: ${themeName}`);
      continue;
    }
    
    const themeId = theme.id;
    console.log(`✓ Found theme in Strapi (ID: ${themeId})`);
    
    // Get all images in theme
    const images = await getImages(themePath);
    console.log(`Found ${images.length} images in ${themeName}`);
    
    // Process each image (limit for testing)
    const imagesToProcess = images.slice(0, 10); // Process first 10 images per theme
    
    for (const imageName of imagesToProcess) {
      totalAssets++;
      const baseName = imageName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
      const translations = getImageTranslations(imageName);
      
      // Create image asset data without file upload
      const imageAssetData = {
        fileName: baseName,
        displayName: translations.en || capitalizeWords(baseName),
        translations: translations,
        themes: [themeId],
        isPremium: false,
        metadata: {
          originalPath: `/images/${themeName}/${imageName}`,
          theme: themeName
        }
      };
      
      const created = await createOrUpdateImageAsset(imageAssetData);
      if (created) {
        successfulAssets++;
      }
    }
  }
  
  console.log('\n===========================================');
  console.log('Image Asset Population Complete!');
  console.log(`Total assets processed: ${totalAssets}`);
  console.log(`Successfully created/updated: ${successfulAssets}`);
  console.log('===========================================');
  console.log('\nNow you can manage all image assets through Strapi Content Manager!');
  console.log('Visit: http://localhost:1337/admin/content-manager/collectionType/api::image-asset.image-asset');
}

// Run the population
populateImageAssets().catch(console.error);