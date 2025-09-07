import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get themes from Strapi with translations
 * Falls back to filesystem API if Strapi is unavailable
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const nested = searchParams.get('nested') === 'true';
  
  // Check cache
  const cacheKey = `themes-${locale}-${nested}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    // Fetch from Strapi
    const response = await fetch(
      `${STRAPI_URL}/api/image-themes/translated?locale=${locale}&nested=${nested}`,
      {
        headers: STRAPI_API_TOKEN ? {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        } : {},
        next: { revalidate: 300 } // Next.js cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi returned ${response.status}`);
    }

    const themes = await response.json();
    
    // Cache the result
    cache.set(cacheKey, { data: themes, timestamp: Date.now() });
    
    // Set cache headers
    const res = NextResponse.json(themes);
    res.headers.set('Cache-Control', 'public, max-age=300');
    
    return res;
  } catch (error) {
    console.error('Error fetching from Strapi, falling back to filesystem:', error);
    
    // Fall back to existing filesystem API
    try {
      const fallbackResponse = await fetch(
        `${request.nextUrl.origin}/api/themes-translated?locale=${locale}`
      );
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        return NextResponse.json(fallbackData);
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}