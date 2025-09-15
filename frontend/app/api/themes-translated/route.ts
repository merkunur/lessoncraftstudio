import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTranslatedThemeName } from '../multilingual-images/translations';

// Use Docker service name when running in container, localhost for local dev
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://lcs-directus:8055';
const API_TOKEN = 'static-api-token-for-sync';

// Legacy translations (now using comprehensive dictionary)
const themeTranslations: Record<string, Record<string, string>> = {
  'alphabet': {
    'en': 'Alphabet', 'de': 'Alphabet', 'fr': 'Alphabet', 'es': 'Alfabeto', 
    'pt': 'Alfabeto', 'it': 'Alfabeto', 'nl': 'Alfabet', 'sv': 'Alfabet', 
    'da': 'Alfabet', 'no': 'Alfabet', 'fi': 'Aakkoset'
  },
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
  },
  'nature': {
    'en': 'Nature', 'de': 'Natur', 'fr': 'Nature', 'es': 'Naturaleza',
    'pt': 'Natureza', 'it': 'Natura', 'nl': 'Natuur', 'sv': 'Natur',
    'da': 'Natur', 'no': 'Natur', 'fi': 'Luonto'
  },
  'school': {
    'en': 'School', 'de': 'Schule', 'fr': 'École', 'es': 'Escuela',
    'pt': 'Escola', 'it': 'Scuola', 'nl': 'School', 'sv': 'Skola',
    'da': 'Skole', 'no': 'Skole', 'fi': 'Koulu'
  },
  'sports': {
    'en': 'Sports', 'de': 'Sport', 'fr': 'Sports', 'es': 'Deportes',
    'pt': 'Esportes', 'it': 'Sport', 'nl': 'Sport', 'sv': 'Sport',
    'da': 'Sport', 'no': 'Sport', 'fi': 'Urheilu'
  },
  'colors': {
    'en': 'Colors', 'de': 'Farben', 'fr': 'Couleurs', 'es': 'Colores',
    'pt': 'Cores', 'it': 'Colori', 'nl': 'Kleuren', 'sv': 'Färger',
    'da': 'Farver', 'no': 'Farger', 'fi': 'Värit'
  },
  'shapes': {
    'en': 'Shapes', 'de': 'Formen', 'fr': 'Formes', 'es': 'Formas',
    'pt': 'Formas', 'it': 'Forme', 'nl': 'Vormen', 'sv': 'Former',
    'da': 'Former', 'no': 'Former', 'fi': 'Muodot'
  },
  'weather': {
    'en': 'Weather', 'de': 'Wetter', 'fr': 'Météo', 'es': 'Clima',
    'pt': 'Clima', 'it': 'Meteo', 'nl': 'Weer', 'sv': 'Väder',
    'da': 'Vejr', 'no': 'Vær', 'fi': 'Sää'
  },
  'emotions': {
    'en': 'Emotions', 'de': 'Emotionen', 'fr': 'Émotions', 'es': 'Emociones',
    'pt': 'Emoções', 'it': 'Emozioni', 'nl': 'Emoties', 'sv': 'Känslor',
    'da': 'Følelser', 'no': 'Følelser', 'fi': 'Tunteet'
  },
  'body': {
    'en': 'Body Parts', 'de': 'Körperteile', 'fr': 'Corps', 'es': 'Cuerpo',
    'pt': 'Corpo', 'it': 'Corpo', 'nl': 'Lichaam', 'sv': 'Kropp',
    'da': 'Krop', 'no': 'Kropp', 'fi': 'Keho'
  },
  'clothing': {
    'en': 'Clothing', 'de': 'Kleidung', 'fr': 'Vêtements', 'es': 'Ropa',
    'pt': 'Roupas', 'it': 'Abbigliamento', 'nl': 'Kleding', 'sv': 'Kläder',
    'da': 'Tøj', 'no': 'Klær', 'fi': 'Vaatteet'
  },
  'household': {
    'en': 'Household', 'de': 'Haushalt', 'fr': 'Maison', 'es': 'Hogar',
    'pt': 'Casa', 'it': 'Casa', 'nl': 'Huishouden', 'sv': 'Hushåll',
    'da': 'Husholdning', 'no': 'Husholdning', 'fi': 'Koti'
  },
  'toys': {
    'en': 'Toys', 'de': 'Spielzeug', 'fr': 'Jouets', 'es': 'Juguetes',
    'pt': 'Brinquedos', 'it': 'Giocattoli', 'nl': 'Speelgoed', 'sv': 'Leksaker',
    'da': 'Legetøj', 'no': 'Leker', 'fi': 'Lelut'
  },
  'music': {
    'en': 'Music', 'de': 'Musik', 'fr': 'Musique', 'es': 'Música',
    'pt': 'Música', 'it': 'Musica', 'nl': 'Muziek', 'sv': 'Musik',
    'da': 'Musik', 'no': 'Musikk', 'fi': 'Musiikki'
  },
  'jobs': {
    'en': 'Jobs', 'de': 'Berufe', 'fr': 'Métiers', 'es': 'Trabajos',
    'pt': 'Profissões', 'it': 'Lavori', 'nl': 'Beroepen', 'sv': 'Yrken',
    'da': 'Job', 'no': 'Yrker', 'fi': 'Ammatit'
  },
  'space': {
    'en': 'Space', 'de': 'Weltraum', 'fr': 'Espace', 'es': 'Espacio',
    'pt': 'Espaço', 'it': 'Spazio', 'nl': 'Ruimte', 'sv': 'Rymden',
    'da': 'Rum', 'no': 'Rommet', 'fi': 'Avaruus'
  },
  'seasons': {
    'en': 'Seasons', 'de': 'Jahreszeiten', 'fr': 'Saisons', 'es': 'Estaciones',
    'pt': 'Estações', 'it': 'Stagioni', 'nl': 'Seizoenen', 'sv': 'Årstider',
    'da': 'Årstider', 'no': 'Årstider', 'fi': 'Vuodenajat'
  },
  'holidays': {
    'en': 'Holidays', 'de': 'Feiertage', 'fr': 'Vacances', 'es': 'Vacaciones',
    'pt': 'Feriados', 'it': 'Vacanze', 'nl': 'Vakanties', 'sv': 'Helgdagar',
    'da': 'Helligdage', 'no': 'Helligdager', 'fi': 'Lomat'
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
  // ALWAYS try Directus first for dynamic updates
  try {
    const response = await fetch(
      `${DIRECTUS_URL}/items/image_themes?` + new URLSearchParams({
        'filter[is_active][_eq]': 'true',
        'sort': 'sort_order'
      }),
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        },
        cache: 'no-store'
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        // Define app-specific folders to exclude
        const excludedFolders = [
          'alphabetsvg',       // Writing app specific
          'prepositions',      // Prepositions app specific
          'symbols',           // More Less app specific
          'drawing lines'      // Drawing Lines app specific
        ];

        const themes = data.data
          .filter((theme: any) => !excludedFolders.includes(theme.folder_name))
          .map((theme: any) => {
            const folderName = theme.folder_name;
            // Use translations from Directus or fallback to helper function
            const displayName = theme.name?.[locale] || theme.name?.['en'] || getTranslatedThemeName(folderName, locale);

            return {
              value: folderName,
              displayName: displayName
            };
          });

        themes.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName, locale));
        return NextResponse.json(themes);
      }
    }
    // If Directus returned empty data, fall through to filesystem
  } catch (error) {
    console.log('Directus not available, falling back to file system');
  }
  
  // Also try Strapi as secondary fallback
  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    
    let response = await fetch(`${strapiUrl}/api/image-themes?locale=${locale}&populate=*`, {
      cache: 'no-store'
    });
    
    let data = response.ok ? await response.json() : { data: [] };
    
    if (response.ok && data.data && data.data.length > 0) {
        const themes = data.data.map((theme: any) => {
          const folderName = theme.attributes.folderName;
          const displayName = getTranslatedThemeName(folderName, locale);
          
          return {
            value: folderName,
            displayName: displayName
          };
        });
        
        themes.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName, locale));
        return NextResponse.json(themes);
    }
  } catch (error) {
    console.log('Strapi not available either, falling back to file system');
  }
  
  // Fallback to file system if Strapi is not available
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    const files = await fs.promises.readdir(imagesDir, { withFileTypes: true });
    
    const excludedFolders = [
      'borders',           // Border assets
      'backgrounds',       // Background assets
      'drawing lines',     // Drawing Lines app specific
      'template',          // Template assets
      'alphabetsvg',       // Writing app specific
      'prepositions',      // Prepositions app specific
      'symbols'            // More Less app specific
    ];
    
    const themes = files
      .filter(file => file.isDirectory() && !excludedFolders.includes(file.name))
      .map(file => ({
        value: file.name,
        displayName: getTranslatedThemeName(file.name, locale)
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName, locale));
    
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading themes directory' }, { status: 500 });
  }
}