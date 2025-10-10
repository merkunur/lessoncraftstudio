import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const style = searchParams.get('style');
  const locale = searchParams.get('locale') || 'en';
  
  try {
    const borders = imageLibraryManager.getBorders(style || undefined);
    
    // Add localized names
    const localizedBorders = borders.map(border => {
      let displayName = border.name;
      
      // Use translations if available
      if (border.translations?.[locale]) {
        displayName = border.translations[locale];
      } else if (border.translations?.['en']) {
        displayName = border.translations['en'];
      }
      
      return {
        ...border,
        name: displayName,
        originalName: border.name
      };
    });
    
    return NextResponse.json(localizedBorders);
  } catch (error) {
    console.error('Error fetching borders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch borders' },
      { status: 500 }
    );
  }
}
