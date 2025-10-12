import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Get themes from database
    const dbThemes = await prisma.imageTheme.findMany({
      where: { type: 'worksheet' },
      include: {
        _count: {
          select: { images: true }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    const themes = dbThemes.map(theme => {
      const displayNames = theme.displayNames as Record<string, string>;
      return {
        value: theme.name,
        displayName: displayNames?.[locale] || displayNames?.['en'] || theme.name,
        imageCount: theme._count.images
      };
    });

    return NextResponse.json(themes, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // No cache during development
      },
    });
  } catch (error) {
    console.error('Error fetching worksheet template themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch worksheet template themes' },
      { status: 500 }
    );
  }
}
