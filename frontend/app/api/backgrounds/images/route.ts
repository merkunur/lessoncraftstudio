import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';

  if (!theme) {
    return NextResponse.json({ error: 'A valid background theme is required' }, { status: 400 });
  }

  try {
    // Get backgrounds from database
    const themeData = await prisma.imageTheme.findFirst({
      where: {
        name: theme,
        type: 'backgrounds'
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    let backgrounds = [];
    if (themeData) {
      backgrounds = themeData.images.map(img => ({
        name: img.translations?.[locale] || img.translations?.['en'] || img.filename,
        path: img.filePath
      }));
    }

    return NextResponse.json({
      images: backgrounds
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (err: any) {
    console.error('Error fetching background images:', err);
    return NextResponse.json(
      { error: 'Failed to fetch background images' },
      { status: 500 }
    );
  }
}