import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * Dynamic sitemap generation
 * Includes all public pages, blog posts, and multilingual routes
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lessoncraftstudio.com';

  // Supported locales
  const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

  const currentDate = new Date();

  // Static routes for each locale
  const staticRoutes: MetadataRoute.Sitemap = [];
  const staticPages = [
    { path: '', priority: 1.0 }, // Homepage
    { path: '/pricing', priority: 0.9 },
    { path: '/blog', priority: 0.8 },
    { path: '/terms', priority: 0.5 },
    { path: '/privacy', priority: 0.5 },
    { path: '/support', priority: 0.7 },
  ];

  // Add static pages for all locales
  for (const locale of locales) {
    for (const page of staticPages) {
      staticRoutes.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: page.priority,
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
        updatedAt: true,
      },
    });

    // Generate sitemap entries for each blog post in all locales
    blogRoutes = blogPosts.flatMap((post) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    );
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue without blog posts if database is unavailable
  }

  // Combine all routes
  return [...staticRoutes, ...blogRoutes];
}
