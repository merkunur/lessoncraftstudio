import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { crossLocaleSlugs } from '@/config/blog-cross-locale-redirects';
import { themeSlugMap, getThemeSlug } from '@/config/theme-slugs';
import { themeContent } from '@/config/theme-page-content';
import { gradeSlugMap, GRADE_IDS, getGradeSlug } from '@/config/grade-slugs';

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
 * Priority structure:
 * - 1.0: Homepage, product pages (highest priority)
 * - 0.7: Category/grade hubs, featured blog posts
 * - 0.6: Pricing, blog categories, blog posts with PDFs
 * - 0.5: Apps collection, blog index, regular blog posts
 * - 0.4: FAQ
 * - 0.3: Legal pages (terms, privacy, contact, license)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

  // Supported locales (from centralized config)
  const locales = [...SUPPORTED_LOCALES];

  // Fixed date for static/product pages — only update when content actually changes
  // Using new Date() caused Google to re-crawl every 30 minutes (ISR revalidation interval)
  const STATIC_CONTENT_DATE = new Date('2026-02-09');
  const currentDate = STATIC_CONTENT_DATE;

  // Helper to generate language alternates for static pages
  // Uses regional hreflang codes (pt-BR, es-MX) for better SEO in target markets
  function generateStaticAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const lang of locales) {
      const hreflangCode = getHreflangCode(lang);
      alternates[hreflangCode] = `${baseUrl}/${lang}${path}`;
    }
    alternates['x-default'] = `${baseUrl}/en${path}`;
    return alternates;
  }

  // Static routes for each locale with hreflang alternates
  const staticRoutes: MetadataRoute.Sitemap = [];
  // Optimized priority values - product pages are highest priority
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const }, // Homepage
    { path: '/apps', priority: 0.5, changeFreq: 'weekly' as const }, // Apps collection - navigation hub only
    { path: '/pricing', priority: 0.6, changeFreq: 'weekly' as const }, // Pricing
    { path: '/blog', priority: 0.5, changeFreq: 'daily' as const }, // Blog index
    { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const }, // Legal
    { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const }, // Legal
    { path: '/faq', priority: 0.4, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/license', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/worksheets', priority: 0.7, changeFreq: 'weekly' as const },
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

    function calculateBlogPriority(post: { featured?: boolean; _count?: { pdfs: number }; createdAt: Date }): number {
      if (post.featured) return 0.7;
      if (post._count && post._count.pdfs > 0) return 0.6;
      return 0.5;
    }

    // Generate sitemap entries for each blog post ONLY in locales with actual translations
    // Now includes hreflang alternates for cross-language signal consolidation
    blogRoutes = blogPosts.flatMap((post) => {
      const translations = post.translations as any;

      // Only include locales that have actual translation content (title required, slug has fallback)
      // Also exclude entries where the resolved slug would trigger a cross-locale redirect
      const availableLocales = locales.filter((locale) => {
        const translation = translations[locale];
        // Require title AND content for valid translation (must match page metadata validation)
        if (!translation?.title || !translation?.content) return false;
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

      // Build hreflang alternates for this blog post across all available locales
      const blogAlternates: Record<string, string> = {};
      for (const loc of availableLocales) {
        const locSlug = translations[loc]?.slug || post.slug;
        const hreflangCode = getHreflangCode(loc);
        blogAlternates[hreflangCode] = `${baseUrl}/${loc}/blog/${locSlug}`;
      }
      // x-default → English version if available, else first available locale
      if (availableLocales.includes('en')) {
        const enSlug = translations['en']?.slug || post.slug;
        blogAlternates['x-default'] = `${baseUrl}/en/blog/${enSlug}`;
      } else {
        const fallbackLocale = availableLocales[0];
        const fallbackSlug = translations[fallbackLocale]?.slug || post.slug;
        blogAlternates['x-default'] = `${baseUrl}/${fallbackLocale}/blog/${fallbackSlug}`;
      }

      return availableLocales.map((locale) => {
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

  // Generate blog category archive pages — only for locale+category combos with posts
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

  // Query which categories have published posts, and check translations per locale
  // to avoid including empty category pages in the sitemap
  let categoryPostCounts: { category: string; translations: any }[] = [];
  try {
    categoryPostCounts = await prisma.blogPost.findMany({
      where: { status: 'published', category: { in: categories } },
      select: { category: true, translations: true },
    });
  } catch (error) {
    console.error('Error fetching blog category data for sitemap:', error);
  }

  // Build a set of "category:locale" pairs that have at least 1 post with a translation
  const categoryLocaleSet = new Set<string>();
  for (const post of categoryPostCounts) {
    const translations = post.translations as any;
    for (const locale of locales) {
      if (translations?.[locale]?.title && translations?.[locale]?.content) {
        categoryLocaleSet.add(`${post.category}:${locale}`);
      }
    }
  }

  for (const category of categories) {
    // Determine which locales have posts for this category
    const availableLocales = locales.filter(locale => categoryLocaleSet.has(`${category}:${locale}`));
    if (availableLocales.length === 0) continue;

    // Build hreflang alternates only for locales that have posts
    const blogCatAlternates: Record<string, string> = {};
    for (const lang of availableLocales) {
      blogCatAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/blog/category/${category}`;
    }
    blogCatAlternates['x-default'] = availableLocales.includes('en')
      ? `${baseUrl}/en/blog/category/${category}`
      : `${baseUrl}/${availableLocales[0]}/blog/category/${category}`;

    for (const locale of availableLocales) {
      categoryRoutes.push({
        url: `${baseUrl}/${locale}/blog/category/${category}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: {
          languages: blogCatAlternates,
        },
      });
    }
  }

  // Product category hub pages (8 categories x 11 locales = 88 pages)
  const productCategoryRoutes: MetadataRoute.Sitemap = [];
  const productCategories = [
    'math', 'language-arts', 'word-games', 'art-creativity',
    'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'
  ];
  for (const locale of locales) {
    for (const cat of productCategories) {
      const catAlternates: Record<string, string> = {};
      for (const lang of locales) {
        catAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/category/${cat}`;
      }
      catAlternates['x-default'] = `${baseUrl}/en/apps/category/${cat}`;
      productCategoryRoutes.push({
        url: `${baseUrl}/${locale}/apps/category/${cat}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: { languages: catAlternates },
      });
    }
  }

  // Grade-level landing pages (5 grades x 11 locales = 55 pages)
  const gradeRoutes: MetadataRoute.Sitemap = [];
  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  for (const locale of locales) {
    for (const grade of grades) {
      const gradeAlternates: Record<string, string> = {};
      for (const lang of locales) {
        gradeAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/grades/${grade}`;
      }
      gradeAlternates['x-default'] = `${baseUrl}/en/apps/grades/${grade}`;
      gradeRoutes.push({
        url: `${baseUrl}/${locale}/apps/grades/${grade}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: { languages: gradeAlternates },
      });
    }
  }

  // Theme hub pages (50 themes x 11 locales = 550 pages)
  const themeRoutes: MetadataRoute.Sitemap = [];
  const themeIds = Object.keys(themeContent);
  for (const locale of locales) {
    for (const themeId of themeIds) {
      const slug = getThemeSlug(themeId, locale);
      if (!slug) continue;
      const themeAlternates: Record<string, string> = {};
      for (const lang of locales) {
        const langSlug = getThemeSlug(themeId, lang);
        if (langSlug) {
          themeAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets/${langSlug}`;
        }
      }
      const enSlug = getThemeSlug(themeId, 'en');
      if (enSlug) themeAlternates['x-default'] = `${baseUrl}/en/worksheets/${enSlug}`;
      themeRoutes.push({
        url: `${baseUrl}/${locale}/worksheets/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: { languages: themeAlternates },
      });
    }
  }

  // Theme + Grade pages (50 themes x 5 grades x 11 locales = 2,750 pages)
  const themeGradeRoutes: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const themeId of themeIds) {
      const tSlug = getThemeSlug(themeId, locale);
      if (!tSlug) continue;
      for (const gradeId of GRADE_IDS) {
        const gSlug = getGradeSlug(gradeId, locale);
        if (!gSlug) continue;
        const tgAlternates: Record<string, string> = {};
        for (const lang of locales) {
          const ltSlug = getThemeSlug(themeId, lang);
          const lgSlug = getGradeSlug(gradeId, lang);
          if (ltSlug && lgSlug) {
            tgAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets/${ltSlug}/${lgSlug}`;
          }
        }
        const enTSlug = getThemeSlug(themeId, 'en');
        const enGSlug = getGradeSlug(gradeId, 'en');
        if (enTSlug && enGSlug) {
          tgAlternates['x-default'] = `${baseUrl}/en/worksheets/${enTSlug}/${enGSlug}`;
        }
        themeGradeRoutes.push({
          url: `${baseUrl}/${locale}/worksheets/${tSlug}/${gSlug}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
          alternates: { languages: tgAlternates },
        });
      }
    }
  }

  // Combine all routes: static, product, product categories, grades, themes, theme+grades, blog categories, blog posts
  // Order matters for crawl priority
  return [...staticRoutes, ...productRoutes, ...productCategoryRoutes, ...gradeRoutes, ...themeRoutes, ...themeGradeRoutes, ...categoryRoutes, ...blogRoutes];
}
