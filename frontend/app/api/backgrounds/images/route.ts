import { NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');

  if (!theme) {
    return NextResponse.json({ error: 'A valid background theme is required' }, { status: 400 });
  }

  try {
    // Wait for ImageLibraryManager to initialize
    await imageLibraryManager.waitForInit();

    // Get backgrounds from Directus via ImageLibraryManager
    const backgrounds = imageLibraryManager.getBackgrounds(theme);

    console.log(`Fetching backgrounds for theme: ${theme}`, JSON.stringify(backgrounds, null, 2));

    // Format response to match expected structure - NO FALLBACK
    const images = backgrounds.map(bg => {
      // Only return backgrounds that have a valid Directus path
      if (!bg.path && !bg.url) {
        console.log(`Skipping background ${bg.fileName} - no Directus file`);
        return null;
      }
      return {
        name: bg.name || bg.fileName,
        path: bg.path || bg.url
      };
    }).filter(Boolean); // Remove null entries

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error('Error fetching background images:', err);
    return NextResponse.json(
      { error: 'Failed to fetch background images' },
      { status: 500 }
    );
  }
}