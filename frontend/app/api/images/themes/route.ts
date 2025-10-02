import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Get themes from database
    const dbThemes = await prisma.imageTheme.findMany({
      where: { type: 'images' },
      include: {
        _count: {
          select: { images: true }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    const themes = dbThemes.map(theme => ({
      value: theme.name,
      displayName: theme.displayNames[locale] || theme.displayNames['en'] || theme.name,
      imageCount: theme._count.images
    }));

    return NextResponse.json(themes, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error('Error fetching image themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image themes' },
      { status: 500 }
    );
  }
}