export const dynamic = 'force-dynamic';

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
    const language = formData.get('language') as string | null; // Get language parameter

    // Handle thumbnail upload if provided
    let thumbnailPath: string | null = null;
    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbnailValidation = validateImageFile(thumbnailFile);
      if (!thumbnailValidation.valid) {
        return NextResponse.json(
          { error: `Thumbnail: ${thumbnailValidation.error}` },
          { status: 400 }
        );
      }

      // Save new thumbnail
      const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const thumbnailFilename = generateUniqueFilename(thumbnailFile.name);
      thumbnailPath = await saveFile(thumbnailBuffer, thumbnailFilename, 'blogThumbnails', params.slug);
    }

    // If language is English or not specified, update the BlogPDF table (default)
    if (!language || language === 'en') {
      const updateData: any = {};
      if (title !== null) updateData.title = title;
      if (description !== null) updateData.description = description;
      if (price !== null) updateData.price = price;
      if (thumbnailPath) {
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
        updateData.thumbnail = thumbnailPath;
      }

      const pdf = await prisma.blogPDF.update({
        where: { id: params.id },
        data: updateData,
      });

      return NextResponse.json({ pdf });
    } else {
      // For non-English languages, update BlogPost.translations[language].pdfs[pdfId]
      const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
      });

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }

      const translations = post.translations as any;

      // Initialize translations structure if needed
      if (!translations[language]) {
        translations[language] = {};
      }
      if (!translations[language].pdfs) {
        translations[language].pdfs = {};
      }

      // Update language-specific PDF data
      const pdfData: any = translations[language].pdfs[params.id] || {};
      if (title !== null) pdfData.title = title;
      if (description !== null) pdfData.description = description;
      if (thumbnailPath) pdfData.thumbnail = thumbnailPath;

      translations[language].pdfs[params.id] = pdfData;

      // Save updated translations
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { translations },
      });

      return NextResponse.json({
        pdf: {
          id: params.id,
          title,
          description,
          thumbnail: thumbnailPath || existingPdf.thumbnail,
        }
      });
    }
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
