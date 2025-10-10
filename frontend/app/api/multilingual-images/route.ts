import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Extended translation dictionary for image names
const imageTranslations: Record<string, Record<string, string>> = {
  // Animals
  'cat': {
    'en': 'Cat', 'de': 'Katze', 'fr': 'Chat', 'es': 'Gato', 'pt': 'Gato',
    'it': 'Gatto', 'nl': 'Kat', 'sv': 'Katt', 'da': 'Kat', 'no': 'Katt', 'fi': 'Kissa'
  },
  'dog': {
    'en': 'Dog', 'de': 'Hund', 'fr': 'Chien', 'es': 'Perro', 'pt': 'Cão',
    'it': 'Cane', 'nl': 'Hond', 'sv': 'Hund', 'da': 'Hund', 'no': 'Hund', 'fi': 'Koira'
  },
  'cow': {
    'en': 'Cow', 'de': 'Kuh', 'fr': 'Vache', 'es': 'Vaca', 'pt': 'Vaca',
    'it': 'Mucca', 'nl': 'Koe', 'sv': 'Ko', 'da': 'Ko', 'no': 'Ku', 'fi': 'Lehmä'
  },
  'pig': {
    'en': 'Pig', 'de': 'Schwein', 'fr': 'Cochon', 'es': 'Cerdo', 'pt': 'Porco',
    'it': 'Maiale', 'nl': 'Varken', 'sv': 'Gris', 'da': 'Gris', 'no': 'Gris', 'fi': 'Sika'
  },
  'sheep': {
    'en': 'Sheep', 'de': 'Schaf', 'fr': 'Mouton', 'es': 'Oveja', 'pt': 'Ovelha',
    'it': 'Pecora', 'nl': 'Schaap', 'sv': 'Får', 'da': 'Får', 'no': 'Sau', 'fi': 'Lammas'
  },
  'lion': {
    'en': 'Lion', 'de': 'Löwe', 'fr': 'Lion', 'es': 'León', 'pt': 'Leão',
    'it': 'Leone', 'nl': 'Leeuw', 'sv': 'Lejon', 'da': 'Løve', 'no': 'Løve', 'fi': 'Leijona'
  },
  'tiger': {
    'en': 'Tiger', 'de': 'Tiger', 'fr': 'Tigre', 'es': 'Tigre', 'pt': 'Tigre',
    'it': 'Tigre', 'nl': 'Tijger', 'sv': 'Tiger', 'da': 'Tiger', 'no': 'Tiger', 'fi': 'Tiikeri'
  },
  'mouse': {
    'en': 'Mouse', 'de': 'Maus', 'fr': 'Souris', 'es': 'Ratón', 'pt': 'Rato',
    'it': 'Topo', 'nl': 'Muis', 'sv': 'Mus', 'da': 'Mus', 'no': 'Mus', 'fi': 'Hiiri'
  },
  'elephant': {
    'en': 'Elephant', 'de': 'Elefant', 'fr': 'Éléphant', 'es': 'Elefante', 'pt': 'Elefante',
    'it': 'Elefante', 'nl': 'Olifant', 'sv': 'Elefant', 'da': 'Elefant', 'no': 'Elefant', 'fi': 'Norsu'
  },
  'bird': {
    'en': 'Bird', 'de': 'Vogel', 'fr': 'Oiseau', 'es': 'Pájaro', 'pt': 'Pássaro',
    'it': 'Uccello', 'nl': 'Vogel', 'sv': 'Fågel', 'da': 'Fugl', 'no': 'Fugl', 'fi': 'Lintu'
  },
  'fish': {
    'en': 'Fish', 'de': 'Fisch', 'fr': 'Poisson', 'es': 'Pez', 'pt': 'Peixe',
    'it': 'Pesce', 'nl': 'Vis', 'sv': 'Fisk', 'da': 'Fisk', 'no': 'Fisk', 'fi': 'Kala'
  },
  'rabbit': {
    'en': 'Rabbit', 'de': 'Kaninchen', 'fr': 'Lapin', 'es': 'Conejo', 'pt': 'Coelho',
    'it': 'Coniglio', 'nl': 'Konijn', 'sv': 'Kanin', 'da': 'Kanin', 'no': 'Kanin', 'fi': 'Kani'
  },
  'horse': {
    'en': 'Horse', 'de': 'Pferd', 'fr': 'Cheval', 'es': 'Caballo', 'pt': 'Cavalo',
    'it': 'Cavallo', 'nl': 'Paard', 'sv': 'Häst', 'da': 'Hest', 'no': 'Hest', 'fi': 'Hevonen'
  },
  
  // Food
  'apple': {
    'en': 'Apple', 'de': 'Apfel', 'fr': 'Pomme', 'es': 'Manzana', 'pt': 'Maçã',
    'it': 'Mela', 'nl': 'Appel', 'sv': 'Äpple', 'da': 'Æble', 'no': 'Eple', 'fi': 'Omena'
  },
  'banana': {
    'en': 'Banana', 'de': 'Banane', 'fr': 'Banane', 'es': 'Plátano', 'pt': 'Banana',
    'it': 'Banana', 'nl': 'Banaan', 'sv': 'Banan', 'da': 'Banan', 'no': 'Banan', 'fi': 'Banaani'
  },
  'carrot': {
    'en': 'Carrot', 'de': 'Karotte', 'fr': 'Carotte', 'es': 'Zanahoria', 'pt': 'Cenoura',
    'it': 'Carota', 'nl': 'Wortel', 'sv': 'Morot', 'da': 'Gulerod', 'no': 'Gulrot', 'fi': 'Porkkana'
  },
  'bread': {
    'en': 'Bread', 'de': 'Brot', 'fr': 'Pain', 'es': 'Pan', 'pt': 'Pão',
    'it': 'Pane', 'nl': 'Brood', 'sv': 'Bröd', 'da': 'Brød', 'no': 'Brød', 'fi': 'Leipä'
  },
  'cheese': {
    'en': 'Cheese', 'de': 'Käse', 'fr': 'Fromage', 'es': 'Queso', 'pt': 'Queijo',
    'it': 'Formaggio', 'nl': 'Kaas', 'sv': 'Ost', 'da': 'Ost', 'no': 'Ost', 'fi': 'Juusto'
  },
  'egg': {
    'en': 'Egg', 'de': 'Ei', 'fr': 'Œuf', 'es': 'Huevo', 'pt': 'Ovo',
    'it': 'Uovo', 'nl': 'Ei', 'sv': 'Ägg', 'da': 'Æg', 'no': 'Egg', 'fi': 'Muna'
  },
  'milk': {
    'en': 'Milk', 'de': 'Milch', 'fr': 'Lait', 'es': 'Leche', 'pt': 'Leite',
    'it': 'Latte', 'nl': 'Melk', 'sv': 'Mjölk', 'da': 'Mælk', 'no': 'Melk', 'fi': 'Maito'
  },
  'orange': {
    'en': 'Orange', 'de': 'Orange', 'fr': 'Orange', 'es': 'Naranja', 'pt': 'Laranja',
    'it': 'Arancia', 'nl': 'Sinaasappel', 'sv': 'Apelsin', 'da': 'Appelsin', 'no': 'Appelsin', 'fi': 'Appelsiini'
  },
  'pizza': {
    'en': 'Pizza', 'de': 'Pizza', 'fr': 'Pizza', 'es': 'Pizza', 'pt': 'Pizza',
    'it': 'Pizza', 'nl': 'Pizza', 'sv': 'Pizza', 'da': 'Pizza', 'no': 'Pizza', 'fi': 'Pizza'
  },
  'strawberry': {
    'en': 'Strawberry', 'de': 'Erdbeere', 'fr': 'Fraise', 'es': 'Fresa', 'pt': 'Morango',
    'it': 'Fragola', 'nl': 'Aardbei', 'sv': 'Jordgubbe', 'da': 'Jordbær', 'no': 'Jordbær', 'fi': 'Mansikka'
  },
  'tomato': {
    'en': 'Tomato', 'de': 'Tomate', 'fr': 'Tomate', 'es': 'Tomate', 'pt': 'Tomate',
    'it': 'Pomodoro', 'nl': 'Tomaat', 'sv': 'Tomat', 'da': 'Tomat', 'no': 'Tomat', 'fi': 'Tomaatti'
  },
  'watermelon': {
    'en': 'Watermelon', 'de': 'Wassermelone', 'fr': 'Pastèque', 'es': 'Sandía', 'pt': 'Melancia',
    'it': 'Anguria', 'nl': 'Watermeloen', 'sv': 'Vattenmelon', 'da': 'Vandmelon', 'no': 'Vannmelon', 'fi': 'Vesimeloni'
  },
  
  // Objects
  'car': {
    'en': 'Car', 'de': 'Auto', 'fr': 'Voiture', 'es': 'Coche', 'pt': 'Carro',
    'it': 'Auto', 'nl': 'Auto', 'sv': 'Bil', 'da': 'Bil', 'no': 'Bil', 'fi': 'Auto'
  },
  'house': {
    'en': 'House', 'de': 'Haus', 'fr': 'Maison', 'es': 'Casa', 'pt': 'Casa',
    'it': 'Casa', 'nl': 'Huis', 'sv': 'Hus', 'da': 'Hus', 'no': 'Hus', 'fi': 'Talo'
  },
  'tree': {
    'en': 'Tree', 'de': 'Baum', 'fr': 'Arbre', 'es': 'Árbol', 'pt': 'Árvore',
    'it': 'Albero', 'nl': 'Boom', 'sv': 'Träd', 'da': 'Træ', 'no': 'Tre', 'fi': 'Puu'
  },
  'sun': {
    'en': 'Sun', 'de': 'Sonne', 'fr': 'Soleil', 'es': 'Sol', 'pt': 'Sol',
    'it': 'Sole', 'nl': 'Zon', 'sv': 'Sol', 'da': 'Sol', 'no': 'Sol', 'fi': 'Aurinko'
  },
  'moon': {
    'en': 'Moon', 'de': 'Mond', 'fr': 'Lune', 'es': 'Luna', 'pt': 'Lua',
    'it': 'Luna', 'nl': 'Maan', 'sv': 'Måne', 'da': 'Måne', 'no': 'Måne', 'fi': 'Kuu'
  },
  'star': {
    'en': 'Star', 'de': 'Stern', 'fr': 'Étoile', 'es': 'Estrella', 'pt': 'Estrela',
    'it': 'Stella', 'nl': 'Ster', 'sv': 'Stjärna', 'da': 'Stjerne', 'no': 'Stjerne', 'fi': 'Tähti'
  },
  'flower': {
    'en': 'Flower', 'de': 'Blume', 'fr': 'Fleur', 'es': 'Flor', 'pt': 'Flor',
    'it': 'Fiore', 'nl': 'Bloem', 'sv': 'Blomma', 'da': 'Blomst', 'no': 'Blomst', 'fi': 'Kukka'
  },
  'ball': {
    'en': 'Ball', 'de': 'Ball', 'fr': 'Balle', 'es': 'Pelota', 'pt': 'Bola',
    'it': 'Palla', 'nl': 'Bal', 'sv': 'Boll', 'da': 'Bold', 'no': 'Ball', 'fi': 'Pallo'
  },
  'book': {
    'en': 'Book', 'de': 'Buch', 'fr': 'Livre', 'es': 'Libro', 'pt': 'Livro',
    'it': 'Libro', 'nl': 'Boek', 'sv': 'Bok', 'da': 'Bog', 'no': 'Bok', 'fi': 'Kirja'
  },
  'pencil': {
    'en': 'Pencil', 'de': 'Bleistift', 'fr': 'Crayon', 'es': 'Lápiz', 'pt': 'Lápis',
    'it': 'Matita', 'nl': 'Potlood', 'sv': 'Penna', 'da': 'Blyant', 'no': 'Blyant', 'fi': 'Kynä'
  }
};

