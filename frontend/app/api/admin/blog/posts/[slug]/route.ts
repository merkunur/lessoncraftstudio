import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { normalizeSlug } from '@/lib/slug-utils';

export const dynamic = 'force-dynamic';

// GET /api/admin/blog/posts/:slug - Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        pdfs: {
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

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/posts/:slug - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const body = await request.json();
    const {
      translations,
      category,
      keywords,
      featuredImage,
      status,
    } = body;

    const updateData: any = {};
    if (translations !== undefined) {
      // Auto-generate language-specific slugs from titles
      const processedTranslations: any = {};
      for (const [locale, translation] of Object.entries(translations)) {
        if (translation && typeof translation === 'object') {
          const trans: any = { ...translation };

          // If slug is not provided or is empty, generate it from title
          if (!trans.slug && trans.title) {
            trans.slug = normalizeSlug(trans.title);
          }
          // If slug is provided but contains special characters, normalize it
          else if (trans.slug) {
            trans.slug = normalizeSlug(trans.slug);
          }

          processedTranslations[locale] = trans;
        } else {
          processedTranslations[locale] = translation;
        }
      }
      updateData.translations = processedTranslations;
    }
    if (category !== undefined) updateData.category = category;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (status !== undefined) {
      updateData.status = status;
      // Set publishedAt when publishing for first time
      if (status === 'published') {
        const existing = await prisma.blogPost.findUnique({
          where: { slug: params.slug },
          select: { publishedAt: true },
        });
        if (!existing?.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
    }

    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: updateData,
      include: {
        pdfs: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    // Revalidate blog post pages for all languages to show updated translations immediately
    const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
    for (const locale of locales) {
      revalidatePath(`/${locale}/blog/${params.slug}`);
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/posts/:slug - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Check if post has PDFs
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: { _count: { select: { pdfs: true } } },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (post._count.pdfs > 0) {
      return NextResponse.json(
        { error: `Cannot delete post with ${post._count.pdfs} PDFs. Delete PDFs first.` },
        { status: 400 }
      );
    }

    await prisma.blogPost.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
