import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';

  if (!theme) {
    return NextResponse.json({ error: 'A valid border theme is required' }, { status: 400 });
  }

  try {
    // Get borders from database
    const themeData = await prisma.imageTheme.findFirst({
      where: {
        name: theme,
        type: 'borders'
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    let borders = [];
    if (themeData) {
      borders = themeData.images.map(img => ({
        name: img.translations?.[locale] || img.translations?.['en'] || img.filename,
        path: img.filePath
      }));
    }

    return NextResponse.json({
      images: borders
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (err: any) {
    console.error('Error fetching border images:', err);
    return NextResponse.json(
      { error: 'Failed to fetch border images' },
      { status: 500 }
    );
  }
}