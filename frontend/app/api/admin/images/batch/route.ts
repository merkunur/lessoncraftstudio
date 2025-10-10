import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { deleteFile } from '@/lib/upload';

export const dynamic = 'force-dynamic';

// POST /api/admin/images/batch - Batch operations
export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const body = await request.json();
    const { action, imageIds } = body;

    if (!action || !imageIds || !Array.isArray(imageIds)) {
      return NextResponse.json(
        { error: 'action and imageIds array are required' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      // Fetch images to delete
      const images = await prisma.imageLibraryItem.findMany({
        where: { id: { in: imageIds } },
      });

      // Delete files from disk
      const deletePromises = images.map(image =>
        deleteFile(image.filePath).catch(error => {
          console.warn(`Failed to delete file ${image.filePath}:`, error);
        })
      );
      await Promise.all(deletePromises);

      // Delete from database
      const result = await prisma.imageLibraryItem.deleteMany({
        where: { id: { in: imageIds } },
      });

      return NextResponse.json({
        message: `Successfully deleted ${result.count} images`,
        deletedCount: result.count,
      });
    } else if (action === 'move') {
      // Move images to different theme
      const { targetThemeId } = body;

      if (!targetThemeId) {
        return NextResponse.json(
          { error: 'targetThemeId is required for move action' },
          { status: 400 }
        );
      }

      // Verify target theme exists
      const theme = await prisma.imageTheme.findUnique({
        where: { id: targetThemeId },
      });

      if (!theme) {
        return NextResponse.json(
          { error: 'Target theme not found' },
          { status: 404 }
        );
      }

      // Update images
      const result = await prisma.imageLibraryItem.updateMany({
        where: { id: { in: imageIds } },
        data: { themeId: targetThemeId },
      });

      return NextResponse.json({
        message: `Successfully moved ${result.count} images`,
        movedCount: result.count,
      });
    } else {
      return NextResponse.json(
        { error: `Unknown action: ${action}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Batch operation error:', error);
    return NextResponse.json(
      { error: 'Failed to perform batch operation' },
      { status: 500 }
    );
  }
}
