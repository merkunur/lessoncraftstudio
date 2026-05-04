import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import {
  Axis,
  getAxisName,
  getAxisSlug,
  listAxisKeys,
  resolveTopicSlug,
} from '@/lib/taxonomy';
import {
  fetchDecksForAxis,
  fetchDecksForTopicWithFilters,
  getFacetCounts,
  listAllNonEmptyThemesWithCounts,
  listNonEmptyAxisKeys,
  TopicDeckSummary,
  TOPIC_PAGE_SIZE,
  TopicSortKey,
} from '@/lib/topic-decks';
import { fetchLessonPlanSummaryForTopic } from '@/lib/lesson-plans';
import VarietyStrip from '@/components/catalog/VarietyStrip';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import SiblingAxisStrip from '@/components/catalog/SiblingAxisStrip';
import CrossAxisPivots from '@/components/catalog/CrossAxisPivots';
import TopicProseContainer, { intentForAxis } from '@/components/catalog/TopicProseContainer';
import ResultCount from '@/components/catalog/ResultCount';
import FilterSidebar, { FacetGroup } from '@/components/catalog/FilterSidebar';
import MobileFilterDrawer from '@/components/catalog/MobileFilterDrawer';
import SortDropdown from '@/components/catalog/SortDropdown';
import ActiveFilterChips from '@/components/catalog/ActiveFilterChips';
import EmptyDecksState from '@/components/catalog/EmptyDecksState';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl, clearFilters } from '@/components/catalog/filterUrl';
import DeckGridClient, { TopicDeckCardData } from './DeckGridClient';

// Tier 1 launch locales per CLAUDE.md §19. Tier 2-4 fold in later; topic
// pages only generate for locales with catalog content (per Footer.tsx
// convention §5.6: don't fabricate links to pages that don't exist yet).
const TOPIC_LOCALES = ['en', 'de', 'es', 'nl', 'it', 'fr', 'pt', 'sv', 'da', 'no', 'fi'] as const;
type TopicLocale = (typeof TOPIC_LOCALES)[number];

const BASE_URL = 'https://www.lessoncraftstudio.com';

// Topic pages revalidate hourly to pick up newly-published decks without a
// rebuild. Static at build time + ISR.
export const revalidate = 3600;

interface TopicParams {
  locale: string;
  slug: string;
}

interface TopicResolution {
  axis: Axis;
  axisKey: string;
  locale: TopicLocale;
}

function isTopicLocale(l: string): l is TopicLocale {
  return (TOPIC_LOCALES as readonly string[]).includes(l);
}

function intentKey(axis: Axis): 'exerciseType' | 'theme' | 'educationalLevel' {
  if (axis === 'exercise-type') return 'exerciseType';
  if (axis === 'theme') return 'theme';
  return 'educationalLevel';
}

/**
 * For an axis-key, return all Tier-1 locales where the page actually exists
 * (i.e. has ≥1 published deck and a localized slug). Drives hreflang
 * alternates honestly — only siblings that exist are declared.
 */
async function getTopicSiblings(
  axis: Axis,
  axisKey: string
): Promise<Array<{ locale: TopicLocale; slug: string }>> {
  const out: Array<{ locale: TopicLocale; slug: string }> = [];
  for (const locale of TOPIC_LOCALES) {
    const slug = getAxisSlug(axis, axisKey, locale);
    if (!slug) continue;
    const decks = await fetchDecksForAxis(axis, axisKey, locale);
    if (decks.length > 0) out.push({ locale, slug });
  }
  return out;
}

export async function generateStaticParams(): Promise<TopicParams[]> {
  // Build-time DB unreachability is tolerated: ISR fills the static map on
  // first hit. See SESSION-STATE.md §10 — local Postgres is intentionally
  // not connected during dev builds.
  try {
    const params: TopicParams[] = [];
    const axes: Axis[] = ['exercise-type', 'theme', 'educational-level'];

    for (const locale of TOPIC_LOCALES) {
      for (const axis of axes) {
        const nonEmpty = await listNonEmptyAxisKeys(axis, locale);
        for (const axisKey of nonEmpty) {
          const slug = getAxisSlug(axis, axisKey, locale);
          if (slug) params.push({ locale, slug });
        }
      }
    }
    return params;
  } catch (err) {
    console.warn('[topic/[slug]] generateStaticParams DB unreachable; falling back to ISR:', (err as Error).message);
    return [];
  }
}

