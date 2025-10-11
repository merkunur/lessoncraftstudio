import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * Public API for borders - reads from database
 * Used by frontend worksheet generator apps
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const style = searchParams.get('style');
  const locale = searchParams.get('locale') || 'en';

  try {
    // Query database for borders
    type ThemeWithImages = Prisma.ImageThemeGetPayload<{
      include: { images: true }
    }>;
    let themes: ThemeWithImages[];

    try {
      const whereClause: any = { type: 'borders' };
      if (style) {
        whereClause.name = style;
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
      console.warn('Database not available for borders, returning empty array:', dbError);
      themes = [];
    }

    // Transform to frontend format
    const allBorders: any[] = [];

    for (const theme of themes) {
      for (const image of theme.images) {
        const translations = image.translations as Record<string, string> || {};
        const displayName = translations[locale] || translations['en'] || image.filename.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '');

        allBorders.push({
          path: image.filePath,
          url: image.filePath,
          name: displayName,
          originalName: image.filename,
          translations: translations,
          style: theme.name,
        });
      }
    }

    return NextResponse.json(allBorders, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching borders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch borders' },
      { status: 500 }
    );
  }
}
