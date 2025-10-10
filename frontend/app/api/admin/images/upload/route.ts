export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import {
  validateImageFile,
  generateUniqueFilename,
  optimizeImage,
  saveFile,
  initializeStorage,
} from '@/lib/upload';

// Initialize storage directories on module load
initializeStorage();

// POST /api/admin/images/upload - Upload new image(s)
export async function POST(request: NextRequest) {
  // Allow development mode without authentication
  let adminUser;
  if (process.env.NODE_ENV === 'development') {
    adminUser = {
      id: 'dev-admin',
      email: 'dev@localhost',
      isAdmin: true,
      firstName: 'Dev',
      lastName: 'Admin'
    };
  } else {
    const adminCheck = await requireAdmin(request);
    if (adminCheck instanceof NextResponse) {
      return adminCheck;
    }
    adminUser = adminCheck;
  }

  try {
    const formData = await request.formData();
    const themeId = formData.get('themeId') as string;
    const files = formData.getAll('files') as File[];
    const translationsJson = formData.get('translations') as string;

    if (!themeId) {
      return NextResponse.json(
        { error: 'themeId is required' },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'At least one file is required' },
        { status: 400 }
      );
    }

    // Verify theme exists (themeId is actually the theme name)
    const theme = await prisma.imageTheme.findFirst({
      where: {
        name: themeId,
        type: 'images' // Default to images type if not specified
      },
    });

    if (!theme) {
      return NextResponse.json(
        { error: `Theme '${themeId}' not found. Please create the theme first before adding images.` },
        { status: 404 }
      );
    }

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
        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
          errors.push({ filename: file.name, error: validation.error });
          continue;
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Optimize image (resize, convert to WebP if needed)
        const optimized = await optimizeImage(buffer, file.type);

        // Generate unique filename
        const uniqueFilename = generateUniqueFilename(file.name);

        // Determine storage type based on theme type
        const storageType = theme.type === 'borders' ? 'borders'
                          : theme.type === 'backgrounds' ? 'backgrounds'
                          : theme.type === 'train' ? 'trainTemplates'
                          : theme.type === 'worksheet' ? 'worksheetTemplates'
                          : 'images';

        // Save file to disk
        const publicPath = await saveFile(
          optimized.buffer,
          uniqueFilename,
          storageType,
          theme.name
        );

        // Get file-specific translations or use empty object
        const fileTranslations = translations[file.name] || {};

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

        uploadedImages.push(image);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        errors.push({
          filename: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      message: `Successfully uploaded ${uploadedImages.length} of ${files.length} files`,
      images: uploadedImages,
      errors: errors.length > 0 ? errors : undefined,
    }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}

