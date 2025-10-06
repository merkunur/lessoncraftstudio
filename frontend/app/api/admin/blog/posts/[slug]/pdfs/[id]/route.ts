import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import {
  validateImageFile,
  generateUniqueFilename,
  saveFile,
} from '@/lib/upload';
import fs from 'fs';
import path from 'path';

// GET /api/admin/blog/posts/:slug/pdfs/:id - Get single PDF
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const pdf = await prisma.blogPDF.findUnique({
      where: { id: params.id },
      include: {
        post: {
          select: { slug: true }
        }
      }
    });

    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    if (pdf.post.slug !== params.slug) {
      return NextResponse.json(
        { error: 'PDF does not belong to this post' },
        { status: 400 }
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

// PUT /api/admin/blog/posts/:slug/pdfs/:id - Update PDF metadata and/or thumbnail
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Verify PDF exists and belongs to post
    const existingPdf = await prisma.blogPDF.findUnique({
      where: { id: params.id },
      include: {
        post: {
          select: { slug: true }
        }
      }
    });

    if (!existingPdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    if (existingPdf.post.slug !== params.slug) {
      return NextResponse.json(
        { error: 'PDF does not belong to this post' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const price = formData.get('price') as string | null;
    const thumbnailFile = formData.get('thumbnail') as File | null;

    const updateData: any = {};

    if (title !== null) updateData.title = title;
    if (description !== null) updateData.description = description;
    if (price !== null) updateData.price = price;

    // Handle thumbnail upload if provided
    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbnailValidation = validateImageFile(thumbnailFile);
      if (!thumbnailValidation.valid) {
        return NextResponse.json(
          { error: `Thumbnail: ${thumbnailValidation.error}` },
          { status: 400 }
        );
      }

      // Delete old thumbnail if exists
      if (existingPdf.thumbnail) {
        try {
          const oldThumbnailPath = path.join(process.cwd(), 'public', existingPdf.thumbnail);
          if (fs.existsSync(oldThumbnailPath)) {
            fs.unlinkSync(oldThumbnailPath);
          }
        } catch (error) {
          console.warn('Failed to delete old thumbnail:', error);
        }
      }

      // Save new thumbnail
      const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const thumbnailFilename = generateUniqueFilename(thumbnailFile.name);
      const thumbnailPath = await saveFile(thumbnailBuffer, thumbnailFilename, 'blogThumbnails', params.slug);
      updateData.thumbnail = thumbnailPath;
    }

    // Update PDF record
    const pdf = await prisma.blogPDF.update({
      where: { id: params.id },
      data: updateData,
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

// DELETE /api/admin/blog/posts/:slug/pdfs/:id - Delete PDF
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Get PDF with post info
    const pdf = await prisma.blogPDF.findUnique({
      where: { id: params.id },
      include: {
        post: {
          select: { slug: true }
        }
      }
    });

    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    if (pdf.post.slug !== params.slug) {
      return NextResponse.json(
        { error: 'PDF does not belong to this post' },
        { status: 400 }
      );
    }

    // Delete PDF file from filesystem
    try {
      const pdfPath = path.join(process.cwd(), 'public', pdf.filePath);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    } catch (error) {
      console.warn('Failed to delete PDF file:', error);
    }

    // Delete thumbnail if exists
    if (pdf.thumbnail) {
      try {
        const thumbnailPath = path.join(process.cwd(), 'public', pdf.thumbnail);
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
      } catch (error) {
        console.warn('Failed to delete thumbnail:', error);
      }
    }

    // Delete PDF record from database
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
