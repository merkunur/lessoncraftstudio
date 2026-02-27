import { MetadataRoute } from 'next';
import { productPageSlugs, getAlternateUrls } from '@/config/product-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

// ISR revalidation: sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Fixed date for static/config-derived pages
const STATIC_CONTENT_DATE = new Date('2026-02-27');

/**
 * Two sitemaps after pivot:
 * ID 0: Static pages (~77 URLs) - homepage, apps, legal, etc.
 * ID 1: App detail pages (~363 URLs) - individual app pages with localized slugs
 */
export async function generateSitemaps() {
  return [
    { id: 0 },
    { id: 1 },
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

  // ID 0: Static pages
  if (id === 0) {
    const staticPages = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },
      { path: '/apps', priority: 0.8, changeFreq: 'weekly' as const },
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

  return [];
}
