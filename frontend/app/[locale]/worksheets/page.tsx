/* /[locale]/worksheets/ — All worksheets hub.
   Public, SSR. Redesigned 2026-07-06 to the Direction A faceted catalog
   (the /[locale]/activities/ pattern): left Level / Exercise type / Theme
   filter rail + sort + a responsive grid of paper cards over the per-locale
   landing tier, all state in the URL (shareable + crawlable, canonical stays
   the bare hub). Default sort = 'variety' — a deterministic round-robin
   interleave across exercise types so page 1 shows ~24 DISTINCT worksheet
   mechanics instead of one type walled across many themes.

   The former tier of ~60 giant per-exercise-type image tiles became a compact
   text-chip strip ("Browse by exercise type") below the grid — every hub→topic
   crawl link survives (§1 crawl-bait doctrine) at ~2KB HTML instead of 60
   /_next/image requests. Together with lazy card images + prefetch={false}
   links this keeps the page under the nginx per-IP burst that was 429ing a
   random subset of thumbnails per refresh (broken-thumbnails fix 2026-07-06).

   v2 (2026-05-24) localized the chrome via the worksheetsPage namespace;
   v3 keeps that namespace + reuses topicPage.{facets,sort,activeFilters,
   emptyState} for the catalog chrome (2 new keys only). */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getAxisSlug, getAxisName } from '@/lib/taxonomy';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { wwwImg } from '@/lib/img-host';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import PageUsageBlock from '@/components/catalog/PageUsageBlock';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl, withParam, withoutParam } from '@/components/catalog/filterUrl';
import {
  CatalogSidebar,
  CatalogMobileFilters,
  CatalogSortControl,
  CatalogActiveChips,
  CatalogEmptyState,
  type FacetGroupVM,
} from '@/components/catalog/CatalogFilters';
import WorksheetCatalogCard from '@/components/worksheets/WorksheetCatalogCard';
import { getMonolingualLandings, deckAssets } from '@/lib/seo/landing-content';
import { NEW_WORKSHEET_LANDINGS } from '@/config/worksheets-new-highlights';
import {
  WORKSHEETS_PAGE_SIZE,
  WORKSHEETS_TOP_THEMES,
  parseWorksheetFilters,
  applyLandingFilters,
  buildLandingFacets,
  sortLandings,
  worksheetSubject,
  levelChip,
  levelOrder,
  themeLabel,
} from '@/lib/worksheets-catalog';
import '@/styles/catalog-cards.css';

const BASE_URL = CANONICAL_HOST;

// Brand-only 1200×630 OG asset shared with the homepage (Direction A
// palette). Reused on worksheets hub + topic + activities pages until
// per-surface OG composites are commissioned separately.
const OG_IMAGE_PATH = '/og-homepage.png';

// Substrate-honesty floor — only locales with genuine catalog depth (en /
// es / it / pt today) get the "Hundreds…" variant. Seed-only locales fall
// to the safer copy until Track C deck-publish lands per CLAUDE.md §19.5.
const HUNDREDS_THRESHOLD = 100;

// First-row cards load eagerly (fills the above-fold row at xl 4-col); the
// rest are lazy so the initial /_next/image burst stays tiny (rate-limit
// frugality — see header comment).
const EAGER_CARDS = 6;

// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route,
// like the activities index. latin-ext covers all 11 site locales.
const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
});
const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
});

interface Tile {
  exerciseType: string;
  typeName: string;
  typeSlug: string;
}

