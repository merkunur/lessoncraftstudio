import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';

// Enable ISR for sitemap - revalidate every 30 minutes (reduced for faster updates)
export const revalidate = 1800;

// NOTE: Sample images are handled by /sitemap-images.xml with proper Google Image Sitemap XML format

/**
 * Dynamic sitemap generation with hreflang alternates
 * Includes all public pages, blog posts, product pages, and multilingual routes
 * Each entry includes alternates to all language versions for better SEO
 *
 * Priority structure (optimized for product pages):
 * - 1.0: Individual app product pages (363 pages) - HIGHEST, conversion targets
 * - 0.8: Homepages (11 pages)
 * - 0.6: Pricing pages (11 pages)
 * - 0.5: Apps collection pages (11 pages) - navigation hub only
 * - 0.5: Blog index (11 pages)
 * - 0.5: Blog posts (1000+ pages)
 * - 0.3: Legal pages (terms, privacy)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  // Supported locales
  const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

  const currentDate = new Date();

  // Helper to generate language alternates for static pages
  // Uses regional hreflang codes (pt-BR, es-MX) for better SEO in target markets
  function generateStaticAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const lang of locales) {
      // Use proper hreflang code (e.g., pt-BR, es-MX) as the key
      const hreflangCode = getHreflangCode(lang);
      alternates[hreflangCode] = `${baseUrl}/${lang}${path}`;
    }
    // Add x-default for unspecified regions
    alternates['x-default'] = `${baseUrl}/en${path}`;
    return alternates;
  }

  // Static routes for each locale with hreflang alternates
  const staticRoutes: MetadataRoute.Sitemap = [];
  // Optimized priority values - product pages are highest priority
  const staticPages = [
    { path: '', priority: 0.8, changeFreq: 'daily' as const }, // Homepage
    { path: '/apps', priority: 0.5, changeFreq: 'weekly' as const }, // Apps collection - navigation hub only
    { path: '/pricing', priority: 0.6, changeFreq: 'weekly' as const }, // Pricing
    { path: '/blog', priority: 0.5, changeFreq: 'daily' as const }, // Blog index
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

  // Generate product page routes from configuration (363 pages)
  // NOTE: Images are handled separately by /sitemap-images.xml for proper Google Image Sitemap XML
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
          priority: 1.0, // Highest priority - these are the conversion target pages
          alternates: {
            languages: appAlternates,
          },
        });
      }
    }
  }

  // Fetch published blog posts with PDF counts for priority calculation
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
        createdAt: true,
        featured: true,
        _count: {
          select: { pdfs: true }
        }
      },
    });

    /**
     * Calculate dynamic priority for blog posts based on content quality signals
     * - Featured posts: 0.7 (highest quality, editorially chosen)
     * - Posts with PDFs: 0.6 (high value - downloadable content)
     * - Recent posts (<30 days): 0.6 (fresh content)
     * - Standard posts: 0.5 (default)
     * - Old posts (>1 year): 0.4 (stale content)
     */
    function calculateBlogPriority(post: { featured?: boolean; _count?: { pdfs: number }; createdAt: Date }): number {
      // Featured posts get highest priority
      if (post.featured) return 0.7;

      // Posts with downloadable PDFs are high value
      if (post._count && post._count.pdfs > 0) return 0.6;

      const ageInDays = Math.floor((currentDate.getTime() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24));

      // Recent posts (less than 30 days) get higher priority
      if (ageInDays < 30) return 0.6;

      // Old posts (more than 365 days) get lower priority
      if (ageInDays > 365) return 0.4;

      // Standard posts
      return 0.5;
    }

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
      // Uses regional hreflang codes (pt-BR, es-MX) for better SEO in target markets
      const blogAlternates: Record<string, string> = {};
      for (const lang of availableLocales) {
        const langSlug = translations[lang]?.slug || post.slug;
        // Use proper hreflang code (e.g., pt-BR, es-MX) as the key
        const hreflangCode = getHreflangCode(lang);
        blogAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/${langSlug}`;
      }

      // Add x-default pointing to first available locale (usually English if present)
      const defaultLocale = availableLocales.includes('en') ? 'en' : availableLocales[0];
      const defaultHreflang = getHreflangCode(defaultLocale);
      blogAlternates['x-default'] = blogAlternates[defaultHreflang];

      return availableLocales.map((locale) => {
        // Use language-specific slug
        const localeSlug = translations[locale]?.slug || post.slug;

        return {
          url: `${baseUrl}/${locale}/blog/${localeSlug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: calculateBlogPriority(post), // Dynamic priority based on content quality
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

  // Generate blog category archive pages
  const categoryRoutes: MetadataRoute.Sitemap = [];
  const categories = [
    'teaching-resources',
    'worksheet-tips',
    'educational-activities',
    'learning-strategies',
    'curriculum-guides',
    'parent-resources',
    'seasonal-content'
  ];

  for (const locale of locales) {
    for (const category of categories) {
      // Generate alternates for this category
      const categoryAlternates: Record<string, string> = {};
      for (const lang of locales) {
        const hreflangCode = getHreflangCode(lang);
        categoryAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/category/${category}`;
      }
      categoryAlternates['x-default'] = `${baseUrl}/en/blog/category/${category}`;

      categoryRoutes.push({
        url: `${baseUrl}/${locale}/blog/category/${category}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6, // Category archives - good for discovery
        alternates: {
          languages: categoryAlternates,
        },
      });
    }
  }

  // Combine all routes: static pages, product pages, category archives, then blog posts
  // Order matters for crawl priority
  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}
