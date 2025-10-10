import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
  try {
    // Get all border styles from the manager
    const styles = imageLibraryManager.getBorderStyles(locale);
    
    return NextResponse.json(styles);
  } catch (error) {
    console.error('Error fetching border styles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch border styles' },
      { status: 500 }
    );
  }
}