async function resolveOrNotFound(params: TopicParams): Promise<TopicResolution> {
  if (!isTopicLocale(params.locale)) notFound();
  const resolved = resolveTopicSlug(params.slug, params.locale);
  if (!resolved) notFound();
  // Confirm the axis actually has decks for this locale — guard against
  // direct hits to a slug that exists in taxonomy but has no catalog content.
  const decks = await fetchDecksForAxis(resolved.axis, resolved.axisKey, params.locale);
  if (decks.length === 0) notFound();
  return { ...resolved, locale: params.locale };
}

function deckTitleFor(deck: TopicDeckSummary, locale: string): string {
  const t = deck.title;
  if (t && typeof t === 'object') {
    return (t as Record<string, string>)[locale] ?? (t as Record<string, string>).en ?? deck.slug;
  }
  return deck.slug;
}

function deckLinkFor(deck: TopicDeckSummary): string {
  return `/${deck.language}/decks/${deck.slug}/`;
}

export async function generateMetadata({
  params,
}: {
  params: TopicParams;
}): Promise<Metadata> {
  const resolution = await resolveOrNotFound(params);
  const { axis, axisKey, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage.meta' });
  const topicName = getAxisName(axis, axisKey, locale) ?? params.slug;

  const siblings = await getTopicSiblings(axis, axisKey);
  const hreflangAlternates: Record<string, string> = {};
  for (const sib of siblings) {
    hreflangAlternates[getHreflangCode(sib.locale)] =
      `${BASE_URL}/${sib.locale}/topic/${sib.slug}/`;
  }
  const enSibling = siblings.find(s => s.locale === 'en');
  const xDefault = enSibling ?? siblings[0];
  if (xDefault) {
    hreflangAlternates['x-default'] = `${BASE_URL}/${xDefault.locale}/topic/${xDefault.slug}/`;
  }

  const canonical = `${BASE_URL}/${locale}/topic/${params.slug}/`;
  const otherSiblings = siblings.filter(s => s.locale !== locale);

  return {
    title: t('title', { topic: topicName }),
    description: t('description', { topic: topicName }),
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('title', { topic: topicName }),
      description: t('description', { topic: topicName }),
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: otherSiblings.map(s => ogLocaleMap[s.locale] || s.locale),
    },
    twitter: {
      card: 'summary',
      title: t('title', { topic: topicName }),
      description: t('description', { topic: topicName }),
    },
  };
}

