import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Cache for blog metadata to improve performance
let blogMetadataCache: Map<string, BlogMetadata[]> = new Map();
let lastCacheUpdate = 0;
const CACHE_DURATION = 60000; // 1 minute cache

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
}

async function extractMetadataFromHTML(htmlContent: string, slug: string): Promise<BlogMetadata | null> {
  try {
    // Extract metadata from HTML
    const titleMatch = htmlContent.match(/<title>([^<]*)<\/title>/i);
    const metaTitleMatch = htmlContent.match(/<meta\s+name=["']?title["']?\s+content=["']([^"']+)["']/i);
    const metaDescMatch = htmlContent.match(/<meta\s+name=["']?description["']?\s+content=["']([^"']+)["']/i);
    const keywordsMatch = htmlContent.match(/<meta\s+name=["']?keywords["']?\s+content=["']([^"']+)["']/i);

    // Extract article metadata from structured data or custom meta tags
    const authorMatch = htmlContent.match(/<meta\s+name=["']?author["']?\s+content=["']([^"']+)["']/i);
    const dateMatch = htmlContent.match(/<meta\s+name=["']?date["']?\s+content=["']([^"']+)["']/i);
    const categoryMatch = htmlContent.match(/<meta\s+name=["']?category["']?\s+content=["']([^"']+)["']/i);
    const readTimeMatch = htmlContent.match(/<meta\s+name=["']?readTime["']?\s+content=["']([^"']+)["']/i);

    // Extract content for excerpt if no meta description
    const h1Match = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const firstParagraphMatch = htmlContent.match(/<p[^>]*>([^<]+)<\/p>/i);

    // Check if the post has sample worksheets
    const hasSampleWorksheets = htmlContent.includes('sample-worksheets') ||
                                htmlContent.includes('Download Free Sample') ||
                                htmlContent.includes('.pdf');

    const metadata: BlogMetadata = {
      slug,
      title: metaTitleMatch?.[1] || titleMatch?.[1] || h1Match?.[1] || slug.replace(/-/g, ' '),
      excerpt: metaDescMatch?.[1] || firstParagraphMatch?.[1]?.substring(0, 160) || '',
      author: authorMatch?.[1] || 'LessonCraftStudio Team',
      date: dateMatch?.[1] || new Date().toISOString().split('T')[0],
      category: categoryMatch?.[1] || 'Teaching Resources',
      readTime: readTimeMatch?.[1] || '5 min read',
      metaTitle: metaTitleMatch?.[1],
      metaDescription: metaDescMatch?.[1],
      keywords: keywordsMatch?.[1]?.split(',').map(k => k.trim()),
      hasSampleWorksheets
    };

    return metadata;
  } catch (error) {
    console.error(`Error extracting metadata from ${slug}:`, error);
    return null;
  }
}

async function getBlogPostsForLocale(locale: string): Promise<BlogMetadata[]> {
  // Check cache first
  const now = Date.now();
  if (blogMetadataCache.has(locale) && (now - lastCacheUpdate) < CACHE_DURATION) {
    return blogMetadataCache.get(locale) || [];
  }

  const blogDir = path.join(process.cwd(), 'public', 'blog', locale);
  const posts: BlogMetadata[] = [];

  try {
    // Check if locale directory exists
    await fs.access(blogDir);

    // Read all HTML files in the locale directory
    const files = await fs.readdir(blogDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    // Extract metadata from each HTML file
    for (const file of htmlFiles) {
      const filePath = path.join(blogDir, file);
      const htmlContent = await fs.readFile(filePath, 'utf-8');
      const slug = file.replace('.html', '');

      const metadata = await extractMetadataFromHTML(htmlContent, slug);
      if (metadata) {
        posts.push(metadata);
      }
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    // Update cache
    blogMetadataCache.set(locale, posts);
    lastCacheUpdate = now;

  } catch (error) {
    console.error(`Error reading blog directory for locale ${locale}:`, error);
    // Directory doesn't exist yet - return empty array
    blogMetadataCache.set(locale, []);
    lastCacheUpdate = now;
  }

  return posts;
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

// API to invalidate cache (useful when new blog posts are added)
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'invalidate-cache') {
      blogMetadataCache.clear();
      lastCacheUpdate = 0;
      return NextResponse.json({ message: 'Cache invalidated successfully' });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}