function getTranslatedImageName(imageName: string, locale: string): string {
  // Remove file extension and normalize
  const baseName = imageName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
  
  // Try to find translation
  if (imageTranslations[baseName] && imageTranslations[baseName][locale]) {
    return imageTranslations[baseName][locale];
  }
  
  // Fallback to English if available
  if (imageTranslations[baseName] && imageTranslations[baseName]['en']) {
    return imageTranslations[baseName]['en'];
  }
  
  // Try to get from Strapi if not in local dictionary
  // This will be handled by the main function
  
  // Default: capitalize the original name
  return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';
  const search = searchParams.get('search');
  
  try {
    // First, try to get translations from Strapi
    let strapiTranslations: Record<string, any> = {};
    try {
      const strapiResponse = await fetch(
        `${STRAPI_URL}/api/image-assets?populate=*&pagination[limit]=100`,
        { cache: 'no-store' }
      );
      
      if (strapiResponse.ok) {
        const strapiData = await strapiResponse.json();
        if (strapiData.data) {
          strapiData.data.forEach((asset: any) => {
            const fileName = asset.attributes.fileName?.toLowerCase();
            if (fileName && asset.attributes.translations) {
              strapiTranslations[fileName] = asset.attributes.translations;
            }
          });
        }
      }
    } catch (strapiError) {
      // Silently fall back to local translations
    }
    
    // Build the path to the images
    let imagePath: string;
    let images: string[] = [];
    
    if (theme && theme !== 'all') {
      imagePath = path.join(process.cwd(), 'public', 'images', theme);
      try {
        const files = await fs.readdir(imagePath);
        images = files
          .filter(file => /\.(png|jpg|jpeg|gif|svg)$/i.test(file))
          .map(file => `${theme}/${file}`);
      } catch (error) {
        console.error(`Error reading theme ${theme}:`, error);
      }
    } else if (theme === 'all' || search) {
      // Get all images from all themes
      const imagesDir = path.join(process.cwd(), 'public', 'images');
      const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template', 'alphabetsvg'];
      
      const folders = await fs.readdir(imagesDir, { withFileTypes: true });
      const validFolders = folders
        .filter(f => f.isDirectory() && !excludedFolders.includes(f.name))
        .map(f => f.name);
      
      for (const folder of validFolders) {
        const folderPath = path.join(imagesDir, folder);
        try {
          const files = await fs.readdir(folderPath);
          const folderImages = files
            .filter(file => /\.(png|jpg|jpeg|gif|svg)$/i.test(file))
            .map(file => `${folder}/${file}`);
          images.push(...folderImages);
        } catch (error) {
          console.error(`Error reading folder ${folder}:`, error);
        }
      }
    }
    
    // Process images with translations
    const processedImages = images.map(imagePath => {
      const parts = imagePath.split('/');
      const fileName = parts[parts.length - 1];
      const folderName = parts.length > 1 ? parts[0] : theme || '';
      const baseName = fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
      
      // Try Strapi translations first
      let displayName = strapiTranslations[baseName]?.[locale];
      
      // Fall back to local translations
      if (!displayName) {
        displayName = getTranslatedImageName(fileName, locale);
      }
      
      // Apply search filter if provided
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = displayName.toLowerCase().includes(searchLower) ||
                             baseName.includes(searchLower);
        if (!matchesSearch) {
          return null;
        }
      }
      
      return {
        path: `/images/${imagePath}`,
        word: displayName,
        theme: folderName,
        originalName: baseName
      };
    }).filter(img => img !== null);
    
    return NextResponse.json(processedImages);
  } catch (error) {
    console.error('Error in multilingual images API:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}