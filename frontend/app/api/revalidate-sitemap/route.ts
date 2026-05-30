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

    // Default paths to revalidate: the sitemap index + the 4 real shards.
    // (Shards 4-7 and the image/video sitemaps were retired in the pivot; only
    // 0-3 exist today per §17.10.1. SEO remediation 2026-05-30 pruned the
    // phantom paths — revalidatePath on a non-existent path was a silent no-op.)
    const defaultPaths = [
      '/sitemap.xml',
      '/sitemap/0.xml',
      '/sitemap/1.xml',
      '/sitemap/2.xml',
      '/sitemap/3.xml',
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
    // Revalidate the 4 real shards (0-3). Shards 4-7 + image/video sitemaps
    // were retired in the pivot (§17.10.1).
    for (let i = 0; i <= 3; i++) {
      revalidatePath(`/sitemap/${i}.xml`);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: Date.now(),
      message: 'Sitemap cache cleared via GET request (index + shards 0-3).'
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
