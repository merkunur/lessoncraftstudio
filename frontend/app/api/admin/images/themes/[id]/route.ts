import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/images/themes/:id - Get single theme
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const theme = await prisma.imageTheme.findUnique({
      where: { id: params.id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!theme) {
      return NextResponse.json(
        { error: 'Theme not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Failed to fetch theme:', error);
    return NextResponse.json(
      { error: 'Failed to fetch theme' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/images/themes/:id - Update theme
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
    const { name, displayNames, sortOrder } = body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (displayNames !== undefined) updateData.displayNames = displayNames;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const theme = await prisma.imageTheme.update({
      where: { id: params.id },
      data: updateData,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Failed to update theme:', error);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/images/themes/:id - Delete theme
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Check if theme has images
    const theme = await prisma.imageTheme.findUnique({
      where: { id: params.id },
      include: { _count: { select: { images: true } } },
    });

    if (!theme) {
      return NextResponse.json(
        { error: 'Theme not found' },
        { status: 404 }
      );
    }

    if (theme._count.images > 0) {
      return NextResponse.json(
        { error: `Cannot delete theme with ${theme._count.images} images. Delete images first.` },
        { status: 400 }
      );
    }

    await prisma.imageTheme.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Theme deleted successfully' });
  } catch (error) {
    console.error('Failed to delete theme:', error);
    return NextResponse.json(
      { error: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}
