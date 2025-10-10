import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const API_TOKEN = 'static-api-token-for-sync';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '100');
  
  try {
    // Search across all themes
    if (search && (!theme || theme === 'all')) {
      const response = await fetch(
        `${DIRECTUS_URL}/items/image_assets?` + new URLSearchParams({
          'fields': '*,image_file.*,theme_id.*',
          'filter[translations][_contains]': search,
          'filter[status][_eq]': 'active',
          'limit': limit.toString(),
          'page': page.toString()
        }),
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Directus API error: ${response.status}`);
      }

      const data = await response.json();
      
      const images = data.data.map((item: any) => ({
        path: item.image_file ? `/assets/${item.image_file.id}` : `/images/${item.theme_id?.folder_name || 'animals'}/${item.file_name}.png`,
        url: item.image_file ? `${DIRECTUS_URL}/assets/${item.image_file.id}` : `/images/${item.theme_id?.folder_name || 'animals'}/${item.file_name}.png`,
        name: item.translations?.[locale] || item.file_name,
        word: item.translations?.[locale] || item.file_name,
        theme: item.theme_id?.folder_name || 'unknown'
      }));

      return NextResponse.json({
        images,
        pagination: {
          page,
          limit,
          total: data.meta?.total_count || images.length,
          totalPages: Math.ceil((data.meta?.total_count || images.length) / limit),
          hasMore: page * limit < (data.meta?.total_count || images.length)
        }
      });
    }

    // Get specific theme
    if (theme && theme !== 'all') {
      // First get the theme ID
      const themeResponse = await fetch(
        `${DIRECTUS_URL}/items/image_themes?` + new URLSearchParams({
          'filter[folder_name][_eq]': theme,
          'limit': '1'
        }),
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (!themeResponse.ok) {
        throw new Error(`Failed to fetch theme: ${theme}`);
      }

      const themeData = await themeResponse.json();
      
      if (!themeData.data || themeData.data.length === 0) {
        // Theme not found, return empty
        return NextResponse.json({
          images: [],
          pagination: {
            page: 1,
            limit,
            total: 0,
            totalPages: 0,
            hasMore: false
          }
        });
      }

      const themeId = themeData.data[0].id;

      // Now get images for this theme
      const response = await fetch(
        `${DIRECTUS_URL}/items/image_assets?` + new URLSearchParams({
          'fields': '*,image_file.*',
          'filter[theme_id][_eq]': themeId.toString(),
          'filter[status][_eq]': 'active',
          'limit': limit.toString(),
          'page': page.toString(),
          'sort': 'file_name'
        }),
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Directus API error: ${response.status}`);
      }

      const data = await response.json();
      
      const images = data.data.map((item: any) => ({
        path: item.image_file ? `/assets/${item.image_file.id}` : `/images/${theme}/${item.file_name}.png`,
        url: item.image_file ? `${DIRECTUS_URL}/assets/${item.image_file.id}` : `/images/${theme}/${item.file_name}.png`,
        name: item.translations?.[locale] || item.file_name,
        word: item.translations?.[locale] || item.file_name
      }));

      return NextResponse.json({
        images,
        pagination: {
          page,
          limit,
          total: data.meta?.total_count || images.length,
          totalPages: Math.ceil((data.meta?.total_count || images.length) / limit),
          hasMore: page * limit < (data.meta?.total_count || images.length)
        }
      });
    }

    // Default: return animals theme
    return GET(new Request(request.url.replace('theme=all', 'theme=animals')));
    
  } catch (error) {
    console.error('Error fetching images from Directus:', error);
    
    // Fallback to empty response instead of error
    return NextResponse.json({
      images: [],
      pagination: {
        page: 1,
        limit,
        total: 0,
        totalPages: 0,
        hasMore: false
      },
      error: error instanceof Error ? error.message : 'Failed to fetch images'
    });
  }
}