/* /[locale]/worksheets/ — All worksheets gateway page.
   Public, SSR. Mirrors the /[locale]/worksheet-makers/ pattern but
   surfaces one published-deck sample per exercise type in the current
   locale, each tile linking to its corresponding native-language topic
   page (/[locale]/topic/<native-slug>/).

   v2: chrome strings localized across all 11 site locales via
   worksheetsPage namespace (commit 2026-05-24). Routing + tile data +
   topic links were already locale-aware in v1; this completes the
   localization. NSR-flag deferred review for SV/DA/NO/FI per §17.5.1
   Nordic+Finnic doctrine. */

import { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { wwwImg } from '@/lib/img-host';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getAxisSlug, getAxisName } from '@/lib/taxonomy';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import PageUsageBlock from '@/components/catalog/PageUsageBlock';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl, withParam } from '@/components/catalog/filterUrl';
import { getAllLandings, deckAssets, Landing } from '@/lib/seo/landing-content';

const BASE_URL = CANONICAL_HOST;

// Brand-only 1200×630 OG asset shared with the homepage (Direction A
// palette). Reused on worksheets hub + topic + activities pages until
// per-surface OG composites are commissioned separately.
const OG_IMAGE_PATH = '/og-homepage.png';

// Substrate-honesty floor — only locales with genuine catalog depth (en /
// es / it / pt today) get the "Hundreds…" variant. Seed-only locales fall
// to the safer copy until Track C deck-publish lands per CLAUDE.md §19.5.
const HUNDREDS_THRESHOLD = 100;

interface Tile {
  exerciseType: string;
  typeName: string;
  typeSlug: string;
  thumbnailUrl: string;
  deckTitle: string;
}

async function countLocaleDecks(locale: string): Promise<number> {
  try {
    return await prisma.deck.count({
      where: { language: locale, status: 'published' },
    });
  } catch {
    return 0;
  }
}

