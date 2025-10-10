import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

// Translation dictionary for theme names (kept for backward compatibility)
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
  'cute': {
    'en': 'Cute',
    'de': 'Niedlich',
    'fr': 'Mignon',
    'es': 'Lindo',
    'pt': 'Fofo',
    'it': 'Carino',
    'nl': 'Schattig',
    'sv': 'Söt',
    'da': 'Sød',
    'no': 'Søt',
    'fi': 'Söpö'
  },
  'background': {
    'en': 'Background',
    'de': 'Hintergrund',
    'fr': 'Arrière-plan',
    'es': 'Fondo',
    'pt': 'Fundo',
    'it': 'Sfondo',
    'nl': 'Achtergrond',
    'sv': 'Bakgrund',
    'da': 'Baggrund',
    'no': 'Bakgrunn',
    'fi': 'Tausta'
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
  'fruits': {
    'en': 'Fruits',
    'de': 'Obst',
    'fr': 'Fruits',
    'es': 'Frutas',
    'pt': 'Frutas',
    'it': 'Frutta',
    'nl': 'Fruit',
    'sv': 'Frukt',
    'da': 'Frugt',
    'no': 'Frukt',
    'fi': 'Hedelmät'
  },
  'snack': {
    'en': 'Snack',
    'de': 'Snack',
    'fr': 'Collation',
    'es': 'Merienda',
    'pt': 'Lanche',
    'it': 'Spuntino',
    'nl': 'Snack',
    'sv': 'Mellanmål',
    'da': 'Snack',
    'no': 'Snack',
    'fi': 'Välipala'
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
    'nl': 'Iconen',
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
  
  try {
    // Use the ImageLibraryManager to get themes with automatic sync
    const themes = imageLibraryManager.getThemes(locale);
    
    // Convert to expected format
    const themePaths = themes.map(theme => ({
      path: theme.value,
      name: theme.displayName,
      displayName: theme.displayName,
      folderName: theme.value
    }));
    
    return NextResponse.json(themePaths);
  } catch (err) {
    console.error('Error getting themes:', err);
    return NextResponse.json({ error: 'Error loading themes' }, { status: 500 });
  }
}