import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// When running in Docker, use host.docker.internal to access host machine
const STRAPI_URL = 'http://host.docker.internal:1337';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const locale = searchParams.get('locale') || 'en';
  
  if (!query) {
    return NextResponse.json([]);
  }
  
  try {
    // Search in Strapi for images matching the query
    const searchQuery = query.toLowerCase();
    
    // Fetch all image assets from Strapi and filter by translation
    const assetsResponse = await fetch(
      `${STRAPI_URL}/api/image-assets?pagination[limit]=500`
    );
    const assetsData = await assetsResponse.json();
    
    if (!assetsData.data) {
      return NextResponse.json([]);
    }
    
    const matchingImages = [];
    
    for (const asset of assetsData.data) {
      const translations = asset.attributes.translations || {};
      const localizedName = translations[locale] || translations['en'] || asset.attributes.displayName;
      
      // Check if the localized name matches the search query
      if (localizedName && localizedName.toLowerCase().includes(searchQuery)) {
        const theme = asset.attributes.metadata?.theme || 'general';
        const fileName = asset.attributes.fileName;
        
        // Check if file exists
        const imagePath = path.join(process.cwd(), 'public', 'images', theme, `${fileName}.png`);
        let fileExt = '.png';
        
        try {
          await fs.access(imagePath);
        } catch {
          // Try other extensions
          for (const ext of ['.jpg', '.jpeg', '.gif', '.svg']) {
            const altPath = path.join(process.cwd(), 'public', 'images', theme, `${fileName}${ext}`);
            try {
              await fs.access(altPath);
              fileExt = ext;
              break;
            } catch {
              continue;
            }
          }
        }
        
        matchingImages.push({
          url: `/images/${theme}/${fileName}${fileExt}`,
          path: `/images/${theme}/${fileName}${fileExt}`,
          fileName: fileName,
          displayName: localizedName,
          name: localizedName,
          word: localizedName,
          translations: translations
        });
      }
    }
    
    // Sort results by relevance (exact match first, then alphabetical)
    matchingImages.sort((a, b) => {
      const aExact = a.word.toLowerCase() === searchQuery;
      const bExact = b.word.toLowerCase() === searchQuery;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      return a.word.localeCompare(b.word);
    });
    
    return NextResponse.json(matchingImages);
  } catch (error) {
    console.error('Error searching image library:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}