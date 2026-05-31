import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { renderTopicTitle } from '@/lib/seo/topic-title-format';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import {
  Axis,
  getAxisName,
  getAxisSlug,
  getExerciseModeName,
  listAxisKeys,
  resolveTopicSlug,
} from '@/lib/taxonomy';
import {
  fetchDecksForAxis,
  fetchDecksForTopicWithFilters,
  getExerciseModeCountsForType,
  getFacetCounts,
  listAllNonEmptyThemesWithCounts,
  listNonEmptyAxisKeys,
  TopicDeckSummary,
  TOPIC_PAGE_SIZE,
  TopicSortKey,
} from '@/lib/topic-decks';
import { buildDeckRichAlt } from '@/lib/deck-seo';
import VarietyStrip from '@/components/catalog/VarietyStrip';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import SiblingAxisStrip from '@/components/catalog/SiblingAxisStrip';
import CrossAxisPivots from '@/components/catalog/CrossAxisPivots';
import TopicProseContainer, { intentForAxis } from '@/components/catalog/TopicProseContainer';
import PageUsageBlock from '@/components/catalog/PageUsageBlock';
import TopicFaq from '@/components/catalog/TopicFaq';
import ResultCount from '@/components/catalog/ResultCount';
import FilterSidebar, { FacetGroup } from '@/components/catalog/FilterSidebar';
import MobileFilterDrawer from '@/components/catalog/MobileFilterDrawer';
import SortDropdown from '@/components/catalog/SortDropdown';
import ActiveFilterChips from '@/components/catalog/ActiveFilterChips';
import EmptyDecksState from '@/components/catalog/EmptyDecksState';
import Pagination from '@/components/catalog/Pagination';
import { buildFilterUrl, clearFilters } from '@/components/catalog/filterUrl';
import DeckGridClient, { TopicDeckCardData } from './DeckGridClient';

// Topic-page locales — single source of truth at frontend/config/topic-locales.ts.
// Per Footer.tsx convention §5.6 + §16.6.1 honesty discipline: per-(axis,key,locale)
// tuple URL emission gated by fetchDecksForAxis() so empty tuples never render.
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
const TOPIC_LOCALES = TOPIC_ENABLED_LOCALES;
type TopicLocale = TopicEnabledLocale;

// SEO URLs go through `canonicalUrl()` / `localePath()` from `@/lib/seo/url`
// to enforce the no-trailing-slash invariant. `BASE_URL` retained as alias of
// `CANONICAL_HOST` for any non-URL string usage that still references it.
const BASE_URL = CANONICAL_HOST;

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

/**
 * Extract first sentence from prose for use as meta description.
 * Truncates at sentence boundary; falls back to character truncation if
 * no sentence punctuation found within max chars.
 */
function firstSentenceOf(prose: string | null | undefined, maxLen = 155): string | null {
  if (!prose) return null;
  const trimmed = prose.trim();
  if (!trimmed) return null;
  // Match first sentence ending in . ! ? followed by space or end-of-string
  const m = trimmed.match(/^[\s\S]+?[.!?](?=\s|$)/);
  let candidate = m ? m[0].trim() : trimmed;
  if (candidate.length > maxLen) {
    // Truncate at last word boundary before maxLen
    candidate = candidate.slice(0, maxLen);
    const lastSpace = candidate.lastIndexOf(' ');
    if (lastSpace > maxLen * 0.7) candidate = candidate.slice(0, lastSpace);
    candidate = candidate.replace(/[,;:]+$/, '') + '…';
  }
  return candidate;
}

/**
 * Resolve topic prose for the given axis-key from the topicProse namespace.
 * Returns null when no prose authored (long-tail axis-keys per §16.7.3 Path B).
 */
