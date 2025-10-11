export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/auth-middleware';
import {
  validateImageFile,
  optimizeImage,
  saveFile,
  initializeStorage,
} from '@/lib/upload';

// Initialize storage directories on module load
initializeStorage();

// POST /api/admin/worksheet-samples/upload - Upload sample image
async function postHandler(request: NextRequest, userId: string) {
  console.log(`[WORKSHEET SAMPLE UPLOAD] Upload request received from user: ${userId}`);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const appName = formData.get('appName') as string;

    console.log(`[WORKSHEET SAMPLE UPLOAD] Request parameters - appName: ${appName}, file: ${file?.name}`);

    if (!appName) {
      return NextResponse.json(
        { error: 'appName is required' },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    console.log(`[WORKSHEET SAMPLE UPLOAD] File: ${file.name} (${file.size} bytes, ${file.type})`);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      console.warn(`[WORKSHEET SAMPLE UPLOAD] Validation failed: ${validation.error}`);
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`[WORKSHEET SAMPLE UPLOAD] Converted to buffer (${buffer.length} bytes)`);

    // Optimize image (resize, convert to WebP if needed)
    const optimized = await optimizeImage(buffer, file.type);
    console.log(`[WORKSHEET SAMPLE UPLOAD] Optimized: ${optimized.width}x${optimized.height}, type: ${optimized.mimeType}, size: ${optimized.buffer.length}`);

    // Generate unique filename
    const originalExt = path.extname(file.name);
    const nameWithoutExt = path.basename(file.name, originalExt);
    const newExt = optimized.mimeType === 'image/webp' ? '.webp' : originalExt;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const uniqueFilename = `${nameWithoutExt}-${timestamp}-${random}${newExt}`;
    console.log(`[WORKSHEET SAMPLE UPLOAD] Generated unique filename: ${uniqueFilename}`);

    // Save file to disk in /worksheet-samples/ directory
    const publicPath = await saveFile(
      optimized.buffer,
      uniqueFilename,
      'worksheetSamples',
      '' // No subdirectory needed
    );
    console.log(`[WORKSHEET SAMPLE UPLOAD] Saved file to: ${publicPath}`);

    return NextResponse.json({
      message: 'Successfully uploaded worksheet sample image',
      filename: uniqueFilename,
      path: publicPath,
      width: optimized.width,
      height: optimized.height,
      mimeType: optimized.mimeType,
      fileSize: optimized.buffer.length,
    }, { status: 201 });
  } catch (error) {
    console.error('[WORKSHEET SAMPLE UPLOAD ERROR]:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload worksheet sample image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Export handler with admin authentication
export const POST = async (request: NextRequest) => withAdmin(request, postHandler);
