import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { crossLocaleSlugs } from '@/config/blog-cross-locale-redirects';

// Build slug → nativeLocale map to exclude sitemap entries that would 301 redirect
const slugToNativeLocale = new Map<string, string>();
for (const { slug, nativeLocale } of crossLocaleSlugs) {
  slugToNativeLocale.set(slug, nativeLocale);
}

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

  // Supported locales (from centralized config)
  const locales = [...SUPPORTED_LOCALES];

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
     * Blog posts are high-priority original content - minimum 0.9
     * SEO FIX: Each of 1,232 blog posts is original content, not a translation
     * Higher priority signals importance to Google
     * - Featured posts: 1.0 (highest quality, editorially chosen)
     * - Posts with PDFs: 0.95 (high value - downloadable content)
     * - All other posts: 0.9 (minimum priority for original content)
     */
    function calculateBlogPriority(post: { featured?: boolean; _count?: { pdfs: number }; createdAt: Date }): number {
      // Featured posts get highest priority
      if (post.featured) return 1.0;

      // Posts with downloadable PDFs are high value
      if (post._count && post._count.pdfs > 0) return 0.95;

      // All blog posts are original content, minimum 0.9 priority
      return 0.9;
    }

    // Generate sitemap entries for each blog post ONLY in locales with actual translations
    blogRoutes = blogPosts.flatMap((post) => {
      const translations = post.translations as any;

      // Only include locales that have actual translation content (title required, slug has fallback)
      // Also exclude entries where the resolved slug would trigger a cross-locale redirect
      const availableLocales = locales.filter((locale) => {
        const translation = translations[locale];
        // Require title for valid translation; slug can fallback to primary slug
        if (!translation?.title) return false;
        const resolvedSlug = translation?.slug || post.slug;
        if (!resolvedSlug) return false;
        // Skip if this slug's native locale differs — middleware would 301 redirect
        const nativeLocale = slugToNativeLocale.get(resolvedSlug);
        if (nativeLocale && nativeLocale !== locale) return false;
        return true;
      });

      // If no translations exist, skip this post entirely
      if (availableLocales.length === 0) {
        return [];
      }

      // Generate hreflang alternates for blog posts
      // Blog posts are translations (shared database record, same metadata)
      // Proper hreflang ensures bidirectional linking as required by Google
      const blogAlternates: Record<string, string> = {};
      for (const lang of availableLocales) {
        const langSlug = translations[lang]?.slug || post.slug;
        const hreflangCode = getHreflangCode(lang);
        blogAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/${langSlug}`;
      }
      // Add x-default pointing to English version if available
      if (translations['en']?.slug || post.slug) {
        blogAlternates['x-default'] = `${baseUrl}/en/blog/${translations['en']?.slug || post.slug}`;
      }

      return availableLocales.map((locale) => {
        // Use language-specific slug
        const localeSlug = translations[locale]?.slug || post.slug;

        return {
          url: `${baseUrl}/${locale}/blog/${localeSlug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: calculateBlogPriority(post),
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
