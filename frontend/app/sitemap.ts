import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * Dynamic sitemap generation with hreflang alternates
 * Includes all public pages, blog posts, and multilingual routes
 * Each entry includes alternates to all language versions for better SEO
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lessoncraftstudio.com';

  // Supported locales
  const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

  const currentDate = new Date();

  // Helper to generate language alternates for static pages
  function generateStaticAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const lang of locales) {
      alternates[lang] = `${baseUrl}/${lang}${path}`;
    }
    return alternates;
  }

  // Static routes for each locale with hreflang alternates
  const staticRoutes: MetadataRoute.Sitemap = [];
  const staticPages = [
    { path: '', priority: 1.0 }, // Homepage
    { path: '/apps', priority: 0.9 },
    { path: '/pricing', priority: 0.9 },
    { path: '/blog', priority: 0.8 },
    { path: '/terms', priority: 0.5 },
    { path: '/privacy', priority: 0.5 },
    { path: '/support', priority: 0.7 },
  ];

  // Add static pages for all locales with alternates
  for (const locale of locales) {
    for (const page of staticPages) {
      staticRoutes.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: page.priority,
        alternates: {
          languages: generateStaticAlternates(page.path),
        },
      });
    }
  }

  // Fetch published blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
      },
      select: {
        slug: true,
        translations: true,
        updatedAt: true,
      },
    });

    // Generate sitemap entries for each blog post in all locales with language-specific slugs
    blogRoutes = blogPosts.flatMap((post) => {
      const translations = post.translations as any;

      // Build alternates map with language-specific slugs for this post
      const blogAlternates: Record<string, string> = {};
      for (const lang of locales) {
        const langSlug = translations[lang]?.slug || post.slug;
        blogAlternates[lang] = `${baseUrl}/${lang}/blog/${langSlug}`;
      }

      return locales.map((locale) => {
        // Use language-specific slug if available, otherwise fallback to primary slug
        const localeSlug = translations[locale]?.slug || post.slug;

        return {
          url: `${baseUrl}/${locale}/blog/${localeSlug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
          alternates: {
            languages: blogAlternates,
          },
        };
      });
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue without blog posts if database is unavailable
  }

  // Combine all routes
  return [...staticRoutes, ...blogRoutes];
}
