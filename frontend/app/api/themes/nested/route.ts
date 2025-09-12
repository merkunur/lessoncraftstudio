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
    // Try to fetch from Strapi first
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${strapiUrl}/api/image-themes?locale=${locale}&populate=*`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      const themePaths = data.data.map((theme: any) => {
        const folderName = theme.attributes.folderName;
        const displayName = theme.attributes.displayName || 
                           theme.attributes.translations?.[locale] ||
                           folderName;
        
        return {
          path: folderName,
          name: displayName,
          displayName: displayName,
          folderName: folderName
        };
      });
      
      themePaths.sort((a: any, b: any) => a.path.localeCompare(b.path));
      return NextResponse.json(themePaths);
    }
  } catch (error) {
    console.log('Strapi not available, falling back to file system');
  }
  
  // Fallback to file system scanning if Strapi is not available
  const imagesBaseDir = path.join(process.cwd(), 'public', 'images');
  const excludedFolders = new Set(['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg']);
  const themePaths: Array<{ path: string; name: string; displayName: string; folderName: string }> = [];
  
  function findThemeFolders(directory: string, currentPath = '') {
    try {
      const files = fs.readdirSync(directory, { withFileTypes: true });
      let hasImages = false;
      
      // Check if this folder contains images
      for (const file of files) {
        if (!file.isDirectory() && /\.(png|jpe?g|gif|svg)$/i.test(file.name)) {
          hasImages = true;
          break;
        }
      }
      
      // If folder has images and is not root, add it as a theme
      if (hasImages && currentPath !== '') {
        const pathParts = currentPath.split(path.sep);
        
        // Translate each part of the path
        const translatedParts = pathParts.map(part => {
          return themeTranslations[part]?.[locale] || 
                 themeTranslations[part]?.['en'] || 
                 part.charAt(0).toUpperCase() + part.slice(1);
        });
        
        // Join translated parts for display name
        const displayName = translatedParts.join(' / ');
        
        themePaths.push({
          path: currentPath.replace(/\\/g, '/'),
          name: displayName,
          displayName: displayName,
          folderName: currentPath.replace(/\\/g, '/')
        });
      }
      
      // Recursively check subdirectories
      for (const file of files) {
        if (file.isDirectory()) {
          // Skip excluded folders at root level
          if (currentPath === '' && excludedFolders.has(file.name)) {
            continue;
          }
          const newPath = currentPath ? path.join(currentPath, file.name) : file.name;
          findThemeFolders(path.join(directory, file.name), newPath);
        }
      }
    } catch (err) {
      console.error(`Could not read directory: ${directory}`, err);
    }
  }
  
  try {
    findThemeFolders(imagesBaseDir);
    themePaths.sort((a, b) => a.path.localeCompare(b.path));
    return NextResponse.json(themePaths);
  } catch (err) {
    return NextResponse.json({ error: 'Error scanning for nested themes' }, { status: 500 });
  }
}