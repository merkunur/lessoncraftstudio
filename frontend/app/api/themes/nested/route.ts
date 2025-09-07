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
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
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
        const baseName = pathParts[0];
        const displayName = themeTranslations[baseName]?.[locale] || 
                           themeTranslations[baseName]?.['en'] || 
                           baseName.charAt(0).toUpperCase() + baseName.slice(1);
        
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