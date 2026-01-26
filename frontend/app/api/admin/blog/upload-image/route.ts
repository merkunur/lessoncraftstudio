export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import {
  validateImageFile,
  generateUniqueFilename,
  saveFile,
  optimizeImage,
} from '@/lib/upload';

// POST /api/admin/blog/upload-image - Upload blog featured image
// Images are saved to ISOLATED STORAGE (/var/www/lcs-media/blog/) to survive deployments
export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const type = formData.get('type') as string || 'featured';

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate image
    const validation = validateImageFile(imageFile);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert to WebP for better performance (smaller files, faster loading)
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const optimized = await optimizeImage(imageBuffer, imageFile.type, 1200, 800);

    // Generate filename with .webp extension
    const baseFilename = generateUniqueFilename(imageFile.name);
    const webpFilename = baseFilename.replace(/\.[^.]+$/, '.webp');

    // Save to isolated storage (survives deployments)
    const imagePath = await saveFile(optimized.buffer, webpFilename, 'blog', type);

    return NextResponse.json({
      path: imagePath,
      filename: webpFilename,
    });
  } catch (error) {
    console.error('Failed to upload image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
