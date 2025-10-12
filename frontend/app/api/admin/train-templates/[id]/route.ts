import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { unlink } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Get the true source directory (not standalone)
function getSourceRoot(): string {
  const cwd = process.cwd();
  if (cwd.endsWith('.next/standalone') || cwd.includes('.next/standalone')) {
    return path.resolve(cwd, '../..');
  }
  return cwd;
}

// GET /api/admin/train-templates/:id - Get single train template
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
    console.error('Failed to fetch train template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch train template' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/train-templates/:id - Update train template metadata
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
    console.error('Failed to update train template:', error);
    return NextResponse.json(
      { error: 'Failed to update train template' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/train-templates/:id - Delete train template
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

    // Delete physical files from both source and standalone
    const sourceRoot = getSourceRoot();
    const filePaths = [
      path.join(sourceRoot, 'public', image.filePath),
      path.join(sourceRoot, '.next', 'standalone', 'public', image.filePath),
    ];

    for (const filePath of filePaths) {
      try {
        await unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (error) {
        console.warn(`Failed to delete file ${filePath}:`, error);
        // Continue even if file deletion fails
      }
    }

    // Delete from database
    await prisma.imageLibraryItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Train template deleted successfully' });
  } catch (error) {
    console.error('Failed to delete train template:', error);
    return NextResponse.json(
      { error: 'Failed to delete train template' },
      { status: 500 }
    );
  }
}
