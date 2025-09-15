import { NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Wait for ImageLibraryManager to initialize
    await imageLibraryManager.waitForInit();

    // Get background themes from Directus via ImageLibraryManager
    const backgroundThemes = imageLibraryManager.getBackgroundThemes(locale);

    // Return translated names
    const themes = backgroundThemes.map(theme => ({
      value: theme.name,
      displayName: theme.displayName || theme.name
    }));

    return NextResponse.json(themes, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching background themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch background themes' },
      { status: 500 }
    );
  }
}