import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { crossLocaleSlugs } from '@/config/blog-cross-locale-redirects';
import { ALL_THEME_IDS } from '@/content/themes/types';
import { getThemeSlug } from '@/config/theme-slugs';
import { GRADE_IDS, getGradeSlug } from '@/config/grade-slugs';

// Build slug -> nativeLocale map to exclude sitemap entries that would 301 redirect
const slugToNativeLocale = new Map<string, string>();
for (const { slug, nativeLocale } of crossLocaleSlugs) {
  slugToNativeLocale.set(slug, nativeLocale);
}

// ISR revalidation: each individual sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Fixed date for static/config-derived pages (only update when content actually changes)
const STATIC_CONTENT_DATE = new Date('2026-02-13');

// NOTE: Sample images are handled by /sitemap-images.xml with proper Google Image Sitemap XML format

/**
 * Split sitemap into 7 smaller sitemaps to prevent ISR timeout on the server.
 * Previously, a single monolithic sitemap generating 6,000+ URLs was timing out,
 * causing the live site to serve only 99 static URLs from a stale cache.
 *
 * ID 0: Static pages (~110 URLs) - config only, no DB needed
 * ID 1: Product pages (~363 URLs) - config only, no DB needed
 * ID 2: Product categories + grade pages (~143 URLs) - config only, no DB needed
 * ID 3: Theme hub pages (~550 URLs) - config only, no DB needed
 * ID 4: Theme+grade combo pages (~2,750 URLs) - config only, no DB needed
 * ID 5: Blog category pages (~77 URLs) - requires database
 * ID 6: Blog posts (~2,000+ URLs) - requires database
 *
 * Priority structure:
 * - 1.0: Homepage, product pages (highest priority)
 * - 0.8: Theme hub pages
 * - 0.7: Category/grade hubs, theme+grade combos, featured blog posts
 * - 0.6: Pricing, blog categories, blog posts with PDFs
 * - 0.5: Apps collection, blog index, regular blog posts
 * - 0.4: FAQ
 * - 0.3: Legal pages (terms, privacy, contact, license)
 */
