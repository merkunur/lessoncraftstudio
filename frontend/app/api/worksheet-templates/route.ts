import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * Public API for worksheet templates - reads from database
 * Used by frontend worksheet generator apps (Prepositions, etc.)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Query database for worksheet templates
    type ThemeWithImages = Prisma.ImageThemeGetPayload<{
      include: { images: true }
    }>;
    let themes: ThemeWithImages[];

    try {
      themes = await prisma.imageTheme.findMany({
        where: {
          type: 'worksheet',
        },
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
      console.warn('Database not available for worksheet templates, returning empty array:', dbError);
      themes = [];
    }

    // Transform to frontend format
    const allTemplates: any[] = [];

    for (const themeRecord of themes) {
      const themeTranslations = themeRecord.displayNames as Record<string, string> || {};
      const themeName = themeTranslations[locale] || themeTranslations['en'] || themeRecord.name;

      for (const image of themeRecord.images) {
        const translations = image.translations as Record<string, string> || {};
        const displayName = translations[locale] || translations['en'] || image.filename.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '');

        allTemplates.push({
          path: image.filePath,
          url: image.filePath,
          name: displayName,
          displayName: displayName,
          theme: themeRecord.name,
          themeName: themeName,
          translations: translations,
        });
      }
    }

    return NextResponse.json({ templates: allTemplates }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching worksheet templates:', error);
    return NextResponse.json({ templates: [] }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}
