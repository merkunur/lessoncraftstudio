import { NextRequest, NextResponse } from 'next/server';
import ImageLibraryService from '@/lib/image-library-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme');
    const locale = searchParams.get('locale') || 'en';
    
    if (!theme) {
      return NextResponse.json({ error: 'Theme parameter is required' }, { status: 400 });
    }
    
    const images = await ImageLibraryService.getThemeImages(theme, locale);
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}