export async function generateSitemaps() {
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';
  const locales = [...SUPPORTED_LOCALES];

  // Helper: generate hreflang alternates for a path shared across all locales
  function allLocaleAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const lang of locales) {
      alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}${path}`;
    }
    alternates['x-default'] = `${baseUrl}/en${path}`;
    return alternates;
  }

  // ── ID 0: Static pages ──────────────────────────────────────────────
  if (id === 0) {
    const staticPages = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },
      { path: '/apps', priority: 0.5, changeFreq: 'weekly' as const },
      { path: '/pricing', priority: 0.6, changeFreq: 'weekly' as const },
      { path: '/blog', priority: 0.5, changeFreq: 'daily' as const },
      { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/faq', priority: 0.4, changeFreq: 'monthly' as const },
      { path: '/contact', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/license', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/worksheets', priority: 0.7, changeFreq: 'weekly' as const },
    ];

    const routes: MetadataRoute.Sitemap = [];
    for (const locale of locales) {
      for (const page of staticPages) {
        routes.push({
          url: `${baseUrl}/${locale}${page.path}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: page.changeFreq,
          priority: page.priority,
          alternates: { languages: allLocaleAlternates(page.path) },
        });
      }
    }
    return routes;
  }

  // ── ID 1: Product pages (363 pages) ─────────────────────────────────
  if (id === 1) {
    const routes: MetadataRoute.Sitemap = [];
    for (const app of productPageSlugs) {
      const appAlternates = getAlternateUrls(app.appId, baseUrl);
      for (const [locale, slug] of Object.entries(app.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/apps/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 1.0,
            alternates: { languages: appAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ── ID 2: Product categories + grade pages (~143 pages) ─────────────
  if (id === 2) {
    const routes: MetadataRoute.Sitemap = [];

    // Product category hub pages (8 categories x 11 locales = 88 pages)
    const productCategories = [
      'math', 'language-arts', 'word-games', 'art-creativity',
      'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor',
    ];
    for (const locale of locales) {
      for (const cat of productCategories) {
        const catAlternates: Record<string, string> = {};
        for (const lang of locales) {
          catAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/category/${cat}`;
        }
        catAlternates['x-default'] = `${baseUrl}/en/apps/category/${cat}`;
        routes.push({
          url: `${baseUrl}/${locale}/apps/category/${cat}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages: catAlternates },
        });
      }
    }

    // Grade-level landing pages (5 grades x 11 locales = 55 pages)
    const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
    for (const locale of locales) {
      for (const grade of grades) {
        const gradeAlternates: Record<string, string> = {};
        for (const lang of locales) {
          gradeAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/grades/${grade}`;
        }
        gradeAlternates['x-default'] = `${baseUrl}/en/apps/grades/${grade}`;
        routes.push({
          url: `${baseUrl}/${locale}/apps/grades/${grade}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages: gradeAlternates },
        });
      }
    }

    return routes;
  }

  // ── ID 3: Theme hub pages (~550 pages) ──────────────────────────────
  if (id === 3) {
    const routes: MetadataRoute.Sitemap = [];
    for (const locale of locales) {
      for (const themeId of ALL_THEME_IDS) {
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
        routes.push({
          url: `${baseUrl}/${locale}/worksheets/${slug}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: { languages: themeAlternates },
        });
      }
    }
    return routes;
  }

  // ── ID 4: Theme + Grade combo pages (~2,750 pages) ──────────────────
  if (id === 4) {
    const routes: MetadataRoute.Sitemap = [];
    for (const locale of locales) {
      for (const themeId of ALL_THEME_IDS) {
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
          routes.push({
            url: `${baseUrl}/${locale}/worksheets/${tSlug}/${gSlug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: { languages: tgAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ── ID 5: Blog category pages (~77 pages, requires DB) ─────────────
  if (id === 5) {
    const categories = [
      'teaching-resources', 'worksheet-tips', 'educational-activities',
      'learning-strategies', 'curriculum-guides', 'parent-resources', 'seasonal-content',
    ];

    let categoryPostCounts: { category: string; translations: any }[] = [];
    try {
      categoryPostCounts = await prisma.blogPost.findMany({
        where: { status: 'published', category: { in: categories } },
        select: { category: true, translations: true },
      });
    } catch (error) {
      console.error('[sitemap/5] Error fetching blog category data:', error);
      return [];
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

    const routes: MetadataRoute.Sitemap = [];
    for (const category of categories) {
      const availableLocales = locales.filter(locale => categoryLocaleSet.has(`${category}:${locale}`));
      if (availableLocales.length === 0) continue;

      const blogCatAlternates: Record<string, string> = {};
      for (const lang of availableLocales) {
        blogCatAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/blog/category/${category}`;
      }
      blogCatAlternates['x-default'] = availableLocales.includes('en')
        ? `${baseUrl}/en/blog/category/${category}`
        : `${baseUrl}/${availableLocales[0]}/blog/category/${category}`;

      for (const locale of availableLocales) {
        routes.push({
          url: `${baseUrl}/${locale}/blog/category/${category}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: { languages: blogCatAlternates },
        });
      }
    }
    return routes;
  }

  // ── ID 6: Blog posts (~2,000+ pages, requires DB) ──────────────────
  if (id === 6) {
    try {
      const blogPosts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        select: {
          slug: true,
          translations: true,
          updatedAt: true,
          createdAt: true,
          featured: true,
          _count: { select: { pdfs: true } },
        },
      });

      function calculateBlogPriority(post: { featured?: boolean; _count?: { pdfs: number }; createdAt: Date }): number {
        if (post.featured) return 0.7;
        if (post._count && post._count.pdfs > 0) return 0.6;
        return 0.5;
      }

      return blogPosts.flatMap((post) => {
        const translations = post.translations as any;

        // Only include locales with actual translation content
        // Also exclude entries where the resolved slug would trigger a cross-locale redirect
        const availableLocales = locales.filter((locale) => {
          const translation = translations[locale];
          if (!translation?.title || !translation?.content) return false;
          const resolvedSlug = translation?.slug || post.slug;
          if (!resolvedSlug) return false;
          const nativeLocale = slugToNativeLocale.get(resolvedSlug);
          if (nativeLocale && nativeLocale !== locale) return false;
          return true;
        });

        if (availableLocales.length === 0) return [];

        // Build hreflang alternates across all available locales
        const blogAlternates: Record<string, string> = {};
        for (const loc of availableLocales) {
          const locSlug = translations[loc]?.slug || post.slug;
          blogAlternates[getHreflangCode(loc)] = `${baseUrl}/${loc}/blog/${locSlug}`;
        }
        if (availableLocales.includes('en')) {
          blogAlternates['x-default'] = `${baseUrl}/en/blog/${translations['en']?.slug || post.slug}`;
        } else {
          const fallbackLocale = availableLocales[0];
          blogAlternates['x-default'] = `${baseUrl}/${fallbackLocale}/blog/${translations[fallbackLocale]?.slug || post.slug}`;
        }

        return availableLocales.map((locale) => ({
          url: `${baseUrl}/${locale}/blog/${translations[locale]?.slug || post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: calculateBlogPriority(post),
          alternates: { languages: blogAlternates },
        }));
      });
    } catch (error) {
      console.error('[sitemap/6] Error fetching blog posts:', error);
      return [];
    }
  }

  // Unknown ID
  return [];
}
