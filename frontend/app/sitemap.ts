import { MetadataRoute } from 'next';
import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, NSR_PENDING_LOCALES } from '@/config/locales';
import { Axis, getAxisSlug } from '@/lib/taxonomy';
import { prisma } from '@/lib/prisma';
import {
  listNonEmptyAxisKeys,
  topicLastModified,
  listNonEmptyIntersections,
  intersectionLastModified,
} from '@/lib/topic-decks';
// SEO RESCUE Part 2 W1: only authored (genuinely-unique) 2-axis intersections
// belong in the sitemap; thin generic-template pairs are noindex'd in the route
// and omitted here (single SoT shared with the [secondary] route).
import { intersectionIsAuthored } from '@/lib/seo/intersection-authored';

// ISR revalidation: sitemap revalidates every 30 minutes
export const revalidate = 1800;

// Dynamic date from build environment, falls back to static date
const STATIC_CONTENT_DATE = new Date(process.env.BUILD_DATE || '2026-04-04');

// Topic-page locales — single source of truth at frontend/config/topic-locales.ts.
// Mirrors the topic route's TOPIC_LOCALES; honesty-discipline filters
// (listNonEmptyAxisKeys / listNonEmptyIntersections) ensure only (axis, key, locale)
// tuples with ≥1 published deck emit URLs, so adding Tier-3+ locales here is safe.
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
const TOPIC_LOCALES = TOPIC_ENABLED_LOCALES;
type TopicLocale = TopicEnabledLocale;
const TOPIC_AXES: Axis[] = ['exercise-type', 'theme', 'educational-level'];

// Axis-pair canonical-order rank per Arc 6c — theme → educational-level →
// exercise-type. Sitemap emits intersection URLs in canonical order only;
// non-canonical orderings 301-redirect at the route handler.
const AXIS_ORDER_RANK: Record<Axis, number> = {
  theme: 1,
  'educational-level': 2,
  'exercise-type': 3,
};

/**
 * Sitemap-index sharding (Arc 6c, 4 shards) — designed against 55K-deck
 * target per scaling-checkpoint baselines. Hash-partitioning of decks via
 * last-char-ASCII-parity of Deck.id; empirically validated 50/50 split
 * across the synthetic 55K dataset (27,544 vs 27,456).
 *
 * ID 0 — decks-a:        deck pages partition A (~28K at 55K)
 * ID 1 — decks-b:        deck pages partition B (~27K at 55K)
 * ID 2 — intersections:  path-based 2-axis intersection pages (~22K at 55K)
 * ID 3 — other:          static pages + locale roots + single-axis topic pages (~1K)
 *
 * Each shard target ~40K URLs leaves headroom against Google's 50K-per-shard
 * cap for catalog growth. Empty-intersection pruning (per §16.6.1) operates
 * inside shard 2 — only URLs with ≥1 published deck emit.
 */
export async function generateSitemaps() {
  // Phase 4 SEO-thumbnail commission: shards 0 + 1 are served by custom route
  // handlers at app/sitemap/0.xml/route.ts + 1.xml/route.ts (Next.js
  // MetadataRoute.Sitemap doesn't support <image:image> entries inline).
  // Omitting ids 0 + 1 here lets the custom static routes own those URLs;
  // app/sitemap.xml/route.ts (the index) still references all five shards.
  //
  // ID 4 — landings: /[locale]/worksheets/[slug] deck-landing pages (Gate-1
  // browse-layer ruling 2026-06-12). DB-free (per-locale JSON via
  // landing-content.ts); ~25k final URLs across all locales < 50k cap.
  return [
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];
}

/**
 * Last-char-ASCII-parity hash partition. Used by both shard 0 and shard 1
 * to deterministically split the deck inventory. Cross-language stable
 * (same partition assignment in JS + SQL via `ascii(right(id,1)) % 2`).
 */
