// Backward compatibility endpoint for legacy apps
// Returns simple array format without pagination

import { NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';
  
  if (!theme || theme === 'all' || theme.includes('..')) {
    return NextResponse.json([]);
  }
  
  try {
    // Get all images without pagination for backward compatibility
    const images = imageLibraryManager.getThemeImages(theme, locale);
    return NextResponse.json(images || []);
  } catch (error) {
    console.error('Error in compat endpoint:', error);
    return NextResponse.json([]);
  }
}