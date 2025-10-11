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

// POST /api/admin/train-templates/upload - Upload new train template image(s)
async function postHandler(request: NextRequest, userId: string) {
  console.log(`[TRAIN TEMPLATE UPLOAD] Upload request received from user: ${userId}`);

  try {
    const formData = await request.formData();
    const themeId = formData.get('themeId') as string;
    const files = formData.getAll('files') as File[];
    const translationsJson = formData.get('translations') as string;

    console.log(`[TRAIN TEMPLATE UPLOAD] Request parameters - themeId: ${themeId}, files count: ${files.length}`);

    if (!themeId) {
      console.warn('[TRAIN TEMPLATE UPLOAD] Missing themeId parameter');
      return NextResponse.json(
        { error: 'themeId is required' },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      console.warn('[TRAIN TEMPLATE UPLOAD] No files provided');
      return NextResponse.json(
        { error: 'At least one file is required' },
        { status: 400 }
      );
    }

    // Log file details
    files.forEach((file, index) => {
      console.log(`[TRAIN TEMPLATE UPLOAD] File ${index + 1}: ${file.name} (${file.size} bytes, ${file.type})`);
    });

    // Verify theme exists (themeId is actually the theme name)
    console.log(`[TRAIN TEMPLATE UPLOAD] Looking up theme with name: ${themeId}, type: train`);
    const theme = await prisma.imageTheme.findFirst({
      where: {
        name: themeId,
        type: 'train'
      },
    });

    if (!theme) {
      console.error(`[TRAIN TEMPLATE UPLOAD] Theme '${themeId}' not found in database`);
      return NextResponse.json(
        { error: `Theme '${themeId}' not found. Please create the theme first before adding images.` },
        { status: 404 }
      );
    }

    console.log(`[TRAIN TEMPLATE UPLOAD] Found theme: ${theme.name} (ID: ${theme.id}, type: ${theme.type})`);

    // Parse translations (if provided)
    let translations: any = {};
    if (translationsJson) {
      try {
        translations = JSON.parse(translationsJson);
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid translations JSON' },
          { status: 400 }
        );
      }
    }

    // Process each file
    const uploadedImages = [];
    const errors = [];

    // Get max sortOrder for this theme (using database ID, not name)
    const maxSortOrder = await prisma.imageLibraryItem.findFirst({
      where: { themeId: theme.id },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });
    let currentSortOrder = (maxSortOrder?.sortOrder || 0) + 1;

    for (const file of files) {
      try {
        console.log(`[TRAIN TEMPLATE UPLOAD] Starting upload for file: ${file.name} (size: ${file.size}, type: ${file.type})`);

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
          console.warn(`[TRAIN TEMPLATE UPLOAD] Validation failed for ${file.name}: ${validation.error}`);
          errors.push({ filename: file.name, error: validation.error });
          continue;
        }
        console.log(`[TRAIN TEMPLATE UPLOAD] Validation passed for ${file.name}`);

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.log(`[TRAIN TEMPLATE UPLOAD] Converted ${file.name} to buffer (${buffer.length} bytes)`);

        // Optimize image (resize, convert to WebP if needed)
        const optimized = await optimizeImage(buffer, file.type);
        console.log(`[TRAIN TEMPLATE UPLOAD] Optimized ${file.name}: ${optimized.width}x${optimized.height}, type: ${optimized.mimeType}, size: ${optimized.buffer.length}`);

        // Generate unique filename with correct extension based on optimized mime type
        const originalExt = path.extname(file.name);
        const nameWithoutExt = path.basename(file.name, originalExt);
        const newExt = optimized.mimeType === 'image/webp' ? '.webp' : originalExt;
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const uniqueFilename = `${nameWithoutExt}-${timestamp}-${random}${newExt}`;
        console.log(`[TRAIN TEMPLATE UPLOAD] Generated unique filename: ${uniqueFilename}`);

        // Save file to disk
        const publicPath = await saveFile(
          optimized.buffer,
          uniqueFilename,
          'trainTemplates',
          theme.name
        );
        console.log(`[TRAIN TEMPLATE UPLOAD] Saved file to: ${publicPath}`);

        // Get file-specific translations or use empty object
        const fileTranslations = translations[file.name] || {};
        console.log(`[TRAIN TEMPLATE UPLOAD] File translations:`, fileTranslations);

        // Create database record (using database ID, not name)
        const image = await prisma.imageLibraryItem.create({
          data: {
            themeId: theme.id,
            filename: uniqueFilename,
            filePath: publicPath,
            fileSize: optimized.buffer.length,
            mimeType: optimized.mimeType,
            width: optimized.width,
            height: optimized.height,
            translations: fileTranslations,
            sortOrder: currentSortOrder++,
          },
        });
        console.log(`[TRAIN TEMPLATE UPLOAD] Created database record for ${file.name} with ID: ${image.id}`);

        uploadedImages.push(image);
      } catch (error) {
        console.error(`[TRAIN TEMPLATE UPLOAD ERROR] Failed to upload ${file.name}:`, error);
        console.error(`[TRAIN TEMPLATE UPLOAD ERROR] Error stack:`, error instanceof Error ? error.stack : 'No stack trace');
        errors.push({
          filename: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log(`[TRAIN TEMPLATE UPLOAD] Upload complete - Success: ${uploadedImages.length}/${files.length}, Errors: ${errors.length}`);

    return NextResponse.json({
      message: `Successfully uploaded ${uploadedImages.length} of ${files.length} files`,
      images: uploadedImages,
      errors: errors.length > 0 ? errors : undefined,
    }, { status: 201 });
  } catch (error) {
    console.error('[TRAIN TEMPLATE UPLOAD ERROR] Top-level upload error:', error);
    console.error('[TRAIN TEMPLATE UPLOAD ERROR] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      {
        error: 'Failed to upload images',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Export handler with admin authentication
export const POST = async (request: NextRequest) => withAdmin(request, postHandler);
