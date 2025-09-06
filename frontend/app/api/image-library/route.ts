import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';
  
  try {
    // Fetch theme data from Strapi
    const themeResponse = await fetch(`${STRAPI_URL}/api/image-themes?filters[folderName][$eq]=${theme}`);
    const themeData = await themeResponse.json();
    
    if (!themeData.data || themeData.data.length === 0) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }
    
    const themeInfo = themeData.data[0].attributes;
    const themeTranslations = themeInfo.translations || {};
    
    // Get images from file system
    const imagesPath = path.join(process.cwd(), 'public', 'images', theme);
    let imageFiles: string[] = [];
    
    try {
      const files = await fs.readdir(imagesPath);
      imageFiles = files.filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file));
    } catch (error) {
      console.error(`Error reading images directory for theme ${theme}:`, error);
    }
    
    // Fetch image assets from Strapi to get proper translations
    const assetsResponse = await fetch(`${STRAPI_URL}/api/image-assets?filters[metadata][theme][$eq]=${theme}&pagination[limit]=100`);
    const assetsData = await assetsResponse.json();
    const strapiAssets = assetsData.data || [];
    
    // Create a map of fileName to translations
    const translationMap: Record<string, any> = {};
    strapiAssets.forEach((asset: any) => {
      const fileName = asset.attributes.fileName;
      translationMap[fileName.toLowerCase()] = asset.attributes.translations;
    });
    
    // Build image data with translations from Strapi
    const images = imageFiles.map(fileName => {
      const baseName = fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
      const baseNameLower = baseName.toLowerCase();
      
      // Get translations from Strapi or fall back to hardcoded
      let imageTranslations = translationMap[baseNameLower];
      
      if (!imageTranslations) {
        // Fall back to hardcoded translations
        imageTranslations = getImageTranslations(baseName, locale);
      }
      
      const displayName = imageTranslations[locale] || imageTranslations['en'] || capitalizeWords(baseName);
      
      return {
        url: `/images/${theme}/${fileName}`,
        fileName: baseName,
        displayName: displayName,
        translations: imageTranslations
      };
    });
    
    return NextResponse.json({
      theme: {
        name: themeTranslations[locale] || themeInfo.displayName,
        folderName: theme,
        translations: themeTranslations
      },
      images: images,
      locale: locale
    });
  } catch (error) {
    console.error('Error fetching image library:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function capitalizeWords(str: string): string {
  return str.split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getImageTranslations(imageName: string, locale: string) {
  // Expanded translation mapping - matches the populate-image-assets.js dictionary
  const translations: Record<string, Record<string, string>> = {
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
    'cow': {
      'en': 'Cow',
      'de': 'Kuh',
      'fr': 'Vache',
      'es': 'Vaca',
      'pt': 'Vaca',
      'it': 'Mucca',
      'nl': 'Koe',
      'sv': 'Ko',
      'da': 'Ko',
      'no': 'Ku',
      'fi': 'Lehmä'
    },
    'pig': {
      'en': 'Pig',
      'de': 'Schwein',
      'fr': 'Cochon',
      'es': 'Cerdo',
      'pt': 'Porco',
      'it': 'Maiale',
      'nl': 'Varken',
      'sv': 'Gris',
      'da': 'Gris',
      'no': 'Gris',
      'fi': 'Sika'
    },
    'sheep': {
      'en': 'Sheep',
      'de': 'Schaf',
      'fr': 'Mouton',
      'es': 'Oveja',
      'pt': 'Ovelha',
      'it': 'Pecora',
      'nl': 'Schaap',
      'sv': 'Får',
      'da': 'Får',
      'no': 'Sau',
      'fi': 'Lammas'
    },
    'lion': {
      'en': 'Lion',
      'de': 'Löwe',
      'fr': 'Lion',
      'es': 'León',
      'pt': 'Leão',
      'it': 'Leone',
      'nl': 'Leeuw',
      'sv': 'Lejon',
      'da': 'Løve',
      'no': 'Løve',
      'fi': 'Leijona'
    },
    'tiger': {
      'en': 'Tiger',
      'de': 'Tiger',
      'fr': 'Tigre',
      'es': 'Tigre',
      'pt': 'Tigre',
      'it': 'Tigre',
      'nl': 'Tijger',
      'sv': 'Tiger',
      'da': 'Tiger',
      'no': 'Tiger',
      'fi': 'Tiikeri'
    },
    'mouse': {
      'en': 'Mouse',
      'de': 'Maus',
      'fr': 'Souris',
      'es': 'Ratón',
      'pt': 'Rato',
      'it': 'Topo',
      'nl': 'Muis',
      'sv': 'Mus',
      'da': 'Mus',
      'no': 'Mus',
      'fi': 'Hiiri'
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
    }
  };
  
  const key = imageName.toLowerCase().replace(/[-_\s]+/g, '');
  return translations[key] || {
    'en': capitalizeWords(imageName),
    'de': capitalizeWords(imageName),
    'fr': capitalizeWords(imageName),
    'es': capitalizeWords(imageName),
    'pt': capitalizeWords(imageName),
    'it': capitalizeWords(imageName),
    'nl': capitalizeWords(imageName),
    'sv': capitalizeWords(imageName),
    'da': capitalizeWords(imageName),
    'no': capitalizeWords(imageName),
    'fi': capitalizeWords(imageName)
  };
}