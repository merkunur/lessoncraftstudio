import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Lightweight API to get slug mappings for all languages
 * Used for fast language switching in the LanguageSelector
 * Returns only slugs, NOT full content
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // First try to find by primary slug (English)
    let post = await prisma.blogPost.findFirst({
      where: {
        slug,
        status: 'published',
      },
      select: {
        slug: true,
        translations: true,
      },
    });

    // If not found, search by language-specific slug in translations
    if (!post) {
      const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        select: {
          slug: true,
          translations: true,
        },
      });

      // Find post where any translation has the matching slug
      for (const p of posts) {
        const translations = p.translations as Record<string, { slug?: string }>;

        // Check if any language has this slug
        for (const [lang, translation] of Object.entries(translations)) {
          if (translation?.slug === slug) {
            post = p;
            break;
          }
        }
        if (post) break;
      }
    }

    if (!post) {
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
