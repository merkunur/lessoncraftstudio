/* /[locale]/worksheets/ — the worksheets hub.
   Public, SSR, ISR. Rebuilt 2026-09-03 from a page that had grown eleven
   stacked blocks into six.

   WHAT CHANGED AND WHY (the short version; the long one is in the commit):
   - The two card strips above the grid are GONE. They existed because the old
     interleave ordered type buckets by descending size, so page 1 was one row
     from each of the 24 largest of 71 types and the newest families could never
     reach it. `orderHubRows` fixes that at the root, so the patch is redundant.
   - The three "Browse by …" chip walls are GONE. Every theme and every level
     link they carried now lives permanently in the filter rail — MORE crawlable
     links than before, since the long-tail themes no longer hide behind a
     `?themes=all` round trip. The one set with nowhere else to go, the
     native-language /topic/ links, keeps a real headed section at the foot.
   - The three-way sort control is replaced by two tabs, All and Interactive.
     Ordering is always variety; there is nothing to choose.
   - Cards tell the truth about format and finally expose their downloads.

   `?sort=` and `?themes=all` are no longer read but MUST keep returning 200 —
   they are indexed URLs. `parseWorksheetFilters` ignores them rather than
   404ing.

   Rate-limit frugality (broken-thumbnails fix 2026-07-06) is unchanged: lazy
   card images beyond the first row, prefetch={false} links, text-only foot
   sections — the page stays well under the nginx per-IP burst that used to 429
   a random subset of thumbnails per refresh. */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getAxisSlug, getAxisName, listSubjectKeys, getSubjectName, exerciseTypeKeysForSubject } from '@/lib/taxonomy';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { wwwImg } from '@/lib/img-host';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import PageUsageBlock from '@/components/catalog/PageUsageBlock';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl, withParam, withoutParam, clearFilters } from '@/components/catalog/filterUrl';
import {
  CatalogSidebar,
  CatalogMobileFilters,
  CatalogActiveChips,
  CatalogEmptyState,
  type FacetGroupVM,
  type FacetItemVM,
  type FacetSubgroupVM,
} from '@/components/catalog/CatalogFilters';
import CatalogTabs from '@/components/catalog/CatalogTabs';
import CatalogTypeIndex, { type TypeIndexItem } from '@/components/catalog/CatalogTypeIndex';
import WorksheetCatalogCard from '@/components/worksheets/WorksheetCatalogCard';
import { getMonolingualLandings, deckAssets } from '@/lib/seo/landing-content';
import { collapsedSheetSlugs, expandHubRows, type HubRow, type DeckFacts } from '@/lib/worksheets-sheets';
import { isPrintOnlyType } from '@/config/interactive-exercise-types';
import {
  WORKSHEETS_PAGE_SIZE,
  WORKSHEETS_TOP_THEMES,
  parseWorksheetFilters,
  applyLandingFilters,
  buildLandingFacets,
  orderHubRows,
  worksheetSubject,
  levelChip,
  levelOrder,
  themeLabel,
} from '@/lib/worksheets-catalog';
import '@/styles/catalog-cards.css';

const BASE_URL = CANONICAL_HOST;

// Brand-only 1200×630 OG asset shared with the homepage (Direction A palette).
const OG_IMAGE_PATH = '/og-homepage.png';

// Substrate-honesty floor — only locales with genuine catalog depth get the
// "Thousands…" variant. Seed-only locales fall to the safer copy (§19.5).
const HUNDREDS_THRESHOLD = 100;

// One xl row loads eagerly; everything else is lazy.
const EAGER_CARDS = 4;

// `picture-trail` is the en-locale exercise-type axis key for the picture-path
// app and is the ONLY type in the whole corpus with no `apps.*.default_subject`
// (measured across all 11 locales). Without this it would silently vanish from
// the subject-grouped type rail.
const SUBJECT_ALIAS: Record<string, string> = { 'picture-trail': 'picture-path' };

// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route.
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

async function countLocaleDecks(locale: string): Promise<number> {
  try {
    return await prisma.deck.count({
      where: { language: locale, status: 'published', contentLanguage: null },
    });
  } catch {
    return 0;
  }
}

// ISR: pick up newly-published decks without a rebuild.
export const revalidate = 3600;