function deckPartition(id: string): 0 | 1 {
  return (id.charCodeAt(id.length - 1) % 2) as 0 | 1;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';
  const locales = [...SUPPORTED_LOCALES];

  function allLocaleAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const lang of locales) {
      alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}${path}`;
    }
    alternates['x-default'] = `${baseUrl}/en${path}`;
    return alternates;
  }

  // ====================================================================
  // SHARD 0 + 1 — DECK PAGES (hash-partitioned)
  // ====================================================================
  // Phase 4 SEO-thumbnail commission (2026-05-19): shards 0 + 1 are now
  // served by custom route handlers at app/sitemap/0.xml/route.ts +
  // app/sitemap/1.xml/route.ts. Those routes emit per-URL <image:image>
  // entries with xmlns:image namespace (Google's image sitemap protocol).
  // Next.js 14.2.18's MetadataRoute.Sitemap doesn't support image fields,
  // hence the bypass. This branch returns empty so the auto-generated
  // /sitemap/0.xml + /sitemap/1.xml routes from this sitemap.ts produce
  // no content; the static custom routes take precedence in routing.
  if (id === 0 || id === 1) {
    return [];
  }

  // ====================================================================
  // SHARD 2 — INTERSECTION PAGES (path-based 2-axis)
  // ====================================================================
  if (id === 2) {
    try {
      const routes: MetadataRoute.Sitemap = [];
      // Three canonical-order axis pairs per Arc 6c. theme→level→type.
      const PAIRS: Array<[Axis, Axis]> = [
        ['theme', 'educational-level'],
        ['theme', 'exercise-type'],
        ['educational-level', 'exercise-type'],
      ];

      for (const [axis1, axis2] of PAIRS) {
        // PRECOMPUTE: enumerate non-empty intersections ONCE per (axis1, axis2, sib).
        // listNonEmptyIntersections now returns per-tuple lastModified in the
        // same DB call (single findMany + JS aggregation per locale per pair),
        // so we get sibling-honesty + lastmod accuracy in O(pairs × locales) =
        // 33 queries total. Was previously O(363K+) DB queries via N+1 in the
        // per-intersection sibling-check + per-intersection intersectionLastModified
        // calls; both refactored into the single listNonEmptyIntersections pass.
        const sibIntersectionMap = new Map<string, Map<string, Date | null>>();
        for (const sib of TOPIC_LOCALES) {
          try {
            const sibInts = await listNonEmptyIntersections(axis1, axis2, sib);
            const m = new Map<string, Date | null>();
            for (const p of sibInts) m.set(`${p.key1}|${p.key2}`, p.lastModified);
            sibIntersectionMap.set(sib, m);
          } catch (e) {
            console.warn(`[sitemap] sibling intersection enumeration failed (${axis1}×${axis2}, ${sib}):`, (e as Error).message);
            sibIntersectionMap.set(sib, new Map());
          }
        }

        for (const locale of TOPIC_LOCALES) {
          const ownIntersections = sibIntersectionMap.get(locale);
          if (!ownIntersections || ownIntersections.size === 0) continue;

          for (const [tupleKey, tupleLastMod] of ownIntersections) {
            const [key1, key2] = tupleKey.split('|');
            // W1: emit only authored (unique) intersections; thin pairs are noindex'd.
            if (!(await intersectionIsAuthored(locale, key1, key2))) continue;
            const slug1 = getAxisSlug(axis1, key1, locale);
            const slug2 = getAxisSlug(axis2, key2, locale);
            if (!slug1 || !slug2) continue;

            // Hreflang alternates: O(1) Map lookup per sibling.
            // Next.js-route URLs ship without trailing slash (matches
            // `next.config.js: trailingSlash: false`); deck.html nginx
            // URLs keep their slash in the deck-shard route handlers.
            const alternates: Record<string, string> = {};
            for (const sib of TOPIC_LOCALES) {
              const sibSlug1 = getAxisSlug(axis1, key1, sib);
              const sibSlug2 = getAxisSlug(axis2, key2, sib);
              if (!sibSlug1 || !sibSlug2) continue;
              const sibMap = sibIntersectionMap.get(sib);
              if (!sibMap || !sibMap.has(tupleKey)) continue;
              // W1: never advertise a noindex (unauthored) sibling as an hreflang alternate.
              if (!(await intersectionIsAuthored(sib, key1, key2))) continue;
              alternates[getHreflangCode(sib)] =
                `${baseUrl}/${sib}/topic/${sibSlug1}/${sibSlug2}`;
            }
            const enKey = getHreflangCode('en' as TopicLocale);
            if (alternates[enKey]) alternates['x-default'] = alternates[enKey];

            routes.push({
              url: `${baseUrl}/${locale}/topic/${slug1}/${slug2}`,
              lastModified: tupleLastMod ?? STATIC_CONTENT_DATE,
              changeFrequency: 'weekly',
              priority: 0.4,
              alternates: { languages: alternates },
            });
          }
        }
      }

      return routes;
    } catch (err) {
      console.warn('[sitemap] shard 2 (intersections) DB unreachable; emitting empty:', (err as Error).message);
      return [];
    }
  }

  // ====================================================================
  // SHARD 3 — STATIC PAGES + LOCALE ROOTS + SINGLE-AXIS TOPIC PAGES
  // ====================================================================
  if (id === 3) {
    const staticPages = [
      { path: '', priority: 1.0, changeFreq: 'daily' as const },
      // /worksheets hub — the catalog hub + landing browser (Gate-1 browse
      // layer); renders for all 11 locales (type tiles even pre-landings).
      { path: '/worksheets', priority: 0.7, changeFreq: 'weekly' as const },
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

    // Single-axis topic destination pages (preserved from prior shard 0
    // structure pre-Arc-6c; moved here to free shard 0 for deck pages).
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
              if (sibSlug) alternates[getHreflangCode(sib)] = `${baseUrl}/${sib}/topic/${sibSlug}`;
            }
            const enSlug = getAxisSlug(axis, axisKey, 'en');
            if (siblingLocales.includes('en') && enSlug) {
              alternates['x-default'] = `${baseUrl}/en/topic/${enSlug}`;
            } else {
              const fallbackSlug = getAxisSlug(axis, axisKey, siblingLocales[0]);
              if (fallbackSlug) {
                alternates['x-default'] = `${baseUrl}/${siblingLocales[0]}/topic/${fallbackSlug}`;
              }
            }

            const lastMod = await topicLastModified(axis, axisKey, locale);

            routes.push({
              url: `${baseUrl}/${locale}/topic/${slug}`,
              lastModified: lastMod ?? STATIC_CONTENT_DATE,
              changeFrequency: 'weekly',
              priority: 0.5,
              alternates: { languages: alternates },
            });
          }
        }
      }
    } catch (err) {
      console.warn('[sitemap] shard 3 (topic) DB unreachable; skipping topic URLs:', (err as Error).message);
    }

    // CC-pinned activity landing pages — one URL per (manifest row × locale).
    // Read from `mini tools/<engine>-activities.json` via the activities lib;
    // no DB dependency (manifest-driven), so this block is independent of the
    // topic-page try/catch above.
    try {
      const { listActivitySitemapEntries, hreflangAlternatesForRow } = await import('@/lib/activities');
      const acts = await listActivitySitemapEntries();
      for (const a of acts) {
        routes.push({
          url: `${baseUrl}/${a.locale}/activities/${a.slug}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: { languages: await hreflangAlternatesForRow(a.row, baseUrl) },
        });
      }
    } catch (err) {
      console.warn('[sitemap] activity URLs failed; skipping:', (err as Error).message);
    }

    // Curriculum-standards landing pages — one URL per (CC code × locale).
    // Per external SEO audit (2026-05-27): teachers search for codes
    // directly. Each code has a dedicated /[locale]/standards/<code>/
    // page (e.g. /en/standards/K.CC.B.4). Hreflang is symmetric since
    // codes are universal identifiers (not localized).
    try {
      const { listStandardsSitemapEntries, hreflangAlternatesForCode } =
        await import('@/lib/standards');
      const standards = await listStandardsSitemapEntries(TOPIC_LOCALES);
      for (const s of standards) {
        routes.push({
          url: `${baseUrl}/${s.locale}/standards/${s.code}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: hreflangAlternatesForCode(
              s.code,
              TOPIC_LOCALES,
              baseUrl,
            ),
          },
        });
      }
    } catch (err) {
      console.warn(
        '[sitemap] standards URLs failed; skipping:',
        (err as Error).message,
      );
    }

    // Manipulatives landing page — one URL per locale (11 total). Static
    // metadata lives in frontend/lib/manipulatives.ts; no DB or manifest IO.
    try {
      const { landingHreflangAlternates } = await import('@/lib/manipulatives');
      const toolsAlternates = landingHreflangAlternates(baseUrl);
      for (const loc of TOPIC_LOCALES) {
        routes.push({
          url: `${baseUrl}/${loc}/tools`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'monthly',
          priority: 0.5,
          alternates: { languages: toolsAlternates },
        });
      }
    } catch (err) {
      console.warn('[sitemap] tools URLs failed; skipping:', (err as Error).message);
    }

    // Per-tool landing pages — /<locale>/tools/<native-slug> (3 tools × 11
    // locales = 33). Native-language slugs + hreflang per tool from the
    // tool-content files. No DB IO.
    try {
      const { listToolSitemapEntries, hreflangAlternatesForTool } = await import('@/lib/seo/tool-content');
      const toolEntries = await listToolSitemapEntries();
      const hreflangByTool: Record<string, Record<string, string>> = {};
      for (const { locale, slug, toolKey } of toolEntries) {
        if (!hreflangByTool[toolKey]) {
          hreflangByTool[toolKey] = await hreflangAlternatesForTool(toolKey, baseUrl);
        }
        routes.push({
          url: `${baseUrl}/${locale}/tools/${slug}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: { languages: hreflangByTool[toolKey] },
        });
      }
    } catch (err) {
      console.warn('[sitemap] per-tool URLs failed; skipping:', (err as Error).message);
    }

    // Worksheet-maker landing pages — /<locale>/tools/<native-slug> (SEO RESCUE
    // Part 1; pilot = 6 generators × 6 locales). Same /tools/ URL space + native
    // slugs + hreflang as the manipulatives, sourced from maker-content. No DB IO.
    try {
      const { listMakerSitemapEntries, hreflangAlternatesForMaker } = await import('@/lib/seo/maker-content');
      const makerEntries = await listMakerSitemapEntries();
      const hreflangByMaker: Record<string, Record<string, string>> = {};
      for (const { locale, slug, makerKey } of makerEntries) {
        if (!hreflangByMaker[makerKey]) {
          hreflangByMaker[makerKey] = await hreflangAlternatesForMaker(makerKey, baseUrl);
        }
        routes.push({
          url: `${baseUrl}/${locale}/tools/${slug}`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: { languages: hreflangByMaker[makerKey] },
        });
      }
    } catch (err) {
      console.warn('[sitemap] per-maker URLs failed; skipping:', (err as Error).message);
    }

    // Activities + Topics index landings — one URL per locale (11 + 11 = 22).
    // Same hreflang shape: all 11 sibling locales + x-default.
    // Next.js-route paths are no-trailing-slash per `next.config.js:
    // trailingSlash: false`. The helper appends the static basePath
    // (e.g. '/activities') after the locale segment without an additional
    // trailing slash.
    const buildLocaleAlternates = (basePath: string): Record<string, string> => {
      const out: Record<string, string> = {};
      for (const loc of TOPIC_LOCALES) out[loc] = `${baseUrl}/${loc}${basePath}`;
      out['x-default'] = `${baseUrl}/en${basePath}`;
      return out;
    };

    for (const loc of TOPIC_LOCALES) {
      routes.push({
        url: `${baseUrl}/${loc}/activities`,
        lastModified: STATIC_CONTENT_DATE,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages: buildLocaleAlternates('/activities') },
      });
      routes.push({
        url: `${baseUrl}/${loc}/topic`,
        lastModified: STATIC_CONTENT_DATE,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages: buildLocaleAlternates('/topic') },
      });
      // /about/ added Phase 6 of the SEO remediation arc; NSR-flagged
      // locales are noindexed via robots in the route handler — exclude
      // them from the sitemap too so we don't request indexing for pages
      // we've told Google not to index. Hreflang alternates in the
      // indexable entries still reference all 11 locales so the cluster
      // stays consistent (and links work).
      //
      // SoT: `@/config/locales: NSR_PENDING_LOCALES`. The same import is
      // consumed by the About page's `generateMetadata()` — one edit
      // there simultaneously restores robots index AND this sitemap
      // entry. Don't redefine the array here or re-filter it — that's
      // a silent fork.
      if (!(NSR_PENDING_LOCALES as readonly string[]).includes(loc)) {
        routes.push({
          url: `${baseUrl}/${loc}/about`,
          lastModified: STATIC_CONTENT_DATE,
          changeFrequency: 'monthly',
          priority: 0.5,
          alternates: { languages: buildLocaleAlternates('/about') },
        });
      }
    }

    return routes;
  }

  // ====================================================================
  // SHARD 4 — DECK-LANDING PAGES (/[locale]/worksheets/[slug])
  // ====================================================================
  // Gate-1 browse-layer ruling (2026-06-12): the landing tier enters the
  // sitemap as its own shard. DB-FREE — reads the per-locale landing JSON
  // through landing-content.ts (the same SoT the route renders from), so a
  // landing's presence here is exactly its presence on the site (unpublish a
  // landing from the JSON → it drops out of this shard at next revalidate).
  // Hreflang mirrors the landing route's generateMetadata byte-for-byte:
  // siblings matched on (type, mode, theme) via the O(1) coordinate index,
  // alternates built by the same buildHreflangAlternates SoT (pt→pt-BR,
  // x-default→en-else-first). Declares only locales where the sibling
  // actually exists (§17.4 hreflang honesty).
  if (id === 4) {
    try {
      const { getLandingLocales, getAllLandings, getSiblingLandingsByCoordinate } = await import('@/lib/seo/landing-content');
      const { buildHreflangAlternates } = await import('@/lib/seo/hreflang');
      const routes: MetadataRoute.Sitemap = [];
      const landingLocales = getLandingLocales();
      for (const locale of landingLocales) {
        for (const l of getAllLandings(locale)) {
          const slugByLocale: Record<string, string> = { [locale]: l.slug };
          for (const s of getSiblingLandingsByCoordinate(l.coordinate, locale)) slugByLocale[s.locale] = s.slug;
          const languages = buildHreflangAlternates(
            landingLocales,
            (loc) => (slugByLocale[loc] ? `${baseUrl}/${loc}/worksheets/${slugByLocale[loc]}` : null),
            baseUrl,
          );
          routes.push({
            url: `${baseUrl}/${locale}/worksheets/${l.slug}`,
            lastModified: STATIC_CONTENT_DATE,
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: { languages },
          });
        }
      }
      return routes;
    } catch (err) {
      console.warn('[sitemap] shard 4 (landings) failed; emitting empty:', (err as Error).message);
      return [];
    }
  }

  return [];
}
