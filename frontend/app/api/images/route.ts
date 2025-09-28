import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    // Read from local JSON file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'images-metadata.json');

    if (!fs.existsSync(metadataPath)) {
      return NextResponse.json({ images: [], pagination: { total: 0, page: 1, limit } });
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    let allImages = [];

    // Get all images when no theme specified or theme is 'all'
    if (!theme || theme === 'all') {
      // Collect all images from all active themes
      for (const themeData of metadata.themes) {
        if (!themeData.active) continue;

        for (const img of themeData.images) {
          const displayName = img.translations?.[locale] || img.translations?.['en'] || img.displayName;

          allImages.push({
            path: img.path,
            url: img.path,
            name: displayName,
            word: displayName,
            theme: themeData.name
          });
        }
      }
    } else {
      // Get images from specific theme
      const themeData = metadata.themes.find(t => t.id === theme || t.name === theme);
      if (themeData && themeData.active) {
        for (const img of themeData.images) {
          const displayName = img.translations?.[locale] || img.translations?.['en'] || img.displayName;

          allImages.push({
            path: img.path,
            url: img.path,
            name: displayName,
            word: displayName
          });
        }
      }
    }

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      allImages = allImages.filter(img =>
        img.name.toLowerCase().includes(searchLower) ||
        img.word.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedImages = allImages.slice(startIndex, endIndex);

    return NextResponse.json({
      images: paginatedImages,
      pagination: {
        page,
        limit,
        total: allImages.length,
        totalPages: Math.ceil(allImages.length / limit),
        hasMore: endIndex < allImages.length
      }
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images', images: [] },
      { status: 500 }
    );
  }
}