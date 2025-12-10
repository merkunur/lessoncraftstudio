import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface BlogMetadata {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  hasSampleWorksheets?: boolean;
  featuredImage?: string | null;
}

async function getBlogPostsForLocale(locale: string): Promise<BlogMetadata[]> {
  try {
    // Get published blog posts from database
    const dbPosts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      include: {
        _count: {
          select: { pdfs: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform to BlogMetadata format, only including posts with translation for requested locale
    const posts: BlogMetadata[] = dbPosts
      .filter(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        // Only include if translation exists with both title and content
        return translation && translation.title && translation.content;
      })
      .map(post => {
        const translations = post.translations as any;
        const translation = translations[locale];

        return {
          // Use language-specific slug if available, otherwise fall back to primary slug
          slug: translation.slug || post.slug,
          title: translation.title || post.slug,
          excerpt: translation.excerpt || '',
          author: translation.author || 'LessonCraftStudio Team',
          date: post.createdAt.toISOString().split('T')[0],
          category: post.category || 'Teaching Resources',
          readTime: `${Math.ceil((translation.content?.length || 0) / 1000)} min read`,
          metaTitle: translation.metaTitle,
          metaDescription: translation.metaDescription,
          keywords: post.keywords,
          hasSampleWorksheets: post._count.pdfs > 0,
          // Use language-specific featured image if available, otherwise fall back to global
          featuredImage: translation.featuredImage || post.featuredImage
        };
      });

    return posts;
  } catch (error) {
    console.error(`Error fetching blog posts for locale ${locale}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100'); // Return up to 100 posts

    // Get all posts for the locale
    let posts = await getBlogPostsForLocale(locale);

    // Filter by category if specified
    if (category && category !== 'All Posts') {
      posts = posts.filter(post => post.category === category);
    }

    // Paginate results if needed
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      page,
      totalPages: Math.ceil(posts.length / limit),
      locale,
      category
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch blog posts',
        posts: [],
        total: 0
      },
      { status: 500 }
    );
  }
}

