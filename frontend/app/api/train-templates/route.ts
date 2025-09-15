import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Wait for ImageLibraryManager to initialize
    await imageLibraryManager.waitForInit();

    // Get train templates from image library manager (synced from Directus)
    const templates = imageLibraryManager.getTrainTemplates(locale);

    console.log(`Train templates API - locale=${locale}, count=${templates.length}`);

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching train templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch train templates' },
      { status: 500 }
    );
  }
}