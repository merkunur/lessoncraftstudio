import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * API route to check which language a blog slug belongs to.
 * Used by middleware to redirect blog posts accessed with wrong language prefix.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  const locale = request.nextUrl.searchParams.get('locale');

  if (!slug || !locale) {
    return NextResponse.json({ correctLocale: null });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, translations: true }
    });

    for (const post of posts) {
      const translations = post.translations as any;

      // Check if requested locale has this slug - no redirect needed
      if (translations[locale]?.slug === slug) {
        return NextResponse.json({ correctLocale: locale });
      }

      // Check all other languages for this slug
      for (const [lang, translation] of Object.entries(translations)) {
        if ((translation as any)?.slug === slug) {
          return NextResponse.json({ correctLocale: lang });
        }
      }

      // Check primary slug (fallback to English)
      if (post.slug === slug) {
        return NextResponse.json({ correctLocale: 'en' });
      }
    }

    // Slug not found in any language
    return NextResponse.json({ correctLocale: null });
  } catch (error) {
    console.error('Error checking slug language:', error);
    return NextResponse.json({ correctLocale: null });
  }
}
