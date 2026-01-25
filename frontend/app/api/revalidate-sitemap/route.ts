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

    // Default paths to revalidate
    const defaultPaths = [
      '/sitemap-images.xml',
      '/sitemap.xml',
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
    revalidatePath('/sitemap-images.xml');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: Date.now(),
      message: 'Sitemap cache cleared via GET request.'
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
