import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Clear the image library manager cache
    imageLibraryManager.clearCache();

    // Send cache clear signal to clients via timestamp
    const clearTimestamp = Date.now();

    // You could also implement Redis cache clearing here
    // if (redis) {
    //   await redis.flushdb();
    // }

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp: clearTimestamp
    }, {
      headers: {
        // Tell CDN to not cache this response
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        // Send timestamp for client-side cache invalidation
        'X-Cache-Clear': clearTimestamp.toString()
      }
    });
  } catch (error) {
    console.error('Failed to clear cache:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cache'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Get cache status
  const stats = imageLibraryManager.getCacheStats();

  return NextResponse.json({
    cacheSize: stats.size || 0,
    themes: stats.themes || 0,
    images: stats.images || 0,
    lastSync: stats.lastSync || null
  });
}