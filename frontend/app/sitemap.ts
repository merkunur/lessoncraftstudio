import { MetadataRoute } from 'next';
import { comparePageSlugs, getCompareAlternateUrls } from '@/config/compare-page-slugs';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

// ISR revalidation: sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Dynamic date from build environment, falls back to static date
const STATIC_CONTENT_DATE = new Date(process.env.BUILD_DATE || '2026-04-04');

/**
 * Sitemaps after seller-era teardown (CLAUDE.md §17.1, Pass 1):
 * ID 0: Static pages — locale roots + preserved utility pages
 * ID 1: Compare pages — competitor comparison pages (English only for now)
 *
 * Removed in Pass 1: app detail, tool, bundle, start, guide, idea, blog
 * sitemaps + the per-app/tool sub-routes. The image-sitemap and video-sitemap
 * subsystems were also deleted (their data sources came from the seller surface).
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

  // ID 0: Static pages — locale roots + preserved utility pages.
  // pricing/about/faq are §17.1 rewrites; their page.tsx files are deleted
  // pending rewrite. Reintroduce them here once new content ships.
  if (id === 0) {
    const staticPages = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },
      { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/contact', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/license', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/gallery', priority: 0.6, changeFreq: 'weekly' as const },
      { path: '/compare', priority: 0.7, changeFreq: 'weekly' as const },
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

  // ID 1: Compare pages (competitor comparison pages)
  if (id === 1) {
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

  return [];
}
