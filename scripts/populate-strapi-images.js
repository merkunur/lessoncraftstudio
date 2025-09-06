const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Not needed with auth: false

// Translation dictionary for themes and common image names
const translations = {
  // Theme translations
  themes: {
    "animals": {
      "en": "Animals",
      "de": "Tiere",
      "fr": "Animaux",
      "es": "Animales",
      "pt": "Animais",
      "it": "Animali",
      "nl": "Dieren",
      "sv": "Djur",
      "da": "Dyr",
      "no": "Dyr",
      "fi": "Eläimet"
    },
    "food": {
      "en": "Food",
      "de": "Essen",
      "fr": "Nourriture",
      "es": "Comida",
      "pt": "Comida",
      "it": "Cibo",
      "nl": "Voedsel",
      "sv": "Mat",
      "da": "Mad",
      "no": "Mat",
      "fi": "Ruoka"
    },
    "transportation": {
      "en": "Transportation",
      "de": "Transport",
      "fr": "Transport",
      "es": "Transporte",
      "pt": "Transporte",
      "it": "Trasporto",
      "nl": "Vervoer",
      "sv": "Transport",
      "da": "Transport",
      "no": "Transport",
      "fi": "Liikenne"
    },
    "nature": {
      "en": "Nature",
      "de": "Natur",
      "fr": "Nature",
      "es": "Naturaleza",
      "pt": "Natureza",
      "it": "Natura",
      "nl": "Natuur",
      "sv": "Natur",
      "da": "Natur",
      "no": "Natur",
      "fi": "Luonto"
    },
    "school": {
      "en": "School",
      "de": "Schule",
      "fr": "École",
      "es": "Escuela",
      "pt": "Escola",
      "it": "Scuola",
      "nl": "School",
      "sv": "Skola",
      "da": "Skole",
      "no": "Skole",
      "fi": "Koulu"
    },
    "sports": {
      "en": "Sports",
      "de": "Sport",
      "fr": "Sports",
      "es": "Deportes",
      "pt": "Esportes",
      "it": "Sport",
      "nl": "Sport",
      "sv": "Sport",
      "da": "Sport",
      "no": "Sport",
      "fi": "Urheilu"
    },
    "shapes": {
      "en": "Shapes",
      "de": "Formen",
      "fr": "Formes",
      "es": "Formas",
      "pt": "Formas",
      "it": "Forme",
      "nl": "Vormen",
      "sv": "Former",
      "da": "Former",
      "no": "Former",
      "fi": "Muodot"
    },
    "numbers": {
      "en": "Numbers",
      "de": "Zahlen",
      "fr": "Nombres",
      "es": "Números",
      "pt": "Números",
      "it": "Numeri",
      "nl": "Getallen",
      "sv": "Nummer",
      "da": "Tal",
      "no": "Tall",
      "fi": "Numerot"
    },
    "alphabet": {
      "en": "Alphabet",
      "de": "Alphabet",
      "fr": "Alphabet",
      "es": "Alfabeto",
      "pt": "Alfabeto",
      "it": "Alfabeto",
      "nl": "Alfabet",
      "sv": "Alfabet",
      "da": "Alfabet",
      "no": "Alfabet",
      "fi": "Aakkoset"
    },
    "weather": {
      "en": "Weather",
      "de": "Wetter",
      "fr": "Météo",
      "es": "Clima",
      "pt": "Clima",
      "it": "Meteo",
      "nl": "Weer",
      "sv": "Väder",
      "da": "Vejr",
      "no": "Vær",
      "fi": "Sää"
    },
    "general": {
      "en": "General",
      "de": "Allgemein",
      "fr": "Général",
      "es": "General",
      "pt": "Geral",
      "it": "Generale",
      "nl": "Algemeen",
      "sv": "Allmän",
      "da": "Generel",
      "no": "Generell",
      "fi": "Yleinen"
    }
  },
  // Common image name translations - expanded
  images: {
    // Animals
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
    // Food
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
    // Transportation
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
    // Nature
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
    // Objects
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
    },
    "pen": {
      "en": "Pen",
      "de": "Stift",
      "fr": "Stylo",
      "es": "Bolígrafo",
      "pt": "Caneta",
      "it": "Penna",
      "nl": "Pen",
      "sv": "Penna",
      "da": "Pen",
      "no": "Penn",
      "fi": "Kynä"
    }
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
  if (translations.images[baseName]) {
    return translations.images[baseName];
  }
  
  // Default: use capitalized name for all languages
  const defaultName = capitalizeWords(baseName);
  const defaultTranslations = {};
  ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].forEach(lang => {
    defaultTranslations[lang] = defaultName;
  });
  return defaultTranslations;
}

