import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import {

export const dynamic = 'force-dynamic';
  validateImageFile,
  generateUniqueFilename,
  optimizeImage,
  saveFile,
  initializeStorage,
} from '@/lib/upload';
import fs from 'fs';
import path from 'path';

// Initialize storage directories on module load
initializeStorage();

// POST /api/admin/train-templates/upload - Upload new train template image(s)
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

    // Read current metadata
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'train-templates-metadata.json');
    let metadata: any = { themes: [], lastUpdated: '', version: '1.0.0' };

    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    }

    // Find theme
    let theme = metadata.themes.find((t: any) => t.id === themeId || t.name === themeId);

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

    // Ensure theme has images array
    if (!theme.images) {
      theme.images = [];
    }

    // Get max sortOrder for this theme
    const maxSortOrder = theme.images.length > 0
      ? Math.max(...theme.images.map((img: any) => img.sortOrder || 0))
      : 0;
    let currentSortOrder = maxSortOrder + 1;

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

        // Save file to train templates directory
        const publicPath = await saveFile(
          optimized.buffer,
          uniqueFilename,
          'trainTemplates',
          theme.id
        );

        // Get file-specific translations or use empty object
        const fileTranslations = translations[file.name] || {};

        // Create image record
        const image = {
          filename: uniqueFilename,
          path: publicPath,
          displayName: fileTranslations.en || file.name,
          translations: fileTranslations,
          fileSize: optimized.buffer.length,
          mimeType: optimized.mimeType,
          width: optimized.width,
          height: optimized.height,
          sortOrder: currentSortOrder++,
        };

        theme.images.push(image);
        uploadedImages.push(image);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        errors.push({
          filename: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Save updated metadata
    metadata.lastUpdated = new Date().toISOString();
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

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

