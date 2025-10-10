import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
  try {
    // Get all background themes from the manager
    const themes = imageLibraryManager.getBackgroundThemes(locale);
    
    return NextResponse.json(themes);
  } catch (error) {
    console.error('Error fetching background themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch background themes' },
      { status: 500 }
    );
  }
}
