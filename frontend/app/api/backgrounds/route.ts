import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';
  
  try {
    const backgrounds = imageLibraryManager.getBackgrounds(theme || undefined);
    
    // Add localized names
    const localizedBackgrounds = backgrounds.map(bg => {
      let displayName = bg.name;
      
      // Use translations if available
      if (bg.translations?.[locale]) {
        displayName = bg.translations[locale];
      } else if (bg.translations?.['en']) {
        displayName = bg.translations['en'];
      }
      
      return {
        ...bg,
        name: displayName,
        originalName: bg.name
      };
    });
    
    return NextResponse.json(localizedBackgrounds);
  } catch (error) {
    console.error('Error fetching backgrounds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backgrounds' },
      { status: 500 }
    );
  }
}
