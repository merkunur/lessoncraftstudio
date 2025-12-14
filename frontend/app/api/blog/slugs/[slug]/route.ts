import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// In-memory cache for slug lookups (slug -> primary slug mapping)
let slugCache: Map<string, string> | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Build/refresh the slug cache
 * Maps all language-specific slugs to their primary (English) slug
 */
async function buildSlugCache(): Promise<Map<string, string>> {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      slug: true,
      translations: true,
    },
  });

  const cache = new Map<string, string>();

  for (const post of posts) {
    // Primary slug maps to itself
    cache.set(post.slug, post.slug);

    // All translated slugs map to primary slug
    const translations = post.translations as Record<string, { slug?: string }>;
    for (const translation of Object.values(translations)) {
      if (translation?.slug) {
        cache.set(translation.slug, post.slug);
      }
    }
  }

  return cache;
}

/**
 * Get the slug cache, building it if necessary
 */
async function getSlugCache(): Promise<Map<string, string>> {
  const now = Date.now();

  // Refresh cache if expired or not initialized
  if (!slugCache || now - cacheTimestamp > CACHE_TTL) {
    slugCache = await buildSlugCache();
    cacheTimestamp = now;
  }

  return slugCache;
}

/**
 * Lightweight API to get slug mappings for all languages
 * Used for fast language switching in the LanguageSelector
 * Returns only slugs, NOT full content
 *
 * Uses in-memory caching for fast lookup of non-primary slugs
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Use cache to find primary slug (fast for all languages)
    const cache = await getSlugCache();
    const primarySlug = cache.get(slug);

    if (!primarySlug) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Fetch post by primary slug (always fast - direct index lookup)
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: primarySlug,
        status: 'published',
      },
      select: {
        slug: true,
        translations: true,
      },
    });

    if (!post) {
      // Clear cache and retry once (post might have been deleted)
      slugCache = null;
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Build slug map for all languages
    const translations = post.translations as Record<string, { slug?: string }>;
    const slugMap: Record<string, string> = {
      en: post.slug, // Primary slug is always English
    };

    // Add all translated slugs
    for (const [lang, translation] of Object.entries(translations)) {
      if (translation?.slug) {
        slugMap[lang] = translation.slug;
      } else {
        // Fallback to primary slug if no translation
        slugMap[lang] = post.slug;
      }
    }

    return NextResponse.json({
      primarySlug: post.slug,
      slugs: slugMap,
    });
  } catch (error) {
    console.error('Get blog slugs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog slugs' },
      { status: 500 }
    );
  }
}