async function getTopicProse(locale: string, axisKey: string): Promise<string | null> {
  try {
    const tp = await getTranslations({ locale, namespace: 'topicProse' });
    const v = tp(axisKey);
    // next-intl returns the key itself OR the namespaced path on missing key.
    // Both forms must be treated as "no prose" — without the namespaced check
    // the literal `topicProse.<axisKey>` string leaks into meta descriptions.
    if (!v || v === axisKey || v === 'topicProse.' + axisKey) return null;
    return v;
  } catch {
    return null;
  }
}

/**
 * Resolve purpose-built SEO meta description from the topicMeta namespace.
 * Authored per (axis-key, locale) as tight 120-170 char copy. Returns null
 * when no entry — falls through to topicProse first-sentence, then template
 * fallback per generateMetadata description chain.
 */
async function getTopicMeta(locale: string, axisKey: string): Promise<string | null> {
  try {
    const tm = await getTranslations({ locale, namespace: 'topicMeta' });
    const v = tm(axisKey);
    // Defensive against both missing-key return forms from next-intl. See
    // getTopicProse comment for why both checks matter.
    if (!v || v === axisKey || v === 'topicMeta.' + axisKey) return null;
    return v;
  } catch {
    return null;
  }
}

// Title casing + FR elision now live in @/lib/seo/topic-title-format
// (renderTopicTitle), shared by the <title>, OG title, and <h1>.

export async function generateMetadata({
  params,
}: {
  params: TopicParams;
}): Promise<Metadata> {
  const resolution = await resolveOrNotFound(params);
  const { axis, axisKey, locale } = resolution;

  const t = await getTranslations({ locale, namespace: 'topicPage.meta' });
  const topicName = getAxisName(axis, axisKey, locale) ?? params.slug;
  // R14c: per-locale casing + FR elision (replaces the bare capFirst).
  const renderedTitle = renderTopicTitle(locale, t, 'title', topicName, intentForAxis(axis));

  const siblings = await getTopicSiblings(axis, axisKey);
  const hreflangAlternates: Record<string, string> = {};
  for (const sib of siblings) {
    hreflangAlternates[getHreflangCode(sib.locale)] =
      canonicalUrl(localePath(sib.locale, 'topic', sib.slug));
  }
  const enSibling = siblings.find(s => s.locale === 'en');
  const xDefault = enSibling ?? siblings[0];
  if (xDefault) {
    hreflangAlternates['x-default'] = canonicalUrl(localePath(xDefault.locale, 'topic', xDefault.slug));
  }

  const canonical = canonicalUrl(localePath(locale, 'topic', params.slug));
  const otherSiblings = siblings.filter(s => s.locale !== locale);

  // Description chain (3 levels, most specific to most generic):
  //   1. topicMeta.<axisKey>           — purpose-built 120-170 char SEO copy
  //   2. firstSentenceOf(topicProse)   — first sentence of authored prose
  //   3. topicPage.meta.description    — ICU template fallback
  // The topicMeta layer was added 2026-05-28 to close the cannibalization
  // gap where most axis-keys (no topicProse authored) hit the identical
  // ~95-char template per §17.4. Authored per-locale × per-axis-cohort via
  // the §A.13.48 plan-mode-per-locale + 3-agent ensemble cadence.
  const meta = await getTopicMeta(locale, axisKey);
  const prose = await getTopicProse(locale, axisKey);
  const prosePreview = firstSentenceOf(prose, 155);
  const description = meta ?? prosePreview ?? t('description', { topic: topicName });

  return {
    title: renderedTitle,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: renderedTitle,
      description,
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: otherSiblings.map(s => ogLocaleMap[s.locale] || s.locale),
      // Brand-only 1200×630 OG asset (Direction A palette). Per-topic OG
      // images are a separate asset-pipeline commission; brand-fallback is
      // adequate for social-share previews on topic pages.
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: renderedTitle,
      description,
      images: [{ url: `${CANONICAL_HOST}/og-homepage.png`, alt: 'LessonCraftStudio — K-3 worksheets in 11 languages' }],
    },
  };
}

