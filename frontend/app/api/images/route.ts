import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    let allImages: any[] = [];

    // Get all images when no theme specified or theme is 'all'
    if (!theme || theme === 'all') {
      // Get all images from all themes of type 'images'
      const themes = await prisma.imageTheme.findMany({
        where: { type: 'images' },
        include: {
          images: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      });

      for (const themeData of themes) {
        for (const img of themeData.images) {
          const displayName = img.translations?.[locale] || img.translations?.['en'] || img.filename;

          allImages.push({
            path: img.filePath,
            url: img.filePath,
            name: displayName,
            word: displayName,
            theme: themeData.name
          });
        }
      }
    } else {
      // Get images from specific theme by name
      const themeData = await prisma.imageTheme.findFirst({
        where: {
          name: theme,
          type: 'images'
        },
        include: {
          images: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      });

      if (themeData) {
        for (const img of themeData.images) {
          const displayName = img.translations?.[locale] || img.translations?.['en'] || img.filename;

          allImages.push({
            path: img.filePath,
            url: img.filePath,
            name: displayName,
            word: displayName
          });
        }
      }
    }

    // Apply search filter if provided
    if (search && search.trim()) {
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