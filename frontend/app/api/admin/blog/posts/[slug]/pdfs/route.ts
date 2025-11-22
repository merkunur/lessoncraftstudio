export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import {
  validatePdfFile,
  validateImageFile,
  generateUniqueFilename,
  saveFile,
  initializeStorage,
} from '@/lib/upload';

// Initialize storage
initializeStorage();

// POST /api/admin/blog/posts/:slug/pdfs - Upload PDF to post
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Verify post exists
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const pdfFile = formData.get('pdf') as File;
    const thumbnailFile = formData.get('thumbnail') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string || 'Free';
    const language = (formData.get('language') as string) || 'en'; // Language code

    if (!pdfFile || !title) {
      return NextResponse.json(
        { error: 'pdf file and title are required' },
        { status: 400 }
      );
    }

    // Validate PDF
    const pdfValidation = validatePdfFile(pdfFile);
    if (!pdfValidation.valid) {
      return NextResponse.json(
        { error: pdfValidation.error },
        { status: 400 }
      );
    }

    // Validate thumbnail if provided
    if (thumbnailFile) {
      const thumbnailValidation = validateImageFile(thumbnailFile);
      if (!thumbnailValidation.valid) {
        return NextResponse.json(
          { error: `Thumbnail: ${thumbnailValidation.error}` },
          { status: 400 }
        );
      }
    }

    // Save PDF file to language-specific directory
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfFilename = generateUniqueFilename(pdfFile.name);
    const pdfPath = await saveFile(pdfBuffer, pdfFilename, 'blogPdfs', `${params.slug}/${language}`);

    // Save thumbnail to language-specific directory if provided
    let thumbnailPath: string | null = null;
    if (thumbnailFile) {
      const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const thumbnailFilename = generateUniqueFilename(thumbnailFile.name);
      thumbnailPath = await saveFile(thumbnailBuffer, thumbnailFilename, 'blogThumbnails', `${params.slug}/${language}`);
    }

    // Get max sortOrder for this language
    const maxSortOrder = await prisma.blogPDF.findFirst({
      where: {
        postId: post.id,
        language: language,
      },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });

    // Create PDF record with language
    const pdf = await prisma.blogPDF.create({
      data: {
        postId: post.id,
        language,
        title,
        description: description || '',
        filename: pdfFilename,
        filePath: pdfPath,
        fileSize: pdfBuffer.length,
        thumbnail: thumbnailPath,
        price,
        sortOrder: (maxSortOrder?.sortOrder || 0) + 1,
      },
    });

    // Revalidate blog post pages for all languages to show new PDF immediately
    const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
    for (const locale of locales) {
      revalidatePath(`/${locale}/blog/${params.slug}`);
    }

    return NextResponse.json({ pdf }, { status: 201 });
  } catch (error) {
    console.error('Failed to upload PDF:', error);
    return NextResponse.json(
      { error: 'Failed to upload PDF' },
      { status: 500 }
    );
  }
}

// GET /api/admin/blog/posts/:slug/pdfs - List PDFs for post (optionally filtered by language)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language'); // Optional language filter

    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        pdfs: {
          where: language ? { language } : undefined, // Filter by language if specified
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ pdfs: post.pdfs });
  } catch (error) {
    console.error('Failed to fetch PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDFs' },
      { status: 500 }
    );
  }
}
