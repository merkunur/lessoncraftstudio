import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Get all train template themes from database
    const themes = await prisma.imageTheme.findMany({
      where: { type: 'train' },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    // Flatten all images from all themes
    const templates = themes.flatMap(theme =>
      theme.images.map(img => ({
        path: img.filePath,
        url: img.filePath,
        name: img.translations?.[locale] || img.translations?.['en'] || img.filename,
        theme: theme.name
      }))
    );

    return NextResponse.json(templates, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching train templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch train templates' },
      { status: 500 }
    );
  }
}