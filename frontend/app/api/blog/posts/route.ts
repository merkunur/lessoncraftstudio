import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache for 1 hour instead of force-dynamic for better performance
export const revalidate = 3600;

/**
 * Calculate reading time based on word count
 * Standard reading speed: 200 words per minute
 * @param htmlContent - HTML content of the blog post
 * @returns Reading time in minutes (minimum 1)
 */
function calculateReadingTime(htmlContent: string): number {
  // Strip HTML tags to get plain text
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  // Count words (split by whitespace, filter empty strings)
  const wordCount = textContent.replace(/\s+/g, ' ').trim().split(' ').filter(word => word.length > 0).length;
  // Standard reading speed is 200 WPM, minimum 1 minute
  return Math.max(1, Math.ceil(wordCount / 200));
}

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
        // Only include if translation exists with title, content, and locale-specific slug
        return translation && translation.title && translation.content && translation.slug;
      })
      .map(post => {
        const translations = post.translations as any;
        const translation = translations[locale];

        return {
          // Use language-specific slug (guaranteed non-null by filter above)
          slug: translation.slug,
          title: translation.title || post.slug,
          excerpt: translation.excerpt || '',
          author: translation.author || 'LessonCraftStudio Team',
          date: post.createdAt.toISOString().split('T')[0],
          category: post.category || 'Teaching Resources',
          readTime: `${calculateReadingTime(translation.content || '')} min read`,
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

