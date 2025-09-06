import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Translation dictionary for theme names
const themeTranslations: Record<string, Record<string, string>> = {
  'alphabet': {
    'en': 'Alphabet',
    'de': 'Alphabet',
    'fr': 'Alphabet',
    'es': 'Alfabeto',
    'pt': 'Alfabeto',
    'it': 'Alfabeto',
    'nl': 'Alfabet',
    'sv': 'Alfabet',
    'da': 'Alfabet',
    'no': 'Alfabet',
    'fi': 'Aakkoset'
  },
  'animals': {
    'en': 'Animals',
    'de': 'Tiere',
    'fr': 'Animaux',
    'es': 'Animales',
    'pt': 'Animais',
    'it': 'Animali',
    'nl': 'Dieren',
    'sv': 'Djur',
    'da': 'Dyr',
    'no': 'Dyr',
    'fi': 'Eläimet'
  },
  'coloring': {
    'en': 'Coloring',
    'de': 'Ausmalen',
    'fr': 'Coloriage',
    'es': 'Colorear',
    'pt': 'Colorir',
    'it': 'Colorare',
    'nl': 'Kleuren',
    'sv': 'Färgläggning',
    'da': 'Farvelægning',
    'no': 'Fargelegging',
    'fi': 'Värittäminen'
  },
  'food': {
    'en': 'Food',
    'de': 'Essen',
    'fr': 'Nourriture',
    'es': 'Comida',
    'pt': 'Comida',
    'it': 'Cibo',
    'nl': 'Eten',
    'sv': 'Mat',
    'da': 'Mad',
    'no': 'Mat',
    'fi': 'Ruoka'
  },
  'general': {
    'en': 'General',
    'de': 'Allgemein',
    'fr': 'Général',
    'es': 'General',
    'pt': 'Geral',
    'it': 'Generale',
    'nl': 'Algemeen',
    'sv': 'Allmän',
    'da': 'Generel',
    'no': 'Generell',
    'fi': 'Yleinen'
  },
  'icons': {
    'en': 'Icons',
    'de': 'Symbole',
    'fr': 'Icônes',
    'es': 'Iconos',
    'pt': 'Ícones',
    'it': 'Icone',
    'nl': 'Pictogrammen',
    'sv': 'Ikoner',
    'da': 'Ikoner',
    'no': 'Ikoner',
    'fi': 'Kuvakkeet'
  },
  'prepositions': {
    'en': 'Prepositions',
    'de': 'Präpositionen',
    'fr': 'Prépositions',
    'es': 'Preposiciones',
    'pt': 'Preposições',
    'it': 'Preposizioni',
    'nl': 'Voorzetsels',
    'sv': 'Prepositioner',
    'da': 'Præpositioner',
    'no': 'Preposisjoner',
    'fi': 'Prepositiot'
  },
  'symbols': {
    'en': 'Symbols',
    'de': 'Symbole',
    'fr': 'Symboles',
    'es': 'Símbolos',
    'pt': 'Símbolos',
    'it': 'Simboli',
    'nl': 'Symbolen',
    'sv': 'Symboler',
    'da': 'Symboler',
    'no': 'Symboler',
    'fi': 'Symbolit'
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
        id: file.name,
        name: themeTranslations[file.name]?.[locale] || 
              themeTranslations[file.name]?.['en'] || 
              file.name.charAt(0).toUpperCase() + file.name.slice(1)
      }));
    
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading images directory' }, { status: 500 });
  }
}