import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { normalizeSlug } from '@/lib/slug-utils';

export const dynamic = 'force-dynamic';

// GET /api/admin/blog/posts - List all blog posts
export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  const user = adminCheck;

  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status'); // draft, published, archived
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const [rawPosts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          pdfs: {
            orderBy: { sortOrder: 'asc' },
          },
          author: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Transform posts for blog content manager UI
    const posts = rawPosts.map(post => {
      const translations = post.translations as any;
      const authorName = post.author
        ? `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() || 'Unknown'
        : 'Unknown';
      return {
        ...post,
        title: translations?.en?.title || 'Untitled',
        excerpt: translations?.en?.content?.substring(0, 150) || '',
        date: post.createdAt.toISOString().split('T')[0],
        author: authorName,
      };
    });

    return NextResponse.json({
      posts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog/posts - Create new blog post
export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  const user = adminCheck;

  try {
    const body = await request.json();
    const {
      slug,
      translations,
      category,
      keywords,
      featuredImage,
      status = 'draft',
    } = body;

    if (!slug || !translations) {
      return NextResponse.json(
        { error: 'slug and translations are required' },
        { status: 400 }
      );
    }

    // Validate translations - only English is required
    if (!translations.en) {
      return NextResponse.json(
        { error: 'English translation is required' },
        { status: 400 }
      );
    }

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

    const post = await prisma.blogPost.create({
      data: {
        authorId: user.id,
        slug,
        translations: processedTranslations,
        category: category || 'general',
        keywords: keywords || [],
        featuredImage,
        status,
        publishedAt: status === 'published' ? new Date() : null,
      },
      include: {
        pdfs: true,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    console.error('===== BLOG POST CREATION ERROR =====');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error code:', error.code);
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('====================================');
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error.message },
      { status: 500 }
    );
  }
}
