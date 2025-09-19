import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTranslatedImageName } from '../multilingual-images/translations';

// Use Docker service name when running in container, localhost for local dev
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://lcs-directus:8055';
const API_TOKEN = 'static-api-token-for-sync';

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
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '100'); // Default 100 images per page
  
  // ALWAYS fetch from Directus for dynamic updates
  try {
    // Get all images when no theme specified or theme is 'all'
    if (!theme || theme === 'all') {
      const queryParams: any = {
        'fields': '*,image_file.*,theme_id.*',
        'filter[status][_eq]': 'active',
        'filter[theme_id][folder_name][_nin]': 'alphabetsvg,prepositions,symbols,drawing lines,train_templates,worksheet_templates', // Exclude app-specific themes
        'limit': limit.toString(),
        'page': page.toString(),
        'sort': 'theme_id,file_name'
      };

      // Add search filter if provided
      if (search) {
        queryParams['filter[_or][0][translations][_contains]'] = search;
        queryParams['filter[_or][1][file_name][_contains]'] = search;
      }

      const response = await fetch(
        `${DIRECTUS_URL}/items/image_assets?` + new URLSearchParams(queryParams),
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Debug: Log first item to see structure
        if (data.data && data.data.length > 0) {
          console.log('First image asset:', JSON.stringify(data.data[0], null, 2));
        }

        const images = data.data.map((item: any) => {
          // Get translated name
          let displayName = item.file_name;
          if (item.translations) {
            const trans = typeof item.translations === 'string'
              ? JSON.parse(item.translations)
              : item.translations;
            displayName = trans[locale] || trans['en'] || item.file_name;
          }

          // ONLY use Directus files - NO FALLBACK
          if (!item.image_file?.id) {
            console.log(`Skipping ${item.file_name} - no Directus file`);
            return null; // Skip items without Directus files
          }

          console.log(`Using Directus proxy for ${item.file_name}: ${item.image_file.id}`);
          const imagePath = `/api/directus-image?id=${item.image_file.id}`;

          return {
            path: imagePath,
            url: imagePath,
            name: displayName,
            word: displayName,
            theme: item.theme_id?.folder_name || item.theme_id?.name || 'unknown'
          };
        }).filter(Boolean); // Remove null entries

        console.log(`Returning ${images.length} images with Directus files (filtered from ${data.data.length})`);

        return NextResponse.json({
          images,
          pagination: {
            page,
            limit,
            total: data.meta?.total_count || images.length,
            totalPages: Math.ceil((data.meta?.total_count || images.length) / limit),
            hasMore: page * limit < (data.meta?.total_count || images.length)
          }
        });
      }
    }

    // Search across all themes (kept separate for specific search behavior)
    else if (search && (!theme || theme === 'all')) {
      const response = await fetch(
        `${DIRECTUS_URL}/items/image_assets?` + new URLSearchParams({
          'fields': '*,image_file.*,theme_id.*',
          'filter[translations][_contains]': search,
          'filter[status][_eq]': 'active',
          'limit': limit.toString(),
          'page': page.toString()
        }),
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        const images = data.data.map((item: any) => ({
          path: item.image_file ? `/api/directus-image?id=${item.image_file.filename_disk}` : `/images/${item.theme_id?.folder_name || 'animals'}/${item.file_name}.png`,
          url: item.image_file ? `/api/directus-image?id=${item.image_file.filename_disk}` : `/images/${item.theme_id?.folder_name || 'animals'}/${item.file_name}.png`,
          name: item.translations?.[locale] || item.file_name,
          word: item.translations?.[locale] || item.file_name,
          theme: item.theme_id?.folder_name || 'unknown'
        }));

        return NextResponse.json({
          images,
          pagination: {
            page,
            limit,
            total: data.meta?.total_count || images.length,
            totalPages: Math.ceil((data.meta?.total_count || images.length) / limit),
            hasMore: page * limit < (data.meta?.total_count || images.length)
          }
        });
      }
    }

    // Get specific theme from Directus
    if (theme && theme !== 'all' && !theme.includes('..')) {
      // First get the theme ID
      const themeResponse = await fetch(
        `${DIRECTUS_URL}/items/image_themes?` + new URLSearchParams({
          'filter[folder_name][_eq]': theme,
          'limit': '1'
        }),
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (themeResponse.ok) {
        const themeData = await themeResponse.json();
        
        if (themeData.data && themeData.data.length > 0) {
          const themeId = themeData.data[0].id;

          // Now get images for this theme
          const response = await fetch(
            `${DIRECTUS_URL}/items/image_assets?` + new URLSearchParams({
              'fields': '*,image_file.*',
              'filter[theme_id][_eq]': themeId.toString(),
              'filter[status][_eq]': 'active',
              'limit': limit.toString(),
              'page': page.toString(),
              'sort': 'file_name'
            }),
            {
              headers: {
                'Authorization': `Bearer ${API_TOKEN}`
              }
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(`Got ${data.data.length} images from Directus for theme ${theme}`);
            // Debug: Check if image_file is present
            if (data.data.length > 0) {
              console.log('First item has image_file:', !!data.data[0].image_file);
              if (data.data[0].image_file) {
                console.log('Image file disk name:', data.data[0].image_file.filename_disk);
              }
            }
            
            const images = data.data.map((item: any) => {
              // Get translated name
              let displayName = item.file_name;
              if (item.translations) {
                const trans = typeof item.translations === 'string'
                  ? JSON.parse(item.translations)
                  : item.translations;
                displayName = trans[locale] || trans['en'] || item.file_name;
              }

              // ONLY use Directus files - NO FALLBACK
              if (!item.image_file?.id) {
                console.log(`Skipping ${item.file_name} - no Directus file`);
                return null; // Skip items without Directus files
              }

              console.log(`Using Directus proxy for ${item.file_name}: ${item.image_file.id}`);
              const imagePath = `/api/directus-image?id=${item.image_file.id}`;

              return {
                path: imagePath,
                url: imagePath,
                name: displayName,
                word: displayName
              };
            }).filter(Boolean); // Remove null entries

            console.log(`Returning ${images.length} images with Directus files (filtered from ${data.data.length})`);

            return NextResponse.json({
              images,
              pagination: {
                page,
                limit,
                total: data.meta?.total_count || images.length,
                totalPages: Math.ceil((data.meta?.total_count || images.length) / limit),
                hasMore: page * limit < (data.meta?.total_count || images.length)
              }
            });
          }
        }
      }
    }
  } catch (error) {
    console.log('Error fetching from Directus, falling back to filesystem:', error);
  }
  
  // Fallback to file system
  const imagesBaseDir = path.join(process.cwd(), 'public', 'images');
  
  if (search) {
    const excludedFolders = new Set([
      'borders',           // Border assets
      'backgrounds',       // Background assets
      'drawing lines',     // Drawing Lines app specific
      'template',          // Template assets
      'alphabetsvg',       // Writing app specific
      'prepositions',      // Prepositions app specific
      'symbols'            // More Less app specific
    ]);
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
    
    // Apply pagination for search results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    return NextResponse.json({
      images: paginatedResults,
      pagination: {
        page,
        limit,
        total: results.length,
        totalPages: Math.ceil(results.length / limit),
        hasMore: endIndex < results.length
      }
    });
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
    
    // Apply pagination for filesystem images
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedImages = images.slice(startIndex, endIndex);
    
    return NextResponse.json({
      images: paginatedImages,
      pagination: {
        page,
        limit,
        total: images.length,
        totalPages: Math.ceil(images.length / limit),
        hasMore: endIndex < images.length
      }
    });
  } catch (err) {
    return NextResponse.json({ error: `Error reading images folder: ${theme}` }, { status: 500 });
  }
}