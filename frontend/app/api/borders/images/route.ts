import { NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');

  if (!theme) {
    return NextResponse.json({ error: 'A valid border theme is required' }, { status: 400 });
  }

  try {
    // Wait for ImageLibraryManager to initialize
    await imageLibraryManager.waitForInit();

    // Get borders from Directus via ImageLibraryManager
    const borders = imageLibraryManager.getBorders(theme);

    console.log(`Fetching borders for theme: ${theme}, count: ${borders.length}`);

    // Format response to match expected structure - NO FALLBACK
    const images = borders.map(border => {
      // Only return borders that have a valid Directus path
      if (!border.path && !border.url) {
        console.log(`Skipping border ${border.fileName} - no Directus file`);
        return null;
      }
      return {
        name: border.name || border.fileName,
        path: border.path || border.url
      };
    }).filter(Boolean); // Remove null entries

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error('Error fetching border images:', err);
    return NextResponse.json(
      { error: 'Failed to fetch border images' },
      { status: 500 }
    );
  }
}