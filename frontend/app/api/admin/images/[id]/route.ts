import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { unlink } from 'fs/promises';

export const dynamic = 'force-dynamic';

// GET /api/admin/images/:id - Get single image
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const image = await prisma.imageLibraryItem.findUnique({
      where: { id: params.id },
      include: { theme: true },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error('Failed to fetch image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/images/:id - Update image metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const body = await request.json();
    const { filename, translations, sortOrder, themeId } = body;

    const updateData: any = {};
    if (filename !== undefined) updateData.filename = filename;
    if (translations !== undefined) updateData.translations = translations;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (themeId !== undefined) updateData.themeId = themeId;

    const image = await prisma.imageLibraryItem.update({
      where: { id: params.id },
      data: updateData,
      include: { theme: true },
    });

    return NextResponse.json({ image });
  } catch (error) {
    console.error('Failed to update image:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/images/:id - Delete image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const image = await prisma.imageLibraryItem.findUnique({
      where: { id: params.id },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Delete file from disk
    try {
      await unlink(image.filePath);
    } catch (error) {
      console.warn('Failed to delete file from disk:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await prisma.imageLibraryItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Failed to delete image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
