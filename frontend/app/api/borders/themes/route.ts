import { NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Wait for ImageLibraryManager to initialize
    await imageLibraryManager.waitForInit();

    // Get border styles from Directus via ImageLibraryManager
    const borderStyles = imageLibraryManager.getBorderStyles(locale);

    // Return translated names
    const themes = borderStyles.map(style => ({
      value: style.name,
      displayName: style.displayName || style.name
    }));

    return NextResponse.json(themes, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching border themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch border themes' },
      { status: 500 }
    );
  }
}