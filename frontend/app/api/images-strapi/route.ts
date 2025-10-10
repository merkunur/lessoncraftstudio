import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get images from Strapi with translations
 * Supports both theme-based and search queries
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '50';
  
  try {
    let url: string;
    let cacheKey: string;
    
    if (search) {
      // Search across all themes
      url = `${STRAPI_URL}/api/image-themes/search?q=${encodeURIComponent(search)}&locale=${locale}&page=${page}&pageSize=${pageSize}`;
      cacheKey = `search-${search}-${locale}-${page}`;
    } else if (theme) {
      // Get images for specific theme
      url = `${STRAPI_URL}/api/image-themes/folder/${encodeURIComponent(theme)}?locale=${locale}&page=${page}&pageSize=${pageSize}`;
      cacheKey = `theme-${theme}-${locale}-${page}`;
    } else {
      return NextResponse.json(
        { error: 'Either theme or search parameter is required' },
        { status: 400 }
      );
    }
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      const res = NextResponse.json(cached.data);
      res.headers.set('Cache-Control', 'public, max-age=300');
      return res;
    }
    
    // Fetch from Strapi
    const response = await fetch(url, {
      headers: STRAPI_API_TOKEN ? {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      } : {},
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error(`Strapi returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format response for backward compatibility
    let formattedData;
    if (search) {
      // Search returns results array
      formattedData = data.results || [];
    } else {
      // Theme query returns images array
      formattedData = data.images || [];
    }
    
    // Cache the result
    cache.set(cacheKey, { data: formattedData, timestamp: Date.now() });
    
    // Return with cache headers
    const res = NextResponse.json(formattedData);
    res.headers.set('Cache-Control', 'public, max-age=300');
    
    return res;
  } catch (error) {
    console.error('Error fetching from Strapi, falling back to filesystem:', error);
    
    // Fall back to existing filesystem API
    try {
      let fallbackUrl = `${request.nextUrl.origin}/api/images?locale=${locale}`;
      
      if (search) {
        fallbackUrl += `&search=${encodeURIComponent(search)}`;
      } else if (theme) {
        fallbackUrl += `&theme=${encodeURIComponent(theme)}`;
      }
      
      const fallbackResponse = await fetch(fallbackUrl);
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        return NextResponse.json(fallbackData);
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}