async function countLocaleDecks(locale: string): Promise<number> {
  try {
    return await prisma.deck.count({
      where: { language: locale, status: 'published', contentLanguage: null },
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
    robots: INDEXABLE_ROBOTS,
  };
}

function toSearchParamsString(sp: Record<string, string | string[] | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
    else p.append(k, v);
  }
  return p.toString();
}

export default async function AllWorksheetsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { type?: string; level?: string; theme?: string; page?: string; themes?: string; sort?: string };
}) {
  const locale = params.locale || 'en';
  const [t, tBrowse, tFacets, tSort, tActive, tEmpty, tBreadcrumb, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'worksheetsPage' }),
    getTranslations({ locale, namespace: 'worksheetsPage.browse' }),
    getTranslations({ locale, namespace: 'topicPage.facets' }),
    getTranslations({ locale, namespace: 'topicPage.sort' }),
    getTranslations({ locale, namespace: 'topicPage.activeFilters' }),
    getTranslations({ locale, namespace: 'topicPage.emptyState' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTranslations({ locale, namespace: 'nav.categories' }),
  ]);

  // ---- exercise-type strip data (one row per published type; text-only,
  // links to the native-language /topic/ pages — crawl equity per §1). ----
  let tiles: Tile[] = [];
  let totalCount = 0;
  try {
    const [decks, count] = await Promise.all([
      prisma.deck.findMany({
        // contentLanguage: null — exclude cross-language decks (they live in /learn).
        where: { language: locale, status: 'published', contentLanguage: null },
        distinct: ['exerciseType'],
        select: { exerciseType: true },
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      }),
      prisma.deck.count({ where: { language: locale, status: 'published', contentLanguage: null } }),
    ]);
    totalCount = count;

    tiles = decks
      .map((d) => ({
        exerciseType: d.exerciseType,
        typeName: getAxisName('exercise-type', d.exerciseType, locale) ?? d.exerciseType,
        typeSlug: getAxisSlug('exercise-type', d.exerciseType, locale) ?? d.exerciseType,
      }))
      .filter((tile) => tile.typeName)
      .sort((a, b) => a.typeName.localeCompare(b.typeName, locale));
  } catch (err) {
    console.warn('[AllWorksheetsPage] DB query failed:', (err as Error).message);
  }

  const useHundreds = totalCount >= HUNDREDS_THRESHOLD;
  const h1 = useHundreds ? t('h1.hundreds') : t('h1.safer');
  const intro = useHundreds ? t('intro.hundreds') : t('intro.safer');

  // ---- faceted landing catalog (SSR over the in-memory landing arrays —
  // microseconds at 2.5k entries; absent for unled locales = substrate honesty). ----
  const allLandings = getMonolingualLandings(locale);
  const filters = parseWorksheetFilters(searchParams ?? {});
  const browseActive = Boolean(filters.type || filters.level || filters.theme);
  const basePath = `/${locale}/worksheets`;
  const spString = toSearchParamsString(searchParams ?? {});

  const facets = allLandings.length > 0 ? buildLandingFacets(allLandings, filters) : null;

  let facetGroups: FacetGroupVM[] = [];
  if (facets) {
    const levelItems = facets.level
      .map(({ value, count }) => ({
        paramKey: 'level',
        value,
        label: levelChip(value, locale),
        count,
        active: filters.level === value,
      }))
      .sort((a, b) => levelOrder(a.value) - levelOrder(b.value) || a.label.localeCompare(b.label, locale));

    const typeItems = facets.type
      .map(({ value, count }) => ({
        paramKey: 'type',
        value,
        label: getAxisName('exercise-type', value, locale) || value,
        count,
        active: filters.type === value,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, locale));

    // Themes: top-N by count + expand (the active theme always stays visible).
    const themesAll = facets.theme.slice().sort((a, b) => b.count - a.count);
    let themesShown = filters.showAllThemes ? themesAll : themesAll.slice(0, WORKSHEETS_TOP_THEMES);
    if (filters.theme && !themesShown.some((th) => th.value === filters.theme)) {
      const active = themesAll.find((th) => th.value === filters.theme);
      if (active) themesShown = [...themesShown, active];
    }
    const themeItems = themesShown.map(({ value, count }) => ({
      paramKey: 'theme',
      value,
      label: themeLabel(value, locale),
      count,
      active: filters.theme === value,
    }));
    const themeFooter =
      !filters.showAllThemes && themesAll.length > WORKSHEETS_TOP_THEMES
        ? {
            href: buildFilterUrl(basePath, withParam(new URLSearchParams(spString), 'themes', 'all')),
            label: tBrowse('showAllThemes'),
          }
        : undefined;

    facetGroups = [
      { key: 'level', heading: tBrowse('filterLevel'), items: levelItems },
      { key: 'type', heading: tBrowse('filterType'), items: typeItems },
      { key: 'theme', heading: tBrowse('filterTheme'), items: themeItems, footer: themeFooter },
    ];
  }

  // Filter → variety/alpha sort → paginate.
  const filtered = sortLandings(
    applyLandingFilters(allLandings, { type: filters.type, level: filters.level, theme: filters.theme }),
    locale,
    filters.sort,
    filters.type,
  );
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / WORKSHEETS_PAGE_SIZE));
  // Out-of-range page => 404, not a clamp. Clamping made `?page=101` and
  // `?page=999` both return HTTP 200 serving an identical copy of the last real
  // page (measured 2026-07-31: page 100, 101 and 999 all 200 with the same 17
  // links), i.e. an unbounded crawl space of duplicate pages. The canonical
  // already points at page 1, but a crawler still has to fetch each one to learn
  // that. 404 tells it there is nothing there.
  if (filters.page > pageCount) notFound();
  const page = filters.page;
  const pageItems = filtered.slice((page - 1) * WORKSHEETS_PAGE_SIZE, page * WORKSHEETS_PAGE_SIZE);

  // "New worksheets" strip — bare hub state only (page 1, no filters, default
  // sort). The variety grid orders type buckets by SIZE, so a fresh batch of
  // single-landing families lands on pages 2-3 and is invisible on the first
  // screen; this strip surfaces the newest batch above the main grid. Slugs
  // that no longer exist in the corpus are dropped silently (config is a
  // highlight list, not a contract).
  const newHighlights =
    !browseActive && page === 1 && filters.sort === 'variety'
      ? (NEW_WORKSHEET_LANDINGS[locale] || [])
          .map((s) => allLandings.find((l) => l.slug === s))
          .filter((l): l is NonNullable<typeof l> => Boolean(l))
      : [];

  // Active-filter chips + clear-all.
  const removeHref = (key: string) => {
    const next = withoutParam(new URLSearchParams(spString), key);
    next.delete('page');
    return buildFilterUrl(basePath, next);
  };
  const chips: { label: string; removeHref: string }[] = [];
  if (filters.level) chips.push({ label: levelChip(filters.level, locale), removeHref: removeHref('level') });
  if (filters.type)
    chips.push({ label: getAxisName('exercise-type', filters.type, locale) || filters.type, removeHref: removeHref('type') });
  if (filters.theme) chips.push({ label: themeLabel(filters.theme, locale), removeHref: removeHref('theme') });
  const clearAllHref = (() => {
    const next = new URLSearchParams(spString);
    ['type', 'level', 'theme', 'themes', 'sort', 'page'].forEach((k) => next.delete(k));
    return buildFilterUrl(basePath, next);
  })();

  const sortOptions = [
    { value: 'variety', label: tBrowse('sortVariety') },
    { value: 'az', label: tSort('alphaAsc') },
    { value: 'za', label: tSort('alphaDesc') },
  ];

  // ---- Lever A (2026-07-22): complete crawlable facet directory. The filter
  // sidebar gates themes behind a JS "show all" and its links depend on filter
  // state; this always-rendered <a> directory links EVERY theme + level to its
  // filtered hub view (`?theme=X` / `?level=Y`) so every facet — and thus every
  // landing, ≤2 hops from this home/footer/nav-linked hub — is shallow-crawlable.
  // The /worksheets analog of a topic hub's cross-axis fan-out. Additive links
  // only; canonical stays the bare hub, no metadata change (§21.5a-safe). ----
  const dirThemes = (() => {
    const m = new Map<string, number>();
    for (const l of allLandings) if (l.coordinate.theme) m.set(l.coordinate.theme, (m.get(l.coordinate.theme) || 0) + 1);
    return [...m.entries()].sort(
      (a, b) => b[1] - a[1] || themeLabel(a[0], locale).localeCompare(themeLabel(b[0], locale), locale),
    );
  })();
  const dirLevels = (() => {
    const m = new Map<string, number>();
    for (const l of allLandings) m.set(l.coordinate.level, (m.get(l.coordinate.level) || 0) + 1);
    return [...m.entries()].sort((a, b) => levelOrder(a[0]) - levelOrder(b[0]));
  })();
  const facetHref = (key: string, value: string) =>
    buildFilterUrl(basePath, withParam(new URLSearchParams(), key, value));

  // ---- structured data (R13): CollectionPage + ItemList + BreadcrumbList. ----
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
  // Bare-state landing ItemList (first catalog page, variety order — still
  // deterministic); filtered states emit none (canonical is the bare hub).
  if (allLandings.length > 0 && !browseActive && page === 1 && filters.sort === 'variety') {
    collectionSchema.hasPart = {
      '@type': 'ItemList',
      numberOfItems: pageItems.length,
      itemListElement: pageItems.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.h1,
        url: canonicalUrl(localePath(locale, 'worksheets', l.slug)),
      })),
    };
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: tNav('worksheets'), path: localePath(locale, 'worksheets') },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main
        className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}
      >
        <div className="mx-auto max-w-6xl">
          <BreadcrumbTrail locale={locale} trail={[{ label: tNav('worksheets') }]} />

          <header className="mb-7 md:mb-9 max-w-3xl">
            <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">
              {h1}
            </h1>
            <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
            <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">
              {intro}
            </p>
          </header>

          {allLandings.length === 0 && tiles.length === 0 ? (
            <div className="actcat-card-flat rounded-3xl p-10 md:p-12 text-center max-w-2xl mx-auto">
              <p className="font-lcsDisplay font-bold text-xl text-lcs-teal mb-3">{t('emptyTitle')}</p>
              <p className="font-lcsBody text-lcs-teal/70">{t('emptyBody')}</p>
            </div>
          ) : (
            allLandings.length > 0 && (
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <CatalogSidebar heading={tFacets('heading')} groups={facetGroups} basePath={basePath} spString={spString} />

                <div className="lg:col-span-9">
                  <CatalogMobileFilters heading={tFacets('heading')} groups={facetGroups} basePath={basePath} spString={spString} />

                  {newHighlights.length > 0 && (
                    <section className="mb-9 md:mb-11" aria-labelledby="new-worksheets-heading">
                      <h2
                        id="new-worksheets-heading"
                        className="font-lcsDisplay font-bold text-xl md:text-2xl text-lcs-teal mb-4"
                      >
                        {t('newHeading')}
                      </h2>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {newHighlights.map((l, i) => (
                          <WorksheetCatalogCard
                            key={`new-${l.slug}`}
                            href={localePath(locale, 'worksheets', l.slug)}
                            thumbnailSrc={wwwImg(deckAssets(locale, l.canonicalDeckSlug).thumbnail)}
                            title={l.h1}
                            levelLabel={levelChip(l.coordinate.level, locale)}
                            typeLabel={getAxisName('exercise-type', l.coordinate.type, locale) || l.coordinate.type}
                            subject={worksheetSubject(l.coordinate.type)}
                            ctaLabel={t('tileCta')}
                            eager={i < EAGER_CARDS}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
                    <p className="font-lcsBody text-sm font-semibold text-lcs-teal/70">
                      {tBrowse('results', { count: total })}
                    </p>
                    <CatalogSortControl
                      heading={tSort('heading')}
                      options={sortOptions}
                      current={filters.sort}
                      basePath={basePath}
                      spString={spString}
                      defaultValue="variety"
                    />
                  </div>

                  <CatalogActiveChips chips={chips} clearAllHref={clearAllHref} clearAllLabel={tActive('clearAll')} />

                  {pageItems.length === 0 ? (
                    <CatalogEmptyState
                      title={tEmpty('heading')}
                      body={tEmpty('body')}
                      clearAllHref={clearAllHref}
                      clearAllLabel={tEmpty('cta')}
                    />
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {pageItems.map((l, i) => (
                        <WorksheetCatalogCard
                          key={l.slug}
                          href={localePath(locale, 'worksheets', l.slug)}
                          thumbnailSrc={wwwImg(deckAssets(locale, l.canonicalDeckSlug).thumbnail)}
                          title={l.h1}
                          levelLabel={levelChip(l.coordinate.level, locale)}
                          typeLabel={getAxisName('exercise-type', l.coordinate.type, locale) || l.coordinate.type}
                          subject={worksheetSubject(l.coordinate.type)}
                          ctaLabel={t('tileCta')}
                          eager={page === 1 && newHighlights.length === 0 && i < EAGER_CARDS}
                        />
                      ))}
                    </div>
                  )}

                  <Pagination
                    locale={locale}
                    currentPage={page}
                    pageCount={pageCount}
                    basePath={basePath}
                    searchParamsString={spString}
                  />
                </div>
              </div>
            )
          )}

          {/* Exercise-type strip — every published type links to its native-
              language topic page. Text chips, plain <a> (no prefetch, no
              images): the hub→topic crawl equity of the old 60-tile grid at
              a fraction of the request budget. */}
          {tiles.length > 0 && (
            <section className="mt-12 md:mt-16" aria-labelledby="topic-links-heading">
              <h2 id="topic-links-heading" className="font-lcsDisplay font-bold text-xl md:text-2xl text-lcs-teal mb-4">
                {tBrowse('topicLinksHeading')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {tiles.map((tile) => (
                  <a
                    key={tile.exerciseType}
                    href={`/${locale}/topic/${tile.typeSlug}/`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-lcs-teal/20 bg-white/60 text-sm font-lcsBody font-semibold text-lcs-teal hover:border-lcs-coral hover:text-lcs-coral-deep transition-colors"
                  >
                    {tile.typeName}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Browse by theme — complete crawlable directory (Lever A). Every
              theme links to its filtered hub view; plain <a>, no images/prefetch. */}
          {allLandings.length > 0 && dirThemes.length > 0 && (
            <section className="mt-10 md:mt-12" aria-labelledby="theme-dir-heading">
              <h2 id="theme-dir-heading" className="font-lcsDisplay font-bold text-xl md:text-2xl text-lcs-teal mb-4">
                {tBrowse('browseByTheme')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {dirThemes.map(([value]) => (
                  <a
                    key={value}
                    href={facetHref('theme', value)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-lcs-teal/20 bg-white/60 text-sm font-lcsBody font-semibold text-lcs-teal hover:border-lcs-coral hover:text-lcs-coral-deep transition-colors"
                  >
                    {themeLabel(value, locale)}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Browse by level — complete crawlable directory (Lever A). */}
          {allLandings.length > 0 && dirLevels.length > 0 && (
            <section className="mt-8" aria-labelledby="level-dir-heading">
              <h2 id="level-dir-heading" className="font-lcsDisplay font-bold text-xl md:text-2xl text-lcs-teal mb-4">
                {tBrowse('browseByLevel')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {dirLevels.map(([value]) => (
                  <a
                    key={value}
                    href={facetHref('level', value)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-lcs-teal/20 bg-white/60 text-sm font-lcsBody font-semibold text-lcs-teal hover:border-lcs-coral hover:text-lcs-coral-deep transition-colors"
                  >
                    {levelChip(value, locale)}
                  </a>
                ))}
              </div>
            </section>
          )}

          <PageUsageBlock locale={locale} variant="hub" />
        </div>
      </main>
    </>
  );
}
