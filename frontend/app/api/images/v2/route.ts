import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://lcs-directus:8055';
const API_TOKEN = 'static-api-token-for-sync';

interface PaginationMeta {
  total_count: number;
  filter_count: number;
  page: number;
  per_page: number;
  page_count: number;
}

interface PaginationLinks {
  first: string;
  prev: string | null;
  next: string | null;
  last: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  const tags = searchParams.get('tags');
  const app = searchParams.get('app');
  const sort = searchParams.get('sort') || 'sort_order';
  const order = searchParams.get('order') || 'asc';

  // Validate pagination parameters
  const validatedPage = Math.max(1, page);
  const validatedLimit = Math.min(100, Math.max(1, limit)); // Max 100 items per page

  try {
    // Build Directus filter object
    const filter: any = {
      status: { _eq: 'active' }
    };

    // Add theme filter
    if (theme && theme !== 'all') {
      // First, get the theme ID from theme name
      const themeResponse = await fetch(
        `${DIRECTUS_URL}/items/image_themes?filter[folder_name][_eq]=${theme}`,
        {
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        }
      );

      if (themeResponse.ok) {
        const themeData = await themeResponse.json();
        if (themeData.data && themeData.data.length > 0) {
          filter.theme_id = { _eq: themeData.data[0].id };
        }
      }
    }

    // Add search filter (searches in translations)
    if (search) {
      filter._or = [
        { file_name: { _icontains: search } },
        { [`translations:${locale}`]: { _icontains: search } }
      ];
    }

    // Add tags filter
    if (tags) {
      const tagArray = tags.split(',');
      filter.tags = { _in: tagArray };
    }

    // Add app-specific filter
    if (app) {
      filter.app_specific = { _contains: app };
    }

    // Calculate offset for pagination
    const offset = (validatedPage - 1) * validatedLimit;

    // Build query string for Directus
    const queryParams = new URLSearchParams({
      'fields': '*,theme_id.*,image_file.*',
      'filter': JSON.stringify(filter),
      'limit': validatedLimit.toString(),
      'offset': offset.toString(),
      'sort': order === 'desc' ? `-${sort}` : sort,
      'meta': 'total_count,filter_count'
    });

    // Fetch from Directus
    const response = await fetch(
      `${DIRECTUS_URL}/items/image_assets?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status}`);
    }

    const result = await response.json();

    // Transform data for frontend consumption
    const transformedData = (result.data || []).map((item: any) => {
      const imageId = item.image_file?.id || item.image_file;
      return {
        id: item.id,
        name: item.translations?.[locale] || item.file_name,
        file_name: item.file_name,
        path: imageId ? `/api/directus-image?id=${imageId}` : null,
        thumbnail: imageId ? `/api/directus-image?id=${imageId}&width=150&height=150` : null,
        theme: item.theme_id?.folder_name || null,
        theme_display: item.theme_id?.translations?.[locale] || item.theme_id?.folder_name || null,
        translations: item.translations || {},
        tags: item.tags || [],
        app_specific: item.app_specific || [],
        sort_order: item.sort_order || 0
      };
    });

    // Calculate pagination metadata
    const totalCount = result.meta?.total_count || 0;
    const pageCount = Math.ceil(totalCount / validatedLimit);

    const meta: PaginationMeta = {
      total_count: totalCount,
      filter_count: result.meta?.filter_count || totalCount,
      page: validatedPage,
      per_page: validatedLimit,
      page_count: pageCount
    };

    // Generate pagination links
    const baseUrl = request.url.split('?')[0];
    const buildLink = (p: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', p.toString());
      params.set('limit', validatedLimit.toString());
      return `${baseUrl}?${params.toString()}`;
    };

    const links: PaginationLinks = {
      first: buildLink(1),
      prev: validatedPage > 1 ? buildLink(validatedPage - 1) : null,
      next: validatedPage < pageCount ? buildLink(validatedPage + 1) : null,
      last: buildLink(pageCount)
    };

    // Return paginated response
    return NextResponse.json({
      data: transformedData,
      meta,
      links
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error('Error fetching images from Directus:', error);

    return NextResponse.json({
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch images',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    }, { status: 500 });
  }
}

// Batch endpoint for fetching multiple images by ID
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({
        error: {
          code: 'INVALID_REQUEST',
          message: 'IDs array is required',
          timestamp: new Date().toISOString(),
          requestId: crypto.randomUUID()
        }
      }, { status: 400 });
    }

    // Limit batch size to prevent abuse
    const limitedIds = ids.slice(0, 100);

    // Build filter for multiple IDs
    const filter = {
      id: { _in: limitedIds },
      status: { _eq: 'active' }
    };

    const queryParams = new URLSearchParams({
      'fields': '*,theme_id.*,image_file.*',
      'filter': JSON.stringify(filter),
      'limit': '100'
    });

    const response = await fetch(
      `${DIRECTUS_URL}/items/image_assets?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status}`);
    }

    const result = await response.json();
    const locale = request.headers.get('Accept-Language')?.split(',')[0] || 'en';

    // Transform and index by ID for easy lookup
    const dataMap: Record<string, any> = {};
    (result.data || []).forEach((item: any) => {
      const imageId = item.image_file?.id || item.image_file;
      dataMap[item.id] = {
        id: item.id,
        name: item.translations?.[locale] || item.file_name,
        file_name: item.file_name,
        path: imageId ? `/api/directus-image?id=${imageId}` : null,
        thumbnail: imageId ? `/api/directus-image?id=${imageId}&width=150&height=150` : null,
        theme: item.theme_id?.folder_name || null,
        translations: item.translations || {},
        tags: item.tags || [],
        app_specific: item.app_specific || []
      };
    });

    // Return in the same order as requested
    const orderedData = limitedIds.map(id => dataMap[id]).filter(Boolean);

    return NextResponse.json({
      data: orderedData,
      meta: {
        requested: limitedIds.length,
        returned: orderedData.length
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error in batch fetch:', error);

    return NextResponse.json({
      error: {
        code: 'BATCH_FETCH_ERROR',
        message: 'Failed to fetch batch images',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    }, { status: 500 });
  }
}