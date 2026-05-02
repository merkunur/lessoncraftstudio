import { MetadataRoute } from 'next';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { Axis, getAxisSlug } from '@/lib/taxonomy';
import { listNonEmptyAxisKeys, topicLastModified } from '@/lib/topic-decks';

// ISR revalidation: sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Dynamic date from build environment, falls back to static date
const STATIC_CONTENT_DATE = new Date(process.env.BUILD_DATE || '2026-04-04');

// Topic-page locales — Tier 1 + Tier 2 per CLAUDE.md §19. Mirrors the topic route's
// generateStaticParams locale set so the sitemap doesn't advertise URLs that
// won't 200. Per F4 honesty discipline (Pass 7b), per-locale topic URLs only emit
// when the (axis, axis-key, locale) tuple has ≥1 published deck — extending
// TOPIC_LOCALES does NOT inflate the sitemap with empty es/nl entries; emission
// is content-gated downstream (see fetchDecksForAxis at the topic route).
const TOPIC_LOCALES = ['en', 'de', 'es', 'nl'] as const;
type TopicLocale = (typeof TOPIC_LOCALES)[number];
const TOPIC_AXES: Axis[] = ['exercise-type', 'theme', 'educational-level'];

/**
 * Sitemaps after seller-era teardown (CLAUDE.md §17.1, Pass 1-4) +
 * taxonomy expansion arc (Pass 7b):
 * ID 0: Static pages — locale roots + preserved utility pages + topic destination pages
 *
 * Removed in Pass 1: app detail, tool, bundle, start, guide, idea, blog
 * sitemaps + the per-app/tool sub-routes. The image-sitemap and video-sitemap
 * subsystems were also deleted (their data sources came from the seller surface).
 *
 * Removed in Pass 4: compare child sitemap (its 3 KDP-keyword comparison
 * entries went with the compare/ route deletion).
 *
 * Added in Pass 7b: topic destination pages at /[locale]/topic/[slug]/ for
 * each non-empty (axis, axis-key, locale) combination. Tier 1 (en+de) only.
 */
export async function generateSitemaps() {
  return [
    { id: 0 },
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

  // ID 0: Static pages + topic destination pages.
  // pricing/about/faq are §17.1 rewrites; their page.tsx files are deleted
  // pending rewrite. Reintroduce them here once new content ships.
  // gallery + compare removed in Pass 4 (seller-era surfaces deleted).
  if (id === 0) {
    const staticPages = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },
      { path: '/terms', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/contact', priority: 0.3, changeFreq: 'monthly' as const },
      { path: '/license', priority: 0.3, changeFreq: 'monthly' as const },
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

    // Topic destination pages (Pass 7b). For each (axis, locale, non-empty axis-key)
    // emit a sitemap entry. hreflang alternates mirror actual sibling existence —
    // only locales that actually have decks for the same axis-key are listed
    // (per CLAUDE.md §17.4: declaring a sibling that doesn't exist is worse than
    // declaring nothing).
    //
    // Build-time DB unreachability is tolerated; topic URLs simply omit from
    // the sitemap until ISR revalidate picks them up. SESSION-STATE.md §10.
    try {
      const nonEmptyByAxisLocale = new Map<string, Set<string>>();
      for (const axis of TOPIC_AXES) {
        for (const locale of TOPIC_LOCALES) {
          const keys = await listNonEmptyAxisKeys(axis, locale);
          nonEmptyByAxisLocale.set(`${axis}::${locale}`, new Set(keys));
        }
      }

      for (const axis of TOPIC_AXES) {
        const axisSiblingMap = new Map<string, TopicLocale[]>();
        for (const locale of TOPIC_LOCALES) {
          const keys = nonEmptyByAxisLocale.get(`${axis}::${locale}`) ?? new Set<string>();
          for (const axisKey of keys) {
            const arr = axisSiblingMap.get(axisKey) ?? [];
            arr.push(locale);
            axisSiblingMap.set(axisKey, arr);
          }
        }

        for (const [axisKey, siblingLocales] of axisSiblingMap.entries()) {
          for (const locale of siblingLocales) {
            const slug = getAxisSlug(axis, axisKey, locale);
            if (!slug) continue;

            const alternates: Record<string, string> = {};
            for (const sib of siblingLocales) {
              const sibSlug = getAxisSlug(axis, axisKey, sib);
              if (sibSlug) alternates[getHreflangCode(sib)] = `${baseUrl}/${sib}/topic/${sibSlug}/`;
            }
            const enSlug = getAxisSlug(axis, axisKey, 'en');
            if (siblingLocales.includes('en') && enSlug) {
              alternates['x-default'] = `${baseUrl}/en/topic/${enSlug}/`;
            } else {
              const fallbackSlug = getAxisSlug(axis, axisKey, siblingLocales[0]);
              if (fallbackSlug) {
                alternates['x-default'] = `${baseUrl}/${siblingLocales[0]}/topic/${fallbackSlug}/`;
              }
            }

            const lastMod = await topicLastModified(axis, axisKey, locale);

            routes.push({
              url: `${baseUrl}/${locale}/topic/${slug}/`,
              lastModified: lastMod ?? STATIC_CONTENT_DATE,
              changeFrequency: 'weekly',
              priority: 0.5,
              alternates: { languages: alternates },
            });
          }
        }
      }
    } catch (err) {
      console.warn('[sitemap] topic emission DB unreachable; skipping topic URLs:', (err as Error).message);
    }

    return routes;
  }

  return [];
}
