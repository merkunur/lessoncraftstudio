import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

// In-memory cache for thumbnails (persists across requests in same server instance)
const thumbnailCache = new Map<string, { buffer: Uint8Array; contentType: string; timestamp: number }>();
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 500; // Max number of cached thumbnails

/**
 * GET /api/thumbnail
 * Generates and serves resized image thumbnails for fast sidebar loading
 *
 * Query params:
 *   - path: Image path relative to public (e.g., /images/borders/borders_1/image.webp)
 *   - w: Width in pixels (default: 150, max: 400)
 *   - h: Height in pixels (optional, maintains aspect ratio if not provided)
 *   - q: Quality 1-100 (default: 75)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');
    const width = Math.min(parseInt(searchParams.get('w') || '150'), 400);
    const height = searchParams.get('h') ? Math.min(parseInt(searchParams.get('h') || '150'), 400) : undefined;
    const quality = Math.min(Math.max(parseInt(searchParams.get('q') || '75'), 1), 100);

    if (!imagePath) {
      return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    // Security: Validate path doesn't escape public directory
    if (imagePath.includes('..') || !imagePath.startsWith('/images/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // Generate cache key
    const cacheKey = `${imagePath}_${width}_${height || 'auto'}_${quality}`;

    // Check memory cache first
    const cached = thumbnailCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_MAX_AGE) {
      return new Response(cached.buffer, {
        headers: {
          'Content-Type': cached.contentType,
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          'X-Cache': 'HIT',
        },
      });
    }

    // Resolve file path
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, imagePath);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Read and process image with sharp
    const imageBuffer = await fs.readFile(filePath);

    let sharpInstance = sharp(imageBuffer);

    // Resize
    sharpInstance = sharpInstance.resize({
      width,
      height,
      fit: 'inside',
      withoutEnlargement: true,
    });

    // Output as WebP for best compression
    const outputBuffer = await sharpInstance
      .webp({ quality })
      .toBuffer();

    // Cache the result
    if (thumbnailCache.size >= MAX_CACHE_SIZE) {
      // Remove oldest entries
      const entries = Array.from(thumbnailCache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      for (let i = 0; i < 100; i++) {
        thumbnailCache.delete(entries[i][0]);
      }
    }

    // Convert Buffer to Uint8Array for compatibility
    const uint8Array = new Uint8Array(outputBuffer);

    thumbnailCache.set(cacheKey, {
      buffer: uint8Array,
      contentType: 'image/webp',
      timestamp: Date.now(),
    });

    // Return the resized image
    return new Response(uint8Array, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Cache': 'MISS',
        'X-Original-Size': imageBuffer.length.toString(),
        'X-Thumbnail-Size': outputBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Thumbnail generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate thumbnail' },
      { status: 500 }
    );
  }
}
