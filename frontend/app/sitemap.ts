import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';

// Enable ISR for sitemap - revalidate every 30 minutes (reduced for faster updates)
export const revalidate = 1800;

/**
 * Dynamic sitemap generation with hreflang alternates
 * Includes all public pages, blog posts, product pages, and multilingual routes
 * Each entry includes alternates to all language versions for better SEO
 *
 * Priority structure (optimized for Google):
 * - 1.0: Homepages (11 pages)
 * - 0.95: Apps collection pages (11 pages)
 * - 0.9: Individual app product pages (112+ pages)
 * - 0.85: Pricing pages (11 pages)
 * - 0.7: Blog index (11 pages)
 * - 0.6: Blog posts (1000+ pages)
 * - 0.3: Legal pages (terms, privacy)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

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
  // Optimized priority values for Google
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const }, // Homepage - highest priority
    { path: '/apps', priority: 0.95, changeFreq: 'weekly' as const }, // Apps collection - very high
    { path: '/pricing', priority: 0.85, changeFreq: 'weekly' as const }, // Pricing
    { path: '/blog', priority: 0.7, changeFreq: 'daily' as const }, // Blog index
    { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const }, // Legal
    { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const }, // Legal
  ];

  // Add static pages for all locales with alternates
  for (const locale of locales) {
    for (const page of staticPages) {
      staticRoutes.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: generateStaticAlternates(page.path),
        },
      });
    }
  }

  // Generate product page routes from configuration (112+ pages)
  const productRoutes: MetadataRoute.Sitemap = [];
  for (const app of productPageSlugs) {
    // Get all locales that have slugs defined for this app
    const appAlternates = getAlternateUrls(app.appId, baseUrl);

    // Add an entry for each locale that has a slug
    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (slug) {
        productRoutes.push({
          url: `${baseUrl}/${locale}/apps/${slug}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.9, // High priority for conversion pages
          alternates: {
            languages: appAlternates,
          },
        });
      }
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

    // Generate sitemap entries for each blog post ONLY in locales with actual translations
    blogRoutes = blogPosts.flatMap((post) => {
      const translations = post.translations as any;

      // Only include locales that have actual translation content (title AND slug must exist)
      const availableLocales = locales.filter((locale) => {
        const translation = translations[locale];
        // Require at least title and slug for a valid translation
        return translation?.title && translation?.slug;
      });

      // If no translations exist, skip this post entirely
      if (availableLocales.length === 0) {
        return [];
      }

      // Build alternates map ONLY for locales with actual translations
      const blogAlternates: Record<string, string> = {};
      for (const lang of availableLocales) {
        const langSlug = translations[lang]?.slug || post.slug;
        blogAlternates[lang] = `${baseUrl}/${lang}/blog/${langSlug}`;
      }

      // Add x-default pointing to first available locale (usually English if present)
      const defaultLocale = availableLocales.includes('en') ? 'en' : availableLocales[0];
      blogAlternates['x-default'] = blogAlternates[defaultLocale];

      return availableLocales.map((locale) => {
        // Use language-specific slug
        const localeSlug = translations[locale]?.slug || post.slug;

        return {
          url: `${baseUrl}/${locale}/blog/${localeSlug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.6, // Lower than product pages, higher than legal
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

  // Combine all routes: static pages, product pages, then blog posts
  // Order matters for crawl priority
  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