function buildCollectionSchema(
  locale: TopicLocale,
  topicName: string,
  canonical: string,
  decks: TopicDeckSummary[],
  proseDescription?: string | null
) {
  // Truncate prose to 500 chars for schema description (Google rich-snippet
  // recommendation; full-page prose stays in body content + OG description).
  let description: string | undefined;
  if (proseDescription) {
    const trimmed = proseDescription.trim();
    description = trimmed.length > 500
      ? trimmed.slice(0, 497).replace(/[\s,;:]+$/, '') + '…'
      : trimmed;
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonical,
    url: canonical,
    name: topicName,
    ...(description ? { description } : {}),
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
  mode?: string;
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
  const mode = get('mode');

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
  if (mode) sp.set('mode', mode);
  if (theme) sp.set('theme', theme);
  if (type) sp.set('type', type);
  // Local name `canonicalForm` avoids shadowing the imported `canonicalUrl`
  // helper from `@/lib/seo/url`. The two have different semantics: this is
  // the canonical filter-URL form (path + sorted query string); the import
  // builds absolute canonical URLs with no trailing slash.
  const canonicalForm = buildFilterUrl(basePath, sp);

  // Detect non-canonical input: default values present in URL, empty
  // values, or non-alphabetic param order. Compare the raw incoming
  // searchParams string against the canonical form directly (don't run
  // currentSp through buildFilterUrl — that would strip defaults from
  // both sides making them appear equal even when they differ).
  const rawCurrentSp = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === 'string') rawCurrentSp.set(key, value);
  }
  const rawCurrentUrl = rawCurrentSp.toString()
    ? `${basePath}?${rawCurrentSp.toString()}`
    : basePath;

  const canonicalRedirect = rawCurrentUrl !== canonicalForm ? canonicalForm : null;

  return {
    parsed: { sort, page: pageNum, level, theme, type, mode },
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
  const tDeckAlt = await getTranslations({ locale, namespace: 'seo.deckCardAlt' });
  const topicName = getAxisName(axis, axisKey, locale) ?? params.slug;
  const intent = intentKey(axis);
  // No trailing slash — Next.js routes are trailing-slash-stripped per
  // `next.config.js: trailingSlash: false`. basePath flows to canonical
  // and to buildFilterUrl; both must emit the no-slash form.
  const basePath = `/${locale}/topic/${params.slug}`;

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

  // Exercise-mode filter (subsidiary to exercise-type — only meaningful when
  // path-bound axis is exercise-type per the topic-page-as-app-discovery
  // contract). Silently drops the filter on non-exercise-type pages.
  const modeFilter = (axis === 'exercise-type' && filters.mode) ? filters.mode : undefined;

  const { decks, totalCount, pageCount } = await fetchDecksForTopicWithFilters(
    primaryAxes,
    {
      secondaryAxes: secondaryAxes.length > 0 ? secondaryAxes : undefined,
      modeFilter,
      sort: filters.sort,
      page: filters.page,
      pageSize: TOPIC_PAGE_SIZE,
    },
    locale,
  );

  // Out-of-range page (page > pageCount) → 404 per Q pagination spec
  if (filters.page > pageCount && pageCount > 0) notFound();

  // Facet counts for sidebar — reflect active filters (including mode)
  const facetCounts = await getFacetCounts(primaryAxes, secondaryAxes, locale, modeFilter);

  // Mode facet counts (only meaningful when path-bound axis is exercise-type)
  const modeFacetOptions = (axis === 'exercise-type')
    ? await getExerciseModeCountsForType(axisKey, secondaryAxes, locale)
    : [];

  // Full theme list (Tier 2 expand)
  const allThemes = await listAllNonEmptyThemesWithCounts(locale);

  // Build active-filter chip descriptors (locale-natural display labels)
  type ChipKey = 'level' | 'theme' | 'type' | 'mode';
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
  if (modeFilter) {
    const name = getExerciseModeName(modeFilter, locale);
    if (name) activeChips.push({ paramKey: 'mode', axisKey: modeFilter, label: name });
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
  // Exercise-mode facet — appears only when path-bound axis is exercise-type
  // (mode is subsidiary to exercise-type per §17.8.5; meaningless otherwise).
  // Per FilterSidebar's empty-options-skip behavior, mode-less apps naturally
  // produce no facet rendering.
  if (axis === 'exercise-type' && modeFacetOptions.length > 0) {
    const opts = modeFacetOptions.map(c => ({
      axisKey: c.axisKey,
      label: getExerciseModeName(c.axisKey, locale) ?? c.axisKey,
      count: c.count,
    }));
    facetGroups.push({ paramKey: 'mode', heading: tFacets('exerciseMode'), options: opts });
  }

  // Build searchParams string for child components' URL-construction
  const childSpString = (() => {
    const out = new URLSearchParams();
    if (filters.sort !== 'newest') out.set('sort', filters.sort);
    if (filters.page !== 1) out.set('page', String(filters.page));
    if (filters.level) out.set('level', filters.level);
    if (modeFilter) out.set('mode', modeFilter);
    if (filters.theme) out.set('theme', filters.theme);
    if (filters.type) out.set('type', filters.type);
    return out.toString();
  })();

  const canonical = canonicalUrl(basePath);
  // Topic prose feeds CollectionPage schema description (rich snippet
  // eligibility) — same prose substrate the meta description first-sentence
  // is extracted from. Long-tail axis-keys without authored prose pass
  // undefined and the schema omits the description field.
  const topicProseForSchema = await getTopicProse(locale, axisKey);
  const schema = buildCollectionSchema(locale, topicName, canonical, decks, topicProseForSchema);

  // BreadcrumbList JSON-LD — mirrors the visible <Breadcrumbs> component
  // below (same order + labels + URLs). Per Phase 4 of the SEO arc.
  const homeLabel = await (async () => {
    const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
    return tBreadcrumb('home');
  })();
  const breadcrumbTrail: BreadcrumbCrumb[] = [
    { name: homeLabel, path: localePath(locale) },
    { name: topicName, path: localePath(locale, 'topic', params.slug) },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbTrail);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            {renderTopicTitle(locale, t, `heading.${intent}`, topicName, intent)}
          </h1>
          <ResultCount locale={locale} count={totalCount} />
        </header>

        <TopicProseContainer
          locale={locale}
          axisKey1={axisKey}
          intent1={intentForAxis(axis)}
          topicName1={topicName}
          count={totalCount}
        />

        <PageUsageBlock
          locale={locale}
          variant="topic"
          overrideKey={axisKey}
          topicName={topicName}
        />

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
                decks={decks.map<TopicDeckCardData>(deck => {
                  const title = deckTitleFor(deck, locale);
                  return {
                    id: deck.id,
                    slug: deck.slug,
                    language: deck.language,
                    title,
                    richAlt: buildDeckRichAlt(
                      {
                        exerciseType: deck.exerciseType,
                        subjectTags: deck.subjectTags,
                        ageRange: deck.ageRange,
                        title,
                      },
                      locale,
                      (key, params) => tDeckAlt(key, params),
                    ),
                    href: deckLinkFor(deck),
                    thumbnailUrl: deck.thumbnailUrl,
                    pdfUrl: deck.pdfUrl,
                    answerKeyUrl: deck.answerKeyUrl,
                  };
                })}
                labels={{
                  playLink: t('deckCard.playLink'),
                  pdfLink: t('deckCard.pdfLink'),
                  answerKeyLink: t('deckCard.answerKeyLink'),
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

        <TopicFaq
          locale={locale}
          variant="single"
          axisKey1={axisKey}
          topicName1={topicName}
          count={totalCount}
          pageUrl={canonical}
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
