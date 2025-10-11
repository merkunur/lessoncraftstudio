import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * Public API for backgrounds - reads from database
 * Used by frontend worksheet generator apps
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';

  try {
    // Query database for backgrounds
    type ThemeWithImages = Prisma.ImageThemeGetPayload<{
      include: { images: true }
    }>;
    let themes: ThemeWithImages[];

    try {
      const whereClause: any = { type: 'backgrounds' };
      if (theme) {
        whereClause.name = theme;
      }

      themes = await prisma.imageTheme.findMany({
        where: whereClause,
        include: {
          images: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      });
    } catch (dbError) {
      console.warn('Database not available for backgrounds, returning empty array:', dbError);
      themes = [];
    }

    // Transform to frontend format
    const allBackgrounds: any[] = [];

    for (const themeRecord of themes) {
      for (const image of themeRecord.images) {
        const translations = image.translations as Record<string, string> || {};
        const displayName = translations[locale] || translations['en'] || image.filename.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '');

        allBackgrounds.push({
          id: image.id,
          path: image.filePath,
          url: image.filePath,
          name: displayName,
          originalName: image.filename,
          translations: translations,
          theme: themeRecord.name,
        });
      }
    }

    return NextResponse.json(allBackgrounds, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching backgrounds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backgrounds' },
      { status: 500 }
    );
  }
}