function buildCollectionSchema(
  locale: TopicLocale,
  topicName: string,
  canonical: string,
  decks: TopicDeckSummary[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonical,
    url: canonical,
    name: topicName,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'LessonCraftStudio',
    },
    hasPart: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: decks.length,
      itemListElement: decks.map((deck, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${BASE_URL}${deckLinkFor(deck)}`,
        item: {
          '@type': 'LearningResource',
          '@id': `${BASE_URL}${deckLinkFor(deck)}`,
          url: `${BASE_URL}${deckLinkFor(deck)}`,
          name: deckTitleFor(deck, locale),
          inLanguage: deck.language,
          learningResourceType: 'Worksheet',
          isAccessibleForFree: true,
        },
      })),
    },
  };
}

// Arc 6b — searchParams validation + canonicalization helpers.
// Per Q query-string adjudication: universal English-canonical axis-keys.
// Default-value stripping + alphabetic param ordering happen at the
// component level; route-handler enforces canonical-redirect for
// default values + 404 for out-of-range / out-of-vocab inputs.

const VALID_SORTS: TopicSortKey[] = ['newest', 'alpha-asc', 'alpha-desc'];
const VALID_LEVEL_KEYS = new Set(listAxisKeys('educational-level'));
const VALID_THEME_KEYS = new Set(listAxisKeys('theme'));
const VALID_TYPE_KEYS = new Set(listAxisKeys('exercise-type'));

interface ParsedFilters {
  sort: TopicSortKey;
  page: number;
  level?: string;
  theme?: string;
  type?: string;
}

function parseSearchParams(
  searchParams: { [key: string]: string | string[] | undefined },
  basePath: string,
): { parsed: ParsedFilters; canonicalRedirect: string | null; notFound: boolean } {
  const get = (key: string): string | undefined => {
    const v = searchParams[key];
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const sortRaw = get('sort');
  const pageRaw = get('page');
  const level = get('level');
  const theme = get('theme');
  const type = get('type');

  // Default-value canonical redirect: ?sort=newest / ?page=1 / empty values
  const sort: TopicSortKey =
    sortRaw && (VALID_SORTS as string[]).includes(sortRaw)
      ? (sortRaw as TopicSortKey)
      : 'newest';
  const pageNum = pageRaw ? parseInt(pageRaw, 10) : 1;

  // Out-of-vocab axis-keys → 404
  if (level && !VALID_LEVEL_KEYS.has(level)) return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  if (theme && !VALID_THEME_KEYS.has(theme)) return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  if (type && !VALID_TYPE_KEYS.has(type)) return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };

  // Out-of-range page → 404 (validated against pageCount post-fetch)
  if (pageRaw && (!Number.isInteger(pageNum) || pageNum < 1)) {
    return { parsed: {} as ParsedFilters, canonicalRedirect: null, notFound: true };
  }

  // Build canonical URL — strip default values + sort params alphabetically
  const sp = new URLSearchParams();
  if (sort !== 'newest') sp.set('sort', sort);
  if (pageNum !== 1) sp.set('page', String(pageNum));
  if (level) sp.set('level', level);
  if (theme) sp.set('theme', theme);
  if (type) sp.set('type', type);
  const canonicalUrl = buildFilterUrl(basePath, sp);

  // Compare canonical URL against current URL — if different, redirect
  const currentSp = new URLSearchParams();
  if (sortRaw !== undefined) currentSp.set('sort', sortRaw);
  if (pageRaw !== undefined) currentSp.set('page', pageRaw);
  if (level !== undefined) currentSp.set('level', level);
  if (theme !== undefined) currentSp.set('theme', theme);
  if (type !== undefined) currentSp.set('type', type);
  const currentUrl = buildFilterUrl(basePath, currentSp);

  const canonicalRedirect = currentUrl !== canonicalUrl ? canonicalUrl : null;

  return {
    parsed: { sort, page: pageNum, level, theme, type },
    canonicalRedirect,
    notFound: false,
  };
}

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: TopicParams;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolution = await resolveOrNotFound(params);
  const { axis, axisKey, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const topicName = getAxisName(axis, axisKey, locale) ?? params.slug;
  const intent = intentKey(axis);
  const basePath = `/${locale}/topic/${params.slug}/`;

  // Arc 6b — searchParams parse + canonical-redirect + 404 for invalid input
  const sp = parseSearchParams(searchParams, basePath);
  if (sp.notFound) notFound();
  if (sp.canonicalRedirect) redirect(sp.canonicalRedirect);
  const filters = sp.parsed;

  // Resolve secondary axes from searchParams. The path-bound primary axis
  // is excluded from secondary axes (a path=animals page can't add another
  // theme=X without behavior ambiguity; if user submits theme matching path,
  // it's a no-op redundant filter — handle silently).
  const secondaryAxes: Array<{ axis: Axis; axisKey: string }> = [];
  if (filters.level && (axis !== 'educational-level' || filters.level !== axisKey)) {
    secondaryAxes.push({ axis: 'educational-level', axisKey: filters.level });
  }
  if (filters.theme && (axis !== 'theme' || filters.theme !== axisKey)) {
    secondaryAxes.push({ axis: 'theme', axisKey: filters.theme });
  }
  if (filters.type && (axis !== 'exercise-type' || filters.type !== axisKey)) {
    secondaryAxes.push({ axis: 'exercise-type', axisKey: filters.type });
  }

  const primaryAxes = [{ axis, axisKey }];

  const { decks, totalCount, pageCount } = await fetchDecksForTopicWithFilters(
    primaryAxes,
    {
      secondaryAxes: secondaryAxes.length > 0 ? secondaryAxes : undefined,
      sort: filters.sort,
      page: filters.page,
      pageSize: TOPIC_PAGE_SIZE,
    },
    locale,
  );

  // Out-of-range page (page > pageCount) → 404 per Q pagination spec
  if (filters.page > pageCount && pageCount > 0) notFound();

  // Facet counts for sidebar — reflect active filters
  const facetCounts = await getFacetCounts(primaryAxes, secondaryAxes, locale);

  // Full theme list (Tier 2 expand)
  const allThemes = await listAllNonEmptyThemesWithCounts(locale);

  // Build active-filter chip descriptors (locale-natural display labels)
  type ChipKey = 'level' | 'theme' | 'type';
  type Chip = { paramKey: ChipKey; axisKey: string; label: string };
  const activeChips: Chip[] = [];
  if (filters.level) {
    const name = getAxisName('educational-level', filters.level, locale);
    if (name) activeChips.push({ paramKey: 'level', axisKey: filters.level, label: name });
  }
  if (filters.theme) {
    const name = getAxisName('theme', filters.theme, locale);
    if (name) activeChips.push({ paramKey: 'theme', axisKey: filters.theme, label: name });
  }
  if (filters.type) {
    const name = getAxisName('exercise-type', filters.type, locale);
    if (name) activeChips.push({ paramKey: 'type', axisKey: filters.type, label: name });
  }

  // Build facet groups for the sidebar — exclude the path-bound axis
  const tFacets = await getTranslations({ locale, namespace: 'topicPage.facets' });
  const facetGroups: FacetGroup[] = [];
  if (axis !== 'educational-level') {
    const opts = facetCounts['educational-level']
      .map(c => ({
        axisKey: c.axisKey,
        label: getAxisName('educational-level', c.axisKey, locale) ?? c.axisKey,
        count: c.count,
      }));
    facetGroups.push({ paramKey: 'level', heading: tFacets('educationalLevel'), options: opts });
  }
  if (axis !== 'theme') {
    // Use full theme list (allThemes) but apply current filter counts where available
    const counts = new Map(facetCounts['theme'].map(c => [c.axisKey, c.count]));
    const opts = allThemes
      .filter(t2 => counts.has(t2.axisKey) || t2.count > 0)
      .map(t2 => ({
        axisKey: t2.axisKey,
        label: getAxisName('theme', t2.axisKey, locale) ?? t2.axisKey,
        count: counts.get(t2.axisKey) ?? 0,
      }))
      .filter(o => o.count > 0); // hide themes with 0 results post-active-filters
    facetGroups.push({
      paramKey: 'theme',
      heading: tFacets('theme.heading'),
      options: opts,
      isThemeWithExpand: true,
      themeTier1Count: 12,
    });
  }
  if (axis !== 'exercise-type') {
    const opts = facetCounts['exercise-type']
      .map(c => ({
        axisKey: c.axisKey,
        label: getAxisName('exercise-type', c.axisKey, locale) ?? c.axisKey,
        count: c.count,
      }));
    facetGroups.push({ paramKey: 'type', heading: tFacets('exerciseType'), options: opts });
  }

  // Build searchParams string for child components' URL-construction
  const childSpString = (() => {
    const out = new URLSearchParams();
    if (filters.sort !== 'newest') out.set('sort', filters.sort);
    if (filters.page !== 1) out.set('page', String(filters.page));
    if (filters.level) out.set('level', filters.level);
    if (filters.theme) out.set('theme', filters.theme);
    if (filters.type) out.set('type', filters.type);
    return out.toString();
  })();

  const canonical = `${BASE_URL}${basePath}`;
  const schema = buildCollectionSchema(locale, topicName, canonical, decks);

  // Pillar 1 Phase 1b — axis-driven lesson-plan reference. Silent fall-through
  // when no plan exists for this (axisKey, locale). Renders as preview card
  // above the deck grid when present. Subscriber-gating UI lives in the
  // LessonPlanReader at the standalone reader route; topic-page link is
  // public-facing and the read surface enforces gate.
  const lessonPlanSummary = await fetchLessonPlanSummaryForTopic(axisKey, locale);
  const tLessonPlan = await getTranslations({ locale, namespace: 'lessonPlanReader.topicReference' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="container mx-auto px-4 max-w-6xl py-12">
        {/* Arc 6a — depth-UI overlay: breadcrumbs + sibling-axis strip
            above h1; result-count + prose container below h1. */}
        <Breadcrumbs
          locale={locale}
          axisName1={topicName}
          slug1={params.slug}
        />
        <SiblingAxisStrip
          locale={locale}
          currentAxis={axis}
          currentAxisKey={axisKey}
        />

        <header className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-3">
            {t(`heading.${intent}`, { topic: topicName })}
          </h1>
          <ResultCount locale={locale} count={totalCount} />
        </header>

        <TopicProseContainer
          locale={locale}
          axisKey1={axisKey}
          intent1={intentForAxis(axis)}
          topicName1={topicName}
        />

        {lessonPlanSummary && (
          <section className="mb-10 p-6 rounded-lg bg-cream-100 border border-cream-300">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
              {tLessonPlan('heading')}
            </h2>
            <p className="text-base text-ink-800 mb-3">
              <span className="font-medium">{lessonPlanSummary.title}</span>
              {' '}
              <span className="text-sm text-ink-500">
                · {tLessonPlan('duration', { minutes: lessonPlanSummary.durationMinutes })}
              </span>
            </p>
            {lessonPlanSummary.warmupExcerpt && (
              <p className="text-sm text-ink-700 mb-4">
                {lessonPlanSummary.warmupExcerpt}
              </p>
            )}
            <a
              href={`/${locale}/lesson-plans/${params.slug}/`}
              className="inline-flex items-center text-sm font-medium text-terracotta-500 hover:text-terracotta-600"
            >
              {tLessonPlan('readFullCta')} →
            </a>
          </section>
        )}

        {/* Arc 6b — Filter sidebar (left rail desktop) + main content
            (sort, active chips, deck grid, pagination). Mobile: filter
            drawer trigger above the grid; desktop sidebar hidden via
            FilterSidebar's lg:block. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <FilterSidebar
            basePath={basePath}
            facetGroups={facetGroups}
          />
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <MobileFilterDrawer basePath={basePath} facetGroups={facetGroups} />
              <SortDropdown basePath={basePath} />
            </div>
            <ActiveFilterChips basePath={basePath} chips={activeChips} />
            {decks.length === 0 ? (
              <EmptyDecksState
                locale={locale}
                basePath={basePath}
                searchParamsString={childSpString}
              />
            ) : (
              <DeckGridClient
                decks={decks.map<TopicDeckCardData>(deck => ({
                  id: deck.id,
                  slug: deck.slug,
                  language: deck.language,
                  title: deckTitleFor(deck, locale),
                  href: deckLinkFor(deck),
                  thumbnailUrl: deck.thumbnailUrl,
                  pdfUrl: deck.pdfUrl,
                }))}
                labels={{
                  playLink: t('deckCard.playLink'),
                  pdfLink: t('deckCard.pdfLink'),
                }}
              />
            )}
            <Pagination
              locale={locale}
              currentPage={filters.page}
              pageCount={pageCount}
              basePath={basePath}
              searchParamsString={childSpString}
            />
          </div>
        </div>

        {/* Arc 6a — cross-axis pivot rail. Surfaces 2-axis intersection
            pages related to the current axis. Capped at 6 per Q1; renders
            fewer when substrate sparse (no fallback copy). */}
        <CrossAxisPivots
          locale={locale}
          currentAxes={[{ axis, axisKey }]}
        />

        {/* Catalog variety Arc 1 — below-the-fold variety strips per
            CLAUDE.md §1 path-2 commitment + §16.2 + §16.6. Each strip
            self-skips at cardinality < 2 (component-internal); empty
            strips render nothing. Strip 3 (other-ages) only renders on
            theme + exercise-type pages — caller-side guard. */}
        <VarietyStrip
          kind="same-axis-key-other-locales"
          axis={axis}
          axisKey={axisKey}
          currentLocale={locale}
          topicName={topicName}
        />
        <VarietyStrip
          kind="related-topics"
          axis={axis}
          axisKey={axisKey}
          currentLocale={locale}
          topicName={topicName}
        />
        {axis !== 'educational-level' && (
          <VarietyStrip
            kind="other-ages"
            axis={axis}
            axisKey={axisKey}
            currentLocale={locale}
            topicName={topicName}
          />
        )}
        <VarietyStrip
          kind="catalog-highlights"
          axis={axis}
          axisKey={axisKey}
          currentLocale={locale}
          topicName={topicName}
        />
      </main>
    </>
  );
}
