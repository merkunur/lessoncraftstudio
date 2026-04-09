import { MetadataRoute } from 'next';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { toolPageSlugs, getToolAlternateUrls } from '@/config/tool-page-slugs';
import { bundlePageSlugs, getBundleAlternateUrls } from '@/config/bundle-page-slugs';
import { startPageSlugs, getStartAlternateUrls } from '@/config/start-page-slugs';
import { guidePageSlugs, getGuideAlternateUrls } from '@/config/guide-page-slugs';
import { ideaPageSlugs, getIdeaAlternateUrls } from '@/config/idea-page-slugs';
import { comparePageSlugs, getCompareAlternateUrls } from '@/config/compare-page-slugs';
import { blogPageSlugs, getBlogAlternateUrls } from '@/config/blog-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

// ISR revalidation: sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Dynamic date from build environment, falls back to static date
const STATIC_CONTENT_DATE = new Date(process.env.BUILD_DATE || '2026-04-04');

/**
 * Ten sitemaps (total ~3,232 URLs as of 2026-03-30):
 * ID 0: Static pages (165 URLs) - 15 pages × 11 locales
 * ID 1: App detail pages (330 URLs) - 33 apps × 10 locales (no fi)
 * ID 2: Sales pages (8 URLs) - WarriorPlus product pages (English only)
 * ID 3: Tool pages (330 URLs) - 33 tools × 10 locales (no fi)
 * ID 4: Bundle pages (60 URLs) - 6 bundles × 10 locales (no fi)
 * ID 5: Start pages (114 URLs) - 12 cornerstone guides × 10 locales − 6 (no partial)
 * ID 6: Guide pages (585 URLs) - 65 Create X guides × 9 locales (no no/fi)
 * ID 7: Idea pages (405 URLs) - 45 niche idea pages × 9 locales (no no/fi)
 * ID 8: Compare pages (3 URLs) - comparison pages (English only for now)
 * ID 9: Blog pages (1,232 URLs) - 112 blog posts × 11 locales
 *
 * Image discovery is handled by dedicated image sitemaps at /image-sitemap/{id}
 * (referenced via /image-sitemap-index.xml in robots.txt).
 */
export async function generateSitemaps() {
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 }, // Tool pages (maker/generator intent — distinct from /apps/ worksheets intent)
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 }, // Compare pages (competitor comparison pages)
    { id: 9 }, // Blog pages (seller-focused SEO content)
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

  // ID 0: Static pages (includes hub/listing pages for all page types)
  if (id === 0) {
    const staticPages = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },
      { path: '/apps', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/pricing', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/tools', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/bundles', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/start', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/guides', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/ideas', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/compare', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/blog', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/faq', priority: 0.4, changeFreq: 'monthly' as const },
      { path: '/contact', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/license', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/about', priority: 0.5, changeFreq: 'monthly' as const },
      { path: '/gallery', priority: 0.6, changeFreq: 'weekly' as const },
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

  // ID 1: App detail pages
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

  // ID 2: Sales pages (English only — WarriorPlus audience)
  // ID 2: Reserved (sales pages removed during Lemon Squeezy migration)
  if (id === 2) {
    return [];
  }

  // ID 3: Tool pages (maker/generator intent — separate from /apps/ worksheets intent)
  if (id === 3) {
    const routes: MetadataRoute.Sitemap = [];
    for (const tool of toolPageSlugs) {
      const toolAlternates = getToolAlternateUrls(tool.toolId, baseUrl);
      for (const [locale, slug] of Object.entries(tool.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/tools/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: { languages: toolAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ID 4: Bundle pages (category bundle sales pages)
  if (id === 4) {
    const routes: MetadataRoute.Sitemap = [];
    for (const bundle of bundlePageSlugs) {
      const bundleAlternates = getBundleAlternateUrls(bundle.bundleId, baseUrl);
      for (const [locale, slug] of Object.entries(bundle.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/bundles/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: { languages: bundleAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ID 5: Start pages (cornerstone guide pages)
  if (id === 5) {
    const routes: MetadataRoute.Sitemap = [];
    for (const start of startPageSlugs) {
      const startAlternates = getStartAlternateUrls(start.startId, baseUrl);
      for (const [locale, slug] of Object.entries(start.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/start/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: { languages: startAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ID 6: Guide pages (Create X guide pages)
  if (id === 6) {
    const routes: MetadataRoute.Sitemap = [];
    for (const guide of guidePageSlugs) {
      const guideAlternates = getGuideAlternateUrls(guide.guideId, baseUrl);
      for (const [locale, slug] of Object.entries(guide.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/guides/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: { languages: guideAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ID 7: Idea pages (niche idea pages)
  if (id === 7) {
    const routes: MetadataRoute.Sitemap = [];
    for (const idea of ideaPageSlugs) {
      const ideaAlternates = getIdeaAlternateUrls(idea.ideaId, baseUrl);
      for (const [locale, slug] of Object.entries(idea.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/ideas/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: { languages: ideaAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ID 8: Compare pages (competitor comparison pages)
  if (id === 8) {
    const routes: MetadataRoute.Sitemap = [];
    for (const compare of comparePageSlugs) {
      const compareAlternates = getCompareAlternateUrls(compare.compareId, baseUrl);
      for (const [locale, slug] of Object.entries(compare.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/compare/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: { languages: compareAlternates },
          });
        }
      }
    }
    return routes;
  }

  // ID 9: Blog pages (seller-focused SEO content)
  if (id === 9) {
    const routes: MetadataRoute.Sitemap = [];
    for (const blog of blogPageSlugs) {
      const blogAlternates = getBlogAlternateUrls(blog.blogId, baseUrl);
      for (const [locale, slug] of Object.entries(blog.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/blog/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.6,
            alternates: { languages: blogAlternates },
          });
        }
      }
    }
    return routes;
  }

  return [];
}
