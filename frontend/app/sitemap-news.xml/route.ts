/**
 * Google News Sitemap - Recent blog posts for Google News eligibility
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 *
 * Note: Posts must be published within the last 2 days for Google News,
 * but we include posts from the last 7 days for general freshness signals.
 */

import { prisma } from '@/lib/prisma';
import { SUPPORTED_LOCALES } from '@/config/locales';

export const revalidate = 3600; // Revalidate every hour

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Map locale codes to language names for Google News
const localeToLanguage: Record<string, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
  da: 'da',
  no: 'no',
  fi: 'fi',
};

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  // Get posts from the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const recentPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        slug: true,
        translations: true,
        createdAt: true,
        keywords: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limit to 100 most recent posts
    });

    let urls = '';

    for (const post of recentPosts) {
      const translations = post.translations as Record<string, {
        title?: string;
        slug?: string;
        content?: string;
      }> | null;

      if (!translations) continue;

      // Generate URLs for all locales with valid translations
      for (const locale of SUPPORTED_LOCALES) {
        const translation = translations[locale];

        // Only include if translation has title and content
        if (!translation?.title || !translation?.content) continue;

        const localeSlug = translation.slug || post.slug;
        const postUrl = `${baseUrl}/${locale}/blog/${localeSlug}`;
        const language = localeToLanguage[locale] || 'en';
        const publicationDate = post.createdAt.toISOString();
        const title = translation.title;

        // Keywords/tags for the article
        const keywords = post.keywords && Array.isArray(post.keywords)
          ? post.keywords.slice(0, 10).join(', ')
          : '';

        urls += `  <url>
    <loc>${escapeXml(postUrl)}</loc>
    <news:news>
      <news:publication>
        <news:name>LessonCraftStudio</news:name>
        <news:language>${language}</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>${keywords ? `
      <news:keywords>${escapeXml(keywords)}</news:keywords>` : ''}
    </news:news>
  </url>
`;
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Failed to generate news sitemap:', error);

    // Return empty sitemap on error
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;

    return new Response(emptyXml, {
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}