// ISR: pick up newly-published decks without a rebuild; match homepage/topic/activity
// (previously defaulted to on-demand → a DB hit per request).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const total = await countLocaleDecks(locale);
  const useHundreds = total >= HUNDREDS_THRESHOLD;
  const t = await getTranslations({ locale, namespace: 'worksheetsPage' });

  const title = useHundreds ? t('metaTitle.hundreds') : t('metaTitle.safer');
  const description = useHundreds ? t('metaDescription.hundreds') : t('metaDescription.safer');
  const canonical = canonicalUrl(localePath(locale, 'worksheets'));

  // Reciprocal hreflang × 11 + x-default — every locale renders the same
  // worksheets-hub surface, so unconditional alternates are correct here
  // (unlike topic pages where presence depends on per-axis deck count).
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = canonicalUrl(localePath(lang, 'worksheets'));
  }
  hreflangAlternates['x-default'] = canonicalUrl(localePath('en', 'worksheets'));

  return {
    title: `${title}`,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [
        {
          url: `${CANONICAL_HOST}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: `${CANONICAL_HOST}${OG_IMAGE_PATH}`, alt: 'LessonCraftStudio — K-3 worksheets in 11 languages' }],
    },
    robots: { index: true, follow: true },
  };
}

// Landing-browser constants (Gate-1 browse-layer ruling 2026-06-12).
// Query-string facets per §16.5.4 (universal English-canonical values; URL =
// state; canonical stays the BARE hub — filters are non-indexable by
// construction). Page size matches TOPIC_PAGE_SIZE convention.
const BROWSE_PAGE_SIZE = 24;
const BROWSE_TOP_THEMES = 12;
// Display labels for landing level keys (per-locale band spines). A display-
// only duplicate of the [slug] route's LEVELS chips (route files can't export
// extra symbols) — fold both into a shared lib at the next LEVELS touch.
const LEVEL_CHIP: Record<string, string> = {
  preschool: 'Preschool', kindergarten: 'Kindergarten', 'grade-1': 'Grade 1', 'grade-2': 'Grade 2',
  vorschule: 'Vorschule', '1-klasse': '1. Klasse', '2-klasse': '2. Klasse',
  preescolar: 'Preescolar', primer: 'Primer grado', segundo: 'Segundo grado',
  forskola: 'Förskola', 'ak-1': 'Åk 1', 'ak-2': 'Åk 2',
  kleuters: 'Kleuters', 'groep-3': 'Groep 3', 'groep-4': 'Groep 4',
};
function levelChip(key: string): string {
  return LEVEL_CHIP[key] || key;
}
function themeLabel(themeKey: string, locale: string): string {
  if (!themeKey) return '';
  if (themeKey.includes('-vs-')) {
    return themeKey.split('-vs-').map((k) => getAxisName('theme', k, locale) || k).join(' · ');
  }
  return getAxisName('theme', themeKey, locale) || themeKey;
}

export default async function AllWorksheetsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { type?: string; level?: string; theme?: string; page?: string; themes?: string };
}) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'worksheetsPage' });

  let tiles: Tile[] = [];
  let totalCount = 0;
  try {
    const [decks, count] = await Promise.all([
      prisma.deck.findMany({
        where: { language: locale, status: 'published' },
        distinct: ['exerciseType'],
        select: {
          slug: true,
          exerciseType: true,
          thumbnailUrl: true,
          title: true,
          language: true,
        },
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      }),
      prisma.deck.count({ where: { language: locale, status: 'published' } }),
    ]);
    totalCount = count;

    tiles = decks
      .map((d) => {
        const titleMap = (d.title ?? {}) as Record<string, string>;
        return {
          exerciseType: d.exerciseType,
          typeName: getAxisName('exercise-type', d.exerciseType, locale) ?? d.exerciseType,
          typeSlug: getAxisSlug('exercise-type', d.exerciseType, locale) ?? d.exerciseType,
          thumbnailUrl: d.thumbnailUrl,
          deckTitle: titleMap[locale] || titleMap.en || d.slug,
        };
      })
      .filter((t) => t.typeName)
      .sort((a, b) => a.typeName.localeCompare(b.typeName, locale));
  } catch (err) {
    console.warn('[AllWorksheetsPage] DB query failed:', (err as Error).message);
  }

  const useHundreds = totalCount >= HUNDREDS_THRESHOLD;
  const h1 = useHundreds ? t('h1.hundreds') : t('h1.safer');
  const intro = useHundreds ? t('intro.hundreds') : t('intro.safer');

  // R13 — structured data for the worksheets hub (was zero JSON-LD).
  // CollectionPage + ItemList (wraps the exercise-type tiles) + BreadcrumbList.
  const canonical = canonicalUrl(localePath(locale, 'worksheets'));
  const collectionSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h1,
    description: intro,
    inLanguage: locale,
    isAccessibleForFree: true,
    url: canonical,
  };
  if (tiles.length > 0) {
    collectionSchema.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: tiles.length,
      itemListElement: tiles.map((tile, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tile.typeName,
        url: canonicalUrl(localePath(locale, 'topic', tile.typeSlug)),
      })),
    };
  }
  // ---- landing browser model (Gate-1 browse layer) ----
  // Renders ONLY for locales with published landings (substrate honesty —
  // unled locales keep the tiles-only hub). Filters are SSR over the
  // in-memory landing arrays (microseconds at 2.5k entries).
  const allLandings = getAllLandings(locale);
  const fType = searchParams?.type || '';
  const fLevel = searchParams?.level || '';
  const fTheme = searchParams?.theme || '';
  const showAllThemes = searchParams?.themes === 'all';
  const browseActive = Boolean(fType || fLevel || fTheme);
  let browse: {
    types: Array<{ key: string; label: string }>;
    levels: Array<{ key: string; label: string }>;
    themes: Array<{ key: string; label: string }>;
    pageItems: Landing[];
    total: number;
    page: number;
    pageCount: number;
    paramsString: string;
  } | null = null;
  if (allLandings.length > 0) {
    const typeSet = new Map<string, number>();
    const levelSet = new Map<string, number>();
    const themeSet = new Map<string, number>();
    for (const l of allLandings) {
      typeSet.set(l.coordinate.type, (typeSet.get(l.coordinate.type) || 0) + 1);
      levelSet.set(l.coordinate.level, (levelSet.get(l.coordinate.level) || 0) + 1);
      // themeless coordinates exist at runtime (es math-worksheet class carries
      // theme:null despite the declared type) — they are unfilterable by theme.
      if (l.coordinate.theme) themeSet.set(l.coordinate.theme, (themeSet.get(l.coordinate.theme) || 0) + 1);
    }
    const types = [...typeSet.keys()]
      .map((key) => ({ key, label: getAxisName('exercise-type', key, locale) || key }))
      .sort((a, b) => a.label.localeCompare(b.label, locale));
    const levels = [...levelSet.keys()].map((key) => ({ key, label: levelChip(key) })).sort((a, b) => a.label.localeCompare(b.label, locale));
    const themesAll = [...themeSet.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([key]) => ({ key, label: themeLabel(key, locale) }));
    // top-N by count + expand (FilterSidebar precedent); the active theme always stays visible
    let themes = showAllThemes ? themesAll : themesAll.slice(0, BROWSE_TOP_THEMES);
    if (fTheme && !themes.some((th) => th.key === fTheme)) {
      const active = themesAll.find((th) => th.key === fTheme);
      if (active) themes = [...themes, active];
    }
    let filtered = allLandings;
    if (fType) filtered = filtered.filter((l) => l.coordinate.type === fType);
    if (fLevel) filtered = filtered.filter((l) => l.coordinate.level === fLevel);
    if (fTheme) filtered = filtered.filter((l) => l.coordinate.theme === fTheme);
    filtered = filtered.slice().sort((a, b) => (a.slug < b.slug ? -1 : 1));
    const total = filtered.length;
    const pageCount = Math.max(1, Math.ceil(total / BROWSE_PAGE_SIZE));
    const page = Math.min(Math.max(1, parseInt(searchParams?.page || '1', 10) || 1), pageCount);
    const pageItems = filtered.slice((page - 1) * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE);
    const sp = new URLSearchParams();
    if (fType) sp.set('type', fType);
    if (fLevel) sp.set('level', fLevel);
    if (fTheme) sp.set('theme', fTheme);
    if (showAllThemes) sp.set('themes', 'all');
    if (page > 1) sp.set('page', String(page));
    browse = { types, levels, themes, pageItems, total, page, pageCount, paramsString: sp.toString() };
  }
  const tBrowse = browse ? await getTranslations({ locale, namespace: 'worksheetsPage.browse' }) : null;

  // Bare-state landing ItemList (first browse page) — extends the hub's
  // structured data with the landing tier; filtered states emit none
  // (canonical points at the bare hub anyway).
  if (browse && !browseActive && browse.page === 1) {
    collectionSchema.hasPart = {
      '@type': 'ItemList',
      numberOfItems: browse.pageItems.length,
      itemListElement: browse.pageItems.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.h1,
        url: canonicalUrl(localePath(locale, 'worksheets', l.slug)),
      })),
    };
  }

  const [tBreadcrumb, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTranslations({ locale, namespace: 'nav.categories' }),
  ]);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: tNav('worksheets'), path: localePath(locale, 'worksheets') },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        {h1}
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl">
        {intro}
      </p>

      {tiles.length === 0 ? (
        <div className="bg-cream-50 border border-cream-300 rounded-lg p-10 md:p-12 text-center max-w-2xl mx-auto">
          <p className="font-display font-semibold text-xl text-ink-900 mb-3">
            {t('emptyTitle')}
          </p>
          <p className="text-ink-600">
            {t('emptyBody')}
          </p>
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {tiles.map((tile) => (
              <Link
                key={tile.exerciseType}
                href={`/${locale}/topic/${tile.typeSlug}/`}
                className="group bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-terracotta-400 rounded-lg overflow-hidden transition-colors block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-100 border-b border-cream-300">
                  {/* next/image: the lessoncraftstudio.com CDN host IS registered
                      in next.config images.domains, so the optimizer serves a
                      resized WebP/AVIF (~15-25KB) instead of the full 480x620 PNG
                      (~150KB). The publish-time thumbnail.png is full-size, not
                      display-sized — this is the per-page-speed-audit fix. */}
                  <Image
                    src={wwwImg(tile.thumbnailUrl)}
                    alt={t('tileAlt', { typeName: tile.typeName })}
                    fill
                    sizes="(max-width:767px) 45vw, (max-width:1023px) 30vw, 240px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-display font-semibold text-base md:text-lg text-ink-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                    {tile.typeName}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
                    {t('tileCta')}
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* landing browser (Gate-1 browse layer) — SSR query-string facets over the landing tier.
          Filter chips are plain <Link>s (no client JS); URL = state; canonical stays the bare hub
          so filtered states are non-indexable by construction. Section absent for unled locales. */}
      {browse && tBrowse && (
        <section className="mt-16" aria-labelledby="landing-browse-heading">
          <h2 id="landing-browse-heading" className="font-display font-semibold text-2xl md:text-3xl text-ink-900 mb-6">
            {tBrowse('heading')}
          </h2>
          {(() => {
            const base = `/${locale}/worksheets`;
            const cur = new URLSearchParams(browse!.paramsString);
            const chip = (href: string, label: string, active: boolean, key: string) => (
              <Link key={key} href={href}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm border transition-colors ${active
                  ? 'bg-teal-700 border-teal-700 text-white'
                  : 'bg-cream-50 border-cream-300 text-ink-700 hover:border-terracotta-400'}`}>
                {label}
              </Link>
            );
            const group = (label: string, param: 'type' | 'level' | 'theme', items: Array<{ key: string; label: string }>, activeKey: string, extra?: ReactNode) => (
              <div className="mb-3">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-ink-500 mr-3 w-28 align-middle">{label}</span>
                <span className="inline-flex flex-wrap gap-2 align-middle">
                  {chip(buildFilterUrl(base, withParam(withParam(cur, param, null), 'page', null)), tBrowse('all'), !activeKey, `${param}-all`)}
                  {items.map((it) => chip(
                    buildFilterUrl(base, withParam(withParam(cur, param, it.key === activeKey ? null : it.key), 'page', null)),
                    it.label, it.key === activeKey, `${param}-${it.key}`,
                  ))}
                  {extra}
                </span>
              </div>
            );
            return (
              <div className="mb-8">
                {group(tBrowse('filterLevel'), 'level', browse!.levels, fLevel)}
                {group(tBrowse('filterType'), 'type', browse!.types, fType)}
                {group(tBrowse('filterTheme'), 'theme', browse!.themes, fTheme,
                  !showAllThemes ? (
                    <Link key="themes-all" href={buildFilterUrl(base, withParam(cur, 'themes', 'all'))}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm text-terracotta-600 hover:text-terracotta-700 underline">
                      {tBrowse('showAllThemes')}
                    </Link>
                  ) : null)}
                <p className="text-sm text-ink-500 mt-2">{tBrowse('results', { count: browse!.total })}</p>
              </div>
            );
          })()}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {browse.pageItems.map((l) => {
              const thumb = deckAssets(locale, l.canonicalDeckSlug).thumbnail;
              return (
                <Link key={l.slug} href={localePath(locale, 'worksheets', l.slug)}
                  className="group bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-terracotta-400 rounded-lg overflow-hidden transition-colors block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-cream-100 border-b border-cream-300">
                    <Image src={wwwImg(thumb)} alt={l.h1} fill
                      sizes="(max-width:767px) 45vw, (max-width:1023px) 30vw, 240px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#D9633A]">{levelChip(l.coordinate.level)}</p>
                    <p className="font-display font-semibold text-[15px] text-ink-900 leading-snug mt-1 group-hover:text-terracotta-600 transition-colors">{l.h1}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination locale={locale} currentPage={browse.page} pageCount={browse.pageCount}
            basePath={`/${locale}/worksheets`} searchParamsString={browse.paramsString} />
        </section>
      )}

      <PageUsageBlock locale={locale} variant="hub" />
      </main>
    </>
  );
}
