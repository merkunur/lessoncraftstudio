const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

// Complete translation database
const TRANSLATIONS = {
  // Object theme images
  "badge": {
    "en": "badge",
    "de": "Abzeichen",
    "fr": "badge",
    "es": "insignia",
    "pt": "crachá",
    "it": "distintivo",
    "nl": "badge",
    "sv": "märke",
    "da": "emblem",
    "no": "merke",
    "fi": "rintamerkki"
  },
  "beard": {
    "en": "beard",
    "de": "Bart",
    "fr": "barbe",
    "es": "barba",
    "pt": "barba",
    "it": "barba",
    "nl": "baard",
    "sv": "skägg",
    "da": "skæg",
    "no": "skjegg",
    "fi": "parta"
  },
  "bone": {
    "en": "bone",
    "de": "Knochen",
    "fr": "os",
    "es": "hueso",
    "pt": "osso",
    "it": "osso",
    "nl": "bot",
    "sv": "ben",
    "da": "knogle",
    "no": "bein",
    "fi": "luu"
  },
  "briefcase": {
    "en": "briefcase",
    "de": "Aktentasche",
    "fr": "porte-documents",
    "es": "maletín",
    "pt": "pasta",
    "it": "valigetta",
    "nl": "aktetas",
    "sv": "portfölj",
    "da": "mappe",
    "no": "stresskoffert",
    "fi": "salkku"
  },
  "car": {
    "en": "car",
    "de": "Auto",
    "fr": "voiture",
    "es": "coche",
    "pt": "carro",
    "it": "macchina",
    "nl": "auto",
    "sv": "bil",
    "da": "bil",
    "no": "bil",
    "fi": "auto"
  },
  "cane": {
    "en": "cane",
    "de": "Gehstock",
    "fr": "canne",
    "es": "bastón",
    "pt": "bengala",
    "it": "bastone",
    "nl": "wandelstok",
    "sv": "käpp",
    "da": "stok",
    "no": "stokk",
    "fi": "keppi"
  },
  "pencil": {
    "en": "pencil",
    "de": "Bleistift",
    "fr": "crayon",
    "es": "lápiz",
    "pt": "lápis",
    "it": "matita",
    "nl": "potlood",
    "sv": "blyertspenna",
    "da": "blyant",
    "no": "blyant",
    "fi": "lyijykynä"
  },
  // Common animals
  "cat": {
    "en": "cat",
    "de": "Katze",
    "fr": "chat",
    "es": "gato",
    "pt": "gato",
    "it": "gatto",
    "nl": "kat",
    "sv": "katt",
    "da": "kat",
    "no": "katt",
    "fi": "kissa"
  },
  "dog": {
    "en": "dog",
    "de": "Hund",
    "fr": "chien",
    "es": "perro",
    "pt": "cão",
    "it": "cane",
    "nl": "hond",
    "sv": "hund",
    "da": "hund",
    "no": "hund",
    "fi": "koira"
  },
  "bird": {
    "en": "bird",
    "de": "Vogel",
    "fr": "oiseau",
    "es": "pájaro",
    "pt": "pássaro",
    "it": "uccello",
    "nl": "vogel",
    "sv": "fågel",
    "da": "fugl",
    "no": "fugl",
    "fi": "lintu"
  },
  "cow": {
    "en": "cow",
    "de": "Kuh",
    "fr": "vache",
    "es": "vaca",
    "pt": "vaca",
    "it": "mucca",
    "nl": "koe",
    "sv": "ko",
    "da": "ko",
    "no": "ku",
    "fi": "lehmä"
  },
  "lion": {
    "en": "lion",
    "de": "Löwe",
    "fr": "lion",
    "es": "león",
    "pt": "leão",
    "it": "leone",
    "nl": "leeuw",
    "sv": "lejon",
    "da": "løve",
    "no": "løve",
    "fi": "leijona"
  },
  "elephant": {
    "en": "elephant",
    "de": "Elefant",
    "fr": "éléphant",
    "es": "elefante",
    "pt": "elefante",
    "it": "elefante",
    "nl": "olifant",
    "sv": "elefant",
    "da": "elefant",
    "no": "elefant",
    "fi": "norsu"
  }
};

async function addTranslations() {
  console.log('Adding translations to all images...\n');
  
  try {
    // Authenticate
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    const authData = await authResponse.json();
    const token = authData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Get all image assets
    const imagesResponse = await fetch(`${DIRECTUS_URL}/items/image_assets?limit=500`, {
      headers
    });
    const imagesData = await imagesResponse.json();
    
    let updated = 0;
    for (const image of imagesData.data) {
      const fileName = image.file_name.toLowerCase();
      
      if (TRANSLATIONS[fileName]) {
        // Update with translations
        const updateResponse = await fetch(`${DIRECTUS_URL}/items/image_assets/${image.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            translations: TRANSLATIONS[fileName]
          })
        });
        
        if (updateResponse.ok) {
          console.log(`  Updated: ${fileName}`);
          updated++;
        }
      }
    }
    
    console.log(`\nUpdated ${updated} images with translations`);
    
  } catch (error) {
    console.error('Failed:', error);
  }
}

addTranslations();