function getThemeTranslations(themeName) {
  const themeKey = themeName.toLowerCase().replace(/[\s-_]+/g, '');
  
  // Check if we have translations for this theme
  if (translations.themes[themeKey]) {
    return translations.themes[themeKey];
  }
  
  // Default: use capitalized name for all languages
  const defaultName = capitalizeWords(themeName);
  const defaultTranslations = {};
  ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].forEach(lang => {
    defaultTranslations[lang] = defaultName;
  });
  return defaultTranslations;
}

// Strapi API functions
async function getOrCreateTheme(folderName, themeTranslations) {
  try {
    // First check if theme exists
    const checkResponse = await fetch(`${STRAPI_URL}/api/image-themes?filters[folderName][$eq]=${folderName}`);
    if (checkResponse.ok) {
      const existing = await checkResponse.json();
      if (existing.data && existing.data.length > 0) {
        console.log(`✓ Theme exists: ${folderName}`);
        return existing.data[0];
      }
    }
    
    // Create if doesn't exist
    console.log(`Creating theme: ${folderName}`);
    
    const themeData = {
      data: {
        folderName: folderName,
        displayName: themeTranslations.en || capitalizeWords(folderName),
        translations: themeTranslations,
        sortOrder: 0
      }
    };
    
    const response = await fetch(`${STRAPI_URL}/api/image-themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(themeData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to create theme ${folderName}:`, error);
      return null;
    }
    
    const result = await response.json();
    console.log(`✓ Created theme: ${folderName}`);
    return result.data;
  } catch (error) {
    console.error(`Error with theme ${folderName}:`, error);
    return null;
  }
}

async function uploadImage(filePath, fileName) {
  try {
    const formData = new FormData();
    const fileStream = await fs.readFile(filePath);
    formData.append('files', fileStream, fileName);
    
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to upload ${fileName}:`, error);
      return null;
    }
    
    const uploadedFiles = await response.json();
    return uploadedFiles[0];
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error);
    return null;
  }
}

async function createImageAsset(fileName, imageTranslations, fileId, themeId) {
  try {
    const imageData = {
      data: {
        fileName: fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, ''),
        displayName: imageTranslations.en || capitalizeWords(fileName),
        translations: imageTranslations,
        file: fileId,
        themes: themeId ? [themeId] : [],
        isPremium: false
      }
    };
    
    const response = await fetch(`${STRAPI_URL}/api/image-assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imageData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to create image asset for ${fileName}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error creating image asset for ${fileName}:`, error);
    return false;
  }
}

// Main migration function
async function populateStrapi() {
  console.log('===========================================');
  console.log('Starting Strapi Image Population');
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
  const validThemes = themeFolders.filter(theme => 
    !['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg'].includes(theme)
  );
  
  console.log(`Found ${validThemes.length} theme directories\n`);
  
  let totalThemes = 0;
  let totalImages = 0;
  let successfulImages = 0;
  
  // Process each theme
  for (const themeName of validThemes) {
    const themePath = path.join(baseImagePath, themeName);
    const themeTranslations = getThemeTranslations(themeName);
    
    console.log(`\n========== Processing theme: ${themeName} ==========`);
    
    // Get or create theme in Strapi
    const theme = await getOrCreateTheme(themeName, themeTranslations);
    if (theme) {
      totalThemes++;
      const themeId = theme.id;
      
      // Get all images in theme
      const images = await getImages(themePath);
      console.log(`Found ${images.length} images in ${themeName}`);
      
      // Process only first 5 images per theme for testing
      const imagesToProcess = images.slice(0, 5);
      
      for (const imageName of imagesToProcess) {
        totalImages++;
        const imagePath = path.join(themePath, imageName);
        const imageTranslations = getImageTranslations(imageName);
        
        process.stdout.write(`  Processing ${imageName}...`);
        
        // Upload image to Strapi
        const uploadedFile = await uploadImage(imagePath, imageName);
        if (!uploadedFile) {
          console.log(' ✗ Failed to upload');
          continue;
        }
        
        // Create image asset
        const created = await createImageAsset(
          imageName,
          imageTranslations,
          uploadedFile.id,
          themeId
        );
        
        if (created) {
          successfulImages++;
          console.log(' ✓');
        } else {
          console.log(' ✗ Failed to create asset');
        }
      }
    }
  }
  
  console.log('\n===========================================');
  console.log('Population Complete!');
  console.log(`Themes created: ${totalThemes}`);
  console.log(`Images processed: ${totalImages}`);
  console.log(`Successfully added: ${successfulImages}`);
  console.log('===========================================');
  console.log('\nNow you can manage all images through Strapi Content Manager!');
  console.log('Visit: http://localhost:1337/admin');
}

// Run the population
populateStrapi().catch(console.error);