import { MetadataRoute } from 'next';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { toolPageSlugs, getToolAlternateUrls } from '@/config/tool-page-slugs';
import { bundlePageSlugs, getBundleAlternateUrls } from '@/config/bundle-page-slugs';
import { startPageSlugs, getStartAlternateUrls } from '@/config/start-page-slugs';
import { guidePageSlugs, getGuideAlternateUrls } from '@/config/guide-page-slugs';
import { ideaPageSlugs, getIdeaAlternateUrls } from '@/config/idea-page-slugs';
import { getAllSalesPageSlugs } from '@/config/sales-pages';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

// ISR revalidation: sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Fixed date for static/config-derived pages
const STATIC_CONTENT_DATE = new Date('2026-02-27');

/**
 * Eight sitemaps:
 * ID 0: Static pages (~88 URLs) - homepage, apps, tools, bundles, start, guides, ideas, legal
 * ID 1: App detail pages (~363 URLs) - individual app pages with localized slugs
 * ID 2: Sales pages (5 URLs) - WarriorPlus product pages (English only)
 * ID 3: Tool pages (~363 URLs) - free tool landing pages
 * ID 4: Bundle pages (~66 URLs) - category bundle sales pages
 * ID 5: Start pages (~132 URLs) - cornerstone guide pages
 * ID 6: Guide pages (~715 URLs) - Create X guide pages
 * ID 7: Idea pages (~495 URLs) - niche idea pages
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
    { id: 7 },
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
      { path: '/tools', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/bundles', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/start', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/guides', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/ideas', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/faq', priority: 0.4, changeFreq: 'monthly' as const },
      { path: '/contact', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/license', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/about', priority: 0.5, changeFreq: 'monthly' as const },
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
  if (id === 2) {
    const slugs = getAllSalesPageSlugs();
    return slugs.map((slug) => ({
      url: `${baseUrl}/en/get/${slug}`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  }

  // ID 3: Tool pages (free tool landing pages)
  if (id === 3) {
    const routes: MetadataRoute.Sitemap = [];
    for (const tool of toolPageSlugs) {
      const toolAlternates = getToolAlternateUrls(tool.appId, baseUrl);
      for (const [locale, slug] of Object.entries(tool.slugs)) {
        if (slug) {
          routes.push({
            url: `${baseUrl}/${locale}/tools/${slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'weekly',
            priority: 0.9,
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
      const startAlternates = getStartAlternateUrls(start.guideId, baseUrl);
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

  return [];
}
