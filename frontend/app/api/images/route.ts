import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTranslatedImageName } from '../multilingual-images/translations';

// Legacy translations (kept for backward compatibility, but now using comprehensive dictionary)
const translations: Record<string, Record<string, string>> = {
  // Animals
  'cat': { 'en': 'Cat', 'de': 'Katze', 'fr': 'Chat', 'es': 'Gato', 'pt': 'Gato', 'it': 'Gatto', 'nl': 'Kat', 'sv': 'Katt', 'da': 'Kat', 'no': 'Katt', 'fi': 'Kissa' },
  'dog': { 'en': 'Dog', 'de': 'Hund', 'fr': 'Chien', 'es': 'Perro', 'pt': 'Cão', 'it': 'Cane', 'nl': 'Hond', 'sv': 'Hund', 'da': 'Hund', 'no': 'Hund', 'fi': 'Koira' },
  'bird': { 'en': 'Bird', 'de': 'Vogel', 'fr': 'Oiseau', 'es': 'Pájaro', 'pt': 'Pássaro', 'it': 'Uccello', 'nl': 'Vogel', 'sv': 'Fågel', 'da': 'Fugl', 'no': 'Fugl', 'fi': 'Lintu' },
  'fish': { 'en': 'Fish', 'de': 'Fisch', 'fr': 'Poisson', 'es': 'Pez', 'pt': 'Peixe', 'it': 'Pesce', 'nl': 'Vis', 'sv': 'Fisk', 'da': 'Fisk', 'no': 'Fisk', 'fi': 'Kala' },
  'cow': { 'en': 'Cow', 'de': 'Kuh', 'fr': 'Vache', 'es': 'Vaca', 'pt': 'Vaca', 'it': 'Mucca', 'nl': 'Koe', 'sv': 'Ko', 'da': 'Ko', 'no': 'Ku', 'fi': 'Lehmä' },
  'horse': { 'en': 'Horse', 'de': 'Pferd', 'fr': 'Cheval', 'es': 'Caballo', 'pt': 'Cavalo', 'it': 'Cavallo', 'nl': 'Paard', 'sv': 'Häst', 'da': 'Hest', 'no': 'Hest', 'fi': 'Hevonen' },
  'sheep': { 'en': 'Sheep', 'de': 'Schaf', 'fr': 'Mouton', 'es': 'Oveja', 'pt': 'Ovelha', 'it': 'Pecora', 'nl': 'Schaap', 'sv': 'Får', 'da': 'Får', 'no': 'Sau', 'fi': 'Lammas' },
  'pig': { 'en': 'Pig', 'de': 'Schwein', 'fr': 'Cochon', 'es': 'Cerdo', 'pt': 'Porco', 'it': 'Maiale', 'nl': 'Varken', 'sv': 'Gris', 'da': 'Gris', 'no': 'Gris', 'fi': 'Sika' },
  'rabbit': { 'en': 'Rabbit', 'de': 'Hase', 'fr': 'Lapin', 'es': 'Conejo', 'pt': 'Coelho', 'it': 'Coniglio', 'nl': 'Konijn', 'sv': 'Kanin', 'da': 'Kanin', 'no': 'Kanin', 'fi': 'Kani' },
  'mouse': { 'en': 'Mouse', 'de': 'Maus', 'fr': 'Souris', 'es': 'Ratón', 'pt': 'Rato', 'it': 'Topo', 'nl': 'Muis', 'sv': 'Mus', 'da': 'Mus', 'no': 'Mus', 'fi': 'Hiiri' },
  // Food
  'apple': { 'en': 'Apple', 'de': 'Apfel', 'fr': 'Pomme', 'es': 'Manzana', 'pt': 'Maçã', 'it': 'Mela', 'nl': 'Appel', 'sv': 'Äpple', 'da': 'Æble', 'no': 'Eple', 'fi': 'Omena' },
  'banana': { 'en': 'Banana', 'de': 'Banane', 'fr': 'Banane', 'es': 'Plátano', 'pt': 'Banana', 'it': 'Banana', 'nl': 'Banaan', 'sv': 'Banan', 'da': 'Banan', 'no': 'Banan', 'fi': 'Banaani' },
  'bread': { 'en': 'Bread', 'de': 'Brot', 'fr': 'Pain', 'es': 'Pan', 'pt': 'Pão', 'it': 'Pane', 'nl': 'Brood', 'sv': 'Bröd', 'da': 'Brød', 'no': 'Brød', 'fi': 'Leipä' },
  'pizza': { 'en': 'Pizza', 'de': 'Pizza', 'fr': 'Pizza', 'es': 'Pizza', 'pt': 'Pizza', 'it': 'Pizza', 'nl': 'Pizza', 'sv': 'Pizza', 'da': 'Pizza', 'no': 'Pizza', 'fi': 'Pizza' },
  'cake': { 'en': 'Cake', 'de': 'Kuchen', 'fr': 'Gâteau', 'es': 'Pastel', 'pt': 'Bolo', 'it': 'Torta', 'nl': 'Taart', 'sv': 'Tårta', 'da': 'Kage', 'no': 'Kake', 'fi': 'Kakku' },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  
  const imagesBaseDir = path.join(process.cwd(), 'public', 'images');
  
  if (search) {
    const excludedFolders = new Set(['borders', 'backgrounds', 'drawing lines', 'template']);
    const results: any[] = [];
    const searchQuery = search.toLowerCase();
    
    async function findMatchingImages(directory: string, currentPath = '') {
      try {
        const files = await fs.promises.readdir(directory, { withFileTypes: true });
        
        for (const file of files) {
          const fullPath = path.join(directory, file.name);
          const newRelativePath = path.join(currentPath, file.name).replace(/\\/g, '/');
          
          if (file.isDirectory()) {
            if (currentPath === '' && excludedFolders.has(file.name)) {
              continue;
            }
            await findMatchingImages(fullPath, newRelativePath);
          } else if (/\.(png|jpe?g|gif|svg)$/i.test(file.name)) {
            const baseName = path.basename(file.name, path.extname(file.name));
            const displayName = getTranslatedImageName(baseName, locale);
            if (displayName.toLowerCase().includes(searchQuery)) {
              results.push({
                word: displayName,
                name: displayName,
                path: `/images/${newRelativePath}`
              });
            }
          }
        }
      } catch (err) {
        console.error(`Could not read directory: ${directory}`, err);
      }
    }
    
    await findMatchingImages(imagesBaseDir);
    return NextResponse.json(results);
  }
  
  if (!theme || theme.includes('..') || theme === 'all') {
    return NextResponse.json([]);
  }
  
  // Support nested theme paths like "alphabetsvg/cursive"
  const folderPath = path.join(imagesBaseDir, ...theme.split('/'));
  
  try {
    const files = await fs.promises.readdir(folderPath);
    const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
    const images = imageFiles.map(f => {
      const baseName = path.basename(f, path.extname(f));
      const displayName = getTranslatedImageName(baseName, locale);
      return {
        word: displayName,
        name: displayName,
        path: `/images/${theme}/${f}`
      };
    });
    
    return NextResponse.json(images);
  } catch (err) {
    return NextResponse.json({ error: `Error reading images folder: ${theme}` }, { status: 500 });
  }
}