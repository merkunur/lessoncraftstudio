import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { deleteFile } from '@/lib/upload';

export const dynamic = 'force-dynamic';

// GET /api/admin/blog/pdfs/:id - Get single PDF
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const pdf = await prisma.blogPDF.findUnique({
      where: { id: params.id },
      include: { post: true },
    });

    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ pdf });
  } catch (error) {
    console.error('Failed to fetch PDF:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDF' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/pdfs/:id - Update PDF metadata
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
    const { title, description, price, sortOrder } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const pdf = await prisma.blogPDF.update({
      where: { id: params.id },
      data: updateData,
      include: { post: true },
    });

    return NextResponse.json({ pdf });
  } catch (error) {
    console.error('Failed to update PDF:', error);
    return NextResponse.json(
      { error: 'Failed to update PDF' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/pdfs/:id - Delete PDF
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const pdf = await prisma.blogPDF.findUnique({
      where: { id: params.id },
    });

    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    // Delete files from disk
    try {
      await deleteFile(pdf.filePath);
      if (pdf.thumbnail) {
        await deleteFile(pdf.thumbnail);
      }
    } catch (error) {
      console.warn('Failed to delete files from disk:', error);
    }

    // Delete from database
    await prisma.blogPDF.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Failed to delete PDF:', error);
    return NextResponse.json(
      { error: 'Failed to delete PDF' },
      { status: 500 }
    );
  }
}
