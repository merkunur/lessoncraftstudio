import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

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

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          pdfs: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.blogPost.count({ where }),
    ]);

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

    // Do NOT auto-fill missing translations - only save what the user provides

    const post = await prisma.blogPost.create({
      data: {
        authorId: user.id,
        slug,
        translations,
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
