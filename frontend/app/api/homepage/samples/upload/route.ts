export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { withAdmin } from '@/lib/auth-middleware';
import {
  validateImageFile,
  optimizeImage,
  saveFile,
  initializeStorage,
} from '@/lib/upload';

// Initialize storage directories on module load
initializeStorage();

// POST /api/homepage/samples/upload - Upload sample image for homepage
async function postHandler(request: NextRequest, userId: string) {
  console.log(`[HOMEPAGE SAMPLE UPLOAD] Upload request received from user: ${userId}`);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log(`[HOMEPAGE SAMPLE UPLOAD] File: ${file?.name}`);

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    console.log(`[HOMEPAGE SAMPLE UPLOAD] File: ${file.name} (${file.size} bytes, ${file.type})`);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      console.warn(`[HOMEPAGE SAMPLE UPLOAD] Validation failed: ${validation.error}`);
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`[HOMEPAGE SAMPLE UPLOAD] Converted to buffer (${buffer.length} bytes)`);

    // Optimize image (resize, convert to WebP if needed)
    const optimized = await optimizeImage(buffer, file.type);
    console.log(`[HOMEPAGE SAMPLE UPLOAD] Optimized: ${optimized.width}x${optimized.height}, type: ${optimized.mimeType}, size: ${optimized.buffer.length}`);

    // Generate unique filename
    const originalExt = path.extname(file.name);
    const nameWithoutExt = path.basename(file.name, originalExt);
    const newExt = optimized.mimeType === 'image/webp' ? '.webp' : originalExt;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const uniqueFilename = `${nameWithoutExt}-${timestamp}-${random}${newExt}`;
    console.log(`[HOMEPAGE SAMPLE UPLOAD] Generated unique filename: ${uniqueFilename}`);

    // Save file to disk in /worksheet-samples/ directory
    const publicPath = await saveFile(
      optimized.buffer,
      uniqueFilename,
      'worksheetSamples',
      '' // No subdirectory needed
    );
    console.log(`[HOMEPAGE SAMPLE UPLOAD] Saved file to: ${publicPath}`);

    return NextResponse.json({
      message: 'Successfully uploaded homepage sample image',
      filename: uniqueFilename,
      path: publicPath,
      width: optimized.width,
      height: optimized.height,
      mimeType: optimized.mimeType,
      fileSize: optimized.buffer.length,
    }, { status: 201 });
  } catch (error) {
    console.error('[HOMEPAGE SAMPLE UPLOAD ERROR]:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload homepage sample image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Export handler with admin authentication
export const POST = async (request: NextRequest) => withAdmin(request, postHandler);