/* generateMetadata is DELIBERATELY UNCHANGED. The <title> and meta description
   are live ranking copy; the operator ruled they stay byte-identical while the
   on-page h1 and intro are rewritten. It also ignores searchParams, so every
   filtered state — `?format=interactive` included — still canonicalises to the
   bare hub and adds no crawl space. */
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const total = await countLocaleDecks(locale);
  const useHundreds = total >= HUNDREDS_THRESHOLD;
  const t = await getTranslations({ locale, namespace: 'worksheetsPage' });

  const title = useHundreds ? t('metaTitle.hundreds') : t('metaTitle.safer');
  const description = useHundreds ? t('metaDescription.hundreds') : t('metaDescription.safer');
  const canonical = canonicalUrl(localePath(locale, 'worksheets'));

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = canonicalUrl(localePath(lang, 'worksheets'));
  }
  hreflangAlternates['x-default'] = canonicalUrl(localePath('en', 'worksheets'));

  return {
    title: `${title}`,
    description,
    alternates: { canonical, languages: hreflangAlternates },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [{
        url: `${CANONICAL_HOST}${OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
      }],
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

/**
 * The metered download proxy the STATIC landing pages already use. Slug-keyed,
 * so a card can offer its PDF without resolving a database row; the route
 * itself 404s when the requested asset does not exist, 302s subscribers and
 * crawlers straight to the file, meters free accounts and sends anonymous
 * visitors to signup. Works as a plain href — no client JS, which is why the
 * hub can meter downloads at all.
 */
function dlHref(locale: string, deckSlug: string, kind: 'pdf' | 'answer'): string {
  return `/api/quota/dl?loc=${encodeURIComponent(locale)}&slug=${encodeURIComponent(deckSlug)}&kind=${kind}`;
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
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const locale = params.locale || 'en';
  const [t, tBrowse, tTopic, tFacets, tActive, tEmpty, tBreadcrumb, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'worksheetsPage' }),
    getTranslations({ locale, namespace: 'worksheetsPage.browse' }),
    getTranslations({ locale, namespace: 'topicPage' }),
    getTranslations({ locale, namespace: 'topicPage.facets' }),
    getTranslations({ locale, namespace: 'topicPage.activeFilters' }),
    getTranslations({ locale, namespace: 'topicPage.emptyState' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTranslations({ locale, namespace: 'nav.categories' }),
  ]);

  /* ---- ONE deck query, replacing the three the page used to run ----
     It supplies the sheet titles the hub already needed, the deck ids the
     metered download links need, the answer-key fact each card's Answer key
     link is gated on, and the distinct exercise types for the foot index and
     the copy threshold. ~4,100 rows per locale, once per ISR hour; topic pages'
     getFacetCounts already does a full-locale findMany at ~4ms p95.
     A failure degrades the page (no metered links, no answer keys) rather than
     500ing — the same posture the previous title query had. */
  const factsBySlug = new Map<string, DeckFacts>();
  const publishedTypes = new Set<string>();
  let totalCount = 0;
  try {
    const decks = await prisma.deck.findMany({
      where: { language: locale, status: 'published', contentLanguage: null },
      select: { slug: true, title: true, answerKeyUrl: true, exerciseType: true },
    });
    totalCount = decks.length;
    for (const d of decks) {
      publishedTypes.add(d.exerciseType);
      const raw = d.title as Record<string, string> | null;
      const label = raw ? raw[locale] || raw.en || Object.values(raw)[0] : null;
      if (label) factsBySlug.set(d.slug, { title: label, hasAnswerKey: d.answerKeyUrl != null });
    }
  } catch (err) {
    console.warn('[AllWorksheetsPage] deck query failed:', (err as Error).message);
  }

  const useHundreds = totalCount >= HUNDREDS_THRESHOLD;
  const h1 = useHundreds ? t('h1.hundreds') : t('h1.safer');
  const intro = useHundreds ? t('intro.hundreds') : t('intro.safer');

  /* ---- hub rows: the landing tier expanded into the worksheets it collapses ---- */
  const allLandings = getMonolingualLandings(locale);
  const sheetSlugs = collapsedSheetSlugs(allLandings);
  const sheetFacts = new Map<string, DeckFacts>();
  for (const s of sheetSlugs) {
    const f = factsBySlug.get(s);
    if (f) sheetFacts.set(s, f);
  }
  for (const l of allLandings) {
    const f = factsBySlug.get(l.canonicalDeckSlug);
    if (f) sheetFacts.set(l.canonicalDeckSlug, f);
  }
  const hubRows: HubRow[] = expandHubRows(
    allLandings,
    sheetFacts,
    (slug) => deckAssets(locale, slug).deckDir,
    (themeKey) => themeLabel(themeKey, locale),
  );

  const filters = parseWorksheetFilters(searchParams ?? {});
  const basePath = `/${locale}/worksheets`;
  const spString = toSearchParamsString(searchParams ?? {});

  /* The format tab scopes EVERYTHING below it, facet counts included, so a type
     with no interactive sheets disappears from the rail under Interactive
     rather than offering a filter that returns nothing. */
  const scoped = filters.format === 'interactive'
    ? hubRows.filter((l) => !isPrintOnlyType(l.coordinate.type))
    : hubRows;

  const facets = scoped.length > 0 ? buildLandingFacets(scoped, filters) : null;

  /* ---- facet rail ---- */
  let facetGroups: FacetGroupVM[] = [];
  if (facets) {
    const levelItems: FacetItemVM[] = facets.level
      .map(({ value, count }) => ({
        paramKey: 'level',
        value,
        label: levelChip(value, locale),
        count,
        active: filters.level === value,
      }))
      .sort((a, b) => levelOrder(a.value) - levelOrder(b.value) || a.label.localeCompare(b.label, locale));

    // Types grouped by taxonomy subject: 71 flat rows is a wall, 71 rows in five
    // named discs is a menu. <details> children are in the SSR DOM either way,
    // so every ?type= link stays crawlable whether or not a disc is open.
    const typeItemsAll: FacetItemVM[] = facets.type.map(({ value, count }) => ({
      paramKey: 'type',
      value,
      label: getAxisName('exercise-type', value, locale) || value,
      count,
      active: filters.type === value,
    }));
    const subjectOfType = new Map<string, string>();
    for (const s of listSubjectKeys()) {
      for (const k of exerciseTypeKeysForSubject(s)) subjectOfType.set(k, s);
    }
    const subjectFor = (typeKey: string) =>
      subjectOfType.get(typeKey) || subjectOfType.get(SUBJECT_ALIAS[typeKey] || '') || null;

    const typeSubgroups: FacetSubgroupVM[] = listSubjectKeys()
      .map((subjectKey) => {
        const items = typeItemsAll
          .filter((i) => subjectFor(i.value) === subjectKey)
          .sort((a, b) => a.label.localeCompare(b.label, locale));
        return {
          key: subjectKey,
          label: getSubjectName(subjectKey, locale) || subjectKey,
          count: items.reduce((n, i) => n + i.count, 0),
          open: items.some((i) => i.active),
          items,
        };
      })
      .filter((g) => g.items.length > 0)
      .sort((a, b) => b.count - a.count);
    // With nothing selected, open the largest subject so the rail reads as a
    // menu rather than five closed boxes.
    if (typeSubgroups.length > 0 && !typeSubgroups.some((g) => g.open)) typeSubgroups[0].open = true;

    // Themes: the top N stay visible, the long tail moves into a disclosure —
    // still in the HTML, which is what retires the `?themes=all` round trip.
    const themesAll = facets.theme.slice().sort((a, b) => b.count - a.count);
    const toItem = ({ value, count }: { value: string; count: number }): FacetItemVM => ({
      paramKey: 'theme',
      value,
      label: themeLabel(value, locale),
      count,
      active: filters.theme === value,
    });
    let head = themesAll.slice(0, WORKSHEETS_TOP_THEMES);
    let tail = themesAll.slice(WORKSHEETS_TOP_THEMES);
    // The active theme is always visible, wherever it ranks.
    if (filters.theme && !head.some((th) => th.value === filters.theme)) {
      const hit = tail.find((th) => th.value === filters.theme);
      if (hit) { head = [...head, hit]; tail = tail.filter((th) => th.value !== filters.theme); }
    }
    const themeSubgroups: FacetSubgroupVM[] = tail.length > 0
      ? [{
          key: 'more-themes',
          label: tBrowse('moreThemes', { count: tail.length }),
          count: tail.reduce((n, th) => n + th.count, 0),
          open: false,
          items: tail.map(toItem),
        }]
      : [];

    facetGroups = [
      { key: 'level', heading: tBrowse('filterLevel'), items: levelItems },
      { key: 'type', heading: tBrowse('filterType'), items: [], subgroups: typeSubgroups },
      { key: 'theme', heading: tBrowse('filterTheme'), items: head.map(toItem), subgroups: themeSubgroups },
    ];
  }

  /* ---- filter → order → paginate ---- */
  const filtered = applyLandingFilters(scoped, {
    type: filters.type,
    level: filters.level,
    theme: filters.theme,
  });
  const ordered = orderHubRows(
    filtered,
    Boolean(filters.type),
    (l) => isPrintOnlyType(l.coordinate.type),
  ).rows;

  const total = ordered.length;
  const pageCount = Math.max(1, Math.ceil(total / WORKSHEETS_PAGE_SIZE));
  // Out-of-range page => 404, not a clamp: clamping made ?page=101 and ?page=999
  // both return 200 with an identical copy of the last real page, i.e. an
  // unbounded crawl space of duplicates.
  if (filters.page > pageCount) notFound();
  const page = filters.page;
  const pageItems = ordered.slice((page - 1) * WORKSHEETS_PAGE_SIZE, page * WORKSHEETS_PAGE_SIZE);

  /* ---- tabs ---- */
  const tabHref = (value: 'all' | 'interactive') => {
    const next = value === 'all'
      ? withoutParam(new URLSearchParams(spString), 'format')
      : withParam(new URLSearchParams(spString), 'format', 'interactive');
    next.delete('page');
    return buildFilterUrl(basePath, next);
  };
  const tabs = [
    { value: 'all', label: t('tabs.all'), href: tabHref('all'), active: filters.format === 'all' },
    { value: 'interactive', label: t('tabs.interactive'), href: tabHref('interactive'), active: filters.format === 'interactive' },
  ];

  /* ---- active chips + clear all ----
     The format tab is deliberately NOT mirrored as a chip: it is a mode with
     exactly one value always on, and giving one state two off-switches is a bug
     rather than a convenience. */
  const removeHref = (key: string) => {
    const next = withoutParam(new URLSearchParams(spString), key);
    next.delete('page');
    return buildFilterUrl(basePath, next);
  };
  const chips: { label: string; removeHref: string }[] = [];
  if (filters.level) chips.push({ label: levelChip(filters.level, locale), removeHref: removeHref('level') });
  if (filters.type) chips.push({ label: getAxisName('exercise-type', filters.type, locale) || filters.type, removeHref: removeHref('type') });
  if (filters.theme) chips.push({ label: themeLabel(filters.theme, locale), removeHref: removeHref('theme') });
  const clearAllHref = buildFilterUrl(basePath, clearFilters(new URLSearchParams(spString)));

  /* ---- the A–Z type index at the foot ----
     Built from the DB's published types so the link set matches exactly what
     the old "Browse by exercise type" wall carried. These go to /topic/<slug>/,
     a different page class from the rail's ?type= filter — which is why this
     section survives while the theme and level walls do not. */
  // The DB supplies the published type set, but a failed read must not silently
  // empty this section: measured locally, the index drops from 100 links to 0
  // and the page quietly loses every native-language topic link it carries.
  // The landing corpus is on disk and always readable, so it is the floor.
  const indexTypes = publishedTypes.size > 0
    ? publishedTypes
    : new Set(hubRows.map((l) => l.coordinate.type));
  const typeIndex: TypeIndexItem[] = [...indexTypes]
    .map((key) => ({
      key,
      label: getAxisName('exercise-type', key, locale) || key,
      href: `/${locale}/topic/${getAxisSlug('exercise-type', key, locale) || key}/`,
    }))
    .filter((x) => Boolean(x.label))
    .sort((a, b) => a.label.localeCompare(b.label, locale));

  /* ---- structured data: CollectionPage + ItemList + BreadcrumbList ---- */
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
  if (typeIndex.length > 0) {
    collectionSchema.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: typeIndex.length,
      itemListElement: typeIndex.map((tile, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tile.label,
        url: `${BASE_URL}${tile.href}`,
      })),
    };
  }
  // Bare-state ItemList only (first page, no filters, default tab); filtered
  // states emit none, because the canonical is the bare hub.
  const bareState = !filters.type && !filters.level && !filters.theme && filters.format === 'all' && page === 1;
  if (hubRows.length > 0 && bareState) {
    collectionSchema.hasPart = {
      '@type': 'ItemList',
      numberOfItems: pageItems.length,
      itemListElement: pageItems.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.h1,
        // deckHref is already absolute and trailing-slash; canonicalUrl would
        // strip the slash and emit the form that 301s.
        url: l.deckHref || canonicalUrl(localePath(locale, 'worksheets', l.slug)),
      })),
    };
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: tNav('worksheets'), path: localePath(locale, 'worksheets') },
  ]);

  const cardLabels = {
    pdf: t('card.pdf'),
    answerKey: t('card.answerKey'),
    printOnly: t('card.printOnly'),
    pdfAria: (title: string) => t('card.pdfAria', { title }),
    answerKeyAria: (title: string) => t('card.answerKeyAria', { title }),
    interactiveMark: t('card.interactiveMark'),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main
        className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}
      >
        <div className="mx-auto max-w-6xl">
          <BreadcrumbTrail locale={locale} trail={[{ label: tNav('worksheets') }]} />

          <header className="mb-7 md:mb-8 max-w-2xl">
            <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">
              {h1}
            </h1>
            <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
            <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">
              {intro}
            </p>
          </header>

          {hubRows.length === 0 ? (
            <div className="actcat-card-flat rounded-3xl p-10 md:p-12 text-center max-w-2xl mx-auto">
              <p className="font-lcsDisplay font-bold text-xl text-lcs-teal mb-3">{t('emptyTitle')}</p>
              <p className="font-lcsBody text-lcs-teal/70">{t('emptyBody')}</p>
            </div>
          ) : (
            <>
              {/* The tab bar spans the full content width, above the shell,
                  because it scopes the rail as well as the grid. */}
              <CatalogTabs
                ariaLabel={t('tabs.aria')}
                tabs={tabs}
                /* topicPage.decksCount, not a worksheetsPage string: it is
                   already ICU-pluralised in all 11 locales, so the count reads
                   correctly at 1. The old key was a bare "{count} worksheets"
                   and rendered "1 worksheets" — a Finnish panel caught the same
                   defect there that another panel had caught in the theme
                   disclosure. Reusing the pluralised key fixes it everywhere
                   without authoring eleven new plural forms. */
                resultLabel={tTopic('decksCount', { count: total })}
              />

              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <CatalogSidebar heading={tFacets('heading')} groups={facetGroups} basePath={basePath} spString={spString} />

                <div className="lg:col-span-9">
                  <CatalogMobileFilters heading={tFacets('heading')} groups={facetGroups} basePath={basePath} spString={spString} />

                  <CatalogActiveChips chips={chips} clearAllHref={clearAllHref} clearAllLabel={tActive('clearAll')} />

                  {pageItems.length === 0 ? (
                    <CatalogEmptyState
                      title={tEmpty('heading')}
                      body={filters.format === 'interactive' ? t('empty.bodyInteractive') : tEmpty('body')}
                      clearAllHref={clearAllHref}
                      clearAllLabel={tEmpty('cta')}
                      primaryAction={
                        filters.format === 'interactive'
                          ? { href: tabHref('all'), label: t('empty.showAll') }
                          : undefined
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {pageItems.map((l, i) => {
                        const assets = deckAssets(locale, l.canonicalDeckSlug);
                        const printOnly = isPrintOnlyType(l.coordinate.type);
                        // Falls back to the type when the DB read failed: with
                        // zero mixed types catalogue-wide, the type answers this
                        // exactly, so the card degrades truthfully.
                        const hasAnswerKey = l.hasAnswerKey ?? !printOnly;
                        return (
                          <WorksheetCatalogCard
                            key={l.slug}
                            href={l.deckHref || localePath(locale, 'worksheets', l.slug)}
                            external={Boolean(l.deckHref)}
                            thumbnailSrc={wwwImg(assets.thumbnail)}
                            title={l.h1}
                            levelLabel={levelChip(l.coordinate.level, locale)}
                            typeLabel={getAxisName('exercise-type', l.coordinate.type, locale) || l.coordinate.type}
                            subject={worksheetSubject(l.coordinate.type)}
                            labels={cardLabels}
                            printOnly={printOnly}
                            pdfHref={dlHref(locale, l.canonicalDeckSlug, 'pdf')}
                            answerKeyHref={hasAnswerKey ? dlHref(locale, l.canonicalDeckSlug, 'answer') : null}
                            eager={page === 1 && i < EAGER_CARDS}
                          />
                        );
                      })}
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
            </>
          )}

          <CatalogTypeIndex heading={t('index.heading')} items={typeIndex} />

          <PageUsageBlock locale={locale} variant="hub" />
        </div>
      </main>
    </>
  );
}
