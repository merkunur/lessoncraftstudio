import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Sitemap Revalidation Endpoint
 *
 * Triggers cache revalidation for sitemaps after content manager uploads.
 * This ensures that SEO metadata changes are reflected immediately in sitemaps
 * without waiting for the 30-minute ISR cache to expire.
 *
 * Usage: POST /api/revalidate-sitemap
 * Body: { paths?: string[] } - Optional array of specific paths to revalidate
 *
 * Called automatically by the content manager after successful sample uploads.
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body for optional path list
    let paths: string[] = [];
    try {
      const body = await request.json();
      paths = body.paths || [];
    } catch {
      // Empty body is fine - will revalidate default paths
    }

    // Default paths to revalidate (all split sitemaps 0-7 + image + video sitemaps)
    const defaultPaths = [
      '/sitemap.xml',
      '/sitemap/0.xml',
      '/sitemap/1.xml',
      '/sitemap/2.xml',
      '/sitemap/3.xml',
      '/sitemap/4.xml',
      '/sitemap/5.xml',
      '/sitemap/6.xml',
      '/sitemap/7.xml',
      '/image-sitemap-index.xml',
      '/image-sitemap/1',
      '/image-sitemap/3',
      '/image-sitemap/4',
      '/image-sitemap/5',
      '/image-sitemap/6',
      '/image-sitemap/7',
      '/video-sitemap-index.xml',
      '/video-sitemap/1',
      '/video-sitemap/3',
      '/video-sitemap/4',
      '/video-sitemap/5',
      '/video-sitemap/6',
      '/video-sitemap/7',
    ];

    // Combine with any custom paths
    const pathsToRevalidate = paths.length > 0 ? paths : defaultPaths;

    // Revalidate each path
    const results: { path: string; status: string }[] = [];
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        results.push({ path, status: 'revalidated' });
      } catch (error) {
        results.push({ path, status: `failed: ${error}` });
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: Date.now(),
      paths: results,
      message: 'Sitemap cache cleared. Next request will generate fresh content.'
    });

  } catch (error) {
    console.error('Sitemap revalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}

// Also support GET for easy testing via browser
export async function GET(): Promise<NextResponse> {
  try {
    revalidatePath('/sitemap.xml');
    // Revalidate all split sitemaps (0-7)
    for (let i = 0; i <= 7; i++) {
      revalidatePath(`/sitemap/${i}.xml`);
    }
    // Revalidate image sitemaps
    revalidatePath('/image-sitemap-index.xml');
    for (const id of [1, 3, 4, 5, 6, 7]) {
      revalidatePath(`/image-sitemap/${id}`);
    }
    // Revalidate video sitemaps
    revalidatePath('/video-sitemap-index.xml');
    for (const id of [1, 3, 4, 5, 6, 7]) {
      revalidatePath(`/video-sitemap/${id}`);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: Date.now(),
      message: 'Sitemap cache cleared via GET request (all split + image + video sitemaps).'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
