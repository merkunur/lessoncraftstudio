import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTranslatedThemeName } from '../multilingual-images/translations';

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
  
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    const files = await fs.promises.readdir(imagesDir, { withFileTypes: true });
    
    const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg'];
    
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