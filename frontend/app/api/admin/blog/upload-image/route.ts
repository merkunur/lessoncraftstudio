import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import {

export const dynamic = 'force-dynamic';
  validateImageFile,
  generateUniqueFilename,
  saveFile,
} from '@/lib/upload';

// POST /api/admin/blog/upload-image - Upload blog featured image
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

    // Save image
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageFilename = generateUniqueFilename(imageFile.name);
    const imagePath = await saveFile(imageBuffer, imageFilename, 'blog', type);

    return NextResponse.json({
      path: imagePath,
      filename: imageFilename,
    });
  } catch (error) {
    console.error('Failed to upload image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
