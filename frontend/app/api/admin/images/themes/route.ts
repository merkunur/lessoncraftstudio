import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/images/themes - List all themes
export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get('type') || 'images'; // images, borders, backgrounds, train, worksheet

    const themes = await prisma.imageTheme.findMany({
      where: { type },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ themes });
  } catch (error) {
    console.error('Failed to fetch themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}

// POST /api/admin/images/themes - Create new theme
export async function POST(request: NextRequest) {
  console.log('========== CREATE THEME REQUEST ==========');

  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    console.log('Admin check failed');
    return adminCheck;
  }

  console.log('Admin check passed, user:', adminCheck.email);

  try {
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    const { name, displayNames, type = 'images' } = body;

    if (!name || !displayNames) {
      console.error('Missing name or displayNames');
      return NextResponse.json(
        { error: 'Name and displayNames are required' },
        { status: 400 }
      );
    }

    console.log('Theme name:', name);
    console.log('Theme type:', type);
    console.log('Display names:', displayNames);

    // Validate displayNames has all required languages
    const requiredLanguages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'no', 'da', 'fi'];
    const missingLanguages = requiredLanguages.filter(lang => !displayNames[lang]);
    if (missingLanguages.length > 0) {
      console.error('Missing translations for theme:', missingLanguages);
      return NextResponse.json(
        { error: `Missing translations for: ${missingLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('All translations present');

    // Get max sortOrder
    const maxSortOrder = await prisma.imageTheme.findFirst({
      where: { type },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });

    console.log('Creating theme in database...');

    const theme = await prisma.imageTheme.create({
      data: {
        name,
        displayNames,
        type,
        sortOrder: (maxSortOrder?.sortOrder || 0) + 1,
      },
      include: {
        images: true,
      },
    });

    console.log('Theme created successfully:', theme.id);

    return NextResponse.json({ theme }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error('Failed to create theme - FULL ERROR:', error);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    return NextResponse.json(
      { error: `Failed to create theme: ${err.message}` },
      { status: 500 }
    );
  }
}
