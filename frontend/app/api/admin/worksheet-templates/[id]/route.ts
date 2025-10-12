import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors } from '@/lib/cors';
import { withAdmin } from '@/lib/auth-middleware';
import fs from 'fs/promises';
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

/**
 * DELETE /api/admin/worksheet-templates/[id]
 * Deletes a single worksheet template image
 */
async function deleteHandler(request: NextRequest, userId: string, context: { params: { id: string } }) {
  try {
    const imageId = context.params.id;

    // Find the image in the database
    const image = await prisma.imageLibraryItem.findUnique({
      where: { id: imageId },
      include: { theme: true }
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Verify it's a worksheet template
    if (image.theme.type !== 'worksheet') {
      return NextResponse.json(
        { error: 'Not a worksheet template image' },
        { status: 400 }
      );
    }

    // Delete the physical file from both source and standalone
    const sourceRoot = getSourceRoot();
    const filePaths = [
      path.join(sourceRoot, 'public', image.filePath),
      path.join(sourceRoot, '.next', 'standalone', 'public', image.filePath),
    ];

    for (const filePath of filePaths) {
      try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (error) {
        console.warn(`Could not delete file ${filePath}:`, error);
        // Continue even if file doesn't exist
      }
    }

    // Delete from database
    await prisma.imageLibraryItem.delete({
      where: { id: imageId }
    });

    return NextResponse.json({
      success: true,
      message: 'Worksheet template image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting worksheet template image:', error);
    return NextResponse.json(
      { error: 'Failed to delete worksheet template image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/worksheet-templates/[id]
 * Updates a single worksheet template image's metadata
 */
async function patchHandler(request: NextRequest, userId: string, context: { params: { id: string } }) {
  try {
    const imageId = context.params.id;
    const body = await request.json();

    // Find the image in the database
    const image = await prisma.imageLibraryItem.findUnique({
      where: { id: imageId },
      include: { theme: true }
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Verify it's a worksheet template
    if (image.theme.type !== 'worksheet') {
      return NextResponse.json(
        { error: 'Not a worksheet template image' },
        { status: 400 }
      );
    }

    // Update the image metadata
    const updatedImage = await prisma.imageLibraryItem.update({
      where: { id: imageId },
      data: {
        translations: body.translations || image.translations,
        sortOrder: body.sortOrder ?? image.sortOrder,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Worksheet template image updated successfully',
      image: {
        id: updatedImage.id,
        filename: updatedImage.filename,
        translations: updatedImage.translations,
        sortOrder: updatedImage.sortOrder,
      }
    });

  } catch (error) {
    console.error('Error updating worksheet template image:', error);
    return NextResponse.json(
      { error: 'Failed to update worksheet template image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Export wrapped handlers with CORS and Admin authentication
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  return withCors(async (req: NextRequest) =>
    withAdmin(req, (req, userId) => deleteHandler(req, userId, context))
  )(request);
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  return withCors(async (req: NextRequest) =>
    withAdmin(req, (req, userId) => patchHandler(req, userId, context))
  )(request);
}

// Handle OPTIONS preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
