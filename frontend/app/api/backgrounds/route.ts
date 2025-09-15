import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://lcs-directus:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || 'static-api-token-for-sync';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';

  try {
    // Fetch backgrounds from Directus
    const response = await fetch(`${DIRECTUS_URL}/items/background_images?fields=*,image_file.*,theme_id.*`, {
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Directus: ${response.statusText}`);
    }

    const data = await response.json();
    const backgrounds = data.data || [];

    // Transform Directus data to match expected format
    const transformedBackgrounds = backgrounds.map((bg: any) => {
      const fileName = bg.file_name || bg.image_file?.filename_download || 'background';
      const fileId = bg.image_file?.id || bg.image_file;

      // Create the image URL
      const imageUrl = fileId ? `/api/directus-image?id=${fileId}` : null;

      // Get localized name
      let displayName = fileName;
      if (bg.translations) {
        const translations = typeof bg.translations === 'string'
          ? JSON.parse(bg.translations)
          : bg.translations;

        if (translations[locale]) {
          displayName = translations[locale];
        } else if (translations['en']) {
          displayName = translations['en'];
        }
      }

      return {
        id: bg.id,
        name: displayName,
        path: imageUrl,
        url: imageUrl,
        theme: bg.theme_id?.name || 'general',
        translations: bg.translations || {},
        originalName: fileName
      };
    }).filter((bg: any) => bg.url); // Only include backgrounds with valid URLs

    // Filter by theme if specified
    const filteredBackgrounds = theme
      ? transformedBackgrounds.filter((bg: any) => bg.theme === theme)
      : transformedBackgrounds;

    return NextResponse.json(filteredBackgrounds);
  } catch (error) {
    console.error('Error fetching backgrounds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backgrounds' },
      { status: 500 }
    );
  }
}
